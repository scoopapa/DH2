"use strict";Object.defineProperty(exports, "__esModule", {value: true});/**
 * Simulator Battle Action Queue
 * Pokemon Showdown - http://pokemonshowdown.com/
 *
 * The action queue is the core of the battle simulation. A rough overview of
 * the core battle loop:
 *
 * - chosen moves/switches are added to the action queue
 * - the action queue is sorted in speed/priority order
 * - we go through the action queue
 * - repeat
 *
 * @license MIT
 */



/** A move action */







































































































/**
 * Kind of like a priority queue, although not sorted mid-turn in Gen 1-7.
 *
 * Sort order is documented in `BattleQueue.comparePriority`.
 */
 class BattleQueue {
	
	
	constructor(battle) {
		this.battle = battle;
		this.list = [];
		const queueScripts = battle.format.queue || battle.dex.data.Scripts.queue;
		if (queueScripts) Object.assign(this, queueScripts);
	}

	shift() {
		return this.list.shift();
	}
	peek() {
		return this.list[0];
	}
	push(action) {
		return this.list.push(action);
	}
	unshift(action) {
		return this.list.unshift(action);
	}
	// eslint-disable-next-line no-restricted-globals
	[Symbol.iterator]() { return this.list[Symbol.iterator](); }
	entries() {
		return this.list.entries();
	}

	/**
	 * Takes an ActionChoice, and fills it out into a full Action object.
	 *
	 * Returns an array of Actions because some ActionChoices (like mega moves)
	 * resolve to two Actions (mega evolution + use move)
	 */
	resolveAction(action, midTurn = false) {
		if (!action) throw new Error(`Action not passed to resolveAction`);
		if (action.choice === 'pass') return [];
		const actions = [action];

		if (!action.side && action.pokemon) action.side = action.pokemon.side;
		if (!action.move && action.moveid) action.move = this.battle.dex.getActiveMove(action.moveid);
		if (!action.order) {
			const orders = {
				team: 1,
				start: 2,
				instaswitch: 3,
				beforeTurn: 4,
				beforeTurnMove: 5,

				runUnnerve: 100,
				runSwitch: 101,
				runPrimal: 102,
				switch: 103,
				megaEvo: 104,
				runDynamax: 105,

				shift: 200,
				// default is 200 (for moves)

				residual: 300,
			};
			if (action.choice in orders) {
				action.order = orders[action.choice];
			} else {
				action.order = 200;
				if (!['move', 'event'].includes(action.choice)) {
					throw new Error(`Unexpected orderless action ${action.choice}`);
				}
			}
		}
		if (!midTurn) {
			if (action.choice === 'move') {
				if (!action.maxMove && !action.zmove && action.move.beforeTurnCallback) {
					actions.unshift(...this.resolveAction({
						choice: 'beforeTurnMove', pokemon: action.pokemon, move: action.move, targetLoc: action.targetLoc,
					}));
				}
				if (action.mega) {
					// TODO: Check that the Pokémon is not affected by Sky Drop.
					// (This is currently being done in `runMegaEvo`).
					actions.unshift(...this.resolveAction({
						choice: 'megaEvo',
						pokemon: action.pokemon,
					}));
				}
				if (action.maxMove && !action.pokemon.volatiles['dynamax']) {
					actions.unshift(...this.resolveAction({
						choice: 'runDynamax',
						pokemon: action.pokemon,
					}));
				}
				action.fractionalPriority = this.battle.runEvent('FractionalPriority', action.pokemon, null, action.move, 0);
			} else if (['switch', 'instaswitch'].includes(action.choice)) {
				if (typeof action.pokemon.switchFlag === 'string') {
					action.sourceEffect = this.battle.dex.getMove(action.pokemon.switchFlag ) ;
				}
				action.pokemon.switchFlag = false;
			}
		}

		const deferPriority = this.battle.gen === 7 && action.mega && action.mega !== 'done';
		if (action.move) {
			let target = null;
			action.move = this.battle.dex.getActiveMove(action.move);

			if (!action.targetLoc) {
				target = this.battle.getRandomTarget(action.pokemon, action.move);
				// TODO: what actually happens here?
				if (target) action.targetLoc = this.battle.getTargetLoc(target, action.pokemon);
			}
			action.originalTarget = this.battle.getAtLoc(action.pokemon, action.targetLoc);
		}
		if (!deferPriority) this.battle.getActionSpeed(action);
		return actions ;
	}

	/**
	 * Makes the passed action happen next (skipping speed order).
	 */
	prioritizeAction(action, sourceEffect) {
		for (const [i, curAction] of this.list.entries()) {
			if (curAction === action) {
				this.list.splice(i, 1);
				break;
			}
		}
		action.sourceEffect = sourceEffect;
		action.order = 3;
		this.list.unshift(action);
	}

	/**
	 * Changes a pokemon's action, and inserts its new action
	 * in priority order.
	 *
	 * You'd normally want the OverrideAction event (which doesn't
	 * change priority order).
	 */
	changeAction(pokemon, action) {
		this.cancelAction(pokemon);
		if (!action.pokemon) action.pokemon = pokemon;
		this.insertChoice(action);
	}

	addChoice(choices) {
		if (!Array.isArray(choices)) choices = [choices];
		for (const choice of choices) {
			const resolvedChoices = this.resolveAction(choice);
			this.list.push(...resolvedChoices);
			const resolvedChoice = resolvedChoices[0];
			if (resolvedChoice && resolvedChoice.choice === 'move' && resolvedChoice.move.id !== 'recharge') {
				resolvedChoice.pokemon.side.lastSelectedMove = resolvedChoice.move.id;
			}
		}
	}

	willAct() {
		for (const action of this.list) {
			if (['move', 'switch', 'instaswitch', 'shift'].includes(action.choice)) {
				return action;
			}
		}
		return null;
	}

	willMove(pokemon) {
		if (pokemon.fainted) return null;
		for (const action of this.list) {
			if (action.choice === 'move' && action.pokemon === pokemon) {
				return action;
			}
		}
		return null;
	}

	cancelAction(pokemon) {
		const oldLength = this.list.length;
		for (let i = 0; i < this.list.length; i++) {
			if (this.list[i].pokemon === pokemon) {
				this.list.splice(i, 1);
				i--;
			}
		}
		return this.list.length !== oldLength;
	}

	cancelMove(pokemon) {
		for (const [i, action] of this.list.entries()) {
			if (action.choice === 'move' && action.pokemon === pokemon) {
				this.list.splice(i, 1);
				return true;
			}
		}
		return false;
	}

	willSwitch(pokemon) {
		for (const action of this.list) {
			if (['switch', 'instaswitch'].includes(action.choice) && action.pokemon === pokemon) {
				return action;
			}
		}
		return null;
	}

	/**
	 * Inserts the passed action into the action queue when it normally
	 * would have happened (sorting by priority/speed), without
	 * re-sorting the existing actions.
	 */
	insertChoice(choices, midTurn = false) {
		if (Array.isArray(choices)) {
			for (const choice of choices) {
				this.insertChoice(choice);
			}
			return;
		}
		const choice = choices;

		if (choice.pokemon) {
			choice.pokemon.updateSpeed();
		}
		const actions = this.resolveAction(choice, midTurn);
		for (const [i, curAction] of this.list.entries()) {
			if (BattleQueue.comparePriority(actions[0], curAction) < 0) {
				this.list.splice(i, 0, ...actions);
				return;
			}
		}
		this.list.push(...actions);
	}

	clear() {
		this.list = [];
	}

	debug(action) {
		if (action) {
			return `${action.order || ''}:${action.priority || ''}:${action.speed || ''}:${action.subOrder || ''} - ${action.choice}${action.pokemon ? ' ' + action.pokemon : ''}${action.move ? ' ' + action.move : ''}`;
		}
		return this.list.map(
			queueAction => this.debug(queueAction)
		).join('\n') + '\n';
	}

	sort() {
		// this.log.push('SORT ' + this.debugQueue());
		this.battle.speedSort(this.list);
		return this;
	}

	/**
	 * The default sort order for actions, but also event listeners.
	 *
	 * 1. Order, low to high (default last)
	 * 2. Priority, high to low (default 0)
	 * 3. Speed, high to low (default 0)
	 * 4. SubOrder, low to high (default 0)
	 * 5. AbilityOrder, switch-in order for abilities
	 */
	static comparePriority(a, b) {
		return -((b.order || 4294967296) - (a.order || 4294967296)) ||
			((b.priority || 0) - (a.priority || 0)) ||
			((b.speed || 0) - (a.speed || 0)) ||
			-((b.subOrder || 0) - (a.subOrder || 0)) ||
			((a.thing && b.thing) ? -(b.thing.abilityOrder - a.thing.abilityOrder) : 0) ||
			0;
	}
} exports.BattleQueue = BattleQueue;

exports. default = BattleQueue;
