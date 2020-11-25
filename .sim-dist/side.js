"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }/**
 * Simulator Side
 * Pokemon Showdown - http://pokemonshowdown.com/
 *
 * @license MIT license
 */
var _utils = require('../.lib-dist/utils');

var _pokemon = require('./pokemon');
var _state = require('./state');
var _dex = require('./dex');

/** A single action that can be chosen. */





























 class Side {
	
	
	

	
	
	
	
	
	
	

	
	

	
	
	/** only used by Gen 1 Counter */
	__init() {this.lastSelectedMove = ''}

	
	

	
	

	

	constructor(name, battle, sideNum, team) {;Side.prototype.__init.call(this);
		const sideScripts = battle.dex.data.Scripts.side;
		if (sideScripts) Object.assign(this, sideScripts);

		this.battle = battle;
		this.id = ['p1', 'p2', 'p3', 'p4'][sideNum] ;
		this.n = sideNum;

		this.name = name;
		this.avatar = '';
		this.maxTeamSize = 6;
		this.foe = sideNum ? this.battle.sides[0] : this.battle.sides[1];

		this.team = team;
		this.pokemon = [];
		for (let i = 0; i < this.team.length && i < 24; i++) {
			// console.log("NEW POKEMON: " + (this.team[i] ? this.team[i].name : '[unidentified]'));
			this.pokemon.push(new (0, _pokemon.Pokemon)(this.team[i], this));
		}
		for (const [i, pokemon] of this.pokemon.entries()) {
			pokemon.position = i;
		}

		switch (this.battle.gameType) {
		case 'doubles':
			this.active = [null, null];
			break;
		case 'triples': case 'rotation':
			this.active = [null, null, null];
			break;
		default:
			this.active = [null];
		}

		this.pokemonLeft = this.pokemon.length;
		this.faintedLastTurn = null;
		this.faintedThisTurn = null;
		this.zMoveUsed = false;

		this.sideConditions = {};
		this.slotConditions = [];
		// Array#fill doesn't work for this
		for (let i = 0; i < this.active.length; i++) this.slotConditions[i] = {};

		this.activeRequest = null;
		this.choice = {
			cantUndo: false,
			error: ``,
			actions: [],
			forcedSwitchesLeft: 0,
			forcedPassesLeft: 0,
			switchIns: new Set(),
			zMove: false,
			mega: false,
			ultra: false,
			dynamax: false,
		};

		// old-gens
		this.lastMove = null;
	}

	toJSON() {
		return _state.State.serializeSide(this);
	}

	get requestState() {
		if (!this.activeRequest || this.activeRequest.wait) return '';
		if (this.activeRequest.teamPreview) return 'teampreview';
		if (this.activeRequest.forceSwitch) return 'switch';
		return 'move';
	}

	getChoice() {
		if (this.choice.actions.length > 1 && this.choice.actions.every(action => action.choice === 'team')) {
			return `team ` + this.choice.actions.map(action => action.pokemon.position + 1).join(', ');
		}
		return this.choice.actions.map(action => {
			switch (action.choice) {
			case 'move':
				let details = ``;
				if (action.targetLoc && this.active.length > 1) details += ` ${action.targetLoc > 0 ? '+' : ''}${action.targetLoc}`;
				if (action.mega) details += (action.pokemon.item === 'ultranecroziumz' ? ` ultra` : ` mega`);
				if (action.zmove) details += ` zmove`;
				if (action.maxMove) details += ` dynamax`;
				return `move ${action.moveid}${details}`;
			case 'switch':
			case 'instaswitch':
				return `switch ${action.target.position + 1}`;
			case 'team':
				return `team ${action.pokemon.position + 1}`;
			default:
				return action.choice;
			}
		}).join(', ');
	}

	toString() {
		return `${this.id}: ${this.name}`;
	}

	getRequestData() {
		const data = {
			name: this.name,
			id: this.id,
			pokemon: [] ,
		};
		for (const pokemon of this.pokemon) {
			data.pokemon.push(pokemon.getSwitchRequestData());
		}
		return data;
	}

	randomActive() {
		const actives = this.active.filter(active => active && !active.fainted);
		if (!actives.length) return null;
		return this.battle.sample(actives);
	}

	addSideCondition(
		status, source = null, sourceEffect = null
	) {
		if (this.n >= 2 && this.battle.gameType === 'multi') {
			return this.battle.sides[this.n % 2].addSideCondition(status, source, sourceEffect);
		}
		if (!source && this.battle.event && this.battle.event.target) source = this.battle.event.target;
		if (source === 'debug') source = this.active[0];
		if (!source) throw new Error(`setting sidecond without a source`);

		status = this.battle.dex.getEffect(status);
		if (this.sideConditions[status.id]) {
			if (!status.onRestart) return false;
			return this.battle.singleEvent('Restart', status, this.sideConditions[status.id], this, source, sourceEffect);
		}
		this.sideConditions[status.id] = {
			id: status.id,
			target: this,
			source,
			sourcePosition: source.position,
			duration: status.duration,
		};
		if (status.durationCallback) {
			this.sideConditions[status.id].duration =
				status.durationCallback.call(this.battle, this.active[0], source, sourceEffect);
		}
		if (!this.battle.singleEvent('Start', status, this.sideConditions[status.id], this, source, sourceEffect)) {
			delete this.sideConditions[status.id];
			return false;
		}
		return true;
	}

	getSideCondition(status) {
		if (this.n >= 2 && this.battle.gameType === 'multi') {
			return this.battle.sides[this.n % 2].getSideCondition(status);
		}
		status = this.battle.dex.getEffect(status) ;
		if (!this.sideConditions[status.id]) return null;
		return status;
	}

	getSideConditionData(status) {
		if (this.n >= 2 && this.battle.gameType === 'multi') {
			return this.battle.sides[this.n % 2].getSideConditionData(status);
		}
		status = this.battle.dex.getEffect(status) ;
		return this.sideConditions[status.id] || null;
	}

	removeSideCondition(status) {
		if (this.n >= 2 && this.battle.gameType === 'multi') {
			return this.battle.sides[this.n % 2].removeSideCondition(status);
		}
		status = this.battle.dex.getEffect(status) ;
		if (!this.sideConditions[status.id]) return false;
		this.battle.singleEvent('End', status, this.sideConditions[status.id], this);
		delete this.sideConditions[status.id];
		return true;
	}

	addSlotCondition(
		target, status, source = null,
		sourceEffect = null
	) {
		if (!source && this.battle.event && this.battle.event.target) source = this.battle.event.target;
		if (source === 'debug') source = this.active[0];
		if (target instanceof _pokemon.Pokemon) target = target.position;
		if (!source) throw new Error(`setting sidecond without a source`);

		status = this.battle.dex.getEffect(status);
		if (this.slotConditions[target][status.id]) {
			if (!status.onRestart) return false;
			return this.battle.singleEvent('Restart', status, this.slotConditions[target][status.id], this, source, sourceEffect);
		}
		const slotConditionData = this.slotConditions[target][status.id] = {
			id: status.id,
			target: this,
			source,
			sourcePosition: source.position,
			duration: status.duration,
		};
		if (status.durationCallback) {
			slotConditionData.duration =
				status.durationCallback.call(this.battle, this.active[0], source, sourceEffect);
		}
		if (!this.battle.singleEvent('Start', status, slotConditionData, this.active[target], source, sourceEffect)) {
			delete this.slotConditions[target][status.id];
			return false;
		}
		return true;
	}

	getSlotCondition(target, status) {
		if (target instanceof _pokemon.Pokemon) target = target.position;
		status = this.battle.dex.getEffect(status) ;
		if (!this.slotConditions[target][status.id]) return null;
		return status;
	}

	removeSlotCondition(target, status) {
		if (target instanceof _pokemon.Pokemon) target = target.position;
		status = this.battle.dex.getEffect(status) ;
		if (!this.slotConditions[target][status.id]) return false;
		this.battle.singleEvent('End', status, this.slotConditions[target][status.id], this.active[target]);
		delete this.slotConditions[target][status.id];
		return true;
	}

	// eslint-disable-next-line @typescript-eslint/ban-types
	send(...parts) {
		const sideUpdate = '|' + parts.map(part => {
			if (typeof part !== 'function') return part;
			return part(this);
		}).join('|');
		this.battle.send('sideupdate', `${this.id}\n${sideUpdate}`);
	}

	emitRequest(update) {
		this.battle.send('sideupdate', `${this.id}\n|request|${JSON.stringify(update)}`);
		this.activeRequest = update;
	}

	emitChoiceError(message, unavailable) {
		this.choice.error = message;
		const type = `[${unavailable ? 'Unavailable' : 'Invalid'} choice]`;
		this.battle.send('sideupdate', `${this.id}\n|error|${type} ${message}`);
		if (this.battle.strictChoices) throw new Error(`${type} ${message}`);
		return false;
	}

	isChoiceDone() {
		if (!this.requestState) return true;
		if (this.choice.forcedSwitchesLeft) return false;

		if (this.requestState === 'teampreview') {
			return this.choice.actions.length >= Math.min(this.maxTeamSize, this.pokemon.length);
		}

		// current request is move/switch
		this.getChoiceIndex(); // auto-pass
		return this.choice.actions.length >= this.active.length;
	}

	chooseMove(moveText, targetLoc = 0, megaDynaOrZ = '') {
		if (this.requestState !== 'move') {
			return this.emitChoiceError(`Can't move: You need a ${this.requestState} response`);
		}
		const index = this.getChoiceIndex();
		if (index >= this.active.length) {
			return this.emitChoiceError(`Can't move: You sent more choices than unfainted Pokémon.`);
		}
		const autoChoose = !moveText;
		const pokemon = this.active[index];

		// Parse moveText (name or index)
		// If the move is not found, the action is invalid without requiring further inspection.

		const request = pokemon.getMoveRequestData();
		let moveid = '';
		let targetType = '';
		if (autoChoose) moveText = 1;
		if (typeof moveText === 'number' || (moveText && /^[0-9]+$/.test(moveText))) {
			// Parse a one-based move index.
			const moveIndex = Number(moveText) - 1;
			if (moveIndex < 0 || moveIndex >= request.moves.length || !request.moves[moveIndex]) {
				return this.emitChoiceError(`Can't move: Your ${pokemon.name} doesn't have a move ${moveIndex + 1}`);
			}
			moveid = request.moves[moveIndex].id;
			targetType = request.moves[moveIndex].target;
		} else {
			// Parse a move ID.
			// Move names are also allowed, but may cause ambiguity (see client issue #167).
			moveid = _dex.toID.call(void 0, moveText);
			if (moveid.startsWith('hiddenpower')) {
				moveid = 'hiddenpower';
			}
			for (const move of request.moves) {
				if (move.id !== moveid) continue;
				targetType = move.target || 'normal';
				break;
			}
			if (!targetType && ['', 'dynamax'].includes(megaDynaOrZ) && request.maxMoves) {
				for (const [i, moveRequest] of request.maxMoves.maxMoves.entries()) {
					if (moveid === moveRequest.move) {
						moveid = request.moves[i].id;
						targetType = moveRequest.target;
						megaDynaOrZ = 'dynamax';
						break;
					}
				}
			}
			if (!targetType && ['', 'zmove'].includes(megaDynaOrZ) && request.canZMove) {
				for (const [i, moveRequest] of request.canZMove.entries()) {
					if (!moveRequest) continue;
					if (moveid === _dex.toID.call(void 0, moveRequest.move)) {
						moveid = request.moves[i].id;
						targetType = moveRequest.target;
						megaDynaOrZ = 'zmove';
						break;
					}
				}
			}
			if (!targetType) {
				return this.emitChoiceError(`Can't move: Your ${pokemon.name} doesn't have a move matching ${moveid}`);
			}
		}

		const moves = pokemon.getMoves();
		if (autoChoose) {
			for (const [i, move] of request.moves.entries()) {
				if (move.disabled) continue;
				if (i < moves.length && move.id === moves[i].id && moves[i].disabled) continue;
				moveid = move.id;
				targetType = move.target;
				break;
			}
		}
		const move = this.battle.dex.getMove(moveid);

		// Z-move

		const zMove = megaDynaOrZ === 'zmove' ? this.battle.getZMove(move, pokemon) : undefined;
		if (megaDynaOrZ === 'zmove' && !zMove) {
			return this.emitChoiceError(`Can't move: ${pokemon.name} can't use ${move.name} as a Z-move`);
		}
		if (zMove && this.choice.zMove) {
			return this.emitChoiceError(`Can't move: You can't Z-move more than once per battle`);
		}

		if (zMove) targetType = this.battle.dex.getMove(zMove).target;

		// Dynamax
		// Is dynamaxed or will dynamax this turn.
		const maxMove = (megaDynaOrZ === 'dynamax' || pokemon.volatiles['dynamax']) ?
			this.battle.getMaxMove(move, pokemon) : undefined;
		if (megaDynaOrZ === 'dynamax' && !maxMove) {
			return this.emitChoiceError(`Can't move: ${pokemon.name} can't use ${move.name} as a Max Move`);
		}

		if (maxMove) targetType = this.battle.dex.getMove(maxMove).target;

		// Validate targetting

		if (autoChoose) {
			targetLoc = 0;
		} else if (this.battle.targetTypeChoices(targetType)) {
			if (!targetLoc && this.active.length >= 2) {
				return this.emitChoiceError(`Can't move: ${move.name} needs a target`);
			}
			if (!this.battle.validTargetLoc(targetLoc, pokemon, targetType)) {
				return this.emitChoiceError(`Can't move: Invalid target for ${move.name}`);
			}
		} else {
			if (targetLoc) {
				return this.emitChoiceError(`Can't move: You can't choose a target for ${move.name}`);
			}
		}

		const lockedMove = pokemon.getLockedMove();
		if (lockedMove) {
			const lockedMoveTarget = pokemon.lastMoveTargetLoc || 0;
			this.choice.actions.push({
				choice: 'move',
				pokemon,
				targetLoc: lockedMoveTarget,
				moveid: _dex.toID.call(void 0, lockedMove),
			});
			return true;
		} else if (!moves.length && !zMove) {
			// Override action and use Struggle if there are no enabled moves with PP
			// Gen 4 and earlier announce a Pokemon has no moves left before the turn begins, and only to that player's side.
			if (this.battle.gen <= 4) this.send('-activate', pokemon, 'move: Struggle');
			moveid = 'struggle';
		} else if (maxMove) {
			// Dynamaxed; only Taunt and Assault Vest disable Max Guard
			if (pokemon.maxMoveDisabled(maxMove)) {
				return this.emitChoiceError(`Can't move: ${pokemon.name}'s ${maxMove.name} is disabled`);
			}
		} else if (!zMove) {
			// Check for disabled moves
			let isEnabled = false;
			let disabledSource = '';
			for (const m of moves) {
				if (m.id !== moveid) continue;
				if (!m.disabled) {
					isEnabled = true;
					break;
				} else if (m.disabledSource) {
					disabledSource = m.disabledSource;
				}
			}
			if (!isEnabled) {
				// Request a different choice
				if (autoChoose) throw new Error(`autoChoose chose a disabled move`);
				const includeRequest = this.updateRequestForPokemon(pokemon, req => {
					let updated = false;
					for (const m of req.moves) {
						if (m.id === moveid) {
							if (!m.disabled) {
								m.disabled = true;
								updated = true;
							}
							if (m.disabledSource !== disabledSource) {
								m.disabledSource = disabledSource;
								updated = true;
							}
							break;
						}
					}
					return updated;
				});
				const status = this.emitChoiceError(`Can't move: ${pokemon.name}'s ${move.name} is disabled`, includeRequest);
				if (includeRequest) this.emitRequest(this.activeRequest);
				return status;
			}
			// The chosen move is valid yay
		}

		// Mega evolution

		const mega = (megaDynaOrZ === 'mega');
		if (mega && !pokemon.canMegaEvo) {
			return this.emitChoiceError(`Can't move: ${pokemon.name} can't mega evolve`);
		}
		if (mega && this.choice.mega) {
			return this.emitChoiceError(`Can't move: You can only mega-evolve once per battle`);
		}
		const ultra = (megaDynaOrZ === 'ultra');
		if (ultra && !pokemon.canUltraBurst) {
			return this.emitChoiceError(`Can't move: ${pokemon.name} can't ultra burst`);
		}
		if (ultra && this.choice.ultra) {
			return this.emitChoiceError(`Can't move: You can only ultra burst once per battle`);
		}
		let dynamax = (megaDynaOrZ === 'dynamax');
		if (dynamax && (this.choice.dynamax || !pokemon.getDynamaxRequest())) {
			if (pokemon.volatiles['dynamax']) {
				dynamax = false;
			} else {
				return this.emitChoiceError(`Can't move: You can only Dynamax once per battle.`);
			}
		}

		this.choice.actions.push({
			choice: 'move',
			pokemon,
			targetLoc,
			moveid,
			mega: mega || ultra,
			zmove: zMove,
			maxMove: maxMove ? maxMove.id : undefined,
		});

		if (pokemon.maybeDisabled) {
			this.choice.cantUndo = this.choice.cantUndo || pokemon.isLastActive();
		}

		if (mega) this.choice.mega = true;
		if (ultra) this.choice.ultra = true;
		if (zMove) this.choice.zMove = true;
		if (dynamax) this.choice.dynamax = true;

		return true;
	}

	updateRequestForPokemon(pokemon, update) {
		if (!this.activeRequest || !this.activeRequest.active) {
			throw new Error(`Can't update a request without active Pokemon`);
		}
		const req = this.activeRequest.active[pokemon.position];
		if (!req) throw new Error(`Pokemon not found in request's active field`);
		return update(req);
	}

	chooseSwitch(slotText) {
		if (this.requestState !== 'move' && this.requestState !== 'switch') {
			return this.emitChoiceError(`Can't switch: You need a ${this.requestState} response`);
		}
		const index = this.getChoiceIndex();
		if (index >= this.active.length) {
			if (this.requestState === 'switch') {
				return this.emitChoiceError(`Can't switch: You sent more switches than Pokémon that need to switch`);
			}
			return this.emitChoiceError(`Can't switch: You sent more choices than unfainted Pokémon`);
		}
		const pokemon = this.active[index];
		const autoChoose = !slotText;
		let slot;
		if (autoChoose) {
			if (this.requestState !== 'switch') {
				return this.emitChoiceError(`Can't switch: You need to select a Pokémon to switch in`);
			}
			if (!this.choice.forcedSwitchesLeft) return this.choosePass();
			slot = this.active.length;
			while (this.choice.switchIns.has(slot) || this.pokemon[slot].fainted) slot++;
		} else {
			slot = parseInt(slotText) - 1;
		}
		if (isNaN(slot) || slot < 0) {
			// maybe it's a name/species id!
			slot = -1;
			for (const [i, mon] of this.pokemon.entries()) {
				if (slotText.toLowerCase() === mon.name.toLowerCase() || _dex.toID.call(void 0, slotText) === mon.species.id) {
					slot = i;
					break;
				}
			}
			if (slot < 0) {
				return this.emitChoiceError(`Can't switch: You do not have a Pokémon named "${slotText}" to switch to`);
			}
		}
		if (slot >= this.pokemon.length) {
			return this.emitChoiceError(`Can't switch: You do not have a Pokémon in slot ${slot + 1} to switch to`);
		} else if (slot < this.active.length) {
			return this.emitChoiceError(`Can't switch: You can't switch to an active Pokémon`);
		} else if (this.choice.switchIns.has(slot)) {
			return this.emitChoiceError(`Can't switch: The Pokémon in slot ${slot + 1} can only switch in once`);
		}
		const targetPokemon = this.pokemon[slot];

		if (targetPokemon.fainted) {
			return this.emitChoiceError(`Can't switch: You can't switch to a fainted Pokémon`);
		}

		if (this.requestState === 'move') {
			if (pokemon.trapped) {
				const includeRequest = this.updateRequestForPokemon(pokemon, req => {
					let updated = false;
					if (req.maybeTrapped) {
						delete req.maybeTrapped;
						updated = true;
					}
					if (!req.trapped) {
						req.trapped = true;
						updated = true;
					}
					return updated;
				});
				const status = this.emitChoiceError(`Can't switch: The active Pokémon is trapped`, includeRequest);
				if (includeRequest) this.emitRequest(this.activeRequest);
				return status;
			} else if (pokemon.maybeTrapped) {
				this.choice.cantUndo = this.choice.cantUndo || pokemon.isLastActive();
			}
		} else if (this.requestState === 'switch') {
			if (!this.choice.forcedSwitchesLeft) {
				throw new Error(`Player somehow switched too many Pokemon`);
			}
			this.choice.forcedSwitchesLeft--;
		}

		this.choice.switchIns.add(slot);

		this.choice.actions.push({
			choice: (this.requestState === 'switch' ? 'instaswitch' : 'switch'),
			pokemon,
			target: targetPokemon,
		} );

		return true;
	}

	chooseTeam(data) {
		const autoFill = !data;
		// default to sending team in order
		if (!data) data = `123456`;
		const positions = (('' + data)
			.split(data.includes(',') ? ',' : '')
			.map(datum => parseInt(datum) - 1));

		if (autoFill && this.choice.actions.length >= this.maxTeamSize) return true;
		if (this.requestState !== 'teampreview') {
			return this.emitChoiceError(`Can't choose for Team Preview: You're not in a Team Preview phase`);
		}

		// hack for >6 pokemon Custom Game
		while (positions.length >= 6 && positions.length < this.maxTeamSize && positions.length < this.pokemon.length) {
			positions.push(positions.length);
		}

		for (const pos of positions) {
			const index = this.choice.actions.length;
			if (index >= this.maxTeamSize || index >= this.pokemon.length) {
				// client still sends entire team
				break;
				// if (autoFill) break;
				// return this.emitChoiceError(`Can't choose for Team Preview: You are limited to ${this.maxTeamSize} Pokémon`);
			}
			if (isNaN(pos) || pos < 0 || pos >= this.pokemon.length) {
				return this.emitChoiceError(`Can't choose for Team Preview: You do not have a Pokémon in slot ${pos + 1}`);
			}
			if (this.choice.switchIns.has(pos)) {
				if (autoFill) continue;
				return this.emitChoiceError(`Can't choose for Team Preview: The Pokémon in slot ${pos + 1} can only switch in once`);
			}

			this.choice.switchIns.add(pos);
			this.choice.actions.push({
				choice: 'team',
				index,
				pokemon: this.pokemon[pos],
				priority: -index,
			} );
		}

		return true;
	}

	chooseShift() {
		const index = this.getChoiceIndex();
		if (index >= this.active.length) {
			return this.emitChoiceError(`Can't shift: You do not have a Pokémon in slot ${index + 1}`);
		} else if (this.requestState !== 'move') {
			return this.emitChoiceError(`Can't shift: You can only shift during a move phase`);
		} else if (this.battle.gameType !== 'triples') {
			return this.emitChoiceError(`Can't shift: You can only shift to the center in triples`);
		} else if (index === 1) {
			return this.emitChoiceError(`Can't shift: You can only shift from the edge to the center`);
		}
		const pokemon = this.active[index];

		this.choice.actions.push({
			choice: 'shift',
			pokemon,
		} );

		return true;
	}

	clearChoice() {
		let forcedSwitches = 0;
		let forcedPasses = 0;
		if (this.battle.requestState === 'switch') {
			const canSwitchOut = this.active.filter(pokemon => _optionalChain([pokemon, 'optionalAccess', _ => _.switchFlag])).length;
			const canSwitchIn = this.pokemon.slice(this.active.length).filter(pokemon => pokemon && !pokemon.fainted).length;
			forcedSwitches = Math.min(canSwitchOut, canSwitchIn);
			forcedPasses = canSwitchOut - forcedSwitches;
		}
		this.choice = {
			cantUndo: false,
			error: ``,
			actions: [],
			forcedSwitchesLeft: forcedSwitches,
			forcedPassesLeft: forcedPasses,
			switchIns: new Set(),
			zMove: false,
			mega: false,
			ultra: false,
			dynamax: false,
		};
	}

	choose(input) {
		if (!this.requestState) {
			return this.emitChoiceError(
				this.battle.ended ? `Can't do anything: The game is over` : `Can't do anything: It's not your turn`
			);
		}

		if (this.choice.cantUndo) {
			return this.emitChoiceError(`Can't undo: A trapping/disabling effect would cause undo to leak information`);
		}

		this.clearChoice();

		const choiceStrings = (input.startsWith('team ') ? [input] : input.split(','));

		if (choiceStrings.length > this.active.length) {
			return this.emitChoiceError(
				`Can't make choices: You sent choices for ${choiceStrings.length} Pokémon, but this is a ${this.battle.gameType} game!`
			);
		}

		for (const choiceString of choiceStrings) {
			let [choiceType, data] = _utils.Utils.splitFirst(choiceString.trim(), ' ');
			data = data.trim();

			switch (choiceType) {
			case 'move':
				const original = data;
				const error = () => this.emitChoiceError(`Conflicting arguments for "move": ${original}`);
				let targetLoc;
				let megaDynaOrZ = '';
				while (true) {
					// If data ends with a number, treat it as a target location.
					// We need to special case 'Conversion 2' so it doesn't get
					// confused with 'Conversion' erroneously sent with the target
					// '2' (since Conversion targets 'self', targetLoc can't be 2).
					if (/\s(?:-|\+)?[1-3]$/.test(data) && _dex.toID.call(void 0, data) !== 'conversion2') {
						if (targetLoc !== undefined) return error();
						targetLoc = parseInt(data.slice(-2));
						data = data.slice(0, -2).trim();
					} else if (data.endsWith(' mega')) {
						if (megaDynaOrZ) return error();
						megaDynaOrZ = 'mega';
						data = data.slice(0, -5);
					} else if (data.endsWith(' zmove')) {
						if (megaDynaOrZ) return error();
						megaDynaOrZ = 'zmove';
						data = data.slice(0, -6);
					} else if (data.endsWith(' ultra')) {
						if (megaDynaOrZ) return error();
						megaDynaOrZ = 'ultra';
						data = data.slice(0, -6);
					} else if (data.endsWith(' dynamax')) {
						if (megaDynaOrZ) return error();
						megaDynaOrZ = 'dynamax';
						data = data.slice(0, -8);
					} else if (data.endsWith(' gigantamax')) {
						if (megaDynaOrZ) return error();
						megaDynaOrZ = 'dynamax';
						data = data.slice(0, -11);
					} else if (data.endsWith(' max')) {
						if (megaDynaOrZ) return error();
						megaDynaOrZ = 'dynamax';
						data = data.slice(0, -4);
					} else {
						break;
					}
				}
				if (!this.chooseMove(data, targetLoc, megaDynaOrZ)) return false;
				break;
			case 'switch':
				this.chooseSwitch(data);
				break;
			case 'shift':
				if (data) return this.emitChoiceError(`Unrecognized data after "shift": ${data}`);
				if (!this.chooseShift()) return false;
				break;
			case 'team':
				if (!this.chooseTeam(data)) return false;
				// Auto-complete
				this.chooseTeam();
				break;
			case 'pass':
			case 'skip':
				if (data) return this.emitChoiceError(`Unrecognized data after "pass": ${data}`);
				if (!this.choosePass()) return false;
				break;
			case 'auto':
			case 'default':
				this.autoChoose();
				break;
			default:
				this.emitChoiceError(`Unrecognized choice: ${choiceString}`);
				break;
			}
		}

		return !this.choice.error;
	}

	getChoiceIndex(isPass) {
		let index = this.choice.actions.length;

		if (!isPass) {
			switch (this.requestState) {
			case 'move':
				// auto-pass
				while (index < this.active.length && this.active[index].fainted) {
					this.choosePass();
					index++;
				}
				break;
			case 'switch':
				while (index < this.active.length && !this.active[index].switchFlag) {
					this.choosePass();
					index++;
				}
				break;
			}
		}

		return index;
	}

	choosePass() {
		const index = this.getChoiceIndex(true);
		if (index >= this.active.length) return false;
		const pokemon = this.active[index];

		switch (this.requestState) {
		case 'switch':
			if (pokemon.switchFlag) { // This condition will always happen if called by Battle#choose()
				if (!this.choice.forcedPassesLeft) {
					return this.emitChoiceError(`Can't pass: You need to switch in a Pokémon to replace ${pokemon.name}`);
				}
				this.choice.forcedPassesLeft--;
			}
			break;
		case 'move':
			if (!pokemon.fainted) {
				return this.emitChoiceError(`Can't pass: Your ${pokemon.name} must make a move (or switch)`);
			}
			break;
		default:
			return this.emitChoiceError(`Can't pass: Not a move or switch request`);
		}

		this.choice.actions.push({
			choice: 'pass',
		} );
		return true;
	}

	/** Automatically finish a choice if not currently complete. */
	autoChoose() {
		if (this.requestState === 'teampreview') {
			if (!this.isChoiceDone()) this.chooseTeam();
		} else if (this.requestState === 'switch') {
			let i = 0;
			while (!this.isChoiceDone()) {
				if (!this.chooseSwitch()) throw new Error(`autoChoose switch crashed: ${this.choice.error}`);
				i++;
				if (i > 10) throw new Error(`autoChoose failed: infinite looping`);
			}
		} else if (this.requestState === 'move') {
			let i = 0;
			while (!this.isChoiceDone()) {
				if (!this.chooseMove()) throw new Error(`autoChoose crashed: ${this.choice.error}`);
				i++;
				if (i > 10) throw new Error(`autoChoose failed: infinite looping`);
			}
		}
		return true;
	}

	destroy() {
		// deallocate ourself

		// deallocate children and get rid of references to them
		for (const pokemon of this.pokemon) {
			if (pokemon) pokemon.destroy();
		}

		for (const action of this.choice.actions) {
			delete action.side;
			delete action.pokemon;
			delete action.target;
		}
		this.choice.actions = [];

		// get rid of some possibly-circular references
		this.pokemon = [];
		this.active = [];
		this.foe = null;
		(this ).battle = null;
	}
} exports.Side = Side;
