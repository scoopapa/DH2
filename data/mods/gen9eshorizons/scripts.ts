/*namespace TierTypes {
	export type Singles = "AG" | "Uber" | "(Uber)" | "OU" | "(OU)" | "UUBL" | "UU" | "RUBL" | "RU" | "NUBL" | "NU" |
	"(NU)" | "PUBL" | "PU" | "(PU)" | "NFE" | "LC Uber" | "LC";
	export type Doubles = "DUber" | "(DUber)" | "DOU" | "(DOU)" | "DBL" | "DUU" | "(DUU)" | "NFE" | "LC Uber" | "LC";
	export type Other = "Unreleased" | "Illegal" | "ES Uber" | "ES OU" | "ES NFE" | "ES LC" | "CAP" | "CAP NFE" | "CAP LC";
};*/
import {Pokemon} from '../../../sim/pokemon';
import {Battle} from '../../../sim/battle';

//const CHOOSABLE_TARGETS = new Set(['normal', 'any', 'adjacentAlly', 'adjacentAllyOrSelf', 'anyAlly', 'adjacentFoe']); //PS pls don't hate me

export const Scripts: ModdedBattleScriptsData = {
	teambuilderConfig: {
		excludeStandardTiers: true,
		customTiers: ['ES', 'OU', 'Uber', 'NFE', 'LC'],
	},
	/* sim edits */
	pokemon: {
		isValidTarget(): boolean { //New property to condense fainted, Play Dead, and Commanding checks
			return !(this.fainted || this.volatiles['playdead'] || this.volatiles['commanding']);
		},
		oppositeFoe(): Pokemon { //Direct opposite foe in Doubles/Triples battles
			return this.side.foe.active[this.side.foe.active.length - 1 - this.position];
		},
		getSmartTargets(target: Pokemon, move: ActiveMove) { //Triple Battle targeting and Commander/Play Dead
			let target2: Pokemon = undefined;
			if (target.adjacentAllies().length === 2 && (this.tacticianBoosted || this.position === 1)){
				const targetPos = this.battle.sample([0, 1]); //Pick random ally
				target2 = target.adjacentAllies()[targetPos];
				if (!target2 || target2 === this || !target2.hp || !target2.isValidTarget()) { //Ally is invalid, try the other
					target2 = target.adjacentAllies()[1 - targetPos];
					if (!target2 || target2 === this || !target2.hp || !target2.isValidTarget()) { //Both are invalid, hit the original twice
						move.smartTarget = false;
						return [target];
					}
				}
				if (target === this || !target.hp || !target.isValidTarget()) {
					target = target.adjacentAllies()[1 - targetPos]; //Check other ally
					if (!target || target === this || !target.hp || !target.isValidTarget()) { //Other ally is invalid, hit first twice
						move.smartTarget = false;
						return [target2];
					}
				}
			} else {
				target2 = target.adjacentAllies()[0];
				if (!target2 || target2 === this || !target2.hp || !target2.isValidTarget()) {
					move.smartTarget = false;
					return [target];
				}
				if (target === this || !target.hp || !target.isValidTarget()) {
					move.smartTarget = false;
					return [target2];
				}
			}
			return [target, target2];
		},
		getMoveTargets(move: ActiveMove, target: Pokemon): {targets: Pokemon[], pressureTargets: Pokemon[]} { //Commander and Play Dead
			let targets: Pokemon[] = [];
			let pressureTargets;

			switch (move.target) {
			case 'all':
			case 'foeSide':
			case 'allySide':
			case 'allyTeam':
				if (!move.target.startsWith('foe')) {
					targets.push(...this.alliesAndSelf());
				}
				if (!move.target.startsWith('ally')) {
					targets.push(...this.foes(true));
				}
				if (targets.length && !targets.includes(target)) {
					this.battle.retargetLastMove(targets[targets.length - 1]);
				}
				break;
			case 'allAdjacent':
				targets.push(...this.adjacentAllies());
				// falls through
			case 'allAdjacentFoes':
				targets.push(...this.adjacentFoes());
				if (targets.length && !targets.includes(target)) {
					this.battle.retargetLastMove(targets[targets.length - 1]);
				}
				break;
			case 'allies':
				targets = this.alliesAndSelf();
				break;
			default:
				const selectedTarget = target;
				if (!target || (!target.isValidTarget && target.side !== this.side)) {
					// If a targeted foe faints, Plays Dead, or is off the field from Commander, the move is retargeted
					const possibleTarget = this.battle.getRandomTarget(this, move);
					if (!possibleTarget) return {targets: [], pressureTargets: []};
					target = possibleTarget;
				}
				if (target.side.active.length > 1 && !move.tracksTarget) {
					const isCharging = move.flags['charge'] && !this.volatiles['twoturnmove'] &&
						!(move.id.startsWith('solarb') && this.battle.field.isWeather(['sunnyday', 'desolateland'])) &&
						!((this.hasItem('powerherb') || !this.hasAbility('tireless')) && move.id !== 'skydrop');
					if (!isCharging) {
						target = this.battle.priorityEvent('RedirectTarget', this, this, move, target);
					}
				}
				if (move.smartTarget) {
					targets = this.getSmartTargets(target, move);
					target = targets[0];
				} else {
					targets.push(target);
				}
				if (!target.isValidTarget()) {
					return {targets: [], pressureTargets: []};
				}
				if (selectedTarget !== target) {
					this.battle.retargetLastMove(target);
				}

				// Resolve apparent targets for Pressure.
				if (move.pressureTarget) {
					// At the moment, this is the only supported target.
					if (move.pressureTarget === 'foeSide') {
						pressureTargets = this.foes();
					}
				}
			}
			targets.filter(target => !target.volatiles['commanding']);
			return {targets, pressureTargets: pressureTargets || targets};
		},
		getMoves(lockedMove?: string | null, restrictData?: boolean): { //Tactician and 3-charge Spit Up targeting
			move: string, id: string, disabled?: string | boolean, disabledSource?: string,
			target?: string, pp?: number, maxpp?: number,
		}[] {
			if (lockedMove) {
				lockedMove = this.battle.toID(lockedMove);
				this.trapped = true;
				if (lockedMove === 'recharge') {
					return [{
						move: 'Recharge',
						id: 'recharge',
					}];
				}
				for (const moveSlot of this.moveSlots) {
					if (moveSlot.id !== lockedMove) continue;
					return [{
						move: moveSlot.move,
						id: moveSlot.id,
					}];
				}
				// does this happen?
				return [{
					move: this.battle.dex.moves.get(lockedMove).name,
					id: lockedMove,
				}];
			}
			const moves = [];
			let hasValidMove = false;
			for (const moveSlot of this.moveSlots) {
				let moveName = moveSlot.move;
				if (moveSlot.id === 'hiddenpower') {
					moveName = 'Hidden Power ' + this.hpType;
				} else if (moveSlot.id === 'return' || moveSlot.id === 'frustration') {
					const basePowerCallback = this.battle.dex.moves.get(moveSlot.id).basePowerCallback as (pokemon: Pokemon) => number;
					moveName += ' ' + basePowerCallback(this);
				}
				let target = moveSlot.target;
				if (moveSlot.id === 'curse') {
					if (!this.hasType('Ghost')) {
						target = this.battle.dex.moves.get('curse').nonGhostTarget || moveSlot.target;
					}
				}
				if (moveSlot.id === 'spitup' && this.volatiles['stockpile']?.layers === 3) {
					target = 'allAdjacentFoes';
				}
				if(this.tacticianBoosted){
					switch(target) {
					case 'normal':
						target = 'any';
						break;
					case 'adjacentAllyOrSelf':
						target = 'anyAlly';
						break;
					}
				}
				let disabled = moveSlot.disabled;
				if (
					(moveSlot.pp <= 0 && !this.volatiles['partialtrappinglock']) || disabled &&
					this.side.active.length >= 2 && this.battle.actions.targetTypeChoices(target!)
				) {
					disabled = true;
				}

				if (!disabled) {
					hasValidMove = true;
				} else if (disabled === 'hidden' && restrictData) {
					disabled = false;
				}

				moves.push({
					move: moveName,
					id: moveSlot.id,
					pp: moveSlot.pp,
					maxpp: moveSlot.maxpp,
					target,
					disabled,
				});
			}
			return hasValidMove ? moves : [];
		},
		getStrongestMove(target: Pokemon, seeItem?: boolean){ //New function used by Forewarn & Glyphic Spell for finding the move to reveal
			let strongestMove: ([String, String][]) = undefined;
			for (const moveSlot of this.moveSlots) {
				let bestBP = 1;
				const move = this.battle.dex.moves.get(moveSlot.move);
				//console.log("Forewarn investigating " + move.name);
				if(!move) continue;
				let bp = move.basePower;
				let direct = false; //direct damage moves won't need additional calcs later
				if ((['powertrip','punishment','storedpower','trumpcard'].includes(move.id)) || !bp && move.category !== 'Status'){ //Special cases
					switch(move.id){
					//Fixed-damage moves: Twice the percentage of max HP the move deals
					case('dragonrage'):
					case('sonicboom'):
						bp = move.damage / target.maxhp * 200;
						direct = true;
						break;
					case('endeavor'):
						bp = (target.hp - target.hp) / target.maxhp * 200;
						direct = true;
						break;
					case('finalgambit'):
						bp = target.hp / target.maxhp * 200;
						direct = true;
						break;
					case('natureswrath'):
					case('superfang'):
						bp = target.hp / 2 / target.maxhp * 200;
						direct = true;
						break;
					case('nightshade'):
					case('psywave'): //Damage variance is ignored
					case('seismictoss'):
						bp = target.level / target.maxhp * 200;
						direct = true;
						break;
					case('fissure'): //OHKOs: Would be faster for these moves to check for move.ohko,
					case('guillotine'): // but the switch is called for everything else anyway
					case('horndrill'): // and I like the organization of this better
					case('sheercold'):
					case('underflame'):
						bp = 200;
						direct = true;
						break;
					//Variable-power moves
					case('beatup'): //The number of unfainted/unstatused Pokemon is known, but their Attack might not be so it assumes 10 (the old BP) for simplicity
						bp = 10 * this.side.target.filter(ally => ally === target || !ally.fainted && !ally.status).length;
						break;
					case('lastrespects'): //Same but fainted
						bp = 10 * this.side.target.filter(ally => ally.fainted).length;
						break;
					case('poltergeist'):
						const item = target.getItem();
						bp = (item.fling) ? 80 + item.fling.basePower : 0;
						break;
					//All these move use basePowerCallback, so use that to get an accurate number
					case('crushgrip'):
					case('flail'):
					case('grassknot'):
					case('heatcrash'):
					case('heavyslam'):
					case('lowkick'):
					case('reversal'):
					case('powertrip'):
					case('punishment'):
					case('storedpower'):
					case('trumpcard'):
					case('wringout'):
						bp = move.basePowerCallback(this, target);
					//VP moves which return default values because they require information the player can't see
					case('fling'): //Held item. I lied, Glyphic Spell also shows items, so it will accurately predict the power in that case
						if(seeItem){
							const item = this.getItem();
							bp = (item.fling) ? item.fling.basePower : 0;
						} else {
							bp = 20; //This value is the most-used
						}
						break;
					case('naturalgift'): //Held item
						if(seeItem){
							const item = this.getItem();
							bp = (item.naturalGift) ? item.naturalGift.basePower : 0;
						} else {
							bp = 70;
						}
						break;
					case('frustration'): //Happiness
						bp = 102;
						break;
					case('return'): //Happiness
						bp = 60;
						break;
					case('electroball'): //Speed
					case('gyroball'):
						bp = 80;
						break;
					//Counter, Mirror Coat, Metal Burst, Rebound are damage reflectors, and Equalizer needs the foe's max HP. Uses default value from original Forewarn
					default:
						bp = 120;
						direct = true;
					}
				}
				if(!direct){ //Further calculations
					//STAB
					if(move.onModifyType) this.battle.singleEvent('ModifyType', move, null, this, target);
					bp *= target.hasType(move.type) ? 1.5 : 1;
					bp *= (move.twoType && target.hasType(move.twoType)) ? 1.5 : 1;
					//Type effectiveness
					bp *= Math.pow(2, this.battle.dex.getEffectiveness(move, target));
					if (move.multihit){
						if(Array.isArray(move.multihit)){ //Move has variable hits
							bp *= move.multihit[1]; //Assumes maximum value
						} else {
							bp *= move.multihit;
						}
					}
				}
				if(!target.runImmunity(move.type) || (move.twoType && !target.runImmunity(move.twoType))) bp = 0;
				//console.log(move.name + "'s base power is " + bp);
				if(bp >= bestBP){
					if(bp === bestBP && strongestMove){ //Multiple equally valid choices, use both
						strongestMove.push([this.fullname, move.id]);
						//console.log("Adding to Forewarn list. " + strongestMove);
					} else {
						strongestMove = [[this.fullname, move.id]];
						//console.log("Overriding Forewarn list. " + strongestMove);
					}
					bestBP = bp;
				}
			}
			return strongestMove;
		},
		setType(newType: string | string[], enforce = false) { //Stasis, Soak and friends can give Arceus/Silvally secondary types
			// First type of Arceus, Silvally cannot be normally changed
			if(this.volatiles['stasis']) return false;
			if (!enforce) {
				if (this.species.num === 493 || this.species.num === 773) {
					return false;
				}
			}

			if (!newType) throw new Error("Must pass type to setType");
			this.types = (typeof newType === 'string' ? [newType] : newType);
			this.addedType = '';
			this.knownType = true;
			this.apparentType = this.types.join('/');

			return true;
		},
		getTypes(excludeAdded?: boolean): string[] { //Roost allows complete typelessness. Also, added types no longer exist.
			const types = this.battle.runEvent('Type', this, null, null, this.types);
			if (types.length) return types;
			return '???';
		},
		isGrounded(negateImmunity = false, smackDownCheck = false) { //Has additional conditions. See also canFloat() below
			if (!this.canFloat()) return true;
			if (this.volatiles['roost'] || this.volatiles['dig'] || this.volatiles['dive']) return true;
			if (this.volatiles['magnetrise'] || this.volatiles['risingchorus'] || this.volatiles['telekinesis']) return false;
			if (!smackDownCheck && this.volatiles['smackdown']) return true; //Smack Down checks this to see if it should stay applied, so this fixes it seeing itself and saying no
			if (!negateImmunity && this.hasType('Flying')) return false; // ???/Flying from Burn Up is no longer typeless.
			if (this.hasAbility('levitate') && !this.battle.suppressingAbility(this)) return false;
			const item = (this.ignoringItem() ? '' : this.item);
			return item !== 'airballoon';
		},
		canFloat(){ //New method. Not all effects that ground a Pokemon force it to stay grounded. Pokemon immune to Telekinesis are now immune to all floating.
			if (['Burrorm', 'Burryrm', 'Colossoil', 'Diglett', 'Dorsoil', 'Dugtrio', 'Palossand', 'Sandygast', 'Wiglett', 'Wugtrio'].includes(this.baseSpecies.baseSpecies)){
				this.battle.hint("The Burrorm, Diglett, Sandygast, and Wiglett families are unable to float.");
				return false;
			}
			if (this.hasAbility('suctioncups') || this.hasAbility('heavymetal')) return false;
			if ('gravity' in this.battle.field.pseudoWeather) return false;
			if (this.volatiles['ingrain']) return false;
			const item = (this.ignoringItem() ? '' : this.item);
			if (item === 'ironball') return false;
			return true;
		},
		getMoveRequestData() { //Disable Mega Evolve/Ultra Burst button if Magic Room suppresses
			let lockedMove = this.getLockedMove();
			let magicRoom = 'magicroom' in this.battle.field.pseudoWeather;

			// Information should be restricted for the last active Pokémon
			const isLastActive = this.isLastActive();
			const canSwitchIn = this.battle.canSwitch(this.side) > 0;
			let moves = this.getMoves(lockedMove, isLastActive);

			if (!moves.length) {
				moves = [{move: 'Struggle', id: 'struggle', target: 'randomNormal', disabled: false}];
				lockedMove = 'struggle';
			}

			const data: {
				moves: {move: string, id: string, target?: string, disabled?: string | boolean}[],
				maybeDisabled?: boolean,
				trapped?: boolean,
				maybeTrapped?: boolean,
				canMegaEvo?: boolean,
				canUltraBurst?: boolean,
				canZMove?: AnyObject | null,
				canDynamax?: boolean,
				maxMoves?: DynamaxOptions,
			} = {
				moves,
			};

			if (isLastActive) {
				if (this.maybeDisabled) {
					data.maybeDisabled = true;
				}
				if (canSwitchIn) {
					if (this.trapped === true) {
						data.trapped = true;
					} else if (this.maybeTrapped) {
						data.maybeTrapped = true;
					}
				}
			} else if (canSwitchIn) {
				// Discovered by selecting a valid Pokémon as a switch target and cancelling.
				if (this.trapped) data.trapped = true;
			}

			if (!lockedMove) {
				if (this.canMegaEvo && !magicRoom) data.canMegaEvo = true;
				if (this.canUltraBurst && !magicRoom) data.canUltraBurst = true;
			}

			return data;
		},
		cureStatus(silent = false) { //Adds a runEvent to the cure for effects (namely, Stasis) that prevent it.
			if (!this.hp || !this.status) return false;
			const result: boolean = this.battle.runEvent('RemoveStatus', this, null, null, this.status);
			if (!result) {
				this.battle.debug('cure status [' + status.id + '] interrupted');
				return result;
			}
			this.battle.add('-curestatus', this, this.status, silent ? '[silent]' : '[msg]');
			if (this.status === 'slp' && !this.hasAbility('comatose') && this.removeVolatile('nightmare')) {
				this.battle.add('-end', this, 'Nightmare', '[silent]');
			}
			this.setStatus('');
			return true;
		},
		trySetStatus( //Actually uses ignoreImmunities option for Corrosion and Mycelium Might on moves.
		  status: string | Condition, source: Pokemon | null = null, sourceEffect: Effect | null = null) {
			/*status = this.battle.dex.conditions.get(status); //I would like to clean this up if the cases I'm preparing for with this code don't actually exist
			if(!(source?.ignoringAbility()) && source?.hasAbility('potency') && (status.id === 'psn')) status = this.battle.dex.conditions.get('tox');
			console.log("Trying to set " + status.name + " from " + source.name + "'s " + sourceEffect);
			const canIgnore = sourceEffect?.ignoreImmunity;
			console.log("canIgnore = " + canIgnore);
			const ignoreImmunities = (!source || source !== this) && canIgnore && (canIgnore === true || canIgnore[status.id]);
			console.log("ignoreImmunities = " + ignoreImmunities);*/
			let ignoreImmunities = false;
			if(source && source !== this && !source.ignoringAbility()){
				if(source.hasAbility('myceliummight')) ignoreImmunities = true;
				if(source.hasAbility('corrosion') && ['tox','psn'].includes(status.id || status)) ignoreImmunities = true;
			}
			return this.setStatus(this.status || status, source, sourceEffect, ignoreImmunities);
		},
		setStatus( //Simplifies immunity check per above, which also means Corrosion doesn't affect Toxic Orb on self.
			status: Condition,
			source: Pokemon | null = null,
			sourceEffect: Effect | null = null,
			ignoreImmunities: boolean = false
		) {
			if (!this.hp) return false;
			status = this.battle.dex.conditions.get(status);
			if (this.battle.event) {
				if (!source) source = this.battle.event.source;
				if (!sourceEffect) sourceEffect = this.battle.effect;
			}
			if (!source) source = this;

			if (this.status === status.id) {
				if ((sourceEffect as Move)?.status === this.status) {
					this.battle.add('-fail', this, this.status);
				} else if ((sourceEffect as Move)?.status) {
					this.battle.add('-fail', source);
					this.battle.attrLastMove('[still]');
				}
				return false;
			}

			if (!ignoreImmunities && status.id) {
				if (!this.runStatusImmunity(status.id === 'tox' ? 'psn' : status.id)) {
					this.battle.debug('immune to status');
					if ((sourceEffect as Move)?.status) {
						this.battle.add('-immune', this);
					}
					return false;
				}
			}
			const prevStatus = this.status;
			const prevStatusData = this.statusData;
			if (status.id) {
				const result: boolean = this.battle.runEvent('SetStatus', this, source, sourceEffect, status);
				if (!result) {
					this.battle.debug('set status [' + status.id + '] interrupted');
					return result;
				}
			}

			this.status = status.id;
			this.statusData = {id: status.id, target: this};
			if (source) this.statusData.source = source;
			if (status.duration) this.statusData.duration = status.duration;
			if (status.durationCallback) {
				this.statusData.duration = status.durationCallback.call(this.battle, this, source, sourceEffect);
			}

			if (status.id && !this.battle.singleEvent('Start', status, this.statusData, this, source, sourceEffect)) {
				console.log('status start [' + status.id + '] interrupted');
				// cancel the setstatus
				this.status = prevStatus;
				this.statusData = prevStatusData;
				return false;
			}
			if (status.id && !this.battle.runEvent('AfterSetStatus', this, source, sourceEffect, status)) {
				return false;
			}
			return true;
		},
		addVolatile( //Mycelium Might immunity
			status: string | Condition, source: Pokemon | null = null, sourceEffect: Effect | null = null,
			linkedStatus: string | Condition | null = null
		): boolean | any {
			let result;
			status = this.battle.dex.conditions.get(status);
			if (!this.hp && !status.affectsFainted) return false;
			if (linkedStatus && source && !source.hp) return false;
			if (this.battle.event) {
				if (!source) source = this.battle.event.source;
				if (!sourceEffect) sourceEffect = this.battle.effect;
			}
			if (!source) source = this;

			if (this.volatiles[status.id]) {
				if (!status.onRestart) return false;
				return this.battle.singleEvent('Restart', status, this.volatiles[status.id], this, source, sourceEffect);
			}
			if (!(source && !source.ignoringAbility() && source.hasAbility('myceliummight')) && !this.runStatusImmunity(status.id)) {
				this.battle.debug('immune to volatile status');
				if ((sourceEffect as Move)?.status) {
					this.battle.add('-immune', this);
				}
				return false;
			}
			result = this.battle.runEvent('TryAddVolatile', this, source, sourceEffect, status);
			if (!result) {
				this.battle.debug('add volatile [' + status.id + '] interrupted');
				return result;
			}
			this.volatiles[status.id] = {id: status.id};
			this.volatiles[status.id].target = this;
			if (source) {
				this.volatiles[status.id].source = source;
				this.volatiles[status.id].sourcePosition = source.position;
			}
			if (sourceEffect) this.volatiles[status.id].sourceEffect = sourceEffect;
			if (status.duration) this.volatiles[status.id].duration = status.duration;
			if (status.durationCallback) {
				this.volatiles[status.id].duration = status.durationCallback.call(this.battle, this, source, sourceEffect);
			}
			result = this.battle.singleEvent('Start', status, this.volatiles[status.id], this, source, sourceEffect);
			if (!result) {
				// cancel
				delete this.volatiles[status.id];
				return result;
			}
			if (linkedStatus && source) {
				if (!source.volatiles[linkedStatus.toString()]) {
					source.addVolatile(linkedStatus, this, sourceEffect);
					source.volatiles[linkedStatus.toString()].linkedPokemon = [this];
					source.volatiles[linkedStatus.toString()].linkedStatus = status;
				} else {
					source.volatiles[linkedStatus.toString()].linkedPokemon.push(this);
				}
				this.volatiles[status.toString()].linkedPokemon = [source];
				this.volatiles[status.toString()].linkedStatus = linkedStatus;
			}
			return true;
		},
		removeVolatile(status: string | Effect) { //Adds a runEvent to the removal for effects (namely, Stasis) that prevent it.
			if (!this.hp) return false;
			status = this.battle.dex.conditions.get(status) as Effect;
			if (!this.volatiles[status.id]) return false;
			if(this.volatiles['stasis']?.affectedStatuses.includes(status.id)){ //Can't get the RemoveVolatile event to fail, so I'm hardcoding it beforehand
				this.battle.debug('remove volatile [' + status.id + '] interrupted');
				return false;
			}
			const result: boolean = this.battle.singleEvent('TryRemoveVolatile', this, null, null, this.status);
			if(!result){
				this.battle.debug('remove volatile [' + status.id + '] interrupted');
				return false;
			}
			this.battle.singleEvent('End', status, this.volatiles[status.id], this);
			const linkedPokemon = this.volatiles[status.id].linkedPokemon;
			const linkedStatus = this.volatiles[status.id].linkedStatus;
			delete this.volatiles[status.id];
			if (linkedPokemon) {
				this.removeLinkedVolatiles(linkedStatus, linkedPokemon);
			}
			return true;
		},
		ignoringAbility() { //Glyphic Spell's Negate
			// Check if any active pokemon have the ability Neutralizing Gas (MODDED: or Glyphic Spell's Negate)
			let neutralizinggas = false;
			for (const pokemon of this.battle.getAllActive()) {
				// can't use hasAbility because it would lead to infinite recursion
				if ((pokemon.ability === 'neutralizinggas' || (pokemon.ability === 'glyphicspell' && pokemon.abilityState.unownType === 'N')) && !pokemon.volatiles['gastroacid'] &&
					!pokemon.abilityState.ending) {
					neutralizinggas = true;
					break;
				}
			}

			return !!(
				!this.isActive ||
				((this.volatiles['gastroacid'] || (neutralizinggas && this.ability !== ('neutralizinggas' as ID) && !(this.ability === ('glyphicspell' as ID) && this.abilityState.unownType === 'N'))) &&
				!this.getAbility().isPermanent
				)
			);
		},
		formeChange( //Power Trick
			speciesId: string | Species, source: Effect = this.battle.effect,
			isPermanent?: boolean, message?: string
		) {
			const rawSpecies = this.battle.dex.species.get(speciesId);

			const species = this.setSpecies(rawSpecies, source);
			if (!species) return false;

			if (this.battle.gen <= 2) return true;

			// The species the opponent sees
			const apparentSpecies =
				this.illusion ? this.illusion.species.name : species.baseSpecies;
			if (isPermanent) {
				this.baseSpecies = rawSpecies;
				this.details = species.name + (this.level === 100 ? '' : ', L' + this.level) +
					(this.gender === '' ? '' : ', ' + this.gender) + (this.set.shiny ? ', shiny' : '');
				this.battle.add('detailschange', this, (this.illusion || this).details);
				if (source.effectType === 'Item') {
					if (source.zMove) {
						this.battle.add('-burst', this, apparentSpecies, species.requiredItem);
						this.moveThisTurnResult = true; // Ultra Burst counts as an action for Truant
					} else if (source.onPrimal) {
						if (this.illusion) {
							this.ability = '';
							this.battle.add('-primal', this.illusion);
						} else {
							this.battle.add('-primal', this);
						}
					} else {
						this.battle.add('-mega', this, apparentSpecies, species.requiredItem);
						this.moveThisTurnResult = true; // Mega Evolution counts as an action for Truant
					}
				} else if (source.effectType === 'Status') {
					// Shaymin-Sky -> Shaymin
					this.battle.add('-formechange', this, species.name, message);
				}
			} else {
				if (source.effectType === 'Ability') {
					this.battle.add('-formechange', this, species.name, message, `[from] ability: ${source.name}`);
				} else {
					this.battle.add('-formechange', this, this.illusion ? this.illusion.species.name : species.name, message);
				}
			}
			if (isPermanent && !['disguise', 'iceface'].includes(source.id)) {
				if (this.illusion) {
					this.ability = ''; // Don't allow Illusion to wear off
				}
				this.setAbility(species.abilities['0'], null, true);
				this.baseAbility = this.ability;
			}
			if(this.volatiles['powertrick']){
				const newatk = this.storedStats.def;
				const newdef = this.storedStats.atk;
				const newspa = this.storedStats.spd;
				const newspd = this.storedStats.spa;
				this.storedStats.atk = newatk;
				this.storedStats.def = newdef;
				this.storedStats.spa = newspa;
				this.storedStats.spd = newspd;
			}
			return true;
		},
		transformInto(pokemon: Pokemon, effect?: Effect) { //Copy Power Trick, and Glyphic Spell if you're an Unown too
			const species = pokemon.species;
			if (pokemon.fainted || pokemon.illusion || pokemon.volatiles['substitute'] || pokemon.transformed || this.transformed) {
				return false;
			}

			if (!this.setSpecies(species, effect, true)) return false;

			this.transformed = true;
			this.weighthg = pokemon.weighthg;

			const types = pokemon.getTypes(true);
			this.setType(pokemon.volatiles['roost'] ? pokemon.volatiles['roost'].typeWas : types, true);
			this.knownType = this.side === pokemon.side && pokemon.knownType;
			this.apparentType = pokemon.apparentType;

			let statName: StatNameExceptHP;
			for (statName in this.storedStats) {
				this.storedStats[statName] = pokemon.storedStats[statName];
			}
			this.moveSlots = [];
			for (const moveSlot of pokemon.moveSlots) {
				let moveName = moveSlot.move;
				if (moveSlot.id === 'hiddenpower') {
					moveName = 'Hidden Power ' + this.hpType;
				}
				this.moveSlots.push({
					move: moveName,
					id: moveSlot.id,
					pp: moveSlot.maxpp === 1 ? 1 : 5,
					maxpp: (moveSlot.maxpp === 1 ? 1 : 5),
					target: moveSlot.target,
					disabled: false,
					used: false,
					virtual: true,
				});
			}
			let boostName: BoostName;
			for (boostName in pokemon.boosts) {
				this.boosts[boostName] = pokemon.boosts[boostName]!;
			}
			const volatilesToCopy = ['focusenergy', 'laserfocus', 'powertrick'];
			for (const volatile of volatilesToCopy) {
				if (pokemon.volatiles[volatile]) {
					this.addVolatile(volatile);
				} else {
					this.removeVolatile(volatile);
				}
			}
			if(pokemon.species.baseSpecies === 'Unown' && this.species.baseSpecies === 'Unown' && pokemon.abilityState.unownType){
				this.abilityState.unownType = pokemon.abilityState.unownType;
				delete this.abilityState.formeDecided; //will need to re-assign Copy spell on next switch
			}
			if (effect) {
				this.battle.add('-transform', this, pokemon, '[from] ' + effect.fullname);
			} else {
				this.battle.add('-transform', this, pokemon);
			}
			return true;
		},
	},
	field: {
		suppressingWeather() {
			if('midnight' in this.pseudoWeather) return true;
			for (const side of this.battle.sides) {
				for (const pokemon of side.active) {
					if (pokemon && !pokemon.ignoringAbility() && pokemon.getAbility().suppressWeather) {
						return true;
					}
				}
			}
			return false;
		},
		suppressingTerrain(){
			if('midnight' in this.pseudoWeather) return true;
			for (const side of this.battle.sides) {
				for (const pokemon of side.active) {
					if (pokemon && !pokemon.ignoringAbility() && pokemon.getAbility().suppressTerrain) {
						return true;
					}
				}
			}
			return false;
		},
		setTerrain(status: string | Effect, source: Pokemon | 'debug' | null = null, sourceEffect: Effect | null = null) {
			status = this.battle.dex.conditions.get(status);
			if (!sourceEffect && this.battle.effect) sourceEffect = this.battle.effect;
			if (!source && this.battle.event && this.battle.event.target) source = this.battle.event.target;
			if (source === 'debug') source = this.battle.sides[0].active[0];
			if (!source) throw new Error(`setting terrain without a source`);
			
			const result = this.battle.runEvent('SetTerrain', source, source, status);
			if (!result) {
				if (result === false) {
					if ((sourceEffect as Move)?.terrain) {
						this.battle.add('-fail', source, sourceEffect, '[from] ' + this.terrain);
					} else if (sourceEffect && sourceEffect.effectType === 'Ability') {
						this.battle.add('-ability', source, sourceEffect, '[from] ' + this.terrain, '[fail]');
					}
				}
				return null;
			}

			if (this.terrain === status.id) return false;
			const prevTerrain = this.terrain;
			const prevTerrainState = this.terrainState;
			this.terrain = status.id;
			this.terrainState = {
				id: status.id,
				source,
				sourceSlot: source.getSlot(),
				duration: status.duration,
			};
			if (status.durationCallback) {
				this.terrainState.duration = status.durationCallback.call(this.battle, source, source, sourceEffect);
			}
			if (!this.battle.singleEvent('FieldStart', status, this.terrainState, this, source, sourceEffect)) {
				this.terrain = prevTerrain;
				this.terrainState = prevTerrainState;
				return false;
			}
			this.battle.eachEvent('TerrainChange', sourceEffect);
			return true;
		},
		effectiveTerrain(target?: Pokemon | Side | Battle) {
			if (this.suppressingTerrain()){
				//console.log("Terrain is suppressed");
				return '';
			}
			if (this.battle.event && !target) target = this.battle.event.target;
			return this.battle.runEvent('TryTerrain', target) ? this.terrain : '';
		},
	},
	side: {
		randomActive() { //Play Dead/Commander exclusion
			const actives = this.active.filter(active => active && active.isValidTarget());
			if (!actives.length) return null;
			return this.battle.sample(actives);
		},
		/*choose(input: string) {
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
				let [choiceType, data] = Utils.splitFirst(choiceString.trim(), ' ');
				data = data.trim();

				switch (choiceType) {
				case 'move':
					console.log("Choosing " + choiceString);
					const original = data;
					const error = () => this.emitChoiceError(`Conflicting arguments for "move": ${original}`);
					let targetLoc: number | undefined;
					let event: 'mega' | 'zmove' | 'ultra' | 'dynamax' | 'terastallize' | '' = '';
					while (true) {
						// If data ends with a number, treat it as a target location.
						// We need to special case 'Conversion 2' so it doesn't get
						// confused with 'Conversion' erroneously sent with the target
						// '2' (since Conversion targets 'self', targetLoc can't be 2).
						if (/\s(?:-|\+)?[1-3]$/.test(data) && toID(data) !== 'conversion2') {
							if (targetLoc !== undefined) return error();
							targetLoc = parseInt(data.slice(-2));
							data = data.slice(0, -2).trim();
						} else if (data.endsWith(' mega')) {
							if (event) return error();
							event = 'mega';
							data = data.slice(0, -5);
						} else if (data.endsWith(' zmove')) {
							if (event) return error();
							event = 'zmove';
							data = data.slice(0, -6);
						} else if (data.endsWith(' ultra')) {
							if (event) return error();
							event = 'ultra';
							data = data.slice(0, -6);
						} else if (data.endsWith(' dynamax')) {
							if (event) return error();
							event = 'dynamax';
							data = data.slice(0, -8);
						} else if (data.endsWith(' gigantamax')) {
							if (event) return error();
							event = 'dynamax';
							data = data.slice(0, -11);
						} else if (data.endsWith(' max')) {
							if (event) return error();
							event = 'dynamax';
							data = data.slice(0, -4);
						} else if (data.endsWith(' terastal')) {
							if (event) return error();
							event = 'terastallize';
							data = data.slice(0, -9);
						} else if (data.endsWith(' terastallize')) {
							if (event) return error();
							event = 'terastallize';
							data = data.slice(0, -13);
						} else {
							break;
						}
					}
					if (!this.chooseMove(data, targetLoc, event)) return false;
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
		},*/
		chooseSwitch(slotText?: string) { //totalFainted matches actual fainted and lowers on revival
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
			let slot;
			if (!slotText) {
				if (this.requestState !== 'switch') {
					return this.emitChoiceError(`Can't switch: You need to select a Pokémon to switch in`);
				}
				if (this.slotConditions[pokemon.position]['revivalblessing']) {
					slot = 0;
					while (!this.pokemon[slot].fainted) slot++;
				} else {
					if (!this.choice.forcedSwitchesLeft) return this.choosePass();
					slot = this.active.length;
					while (this.choice.switchIns.has(slot) || this.pokemon[slot].fainted) slot++;
				}
			} else {
				slot = parseInt(slotText!) - 1;
			}
			if (isNaN(slot) || slot < 0) {
				// maybe it's a name/species id!
				slot = -1;
				for (const [i, mon] of this.pokemon.entries()) {
					if (slotText!.toLowerCase() === mon.name.toLowerCase() || toID(slotText) === mon.species.id) {
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
			} else if (slot < this.active.length && !this.slotConditions[pokemon.position]['revivalblessing']) {
				return this.emitChoiceError(`Can't switch: You can't switch to an active Pokémon`);
			} else if (this.choice.switchIns.has(slot)) {
				return this.emitChoiceError(`Can't switch: The Pokémon in slot ${slot + 1} can only switch in once`);
			}
			const targetPokemon = this.pokemon[slot];

			if (this.slotConditions[pokemon.position]['revivalblessing']) {
				if (!targetPokemon.fainted) {
					return this.emitChoiceError(`Can't switch: You have to pass to a fainted Pokémon`);
				}
				// Should always subtract, but stop at 0 to prevent errors.
				this.choice.forcedSwitchesLeft = this.battle.clampIntRange(this.choice.forcedSwitchesLeft - 1, 0);
				this.totalFainted = this.battle.clampIntRange(this.totalFainted - 1, 0);
				pokemon.switchFlag = false;
				this.choice.actions.push({
					choice: 'revivalblessing',
					pokemon,
					target: targetPokemon,
				} as ChosenAction);
				return true;
			}

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
					if (includeRequest) this.emitRequest(this.activeRequest!);
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
			} as ChosenAction);

			return true;
		}
	},
	//battle: {
		validTargetLoc(targetLoc: number, source: Pokemon, targetType: string) { //Tactician and ally or self targeting
			if (targetLoc === 0) return true;
			const numSlots = this.activePerHalf;
			const sourceLoc = source.getLocOf(source);
			if (Math.abs(targetLoc) > numSlots) return false;
			const isSelf = (sourceLoc === targetLoc);
			const isFoe = (this.gameType === 'freeforall' ? !isSelf : targetLoc > 0);
			const acrossFromTargetLoc = -(numSlots + 1 - targetLoc);
			const isAdjacent = (targetLoc > 0 ?
				Math.abs(acrossFromTargetLoc - sourceLoc) <= 1 :
				Math.abs(targetLoc - sourceLoc) === 1);
			const canTargetAny = source.tacticianBoosted;
			if(targetType === 'anyAlly') console.log("anyAlly target? " + !isFoe || isSelf);

			if (this.gameType === 'freeforall' && targetType === 'adjacentAlly') {
				// moves targeting one ally can instead target foes in Battle Royal
				return isAdjacent;
			}

			switch (targetType) {
			case 'randomNormal':
			case 'scripted':
			case 'normal':
				return canTargetAny || isAdjacent;
			case 'adjacentAlly':
				return (canTargetAny || isAdjacent) && !isFoe;
			case 'adjacentAllyOrSelf':
				return (canTargetAny || isAdjacent) && !isFoe || isSelf;
			case 'anyAlly':
				return !isFoe || isSelf;
			case 'adjacentFoe':
				return (canTargetAny || isAdjacent) && isFoe;
			case 'any':
				return !isSelf;
			}
			return false;
		},
		getTarget(pokemon: Pokemon, move: string | Move, targetLoc: number, originalTarget?: Pokemon) {
			move = this.dex.moves.get(move);

			let tracksTarget = move.tracksTarget;
			// Stalwart sets trackTarget in ModifyMove, but ModifyMove happens after getTarget, so
			// we need to manually check for Stalwart here
			if (pokemon.hasAbility(['stalwart', 'propellertail'])) tracksTarget = true;
			if (tracksTarget && originalTarget && originalTarget.isActive && originalTarget.isValidTarget()) {
				// smart-tracking move's original target is on the field: target it
				return originalTarget;
			}

			// banning Dragon Darts from directly targeting itself is done in side.ts, but
			// Dragon Darts can target itself if Ally Switch is used afterwards
			if (move.smartTarget) {
				const curTarget = pokemon.getAtLoc(targetLoc);
				return curTarget && curTarget.isValidTarget() ? curTarget : this.getRandomTarget(pokemon, move);
			}

			// Fails if the target is the user and the move can't target its own position
			const selfLoc = pokemon.getLocOf(pokemon);
			if (['adjacentAlly', 'any', 'normal'].includes(move.target) && targetLoc === selfLoc &&
					!pokemon.volatiles['twoturnmove'] && !pokemon.volatiles['rollout']) {
				return move.flags['futuremove'] ? pokemon : null;
			}
			if (move.target !== 'randomNormal' && this.validTargetLoc(targetLoc, pokemon, move.target)) {
				const target = pokemon.getAtLoc(targetLoc);
				if (target?.fainted) {
					if (this.gameType === 'freeforall') {
						// Target is a fainted opponent in a free-for-all battle; attack shouldn't retarget
						return target;
					}
					if (target.isAlly(pokemon)) {
						// Target is a fainted ally: attack shouldn't retarget
						return target;
					}
				}
				if (target && target.isValidTarget()) {
					// Target is unfainted: use selected target location
					return target;
				}

				// Chosen target not valid,
				// retarget randomly with getRandomTarget
			}
			return this.getRandomTarget(pokemon, move);
		},
		getRandomTarget(pokemon: Pokemon, move: string | Move) { //Tactician, Play Dead, and Commander
			// A move was used without a chosen target

			// For instance: Metronome chooses Ice Beam. Since the user didn't
			// choose a target when choosing Metronome, Ice Beam's target must
			// be chosen randomly.

			// The target is chosen randomly from possible targets, EXCEPT that
			// moves that can target either allies or foes will only target foes
			// when used without an explicit target.

			move = this.dex.moves.get(move);
			if (move.target === 'adjacentAlly') {
				const allyActives = pokemon.side.active;
				let adjacentAllies = [allyActives[pokemon.position - 1], allyActives[pokemon.position + 1]];
				adjacentAllies = adjacentAllies.filter(active => active && !active.fainted);
				return adjacentAllies.length ? this.sample(adjacentAllies) : null;
			}
			if (['self','adjacentAllyOrSelf','anyAlly','all','allySide','allyTeam'].includes(move.target)) {
				return pokemon;
			}
			if (pokemon.side.active.length > 2) {
				if (!pokemon.tacticianBoosted && (move.target === 'adjacentFoe' || move.target === 'normal' || move.target === 'randomNormal')) {
					// even if a move can target an ally, auto-resolution will never make it target an ally
					// i.e. if both your opponents faint before you use Flamethrower, it will fail instead of targeting your ally
					const foeActives = pokemon.side.foe.active;
					const frontPosition = foeActives.length - 1 - pokemon.position;
					let adjacentFoes = foeActives.slice(frontPosition < 1 ? 0 : frontPosition - 1, frontPosition + 2);
					adjacentFoes = adjacentFoes.filter(active => active && active.isValidTarget());
					if (adjacentFoes.length) return this.sample(adjacentFoes);
					// no valid target at all, return a foe for any possible redirection
					return foeActives[frontPosition];
				}
			}
			if(pokemon.side.foe.active.length === 1 && pokemon.side.foe.active[0].volatiles['playdead']) return null; //Ran out of retarget checks, except for randomActive() which will get nothing in Singles
			return pokemon.side.foe.randomActive() || pokemon.side.foe.active[0];
		},
		modifyDamage( //Tactician, Dual-type STAB, Terrain check
			baseDamage: number, pokemon: Pokemon, target: Pokemon, move: ActiveMove, suppressMessages = false
		) {
			const tr = this.trunc;
			if (!move.type) move.type = '???';
			const type = move.type;

			baseDamage += 2;

			// multi-target modifier (doubles only)
			if (move.spreadHit && !pokemon.tacticianBoosted) {
				const spreadModifier = move.spreadModifier || (this.gameType === 'free-for-all' ? 0.5 : 0.75);
				this.debug('Spread modifier: ' + spreadModifier);
				baseDamage = this.modify(baseDamage, spreadModifier);
			}

			// field modifier
			baseDamage = this.runEvent('WeatherModifyDamage', pokemon, target, move, baseDamage);
			baseDamage = this.runEvent('TerrainModifyDamage', pokemon, target, move, baseDamage);

			// crit - not a modifier
			const isCrit = target.getMoveHitData(move).crit;
			if (isCrit) {
				baseDamage = tr(baseDamage * (move.critModifier || 1.5));
			}

			// random factor - also not a modifier
			baseDamage = this.randomizer(baseDamage);

			// STAB
			if (move.forceSTAB || (type !== '???' && pokemon.hasType(type))) {
				// The "???" type never gets STAB
				// Not even if you Roost in Gen 4 and somehow manage to use
				// Struggle in the same turn.
				// (On second thought, it might be easier to get a MissingNo.)
				baseDamage = this.modify(baseDamage, move.stab || 1.5);
			}
			if (move.twoType && pokemon.hasType(move.twoType)) {
				baseDamage = this.modify(baseDamage, move.stab || 1.5);
			}
			// types
			let typeMod = target.runEffectiveness(move);
			typeMod = this.clampIntRange(typeMod, -6, 6);
			target.getMoveHitData(move).typeMod = typeMod;
			if (typeMod > 0) {
				if (!suppressMessages) this.add('-supereffective', target);

				for (let i = 0; i < typeMod; i++) {
					baseDamage *= 2;
				}
			}
			if (typeMod < 0) {
				if (!suppressMessages) this.add('-resisted', target);

				for (let i = 0; i > typeMod; i--) {
					baseDamage = tr(baseDamage / 2);
				}
			}

			if (isCrit && !suppressMessages) this.add('-crit', target);

			if (pokemon.status === 'brn' && move.category === 'Physical' && !pokemon.hasAbility('guts')) {
				if (move.id !== 'facade') {
					baseDamage = this.modify(baseDamage, 0.5);
				}
			}

			// Final modifier. Modifiers that modify damage after min damage check, such as Life Orb.
			baseDamage = this.runEvent('ModifyDamage', pokemon, target, move, baseDamage);

			if (!baseDamage) return 1;

			// ...but 16-bit truncation happens even later, and can truncate to 0
			return tr(baseDamage, 16);
		},
		singleEvent(
			eventid: string, effect: Effect, state: AnyObject | null,
			target: string | Pokemon | Side | Field | Battle | null, source?: string | Pokemon | Effect | false | null,
			sourceEffect?: Effect | string | null, relayVar?: any, customCallback?: unknown
		) {
			if (this.eventDepth >= 8) {
				// oh fuck
				this.add('message', 'STACK LIMIT EXCEEDED');
				this.add('message', 'PLEASE REPORT IN BUG THREAD');
				this.add('message', 'Event: ' + eventid);
				this.add('message', 'Parent event: ' + this.event.id);
				throw new Error("Stack overflow");
			}
			if (this.log.length - this.sentLogPos > 1000) {
				this.add('message', 'LINE LIMIT EXCEEDED');
				this.add('message', 'PLEASE REPORT IN BUG THREAD');
				this.add('message', 'Event: ' + eventid);
				this.add('message', 'Parent event: ' + this.event.id);
				throw new Error("Infinite loop");
			}
			// this.add('Event: ' + eventid + ' (depth ' + this.eventDepth + ')');
			let hasRelayVar = true;
			if (relayVar === undefined) {
				relayVar = true;
				hasRelayVar = false;
			}

			if (effect.effectType === 'Status' && (target instanceof Pokemon) && target.status !== effect.id) {
				// it's changed; call it off
				return relayVar;
			}
			if (eventid !== 'Start' && eventid !== 'TakeItem' && eventid !== 'Primal' &&
				effect.effectType === 'Item' && (target instanceof Pokemon) && target.ignoringItem()) {
				this.debug(eventid + ' handler suppressed by Embargo, Klutz or Magic Room');
				return relayVar;
			}
			if (eventid !== 'End' && effect.effectType === 'Ability' && (target instanceof Pokemon) && target.ignoringAbility()) {
				this.debug(eventid + ' handler suppressed by Gastro Acid or Neutralizing Gas');
				return relayVar;
			}
			if (effect.effectType === 'Weather' && eventid !== 'FieldStart' && eventid !== 'FieldResidual' &&
			eventid !== 'FieldEnd' && this.field.suppressingWeather()) {
				this.debug(eventid + ' handler suppressed by Cloud Nine or Midnight');
				return relayVar;
			}
			if ((effect.effectType === 'Terrain' || eventid === 'Terrain') && eventid !== 'FieldStart' && eventid !== 'FieldResidual' &&
			eventid !== 'FieldEnd' && this.field.suppressingTerrain()) {
				this.debug(eventid + ' handler suppressed by Climate Break or Midnight');
				return relayVar;
			}

			const callback = customCallback || (effect as any)[`on${eventid}`];
			if (callback === undefined) return relayVar;

			const parentEffect = this.effect;
			const parentEffectState = this.effectState;
			const parentEvent = this.event;

			this.effect = effect;
			this.effectState = state || {};
			this.event = {id: eventid, target, source, effect: sourceEffect};
			this.eventDepth++;

			const args = [target, source, sourceEffect];
			if (hasRelayVar) args.unshift(relayVar);

			let returnVal;
			if (typeof callback === 'function') {
				returnVal = callback.apply(this, args);
			} else {
				returnVal = callback;
			}

			this.eventDepth--;
			this.effect = parentEffect;
			this.effectState = parentEffectState;
			this.event = parentEvent;

			return returnVal === undefined ? relayVar : returnVal;
		},
		runEvent(
			eventid: string, target?: Pokemon | Pokemon[] | Side | Battle | null, source?: string | Pokemon | false | null,
			sourceEffect?: Effect | null, relayVar?: any, onEffect?: boolean, fastExit?: boolean
		) {
			// if (Battle.eventCounter) {
			// 	if (!Battle.eventCounter[eventid]) Battle.eventCounter[eventid] = 0;
			// 	Battle.eventCounter[eventid]++;
			// }
			if (this.eventDepth >= 8) {
				// oh fuck
				this.add('message', 'STACK LIMIT EXCEEDED');
				this.add('message', 'PLEASE REPORT IN BUG THREAD');
				this.add('message', 'Event: ' + eventid);
				this.add('message', 'Parent event: ' + this.event.id);
				throw new Error("Stack overflow");
			}
			if (!target) target = this;
			let effectSource = null;
			if (source instanceof Pokemon) effectSource = source;
			const handlers = this.findEventHandlers(target, eventid, effectSource);
			if (onEffect) {
				if (!sourceEffect) throw new Error("onEffect passed without an effect");
				// @ts-ignore - dynamic lookup
				const callback = sourceEffect[`on${eventid}`];
				if (callback !== undefined) {
					if (Array.isArray(target)) throw new Error("");
					handlers.unshift(this.resolvePriority({
						effect: sourceEffect, callback, state: {}, end: null, effectHolder: target,
					}, `on${eventid}`));
				}
			}

			if (['Invulnerability', 'TryHit', 'DamagingHit', 'EntryHazard'].includes(eventid)) {
				handlers.sort(Battle.compareLeftToRightOrder);
			} else if (fastExit) {
				handlers.sort(Battle.compareRedirectOrder);
			} else {
				this.speedSort(handlers);
			}
			let hasRelayVar = 1;
			const args = [target, source, sourceEffect];
			// console.log('Event: ' + eventid + ' (depth ' + this.eventDepth + ') t:' + target.id + ' s:' + (!source || source.id) + ' e:' + effect.id);
			if (relayVar === undefined || relayVar === null) {
				relayVar = true;
				hasRelayVar = 0;
			} else {
				args.unshift(relayVar);
			}

			const parentEvent = this.event;
			this.event = {id: eventid, target, source, effect: sourceEffect, modifier: 1};
			this.eventDepth++;

			let targetRelayVars = [];
			if (Array.isArray(target)) {
				if (Array.isArray(relayVar)) {
					targetRelayVars = relayVar;
				} else {
					for (let i = 0; i < target.length; i++) targetRelayVars[i] = true;
				}
			}
			for (const handler of handlers) {
				if (handler.index !== undefined) {
					// TODO: find a better way to do this
					if (!targetRelayVars[handler.index] && !(targetRelayVars[handler.index] === 0 &&
						eventid === 'DamagingHit')) continue;
					if (handler.target) {
						args[hasRelayVar] = handler.target;
						this.event.target = handler.target;
					}
					if (hasRelayVar) args[0] = targetRelayVars[handler.index];
				}
				const effect = handler.effect;
				const effectHolder = handler.effectHolder;
				// this.debug('match ' + eventid + ': ' + status.id + ' ' + status.effectType);
				if (effect.effectType === 'Status' && (effectHolder as Pokemon).status !== effect.id) {
					// it's changed; call it off
					continue;
				}
				if (effect.effectType === 'Ability' && effect.isBreakable !== false &&
					this.suppressingAbility(effectHolder as Pokemon)) {
					if (effect.isBreakable) {
						this.debug(eventid + ' handler suppressed by Mold Breaker');
						continue;
					}
					if (!effect.num) {
						// ignore attacking events for custom abilities
						const AttackingEvents = {
							BeforeMove: 1,
							BasePower: 1,
							Immunity: 1,
							RedirectTarget: 1,
							Heal: 1,
							SetStatus: 1,
							CriticalHit: 1,
							ModifyAtk: 1, ModifyDef: 1, ModifySpA: 1, ModifySpD: 1, ModifySpe: 1, ModifyAccuracy: 1,
							ModifyBoost: 1,
							ModifyDamage: 1,
							ModifySecondaries: 1,
							ModifyWeight: 1,
							TryAddVolatile: 1,
							TryHit: 1,
							TryHitSide: 1,
							TryMove: 1,
							Boost: 1,
							DragOut: 1,
							Effectiveness: 1,
						};
						if (eventid in AttackingEvents) {
							this.debug(eventid + ' handler suppressed by Mold Breaker');
							continue;
						} else if (eventid === 'Damage' && sourceEffect && sourceEffect.effectType === 'Move') {
							this.debug(eventid + ' handler suppressed by Mold Breaker');
							continue;
						}
					}
				}
				if (eventid !== 'Start' && eventid !== 'SwitchIn' && eventid !== 'TakeItem' &&
					effect.effectType === 'Item' && (effectHolder instanceof Pokemon) && effectHolder.ignoringItem()) {
					if (eventid !== 'Update') {
						this.debug(eventid + ' handler suppressed by Embargo, Klutz or Magic Room');
					}
					continue;
				} else if (eventid !== 'End' && effect.effectType === 'Ability' &&
						(effectHolder instanceof Pokemon) && effectHolder.ignoringAbility()) {
					if (eventid !== 'Update') {
						this.debug(eventid + ' handler suppressed by Gastro Acid or Neutralizing Gas');
					}
					continue;
				}
				if ((effect.effectType === 'Weather' || eventid === 'Weather') && eventid !== 'FieldStart'
					&& eventid !== 'FieldResidual' && eventid !== 'FieldEnd' && this.field.suppressingWeather()) {
					this.debug(eventid + ' handler suppressed by Air Lock or Midnight');
					continue;
				}
				if ((effect.effectType === 'Terrain' || eventid === 'Terrain') && eventid !== 'FieldStart'
					&& eventid !== 'FieldResidual' && eventid !== 'FieldEnd' && this.field.suppressingTerrain()) {
					this.debug(eventid + ' handler suppressed by Climate Break or Midnight');
					continue;
					}
				let returnVal;
				if (typeof handler.callback === 'function') {
					const parentEffect = this.effect;
					const parentEffectState = this.effectState;
					this.effect = handler.effect;
					this.effectState = handler.state || {};
					this.effectState.target = effectHolder;

					returnVal = handler.callback.apply(this, args);

					this.effect = parentEffect;
					this.effectState = parentEffectState;
				} else {
					returnVal = handler.callback;
				}

				if (returnVal !== undefined) {
					relayVar = returnVal;
					if (!relayVar || fastExit) {
						if (handler.index !== undefined) {
							targetRelayVars[handler.index] = relayVar;
							if (targetRelayVars.every(val => !val)) break;
						} else {
							break;
						}
					}
					if (hasRelayVar) {
						args[0] = relayVar;
					}
				}
			}

			this.eventDepth--;
			if (typeof relayVar === 'number' && relayVar === Math.abs(Math.floor(relayVar))) {
				// this.debug(eventid + ' modifier: 0x' +
				// 	('0000' + (this.event.modifier * 4096).toString(16)).slice(-4).toUpperCase());
				relayVar = this.modify(relayVar, this.event.modifier);
			}
			this.event = parentEvent;

			return Array.isArray(target) ? targetRelayVars : relayVar;
		},
		residualEvent(eventid: string, relayVar?: any) { //Stasis
			let stasisMons: Pokemon[] = [];
			const callbackName = `on${eventid}`;
			let handlers = this.findBattleEventHandlers(callbackName, 'duration');
			handlers = handlers.concat(this.findFieldEventHandlers(this.field, callbackName, 'duration'));
			for (const side of this.sides) {
				handlers = handlers.concat(this.findSideEventHandlers(side, callbackName, 'duration'));
				for (const active of side.active) {
					if (!active) continue;
					if(active.volatiles['stasis']){
						stasisMons.push(active);
					}
					handlers = handlers.concat(this.findPokemonEventHandlers(active, callbackName, 'duration'));
				}
			}
			this.speedSort(handlers);
			while (handlers.length) {
				const handler = handlers[0];
				handlers.shift();
				const effect = handler.effect;
				const pokemon = (handler.effectHolder as Pokemon);
				if (pokemon.fainted) continue;
				if (handler.state && handler.state.duration) {
					if(stasisMons.includes(pokemon)){
						if(pokemon.volatiles['stasis']?.affectedStatuses.includes(effect.id)){
							continue;
						}
					}
					handler.state.duration--;
					if (!handler.state.duration) {
						const endCallArgs = handler.endCallArgs || [handler.effectHolder, effect.id];
						handler.end!.call(...endCallArgs as [any, ...any[]]);
						continue;
					}
				}
				this.singleEvent(eventid, effect, handler.state, handler.effectHolder, relayVar);
				this.faintMessages();
				if (this.ended) return;
			}
		},
		ngasActive() { //Glyphic Spell's Negate
			for (const active of this.getAllActive()) {
				if ((active.ability === 'Neutralizing Gas' || (active.ability === 'glyphicspell' && active.abilityState.unownType === 'N')) && !active.volatiles['gastroacid']) {
					return true;
				}
			}
			return false;
		},
	//},
	actions: {
		maxMoveTable: null,
		zMoveTable: null,
		runMove(moveOrMoveName, pokemon, targetLoc, sourceEffect, zMove, externalMove, maxMove, originalTarget) { //Tactician, Full Collide on 0 PP, Own Tempo Dancer immunity
			pokemon.activeMoveActions++;

			// Tactician allows targeting non-adjacents in any case
			let target = this.battle.getTarget(pokemon, maxMove || zMove || moveOrMoveName, targetLoc, originalTarget);
			let baseMove = this.dex.getActiveMove(moveOrMoveName);
			const pranksterBoosted = baseMove.pranksterBoosted;
			if (baseMove.id !== 'struggle' && !externalMove) {
				const changedMove = this.battle.runEvent('OverrideAction', pokemon, target, baseMove);
				if (changedMove && changedMove !== true) {
					baseMove = this.dex.getActiveMove(changedMove);
					if (pranksterBoosted) baseMove.pranksterBoosted = pranksterBoosted;
					target = this.getRandomTarget(pokemon, baseMove);
				}
			}
			let move = baseMove;

			move.isExternal = externalMove;

			this.battle.setActiveMove(move, pokemon, target);

			/* if (pokemon.moveThisTurn) {
				// THIS IS PURELY A SANITY CHECK
				// DO NOT TAKE ADVANTAGE OF THIS TO PREVENT A POKEMON FROM MOVING;
				// USE this.queue.cancelMove INSTEAD
				this.debug('' + pokemon.id + ' INCONSISTENT STATE, ALREADY MOVED: ' + pokemon.moveThisTurn);
				this.clearActiveMove(true);
				return;
			} */
			const willTryMove = this.battle.runEvent('BeforeMove', pokemon, target, move);
			if (!willTryMove) {
				this.battle.runEvent('MoveAborted', pokemon, target, move);
				this.battle.clearActiveMove(true);
				// The event 'BeforeMove' could have returned false or null
				// false indicates that this counts as a move failing for the purpose of calculating Stomping Tantrum's base power
				// null indicates the opposite, as the Pokemon didn't have an option to choose anything
				pokemon.moveThisTurnResult = willTryMove;
				return;
			}
			if (move.beforeMoveCallback) {
				if (move.beforeMoveCallback.call(this, pokemon, target, move)) {
					this.battle.clearActiveMove(true);
					pokemon.moveThisTurnResult = false;
					return;
				}
			}
			pokemon.lastDamage = 0;
			let lockedMove;
			if (!externalMove) {
				lockedMove = this.battle.runEvent('LockMove', pokemon);
				if (lockedMove === true) lockedMove = false;
				if (!lockedMove) {
					if (!pokemon.deductPP(baseMove, null, target) && (move.id !== 'struggle') && !pokemon.volatiles['nointerrupt']) { //Since natural PP deduction will disable move selection, having FC means it was forced down
						this.add('cant', pokemon, 'nopp', move);
						const gameConsole = [
							null, 'Game Boy', 'Game Boy Color', 'Game Boy Advance', 'DS', 'DS', '3DS', '3DS',
						][this.gen] || 'Switch';
						this.hint(`This is not a bug, this is really how it works on the ${gameConsole}; try it yourself if you don't believe us.`);
						this.battle.clearActiveMove(true);
						pokemon.moveThisTurnResult = false;
						return;
					}
				} else {
					sourceEffect = this.dex.conditions.get('lockedmove');
				}
				pokemon.moveUsed(move, targetLoc);
			}

			// Dancer Petal Dance hack
			// TODO: implement properly
			const noLock = externalMove && !pokemon.volatiles['lockedmove'];

			const moveDidSomething = this.useMove(baseMove, pokemon, target, sourceEffect, zMove, maxMove);
			this.lastSuccessfulMoveThisTurn = moveDidSomething ? this.battle.activeMove && this.battle.activeMove.id : null;
			if (this.activeMove) move = this.activeMove;
			this.battle.singleEvent('AfterMove', move, null, pokemon, target, move);
			this.battle.runEvent('AfterMove', pokemon, target, move);

			// Dancer's activation order is completely different from any other event, so it's handled separately
			if (move.flags['dance'] && moveDidSomething && !move.isExternal) {
				const dancers = [];
				for (const currentPoke of this.battle.getAllActive()) {
					if (pokemon === currentPoke) continue;
					if (currentPoke.hasAbility('dancer') && !currentPoke.isSemiInvulnerable()) {
						dancers.push(currentPoke);
					}
				}
				// Dancer activates in order of lowest speed stat to highest
				// Note that the speed stat used is after any volatile replacements like Speed Swap,
				// but before any multipliers like Agility or Choice Scarf
				// Ties go to whichever Pokemon has had the ability for the least amount of time
				dancers.sort(
					(a, b) => -(b.storedStats['spe'] - a.storedStats['spe']) || b.abilityOrder - a.abilityOrder
				);
				const targetOf1stDance = this.battle.activeTarget!;
				for (const dancer of dancers) {
					if (this.battle.faintMessages()) break;
					if (dancer.fainted) continue;
					this.battle.add('-activate', dancer, 'ability: Dancer');
					const dancersTarget = !targetOf1stDance.isAlly(dancer) && pokemon.isAlly(dancer) ?
						targetOf1stDance :
						pokemon;
					const dancersTargetLoc = dancer.getLocOf(dancersTarget);
					this.runMove(move.id, dancer, dancersTargetLoc, this.dex.abilities.get('dancer'), undefined, true);
				}
			}
			if (noLock && pokemon.volatiles['lockedmove']) delete pokemon.volatiles['lockedmove'];
			this.battle.faintMessages();
			this.battle.checkWin();
		},
		useMoveInner(moveOrMoveName, pokemon, target, sourceEffect, zMove, maxMove) { //Curse, Sheer Force post-secondary change, Commander
			if (!sourceEffect && this.battle.effect.id) sourceEffect = this.battle.effect;
			if (sourceEffect && ['instruct', 'custapberry'].includes(sourceEffect.id)) sourceEffect = null;

			let move = this.dex.getActiveMove(moveOrMoveName);
			if (move.id === 'weatherball' && zMove) {
				// Z-Weather Ball only changes types if it's used directly,
				// not if it's called by Z-Sleep Talk or something.
				this.singleEvent('ModifyType', move, null, pokemon, target, move, move);
				if (move.type !== 'Normal') sourceEffect = move;
			}
			if (zMove || (move.category !== 'Status' && sourceEffect && (sourceEffect as ActiveMove).isZ)) {
				move = this.getActiveZMove(move, pokemon);
			}
			if (maxMove && move.category !== 'Status') {
				// Max move outcome is dependent on the move type after type modifications from ability and the move itself
				this.battle.singleEvent('ModifyType', move, null, pokemon, target, move, move);
				this.battle.runEvent('ModifyType', pokemon, target, move, move);
			}
			if (maxMove || (move.category !== 'Status' && sourceEffect && (sourceEffect as ActiveMove).isMax)) {
				move = this.getActiveMaxMove(move, pokemon);
			}

			if (this.activeMove) {
				move.priority = this.battle.activeMove.priority;
				if (!move.hasBounced) move.pranksterBoosted = this.battle.activeMove.pranksterBoosted;
			}
			const baseTarget = move.target;
			if (target === undefined) target = this.battle.getRandomTarget(pokemon, move);
			if (move.target === 'self' || move.target === 'allies') {
				target = pokemon;
			}
			if (sourceEffect) {
				move.sourceEffect = sourceEffect.id;
				move.ignoreAbility = false;
			}
			let moveResult = false;

			this.battle.setActiveMove(move, pokemon, target);

			this.battle.singleEvent('ModifyType', move, null, pokemon, target, move, move);
			this.battle.singleEvent('ModifyMove', move, null, pokemon, target, move, move);
			if (baseTarget !== move.target) {
				// Target changed in ModifyMove, so we must adjust it here
				// Adjust before the next event so the correct target is passed to the
				// event
				target = pokemon.oppositeFoe();
			}
			move = this.battle.runEvent('ModifyType', pokemon, target, move, move);
			move = this.battle.runEvent('ModifyMove', pokemon, target, move, move);
			if (baseTarget !== move.target) {
				// Adjust again
				target = pokemon.oppositeFoe();
			}
			if (!move || pokemon.fainted) {
				return false;
			}

			let attrs = '';

			let movename = move.name;
			if (move.id === 'hiddenpower') movename = 'Hidden Power';
			if (sourceEffect) attrs += `|[from]${sourceEffect.fullname}`;
			this.battle.addMove('move', pokemon, movename, target + attrs);

			if (!target) {
				this.battle.attrLastMove('[notarget]');
				this.battle.add('-fail', pokemon);
				return false;
			}

			const {targets, pressureTargets} = pokemon.getMoveTargets(move, target);
			if (targets.length) {
				target = targets[targets.length - 1]; // in case of redirection
			}

			if (!sourceEffect || sourceEffect.id === 'pursuit') {
				let extraPP = 0;
				for (const source of pressureTargets) {
					const ppDrop = this.battle.runEvent('DeductPP', source, pokemon, move);
					if (ppDrop !== true) {
						extraPP += ppDrop || 0;
					}
				}
				if (extraPP > 0) {
					pokemon.deductPP(move, extraPP);
				}
			}

			if (!this.battle.singleEvent('TryMove', move, null, pokemon, target, move) ||
				!this.battle.runEvent('TryMove', pokemon, target, move)) {
				move.mindBlownRecoil = false;
				return false;
			}

			this.battle.singleEvent('UseMoveMessage', move, null, pokemon, target, move);

			if (move.ignoreImmunity === undefined) {
				move.ignoreImmunity = (move.category === 'Status');
			}

			if (move.selfdestruct === 'always') {
				this.battle.faint(pokemon, pokemon, move);
			}

			let damage: number | false | undefined | '' = false;
			if (move.target === 'all' || move.target === 'foeSide' || move.target === 'allySide' || move.target === 'allyTeam') {
				damage = this.tryMoveHit(target, pokemon, move);
				if (damage === this.battle.NOT_FAIL) pokemon.moveThisTurnResult = null;
				if (damage || damage === 0 || damage === undefined) moveResult = true;
			} else {
				if (!targets.length) {
					this.battle.attrLastMove('[notarget]');
					this.battle.add('-fail', pokemon);
					return false;
				}
				moveResult = this.trySpreadMoveHit(targets, pokemon, move);
			}
			if (move.selfBoost && moveResult) this.moveHit(pokemon, pokemon, move, move.selfBoost, false, true);
			if (!pokemon.hp) {
				this.battle.faint(pokemon, pokemon, move);
			}

			if (!moveResult) {
				this.battle.singleEvent('MoveFail', move, null, target, pokemon, move);
				return false;
			}

			const originalHp = pokemon.hp;
			this.battle.singleEvent('AfterMoveSecondarySelf', move, null, pokemon, target, move);
			this.battle.runEvent('AfterMoveSecondarySelf', pokemon, target, move);
			if (pokemon && pokemon !== target && move.category !== 'Status') {
				if (pokemon.hp <= pokemon.maxhp / 2 && originalHp > pokemon.maxhp / 2) {
					this.battle.runEvent('EmergencyExit', target, pokemon);
				}
			}

			return true;
		},
		hitStepAccuracy(targets, pokemon, move) { //Sheer Cold nerf/Toxic buff revert
			const hitResults = [];
			for (const [i, target] of targets.entries()) {
				this.activeTarget = target;
				// calculate true accuracy
				let accuracy = move.accuracy;
				if (move.ohko) { // bypasses accuracy modifiers
					if (!target.isSemiInvulnerable()) {
						//MODDED: Removed Sheer Cold's accuracy drop
						if (pokemon.level >= target.level && (move.ohko === true || !target.hasType(move.ohko))) {
							accuracy += (pokemon.level - target.level);
						} else {
							this.battle.add('-immune', target, '[ohko]');
							hitResults[i] = false;
							continue;
						}
					}
				} else {
					accuracy = this.battle.runEvent('ModifyAccuracy', target, pokemon, move, accuracy);
					if (accuracy !== true) {
						let boost = 0;
						if (!move.ignoreAccuracy) {
							const boosts = this.battle.runEvent('ModifyBoost', pokemon, null, null, {...pokemon.boosts});
							boost = this.battle.clampIntRange(boosts['accuracy'], -6, 6);
						}
						if (!move.ignoreEvasion) {
							const boosts = this.battle.runEvent('ModifyBoost', target, null, null, {...target.boosts});
							boost = this.battle.clampIntRange(boost - boosts['evasion'], -6, 6);
						}
						if (boost > 0) {
							accuracy = this.battle.trunc(accuracy * (3 + boost) / 3);
						} else if (boost < 0) {
							accuracy = this.battle.trunc(accuracy * 3 / (3 - boost));
						}
					}
				}
				if (move.alwaysHit) { //MODDED: Removed Toxic's accuracy bypass on Poison-types
					accuracy = true;
				} else {
					accuracy = this.battle.runEvent('Accuracy', target, pokemon, move, accuracy);
				}
				if (accuracy !== true && !this.battle.randomChance(accuracy, 100)) {
					if (move.smartTarget) {
						move.smartTarget = false;
					} else {
						if (!move.spreadHit) this.battle.attrLastMove('[miss]');
						this.battle.add('-miss', pokemon, target);
					}
					if (!move.ohko && pokemon.hasItem('blunderpolicy') && pokemon.useItem()) {
						this.battle.boost({spe: 2}, pokemon);
					}
					hitResults[i] = false;
					continue;
				}
				hitResults[i] = true;
			}
			return hitResults;
		},
		hitStepMoveHitLoop(targets, pokemon, move) { //Sheer Force post-secondary change
			const damage: (number | boolean | undefined)[] = [];
			for (const i of targets.keys()) {
				damage[i] = 0;
			}
			move.totalDamage = 0;
			pokemon.lastDamage = 0;
			let targetHits = move.multihit || 1;
			if (Array.isArray(targetHits)) {
				// yes, it's hardcoded... meh
				if (targetHits[0] === 2 && targetHits[1] === 5) {
					targetHits = this.battle.sample([2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 5, 5, 5]);
					if (targetHits < 4 && pokemon.hasItem('loadeddice')) {
						targetHits = 5 - this.battle.random(2);
					}
				} else {
					targetHits = this.random(targetHits[0], targetHits[1] + 1);
				}
			}
			if (targetHits === 10 && pokemon.hasItem('loadeddice')) targetHits -= this.battle.random(7);
			targetHits = Math.floor(targetHits);
			let nullDamage = true;
			let moveDamage: (number | boolean | undefined)[];
			// There is no need to recursively check the ´sleepUsable´ flag as Sleep Talk can only be used while asleep.
			const isSleepUsable = move.sleepUsable || this.dex.moves.get(move.sourceEffect).sleepUsable;

			let targetsCopy: (Pokemon | false | null)[] = targets.slice(0);
			let hit: number;
			for (hit = 1; hit <= targetHits; hit++) {
				if (damage.includes(false)) break;
				if (hit > 1 && pokemon.status === 'slp' && !isSleepUsable) break;
				if (targets.every(target => !target || !target.hp)) break;
				move.hit = hit;
				if (move.smartTarget && targets.length > 1) {
					targetsCopy = [targets[hit - 1]];
				} else {
					targetsCopy = targets.slice(0);
				}
				const target = targetsCopy[0]; // some relevant-to-single-target-moves-only things are hardcoded
				if (target && typeof move.smartTarget === 'boolean') {
					if (hit > 1) {
						this.battle.addMove('-anim', pokemon, move.name, target);
					} else {
						this.battle.retargetLastMove(target);
					}
				}

				// like this (Triple Kick)
				if (target && move.multiaccuracy && hit > 1) {
					let accuracy = move.accuracy;
					const boostTable = [1, 4 / 3, 5 / 3, 2, 7 / 3, 8 / 3, 3];
					if (accuracy !== true) {
						if (!move.ignoreAccuracy) {
							const boosts = this.battle.runEvent('ModifyBoost', pokemon, null, null, {...pokemon.boosts});
							const boost = this.battle.clampIntRange(boosts['accuracy'], -6, 6);
							if (boost > 0) {
								accuracy *= boostTable[boost];
							} else {
								accuracy /= boostTable[-boost];
							}
						}
						if (!move.ignoreEvasion) {
							const boosts = this.battle.runEvent('ModifyBoost', target, null, null, {...target.boosts});
							const boost = this.battle.clampIntRange(boosts['evasion'], -6, 6);
							if (boost > 0) {
								accuracy /= boostTable[boost];
							} else if (boost < 0) {
								accuracy *= boostTable[-boost];
							}
						}
					}
					accuracy = this.battle.runEvent('ModifyAccuracy', target, pokemon, move, accuracy);
					if (!move.alwaysHit) {
						accuracy = this.battle.runEvent('Accuracy', target, pokemon, move, accuracy);
						if (accuracy !== true && !this.battle.randomChance(accuracy, 100)) break;
					}
				}

				const moveData = move;
				if (!moveData.flags) moveData.flags = {};

				// Modifies targetsCopy (which is why it's a copy)
				[moveDamage, targetsCopy] = this.spreadMoveHit(targetsCopy, pokemon, move, moveData);

				if (!moveDamage.some(val => val !== false)) break;
				nullDamage = false;

				for (const [i, md] of moveDamage.entries()) {
					// Damage from each hit is individually counted for the
					// purposes of Counter, Metal Burst, and Mirror Coat.
					damage[i] = md === true || !md ? 0 : md;
					// Total damage dealt is accumulated for the purposes of recoil (Parental Bond).
					move.totalDamage += damage[i] as number;
				}
				if (move.mindBlownRecoil) {
					const hpBeforeRecoil = pokemon.hp;
					this.battle.damage(Math.round(pokemon.maxhp / 2), pokemon, pokemon, this.dex.conditions.get(move.id), true);
					move.mindBlownRecoil = false;
					if (pokemon.hp <= pokemon.maxhp / 2 && hpBeforeRecoil > pokemon.maxhp / 2) {
						this.battle.runEvent('EmergencyExit', pokemon, pokemon);
					}
				}
				this.battle.eachEvent('Update');
				if (!pokemon.hp && targets.length === 1) {
					hit++; // report the correct number of hits for multihit moves
					break;
				}
			}
			// hit is 1 higher than the actual hit count
			if (hit === 1) return damage.fill(false);
			if (nullDamage) damage.fill(false);
			this.battle.faintMessages(false, false, !pokemon.hp);
			if (move.multihit && typeof move.smartTarget !== 'boolean') {
				this.battle.add('-hitcount', targets[0], hit - 1);
			}

			if ((move.recoil || move.id === 'chloroblast') && move.totalDamage) {
				const hpBeforeRecoil = pokemon.hp;
				this.battle.damage(this.calcRecoilDamage(move.totalDamage, move, pokemon), pokemon, pokemon, 'recoil');
				if (pokemon.hp <= pokemon.maxhp / 2 && hpBeforeRecoil > pokemon.maxhp / 2) {
					this.battle.runEvent('EmergencyExit', pokemon, pokemon);
				}
			}

			if (move.struggleRecoil) {
				let recoilDamage;
				recoilDamage = this.battle.clampIntRange(Math.round(pokemon.baseMaxhp / 4), 1);
				this.battle.directDamage(recoilDamage, pokemon, pokemon, {id: 'strugglerecoil'} as Condition);
				if (pokemon.hp <= pokemon.maxhp / 2 && hpBeforeRecoil > pokemon.maxhp / 2) {
					this.battle.runEvent('EmergencyExit', pokemon, pokemon);
				}
			}

			// smartTarget messes up targetsCopy, but smartTarget should in theory ensure that targets will never fail, anyway
			if (move.smartTarget) targetsCopy = targets.slice(0);

			for (const [i, target] of targetsCopy.entries()) {
				if (target && pokemon !== target) {
					target.gotAttacked(move, moveDamage[i] as number | false | undefined, pokemon);
					if (typeof moveDamage[i] === 'number') {
						target.timesAttacked += hit - 1;
					}
				}
			}

			if (move.ohko && !targets[0].hp) this.battle.add('-ohko');

			if (!damage.some(val => !!val || val === 0)) return damage;

			this.battle.eachEvent('Update');

			this.afterMoveSecondaryEvent(targetsCopy.filter(val => !!val) as Pokemon[], pokemon, move);

			for (const [i, d] of damage.entries()) {
				// There are no multihit spread moves, so it's safe to use move.totalDamage for multihit moves
				// The previous check was for `move.multihit`, but that fails for Dragon Darts
				const curDamage = targets.length === 1 ? move.totalDamage : d;
				if (typeof curDamage === 'number' && targets[i].hp) {
					const targetHPBeforeDamage = (targets[i].hurtThisTurn || 0) + curDamage;
					if (targets[i].hp <= targets[i].maxhp / 2 && targetHPBeforeDamage > targets[i].maxhp / 2) {
						this.battle.runEvent('EmergencyExit', targets[i], pokemon);
					}
				}
			}

			return damage;
		},
		hitStepInvulnerabilityEvent(targets, pokemon, move) { //Toxic buff revert
			if (move.id === 'helpinghand') {
				return new Array(targets.length).fill(true);
			}
			const hitResults = this.battle.runEvent('Invulnerability', targets, pokemon, move);
			for (const [i, target] of targets.entries()) {
				if (hitResults[i] === false) {
					if (move.smartTarget) {
						move.smartTarget = false;
					} else {
						if (!move.spreadHit) this.battle.attrLastMove('[miss]');
						this.battle.add('-miss', pokemon, target);
					}
				}
			}
			return hitResults;
		},
		hitStepBreakProtect(targets, pokemon, move) { //Renaming Bunker Down
			if (move.breaksProtect) {
				for (const target of targets) {
					let broke = false;
					for (const effectid of ['bunkerdown', 'kingsshield', 'obstruct', 'protect', 'silktrap', 'spikyshield']) {
						if (target.removeVolatile(effectid)) broke = true;
					}
					for (const effectid of ['craftyshield', 'matblock', 'quickguard', 'wideguard']) {
						if (target.side.removeSideCondition(effectid)) broke = true;
					}
					if (broke) {
						if (['feint'/*, 'wickedblow', 'surgingstrikes'*/].includes(move.id)) { //TODO: Implement custom messages so this can be restored
							this.battle.add('-activate', target, 'move: ' + move.name);
						} else {
							this.battle.add('-activate', target, 'move: ' + move.name, '[broken]');
						}
						delete target.volatiles['stall'];
					}
				}
			}
			return undefined;
		},
		hitStepStealBoosts(targets, pokemon, move) { //Own Tempo
			const target = targets[0]; // hardcoded
			if (move.stealsBoosts) {
				const boosts: SparseBoostsTable = {};
				let stolen = false;
				let statName: BoostName;
				for (statName in target.boosts) {
					const stage = target.boosts[statName];
					if (stage > 0) {
						boosts[statName] = stage;
						stolen = true;
					}
				}
				if (stolen) {
					if(target.hasAbility('owntempo')){
						this.battle.add('-activate', target, 'ability: Own Tempo');
						this.battle.hint('Own Tempo blocks effects that steal, copy, or overwrite its attributes');
						return;
					}
					this.battle.attrLastMove('[still]');
					this.battle.add('-clearpositiveboost', target, pokemon, 'move: ' + move.name);
					this.battle.boost(boosts, pokemon, pokemon);

					let statName2: BoostName;
					for (statName2 in boosts) {
						boosts[statName2] = 0;
					}
					target.setBoost(boosts);
					this.battle.addMove('-anim', pokemon, "Spectral Thief", target);
				}
			}
			return undefined;
		},
		afterMoveSecondaryEvent(targets, pokemon, move) { //Sheer Force post-secondary change
			this.battle.singleEvent('AfterMoveSecondary', move, null, targets[0], pokemon, move);
			this.battle.runEvent('AfterMoveSecondary', targets, pokemon, move);
			return undefined;
		},
		canMegaEvo(pokemon) { //Magic Room suppression, Mega-Ray change, Mega Evolution friendship req
			if('magicroom' in this.battle.field.pseudoWeather || pokemon.happiness < 180) return null;
			const species = pokemon.baseSpecies;
			const altForme = species.otherFormes && this.dex.species.get(species.otherFormes[0]);
			const item = pokemon.getItem();
			if (item.megaEvolves === species.baseSpecies && item.megaStone !== species.name) {
				//Additional check for required move
				if (altForme?.isMega && altForme?.requiredMove) {
					if(pokemon.baseMoves.includes(this.toID(altForme.requiredMove))){
						return item.megaStone;
					}
				} else {
					return item.megaStone;
				}
			}
			return null;
		},
		canUltraBurst(pokemon) { //Magic Room suppression
			if('magicroom' in this.battle.field.pseudoWeather) return null;
			if (['Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane'].includes(pokemon.baseSpecies.name) &&
				pokemon.getItem().id === 'ultranecroziumz') {
				return "Necrozma-Ultra";
			}
			return null;
		},
		runMegaEvo(pokemon) { //Extra Magic Room suppression since it doesn't seem to work
			if('magicroom' in this.battle.field.pseudoWeather) return false;
			const speciesid = pokemon.canMegaEvo || pokemon.canUltraBurst;
			if (!speciesid) return false;
			const side = pokemon.side;

			// Pokémon affected by Sky Drop cannot mega evolve. Enforce it here for now.
			for (const foeActive of side.foe.active) {
				if (foeActive.volatiles['skydrop'] && foeActive.volatiles['skydrop'].source === pokemon) {
					return false;
				}
			}

			pokemon.formeChange(speciesid, pokemon.getItem(), true);

			// Limit one mega evolution
			const wasMega = pokemon.canMegaEvo;
			for (const ally of side.pokemon) {
				if (wasMega) {
					ally.canMegaEvo = null;
				} else {
					ally.canUltraBurst = null;
				}
			}

			this.battle.runEvent('AfterMega', pokemon);
			return true;
		},
	},
	//dex: {
		getImmunity(
			source: {type: string} | string,
			target: {getTypes: () => string[]} | {types: string[]} | string[] | string
		): boolean {
			// Edit for Earth & Sky - can't be done in mod's files
			let sourceType: string = "";
			if(['earthsky','gen9eshorizons'].includes(this.currentMod)){
				if(typeof source !== 'string'){
					if(source.twoType){
						return this.getImmunity(source.type, target) && this.getImmunity(source.twoType, target);
					} else {
						sourceType = source.type;
					}
				} else sourceType = source;
			} else sourceType = typeof source !== 'string' ? source.type : source;
			// End edit
			// @ts-ignore
			const targetTyping: string[] | string = target.getTypes?.() || target.types || target;
			if (Array.isArray(targetTyping)) {
				for (const type of targetTyping) {
					if (!this.getImmunity(sourceType, type)) return false;
				}
				return true;
			}
			const typeData = this.data.TypeChart[targetTyping];
			if (typeData && typeData.damageTaken[sourceType] === 3) return false;
			return true;
		},
		getEffectiveness(
			source: {type: string} | string,
			target: {getTypes: () => string[]} | {types: string[]} | string[] | string
		): number {
			// Edit for Earth & Sky - can't be done in mod's files
			let sourceType: string = "";
			if(['earthsky','gen9eshorizons'].includes(this.currentMod)){
				if(typeof source !== 'string'){
					if(source.twoType){
						return this.getEffectiveness(source.type, target) + this.getEffectiveness(source.twoType, target);
					} else {
						sourceType = source.type;
					}
				} else sourceType = source;
			} else sourceType = typeof source !== 'string' ? source.type : source;
			// End edit
			// @ts-ignore
			const targetTyping: string[] | string = target.getTypes?.() || target.types || target;
			let totalTypeMod = 0;
			if (Array.isArray(targetTyping)) {
				for (const type of targetTyping) {
					totalTypeMod += this.getEffectiveness(sourceType, type);
				}
				return totalTypeMod;
			}
			const typeData = this.data.TypeChart[targetTyping];
			if (!typeData) return 0;
			switch (typeData.damageTaken[sourceType]) {
			case 1: return 1; // super-effective
			case 2: return -1; // resist
			// in case of weird situations like Gravity, immunity is handled elsewhere
			default: return 0;
			}
		},
		getBestEffectiveness(
			source: Pokemon,
			target: {getTypes: () => string[]} | {types: string[]} | string[] | string,
			resistFirst?: boolean
		): string { //New function that picks the most advantageous type, improved from the method used for the Legend Plate.
			const dex = this.dex;
			const typeList = dex.types.names();
			const targetTyping: string[] | string = target.getTypes?.() || target.types || target;
			this.debug("Getting effectiveness against " + targetTyping);
			let bestTypes = Object.assign([], typeList);
			this.debug("bestTypes:");
			this.debug(bestTypes);
			this.debug("Starting with " + (resistFirst ? "resistances" : "weaknesses"));
			let typesTest: string[] = [];
			if(resistFirst){
				//Criterion 1: Immunities or else resistances
				if(Array.isArray(targetTyping)){
					for(const targetType of targetTyping){
						typesTest = typesTest.concat(bestTypes.filter(type => !(dex.getImmunity(targetType, type))));
					}
				} else typesTest = bestTypes.filter(type => !(dex.getImmunity(targetTyping, type)));
				this.debug("Checking for immunities");
				this.debug(typesTest);
				if(typesTest.length){
					if(typesTest.length > 1){
						bestTypes = Object.assign([], typesTest);
					} else return typesTest[0];
				} else {
					this.debug("None found");
					if(Array.isArray(targetTyping)){
						typesTest = [];
						for(const targetType in targetTyping){
							typesTest = typesTest.concat(bestTypes.filter(type => dex.getEffectiveness(targetType, type) < 0)); //No immunities means these are only resistances
						}
						bestTypes = Object.assign([], typesTest);
					} else {
						bestTypes = bestTypes.filter(type => dex.getEffectiveness(targetTyping, type) < 0);
					}
					this.debug("Filtering for resistances");
					this.debug(bestTypes);
					if(bestTypes.length){
						if(bestTypes.length === 1) return bestTypes[0];
						//Check double-resists
						if(targetTyping.length){
							typesTest = [];
							for(const targetType in targetTyping){
								typesTest = typesTest.concat(bestTypes.filter(type => dex.getEffectiveness(targetType, type) === -2)); //No immunities means these are only resistances
							}
						} else typesTest = bestTypes.filter(type => dex.getEffectiveness(targetTyping, type) === -2);
						this.debug("Checking for double resistances");
						this.debug(typesTest);
						if(typesTest.length){
							if(typesTest.length > 1){
								bestTypes = Object.assign([], typesTest);
							} else return typesTest[0];
						} else this.debug("None found");
					} else bestTypes = Object.assign([], typeList);
				}
				this.debug("Current state:");
				this.debug(bestTypes);
				
				//Criterion 2: Super-effective
				typesTest = bestTypes.filter(type => dex.getEffectiveness(type, targetTyping) > 0 && dex.getImmunity(type, targetTyping));
				this.debug("Checking for weaknesses");
				this.debug(typesTest);
				if(typesTest.length){
					this.debug("Some found");
					if(typesTest.length === 1) return typesTest[0];
					bestTypes = Object.assign([], typesTest);
					//Check x4
					typesTest = bestTypes.filter(type => dex.getEffectiveness(type, targetTyping) === 2);
					this.debug("Checking for double weaknesses");
					this.debug(typesTest);
					if(typesTest.length){
						if(typesTest.length > 1){
							bestTypes = Object.assign([], typesTest);
						} else return typesTest[0];
					} else this.debug("None found");
				} else this.debug("None found");
				this.debug("Current state:");
				this.debug(bestTypes);
			} else {
				//Criterion 1: Super-effective
				bestTypes = bestTypes.filter(type => dex.getEffectiveness(type, targetTyping) > 0 && dex.getImmunity(type, targetTyping));
				this.debug("Filtering for weaknesses");
				this.debug(bestTypes);
				if(bestTypes.length){
					if(bestTypes.length === 1) return bestTypes[0];
					//Check x4
					typesTest = bestTypes.filter(type => dex.getEffectiveness(type, targetTyping) === 2);
					this.debug("Checking for double weaknesses");
					this.debug(typesTest);
					if(typesTest.length){
						if(typesTest.length > 1){
							bestTypes = Object.assign([], typesTest);
						} else return typesTest[0];
					} else this.debug("None found");
				} else bestTypes = Object.assign([], typeList);
				this.debug("Current state:");
				this.debug(bestTypes);
				
				//Criterion 2: Immunities or else resistances
				typesTest = [];
				if(Array.isArray(targetTyping)){
					for(const targetType in targetTyping){
						typesTest = typesTest.concat(bestTypes.filter(type => !dex.getImmunity(targetType, type)));
					}
				} else typesTest = bestTypes.filter(type => !dex.getImmunity(targetTyping, type));
				this.debug("Checking for immunities");
				this.debug(typesTest);
				if(typesTest.length){
					if(typesTest.length > 1){
						bestTypes = Object.assign([], typesTest);
					} else return typesTest[0];
				} else {
					this.debug("None found");
					if(Array.isArray(targetTyping)){
						typesTest = [];
						for(const targetType in targetTyping){
							typesTest = typesTest.concat(bestTypes.filter(type => dex.getEffectiveness(targetType, type) < 0)); //No immunities means these are only resistances
						}
					} else typesTest = bestTypes.filter(type => dex.getEffectiveness(targetTyping, type) < 0);
					this.debug("Checking for resistances");
					this.debug(typesTest);
					if(typesTest.length){
						if(typesTest.length === 1) return typesTest[0];
						bestTypes = Object.assign([], typesTest);
						//Check double-resists
						if(targetTyping.length){
							typesTest = [];
							for(const targetType in targetTyping){
								typesTest = typesTest.concat(bestTypes.filter(type => dex.getEffectiveness(targetType, type) === -2)); //No immunities means these are only resistances
							}
						} else typesTest = bestTypes.filter(type => dex.getEffectiveness(targetTyping, type) === -2);
						this.debug("Checking for double resistances");
						this.debug(typesTest);
						if(typesTest.length){
							if(typesTest.length > 1){
								bestTypes = Object.assign([], typesTest);
							} else return typesTest[0];
						} else this.debug("None found");
					} else this.debug("None found");
				}
				this.debug("Current state:");
				this.debug(bestTypes);
			}
			
			//Criterion 3: STAB
			typesTest  = [];
			for(const move in source.moveSlots){
				typesTest = typesTest.concat(bestTypes.filter(type => type === move.type || (move.twoType && type === move.twoType)));
			}
			if(typesTest.length){
				if(typesTest.length > 1){
					bestTypes = Object.assign([], typesTest);
				} else return typesTest[0];
			}
			
			//Now return random from what's left
			return this.sample(bestTypes);
		},
	//},
	init() {
		/* Removed/renamed accessibility and other init stuff */
		/*const unavailablePokemon = [
			"pikachubelle", "pikachucosplay", "pikachulibre", "pikachuphd", "pikachupopstar", "pikachurockstar", "pikachustarter", "eeveestarter", "pichuspikyeared", "dialgaorigin", "palkiaorigin", "floetteeternal", "eternatuseternamax", "zarudedada"
		];*/
		/*const renamedPokemon = [
			"Victreebel", "Darmanitan-Galar-Zen", "Lycanroc-Dusk", "Iron Bundle", "Iron Jugulis", "Iron Hands", "Iron Moth", "Iron Thorns", "Iron Valiant", "Iron Leaves"
		];
		const newNamePokemon = [
			"Victreebell", "Darmanitan-Rage", "Lycanroc-Twilight", "Robo Bundle", "Mecha Jugulis", "Press Hands", "Astro Glider", "Armor Thorns", "Valiant Droid", "Saber Leaves"
		];*/
		const baseEight = [ //Pokemon using their Gen VIII learnsets as a base
			"bulbasaur", "ivysaur", "venusaur", "charmander", "charmeleon", "charizard", "vileplume", "farfetchd", "farfetchdgalar", "hitmonlee", "hitmonchan", "mrmime", "mrmimegalar", "scyther", "pinsir", "bellossom", "qwilfish", "qwilfishhisui", "scizor", "heracross", "remoraid", "octillery", "tyrogue", "hitmontop", "raikou", "entei", "suicune", "larvitar", "pupitar", "tyranitar", "zigzagoon", "zigzagoongalar", "linoone", "linoonegalar", "seedot", "nuzleaf", "shiftry", "lotad", "lombre", "lunatone", "solrock", "bagon", "shelgon", "salamence", "kyogre", "groudon", "rayquaza", "mimejr", "uxie", "mesprit", "azelf", "dialga", "palkia", "giratina", "darumaka", "darmanitan", "reshiram", "zekrom", "kyurem", "fletchling", "fletchinder", "talonflame", "swirlix", "slurpuff", "bergmite", "avalugg", "xerneas", "yveltal", "zygarde",
		];
		const baseNine = [ //Pokemon using their Gen IX learnsets as a base
			"wooper", "wooperpaldea", "quagsire", "basculin", "basculinbluestriped", "basculinwhitestriped", "rowlet", "dartrix", "decidueye", "decidueyehisui", "indeedee", "indeedeef", "kleavor"
		];
		/*const deletedItems = [
			"adamantcrystal", "griseouscore", "luckypunch", "lustrousglobe", "punchingglove", "throatspray", "utilityumbrella",
		];
		const deletedAbilities = [
			"angershell", "asoneglastrier", "asonespectrier", "battlebond", "chillingneigh", "curiousmedicine", "dragonsmaw", "gorillatactics", "grimneigh", "libero", "lingeringaroma", "mirrorarmor", "perishbody", "punkrock", "steelyspirit", "supremeoverlord", "transistor", "unseenfist", "wellbakedbody",
		];*/
		const renamedAbilities = [
			"aurabreak", "emergencyexit", "wimpout", "minus", "plus", "powerofalchemy", "powerspot", "queenlymajesty", "rebound", "slushrush", "tanglinghair",
		];
		const newNameAbilities = [
			"climatebreak", "escapeplan", "escapeplan", "induction", "induction", "alchemy", "poweraura", "majesty", "emergence", "snowplow", "tangling",
		];
		const deletedMoves = [
			"appleacid", "bittermalice", "bleakwindstorm", "burningjealousy", "ceaselessedge", "chillyreception", "coaching", "comeuppance", "corrosivegas", "decorate", "doodle", "dualwingbeat", "esperwing", "expandingforce", "fierywrath", "flipturn", "gearup", "grassyglide", "gravapple", "hydrosteam", "hyperdrill", "icespinner", "infernalparade", "kinesis", "kowtowcleave", "luminacrash", "makeitrain", "mistyexplosion", "mortalspin", "mountaingale", "mysticalpower", "psyblade", "risingvoltage", "sandsearstorm", "scaleshot", "scorchingsands", "shadowstrike", "shellsidearm", "skittersmack", "springtidestorm", "steelroller", "takeheart", "terablast", "terrainpulse", "thunderouskick", "tidyup", "triplearrows", "tripleaxel", "tripledive", "twinbeam", "wildboltstorm"
		];
		/*const addedMachines = [ //Machines added in Gen VIII or IX and retained in Earth & Sky - currently not needed in the algorithm, but it's a long list so I don't want to delete it
			"amnesia", "assurance", "avalanche", "brine", "charm", "chillingwater", "eerieimpulse", "electricterrain", "electroball", "encore", "faketears", "futuresight", "grassyterrain", "hex", "hurricane", "hydropump", "mistyterrain", "nastyplot", "phantomforce", "powergem", "psychicterrain", "screech", "trailblaze", "whirlpool"
		];*/
		const droppedMachines = [ //Machines dropped from Earth & Sky; includes Flash, Natural Gift, and Toxic, which are re-added to their Pokemon after the algorithm
			"agility", "aircutter", "airslash", "aurasphere", "batonpass", "beatup", "blazekick", "bodyslam", "bravebird", "bugbuzz", "bulletseed", "closecombat", "confide", "cosmicpower", "covet", "crosspoison", "crunch", "cut", "darkestlariat", "disarmingvoice", "doubleteam", "dragondance", "drainingkiss", "firefang", "firespin", "flareblitz", "flash", "focusenergy", "focuspunch", "guardswap", "heatcrash", "heavyslam", "highhorsepower", "icefang", "iciclespear", "imprison", "leafblade", "leafstorm", "liquidation", "magicalleaf", "megakick", "megapunch", "megahorn", "metalclaw", "mudshot", "mudslap", "muddywater", "mysticalfire", "naturalgift", "nightshade", "payday", "pinmissile", "playrough", "poisontail", "pollenpuff", "pounce", "powerswap", "poweruppunch", "powerwhip", "psychicfang", "psychocut", "razorshell", "revenge", "reversal", "rockblast", "sandtomb", "scaryface", "self-destruct", "solarblade", "speedswap", "spikes", "storedpower", "strugglebug", "superfang", "swagger", "swift", "takedown", "tailslap", "throatchop", "thunderfang", "toxic", "toxicspikes", "triattack", "venomdrench", "weatherball", "worryseed"
		];
		const renamedMoves = [ //Also includes the replacement of Axe Kick and Hail with Jump Kick and Snowscape, respectively
			"axekick","banefulbunker","chillingwater","clangoroussoul","doubleshock","flowertrick","hail","moongeistbeam","psychicfangs","psyshieldbash","ragefist","stompingtantrum","strangesteam","sunsteelstrike","trailblaze"
		];
		const newNameMoves = [
			"jumpkick","bunkerdown","chillywater","warriorssoul","completeshock","flowertrap","snowscape","lunarray","psychicfang","barrierbash","vengefulspirit","tantrum","strangesmoke","solarimpact","trailhead"
		];
		const noUniversalTMs = [ //Only Gen 5+ since it's the earliest to lose a universal TM
			"tynamo", "scatterbug", "spewpa", "cosmog", "cosmoem", "blipbug", "applin"
		];
		/* Wide-spread changes */
		const esrules = this.formats.getRuleTable(this.formats.get('gen9earthskyhorizonsou'));
		//const dex = Dex.mod('gen9eshorizons');
		for (let pokemon of this.species.all()) {
			const pokemonID = this.toID(pokemon.name);
			const learnsetTest = false;//["sawsbuck","golurk","swanna"].includes(pokemonID);
			const formatsTest = false;//["zygarde"].includes(pokemonID);
			if(formatsTest) console.log(pokemonID);
			 //Don't do anything with new or deleted Pokemon
			if(pokemon === null || pokemon.num < -500) continue;
			//Change generational accessibility
			if(this.modData('FormatsData', pokemonID)) {
				if(formatsTest) {
					console.log(this.modData('FormatsData', pokemonID));
				}
				switch(this.modData('FormatsData', pokemonID).isNonstandard) {
					case "CAP":
						if(!pokemon.battleOnly){ //Reset tiers for all Pokemon that have their own tiering data
							if(pokemon.evos) {
								this.modData('FormatsData', pokemonID).tier = pokemon.prevo ? "CAP NFE" : "CAP LC";
							} else {
								this.modData('FormatsData', pokemonID).tier = "CAP";
							}
						}
						break;
					case "Past":
						if(formatsTest) {
							console.log(pokemon.name + " restoration");
						}
						delete this.modData('FormatsData', pokemonID).isNonstandard;
						delete pokemon.isNonstandard;
					case undefined:
						if(!pokemon.battleOnly){ //Reset tiers for all Pokemon that have their own tiering data
							if(pokemon.nfe) {
								this.modData('FormatsData', pokemonID).tier = pokemon.prevo ? "NFE" : "LC";
								this.modData('FormatsData', pokemonID).natDexTier = pokemon.prevo ? "NFE" : "LC";
								pokemon.tier = pokemon.prevo ? "NFE" : "LC";
								pokemon.natDexTier = pokemon.prevo ? "NFE" : "LC";
							} else {
								this.modData('FormatsData', pokemonID).tier = esrules.isBannedSpecies(pokemon) ? "Uber" : "OU";
								this.modData('FormatsData', pokemonID).natDexTier = esrules.isBannedSpecies(pokemon) ? "Uber" : "OU";
								pokemon.tier = esrules.isBannedSpecies(pokemon) ? "Uber" : "OU";
								pokemon.natDexTier = esrules.isBannedSpecies(pokemon) ? "Uber" : "OU";
							}
						} else {
							this.modData('FormatsData', pokemonID).tier = "Illegal";
							this.modData('FormatsData', pokemonID).natDexTier = "Illegal";
							pokemon.tier = "Illegal";
							pokemon.natDexTier = "Illegal";
						}
						break;
					default: //All other non-standard Pokemon are to remain unusable
						continue;
				}
				if(pokemon.canGigantamax) delete pokemon.canGigantamax;
				if(formatsTest) {
					console.log(this.modData('FormatsData', pokemonID));
					console.log(pokemon.tier);
					console.log(pokemon.natDexTier);
				}
			}
			//Don't do move stuff with formes that don't have their own movesets (and Xerneas)
			if(pokemon.battleOnly || ["Egelas", "Sartori", "Mega", "Mega-X", "Mega-Y", "Primal"].includes(pokemon.forme) || 
				(["Deoxys", "Rotom", "Giratina", "Shaymin", "Arceus", "Keldeo", "Meloetta", "Genesect", "Vivillon", "Aegislash", "Pumpkaboo", "Gourgeist", "Xerneas", "Hoopa", 
				"Oricorio", "Silvally", "Magearna", "Sinistea", "Polteageist", "Eternatus", "Zarude", "Squawkabilly", "Palafin", "Dudunsparce", "Gimmighoul", "Venomicon"].includes(pokemon.baseSpecies)
				&& pokemon.baseSpecies !== pokemon.name))
				continue;
			if(this.species.getLearnsetData(pokemonID) === undefined){
				console.log(pokemonID + " does not have a learnset");
				console.log(pokemon);
			}
			if(learnsetTest) {
				console.log("Modifying learnset of " + pokemon.name);
				console.log(this.species.getLearnsetData(pokemonID).learnset);
			}
			/* Moves */
			let moveLearn; //store move learnset to save memory/time
			let startGen = (((pokemon.num > 898 || pokemon.num < -68) || baseNine.includes(pokemonID)) ? 9 : (((pokemon.num > 807 || pokemon.num < -60) || baseEight.includes(pokemonID)) ? 8 : 7)); //Tags Gen for level/egg moves
			const levelString = new RegExp(startGen + 'L[0-9]+');
			if(learnsetTest) console.log("Starting with Gen " + startGen);
			
			// For Stone Evolutions, import prevo's level-up learnset at level 1
			const stoneCheck = (startGen === 7 && pokemon.prevo && !(["Eevee", "Sunkern", "Charjabug", "Darumaka-Galar"].includes(pokemon.prevo)) && pokemon.evoItem && 
				["Fire Stone", "Water Stone", "Thunder Stone", "Leaf Stone", "Moon Stone", "Sun Stone", "Shiny Stone", "Dusk Stone", "Ice Stone"].includes(pokemon.evoItem));
			if(stoneCheck){
				if(learnsetTest) console.log("This Pokemon evolves by Evolution Stone and needs its prevo's level-up moves");
				for(const moveID in this.species.getLearnsetData(this.toID(pokemon.prevo)).learnset){
					const prevoMove = this.species.getLearnsetData(this.toID(pokemon.prevo)).learnset[moveID];
					const esLevelString = new RegExp('9L[0-9]+'); //Prevos will have updated their movepool first (no Pokemon evolves by Stone from one introduced later than it), so moves will always be stored as Gen 9
					if(esLevelString.test(prevoMove[0])){ //Level-up will always be first in updated learnset and we only need it once
						if(learnsetTest) console.log("Importing " + moveID);
						if(this.species.getLearnsetData(pokemonID).learnset[moveID]) this.species.getLearnsetData(pokemonID).learnset[moveID].unshift("7L1");
						else this.species.getLearnsetData(pokemonID).learnset[moveID] = ["7L1"];
					}
				}
				if(learnsetTest) console.log("Commencing update");
			}
			
			for(let move of this.moves.all()) {
				const moveID = this.toID(move.name);
				moveLearn = this.species.getLearnsetData(pokemonID).learnset[moveID];
				if(!moveLearn){
					// checks for new universal machines
					if(!(noUniversalTMs.includes(pokemonID))){
						if(moveID === "endure" && pokemon.gen > 4){
							if(learnsetTest) console.log("Adding universal TM Endure");
							this.species.getLearnsetData(pokemonID).learnset[moveID] = ["9M"];
						} else if(["hiddenpower", "secretpower", "return", "frustration"].includes(moveID) && pokemon.gen > 7){
							if(learnsetTest) console.log("Adding universal TM " + moveID + " aka " + move.name);
							this.species.getLearnsetData(pokemonID).learnset[moveID] = ["9M"];
						} else if(moveID === "attract" && pokemon.gen === 9 && pokemon.gender !== 'N'){
							if(learnsetTest) console.log("Adding universal TM Attract");
							this.species.getLearnsetData(pokemonID).learnset[moveID] = ["9M"];
						}
					}
					continue;
				}
				if(learnsetTest) console.log("Found move " + move.name);
				if(learnsetTest) console.log(moveLearn);
				/* Collects means of learning the move in Earth & Sky */
				let moveMeans: string[] = [];
				// Level and egg moves of base gen
				for(const learnType of moveLearn){
					if(levelString.test(learnType)){
						if(stoneCheck) { //Most Stone Evolutions only learn moves at level 1 and therefore we must also make sure they only learn moves once by level
							if(!moveMeans.includes("8L1")) moveMeans.push("9L1");
						/*} else if(learnType === (startGen + "L1") && pokemon.prevo && this.species.getLearnsetData(prevo).learnset){ //Removes all instances of evolutions moving moves to level 1
							const prevoLearn = this.species.getLearnsetData(prevo).learnset[moveID];
							for(const prevoMeans of prevoLearn){
								if(levelString.test(prevoMeans) && prevoMeans !== (startGen + "L1")){ //Showdown only stores the earliest level, so we only have to check for prevos not having it at 1
									if(learnsetTest) console.log("This move is learned at level 1, but the prevo learns it later; using the later one");
									moveMeans = ["8" + prevoMeans.substring(1)]; //The check comes before non-level means are compiled, so this overrides the level 1 with the other level
								}
							}*/
						} else {
							if(learnsetTest) console.log("This move is learned by level");
							moveMeans.push("9" + learnType.substring(1));
						}
					}
				}
				if(moveLearn.includes("".concat(startGen,"R"))){
					if(learnsetTest) console.log("This move is learned on forme change");
					moveMeans.push("9R");
				}
				// Pulls combined TMs and the three retained Isle Tutors
				if((moveLearn.includes("6M") || moveLearn.includes("7M") || moveLearn.includes("7T") || moveLearn.includes("8M") || moveLearn.includes("9M")) && !droppedMachines.includes(moveID)){
					if(learnsetTest) console.log("This move is taught by machine");
					moveMeans.push("9M");
				}
				if((moveID === "lashout" || moveID === "poltergeist") && moveLearn.includes("8T")){
					if(learnsetTest) console.log("This move is taught by machine");
					moveMeans.push("9M");
				}
				if(['grasspledge', 'firepledge', 'waterpledge', 'frenzyplant', 'blastburn', 'hydrocannon', 'dracometeor', 'steelbeam', 'meteorbeam'].includes(moveID) && (moveLearn.includes("8T") || moveLearn.includes("9M"))){
					if(learnsetTest) console.log("This move is taught by tutor");
					moveMeans.push("9T");
				}
				if(!moveMeans.length){ //Egg moves, with Gen VIII change of not learning those learned by other means
					if(moveLearn.includes("".concat(startGen,"E"))){
						if(learnsetTest) console.log("This move is learned by egg");
						moveMeans.push("9E");
					}
					if(startGen > 7 && moveLearn.includes("7E")){
						if(learnsetTest) console.log("This move was learned by egg before it got removed");
						moveMeans.push("9E");
					}
				}
				if(learnsetTest) console.log("Compiled: " + moveMeans);
				//Lash Out - differentiating between Gen 8 and ES
				if(moveID === "lashout" && moveMeans == "9M"){ //Gen 8 is machine, ES is not
					if(learnsetTest) console.log("Renaming old Lash Out to Compensation");
					this.species.getLearnsetData(pokemonID).learnset[this.toID('compensation')] = ["9M"];
					//delete this.data.Learnsets[pokemonID].learnset[moveID];
					delete this.species.getLearnsetData(pokemonID).learnset[moveID];
					continue;
				}
				//Other
				/* Move removals */
				//Dropped teachables
				/*if(droppedMachines.includes(moveID) && moveMeans.includes("9M")){
					if(learnsetTest) console.log("This move is actually no longer taught"); //Note: Flash is in this list because it's restricted and gets re-added manually
					moveMeans.splice(moveMeans.indexOf("9M"),1);
					if(moveMeans.length === 0){
						delete this.species.getLearnsetData(pokemonID).learnset[moveID];
						if(learnsetTest) console.log("This move is not learned anymore");
						continue;
					}
				}*/
				//Egg moves learned by other means
				/*if(moveMeans.length > 1 && moveMeans.includes("9E")){
					if(learnsetTest) console.log("This move is redundantly an egg move");
					moveMeans.splice(moveMeans.indexOf("9E"),1);
				}*/
				this.species.getLearnsetData(pokemonID).learnset[moveID] = moveMeans;
			}
			// Move renames
			for(let i = 0; i < renamedMoves.length; i++){
				if(this.species.getLearnsetData(pokemonID).learnset[renamedMoves[i]]){
					if(learnsetTest) console.log("Renaming " + renamedMoves[i]);
					this.species.getLearnsetData(pokemonID).learnset[newNameMoves[i]] = this.species.getLearnsetData(pokemonID).learnset[renamedMoves[i]];
					//delete this.data.Learnsets[pokemonID].learnset[renamedMoves[i]];
					delete this.species.getLearnsetData(pokemonID).learnset[renamedMoves[i]];
				}
			}
			// Move deletion
			for(let i = 0; i < deletedMoves.length; i++){
				if(this.species.getLearnsetData(pokemonID).learnset[deletedMoves[i]]){
					if(learnsetTest) console.log("Deleting " + deletedMoves[i]);
					//delete this.data.Learnsets[pokemonID].learnset[deletedMoves[i]];
					delete this.species.getLearnsetData(pokemonID).learnset[deletedMoves[i]];
				}
			}
			// Ability renames
			for(let i = 0; i < renamedAbilities.length; i++){ //Abilities
				const pokeAbilities = pokemon.abilities;
				for(const abilityKey in pokeAbilities){
					if(this.toID(pokeAbilities[abilityKey]) === renamedAbilities[i]){
						//console.log(this.data.Abilities[renamedAbilities[i]].name + " name change");
						pokemon.abilities[abilityKey] = this.data.Abilities[newNameAbilities[i]].name;
						//console.log(pokemon.abilities[abilityKey]);
						break;
					}
				}
			}
			if(learnsetTest){
				console.log("Final: ");
				console.log(this.species.getLearnsetData(pokemonID).learnset);
				console.log("");
			}
		}
		
		/* Renames, re-additions, and removals */
		/*for(let i = 0; i < renamedPokemon.length; i++){
			const oldID = this.toID(renamedPokemon[i]);
			const newID = this.toID(newNamePokemon[i]);
			if(!this.modData('Pokedex', newID)) this.data['Pokedex'][newID] = this.modData('Pokedex', oldID);
			this.modData('Pokedex', newID).name = newNamePokemon[i];
			if(!this.modData('Pokedex', oldID).battleOnly) this.data['Learnsets'][newID] = this.species.getLearnsetData(oldID);
			this.data['FormatsData'][newID] = this.modData('FormatsData', oldID);
			delete this.data['Pokedex'][oldID];
			delete this.data['Learnsets'][oldID];
			delete this.data['FormatsData'][oldID];
		}*/
		for(let move of this.moves.all()) {
			const moveID = this.toID(move.name);
			if(moveID.endsWith('torque') || move.isNonstandard === "Past") delete move.isNonstandard;
			if(move.zMove) delete move.zMove;
		}
		/*for(const moveID of renamedMoves) {
			//delete Object.keys(Dex.moves)[moveID];
			const move = this.modData('Moves', moveID);
			move.isNonstandard = "Unobtainable";
		}
		for(const moveID of deletedMoves) {
			//delete this.modData('Moves', moveID);
			const move = this.modData('Moves', moveID);
			move.isNonstandard = "Past";
		}
		for(const abilityID of renamedAbilities) {
			//delete this.modData('Abilities', abilityID);
			const ability = this.modData('Abilities', abilityID);
			ability.isNonstandard = "Unobtainable";
		}
		for(const abilityID of deletedAbilities) {
			//delete this.modData('Abilities', abilityID);
			const ability = this.modData('Abilities', abilityID);
			ability.isNonstandard = "Past";
		}*/
		for(let item of this.items.all()){
			const itemID = this.toID(item.name);
			if((item.isNonstandard === "Past" || item.isNonstandard === "Unobtainable") && !item.zMove) delete item.isNonstandard;
			if(item.isBerry && !item.consumable) item.consumable = true; //I manually added the flag to the ones I edited, but there are some I didn't edit.
			if(item.fling && item.fling.basePower === 10){ //Fling BP buffs
				if(item.isBerry || item === "airballoon") continue;
				item.fling.basePower = 20;
			}
			if(itemID.startsWith('tr')) delete item.fling; //TRs can't be Flung anymore.
		}
		/*for(const itemID of deletedItems) {
			//delete this.modData('Items', itemID);
			const item = this.modData('Items', itemID);
			item.isNonstandard = "Past";
		}*/
		
		/* individual Pokemon moveset edits */
		// Bulbasaur
		this.species.getLearnsetData('bulbasaur').learnset.belch = ["9D"];
		this.species.getLearnsetData('bulbasaur').learnset.leafage = ["9L3"];
		this.species.getLearnsetData('bulbasaur').learnset.sludge = ["9L21"];
		this.species.getLearnsetData('bulbasaur').learnset.sludgewave = ["9L33", "9M"];
		this.species.getLearnsetData('bulbasaur').learnset.naturalgift = ["9M"];
		this.species.getLearnsetData('bulbasaur').learnset.toxic = ["9M"];
		this.species.getLearnsetData('bulbasaur').learnset.trailhead = ["9M"];
		this.species.getLearnsetData('bulbasaur').learnset.vinewhip = ["9E"];
		delete this.species.getLearnsetData('bulbasaur').learnset.doubleedge;
		delete this.species.getLearnsetData('bulbasaur').learnset.knockoff;
		delete this.species.getLearnsetData('bulbasaur').learnset.takedown;
		// Ivysaur
		this.species.getLearnsetData('ivysaur').learnset.belch = ["9D"];
		this.species.getLearnsetData('ivysaur').learnset.leafage = ["9L3"];
		this.species.getLearnsetData('ivysaur').learnset.sludge = ["9L25"];
		this.species.getLearnsetData('ivysaur').learnset.sludgewave = ["9L45", "9M"];
		this.species.getLearnsetData('ivysaur').learnset.naturalgift = ["9M"];
		this.species.getLearnsetData('ivysaur').learnset.toxic = ["9M"];
		this.species.getLearnsetData('ivysaur').learnset.trailhead = ["9M"];
		delete this.species.getLearnsetData('ivysaur').learnset.doubleedge;
		delete this.species.getLearnsetData('ivysaur').learnset.knockoff;
		delete this.species.getLearnsetData('ivysaur').learnset.takedown;
		// Venusaur
		this.species.getLearnsetData('venusaur').learnset.belch = ["9D"];
		this.species.getLearnsetData('venusaur').learnset.leafage = ["9L3"];
		this.species.getLearnsetData('venusaur').learnset.sludge = ["9L25"];
		this.species.getLearnsetData('venusaur').learnset.sludgewave = ["9L51", "9M"];
		this.species.getLearnsetData('venusaur').learnset.naturalgift = ["9M"];
		this.species.getLearnsetData('venusaur').learnset.toxic = ["9M"];
		this.species.getLearnsetData('venusaur').learnset.trailhead = ["9M"];
		delete this.species.getLearnsetData('venusaur').learnset.doubleedge;
		delete this.species.getLearnsetData('venusaur').learnset.knockoff;
		delete this.species.getLearnsetData('venusaur').learnset.takedown;
		// Charmander
		this.species.getLearnsetData('charmander').learnset.twister = ["9D"];
		this.species.getLearnsetData('charmander').learnset.firefang = ["9L24"];
		this.species.getLearnsetData('charmander').learnset.firespin = ["9L17"];
		this.species.getLearnsetData('charmander').learnset.flameburst = ["9E"];
		this.species.getLearnsetData('charmander').learnset.flamethrower = ["9L32"];
		this.species.getLearnsetData('charmander').learnset.flash = ["9M"];
		delete this.species.getLearnsetData('charmander').learnset.wingattack;
		// Charmeleon
		this.species.getLearnsetData('charmeleon').learnset.twister = ["9D"];
		this.species.getLearnsetData('charmeleon').learnset.firefang = ["9L30"];
		this.species.getLearnsetData('charmeleon').learnset.firespin = ["9L19"];
		this.species.getLearnsetData('charmeleon').learnset.flash = ["9M"];
		this.species.getLearnsetData('charmeleon').learnset.flamethrower = ["9L42"];
		// Charizard
		this.species.getLearnsetData('charizard').learnset.twister = ["9D"];
		this.species.getLearnsetData('charizard').learnset.firefang = ["9L30"];
		this.species.getLearnsetData('charizard').learnset.firespin = ["9L19"];
		this.species.getLearnsetData('charizard').learnset.flamethrower = ["9L46"];
		this.species.getLearnsetData('charizard').learnset.fellswoop = ["9M"];
		this.species.getLearnsetData('charizard').learnset.flash = ["9M"];
		// Squirtle
		this.species.getLearnsetData('squirtle').learnset.shellsmash = ["9D"];
		this.species.getLearnsetData('squirtle').learnset.whitewater = ["9L16"];
		this.species.getLearnsetData('squirtle').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('squirtle').learnset.fullcollide = ["9M"];
		this.species.getLearnsetData('squirtle').learnset.lifedew = ["9E"];
		this.species.getLearnsetData('squirtle').learnset.jetpunch = ["9E"];
		this.species.getLearnsetData('squirtle').learnset.liquidation = ["9E"];
		delete this.species.getLearnsetData('squirtle').learnset.bite;
		delete this.species.getLearnsetData('squirtle').learnset.blizzard;
		// Wartortle
		this.species.getLearnsetData('wartortle').learnset.shellsmash = ["9D"];
		this.species.getLearnsetData('wartortle').learnset.whitewater = ["9L16"];
		this.species.getLearnsetData('wartortle').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('wartortle').learnset.fullcollide = ["9M"];
		delete this.species.getLearnsetData('wartortle').learnset.bite;
		delete this.species.getLearnsetData('wartortle').learnset.blizzard;
		// Blastoise
		this.species.getLearnsetData('blastoise').learnset.shellsmash = ["9D"];
		this.species.getLearnsetData('blastoise').learnset.whitewater = ["9L16"];
		this.species.getLearnsetData('blastoise').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('blastoise').learnset.fullcollide = ["9M"];
		this.species.getLearnsetData('blastoise').learnset.liquidation = ["9L1"];
		delete this.species.getLearnsetData('blastoise').learnset.bite;
		delete this.species.getLearnsetData('blastoise').learnset.blizzard;
		// Butterfree
		this.species.getLearnsetData('butterfree').learnset.pollenpuff = ["9D"];
		this.species.getLearnsetData('butterfree').learnset.flash = ["9M"];
		this.species.getLearnsetData('butterfree').learnset.naturalgift = ["9M"];
		this.species.getLearnsetData('butterfree').learnset.nightmare = ["9M"];
		delete this.species.getLearnsetData('butterfree').learnset.hurricane;
		// Beedrill
		this.species.getLearnsetData('beedrill').learnset.attackorder = ["9D"];
		this.species.getLearnsetData('beedrill').learnset.mortalstrike = ["9L47"];
		this.species.getLearnsetData('beedrill').learnset.compensation = ["9M"];
		this.species.getLearnsetData('beedrill').learnset.naturalgift = ["9M"];
		this.species.getLearnsetData('beedrill').learnset.toxic = ["9M"];
		delete this.species.getLearnsetData('beedrill').learnset.brutalswing;
		delete this.species.getLearnsetData('beedrill').learnset.knockoff;
		// Pidgey
		this.species.getLearnsetData('pidgey').learnset.swift = ["9D"];
		// Pidgeotto
		this.species.getLearnsetData('pidgeotto').learnset.swift = ["9D"];
		// Pidgeot
		this.species.getLearnsetData('pidgeot').learnset.swift = ["9D"];
		// Rattata
		this.species.getLearnsetData('rattata').learnset.odorsleuth = ["9D"];
		this.species.getLearnsetData('rattata').learnset.chipaway = ["9M"];
		this.species.getLearnsetData('rattata').learnset.cut = ["9L25"];
		this.species.getLearnsetData('rattata').learnset.suckerpunch = ["9L28"];
		this.species.getLearnsetData('rattata').learnset.superfang = ["9L31"];
		this.species.getLearnsetData('rattata').learnset.doubleedge = ["9L34"];
		this.species.getLearnsetData('rattata').learnset.endeavor = ["9L37"];
		this.species.getLearnsetData('rattata').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('rattata').learnset.shockwave = ["9M"];
		this.species.getLearnsetData('rattata').learnset.toxic = ["9M"];
		delete this.species.getLearnsetData('rattata').learnset.blizzard;
		delete this.species.getLearnsetData('rattata').learnset.icebeam;
		delete this.species.getLearnsetData('rattata').learnset.thunder;
		delete this.species.getLearnsetData('rattata').learnset.thunderbolt;
		// Rattata Alola
		this.species.getLearnsetData('rattataalola').learnset.odorsleuth = ["9D"];
		this.species.getLearnsetData('rattataalola').learnset.chipaway = ["9M"];
		this.species.getLearnsetData('rattataalola').learnset.cut = ["9L25"];
		this.species.getLearnsetData('rattataalola').learnset.suckerpunch = ["9L28"];
		this.species.getLearnsetData('rattataalola').learnset.superfang = ["9L31"];
		this.species.getLearnsetData('rattataalola').learnset.doubleedge = ["9L34"];
		this.species.getLearnsetData('rattataalola').learnset.endeavor = ["9L37"];
		this.species.getLearnsetData('rattataalola').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('rattataalola').learnset.shockwave = ["9M"];
		this.species.getLearnsetData('rattataalola').learnset.toxic = ["9M"];
		this.species.getLearnsetData('rattataalola').learnset.stuffcheeks = ["9E"];
		delete this.species.getLearnsetData('rattataalola').learnset.blizzard;
		delete this.species.getLearnsetData('rattataalola').learnset.icebeam;
		delete this.species.getLearnsetData('rattataalola').learnset.thunder;
		delete this.species.getLearnsetData('rattataalola').learnset.thunderbolt;
		// Raticate
		this.species.getLearnsetData('raticate').learnset.odorsleuth = ["9D"];
		this.species.getLearnsetData('raticate').learnset.chipaway = ["9M"];
		this.species.getLearnsetData('raticate').learnset.cut = ["9L25"];
		this.species.getLearnsetData('raticate').learnset.suckerpunch = ["9L28"];
		this.species.getLearnsetData('raticate').learnset.superfang = ["9L31"];
		this.species.getLearnsetData('raticate').learnset.doubleedge = ["9L34"];
		this.species.getLearnsetData('raticate').learnset.endeavor = ["9L37"];
		this.species.getLearnsetData('raticate').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('raticate').learnset.shockwave = ["9M"];
		this.species.getLearnsetData('raticate').learnset.toxic = ["9M"];
		delete this.species.getLearnsetData('raticate').learnset.blizzard;
		delete this.species.getLearnsetData('raticate').learnset.thunder;
		// Raticate Alola
		this.species.getLearnsetData('raticatealola').learnset.odorsleuth = ["9D"];
		this.species.getLearnsetData('raticatealola').learnset.chipaway = ["9M"];
		this.species.getLearnsetData('raticatealola').learnset.cut = ["9L25"];
		this.species.getLearnsetData('raticatealola').learnset.suckerpunch = ["9L28"];
		this.species.getLearnsetData('raticatealola').learnset.superfang = ["9L31"];
		this.species.getLearnsetData('raticatealola').learnset.doubleedge = ["9L34"];
		this.species.getLearnsetData('raticatealola').learnset.endeavor = ["9L37"];
		this.species.getLearnsetData('raticatealola').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('raticatealola').learnset.shockwave = ["9M"];
		this.species.getLearnsetData('raticatealola').learnset.toxic = ["9M"];
		delete this.species.getLearnsetData('raticatealola').learnset.blizzard;
		delete this.species.getLearnsetData('raticatealola').learnset.icebeam;
		delete this.species.getLearnsetData('raticatealola').learnset.thunder;
		// Spearow
		this.species.getLearnsetData('spearow').learnset.mortalstrike = ["9D"];
		this.species.getLearnsetData('spearow').learnset.smartstrike = ["9M"];
		this.species.getLearnsetData('spearow').learnset.chipaway = ["9M"];
		this.species.getLearnsetData('spearow').learnset.throatchop = ["9E"];
		// Fearow
		this.species.getLearnsetData('fearow').learnset.mortalstrike = ["9D"];
		this.species.getLearnsetData('fearow').learnset.smartstrike = ["9M"];
		this.species.getLearnsetData('fearow').learnset.chipaway = ["9M"];
		// Ekans
		this.species.getLearnsetData('ekans').learnset.dragonbreath = ["9D"];
		this.species.getLearnsetData('ekans').learnset.bind = ["9L1"];
		this.species.getLearnsetData('ekans').learnset.mortalstrike = ["9L49"];
		this.species.getLearnsetData('ekans').learnset.gunkshot = ["9M"];
		this.species.getLearnsetData('ekans').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('ekans').learnset.toxic = ["9M"];
		delete this.species.getLearnsetData('ekans').learnset.earthquake;
		delete this.species.getLearnsetData('ekans').learnset.wrap;
		// Arbok
		this.species.getLearnsetData('arbok').learnset.dragonbreath = ["9D"];
		this.species.getLearnsetData('ekans').learnset.bind = ["9L1"];
		this.species.getLearnsetData('ekans').learnset.mortalstrike = ["9L63"];
		this.species.getLearnsetData('arbok').learnset.gunkshot = ["9M"];
		this.species.getLearnsetData('arbok').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('arbok').learnset.toxic = ["9M"];
		delete this.species.getLearnsetData('arbok').learnset.earthquake;
		delete this.species.getLearnsetData('arbok').learnset.wrap;
		// Pikachu
		this.species.getLearnsetData('pikachu').learnset.paraboliccharge = ["9D"];
		this.species.getLearnsetData('pikachu').learnset.flash = ["9M"];
		this.species.getLearnsetData('pikachu').learnset.metronome = ["9M"];
		delete this.species.getLearnsetData('pikachu').learnset.knockoff;
		// Raichu
		this.species.getLearnsetData('raichu').learnset.paraboliccharge = ["9D"];
		this.species.getLearnsetData('raichu').learnset.completeshock = ["9L1"];
		this.species.getLearnsetData('raichu').learnset.flash = ["9M"];
		this.species.getLearnsetData('raichu').learnset.metronome = ["9M"];
		// Raichu Alola
		this.species.getLearnsetData('raichualola').learnset.paraboliccharge = ["9D"];
		this.species.getLearnsetData('raichualola').learnset.flash = ["9M"];
		this.species.getLearnsetData('raichualola').learnset.metronome = ["9M"];
		// Sandshrew
		this.species.getLearnsetData('sandshrew').learnset.steamroller = ["9D"];
		this.species.getLearnsetData('sandshrew').learnset.fullcollide = ["9M"];
		this.species.getLearnsetData('sandshrew').learnset.trailhead = ["9M"];
		this.species.getLearnsetData('sandshrew').learnset.vitaldrain = ["9M"];
		delete this.species.getLearnsetData('sandshrew').learnset.knockoff;
		delete this.species.getLearnsetData('sandshrew').learnset.leechlife;
		// Sandshrew Alola
		this.species.getLearnsetData('sandshrewalola').learnset.steamroller = ["9D"];
		this.species.getLearnsetData('sandshrewalola').learnset.fullcollide = ["9M"];
		this.species.getLearnsetData('sandshrewalola').learnset.honeclaws = ["9M"];
		this.species.getLearnsetData('sandshrewalola').learnset.trailhead = ["9M"];
		this.species.getLearnsetData('sandshrewalola').learnset.vitaldrain = ["9M"];
		this.species.getLearnsetData('sandshrewalola').learnset.rockclimb = ["9E"];
		delete this.species.getLearnsetData('sandshrewalola').learnset.knockoff;
		delete this.species.getLearnsetData('sandshrewalola').learnset.leechlife;
		// Sandslash
		this.species.getLearnsetData('sandslash').learnset.spikes = ["9D"];
		this.species.getLearnsetData('sandslash').learnset.fullcollide = ["9M"];
		this.species.getLearnsetData('sandslash').learnset.trailhead = ["9M"];
		this.species.getLearnsetData('sandslash').learnset.vitaldrain = ["9M"];
		delete this.species.getLearnsetData('sandslash').learnset.leechlife;
		// Sandslash Alola
		this.species.getLearnsetData('sandslashalola').learnset.spikes = ["9D"];
		this.species.getLearnsetData('sandslashalola').learnset.metaledge = ["9L1"];
		this.species.getLearnsetData('sandslashalola').learnset.fullcollide = ["9M"];
		this.species.getLearnsetData('sandslashalola').learnset.honeclaws = ["9M"];
		this.species.getLearnsetData('sandslashalola').learnset.trailhead = ["9M"];
		this.species.getLearnsetData('sandslashalola').learnset.vitaldrain = ["9M"];
		delete this.species.getLearnsetData('sandslashalola').learnset.knockoff;
		delete this.species.getLearnsetData('sandslashalola').learnset.leechlife;
		// Nidoran♀
		this.species.getLearnsetData('nidoranf').learnset.moonlight = ["9D"];
		this.species.getLearnsetData('nidoranf').learnset.poisonfang = ["9L37"];
		this.species.getLearnsetData('nidoranf').learnset.crunch = ["9L45"];
		this.species.getLearnsetData('nidoranf').learnset.amnesia = ["9M"];
		this.species.getLearnsetData('nidoranf').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('nidoranf').learnset.faketears = ["9M"];
		this.species.getLearnsetData('nidoranf').learnset.shockwave = ["9M"];
		this.species.getLearnsetData('nidoranf').learnset.toxic = ["9M"];
		delete this.species.getLearnsetData('nidoranf').learnset.blizzard;
		delete this.species.getLearnsetData('nidoranf').learnset.icebeam;
		delete this.species.getLearnsetData('nidoranf').learnset.thunder;
		delete this.species.getLearnsetData('nidoranf').learnset.thunderbolt;
		// Nidorina
		this.species.getLearnsetData('nidorina').learnset.moonlight = ["9D"];
		this.species.getLearnsetData('nidorina').learnset.poisonfang = ["9L43"];
		this.species.getLearnsetData('nidorina').learnset.crunch = ["9L53"];
		this.species.getLearnsetData('nidorina').learnset.barbbarrage = ["9L58"];
		this.species.getLearnsetData('nidorina').learnset.amnesia = ["9M"];
		this.species.getLearnsetData('nidorina').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('nidorina').learnset.faketears = ["9M"];
		this.species.getLearnsetData('nidorina').learnset.shockwave = ["9M"];
		this.species.getLearnsetData('nidorina').learnset.toxic = ["9M"];
		delete this.species.getLearnsetData('nidorina').learnset.blizzard;
		delete this.species.getLearnsetData('nidorina').learnset.icebeam;
		delete this.species.getLearnsetData('nidorina').learnset.thunder;
		delete this.species.getLearnsetData('nidorina').learnset.thunderbolt;
		// Nidoqueen
		this.species.getLearnsetData('nidoqueen').learnset.moonlight = ["9D"];
		this.species.getLearnsetData('nidoqueen').learnset.amnesia = ["9M"];
		this.species.getLearnsetData('nidoqueen').learnset.breakingswipe = ["9M"];
		this.species.getLearnsetData('nidoqueen').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('nidoqueen').learnset.faketears = ["9M"];
		this.species.getLearnsetData('nidoqueen').learnset.toxic = ["9M"];
		this.species.getLearnsetData('nidoqueen').learnset.shockwave = ["9M"];
		this.species.getLearnsetData('nidoqueen').learnset.meteorbeam = ["9T"];
		// Nidoran♂
		this.species.getLearnsetData('nidoranm').learnset.moonlight = ["9D"];
		this.species.getLearnsetData('nidoranm').learnset.mortalstrike = ["9L45"];
		this.species.getLearnsetData('nidoranm').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('nidoranm').learnset.screech = ["9M"];
		this.species.getLearnsetData('nidoranm').learnset.shockwave = ["9M"];
		this.species.getLearnsetData('nidoranm').learnset.toxic = ["9M"];
		delete this.species.getLearnsetData('nidoranm').learnset.blizzard;
		delete this.species.getLearnsetData('nidoranm').learnset.icebeam;
		delete this.species.getLearnsetData('nidoranm').learnset.horndrill;
		delete this.species.getLearnsetData('nidoranm').learnset.thunder;
		delete this.species.getLearnsetData('nidoranm').learnset.thunderbolt;
		// Nidorino
		this.species.getLearnsetData('nidorino').learnset.moonlight = ["9D"];
		this.species.getLearnsetData('nidorino').learnset.mortalstrike = ["9L53"];
		this.species.getLearnsetData('nidorino').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('nidorino').learnset.screech = ["9M"];
		this.species.getLearnsetData('nidorino').learnset.shockwave = ["9M"];
		this.species.getLearnsetData('nidorino').learnset.toxic = ["9M"];
		delete this.species.getLearnsetData('nidorino').learnset.blizzard;
		delete this.species.getLearnsetData('nidorino').learnset.icebeam;
		delete this.species.getLearnsetData('nidorino').learnset.thunder;
		delete this.species.getLearnsetData('nidorino').learnset.thunderbolt;
		// Nidoking
		this.species.getLearnsetData('nidoking').learnset.moonlight = ["9D"];
		this.species.getLearnsetData('nidoking').learnset.breakingswipe = ["9M"];
		this.species.getLearnsetData('nidoking').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('nidoking').learnset.screech = ["9M"];
		this.species.getLearnsetData('nidoking').learnset.shockwave = ["9M"];
		this.species.getLearnsetData('nidoking').learnset.toxic = ["9M"];
		this.species.getLearnsetData('nidoking').learnset.meteorbeam = ["9T"];
		// Clefairy
		this.species.getLearnsetData('clefairy').learnset.teeterdance = ["9D"];
		this.species.getLearnsetData('clefairy').learnset.flash = ["9M"];
		this.species.getLearnsetData('clefairy').learnset.lifedew = ["9L28"];
		this.species.getLearnsetData('clefairy').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('clefairy').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('clefairy').learnset.shockwave = ["9M"];
		delete this.species.getLearnsetData('clefairy').learnset.blizzard;
		delete this.species.getLearnsetData('clefairy').learnset.bounce;
		delete this.species.getLearnsetData('clefairy').learnset.fireblast;
		delete this.species.getLearnsetData('clefairy').learnset.flamethrower;
		delete this.species.getLearnsetData('clefairy').learnset.icebeam;
		delete this.species.getLearnsetData('clefairy').learnset.knockoff;
		delete this.species.getLearnsetData('clefairy').learnset.thunder;
		delete this.species.getLearnsetData('clefairy').learnset.thunderbolt;
		// Clefable
		this.species.getLearnsetData('clefable').learnset.lunardance = ["9D"];
		this.species.getLearnsetData('clefable').learnset.lifedew = ["9L1"];
		this.species.getLearnsetData('clefable').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('clefable').learnset.flash = ["9M"];
		this.species.getLearnsetData('clefable').learnset.nightmare = ["9M"];
		delete this.species.getLearnsetData('clefable').learnset.bounce;
		delete this.species.getLearnsetData('clefable').learnset.knockoff;
		delete this.species.getLearnsetData('clefable').learnset.thunder;
		// Vulpix
		this.species.getLearnsetData('vulpix').learnset.weatherball = ["9D"];
		this.species.getLearnsetData('vulpix').learnset.mysticalfire = ["9E"];
		// Vulpix Alola
		this.species.getLearnsetData('vulpixalola').learnset.weatherball = ["9D"];
		// Ninetales
		this.species.getLearnsetData('ninetales').learnset.weatherball = ["9D"];
		// Ninetales Alola
		this.species.getLearnsetData('ninetalesalola').learnset.weatherball = ["9D"];
		// Jigglypuff
		this.species.getLearnsetData('jigglypuff').learnset.boomburst = ["9D"];
		this.species.getLearnsetData('jigglypuff').learnset.pound = ["9L1"];
		this.species.getLearnsetData('jigglypuff').learnset.aerate = ["9L3"];
		this.species.getLearnsetData('jigglypuff').learnset.flash = ["9M"];
		this.species.getLearnsetData('jigglypuff').learnset.rebound = ["9L49"];
		delete this.species.getLearnsetData('jigglypuff').learnset.blizzard;
		delete this.species.getLearnsetData('jigglypuff').learnset.fireblast;
		delete this.species.getLearnsetData('jigglypuff').learnset.gyroball;
		delete this.species.getLearnsetData('jigglypuff').learnset.flamethrower;
		delete this.species.getLearnsetData('jigglypuff').learnset.icebeam;
		delete this.species.getLearnsetData('jigglypuff').learnset.knockoff;
		delete this.species.getLearnsetData('jigglypuff').learnset.nightmare;
		delete this.species.getLearnsetData('jigglypuff').learnset.thunder;
		delete this.species.getLearnsetData('jigglypuff').learnset.thunderbolt;
		// Wigglytuff
		this.species.getLearnsetData('wigglytuff').learnset.boomburst = ["9D"];
		this.species.getLearnsetData('wigglytuff').learnset.aerate = ["9L1"];
		this.species.getLearnsetData('wigglytuff').learnset.flash = ["9M"];
		this.species.getLearnsetData('wigglytuff').learnset.moonblast = ["9L1"];
		this.species.getLearnsetData('wigglytuff').learnset.rebound = ["9L1"];
		delete this.species.getLearnsetData('wigglytuff').learnset.blizzard;
		delete this.species.getLearnsetData('wigglytuff').learnset.fireblast;
		delete this.species.getLearnsetData('wigglytuff').learnset.flamethrower;
		delete this.species.getLearnsetData('wigglytuff').learnset.gyroball;
		delete this.species.getLearnsetData('wigglytuff').learnset.icebeam;
		delete this.species.getLearnsetData('wigglytuff').learnset.knockoff;
		delete this.species.getLearnsetData('wigglytuff').learnset.nightmare;
		delete this.species.getLearnsetData('wigglytuff').learnset.thunder;
		delete this.species.getLearnsetData('wigglytuff').learnset.thunderbolt;
		// Zubat
		this.species.getLearnsetData('zubat').learnset.synchronoise = ["9D"];
		this.species.getLearnsetData('zubat').learnset.acrobatics = ["9L31","9M"];
		this.species.getLearnsetData('zubat').learnset.venoshock = ["9M"];
		this.species.getLearnsetData('zubat').learnset.vitaldrain = ["9L37","9M"];
		delete this.species.getLearnsetData('zubat').learnset.absorb;
		// Golbat
		this.species.getLearnsetData('golbat').learnset.synchronoise = ["9D"];
		this.species.getLearnsetData('golbat').learnset.acrobatics = ["9L25","9M"];
		this.species.getLearnsetData('golbat').learnset.venoshock = ["9M"];
		this.species.getLearnsetData('golbat').learnset.vitaldrain = ["9L43","9M"];
		delete this.species.getLearnsetData('golbat').learnset.absorb;
		// Oddish
		this.species.getLearnsetData('oddish').learnset.minimize = ["9D"];
		this.species.getLearnsetData('oddish').learnset.toxic = ["9L35", "9M"];
		// Gloom
		this.species.getLearnsetData('gloom').learnset.minimize = ["9D"];
		this.species.getLearnsetData('gloom').learnset.toxic = ["9L39", "9M"];
		// Vileplume
		this.species.getLearnsetData('vileplume').learnset.bunkerdown = ["9D"];
		this.species.getLearnsetData('vileplume').learnset.toxic = ["9L1", "9M"];
		// Paras
		this.species.getLearnsetData('paras').learnset.playdead = ["9D"];
		this.species.getLearnsetData('paras').learnset.leechlife = ["9L11"];
		this.species.getLearnsetData('paras').learnset.vitaldrain = ["9M"];
		this.species.getLearnsetData('paras').learnset.toxic = ["9M"];
		delete this.species.getLearnsetData('paras').learnset.absorb;
		delete this.species.getLearnsetData('paras').learnset.grassyterrain;
		delete this.species.getLearnsetData('paras').learnset.knockoff;
		delete this.species.getLearnsetData('paras').learnset.synthesis;
		// Parasect
		this.species.getLearnsetData('parasect').learnset.playdead = ["9D"];
		this.species.getLearnsetData('parasect').learnset.leechlife = ["9L11"];
		this.species.getLearnsetData('parasect').learnset.vitaldrain = ["9M"];
		this.species.getLearnsetData('parasect').learnset.toxic = ["9M"];
		delete this.species.getLearnsetData('parasect').learnset.absorb;
		delete this.species.getLearnsetData('parasect').learnset.grassyterrain;
		delete this.species.getLearnsetData('parasect').learnset.knockoff;
		delete this.species.getLearnsetData('parasect').learnset.synthesis;
		// Venonat
		this.species.getLearnsetData('venonat').learnset.powder = ["9D"];
		this.species.getLearnsetData('venonat').learnset.bugcloud = ["9L5"];
		this.species.getLearnsetData('venonat').learnset.supersonic = ["9L11"];
		this.species.getLearnsetData('venonat').learnset.leechlife = ["9L13"];
		this.species.getLearnsetData('venonat').learnset.poisonpowder = ["9L17"];
		this.species.getLearnsetData('venonat').learnset.poisonfang = ["9L23"];
		this.species.getLearnsetData('venonat').learnset.stunspore = ["9L25"];
		this.species.getLearnsetData('venonat').learnset.springleap = ["9L29"];
		this.species.getLearnsetData('venonat').learnset.sleeppowder = ["9L35"];
		this.species.getLearnsetData('venonat').learnset.psybeam = ["9L37"];
		this.species.getLearnsetData('venonat').learnset.signalbeam = ["9L41", "9M"];
		this.species.getLearnsetData('venonat').learnset.psychic = ["9L47", "9M"];
		this.species.getLearnsetData('venonat').learnset.vitaldrain = ["9L49", "9M"];
		this.species.getLearnsetData('venonat').learnset.flash = ["9M"];
		this.species.getLearnsetData('venonat').learnset.toxic = ["9M"];
		this.species.getLearnsetData('venonat').learnset.zenheadbutt = ["9M"];
		delete this.species.getLearnsetData('venonat').learnset.bugbuzz;
		delete this.species.getLearnsetData('venonat').learnset.confusion;
		// Venomoth
		this.species.getLearnsetData('venomoth').learnset.powder = ["9D"];
		this.species.getLearnsetData('venomoth').learnset.silverwind = ["9L0"];
		this.species.getLearnsetData('venomoth').learnset.bugcloud = ["9L5"];
		this.species.getLearnsetData('venomoth').learnset.supersonic = ["9L11"];
		this.species.getLearnsetData('venomoth').learnset.leechlife = ["9L13"];
		this.species.getLearnsetData('venomoth').learnset.poisonpowder = ["9L17"];
		this.species.getLearnsetData('venomoth').learnset.poisonfang = ["9L23"];
		this.species.getLearnsetData('venomoth').learnset.stunspore = ["9L25"];
		this.species.getLearnsetData('venomoth').learnset.springleap = ["9L29"];
		this.species.getLearnsetData('venomoth').learnset.sleeppowder = ["9L37"];
		this.species.getLearnsetData('venomoth').learnset.psybeam = ["9L41"];
		this.species.getLearnsetData('venomoth').learnset.signalbeam = ["9L47", "9M"];
		this.species.getLearnsetData('venomoth').learnset.psychic = ["9L55", "9M"];
		this.species.getLearnsetData('venomoth').learnset.vitaldrain = ["9L59", "9M"];
		this.species.getLearnsetData('venomoth').learnset.bugbuzz = ["9L63"];
		this.species.getLearnsetData('venomoth').learnset.quiverdance = ["9L69"];
		this.species.getLearnsetData('venomoth').learnset.flash = ["9M"];
		this.species.getLearnsetData('venomoth').learnset.toxic = ["9M"];
		delete this.species.getLearnsetData('venomoth').learnset.bugbuzz;
		delete this.species.getLearnsetData('venomoth').learnset.confusion;
		delete this.species.getLearnsetData('venomoth').learnset.gust;
		// Diglett
		this.species.getLearnsetData('diglett').learnset.minimize = ["9D"];
		this.species.getLearnsetData('diglett').learnset.escapetunnel = ["9L46"];
		delete this.species.getLearnsetData('diglett').learnset.allyswitch;
		// Diglett Alola
		this.species.getLearnsetData('diglettalola').learnset.minimize = ["9D"];
		this.species.getLearnsetData('diglettalola').learnset.escapetunnel = ["9L46"];
		this.species.getLearnsetData('diglettalola').learnset.honeclaws = ["9M"];
		delete this.species.getLearnsetData('diglettalola').learnset.allyswitch;
		// Dugtrio
		this.species.getLearnsetData('dugtrio').learnset.minimize = ["9D"];
		this.species.getLearnsetData('dugtrio').learnset.escapetunnel = ["9L58"];
		delete this.species.getLearnsetData('dugtrio').learnset.allyswitch;
		// Dugtrio Alola
		this.species.getLearnsetData('dugtrioalola').learnset.minimize = ["9D"];
		this.species.getLearnsetData('dugtrioalola').learnset.escapetunnel = ["9L58"];
		this.species.getLearnsetData('dugtrioalola').learnset.honeclaws = ["9M"];
		delete this.species.getLearnsetData('dugtrioalola').learnset.allyswitch;
		// Meowth
		this.species.getLearnsetData('meowth').learnset.mefirst = ["9D"];
		this.species.getLearnsetData('meowth').learnset.trumpcard = ["9L55"];
		this.species.getLearnsetData('meowth').learnset.flash = ["9M"];
		delete this.species.getLearnsetData('meowth').learnset.nightmare;
		delete this.species.getLearnsetData('meowth').learnset.thunder;
		delete this.species.getLearnsetData('meowth').learnset.thunderbolt;
		// Meowth Alola
		this.species.getLearnsetData('meowthalola').learnset.mefirst = ["9D"];
		this.species.getLearnsetData('meowthalola').learnset.flash = ["9M"];
		this.species.getLearnsetData('meowthalola').learnset.honeclaws = ["9M"];
		delete this.species.getLearnsetData('meowthalola').learnset.thunder;
		delete this.species.getLearnsetData('meowthalola').learnset.thunderbolt;
		// Meowth Galar
		this.species.getLearnsetData('meowthgalar').learnset.mefirst = ["9D"];
		this.species.getLearnsetData('meowthgalar').learnset.feintattack = ["9L22"];
		this.species.getLearnsetData('meowthgalar').learnset.metalsound = ["9L46"];
		this.species.getLearnsetData('meowthgalar').learnset.metaledge = ["9L55"];
		this.species.getLearnsetData('meowthgalar').learnset.echoedvoice = ["9M"];
		this.species.getLearnsetData('meowthgalar').learnset.flash = ["9M"];
		this.species.getLearnsetData('meowthgalar').learnset.honeclaws = ["9M"];
		this.species.getLearnsetData('meowthgalar').learnset.knockoff = ["9M"];
		this.species.getLearnsetData('meowthgalar').learnset.lastresort = ["9M"];
		this.species.getLearnsetData('meowthgalar').learnset.psychup = ["9M"];
		this.species.getLearnsetData('meowthgalar').learnset.rocksmash = ["9M"];
		this.species.getLearnsetData('meowthgalar').learnset.shockwave = ["9M"];
		this.species.getLearnsetData('meowthgalar').learnset.snatch = ["9M"];
		this.species.getLearnsetData('meowthgalar').learnset.torment = ["9M"];
		delete this.species.getLearnsetData('meowthgalar').learnset.captivate;
		delete this.species.getLearnsetData('meowthgalar').learnset.gyroball;
		delete this.species.getLearnsetData('meowthgalar').learnset.thrash;
		delete this.species.getLearnsetData('meowthgalar').learnset.thunder;
		// Persian
		this.species.getLearnsetData('persian').learnset.mefirst = ["9D"];
		this.species.getLearnsetData('persian').learnset.trumpcard = ["969"];
		this.species.getLearnsetData('persian').learnset.flash = ["9M"];
		delete this.species.getLearnsetData('persian').learnset.nightmare;
		delete this.species.getLearnsetData('persian').learnset.thunder;
		// Persian Alola
		this.species.getLearnsetData('persianalola').learnset.mefirst = ["9D"];
		this.species.getLearnsetData('persianalola').learnset.flash = ["9M"];
		this.species.getLearnsetData('persianalola').learnset.honeclaws = ["9M"];
		delete this.species.getLearnsetData('persianalola').learnset.thunder;
		// Psyduck
		this.species.getLearnsetData('psyduck').learnset.mindbend = ["9D"];
		delete this.species.getLearnsetData('psyduck').learnset.blizzard;
		delete this.species.getLearnsetData('psyduck').learnset.trailhead;
		// Golduck
		this.species.getLearnsetData('golduck').learnset.spotlight = ["9D"];
		this.species.getLearnsetData('golduck').learnset.flash = ["9M"];
		this.species.getLearnsetData('golduck').learnset.nastyplot = ["9M"];
		this.species.getLearnsetData('golduck').learnset.powergem = ["9M"];
		delete this.species.getLearnsetData('golduck').learnset.blizzard;
		// Mankey
		this.species.getLearnsetData('mankey').learnset.megapunch = ["9D"];
		this.species.getLearnsetData('mankey').learnset.compensation = ["9M"];
		delete this.species.getLearnsetData('mankey').learnset.earthquake;
		delete this.species.getLearnsetData('mankey').learnset.thunder;
		delete this.species.getLearnsetData('mankey').learnset.thunderbolt;
		// Primeape
		this.species.getLearnsetData('primeape').learnset.megapunch = ["9D"];
		this.species.getLearnsetData('primeape').learnset.compensation = ["9M"];
		delete this.species.getLearnsetData('primeape').learnset.thunder;
		delete this.species.getLearnsetData('primeape').learnset.thunderbolt;
		// Growlithe
		this.species.getLearnsetData('growlithe').learnset.playnice = ["9D"];
		this.species.getLearnsetData('growlithe').learnset.charm = ["9M"];
		// Growlithe-Hisui
		this.species.getLearnsetData('growlithehisui').learnset.pursuit = ["9D"];
		// Arcanine
		this.species.getLearnsetData('arcanine').learnset.nobleroar = ["9D"];
		this.species.getLearnsetData('arcanine').learnset.charm = ["9M"];
		// Arcanine-Hisui
		this.species.getLearnsetData('arcaninehisui').learnset.nobleroar = ["9D"];
		// Poliwag
		this.species.getLearnsetData('poliwag').learnset.slipaway = ["9D"];
		this.species.getLearnsetData('poliwag').learnset.chillywater = ["9M"];
		delete this.species.getLearnsetData('poliwag').learnset.blizzard;
		// Poliwhirl
		this.species.getLearnsetData('poliwhirl').learnset.slipaway = ["9D"];
		this.species.getLearnsetData('poliwhirl').learnset.chillywater = ["9M"];
		delete this.species.getLearnsetData('poliwhirl').learnset.blizzard;
		delete this.species.getLearnsetData('poliwhirl').learnset.earthquake;
		// Poliwrath
		this.species.getLearnsetData('poliwrath').learnset.wavecrash = ["9D"];
		this.species.getLearnsetData('poliwrath').learnset.bodypress = ["9M"];
		this.species.getLearnsetData('poliwrath').learnset.chillywater = ["9M"];
		delete this.species.getLearnsetData('poliwrath').learnset.blizzard;
		// Abra
		this.species.getLearnsetData('abra').learnset.flash = ["9M"];
		this.species.getLearnsetData('abra').learnset.nightmare = ["9M"];
		delete this.species.getLearnsetData('abra').learnset.knockoff;
		// Kadabra
		this.species.getLearnsetData('kadabra').learnset.doubleteam = ["9D"];
		this.species.getLearnsetData('kadabra').learnset.confusion = ["9L0"];
		this.species.getLearnsetData('kadabra').learnset.flash = ["9M"];
		this.species.getLearnsetData('kadabra').learnset.nastyplot = ["9M"];
		this.species.getLearnsetData('kadabra').learnset.nightmare = ["9M"];
		delete this.species.getLearnsetData('kadabra').learnset.knockoff;
		// Alakazam
		this.species.getLearnsetData('alakazam').learnset.doubleteam = ["9D"];
		this.species.getLearnsetData('alakazam').learnset.eeriespell = ["9L0"];
		this.species.getLearnsetData('alakazam').learnset.flash = ["9M"];
		this.species.getLearnsetData('alakazam').learnset.nightmare = ["9M"];
		delete this.species.getLearnsetData('alakazam').learnset.knockoff;
		// Machop
		this.species.getLearnsetData('machop').learnset.holdback = ["9D"];
		this.species.getLearnsetData('machop').learnset.poweruppunch = ["9E"];
		delete this.species.getLearnsetData('machop').learnset.flamethrower;
		// Machoke
		this.species.getLearnsetData('machoke').learnset.holdback = ["9D"];
		delete this.species.getLearnsetData('machoke').learnset.flamethrower;
		// Machamp
		this.species.getLearnsetData('machamp').learnset.lashout = ["9D"];
		delete this.species.getLearnsetData('machamp').learnset.flamethrower;
		// Bellsprout
		this.species.getLearnsetData('bellsprout').learnset.venomdrench = ["9D"];
		this.species.getLearnsetData('bellsprout').learnset.toxic = ["9M"];
		this.species.getLearnsetData('bellsprout').learnset.vitaldrain = ["9M"];
		// Weepinbell
		this.species.getLearnsetData('weepinbell').learnset.venomdrench = ["9D"];
		this.species.getLearnsetData('weepinbell').learnset.toxic = ["9M"];
		this.species.getLearnsetData('weepinbell').learnset.vitaldrain = ["9M"];
		// Victreebell
		this.species.getLearnsetData('victreebell').learnset.venomdrench = ["9D"];
		this.species.getLearnsetData('victreebell').learnset.belch = ["9L1"];
		this.species.getLearnsetData('victreebell').learnset.vitaldrain = ["9L1", "9M"];
		this.species.getLearnsetData('victreebell').learnset.grassyterrain = ["9M"];
		this.species.getLearnsetData('victreebell').learnset.toxic = ["9M"];
		// Tentacool
		this.species.getLearnsetData('tentacool').learnset.doublehit = ["9D"];
		this.species.getLearnsetData('tentacool').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('tentacool').learnset.toxic = ["9M"];
		delete this.species.getLearnsetData('tentacool').learnset.blizzard;
		// Tentacruel
		this.species.getLearnsetData('tentacruel').learnset.lashout = ["9D"];
		this.species.getLearnsetData('tentacruel').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('tentacruel').learnset.toxic = ["9M"];
		delete this.species.getLearnsetData('tentacruel').learnset.blizzard;
		// Geodude
		this.species.getLearnsetData('geodude').learnset.camouflage = ["9D"];
		this.species.getLearnsetData('geodude').learnset.rapidspin = ["9E"];
		delete this.species.getLearnsetData('geodude').learnset.fireblast;
		delete this.species.getLearnsetData('geodude').learnset.flamethrower;
		// Geodude Alola
		this.species.getLearnsetData('geodudealola').learnset.electrify = ["9D"];
		this.species.getLearnsetData('geodudealola').learnset.electroball = ["9M"];
		this.species.getLearnsetData('geodudealola').learnset.flash = ["9M"];
		this.species.getLearnsetData('geodudealola').learnset.incinerate = ["9M"];
		this.species.getLearnsetData('geodudealola').learnset.powergem = ["9M"];
		this.species.getLearnsetData('geodudealola').learnset.shockwave = ["9M"];
		this.species.getLearnsetData('geodudealola').learnset.rapidspin = ["9E"];
		delete this.species.getLearnsetData('geodudealola').learnset.brutalswing;
		delete this.species.getLearnsetData('geodudealola').learnset.fireblast;
		delete this.species.getLearnsetData('geodudealola').learnset.flamethrower;
		// Graveler
		this.species.getLearnsetData('graveler').learnset.camouflage = ["9D"];
		delete this.species.getLearnsetData('graveler').learnset.fireblast;
		delete this.species.getLearnsetData('graveler').learnset.flamethrower;
		// Graveler Alola
		this.species.getLearnsetData('graveleralola').learnset.electrify = ["9D"];
		this.species.getLearnsetData('graveleralola').learnset.electroball = ["9M"];
		this.species.getLearnsetData('graveleralola').learnset.flash = ["9M"];
		this.species.getLearnsetData('graveleralola').learnset.incinerate = ["9M"];
		this.species.getLearnsetData('graveleralola').learnset.powergem = ["9M"];
		delete this.species.getLearnsetData('graveleralola').learnset.brutalswing;
		delete this.species.getLearnsetData('graveleralola').learnset.fireblast;
		delete this.species.getLearnsetData('graveleralola').learnset.flamethrower;
		// Golem
		this.species.getLearnsetData('golem').learnset.shelter = ["9D"];
		delete this.species.getLearnsetData('golem').learnset.fireblast;
		delete this.species.getLearnsetData('golem').learnset.flamethrower;
		// Golem Alola
		this.species.getLearnsetData('golemalola').learnset.rockwrecker = ["9D"];
		this.species.getLearnsetData('golemalola').learnset.electroball = ["9M"];
		this.species.getLearnsetData('golemalola').learnset.flash = ["9M"];
		this.species.getLearnsetData('golemalola').learnset.incinerate = ["9M"];
		this.species.getLearnsetData('golemalola').learnset.powergem = ["9M"];
		delete this.species.getLearnsetData('golemalola').learnset.brutalswing;
		delete this.species.getLearnsetData('golemalola').learnset.fireblast;
		delete this.species.getLearnsetData('golemalola').learnset.flamethrower;
		// Ponyta
		this.species.getLearnsetData('ponyta').learnset.hornleech = ["9D"];
		this.species.getLearnsetData('ponyta').learnset.flash = ["9M"];
		this.species.getLearnsetData('ponyta').learnset.trailhead = ["9M"];
		delete this.species.getLearnsetData('ponyta').learnset.allyswitch;
		// Ponyta Galar
		this.species.getLearnsetData('ponytagalar').learnset.hornleech = ["9D"];
		this.species.getLearnsetData('ponytagalar').learnset.aquatail = ["9M"];
		this.species.getLearnsetData('ponytagalar').learnset.dreameater = ["9M"];
		this.species.getLearnsetData('ponytagalar').learnset.echoedvoice = ["9M"];
		this.species.getLearnsetData('ponytagalar').learnset.healbell = ["9M"];
		this.species.getLearnsetData('ponytagalar').learnset.magiccoat = ["9M"];
		this.species.getLearnsetData('ponytagalar').learnset.naturalgift = ["9M"];
		this.species.getLearnsetData('ponytagalar').learnset.psychup = ["9M"];
		this.species.getLearnsetData('ponytagalar').learnset.roleplay = ["9M"];
		this.species.getLearnsetData('ponytagalar').learnset.telekinesis = ["9M"];
		this.species.getLearnsetData('ponytagalar').learnset.trailhead = ["9M"];
		// Rapidash
		this.species.getLearnsetData('rapidash').learnset.hornleech = ["9D"];
		this.species.getLearnsetData('rapidash').learnset.flash = ["9M"];
		this.species.getLearnsetData('rapidash').learnset.trailhead = ["9M"];
		delete this.species.getLearnsetData('rapidash').learnset.allyswitch;
		// Rapidash Galar
		this.species.getLearnsetData('rapidashgalar').learnset.hornleech = ["9D"];
		this.species.getLearnsetData('rapidashgalar').learnset.aquatail = ["9M"];
		this.species.getLearnsetData('rapidashgalar').learnset.dreameater = ["9M"];
		this.species.getLearnsetData('rapidashgalar').learnset.echoedvoice = ["9M"];
		this.species.getLearnsetData('rapidashgalar').learnset.healbell = ["9M"];
		this.species.getLearnsetData('rapidashgalar').learnset.magiccoat = ["9M"];
		this.species.getLearnsetData('rapidashgalar').learnset.naturalgift = ["9M"];
		this.species.getLearnsetData('rapidashgalar').learnset.psychup = ["9M"];
		this.species.getLearnsetData('rapidashgalar').learnset.roleplay = ["9M"];
		this.species.getLearnsetData('rapidashgalar').learnset.telekinesis = ["9M"];
		this.species.getLearnsetData('rapidashgalar').learnset.trailhead = ["9M"];
		// Slowpoke
		this.species.getLearnsetData('slowpoke').learnset.autotomize = ["9D"];
		this.species.getLearnsetData('slowpoke').learnset.stasis = ["9T"];
		delete this.species.getLearnsetData('slowpoke').learnset.blizzard;
		delete this.species.getLearnsetData('slowpoke').learnset.earthquake;
		delete this.species.getLearnsetData('slowpoke').learnset.fireblast;
		delete this.species.getLearnsetData('slowpoke').learnset.flamethrower;
		delete this.species.getLearnsetData('slowpoke').learnset.flash;
		delete this.species.getLearnsetData('slowpoke').learnset.nightmare;
		// Slowpoke Galar
		this.species.getLearnsetData('slowpokegalar').learnset.autotomize = ["9D"];
		this.species.getLearnsetData('slowpokegalar').learnset.afteryou = ["9M"];
		this.species.getLearnsetData('slowpokegalar').learnset.block = ["9M"];
		this.species.getLearnsetData('slowpokegalar').learnset.incinerate = ["9M"];
		this.species.getLearnsetData('slowpokegalar').learnset.psychup = ["9M"];
		this.species.getLearnsetData('slowpokegalar').learnset.stasis = ["9T"];
		delete this.species.getLearnsetData('slowpokegalar').learnset.blizzard;
		delete this.species.getLearnsetData('slowpokegalar').learnset.earthquake;
		delete this.species.getLearnsetData('slowpokegalar').learnset.fireblast;
		delete this.species.getLearnsetData('slowpokegalar').learnset.flamethrower;
		// Slowbro
		this.species.getLearnsetData('slowbro').learnset.razorshell = ["9D"];
		this.species.getLearnsetData('slowbro').learnset.stasis = ["9T"];
		delete this.species.getLearnsetData('slowbro').learnset.blizzard;
		delete this.species.getLearnsetData('slowbro').learnset.earthquake;
		delete this.species.getLearnsetData('slowbro').learnset.fireblast;
		delete this.species.getLearnsetData('slowbro').learnset.flash;
		delete this.species.getLearnsetData('slowbro').learnset.metronome;
		delete this.species.getLearnsetData('slowbro').learnset.nightmare;
		// Slowbro Galar
		this.species.getLearnsetData('slowbrogalar').learnset.snipeshot = ["9D"];
		this.species.getLearnsetData('slowbrogalar').learnset.afteryou = ["9M"];
		this.species.getLearnsetData('slowbrogalar').learnset.block = ["9M"];
		this.species.getLearnsetData('slowbrogalar').learnset.incinerate = ["9M"];
		this.species.getLearnsetData('slowbrogalar').learnset.psychup = ["9M"];
		this.species.getLearnsetData('slowbrogalar').learnset.toxic = ["9M"];
		this.species.getLearnsetData('slowbrogalar').learnset.stasis = ["9T"];
		delete this.species.getLearnsetData('slowbrogalar').learnset.blizzard;
		delete this.species.getLearnsetData('slowbrogalar').learnset.earthquake;
		delete this.species.getLearnsetData('slowbrogalar').learnset.fireblast;
		delete this.species.getLearnsetData('slowbrogalar').learnset.metronome;
		// Magnemite
		this.species.getLearnsetData('magnemite').learnset.electrify = ["9D"];
		this.species.getLearnsetData('magnemite').learnset.eerieimpulse = ["9M"];
		this.species.getLearnsetData('magnemite').learnset.flash = ["9M"];
		// Magneton
		this.species.getLearnsetData('magneton').learnset.electrify = ["9D"];
		this.species.getLearnsetData('magneton').learnset.eerieimpulse = ["9M"];
		this.species.getLearnsetData('magneton').learnset.flash = ["9M"];
		// Farfetchd
		this.species.getLearnsetData('farfetchd').learnset.sacredsword = ["9D"];
		this.species.getLearnsetData('farfetchd').learnset.leer = ["9L1"];
		this.species.getLearnsetData('farfetchd').learnset.furycutter = ["9L5"];
		this.species.getLearnsetData('farfetchd').learnset.falseswipe = ["9L10", "9M"];
		this.species.getLearnsetData('farfetchd').learnset.aerialace = ["9L15", "9M"];
		this.species.getLearnsetData('farfetchd').learnset.swing = ["9L20"];
		this.species.getLearnsetData('farfetchd').learnset.feint = ["9L30"];
		this.species.getLearnsetData('farfetchd').learnset.cut = ["9L35"];
		this.species.getLearnsetData('farfetchd').learnset.retaliate = ["9L55", "9M"];
		this.species.getLearnsetData('farfetchd').learnset.leafblade = ["9E"];
		this.species.getLearnsetData('farfetchd').learnset.punishment = ["9E"];
		// Farfetchd Galar
		this.species.getLearnsetData('farfetchdgalar').learnset.woodhammer = ["9D"];
		this.species.getLearnsetData('farfetchdgalar').learnset.leer = ["9L1"];
		this.species.getLearnsetData('farfetchdgalar').learnset.furycutter = ["9L5"];
		this.species.getLearnsetData('farfetchdgalar').learnset.rocksmash = ["9L10", "9M"];
		this.species.getLearnsetData('farfetchdgalar').learnset.brutalswing = ["9L15", "9M"];
		this.species.getLearnsetData('farfetchdgalar').learnset.swing = ["9L20"];
		this.species.getLearnsetData('farfetchdgalar').learnset.echoedvoice = ["9M"];
		this.species.getLearnsetData('farfetchdgalar').learnset.lastresort = ["9M"];
		this.species.getLearnsetData('farfetchdgalar').learnset.punishment = ["9E"];
		this.species.getLearnsetData('farfetchdgalar').learnset.solarblade = ["9E"];
		this.species.getLearnsetData('farfetchdgalar').learnset.strength = ["9M"];
		// Doduo
		this.species.getLearnsetData('doduo').learnset.eggbomb = ["9D"];
		this.species.getLearnsetData('doduo').learnset.screech = ["9M"];
		this.species.getLearnsetData('doduo').learnset.trailhead = ["9M"];
		delete this.species.getLearnsetData('doduo').learnset.knockoff;
		// Dodrio
		this.species.getLearnsetData('dodrio').learnset.eggbomb = ["9D"];
		this.species.getLearnsetData('dodrio').learnset.screech = ["9M"];
		this.species.getLearnsetData('dodrio').learnset.trailhead = ["9M"];
		delete this.species.getLearnsetData('dodrio').learnset.knockoff;
		// Seel
		this.species.getLearnsetData('seel').learnset.slackoff = ["9D"];
		this.species.getLearnsetData('seel').learnset.amnesia = ["9M"];
		this.species.getLearnsetData('seel').learnset.charm = ["9M"];
		this.species.getLearnsetData('seel').learnset.chillywater = ["9M"];
		// Dewgong
		this.species.getLearnsetData('dewgong').learnset.slackoff = ["9D"];
		this.species.getLearnsetData('dewgong').learnset.watersport = ["9L7"];
		this.species.getLearnsetData('dewgong').learnset.amnesia = ["9M"];
		this.species.getLearnsetData('dewgong').learnset.charm = ["9M"];
		this.species.getLearnsetData('dewgong').learnset.chillywater = ["9M"];
		// Grimer
		this.species.getLearnsetData('grimer').learnset.slipaway = ["9D"];
		this.species.getLearnsetData('grimer').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('grimer').learnset.toxic = ["9M"];
		delete this.species.getLearnsetData('grimer').learnset.fireblast;
		delete this.species.getLearnsetData('grimer').learnset.flamethrower;
		delete this.species.getLearnsetData('grimer').learnset.thunder;
		delete this.species.getLearnsetData('grimer').learnset.thunderbolt;
		// Grimer Alola
		this.species.getLearnsetData('grimeralola').learnset.purify = ["9D"];
		this.species.getLearnsetData('grimeralola').learnset.powergem = ["9M"];
		this.species.getLearnsetData('grimeralola').learnset.toxic = ["9M"];
		delete this.species.getLearnsetData('grimeralola').learnset.brutalswing;
		delete this.species.getLearnsetData('grimeralola').learnset.fireblast;
		delete this.species.getLearnsetData('grimeralola').learnset.flamethrower;
		delete this.species.getLearnsetData('grimeralola').learnset.thunder;
		delete this.species.getLearnsetData('grimeralola').learnset.thunderbolt;
		// Muk
		this.species.getLearnsetData('muk').learnset.slipaway = ["9D"];
		this.species.getLearnsetData('muk').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('muk').learnset.toxic = ["9M"];
		delete this.species.getLearnsetData('muk').learnset.fireblast;
		delete this.species.getLearnsetData('muk').learnset.thunder;
		// Muk Alola
		this.species.getLearnsetData('mukalola').learnset.purify = ["9D"];
		this.species.getLearnsetData('mukalola').learnset.powergem = ["9M"];
		this.species.getLearnsetData('mukalola').learnset.toxic = ["9M"];
		delete this.species.getLearnsetData('mukalola').learnset.fireblast;
		delete this.species.getLearnsetData('mukalola').learnset.thunder;
		// Shellder
		this.species.getLearnsetData('shellder').learnset.sharpen = ["9D"];
		this.species.getLearnsetData('shellder').learnset.shelter = ["9L61"];
		this.species.getLearnsetData('shellder').learnset.hydropump = ["9M"];
		this.species.getLearnsetData('shellder').learnset.liquidation = ["9E"];
		// Cloyster
		this.species.getLearnsetData('cloyster').learnset.sharpen = ["9D"];
		this.species.getLearnsetData('cloyster').learnset.hydropump = ["9M"];
		// Gastly
		this.species.getLearnsetData('gastly').learnset.poisonfang = ["9D"];
		this.species.getLearnsetData('gastly').learnset.smog = ["9L1"];
		this.species.getLearnsetData('gastly').learnset.poisongas = ["9L12"];
		this.species.getLearnsetData('gastly').learnset.curse = ["9L15"];
		this.species.getLearnsetData('gastly').learnset.nightshade = ["9L19"];
		this.species.getLearnsetData('gastly').learnset.confuseray = ["9L22"];
		this.species.getLearnsetData('gastly').learnset.suckerpunch = ["9L26"];
		this.species.getLearnsetData('gastly').learnset.terrify = ["9L29"];
		this.species.getLearnsetData('gastly').learnset.shadowball = ["9L33","9M"];
		this.species.getLearnsetData('gastly').learnset.dreameater = ["9L36","9M"];
		this.species.getLearnsetData('gastly').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('gastly').learnset.icebeam = ["9M"];
		this.species.getLearnsetData('gastly').learnset.payback = ["9M"];
		this.species.getLearnsetData('gastly').learnset.shockwave = ["9M"];
		this.species.getLearnsetData('gastly').learnset.toxic = ["9M"];
		delete this.species.getLearnsetData('gastly').learnset.firepunch;
		delete this.species.getLearnsetData('gastly').learnset.icepunch;
		delete this.species.getLearnsetData('gastly').learnset.knockoff;
		delete this.species.getLearnsetData('gastly').learnset.thunder;
		delete this.species.getLearnsetData('gastly').learnset.thunderbolt;
		delete this.species.getLearnsetData('gastly').learnset.thunderpunch;
		// Haunter
		this.species.getLearnsetData('haunter').learnset.poisonfang = ["9D"];
		this.species.getLearnsetData('haunter').learnset.smog = ["9L1"];
		this.species.getLearnsetData('haunter').learnset.poisongas = ["9L12"];
		this.species.getLearnsetData('haunter').learnset.curse = ["9L15"];
		this.species.getLearnsetData('haunter').learnset.nightshade = ["9L19"];
		this.species.getLearnsetData('haunter').learnset.confuseray = ["9L22"];
		this.species.getLearnsetData('haunter').learnset.suckerpunch = ["9L28"];
		this.species.getLearnsetData('haunter').learnset.terrify = ["9L33"];
		this.species.getLearnsetData('haunter').learnset.shadowball = ["9L39","9M"];
		this.species.getLearnsetData('haunter').learnset.dreameater = ["9L44","9M"];
		this.species.getLearnsetData('haunter').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('haunter').learnset.icebeam = ["9M"];
		this.species.getLearnsetData('haunter').learnset.payback = ["9M"];
		this.species.getLearnsetData('haunter').learnset.toxic = ["9M"];
		delete this.species.getLearnsetData('haunter').learnset.thunder;
		delete this.species.getLearnsetData('haunter').learnset.thunderbolt;
		// Gengar
		this.species.getLearnsetData('gengar').learnset.poisonfang = ["9D"];
		this.species.getLearnsetData('gengar').learnset.smog = ["9L1"];
		this.species.getLearnsetData('gengar').learnset.poisongas = ["9L12"];
		this.species.getLearnsetData('gengar').learnset.curse = ["9L15"];
		this.species.getLearnsetData('gengar').learnset.nightshade = ["9L19"];
		this.species.getLearnsetData('gengar').learnset.confuseray = ["9L22"];
		this.species.getLearnsetData('gengar').learnset.suckerpunch = ["9L28"];
		this.species.getLearnsetData('gengar').learnset.terrify = ["9L33"];
		this.species.getLearnsetData('gengar').learnset.shadowball = ["9L39","9M"];
		this.species.getLearnsetData('gengar').learnset.dreameater = ["9L44","9M"];
		this.species.getLearnsetData('gengar').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('gengar').learnset.icebeam = ["9M"];
		this.species.getLearnsetData('gengar').learnset.payback = ["9M"];
		this.species.getLearnsetData('gengar').learnset.toxic = ["9M"];
		delete this.species.getLearnsetData('gengar').learnset.thunder;
		// Onix
		this.species.getLearnsetData('onix').learnset.sharpen = ["9D"];
		this.species.getLearnsetData('onix').learnset.tussle = ["9L20"];
		this.species.getLearnsetData('onix').learnset.escapetunnel = ["9L52"];
		this.species.getLearnsetData('onix').learnset.gigaimpact = ["9M"];
		this.species.getLearnsetData('onix').learnset.gyroball = ["9M"];
		this.species.getLearnsetData('onix').learnset.sandstorm = ["9M"];
		this.species.getLearnsetData('onix').learnset.trailhead = ["9M"];
		delete this.species.getLearnsetData('onix').learnset.meteorbeam;
		// Drowzee
		this.species.getLearnsetData('drowzee').learnset.meanlook = ["9D"];
		this.species.getLearnsetData('drowzee').learnset.mindbend = ["9L9"];
		this.species.getLearnsetData('drowzee').learnset.confusion = ["9L13"];
		this.species.getLearnsetData('drowzee').learnset.headbutt = ["9L29"];
		this.species.getLearnsetData('drowzee').learnset.amnesia = ["9M"];
		delete this.species.getLearnsetData('drowzee').learnset.wakeupslap;
		// Hypno
		this.species.getLearnsetData('hypno').learnset.darkvoid = ["9D"];
		this.species.getLearnsetData('hypno').learnset.mindbend = ["9L9"];
		this.species.getLearnsetData('hypno').learnset.confusion = ["9L13"];
		this.species.getLearnsetData('hypno').learnset.headbutt = ["9L29"];
		this.species.getLearnsetData('hypno').learnset.amnesia = ["9M"];
		this.species.getLearnsetData('hypno').learnset.flash = ["9M"];
		delete this.species.getLearnsetData('hypno').learnset.wakeupslap;
		// Krabby
		this.species.getLearnsetData('krabby').learnset.clamp = ["9D"];
		this.species.getLearnsetData('krabby').learnset.brine = ["9L25", "9M"];
		this.species.getLearnsetData('krabby').learnset.razorshell = ["9L31"];
		this.species.getLearnsetData('krabby').learnset.guillotine = ["9L39"];
		this.species.getLearnsetData('krabby').learnset.chillywater = ["9M"];
		delete this.species.getLearnsetData('krabby').learnset.allyswitch;
		delete this.species.getLearnsetData('krabby').learnset.stomp;
		// Kingler
		this.species.getLearnsetData('kingler').learnset.clamp = ["9D"];
		this.species.getLearnsetData('kingler').learnset.brine = ["9L25", "9M"];
		this.species.getLearnsetData('kingler').learnset.razorshell = ["9L37"];
		this.species.getLearnsetData('kingler').learnset.guillotine = ["9L51"];
		this.species.getLearnsetData('kingler').learnset.chillywater = ["9M"];
		delete this.species.getLearnsetData('kingler').learnset.allyswitch;
		delete this.species.getLearnsetData('kingler').learnset.stomp;
		// Voltorb
		this.species.getLearnsetData('voltorb').learnset.overdrive = ["9D"];
		this.species.getLearnsetData('voltorb').learnset.rapidspin = ["9L29"];
		this.species.getLearnsetData('voltorb').learnset.lightscreen = ["9L34"];
		this.species.getLearnsetData('voltorb').learnset.magnetrise = ["9L37"];
		this.species.getLearnsetData('voltorb').learnset.discharge = ["9L41"];
		this.species.getLearnsetData('voltorb').learnset.explosion = ["9L46"];
		this.species.getLearnsetData('voltorb').learnset.electricterrain = ["9M"];
		this.species.getLearnsetData('voltorb').learnset.flash = ["9M"];
		this.species.getLearnsetData('voltorb').learnset.gyroball = ["9M"];
		// Voltorb Hisui
		this.species.getLearnsetData('voltorbhisui').learnset.grasswhistle = ["9D"];
		this.species.getLearnsetData('voltorbhisui').learnset.rapidspin = ["9L29"];
		this.species.getLearnsetData('voltorbhisui').learnset.seedbomb = ["9L34", "9M"];
		this.species.getLearnsetData('voltorbhisui').learnset.magnetrise = ["9L37"];
		this.species.getLearnsetData('voltorbhisui').learnset.discharge = ["9L41"];
		this.species.getLearnsetData('voltorbhisui').learnset.explosion = ["9L46"];
		this.species.getLearnsetData('voltorbhisui').learnset.electricterrain = ["9M"];
		this.species.getLearnsetData('voltorbhisui').learnset.flash = ["9M"];
		this.species.getLearnsetData('voltorbhisui').learnset.gyroball = ["9M"];
		// Electrode
		this.species.getLearnsetData('electrode').learnset.overdrive = ["9D"];
		this.species.getLearnsetData('electrode').learnset.rapidspin = ["9L29"];
		this.species.getLearnsetData('electrode').learnset.lightscreen = ["9L36","9M"];
		this.species.getLearnsetData('electrode').learnset.magnetrise = ["9L41","9M"];
		this.species.getLearnsetData('electrode').learnset.discharge = ["9L47","9M"];
		this.species.getLearnsetData('electrode').learnset.explosion = ["9L54","9M"];
		this.species.getLearnsetData('electrode').learnset.electricterrain = ["9M"];
		this.species.getLearnsetData('electrode').learnset.flash = ["9M"];
		this.species.getLearnsetData('electrode').learnset.gyroball = ["9M"];
		// Electrode Hisui
		this.species.getLearnsetData('electrodehisui').learnset.grasswhistle = ["9D"];
		this.species.getLearnsetData('electrodehisui').learnset.grassyterrain = ["9L1", "9M"];
		// Exeggcute
		this.species.getLearnsetData('exeggcute').learnset.softboiled = ["9D"];
		// Exeggutor
		this.species.getLearnsetData('exeggutor').learnset.tropkick = ["9D"];
		this.species.getLearnsetData('exeggutor').learnset.bodypress = ["9M"];
		this.species.getLearnsetData('exeggutor').learnset.trailhead = ["9M"];
		// Exeggutor Tropical
		this.species.getLearnsetData('exeggutoralola').learnset.tropkick = ["9D"];
		this.species.getLearnsetData('exeggutoralola').learnset.bodypress = ["9M"];
		this.species.getLearnsetData('exeggutoralola').learnset.trailhead = ["9M"];
		// Cubone
		this.species.getLearnsetData('cubone').learnset.memento = ["9D"];
		this.species.getLearnsetData('cubone').learnset.rage = ["9L1"];
		this.species.getLearnsetData('cubone').learnset.leer = ["9L3"];
		this.species.getLearnsetData('cubone').learnset.falseswipe = ["9L7"];
		this.species.getLearnsetData('cubone').learnset.tussle = ["9L11"];
		this.species.getLearnsetData('cubone').learnset.swing = ["9L13"];
		this.species.getLearnsetData('cubone').learnset.boneclub = ["9L21"];
		this.species.getLearnsetData('cubone').learnset.headbutt = ["9L23"];
		this.species.getLearnsetData('cubone').learnset.bonemerang = ["9L27"];
		this.species.getLearnsetData('cubone').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('cubone').learnset.trailhead = ["9M"];
		delete this.species.getLearnsetData('cubone').learnset.blizzard;
		delete this.species.getLearnsetData('cubone').learnset.fireblast;
		delete this.species.getLearnsetData('cubone').learnset.flamethrower;
		delete this.species.getLearnsetData('cubone').learnset.icebeam;
		delete this.species.getLearnsetData('cubone').learnset.tailwhip;
		// Marowak
		this.species.getLearnsetData('marowak').learnset.memento = ["9D"];
		this.species.getLearnsetData('marowak').learnset.rage = ["9L1"];
		this.species.getLearnsetData('marowak').learnset.leer = ["9L3"];
		this.species.getLearnsetData('marowak').learnset.falseswipe = ["9L7", "9M"];
		this.species.getLearnsetData('marowak').learnset.tussle = ["9L11"];
		this.species.getLearnsetData('marowak').learnset.swing = ["9L13"];
		this.species.getLearnsetData('marowak').learnset.boneclub = ["9L21"];
		this.species.getLearnsetData('marowak').learnset.headbutt = ["9L23"];
		this.species.getLearnsetData('marowak').learnset.bonemerang = ["9L27"];
		this.species.getLearnsetData('marowak').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('marowak').learnset.trailhead = ["9M"];
		delete this.species.getLearnsetData('marowak').learnset.blizzard;
		delete this.species.getLearnsetData('marowak').learnset.fireblast;
		delete this.species.getLearnsetData('marowak').learnset.tailwhip;
		// Marowak Tropical
		this.species.getLearnsetData('marowakalola').learnset.fierydance = ["9D"];
		this.species.getLearnsetData('marowakalola').learnset.firespin = ["9L1"];
		this.species.getLearnsetData('marowakalola').learnset.leer = ["9L3"];
		this.species.getLearnsetData('marowakalola').learnset.hex = ["9L7", "9M"];
		this.species.getLearnsetData('marowakalola').learnset.swing = ["9L13"];
		this.species.getLearnsetData('marowakalola').learnset.boneclub = ["9L21"];
		this.species.getLearnsetData('marowakalola').learnset.lastrespects = ["9L23"];
		this.species.getLearnsetData('marowakalola').learnset.bonemerang = ["9L27"];
		this.species.getLearnsetData('marowakalola').learnset.shadowbone = ["9L43"];
		this.species.getLearnsetData('marowakalola').learnset.flash = ["9M"];
		delete this.species.getLearnsetData('marowakalola').learnset.blizzard;
		delete this.species.getLearnsetData('marowakalola').learnset.tailwhip;
		delete this.species.getLearnsetData('marowakalola').learnset.thunder;
		// Hitmonlee
		this.species.getLearnsetData('hitmonlee').learnset.tropkick = ["9D"];
		this.species.getLearnsetData('hitmonlee').learnset.meditate = ["9L8"];
		this.species.getLearnsetData('hitmonlee').learnset.lowkick = ["9L12"];
		this.species.getLearnsetData('hitmonlee').learnset.endure = ["9L16","9M"];
		this.species.getLearnsetData('hitmonlee').learnset.revenge = ["9L21"];
		this.species.getLearnsetData('hitmonlee').learnset.jumpkick = ["9L24"];
		this.species.getLearnsetData('hitmonlee').learnset.wideguard = ["9L28"];
		this.species.getLearnsetData('hitmonlee').learnset.blazekick = ["9L32"];
		this.species.getLearnsetData('hitmonlee').learnset.mindreader = ["9L36"];
		this.species.getLearnsetData('hitmonlee').learnset.megakick = ["9L40"];
		this.species.getLearnsetData('hitmonlee').learnset.closecombat = ["9L44"];
		this.species.getLearnsetData('hitmonlee').learnset.reversal = ["9L48"];
		this.species.getLearnsetData('hitmonlee').learnset.highjumpkick = ["9L52"];
		this.species.getLearnsetData('hitmonlee').learnset.chipaway = ["9M"];
		// Hitmonchan
		this.species.getLearnsetData('hitmonchan').learnset.dynamicpunch = ["9D"];
		this.species.getLearnsetData('hitmonchan').learnset.cometpunch = ["9L8"];
		this.species.getLearnsetData('hitmonchan').learnset.poweruppunch = ["9L12"];
		this.species.getLearnsetData('hitmonchan').learnset.detect = ["9L16"];
		this.species.getLearnsetData('hitmonchan').learnset.revenge = ["9L21"];
		this.species.getLearnsetData('hitmonchan').learnset.skyuppercut = ["9L24"];
		this.species.getLearnsetData('hitmonchan').learnset.quickguard = ["9L28"];
		this.species.getLearnsetData('hitmonchan').learnset.firepunch = ["9L32","9M"];
		this.species.getLearnsetData('hitmonchan').learnset.icepunch = ["9L32","9M"];
		this.species.getLearnsetData('hitmonchan').learnset.thunderpunch = ["9L32","9M"];
		this.species.getLearnsetData('hitmonchan').learnset.agility = ["9L36"];
		this.species.getLearnsetData('hitmonchan').learnset.megapunch = ["9L40"];
		this.species.getLearnsetData('hitmonchan').learnset.closecombat = ["9L44"];
		this.species.getLearnsetData('hitmonchan').learnset.counter = ["9L48"];
		this.species.getLearnsetData('hitmonchan').learnset.focuspunch = ["9L52"];
		this.species.getLearnsetData('hitmonchan').learnset.chipaway = ["9M"];
		// Lickitung
		this.species.getLearnsetData('lickitung').learnset.soak = ["9D"];
		this.species.getLearnsetData('lickitung').learnset.bind = ["9L17"];
		this.species.getLearnsetData('lickitung').learnset.toxic = ["9M"];
		delete this.species.getLearnsetData('lickitung').learnset.earthquake;
		delete this.species.getLearnsetData('lickitung').learnset.wrap;
		// Koffing
		this.species.getLearnsetData('koffing').learnset.rebound = ["9D"];
		this.species.getLearnsetData('koffing').learnset.toxic = ["9L29", "9M"];
		delete this.species.getLearnsetData('koffing').learnset.gyroball;
		// Weezing
		this.species.getLearnsetData('weezing').learnset.rebound = ["9D"];
		this.species.getLearnsetData('weezing').learnset.toxic = ["9L29", "9M"];
		delete this.species.getLearnsetData('weezing').learnset.gyroball;
		// Weezing Galar
		this.species.getLearnsetData('weezinggalar').learnset.purify = ["9D"];
		this.species.getLearnsetData('weezinggalar').learnset.toxic = ["9L29", "9M"];
		delete this.species.getLearnsetData('weezinggalar').learnset.gyroball;
		// Rhyhorn
		this.species.getLearnsetData('rhyhorn').learnset.headsmash = ["9D"];
		this.species.getLearnsetData('rhyhorn').learnset.scaryface = ["9L1"];
		this.species.getLearnsetData('rhyhorn').learnset.stomp = ["9L9"];
		this.species.getLearnsetData('rhyhorn').learnset.tussle = ["9L17"];
		this.species.getLearnsetData('rhyhorn').learnset.fullcollide = ["9M"];
		this.species.getLearnsetData('rhyhorn').learnset.trailhead = ["9M"];
		this.species.getLearnsetData('rhyhorn').learnset.doubleedge = ["9E"];
		delete this.species.getLearnsetData('rhyhorn').learnset.flamethrower;
		delete this.species.getLearnsetData('rhyhorn').learnset.icebeam;
		delete this.species.getLearnsetData('rhyhorn').learnset.thunderbolt;
		// Rhydon
		this.species.getLearnsetData('rhydon').learnset.headsmash = ["9D"];
		this.species.getLearnsetData('rhydon').learnset.scaryface = ["9L1"];
		this.species.getLearnsetData('rhydon').learnset.stomp = ["9L9"];
		this.species.getLearnsetData('rhydon').learnset.tussle = ["9L17"];
		this.species.getLearnsetData('rhydon').learnset.fullcollide = ["9M"];
		this.species.getLearnsetData('rhydon').learnset.trailhead = ["9M"];
		delete this.species.getLearnsetData('rhydon').learnset.meteorbeam;
		// Chansey
		this.species.getLearnsetData('chansey').learnset.happyhour = ["9D"];
		delete this.species.getLearnsetData('chansey').learnset.blizzard;
		delete this.species.getLearnsetData('chansey').learnset.earthquake;
		delete this.species.getLearnsetData('chansey').learnset.fireblast;
		delete this.species.getLearnsetData('chansey').learnset.tantrum;
		delete this.species.getLearnsetData('chansey').learnset.thunder;
		delete this.species.getLearnsetData('chansey').learnset.trailhead;
		// Tangela
		this.species.getLearnsetData('tangela').learnset.morningsun = ["9D"];
		this.species.getLearnsetData('tangela').learnset.wrap = ["9L17"];
		this.species.getLearnsetData('tangela').learnset.trailhead = ["9M"];
		delete this.species.getLearnsetData('tangela').learnset.bind;
		// Kangaskhan
		this.species.getLearnsetData('kangaskhan').learnset.wish = ["9D"];
		this.species.getLearnsetData('kangaskhan').learnset.rage = ["9L1"];
		this.species.getLearnsetData('kangaskhan').learnset.cometpunch = ["9L13"];
		this.species.getLearnsetData('kangaskhan').learnset.stomp = ["9L19"];
		this.species.getLearnsetData('kangaskhan').learnset.chipaway = ["9L22", "9M"];
		this.species.getLearnsetData('kangaskhan').learnset.dizzypunch = ["9L25"];
		this.species.getLearnsetData('kangaskhan').learnset.doublehit = ["9L31"];
		this.species.getLearnsetData('kangaskhan').learnset.megapunch = ["9L34"];
		this.species.getLearnsetData('kangaskhan').learnset.suckerpunch = ["9L37"];
		this.species.getLearnsetData('kangaskhan').learnset.megakick = ["9L49"];
		this.species.getLearnsetData('kangaskhan').learnset.bodypress = ["9M"];
		this.species.getLearnsetData('kangaskhan').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('kangaskhan').learnset.faketears = ["9M"];
		this.species.getLearnsetData('kangaskhan').learnset.trailhead = ["9M"];
		delete this.species.getLearnsetData('kangaskhan').learnset.bite;
		delete this.species.getLearnsetData('kangaskhan').learnset.crunch;
		// Horsea
		this.species.getLearnsetData('horsea').learnset.poisongas = ["9D"];
		this.species.getLearnsetData('horsea').learnset.toxic = ["9M"];
		delete this.species.getLearnsetData('horsea').learnset.blizzard;
		// Seadra
		this.species.getLearnsetData('seadra').learnset.poisongas = ["9D"];
		this.species.getLearnsetData('seadra').learnset.toxic = ["9M"];
		delete this.species.getLearnsetData('seadra').learnset.blizzard;
		// Goldeen
		this.species.getLearnsetData('goldeen').learnset.captivate = ["9D"];
		this.species.getLearnsetData('goldeen').learnset.chillywater = ["9M"];
		delete this.species.getLearnsetData('goldeen').learnset.blizzard;
		delete this.species.getLearnsetData('goldeen').learnset.knockoff;
		// Seaking
		this.species.getLearnsetData('seaking').learnset.captivate = ["9D"];
		this.species.getLearnsetData('seaking').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('seaking').learnset.wavecrash = ["9L54"];
		delete this.species.getLearnsetData('seaking').learnset.blizzard;
		delete this.species.getLearnsetData('seaking').learnset.knockoff;
		// Staryu
		this.species.getLearnsetData('staryu').learnset.aurorabeam = ["9D"];
		this.species.getLearnsetData('staryu').learnset.barrierbash = ["9L24"];
		this.species.getLearnsetData('staryu').learnset.flash = ["9M"];
		this.species.getLearnsetData('staryu').learnset.gyroball = ["9M"];
		this.species.getLearnsetData('staryu').learnset.shockwave = ["9M"];
		delete this.species.getLearnsetData('staryu').learnset.blizzard;
		delete this.species.getLearnsetData('staryu').learnset.thunder;
		delete this.species.getLearnsetData('staryu').learnset.thunderbolt;
		// Starmie
		this.species.getLearnsetData('starmie').learnset.prismaticlaser = ["9D"];
		this.species.getLearnsetData('starmie').learnset.flash = ["9M"];
		this.species.getLearnsetData('starmie').learnset.futuresight = ["9M"];
		this.species.getLearnsetData('starmie').learnset.gyroball = ["9M"];
		this.species.getLearnsetData('starmie').learnset.shockwave = ["9M"];
		delete this.species.getLearnsetData('starmie').learnset.avalanche;
		// Mr. Mime
		this.species.getLearnsetData('mrmime').learnset.followme = ["9D"];
		this.species.getLearnsetData('mrmime').learnset.barrier = ["9L0"];
		this.species.getLearnsetData('mrmime').learnset.flash = ["9M"];
		this.species.getLearnsetData('mrmime').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('mrmime').learnset.spotlight = ["9E"];
		this.species.getLearnsetData('mrmime').learnset.wakeupslap = ["9L40"];
		delete this.species.getLearnsetData('mrmime').learnset.suckerpunch;
		delete this.species.getLearnsetData('mrmime').learnset.thunder;
		// Mr. Mime Galar
		this.species.getLearnsetData('mrmimegalar').learnset.followme = ["9D"];
		this.species.getLearnsetData('mrmimegalar').learnset.icywind = ["9L0"];
		this.species.getLearnsetData('mrmimegalar').learnset.mimic = ["9L20"];
		this.species.getLearnsetData('mrmimegalar').learnset.wakeupslap = ["9L40"];
		this.species.getLearnsetData('mrmimegalar').learnset.afteryou = ["9M"];
		this.species.getLearnsetData('mrmimegalar').learnset.auroraveil = ["9M"];
		this.species.getLearnsetData('mrmimegalar').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('mrmimegalar').learnset.dazzlinggleam = ["9M"];
		this.species.getLearnsetData('mrmimegalar').learnset.dreameater = ["9M"];
		this.species.getLearnsetData('mrmimegalar').learnset.encore = ["9M"];
		this.species.getLearnsetData('mrmimegalar').learnset.frostbreath = ["9M"];
		this.species.getLearnsetData('mrmimegalar').learnset.flash = ["9M"];
		this.species.getLearnsetData('mrmimegalar').learnset.gravity = ["9M"];
		this.species.getLearnsetData('mrmimegalar').learnset.lightscreen = ["9M"];
		this.species.getLearnsetData('mrmimegalar').learnset.magiccoat = ["9M"];
		this.species.getLearnsetData('mrmimegalar').learnset.mistyterrain = ["9M"];
		this.species.getLearnsetData('mrmimegalar').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('mrmimegalar').learnset.protect = ["9M"];
		this.species.getLearnsetData('mrmimegalar').learnset.psychup = ["9M"];
		this.species.getLearnsetData('mrmimegalar').learnset.recycle = ["9M"];
		this.species.getLearnsetData('mrmimegalar').learnset.reflect = ["9M"];
		this.species.getLearnsetData('mrmimegalar').learnset.rocksmash = ["9M"];
		this.species.getLearnsetData('mrmimegalar').learnset.roleplay = ["9M"];
		this.species.getLearnsetData('mrmimegalar').learnset.safeguard = ["9M"];
		this.species.getLearnsetData('mrmimegalar').learnset.telekinesis = ["9M"];
		this.species.getLearnsetData('mrmimegalar').learnset.torment = ["9M"];
		this.species.getLearnsetData('mrmimegalar').learnset.spotlight = ["9E"];
		delete this.species.getLearnsetData('mrmimegalar').learnset.suckerpunch;
		// Scyther
		this.species.getLearnsetData('scyther').learnset.guillotine = ["9D"];
		this.species.getLearnsetData('scyther').learnset.pursuit = ["9L16"];
		this.species.getLearnsetData('scyther').learnset.cut = ["9L20"];
		this.species.getLearnsetData('scyther').learnset.doubleteam = ["9L44"];
		this.species.getLearnsetData('scyther').learnset.razorwind = ["9L52"];
		this.species.getLearnsetData('scyther').learnset.feint = ["9L56"];
		delete this.species.getLearnsetData('scyther').learnset.doublehit;
		delete this.species.getLearnsetData('scyther').learnset.knockoff;
		// Jynx
		this.species.getLearnsetData('jynx').learnset.teeterdance = ["9D"];
		this.species.getLearnsetData('jynx').learnset.amnesia = ["9M"];
		this.species.getLearnsetData('jynx').learnset.daydream = ["9L1"];
		this.species.getLearnsetData('jynx').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('jynx').learnset.flash = ["9M"];
		this.species.getLearnsetData('jynx').learnset.hex = ["9M"];
		this.species.getLearnsetData('jynx').learnset.nightmare = ["9M"];
		// Electabuzz
		this.species.getLearnsetData('electabuzz').learnset.zingzap = ["9D"];
		this.species.getLearnsetData('electabuzz').learnset.flash = ["9M"];
		// Magmar
		this.species.getLearnsetData('magmar').learnset.pelletshot = ["9D"];
		this.species.getLearnsetData('magmar').learnset.amnesia = ["9M"];
		this.species.getLearnsetData('magmar').learnset.flash = ["9M"];
		this.species.getLearnsetData('magmar').learnset.sludgebomb = ["9M"];
		// Pinsir
		this.species.getLearnsetData('pinsir').learnset.furycutter = ["9D"];
		this.species.getLearnsetData('pinsir').learnset.revenge = ["9L28"];
		this.species.getLearnsetData('pinsir').learnset.strength = ["9L32", "9M"];
		this.species.getLearnsetData('pinsir').learnset.xscissor = ["9L36", "9M"];
		this.species.getLearnsetData('pinsir').learnset.vitalthrow = ["9L40"];
		this.species.getLearnsetData('pinsir').learnset.swordsdance = ["9L44", "9M"];
		this.species.getLearnsetData('pinsir').learnset.submission = ["9L48"];
		this.species.getLearnsetData('pinsir').learnset.guillotine = ["9L52"];
		this.species.getLearnsetData('pinsir').learnset.superpower = ["9L56", "9M"];
		delete this.species.getLearnsetData('pinsir').learnset.knockoff;
		// Tauros
		this.species.getLearnsetData('tauros').learnset.megahorn = ["9D"];
		this.species.getLearnsetData('tauros').learnset.swagger = ["9L47"];
		this.species.getLearnsetData('tauros').learnset.thrash = ["9L53"];
		this.species.getLearnsetData('tauros').learnset.doubleedge = ["9L59"];
		this.species.getLearnsetData('tauros').learnset.highhorsepower = ["9L65"];
		this.species.getLearnsetData('tauros').learnset.chillywater = ["9M"];
		delete this.species.getLearnsetData('tauros').learnset.blizzard;
		delete this.species.getLearnsetData('tauros').learnset.fireblast;
		delete this.species.getLearnsetData('tauros').learnset.thunder;
		// Tauros Paldea Combat Breed
		this.species.getLearnsetData('taurospaldeacombat').learnset.megahorn = ["9D"];
		this.species.getLearnsetData('taurospaldeacombat').learnset.roleplay = ["9M"];
		// Tauros Paldea Blaze Breed
		this.species.getLearnsetData('taurospaldeablaze').learnset.megahorn = ["9D"];
		this.species.getLearnsetData('taurospaldeablaze').learnset.roleplay = ["9M"];
		// Tauros Paldea Aqua Breed
		this.species.getLearnsetData('taurospaldeaaqua').learnset.megahorn = ["9D"];
		this.species.getLearnsetData('taurospaldeaaqua').learnset.roleplay = ["9M"];
		// Gyarados
		this.species.getLearnsetData('gyarados').learnset.vengefulspirit = ["9D"];
		this.species.getLearnsetData('gyarados').learnset.rage = ["9L21"];
		delete this.species.getLearnsetData('gyarados').learnset.leer;
		// Lapras
		this.species.getLearnsetData('lapras').learnset.sparklingaria = ["9D"];
		this.species.getLearnsetData('lapras').learnset.chillywater = ["9M"];
		delete this.species.getLearnsetData('lapras').learnset.thunder;
		// Eevee
		this.species.getLearnsetData('eevee').learnset.mimic = ["9D"];
		// Vaporeon
		this.species.getLearnsetData('vaporeon').learnset.tailslap = ["9D"];
		delete this.species.getLearnsetData('vaporeon').learnset.blizzard;
		// Jolteon
		this.species.getLearnsetData('jolteon').learnset.zingzap = ["9D"];
		// Flareon
		this.species.getLearnsetData('flareon').learnset.rage = ["9D"];
		this.species.getLearnsetData('flareon').learnset.flash = ["9M"];
		this.species.getLearnsetData('flareon').learnset.preheat = ["9L33"];
		delete this.species.getLearnsetData('flareon').learnset.smog;
		// Porygon
		this.species.getLearnsetData('porygon').learnset.teleport = ["9D"];
		this.species.getLearnsetData('porygon').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('porygon').learnset.flash = ["9M"];
		this.species.getLearnsetData('porygon').learnset.powergem = ["9M"];
		// Omanyte
		this.species.getLearnsetData('omanyte').learnset.curse = ["9D"];
		this.species.getLearnsetData('omanyte').learnset.dustspray = ["9L16"];
		this.species.getLearnsetData('omanyte').learnset.tickle = ["9L19"];
		this.species.getLearnsetData('omanyte').learnset.shelter = ["9L43"];
		this.species.getLearnsetData('omanyte').learnset.chillywater = ["9M"];
		delete this.species.getLearnsetData('omanyte').learnset.blizzard;
		// Omastar
		this.species.getLearnsetData('omastar').learnset.curse = ["9D"];
		this.species.getLearnsetData('omastar').learnset.dustspray = ["9L16"];
		this.species.getLearnsetData('omastar').learnset.tickle = ["9L19"];
		this.species.getLearnsetData('omastar').learnset.shelter = ["9L48"];
		this.species.getLearnsetData('omastar').learnset.chillywater = ["9M"];
		delete this.species.getLearnsetData('omastar').learnset.blizzard;
		// Kabuto
		this.species.getLearnsetData('kabuto').learnset.rollout = ["9D"];
		this.species.getLearnsetData('kabuto').learnset.leechlife = ["9L1"];
		this.species.getLearnsetData('kabuto').learnset.harden = ["9L1"];
		this.species.getLearnsetData('kabuto').learnset.scratch = ["9L6"];
		this.species.getLearnsetData('kabuto').learnset.sandattack = ["9L11"];
		this.species.getLearnsetData('kabuto').learnset.aquajet = ["9L16"];
		this.species.getLearnsetData('kabuto').learnset.leer = ["9L21"];
		this.species.getLearnsetData('kabuto').learnset.mudshot = ["9L26"];
		this.species.getLearnsetData('kabuto').learnset.ancientpower = ["9L31"];
		this.species.getLearnsetData('kabuto').learnset.brine = ["9L36","9M"];
		this.species.getLearnsetData('kabuto').learnset.protect = ["9L41","9M"];
		this.species.getLearnsetData('kabuto').learnset.vitaldrain = ["9L46","9M"];
		this.species.getLearnsetData('kabuto').learnset.liquidation = ["9L51"];
		this.species.getLearnsetData('kabuto').learnset.metalsound = ["9L56"];
		this.species.getLearnsetData('kabuto').learnset.stoneedge = ["9M"];
		this.species.getLearnsetData('kabuto').learnset.chillywater = ["9M"];
		delete this.species.getLearnsetData('kabuto').learnset.absorb;
		delete this.species.getLearnsetData('kabuto').learnset.blizzard;
		delete this.species.getLearnsetData('kabuto').learnset.knockoff;
		// Kabutops
		this.species.getLearnsetData('kabutops').learnset.cut = ["9D"];
		this.species.getLearnsetData('kabutops').learnset.leechlife = ["9L1"];
		this.species.getLearnsetData('kabutops').learnset.harden = ["9L1"];
		this.species.getLearnsetData('kabutops').learnset.scratch = ["9L6"];
		this.species.getLearnsetData('kabutops').learnset.sandattack = ["9L11"];
		this.species.getLearnsetData('kabutops').learnset.aquajet = ["9L16"];
		this.species.getLearnsetData('kabutops').learnset.leer = ["9L21"];
		this.species.getLearnsetData('kabutops').learnset.mudshot = ["9L26"];
		this.species.getLearnsetData('kabutops').learnset.ancientpower = ["9L31"];
		this.species.getLearnsetData('kabutops').learnset.brine = ["9L36","9M"];
		this.species.getLearnsetData('kabutops').learnset.vitaldrain = ["9L49","9M"];
		this.species.getLearnsetData('kabutops').learnset.stoneaxe = ["9L70"];
		this.species.getLearnsetData('kabutops').learnset.stoneedge = ["9M"];
		this.species.getLearnsetData('kabutops').learnset.chillywater = ["9M"];
		delete this.species.getLearnsetData('kabutops').learnset.absorb;
		delete this.species.getLearnsetData('kabutops').learnset.blizzard;
		delete this.species.getLearnsetData('kabutops').learnset.knockoff;
		// Aerodactyl
		this.species.getLearnsetData('aerodactyl').learnset.twister = ["9D"];
		this.species.getLearnsetData('aerodactyl').learnset.roar = ["9L7","9M"];
		this.species.getLearnsetData('aerodactyl').learnset.ancientpower = ["9L13"];
		this.species.getLearnsetData('aerodactyl').learnset.agility = ["9L19"];
		this.species.getLearnsetData('aerodactyl').learnset.rockslide = ["9L25","9M"];
		this.species.getLearnsetData('aerodactyl').learnset.skydrop = ["9L31"];
		this.species.getLearnsetData('aerodactyl').learnset.crunch = ["9L37"];
		this.species.getLearnsetData('aerodactyl').learnset.ironhead = ["9L43","9M"];
		this.species.getLearnsetData('aerodactyl').learnset.stoneaxe = ["9L49"];
		this.species.getLearnsetData('aerodactyl').learnset.fellswoop = ["9L55"];
		this.species.getLearnsetData('aerodactyl').learnset.hyperbeam = ["9L61","9M"];
		this.species.getLearnsetData('aerodactyl').learnset.gigaimpact = ["9L67","9M"];
		this.species.getLearnsetData('aerodactyl').learnset.breakingswipe = ["9M"];
		this.species.getLearnsetData('aerodactyl').learnset.screech = ["9M"];
		// Snorlax
		this.species.getLearnsetData('snorlax').learnset.selfdestruct = ["9D"];
		this.species.getLearnsetData('snorlax').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('snorlax').learnset.toxic = ["9M"];
		delete this.species.getLearnsetData('snorlax').learnset.blizzard;
		delete this.species.getLearnsetData('snorlax').learnset.fireblast;
		delete this.species.getLearnsetData('snorlax').learnset.thunder;
		// Articuno
		this.species.getLearnsetData('articuno').learnset.extrasensory = ["9D"];
		this.species.getLearnsetData('articuno').learnset.mist = ["9L6"];
		this.species.getLearnsetData('articuno').learnset.iceshard = ["9L12"];
		this.species.getLearnsetData('articuno').learnset.mindreader = ["9L18"];
		this.species.getLearnsetData('articuno').learnset.ancientpower = ["9L24"];
		this.species.getLearnsetData('articuno').learnset.agility = ["9L30"];
		this.species.getLearnsetData('articuno').learnset.icebeam = ["9L36","9M"];
		this.species.getLearnsetData('articuno').learnset.reflect = ["9L42","9M"];
		this.species.getLearnsetData('articuno').learnset.snowscape = ["9L48","9M"];
		this.species.getLearnsetData('articuno').learnset.auroraveil = ["9L54","9M"];
		this.species.getLearnsetData('articuno').learnset.freezedry = ["9L60"];
		this.species.getLearnsetData('articuno').learnset.blizzard = ["9L66","9M"];
		this.species.getLearnsetData('articuno').learnset.roost = ["9L72","9M"];
		this.species.getLearnsetData('articuno').learnset.hurricane = ["9L78","9M"];
		this.species.getLearnsetData('articuno').learnset.sheercold = ["9L84"];
		this.species.getLearnsetData('articuno').learnset.chillywater = ["9M"];
		// Articuno Galar
		this.species.getLearnsetData('articunogalar').learnset.icebeam = ["9D"];
		this.species.getLearnsetData('articunogalar').learnset.psychoshift = ["9L6"];
		this.species.getLearnsetData('articunogalar').learnset.hypnosis = ["9L12"];
		this.species.getLearnsetData('articunogalar').learnset.mindreader = ["9L18"];
		this.species.getLearnsetData('articunogalar').learnset.ancientpower = ["9L24"];
		this.species.getLearnsetData('articunogalar').learnset.agility = ["9L30"];
		this.species.getLearnsetData('articunogalar').learnset.psychocut = ["9L36"];
		this.species.getLearnsetData('articunogalar').learnset.reflect = ["9L42","9M"];
		this.species.getLearnsetData('articunogalar').learnset.trickroom = ["9L48","9M"];
		this.species.getLearnsetData('articunogalar').learnset.doubleteam = ["9L54"];
		this.species.getLearnsetData('articunogalar').learnset.extrasensory = ["9L60"];
		this.species.getLearnsetData('articunogalar').learnset.dreameater = ["9L66","9M"];
		this.species.getLearnsetData('articunogalar').learnset.recover = ["9L72"];
		this.species.getLearnsetData('articunogalar').learnset.hurricane = ["9L78","9M"];
		this.species.getLearnsetData('articunogalar').learnset.futuresight = ["9L84","9M"];
		this.species.getLearnsetData('articunogalar').learnset.telekinesis = ["9M"];
		// Zapdos
		this.species.getLearnsetData('zapdos').learnset.extrasensory = ["9D"];
		this.species.getLearnsetData('zapdos').learnset.thunderwave = ["9L6","9M"];
		this.species.getLearnsetData('zapdos').learnset.pluck = ["9L12"];
		this.species.getLearnsetData('zapdos').learnset.detect = ["9L18"];
		this.species.getLearnsetData('zapdos').learnset.ancientpower = ["9L24"];
		this.species.getLearnsetData('zapdos').learnset.agility = ["9L30"];
		this.species.getLearnsetData('zapdos').learnset.discharge = ["9L36"];
		this.species.getLearnsetData('zapdos').learnset.lightscreen = ["9L42","9M"];
		this.species.getLearnsetData('zapdos').learnset.raindance = ["9L48","9M"];
		this.species.getLearnsetData('zapdos').learnset.charge = ["9L54"];
		this.species.getLearnsetData('zapdos').learnset.boltbeak = ["9L60"];
		this.species.getLearnsetData('zapdos').learnset.thunder = ["9L66","9M"];
		this.species.getLearnsetData('zapdos').learnset.roost = ["9L72","9M"];
		this.species.getLearnsetData('zapdos').learnset.drillpeck = ["9L78"];
		this.species.getLearnsetData('zapdos').learnset.zapcannon = ["9L84"];
		this.species.getLearnsetData('zapdos').learnset.flash = ["9M"];
		delete this.species.getLearnsetData('zapdos').learnset.magneticflux;
		// Zapdos Galar
		this.species.getLearnsetData('zapdosgalar').learnset.boltbeak = ["9D"];
		this.species.getLearnsetData('zapdosgalar').learnset.focusenergy = ["9L6"];
		this.species.getLearnsetData('zapdosgalar').learnset.pluck = ["9L12"];
		this.species.getLearnsetData('zapdosgalar').learnset.detect = ["9L18"];
		this.species.getLearnsetData('zapdosgalar').learnset.ancientpower = ["9L24"];
		this.species.getLearnsetData('zapdosgalar').learnset.agility = ["9L30"];
		this.species.getLearnsetData('zapdosgalar').learnset.brickbreak = ["9L36","9M"];
		this.species.getLearnsetData('zapdosgalar').learnset.lightscreen = ["9L42","9M"];
		this.species.getLearnsetData('zapdosgalar').learnset.bulkup = ["9L48","9M"];
		this.species.getLearnsetData('zapdosgalar').learnset.counter = ["9L54"];
		this.species.getLearnsetData('zapdosgalar').learnset.reversal = ["9L60"];
		this.species.getLearnsetData('zapdosgalar').learnset.jumpkick = ["9L66"];
		this.species.getLearnsetData('zapdosgalar').learnset.quickguard = ["9L72"];
		this.species.getLearnsetData('zapdosgalar').learnset.drillpeck = ["9L78"];
		this.species.getLearnsetData('zapdosgalar').learnset.highjumpkick = ["9L84"];
		// Moltres
		this.species.getLearnsetData('moltres').learnset.extrasensory = ["9D"];
		this.species.getLearnsetData('moltres').learnset.firespin = ["9L6"];
		this.species.getLearnsetData('moltres').learnset.airslash = ["9L12"];
		this.species.getLearnsetData('moltres').learnset.endure = ["9L18","9M"];
		this.species.getLearnsetData('moltres').learnset.ancientpower = ["9L24"];
		this.species.getLearnsetData('moltres').learnset.agility = ["9L30"];
		this.species.getLearnsetData('moltres').learnset.flamethrower = ["9L36","9M"];
		this.species.getLearnsetData('moltres').learnset.safeguard = ["9L42","9M"];
		this.species.getLearnsetData('moltres').learnset.sunnyday = ["9L48","9M"];
		this.species.getLearnsetData('moltres').learnset.preheat = ["9L54"];
		this.species.getLearnsetData('moltres').learnset.heatwave = ["9L60","9M"];
		this.species.getLearnsetData('moltres').learnset.solarbeam = ["9L66","9M"];
		this.species.getLearnsetData('moltres').learnset.roost = ["9L72","9M"];
		this.species.getLearnsetData('moltres').learnset.skyattack = ["9L78","9M"];
		this.species.getLearnsetData('moltres').learnset.burnup = ["9L84"];
		this.species.getLearnsetData('moltres').learnset.flash = ["9M"];
		// Moltres Galar
		this.species.getLearnsetData('moltresgalar').learnset.heatwave = ["9D"];
		this.species.getLearnsetData('moltresgalar').learnset.payback = ["9L6","9M"];
		this.species.getLearnsetData('moltresgalar').learnset.airslash = ["9L12"];
		this.species.getLearnsetData('moltresgalar').learnset.endure = ["9L18","9M"];
		this.species.getLearnsetData('moltresgalar').learnset.ancientpower = ["9L24"];
		this.species.getLearnsetData('moltresgalar').learnset.agility = ["9L30"];
		this.species.getLearnsetData('moltresgalar').learnset.suckerpunch = ["9L36"];
		this.species.getLearnsetData('moltresgalar').learnset.safeguard = ["9L42","9M"];
		this.species.getLearnsetData('moltresgalar').learnset.nastyplot = ["9L48","9M"];
		this.species.getLearnsetData('moltresgalar').learnset.embargo = ["9L54","9M"];
		this.species.getLearnsetData('moltresgalar').learnset.darkpulse = ["9L60","9M"];
		this.species.getLearnsetData('moltresgalar').learnset.foulplay = ["9L66","9M"];
		this.species.getLearnsetData('moltresgalar').learnset.quash = ["9L72","9M"];
		this.species.getLearnsetData('moltresgalar').learnset.skyattack = ["9L78","9M"];
		this.species.getLearnsetData('moltresgalar').learnset.memento = ["9L84"];
		// Dratini
		this.species.getLearnsetData('dratini').learnset.extremespeed = ["9D"];
		this.species.getLearnsetData('dratini').learnset.bind = ["9L1"];
		this.species.getLearnsetData('dratini').learnset.amnesia = ["9M"];
		delete this.species.getLearnsetData('dratini').learnset.blizzard;
		delete this.species.getLearnsetData('dratini').learnset.icebeam;
		delete this.species.getLearnsetData('dratini').learnset.thunderbolt;
		delete this.species.getLearnsetData('dratini').learnset.wrap;
		// Dragonair
		this.species.getLearnsetData('dragonair').learnset.extremespeed = ["9D"];
		this.species.getLearnsetData('dragonair').learnset.bind = ["9L1"];
		this.species.getLearnsetData('dragonair').learnset.amnesia = ["9M"];
		delete this.species.getLearnsetData('dragonair').learnset.blizzard;
		delete this.species.getLearnsetData('dragonair').learnset.icebeam;
		delete this.species.getLearnsetData('dragonair').learnset.thunderbolt;
		delete this.species.getLearnsetData('dragonair').learnset.wrap;
		// Dragonite
		this.species.getLearnsetData('dragonite').learnset.extremespeed = ["9D"];
		this.species.getLearnsetData('dragonite').learnset.fellswoop = ["9L0"];
		this.species.getLearnsetData('dragonite').learnset.bind = ["9L1"];
		this.species.getLearnsetData('dragonite').learnset.amnesia = ["9M"];
		this.species.getLearnsetData('dragonite').learnset.hurricane = ["9M"];
		delete this.species.getLearnsetData('dragonite').learnset.blizzard;
		delete this.species.getLearnsetData('dragonite').learnset.wrap;
		// Mewtwo
		this.species.getLearnsetData('mewtwo').learnset.hypnosis = ["9D"];
		this.species.getLearnsetData('mewtwo').learnset.flash = ["9M"];
		this.species.getLearnsetData('mewtwo').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('mewtwo').learnset.teleport = ["9L1"];
		// Mew
		this.species.getLearnsetData('mew').learnset.hypnosis = ["9D"];
		this.species.getLearnsetData('mew').learnset.teleport = ["9L1"];
		this.species.getLearnsetData('mew').learnset.chipaway = ["9M"];
		this.species.getLearnsetData('mew').learnset.flash = ["9M"];
		this.species.getLearnsetData('mew').learnset.fullcollide = ["9M"];
		this.species.getLearnsetData('mew').learnset.midnight = ["9T"];
		this.species.getLearnsetData('mew').learnset.naturalgift = ["9M"];
		this.species.getLearnsetData('mew').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('mew').learnset.toxic = ["9M"];
		this.species.getLearnsetData('mew').learnset.stasis = ["9T"];
		this.species.getLearnsetData('mew').learnset.vitaldrain = ["9M"];
		// Chikorita
		this.species.getLearnsetData('chikorita').learnset.spicyextract = ["9D"];
		this.species.getLearnsetData('chikorita').learnset.amnesia = ["9M"];
		this.species.getLearnsetData('chikorita').learnset.flash = ["9M"];
		this.species.getLearnsetData('chikorita').learnset.floralhealing = ["9E"];
		delete this.species.getLearnsetData('chikorita').learnset.wringout;
		// Bayleef
		this.species.getLearnsetData('bayleef').learnset.spicyextract = ["9D"];
		this.species.getLearnsetData('bayleef').learnset.amnesia = ["9M"];
		this.species.getLearnsetData('bayleef').learnset.flash = ["9M"];
		// Meganium
		this.species.getLearnsetData('meganium').learnset.flowershield = ["9D"];
		this.species.getLearnsetData('meganium').learnset.amnesia = ["9M"];
		this.species.getLearnsetData('meganium').learnset.bodypress = ["9M"];
		this.species.getLearnsetData('meganium').learnset.flash = ["9M"];
		// Cyndaquil
		this.species.getLearnsetData('cyndaquil').learnset.preheat = ["9D"];
		this.species.getLearnsetData('cyndaquil').learnset.flash = ["9M"];
		// Quilava
		this.species.getLearnsetData('quilava').learnset.preheat = ["9D"];
		this.species.getLearnsetData('quilava').learnset.flash = ["9M"];
		// Typhlosion
		this.species.getLearnsetData('typhlosion').learnset.preheat = ["9D"];
		this.species.getLearnsetData('typhlosion').learnset.flash = ["9M"];
		// Typhlosion Hisui
		this.species.getLearnsetData('typhlosionhisui').learnset.lastrespects = ["9D"];
		// Totodile
		this.species.getLearnsetData('totodile').learnset.faketears = ["9D"];
		this.species.getLearnsetData('totodile').learnset.chillywater = ["9M"];
		delete this.species.getLearnsetData('totodile').learnset.blizzard;
		// Croconaw
		this.species.getLearnsetData('croconaw').learnset.faketears = ["9D"];
		this.species.getLearnsetData('croconaw').learnset.chillywater = ["9M"];
		delete this.species.getLearnsetData('croconaw').learnset.blizzard;
		// Feraligatr
		this.species.getLearnsetData('feraligatr').learnset.faketears = ["9D"];
		this.species.getLearnsetData('feraligatr').learnset.chillywater = ["9M"];
		delete this.species.getLearnsetData('feraligatr').learnset.blizzard;
		// Sentret
		this.species.getLearnsetData('sentret').learnset.detect = ["9D"];
		this.species.getLearnsetData('sentret').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('sentret').learnset.faketears = ["9M"];
		this.species.getLearnsetData('sentret').learnset.incinerate = ["9M"];
		this.species.getLearnsetData('sentret').learnset.trailhead = ["9M"];
		delete this.species.getLearnsetData('sentret').learnset.blizzard;
		delete this.species.getLearnsetData('sentret').learnset.flamethrower;
		delete this.species.getLearnsetData('sentret').learnset.icebeam;
		delete this.species.getLearnsetData('sentret').learnset.thunder;
		delete this.species.getLearnsetData('sentret').learnset.thunderbolt;
		// Furret
		this.species.getLearnsetData('furret').learnset.coil = ["9D"];
		this.species.getLearnsetData('furret').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('furret').learnset.faketears = ["9M"];
		this.species.getLearnsetData('furret').learnset.incinerate = ["9M"];
		this.species.getLearnsetData('furret').learnset.trailhead = ["9M"];
		delete this.species.getLearnsetData('furret').learnset.blizzard;
		delete this.species.getLearnsetData('furret').learnset.flamethrower;
		delete this.species.getLearnsetData('furret').learnset.icebeam;
		delete this.species.getLearnsetData('furret').learnset.thunder;
		delete this.species.getLearnsetData('furret').learnset.thunderbolt;
		// Hoothoot
		this.species.getLearnsetData('hoothoot').learnset.imprison = ["9D"];
		this.species.getLearnsetData('hoothoot').learnset.nightmare = ["9M"];
		// Noctowl
		this.species.getLearnsetData('noctowl').learnset.imprison = ["9D"];
		this.species.getLearnsetData('noctowl').learnset.nightmare = ["9M"];
		// Ledyba
		this.species.getLearnsetData('ledyba').learnset.barrier = ["9D"];
		this.species.getLearnsetData('ledyba').learnset.bugcloud = ["9L1"];
		this.species.getLearnsetData('ledyba').learnset.flash = ["9M"];
		this.species.getLearnsetData('ledyba').learnset.metronome = ["9M"];
		// Ledian
		this.species.getLearnsetData('ledian').learnset.barrier = ["9D"];
		this.species.getLearnsetData('ledian').learnset.moonlight = ["9L0"];
		this.species.getLearnsetData('ledian').learnset.bugcloud = ["9L1"];
		this.species.getLearnsetData('ledian').learnset.flash = ["9M"];
		this.species.getLearnsetData('ledian').learnset.metronome = ["9M"];
		this.species.getLearnsetData('ledian').learnset.meteorbeam = ["9T"];
		// Spinarak
		this.species.getLearnsetData('spinarak').learnset.direclaw = ["9D"];
		this.species.getLearnsetData('spinarak').learnset.terrify = ["9L12"];
		this.species.getLearnsetData('spinarak').learnset.springleap = ["9L22"];
		this.species.getLearnsetData('spinarak').learnset.curse = ["9L33"];
		this.species.getLearnsetData('spinarak').learnset.crosspoison = ["9L36"];
		this.species.getLearnsetData('spinarak').learnset.pinmissile = ["9L43"];
		this.species.getLearnsetData('spinarak').learnset.poisonjab = ["9L47"];
		this.species.getLearnsetData('spinarak').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('spinarak').learnset.toxic = ["9M"];
		this.species.getLearnsetData('spinarak').learnset.vitaldrain = ["9M"];
		delete this.species.getLearnsetData('spinarak').learnset.absorb;
		delete this.species.getLearnsetData('spinarak').learnset.furyswipes;
		delete this.species.getLearnsetData('spinarak').learnset.scaryface;
		// Ariados
		this.species.getLearnsetData('ariados').learnset.direclaw = ["9D"];
		this.species.getLearnsetData('ariados').learnset.furyswipes = ["9L0"];
		this.species.getLearnsetData('ariados').learnset.terrify = ["9L12"];
		this.species.getLearnsetData('ariados').learnset.springleap = ["9L22"];
		this.species.getLearnsetData('ariados').learnset.curse = ["9L33"];
		this.species.getLearnsetData('ariados').learnset.crosspoison = ["9L36"];
		this.species.getLearnsetData('ariados').learnset.pinmissile = ["9L43"];
		this.species.getLearnsetData('ariados').learnset.poisonjab = ["9L47", "9M"];
		this.species.getLearnsetData('ariados').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('ariados').learnset.swordsdance = ["9M"];
		this.species.getLearnsetData('ariados').learnset.toxic = ["9M"];
		this.species.getLearnsetData('ariados').learnset.vitaldrain = ["9M"];
		delete this.species.getLearnsetData('ariados').learnset.absorb;
		delete this.species.getLearnsetData('ariados').learnset.scaryface;
		// Crobat
		this.species.getLearnsetData('crobat').learnset.detect = ["9D"];
		this.species.getLearnsetData('crobat').learnset.acrobatics = ["9L35", "9M"];
		this.species.getLearnsetData('crobat').learnset.vitaldrain = ["9L43", "9M"];
		this.species.getLearnsetData('crobat').learnset.toxic = ["9M"];
		delete this.species.getLearnsetData('crobat').learnset.absorb;
		// Chinchou
		this.species.getLearnsetData('chinchou').learnset.zapcannon = ["9D"];
		this.species.getLearnsetData('chinchou').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('chinchou').learnset.flash = ["9M"];
		delete this.species.getLearnsetData('chinchou').learnset.blizzard;
		// Lanturn
		this.species.getLearnsetData('lanturn').learnset.zapcannon = ["9D"];
		this.species.getLearnsetData('lanturn').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('lanturn').learnset.flash = ["9M"];
		delete this.species.getLearnsetData('lanturn').learnset.blizzard;
		// Pichu
		this.species.getLearnsetData('pichu').learnset.paraboliccharge = ["9D"];
		this.species.getLearnsetData('pichu').learnset.flash = ["9M"];
		// Cleffa
		this.species.getLearnsetData('cleffa').learnset.teeterdance = ["9D"];
		this.species.getLearnsetData('cleffa').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('cleffa').learnset.flash = ["9M"];
		this.species.getLearnsetData('cleffa').learnset.nightmare = ["9M"];
		delete this.species.getLearnsetData('cleffa').learnset.blizzard;
		delete this.species.getLearnsetData('cleffa').learnset.icebeam;
		delete this.species.getLearnsetData('cleffa').learnset.flamethrower;
		delete this.species.getLearnsetData('cleffa').learnset.fireblast;
		delete this.species.getLearnsetData('cleffa').learnset.thunder;
		delete this.species.getLearnsetData('cleffa').learnset.thunderbolt;
		// Igglybuff
		this.species.getLearnsetData('igglybuff').learnset.tickle = ["9D"];
		this.species.getLearnsetData('igglybuff').learnset.pound = ["9L1"];
		this.species.getLearnsetData('igglybuff').learnset.aerate = ["9L3"];
		this.species.getLearnsetData('igglybuff').learnset.confide = ["9E"];
		this.species.getLearnsetData('igglybuff').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('igglybuff').learnset.flash = ["9M"];
		this.species.getLearnsetData('igglybuff').learnset.tearfullook = ["9E"];
		delete this.species.getLearnsetData('igglybuff').learnset.blizzard;
		delete this.species.getLearnsetData('igglybuff').learnset.icebeam;
		delete this.species.getLearnsetData('igglybuff').learnset.flamethrower;
		delete this.species.getLearnsetData('igglybuff').learnset.fireblast;
		delete this.species.getLearnsetData('igglybuff').learnset.thunder;
		delete this.species.getLearnsetData('igglybuff').learnset.thunderbolt;
		// Togepi
		this.species.getLearnsetData('togepi').learnset.softboiled = ["9D"];
		this.species.getLearnsetData('togepi').learnset.daydream = ["9L1"];
		this.species.getLearnsetData('togepi').learnset.flash = ["9M"];
		this.species.getLearnsetData('togepi').learnset.naturalgift = ["9M"];
		delete this.species.getLearnsetData('togepi').learnset.growl;
		delete this.species.getLearnsetData('togepi').learnset.flamethrower;
		delete this.species.getLearnsetData('togepi').learnset.fireblast;
		// Togetic
		this.species.getLearnsetData('togetic').learnset.softboiled = ["9D"];
		this.species.getLearnsetData('togetic').learnset.daydream = ["9L1"];
		this.species.getLearnsetData('togetic').learnset.flash = ["9M"];
		this.species.getLearnsetData('togetic').learnset.naturalgift = ["9M"];
		delete this.species.getLearnsetData('togetic').learnset.fireblast;
		delete this.species.getLearnsetData('togetic').learnset.growl;
		// Natu
		this.species.getLearnsetData('natu').learnset.cosmicpower = ["9D"];
		this.species.getLearnsetData('natu').learnset.flash = ["9M"];
		this.species.getLearnsetData('natu').learnset.stasis = ["9M"];
		// Xatu
		this.species.getLearnsetData('xatu').learnset.cosmicpower = ["9D"];
		this.species.getLearnsetData('xatu').learnset.flash = ["9M"];
		this.species.getLearnsetData('xatu').learnset.stasis = ["9M"];
		// Mareep
		this.species.getLearnsetData('mareep').learnset.tailglow = ["9D"];
		this.species.getLearnsetData('mareep').learnset.amnesia = ["9M"];
		this.species.getLearnsetData('mareep').learnset.electroball = ["9M"];
		this.species.getLearnsetData('mareep').learnset.flash = ["9M"];
		this.species.getLearnsetData('mareep').learnset.spotlight = ["9E"];
		delete this.species.getLearnsetData('mareep').learnset.trailhead;
		// Flaaffy
		this.species.getLearnsetData('flaaffy').learnset.tailglow = ["9D"];
		this.species.getLearnsetData('flaaffy').learnset.amnesia = ["9M"];
		this.species.getLearnsetData('flaaffy').learnset.electroball = ["9M"];
		this.species.getLearnsetData('flaaffy').learnset.flash = ["9M"];
		// Ampharos
		this.species.getLearnsetData('ampharos').learnset.tailglow = ["9D"];
		this.species.getLearnsetData('ampharos').learnset.amnesia = ["9M"];
		this.species.getLearnsetData('ampharos').learnset.electroball = ["9M"];
		this.species.getLearnsetData('ampharos').learnset.flash = ["9M"];
		this.species.getLearnsetData('ampharos').learnset.metronome = ["9M"];
		// Bellossom
		this.species.getLearnsetData('bellossom').learnset.junglehealing = ["9D"];
		this.species.getLearnsetData('bellossom').learnset.grasswhistle = ["9L1"];
		this.species.getLearnsetData('bellossom').learnset.healbell = ["9L1"];
		this.species.getLearnsetData('bellossom').learnset.luckychant = ["9L1"];
		this.species.getLearnsetData('bellossom').learnset.morningsun = ["9L1"];
		this.species.getLearnsetData('bellossom').learnset.magicalleaf = ["9L1"];
		this.species.getLearnsetData('bellossom').learnset.sweetscent = ["9L1"];
		this.species.getLearnsetData('bellossom').learnset.flash = ["9M"];
		this.species.getLearnsetData('bellossom').learnset.metronome = ["9M"];
		delete this.species.getLearnsetData('bellossom').learnset.acid;
		delete this.species.getLearnsetData('bellossom').learnset.moonblast;
		delete this.species.getLearnsetData('bellossom').learnset.moonlight;
		delete this.species.getLearnsetData('bellossom').learnset.poisonpowder;
		delete this.species.getLearnsetData('bellossom').learnset.quiverdance;
		delete this.species.getLearnsetData('bellossom').learnset.toxic;
		// Marill
		this.species.getLearnsetData('marill').learnset.seismictoss = ["9D"];
		this.species.getLearnsetData('marill').learnset.jetpunch = ["9L20"];
		this.species.getLearnsetData('marill').learnset.aquaring = ["9L23"];
		this.species.getLearnsetData('marill').learnset.raindance = ["9L28", "9M"];
		this.species.getLearnsetData('marill').learnset.aquatail = ["9L31", "9M"];
		this.species.getLearnsetData('marill').learnset.playrough = ["9L37"];
		this.species.getLearnsetData('marill').learnset.doubleedge = ["9L40"];
		this.species.getLearnsetData('marill').learnset.superpower = ["9L43", "9M"];
		this.species.getLearnsetData('marill').learnset.liquidation = ["9L49"];
		this.species.getLearnsetData('marill').learnset.hydropump = ["9M"];
		delete this.species.getLearnsetData('marill').learnset.blizzard;
		// Azumarill
		this.species.getLearnsetData('azumarill').learnset.seismictoss = ["9D"];
		this.species.getLearnsetData('azumarill').learnset.jetpunch = ["9L21"];
		this.species.getLearnsetData('azumarill').learnset.aquaring = ["9L25"];
		this.species.getLearnsetData('azumarill').learnset.raindance = ["9L31", "9M"];
		this.species.getLearnsetData('azumarill').learnset.aquatail = ["9L35", "9M"];
		this.species.getLearnsetData('azumarill').learnset.playrough = ["9L42"];
		this.species.getLearnsetData('azumarill').learnset.doubleedge = ["9L46"];
		this.species.getLearnsetData('azumarill').learnset.superpower = ["9L53", "9M"];
		this.species.getLearnsetData('azumarill').learnset.liquidation = ["9L57"];
		this.species.getLearnsetData('azumarill').learnset.hydropump = ["9M"];
		delete this.species.getLearnsetData('azumarill').learnset.blizzard;
		// Sudowoodo
		this.species.getLearnsetData('sudowoodo').learnset.camouflage = ["9D"];
		delete this.species.getLearnsetData('sudowoodo').learnset.earthquake;
		delete this.species.getLearnsetData('sudowoodo').learnset.meteorbeam;
		// Politoed
		this.species.getLearnsetData('politoed').learnset.nobleroar = ["9D"];
		this.species.getLearnsetData('politoed').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('politoed').learnset.screech = ["9M"];
		delete this.species.getLearnsetData('politoed').learnset.blizzard;
		delete this.species.getLearnsetData('politoed').learnset.earthquake;
		// Hoppip
		this.species.getLearnsetData('hoppip').learnset.pollenpuff = ["9D"];
		this.species.getLearnsetData('hoppip').learnset.flash = ["9M"];
		// Skiploom
		this.species.getLearnsetData('skiploom').learnset.pollenpuff = ["9D"];
		this.species.getLearnsetData('skiploom').learnset.flash = ["9M"];
		// Jumpluff
		this.species.getLearnsetData('jumpluff').learnset.pollenpuff = ["9D"];
		this.species.getLearnsetData('jumpluff').learnset.flash = ["9M"];
		// Aipom
		this.species.getLearnsetData('aipom').learnset.swing = ["9D"];
		delete this.species.getLearnsetData('politoed').learnset.thunder;
		// Sunkern
		this.species.getLearnsetData('sunkern').learnset.selfdestruct = ["9D"];
		this.species.getLearnsetData('sunkern').learnset.flash = ["9M"];
		delete this.species.getLearnsetData('sunkern').learnset.trailhead;
		// Sunflora
		this.species.getLearnsetData('sunflora').learnset.heatwave = ["9D"];
		this.species.getLearnsetData('sunflora').learnset.petalblizzard = ["9L28"];
		this.species.getLearnsetData('sunflora').learnset.petaldance = ["9L37"];
		this.species.getLearnsetData('sunflora').learnset.chloroblast = ["9L50"];
		this.species.getLearnsetData('sunflora').learnset.flash = ["9M"];
		delete this.species.getLearnsetData('sunflora').learnset.doubleedge;
		// Yanma
		this.species.getLearnsetData('yanma').learnset.aircutter = ["9D"];
		this.species.getLearnsetData('yanma').learnset.bugcloud = ["9L1"];
		delete this.species.getLearnsetData('yanma').learnset.tackle;
		// Wooper
		this.species.getLearnsetData('wooper').learnset.headbutt = ["9D"];
		this.species.getLearnsetData('wooper').learnset.toxic = ["9M"];
		delete this.species.getLearnsetData('wooper').learnset.icepunch;
		delete this.species.getLearnsetData('wooper').learnset.poweruppunch;
		delete this.species.getLearnsetData('wooper').learnset.trailhead;
		// Wooper Paldea
		this.species.getLearnsetData('wooperpaldea').learnset.headbutt = ["9D"];
		this.species.getLearnsetData('wooperpaldea').learnset.gastroacid = ["9M"];
		this.species.getLearnsetData('wooperpaldea').learnset.toxic = ["9M"];
		delete this.species.getLearnsetData('wooperpaldea').learnset.trailhead;
		// Quagsire
		this.species.getLearnsetData('quagsire').learnset.headbutt = ["9D"];
		this.species.getLearnsetData('quagsire').learnset.toxic = ["9M"];
		// Espeon
		this.species.getLearnsetData('espeon').learnset.extrasensory = ["9D"];
		this.species.getLearnsetData('espeon').learnset.flash = ["9M"];
		this.species.getLearnsetData('espeon').learnset.nightmare = ["9M"];
		// Umbreon
		this.species.getLearnsetData('umbreon').learnset.nightdaze = ["9D"];
		this.species.getLearnsetData('umbreon').learnset.flash = ["9M"];
		this.species.getLearnsetData('umbreon').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('umbreon').learnset.toxic = ["9M"];
		// Murkrow
		this.species.getLearnsetData('murkrow').learnset.beatup = ["9D"];
		this.species.getLearnsetData('murkrow').learnset.compensation = ["9M"];
		this.species.getLearnsetData('murkrow').learnset.hex = ["9M"];
		this.species.getLearnsetData('murkrow').learnset.nastyplot = ["9M"];
		this.species.getLearnsetData('murkrow').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('murkrow').learnset.toxic = ["9M"];
		// Slowking
		this.species.getLearnsetData('slowking').learnset.skullbash = ["9D"];
		this.species.getLearnsetData('slowking').learnset.trumpcard = ["9L0"];
		this.species.getLearnsetData('slowking').learnset.raindance = ["9L49", "9M"];
		this.species.getLearnsetData('slowking').learnset.flash = ["9M"];
		this.species.getLearnsetData('slowking').learnset.stasis = ["9T"];
		delete this.species.getLearnsetData('slowking').learnset.blizzard;
		// Slowking Galar
		this.species.getLearnsetData('slowkinggalar').learnset.spicyextract = ["9D"];
		this.species.getLearnsetData('slowkinggalar').learnset.toxic = ["9M"];
		delete this.species.getLearnsetData('slowkinggalar').learnset.blizzard;
		// Misdreavus
		this.species.getLearnsetData('misdreavus').learnset.healblock = ["9D"];
		this.species.getLearnsetData('misdreavus').learnset.terrify = ["9L37"];
		this.species.getLearnsetData('misdreavus').learnset.eeriespell = ["9L59"];
		this.species.getLearnsetData('misdreavus').learnset.disarmingvoice = ["9E"];
		this.species.getLearnsetData('misdreavus').learnset.flash = ["9M"];
		this.species.getLearnsetData('misdreavus').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('misdreavus').learnset.payback = ["9M"];
		this.species.getLearnsetData('misdreavus').learnset.poltergeist = ["9M"];
		delete this.species.getLearnsetData('misdreavus').learnset.thunder;
		// Unown
		this.species.getLearnsetData('unown').learnset.storedpower = ["9D"];
		// Wobbuffet
		this.species.getLearnsetData('wobbuffet').learnset.rebound = ["9D"];
		// Girafarig
		this.species.getLearnsetData('girafarig').learnset.feint = ["9D"];
		this.species.getLearnsetData('girafarig').learnset.barrierbash = ["9L23"];
		this.species.getLearnsetData('girafarig').learnset.agility = ["9L32"];
		this.species.getLearnsetData('girafarig').learnset.zenheadbutt = ["9L46", "9M"];
		this.species.getLearnsetData('girafarig').learnset.flash = ["9M"];
		this.species.getLearnsetData('girafarig').learnset.nightmare = ["9M"];
		delete this.species.getLearnsetData('girafarig').learnset.earthquake;
		delete this.species.getLearnsetData('girafarig').learnset.thunder;
		// Pineco
		this.species.getLearnsetData('pineco').learnset.leechseed = ["9D"];
		delete this.species.getLearnsetData('pineco').learnset.earthquake;
		// Forretress
		this.species.getLearnsetData('forretress').learnset.spikecannon = ["9D"];
		this.species.getLearnsetData('forretress').learnset.fullcollide = ["9M"];
		this.species.getLearnsetData('forretress').learnset.steelbeam = ["9M"];
		delete this.species.getLearnsetData('forretress').learnset.earthquake;
		// Dunsparce
		this.species.getLearnsetData('dunsparce').learnset.dragondance = ["9D"];
		this.species.getLearnsetData('dunsparce').learnset.mudslap = ["9L8"];
		this.species.getLearnsetData('dunsparce').learnset.yawn = ["9L13"];
		this.species.getLearnsetData('dunsparce').learnset.ancientpower = ["9L16"];
		this.species.getLearnsetData('dunsparce').learnset.bodyslam = ["9L18"];
		this.species.getLearnsetData('dunsparce').learnset.dig = ["9L21", "9M"];
		this.species.getLearnsetData('dunsparce').learnset.roost = ["9L23", "9M"];
		this.species.getLearnsetData('dunsparce').learnset.drillrun = ["9L26", "9M"];
		this.species.getLearnsetData('dunsparce').learnset.coil = ["9L28"];
		this.species.getLearnsetData('dunsparce').learnset.escapetunnel = ["9L31"];
		this.species.getLearnsetData('dunsparce').learnset.glare = ["9L33"];
		this.species.getLearnsetData('dunsparce').learnset.doubleedge = ["9L36"];
		this.species.getLearnsetData('dunsparce').learnset.endeavor = ["9L38", "9M"];
		this.species.getLearnsetData('dunsparce').learnset.airslash = ["9L41"];
		this.species.getLearnsetData('dunsparce').learnset.dragonrush = ["9L43"];
		this.species.getLearnsetData('dunsparce').learnset.endure = ["9L46", "9M"];
		this.species.getLearnsetData('dunsparce').learnset.flail = ["9L48"];
		this.species.getLearnsetData('dunsparce').learnset.nightmare = ["9M"];
		delete this.species.getLearnsetData('dunsparce').learnset.thunder;
		// Gligar
		this.species.getLearnsetData('gligar').learnset.skydrop = ["9D"];
		this.species.getLearnsetData('gligar').learnset.assurance = ["9M"];
		this.species.getLearnsetData('gligar').learnset.toxic = ["9M"];
		this.species.getLearnsetData('gligar').learnset.lunge = ["9E"];
		// Steelix
		this.species.getLearnsetData('steelix').learnset.sharpen = ["9D"];
		this.species.getLearnsetData('steelix').learnset.escapetunnel = ["9L52"];
		this.species.getLearnsetData('steelix').learnset.sandstorm = ["9M"];
		delete this.species.getLearnsetData('steelix').learnset.meteorbeam;
		// Snubbull
		this.species.getLearnsetData('snubbull').learnset.beatup = ["9D"];
		this.species.getLearnsetData('snubbull').learnset.pounce = ["9L19"];
		delete this.species.getLearnsetData('snubbull').learnset.earthquake;
		delete this.species.getLearnsetData('snubbull').learnset.flamethrower;
		delete this.species.getLearnsetData('snubbull').learnset.fireblast;
		delete this.species.getLearnsetData('snubbull').learnset.headbutt;
		delete this.species.getLearnsetData('snubbull').learnset.thunderbolt;
		// Granbull
		this.species.getLearnsetData('granbull').learnset.beatup = ["9D"];
		this.species.getLearnsetData('granbull').learnset.pounce = ["9L19"];
		delete this.species.getLearnsetData('granbull').learnset.fireblast;
		delete this.species.getLearnsetData('granbull').learnset.headbutt;
		// Qwilfish
		this.species.getLearnsetData('qwilfish').learnset.fellstinger = ["9D"];
		this.species.getLearnsetData('qwilfish').learnset.whitewater = ["9L12"];
		this.species.getLearnsetData('qwilfish').learnset.pinmissile = ["9L24"];
		this.species.getLearnsetData('qwilfish').learnset.brine = ["9L32","9M"];
		this.species.getLearnsetData('qwilfish').learnset.aquatail = ["9L48","9M"];
		this.species.getLearnsetData('qwilfish').learnset.toxic = ["9L52", "9M"];
		this.species.getLearnsetData('qwilfish').learnset.liquidation = ["9L56"];
		this.species.getLearnsetData('qwilfish').learnset.rebound = ["9L60"];
		this.species.getLearnsetData('qwilfish').learnset.hydropump = ["9M"];
		this.species.getLearnsetData('qwilfish').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('qwilfish').learnset.revenge = ["9E"];
		delete this.species.getLearnsetData('qwilfish').learnset.acupressure;
		delete this.species.getLearnsetData('qwilfish').learnset.blizzard;
		delete this.species.getLearnsetData('qwilfish').learnset.gyroball;
		delete this.species.getLearnsetData('qwilfish').learnset.takedown;
		// Qwilfish Hisui
		this.species.getLearnsetData('qwilfishhisui').learnset.fellstinger = ["9D"];
		this.species.getLearnsetData('qwilfishhisui').learnset.compensation = ["9M"];
		this.species.getLearnsetData('qwilfishhisui').learnset.painsplit = ["9M"];
		this.species.getLearnsetData('qwilfishhisui').learnset.torment = ["9M"];
		delete this.species.getLearnsetData('qwilfishhisui').learnset.gyroball;
		delete this.species.getLearnsetData('qwilfishhisui').learnset.shockwave;
		delete this.species.getLearnsetData('qwilfishhisui').learnset.thunderwave;
		// Scizor
		this.species.getLearnsetData('scizor').learnset.guillotine = ["9D"];
		this.species.getLearnsetData('scizor').learnset.pursuit = ["9L16"];
		this.species.getLearnsetData('scizor').learnset.metaledge = ["9L36"];
		this.species.getLearnsetData('scizor').learnset.razorwind = ["9L52"];
		this.species.getLearnsetData('scizor').learnset.feint = ["9L56"];
		this.species.getLearnsetData('scizor').learnset.ironhead = ["9M"];
		delete this.species.getLearnsetData('scizor').learnset.doubleteam;
		// Shuckle
		this.species.getLearnsetData('shuckle').learnset.stockpile = ["9D"];
		this.species.getLearnsetData('shuckle').learnset.shelter = ["9L34"];
		this.species.getLearnsetData('shuckle').learnset.naturalgift = ["9M"];
		this.species.getLearnsetData('shuckle').learnset.recycle = ["9M"];
		this.species.getLearnsetData('shuckle').learnset.toxic = ["9M"];
		delete this.species.getLearnsetData('shuckle').learnset.earthquake;
		delete this.species.getLearnsetData('shuckle').learnset.knockoff;
		delete this.species.getLearnsetData('shuckle').learnset.meteorbeam;
		delete this.species.getLearnsetData('shuckle').learnset.shellsmash;
		// Heracross
		this.species.getLearnsetData('heracross').learnset.horndrill = ["9D"];
		this.species.getLearnsetData('heracross').learnset.furyattack = ["9L4"];
		this.species.getLearnsetData('heracross').learnset.endure = ["9L8", "9M"];
		this.species.getLearnsetData('heracross').learnset.aerialace = ["9L12", "9M"];
		this.species.getLearnsetData('heracross').learnset.pinmissile = ["9L16"];
		this.species.getLearnsetData('heracross').learnset.armthrust = ["9L20"];
		this.species.getLearnsetData('heracross').learnset.hornattack = ["9L24"];
		this.species.getLearnsetData('heracross').learnset.reversal = ["9L28"];
		this.species.getLearnsetData('heracross').learnset.chipaway = ["9L32", "9M"];
		this.species.getLearnsetData('heracross').learnset.brickbreak = ["9L36", "9M"];
		this.species.getLearnsetData('heracross').learnset.counter = ["9L40"];
		this.species.getLearnsetData('heracross').learnset.swordsdance = ["9L44", "9M"];
		this.species.getLearnsetData('heracross').learnset.throatchop = ["9L48"];
		this.species.getLearnsetData('heracross').learnset.megahorn = ["9L52"];
		this.species.getLearnsetData('heracross').learnset.closecombat = ["9L56"];
		delete this.species.getLearnsetData('heracross').learnset.takedown;
		// Sneasel
		this.species.getLearnsetData('sneasel').learnset.razorwind = ["9D"];
		this.species.getLearnsetData('sneasel').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('sneasel').learnset.nightmare = ["9M"];
		// Sneasel Hisui
		this.species.getLearnsetData('sneaselhisui').learnset.razorwind = ["9D"];
		this.species.getLearnsetData('sneaselhisui').learnset.honeclaws = ["9M"];
		this.species.getLearnsetData('sneaselhisui').learnset.knockoff = ["9M"];
		// Teddiursa
		this.species.getLearnsetData('teddiursa').learnset.slackoff = ["9D"];
		this.species.getLearnsetData('teddiursa').learnset.amnesia = ["9M"];
		delete this.species.getLearnsetData('teddiursa').learnset.earthquake;
		// Ursaring
		this.species.getLearnsetData('ursaring').learnset.slackoff = ["9D"];
		this.species.getLearnsetData('ursaring').learnset.amnesia = ["9M"];
		this.species.getLearnsetData('ursaring').learnset.bodypress = ["9M"];
		this.species.getLearnsetData('ursaring').learnset.knockoff = ["9M"];
		this.species.getLearnsetData('ursaring').learnset.screech = ["9M"];
		// Slugma
		this.species.getLearnsetData('slugma').learnset.burnup = ["9D"];
		this.species.getLearnsetData('slugma').learnset.flash = ["9M"];
		// Magcargo
		this.species.getLearnsetData('magcargo').learnset.magmastorm = ["9D"];
		this.species.getLearnsetData('magcargo').learnset.flash = ["9M"];
		// Swinub
		this.species.getLearnsetData('swinub').learnset.headbutt = ["9D"];
		this.species.getLearnsetData('swinub').learnset.tussle = ["9L18"];
		this.species.getLearnsetData('swinub').learnset.mudbomb = ["9L21"];
		this.species.getLearnsetData('swinub').learnset.icywind = ["9L24","9M"];
		this.species.getLearnsetData('swinub').learnset.iceshard = ["9L28"];
		this.species.getLearnsetData('swinub').learnset.takedown = ["9L33"];
		this.species.getLearnsetData('swinub').learnset.charm = ["9M"];
		this.species.getLearnsetData('swinub').learnset.chillywater = ["9M"];
		// Piloswine
		this.species.getLearnsetData('piloswine').learnset.highhorsepower = ["9D"];
		this.species.getLearnsetData('piloswine').learnset.tussle = ["9L18"];
		this.species.getLearnsetData('piloswine').learnset.mudbomb = ["9L21"];
		this.species.getLearnsetData('piloswine').learnset.icywind = ["9L24","9M"];
		this.species.getLearnsetData('piloswine').learnset.iceshard = ["9L28"];
		this.species.getLearnsetData('piloswine').learnset.takedown = ["9L33"];
		this.species.getLearnsetData('piloswine').learnset.charm = ["9M"];
		this.species.getLearnsetData('piloswine').learnset.chillywater = ["9M"];
		// Corsola
		this.species.getLearnsetData('corsola').learnset.lifedew = ["9D"];
		this.species.getLearnsetData('corsola').learnset.dustspray = ["9L17"];
		this.species.getLearnsetData('corsola').learnset.ancientpower = ["9L31"];
		this.species.getLearnsetData('corsola').learnset.rockblast = ["9E"];
		this.species.getLearnsetData('corsola').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('corsola').learnset.naturalgift = ["9M"];
		delete this.species.getLearnsetData('corsola').learnset.blizzard;
		delete this.species.getLearnsetData('corsola').learnset.headsmash;
		delete this.species.getLearnsetData('corsola').learnset.tantrum;
		// Corsola Galar
		this.species.getLearnsetData('corsolagalar').learnset.clearsmog = ["9D"];
		this.species.getLearnsetData('corsolagalar').learnset.dustspray = ["9L17"];
		this.species.getLearnsetData('corsolagalar').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('corsolagalar').learnset.dreameater = ["9M"];
		this.species.getLearnsetData('corsolagalar').learnset.endeavor = ["9M"];
		this.species.getLearnsetData('corsolagalar').learnset.explosion = ["9M"];
		this.species.getLearnsetData('corsolagalar').learnset.gravity = ["9M"];
		this.species.getLearnsetData('corsolagalar').learnset.healblock = ["9M"];
		this.species.getLearnsetData('corsolagalar').learnset.magiccoat = ["9M"];
		this.species.getLearnsetData('corsolagalar').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('corsolagalar').learnset.painsplit = ["9M"];
		this.species.getLearnsetData('corsolagalar').learnset.psychup = ["9M"];
		this.species.getLearnsetData('corsolagalar').learnset.toxic = ["9M"];
		delete this.species.getLearnsetData('corsolagalar').learnset.blizzard;
		delete this.species.getLearnsetData('corsolagalar').learnset.earthquake;
		delete this.species.getLearnsetData('corsolagalar').learnset.meteorbeam;
		delete this.species.getLearnsetData('corsolagalar').learnset.tantrum;
		// Remoraid
		this.species.getLearnsetData('remoraid').learnset.laserfocus = ["9D"];
		this.species.getLearnsetData('remoraid').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('remoraid').learnset.signalbeam = ["9M"];
		this.species.getLearnsetData('remoraid').learnset.simplebeam = ["9E"];
		this.species.getLearnsetData('remoraid').learnset.snipeshot = ["9E"];
		delete this.species.getLearnsetData('remoraid').learnset.blizzard;
		delete this.species.getLearnsetData('remoraid').learnset.bulletseed;
		// Octillery
		this.species.getLearnsetData('octillery').learnset.hydrocannon = ["9D"];
		this.species.getLearnsetData('octillery').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('octillery').learnset.liquidation = ["9L1"];
		this.species.getLearnsetData('octillery').learnset.signalbeam = ["9L28"];
		delete this.species.getLearnsetData('octillery').learnset.blizzard;
		delete this.species.getLearnsetData('octillery').learnset.bulletseed;
		// Delibird
		this.species.getLearnsetData('delibird').learnset.payday = ["9D"];
		this.species.getLearnsetData('delibird').learnset.present = ["9L1"];
		this.species.getLearnsetData('delibird').learnset.powdersnow = ["9L5"];
		this.species.getLearnsetData('delibird').learnset.peck = ["9L10"];
		this.species.getLearnsetData('delibird').learnset.icywind = ["9L20","9M"];
		this.species.getLearnsetData('delibird').learnset.drillpeck = ["9L25"];
		this.species.getLearnsetData('delibird').learnset.blizzard = ["9L35","9M"];
		this.species.getLearnsetData('delibird').learnset.fly = ["9L40","9M"];
		this.species.getLearnsetData('delibird').learnset.snowscape = ["9L50","9M"];
		this.species.getLearnsetData('delibird').learnset.endeavor = ["9M"];
		this.species.getLearnsetData('delibird').learnset.knockoff = ["9M"];
		this.species.getLearnsetData('delibird').learnset.snatch = ["9M"];
		this.species.getLearnsetData('delibird').learnset.trick = ["9M"];
		delete this.species.getLearnsetData('delibird').learnset.bounce;
		delete this.species.getLearnsetData('delibird').learnset.drillrun;
		// Mantine
		this.species.getLearnsetData('mantine').learnset.skydrop = ["9D"];
		this.species.getLearnsetData('mantine').learnset.waterpulse = ["9L7","9M"];
		this.species.getLearnsetData('mantine').learnset.bubblebeam = ["9L19"];
		this.species.getLearnsetData('mantine').learnset.bounce = ["9L44","9M"];
		this.species.getLearnsetData('mantine').learnset.hydropump = ["9L47","9M"];
		this.species.getLearnsetData('mantine').learnset.wavecrash = ["9L50"];
		this.species.getLearnsetData('mantine').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('mantine').learnset.bodyslam = ["9E"];
		delete this.species.getLearnsetData('mantine').learnset.roost;
		delete this.species.getLearnsetData('mantine').learnset.slam;
		delete this.species.getLearnsetData('mantine').learnset.stringshot;
		// Skarmory
		this.species.getLearnsetData('skarmory').learnset.detect = ["9D"];
		this.species.getLearnsetData('skarmory').learnset.metaledge = ["9L56"];
		this.species.getLearnsetData('skarmory').learnset.flash = ["9M"];
		this.species.getLearnsetData('skarmory').learnset.fullcollide = ["9M"];
		delete this.species.getLearnsetData('skarmory').learnset.bodypress;
		// Houndour
		this.species.getLearnsetData('houndour').learnset.throatchop = ["9D"];
		this.species.getLearnsetData('houndour').learnset.compensation = ["9M"];
		this.species.getLearnsetData('houndour').learnset.flash = ["9M"];
		this.species.getLearnsetData('houndour').learnset.hex = ["9M"];
		this.species.getLearnsetData('houndour').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('houndour').learnset.toxic = ["9M"];
		// Houndoom
		this.species.getLearnsetData('houndoom').learnset.throatchop = ["9D"];
		this.species.getLearnsetData('houndoom').learnset.compensation = ["9M"];
		this.species.getLearnsetData('houndoom').learnset.flash = ["9M"];
		this.species.getLearnsetData('houndoom').learnset.hex = ["9M"];
		this.species.getLearnsetData('houndoom').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('houndoom').learnset.toxic = ["9M"];
		// Kingdra
		this.species.getLearnsetData('kingdra').learnset.storedpower = ["9D"];
		this.species.getLearnsetData('kingdra').learnset.whirlpool = ["9L0","9M"];
		this.species.getLearnsetData('kingdra').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('kingdra').learnset.toxic = ["9M"];
		// Phanpy
		this.species.getLearnsetData('phanpy').learnset.watergun = ["9D"];
		this.species.getLearnsetData('phanpy').learnset.tussle = ["9L10"];
		this.species.getLearnsetData('phanpy').learnset.bodypress = ["9M"];
		this.species.getLearnsetData('phanpy').learnset.encore = ["9M"];
		this.species.getLearnsetData('phanpy').learnset.screech = ["9M"];
		delete this.species.getLearnsetData('phanpy').learnset.rollout;
		// Donphan
		this.species.getLearnsetData('donphan').learnset.uturn = ["9D"];
		this.species.getLearnsetData('donphan').learnset.steamroller = ["9L0"];
		this.species.getLearnsetData('donphan').learnset.bodypress = ["9M"];
		this.species.getLearnsetData('donphan').learnset.encore = ["9M"];
		this.species.getLearnsetData('donphan').learnset.fullcollide = ["9M"];
		this.species.getLearnsetData('donphan').learnset.screech = ["9M"];
		delete this.species.getLearnsetData('donphan').learnset.furyattack;
		// Porygon2
		this.species.getLearnsetData('porygon2').learnset.teleport = ["9D"];
		this.species.getLearnsetData('porygon2').learnset.flash = ["9M"];
		this.species.getLearnsetData('porygon2').learnset.powergem = ["9M"];
		// Stantler
		this.species.getLearnsetData('stantler').learnset.followme = ["9D"];
		this.species.getLearnsetData('stantler').learnset.barrierbash = ["9L21"];
		this.species.getLearnsetData('stantler').learnset.takedown = ["9L27"];
		this.species.getLearnsetData('stantler').learnset.calmmind = ["9M"];
		this.species.getLearnsetData('stantler').learnset.flash = ["9M"];
		this.species.getLearnsetData('stantler').learnset.hex = ["9M"];
		this.species.getLearnsetData('stantler').learnset.nastyplot = ["9M"];
		this.species.getLearnsetData('stantler').learnset.nightmare = ["9M"];
		delete this.species.getLearnsetData('stantler').learnset.earthquake;
		delete this.species.getLearnsetData('stantler').learnset.thunder;
		// Tyrogue
		this.species.getLearnsetData('tyrogue').learnset.submission = ["9D"];
		this.species.getLearnsetData('tyrogue').learnset.chipaway = ["9M"];
		delete this.species.getLearnsetData('tyrogue').learnset.earthquake;
		// Hitmontop
		this.species.getLearnsetData('hitmontop').learnset.victorydance = ["9D"];
		this.species.getLearnsetData('hitmontop').learnset.teeterdance = ["9L8"];
		this.species.getLearnsetData('hitmontop').learnset.gyroball = ["9L12","9M"];
		this.species.getLearnsetData('hitmontop').learnset.detect = ["9L16"];
		this.species.getLearnsetData('hitmontop').learnset.revenge = ["9L21"];
		this.species.getLearnsetData('hitmontop').learnset.entrainment = ["9L24"];
		this.species.getLearnsetData('hitmontop').learnset.wideguard = ["9L28"];
		this.species.getLearnsetData('hitmontop').learnset.quickguard = ["9L28"];
		this.species.getLearnsetData('hitmontop').learnset.suckerpunch = ["9L32"];
		this.species.getLearnsetData('hitmontop').learnset.agility = ["9L36"];
		this.species.getLearnsetData('hitmontop').learnset.dig = ["9L40","9M"];
		this.species.getLearnsetData('hitmontop').learnset.closecombat = ["9L44"];
		this.species.getLearnsetData('hitmontop').learnset.counter = ["9L48"];
		this.species.getLearnsetData('hitmontop').learnset.lashout = ["9L52"];
		this.species.getLearnsetData('hitmontop').learnset.chipaway = ["9M"];
		this.species.getLearnsetData('hitmontop').learnset.endeavor = ["9M"];
		// Smoochum
		this.species.getLearnsetData('smoochum').learnset.lovelykiss = ["9D"];
		this.species.getLearnsetData('smoochum').learnset.confide = ["9E"];
		this.species.getLearnsetData('smoochum').learnset.daydream = ["9L1"];
		this.species.getLearnsetData('smoochum').learnset.amnesia = ["9M"];
		this.species.getLearnsetData('smoochum').learnset.hex = ["9M"];
		this.species.getLearnsetData('smoochum').learnset.nightmare = ["9M"];
		// Elekid
		this.species.getLearnsetData('elekid').learnset.zingzap = ["9D"];
		this.species.getLearnsetData('elekid').learnset.flash = ["9M"];
		this.species.getLearnsetData('elekid').learnset.overdrive = ["9E"];
		// Magby
		this.species.getLearnsetData('magby').learnset.pelletshot = ["9D"];
		this.species.getLearnsetData('magby').learnset.amnesia = ["9M"];
		this.species.getLearnsetData('magby').learnset.flash = ["9M"];
		this.species.getLearnsetData('magby').learnset.sludgebomb = ["9M"];
		// Miltank
		this.species.getLearnsetData('miltank').learnset.megakick = ["9D"];
		this.species.getLearnsetData('miltank').learnset.steamroller = ["9L24"];
		this.species.getLearnsetData('miltank').learnset.safeguard = ["9L29","9M"];
		this.species.getLearnsetData('miltank').learnset.bodyslam = ["9L35"];
		this.species.getLearnsetData('miltank').learnset.zenheadbutt = ["9L41","9M"];
		this.species.getLearnsetData('miltank').learnset.captivate = ["9L47"];
		this.species.getLearnsetData('miltank').learnset.playrough = ["9L53"];
		this.species.getLearnsetData('miltank').learnset.healbell = ["9L59","9M"];
		this.species.getLearnsetData('miltank').learnset.highhorsepower = ["9L65"];
		this.species.getLearnsetData('miltank').learnset.endeavor = ["9L71","9M"];
		this.species.getLearnsetData('miltank').learnset.trailhead = ["9M"];
		delete this.species.getLearnsetData('miltank').learnset.thunder;
		delete this.species.getLearnsetData('miltank').learnset.wakeupslap;
		// Blissey
		this.species.getLearnsetData('blissey').learnset.happyhour = ["9D"];
		this.species.getLearnsetData('blissey').learnset.revivalblessing = ["9L0"];
		delete this.species.getLearnsetData('blissey').learnset.tantrum;
		delete this.species.getLearnsetData('blissey').learnset.trailhead;
		// Raikou
		this.species.getLearnsetData('raikou').learnset.extremespeed = ["9D"];
		this.species.getLearnsetData('raikou').learnset.electroball = ["9M"];
		this.species.getLearnsetData('raikou').learnset.flash = ["9M"];
		this.species.getLearnsetData('raikou').learnset.trailhead = ["9M"];
		// Entei
		this.species.getLearnsetData('entei').learnset.napalm = ["9D"];
		this.species.getLearnsetData('entei').learnset.flash = ["9M"];
		this.species.getLearnsetData('entei').learnset.trailhead = ["9M"];
		delete this.species.getLearnsetData('entei').learnset.extremespeed;
		delete this.species.getLearnsetData('entei').learnset.sacredfire;
		// Suicune
		this.species.getLearnsetData('suicune').learnset.sheercold = ["9D"];
		this.species.getLearnsetData('suicune').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('suicune').learnset.trailhead = ["9M"];
		delete this.species.getLearnsetData('suicune').learnset.extremespeed;
		delete this.species.getLearnsetData('suicune').learnset.toxic;
		// Larvitar
		this.species.getLearnsetData('larvitar').learnset.rage = ["9D"];
		this.species.getLearnsetData('larvitar').learnset.rockthrow = ["9L1"];
		this.species.getLearnsetData('larvitar').learnset.tussle = ["9L3"];
		this.species.getLearnsetData('larvitar').learnset.chipaway = ["9L24", "9M"];
		this.species.getLearnsetData('larvitar').learnset.darkpulse = ["9M"];
		// Pupitar
		this.species.getLearnsetData('pupitar').learnset.rage = ["9D"];
		this.species.getLearnsetData('pupitar').learnset.rockthrow = ["9L1"];
		this.species.getLearnsetData('pupitar').learnset.tussle = ["9L3"];
		this.species.getLearnsetData('pupitar').learnset.chipaway = ["9L24", "9M"];
		this.species.getLearnsetData('pupitar').learnset.darkpulse = ["9M"];
		// Tyranitar
		this.species.getLearnsetData('tyranitar').learnset.rage = ["9D"];
		this.species.getLearnsetData('tyranitar').learnset.rockthrow = ["9L1"];
		this.species.getLearnsetData('tyranitar').learnset.tussle = ["9L3"];
		this.species.getLearnsetData('tyranitar').learnset.chipaway = ["9L24", "9M"];
		this.species.getLearnsetData('tyranitar').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('tyranitar').learnset.darkpulse = ["9M"];
		this.species.getLearnsetData('tyranitar').learnset.nightmare = ["9M"];
		// Lugia
		this.species.getLearnsetData('lugia').learnset.psychoboost = ["9D"];
		this.species.getLearnsetData('lugia').learnset.gust = ["9L1"];
		this.species.getLearnsetData('lugia').learnset.mist = ["9L9"];
		this.species.getLearnsetData('lugia').learnset.fellswoop = ["9L15"];
		this.species.getLearnsetData('lugia').learnset.flash = ["9M"];
		this.species.getLearnsetData('lugia').learnset.nightmare = ["9M"];
		delete this.species.getLearnsetData('lugia').learnset.dragonrush;
		// Ho-oh
		this.species.getLearnsetData('hooh').learnset.burnup = ["9D"];
		this.species.getLearnsetData('hooh').learnset.gust = ["9L1"];
		this.species.getLearnsetData('hooh').learnset.lifedew = ["9L9"];
		this.species.getLearnsetData('hooh').learnset.flash = ["9M"];
		this.species.getLearnsetData('hooh').learnset.nightmare = ["9M"];
		// Celebi
		this.species.getLearnsetData('celebi').learnset.forestscurse = ["9D"];
		this.species.getLearnsetData('celebi').learnset.teleport = ["9L9"];
		this.species.getLearnsetData('celebi').learnset.magicalleaf = ["9L17"];
		this.species.getLearnsetData('celebi').learnset.ancientpower = ["9L25"];
		this.species.getLearnsetData('celebi').learnset.lifedew = ["9L33"];
		this.species.getLearnsetData('celebi').learnset.batonpass = ["9L41"];
		this.species.getLearnsetData('celebi').learnset.naturalgift = ["9L49", "9M"];
		this.species.getLearnsetData('celebi').learnset.healblock = ["9L57"];
		this.species.getLearnsetData('celebi').learnset.futuresight = ["9L65", "9M"];
		this.species.getLearnsetData('celebi').learnset.healingwish = ["9L73"];
		this.species.getLearnsetData('celebi').learnset.leafstorm = ["9L81"];
		this.species.getLearnsetData('celebi').learnset.perishsong = ["9L89"];
		this.species.getLearnsetData('celebi').learnset.safeguard = ["9M"];
		this.species.getLearnsetData('celebi').learnset.flash = ["9M"];
		this.species.getLearnsetData('celebi').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('celebi').learnset.trailhead = ["9M"];
		this.species.getLearnsetData('celebi').learnset.stasis = ["9T"];
		// Treecko
		this.species.getLearnsetData('treecko').learnset.dragondance = ["9D"];
		this.species.getLearnsetData('treecko').learnset.flash = ["9M"];
		this.species.getLearnsetData('treecko').learnset.naturalgift = ["9M"];
		this.species.getLearnsetData('treecko').learnset.trailhead = ["9M"];
		this.species.getLearnsetData('treecko').learnset.branchpoke = ["9E"];
		// Grovyle
		this.species.getLearnsetData('grovyle').learnset.dragondance = ["9D"];
		this.species.getLearnsetData('grovyle').learnset.flash = ["9M"];
		this.species.getLearnsetData('grovyle').learnset.naturalgift = ["9M"];
		this.species.getLearnsetData('grovyle').learnset.trailhead = ["9M"];
		// Sceptile
		this.species.getLearnsetData('sceptile').learnset.woodhammer = ["9D"];
		this.species.getLearnsetData('sceptile').learnset.solarblade = ["9L1"];
		this.species.getLearnsetData('sceptile').learnset.flash = ["9M"];
		this.species.getLearnsetData('sceptile').learnset.knockoff = ["9M"];
		this.species.getLearnsetData('sceptile').learnset.naturalgift = ["9M"];
		this.species.getLearnsetData('sceptile').learnset.trailhead = ["9M"];
		// Torchic
		this.species.getLearnsetData('torchic').learnset.pluck = ["9D"];
		this.species.getLearnsetData('torchic').learnset.trailhead = ["9M"];
		delete this.species.getLearnsetData('torchic').learnset.defog;
		// Combusken
		this.species.getLearnsetData('combusken').learnset.vacuumwave = ["9D"];
		this.species.getLearnsetData('combusken').learnset.trailhead = ["9M"];
		delete this.species.getLearnsetData('combusken').learnset.defog;
		// Blaziken
		this.species.getLearnsetData('blaziken').learnset.vacuumwave = ["9D"];
		this.species.getLearnsetData('blaziken').learnset.trailhead = ["9M"];
		delete this.species.getLearnsetData('blaziken').learnset.defog;
		// Mudkip
		this.species.getLearnsetData('mudkip').learnset.liquidation = ["9D"];
		this.species.getLearnsetData('mudkip').learnset.whitewater = ["9L4"];
		this.species.getLearnsetData('mudkip').learnset.wavecrash = ["9L36"];
		this.species.getLearnsetData('mudkip').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('mudkip').learnset.chipaway = ["9M"];
		delete this.species.getLearnsetData('mudkip').learnset.blizzard;
		delete this.species.getLearnsetData('mudkip').learnset.takedown;
		delete this.species.getLearnsetData('mudkip').learnset.watergun;
		// Marshtomp
		this.species.getLearnsetData('marshtomp').learnset.liquidation = ["9D"];
		this.species.getLearnsetData('marshtomp').learnset.whitewater = ["9L4"];
		this.species.getLearnsetData('marshtomp').learnset.wavecrash = ["9L42"];
		this.species.getLearnsetData('marshtomp').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('marshtomp').learnset.chipaway = ["9M"];
		this.species.getLearnsetData('marshtomp').learnset.knockoff = ["9M"];
		delete this.species.getLearnsetData('marshtomp').learnset.blizzard;
		delete this.species.getLearnsetData('marshtomp').learnset.takedown;
		delete this.species.getLearnsetData('marshtomp').learnset.watergun;
		// Swampert
		this.species.getLearnsetData('swampert').learnset.liquidation = ["9D"];
		this.species.getLearnsetData('swampert').learnset.jetpunch = ["9L0"];
		this.species.getLearnsetData('swampert').learnset.whitewater = ["9L4"];
		this.species.getLearnsetData('swampert').learnset.wavecrash = ["9L44"];
		this.species.getLearnsetData('swampert').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('swampert').learnset.chipaway = ["9M"];
		this.species.getLearnsetData('swampert').learnset.knockoff = ["9M"];
		delete this.species.getLearnsetData('swampert').learnset.blizzard;
		delete this.species.getLearnsetData('swampert').learnset.takedown;
		delete this.species.getLearnsetData('swampert').learnset.watergun;
		// Poochyena
		this.species.getLearnsetData('poochyena').learnset.partingshot = ["9D"];
		this.species.getLearnsetData('poochyena').learnset.compensation = ["9M"];
		this.species.getLearnsetData('poochyena').learnset.toxic = ["9M"];
		this.species.getLearnsetData('poochyena').learnset.trailhead = ["9M"];
		// Mightyena
		this.species.getLearnsetData('mightyena').learnset.partingshot = ["9D"];
		this.species.getLearnsetData('mightyena').learnset.compensation = ["9M"];
		this.species.getLearnsetData('mightyena').learnset.toxic = ["9M"];
		this.species.getLearnsetData('mightyena').learnset.trailhead = ["9M"];
		// Zigzagoon
		this.species.getLearnsetData('zigzagoon').learnset.extremespeed = ["9D"];
		this.species.getLearnsetData('zigzagoon').learnset.odorsleuth = ["9L12"];
		this.species.getLearnsetData('zigzagoon').learnset.headbutt = ["9L15"];
		this.species.getLearnsetData('zigzagoon').learnset.babydolleyes = ["9L18"];
		this.species.getLearnsetData('zigzagoon').learnset.pinmissile = ["9L21"];
		this.species.getLearnsetData('zigzagoon').learnset.rest = ["9L24", "9M"];
		this.species.getLearnsetData('zigzagoon').learnset.takedown = ["9L27"];
		this.species.getLearnsetData('zigzagoon').learnset.fling = ["9L30", "9M"];
		this.species.getLearnsetData('zigzagoon').learnset.flail = ["9L33"];
		this.species.getLearnsetData('zigzagoon').learnset.bellydrum = ["9L36"];
		this.species.getLearnsetData('zigzagoon').learnset.doubleedge = ["9L39"];
		this.species.getLearnsetData('zigzagoon').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('zigzagoon').learnset.trailhead = ["9M"];
		delete this.species.getLearnsetData('zigzagoon').learnset.blizzard;
		delete this.species.getLearnsetData('zigzagoon').learnset.icebeam;
		delete this.species.getLearnsetData('zigzagoon').learnset.thunder;
		delete this.species.getLearnsetData('zigzagoon').learnset.thunderbolt;
		// Zigzagoon Galar
		this.species.getLearnsetData('zigzagoongalar').learnset.pounce = ["9D"];
		this.species.getLearnsetData('zigzagoongalar').learnset.odorsleuth = ["9L12"];
		this.species.getLearnsetData('zigzagoongalar').learnset.headbutt = ["9L15"];
		this.species.getLearnsetData('zigzagoongalar').learnset.honeclaws = ["9L18", "9M"];
		this.species.getLearnsetData('zigzagoongalar').learnset.pinmissile = ["9L21"];
		this.species.getLearnsetData('zigzagoongalar').learnset.rest = ["9L24", "9M"];
		this.species.getLearnsetData('zigzagoongalar').learnset.takedown = ["9L27"];
		this.species.getLearnsetData('zigzagoongalar').learnset.terrify = ["9L30"];
		this.species.getLearnsetData('zigzagoongalar').learnset.counter = ["9L33"];
		this.species.getLearnsetData('zigzagoongalar').learnset.taunt = ["9L36", "9M"];
		this.species.getLearnsetData('zigzagoongalar').learnset.doubleedge = ["9L39"];
		this.species.getLearnsetData('zigzagoongalar').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('zigzagoongalar').learnset.echoedvoice = ["9M"];
		this.species.getLearnsetData('zigzagoongalar').learnset.embargo = ["9M"];
		this.species.getLearnsetData('zigzagoongalar').learnset.lastresort = ["9M"];
		this.species.getLearnsetData('zigzagoongalar').learnset.rocksmash = ["9M"];
		this.species.getLearnsetData('zigzagoongalar').learnset.snatch = ["9M"];
		this.species.getLearnsetData('zigzagoongalar').learnset.spite = ["9M"];
		this.species.getLearnsetData('zigzagoongalar').learnset.toxic = ["9M"];
		this.species.getLearnsetData('zigzagoongalar').learnset.torment = ["9M"];
		this.species.getLearnsetData('zigzagoongalar').learnset.trailhead = ["9M"];
		this.species.getLearnsetData('zigzagoongalar').learnset.pursuit = ["9E"];
		delete this.species.getLearnsetData('zigzagoongalar').learnset.blizzard;
		delete this.species.getLearnsetData('zigzagoongalar').learnset.icebeam;
		delete this.species.getLearnsetData('zigzagoongalar').learnset.scaryface;
		delete this.species.getLearnsetData('zigzagoongalar').learnset.thunder;
		delete this.species.getLearnsetData('zigzagoongalar').learnset.thunderbolt;
		// Linoone
		this.species.getLearnsetData('linoone').learnset.extremespeed = ["9D"];
		this.species.getLearnsetData('linoone').learnset.playrough = ["9L1"];
		this.species.getLearnsetData('linoone').learnset.rototiller = ["9L1"];
		this.species.getLearnsetData('linoone').learnset.odorsleuth = ["9L12"];
		this.species.getLearnsetData('linoone').learnset.headbutt = ["9L15"];
		this.species.getLearnsetData('linoone').learnset.babydolleyes = ["9L18"];
		this.species.getLearnsetData('linoone').learnset.furyswipes = ["9L21"];
		this.species.getLearnsetData('linoone').learnset.rest = ["9L28", "9M"];
		this.species.getLearnsetData('linoone').learnset.takedown = ["9L33"];
		this.species.getLearnsetData('linoone').learnset.fling = ["9L38", "9M"];
		this.species.getLearnsetData('linoone').learnset.flail = ["9L43"];
		this.species.getLearnsetData('linoone').learnset.bellydrum = ["9L48"];
		this.species.getLearnsetData('linoone').learnset.doubleedge = ["9L53"];
		this.species.getLearnsetData('linoone').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('linoone').learnset.trailhead = ["9M"];
		this.species.getLearnsetData('linoone').learnset.xscissor = ["9M"];
		delete this.species.getLearnsetData('linoone').learnset.babydolleyes;
		delete this.species.getLearnsetData('linoone').learnset.blizzard;
		delete this.species.getLearnsetData('linoone').learnset.pinmissile;
		delete this.species.getLearnsetData('linoone').learnset.thunder;
		// Linoone Galar
		this.species.getLearnsetData('linoonegalar').learnset.throatchop = ["9D"];
		this.species.getLearnsetData('linoonegalar').learnset.playrough = ["9L1"];
		this.species.getLearnsetData('linoonegalar').learnset.tussle = ["9L1"];
		this.species.getLearnsetData('linoonegalar').learnset.odorsleuth = ["9L12"];
		this.species.getLearnsetData('linoonegalar').learnset.headbutt = ["9L15"];
		this.species.getLearnsetData('linoonegalar').learnset.honeclaws = ["9L18", "9M"];
		this.species.getLearnsetData('linoonegalar').learnset.furyswipes = ["9L21"];
		this.species.getLearnsetData('linoonegalar').learnset.rest = ["9L28", "9M"];
		this.species.getLearnsetData('linoonegalar').learnset.takedown = ["9L33"];
		this.species.getLearnsetData('linoonegalar').learnset.terrify = ["9L38"];
		this.species.getLearnsetData('linoonegalar').learnset.counter = ["9L43"];
		this.species.getLearnsetData('linoonegalar').learnset.taunt = ["9L48", "9M"];
		this.species.getLearnsetData('linoonegalar').learnset.doubleedge = ["9L53"];
		this.species.getLearnsetData('linoonegalar').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('linoonegalar').learnset.echoedvoice = ["9M"];
		this.species.getLearnsetData('linoonegalar').learnset.embargo = ["9M"];
		this.species.getLearnsetData('linoonegalar').learnset.lastresort = ["9M"];
		this.species.getLearnsetData('linoonegalar').learnset.rocksmash = ["9M"];
		this.species.getLearnsetData('linoonegalar').learnset.snatch = ["9M"];
		this.species.getLearnsetData('linoonegalar').learnset.spite = ["9M"];
		this.species.getLearnsetData('linoonegalar').learnset.torment = ["9M"];
		this.species.getLearnsetData('linoonegalar').learnset.toxic = ["9M"];
		this.species.getLearnsetData('linoonegalar').learnset.trailhead = ["9M"];
		this.species.getLearnsetData('linoonegalar').learnset.xscissor = ["9M"];
		delete this.species.getLearnsetData('linoonegalar').learnset.babydolleyes;
		delete this.species.getLearnsetData('linoonegalar').learnset.blizzard;
		delete this.species.getLearnsetData('linoonegalar').learnset.bodypress;
		delete this.species.getLearnsetData('linoonegalar').learnset.pinmissile;
		delete this.species.getLearnsetData('linoonegalar').learnset.scaryface;
		delete this.species.getLearnsetData('linoonegalar').learnset.thunder;
		// Beautifly
		this.species.getLearnsetData('beautifly').learnset.drainingkiss = ["9D"];
		this.species.getLearnsetData('beautifly').learnset.leechlife = ["9L20","9M"];
		this.species.getLearnsetData('beautifly').learnset.vitaldrain = ["9L37","9M"];
		this.species.getLearnsetData('beautifly').learnset.charm = ["9M"];
		this.species.getLearnsetData('beautifly').learnset.flash = ["9M"];
		this.species.getLearnsetData('beautifly').learnset.naturalgift = ["9M"];
		delete this.species.getLearnsetData('beautifly').learnset.aircutter;
		delete this.species.getLearnsetData('beautifly').learnset.rage;
		// Dustox
		this.species.getLearnsetData('dustox').learnset.nightdaze = ["9D"];
		this.species.getLearnsetData('dustox').learnset.flash = ["9M"];
		this.species.getLearnsetData('dustox').learnset.naturalgift = ["9M"];
		this.species.getLearnsetData('dustox').learnset.toxic = ["9L38", "9M"];
		// Lotad
		this.species.getLearnsetData('lotad').learnset.soak = ["9D"];
		this.species.getLearnsetData('lotad').learnset.bubble = ["9L6"];
		this.species.getLearnsetData('lotad').learnset.naturalgift = ["9L15", "9M"];
		this.species.getLearnsetData('lotad').learnset.bubblebeam = ["9L18"];
		this.species.getLearnsetData('lotad').learnset.naturepower = ["9L21", "9M"];
		this.species.getLearnsetData('lotad').learnset.raindance = ["9L24", "9M"];
		this.species.getLearnsetData('lotad').learnset.gigadrain = ["9L27", "9M"];
		this.species.getLearnsetData('lotad').learnset.zenheadbutt = ["9L30", "9M"];
		this.species.getLearnsetData('lotad').learnset.energyball = ["9L33"];
		this.species.getLearnsetData('lotad').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('lotad').learnset.flail = ["9M"];
		delete this.species.getLearnsetData('lotad').learnset.blizzard;
		// Lombre
		this.species.getLearnsetData('lombre').learnset.soak = ["9D"];
		this.species.getLearnsetData('lombre').learnset.furyswipes = ["9L0"];
		this.species.getLearnsetData('lombre').learnset.bubble = ["9L6"];
		this.species.getLearnsetData('lombre').learnset.naturalgift = ["9L16", "9M"];
		this.species.getLearnsetData('lombre').learnset.fakeout = ["9L20"];
		this.species.getLearnsetData('lombre').learnset.bubblebeam = ["9L24"];
		this.species.getLearnsetData('lombre').learnset.grasswhistle = ["9L28"];
		this.species.getLearnsetData('lombre').learnset.naturepower = ["9L32", "9M"];
		this.species.getLearnsetData('lombre').learnset.raindance = ["9L36", "9M"];
		this.species.getLearnsetData('lombre').learnset.gigadrain = ["9L40", "9M"];
		this.species.getLearnsetData('lombre').learnset.zenheadbutt = ["9L44", "9M"];
		this.species.getLearnsetData('lombre').learnset.knockoff = ["9L48", "9M"];
		this.species.getLearnsetData('lombre').learnset.teeterdance = ["9L52"];
		this.species.getLearnsetData('lombre').learnset.energyball = ["9L56"];
		this.species.getLearnsetData('lombre').learnset.hydropump = ["9L60", "9M"];
		this.species.getLearnsetData('lombre').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('lombre').learnset.flail = ["9M"];
		delete this.species.getLearnsetData('lombre').learnset.blizzard;
		// Ludicolo
		this.species.getLearnsetData('ludicolo').learnset.drumbeating = ["9D"];
		this.species.getLearnsetData('ludicolo').learnset.aquastep = ["9L0"];
		this.species.getLearnsetData('ludicolo').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('ludicolo').learnset.naturalgift = ["9M"];
		this.species.getLearnsetData('ludicolo').learnset.flail = ["9M"];
		delete this.species.getLearnsetData('ludicolo').learnset.blizzard;
		// Seedot
		this.species.getLearnsetData('seedot').learnset.irondefense = ["9D"];
		this.species.getLearnsetData('seedot').learnset.bide = ["9L3"];
		this.species.getLearnsetData('seedot').learnset.branchpoke = ["9L9"];
		this.species.getLearnsetData('seedot').learnset.growth = ["9L15"];
		this.species.getLearnsetData('seedot').learnset.naturalgift = ["9M"];
		this.species.getLearnsetData('seedot').learnset.trailhead = ["9M"];
		this.species.getLearnsetData('seedot').learnset.falsesurrender = ["9E"];
		delete this.species.getLearnsetData('seedot').learnset.absorb;
		delete this.species.getLearnsetData('seedot').learnset.defog;
		delete this.species.getLearnsetData('seedot').learnset.megadrain;
		delete this.species.getLearnsetData('seedot').learnset.nightslash;
		// Nuzleaf
		this.species.getLearnsetData('nuzleaf').learnset.forestscurse = ["9D"];
		this.species.getLearnsetData('nuzleaf').learnset.bide = ["9L3"];
		this.species.getLearnsetData('nuzleaf').learnset.branchpoke = ["9L9"];
		this.species.getLearnsetData('nuzleaf').learnset.growth = ["9L16"];
		this.species.getLearnsetData('nuzleaf').learnset.fakeout = ["9L20"];
		this.species.getLearnsetData('nuzleaf').learnset.payback = ["9L24"];
		this.species.getLearnsetData('nuzleaf').learnset.grasswhistle = ["9L28"];
		this.species.getLearnsetData('nuzleaf').learnset.naturepower = ["9L32", "9M"];
		this.species.getLearnsetData('nuzleaf').learnset.sunnyday = ["9L36", "9M"];
		this.species.getLearnsetData('nuzleaf').learnset.synthesis = ["9L40", "9M"];
		this.species.getLearnsetData('nuzleaf').learnset.extrasensory = ["9L44"];
		this.species.getLearnsetData('nuzleaf').learnset.suckerpunch = ["9L48"];
		this.species.getLearnsetData('nuzleaf').learnset.swagger = ["9L52"];
		this.species.getLearnsetData('nuzleaf').learnset.leafblade = ["9L56"];
		this.species.getLearnsetData('nuzleaf').learnset.explosion = ["9L60", "9M"];
		this.species.getLearnsetData('nuzleaf').learnset.naturalgift = ["9M"];
		this.species.getLearnsetData('nuzleaf').learnset.trailhead = ["9M"];
		delete this.species.getLearnsetData('nuzleaf').learnset.absorb;
		delete this.species.getLearnsetData('nuzleaf').learnset.megadrain;
		// Shiftry
		this.species.getLearnsetData('shiftry').learnset.forestscurse = ["9D"];
		this.species.getLearnsetData('shiftry').learnset.razorwind = ["9L0"];
		this.species.getLearnsetData('shiftry').learnset.grasswhistle = ["9L1"];
		this.species.getLearnsetData('shiftry').learnset.leaftornado = ["9L1"];
		this.species.getLearnsetData('shiftry').learnset.solarblade = ["9L1"];
		this.species.getLearnsetData('shiftry').learnset.naturalgift = ["9M"];
		this.species.getLearnsetData('shiftry').learnset.trailhead = ["9M"];
		delete this.species.getLearnsetData('shiftry').learnset.bounce;
		// Taillow
		this.species.getLearnsetData('taillow').learnset.featherdance = ["9D"];
		// Swellow
		this.species.getLearnsetData('swellow').learnset.featherdance = ["9D"];
		// Wingull
		this.species.getLearnsetData('wingull').learnset.belch = ["9D"];
		delete this.species.getLearnsetData('wingull').learnset.knockoff;
		// Pelipper
		this.species.getLearnsetData('pelipper').learnset.belch = ["9D"];
		delete this.species.getLearnsetData('pelipper').learnset.knockoff;
		// Ralts
		this.species.getLearnsetData('ralts').learnset.sing = ["9D"];
		this.species.getLearnsetData('ralts').learnset.confide = ["9L1"];
		this.species.getLearnsetData('ralts').learnset.confusion = ["9L1"];
		this.species.getLearnsetData('ralts').learnset.daydream = ["9L4"];
		this.species.getLearnsetData('ralts').learnset.flash = ["9M"];
		this.species.getLearnsetData('ralts').learnset.nightmare = ["9M"];
		delete this.species.getLearnsetData('ralts').learnset.knockoff;
		delete this.species.getLearnsetData('ralts').learnset.thunderbolt;
		// Kirlia
		this.species.getLearnsetData('kirlia').learnset.sing = ["9D"];
		this.species.getLearnsetData('kirlia').learnset.confide = ["9L1"];
		this.species.getLearnsetData('kirlia').learnset.confusion = ["9L1"];
		this.species.getLearnsetData('kirlia').learnset.daydream = ["9L4"];
		this.species.getLearnsetData('kirlia').learnset.flash = ["9M"];
		this.species.getLearnsetData('kirlia').learnset.nightmare = ["9M"];
		delete this.species.getLearnsetData('kirlia').learnset.knockoff;
		delete this.species.getLearnsetData('kirlia').learnset.thunderbolt;
		// Gardevoir
		this.species.getLearnsetData('gardevoir').learnset.sing = ["9D"];
		this.species.getLearnsetData('gardevoir').learnset.confide = ["9L1"];
		this.species.getLearnsetData('gardevoir').learnset.confusion = ["9L1"];
		this.species.getLearnsetData('gardevoir').learnset.daydream = ["9L4"];
		this.species.getLearnsetData('gardevoir').learnset.flash = ["9M"];
		this.species.getLearnsetData('gardevoir').learnset.nightmare = ["9M"];
		delete this.species.getLearnsetData('gardevoir').learnset.knockoff;
		// Surskit
		this.species.getLearnsetData('surskit').learnset.aquajet = ["9D"];
		delete this.species.getLearnsetData('surskit').learnset.blizzard;
		// Masquerain
		this.species.getLearnsetData('masquerain').learnset.glare = ["9D"];
		this.species.getLearnsetData('masquerain').learnset.terrify = ["9L22"];
		this.species.getLearnsetData('masquerain').learnset.nightmare = ["9M"];
		delete this.species.getLearnsetData('masquerain').learnset.blizzard;
		delete this.species.getLearnsetData('masquerain').learnset.scaryface;
		// Shroomish
		this.species.getLearnsetData('shroomish').learnset.doubleedge = ["9D"];
		this.species.getLearnsetData('shroomish').learnset.naturalgift = ["9M"];
		this.species.getLearnsetData('shroomish').learnset.toxic = ["9L33", "9M"];
		delete this.species.getLearnsetData('shroomish').learnset.synthesis;
		// Breloom
		this.species.getLearnsetData('breloom').learnset.jumpkick = ["9D"];
		this.species.getLearnsetData('breloom').learnset.focuspunch = ["9L55"];
		this.species.getLearnsetData('breloom').learnset.naturalgift = ["9M"];
		this.species.getLearnsetData('breloom').learnset.toxic = ["9M"];
		delete this.species.getLearnsetData('breloom').learnset.synthesis;
		// Slakoth
		this.species.getLearnsetData('slakoth').learnset.bide = ["9D"];
		this.species.getLearnsetData('slakoth').learnset.chillywater = ["9M"];
		delete this.species.getLearnsetData('slakoth').learnset.blizzard;
		delete this.species.getLearnsetData('slakoth').learnset.flamethrower;
		delete this.species.getLearnsetData('slakoth').learnset.fireblast;
		delete this.species.getLearnsetData('slakoth').learnset.icebeam;
		delete this.species.getLearnsetData('slakoth').learnset.metronome;
		delete this.species.getLearnsetData('slakoth').learnset.thunder;
		delete this.species.getLearnsetData('slakoth').learnset.thunderbolt;
		// Vigoroth
		this.species.getLearnsetData('vigoroth').learnset.bide = ["9D"];
		this.species.getLearnsetData('vigoroth').learnset.compensation = ["9M"];
		this.species.getLearnsetData('vigoroth').learnset.chillywater = ["9M"];
		delete this.species.getLearnsetData('vigoroth').learnset.blizzard;
		delete this.species.getLearnsetData('vigoroth').learnset.earthquake;
		delete this.species.getLearnsetData('vigoroth').learnset.flamethrower;
		delete this.species.getLearnsetData('vigoroth').learnset.fireblast;
		delete this.species.getLearnsetData('vigoroth').learnset.icebeam;
		delete this.species.getLearnsetData('vigoroth').learnset.metronome;
		delete this.species.getLearnsetData('vigoroth').learnset.thunder;
		delete this.species.getLearnsetData('vigoroth').learnset.thunderbolt;
		// Slaking
		this.species.getLearnsetData('slaking').learnset.bide = ["9D"];
		this.species.getLearnsetData('slaking').learnset.bodypress = ["9M"];
		this.species.getLearnsetData('slaking').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('slaking').learnset.compensation = ["9M"];
		delete this.species.getLearnsetData('slaking').learnset.blizzard;
		delete this.species.getLearnsetData('slaking').learnset.metronome;
		delete this.species.getLearnsetData('slaking').learnset.fireblast;
		delete this.species.getLearnsetData('slaking').learnset.thunder;
		// Nincada
		this.species.getLearnsetData('nincada').learnset.detect = ["9D"];
		this.species.getLearnsetData('nincada').learnset.cut = ["9E"];
		this.species.getLearnsetData('nincada').learnset.leechlife = ["9L5"];
		this.species.getLearnsetData('nincada').learnset.vitaldrain = ["9M"];
		delete this.species.getLearnsetData('nincada').learnset.absorb;
		// Ninjask
		this.species.getLearnsetData('ninjask').learnset.aircutter = ["9D"];
		this.species.getLearnsetData('ninjask').learnset.flash = ["9M"];
		this.species.getLearnsetData('ninjask').learnset.leechlife = ["9L5"];
		this.species.getLearnsetData('ninjask').learnset.vitaldrain = ["9M"];
		delete this.species.getLearnsetData('ninjask').learnset.absorb;
		// Shedinja
		this.species.getLearnsetData('shedinja').learnset.playdead = ["9D"];
		this.species.getLearnsetData('shedinja').learnset.leechlife = ["9L5"];
		this.species.getLearnsetData('shedinja').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('shedinja').learnset.stasis = ["9M"];
		this.species.getLearnsetData('shedinja').learnset.vitaldrain = ["9M"];
		delete this.species.getLearnsetData('shedinja').learnset.absorb;
		// Whismur
		this.species.getLearnsetData('whismur').learnset.teeterdance = ["9D"];
		this.species.getLearnsetData('whismur').learnset.chillywater = ["9M"];
		delete this.species.getLearnsetData('whismur').learnset.blizzard;
		delete this.species.getLearnsetData('whismur').learnset.fireblast;
		delete this.species.getLearnsetData('whismur').learnset.flamethrower;
		delete this.species.getLearnsetData('whismur').learnset.icebeam;
		// Loudred
		this.species.getLearnsetData('loudred').learnset.teeterdance = ["9D"];
		this.species.getLearnsetData('loudred').learnset.chillywater = ["9M"];
		delete this.species.getLearnsetData('loudred').learnset.blizzard;
		delete this.species.getLearnsetData('loudred').learnset.fireblast;
		delete this.species.getLearnsetData('loudred').learnset.flamethrower;
		delete this.species.getLearnsetData('loudred').learnset.icebeam;
		// Exploud
		this.species.getLearnsetData('exploud').learnset.teeterdance = ["9D"];
		this.species.getLearnsetData('exploud').learnset.bodypress = ["9M"];
		this.species.getLearnsetData('exploud').learnset.chillywater = ["9M"];
		delete this.species.getLearnsetData('exploud').learnset.blizzard;
		delete this.species.getLearnsetData('exploud').learnset.fireblast;
		// Makuhita
		this.species.getLearnsetData('makuhita').learnset.matblock = ["9D"];
		this.species.getLearnsetData('makuhita').learnset.bodypress = ["9L34","9M"];
		delete this.species.getLearnsetData('makuhita').learnset.earthquake;
		delete this.species.getLearnsetData('makuhita').learnset.wakeupslap;
		// Hariyama
		this.species.getLearnsetData('hariyama').learnset.matblock = ["9D"];
		this.species.getLearnsetData('hariyama').learnset.bodypress = ["9L34","9M"];
		delete this.species.getLearnsetData('hariyama').learnset.wakeupslap;
		// Azurill
		this.species.getLearnsetData('azurill').learnset.doubleedge = ["9D"];
		this.species.getLearnsetData('azurill').learnset.chillywater = ["9M"];
		delete this.species.getLearnsetData('azurill').learnset.blizzard;
		delete this.species.getLearnsetData('azurill').learnset.icebeam;
		// Nosepass
		this.species.getLearnsetData('nosepass').learnset.electrify = ["9D"];
		this.species.getLearnsetData('nosepass').learnset.headsmash = ["9E"];
		delete this.species.getLearnsetData('nosepass').learnset.thunder;
		// Skitty
		this.species.getLearnsetData('skitty').learnset.payday = ["9D"];
		this.species.getLearnsetData('skitty').learnset.amnesia = ["9M"];
		this.species.getLearnsetData('skitty').learnset.chillywater = ["9M"];
		delete this.species.getLearnsetData('skitty').learnset.blizzard;
		delete this.species.getLearnsetData('skitty').learnset.icebeam;
		delete this.species.getLearnsetData('skitty').learnset.thunder;
		delete this.species.getLearnsetData('skitty').learnset.thunderbolt;
		// Delcatty
		this.species.getLearnsetData('delcatty').learnset.payday = ["9D"];
		this.species.getLearnsetData('delcatty').learnset.amnesia = ["9M"];
		this.species.getLearnsetData('delcatty').learnset.chillywater = ["9M"];
		delete this.species.getLearnsetData('delcatty').learnset.blizzard;
		delete this.species.getLearnsetData('delcatty').learnset.thunder;
		// Sableye
		this.species.getLearnsetData('sableye').learnset.crunch = ["9D"];
		this.species.getLearnsetData('sableye').learnset.flash = ["9M"];
		this.species.getLearnsetData('sableye').learnset.nightmare = ["9M"];
		// Mawile
		this.species.getLearnsetData('mawile').learnset.jawlock = ["9D"];
		delete this.species.getLearnsetData('mawile').learnset.blizzard;
		delete this.species.getLearnsetData('mawile').learnset.fireblast;
		delete this.species.getLearnsetData('mawile').learnset.flamethrower;
		delete this.species.getLearnsetData('mawile').learnset.icebeam;
		delete this.species.getLearnsetData('mawile').learnset.thunder;
		delete this.species.getLearnsetData('mawile').learnset.thunderbolt;
		// Aron
		this.species.getLearnsetData('aron').learnset.scaryface = ["9D"];
		this.species.getLearnsetData('aron').learnset.fullcollide = ["9M"];
		delete this.species.getLearnsetData('aron').learnset.earthquake;
		// Lairon
		this.species.getLearnsetData('lairon').learnset.scaryface = ["9D"];
		this.species.getLearnsetData('lairon').learnset.fullcollide = ["9M"];
		// Aggron
		this.species.getLearnsetData('aggron').learnset.rototiller = ["9D"];
		this.species.getLearnsetData('aggron').learnset.breakingswipe = ["9M"];
		this.species.getLearnsetData('aggron').learnset.fullcollide = ["9M"];
		// Meditite
		this.species.getLearnsetData('meditite').learnset.vacuumwave = ["9D"];
		this.species.getLearnsetData('meditite').learnset.amnesia = ["9M"];
		this.species.getLearnsetData('meditite').learnset.chipaway = ["9M"];
		this.species.getLearnsetData('meditite').learnset.mindbend = ["9L7"];
		this.species.getLearnsetData('meditite').learnset.poweruppunch = ["9E"];
		delete this.species.getLearnsetData('meditite').learnset.confusion;
		// Medicham
		this.species.getLearnsetData('medicham').learnset.vacuumwave = ["9D"];
		this.species.getLearnsetData('medicham').learnset.amnesia = ["9M"];
		this.species.getLearnsetData('medicham').learnset.chipaway = ["9M"];
		this.species.getLearnsetData('medicham').learnset.mindbend = ["9L7"];
		delete this.species.getLearnsetData('medicham').learnset.confusion;
		// Electrike
		this.species.getLearnsetData('electrike').learnset.playrough = ["9D"];
		this.species.getLearnsetData('electrike').learnset.flash = ["9M"];
		this.species.getLearnsetData('electrike').learnset.trailhead = ["9M"];
		delete this.species.getLearnsetData('electrike').learnset.flamethrower;
		// Manectric
		this.species.getLearnsetData('manectric').learnset.playrough = ["9D"];
		this.species.getLearnsetData('manectric').learnset.flash = ["9M"];
		this.species.getLearnsetData('manectric').learnset.trailhead = ["9M"];
		// Plusle
		this.species.getLearnsetData('plusle').learnset.magneticflux = ["9D"];
		this.species.getLearnsetData('plusle').learnset.flash = ["9M"];
		this.species.getLearnsetData('plusle').learnset.trailhead = ["9M"];
		// Minun
		this.species.getLearnsetData('minun').learnset.magneticflux = ["9D"];
		this.species.getLearnsetData('minun').learnset.flash = ["9M"];;
		this.species.getLearnsetData('minun').learnset.trailhead = ["9M"];
		// Volbeat
		this.species.getLearnsetData('volbeat').learnset.spotlight = ["9D"];
		this.species.getLearnsetData('volbeat').learnset.bugcloud = ["9L1"];
		this.species.getLearnsetData('volbeat').learnset.flash = ["9L1", "9M"];
		delete this.species.getLearnsetData('volbeat').learnset.thunder;
		// Illumise
		this.species.getLearnsetData('illumise').learnset.ragepowder = ["9D"];
		this.species.getLearnsetData('illumise').learnset.bugcloud = ["9L1"];
		this.species.getLearnsetData('illumise').learnset.flash = ["9M"];
		this.species.getLearnsetData('illumise').learnset.toxic = ["9M"];
		delete this.species.getLearnsetData('illumise').learnset.thunder;
		// Roselia
		this.species.getLearnsetData('roselia').learnset.captivate = ["9D"];
		this.species.getLearnsetData('roselia').learnset.grasswhistle = ["9L19"];
		this.species.getLearnsetData('roselia').learnset.magicalleaf = ["9L22"];
		this.species.getLearnsetData('roselia').learnset.sweetscent = ["9L25"];
		this.species.getLearnsetData('roselia').learnset.gigadrain = ["9L31"];
		this.species.getLearnsetData('roselia').learnset.lifedew = ["9L37"];
		this.species.getLearnsetData('roselia').learnset.petalblizzard = ["9L40"];
		this.species.getLearnsetData('roselia').learnset.toxic = ["9L43","9M"];
		this.species.getLearnsetData('roselia').learnset.aromatherapy = ["9L46"];
		this.species.getLearnsetData('roselia').learnset.synthesis = ["9L49","9M"];
		this.species.getLearnsetData('roselia').learnset.petaldance = ["9L52"];
		this.species.getLearnsetData('roselia').learnset.naturalgift = ["9M"];
		// Gulpin
		this.species.getLearnsetData('gulpin').learnset.rebound = ["9D"];
		this.species.getLearnsetData('gulpin').learnset.toxic = ["9L28","9M"];
		this.species.getLearnsetData('gulpin').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('gulpin').learnset.nightmare = ["9M"];
		delete this.species.getLearnsetData('gulpin').learnset.blizzard;
		delete this.species.getLearnsetData('gulpin').learnset.icebeam;
		// Swalot
		this.species.getLearnsetData('swalot').learnset.rebound = ["9D"];
		this.species.getLearnsetData('swalot').learnset.toxic = ["9L31","9M"];
		this.species.getLearnsetData('swalot').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('swalot').learnset.nightmare = ["9M"];
		delete this.species.getLearnsetData('swalot').learnset.blizzard;
		delete this.species.getLearnsetData('swalot').learnset.metronome;
		// Carvanha
		this.species.getLearnsetData('carvanha').learnset.fishiousrend = ["9D"];
		this.species.getLearnsetData('carvanha').learnset.liquidation = ["9L32"];
		this.species.getLearnsetData('carvanha').learnset.chillywater = ["9M"];
		delete this.species.getLearnsetData('carvanha').learnset.blizzard;
		delete this.species.getLearnsetData('carvanha').learnset.earthquake;
		delete this.species.getLearnsetData('carvanha').learnset.poisonfang;
		// Sharpedo
		this.species.getLearnsetData('sharpedo').learnset.fishiousrend = ["9D"];
		this.species.getLearnsetData('sharpedo').learnset.liquidation = ["9L34"];
		this.species.getLearnsetData('sharpedo').learnset.chillywater = ["9M"];
		delete this.species.getLearnsetData('sharpedo').learnset.blizzard;
		delete this.species.getLearnsetData('sharpedo').learnset.poisonfang;
		// Wailmer
		this.species.getLearnsetData('wailmer').learnset.slackoff = ["9D"];
		this.species.getLearnsetData('wailmer').learnset.watergun = ["9L1"];
		this.species.getLearnsetData('wailmer').learnset.whitewater = ["9L7"];
		this.species.getLearnsetData('wailmer').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('wailmer').learnset.rebound = ["9E"];
		this.species.getLearnsetData('wailmer').learnset.wavecrash = ["9E"];
		delete this.species.getLearnsetData('wailmer').learnset.blizzard;
		delete this.species.getLearnsetData('wailmer').learnset.earthquake;
		// Wailord
		this.species.getLearnsetData('wailord').learnset.slackoff = ["9D"];
		this.species.getLearnsetData('wailord').learnset.watergun = ["9L1"];
		this.species.getLearnsetData('wailord').learnset.whitewater = ["9L7"];
		this.species.getLearnsetData('wailord').learnset.chillywater = ["9M"];
		// Numel
		this.species.getLearnsetData('numel').learnset.highhorsepower = ["9D"];
		// Camerupt
		this.species.getLearnsetData('camerupt').learnset.highhorsepower = ["9D"];
		this.species.getLearnsetData('camerupt').learnset.bodypress = ["9M"];
		this.species.getLearnsetData('camerupt').learnset.compensation = ["9M"];
		// Torkoal
		this.species.getLearnsetData('torkoal').learnset.shelltrap = ["9D"];
		this.species.getLearnsetData('torkoal').learnset.flash = ["9M"];
		this.species.getLearnsetData('torkoal').learnset.fullcollide = ["9M"];
		this.species.getLearnsetData('torkoal').learnset.tarshot = ["9L53"];
		// Spoink
		this.species.getLearnsetData('spoink').learnset.springleap = ["9D"];
		this.species.getLearnsetData('spoink').learnset.psywave = ["9L1"];
		this.species.getLearnsetData('spoink').learnset.barrierbash = ["9L5"];
		this.species.getLearnsetData('spoink').learnset.odorsleuth = ["9L8"];
		this.species.getLearnsetData('spoink').learnset.psybeam = ["9L12"];
		this.species.getLearnsetData('spoink').learnset.flash = ["9M"];
		this.species.getLearnsetData('spoink').learnset.toxic = ["9M"];
		this.species.getLearnsetData('spoink').learnset.heartstamp = ["9E"];
		// Grumpig
		this.species.getLearnsetData('grumpig').learnset.followme = ["9D"];
		this.species.getLearnsetData('grumpig').learnset.psywave = ["9L1"];
		this.species.getLearnsetData('grumpig').learnset.barrierbash = ["9L5"];
		this.species.getLearnsetData('grumpig').learnset.odorsleuth = ["9L8"];
		this.species.getLearnsetData('grumpig').learnset.psybeam = ["9L12"];
		this.species.getLearnsetData('grumpig').learnset.rest = ["9L35", "9M"];
		this.species.getLearnsetData('grumpig').learnset.flash = ["9M"];
		this.species.getLearnsetData('grumpig').learnset.nastyplot = ["9M"];
		this.species.getLearnsetData('grumpig').learnset.psychicterrain = ["9M"];
		this.species.getLearnsetData('grumpig').learnset.toxic = ["9M"];
		// Spinda
		this.species.getLearnsetData('spinda').learnset.topsyturvy = ["9D"];
		this.species.getLearnsetData('spinda').learnset.amnesia = ["9M"];
		this.species.getLearnsetData('spinda').learnset.flash = ["9M"];
		this.species.getLearnsetData('spinda').learnset.nightmare = ["9M"];
		// Trapinch
		this.species.getLearnsetData('trapinch').learnset.strugglebug = ["9D"];
		this.species.getLearnsetData('trapinch').learnset.ambush = ["9E"];
		// Vibrava
		this.species.getLearnsetData('vibrava').learnset.silverwind = ["9D"];
		// Flygon
		this.species.getLearnsetData('flygon').learnset.silverwind = ["9D"];
		this.species.getLearnsetData('flygon').learnset.dragonrush = ["9L0"];
		this.species.getLearnsetData('flygon').learnset.dragonclaw = ["9L1", "9M"];
		this.species.getLearnsetData('flygon').learnset.fellswoop = ["9L47"];
		this.species.getLearnsetData('flygon').learnset.boomburst = ["9L53"];
		// Cacnea
		this.species.getLearnsetData('cacnea').learnset.mimic = ["9D"];
		this.species.getLearnsetData('cacnea').learnset.encore = ["9M"];
		this.species.getLearnsetData('cacnea').learnset.naturalgift = ["9M"];
		this.species.getLearnsetData('cacnea').learnset.toxic = ["9M"];
		this.species.getLearnsetData('cacnea').learnset.falsesurrender = ["9E"];
		this.species.getLearnsetData('cacnea').learnset.powertrip = ["9E"];
		delete this.species.getLearnsetData('cacnea').learnset.dynamicpunch;
		delete this.species.getLearnsetData('cacnea').learnset.poweruppunch;
		delete this.species.getLearnsetData('cacnea').learnset.smellingsalts;
		// Cacturne
		this.species.getLearnsetData('cacturne').learnset.mimic = ["9D"];
		this.species.getLearnsetData('cacturne').learnset.assurance = ["9M"];
		this.species.getLearnsetData('cacturne').learnset.compensation = ["9M"];
		this.species.getLearnsetData('cacturne').learnset.encore = ["9M"];
		this.species.getLearnsetData('cacturne').learnset.naturalgift = ["9M"];
		this.species.getLearnsetData('cacturne').learnset.toxic = ["9M"];
		// Swablu
		this.species.getLearnsetData('swablu').learnset.weatherball = ["9D"];
		this.species.getLearnsetData('swablu').learnset.amnesia = ["9M"];
		this.species.getLearnsetData('swablu').learnset.chillywater = ["9M"];
		delete this.species.getLearnsetData('swablu').learnset.trailhead;
		// Altaria
		this.species.getLearnsetData('altaria').learnset.mistball = ["9D"];
		this.species.getLearnsetData('altaria').learnset.amnesia = ["9M"];
		this.species.getLearnsetData('altaria').learnset.chillywater = ["9M"];
		delete this.species.getLearnsetData('altaria').learnset.trailhead;
		// Zangoose
		this.species.getLearnsetData('zangoose').learnset.warriorssoul = ["9D"];
		this.species.getLearnsetData('zangoose').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('zangoose').learnset.compensation = ["9M"];
		delete this.species.getLearnsetData('zangoose').learnset.fireblast;
		delete this.species.getLearnsetData('zangoose').learnset.thunder;
		// Seviper
		this.species.getLearnsetData('seviper').learnset.warriorssoul = ["9D"];
		this.species.getLearnsetData('seviper').learnset.bind = ["9L1"];
		this.species.getLearnsetData('seviper').learnset.mortalstrike = ["9E"];
		this.species.getLearnsetData('seviper').learnset.compensation = ["9M"];
		this.species.getLearnsetData('seviper').learnset.incinerate = ["9M"];
		this.species.getLearnsetData('seviper').learnset.toxic = ["9M"];
		delete this.species.getLearnsetData('seviper').learnset.earthquake;
		delete this.species.getLearnsetData('seviper').learnset.wrap;
		// Lunatone
		this.species.getLearnsetData('lunatone').learnset.midnight = ["9D"];
		this.species.getLearnsetData('lunatone').learnset.healblock = ["9L1"];
		this.species.getLearnsetData('lunatone').learnset.powergem = ["9L35","9M"];
		this.species.getLearnsetData('lunatone').learnset.moonblast = ["9L40"];
		this.species.getLearnsetData('lunatone').learnset.futuresight = ["9M"];
		this.species.getLearnsetData('lunatone').learnset.stoneedge = ["9M"];
		this.species.getLearnsetData('lunatone').learnset.flash = ["9M"];
		// Solrock
		this.species.getLearnsetData('solrock').learnset.pyroball = ["9D"];
		this.species.getLearnsetData('solrock').learnset.healblock = ["9L1"];
		this.species.getLearnsetData('solrock').learnset.mindbend = ["9L1"];
		this.species.getLearnsetData('solrock').learnset.barrierbash = ["9L20"];
		this.species.getLearnsetData('solrock').learnset.zenheadbutt = ["9L30","9M"];
		this.species.getLearnsetData('solrock').learnset.flash = ["9M"];
		this.species.getLearnsetData('solrock').learnset.psychic = ["9M"];
		delete this.species.getLearnsetData('solrock').learnset.confusion;
		// Barboach
		this.species.getLearnsetData('barboach').learnset.mindreader = ["9D"];
		this.species.getLearnsetData('barboach').learnset.slipaway = ["9L48"];
		// Whiscash
		this.species.getLearnsetData('whiscash').learnset.mindreader = ["9D"];
		this.species.getLearnsetData('whiscash').learnset.slipaway = ["9L59"];
		// Corphish
		this.species.getLearnsetData('corphish').learnset.muddywater = ["9D"];
		this.species.getLearnsetData('corphish').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('corphish').learnset.compensation = ["9M"];
		// Crawdaunt
		this.species.getLearnsetData('crawdaunt').learnset.muddywater = ["9D"];
		this.species.getLearnsetData('crawdaunt').learnset.chillywater = ["9M"];
		delete this.species.getLearnsetData('crawdaunt').learnset.avalanche;
		// Baltoy
		this.species.getLearnsetData('baltoy').learnset.refresh = ["9D"];
		this.species.getLearnsetData('baltoy').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('baltoy').learnset.flash = ["9M"];
		delete this.species.getLearnsetData('baltoy').learnset.blizzard;
		// Claydol
		this.species.getLearnsetData('claydol').learnset.refresh = ["9D"];
		this.species.getLearnsetData('claydol').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('claydol').learnset.flash = ["9M"];
		delete this.species.getLearnsetData('claydol').learnset.blizzard;
		delete this.species.getLearnsetData('claydol').learnset.bodypress;
		// Lileep
		this.species.getLearnsetData('lileep').learnset.leechseed = ["9D"];
		this.species.getLearnsetData('lileep').learnset.flash = ["9M"];
		this.species.getLearnsetData('lileep').learnset.naturalgift = ["9M"];
		this.species.getLearnsetData('lileep').learnset.toxic = ["9M"];
		// Cradily
		this.species.getLearnsetData('cradily').learnset.leechseed = ["9D"];
		this.species.getLearnsetData('cradily').learnset.flash = ["9M"];
		this.species.getLearnsetData('cradily').learnset.naturalgift = ["9M"];
		this.species.getLearnsetData('cradily').learnset.toxic = ["9M"];
		// Anorith
		this.species.getLearnsetData('anorith').learnset.strugglebug = ["9D"];
		this.species.getLearnsetData('anorith').learnset.ancientpower = ["9L10"];
		this.species.getLearnsetData('anorith').learnset.metalclaw = ["9L13"];
		this.species.getLearnsetData('anorith').learnset.furycutter = ["9L16"];
		this.species.getLearnsetData('anorith').learnset.brine = ["9L20", "9M"];
		this.species.getLearnsetData('anorith').learnset.smackdown = ["9L24", "9M"];
		this.species.getLearnsetData('anorith').learnset.slash = ["9L28"];
		this.species.getLearnsetData('anorith').learnset.bugbite = ["9L32", "9M"];
		this.species.getLearnsetData('anorith').learnset.aquajet = ["9L36"];
		this.species.getLearnsetData('anorith').learnset.rockblast = ["9L41"];
		this.species.getLearnsetData('anorith').learnset.crushclaw = ["9L46"];
		this.species.getLearnsetData('anorith').learnset.xscissor = ["9L51", "9M"];
		this.species.getLearnsetData('anorith').learnset.protect = ["9L56", "9M"];
		this.species.getLearnsetData('anorith').learnset.stoneaxe = ["9L61"];
		delete this.species.getLearnsetData('anorith').learnset.knockoff;
		// Armaldo
		this.species.getLearnsetData('armaldo').learnset.liquidation = ["9D"];
		this.species.getLearnsetData('armaldo').learnset.ancientpower = ["9L10"];
		this.species.getLearnsetData('armaldo').learnset.metalclaw = ["9L13"];
		this.species.getLearnsetData('armaldo').learnset.furycutter = ["9L16"];
		this.species.getLearnsetData('armaldo').learnset.brine = ["9L20", "9M"];
		this.species.getLearnsetData('armaldo').learnset.smackdown = ["9L24", "9M"];
		this.species.getLearnsetData('armaldo').learnset.slash = ["9L28"];
		this.species.getLearnsetData('armaldo').learnset.bugbite = ["9L32", "9M"];
		this.species.getLearnsetData('armaldo').learnset.aquajet = ["9L36"];
		this.species.getLearnsetData('armaldo').learnset.rockblast = ["9L43"];
		this.species.getLearnsetData('armaldo').learnset.crushclaw = ["9L50"];
		this.species.getLearnsetData('armaldo').learnset.xscissor = ["9L57", "9M"];
		this.species.getLearnsetData('armaldo').learnset.protect = ["9L64", "9M"];
		this.species.getLearnsetData('armaldo').learnset.stoneaxe = ["9L71"];
		this.species.getLearnsetData('armaldo').learnset.fullcollide = ["9M"];
		// Feebas
		this.species.getLearnsetData('feebas').learnset.muddywater = ["9D"];
		this.species.getLearnsetData('feebas').learnset.chillywater = ["9M"];
		delete this.species.getLearnsetData('feebas').learnset.blizzard;
		delete this.species.getLearnsetData('feebas').learnset.icebeam;
		// Milotic
		this.species.getLearnsetData('milotic').learnset.lifedew = ["9D"];
		this.species.getLearnsetData('milotic').learnset.bind = ["9L1"];
		this.species.getLearnsetData('milotic').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('milotic').learnset.dazzlinggleam = ["9M"];
		delete this.species.getLearnsetData('milotic').learnset.avalanche;
		delete this.species.getLearnsetData('milotic').learnset.wrap;
		// Castform
		this.species.getLearnsetData('castform').learnset.lifedew = ["9D"];
		this.species.getLearnsetData('castform').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('castform').learnset.eerieimpulse = ["9M"];
		this.species.getLearnsetData('castform').learnset.electroball = ["9M"];
		this.species.getLearnsetData('castform').learnset.flash = ["9M"];
		// Kecleon
		this.species.getLearnsetData('kecleon').learnset.reflecttype = ["9D"];
		this.species.getLearnsetData('kecleon').learnset.trailhead = ["9M"];
		// Shuppet
		this.species.getLearnsetData('shuppet').learnset.trickortreat = ["9D"];
		this.species.getLearnsetData('shuppet').learnset.astonish = ["9L1"];
		this.species.getLearnsetData('shuppet').learnset.terrify = ["9L4"];
		this.species.getLearnsetData('shuppet').learnset.flash = ["9M"];
		this.species.getLearnsetData('shuppet').learnset.nastyplot = ["9M"];
		this.species.getLearnsetData('shuppet').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('shuppet').learnset.poltergeist = ["9M"];
		this.species.getLearnsetData('shuppet').learnset.screech = ["9M"];
		delete this.species.getLearnsetData('shuppet').learnset.knockoff;
		delete this.species.getLearnsetData('shuppet').learnset.metronome;
		delete this.species.getLearnsetData('shuppet').learnset.thunder;
		// Banette
		this.species.getLearnsetData('banette').learnset.trickortreat = ["9D"];
		this.species.getLearnsetData('banette').learnset.astonish = ["9L1"];
		this.species.getLearnsetData('banette').learnset.terrify = ["9L4"];
		this.species.getLearnsetData('banette').learnset.flash = ["9M"];
		this.species.getLearnsetData('banette').learnset.knockoff = ["9M"];
		this.species.getLearnsetData('banette').learnset.nastyplot = ["9M"];
		this.species.getLearnsetData('banette').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('banette').learnset.poltergeist = ["9M"];
		this.species.getLearnsetData('banette').learnset.screech = ["9M"];
		delete this.species.getLearnsetData('banette').learnset.trailhead;
		// Duskull
		this.species.getLearnsetData('duskull').learnset.hypnosis = ["9D"];
		this.species.getLearnsetData('duskull').learnset.flash = ["9M"];
		this.species.getLearnsetData('duskull').learnset.phantomforce = ["9M"];
		this.species.getLearnsetData('duskull').learnset.toxic = ["9M"];
		delete this.species.getLearnsetData('duskull').learnset.blizzard;
		// Dusclops
		this.species.getLearnsetData('dusclops').learnset.hypnosis = ["9D"];
		this.species.getLearnsetData('dusclops').learnset.drainpunch = ["9M"];
		this.species.getLearnsetData('dusclops').learnset.flash = ["9M"];
		this.species.getLearnsetData('dusclops').learnset.phantomforce = ["9M"];
		this.species.getLearnsetData('dusclops').learnset.toxic = ["9M"];
		delete this.species.getLearnsetData('dusclops').learnset.blizzard;
		// Tropius
		this.species.getLearnsetData('tropius').learnset.rejuvenate = ["9D"];
		this.species.getLearnsetData('tropius').learnset.leafstorm = ["9L1"];
		this.species.getLearnsetData('tropius').learnset.airslash = ["9L30","9M"];
		this.species.getLearnsetData('tropius').learnset.naturalgift = ["9L36","9M"];
		this.species.getLearnsetData('tropius').learnset.fellswoop = ["9L41"];
		this.species.getLearnsetData('tropius').learnset.woodhammer = ["9L61"];
		this.species.getLearnsetData('tropius').learnset.bodypress = ["9M"];
		this.species.getLearnsetData('tropius').learnset.grassyterrain = ["9M"];
		this.species.getLearnsetData('tropius').learnset.hurricane = ["9M"];
		this.species.getLearnsetData('tropius').learnset.tropkick = ["9E"];
		delete this.species.getLearnsetData('tropius').learnset.bodyslam;
		delete this.species.getLearnsetData('tropius').learnset.uturn;
		// Chimecho
		this.species.getLearnsetData('chimecho').learnset.lastrespects = ["9D"];
		this.species.getLearnsetData('chimecho').learnset.supersonic = ["9L19"];
		this.species.getLearnsetData('chimecho').learnset.mirrorcoat = ["9L42"];
		this.species.getLearnsetData('chimecho').learnset.flash = ["9M"];
		this.species.getLearnsetData('chimecho').learnset.nightmare = ["9M"];
		delete this.species.getLearnsetData('chimecho').learnset.doubleedge;
		delete this.species.getLearnsetData('chimecho').learnset.takedown;
		// Absol
		this.species.getLearnsetData('absol').learnset.destinybond = ["9D"];
		this.species.getLearnsetData('absol').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('absol').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('absol').learnset.trailhead = ["9M"];
		this.species.getLearnsetData('absol').learnset.cut = ["9E"];
		// Wynaut
		this.species.getLearnsetData('wynaut').learnset.tickle = ["9D"];
		// Snorunt
		this.species.getLearnsetData('snorunt').learnset.snowtumble = ["9D"];
		this.species.getLearnsetData('snorunt').learnset.flash = ["9M"];
		this.species.getLearnsetData('snorunt').learnset.haze = ["9E"];
		this.species.getLearnsetData('snorunt').learnset.iceball = ["9E"];
		// Glalie
		this.species.getLearnsetData('glalie').learnset.snowtumble = ["9D"];
		this.species.getLearnsetData('glalie').learnset.flash = ["9M"];
		// Spheal
		this.species.getLearnsetData('spheal').learnset.rebound = ["9D"];
		this.species.getLearnsetData('spheal').learnset.amnesia = ["9M"];
		this.species.getLearnsetData('spheal').learnset.chillywater = ["9M"];
		delete this.species.getLearnsetData('spheal').learnset.earthquake;
		// Sealeo
		this.species.getLearnsetData('sealeo').learnset.rebound = ["9D"];
		this.species.getLearnsetData('sealeo').learnset.amnesia = ["9M"];
		this.species.getLearnsetData('sealeo').learnset.bodypress = ["9M"];
		this.species.getLearnsetData('sealeo').learnset.chillywater = ["9M"];
		delete this.species.getLearnsetData('sealeo').learnset.earthquake;
		// Walrein
		this.species.getLearnsetData('walrein').learnset.quash = ["9D"];
		this.species.getLearnsetData('walrein').learnset.amnesia = ["9M"];
		this.species.getLearnsetData('walrein').learnset.chillywater = ["9M"];
		// Clamperl
		this.species.getLearnsetData('clamperl').learnset.chillywater = ["9M"];
		delete this.species.getLearnsetData('clamperl').learnset.blizzard;
		delete this.species.getLearnsetData('clamperl').learnset.icebeam;
		// Huntail
		this.species.getLearnsetData('huntail').learnset.tailglow = ["9D"];
		this.species.getLearnsetData('huntail').learnset.terrify = ["9L9"];
		this.species.getLearnsetData('huntail').learnset.assurance = ["9M"];
		this.species.getLearnsetData('huntail').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('huntail').learnset.flash = ["9M"];
		this.species.getLearnsetData('huntail').learnset.nastyplot = ["9M"];
		delete this.species.getLearnsetData('huntail').learnset.blizzard;
		delete this.species.getLearnsetData('huntail').learnset.scaryface;
		// Gorebyss
		this.species.getLearnsetData('gorebyss').learnset.strengthsap = ["9D"];
		this.species.getLearnsetData('gorebyss').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('gorebyss').learnset.nastyplot = ["9M"];
		delete this.species.getLearnsetData('gorebyss').learnset.blizzard;
		delete this.species.getLearnsetData('gorebyss').learnset.infestation;
		// Relicanth
		this.species.getLearnsetData('relicanth').learnset.playdead = ["9D"];
		this.species.getLearnsetData('relicanth').learnset.chillywater = ["9M"];
		delete this.species.getLearnsetData('relicanth').learnset.blizzard;
		// Luvdisc
		this.species.getLearnsetData('luvdisc').learnset.lovelykiss = ["9D"];
		this.species.getLearnsetData('luvdisc').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('luvdisc').learnset.faketears = ["9M"];
		delete this.species.getLearnsetData('luvdisc').learnset.blizzard;
		// Bagon
		this.species.getLearnsetData('bagon').learnset.wish = ["9D"];
		this.species.getLearnsetData('bagon').learnset.focusenergy = ["9L20"];
		this.species.getLearnsetData('bagon').learnset.scaryface = ["9L40"];
		this.species.getLearnsetData('bagon').learnset.fullcollide = ["9M"];
		this.species.getLearnsetData('bagon').learnset.screech = ["9M"];
		delete this.species.getLearnsetData('bagon').learnset.fireblast;
		// Shelgon
		this.species.getLearnsetData('shelgon').learnset.wish = ["9D"];
		this.species.getLearnsetData('shelgon').learnset.focusenergy = ["9L20"];
		this.species.getLearnsetData('shelgon').learnset.scaryface = ["9L46"];
		this.species.getLearnsetData('shelgon').learnset.fullcollide = ["9M"];
		this.species.getLearnsetData('shelgon').learnset.screech = ["9M"];
		delete this.species.getLearnsetData('shelgon').learnset.fireblast;
		// Salamence
		this.species.getLearnsetData('salamence').learnset.wish = ["9D"];
		this.species.getLearnsetData('salamence').learnset.focusenergy = ["9L20"];
		this.species.getLearnsetData('salamence').learnset.scaryface = ["9L46"];
		this.species.getLearnsetData('salamence').learnset.fellswoop = ["9L73"];
		this.species.getLearnsetData('salamence').learnset.fullcollide = ["9M"];
		this.species.getLearnsetData('salamence').learnset.screech = ["9M"];
		delete this.species.getLearnsetData('salamence').learnset.doubleedge;
		// Metang
		this.species.getLearnsetData('metang').learnset.dynamicpunch = ["9D"];
		this.species.getLearnsetData('metang').learnset.barrierbash = ["9L32"];
		this.species.getLearnsetData('metang').learnset.zenheadbutt = ["9L38", "9M"];
		this.species.getLearnsetData('metang').learnset.amnesia = ["9M"];
		this.species.getLearnsetData('metang').learnset.bodypress = ["9M"];
		this.species.getLearnsetData('metang').learnset.flash = ["9M"];
		this.species.getLearnsetData('metang').learnset.futuresight = ["9M"];
		this.species.getLearnsetData('metang').learnset.psychic = ["9M"];
		// Metagross
		this.species.getLearnsetData('metagross').learnset.dynamicpunch = ["9D"];
		this.species.getLearnsetData('metagross').learnset.barrierbash = ["9L32"];
		this.species.getLearnsetData('metagross').learnset.zenheadbutt = ["9L38", "9M"];
		this.species.getLearnsetData('metagross').learnset.amnesia = ["9M"];
		this.species.getLearnsetData('metagross').learnset.flash = ["9M"];
		this.species.getLearnsetData('metagross').learnset.futuresight = ["9M"];
		this.species.getLearnsetData('metagross').learnset.psychic = ["9M"];
		// Regirock
		this.species.getLearnsetData('regirock').learnset.shoreup = ["9D"];
		this.species.getLearnsetData('regirock').learnset.rockslide = ["9L31", "9M"];
		this.species.getLearnsetData('regirock').learnset.ancientpower = ["9L37"];
		this.species.getLearnsetData('regirock').learnset.irondefense = ["9L43", "9M"];
		this.species.getLearnsetData('regirock').learnset.stoneedge = ["9L49", "9M"];
		this.species.getLearnsetData('regirock').learnset.hammerarm = ["9L55"];
		this.species.getLearnsetData('regirock').learnset.lockon = ["9L61"];
		this.species.getLearnsetData('regirock').learnset.zapcannon = ["9L61"];
		this.species.getLearnsetData('regirock').learnset.superpower = ["9L67", "9M"];
		this.species.getLearnsetData('regirock').learnset.hyperbeam = ["9L73", "9M"];
		// Regice
		this.species.getLearnsetData('regice').learnset.glaciate = ["9D"];
		this.species.getLearnsetData('regice').learnset.icebeam = ["9L31", "9M"];
		this.species.getLearnsetData('regice').learnset.ancientpower = ["9L37"];
		this.species.getLearnsetData('regice').learnset.amnesia = ["9L43", "9M"];
		this.species.getLearnsetData('regice').learnset.freezedry = ["9L49"];
		this.species.getLearnsetData('regice').learnset.hammerarm = ["9L55"];
		this.species.getLearnsetData('regice').learnset.lockon = ["9L61"];
		this.species.getLearnsetData('regice').learnset.zapcannon = ["9L61"];
		this.species.getLearnsetData('regice').learnset.superpower = ["9L67", "9M"];
		this.species.getLearnsetData('regice').learnset.hyperbeam = ["9L73", "9M"];
		this.species.getLearnsetData('regice').learnset.chillywater = ["9M"];
		// Registeel
		this.species.getLearnsetData('registeel').learnset.metalburst = ["9D"];
		this.species.getLearnsetData('registeel').learnset.fullcollide = ["9L31", "9M"];
		this.species.getLearnsetData('registeel').learnset.ancientpower = ["9L37"];
		this.species.getLearnsetData('registeel').learnset.irondefense = ["9L43", "9M"];
		this.species.getLearnsetData('registeel').learnset.amnesia = ["9L43", "9M"];
		this.species.getLearnsetData('registeel').learnset.ironhead = ["9L49", "9M"];
		this.species.getLearnsetData('registeel').learnset.flashcannon = ["9L49", "9M"];
		this.species.getLearnsetData('registeel').learnset.hammerarm = ["9L55"];
		this.species.getLearnsetData('registeel').learnset.lockon = ["9L61"];
		this.species.getLearnsetData('registeel').learnset.zapcannon = ["9L61"];
		this.species.getLearnsetData('registeel').learnset.superpower = ["9L67", "9M"];
		this.species.getLearnsetData('registeel').learnset.hyperbeam = ["9L73", "9M"];
		// Latias
		this.species.getLearnsetData('latias').learnset.guardswap = ["9D"];
		this.species.getLearnsetData('latias').learnset.protect = ["9L4", "9M"];
		this.species.getLearnsetData('latias').learnset.meditate = ["9L7"];
		this.species.getLearnsetData('latias').learnset.amnesia = ["9M"];
		this.species.getLearnsetData('latias').learnset.charm = ["9M"];
		this.species.getLearnsetData('latias').learnset.flash = ["9M"];
		delete this.species.getLearnsetData('latias').learnset.watersport;
		// Latios
		this.species.getLearnsetData('latios').learnset.powerswap = ["9D"];
		this.species.getLearnsetData('latios').learnset.telekinesis = ["9L4", "9M"];
		this.species.getLearnsetData('latios').learnset.imprison = ["9L36"];
		this.species.getLearnsetData('latios').learnset.amnesia = ["9M"];
		this.species.getLearnsetData('latios').learnset.flash = ["9M"];
		this.species.getLearnsetData('latios').learnset.protect = ["9M"];
		// Kyogre
		this.species.getLearnsetData('kyogre').learnset.tidalwave = ["9D"];
		this.species.getLearnsetData('kyogre').learnset.bodypress = ["9M"];
		// Groudon
		this.species.getLearnsetData('groudon').learnset.landswrath = ["9D"];
		this.species.getLearnsetData('groudon').learnset.tussle = ["9L1"];
		this.species.getLearnsetData('groudon').learnset.bodypress = ["9M"];
		delete this.species.getLearnsetData('groudon').learnset.mudshot;
		// Rayquaza
		this.species.getLearnsetData('rayquaza').learnset.dragonascent = ["9D"];
		this.species.getLearnsetData('rayquaza').learnset.crunch = ["9L1"];
		this.species.getLearnsetData('rayquaza').learnset.airslash = ["9L9"];
		this.species.getLearnsetData('rayquaza').learnset.hypervoice = ["9L27"];
		this.species.getLearnsetData('rayquaza').learnset.extremespeed = ["9L45"];
		this.species.getLearnsetData('rayquaza').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('rayquaza').learnset.meteorbeam = ["9T"];
		delete this.species.getLearnsetData('rayquaza').learnset.gyroball;
		delete this.species.getLearnsetData('rayquaza').learnset.stealthrock;
		// Jirachi
		this.species.getLearnsetData('jirachi').learnset.meteormash = ["9D"];
		this.species.getLearnsetData('jirachi').learnset.miracleeye = ["9L40"];
		this.species.getLearnsetData('jirachi').learnset.flash = ["9M"];
		this.species.getLearnsetData('jirachi').learnset.nightmare = ["9M"];
		delete this.species.getLearnsetData('jirachi').learnset.doubleedge;
		// Deoxys
		this.species.getLearnsetData('deoxys').learnset.refresh = ["9D"]; //Deoxys Normal
		this.species.getLearnsetData('deoxys').learnset.meteormash = ["9L73"];
		this.species.getLearnsetData('deoxys').learnset.workup = ["9D"]; //Deoxys Attack
		this.species.getLearnsetData('deoxys').learnset.zapcannon = ["9L55"];
		this.species.getLearnsetData('deoxys').learnset.metalburst = ["9D"]; //Deoxys Defense
		this.species.getLearnsetData('deoxys').learnset.barrier = ["9L55"];
		this.species.getLearnsetData('deoxys').learnset.feint = ["9D"]; //Deoxys Speed
		this.species.getLearnsetData('deoxys').learnset.doubleteam = ["9L37"];
		this.species.getLearnsetData('deoxys').learnset.flash = ["9M"]; //All
		this.species.getLearnsetData('deoxys').learnset.nastyplot = ["9M"];
		this.species.getLearnsetData('deoxys').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('deoxys').learnset.psychicterrain = ["9M"];
		this.species.getLearnsetData('deoxys').learnset.taunt = ["9M"];
		this.species.getLearnsetData('deoxys').learnset.toxic = ["9M"];
		this.species.getLearnsetData('deoxys').learnset.meteorbeam = ["9T"];
		delete this.species.getLearnsetData('deoxys').learnset.irondefense;
		delete this.species.getLearnsetData('deoxys').learnset.swift;
		// Turtwig
		this.species.getLearnsetData('turtwig').learnset.ingrain = ["9D"];
		this.species.getLearnsetData('turtwig').learnset.flash = ["9M"];
		this.species.getLearnsetData('turtwig').learnset.fullcollide = ["9M"];
		this.species.getLearnsetData('turtwig').learnset.naturalgift = ["9M"];
		this.species.getLearnsetData('turtwig').learnset.trailhead = ["9M"];
		// Grotle
		this.species.getLearnsetData('grotle').learnset.ingrain = ["9D"];
		this.species.getLearnsetData('grotle').learnset.bodypress = ["9M"];
		this.species.getLearnsetData('grotle').learnset.flash = ["9M"];
		this.species.getLearnsetData('grotle').learnset.fullcollide = ["9M"];
		this.species.getLearnsetData('grotle').learnset.naturalgift = ["9M"];
		this.species.getLearnsetData('grotle').learnset.trailhead = ["9M"];
		// Torterra
		this.species.getLearnsetData('torterra').learnset.landswrath = ["9D"];
		this.species.getLearnsetData('torterra').learnset.bodypress = ["9M"];
		this.species.getLearnsetData('torterra').learnset.chipaway = ["9M"];
		this.species.getLearnsetData('torterra').learnset.flash = ["9M"];
		this.species.getLearnsetData('torterra').learnset.fullcollide = ["9M"];
		this.species.getLearnsetData('torterra').learnset.naturalgift = ["9M"];
		this.species.getLearnsetData('torterra').learnset.trailhead = ["9M"];
		// Chimchar
		this.species.getLearnsetData('chimchar').learnset.preheat = ["9D"];
		this.species.getLearnsetData('chimchar').learnset.flash = ["9M"];
		// Monferno
		this.species.getLearnsetData('monferno').learnset.firelash = ["9D"];
		this.species.getLearnsetData('monferno').learnset.flash = ["9M"];
		// Infernape
		this.species.getLearnsetData('infernape').learnset.firelash = ["9D"];
		this.species.getLearnsetData('infernape').learnset.flash = ["9M"];
		// Piplup
		this.species.getLearnsetData('piplup').learnset.sheercold = ["9D"];
		// Prinplup
		this.species.getLearnsetData('prinplup').learnset.sheercold = ["9D"];
		this.species.getLearnsetData('prinplup').learnset.aquacutter = ["9L54"];
		// Empoleon
		this.species.getLearnsetData('empoleon').learnset.sheercold = ["9D"];
		this.species.getLearnsetData('empoleon').learnset.aquacutter = ["9L1"];
		this.species.getLearnsetData('empoleon').learnset.metaledge = ["9L65"];
		this.species.getLearnsetData('empoleon').learnset.steelbeam = ["9T"];
		// Starly
		this.species.getLearnsetData('starly').learnset.aircutter = ["9D"];
		// Staravia
		this.species.getLearnsetData('staravia').learnset.aircutter = ["9D"];
		// Staraptor
		this.species.getLearnsetData('staraptor').learnset.skydrop = ["9D"];
		this.species.getLearnsetData('staraptor').learnset.hurricane = ["9M"];
		// Bidoof
		this.species.getLearnsetData('bidoof').learnset.captivate = ["9D"];
		this.species.getLearnsetData('bidoof').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('bidoof').learnset.chipaway = ["9M"];
		delete this.species.getLearnsetData('bidoof').learnset.blizzard;
		delete this.species.getLearnsetData('bidoof').learnset.thunder;
		delete this.species.getLearnsetData('bidoof').learnset.thunderbolt;
		// Bibarel
		this.species.getLearnsetData('bibarel').learnset.captivate = ["9D"];
		this.species.getLearnsetData('bibarel').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('bibarel').learnset.chipaway = ["9M"];
		delete this.species.getLearnsetData('bibarel').learnset.blizzard;
		delete this.species.getLearnsetData('bibarel').learnset.thunder;
		// Kricketune
		this.species.getLearnsetData('kricketune').learnset.risingchorus = ["9D"];
		this.species.getLearnsetData('kricketune').learnset.springleap = ["9L14"];
		this.species.getLearnsetData('kricketune').learnset.vitaldrain = ["9M"];
		delete this.species.getLearnsetData('kricketune').learnset.absorb;
		delete this.species.getLearnsetData('kricketune').learnset.knockoff;
		delete this.species.getLearnsetData('kricketune').learnset.leechlife;
		// Shinx
		this.species.getLearnsetData('shinx').learnset.assist = ["9D"];
		this.species.getLearnsetData('shinx').learnset.assurance = ["9M"];
		this.species.getLearnsetData('shinx').learnset.flash = ["9M"];
		// Luxio
		this.species.getLearnsetData('luxio').learnset.assist = ["9D"];
		this.species.getLearnsetData('luxio').learnset.assurance = ["9M"];
		this.species.getLearnsetData('luxio').learnset.flash = ["9M"];
		// Luxray
		this.species.getLearnsetData('luxray').learnset.assist = ["9D"];
		this.species.getLearnsetData('luxray').learnset.assurance = ["9M"];
		this.species.getLearnsetData('luxray').learnset.flash = ["9M"];
		// Budew
		this.species.getLearnsetData('budew').learnset.tearfullook = ["9D"];
		this.species.getLearnsetData('budew').learnset.naturalgift = ["9M"];
		this.species.getLearnsetData('budew').learnset.toxic = ["9M"];
		this.species.getLearnsetData('budew').learnset.lifedew = ["9E"];
		// Roserade
		this.species.getLearnsetData('roserade').learnset.captivate = ["9D"];
		this.species.getLearnsetData('roserade').learnset.flowertrap = ["9L1"];
		this.species.getLearnsetData('roserade').learnset.lifedew = ["9L1"];
		this.species.getLearnsetData('roserade').learnset.naturalgift = ["9M"];
		this.species.getLearnsetData('roserade').learnset.toxic = ["9M"];
		this.species.getLearnsetData('roserade').learnset.trailhead = ["9M"];
		// Cranidos
		this.species.getLearnsetData('cranidos').learnset.accelerock = ["9D"];
		this.species.getLearnsetData('cranidos').learnset.ancientpower = ["9L28"];
		this.species.getLearnsetData('cranidos').learnset.screech = ["9L33"];
		this.species.getLearnsetData('cranidos').learnset.chipaway = ["9L37"];
		this.species.getLearnsetData('cranidos').learnset.zenheadbutt = ["9L42"];
		this.species.getLearnsetData('cranidos').learnset.doubleedge = ["9L46"];
		this.species.getLearnsetData('cranidos').learnset.headsmash = ["9L51"];
		this.species.getLearnsetData('cranidos').learnset.fullcollide = ["9M"];
		this.species.getLearnsetData('cranidos').learnset.trailhead = ["9M"];
		delete this.species.getLearnsetData('cranidos').learnset.fireblast;
		delete this.species.getLearnsetData('cranidos').learnset.flamethrower;
		delete this.species.getLearnsetData('cranidos').learnset.thunder;
		delete this.species.getLearnsetData('cranidos').learnset.thunderbolt;
		// Rampardos
		this.species.getLearnsetData('rampardos').learnset.accelerock = ["9D"];
		this.species.getLearnsetData('rampardos').learnset.ancientpower = ["9L28"];
		this.species.getLearnsetData('rampardos').learnset.screech = ["9L33","9M"];
		this.species.getLearnsetData('rampardos').learnset.chipaway = ["9L37","9M"];
		this.species.getLearnsetData('rampardos').learnset.zenheadbutt = ["9L43","9M"];
		this.species.getLearnsetData('rampardos').learnset.doubleedge = ["9L51"];
		this.species.getLearnsetData('rampardos').learnset.headsmash = ["9L66"];
		this.species.getLearnsetData('rampardos').learnset.breakingswipe = ["9M"];
		this.species.getLearnsetData('rampardos').learnset.fullcollide = ["9M"];
		this.species.getLearnsetData('rampardos').learnset.trailhead = ["9M"];
		// Shieldon
		this.species.getLearnsetData('shieldon').learnset.kingsshield = ["9D"];
		this.species.getLearnsetData('shieldon').learnset.fullcollide = ["9L15","9M"];
		this.species.getLearnsetData('shieldon').learnset.shelter = ["9L51"];
		this.species.getLearnsetData('shieldon').learnset.chillywater = ["9M"];
		delete this.species.getLearnsetData('shieldon').learnset.blizzard;
		delete this.species.getLearnsetData('shieldon').learnset.earthquake;
		delete this.species.getLearnsetData('shieldon').learnset.fireblast;
		delete this.species.getLearnsetData('shieldon').learnset.flamethrower;
		delete this.species.getLearnsetData('shieldon').learnset.icebeam;
		delete this.species.getLearnsetData('shieldon').learnset.takedown;
		delete this.species.getLearnsetData('shieldon').learnset.thunder;
		// Bastiodon
		this.species.getLearnsetData('bastiodon').learnset.kingsshield = ["9D"];
		this.species.getLearnsetData('bastiodon').learnset.fullcollide = ["9L15","9M"];
		this.species.getLearnsetData('bastiodon').learnset.shelter = ["9L66"];
		this.species.getLearnsetData('bastiodon').learnset.bodypress = ["9M"];
		this.species.getLearnsetData('bastiodon').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('bastiodon').learnset.steelbeam = ["9T"];
		delete this.species.getLearnsetData('bastiodon').learnset.blizzard;
		delete this.species.getLearnsetData('bastiodon').learnset.fireblast;
		delete this.species.getLearnsetData('bastiodon').learnset.takedown;
		delete this.species.getLearnsetData('bastiodon').learnset.thunder;
		// Wormadam Plant
		this.species.getLearnsetData('wormadam').learnset.camouflage = ["9D"];
		this.species.getLearnsetData('wormadam').learnset.hiddenpower = ["9L0","9M"];
		this.species.getLearnsetData('wormadam').learnset.petaldance = ["9L1"];
		this.species.getLearnsetData('wormadam').learnset.leaftornado = ["9L26"];
		this.species.getLearnsetData('wormadam').learnset.amnesia = ["9M"];
		this.species.getLearnsetData('wormadam').learnset.faketears = ["9M"];
		this.species.getLearnsetData('wormadam').learnset.grassyterrain = ["9M"];
		this.species.getLearnsetData('wormadam').learnset.naturalgift = ["9M"];
		delete this.species.getLearnsetData('wormadam').learnset.quiverdance;
		delete this.species.getLearnsetData('wormadam').learnset.razorleaf;
		// Wormadam Sandy
		this.species.getLearnsetData('wormadamsandy').learnset.camouflage = ["9D"];
		this.species.getLearnsetData('wormadamsandy').learnset.hiddenpower = ["9L0","9M"];
		this.species.getLearnsetData('wormadamsandy').learnset.shoreup = ["9L1"];
		this.species.getLearnsetData('wormadamsandy').learnset.sandtomb = ["9L26"];
		this.species.getLearnsetData('wormadamsandy').learnset.irondefense = ["9L29","9M"];
		this.species.getLearnsetData('wormadamsandy').learnset.amnesia = ["9M"];
		this.species.getLearnsetData('wormadamsandy').learnset.faketears = ["9M"];
		this.species.getLearnsetData('wormadamsandy').learnset.naturalgift = ["9M"];
		delete this.species.getLearnsetData('wormadamsandy').learnset.harden;
		delete this.species.getLearnsetData('wormadamsandy').learnset.quiverdance;
		delete this.species.getLearnsetData('wormadamsandy').learnset.rockblast;
		// Wormadam Trash
		this.species.getLearnsetData('wormadamtrash').learnset.camouflage = ["9D"];
		this.species.getLearnsetData('wormadamtrash').learnset.hiddenpower = ["9L0","9M"];
		this.species.getLearnsetData('wormadamtrash').learnset.amnesia = ["9M"];
		this.species.getLearnsetData('wormadamtrash').learnset.faketears = ["9M"];
		this.species.getLearnsetData('wormadamtrash').learnset.naturalgift = ["9M"];
		delete this.species.getLearnsetData('wormadamtrash').learnset.quiverdance;
		// Mothim
		this.species.getLearnsetData('mothim').learnset.pollenpuff = ["9D"];
		this.species.getLearnsetData('mothim').learnset.naturalgift = ["9M"];
		// Vespiquen
		this.species.getLearnsetData('vespiquen').learnset.instruct = ["9D"];
		this.species.getLearnsetData('vespiquen').learnset.toxic = ["9L33","9M"];
		this.species.getLearnsetData('vespiquen').learnset.flash = ["9M"];
		this.species.getLearnsetData('vespiquen').learnset.naturalgift = ["9M"];
		this.species.getLearnsetData('vespiquen').learnset.nightmare = ["9M"];
		// Pachirisu
		this.species.getLearnsetData('pachirisu').learnset.switcheroo = ["9D"];
		this.species.getLearnsetData('pachirisu').learnset.flash = ["9M"];
		this.species.getLearnsetData('pachirisu').learnset.stuffcheeks = ["9E"];
		// Buizel
		this.species.getLearnsetData('buizel').learnset.slackoff = ["9D"];
		this.species.getLearnsetData('buizel').learnset.wavecrash = ["9L48"];
		this.species.getLearnsetData('buizel').learnset.amnesia = ["9M"];
		this.species.getLearnsetData('buizel').learnset.charm = ["9M"];
		delete this.species.getLearnsetData('buizel').learnset.blizzard;
		// Floatzel
		this.species.getLearnsetData('floatzel').learnset.slackoff = ["9D"];
		this.species.getLearnsetData('floatzel').learnset.wavecrash = ["9L63"];
		this.species.getLearnsetData('floatzel').learnset.amnesia = ["9M"];
		this.species.getLearnsetData('floatzel').learnset.charm = ["9M"];
		delete this.species.getLearnsetData('floatzel').learnset.blizzard;
		// Cherubi
		this.species.getLearnsetData('cherubi').learnset.happyhour = ["9D"];
		this.species.getLearnsetData('cherubi').learnset.flash = ["9M"];
		// Cherrim
		this.species.getLearnsetData('cherrim').learnset.happyhour = ["9D"];
		this.species.getLearnsetData('cherrim').learnset.flash = ["9M"];
		// Shellos
		this.species.getLearnsetData('shellos').learnset.slipaway = ["9D"];
		delete this.species.getLearnsetData('shellos').learnset.blizzard;
		// Gastrodon
		this.species.getLearnsetData('gastrodon').learnset.slipaway = ["9D"];
		this.species.getLearnsetData('gastrodon').learnset.flash = ["9M"];
		delete this.species.getLearnsetData('gastrodon').learnset.blizzard;
		// Ambipom
		this.species.getLearnsetData('ambipom').learnset.swing = ["9D"];
		this.species.getLearnsetData('ambipom').learnset.dualchop = ["9L1", "9M"];
		// Drifloon
		this.species.getLearnsetData('drifloon').learnset.snatch = ["9D"];
		this.species.getLearnsetData('drifloon').learnset.rebound = ["9L48"];
		this.species.getLearnsetData('drifloon').learnset.aerate = ["9L8"];
		delete this.species.getLearnsetData('drifloon').learnset.brutalswing;
		delete this.species.getLearnsetData('drifloon').learnset.gust;
		delete this.species.getLearnsetData('drifloon').learnset.gyroball;
		delete this.species.getLearnsetData('drifloon').learnset.knockoff;
		delete this.species.getLearnsetData('drifloon').learnset.thunder;
		delete this.species.getLearnsetData('drifloon').learnset.thunderbolt;
		// Drifblim
		this.species.getLearnsetData('drifblim').learnset.snatch = ["9D"];
		this.species.getLearnsetData('drifblim').learnset.rebound = ["9L57"];
		this.species.getLearnsetData('drifblim').learnset.aerate = ["9L8"];
		delete this.species.getLearnsetData('drifblim').learnset.gust;
		delete this.species.getLearnsetData('drifblim').learnset.gyroball;
		delete this.species.getLearnsetData('drifblim').learnset.thunder;
		// Buneary
		this.species.getLearnsetData('buneary').learnset.victorydance = ["9D"];
		this.species.getLearnsetData('buneary').learnset.deepbreath = ["9L10"];
		this.species.getLearnsetData('buneary').learnset.mirrorcoat = ["9L20"];
		this.species.getLearnsetData('buneary').learnset.magiccoat = ["9L30"];
		this.species.getLearnsetData('buneary').learnset.entrainment = ["9L40"];
		this.species.getLearnsetData('buneary').learnset.followme = ["9L50"];
		this.species.getLearnsetData('buneary').learnset.healingwish = ["9L60"];
		this.species.getLearnsetData('buneary').learnset.chillywater = ["9M"];
		delete this.species.getLearnsetData('buneary').learnset.blizzard;
		delete this.species.getLearnsetData('buneary').learnset.icebeam;
		delete this.species.getLearnsetData('buneary').learnset.thunder;
		delete this.species.getLearnsetData('buneary').learnset.thunderbolt;
		// Lopunny
		this.species.getLearnsetData('lopunny').learnset.victorydance = ["9D"];
		this.species.getLearnsetData('lopunny').learnset.deepbreath = ["9L10"];
		this.species.getLearnsetData('lopunny').learnset.mirrorcoat = ["9L20"];
		this.species.getLearnsetData('lopunny').learnset.magiccoat = ["9L30"];
		this.species.getLearnsetData('lopunny').learnset.entrainment = ["9L40"];
		this.species.getLearnsetData('lopunny').learnset.followme = ["9L50"];
		this.species.getLearnsetData('lopunny').learnset.healingwish = ["9L60"];
		this.species.getLearnsetData('lopunny').learnset.highjumpkick = ["9L63"];
		this.species.getLearnsetData('lopunny').learnset.chillywater = ["9M"];
		delete this.species.getLearnsetData('lopunny').learnset.blizzard;
		delete this.species.getLearnsetData('lopunny').learnset.thunder;
		// Mismagius
		this.species.getLearnsetData('mismagius').learnset.healblock = ["9D"];
		this.species.getLearnsetData('mismagius').learnset.eeriespell = ["9L1"];
		this.species.getLearnsetData('mismagius').learnset.terrify = ["9L1"];
		this.species.getLearnsetData('mismagius').learnset.flash = ["9M"];
		this.species.getLearnsetData('mismagius').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('mismagius').learnset.payback = ["9M"];
		this.species.getLearnsetData('mismagius').learnset.poltergeist = ["9M"];
		delete this.species.getLearnsetData('mismagius').learnset.thunder;
		// Honchkrow
		this.species.getLearnsetData('honchkrow').learnset.midnight = ["9D"];
		this.species.getLearnsetData('honchkrow').learnset.compensation = ["9M"];
		this.species.getLearnsetData('honchkrow').learnset.hex = ["9M"];
		this.species.getLearnsetData('honchkrow').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('honchkrow').learnset.toxic = ["9M"];
		// Glameow
		this.species.getLearnsetData('glameow').learnset.agility = ["9D"];
		this.species.getLearnsetData('glameow').learnset.compensation = ["9M"];
		this.species.getLearnsetData('glameow').learnset.screech = ["9M"];
		delete this.species.getLearnsetData('glameow').learnset.thunder;
		delete this.species.getLearnsetData('glameow').learnset.thunderbolt;
		// Purugly
		this.species.getLearnsetData('purugly').learnset.bulkup = ["9D"];
		this.species.getLearnsetData('purugly').learnset.compensation = ["9M"];
		this.species.getLearnsetData('purugly').learnset.screech = ["9M"];
		delete this.species.getLearnsetData('purugly').learnset.thunder;
		// Chingling
		this.species.getLearnsetData('chingling').learnset.lastrespects = ["9D"];
		this.species.getLearnsetData('chingling').learnset.flash = ["9M"];
		this.species.getLearnsetData('chingling').learnset.nightmare = ["9M"];
		delete this.species.getLearnsetData('chingling').learnset.knockoff;
		// Stunky
		this.species.getLearnsetData('stunky').learnset.playdead = ["9D"];
		this.species.getLearnsetData('stunky').learnset.toxic = ["9L27","9M"];
		this.species.getLearnsetData('stunky').learnset.darkpulse = ["9L31","9M"];
		this.species.getLearnsetData('stunky').learnset.nightmare = ["9M"];
		delete this.species.getLearnsetData('stunky').learnset.nightslash;
		// Skuntank
		this.species.getLearnsetData('skuntank').learnset.playdead = ["9D"];
		this.species.getLearnsetData('skuntank').learnset.toxic = ["9L27","9M"];
		this.species.getLearnsetData('skuntank').learnset.darkpulse = ["9L31","9M"];
		this.species.getLearnsetData('skuntank').learnset.nightmare = ["9M"];
		delete this.species.getLearnsetData('skuntank').learnset.nightslash;
		// Bronzor
		this.species.getLearnsetData('bronzor').learnset.mirrorcoat = ["9D"];
		this.species.getLearnsetData('bronzor').learnset.bash = ["9L21"];
		this.species.getLearnsetData('bronzor').learnset.flash = ["9M"];
		delete this.species.getLearnsetData('bronzor').learnset.earthquake;
		delete this.species.getLearnsetData('bronzor').learnset.feintattack;
		// Bronzong
		this.species.getLearnsetData('bronzong').learnset.healbell = ["9D"];
		this.species.getLearnsetData('bronzong').learnset.bash = ["9L21"];
		this.species.getLearnsetData('bronzong').learnset.flash = ["9M"];
		delete this.species.getLearnsetData('bronzong').learnset.feintattack;
		// Bonsly
		this.species.getLearnsetData('bonsly').learnset.minimize = ["9D"];
		delete this.species.getLearnsetData('bonsly').learnset.earthquake;
		// Mime Jr.
		this.species.getLearnsetData('mimejr').learnset.followme = ["9D"];
		this.species.getLearnsetData('mimejr').learnset.wakeupslap = ["9L40"];
		this.species.getLearnsetData('mimejr').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('mimejr').learnset.barrierbash = ["9E"];
		delete this.species.getLearnsetData('mimejr').learnset.suckerpunch;
		delete this.species.getLearnsetData('mimejr').learnset.thunder;
		delete this.species.getLearnsetData('mimejr').learnset.thunderbolt;
		// Happiny
		this.species.getLearnsetData('happiny').learnset.happyhour = ["9D"];
		delete this.species.getLearnsetData('happiny').learnset.blizzard;
		delete this.species.getLearnsetData('happiny').learnset.earthquake;
		delete this.species.getLearnsetData('happiny').learnset.fireblast;
		delete this.species.getLearnsetData('happiny').learnset.flamethrower;
		delete this.species.getLearnsetData('happiny').learnset.icebeam;
		delete this.species.getLearnsetData('happiny').learnset.tantrum;
		delete this.species.getLearnsetData('happiny').learnset.thunder;
		delete this.species.getLearnsetData('happiny').learnset.thunderbolt;
		// Chatot
		this.species.getLearnsetData('chatot').learnset.pluck = ["9D"];
		this.species.getLearnsetData('chatot').learnset.featherdance = ["9L53"];
		this.species.getLearnsetData('chatot').learnset.partingshot = ["9L53"];
		this.species.getLearnsetData('chatot').learnset.hurricane = ["9M"];
		this.species.getLearnsetData('chatot').learnset.screech = ["9M"];
		// Spiritomb
		this.species.getLearnsetData('spiritomb').learnset.ruination = ["9D"];
		this.species.getLearnsetData('spiritomb').learnset.healblock = ["9L55"];
		this.species.getLearnsetData('spiritomb').learnset.imprison = ["9L61"];
		this.species.getLearnsetData('spiritomb').learnset.compensation = ["9M"];
		this.species.getLearnsetData('spiritomb').learnset.flash = ["9M"];
		this.species.getLearnsetData('spiritomb').learnset.powergem = ["9M"];
		this.species.getLearnsetData('spiritomb').learnset.toxic = ["9M"];
		this.species.getLearnsetData('spiritomb').learnset.stasis = ["9T"];
		// Gible
		this.species.getLearnsetData('gible').learnset.crunch = ["9D"];
		delete this.species.getLearnsetData('gible').learnset.fireblast;
		// Gabite
		this.species.getLearnsetData('gabite').learnset.furycutter = ["9D"];
		delete this.species.getLearnsetData('gabite').learnset.fireblast;
		// Garchomp
		this.species.getLearnsetData('garchomp').learnset.fellswoop = ["9D"];
		// Munchlax
		this.species.getLearnsetData('munchlax').learnset.selfdestruct = ["9D"];
		this.species.getLearnsetData('munchlax').learnset.toxic = ["9M"];
		delete this.species.getLearnsetData('munchlax').learnset.blizzard;
		delete this.species.getLearnsetData('munchlax').learnset.earthquake;
		delete this.species.getLearnsetData('munchlax').learnset.fireblast;
		delete this.species.getLearnsetData('munchlax').learnset.flamethrower;
		delete this.species.getLearnsetData('munchlax').learnset.icebeam;
		delete this.species.getLearnsetData('munchlax').learnset.thunder;
		delete this.species.getLearnsetData('munchlax').learnset.thunderbolt;
		// Riolu
		this.species.getLearnsetData('riolu').learnset.aurasphere = ["9D"];
		this.species.getLearnsetData('riolu').learnset.metronome = ["9M"];
		this.species.getLearnsetData('riolu').learnset.rollingkick = ["9E"];
		delete this.species.getLearnsetData('riolu').learnset.earthquake;
		delete this.species.getLearnsetData('riolu').learnset.magnetrise;
		// Lucario
		this.species.getLearnsetData('lucario').learnset.eminence = ["9D"];
		// Hippopotas
		this.species.getLearnsetData('hippopotas').learnset.rage = ["9D"];
		this.species.getLearnsetData('hippopotas').learnset.tussle = ["9E"];
		// Hippowdon
		this.species.getLearnsetData('hippowdon').learnset.rage = ["9D"];
		// Skorupi
		this.species.getLearnsetData('skorupi').learnset.crushclaw = ["9D"];
		this.species.getLearnsetData('skorupi').learnset.crosspoison = ["9L38"];
		this.species.getLearnsetData('skorupi').learnset.terrify = ["9L41"];
		this.species.getLearnsetData('skorupi').learnset.direclaw = ["9L49"];
		this.species.getLearnsetData('skorupi').learnset.toxic = ["9M"];
		this.species.getLearnsetData('skorupi').learnset.springleap = ["9E"];
		delete this.species.getLearnsetData('skorupi').learnset.nightslash;
		delete this.species.getLearnsetData('skorupi').learnset.scaryface;
		// Drapion
		this.species.getLearnsetData('drapion').learnset.crushclaw = ["9D"];
		this.species.getLearnsetData('drapion').learnset.nightslash = ["9L0"];
		this.species.getLearnsetData('drapion').learnset.crosspoison = ["9L38"];
		this.species.getLearnsetData('drapion').learnset.terrify = ["9L43"];
		this.species.getLearnsetData('drapion').learnset.direclaw = ["9L57"];
		this.species.getLearnsetData('drapion').learnset.chipaway = ["9M"];
		this.species.getLearnsetData('drapion').learnset.toxic = ["9M"];
		this.species.getLearnsetData('drapion').learnset.vitaldrain = ["9M"];
		delete this.species.getLearnsetData('drapion').learnset.leechlife;
		delete this.species.getLearnsetData('drapion').learnset.scaryface;
		// Croagunk
		this.species.getLearnsetData('croagunk').learnset.poweruppunch = ["9D"];
		this.species.getLearnsetData('croagunk').learnset.toxic = ["9M"];
		delete this.species.getLearnsetData('croagunk').learnset.earthquake;
		// Toxicroak
		this.species.getLearnsetData('toxicroak').learnset.fellstinger = ["9D"];
		this.species.getLearnsetData('toxicroak').learnset.crosspoison = ["9L0"];
		this.species.getLearnsetData('toxicroak').learnset.toxic = ["9M"];
		// Carnivine
		this.species.getLearnsetData('carnivine').learnset.frenzyplant = ["9D"];
		this.species.getLearnsetData('carnivine').learnset.wrap = ["9L1"];
		this.species.getLearnsetData('carnivine').learnset.bite = ["9L4"];
		this.species.getLearnsetData('carnivine').learnset.vinewhip = ["9L7"];
		this.species.getLearnsetData('carnivine').learnset.sweetscent = ["9L11"];
		this.species.getLearnsetData('carnivine').learnset.ingrain = ["9L14"];
		this.species.getLearnsetData('carnivine').learnset.vicegrip = ["9L17"];
		this.species.getLearnsetData('carnivine').learnset.razorleaf = ["9L21"];
		this.species.getLearnsetData('carnivine').learnset.leaftornado = ["9L24"];
		this.species.getLearnsetData('carnivine').learnset.feintattack = ["9L27"];
		this.species.getLearnsetData('carnivine').learnset.stockpile = ["9L31"];
		this.species.getLearnsetData('carnivine').learnset.spitup = ["9L31"];
		this.species.getLearnsetData('carnivine').learnset.swallow = ["9L31"];
		this.species.getLearnsetData('carnivine').learnset.crunch = ["9L34"];
		this.species.getLearnsetData('carnivine').learnset.wringout = ["9L37"];
		this.species.getLearnsetData('carnivine').learnset.snaptrap = ["9L41"];
		this.species.getLearnsetData('carnivine').learnset.powerwhip = ["9L44"];
		this.species.getLearnsetData('carnivine').learnset.jawlock = ["9L47"];
		this.species.getLearnsetData('carnivine').learnset.grassyterrain = ["9M"];
		this.species.getLearnsetData('carnivine').learnset.naturalgift = ["9M"];
		this.species.getLearnsetData('carnivine').learnset.trailhead = ["9M"];
		this.species.getLearnsetData('carnivine').learnset.bind = ["9E"];
		delete this.species.getLearnsetData('carnivine').learnset.defog;
		// Finneon
		this.species.getLearnsetData('finneon').learnset.quiverdance = ["9D"];
		this.species.getLearnsetData('finneon').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('finneon').learnset.flash = ["9M"];
		delete this.species.getLearnsetData('finneon').learnset.blizzard;
		// Lumineon
		this.species.getLearnsetData('lumineon').learnset.quiverdance = ["9D"];
		this.species.getLearnsetData('lumineon').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('lumineon').learnset.flash = ["9M"];
		this.species.getLearnsetData('lumineon').learnset.naturepower = ["9M"];
		delete this.species.getLearnsetData('lumineon').learnset.blizzard;
		// Mantyke
		this.species.getLearnsetData('mantyke').learnset.skydrop = ["9D"];
		this.species.getLearnsetData('mantyke').learnset.waterpulse = ["9L7","9M"];
		this.species.getLearnsetData('mantyke').learnset.bubblebeam = ["9L19"];
		this.species.getLearnsetData('mantyke').learnset.chillywater = ["9M"];
		delete this.species.getLearnsetData('mantyke').learnset.blizzard;
		delete this.species.getLearnsetData('mantyke').learnset.earthquake;
		// Snover
		this.species.getLearnsetData('snover').learnset.icehammer = ["9D"];
		this.species.getLearnsetData('snover').learnset.branchpoke = ["9L5"];
		delete this.species.getLearnsetData('snover').learnset.razorleaf;
		// Abomasnow
		this.species.getLearnsetData('abomasnow').learnset.icehammer = ["9D"];
		this.species.getLearnsetData('abomasnow').learnset.icepunch = ["9L0", "9M"];
		this.species.getLearnsetData('abomasnow').learnset.branchpoke = ["9L5"];
		delete this.species.getLearnsetData('abomasnow').learnset.razorleaf;
		// Weavile
		this.species.getLearnsetData('weavile').learnset.razorwind = ["9D"];
		this.species.getLearnsetData('weavile').learnset.nightmare = ["9M"];
		delete this.species.getLearnsetData('weavile').learnset.metronome;
		// Magnezone
		this.species.getLearnsetData('magnezone').learnset.electrify = ["9D"];
		this.species.getLearnsetData('magnezone').learnset.eerieimpulse = ["9M"];
		this.species.getLearnsetData('magnezone').learnset.flash = ["9M"];
		// Lickilicky
		this.species.getLearnsetData('lickilicky').learnset.soak = ["9D"];
		this.species.getLearnsetData('lickilicky').learnset.toxic = ["9M"];
		// Rhyperior
		this.species.getLearnsetData('rhyperior').learnset.headsmash = ["9D"];
		this.species.getLearnsetData('rhyperior').learnset.scaryface = ["9L1"];
		this.species.getLearnsetData('rhyperior').learnset.stomp = ["9L9"];
		this.species.getLearnsetData('rhyperior').learnset.tussle = ["9L17"];
		this.species.getLearnsetData('rhyperior').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('rhyperior').learnset.trailhead = ["9M"];
		// Tangrowth
		this.species.getLearnsetData('tangrowth').learnset.morningsun = ["9D"];
		this.species.getLearnsetData('tangrowth').learnset.amnesia = ["9M"];
		this.species.getLearnsetData('tangrowth').learnset.trailhead = ["9M"];
		// Electivire
		this.species.getLearnsetData('electivire').learnset.plasmafists = ["9D"];
		this.species.getLearnsetData('electivire').learnset.completeshock = ["9L69"];
		this.species.getLearnsetData('electivire').learnset.flash = ["9M"];
		// Magmortar
		this.species.getLearnsetData('magmortar').learnset.searingshot = ["9D"];
		this.species.getLearnsetData('magmortar').learnset.napalm = ["9L69"];
		this.species.getLearnsetData('magmortar').learnset.amnesia = ["9M"];
		this.species.getLearnsetData('magmortar').learnset.flash = ["9M"];
		this.species.getLearnsetData('magmortar').learnset.flashcannon = ["9M"];
		this.species.getLearnsetData('magmortar').learnset.shockwave = ["9M"];
		this.species.getLearnsetData('magmortar').learnset.sludgebomb = ["9M"];
		// Togekiss
		this.species.getLearnsetData('togekiss').learnset.softboiled = ["9D"];
		this.species.getLearnsetData('togekiss').learnset.daydream = ["9L1"];
		this.species.getLearnsetData('togekiss').learnset.flash = ["9M"];
		this.species.getLearnsetData('togekiss').learnset.naturalgift = ["9M"];
		delete this.species.getLearnsetData('togekiss').learnset.fireblast;
		delete this.species.getLearnsetData('togekiss').learnset.growl;
		// Yanmega
		this.species.getLearnsetData('yanmega').learnset.fellswoop = ["9D"];
		this.species.getLearnsetData('yanmega').learnset.bugcloud = ["9L1"];
		this.species.getLearnsetData('yanmega').learnset.fly = ["9M"];
		this.species.getLearnsetData('yanmega').learnset.vitaldrain = ["9M"];
		delete this.species.getLearnsetData('yanmega').learnset.leechlife;
		// Leafeon
		this.species.getLearnsetData('leafeon').learnset.camouflage = ["9D"];
		this.species.getLearnsetData('leafeon').learnset.leafage = ["9L0"];
		this.species.getLearnsetData('leafeon').learnset.razorleaf = ["9L20"];
		this.species.getLearnsetData('leafeon').learnset.sunnyday = ["9L27","9M"];
		this.species.getLearnsetData('leafeon').learnset.leafblade = ["9L37"];
		this.species.getLearnsetData('leafeon').learnset.solarblade = ["9L45"];
		this.species.getLearnsetData('leafeon').learnset.naturalgift = ["9M"];
		delete this.species.getLearnsetData('leafeon').learnset.knockoff;
		delete this.species.getLearnsetData('leafeon').learnset.magicalleaf;
		// Glaceon
		this.species.getLearnsetData('glaceon').learnset.spikyshield = ["9D"];
		this.species.getLearnsetData('glaceon').learnset.snowscape = ["9L25","9M"];
		this.species.getLearnsetData('glaceon').learnset.icebeam = ["9L37","9M"];
		this.species.getLearnsetData('glaceon').learnset.trailhead = ["9M"];
		delete this.species.getLearnsetData('glaceon').learnset.iceshard;
		// Gliscor
		this.species.getLearnsetData('gliscor').learnset.skydrop = ["9D"];
		this.species.getLearnsetData('gliscor').learnset.breakingswipe = ["9M"];
		this.species.getLearnsetData('gliscor').learnset.toxic = ["9M"];
		// Mamoswine
		this.species.getLearnsetData('mamoswine').learnset.highhorsepower = ["9D"];
		this.species.getLearnsetData('mamoswine').learnset.doublehit = ["9L0"];
		this.species.getLearnsetData('mamoswine').learnset.tussle = ["9L18"];
		this.species.getLearnsetData('mamoswine').learnset.mudbomb = ["9L21"];
		this.species.getLearnsetData('mamoswine').learnset.snowscape = ["9L24","9M"];
		this.species.getLearnsetData('mamoswine').learnset.icefang = ["9L28"];
		this.species.getLearnsetData('mamoswine').learnset.takedown = ["9L33"];
		// Porygon-Z
		this.species.getLearnsetData('porygonz').learnset.technoblast = ["9D"];
		this.species.getLearnsetData('porygonz').learnset.flash = ["9M"];
		this.species.getLearnsetData('porygonz').learnset.powergem = ["9M"];
		// Gallade
		this.species.getLearnsetData('gallade').learnset.sacredsword = ["9D"];
		this.species.getLearnsetData('gallade').learnset.confide = ["9L1"];
		this.species.getLearnsetData('gallade').learnset.confusion = ["9L1"];
		this.species.getLearnsetData('gallade').learnset.daydream = ["9L4"];
		this.species.getLearnsetData('gallade').learnset.flash = ["9M"];
		this.species.getLearnsetData('gallade').learnset.nightmare = ["9M"];
		// Probopass
		this.species.getLearnsetData('probopass').learnset.electrify = ["9D"];
		this.species.getLearnsetData('probopass').learnset.bodypress = ["9M"];
		this.species.getLearnsetData('probopass').learnset.steelbeam = ["9M"];
		// Dusknoir
		this.species.getLearnsetData('dusknoir').learnset.spectralthief = ["9D"];
		this.species.getLearnsetData('dusknoir').learnset.drainpunch = ["9M"];
		this.species.getLearnsetData('dusknoir').learnset.flash = ["9M"];
		this.species.getLearnsetData('dusknoir').learnset.midnight = ["9M"];
		this.species.getLearnsetData('dusknoir').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('dusknoir').learnset.phantomforce = ["9M"];
		// Froslass
		this.species.getLearnsetData('froslass').learnset.sheercold = ["9D"];
		this.species.getLearnsetData('froslass').learnset.frostbreath = ["9L37","9M"];
		this.species.getLearnsetData('froslass').learnset.flash = ["9M"];
		this.species.getLearnsetData('froslass').learnset.nightmare = ["9M"];
		delete this.species.getLearnsetData('froslass').learnset.thunder;
		delete this.species.getLearnsetData('froslass').learnset.wakeupslap;
		// Rotom
		this.species.getLearnsetData('rotom').learnset.electrify = ["9D"];
		this.species.getLearnsetData('rotom').learnset.charge = ["9L1"];
		this.species.getLearnsetData('rotom').learnset.eerieimpulse = ["9L57","9M"];
		this.species.getLearnsetData('rotom').learnset.flash = ["9M"];
		delete this.species.getLearnsetData('rotom').learnset.defog;
		// Rotom Wash
		this.species.getLearnsetData('rotomwash').learnset.whirlpool = ["9D"];
		this.species.getLearnsetData('rotomwash').learnset.bubble = ["9L1"];
		this.species.getLearnsetData('rotomwash').learnset.soak = ["9L1"];
		this.species.getLearnsetData('rotomwash').learnset.bubblebeam = ["9L27"];
		this.species.getLearnsetData('rotomwash').learnset.muddywater = ["9L50"];
		this.species.getLearnsetData('rotomwash').learnset.hydropump = ["9R, 9M"];
		this.species.getLearnsetData('rotomwash').learnset.flash = ["9M"];
		this.species.getLearnsetData('rotomwash').learnset.hex = ["9M"];
		delete this.species.getLearnsetData('rotomwash').learnset.astonish;
		delete this.species.getLearnsetData('rotomwash').learnset.confuseray;
		delete this.species.getLearnsetData('rotomwash').learnset.defog;
		delete this.species.getLearnsetData('rotomwash').learnset.ominouswind;
		// Rotom Heat
		this.species.getLearnsetData('rotomheat').learnset.firespin = ["9D"];
		this.species.getLearnsetData('rotomheat').learnset.ember = ["9L1"];
		this.species.getLearnsetData('rotomheat').learnset.preheat = ["9L1"];
		this.species.getLearnsetData('rotomheat').learnset.incinerate = ["9L27, 9M"];
		this.species.getLearnsetData('rotomheat').learnset.heatwave = ["9L50, 9M"];
		this.species.getLearnsetData('rotomheat').learnset.overheat = ["9R, 9M"];
		this.species.getLearnsetData('rotomheat').learnset.flash = ["9M"];
		this.species.getLearnsetData('rotomheat').learnset.hex = ["9M"];
		delete this.species.getLearnsetData('rotomheat').learnset.astonish;
		delete this.species.getLearnsetData('rotomheat').learnset.confuseray;
		delete this.species.getLearnsetData('rotomheat').learnset.defog;
		delete this.species.getLearnsetData('rotomheat').learnset.ominouswind;
		// Rotom Frost
		this.species.getLearnsetData('rotomfrost').learnset.frostbreath = ["9D"];
		this.species.getLearnsetData('rotomfrost').learnset.icywind = ["9L1"];
		this.species.getLearnsetData('rotomfrost').learnset.snowscape = ["9L1, 9M"];
		this.species.getLearnsetData('rotomfrost').learnset.freezedry = ["9L27"];
		this.species.getLearnsetData('rotomfrost').learnset.icebeam = ["9L50, 9M"];
		this.species.getLearnsetData('rotomfrost').learnset.blizzard = ["9R, 9M"];
		this.species.getLearnsetData('rotomfrost').learnset.flash = ["9M"];
		this.species.getLearnsetData('rotomfrost').learnset.hex = ["9M"];
		delete this.species.getLearnsetData('rotomfrost').learnset.astonish;
		delete this.species.getLearnsetData('rotomfrost').learnset.confuseray;
		delete this.species.getLearnsetData('rotomfrost').learnset.defog;
		delete this.species.getLearnsetData('rotomfrost').learnset.ominouswind;
		// Rotom Fan
		this.species.getLearnsetData('rotomfan').learnset.rapidspin = ["9D"];
		this.species.getLearnsetData('rotomfan').learnset.gust = ["9L1"];
		this.species.getLearnsetData('rotomfan').learnset.defog = ["9L1, 9M"];
		this.species.getLearnsetData('rotomfan').learnset.aerate = ["9L27"];
		this.species.getLearnsetData('rotomfan').learnset.airslash = ["9L50"];
		this.species.getLearnsetData('rotomfan').learnset.hurricane = ["9R, 9M"];
		this.species.getLearnsetData('rotomfan').learnset.flash = ["9M"];
		this.species.getLearnsetData('rotomfan').learnset.hex = ["9M"];
		delete this.species.getLearnsetData('rotomfan').learnset.astonish;
		delete this.species.getLearnsetData('rotomfan').learnset.confuseray;
		delete this.species.getLearnsetData('rotomfan').learnset.ominouswind;
		// Rotom Mow
		this.species.getLearnsetData('rotommow').learnset.cut = ["9D"];
		this.species.getLearnsetData('rotommow').learnset.leafage = ["9L1"];
		this.species.getLearnsetData('rotommow').learnset.grassyterrain = ["9L1, 9M"];
		this.species.getLearnsetData('rotommow').learnset.leaftornado = ["9L27"];
		this.species.getLearnsetData('rotommow').learnset.energyball = ["9L50, 9M"];
		this.species.getLearnsetData('rotommow').learnset.leafstorm = ["9R"];
		this.species.getLearnsetData('rotommow').learnset.flash = ["9M"];
		this.species.getLearnsetData('rotommow').learnset.hex = ["9M"];
		delete this.species.getLearnsetData('rotommow').learnset.astonish;
		delete this.species.getLearnsetData('rotommow').learnset.confuseray;
		delete this.species.getLearnsetData('rotommow').learnset.defog;
		delete this.species.getLearnsetData('rotommow').learnset.ominouswind;
		// Uxie
		this.species.getLearnsetData('uxie').learnset.guardswap = ["9D"];
		this.species.getLearnsetData('uxie').learnset.barrierbash = ["9L21"];
		this.species.getLearnsetData('uxie').learnset.flash = ["9M"];
		this.species.getLearnsetData('uxie').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('uxie').learnset.powergem = ["9M"];
		delete this.species.getLearnsetData('uxie').learnset.knockoff;
		// Mesprit
		this.species.getLearnsetData('mesprit').learnset.heartswap = ["9D"];
		this.species.getLearnsetData('mesprit').learnset.barrierbash = ["9L21"];
		this.species.getLearnsetData('mesprit').learnset.calmmind = ["9L42", "9M"];
		this.species.getLearnsetData('mesprit').learnset.luckychant = ["9L56"];
		this.species.getLearnsetData('mesprit').learnset.charm = ["9M"];
		this.species.getLearnsetData('mesprit').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('mesprit').learnset.flash = ["9M"];
		this.species.getLearnsetData('mesprit').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('mesprit').learnset.powergem = ["9M"];
		delete this.species.getLearnsetData('mesprit').learnset.flatter;
		delete this.species.getLearnsetData('mesprit').learnset.knockoff;
		delete this.species.getLearnsetData('mesprit').learnset.thunder;
		// Azelf
		this.species.getLearnsetData('azelf').learnset.powerswap = ["9D"];
		this.species.getLearnsetData('azelf').learnset.barrierbash = ["9L21"];
		this.species.getLearnsetData('azelf').learnset.flash = ["9M"];
		this.species.getLearnsetData('azelf').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('azelf').learnset.powergem = ["9M"];
		delete this.species.getLearnsetData('azelf').learnset.knockoff;
		delete this.species.getLearnsetData('azelf').learnset.thunder;
		// Dialga
		this.species.getLearnsetData('dialga').learnset.doomdesire = ["9D"];
		this.species.getLearnsetData('dialga').learnset.teleport = ["9L1"];
		this.species.getLearnsetData('dialga').learnset.metalburst = ["9L32"];
		this.species.getLearnsetData('dialga').learnset.flashcannon = ["9L64","9M"];
		this.species.getLearnsetData('dialga').learnset.flash = ["9M"];
		this.species.getLearnsetData('dialga').learnset.futuresight = ["9M"];
		this.species.getLearnsetData('dialga').learnset.screech = ["9M"];
		this.species.getLearnsetData('dialga').learnset.stasis = ["9T"];
		// Palkia
		this.species.getLearnsetData('palkia').learnset.hyperspacehole = ["9D"];
		this.species.getLearnsetData('palkia').learnset.teleport = ["9L1"];
		this.species.getLearnsetData('palkia').learnset.aquacutter = ["9L64"];
		this.species.getLearnsetData('palkia').learnset.aquatail = ["9M"];
		this.species.getLearnsetData('palkia').learnset.screech = ["9M"];
		this.species.getLearnsetData('palkia').learnset.telekinesis = ["9M"];
		this.species.getLearnsetData('palkia').learnset.meteorbeam = ["9T"];
		// Heatran
		this.species.getLearnsetData('heatran').learnset.eruption = ["9D"];
		// Regigigas
		this.species.getLearnsetData('regigigas').learnset.storedpower = ["9D"];
		this.species.getLearnsetData('regigigas').learnset.poweruppunch = ["9L15"];
		this.species.getLearnsetData('regigigas').learnset.chipaway = ["9M"];
		// Giratina
		this.species.getLearnsetData('giratina').learnset.punishment = ["9D"];
		this.species.getLearnsetData('giratina').learnset.teleport = ["9L1"];
		this.species.getLearnsetData('giratina').learnset.scaryface = ["9L1"];
		this.species.getLearnsetData('giratina').learnset.shadowsneak = ["9L1"];
		this.species.getLearnsetData('giratina').learnset.dragonbreath = ["9L8"];
		this.species.getLearnsetData('giratina').learnset.ancientpower = ["9L16"];
		this.species.getLearnsetData('giratina').learnset.slash = ["9L24"];
		this.species.getLearnsetData('giratina').learnset.painsplit = ["9L32","9M"];
		this.species.getLearnsetData('giratina').learnset.dragonclaw = ["9L40","9M"];
		this.species.getLearnsetData('giratina').learnset.aurasphere = ["9L48"];
		this.species.getLearnsetData('giratina').learnset.destinybond = ["9L56"];
		this.species.getLearnsetData('giratina').learnset.shadowclaw = ["9L64","9M"];
		this.species.getLearnsetData('giratina').learnset.earthpower = ["9L72","9M"];
		this.species.getLearnsetData('giratina').learnset.shadowforce = ["9L80"];
		this.species.getLearnsetData('giratina').learnset.dragonhammer = ["9L88"];
		this.species.getLearnsetData('giratina').learnset.bodypress = ["9M"];
		this.species.getLearnsetData('giratina').learnset.midnight = ["9T"];
		this.species.getLearnsetData('giratina').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('giratina').learnset.screech = ["9M"];
		// Cresselia
		this.species.getLearnsetData('cresselia').learnset.lunarray = ["9D"];
		this.species.getLearnsetData('cresselia').learnset.amnesia = ["9M"];
		this.species.getLearnsetData('cresselia').learnset.flash = ["9M"];
		this.species.getLearnsetData('cresselia').learnset.meteorbeam = ["9T"];
		// Phione
		this.species.getLearnsetData('phione').learnset.lifedew = ["9D"];
		this.species.getLearnsetData('phione').learnset.amnesia = ["9M"];
		this.species.getLearnsetData('phione').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('phione').learnset.powergem = ["9M"];
		// Manaphy
		this.species.getLearnsetData('manaphy').learnset.lifedew = ["9D"];
		this.species.getLearnsetData('manaphy').learnset.amnesia = ["9M"];
		this.species.getLearnsetData('manaphy').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('manaphy').learnset.flash = ["9M"];
		this.species.getLearnsetData('manaphy').learnset.powergem = ["9M"];
		// Darkrai
		this.species.getLearnsetData('darkrai').learnset.fallenarrow = ["9D"];
		this.species.getLearnsetData('darkrai').learnset.compensation = ["9M"];
		this.species.getLearnsetData('darkrai').learnset.hex = ["9M"];
		this.species.getLearnsetData('darkrai').learnset.midnight = ["9T"];
		this.species.getLearnsetData('darkrai').learnset.phantomforce = ["9M"];
		delete this.species.getLearnsetData('darkrai').learnset.flash;
		// Shaymin
		this.species.getLearnsetData('shaymin').learnset.cottonguard = ["9D"];
		this.species.getLearnsetData('shaymin').learnset.amnesia = ["9M"];
		this.species.getLearnsetData('shaymin').learnset.flash = ["9M"];
		this.species.getLearnsetData('shaymin').learnset.grassyterrain = ["9L1","9M"];
		delete this.species.getLearnsetData('shaymin').learnset.airslash;
		// Shaymin Sky
		this.species.getLearnsetData('shayminsky').learnset.cottonspore = ["9D"];
		this.species.getLearnsetData('shayminsky').learnset.amnesia = ["9M"];
		this.species.getLearnsetData('shayminsky').learnset.flash = ["9M"];
		delete this.species.getLearnsetData('shayminsky').learnset.cottonguard;
		// Arceus
		this.species.getLearnsetData('arceus').learnset.equalizer = ["9D"];
		this.species.getLearnsetData('arceus').learnset.ancientpower = ["9L20"];
		this.species.getLearnsetData('arceus').learnset.recover = ["9L50"];
		this.species.getLearnsetData('arceus').learnset.eminence = ["9L70"];
		this.species.getLearnsetData('arceus').learnset.breakingswipe = ["9M"];
		this.species.getLearnsetData('arceus').learnset.earthpower = ["9M"];
		this.species.getLearnsetData('arceus').learnset.flash = ["9M"];
		this.species.getLearnsetData('arceus').learnset.hurricane = ["9M"];
		this.species.getLearnsetData('arceus').learnset.metronome = ["9M"];
		this.species.getLearnsetData('arceus').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('arceus').learnset.screech = ["9M"];
		this.species.getLearnsetData('arceus').learnset.toxic = ["9M"];
		this.species.getLearnsetData('arceus').learnset.superpower = ["9M"];
		this.species.getLearnsetData('arceus').learnset.meteorbeam = ["9T"];
		this.species.getLearnsetData('arceus').learnset.stasis = ["9T"];
		this.species.getLearnsetData('arceus').learnset.steelbeam = ["9T"];
		this.species.getLearnsetData('arceus').learnset.blastburn = ["9T"];
		this.species.getLearnsetData('arceus').learnset.frenzyplant = ["9T"];
		this.species.getLearnsetData('arceus').learnset.hydrocannon = ["9T"];
		this.species.getLearnsetData('arceus').learnset.roaroftime = ["9E"];
		this.species.getLearnsetData('arceus').learnset.shadowforce = ["9E"];
		this.species.getLearnsetData('arceus').learnset.spacialrend = ["9E"];
		// Victini
		this.species.getLearnsetData('victini').learnset.vcreate = ["9D"];
		this.species.getLearnsetData('victini').learnset.napalm = ["9L1"];
		this.species.getLearnsetData('victini').learnset.victorydance = ["9L65"];
		this.species.getLearnsetData('victini').learnset.flash = ["9M"];
		this.species.getLearnsetData('victini').learnset.metronome = ["9M"];
		this.species.getLearnsetData('victini').learnset.blueflare = ["9E"];
		this.species.getLearnsetData('victini').learnset.boltstrike = ["9E"];
		delete this.species.getLearnsetData('victini').learnset.doubleedge;
		// Snivy
		this.species.getLearnsetData('snivy').learnset.aromatherapy = ["9D"];
		this.species.getLearnsetData('snivy').learnset.flash = ["9M"];
		this.species.getLearnsetData('snivy').learnset.naturalgift = ["9M"];
		delete this.species.getLearnsetData('snivy').learnset.defog;
		// Servine
		this.species.getLearnsetData('servine').learnset.aromatherapy = ["9D"];
		this.species.getLearnsetData('servine').learnset.flash = ["9M"];
		this.species.getLearnsetData('servine').learnset.naturalgift = ["9M"];
		delete this.species.getLearnsetData('servine').learnset.defog;
		// Serperior
		this.species.getLearnsetData('serperior').learnset.aromatherapy = ["9D"];
		this.species.getLearnsetData('serperior').learnset.powerwhip = ["9L1"];
		this.species.getLearnsetData('serperior').learnset.bind = ["9L1"];
		this.species.getLearnsetData('serperior').learnset.flash = ["9M"];
		this.species.getLearnsetData('serperior').learnset.naturalgift = ["9M"];
		delete this.species.getLearnsetData('serperior').learnset.defog;
		delete this.species.getLearnsetData('serperior').learnset.wrap;
		// Tepig
		this.species.getLearnsetData('tepig').learnset.stomp = ["9D"];
		// Pignite
		this.species.getLearnsetData('pignite').learnset.submission = ["9D"];
		this.species.getLearnsetData('pignite').learnset.bodypress = ["9L39", "9M"];
		this.species.getLearnsetData('pignite').learnset.flamethrower = ["9M"];
		// Emboar
		this.species.getLearnsetData('emboar').learnset.submission = ["9D"];
		this.species.getLearnsetData('emboar').learnset.bodypress = ["9L43", "9M"];
		this.species.getLearnsetData('emboar').learnset.flamethrower = ["9M"];
		// Oshawott
		this.species.getLearnsetData('oshawott').learnset.sacredsword = ["9D"];
		this.species.getLearnsetData('oshawott').learnset.swing = ["9L17"];
		this.species.getLearnsetData('oshawott').learnset.razorshell = ["9L23"];
		this.species.getLearnsetData('oshawott').learnset.waterpulse = ["9M"];
		this.species.getLearnsetData('oshawott').learnset.whirlpool = ["9M"];
		delete this.species.getLearnsetData('oshawott').learnset.blizzard;
		// Dewott
		this.species.getLearnsetData('dewott').learnset.sacredsword = ["9D"];
		this.species.getLearnsetData('dewott').learnset.swing = ["9L18"];
		this.species.getLearnsetData('dewott').learnset.razorshell = ["9L26"];
		this.species.getLearnsetData('dewott').learnset.waterpulse = ["9M"];
		this.species.getLearnsetData('dewott').learnset.whirlpool = ["9M"];
		delete this.species.getLearnsetData('dewott').learnset.blizzard;
		// Samurott
		this.species.getLearnsetData('samurott').learnset.sacredsword = ["9D"];
		this.species.getLearnsetData('samurott').learnset.fullcollide = ["9M"];
		this.species.getLearnsetData('samurott').learnset.swing = ["9L18"];
		this.species.getLearnsetData('samurott').learnset.razorshell = ["9L26"];
		this.species.getLearnsetData('samurott').learnset.waterpulse = ["9M"];
		this.species.getLearnsetData('samurott').learnset.whirlpool = ["9M"];
		delete this.species.getLearnsetData('samurott').learnset.blizzard;
		// Samurott Hisui
		this.species.getLearnsetData('samurotthisui').learnset.metaledge = ["9D"];
		this.species.getLearnsetData('samurotthisui').learnset.swing = ["9L18"];
		this.species.getLearnsetData('samurotthisui').learnset.razorshell = ["9L26"];
		this.species.getLearnsetData('samurotthisui').learnset.waterpulse = ["9M"];
		this.species.getLearnsetData('samurotthisui').learnset.whirlpool = ["9M"];
		delete this.species.getLearnsetData('samurotthisui').learnset.blizzard;
		// Patrat
		this.species.getLearnsetData('patrat').learnset.stuffcheeks = ["9D"];
		this.species.getLearnsetData('patrat').learnset.dig = ["9M"];
		this.species.getLearnsetData('patrat').learnset.flash = ["9M"];
		delete this.species.getLearnsetData('patrat').learnset.thunder;
		delete this.species.getLearnsetData('patrat').learnset.thunderbolt;
		// Watchog
		this.species.getLearnsetData('watchog').learnset.obstruct = ["9D"];
		this.species.getLearnsetData('watchog').learnset.dig = ["9M"];
		this.species.getLearnsetData('watchog').learnset.flash = ["9M"];
		this.species.getLearnsetData('watchog').learnset.incinerate = ["9M"];
		delete this.species.getLearnsetData('watchog').learnset.thunder;
		// Lillipup
		this.species.getLearnsetData('lillipup').learnset.holdback = ["9D"];
		this.species.getLearnsetData('lillipup').learnset.trailhead = ["9M"];
		delete this.species.getLearnsetData('lillipup').learnset.thunderbolt;
		// Herdier
		this.species.getLearnsetData('herdier').learnset.holdback = ["9D"];
		this.species.getLearnsetData('herdier').learnset.trailhead = ["9M"];
		delete this.species.getLearnsetData('herdier').learnset.thunderbolt;
		// Stoutland
		this.species.getLearnsetData('stoutland').learnset.holdback = ["9D"];
		this.species.getLearnsetData('stoutland').learnset.avalanche = ["9M"];
		this.species.getLearnsetData('stoutland').learnset.trailhead = ["9M"];
		delete this.species.getLearnsetData('stoutland').learnset.thunder;
		// Purrloin
		this.species.getLearnsetData('purrloin').learnset.partingshot = ["9D"];
		this.species.getLearnsetData('purrloin').learnset.doubleteam = ["9E"];
		this.species.getLearnsetData('purrloin').learnset.nightmare = ["9M"];
		// Liepard
		this.species.getLearnsetData('liepard').learnset.partingshot = ["9D"];
		this.species.getLearnsetData('liepard').learnset.nightmare = ["9M"];
		// Pansage
		this.species.getLearnsetData('pansage').learnset.grasspledge = ["9D"];
		this.species.getLearnsetData('pansage').learnset.amnesia = ["9M"];
		this.species.getLearnsetData('pansage').learnset.screech = ["9M"];
		this.species.getLearnsetData('pansage').learnset.trailhead = ["9M"];
		// Simisage
		this.species.getLearnsetData('simisage').learnset.grasspledge = ["9D"];
		this.species.getLearnsetData('simisage').learnset.amnesia = ["9M"];
		this.species.getLearnsetData('simisage').learnset.screech = ["9M"];
		this.species.getLearnsetData('simisage').learnset.trailhead = ["9M"];
		// Pansear
		this.species.getLearnsetData('pansear').learnset.firepledge = ["9D"];
		this.species.getLearnsetData('pansear').learnset.preheat = ["9L16"];
		this.species.getLearnsetData('pansear').learnset.yawn = ["9L25"];
		this.species.getLearnsetData('pansear').learnset.amnesia = ["9M"];
		this.species.getLearnsetData('pansear').learnset.flash = ["9M"];
		this.species.getLearnsetData('pansear').learnset.screech = ["9M"];
		this.species.getLearnsetData('pansear').learnset.trailhead = ["9M"];
		// Simisear
		this.species.getLearnsetData('simisear').learnset.firepledge = ["9D"];
		this.species.getLearnsetData('simisear').learnset.preheat = ["9L1"];
		this.species.getLearnsetData('simisear').learnset.yawn = ["9L1"];
		this.species.getLearnsetData('simisear').learnset.amnesia = ["9M"];
		this.species.getLearnsetData('simisear').learnset.flash = ["9M"];
		this.species.getLearnsetData('simisear').learnset.screech = ["9M"];
		this.species.getLearnsetData('simisear').learnset.trailhead = ["9M"];
		// Panpour
		this.species.getLearnsetData('panpour').learnset.waterpledge = ["9D"];
		this.species.getLearnsetData('panpour').learnset.jetpunch = ["9L22"];
		this.species.getLearnsetData('panpour').learnset.scald = ["9L36", "9M"];
		this.species.getLearnsetData('panpour').learnset.amnesia = ["9M"];
		this.species.getLearnsetData('panpour').learnset.brine = ["9M"];
		this.species.getLearnsetData('panpour').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('panpour').learnset.screech = ["9M"];
		this.species.getLearnsetData('panpour').learnset.trailhead = ["9M"];
		this.species.getLearnsetData('panpour').learnset.whirlpool = ["9M"];
		delete this.species.getLearnsetData('panpour').learnset.blizzard;
		// Simipour
		this.species.getLearnsetData('simipour').learnset.waterpledge = ["9D"];
		this.species.getLearnsetData('simipour').learnset.jetpunch = ["9L22"];
		this.species.getLearnsetData('simipour').learnset.scald = ["9L36", "9M"];
		this.species.getLearnsetData('simipour').learnset.amnesia = ["9M"];
		this.species.getLearnsetData('simipour').learnset.brine = ["9M"];
		this.species.getLearnsetData('simipour').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('simipour').learnset.screech = ["9M"];
		this.species.getLearnsetData('simipour').learnset.trailhead = ["9M"];
		this.species.getLearnsetData('simipour').learnset.whirlpool = ["9M"];
		delete this.species.getLearnsetData('simipour').learnset.blizzard;
		// Munna
		this.species.getLearnsetData('munna').learnset.aromaticmist = ["9D"];
		this.species.getLearnsetData('munna').learnset.daydream = ["9E"];
		// Musharna
		this.species.getLearnsetData('musharna').learnset.strangesmoke = ["9D"];
		// Pidove
		this.species.getLearnsetData('pidove').learnset.captivate = ["9D"];
		// Tranquill
		this.species.getLearnsetData('tranquill').learnset.captivate = ["9D"];
		// Unfezant
		this.species.getLearnsetData('unfezant').learnset.captivate = ["9D"];
		// Blitzle
		this.species.getLearnsetData('blitzle').learnset.jumpkick = ["9D"];
		this.species.getLearnsetData('blitzle').learnset.flash = ["9M"];
		this.species.getLearnsetData('blitzle').learnset.trailhead = ["9M"];
		// Zebstrika
		this.species.getLearnsetData('zebstrika').learnset.volttackle = ["9D"];
		this.species.getLearnsetData('zebstrika').learnset.eerieimpulse = ["9M"];
		this.species.getLearnsetData('zebstrika').learnset.electricterrain = ["9M"];
		this.species.getLearnsetData('zebstrika').learnset.flash = ["9M"];
		this.species.getLearnsetData('zebstrika').learnset.trailhead = ["9M"];
		// Roggenrola
		this.species.getLearnsetData('roggenrola').learnset.mirrorshot = ["9D"];
		this.species.getLearnsetData('roggenrola').learnset.smackdown = ["9L17", "9M"];
		this.species.getLearnsetData('roggenrola').learnset.rockclimb = ["9L23"];
		delete this.species.getLearnsetData('roggenrola').learnset.earthquake;
		delete this.species.getLearnsetData('roggenrola').learnset.meteorbeam;
		delete this.species.getLearnsetData('roggenrola').learnset.mudslap;
		// Boldore
		this.species.getLearnsetData('boldore').learnset.mirrorshot = ["9D"];
		this.species.getLearnsetData('boldore').learnset.smackdown = ["9L17", "9M"];
		this.species.getLearnsetData('boldore').learnset.rockclimb = ["9L23"];
		this.species.getLearnsetData('boldore').learnset.trailhead = ["9M"];
		delete this.species.getLearnsetData('boldore').learnset.meteorbeam;
		delete this.species.getLearnsetData('boldore').learnset.mudslap;
		// Gigalith
		this.species.getLearnsetData('gigalith').learnset.diamondstorm = ["9D"];
		this.species.getLearnsetData('gigalith').learnset.smackdown = ["9L17", "9M"];
		this.species.getLearnsetData('gigalith').learnset.rockclimb = ["9L23"];
		this.species.getLearnsetData('gigalith').learnset.trailhead = ["9M"];
		delete this.species.getLearnsetData('gigalith').learnset.meteorbeam;
		delete this.species.getLearnsetData('gigalith').learnset.mudslap;
		// Woobat
		this.species.getLearnsetData('woobat').learnset.pluck = ["9D"];
		this.species.getLearnsetData('woobat').learnset.simplebeam = ["9L53"];
		delete this.species.getLearnsetData('woobat').learnset.gyroball;
		delete this.species.getLearnsetData('woobat').learnset.knockoff;
		// Swoobat
		this.species.getLearnsetData('swoobat').learnset.pluck = ["9D"];
		this.species.getLearnsetData('swoobat').learnset.simplebeam = ["9L53"];
		delete this.species.getLearnsetData('swoobat').learnset.gyroball;
		delete this.species.getLearnsetData('swoobat').learnset.knockoff;
		// Drilbur
		this.species.getLearnsetData('drilbur').learnset.metaledge = ["9D"];
		this.species.getLearnsetData('drilbur').learnset.drillrun = ["9L33", "9M"];
		this.species.getLearnsetData('drilbur').learnset.earthquake = ["9L43", "9M"];
		this.species.getLearnsetData('drilbur').learnset.escapetunnel = ["9L47"];
		this.species.getLearnsetData('drilbur').learnset.fissure = ["9L50"];
		this.species.getLearnsetData('drilbur').learnset.chipaway = ["9M"];
		// Excadrill
		this.species.getLearnsetData('excadrill').learnset.metaledge = ["9D"];
		this.species.getLearnsetData('excadrill').learnset.drillrun = ["9L36", "9M"];
		this.species.getLearnsetData('excadrill').learnset.earthquake = ["9L45", "9M"];
		this.species.getLearnsetData('excadrill').learnset.escapetunnel = ["9L62"];
		this.species.getLearnsetData('excadrill').learnset.fissure = ["9L68"];
		this.species.getLearnsetData('excadrill').learnset.chipaway = ["9M"];
		this.species.getLearnsetData('excadrill').learnset.fullcollide = ["9M"];
		// Audino
		this.species.getLearnsetData('audino').learnset.acupressure = ["9D"];
		this.species.getLearnsetData('audino').learnset.confide = ["9L1"];
		this.species.getLearnsetData('audino').learnset.lifedew = ["9L21"];
		this.species.getLearnsetData('audino').learnset.attract = ["9M"];
		this.species.getLearnsetData('audino').learnset.charm = ["9M"];
		this.species.getLearnsetData('audino').learnset.naturalgift = ["9M"];
		this.species.getLearnsetData('audino').learnset.shockwave = ["9M"];
		delete this.species.getLearnsetData('audino').learnset.growl;
		delete this.species.getLearnsetData('audino').learnset.knockoff;
		// Timburr
		this.species.getLearnsetData('timburr').learnset.woodhammer = ["9D"];
		this.species.getLearnsetData('timburr').learnset.swing = ["9L1"];
		delete this.species.getLearnsetData('timburr').learnset.pound;
		// Gurdurr
		this.species.getLearnsetData('gurdurr').learnset.steelbeam = ["9D"];
		this.species.getLearnsetData('gurdurr').learnset.swing = ["9L1"];
		delete this.species.getLearnsetData('gurdurr').learnset.pound;
		// Conkeldurr
		this.species.getLearnsetData('conkeldurr').learnset.rockwrecker = ["9D"];
		this.species.getLearnsetData('conkeldurr').learnset.swing = ["9L1"];
		delete this.species.getLearnsetData('conkeldurr').learnset.pound;
		// Tympole
		this.species.getLearnsetData('tympole').learnset.boomburst = ["9D"];
		this.species.getLearnsetData('tympole').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('tympole').learnset.toxic = ["9M"];
		// Palpitoad
		this.species.getLearnsetData('palpitoad').learnset.boomburst = ["9D"];
		this.species.getLearnsetData('palpitoad').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('palpitoad').learnset.toxic = ["9M"];
		// Seismitoad
		this.species.getLearnsetData('seismitoad').learnset.boomburst = ["9D"];
		this.species.getLearnsetData('seismitoad').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('seismitoad').learnset.toxic = ["9M"];
		// Throh
		this.species.getLearnsetData('throh').learnset.smellingsalts = ["9D"];
		// Sawk
		this.species.getLearnsetData('sawk').learnset.smellingsalts = ["9D"];
		this.species.getLearnsetData('sawk').learnset.throatchop = ["9L1"];
		// Sewaddle
		this.species.getLearnsetData('sewaddle').learnset.teatime = ["9D"];
		this.species.getLearnsetData('sewaddle').learnset.amnesia = ["9M"];
		this.species.getLearnsetData('sewaddle').learnset.faketears = ["9M"];
		this.species.getLearnsetData('sewaddle').learnset.naturalgift = ["9M"];
		this.species.getLearnsetData('sewaddle').learnset.cut = ["9E"];
		this.species.getLearnsetData('sewaddle').learnset.silktrap = ["9E"];
		// Swadloon
		this.species.getLearnsetData('swadloon').learnset.teatime = ["9D"];
		this.species.getLearnsetData('swadloon').learnset.amnesia = ["9M"];
		this.species.getLearnsetData('swadloon').learnset.faketears = ["9M"];
		this.species.getLearnsetData('swadloon').learnset.naturalgift = ["9M"];
		// Leavanny
		this.species.getLearnsetData('leavanny').learnset.teatime = ["9D"];
		this.species.getLearnsetData('leavanny').learnset.amnesia = ["9M"];
		this.species.getLearnsetData('leavanny').learnset.faketears = ["9M"];
		this.species.getLearnsetData('leavanny').learnset.naturalgift = ["9M"];
		delete this.species.getLearnsetData('leavanny').learnset.knockoff;
		// Venipede
		this.species.getLearnsetData('venipede').learnset.mortalstrike = ["9D"];
		this.species.getLearnsetData('venipede').learnset.barbbarrage = ["9L26"];
		this.species.getLearnsetData('venipede').learnset.toxic = ["9L36","9M"];
		this.species.getLearnsetData('venipede').learnset.assurance = ["9M"];
		this.species.getLearnsetData('venipede').learnset.trailhead = ["9M"];
		this.species.getLearnsetData('venipede').learnset.venoshock = ["9M"];
		// Whirlipede
		this.species.getLearnsetData('whirlipede').learnset.mortalstrike = ["9D"];
		this.species.getLearnsetData('whirlipede').learnset.barbbarrage = ["9L28"];
		this.species.getLearnsetData('whirlipede').learnset.toxic = ["9L41","9M"];
		this.species.getLearnsetData('whirlipede').learnset.assurance = ["9M"];
		this.species.getLearnsetData('whirlipede').learnset.bodypress = ["9M"];
		this.species.getLearnsetData('whirlipede').learnset.fullcollide = ["9M"];
		this.species.getLearnsetData('whirlipede').learnset.trailhead = ["9M"];
		this.species.getLearnsetData('whirlipede').learnset.venoshock = ["9M"];
		// Scolipede
		this.species.getLearnsetData('scolipede').learnset.mortalstrike = ["9D"];
		this.species.getLearnsetData('scolipede').learnset.crosspoison = ["9L0"];
		this.species.getLearnsetData('scolipede').learnset.batonpass = ["9L1"];
		this.species.getLearnsetData('scolipede').learnset.barbbarrage = ["9L28"];
		this.species.getLearnsetData('scolipede').learnset.toxic = ["9L44","9M"];
		this.species.getLearnsetData('scolipede').learnset.assurance = ["9M"];
		this.species.getLearnsetData('scolipede').learnset.bodypress = ["9M"];
		this.species.getLearnsetData('scolipede').learnset.fullcollide = ["9M"];
		this.species.getLearnsetData('scolipede').learnset.trailhead = ["9M"];
		this.species.getLearnsetData('scolipede').learnset.venoshock = ["9M"];
		// Cottonee
		this.species.getLearnsetData('cottonee').learnset.minimize = ["9D"];
		delete this.species.getLearnsetData('cottonee').learnset.grassyterrain;
		// Whimsicott
		this.species.getLearnsetData('whimsicott').learnset.minimize = ["9D"];
		this.species.getLearnsetData('whimsicott').learnset.aerate = ["9L1"];
		delete this.species.getLearnsetData('whimsicott').learnset.grassyterrain;
		delete this.species.getLearnsetData('whimsicott').learnset.gust;
		// Petilil
		this.species.getLearnsetData('petilil').learnset.aromaticmist = ["9D"];
		this.species.getLearnsetData('petilil').learnset.faketears = ["9M"];
		// Lilligant
		this.species.getLearnsetData('lilligant').learnset.aromaticmist = ["9D"];
		this.species.getLearnsetData('lilligant').learnset.faketears = ["9M"];
		// Lilligant Hisui
		this.species.getLearnsetData('lilliganthisui').learnset.rapidspin = ["9D"];
		this.species.getLearnsetData('lilliganthisui').learnset.faketears = ["9M"];
		// Basculin Red-Striped
		this.species.getLearnsetData('basculin').learnset.glare = ["9D"];
		this.species.getLearnsetData('basculin').learnset.compensation = ["9M"];
		this.species.getLearnsetData('basculin').learnset.whitewater = ["9L8"];
		this.species.getLearnsetData('basculin').learnset.flail = ["9L12"];
		this.species.getLearnsetData('basculin').learnset.aquajet = ["9L16"];
		this.species.getLearnsetData('basculin').learnset.bite = ["9L20"];
		this.species.getLearnsetData('basculin').learnset.scaryface = ["9L24"];
		this.species.getLearnsetData('basculin').learnset.headbutt = ["9L28"];
		this.species.getLearnsetData('basculin').learnset.soak = ["9L32"];
		this.species.getLearnsetData('basculin').learnset.crunch = ["9L36"];
		this.species.getLearnsetData('basculin').learnset.takedown = ["9L40"];
		this.species.getLearnsetData('basculin').learnset.submission = ["9L44"];
		this.species.getLearnsetData('basculin').learnset.finalgambit = ["9L48"];
		this.species.getLearnsetData('basculin').learnset.doubleedge = ["9L52"];
		this.species.getLearnsetData('basculin').learnset.thrash = ["9L56"];
		this.species.getLearnsetData('basculin').learnset.wavecrash = ["9L60"];
		this.species.getLearnsetData('basculin').learnset.headsmash = ["9L64"];
		delete this.species.getLearnsetData('basculin').learnset.blizzard;
		// Basculin Blue-Striped
		this.species.getLearnsetData('basculinbluestriped').learnset.glare = ["9D"];
		this.species.getLearnsetData('basculinbluestriped').learnset.compensation = ["9M"];
		this.species.getLearnsetData('basculinbluestriped').learnset.whitewater = ["9L8"];
		this.species.getLearnsetData('basculinbluestriped').learnset.flail = ["9L12"];
		this.species.getLearnsetData('basculinbluestriped').learnset.aquajet = ["9L16"];
		this.species.getLearnsetData('basculinbluestriped').learnset.bite = ["9L20"];
		this.species.getLearnsetData('basculinbluestriped').learnset.scaryface = ["9L24"];
		this.species.getLearnsetData('basculinbluestriped').learnset.headbutt = ["9L28"];
		this.species.getLearnsetData('basculinbluestriped').learnset.soak = ["9L32"];
		this.species.getLearnsetData('basculinbluestriped').learnset.crunch = ["9L36"];
		this.species.getLearnsetData('basculinbluestriped').learnset.takedown = ["9L40"];
		this.species.getLearnsetData('basculinbluestriped').learnset.metaledge = ["9L44"];
		this.species.getLearnsetData('basculinbluestriped').learnset.finalgambit = ["9L48"];
		this.species.getLearnsetData('basculinbluestriped').learnset.doubleedge = ["9L52"];
		this.species.getLearnsetData('basculinbluestriped').learnset.thrash = ["9L56"];
		this.species.getLearnsetData('basculinbluestriped').learnset.wavecrash = ["9L60"];
		this.species.getLearnsetData('basculinbluestriped').learnset.headsmash = ["9L64"];
		delete this.species.getLearnsetData('basculinbluestriped').learnset.blizzard;
		delete this.species.getLearnsetData('basculinbluestriped').learnset.submission;
		// Basculin White-Striped
		this.species.getLearnsetData('basculinwhitestriped').learnset = this.species.getLearnsetData('basculin').learnset;
		this.species.getLearnsetData('basculinwhitestriped').learnset.destinybond = ["9D"];
		this.species.getLearnsetData('basculinwhitestriped').learnset.lastrespects = ["9L44"];
		this.species.getLearnsetData('basculinwhitestriped').learnset.uproar = ["9L48", "9M"];
		this.species.getLearnsetData('basculinwhitestriped').learnset.vengefulspirit = ["9E"];
		delete this.species.getLearnsetData('basculinwhitestriped').learnset.finalgambit;
		delete this.species.getLearnsetData('basculinwhitestriped').learnset.glare;
		delete this.species.getLearnsetData('basculinwhitestriped').learnset.rage;
		delete this.species.getLearnsetData('basculinwhitestriped').learnset.submission;
		// Sandile
		this.species.getLearnsetData('sandile').learnset.detect = ["9D"];
		this.species.getLearnsetData('sandile').learnset.jawlock = ["9E"];
		this.species.getLearnsetData('sandile').learnset.nastyplot = ["9M"];
		// Krokorok
		this.species.getLearnsetData('krokorok').learnset.detect = ["9D"];
		this.species.getLearnsetData('krokorok').learnset.nastyplot = ["9M"];
		this.species.getLearnsetData('krokorok').learnset.nightmare = ["9M"];
		// Krookodile
		this.species.getLearnsetData('krookodile').learnset.detect = ["9D"];
		this.species.getLearnsetData('krookodile').learnset.jawlock = ["9L0"];
		this.species.getLearnsetData('krookodile').learnset.nastyplot = ["9M"];
		this.species.getLearnsetData('krookodile').learnset.nightmare = ["9M"];
		// Darumaka
		this.species.getLearnsetData('darumaka').learnset.selfdestruct = ["9D"];
		this.species.getLearnsetData('darumaka').learnset.meditate = ["9L1"];
		this.species.getLearnsetData('darumaka').learnset.rollout = ["9L8"];
		this.species.getLearnsetData('darumaka').learnset.megapunch = ["9E"];
		this.species.getLearnsetData('darumaka').learnset.rockclimb = ["9E"];
		this.species.getLearnsetData('darumaka').learnset.psychup = ["9M"];
		delete this.species.getLearnsetData('darumaka').learnset.bite;
		// Darumaka Galar
		this.species.getLearnsetData('darumakagalar').learnset.memento = ["9D"];
		this.species.getLearnsetData('darumakagalar').learnset.meditate = ["9L1"];
		this.species.getLearnsetData('darumakagalar').learnset.rollout = ["9L8"];
		this.species.getLearnsetData('darumakagalar').learnset.snowtumble = ["9L40"];
		this.species.getLearnsetData('darumakagalar').learnset.blizzard = ["9M"];
		this.species.getLearnsetData('darumakagalar').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('darumakagalar').learnset.echoedvoice = ["9M"];
		this.species.getLearnsetData('darumakagalar').learnset.endeavor = ["9M"];
		this.species.getLearnsetData('darumakagalar').learnset.frostbreath = ["9M"];
		this.species.getLearnsetData('darumakagalar').learnset.powergem = ["9M"];
		this.species.getLearnsetData('darumakagalar').learnset.rocksmash = ["9M"];
		this.species.getLearnsetData('darumakagalar').learnset.snatch = ["9M"];
		this.species.getLearnsetData('darumakagalar').learnset.strength = ["9M"];
		this.species.getLearnsetData('darumakagalar').learnset.megapunch = ["9E"];
		this.species.getLearnsetData('darumakagalar').learnset.rockclimb = ["9E"];
		delete this.species.getLearnsetData('darumakagalar').learnset.bite;
		// Darmanitan
		this.species.getLearnsetData('darmanitan').learnset.vcreate = ["9D"];
		this.species.getLearnsetData('darmanitan').learnset.meditate = ["9L1"];
		this.species.getLearnsetData('darmanitan').learnset.rollout = ["9L8"];
		this.species.getLearnsetData('darmanitan').learnset.psychup = ["9M"];
		delete this.species.getLearnsetData('darmanitan').learnset.bite;
		// Darmanitan Galar
		this.species.getLearnsetData('darmanitangalar').learnset.headcharge = ["9D"];
		this.species.getLearnsetData('darmanitangalar').learnset.meditate = ["9L1"];
		this.species.getLearnsetData('darmanitangalar').learnset.rollout = ["9L8"];
		this.species.getLearnsetData('darmanitangalar').learnset.snowtumble = ["9L44"];
		this.species.getLearnsetData('darmanitangalar').learnset.blizzard = ["9M"];
		this.species.getLearnsetData('darmanitangalar').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('darmanitangalar').learnset.echoedvoice = ["9M"];
		this.species.getLearnsetData('darmanitangalar').learnset.endeavor = ["9M"];
		this.species.getLearnsetData('darmanitangalar').learnset.frostbreath = ["9M"];
		this.species.getLearnsetData('darmanitangalar').learnset.powergem = ["9M"];
		this.species.getLearnsetData('darmanitangalar').learnset.rocksmash = ["9M"];
		this.species.getLearnsetData('darmanitangalar').learnset.snatch = ["9M"];
		this.species.getLearnsetData('darmanitangalar').learnset.strength = ["9M"];
		delete this.species.getLearnsetData('darmanitangalar').learnset.iciclecrash;
		delete this.species.getLearnsetData('darmanitangalar').learnset.bite;
		// Maractus
		this.species.getLearnsetData('maractus').learnset.weatherball = ["9D"];
		this.species.getLearnsetData('maractus').learnset.naturalgift = ["9M"];
		delete this.species.getLearnsetData('maractus').learnset.grassyterrain;
		// Dwebble
		this.species.getLearnsetData('dwebble').learnset.crabhammer = ["9D"];
		this.species.getLearnsetData('dwebble').learnset.stealthrock = ["9L25", "9M"];
		this.species.getLearnsetData('dwebble').learnset.shelter = ["9L43"];
		this.species.getLearnsetData('dwebble').learnset.rockwrecker = ["9L47"];
		this.species.getLearnsetData('dwebble').learnset.fullcollide = ["9M"];
		// Crustle
		this.species.getLearnsetData('crustle').learnset.crabhammer = ["9D"];
		this.species.getLearnsetData('dwebble').learnset.stealthrock = ["9L25", "9M"];
		this.species.getLearnsetData('dwebble').learnset.shelter = ["9L55"];
		this.species.getLearnsetData('dwebble').learnset.rockwrecker = ["9L62"];
		this.species.getLearnsetData('crustle').learnset.fullcollide = ["9M"];
		delete this.species.getLearnsetData('crustle').learnset.meteorbeam;
		// Scraggy
		this.species.getLearnsetData('scraggy').learnset.powertrip = ["9D"];
		// Scrafty
		this.species.getLearnsetData('scrafty').learnset.powertrip = ["9D"];
		// Sigilyph
		this.species.getLearnsetData('sigilyph').learnset.speedswap = ["9D"];
		this.species.getLearnsetData('sigilyph').learnset.barrier = ["9L24"];
		this.species.getLearnsetData('sigilyph').learnset.barrierbash = ["9L28"];
		this.species.getLearnsetData('sigilyph').learnset.flash = ["9M"];
		this.species.getLearnsetData('sigilyph').learnset.lightscreen = ["9M"];
		this.species.getLearnsetData('sigilyph').learnset.reflect = ["9M"];
		this.species.getLearnsetData('sigilyph').learnset.nightmare = ["9M"];
		// Yamask
		this.species.getLearnsetData('yamask').learnset.tearfullook = ["9D"];
		this.species.getLearnsetData('yamask').learnset.lastrespects = ["9L37"];
		this.species.getLearnsetData('yamask').learnset.flash = ["9M"];
		this.species.getLearnsetData('yamask').learnset.shadowball = ["9M"];
		// Yamask Galar
		this.species.getLearnsetData('yamaskgalar').learnset.tearfullook = ["9D"];
		this.species.getLearnsetData('yamaskgalar').learnset.vengefulspirit = ["9L37"];
		this.species.getLearnsetData('yamaskgalar').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('yamaskgalar').learnset.shadowball = ["9M"];
		this.species.getLearnsetData('yamaskgalar').learnset.craftyshield = ["9E"];
		// Cofagrigus
		this.species.getLearnsetData('cofagrigus').learnset.metalburst = ["9D"];
		this.species.getLearnsetData('cofagrigus').learnset.terrify = ["9L0"];
		this.species.getLearnsetData('cofagrigus').learnset.lastrespects = ["9L37"];
		this.species.getLearnsetData('cofagrigus').learnset.flash = ["9M"];
		this.species.getLearnsetData('cofagrigus').learnset.shadowball = ["9M"];
		delete this.species.getLearnsetData('cofagrigus').learnset.scaryface;
		// Tirtouga
		this.species.getLearnsetData('tirtouga').learnset.razorshell = ["9D"];
		this.species.getLearnsetData('tirtouga').learnset.whitewater = ["9L1"];
		this.species.getLearnsetData('tirtouga').learnset.liquidation = ["9L50"];
		this.species.getLearnsetData('tirtouga').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('tirtouga').learnset.hydropump = ["9M"];
		this.species.getLearnsetData('tirtouga').learnset.fullcollide = ["9M"];
		delete this.species.getLearnsetData('tirtouga').learnset.watergun;
		// Carracosta
		this.species.getLearnsetData('carracosta').learnset.razorshell = ["9D"];
		this.species.getLearnsetData('carracosta').learnset.whitewater = ["9L1"];
		this.species.getLearnsetData('carracosta').learnset.liquidation = ["9L61"];
		this.species.getLearnsetData('carracosta').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('carracosta').learnset.hydropump = ["9M"];
		this.species.getLearnsetData('carracosta').learnset.fullcollide = ["9M"];
		delete this.species.getLearnsetData('carracosta').learnset.watergun;
		// Archen
		this.species.getLearnsetData('archen').learnset.aurasphere = ["9D"];
		this.species.getLearnsetData('archen').learnset.fellswoop = ["9L48"];
		this.species.getLearnsetData('archen').learnset.dragonclaw = ["9M"];
		// Archeops
		this.species.getLearnsetData('archeops').learnset.aurasphere = ["9D"];
		this.species.getLearnsetData('archeops').learnset.fellswoop = ["9L56"];
		this.species.getLearnsetData('archeops').learnset.dragonclaw = ["9M"];
		// Trubbish
		this.species.getLearnsetData('trubbish').learnset.bide = ["9D"];
		this.species.getLearnsetData('trubbish').learnset.toxic = ["9L36", "9M"];
		// Garbodor
		this.species.getLearnsetData('garbodor').learnset.irontail = ["9D"];
		this.species.getLearnsetData('garbodor').learnset.shockwave = ["9D"];
		this.species.getLearnsetData('garbodor').learnset.toxic = ["9L39","9M"];
		// Zorua
		this.species.getLearnsetData('zorua').learnset.doubleteam = ["9D"];
		this.species.getLearnsetData('zorua').learnset.terrify = ["9L21"];
		this.species.getLearnsetData('zorua').learnset.hex = ["9M"];
		this.species.getLearnsetData('zorua').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('zorua').learnset.toxic = ["9M"];
		delete this.species.getLearnsetData('zorua').learnset.knockoff;
		delete this.species.getLearnsetData('zorua').learnset.scaryface;
		// Zorua Hisui
		this.species.getLearnsetData('zoruahisui').learnset.doubleteam = ["9D"];
		this.species.getLearnsetData('zoruahisui').learnset.terrify = ["9L21"];
		this.species.getLearnsetData('zoruahisui').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('zoruahisui').learnset.toxic = ["9M"];
		delete this.species.getLearnsetData('zoruahisui').learnset.knockoff;
		delete this.species.getLearnsetData('zoruahisui').learnset.scaryface;
		// Zoroark
		this.species.getLearnsetData('zoroark').learnset.doubleteam = ["9D"];
		this.species.getLearnsetData('zoroark').learnset.terrify = ["9L21"];
		this.species.getLearnsetData('zoroark').learnset.hex = ["9M"];
		this.species.getLearnsetData('zoroark').learnset.midnight = ["9T"];
		this.species.getLearnsetData('zoroark').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('zoroark').learnset.toxic = ["9M"];
		delete this.species.getLearnsetData('zoroark').learnset.scaryface;
		// Zoroark Hisui
		this.species.getLearnsetData('zoroarkhisui').learnset.doubleteam = ["9D"];
		this.species.getLearnsetData('zoroarkhisui').learnset.terrify = ["9L21"];
		this.species.getLearnsetData('zoroarkhisui').learnset.midnight = ["9T"];
		this.species.getLearnsetData('zoroarkhisui').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('zoroarkhisui').learnset.toxic = ["9M"];
		delete this.species.getLearnsetData('zoroarkhisui').learnset.scaryface;
		// Minccino
		this.species.getLearnsetData('minccino').learnset.assist = ["9D"];
		delete this.species.getLearnsetData('minccino').learnset.knockoff;
		delete this.species.getLearnsetData('minccino').learnset.thunder;
		delete this.species.getLearnsetData('minccino').learnset.thunderbolt;
		// Cinccino
		this.species.getLearnsetData('cinccino').learnset.assist = ["9D"];
		this.species.getLearnsetData('cinccino').learnset.covet = ["9L1"];
		this.species.getLearnsetData('cinccino').learnset.sweetkiss = ["9L1"];
		delete this.species.getLearnsetData('cinccino').learnset.bulletseed;
		delete this.species.getLearnsetData('cinccino').learnset.rockblast;
		delete this.species.getLearnsetData('cinccino').learnset.thunder;
		// Gothita
		this.species.getLearnsetData('gothita').learnset.wish = ["9D"];
		this.species.getLearnsetData('gothita').learnset.confide = ["9L1"];
		this.species.getLearnsetData('gothita').learnset.charm = ["9L24"];
		this.species.getLearnsetData('gothita').learnset.eeriespell = ["9L46"];
		this.species.getLearnsetData('gothita').learnset.flash = ["9M"];
		this.species.getLearnsetData('gothita').learnset.nightmare = ["9M"];
		delete this.species.getLearnsetData('gothita').learnset.feintattack;
		// Gothorita
		this.species.getLearnsetData('gothorita').learnset.wish = ["9D"];
		this.species.getLearnsetData('gothorita').learnset.confide = ["9L1"];
		this.species.getLearnsetData('gothorita').learnset.charm = ["9L24"];
		this.species.getLearnsetData('gothorita').learnset.eeriespell = ["9L50"];
		this.species.getLearnsetData('gothorita').learnset.flash = ["9M"];
		this.species.getLearnsetData('gothorita').learnset.nightmare = ["9M"];
		delete this.species.getLearnsetData('gothorita').learnset.feintattack;
		// Gothitelle
		this.species.getLearnsetData('gothitelle').learnset.doomdesire = ["9D"];
		this.species.getLearnsetData('gothitelle').learnset.confide = ["9L1"];
		this.species.getLearnsetData('gothitelle').learnset.charm = ["9L24"];
		this.species.getLearnsetData('gothitelle').learnset.eeriespell = ["9L54"];
		this.species.getLearnsetData('gothitelle').learnset.flash = ["9M"];
		this.species.getLearnsetData('gothitelle').learnset.nightmare = ["9M"];
		delete this.species.getLearnsetData('gothitelle').learnset.feintattack;
		// Solosis
		this.species.getLearnsetData('solosis').learnset.aquaring = ["9D"];
		this.species.getLearnsetData('solosis').learnset.flash = ["9M"];
		this.species.getLearnsetData('solosis').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('solosis').learnset.thunderbolt = ["9M"];
		delete this.species.getLearnsetData('solosis').learnset.gyroball;
		// Duosion
		this.species.getLearnsetData('duosion').learnset.aquaring = ["9D"];
		this.species.getLearnsetData('duosion').learnset.flash = ["9M"];
		this.species.getLearnsetData('duosion').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('duosion').learnset.thunderbolt = ["9M"];
		delete this.species.getLearnsetData('duosion').learnset.gyroball;
		// Reuniclus
		this.species.getLearnsetData('reuniclus').learnset.aquaring = ["9D"];
		this.species.getLearnsetData('reuniclus').learnset.flash = ["9M"];
		this.species.getLearnsetData('reuniclus').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('reuniclus').learnset.thunderbolt = ["9M"];
		delete this.species.getLearnsetData('reuniclus').learnset.gyroball;
		// Ducklett
		this.species.getLearnsetData('ducklett').learnset.entrainment = ["9D"];
		this.species.getLearnsetData('ducklett').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('ducklett').learnset.screech = ["9M"];
		this.species.getLearnsetData('ducklett').learnset.whirlpool = ["9M"];
		// Swanna
		this.species.getLearnsetData('swanna').learnset.entrainment = ["9D"];
		this.species.getLearnsetData('swanna').learnset.charm = ["9M"];
		this.species.getLearnsetData('swanna').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('swanna').learnset.screech = ["9M"];
		this.species.getLearnsetData('swanna').learnset.whirlpool = ["9M"];
		// Vanillite
		this.species.getLearnsetData('vanillite').learnset.iciclecrash = ["9D"];
		this.species.getLearnsetData('vanillite').learnset.chillywater = ["9M"];
		// Vanillish
		this.species.getLearnsetData('vanillish').learnset.iciclecrash = ["9D"];
		this.species.getLearnsetData('vanillish').learnset.chillywater = ["9M"];
		// Vanilluxe
		this.species.getLearnsetData('vanilluxe').learnset.glaciate = ["9D"];
		this.species.getLearnsetData('vanilluxe').learnset.chillywater = ["9M"];
		// Deerling
		this.species.getLearnsetData('deerling').learnset.weatherball = ["9D"];
		this.species.getLearnsetData('deerling').learnset.bulletseed = ["9L16"];
		this.species.getLearnsetData('deerling').learnset.flash = ["9M"];
		this.species.getLearnsetData('deerling').learnset.solarblade = ["9E"];
		delete this.species.getLearnsetData('deerling').learnset.feintattack;
		// Sawsbuck
		this.species.getLearnsetData('sawsbuck').learnset.weatherball = ["9D"];
		this.species.getLearnsetData('sawsbuck').learnset.bulletseed = ["9L16"];
		this.species.getLearnsetData('sawsbuck').learnset.grassyterrain = ["9M"];
		this.species.getLearnsetData('sawsbuck').learnset.flash = ["9M"];
		delete this.species.getLearnsetData('sawsbuck').learnset.feintattack;
		// Emolga
		this.species.getLearnsetData('emolga').learnset.paraboliccharge = ["9D"];
		this.species.getLearnsetData('emolga').learnset.flash = ["9M"];
		this.species.getLearnsetData('emolga').learnset.stuffcheeks = ["9E"];
		// Karrablast
		this.species.getLearnsetData('karrablast').learnset.smartstrike = ["9D"];
		this.species.getLearnsetData('karrablast').learnset.furyattack = ["9L13"];
		this.species.getLearnsetData('karrablast').learnset.furycutter = ["9L16"];
		this.species.getLearnsetData('karrablast').learnset.hornattack = ["9L20"];
		this.species.getLearnsetData('karrablast').learnset.chipaway = ["9L28", "9M"];
		this.species.getLearnsetData('karrablast').learnset.xscissor = ["9L32"];
		this.species.getLearnsetData('karrablast').learnset.megahorn = ["9L44"];
		delete this.species.getLearnsetData('karrablast').learnset.headbutt;
		delete this.species.getLearnsetData('karrablast').learnset.slash;
		// Escavalier
		this.species.getLearnsetData('escavalier').learnset.meteorassault = ["9D"];
		this.species.getLearnsetData('escavalier').learnset.twineedle = ["9L0"];
		this.species.getLearnsetData('escavalier').learnset.furyattack = ["9L13"];
		this.species.getLearnsetData('escavalier').learnset.furycutter = ["9L16"];
		this.species.getLearnsetData('escavalier').learnset.hornattack = ["9L20"];
		this.species.getLearnsetData('escavalier').learnset.chipaway = ["9L28", "9M"];
		this.species.getLearnsetData('escavalier').learnset.xscissor = ["9L32"];
		this.species.getLearnsetData('escavalier').learnset.megahorn = ["9L44"];
		this.species.getLearnsetData('escavalier').learnset.fullcollide = ["9M"];
		this.species.getLearnsetData('escavalier').learnset.trailhead = ["9M"];
		delete this.species.getLearnsetData('escavalier').learnset.headbutt;
		delete this.species.getLearnsetData('escavalier').learnset.slash;
		// Foongus
		this.species.getLearnsetData('foongus').learnset.copycat = ["9D"];
		this.species.getLearnsetData('foongus').learnset.toxic = ["9L32","9M"];
		this.species.getLearnsetData('foongus').learnset.recover = ["9L35"];
		delete this.species.getLearnsetData('foongus').learnset.synthesis;
		// Amoonguss
		this.species.getLearnsetData('amoonguss').learnset.copycat = ["9D"];
		this.species.getLearnsetData('amoonguss').learnset.toxic = ["9L32","9M"];
		this.species.getLearnsetData('amoonguss').learnset.recover = ["9L35"];
		delete this.species.getLearnsetData('amoonguss').learnset.grassyterrain;
		delete this.species.getLearnsetData('amoonguss').learnset.synthesis;
		// Frillish
		this.species.getLearnsetData('frillish').learnset.quash = ["9D"];
		this.species.getLearnsetData('frillish').learnset.chillywater = ["9M"];
		delete this.species.getLearnsetData('frillish').learnset.blizzard;
		delete this.species.getLearnsetData('frillish').learnset.poltergeist;
		// Jellicent
		this.species.getLearnsetData('jellicent').learnset.quash = ["9D"];
		this.species.getLearnsetData('jellicent').learnset.chillywater = ["9M"];
		delete this.species.getLearnsetData('jellicent').learnset.blizzard;
		delete this.species.getLearnsetData('jellicent').learnset.poltergeist;
		// Alomomola
		this.species.getLearnsetData('alomomola').learnset.heartswap = ["9D"];
		this.species.getLearnsetData('alomomola').learnset.amnesia = ["9M"];
		this.species.getLearnsetData('alomomola').learnset.charm = ["9M"];
		delete this.species.getLearnsetData('alomomola').learnset.blizzard;
		// Joltik
		this.species.getLearnsetData('joltik').learnset.zingzap = ["9D"];
		this.species.getLearnsetData('joltik').learnset.leechlife = ["9L1"];
		this.species.getLearnsetData('joltik').learnset.springleap = ["9L12"];
		this.species.getLearnsetData('joltik').learnset.flash = ["9M"];
		this.species.getLearnsetData('joltik').learnset.vitaldrain = ["9M"];
		delete this.species.getLearnsetData('joltik').learnset.absorb;
		delete this.species.getLearnsetData('joltik').learnset.furycutter;
		// Galvantula
		this.species.getLearnsetData('galvantula').learnset.zingzap = ["9D"];
		this.species.getLearnsetData('galvantula').learnset.leechlife = ["9L1"];
		this.species.getLearnsetData('galvantula').learnset.springleap = ["9L12"];
		this.species.getLearnsetData('galvantula').learnset.flash = ["9M"];
		this.species.getLearnsetData('galvantula').learnset.vitaldrain = ["9M"];
		delete this.species.getLearnsetData('galvantula').learnset.absorb;
		delete this.species.getLearnsetData('galvantula').learnset.furycutter;
		// Ferroseed
		this.species.getLearnsetData('ferroseed').learnset.spikyshield = ["9D"];
		this.species.getLearnsetData('ferroseed').learnset.flash = ["9M"];
		this.species.getLearnsetData('ferroseed').learnset.fullcollide = ["9M"];
		this.species.getLearnsetData('ferroseed').learnset.shockwave = ["9M"];
		// Ferrothorn
		this.species.getLearnsetData('ferrothorn').learnset.spikyshield = ["9D"];
		this.species.getLearnsetData('ferrothorn').learnset.flash = ["9M"];
		this.species.getLearnsetData('ferrothorn').learnset.fullcollide = ["9M"];
		this.species.getLearnsetData('ferrothorn').learnset.shockwave = ["9M"];
		delete this.species.getLearnsetData('ferrothorn').learnset.thunder;
		// Klink
		this.species.getLearnsetData('klink').learnset.metaledge = ["9D"];
		this.species.getLearnsetData('klink').learnset.magnetbomb = ["9L16"];
		this.species.getLearnsetData('klink').learnset.geargrind = ["9L39"];
		this.species.getLearnsetData('klink').learnset.screech = ["9M"];
		// Klang
		this.species.getLearnsetData('klang').learnset.metaledge = ["9D"];
		this.species.getLearnsetData('klang').learnset.magnetbomb = ["9L16"];
		this.species.getLearnsetData('klang').learnset.geargrind = ["9L39"];
		this.species.getLearnsetData('klang').learnset.screech = ["9M"];
		// Klinklang
		this.species.getLearnsetData('klinklang').learnset.metaledge = ["9D"];
		this.species.getLearnsetData('klinklang').learnset.magnetbomb = ["9L16"];
		this.species.getLearnsetData('klinklang').learnset.geargrind = ["9L39"];
		this.species.getLearnsetData('klinklang').learnset.screech = ["9M"];
		// Eelektrik
		this.species.getLearnsetData('eelektrik').learnset.wringout = ["9D"];
		this.species.getLearnsetData('eelektrik').learnset.brine = ["9M"];
		this.species.getLearnsetData('eelektrik').learnset.dive = ["9M"];
		this.species.getLearnsetData('eelektrik').learnset.eerieimpulse = ["9M"];
		this.species.getLearnsetData('eelektrik').learnset.flash = ["9M"];
		this.species.getLearnsetData('eelektrik').learnset.surf = ["9M"];
		this.species.getLearnsetData('eelektrik').learnset.vitaldrain = ["9M"];
		delete this.species.getLearnsetData('eelektrik').learnset.knockoff;
		delete this.species.getLearnsetData('eelektrik').learnset.leechlife;
		// Eelektross
		this.species.getLearnsetData('eelektross').learnset.wringout = ["9D"];
		this.species.getLearnsetData('eelektross').learnset.thunderfang = ["9L0"];
		this.species.getLearnsetData('eelektross').learnset.brine = ["9M"];
		this.species.getLearnsetData('eelektross').learnset.dive = ["9M"];
		this.species.getLearnsetData('eelektross').learnset.eerieimpulse = ["9M"];
		this.species.getLearnsetData('eelektross').learnset.flash = ["9M"];
		this.species.getLearnsetData('eelektross').learnset.surf = ["9M"];
		this.species.getLearnsetData('eelektross').learnset.thunderpunch = ["9M"];
		this.species.getLearnsetData('eelektross').learnset.vitaldrain = ["9M"];
		delete this.species.getLearnsetData('eelektross').learnset.leechlife;
		// Elgyem
		this.species.getLearnsetData('elgyem').learnset.confuseray = ["9D"];
		this.species.getLearnsetData('elgyem').learnset.mindbend = ["9L1"];
		this.species.getLearnsetData('elgyem').learnset.barrierbash = ["9L18"];
		this.species.getLearnsetData('elgyem').learnset.flash = ["9M"];
		this.species.getLearnsetData('elgyem').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('elgyem').learnset.powergem = ["9M"];
		this.species.getLearnsetData('elgyem').learnset.stasis = ["9M"];
		delete this.species.getLearnsetData('elgyem').learnset.headbutt;
		// Beheeyem
		this.species.getLearnsetData('beheeyem').learnset.psychoboost = ["9D"];
		this.species.getLearnsetData('beheeyem').learnset.mindbend = ["9L1"];
		this.species.getLearnsetData('beheeyem').learnset.barrierbash = ["9L18"];
		this.species.getLearnsetData('beheeyem').learnset.flash = ["9M"];
		this.species.getLearnsetData('beheeyem').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('beheeyem').learnset.powergem = ["9M"];
		this.species.getLearnsetData('beheeyem').learnset.stasis = ["9M"];
		delete this.species.getLearnsetData('beheeyem').learnset.headbutt;
		// Litwick
		this.species.getLearnsetData('litwick').learnset.sweetscent = ["9D"];
		this.species.getLearnsetData('litwick').learnset.flash = ["9M"];
		this.species.getLearnsetData('litwick').learnset.mysticalfire = ["9E"];
		this.species.getLearnsetData('litwick').learnset.nightmare = ["9M"];
		// Lampent
		this.species.getLearnsetData('lampent').learnset.sweetscent = ["9D"];
		this.species.getLearnsetData('lampent').learnset.flash = ["9M"];
		this.species.getLearnsetData('lampent').learnset.nightmare = ["9M"];
		// Chandelure
		this.species.getLearnsetData('chandelure').learnset.sweetscent = ["9D"];
		this.species.getLearnsetData('chandelure').learnset.flash = ["9M"];
		this.species.getLearnsetData('chandelure').learnset.nightmare = ["9M"];
		// Axew
		this.species.getLearnsetData('axew').learnset.metaledge = ["9D"];
		this.species.getLearnsetData('axew').learnset.cut = ["9E"];
		// Fraxure
		this.species.getLearnsetData('fraxure').learnset.metaledge = ["9D"];
		// Haxorus
		this.species.getLearnsetData('haxorus').learnset.glaiverush = ["9D"];
		// Cubchoo
		this.species.getLearnsetData('cubchoo').learnset.snowtumble = ["9D"];
		// Beartic
		this.species.getLearnsetData('beartic').learnset.snowtumble = ["9D"];
		// Cryogonal
		this.species.getLearnsetData('cryogonal').learnset.mirrorshot = ["9D"];
		this.species.getLearnsetData('cryogonal').learnset.nastyplot = ["9M"];
		delete this.species.getLearnsetData('cryogonal').learnset.attract;
		// Shelmet
		this.species.getLearnsetData('shelmet').learnset.clamp = ["9D"];
		this.species.getLearnsetData('shelmet').learnset.withdraw = ["9L1"];
		this.species.getLearnsetData('shelmet').learnset.leechlife = ["9L1"];
		this.species.getLearnsetData('shelmet').learnset.vitaldrain = ["9M"];
		this.species.getLearnsetData('shelmet').learnset.springleap = ["9E"];
		delete this.species.getLearnsetData('shelmet').learnset.absorb;
		// Accelgor
		this.species.getLearnsetData('accelgor').learnset.ragepowder = ["9D"];
		this.species.getLearnsetData('accelgor').learnset.leechlife = ["9L1"];
		this.species.getLearnsetData('accelgor').learnset.stringshot = ["9M"];
		this.species.getLearnsetData('accelgor').learnset.toxic = ["9M"];
		this.species.getLearnsetData('accelgor').learnset.trailhead = ["9M"];
		this.species.getLearnsetData('accelgor').learnset.vitaldrain = ["9M"];
		delete this.species.getLearnsetData('accelgor').learnset.absorb;
		// Stunfisk
		this.species.getLearnsetData('stunfisk').learnset.thundercage = ["9D"];
		this.species.getLearnsetData('stunfisk').learnset.flash = ["9M"];
		delete this.species.getLearnsetData('stunfisk').learnset.tantrum;
		// Stunfisk Galar
		this.species.getLearnsetData('stunfiskgalar').learnset.jawlock = ["9D"];
		this.species.getLearnsetData('stunfiskgalar').learnset.endeavor = ["9M"];
		this.species.getLearnsetData('stunfiskgalar').learnset.superfang = ["9M"];
		delete this.species.getLearnsetData('stunfiskgalar').learnset.bounce;
		delete this.species.getLearnsetData('stunfiskgalar').learnset.tantrum;
		// Mienfoo
		this.species.getLearnsetData('mienfoo').learnset.armthrust = ["9D"];
		this.species.getLearnsetData('mienfoo').learnset.rollingkick = ["9L17"];
		this.species.getLearnsetData('mienfoo').learnset.trailhead = ["9M"];
		delete this.species.getLearnsetData('mienfoo').learnset.doubleslap;
		// Mienshao
		this.species.getLearnsetData('mienshao').learnset.lashout = ["9D"];
		this.species.getLearnsetData('mienshao').learnset.rollingkick = ["9L17"];
		this.species.getLearnsetData('mienshao').learnset.trailhead = ["9M"];
		delete this.species.getLearnsetData('mienshao').learnset.doubleslap;
		// Druddigon
		this.species.getLearnsetData('druddigon').learnset.morningsun = ["9D"];
		this.species.getLearnsetData('druddigon').learnset.avalanche = ["9M"];
		this.species.getLearnsetData('druddigon').learnset.breakingswipe = ["9M"];
		this.species.getLearnsetData('druddigon').learnset.screech = ["9M"];
		// Golett
		this.species.getLearnsetData('golett').learnset.selfdestruct = ["9D"];
		this.species.getLearnsetData('golett').learnset.tussle = ["9L21"];
		this.species.getLearnsetData('golett').learnset.tantrum = ["9M"];
		this.species.getLearnsetData('golett').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('golett').learnset.flash = ["9M"];
		delete this.species.getLearnsetData('golett').learnset.blizzard;
		delete this.species.getLearnsetData('golett').learnset.icebeam;
		// Golurk
		this.species.getLearnsetData('golurk').learnset.meteormash = ["9D"];
		this.species.getLearnsetData('golurk').learnset.tussle = ["9L21"];
		this.species.getLearnsetData('golurk').learnset.tantrum = ["9M"];
		this.species.getLearnsetData('golurk').learnset.explosion = ["9M"];
		this.species.getLearnsetData('golurk').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('golurk').learnset.flash = ["9M"];
		delete this.species.getLearnsetData('golurk').learnset.blizzard;
		// Pawniard
		this.species.getLearnsetData('pawniard').learnset.beatup = ["9D"];
		this.species.getLearnsetData('pawniard').learnset.metaledge = ["9L54"];
		this.species.getLearnsetData('pawniard').learnset.ironhead = ["9M"];
		// Bisharp
		this.species.getLearnsetData('bisharp').learnset.beatup = ["9D"];
		this.species.getLearnsetData('bisharp').learnset.metaledge = ["9L57"];
		this.species.getLearnsetData('bisharp').learnset.ironhead = ["9M"];
		// Bouffalant
		this.species.getLearnsetData('bouffalant').learnset.horndrill = ["9D"];
		this.species.getLearnsetData('bouffalant').learnset.fullcollide = ["9M"];
		this.species.getLearnsetData('bouffalant').learnset.throatchop = ["9E"];
		// Rufflet
		this.species.getLearnsetData('rufflet').learnset.nobleroar = ["9D"];
		// Braviary
		this.species.getLearnsetData('braviary').learnset.nobleroar = ["9D"];
		// Braviary-Hisui
		this.species.getLearnsetData('braviaryhisui').learnset.nobleroar = ["9D"];
		// Vullaby
		this.species.getLearnsetData('vullaby').learnset.shadowbone = ["9D"];
		this.species.getLearnsetData('vullaby').learnset.toxic = ["9M"];
		// Mandibuzz
		this.species.getLearnsetData('mandibuzz').learnset.shadowbone = ["9D"];
		this.species.getLearnsetData('mandibuzz').learnset.toxic = ["9M"];
		// Heatmor
		this.species.getLearnsetData('heatmor').learnset.clearsmog = ["9D"];
		this.species.getLearnsetData('heatmor').learnset.flash = ["9M"];
		// Durant
		this.species.getLearnsetData('durant').learnset.healorder = ["9D"];
		this.species.getLearnsetData('durant').learnset.compensation = ["9M"];
		this.species.getLearnsetData('durant').learnset.infestation = ["9M"];
		this.species.getLearnsetData('durant').learnset.escapetunnel = ["9E"];
		this.species.getLearnsetData('durant').learnset.metalburst = ["9E"];
		delete this.species.getLearnsetData('durant').learnset.tantrum;
		// Deino
		this.species.getLearnsetData('deino').learnset.rage = ["9D"];
		// Zweilous
		this.species.getLearnsetData('zweilous').learnset.rage = ["9D"];
		// Hydreigon
		this.species.getLearnsetData('hydreigon').learnset.fellswoop = ["9D"];
		// Larvesta
		this.species.getLearnsetData('larvesta').learnset.burnup = ["9D"];
		this.species.getLearnsetData('larvesta').learnset.flash = ["9M"];
		this.species.getLearnsetData('larvesta').learnset.naturalgift = ["9M"];
		this.species.getLearnsetData('larvesta').learnset.vitaldrain = ["9M"];
		delete this.species.getLearnsetData('larvesta').learnset.absorb;
		delete this.species.getLearnsetData('larvesta').learnset.trailhead;
		// Volcarona
		this.species.getLearnsetData('volcarona').learnset.burnup = ["9D"];
		this.species.getLearnsetData('volcarona').learnset.flash = ["9M"];
		this.species.getLearnsetData('volcarona').learnset.naturalgift = ["9M"];
		this.species.getLearnsetData('volcarona').learnset.vitaldrain = ["9M"];
		delete this.species.getLearnsetData('volcarona').learnset.absorb;
		delete this.species.getLearnsetData('volcarona').learnset.trailhead;
		// Cobalion
		this.species.getLearnsetData('cobalion').learnset.reversal = ["9D"];
		this.species.getLearnsetData('cobalion').learnset.metalburst = ["9L25"];
		this.species.getLearnsetData('cobalion').learnset.metaledge = ["9L55"];
		this.species.getLearnsetData('cobalion').learnset.chipaway = ["9M"];
		this.species.getLearnsetData('cobalion').learnset.ironhead = ["9M"];
		// Terrakion
		this.species.getLearnsetData('terrakion').learnset.reversal = ["9D"];
		this.species.getLearnsetData('terrakion').learnset.stoneaxe = ["9L55"];
		this.species.getLearnsetData('terrakion').learnset.stoneedge = ["9M"];
		this.species.getLearnsetData('terrakion').learnset.chipaway = ["9M"];
		// Virizion
		this.species.getLearnsetData('virizion').learnset.reversal = ["9D"];
		this.species.getLearnsetData('virizion').learnset.chipaway = ["9M"];
		this.species.getLearnsetData('virizion').learnset.flash = ["9M"];
		// Tornadus
		this.species.getLearnsetData('tornadus').learnset.twister = ["9D"];
		delete this.species.getLearnsetData('tornadus').learnset.metronome;
		// Tornadus Therian
		this.species.getLearnsetData('tornadustherian').learnset.skyattack = ["9D"];
		delete this.species.getLearnsetData('tornadustherian').learnset.twister;
		// Thundurus
		this.species.getLearnsetData('thundurus').learnset.iondeluge = ["9D"];
		this.species.getLearnsetData('thundurus').learnset.extrasensory = ["9L25"];
		this.species.getLearnsetData('thundurus').learnset.raindance = ["9L55","9M"];
		this.species.getLearnsetData('thundurus').learnset.nastyplot = ["9M"];
		delete this.species.getLearnsetData('thundurus').learnset.defog;
		delete this.species.getLearnsetData('thundurus').learnset.healblock;
		// Thundurus Therian
		this.species.getLearnsetData('thundurustherian').learnset.dragonpulse = ["9D"];
		delete this.species.getLearnsetData('thundurustherian').learnset.iondeluge;
		// Reshiram
		this.species.getLearnsetData('reshiram').learnset.dragonenergy = ["9D"];
		this.species.getLearnsetData('reshiram').learnset.flash = ["9M"];
		this.species.getLearnsetData('reshiram').learnset.preheat = ["9L8"];
		delete this.species.getLearnsetData('reshiram').learnset.slash;
		// Zekrom
		this.species.getLearnsetData('zekrom').learnset.dragonenergy = ["9D"];
		this.species.getLearnsetData('zekrom').learnset.charge = ["9L8"];
		this.species.getLearnsetData('zekrom').learnset.flash = ["9M"];
		delete this.species.getLearnsetData('zekrom').learnset.slash;
		// Landorus
		this.species.getLearnsetData('landorus').learnset.recycle = ["9D"];
		this.species.getLearnsetData('landorus').learnset.compensation = ["9M"];
		this.species.getLearnsetData('landorus').learnset.rototiller = ["9L1"];
		delete this.species.getLearnsetData('landorus').learnset.defog;
		// Landorus Therian
		this.species.getLearnsetData('landorustherian').learnset.nobleroar = ["9D"];
		delete this.species.getLearnsetData('landorustherian').learnset.recycle;
		// Kyurem
		this.species.getLearnsetData('kyurem').learnset.triattack = ["9D"];
		this.species.getLearnsetData('kyurem').learnset.scaryface = ["9L8"];
		this.species.getLearnsetData('kyurem').learnset.slash = ["9L16"];
		this.species.getLearnsetData('kyurem').learnset.endeavor = ["9L24","9M"];
		this.species.getLearnsetData('kyurem').learnset.dragonpulse = ["9L32","9M"];
		this.species.getLearnsetData('kyurem').learnset.icebeam = ["9L40","9M"];
		this.species.getLearnsetData('kyurem').learnset.sheercold = ["9L48"];
		this.species.getLearnsetData('kyurem').learnset.hypervoice = ["9L56","9M"];
		this.species.getLearnsetData('kyurem').learnset.blizzard = ["9L64","9M"];
		this.species.getLearnsetData('kyurem').learnset.imprison = ["9L72"];
		this.species.getLearnsetData('kyurem').learnset.outrage = ["9L80","9M"];
		this.species.getLearnsetData('kyurem').learnset.glaciate = ["9L88"];
		this.species.getLearnsetData('kyurem').learnset.frostbreath = ["9M"];
		this.species.getLearnsetData('kyurem').learnset.icepunch = ["9M"];
		// Kyurem Black
		this.species.getLearnsetData('kyuremwhite').learnset.triattack = ["9D"];
		this.species.getLearnsetData('kyuremblack').learnset.fusionbolt = ["9R"];
		this.species.getLearnsetData('kyuremblack').learnset.scaryface = ["9L8"];
		this.species.getLearnsetData('kyuremblack').learnset.slash = ["9L16"];
		this.species.getLearnsetData('kyuremblack').learnset.endeavor = ["9L24","9M"];
		this.species.getLearnsetData('kyuremblack').learnset.dragonpulse = ["9L32","9M"];
		this.species.getLearnsetData('kyuremblack').learnset.icebeam = ["9L40","9M"];
		this.species.getLearnsetData('kyuremblack').learnset.sheercold = ["9L48"];
		this.species.getLearnsetData('kyuremblack').learnset.hypervoice = ["9L56","9M"];
		this.species.getLearnsetData('kyuremblack').learnset.blizzard = ["9L64","9M"];
		this.species.getLearnsetData('kyuremblack').learnset.imprison = ["9L72"];
		this.species.getLearnsetData('kyuremblack').learnset.outrage = ["9L80","9M"];
		this.species.getLearnsetData('kyuremblack').learnset.freezeshock = ["9L88"];
		this.species.getLearnsetData('kyuremblack').learnset.frostbreath = ["9M"];
		this.species.getLearnsetData('kyuremblack').learnset.icepunch = ["9M"];
		// Kyurem White
		this.species.getLearnsetData('kyuremblack').learnset.triattack = ["9D"];
		this.species.getLearnsetData('kyuremwhite').learnset.fusionflare = ["9R"];
		this.species.getLearnsetData('kyuremwhite').learnset.scaryface = ["9L8"];
		this.species.getLearnsetData('kyuremwhite').learnset.slash = ["9L16"];
		this.species.getLearnsetData('kyuremwhite').learnset.endeavor = ["9L24","9M"];
		this.species.getLearnsetData('kyuremwhite').learnset.dragonpulse = ["9L32","9M"];
		this.species.getLearnsetData('kyuremwhite').learnset.icebeam = ["9L40","9M"];
		this.species.getLearnsetData('kyuremwhite').learnset.sheercold = ["9L48"];
		this.species.getLearnsetData('kyuremwhite').learnset.hypervoice = ["9L56","9M"];
		this.species.getLearnsetData('kyuremwhite').learnset.blizzard = ["9L64","9M"];
		this.species.getLearnsetData('kyuremwhite').learnset.imprison = ["9L72"];
		this.species.getLearnsetData('kyuremwhite').learnset.outrage = ["9L80","9M"];
		this.species.getLearnsetData('kyuremwhite').learnset.iceburn = ["9L88"];
		this.species.getLearnsetData('kyuremwhite').learnset.frostbreath = ["9M"];
		this.species.getLearnsetData('kyuremwhite').learnset.icepunch = ["9M"];
		// Keldeo
		this.species.getLearnsetData('keldeo').learnset.secretsword = ["9D"];
		this.species.getLearnsetData('keldeo').learnset.takedown = ["9L7"];
		this.species.getLearnsetData('keldeo').learnset.helpinghand = ["9L13"];
		this.species.getLearnsetData('keldeo').learnset.retaliate = ["9L19", "9M"];
		this.species.getLearnsetData('keldeo').learnset.aquacutter = ["9L25"];
		this.species.getLearnsetData('keldeo').learnset.sacredsword = ["9L31"];
		this.species.getLearnsetData('keldeo').learnset.swordsdance = ["9L37", "9M"];
		this.species.getLearnsetData('keldeo').learnset.quickguard = ["9L43"];
		this.species.getLearnsetData('keldeo').learnset.workup = ["9L49", "9M"];
		this.species.getLearnsetData('keldeo').learnset.hydropump = ["9L55", "9M"];
		this.species.getLearnsetData('keldeo').learnset.closecombat = ["9L61"];
		this.species.getLearnsetData('keldeo').learnset.aquatail = ["9M"];
		// Meloetta Aria
		this.species.getLearnsetData('meloetta').learnset.sparklingaria = ["9D"];
		this.species.getLearnsetData('meloetta').learnset.round = ["9L1"];
		this.species.getLearnsetData('meloetta').learnset.confusion = ["9L8"];
		this.species.getLearnsetData('meloetta').learnset.sing = ["9L15"];
		this.species.getLearnsetData('meloetta').learnset.luckychant = ["9L22"];
		this.species.getLearnsetData('meloetta').learnset.encore = ["9L29"];
		this.species.getLearnsetData('meloetta').learnset.echoedvoice = ["9L36"];
		this.species.getLearnsetData('meloetta').learnset.psybeam = ["9L43"];
		this.species.getLearnsetData('meloetta').learnset.relicsong = ["9L50"];
		this.species.getLearnsetData('meloetta').learnset.hypervoice = ["9L57"];
		this.species.getLearnsetData('meloetta').learnset.psychic = ["9L64"];
		this.species.getLearnsetData('meloetta').learnset.roleplay = ["9L71"];
		this.species.getLearnsetData('meloetta').learnset.perishsong = ["9L78"];
		this.species.getLearnsetData('meloetta').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('meloetta').learnset.flash = ["9M"];
		delete this.species.getLearnsetData('meloetta').learnset.acrobatics;
		delete this.species.getLearnsetData('meloetta').learnset.closecombat;
		delete this.species.getLearnsetData('meloetta').learnset.quickattack;
		delete this.species.getLearnsetData('meloetta').learnset.teeterdance;
		delete this.species.getLearnsetData('meloetta').learnset.uturn;
		delete this.species.getLearnsetData('meloetta').learnset.wakeupslap;
		// Meloetta Pirouette
		this.species.getLearnsetData('meloettapirouette').learnset.aquastep = ["9D"];
		this.species.getLearnsetData('meloettapirouette').learnset.quickattack = ["9L1"];
		this.species.getLearnsetData('meloettapirouette').learnset.lowkick = ["9L8"];
		this.species.getLearnsetData('meloettapirouette').learnset.teeterdance = ["9L15"];
		this.species.getLearnsetData('meloettapirouette').learnset.entrainment = ["9L22"];
		this.species.getLearnsetData('meloettapirouette').learnset.encore = ["9L29"];
		this.species.getLearnsetData('meloettapirouette').learnset.acrobatics = ["9L36"];
		this.species.getLearnsetData('meloettapirouette').learnset.wakeupslap = ["9L43"];
		this.species.getLearnsetData('meloettapirouette').learnset.relicsong = ["9L50"];
		this.species.getLearnsetData('meloettapirouette').learnset.uturn = ["9L57"];
		this.species.getLearnsetData('meloettapirouette').learnset.closecombat = ["9L64"];
		this.species.getLearnsetData('meloettapirouette').learnset.roleplay = ["9L71"];
		this.species.getLearnsetData('meloettapirouette').learnset.victorydance = ["9L78"];
		this.species.getLearnsetData('meloettapirouette').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('meloettapirouette').learnset.flash = ["9M"];
		delete this.species.getLearnsetData('meloettapirouette').learnset.round;
		delete this.species.getLearnsetData('meloettapirouette').learnset.confusion;
		delete this.species.getLearnsetData('meloettapirouette').learnset.sing;
		delete this.species.getLearnsetData('meloettapirouette').learnset.luckychant;
		delete this.species.getLearnsetData('meloettapirouette').learnset.echoedvoice;
		delete this.species.getLearnsetData('meloettapirouette').learnset.psybeam;
		delete this.species.getLearnsetData('meloettapirouette').learnset.hypervoice;
		delete this.species.getLearnsetData('meloettapirouette').learnset.psychic;
		delete this.species.getLearnsetData('meloettapirouette').learnset.perishsong;
		// Genesect
		this.species.getLearnsetData('genesect').learnset.extremespeed = ["9D"];
		this.species.getLearnsetData('genesect').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('genesect').learnset.flash = ["9M"];
		this.species.getLearnsetData('genesect').learnset.incinerate = ["9M"];
		this.species.getLearnsetData('genesect').learnset.stringshot = ["9M"];
		// Chespin
		this.species.getLearnsetData('chespin').learnset.skullbash = ["9D"];
		this.species.getLearnsetData('chespin').learnset.bulletseed = ["9L35"];
		this.species.getLearnsetData('chespin').learnset.flash = ["9M"];
		this.species.getLearnsetData('chespin').learnset.fullcollide = ["9M"];
		this.species.getLearnsetData('chespin').learnset.naturalgift = ["9M"];
		delete this.species.getLearnsetData('chespin').learnset.mudshot;
		// Quilladin
		this.species.getLearnsetData('quilladin').learnset.skullbash = ["9D"];
		this.species.getLearnsetData('quilladin').learnset.bulletseed = ["9L39"];
		this.species.getLearnsetData('quilladin').learnset.flash = ["9M"];
		this.species.getLearnsetData('quilladin').learnset.fullcollide = ["9M"];
		this.species.getLearnsetData('quilladin').learnset.lowsweep = ["9M"];
		this.species.getLearnsetData('quilladin').learnset.naturalgift = ["9M"];
		delete this.species.getLearnsetData('quilladin').learnset.mudshot;
		// Chesnaught
		this.species.getLearnsetData('chesnaught').learnset.skullbash = ["9D"];
		this.species.getLearnsetData('chesnaught').learnset.bulletseed = ["9L41"];
		this.species.getLearnsetData('chesnaught').learnset.chipaway = ["9M"];
		this.species.getLearnsetData('chesnaught').learnset.flash = ["9M"];
		this.species.getLearnsetData('chesnaught').learnset.fullcollide = ["9M"];
		this.species.getLearnsetData('chesnaught').learnset.lowsweep = ["9M"];
		this.species.getLearnsetData('chesnaught').learnset.naturalgift = ["9M"];
		delete this.species.getLearnsetData('chesnaught').learnset.mudshot;
		// Fennekin
		this.species.getLearnsetData('fennekin').learnset.confuseray = ["9D"];
		this.species.getLearnsetData('fennekin').learnset.amnesia = ["9M"];
		this.species.getLearnsetData('fennekin').learnset.charm = ["9M"];
		// Braixen
		this.species.getLearnsetData('braixen').learnset.confuseray = ["9D"];
		this.species.getLearnsetData('braixen').learnset.amnesia = ["9M"];
		this.species.getLearnsetData('braixen').learnset.charm = ["9M"];
		this.species.getLearnsetData('braixen').learnset.hex = ["9M"];
		this.species.getLearnsetData('braixen').learnset.nightmare = ["9M"];
		// Delphox
		this.species.getLearnsetData('delphox').learnset.confuseray = ["9D"];
		this.species.getLearnsetData('delphox').learnset.eeriespell = ["9L1"];
		this.species.getLearnsetData('delphox').learnset.amnesia = ["9M"];
		this.species.getLearnsetData('delphox').learnset.charm = ["9M"];
		this.species.getLearnsetData('delphox').learnset.hex = ["9M"];
		this.species.getLearnsetData('delphox').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('delphox').learnset.shadowball = ["9M"];
		// Froakie
		this.species.getLearnsetData('froakie').learnset.jetpunch = ["9D"];
		this.species.getLearnsetData('froakie').learnset.cut = ["9E"];
		this.species.getLearnsetData('froakie').learnset.toxic = ["9M"];
		this.species.getLearnsetData('froakie').learnset.whirlpool = ["9M"];
		delete this.species.getLearnsetData('froakie').learnset.blizzard;
		delete this.species.getLearnsetData('froakie').learnset.icebeam;
		delete this.species.getLearnsetData('froakie').learnset.poweruppunch;
		// Frogadier
		this.species.getLearnsetData('frogadier').learnset.jetpunch = ["9D"];
		this.species.getLearnsetData('frogadier').learnset.toxic = ["9M"];
		this.species.getLearnsetData('frogadier').learnset.whirlpool = ["9M"];
		delete this.species.getLearnsetData('frogadier').learnset.blizzard;
		delete this.species.getLearnsetData('frogadier').learnset.icebeam;
		// Greninja
		this.species.getLearnsetData('greninja').learnset.spiritshackle = ["9D"];
		this.species.getLearnsetData('greninja').learnset.aquacutter = ["9L68"];
		this.species.getLearnsetData('greninja').learnset.hydropump = ["9M"];
		this.species.getLearnsetData('greninja').learnset.toxic = ["9M"];
		this.species.getLearnsetData('greninja').learnset.whirlpool = ["9M"];
		delete this.species.getLearnsetData('froakie').learnset.blizzard;
		// Bunnelby
		this.species.getLearnsetData('bunnelby').learnset.crosschop = ["9D"];
		this.species.getLearnsetData('bunnelby').learnset.tussle = ["9L12"];
		this.species.getLearnsetData('bunnelby').learnset.bulldoze = ["9L22","9M"];
		this.species.getLearnsetData('bunnelby').learnset.naturalgift = ["9M"];
		this.species.getLearnsetData('bunnelby').learnset.trailhead = ["9M"];
		this.species.getLearnsetData('bunnelby').learnset.rockclimb = ["9E"];
		delete this.species.getLearnsetData('bunnelby').learnset.mudshot;
		// Diggersby
		this.species.getLearnsetData('diggersby').learnset.crosschop = ["9D"];
		this.species.getLearnsetData('diggersby').learnset.doubleslap = ["9L10"];
		this.species.getLearnsetData('diggersby').learnset.tussle = ["9L12"];
		this.species.getLearnsetData('diggersby').learnset.bulldoze = ["9L24","9M"];
		this.species.getLearnsetData('diggersby').learnset.naturalgift = ["9M"];
		this.species.getLearnsetData('diggersby').learnset.trailhead = ["9M"];
		delete this.species.getLearnsetData('diggersby').learnset.mudshot;
		// Fletchling
		this.species.getLearnsetData('fletchling').learnset.pluck = ["9D"];
		this.species.getLearnsetData('fletchling').learnset.mefirst = ["9E"];
		this.species.getLearnsetData('fletchling').learnset.razorwind = ["9E"];
		// Fletchinder
		this.species.getLearnsetData('fletchinder').learnset.pluck = ["9D"];
		// Talonflame
		this.species.getLearnsetData('talonflame').learnset.skydrop = ["9D"];
		this.species.getLearnsetData('talonflame').learnset.screech = ["9M"];
		// Vivillon
		this.species.getLearnsetData('vivillon').learnset.reflecttype = ["9D"];
		this.species.getLearnsetData('vivillon').learnset.silverwind = ["9L17"];
		this.species.getLearnsetData('vivillon').learnset.flash = ["9M"];
		delete this.species.getLearnsetData('vivillon').learnset.psybeam;
		// Litleo
		this.species.getLearnsetData('litleo').learnset.assist = ["9D"];
		this.species.getLearnsetData('litleo').learnset.assurance = ["9M"];
		// Pyroar
		this.species.getLearnsetData('pyroar').learnset.assist = ["9D"];
		this.species.getLearnsetData('pyroar').learnset.assurance = ["9M"];
		// Flabébé
		this.species.getLearnsetData('flabebe').learnset.sweetscent = ["9D"];
		this.species.getLearnsetData('flabebe').learnset.charm = ["9M"];
		this.species.getLearnsetData('flabebe').learnset.daydream = ["9L1"];
		this.species.getLearnsetData('flabebe').learnset.faketears = ["9M"];
		this.species.getLearnsetData('flabebe').learnset.flash = ["9M"];
		this.species.getLearnsetData('flabebe').learnset.leafage = ["9L1"];
		this.species.getLearnsetData('flabebe').learnset.lifedew = ["9E"];
		this.species.getLearnsetData('flabebe').learnset.naturalgift = ["9M"];
		delete this.species.getLearnsetData('flabebe').learnset.vinewhip;
		// Floette
		this.species.getLearnsetData('floette').learnset.sweetscent = ["9D"];
		this.species.getLearnsetData('floette').learnset.charm = ["9M"];
		this.species.getLearnsetData('floette').learnset.daydream = ["9L1"];
		this.species.getLearnsetData('floette').learnset.faketears = ["9M"];
		this.species.getLearnsetData('floette').learnset.flash = ["9M"];
		this.species.getLearnsetData('floette').learnset.leafage = ["9L1"];
		this.species.getLearnsetData('floette').learnset.naturalgift = ["9M"];
		delete this.species.getLearnsetData('floette').learnset.vinewhip;
		// Florges
		this.species.getLearnsetData('florges').learnset.fleurcannon = ["9D"];
		this.species.getLearnsetData('florges').learnset.courtchange = ["9L1"];
		this.species.getLearnsetData('florges').learnset.daydream = ["9L1"];
		this.species.getLearnsetData('florges').learnset.leafage = ["9L1"];
		this.species.getLearnsetData('florges').learnset.charm = ["9M"];
		this.species.getLearnsetData('florges').learnset.faketears = ["9M"];
		this.species.getLearnsetData('florges').learnset.flash = ["9M"];
		this.species.getLearnsetData('florges').learnset.naturalgift = ["9M"];
		delete this.species.getLearnsetData('florges').learnset.defog;
		delete this.species.getLearnsetData('florges').learnset.vinewhip;
		// Skiddo
		this.species.getLearnsetData('skiddo').learnset.highhorsepower = ["9D"];
		this.species.getLearnsetData('skiddo').learnset.trailhead = ["9L13", "9M"];
		this.species.getLearnsetData('skiddo').learnset.rockclimb = ["9L26"];
		this.species.getLearnsetData('skiddo').learnset.amnesia = ["9M"];
		this.species.getLearnsetData('skiddo').learnset.bulldoze = ["9M"];
		this.species.getLearnsetData('skiddo').learnset.charm = ["9M"];
		this.species.getLearnsetData('skiddo').learnset.naturalgift = ["9M"];
		delete this.species.getLearnsetData('skiddo').learnset.razorleaf;
		// Gogoat
		this.species.getLearnsetData('gogoat').learnset.highhorsepower = ["9D"];
		this.species.getLearnsetData('gogoat').learnset.trailhead = ["9L13", "9M"];
		this.species.getLearnsetData('gogoat').learnset.rockclimb = ["9L26"];
		this.species.getLearnsetData('gogoat').learnset.amnesia = ["9M"];
		this.species.getLearnsetData('gogoat').learnset.bulldoze = ["9M"];
		this.species.getLearnsetData('gogoat').learnset.charm = ["9M"];
		this.species.getLearnsetData('gogoat').learnset.naturalgift = ["9M"];
		delete this.species.getLearnsetData('gogoat').learnset.razorleaf;
		// Pancham
		this.species.getLearnsetData('pancham').learnset.scaryface = ["9D"];
		this.species.getLearnsetData('pancham').learnset.entrainment = ["9L20"];
		this.species.getLearnsetData('pancham').learnset.lowsweep = ["9L27", "9M"];
		this.species.getLearnsetData('pancham').learnset.skyuppercut = ["9L39"];
		this.species.getLearnsetData('pancham').learnset.megapunch = ["9L42"];
		this.species.getLearnsetData('pancham').learnset.bulletpunch = ["9E"];
		this.species.getLearnsetData('pancham').learnset.trailhead = ["9M"];
		delete this.species.getLearnsetData('pancham').learnset.crunch;
		delete this.species.getLearnsetData('pancham').learnset.slash;
		// Pangoro
		this.species.getLearnsetData('pangoro').learnset.scaryface = ["9D"];
		this.species.getLearnsetData('pangoro').learnset.suckerpunch = ["9L0"];
		this.species.getLearnsetData('pangoro').learnset.entrainment = ["9L20"];
		this.species.getLearnsetData('pangoro').learnset.lowsweep = ["9L27", "9M"];
		this.species.getLearnsetData('pangoro').learnset.skyuppercut = ["9L42"];
		this.species.getLearnsetData('pangoro').learnset.megapunch = ["9L45"];
		this.species.getLearnsetData('pangoro').learnset.vitalthrow = ["9L52"];
		this.species.getLearnsetData('pangoro').learnset.darkestlariat = ["9L57"];
		this.species.getLearnsetData('pangoro').learnset.chipaway = ["9M"];
		this.species.getLearnsetData('pangoro').learnset.trailhead = ["9M"];
		delete this.species.getLearnsetData('pangoro').learnset.crunch;
		delete this.species.getLearnsetData('pangoro').learnset.slash;
		// Furfrou
		this.species.getLearnsetData('furfrou').learnset.swagger = ["9D"];
		delete this.species.getLearnsetData('furfrou').learnset.uturn;
		// Espurr
		this.species.getLearnsetData('espurr').learnset.payday = ["9D"];
		// Meowstic ♀
		this.species.getLearnsetData('meowsticf').learnset.miracleeye = ["9D"];
		// Meowstic ♂
		this.species.getLearnsetData('meowstic').learnset.futuresight = ["9D"];
		// Honedge
		this.species.getLearnsetData('honedge').learnset.destinybond = ["9D"];
		this.species.getLearnsetData('honedge').learnset.scratch = ["9L1"];
		this.species.getLearnsetData('honedge').learnset.irondefense = ["9L1", "9M"];
		this.species.getLearnsetData('honedge').learnset.slash = ["9L18"];
		this.species.getLearnsetData('honedge').learnset.swordsdance = ["9L29", "9M"];
		this.species.getLearnsetData('honedge').learnset.ironhead = ["9L32", "9M"];
		this.species.getLearnsetData('honedge').learnset.metaledge = ["9L42"];
		this.species.getLearnsetData('honedge').learnset.autotomize = ["9L52"];
		this.species.getLearnsetData('honedge').learnset.fullcollide = ["9M"];
		this.species.getLearnsetData('honedge').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('honedge').learnset.terrify = ["9E"];
		delete this.species.getLearnsetData('honedge').learnset.tackle;
		// Doublade
		this.species.getLearnsetData('doublade').learnset.destinybond = ["9D"];
		this.species.getLearnsetData('doublade').learnset.scratch = ["9L1"];
		this.species.getLearnsetData('doublade').learnset.irondefense = ["9L1", "9M"];
		this.species.getLearnsetData('doublade').learnset.slash = ["9L18"];
		this.species.getLearnsetData('doublade').learnset.swordsdance = ["9L29", "9M"];
		this.species.getLearnsetData('doublade').learnset.ironhead = ["9L32", "9M"];
		this.species.getLearnsetData('doublade').learnset.metaledge = ["9L45"];
		this.species.getLearnsetData('doublade').learnset.autotomize = ["9L57"];
		this.species.getLearnsetData('doublade').learnset.fullcollide = ["9M"];
		this.species.getLearnsetData('doublade').learnset.nightmare = ["9M"];
		delete this.species.getLearnsetData('doublade').learnset.tackle;
		// Aegislash
		this.species.getLearnsetData('aegislash').learnset.bitterblade = ["9D"];
		this.species.getLearnsetData('aegislash').learnset.scratch = ["9L1"];
		this.species.getLearnsetData('aegislash').learnset.metaledge = ["9L1"];
		this.species.getLearnsetData('aegislash').learnset.fullcollide = ["9M"];
		this.species.getLearnsetData('aegislash').learnset.nightmare = ["9M"];
		delete this.species.getLearnsetData('aegislash').learnset.tackle;
		// Spritzee
		this.species.getLearnsetData('spritzee').learnset.hypnosis = ["9D"];
		this.species.getLearnsetData('spritzee').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('spritzee').learnset.strangesmoke = ["9L31"];
		delete this.species.getLearnsetData('spritzee').learnset.gyroball;
		delete this.species.getLearnsetData('spritzee').learnset.moonblast;
		delete this.species.getLearnsetData('spritzee').learnset.thunderbolt;
		// Aromatisse
		this.species.getLearnsetData('aromatisse').learnset.hypnosis = ["9D"];
		this.species.getLearnsetData('aromatisse').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('aromatisse').learnset.strangesmoke = ["9L31"];
		delete this.species.getLearnsetData('aromatisse').learnset.gyroball;
		delete this.species.getLearnsetData('aromatisse').learnset.moonblast;
		delete this.species.getLearnsetData('aromatisse').learnset.thunder;
		// Swirlix
		this.species.getLearnsetData('swirlix').learnset.lick = ["9D"];
		this.species.getLearnsetData('swirlix').learnset.incinerate = ["9M"];
		this.species.getLearnsetData('swirlix').learnset.shockwave = ["9M"];
		this.species.getLearnsetData('swirlix').learnset.odorsleuth = ["9E"];
		delete this.species.getLearnsetData('swirlix').learnset.flamethrower;
		delete this.species.getLearnsetData('swirlix').learnset.thunderbolt;
		// Slurpuff
		this.species.getLearnsetData('slurpuff').learnset.lick = ["9D"];
		this.species.getLearnsetData('slurpuff').learnset.incinerate = ["9M"];
		this.species.getLearnsetData('slurpuff').learnset.shockwave = ["9M"];
		delete this.species.getLearnsetData('slurpuff').learnset.stickyweb;
		delete this.species.getLearnsetData('slurpuff').learnset.thunder;
		// Inkay
		this.species.getLearnsetData('inkay').learnset.liquidation = ["9D"];
		this.species.getLearnsetData('inkay').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('inkay').learnset.flash = ["9M"];
		this.species.getLearnsetData('inkay').learnset.incinerate = ["9M"];
		this.species.getLearnsetData('inkay').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('inkay').learnset.shockwave = ["9M"];
		this.species.getLearnsetData('inkay').learnset.octazooka = ["9E"];
		delete this.species.getLearnsetData('inkay').learnset.flamethrower;
		delete this.species.getLearnsetData('inkay').learnset.thunderbolt;
		// Malamar
		this.species.getLearnsetData('malamar').learnset.liquidation = ["9D"];
		this.species.getLearnsetData('malamar').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('malamar').learnset.flash = ["9M"];
		this.species.getLearnsetData('malamar').learnset.incinerate = ["9M"];
		this.species.getLearnsetData('malamar').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('malamar').learnset.shockwave = ["9M"];
		// Binacle
		this.species.getLearnsetData('binacle').learnset.crushclaw = ["9D"];
		this.species.getLearnsetData('binacle').learnset.ancientpower = ["9L20"];
		this.species.getLearnsetData('binacle').learnset.furycutter = ["9L28"];
		this.species.getLearnsetData('binacle').learnset.stoneaxe = ["9L37"];
		this.species.getLearnsetData('binacle').learnset.knockoff = ["9E"];
		this.species.getLearnsetData('binacle').learnset.lashout = ["9E"];
		this.species.getLearnsetData('binacle').learnset.shelter = ["9E"];
		delete this.species.getLearnsetData('binacle').learnset.clamp;
		delete this.species.getLearnsetData('binacle').learnset.earthquake;
		// Barbaracle
		this.species.getLearnsetData('barbaracle').learnset.crushclaw = ["9D"];
		this.species.getLearnsetData('barbaracle').learnset.ancientpower = ["9L20"];
		this.species.getLearnsetData('barbaracle').learnset.furycutter = ["9L28"];
		this.species.getLearnsetData('barbaracle').learnset.stoneaxe = ["9L37"];
		this.species.getLearnsetData('barbaracle').learnset.fullcollide = ["9M"];
		this.species.getLearnsetData('barbaracle').learnset.knockoff = ["9M"];
		delete this.species.getLearnsetData('barbaracle').learnset.clamp;
		delete this.species.getLearnsetData('barbaracle').learnset.meteorbeam;
		// Skrelp
		this.species.getLearnsetData('skrelp').learnset.razorleaf = ["9D"];
		this.species.getLearnsetData('skrelp').learnset.toxic = ["9L32","9M"];
		this.species.getLearnsetData('skrelp').learnset.brine = ["9M"];
		this.species.getLearnsetData('skrelp').learnset.whirlpool = ["9M"];
		delete this.species.getLearnsetData('skrelp').learnset.thunderbolt;
		// Dragalge
		this.species.getLearnsetData('dragalge').learnset.razorleaf = ["9D"];
		this.species.getLearnsetData('dragalge').learnset.toxic = ["9L32","9M"];
		this.species.getLearnsetData('dragalge').learnset.brine = ["9M"];
		this.species.getLearnsetData('dragalge').learnset.whirlpool = ["9M"];
		delete this.species.getLearnsetData('dragalge').learnset.thunder;
		// Clauncher
		this.species.getLearnsetData('clauncher').learnset.flameburst = ["9D"];
		this.species.getLearnsetData('clauncher').learnset.mudbomb = ["9L35"];
		this.species.getLearnsetData('clauncher').learnset.liquidation = ["9L45"];
		this.species.getLearnsetData('clauncher').learnset.bounce = ["9M"];
		this.species.getLearnsetData('clauncher').learnset.brine = ["9M"];
		this.species.getLearnsetData('clauncher').learnset.electroball = ["9M"];
		this.species.getLearnsetData('clauncher').learnset.swordsdance = ["9M"];
		this.species.getLearnsetData('clauncher').learnset.whirlpool = ["9M"];
		this.species.getLearnsetData('clauncher').learnset.iceball = ["9E"];
		delete this.species.getLearnsetData('clauncher').learnset.blizzard;
		// Clawitzer
		this.species.getLearnsetData('clawitzer').learnset.steameruption = ["9D"];
		this.species.getLearnsetData('clawitzer').learnset.mudbomb = ["9L35"];
		this.species.getLearnsetData('clawitzer').learnset.liquidation = ["9L49"];
		this.species.getLearnsetData('clawitzer').learnset.bounce = ["9M"];
		this.species.getLearnsetData('clawitzer').learnset.brine = ["9M"];
		this.species.getLearnsetData('clawitzer').learnset.electroball = ["9M"];
		this.species.getLearnsetData('clawitzer').learnset.swordsdance = ["9M"];
		this.species.getLearnsetData('clawitzer').learnset.whirlpool = ["9M"];
		// Helioptile
		this.species.getLearnsetData('helioptile').learnset.morningsun = ["9D"];
		this.species.getLearnsetData('helioptile').learnset.flash = ["9M"];
		this.species.getLearnsetData('helioptile').learnset.trailhead = ["9M"];
		// Heliolisk
		this.species.getLearnsetData('heliolisk').learnset.morningsun = ["9D"];
		this.species.getLearnsetData('heliolisk').learnset.weatherball = ["9L1"];
		this.species.getLearnsetData('heliolisk').learnset.flash = ["9M"];
		this.species.getLearnsetData('heliolisk').learnset.trailhead = ["9M"];
		// Tyrunt
		this.species.getLearnsetData('tyrunt').learnset.quash = ["9D"];
		this.species.getLearnsetData('tyrunt').learnset.assurance = ["9M"];
		this.species.getLearnsetData('tyrunt').learnset.tantrum = ["9L49","9M"];
		this.species.getLearnsetData('tyrunt').learnset.closecombat = ["9E"];
		this.species.getLearnsetData('tyrunt').learnset.psychicfang = ["9E"];
		delete this.species.getLearnsetData('tyrunt').learnset.horndrill;
		// Tyrantrum
		this.species.getLearnsetData('tyrantrum').learnset.quash = ["9D"];
		this.species.getLearnsetData('tyrantrum').learnset.tantrum = ["9L53","9M"];
		delete this.species.getLearnsetData('tyrantrum').learnset.horndrill;
		// Amaura
		this.species.getLearnsetData('amaura').learnset.magiccoat = ["9D"];
		this.species.getLearnsetData('amaura').learnset.auroraveil = ["9M"];
		this.species.getLearnsetData('amaura').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('amaura').learnset.eerieimpulse = ["9M"];
		this.species.getLearnsetData('amaura').learnset.flash = ["9M"];
		this.species.getLearnsetData('amaura').learnset.powergem = ["9M"];
		this.species.getLearnsetData('amaura').learnset.shockwave = ["9M"];
		// Aurorus
		this.species.getLearnsetData('aurorus').learnset.magiccoat = ["9D"];
		this.species.getLearnsetData('aurorus').learnset.sheercold = ["9L1"];
		this.species.getLearnsetData('aurorus').learnset.auroraveil = ["9M"];
		this.species.getLearnsetData('aurorus').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('aurorus').learnset.eerieimpulse = ["9M"];
		this.species.getLearnsetData('aurorus').learnset.flash = ["9M"];
		this.species.getLearnsetData('aurorus').learnset.powergem = ["9M"];
		this.species.getLearnsetData('aurorus').learnset.shockwave = ["9M"];
		// Sylveon
		this.species.getLearnsetData('sylveon').learnset.wrap = ["9D"];
		this.species.getLearnsetData('sylveon').learnset.flash = ["9M"];
		this.species.getLearnsetData('sylveon').learnset.nightmare = ["9M"];
		// Hawlucha
		this.species.getLearnsetData('hawlucha').learnset.holdback = ["9D"];
		this.species.getLearnsetData('hawlucha').learnset.circlethrow = ["9E"];
		this.species.getLearnsetData('hawlucha').learnset.submission = ["9E"];
		// Dedenne
		this.species.getLearnsetData('dedenne').learnset.overdrive = ["9D"];
		this.species.getLearnsetData('dedenne').learnset.flash = ["9M"];
		this.species.getLearnsetData('dedenne').learnset.nastyplot = ["9M"];
		// Carbink
		this.species.getLearnsetData('carbink').learnset.mirrorshot = ["9D"];
		this.species.getLearnsetData('carbink').learnset.flash = ["9M"];
		// Goomy
		this.species.getLearnsetData('goomy').learnset.recover = ["9D"];
		this.species.getLearnsetData('goomy').learnset.toxic = ["9M"];
		this.species.getLearnsetData('goomy').learnset.lifedew = ["9E"];
		this.species.getLearnsetData('goomy').learnset.slipaway = ["9E"];
		delete this.species.getLearnsetData('goomy').learnset.thunderbolt;
		// Sliggoo
		this.species.getLearnsetData('sliggoo').learnset.recover = ["9D"];
		this.species.getLearnsetData('sliggoo').learnset.powerwhip = ["9L53"];
		this.species.getLearnsetData('sliggoo').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('sliggoo').learnset.toxic = ["9M"];
		delete this.species.getLearnsetData('sliggoo').learnset.blizzard;
		delete this.species.getLearnsetData('sliggoo').learnset.icebeam;
		delete this.species.getLearnsetData('sliggoo').learnset.thunderbolt;
		// Sliggoo Hisui
		this.species.getLearnsetData('sliggoohisui').learnset.recover = ["9D"];
		this.species.getLearnsetData('sliggoohisui').learnset.shelter = ["9L53"];
		this.species.getLearnsetData('sliggoohisui').learnset.bodypress = ["9M"];
		this.species.getLearnsetData('sliggoohisui').learnset.fullcollide = ["9M"];
		this.species.getLearnsetData('sliggoohisui').learnset.gyroball = ["9M"];
		this.species.getLearnsetData('sliggoohisui').learnset.irondefense = ["9M"];
		this.species.getLearnsetData('sliggoohisui').learnset.rockpolish = ["9M"];
		this.species.getLearnsetData('sliggoohisui').learnset.toxic = ["9M"];
		delete this.species.getLearnsetData('sliggoohisui').learnset.blizzard;
		delete this.species.getLearnsetData('sliggoohisui').learnset.icebeam;
		// Goodra
		this.species.getLearnsetData('goodra').learnset.recover = ["9D"];
		this.species.getLearnsetData('goodra').learnset.powerwhip = ["9L55"];
		this.species.getLearnsetData('goodra').learnset.outrage = ["9L61", "9M"];
		this.species.getLearnsetData('goodra').learnset.toxic = ["9M"];
		delete this.species.getLearnsetData('goodra').learnset.blizzard;
		delete this.species.getLearnsetData('goodra').learnset.thunder;
		// Goodra Hisui
		this.species.getLearnsetData('goodrahisui').learnset.recover = ["9D"];
		this.species.getLearnsetData('goodrahisui').learnset.shelter = ["9L55"];
		this.species.getLearnsetData('goodrahisui').learnset.outrage = ["9L61", "9M"];
		this.species.getLearnsetData('goodrahisui').learnset.bodypress = ["9D"];
		this.species.getLearnsetData('goodrahisui').learnset.fullcollide = ["9M"];
		this.species.getLearnsetData('goodrahisui').learnset.gyroball = ["9M"];
		this.species.getLearnsetData('goodrahisui').learnset.irondefense = ["9M"];
		this.species.getLearnsetData('goodrahisui').learnset.rockpolish = ["9M"];
		this.species.getLearnsetData('goodrahisui').learnset.toxic = ["9M"];
		delete this.species.getLearnsetData('goodrahisui').learnset.blizzard;
		delete this.species.getLearnsetData('goodrahisui').learnset.thunder;
		// Klefki
		this.species.getLearnsetData('klefki').learnset.sharpen = ["9D"];
		this.species.getLearnsetData('klefki').learnset.flash = ["9M"];
		this.species.getLearnsetData('klefki').learnset.nastyplot = ["9M"];
		delete this.species.getLearnsetData('klefki').learnset.defog;
		// Phantump
		this.species.getLearnsetData('phantump').learnset.irondefense = ["9D"];
		this.species.getLearnsetData('phantump').learnset.astonish = ["9L1"];
		this.species.getLearnsetData('phantump').learnset.tackle = ["9L1"];
		this.species.getLearnsetData('phantump').learnset.branchpoke = ["9L5"];
		this.species.getLearnsetData('phantump').learnset.leechseed = ["9L8"];
		this.species.getLearnsetData('phantump').learnset.confuseray = ["9L13"];
		this.species.getLearnsetData('phantump').learnset.willowisp = ["9L19", "9M"];
		this.species.getLearnsetData('phantump').learnset.hex = ["9L23", "9M"];
		this.species.getLearnsetData('phantump').learnset.terrify = ["9L28"];
		this.species.getLearnsetData('phantump').learnset.hornleech = ["9L31"];
		this.species.getLearnsetData('phantump').learnset.curse = ["9L35"];
		this.species.getLearnsetData('phantump').learnset.phantomforce = ["9L39", "9M"];
		this.species.getLearnsetData('phantump').learnset.ingrain = ["9L45"];
		this.species.getLearnsetData('phantump').learnset.woodhammer = ["9L49"];
		this.species.getLearnsetData('phantump').learnset.destinybond = ["9L54"];
		this.species.getLearnsetData('phantump').learnset.forestscurse = ["9L60"];
		this.species.getLearnsetData('phantump').learnset.naturalgift = ["9M"];
		this.species.getLearnsetData('phantump').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('phantump').learnset.growth = ["9E"];
		this.species.getLearnsetData('phantump').learnset.worryseed = ["9E"];
		delete this.species.getLearnsetData('phantump').learnset.poweruppunch;
		// Trevenant
		this.species.getLearnsetData('trevenant').learnset.naturesmadness = ["9D"];
		this.species.getLearnsetData('trevenant').learnset.astonish = ["9L1"];
		this.species.getLearnsetData('trevenant').learnset.tackle = ["9L1"];
		this.species.getLearnsetData('trevenant').learnset.branchpoke = ["9L5"];
		this.species.getLearnsetData('trevenant').learnset.leechseed = ["9L8"];
		this.species.getLearnsetData('trevenant').learnset.confuseray = ["9L13"];
		this.species.getLearnsetData('trevenant').learnset.willowisp = ["9L19", "9M"];
		this.species.getLearnsetData('trevenant').learnset.hex = ["9L23", "9M"];
		this.species.getLearnsetData('trevenant').learnset.terrify = ["9L28"];
		this.species.getLearnsetData('trevenant').learnset.hornleech = ["9L31"];
		this.species.getLearnsetData('trevenant').learnset.curse = ["9L35"];
		this.species.getLearnsetData('trevenant').learnset.phantomforce = ["9L39", "9M"];
		this.species.getLearnsetData('trevenant').learnset.ingrain = ["9L45"];
		this.species.getLearnsetData('trevenant').learnset.woodhammer = ["9L49"];
		this.species.getLearnsetData('trevenant').learnset.destinybond = ["9L54"];
		this.species.getLearnsetData('trevenant').learnset.forestscurse = ["9L60"];
		this.species.getLearnsetData('trevenant').learnset.midnight = ["9T"];
		this.species.getLearnsetData('trevenant').learnset.naturalgift = ["9M"];
		this.species.getLearnsetData('trevenant').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('trevenant').learnset.trailhead = ["9M"];
		delete this.species.getLearnsetData('trevenant').learnset.growth;
		// Pumpkaboo
		this.species.getLearnsetData('pumpkaboo').learnset.magicpowder = ["9D"];
		this.species.getLearnsetData('pumpkaboo').learnset.terrify = ["9l4"];
		this.species.getLearnsetData('pumpkaboo').learnset.flash = ["9M"];
		this.species.getLearnsetData('pumpkaboo').learnset.naturalgift = ["9M"];
		this.species.getLearnsetData('pumpkaboo').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('pumpkaboo').learnset.imprison = ["9E"];
		this.species.getLearnsetData('pumpkaboo').learnset.mysticalfire = ["9E"];
		delete this.species.getLearnsetData('pumpkaboo').learnset.scaryface;
		// Gourgeist
		this.species.getLearnsetData('gourgeist').learnset.magicpowder = ["9D"];
		this.species.getLearnsetData('gourgeist').learnset.terrify = ["9L4"];
		this.species.getLearnsetData('gourgeist').learnset.flash = ["9M"];
		this.species.getLearnsetData('gourgeist').learnset.midnight = ["9T"];
		this.species.getLearnsetData('gourgeist').learnset.naturalgift = ["9M"];
		this.species.getLearnsetData('gourgeist').learnset.nightmare = ["9M"];
		delete this.species.getLearnsetData('gourgeist').learnset.scaryface;
		// Bergmite
		this.species.getLearnsetData('bergmite').learnset.surf = ["9D"];
		this.species.getLearnsetData('bergmite').learnset.icywind = ["9L6","9M"];
		this.species.getLearnsetData('bergmite').learnset.iceball = ["9L12"];
		this.species.getLearnsetData('bergmite').learnset.flash = ["9M"];
		this.species.getLearnsetData('bergmite').learnset.iciclecrash = ["9E"];
		delete this.species.getLearnsetData('bergmite').learnset.powdersnow;
		// Avalugg
		this.species.getLearnsetData('avalugg').learnset.surf = ["9D"];
		this.species.getLearnsetData('avalugg').learnset.icywind = ["9L6","9M"];
		this.species.getLearnsetData('avalugg').learnset.iceball = ["9L12"];
		this.species.getLearnsetData('avalugg').learnset.flash = ["9M"];
		delete this.species.getLearnsetData('avalugg').learnset.powdersnow;
		// Avalugg Hisui
		this.species.getLearnsetData('avalugghisui').learnset.rockclimb = ["9D"];
		this.species.getLearnsetData('avalugghisui').learnset.chipaway = ["9M"];
		this.species.getLearnsetData('avalugghisui').learnset.icywind = ["9L6","9M"];
		this.species.getLearnsetData('avalugghisui').learnset.iceball = ["9L12"];
		delete this.species.getLearnsetData('avalugghisui').learnset.powdersnow;
		// Noibat
		this.species.getLearnsetData('noibat').learnset.chatter = ["9D"];
		this.species.getLearnsetData('noibat').learnset.leechlife = ["9L5"];
		this.species.getLearnsetData('noibat').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('noibat').learnset.vitaldrain = ["9M"];
		delete this.species.getLearnsetData('noibat').learnset.absorb;
		// Noivern
		this.species.getLearnsetData('noivern').learnset.chatter = ["9D"];
		this.species.getLearnsetData('noivern').learnset.leechlife = ["9L5"];
		this.species.getLearnsetData('noivern').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('noivern').learnset.vitaldrain = ["9M"];
		delete this.species.getLearnsetData('noivern').learnset.absorb;
		// Xerneas
		this.species.getLearnsetData('xerneas').learnset.naturesmadness = ["9D"];
		this.species.getLearnsetData('xerneas').learnset.aromatherapy = ["9L1"];
		this.species.getLearnsetData('xerneas').learnset.ingrain = ["9L1"];
		this.species.getLearnsetData('xerneas').learnset.psychup = ["9L25","9M"];
		this.species.getLearnsetData('xerneas').learnset.healpulse = ["9L30"];
		this.species.getLearnsetData('xerneas').learnset.dazzlinggleam = ["9L40","9M"];
		this.species.getLearnsetData('xerneas').learnset.mistyterrain = ["9L45","9M"];
		this.species.getLearnsetData('xerneas').learnset.geomancy = ["9L50"];
		this.species.getLearnsetData('xerneas').learnset.takedown = ["9L55"];
		this.species.getLearnsetData('xerneas').learnset.megahorn = ["9L65"];
		this.species.getLearnsetData('xerneas').learnset.playrough = ["9L70"];
		this.species.getLearnsetData('xerneas').learnset.flash = ["9M"];
		this.species.getLearnsetData('xerneas').learnset.naturalgift = ["9M"];
		this.species.getLearnsetData('xerneas').learnset.trailhead = ["9M"];
		delete this.species.getLearnsetData('xerneas').learnset.defog;
		// Yveltal
		this.species.getLearnsetData('yveltal').learnset.underflame = ["9D"];
		this.species.getLearnsetData('yveltal').learnset.phantomforce = ["9L1", "9M"];
		this.species.getLearnsetData('yveltal').learnset.ominouswind = ["9L1"];
		this.species.getLearnsetData('yveltal').learnset.razorwind = ["9L55"];
		this.species.getLearnsetData('yveltal').learnset.fellswoop = ["9L65"];
		this.species.getLearnsetData('yveltal').learnset.nightmare = ["9M"];
		delete this.species.getLearnsetData('yveltal').learnset.dragonrush;
		// Zygarde 50%
		this.species.getLearnsetData('zygarde').learnset.equalizer = ["9D"];
		this.species.getLearnsetData('zygarde').learnset.bind = ["9L1"];
		this.species.getLearnsetData('zygarde').learnset.dig = ["9L1","9M"];
		this.species.getLearnsetData('zygarde').learnset.dragonbreath = ["9L1"];
		this.species.getLearnsetData('zygarde').learnset.bite = ["9L1"];
		this.species.getLearnsetData('zygarde').learnset.haze = ["9L5"];
		this.species.getLearnsetData('zygarde').learnset.bulldoze = ["9L10","9M"];
		this.species.getLearnsetData('zygarde').learnset.camouflage = ["9L15"];
		this.species.getLearnsetData('zygarde').learnset.crunch = ["9L20"];
		this.species.getLearnsetData('zygarde').learnset.safeguard = ["9L25","9M"];
		this.species.getLearnsetData('zygarde').learnset.glare = ["9L30"];
		this.species.getLearnsetData('zygarde').learnset.sandstorm = ["9L35","9M"];
		this.species.getLearnsetData('zygarde').learnset.dragonpulse = ["9L40","9M"];
		this.species.getLearnsetData('zygarde').learnset.coil = ["9L45"];
		this.species.getLearnsetData('zygarde').learnset.landswrath = ["9L50"];
		this.species.getLearnsetData('zygarde').learnset.extremespeed = ["9L55"];
		this.species.getLearnsetData('zygarde').learnset.dragonrush = ["9L60"];
		this.species.getLearnsetData('zygarde').learnset.dragondance = ["9L65"];
		this.species.getLearnsetData('zygarde').learnset.earthquake = ["9L70","9M"];
		this.species.getLearnsetData('zygarde').learnset.outrage = ["9L75","9M"];
		this.species.getLearnsetData('zygarde').learnset.thousandwaves = ["9L80"];
		this.species.getLearnsetData('zygarde').learnset.thousandarrows = ["9L80"];
		this.species.getLearnsetData('zygarde').learnset.coreenforcer = ["9L85"];
		this.species.getLearnsetData('zygarde').learnset.avalanche = ["9M"];
		this.species.getLearnsetData('zygarde').learnset.bodypress = ["9M"];
		this.species.getLearnsetData('zygarde').learnset.trailhead = ["9M"];
		this.species.getLearnsetData('zygarde').learnset.stasis = ["9T"];
		// Zygarde 10%
		this.species.getLearnsetData('zygarde10').learnset.equalizer = ["9D"];
		this.species.getLearnsetData('zygarde10').learnset.bind = ["9L1"];
		this.species.getLearnsetData('zygarde10').learnset.dig = ["9L1","9M"];
		this.species.getLearnsetData('zygarde10').learnset.dragonbreath = ["9L1"];
		this.species.getLearnsetData('zygarde10').learnset.bite = ["9L1"];
		this.species.getLearnsetData('zygarde10').learnset.haze = ["9L5"];
		this.species.getLearnsetData('zygarde10').learnset.bulldoze = ["9L10","9M"];
		this.species.getLearnsetData('zygarde10').learnset.camouflage = ["9L15"];
		this.species.getLearnsetData('zygarde10').learnset.crunch = ["9L20"];
		this.species.getLearnsetData('zygarde10').learnset.safeguard = ["9L25","9M"];
		this.species.getLearnsetData('zygarde10').learnset.glare = ["9L30"];
		this.species.getLearnsetData('zygarde10').learnset.sandstorm = ["9L35","9M"];
		this.species.getLearnsetData('zygarde10').learnset.dragonpulse = ["9L40","9M"];
		this.species.getLearnsetData('zygarde10').learnset.coil = ["9L45"];
		this.species.getLearnsetData('zygarde10').learnset.landswrath = ["9L50"];
		this.species.getLearnsetData('zygarde10').learnset.extremespeed = ["9L55"];
		this.species.getLearnsetData('zygarde10').learnset.dragonrush = ["9L60"];
		this.species.getLearnsetData('zygarde10').learnset.dragondance = ["9L65"];
		this.species.getLearnsetData('zygarde10').learnset.earthquake = ["9L70","9M"];
		this.species.getLearnsetData('zygarde10').learnset.outrage = ["9L75","9M"];
		this.species.getLearnsetData('zygarde10').learnset.thousandwaves = ["9L80"];
		this.species.getLearnsetData('zygarde10').learnset.thousandarrows = ["9L80"];
		this.species.getLearnsetData('zygarde10').learnset.coreenforcer = ["9L85"];
		this.species.getLearnsetData('zygarde10').learnset.trailhead = ["9M"];
		this.species.getLearnsetData('zygarde10').learnset.stasis = ["9T"];
		// Diancie
		this.species.getLearnsetData('diancie').learnset.mirrorshot = ["9D"];
		this.species.getLearnsetData('diancie').learnset.flash = ["9M"];
		// Hoopa
		this.species.getLearnsetData('hoopa').learnset.spiritbreak = ["9D"];
		this.species.getLearnsetData('hoopa').learnset.terrify = ["9L1"];
		this.species.getLearnsetData('hoopa').learnset.shadowpunch = ["9L15"];
		this.species.getLearnsetData('hoopa').learnset.feintattack = ["9L15"];
		this.species.getLearnsetData('hoopa').learnset.lightscreen = ["9M"];
		this.species.getLearnsetData('hoopa').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('hoopa').learnset.poltergeist = ["9M"];
		this.species.getLearnsetData('hoopa').learnset.stasis = ["9T"];
		delete this.species.getLearnsetData('hoopa').learnset.destinybond;
		// Volcanion
		this.species.getLearnsetData('volcanion').learnset.preheat = ["9D"];
		this.species.getLearnsetData('volcanion').learnset.whirlpool = ["9M"];
		// Rowlet
		this.species.getLearnsetData('rowlet').learnset.aircutter = ["9D"];
		this.species.getLearnsetData('rowlet').learnset.naturalgift = ["9M"];
		delete this.species.getLearnsetData('rowlet').learnset.knockoff;
		// Dartrix
		this.species.getLearnsetData('dartrix').learnset.aircutter = ["9D"];
		this.species.getLearnsetData('dartrix').learnset.naturalgift = ["9M"];
		// Decidueye
		this.species.getLearnsetData('decidueye').learnset.fallenarrow = ["9D"];
		this.species.getLearnsetData('decidueye').learnset.naturalgift = ["9M"];
		this.species.getLearnsetData('decidueye').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('decidueye').learnset.retaliate = ["9M"];
		delete this.species.getLearnsetData('decidueye').learnset.poltergeist;
		// Decidueye Hisui
		this.species.getLearnsetData('decidueyehisui').learnset.closecombat = ["9D"];
		// Litten
		this.species.getLearnsetData('litten').learnset.preheat = ["9D"];
		this.species.getLearnsetData('litten').learnset.pounce = ["9L16"];
		this.species.getLearnsetData('litten').learnset.assist = ["9E"];
		this.species.getLearnsetData('litten').learnset.flash = ["9M"];
		this.species.getLearnsetData('litten').learnset.honeclaws = ["9M"];
		delete this.species.getLearnsetData('litten').learnset.doublekick;
		delete this.species.getLearnsetData('litten').learnset.leechlife;
		delete this.species.getLearnsetData('litten').learnset.uturn;
		// Torracat
		this.species.getLearnsetData('torracat').learnset.preheat = ["9D"];
		this.species.getLearnsetData('torracat').learnset.pounce = ["9L16"];
		this.species.getLearnsetData('torracat').learnset.flash = ["9M"];
		this.species.getLearnsetData('torracat').learnset.honeclaws = ["9M"];
		this.species.getLearnsetData('torracat').learnset.strength = ["9M"];
		this.species.getLearnsetData('torracat').learnset.trailhead = ["9M"];
		delete this.species.getLearnsetData('torracat').learnset.doublekick;
		delete this.species.getLearnsetData('torracat').learnset.leechlife;
		delete this.species.getLearnsetData('torracat').learnset.uturn;
		// Incineroar
		this.species.getLearnsetData('incineroar').learnset.heatcrash = ["9D"];
		this.species.getLearnsetData('incineroar').learnset.pounce = ["9L16"];
		this.species.getLearnsetData('incineroar').learnset.chipaway = ["9M"];
		this.species.getLearnsetData('incineroar').learnset.flash = ["9M"];
		this.species.getLearnsetData('incineroar').learnset.honeclaws = ["9M"];
		this.species.getLearnsetData('incineroar').learnset.strength = ["9M"];
		this.species.getLearnsetData('incineroar').learnset.trailhead = ["9M"];
		delete this.species.getLearnsetData('incineroar').learnset.doublekick;
		delete this.species.getLearnsetData('incineroar').learnset.leechlife;
		delete this.species.getLearnsetData('incineroar').learnset.uturn;
		// Popplio
		this.species.getLearnsetData('popplio').learnset.spotlight = ["9D"];
		this.species.getLearnsetData('popplio').learnset.flash = ["9M"];
		delete this.species.getLearnsetData('popplio').learnset.mistyterrain;
		// Brionne
		this.species.getLearnsetData('brionne').learnset.spotlight = ["9D"];
		this.species.getLearnsetData('brionne').learnset.flash = ["9M"];
		delete this.species.getLearnsetData('brionne').learnset.mistyterrain;
		// Primarina
		this.species.getLearnsetData('primarina').learnset.spotlight = ["9D"];
		this.species.getLearnsetData('primarina').learnset.flash = ["9M"];
		// Pikipek
		this.species.getLearnsetData('pikipek').learnset.barrage = ["9D"];
		// Trumbeak
		this.species.getLearnsetData('trumbeak').learnset.barrage = ["9D"];
		// Toucannon
		this.species.getLearnsetData('toucannon').learnset.barrage = ["9D"];
		this.species.getLearnsetData('toucannon').learnset.flash = ["9M"];
		this.species.getLearnsetData('toucannon').learnset.hurricane = ["9M"];
		// Yungoos
		this.species.getLearnsetData('yungoos').learnset.rage = ["9D"];
		this.species.getLearnsetData('yungoos').learnset.assurance = ["9M"];
		this.species.getLearnsetData('yungoos').learnset.chipaway = ["9M"];
		this.species.getLearnsetData('yungoos').learnset.honeclaws = ["9M"];
		this.species.getLearnsetData('yungoos').learnset.retaliate = ["9M"];
		this.species.getLearnsetData('yungoos').learnset.screech = ["9M"];
		this.species.getLearnsetData('yungoos').learnset.strength = ["9M"];
		delete this.species.getLearnsetData('yungoos').learnset.earthquake;
		// Gumshoos
		this.species.getLearnsetData('gumshoos').learnset.nastyplot = ["9D"];
		this.species.getLearnsetData('gumshoos').learnset.assurance = ["9M"];
		this.species.getLearnsetData('gumshoos').learnset.chipaway = ["9M"];
		this.species.getLearnsetData('gumshoos').learnset.honeclaws = ["9M"];
		this.species.getLearnsetData('gumshoos').learnset.retaliate = ["9M"];
		this.species.getLearnsetData('gumshoos').learnset.screech = ["9M"];
		this.species.getLearnsetData('gumshoos').learnset.strength = ["9M"];
		// Grubbin
		this.species.getLearnsetData('grubbin').learnset.thunderfang = ["9D"];
		// Charjabug
		this.species.getLearnsetData('charjabug').learnset.thunderfang = ["9D"];
		this.species.getLearnsetData('charjabug').learnset.flash = ["9M"];
		// Vikavolt
		this.species.getLearnsetData('vikavolt').learnset.thunderfang = ["9D"];
		this.species.getLearnsetData('vikavolt').learnset.flash = ["9M"];
		// Crabrawler
		this.species.getLearnsetData('crabrawler').learnset.counter = ["9D"];
		this.species.getLearnsetData('crabrawler').learnset.chipaway = ["9M"];
		this.species.getLearnsetData('crabrawler').learnset.strength = ["9M"];
		this.species.getLearnsetData('crabrawler').learnset.hammerarm = ["9E"];
		// Crabominable
		this.species.getLearnsetData('crabominable').learnset.thrash = ["9D"];
		this.species.getLearnsetData('crabominable').learnset.rockclimb = ["9L17"];
		this.species.getLearnsetData('crabominable').learnset.bodypress = ["9M"];
		this.species.getLearnsetData('crabominable').learnset.chipaway = ["9M"];
		this.species.getLearnsetData('crabominable').learnset.strength = ["9M"];
		delete this.species.getLearnsetData('crabominable').learnset.bubblebeam;
		// Oricorio Pom-Pom
		this.species.getLearnsetData('oricoriopompom').learnset.boltbeak = ["9D"];
		this.species.getLearnsetData('oricoriopompom').learnset.flash = ["9M"];
		delete this.species.getLearnsetData('oricoriopompom').learnset.quash;
		delete this.species.getLearnsetData('oricoriopompom').learnset.fierydance;
		// Oricorio Pau
		this.species.getLearnsetData('oricoriopau').learnset.stasis = ["9D"];
		this.species.getLearnsetData('oricoriopau').learnset.flash = ["9M"];
		delete this.species.getLearnsetData('oricoriopau').learnset.fierydance;
		delete this.species.getLearnsetData('oricoriopau').learnset.quash;
		// Oricorio Baile
		this.species.getLearnsetData('oricorio').learnset.fierydance = ["9D"];
		this.species.getLearnsetData('oricorio').learnset.flash = ["9M"];
		delete this.species.getLearnsetData('oricorio').learnset.quash;
		// Oricorio Sensu
		this.species.getLearnsetData('oricoriosensu').learnset.midnight = ["9D"];
		this.species.getLearnsetData('oricoriosensu').learnset.flash = ["9M"];
		delete this.species.getLearnsetData('oricoriosensu').learnset.fierydance;
		delete this.species.getLearnsetData('oricoriosensu').learnset.quash;
		// Cutiefly
		this.species.getLearnsetData('cutiefly').learnset.mindreader = ["9D"];
		this.species.getLearnsetData('cutiefly').learnset.bugcloud = ["9L1"];
		this.species.getLearnsetData('cutiefly').learnset.flash = ["9M"];
		this.species.getLearnsetData('cutiefly').learnset.naturalgift = ["9M"];
		this.species.getLearnsetData('cutiefly').learnset.stringshot = ["9M"];
		delete this.species.getLearnsetData('cutiefly').learnset.absorb;
		// Ribombee
		this.species.getLearnsetData('ribombee').learnset.mindreader = ["9D"];
		this.species.getLearnsetData('ribombee').learnset.bugcloud = ["9L1"];
		this.species.getLearnsetData('ribombee').learnset.flash = ["9M"];
		this.species.getLearnsetData('ribombee').learnset.metronome = ["9M"];
		this.species.getLearnsetData('ribombee').learnset.naturalgift = ["9M"];
		this.species.getLearnsetData('ribombee').learnset.stringshot = ["9M"];
		delete this.species.getLearnsetData('ribombee').learnset.absorb;
		// Rockruff
		this.species.getLearnsetData('rockruff').learnset.playnice = ["9D"];
		this.species.getLearnsetData('rockruff').learnset.charm = ["9M"];
		delete this.species.getLearnsetData('rockruff').learnset.tantrum;
		// Lycanroc Midday
		this.species.getLearnsetData('lycanroc').learnset.morningsun = ["9D"];
		this.species.getLearnsetData('lycanroc').learnset.aquatail = ["9M"];
		this.species.getLearnsetData('lycanroc').learnset.flash = ["9M"];
		this.species.getLearnsetData('lycanroc').learnset.retaliate = ["9M"];
		delete this.species.getLearnsetData('lycanroc').learnset.toxic;
		// Lycanroc Midnight
		this.species.getLearnsetData('lycanrocmidnight').learnset.moonlight = ["9D"];
		this.species.getLearnsetData('lycanrocmidnight').learnset.assurance = ["9M"];
		this.species.getLearnsetData('lycanrocmidnight').learnset.avalanche = ["9M"];
		this.species.getLearnsetData('lycanrocmidnight').learnset.strength = ["9M"];
		delete this.species.getLearnsetData('lycanrocmidnight').learnset.toxic;
		// Lycanroc Twilight
		this.species.getLearnsetData('lycanroctwilight').learnset.wish = ["9D"];
		this.species.getLearnsetData('lycanroctwilight').learnset.crushclaw = ["9L0"];
		this.species.getLearnsetData('lycanroctwilight').learnset.aquatail = ["9M"];
		this.species.getLearnsetData('lycanroctwilight').learnset.avalanche = ["9M"];
		this.species.getLearnsetData('lycanroctwilight').learnset.assurance = ["9M"];
		this.species.getLearnsetData('lycanroctwilight').learnset.strength = ["9M"];
		delete this.species.getLearnsetData('lycanroctwilight').learnset.thrash;
		// Wishiwashi
		this.species.getLearnsetData('wishiwashi').learnset.memento = ["9D"];
		this.species.getLearnsetData('wishiwashi').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('wishiwashi').learnset.flash = ["9M"];
		// Mareanie
		this.species.getLearnsetData('mareanie').learnset.lashout = ["9D"];
		this.species.getLearnsetData('mareanie').learnset.toxic = ["9L21","9M"];
		// Toxapex
		this.species.getLearnsetData('toxapex').learnset.lashout = ["9D"];
		this.species.getLearnsetData('toxapex').learnset.toxic = ["9L21","9M"];
		// Mudbray
		this.species.getLearnsetData('mudbray').learnset.slackoff = ["9D"];
		this.species.getLearnsetData('mudbray').learnset.tussle = ["9E"];
		// Mudsdale
		this.species.getLearnsetData('mudsdale').learnset.slackoff = ["9D"];
		// Dewpider
		this.species.getLearnsetData('dewpider').learnset.acidarmor = ["9D"];
		this.species.getLearnsetData('dewpider').learnset.leechlife = ["9L13"];
		this.species.getLearnsetData('dewpider').learnset.bugbite = ["9L21","9M"];
		this.species.getLearnsetData('dewpider').learnset.vitaldrain = ["9L29","9M"];
		this.species.getLearnsetData('dewpider').learnset.dive = ["9L32","9M"];
		this.species.getLearnsetData('dewpider').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('dewpider').learnset.stringshot = ["9M"];
		delete this.species.getLearnsetData('dewpider').learnset.bite;
		// Araquanid
		this.species.getLearnsetData('araquanid').learnset.acidarmor = ["9D"];
		this.species.getLearnsetData('araquanid').learnset.leechlife = ["9L13"];
		this.species.getLearnsetData('araquanid').learnset.bugbite = ["9L21","9M"];
		this.species.getLearnsetData('araquanid').learnset.vitaldrain = ["9L33","9M"];
		this.species.getLearnsetData('araquanid').learnset.dive = ["9L38","9M"];
		this.species.getLearnsetData('araquanid').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('araquanid').learnset.stringshot = ["9M"];
		delete this.species.getLearnsetData('araquanid').learnset.bite;
		// Fomantis
		this.species.getLearnsetData('fomantis').learnset.copycat = ["9D"];
		this.species.getLearnsetData('fomantis').learnset.naturalgift = ["9M"];
		this.species.getLearnsetData('fomantis').learnset.retaliate = ["9M"];
		this.species.getLearnsetData('fomantis').learnset.vitaldrain = ["9M"];
		delete this.species.getLearnsetData('fomantis').learnset.leechlife;
		delete this.species.getLearnsetData('fomantis').learnset.defog;
		// Lurantis
		this.species.getLearnsetData('lurantis').learnset.copycat = ["9D"];
		this.species.getLearnsetData('lurantis').learnset.naturalgift = ["9M"];
		this.species.getLearnsetData('lurantis').learnset.retaliate = ["9M"];
		this.species.getLearnsetData('lurantis').learnset.vitaldrain = ["9M"];
		delete this.species.getLearnsetData('lurantis').learnset.leechlife;
		// Morelull
		this.species.getLearnsetData('morelull').learnset.magicpowder = ["9D"];
		this.species.getLearnsetData('morelull').learnset.flash = ["9L1", "9M"];
		this.species.getLearnsetData('morelull').learnset.naturalgift = ["9M"];
		this.species.getLearnsetData('morelull').learnset.nightmare = ["9M"];
		// Shiinotic
		this.species.getLearnsetData('shiinotic').learnset.magicpowder = ["9D"];
		this.species.getLearnsetData('shiinotic').learnset.flash = ["9L1", "9M"];
		this.species.getLearnsetData('shiinotic').learnset.naturalgift = ["9M"];
		this.species.getLearnsetData('shiinotic').learnset.nightmare = ["9M"];
		// Salandit
		this.species.getLearnsetData('salandit').learnset.firelash = ["9D"];
		this.species.getLearnsetData('salandit').learnset.toxic = ["9L29","9M"];
		this.species.getLearnsetData('salandit').learnset.flash = ["9M"];
		delete this.species.getLearnsetData('salandit').learnset.leechlife;
		// Salazzle
		this.species.getLearnsetData('salazzle').learnset.firelash = ["9D"];
		this.species.getLearnsetData('salazzle').learnset.toxic = ["9L29","9M"];
		this.species.getLearnsetData('salazzle').learnset.flash = ["9M"];
		delete this.species.getLearnsetData('salazzle').learnset.leechlife;
		// Stufful
		this.species.getLearnsetData('stufful').learnset.focuspunch = ["9D"];
		this.species.getLearnsetData('stufful').learnset.megapunch = ["9E"];
		delete this.species.getLearnsetData('stufful').learnset.earthquake;
		// Bewear
		this.species.getLearnsetData('bewear').learnset.focuspunch = ["9D"];
		// Bounsweet
		this.species.getLearnsetData('bounsweet').learnset.followme = ["9D"];
		this.species.getLearnsetData('bounsweet').learnset.naturalgift = ["9M"];
		delete this.species.getLearnsetData('bounsweet').learnset.bounce;
		// Steenee
		this.species.getLearnsetData('steenee').learnset.followme = ["9D"];
		this.species.getLearnsetData('steenee').learnset.naturalgift = ["9M"];
		delete this.species.getLearnsetData('steenee').learnset.bounce;
		// Tsareena
		this.species.getLearnsetData('tsareena').learnset.followme = ["9D"];
		this.species.getLearnsetData('tsareena').learnset.naturalgift = ["9M"];
		delete this.species.getLearnsetData('tsareena').learnset.bounce;
		// Comfey
		this.species.getLearnsetData('comfey').learnset.aromaticmist = ["9D"];
		delete this.species.getLearnsetData('comfey').learnset.defog;
		// Oranguru
		this.species.getLearnsetData('oranguru').learnset.aerate = ["9D"];
		this.species.getLearnsetData('oranguru').learnset.naturalgift = ["9M"];
		delete this.species.getLearnsetData('oranguru').learnset.thunder;
		// Passimian
		this.species.getLearnsetData('passimian').learnset.barrage = ["9D"];
		this.species.getLearnsetData('passimian').learnset.courtchange = ["9E"];
		this.species.getLearnsetData('passimian').learnset.strength = ["9M"];
		// Wimpod
		this.species.getLearnsetData('wimpod').learnset.holdback = ["9D"];
		this.species.getLearnsetData('wimpod').learnset.vitaldrain = ["9M"];
		delete this.species.getLearnsetData('wimpod').learnset.leechlife;
		// Golisopod
		this.species.getLearnsetData('golisopod').learnset.holdback = ["9D"];
		this.species.getLearnsetData('golisopod').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('golisopod').learnset.strength = ["9M"];
		this.species.getLearnsetData('golisopod').learnset.trailhead = ["9M"];
		this.species.getLearnsetData('golisopod').learnset.vitaldrain = ["9M"];
		delete this.species.getLearnsetData('golisopod').learnset.leechlife;
		// Sandygast
		this.species.getLearnsetData('sandygast').learnset.imprison = ["9D"];
		this.species.getLearnsetData('sandygast').learnset.nightmare = ["9M"];
		// Palossand
		this.species.getLearnsetData('palossand').learnset.imprison = ["9D"];
		this.species.getLearnsetData('palossand').learnset.nightmare = ["9M"];
		// Pyukumuku
		this.species.getLearnsetData('pyukumuku').learnset.slipaway = ["9D"];
		this.species.getLearnsetData('pyukumuku').learnset.toxic = ["9M"];
		delete this.species.getLearnsetData('pyukumuku').learnset.quash;
		// Type: Null
		this.species.getLearnsetData('typenull').learnset.trumpcard = ["9D"];
		this.species.getLearnsetData('typenull').learnset.honeclaws = ["9M"];
		this.species.getLearnsetData('typenull').learnset.retaliate = ["9M"];
		this.species.getLearnsetData('typenull').learnset.strength = ["9M"];
		delete this.species.getLearnsetData('typenull').learnset.uturn;
		// Silvally
		this.species.getLearnsetData('silvally').learnset.trumpcard = ["9D"];
		this.species.getLearnsetData('silvally').learnset.flash = ["9M"];
		this.species.getLearnsetData('silvally').learnset.honeclaws = ["9M"];
		this.species.getLearnsetData('silvally').learnset.retaliate = ["9M"];
		this.species.getLearnsetData('silvally').learnset.strength = ["9M"];
		delete this.species.getLearnsetData('silvally').learnset.firepledge;
		delete this.species.getLearnsetData('silvally').learnset.grasspledge;
		delete this.species.getLearnsetData('silvally').learnset.uturn;
		delete this.species.getLearnsetData('silvally').learnset.waterpledge;
		// Minior
		this.species.getLearnsetData('minior').learnset.accelerock = ["9D"];
		this.species.getLearnsetData('minior').learnset.flash = ["9M"];
		this.species.getLearnsetData('minior').learnset.fullcollide = ["9M"];
		this.species.getLearnsetData('minior').learnset.meteorbeam = ["9T"];
		delete this.species.getLearnsetData('minior').learnset.attract;
		// Komala
		this.species.getLearnsetData('komala').learnset.playdead = ["9D"];
		this.species.getLearnsetData('komala').learnset.amnesia = ["9M"];
		delete this.species.getLearnsetData('komala').learnset.quash;
		// Turtonator
		this.species.getLearnsetData('turtonator').learnset.blastburn = ["9D"];
		this.species.getLearnsetData('turtonator').learnset.flash = ["9M"];
		this.species.getLearnsetData('turtonator').learnset.fullcollide = ["9M"];
		this.species.getLearnsetData('turtonator').learnset.strength = ["9M"];
		// Togedemaru
		this.species.getLearnsetData('togedemaru').learnset.paraboliccharge = ["9D"];
		this.species.getLearnsetData('togedemaru').learnset.flash = ["9M"];
		delete this.species.getLearnsetData('togedemaru').learnset.bounce;
		// Mimikyu
		this.species.getLearnsetData('mimikyu').learnset.woodhammer = ["9D"];
		this.species.getLearnsetData('mimikyu').learnset.swing = ["9L1"];
		delete this.species.getLearnsetData('mimikyu').learnset.thunder;
		// Bruxish
		this.species.getLearnsetData('bruxish').learnset.hypnosis = ["9D"];
		this.species.getLearnsetData('bruxish').learnset.whitewater = ["9L1"];
		this.species.getLearnsetData('bruxish').learnset.mindbend = ["9L9"];
		this.species.getLearnsetData('bruxish').learnset.brine = ["9M"];
		this.species.getLearnsetData('bruxish').learnset.flash = ["9M"];
		this.species.getLearnsetData('bruxish').learnset.futuresight = ["9M"];
		this.species.getLearnsetData('bruxish').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('bruxish').learnset.whirlpool = ["9M"];
		delete this.species.getLearnsetData('bruxish').learnset.confusion;
		delete this.species.getLearnsetData('bruxish').learnset.watergun;
		// Drampa
		this.species.getLearnsetData('drampa').learnset.rage = ["9D"];
		this.species.getLearnsetData('drampa').learnset.fellswoop = ["9E"];
		this.species.getLearnsetData('drampa').learnset.strength = ["9M"];
		// Dhelmise
		this.species.getLearnsetData('dhelmise').learnset.wringout = ["9D"];
		this.species.getLearnsetData('dhelmise').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('dhelmise').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('dhelmise').learnset.strength = ["9M"];
		delete this.species.getLearnsetData('dhelmise').learnset.attract;
		// Jangmo-o
		this.species.getLearnsetData('jangmoo').learnset.metalsound = ["9D"];
		this.species.getLearnsetData('jangmoo').learnset.flash = ["9M"];
		this.species.getLearnsetData('jangmoo').learnset.fullcollide = ["9M"];
		this.species.getLearnsetData('jangmoo').learnset.strength = ["9M"];
		this.species.getLearnsetData('jangmoo').learnset.trailhead = ["9M"];
		this.species.getLearnsetData('jangmoo').learnset.rockclimb = ["9E"];
		delete this.species.getLearnsetData('jangmoo').learnset.earthquake;
		// Hakamo-o
		this.species.getLearnsetData('hakamoo').learnset.dizzypunch = ["9D"];
		this.species.getLearnsetData('hakamoo').learnset.flash = ["9M"];
		this.species.getLearnsetData('hakamoo').learnset.fullcollide = ["9M"];
		this.species.getLearnsetData('hakamoo').learnset.retaliate = ["9M"];
		this.species.getLearnsetData('hakamoo').learnset.strength = ["9M"];
		this.species.getLearnsetData('hakamoo').learnset.trailhead = ["9M"];
		delete this.species.getLearnsetData('hakamoo').learnset.earthquake;
		// Kommo-o
		this.species.getLearnsetData('kommoo').learnset.dizzypunch = ["9D"];
		this.species.getLearnsetData('kommoo').learnset.flash = ["9M"];
		this.species.getLearnsetData('kommoo').learnset.fullcollide = ["9M"];
		this.species.getLearnsetData('kommoo').learnset.retaliate = ["9M"];
		this.species.getLearnsetData('kommoo').learnset.strength = ["9M"];
		this.species.getLearnsetData('kommoo').learnset.trailhead = ["9M"];
		// Tapu Koko
		this.species.getLearnsetData('tapukoko').learnset.aeroblast = ["9D"];
		this.species.getLearnsetData('tapukoko').learnset.flash = ["9M"];
		this.species.getLearnsetData('tapukoko').learnset.fullcollide = ["9M"];
		this.species.getLearnsetData('tapukoko').learnset.naturalgift = ["9M"];
		this.species.getLearnsetData('tapukoko').learnset.retaliate = ["9M"];
		this.species.getLearnsetData('tapukoko').learnset.strength = ["9M"];
		// Tapu Lele
		this.species.getLearnsetData('tapulele').learnset.lunardance = ["9D"];
		this.species.getLearnsetData('tapulele').learnset.flash = ["9M"];
		this.species.getLearnsetData('tapulele').learnset.fullcollide = ["9M"];
		this.species.getLearnsetData('tapulele').learnset.naturalgift = ["9M"];
		this.species.getLearnsetData('tapulele').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('tapulele').learnset.retaliate = ["9M"];
		// Tapu Bulu
		this.species.getLearnsetData('tapubulu').learnset.landswrath = ["9D"];
		this.species.getLearnsetData('tapubulu').learnset.avalanche = ["9M"];
		this.species.getLearnsetData('tapubulu').learnset.fullcollide = ["9M"];
		this.species.getLearnsetData('tapubulu').learnset.naturalgift = ["9M"];
		this.species.getLearnsetData('tapubulu').learnset.retaliate = ["9M"];
		this.species.getLearnsetData('tapubulu').learnset.strength = ["9M"];
		this.species.getLearnsetData('tapubulu').learnset.trailhead = ["9M"];
		// Tapu Fini
		this.species.getLearnsetData('tapufini').learnset.originpulse = ["9D"];
		this.species.getLearnsetData('tapufini').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('tapufini').learnset.dive = ["9M"];
		this.species.getLearnsetData('tapufini').learnset.fullcollide = ["9M"];
		this.species.getLearnsetData('tapufini').learnset.futuresight = ["9M"];
		this.species.getLearnsetData('tapufini').learnset.naturalgift = ["9M"];
		this.species.getLearnsetData('tapufini').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('tapufini').learnset.retaliate = ["9M"];
		delete this.species.getLearnsetData('tapufini').learnset.knockoff;
		// Solgaleo
		this.species.getLearnsetData('solgaleo').learnset.miracleeye = ["9D"];
		this.species.getLearnsetData('solgaleo').learnset.mindbend = ["9L1"];
		this.species.getLearnsetData('solgaleo').learnset.metalclaw = ["9L7"];
		this.species.getLearnsetData('solgaleo').learnset.ironhead = ["9L23", "9M"];
		this.species.getLearnsetData('solgaleo').learnset.flash = ["9M"];
		this.species.getLearnsetData('solgaleo').learnset.flashcannon = ["9M"];
		this.species.getLearnsetData('solgaleo').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('solgaleo').learnset.strength = ["9M"];
		this.species.getLearnsetData('solgaleo').learnset.trailhead = ["9M"];
		// Lunala
		this.species.getLearnsetData('lunala').learnset.miracleeye = ["9D"];
		this.species.getLearnsetData('lunala').learnset.psychic = ["9L19", "9M"];
		this.species.getLearnsetData('lunala').learnset.doubleteam = ["9L59"];
		this.species.getLearnsetData('lunala').learnset.dreameater = ["9L61", "9M"];
		this.species.getLearnsetData('lunala').learnset.flash = ["9M"];
		this.species.getLearnsetData('lunala').learnset.nightmare = ["9M"];
		delete this.species.getLearnsetData('lunala').learnset.airslash;
		// Nihilego
		this.species.getLearnsetData('nihilego').learnset.acidarmor = ["9D"];
		this.species.getLearnsetData('nihilego').learnset.bind = ["9L1"];
		this.species.getLearnsetData('nihilego').learnset.dive = ["9M"];
		this.species.getLearnsetData('nihilego').learnset.flash = ["9M"];
		this.species.getLearnsetData('nihilego').learnset.meteorbeam = ["9M"];
		this.species.getLearnsetData('nihilego').learnset.toxic = ["9M"];
		delete this.species.getLearnsetData('nihilego').learnset.pound;
		// Buzzwole
		this.species.getLearnsetData('buzzwole').learnset.skyuppercut = ["9D"];
		this.species.getLearnsetData('buzzwole').learnset.bodypress = ["9M"];
		this.species.getLearnsetData('buzzwole').learnset.strength = ["9M"];
		this.species.getLearnsetData('buzzwole').learnset.trailhead = ["9M"];
		// Pheromosa
		this.species.getLearnsetData('pheromosa').learnset.playdead = ["9D"];
		this.species.getLearnsetData('pheromosa').learnset.faketears = ["9M"];
		this.species.getLearnsetData('pheromosa').learnset.trailhead = ["9M"];
		// Xurkitree
		this.species.getLearnsetData('xurkitree').learnset.paraboliccharge = ["9D"];
		this.species.getLearnsetData('xurkitree').learnset.flash = ["9M"];
		// Celesteela
		this.species.getLearnsetData('celesteela').learnset.heatcrash = ["9D"];
		this.species.getLearnsetData('celesteela').learnset.bash = ["9L1"];
		this.species.getLearnsetData('celesteela').learnset.bodypress = ["9M"];
		this.species.getLearnsetData('celesteela').learnset.flash = ["9M"];
		delete this.species.getLearnsetData('celesteela').learnset.tackle;
		// Kartana
		this.species.getLearnsetData('kartana').learnset.sharpen = ["9D"];
		this.species.getLearnsetData('kartana').learnset.metaledge = ["9L1"];
		this.species.getLearnsetData('kartana').learnset.retaliate = ["9M"];
		delete this.species.getLearnsetData('kartana').learnset.defog;
		delete this.species.getLearnsetData('kartana').learnset.knockoff;
		// Guzzlord
		this.species.getLearnsetData('guzzlord').learnset.dragonbreath = ["9D"];
		this.species.getLearnsetData('guzzlord').learnset.avalanche = ["9M"];
		this.species.getLearnsetData('guzzlord').learnset.breakingswipe = ["9M"];
		this.species.getLearnsetData('guzzlord').learnset.compensation = ["9M"];
		this.species.getLearnsetData('guzzlord').learnset.hex = ["9M"];
		this.species.getLearnsetData('guzzlord').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('guzzlord').learnset.strength = ["9M"];
		// Necrozma
		this.species.getLearnsetData('necrozma').learnset.midnight = ["9D"];
		this.species.getLearnsetData('necrozma').learnset.mindbend = ["9L1"];
		this.species.getLearnsetData('necrozma').learnset.rockblast = ["9L7"];
		this.species.getLearnsetData('necrozma').learnset.stealthrock = ["9L13", "9M"];
		this.species.getLearnsetData('necrozma').learnset.psychocut = ["9L19"];
		this.species.getLearnsetData('necrozma').learnset.storedpower = ["9L23"];
		this.species.getLearnsetData('necrozma').learnset.nightslash = ["9L37"];
		this.species.getLearnsetData('necrozma').learnset.autotomize = ["9L43"];
		this.species.getLearnsetData('necrozma').learnset.powergem = ["9L47", "9M"];
		this.species.getLearnsetData('necrozma').learnset.photongeyser = ["9L53"];
		this.species.getLearnsetData('necrozma').learnset.flash = ["9M"];
		this.species.getLearnsetData('necrozma').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('necrozma').learnset.painsplit = ["9M"];
		delete this.species.getLearnsetData('necrozma').learnset.slash;
		// Necrozma Dusk Mane
		this.species.getLearnsetData('necrozmaduskmane').learnset.flareblitz = ["9D"];
		this.species.getLearnsetData('necrozmaduskmane').learnset.mindbend = ["9L1"];
		this.species.getLearnsetData('necrozmaduskmane').learnset.rockblast = ["9L7"];
		this.species.getLearnsetData('necrozmaduskmane').learnset.stealthrock = ["9L13", "9M"];
		this.species.getLearnsetData('necrozmaduskmane').learnset.psychocut = ["9L19"];
		this.species.getLearnsetData('necrozmaduskmane').learnset.storedpower = ["9L23"];
		this.species.getLearnsetData('necrozmaduskmane').learnset.nightslash = ["9L23"];
		this.species.getLearnsetData('necrozmaduskmane').learnset.autotomize = ["9L43"];
		this.species.getLearnsetData('necrozmaduskmane').learnset.powergem = ["9L47"];
		this.species.getLearnsetData('necrozmaduskmane').learnset.photongeyser = ["9L53"];
		this.species.getLearnsetData('necrozmaduskmane').learnset.flash = ["9M"];
		this.species.getLearnsetData('necrozmaduskmane').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('necrozmaduskmane').learnset.painsplit = ["9M"];
		this.species.getLearnsetData('necrozmaduskmane').learnset.strength = ["9M"];
		this.species.getLearnsetData('necrozmaduskmane').learnset.trailhead = ["9M"];
		delete this.species.getLearnsetData('necrozmaduskmane').learnset.slash;
		// Necrozma Dawn Wings
		this.species.getLearnsetData('necrozmadawnwings').learnset.moonblast = ["9D"];
		this.species.getLearnsetData('necrozmadawnwings').learnset.mindbend = ["9L1"];
		this.species.getLearnsetData('necrozmadawnwings').learnset.rockblast = ["9L7"];
		this.species.getLearnsetData('necrozmadawnwings').learnset.stealthrock = ["9L13", "9M"];
		this.species.getLearnsetData('necrozmadawnwings').learnset.psychocut = ["9L19"];
		this.species.getLearnsetData('necrozmadawnwings').learnset.storedpower = ["9L23"];
		this.species.getLearnsetData('necrozmadawnwings').learnset.nightslash = ["9L23"];
		this.species.getLearnsetData('necrozmadawnwings').learnset.autotomize = ["9L43"];
		this.species.getLearnsetData('necrozmadawnwings').learnset.powergem = ["9L47"];
		this.species.getLearnsetData('necrozmadawnwings').learnset.photongeyser = ["9L53"];
		this.species.getLearnsetData('necrozmadawnwings').learnset.flash = ["9M"];
		this.species.getLearnsetData('necrozmadawnwings').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('necrozmadawnwings').learnset.painsplit = ["9M"];
		delete this.species.getLearnsetData('necrozmadawnwings').learnset.slash;
		// Magearna
		this.species.getLearnsetData('magearna').learnset.teeterdance = ["9D"];
		this.species.getLearnsetData('magearna').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('magearna').learnset.flash = ["9M"];
		// Magearna Original
		this.species.getLearnsetData('magearnaoriginal').learnset = this.species.getLearnsetData('magearna').learnset;
		// Marshadow
		this.species.getLearnsetData('marshadow').learnset.mimic = ["9D"];
		this.species.getLearnsetData('marshadow').learnset.strength = ["9M"];
		// Poipole
		this.species.getLearnsetData('poipole').learnset.toxicthread = ["9D"];
		this.species.getLearnsetData('poipole').learnset.toxic = ["9L41","9M"];
		this.species.getLearnsetData('poipole').learnset.nightmare = ["9M"];
		// Naganadel
		this.species.getLearnsetData('naganadel').learnset.toxicthread = ["9D"];
		this.species.getLearnsetData('naganadel').learnset.toxic = ["9L41","9M"];
		this.species.getLearnsetData('naganadel').learnset.nightmare = ["9M"];
		// Stakataka
		this.species.getLearnsetData('stakataka').learnset.minimize = ["9D"];
		this.species.getLearnsetData('stakataka').learnset.bash = ["9L1"];
		this.species.getLearnsetData('stakataka').learnset.strength = ["9M"];
		delete this.species.getLearnsetData('stakataka').learnset.tackle;
		// Blacephalon
		this.species.getLearnsetData('blacephalon').learnset.teeterdance = ["9D"];
		this.species.getLearnsetData('blacephalon').learnset.flash = ["9M"];
		this.species.getLearnsetData('blacephalon').learnset.metronome = ["9M"];
		this.species.getLearnsetData('blacephalon').learnset.nightmare = ["9M"];
		delete this.species.getLearnsetData('blacephalon').learnset.quash;
		// Zeraora
		this.species.getLearnsetData('zeraora').learnset.aurasphere = ["9D"];
		this.species.getLearnsetData('zeraora').learnset.flash = ["9M"];
		this.species.getLearnsetData('zeraora').learnset.retaliate = ["9M"];
		this.species.getLearnsetData('zeraora').learnset.strength = ["9M"];
		this.species.getLearnsetData('zeraora').learnset.trailhead = ["9M"];
		// Meltan
		this.species.getLearnsetData('meltan').learnset.charge = ["9D"];
		this.species.getLearnsetData('meltan').learnset.bash = ["9L8"];
		this.species.getLearnsetData('meltan').learnset.chargebeam = ["9M"];
		this.species.getLearnsetData('meltan').learnset.eerieimpulse = ["9M"];
		this.species.getLearnsetData('meltan').learnset.flash = ["9M"];
		this.species.getLearnsetData('meltan').learnset.magiccoat = ["9M"];
		this.species.getLearnsetData('meltan').learnset.recycle = ["9M"];
		this.species.getLearnsetData('meltan').learnset.shockwave = ["9M"];
		delete this.species.getLearnsetData('meltan').learnset.tailwhip;
		// Melmetal
		this.species.getLearnsetData('melmetal').learnset.charge = ["9D"];
		this.species.getLearnsetData('melmetal').learnset.bash = ["9L8"];
		this.species.getLearnsetData('melmetal').learnset.avalanche = ["9M"];
		this.species.getLearnsetData('melmetal').learnset.chargebeam = ["9M"];
		this.species.getLearnsetData('melmetal').learnset.eerieimpulse = ["9M"];
		this.species.getLearnsetData('melmetal').learnset.flash = ["9M"];
		this.species.getLearnsetData('melmetal').learnset.gravity = ["9M"];
		this.species.getLearnsetData('melmetal').learnset.magiccoat = ["9M"];
		this.species.getLearnsetData('melmetal').learnset.recycle = ["9M"];
		this.species.getLearnsetData('melmetal').learnset.shockwave = ["9M"];
		this.species.getLearnsetData('melmetal').learnset.strength = ["9M"];
		delete this.species.getLearnsetData('melmetal').learnset.tailwhip;
		// Grookey
		this.species.getLearnsetData('grookey').learnset.dizzypunch = ["9D"];
		this.species.getLearnsetData('grookey').learnset.chipaway = ["9M"];
		this.species.getLearnsetData('grookey').learnset.echoedvoice = ["9M"];
		this.species.getLearnsetData('grookey').learnset.naturalgift = ["9M"];
		this.species.getLearnsetData('grookey').learnset.naturepower = ["9M"];
		this.species.getLearnsetData('grookey').learnset.rocksmash = ["9M"];
		this.species.getLearnsetData('grookey').learnset.strength = ["9M"];
		// Thwackey
		this.species.getLearnsetData('thwackey').learnset.dizzypunch = ["9D"];
		this.species.getLearnsetData('thwackey').learnset.chipaway = ["9M"];
		this.species.getLearnsetData('thwackey').learnset.dualchop = ["9M"];
		this.species.getLearnsetData('thwackey').learnset.echoedvoice = ["9M"];
		this.species.getLearnsetData('thwackey').learnset.naturalgift = ["9M"];
		this.species.getLearnsetData('thwackey').learnset.naturepower = ["9M"];
		this.species.getLearnsetData('thwackey').learnset.rocksmash = ["9M"];
		this.species.getLearnsetData('thwackey').learnset.strength = ["9M"];
		// Rillaboom
		this.species.getLearnsetData('rillaboom').learnset.dizzypunch = ["9D"];
		this.species.getLearnsetData('rillaboom').learnset.chipaway = ["9M"];
		this.species.getLearnsetData('rillaboom').learnset.dualchop = ["9M"];
		this.species.getLearnsetData('rillaboom').learnset.echoedvoice = ["9M"];
		this.species.getLearnsetData('rillaboom').learnset.naturalgift = ["9M"];
		this.species.getLearnsetData('rillaboom').learnset.naturepower = ["9M"];
		this.species.getLearnsetData('rillaboom').learnset.rocksmash = ["9M"];
		this.species.getLearnsetData('rillaboom').learnset.strength = ["9M"];
		// Scorbunny
		this.species.getLearnsetData('scorbunny').learnset.detect = ["9D"];
		this.species.getLearnsetData('scorbunny').learnset.afteryou = ["9M"];
		this.species.getLearnsetData('scorbunny').learnset.blazekick = ["9E"];
		this.species.getLearnsetData('scorbunny').learnset.echoedvoice = ["9M"];
		this.species.getLearnsetData('scorbunny').learnset.endeavor = ["9M"];
		this.species.getLearnsetData('scorbunny').learnset.incinerate = ["9M"];
		this.species.getLearnsetData('scorbunny').learnset.lastresort = ["9M"];
		this.species.getLearnsetData('scorbunny').learnset.naturepower = ["9M"];
		this.species.getLearnsetData('scorbunny').learnset.rocksmash = ["9M"];
		this.species.getLearnsetData('scorbunny').learnset.roleplay = ["9M"];
		// Raboot
		this.species.getLearnsetData('raboot').learnset.detect = ["9D"];
		this.species.getLearnsetData('raboot').learnset.afteryou = ["9M"];
		this.species.getLearnsetData('raboot').learnset.echoedvoice = ["9M"];
		this.species.getLearnsetData('raboot').learnset.endeavor = ["9M"];
		this.species.getLearnsetData('raboot').learnset.incinerate = ["9M"];
		this.species.getLearnsetData('raboot').learnset.laserfocus = ["9M"];
		this.species.getLearnsetData('raboot').learnset.lastresort = ["9M"];
		this.species.getLearnsetData('raboot').learnset.naturepower = ["9M"];
		this.species.getLearnsetData('raboot').learnset.rocksmash = ["9M"];
		this.species.getLearnsetData('raboot').learnset.roleplay = ["9M"];
		// Cinderace
		this.species.getLearnsetData('cinderace').learnset.detect = ["9D"];
		this.species.getLearnsetData('cinderace').learnset.afteryou = ["9M"];
		this.species.getLearnsetData('cinderace').learnset.echoedvoice = ["9M"];
		this.species.getLearnsetData('cinderace').learnset.endeavor = ["9M"];
		this.species.getLearnsetData('cinderace').learnset.incinerate = ["9M"];
		this.species.getLearnsetData('cinderace').learnset.laserfocus = ["9M"];
		this.species.getLearnsetData('cinderace').learnset.lastresort = ["9M"];
		this.species.getLearnsetData('cinderace').learnset.naturepower = ["9M"];
		this.species.getLearnsetData('cinderace').learnset.rocksmash = ["9M"];
		this.species.getLearnsetData('cinderace').learnset.roleplay = ["9M"];
		this.species.getLearnsetData('cinderace').learnset.smackdown = ["9M"];
		// Sobble
		this.species.getLearnsetData('sobble').learnset.flail = ["9D"];
		this.species.getLearnsetData('sobble').learnset.aquatail = ["9L28", "9M"];
		this.species.getLearnsetData('sobble').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('sobble').learnset.dragontail = ["9M"];
		this.species.getLearnsetData('sobble').learnset.faketears = ["9M"];
		this.species.getLearnsetData('sobble').learnset.lastresort = ["9M"];
		this.species.getLearnsetData('sobble').learnset.waterpulse = ["9M"];
		delete this.species.getLearnsetData('sobble').learnset.fellstinger;
		delete this.species.getLearnsetData('sobble').learnset.liquidation;
		// Drizzile
		this.species.getLearnsetData('drizzile').learnset.trumpcard = ["9D"];
		this.species.getLearnsetData('drizzile').learnset.aquatail = ["9L36", "9M"];
		this.species.getLearnsetData('drizzile').learnset.ambush = ["9L54"];
		this.species.getLearnsetData('drizzile').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('drizzile').learnset.dragontail = ["9M"];
		this.species.getLearnsetData('drizzile').learnset.faketears = ["9M"];
		this.species.getLearnsetData('drizzile').learnset.lastresort = ["9M"];
		this.species.getLearnsetData('drizzile').learnset.recycle = ["9M"];
		this.species.getLearnsetData('drizzile').learnset.roleplay = ["9M"];
		this.species.getLearnsetData('drizzile').learnset.snatch = ["9M"];
		this.species.getLearnsetData('drizzile').learnset.stringshot = ["9M"];
		this.species.getLearnsetData('drizzile').learnset.waterpulse = ["9M"];
		delete this.species.getLearnsetData('drizzile').learnset.liquidation;
		// Inteleon
		this.species.getLearnsetData('inteleon').learnset.trumpcard = ["9D"];
		this.species.getLearnsetData('inteleon').learnset.aquatail = ["9L38", "9M"];
		this.species.getLearnsetData('inteleon').learnset.ambush = ["9L62"];
		this.species.getLearnsetData('inteleon').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('inteleon').learnset.dragontail = ["9M"];
		this.species.getLearnsetData('inteleon').learnset.faketears = ["9M"];
		this.species.getLearnsetData('inteleon').learnset.hydropump = ["9M"];
		this.species.getLearnsetData('inteleon').learnset.laserfocus = ["9M"];
		this.species.getLearnsetData('inteleon').learnset.lastresort = ["9M"];
		this.species.getLearnsetData('inteleon').learnset.recycle = ["9M"];
		this.species.getLearnsetData('inteleon').learnset.roleplay = ["9M"];
		this.species.getLearnsetData('inteleon').learnset.smackdown = ["9M"];
		this.species.getLearnsetData('inteleon').learnset.snatch = ["9M"];
		this.species.getLearnsetData('inteleon').learnset.stringshot = ["9M"];
		this.species.getLearnsetData('inteleon').learnset.waterpulse = ["9M"];
		delete this.species.getLearnsetData('inteleon').learnset.liquidation;
		delete this.species.getLearnsetData('inteleon').learnset.metronome;
		// Skwovet
		this.species.getLearnsetData('skwovet').learnset.bide = ["9D"];
		this.species.getLearnsetData('skwovet').learnset.aquatail = ["9M"];
		this.species.getLearnsetData('skwovet').learnset.echoedvoice = ["9M"];
		this.species.getLearnsetData('skwovet').learnset.naturalgift = ["9M"];
		this.species.getLearnsetData('skwovet').learnset.recycle = ["9M"];
		this.species.getLearnsetData('skwovet').learnset.snatch = ["9M"];
		this.species.getLearnsetData('skwovet').learnset.strength = ["9M"];
		// Greedent
		this.species.getLearnsetData('greedent').learnset.bide = ["9D"];
		this.species.getLearnsetData('greedent').learnset.aquatail = ["9M"];
		this.species.getLearnsetData('greedent').learnset.echoedvoice = ["9M"];
		this.species.getLearnsetData('greedent').learnset.naturalgift = ["9M"];
		this.species.getLearnsetData('greedent').learnset.recycle = ["9M"];
		this.species.getLearnsetData('greedent').learnset.snatch = ["9M"];
		this.species.getLearnsetData('greedent').learnset.strength = ["9M"];
		delete this.species.getLearnsetData('greedent').learnset.earthquake;
		// Rookidee
		this.species.getLearnsetData('rookidee').learnset.detect = ["9D"];
		this.species.getLearnsetData('rookidee').learnset.aerialace = ["9M"];
		this.species.getLearnsetData('rookidee').learnset.echoedvoice = ["9M"];
		this.species.getLearnsetData('rookidee').learnset.tailwind = ["9M"];
		// Corvisquire
		this.species.getLearnsetData('corvisquire').learnset.detect = ["9D"];
		this.species.getLearnsetData('corvisquire').learnset.aerialace = ["9M"];
		this.species.getLearnsetData('corvisquire').learnset.chipaway = ["9M"];
		this.species.getLearnsetData('corvisquire').learnset.echoedvoice = ["9M"];
		this.species.getLearnsetData('corvisquire').learnset.honeclaws = ["9M"];
		this.species.getLearnsetData('corvisquire').learnset.tailwind = ["9M"];
		// Corviknight
		this.species.getLearnsetData('corviknight').learnset.detect = ["9D"];
		this.species.getLearnsetData('corviknight').learnset.skydrop = ["9L1"];
		this.species.getLearnsetData('corviknight').learnset.aerialace = ["9M"];
		this.species.getLearnsetData('corviknight').learnset.chipaway = ["9M"];
		this.species.getLearnsetData('corviknight').learnset.echoedvoice = ["9M"];
		this.species.getLearnsetData('corviknight').learnset.flash = ["9M"];
		this.species.getLearnsetData('corviknight').learnset.fullcollide = ["9M"];
		this.species.getLearnsetData('corviknight').learnset.honeclaws = ["9M"];
		this.species.getLearnsetData('corviknight').learnset.laserfocus = ["9M"];
		this.species.getLearnsetData('corviknight').learnset.magiccoat = ["9M"];
		this.species.getLearnsetData('corviknight').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('corviknight').learnset.painsplit = ["9M"];
		this.species.getLearnsetData('corviknight').learnset.quash = ["9M"];
		this.species.getLearnsetData('corviknight').learnset.rockpolish = ["9M"];
		this.species.getLearnsetData('corviknight').learnset.tailwind = ["9M"];
		// Dottler
		this.species.getLearnsetData('dottler').learnset.mindreader = ["9D"];
		this.species.getLearnsetData('dottler').learnset.bugbite = ["9M"];
		this.species.getLearnsetData('dottler').learnset.flash = ["9M"];
		this.species.getLearnsetData('dottler').learnset.gravity = ["9M"];
		this.species.getLearnsetData('dottler').learnset.magiccoat = ["9M"];
		this.species.getLearnsetData('dottler').learnset.psychup = ["9M"];
		this.species.getLearnsetData('dottler').learnset.signalbeam = ["9M"];
		this.species.getLearnsetData('dottler').learnset.telekinesis = ["9M"];
		this.species.getLearnsetData('dottler').learnset.vitaldrain = ["9M"];
		delete this.species.getLearnsetData('dottler').learnset.leechlife;
		// Orbeetle
		this.species.getLearnsetData('orbeetle').learnset.skydrop = ["9D"];
		this.species.getLearnsetData('orbeetle').learnset.bugbite = ["9M"];
		this.species.getLearnsetData('orbeetle').learnset.dreameater = ["9M"];
		this.species.getLearnsetData('orbeetle').learnset.flash = ["9M"];
		this.species.getLearnsetData('orbeetle').learnset.gravity = ["9M"];
		this.species.getLearnsetData('orbeetle').learnset.magiccoat = ["9M"];
		this.species.getLearnsetData('orbeetle').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('orbeetle').learnset.psychup = ["9M"];
		this.species.getLearnsetData('orbeetle').learnset.roleplay = ["9M"];
		this.species.getLearnsetData('orbeetle').learnset.signalbeam = ["9M"];
		this.species.getLearnsetData('orbeetle').learnset.telekinesis = ["9M"];
		this.species.getLearnsetData('orbeetle').learnset.vitaldrain = ["9M"];
		delete this.species.getLearnsetData('orbeetle').learnset.leechlife;
		// Nickit
		this.species.getLearnsetData('nickit').learnset.stockpile = ["9D"];
		this.species.getLearnsetData('nickit').learnset.odorsleuth = ["9L1"];
		this.species.getLearnsetData('nickit').learnset.feintattack = ["9L16"];
		this.species.getLearnsetData('nickit').learnset.aerialace = ["9M"];
		this.species.getLearnsetData('nickit').learnset.aquatail = ["9M"];
		this.species.getLearnsetData('nickit').learnset.assurance = ["9M"];
		this.species.getLearnsetData('nickit').learnset.echoedvoice = ["9M"];
		this.species.getLearnsetData('nickit').learnset.embargo = ["9M"];
		this.species.getLearnsetData('nickit').learnset.honeclaws = ["9M"];
		this.species.getLearnsetData('nickit').learnset.psychup = ["9M"];
		this.species.getLearnsetData('nickit').learnset.snatch = ["9M"];
		this.species.getLearnsetData('nickit').learnset.spite = ["9M"];
		this.species.getLearnsetData('nickit').learnset.trailhead = ["9M"];
		// Thievul
		this.species.getLearnsetData('thievul').learnset.stockpile = ["9D"];
		this.species.getLearnsetData('thievul').learnset.odorsleuth = ["9L1"];
		this.species.getLearnsetData('thievul').learnset.feintattack = ["9L16"];
		this.species.getLearnsetData('thievul').learnset.aerialace = ["9M"];
		this.species.getLearnsetData('thievul').learnset.aquatail = ["9M"];
		this.species.getLearnsetData('thievul').learnset.assurance = ["9M"];
		this.species.getLearnsetData('thievul').learnset.echoedvoice = ["9M"];
		this.species.getLearnsetData('thievul').learnset.embargo = ["9M"];
		this.species.getLearnsetData('thievul').learnset.honeclaws = ["9M"];
		this.species.getLearnsetData('thievul').learnset.odorsleuth = ["9M"];
		this.species.getLearnsetData('thievul').learnset.psychup = ["9M"];
		this.species.getLearnsetData('thievul').learnset.snatch = ["9M"];
		this.species.getLearnsetData('thievul').learnset.spite = ["9M"];
		this.species.getLearnsetData('thievul').learnset.trailhead = ["9M"];
		// Gossifleur
		this.species.getLearnsetData('gossifleur').learnset.grasswhistle = ["9D"];
		this.species.getLearnsetData('gossifleur').learnset.afteryou = ["9M"];
		this.species.getLearnsetData('gossifleur').learnset.flash = ["9M"];
		this.species.getLearnsetData('gossifleur').learnset.naturalgift = ["9M"];
		this.species.getLearnsetData('gossifleur').learnset.naturepower = ["9M"];
		this.species.getLearnsetData('gossifleur').learnset.roleplay = ["9M"];
		this.species.getLearnsetData('gossifleur').learnset.trailhead = ["9M"];
		// Eldegoss
		this.species.getLearnsetData('eldegoss').learnset.seedflare = ["9D"];
		this.species.getLearnsetData('eldegoss').learnset.afteryou = ["9M"];
		this.species.getLearnsetData('eldegoss').learnset.flash = ["9M"];
		this.species.getLearnsetData('eldegoss').learnset.naturalgift = ["9M"];
		this.species.getLearnsetData('eldegoss').learnset.naturepower = ["9M"];
		this.species.getLearnsetData('eldegoss').learnset.roleplay = ["9M"];
		this.species.getLearnsetData('eldegoss').learnset.trailhead = ["9M"];
		// Wooloo
		this.species.getLearnsetData('wooloo').learnset.magnetbomb = ["9D"];
		this.species.getLearnsetData('wooloo').learnset.echoedvoice = ["9M"];
		this.species.getLearnsetData('wooloo').learnset.naturalgift = ["9M"];
		this.species.getLearnsetData('wooloo').learnset.trailhead = ["9M"];
		// Dubwool
		this.species.getLearnsetData('dubwool').learnset.magnetbomb = ["9D"];
		this.species.getLearnsetData('dubwool').learnset.echoedvoice = ["9M"];
		this.species.getLearnsetData('dubwool').learnset.naturalgift = ["9M"];
		this.species.getLearnsetData('dubwool').learnset.smartstrike = ["9M"];
		this.species.getLearnsetData('dubwool').learnset.trailhead = ["9M"];
		// Chewtle
		this.species.getLearnsetData('chewtle').learnset.fakeout = ["9D"];
		this.species.getLearnsetData('chewtle').learnset.fullcollide = ["9M"];
		this.species.getLearnsetData('chewtle').learnset.rocksmash = ["9M"];
		this.species.getLearnsetData('chewtle').learnset.strength = ["9M"];
		this.species.getLearnsetData('chewtle').learnset.superfang = ["9M"];
		this.species.getLearnsetData('chewtle').learnset.waterpulse = ["9M"];
		delete this.species.getLearnsetData('chewtle').learnset.dragontail;
		// Drednaw
		this.species.getLearnsetData('drednaw').learnset.fakeout = ["9D"];
		this.species.getLearnsetData('drednaw').learnset.aquatail = ["9M"];
		this.species.getLearnsetData('drednaw').learnset.chipaway = ["9M"];
		this.species.getLearnsetData('drednaw').learnset.dragontail = ["9M"];
		this.species.getLearnsetData('drednaw').learnset.fullcollide = ["9M"];
		this.species.getLearnsetData('drednaw').learnset.rocksmash = ["9M"];
		this.species.getLearnsetData('drednaw').learnset.strength = ["9M"];
		this.species.getLearnsetData('drednaw').learnset.superfang = ["9M"];
		this.species.getLearnsetData('drednaw').learnset.waterpulse = ["9M"];
		delete this.species.getLearnsetData('drednaw').learnset.meteorbeam;
		// Yamper
		this.species.getLearnsetData('yamper').learnset.nuzzle = ["9D"];
		this.species.getLearnsetData('yamper').learnset.chargebeam = ["9M"];
		this.species.getLearnsetData('yamper').learnset.echoedvoice = ["9M"];
		this.species.getLearnsetData('yamper').learnset.endeavor = ["9M"];
		this.species.getLearnsetData('yamper').learnset.flash = ["9M"];
		this.species.getLearnsetData('yamper').learnset.healbell = ["9M"];
		this.species.getLearnsetData('yamper').learnset.magnetrise = ["9M"];
		this.species.getLearnsetData('yamper').learnset.recycle = ["9M"];
		this.species.getLearnsetData('yamper').learnset.shockwave = ["9M"];
		this.species.getLearnsetData('yamper').learnset.snatch = ["9M"];
		this.species.getLearnsetData('yamper').learnset.trailhead = ["9M"];
		this.species.getLearnsetData('yamper').learnset.thunderfang = ["9E"];
		// Boltund
		this.species.getLearnsetData('boltund').learnset.nuzzle = ["9D"];
		this.species.getLearnsetData('boltund').learnset.chargebeam = ["9M"];
		this.species.getLearnsetData('boltund').learnset.echoedvoice = ["9M"];
		this.species.getLearnsetData('boltund').learnset.endeavor = ["9M"];
		this.species.getLearnsetData('boltund').learnset.flash = ["9M"];
		this.species.getLearnsetData('boltund').learnset.healbell = ["9M"];
		this.species.getLearnsetData('boltund').learnset.magnetrise = ["9M"];
		this.species.getLearnsetData('boltund').learnset.recycle = ["9M"];
		this.species.getLearnsetData('boltund').learnset.shockwave = ["9M"];
		this.species.getLearnsetData('boltund').learnset.snatch = ["9M"];
		this.species.getLearnsetData('boltund').learnset.trailhead = ["9M"];
		// Rolycoly
		this.species.getLearnsetData('rolycoly').learnset.accelerock = ["9D"];
		this.species.getLearnsetData('rolycoly').learnset.explosion = ["9M"];
		this.species.getLearnsetData('rolycoly').learnset.flash = ["9M"];
		this.species.getLearnsetData('rolycoly').learnset.spite = ["9M"];
		delete this.species.getLearnsetData('rolycoly').learnset.meteorbeam;
		// Carkol
		this.species.getLearnsetData('carkol').learnset.accelerock = ["9D"];
		this.species.getLearnsetData('carkol').learnset.explosion = ["9M"];
		this.species.getLearnsetData('carkol').learnset.flash = ["9M"];
		this.species.getLearnsetData('carkol').learnset.spite = ["9M"];
		delete this.species.getLearnsetData('carkol').learnset.meteorbeam;
		// Coalossal
		this.species.getLearnsetData('coalossal').learnset.moltenslag = ["9D"];
		this.species.getLearnsetData('coalossal').learnset.explosion = ["9M"];
		this.species.getLearnsetData('coalossal').learnset.flash = ["9M"];
		this.species.getLearnsetData('coalossal').learnset.spite = ["9M"];
		delete this.species.getLearnsetData('coalossal').learnset.meteorbeam;
		// Flapple
		this.species.getLearnsetData('flapple').learnset.uproar = ["9D"];
		this.species.getLearnsetData('flapple').learnset.seedbomb = ["9L32","9M"];
		this.species.getLearnsetData('flapple').learnset.aerialace = ["9M"];
		this.species.getLearnsetData('flapple').learnset.bodypress = ["9M"];
		this.species.getLearnsetData('flapple').learnset.bugbite = ["9M"];
		this.species.getLearnsetData('flapple').learnset.fullcollide = ["9M"];
		this.species.getLearnsetData('flapple').learnset.infestation = ["9M"];
		this.species.getLearnsetData('flapple').learnset.naturalgift = ["9M"];
		this.species.getLearnsetData('flapple').learnset.naturepower = ["9M"];
		this.species.getLearnsetData('flapple').learnset.psychup = ["9M"];
		this.species.getLearnsetData('flapple').learnset.rockpolish = ["9M"];
		this.species.getLearnsetData('flapple').learnset.roleplay = ["9M"];
		this.species.getLearnsetData('flapple').learnset.roost = ["9M"];
		this.species.getLearnsetData('flapple').learnset.synthesis = ["9M"];
		this.species.getLearnsetData('flapple').learnset.worryseed = ["9M"];
		delete this.species.getLearnsetData('flapple').learnset.gravapple;
		// Appletun
		this.species.getLearnsetData('appletun').learnset.yawn = ["9D"];
		this.species.getLearnsetData('appletun').learnset.energyball = ["9L32","9M"];
		this.species.getLearnsetData('appletun').learnset.bugbite = ["9M"];
		this.species.getLearnsetData('appletun').learnset.dragontail = ["9M"];
		this.species.getLearnsetData('appletun').learnset.infestation = ["9M"];
		this.species.getLearnsetData('appletun').learnset.naturalgift = ["9M"];
		this.species.getLearnsetData('appletun').learnset.naturepower = ["9M"];
		this.species.getLearnsetData('appletun').learnset.psychup = ["9M"];
		this.species.getLearnsetData('appletun').learnset.roleplay = ["9M"];
		this.species.getLearnsetData('appletun').learnset.strength = ["9M"];
		this.species.getLearnsetData('appletun').learnset.synthesis = ["9M"];
		this.species.getLearnsetData('appletun').learnset.worryseed = ["9M"];
		delete this.species.getLearnsetData('appletun').learnset.appleacid;
		// Silicobra
		this.species.getLearnsetData('silicobra').learnset.rototiller = ["9D"];
		this.species.getLearnsetData('silicobra').learnset.constrict = ["9L1"];
		this.species.getLearnsetData('silicobra').learnset.sandattack = ["9L5"];
		this.species.getLearnsetData('silicobra').learnset.bind = ["9L9"];
		this.species.getLearnsetData('silicobra').learnset.minimize = ["9L13"];
		this.species.getLearnsetData('silicobra').learnset.brutalswing = ["9L17"];
		this.species.getLearnsetData('silicobra').learnset.headbutt = ["9L21"];
		this.species.getLearnsetData('silicobra').learnset.glare = ["9L25"];
		this.species.getLearnsetData('silicobra').learnset.sandtomb = ["9L29"];
		this.species.getLearnsetData('silicobra').learnset.dig = ["9L33"];
		this.species.getLearnsetData('silicobra').learnset.sandstorm = ["9L37"];
		this.species.getLearnsetData('silicobra').learnset.slam = ["9L41"];
		this.species.getLearnsetData('silicobra').learnset.coil = ["9L45"];
		this.species.getLearnsetData('silicobra').learnset.wringout = ["9L49"];
		this.species.getLearnsetData('silicobra').learnset.dustspray = ["9E"];
		this.species.getLearnsetData('silicobra').learnset.aquatail = ["9M"];
		this.species.getLearnsetData('silicobra').learnset.dragontail = ["9M"];
		// Sandaconda
		this.species.getLearnsetData('sandaconda').learnset.rototiller = ["9D"];
		this.species.getLearnsetData('sandaconda').learnset.constrict = ["9L1"];
		this.species.getLearnsetData('sandaconda').learnset.sandattack = ["9L5"];
		this.species.getLearnsetData('sandaconda').learnset.bind = ["9L9"];
		this.species.getLearnsetData('sandaconda').learnset.minimize = ["9L13"];
		this.species.getLearnsetData('sandaconda').learnset.brutalswing = ["9L17"];
		this.species.getLearnsetData('sandaconda').learnset.headbutt = ["9L21"];
		this.species.getLearnsetData('sandaconda').learnset.glare = ["9L25"];
		this.species.getLearnsetData('sandaconda').learnset.sandtomb = ["9L29"];
		this.species.getLearnsetData('sandaconda').learnset.dig = ["9L33"];
		this.species.getLearnsetData('sandaconda').learnset.sandstorm = ["9L40"];
		this.species.getLearnsetData('sandaconda').learnset.slam = ["9L47"];
		this.species.getLearnsetData('sandaconda').learnset.coil = ["9L54"];
		this.species.getLearnsetData('sandaconda').learnset.wringout = ["9L61"];
		this.species.getLearnsetData('sandaconda').learnset.aquatail = ["9M"];
		this.species.getLearnsetData('sandaconda').learnset.dragontail = ["9M"];
		this.species.getLearnsetData('sandaconda').learnset.strength = ["9M"];
		// Cramorant
		this.species.getLearnsetData('cramorant').learnset.eggbomb = ["9D"];
		this.species.getLearnsetData('cramorant').learnset.block = ["9M"];
		this.species.getLearnsetData('cramorant').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('cramorant').learnset.echoedvoice = ["9M"];
		this.species.getLearnsetData('cramorant').learnset.tailwind = ["9M"];
		this.species.getLearnsetData('cramorant').learnset.waterpulse = ["9M"];
		this.species.getLearnsetData('cramorant').learnset.iceball = ["9E"];
		// Arrokuda
		this.species.getLearnsetData('arrokuda').learnset.skullbash = ["9D"];
		this.species.getLearnsetData('arrokuda').learnset.wavecrash = ["9L42"];
		this.species.getLearnsetData('arrokuda').learnset.aquatail = ["9M"];
		this.species.getLearnsetData('arrokuda').learnset.endeavor = ["9M"];
		this.species.getLearnsetData('arrokuda').learnset.waterpulse = ["9M"];
		delete this.species.getLearnsetData('arrokuda').learnset.liquidation;
		// Barraskewda
		this.species.getLearnsetData('barraskewda').learnset.skullbash = ["9D"];
		this.species.getLearnsetData('barraskewda').learnset.wavecrash = ["9L48"];
		this.species.getLearnsetData('barraskewda').learnset.aquatail = ["9M"];
		this.species.getLearnsetData('barraskewda').learnset.endeavor = ["9M"];
		this.species.getLearnsetData('barraskewda').learnset.waterpulse = ["9M"];
		delete this.species.getLearnsetData('barraskewda').learnset.liquidation;
		// Toxel
		this.species.getLearnsetData('toxel').learnset.paraboliccharge = ["9D"];
		this.species.getLearnsetData('toxel').learnset.chargebeam = ["9M"];
		this.species.getLearnsetData('toxel').learnset.echoedvoice = ["9M"];
		this.species.getLearnsetData('toxel').learnset.flash = ["9M"];
		this.species.getLearnsetData('toxel').learnset.gastroacid = ["9M"];
		this.species.getLearnsetData('toxel').learnset.magnetrise = ["9M"];
		this.species.getLearnsetData('toxel').learnset.shockwave = ["9M"];
		// Toxtricity Amped
		this.species.getLearnsetData('toxtricity').learnset.paraboliccharge = ["9D"];
		this.species.getLearnsetData('toxtricity').learnset.toxic = ["9L32","9M"];
		this.species.getLearnsetData('toxtricity').learnset.magneticflux = ["9L54"];
		this.species.getLearnsetData('toxtricity').learnset.chargebeam = ["9M"];
		this.species.getLearnsetData('toxtricity').learnset.echoedvoice = ["9M"];
		this.species.getLearnsetData('toxtricity').learnset.flash = ["9M"];
		this.species.getLearnsetData('toxtricity').learnset.gastroacid = ["9M"];
		this.species.getLearnsetData('toxtricity').learnset.gravity = ["9M"];
		this.species.getLearnsetData('toxtricity').learnset.magnetrise = ["9M"];
		this.species.getLearnsetData('toxtricity').learnset.painsplit = ["9M"];
		this.species.getLearnsetData('toxtricity').learnset.psychup = ["9M"];
		this.species.getLearnsetData('toxtricity').learnset.shockwave = ["9M"];
		this.species.getLearnsetData('toxtricity').learnset.signalbeam = ["9M"];
		delete this.species.getLearnsetData('toxtricity').learnset.metronome;
		delete this.species.getLearnsetData('toxtricity').learnset.shiftgear;
		// Toxtricity Low Key
		this.species.getLearnsetData('toxtricitylowkey').learnset.paraboliccharge = ["9D"];
		this.species.getLearnsetData('toxtricitylowkey').learnset.toxic = ["9L32","9M"];
		this.species.getLearnsetData('toxtricitylowkey').learnset.chargebeam = ["9M"];
		this.species.getLearnsetData('toxtricitylowkey').learnset.echoedvoice = ["9M"];
		this.species.getLearnsetData('toxtricitylowkey').learnset.flash = ["9M"];
		this.species.getLearnsetData('toxtricitylowkey').learnset.gastroacid = ["9M"];
		this.species.getLearnsetData('toxtricitylowkey').learnset.gravity = ["9M"];
		this.species.getLearnsetData('toxtricitylowkey').learnset.magnetrise = ["9M"];
		this.species.getLearnsetData('toxtricitylowkey').learnset.painsplit = ["9M"];
		this.species.getLearnsetData('toxtricitylowkey').learnset.psychup = ["9M"];
		this.species.getLearnsetData('toxtricitylowkey').learnset.shockwave = ["9M"];
		this.species.getLearnsetData('toxtricitylowkey').learnset.signalbeam = ["9M"];
		delete this.species.getLearnsetData('toxtricitylowkey').learnset.metronome;
		// Sizzlipede
		this.species.getLearnsetData('sizzlipede').learnset.coil = ["9D"];
		this.species.getLearnsetData('sizzlipede').learnset.preheat = ["9L25"];
		this.species.getLearnsetData('sizzlipede').learnset.bugbite = ["9M"];
		this.species.getLearnsetData('sizzlipede').learnset.flamecharge = ["9M"];
		this.species.getLearnsetData('sizzlipede').learnset.flash = ["9M"];
		this.species.getLearnsetData('sizzlipede').learnset.incinerate = ["9M"];
		this.species.getLearnsetData('sizzlipede').learnset.infestation = ["9M"];
		this.species.getLearnsetData('sizzlipede').learnset.vitaldrain = ["9M"];
		delete this.species.getLearnsetData('sizzlipede').learnset.knockoff;
		delete this.species.getLearnsetData('sizzlipede').learnset.leechlife;
		// Centiskorch
		this.species.getLearnsetData('centiskorch').learnset.coil = ["9D"];
		this.species.getLearnsetData('centiskorch').learnset.preheat = ["9L25"];
		this.species.getLearnsetData('centiskorch').learnset.bugbite = ["9M"];
		this.species.getLearnsetData('centiskorch').learnset.flamecharge = ["9M"];
		this.species.getLearnsetData('centiskorch').learnset.flash = ["9M"];
		this.species.getLearnsetData('centiskorch').learnset.incinerate = ["9M"];
		this.species.getLearnsetData('centiskorch').learnset.infestation = ["9M"];
		this.species.getLearnsetData('centiskorch').learnset.vitaldrain = ["9M"];
		delete this.species.getLearnsetData('centiskorch').learnset.knockoff;
		delete this.species.getLearnsetData('centiskorch').learnset.leechlife;
		// Clobbopus
		this.species.getLearnsetData('clobbopus').learnset.megapunch = ["9D"];
		this.species.getLearnsetData('clobbopus').learnset.knockoff = ["9M"];
		this.species.getLearnsetData('clobbopus').learnset.strength = ["9M"];
		this.species.getLearnsetData('clobbopus').learnset.octazooka = ["9E"];
		// Grapploct
		this.species.getLearnsetData('grapploct').learnset.lashout = ["9D"];
		this.species.getLearnsetData('grapploct').learnset.wringout = ["9L50"];
		this.species.getLearnsetData('grapploct').learnset.knockoff = ["9M"];
		this.species.getLearnsetData('grapploct').learnset.laserfocus = ["9M"];
		this.species.getLearnsetData('grapploct').learnset.strength = ["9M"];
		delete this.species.getLearnsetData('grapploct').learnset.octazooka;
		delete this.species.getLearnsetData('grapploct').learnset.topsyturvy;
		// Sinistea
		this.species.getLearnsetData('sinistea').learnset.soak = ["9D"];
		this.species.getLearnsetData('sinistea').learnset.embargo = ["9M"];
		this.species.getLearnsetData('sinistea').learnset.flash = ["9M"];
		this.species.getLearnsetData('sinistea').learnset.gravity = ["9M"];
		this.species.getLearnsetData('sinistea').learnset.healbell = ["9M"];
		this.species.getLearnsetData('sinistea').learnset.magiccoat = ["9M"];
		this.species.getLearnsetData('sinistea').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('sinistea').learnset.psychup = ["9M"];
		this.species.getLearnsetData('sinistea').learnset.recycle = ["9M"];
		this.species.getLearnsetData('sinistea').learnset.rockpolish = ["9M"];
		this.species.getLearnsetData('sinistea').learnset.roleplay = ["9M"];
		this.species.getLearnsetData('sinistea').learnset.snatch = ["9M"];
		this.species.getLearnsetData('sinistea').learnset.spite = ["9M"];
		this.species.getLearnsetData('sinistea').learnset.telekinesis = ["9M"];
		delete this.species.getLearnsetData('sinistea').learnset.metronome;
		// Polteageist
		this.species.getLearnsetData('polteageist').learnset.soak = ["9D"];
		this.species.getLearnsetData('polteageist').learnset.embargo = ["9M"];
		this.species.getLearnsetData('polteageist').learnset.flash = ["9M"];
		this.species.getLearnsetData('polteageist').learnset.gravity = ["9M"];
		this.species.getLearnsetData('polteageist').learnset.healbell = ["9M"];
		this.species.getLearnsetData('polteageist').learnset.magiccoat = ["9M"];
		this.species.getLearnsetData('polteageist').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('polteageist').learnset.psychup = ["9M"];
		this.species.getLearnsetData('polteageist').learnset.recycle = ["9M"];
		this.species.getLearnsetData('polteageist').learnset.rockpolish = ["9M"];
		this.species.getLearnsetData('polteageist').learnset.roleplay = ["9M"];
		this.species.getLearnsetData('polteageist').learnset.snatch = ["9M"];
		this.species.getLearnsetData('polteageist').learnset.spite = ["9M"];
		this.species.getLearnsetData('polteageist').learnset.telekinesis = ["9M"];
		// Hatenna
		this.species.getLearnsetData('hatenna').learnset.imprison = ["9D"];
		this.species.getLearnsetData('hatenna').learnset.chargebeam = ["9M"];
		this.species.getLearnsetData('hatenna').learnset.dreameater = ["9M"];
		this.species.getLearnsetData('hatenna').learnset.echoedvoice = ["9M"];
		this.species.getLearnsetData('hatenna').learnset.flash = ["9M"];
		this.species.getLearnsetData('hatenna').learnset.gravity = ["9M"];
		this.species.getLearnsetData('hatenna').learnset.magiccoat = ["9M"];
		this.species.getLearnsetData('hatenna').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('hatenna').learnset.psychup = ["9M"];
		this.species.getLearnsetData('hatenna').learnset.signalbeam = ["9M"];
		this.species.getLearnsetData('hatenna').learnset.telekinesis = ["9M"];
		this.species.getLearnsetData('hatenna').learnset.drainingkiss = ["9E"];
		delete this.species.getLearnsetData('hatenna').learnset.metronome;
		delete this.species.getLearnsetData('hatenna').learnset.nuzzle;
		// Hattrem
		this.species.getLearnsetData('hattrem').learnset.imprison = ["9D"];
		this.species.getLearnsetData('hattrem').learnset.chargebeam = ["9M"];
		this.species.getLearnsetData('hattrem').learnset.dreameater = ["9M"];
		this.species.getLearnsetData('hattrem').learnset.echoedvoice = ["9M"];
		this.species.getLearnsetData('hattrem').learnset.flash = ["9M"];
		this.species.getLearnsetData('hattrem').learnset.gravity = ["9M"];
		this.species.getLearnsetData('hattrem').learnset.magiccoat = ["9M"];
		this.species.getLearnsetData('hattrem').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('hattrem').learnset.psychup = ["9M"];
		this.species.getLearnsetData('hattrem').learnset.signalbeam = ["9M"];
		this.species.getLearnsetData('hattrem').learnset.telekinesis = ["9M"];
		// Hatterene
		this.species.getLearnsetData('hatterene').learnset.imprison = ["9D"];
		this.species.getLearnsetData('hatterene').learnset.chargebeam = ["9M"];
		this.species.getLearnsetData('hatterene').learnset.dreameater = ["9M"];
		this.species.getLearnsetData('hatterene').learnset.echoedvoice = ["9M"];
		this.species.getLearnsetData('hatterene').learnset.flash = ["9M"];
		this.species.getLearnsetData('hatterene').learnset.gravity = ["9M"];
		this.species.getLearnsetData('hatterene').learnset.magiccoat = ["9M"];
		this.species.getLearnsetData('hatterene').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('hatterene').learnset.psychup = ["9M"];
		this.species.getLearnsetData('hatterene').learnset.signalbeam = ["9M"];
		this.species.getLearnsetData('hatterene').learnset.telekinesis = ["9M"];
		// Impidimp
		this.species.getLearnsetData('impidimp').learnset.astonish = ["9D"];
		this.species.getLearnsetData('impidimp').learnset.dreameater = ["9M"];
		this.species.getLearnsetData('impidimp').learnset.echoedvoice = ["9M"];
		this.species.getLearnsetData('impidimp').learnset.embargo = ["9M"];
		this.species.getLearnsetData('impidimp').learnset.gravity = ["9M"];
		this.species.getLearnsetData('impidimp').learnset.homeclaws = ["9M"];
		this.species.getLearnsetData('impidimp').learnset.magiccoat = ["9M"];
		this.species.getLearnsetData('impidimp').learnset.psychup = ["9M"];
		this.species.getLearnsetData('impidimp').learnset.rocksmash = ["9M"];
		this.species.getLearnsetData('impidimp').learnset.snatch = ["9M"];
		this.species.getLearnsetData('impidimp').learnset.vitaldrain = ["9M"];
		this.species.getLearnsetData('impidimp').learnset.partingshot = ["9E"];
		delete this.species.getLearnsetData('impidimp').learnset.leechlife;
		// Morgrem
		this.species.getLearnsetData('morgrem').learnset.darkestlariat = ["9D"];
		this.species.getLearnsetData('morgrem').learnset.dreameater = ["9M"];
		this.species.getLearnsetData('morgrem').learnset.echoedvoice = ["9M"];
		this.species.getLearnsetData('morgrem').learnset.embargo = ["9M"];
		this.species.getLearnsetData('morgrem').learnset.gravity = ["9M"];
		this.species.getLearnsetData('morgrem').learnset.homeclaws = ["9M"];
		this.species.getLearnsetData('morgrem').learnset.lastresort = ["9M"];
		this.species.getLearnsetData('morgrem').learnset.magiccoat = ["9M"];
		this.species.getLearnsetData('morgrem').learnset.psychup = ["9M"];
		this.species.getLearnsetData('morgrem').learnset.rocksmash = ["9M"];
		this.species.getLearnsetData('morgrem').learnset.snatch = ["9M"];
		this.species.getLearnsetData('morgrem').learnset.strength = ["9M"];
		this.species.getLearnsetData('morgrem').learnset.vitaldrain = ["9M"];
		delete this.species.getLearnsetData('morgrem').learnset.leechlife;
		// Grimmsnarl
		this.species.getLearnsetData('grimmsnarl').learnset.darkestlariat = ["9D"];
		this.species.getLearnsetData('grimmsnarl').learnset.dreameater = ["9M"];
		this.species.getLearnsetData('grimmsnarl').learnset.dualchop = ["9M"];
		this.species.getLearnsetData('grimmsnarl').learnset.echoedvoice = ["9M"];
		this.species.getLearnsetData('grimmsnarl').learnset.embargo = ["9M"];
		this.species.getLearnsetData('grimmsnarl').learnset.feintattack = ["9M"];
		this.species.getLearnsetData('grimmsnarl').learnset.gravity = ["9M"];
		this.species.getLearnsetData('grimmsnarl').learnset.homeclaws = ["9M"];
		this.species.getLearnsetData('grimmsnarl').learnset.lastresort = ["9M"];
		this.species.getLearnsetData('grimmsnarl').learnset.magiccoat = ["9M"];
		this.species.getLearnsetData('grimmsnarl').learnset.psychup = ["9M"];
		this.species.getLearnsetData('grimmsnarl').learnset.rocksmash = ["9M"];
		this.species.getLearnsetData('grimmsnarl').learnset.snatch = ["9M"];
		this.species.getLearnsetData('grimmsnarl').learnset.strength = ["9M"];
		this.species.getLearnsetData('grimmsnarl').learnset.vitaldrain = ["9M"];
		delete this.species.getLearnsetData('grimmsnarl').learnset.leechlife;
		// Obstagoon
		this.species.getLearnsetData('obstagoon').learnset.throatchop = ["9D"];
		this.species.getLearnsetData('obstagoon').learnset.playrough = ["9L1"];
		this.species.getLearnsetData('obstagoon').learnset.tussle = ["9L1"];
		this.species.getLearnsetData('obstagoon').learnset.terrify = ["9L35"];
		this.species.getLearnsetData('obstagoon').learnset.block = ["9M"];
		this.species.getLearnsetData('obstagoon').learnset.dualchop = ["9M"];
		this.species.getLearnsetData('obstagoon').learnset.echoedvoice = ["9M"];
		this.species.getLearnsetData('obstagoon').learnset.embargo = ["9M"];
		this.species.getLearnsetData('obstagoon').learnset.honeclaws = ["9M"];
		this.species.getLearnsetData('obstagoon').learnset.lastresort = ["9M"];
		this.species.getLearnsetData('obstagoon').learnset.pursuit = ["9M"];
		this.species.getLearnsetData('obstagoon').learnset.quash = ["9M"];
		this.species.getLearnsetData('obstagoon').learnset.rocksmash = ["9M"];
		this.species.getLearnsetData('obstagoon').learnset.snatch = ["9M"];
		this.species.getLearnsetData('obstagoon').learnset.spite = ["9M"];
		this.species.getLearnsetData('obstagoon').learnset.strength = ["9M"];
		this.species.getLearnsetData('obstagoon').learnset.torment = ["9M"];
		this.species.getLearnsetData('obstagoon').learnset.toxic = ["9M"];
		this.species.getLearnsetData('obstagoon').learnset.xscissor = ["9M"];
		delete this.species.getLearnsetData('obstagoon').learnset.babydolleyes;
		delete this.species.getLearnsetData('obstagoon').learnset.pinmissile;
		delete this.species.getLearnsetData('obstagoon').learnset.scaryface;
		// Perrserker
		this.species.getLearnsetData('perrserker').learnset.mefirst = ["9D"];
		this.species.getLearnsetData('perrserker').learnset.metaledge = ["9L69"];
		this.species.getLearnsetData('perrserker').learnset.aerialace = ["9M"];
		this.species.getLearnsetData('perrserker').learnset.endeavor = ["9M"];
		this.species.getLearnsetData('perrserker').learnset.feintattack = ["9M"];
		this.species.getLearnsetData('perrserker').learnset.flash = ["9M"];
		this.species.getLearnsetData('perrserker').learnset.honeclaws = ["9M"];
		this.species.getLearnsetData('perrserker').learnset.rockpolish = ["9M"];
		this.species.getLearnsetData('perrserker').learnset.smartstrike = ["9M"];
		this.species.getLearnsetData('perrserker').learnset.strength = ["9M"];
		this.species.getLearnsetData('perrserker').learnset.xscissor = ["9M"];
		// Cursola
		this.species.getLearnsetData('cursola').learnset.clearsmog = ["9D"];
		this.species.getLearnsetData('cursola').learnset.dreameater = ["9M"];
		this.species.getLearnsetData('cursola').learnset.dustspray = ["9M"];
		this.species.getLearnsetData('cursola').learnset.endeavor = ["9M"];
		this.species.getLearnsetData('cursola').learnset.explosion = ["9M"];
		this.species.getLearnsetData('cursola').learnset.gravity = ["9M"];
		this.species.getLearnsetData('cursola').learnset.healblock = ["9M"];
		this.species.getLearnsetData('cursola').learnset.magiccoat = ["9M"];
		this.species.getLearnsetData('cursola').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('cursola').learnset.painsplit = ["9M"];
		this.species.getLearnsetData('cursola').learnset.psychup = ["9M"];
		this.species.getLearnsetData('cursola').learnset.telekinesis = ["9M"];
		delete this.species.getLearnsetData('cursola').learnset.leechlife;
		delete this.species.getLearnsetData('cursola').learnset.meteorbeam;
		delete this.species.getLearnsetData('cursola').learnset.poltergeist;
		delete this.species.getLearnsetData('cursola').learnset.tantrum;
		// Sirfetch'd
		this.species.getLearnsetData('sirfetchd').learnset.megahorn = ["9D"];
		this.species.getLearnsetData('sirfetchd').learnset.aerialace = ["9M"];
		this.species.getLearnsetData('sirfetchd').learnset.afteryou = ["9M"];
		this.species.getLearnsetData('sirfetchd').learnset.chipaway = ["9M"];
		this.species.getLearnsetData('sirfetchd').learnset.endeavor = ["9M"];
		this.species.getLearnsetData('sirfetchd').learnset.fullcollide = ["9M"];
		// Mr. Rime
		this.species.getLearnsetData('mrrime').learnset.followme = ["9D"];
		this.species.getLearnsetData('mrrime').learnset.wakeupslap = ["9L40"];
		this.species.getLearnsetData('mrrime').learnset.afteryou = ["9M"];
		this.species.getLearnsetData('mrrime').learnset.auroraveil = ["9M"];
		this.species.getLearnsetData('mrrime').learnset.dreameater = ["9M"];
		this.species.getLearnsetData('mrrime').learnset.frostbreath = ["9M"];
		this.species.getLearnsetData('mrrime').learnset.flash = ["9M"];
		this.species.getLearnsetData('mrrime').learnset.gravity = ["9M"];
		this.species.getLearnsetData('mrrime').learnset.magiccoat = ["9M"];
		this.species.getLearnsetData('mrrime').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('mrrime').learnset.psychup = ["9M"];
		this.species.getLearnsetData('mrrime').learnset.rocksmash = ["9M"];
		this.species.getLearnsetData('mrrime').learnset.spotlight = ["9M"];
		this.species.getLearnsetData('mrrime').learnset.telekinesis = ["9M"];
		this.species.getLearnsetData('mrrime').learnset.torment = ["9M"];
		delete this.species.getLearnsetData('mrrime').learnset.suckerpunch;
		delete this.species.getLearnsetData('mrrime').learnset.toxic;
		// Runerigus
		this.species.getLearnsetData('runerigus').learnset.grudge = ["9D"];
		this.species.getLearnsetData('runerigus').learnset.terrify = ["9L1"];
		this.species.getLearnsetData('runerigus').learnset.block = ["9M"];
		this.species.getLearnsetData('runerigus').learnset.dragontail = ["9M"];
		this.species.getLearnsetData('runerigus').learnset.dualchop = ["9M"];
		this.species.getLearnsetData('runerigus').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('runerigus').learnset.rocksmash = ["9M"];
		this.species.getLearnsetData('runerigus').learnset.roleplay = ["9M"];
		this.species.getLearnsetData('runerigus').learnset.strength = ["9M"];
		delete this.species.getLearnsetData('runerigus').learnset.scaryface;
		// Milcery
		this.species.getLearnsetData('milcery').learnset.milkdrink = ["9D"];
		this.species.getLearnsetData('milcery').learnset.flash = ["9M"];
		this.species.getLearnsetData('milcery').learnset.magiccoat = ["9M"];
		// Alcremie
		this.species.getLearnsetData('alcremie').learnset.milkdrink = ["9D"];
		this.species.getLearnsetData('alcremie').learnset.bestow = ["9L0"];
		this.species.getLearnsetData('alcremie').learnset.afteryou = ["9M"];
		this.species.getLearnsetData('alcremie').learnset.flash = ["9M"];
		this.species.getLearnsetData('alcremie').learnset.magiccoat = ["9M"];
		// Falinks
		this.species.getLearnsetData('falinks').learnset.beatup = ["9D"];
		this.species.getLearnsetData('falinks').learnset.block = ["9M"];
		this.species.getLearnsetData('falinks').learnset.endeavor = ["9M"];
		this.species.getLearnsetData('falinks').learnset.fullcollide = ["9M"];
		this.species.getLearnsetData('falinks').learnset.laserfocus = ["9M"];
		this.species.getLearnsetData('falinks').learnset.psychup = ["9M"];
		this.species.getLearnsetData('falinks').learnset.rockpolish = ["9M"];
		this.species.getLearnsetData('falinks').learnset.strength = ["9M"];
		// Pincurchin
		this.species.getLearnsetData('pincurchin').learnset.spikecannon = ["9D"];
		this.species.getLearnsetData('pincurchin').learnset.chargebeam = ["9M"];
		this.species.getLearnsetData('pincurchin').learnset.flash = ["9M"];
		this.species.getLearnsetData('pincurchin').learnset.gastroacid = ["9M"];
		this.species.getLearnsetData('pincurchin').learnset.magnetrise = ["9M"];
		this.species.getLearnsetData('pincurchin').learnset.shockwave = ["9M"];
		this.species.getLearnsetData('pincurchin').learnset.spikes = ["9E"];
		// Snom
		this.species.getLearnsetData('snom').learnset.irondefense = ["9D"];
		this.species.getLearnsetData('snom').learnset.bugbite = ["9M"];
		this.species.getLearnsetData('snom').learnset.flash = ["9M"];
		this.species.getLearnsetData('snom').learnset.frostbreath = ["9M"];
		this.species.getLearnsetData('snom').learnset.infestation = ["9M"];
		this.species.getLearnsetData('snom').learnset.signalbeam = ["9M"];
		this.species.getLearnsetData('snom').learnset.stringshot = ["9M"];
		// Frosmoth
		this.species.getLearnsetData('frosmoth').learnset.cottonguard = ["9D"];
		this.species.getLearnsetData('frosmoth').learnset.bugbite = ["9M"];
		this.species.getLearnsetData('frosmoth').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('frosmoth').learnset.flash = ["9M"];
		this.species.getLearnsetData('frosmoth').learnset.frostbreath = ["9M"];
		this.species.getLearnsetData('frosmoth').learnset.infestation = ["9M"];
		this.species.getLearnsetData('frosmoth').learnset.magiccoat = ["9M"];
		this.species.getLearnsetData('frosmoth').learnset.roost = ["9M"];
		this.species.getLearnsetData('frosmoth').learnset.signalbeam = ["9M"];
		this.species.getLearnsetData('frosmoth').learnset.stringshot = ["9M"];
		this.species.getLearnsetData('frosmoth').learnset.vitaldrain = ["9M"];
		delete this.species.getLearnsetData('frosmoth').learnset.leechlife;
		// Stonjourner
		this.species.getLearnsetData('stonjourner').learnset.morningsun = ["9D"];
		this.species.getLearnsetData('stonjourner').learnset.embargo = ["9M"];
		this.species.getLearnsetData('stonjourner').learnset.explosion = ["9M"];
		this.species.getLearnsetData('stonjourner').learnset.gravity = ["9M"];
		this.species.getLearnsetData('stonjourner').learnset.magiccoat = ["9M"];
		this.species.getLearnsetData('stonjourner').learnset.naturepower = ["9M"];
		this.species.getLearnsetData('stonjourner').learnset.rocksmash = ["9M"];
		this.species.getLearnsetData('stonjourner').learnset.roleplay = ["9M"];
		this.species.getLearnsetData('stonjourner').learnset.smackdown = ["9M"];
		this.species.getLearnsetData('stonjourner').learnset.strength = ["9M"];
		this.species.getLearnsetData('stonjourner').learnset.telekinesis = ["9M"];
		// Eiscue
		this.species.getLearnsetData('eiscue').learnset.iceball = ["9D"];
		this.species.getLearnsetData('eiscue').learnset.echoedvoice = ["9M"];
		this.species.getLearnsetData('eiscue').learnset.flash = ["9M"];
		this.species.getLearnsetData('eiscue').learnset.frostbreath = ["9M"];
		this.species.getLearnsetData('eiscue').learnset.fullcollide = ["9M"];
		this.species.getLearnsetData('eiscue').learnset.waterpulse = ["9M"];
		// Indeedee ♀
		this.species.getLearnsetData('indeedeef').learnset.happyhour = ["9D"];
		this.species.getLearnsetData('indeedeef').learnset.teatime = ["9L40"];
		this.species.getLearnsetData('indeedeef').learnset.trumpcard = ["9L55"];
		this.species.getLearnsetData('indeedeef').learnset.calmmind = ["9M"];
		this.species.getLearnsetData('indeedeef').learnset.dreameater = ["9M"];
		this.species.getLearnsetData('indeedeef').learnset.echoedvoice = ["9M"];
		this.species.getLearnsetData('indeedeef').learnset.embargo = ["9M"];
		this.species.getLearnsetData('indeedeef').learnset.flash = ["9M"];
		this.species.getLearnsetData('indeedeef').learnset.gravity = ["9M"];
		this.species.getLearnsetData('indeedeef').learnset.healbell = ["9M"];
		this.species.getLearnsetData('indeedeef').learnset.laserfocus = ["9M"];
		this.species.getLearnsetData('indeedeef').learnset.magiccoat = ["9M"];
		this.species.getLearnsetData('indeedeef').learnset.recycle = ["9M"];
		this.species.getLearnsetData('indeedeef').learnset.roleplay = ["9M"];
		this.species.getLearnsetData('indeedeef').learnset.snatch = ["9M"];
		this.species.getLearnsetData('indeedeef').learnset.telekinesis = ["9M"];
		this.species.getLearnsetData('indeedeef').learnset.payday = ["9E"];
		// Indeedee ♂
		this.species.getLearnsetData('indeedee').learnset.happyhour = ["9D"];
		this.species.getLearnsetData('indeedee').learnset.confide = ["9L1"];
		this.species.getLearnsetData('indeedee').learnset.teatime = ["9L40"];
		this.species.getLearnsetData('indeedee').learnset.dreameater = ["9M"];
		this.species.getLearnsetData('indeedee').learnset.echoedvoice = ["9M"];
		this.species.getLearnsetData('indeedee').learnset.embargo = ["9M"];
		this.species.getLearnsetData('indeedee').learnset.flash = ["9M"];
		this.species.getLearnsetData('indeedee').learnset.gravity = ["9M"];
		this.species.getLearnsetData('indeedee').learnset.healbell = ["9M"];
		this.species.getLearnsetData('indeedee').learnset.laserfocus = ["9M"];
		this.species.getLearnsetData('indeedee').learnset.magiccoat = ["9M"];
		this.species.getLearnsetData('indeedee').learnset.recycle = ["9M"];
		this.species.getLearnsetData('indeedee').learnset.roleplay = ["9M"];
		this.species.getLearnsetData('indeedee').learnset.snatch = ["9M"];
		this.species.getLearnsetData('indeedee').learnset.telekinesis = ["9M"];
		this.species.getLearnsetData('indeedee').learnset.payday = ["9E"];
		delete this.species.getLearnsetData('indeedee').learnset.playnice;
		// Morpeko
		this.species.getLearnsetData('morpeko').learnset.rage = ["9D"];
		this.species.getLearnsetData('morpeko').learnset.odorsleuth = ["9L1"];
		this.species.getLearnsetData('morpeko').learnset.chargebeam = ["9M"];
		this.species.getLearnsetData('morpeko').learnset.echoedvoice = ["9M"];
		this.species.getLearnsetData('morpeko').learnset.embargo = ["9M"];
		this.species.getLearnsetData('morpeko').learnset.magnetrise = ["9M"];
		this.species.getLearnsetData('morpeko').learnset.lastresort = ["9M"];
		this.species.getLearnsetData('morpeko').learnset.psychup = ["9M"];
		this.species.getLearnsetData('morpeko').learnset.shockwave = ["9M"];
		this.species.getLearnsetData('morpeko').learnset.snatch = ["9M"];
		this.species.getLearnsetData('morpeko').learnset.spite = ["9M"];
		this.species.getLearnsetData('morpeko').learnset.stuffcheeks = ["9E"];
		this.species.getLearnsetData('morpeko').learnset.tantrum = ["9M"];
		delete this.species.getLearnsetData('morpeko').learnset.tailwhip;
		// Cufant
		this.species.getLearnsetData('cufant').learnset.magnetbomb = ["9D"];
		this.species.getLearnsetData('cufant').learnset.bash = ["9L5"];
		this.species.getLearnsetData('cufant').learnset.rototiller = ["9L30"];
		this.species.getLearnsetData('cufant').learnset.dig = ["9M"];
		this.species.getLearnsetData('cufant').learnset.echoedvoice = ["9M"];
		this.species.getLearnsetData('cufant').learnset.endeavor = ["9M"];
		this.species.getLearnsetData('cufant').learnset.gravity = ["9M"];
		this.species.getLearnsetData('cufant').learnset.magnetrise = ["9M"];
		this.species.getLearnsetData('cufant').learnset.knockoff = ["9M"];
		this.species.getLearnsetData('cufant').learnset.lastresort = ["9M"];
		this.species.getLearnsetData('cufant').learnset.rockpolish = ["9M"];
		this.species.getLearnsetData('cufant').learnset.smackdown = ["9M"];
		this.species.getLearnsetData('cufant').learnset.powerwhip = ["9E"];
		delete this.species.getLearnsetData('cufant').learnset.rollout;
		// Copperajah
		this.species.getLearnsetData('copperajah').learnset.magnetbomb = ["9D"];
		this.species.getLearnsetData('copperajah').learnset.bash = ["9L5"];
		this.species.getLearnsetData('copperajah').learnset.rototiller = ["9L30"];
		this.species.getLearnsetData('copperajah').learnset.dig = ["9M"];
		this.species.getLearnsetData('copperajah').learnset.block = ["9M"];
		this.species.getLearnsetData('copperajah').learnset.echoedvoice = ["9M"];
		this.species.getLearnsetData('copperajah').learnset.endeavor = ["9M"];
		this.species.getLearnsetData('copperajah').learnset.gravity = ["9M"];
		this.species.getLearnsetData('copperajah').learnset.magnetrise = ["9M"];
		this.species.getLearnsetData('copperajah').learnset.knockoff = ["9M"];
		this.species.getLearnsetData('copperajah').learnset.lastresort = ["9M"];
		this.species.getLearnsetData('copperajah').learnset.rockpolish = ["9M"];
		this.species.getLearnsetData('copperajah').learnset.smackdown = ["9M"];
		delete this.species.getLearnsetData('copperajah').learnset.rollout;
		// Dracozolt
		this.species.getLearnsetData('dracozolt').learnset.twister = ["9D"];
		this.species.getLearnsetData('dracozolt').learnset.aquatail = ["9M"];
		this.species.getLearnsetData('dracozolt').learnset.chargebeam = ["9M"];
		this.species.getLearnsetData('dracozolt').learnset.flash = ["9M"];
		this.species.getLearnsetData('dracozolt').learnset.magnetrise = ["9M"];
		this.species.getLearnsetData('dracozolt').learnset.painsplit = ["9M"];
		this.species.getLearnsetData('dracozolt').learnset.shockwave = ["9M"];
		this.species.getLearnsetData('dracozolt').learnset.strength = ["9M"];
		this.species.getLearnsetData('dracozolt').learnset.trailhead = ["9M"];
		delete this.species.getLearnsetData('dracozolt').learnset.meteorbeam;
		// Arctozolt
		this.species.getLearnsetData('arctozolt').learnset.iondeluge = ["9D"];
		this.species.getLearnsetData('arctozolt').learnset.aquatail = ["9M"];
		this.species.getLearnsetData('arctozolt').learnset.chargebeam = ["9M"];
		this.species.getLearnsetData('arctozolt').learnset.dragontail = ["9M"];
		this.species.getLearnsetData('arctozolt').learnset.flash = ["9M"];
		this.species.getLearnsetData('arctozolt').learnset.frostbreath = ["9M"];
		this.species.getLearnsetData('arctozolt').learnset.magnetrise = ["9M"];
		this.species.getLearnsetData('arctozolt').learnset.painsplit = ["9M"];
		this.species.getLearnsetData('arctozolt').learnset.shockwave = ["9M"];
		this.species.getLearnsetData('arctozolt').learnset.strength = ["9M"];
		this.species.getLearnsetData('arctozolt').learnset.trailhead = ["9M"];
		delete this.species.getLearnsetData('arctozolt').learnset.meteorbeam;
		// Dracovish
		this.species.getLearnsetData('dracovish').learnset.liquidation = ["9D"];
		this.species.getLearnsetData('dracovish').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('dracovish').learnset.painsplit = ["9M"];
		this.species.getLearnsetData('dracovish').learnset.strength = ["9M"];
		delete this.species.getLearnsetData('dracovish').learnset.leechlife;
		delete this.species.getLearnsetData('dracovish').learnset.meteorbeam;
		// Arctovish
		this.species.getLearnsetData('arctovish').learnset.icefang = ["9D"];
		this.species.getLearnsetData('arctovish').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('arctovish').learnset.frostbreath = ["9M"];
		this.species.getLearnsetData('arctovish').learnset.painsplit = ["9M"];
		this.species.getLearnsetData('arctovish').learnset.strength = ["9M"];
		delete this.species.getLearnsetData('arctovish').learnset.meteorbeam;
		// Duraludon
		this.species.getLearnsetData('duraludon').learnset.crushclaw = ["9D"];
		this.species.getLearnsetData('duraludon').learnset.block = ["9M"];
		this.species.getLearnsetData('duraludon').learnset.chargebeam = ["9M"];
		this.species.getLearnsetData('duraludon').learnset.dragontail = ["9M"];
		this.species.getLearnsetData('duraludon').learnset.echoedvoice = ["9M"];
		this.species.getLearnsetData('duraludon').learnset.flash = ["9M"];
		this.species.getLearnsetData('duraludon').learnset.gravity = ["9M"];
		this.species.getLearnsetData('duraludon').learnset.honeclaws = ["9M"];
		this.species.getLearnsetData('duraludon').learnset.magnetrise = ["9M"];
		this.species.getLearnsetData('duraludon').learnset.rockpolish = ["9M"];
		this.species.getLearnsetData('duraludon').learnset.strength = ["9M"];
		delete this.species.getLearnsetData('duraludon').learnset.thunder;
		// Dreepy
		this.species.getLearnsetData('dreepy').learnset.quickguard = ["9D"];
		this.species.getLearnsetData('dreepy').learnset.aerialace = ["9M"];
		this.species.getLearnsetData('dreepy').learnset.aquatail = ["9M"];
		this.species.getLearnsetData('dreepy').learnset.dragontail = ["9M"];
		this.species.getLearnsetData('dreepy').learnset.echoiedvoice = ["9M"];
		this.species.getLearnsetData('dreepy').learnset.embargo = ["9M"];
		this.species.getLearnsetData('dreepy').learnset.flamecharge = ["9M"];
		this.species.getLearnsetData('dreepy').learnset.gravity = ["9M"];
		this.species.getLearnsetData('dreepy').learnset.magiccoat = ["9M"];
		this.species.getLearnsetData('dreepy').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('dreepy').learnset.psychup = ["9M"];
		this.species.getLearnsetData('dreepy').learnset.painsplit = ["9M"];
		this.species.getLearnsetData('dreepy').learnset.snatch = ["9M"];
		this.species.getLearnsetData('dreepy').learnset.spite = ["9M"];
		// Drakloak
		this.species.getLearnsetData('drakloak').learnset.quickguard = ["9D"];
		this.species.getLearnsetData('drakloak').learnset.aerialace = ["9M"];
		this.species.getLearnsetData('drakloak').learnset.aquatail = ["9M"];
		this.species.getLearnsetData('drakloak').learnset.dragontail = ["9M"];
		this.species.getLearnsetData('drakloak').learnset.echoiedvoice = ["9M"];
		this.species.getLearnsetData('drakloak').learnset.embargo = ["9M"];
		this.species.getLearnsetData('drakloak').learnset.flamecharge = ["9M"];
		this.species.getLearnsetData('drakloak').learnset.gravity = ["9M"];
		this.species.getLearnsetData('drakloak').learnset.magiccoat = ["9M"];
		this.species.getLearnsetData('drakloak').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('drakloak').learnset.psychup = ["9M"];
		this.species.getLearnsetData('drakloak').learnset.painsplit = ["9M"];
		this.species.getLearnsetData('drakloak').learnset.snatch = ["9M"];
		this.species.getLearnsetData('drakloak').learnset.spite = ["9M"];
		delete this.species.getLearnsetData('drakloak').learnset.thunder;
		// Dragapult
		this.species.getLearnsetData('dragapult').learnset.quickguard = ["9D"];
		this.species.getLearnsetData('dragapult').learnset.aerialace = ["9M"];
		this.species.getLearnsetData('dragapult').learnset.aquatail = ["9M"];
		this.species.getLearnsetData('dragapult').learnset.dragontail = ["9M"];
		this.species.getLearnsetData('dragapult').learnset.echoiedvoice = ["9M"];
		this.species.getLearnsetData('dragapult').learnset.embargo = ["9M"];
		this.species.getLearnsetData('dragapult').learnset.flamecharge = ["9M"];
		this.species.getLearnsetData('dragapult').learnset.gravity = ["9M"];
		this.species.getLearnsetData('dragapult').learnset.magiccoat = ["9M"];
		this.species.getLearnsetData('dragapult').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('dragapult').learnset.psychup = ["9M"];
		this.species.getLearnsetData('dragapult').learnset.painsplit = ["9M"];
		this.species.getLearnsetData('dragapult').learnset.smackdown = ["9M"];
		this.species.getLearnsetData('dragapult').learnset.snatch = ["9M"];
		this.species.getLearnsetData('dragapult').learnset.spite = ["9M"];
		delete this.species.getLearnsetData('dragapult').learnset.thunder;
		// Zacian
		this.species.getLearnsetData('zacian').learnset.meteorassault = ["9D"];
		this.species.getLearnsetData('zacian').learnset.metaledge = ["9L33"];
		this.species.getLearnsetData('zacian').learnset.playrough = ["9L66"];
		this.species.getLearnsetData('zacian').learnset.aerialace = ["9M"];
		this.species.getLearnsetData('zacian').learnset.chipaway = ["9M"];
		this.species.getLearnsetData('zacian').learnset.echoidvoice = ["9M"];
		this.species.getLearnsetData('zacian').learnset.endeavor = ["9M"];
		this.species.getLearnsetData('zacian').learnset.healbell = ["9M"];
		this.species.getLearnsetData('zacian').learnset.honeclaws = ["9M"];
		this.species.getLearnsetData('zacian').learnset.ironhead = ["9M"];
		this.species.getLearnsetData('zacian').learnset.naturepower = ["9M"];
		this.species.getLearnsetData('zacian').learnset.quash = ["9M"];
		this.species.getLearnsetData('zacian').learnset.strength = ["9M"];
		this.species.getLearnsetData('zacian').learnset.xscissor = ["9M"];
		delete this.species.getLearnsetData('zacian').learnset.moonblast;
		// Zacian Crowned
		this.species.getLearnsetData('zaciancrowned').learnset.meteorassault = ["9D"];
		this.species.getLearnsetData('zaciancrowned').learnset.playrough = ["9L66"];
		this.species.getLearnsetData('zaciancrowned').learnset.aerialace = ["9M"];
		this.species.getLearnsetData('zaciancrowned').learnset.chipaway = ["9M"];
		this.species.getLearnsetData('zaciancrowned').learnset.echoidvoice = ["9M"];
		this.species.getLearnsetData('zaciancrowned').learnset.endeavor = ["9M"];
		this.species.getLearnsetData('zaciancrowned').learnset.healbell = ["9M"];
		this.species.getLearnsetData('zaciancrowned').learnset.honeclaws = ["9M"];
		this.species.getLearnsetData('zaciancrowned').learnset.naturepower = ["9M"];
		this.species.getLearnsetData('zaciancrowned').learnset.quash = ["9M"];
		this.species.getLearnsetData('zaciancrowned').learnset.strength = ["9M"];
		this.species.getLearnsetData('zaciancrowned').learnset.xscissor = ["9M"];
		delete this.species.getLearnsetData('zaciancrowned').learnset.moonblast;
		// Zamazenta
		this.species.getLearnsetData('zamazenta').learnset.kingsshield = ["9D"];
		this.species.getLearnsetData('zamazenta').learnset.playrough = ["9L66"];
		this.species.getLearnsetData('zamazenta').learnset.aerialace = ["9M"];
		this.species.getLearnsetData('zamazenta').learnset.block = ["9M"];
		this.species.getLearnsetData('zamazenta').learnset.chipaway = ["9M"];
		this.species.getLearnsetData('zamazenta').learnset.echoidvoice = ["9M"];
		this.species.getLearnsetData('zamazenta').learnset.endeavor = ["9M"];
		this.species.getLearnsetData('zamazenta').learnset.fullcollide = ["9M"];
		this.species.getLearnsetData('zamazenta').learnset.healbell = ["9M"];
		this.species.getLearnsetData('zamazenta').learnset.honeclaws = ["9M"];
		this.species.getLearnsetData('zamazenta').learnset.magiccoat = ["9M"];
		this.species.getLearnsetData('zamazenta').learnset.naturepower = ["9M"];
		this.species.getLearnsetData('zamazenta').learnset.quash = ["9M"];
		this.species.getLearnsetData('zamazenta').learnset.rocksmash = ["9M"];
		this.species.getLearnsetData('zamazenta').learnset.strength = ["9M"];
		delete this.species.getLearnsetData('zamazenta').learnset.moonblast;
		// Zamazenta Crowned
		this.species.getLearnsetData('zamazentacrowned').learnset.kingsshield = ["9D"];
		this.species.getLearnsetData('zamazentacrowned').learnset.playrough = ["9L66"];
		this.species.getLearnsetData('zamazentacrowned').learnset.aerialace = ["9M"];
		this.species.getLearnsetData('zamazentacrowned').learnset.block = ["9M"];
		this.species.getLearnsetData('zamazentacrowned').learnset.chipaway = ["9M"];
		this.species.getLearnsetData('zamazentacrowned').learnset.echoidvoice = ["9M"];
		this.species.getLearnsetData('zamazentacrowned').learnset.endeavor = ["9M"];
		this.species.getLearnsetData('zamazentacrowned').learnset.fullcollide = ["9M"];
		this.species.getLearnsetData('zamazentacrowned').learnset.healbell = ["9M"];
		this.species.getLearnsetData('zamazentacrowned').learnset.honeclaws = ["9M"];
		this.species.getLearnsetData('zamazentacrowned').learnset.magiccoat = ["9M"];
		this.species.getLearnsetData('zamazentacrowned').learnset.naturepower = ["9M"];
		this.species.getLearnsetData('zamazentacrowned').learnset.quash = ["9M"];
		this.species.getLearnsetData('zamazentacrowned').learnset.rocksmash = ["9M"];
		this.species.getLearnsetData('zamazentacrowned').learnset.strength = ["9M"];
		delete this.species.getLearnsetData('zamazentacrowned').learnset.moonblast;
		// Eternatus
		this.species.getLearnsetData('eternatus').learnset.growth = ["9D"];
		this.species.getLearnsetData('eternatus').learnset.toxic = ["9L8","9M"];
		this.species.getLearnsetData('eternatus').learnset.aquatail = ["9M"];
		this.species.getLearnsetData('eternatus').learnset.chargebeam = ["9M"];
		this.species.getLearnsetData('eternatus').learnset.dragontail = ["9M"];
		this.species.getLearnsetData('eternatus').learnset.dreameater = ["9M"];
		this.species.getLearnsetData('eternatus').learnset.gravity = ["9M"];
		this.species.getLearnsetData('eternatus').learnset.magnetrise = ["9M"];
		this.species.getLearnsetData('eternatus').learnset.shockwave = ["9M"];
		this.species.getLearnsetData('eternatus').learnset.signalbeam = ["9M"];
		this.species.getLearnsetData('eternatus').learnset.strength = ["9M"];
		// Kubfu
		this.species.getLearnsetData('kubfu').learnset.aurasphere = ["9D"];
		this.species.getLearnsetData('kubfu').learnset.karatechop = ["9L12"];
		this.species.getLearnsetData('kubfu').learnset.rollingkick = ["9L24"];
		this.species.getLearnsetData('kubfu').learnset.brickbreak = ["9L36", "9M"];
		this.species.getLearnsetData('kubfu').learnset.stormthrow = ["9L40"];
		this.species.getLearnsetData('kubfu').learnset.dynamicpunch = ["9L48"];
		this.species.getLearnsetData('kubfu').learnset.closecombat = ["9L56"];
		this.species.getLearnsetData('kubfu').learnset.aerialace = ["9M"];
		this.species.getLearnsetData('kubfu').learnset.chipaway = ["9M"];
		this.species.getLearnsetData('kubfu').learnset.dualchop = ["9M"];
		this.species.getLearnsetData('kubfu').learnset.ironhead = ["9M"];
		this.species.getLearnsetData('kubfu').learnset.laserfocus = ["9M"];
		this.species.getLearnsetData('kubfu').learnset.rocksmash = ["9M"];
		this.species.getLearnsetData('kubfu').learnset.strength = ["9M"];
		delete this.species.getLearnsetData('kubfu').learnset.uturn;
		// Urshifu
		this.species.getLearnsetData('urshifu').learnset.aurasphere = ["9D"];
		this.species.getLearnsetData('urshifu').learnset.karatechop = ["9L12"];
		this.species.getLearnsetData('urshifu').learnset.rollingkick = ["9L24"];
		this.species.getLearnsetData('urshifu').learnset.brickbreak = ["9L36", "9M"];
		this.species.getLearnsetData('urshifu').learnset.stormthrow = ["9L40"];
		this.species.getLearnsetData('urshifu').learnset.dynamicpunch = ["9L48"];
		this.species.getLearnsetData('urshifu').learnset.throatchop = ["9L56"];
		this.species.getLearnsetData('urshifu').learnset.closecombat = ["9L60"];
		this.species.getLearnsetData('urshifu').learnset.aerialace = ["9M"];
		this.species.getLearnsetData('urshifu').learnset.chipaway = ["9M"];
		this.species.getLearnsetData('urshifu').learnset.dualchop = ["9M"];
		this.species.getLearnsetData('urshifu').learnset.ironhead = ["9M"];
		this.species.getLearnsetData('urshifu').learnset.knockoff = ["9M"];
		this.species.getLearnsetData('urshifu').learnset.laserfocus = ["9M"];
		this.species.getLearnsetData('urshifu').learnset.lastresort = ["9M"];
		this.species.getLearnsetData('urshifu').learnset.rocksmash = ["9M"];
		this.species.getLearnsetData('urshifu').learnset.strength = ["9M"];
		this.species.getLearnsetData('urshifu').learnset.torment = ["9M"];
		delete this.species.getLearnsetData('urshifu').learnset.uturn;
		// Urshifu Rapid Strike
		this.species.getLearnsetData('urshifurapidstrike').learnset.aurasphere = ["9D"];
		this.species.getLearnsetData('urshifurapidstrike').learnset.karatechop = ["9L12"];
		this.species.getLearnsetData('urshifurapidstrike').learnset.rollingkick = ["9L24"];
		this.species.getLearnsetData('urshifurapidstrike').learnset.brickbreak = ["9L36", "9M"];
		this.species.getLearnsetData('urshifurapidstrike').learnset.stormthrow = ["9L40"];
		this.species.getLearnsetData('urshifurapidstrike').learnset.dynamicpunch = ["9L48"];
		this.species.getLearnsetData('urshifurapidstrike').learnset.jetpunch = ["9L56"];
		this.species.getLearnsetData('urshifurapidstrike').learnset.closecombat = ["9L60"];
		this.species.getLearnsetData('urshifurapidstrike').learnset.aerialace = ["9M"];
		this.species.getLearnsetData('urshifurapidstrike').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('urshifurapidstrike').learnset.chipaway = ["9M"];
		this.species.getLearnsetData('urshifurapidstrike').learnset.dualchop = ["9M"];
		this.species.getLearnsetData('urshifurapidstrike').learnset.endeavor = ["9M"];
		this.species.getLearnsetData('urshifurapidstrike').learnset.ironhead = ["9M"];
		this.species.getLearnsetData('urshifurapidstrike').learnset.knockoff = ["9M"];
		this.species.getLearnsetData('urshifurapidstrike').learnset.laserfocus = ["9M"];
		this.species.getLearnsetData('urshifurapidstrike').learnset.rocksmash = ["9M"];
		this.species.getLearnsetData('urshifurapidstrike').learnset.strength = ["9M"];
		this.species.getLearnsetData('urshifurapidstrike').learnset.torment = ["9M"];
		delete this.species.getLearnsetData('urshifurapidstrike').learnset.uturn;
		// Zarude
		this.species.getLearnsetData('zarude').learnset.beatup = ["9D"];
		this.species.getLearnsetData('zarude').learnset.aerialace = ["9M"];
		this.species.getLearnsetData('zarude').learnset.chipaway = ["9M"];
		this.species.getLearnsetData('zarude').learnset.echoedvoice = ["9M"];
		this.species.getLearnsetData('zarude').learnset.embargo = ["9M"];
		this.species.getLearnsetData('zarude').learnset.endeavor = ["9M"];
		this.species.getLearnsetData('zarude').learnset.dualchop = ["9M"];
		this.species.getLearnsetData('zarude').learnset.honeclaws = ["9M"];
		this.species.getLearnsetData('zarude').learnset.knockoff = ["9M"];
		this.species.getLearnsetData('zarude').learnset.laserfocus = ["9M"];
		this.species.getLearnsetData('zarude').learnset.lastresort = ["9M"];
		this.species.getLearnsetData('zarude').learnset.naturalgift = ["9M"];
		this.species.getLearnsetData('zarude').learnset.naturepower = ["9M"];
		this.species.getLearnsetData('zarude').learnset.quash = ["9M"];
		this.species.getLearnsetData('zarude').learnset.strength = ["9M"];
		this.species.getLearnsetData('zarude').learnset.synthesis = ["9M"];
		this.species.getLearnsetData('zarude').learnset.torment = ["9M"];
		this.species.getLearnsetData('zarude').learnset.xscissor = ["9M"];
		// Regieleki
		this.species.getLearnsetData('regieleki').learnset.charge = ["9D"];
		this.species.getLearnsetData('regieleki').learnset.flash = ["9M"];
		this.species.getLearnsetData('regieleki').learnset.shockwave = ["9M"];
		// Regidrago
		this.species.getLearnsetData('regidrago').learnset.jawlock = ["9D"];
		this.species.getLearnsetData('regidrago').learnset.block = ["9M"];
		this.species.getLearnsetData('regidrago').learnset.fullcollide = ["9M"];
		this.species.getLearnsetData('regidrago').learnset.rockpolish = ["9M"];
		// Glastrier
		this.species.getLearnsetData('glastrier').learnset.iciclespear = ["9D"];
		this.species.getLearnsetData('glastrier').learnset.highhorsepower = ["9L54"];
		this.species.getLearnsetData('glastrier').learnset.thrash = ["9L60"];
		this.species.getLearnsetData('glastrier').learnset.taunt = ["9L66"];
		this.species.getLearnsetData('glastrier').learnset.doubleedge = ["9L72"];
		this.species.getLearnsetData('glastrier').learnset.swordsdance = ["9L78", "9M"];
		this.species.getLearnsetData('glastrier').learnset.block = ["9M"];
		this.species.getLearnsetData('glastrier').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('glastrier').learnset.frostbreath = ["9M"];
		this.species.getLearnsetData('glastrier').learnset.rockpolish = ["9M"];
		this.species.getLearnsetData('glastrier').learnset.rocksmash = ["9M"];
		this.species.getLearnsetData('glastrier').learnset.strength = ["9M"];
		// Spectrier
		this.species.getLearnsetData('spectrier').learnset.shadowsneak = ["9D"];
		this.species.getLearnsetData('spectrier').learnset.highhorsepower = ["9L54"];
		this.species.getLearnsetData('spectrier').learnset.thrash = ["9L60"];
		this.species.getLearnsetData('spectrier').learnset.disable = ["9L66"];
		this.species.getLearnsetData('spectrier').learnset.doubleedge = ["9L72"];
		this.species.getLearnsetData('spectrier').learnset.nastyplot = ["9L78", "9M"];
		this.species.getLearnsetData('spectrier').learnset.dreameater = ["9M"];
		this.species.getLearnsetData('spectrier').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('spectrier').learnset.painsplit = ["9M"];
		this.species.getLearnsetData('spectrier').learnset.spite = ["9M"];
		// Calyrex
		this.species.getLearnsetData('calyrex').learnset.solarblade = ["9D"];
		this.species.getLearnsetData('calyrex').learnset.embargo = ["9M"];
		this.species.getLearnsetData('calyrex').learnset.magiccoat = ["9M"];
		this.species.getLearnsetData('calyrex').learnset.naturalgift = ["9M"];
		this.species.getLearnsetData('calyrex').learnset.naturepower = ["9M"];
		this.species.getLearnsetData('calyrex').learnset.quash = ["9M"];
		this.species.getLearnsetData('calyrex').learnset.synthesis = ["9M"];
		this.species.getLearnsetData('calyrex').learnset.telekinesis = ["9M"];
		// Calyrex Ice Rider
		this.species.getLearnsetData('calyrexice').learnset.solarblade = ["9D"];
		this.species.getLearnsetData('calyrexice').learnset.glaciallance = ["9R"];
		this.species.getLearnsetData('calyrexice').learnset.highhorsepower = ["9L1"];
		this.species.getLearnsetData('calyrexice').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('calyrexice').learnset.embargo = ["9M"];
		this.species.getLearnsetData('calyrexice').learnset.magiccoat = ["9M"];
		this.species.getLearnsetData('calyrexice').learnset.naturalgift = ["9M"];
		this.species.getLearnsetData('calyrexice').learnset.naturepower = ["9M"];
		this.species.getLearnsetData('calyrexice').learnset.quash = ["9M"];
		this.species.getLearnsetData('calyrexice').learnset.synthesis = ["9M"];
		this.species.getLearnsetData('calyrexice').learnset.telekinesis = ["9M"];
		this.species.getLearnsetData('calyrexice').learnset.block = ["9M"];
		this.species.getLearnsetData('calyrexice').learnset.frostbreath = ["9M"];
		this.species.getLearnsetData('calyrexice').learnset.rockpolish = ["9M"];
		this.species.getLearnsetData('calyrexice').learnset.rocksmash = ["9M"];
		this.species.getLearnsetData('calyrexice').learnset.strength = ["9M"];
		// Calyrex Shadow Rider
		this.species.getLearnsetData('calyrexshadow').learnset.solarblade = ["9D"];
		this.species.getLearnsetData('calyrexshadow').learnset.astralbarrage = ["9R"];
		this.species.getLearnsetData('calyrexshadow').learnset.highhorsepower = ["9L1"];
		this.species.getLearnsetData('calyrexshadow').learnset.embargo = ["9M"];
		this.species.getLearnsetData('calyrexshadow').learnset.magiccoat = ["9M"];
		this.species.getLearnsetData('calyrexshadow').learnset.naturalgift = ["9M"];
		this.species.getLearnsetData('calyrexshadow').learnset.naturepower = ["9M"];
		this.species.getLearnsetData('calyrexshadow').learnset.quash = ["9M"];
		this.species.getLearnsetData('calyrexshadow').learnset.synthesis = ["9M"];
		this.species.getLearnsetData('calyrexshadow').learnset.telekinesis = ["9M"];
		this.species.getLearnsetData('calyrexshadow').learnset.dreameater = ["9M"];
		this.species.getLearnsetData('calyrexshadow').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('calyrexshadow').learnset.painsplit = ["9M"];
		this.species.getLearnsetData('calyrexshadow').learnset.spite = ["9M"];
		// Wyrdeer
		this.species.getLearnsetData('wyrdeer').learnset.followme = ["9D"];
		this.species.getLearnsetData('wyrdeer').learnset.gravity = ["9M"];
		this.species.getLearnsetData('wyrdeer').learnset.magiccoat = ["9M"];
		this.species.getLearnsetData('wyrdeer').learnset.psychup = ["9M"];
		this.species.getLearnsetData('wyrdeer').learnset.roleplay = ["9M"];
		this.species.getLearnsetData('wyrdeer').learnset.spite = ["9M"];
		// Kleavor
		this.species.getLearnsetData('kleavor').learnset.guillotine = ["9D"];
		this.species.getLearnsetData('kleavor').learnset.pursuit = ["9L12"];
		this.species.getLearnsetData('kleavor').learnset.cut = ["9L16"];
		this.species.getLearnsetData('kleavor').learnset.razorwind = ["9L52"];
		this.species.getLearnsetData('kleavor').learnset.feint = ["9L56"];
		delete this.species.getLearnsetData('kleavor').learnset.doubleteam;
		delete this.species.getLearnsetData('kleavor').learnset.doublehit;
		// Ursaluna
		this.species.getLearnsetData('ursaluna').learnset.slackoff = ["9D"];
		this.species.getLearnsetData('ursaluna').learnset.highhorsepower = ["9L0"];
		this.species.getLearnsetData('ursaluna').learnset.rototiller = ["9L1"];
		this.species.getLearnsetData('ursaluna').learnset.knockoff = ["9M"];
		this.species.getLearnsetData('ursaluna').learnset.naturalgift = ["9M"];
		delete this.species.getLearnsetData('ursaluna').learnset.drainpunch;
		// Basculegion F
		this.species.getLearnsetData('basculegionf').learnset.metalburst = ["9D"];
		this.species.getLearnsetData('basculegionf').learnset.shadowsneak = ["9L1"];
		this.species.getLearnsetData('basculegionf').learnset.whitewater = ["9L8"];
		this.species.getLearnsetData('basculegionf').learnset.flail = ["9L12", "9M"];
		this.species.getLearnsetData('basculegionf').learnset.aquajet = ["9L16"];
		this.species.getLearnsetData('basculegionf').learnset.bite = ["9L20"];
		this.species.getLearnsetData('basculegionf').learnset.scaryface = ["9L24"];
		this.species.getLearnsetData('basculegionf').learnset.headbutt = ["9L28"];
		this.species.getLearnsetData('basculegionf').learnset.soak = ["9L32"];
		this.species.getLearnsetData('basculegionf').learnset.crunch = ["9L36"];
		this.species.getLearnsetData('basculegionf').learnset.takedown = ["9L40"];
		this.species.getLearnsetData('basculegionf').learnset.lastrespects = ["9L44"];
		this.species.getLearnsetData('basculegionf').learnset.uproar = ["9L48", "9M"];
		this.species.getLearnsetData('basculegionf').learnset.doubleedge = ["9L52"];
		this.species.getLearnsetData('basculegionf').learnset.thrash = ["9L56"];
		this.species.getLearnsetData('basculegionf').learnset.wavecrash = ["9L60"];
		this.species.getLearnsetData('basculegionf').learnset.headsmash = ["9L64"];
		this.species.getLearnsetData('basculegionf').learnset.phantomforce = ["9L68", "9M"];
		this.species.getLearnsetData('basculegionf').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('basculegionf').learnset.painsplit = ["9M"];
		this.species.getLearnsetData('basculegionf').learnset.poltergeist = ["9M"];
		this.species.getLearnsetData('basculegionf').learnset.spite = ["9M"];
		// Basculegion
		this.species.getLearnsetData('basculegion').learnset.reversal = ["9D"];
		this.species.getLearnsetData('basculegion').learnset.shadowsneak = ["9L1"];
		this.species.getLearnsetData('basculegion').learnset.whitewater = ["9L8"];
		this.species.getLearnsetData('basculegion').learnset.flail = ["9L12", "9M"];
		this.species.getLearnsetData('basculegion').learnset.aquajet = ["9L16"];
		this.species.getLearnsetData('basculegion').learnset.bite = ["9L20"];
		this.species.getLearnsetData('basculegion').learnset.scaryface = ["9L24"];
		this.species.getLearnsetData('basculegion').learnset.headbutt = ["9L28"];
		this.species.getLearnsetData('basculegion').learnset.soak = ["9L32"];
		this.species.getLearnsetData('basculegion').learnset.crunch = ["9L36"];
		this.species.getLearnsetData('basculegion').learnset.takedown = ["9L40"];
		this.species.getLearnsetData('basculegion').learnset.lastrespects = ["9L44"];
		this.species.getLearnsetData('basculegion').learnset.uproar = ["9L48", "9M"];
		this.species.getLearnsetData('basculegion').learnset.doubleedge = ["9L52"];
		this.species.getLearnsetData('basculegion').learnset.thrash = ["9L56"];
		this.species.getLearnsetData('basculegion').learnset.wavecrash = ["9L60"];
		this.species.getLearnsetData('basculegion').learnset.headsmash = ["9L64"];
		this.species.getLearnsetData('basculegion').learnset.phantomforce = ["9L68", "9M"];
		this.species.getLearnsetData('basculegion').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('basculegion').learnset.painsplit = ["9M"];
		this.species.getLearnsetData('basculegion').learnset.poltergeist = ["9M"];
		this.species.getLearnsetData('basculegion').learnset.spite = ["9M"];
		// Sneasler
		this.species.getLearnsetData('sneasler').learnset.razorwind = ["9D"];
		this.species.getLearnsetData('sneasler').learnset.knockoff = ["9M"];
		// Overqwil
		this.species.getLearnsetData('overqwil').learnset.fellstinger = ["9D"];
		this.species.getLearnsetData('overqwil').learnset.mortalstrike = ["9L60"];
		this.species.getLearnsetData('overqwil').learnset.compensation = ["9M"];
		this.species.getLearnsetData('overqwil').learnset.painsplit = ["9M"];
		this.species.getLearnsetData('overqwil').learnset.torment = ["9M"];
		// Enamorus
		this.species.getLearnsetData('enamorus').learnset.sweetscent = ["9D"];
		this.species.getLearnsetData('enamorus').learnset.captivate = ["9L1"];
		this.species.getLearnsetData('enamorus').learnset.fairywind = ["9L1"];
		this.species.getLearnsetData('enamorus').learnset.constrict = ["9L1"];
		this.species.getLearnsetData('enamorus').learnset.flatter = ["9L1"];
		this.species.getLearnsetData('enamorus').learnset.punishment = ["9L7"];
		this.species.getLearnsetData('enamorus').learnset.magicalleaf = ["9L13"];
		this.species.getLearnsetData('enamorus').learnset.drainingkiss = ["9L19"];
		this.species.getLearnsetData('enamorus').learnset.extrasensory = ["9L25"];
		this.species.getLearnsetData('enamorus').learnset.nastyplot = ["9L31", "9M"];
		this.species.getLearnsetData('enamorus').learnset.playrough = ["9L37"];
		this.species.getLearnsetData('enamorus').learnset.petalblizzard = ["9L43"];
		this.species.getLearnsetData('enamorus').learnset.moonblast = ["9L49"];
		this.species.getLearnsetData('enamorus').learnset.attract = ["9L55", "9M"];
		this.species.getLearnsetData('enamorus').learnset.healingwish = ["9L61"];
		this.species.getLearnsetData('enamorus').learnset.foulplay = ["9L67", "9M"];
		this.species.getLearnsetData('enamorus').learnset.bind = ["9L73"];
		this.species.getLearnsetData('enamorus').learnset.petaldance = ["9L79"];
		this.species.getLearnsetData('enamorus').learnset.charm = ["9M"];
		this.species.getLearnsetData('enamorus').learnset.compensation = ["9M"];
		this.species.getLearnsetData('enamorus').learnset.dreameater = ["9M"];
		this.species.getLearnsetData('enamorus').learnset.magiccoat = ["9M"];
		this.species.getLearnsetData('enamorus').learnset.metronome = ["9M"];
		this.species.getLearnsetData('enamorus').learnset.naturalgift = ["9M"];
		this.species.getLearnsetData('enamorus').learnset.naturepower = ["9M"];
		this.species.getLearnsetData('enamorus').learnset.spite = ["9M"];
		// Enamorus Therian
		this.species.getLearnsetData('enamorustherian').learnset.coil = ["9D"];
		delete this.species.getLearnsetData('enamorustherian').learnset.sweetscent;
		// Sprigatito
		this.species.getLearnsetData('sprigatito').learnset.aromatherapy = ["9D"];
		this.species.getLearnsetData('sprigatito').learnset.honeclaws = ["9M"];
		this.species.getLearnsetData('sprigatito').learnset.lastresort = ["9M"];
		this.species.getLearnsetData('sprigatito').learnset.naturepower = ["9M"];
		this.species.getLearnsetData('sprigatito').learnset.retaliate = ["9M"];
		this.species.getLearnsetData('sprigatito').learnset.snatch = ["9M"];
		this.species.getLearnsetData('sprigatito').learnset.synthesis = ["9M"];
		delete this.species.getLearnsetData('sprigatito').learnset.allyswitch;
		// Floragato
		this.species.getLearnsetData('floragato').learnset.needlearm = ["9D"];
		this.species.getLearnsetData('floragato').learnset.dualchop = ["9M"];
		this.species.getLearnsetData('floragato').learnset.embargo = ["9M"];
		this.species.getLearnsetData('floragato').learnset.honeclaws = ["9M"];
		this.species.getLearnsetData('floragato').learnset.knockoff = ["9M"];
		this.species.getLearnsetData('floragato').learnset.lastresort = ["9M"];
		this.species.getLearnsetData('floragato').learnset.naturepower = ["9M"];
		this.species.getLearnsetData('floragato').learnset.payback = ["9M"];
		this.species.getLearnsetData('floragato').learnset.retaliate = ["9M"];
		this.species.getLearnsetData('floragato').learnset.snatch = ["9M"];
		this.species.getLearnsetData('floragato').learnset.stringshot = ["9M"];
		this.species.getLearnsetData('floragato').learnset.synthesis = ["9M"];
		this.species.getLearnsetData('floragato').learnset.torment = ["9M"];
		// Meowscarada
		this.species.getLearnsetData('meowscarada').learnset.pollenpuff = ["9D"];
		this.species.getLearnsetData('meowscarada').learnset.knockoff = ["9L52", "9M"];
		this.species.getLearnsetData('meowscarada').learnset.allyswitch = ["9M"];
		this.species.getLearnsetData('meowscarada').learnset.assurance = ["9M"];
		this.species.getLearnsetData('meowscarada').learnset.dualchop = ["9M"];
		this.species.getLearnsetData('meowscarada').learnset.embargo = ["9M"];
		this.species.getLearnsetData('meowscarada').learnset.honeclaws = ["9M"];
		this.species.getLearnsetData('meowscarada').learnset.lastresort = ["9M"];
		this.species.getLearnsetData('meowscarada').learnset.naturepower = ["9M"];
		this.species.getLearnsetData('meowscarada').learnset.payback = ["9M"];
		this.species.getLearnsetData('meowscarada').learnset.retaliate = ["9M"];
		this.species.getLearnsetData('meowscarada').learnset.roleplay = ["9M"];
		this.species.getLearnsetData('meowscarada').learnset.smackdown = ["9M"];
		this.species.getLearnsetData('meowscarada').learnset.snatch = ["9M"];
		this.species.getLearnsetData('meowscarada').learnset.stringshot = ["9M"];
		this.species.getLearnsetData('meowscarada').learnset.synthesis = ["9M"];
		this.species.getLearnsetData('meowscarada').learnset.torment = ["9M"];
		// Fuecoco
		this.species.getLearnsetData('fuecoco').learnset.flameburst = ["9D"];
		this.species.getLearnsetData('fuecoco').learnset.block = ["9M"];
		this.species.getLearnsetData('fuecoco').learnset.echoedvoice = ["9M"];
		this.species.getLearnsetData('fuecoco').learnset.incinerate = ["9L15", "9M"];
		this.species.getLearnsetData('fuecoco').learnset.irontail = ["9M"];
		this.species.getLearnsetData('fuecoco').learnset.screech = ["9M"];
		this.species.getLearnsetData('fuecoco').learnset.strength = ["9M"];
		// Crocalor
		this.species.getLearnsetData('crocalor').learnset.flameburst = ["9D"];
		this.species.getLearnsetData('crocalor').learnset.block = ["9M"];
		this.species.getLearnsetData('crocalor').learnset.echoedvoice = ["9M"];
		this.species.getLearnsetData('crocalor').learnset.flash = ["9M"];
		this.species.getLearnsetData('crocalor').learnset.incinerate = ["9L15", "9M"];
		this.species.getLearnsetData('crocalor').learnset.irontail = ["9M"];
		this.species.getLearnsetData('crocalor').learnset.screech = ["9M"];
		this.species.getLearnsetData('crocalor').learnset.strength = ["9M"];
		// Skeledirge
		this.species.getLearnsetData('skeledirge').learnset.perishsong = ["9D"];
		this.species.getLearnsetData('skeledirge').learnset.assurance = ["9M"];
		this.species.getLearnsetData('skeledirge').learnset.block = ["9M"];
		this.species.getLearnsetData('skeledirge').learnset.breakingswipe = ["9M"];
		this.species.getLearnsetData('skeledirge').learnset.echoedvoice = ["9M"];
		this.species.getLearnsetData('skeledirge').learnset.flash = ["9M"];
		this.species.getLearnsetData('skeledirge').learnset.incinerate = ["9L15", "9M"];
		this.species.getLearnsetData('skeledirge').learnset.irontail = ["9M"];
		this.species.getLearnsetData('skeledirge').learnset.knockoff = ["9M"];
		this.species.getLearnsetData('skeledirge').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('skeledirge').learnset.screech = ["9M"];
		this.species.getLearnsetData('skeledirge').learnset.strength = ["9M"];
		this.species.getLearnsetData('skeledirge').learnset.spite = ["9M"];
		// Quaxly
		this.species.getLearnsetData('quaxly').learnset.teeterdance = ["9D"];
		this.species.getLearnsetData('quaxly').learnset.bounce = ["9M"];
		this.species.getLearnsetData('quaxly').learnset.dive = ["9M"];
		this.species.getLearnsetData('quaxly').learnset.knockoff = ["9M"];
		this.species.getLearnsetData('quaxly').learnset.rocksmash = ["9M"];
		this.species.getLearnsetData('quaxly').learnset.scald = ["9M"];
		this.species.getLearnsetData('quaxly').learnset.torment = ["9M"];
		this.species.getLearnsetData('quaxly').learnset.whirlpool = ["9M"];
		// Quaxwell
		this.species.getLearnsetData('quaxwell').learnset.teeterdance = ["9D"];
		this.species.getLearnsetData('quaxwell').learnset.bounce = ["9M"];
		this.species.getLearnsetData('quaxwell').learnset.chipaway = ["9M"];
		this.species.getLearnsetData('quaxwell').learnset.dive = ["9M"];
		this.species.getLearnsetData('quaxwell').learnset.dualchop = ["9M"];
		this.species.getLearnsetData('quaxwell').learnset.knockoff = ["9M"];
		this.species.getLearnsetData('quaxwell').learnset.rocksmash = ["9M"];
		this.species.getLearnsetData('quaxwell').learnset.scald = ["9M"];
		this.species.getLearnsetData('quaxwell').learnset.torment = ["9M"];
		this.species.getLearnsetData('quaxwell').learnset.whirlpool = ["9M"];
		// Quaquaval
		this.species.getLearnsetData('quaquaval').learnset.victorydance = ["9D"];
		this.species.getLearnsetData('quaquaval').learnset.bounce = ["9M"];
		this.species.getLearnsetData('quaquaval').learnset.chipaway = ["9M"];
		this.species.getLearnsetData('quaquaval').learnset.dive = ["9M"];
		this.species.getLearnsetData('quaquaval').learnset.dualchop = ["9M"];
		this.species.getLearnsetData('quaquaval').learnset.knockoff = ["9M"];
		this.species.getLearnsetData('quaquaval').learnset.irontail = ["9M"];
		this.species.getLearnsetData('quaquaval').learnset.rocksmash = ["9M"];
		this.species.getLearnsetData('quaquaval').learnset.roleplay = ["9M"];
		this.species.getLearnsetData('quaquaval').learnset.scald = ["9M"];
		this.species.getLearnsetData('quaquaval').learnset.torment = ["9M"];
		this.species.getLearnsetData('quaquaval').learnset.whirlpool = ["9M"];
		// Lechonk
		this.species.getLearnsetData('lechonk').learnset.rollout = ["9D"];
		this.species.getLearnsetData('lechonk').learnset.odorsleuth = ["9L15"];
		this.species.getLearnsetData('lechonk').learnset.covet = ["9L17"];
		this.species.getLearnsetData('lechonk').learnset.dig = ["9L21", "9M"];
		this.species.getLearnsetData('lechonk').learnset.sweetscent = ["9L24"];
		this.species.getLearnsetData('lechonk').learnset.headbutt = ["9L27"];
		this.species.getLearnsetData('lechonk').learnset.yawn = ["9L30"];
		this.species.getLearnsetData('lechonk').learnset.takedown = ["9L33"];
		this.species.getLearnsetData('lechonk').learnset.workup = ["9L36", "9M"];
		this.species.getLearnsetData('lechonk').learnset.uproar = ["9L39", "9M"];
		this.species.getLearnsetData('lechonk').learnset.doubleedge = ["9L42"];
		this.species.getLearnsetData('lechonk').learnset.echoedvoice = ["9M"];
		this.species.getLearnsetData('lechonk').learnset.endeavor = ["9M"];
		this.species.getLearnsetData('lechonk').learnset.recycle = ["9M"];
		this.species.getLearnsetData('lechonk').learnset.screech = ["9M"];
		// Oinkologne F
		this.species.getLearnsetData('oinkolognef').learnset.flatter = ["9D"];
		this.species.getLearnsetData('oinkolognef').learnset.odorsleuth = ["9L14"];
		this.species.getLearnsetData('oinkolognef').learnset.covet = ["9L17"];
		this.species.getLearnsetData('oinkolognef').learnset.dig = ["9L23", "9M"];
		this.species.getLearnsetData('oinkolognef').learnset.sweetscent = ["9L27"];
		this.species.getLearnsetData('oinkolognef').learnset.headbutt = ["9L31"];
		this.species.getLearnsetData('oinkolognef').learnset.yawn = ["9L35"];
		this.species.getLearnsetData('oinkolognef').learnset.takedown = ["9L38"];
		this.species.getLearnsetData('oinkolognef').learnset.workup = ["9L44", "9M"];
		this.species.getLearnsetData('oinkolognef').learnset.uproar = ["9L48", "9M"];
		this.species.getLearnsetData('oinkolognef').learnset.doubleedge = ["9L52"];
		this.species.getLearnsetData('oinkolognef').learnset.earthpower = ["9L56"];
		this.species.getLearnsetData('oinkolognef').learnset.belch = ["9L59"];
		this.species.getLearnsetData('oinkolognef').learnset.echoedvoice = ["9M"];
		this.species.getLearnsetData('oinkolognef').learnset.endeavor = ["9M"];
		this.species.getLearnsetData('oinkolognef').learnset.magiccoat = ["9M"];
		this.species.getLearnsetData('oinkolognef').learnset.recycle = ["9M"];
		this.species.getLearnsetData('oinkolognef').learnset.retaliate = ["9M"];
		this.species.getLearnsetData('oinkolognef').learnset.screech = ["9M"];
		// Oinkologne
		this.species.getLearnsetData('oinkologne').learnset.captivate = ["9D"];
		this.species.getLearnsetData('oinkologne').learnset.odorsleuth = ["9L14"];
		this.species.getLearnsetData('oinkologne').learnset.covet = ["9L17"];
		this.species.getLearnsetData('oinkologne').learnset.dig = ["9L23", "9M"];
		this.species.getLearnsetData('oinkologne').learnset.sweetscent = ["9L27"];
		this.species.getLearnsetData('oinkologne').learnset.headbutt = ["9L31"];
		this.species.getLearnsetData('oinkologne').learnset.yawn = ["9L35"];
		this.species.getLearnsetData('oinkologne').learnset.takedown = ["9L38"];
		this.species.getLearnsetData('oinkologne').learnset.workup = ["9L44", "9M"];
		this.species.getLearnsetData('oinkologne').learnset.uproar = ["9L48", "9M"];
		this.species.getLearnsetData('oinkologne').learnset.doubleedge = ["9L52"];
		this.species.getLearnsetData('oinkologne').learnset.earthpower = ["9L56"];
		this.species.getLearnsetData('oinkologne').learnset.belch = ["9L59"];
		this.species.getLearnsetData('oinkologne').learnset.echoedvoice = ["9M"];
		this.species.getLearnsetData('oinkologne').learnset.endeavor = ["9M"];
		this.species.getLearnsetData('oinkologne').learnset.magiccoat = ["9M"];
		this.species.getLearnsetData('oinkologne').learnset.recycle = ["9M"];
		this.species.getLearnsetData('oinkologne').learnset.retaliate = ["9M"];
		this.species.getLearnsetData('oinkologne').learnset.screech = ["9M"];
		// Tarountula
		this.species.getLearnsetData('tarountula').learnset.rebound = ["9D"];
		this.species.getLearnsetData('tarountula').learnset.feintattack = ["9L8"];
		this.species.getLearnsetData('tarountula').learnset.springleap = ["9L14"];
		this.species.getLearnsetData('tarountula').learnset.bugbite = ["9L25", "9M"];
		this.species.getLearnsetData('tarountula').learnset.silktrap = ["9L36"];
		this.species.getLearnsetData('tarountula').learnset.spiderweb = ["9L40"];
		this.species.getLearnsetData('tarountula').learnset.ambush = ["9L44"];
		this.species.getLearnsetData('tarountula').learnset.electroweb = ["9M"];
		this.species.getLearnsetData('tarountula').learnset.infestation = ["9M"];
		this.species.getLearnsetData('tarountula').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('tarountula').learnset.signalbeam = ["9M"];
		this.species.getLearnsetData('tarountula').learnset.stringshot = ["9L1", "9M"];
		this.species.getLearnsetData('tarountula').learnset.toxic = ["9M"];
		this.species.getLearnsetData('tarountula').learnset.foresight = ["9E"];
		this.species.getLearnsetData('tarountula').learnset.toxicthread = ["9E"];
		delete this.species.getLearnsetData('tarountula').learnset.assurance;
		delete this.species.getLearnsetData('tarountula').learnset.headbutt;
		delete this.species.getLearnsetData('tarountula').learnset.circlethrow;
		delete this.species.getLearnsetData('tarountula').learnset.throatchop;
		delete this.species.getLearnsetData('tarountula').learnset.firstimpression;
		delete this.species.getLearnsetData('tarountula').learnset.trailhead;
		// Spidops
		this.species.getLearnsetData('spidops').learnset.spikes = ["9D"];
		this.species.getLearnsetData('spidops').learnset.lockon = ["9L0"];
		this.species.getLearnsetData('spidops').learnset.feintattack = ["9L8"];
		this.species.getLearnsetData('spidops').learnset.springleap = ["9L14"];
		this.species.getLearnsetData('spidops').learnset.bugbite = ["9L28", "9M"];
		this.species.getLearnsetData('spidops').learnset.silktrap = ["9L41"];
		this.species.getLearnsetData('spidops').learnset.spiderweb = ["9L45"];
		this.species.getLearnsetData('spidops').learnset.ambush = ["9L49"];
		this.species.getLearnsetData('spidops').learnset.assurance = ["9M"];
		this.species.getLearnsetData('spidops').learnset.compensation = ["9M"];
		this.species.getLearnsetData('spidops').learnset.electroweb = ["9M"];
		this.species.getLearnsetData('spidops').learnset.embargo = ["9M"];
		this.species.getLearnsetData('spidops').learnset.infestation = ["9M"];
		this.species.getLearnsetData('spidops').learnset.knockoff = ["9M"];
		this.species.getLearnsetData('spidops').learnset.lastresort = ["9M"];
		this.species.getLearnsetData('spidops').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('spidops').learnset.signalbeam = ["9M"];
		this.species.getLearnsetData('spidops').learnset.smackdown = ["9M"];
		this.species.getLearnsetData('spidops').learnset.snatch = ["9M"];
		this.species.getLearnsetData('spidops').learnset.stringshot = ["9L1", "9M"];
		this.species.getLearnsetData('spidops').learnset.toxic = ["9M"];
		delete this.species.getLearnsetData('spidops').learnset.headbutt;
		delete this.species.getLearnsetData('spidops').learnset.circlethrow;
		delete this.species.getLearnsetData('spidops').learnset.throatchop;
		// Nymble
		this.species.getLearnsetData('nymble').learnset.cut = ["9D"];
		this.species.getLearnsetData('nymble').learnset.springleap = ["922"];
		this.species.getLearnsetData('nymble').learnset.assurance = ["9L9", "9M"];
		this.species.getLearnsetData('nymble').learnset.bugbite = ["9M"];
		this.species.getLearnsetData('nymble').learnset.compensation = ["9M"];
		this.species.getLearnsetData('nymble').learnset.electroweb = ["9M"];
		this.species.getLearnsetData('nymble').learnset.endeavor = ["9M"];
		this.species.getLearnsetData('nymble').learnset.honeclaws = ["9M"];
		this.species.getLearnsetData('nymble').learnset.infestation = ["9M"];
		this.species.getLearnsetData('nymble').learnset.lastresort = ["9M"];
		this.species.getLearnsetData('nymble').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('nymble').learnset.painsplit = ["9M"];
		this.species.getLearnsetData('nymble').learnset.retaliate = ["9M"];
		this.species.getLearnsetData('nymble').learnset.screech = ["9L14", "9M"];
		this.species.getLearnsetData('nymble').learnset.signalbeam = ["9M"];
		// Lokix
		this.species.getLearnsetData('lokix').learnset.guillotine = ["9D"];
		this.species.getLearnsetData('lokix').learnset.springleap = ["922"];
		this.species.getLearnsetData('lokix').learnset.assurance = ["9L9", "9M"];
		this.species.getLearnsetData('lokix').learnset.bugbite = ["9M"];
		this.species.getLearnsetData('lokix').learnset.compensation = ["9M"];
		this.species.getLearnsetData('lokix').learnset.electroweb = ["9M"];
		this.species.getLearnsetData('lokix').learnset.endeavor = ["9M"];
		this.species.getLearnsetData('lokix').learnset.honeclaws = ["9M"];
		this.species.getLearnsetData('lokix').learnset.infestation = ["9M"];
		this.species.getLearnsetData('lokix').learnset.lastresort = ["9M"];
		this.species.getLearnsetData('lokix').learnset.payback = ["9M"];
		this.species.getLearnsetData('lokix').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('lokix').learnset.painsplit = ["9M"];
		this.species.getLearnsetData('lokix').learnset.retaliate = ["9M"];
		this.species.getLearnsetData('lokix').learnset.screech = ["9L14", "9M"];
		this.species.getLearnsetData('lokix').learnset.signalbeam = ["9M"];
		// Pawmi
		this.species.getLearnsetData('pawmi').learnset.zingzap = ["9D"];
		this.species.getLearnsetData('pawmi').learnset.smellingsalts = ["9L17"];
		this.species.getLearnsetData('pawmi').learnset.spark = ["9L21"];
		this.species.getLearnsetData('pawmi').learnset.thunderwave = ["9L24", "9M"];
		this.species.getLearnsetData('pawmi').learnset.entrainment = ["9L26"];
		this.species.getLearnsetData('pawmi').learnset.slam = ["9L30"];
		this.species.getLearnsetData('pawmi').learnset.discharge = ["9L33"];
		this.species.getLearnsetData('pawmi').learnset.agility = ["9L35"];
		this.species.getLearnsetData('pawmi').learnset.wildcharge = ["9L37", "9M"];
		this.species.getLearnsetData('pawmi').learnset.afteryou = ["9M"];
		this.species.getLearnsetData('pawmi').learnset.eerieimpulse = ["9M"];
		this.species.getLearnsetData('pawmi').learnset.electroweb = ["9M"];
		this.species.getLearnsetData('pawmi').learnset.flash = ["9M"];
		this.species.getLearnsetData('pawmi').learnset.knockoff = ["9M"];
		this.species.getLearnsetData('pawmi').learnset.magnetrise = ["9M"];
		this.species.getLearnsetData('pawmi').learnset.retaliate = ["9M"];
		this.species.getLearnsetData('pawmi').learnset.rocksmash = ["9M"];
		this.species.getLearnsetData('pawmi').learnset.shockwave = ["9M"];
		this.species.getLearnsetData('pawmi').learnset.smackdown = ["9M"];
		this.species.getLearnsetData('pawmi').learnset.strength = ["9M"];
		delete this.species.getLearnsetData('pawmi').learnset.bite;
		// Pawmo
		this.species.getLearnsetData('pawmo').learnset.zingzap = ["9D"];
		this.species.getLearnsetData('pawmo').learnset.smellingsalts = ["9L17"];
		this.species.getLearnsetData('pawmo').learnset.spark = ["9L23"];
		this.species.getLearnsetData('pawmo').learnset.thunderwave = ["9L28", "9M"];
		this.species.getLearnsetData('pawmo').learnset.entrainment = ["9L32"];
		this.species.getLearnsetData('pawmo').learnset.slam = ["9L38"];
		this.species.getLearnsetData('pawmo').learnset.discharge = ["9L43"];
		this.species.getLearnsetData('pawmo').learnset.agility = ["9L47"];
		this.species.getLearnsetData('pawmo').learnset.wildcharge = ["9L53", "9M"];
		this.species.getLearnsetData('pawmo').learnset.closecombat = ["9L58"];
		this.species.getLearnsetData('pawmo').learnset.afteryou = ["9M"];
		this.species.getLearnsetData('pawmo').learnset.assurance = ["9M"];
		this.species.getLearnsetData('pawmo').learnset.chipaway = ["9M"];
		this.species.getLearnsetData('pawmo').learnset.eerieimpulse = ["9M"];
		this.species.getLearnsetData('pawmo').learnset.electroweb = ["9M"];
		this.species.getLearnsetData('pawmo').learnset.flash = ["9M"];
		this.species.getLearnsetData('pawmo').learnset.knockoff = ["9M"];
		this.species.getLearnsetData('pawmo').learnset.magnetrise = ["9M"];
		this.species.getLearnsetData('pawmo').learnset.metronome = ["9M"];
		this.species.getLearnsetData('pawmo').learnset.retaliate = ["9M"];
		this.species.getLearnsetData('pawmo').learnset.rocksmash = ["9M"];
		this.species.getLearnsetData('pawmo').learnset.shockwave = ["9M"];
		this.species.getLearnsetData('pawmo').learnset.smackdown = ["9M"];
		this.species.getLearnsetData('pawmo').learnset.strength = ["9M"];
		delete this.species.getLearnsetData('pawmo').learnset.bite;
		// Pawmot
		this.species.getLearnsetData('pawmot').learnset.zingzap = ["9D"];
		this.species.getLearnsetData('pawmot').learnset.smellingsalts = ["9L17"];
		this.species.getLearnsetData('pawmot').learnset.spark = ["9L23"];
		this.species.getLearnsetData('pawmot').learnset.thunderwave = ["9L28", "9M"];
		this.species.getLearnsetData('pawmot').learnset.entrainment = ["9L32"];
		this.species.getLearnsetData('pawmot').learnset.slam = ["9L38"];
		this.species.getLearnsetData('pawmot').learnset.discharge = ["9L43"];
		this.species.getLearnsetData('pawmot').learnset.agility = ["9L47"];
		this.species.getLearnsetData('pawmot').learnset.wildcharge = ["9L53", "9M"];
		this.species.getLearnsetData('pawmot').learnset.closecombat = ["9L58"];
		this.species.getLearnsetData('pawmot').learnset.completeshock = ["9L62"];
		this.species.getLearnsetData('pawmot').learnset.afteryou = ["9M"];
		this.species.getLearnsetData('pawmot').learnset.assurance = ["9M"];
		this.species.getLearnsetData('pawmot').learnset.chipaway = ["9M"];
		this.species.getLearnsetData('pawmot').learnset.eerieimpulse = ["9M"];
		this.species.getLearnsetData('pawmot').learnset.electroweb = ["9M"];
		this.species.getLearnsetData('pawmot').learnset.flash = ["9M"];
		this.species.getLearnsetData('pawmot').learnset.healbell = ["9M"];
		this.species.getLearnsetData('pawmot').learnset.knockoff = ["9M"];
		this.species.getLearnsetData('pawmot').learnset.magnetrise = ["9M"];
		this.species.getLearnsetData('pawmot').learnset.retaliate = ["9M"];
		this.species.getLearnsetData('pawmot').learnset.rocksmash = ["9M"];
		this.species.getLearnsetData('pawmot').learnset.shockwave = ["9M"];
		this.species.getLearnsetData('pawmot').learnset.smackdown = ["9M"];
		this.species.getLearnsetData('pawmot').learnset.strength = ["9M"];
		delete this.species.getLearnsetData('pawmot').learnset.bite;
		// Tandemaus
		this.species.getLearnsetData('tandemaus').learnset.covet = ["9D"];
		this.species.getLearnsetData('tandemaus').learnset.afteryou = ["9M"];
		this.species.getLearnsetData('tandemaus').learnset.echoedvoice = ["9M"];
		this.species.getLearnsetData('tandemaus').learnset.endeavor = ["9M"];
		this.species.getLearnsetData('tandemaus').learnset.healbell = ["9M"];
		this.species.getLearnsetData('tandemaus').learnset.lastresort = ["9M"];
		this.species.getLearnsetData('tandemaus').learnset.recycle = ["9M"];
		this.species.getLearnsetData('tandemaus').learnset.retaliate = ["9M"];
		this.species.getLearnsetData('tandemaus').learnset.rocksmash = ["9M"];
		this.species.getLearnsetData('tandemaus').learnset.roleplay = ["9M"];
		this.species.getLearnsetData('tandemaus').learnset.snatch = ["9M"];
		this.species.getLearnsetData('tandemaus').learnset.torment = ["9M"];
		this.species.getLearnsetData('tandemaus').learnset.trailhead = ["9M"];
		// Maushold
		this.species.getLearnsetData('maushold').learnset.wideguard = ["9D"];
		this.species.getLearnsetData('maushold').learnset.afteryou = ["9M"];
		this.species.getLearnsetData('maushold').learnset.echoedvoice = ["9M"];
		this.species.getLearnsetData('maushold').learnset.embargo = ["9M"];
		this.species.getLearnsetData('maushold').learnset.endeavor = ["9M"];
		this.species.getLearnsetData('maushold').learnset.healbell = ["9M"];
		this.species.getLearnsetData('maushold').learnset.lastresort = ["9M"];
		this.species.getLearnsetData('maushold').learnset.recycle = ["9M"];
		this.species.getLearnsetData('maushold').learnset.retaliate = ["9M"];
		this.species.getLearnsetData('maushold').learnset.rocksmash = ["9M"];
		this.species.getLearnsetData('maushold').learnset.roleplay = ["9M"];
		this.species.getLearnsetData('maushold').learnset.snatch = ["9M"];
		this.species.getLearnsetData('maushold').learnset.torment = ["9M"];
		// Fidough
		this.species.getLearnsetData('fidough').learnset.acidarmor = ["9D"];
		this.species.getLearnsetData('fidough').learnset.pounce = ["9L18"];
		this.species.getLearnsetData('fidough').learnset.crunch = ["9L33"];
		this.species.getLearnsetData('fidough').learnset.playrough = ["9L40"];
		this.species.getLearnsetData('fidough').learnset.afteryou = ["9M"];
		this.species.getLearnsetData('fidough').learnset.healbell = ["9M"];
		this.species.getLearnsetData('fidough').learnset.lastresort = ["9L45", "9M"];
		this.species.getLearnsetData('fidough').learnset.magiccoat = ["9M"];
		this.species.getLearnsetData('fidough').learnset.retaliate = ["9M"];
		this.species.getLearnsetData('fidough').learnset.roar = ["9L30", "9M"];
		this.species.getLearnsetData('fidough').learnset.workup = ["9L22", "9M"];
		delete this.species.getLearnsetData('fidough').learnset.doubleedge;
		// Dachsbun
		this.species.getLearnsetData('dachsbun').learnset.flowershield = ["9D"];
		this.species.getLearnsetData('dachsbun').learnset.pounce = ["9L18"];
		this.species.getLearnsetData('dachsbun').learnset.crunch = ["9L33"];
		this.species.getLearnsetData('dachsbun').learnset.playrough = ["9L40"];
		this.species.getLearnsetData('dachsbun').learnset.afteryou = ["9M"];
		this.species.getLearnsetData('dachsbun').learnset.healbell = ["9M"];
		this.species.getLearnsetData('dachsbun').learnset.irontail = ["9M"];
		this.species.getLearnsetData('dachsbun').learnset.lastresort = ["9L53", "9M"];
		this.species.getLearnsetData('dachsbun').learnset.magiccoat = ["9M"];
		this.species.getLearnsetData('dachsbun').learnset.retaliate = ["9M"];
		this.species.getLearnsetData('dachsbun').learnset.roar = ["9L33", "9M"];
		this.species.getLearnsetData('dachsbun').learnset.workup = ["9L22", "9M"];
		delete this.species.getLearnsetData('dachsbun').learnset.doubleedge;
		// Smoliv
		this.species.getLearnsetData('smoliv').learnset.luckychant = ["9D"];
		this.species.getLearnsetData('smoliv').learnset.bestow = ["9L13"];
		this.species.getLearnsetData('smoliv').learnset.aromatherapy = ["9L23"];
		this.species.getLearnsetData('smoliv').learnset.grassyterrain = ["9L38", "9M"];
		this.species.getLearnsetData('smoliv').learnset.afteryou = ["9M"];
		this.species.getLearnsetData('smoliv').learnset.healbell = ["9M"];
		this.species.getLearnsetData('smoliv').learnset.helpinghand = ["9M"];
		this.species.getLearnsetData('smoliv').learnset.naturalgift = ["9M"];
		this.species.getLearnsetData('smoliv').learnset.naturepower = ["9M"];
		this.species.getLearnsetData('smoliv').learnset.synthesis = ["9M"];
		// Dolliv
		this.species.getLearnsetData('dolliv').learnset.luckychant = ["9D"];
		this.species.getLearnsetData('dolliv').learnset.bestow = ["9L13"];
		this.species.getLearnsetData('dolliv').learnset.aromatherapy = ["9L23"];
		this.species.getLearnsetData('dolliv').learnset.grassyterrain = ["9L42", "9M"];
		this.species.getLearnsetData('dolliv').learnset.afteryou = ["9M"];
		this.species.getLearnsetData('dolliv').learnset.healbell = ["9M"];
		this.species.getLearnsetData('dolliv').learnset.helpinghand = ["9M"];
		this.species.getLearnsetData('dolliv').learnset.naturalgift = ["9M"];
		this.species.getLearnsetData('dolliv').learnset.naturepower = ["9M"];
		this.species.getLearnsetData('dolliv').learnset.synthesis = ["9M"];
		// Arboliva
		this.species.getLearnsetData('arboliva').learnset.luckychant = ["9D"];
		this.species.getLearnsetData('arboliva').learnset.bestow = ["9L13"];
		this.species.getLearnsetData('arboliva').learnset.aromatherapy = ["9L23"];
		this.species.getLearnsetData('arboliva').learnset.grassyterrain = ["9L46", "9M"];
		this.species.getLearnsetData('arboliva').learnset.afteryou = ["9M"];
		this.species.getLearnsetData('arboliva').learnset.block = ["9M"];
		this.species.getLearnsetData('arboliva').learnset.brutalswing = ["9M"];
		this.species.getLearnsetData('arboliva').learnset.healbell = ["9M"];
		this.species.getLearnsetData('arboliva').learnset.helpinghand = ["9M"];
		this.species.getLearnsetData('arboliva').learnset.naturalgift = ["9M"];
		this.species.getLearnsetData('arboliva').learnset.naturepower = ["9M"];
		this.species.getLearnsetData('arboliva').learnset.synthesis = ["9M"];
		// Squawkabilly
		this.species.getLearnsetData('squawkabilly').learnset.beatup = ["9D"];
		this.species.getLearnsetData('squawkabilly').learnset.compensation = ["9M"];
		this.species.getLearnsetData('squawkabilly').learnset.defog = ["9M"];
		this.species.getLearnsetData('squawkabilly').learnset.echoedvoice = ["9M"];
		this.species.getLearnsetData('squawkabilly').learnset.embargo = ["9M"];
		this.species.getLearnsetData('squawkabilly').learnset.lastresort = ["9M"];
		this.species.getLearnsetData('squawkabilly').learnset.payback = ["9M"];
		this.species.getLearnsetData('squawkabilly').learnset.roleplay = ["9M"];
		this.species.getLearnsetData('squawkabilly').learnset.roost = ["9L47", "9M"];
		this.species.getLearnsetData('squawkabilly').learnset.screech = ["9M"];
		this.species.getLearnsetData('squawkabilly').learnset.snatch = ["9M"];
		this.species.getLearnsetData('squawkabilly').learnset.torment = ["9M"];
		// Nacli
		this.species.getLearnsetData('nacli').learnset.refresh = ["9D"];
		this.species.getLearnsetData('nacli').learnset.magnitude = ["9L40"];
		delete this.species.getLearnsetData('nacli').learnset.earthquake;
		// Naclstack
		this.species.getLearnsetData('naclstack').learnset.refresh = ["9D"];
		this.species.getLearnsetData('naclstack').learnset.magnitude = ["9L45"];
		this.species.getLearnsetData('naclstack').learnset.earthquake = ["9M"];
		this.species.getLearnsetData('naclstack').learnset.gravity = ["9M"];
		this.species.getLearnsetData('naclstack').learnset.rocksmash = ["9M"];
		this.species.getLearnsetData('naclstack').learnset.strength = ["9M"];
		// Garganacl
		this.species.getLearnsetData('garganacl').learnset.refresh = ["9D"];
		this.species.getLearnsetData('garganacl').learnset.magnitude = ["9L49"];
		this.species.getLearnsetData('garganacl').learnset.brutalswing = ["9M"];
		this.species.getLearnsetData('garganacl').learnset.dualchop = ["9M"];
		this.species.getLearnsetData('garganacl').learnset.earthquake = ["9M"];
		this.species.getLearnsetData('garganacl').learnset.fullcollide = ["9M"];
		this.species.getLearnsetData('garganacl').learnset.gravity = ["9M"];
		this.species.getLearnsetData('garganacl').learnset.rocksmash = ["9M"];
		this.species.getLearnsetData('garganacl').learnset.strength = ["9M"];
		this.species.getLearnsetData('garganacl').learnset.superpower = ["9M"];
		// Charcadet
		this.species.getLearnsetData('charcadet').learnset.tarshot = ["9D"];
		this.species.getLearnsetData('charcadet').learnset.assurance = ["9M"];
		this.species.getLearnsetData('charcadet').learnset.chipaway = ["9M"];
		this.species.getLearnsetData('charcadet').learnset.endeavor = ["9M"];
		this.species.getLearnsetData('charcadet').learnset.flash = ["9M"];
		this.species.getLearnsetData('charcadet').learnset.incinerate = ["9L28", "9M"];
		this.species.getLearnsetData('charcadet').learnset.retaliate = ["9M"];
		this.species.getLearnsetData('charcadet').learnset.rocksmash = ["9M"];
		this.species.getLearnsetData('charcadet').learnset.spite = ["9M"];
		// Armarouge
		this.species.getLearnsetData('armarouge').learnset.aurasphere = ["9D"];
		this.species.getLearnsetData('armarouge').learnset.psybeam = ["9L0"];
		this.species.getLearnsetData('armarouge').learnset.pelletshot = ["9L1"];
		this.species.getLearnsetData('armarouge').learnset.barrierbash = ["9L1"];
		this.species.getLearnsetData('armarouge').learnset.psyshock = ["9L56", "9M"];
		this.species.getLearnsetData('armarouge').learnset.allyswitch = ["9L42", "9M"];
		this.species.getLearnsetData('armarouge').learnset.assurance = ["9M"];
		this.species.getLearnsetData('armarouge').learnset.chipaway = ["9M"];
		this.species.getLearnsetData('armarouge').learnset.endeavor = ["9M"];
		this.species.getLearnsetData('armarouge').learnset.flash = ["9M"];
		this.species.getLearnsetData('armarouge').learnset.fullcollide = ["9M"];
		this.species.getLearnsetData('armarouge').learnset.incinerate = ["9L28", "9M"];
		this.species.getLearnsetData('armarouge').learnset.magiccoat = ["9M"];
		this.species.getLearnsetData('armarouge').learnset.retaliate = ["9M"];
		this.species.getLearnsetData('armarouge').learnset.rocksmash = ["9M"];
		this.species.getLearnsetData('armarouge').learnset.signalbeam = ["9M"];
		this.species.getLearnsetData('armarouge').learnset.spite = ["9M"];
		this.species.getLearnsetData('armarouge').learnset.telekinesis = ["9M"];
		// Ceruledge
		this.species.getLearnsetData('ceruledge').learnset.furycutter = ["9D"];
		this.species.getLearnsetData('ceruledge').learnset.allyswitch = ["9M"];
		this.species.getLearnsetData('ceruledge').learnset.assurance = ["9M"];
		this.species.getLearnsetData('ceruledge').learnset.brutalswing = ["9M"];
		this.species.getLearnsetData('ceruledge').learnset.chipaway = ["9M"];
		this.species.getLearnsetData('ceruledge').learnset.compensation = ["9M"];
		this.species.getLearnsetData('ceruledge').learnset.endeavor = ["9M"];
		this.species.getLearnsetData('ceruledge').learnset.flash = ["9M"];
		this.species.getLearnsetData('ceruledge').learnset.incinerate = ["9L28", "9M"];
		this.species.getLearnsetData('ceruledge').learnset.lastresort = ["9M"];
		this.species.getLearnsetData('ceruledge').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('ceruledge').learnset.payback = ["9M"];
		this.species.getLearnsetData('ceruledge').learnset.retaliate = ["9M"];
		this.species.getLearnsetData('ceruledge').learnset.rocksmash = ["9M"];
		this.species.getLearnsetData('ceruledge').learnset.spite = ["9M"];
		// Tadbulb
		this.species.getLearnsetData('tadbulb').learnset.confuseray = ["9D"];
		this.species.getLearnsetData('tadbulb').learnset.afteryou = ["9M"];
		this.species.getLearnsetData('tadbulb').learnset.eerieimpulse = ["9M"];
		this.species.getLearnsetData('tadbulb').learnset.electroweb = ["9M"];
		this.species.getLearnsetData('tadbulb').learnset.flash = ["9M"];
		this.species.getLearnsetData('tadbulb').learnset.gastroacid = ["9M"];
		this.species.getLearnsetData('tadbulb').learnset.magnetrise = ["9M"];
		this.species.getLearnsetData('tadbulb').learnset.painsplit = ["9M"];
		this.species.getLearnsetData('tadbulb').learnset.shockwave = ["9M"];
		this.species.getLearnsetData('tadbulb').learnset.signalbeam = ["9M"];
		// Bellibolt
		this.species.getLearnsetData('bellibolt').learnset.confuseray = ["9D"];
		this.species.getLearnsetData('bellibolt').learnset.afteryou = ["9M"];
		this.species.getLearnsetData('bellibolt').learnset.block = ["9M"];
		this.species.getLearnsetData('bellibolt').learnset.bounce = ["9M"];
		this.species.getLearnsetData('bellibolt').learnset.eerieimpulse = ["9M"];
		this.species.getLearnsetData('bellibolt').learnset.electroweb = ["9M"];
		this.species.getLearnsetData('bellibolt').learnset.explosion = ["9M"];
		this.species.getLearnsetData('bellibolt').learnset.flash = ["9M"];
		this.species.getLearnsetData('bellibolt').learnset.gastroacid = ["9M"];
		this.species.getLearnsetData('bellibolt').learnset.magnetrise = ["9M"];
		this.species.getLearnsetData('bellibolt').learnset.painsplit = ["9M"];
		this.species.getLearnsetData('bellibolt').learnset.shockwave = ["9M"];
		this.species.getLearnsetData('bellibolt').learnset.signalbeam = ["9M"];
		this.species.getLearnsetData('bellibolt').learnset.sludgewave = ["9M"];
		this.species.getLearnsetData('bellibolt').learnset.strength = ["9M"];
		// Wattrel
		this.species.getLearnsetData('wattrel').learnset.brine = ["9D"];
		this.species.getLearnsetData('wattrel').learnset.aircutter = ["9L27"];
		this.species.getLearnsetData('wattrel').learnset.defog = ["9M"];
		this.species.getLearnsetData('wattrel').learnset.eerieimpulse = ["9M"];
		this.species.getLearnsetData('wattrel').learnset.electroweb = ["9M"];
		this.species.getLearnsetData('wattrel').learnset.roost = ["9L23", "9M"];
		this.species.getLearnsetData('wattrel').learnset.shockwave = ["9M"];
		this.species.getLearnsetData('wattrel').learnset.signalbeam = ["9M"];
		this.species.getLearnsetData('wattrel').learnset.skyattack = ["9M"];
		// Kilowattrel
		this.species.getLearnsetData('kilowattrel').learnset.brine = ["9D"];
		this.species.getLearnsetData('kilowattrel').learnset.aircutter = ["9L30"];
		this.species.getLearnsetData('kilowattrel').learnset.defog = ["9M"];
		this.species.getLearnsetData('kilowattrel').learnset.eerieimpulse = ["9M"];
		this.species.getLearnsetData('kilowattrel').learnset.electroweb = ["9M"];
		this.species.getLearnsetData('kilowattrel').learnset.roost = ["9L23", "9M"];
		this.species.getLearnsetData('kilowattrel').learnset.shockwave = ["9M"];
		this.species.getLearnsetData('kilowattrel').learnset.signalbeam = ["9M"];
		this.species.getLearnsetData('kilowattrel').learnset.skyattack = ["9M"];
		// Maschiff
		this.species.getLearnsetData('maschiff').learnset.powertrip = ["9D"];
		this.species.getLearnsetData('maschiff').learnset.assurance = ["9M"];
		this.species.getLearnsetData('maschiff').learnset.chipaway = ["9M"];
		this.species.getLearnsetData('maschiff').learnset.echoedvoice = ["9M"];
		this.species.getLearnsetData('maschiff').learnset.embargo = ["9M"];
		this.species.getLearnsetData('maschiff').learnset.honeclaws = ["9L10", "9M"];
		this.species.getLearnsetData('maschiff').learnset.irontail = ["9M"];
		this.species.getLearnsetData('maschiff').learnset.knockoff = ["9M"];
		this.species.getLearnsetData('maschiff').learnset.lastresort = ["9M"];
		this.species.getLearnsetData('maschiff').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('maschiff').learnset.payback = ["9L26", "9M"];
		this.species.getLearnsetData('maschiff').learnset.psychup = ["9M"];
		this.species.getLearnsetData('maschiff').learnset.retaliate = ["9M"];
		this.species.getLearnsetData('maschiff').learnset.roar = ["9L18", "9M"];
		this.species.getLearnsetData('maschiff').learnset.roleplay = ["9M"];
		this.species.getLearnsetData('maschiff').learnset.screech = ["9M"];
		this.species.getLearnsetData('maschiff').learnset.strength = ["9M"];
		this.species.getLearnsetData('maschiff').learnset.pursuit = ["9E"];
		// Mabosstiff
		this.species.getLearnsetData('mabosstiff').learnset.powertrip = ["9D"];
		this.species.getLearnsetData('mabosstiff').learnset.assurance = ["9M"];
		this.species.getLearnsetData('mabosstiff').learnset.chipaway = ["9M"];
		this.species.getLearnsetData('mabosstiff').learnset.echoedvoice = ["9M"];
		this.species.getLearnsetData('mabosstiff').learnset.embargo = ["9M"];
		this.species.getLearnsetData('mabosstiff').learnset.honeclaws = ["9L10", "9M"];
		this.species.getLearnsetData('mabosstiff').learnset.irontail = ["9M"];
		this.species.getLearnsetData('mabosstiff').learnset.knockoff = ["9M"];
		this.species.getLearnsetData('mabosstiff').learnset.lastresort = ["9M"];
		this.species.getLearnsetData('mabosstiff').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('mabosstiff').learnset.payback = ["9L26", "9M"];
		this.species.getLearnsetData('mabosstiff').learnset.psychup = ["9M"];
		this.species.getLearnsetData('mabosstiff').learnset.quash = ["9M"];
		this.species.getLearnsetData('mabosstiff').learnset.retaliate = ["9M"];
		this.species.getLearnsetData('mabosstiff').learnset.roar = ["9L18", "9M"];
		this.species.getLearnsetData('mabosstiff').learnset.roleplay = ["9M"];
		this.species.getLearnsetData('mabosstiff').learnset.screech = ["9M"];
		this.species.getLearnsetData('mabosstiff').learnset.strength = ["9M"];
		this.species.getLearnsetData('mabosstiff').learnset.superpower = ["9M"];
		// Shroodle
		this.species.getLearnsetData('shroodle').learnset.venomdrench = ["9D"];
		this.species.getLearnsetData('shroodle').learnset.knockoff = ["9M"];
		this.species.getLearnsetData('shroodle').learnset.spite = ["9M"];
		this.species.getLearnsetData('shroodle').learnset.torment = ["9M"];
		delete this.species.getLearnsetData('shroodle').learnset.metronome;
		// Grafaiai
		this.species.getLearnsetData('grafaiai').learnset.sketch = ["9D"];
		this.species.getLearnsetData('grafaiai').learnset.toxicthread = ["9L0"];
		this.species.getLearnsetData('grafaiai').learnset.assurance = ["9M"];
		this.species.getLearnsetData('grafaiai').learnset.irontail = ["9M"];
		this.species.getLearnsetData('grafaiai').learnset.knockoff = ["9M"];
		this.species.getLearnsetData('grafaiai').learnset.roleplay = ["9M"];
		this.species.getLearnsetData('grafaiai').learnset.sludgewave = ["9M"];
		this.species.getLearnsetData('grafaiai').learnset.snatch = ["9M"];
		this.species.getLearnsetData('grafaiai').learnset.spite = ["9M"];
		this.species.getLearnsetData('grafaiai').learnset.torment = ["9M"];
		// Bramblin
		this.species.getLearnsetData('bramblin').learnset.spikyshield = ["9D"];
		this.species.getLearnsetData('bramblin').learnset.allyswitch = ["9M"];
		this.species.getLearnsetData('bramblin').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('bramblin').learnset.painsplit = ["9L50", "9M"];
		this.species.getLearnsetData('bramblin').learnset.payback = ["9M"];
		this.species.getLearnsetData('bramblin').learnset.spite = ["9M"];
		this.species.getLearnsetData('bramblin').learnset.spikes = ["9E"];
		// Brambleghast
		this.species.getLearnsetData('brambleghast').learnset.spikyshield = ["9D"];
		this.species.getLearnsetData('brambleghast').learnset.allyswitch = ["9M"];
		this.species.getLearnsetData('brambleghast').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('brambleghast').learnset.painsplit = ["9L50", "9M"];
		this.species.getLearnsetData('brambleghast').learnset.payback = ["9M"];
		this.species.getLearnsetData('brambleghast').learnset.spite = ["9M"];
		// Toedscool
		this.species.getLearnsetData('toedscool').learnset.doublekick = ["9D"];
		this.species.getLearnsetData('toedscool').learnset.bounce = ["9M"];
		this.species.getLearnsetData('toedscool').learnset.magiccoat = ["9M"];
		this.species.getLearnsetData('toedscool').learnset.naturepower = ["9M"];
		this.species.getLearnsetData('toedscool').learnset.screech = ["9L37", "9M"];
		this.species.getLearnsetData('toedscool').learnset.spite = ["9M"];
		this.species.getLearnsetData('toedscool').learnset.toxic = ["9M"];
		// Toedscruel
		this.species.getLearnsetData('toedscruel').learnset.lashout = ["9D"];
		this.species.getLearnsetData('toedscruel').learnset.bounce = ["9M"];
		this.species.getLearnsetData('toedscruel').learnset.knockoff = ["9M"];
		this.species.getLearnsetData('toedscruel').learnset.magiccoat = ["9M"];
		this.species.getLearnsetData('toedscruel').learnset.naturepower = ["9M"];
		this.species.getLearnsetData('toedscruel').learnset.screech = ["9L37", "9M"];
		this.species.getLearnsetData('toedscruel').learnset.toxic = ["9M"];
		// Klawf
		this.species.getLearnsetData('klawf').learnset.mimic = ["9D"];
		this.species.getLearnsetData('klawf').learnset.rockclimb = ["9L33"];
		this.species.getLearnsetData('klawf').learnset.ambush = ["9L47"];
		this.species.getLearnsetData('klawf').learnset.chipaway = ["9M"];
		this.species.getLearnsetData('klawf').learnset.dualchop = ["9M"];
		this.species.getLearnsetData('klawf').learnset.endeavor = ["9M"];
		this.species.getLearnsetData('klawf').learnset.honeclaws = ["9M"];
		this.species.getLearnsetData('klawf').learnset.knockoff = ["9M"];
		this.species.getLearnsetData('klawf').learnset.payback = ["9M"];
		this.species.getLearnsetData('klawf').learnset.rocksmash = ["9L9", "9M"];
		this.species.getLearnsetData('klawf').learnset.roleplay = ["9M"];
		this.species.getLearnsetData('klawf').learnset.smackdown = ["9M"];
		this.species.getLearnsetData('klawf').learnset.strength = ["9M"];
		this.species.getLearnsetData('klawf').learnset.superpower = ["9M"];
		this.species.getLearnsetData('klawf').learnset.swordsdance = ["9M"];
		delete this.species.getLearnsetData('klawf').learnset.highhorsepower;
		// Capsakid
		this.species.getLearnsetData('capsakid').learnset.rage = ["9D"];
		this.species.getLearnsetData('capsakid').learnset.compensation = ["9M"];
		this.species.getLearnsetData('capsakid').learnset.endeavor = ["9M"];
		this.species.getLearnsetData('capsakid').learnset.naturalgift = ["9M"];
		this.species.getLearnsetData('capsakid').learnset.psychup = ["9M"];
		this.species.getLearnsetData('capsakid').learnset.synthesis = ["9M"];
		this.species.getLearnsetData('capsakid').learnset.torment = ["9M"];
		// Scovillain
		this.species.getLearnsetData('scovillain').learnset.rage = ["9D"];
		this.species.getLearnsetData('scovillain').learnset.compensation = ["9M"];
		this.species.getLearnsetData('scovillain').learnset.endeavor = ["9M"];
		this.species.getLearnsetData('scovillain').learnset.naturalgift = ["9M"];
		this.species.getLearnsetData('scovillain').learnset.psychup = ["9M"];
		this.species.getLearnsetData('scovillain').learnset.synthesis = ["9M"];
		this.species.getLearnsetData('scovillain').learnset.torment = ["9M"];
		// Rellor
		this.species.getLearnsetData('rellor').learnset.powertrick = ["9D"];
		this.species.getLearnsetData('rellor').learnset.steamroller = ["9L35"];
		this.species.getLearnsetData('rellor').learnset.bugbite = ["9L20", "9M"];
		this.species.getLearnsetData('rellor').learnset.electroweb = ["9M"];
		this.species.getLearnsetData('rellor').learnset.infestation = ["9M"];
		this.species.getLearnsetData('rellor').learnset.magiccoat = ["9M"];
		this.species.getLearnsetData('rellor').learnset.naturalgift = ["9M"];
		this.species.getLearnsetData('rellor').learnset.naturepower = ["9M"];
		this.species.getLearnsetData('rellor').learnset.recycle = ["9M"];
		this.species.getLearnsetData('rellor').learnset.signalbeam = ["9M"];
		this.species.getLearnsetData('rellor').learnset.smackdown = ["9M"];
		delete this.species.getLearnsetData('rellor').learnset.lunge;
		// Rabsca
		this.species.getLearnsetData('rabsca').learnset.topsyturvy = ["9D"];
		this.species.getLearnsetData('rabsca').learnset.steamroller = ["9L35"];
		this.species.getLearnsetData('rabsca').learnset.allyswitch = ["9M"];
		this.species.getLearnsetData('rabsca').learnset.bugbite = ["9L20", "9M"];
		this.species.getLearnsetData('rabsca').learnset.electroweb = ["9M"];
		this.species.getLearnsetData('rabsca').learnset.dreameater = ["9M"];
		this.species.getLearnsetData('rabsca').learnset.flash = ["9M"];
		this.species.getLearnsetData('rabsca').learnset.futuresight = ["9M"];
		this.species.getLearnsetData('rabsca').learnset.gravity = ["9M"];
		this.species.getLearnsetData('rabsca').learnset.infestation = ["9M"];
		this.species.getLearnsetData('rabsca').learnset.magiccoat = ["9M"];
		this.species.getLearnsetData('rabsca').learnset.naturalgift = ["9M"];
		this.species.getLearnsetData('rabsca').learnset.naturepower = ["9M"];
		this.species.getLearnsetData('rabsca').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('rabsca').learnset.psychup = ["9M"];
		this.species.getLearnsetData('rabsca').learnset.recycle = ["9M"];
		this.species.getLearnsetData('rabsca').learnset.signalbeam = ["9M"];
		this.species.getLearnsetData('rabsca').learnset.smackdown = ["9M"];
		this.species.getLearnsetData('rabsca').learnset.stasis = ["9M"];
		this.species.getLearnsetData('rabsca').learnset.telekinesis = ["9M"];
		delete this.species.getLearnsetData('rabsca').learnset.lunge;
		// Flittle
		this.species.getLearnsetData('flittle').learnset.teeterdance = ["9D"];
		this.species.getLearnsetData('flittle').learnset.uproar = ["9L34", "9M"];
		this.species.getLearnsetData('flittle').learnset.allyswitch = ["9M"];
		this.species.getLearnsetData('flittle').learnset.dreameater = ["9M"];
		this.species.getLearnsetData('flittle').learnset.flash = ["9M"];
		this.species.getLearnsetData('flittle').learnset.gravity = ["9M"];
		this.species.getLearnsetData('flittle').learnset.magiccoat = ["9M"];
		this.species.getLearnsetData('flittle').learnset.psychup = ["9M"];
		this.species.getLearnsetData('flittle').learnset.roleplay = ["9M"];
		this.species.getLearnsetData('flittle').learnset.signalbeam = ["9M"];
		this.species.getLearnsetData('flittle').learnset.telekinesis = ["9M"];
		delete this.species.getLearnsetData('flittle').learnset.roost;
		// Espathra
		this.species.getLearnsetData('espathra').learnset.lusterpurge = ["9D"];
		this.species.getLearnsetData('espathra').learnset.uproar = ["9L34", "9M"];
		this.species.getLearnsetData('espathra').learnset.allyswitch = ["9M"];
		this.species.getLearnsetData('espathra').learnset.bounce = ["9M"];
		this.species.getLearnsetData('espathra').learnset.defog = ["9M"];
		this.species.getLearnsetData('espathra').learnset.dreameater = ["9M"];
		this.species.getLearnsetData('espathra').learnset.flash = ["9M"];
		this.species.getLearnsetData('espathra').learnset.futuresight = ["9M"];
		this.species.getLearnsetData('espathra').learnset.gravity = ["9M"];
		this.species.getLearnsetData('espathra').learnset.irontail = ["9M"];
		this.species.getLearnsetData('espathra').learnset.lastresort = ["9M"];
		this.species.getLearnsetData('espathra').learnset.magiccoat = ["9M"];
		this.species.getLearnsetData('espathra').learnset.psychup = ["9M"];
		this.species.getLearnsetData('espathra').learnset.roleplay = ["9M"];
		this.species.getLearnsetData('espathra').learnset.signalbeam = ["9M"];
		this.species.getLearnsetData('espathra').learnset.skyattack = ["9M"];
		this.species.getLearnsetData('espathra').learnset.telekinesis = ["9M"];
		this.species.getLearnsetData('espathra').learnset.trailhead = ["9M"];
		delete this.species.getLearnsetData('espathra').learnset.roost;
		// Tinkatink
		this.species.getLearnsetData('tinkatink').learnset.gyroball = ["9D"];
		this.species.getLearnsetData('tinkatink').learnset.bash = ["9L8"];
		this.species.getLearnsetData('tinkatink').learnset.swing = ["9L21"];
		this.species.getLearnsetData('tinkatink').learnset.sweetkiss = ["9L24"];
		this.species.getLearnsetData('tinkatink').learnset.brutalswing = ["9L27", "9M"];
		this.species.getLearnsetData('tinkatink').learnset.slam = ["9L30"];
		this.species.getLearnsetData('tinkatink').learnset.flashcannon = ["9L33", "9M"];
		this.species.getLearnsetData('tinkatink').learnset.playrough = ["9L36"];
		this.species.getLearnsetData('tinkatink').learnset.fakeout = ["9L39"];
		this.species.getLearnsetData('tinkatink').learnset.flatter = ["9L42"];
		this.species.getLearnsetData('tinkatink').learnset.knockoff = ["9L45", "9M"];
		this.species.getLearnsetData('tinkatink').learnset.recycle = ["9M"];
		this.species.getLearnsetData('tinkatink').learnset.rocksmash = ["9L14", "9M"];
		this.species.getLearnsetData('tinkatink').learnset.snatch = ["9M"];
		delete this.species.getLearnsetData('tinkatink').learnset.metalclaw;
		// Tinkatuff
		this.species.getLearnsetData('tinkatuff').learnset.gyroball = ["9D"];
		this.species.getLearnsetData('tinkatuff').learnset.bash = ["9L8"];
		this.species.getLearnsetData('tinkatuff').learnset.sweetkiss = ["9L21"];
		this.species.getLearnsetData('tinkatuff').learnset.brutalswing = ["9L24", "9M"];
		this.species.getLearnsetData('tinkatuff').learnset.slam = ["9L28"];
		this.species.getLearnsetData('tinkatuff').learnset.flashcannon = ["9L32", "9M"];
		this.species.getLearnsetData('tinkatuff').learnset.playrough = ["9L36"];
		this.species.getLearnsetData('tinkatuff').learnset.fakeout = ["9L40"];
		this.species.getLearnsetData('tinkatuff').learnset.flatter = ["9L44"];
		this.species.getLearnsetData('tinkatuff').learnset.knockoff = ["9L48", "9M"];
		this.species.getLearnsetData('tinkatuff').learnset.assurance = ["9M"];
		this.species.getLearnsetData('tinkatuff').learnset.chipaway = ["9M"];
		this.species.getLearnsetData('tinkatuff').learnset.endeavor = ["9M"];
		this.species.getLearnsetData('tinkatuff').learnset.payback = ["9M"];
		this.species.getLearnsetData('tinkatuff').learnset.recycle = ["9M"];
		this.species.getLearnsetData('tinkatuff').learnset.rocksmash = ["9L14", "9M"];
		this.species.getLearnsetData('tinkatuff').learnset.snatch = ["9M"];
		this.species.getLearnsetData('tinkatuff').learnset.strength = ["9M"];
		delete this.species.getLearnsetData('tinkatuff').learnset.metalclaw;
		// Tinkaton
		this.species.getLearnsetData('tinkaton').learnset.gyroball = ["9D"];
		this.species.getLearnsetData('tinkaton').learnset.bash = ["9L8"];
		this.species.getLearnsetData('tinkaton').learnset.sweetkiss = ["9L21"];
		this.species.getLearnsetData('tinkaton').learnset.brutalswing = ["9L24", "9M"];
		this.species.getLearnsetData('tinkaton').learnset.slam = ["9L28"];
		this.species.getLearnsetData('tinkaton').learnset.flashcannon = ["9L32", "9M"];
		this.species.getLearnsetData('tinkaton').learnset.playrough = ["9L36"];
		this.species.getLearnsetData('tinkaton').learnset.fakeout = ["9L41"];
		this.species.getLearnsetData('tinkaton').learnset.flatter = ["9L46"];
		this.species.getLearnsetData('tinkaton').learnset.knockoff = ["9L51", "9M"];
		this.species.getLearnsetData('tinkaton').learnset.assurance = ["9M"];
		this.species.getLearnsetData('tinkaton').learnset.chipaway = ["9M"];
		this.species.getLearnsetData('tinkaton').learnset.endeavor = ["9M"];
		this.species.getLearnsetData('tinkaton').learnset.payback = ["9M"];
		this.species.getLearnsetData('tinkaton').learnset.recycle = ["9M"];
		this.species.getLearnsetData('tinkaton').learnset.rocksmash = ["9L14", "9M"];
		this.species.getLearnsetData('tinkaton').learnset.snatch = ["9M"];
		this.species.getLearnsetData('tinkaton').learnset.strength = ["9M"];
		this.species.getLearnsetData('tinkaton').learnset.superpower = ["9M"];
		delete this.species.getLearnsetData('tinkaton').learnset.metalclaw;
		// Wiglett
		this.species.getLearnsetData('wiglett').learnset.minimize = ["9D"];
		this.species.getLearnsetData('wiglett').learnset.slipaway = ["9L46"];
		this.species.getLearnsetData('wiglett').learnset.brine = ["9M"];
		this.species.getLearnsetData('wiglett').learnset.brutalswing = ["9M"];
		this.species.getLearnsetData('wiglett').learnset.knockoff = ["9M"];
		this.species.getLearnsetData('wiglett').learnset.scald = ["9M"];
		this.species.getLearnsetData('wiglett').learnset.screech = ["9M"];
		this.species.getLearnsetData('wiglett').learnset.whirlpool = ["9M"];
		delete this.species.getLearnsetData('wiglett').learnset.blizzard;
		// Wugtrio
		this.species.getLearnsetData('wugtrio').learnset.minimize = ["9D"];
		this.species.getLearnsetData('wugtrio').learnset.slipaway = ["9L58"];
		this.species.getLearnsetData('wugtrio').learnset.brine = ["9M"];
		this.species.getLearnsetData('wugtrio').learnset.brutalswing = ["9M"];
		this.species.getLearnsetData('wugtrio').learnset.knockoff = ["9M"];
		this.species.getLearnsetData('wugtrio').learnset.rockslide = ["9M"];
		this.species.getLearnsetData('wugtrio').learnset.scald = ["9M"];
		this.species.getLearnsetData('wugtrio').learnset.screech = ["9M"];
		this.species.getLearnsetData('wugtrio').learnset.sludgewave = ["9M"];
		this.species.getLearnsetData('wugtrio').learnset.whirlpool = ["9M"];
		delete this.species.getLearnsetData('wugtrio').learnset.blizzard;
		// Bombirdier
		this.species.getLearnsetData('bombirdier').learnset.eggbomb = ["9D"];
		this.species.getLearnsetData('bombirdier').learnset.skydrop = ["9L42"];
		this.species.getLearnsetData('bombirdier').learnset.assurance = ["9M"];
		this.species.getLearnsetData('bombirdier').learnset.defog = ["9M"];
		this.species.getLearnsetData('bombirdier').learnset.echoedvoice = ["9M"];
		this.species.getLearnsetData('bombirdier').learnset.embargo = ["9M"];
		this.species.getLearnsetData('bombirdier').learnset.honeclaws = ["9L1", "9M"];
		this.species.getLearnsetData('bombirdier').learnset.knockoff = ["9L53", "9M"];
		this.species.getLearnsetData('bombirdier').learnset.payback = ["9L36", "9M"];
		this.species.getLearnsetData('bombirdier').learnset.rocksmash = ["9M"];
		this.species.getLearnsetData('bombirdier').learnset.roost = ["9M"];
		this.species.getLearnsetData('bombirdier').learnset.skyattack = ["9M"];
		this.species.getLearnsetData('bombirdier').learnset.smackdown = ["9M"];
		this.species.getLearnsetData('bombirdier').learnset.snatch = ["9M"];
		this.species.getLearnsetData('bombirdier').learnset.strength = ["9M"];
		this.species.getLearnsetData('bombirdier').learnset.torment = ["9L24", "9M"];
		// Finizen
		this.species.getLearnsetData('finizen').learnset.aquaring = ["9D"];
		this.species.getLearnsetData('finizen').learnset.afteryou = ["9M"];
		this.species.getLearnsetData('finizen').learnset.bounce = ["9M"];
		this.species.getLearnsetData('finizen').learnset.brine = ["9M"];
		this.species.getLearnsetData('finizen').learnset.dive = ["9L21", "9M"];
		this.species.getLearnsetData('finizen').learnset.echoedvoice = ["9M"];
		this.species.getLearnsetData('finizen').learnset.irontail = ["9M"];
		this.species.getLearnsetData('finizen').learnset.scald = ["9M"];
		this.species.getLearnsetData('finizen').learnset.screech = ["9M"];
		this.species.getLearnsetData('finizen').learnset.whirlpool = ["9M"];
		delete this.species.getLearnsetData('finizen').learnset.blizzard;
		// Palafin
		this.species.getLearnsetData('palafin').learnset.poweruppunch = ["9D"];
		this.species.getLearnsetData('palafin').learnset.jetpunch = ["9L0"];
		this.species.getLearnsetData('palafin').learnset.afteryou = ["9M"];
		this.species.getLearnsetData('palafin').learnset.allyswitch = ["9M"];
		this.species.getLearnsetData('palafin').learnset.bounce = ["9M"];
		this.species.getLearnsetData('palafin').learnset.brine = ["9M"];
		this.species.getLearnsetData('palafin').learnset.dive = ["9M"];
		this.species.getLearnsetData('palafin').learnset.echoedvoice = ["9M"];
		this.species.getLearnsetData('palafin').learnset.irontail = ["9M"];
		this.species.getLearnsetData('palafin').learnset.retaliate = ["9M"];
		this.species.getLearnsetData('palafin').learnset.scald = ["9M"];
		this.species.getLearnsetData('palafin').learnset.screech = ["9M"];
		this.species.getLearnsetData('palafin').learnset.strength = ["9M"];
		this.species.getLearnsetData('palafin').learnset.whirlpool = ["9M"];
		delete this.species.getLearnsetData('palafin').learnset.blizzard;
		// Varoom
		this.species.getLearnsetData('varoom').learnset.tarshot = ["9D"];
		this.species.getLearnsetData('varoom').learnset.assurance = ["9L10", "9M"];
		this.species.getLearnsetData('varoom').learnset.endeavor = ["9M"];
		this.species.getLearnsetData('varoom').learnset.explosion = ["9M"];
		this.species.getLearnsetData('varoom').learnset.fullcollide = ["9M"];
		this.species.getLearnsetData('varoom').learnset.gastroacid = ["9M"];
		this.species.getLearnsetData('varoom').learnset.gyroball = ["9M"];
		this.species.getLearnsetData('varoom').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('varoom').learnset.payback = ["9M"];
		this.species.getLearnsetData('varoom').learnset.screech = ["9M"];
		this.species.getLearnsetData('varoom').learnset.spite = ["9M"];
		// Revavroom
		this.species.getLearnsetData('revavroom').learnset.tarshot = ["9D"];
		this.species.getLearnsetData('revavroom').learnset.endeavor = ["9M"];
		this.species.getLearnsetData('revavroom').learnset.explosion = ["9M"];
		this.species.getLearnsetData('revavroom').learnset.fullcollide = ["9M"];
		this.species.getLearnsetData('revavroom').learnset.gastroacid = ["9M"];
		this.species.getLearnsetData('revavroom').learnset.gyroball = ["9M"];
		this.species.getLearnsetData('revavroom').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('revavroom').learnset.payback = ["9M"];
		this.species.getLearnsetData('revavroom').learnset.screech = ["9M"];
		this.species.getLearnsetData('revavroom').learnset.spite = ["9M"];
		this.species.getLearnsetData('revavroom').learnset.strength = ["9M"];
		// Revavroom Segin Mod
		this.species.getLearnsetData('revavroomsegin').learnset.tarshot = ["9D"];
		this.species.getLearnsetData('revavroomsegin').learnset.endeavor = ["9M"];
		this.species.getLearnsetData('revavroomsegin').learnset.explosion = ["9M"];
		this.species.getLearnsetData('revavroomsegin').learnset.fullcollide = ["9M"];
		this.species.getLearnsetData('revavroomsegin').learnset.gastroacid = ["9M"];
		this.species.getLearnsetData('revavroomsegin').learnset.gyroball = ["9M"];
		this.species.getLearnsetData('revavroomsegin').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('revavroomsegin').learnset.payback = ["9M"];
		this.species.getLearnsetData('revavroomsegin').learnset.screech = ["9M"];
		this.species.getLearnsetData('revavroomsegin').learnset.spite = ["9M"];
		this.species.getLearnsetData('revavroomsegin').learnset.strength = ["9M"];
		// Revavroom Schedar Mod
		this.species.getLearnsetData('revavroomschedar').learnset.tarshot = ["9D"];
		this.species.getLearnsetData('revavroomschedar').learnset.endeavor = ["9M"];
		this.species.getLearnsetData('revavroomschedar').learnset.explosion = ["9M"];
		this.species.getLearnsetData('revavroomschedar').learnset.fullcollide = ["9M"];
		this.species.getLearnsetData('revavroomschedar').learnset.gastroacid = ["9M"];
		this.species.getLearnsetData('revavroomschedar').learnset.gyroball = ["9M"];
		this.species.getLearnsetData('revavroomschedar').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('revavroomschedar').learnset.payback = ["9M"];
		this.species.getLearnsetData('revavroomschedar').learnset.screech = ["9M"];
		this.species.getLearnsetData('revavroomschedar').learnset.spite = ["9M"];
		this.species.getLearnsetData('revavroomschedar').learnset.strength = ["9M"];
		// Revavroom Navi Mod
		this.species.getLearnsetData('revavroomnavi').learnset.tarshot = ["9D"];
		this.species.getLearnsetData('revavroomnavi').learnset.endeavor = ["9M"];
		this.species.getLearnsetData('revavroomnavi').learnset.explosion = ["9M"];
		this.species.getLearnsetData('revavroomnavi').learnset.fullcollide = ["9M"];
		this.species.getLearnsetData('revavroomnavi').learnset.gastroacid = ["9M"];
		this.species.getLearnsetData('revavroomnavi').learnset.gyroball = ["9M"];
		this.species.getLearnsetData('revavroomnavi').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('revavroomnavi').learnset.payback = ["9M"];
		this.species.getLearnsetData('revavroomnavi').learnset.screech = ["9M"];
		this.species.getLearnsetData('revavroomnavi').learnset.spite = ["9M"];
		this.species.getLearnsetData('revavroomnavi').learnset.strength = ["9M"];
		// Revavroom Ruchbah Mod
		this.species.getLearnsetData('revavroomruchbah').learnset.tarshot = ["9D"];
		this.species.getLearnsetData('revavroomruchbah').learnset.endeavor = ["9M"];
		this.species.getLearnsetData('revavroomruchbah').learnset.explosion = ["9M"];
		this.species.getLearnsetData('revavroomruchbah').learnset.fullcollide = ["9M"];
		this.species.getLearnsetData('revavroomruchbah').learnset.gastroacid = ["9M"];
		this.species.getLearnsetData('revavroomruchbah').learnset.gyroball = ["9M"];
		this.species.getLearnsetData('revavroomruchbah').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('revavroomruchbah').learnset.payback = ["9M"];
		this.species.getLearnsetData('revavroomruchbah').learnset.screech = ["9M"];
		this.species.getLearnsetData('revavroomruchbah').learnset.spite = ["9M"];
		this.species.getLearnsetData('revavroomruchbah').learnset.strength = ["9M"];
		// Revavroom Caph Mod
		this.species.getLearnsetData('revavroomcaph').learnset.tarshot = ["9D"];
		this.species.getLearnsetData('revavroomcaph').learnset.endeavor = ["9M"];
		this.species.getLearnsetData('revavroomcaph').learnset.explosion = ["9M"];
		this.species.getLearnsetData('revavroomcaph').learnset.fullcollide = ["9M"];
		this.species.getLearnsetData('revavroomcaph').learnset.gastroacid = ["9M"];
		this.species.getLearnsetData('revavroomcaph').learnset.gyroball = ["9M"];
		this.species.getLearnsetData('revavroomcaph').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('revavroomcaph').learnset.payback = ["9M"];
		this.species.getLearnsetData('revavroomcaph').learnset.screech = ["9M"];
		this.species.getLearnsetData('revavroomcaph').learnset.spite = ["9M"];
		this.species.getLearnsetData('revavroomcaph').learnset.strength = ["9M"];
		// Cyclizar
		this.species.getLearnsetData('cyclizar').learnset.extremespeed = ["9D"];
		this.species.getLearnsetData('cyclizar').learnset.agility = ["9L31"];
		this.species.getLearnsetData('cyclizar').learnset.autotomize = ["9L40"];
		this.species.getLearnsetData('cyclizar').learnset.afteryou = ["9M"];
		this.species.getLearnsetData('cyclizar').learnset.breakingswipe = ["9M"];
		this.species.getLearnsetData('cyclizar').learnset.chipaway = ["9M"];
		this.species.getLearnsetData('cyclizar').learnset.echoedvoice = ["9M"];
		this.species.getLearnsetData('cyclizar').learnset.endeavor = ["9M"];
		this.species.getLearnsetData('cyclizar').learnset.honeclaws = ["9M"];
		this.species.getLearnsetData('cyclizar').learnset.irontail = ["9M"];
		this.species.getLearnsetData('cyclizar').learnset.knockoff = ["9M"];
		this.species.getLearnsetData('cyclizar').learnset.screech = ["9M"];
		this.species.getLearnsetData('cyclizar').learnset.bodyslam = ["9E"];
		this.species.getLearnsetData('cyclizar').learnset.crunch = ["9E"];
		this.species.getLearnsetData('cyclizar').learnset.firefang = ["9E"];
		this.species.getLearnsetData('cyclizar').learnset.takedown = ["9E"];
		this.species.getLearnsetData('cyclizar').learnset.thunderfang = ["9E"];
		delete this.species.getLearnsetData('cyclizar').learnset.shiftgear;
		// Orthworm
		this.species.getLearnsetData('orthworm').learnset.submission = ["9D"];
		this.species.getLearnsetData('orthworm').learnset.bash = ["9L7"];
		this.species.getLearnsetData('orthworm').learnset.irondefense = ["9L26", "9M"];
		this.species.getLearnsetData('orthworm').learnset.autotomize = ["9L38"];
		this.species.getLearnsetData('orthworm').learnset.escapetunnel = ["9L52"];
		this.species.getLearnsetData('orthworm').learnset.brutalswing = ["9M"];
		this.species.getLearnsetData('orthworm').learnset.gravity = ["9M"];
		this.species.getLearnsetData('orthworm').learnset.irontail = ["9L43", "9M"];
		this.species.getLearnsetData('orthworm').learnset.magnetrise = ["9M"];
		this.species.getLearnsetData('orthworm').learnset.naturepower = ["9M"];
		this.species.getLearnsetData('orthworm').learnset.roar = ["9M"];
		this.species.getLearnsetData('orthworm').learnset.rocksmash = ["9M"];
		this.species.getLearnsetData('orthworm').learnset.screech = ["9M"];
		this.species.getLearnsetData('orthworm').learnset.strength = ["9M"];
		this.species.getLearnsetData('orthworm').learnset.superpower = ["9M"];
		delete this.species.getLearnsetData('orthworm').learnset.mudslap;
		delete this.species.getLearnsetData('orthworm').learnset.takedown;
		// Glimmet
		this.species.getLearnsetData('glimmet').learnset.growth = ["9D"];
		this.species.getLearnsetData('glimmet').learnset.explosion = ["9M"];
		this.species.getLearnsetData('glimmet').learnset.flash = ["9M"];
		this.species.getLearnsetData('glimmet').learnset.naturepower = ["9M"];
		this.species.getLearnsetData('glimmet').learnset.signalbeam = ["9M"];
		this.species.getLearnsetData('glimmet').learnset.smackdown = ["9M"];
		// Glimmora
		this.species.getLearnsetData('glimmora').learnset.growth = ["9D"];
		this.species.getLearnsetData('glimmora').learnset.rapidspin = ["9L0"];
		this.species.getLearnsetData('glimmora').learnset.bunkerdown = ["9L1"];
		this.species.getLearnsetData('glimmora').learnset.explosion = ["9M"];
		this.species.getLearnsetData('glimmora').learnset.flash = ["9M"];
		this.species.getLearnsetData('glimmora').learnset.naturepower = ["9M"];
		this.species.getLearnsetData('glimmora').learnset.signalbeam = ["9M"];
		this.species.getLearnsetData('glimmora').learnset.smackdown = ["9M"];
		delete this.species.getLearnsetData('glimmora').learnset.spikyshield;
		// Greavard
		this.species.getLearnsetData('greavard').learnset.vengefulspirit = ["9D"];
		this.species.getLearnsetData('greavard').learnset.phantomforce = ["9L32", "9M"];
		this.species.getLearnsetData('greavard').learnset.playdead = ["9L37"];
		this.species.getLearnsetData('greavard').learnset.shadowbone = ["9L41"];
		this.species.getLearnsetData('greavard').learnset.playrough = ["9L52"];
		this.species.getLearnsetData('greavard').learnset.dreameater = ["9M"];
		this.species.getLearnsetData('greavard').learnset.helpinghand = ["9M"];
		this.species.getLearnsetData('greavard').learnset.irontail = ["9M"];
		this.species.getLearnsetData('greavard').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('greavard').learnset.painsplit = ["9M"];
		this.species.getLearnsetData('greavard').learnset.retaliate = ["9M"];
		this.species.getLearnsetData('greavard').learnset.roar = ["9M"];
		this.species.getLearnsetData('greavard').learnset.spite = ["9M"];
		delete this.species.getLearnsetData('greavard').learnset.doubleedge;
		// Houndstone
		this.species.getLearnsetData('houndstone').learnset.vengefulspirit = ["9D"];
		this.species.getLearnsetData('houndstone').learnset.phantomforce = ["9L36"];
		this.species.getLearnsetData('houndstone').learnset.playdead = ["9L41"];
		this.species.getLearnsetData('houndstone').learnset.shadowbone = ["9L46"];
		this.species.getLearnsetData('houndstone').learnset.playrough = ["9L58"];
		this.species.getLearnsetData('houndstone').learnset.dreameater = ["9M"];
		this.species.getLearnsetData('houndstone').learnset.healbell = ["9M"];
		this.species.getLearnsetData('houndstone').learnset.helpinghand = ["9M"];
		this.species.getLearnsetData('houndstone').learnset.irontail = ["9M"];
		this.species.getLearnsetData('houndstone').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('houndstone').learnset.painsplit = ["9M"];
		this.species.getLearnsetData('houndstone').learnset.retaliate = ["9M"];
		this.species.getLearnsetData('houndstone').learnset.roar = ["9M"];
		this.species.getLearnsetData('houndstone').learnset.spite = ["9M"];
		delete this.species.getLearnsetData('houndstone').learnset.doubleedge;
		// Flamigo
		this.species.getLearnsetData('flamigo').learnset.highjumpkick = ["9D"];
		this.species.getLearnsetData('flamigo').learnset.jumpkick = ["9L39"];
		this.species.getLearnsetData('flamigo').learnset.afteryou = ["9M"];
		this.species.getLearnsetData('flamigo').learnset.allyswitch = ["9M"];
		this.species.getLearnsetData('flamigo').learnset.defog = ["9M"];
		this.species.getLearnsetData('flamigo').learnset.payback = ["9L27", "9M"];
		this.species.getLearnsetData('flamigo').learnset.retaliate = ["9M"];
		this.species.getLearnsetData('flamigo').learnset.rocksmash = ["9M"];
		this.species.getLearnsetData('flamigo').learnset.roleplay = ["9M"];
		this.species.getLearnsetData('flamigo').learnset.roost = ["9L31", "9M"];
		this.species.getLearnsetData('flamigo').learnset.screech = ["9M"];
		this.species.getLearnsetData('flamigo').learnset.skyattack = ["9M"];
		delete this.species.getLearnsetData('flamigo').learnset.megakick;
		// Cetoddle
		this.species.getLearnsetData('cetoddle').learnset.rebound = ["9D"];
		this.species.getLearnsetData('cetoddle').learnset.blizzard = ["9L44", "9M"];
		this.species.getLearnsetData('cetoddle').learnset.snowtumble = ["9L53"];
		this.species.getLearnsetData('cetoddle').learnset.auroraveil = ["9M"];
		this.species.getLearnsetData('cetoddle').learnset.bounce = ["9L31", "9M"];
		this.species.getLearnsetData('cetoddle').learnset.brutalswing = ["9M"];
		this.species.getLearnsetData('cetoddle').learnset.dualchop = ["9M"];
		this.species.getLearnsetData('cetoddle').learnset.echoedvoice = ["9L9", "9M"];
		this.species.getLearnsetData('cetoddle').learnset.frostbreath = ["9M"];
		this.species.getLearnsetData('cetoddle').learnset.gyroball = ["9M"];
		this.species.getLearnsetData('cetoddle').learnset.irontail = ["9M"];
		this.species.getLearnsetData('cetoddle').learnset.knockoff = ["9M"];
		this.species.getLearnsetData('cetoddle').learnset.roar = ["9M"];
		this.species.getLearnsetData('cetoddle').learnset.rocksmash = ["9M"];
		this.species.getLearnsetData('cetoddle').learnset.screech = ["9M"];
		this.species.getLearnsetData('cetoddle').learnset.smartstrike = ["9M"];
		this.species.getLearnsetData('cetoddle').learnset.strength = ["9M"];
		delete this.species.getLearnsetData('cetoddle').learnset.earthquake;
		// Cetitan
		this.species.getLearnsetData('cetitan').learnset.rebound = ["9D"];
		this.species.getLearnsetData('cetitan').learnset.blizzard = ["9L44", "9M"];
		this.species.getLearnsetData('cetitan').learnset.snowtumble = ["9L53"];
		this.species.getLearnsetData('cetitan').learnset.auroraveil = ["9M"];
		this.species.getLearnsetData('cetitan').learnset.bounce = ["9L31", "9M"];
		this.species.getLearnsetData('cetitan').learnset.brutalswing = ["9M"];
		this.species.getLearnsetData('cetitan').learnset.dualchop = ["9M"];
		this.species.getLearnsetData('cetitan').learnset.echoedvoice = ["9L9", "9M"];
		this.species.getLearnsetData('cetitan').learnset.frostbreath = ["9M"];
		this.species.getLearnsetData('cetitan').learnset.gyroball = ["9M"];
		this.species.getLearnsetData('cetitan').learnset.irontail = ["9M"];
		this.species.getLearnsetData('cetitan').learnset.knockoff = ["9M"];
		this.species.getLearnsetData('cetitan').learnset.roar = ["9M"];
		this.species.getLearnsetData('cetitan').learnset.rocksmash = ["9M"];
		this.species.getLearnsetData('cetitan').learnset.screech = ["9M"];
		this.species.getLearnsetData('cetitan').learnset.smartstrike = ["9M"];
		this.species.getLearnsetData('cetitan').learnset.strength = ["9M"];
		this.species.getLearnsetData('cetitan').learnset.superpower = ["9M"];
		// Veluza
		this.species.getLearnsetData('veluza').learnset.sharpen = ["9D"];
		this.species.getLearnsetData('veluza').learnset.autotomize = ["9L15"];
		this.species.getLearnsetData('veluza').learnset.fishiousrend = ["9L45"];
		this.species.getLearnsetData('veluza').learnset.metaledge = ["9L50"];
		this.species.getLearnsetData('veluza').learnset.brine = ["9M"];
		this.species.getLearnsetData('veluza').learnset.dive = ["9M"];
		this.species.getLearnsetData('veluza').learnset.endeavor = ["9M"];
		this.species.getLearnsetData('veluza').learnset.fullcollide = ["9M"];
		this.species.getLearnsetData('veluza').learnset.irontail = ["9M"];
		this.species.getLearnsetData('veluza').learnset.painsplit = ["9M"];
		this.species.getLearnsetData('veluza').learnset.retaliate = ["9M"];
		this.species.getLearnsetData('veluza').learnset.scald = ["9M"];
		this.species.getLearnsetData('veluza').learnset.psychicfang = ["9E"];
		delete this.species.getLearnsetData('veluza').learnset.blizzard;
		delete this.species.getLearnsetData('veluza').learnset.crunch;
		delete this.species.getLearnsetData('veluza').learnset.focusenergy;
		delete this.species.getLearnsetData('veluza').learnset.liquidation;
		// Dondozo
		this.species.getLearnsetData('dondozo').learnset.belch = ["9D"];
		this.species.getLearnsetData('dondozo').learnset.breakingswipe = ["9M"];
		this.species.getLearnsetData('dondozo').learnset.brine = ["9M"];
		this.species.getLearnsetData('dondozo').learnset.brutalswing = ["9M"];
		this.species.getLearnsetData('dondozo').learnset.dive = ["9L20", "9M"];
		this.species.getLearnsetData('dondozo').learnset.gastroacid = ["9M"];
		this.species.getLearnsetData('dondozo').learnset.irontail = ["9M"];
		this.species.getLearnsetData('dondozo').learnset.roar = ["9M"];
		this.species.getLearnsetData('dondozo').learnset.rocksmash = ["9M"];
		this.species.getLearnsetData('dondozo').learnset.scald = ["9M"];
		this.species.getLearnsetData('dondozo').learnset.screech = ["9M"];
		this.species.getLearnsetData('dondozo').learnset.strength = ["9M"];
		this.species.getLearnsetData('dondozo').learnset.superpower = ["9M"];
		this.species.getLearnsetData('dondozo').learnset.whirlpool = ["9M"];
		// Tatsugiri
		this.species.getLearnsetData('tatsugiri').learnset.memento = ["9D"];
		this.species.getLearnsetData('tatsugiri').learnset.playdead = ["9L34"];
		this.species.getLearnsetData('tatsugiri').learnset.afteryou = ["9M"];
		this.species.getLearnsetData('tatsugiri').learnset.assurance = ["9M"];
		this.species.getLearnsetData('tatsugiri').learnset.brine = ["9M"];
		this.species.getLearnsetData('tatsugiri').learnset.dive = ["9M"];
		this.species.getLearnsetData('tatsugiri').learnset.irontail = ["9M"];
		this.species.getLearnsetData('tatsugiri').learnset.quash = ["9M"];
		this.species.getLearnsetData('tatsugiri').learnset.recycle = ["9M"];
		this.species.getLearnsetData('tatsugiri').learnset.roleplay = ["9M"];
		this.species.getLearnsetData('tatsugiri').learnset.scald = ["9M"];
		// Annihilape
		this.species.getLearnsetData('annihilape').learnset.selfdestruct = ["9D"];
		this.species.getLearnsetData('annihilape').learnset.vengefulspirit = ["9L0"];
		this.species.getLearnsetData('annihilape').learnset.terrify = ["9L44"];
		this.species.getLearnsetData('annihilape').learnset.assurance = ["9M"];
		this.species.getLearnsetData('annihilape').learnset.dualchop = ["9M"];
		this.species.getLearnsetData('annihilape').learnset.endeavor = ["9M"];
		this.species.getLearnsetData('annihilape').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('annihilape').learnset.payback = ["9M"];
		this.species.getLearnsetData('annihilape').learnset.retaliate = ["9M"];
		this.species.getLearnsetData('annihilape').learnset.rocksmash = ["9M"];
		this.species.getLearnsetData('annihilape').learnset.roleplay = ["9M"];
		this.species.getLearnsetData('annihilape').learnset.screech = ["9M"];
		this.species.getLearnsetData('annihilape').learnset.smackdown = ["9M"];
		this.species.getLearnsetData('annihilape').learnset.strength = ["9M"];
		this.species.getLearnsetData('annihilape').learnset.superpower = ["9M"];
		delete this.species.getLearnsetData('annihilape').learnset.shadowpunch;
		// Clodsire
		this.species.getLearnsetData('clodsire').learnset.headbutt = ["9D"];
		this.species.getLearnsetData('clodsire').learnset.barbbarrage = ["9L0"];
		this.species.getLearnsetData('clodsire').learnset.yawn = ["9L23"];
		this.species.getLearnsetData('clodsire').learnset.poisonjab = ["9L28", "9M"];
		this.species.getLearnsetData('clodsire').learnset.sludgewave = ["9L34", "9M"];
		this.species.getLearnsetData('clodsire').learnset.amnesia = ["9L40", "9M"];
		this.species.getLearnsetData('clodsire').learnset.toxic = ["9L46", "9M"];
		this.species.getLearnsetData('clodsire').learnset.earthquake = ["9L52", "9M"];
		this.species.getLearnsetData('clodsire').learnset.gastroacid = ["9M"];
		this.species.getLearnsetData('clodsire').learnset.irontail = ["9M"];
		this.species.getLearnsetData('clodsire').learnset.rocksmash = ["9M"];
		this.species.getLearnsetData('clodsire').learnset.strength = ["9M"];
		this.species.getLearnsetData('clodsire').learnset.toxic = ["9M"];
		delete this.species.getLearnsetData('clodsire').learnset.megahorn;
		// Farigiraf
		this.species.getLearnsetData('farigiraf').learnset.headsmash = ["9D"];
		this.species.getLearnsetData('farigiraf').learnset.barrierbash = ["9L23"];
		this.species.getLearnsetData('farigiraf').learnset.agility = ["9L32"];
		this.species.getLearnsetData('farigiraf').learnset.zenheadbutt = ["9L46", "9M"];
		this.species.getLearnsetData('farigiraf').learnset.assurance = ["9L10", "9M"];
		this.species.getLearnsetData('farigiraf').learnset.brutalswing = ["9M"];
		this.species.getLearnsetData('farigiraf').learnset.dreameater = ["9M"];
		this.species.getLearnsetData('farigiraf').learnset.echoedvoice = ["9M"];
		this.species.getLearnsetData('farigiraf').learnset.fullcollide = ["9M"];
		this.species.getLearnsetData('farigiraf').learnset.futuresight = ["9M"];
		this.species.getLearnsetData('farigiraf').learnset.gravity = ["9M"];
		this.species.getLearnsetData('farigiraf').learnset.irontail = ["9M"];
		this.species.getLearnsetData('farigiraf').learnset.magiccoat = ["9M"];
		this.species.getLearnsetData('farigiraf').learnset.nastyplot = ["9M"];
		this.species.getLearnsetData('farigiraf').learnset.psychup = ["9M"];
		this.species.getLearnsetData('farigiraf').learnset.recycle = ["9M"];
		this.species.getLearnsetData('farigiraf').learnset.retaliate = ["9M"];
		this.species.getLearnsetData('farigiraf').learnset.rocksmash = ["9M"];
		this.species.getLearnsetData('farigiraf').learnset.signalbeam = ["9M"];
		this.species.getLearnsetData('farigiraf').learnset.strength = ["9M"];
		this.species.getLearnsetData('farigiraf').learnset.telekinesis = ["9M"];
		// Dudunsparce
		this.species.getLearnsetData('dudunsparce').learnset.dragondance = ["9D"];
		this.species.getLearnsetData('dudunsparce').learnset.mudslap = ["9L8"];
		this.species.getLearnsetData('dudunsparce').learnset.yawn = ["9L13"];
		this.species.getLearnsetData('dudunsparce').learnset.ancientpower = ["9L16"];
		this.species.getLearnsetData('dudunsparce').learnset.bodyslam = ["9L18"];
		this.species.getLearnsetData('dudunsparce').learnset.dig = ["9L21", "9M"];
		this.species.getLearnsetData('dudunsparce').learnset.roost = ["9L23", "9M"];
		this.species.getLearnsetData('dudunsparce').learnset.drillrun = ["9L26", "9M"];
		this.species.getLearnsetData('dudunsparce').learnset.coil = ["9L28"];
		this.species.getLearnsetData('dudunsparce').learnset.escapetunnel = ["9L31"];
		this.species.getLearnsetData('dudunsparce').learnset.glare = ["9L33"];
		this.species.getLearnsetData('dudunsparce').learnset.doubleedge = ["9L36"];
		this.species.getLearnsetData('dudunsparce').learnset.endeavor = ["9L38", "9M"];
		this.species.getLearnsetData('dudunsparce').learnset.airslash = ["9L41"];
		this.species.getLearnsetData('dudunsparce').learnset.dragonrush = ["9L43"];
		this.species.getLearnsetData('dudunsparce').learnset.endure = ["9L46", "9M"];
		this.species.getLearnsetData('dudunsparce').learnset.flail = ["9L48"];
		this.species.getLearnsetData('dudunsparce').learnset.gyroball = ["9M"];
		this.species.getLearnsetData('dudunsparce').learnset.irontail = ["9M"];
		this.species.getLearnsetData('dudunsparce').learnset.lastresort = ["9M"];
		this.species.getLearnsetData('dudunsparce').learnset.magiccoat = ["9M"];
		this.species.getLearnsetData('dudunsparce').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('dudunsparce').learnset.painsplit = ["9M"];
		this.species.getLearnsetData('dudunsparce').learnset.psychup = ["9M"];
		this.species.getLearnsetData('dudunsparce').learnset.retaliate = ["9M"];
		this.species.getLearnsetData('dudunsparce').learnset.rocksmash = ["9M"];
		this.species.getLearnsetData('dudunsparce').learnset.screech = ["9M"];
		this.species.getLearnsetData('dudunsparce').learnset.strength = ["9M"];
		// Kingambit
		this.species.getLearnsetData('kingambit').learnset.powertrip = ["9D"];
		this.species.getLearnsetData('kingambit').learnset.falsesurrender = ["9L0"];
		this.species.getLearnsetData('kingambit').learnset.metaledge = ["9L57"];
		this.species.getLearnsetData('kingambit').learnset.assurance = ["9L33", "9M"];
		this.species.getLearnsetData('kingambit').learnset.brutalswing = ["9M"];
		this.species.getLearnsetData('kingambit').learnset.dualchop = ["9M"];
		this.species.getLearnsetData('kingambit').learnset.embargo = ["9L41", "9M"];
		this.species.getLearnsetData('kingambit').learnset.honeclaws = ["9M"];
		this.species.getLearnsetData('kingambit').learnset.ironhead = ["9M"];
		this.species.getLearnsetData('kingambit').learnset.knockoff = ["9M"];
		this.species.getLearnsetData('kingambit').learnset.payback = ["9M"];
		this.species.getLearnsetData('kingambit').learnset.quash = ["9M"];
		this.species.getLearnsetData('kingambit').learnset.retaliate = ["9M"];
		this.species.getLearnsetData('kingambit').learnset.rocksmash = ["9M"];
		this.species.getLearnsetData('kingambit').learnset.roleplay = ["9M"];
		this.species.getLearnsetData('kingambit').learnset.screech = ["9M"];
		this.species.getLearnsetData('kingambit').learnset.snatch = ["9M"];
		this.species.getLearnsetData('kingambit').learnset.spite = ["9M"];
		this.species.getLearnsetData('kingambit').learnset.torment = ["9M"];
		// Great Tusk
		this.species.getLearnsetData('greattusk').learnset.firefang = ["9D"];
		this.species.getLearnsetData('greattusk').learnset.slam = ["9L56"];
		this.species.getLearnsetData('greattusk').learnset.gigaimpact = ["9L84", "9M"];
		this.species.getLearnsetData('greattusk').learnset.headsmash = ["9L91"];
		this.species.getLearnsetData('greattusk').learnset.assurance = ["9M"];
		this.species.getLearnsetData('greattusk').learnset.brutalswing = ["9M"];
		this.species.getLearnsetData('greattusk').learnset.chipaway = ["9M"];
		this.species.getLearnsetData('greattusk').learnset.echoedvoice = ["9M"];
		this.species.getLearnsetData('greattusk').learnset.endeavor = ["9L70", "9M"];
		this.species.getLearnsetData('greattusk').learnset.fullcollide = ["9M"];
		this.species.getLearnsetData('greattusk').learnset.gyroball = ["9M"];
		this.species.getLearnsetData('greattusk').learnset.irontail = ["9M"];
		this.species.getLearnsetData('greattusk').learnset.knockoff = ["9L42", "9M"];
		this.species.getLearnsetData('greattusk').learnset.lastresort = ["9M"];
		this.species.getLearnsetData('greattusk').learnset.payback = ["9M"];
		this.species.getLearnsetData('greattusk').learnset.roar = ["9M"];
		this.species.getLearnsetData('greattusk').learnset.rocksmash = ["9M"];
		this.species.getLearnsetData('greattusk').learnset.screech = ["9M"];
		this.species.getLearnsetData('greattusk').learnset.smartstrike = ["9M"];
		this.species.getLearnsetData('greattusk').learnset.strength = ["9M"];
		this.species.getLearnsetData('greattusk').learnset.superpower = ["9M"];
		// Scream Tail
		this.species.getLearnsetData('screamtail').learnset.bind = ["9D"];
		this.species.getLearnsetData('screamtail').learnset.pounce = ["9L42"];
		this.species.getLearnsetData('screamtail').learnset.playrough = ["9L77"];
		this.species.getLearnsetData('screamtail').learnset.brutalswing = ["9M"];
		this.species.getLearnsetData('screamtail').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('screamtail').learnset.dragontail = ["9M"];
		this.species.getLearnsetData('screamtail').learnset.dreameater = ["9M"];
		this.species.getLearnsetData('screamtail').learnset.echoedvoice = ["9M"];
		this.species.getLearnsetData('screamtail').learnset.endeavor = ["9M"];
		this.species.getLearnsetData('screamtail').learnset.gravity = ["9M"];
		this.species.getLearnsetData('screamtail').learnset.irontail = ["9M"];
		this.species.getLearnsetData('screamtail').learnset.knockoff = ["9M"];
		this.species.getLearnsetData('screamtail').learnset.lastresort = ["9M"];
		this.species.getLearnsetData('screamtail').learnset.magiccoat = ["9M"];
		this.species.getLearnsetData('screamtail').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('screamtail').learnset.painsplit = ["9M"];
		this.species.getLearnsetData('screamtail').learnset.psychup = ["9M"];
		this.species.getLearnsetData('screamtail').learnset.recycle = ["9M"];
		this.species.getLearnsetData('screamtail').learnset.roar = ["9M"];
		this.species.getLearnsetData('screamtail').learnset.roleplay = ["9M"];
		this.species.getLearnsetData('screamtail').learnset.screech = ["9M"];
		this.species.getLearnsetData('screamtail').learnset.telekinesis = ["9M"];
		delete this.species.getLearnsetData('screamtail').learnset.blizzard;
		delete this.species.getLearnsetData('screamtail').learnset.fireblast;
		delete this.species.getLearnsetData('screamtail').learnset.gyroball;
		delete this.species.getLearnsetData('screamtail').learnset.thunder;
		// Brute Bonnet
		this.species.getLearnsetData('brutebonnet').learnset.crunch = ["9D"];
		this.species.getLearnsetData('brutebonnet').learnset.assurance = ["9M"];
		this.species.getLearnsetData('brutebonnet').learnset.compensation = ["9M"];
		this.species.getLearnsetData('brutebonnet').learnset.endeavor = ["9M"];
		this.species.getLearnsetData('brutebonnet').learnset.gastroacid = ["9M"];
		this.species.getLearnsetData('brutebonnet').learnset.knockoff = ["9M"];
		this.species.getLearnsetData('brutebonnet').learnset.payback = ["9M"];
		this.species.getLearnsetData('brutebonnet').learnset.roleplay = ["9M"];
		this.species.getLearnsetData('brutebonnet').learnset.toxic = ["9M"];
		// Flutter Mane
		this.species.getLearnsetData('fluttermane').learnset.lunge = ["9D"];
		this.species.getLearnsetData('fluttermane').learnset.terrify = ["9L21"];
		this.species.getLearnsetData('fluttermane').learnset.dreameater = ["9M"];
		this.species.getLearnsetData('fluttermane').learnset.embargo = ["9M"];
		this.species.getLearnsetData('fluttermane').learnset.gravity = ["9M"];
		this.species.getLearnsetData('fluttermane').learnset.magiccoat = ["9M"];
		this.species.getLearnsetData('fluttermane').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('fluttermane').learnset.painsplit = ["9L77", "9M"];
		this.species.getLearnsetData('fluttermane').learnset.payback = ["9M"];
		this.species.getLearnsetData('fluttermane').learnset.psychup = ["9M"];
		this.species.getLearnsetData('fluttermane').learnset.screech = ["9M"];
		this.species.getLearnsetData('fluttermane').learnset.signalbeam = ["9M"];
		this.species.getLearnsetData('fluttermane').learnset.snatch = ["9M"];
		this.species.getLearnsetData('fluttermane').learnset.spite = ["9L1", "9M"];
		this.species.getLearnsetData('fluttermane').learnset.telekinesis = ["9M"];
		delete this.species.getLearnsetData('fluttermane').learnset.wish;
		// Slither Wing
		this.species.getLearnsetData('slitherwing').learnset.heatcrash = ["9D"];
		this.species.getLearnsetData('slitherwing').learnset.leechlife = ["9L1"];
		this.species.getLearnsetData('slitherwing').learnset.springleap = ["9L21"];
		this.species.getLearnsetData('slitherwing').learnset.whirlwind = ["9L35"];
		this.species.getLearnsetData('slitherwing').learnset.bugbite = ["9L42", "9M"];
		this.species.getLearnsetData('slitherwing').learnset.superpower = ["9L49", "9M"];
		this.species.getLearnsetData('slitherwing').learnset.lunge = ["9L63"];
		this.species.getLearnsetData('slitherwing').learnset.morningsun = ["9L70"];
		this.species.getLearnsetData('slitherwing').learnset.vitaldrain = ["9L77", "9M"];
		this.species.getLearnsetData('slitherwing').learnset.firstimpression = ["9L84"];
		this.species.getLearnsetData('slitherwing').learnset.bounce = ["9M"];
		this.species.getLearnsetData('slitherwing').learnset.defog = ["9M"];
		this.species.getLearnsetData('slitherwing').learnset.endeavor = ["9M"];
		this.species.getLearnsetData('slitherwing').learnset.irontail = ["9M"];
		this.species.getLearnsetData('slitherwing').learnset.rocksmash = ["9M"];
		this.species.getLearnsetData('slitherwing').learnset.strength = ["9M"];
		delete this.species.getLearnsetData('slitherwing').learnset.stomp;
		// Sandy Shocks
		this.species.getLearnsetData('sandyshocks').learnset.steelbeam = ["9D"];
		this.species.getLearnsetData('sandyshocks').learnset.eerieimpulse = ["9M"];
		this.species.getLearnsetData('sandyshocks').learnset.electroweb = ["9M"];
		this.species.getLearnsetData('sandyshocks').learnset.explosion = ["9M"];
		this.species.getLearnsetData('sandyshocks').learnset.flash = ["9M"];
		this.species.getLearnsetData('sandyshocks').learnset.gravity = ["9M"];
		this.species.getLearnsetData('sandyshocks').learnset.gyroball = ["9M"];
		this.species.getLearnsetData('sandyshocks').learnset.magnetrise = ["9M"];
		this.species.getLearnsetData('sandyshocks').learnset.psychup = ["9M"];
		this.species.getLearnsetData('sandyshocks').learnset.recycle = ["9M"];
		this.species.getLearnsetData('sandyshocks').learnset.rocksmash = ["9M"];
		this.species.getLearnsetData('sandyshocks').learnset.screech = ["9L35", "9M"];
		this.species.getLearnsetData('sandyshocks').learnset.shockwave = ["9M"];
		// Iron Treads
		this.species.getLearnsetData('irontreads').learnset.thunderfang = ["9D"];
		this.species.getLearnsetData('irontreads').learnset.metalsound = ["9L14"];
		this.species.getLearnsetData('irontreads').learnset.wildcharge = ["9L56", "9M"];
		this.species.getLearnsetData('irontreads').learnset.heavyslam = ["9L63"];
		this.species.getLearnsetData('irontreads').learnset.spinout = ["9L91"];
		this.species.getLearnsetData('irontreads').learnset.assurance = ["9M"];
		this.species.getLearnsetData('irontreads').learnset.brutalswing = ["9M"];
		this.species.getLearnsetData('irontreads').learnset.chipaway = ["9M"];
		this.species.getLearnsetData('irontreads').learnset.echoedvoice = ["9M"];
		this.species.getLearnsetData('irontreads').learnset.endeavor = ["9L70", "9M"];
		this.species.getLearnsetData('irontreads').learnset.fullcollide = ["9M"];
		this.species.getLearnsetData('irontreads').learnset.gyroball = ["9M"];
		this.species.getLearnsetData('irontreads').learnset.knockoff = ["9L42", "9M"];
		this.species.getLearnsetData('irontreads').learnset.lastresort = ["9M"];
		this.species.getLearnsetData('irontreads').learnset.payback = ["9M"];
		this.species.getLearnsetData('irontreads').learnset.rocksmash = ["9M"];
		this.species.getLearnsetData('irontreads').learnset.screech = ["9M"];
		this.species.getLearnsetData('irontreads').learnset.smartstrike = ["9M"];
		this.species.getLearnsetData('irontreads').learnset.strength = ["9M"];
		this.species.getLearnsetData('irontreads').learnset.superpower = ["9M"];
		// Robo Bundle
		this.species.getLearnsetData('robobundle').learnset.ancientpower = ["9D"];
		this.species.getLearnsetData('robobundle').learnset.liquidation = ["9L49"];
		this.species.getLearnsetData('robobundle').learnset.auroraveil = ["9L84", "9M"];
		this.species.getLearnsetData('robobundle').learnset.brutalswing = ["9M"];
		this.species.getLearnsetData('robobundle').learnset.dive = ["9M"];
		this.species.getLearnsetData('robobundle').learnset.endeavor = ["9M"];
		this.species.getLearnsetData('robobundle').learnset.frostbreath = ["9M"];
		this.species.getLearnsetData('robobundle').learnset.recycle = ["9M"];
		this.species.getLearnsetData('robobundle').learnset.snatch = ["9M"];
		this.species.getLearnsetData('robobundle').learnset.whirlpool = ["9L14", "9M"];
		// Press Hands
		this.species.getLearnsetData('presshands').learnset.completeshock = ["9D"];
		this.species.getLearnsetData('presshands').learnset.chipaway = ["9M"];
		this.species.getLearnsetData('presshands').learnset.eerieimpulse = ["9M"];
		this.species.getLearnsetData('presshands').learnset.electroweb = ["9M"];
		this.species.getLearnsetData('presshands').learnset.flash = ["9M"];
		this.species.getLearnsetData('presshands').learnset.knockoff = ["9M"];
		this.species.getLearnsetData('presshands').learnset.payback = ["9M"];
		this.species.getLearnsetData('presshands').learnset.rocksmash = ["9M"];
		this.species.getLearnsetData('presshands').learnset.roleplay = ["9M"];
		this.species.getLearnsetData('presshands').learnset.shockwave = ["9M"];
		this.species.getLearnsetData('presshands').learnset.smackdown = ["9M"];
		this.species.getLearnsetData('presshands').learnset.strength = ["9M"];
		this.species.getLearnsetData('presshands').learnset.superpower = ["9M"];
		// Mecha Jugulis
		this.species.getLearnsetData('mechajugulis').learnset.dracometeor = ["9D"];
		this.species.getLearnsetData('mechajugulis').learnset.assurance = ["9L14", "9M"];
		this.species.getLearnsetData('mechajugulis').learnset.breakingswipe = ["9M"];
		this.species.getLearnsetData('mechajugulis').learnset.brutalswing = ["9M"];
		this.species.getLearnsetData('mechajugulis').learnset.compensation = ["9M"];
		this.species.getLearnsetData('mechajugulis').learnset.echoedvoice = ["9M"];
		this.species.getLearnsetData('mechajugulis').learnset.fireblast = ["9M"];
		this.species.getLearnsetData('mechajugulis').learnset.flash = ["9M"];
		this.species.getLearnsetData('mechajugulis').learnset.irontail = ["9M"];
		this.species.getLearnsetData('mechajugulis').learnset.knockoff = ["9L63", "9M"];
		this.species.getLearnsetData('mechajugulis').learnset.payback = ["9M"];
		this.species.getLearnsetData('mechajugulis').learnset.psychup = ["9M"];
		this.species.getLearnsetData('mechajugulis').learnset.roar = ["9L7", "9M"];
		this.species.getLearnsetData('mechajugulis').learnset.rocksmash = ["9M"];
		this.species.getLearnsetData('mechajugulis').learnset.roost = ["9M"];
		this.species.getLearnsetData('mechajugulis').learnset.screech = ["9M"];
		this.species.getLearnsetData('mechajugulis').learnset.shockwave = ["9M"];
		this.species.getLearnsetData('mechajugulis').learnset.spite = ["9M"];
		this.species.getLearnsetData('mechajugulis').learnset.superpower = ["9M"];
		this.species.getLearnsetData('mechajugulis').learnset.torment = ["9M"];
		// Astro Glider
		this.species.getLearnsetData('astroglider').learnset.lockon = ["9D"];
		this.species.getLearnsetData('astroglider').learnset.flash = ["9M"];
		this.species.getLearnsetData('astroglider').learnset.incinerate = ["9M"];
		this.species.getLearnsetData('astroglider').learnset.magnetrise = ["9M"];
		this.species.getLearnsetData('astroglider').learnset.shockwave = ["9M"];
		this.species.getLearnsetData('astroglider').learnset.signalbeam = ["9M"];
		this.species.getLearnsetData('astroglider').learnset.meteorbeam = ["9T"];
		// Armor Thorns
		this.species.getLearnsetData('armorthorns').learnset.heavyslam = ["9D"];
		this.species.getLearnsetData('armorthorns').learnset.spark = ["9L14"];
		this.species.getLearnsetData('armorthorns').learnset.assurance = ["9M"];
		this.species.getLearnsetData('armorthorns').learnset.brutalswing = ["9M"];
		this.species.getLearnsetData('armorthorns').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('armorthorns').learnset.chipaway = ["9M"];
		this.species.getLearnsetData('armorthorns').learnset.eerieimpulse = ["9M"];
		this.species.getLearnsetData('armorthorns').learnset.electroweb = ["9M"];
		this.species.getLearnsetData('armorthorns').learnset.flash = ["9M"];
		this.species.getLearnsetData('armorthorns').learnset.fullcollide = ["9M"];
		this.species.getLearnsetData('armorthorns').learnset.honeclaws = ["9M"];
		this.species.getLearnsetData('armorthorns').learnset.irontail = ["9M"];
		this.species.getLearnsetData('armorthorns').learnset.knockoff = ["9M"];
		this.species.getLearnsetData('armorthorns').learnset.magnetrise = ["9M"];
		this.species.getLearnsetData('armorthorns').learnset.payback = ["9M"];
		this.species.getLearnsetData('armorthorns').learnset.roar = ["9M"];
		this.species.getLearnsetData('armorthorns').learnset.rocksmash = ["9M"];
		this.species.getLearnsetData('armorthorns').learnset.screech = ["9L7", "9M"];
		this.species.getLearnsetData('armorthorns').learnset.shockwave = ["9M"];
		this.species.getLearnsetData('armorthorns').learnset.smackdown = ["9M"];
		this.species.getLearnsetData('armorthorns').learnset.spite = ["9M"];
		this.species.getLearnsetData('armorthorns').learnset.strength = ["9M"];
		this.species.getLearnsetData('armorthorns').learnset.superpower = ["9M"];
		this.species.getLearnsetData('armorthorns').learnset.torment = ["9M"];
		// Frigibax
		this.species.getLearnsetData('frigibax').learnset.metalburst = ["9D"];
		this.species.getLearnsetData('frigibax').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('frigibax').learnset.flash = ["9M"];
		this.species.getLearnsetData('frigibax').learnset.frostbreath = ["9M"];
		this.species.getLearnsetData('frigibax').learnset.honeclaws = ["9M"];
		this.species.getLearnsetData('frigibax').learnset.irontail = ["9M"];
		this.species.getLearnsetData('frigibax').learnset.retaliate = ["9M"];
		this.species.getLearnsetData('frigibax').learnset.screech = ["9M"];
		// Arctibax
		this.species.getLearnsetData('arctibax').learnset.aquacutter = ["9D"];
		this.species.getLearnsetData('arctibax').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('arctibax').learnset.chipaway = ["9M"];
		this.species.getLearnsetData('arctibax').learnset.dualchop = ["9M"];
		this.species.getLearnsetData('arctibax').learnset.endeavor = ["9M"];
		this.species.getLearnsetData('arctibax').learnset.flash = ["9M"];
		this.species.getLearnsetData('arctibax').learnset.frostbreath = ["9M"];
		this.species.getLearnsetData('arctibax').learnset.honeclaws = ["9M"];
		this.species.getLearnsetData('arctibax').learnset.irontail = ["9M"];
		this.species.getLearnsetData('arctibax').learnset.retaliate = ["9M"];
		this.species.getLearnsetData('arctibax').learnset.rocksmash = ["9M"];
		this.species.getLearnsetData('arctibax').learnset.screech = ["9M"];
		// Baxcalibur
		this.species.getLearnsetData('baxcalibur').learnset.metaledge = ["9D"];
		this.species.getLearnsetData('baxcalibur').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('baxcalibur').learnset.assurance = ["9M"];
		this.species.getLearnsetData('baxcalibur').learnset.breakingswipe = ["9M"];
		this.species.getLearnsetData('baxcalibur').learnset.brutalswing = ["9M"];
		this.species.getLearnsetData('baxcalibur').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('baxcalibur').learnset.chipaway = ["9M"];
		this.species.getLearnsetData('baxcalibur').learnset.dualchop = ["9M"];
		this.species.getLearnsetData('baxcalibur').learnset.endeavor = ["9M"];
		this.species.getLearnsetData('baxcalibur').learnset.flash = ["9M"];
		this.species.getLearnsetData('baxcalibur').learnset.frostbreath = ["9M"];
		this.species.getLearnsetData('baxcalibur').learnset.honeclaws = ["9M"];
		this.species.getLearnsetData('baxcalibur').learnset.irontail = ["9M"];
		this.species.getLearnsetData('baxcalibur').learnset.retaliate = ["9M"];
		this.species.getLearnsetData('baxcalibur').learnset.rocksmash = ["9M"];
		this.species.getLearnsetData('baxcalibur').learnset.screech = ["9M"];
		this.species.getLearnsetData('baxcalibur').learnset.strength = ["9M"];
		// Gimmighoul Roaming
		this.species.getLearnsetData('gimmighoulroaming').learnset.autotomize = ["9D"];
		this.species.getLearnsetData('gimmighoulroaming').learnset.payday = ["9L1"];
		this.species.getLearnsetData('gimmighoulroaming').learnset.embargo = ["9M"];
		this.species.getLearnsetData('gimmighoulroaming').learnset.flash = ["9M"];
		this.species.getLearnsetData('gimmighoulroaming').learnset.fullcollide = ["9M"];
		this.species.getLearnsetData('gimmighoulroaming').learnset.magiccoat = ["9M"];
		this.species.getLearnsetData('gimmighoulroaming').learnset.roleplay = ["9M"];
		// Gimmighoul
		this.species.getLearnsetData('gimmighoul').learnset.shelter = ["9D"];
		this.species.getLearnsetData('gimmighoul').learnset.payday = ["9L1"];
		this.species.getLearnsetData('gimmighoul').learnset.embargo = ["9M"];
		this.species.getLearnsetData('gimmighoul').learnset.flash = ["9M"];
		this.species.getLearnsetData('gimmighoul').learnset.fullcollide = ["9M"];
		this.species.getLearnsetData('gimmighoul').learnset.magiccoat = ["9M"];
		this.species.getLearnsetData('gimmighoul').learnset.roleplay = ["9M"];
		// Gholdengo
		this.species.getLearnsetData('gholdengo').learnset.surf = ["9D"];
		this.species.getLearnsetData('gholdengo').learnset.payday = ["9L1"];
		this.species.getLearnsetData('gholdengo').learnset.metalburst = ["9L14"];
		this.species.getLearnsetData('gholdengo').learnset.mirrorshot = ["9L28"];
		this.species.getLearnsetData('gholdengo').learnset.metalsound = ["9L49"];
		this.species.getLearnsetData('gholdengo').learnset.flashcannon = ["9L56", "9M"];
		this.species.getLearnsetData('gholdengo').learnset.powergem = ["9M"];
		this.species.getLearnsetData('gholdengo').learnset.embargo = ["9M"];
		this.species.getLearnsetData('gholdengo').learnset.flash = ["9M"];
		this.species.getLearnsetData('gholdengo').learnset.fullcollide = ["9M"];
		this.species.getLearnsetData('gholdengo').learnset.gravity = ["9M"];
		this.species.getLearnsetData('gholdengo').learnset.healbell = ["9M"];
		this.species.getLearnsetData('gholdengo').learnset.knockoff = ["9M"];
		this.species.getLearnsetData('gholdengo').learnset.magiccoat = ["9M"];
		this.species.getLearnsetData('gholdengo').learnset.poltergeist = ["9M"];
		this.species.getLearnsetData('gholdengo').learnset.rocksmash = ["9M"];
		this.species.getLearnsetData('gholdengo').learnset.roleplay = ["9M"];
		this.species.getLearnsetData('gholdengo').learnset.snatch = ["9M"];
		delete this.species.getLearnsetData('gholdengo').learnset.confuseray;
		// Wo-Chien
		this.species.getLearnsetData('wochien').learnset.strengthsap = ["9D"];
		this.species.getLearnsetData('wochien').learnset.ingrain = ["9L5"];
		this.species.getLearnsetData('wochien').learnset.growth = ["9L25"];
		this.species.getLearnsetData('wochien').learnset.leechseed = ["9L30"];
		this.species.getLearnsetData('wochien').learnset.leaftornado = ["9L35"];
		this.species.getLearnsetData('wochien').learnset.ominouswind = ["9L60"];
		this.species.getLearnsetData('wochien').learnset.grudge = ["9L65"];
		this.species.getLearnsetData('wochien').learnset.compensation = ["9M"];
		this.species.getLearnsetData('wochien').learnset.grassyterrain = ["9M"];
		this.species.getLearnsetData('wochien').learnset.magiccoat = ["9M"];
		this.species.getLearnsetData('wochien').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('wochien').learnset.painsplit = ["9M"];
		this.species.getLearnsetData('wochien').learnset.payback = ["9M"];
		this.species.getLearnsetData('wochien').learnset.poltergeist = ["9M"];
		this.species.getLearnsetData('wochien').learnset.snatch = ["9M"];
		this.species.getLearnsetData('wochien').learnset.spite = ["9M"];
		this.species.getLearnsetData('wochien').learnset.midnight = ["9T"];
		delete this.species.getLearnsetData('wochien').learnset.stunspore;
		delete this.species.getLearnsetData('wochien').learnset.tickle;
		// Chien-Pao
		this.species.getLearnsetData('chienpao').learnset.hyperfang = ["9D"];
		this.species.getLearnsetData('chienpao').learnset.mist = ["9L30"];
		this.species.getLearnsetData('chienpao').learnset.chipaway = ["9M"];
		this.species.getLearnsetData('chienpao').learnset.compensation = ["9M"];
		this.species.getLearnsetData('chienpao').learnset.frostbreath = ["9M"];
		this.species.getLearnsetData('chienpao').learnset.snowscape = ["9M"];
		this.species.getLearnsetData('chienpao').learnset.irontail = ["9M"];
		this.species.getLearnsetData('chienpao').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('chienpao').learnset.painsplit = ["9M"];
		this.species.getLearnsetData('chienpao').learnset.payback = ["9M"];
		this.species.getLearnsetData('chienpao').learnset.poltergeist = ["9M"];
		this.species.getLearnsetData('chienpao').learnset.rocksmash = ["9M"];
		this.species.getLearnsetData('chienpao').learnset.screech = ["9M"];
		this.species.getLearnsetData('chienpao').learnset.smartstrike = ["9M"];
		this.species.getLearnsetData('chienpao').learnset.snatch = ["9M"];
		this.species.getLearnsetData('chienpao').learnset.spite = ["9M"];
		this.species.getLearnsetData('chienpao').learnset.midnight = ["9T"];
		// Ting-Lu
		this.species.getLearnsetData('tinglu').learnset.headcharge = ["9D"];
		this.species.getLearnsetData('tinglu').learnset.tussle = ["9L1"];
		this.species.getLearnsetData('tinglu').learnset.whirlwind = ["9L5"];
		this.species.getLearnsetData('tinglu').learnset.spikes = ["9L15"];
		this.species.getLearnsetData('tinglu').learnset.bulkup = ["9L25", "9M"];
		this.species.getLearnsetData('tinglu').learnset.stomp = ["9L35"];
		this.species.getLearnsetData('tinglu').learnset.falsesurrender = ["9L55"];
		this.species.getLearnsetData('tinglu').learnset.chipaway = ["9M"];
		this.species.getLearnsetData('tinglu').learnset.compensation = ["9M"];
		this.species.getLearnsetData('tinglu').learnset.fullcollide = ["9M"];
		this.species.getLearnsetData('tinglu').learnset.magiccoat = ["9M"];
		this.species.getLearnsetData('tinglu').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('tinglu').learnset.painsplit = ["9M"];
		this.species.getLearnsetData('tinglu').learnset.payback = ["9M"];
		this.species.getLearnsetData('tinglu').learnset.poltergeist = ["9M"];
		this.species.getLearnsetData('tinglu').learnset.rocksmash = ["9M"];
		this.species.getLearnsetData('tinglu').learnset.screech = ["9M"];
		this.species.getLearnsetData('tinglu').learnset.smartstrike = ["9M"];
		this.species.getLearnsetData('tinglu').learnset.snatch = ["9M"];
		this.species.getLearnsetData('tinglu').learnset.spite = ["9M"];
		this.species.getLearnsetData('tinglu').learnset.superpower = ["9M"];
		this.species.getLearnsetData('tinglu').learnset.midnight = ["9T"];
		delete this.species.getLearnsetData('tinglu').learnset.sandtomb;
		delete this.species.getLearnsetData('tinglu').learnset.throatchop;
		// Chi-Yu
		this.species.getLearnsetData('chiyu').learnset.hypnosis = ["9D"];
		this.species.getLearnsetData('chiyu').learnset.confuseray = ["9L5"];
		this.species.getLearnsetData('chiyu').learnset.nastyplot = ["9L25", "9M"];
		this.species.getLearnsetData('chiyu').learnset.swagger = ["9L30"];
		this.species.getLearnsetData('chiyu').learnset.incinerate = ["9L35", "9M"];
		this.species.getLearnsetData('chiyu').learnset.flameburst = ["9L45"];
		this.species.getLearnsetData('chiyu').learnset.lavaplume = ["9L55"];
		this.species.getLearnsetData('chiyu').learnset.bounce = ["9L60", "9M"];
		this.species.getLearnsetData('chiyu').learnset.memento = ["9L65", "9M"];
		this.species.getLearnsetData('chiyu').learnset.overheat = ["9L70"];
		this.species.getLearnsetData('chiyu').learnset.compensation = ["9M"];
		this.species.getLearnsetData('chiyu').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('chiyu').learnset.painsplit = ["9M"];
		this.species.getLearnsetData('chiyu').learnset.payback = ["9M"];
		this.species.getLearnsetData('chiyu').learnset.poltergeist = ["9M"];
		this.species.getLearnsetData('chiyu').learnset.snatch = ["9M"];
		this.species.getLearnsetData('chiyu').learnset.spite = ["9M"];
		this.species.getLearnsetData('chiyu').learnset.midnight = ["9T"];
		delete this.species.getLearnsetData('chiyu').learnset.flamewheel;
		// Roaring Moon
		this.species.getLearnsetData('roaringmoon').learnset.jawlock = ["9D"];
		this.species.getLearnsetData('roaringmoon').learnset.crunch = ["9L1"];
		this.species.getLearnsetData('roaringmoon').learnset.twister = ["9L1"];
		this.species.getLearnsetData('roaringmoon').learnset.fellswoop = ["9L90"];
		this.species.getLearnsetData('roaringmoon').learnset.assurance = ["9M"];
		this.species.getLearnsetData('roaringmoon').learnset.breakingswipe = ["9M"];
		this.species.getLearnsetData('roaringmoon').learnset.brutalswing = ["9M"];
		this.species.getLearnsetData('roaringmoon').learnset.compensation = ["9M"];
		this.species.getLearnsetData('roaringmoon').learnset.defog = ["9M"];
		this.species.getLearnsetData('roaringmoon').learnset.dualchop = ["9M"];
		this.species.getLearnsetData('roaringmoon').learnset.honeclaws = ["9M"];
		this.species.getLearnsetData('roaringmoon').learnset.irontail = ["9M"];
		this.species.getLearnsetData('roaringmoon').learnset.knockoff = ["9M"];
		this.species.getLearnsetData('roaringmoon').learnset.payback = ["9M"];
		this.species.getLearnsetData('roaringmoon').learnset.roar = ["9M"];
		this.species.getLearnsetData('roaringmoon').learnset.rocksmash = ["9M"];
		this.species.getLearnsetData('roaringmoon').learnset.roost = ["9L84", "9M"];
		this.species.getLearnsetData('roaringmoon').learnset.screech = ["9M"];
		this.species.getLearnsetData('roaringmoon').learnset.spite = ["9M"];
		this.species.getLearnsetData('roaringmoon').learnset.strength = ["9M"];
		this.species.getLearnsetData('roaringmoon').learnset.superpower = ["9M"];
		this.species.getLearnsetData('roaringmoon').learnset.torment = ["9M"];
		delete this.species.getLearnsetData('roaringmoon').learnset.doubleedge;
		delete this.species.getLearnsetData('roaringmoon').learnset.uturn;
		// Valiant Droid
		this.species.getLearnsetData('valiantdroid').learnset.secretsword = ["9D"];
		this.species.getLearnsetData('valiantdroid').learnset.metaledge = ["9L70"];
		this.species.getLearnsetData('valiantdroid').learnset.allyswitch = ["9M"];
		this.species.getLearnsetData('valiantdroid').learnset.dreameater = ["9M"];
		this.species.getLearnsetData('valiantdroid').learnset.dualchop = ["9M"];
		this.species.getLearnsetData('valiantdroid').learnset.futuresight = ["9L21", "9M"];
		this.species.getLearnsetData('valiantdroid').learnset.magiccoat = ["9M"];
		this.species.getLearnsetData('valiantdroid').learnset.painsplit = ["9M"];
		this.species.getLearnsetData('valiantdroid').learnset.psychup = ["9M"];
		this.species.getLearnsetData('valiantdroid').learnset.recycle = ["9M"];
		this.species.getLearnsetData('valiantdroid').learnset.rocksmash = ["9M"];
		this.species.getLearnsetData('valiantdroid').learnset.snatch = ["9M"];
		this.species.getLearnsetData('valiantdroid').learnset.torment = ["9M"];
		// Koraidon
		this.species.getLearnsetData('koraidon').learnset.bellydrum = ["9D"];
		this.species.getLearnsetData('koraidon').learnset.rocksmash = ["9L1", "9M"];
		this.species.getLearnsetData('koraidon').learnset.karatechop = ["9L7"];
		this.species.getLearnsetData('koraidon').learnset.breakingswipe = ["9M"];
		this.species.getLearnsetData('koraidon').learnset.brutalswing = ["9M"];
		this.species.getLearnsetData('koraidon').learnset.chipaway = ["9M"];
		this.species.getLearnsetData('koraidon').learnset.dualchop = ["9M"];
		this.species.getLearnsetData('koraidon').learnset.echoedvoice = ["9M"];
		this.species.getLearnsetData('koraidon').learnset.fly = ["9M"];
		this.species.getLearnsetData('koraidon').learnset.honeclaws = ["9M"];
		this.species.getLearnsetData('koraidon').learnset.irontail = ["9M"];
		this.species.getLearnsetData('koraidon').learnset.knockoff = ["9M"];
		this.species.getLearnsetData('koraidon').learnset.roar = ["9M"];
		this.species.getLearnsetData('koraidon').learnset.screech = ["9L63", "9M"];
		this.species.getLearnsetData('koraidon').learnset.smackdown = ["9M"];
		this.species.getLearnsetData('koraidon').learnset.strength = ["9M"];
		this.species.getLearnsetData('koraidon').learnset.superpower = ["9M"];
		// Miraidon
		this.species.getLearnsetData('miraidon').learnset.volttackle = ["9D"];
		this.species.getLearnsetData('miraidon').learnset.breakingswipe = ["9M"];
		this.species.getLearnsetData('miraidon').learnset.brutalswing = ["9M"];
		this.species.getLearnsetData('miraidon').learnset.dualchop = ["9M"];
		this.species.getLearnsetData('miraidon').learnset.echoedvoice = ["9M"];
		this.species.getLearnsetData('miraidon').learnset.eerieimpulse = ["9M"];
		this.species.getLearnsetData('miraidon').learnset.electroweb = ["9M"];
		this.species.getLearnsetData('miraidon').learnset.flash = ["9M"];
		this.species.getLearnsetData('miraidon').learnset.fly = ["9M"];
		this.species.getLearnsetData('miraidon').learnset.irontail = ["9M"];
		this.species.getLearnsetData('miraidon').learnset.knockoff = ["9M"];
		this.species.getLearnsetData('miraidon').learnset.magnetrise = ["9M"];
		this.species.getLearnsetData('miraidon').learnset.roar = ["9M"];
		this.species.getLearnsetData('miraidon').learnset.rocksmash = ["9M"];
		this.species.getLearnsetData('miraidon').learnset.screech = ["9M"];
		this.species.getLearnsetData('miraidon').learnset.shockwave = ["9L7", "9M"];
		this.species.getLearnsetData('miraidon').learnset.signalbeam = ["9M"];
		// Walking Wake
		this.species.getLearnsetData('walkingwake').learnset.steameruption = ["9D"];
		this.species.getLearnsetData('walkingwake').learnset.scald = ["9L56", "9M"];
		this.species.getLearnsetData('walkingwake').learnset.breakingswipe = ["9L35", "9M"];
		this.species.getLearnsetData('walkingwake').learnset.brine = ["9M"];
		this.species.getLearnsetData('walkingwake').learnset.chipaway = ["9M"];
		this.species.getLearnsetData('walkingwake').learnset.dive = ["9M"];
		this.species.getLearnsetData('walkingwake').learnset.dualchop = ["9M"];
		this.species.getLearnsetData('walkingwake').learnset.echoedvoice = ["9M"];
		this.species.getLearnsetData('walkingwake').learnset.irontail = ["9M"];
		this.species.getLearnsetData('walkingwake').learnset.knockoff = ["9M"];
		this.species.getLearnsetData('walkingwake').learnset.roar = ["9L1", "9M"];
		this.species.getLearnsetData('walkingwake').learnset.rocksmash = ["9M"];
		this.species.getLearnsetData('walkingwake').learnset.screech = ["9M"];
		this.species.getLearnsetData('walkingwake').learnset.whirlpool = ["9M"];
		// Saber Leaves
		this.species.getLearnsetData('saberleaves').learnset.metaledge = ["9D"];
		this.species.getLearnsetData('saberleaves').learnset.psychocut = ["9L56"];
		this.species.getLearnsetData('saberleaves').learnset.allyswitch = ["9L84", "9M"];
		this.species.getLearnsetData('saberleaves').learnset.chipaway = ["9M"];
		this.species.getLearnsetData('saberleaves').learnset.endeavor = ["9M"];
		this.species.getLearnsetData('saberleaves').learnset.magiccoat = ["9M"];
		this.species.getLearnsetData('saberleaves').learnset.quash = ["9M"];
		this.species.getLearnsetData('saberleaves').learnset.retaliate = ["9L14", "9M"];
		this.species.getLearnsetData('saberleaves').learnset.smartstrike = ["9M"];
		this.species.getLearnsetData('saberleaves').learnset.synthesis = ["9M"];

		// Syclar
		this.species.getLearnsetData('syclar').learnset.firstimpression = ["9D"];
		this.species.getLearnsetData('syclar').learnset.leechlife = ["9L1"];
		this.species.getLearnsetData('syclar').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('syclar').learnset.vitaldrain = ["9M"];
		delete this.species.getLearnsetData('syclar').learnset.absorb;
		// Syclant
		this.species.getLearnsetData('syclant').learnset.firstimpression = ["9D"];
		this.species.getLearnsetData('syclant').learnset.leechlife = ["9L1"];
		this.species.getLearnsetData('syclant').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('syclant').learnset.nastyplot = ["9M"];
		this.species.getLearnsetData('syclant').learnset.screech = ["9M"];
		this.species.getLearnsetData('syclant').learnset.stringshot = ["9M"];
		this.species.getLearnsetData('syclant').learnset.trailhead = ["9M"];
		this.species.getLearnsetData('syclant').learnset.vitaldrain = ["9M"];
		delete this.species.getLearnsetData('syclant').learnset.absorb;
		// Revenankh
		this.species.getLearnsetData('revenankh').learnset.poweruppunch = ["9D"];
		this.species.getLearnsetData('revenankh').learnset.phantomforce = ["9M"];
		this.species.getLearnsetData('revenankh').learnset.poltergeist = ["9M"];
		// Embirch
		this.species.getLearnsetData('embirch').learnset.strangesmoke = ["9D"];
		this.species.getLearnsetData('embirch').learnset.trailhead = ["9M"];
		this.species.getLearnsetData('embirch').learnset.pelletshot = ["9E"];
		// Flarelm
		this.species.getLearnsetData('flarelm').learnset.strangesmoke = ["9D"];
		this.species.getLearnsetData('flarelm').learnset.preheat = ["9L1"];
		this.species.getLearnsetData('flarelm').learnset.fullcollide = ["9M"];
		this.species.getLearnsetData('flarelm').learnset.trailhead = ["9M"];
		delete this.species.getLearnsetData('flarelm').learnset.earthquake;
		// Pyroak
		this.species.getLearnsetData('pyroak').learnset.strangesmoke = ["9D"];
		this.species.getLearnsetData('pyroak').learnset.preheat = ["9L1"];
		this.species.getLearnsetData('pyroak').learnset.napalm = ["9L64"];
		this.species.getLearnsetData('pyroak').learnset.fullcollide = ["9M"];
		this.species.getLearnsetData('pyroak').learnset.trailhead = ["9M"];
		// Breezi
		this.species.getLearnsetData('breezi').learnset.aerate = ["9D"];
		this.species.getLearnsetData('breezi').learnset.bounce = ["9M"];
		this.species.getLearnsetData('breezi').learnset.gunkshot = ["9M"];
		this.species.getLearnsetData('breezi').learnset.toxic = ["9M"];
		// Fidgit
		this.species.getLearnsetData('fidgit').learnset.aerate = ["9D"];
		this.species.getLearnsetData('fidgit').learnset.bounce = ["9M"];
		this.species.getLearnsetData('fidgit').learnset.gunkshot = ["9M"];
		this.species.getLearnsetData('fidgit').learnset.smartstrike = ["9M"];
		this.species.getLearnsetData('fidgit').learnset.tantrum = ["9M"];
		this.species.getLearnsetData('fidgit').learnset.toxic = ["9M"];
		// Rebble
		this.species.getLearnsetData('rebble').learnset.cosmicpower = ["9D"];
		this.species.getLearnsetData('rebble').learnset.dustspray = ["9L8"];
		delete this.species.getLearnsetData('rebble').learnset.mudslap;
		// Tactite
		this.species.getLearnsetData('tactite').learnset.cosmicpower = ["9D"];
		this.species.getLearnsetData('tactite').learnset.dustspray = ["9L8"];
		delete this.species.getLearnsetData('tactite').learnset.mudslap;
		// Stratagem
		this.species.getLearnsetData('stratagem').learnset.cosmicpower = ["9D"];
		this.species.getLearnsetData('stratagem').learnset.dustspray = ["9L8"];
		this.species.getLearnsetData('stratagem').learnset.meteorbeam = ["9L0", "9T"];
		delete this.species.getLearnsetData('stratagem').learnset.mudslap;
		delete this.species.getLearnsetData('stratagem').learnset.paleowave;
		// Privatyke
		this.species.getLearnsetData('privatyke').learnset.throatchop = ["9D"];
		this.species.getLearnsetData('privatyke').learnset.whitewater = ["9L4"];
		this.species.getLearnsetData('privatyke').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('privatyke').learnset.octazooka = ["9E"];
		delete this.species.getLearnsetData('privatyke').learnset.blizzard;
		delete this.species.getLearnsetData('privatyke').learnset.earthquake;
		// Arghonaut
		this.species.getLearnsetData('arghonaut').learnset.throatchop = ["9D"];
		this.species.getLearnsetData('arghonaut').learnset.lashout = ["9L1"];
		this.species.getLearnsetData('arghonaut').learnset.whitewater = ["9L4"];
		this.species.getLearnsetData('arghonaut').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('arghonaut').learnset.hydropump = ["9M"];
		delete this.species.getLearnsetData('arghonaut').learnset.blizzard;
		// Nohface
		this.species.getLearnsetData('nohface').learnset.playdead = ["9D"];
		this.species.getLearnsetData('nohface').learnset.pounce = ["9L8"];
		this.species.getLearnsetData('nohface').learnset.doubleteam = ["9E"];
		this.species.getLearnsetData('nohface').learnset.odorsleuth = ["9E"];
		this.species.getLearnsetData('nohface').learnset.phantomforce = ["9M"];
		// Kitsunoh
		this.species.getLearnsetData('kitsunoh').learnset.playdead = ["9D"];
		this.species.getLearnsetData('kitsunoh').learnset.pounce = ["9L8"];
		this.species.getLearnsetData('kitsunoh').learnset.shadowbone = ["9L48"];
		this.species.getLearnsetData('kitsunoh').learnset.phantomforce = ["9M"];
		this.species.getLearnsetData('kitsunoh').learnset.poltergeist = ["9M"];
		this.species.getLearnsetData('kitsunoh').learnset.midnight = ["9T"];
		this.species.getLearnsetData('kitsunoh').learnset.steelbeam = ["9T"];
		delete this.species.getLearnsetData('kitsunoh').learnset.doubleteam;
		delete this.species.getLearnsetData('kitsunoh').learnset.odorsleuth;
		delete this.species.getLearnsetData('kitsunoh').learnset.shadowstrike;
		// Monohm
		this.species.getLearnsetData('monohm').learnset.mindreader = ["9D"];
		this.species.getLearnsetData('monohm').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('monohm').learnset.eerieimpulse = ["9M"];
		this.species.getLearnsetData('monohm').learnset.electroball = ["9M"];
		delete this.species.getLearnsetData('monohm').learnset.blizzard;
		delete this.species.getLearnsetData('monohm').learnset.fireblast;
		delete this.species.getLearnsetData('monohm').learnset.icebeam;
		// Duohm
		this.species.getLearnsetData('duohm').learnset.mindreader = ["9D"];
		this.species.getLearnsetData('duohm').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('duohm').learnset.eerieimpulse = ["9M"];
		this.species.getLearnsetData('duohm').learnset.electroball = ["9M"];
		delete this.species.getLearnsetData('duohm').learnset.blizzard;
		delete this.species.getLearnsetData('duohm').learnset.fireblast;
		delete this.species.getLearnsetData('duohm').learnset.icebeam;
		// Cyclohm
		this.species.getLearnsetData('cyclohm').learnset.mindreader = ["9D"];
		this.species.getLearnsetData('cyclohm').learnset.cyclohm = ["9M"];
		this.species.getLearnsetData('cyclohm').learnset.eerieimpulse = ["9M"];
		this.species.getLearnsetData('cyclohm').learnset.electroball = ["9M"];
		this.species.getLearnsetData('cyclohm').learnset.hurricane = ["9M"];
		delete this.species.getLearnsetData('cyclohm').learnset.fireblast;
		// Dorsoil
		this.species.getLearnsetData('dorsoil').learnset.rebound = ["9D"];
		this.species.getLearnsetData('dorsoil').learnset.dustspray = ["9L16"];
		this.species.getLearnsetData('dorsoil').learnset.tussle = ["9L21"];
		this.species.getLearnsetData('dorsoil').learnset.rapidspin = ["9L26"];
		this.species.getLearnsetData('dorsoil').learnset.rototiller = ["9E"];
		this.species.getLearnsetData('dorsoil').learnset.bodypress = ["9M"];
		delete this.species.getLearnsetData('dorsoil').learnset.mudslap;
		delete this.species.getLearnsetData('dorsoil').learnset.furyattack;
		// Colossoil
		this.species.getLearnsetData('colossoil').learnset.rebound = ["9D"];
		this.species.getLearnsetData('colossoil').learnset.dustspray = ["9L16"];
		this.species.getLearnsetData('colossoil').learnset.tussle = ["9L21"];
		this.species.getLearnsetData('colossoil').learnset.rapidspin = ["9L26"];
		this.species.getLearnsetData('colossoil').learnset.bodypress = ["9M"];
		delete this.species.getLearnsetData('colossoil').learnset.mudslap;
		delete this.species.getLearnsetData('colossoil').learnset.furyattack;
		// Protowatt
		this.species.getLearnsetData('protowatt').learnset.mefirst = ["9D"];
		this.species.getLearnsetData('protowatt').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('protowatt').learnset.flash = ["9M"];
		// Krilowatt
		this.species.getLearnsetData('krilowatt').learnset.heartswap = ["9D"];
		this.species.getLearnsetData('krilowatt').learnset.mindreader = ["9L46"];
		this.species.getLearnsetData('krilowatt').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('krilowatt').learnset.eerieimpulse = ["9M"];
		this.species.getLearnsetData('krilowatt').learnset.electricterrain = ["9M"];
		this.species.getLearnsetData('krilowatt').learnset.electroball = ["9M"];
		delete this.species.getLearnsetData('krilowatt').learnset.blizzard;
		delete this.species.getLearnsetData('krilowatt').learnset.earthquake;
		// Voodoll
		this.species.getLearnsetData('voodoll').learnset.playdead = ["9D"];
		this.species.getLearnsetData('voodoll').learnset.swing = ["9E"];
		// Voodoom
		this.species.getLearnsetData('voodoom').learnset.spiritbreak = ["9D"];
		this.species.getLearnsetData('voodoom').learnset.suckerpunch = ["9L1"];
		this.species.getLearnsetData('voodoom').learnset.brutalswing = ["9M"];
		this.species.getLearnsetData('voodoom').learnset.poltergeist = ["9M"];
		// Scratchet
		this.species.getLearnsetData('scratchet').learnset.morningsun = ["9D"];
		this.species.getLearnsetData('scratchet').learnset.harden = ["9L1"];
		this.species.getLearnsetData('scratchet').learnset.tussle = ["9L4"];
		this.species.getLearnsetData('scratchet').learnset.pounce = ["9L23"];
		this.species.getLearnsetData('scratchet').learnset.roar = ["9M"];
		this.species.getLearnsetData('scratchet').learnset.trailhead = ["9M"];
		// Tomohawk
		this.species.getLearnsetData('tomohawk').learnset.morningsun = ["9D"];
		this.species.getLearnsetData('tomohawk').learnset.whirlwind = ["9L0"];
		this.species.getLearnsetData('tomohawk').learnset.aurasphere = ["9L1"];
		this.species.getLearnsetData('tomohawk').learnset.sunnyday = ["9L1", "9M"];
		this.species.getLearnsetData('tomohawk').learnset.raindance = ["9L1", "9M"];
		this.species.getLearnsetData('tomohawk').learnset.scratch = ["9L1"];
		this.species.getLearnsetData('tomohawk').learnset.harden = ["9L1"];
		this.species.getLearnsetData('tomohawk').learnset.tussle = ["9L4"];
		this.species.getLearnsetData('tomohawk').learnset.rocksmash = ["9L9", "9M"];
		this.species.getLearnsetData('tomohawk').learnset.focusenergy = ["9L13"];
		this.species.getLearnsetData('tomohawk').learnset.furyswipes = ["9L18"];
		this.species.getLearnsetData('tomohawk').learnset.pounce = ["9L23"];
		this.species.getLearnsetData('tomohawk').learnset.airslash = ["9L29"];
		this.species.getLearnsetData('tomohawk').learnset.submission = ["9L37"];
		this.species.getLearnsetData('tomohawk').learnset.hypervoice = ["9L43", "9M"];
		this.species.getLearnsetData('tomohawk').learnset.skydrop = ["9L49"];
		this.species.getLearnsetData('tomohawk').learnset.superpower = ["9L57", "9M"];
		this.species.getLearnsetData('tomohawk').learnset.fellswoop = ["9L63"];
		this.species.getLearnsetData('tomohawk').learnset.rest = ["9L69", "9M"];
		this.species.getLearnsetData('tomohawk').learnset.healingwish = ["9L75"];
		this.species.getLearnsetData('tomohawk').learnset.aerialace = ["9M"];
		this.species.getLearnsetData('tomohawk').learnset.heatwave = ["9M"];
		this.species.getLearnsetData('tomohawk').learnset.hurricane = ["9M"];
		this.species.getLearnsetData('tomohawk').learnset.roar = ["9M"];
		this.species.getLearnsetData('tomohawk').learnset.skyattack = ["9M"];
		this.species.getLearnsetData('tomohawk').learnset.trailhead = ["9M"];
		// Necturine
		this.species.getLearnsetData('necturine').learnset.sketch = ["9D"];
		this.species.getLearnsetData('necturine').learnset.toxic = ["9M"];
		this.species.getLearnsetData('necturine').learnset.vitaldrain = ["9M"];
		delete this.species.getLearnsetData('necturine').learnset.leechlife;
		// Necturna
		this.species.getLearnsetData('necturna').learnset.sketch = ["9D"];
		this.species.getLearnsetData('necturna').learnset.toxic = ["9M"];
		this.species.getLearnsetData('necturna').learnset.vitaldrain = ["9M"];
		delete this.species.getLearnsetData('necturna').learnset.leechlife;
		// Mollux
		this.species.getLearnsetData('mollux').learnset.lifedew = ["9D"];
		this.species.getLearnsetData('mollux').learnset.preheat = ["9L1"];
		this.species.getLearnsetData('mollux').learnset.vitaldrain = ["9M"];
		delete this.species.getLearnsetData('mollux').learnset.leechlife;
		// Cupra
		this.species.getLearnsetData('cupra').learnset.imprison = ["9D"];
		this.species.getLearnsetData('cupra').learnset.doubleteam = ["9L1"];
		// Argalis
		this.species.getLearnsetData('argalis').learnset.imprison = ["9D"];
		this.species.getLearnsetData('argalis').learnset.doubleteam = ["9L1"];
		// Aurumoth
		this.species.getLearnsetData('aurumoth').learnset.imprison = ["9D"];
		this.species.getLearnsetData('aurumoth').learnset.doubleteam = ["9L1"];
		this.species.getLearnsetData('aurumoth').learnset.silverwind = ["9L7"];
		this.species.getLearnsetData('aurumoth').learnset.compensation = ["9M"];
		delete this.species.getLearnsetData('aurumoth').learnset.blizzard;
		delete this.species.getLearnsetData('aurumoth').learnset.thunder;
		// Brattler
		this.species.getLearnsetData('brattler').learnset.spikyshield = ["9D"];
		this.species.getLearnsetData('brattler').learnset.powertrip = ["9L52"]; //Will update when Brattler itself is
		this.species.getLearnsetData('brattler').learnset.compensation = ["9M"];
		this.species.getLearnsetData('brattler').learnset.nastyplot = ["9M"];
		this.species.getLearnsetData('brattler').learnset.toxic = ["9M"];
		this.species.getLearnsetData('brattler').learnset.coil = ["9E"];
		// Malaconda
		this.species.getLearnsetData('malaconda').learnset.rejuvenate = ["9D"];
		this.species.getLearnsetData('malaconda').learnset.powertrip = ["9L52"];
		this.species.getLearnsetData('malaconda').learnset.breakingswipe = ["9M"];
		this.species.getLearnsetData('malaconda').learnset.compensation = ["9M"];
		this.species.getLearnsetData('malaconda').learnset.nastyplot = ["9M"];
		this.species.getLearnsetData('malaconda').learnset.toxic = ["9M"];
		// Cawdet
		this.species.getLearnsetData('cawdet').learnset.throatchop = ["9D"];
		this.species.getLearnsetData('cawdet').learnset.whirlpool = ["9M"];
		delete this.species.getLearnsetData('cawdet').learnset.bellydrum;
		// Cawmodore
		this.species.getLearnsetData('cawmodore').learnset.throatchop = ["9D"];
		this.species.getLearnsetData('cawmodore').learnset.whirlpool = ["9M"];
		// Volkritter
		this.species.getLearnsetData('volkritter').learnset.firelash = ["9D"];
		this.species.getLearnsetData('volkritter').learnset.preheat = ["9L35"];
		this.species.getLearnsetData('volkritter').learnset.liquidation = ["9E"];
		// Volkraken
		this.species.getLearnsetData('volkraken').learnset.firelash = ["9D"];
		this.species.getLearnsetData('volkraken').learnset.preheat = ["9L35"];
		// Snugglow
		this.species.getLearnsetData('snugglow').learnset.overdrive = ["9D"];
		this.species.getLearnsetData('snugglow').learnset.poisonsting = ["9L1"];
		this.species.getLearnsetData('snugglow').learnset.thundershock = ["9L1"];
		this.species.getLearnsetData('snugglow').learnset.supersonic = ["9L6"];
		this.species.getLearnsetData('snugglow').learnset.acid = ["9L9"];
		this.species.getLearnsetData('snugglow').learnset.pounce = ["9L12"];
		this.species.getLearnsetData('snugglow').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('snugglow').learnset.dive = ["9M"];
		this.species.getLearnsetData('snugglow').learnset.electroball = ["9M"];
		this.species.getLearnsetData('snugglow').learnset.surf = ["9M"];
		this.species.getLearnsetData('snugglow').learnset.toxic = ["9M"];
		// Plasmanta
		this.species.getLearnsetData('plasmanta').learnset.overdrive = ["9D"];
		this.species.getLearnsetData('plasmanta').learnset.poisonsting = ["9L1"];
		this.species.getLearnsetData('plasmanta').learnset.thundershock = ["9L1"];
		this.species.getLearnsetData('plasmanta').learnset.supersonic = ["9L6"];
		this.species.getLearnsetData('plasmanta').learnset.acid = ["9L9"];
		this.species.getLearnsetData('plasmanta').learnset.pounce = ["9L12"];
		this.species.getLearnsetData('plasmanta').learnset.bodypress = ["9M"];
		this.species.getLearnsetData('plasmanta').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('plasmanta').learnset.dive = ["9M"];
		this.species.getLearnsetData('plasmanta').learnset.electroball = ["9M"];
		this.species.getLearnsetData('plasmanta').learnset.surf = ["9M"];
		this.species.getLearnsetData('plasmanta').learnset.toxic = ["9M"];
		// Floatoy
		this.species.getLearnsetData('floatoy').learnset.playnice = ["9D"];
		this.species.getLearnsetData('floatoy').learnset.splash = ["9L1"];
		this.species.getLearnsetData('floatoy').learnset.whitewater = ["9L3"];
		this.species.getLearnsetData('floatoy').learnset.chillywater = ["9M"];
		delete this.species.getLearnsetData('floatoy').learnset.blizzard;
		// Caimanoe
		this.species.getLearnsetData('caimanoe').learnset.muddywater = ["9D"];
		this.species.getLearnsetData('caimanoe').learnset.splash = ["9L1"];
		this.species.getLearnsetData('caimanoe').learnset.whitewater = ["9L3"];
		this.species.getLearnsetData('caimanoe').learnset.chillywater = ["9M"];
		delete this.species.getLearnsetData('caimanoe').learnset.blizzard;
		// Naviathan
		this.species.getLearnsetData('naviathan').learnset.nobleroar = ["9D"];
		this.species.getLearnsetData('naviathan').learnset.splash = ["9L1"];
		this.species.getLearnsetData('naviathan').learnset.whitewater = ["9L3"];
		this.species.getLearnsetData('naviathan').learnset.bodypress = ["9M"];
		this.species.getLearnsetData('naviathan').learnset.breakingswipe = ["9M"];
		this.species.getLearnsetData('naviathan').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('naviathan').learnset.screech = ["9M"];
		this.species.getLearnsetData('naviathan').learnset.steelbeam = ["9T"];
		// Crucibelle
		this.species.getLearnsetData('crucibelle').learnset.venomdrench = ["9D"];
		this.species.getLearnsetData('crucibelle').learnset.assurance = ["9M"];
		this.species.getLearnsetData('crucibelle').learnset.faketears = ["9M"];
		this.species.getLearnsetData('crucibelle').learnset.fullcollide = ["9M"];
		this.species.getLearnsetData('crucibelle').learnset.irondefense = ["9M"];
		this.species.getLearnsetData('crucibelle').learnset.powergem = ["9M"];
		this.species.getLearnsetData('crucibelle').learnset.toxic = ["9M"];
		// Pluffle
		this.species.getLearnsetData('pluffle').learnset.rebound = ["9D"];
		this.species.getLearnsetData('pluffle').learnset.daydream = ["9L1"];
		this.species.getLearnsetData('pluffle').learnset.pounce = ["9L16"];
		this.species.getLearnsetData('pluffle').learnset.allyswitch = ["9M"];
		this.species.getLearnsetData('pluffle').learnset.encore = ["9M"];
		// Kerfluffle
		this.species.getLearnsetData('kerfluffle').learnset.rebound = ["9D"];
		this.species.getLearnsetData('kerfluffle').learnset.daydream = ["9L1"];
		this.species.getLearnsetData('kerfluffle').learnset.fairywind = ["9L5"];
		this.species.getLearnsetData('kerfluffle').learnset.pounce = ["9L16"];
		this.species.getLearnsetData('kerfluffle').learnset.snore = ["9L41", "9M"];
		this.species.getLearnsetData('kerfluffle').learnset.allyswitch = ["9M"];
		this.species.getLearnsetData('kerfluffle').learnset.endure = ["9M"];
		// Pajantom
		this.species.getLearnsetData('pajantom').learnset.imprison = ["9D"];
		this.species.getLearnsetData('pajantom').learnset.breakingswipe = ["9M"];
		this.species.getLearnsetData('pajantom').learnset.hex = ["9M"];
		this.species.getLearnsetData('pajantom').learnset.nastyplot = ["9M"];
		this.species.getLearnsetData('pajantom').learnset.poltergeist = ["9M"];
		// Mumbao
		this.species.getLearnsetData('mumbao').learnset.wish = ["9D"];
		this.species.getLearnsetData('mumbao').learnset.daydream = ["9L21"];
		this.species.getLearnsetData('mumbao').learnset.gigadrain = ["9L31"];
		this.species.getLearnsetData('mumbao').learnset.naturalgift = ["9M"];
		this.species.getLearnsetData('mumbao').learnset.teeterdance = ["9E"];
		// Jumbao
		this.species.getLearnsetData('jumbao').learnset.wish = ["9D"];
		this.species.getLearnsetData('jumbao').learnset.daydream = ["9L21"];
		this.species.getLearnsetData('jumbao').learnset.gigadrain = ["9L32"];
		this.species.getLearnsetData('jumbao').learnset.naturalgift = ["9M"];
		// Fawnifer
		this.species.getLearnsetData('fawnifer').learnset.solarblade = ["9D"];
		this.species.getLearnsetData('fawnifer').learnset.charm = ["9M"];
		this.species.getLearnsetData('fawnifer').learnset.endure = ["9M"];
		this.species.getLearnsetData('fawnifer').learnset.trailhead = ["9M"];
		// Electrelk
		this.species.getLearnsetData('electrelk').learnset.solarblade = ["9D"];
		this.species.getLearnsetData('electrelk').learnset.charm = ["9M"];
		this.species.getLearnsetData('electrelk').learnset.eerieimpulse = ["9M"];
		this.species.getLearnsetData('electrelk').learnset.trailhead = ["9M"];
		// Caribolt
		this.species.getLearnsetData('caribolt').learnset.solarblade = ["9D"];
		this.species.getLearnsetData('caribolt').learnset.charm = ["9M"];
		this.species.getLearnsetData('caribolt').learnset.eerieimpulse = ["9M"];
		this.species.getLearnsetData('caribolt').learnset.trailhead = ["9M"];
		// Smogecko
		this.species.getLearnsetData('smogecko').learnset.strangesmoke = ["9D"];
		this.species.getLearnsetData('smogecko').learnset.preheat = ["9L1"];
		this.species.getLearnsetData('smogecko').learnset.tussle = ["9L1"];
		this.species.getLearnsetData('smogecko').learnset.toxic = ["9M"];
		// Smoguana
		this.species.getLearnsetData('smoguana').learnset.strangesmoke = ["9D"];
		this.species.getLearnsetData('smoguana').learnset.preheat = ["9L1"];
		this.species.getLearnsetData('smoguana').learnset.tussle = ["9L1"];
		this.species.getLearnsetData('smoguana').learnset.toxic = ["9M"];
		// Smokomodo
		this.species.getLearnsetData('smokomodo').learnset.strangesmoke = ["9D"];
		this.species.getLearnsetData('smokomodo').learnset.preheat = ["9L1"];
		this.species.getLearnsetData('smokomodo').learnset.tussle = ["9L1"];
		this.species.getLearnsetData('smokomodo').learnset.toxic = ["9M"];
		// Swirlpool
		this.species.getLearnsetData('swirlpool').learnset.lifedew = ["9D"];
		this.species.getLearnsetData('swirlpool').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('swirlpool').learnset.toxic = ["9M"];
		delete this.species.getLearnsetData('swirlpool').learnset.blizzard;
		// Coribalis
		this.species.getLearnsetData('coribalis').learnset.lifedew = ["9D"];
		this.species.getLearnsetData('coribalis').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('coribalis').learnset.toxic = ["9M"];
		delete this.species.getLearnsetData('coribalis').learnset.blizzard;
		// Snaelstrom
		this.species.getLearnsetData('snaelstrom').learnset.lifedew = ["9D"];
		this.species.getLearnsetData('snaelstrom').learnset.chillywater = ["9M"];
		this.species.getLearnsetData('snaelstrom').learnset.toxic = ["9M"];
		delete this.species.getLearnsetData('snaelstrom').learnset.blizzard;
		// Justyke
		this.species.getLearnsetData('justyke').learnset.revenge = ["9D"];
		this.species.getLearnsetData('justyke').learnset.gravity = ["9M"];
		this.species.getLearnsetData('justyke').learnset.steelbeam = ["9T"];
		// Equilibra
		this.species.getLearnsetData('equilibra').learnset.equalizer = ["9D"];
		this.species.getLearnsetData('equilibra').learnset.gravity = ["9M"];
		this.species.getLearnsetData('equilibra').learnset.steelbeam = ["9T"];
		// Solotl
		this.species.getLearnsetData('solotl').learnset.lifedew = ["9D"];
		// Astrolotl
		this.species.getLearnsetData('astrolotl').learnset.lifedew = ["9D"];
		// Miasmite
		this.species.getLearnsetData('miasmite').learnset.jawlock = ["9D"];
		this.species.getLearnsetData('miasmite').learnset.bugbite = ["9L17", "9M"];
		this.species.getLearnsetData('miasmite').learnset.dragontail = ["9M"];
		this.species.getLearnsetData('miasmite').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('miasmite').learnset.ambush = ["9E"];
		this.species.getLearnsetData('miasmite').learnset.firefang = ["9E"];
		this.species.getLearnsetData('miasmite').learnset.icefang = ["9E"];
		this.species.getLearnsetData('miasmite').learnset.thunderfang = ["9E"];
		// Miasmaw
		this.species.getLearnsetData('miasmaw').learnset.jawlock = ["9D"];
		this.species.getLearnsetData('miasmaw').learnset.bugbite = ["9L17", "9M"];
		this.species.getLearnsetData('miasmaw').learnset.block = ["9M"];
		this.species.getLearnsetData('miasmaw').learnset.dragontail = ["9M"];
		this.species.getLearnsetData('miasmaw').learnset.nightmare = ["9M"];
		// Chromera
		this.species.getLearnsetData('chromera').learnset.octazooka = ["9D"];
		this.species.getLearnsetData('chromera').learnset.pounce = ["9L10"];
		this.species.getLearnsetData('chromera').learnset.aerialace = ["9L15", "9M"];
		this.species.getLearnsetData('chromera').learnset.imprison = ["9L20"];
		this.species.getLearnsetData('chromera').learnset.icefang = ["9L25"];
		this.species.getLearnsetData('chromera').learnset.firefang = ["9L25"];
		this.species.getLearnsetData('chromera').learnset.thunderfang = ["9L25"];
		this.species.getLearnsetData('chromera').learnset.spite = ["9L30", "9M"];
		this.species.getLearnsetData('chromera').learnset.firstimpression = ["9L35"];
		this.species.getLearnsetData('chromera').learnset.tantrum = ["9L40", "9M"];
		this.species.getLearnsetData('chromera').learnset.crunch = ["9L45"];
		this.species.getLearnsetData('chromera').learnset.toxic = ["9L50", "9M"];
		this.species.getLearnsetData('chromera').learnset.wideguard = ["9L55"];
		this.species.getLearnsetData('chromera').learnset.lifedew = ["9L60"];
		this.species.getLearnsetData('chromera').learnset.aromatherapy = ["9L65"];
		this.species.getLearnsetData('chromera').learnset.block = ["9M"];
		this.species.getLearnsetData('chromera').learnset.embargo = ["9M"];
		this.species.getLearnsetData('chromera').learnset.honeclaws = ["9M"];
		this.species.getLearnsetData('chromera').learnset.magiccoat = ["9M"];
		this.species.getLearnsetData('chromera').learnset.nightmare = ["9M"];
		this.species.getLearnsetData('chromera').learnset.roar = ["9M"];
		this.species.getLearnsetData('chromera').learnset.signalbeam = ["9M"];
		this.species.getLearnsetData('chromera').learnset.strength = ["9M"];
		//Venomicon
		this.species.getLearnsetData('venomicon').learnset.jawlock = ["9D"];
		this.species.getLearnsetData('venomicon').learnset.curse = ["9L50"];
		this.species.getLearnsetData('venomicon').learnset.fellswoop = ["9L55"];
		this.species.getLearnsetData('venomicon').learnset.hurricane = ["9M"];
		this.species.getLearnsetData('venomicon').learnset.toxic = ["9M"];
		delete this.species.getLearnsetData('venomicon').learnset.coil;
		//Saharascal
		this.species.getLearnsetData('saharascal').learnset.jumpkick = ["9D"];
		this.species.getLearnsetData('saharascal').learnset.dustspray = ["9L4"];
		this.species.getLearnsetData('saharascal').learnset.tussle = ["9L16"];
		this.species.getLearnsetData('saharascal').learnset.bulldoze = ["9L32", "9M"];
		this.species.getLearnsetData('saharascal').learnset.earthquake = ["9L44", "9M"];
		this.species.getLearnsetData('saharascal').learnset.fissure = ["9L48"];
		this.species.getLearnsetData('saharascal').learnset.smackdown = ["9M"];
		this.species.getLearnsetData('saharascal').learnset.waterpulse = ["9M"];
		this.species.getLearnsetData('saharascal').learnset.watergun = ["9E"];
		//Saharaja
		this.species.getLearnsetData('saharaja').learnset.diamondstorm = ["9D"];
		this.species.getLearnsetData('saharaja').learnset.highhorsepower = ["9L0"];
		this.species.getLearnsetData('saharaja').learnset.dustspray = ["9L1"];
		this.species.getLearnsetData('saharaja').learnset.tussle = ["9L1"];
		this.species.getLearnsetData('saharaja').learnset.flash = ["9M"];
		this.species.getLearnsetData('saharaja').learnset.quash = ["9M"];
		this.species.getLearnsetData('saharaja').learnset.smackdown = ["9M"];
		this.species.getLearnsetData('saharaja').learnset.strength = ["9M"];
		this.species.getLearnsetData('saharaja').learnset.waterpulse = ["9M"];
		delete this.species.getLearnsetData('saharaja').learnset.watergun;
	},
};