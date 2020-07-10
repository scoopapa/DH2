'use strict';

exports.BattleScripts = {
	runMove: function (move, pokemon, targetLoc, sourceEffect, zMove) {
		let target = this.getTarget(pokemon, zMove || move, targetLoc);
		if (!sourceEffect && toID(move) !== 'struggle' && !zMove) {
			let changedMove = this.runEvent('OverrideDecision', pokemon, target, move);
			if (changedMove && changedMove !== true) {
				move = changedMove;
				target = null;
			}
		}
		let baseMove = this.getMove(move);
		move = zMove ? this.getZMoveCopy(move, pokemon) : baseMove;
		if (!target && target !== false) target = this.resolveTarget(pokemon, move);

		if (move.isShifted) move.priority = this.getMove(pokemon.moves[0]).priority;

		this.setActiveMove(move, pokemon, target);

		/* if (pokemon.moveThisTurn) {
			// THIS IS PURELY A SANITY CHECK
			// DO NOT TAKE ADVANTAGE OF THIS TO PREVENT A POKEMON FROM MOVING;
			// USE this.cancelMove INSTEAD
			this.debug('' + pokemon.id + ' INCONSISTENT STATE, ALREADY MOVED: ' + pokemon.moveThisTurn);
			this.clearActiveMove(true);
			return;
		} */
		if (!this.runEvent('BeforeMove', pokemon, target, move)) {
			this.runEvent('MoveAborted', pokemon, target, move);
			// Prevent Pursuit from running again against a slower U-turn/Volt Switch/Parting Shot
			pokemon.moveThisTurn = true;
			this.clearActiveMove(true);
			return;
		}
		if (move.beforeMoveCallback) {
			if (move.beforeMoveCallback.call(this, pokemon, target, move)) {
				this.clearActiveMove(true);
				return;
			}
		}
		pokemon.lastDamage = 0;
		let lockedMove = this.runEvent('LockMove', pokemon);
		if (lockedMove === true) lockedMove = false;
		if (!lockedMove) {
			if (!pokemon.deductPP(baseMove, null, target) && (move.id !== 'struggle')) {
				this.add('cant', pokemon, 'nopp', move);
				let gameConsole = [null, 'Game Boy', 'Game Boy', 'Game Boy Advance', 'DS', 'DS'][this.gen] || '3DS';
				this.add('-hint', "This is not a bug, this is really how it works on the " + gameConsole + "; try it yourself if you don't believe us.");
				this.clearActiveMove(true);
				return;
			}
		} else {
			sourceEffect = this.getEffect('lockedmove');
		}
		pokemon.moveUsed(move, targetLoc);

		if (zMove) {
			this.add('-zpower', pokemon);
		}
		this.useMove(baseMove, pokemon, target, sourceEffect, zMove);
		this.singleEvent('AfterMove', move, null, pokemon, target, move);
		this.runEvent('AfterMove', pokemon, target, move);
	},
	getZMove: function (move, pokemon, skipChecks) {
		let item = pokemon.getItem();
		if (!skipChecks) {
			if (pokemon.side.zMoveUsed) return;
			if (!item.zMove) return;
			if (item.zMoveUser && item.zMoveUser.includes(pokemon.species)) return;
			let moveData = pokemon.getMoveData(move);
			if (!moveData || !moveData.pp) return; // Draining the PP of the base move prevents the corresponding Z-move from being used.
		}

		if (item.zMove === true && move.type === item.zMoveType) {
			return move.name;
		}
	},

	getZMoveCopy: function (move, pokemon) {
		move = this.getMove(move);
		let zMove;
		if (!pokemon) return move;
		let target = this.getMove(pokemon.moves[0]);
		zMove = this.getMoveCopy(move.name);
		let intendedBasePower = 1;
		if (target.category !== 'Status') intendedBasePower = target.basePower;
		if (zMove.category !== 'Status') zMove.basePower = intendedBasePower;
		zMove.type = target.type;
		zMove.priority = target.priority;
		zMove.name = `Z-${zMove.name}`;
		zMove.baseMove = target.name;
		zMove.isShifted = true;
		return zMove;
	},

	canZMove: function (pokemon) {
		let item = pokemon.getItem();
		if (!item.zMove) return;
		if (item.zMoveUser && item.zMoveUser.includes(pokemon.species)) return;
		let atLeastOne = false;
		let zMoves = [];
		for (let i = 0; i < pokemon.moves.length; i++) {
			let move = this.getMove(pokemon.moves[i]);
			let zMoveName = this.getZMove(move, pokemon, true) || '';
			if (zMoveName) {
				let zMove = this.getMove(zMoveName);
				zMoveName = "Z-" + zMoveName;
				zMoves.push({move: zMoveName, target: zMove.target});
			} else {
				zMoves.push(null);
			}
			if (zMoveName) atLeastOne = true;
		}
		if (atLeastOne) return zMoves;
	},

	resolvePriority: function (decision, midTurn) {
		if (!decision) return;

		if (!decision.side && decision.pokemon) decision.side = decision.pokemon.side;
		if (!decision.choice && decision.move) decision.choice = 'move';
		if (!decision.priority && decision.priority !== 0) {
			let priorities = {
				'beforeTurn': 100,
				'beforeTurnMove': 99,
				'switch': 7,
				'runUnnerve': 7.3,
				'runSwitch': 7.2,
				'runPrimal': 7.1,
				'instaswitch': 101,
				'megaEvo': 6.9,
				'residual': -100,
				'team': 102,
				'start': 101,
			};
			if (decision.choice in priorities) {
				decision.priority = priorities[decision.choice];
			}
		}
		if (!midTurn) {
			if (decision.choice === 'move') {
				if (!decision.zmove && this.getMove(decision.move).beforeTurnCallback) {
					this.addQueue({choice: 'beforeTurnMove', pokemon: decision.pokemon, move: decision.move, targetLoc: decision.targetLoc});
				}
				if (decision.mega) {
					// TODO: Check that the Pokémon is not affected by Sky Drop.
					// (This is currently being done in `runMegaEvo`).
					this.addQueue({
						choice: 'megaEvo',
						pokemon: decision.pokemon,
					});
				}
			} else if (decision.choice === 'switch' || decision.choice === 'instaswitch') {
				if (decision.pokemon.switchFlag && decision.pokemon.switchFlag !== true) {
					decision.pokemon.switchCopyFlag = decision.pokemon.switchFlag;
				}
				decision.pokemon.switchFlag = false;
				if (!decision.speed && decision.pokemon && decision.pokemon.isActive) decision.speed = decision.pokemon.getDecisionSpeed();
			}
		}

		let deferPriority = this.gen >= 7 && decision.mega && !decision.pokemon.template.isMega;
		if (decision.move) {
			let target;

			if (!decision.targetLoc) {
				target = this.resolveTarget(decision.pokemon, decision.move);
				decision.targetLoc = this.getTargetLoc(target, decision.pokemon);
			}

			decision.move = this.getMoveCopy(decision.move);
			if (!decision.priority && !deferPriority) {
				let move = decision.move;
				if (decision.zmove) {
					let zMoveName = this.getZMove(decision.move, decision.pokemon, true);
					let zMove = this.getZMoveCopy(zMoveName);
					if (zMove.isShifted) {
						move = zMove;
					}
				}
				let priority = this.runEvent('ModifyPriority', decision.pokemon, target, move, move.priority);
				decision.priority = priority;
				// In Gen 6, Quick Guard blocks moves with artificially enhanced priority.
				if (this.gen > 5) decision.move.priority = priority;
			}
		}
		if (!decision.pokemon && !decision.speed) decision.speed = 1;
		if (!decision.speed && (decision.choice === 'switch' || decision.choice === 'instaswitch') && decision.target) decision.speed = decision.target.getDecisionSpeed();
		if (!decision.speed && !deferPriority) decision.speed = decision.pokemon.getDecisionSpeed();
	}
};