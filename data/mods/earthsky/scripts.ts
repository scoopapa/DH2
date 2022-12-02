/*namespace TierTypes {
	export type Singles = "AG" | "Uber" | "(Uber)" | "OU" | "(OU)" | "UUBL" | "UU" | "RUBL" | "RU" | "NUBL" | "NU" |
	"(NU)" | "PUBL" | "PU" | "(PU)" | "NFE" | "LC Uber" | "LC";
	export type Doubles = "DUber" | "(DUber)" | "DOU" | "(DOU)" | "DBL" | "DUU" | "(DUU)" | "NFE" | "LC Uber" | "LC";
	export type Other = "Unreleased" | "Illegal" | "ES Uber" | "ES OU" | "ES NFE" | "ES LC" | "CAP" | "CAP NFE" | "CAP LC";
};*/
import {Pokemon} from '../../../sim/pokemon';
import {Battle} from '../../../sim/battle';

export const Scripts: ModdedBattleScriptsData = {
	teambuilderConfig: {
		customTiers: ['earthsky'/*, 'esuber', 'esou', 'esnfe', 'eslc'*/],
	},
	//readonly Pokemon = Pokemon;
	/* sim edits */
	pokemon: {
		getMoves(lockedMove?: string | null, restrictData?: boolean): {
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
					move: this.battle.dex.getMove(lockedMove).name,
					id: lockedMove,
				}];
			}
			const moves = [];
			let hasValidMove = false;
			for (const moveSlot of this.moveSlots) {
				let moveName = moveSlot.move;
				if (moveSlot.id === 'hiddenpower') {
					moveName = 'Hidden Power ' + this.hpType;
					if (this.battle.gen < 6) moveName += ' ' + this.hpPower;
				} else if (moveSlot.id === 'return' || moveSlot.id === 'frustration') {
					const basePowerCallback = this.battle.dex.getMove(moveSlot.id).basePowerCallback as (pokemon: Pokemon) => number;
					moveName += ' ' + basePowerCallback(this);
				}
				let target = moveSlot.target;
				if (moveSlot.id === 'curse') {
					if (!this.hasType('Ghost')) {
						target = this.battle.dex.getMove('curse').nonGhostTarget || moveSlot.target;
					}
				}
				if (moveSlot.id === 'spitup') {
					if (this.volatiles['stockpile']?.layers === 3) {
						target = 'allAdjacentFoes';
					}
				}
				if(this.tacticianBoosted && target === 'normal'){
					target = 'any';
				}
				let disabled = moveSlot.disabled;
				if (this.volatiles['dynamax']) {
					disabled = this.maxMoveDisabled(this.battle.dex.getMove(moveSlot.id));
				} else if (
					(moveSlot.pp <= 0 && !this.volatiles['partialtrappinglock']) || disabled &&
					this.side.active.length >= 2 && this.battle.targetTypeChoices(target!)
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
			if (this.hasAbility('levitate') && !this.battle.suppressingAttackEvents()) return false;
			const item = (this.ignoringItem() ? '' : this.item);
			return item !== 'airballoon';
		},
		canFloat(){ //New method. Not all effects that ground a Pokemon force it to stay grounded. Pokemon immune to Telekinesis are now immune to all floating.
			if (['Burrorm', 'Burryrm', 'Colossoil', 'Diglett', 'Dorsoil', 'Dugtrio', 'Palossand', 'Sandygast'].includes(this.baseSpecies.baseSpecies)){
				this.battle.hint("The Burrorm, Diglett, and Sandygast families are unable to float.");
				return false;
			}
			if ('gravity' in this.battle.field.pseudoWeather) return false;
			if (this.volatiles['ingrain']) return false;
			const item = (this.ignoringItem() ? '' : this.item);
			if (item === 'ironball') return false;
			if (this.hasAbility('suctioncups') || this.hasAbility('heavymetal')) return false;
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
				const canZMove = this.battle.canZMove(this);
				if (canZMove) data.canZMove = canZMove;

				if (this.getDynamaxRequest()) data.canDynamax = true;
				if (data.canDynamax || this.volatiles['dynamax']) data.maxMoves = this.getDynamaxRequest(true);
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
		setStatus( //Toxic Orb can't poison self with Corrosion.
			status: string | Condition,
			source: Pokemon | null = null,
			sourceEffect: Effect | null = null,
			ignoreImmunities = false
		) {
			if (!this.hp) return false;
			status = this.battle.dex.getEffect(status);
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

			if (!ignoreImmunities && status.id &&
					!((source?.hasAbility('corrosion') && source !== this) && ['tox', 'psn'].includes(status.id))) { //Modded: Toxic Orb can't poison self with Corrosion
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
				this.battle.debug('status start [' + status.id + '] interrupted');
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
		removeVolatile(status: string | Effect) { //Adds a runEvent to the removal for effects (namely, Stasis) that prevent it.
			if (!this.hp) return false;
			status = this.battle.dex.getEffect(status) as Effect;
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
		ignoringAbility() { //Added Glyphic Spell's Negate to this.
			// Check if any active pokemon have the ability Neutralizing Gas (MODDED: or Glyphic Spell's Negate)
			let neutralizinggas = false;
			for (const pokemon of this.battle.getAllActive()) {
				// can't use hasAbility because it would lead to infinite recursion
				if ((pokemon.ability === ('neutralizinggas' as ID) || (pokemon.ability === ('glyphicspell' as ID) && pokemon.abilityData.unownType === 'N')) && !pokemon.volatiles['gastroacid'] &&
					!pokemon.abilityData.ending) {
					neutralizinggas = true;
					break;
				}
			}

			return !!(
				(this.battle.gen >= 5 && !this.isActive) ||
				((this.volatiles['gastroacid'] || (neutralizinggas && this.ability !== ('neutralizinggas' as ID) && !(this.ability === ('glyphicspell' as ID) && this.abilityData.unownType === 'N'))) &&
				!this.getAbility().isPermanent
				)
			);
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
			return false;
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
		randomActive() { //Play Dead exclusion
			const actives = this.active.filter(active => active && !active.fainted && !active.volatiles['playdead']);
			if (!actives.length) return null;
			return this.battle.sample(actives);
		}
	},
	//battle: {
		validTargetLoc(targetLoc: number, source: Pokemon, targetType: string) { //Tactician and Play Dead
			if (targetLoc === 0) return true;
			const numSlots = source.side.active.length;
			if (Math.abs(targetLoc) > numSlots) return false;

			const sourceLoc = -(source.position + 1);
			const isFoe = (targetLoc > 0);
			const acrossFromTargetLoc = -(numSlots + 1 - targetLoc);
			const isAdjacent = (isFoe ?
				Math.abs(acrossFromTargetLoc - sourceLoc) <= 1 :
				Math.abs(targetLoc - sourceLoc) === 1);
			const isSelf = (sourceLoc === targetLoc);
			const canTargetAny = source.tacticianBoosted;

			switch (targetType) {
			case 'randomNormal':
			case 'scripted':
			case 'normal':
				return canTargetAny || isAdjacent;
			case 'adjacentAlly':
				return (canTargetAny || isAdjacent) && !isFoe;
			case 'adjacentAllyOrSelf':
				return (canTargetAny || isAdjacent) && !isFoe || isSelf;
			case 'adjacentFoe':
				return (canTargetAny || isAdjacent) && isFoe;
			case 'any':
				return !isSelf;
			}
			return false;
		},
		getTarget(pokemon: Pokemon, move: string | Move, targetLoc: number, originalTarget?: Pokemon) { //Play Dead, Ally Switch
			move = this.dex.getMove(move);

			let tracksTarget = move.tracksTarget;
			// Stalwart sets trackTarget in ModifyMove, but ModifyMove happens after getTarget, so
			// we need to manually check for Stalwart here
			if (pokemon.hasAbility(['stalwart', 'propellertail'])){
				tracksTarget = true;
				//console.log("Targeting spot " + targetLoc);
				//console.log("Target is " + originalTarget + " at " + originalTarget.position);
			}
			if (tracksTarget && originalTarget && originalTarget.isActive && (targetLoc === originalTarget.position + 1) && !originalTarget.volatiles['playdead']) {
				// smart-tracking: move's original target is on the field, not Ally Switched, and not Playing Dead: target it
				return originalTarget;
			}

			// banning Dragon Darts from directly targeting itself is done in side.ts, but
			// Dragon Darts can target itself if Ally Switch is used afterwards
			if (move.smartTarget) return this.getAtLoc(pokemon, targetLoc);

			// Fails if the target is the user and the move can't target its own position
			if (['adjacentAlly', 'any', 'normal'].includes(move.target) && targetLoc === -(pokemon.position + 1) &&
					!pokemon.volatiles['twoturnmove'] && !pokemon.volatiles['rollout']) {
				return move.isFutureMove ? pokemon : null;
			}
			if (move.target !== 'randomNormal' && this.validTargetLoc(targetLoc, pokemon, move.target)) {
				const target = this.getAtLoc(pokemon, targetLoc);
				if (target?.fainted && target.side === pokemon.side) {
					// Target is a fainted ally: attack shouldn't retarget
					return target;
				}
				if (target && !target.fainted && !target.volatiles['playdead']) {
					// Target is unfainted and not Playing Dead: use selected target location
					return target;
				}

				// Chosen target not valid,
				// retarget randomly with getRandomTarget
			}
			return this.getRandomTarget(pokemon, move);
		},
		getRandomTarget(pokemon: Pokemon, move: string | Move) { //Tactician and Play Dead
			// A move was used without a chosen target

			// For instance: Metronome chooses Ice Beam. Since the user didn't
			// choose a target when choosing Metronome, Ice Beam's target must
			// be chosen randomly.

			// The target is chosen randomly from possible targets, EXCEPT that
			// moves that can target either allies or foes will only target foes
			// when used without an explicit target.

			move = this.dex.getMove(move);
			if (move.target === 'adjacentAlly') {
				const allyActives = pokemon.side.active;
				let adjacentAllies = [allyActives[pokemon.position - 1], allyActives[pokemon.position + 1]];
				adjacentAllies = adjacentAllies.filter(active => active && !active.fainted);
				return adjacentAllies.length ? this.sample(adjacentAllies) : null;
			}
			if (move.target === 'self' || move.target === 'all' || move.target === 'allySide' ||
					move.target === 'allyTeam' || move.target === 'adjacentAllyOrSelf') {
				return pokemon;
			}
			if (pokemon.side.active.length > 2) {
				if (!pokemon.tacticianBoosted && (move.target === 'adjacentFoe' || move.target === 'normal' || move.target === 'randomNormal')) {
					// even if a move can target an ally, auto-resolution will never make it target an ally
					// i.e. if both your opponents faint before you use Flamethrower, it will fail instead of targeting your all
					const foeActives = pokemon.side.foe.active;
					const frontPosition = foeActives.length - 1 - pokemon.position;
					let adjacentFoes = foeActives.slice(frontPosition < 1 ? 0 : frontPosition - 1, frontPosition + 2);
					adjacentFoes = adjacentFoes.filter(active => active && !active.fainted && !active.volatiles['playdead']);
					if (adjacentFoes.length) return this.sample(adjacentFoes);
					// no valid target at all, return a foe for any possible redirection
					return foeActives[frontPosition];
				}
			}
			if(pokemon.side.foe.active.length === 1 && pokemon.side.foe.active[0].volatiles['playdead']) return null; //Ran out of retarget checks, except for randomActive() which will get nothing in Singles
			return pokemon.side.foe.randomActive() || pokemon.side.foe.active[0];
		},
		modifyDamage( //Tactician, Dual-type STAB, Terrain change
			baseDamage: number, pokemon: Pokemon, target: Pokemon, move: ActiveMove, suppressMessages = false
		) {
			const tr = this.trunc;
			if (!move.type) move.type = '???';
			const type = move.type;

			baseDamage += 2;

			// multi-target modifier (doubles only)
			if (move.spreadHit) {
				//MODDED: Tactician removes spread reduction
				let canTargetAny = false;
				for(const ally of pokemon.side.active){
					if (ally.hasAbility('tactician')){ 
						canTargetAny = true;
						break;
					}
				}
				if(!canTargetAny){
					const spreadModifier = move.spreadModifier || (this.gameType === 'free-for-all' ? 0.5 : 0.75);
					this.debug('Spread modifier: ' + spreadModifier);
					baseDamage = this.modify(baseDamage, spreadModifier);
				}
			}

			// field modifier
			baseDamage = this.runEvent('WeatherModifyDamage', pokemon, target, move, baseDamage);
			baseDamage = this.runEvent('TerrainModifyDamage', pokemon, target, move, baseDamage);

			// crit - not a modifier
			const isCrit = target.getMoveHitData(move).crit;
			if (isCrit) {
				baseDamage = tr(baseDamage * (move.critModifier || (this.gen >= 6 ? 1.5 : 2)));
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
			if (move.twoType && pokemon.hasType(move.twoType)) { //MODDED: Second move typing also gets STAB.
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
				if (this.gen < 6 || move.id !== 'facade') {
					baseDamage = this.modify(baseDamage, 0.5);
				}
			}

			// Generation 5, but nothing later, sets damage to 1 before the final damage modifiers
			if (this.gen === 5 && !baseDamage) baseDamage = 1;

			// Final modifier. Modifiers that modify damage after min damage check, such as Life Orb.
			baseDamage = this.runEvent('ModifyDamage', pokemon, target, move, baseDamage);

			if (move.isZOrMaxPowered && target.getMoveHitData(move).zBrokeProtect) {
				baseDamage = this.modify(baseDamage, 0.25);
				this.add('-zbroken', target);
			}

			// Generation 6-7 moves the check for minimum 1 damage after the final modifier...
			if (this.gen !== 5 && !baseDamage) return 1;

			// ...but 16-bit truncation happens even later, and can truncate to 0
			return tr(baseDamage, 16);
		},
		singleEvent(
			eventid: string, effect: Effect, effectData: AnyObject | null,
			target: string | Pokemon | Side | Field | Battle | null, source?: string | Pokemon | Effect | false | null,
			sourceEffect?: Effect | string | null, relayVar?: any
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
				this.debug(eventid + ' handler suppressed by Gastro Acid');
				return relayVar;
			}
			if (effect.effectType === 'Weather' && eventid !== 'Start' && eventid !== 'Residual' &&
				eventid !== 'End' && this.field.suppressingWeather()) {
				this.debug(eventid + ' handler suppressed by Air Lock');
				return relayVar;
			}
			if ((effect.effectType === 'Terrain' || eventid === 'Terrain') &&
				eventid !== 'Residual' && eventid !== 'End' && this.field.suppressingTerrain()) {
				this.debug(eventid + ' handler suppressed by Midnight');
				return relayVar;
			}

			// @ts-ignore - dynamic lookup
			const callback = effect[`on${eventid}`];
			if (callback === undefined) return relayVar;

			const parentEffect = this.effect;
			const parentEffectData = this.effectData;
			const parentEvent = this.event;

			this.effect = effect;
			this.effectData = effectData || {};
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
			this.effectData = parentEffectData;
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
			if (eventid === 'Invulnerability' || eventid === 'TryHit' || eventid === 'DamagingHit') {
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
				if (effect.effectType === 'Ability' && !effect.isUnbreakable &&
						this.suppressingAttackEvents(effectHolder as Pokemon)) {
					// ignore attacking events
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
				if (eventid !== 'Start' && eventid !== 'SwitchIn' && eventid !== 'TakeItem' &&
					effect.effectType === 'Item' && (effectHolder instanceof Pokemon) && effectHolder.ignoringItem()) {
					if (eventid !== 'Update') {
						this.debug(eventid + ' handler suppressed by Embargo, Klutz or Magic Room');
					}
					continue;
				} else if (eventid !== 'End' && effect.effectType === 'Ability' &&
						(effectHolder instanceof Pokemon) && effectHolder.ignoringAbility()) {
					if (eventid !== 'Update') {
						this.debug(eventid + ' handler suppressed by Gastro Acid');
					}
					continue;
				}
				if ((effect.effectType === 'Weather' || eventid === 'Weather') &&
					eventid !== 'Residual' && eventid !== 'End' && this.field.suppressingWeather()) {
					this.debug(eventid + ' handler suppressed by Air Lock');
					continue;
				}
				if ((effect.effectType === 'Terrain' || eventid === 'Terrain') &&
					eventid !== 'Residual' && eventid !== 'End' && this.field.suppressingTerrain()) {
					this.debug(eventid + ' handler suppressed by Midnight');
					continue;
				}
				let returnVal;
				if (typeof handler.callback === 'function') {
					const parentEffect = this.effect;
					const parentEffectData = this.effectData;
					this.effect = handler.effect;
					this.effectData = handler.state || {};
					this.effectData.target = effectHolder;

					returnVal = handler.callback.apply(this, args);

					this.effect = parentEffect;
					this.effectData = parentEffectData;
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
	//}
	//actions: {
		runMove(moveOrMoveName, pokemon, targetLoc, sourceEffect, zMove, externalMove, maxMove, originalTarget) { //Tactician, Full Collide on 0 PP
			pokemon.activeMoveActions++;

			// Tactician allows targeting non-adjacents in any case
			let target = this.getTarget(pokemon, maxMove || zMove || moveOrMoveName, targetLoc, originalTarget);
			let baseMove = this.dex.getActiveMove(moveOrMoveName);
			const pranksterBoosted = baseMove.pranksterBoosted;
			if (baseMove.id !== 'struggle' && !zMove && !maxMove && !externalMove) {
				const changedMove = this.runEvent('OverrideAction', pokemon, target, baseMove);
				if (changedMove && changedMove !== true) {
					baseMove = this.dex.getActiveMove(changedMove);
					if (pranksterBoosted) baseMove.pranksterBoosted = pranksterBoosted;
					target = this.getRandomTarget(pokemon, baseMove);
				}
			}
			let move = baseMove;
			if (zMove) {
				move = this.getActiveZMove(baseMove, pokemon);
			} else if (maxMove) {
				move = this.getActiveMaxMove(baseMove, pokemon);
			}

			move.isExternal = externalMove;

			this.setActiveMove(move, pokemon, target);

			/* if (pokemon.moveThisTurn) {
				// THIS IS PURELY A SANITY CHECK
				// DO NOT TAKE ADVANTAGE OF THIS TO PREVENT A POKEMON FROM MOVING;
				// USE this.queue.cancelMove INSTEAD
				this.debug('' + pokemon.id + ' INCONSISTENT STATE, ALREADY MOVED: ' + pokemon.moveThisTurn);
				this.clearActiveMove(true);
				return;
			} */
			const willTryMove = this.runEvent('BeforeMove', pokemon, target, move);
			if (!willTryMove) {
				this.runEvent('MoveAborted', pokemon, target, move);
				this.clearActiveMove(true);
				// The event 'BeforeMove' could have returned false or null
				// false indicates that this counts as a move failing for the purpose of calculating Stomping Tantrum's base power
				// null indicates the opposite, as the Pokemon didn't have an option to choose anything
				pokemon.moveThisTurnResult = willTryMove;
				return;
			}
			if (move.beforeMoveCallback) {
				if (move.beforeMoveCallback.call(this, pokemon, target, move)) {
					this.clearActiveMove(true);
					pokemon.moveThisTurnResult = false;
					return;
				}
			}
			pokemon.lastDamage = 0;
			let lockedMove;
			if (!externalMove) {
				lockedMove = this.runEvent('LockMove', pokemon);
				if (lockedMove === true) lockedMove = false;
				if (!lockedMove) {
					if (!pokemon.deductPP(baseMove, null, target) && (move.id !== 'struggle') && !pokemon.volatiles['fullcollide']) { //Since natural PP deduction will disable move selection, having FC means it was forced down
						this.add('cant', pokemon, 'nopp', move);
						const gameConsole = [
							null, 'Game Boy', 'Game Boy Color', 'Game Boy Advance', 'DS', 'DS', '3DS', '3DS',
						][this.gen] || 'Switch';
						this.hint(`This is not a bug, this is really how it works on the ${gameConsole}; try it yourself if you don't believe us.`);
						this.clearActiveMove(true);
						pokemon.moveThisTurnResult = false;
						return;
					}
				} else {
					sourceEffect = this.dex.getEffect('lockedmove');
				}
				pokemon.moveUsed(move, targetLoc);
			}

			// Dancer Petal Dance hack
			// TODO: implement properly
			const noLock = externalMove && !pokemon.volatiles['lockedmove'];

			if (zMove) {
				if (pokemon.illusion) {
					this.singleEvent('End', this.dex.getAbility('Illusion'), pokemon.abilityData, pokemon);
				}
				this.add('-zpower', pokemon);
				pokemon.side.zMoveUsed = true;
			}
			const moveDidSomething = this.useMove(baseMove, pokemon, target, sourceEffect, zMove, maxMove);
			this.lastSuccessfulMoveThisTurn = moveDidSomething ? this.activeMove && this.activeMove.id : null;
			if (this.activeMove) move = this.activeMove;
			this.singleEvent('AfterMove', move, null, pokemon, target, move);
			this.runEvent('AfterMove', pokemon, target, move);

			// Dancer's activation order is completely different from any other event, so it's handled separately
			if (move.flags['dance'] && moveDidSomething && !move.isExternal) {
				const dancers = [];
				for (const currentPoke of this.getAllActive()) {
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
				for (const dancer of dancers) {
					if (this.faintMessages()) break;
					if (dancer.fainted) continue;
					this.add('-activate', dancer, 'ability: Dancer');
					const dancersTarget = target!.side !== dancer.side && pokemon.side === dancer.side ? target! : pokemon;
					this.runMove(move.id, dancer, this.getTargetLoc(dancersTarget, dancer), this.dex.getAbility('dancer'), undefined, true);
				}
			}
			if (noLock && pokemon.volatiles['lockedmove']) delete pokemon.volatiles['lockedmove'];
		},
		canMegaEvo(pokemon) { //Magic Room suppression, Mega-Ray change
			if('magicroom' in this.field.pseudoWeather) return null;
			const species = pokemon.baseSpecies;
			const altForme = species.otherFormes && this.dex.getSpecies(species.otherFormes[0]);
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
			if('magicroom' in this.field.pseudoWeather) return null;
			if (['Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane'].includes(pokemon.baseSpecies.name) &&
				pokemon.getItem().id === 'ultranecroziumz') {
				return "Necrozma-Ultra";
			}
			return null;
		},
		runMegaEvo(pokemon) { //Extra Magic Room suppression since it doesn't seem to work
			if('magicroom' in this.field.pseudoWeather) return false;
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

			this.runEvent('AfterMega', pokemon);
			return true;
		},
		useMoveInner(moveOrMoveName, pokemon, target, sourceEffect, zMove, maxMove) { //Curse, Sheer Force post-secondary change
			if (!sourceEffect && this.effect.id) sourceEffect = this.effect;
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
				this.singleEvent('ModifyType', move, null, pokemon, target, move, move);
				this.runEvent('ModifyType', pokemon, target, move, move);
			}
			if (maxMove || (move.category !== 'Status' && sourceEffect && (sourceEffect as ActiveMove).isMax)) {
				move = this.getActiveMaxMove(move, pokemon);
			}

			if (this.activeMove) {
				move.priority = this.activeMove.priority;
				if (!move.hasBounced) move.pranksterBoosted = this.activeMove.pranksterBoosted;
			}
			const baseTarget = move.target;
			if (target === undefined) target = this.getRandomTarget(pokemon, move);
			if (move.target === 'self' || move.target === 'allies') {
				target = pokemon;
			}
			if (sourceEffect) {
				move.sourceEffect = sourceEffect.id;
				move.ignoreAbility = false;
			}
			let moveResult = false;

			this.setActiveMove(move, pokemon, target);

			this.singleEvent('ModifyType', move, null, pokemon, target, move, move);
			this.singleEvent('ModifyMove', move, null, pokemon, target, move, move);
			if (baseTarget !== move.target) {
				// Target changed in ModifyMove, so we must adjust it here
				// Adjust before the next event so the correct target is passed to the
				// event
				target = pokemon.side.foe.active[pokemon.side.foe.active.length - 1 - pokemon.position]; //Direct opposite foe
			}
			move = this.runEvent('ModifyType', pokemon, target, move, move);
			move = this.runEvent('ModifyMove', pokemon, target, move, move);
			if (baseTarget !== move.target) {
				// Adjust again
				target = pokemon.side.foe.active[pokemon.side.foe.active.length - 1 - pokemon.position];
			}
			if (!move || pokemon.fainted) {
				return false;
			}

			let attrs = '';

			let movename = move.name;
			if (move.id === 'hiddenpower') movename = 'Hidden Power';
			if (sourceEffect) attrs += `|[from]${sourceEffect.fullname}`;
			if (zMove && move.isZ === true) {
				attrs = '|[anim]' + movename + attrs;
				movename = 'Z-' + movename;
			}
			this.addMove('move', pokemon, movename, target + attrs);

			if (zMove) this.runZPower(move, pokemon);

			if (!target) {
				this.attrLastMove('[notarget]');
				this.add(this.gen >= 5 ? '-fail' : '-notarget', pokemon);
				return false;
			}

			const {targets, pressureTargets} = pokemon.getMoveTargets(move, target);
			if (targets.length) {
				target = targets[targets.length - 1]; // in case of redirection
			}

			if (!sourceEffect || sourceEffect.id === 'pursuit') {
				let extraPP = 0;
				for (const source of pressureTargets) {
					const ppDrop = this.runEvent('DeductPP', source, pokemon, move);
					if (ppDrop !== true) {
						extraPP += ppDrop || 0;
					}
				}
				if (extraPP > 0) {
					pokemon.deductPP(move, extraPP);
				}
			}

			if (!this.singleEvent('TryMove', move, null, pokemon, target, move) ||
				!this.runEvent('TryMove', pokemon, target, move)) {
				move.mindBlownRecoil = false;
				return false;
			}

			this.singleEvent('UseMoveMessage', move, null, pokemon, target, move);

			if (move.ignoreImmunity === undefined) {
				move.ignoreImmunity = (move.category === 'Status');
			}

			if (this.gen !== 4 && move.selfdestruct === 'always') {
				this.faint(pokemon, pokemon, move);
			}

			let damage: number | false | undefined | '' = false;
			if (move.target === 'all' || move.target === 'foeSide' || move.target === 'allySide' || move.target === 'allyTeam') {
				damage = this.tryMoveHit(target, pokemon, move);
				if (damage === this.NOT_FAIL) pokemon.moveThisTurnResult = null;
				if (damage || damage === 0 || damage === undefined) moveResult = true;
			} else {
				if (!targets.length) {
					this.attrLastMove('[notarget]');
					this.add(this.gen >= 5 ? '-fail' : '-notarget', pokemon);
					return false;
				}
				if (this.gen === 4 && move.selfdestruct === 'always') {
					this.faint(pokemon, pokemon, move);
				}
				moveResult = this.trySpreadMoveHit(targets, pokemon, move);
			}
			if (move.selfBoost && moveResult) this.moveHit(pokemon, pokemon, move, move.selfBoost, false, true);
			if (!pokemon.hp) {
				this.faint(pokemon, pokemon, move);
			}

			if (!moveResult) {
				this.singleEvent('MoveFail', move, null, target, pokemon, move);
				return false;
			}

			const originalHp = pokemon.hp;
			this.singleEvent('AfterMoveSecondarySelf', move, null, pokemon, target, move);
			this.runEvent('AfterMoveSecondarySelf', pokemon, target, move);
			if (pokemon && pokemon !== target && move.category !== 'Status') {
				if (pokemon.hp <= pokemon.maxhp / 2 && originalHp > pokemon.maxhp / 2) {
					this.runEvent('EmergencyExit', target, pokemon);
				}
			}

			return true;
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
					if (this.gen >= 5) {
						// 35-35-15-15 out of 100 for 2-3-4-5 hits
						targetHits = this.sample([2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 5, 5, 5]);
					} else {
						targetHits = this.sample([2, 2, 2, 3, 3, 3, 4, 5]);
					}
				} else {
					targetHits = this.random(targetHits[0], targetHits[1] + 1);
				}
			}
			targetHits = Math.floor(targetHits);
			let nullDamage = true;
			let moveDamage: (number | boolean | undefined)[];
			// There is no need to recursively check the ´sleepUsable´ flag as Sleep Talk can only be used while asleep.
			const isSleepUsable = move.sleepUsable || this.dex.getMove(move.sourceEffect).sleepUsable;

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
						this.addMove('-anim', pokemon, move.name, target);
					} else {
						this.retargetLastMove(target);
					}
				}

				// like this (Triple Kick)
				if (target && move.multiaccuracy && hit > 1) {
					let accuracy = move.accuracy;
					const boostTable = [1, 4 / 3, 5 / 3, 2, 7 / 3, 8 / 3, 3];
					if (accuracy !== true) {
						if (!move.ignoreAccuracy) {
							const boosts = this.runEvent('ModifyBoost', pokemon, null, null, {...pokemon.boosts});
							const boost = this.clampIntRange(boosts['accuracy'], -6, 6);
							if (boost > 0) {
								accuracy *= boostTable[boost];
							} else {
								accuracy /= boostTable[-boost];
							}
						}
						if (!move.ignoreEvasion) {
							const boosts = this.runEvent('ModifyBoost', target, null, null, {...target.boosts});
							const boost = this.clampIntRange(boosts['evasion'], -6, 6);
							if (boost > 0) {
								accuracy /= boostTable[boost];
							} else if (boost < 0) {
								accuracy *= boostTable[-boost];
							}
						}
					}
					accuracy = this.runEvent('ModifyAccuracy', target, pokemon, move, accuracy);
					if (!move.alwaysHit) {
						accuracy = this.runEvent('Accuracy', target, pokemon, move, accuracy);
						if (accuracy !== true && !this.randomChance(accuracy, 100)) break;
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
					this.damage(Math.round(pokemon.maxhp / 2), pokemon, pokemon, this.dex.getEffect('Mind Blown'), true);
					move.mindBlownRecoil = false;
				}
				this.eachEvent('Update');
				if (!pokemon.hp && targets.length === 1) {
					hit++; // report the correct number of hits for multihit moves
					break;
				}
			}
			// hit is 1 higher than the actual hit count
			if (hit === 1) return damage.fill(false);
			if (nullDamage) damage.fill(false);
			if (move.multihit && typeof move.smartTarget !== 'boolean') {
				this.add('-hitcount', targets[0], hit - 1);
			}

			if (move.recoil && move.totalDamage) {
				this.damage(this.calcRecoilDamage(move.totalDamage, move), pokemon, pokemon, 'recoil');
			}

			if (move.struggleRecoil) {
				let recoilDamage;
				if (this.dex.gen >= 5) {
					recoilDamage = this.clampIntRange(Math.round(pokemon.baseMaxhp / 4), 1);
				} else {
					recoilDamage = this.trunc(pokemon.maxhp / 4);
				}
				this.directDamage(recoilDamage, pokemon, pokemon, {id: 'strugglerecoil'} as Condition);
			}

			// smartTarget messes up targetsCopy, but smartTarget should in theory ensure that targets will never fail, anyway
			if (move.smartTarget) targetsCopy = targets.slice(0);

			for (const [i, target] of targetsCopy.entries()) {
				if (target && pokemon !== target) {
					target.gotAttacked(move, damage[i] as number | false | undefined, pokemon);
				}
			}

			if (move.ohko && !targets[0].hp) this.add('-ohko');

			if (!damage.some(val => !!val || val === 0)) return damage;

			this.eachEvent('Update');

			this.afterMoveSecondaryEvent(targetsCopy.filter(val => !!val) as Pokemon[], pokemon, move);

			for (const [i, d] of damage.entries()) {
				// There are no multihit spread moves, so it's safe to use move.totalDamage for multihit moves
				// The previous check was for `move.multihit`, but that fails for Dragon Darts
				const curDamage = targets.length === 1 ? move.totalDamage : d;
				if (typeof curDamage === 'number' && targets[i].hp) {
					const targetHPBeforeDamage = (targets[i].hurtThisTurn || 0) + curDamage;
					if (targets[i].hp <= targets[i].maxhp / 2 && targetHPBeforeDamage > targets[i].maxhp / 2) {
						this.runEvent('EmergencyExit', targets[i], pokemon);
					}
				}
			}

			return damage;
		},
		hitStepInvulnerabilityEvent(targets, pokemon, move) { //Toxic buff revert
			if (move.id === 'helpinghand') {
				return new Array(targets.length).fill(true);
			}
			const hitResults = this.runEvent('Invulnerability', targets, pokemon, move);
			for (const [i, target] of targets.entries()) {
				if (hitResults[i] === false) {
					if (move.smartTarget) {
						move.smartTarget = false;
					} else {
						if (!move.spreadHit) this.attrLastMove('[miss]');
						this.add('-miss', pokemon, target);
					}
				}
			}
			return hitResults;
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
						if (!target.volatiles['dynamax'] && pokemon.level >= target.level &&
							(move.ohko === true || !target.hasType(move.ohko))) {
							accuracy += (pokemon.level - target.level);
						} else {
							this.add('-immune', target, '[ohko]');
							hitResults[i] = false;
							continue;
						}
					}
				} else {
					const boostTable = [1, 4 / 3, 5 / 3, 2, 7 / 3, 8 / 3, 3];

					let boosts;
					let boost!: number;
					if (accuracy !== true) {
						if (!move.ignoreAccuracy) {
							boosts = this.runEvent('ModifyBoost', pokemon, null, null, {...pokemon.boosts});
							boost = this.clampIntRange(boosts['accuracy'], -6, 6);
							if (boost > 0) {
								accuracy *= boostTable[boost];
							} else {
								accuracy /= boostTable[-boost];
							}
						}
						if (!move.ignoreEvasion) {
							boosts = this.runEvent('ModifyBoost', target, null, null, {...target.boosts});
							boost = this.clampIntRange(boosts['evasion'], -6, 6);
							if (boost > 0) {
								accuracy /= boostTable[boost];
							} else if (boost < 0) {
								accuracy *= boostTable[-boost];
							}
						}
					}
					accuracy = this.runEvent('ModifyAccuracy', target, pokemon, move, accuracy);
				}
				if (move.alwaysHit) { //MODDED: Removed Toxic's accuracy bypass on Poison-types
					accuracy = true;
				} else {
					accuracy = this.runEvent('Accuracy', target, pokemon, move, accuracy);
				}
				if (accuracy !== true && !this.randomChance(accuracy, 100)) {
					if (move.smartTarget) {
						move.smartTarget = false;
					} else {
						if (!move.spreadHit) this.attrLastMove('[miss]');
						this.add('-miss', pokemon, target);
					}
					if (!move.ohko && pokemon.hasItem('blunderpolicy') && pokemon.useItem()) {
						this.boost({spe: 2}, pokemon);
					}
					hitResults[i] = false;
					continue;
				}
				hitResults[i] = true;
			}
			return hitResults;
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
						this.add('-activate', target, 'ability: Own Tempo');
						this.hint('Own Tempo blocks effects that steal, copy, or overwrite its attributes');
						return;
					}
					this.attrLastMove('[still]');
					this.add('-clearpositiveboost', target, pokemon, 'move: ' + move.name);
					this.boost(boosts, pokemon, pokemon);

					let statName2: BoostName;
					for (statName2 in boosts) {
						boosts[statName2] = 0;
					}
					target.setBoost(boosts);
					this.addMove('-anim', pokemon, "Spectral Thief", target);
				}
			}
			return undefined;
		},
		afterMoveSecondaryEvent(targets, pokemon, move) { //Sheer Force post-secondary change
			this.singleEvent('AfterMoveSecondary', move, null, targets[0], pokemon, move);
			this.runEvent('AfterMoveSecondary', targets, pokemon, move);
			return undefined;
		},
	//},
	/*dex: { //Can't actually be edited here, but these are the functions that got changed
		getImmunity(
			source: {type: string} | string,
			target: {getTypes: () => string[]} | {types: string[]} | string[] | string
		): boolean {
			// Edit for Earth & Sky - can't be done in mod's files
			let sourceType: string = "";
			if(this.currentMod === 'earthsky'){
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
			if(this.currentMod === 'earthsky'){
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
	},*/
	init() {
		/* Removed/renamed accessibility and other init stuff */
		const unavailablePokemon = [
			"pikachubelle", "pikachucosplay", "pikachulibre", "pikachuphd", "pikachupopstar", "pikachurockstar", "pikachustarter", "slowpokegalar", "slowbrogalar", "victreebel", "eeveestarter", "articunogalar", "zapdosgalar", "moltresgalar", "pichuspikyeared", "slowkinggalar", "darmanitangalarzen", "floetteeternal", "lycanrocdusk", "eternatuseternamax", "kubfu", "urshifu", "urshifurapidstrike", "zarudedada", "regieleki", "regidrago", "calyrex", "glastrier", "spectrier", "calyrexshadow", "calyrexice",
		];
		const baseEight = [ //Pokemon using their Gen VIII learnsets as a base
			"charmander", "charmeleon", "charizard", "vileplume", "farfetchd", "farfetchdgalar", "hitmonlee", "hitmonchan", "mrmime", "mrmimegalar", "scyther", "bellossom", "qwilfish", "scizor", "remoraid", "octillery", "tyrogue", "hitmontop", "raikou", "entei", "suicune", "larvitar", "pupitar", "tyranitar", "zigzagoon", "zigzagoongalar", "linoone", "linoonegalar", "lotad", "lombre", "lunatone", "solrock", "bagon", "shelgon", "salamence", "kyogre", "groudon", "rayquaza", "mimejr", "uxie", "mesprit", "azelf", "dialga", "palkia", "giratina", "basculin", "basculinbluestriped", "reshiram", "zekrom", "kyurem", "fletchling", "fletchinder", "talonflame", "swirlix", "slurpuff", "bergmite", "avalugg", "xerneas", "yveltal", "zygarde",
		];
		const deletedItems = [
			"luckypunch", "throatspray", "utilityumbrella",
		];
		const deletedAbilities = [
			"asoneglastrier", "asonespectrier", "battlebond", "chillingneigh", "curiousmedicine", "dragonsmaw", "gorillatactics", "grimneigh", "libero", "mirrorarmor", "perishbody", "punkrock", "steelyspirit", "transistor", "unseenfist",
		];
		const renamedAbilities = [
			"emergencyexit", "wimpout", "minus", "plus", "powerofalchemy", "powerspot", "queenlymajesty", "slushrush", "tanglinghair",
		];
		const newNameAbilities = [
			"escapeplan", "escapeplan", "induction", "induction", "alchemy", "poweraura", "majesty", "snowplow", "tangling",
		];
		const deletedMoves = [
			"appleacid","astralbarrage","burningjealousy","coaching","corrosivegas","decorate","dragonenergy","dualwingbeat","eeriespell","expandingforce","falsesurrender","fierywrath","freezingglare","glaciallance","grassyglide","gravapple","kinesis","mistyexplosion","risingvoltage","scaleshot","scorchingsands","shellsidearm","skittersmack","steelroller","surgingstrikes","terrainpulse","thundercage","thunderouskick","tripleaxel","wickedblow",
		];
		const addedMachines = [ //Machines added in Gen VIII and retained in Earth & Sky
			"amnesia", "assurance", "avalanche", "brine", "charm", "eerieimpulse", "electricterrain", "electroball", "encore", "faketears", "futuresight", "grassyterrain", "hex", "hurricane", "hydropump", "mistyterrain", "nastyplot", "phantomforce", "powergem", "psychicterrain", "screech", "whirlpool"
		];
		const droppedMachines = [ //Machines dropped from Earth & Sky
			"agility","airslash","aurasphere","batonpass","beatup","blazekick","bodyslam","bravebird","bugbuzz","bulletseed","closecombat","confide","cosmicpower","covet","crosspoison","crunch","cut","darkestlariat","doubleteam","dragondance","drainingkiss","firefang","firespin","flareblitz","flash","focusenergy","focuspunch","guardswap","heatcrash","heavyslam","highhorsepower","icefang","iciclespear","imprison","leafblade","leafstorm","liquidation","magicalleaf","megakick","megapunch","megahorn","metronome","mudshot","muddywater","mysticalfire","payday","pinmissile","playrough","pollenpuff","powerswap","poweruppunch","powerwhip","psychicfang","psychocut","razorshell","revenge","reversal","rockblast","sandtomb","scaryface","self-destruct","solarblade","speedswap","spikes","storedpower","strugglebug","swagger","swift","tailslap","throatchop","thunderfang","toxicspikes","triattack","venomdrench","weatherball",
		];
		const renamedMoves = [
			"banefulbunker","clangoroussoul","moongeistbeam","psychicfangs","stompingtantrum","strangesteam","sunsteelstrike",
		];
		const newNameMoves = [
			"bunkerdown","warriorssoul","lunarray","psychicfang","tantrum","strangesmoke","solarimpact",
		];
		const noUniversalTMs = [ //Only Gen 5+ since it's the earliest to lose a universal TM
			"tynamo", "scatterbug", "spewpa", "cosmog", "cosmoem", "blipbug", "applin"
		];
		/* Wide-spread changes */
		const esrules = this.getRuleTable(this.getFormat('gen8earthskyou'));
		//console.log(esrules);
		for (let pokemonID in this.data.Pokedex) {
			const pokemon = this.data.Pokedex[pokemonID];
			const learnsetTest = false;//["farfetchd"].includes(pokemonID);
			 //Don't do anything with the new Pokemon, Totems, and Pokestar Studios opponents
			if(pokemon.num <= -500 || pokemonID.endsWith('totem')) continue;
			//Change generational accessibility
			if(unavailablePokemon.includes(pokemonID) || pokemonID.endsWith('gmax')){
				pokemon.isNonstandard = "Past";
				if(this.data.FormatsData[pokemonID]) this.data.FormatsData[pokemonID].tier = "Illegal";
				continue;
			} else if(this.data.FormatsData[pokemonID]) {
				if(this.data.FormatsData[pokemonID].isNonstandard === "Past"){
					//console.log(pokemon.name + " restoration");
					delete this.modData('FormatsData', pokemonID).isNonstandard;
				}
				if(this.modData('FormatsData', pokemonID).isNonstandard) continue; //All other non-standard Pokemon are to remain unusable
				if(!pokemon.battleOnly){ //Reset tiers for all Pokemon that have their own tiering data
					if(pokemon.evos) {
						this.modData('FormatsData', pokemonID).tier = pokemon.prevo ? "NFE" : "LC";
					} else {
						this.modData('FormatsData', pokemonID).tier = esrules.isBannedSpecies(this.getSpecies(pokemonID)) ? "Uber" : "OU";
						if(learnsetTest){
							console.log(pokemon.name + "'s mod tier: " + this.modData('FormatsData', pokemonID).tier);
							console.log(pokemon.name + "'s format tier: " + this.data.FormatsData[pokemonID].tier);
						}
					}
				}
			}
			//Don't do move stuff with formes that don't have their own movesets (and Xerneas)
			if(pokemon.battleOnly || ["Egelas", "Mega", "Mega-X", "Mega-Y", "Primal"].includes(pokemon.forme) || 
				["Deoxys", "Rotom", "Giratina", "Shaymin", "Arceus", "Keldeo", "Meloetta", "Genesect", "Vivillon", "Aegislash", "Pumpkaboo", "Gourgeist", "Xerneas", "Hoopa", 
				"Oricorio", "Silvally", "Magearna", "Sinistea", "Polteageist", "Eternatus", "Zarude"].includes(pokemon.baseSpecies))
				continue;
			if(learnsetTest) {
				console.log("Modifying learnset of " + pokemon.name);
				console.log(this.modData('Learnsets', pokemonID).learnset);
			}
			/* Moves */
			let moveLearn; //store move learnset to save memory/time
			let moveDropped = false;
			let startGen = (((pokemon.num > 807 || pokemon.num < -60) || baseEight.includes(pokemonID)) ? 8 : 7); //Tags Gen 7 or 8 for level/egg moves
			const levelString = new RegExp(startGen + 'L[0-9]+');
			if(learnsetTest) console.log("Starting with Gen " + startGen);
			
			// For Stone Evolutions, import prevo's level-up learnset at level 1
			const stoneCheck = (startGen === 7 && pokemon.prevo && !(["Eevee", "Sunkern", "Charjabug", "Darumaka-Galar"].includes(pokemon.prevo)) && pokemon.evoItem && 
				["Fire Stone", "Water Stone", "Thunder Stone", "Leaf Stone", "Moon Stone", "Sun Stone", "Shiny Stone", "Dusk Stone", "Ice Stone"].includes(pokemon.evoItem));
			if(stoneCheck){
				if(learnsetTest) console.log("This Pokemon evolves by Evolution Stone and needs its prevo's level-up moves");
				for(const moveID in this.modData('Learnsets', this.toID(pokemon.prevo)).learnset){
					const prevoMove = this.modData('Learnsets', this.toID(pokemon.prevo)).learnset[moveID];
					const esLevelString = new RegExp('8L[0-9]+'); //Prevos will have updated their movepool first (no Pokemon evolves by Stone from one introduced later than it), so moves will always be stored as Gen 8
					if(esLevelString.test(prevoMove[0])){ //Level-up will always be first in updated learnset and we only need it once
						if(learnsetTest) console.log("Importing " + moveID);
						if(this.modData('Learnsets', pokemonID).learnset[moveID]) this.modData('Learnsets', pokemonID).learnset[moveID].unshift("7L1");
						else this.modData('Learnsets', pokemonID).learnset[moveID] = ["7L1"];
					}
				}
				if(learnsetTest) console.log("Commencing update");
			}
			
			for(let moveID in this.data.Moves) { //TODO: change to Dex.moves.all() when DH updates to it
				const move = this.data.Moves[moveID];
				if(move.isZ || move.isMax) continue;
				moveLearn = this.modData('Learnsets', pokemonID).learnset[moveID];
				if(!moveLearn){
					// checks for new universal machines
					if(!(noUniversalTMs.includes(pokemonID))){
						if(moveID === "endure" && (pokemon.num > 493 || pokemon.num < -23)){
							if(learnsetTest) console.log("Adding universal TM Endure");
							this.modData('Learnsets', pokemonID).learnset[moveID] = ["8M"];
						} else if(["hiddenpower", "secretpower", "return", "frustration"].includes(moveID) && (pokemon.num > 809 || pokemon.num < -60)){
							if(learnsetTest) console.log("Adding universal TM " + move.name);
							this.modData('Learnsets', pokemonID).learnset[moveID] = ["8M"];
						}
					}
					continue;
				}
				if(learnsetTest) console.log("Found move " + move.name);
				if(learnsetTest) console.log(moveLearn);
				/* drops deleted moves */
				if(deletedMoves.includes(moveID)) {
					if(learnsetTest) console.log("This move is deleted!");
					delete this.modData('Learnsets', pokemonID).learnset[moveID];
					continue;
				}
				/* Collects means of learning the move in Earth & Sky */
				let moveMeans: string[] = [];
				// Level and egg moves of base gen
				for(const learnType of moveLearn){
					if(levelString.test(learnType)){
						if(stoneCheck) { //Most Stone Evolutions only learn moves at level 1 and therefore we must also make sure they only learn moves once by level
							if(!moveMeans.includes("8L1")) moveMeans.push("8L1");
						/*} else if(learnType === (startGen + "L1") && pokemon.prevo && this.modData('Learnsets', prevo).learnset){ //Removes all instances of evolutions moving moves to level 1
							const prevoLearn = this.modData('Learnsets', prevo).learnset[moveID];
							for(const prevoMeans of prevoLearn){
								if(levelString.test(prevoMeans) && prevoMeans !== (startGen + "L1")){ //Showdown only stores the earliest level, so we only have to check for prevos not having it at 1
									if(learnsetTest) console.log("This move is learned at level 1, but the prevo learns it later; using the later one");
									moveMeans = ["8" + prevoMeans.substring(1)]; //The check comes before non-level means are compiled, so this overrides the level 1 with the other level
								}
							}*/
						} else {
							if(learnsetTest) console.log("This move is learned by level");
							moveMeans.push("8" + learnType.substring(1));
						}
					}
				}
				if(moveLearn.includes("".concat(startGen,"E"))){
					if(learnsetTest) console.log("This move is learned by egg");
					moveMeans.push("8E");
				}
				if(moveLearn.includes("".concat(startGen,"R"))){
					if(learnsetTest) console.log("This move is learned on forme change");
					moveMeans.push("8R");
				}
				// Pulls combined TMs and the three retained Isle Tutors
				if((moveLearn.includes("6M") || moveLearn.includes("7M") || moveLearn.includes("7T") || moveLearn.includes("8M"))){
					if(learnsetTest) console.log("This move is taught by machine");
					moveMeans.push("8M");
				}
				if((moveID === "lashout" || moveID === "poltergeist") && moveLearn.includes("8T")){
					if(learnsetTest) console.log("This move is taught by machine");
					moveMeans.push("8M");
				}
				if(['grasspledge', 'firepledge', 'waterpledge', 'frenzyplant', 'blastburn', 'hydrocannon', 'dracometeor', 'steelbeam', 'meteorbeam'].includes(moveID) && moveLearn.includes("8T")){
					if(learnsetTest) console.log("This move is taught by tutor");
					moveMeans.push("8T");
				}
				if(startGen === 8 && !moveMeans.length && moveLearn.includes("7E")){
					if(learnsetTest) console.log("This move was learned by egg before it got removed");
					moveMeans.push("8E");
				}
				if(learnsetTest) console.log("Compiled: " + moveMeans);
				/* drops removed teachables */
				if(droppedMachines.includes(moveID) && moveMeans.includes("8M")){
					if(learnsetTest) console.log("This move is actually no longer taught"); //Note: Flash is in this list because it's restricted and gets re-added manually
					moveMeans.splice(moveMeans.indexOf("8M"),1);
					if(moveMeans.length === 0){
						delete this.modData('Learnsets', pokemonID).learnset[moveID];
						if(learnsetTest) console.log("This move is not learned anymore");
						continue;
					}
				}
				/* drops egg moves learned by other means */
				if(moveMeans.length > 1 && moveMeans.includes("8E")){
					if(learnsetTest) console.log("This move is redundantly an egg move");
					moveMeans.splice(moveMeans.indexOf("8E"),1);
				}
				/* Move renames */
				//Lash Out - differentiating between old and new
				if(moveID === "lashout" && moveMeans == "8M"){ //Old is machine, new is not
					//console.log("Renaming old Lash Out to Compensation");
					this.modData('Learnsets', pokemonID).learnset[this.toID('compensation')] = ["8M"];
					delete this.modData('Learnsets', pokemonID).learnset[moveID];
					continue;
				}
				//Other
				for(let i = 0; i < renamedMoves.length; i++){
					if(moveID === renamedMoves[i]){
						//console.log("Renaming " + move.name);
						this.modData('Learnsets', pokemonID).learnset[this.toID(newNameMoves[i])] = moveMeans;
						delete this.modData('Learnsets', pokemonID).learnset[moveID];
						moveDropped = true; //We can't use continue to skip the last line because we're inside another for loop
						continue;
					}
				}
				if(!moveDropped) this.modData('Learnsets', pokemonID).learnset[moveID] = moveMeans;
				else {
					moveDropped = false;
				}
			}
			// Ability renames
			for(let i = 0; i < renamedAbilities.length; i++){ //Abilities
				const pokeAbilities = this.modData('Pokedex', pokemonID).abilities;
				for(const abilityKey in pokeAbilities){
					if(this.toID(pokeAbilities[abilityKey]) === renamedAbilities[i]){
						//console.log(this.data.Abilities[renamedAbilities[i]].name + " name change");
						this.modData('Pokedex', pokemonID).abilities[abilityKey] = this.data.Abilities[newNameAbilities[i]].name;
						//console.log(this.modData('Pokedex', pokemonID).abilities[abilityKey]);
						break;
					}
				}
			}
			if(learnsetTest){
				console.log("Final: ");
				console.log(this.modData('Learnsets', pokemonID).learnset);
				console.log("");
			}
		}
		
		/* Delete stuff */
		for(let moveID in this.data.Moves) { //marks all moves as current gen, except renamed ones
			const move = this.modData('Moves', moveID);
			if(move.isNonstandard === "Past" && !renamedMoves.includes(moveID)) delete move.isNonstandard;
			if(move.zMove) delete move.zMove;
		}
		for(const moveID of deletedMoves) { //then drops removed moves as past-gen so they can't be used
			const move = this.modData('Moves', moveID);
			move.isNonstandard = "Past";
		}
		for(const abilityID of renamedAbilities) {
			const ability = this.modData('Abilities', abilityID);
			ability.isNonstandard = "Past";
		}
		for(const abilityID of deletedAbilities) {
			const ability = this.modData('Abilities', abilityID);
			ability.isNonstandard = "Past";
		}
		for(let itemID in this.data.Items) { //marks all items as current gen, except Z-Crystals
			const item = this.modData('Items', itemID);
			if((item.isNonstandard === "Past" || item.isNonstandard === "Unobtainable") && !item.zMove) delete item.isNonstandard;
		}
		for(const itemID of deletedItems) { //then drops removed items as past-gen so they can't be used
			const item = this.modData('Items', itemID);
			item.isNonstandard = "Past";
		}
		
		/* Item adjustments */
		for(let itemID in this.data.Items){
			const item = this.modData('Items', itemID);
			if(item.isBerry && !item.consumable) item.consumable = true; //I manually added the flag to the ones I edited, but there are some I didn't edit.
			if(item.fling && item.fling.basePower === 10){ //Fling BP buffs
				if(item.isBerry || item === "airballoon") continue;
				item.fling.basePower = 20;
			}
			if(itemID.startsWith('tr')) delete item.fling; //TRs can't be Flung anymore.
		}
		
		/* individual Pokemon moveset edits */
		// Bulbasaur
		this.modData("Learnsets", "bulbasaur").learnset.belch = ["8D"];
		this.modData("Learnsets", "bulbasaur").learnset.leafage = ["8L9"];
		this.modData("Learnsets", "bulbasaur").learnset.naturalgift = ["8M"];
		this.modData("Learnsets", "bulbasaur").learnset.vinewhip = ["8E"];
		// Ivysaur
		this.modData("Learnsets", "ivysaur").learnset.belch = ["8D"];
		this.modData("Learnsets", "ivysaur").learnset.leafage = ["8L9"];
		this.modData("Learnsets", "ivysaur").learnset.naturalgift = ["8M"];
		// Venusaur
		this.modData("Learnsets", "venusaur").learnset.belch = ["8D"];
		this.modData("Learnsets", "venusaur").learnset.leafage = ["8L9"];
		this.modData("Learnsets", "venusaur").learnset.naturalgift = ["8M"];
		// Charmander
		this.modData("Learnsets", "charmander").learnset.twister = ["8D"];
		this.modData("Learnsets", "charmander").learnset.firefang = ["8L24"];
		this.modData("Learnsets", "charmander").learnset.firespin = ["8L17"];
		this.modData("Learnsets", "charmander").learnset.flameburst = ["8E"];
		this.modData("Learnsets", "charmander").learnset.flamethrower = ["8L32"];
		this.modData("Learnsets", "charmander").learnset.flash = ["8M"];
		delete this.modData('Learnsets', 'charmander').learnset.wingattack;
		// Charmeleon
		this.modData("Learnsets", "charmeleon").learnset.twister = ["8D"];
		this.modData("Learnsets", "charmeleon").learnset.firefang = ["8L30"];
		this.modData("Learnsets", "charmeleon").learnset.firespin = ["8L19"];
		this.modData("Learnsets", "charmeleon").learnset.flash = ["8M"];
		this.modData("Learnsets", "charmeleon").learnset.flamethrower = ["8L42"];
		delete this.modData('Learnsets', 'charmeleon').learnset.wingattack;
		// Charizard
		this.modData("Learnsets", "charizard").learnset.twister = ["8D"];
		this.modData("Learnsets", "charizard").learnset.firefang = ["8L30"];
		this.modData("Learnsets", "charizard").learnset.firespin = ["8L19"];
		this.modData("Learnsets", "charizard").learnset.flamethrower = ["8L46"];
		this.modData("Learnsets", "charizard").learnset.fellswoop = ["8M"];
		this.modData("Learnsets", "charizard").learnset.flash = ["8M"];
		// Squirtle
		this.modData("Learnsets", "squirtle").learnset.shellsmash = ["8D"];
		this.modData("Learnsets", "squirtle").learnset.fullcollide = ["8M"];
		this.modData("Learnsets", "squirtle").learnset.lifedew = ["8E"];
		this.modData("Learnsets", "squirtle").learnset.liquidation = ["8E"];
		delete this.modData('Learnsets', 'squirtle').learnset.toxic;
		// Wartortle
		this.modData("Learnsets", "wartortle").learnset.shellsmash = ["8D"];
		this.modData("Learnsets", "wartortle").learnset.fullcollide = ["8M"];
		delete this.modData('Learnsets', 'wartortle').learnset.toxic;
		// Blastoise
		this.modData("Learnsets", "blastoise").learnset.shellsmash = ["8D"];
		this.modData("Learnsets", "blastoise").learnset.fullcollide = ["8M"];
		this.modData("Learnsets", "blastoise").learnset.liquidation = ["8L1"];
		delete this.modData('Learnsets', 'blastoise').learnset.toxic;
		// Butterfree
		this.modData("Learnsets", "butterfree").learnset.pollenpuff = ["8D"];
		this.modData("Learnsets", "butterfree").learnset.flash = ["8M"];
		this.modData("Learnsets", "butterfree").learnset.naturalgift = ["8M"];
		this.modData("Learnsets", "butterfree").learnset.nightmare = ["8M"];
		delete this.modData('Learnsets', 'butterfree').learnset.hurricane;
		delete this.modData('Learnsets', 'butterfree').learnset.toxic;
		// Beedrill
		this.modData("Learnsets", "beedrill").learnset.attackorder = ["8D"];
		this.modData("Learnsets", "beedrill").learnset.compensation = ["8M"];
		this.modData("Learnsets", "beedrill").learnset.naturalgift = ["8M"];
		// Pidgey
		this.modData("Learnsets", "pidgey").learnset.swift = ["8D"];
		delete this.modData('Learnsets', 'pidgey').learnset.toxic;
		// Pidgeotto
		this.modData("Learnsets", "pidgeotto").learnset.swift = ["8D"];
		delete this.modData('Learnsets', 'pidgeotto').learnset.toxic;
		// Pidgeot
		this.modData("Learnsets", "pidgeot").learnset.swift = ["8D"];
		delete this.modData('Learnsets', 'pidgeot').learnset.toxic;
		// Rattata
		this.modData("Learnsets", "rattata").learnset.odorsleuth = ["8D"];
		this.modData("Learnsets", "rattata").learnset.chipaway = ["8M"];
		this.modData("Learnsets", "rattata").learnset.cut = ["8L25"];
		this.modData("Learnsets", "rattata").learnset.suckerpunch = ["8L28"];
		this.modData("Learnsets", "rattata").learnset.superfang = ["8L31"];
		this.modData("Learnsets", "rattata").learnset.doubleedge = ["8L34"];
		this.modData("Learnsets", "rattata").learnset.endeavor = ["8L37"];
		// Rattata Alola
		this.modData("Learnsets", "rattataalola").learnset.odorsleuth = ["8D"];
		this.modData("Learnsets", "rattataalola").learnset.chipaway = ["8M"];
		this.modData("Learnsets", "rattataalola").learnset.cut = ["8L25"];
		this.modData("Learnsets", "rattataalola").learnset.suckerpunch = ["8L28"];
		this.modData("Learnsets", "rattataalola").learnset.superfang = ["8L31"];
		this.modData("Learnsets", "rattataalola").learnset.doubleedge = ["8L34"];
		this.modData("Learnsets", "rattataalola").learnset.endeavor = ["8L37"];
		this.modData("Learnsets", "rattataalola").learnset.stuffcheeks = ["8E"];
		// Raticate
		this.modData("Learnsets", "raticate").learnset.odorsleuth = ["8D"];
		this.modData("Learnsets", "raticate").learnset.chipaway = ["8M"];
		this.modData("Learnsets", "raticate").learnset.cut = ["8L25"];
		this.modData("Learnsets", "raticate").learnset.suckerpunch = ["8L28"];
		this.modData("Learnsets", "raticate").learnset.superfang = ["8L31"];
		this.modData("Learnsets", "raticate").learnset.doubleedge = ["8L34"];
		this.modData("Learnsets", "raticate").learnset.endeavor = ["8L37"];
		// Raticate Alola
		this.modData("Learnsets", "raticatealola").learnset.odorsleuth = ["8D"];
		this.modData("Learnsets", "raticatealola").learnset.chipaway = ["8M"];
		this.modData("Learnsets", "raticatealola").learnset.cut = ["8L25"];
		this.modData("Learnsets", "raticatealola").learnset.suckerpunch = ["8L28"];
		this.modData("Learnsets", "raticatealola").learnset.superfang = ["8L31"];
		this.modData("Learnsets", "raticatealola").learnset.doubleedge = ["8L34"];
		this.modData("Learnsets", "raticatealola").learnset.endeavor = ["8L37"];
		// Spearow
		this.modData("Learnsets", "spearow").learnset.smartstrike = ["8D"];
		this.modData("Learnsets", "spearow").learnset.chipaway = ["8M"];
		delete this.modData('Learnsets', 'spearow').learnset.toxic;
		// Fearow
		this.modData("Learnsets", "fearow").learnset.smartstrike = ["8D"];
		this.modData("Learnsets", "fearow").learnset.chipaway = ["8M"];
		delete this.modData('Learnsets', 'fearow').learnset.toxic;
		// Ekans
		this.modData("Learnsets", "ekans").learnset.dragonbreath = ["8D"];
		this.modData("Learnsets", "ekans").learnset.bind = ["8L1"];
		this.modData("Learnsets", "ekans").learnset.nightmare = ["8M"];
		delete this.modData('Learnsets', 'ekans').learnset.wrap;
		// Arbok
		this.modData("Learnsets", "arbok").learnset.dragonbreath = ["8D"];
		this.modData("Learnsets", "ekans").learnset.bind = ["8L1"];
		this.modData("Learnsets", "arbok").learnset.nightmare = ["8M"];
		delete this.modData('Learnsets', 'arbok').learnset.wrap;
		// Pikachu
		this.modData("Learnsets", "pikachu").learnset.paraboliccharge = ["8D"];
		this.modData("Learnsets", "pikachu").learnset.flash = ["8M"];
		delete this.modData('Learnsets', 'pikachu').learnset.toxic;
		// Raichu
		this.modData("Learnsets", "raichu").learnset.paraboliccharge = ["8D"];
		this.modData("Learnsets", "raichu").learnset.flash = ["8M"];
		delete this.modData('Learnsets', 'raichu').learnset.toxic;
		// Raichu Alola
		this.modData("Learnsets", "raichualola").learnset.paraboliccharge = ["8D"];
		this.modData("Learnsets", "raichualola").learnset.flash = ["8M"];
		delete this.modData('Learnsets', 'raichualola').learnset.toxic;
		// Sandshrew
		this.modData("Learnsets", "sandshrew").learnset.steamroller = ["8D"];
		this.modData("Learnsets", "sandshrew").learnset.fullcollide = ["8M"];
		this.modData("Learnsets", "sandshrew").learnset.vitaldrain = ["8M"];
		delete this.modData('Learnsets', 'sandshrew').learnset.leechlife;
		delete this.modData('Learnsets', 'sandshrew').learnset.toxic;
		// Sandshrew Alola
		this.modData("Learnsets", "sandshrewalola").learnset.steamroller = ["8D"];
		this.modData("Learnsets", "sandshrewalola").learnset.fullcollide = ["8M"];
		this.modData("Learnsets", "sandshrewalola").learnset.honeclaws = ["8M"];
		this.modData("Learnsets", "sandshrewalola").learnset.vitaldrain = ["8M"];
		delete this.modData('Learnsets', 'sandshrewalola').learnset.leechlife;
		delete this.modData('Learnsets', 'sandshrewalola').learnset.toxic;
		// Sandslash
		this.modData("Learnsets", "sandslash").learnset.spikes = ["8D"];
		this.modData("Learnsets", "sandslash").learnset.fullcollide = ["8M"];
		this.modData("Learnsets", "sandslash").learnset.vitaldrain = ["8M"];
		delete this.modData('Learnsets', 'sandslash').learnset.drillrun;
		delete this.modData('Learnsets', 'sandslash').learnset.leechlife;
		// Sandslash Alola
		this.modData("Learnsets", "sandslashalola").learnset.spikes = ["8D"];
		this.modData("Learnsets", "sandslashalola").learnset.fullcollide = ["8M"];
		this.modData("Learnsets", "sandslashalola").learnset.honeclaws = ["8M"];
		this.modData("Learnsets", "sandslashalola").learnset.vitaldrain = ["8M"];
		delete this.modData('Learnsets', 'sandslashalola').learnset.drillrun;
		delete this.modData('Learnsets', 'sandslashalola').learnset.leechlife;
		// Nidoran♀
		this.modData("Learnsets", "nidoranf").learnset.moonlight = ["8D"];
		this.modData("Learnsets", "nidoranf").learnset.amnesia = ["8M"];
		this.modData("Learnsets", "nidoranf").learnset.faketears = ["8M"];
		// Nidorina
		this.modData("Learnsets", "nidorina").learnset.moonlight = ["8D"];
		this.modData("Learnsets", "nidorina").learnset.amnesia = ["8M"];
		this.modData("Learnsets", "nidorina").learnset.faketears = ["8M"];
		// Nidoqueen
		this.modData("Learnsets", "nidoqueen").learnset.moonlight = ["8D"];
		this.modData("Learnsets", "nidoqueen").learnset.amnesia = ["8M"];
		this.modData("Learnsets", "nidoqueen").learnset.breakingswipe = ["8M"];
		this.modData("Learnsets", "nidoqueen").learnset.faketears = ["8M"];
		this.modData("Learnsets", "nidoqueen").learnset.meteorbeam = ["8M"];
		// Nidoran♂
		this.modData("Learnsets", "nidoranm").learnset.moonlight = ["8D"];
		this.modData("Learnsets", "nidoranm").learnset.screech = ["8M"];
		// Nidorino
		this.modData("Learnsets", "nidorino").learnset.moonlight = ["8D"];
		this.modData("Learnsets", "nidorino").learnset.screech = ["8M"];
		// Nidoking
		this.modData("Learnsets", "nidoking").learnset.moonlight = ["8D"];
		this.modData("Learnsets", "nidoking").learnset.breakingswipe = ["8M"];
		this.modData("Learnsets", "nidoking").learnset.meteorbeam = ["8M"];
		this.modData("Learnsets", "nidoking").learnset.screech = ["8M"];
		// Clefairy
		this.modData("Learnsets", "clefairy").learnset.teeterdance = ["8D"];
		this.modData("Learnsets", "clefairy").learnset.flash = ["8M"];
		this.modData("Learnsets", "clefairy").learnset.lifedew = ["8L28"];
		this.modData("Learnsets", "clefairy").learnset.nightmare = ["8M"];
		delete this.modData('Learnsets', 'clefairy').learnset.bounce;
		delete this.modData('Learnsets', 'clefairy').learnset.toxic;
		// Clefable
		this.modData("Learnsets", "clefable").learnset.lunardance = ["8D"];
		this.modData("Learnsets", "clefable").learnset.flash = ["8M"];
		this.modData("Learnsets", "clefable").learnset.lifedew = ["8L1"];
		this.modData("Learnsets", "clefable").learnset.nightmare = ["8M"];
		delete this.modData('Learnsets', 'clefable').learnset.bounce;
		delete this.modData('Learnsets', 'clefable').learnset.toxic;
		// Vulpix
		this.modData("Learnsets", "vulpix").learnset.weatherball = ["8D"];
		this.modData("Learnsets", "vulpix").learnset.mysticalfire = ["8E"];
		delete this.modData('Learnsets', 'vulpix').learnset.toxic;
		// Vulpix Alola
		this.modData("Learnsets", "vulpixalola").learnset.weatherball = ["8D"];
		delete this.modData('Learnsets', 'vulpixalola').learnset.toxic;
		// Ninetales
		this.modData("Learnsets", "ninetales").learnset.weatherball = ["8D"];
		delete this.modData('Learnsets', 'ninetales').learnset.toxic;
		// Ninetales Alola
		this.modData("Learnsets", "ninetalesalola").learnset.weatherball = ["8D"];
		delete this.modData('Learnsets', 'ninetalesalola').learnset.toxic;
		// Jigglypuff
		this.modData("Learnsets", "jigglypuff").learnset.boomburst = ["8D"];
		this.modData("Learnsets", "jigglypuff").learnset.aerate = ["8L3"];
		this.modData("Learnsets", "jigglypuff").learnset.flash = ["8M"];
		this.modData("Learnsets", "jigglypuff").learnset.rebound = ["8L49"];
		delete this.modData('Learnsets', 'jigglypuff').learnset.nightmare;
		this.modData("Learnsets", "jigglypuff").learnset.pound = ["8L1"];
		// Wigglytuff
		this.modData("Learnsets", "wigglytuff").learnset.boomburst = ["8D"];
		this.modData("Learnsets", "wigglytuff").learnset.aerate = ["8L1"];
		this.modData("Learnsets", "wigglytuff").learnset.flash = ["8M"];
		this.modData("Learnsets", "wigglytuff").learnset.moonblast = ["8L1"];
		this.modData("Learnsets", "wigglytuff").learnset.rebound = ["8L1"];
		delete this.modData('Learnsets', 'wigglytuff').learnset.nightmare;
		// Zubat
		this.modData("Learnsets", "zubat").learnset.synchronoise = ["8D"];
		this.modData("Learnsets", "zubat").learnset.acrobatics = ["8L31","8M"];
		this.modData("Learnsets", "zubat").learnset.venoshock = ["8M"];
		this.modData("Learnsets", "zubat").learnset.vitaldrain = ["8L37","8M"];
		delete this.modData('Learnsets', 'zubat').learnset.absorb;
		// Golbat
		this.modData("Learnsets", "golbat").learnset.synchronoise = ["8D"];
		this.modData("Learnsets", "golbat").learnset.acrobatics = ["8L25","8M"];
		this.modData("Learnsets", "golbat").learnset.venoshock = ["8M"];
		this.modData("Learnsets", "golbat").learnset.vitaldrain = ["8L43","8M"];
		delete this.modData('Learnsets', 'golbat').learnset.absorb;
		// Oddish
		this.modData("Learnsets", "oddish").learnset.minimize = ["8D"];
		// Gloom
		this.modData("Learnsets", "gloom").learnset.minimize = ["8D"];
		// Vileplume
		this.modData("Learnsets", "vileplume").learnset.bunkerdown = ["8D"];
		// Paras
		this.modData("Learnsets", "paras").learnset.playdead = ["8D"];
		this.modData("Learnsets", "paras").learnset.leechlife = ["8L11"];
		this.modData("Learnsets", "paras").learnset.vitaldrain = ["8M"];
		delete this.modData('Learnsets', 'paras').learnset.absorb;
		delete this.modData('Learnsets', 'paras').learnset.grassyterrain;
		delete this.modData('Learnsets', 'paras').learnset.synthesis;
		// Parasect
		this.modData("Learnsets", "parasect").learnset.playdead = ["8D"];
		this.modData("Learnsets", "parasect").learnset.leechlife = ["8L11"];
		this.modData("Learnsets", "parasect").learnset.vitaldrain = ["8M"];
		delete this.modData('Learnsets', 'parasect').learnset.absorb;
		delete this.modData('Learnsets', 'parasect').learnset.grassyterrain;
		delete this.modData('Learnsets', 'parasect').learnset.synthesis;
		// Venonat
		this.modData("Learnsets", "venonat").learnset.powder = ["8D"];
		this.modData("Learnsets", "venonat").learnset.bugcloud = ["8L3"];
		this.modData("Learnsets", "venonat").learnset.flash = ["8M"];
		this.modData("Learnsets", "venonat").learnset.vitaldrain = ["8M"];
		// Venomoth
		this.modData("Learnsets", "venomoth").learnset.powder = ["8D"];
		this.modData("Learnsets", "venomoth").learnset.bugcloud = ["8L3"];
		this.modData("Learnsets", "venomoth").learnset.flash = ["8M"];
		this.modData("Learnsets", "venomoth").learnset.vitaldrain = ["8M"];
		// Diglett
		this.modData("Learnsets", "diglett").learnset.minimize = ["8D"];
		delete this.modData('Learnsets', 'diglett').learnset.toxic;
		// Diglett Alola
		this.modData("Learnsets", "diglettalola").learnset.minimize = ["8D"];
		this.modData("Learnsets", "diglettalola").learnset.honeclaws = ["8M"];
		delete this.modData('Learnsets', 'diglettalola').learnset.toxic;
		// Dugtrio
		this.modData("Learnsets", "dugtrio").learnset.minimize = ["8D"];
		delete this.modData('Learnsets', 'dugtrio').learnset.toxic;
		// Dugtrio Alola
		this.modData("Learnsets", "dugtrioalola").learnset.minimize = ["8D"];
		this.modData("Learnsets", "dugtrioalola").learnset.honeclaws = ["8M"];
		delete this.modData('Learnsets', 'dugtrioalola').learnset.toxic;
		// Meowth
		this.modData("Learnsets", "meowth").learnset.mefirst = ["8D"];
		this.modData("Learnsets", "meowth").learnset.flash = ["8M"];
		delete this.modData('Learnsets', 'meowth').learnset.nightmare;
		delete this.modData('Learnsets', 'meowth').learnset.toxic;
		// Meowth Alola
		this.modData("Learnsets", "meowthalola").learnset.mefirst = ["8D"];
		this.modData("Learnsets", "meowthalola").learnset.flash = ["8M"];
		this.modData("Learnsets", "meowthalola").learnset.honeclaws = ["8M"];
		// Meowth Galar
		this.modData("Learnsets", "meowthgalar").learnset.mefirst = ["8D"];
		this.modData("Learnsets", "meowthgalar").learnset.feintattack = ["8L22"];
		this.modData("Learnsets", "meowthgalar").learnset.metalsound = ["8L46"];
		this.modData("Learnsets", "meowthgalar").learnset.echoedvoice = ["8M"];
		this.modData("Learnsets", "meowthgalar").learnset.flash = ["8M"];
		this.modData("Learnsets", "meowthgalar").learnset.honeclaws = ["8M"];
		this.modData("Learnsets", "meowthgalar").learnset.knockoff = ["8M"];
		this.modData("Learnsets", "meowthgalar").learnset.lastresort = ["8M"];
		this.modData("Learnsets", "meowthgalar").learnset.psychup = ["8M"];
		this.modData("Learnsets", "meowthgalar").learnset.rocksmash = ["8M"];
		this.modData("Learnsets", "meowthgalar").learnset.snatch = ["8M"];
		this.modData("Learnsets", "meowthgalar").learnset.torment = ["8M"];
		delete this.modData('Learnsets', 'meowthgalar').learnset.captivate;
		delete this.modData('Learnsets', 'meowthgalar').learnset.thrash;
		// Persian
		this.modData("Learnsets", "persian").learnset.mefirst = ["8D"];
		this.modData("Learnsets", "persian").learnset.flash = ["8M"];
		delete this.modData('Learnsets', 'persian').learnset.nightmare;
		delete this.modData('Learnsets', 'persian').learnset.toxic;
		// Persian Alola
		this.modData("Learnsets", "persianalola").learnset.mefirst = ["8D"];
		this.modData("Learnsets", "persianalola").learnset.flash = ["8M"];
		this.modData("Learnsets", "persianalola").learnset.honeclaws = ["8M"];
		// Psyduck
		this.modData("Learnsets", "psyduck").learnset.mindbend = ["8D"];
		delete this.modData('Learnsets', 'psyduck').learnset.flash;
		delete this.modData('Learnsets', 'psyduck').learnset.toxic;
		// Golduck
		this.modData("Learnsets", "golduck").learnset.spotlight = ["8D"];
		this.modData("Learnsets", "golduck").learnset.flash = ["8M"];
		this.modData("Learnsets", "golduck").learnset.nastyplot = ["8M"];
		this.modData("Learnsets", "golduck").learnset.powergem = ["8M"];
		delete this.modData('Learnsets', 'golduck').learnset.toxic;
		// Mankey
		this.modData("Learnsets", "mankey").learnset.megapunch = ["8D"];
		this.modData("Learnsets", "mankey").learnset.compensation = ["8M"];
		this.modData("Learnsets", "mankey").learnset.megapunch = ["8E"];
		// Primeape
		this.modData("Learnsets", "primeape").learnset.megapunch = ["8D"];
		this.modData("Learnsets", "primeape").learnset.compensation = ["8M"];
		// Growlithe
		this.modData("Learnsets", "growlithe").learnset.playnice = ["8D"];
		this.modData("Learnsets", "growlithe").learnset.charm = ["8M"];
		delete this.modData('Learnsets', 'growlithe').learnset.toxic;
		// Arcanine
		this.modData("Learnsets", "arcanine").learnset.nobleroar = ["8D"];
		this.modData("Learnsets", "arcanine").learnset.charm = ["8M"];
		delete this.modData('Learnsets', 'arcanine').learnset.toxic;
		// Poliwag
		this.modData("Learnsets", "poliwag").learnset.slipaway = ["8D"];
		delete this.modData('Learnsets', 'poliwag').learnset.toxic;
		// Poliwhirl
		this.modData("Learnsets", "poliwhirl").learnset.slipaway = ["8D"];
		delete this.modData('Learnsets', 'poliwhirl').learnset.toxic;
		// Poliwrath
		this.modData("Learnsets", "poliwrath").learnset.liquidation = ["8D"];
		this.modData("Learnsets", "poliwrath").learnset.bodypress = ["8M"];
		delete this.modData('Learnsets', 'poliwrath').learnset.toxic;
		// Abra
		this.modData("Learnsets", "abra").learnset.flash = ["8M"];
		this.modData("Learnsets", "abra").learnset.nightmare = ["8M"];
		delete this.modData('Learnsets', 'abra').learnset.toxic;
		// Kadabra
		this.modData("Learnsets", "kadabra").learnset.doubleteam = ["8D"];
		this.modData("Learnsets", "kadabra").learnset.confusion = ["8L0"];
		this.modData("Learnsets", "kadabra").learnset.flash = ["8M"];
		this.modData("Learnsets", "kadabra").learnset.nastyplot = ["8M"];
		this.modData("Learnsets", "kadabra").learnset.nightmare = ["8M"];
		delete this.modData('Learnsets', 'kadabra').learnset.toxic;
		// Alakazam
		this.modData("Learnsets", "alakazam").learnset.doubleteam = ["8D"];
		this.modData("Learnsets", "alakazam").learnset.flash = ["8M"];
		this.modData("Learnsets", "alakazam").learnset.nightmare = ["8M"];
		delete this.modData('Learnsets', 'alakazam').learnset.toxic;
		// Machop
		this.modData("Learnsets", "machop").learnset.holdback = ["8D"];
		this.modData("Learnsets", "machop").learnset.poweruppunch = ["8E"];
		delete this.modData('Learnsets', 'machop').learnset.toxic;
		// Machoke
		this.modData("Learnsets", "machoke").learnset.holdback = ["8D"];
		delete this.modData('Learnsets', 'machoke').learnset.toxic;
		// Machamp
		this.modData("Learnsets", "machamp").learnset.lashout = ["8D"];
		delete this.modData('Learnsets', 'machamp').learnset.toxic;
		// Bellsprout
		this.modData("Learnsets", "bellsprout").learnset.venomdrench = ["8D"];
		this.modData("Learnsets", "bellsprout").learnset.vitaldrain = ["8M"];
		// Weepinbell
		this.modData("Learnsets", "weepinbell").learnset.venomdrench = ["8D"];
		this.modData("Learnsets", "weepinbell").learnset.vitaldrain = ["8M"];
		// Victreebell
		this.modData("Learnsets", "victreebel").learnset.venomdrench = ["8D"];
		this.modData("Learnsets", "victreebel").learnset.belch = ["8L1"];
		this.modData("Learnsets", "victreebel").learnset.grassyterrain = ["8M"];
		this.modData("Learnsets", "victreebel").learnset.vitaldrain = ["8L1"];
		// Tentacool
		this.modData("Learnsets", "tentacool").learnset.doublehit = ["8D"];
		// Tentacruel
		this.modData("Learnsets", "tentacruel").learnset.lashout = ["8D"];
		// Geodude
		this.modData("Learnsets", "geodude").learnset.camouflage = ["8D"];
		this.modData("Learnsets", "geodude").learnset.rapidspin = ["8E"];
		delete this.modData('Learnsets', 'geodude').learnset.toxic;
		// Geodude Alola
		this.modData("Learnsets", "geodudealola").learnset.electrify = ["8D"];
		this.modData("Learnsets", "geodudealola").learnset.electroball = ["8M"];
		this.modData("Learnsets", "geodudealola").learnset.flash = ["8M"];
		this.modData("Learnsets", "geodudealola").learnset.powergem = ["8M"];
		this.modData("Learnsets", "geodudealola").learnset.rapidspin = ["8E"];
		delete this.modData('Learnsets', 'geodudealola').learnset.toxic;
		// Graveler
		this.modData("Learnsets", "graveler").learnset.camouflage = ["8D"];
		delete this.modData('Learnsets', 'graveler').learnset.toxic;
		// Graveler Alola
		this.modData("Learnsets", "graveleralola").learnset.electrify = ["8D"];
		this.modData("Learnsets", "graveleralola").learnset.electroball = ["8M"];
		this.modData("Learnsets", "graveleralola").learnset.flash = ["8M"];
		this.modData("Learnsets", "graveleralola").learnset.powergem = ["8M"];
		delete this.modData('Learnsets', 'graveleralola').learnset.toxic;
		// Golem
		this.modData("Learnsets", "golem").learnset.camouflage = ["8D"];
		delete this.modData('Learnsets', 'golem').learnset.toxic;
		// Golem Alola
		this.modData("Learnsets", "golemalola").learnset.rockwrecker = ["8D"];
		this.modData("Learnsets", "golemalola").learnset.electroball = ["8M"];
		this.modData("Learnsets", "golemalola").learnset.flash = ["8M"];
		this.modData("Learnsets", "golemalola").learnset.powergem = ["8M"];
		delete this.modData('Learnsets', 'golemalola').learnset.toxic;
		// Ponyta
		this.modData("Learnsets", "ponyta").learnset.hornleech = ["8D"];
		this.modData("Learnsets", "ponyta").learnset.flash = ["8M"];
		delete this.modData('Learnsets', 'ponyta').learnset.toxic;
		// Ponyta Galar
		this.modData("Learnsets", "ponytagalar").learnset.hornleech = ["8D"];
		this.modData("Learnsets", "ponytagalar").learnset.aquatail = ["8M"];
		this.modData("Learnsets", "ponytagalar").learnset.dreameater = ["8M"];
		this.modData("Learnsets", "ponytagalar").learnset.echoedvoice = ["8M"];
		this.modData("Learnsets", "ponytagalar").learnset.healbell = ["8M"];
		this.modData("Learnsets", "ponytagalar").learnset.magiccoat = ["8M"];
		this.modData("Learnsets", "ponytagalar").learnset.naturalgift = ["8M"];
		this.modData("Learnsets", "ponytagalar").learnset.psychup = ["8M"];
		this.modData("Learnsets", "ponytagalar").learnset.roleplay = ["8M"];
		this.modData("Learnsets", "ponytagalar").learnset.telekinesis = ["8M"];
		// Rapidash
		this.modData("Learnsets", "rapidash").learnset.hornleech = ["8D"];
		this.modData("Learnsets", "rapidash").learnset.flash = ["8M"];
		delete this.modData('Learnsets', 'rapidash').learnset.toxic;
		// Rapidash Galar
		this.modData("Learnsets", "rapidashgalar").learnset.hornleech = ["8D"];
		this.modData("Learnsets", "rapidashgalar").learnset.aquatail = ["8M"];
		this.modData("Learnsets", "rapidashgalar").learnset.dreameater = ["8M"];
		this.modData("Learnsets", "rapidashgalar").learnset.echoedvoice = ["8M"];
		this.modData("Learnsets", "rapidashgalar").learnset.healbell = ["8M"];
		this.modData("Learnsets", "rapidashgalar").learnset.magiccoat = ["8M"];
		this.modData("Learnsets", "rapidashgalar").learnset.naturalgift = ["8M"];
		this.modData("Learnsets", "rapidashgalar").learnset.psychup = ["8M"];
		this.modData("Learnsets", "rapidashgalar").learnset.roleplay = ["8M"];
		this.modData("Learnsets", "rapidashgalar").learnset.telekinesis = ["8M"];
		// Slowpoke
		this.modData("Learnsets", "slowpoke").learnset.autotomize = ["8D"];
		this.modData("Learnsets", "slowpoke").learnset.stasis = ["8M"];
		delete this.modData('Learnsets', 'slowpoke').learnset.nightmare;
		delete this.modData('Learnsets', 'slowpoke').learnset.flash;
		delete this.modData('Learnsets', 'slowpoke').learnset.toxic;
		// Slowbro
		this.modData("Learnsets", "slowbro").learnset.razorshell = ["8D"];
		this.modData("Learnsets", "slowbro").learnset.stasis = ["8M"];
		delete this.modData('Learnsets', 'slowbro').learnset.nightmare;
		delete this.modData('Learnsets', 'slowbro').learnset.flash;
		delete this.modData('Learnsets', 'slowbro').learnset.toxic;
		// Magnemite
		this.modData("Learnsets", "magnemite").learnset.electrify = ["8D"];
		this.modData("Learnsets", "magnemite").learnset.eerieimpulse = ["8M"];
		this.modData("Learnsets", "magnemite").learnset.flash = ["8M"];
		delete this.modData('Learnsets', 'magnemite').learnset.toxic;
		// Magneton
		this.modData("Learnsets", "magneton").learnset.electrify = ["8D"];
		this.modData("Learnsets", "magneton").learnset.eerieimpulse = ["8M"];
		this.modData("Learnsets", "magneton").learnset.flash = ["8M"];
		delete this.modData('Learnsets', 'magneton').learnset.toxic;
		// Farfetchd
		this.modData("Learnsets", "farfetchd").learnset.sacredsword = ["8D"];
		this.modData("Learnsets", "farfetchd").learnset.punishment = ["8E"];
		this.modData("Learnsets", "farfetchd").learnset.swing = ["8L20"];
		// Farfetchd Galar
		this.modData("Learnsets", "farfetchdgalar").learnset.woodhammer = ["8D"];
		this.modData("Learnsets", "farfetchdgalar").learnset.echoedvoice = ["8M"];
		this.modData("Learnsets", "farfetchdgalar").learnset.lastresort = ["8M"];
		this.modData("Learnsets", "farfetchdgalar").learnset.punishment = ["8E"];
		this.modData("Learnsets", "farfetchdgalar").learnset.solarblade = ["8E"];
		this.modData("Learnsets", "farfetchdgalar").learnset.strength = ["8M"];
		this.modData("Learnsets", "farfetchdgalar").learnset.swing = ["8L20"];
		// Doduo
		this.modData("Learnsets", "doduo").learnset.eggbomb = ["8D"];
		this.modData("Learnsets", "doduo").learnset.screech = ["8M"];
		delete this.modData('Learnsets', 'doduo').learnset.toxic;
		// Dodrio
		this.modData("Learnsets", "dodrio").learnset.eggbomb = ["8D"];
		this.modData("Learnsets", "dodrio").learnset.screech = ["8M"];
		delete this.modData('Learnsets', 'dodrio').learnset.toxic;
		// Seel
		this.modData("Learnsets", "seel").learnset.slackoff = ["8D"];
		this.modData("Learnsets", "seel").learnset.amnesia = ["8M"];
		this.modData("Learnsets", "seel").learnset.charm = ["8M"];
		delete this.modData('Learnsets', 'seel').learnset.toxic;
		// Dewgong
		this.modData("Learnsets", "dewgong").learnset.slackoff = ["8D"];
		this.modData("Learnsets", "dewgong").learnset.amnesia = ["8M"];
		this.modData("Learnsets", "dewgong").learnset.charm = ["8M"];
		delete this.modData('Learnsets', 'dewgong').learnset.toxic;
		// Grimer
		this.modData("Learnsets", "grimer").learnset.slipaway = ["8D"];
		this.modData("Learnsets", "grimer").learnset.nightmare = ["8M"];
		// Grimer Alola
		this.modData("Learnsets", "grimeralola").learnset.purify = ["8D"];
		this.modData("Learnsets", "grimeralola").learnset.powergem = ["8M"];
		// Muk
		this.modData("Learnsets", "muk").learnset.slipaway = ["8D"];
		this.modData("Learnsets", "muk").learnset.nightmare = ["8M"];
		// Muk Alola
		this.modData("Learnsets", "mukalola").learnset.purify = ["8D"];
		this.modData("Learnsets", "mukalola").learnset.powergem = ["8M"];
		// Shellder
		this.modData("Learnsets", "shellder").learnset.sharpen = ["8D"];
		this.modData("Learnsets", "shellder").learnset.liquidation = ["8E"];
		delete this.modData('Learnsets', 'shellder').learnset.toxic;
		// Cloyster
		this.modData("Learnsets", "cloyster").learnset.sharpen = ["8D"];
		delete this.modData('Learnsets', 'cloyster').learnset.toxic;
		// Gastly
		this.modData("Learnsets", "gastly").learnset.poisonfang = ["8D"];
		this.modData("Learnsets", "gastly").learnset.smog = ["8L1"];
		this.modData("Learnsets", "gastly").learnset.poisongas = ["8L12"];
		this.modData("Learnsets", "gastly").learnset.curse = ["8L15"];
		this.modData("Learnsets", "gastly").learnset.nightshade = ["8L19"];
		this.modData("Learnsets", "gastly").learnset.confuseray = ["8L22"];
		this.modData("Learnsets", "gastly").learnset.suckerpunch = ["8L26"];
		this.modData("Learnsets", "gastly").learnset.payback = ["8L29","8M"];
		this.modData("Learnsets", "gastly").learnset.shadowball = ["8L33","8M"];
		this.modData("Learnsets", "gastly").learnset.dreameater = ["8L36","8M"];
		delete this.modData('Learnsets', 'gastly').learnset.firepunch;
		delete this.modData('Learnsets', 'gastly').learnset.icepunch;
		delete this.modData('Learnsets', 'gastly').learnset.thunderpunch;
		// Haunter
		this.modData("Learnsets", "haunter").learnset.poisonfang = ["8D"];
		this.modData("Learnsets", "haunter").learnset.smog = ["8L1"];
		this.modData("Learnsets", "haunter").learnset.poisongas = ["8L12"];
		this.modData("Learnsets", "haunter").learnset.curse = ["8L15"];
		this.modData("Learnsets", "haunter").learnset.nightshade = ["8L19"];
		this.modData("Learnsets", "haunter").learnset.confuseray = ["8L22"];
		this.modData("Learnsets", "haunter").learnset.suckerpunch = ["8L28"];
		this.modData("Learnsets", "haunter").learnset.payback = ["8L33","8M"];
		this.modData("Learnsets", "haunter").learnset.shadowball = ["8L39","8M"];
		this.modData("Learnsets", "haunter").learnset.dreameater = ["8L44","8M"];
		// Gengar
		this.modData("Learnsets", "gengar").learnset.poisonfang = ["8D"];
		this.modData("Learnsets", "gengar").learnset.smog = ["8L1"];
		this.modData("Learnsets", "gengar").learnset.poisongas = ["8L12"];
		this.modData("Learnsets", "gengar").learnset.curse = ["8L15"];
		this.modData("Learnsets", "gengar").learnset.nightshade = ["8L19"];
		this.modData("Learnsets", "gengar").learnset.confuseray = ["8L22"];
		this.modData("Learnsets", "gengar").learnset.suckerpunch = ["8L28"];
		this.modData("Learnsets", "gengar").learnset.payback = ["8L33","8M"];
		this.modData("Learnsets", "gengar").learnset.shadowball = ["8L39","8M"];
		this.modData("Learnsets", "gengar").learnset.dreameater = ["8L44","8M"];
		// Onix
		this.modData("Learnsets", "onix").learnset.sharpen = ["8D"];
		this.modData("Learnsets", "onix").learnset.tussle = ["8L20"];
		this.modData("Learnsets", "onix").learnset.gigaimpact = ["8M"];
		this.modData("Learnsets", "onix").learnset.gyroball = ["8M"];
		delete this.modData('Learnsets', 'onix').learnset.meteorbeam;
		delete this.modData('Learnsets', 'onix').learnset.toxic;
		// Drowzee
		this.modData("Learnsets", "drowzee").learnset.meanlook = ["8D"];
		this.modData("Learnsets", "drowzee").learnset.mindbend = ["8L9"];
		this.modData("Learnsets", "drowzee").learnset.confusion = ["8L13"];
		this.modData("Learnsets", "drowzee").learnset.headbutt = ["8L29"];
		this.modData("Learnsets", "drowzee").learnset.amnesia = ["8M"];
		delete this.modData('Learnsets', 'drowzee').learnset.flash;
		delete this.modData('Learnsets', 'drowzee').learnset.toxic;
		delete this.modData('Learnsets', 'drowzee').learnset.wakeupslap;
		// Hypno
		this.modData("Learnsets", "hypno").learnset.darkvoid = ["8D"];
		this.modData("Learnsets", "hypno").learnset.mindbend = ["8L9"];
		this.modData("Learnsets", "hypno").learnset.confusion = ["8L13"];
		this.modData("Learnsets", "hypno").learnset.headbutt = ["8L29"];
		this.modData("Learnsets", "hypno").learnset.amnesia = ["8M"];
		this.modData("Learnsets", "hypno").learnset.flash = ["8M"];
		delete this.modData('Learnsets', 'hypno').learnset.toxic;
		delete this.modData('Learnsets', 'hypno').learnset.wakeupslap;
		// Krabby
		this.modData("Learnsets", "krabby").learnset.clamp = ["8D"];
		delete this.modData('Learnsets', 'krabby').learnset.toxic;
		// Kingler
		this.modData("Learnsets", "kingler").learnset.clamp = ["8D"];
		delete this.modData('Learnsets', 'kingler').learnset.toxic;
		// Voltorb
		this.modData("Learnsets", "voltorb").learnset.overdrive = ["8D"];
		this.modData("Learnsets", "voltorb").learnset.rapidspin = ["8L29"];
		this.modData("Learnsets", "voltorb").learnset.lightscreen = ["8L34"];
		this.modData("Learnsets", "voltorb").learnset.magnetrise = ["8L37"];
		this.modData("Learnsets", "voltorb").learnset.discharge = ["8L41"];
		this.modData("Learnsets", "voltorb").learnset.explosion = ["8L46"];
		this.modData("Learnsets", "voltorb").learnset.electricterrain = ["8M"];
		this.modData("Learnsets", "voltorb").learnset.flash = ["8M"];
		this.modData("Learnsets", "voltorb").learnset.gyroball = ["8M"];
		delete this.modData('Learnsets', 'voltorb').learnset.toxic;
		// Electrode
		this.modData("Learnsets", "electrode").learnset.overdrive = ["8D"];
		this.modData("Learnsets", "electrode").learnset.rapidspin = ["8L29"];
		this.modData("Learnsets", "electrode").learnset.lightscreen = ["8L36","8M"];
		this.modData("Learnsets", "electrode").learnset.magnetrise = ["8L41","8M"];
		this.modData("Learnsets", "electrode").learnset.discharge = ["8L47","8M"];
		this.modData("Learnsets", "electrode").learnset.explosion = ["8L54","8M"];
		this.modData("Learnsets", "electrode").learnset.electricterrain = ["8M"];
		this.modData("Learnsets", "electrode").learnset.flash = ["8M"];
		this.modData("Learnsets", "electrode").learnset.gyroball = ["8M"];
		delete this.modData('Learnsets', 'electrode').learnset.toxic;
		// Exeggcute
		this.modData("Learnsets", "exeggcute").learnset.softboiled = ["8D"];
		delete this.modData('Learnsets', 'exeggcute').learnset.toxic;
		// Exeggutor
		this.modData("Learnsets", "exeggutor").learnset.tropkick = ["8D"];
		this.modData("Learnsets", "exeggutor").learnset.bodypress = ["8M"];
		delete this.modData('Learnsets', 'exeggutor').learnset.toxic;
		// Exeggutor Tropical
		this.modData("Learnsets", "exeggutoralola").learnset.tropkick = ["8D"];
		this.modData("Learnsets", "exeggutoralola").learnset.bodypress = ["8M"];
		delete this.modData('Learnsets', 'exeggutoralola').learnset.toxic;
		// Cubone
		this.modData("Learnsets", "cubone").learnset.memento = ["8D"];
		this.modData("Learnsets", "cubone").learnset.leer = ["8L3"];
		this.modData("Learnsets", "cubone").learnset.swing = ["8L13"];
		delete this.modData('Learnsets', 'cubone').learnset.tailwhip;
		delete this.modData('Learnsets', 'cubone').learnset.toxic;
		// Marowak
		this.modData("Learnsets", "marowak").learnset.memento = ["8D"];
		this.modData("Learnsets", "marowak").learnset.leer = ["8L3"];
		this.modData("Learnsets", "marowak").learnset.swing = ["8L13"];
		delete this.modData('Learnsets', 'marowak').learnset.tailwhip;
		delete this.modData('Learnsets', 'marowak').learnset.toxic;
		// Marowak Tropical
		this.modData("Learnsets", "marowakalola").learnset.fierydance = ["8D"];
		this.modData("Learnsets", "marowakalola").learnset.leer = ["8L3"];
		this.modData("Learnsets", "marowakalola").learnset.swing = ["8L13"];
		this.modData("Learnsets", "marowakalola").learnset.flash = ["8M"];
		delete this.modData('Learnsets', 'marowakalola').learnset.tailwhip;
		delete this.modData('Learnsets', 'marowakalola').learnset.toxic;
		// Hitmonlee
		this.modData("Learnsets", "hitmonlee").learnset.tropkick = ["8D"];
		this.modData("Learnsets", "hitmonlee").learnset.meditate = ["8L8"];
		this.modData("Learnsets", "hitmonlee").learnset.lowkick = ["8L12"];
		this.modData("Learnsets", "hitmonlee").learnset.endure = ["8L16","8M"];
		this.modData("Learnsets", "hitmonlee").learnset.revenge = ["8L21"];
		this.modData("Learnsets", "hitmonlee").learnset.jumpkick = ["8L24"];
		this.modData("Learnsets", "hitmonlee").learnset.wideguard = ["8L28"];
		this.modData("Learnsets", "hitmonlee").learnset.blazekick = ["8L32"];
		this.modData("Learnsets", "hitmonlee").learnset.mindreader = ["8L36"];
		this.modData("Learnsets", "hitmonlee").learnset.megakick = ["8L40"];
		this.modData("Learnsets", "hitmonlee").learnset.closecombat = ["8L44"];
		this.modData("Learnsets", "hitmonlee").learnset.reversal = ["8L48"];
		this.modData("Learnsets", "hitmonlee").learnset.highjumpkick = ["8L52"];
		this.modData("Learnsets", "hitmonlee").learnset.chipaway = ["8M"];
		delete this.modData('Learnsets', 'hitmonlee').learnset.toxic;
		// Hitmonchan
		this.modData("Learnsets", "hitmonchan").learnset.dynamicpunch = ["8D"];
		this.modData("Learnsets", "hitmonchan").learnset.cometpunch = ["8L8"];
		this.modData("Learnsets", "hitmonchan").learnset.poweruppunch = ["8L12"];
		this.modData("Learnsets", "hitmonchan").learnset.detect = ["8L16"];
		this.modData("Learnsets", "hitmonchan").learnset.revenge = ["8L21"];
		this.modData("Learnsets", "hitmonchan").learnset.skyuppercut = ["8L24"];
		this.modData("Learnsets", "hitmonchan").learnset.quickguard = ["8L28"];
		this.modData("Learnsets", "hitmonchan").learnset.firepunch = ["8L32","8M"];
		this.modData("Learnsets", "hitmonchan").learnset.icepunch = ["8L32","8M"];
		this.modData("Learnsets", "hitmonchan").learnset.thunderpunch = ["8L32","8M"];
		this.modData("Learnsets", "hitmonchan").learnset.agility = ["8L36"];
		this.modData("Learnsets", "hitmonchan").learnset.megapunch = ["8L40"];
		this.modData("Learnsets", "hitmonchan").learnset.closecombat = ["8L44"];
		this.modData("Learnsets", "hitmonchan").learnset.counter = ["8L48"];
		this.modData("Learnsets", "hitmonchan").learnset.focuspunch = ["8L52"];
		this.modData("Learnsets", "hitmonchan").learnset.chipaway = ["8M"];
		delete this.modData('Learnsets', 'hitmonchan').learnset.toxic;
		// Lickitung
		this.modData("Learnsets", "lickitung").learnset.soak = ["8D"];
		this.modData("Learnsets", "lickitung").learnset.bind = ["8L17"];
		delete this.modData('Learnsets', 'lickitung').learnset.wrap;
		// Koffing
		this.modData("Learnsets", "koffing").learnset.rebound = ["8D"];
		// Weezing
		this.modData("Learnsets", "weezing").learnset.rebound = ["8D"];
		// Weezing Galar
		this.modData("Learnsets", "weezinggalar").learnset.purify = ["8D"];
		// Rhyhorn
		this.modData("Learnsets", "rhyhorn").learnset.headsmash = ["8D"];
		this.modData("Learnsets", "rhyhorn").learnset.scaryface = ["8L1"];
		this.modData("Learnsets", "rhyhorn").learnset.stomp = ["8L9"];
		this.modData("Learnsets", "rhyhorn").learnset.tussle = ["8L17"];
		this.modData("Learnsets", "rhyhorn").learnset.doubleedge = ["8E"];
		this.modData("Learnsets", "rhyhorn").learnset.fullcollide = ["8M"];
		delete this.modData('Learnsets', 'rhyhorn').learnset.toxic;
		// Rhydon
		this.modData("Learnsets", "rhydon").learnset.headsmash = ["8D"];
		this.modData("Learnsets", "rhydon").learnset.scaryface = ["8L1"];
		this.modData("Learnsets", "rhydon").learnset.stomp = ["8L9"];
		this.modData("Learnsets", "rhydon").learnset.tussle = ["8L17"];
		this.modData("Learnsets", "rhydon").learnset.fullcollide = ["8M"];
		delete this.modData('Learnsets', 'rhydon').learnset.meteorbeam;
		delete this.modData('Learnsets', 'rhydon').learnset.toxic;
		// Chansey
		this.modData("Learnsets", "chansey").learnset.happyhour = ["8D"];
		delete this.modData('Learnsets', 'chansey').learnset.rockclimb;
		delete this.modData('Learnsets', 'chansey').learnset.tantrum;
		delete this.modData('Learnsets', 'chansey').learnset.toxic;
		// Tangela
		this.modData("Learnsets", "tangela").learnset.morningsun = ["8D"];
		this.modData("Learnsets", "tangela").learnset.wrap = ["8L17"];
		delete this.modData('Learnsets', 'tangela').learnset.toxic;
		delete this.modData('Learnsets', 'tangela').learnset.bind;
		// Kangaskhan
		this.modData("Learnsets", "kangaskhan").learnset.wish = ["8D"];
		this.modData("Learnsets", "kangaskhan").learnset.bodypress = ["8M"];
		this.modData("Learnsets", "kangaskhan").learnset.faketears = ["8M"];
		delete this.modData('Learnsets', 'kangaskhan').learnset.toxic;
		// Horsea
		this.modData("Learnsets", "horsea").learnset.poisongas = ["8D"];
		// Seadra
		this.modData("Learnsets", "seadra").learnset.poisongas = ["8D"];
		// Goldeen
		this.modData("Learnsets", "goldeen").learnset.captivate = ["8D"];
		delete this.modData('Learnsets', 'goldeen').learnset.toxic;
		// Seaking
		this.modData("Learnsets", "seaking").learnset.captivate = ["8D"];
		delete this.modData('Learnsets', 'seaking').learnset.toxic;
		// Staryu
		this.modData("Learnsets", "staryu").learnset.barrier = ["8D"];
		this.modData("Learnsets", "staryu").learnset.flash = ["8M"];
		delete this.modData('Learnsets', 'staryu').learnset.toxic;
		// Starmie
		this.modData("Learnsets", "starmie").learnset.lusterpurge = ["8D"];
		this.modData("Learnsets", "starmie").learnset.flash = ["8M"];
		this.modData("Learnsets", "starmie").learnset.futuresight = ["8M"];
		delete this.modData('Learnsets', 'starmie').learnset.avalanche;
		delete this.modData('Learnsets', 'starmie').learnset.toxic;
		// Mr. Mime
		this.modData("Learnsets", "mrmime").learnset.followme = ["8D"];
		this.modData("Learnsets", "mrmime").learnset.barrier = ["8L0"];
		this.modData("Learnsets", "mrmime").learnset.flash = ["8M"];
		this.modData("Learnsets", "mrmime").learnset.nightmare = ["8M"];
		this.modData("Learnsets", "mrmime").learnset.spotlight = ["8E"];
		this.modData("Learnsets", "mrmime").learnset.wakeupslap = ["8L40"];
		delete this.modData('Learnsets', 'mrmime').learnset.suckerpunch;
		delete this.modData('Learnsets', 'mrmime').learnset.toxic;
		// Mr. Mime Galar
		this.modData("Learnsets", "mrmimegalar").learnset.followme = ["8D"];
		this.modData("Learnsets", "mrmimegalar").learnset.icywind = ["8L0"];
		this.modData("Learnsets", "mrmimegalar").learnset.mimic = ["8L20"];
		this.modData("Learnsets", "mrmimegalar").learnset.afteryou = ["8M"];
		this.modData("Learnsets", "mrmimegalar").learnset.auroraveil = ["8M"];
		this.modData("Learnsets", "mrmimegalar").learnset.dazzlinggleam = ["8M"];
		this.modData("Learnsets", "mrmimegalar").learnset.dreameater = ["8M"];
		this.modData("Learnsets", "mrmimegalar").learnset.encore = ["8M"];
		this.modData("Learnsets", "mrmimegalar").learnset.frostbreath = ["8M"];
		this.modData("Learnsets", "mrmimegalar").learnset.flash = ["8M"];
		this.modData("Learnsets", "mrmimegalar").learnset.gravity = ["8M"];
		this.modData("Learnsets", "mrmimegalar").learnset.lightscreen = ["8M"];
		this.modData("Learnsets", "mrmimegalar").learnset.magiccoat = ["8M"];
		this.modData("Learnsets", "mrmimegalar").learnset.mistyterrain = ["8M"];
		this.modData("Learnsets", "mrmimegalar").learnset.nightmare = ["8M"];
		this.modData("Learnsets", "mrmimegalar").learnset.protect = ["8M"];
		this.modData("Learnsets", "mrmimegalar").learnset.psychup = ["8M"];
		this.modData("Learnsets", "mrmimegalar").learnset.recycle = ["8M"];
		this.modData("Learnsets", "mrmimegalar").learnset.reflect = ["8M"];
		this.modData("Learnsets", "mrmimegalar").learnset.rocksmash = ["8M"];
		this.modData("Learnsets", "mrmimegalar").learnset.roleplay = ["8M"];
		this.modData("Learnsets", "mrmimegalar").learnset.safeguard = ["8M"];
		this.modData("Learnsets", "mrmimegalar").learnset.spotlight = ["8E"];
		this.modData("Learnsets", "mrmimegalar").learnset.telekinesis = ["8M"];
		this.modData("Learnsets", "mrmimegalar").learnset.torment = ["8M"];
		this.modData("Learnsets", "mrmimegalar").learnset.wakeupslap = ["8L40"];
		delete this.modData('Learnsets', 'mrmimegalar').learnset.suckerpunch;
		delete this.modData('Learnsets', 'mrmimegalar').learnset.toxic;
		// Scyther
		this.modData("Learnsets", "scyther").learnset.guillotine = ["8D"];
		this.modData("Learnsets", "scyther").learnset.pursuit = ["8L16"];
		this.modData("Learnsets", "scyther").learnset.cut = ["8L20"];
		this.modData("Learnsets", "scyther").learnset.doubleteam = ["8L44"];
		this.modData("Learnsets", "scyther").learnset.razorwind = ["8L52"];
		this.modData("Learnsets", "scyther").learnset.feint = ["8L56"];
		delete this.modData('Learnsets', 'scyther').learnset.doublehit;
		delete this.modData('Learnsets', 'scyther').learnset.toxic;
		// Jynx
		this.modData("Learnsets", "jynx").learnset.teeterdance = ["8D"];
		this.modData("Learnsets", "jynx").learnset.amnesia = ["8M"];
		this.modData("Learnsets", "jynx").learnset.daydream = ["8L1"];
		this.modData("Learnsets", "jynx").learnset.flash = ["8M"];
		this.modData("Learnsets", "jynx").learnset.hex = ["8M"];
		this.modData("Learnsets", "jynx").learnset.nightmare = ["8M"];
		delete this.modData('Learnsets', 'jynx').learnset.toxic;
		// Electabuzz
		this.modData("Learnsets", "electabuzz").learnset.zingzap = ["8D"];
		this.modData("Learnsets", "electabuzz").learnset.flash = ["8M"];
		this.modData("Learnsets", "electabuzz").learnset.overdrive = ["8M"];
		delete this.modData('Learnsets', 'electabuzz').learnset.toxic;
		// Magmar
		this.modData("Learnsets", "magmar").learnset.pelletshot = ["8D"];
		this.modData("Learnsets", "magmar").learnset.amnesia = ["8M"];
		this.modData("Learnsets", "magmar").learnset.flash = ["8M"];
		this.modData("Learnsets", "magmar").learnset.sludgebomb = ["8M"];
		delete this.modData('Learnsets', 'magmar').learnset.toxic;
		// Pinsir
		this.modData("Learnsets", "pinsir").learnset.furycutter = ["8D"];
		delete this.modData('Learnsets', 'pinsir').learnset.toxic;
		// Tauros
		this.modData("Learnsets", "tauros").learnset.megahorn = ["8D"];
		this.modData("Learnsets", "tauros").learnset.swagger = ["8L47"];
		this.modData("Learnsets", "tauros").learnset.thrash = ["8L53"];
		this.modData("Learnsets", "tauros").learnset.doubleedge = ["8L59"];
		this.modData("Learnsets", "tauros").learnset.highhorsepower = ["8L65"];
		delete this.modData('Learnsets', 'tauros').learnset.toxic;
		// Gyarados
		this.modData("Learnsets", "gyarados").learnset.rage = ["8D"];
		delete this.modData('Learnsets', 'gyarados').learnset.toxic;
		// Lapras
		this.modData("Learnsets", "lapras").learnset.sparklingaria = ["8D"];
		delete this.modData('Learnsets', 'lapras').learnset.toxic;
		// Eevee
		this.modData("Learnsets", "eevee").learnset.mimic = ["8D"];
		delete this.modData('Learnsets', 'eevee').learnset.toxic;
		// Vaporeon
		this.modData("Learnsets", "vaporeon").learnset.tailslap = ["8D"];
		delete this.modData('Learnsets', 'vaporeon').learnset.toxic;
		// Jolteon
		this.modData("Learnsets", "jolteon").learnset.zingzap = ["8D"];
		delete this.modData('Learnsets', 'jolteon').learnset.toxic;
		// Flareon
		this.modData("Learnsets", "flareon").learnset.rage = ["8D"];
		this.modData("Learnsets", "flareon").learnset.flash = ["8M"];
		this.modData("Learnsets", "flareon").learnset.preheat = ["8L33"];
		delete this.modData('Learnsets', 'flareon').learnset.toxic;
		// Porygon
		this.modData("Learnsets", "porygon").learnset.teleport = ["8D"];
		this.modData("Learnsets", "porygon").learnset.flash = ["8M"];
		this.modData("Learnsets", "porygon").learnset.powergem = ["8M"];
		delete this.modData('Learnsets', 'porygon').learnset.toxic;
		// Omanyte
		this.modData("Learnsets", "omanyte").learnset.curse = ["8D"];
		delete this.modData('Learnsets', 'omanyte').learnset.toxic;
		// Omastar
		this.modData("Learnsets", "omastar").learnset.curse = ["8D"];
		delete this.modData('Learnsets', 'omastar').learnset.toxic;
		// Kabuto
		this.modData("Learnsets", "kabuto").learnset.rollout = ["8D"];
		this.modData("Learnsets", "kabuto").learnset.leechlife = ["8L1"];
		this.modData("Learnsets", "kabuto").learnset.harden = ["8L1"];
		this.modData("Learnsets", "kabuto").learnset.scratch = ["8L6"];
		this.modData("Learnsets", "kabuto").learnset.sandattack = ["8L11"];
		this.modData("Learnsets", "kabuto").learnset.aquajet = ["8L16"];
		this.modData("Learnsets", "kabuto").learnset.leer = ["8L21"];
		this.modData("Learnsets", "kabuto").learnset.mudshot = ["8L26"];
		this.modData("Learnsets", "kabuto").learnset.ancientpower = ["8L31"];
		this.modData("Learnsets", "kabuto").learnset.brine = ["8L36","8M"];
		this.modData("Learnsets", "kabuto").learnset.protect = ["8L41","8M"];
		this.modData("Learnsets", "kabuto").learnset.vitaldrain = ["8L46","8M"];
		this.modData("Learnsets", "kabuto").learnset.liquidation = ["8L51"];
		this.modData("Learnsets", "kabuto").learnset.metalsound = ["8L56"];
		this.modData("Learnsets", "kabuto").learnset.stoneedge = ["8L61","8M"];
		delete this.modData('Learnsets', 'kabuto').learnset.absorb;
		delete this.modData('Learnsets', 'kabuto').learnset.toxic;
		// Kabutops
		this.modData("Learnsets", "kabutops").learnset.cut = ["8D"];
		this.modData("Learnsets", "kabutops").learnset.leechlife = ["8L1"];
		this.modData("Learnsets", "kabutops").learnset.harden = ["8L1"];
		this.modData("Learnsets", "kabutops").learnset.scratch = ["8L6"];
		this.modData("Learnsets", "kabutops").learnset.sandattack = ["8L11"];
		this.modData("Learnsets", "kabutops").learnset.aquajet = ["8L16"];
		this.modData("Learnsets", "kabutops").learnset.leer = ["8L21"];
		this.modData("Learnsets", "kabutops").learnset.mudshot = ["8L26"];
		this.modData("Learnsets", "kabutops").learnset.ancientpower = ["8L31"];
		this.modData("Learnsets", "kabutops").learnset.brine = ["8L36","8M"];
		delete this.modData('Learnsets', 'kabutops').learnset.absorb;
		delete this.modData('Learnsets', 'kabutops').learnset.toxic;
		// Aerodactyl
		this.modData("Learnsets", "aerodactyl").learnset.twister = ["8D"];
		this.modData("Learnsets", "aerodactyl").learnset.roar = ["8L7","8M"];
		this.modData("Learnsets", "aerodactyl").learnset.ancientpower = ["8L13"];
		this.modData("Learnsets", "aerodactyl").learnset.agility = ["8L19"];
		this.modData("Learnsets", "aerodactyl").learnset.rockslide = ["8L25","8M"];
		this.modData("Learnsets", "aerodactyl").learnset.skydrop = ["8L31"];
		this.modData("Learnsets", "aerodactyl").learnset.crunch = ["8L37"];
		this.modData("Learnsets", "aerodactyl").learnset.ironhead = ["8L43","8M"];
		this.modData("Learnsets", "aerodactyl").learnset.takedown = ["8L49"];
		this.modData("Learnsets", "aerodactyl").learnset.fellswoop = ["8L55"];
		this.modData("Learnsets", "aerodactyl").learnset.hyperbeam = ["8L61","8M"];
		this.modData("Learnsets", "aerodactyl").learnset.gigaimpact = ["8L67","8M"];
		this.modData("Learnsets", "aerodactyl").learnset.breakingswipe = ["8M"];
		this.modData("Learnsets", "aerodactyl").learnset.screech = ["8M"];
		delete this.modData('Learnsets', 'aerodactyl').learnset.toxic;
		// Snorlax
		this.modData("Learnsets", "snorlax").learnset.selfdestruct = ["8D"];
		// Articuno
		this.modData("Learnsets", "articuno").learnset.extrasensory = ["8D"];
		this.modData("Learnsets", "articuno").learnset.icebeam = ["8L43","8M"];
		this.modData("Learnsets", "articuno").learnset.freezedry = ["8L71"];
		delete this.modData('Learnsets', 'articuno').learnset.toxic;
		// Zapdos
		this.modData("Learnsets", "zapdos").learnset.extrasensory = ["8D"];
		this.modData("Learnsets", "zapdos").learnset.pluck = ["8L15"];
		this.modData("Learnsets", "zapdos").learnset.detect = ["8L22"];
		this.modData("Learnsets", "zapdos").learnset.agility = ["8L36"];
		this.modData("Learnsets", "zapdos").learnset.lightscreen = ["8L50","8M"];
		this.modData("Learnsets", "zapdos").learnset.charge = ["8L64"];
		this.modData("Learnsets", "zapdos").learnset.boltbeak = ["8L71"];
		this.modData("Learnsets", "zapdos").learnset.drillpeck = ["8L92"];
		this.modData("Learnsets", "zapdos").learnset.flash = ["8M"];
		delete this.modData('Learnsets', 'zapdos').learnset.magneticflux;
		delete this.modData('Learnsets', 'zapdos').learnset.toxic;
		// Moltres
		this.modData("Learnsets", "moltres").learnset.extrasensory = ["8D"];
		this.modData("Learnsets", "moltres").learnset.airslash = ["8L15","8M"];
		this.modData("Learnsets", "moltres").learnset.agility = ["8L36"];
		this.modData("Learnsets", "moltres").learnset.flamethrower = ["8L43","8M"];
		this.modData("Learnsets", "moltres").learnset.safeguard = ["8L50","8M"];
		this.modData("Learnsets", "moltres").learnset.preheat = ["8L64"];
		this.modData("Learnsets", "moltres").learnset.heatwave = ["8L71","8M"];
		this.modData("Learnsets", "moltres").learnset.solarbeam = ["8L78","8M"];
		this.modData("Learnsets", "moltres").learnset.flash = ["8M"];
		this.modData("Learnsets", "moltres").learnset.hurricane = ["8M"];
		delete this.modData('Learnsets', 'moltres').learnset.toxic;
		// Dratini
		this.modData("Learnsets", "dratini").learnset.extremespeed = ["8D"];
		this.modData("Learnsets", "dratini").learnset.bind = ["8L1"];
		this.modData("Learnsets", "dratini").learnset.amnesia = ["8M"];
		delete this.modData('Learnsets', 'dratini').learnset.toxic;
		delete this.modData('Learnsets', 'dratini').learnset.wrap;
		// Dragonair
		this.modData("Learnsets", "dragonair").learnset.extremespeed = ["8D"];
		this.modData("Learnsets", "dragonair").learnset.bind = ["8L1"];
		this.modData("Learnsets", "dragonair").learnset.amnesia = ["8M"];
		delete this.modData('Learnsets', 'dragonair').learnset.toxic;
		delete this.modData('Learnsets', 'dragonair').learnset.wrap;
		// Dragonite
		this.modData("Learnsets", "dragonite").learnset.extremespeed = ["8D"];
		this.modData("Learnsets", "dragonite").learnset.fellswoop = ["8L0"];
		this.modData("Learnsets", "dragonite").learnset.bind = ["8L1"];
		this.modData("Learnsets", "dragonite").learnset.amnesia = ["8M"];
		this.modData("Learnsets", "dragonite").learnset.hurricane = ["8M"];
		delete this.modData('Learnsets', 'dragonite').learnset.toxic;
		delete this.modData('Learnsets', 'dragonite').learnset.wrap;
		// Mewtwo
		this.modData("Learnsets", "mewtwo").learnset.hypnosis = ["8D"];
		this.modData("Learnsets", "mewtwo").learnset.flash = ["8M"];
		this.modData("Learnsets", "mewtwo").learnset.nightmare = ["8M"];
		this.modData("Learnsets", "mewtwo").learnset.teleport = ["8L1"];
		delete this.modData('Learnsets', 'mewtwo').learnset.toxic;
		// Mew
		this.modData("Learnsets", "mew").learnset.hypnosis = ["8D"];
		this.modData("Learnsets", "mew").learnset.chipaway = ["8M"];
		this.modData("Learnsets", "mew").learnset.flash = ["8M"];
		this.modData("Learnsets", "mew").learnset.fullcollide = ["8M"];
		this.modData("Learnsets", "mew").learnset.midnight = ["8T"];
		this.modData("Learnsets", "mew").learnset.naturalgift = ["8M"];
		this.modData("Learnsets", "mew").learnset.nightmare = ["8M"];
		this.modData("Learnsets", "mew").learnset.stasis = ["8T"];
		this.modData("Learnsets", "mew").learnset.teleport = ["8L1"];
		this.modData("Learnsets", "mew").learnset.vitaldrain = ["8M"];
		// Chikorita
		this.modData("Learnsets", "chikorita").learnset.flowershield = ["8D"];
		this.modData("Learnsets", "chikorita").learnset.amnesia = ["8M"];
		this.modData("Learnsets", "chikorita").learnset.flash = ["8M"];
		this.modData("Learnsets", "chikorita").learnset.floralhealing = ["8E"];
		delete this.modData('Learnsets', 'chikorita').learnset.toxic;
		delete this.modData('Learnsets', 'chikorita').learnset.wringout;
		// Bayleef
		this.modData("Learnsets", "bayleef").learnset.flowershield = ["8D"];
		this.modData("Learnsets", "bayleef").learnset.amnesia = ["8M"];
		this.modData("Learnsets", "bayleef").learnset.flash = ["8M"];
		delete this.modData('Learnsets', 'bayleef').learnset.toxic;
		delete this.modData('Learnsets', 'bayleef').learnset.wringout;
		// Meganium
		this.modData("Learnsets", "meganium").learnset.flowershield = ["8D"];
		this.modData("Learnsets", "meganium").learnset.amnesia = ["8M"];
		this.modData("Learnsets", "meganium").learnset.bodypress = ["8M"];
		this.modData("Learnsets", "meganium").learnset.flash = ["8M"];
		delete this.modData('Learnsets', 'meganium').learnset.toxic;
		delete this.modData('Learnsets', 'meganium').learnset.wringout;
		// Cyndaquil
		this.modData("Learnsets", "cyndaquil").learnset.preheat = ["8D"];
		this.modData("Learnsets", "cyndaquil").learnset.flash = ["8M"];
		delete this.modData('Learnsets', 'cyndaquil').learnset.toxic;
		// Quilava
		this.modData("Learnsets", "quilava").learnset.preheat = ["8D"];
		this.modData("Learnsets", "quilava").learnset.flash = ["8M"];
		delete this.modData('Learnsets', 'quilava').learnset.toxic;
		// Typhlosion
		this.modData("Learnsets", "typhlosion").learnset.preheat = ["8D"];
		this.modData("Learnsets", "typhlosion").learnset.flash = ["8M"];
		delete this.modData('Learnsets', 'typhlosion').learnset.toxic;
		// Totodile
		this.modData("Learnsets", "totodile").learnset.faketears = ["8D"];
		delete this.modData('Learnsets', 'totodile').learnset.toxic;
		// Croconaw
		this.modData("Learnsets", "croconaw").learnset.faketears = ["8D"];
		delete this.modData('Learnsets', 'croconaw').learnset.toxic;
		// Feraligatr
		this.modData("Learnsets", "feraligatr").learnset.faketears = ["8D"];
		delete this.modData('Learnsets', 'feraligatr').learnset.toxic;
		// Sentret
		this.modData("Learnsets", "sentret").learnset.detect = ["8D"];
		this.modData("Learnsets", "sentret").learnset.faketears = ["8M"];
		delete this.modData('Learnsets', 'sentret').learnset.toxic;
		// Furret
		this.modData("Learnsets", "furret").learnset.coil = ["8D"];
		this.modData("Learnsets", "furret").learnset.faketears = ["8M"];
		delete this.modData('Learnsets', 'furret').learnset.toxic;
		// Hoothoot
		this.modData("Learnsets", "hoothoot").learnset.imprison = ["8D"];
		this.modData("Learnsets", "hoothoot").learnset.nightmare = ["8M"];
		delete this.modData('Learnsets', 'hoothoot').learnset.toxic;
		// Noctowl
		this.modData("Learnsets", "noctowl").learnset.imprison = ["8D"];
		this.modData("Learnsets", "noctowl").learnset.nightmare = ["8M"];
		delete this.modData('Learnsets', 'noctowl').learnset.toxic;
		// Ledyba
		this.modData("Learnsets", "ledyba").learnset.barrier = ["8D"];
		this.modData("Learnsets", "ledyba").learnset.bugcloud = ["8L1"];
		this.modData("Learnsets", "ledyba").learnset.flash = ["8M"];
		delete this.modData('Learnsets', 'ledyba').learnset.toxic;
		// Ledian
		this.modData("Learnsets", "ledian").learnset.barrier = ["8D"];
		this.modData("Learnsets", "ledian").learnset.bugcloud = ["8L1"];
		this.modData("Learnsets", "ledian").learnset.flash = ["8M"];
		this.modData("Learnsets", "ledian").learnset.meteorbeam = ["8T"];
		this.modData("Learnsets", "ledian").learnset.moonlight = ["8L0"];
		delete this.modData('Learnsets', 'ledian').learnset.toxic;
		// Spinarak
		this.modData("Learnsets", "spinarak").learnset.curse = ["8D"];
		this.modData("Learnsets", "spinarak").learnset.nightmare = ["8M"];
		this.modData("Learnsets", "spinarak").learnset.vitaldrain = ["8M"];
		delete this.modData('Learnsets', 'spinarak').learnset.absorb;
		// Ariados
		this.modData("Learnsets", "ariados").learnset.curse = ["8D"];
		this.modData("Learnsets", "ariados").learnset.nightmare = ["8M"];
		this.modData("Learnsets", "ariados").learnset.vitaldrain = ["8M"];
		delete this.modData('Learnsets', 'ariados').learnset.absorb;
		// Crobat
		this.modData("Learnsets", "crobat").learnset.detect = ["8D"];
		this.modData("Learnsets", "crobat").learnset.acrobatics = ["8L35"];
		this.modData("Learnsets", "crobat").learnset.vitaldrain = ["8L43"];
		delete this.modData('Learnsets', 'crobat').learnset.absorb;
		// Chinchou
		this.modData("Learnsets", "chinchou").learnset.zapcannon = ["8D"];
		this.modData("Learnsets", "chinchou").learnset.flash = ["8M"];
		delete this.modData('Learnsets', 'chinchou').learnset.toxic;
		// Lanturn
		this.modData("Learnsets", "lanturn").learnset.zapcannon = ["8D"];
		this.modData("Learnsets", "lanturn").learnset.flash = ["8M"];
		delete this.modData('Learnsets', 'lanturn').learnset.toxic;
		// Pichu
		this.modData("Learnsets", "pichu").learnset.paraboliccharge = ["8D"];
		this.modData("Learnsets", "pichu").learnset.flash = ["8M"];
		delete this.modData('Learnsets', 'pichu').learnset.toxic;
		// Cleffa
		this.modData("Learnsets", "cleffa").learnset.teeterdance = ["8D"];
		this.modData("Learnsets", "cleffa").learnset.flash = ["8M"];
		this.modData("Learnsets", "cleffa").learnset.nightmare = ["8M"];
		delete this.modData('Learnsets', 'cleffa').learnset.toxic;
		// Igglybuff
		this.modData("Learnsets", "igglybuff").learnset.tickle = ["8D"];
		this.modData("Learnsets", "igglybuff").learnset.pound = ["8L3"];
		this.modData("Learnsets", "igglybuff").learnset.aerate = ["8L3"];
		this.modData("Learnsets", "igglybuff").learnset.confide = ["8E"];
		this.modData("Learnsets", "igglybuff").learnset.flash = ["8M"];
		this.modData("Learnsets", "igglybuff").learnset.tearfullook = ["8E"];
		delete this.modData('Learnsets', 'igglybuff').learnset.toxic;
		// Togepi
		this.modData("Learnsets", "togepi").learnset.softboiled = ["8D"];
		this.modData("Learnsets", "togepi").learnset.daydream = ["8L1"];
		this.modData("Learnsets", "togepi").learnset.flash = ["8M"];
		this.modData("Learnsets", "togepi").learnset.naturalgift = ["8M"];
		delete this.modData('Learnsets', 'togepi').learnset.growl;
		delete this.modData('Learnsets', 'togepi').learnset.toxic;
		// Togetic
		this.modData("Learnsets", "togetic").learnset.softboiled = ["8D"];
		this.modData("Learnsets", "togetic").learnset.daydream = ["8L1"];
		this.modData("Learnsets", "togetic").learnset.flash = ["8M"];
		this.modData("Learnsets", "togetic").learnset.naturalgift = ["8M"];
		delete this.modData('Learnsets', 'togetic').learnset.growl;
		delete this.modData('Learnsets', 'togetic').learnset.toxic;
		// Natu
		this.modData("Learnsets", "natu").learnset.cosmicpower = ["8D"];
		this.modData("Learnsets", "natu").learnset.flash = ["8M"];
		this.modData("Learnsets", "natu").learnset.stasis = ["8M"];
		delete this.modData('Learnsets', 'natu').learnset.toxic;
		// Xatu
		this.modData("Learnsets", "xatu").learnset.cosmicpower = ["8D"];
		this.modData("Learnsets", "xatu").learnset.flash = ["8M"];
		this.modData("Learnsets", "xatu").learnset.stasis = ["8M"];
		delete this.modData('Learnsets', 'xatu').learnset.toxic;
		// Mareep
		this.modData("Learnsets", "mareep").learnset.tailglow = ["8D"];
		this.modData("Learnsets", "mareep").learnset.amnesia = ["8M"];
		this.modData("Learnsets", "mareep").learnset.electroball = ["8M"];
		this.modData("Learnsets", "mareep").learnset.flash = ["8M"];
		this.modData("Learnsets", "mareep").learnset.spotlight = ["8E"];
		delete this.modData('Learnsets', 'mareep').learnset.toxic;
		// Flaaffy
		this.modData("Learnsets", "flaaffy").learnset.tailglow = ["8D"];
		this.modData("Learnsets", "flaaffy").learnset.amnesia = ["8M"];
		this.modData("Learnsets", "flaaffy").learnset.electroball = ["8M"];
		this.modData("Learnsets", "flaaffy").learnset.flash = ["8M"];
		delete this.modData('Learnsets', 'flaaffy').learnset.toxic;
		// Ampharos
		this.modData("Learnsets", "ampharos").learnset.tailglow = ["8D"];
		this.modData("Learnsets", "ampharos").learnset.amnesia = ["8M"];
		this.modData("Learnsets", "ampharos").learnset.electroball = ["8M"];
		this.modData("Learnsets", "ampharos").learnset.flash = ["8M"];
		delete this.modData('Learnsets', 'ampharos').learnset.toxic;
		// Bellossom
		this.modData("Learnsets", "bellossom").learnset.junglehealing = ["8D"];
		this.modData("Learnsets", "bellossom").learnset.flash = ["8M"];
		this.modData("Learnsets", "bellossom").learnset.grasswhistle = ["8L1"];
		this.modData("Learnsets", "bellossom").learnset.healbell = ["8L1"];
		this.modData("Learnsets", "bellossom").learnset.luckychant = ["8L1"];
		this.modData("Learnsets", "bellossom").learnset.morningsun = ["8L1"];
		this.modData("Learnsets", "bellossom").learnset.magicalleaf = ["8L1"];
		this.modData("Learnsets", "bellossom").learnset.sweetscent = ["8L1"];
		delete this.modData('Learnsets', 'bellossom').learnset.acid;
		delete this.modData('Learnsets', 'bellossom').learnset.moonblast;
		delete this.modData('Learnsets', 'bellossom').learnset.moonlight;
		delete this.modData('Learnsets', 'bellossom').learnset.poisonpowder;
		delete this.modData('Learnsets', 'bellossom').learnset.quiverdance;
		delete this.modData('Learnsets', 'bellossom').learnset.toxic;
		// Marill
		this.modData("Learnsets", "marill").learnset.seismictoss = ["8D"];
		delete this.modData('Learnsets', 'marill').learnset.toxic;
		// Azumarill
		this.modData("Learnsets", "azumarill").learnset.seismictoss = ["8D"];
		this.modData("Learnsets", "azumarill").learnset.hydropump = ["8L52","8M"];
		this.modData("Learnsets", "azumarill").learnset.liquidation = ["8L56"];
		delete this.modData('Learnsets', 'azumarill').learnset.toxic;
		// Sudowoodo
		this.modData("Learnsets", "sudowoodo").learnset.camouflage = ["8D"];
		delete this.modData('Learnsets', 'sudowoodo').learnset.meteorbeam;
		delete this.modData('Learnsets', 'sudowoodo').learnset.toxic;
		// Politoed
		this.modData("Learnsets", "politoed").learnset.nobleroar = ["8D"];
		this.modData("Learnsets", "politoed").learnset.screech = ["8M"];
		delete this.modData('Learnsets', 'politoed').learnset.toxic;
		// Hoppip
		this.modData("Learnsets", "hoppip").learnset.pollenpuff = ["8D"];
		this.modData("Learnsets", "hoppip").learnset.flash = ["8M"];
		delete this.modData('Learnsets', 'hoppip').learnset.toxic;
		// Skiploom
		this.modData("Learnsets", "skiploom").learnset.pollenpuff = ["8D"];
		this.modData("Learnsets", "skiploom").learnset.flash = ["8M"];
		delete this.modData('Learnsets', 'skiploom').learnset.toxic;
		// Jumpluff
		this.modData("Learnsets", "jumpluff").learnset.pollenpuff = ["8D"];
		this.modData("Learnsets", "jumpluff").learnset.flash = ["8M"];
		delete this.modData('Learnsets', 'jumpluff').learnset.toxic;
		// Aipom
		this.modData("Learnsets", "aipom").learnset.swing = ["8D"];
		delete this.modData('Learnsets', 'aipom').learnset.toxic;
		// Sunkern
		this.modData("Learnsets", "sunkern").learnset.selfdestruct = ["8D"];
		this.modData("Learnsets", "sunkern").learnset.flash = ["8M"];
		delete this.modData('Learnsets', 'sunkern').learnset.toxic;
		// Sunflora
		this.modData("Learnsets", "sunflora").learnset.heatwave = ["8D"];
		this.modData("Learnsets", "sunflora").learnset.flash = ["8M"];
		delete this.modData('Learnsets', 'sunflora').learnset.toxic;
		// Yanma
		this.modData("Learnsets", "yanma").learnset.aircutter = ["8D"];
		this.modData("Learnsets", "yanma").learnset.bugcloud = ["8L1"];
		delete this.modData('Learnsets', 'yanma').learnset.tackle;
		delete this.modData('Learnsets', 'yanma').learnset.toxic;
		// Wooper
		this.modData("Learnsets", "wooper").learnset.headbutt = ["8D"];
		delete this.modData("Learnsets", "wooper").learnset.icepunch;
		delete this.modData("Learnsets", "wooper").learnset.poweruppunch;
		// Quagsire
		this.modData("Learnsets", "quagsire").learnset.headbutt = ["8D"];
		// Espeon
		this.modData("Learnsets", "espeon").learnset.extrasensory = ["8D"];
		this.modData("Learnsets", "espeon").learnset.flash = ["8M"];
		this.modData("Learnsets", "espeon").learnset.nightmare = ["8M"];
		delete this.modData('Learnsets', 'espeon').learnset.toxic;
		// Umbreon
		this.modData("Learnsets", "umbreon").learnset.nightdaze = ["8D"];
		this.modData("Learnsets", "umbreon").learnset.flash = ["8M"];
		this.modData("Learnsets", "umbreon").learnset.nightmare = ["8M"];
		// Murkrow
		this.modData("Learnsets", "murkrow").learnset.beatup = ["8D"];
		this.modData("Learnsets", "murkrow").learnset.compensation = ["8M"];
		this.modData("Learnsets", "murkrow").learnset.hex = ["8M"];
		this.modData("Learnsets", "murkrow").learnset.nastyplot = ["8M"];
		this.modData("Learnsets", "murkrow").learnset.nightmare = ["8M"];
		// Slowking
		this.modData("Learnsets", "slowking").learnset.skullbash = ["8D"];
		this.modData("Learnsets", "slowking").learnset.flash = ["8M"];
		this.modData("Learnsets", "slowking").learnset.stasis = ["8T"];
		delete this.modData('Learnsets', 'slowking').learnset.toxic;
		// Misdreavus
		this.modData("Learnsets", "misdreavus").learnset.healblock = ["8D"];
		this.modData("Learnsets", "misdreavus").learnset.disarmingvoice = ["8E"];
		this.modData("Learnsets", "misdreavus").learnset.flash = ["8M"];
		this.modData("Learnsets", "misdreavus").learnset.nightmare = ["8M"];
		this.modData("Learnsets", "misdreavus").learnset.poltergeist = ["8M"];
		delete this.modData('Learnsets', 'misdreavus').learnset.toxic;
		// Unown
		this.modData("Learnsets", "unown").learnset.storedpower = ["8D"];
		// Wobbuffet
		this.modData("Learnsets", "wobbuffet").learnset.rebound = ["8D"];
		// Girafarig
		this.modData("Learnsets", "girafarig").learnset.feint = ["8D"];
		this.modData("Learnsets", "girafarig").learnset.flash = ["8M"];
		this.modData("Learnsets", "girafarig").learnset.nightmare = ["8M"];
		delete this.modData('Learnsets', 'girafarig').learnset.toxic;
		// Pineco
		this.modData("Learnsets", "pineco").learnset.leechseed = ["8D"];
		delete this.modData('Learnsets', 'pineco').learnset.toxic;
		// Forretress
		this.modData("Learnsets", "forretress").learnset.spikecannon = ["8D"];
		this.modData("Learnsets", "forretress").learnset.fullcollide = ["8M"];
		this.modData("Learnsets", "forretress").learnset.steelbeam = ["8M"];
		delete this.modData('Learnsets', 'forretress').learnset.toxic;
		// Dunsparce
		this.modData("Learnsets", "dunsparce").learnset.dragondance = ["8D"];
		this.modData("Learnsets", "dunsparce").learnset.nightmare = ["8M"];
		delete this.modData('Learnsets', 'dunsparce').learnset.toxic;
		// Gligar
		this.modData("Learnsets", "gligar").learnset.skydrop = ["8D"];
		this.modData("Learnsets", "gligar").learnset.assurance = ["8M"];
		this.modData("Learnsets", "gligar").learnset.lunge = ["8E"];
		// Steelix
		this.modData("Learnsets", "steelix").learnset.sharpen = ["8D"];
		delete this.modData('Learnsets', 'steelix').learnset.meteorbeam;
		// Snubbull
		this.modData("Learnsets", "snubbull").learnset.beatup = ["8D"];
		this.modData("Learnsets", "snubbull").learnset.pounce = ["8L19"];
		delete this.modData('Learnsets', 'snubbull').learnset.headbutt;
		delete this.modData('Learnsets', 'snubbull').learnset.toxic;
		// Granbull
		this.modData("Learnsets", "granbull").learnset.beatup = ["8D"];
		this.modData("Learnsets", "granbull").learnset.pounce = ["8L19"];
		delete this.modData('Learnsets', 'granbull').learnset.headbutt;
		delete this.modData('Learnsets', 'granbull').learnset.toxic;
		// Qwilfish
		this.modData("Learnsets", "qwilfish").learnset.fellstinger = ["8D"];
		this.modData("Learnsets", "qwilfish").learnset.whitewater = ["8L12"];
		this.modData("Learnsets", "qwilfish").learnset.pinmissile = ["8L24"];
		this.modData("Learnsets", "qwilfish").learnset.brine = ["8L32","8M"];
		this.modData("Learnsets", "qwilfish").learnset.aquatail = ["8L48","8M"];
		this.modData("Learnsets", "qwilfish").learnset.destinybond = ["8L53"];
		this.modData("Learnsets", "qwilfish").learnset.liquidation = ["8L56"];
		this.modData("Learnsets", "qwilfish").learnset.hydropump = ["8L57","8M"];
		this.modData("Learnsets", "qwilfish").learnset.rebound = ["8L60"];
		this.modData("Learnsets", "qwilfish").learnset.nightmare = ["8M"];
		delete this.modData('Learnsets', 'qwilfish').learnset.acupressure;
		delete this.modData('Learnsets', 'qwilfish').learnset.takedown;
		// Scizor
		this.modData("Learnsets", "scizor").learnset.guillotine = ["8D"];
		this.modData("Learnsets", "scizor").learnset.pursuit = ["8L16"];
		this.modData("Learnsets", "scizor").learnset.razorwind = ["8L52"];
		this.modData("Learnsets", "scizor").learnset.feint = ["8L56"];
		delete this.modData('Learnsets', 'scizor').learnset.doubleteam;
		delete this.modData('Learnsets', 'scizor').learnset.toxic;
		// Shuckle
		this.modData("Learnsets", "shuckle").learnset.curse = ["8D"];
		this.modData("Learnsets", "shuckle").learnset.stockpile = ["8L34"];
		this.modData("Learnsets", "shuckle").learnset.naturalgift = ["8M"];
		this.modData("Learnsets", "shuckle").learnset.recycle = ["8M"];
		delete this.modData('Learnsets', 'shuckle').learnset.meteorbeam;
		delete this.modData('Learnsets', 'shuckle').learnset.shellsmash;
		// Heracross
		this.modData("Learnsets", "heracross").learnset.horndrill = ["8D"];
		this.modData("Learnsets", "heracross").learnset.throatchop = ["8L34"];
		delete this.modData('Learnsets', 'heracross').learnset.takedown;
		delete this.modData('Learnsets', 'heracross').learnset.toxic;
		// Sneasel
		this.modData("Learnsets", "sneasel").learnset.razorwind = ["8D"];
		this.modData("Learnsets", "sneasel").learnset.nightmare = ["8M"];
		delete this.modData('Learnsets', 'sneasel').learnset.toxic;
		// Teddiursa
		this.modData("Learnsets", "teddiursa").learnset.slackoff = ["8D"];
		this.modData("Learnsets", "teddiursa").learnset.amnesia = ["8M"];
		delete this.modData('Learnsets', 'teddiursa').learnset.toxic;
		// Ursaring
		this.modData("Learnsets", "ursaring").learnset.slackoff = ["8D"];
		this.modData("Learnsets", "ursaring").learnset.amnesia = ["8M"];
		this.modData("Learnsets", "ursaring").learnset.bodypress = ["8M"];
		this.modData("Learnsets", "ursaring").learnset.knockoff = ["8M"];
		this.modData("Learnsets", "ursaring").learnset.screech = ["8M"];
		delete this.modData('Learnsets', 'ursaring').learnset.toxic;
		// Slugma
		this.modData("Learnsets", "slugma").learnset.burnup = ["8D"];
		this.modData("Learnsets", "slugma").learnset.flash = ["8M"];
		delete this.modData('Learnsets', 'slugma').learnset.toxic;
		// Magcargo
		this.modData("Learnsets", "magcargo").learnset.magmastorm = ["8D"];
		this.modData("Learnsets", "magcargo").learnset.flash = ["8M"];
		delete this.modData('Learnsets', 'magcargo').learnset.toxic;
		// Swinub
		this.modData("Learnsets", "swinub").learnset.headbutt = ["8D"];
		this.modData("Learnsets", "swinub").learnset.tussle = ["8L18"];
		this.modData("Learnsets", "swinub").learnset.mudbomb = ["8L21"];
		this.modData("Learnsets", "swinub").learnset.icywind = ["8L24","8M"];
		this.modData("Learnsets", "swinub").learnset.iceshard = ["8L28"];
		this.modData("Learnsets", "swinub").learnset.takedown = ["8L33"];
		this.modData("Learnsets", "swinub").learnset.charm = ["8M"];
		delete this.modData('Learnsets', 'swinub').learnset.toxic;
		// Piloswine
		this.modData("Learnsets", "piloswine").learnset.highhorsepower = ["8D"];
		this.modData("Learnsets", "piloswine").learnset.tussle = ["8L18"];
		this.modData("Learnsets", "piloswine").learnset.mudbomb = ["8L21"];
		this.modData("Learnsets", "piloswine").learnset.icywind = ["8L24","8M"];
		this.modData("Learnsets", "piloswine").learnset.iceshard = ["8L28"];
		this.modData("Learnsets", "piloswine").learnset.takedown = ["8L33"];
		this.modData("Learnsets", "piloswine").learnset.charm = ["8M"];
		delete this.modData('Learnsets', 'piloswine').learnset.toxic;
		// Corsola
		this.modData("Learnsets", "corsola").learnset.lifedew = ["8D"];
		this.modData("Learnsets", "corsola").learnset.dustspray = ["8L17"];
		this.modData("Learnsets", "corsola").learnset.ancientpower = ["8L31"];
		this.modData("Learnsets", "corsola").learnset.rockblast = ["8E"];
		this.modData("Learnsets", "corsola").learnset.naturalgift = ["8M"];
		delete this.modData('Learnsets', 'corsola').learnset.headsmash;
		delete this.modData('Learnsets', 'corsola').learnset.meteorbeam;
		delete this.modData('Learnsets', 'corsola').learnset.tantrum;
		delete this.modData('Learnsets', 'corsola').learnset.toxic;
		// Corsola Galar
		this.modData("Learnsets", "corsolagalar").learnset.clearsmog = ["8D"];
		this.modData("Learnsets", "corsolagalar").learnset.dustspray = ["8L17"];
		this.modData("Learnsets", "corsolagalar").learnset.dreameater = ["8M"];
		this.modData("Learnsets", "corsolagalar").learnset.endeavor = ["8M"];
		this.modData("Learnsets", "corsolagalar").learnset.explosion = ["8M"];
		this.modData("Learnsets", "corsolagalar").learnset.gravity = ["8M"];
		this.modData("Learnsets", "corsolagalar").learnset.healblock = ["8M"];
		this.modData("Learnsets", "corsolagalar").learnset.magiccoat = ["8M"];
		this.modData("Learnsets", "corsolagalar").learnset.nightmare = ["8M"];
		this.modData("Learnsets", "corsolagalar").learnset.painsplit = ["8M"];
		this.modData("Learnsets", "corsolagalar").learnset.psychup = ["8M"];
		this.modData("Learnsets", "corsolagalar").learnset.toxic = ["8M"];
		delete this.modData('Learnsets', 'corsolagalar').learnset.meteorbeam;
		delete this.modData('Learnsets', 'corsolagalar').learnset.tantrum;
		// Remoraid
		this.modData("Learnsets", "remoraid").learnset.laserfocus = ["8D"];
		this.modData("Learnsets", "remoraid").learnset.simplebeam = ["8E"];
		this.modData("Learnsets", "remoraid").learnset.signalbeam = ["8M"];
		this.modData("Learnsets", "remoraid").learnset.snipeshot = ["8E"];
		delete this.modData('Learnsets', 'remoraid').learnset.bulletseed;
		delete this.modData('Learnsets', 'remoraid').learnset.toxic;
		// Octillery
		this.modData("Learnsets", "octillery").learnset.hydrocannon = ["8D"];
		this.modData("Learnsets", "octillery").learnset.liquidation = ["8L1"];
		this.modData("Learnsets", "octillery").learnset.signalbeam = ["8L28"];
		delete this.modData('Learnsets', 'octillery').learnset.bulletseed;
		delete this.modData('Learnsets', 'octillery').learnset.toxic;
		// Delibird
		this.modData("Learnsets", "delibird").learnset.payday = ["8D"];
		this.modData("Learnsets", "delibird").learnset.present = ["8L1","8L15","8L30","8L45"];
		this.modData("Learnsets", "delibird").learnset.powdersnow = ["8L5"];
		this.modData("Learnsets", "delibird").learnset.peck = ["8L10"];
		this.modData("Learnsets", "delibird").learnset.icywind = ["8L20","8M"];
		this.modData("Learnsets", "delibird").learnset.drillpeck = ["8L25"];
		this.modData("Learnsets", "delibird").learnset.blizzard = ["8L35","8M"];
		this.modData("Learnsets", "delibird").learnset.fly = ["8L40","8M"];
		this.modData("Learnsets", "delibird").learnset.hail = ["8L50","8M"];
		this.modData("Learnsets", "delibird").learnset.endeavor = ["8M"];
		this.modData("Learnsets", "delibird").learnset.knockoff = ["8M"];
		this.modData("Learnsets", "delibird").learnset.snatch = ["8M"];
		this.modData("Learnsets", "delibird").learnset.trick = ["8M"];
		delete this.modData('Learnsets', 'delibird').learnset.bounce;
		delete this.modData('Learnsets', 'delibird').learnset.drillrun;
		delete this.modData('Learnsets', 'delibird').learnset.toxic;
		// Mantine
		this.modData("Learnsets", "mantine").learnset.skydrop = ["8D"];
		this.modData("Learnsets", "mantine").learnset.waterpulse = ["8L7","8M"];
		this.modData("Learnsets", "mantine").learnset.bubblebeam = ["8L19"];
		delete this.modData('Learnsets', 'mantine').learnset.roost;
		delete this.modData('Learnsets', 'mantine').learnset.stringshot;
		delete this.modData('Learnsets', 'mantine').learnset.toxic;
		// Skarmory
		this.modData("Learnsets", "skarmory").learnset.detect = ["8D"];
		this.modData("Learnsets", "skarmory").learnset.flash = ["8M"];
		this.modData("Learnsets", "skarmory").learnset.fullcollide = ["8M"];
		delete this.modData('Learnsets', 'skarmory').learnset.bodypress;
		delete this.modData('Learnsets', 'skarmory').learnset.toxic;
		// Houndour
		this.modData("Learnsets", "houndour").learnset.throatchop = ["8D"];
		this.modData("Learnsets", "houndour").learnset.compensation = ["8M"];
		this.modData("Learnsets", "houndour").learnset.flash = ["8M"];
		this.modData("Learnsets", "houndour").learnset.hex = ["8M"];
		this.modData("Learnsets", "houndour").learnset.nightmare = ["8M"];
		// Houndoom
		this.modData("Learnsets", "houndoom").learnset.throatchop = ["8D"];
		this.modData("Learnsets", "houndoom").learnset.compensation = ["8M"];
		this.modData("Learnsets", "houndoom").learnset.flash = ["8M"];
		this.modData("Learnsets", "houndoom").learnset.hex = ["8M"];
		this.modData("Learnsets", "houndoom").learnset.nightmare = ["8M"];
		// Kingdra
		this.modData("Learnsets", "kingdra").learnset.storedpower = ["8D"];
		delete this.modData('Learnsets', 'kingdra').learnset.toxic;
		// Phanpy
		this.modData("Learnsets", "phanpy").learnset.watergun = ["8D"];
		this.modData("Learnsets", "phanpy").learnset.bodypress = ["8M"];
		this.modData("Learnsets", "phanpy").learnset.encore = ["8M"];
		this.modData("Learnsets", "phanpy").learnset.screech = ["8M"];
		this.modData("Learnsets", "phanpy").learnset.tussle = ["8L10"];
		delete this.modData('Learnsets', 'phanpy').learnset.rollout;
		delete this.modData('Learnsets', 'phanpy').learnset.toxic;
		// Donphan
		this.modData("Learnsets", "donphan").learnset.uturn = ["8D"];
		this.modData("Learnsets", "donphan").learnset.bodypress = ["8M"];
		this.modData("Learnsets", "donphan").learnset.encore = ["8M"];
		this.modData("Learnsets", "donphan").learnset.fullcollide = ["8M"];
		this.modData("Learnsets", "donphan").learnset.screech = ["8M"];
		this.modData("Learnsets", "donphan").learnset.steamroller = ["8L0"];
		delete this.modData('Learnsets', 'donphan').learnset.furyattack;
		delete this.modData('Learnsets', 'donphan').learnset.toxic;
		// Porygon2
		this.modData("Learnsets", "porygon2").learnset.teleport = ["8D"];
		this.modData("Learnsets", "porygon2").learnset.flash = ["8M"];
		this.modData("Learnsets", "porygon2").learnset.powergem = ["8M"];
		delete this.modData('Learnsets', 'porygon2').learnset.toxic;
		// Stantler
		this.modData("Learnsets", "stantler").learnset.followme = ["8D"];
		this.modData("Learnsets", "stantler").learnset.flash = ["8M"];
		this.modData("Learnsets", "stantler").learnset.hex = ["8M"];
		this.modData("Learnsets", "stantler").learnset.nastyplot = ["8M"];
		this.modData("Learnsets", "stantler").learnset.nightmare = ["8M"];
		this.modData("Learnsets", "stantler").learnset.psychicterrain = ["8M"];
		delete this.modData('Learnsets', 'stantler').learnset.toxic;
		// Tyrogue
		this.modData("Learnsets", "tyrogue").learnset.submission = ["8D"];
		this.modData("Learnsets", "tyrogue").learnset.chipaway = ["8M"];
		delete this.modData('Learnsets', 'tyrogue').learnset.toxic;
		// Hitmontop
		this.modData("Learnsets", "hitmontop").learnset.entrainment = ["8D"];
		this.modData("Learnsets", "hitmontop").learnset.teeterdance = ["8L8"];
		this.modData("Learnsets", "hitmontop").learnset.gyroball = ["8L12","8M"];
		this.modData("Learnsets", "hitmontop").learnset.detect = ["8L16"];
		this.modData("Learnsets", "hitmontop").learnset.revenge = ["8L21"];
		this.modData("Learnsets", "hitmontop").learnset.chipaway = ["8L24","8M"];
		this.modData("Learnsets", "hitmontop").learnset.wideguard = ["8L28"];
		this.modData("Learnsets", "hitmontop").learnset.quickguard = ["8L28"];
		this.modData("Learnsets", "hitmontop").learnset.suckerpunch = ["8L32"];
		this.modData("Learnsets", "hitmontop").learnset.agility = ["8L36"];
		this.modData("Learnsets", "hitmontop").learnset.dig = ["8L40","8M"];
		this.modData("Learnsets", "hitmontop").learnset.closecombat = ["8L44"];
		this.modData("Learnsets", "hitmontop").learnset.counter = ["8L48"];
		this.modData("Learnsets", "hitmontop").learnset.lashout = ["8L52"];
		this.modData("Learnsets", "hitmontop").learnset.endeavor = ["8M"];
		delete this.modData('Learnsets', 'hitmontop').learnset.toxic;
		// Smoochum
		this.modData("Learnsets", "smoochum").learnset.lovelykiss = ["8D"];
		this.modData("Learnsets", "smoochum").learnset.confide = ["8E"];
		this.modData("Learnsets", "smoochum").learnset.daydream = ["8L1"];
		this.modData("Learnsets", "smoochum").learnset.amnesia = ["8M"];
		this.modData("Learnsets", "smoochum").learnset.hex = ["8M"];
		this.modData("Learnsets", "smoochum").learnset.nightmare = ["8M"];
		delete this.modData('Learnsets', 'smoochum').learnset.toxic;
		// Elekid
		this.modData("Learnsets", "elekid").learnset.zingzap = ["8D"];
		this.modData("Learnsets", "elekid").learnset.flash = ["8M"];
		this.modData("Learnsets", "elekid").learnset.overdrive = ["8E"];
		delete this.modData('Learnsets', 'elekid').learnset.toxic;
		// Magby
		this.modData("Learnsets", "magby").learnset.pelletshot = ["8D"];
		this.modData("Learnsets", "magby").learnset.amnesia = ["8M"];
		this.modData("Learnsets", "magby").learnset.flash = ["8M"];
		this.modData("Learnsets", "magby").learnset.sludgebomb = ["8M"];
		delete this.modData('Learnsets', 'magby').learnset.toxic;
		// Miltank
		this.modData("Learnsets", "miltank").learnset.megakick = ["8D"];
		this.modData("Learnsets", "miltank").learnset.steamroller = ["8L24"];
		this.modData("Learnsets", "miltank").learnset.safeguard = ["8L29","8M"];
		this.modData("Learnsets", "miltank").learnset.bodyslam = ["8L35"];
		this.modData("Learnsets", "miltank").learnset.zenheadbutt = ["8L41","8M"];
		this.modData("Learnsets", "miltank").learnset.captivate = ["8L47"];
		this.modData("Learnsets", "miltank").learnset.playrough = ["8L53"];
		this.modData("Learnsets", "miltank").learnset.healbell = ["8L59","8M"];
		this.modData("Learnsets", "miltank").learnset.highhorsepower = ["8L65"];
		this.modData("Learnsets", "miltank").learnset.endeavor = ["8L71","8M"];
		delete this.modData('Learnsets', 'miltank').learnset.toxic;
		delete this.modData('Learnsets', 'miltank').learnset.wakeupslap;
		// Blissey
		this.modData("Learnsets", "blissey").learnset.happyhour = ["8D"];
		delete this.modData('Learnsets', 'blissey').learnset.rockclimb;
		delete this.modData('Learnsets', 'blissey').learnset.tantrum;
		delete this.modData('Learnsets', 'blissey').learnset.toxic;
		// Raikou
		this.modData("Learnsets", "raikou").learnset.extremespeed = ["8D"];
		this.modData("Learnsets", "raikou").learnset.electroball = ["8M"];
		this.modData("Learnsets", "raikou").learnset.flash = ["8M"];
		delete this.modData('Learnsets', 'raikou').learnset.toxic;
		// Entei
		this.modData("Learnsets", "entei").learnset.napalm = ["8D"];
		this.modData("Learnsets", "entei").learnset.flash = ["8M"];
		delete this.modData('Learnsets', 'entei').learnset.sacredfire;
		delete this.modData('Learnsets', 'entei').learnset.toxic;
		// Suicune
		this.modData("Learnsets", "suicune").learnset.sheercold = ["8D"];
		delete this.modData('Learnsets', 'suicune').learnset.toxic;
		// Larvitar
		this.modData("Learnsets", "larvitar").learnset.rage = ["8D"];
		this.modData("Learnsets", "larvitar").learnset.rockthrow = ["8L1"];
		this.modData("Learnsets", "larvitar").learnset.tussle = ["8L3"];
		this.modData("Learnsets", "larvitar").learnset.chipaway = ["8L24"];
		this.modData("Learnsets", "larvitar").learnset.darkpulse = ["8M"];
		delete this.modData('Learnsets', 'larvitar').learnset.toxic;
		// Pupitar
		this.modData("Learnsets", "pupitar").learnset.rage = ["8D"];
		this.modData("Learnsets", "pupitar").learnset.rockthrow = ["8L1"];
		this.modData("Learnsets", "pupitar").learnset.tussle = ["8L3"];
		this.modData("Learnsets", "pupitar").learnset.chipaway = ["8L24"];
		this.modData("Learnsets", "pupitar").learnset.darkpulse = ["8M"];
		delete this.modData('Learnsets', 'pupitar').learnset.toxic;
		// Tyranitar
		this.modData("Learnsets", "tyranitar").learnset.rage = ["8D"];
		this.modData("Learnsets", "tyranitar").learnset.rockthrow = ["8L1"];
		this.modData("Learnsets", "tyranitar").learnset.tussle = ["8L3"];
		this.modData("Learnsets", "tyranitar").learnset.chipaway = ["8L24"];
		this.modData("Learnsets", "tyranitar").learnset.darkpulse = ["8M"];
		this.modData("Learnsets", "tyranitar").learnset.nightmare = ["8M"];
		delete this.modData('Learnsets', 'tyranitar').learnset.toxic;
		// Lugia
		this.modData("Learnsets", "lugia").learnset.psychoboost = ["8D"];
		this.modData("Learnsets", "lugia").learnset.gust = ["8L1"];
		this.modData("Learnsets", "lugia").learnset.mist = ["8L9"];
		this.modData("Learnsets", "lugia").learnset.fellswoop = ["8L15"];
		this.modData("Learnsets", "lugia").learnset.flash = ["8M"];
		this.modData("Learnsets", "lugia").learnset.nightmare = ["8M"];
		delete this.modData('Learnsets', 'lugia').learnset.dragonrush;
		delete this.modData('Learnsets', 'lugia').learnset.toxic;
		// Ho-oh
		this.modData("Learnsets", "hooh").learnset.burnup = ["8D"];
		this.modData("Learnsets", "hooh").learnset.gust = ["8L1"];
		this.modData("Learnsets", "hooh").learnset.lifedew = ["8L9"];
		this.modData("Learnsets", "hooh").learnset.flash = ["8M"];
		this.modData("Learnsets", "hooh").learnset.nightmare = ["8M"];
		delete this.modData('Learnsets', 'hooh').learnset.toxic;
		// Celebi
		this.modData("Learnsets", "celebi").learnset.forestscurse = ["8D"];
		this.modData("Learnsets", "celebi").learnset.teleport = ["8L9"];
		this.modData("Learnsets", "celebi").learnset.magicalleaf = ["8L17"];
		this.modData("Learnsets", "celebi").learnset.ancientpower = ["8L25"];
		this.modData("Learnsets", "celebi").learnset.lifedew = ["8L33"];
		this.modData("Learnsets", "celebi").learnset.batonpass = ["8L41"];
		this.modData("Learnsets", "celebi").learnset.naturalgift = ["8L49"];
		this.modData("Learnsets", "celebi").learnset.healblock = ["8L57"];
		this.modData("Learnsets", "celebi").learnset.futuresight = ["8L65"];
		this.modData("Learnsets", "celebi").learnset.healingwish = ["8L73"];
		this.modData("Learnsets", "celebi").learnset.leafstorm = ["8L81"];
		this.modData("Learnsets", "celebi").learnset.perishsong = ["8L89"];
		this.modData("Learnsets", "celebi").learnset.safeguard = ["8M"];
		this.modData("Learnsets", "celebi").learnset.flash = ["8M"];
		this.modData("Learnsets", "celebi").learnset.nightmare = ["8M"];
		this.modData("Learnsets", "celebi").learnset.stasis = ["8T"];
		delete this.modData('Learnsets', 'celebi').learnset.toxic;
		// Treecko
		this.modData("Learnsets", "treecko").learnset.dragondance = ["8D"];
		this.modData("Learnsets", "treecko").learnset.branchpoke = ["8E"];
		this.modData("Learnsets", "treecko").learnset.flash = ["8M"];
		this.modData("Learnsets", "treecko").learnset.naturalgift = ["8M"];
		delete this.modData('Learnsets', 'treecko').learnset.toxic;
		// Grovyle
		this.modData("Learnsets", "grovyle").learnset.dragondance = ["8D"];
		this.modData("Learnsets", "grovyle").learnset.flash = ["8M"];
		this.modData("Learnsets", "grovyle").learnset.naturalgift = ["8M"];
		delete this.modData('Learnsets', 'grovyle').learnset.toxic;
		// Sceptile
		this.modData("Learnsets", "sceptile").learnset.woodhammer = ["8D"];
		this.modData("Learnsets", "sceptile").learnset.flash = ["8M"];
		this.modData("Learnsets", "sceptile").learnset.naturalgift = ["8M"];
		this.modData("Learnsets", "sceptile").learnset.solarblade = ["8L1"];
		delete this.modData('Learnsets', 'sceptile').learnset.toxic;
		// Torchic
		this.modData("Learnsets", "torchic").learnset.pluck = ["8D"];
		delete this.modData('Learnsets', 'torchic').learnset.defog;
		delete this.modData('Learnsets', 'torchic').learnset.toxic;
		// Combusken
		this.modData("Learnsets", "combusken").learnset.vacuumwave = ["8D"];
		delete this.modData('Learnsets', 'combusken').learnset.defog;
		delete this.modData('Learnsets', 'combusken').learnset.toxic;
		// Blaziken
		this.modData("Learnsets", "blaziken").learnset.vacuumwave = ["8D"];
		delete this.modData('Learnsets', 'blaziken').learnset.defog;
		delete this.modData('Learnsets', 'blaziken').learnset.toxic;
		// Mudkip
		this.modData("Learnsets", "mudkip").learnset.liquidation = ["8D"];
		this.modData("Learnsets", "mudkip").learnset.chipaway = ["8M"];
		this.modData("Learnsets", "mudkip").learnset.whitewater = ["8L4"];
		delete this.modData('Learnsets', 'mudkip').learnset.toxic;
		// Marshtomp
		this.modData("Learnsets", "marshtomp").learnset.liquidation = ["8D"];
		this.modData("Learnsets", "marshtomp").learnset.chipaway = ["8M"];
		this.modData("Learnsets", "marshtomp").learnset.whitewater = ["8L4"];
		delete this.modData('Learnsets', 'marshtomp').learnset.toxic;
		// Swampert
		this.modData("Learnsets", "swampert").learnset.liquidation = ["8D"];
		this.modData("Learnsets", "swampert").learnset.chipaway = ["8M"];
		this.modData("Learnsets", "swampert").learnset.whitewater = ["8L4"];
		delete this.modData('Learnsets', 'swampert').learnset.toxic;
		// Poochyena
		this.modData("Learnsets", "poochyena").learnset.partingshot = ["8D"];
		this.modData("Learnsets", "poochyena").learnset.compensation = ["8M"];
		// Mightyena
		this.modData("Learnsets", "mightyena").learnset.partingshot = ["8D"];
		this.modData("Learnsets", "mightyena").learnset.compensation = ["8M"];
		// Zigzagoon
		this.modData("Learnsets", "zigzagoon").learnset.extremespeed = ["8D"];
		this.modData("Learnsets", "zigzagoon").learnset.odorsleuth = ["8L12"];
		// Zigzagoon Galar
		this.modData("Learnsets", "zigzagoongalar").learnset.pounce = ["8D"];
		this.modData("Learnsets", "zigzagoongalar").learnset.echoedvoice = ["8M"];
		this.modData("Learnsets", "zigzagoongalar").learnset.embargo = ["8M"];
		this.modData("Learnsets", "zigzagoongalar").learnset.honeclaws = ["8M"];
		this.modData("Learnsets", "zigzagoongalar").learnset.lastresort = ["8M"];
		this.modData("Learnsets", "zigzagoongalar").learnset.odorsleuth = ["8L12"];
		this.modData("Learnsets", "zigzagoongalar").learnset.pursuit = ["8E"];
		this.modData("Learnsets", "zigzagoongalar").learnset.rocksmash = ["8M"];
		this.modData("Learnsets", "zigzagoongalar").learnset.snatch = ["8M"];
		this.modData("Learnsets", "zigzagoongalar").learnset.spite = ["8M"];
		this.modData("Learnsets", "zigzagoongalar").learnset.toxic = ["8M"];
		this.modData("Learnsets", "zigzagoongalar").learnset.torment = ["8M"];
		// Linoone
		this.modData("Learnsets", "linoone").learnset.extremespeed = ["8D"];
		this.modData("Learnsets", "linoone").learnset.odorsleuth = ["8L12"];
		this.modData("Learnsets", "linoone").learnset.playrough = ["8L1"];
		this.modData("Learnsets", "linoone").learnset.pursuit = ["8M"];
		this.modData("Learnsets", "linoone").learnset.rototiller = ["8L1"];
		this.modData("Learnsets", "linoone").learnset.xscissor = ["8M"];
		delete this.modData('Learnsets', 'linoone').learnset.babydolleyes;
		delete this.modData('Learnsets', 'linoone').learnset.pinmissile;
		// Linoone Galar
		this.modData("Learnsets", "linoonegalar").learnset.throatchop = ["8D"];
		this.modData("Learnsets", "linoonegalar").learnset.echoedvoice = ["8M"];
		this.modData("Learnsets", "linoonegalar").learnset.embargo = ["8M"];
		this.modData("Learnsets", "linoonegalar").learnset.honeclaws = ["8M"];
		this.modData("Learnsets", "linoonegalar").learnset.lastresort = ["8M"];
		this.modData("Learnsets", "linoonegalar").learnset.odorsleuth = ["8L12"];
		this.modData("Learnsets", "linoonegalar").learnset.playrough = ["8L1"];
		this.modData("Learnsets", "linoonegalar").learnset.pursuit = ["8M"];
		this.modData("Learnsets", "linoonegalar").learnset.rocksmash = ["8M"];
		this.modData("Learnsets", "linoonegalar").learnset.snatch = ["8M"];
		this.modData("Learnsets", "linoonegalar").learnset.spite = ["8M"];
		this.modData("Learnsets", "linoonegalar").learnset.torment = ["8M"];
		this.modData("Learnsets", "linoonegalar").learnset.toxic = ["8M"];
		this.modData("Learnsets", "linoonegalar").learnset.tussle = ["8L1"];
		this.modData("Learnsets", "linoonegalar").learnset.xscissor = ["8M"];
		delete this.modData('Learnsets', 'linoonegalar').learnset.babydolleyes;
		delete this.modData('Learnsets', 'linoonegalar').learnset.bodypress;
		delete this.modData('Learnsets', 'linoonegalar').learnset.pinmissile;
		// Beautifly
		this.modData("Learnsets", "beautifly").learnset.drainingkiss = ["8D"];
		this.modData("Learnsets", "beautifly").learnset.leechlife = ["8L20","8M"];
		this.modData("Learnsets", "beautifly").learnset.vitaldrain = ["8L37","8M"];
		this.modData("Learnsets", "beautifly").learnset.charm = ["8M"];
		this.modData("Learnsets", "beautifly").learnset.flash = ["8M"];
		this.modData("Learnsets", "beautifly").learnset.naturalgift = ["8M"];
		delete this.modData('Learnsets', 'beautifly').learnset.aircutter;
		delete this.modData('Learnsets', 'beautifly').learnset.rage;
		delete this.modData('Learnsets', 'beautifly').learnset.toxic;
		// Dustox
		this.modData("Learnsets", "dustox").learnset.nightdaze = ["8D"];
		this.modData("Learnsets", "dustox").learnset.flash = ["8M"];
		this.modData("Learnsets", "dustox").learnset.naturalgift = ["8M"];
		// Lotad
		this.modData("Learnsets", "lotad").learnset.soak = ["8D"];
		this.modData("Learnsets", "lotad").learnset.naturalgift = ["8M"];
		// Lombre
		this.modData("Learnsets", "lombre").learnset.soak = ["8D"];
		this.modData("Learnsets", "lombre").learnset.naturalgift = ["8M"];
		// Ludicolo
		this.modData("Learnsets", "ludicolo").learnset.drumbeating = ["8D"];
		this.modData("Learnsets", "ludicolo").learnset.naturalgift = ["8M"];
		// Seedot
		this.modData("Learnsets", "seedot").learnset.irondefense = ["8D"];
		this.modData("Learnsets", "seedot").learnset.naturalgift = ["8M"];
		delete this.modData('Learnsets', 'seedot').learnset.defog;
		delete this.modData('Learnsets', 'seedot').learnset.toxic;
		// Nuzleaf
		this.modData("Learnsets", "nuzleaf").learnset.forestscurse = ["8D"];
		this.modData("Learnsets", "nuzleaf").learnset.grasswhistle = ["8L20"];
		this.modData("Learnsets", "nuzleaf").learnset.razorwind = ["8L40"];
		this.modData("Learnsets", "nuzleaf").learnset.naturalgift = ["8M"];
		delete this.modData('Learnsets', 'nuzleaf').learnset.toxic;
		// Shiftry
		this.modData("Learnsets", "shiftry").learnset.forestscurse = ["8D"];
		this.modData("Learnsets", "shiftry").learnset.grasswhistle = ["8L1"];
		this.modData("Learnsets", "shiftry").learnset.solarblade = ["8L1"];
		this.modData("Learnsets", "shiftry").learnset.naturalgift = ["8M"];
		delete this.modData('Learnsets', 'shiftry').learnset.bounce;
		delete this.modData('Learnsets', 'shiftry').learnset.toxic;
		// Taillow
		this.modData("Learnsets", "taillow").learnset.featherdance = ["8D"];
		delete this.modData('Learnsets', 'taillow').learnset.toxic;
		// Swellow
		this.modData("Learnsets", "swellow").learnset.featherdance = ["8D"];
		delete this.modData('Learnsets', 'swellow').learnset.toxic;
		// Wingull
		this.modData("Learnsets", "wingull").learnset.belch = ["8D"];
		delete this.modData('Learnsets', 'wingull').learnset.toxic;
		// Pelipper
		this.modData("Learnsets", "pelipper").learnset.belch = ["8D"];
		delete this.modData('Learnsets', 'pelipper').learnset.toxic;
		// Ralts
		this.modData("Learnsets", "ralts").learnset.sing = ["8D"];
		this.modData("Learnsets", "ralts").learnset.confide = ["8L1"];
		this.modData("Learnsets", "ralts").learnset.confusion = ["8L1"];
		this.modData("Learnsets", "ralts").learnset.daydream = ["8L4"];
		this.modData("Learnsets", "ralts").learnset.flash = ["8M"];
		this.modData("Learnsets", "ralts").learnset.nightmare = ["8M"];
		delete this.modData('Learnsets', 'ralts').learnset.toxic;
		// Kirlia
		this.modData("Learnsets", "kirlia").learnset.sing = ["8D"];
		this.modData("Learnsets", "kirlia").learnset.confide = ["8L1"];
		this.modData("Learnsets", "kirlia").learnset.confusion = ["8L1"];
		this.modData("Learnsets", "kirlia").learnset.daydream = ["8L4"];
		this.modData("Learnsets", "kirlia").learnset.flash = ["8M"];
		this.modData("Learnsets", "kirlia").learnset.nightmare = ["8M"];
		delete this.modData('Learnsets', 'kirlia').learnset.toxic;
		// Gardevoir
		this.modData("Learnsets", "gardevoir").learnset.sing = ["8D"];
		this.modData("Learnsets", "gardevoir").learnset.confide = ["8L1"];
		this.modData("Learnsets", "gardevoir").learnset.confusion = ["8L1"];
		this.modData("Learnsets", "gardevoir").learnset.daydream = ["8L4"];
		this.modData("Learnsets", "gardevoir").learnset.flash = ["8M"];
		this.modData("Learnsets", "gardevoir").learnset.nightmare = ["8M"];
		delete this.modData('Learnsets', 'gardevoir').learnset.toxic;
		// Surskit
		this.modData("Learnsets", "surskit").learnset.aquajet = ["8D"];
		delete this.modData('Learnsets', 'surskit').learnset.toxic;
		// Masquerain
		this.modData("Learnsets", "masquerain").learnset.glare = ["8D"];
		this.modData("Learnsets", "masquerain").learnset.nightmare = ["8M"];
		delete this.modData('Learnsets', 'masquerain').learnset.toxic;
		// Shroomish
		this.modData("Learnsets", "shroomish").learnset.doubleedge = ["8D"];
		this.modData("Learnsets", "shroomish").learnset.naturalgift = ["8M"];
		delete this.modData('Learnsets', 'shroomish').learnset.synthesis;
		// Breloom
		this.modData("Learnsets", "breloom").learnset.jumpkick = ["8D"];
		this.modData("Learnsets", "breloom").learnset.naturalgift = ["8M"];
		delete this.modData('Learnsets', 'breloom').learnset.synthesis;
		// Slakoth
		this.modData("Learnsets", "slakoth").learnset.bide = ["8D"];
		delete this.modData('Learnsets', 'slakoth').learnset.toxic;
		// Vigoroth
		this.modData("Learnsets", "vigoroth").learnset.bide = ["8D"];
		this.modData("Learnsets", "vigoroth").learnset.compensation = ["8M"];
		delete this.modData('Learnsets', 'vigoroth').learnset.toxic;
		// Slaking
		this.modData("Learnsets", "slaking").learnset.bide = ["8D"];
		this.modData("Learnsets", "slaking").learnset.bodypress = ["8M"];
		this.modData("Learnsets", "slaking").learnset.compensation = ["8M"];
		delete this.modData('Learnsets', 'slaking').learnset.toxic;
		// Nincada
		this.modData("Learnsets", "nincada").learnset.detect = ["8D"];
		this.modData("Learnsets", "nincada").learnset.cut = ["8E"];
		this.modData("Learnsets", "nincada").learnset.leechlife = ["8L5"];
		this.modData("Learnsets", "nincada").learnset.vitaldrain = ["8M"];
		delete this.modData('Learnsets', 'nincada').learnset.absorb;
		delete this.modData('Learnsets', 'nincada').learnset.toxic;
		// Ninjask
		this.modData("Learnsets", "ninjask").learnset.aircutter = ["8D"];
		this.modData("Learnsets", "ninjask").learnset.flash = ["8M"];
		this.modData("Learnsets", "nincada").learnset.leechlife = ["8L5"];
		this.modData("Learnsets", "ninjask").learnset.vitaldrain = ["8M"];
		delete this.modData('Learnsets', 'ninjask').learnset.absorb;
		delete this.modData('Learnsets', 'ninjask').learnset.toxic;
		// Shedinja
		this.modData("Learnsets", "shedinja").learnset.playdead = ["8D"];
		this.modData("Learnsets", "shedinja").learnset.nightmare = ["8M"];
		this.modData("Learnsets", "shedinja").learnset.stasis = ["8M"];
		this.modData("Learnsets", "shedinja").learnset.vitaldrain = ["8M"];
		delete this.modData('Learnsets', 'shedinja').learnset.absorb;
		delete this.modData('Learnsets', 'shedinja').learnset.toxic;
		// Whismur
		this.modData("Learnsets", "whismur").learnset.teeterdance = ["8D"];
		delete this.modData('Learnsets', 'whismur').learnset.toxic;
		// Loudred
		this.modData("Learnsets", "loudred").learnset.teeterdance = ["8D"];
		delete this.modData('Learnsets', 'loudred').learnset.toxic;
		// Exploud
		this.modData("Learnsets", "exploud").learnset.teeterdance = ["8D"];
		this.modData("Learnsets", "exploud").learnset.bodypress = ["8M"];
		delete this.modData('Learnsets', 'exploud').learnset.toxic;
		// Makuhita
		this.modData("Learnsets", "makuhita").learnset.matblock = ["8D"];
		this.modData("Learnsets", "makuhita").learnset.bodypress = ["8L34","8M"];
		delete this.modData('Learnsets', 'makuhita').learnset.toxic;
		delete this.modData('Learnsets', 'makuhita').learnset.wakeupslap;
		// Hariyama
		this.modData("Learnsets", "hariyama").learnset.matblock = ["8D"];
		this.modData("Learnsets", "hariyama").learnset.bodypress = ["8L34","8M"];
		delete this.modData('Learnsets', 'hariyama').learnset.toxic;
		delete this.modData('Learnsets', 'hariyama').learnset.wakeupslap;
		// Azurill
		this.modData("Learnsets", "azurill").learnset.doubleedge = ["8D"];
		delete this.modData('Learnsets', 'azurill').learnset.toxic;
		// Nosepass
		this.modData("Learnsets", "nosepass").learnset.electrify = ["8D"];
		this.modData("Learnsets", "nosepass").learnset.headsmash = ["8E"];
		delete this.modData('Learnsets', 'nosepass').learnset.toxic;
		// Skitty
		this.modData("Learnsets", "skitty").learnset.payday = ["8D"];
		this.modData("Learnsets", "skitty").learnset.amnesia = ["8M"];
		delete this.modData('Learnsets', 'skitty').learnset.toxic;
		// Delcatty
		this.modData("Learnsets", "delcatty").learnset.payday = ["8D"];
		this.modData("Learnsets", "delcatty").learnset.amnesia = ["8M"];
		delete this.modData('Learnsets', 'delcatty').learnset.toxic;
		// Sableye
		this.modData("Learnsets", "sableye").learnset.crunch = ["8D"];
		this.modData("Learnsets", "sableye").learnset.flash = ["8M"];
		this.modData("Learnsets", "sableye").learnset.nightmare = ["8M"];
		delete this.modData('Learnsets', 'sableye').learnset.toxic;
		// Mawile
		this.modData("Learnsets", "mawile").learnset.jawlock = ["8D"];
		delete this.modData('Learnsets', 'mawile').learnset.toxic;
		// Aron
		this.modData("Learnsets", "aron").learnset.scaryface = ["8D"];
		this.modData("Learnsets", "aron").learnset.fullcollide = ["8M"];
		delete this.modData('Learnsets', 'aron').learnset.toxic;
		// Lairon
		this.modData("Learnsets", "lairon").learnset.scaryface = ["8D"];
		this.modData("Learnsets", "lairon").learnset.fullcollide = ["8M"];
		delete this.modData('Learnsets', 'lairon').learnset.toxic;
		// Aggron
		this.modData("Learnsets", "aggron").learnset.scaryface = ["8D"];
		this.modData("Learnsets", "aggron").learnset.breakingswipe = ["8M"];
		this.modData("Learnsets", "aggron").learnset.fullcollide = ["8M"];
		delete this.modData('Learnsets', 'aggron').learnset.toxic;
		// Meditite
		this.modData("Learnsets", "meditite").learnset.vacuumwave = ["8D"];
		this.modData("Learnsets", "meditite").learnset.amnesia = ["8M"];
		this.modData("Learnsets", "meditite").learnset.chipaway = ["8M"];
		this.modData("Learnsets", "meditite").learnset.mindbend = ["8L7"];
		this.modData("Learnsets", "meditite").learnset.poweruppunch = ["8E"];
		delete this.modData('Learnsets', 'meditite').learnset.confusion;
		delete this.modData('Learnsets', 'meditite').learnset.toxic;
		// Medicham
		this.modData("Learnsets", "medicham").learnset.vacuumwave = ["8D"];
		this.modData("Learnsets", "medicham").learnset.amnesia = ["8M"];
		this.modData("Learnsets", "medicham").learnset.chipaway = ["8M"];
		this.modData("Learnsets", "medicham").learnset.mindbend = ["8L7"];
		delete this.modData('Learnsets', 'medicham').learnset.confusion;
		delete this.modData('Learnsets', 'medicham').learnset.toxic;
		// Electrike
		this.modData("Learnsets", "electrike").learnset.playrough = ["8D"];
		this.modData("Learnsets", "electrike").learnset.flash = ["8M"];
		delete this.modData('Learnsets', 'electrike').learnset.toxic;
		// Manectric
		this.modData("Learnsets", "manectric").learnset.playrough = ["8D"];
		this.modData("Learnsets", "manectric").learnset.flash = ["8M"];
		delete this.modData('Learnsets', 'manectric').learnset.toxic;
		// Plusle
		this.modData("Learnsets", "plusle").learnset.magneticflux = ["8D"];
		this.modData("Learnsets", "plusle").learnset.flash = ["8M"];
		delete this.modData('Learnsets', 'plusle').learnset.toxic;
		// Minun
		this.modData("Learnsets", "minun").learnset.magneticflux = ["8D"];
		this.modData("Learnsets", "minun").learnset.flash = ["8M"];
		delete this.modData('Learnsets', 'minun').learnset.toxic;
		// Volbeat
		this.modData("Learnsets", "volbeat").learnset.spotlight = ["8D"];
		this.modData("Learnsets", "volbeat").learnset.bugcloud = ["8L1"];
		this.modData("Learnsets", "volbeat").learnset.flash = ["8L1", "8M"];
		delete this.modData('Learnsets', 'volbeat').learnset.toxic;
		// Illumise
		this.modData("Learnsets", "illumise").learnset.ragepowder = ["8D"];
		this.modData("Learnsets", "illumise").learnset.bugcloud = ["8L1"];
		this.modData("Learnsets", "illumise").learnset.flash = ["8M"];
		// Roselia
		this.modData("Learnsets", "roselia").learnset.captivate = ["8D"];
		this.modData("Learnsets", "roselia").learnset.grasswhistle = ["8L19"];
		this.modData("Learnsets", "roselia").learnset.magicalleaf = ["8L22"];
		this.modData("Learnsets", "roselia").learnset.sweetscent = ["8L25"];
		this.modData("Learnsets", "roselia").learnset.gigadrain = ["8L31"];
		this.modData("Learnsets", "roselia").learnset.lifedew = ["8L37"];
		this.modData("Learnsets", "roselia").learnset.petalblizzard = ["8L40"];
		this.modData("Learnsets", "roselia").learnset.toxic = ["8L43","8M"];
		this.modData("Learnsets", "roselia").learnset.aromatherapy = ["8L46"];
		this.modData("Learnsets", "roselia").learnset.synthesis = ["8L49","8M"];
		this.modData("Learnsets", "roselia").learnset.petaldance = ["8L52"];
		this.modData("Learnsets", "roselia").learnset.naturalgift = ["8M"];
		// Gulpin
		this.modData("Learnsets", "gulpin").learnset.rebound = ["8D"];
		this.modData("Learnsets", "gulpin").learnset.nightmare = ["8M"];
		// Swalot
		this.modData("Learnsets", "swalot").learnset.rebound = ["8D"];
		this.modData("Learnsets", "swalot").learnset.nightmare = ["8M"];
		// Carvanha
		this.modData("Learnsets", "carvanha").learnset.fishiousrend = ["8D"];
		this.modData("Learnsets", "carvanha").learnset.liquidation = ["8L32"];
		delete this.modData('Learnsets', 'carvanha').learnset.poisonfang;
		delete this.modData('Learnsets', 'carvanha').learnset.toxic;
		// Sharpedo
		this.modData("Learnsets", "sharpedo").learnset.fishiousrend = ["8D"];
		this.modData("Learnsets", "sharpedo").learnset.liquidation = ["8L34"];
		delete this.modData('Learnsets', 'sharpedo').learnset.poisonfang;
		delete this.modData('Learnsets', 'sharpedo').learnset.toxic;
		// Wailmer
		this.modData("Learnsets", "wailmer").learnset.slackoff = ["8D"];
		this.modData("Learnsets", "wailmer").learnset.rebound = ["8E"];
		this.modData("Learnsets", "wailmer").learnset.whitewater = ["8E"];
		delete this.modData('Learnsets', 'wailmer').learnset.toxic;
		// Wailord
		this.modData("Learnsets", "wailord").learnset.slackoff = ["8D"];
		delete this.modData('Learnsets', 'wailord').learnset.toxic;
		// Numel
		this.modData("Learnsets", "numel").learnset.highhorsepower = ["8D"];
		delete this.modData('Learnsets', 'numel').learnset.toxic;
		// Camerupt
		this.modData("Learnsets", "camerupt").learnset.highhorsepower = ["8D"];
		this.modData("Learnsets", "camerupt").learnset.bodypress = ["8M"];
		this.modData("Learnsets", "camerupt").learnset.compensation = ["8M"];
		delete this.modData('Learnsets', 'camerupt').learnset.toxic;
		// Torkoal
		this.modData("Learnsets", "torkoal").learnset.shelltrap = ["8D"];
		this.modData("Learnsets", "torkoal").learnset.flash = ["8M"];
		this.modData("Learnsets", "torkoal").learnset.fullcollide = ["8M"];
		this.modData("Learnsets", "torkoal").learnset.tarshot = ["8L53"];
		delete this.modData('Learnsets', 'torkoal').learnset.toxic;
		// Spoink
		this.modData("Learnsets", "spoink").learnset.heartstamp = ["8D"];
		this.modData("Learnsets", "spoink").learnset.flash = ["8M"];
		// Grumpig
		this.modData("Learnsets", "grumpig").learnset.followme = ["8D"];
		this.modData("Learnsets", "grumpig").learnset.flash = ["8M"];
		this.modData("Learnsets", "grumpig").learnset.nastyplot = ["8M"];
		this.modData("Learnsets", "grumpig").learnset.psychicterrain = ["8M"];
		// Spinda
		this.modData("Learnsets", "spinda").learnset.topsyturvy = ["8D"];
		this.modData("Learnsets", "spinda").learnset.amnesia = ["8M"];
		this.modData("Learnsets", "spinda").learnset.flash = ["8M"];
		this.modData("Learnsets", "spinda").learnset.nightmare = ["8M"];
		delete this.modData('Learnsets', 'spinda').learnset.toxic;
		// Trapinch
		this.modData("Learnsets", "trapinch").learnset.strugglebug = ["8D"];
		delete this.modData('Learnsets', 'trapinch').learnset.toxic;
		// Vibrava
		this.modData("Learnsets", "vibrava").learnset.silverwind = ["8D"];
		delete this.modData('Learnsets', 'vibrava').learnset.toxic;
		// Flygon
		this.modData("Learnsets", "flygon").learnset.silverwind = ["8D"];
		this.modData("Learnsets", "flygon").learnset.dragonrush = ["8L0"];
		this.modData("Learnsets", "flygon").learnset.dragonclaw = ["8L1", "8M"];
		this.modData("Learnsets", "flygon").learnset.fellswoop = ["8L47"];
		this.modData("Learnsets", "flygon").learnset.boomburst = ["8L53"];
		delete this.modData('Learnsets', 'flygon').learnset.toxic;
		// Cacnea
		this.modData("Learnsets", "cacnea").learnset.mimic = ["8D"];
		this.modData("Learnsets", "cacnea").learnset.encore = ["8M"];
		this.modData("Learnsets", "cacnea").learnset.naturalgift = ["8M"];
		// Cacturne
		this.modData("Learnsets", "cacturne").learnset.mimic = ["8D"];
		this.modData("Learnsets", "cacturne").learnset.assurance = ["8M"];
		this.modData("Learnsets", "cacturne").learnset.compensation = ["8M"];
		this.modData("Learnsets", "cacturne").learnset.encore = ["8M"];
		this.modData("Learnsets", "cacturne").learnset.naturalgift = ["8M"];
		// Swablu
		this.modData("Learnsets", "swablu").learnset.weatherball = ["8D"];
		this.modData("Learnsets", "swablu").learnset.amnesia = ["8M"];
		delete this.modData('Learnsets', 'swablu').learnset.toxic;
		// Altaria
		this.modData("Learnsets", "altaria").learnset.mistball = ["8D"];
		this.modData("Learnsets", "altaria").learnset.amnesia = ["8M"];
		delete this.modData('Learnsets', 'altaria').learnset.toxic;
		// Zangoose
		this.modData("Learnsets", "zangoose").learnset.warriorssoul = ["8D"];
		this.modData("Learnsets", "zangoose").learnset.compensation = ["8M"];
		delete this.modData('Learnsets', 'zangoose').learnset.toxic;
		// Seviper
		this.modData("Learnsets", "seviper").learnset.warriorssoul = ["8D"];
		this.modData("Learnsets", "seviper").learnset.bind = ["8L1"];
		this.modData("Learnsets", "seviper").learnset.compensation = ["8M"];
		delete this.modData('Learnsets', 'seviper').learnset.wrap;
		// Lunatone
		this.modData("Learnsets", "lunatone").learnset.midnight = ["8D"];
		this.modData("Learnsets", "lunatone").learnset.futuresight = ["8M"];
		this.modData("Learnsets", "lunatone").learnset.healblock = ["8L1"];
		this.modData("Learnsets", "lunatone").learnset.moonblast = ["8L40"];
		this.modData("Learnsets", "lunatone").learnset.powergem = ["8L35","8M"];
		this.modData("Learnsets", "lunatone").learnset.stoneedge = ["8M"];
		this.modData("Learnsets", "lunatone").learnset.flash = ["8M"];
		// Solrock
		this.modData("Learnsets", "solrock").learnset.pyroball = ["8D"];
		this.modData("Learnsets", "solrock").learnset.flash = ["8M"];
		this.modData("Learnsets", "solrock").learnset.healblock = ["8L1"];
		this.modData("Learnsets", "solrock").learnset.mindbend = ["8L1"];
		delete this.modData('Learnsets', 'solrock').learnset.confusion;
		// Barboach
		this.modData("Learnsets", "barboach").learnset.mindreader = ["8D"];
		this.modData("Learnsets", "barboach").learnset.slipaway = ["8L48"];
		delete this.modData('Learnsets', 'barboach').learnset.toxic;
		// Whiscash
		this.modData("Learnsets", "whiscash").learnset.mindreader = ["8D"];
		this.modData("Learnsets", "whiscash").learnset.slipaway = ["8L59"];
		delete this.modData('Learnsets', 'whiscash').learnset.toxic;
		// Corphish
		this.modData("Learnsets", "corphish").learnset.muddywater = ["8D"];
		this.modData("Learnsets", "corphish").learnset.compensation = ["8M"];
		delete this.modData('Learnsets', 'corphish').learnset.toxic;
		// Crawdaunt
		this.modData("Learnsets", "crawdaunt").learnset.muddywater = ["8D"];
		delete this.modData('Learnsets', 'crawdaunt').learnset.avalanche;
		delete this.modData('Learnsets', 'crawdaunt').learnset.toxic;
		// Baltoy
		this.modData("Learnsets", "baltoy").learnset.refresh = ["8D"];
		this.modData("Learnsets", "baltoy").learnset.flash = ["8M"];
		delete this.modData('Learnsets', 'baltoy').learnset.toxic;
		// Claydol
		this.modData("Learnsets", "claydol").learnset.refresh = ["8D"];
		this.modData("Learnsets", "claydol").learnset.flash = ["8M"];
		delete this.modData('Learnsets', 'claydol').learnset.bodypress;
		delete this.modData('Learnsets', 'claydol').learnset.toxic;
		// Lileep
		this.modData("Learnsets", "lileep").learnset.leechseed = ["8D"];
		this.modData("Learnsets", "lileep").learnset.flash = ["8M"];
		this.modData("Learnsets", "lileep").learnset.naturalgift = ["8M"];
		// Cradily
		this.modData("Learnsets", "cradily").learnset.leechseed = ["8D"];
		this.modData("Learnsets", "cradily").learnset.flash = ["8M"];
		this.modData("Learnsets", "cradily").learnset.naturalgift = ["8M"];
		// Anorith
		this.modData("Learnsets", "anorith").learnset.strugglebug = ["8D"];
		delete this.modData('Learnsets', 'anorith').learnset.toxic;
		// Armaldo
		this.modData("Learnsets", "armaldo").learnset.liquidation = ["8D"];
		this.modData("Learnsets", "armaldo").learnset.fullcollide = ["8M"];
		delete this.modData('Learnsets', 'armaldo').learnset.toxic;
		// Feebas
		delete this.modData('Learnsets', 'feebas').learnset.toxic;
		// Milotic
		this.modData("Learnsets", "milotic").learnset.lifedew = ["8D"];
		this.modData("Learnsets", "milotic").learnset.bind = ["8L1"];
		delete this.modData('Learnsets', 'milotic').learnset.avalanche;
		delete this.modData('Learnsets', 'milotic').learnset.toxic;
		delete this.modData('Learnsets', 'milotic').learnset.wrap;
		// Castform
		this.modData("Learnsets", "castform").learnset.lifedew = ["8D"];
		this.modData("Learnsets", "castform").learnset.flash = ["8M"];
		this.modData("Learnsets", "castform").learnset.eerieimpulse = ["8M"];
		this.modData("Learnsets", "castform").learnset.electroball = ["8M"];
		delete this.modData('Learnsets', 'castform').learnset.toxic;
		// Kecleon
		this.modData("Learnsets", "kecleon").learnset.reflecttype = ["8D"];
		delete this.modData('Learnsets', 'kecleon').learnset.toxic;
		// Shuppet
		this.modData("Learnsets", "shuppet").learnset.trickortreat = ["8D"];
		this.modData("Learnsets", "shuppet").learnset.flash = ["8M"];
		this.modData("Learnsets", "shuppet").learnset.nastyplot = ["8M"];
		this.modData("Learnsets", "shuppet").learnset.nightmare = ["8M"];
		this.modData("Learnsets", "shuppet").learnset.poltergeist = ["8M"];
		delete this.modData('Learnsets', 'shuppet').learnset.toxic;
		// Banette
		this.modData("Learnsets", "banette").learnset.trickortreat = ["8D"];
		this.modData("Learnsets", "banette").learnset.flash = ["8M"];
		this.modData("Learnsets", "banette").learnset.nastyplot = ["8M"];
		this.modData("Learnsets", "banette").learnset.nightmare = ["8M"];
		this.modData("Learnsets", "banette").learnset.poltergeist = ["8M"];
		delete this.modData('Learnsets', 'banette').learnset.toxic;
		// Duskull
		this.modData("Learnsets", "duskull").learnset.hypnosis = ["8D"];
		this.modData("Learnsets", "duskull").learnset.flash = ["8M"];
		this.modData("Learnsets", "duskull").learnset.phantomforce = ["8M"];
		// Dusclops
		this.modData("Learnsets", "dusclops").learnset.hypnosis = ["8D"];
		this.modData("Learnsets", "dusclops").learnset.drainpunch = ["8M"];
		this.modData("Learnsets", "dusclops").learnset.flash = ["8M"];
		this.modData("Learnsets", "dusclops").learnset.phantomforce = ["8M"];
		// Tropius
		this.modData("Learnsets", "tropius").learnset.rejuvenate = ["8D"];
		this.modData("Learnsets", "tropius").learnset.leafstorm = ["8L1"];
		this.modData("Learnsets", "tropius").learnset.airslash = ["8L30","8M"];
		this.modData("Learnsets", "tropius").learnset.naturalgift = ["8L36","8M"];
		this.modData("Learnsets", "tropius").learnset.fellswoop = ["8L41"];
		this.modData("Learnsets", "tropius").learnset.woodhammer = ["8L61"];
		this.modData("Learnsets", "tropius").learnset.bodypress = ["8M"];
		this.modData("Learnsets", "tropius").learnset.grassyterrain = ["8M"];
		this.modData("Learnsets", "tropius").learnset.hurricane = ["8M"];
		this.modData("Learnsets", "tropius").learnset.tropkick = ["8E"];
		delete this.modData('Learnsets', 'tropius').learnset.bodyslam;
		delete this.modData('Learnsets', 'tropius').learnset.toxic;
		// Chimecho
		this.modData("Learnsets", "chimecho").learnset.mirrorcoat = ["8D"];
		this.modData("Learnsets", "chimecho").learnset.flash = ["8M"];
		this.modData("Learnsets", "chimecho").learnset.nightmare = ["8M"];
		delete this.modData('Learnsets', 'chimecho').learnset.toxic;
		// Absol
		this.modData("Learnsets", "absol").learnset.destinybond = ["8D"];
		this.modData("Learnsets", "absol").learnset.cut = ["8E"];
		this.modData("Learnsets", "absol").learnset.nightmare = ["8M"];
		delete this.modData('Learnsets', 'absol').learnset.toxic;
		// Wynaut
		this.modData("Learnsets", "wynaut").learnset.tickle = ["8D"];
		this.modData("Learnsets", "wynaut").learnset.n = ["8M"];
		this.modData("Learnsets", "wynaut").learnset.a = ["8M"];
		delete this.modData('Learnsets', 'wynaut').learnset.n;
		delete this.modData('Learnsets', 'wynaut').learnset.a;
		// Snorunt
		this.modData("Learnsets", "snorunt").learnset.snowtumble = ["8D"];
		this.modData("Learnsets", "snorunt").learnset.flash = ["8M"];
		this.modData("Learnsets", "snorunt").learnset.iceball = ["8E"];
		delete this.modData('Learnsets', 'snorunt').learnset.toxic;
		// Glalie
		this.modData("Learnsets", "glalie").learnset.snowtumble = ["8D"];
		this.modData("Learnsets", "glalie").learnset.flash = ["8M"];
		delete this.modData('Learnsets', 'glalie').learnset.toxic;
		// Spheal
		this.modData("Learnsets", "spheal").learnset.rebound = ["8D"];
		this.modData("Learnsets", "spheal").learnset.amnesia = ["8M"];
		delete this.modData('Learnsets', 'spheal').learnset.toxic;
		// Sealeo
		this.modData("Learnsets", "sealeo").learnset.rebound = ["8D"];
		this.modData("Learnsets", "sealeo").learnset.amnesia = ["8M"];
		this.modData("Learnsets", "sealeo").learnset.bodypress = ["8M"];
		delete this.modData('Learnsets', 'sealeo').learnset.toxic;
		// Walrein
		this.modData("Learnsets", "walrein").learnset.quash = ["8D"];
		this.modData("Learnsets", "walrein").learnset.amnesia = ["8M"];
		delete this.modData('Learnsets', 'walrein').learnset.toxic;
		// Huntail
		this.modData("Learnsets", "huntail").learnset.tailglow = ["8D"];
		this.modData("Learnsets", "huntail").learnset.assurance = ["8M"];
		this.modData("Learnsets", "huntail").learnset.flash = ["8M"];
		this.modData("Learnsets", "huntail").learnset.nastyplot = ["8M"];
		delete this.modData('Learnsets', 'huntail').learnset.toxic;
		// Gorebyss
		this.modData("Learnsets", "gorebyss").learnset.strengthsap = ["8D"];
		this.modData("Learnsets", "gorebyss").learnset.nastyplot = ["8M"];
		delete this.modData('Learnsets', 'gorebyss').learnset.infestation;
		delete this.modData('Learnsets', 'gorebyss').learnset.toxic;
		// Relicanth
		this.modData("Learnsets", "relicanth").learnset.playdead = ["8D"];
		delete this.modData('Learnsets', 'relicanth').learnset.toxic;
		// Luvdisc
		this.modData("Learnsets", "luvdisc").learnset.lovelykiss = ["8D"];
		this.modData("Learnsets", "luvdisc").learnset.faketears = ["8M"];
		delete this.modData('Learnsets', 'luvdisc').learnset.toxic;
		// Bagon
		this.modData("Learnsets", "bagon").learnset.wish = ["8D"];
		this.modData("Learnsets", "bagon").learnset.focusenergy = ["8L20"];
		this.modData("Learnsets", "bagon").learnset.scaryface = ["8L40"];
		this.modData("Learnsets", "bagon").learnset.fullcollide = ["8M"];
		this.modData("Learnsets", "bagon").learnset.screech = ["8M"];
		delete this.modData('Learnsets', 'bagon').learnset.toxic;
		// Shelgon
		this.modData("Learnsets", "shelgon").learnset.wish = ["8D"];
		this.modData("Learnsets", "shelgon").learnset.focusenergy = ["8L20"];
		this.modData("Learnsets", "shelgon").learnset.scaryface = ["8L46"];
		this.modData("Learnsets", "shelgon").learnset.fullcollide = ["8M"];
		this.modData("Learnsets", "shelgon").learnset.screech = ["8M"];
		delete this.modData('Learnsets', 'shelgon').learnset.toxic;
		// Salamence
		this.modData("Learnsets", "salamence").learnset.wish = ["8D"];
		this.modData("Learnsets", "salamence").learnset.focusenergy = ["8L20"];
		this.modData("Learnsets", "salamence").learnset.scaryface = ["8L46"];
		this.modData("Learnsets", "salamence").learnset.fellswoop = ["8L73"];
		this.modData("Learnsets", "salamence").learnset.fullcollide = ["8M"];
		this.modData("Learnsets", "salamence").learnset.screech = ["8M"];
		delete this.modData('Learnsets', 'salamence').learnset.doubleedge;
		delete this.modData('Learnsets', 'salamence').learnset.toxic;
		// Metang
		this.modData("Learnsets", "metang").learnset.dynamicpunch = ["8D"];
		this.modData("Learnsets", "metang").learnset.amnesia = ["8M"];
		this.modData("Learnsets", "metang").learnset.bodypress = ["8M"];
		this.modData("Learnsets", "metang").learnset.flash = ["8M"];
		this.modData("Learnsets", "metang").learnset.futuresight = ["8M"];
		delete this.modData('Learnsets', 'metang').learnset.toxic;
		// Metagross
		this.modData("Learnsets", "metagross").learnset.dynamicpunch = ["8D"];
		this.modData("Learnsets", "metagross").learnset.amnesia = ["8M"];
		this.modData("Learnsets", "metagross").learnset.flash = ["8M"];
		this.modData("Learnsets", "metagross").learnset.futuresight = ["8M"];
		delete this.modData('Learnsets', 'metagross').learnset.toxic;
		// Regirock
		this.modData("Learnsets", "regirock").learnset.shoreup = ["8D"];
		delete this.modData('Learnsets', 'regirock').learnset.toxic;
		// Regice
		this.modData("Learnsets", "regice").learnset.glaciate = ["8D"];
		delete this.modData('Learnsets', 'regice').learnset.toxic;
		// Registeel
		this.modData("Learnsets", "registeel").learnset.metalburst = ["8D"];
		delete this.modData('Learnsets', 'registeel').learnset.toxic;
		// Latias
		this.modData("Learnsets", "latias").learnset.guardswap = ["8D"];
		this.modData("Learnsets", "latias").learnset.amnesia = ["8M"];
		this.modData("Learnsets", "latias").learnset.flash = ["8M"];
		delete this.modData('Learnsets', 'latias').learnset.toxic;
		// Latios
		this.modData("Learnsets", "latios").learnset.powerswap = ["8D"];
		this.modData("Learnsets", "latios").learnset.amnesia = ["8M"];
		this.modData("Learnsets", "latios").learnset.flash = ["8M"];
		delete this.modData('Learnsets', 'latios').learnset.toxic;
		// Kyogre
		this.modData("Learnsets", "kyogre").learnset.tidalwave = ["8D"];
		this.modData("Learnsets", "kyogre").learnset.bodypress = ["8M"];
		delete this.modData('Learnsets', 'kyogre').learnset.toxic;
		// Groudon
		this.modData("Learnsets", "groudon").learnset.landswrath = ["8D"];
		this.modData("Learnsets", "groudon").learnset.bodypress = ["8M"];
		delete this.modData('Learnsets', 'groudon').learnset.toxic;
		// Rayquaza
		this.modData("Learnsets", "rayquaza").learnset.dragonascent = ["8D"];
		this.modData("Learnsets", "rayquaza").learnset.crunch = ["8L1"];
		this.modData("Learnsets", "rayquaza").learnset.airslash = ["8L9"];
		this.modData("Learnsets", "rayquaza").learnset.hypervoice = ["8L27"];
		this.modData("Learnsets", "rayquaza").learnset.extremespeed = ["8L45"];
		this.modData("Learnsets", "rayquaza").learnset.meteorbeam = ["8T"];
		delete this.modData('Learnsets', 'rayquaza').learnset.toxic;
		// Jirachi
		this.modData("Learnsets", "jirachi").learnset.meteormash = ["8D"];
		this.modData("Learnsets", "jirachi").learnset.flash = ["8M"];
		this.modData("Learnsets", "jirachi").learnset.nightmare = ["8M"];
		delete this.modData('Learnsets', 'jirachi').learnset.toxic;
		// Deoxys Normal
		this.modData("Learnsets", "deoxys").learnset.refresh = ["8D"];
		this.modData("Learnsets", "deoxys").learnset.workup = ["8D"]; //Deoxys Attack
		this.modData("Learnsets", "deoxys").learnset.metalburst = ["8D"]; //Deoxys Defense
		this.modData("Learnsets", "deoxys").learnset.feint = ["8D"]; //Deoxys Speed
		this.modData("Learnsets", "deoxys").learnset.knockoff = ["8L19"];
		this.modData("Learnsets", "deoxys").learnset.zapcannon = ["8L55"];
		this.modData("Learnsets", "deoxys").learnset.teleport = ["8L13"];
		this.modData("Learnsets", "deoxys").learnset.doubleteam = ["8L37"];
		this.modData("Learnsets", "deoxys").learnset.barrier = ["8L55"];
		this.modData("Learnsets", "deoxys").learnset.flash = ["8M"];
		this.modData("Learnsets", "deoxys").learnset.meteorbeam = ["8T"];
		this.modData("Learnsets", "deoxys").learnset.nastyplot = ["8M"];
		this.modData("Learnsets", "deoxys").learnset.nightmare = ["8M"];
		this.modData("Learnsets", "deoxys").learnset.psychicterrain = ["8M"];
		delete this.modData('Learnsets', 'deoxys').learnset.irondefense;
		delete this.modData('Learnsets', 'deoxys').learnset.swift;
		// Turtwig
		this.modData("Learnsets", "turtwig").learnset.ingrain = ["8D"];
		this.modData("Learnsets", "turtwig").learnset.flash = ["8M"];
		this.modData("Learnsets", "turtwig").learnset.fullcollide = ["8M"];
		this.modData("Learnsets", "turtwig").learnset.naturalgift = ["8M"];
		delete this.modData('Learnsets', 'turtwig').learnset.toxic;
		// Grotle
		this.modData("Learnsets", "grotle").learnset.ingrain = ["8D"];
		this.modData("Learnsets", "grotle").learnset.bodypress = ["8M"];
		this.modData("Learnsets", "grotle").learnset.flash = ["8M"];
		this.modData("Learnsets", "grotle").learnset.fullcollide = ["8M"];
		this.modData("Learnsets", "grotle").learnset.naturalgift = ["8M"];
		delete this.modData('Learnsets', 'grotle').learnset.toxic;
		// Torterra
		this.modData("Learnsets", "torterra").learnset.landswrath = ["8D"];
		this.modData("Learnsets", "torterra").learnset.bodypress = ["8M"];
		this.modData("Learnsets", "torterra").learnset.chipaway = ["8M"];
		this.modData("Learnsets", "torterra").learnset.flash = ["8M"];
		this.modData("Learnsets", "torterra").learnset.fullcollide = ["8M"];
		this.modData("Learnsets", "torterra").learnset.naturalgift = ["8M"];
		delete this.modData('Learnsets', 'torterra').learnset.toxic;
		// Chimchar
		this.modData("Learnsets", "chimchar").learnset.preheat = ["8D"];
		this.modData("Learnsets", "chimchar").learnset.flash = ["8M"];
		delete this.modData('Learnsets', 'chimchar').learnset.toxic;
		// Monferno
		this.modData("Learnsets", "monferno").learnset.firelash = ["8D"];
		this.modData("Learnsets", "monferno").learnset.flash = ["8M"];
		delete this.modData('Learnsets', 'monferno').learnset.toxic;
		// Infernape
		this.modData("Learnsets", "infernape").learnset.firelash = ["8D"];
		this.modData("Learnsets", "infernape").learnset.flash = ["8M"];
		delete this.modData('Learnsets', 'infernape').learnset.toxic;
		// Piplup
		this.modData("Learnsets", "piplup").learnset.sheercold = ["8D"];
		delete this.modData('Learnsets', 'piplup').learnset.toxic;
		// Prinplup
		this.modData("Learnsets", "prinplup").learnset.sheercold = ["8D"];
		delete this.modData('Learnsets', 'prinplup').learnset.toxic;
		// Empoleon
		this.modData("Learnsets", "empoleon").learnset.sheercold = ["8D"];
		this.modData("Learnsets", "empoleon").learnset.steelbeam = ["8T"];
		delete this.modData('Learnsets', 'empoleon').learnset.toxic;
		// Starly
		this.modData("Learnsets", "starly").learnset.aircutter = ["8D"];
		delete this.modData('Learnsets', 'starly').learnset.toxic;
		// Staravia
		this.modData("Learnsets", "staravia").learnset.aircutter = ["8D"];
		delete this.modData('Learnsets', 'staravia').learnset.toxic;
		// Staraptor
		this.modData("Learnsets", "staraptor").learnset.skydrop = ["8D"];
		this.modData("Learnsets", "staraptor").learnset.hurricane = ["8M"];
		delete this.modData('Learnsets', 'staraptor').learnset.toxic;
		// Bidoof
		this.modData("Learnsets", "bidoof").learnset.captivate = ["8D"];
		this.modData("Learnsets", "bidoof").learnset.chipaway = ["8M"];
		delete this.modData('Learnsets', 'bidoof').learnset.toxic;
		// Bibarel
		this.modData("Learnsets", "bibarel").learnset.captivate = ["8D"];
		this.modData("Learnsets", "bibarel").learnset.chipaway = ["8M"];
		delete this.modData('Learnsets', 'bibarel').learnset.toxic;
		// Kricketot
		this.modData("Learnsets", "kricketot").learnset.perishsong = ["8D"];
		delete this.modData('Learnsets', 'kricketot').learnset.toxic;
		// Kricketune
		this.modData("Learnsets", "kricketune").learnset.risingchorus = ["8D"];
		this.modData("Learnsets", "kricketune").learnset.leechlife = ["8L14"];
		this.modData("Learnsets", "kricketune").learnset.vitaldrain = ["8M"];
		delete this.modData('Learnsets', 'kricketune').learnset.absorb;
		delete this.modData('Learnsets', 'kricketune').learnset.toxic;
		// Shinx
		this.modData("Learnsets", "shinx").learnset.assist = ["8D"];
		this.modData("Learnsets", "shinx").learnset.assurance = ["8M"];
		this.modData("Learnsets", "shinx").learnset.flash = ["8M"];
		delete this.modData('Learnsets', 'shinx').learnset.toxic;
		// Luxio
		this.modData("Learnsets", "luxio").learnset.assist = ["8D"];
		this.modData("Learnsets", "luxio").learnset.assurance = ["8M"];
		this.modData("Learnsets", "luxio").learnset.flash = ["8M"];
		delete this.modData('Learnsets', 'luxio').learnset.toxic;
		// Luxray
		this.modData("Learnsets", "luxray").learnset.assist = ["8D"];
		this.modData("Learnsets", "luxray").learnset.assurance = ["8M"];
		this.modData("Learnsets", "luxray").learnset.flash = ["8M"];
		delete this.modData('Learnsets', 'luxray').learnset.toxic;
		// Budew
		this.modData("Learnsets", "budew").learnset.tearfullook = ["8D"];
		this.modData("Learnsets", "budew").learnset.naturalgift = ["8M"];
		this.modData("Learnsets", "budew").learnset.lifedew = ["8E"];
		// Roserade
		this.modData("Learnsets", "roserade").learnset.captivate = ["8D"];
		this.modData("Learnsets", "roserade").learnset.naturalgift = ["8M"];
		this.modData("Learnsets", "roserade").learnset.lifedew = ["8L1"];
		// Cranidos
		this.modData("Learnsets", "cranidos").learnset.accelerock = ["8D"];
		this.modData("Learnsets", "cranidos").learnset.fullcollide = ["8M"];
		delete this.modData('Learnsets', 'cranidos').learnset.toxic;
		// Rampardos
		this.modData("Learnsets", "rampardos").learnset.accelerock = ["8D"];
		this.modData("Learnsets", "rampardos").learnset.breakingswipe = ["8M"];
		this.modData("Learnsets", "rampardos").learnset.fullcollide = ["8M"];
		delete this.modData('Learnsets', 'rampardos').learnset.toxic;
		// Shieldon
		this.modData("Learnsets", "shieldon").learnset.kingsshield = ["8D"];
		this.modData("Learnsets", "shieldon").learnset.fullcollide = ["8M"];
		delete this.modData('Learnsets', 'shieldon').learnset.toxic;
		// Bastiodon
		this.modData("Learnsets", "bastiodon").learnset.kingsshield = ["8D"];
		this.modData("Learnsets", "bastiodon").learnset.bodypress = ["8M"];
		this.modData("Learnsets", "bastiodon").learnset.fullcollide = ["8M"];
		this.modData("Learnsets", "bastiodon").learnset.steelbeam = ["8M"];
		delete this.modData('Learnsets', 'bastiodon').learnset.toxic;
		// Wormadam Plant
		this.modData("Learnsets", "wormadam").learnset.camouflage = ["8D"];
		this.modData("Learnsets", "wormadam").learnset.amnesia = ["8M"];
		this.modData("Learnsets", "wormadam").learnset.faketears = ["8M"];
		this.modData("Learnsets", "wormadam").learnset.grassyterrain = ["8M"];
		this.modData("Learnsets", "wormadam").learnset.leaftornado = ["8L26"];
		this.modData("Learnsets", "wormadam").learnset.naturalgift = ["8M"];
		this.modData("Learnsets", "wormadam").learnset.petaldance = ["8L1"];
		delete this.modData('Learnsets', 'wormadam').learnset.quiverdance;
		delete this.modData('Learnsets', 'wormadam').learnset.razorleaf;
		delete this.modData('Learnsets', 'wormadam').learnset.toxic;
		// Wormadam Sandy
		this.modData("Learnsets", "wormadamsandy").learnset.camouflage = ["8D"];
		this.modData("Learnsets", "wormadamsandy").learnset.amnesia = ["8M"];
		this.modData("Learnsets", "wormadamsandy").learnset.faketears = ["8M"];
		this.modData("Learnsets", "wormadamsandy").learnset.irondefense = ["8L29","8M"];
		this.modData("Learnsets", "wormadamsandy").learnset.naturalgift = ["8M"];
		this.modData("Learnsets", "wormadamsandy").learnset.sandtomb = ["8L26"];
		this.modData("Learnsets", "wormadamsandy").learnset.shoreup = ["8L1"];
		delete this.modData('Learnsets', 'wormadamsandy').learnset.harden;
		delete this.modData('Learnsets', 'wormadamsandy').learnset.quiverdance;
		delete this.modData('Learnsets', 'wormadamsandy').learnset.rockblast;
		delete this.modData('Learnsets', 'wormadamsandy').learnset.toxic;
		// Wormadam Trash
		this.modData("Learnsets", "wormadamtrash").learnset.camouflage = ["8D"];
		this.modData("Learnsets", "wormadamtrash").learnset.amnesia = ["8M"];
		this.modData("Learnsets", "wormadamtrash").learnset.faketears = ["8M"];
		this.modData("Learnsets", "wormadamtrash").learnset.naturalgift = ["8M"];
		delete this.modData('Learnsets', 'wormadamtrash').learnset.quiverdance;
		delete this.modData('Learnsets', 'wormadamtrash').learnset.toxic;
		// Mothim
		this.modData("Learnsets", "mothim").learnset.pollenpuff = ["8D"];
		this.modData("Learnsets", "mothim").learnset.naturalgift = ["8M"];
		delete this.modData('Learnsets', 'mothim').learnset.toxic;
		// Vespiquen
		this.modData("Learnsets", "vespiquen").learnset.instruct = ["8D"];
		this.modData("Learnsets", "vespiquen").learnset.flash = ["8M"];
		this.modData("Learnsets", "vespiquen").learnset.naturalgift = ["8M"];
		this.modData("Learnsets", "vespiquen").learnset.nightmare = ["8M"];
		// Pachirisu
		this.modData("Learnsets", "pachirisu").learnset.switcheroo = ["8D"];
		this.modData("Learnsets", "pachirisu").learnset.flash = ["8M"];
		this.modData("Learnsets", "pachirisu").learnset.stuffcheeks = ["8E"];
		delete this.modData('Learnsets', 'pachirisu').learnset.toxic;
		// Buizel
		this.modData("Learnsets", "buizel").learnset.slackoff = ["8D"];
		this.modData("Learnsets", "buizel").learnset.amnesia = ["8M"];
		this.modData("Learnsets", "buizel").learnset.charm = ["8M"];
		this.modData("Learnsets", "buizel").learnset.liquidation = ["8L48"];
		delete this.modData('Learnsets', 'buizel').learnset.toxic;
		// Floatzel
		this.modData("Learnsets", "floatzel").learnset.slackoff = ["8D"];
		this.modData("Learnsets", "floatzel").learnset.amnesia = ["8M"];
		this.modData("Learnsets", "floatzel").learnset.charm = ["8M"];
		this.modData("Learnsets", "floatzel").learnset.liquidation = ["8L63"];
		delete this.modData('Learnsets', 'floatzel').learnset.toxic;
		// Cherubi
		this.modData("Learnsets", "cherubi").learnset.happyhour = ["8D"];
		this.modData("Learnsets", "cherubi").learnset.flash = ["8M"];
		delete this.modData('Learnsets', 'cherubi').learnset.toxic;
		// Cherrim
		this.modData("Learnsets", "cherrim").learnset.happyhour = ["8D"];
		this.modData("Learnsets", "cherrim").learnset.flash = ["8M"];
		delete this.modData('Learnsets', 'cherrim').learnset.toxic;
		// Shellos
		this.modData("Learnsets", "shellos").learnset.slipaway = ["8D"];
		// Gastrodon
		this.modData("Learnsets", "gastrodon").learnset.slipaway = ["8D"];
		this.modData("Learnsets", "gastrodon").learnset.flash = ["8M"];
		// Ambipom
		this.modData("Learnsets", "ambipom").learnset.dualchop = ["8L1", "8M"];
		this.modData("Learnsets", "ambipom").learnset.swing = ["8D"];
		delete this.modData('Learnsets', 'ambipom').learnset.toxic;
		// Drifloon
		this.modData("Learnsets", "drifloon").learnset.snatch = ["8D"];
		this.modData("Learnsets", "drifloon").learnset.aerate = ["8L8"];
		this.modData("Learnsets", "drifloon").learnset.rebound = ["8L48"];
		delete this.modData('Learnsets', 'drifloon').learnset.gust;
		delete this.modData('Learnsets', 'drifloon').learnset.toxic;
		// Drifblim
		this.modData("Learnsets", "drifblim").learnset.snatch = ["8D"];
		this.modData("Learnsets", "drifblim").learnset.aerate = ["8L8"];
		this.modData("Learnsets", "drifblim").learnset.rebound = ["8L57"];
		delete this.modData('Learnsets', 'drifblim').learnset.gust;
		delete this.modData('Learnsets', 'drifblim').learnset.toxic;
		// Buneary
		this.modData("Learnsets", "buneary").learnset.followme = ["8D"];
		delete this.modData('Learnsets', 'buneary').learnset.toxic;
		// Lopunny
		this.modData("Learnsets", "lopunny").learnset.followme = ["8D"];
		delete this.modData('Learnsets', 'lopunny').learnset.toxic;
		// Mismagius
		this.modData("Learnsets", "mismagius").learnset.healblock = ["8D"];
		this.modData("Learnsets", "mismagius").learnset.flash = ["8M"];
		this.modData("Learnsets", "mismagius").learnset.nightmare = ["8M"];
		this.modData("Learnsets", "mismagius").learnset.poltergeist = ["8M"];
		delete this.modData('Learnsets', 'mismagius').learnset.toxic;
		// Honchkrow
		this.modData("Learnsets", "honchkrow").learnset.midnight = ["8D"];
		this.modData("Learnsets", "honchkrow").learnset.compensation = ["8M"];
		this.modData("Learnsets", "honchkrow").learnset.hex = ["8M"];
		this.modData("Learnsets", "honchkrow").learnset.nightmare = ["8M"];
		// Glameow
		this.modData("Learnsets", "glameow").learnset.agility = ["8D"];
		this.modData("Learnsets", "glameow").learnset.compensation = ["8M"];
		this.modData("Learnsets", "glameow").learnset.screech = ["8M"];
		delete this.modData('Learnsets', 'glameow').learnset.toxic;
		// Purugly
		this.modData("Learnsets", "purugly").learnset.bulkup = ["8D"];
		this.modData("Learnsets", "purugly").learnset.compensation = ["8M"];
		this.modData("Learnsets", "purugly").learnset.screech = ["8M"];
		delete this.modData('Learnsets', 'purugly').learnset.toxic;
		// Chingling
		this.modData("Learnsets", "chingling").learnset.mirrorcoat = ["8D"];
		this.modData("Learnsets", "chingling").learnset.flash = ["8M"];
		this.modData("Learnsets", "chingling").learnset.nightmare = ["8M"];
		delete this.modData('Learnsets', 'chingling').learnset.toxic;
		// Stunky
		this.modData("Learnsets", "stunky").learnset.playdead = ["8D"];
		this.modData("Learnsets", "stunky").learnset.nightmare = ["8M"];
		// Skuntank
		this.modData("Learnsets", "skuntank").learnset.playdead = ["8D"];
		this.modData("Learnsets", "skuntank").learnset.nightmare = ["8M"];
		// Bronzor
		this.modData("Learnsets", "bronzor").learnset.mirrorcoat = ["8D"];
		this.modData("Learnsets", "bronzor").learnset.flash = ["8M"];
		delete this.modData('Learnsets', 'bronzor').learnset.toxic;
		// Bronzong
		this.modData("Learnsets", "bronzong").learnset.healbell = ["8D"];
		this.modData("Learnsets", "bronzong").learnset.flash = ["8M"];
		delete this.modData('Learnsets', 'bronzong').learnset.toxic;
		// Bonsly
		this.modData("Learnsets", "bonsly").learnset.minimize = ["8D"];
		// Mime Jr.
		this.modData("Learnsets", "mimejr").learnset.followme = ["8D"];
		this.modData("Learnsets", "mimejr").learnset.nightmare = ["8M"];
		this.modData("Learnsets", "mimejr").learnset.wakeupslap = ["8L40"];
		delete this.modData('Learnsets', 'mimejr').learnset.suckerpunch;
		// Happiny
		this.modData("Learnsets", "happiny").learnset.happyhour = ["8D"];
		delete this.modData('Learnsets', 'happiny').learnset.rockclimb;
		delete this.modData('Learnsets', 'happiny').learnset.tantrum;
		delete this.modData('Learnsets', 'happiny').learnset.toxic;
		// Chatot
		this.modData("Learnsets", "chatot").learnset.pluck = ["8D"];
		this.modData("Learnsets", "chatot").learnset.hurricane = ["8M"];
		this.modData("Learnsets", "chatot").learnset.screech = ["8M"];
		delete this.modData('Learnsets', 'chatot').learnset.toxic;
		// Spiritomb
		this.modData("Learnsets", "spiritomb").learnset.healblock = ["8D"];
		this.modData("Learnsets", "spiritomb").learnset.compensation = ["8M"];
		this.modData("Learnsets", "spiritomb").learnset.flash = ["8M"];
		this.modData("Learnsets", "spiritomb").learnset.powergem = ["8M"];
		this.modData("Learnsets", "spiritomb").learnset.stasis = ["8T"];
		// Gible
		this.modData("Learnsets", "gible").learnset.crunch = ["8D"];
		delete this.modData('Learnsets', 'gible').learnset.toxic;
		// Gabite
		this.modData("Learnsets", "gabite").learnset.furycutter = ["8D"];
		delete this.modData('Learnsets', 'gabite').learnset.toxic;
		// Garchomp
		this.modData("Learnsets", "garchomp").learnset.fellswoop = ["8D"];
		delete this.modData('Learnsets', 'garchomp').learnset.toxic;
		// Munchlax
		this.modData("Learnsets", "munchlax").learnset.selfdestruct = ["8D"];
		// Riolu
		this.modData("Learnsets", "riolu").learnset.aurasphere = ["8D"];
		this.modData("Learnsets", "riolu").learnset.rollingkick = ["8E"];
		delete this.modData('Learnsets', 'riolu').learnset.magnetrise;
		delete this.modData('Learnsets', 'riolu').learnset.toxic;
		// Lucario
		this.modData("Learnsets", "lucario").learnset.eminence = ["8D"];
		delete this.modData('Learnsets', 'lucario').learnset.toxic;
		// Hippopotas
		this.modData("Learnsets", "hippopotas").learnset.rage = ["8D"];
		this.modData("Learnsets", "hippopotas").learnset.tussle = ["8E"];
		delete this.modData('Learnsets', 'hippopotas').learnset.toxic;
		// Hippowdon
		this.modData("Learnsets", "hippowdon").learnset.rage = ["8D"];
		delete this.modData('Learnsets', 'hippowdon').learnset.toxic;
		// Skorupi
		this.modData("Learnsets", "skorupi").learnset.crushclaw = ["8D"];
		// Drapion
		this.modData("Learnsets", "drapion").learnset.crushclaw = ["8D"];
		this.modData("Learnsets", "drapion").learnset.chipaway = ["8M"];
		this.modData("Learnsets", "drapion").learnset.vitaldrain = ["8M"];
		delete this.modData('Learnsets', 'drapion').learnset.leechlife;
		// Croagunk
		this.modData("Learnsets", "croagunk").learnset.poweruppunch = ["8D"];
		delete this.modData('Learnsets', 'croagunk').learnset.superfang;
		// Toxicroak
		this.modData("Learnsets", "toxicroak").learnset.fellstinger = ["8D"];
		delete this.modData('Learnsets', 'toxicroak').learnset.superfang;
		// Carnivine
		this.modData("Learnsets", "carnivine").learnset.frenzyplant = ["8D"];
		this.modData("Learnsets", "carnivine").learnset.wrap = ["8L1"];
		this.modData("Learnsets", "carnivine").learnset.bite = ["8L4"];
		this.modData("Learnsets", "carnivine").learnset.vinewhip = ["8L7"];
		this.modData("Learnsets", "carnivine").learnset.sweetscent = ["8L11"];
		this.modData("Learnsets", "carnivine").learnset.ingrain = ["8L14"];
		this.modData("Learnsets", "carnivine").learnset.vicegrip = ["8L17"];
		this.modData("Learnsets", "carnivine").learnset.razorleaf = ["8L21"];
		this.modData("Learnsets", "carnivine").learnset.leaftornado = ["8L24"];
		this.modData("Learnsets", "carnivine").learnset.feintattack = ["8L27"];
		this.modData("Learnsets", "carnivine").learnset.stockpile = ["8L31"];
		this.modData("Learnsets", "carnivine").learnset.spitup = ["8L31"];
		this.modData("Learnsets", "carnivine").learnset.swallow = ["8L31"];
		this.modData("Learnsets", "carnivine").learnset.crunch = ["8L34"];
		this.modData("Learnsets", "carnivine").learnset.wringout = ["8L37"];
		this.modData("Learnsets", "carnivine").learnset.snaptrap = ["8L41"];
		this.modData("Learnsets", "carnivine").learnset.powerwhip = ["8L44"];
		this.modData("Learnsets", "carnivine").learnset.jawlock = ["8L47"];
		this.modData("Learnsets", "carnivine").learnset.bind = ["8E"];
		this.modData("Learnsets", "carnivine").learnset.grassyterrain = ["8M"];
		this.modData("Learnsets", "carnivine").learnset.naturalgift = ["8M"];
		delete this.modData('Learnsets', 'carnivine').learnset.defog;
		delete this.modData('Learnsets', 'carnivine').learnset.toxic;
		// Finneon
		this.modData("Learnsets", "finneon").learnset.quiverdance = ["8D"];
		this.modData("Learnsets", "finneon").learnset.flash = ["8M"];
		delete this.modData('Learnsets', 'finneon').learnset.toxic;
		// Lumineon
		this.modData("Learnsets", "lumineon").learnset.quiverdance = ["8D"];
		this.modData("Learnsets", "lumineon").learnset.flash = ["8M"];
		this.modData("Learnsets", "lumineon").learnset.naturepower = ["8M"];
		delete this.modData('Learnsets', 'lumineon').learnset.toxic;
		// Mantyke
		this.modData("Learnsets", "mantyke").learnset.skydrop = ["8D"];
		this.modData("Learnsets", "mantyke").learnset.waterpulse = ["8L7","8M"];
		this.modData("Learnsets", "mantyke").learnset.bubblebeam = ["8L19"];
		delete this.modData('Learnsets', 'mantyke').learnset.toxic;
		// Snover
		this.modData("Learnsets", "snover").learnset.icehammer = ["8D"];
		delete this.modData('Learnsets', 'snover').learnset.toxic;
		// Abomasnow
		this.modData("Learnsets", "abomasnow").learnset.icehammer = ["8D"];
		delete this.modData('Learnsets', 'abomasnow').learnset.toxic;
		// Weavile
		this.modData("Learnsets", "weavile").learnset.razorwind = ["8D"];
		this.modData("Learnsets", "weavile").learnset.nightmare = ["8M"];
		delete this.modData('Learnsets', 'weavile').learnset.toxic;
		// Magnezone
		this.modData("Learnsets", "magnezone").learnset.electrify = ["8D"];
		this.modData("Learnsets", "magnezone").learnset.eerieimpulse = ["8M"];
		this.modData("Learnsets", "magnezone").learnset.flash = ["8M"];
		delete this.modData('Learnsets', 'magnezone').learnset.toxic;
		// Lickilicky
		this.modData("Learnsets", "lickilicky").learnset.soak = ["8D"];
		// Rhyperior
		this.modData("Learnsets", "rhyperior").learnset.headsmash = ["8D"];
		this.modData("Learnsets", "rhyperior").learnset.stomp = ["8L9"];
		this.modData("Learnsets", "rhyperior").learnset.tussle = ["8L17"];
		delete this.modData('Learnsets', 'rhyperior').learnset.toxic;
		// Tangrowth
		this.modData("Learnsets", "tangrowth").learnset.morningsun = ["8D"];
		this.modData("Learnsets", "tangrowth").learnset.amnesia = ["8M"];
		delete this.modData('Learnsets', 'tangrowth').learnset.toxic;
		// Electivire
		this.modData("Learnsets", "electivire").learnset.plasmafists = ["8D"];
		this.modData("Learnsets", "electivire").learnset.flash = ["8M"];
		delete this.modData('Learnsets', 'electivire').learnset.toxic;
		// Magmortar
		this.modData("Learnsets", "magmortar").learnset.searingshot = ["8D"];
		this.modData("Learnsets", "magmortar").learnset.napalm = ["8L69"];
		this.modData("Learnsets", "magmortar").learnset.amnesia = ["8M"];
		this.modData("Learnsets", "magmortar").learnset.flash = ["8M"];
		this.modData("Learnsets", "magmortar").learnset.flashcannon = ["8M"];
		this.modData("Learnsets", "magmortar").learnset.sludgebomb = ["8M"];
		delete this.modData('Learnsets', 'magmortar').learnset.toxic;
		// Togekiss
		this.modData("Learnsets", "togekiss").learnset.softboiled = ["8D"];
		this.modData("Learnsets", "togekiss").learnset.daydream = ["8L1"];
		this.modData("Learnsets", "togekiss").learnset.flash = ["8M"];
		this.modData("Learnsets", "togekiss").learnset.naturalgift = ["8M"];
		delete this.modData('Learnsets', 'togekiss').learnset.growl;
		delete this.modData('Learnsets', 'togekiss').learnset.toxic;
		// Yanmega
		this.modData("Learnsets", "yanmega").learnset.fellswoop = ["8D"];
		this.modData("Learnsets", "yanmega").learnset.bugcloud = ["8L1"];
		this.modData("Learnsets", "yanmega").learnset.fly = ["8M"];
		this.modData("Learnsets", "yanmega").learnset.vitaldrain = ["8M"];
		delete this.modData('Learnsets', 'yanmega').learnset.leechlife;
		delete this.modData('Learnsets', 'yanmega').learnset.toxic;
		// Leafeon
		this.modData("Learnsets", "leafeon").learnset.camouflage = ["8D"];
		this.modData("Learnsets", "leafeon").learnset.leafage = ["8L0"];
		this.modData("Learnsets", "leafeon").learnset.razorleaf = ["8L20"];
		this.modData("Learnsets", "leafeon").learnset.sunnyday = ["8L27","8M"];
		this.modData("Learnsets", "leafeon").learnset.leafblade = ["8L37"];
		this.modData("Learnsets", "leafeon").learnset.solarblade = ["8L45"];
		this.modData("Learnsets", "leafeon").learnset.naturalgift = ["8M"];
		delete this.modData('Learnsets', 'leafeon').learnset.magicalleaf;
		delete this.modData('Learnsets', 'leafeon').learnset.toxic;
		// Glaceon
		this.modData("Learnsets", "glaceon").learnset.spikyshield = ["8D"];
		this.modData("Learnsets", "glaceon").learnset.hail = ["8L25","8M"];
		this.modData("Learnsets", "glaceon").learnset.icebeam = ["8L37","8M"];
		delete this.modData('Learnsets', 'glaceon').learnset.iceshard;
		delete this.modData('Learnsets', 'glaceon').learnset.toxic;
		// Gliscor
		this.modData("Learnsets", "gliscor").learnset.skydrop = ["8D"];
		this.modData("Learnsets", "gliscor").learnset.breakingswipe = ["8M"];
		this.modData("Learnsets", "gliscor").learnset.lunge = ["8M"];
		// Mamoswine
		this.modData("Learnsets", "mamoswine").learnset.highhorsepower = ["8D"];
		this.modData("Learnsets", "mamoswine").learnset.doublehit = ["8L0"];
		this.modData("Learnsets", "mamoswine").learnset.tussle = ["8L18"];
		this.modData("Learnsets", "mamoswine").learnset.mudbomb = ["8L21"];
		this.modData("Learnsets", "mamoswine").learnset.hail = ["8L24","8M"];
		this.modData("Learnsets", "mamoswine").learnset.icefang = ["8L28"];
		this.modData("Learnsets", "mamoswine").learnset.takedown = ["8L33"];
		delete this.modData('Learnsets', 'mamoswine').learnset.toxic;
		// Porygon-Z
		this.modData("Learnsets", "porygonz").learnset.technoblast = ["8D"];
		this.modData("Learnsets", "porygonz").learnset.flash = ["8M"];
		this.modData("Learnsets", "porygonz").learnset.powergem = ["8M"];
		delete this.modData('Learnsets', 'porygonz').learnset.toxic;
		// Gallade
		this.modData("Learnsets", "gallade").learnset.sacredsword = ["8D"];
		this.modData("Learnsets", "gallade").learnset.confide = ["8L1"];
		this.modData("Learnsets", "gallade").learnset.confusion = ["8L1"];
		this.modData("Learnsets", "gallade").learnset.daydream = ["8L4"];
		this.modData("Learnsets", "gallade").learnset.flash = ["8M"];
		this.modData("Learnsets", "gallade").learnset.nightmare = ["8M"];
		delete this.modData('Learnsets', 'gallade').learnset.toxic;
		// Probopass
		this.modData("Learnsets", "probopass").learnset.electrify = ["8D"];
		this.modData("Learnsets", "probopass").learnset.bodypress = ["8M"];
		this.modData("Learnsets", "probopass").learnset.steelbeam = ["8M"];
		delete this.modData('Learnsets', 'probopass').learnset.toxic;
		// Dusknoir
		this.modData("Learnsets", "dusknoir").learnset.spectralthief = ["8D"];
		this.modData("Learnsets", "dusknoir").learnset.drainpunch = ["8M"];
		this.modData("Learnsets", "dusknoir").learnset.flash = ["8M"];
		this.modData("Learnsets", "dusknoir").learnset.midnight = ["8M"];
		this.modData("Learnsets", "dusknoir").learnset.nightmare = ["8M"];
		this.modData("Learnsets", "dusknoir").learnset.phantomforce = ["8M"];
		// Froslass
		this.modData("Learnsets", "froslass").learnset.sheercold = ["8D"];
		this.modData("Learnsets", "froslass").learnset.frostbreath = ["8L37","8M"];
		this.modData("Learnsets", "froslass").learnset.flash = ["8M"];
		this.modData("Learnsets", "froslass").learnset.nightmare = ["8M"];
		delete this.modData('Learnsets', 'froslass').learnset.toxic;
		delete this.modData('Learnsets', 'froslass').learnset.wakeupslap;
		// Rotom
		this.modData("Learnsets", "rotom").learnset.electrify = ["8D"];
		this.modData("Learnsets", "rotom").learnset.charge = ["8L1"];
		this.modData("Learnsets", "rotom").learnset.eerieimpulse = ["8L57","8M"];
		this.modData("Learnsets", "rotom").learnset.flash = ["8M"];
		delete this.modData('Learnsets', 'rotom').learnset.defog;
		delete this.modData('Learnsets', 'rotom').learnset.toxic;
		// Rotom Wash
		this.modData("Learnsets", "rotomwash").learnset.whirlpool = ["8D"];
		this.modData("Learnsets", "rotomwash").learnset.bubble = ["8L1"];
		this.modData("Learnsets", "rotomwash").learnset.bubblebeam = ["8L27"];
		this.modData("Learnsets", "rotomwash").learnset.flash = ["8M"];
		this.modData("Learnsets", "rotomwash").learnset.hex = ["8M"];
		this.modData("Learnsets", "rotomwash").learnset.hydropump = ["8R, 8M"];
		this.modData("Learnsets", "rotomwash").learnset.muddywater = ["8L50"];
		this.modData("Learnsets", "rotomwash").learnset.soak = ["8L1"];
		delete this.modData('Learnsets', 'rotomwash').learnset.astonish;
		delete this.modData('Learnsets', 'rotomwash').learnset.confuseray;
		delete this.modData('Learnsets', 'rotomwash').learnset.defog;
		delete this.modData('Learnsets', 'rotomwash').learnset.ominouswind;
		delete this.modData('Learnsets', 'rotomwash').learnset.toxic;
		// Rotom Heat
		this.modData("Learnsets", "rotomheat").learnset.firespin = ["8D"];
		this.modData("Learnsets", "rotomheat").learnset.ember = ["8L1"];
		this.modData("Learnsets", "rotomheat").learnset.flash = ["8M"];
		this.modData("Learnsets", "rotomheat").learnset.heatwave = ["8L50, 8M"];
		this.modData("Learnsets", "rotomheat").learnset.hex = ["8M"];
		this.modData("Learnsets", "rotomheat").learnset.incinerate = ["8L27, 8M"];
		this.modData("Learnsets", "rotomheat").learnset.overheat = ["8R, 8D"];
		this.modData("Learnsets", "rotomheat").learnset.preheat = ["8L1"];
		delete this.modData('Learnsets', 'rotomheat').learnset.astonish;
		delete this.modData('Learnsets', 'rotomheat').learnset.confuseray;
		delete this.modData('Learnsets', 'rotomheat').learnset.defog;
		delete this.modData('Learnsets', 'rotomheat').learnset.ominouswind;
		delete this.modData('Learnsets', 'rotomheat').learnset.toxic;
		// Rotom Frost
		this.modData("Learnsets", "rotomfrost").learnset.frostbreath = ["8D"];
		this.modData("Learnsets", "rotomfrost").learnset.blizzard = ["8R, 8M"];
		this.modData("Learnsets", "rotomfrost").learnset.flash = ["8M"];
		this.modData("Learnsets", "rotomfrost").learnset.freezedry = ["8L27"];
		this.modData("Learnsets", "rotomfrost").learnset.hail = ["8L1, 8M"];
		this.modData("Learnsets", "rotomfrost").learnset.hex = ["8M"];
		this.modData("Learnsets", "rotomfrost").learnset.icebeam = ["8L50, 8M"];
		this.modData("Learnsets", "rotomfrost").learnset.icywind = ["8L1"];
		delete this.modData('Learnsets', 'rotomfrost').learnset.astonish;
		delete this.modData('Learnsets', 'rotomfrost').learnset.confuseray;
		delete this.modData('Learnsets', 'rotomfrost').learnset.defog;
		delete this.modData('Learnsets', 'rotomfrost').learnset.ominouswind;
		delete this.modData('Learnsets', 'rotomfrost').learnset.toxic;
		// Rotom Fan
		this.modData("Learnsets", "rotomfan").learnset.rapidspin = ["8D"];
		this.modData("Learnsets", "rotomfan").learnset.aerate = ["8L27"];
		this.modData("Learnsets", "rotomfan").learnset.airslash = ["8L50"];
		this.modData("Learnsets", "rotomfan").learnset.defog = ["8L1, 8M"];
		this.modData("Learnsets", "rotomfan").learnset.flash = ["8M"];
		this.modData("Learnsets", "rotomfan").learnset.gust = ["8L1"];
		this.modData("Learnsets", "rotomfan").learnset.hex = ["8M"];
		this.modData("Learnsets", "rotomfan").learnset.hurricane = ["8R, 8M"];
		delete this.modData('Learnsets', 'rotomfan').learnset.astonish;
		delete this.modData('Learnsets', 'rotomfan').learnset.confuseray;
		delete this.modData('Learnsets', 'rotomfan').learnset.ominouswind;
		delete this.modData('Learnsets', 'rotomfan').learnset.toxic;
		// Rotom Mow
		this.modData("Learnsets", "rotommow").learnset.cut = ["8D"];
		this.modData("Learnsets", "rotommow").learnset.energyball = ["8L50, 8M"];
		this.modData("Learnsets", "rotommow").learnset.flash = ["8M"];
		this.modData("Learnsets", "rotommow").learnset.grassyterrain = ["8L1, 8M"];
		this.modData("Learnsets", "rotommow").learnset.leafstorm = ["8R"];
		this.modData("Learnsets", "rotommow").learnset.leaftornado = ["8L27"];
		this.modData("Learnsets", "rotommow").learnset.leafage = ["8L1"];
		this.modData("Learnsets", "rotommow").learnset.hex = ["8M"];
		delete this.modData('Learnsets', 'rotommow').learnset.astonish;
		delete this.modData('Learnsets', 'rotommow').learnset.confuseray;
		delete this.modData('Learnsets', 'rotommow').learnset.defog;
		delete this.modData('Learnsets', 'rotommow').learnset.ominouswind;
		delete this.modData('Learnsets', 'rotommow').learnset.toxic;
		// Uxie
		this.modData("Learnsets", "uxie").learnset.disable = ["8D"];
		this.modData("Learnsets", "uxie").learnset.flash = ["8M"];
		this.modData("Learnsets", "uxie").learnset.nightmare = ["8M"];
		this.modData("Learnsets", "uxie").learnset.powergem = ["8M"];
		delete this.modData('Learnsets', 'uxie').learnset.toxic;
		// Mesprit
		this.modData("Learnsets", "mesprit").learnset.heartswap = ["8D"];
		this.modData("Learnsets", "mesprit").learnset.calmmind = ["8L42", "8M"];
		this.modData("Learnsets", "mesprit").learnset.luckychant = ["8L56"];
		this.modData("Learnsets", "mesprit").learnset.charm = ["8M"];
		this.modData("Learnsets", "mesprit").learnset.flash = ["8M"];
		this.modData("Learnsets", "mesprit").learnset.nightmare = ["8M"];
		this.modData("Learnsets", "mesprit").learnset.powergem = ["8M"];
		delete this.modData('Learnsets', 'mesprit').learnset.toxic;
		// Azelf
		this.modData("Learnsets", "azelf").learnset.focusenergy = ["8D"];
		this.modData("Learnsets", "azelf").learnset.flash = ["8M"];
		this.modData("Learnsets", "azelf").learnset.nightmare = ["8M"];
		this.modData("Learnsets", "azelf").learnset.powergem = ["8M"];
		delete this.modData('Learnsets', 'azelf').learnset.toxic;
		// Dialga
		this.modData("Learnsets", "dialga").learnset.doomdesire = ["8D"];
		this.modData("Learnsets", "dialga").learnset.teleport = ["8L1"];
		this.modData("Learnsets", "dialga").learnset.metalburst = ["8L32"];
		this.modData("Learnsets", "dialga").learnset.flashcannon = ["8L64","8M"];
		this.modData("Learnsets", "dialga").learnset.flash = ["8M"];
		this.modData("Learnsets", "dialga").learnset.futuresight = ["8M"];
		this.modData("Learnsets", "dialga").learnset.screech = ["8M"];
		this.modData("Learnsets", "dialga").learnset.stasis = ["8T"];
		delete this.modData('Learnsets', 'dialga').learnset.toxic;
		// Palkia
		this.modData("Learnsets", "palkia").learnset.hyperspacehole = ["8D"];
		this.modData("Learnsets", "palkia").learnset.meteorbeam = ["8T"];
		this.modData("Learnsets", "palkia").learnset.screech = ["8M"];
		this.modData("Learnsets", "palkia").learnset.telekinesis = ["8M"];
		this.modData("Learnsets", "palkia").learnset.teleport = ["8L1"];
		delete this.modData('Learnsets', 'palkia').learnset.toxic;
		// Heatran
		this.modData("Learnsets", "heatran").learnset.eruption = ["8D"];
		delete this.modData('Learnsets', 'heatran').learnset.toxic;
		// Regigigas
		this.modData("Learnsets", "regigigas").learnset.storedpower = ["8D"];
		this.modData("Learnsets", "regigigas").learnset.chipaway = ["8M"];
		this.modData("Learnsets", "regigigas").learnset.poweruppunch = ["8L15"];
		delete this.modData('Learnsets', 'regigigas').learnset.toxic;
		// Giratina
		this.modData("Learnsets", "giratina").learnset.punishment = ["8D"];
		this.modData("Learnsets", "giratina").learnset.teleport = ["8L1"];
		this.modData("Learnsets", "giratina").learnset.scaryface = ["8L1"];
		this.modData("Learnsets", "giratina").learnset.shadowsneak = ["8L1"];
		this.modData("Learnsets", "giratina").learnset.dragonbreath = ["8L8"];
		this.modData("Learnsets", "giratina").learnset.ancientpower = ["8L16"];
		this.modData("Learnsets", "giratina").learnset.slash = ["8L24"];
		this.modData("Learnsets", "giratina").learnset.painsplit = ["8L32","8M"];
		this.modData("Learnsets", "giratina").learnset.dragonclaw = ["8L40","8M"];
		this.modData("Learnsets", "giratina").learnset.aurasphere = ["8L48"];
		this.modData("Learnsets", "giratina").learnset.destinybond = ["8L56"];
		this.modData("Learnsets", "giratina").learnset.shadowclaw = ["8L64","8M"];
		this.modData("Learnsets", "giratina").learnset.earthpower = ["8L72","8M"];
		this.modData("Learnsets", "giratina").learnset.shadowforce = ["8L80"];
		this.modData("Learnsets", "giratina").learnset.dragonhammer = ["8L88"];
		this.modData("Learnsets", "giratina").learnset.bodypress = ["8M"];
		this.modData("Learnsets", "giratina").learnset.midnight = ["8T"];
		this.modData("Learnsets", "giratina").learnset.nightmare = ["8M"];
		this.modData("Learnsets", "giratina").learnset.screech = ["8M"];
		delete this.modData('Learnsets', 'giratina').learnset.toxic;
		// Cresselia
		this.modData("Learnsets", "cresselia").learnset.lunarray = ["8D"];
		this.modData("Learnsets", "cresselia").learnset.amnesia = ["8M"];
		this.modData("Learnsets", "cresselia").learnset.flash = ["8M"];
		this.modData("Learnsets", "cresselia").learnset.meteorbeam = ["8T"];
		delete this.modData('Learnsets', 'cresselia').learnset.toxic;
		// Phione
		this.modData("Learnsets", "phione").learnset.lifedew = ["8D"];
		this.modData("Learnsets", "phione").learnset.amnesia = ["8M"];
		this.modData("Learnsets", "phione").learnset.powergem = ["8M"];
		delete this.modData('Learnsets', 'phione').learnset.toxic;
		// Manaphy
		this.modData("Learnsets", "manaphy").learnset.lifedew = ["8D"];
		this.modData("Learnsets", "manaphy").learnset.amnesia = ["8M"];
		this.modData("Learnsets", "manaphy").learnset.flash = ["8M"];
		this.modData("Learnsets", "manaphy").learnset.powergem = ["8M"];
		delete this.modData('Learnsets', 'manaphy').learnset.toxic;
		// Darkrai
		this.modData("Learnsets", "darkrai").learnset.fallenarrow = ["8D"];
		this.modData("Learnsets", "darkrai").learnset.compensation = ["8M"];
		this.modData("Learnsets", "darkrai").learnset.hex = ["8M"];
		this.modData("Learnsets", "darkrai").learnset.midnight = ["8T"];
		this.modData("Learnsets", "darkrai").learnset.phantomforce = ["8M"];
		delete this.modData('Learnsets', 'darkrai').learnset.flash;
		delete this.modData('Learnsets', 'darkrai').learnset.rockclimb;
		delete this.modData('Learnsets', 'darkrai').learnset.toxic;
		// Shaymin
		this.modData("Learnsets", "shaymin").learnset.cottonguard = ["8D"];
		this.modData("Learnsets", "shaymin").learnset.amnesia = ["8M"];
		this.modData("Learnsets", "shaymin").learnset.flash = ["8M"];
		this.modData("Learnsets", "shaymin").learnset.grassyterrain = ["8L1","8M"];
		// Shaymin Sky
		this.modData("Learnsets", "shayminsky").learnset.cottonspore = ["8D"];
		delete this.modData("Learnsets", "shayminsky").learnset.cottonguard;
		// Arceus
		this.modData("Learnsets", "arceus").learnset.eminence = ["8D"];
		this.modData("Learnsets", "arceus").learnset.ancientpower = ["8L20"];
		this.modData("Learnsets", "arceus").learnset.breakingswipe = ["8M"];
		this.modData("Learnsets", "arceus").learnset.earthpower = ["8M"];
		this.modData("Learnsets", "arceus").learnset.flash = ["8M"];
		this.modData("Learnsets", "arceus").learnset.hurricane = ["8M"];
		this.modData("Learnsets", "arceus").learnset.meteorbeam = ["8T"];
		this.modData("Learnsets", "arceus").learnset.nightmare = ["8M"];
		this.modData("Learnsets", "arceus").learnset.screech = ["8M"];
		this.modData("Learnsets", "arceus").learnset.stasis = ["8T"];
		this.modData("Learnsets", "arceus").learnset.steelbeam = ["8T"];
		this.modData("Learnsets", "arceus").learnset.superpower = ["8M"];
		this.modData("Learnsets", "arceus").learnset.blastburn = ["8E"];
		this.modData("Learnsets", "arceus").learnset.frenzyplant = ["8E"];
		this.modData("Learnsets", "arceus").learnset.hydrocannon = ["8E"];
		this.modData("Learnsets", "arceus").learnset.roaroftime = ["8E"];
		this.modData("Learnsets", "arceus").learnset.shadowforce = ["8E"];
		this.modData("Learnsets", "arceus").learnset.spacialrend = ["8E"];
		// Victini
		this.modData("Learnsets", "victini").learnset.vcreate = ["8D"];
		this.modData("Learnsets", "victini").learnset.flash = ["8M"];
		this.modData("Learnsets", "victini").learnset.napalm = ["8L1"];
		this.modData("Learnsets", "victini").learnset.blueflare = ["8E"];
		this.modData("Learnsets", "victini").learnset.boltstrike = ["8E"];
		// Snivy
		this.modData("Learnsets", "snivy").learnset.aromatherapy = ["8D"];
		this.modData("Learnsets", "snivy").learnset.flash = ["8M"];
		this.modData("Learnsets", "snivy").learnset.naturalgift = ["8M"];
		delete this.modData('Learnsets', 'snivy').learnset.defog;
		delete this.modData('Learnsets', 'snivy').learnset.toxic;
		// Servine
		this.modData("Learnsets", "servine").learnset.aromatherapy = ["8D"];
		this.modData("Learnsets", "servine").learnset.flash = ["8M"];
		this.modData("Learnsets", "servine").learnset.naturalgift = ["8M"];
		delete this.modData('Learnsets', 'servine').learnset.defog;
		delete this.modData('Learnsets', 'servine').learnset.toxic;
		// Serperior
		this.modData("Learnsets", "serperior").learnset.aromatherapy = ["8D"];
		this.modData("Learnsets", "serperior").learnset.powerwhip = ["8L1"];
		this.modData("Learnsets", "serperior").learnset.bind = ["8L1"];
		this.modData("Learnsets", "serperior").learnset.flash = ["8M"];
		this.modData("Learnsets", "serperior").learnset.naturalgift = ["8M"];
		delete this.modData('Learnsets', 'serperior').learnset.defog;
		delete this.modData('Learnsets', 'serperior').learnset.toxic;
		delete this.modData('Learnsets', 'serperior').learnset.wrap;
		// Tepig
		this.modData("Learnsets", "tepig").learnset.stomp = ["8D"];
		delete this.modData('Learnsets', 'tepig').learnset.toxic;
		// Pignite
		this.modData("Learnsets", "pignite").learnset.submission = ["8D"];
		this.modData("Learnsets", "pignite").learnset.bodypress = ["8M"];
		this.modData("Learnsets", "pignite").learnset.rockclimb = ["8M"];
		delete this.modData('Learnsets', 'pignite').learnset.toxic;
		// Emboar
		this.modData("Learnsets", "emboar").learnset.submission = ["8D"];
		this.modData("Learnsets", "emboar").learnset.bodypress = ["8M"];
		this.modData("Learnsets", "emboar").learnset.rockclimb = ["8M"];
		delete this.modData('Learnsets', 'emboar').learnset.toxic;
		// Oshawott
		this.modData("Learnsets", "oshawott").learnset.sacredsword = ["8D"];
		this.modData("Learnsets", "oshawott").learnset.swing = ["8L17"];
		this.modData("Learnsets", "oshawott").learnset.razorshell = ["8L23"];
		this.modData("Learnsets", "oshawott").learnset.waterpulse = ["8M"];
		this.modData("Learnsets", "oshawott").learnset.whirlpool = ["8M"];
		delete this.modData('Learnsets', 'oshawott').learnset.toxic;
		// Dewott
		this.modData("Learnsets", "dewott").learnset.sacredsword = ["8D"];
		this.modData("Learnsets", "dewott").learnset.swing = ["8L18"];
		this.modData("Learnsets", "dewott").learnset.razorshell = ["8L26"];
		this.modData("Learnsets", "dewott").learnset.waterpulse = ["8M"];
		this.modData("Learnsets", "dewott").learnset.whirlpool = ["8M"];
		delete this.modData('Learnsets', 'dewott').learnset.toxic;
		// Samurott
		this.modData("Learnsets", "samurott").learnset.sacredsword = ["8D"];
		this.modData("Learnsets", "samurott").learnset.fullcollide = ["8M"];
		this.modData("Learnsets", "samurott").learnset.swing = ["8L18"];
		this.modData("Learnsets", "samurott").learnset.razorshell = ["8L18"];
		this.modData("Learnsets", "samurott").learnset.waterpulse = ["8M"];
		this.modData("Learnsets", "samurott").learnset.whirlpool = ["8M"];
		delete this.modData('Learnsets', 'samurott').learnset.toxic;
		// Patrat
		this.modData("Learnsets", "patrat").learnset.stuffcheeks = ["8D"];
		this.modData("Learnsets", "patrat").learnset.dig = ["8M"];
		this.modData("Learnsets", "patrat").learnset.flash = ["8M"];
		delete this.modData('Learnsets', 'patrat').learnset.toxic;
		// Watchog
		this.modData("Learnsets", "watchog").learnset.obstruct = ["8D"];
		this.modData("Learnsets", "watchog").learnset.dig = ["8M"];
		this.modData("Learnsets", "watchog").learnset.flash = ["8M"];
		delete this.modData('Learnsets', 'watchog').learnset.toxic;
		// Lillipup
		this.modData("Learnsets", "lillipup").learnset.holdback = ["8D"];
		delete this.modData('Learnsets', 'lillipup').learnset.toxic;
		// Herdier
		this.modData("Learnsets", "herdier").learnset.holdback = ["8D"];
		delete this.modData('Learnsets', 'herdier').learnset.toxic;
		// Stoutland
		this.modData("Learnsets", "stoutland").learnset.holdback = ["8D"];
		this.modData("Learnsets", "stoutland").learnset.avalanche = ["8M"];
		this.modData("Learnsets", "stoutland").learnset.rockclimb = ["8M"];
		delete this.modData('Learnsets', 'stoutland').learnset.toxic;
		// Purrloin
		this.modData("Learnsets", "purrloin").learnset.partingshot = ["8D"];
		this.modData("Learnsets", "purrloin").learnset.doubleteam = ["8E"];
		this.modData("Learnsets", "purrloin").learnset.nightmare = ["8M"];
		delete this.modData('Learnsets', 'purrloin').learnset.toxic;
		// Liepard
		this.modData("Learnsets", "liepard").learnset.partingshot = ["8D"];
		this.modData("Learnsets", "liepard").learnset.nightmare = ["8M"];
		delete this.modData('Learnsets', 'liepard').learnset.toxic;
		// Pansage
		this.modData("Learnsets", "pansage").learnset.grasspledge = ["8D"];
		this.modData("Learnsets", "pansage").learnset.amnesia = ["8M"];
		this.modData("Learnsets", "pansage").learnset.screech = ["8M"];
		delete this.modData('Learnsets', 'pansage').learnset.toxic;
		// Simisage
		this.modData("Learnsets", "simisage").learnset.grasspledge = ["8D"];
		this.modData("Learnsets", "simisage").learnset.amnesia = ["8M"];
		this.modData("Learnsets", "simisage").learnset.screech = ["8M"];
		delete this.modData('Learnsets', 'simisage').learnset.toxic;
		// Pansear
		this.modData("Learnsets", "pansear").learnset.firepledge = ["8D"];
		this.modData("Learnsets", "pansear").learnset.flash = ["8M"];
		this.modData("Learnsets", "pansear").learnset.screech = ["8M"];
		delete this.modData('Learnsets', 'pansear').learnset.toxic;
		// Simisear
		this.modData("Learnsets", "simisear").learnset.firepledge = ["8D"];
		this.modData("Learnsets", "simisear").learnset.flash = ["8M"];
		this.modData("Learnsets", "simisear").learnset.screech = ["8M"];
		delete this.modData('Learnsets', 'simisear').learnset.toxic;
		// Panpour
		this.modData("Learnsets", "panpour").learnset.waterpledge = ["8D"];
		this.modData("Learnsets", "panpour").learnset.amnesia = ["8M"];
		this.modData("Learnsets", "panpour").learnset.screech = ["8M"];
		this.modData("Learnsets", "panpour").learnset.whirlpool = ["8M"];
		delete this.modData('Learnsets', 'panpour').learnset.toxic;
		// Simipour
		this.modData("Learnsets", "simipour").learnset.waterpledge = ["8D"];
		this.modData("Learnsets", "simipour").learnset.amnesia = ["8M"];
		this.modData("Learnsets", "simipour").learnset.screech = ["8M"];
		this.modData("Learnsets", "simipour").learnset.whirlpool = ["8M"];
		delete this.modData('Learnsets', 'simipour').learnset.toxic;
		// Munna
		this.modData("Learnsets", "munna").learnset.aromaticmist = ["8D"];
		this.modData("Learnsets", "munna").learnset.daydream = ["8E"];
		delete this.modData('Learnsets', 'munna').learnset.toxic;
		// Musharna
		this.modData("Learnsets", "musharna").learnset.strangesmoke = ["8D"];
		delete this.modData('Learnsets', 'musharna').learnset.toxic;
		// Pidove
		this.modData("Learnsets", "pidove").learnset.captivate = ["8D"];
		delete this.modData('Learnsets', 'pidove').learnset.toxic;
		// Tranquill
		this.modData("Learnsets", "tranquill").learnset.captivate = ["8D"];
		delete this.modData('Learnsets', 'tranquill').learnset.toxic;
		// Unfezant
		this.modData("Learnsets", "unfezant").learnset.captivate = ["8D"];
		delete this.modData('Learnsets', 'unfezant').learnset.toxic;
		// Blitzle
		this.modData("Learnsets", "blitzle").learnset.jumpkick = ["8D"];
		this.modData("Learnsets", "blitzle").learnset.flash = ["8M"];
		delete this.modData('Learnsets', 'blitzle').learnset.toxic;
		// Zebstrika
		this.modData("Learnsets", "zebstrika").learnset.volttackle = ["8D"];
		this.modData("Learnsets", "zebstrika").learnset.eerieimpulse = ["8M"];
		this.modData("Learnsets", "zebstrika").learnset.electricterrain = ["8M"];
		this.modData("Learnsets", "zebstrika").learnset.flash = ["8M"];
		delete this.modData('Learnsets', 'zebstrika').learnset.toxic;
		// Roggenrola
		this.modData("Learnsets", "roggenrola").learnset.mirrorshot = ["8D"];
		delete this.modData('Learnsets', 'roggenrola').learnset.meteorbeam;
		delete this.modData('Learnsets', 'roggenrola').learnset.toxic;
		// Boldore
		this.modData("Learnsets", "boldore").learnset.mirrorshot = ["8D"];
		this.modData("Learnsets", "boldore").learnset.rockclimb = ["8M"];
		delete this.modData('Learnsets', 'boldore').learnset.meteorbeam;
		delete this.modData('Learnsets', 'boldore').learnset.toxic;
		// Gigalith
		this.modData("Learnsets", "gigalith").learnset.diamondstorm = ["8D"];
		this.modData("Learnsets", "gigalith").learnset.rockclimb = ["8M"];
		delete this.modData('Learnsets', 'gigalith').learnset.meteorbeam;
		delete this.modData('Learnsets', 'gigalith').learnset.toxic;
		// Woobat
		this.modData("Learnsets", "woobat").learnset.pluck = ["8D"];
		delete this.modData('Learnsets', 'woobat').learnset.toxic;
		// Swoobat
		this.modData("Learnsets", "swoobat").learnset.pluck = ["8D"];
		delete this.modData('Learnsets', 'swoobat').learnset.toxic;
		// Drilbur
		this.modData("Learnsets", "drilbur").learnset.focusenergy = ["8D"];
		this.modData("Learnsets", "drilbur").learnset.chipaway = ["8M"];
		delete this.modData('Learnsets', 'drilbur').learnset.toxic;
		// Excadrill
		this.modData("Learnsets", "excadrill").learnset.focusenergy = ["8D"];
		this.modData("Learnsets", "excadrill").learnset.chipaway = ["8M"];
		this.modData("Learnsets", "excadrill").learnset.fullcollide = ["8M"];
		delete this.modData('Learnsets', 'excadrill').learnset.toxic;
		// Audino
		this.modData("Learnsets", "audino").learnset.acupressure = ["8D"];
		this.modData("Learnsets", "audino").learnset.confide = ["8L1"];
		this.modData("Learnsets", "audino").learnset.lifedew = ["8L21"];
		this.modData("Learnsets", "audino").learnset.attract = ["8M"];
		this.modData("Learnsets", "audino").learnset.charm = ["8M"];
		this.modData("Learnsets", "audino").learnset.naturalgift = ["8M"];
		delete this.modData('Learnsets', 'audino').learnset.growl;
		delete this.modData('Learnsets', 'audino').learnset.toxic;
		// Timburr
		this.modData("Learnsets", "timburr").learnset.woodhammer = ["8D"];
		this.modData("Learnsets", "timburr").learnset.swing = ["8L1"];
		delete this.modData('Learnsets', 'timburr').learnset.pound;
		delete this.modData('Learnsets', 'timburr').learnset.toxic;
		// Gurdurr
		this.modData("Learnsets", "gurdurr").learnset.steelbeam = ["8D"];
		this.modData("Learnsets", "gurdurr").learnset.swing = ["8L1"];
		delete this.modData('Learnsets', 'gurdurr').learnset.pound;
		delete this.modData('Learnsets', 'gurdurr').learnset.toxic;
		// Conkeldurr
		this.modData("Learnsets", "conkeldurr").learnset.rockwrecker = ["8D"];
		this.modData("Learnsets", "conkeldurr").learnset.swing = ["8L1"];
		delete this.modData('Learnsets', 'conkeldurr').learnset.pound;
		delete this.modData('Learnsets', 'conkeldurr').learnset.toxic;
		// Tympole
		this.modData("Learnsets", "tympole").learnset.boomburst = ["8D"];
		// Palpitoad
		this.modData("Learnsets", "palpitoad").learnset.boomburst = ["8D"];
		// Seismitoad
		this.modData("Learnsets", "seismitoad").learnset.boomburst = ["8D"];
		// Throh
		this.modData("Learnsets", "throh").learnset.smellingsalts = ["8D"];
		delete this.modData('Learnsets', 'throh').learnset.toxic;
		// Sawk
		this.modData("Learnsets", "sawk").learnset.smellingsalts = ["8D"];
		this.modData("Learnsets", "sawk").learnset.throatchop = ["8E"];
		delete this.modData('Learnsets', 'sawk').learnset.toxic;
		// Sewaddle
		this.modData("Learnsets", "sewaddle").learnset.teatime = ["8D"];
		this.modData("Learnsets", "sewaddle").learnset.amnesia = ["8M"];
		this.modData("Learnsets", "sewaddle").learnset.cut = ["8E"];
		this.modData("Learnsets", "sewaddle").learnset.faketears = ["8M"];
		this.modData("Learnsets", "sewaddle").learnset.naturalgift = ["8M"];
		delete this.modData('Learnsets', 'sewaddle').learnset.toxic;
		// Swadloon
		this.modData("Learnsets", "swadloon").learnset.teatime = ["8D"];
		this.modData("Learnsets", "swadloon").learnset.amnesia = ["8M"];
		this.modData("Learnsets", "swadloon").learnset.faketears = ["8M"];
		this.modData("Learnsets", "swadloon").learnset.naturalgift = ["8M"];
		delete this.modData('Learnsets', 'swadloon').learnset.toxic;
		// Leavanny
		this.modData("Learnsets", "leavanny").learnset.teatime = ["8D"];
		this.modData("Learnsets", "leavanny").learnset.amnesia = ["8M"];
		this.modData("Learnsets", "leavanny").learnset.faketears = ["8M"];
		this.modData("Learnsets", "leavanny").learnset.naturalgift = ["8M"];
		delete this.modData('Learnsets', 'leavanny').learnset.toxic;
		// Venipede
		this.modData("Learnsets", "venipede").learnset.flamecharge = ["8D"];
		this.modData("Learnsets", "venipede").learnset.assurance = ["8M"];
		// Whirlipede
		this.modData("Learnsets", "whirlipede").learnset.flamecharge = ["8D"];
		this.modData("Learnsets", "whirlipede").learnset.assurance = ["8M"];
		this.modData("Learnsets", "whirlipede").learnset.bodypress = ["8M"];
		this.modData("Learnsets", "whirlipede").learnset.fullcollide = ["8M"];
		// Scolipede
		this.modData("Learnsets", "scolipede").learnset.flamecharge = ["8D"];
		this.modData("Learnsets", "scolipede").learnset.assurance = ["8M"];
		this.modData("Learnsets", "scolipede").learnset.bodypress = ["8M"];
		this.modData("Learnsets", "scolipede").learnset.fullcollide = ["8M"];
		// Cottonee
		this.modData("Learnsets", "cottonee").learnset.minimize = ["8D"];
		delete this.modData('Learnsets', 'cottonee').learnset.grassyterrain;
		delete this.modData('Learnsets', 'cottonee').learnset.toxic;
		// Whimsicott
		this.modData("Learnsets", "whimsicott").learnset.minimize = ["8D"];
		this.modData("Learnsets", "whimsicott").learnset.aerate = ["8L1"];
		delete this.modData('Learnsets', 'whimsicott').learnset.grassyterrain;
		delete this.modData('Learnsets', 'whimsicott').learnset.gust;
		delete this.modData('Learnsets', 'whimsicott').learnset.toxic;
		// Petilil
		this.modData("Learnsets", "petilil").learnset.aromaticmist = ["8D"];
		this.modData("Learnsets", "petilil").learnset.faketears = ["8M"];
		delete this.modData('Learnsets', 'petilil').learnset.toxic;
		// Lilligant
		this.modData("Learnsets", "lilligant").learnset.aromaticmist = ["8D"];
		this.modData("Learnsets", "lilligant").learnset.faketears = ["8M"];
		delete this.modData('Learnsets', 'lilligant').learnset.toxic;
		// Basculin Red-Striped
		this.modData("Learnsets", "basculin").learnset.glare = ["8D"];
		this.modData("Learnsets", "basculin").learnset.compensation = ["8M"];
		this.modData("Learnsets", "basculin").learnset.submission = ["8L40"];
		this.modData("Learnsets", "basculin").learnset.finalgambit = ["8L44"];
		this.modData("Learnsets", "basculin").learnset.aquatail = ["8L48"];
		this.modData("Learnsets", "basculin").learnset.thrash = ["8L52"];
		this.modData("Learnsets", "basculin").learnset.doubleedge = ["8L56"];
		this.modData("Learnsets", "basculin").learnset.headsmash = ["8L60"];
		delete this.modData('Learnsets', 'basculin').learnset.toxic;
		// Basculin Blue-Striped
		this.modData("Learnsets", "basculinbluestriped").learnset.glare = ["8D"];
		this.modData("Learnsets", "basculinbluestriped").learnset.ironhead = ["8L40"];
		delete this.modData('Learnsets', 'basculinbluestriped').learnset.submission;
		delete this.modData('Learnsets', 'basculinbluestriped').learnset.toxic;
		// Sandile
		this.modData("Learnsets", "sandile").learnset.detect = ["8D"];
		this.modData("Learnsets", "sandile").learnset.jawlock = ["8E"];
		this.modData("Learnsets", "sandile").learnset.nastyplot = ["8M"];
		delete this.modData('Learnsets', 'sandile').learnset.toxic;
		// Krokorok
		this.modData("Learnsets", "krokorok").learnset.detect = ["8D"];
		this.modData("Learnsets", "krokorok").learnset.nastyplot = ["8M"];
		this.modData("Learnsets", "krokorok").learnset.nightmare = ["8M"];
		delete this.modData('Learnsets', 'krokorok').learnset.toxic;
		// Krookodile
		this.modData("Learnsets", "krookodile").learnset.detect = ["8D"];
		this.modData("Learnsets", "krookodile").learnset.jawlock = ["8L0"];
		this.modData("Learnsets", "krookodile").learnset.nastyplot = ["8M"];
		this.modData("Learnsets", "krookodile").learnset.nightmare = ["8M"];
		delete this.modData('Learnsets', 'krookodile').learnset.toxic;
		// Darumaka
		this.modData("Learnsets", "darumaka").learnset.selfdestruct = ["8D"];
		this.modData("Learnsets", "darumaka").learnset.meditate = ["8L1"];
		this.modData("Learnsets", "darumaka").learnset.megapunch = ["8E"];
		this.modData("Learnsets", "darumaka").learnset.psychup = ["8M"];
		this.modData("Learnsets", "darumaka").learnset.rockclimb = ["8M"];
		delete this.modData('Learnsets', 'darumaka').learnset.toxic;
		// Darumaka Galar
		this.modData("Learnsets", "darumakagalar").learnset.memento = ["8D"];
		this.modData("Learnsets", "darumakagalar").learnset.echoedvoice = ["8M"];
		this.modData("Learnsets", "darumakagalar").learnset.endeavor = ["8M"];
		this.modData("Learnsets", "darumakagalar").learnset.frostbreath = ["8M"];
		this.modData("Learnsets", "darumakagalar").learnset.meditate = ["8L1"];
		this.modData("Learnsets", "darumakagalar").learnset.megapunch = ["8E"];
		this.modData("Learnsets", "darumakagalar").learnset.powergem = ["8M"];
		this.modData("Learnsets", "darumakagalar").learnset.rockclimb = ["8M"];
		this.modData("Learnsets", "darumakagalar").learnset.rocksmash = ["8M"];
		this.modData("Learnsets", "darumakagalar").learnset.snatch = ["8M"];
		this.modData("Learnsets", "darumakagalar").learnset.strength = ["8M"];
		delete this.modData('Learnsets', 'darumakagalar').learnset.toxic;
		// Darmanitan
		this.modData("Learnsets", "darmanitan").learnset.vcreate = ["8D"];
		this.modData("Learnsets", "darmanitan").learnset.meditate = ["8L1"];
		this.modData("Learnsets", "darmanitan").learnset.psychup = ["8M"];
		this.modData("Learnsets", "darmanitan").learnset.rockclimb = ["8M"];
		delete this.modData('Learnsets', 'darmanitan').learnset.toxic;
		// Darmanitan Galar
		this.modData("Learnsets", "darmanitangalar").learnset.headcharge = ["8D"];
		this.modData("Learnsets", "darmanitangalar").learnset.echoedvoice = ["8M"];
		this.modData("Learnsets", "darmanitangalar").learnset.endeavor = ["8M"];
		this.modData("Learnsets", "darmanitangalar").learnset.frostbreath = ["8M"];
		this.modData("Learnsets", "darmanitangalar").learnset.meditate = ["8L1"];
		this.modData("Learnsets", "darmanitangalar").learnset.powergem = ["8M"];
		this.modData("Learnsets", "darmanitangalar").learnset.rockclimb = ["8M"];
		this.modData("Learnsets", "darmanitangalar").learnset.rocksmash = ["8M"];
		this.modData("Learnsets", "darmanitangalar").learnset.snatch = ["8M"];
		this.modData("Learnsets", "darmanitangalar").learnset.snowtumble = ["8L0"];
		this.modData("Learnsets", "darmanitangalar").learnset.strength = ["8M"];
		delete this.modData('Learnsets', 'darmanitangalar').learnset.iciclecrash;
		delete this.modData('Learnsets', 'darmanitangalar').learnset.toxic;
		// Maractus
		this.modData("Learnsets", "maractus").learnset.weatherball = ["8D"];
		this.modData("Learnsets", "maractus").learnset.naturalgift = ["8M"];
		delete this.modData('Learnsets', 'maractus').learnset.grassyterrain;
		delete this.modData('Learnsets', 'maractus').learnset.toxic;
		// Dwebble
		this.modData("Learnsets", "dwebble").learnset.crabhammer = ["8D"];
		this.modData("Learnsets", "dwebble").learnset.fullcollide = ["8M"];
		this.modData("Learnsets", "dwebble").learnset.rockclimb = ["8M"];
		delete this.modData('Learnsets', 'dwebble').learnset.toxic;
		// Crustle
		this.modData("Learnsets", "crustle").learnset.crabhammer = ["8D"];
		this.modData("Learnsets", "crustle").learnset.fullcollide = ["8M"];
		this.modData("Learnsets", "crustle").learnset.rockclimb = ["8M"];
		delete this.modData('Learnsets', 'crustle').learnset.meteorbeam;
		delete this.modData('Learnsets', 'crustle').learnset.toxic;
		// Scraggy
		this.modData("Learnsets", "scraggy").learnset.powertrip = ["8D"];
		delete this.modData('Learnsets', 'scraggy').learnset.toxic;
		// Scrafty
		this.modData("Learnsets", "scrafty").learnset.powertrip = ["8D"];
		delete this.modData('Learnsets', 'scrafty').learnset.toxic;
		// Sigilyph
		this.modData("Learnsets", "sigilyph").learnset.speedswap = ["8D"];
		this.modData("Learnsets", "sigilyph").learnset.flash = ["8M"];
		this.modData("Learnsets", "sigilyph").learnset.nightmare = ["8M"];
		delete this.modData('Learnsets', 'sigilyph').learnset.toxic;
		// Yamask
		this.modData("Learnsets", "yamask").learnset.tearfullook = ["8D"];
		this.modData("Learnsets", "yamask").learnset.flash = ["8M"];
		delete this.modData('Learnsets', 'yamask').learnset.toxic;
		// Yamask Galar
		this.modData("Learnsets", "yamaskgalar").learnset.tearfullook = ["8D"];
		this.modData("Learnsets", "yamaskgalar").learnset.craftyshield = ["8E"];
		this.modData("Learnsets", "yamaskgalar").learnset.nightmare = ["8E","8M"];
		delete this.modData('Learnsets', 'yamaskgalar').learnset.toxic;
		// Cofagrigus
		this.modData("Learnsets", "cofagrigus").learnset.metalburst = ["8D"];
		this.modData("Learnsets", "cofagrigus").learnset.flash = ["8M"];
		delete this.modData('Learnsets', 'cofagrigus').learnset.toxic;
		// Tirtouga
		this.modData("Learnsets", "tirtouga").learnset.razorshell = ["8D"];
		this.modData("Learnsets", "tirtouga").learnset.whitewater = ["8L1"];
		this.modData("Learnsets", "tirtouga").learnset.liquidation = ["8L50"];
		this.modData("Learnsets", "tirtouga").learnset.hydropump = ["8M"];
		this.modData("Learnsets", "tirtouga").learnset.fullcollide = ["8M"];
		delete this.modData('Learnsets', 'tirtouga').learnset.watergun;
		delete this.modData('Learnsets', 'tirtouga').learnset.toxic;
		// Carracosta
		this.modData("Learnsets", "carracosta").learnset.razorshell = ["8D"];
		this.modData("Learnsets", "carracosta").learnset.whitewater = ["8L1"];
		this.modData("Learnsets", "carracosta").learnset.liquidation = ["8L61"];
		this.modData("Learnsets", "carracosta").learnset.hydropump = ["8M"];
		this.modData("Learnsets", "carracosta").learnset.fullcollide = ["8M"];
		delete this.modData('Learnsets', 'carracosta').learnset.watergun;
		delete this.modData('Learnsets', 'carracosta').learnset.toxic;
		// Archen
		this.modData("Learnsets", "archen").learnset.aurasphere = ["8D"];
		this.modData("Learnsets", "archen").learnset.fellswoop = ["8L48"];
		this.modData("Learnsets", "archen").learnset.dragonclaw = ["8M"];
		delete this.modData('Learnsets', 'archen').learnset.toxic;
		// Archeops
		this.modData("Learnsets", "archeops").learnset.aurasphere = ["8D"];
		this.modData("Learnsets", "archeops").learnset.fellswoop = ["8L56"];
		this.modData("Learnsets", "archeops").learnset.dragonclaw = ["8M"];
		delete this.modData('Learnsets', 'archeops').learnset.toxic;
		// Trubbish
		this.modData("Learnsets", "trubbish").learnset.bide = ["8D"];
		// Garbodor
		this.modData("Learnsets", "garbodor").learnset.irontail = ["8D"];
		// Zorua
		this.modData("Learnsets", "zorua").learnset.doubleteam = ["8D"];
		this.modData("Learnsets", "zorua").learnset.hex = ["8M"];
		this.modData("Learnsets", "zorua").learnset.nightmare = ["8M"];
		// Zoroark
		this.modData("Learnsets", "zoroark").learnset.doubleteam = ["8D"];
		this.modData("Learnsets", "zoroark").learnset.hex = ["8M"];
		this.modData("Learnsets", "zoroark").learnset.midnight = ["8T"];
		this.modData("Learnsets", "zoroark").learnset.nightmare = ["8M"];
		// Minccino
		this.modData("Learnsets", "minccino").learnset.assist = ["8D"];
		delete this.modData('Learnsets', 'minccino').learnset.toxic;
		// Cinccino
		this.modData("Learnsets", "cinccino").learnset.assist = ["8D"];
		this.modData("Learnsets", "cinccino").learnset.covet = ["8L1"];
		this.modData("Learnsets", "cinccino").learnset.sweetkiss = ["8L1"];
		delete this.modData('Learnsets', 'cinccino').learnset.bulletseed;
		delete this.modData('Learnsets', 'cinccino').learnset.rockblast;
		delete this.modData('Learnsets', 'cinccino').learnset.toxic;
		// Gothita
		this.modData("Learnsets", "gothita").learnset.wish = ["8D"];
		this.modData("Learnsets", "gothita").learnset.confide = ["8E"];
		this.modData("Learnsets", "gothita").learnset.flash = ["8M"];
		this.modData("Learnsets", "gothita").learnset.nightmare = ["8M"];
		delete this.modData('Learnsets', 'gothita').learnset.toxic;
		// Gothorita
		this.modData("Learnsets", "gothorita").learnset.wish = ["8D"];
		this.modData("Learnsets", "gothorita").learnset.flash = ["8M"];
		this.modData("Learnsets", "gothorita").learnset.nightmare = ["8M"];
		delete this.modData('Learnsets', 'gothorita').learnset.toxic;
		// Gothitelle
		this.modData("Learnsets", "gothitelle").learnset.doomdesire = ["8D"];
		this.modData("Learnsets", "gothitelle").learnset.flash = ["8M"];
		this.modData("Learnsets", "gothitelle").learnset.nightmare = ["8M"];
		delete this.modData('Learnsets', 'gothitelle').learnset.toxic;
		// Solosis
		this.modData("Learnsets", "solosis").learnset.aquaring = ["8D"];
		this.modData("Learnsets", "solosis").learnset.flash = ["8M"];
		this.modData("Learnsets", "solosis").learnset.nightmare = ["8M"];
		delete this.modData('Learnsets', 'solosis').learnset.toxic;
		// Duosion
		this.modData("Learnsets", "duosion").learnset.aquaring = ["8D"];
		this.modData("Learnsets", "duosion").learnset.flash = ["8M"];
		this.modData("Learnsets", "duosion").learnset.nightmare = ["8M"];
		delete this.modData('Learnsets', 'duosion').learnset.toxic;
		// Reuniclus
		this.modData("Learnsets", "reuniclus").learnset.aquaring = ["8D"];
		this.modData("Learnsets", "reuniclus").learnset.flash = ["8M"];
		this.modData("Learnsets", "reuniclus").learnset.nightmare = ["8M"];
		delete this.modData('Learnsets', 'reuniclus').learnset.toxic;
		// Ducklett
		this.modData("Learnsets", "ducklett").learnset.entrainment = ["8D"];
		this.modData("Learnsets", "ducklett").learnset.screech = ["8M"];
		this.modData("Learnsets", "ducklett").learnset.whirlpool = ["8M"];
		delete this.modData('Learnsets', 'ducklett').learnset.toxic;
		// Swanna
		this.modData("Learnsets", "swanna").learnset.entrainment = ["8D"];
		this.modData("Learnsets", "swanna").learnset.charm = ["8M"];
		this.modData("Learnsets", "swanna").learnset.screech = ["8M"];
		this.modData("Learnsets", "swanna").learnset.whirlpool = ["8M"];
		delete this.modData('Learnsets', 'swanna').learnset.toxic;
		// Vanillite
		this.modData("Learnsets", "vanillite").learnset.iciclecrash = ["8D"];
		delete this.modData('Learnsets', 'vanillite').learnset.toxic;
		// Vanillish
		this.modData("Learnsets", "vanillish").learnset.iciclecrash = ["8D"];
		delete this.modData('Learnsets', 'vanillish').learnset.toxic;
		// Vanilluxe
		this.modData("Learnsets", "vanilluxe").learnset.glaciate = ["8D"];
		delete this.modData('Learnsets', 'vanilluxe').learnset.toxic;
		// Deerling
		this.modData("Learnsets", "deerling").learnset.weatherball = ["8D"];
		this.modData("Learnsets", "deerling").learnset.flash = ["8M"];
		delete this.modData('Learnsets', 'deerling').learnset.toxic;
		// Sawsbuck
		this.modData("Learnsets", "sawsbuck").learnset.weatherball = ["8D"];
		this.modData("Learnsets", "sawsbuck").learnset.grassyterrain = ["8M"];
		this.modData("Learnsets", "sawsbuck").learnset.flash = ["8M"];
		delete this.modData('Learnsets', 'sawsbuck').learnset.toxic;
		// Emolga
		this.modData("Learnsets", "emolga").learnset.paraboliccharge = ["8D"];
		this.modData("Learnsets", "emolga").learnset.flash = ["8M"];
		this.modData("Learnsets", "emolga").learnset.stuffcheeks = ["8E"];
		delete this.modData('Learnsets', 'emolga').learnset.toxic;
		// Karrablast
		this.modData("Learnsets", "karrablast").learnset.smartstrike = ["8D"];
		this.modData("Learnsets", "karrablast").learnset.chipaway = ["8M"];
		delete this.modData('Learnsets', 'karrablast').learnset.toxic;
		// Escavalier
		this.modData("Learnsets", "escavalier").learnset.meteorassault = ["8D"];
		this.modData("Learnsets", "escavalier").learnset.chipaway = ["8M"];
		this.modData("Learnsets", "escavalier").learnset.fullcollide = ["8M"];
		delete this.modData('Learnsets', 'escavalier').learnset.toxic;
		// Foongus
		this.modData("Learnsets", "foongus").learnset.copycat = ["8D"];
		this.modData("Learnsets", "foongus").learnset.recover = ["8L35"];
		delete this.modData('Learnsets', 'foongus').learnset.synthesis;
		// Amoonguss
		this.modData("Learnsets", "amoonguss").learnset.copycat = ["8D"];
		this.modData("Learnsets", "amoonguss").learnset.recover = ["8L35"];
		delete this.modData('Learnsets', 'amoonguss').learnset.grassyterrain;
		delete this.modData('Learnsets', 'amoonguss').learnset.synthesis;
		// Frillish
		this.modData("Learnsets", "frillish").learnset.quash = ["8D"];
		delete this.modData('Learnsets', 'frillish').learnset.poltergeist;
		delete this.modData('Learnsets', 'frillish').learnset.toxic;
		// Jellicent
		this.modData("Learnsets", "jellicent").learnset.quash = ["8D"];
		delete this.modData('Learnsets', 'jellicent').learnset.poltergeist;
		delete this.modData('Learnsets', 'jellicent').learnset.toxic;
		// Alomomola
		this.modData("Learnsets", "alomomola").learnset.heartswap = ["8D"];
		this.modData("Learnsets", "alomomola").learnset.amnesia = ["8M"];
		this.modData("Learnsets", "alomomola").learnset.charm = ["8M"];
		delete this.modData('Learnsets', 'alomomola').learnset.toxic;
		// Joltik
		this.modData("Learnsets", "joltik").learnset.zingzap = ["8D"];
		this.modData("Learnsets", "joltik").learnset.leechlife = ["8L1"];
		this.modData("Learnsets", "joltik").learnset.flash = ["8M"];
		this.modData("Learnsets", "joltik").learnset.vitaldrain = ["8M"];
		delete this.modData('Learnsets', 'joltik').learnset.absorb;
		delete this.modData('Learnsets', 'joltik').learnset.toxic;
		// Galvantula
		this.modData("Learnsets", "galvantula").learnset.zingzap = ["8D"];
		this.modData("Learnsets", "galvantula").learnset.leechlife = ["8L1"];
		this.modData("Learnsets", "galvantula").learnset.flash = ["8M"];
		this.modData("Learnsets", "galvantula").learnset.vitaldrain = ["8M"];
		delete this.modData('Learnsets', 'galvantula').learnset.absorb;
		delete this.modData('Learnsets', 'galvantula').learnset.toxic;
		// Ferroseed
		this.modData("Learnsets", "ferroseed").learnset.spikyshield = ["8D"];
		this.modData("Learnsets", "ferroseed").learnset.flash = ["8M"];
		this.modData("Learnsets", "ferroseed").learnset.fullcollide = ["8M"];
		delete this.modData('Learnsets', 'ferroseed').learnset.toxic;
		// Ferrothorn
		this.modData("Learnsets", "ferrothorn").learnset.spikyshield = ["8D"];
		this.modData("Learnsets", "ferrothorn").learnset.flash = ["8M"];
		this.modData("Learnsets", "ferrothorn").learnset.fullcollide = ["8M"];
		delete this.modData('Learnsets', 'ferrothorn').learnset.toxic;
		// Klink
		this.modData("Learnsets", "klink").learnset.magnetbomb = ["8D"];
		delete this.modData('Learnsets', 'klink').learnset.toxic;
		// Klang
		this.modData("Learnsets", "klang").learnset.magnetbomb = ["8D"];
		delete this.modData('Learnsets', 'klang').learnset.toxic;
		// Klinklang
		this.modData("Learnsets", "klinklang").learnset.magnetbomb = ["8D"];
		delete this.modData('Learnsets', 'klinklang').learnset.toxic;
		// Eelektrik
		this.modData("Learnsets", "eelektrik").learnset.thunderfang = ["8D"];
		this.modData("Learnsets", "eelektrik").learnset.brine = ["8M"];
		this.modData("Learnsets", "eelektrik").learnset.dive = ["8M"];
		this.modData("Learnsets", "eelektrik").learnset.eerieimpulse = ["8M"];
		this.modData("Learnsets", "eelektrik").learnset.flash = ["8M"];
		this.modData("Learnsets", "eelektrik").learnset.leechlife = ["8M"];
		this.modData("Learnsets", "eelektrik").learnset.surf = ["8M"];
		delete this.modData('Learnsets', 'eelektrik').learnset.toxic;
		// Eelektross
		this.modData("Learnsets", "eelektross").learnset.thunderfang = ["8D"];
		this.modData("Learnsets", "eelektross").learnset.brine = ["8M"];
		this.modData("Learnsets", "eelektross").learnset.dive = ["8M"];
		this.modData("Learnsets", "eelektross").learnset.eerieimpulse = ["8M"];
		this.modData("Learnsets", "eelektross").learnset.flash = ["8M"];
		this.modData("Learnsets", "eelektross").learnset.leechlife = ["8M"];
		this.modData("Learnsets", "eelektross").learnset.surf = ["8M"];
		this.modData("Learnsets", "eelektross").learnset.thunderpunch = ["8M"];
		delete this.modData('Learnsets', 'eelektross').learnset.toxic;
		// Elgyem
		this.modData("Learnsets", "elgyem").learnset.confuseray = ["8D"];
		this.modData("Learnsets", "elgyem").learnset.flash = ["8M"];
		this.modData("Learnsets", "elgyem").learnset.mindbend = ["8L1"];
		this.modData("Learnsets", "elgyem").learnset.nightmare = ["8M"];
		this.modData("Learnsets", "elgyem").learnset.powergem = ["8M"];
		this.modData("Learnsets", "elgyem").learnset.stasis = ["8M"];
		delete this.modData('Learnsets', 'elgyem').learnset.toxic;
		// Beheeyem
		this.modData("Learnsets", "beheeyem").learnset.psychoboost = ["8D"];
		this.modData("Learnsets", "beheeyem").learnset.flash = ["8M"];
		this.modData("Learnsets", "beheeyem").learnset.mindbend = ["8L1"];
		this.modData("Learnsets", "beheeyem").learnset.nightmare = ["8M"];
		this.modData("Learnsets", "beheeyem").learnset.powergem = ["8M"];
		this.modData("Learnsets", "beheeyem").learnset.stasis = ["8M"];
		delete this.modData('Learnsets', 'beheeyem').learnset.toxic;
		// Litwick
		this.modData("Learnsets", "litwick").learnset.sweetscent = ["8D"];
		this.modData("Learnsets", "litwick").learnset.flash = ["8M"];
		this.modData("Learnsets", "litwick").learnset.mysticalfire = ["8E"];
		this.modData("Learnsets", "litwick").learnset.nightmare = ["8M"];
		delete this.modData('Learnsets', 'litwick').learnset.poltergeist;
		delete this.modData('Learnsets', 'litwick').learnset.toxic;
		// Lampent
		this.modData("Learnsets", "lampent").learnset.sweetscent = ["8D"];
		this.modData("Learnsets", "lampent").learnset.flash = ["8M"];
		this.modData("Learnsets", "lampent").learnset.nightmare = ["8M"];
		delete this.modData('Learnsets', 'lampent').learnset.poltergeist;
		delete this.modData('Learnsets', 'lampent').learnset.toxic;
		// Chandelure
		this.modData("Learnsets", "chandelure").learnset.sweetscent = ["8D"];
		this.modData("Learnsets", "chandelure").learnset.flash = ["8M"];
		this.modData("Learnsets", "chandelure").learnset.nightmare = ["8M"];
		delete this.modData('Learnsets', 'chandelure').learnset.poltergeist;
		delete this.modData('Learnsets', 'chandelure').learnset.toxic;
		// Axew
		this.modData("Learnsets", "axew").learnset.metalclaw = ["8D"];
		this.modData("Learnsets", "axew").learnset.cut = ["8E"];
		delete this.modData('Learnsets', 'axew').learnset.toxic;
		// Fraxure
		this.modData("Learnsets", "fraxure").learnset.metalclaw = ["8D"];
		this.modData("Learnsets", "fraxure").learnset.rockclimb = ["8M"];
		delete this.modData('Learnsets', 'fraxure').learnset.toxic;
		// Haxorus
		this.modData("Learnsets", "haxorus").learnset.metalclaw = ["8D"];
		this.modData("Learnsets", "haxorus").learnset.rockclimb = ["8M"];
		delete this.modData('Learnsets', 'haxorus').learnset.toxic;
		// Cubchoo
		this.modData("Learnsets", "cubchoo").learnset.snowtumble = ["8D"];
		delete this.modData('Learnsets', 'cubchoo').learnset.toxic;
		// Beartic
		this.modData("Learnsets", "beartic").learnset.snowtumble = ["8D"];
		this.modData("Learnsets", "beartic").learnset.freezetest = ["8L1"];
		delete this.modData('Learnsets', 'beartic').learnset.toxic;
		// Cryogonal
		this.modData("Learnsets", "cryogonal").learnset.mirrorshot = ["8D"];
		this.modData("Learnsets", "cryogonal").learnset.nastyplot = ["8M"];
		delete this.modData('Learnsets', 'cryogonal').learnset.attract;
		delete this.modData('Learnsets', 'cryogonal').learnset.toxic;
		// Shelmet
		this.modData("Learnsets", "shelmet").learnset.clamp = ["8D"];
		this.modData("Learnsets", "shelmet").learnset.withdraw = ["8L1"];
		this.modData("Learnsets", "shelmet").learnset.leechlife = ["8L1"];
		this.modData("Learnsets", "shelmet").learnset.vitaldrain = ["8M"];
		delete this.modData('Learnsets', 'shelmet').learnset.absorb;
		delete this.modData('Learnsets', 'shelmet').learnset.toxic;
		// Accelgor
		this.modData("Learnsets", "accelgor").learnset.ragepowder = ["8D"];
		this.modData("Learnsets", "accelgor").learnset.leechlife = ["8L1"];
		this.modData("Learnsets", "accelgor").learnset.stringshot = ["8M"];
		this.modData("Learnsets", "accelgor").learnset.vitaldrain = ["8M"];
		delete this.modData('Learnsets', 'accelgor').learnset.absorb;
		// Stunfisk
		this.modData("Learnsets", "stunfisk").learnset.counter = ["8D"];
		this.modData("Learnsets", "stunfisk").learnset.flash = ["8M"];
		delete this.modData('Learnsets', 'stunfisk').learnset.tantrum;
		delete this.modData('Learnsets', 'stunfisk').learnset.toxic;
		// Stunfisk Galar
		this.modData("Learnsets", "stunfiskgalar").learnset.jawlock = ["8D"];
		this.modData("Learnsets", "stunfiskgalar").learnset.endeavor = ["8M"];
		this.modData("Learnsets", "stunfiskgalar").learnset.superfang = ["8M"];
		delete this.modData('Learnsets', 'stunfiskgalar').learnset.bounce;
		delete this.modData('Learnsets', 'stunfiskgalar').learnset.tantrum;
		delete this.modData('Learnsets', 'stunfiskgalar').learnset.toxic;
		// Mienfoo
		this.modData("Learnsets", "mienfoo").learnset.armthrust = ["8D"];
		this.modData("Learnsets", "mienfoo").learnset.rollingkick = ["8L17"];
		delete this.modData('Learnsets', 'mienfoo').learnset.doubleslap;
		delete this.modData('Learnsets', 'mienfoo').learnset.toxic;
		// Mienshao
		this.modData("Learnsets", "mienshao").learnset.lashout = ["8D"];
		this.modData("Learnsets", "mienshao").learnset.rollingkick = ["8L17"];
		delete this.modData('Learnsets', 'mienshao').learnset.doubleslap;
		delete this.modData('Learnsets', 'mienshao').learnset.toxic;
		// Druddigon
		this.modData("Learnsets", "druddigon").learnset.morningsun = ["8D"];
		this.modData("Learnsets", "druddigon").learnset.avalanche = ["8M"];
		this.modData("Learnsets", "druddigon").learnset.breakingswipe = ["8M"];
		this.modData("Learnsets", "druddigon").learnset.screech = ["8M"];
		delete this.modData('Learnsets', 'druddigon').learnset.toxic;
		// Golett
		this.modData("Learnsets", "golett").learnset.selfdestruct = ["8D"];
		this.modData("Learnsets", "golett").learnset.tussle = ["8L21"];
		this.modData("Learnsets", "golett").learnset.tantrum = ["8M"];
		this.modData("Learnsets", "golett").learnset.flash = ["8M"];
		this.modData("Learnsets", "golett").learnset.rockclimb = ["8M"];
		delete this.modData('Learnsets', 'golett').learnset.toxic;
		// Golurk
		this.modData("Learnsets", "golurk").learnset.meteormash = ["8D"];
		this.modData("Learnsets", "golurk").learnset.tussle = ["8L21"];
		this.modData("Learnsets", "golurk").learnset.tantrum = ["8M"];
		this.modData("Learnsets", "golurk").learnset.explosion = ["8M"];
		this.modData("Learnsets", "golurk").learnset.flash = ["8M"];
		this.modData("Learnsets", "golurk").learnset.rockclimb = ["8M"];
		delete this.modData('Learnsets', 'golurk').learnset.toxic;
		// Pawniard
		this.modData("Learnsets", "pawniard").learnset.beatup = ["8D"];
		delete this.modData('Learnsets', 'pawniard').learnset.toxic;
		// Bisharp
		this.modData("Learnsets", "bisharp").learnset.beatup = ["8D"];
		delete this.modData('Learnsets', 'bisharp').learnset.toxic;
		// Bouffalant
		this.modData("Learnsets", "bouffalant").learnset.horndrill = ["8D"];
		this.modData("Learnsets", "bouffalant").learnset.fullcollide = ["8M"];
		this.modData("Learnsets", "bouffalant").learnset.throatchop = ["8E"];
		delete this.modData('Learnsets', 'bouffalant').learnset.toxic;
		// Rufflet
		this.modData("Learnsets", "rufflet").learnset.nobleroar = ["8D"];
		delete this.modData('Learnsets', 'rufflet').learnset.toxic;
		// Braviary
		this.modData("Learnsets", "braviary").learnset.nobleroar = ["8D"];
		delete this.modData('Learnsets', 'braviary').learnset.toxic;
		// Vullaby
		this.modData("Learnsets", "vullaby").learnset.shadowbone = ["8D"];
		// Mandibuzz
		this.modData("Learnsets", "mandibuzz").learnset.shadowbone = ["8D"];
		// Heatmor
		this.modData("Learnsets", "heatmor").learnset.clearsmog = ["8D"];
		this.modData("Learnsets", "heatmor").learnset.flash = ["8M"];
		delete this.modData('Learnsets', 'heatmor').learnset.toxic;
		// Durant
		this.modData("Learnsets", "durant").learnset.healorder = ["8D"];
		this.modData("Learnsets", "durant").learnset.compensation = ["8M"];
		this.modData("Learnsets", "durant").learnset.infestation = ["8M"];
		this.modData("Learnsets", "durant").learnset.metalburst = ["8E"];
		delete this.modData('Learnsets', 'durant').learnset.tantrum;
		delete this.modData('Learnsets', 'durant').learnset.toxic;
		// Deino
		this.modData("Learnsets", "deino").learnset.rage = ["8D"];
		this.modData("Learnsets", "deino").learnset.rockclimb = ["8M"];
		delete this.modData('Learnsets', 'deino').learnset.toxic;
		// Zweilous
		this.modData("Learnsets", "zweilous").learnset.rage = ["8D"];
		this.modData("Learnsets", "zweilous").learnset.rockclimb = ["8M"];
		delete this.modData('Learnsets', 'zweilous').learnset.toxic;
		// Hydreigon
		this.modData("Learnsets", "hydreigon").learnset.fellswoop = ["8D"];
		this.modData("Learnsets", "hydreigon").learnset.rockclimb = ["8M"];
		delete this.modData('Learnsets', 'hydreigon').learnset.toxic;
		// Larvesta
		this.modData("Learnsets", "larvesta").learnset.burnup = ["8D"];
		this.modData("Learnsets", "larvesta").learnset.flash = ["8M"];
		this.modData("Learnsets", "larvesta").learnset.naturalgift = ["8M"];
		this.modData("Learnsets", "larvesta").learnset.vitaldrain = ["8M"];
		delete this.modData('Learnsets', 'larvesta').learnset.absorb;
		delete this.modData('Learnsets', 'larvesta').learnset.toxic;
		// Volcarona
		this.modData("Learnsets", "volcarona").learnset.burnup = ["8D"];
		this.modData("Learnsets", "volcarona").learnset.flash = ["8M"];
		this.modData("Learnsets", "volcarona").learnset.naturalgift = ["8M"];
		this.modData("Learnsets", "volcarona").learnset.vitaldrain = ["8M"];
		delete this.modData('Learnsets', 'volcarona').learnset.absorb;
		delete this.modData('Learnsets', 'volcarona').learnset.toxic;
		// Cobalion
		this.modData("Learnsets", "cobalion").learnset.reversal = ["8D"];
		this.modData("Learnsets", "cobalion").learnset.chipaway = ["8M"];
		this.modData("Learnsets", "cobalion").learnset.rockclimb = ["8M"];
		delete this.modData('Learnsets', 'cobalion').learnset.toxic;
		// Terrakion
		this.modData("Learnsets", "terrakion").learnset.reversal = ["8D"];
		this.modData("Learnsets", "terrakion").learnset.rockclimb = ["8M"];
		delete this.modData('Learnsets', 'terrakion').learnset.toxic;
		// Virizion
		this.modData("Learnsets", "virizion").learnset.reversal = ["8D"];
		this.modData("Learnsets", "virizion").learnset.chipaway = ["8M"];
		this.modData("Learnsets", "virizion").learnset.flash = ["8M"];
		delete this.modData('Learnsets', 'virizion').learnset.toxic;
		// Tornadus
		this.modData("Learnsets", "tornadus").learnset.twister = ["8D"];
		delete this.modData('Learnsets', 'tornadus').learnset.toxic;
		// Tornadus Therian
		this.modData("Learnsets", "tornadustherian").learnset.skyattack = ["8D"];
		delete this.modData("Learnsets", "tornadus").learnset.twister;
		// Thundurus
		this.modData("Learnsets", "thundurus").learnset.iondeluge = ["8D"];
		this.modData("Learnsets", "thundurus").learnset.extrasensory = ["8L25"];
		this.modData("Learnsets", "thundurus").learnset.raindance = ["8L55"];
		this.modData("Learnsets", "thundurus").learnset.nastyplot = ["8D"];
		delete this.modData('Learnsets', 'thundurus').learnset.healblock;
		delete this.modData('Learnsets', 'thundurus').learnset.toxic;
		// Thundurus Therian
		this.modData("Learnsets", "thundurustherian").learnset.dragonpulse = ["8D"];
		delete this.modData("Learnsets", "thundurus").learnset.iondeluge;
		// Reshiram
		this.modData("Learnsets", "reshiram").learnset.mist = ["8D"];
		this.modData("Learnsets", "reshiram").learnset.flash = ["8M"];
		this.modData("Learnsets", "reshiram").learnset.preheat = ["8L8"];
		delete this.modData('Learnsets', 'reshiram').learnset.slash;
		delete this.modData('Learnsets', 'reshiram').learnset.toxic;
		// Zekrom
		this.modData("Learnsets", "zekrom").learnset.haze = ["8D"];
		this.modData("Learnsets", "zekrom").learnset.charge = ["8L8"];
		this.modData("Learnsets", "zekrom").learnset.flash = ["8M"];
		this.modData("Learnsets", "zekrom").learnset.rockclimb = ["8M"];
		delete this.modData('Learnsets', 'zekrom').learnset.slash;
		delete this.modData('Learnsets', 'zekrom').learnset.toxic;
		// Landorus
		this.modData("Learnsets", "landorus").learnset.recycle = ["8D"];
		this.modData("Learnsets", "landorus").learnset.compensation = ["8M"];
		this.modData("Learnsets", "landorus").learnset.rockclimb = ["8M"];
		this.modData("Learnsets", "landorus").learnset.rototiller = ["8L1"];
		delete this.modData('Learnsets', 'landorus').learnset.toxic;
		// Landorus Therian
		this.modData("Learnsets", "landorustherian").learnset.nobleroar = ["8D"];
		delete this.modData("Learnsets", "landorus").learnset.recycle;
		// Kyurem
		this.modData("Learnsets", "kyurem").learnset.triattack = ["8D"];
		this.modData("Learnsets", "kyurem").learnset.scaryface = ["8L8"];
		this.modData("Learnsets", "kyurem").learnset.slash = ["8L16"];
		this.modData("Learnsets", "kyurem").learnset.endeavor = ["8L24","8M"];
		this.modData("Learnsets", "kyurem").learnset.dragonpulse = ["8L32","8M"];
		this.modData("Learnsets", "kyurem").learnset.icebeam = ["8L40","8M"];
		this.modData("Learnsets", "kyurem").learnset.sheercold = ["8L48"];
		this.modData("Learnsets", "kyurem").learnset.hypervoice = ["8L56","8M"];
		this.modData("Learnsets", "kyurem").learnset.blizzard = ["8L64","8M"];
		this.modData("Learnsets", "kyurem").learnset.imprison = ["8L72"];
		this.modData("Learnsets", "kyurem").learnset.outrage = ["8L80","8M"];
		this.modData("Learnsets", "kyurem").learnset.glaciate = ["8L88"];
		this.modData("Learnsets", "kyurem").learnset.frostbreath = ["8M"];
		this.modData("Learnsets", "kyurem").learnset.icepunch = ["8M"];
		delete this.modData('Learnsets', 'kyurem').learnset.toxic;
		// Kyurem Black
		this.modData("Learnsets", "kyuremwhite").learnset.triattack = ["8D"];
		this.modData("Learnsets", "kyuremblack").learnset.fusionbolt = ["8R"];
		this.modData("Learnsets", "kyuremblack").learnset.scaryface = ["8L8"];
		this.modData("Learnsets", "kyuremblack").learnset.slash = ["8L16"];
		this.modData("Learnsets", "kyuremblack").learnset.endeavor = ["8L24","8M"];
		this.modData("Learnsets", "kyuremblack").learnset.dragonpulse = ["8L32","8M"];
		this.modData("Learnsets", "kyuremblack").learnset.icebeam = ["8L40","8M"];
		this.modData("Learnsets", "kyuremblack").learnset.sheercold = ["8L48"];
		this.modData("Learnsets", "kyuremblack").learnset.hypervoice = ["8L56","8M"];
		this.modData("Learnsets", "kyuremblack").learnset.blizzard = ["8L64","8M"];
		this.modData("Learnsets", "kyuremblack").learnset.imprison = ["8L72"];
		this.modData("Learnsets", "kyuremblack").learnset.outrage = ["8L80","8M"];
		this.modData("Learnsets", "kyuremblack").learnset.freezeshock = ["8L88"];
		this.modData("Learnsets", "kyuremblack").learnset.frostbreath = ["8M"];
		this.modData("Learnsets", "kyuremblack").learnset.icepunch = ["8M"];
		delete this.modData('Learnsets', 'kyuremblack').learnset.toxic;
		// Kyurem White
		this.modData("Learnsets", "kyuremblack").learnset.triattack = ["8D"];
		this.modData("Learnsets", "kyuremwhite").learnset.fusionflare = ["8R"];
		this.modData("Learnsets", "kyuremwhite").learnset.scaryface = ["8L8"];
		this.modData("Learnsets", "kyuremwhite").learnset.slash = ["8L16"];
		this.modData("Learnsets", "kyuremwhite").learnset.endeavor = ["8L24","8M"];
		this.modData("Learnsets", "kyuremwhite").learnset.dragonpulse = ["8L32","8M"];
		this.modData("Learnsets", "kyuremwhite").learnset.icebeam = ["8L40","8M"];
		this.modData("Learnsets", "kyuremwhite").learnset.sheercold = ["8L48"];
		this.modData("Learnsets", "kyuremwhite").learnset.hypervoice = ["8L56","8M"];
		this.modData("Learnsets", "kyuremwhite").learnset.blizzard = ["8L64","8M"];
		this.modData("Learnsets", "kyuremwhite").learnset.imprison = ["8L72"];
		this.modData("Learnsets", "kyuremwhite").learnset.outrage = ["8L80","8M"];
		this.modData("Learnsets", "kyuremwhite").learnset.iceburn = ["8L88"];
		this.modData("Learnsets", "kyuremwhite").learnset.frostbreath = ["8M"];
		this.modData("Learnsets", "kyuremwhite").learnset.icepunch = ["8M"];
		delete this.modData('Learnsets', 'kyuremwhite').learnset.toxic;
		// Keldeo
		this.modData("Learnsets", "keldeo").learnset.reversal = ["8D"];
		delete this.modData('Learnsets', 'keldeo').learnset.toxic;
		// Meloetta
		this.modData("Learnsets", "meloetta").learnset.relicsong = ["8D"];
		this.modData("Learnsets", "meloetta").learnset.flash = ["8M"];
		delete this.modData('Learnsets', 'meloetta').learnset.toxic;
		// Genesect
		this.modData("Learnsets", "genesect").learnset.extremespeed = ["8D"];
		this.modData("Learnsets", "genesect").learnset.flash = ["8M"];
		this.modData("Learnsets", "genesect").learnset.stringshot = ["8M"];
		delete this.modData('Learnsets', 'genesect').learnset.toxic;
		// Chespin
		this.modData("Learnsets", "chespin").learnset.skullbash = ["8D"];
		this.modData("Learnsets", "chespin").learnset.flash = ["8M"];
		this.modData("Learnsets", "chespin").learnset.fullcollide = ["8M"];
		this.modData("Learnsets", "chespin").learnset.naturalgift = ["8M"];
		delete this.modData('Learnsets', 'chespin').learnset.toxic;
		// Quilladin
		this.modData("Learnsets", "quilladin").learnset.skullbash = ["8D"];
		this.modData("Learnsets", "quilladin").learnset.flash = ["8M"];
		this.modData("Learnsets", "quilladin").learnset.fullcollide = ["8M"];
		this.modData("Learnsets", "quilladin").learnset.lowsweep = ["8M"];
		this.modData("Learnsets", "quilladin").learnset.naturalgift = ["8M"];
		this.modData("Learnsets", "quilladin").learnset.rockclimb = ["8M"];
		delete this.modData('Learnsets', 'quilladin').learnset.toxic;
		// Chesnaught
		this.modData("Learnsets", "chesnaught").learnset.skullbash = ["8D"];
		this.modData("Learnsets", "chesnaught").learnset.chipaway = ["8M"];
		this.modData("Learnsets", "chesnaught").learnset.flash = ["8M"];
		this.modData("Learnsets", "chesnaught").learnset.fullcollide = ["8M"];
		this.modData("Learnsets", "chesnaught").learnset.lowsweep = ["8M"];
		this.modData("Learnsets", "chesnaught").learnset.naturalgift = ["8M"];
		this.modData("Learnsets", "chesnaught").learnset.rockclimb = ["8M"];
		delete this.modData('Learnsets', 'chesnaught').learnset.toxic;
		// Fennekin
		this.modData("Learnsets", "fennekin").learnset.confuseray = ["8D"];
		this.modData("Learnsets", "fennekin").learnset.amnesia = ["8M"];
		this.modData("Learnsets", "fennekin").learnset.charm = ["8M"];
		delete this.modData('Learnsets', 'fennekin').learnset.toxic;
		// Braixen
		this.modData("Learnsets", "braixen").learnset.confuseray = ["8D"];
		this.modData("Learnsets", "braixen").learnset.amnesia = ["8M"];
		this.modData("Learnsets", "braixen").learnset.charm = ["8M"];
		this.modData("Learnsets", "braixen").learnset.hex = ["8M"];
		this.modData("Learnsets", "braixen").learnset.nightmare = ["8M"];
		delete this.modData('Learnsets', 'braixen').learnset.toxic;
		// Delphox
		this.modData("Learnsets", "delphox").learnset.confuseray = ["8D"];
		this.modData("Learnsets", "delphox").learnset.amnesia = ["8M"];
		this.modData("Learnsets", "delphox").learnset.charm = ["8M"];
		this.modData("Learnsets", "delphox").learnset.hex = ["8M"];
		this.modData("Learnsets", "delphox").learnset.nightmare = ["8M"];
		delete this.modData('Learnsets', 'delphox').learnset.toxic;
		// Froakie
		this.modData("Learnsets", "froakie").learnset.liquidation = ["8D"];
		this.modData("Learnsets", "froakie").learnset.cut = ["8E"];
		this.modData("Learnsets", "froakie").learnset.whirlpool = ["8M"];
		delete this.modData('Learnsets', 'froakie').learnset.poweruppunch;
		// Frogadier
		this.modData("Learnsets", "frogadier").learnset.liquidation = ["8D"];
		this.modData("Learnsets", "frogadier").learnset.whirlpool = ["8M"];
		// Greninja
		this.modData("Learnsets", "greninja").learnset.spiritshackle = ["8D"];
		this.modData("Learnsets", "greninja").learnset.whirlpool = ["8M"];
		// Bunnelby
		this.modData("Learnsets", "bunnelby").learnset.crosschop = ["8D"];
		this.modData("Learnsets", "bunnelby").learnset.tussle = ["8L12"];
		this.modData("Learnsets", "bunnelby").learnset.bulldoze = ["8L22","8M"];
		this.modData("Learnsets", "bunnelby").learnset.naturalgift = ["8M"];
		delete this.modData('Learnsets', 'bunnelby').learnset.mudshot;
		delete this.modData('Learnsets', 'bunnelby').learnset.toxic;
		// Diggersby
		this.modData("Learnsets", "diggersby").learnset.crosschop = ["8D"];
		this.modData("Learnsets", "diggersby").learnset.doubleslap = ["8L10"];
		this.modData("Learnsets", "diggersby").learnset.tussle = ["8L12"];
		this.modData("Learnsets", "diggersby").learnset.bulldoze = ["8L24","8M"];
		this.modData("Learnsets", "diggersby").learnset.naturalgift = ["8M"];
		this.modData("Learnsets", "diggersby").learnset.rockclimb = ["8M"];
		delete this.modData('Learnsets', 'diggersby').learnset.mudshot;
		delete this.modData('Learnsets', 'diggersby').learnset.toxic;
		// Fletchling
		this.modData("Learnsets", "fletchling").learnset.pluck = ["8D"];
		this.modData("Learnsets", "fletchling").learnset.mefirst = ["8E"];
		this.modData("Learnsets", "fletchling").learnset.razorwind = ["8E"];
		delete this.modData('Learnsets', 'fletchling').learnset.toxic;
		// Fletchinder
		this.modData("Learnsets", "fletchinder").learnset.pluck = ["8D"];
		delete this.modData('Learnsets', 'fletchinder').learnset.toxic;
		// Talonflame
		this.modData("Learnsets", "talonflame").learnset.skydrop = ["8D"];
		this.modData("Learnsets", "talonflame").learnset.screech = ["8M"];
		delete this.modData('Learnsets', 'talonflame').learnset.toxic;
		// Vivillon
		this.modData("Learnsets", "vivillon").learnset.reflecttype = ["8D"];
		this.modData("Learnsets", "vivillon").learnset.flash = ["8M"];
		delete this.modData('Learnsets', 'vivillon').learnset.toxic;
		// Litleo
		this.modData("Learnsets", "litleo").learnset.assist = ["8D"];
		this.modData("Learnsets", "litleo").learnset.assurance = ["8M"];
		delete this.modData('Learnsets', 'litleo').learnset.toxic;
		// Pyroar
		this.modData("Learnsets", "pyroar").learnset.assist = ["8D"];
		this.modData("Learnsets", "pyroar").learnset.assurance = ["8M"];
		this.modData("Learnsets", "pyroar").learnset.rockclimb = ["8M"];
		delete this.modData('Learnsets', 'pyroar').learnset.toxic;
		// Flabébé
		this.modData("Learnsets", "flabebe").learnset.sweetscent = ["8D"];
		this.modData("Learnsets", "flabebe").learnset.charm = ["8M"];
		this.modData("Learnsets", "flabebe").learnset.daydream = ["8L1"];
		this.modData("Learnsets", "flabebe").learnset.faketears = ["8M"];
		this.modData("Learnsets", "flabebe").learnset.flash = ["8M"];
		this.modData("Learnsets", "flabebe").learnset.leafage = ["8L1"];
		this.modData("Learnsets", "flabebe").learnset.lifedew = ["8E"];
		this.modData("Learnsets", "flabebe").learnset.naturalgift = ["8M"];
		delete this.modData('Learnsets', 'flabebe').learnset.toxic;
		delete this.modData('Learnsets', 'flabebe').learnset.vinewhip;
		// Floette
		this.modData("Learnsets", "floette").learnset.sweetscent = ["8D"];
		this.modData("Learnsets", "floette").learnset.charm = ["8M"];
		this.modData("Learnsets", "floette").learnset.daydream = ["8L1"];
		this.modData("Learnsets", "floette").learnset.faketears = ["8M"];
		this.modData("Learnsets", "floette").learnset.flash = ["8M"];
		this.modData("Learnsets", "floette").learnset.leafage = ["8L1"];
		this.modData("Learnsets", "floette").learnset.naturalgift = ["8M"];
		delete this.modData('Learnsets', 'floette').learnset.toxic;
		delete this.modData('Learnsets', 'floette').learnset.vinewhip;
		// Florges
		this.modData("Learnsets", "florges").learnset.fleurcannon = ["8D"];
		this.modData("Learnsets", "florges").learnset.charm = ["8M"];
		this.modData("Learnsets", "florges").learnset.courtchange = ["8M"];
		this.modData("Learnsets", "florges").learnset.daydream = ["8L1"];
		this.modData("Learnsets", "florges").learnset.faketears = ["8M"];
		this.modData("Learnsets", "florges").learnset.flash = ["8M"];
		this.modData("Learnsets", "florges").learnset.leafage = ["8L1"];
		this.modData("Learnsets", "florges").learnset.naturalgift = ["8M"];
		delete this.modData('Learnsets', 'florges').learnset.toxic;
		delete this.modData('Learnsets', 'florges').learnset.vinewhip;
		// Skiddo
		this.modData("Learnsets", "skiddo").learnset.highhorsepower = ["8D"];
		this.modData("Learnsets", "skiddo").learnset.amnesia = ["8M"];
		this.modData("Learnsets", "skiddo").learnset.charm = ["8M"];
		this.modData("Learnsets", "skiddo").learnset.naturalgift = ["8M"];
		delete this.modData('Learnsets', 'skiddo').learnset.toxic;
		// Gogoat
		this.modData("Learnsets", "gogoat").learnset.highhorsepower = ["8D"];
		this.modData("Learnsets", "gogoat").learnset.amnesia = ["8M"];
		this.modData("Learnsets", "gogoat").learnset.charm = ["8M"];
		this.modData("Learnsets", "gogoat").learnset.naturalgift = ["8M"];
		this.modData("Learnsets", "gogoat").learnset.rockclimb = ["8M"];
		delete this.modData('Learnsets', 'gogoat').learnset.toxic;
		// Pancham
		this.modData("Learnsets", "pancham").learnset.scaryface = ["8D"];
		delete this.modData('Learnsets', 'pancham').learnset.toxic;
		// Pangoro
		this.modData("Learnsets", "pangoro").learnset.scaryface = ["8D"];
		this.modData("Learnsets", "pangoro").learnset.chipaway = ["8M"];
		this.modData("Learnsets", "pangoro").learnset.rockclimb = ["8M"];
		delete this.modData('Learnsets', 'pangoro').learnset.toxic;
		// Furfrou
		this.modData("Learnsets", "furfrou").learnset.swagger = ["8D"];
		delete this.modData('Learnsets', 'furfrou').learnset.toxic;
		// Espurr
		this.modData("Learnsets", "espurr").learnset.payday = ["8D"];
		delete this.modData('Learnsets', 'espurr').learnset.toxic;
		// Meowstic ♀
		this.modData("Learnsets", "meowsticf").learnset.miracleeye = ["8D"];
		delete this.modData('Learnsets', 'meowsticf').learnset.toxic;
		// Meowstic ♂
		this.modData("Learnsets", "meowstic").learnset.futuresight = ["8D"];
		delete this.modData('Learnsets', 'meowstic').learnset.toxic;
		// Honedge
		this.modData("Learnsets", "honedge").learnset.destinybond = ["8D"];
		this.modData("Learnsets", "honedge").learnset.nightmare = ["8M"];
		delete this.modData('Learnsets', 'honedge').learnset.toxic;
		// Doublade
		this.modData("Learnsets", "doublade").learnset.destinybond = ["8D"];
		this.modData("Learnsets", "doublade").learnset.nightmare = ["8M"];
		delete this.modData('Learnsets', 'doublade').learnset.toxic;
		// Aegislash
		this.modData("Learnsets", "aegislash").learnset.destinybond = ["8D"];
		this.modData("Learnsets", "aegislash").learnset.fullcollide = ["8M"];
		this.modData("Learnsets", "aegislash").learnset.nightmare = ["8M"];
		delete this.modData('Learnsets', 'aegislash').learnset.toxic;
		// Spritzee
		this.modData("Learnsets", "spritzee").learnset.hypnosis = ["8D"];
		this.modData("Learnsets", "spritzee").learnset.nightmare = ["8M"];
		this.modData("Learnsets", "spritzee").learnset.strangesmoke = ["8L31"];
		delete this.modData('Learnsets', 'spritzee').learnset.moonblast;
		delete this.modData('Learnsets', 'spritzee').learnset.toxic;
		// Aromatisse
		this.modData("Learnsets", "aromatisse").learnset.hypnosis = ["8D"];
		this.modData("Learnsets", "aromatisse").learnset.nightmare = ["8M"];
		this.modData("Learnsets", "aromatisse").learnset.strangesmoke = ["8L31"];
		delete this.modData('Learnsets', 'aromatisse').learnset.moonblast;
		delete this.modData('Learnsets', 'aromatisse').learnset.toxic;
		// Swirlix
		this.modData("Learnsets", "swirlix").learnset.lick = ["8D"];
		this.modData("Learnsets", "swirlix").learnset.odorsleuth = ["8E"];
		delete this.modData('Learnsets', 'swirlix').learnset.toxic;
		// Slurpuff
		this.modData("Learnsets", "slurpuff").learnset.lick = ["8D"];
		delete this.modData('Learnsets', 'slurpuff').learnset.stickyweb;
		delete this.modData('Learnsets', 'slurpuff').learnset.toxic;
		// Inkay
		this.modData("Learnsets", "inkay").learnset.liquidation = ["8D"];
		this.modData("Learnsets", "inkay").learnset.flash = ["8M"];
		this.modData("Learnsets", "inkay").learnset.nightmare = ["8M"];
		this.modData("Learnsets", "inkay").learnset.octazooka = ["8E"];
		delete this.modData('Learnsets', 'inkay').learnset.toxic;
		// Malamar
		this.modData("Learnsets", "malamar").learnset.liquidation = ["8D"];
		this.modData("Learnsets", "malamar").learnset.flash = ["8M"];
		this.modData("Learnsets", "malamar").learnset.nightmare = ["8M"];
		delete this.modData('Learnsets', 'malamar').learnset.toxic;
		// Binacle
		this.modData("Learnsets", "binacle").learnset.crushclaw = ["8D"];
		this.modData("Learnsets", "binacle").learnset.lashout = ["8E"];
		delete this.modData('Learnsets', 'binacle').learnset.toxic;
		// Barbaracle
		this.modData("Learnsets", "barbaracle").learnset.crushclaw = ["8D"];
		this.modData("Learnsets", "barbaracle").learnset.fullcollide = ["8M"];
		this.modData("Learnsets", "barbaracle").learnset.rockclimb = ["8M"];
		delete this.modData('Learnsets', 'barbaracle').learnset.meteorbeam;
		delete this.modData('Learnsets', 'barbaracle').learnset.toxic;
		// Skrelp
		this.modData("Learnsets", "skrelp").learnset.razorleaf = ["8D"];
		this.modData("Learnsets", "skrelp").learnset.brine = ["8M"];
		this.modData("Learnsets", "skrelp").learnset.whirlpool = ["8M"];
		// Dragalge
		this.modData("Learnsets", "dragalge").learnset.razorleaf = ["8D"];
		this.modData("Learnsets", "dragalge").learnset.brine = ["8M"];
		this.modData("Learnsets", "dragalge").learnset.whirlpool = ["8M"];
		// Clauncher
		this.modData("Learnsets", "clauncher").learnset.flameburst = ["8D"];
		this.modData("Learnsets", "clauncher").learnset.brine = ["8M"];
		this.modData("Learnsets", "clauncher").learnset.electroball = ["8M"];
		this.modData("Learnsets", "clauncher").learnset.whirlpool = ["8M"];
		delete this.modData('Learnsets', 'clauncher').learnset.toxic;
		// Clawitzer
		this.modData("Learnsets", "clawitzer").learnset.steameruption = ["8D"];
		this.modData("Learnsets", "clawitzer").learnset.brine = ["8M"];
		this.modData("Learnsets", "clawitzer").learnset.electroball = ["8M"];
		this.modData("Learnsets", "clawitzer").learnset.whirlpool = ["8M"];
		delete this.modData('Learnsets', 'clawitzer').learnset.toxic;
		// Helioptile
		this.modData("Learnsets", "helioptile").learnset.morningsun = ["8D"];
		this.modData("Learnsets", "helioptile").learnset.flash = ["8M"];
		delete this.modData('Learnsets', 'helioptile').learnset.toxic;
		// Heliolisk
		this.modData("Learnsets", "heliolisk").learnset.morningsun = ["8D"];
		this.modData("Learnsets", "heliolisk").learnset.weatherball = ["8L1"];
		this.modData("Learnsets", "heliolisk").learnset.flash = ["8M"];
		delete this.modData('Learnsets', 'heliolisk').learnset.toxic;
		// Tyrunt
		this.modData("Learnsets", "tyrunt").learnset.quash = ["8D"];
		this.modData("Learnsets", "tyrunt").learnset.assurance = ["8M"];
		this.modData("Learnsets", "tyrunt").learnset.rockclimb = ["8M"];
		this.modData("Learnsets", "tyrunt").learnset.tantrum = ["8L49","8M"];
		delete this.modData('Learnsets', 'tyrunt').learnset.horndrill;
		delete this.modData('Learnsets', 'tyrunt').learnset.toxic;
		// Tyrantrum
		this.modData("Learnsets", "tyrantrum").learnset.quash = ["8D"];
		this.modData("Learnsets", "tyrantrum").learnset.rockclimb = ["8M"];
		this.modData("Learnsets", "tyrantrum").learnset.tantrum = ["8L53","8M"];
		delete this.modData('Learnsets', 'tyrantrum').learnset.horndrill;
		delete this.modData('Learnsets', 'tyrantrum').learnset.toxic;
		// Amaura
		this.modData("Learnsets", "amaura").learnset.magiccoat = ["8D"];
		this.modData("Learnsets", "amaura").learnset.auroraveil = ["8M"];
		this.modData("Learnsets", "amaura").learnset.eerieimpulse = ["8M"];
		this.modData("Learnsets", "amaura").learnset.flash = ["8M"];
		this.modData("Learnsets", "amaura").learnset.powergem = ["8M"];
		delete this.modData('Learnsets', 'amaura').learnset.toxic;
		// Aurorus
		this.modData("Learnsets", "aurorus").learnset.magiccoat = ["8D"];
		this.modData("Learnsets", "aurorus").learnset.sheercold = ["8L1"];
		this.modData("Learnsets", "aurorus").learnset.auroraveil = ["8M"];
		this.modData("Learnsets", "aurorus").learnset.eerieimpulse = ["8M"];
		this.modData("Learnsets", "aurorus").learnset.flash = ["8M"];
		this.modData("Learnsets", "aurorus").learnset.powergem = ["8M"];
		delete this.modData('Learnsets', 'aurorus').learnset.toxic;
		// Sylveon
		this.modData("Learnsets", "sylveon").learnset.wrap = ["8D"];
		this.modData("Learnsets", "sylveon").learnset.flash = ["8M"];
		this.modData("Learnsets", "sylveon").learnset.nightmare = ["8M"];
		delete this.modData('Learnsets', 'sylveon').learnset.toxic;
		// Hawlucha
		this.modData("Learnsets", "hawlucha").learnset.holdback = ["8D"];
		this.modData("Learnsets", "hawlucha").learnset.circlethrow = ["8L1"];
		this.modData("Learnsets", "hawlucha").learnset.rockclimb = ["8M"];
		this.modData("Learnsets", "hawlucha").learnset.submission = ["8L1"];
		delete this.modData('Learnsets', 'hawlucha').learnset.toxic;
		// Dedenne
		this.modData("Learnsets", "dedenne").learnset.overdrive = ["8D"];
		this.modData("Learnsets", "dedenne").learnset.flash = ["8M"];
		this.modData("Learnsets", "dedenne").learnset.nastyplot = ["8M"];
		delete this.modData('Learnsets', 'dedenne').learnset.toxic;
		// Carbink
		this.modData("Learnsets", "carbink").learnset.mirrorshot = ["8D"];
		this.modData("Learnsets", "carbink").learnset.flash = ["8M"];
		delete this.modData('Learnsets', 'carbink').learnset.toxic;
		// Goomy
		this.modData("Learnsets", "goomy").learnset.recover = ["8D"];
		this.modData("Learnsets", "goomy").learnset.lifedew = ["8E"];
		this.modData("Learnsets", "goomy").learnset.slipaway = ["8E"];
		// Sliggoo
		this.modData("Learnsets", "sliggoo").learnset.recover = ["8D"];
		// Goodra
		this.modData("Learnsets", "goodra").learnset.recover = ["8D"];
		// Klefki
		this.modData("Learnsets", "klefki").learnset.sharpen = ["8D"];
		this.modData("Learnsets", "klefki").learnset.flash = ["8M"];
		this.modData("Learnsets", "klefki").learnset.nastyplot = ["8M"];
		delete this.modData('Learnsets', 'klefki').learnset.defog;
		delete this.modData('Learnsets', 'klefki').learnset.toxic;
		// Phantump
		this.modData("Learnsets", "phantump").learnset.irondefense = ["8D"];
		this.modData("Learnsets", "phantump").learnset.naturalgift = ["8M"];
		this.modData("Learnsets", "phantump").learnset.nightmare = ["8M"];
		delete this.modData('Learnsets', 'phantump').learnset.toxic;
		// Trevenant
		this.modData("Learnsets", "trevenant").learnset.irondefense = ["8D"];
		this.modData("Learnsets", "trevenant").learnset.midnight = ["8T"];
		this.modData("Learnsets", "trevenant").learnset.naturalgift = ["8M"];
		this.modData("Learnsets", "trevenant").learnset.nightmare = ["8M"];
		delete this.modData('Learnsets', 'trevenant').learnset.toxic;
		// Pumpkaboo
		this.modData("Learnsets", "pumpkaboo").learnset.magicpowder = ["8D"];
		this.modData("Learnsets", "pumpkaboo").learnset.flash = ["8M"];
		this.modData("Learnsets", "pumpkaboo").learnset.imprison = ["8E"];
		this.modData("Learnsets", "pumpkaboo").learnset.mysticalfire = ["8E"];
		this.modData("Learnsets", "pumpkaboo").learnset.naturalgift = ["8M"];
		this.modData("Learnsets", "pumpkaboo").learnset.nightmare = ["8M"];
		delete this.modData('Learnsets', 'pumpkaboo').learnset.toxic;
		// Gourgeist
		this.modData("Learnsets", "gourgeist").learnset.magicpowder = ["8D"];
		this.modData("Learnsets", "gourgeist").learnset.flash = ["8M"];
		this.modData("Learnsets", "gourgeist").learnset.midnight = ["8T"];
		this.modData("Learnsets", "gourgeist").learnset.naturalgift = ["8M"];
		this.modData("Learnsets", "gourgeist").learnset.nightmare = ["8M"];
		delete this.modData('Learnsets', 'gourgeist').learnset.toxic;
		// Bergmite
		this.modData("Learnsets", "bergmite").learnset.surf = ["8D"];
		this.modData("Learnsets", "bergmite").learnset.icywind = ["8L6","8M"];
		this.modData("Learnsets", "bergmite").learnset.iceball = ["8L12"];
		this.modData("Learnsets", "bergmite").learnset.flash = ["8M"];
		delete this.modData('Learnsets', 'bergmite').learnset.powdersnow;
		delete this.modData('Learnsets', 'bergmite').learnset.toxic;
		// Avalugg
		this.modData("Learnsets", "avalugg").learnset.surf = ["8D"];
		this.modData("Learnsets", "avalugg").learnset.icywind = ["8L6","8M"];
		this.modData("Learnsets", "avalugg").learnset.iceball = ["8L12"];
		this.modData("Learnsets", "avalugg").learnset.flash = ["8M"];
		this.modData("Learnsets", "avalugg").learnset.rockclimb = ["8M"];
		delete this.modData('Learnsets', 'avalugg').learnset.powdersnow;
		delete this.modData('Learnsets', 'avalugg').learnset.toxic;
		// Noibat
		this.modData("Learnsets", "noibat").learnset.chatter = ["8D"];
		this.modData("Learnsets", "noibat").learnset.leechlife = ["8L5"];
		this.modData("Learnsets", "noibat").learnset.nightmare = ["8M"];
		this.modData("Learnsets", "noibat").learnset.vitaldrain = ["8M"];
		delete this.modData('Learnsets', 'noibat').learnset.absorb;
		delete this.modData('Learnsets', 'noibat').learnset.toxic;
		// Noivern
		this.modData("Learnsets", "noivern").learnset.chatter = ["8D"];
		this.modData("Learnsets", "noivern").learnset.leechlife = ["8L5"];
		this.modData("Learnsets", "noivern").learnset.nightmare = ["8M"];
		this.modData("Learnsets", "noivern").learnset.vitaldrain = ["8M"];
		delete this.modData('Learnsets', 'noivern').learnset.absorb;
		delete this.modData('Learnsets', 'noivern').learnset.toxic;
		// Xerneas
		this.modData("Learnsets", "xerneas").learnset.naturesmadness = ["8D"];
		this.modData("Learnsets", "xerneas").learnset.aromatherapy = ["8L1"];
		this.modData("Learnsets", "xerneas").learnset.ingrain = ["8L1"];
		this.modData("Learnsets", "xerneas").learnset.psychup = ["8L25","8M"];
		this.modData("Learnsets", "xerneas").learnset.healpulse = ["8L30"];
		this.modData("Learnsets", "xerneas").learnset.dazzlinggleam = ["8L40","8M"];
		this.modData("Learnsets", "xerneas").learnset.mistyterrain = ["8L45","8M"];
		this.modData("Learnsets", "xerneas").learnset.geomancy = ["8L50"];
		this.modData("Learnsets", "xerneas").learnset.takedown = ["8L55"];
		this.modData("Learnsets", "xerneas").learnset.megahorn = ["8L65"];
		this.modData("Learnsets", "xerneas").learnset.playrough = ["8L70"];
		this.modData("Learnsets", "xerneas").learnset.flash = ["8M"];
		this.modData("Learnsets", "xerneas").learnset.naturalgift = ["8M"];
		delete this.modData('Learnsets', 'xerneas').learnset.toxic;
		// Yveltal
		this.modData("Learnsets", "yveltal").learnset.underflame = ["8D"];
		this.modData("Learnsets", "yveltal").learnset.ominouswind = ["8L1"];
		this.modData("Learnsets", "yveltal").learnset.razorwind = ["8L55"];
		this.modData("Learnsets", "yveltal").learnset.fellswoop = ["8L65"];
		this.modData("Learnsets", "yveltal").learnset.nightmare = ["8M"];
		delete this.modData('Learnsets', 'yveltal').learnset.dragonrush;
		delete this.modData('Learnsets', 'yveltal').learnset.toxic;
		// Zygarde 50%
		this.modData("Learnsets", "zygarde").learnset.acidarmor = ["8D"];
		this.modData("Learnsets", "zygarde").learnset.bind = ["8L1"];
		this.modData("Learnsets", "zygarde").learnset.dig = ["8L1","8M"];
		this.modData("Learnsets", "zygarde").learnset.dragonbreath = ["8L1"];
		this.modData("Learnsets", "zygarde").learnset.bite = ["8L1"];
		this.modData("Learnsets", "zygarde").learnset.haze = ["8L5"];
		this.modData("Learnsets", "zygarde").learnset.bulldoze = ["8L10","8M"];
		this.modData("Learnsets", "zygarde").learnset.camouflage = ["8L15"];
		this.modData("Learnsets", "zygarde").learnset.crunch = ["8L20"];
		this.modData("Learnsets", "zygarde").learnset.safeguard = ["8L25","8M"];
		this.modData("Learnsets", "zygarde").learnset.glare = ["8L30"];
		this.modData("Learnsets", "zygarde").learnset.sandstorm = ["8L35","8M"];
		this.modData("Learnsets", "zygarde").learnset.dragonpulse = ["8L40","8M"];
		this.modData("Learnsets", "zygarde").learnset.coil = ["8L45"];
		this.modData("Learnsets", "zygarde").learnset.landswrath = ["8L50"];
		this.modData("Learnsets", "zygarde").learnset.extremespeed = ["8L55"];
		this.modData("Learnsets", "zygarde").learnset.dragonrush = ["8L60"];
		this.modData("Learnsets", "zygarde").learnset.dragondance = ["8L65"];
		this.modData("Learnsets", "zygarde").learnset.earthquake = ["8L70","8M"];
		this.modData("Learnsets", "zygarde").learnset.outrage = ["8L75","8M"];
		this.modData("Learnsets", "zygarde").learnset.thousandwaves = ["8L80"];
		this.modData("Learnsets", "zygarde").learnset.thousandarrows = ["8L80"];
		this.modData("Learnsets", "zygarde").learnset.coreenforcer = ["8L85"];
		this.modData("Learnsets", "zygarde").learnset.avalanche = ["8M"];
		this.modData("Learnsets", "zygarde").learnset.bodypress = ["8M"];
		this.modData("Learnsets", "zygarde").learnset.rockclimb = ["8M"];
		this.modData("Learnsets", "zygarde").learnset.stasis = ["8T"];
		delete this.modData('Learnsets', 'zygarde').learnset.toxic;
		// Zygarde 10%
		this.modData("Learnsets", "zygarde10").learnset.acidarmor = ["8D"];
		this.modData("Learnsets", "zygarde10").learnset.bind = ["8L1"];
		this.modData("Learnsets", "zygarde10").learnset.dig = ["8L1","8M"];
		this.modData("Learnsets", "zygarde10").learnset.dragonbreath = ["8L1"];
		this.modData("Learnsets", "zygarde10").learnset.bite = ["8L1"];
		this.modData("Learnsets", "zygarde10").learnset.haze = ["8L5"];
		this.modData("Learnsets", "zygarde10").learnset.bulldoze = ["8L10","8M"];
		this.modData("Learnsets", "zygarde10").learnset.camouflage = ["8L15"];
		this.modData("Learnsets", "zygarde10").learnset.crunch = ["8L20"];
		this.modData("Learnsets", "zygarde10").learnset.safeguard = ["8L25","8M"];
		this.modData("Learnsets", "zygarde10").learnset.glare = ["8L30"];
		this.modData("Learnsets", "zygarde10").learnset.sandstorm = ["8L35","8M"];
		this.modData("Learnsets", "zygarde10").learnset.dragonpulse = ["8L40","8M"];
		this.modData("Learnsets", "zygarde10").learnset.coil = ["8L45"];
		this.modData("Learnsets", "zygarde10").learnset.landswrath = ["8L50"];
		this.modData("Learnsets", "zygarde10").learnset.extremespeed = ["8L55"];
		this.modData("Learnsets", "zygarde10").learnset.dragonrush = ["8L60"];
		this.modData("Learnsets", "zygarde10").learnset.dragondance = ["8L65"];
		this.modData("Learnsets", "zygarde10").learnset.earthquake = ["8L70","8M"];
		this.modData("Learnsets", "zygarde10").learnset.outrage = ["8L75","8M"];
		this.modData("Learnsets", "zygarde10").learnset.thousandwaves = ["8L80"];
		this.modData("Learnsets", "zygarde10").learnset.thousandarrows = ["8L80"];
		this.modData("Learnsets", "zygarde10").learnset.coreenforcer = ["8L85"];
		this.modData("Learnsets", "zygarde10").learnset.rockclimb = ["8M"];
		this.modData("Learnsets", "zygarde10").learnset.stasis = ["8T"];
		delete this.modData('Learnsets', 'zygarde10').learnset.toxic;
		// Diancie
		this.modData("Learnsets", "diancie").learnset.mirrorshot = ["8D"];
		this.modData("Learnsets", "diancie").learnset.flash = ["8M"];
		delete this.modData('Learnsets', 'diancie').learnset.toxic;
		// Hoopa
		this.modData("Learnsets", "hoopa").learnset.spiritbreak = ["8D"];
		this.modData("Learnsets", "hoopa").learnset.feintattack = ["8L15"];
		this.modData("Learnsets", "hoopa").learnset.lightscreen = ["8M"];
		this.modData("Learnsets", "hoopa").learnset.nightmare = ["8M"];
		this.modData("Learnsets", "hoopa").learnset.poltergeist = ["8M"];
		this.modData("Learnsets", "hoopa").learnset.shadowpunch = ["8L15"];
		this.modData("Learnsets", "hoopa").learnset.stasis = ["8T"];
		delete this.modData('Learnsets', 'hoopa').learnset.toxic;
		// Volcanion
		this.modData("Learnsets", "volcanion").learnset.preheat = ["8D"];
		this.modData("Learnsets", "volcanion").learnset.whirlpool = ["8M"];
		delete this.modData('Learnsets', 'volcanion').learnset.toxic;
		// Rowlet
		this.modData("Learnsets", "rowlet").learnset.aircutter = ["8D"];
		this.modData("Learnsets", "rowlet").learnset.naturalgift = ["8M"];
		delete this.modData('Learnsets', 'rowlet').learnset.toxic;
		// Dartrix
		this.modData("Learnsets", "dartrix").learnset.aircutter = ["8D"];
		this.modData("Learnsets", "dartrix").learnset.naturalgift = ["8M"];
		delete this.modData('Learnsets', 'dartrix').learnset.toxic;
		// Decidueye
		this.modData("Learnsets", "decidueye").learnset.fallenarrow = ["8D"];
		this.modData("Learnsets", "decidueye").learnset.naturalgift = ["8M"];
		this.modData("Learnsets", "decidueye").learnset.nightmare = ["8M"];
		this.modData("Learnsets", "decidueye").learnset.retaliate = ["8M"];
		delete this.modData('Learnsets', 'decidueye').learnset.poltergeist;
		delete this.modData('Learnsets', 'decidueye').learnset.toxic;
		// Litten
		this.modData("Learnsets", "litten").learnset.preheat = ["8D"];
		this.modData("Learnsets", "litten").learnset.pounce = ["8L16"];
		this.modData("Learnsets", "litten").learnset.assist = ["8E"];
		this.modData("Learnsets", "litten").learnset.flash = ["8M"];
		this.modData("Learnsets", "litten").learnset.honeclaws = ["8M"];
		delete this.modData('Learnsets', 'litten').learnset.doublekick;
		delete this.modData('Learnsets', 'litten').learnset.leechlife;
		delete this.modData('Learnsets', 'litten').learnset.toxic;
		// Torracat
		this.modData("Learnsets", "torracat").learnset.preheat = ["8D"];
		this.modData("Learnsets", "torracat").learnset.pounce = ["8L16"];
		this.modData("Learnsets", "torracat").learnset.flash = ["8M"];
		this.modData("Learnsets", "torracat").learnset.honeclaws = ["8M"];
		this.modData("Learnsets", "torracat").learnset.strength = ["8M"];
		delete this.modData('Learnsets', 'torracat').learnset.doublekick;
		delete this.modData('Learnsets', 'torracat').learnset.leechlife;
		delete this.modData('Learnsets', 'torracat').learnset.toxic;
		// Incineroar
		this.modData("Learnsets", "incineroar").learnset.heatcrash = ["8D"];
		this.modData("Learnsets", "incineroar").learnset.pounce = ["8L16"];
		this.modData("Learnsets", "incineroar").learnset.chipaway = ["8M"];
		this.modData("Learnsets", "incineroar").learnset.flash = ["8M"];
		this.modData("Learnsets", "incineroar").learnset.honeclaws = ["8M"];
		this.modData("Learnsets", "incineroar").learnset.rockclimb = ["8M"];
		this.modData("Learnsets", "incineroar").learnset.strength = ["8M"];
		delete this.modData('Learnsets', 'incineroar').learnset.doublekick;
		delete this.modData('Learnsets', 'incineroar').learnset.leechlife;
		delete this.modData('Learnsets', 'incineroar').learnset.quash;
		delete this.modData('Learnsets', 'incineroar').learnset.toxic;
		// Popplio
		this.modData("Learnsets", "popplio").learnset.spotlight = ["8D"];
		this.modData("Learnsets", "popplio").learnset.flash = ["8M"];
		delete this.modData('Learnsets', 'popplio').learnset.mistyterrain;
		delete this.modData('Learnsets', 'popplio').learnset.toxic;
		// Brionne
		this.modData("Learnsets", "brionne").learnset.spotlight = ["8D"];
		this.modData("Learnsets", "brionne").learnset.flash = ["8M"];
		delete this.modData('Learnsets', 'brionne').learnset.mistyterrain;
		delete this.modData('Learnsets', 'brionne').learnset.toxic;
		// Primarina
		this.modData("Learnsets", "primarina").learnset.spotlight = ["8D"];
		this.modData("Learnsets", "primarina").learnset.flash = ["8M"];
		delete this.modData('Learnsets', 'primarina').learnset.toxic;
		// Pikipek
		this.modData("Learnsets", "pikipek").learnset.barrage = ["8D"];
		delete this.modData('Learnsets', 'pikipek').learnset.toxic;
		// Trumbeak
		this.modData("Learnsets", "trumbeak").learnset.barrage = ["8D"];
		delete this.modData('Learnsets', 'trumbeak').learnset.toxic;
		// Toucannon
		this.modData("Learnsets", "toucannon").learnset.barrage = ["8D"];
		this.modData("Learnsets", "toucannon").learnset.flash = ["8M"];
		this.modData("Learnsets", "toucannon").learnset.hurricane = ["8M"];
		delete this.modData('Learnsets', 'toucannon').learnset.toxic;
		// Yungoos
		this.modData("Learnsets", "yungoos").learnset.rage = ["8D"];
		this.modData("Learnsets", "yungoos").learnset.assurance = ["8M"];
		this.modData("Learnsets", "yungoos").learnset.chipaway = ["8M"];
		this.modData("Learnsets", "yungoos").learnset.honeclaws = ["8M"];
		this.modData("Learnsets", "yungoos").learnset.retaliate = ["8M"];
		this.modData("Learnsets", "yungoos").learnset.screech = ["8M"];
		this.modData("Learnsets", "yungoos").learnset.strength = ["8M"];
		delete this.modData('Learnsets', 'yungoos').learnset.toxic;
		// Gumshoos
		this.modData("Learnsets", "gumshoos").learnset.nastyplot = ["8D"];
		this.modData("Learnsets", "gumshoos").learnset.assurance = ["8M"];
		this.modData("Learnsets", "gumshoos").learnset.chipaway = ["8M"];
		this.modData("Learnsets", "gumshoos").learnset.honeclaws = ["8M"];
		this.modData("Learnsets", "gumshoos").learnset.retaliate = ["8M"];
		this.modData("Learnsets", "gumshoos").learnset.screech = ["8M"];
		this.modData("Learnsets", "gumshoos").learnset.strength = ["8M"];
		delete this.modData('Learnsets', 'gumshoos').learnset.toxic;
		// Grubbin
		this.modData("Learnsets", "grubbin").learnset.thunderfang = ["8D"];
		delete this.modData('Learnsets', 'grubbin').learnset.toxic;
		// Charjabug
		this.modData("Learnsets", "charjabug").learnset.thunderfang = ["8D"];
		this.modData("Learnsets", "charjabug").learnset.flash = ["8M"];
		delete this.modData('Learnsets', 'charjabug').learnset.toxic;
		// Vikavolt
		this.modData("Learnsets", "vikavolt").learnset.thunderfang = ["8D"];
		this.modData("Learnsets", "vikavolt").learnset.flash = ["8M"];
		delete this.modData('Learnsets', 'vikavolt').learnset.toxic;
		// Crabrawler
		this.modData("Learnsets", "crabrawler").learnset.counter = ["8D"];
		this.modData("Learnsets", "crabrawler").learnset.chipaway = ["8M"];
		this.modData("Learnsets", "crabrawler").learnset.hammerarm = ["8E"];
		this.modData("Learnsets", "crabrawler").learnset.rockclimb = ["8M"];
		this.modData("Learnsets", "crabrawler").learnset.strength = ["8M"];
		delete this.modData('Learnsets', 'crabrawler').learnset.toxic;
		// Crabominable
		this.modData("Learnsets", "crabominable").learnset.thrash = ["8D"];
		this.modData("Learnsets", "crabominable").learnset.bodypress = ["8M"];
		this.modData("Learnsets", "crabominable").learnset.chipaway = ["8M"];
		this.modData("Learnsets", "crabominable").learnset.rockclimb = ["8M"];
		this.modData("Learnsets", "crabominable").learnset.strength = ["8M"];
		delete this.modData('Learnsets', 'crabominable').learnset.toxic;
		// Oricorio Pom-Pom
		this.modData("Learnsets", "oricoriopompom").learnset.boltbeak = ["8D"];
		this.modData("Learnsets", "oricoriopompom").learnset.flash = ["8M"];
		delete this.modData('Learnsets', 'oricoriopompom').learnset.quash;
		delete this.modData("Learnsets", "oricoriopompom").learnset.fierydance;
		delete this.modData('Learnsets', 'oricoriopompom').learnset.toxic;
		// Oricorio Pau
		this.modData("Learnsets", "oricoriopau").learnset.stasis = ["8D"];
		this.modData("Learnsets", "oricoriopau").learnset.flash = ["8M"];
		delete this.modData("Learnsets", "oricoriopau").learnset.fierydance;
		delete this.modData('Learnsets', 'oricoriopau').learnset.quash;
		delete this.modData('Learnsets', 'oricoriopau').learnset.toxic;
		// Oricorio Baile
		this.modData("Learnsets", "oricorio").learnset.fierydance = ["8D"];
		this.modData("Learnsets", "oricorio").learnset.flash = ["8M"];
		delete this.modData('Learnsets', 'oricorio').learnset.quash;
		delete this.modData('Learnsets', 'oricorio').learnset.toxic;
		// Oricorio Sensu
		this.modData("Learnsets", "oricoriosensu").learnset.midnight = ["8D"];
		this.modData("Learnsets", "oricoriosensu").learnset.flash = ["8M"];
		delete this.modData("Learnsets", "oricoriosensu").learnset.fierydance;
		delete this.modData('Learnsets', 'oricoriosensu').learnset.quash;
		delete this.modData('Learnsets', 'oricoriosensu').learnset.toxic;
		// Cutiefly
		this.modData("Learnsets", "cutiefly").learnset.mindreader = ["8D"];
		this.modData("Learnsets", "cutiefly").learnset.bugcloud = ["8L1"];
		this.modData("Learnsets", "cutiefly").learnset.flash = ["8M"];
		this.modData("Learnsets", "cutiefly").learnset.naturalgift = ["8M"];
		this.modData("Learnsets", "cutiefly").learnset.stringshot = ["8M"];
		delete this.modData('Learnsets', 'cutiefly').learnset.absorb;
		delete this.modData('Learnsets', 'cutiefly').learnset.toxic;
		// Ribombee
		this.modData("Learnsets", "ribombee").learnset.mindreader = ["8D"];
		this.modData("Learnsets", "ribombee").learnset.bugcloud = ["8L1"];
		this.modData("Learnsets", "ribombee").learnset.flash = ["8M"];
		this.modData("Learnsets", "ribombee").learnset.naturalgift = ["8M"];
		this.modData("Learnsets", "ribombee").learnset.stringshot = ["8M"];
		delete this.modData('Learnsets', 'ribombee').learnset.absorb;
		delete this.modData('Learnsets', 'ribombee').learnset.toxic;
		// Rockruff
		this.modData("Learnsets", "rockruff").learnset.playnice = ["8D"];
		this.modData("Learnsets", "rockruff").learnset.charm = ["8M"];
		delete this.modData('Learnsets', 'rockruff').learnset.tantrum;
		delete this.modData('Learnsets', 'rockruff').learnset.toxic;
		// Lycanroc Midday
		this.modData("Learnsets", "lycanroc").learnset.morningsun = ["8D"];
		this.modData("Learnsets", "lycanroc").learnset.aquatail = ["8M"];
		this.modData("Learnsets", "lycanroc").learnset.flash = ["8M"];
		this.modData("Learnsets", "lycanroc").learnset.retaliate = ["8M"];
		delete this.modData('Learnsets', 'lycanroc').learnset.toxic;
		// Lycanroc Midnight
		this.modData("Learnsets", "lycanrocmidnight").learnset.moonlight = ["8D"];
		this.modData("Learnsets", "lycanrocmidnight").learnset.assurance = ["8M"];
		this.modData("Learnsets", "lycanrocmidnight").learnset.avalanche = ["8M"];
		this.modData("Learnsets", "lycanrocmidnight").learnset.strength = ["8M"];
		delete this.modData('Learnsets', 'lycanrocmidnight').learnset.toxic;
		// Lycanroc Twilight
		this.modData("Learnsets", "lycanroctwilight").learnset.wish = ["8D"];
		this.modData("Learnsets", "lycanroctwilight").learnset.crushclaw = ["8L0"];
		this.modData("Learnsets", "lycanroctwilight").learnset.aquatail = ["8M"];
		this.modData("Learnsets", "lycanroctwilight").learnset.avalanche = ["8M"];
		this.modData("Learnsets", "lycanroctwilight").learnset.assurance = ["8M"];
		this.modData("Learnsets", "lycanroctwilight").learnset.strength = ["8M"];
		delete this.modData('Learnsets', 'lycanroctwilight').learnset.thrash;
		delete this.modData('Learnsets', 'lycanroctwilight').learnset.toxic;
		// Wishiwashi
		this.modData("Learnsets", "wishiwashi").learnset.memento = ["8D"];
		this.modData("Learnsets", "wishiwashi").learnset.flash = ["8M"];
		delete this.modData('Learnsets', 'wishiwashi').learnset.toxic;
		// Mareanie
		this.modData("Learnsets", "mareanie").learnset.lashout = ["8D"];
		// Toxapex
		this.modData("Learnsets", "toxapex").learnset.lashout = ["8D"];
		// Mudbray
		this.modData("Learnsets", "mudbray").learnset.slackoff = ["8D"];
		this.modData("Learnsets", "mudbray").learnset.rockclimb = ["8M"];
		this.modData("Learnsets", "mudbray").learnset.tussle = ["8E"];
		delete this.modData('Learnsets', 'mudbray').learnset.toxic;
		// Mudsdale
		this.modData("Learnsets", "mudsdale").learnset.slackoff = ["8D"];
		this.modData("Learnsets", "mudsdale").learnset.rockclimb = ["8M"];
		delete this.modData('Learnsets', 'mudsdale').learnset.toxic;
		// Dewpider
		this.modData("Learnsets", "dewpider").learnset.acidarmor = ["8D"];
		this.modData("Learnsets", "dewpider").learnset.leechlife = ["8L13"];
		this.modData("Learnsets", "dewpider").learnset.bugbite = ["8L21","8M"];
		this.modData("Learnsets", "dewpider").learnset.vitaldrain = ["8L29","8M"];
		this.modData("Learnsets", "dewpider").learnset.dive = ["8L32","8M"];
		this.modData("Learnsets", "dewpider").learnset.stringshot = ["8M"];
		delete this.modData('Learnsets', 'dewpider').learnset.bite;
		delete this.modData('Learnsets', 'dewpider').learnset.toxic;
		// Araquanid
		this.modData("Learnsets", "araquanid").learnset.acidarmor = ["8D"];
		this.modData("Learnsets", "araquanid").learnset.leechlife = ["8L13"];
		this.modData("Learnsets", "araquanid").learnset.bugbite = ["8L21","8M"];
		this.modData("Learnsets", "araquanid").learnset.vitaldrain = ["8L33","8M"];
		this.modData("Learnsets", "araquanid").learnset.dive = ["8L38","8M"];
		this.modData("Learnsets", "araquanid").learnset.stringshot = ["8M"];
		delete this.modData('Learnsets', 'araquanid').learnset.bite;
		delete this.modData('Learnsets', 'araquanid').learnset.toxic;
		// Fomantis
		this.modData("Learnsets", "fomantis").learnset.copycat = ["8D"];
		this.modData("Learnsets", "fomantis").learnset.naturalgift = ["8M"];
		this.modData("Learnsets", "fomantis").learnset.retaliate = ["8M"];
		this.modData("Learnsets", "fomantis").learnset.vitaldrain = ["8M"];
		delete this.modData('Learnsets', 'fomantis').learnset.leechlife;
		delete this.modData('Learnsets', 'fomantis').learnset.toxic;
		// Lurantis
		this.modData("Learnsets", "lurantis").learnset.copycat = ["8D"];
		this.modData("Learnsets", "lurantis").learnset.naturalgift = ["8M"];
		this.modData("Learnsets", "lurantis").learnset.retaliate = ["8M"];
		this.modData("Learnsets", "lurantis").learnset.vitaldrain = ["8M"];
		delete this.modData('Learnsets', 'lurantis').learnset.leechlife;
		delete this.modData('Learnsets', 'lurantis').learnset.toxic;
		// Morelull
		this.modData("Learnsets", "morelull").learnset.magicpowder = ["8D"];
		this.modData("Learnsets", "morelull").learnset.flash = ["8L1", "8M"];
		this.modData("Learnsets", "morelull").learnset.naturalgift = ["8M"];
		this.modData("Learnsets", "morelull").learnset.nightmare = ["8M"];
		delete this.modData('Learnsets', 'morelull').learnset.toxic;
		// Shiinotic
		this.modData("Learnsets", "shiinotic").learnset.magicpowder = ["8D"];
		this.modData("Learnsets", "shiinotic").learnset.flash = ["8L1", "8M"];
		this.modData("Learnsets", "shiinotic").learnset.naturalgift = ["8M"];
		this.modData("Learnsets", "shiinotic").learnset.nightmare = ["8M"];
		delete this.modData('Learnsets', 'shiinotic').learnset.toxic;
		// Salandit
		this.modData("Learnsets", "salandit").learnset.firelash = ["8D"];
		this.modData("Learnsets", "salandit").learnset.flash = ["8M"];
		delete this.modData('Learnsets', 'salandit').learnset.leechlife;
		// Salazzle
		this.modData("Learnsets", "salazzle").learnset.firelash = ["8D"];
		this.modData("Learnsets", "salazzle").learnset.flash = ["8M"];
		delete this.modData('Learnsets', 'salazzle').learnset.leechlife;
		// Stufful
		this.modData("Learnsets", "stufful").learnset.focuspunch = ["8D"];
		this.modData("Learnsets", "stufful").learnset.megapunch = ["8E"];
		this.modData("Learnsets", "stufful").learnset.rockclimb = ["8M"];
		delete this.modData('Learnsets', 'stufful').learnset.toxic;
		// Bewear
		this.modData("Learnsets", "bewear").learnset.focuspunch = ["8D"];
		this.modData("Learnsets", "bewear").learnset.rockclimb = ["8M"];
		delete this.modData('Learnsets', 'bewear').learnset.toxic;
		// Bounsweet
		this.modData("Learnsets", "bounsweet").learnset.followme = ["8D"];
		this.modData("Learnsets", "bounsweet").learnset.naturalgift = ["8M"];
		delete this.modData('Learnsets', 'bounsweet').learnset.bounce;
		delete this.modData('Learnsets', 'bounsweet').learnset.toxic;
		// Steenee
		this.modData("Learnsets", "steenee").learnset.followme = ["8D"];
		this.modData("Learnsets", "steenee").learnset.naturalgift = ["8M"];
		delete this.modData('Learnsets', 'steenee').learnset.bounce;
		delete this.modData('Learnsets', 'steenee').learnset.toxic;
		// Tsareena
		this.modData("Learnsets", "tsareena").learnset.followme = ["8D"];
		this.modData("Learnsets", "tsareena").learnset.naturalgift = ["8M"];
		delete this.modData('Learnsets', 'tsareena').learnset.bounce;
		delete this.modData('Learnsets', 'tsareena').learnset.toxic;
		// Comfey
		this.modData("Learnsets", "comfey").learnset.aromaticmist = ["8D"];
		delete this.modData('Learnsets', 'comfey').learnset.toxic;
		// Oranguru
		this.modData("Learnsets", "oranguru").learnset.aerate = ["8D"];
		this.modData("Learnsets", "oranguru").learnset.naturalgift = ["8M"];
		delete this.modData('Learnsets', 'oranguru').learnset.toxic;
		// Passimian
		this.modData("Learnsets", "passimian").learnset.barrage = ["8D"];
		this.modData("Learnsets", "passimian").learnset.courtchange = ["8E"];
		this.modData("Learnsets", "passimian").learnset.rockclimb = ["8M"];
		this.modData("Learnsets", "passimian").learnset.strength = ["8M"];
		delete this.modData('Learnsets', 'passimian').learnset.toxic;
		// Wimpod
		this.modData("Learnsets", "wimpod").learnset.holdback = ["8D"];
		this.modData("Learnsets", "wimpod").learnset.vitaldrain = ["8M"];
		delete this.modData('Learnsets', 'wimpod').learnset.leechlife;
		delete this.modData('Learnsets', 'wimpod').learnset.toxic;
		// Golisopod
		this.modData("Learnsets", "golisopod").learnset.holdback = ["8D"];
		this.modData("Learnsets", "golisopod").learnset.rockclimb = ["8M"];
		this.modData("Learnsets", "golisopod").learnset.strength = ["8M"];
		this.modData("Learnsets", "golisopod").learnset.vitaldrain = ["8M"];
		delete this.modData('Learnsets', 'golisopod').learnset.leechlife;
		delete this.modData('Learnsets', 'golisopod').learnset.toxic;
		// Sandygast
		this.modData("Learnsets", "sandygast").learnset.imprison = ["8D"];
		this.modData("Learnsets", "sandygast").learnset.nightmare = ["8M"];
		delete this.modData('Learnsets', 'sandygast').learnset.toxic;
		// Palossand
		this.modData("Learnsets", "palossand").learnset.imprison = ["8D"];
		this.modData("Learnsets", "palossand").learnset.nightmare = ["8M"];
		delete this.modData('Learnsets', 'palossand').learnset.toxic;
		// Pyukumuku
		this.modData("Learnsets", "pyukumuku").learnset.slipaway = ["8D"];
		delete this.modData('Learnsets', 'pyukumuku').learnset.quash;
		// Type: Null
		this.modData("Learnsets", "typenull").learnset.trumpcard = ["8D"];
		this.modData("Learnsets", "typenull").learnset.honeclaws = ["8M"];
		this.modData("Learnsets", "typenull").learnset.retaliate = ["8M"];
		this.modData("Learnsets", "typenull").learnset.rockclimb = ["8M"];
		this.modData("Learnsets", "typenull").learnset.strength = ["8M"];
		// Silvally
		this.modData("Learnsets", "silvally").learnset.trumpcard = ["8D"];
		this.modData("Learnsets", "silvally").learnset.flash = ["8M"];
		this.modData("Learnsets", "silvally").learnset.honeclaws = ["8M"];
		this.modData("Learnsets", "silvally").learnset.retaliate = ["8M"];
		this.modData("Learnsets", "silvally").learnset.rockclimb = ["8M"];
		this.modData("Learnsets", "silvally").learnset.strength = ["8M"];
		delete this.modData('Learnsets', 'silvally').learnset.firepledge;
		delete this.modData('Learnsets', 'silvally').learnset.grasspledge;
		delete this.modData('Learnsets', 'silvally').learnset.waterpledge;
		// Minior
		this.modData("Learnsets", "minior").learnset.accelerock = ["8D"];
		this.modData("Learnsets", "minior").learnset.flash = ["8M"];
		this.modData("Learnsets", "minior").learnset.fullcollide = ["8M"];
		this.modData("Learnsets", "minior").learnset.meteorbeam = ["8T"];
		delete this.modData('Learnsets', 'minior').learnset.attract;
		delete this.modData('Learnsets', 'minior').learnset.toxic;
		// Komala
		this.modData("Learnsets", "komala").learnset.playdead = ["8D"];
		this.modData("Learnsets", "komala").learnset.amnesia = ["8M"];
		delete this.modData('Learnsets', 'komala').learnset.quash;
		delete this.modData('Learnsets', 'komala').learnset.toxic;
		// Turtonator
		this.modData("Learnsets", "turtonator").learnset.blastburn = ["8D"];
		this.modData("Learnsets", "turtonator").learnset.flash = ["8M"];
		this.modData("Learnsets", "turtonator").learnset.fullcollide = ["8M"];
		this.modData("Learnsets", "turtonator").learnset.rockclimb = ["8M"];
		this.modData("Learnsets", "turtonator").learnset.strength = ["8M"];
		delete this.modData('Learnsets', 'turtonator').learnset.toxic;
		// Togedemaru
		this.modData("Learnsets", "togedemaru").learnset.paraboliccharge = ["8D"];
		this.modData("Learnsets", "togedemaru").learnset.flash = ["8M"];
		delete this.modData('Learnsets', 'togedemaru').learnset.bounce;
		delete this.modData('Learnsets', 'togedemaru').learnset.toxic;
		// Mimikyu
		this.modData("Learnsets", "mimikyu").learnset.woodhammer = ["8D"];
		this.modData("Learnsets", "mimikyu").learnset.swing = ["8L1"];
		delete this.modData('Learnsets', 'mimikyu').learnset.toxic;
		delete this.modData('Learnsets', 'mimikyu').learnset.woodhammer;
		// Bruxish
		this.modData("Learnsets", "bruxish").learnset.hypnosis = ["8D"];
		this.modData("Learnsets", "bruxish").learnset.whitewater = ["8L1"];
		this.modData("Learnsets", "bruxish").learnset.mindbend = ["8L9"];
		this.modData("Learnsets", "bruxish").learnset.brine = ["8M"];
		this.modData("Learnsets", "bruxish").learnset.flash = ["8M"];
		this.modData("Learnsets", "bruxish").learnset.futuresight = ["8M"];
		this.modData("Learnsets", "bruxish").learnset.nightmare = ["8M"];
		this.modData("Learnsets", "bruxish").learnset.whirlpool = ["8M"];
		delete this.modData('Learnsets', 'bruxish').learnset.confusion;
		delete this.modData('Learnsets', 'bruxish').learnset.toxic;
		delete this.modData('Learnsets', 'bruxish').learnset.watergun;
		// Drampa
		this.modData("Learnsets", "drampa").learnset.rage = ["8D"];
		this.modData("Learnsets", "drampa").learnset.fellswoop = ["8E"];
		this.modData("Learnsets", "drampa").learnset.strength = ["8M"];
		delete this.modData('Learnsets', 'drampa').learnset.toxic;
		// Dhelmise
		this.modData("Learnsets", "dhelmise").learnset.wringout = ["8D"];
		this.modData("Learnsets", "dhelmise").learnset.nightmare = ["8M"];
		this.modData("Learnsets", "dhelmise").learnset.strength = ["8M"];
		delete this.modData('Learnsets', 'dhelmise').learnset.attract;
		delete this.modData('Learnsets', 'dhelmise').learnset.toxic;
		// Jangmo-o
		this.modData("Learnsets", "jangmoo").learnset.metalsound = ["8D"];
		this.modData("Learnsets", "jangmoo").learnset.flash = ["8M"];
		this.modData("Learnsets", "jangmoo").learnset.fullcollide = ["8M"];
		this.modData("Learnsets", "jangmoo").learnset.strength = ["8M"];
		delete this.modData('Learnsets', 'jangmoo').learnset.toxic;
		// Hakamo-o
		this.modData("Learnsets", "hakamoo").learnset.dizzypunch = ["8D"];
		this.modData("Learnsets", "hakamoo").learnset.flash = ["8M"];
		this.modData("Learnsets", "hakamoo").learnset.fullcollide = ["8M"];
		this.modData("Learnsets", "hakamoo").learnset.retaliate = ["8M"];
		this.modData("Learnsets", "hakamoo").learnset.rockclimb = ["8M"];
		this.modData("Learnsets", "hakamoo").learnset.strength = ["8M"];
		delete this.modData('Learnsets', 'hakamoo').learnset.toxic;
		// Kommo-o
		this.modData("Learnsets", "kommoo").learnset.dizzypunch = ["8D"];
		this.modData("Learnsets", "kommoo").learnset.flash = ["8M"];
		this.modData("Learnsets", "kommoo").learnset.fullcollide = ["8M"];
		this.modData("Learnsets", "kommoo").learnset.retaliate = ["8M"];
		this.modData("Learnsets", "kommoo").learnset.rockclimb = ["8M"];
		this.modData("Learnsets", "kommoo").learnset.strength = ["8M"];
		delete this.modData('Learnsets', 'kommoo').learnset.toxic;
		// Tapu Koko
		this.modData("Learnsets", "tapukoko").learnset.aeroblast = ["8D"];
		this.modData("Learnsets", "tapukoko").learnset.flash = ["8M"];
		this.modData("Learnsets", "tapukoko").learnset.fullcollide = ["8M"];
		this.modData("Learnsets", "tapukoko").learnset.naturalgift = ["8M"];
		this.modData("Learnsets", "tapukoko").learnset.retaliate = ["8M"];
		this.modData("Learnsets", "tapukoko").learnset.strength = ["8M"];
		delete this.modData('Learnsets', 'tapukoko').learnset.toxic;
		// Tapu Lele
		this.modData("Learnsets", "tapulele").learnset.lunardance = ["8D"];
		this.modData("Learnsets", "tapulele").learnset.flash = ["8M"];
		this.modData("Learnsets", "tapulele").learnset.fullcollide = ["8M"];
		this.modData("Learnsets", "tapulele").learnset.naturalgift = ["8M"];
		this.modData("Learnsets", "tapulele").learnset.nightmare = ["8M"];
		this.modData("Learnsets", "tapulele").learnset.retaliate = ["8M"];
		delete this.modData('Learnsets', 'tapulele').learnset.toxic;
		// Tapu Bulu
		this.modData("Learnsets", "tapubulu").learnset.landswrath = ["8D"];
		this.modData("Learnsets", "tapubulu").learnset.avalanche = ["8M"];
		this.modData("Learnsets", "tapubulu").learnset.fullcollide = ["8M"];
		this.modData("Learnsets", "tapubulu").learnset.naturalgift = ["8M"];
		this.modData("Learnsets", "tapubulu").learnset.retaliate = ["8M"];
		this.modData("Learnsets", "tapubulu").learnset.rockclimb = ["8M"];
		this.modData("Learnsets", "tapubulu").learnset.strength = ["8M"];
		delete this.modData('Learnsets', 'tapubulu').learnset.toxic;
		// Tapu Fini
		this.modData("Learnsets", "tapufini").learnset.originpulse = ["8D"];
		this.modData("Learnsets", "tapufini").learnset.dive = ["8M"];
		this.modData("Learnsets", "tapufini").learnset.fullcollide = ["8M"];
		this.modData("Learnsets", "tapufini").learnset.futuresight = ["8M"];
		this.modData("Learnsets", "tapufini").learnset.naturalgift = ["8M"];
		this.modData("Learnsets", "tapufini").learnset.nightmare = ["8M"];
		this.modData("Learnsets", "tapufini").learnset.retaliate = ["8M"];
		delete this.modData('Learnsets', 'tapufini').learnset.toxic;
		// Solgaleo
		this.modData("Learnsets", "solgaleo").learnset.miracleeye = ["8D"];
		this.modData("Learnsets", "solgaleo").learnset.mindbend = ["8L1"];
		this.modData("Learnsets", "solgaleo").learnset.metalclaw = ["8L7"];
		this.modData("Learnsets", "solgaleo").learnset.ironhead = ["8L23", "8M"];
		this.modData("Learnsets", "solgaleo").learnset.flash = ["8M"];
		this.modData("Learnsets", "solgaleo").learnset.flashcannon = ["8M"];
		this.modData("Learnsets", "solgaleo").learnset.nightmare = ["8M"];
		this.modData("Learnsets", "solgaleo").learnset.rockclimb = ["8M"];
		this.modData("Learnsets", "solgaleo").learnset.strength = ["8M"];
		delete this.modData('Learnsets', 'solgaleo').learnset.toxic;
		// Lunala
		this.modData("Learnsets", "lunala").learnset.miracleeye = ["8D"];
		this.modData("Learnsets", "lunala").learnset.psychic = ["8L19", "8M"];
		this.modData("Learnsets", "lunala").learnset.doubleteam = ["8L59"];
		this.modData("Learnsets", "lunala").learnset.dreameater = ["8L61", "8M"];
		this.modData("Learnsets", "lunala").learnset.flash = ["8M"];
		this.modData("Learnsets", "lunala").learnset.nightmare = ["8M"];
		delete this.modData('Learnsets', 'lunala').learnset.airslash;
		delete this.modData('Learnsets', 'lunala').learnset.toxic;
		// Nihilego
		this.modData("Learnsets", "nihilego").learnset.acidarmor = ["8D"];
		this.modData("Learnsets", "nihilego").learnset.dive = ["8M"];
		this.modData("Learnsets", "nihilego").learnset.flash = ["8M"];
		this.modData("Learnsets", "nihilego").learnset.meteorbeam = ["8M"];
		// Buzzwole
		this.modData("Learnsets", "buzzwole").learnset.skyuppercut = ["8D"];
		this.modData("Learnsets", "buzzwole").learnset.bodypress = ["8M"];
		this.modData("Learnsets", "buzzwole").learnset.rockclimb = ["8M"];
		this.modData("Learnsets", "buzzwole").learnset.strength = ["8M"];
		delete this.modData('Learnsets', 'buzzwole').learnset.toxic;
		// Pheromosa
		this.modData("Learnsets", "pheromosa").learnset.playdead = ["8D"];
		this.modData("Learnsets", "pheromosa").learnset.faketears = ["8M"];
		this.modData("Learnsets", "pheromosa").learnset.rockclimb = ["8M"];
		delete this.modData('Learnsets', 'pheromosa').learnset.toxic;
		// Xurkitree
		this.modData("Learnsets", "xurkitree").learnset.paraboliccharge = ["8D"];
		this.modData("Learnsets", "xurkitree").learnset.flash = ["8M"];
		delete this.modData('Learnsets', 'xurkitree').learnset.toxic;
		// Celesteela
		this.modData("Learnsets", "celesteela").learnset.heatcrash = ["8D"];
		this.modData("Learnsets", "celesteela").learnset.bodypress = ["8M"];
		this.modData("Learnsets", "celesteela").learnset.flash = ["8M"];
		delete this.modData('Learnsets', 'celesteela').learnset.toxic;
		// Kartana
		this.modData("Learnsets", "kartana").learnset.sharpen = ["8D"];
		this.modData("Learnsets", "kartana").learnset.retaliate = ["8M"];
		delete this.modData('Learnsets', 'kartana').learnset.toxic;
		// Guzzlord
		this.modData("Learnsets", "guzzlord").learnset.dragonbreath = ["8D"];
		this.modData("Learnsets", "guzzlord").learnset.avalanche = ["8M"];
		this.modData("Learnsets", "guzzlord").learnset.breakingswipe = ["8M"];
		this.modData("Learnsets", "guzzlord").learnset.compensation = ["8M"];
		this.modData("Learnsets", "guzzlord").learnset.hex = ["8M"];
		this.modData("Learnsets", "guzzlord").learnset.nightmare = ["8M"];
		this.modData("Learnsets", "guzzlord").learnset.rockclimb = ["8M"];
		this.modData("Learnsets", "guzzlord").learnset.strength = ["8M"];
		delete this.modData('Learnsets', 'guzzlord').learnset.toxic;
		// Necrozma
		this.modData("Learnsets", "necrozma").learnset.midnight = ["8D"];
		this.modData("Learnsets", "necrozma").learnset.mindbend = ["8L1"];
		this.modData("Learnsets", "necrozma").learnset.rockblast = ["8L7"];
		this.modData("Learnsets", "necrozma").learnset.stealthrock = ["8L13", "8M"];
		this.modData("Learnsets", "necrozma").learnset.psychocut = ["8L19"];
		this.modData("Learnsets", "necrozma").learnset.storedpower = ["8L23"];
		this.modData("Learnsets", "necrozma").learnset.nightslash = ["8L37"];
		this.modData("Learnsets", "necrozma").learnset.autotomize = ["8L43"];
		this.modData("Learnsets", "necrozma").learnset.powergem = ["8L47", "8M"];
		this.modData("Learnsets", "necrozma").learnset.photongeyser = ["8L53"];
		this.modData("Learnsets", "necrozma").learnset.flash = ["8M"];
		this.modData("Learnsets", "necrozma").learnset.nightmare = ["8M"];
		this.modData("Learnsets", "necrozma").learnset.painsplit = ["8M"];
		delete this.modData('Learnsets', 'necrozma').learnset.slash;
		delete this.modData('Learnsets', 'necrozma').learnset.toxic;
		// Necrozma Dusk Mane
		this.modData("Learnsets", "necrozmaduskmane").learnset.flareblitz = ["8D"];
		this.modData("Learnsets", "necrozmaduskmane").learnset.mindbend = ["8L1"];
		this.modData("Learnsets", "necrozmaduskmane").learnset.rockblast = ["8L7"];
		this.modData("Learnsets", "necrozmaduskmane").learnset.stealthrock = ["8L13", "8M"];
		this.modData("Learnsets", "necrozmaduskmane").learnset.psychocut = ["8L19"];
		this.modData("Learnsets", "necrozmaduskmane").learnset.storedpower = ["8L23"];
		this.modData("Learnsets", "necrozmaduskmane").learnset.nightslash = ["8L23"];
		this.modData("Learnsets", "necrozmaduskmane").learnset.autotomize = ["8L43"];
		this.modData("Learnsets", "necrozmaduskmane").learnset.powergem = ["8L47"];
		this.modData("Learnsets", "necrozmaduskmane").learnset.photongeyser = ["8L53"];
		this.modData("Learnsets", "necrozmaduskmane").learnset.flash = ["8M"];
		this.modData("Learnsets", "necrozmaduskmane").learnset.nightmare = ["8M"];
		this.modData("Learnsets", "necrozmaduskmane").learnset.painsplit = ["8M"];
		delete this.modData('Learnsets', 'necrozmaduskmane').learnset.slash;
		delete this.modData('Learnsets', 'necrozmaduskmane').learnset.toxic;
		// Necrozma Dawn Wings
		this.modData("Learnsets", "necrozmadawnwings").learnset.moonblast = ["8D"];
		this.modData("Learnsets", "necrozmadawnwings").learnset.mindbend = ["8L1"];
		this.modData("Learnsets", "necrozmadawnwings").learnset.rockblast = ["8L7"];
		this.modData("Learnsets", "necrozmadawnwings").learnset.stealthrock = ["8L13", "8M"];
		this.modData("Learnsets", "necrozmadawnwings").learnset.psychocut = ["8L19"];
		this.modData("Learnsets", "necrozmadawnwings").learnset.storedpower = ["8L23"];
		this.modData("Learnsets", "necrozmadawnwings").learnset.nightslash = ["8L23"];
		this.modData("Learnsets", "necrozmadawnwings").learnset.autotomize = ["8L43"];
		this.modData("Learnsets", "necrozmadawnwings").learnset.powergem = ["8L47"];
		this.modData("Learnsets", "necrozmadawnwings").learnset.photongeyser = ["8L53"];
		this.modData("Learnsets", "necrozmadawnwings").learnset.flash = ["8M"];
		this.modData("Learnsets", "necrozmadawnwings").learnset.nightmare = ["8M"];
		this.modData("Learnsets", "necrozmadawnwings").learnset.painsplit = ["8M"];
		delete this.modData('Learnsets', 'necrozmadawnwings').learnset.slash;
		delete this.modData('Learnsets', 'necrozmadawnwings').learnset.toxic;
		// Magearna
		this.modData("Learnsets", "magearna").learnset.teeterdance = ["8D"];
		this.modData("Learnsets", "magearna").learnset.flash = ["8M"];
		delete this.modData('Learnsets', 'magearna').learnset.toxic;
		// Magearna Original
		this.modData("Learnsets", "magearnaoriginal").learnset = this.modData("Learnsets", "magearna").learnset;
		// Marshadow
		this.modData("Learnsets", "marshadow").learnset.mimic = ["8D"];
		this.modData("Learnsets", "marshadow").learnset.rockclimb = ["8M"];
		this.modData("Learnsets", "marshadow").learnset.strength = ["8M"];
		delete this.modData('Learnsets', 'marshadow').learnset.toxic;
		// Poipole
		this.modData("Learnsets", "poipole").learnset.toxicthread = ["8D"];
		this.modData("Learnsets", "poipole").learnset.nightmare = ["8M"];
		// Naganadel
		this.modData("Learnsets", "naganadel").learnset.toxicthread = ["8D"];
		this.modData("Learnsets", "naganadel").learnset.nightmare = ["8M"];
		// Stakataka
		this.modData("Learnsets", "stakataka").learnset.minimize = ["8D"];
		this.modData("Learnsets", "stakataka").learnset.rockclimb = ["8M"];
		this.modData("Learnsets", "stakataka").learnset.strength = ["8M"];
		delete this.modData('Learnsets', 'stakataka').learnset.toxic;
		// Blacephalon
		this.modData("Learnsets", "blacephalon").learnset.teeterdance = ["8D"];
		this.modData("Learnsets", "blacephalon").learnset.flash = ["8M"];
		this.modData("Learnsets", "blacephalon").learnset.nightmare = ["8M"];
		delete this.modData('Learnsets', 'blacephalon').learnset.quash;
		delete this.modData('Learnsets', 'blacephalon').learnset.toxic;
		// Zeraora
		this.modData("Learnsets", "zeraora").learnset.aurasphere = ["8D"];
		this.modData("Learnsets", "zeraora").learnset.flash = ["8M"];
		this.modData("Learnsets", "zeraora").learnset.retaliate = ["8M"];
		this.modData("Learnsets", "zeraora").learnset.rockclimb = ["8M"];
		this.modData("Learnsets", "zeraora").learnset.strength = ["8M"];
		delete this.modData('Learnsets', 'zeraora').learnset.toxic;
		// Meltan
		this.modData("Learnsets", "meltan").learnset.charge = ["8D"];
		this.modData("Learnsets", "meltan").learnset.chargebeam = ["8M"];
		this.modData("Learnsets", "meltan").learnset.eerieimpulse = ["8M"];
		this.modData("Learnsets", "meltan").learnset.flash = ["8M"];
		this.modData("Learnsets", "meltan").learnset.magiccoat = ["8M"];
		this.modData("Learnsets", "meltan").learnset.recycle = ["8M"];
		this.modData("Learnsets", "meltan").learnset.shockwave = ["8M"];
		// Melmetal
		this.modData("Learnsets", "melmetal").learnset.charge = ["8D"];
		this.modData("Learnsets", "melmetal").learnset.avalanche = ["8M"];
		this.modData("Learnsets", "melmetal").learnset.chargebeam = ["8M"];
		this.modData("Learnsets", "melmetal").learnset.eerieimpulse = ["8M"];
		this.modData("Learnsets", "melmetal").learnset.flash = ["8M"];
		this.modData("Learnsets", "melmetal").learnset.gravity = ["8M"];
		this.modData("Learnsets", "melmetal").learnset.magiccoat = ["8M"];
		this.modData("Learnsets", "melmetal").learnset.recycle = ["8M"];
		this.modData("Learnsets", "melmetal").learnset.rockclimb = ["8M"];
		this.modData("Learnsets", "melmetal").learnset.shockwave = ["8M"];
		this.modData("Learnsets", "melmetal").learnset.strength = ["8M"];
		// Grookey
		this.modData("Learnsets", "grookey").learnset.dizzypunch = ["8D"];
		this.modData("Learnsets", "grookey").learnset.chipaway = ["8M"];
		this.modData("Learnsets", "grookey").learnset.echoedvoice = ["8M"];
		this.modData("Learnsets", "grookey").learnset.naturalgift = ["8M"];
		this.modData("Learnsets", "grookey").learnset.naturepower = ["8M"];
		this.modData("Learnsets", "grookey").learnset.rockclimb = ["8M"];
		this.modData("Learnsets", "grookey").learnset.rocksmash = ["8M"];
		this.modData("Learnsets", "grookey").learnset.strength = ["8M"];
		// Thwackey
		this.modData("Learnsets", "thwackey").learnset.dizzypunch = ["8D"];
		this.modData("Learnsets", "thwackey").learnset.chipaway = ["8M"];
		this.modData("Learnsets", "thwackey").learnset.dualchop = ["8M"];
		this.modData("Learnsets", "thwackey").learnset.echoedvoice = ["8M"];
		this.modData("Learnsets", "thwackey").learnset.naturalgift = ["8M"];
		this.modData("Learnsets", "thwackey").learnset.naturepower = ["8M"];
		this.modData("Learnsets", "thwackey").learnset.rockclimb = ["8M"];
		this.modData("Learnsets", "thwackey").learnset.rocksmash = ["8M"];
		this.modData("Learnsets", "thwackey").learnset.strength = ["8M"];
		// Rillaboom
		this.modData("Learnsets", "rillaboom").learnset.dizzypunch = ["8D"];
		this.modData("Learnsets", "rillaboom").learnset.chipaway = ["8M"];
		this.modData("Learnsets", "rillaboom").learnset.dualchop = ["8M"];
		this.modData("Learnsets", "rillaboom").learnset.echoedvoice = ["8M"];
		this.modData("Learnsets", "rillaboom").learnset.naturalgift = ["8M"];
		this.modData("Learnsets", "rillaboom").learnset.naturepower = ["8M"];
		this.modData("Learnsets", "rillaboom").learnset.rockclimb = ["8M"];
		this.modData("Learnsets", "rillaboom").learnset.rocksmash = ["8M"];
		this.modData("Learnsets", "rillaboom").learnset.strength = ["8M"];
		// Scorbunny
		this.modData("Learnsets", "scorbunny").learnset.detect = ["8D"];
		this.modData("Learnsets", "scorbunny").learnset.afteryou = ["8M"];
		this.modData("Learnsets", "scorbunny").learnset.blazekick = ["8E"];
		this.modData("Learnsets", "scorbunny").learnset.echoedvoice = ["8M"];
		this.modData("Learnsets", "scorbunny").learnset.endeavor = ["8M"];
		this.modData("Learnsets", "scorbunny").learnset.incinerate = ["8M"];
		this.modData("Learnsets", "scorbunny").learnset.lastresort = ["8M"];
		this.modData("Learnsets", "scorbunny").learnset.naturepower = ["8M"];
		this.modData("Learnsets", "scorbunny").learnset.rocksmash = ["8M"];
		this.modData("Learnsets", "scorbunny").learnset.roleplay = ["8M"];
		// Raboot
		this.modData("Learnsets", "raboot").learnset.detect = ["8D"];
		this.modData("Learnsets", "raboot").learnset.afteryou = ["8M"];
		this.modData("Learnsets", "raboot").learnset.echoedvoice = ["8M"];
		this.modData("Learnsets", "raboot").learnset.endeavor = ["8M"];
		this.modData("Learnsets", "raboot").learnset.incinerate = ["8M"];
		this.modData("Learnsets", "raboot").learnset.laserfocus = ["8M"];
		this.modData("Learnsets", "raboot").learnset.lastresort = ["8M"];
		this.modData("Learnsets", "raboot").learnset.naturepower = ["8M"];
		this.modData("Learnsets", "raboot").learnset.rocksmash = ["8M"];
		this.modData("Learnsets", "raboot").learnset.roleplay = ["8M"];
		// Cinderace
		this.modData("Learnsets", "cinderace").learnset.detect = ["8D"];
		this.modData("Learnsets", "cinderace").learnset.afteryou = ["8M"];
		this.modData("Learnsets", "cinderace").learnset.echoedvoice = ["8M"];
		this.modData("Learnsets", "cinderace").learnset.endeavor = ["8M"];
		this.modData("Learnsets", "cinderace").learnset.incinerate = ["8M"];
		this.modData("Learnsets", "cinderace").learnset.laserfocus = ["8M"];
		this.modData("Learnsets", "cinderace").learnset.lastresort = ["8M"];
		this.modData("Learnsets", "cinderace").learnset.naturepower = ["8M"];
		this.modData("Learnsets", "cinderace").learnset.rockclimb = ["8M"];
		this.modData("Learnsets", "cinderace").learnset.rocksmash = ["8M"];
		this.modData("Learnsets", "cinderace").learnset.roleplay = ["8M"];
		this.modData("Learnsets", "cinderace").learnset.smackdown = ["8M"];
		// Sobble
		this.modData("Learnsets", "sobble").learnset.flail = ["8D"];
		this.modData("Learnsets", "sobble").learnset.aquatail = ["8M"];
		this.modData("Learnsets", "sobble").learnset.dragontail = ["8M"];
		this.modData("Learnsets", "sobble").learnset.faketears = ["8M"];
		this.modData("Learnsets", "sobble").learnset.lastresort = ["8M"];
		this.modData("Learnsets", "sobble").learnset.waterpulse = ["8M"];
		delete this.modData('Learnsets', 'sobble').learnset.fellstinger;
		// Drizzile
		this.modData("Learnsets", "drizzile").learnset.trumpcard = ["8D"];
		this.modData("Learnsets", "drizzile").learnset.aquatail = ["8M"];
		this.modData("Learnsets", "drizzile").learnset.dragontail = ["8M"];
		this.modData("Learnsets", "drizzile").learnset.faketears = ["8M"];
		this.modData("Learnsets", "drizzile").learnset.lastresort = ["8M"];
		this.modData("Learnsets", "drizzile").learnset.recycle = ["8M"];
		this.modData("Learnsets", "drizzile").learnset.roleplay = ["8M"];
		this.modData("Learnsets", "drizzile").learnset.snatch = ["8M"];
		this.modData("Learnsets", "drizzile").learnset.stringshot = ["8M"];
		this.modData("Learnsets", "drizzile").learnset.waterpulse = ["8M"];
		// Inteleon
		this.modData("Learnsets", "inteleon").learnset.trumpcard = ["8D"];
		this.modData("Learnsets", "inteleon").learnset.aquatail = ["8M"];
		this.modData("Learnsets", "inteleon").learnset.dragontail = ["8M"];
		this.modData("Learnsets", "inteleon").learnset.faketears = ["8M"];
		this.modData("Learnsets", "inteleon").learnset.laserfocus = ["8M"];
		this.modData("Learnsets", "inteleon").learnset.lastresort = ["8M"];
		this.modData("Learnsets", "inteleon").learnset.recycle = ["8M"];
		this.modData("Learnsets", "inteleon").learnset.roleplay = ["8M"];
		this.modData("Learnsets", "inteleon").learnset.smackdown = ["8M"];
		this.modData("Learnsets", "inteleon").learnset.snatch = ["8M"];
		this.modData("Learnsets", "inteleon").learnset.stringshot = ["8M"];
		this.modData("Learnsets", "inteleon").learnset.waterpulse = ["8M"];
		// Skwovet
		this.modData("Learnsets", "skwovet").learnset.bide = ["8D"];
		this.modData("Learnsets", "skwovet").learnset.aquatail = ["8M"];
		this.modData("Learnsets", "skwovet").learnset.echoedvoice = ["8M"];
		this.modData("Learnsets", "skwovet").learnset.naturalgift = ["8M"];
		this.modData("Learnsets", "skwovet").learnset.recycle = ["8M"];
		this.modData("Learnsets", "skwovet").learnset.snatch = ["8M"];
		this.modData("Learnsets", "skwovet").learnset.strength = ["8M"];
		// Greedent
		this.modData("Learnsets", "greedent").learnset.bide = ["8D"];
		this.modData("Learnsets", "greedent").learnset.aquatail = ["8M"];
		this.modData("Learnsets", "greedent").learnset.echoedvoice = ["8M"];
		this.modData("Learnsets", "greedent").learnset.naturalgift = ["8M"];
		this.modData("Learnsets", "greedent").learnset.recycle = ["8M"];
		this.modData("Learnsets", "greedent").learnset.snatch = ["8M"];
		this.modData("Learnsets", "greedent").learnset.strength = ["8M"];
		// Rookidee
		this.modData("Learnsets", "rookidee").learnset.detect = ["8D"];
		this.modData("Learnsets", "rookidee").learnset.aerialace = ["8M"];
		this.modData("Learnsets", "rookidee").learnset.echoedvoice = ["8M"];
		this.modData("Learnsets", "rookidee").learnset.tailwind = ["8M"];
		// Corvisquire
		this.modData("Learnsets", "corvisquire").learnset.detect = ["8D"];
		this.modData("Learnsets", "corvisquire").learnset.aerialace = ["8M"];
		this.modData("Learnsets", "corvisquire").learnset.chipaway = ["8M"];
		this.modData("Learnsets", "corvisquire").learnset.echoedvoice = ["8M"];
		this.modData("Learnsets", "corvisquire").learnset.honeclaws = ["8M"];
		this.modData("Learnsets", "corvisquire").learnset.tailwind = ["8M"];
		// Corviknight
		this.modData("Learnsets", "corviknight").learnset.detect = ["8D"];
		this.modData("Learnsets", "corviknight").learnset.aerialace = ["8M"];
		this.modData("Learnsets", "corviknight").learnset.chipaway = ["8M"];
		this.modData("Learnsets", "corviknight").learnset.echoedvoice = ["8M"];
		this.modData("Learnsets", "corviknight").learnset.flash = ["8M"];
		this.modData("Learnsets", "corviknight").learnset.fullcollide = ["8M"];
		this.modData("Learnsets", "corviknight").learnset.honeclaws = ["8M"];
		this.modData("Learnsets", "corviknight").learnset.laserfocus = ["8M"];
		this.modData("Learnsets", "corviknight").learnset.magiccoat = ["8M"];
		this.modData("Learnsets", "corviknight").learnset.nightmare = ["8M"];
		this.modData("Learnsets", "corviknight").learnset.painsplit = ["8M"];
		this.modData("Learnsets", "corviknight").learnset.quash = ["8M"];
		this.modData("Learnsets", "corviknight").learnset.rockpolish = ["8M"];
		this.modData("Learnsets", "corviknight").learnset.tailwind = ["8M"];
		// Dottler
		this.modData("Learnsets", "dottler").learnset.mindreader = ["8D"];
		this.modData("Learnsets", "dottler").learnset.bugbite = ["8M"];
		this.modData("Learnsets", "dottler").learnset.flash = ["8M"];
		this.modData("Learnsets", "dottler").learnset.gravity = ["8M"];
		this.modData("Learnsets", "dottler").learnset.magiccoat = ["8M"];
		this.modData("Learnsets", "dottler").learnset.psychup = ["8M"];
		this.modData("Learnsets", "dottler").learnset.signalbeam = ["8M"];
		this.modData("Learnsets", "dottler").learnset.telekinesis = ["8M"];
		this.modData("Learnsets", "dottler").learnset.vitaldrain = ["8M"];
		delete this.modData('Learnsets', 'dottler').learnset.leechlife;
		// Orbeetle
		this.modData("Learnsets", "orbeetle").learnset.skydrop = ["8D"];
		this.modData("Learnsets", "orbeetle").learnset.bugbite = ["8M"];
		this.modData("Learnsets", "orbeetle").learnset.dreameater = ["8M"];
		this.modData("Learnsets", "orbeetle").learnset.flash = ["8M"];
		this.modData("Learnsets", "orbeetle").learnset.gravity = ["8M"];
		this.modData("Learnsets", "orbeetle").learnset.magiccoat = ["8M"];
		this.modData("Learnsets", "orbeetle").learnset.nightmare = ["8M"];
		this.modData("Learnsets", "orbeetle").learnset.psychup = ["8M"];
		this.modData("Learnsets", "orbeetle").learnset.roleplay = ["8M"];
		this.modData("Learnsets", "orbeetle").learnset.signalbeam = ["8M"];
		this.modData("Learnsets", "orbeetle").learnset.telekinesis = ["8M"];
		this.modData("Learnsets", "orbeetle").learnset.vitaldrain = ["8M"];
		delete this.modData('Learnsets', 'orbeetle').learnset.leechlife;
		// Nickit
		this.modData("Learnsets", "nickit").learnset.stockpile = ["8D"];
		this.modData("Learnsets", "nickit").learnset.odorsleuth = ["8L1"];
		this.modData("Learnsets", "nickit").learnset.feintattack = ["8L16"];
		this.modData("Learnsets", "nickit").learnset.aerialace = ["8M"];
		this.modData("Learnsets", "nickit").learnset.aquatail = ["8M"];
		this.modData("Learnsets", "nickit").learnset.assurance = ["8M"];
		this.modData("Learnsets", "nickit").learnset.echoedvoice = ["8M"];
		this.modData("Learnsets", "nickit").learnset.embargo = ["8M"];
		this.modData("Learnsets", "nickit").learnset.honeclaws = ["8M"];
		this.modData("Learnsets", "nickit").learnset.psychup = ["8M"];
		this.modData("Learnsets", "nickit").learnset.snatch = ["8M"];
		this.modData("Learnsets", "nickit").learnset.spite = ["8M"];
		// Thievul
		this.modData("Learnsets", "thievul").learnset.stockpile = ["8D"];
		this.modData("Learnsets", "thievul").learnset.odorsleuth = ["8L1"];
		this.modData("Learnsets", "thievul").learnset.feintattack = ["8L16"];
		this.modData("Learnsets", "thievul").learnset.aerialace = ["8M"];
		this.modData("Learnsets", "thievul").learnset.aquatail = ["8M"];
		this.modData("Learnsets", "thievul").learnset.assurance = ["8M"];
		this.modData("Learnsets", "thievul").learnset.echoedvoice = ["8M"];
		this.modData("Learnsets", "thievul").learnset.embargo = ["8M"];
		this.modData("Learnsets", "thievul").learnset.honeclaws = ["8M"];
		this.modData("Learnsets", "thievul").learnset.odorsleuth = ["8M"];
		this.modData("Learnsets", "thievul").learnset.psychup = ["8M"];
		this.modData("Learnsets", "thievul").learnset.snatch = ["8M"];
		this.modData("Learnsets", "thievul").learnset.spite = ["8M"];
		// Gossifleur
		this.modData("Learnsets", "gossifleur").learnset.grasswhistle = ["8D"];
		this.modData("Learnsets", "gossifleur").learnset.afteryou = ["8M"];
		this.modData("Learnsets", "gossifleur").learnset.flash = ["8M"];
		this.modData("Learnsets", "gossifleur").learnset.naturalgift = ["8M"];
		this.modData("Learnsets", "gossifleur").learnset.naturepower = ["8M"];
		this.modData("Learnsets", "gossifleur").learnset.roleplay = ["8M"];
		this.modData("Learnsets", "gossifleur").learnset.worryseed = ["8M"];
		// Eldegoss
		this.modData("Learnsets", "eldegoss").learnset.seedflare = ["8D"];
		this.modData("Learnsets", "eldegoss").learnset.afteryou = ["8M"];
		this.modData("Learnsets", "eldegoss").learnset.flash = ["8M"];
		this.modData("Learnsets", "eldegoss").learnset.naturalgift = ["8M"];
		this.modData("Learnsets", "eldegoss").learnset.naturepower = ["8M"];
		this.modData("Learnsets", "eldegoss").learnset.roleplay = ["8M"];
		this.modData("Learnsets", "eldegoss").learnset.worryseed = ["8M"];
		// Wooloo
		this.modData("Learnsets", "wooloo").learnset.magnetbomb = ["8D"];
		this.modData("Learnsets", "wooloo").learnset.echoedvoice = ["8M"];
		this.modData("Learnsets", "wooloo").learnset.naturalgift = ["8M"];
		// Dubwool
		this.modData("Learnsets", "dubwool").learnset.magnetbomb = ["8D"];
		this.modData("Learnsets", "dubwool").learnset.echoedvoice = ["8M"];
		this.modData("Learnsets", "dubwool").learnset.naturalgift = ["8M"];
		this.modData("Learnsets", "dubwool").learnset.smartstrike = ["8M"];
		// Chewtle
		this.modData("Learnsets", "chewtle").learnset.fakeout = ["8D"];
		this.modData("Learnsets", "chewtle").learnset.fullcollide = ["8M"];
		this.modData("Learnsets", "chewtle").learnset.rocksmash = ["8M"];
		this.modData("Learnsets", "chewtle").learnset.strength = ["8M"];
		this.modData("Learnsets", "chewtle").learnset.superfang = ["8M"];
		this.modData("Learnsets", "chewtle").learnset.waterpulse = ["8M"];
		delete this.modData('Learnsets', 'chewtle').learnset.dragontail;
		// Drednaw
		this.modData("Learnsets", "drednaw").learnset.fakeout = ["8D"];
		this.modData("Learnsets", "drednaw").learnset.aquatail = ["8M"];
		this.modData("Learnsets", "drednaw").learnset.chipaway = ["8M"];
		this.modData("Learnsets", "drednaw").learnset.fullcollide = ["8M"];
		this.modData("Learnsets", "drednaw").learnset.rockclimb = ["8M"];
		this.modData("Learnsets", "drednaw").learnset.rocksmash = ["8M"];
		this.modData("Learnsets", "drednaw").learnset.strength = ["8M"];
		this.modData("Learnsets", "drednaw").learnset.superfang = ["8M"];
		this.modData("Learnsets", "drednaw").learnset.waterpulse = ["8M"];
		delete this.modData('Learnsets', 'drednaw').learnset.meteorbeam;
		// Yamper
		this.modData("Learnsets", "yamper").learnset.nuzzle = ["8D"];
		this.modData("Learnsets", "yamper").learnset.chargebeam = ["8M"];
		this.modData("Learnsets", "yamper").learnset.echoedvoice = ["8M"];
		this.modData("Learnsets", "yamper").learnset.endeavor = ["8M"];
		this.modData("Learnsets", "yamper").learnset.flash = ["8M"];
		this.modData("Learnsets", "yamper").learnset.healbell = ["8M"];
		this.modData("Learnsets", "yamper").learnset.magnetrise = ["8M"];
		this.modData("Learnsets", "yamper").learnset.recycle = ["8M"];
		this.modData("Learnsets", "yamper").learnset.shockwave = ["8M"];
		this.modData("Learnsets", "yamper").learnset.snatch = ["8M"];
		this.modData("Learnsets", "yamper").learnset.thunderfang = ["8E"];
		// Boltund
		this.modData("Learnsets", "boltund").learnset.nuzzle = ["8D"];
		this.modData("Learnsets", "boltund").learnset.chargebeam = ["8M"];
		this.modData("Learnsets", "boltund").learnset.echoedvoice = ["8M"];
		this.modData("Learnsets", "boltund").learnset.endeavor = ["8M"];
		this.modData("Learnsets", "boltund").learnset.flash = ["8M"];
		this.modData("Learnsets", "boltund").learnset.healbell = ["8M"];
		this.modData("Learnsets", "boltund").learnset.magnetrise = ["8M"];
		this.modData("Learnsets", "boltund").learnset.recycle = ["8M"];
		this.modData("Learnsets", "boltund").learnset.shockwave = ["8M"];
		this.modData("Learnsets", "boltund").learnset.snatch = ["8M"];
		// Rolycoly
		this.modData("Learnsets", "rolycoly").learnset.accelerock = ["8D"];
		this.modData("Learnsets", "rolycoly").learnset.explosion = ["8M"];
		this.modData("Learnsets", "rolycoly").learnset.flash = ["8M"];
		this.modData("Learnsets", "rolycoly").learnset.spite = ["8M"];
		delete this.modData('Learnsets', 'rolycoly').learnset.meteorbeam;
		// Carkol
		this.modData("Learnsets", "carkol").learnset.accelerock = ["8D"];
		this.modData("Learnsets", "carkol").learnset.explosion = ["8M"];
		this.modData("Learnsets", "carkol").learnset.flash = ["8M"];
		this.modData("Learnsets", "carkol").learnset.spite = ["8M"];
		delete this.modData('Learnsets', 'carkol').learnset.meteorbeam;
		// Coalossal
		this.modData("Learnsets", "coalossal").learnset.moltenslag = ["8D"];
		this.modData("Learnsets", "coalossal").learnset.explosion = ["8M"];
		this.modData("Learnsets", "coalossal").learnset.flash = ["8M"];
		this.modData("Learnsets", "coalossal").learnset.spite = ["8M"];
		delete this.modData('Learnsets', 'coalossal').learnset.meteorbeam;
		// Flapple
		this.modData("Learnsets", "flapple").learnset.uproar = ["8D"];
		this.modData("Learnsets", "flapple").learnset.seedbomb = ["8L32","8M"];
		this.modData("Learnsets", "flapple").learnset.aerialace = ["8M"];
		this.modData("Learnsets", "flapple").learnset.bodypress = ["8M"];
		this.modData("Learnsets", "flapple").learnset.bugbite = ["8M"];
		this.modData("Learnsets", "flapple").learnset.fullcollide = ["8M"];
		this.modData("Learnsets", "flapple").learnset.infestation = ["8M"];
		this.modData("Learnsets", "flapple").learnset.naturalgift = ["8M"];
		this.modData("Learnsets", "flapple").learnset.naturepower = ["8M"];
		this.modData("Learnsets", "flapple").learnset.psychup = ["8M"];
		this.modData("Learnsets", "flapple").learnset.rockpolish = ["8M"];
		this.modData("Learnsets", "flapple").learnset.roleplay = ["8M"];
		this.modData("Learnsets", "flapple").learnset.roost = ["8M"];
		this.modData("Learnsets", "flapple").learnset.synthesis = ["8M"];
		this.modData("Learnsets", "flapple").learnset.worryseed = ["8M"];
		delete this.modData('Learnsets', 'flapple').learnset.gravapple;
		// Appletun
		this.modData("Learnsets", "appletun").learnset.yawn = ["8D"];
		this.modData("Learnsets", "appletun").learnset.energyball = ["8L32","8M"];
		this.modData("Learnsets", "appletun").learnset.bugbite = ["8M"];
		this.modData("Learnsets", "appletun").learnset.dragontail = ["8M"];
		this.modData("Learnsets", "appletun").learnset.infestation = ["8M"];
		this.modData("Learnsets", "appletun").learnset.naturalgift = ["8M"];
		this.modData("Learnsets", "appletun").learnset.naturepower = ["8M"];
		this.modData("Learnsets", "appletun").learnset.psychup = ["8M"];
		this.modData("Learnsets", "appletun").learnset.roleplay = ["8M"];
		this.modData("Learnsets", "appletun").learnset.strength = ["8M"];
		this.modData("Learnsets", "appletun").learnset.synthesis = ["8M"];
		this.modData("Learnsets", "appletun").learnset.worryseed = ["8M"];
		delete this.modData('Learnsets', 'appletun').learnset.appleacid;
		// Silicobra
		this.modData("Learnsets", "silicobra").learnset.rototiller = ["8D"];
		this.modData("Learnsets", "silicobra").learnset.constrict = ["8L1"];
		this.modData("Learnsets", "silicobra").learnset.sandattack = ["8L5"];
		this.modData("Learnsets", "silicobra").learnset.wrap = ["8L9"];
		this.modData("Learnsets", "silicobra").learnset.minimize = ["8L13"];
		this.modData("Learnsets", "silicobra").learnset.brutalswing = ["8L17"];
		this.modData("Learnsets", "silicobra").learnset.headbutt = ["8L21"];
		this.modData("Learnsets", "silicobra").learnset.glare = ["8L25"];
		this.modData("Learnsets", "silicobra").learnset.sandtomb = ["8L29"];
		this.modData("Learnsets", "silicobra").learnset.dig = ["8L33"];
		this.modData("Learnsets", "silicobra").learnset.sandstorm = ["8L37"];
		this.modData("Learnsets", "silicobra").learnset.slam = ["8L41"];
		this.modData("Learnsets", "silicobra").learnset.coil = ["8L45"];
		this.modData("Learnsets", "silicobra").learnset.wringout = ["8L49"];
		this.modData("Learnsets", "silicobra").learnset.dustspray = ["8E"];
		this.modData("Learnsets", "silicobra").learnset.aquatail = ["8M"];
		this.modData("Learnsets", "silicobra").learnset.dragontail = ["8M"];
		// Sandaconda
		this.modData("Learnsets", "sandaconda").learnset.rototiller = ["8D"];
		this.modData("Learnsets", "sandaconda").learnset.constrict = ["8L1"];
		this.modData("Learnsets", "sandaconda").learnset.sandattack = ["8L5"];
		this.modData("Learnsets", "sandaconda").learnset.wrap = ["8L9"];
		this.modData("Learnsets", "sandaconda").learnset.minimize = ["8L13"];
		this.modData("Learnsets", "sandaconda").learnset.brutalswing = ["8L17"];
		this.modData("Learnsets", "sandaconda").learnset.headbutt = ["8L21"];
		this.modData("Learnsets", "sandaconda").learnset.glare = ["8L25"];
		this.modData("Learnsets", "sandaconda").learnset.sandtomb = ["8L29"];
		this.modData("Learnsets", "sandaconda").learnset.dig = ["8L33"];
		this.modData("Learnsets", "sandaconda").learnset.sandstorm = ["8L40"];
		this.modData("Learnsets", "sandaconda").learnset.slam = ["8L47"];
		this.modData("Learnsets", "sandaconda").learnset.coil = ["8L54"];
		this.modData("Learnsets", "sandaconda").learnset.wringout = ["8L61"];
		this.modData("Learnsets", "sandaconda").learnset.aquatail = ["8M"];
		this.modData("Learnsets", "sandaconda").learnset.dragontail = ["8M"];
		this.modData("Learnsets", "sandaconda").learnset.rockclimb = ["8M"];
		this.modData("Learnsets", "sandaconda").learnset.strength = ["8M"];
		// Cramorant
		this.modData("Learnsets", "cramorant").learnset.eggbomb = ["8D"];
		this.modData("Learnsets", "cramorant").learnset.block = ["8M"];
		this.modData("Learnsets", "cramorant").learnset.echoedvoice = ["8M"];
		this.modData("Learnsets", "cramorant").learnset.iceball = ["8E"];
		this.modData("Learnsets", "cramorant").learnset.tailwind = ["8M"];
		this.modData("Learnsets", "cramorant").learnset.waterpulse = ["8M"];
		// Arrokuda
		this.modData("Learnsets", "arrokuda").learnset.skullbash = ["8D"];
		this.modData("Learnsets", "arrokuda").learnset.aquatail = ["8M"];
		this.modData("Learnsets", "arrokuda").learnset.endeavor = ["8M"];
		this.modData("Learnsets", "arrokuda").learnset.waterpulse = ["8M"];
		// Barraskewda
		this.modData("Learnsets", "barraskewda").learnset.skullbash = ["8D"];
		this.modData("Learnsets", "barraskewda").learnset.aquatail = ["8M"];
		this.modData("Learnsets", "barraskewda").learnset.endeavor = ["8M"];
		this.modData("Learnsets", "barraskewda").learnset.waterpulse = ["8M"];
		// Toxel
		this.modData("Learnsets", "toxel").learnset.paraboliccharge = ["8D"];
		this.modData("Learnsets", "toxel").learnset.chargebeam = ["8M"];
		this.modData("Learnsets", "toxel").learnset.echoedvoice = ["8M"];
		this.modData("Learnsets", "toxel").learnset.flash = ["8M"];
		this.modData("Learnsets", "toxel").learnset.gastroacid = ["8M"];
		this.modData("Learnsets", "toxel").learnset.magnetrise = ["8M"];
		this.modData("Learnsets", "toxel").learnset.shockwave = ["8M"];
		// Toxtricity Amped
		this.modData("Learnsets", "toxtricity").learnset.paraboliccharge = ["8D"];
		this.modData("Learnsets", "toxtricity").learnset.magneticflux = ["8L54"];
		this.modData("Learnsets", "toxtricity").learnset.chargebeam = ["8M"];
		this.modData("Learnsets", "toxtricity").learnset.echoedvoice = ["8M"];
		this.modData("Learnsets", "toxtricity").learnset.flash = ["8M"];
		this.modData("Learnsets", "toxtricity").learnset.gastroacid = ["8M"];
		this.modData("Learnsets", "toxtricity").learnset.gravity = ["8M"];
		this.modData("Learnsets", "toxtricity").learnset.magnetrise = ["8M"];
		this.modData("Learnsets", "toxtricity").learnset.painsplit = ["8M"];
		this.modData("Learnsets", "toxtricity").learnset.psychup = ["8M"];
		this.modData("Learnsets", "toxtricity").learnset.shockwave = ["8M"];
		this.modData("Learnsets", "toxtricity").learnset.signalbeam = ["8M"];
		delete this.modData('Learnsets', 'toxtricity').learnset.shiftgear;
		// Toxtricity Low Key
		this.modData("Learnsets", "toxtricitylowkey").learnset.paraboliccharge = ["8D"];
		this.modData("Learnsets", "toxtricitylowkey").learnset.chargebeam = ["8M"];
		this.modData("Learnsets", "toxtricitylowkey").learnset.echoedvoice = ["8M"];
		this.modData("Learnsets", "toxtricitylowkey").learnset.flash = ["8M"];
		this.modData("Learnsets", "toxtricitylowkey").learnset.gastroacid = ["8M"];
		this.modData("Learnsets", "toxtricitylowkey").learnset.gravity = ["8M"];
		this.modData("Learnsets", "toxtricitylowkey").learnset.magnetrise = ["8M"];
		this.modData("Learnsets", "toxtricitylowkey").learnset.painsplit = ["8M"];
		this.modData("Learnsets", "toxtricitylowkey").learnset.psychup = ["8M"];
		this.modData("Learnsets", "toxtricitylowkey").learnset.shockwave = ["8M"];
		this.modData("Learnsets", "toxtricitylowkey").learnset.signalbeam = ["8M"];
		// Sizzlipede
		this.modData("Learnsets", "sizzlipede").learnset.coil = ["8D"];
		this.modData("Learnsets", "sizzlipede").learnset.preheat = ["8L25"];
		this.modData("Learnsets", "sizzlipede").learnset.bugbite = ["8M"];
		this.modData("Learnsets", "sizzlipede").learnset.flamecharge = ["8M"];
		this.modData("Learnsets", "sizzlipede").learnset.flash = ["8M"];
		this.modData("Learnsets", "sizzlipede").learnset.incinerate = ["8M"];
		this.modData("Learnsets", "sizzlipede").learnset.infestation = ["8M"];
		this.modData("Learnsets", "sizzlipede").learnset.vitaldrain = ["8M"];
		delete this.modData('Learnsets', 'sizzlipede').learnset.leechlife;
		// centiskorch
		this.modData("Learnsets", "centiskorch").learnset.coil = ["8D"];
		this.modData("Learnsets", "centiskorch").learnset.preheat = ["8L25"];
		this.modData("Learnsets", "centiskorch").learnset.bugbite = ["8M"];
		this.modData("Learnsets", "centiskorch").learnset.flamecharge = ["8M"];
		this.modData("Learnsets", "centiskorch").learnset.flash = ["8M"];
		this.modData("Learnsets", "centiskorch").learnset.incinerate = ["8M"];
		this.modData("Learnsets", "centiskorch").learnset.infestation = ["8M"];
		this.modData("Learnsets", "centiskorch").learnset.vitaldrain = ["8M"];
		delete this.modData('Learnsets', 'centiskorch').learnset.leechlife;
		// Clobbopus
		this.modData("Learnsets", "clobbopus").learnset.megapunch = ["8D"];
		this.modData("Learnsets", "clobbopus").learnset.octazooka = ["8E"];
		this.modData("Learnsets", "clobbopus").learnset.knockoff = ["8M"];
		this.modData("Learnsets", "clobbopus").learnset.strength = ["8M"];
		// Grapploct
		this.modData("Learnsets", "grapploct").learnset.lashout = ["8D"];
		this.modData("Learnsets", "grapploct").learnset.wringout = ["8L50"];
		this.modData("Learnsets", "grapploct").learnset.knockoff = ["8M"];
		this.modData("Learnsets", "grapploct").learnset.laserfocus = ["8M"];
		this.modData("Learnsets", "grapploct").learnset.strength = ["8M"];
		delete this.modData('Learnsets', 'grapploct').learnset.octazooka;
		delete this.modData('Learnsets', 'grapploct').learnset.topsyturvy;
		// Sinistea
		this.modData("Learnsets", "sinistea").learnset.soak = ["8D"];
		this.modData("Learnsets", "sinistea").learnset.embargo = ["8M"];
		this.modData("Learnsets", "sinistea").learnset.flash = ["8M"];
		this.modData("Learnsets", "sinistea").learnset.gravity = ["8M"];
		this.modData("Learnsets", "sinistea").learnset.healbell = ["8M"];
		this.modData("Learnsets", "sinistea").learnset.magiccoat = ["8M"];
		this.modData("Learnsets", "sinistea").learnset.nightmare = ["8M"];
		this.modData("Learnsets", "sinistea").learnset.psychup = ["8M"];
		this.modData("Learnsets", "sinistea").learnset.recycle = ["8M"];
		this.modData("Learnsets", "sinistea").learnset.rockpolish = ["8M"];
		this.modData("Learnsets", "sinistea").learnset.roleplay = ["8M"];
		this.modData("Learnsets", "sinistea").learnset.snatch = ["8M"];
		this.modData("Learnsets", "sinistea").learnset.spite = ["8M"];
		this.modData("Learnsets", "sinistea").learnset.telekinesis = ["8M"];
		// Polteageist
		this.modData("Learnsets", "polteageist").learnset.soak = ["8D"];
		this.modData("Learnsets", "polteageist").learnset.embargo = ["8M"];
		this.modData("Learnsets", "polteageist").learnset.flash = ["8M"];
		this.modData("Learnsets", "polteageist").learnset.gravity = ["8M"];
		this.modData("Learnsets", "polteageist").learnset.healbell = ["8M"];
		this.modData("Learnsets", "polteageist").learnset.magiccoat = ["8M"];
		this.modData("Learnsets", "polteageist").learnset.nightmare = ["8M"];
		this.modData("Learnsets", "polteageist").learnset.psychup = ["8M"];
		this.modData("Learnsets", "polteageist").learnset.recycle = ["8M"];
		this.modData("Learnsets", "polteageist").learnset.rockpolish = ["8M"];
		this.modData("Learnsets", "polteageist").learnset.roleplay = ["8M"];
		this.modData("Learnsets", "polteageist").learnset.snatch = ["8M"];
		this.modData("Learnsets", "polteageist").learnset.spite = ["8M"];
		this.modData("Learnsets", "polteageist").learnset.telekinesis = ["8M"];
		// Hatenna
		this.modData("Learnsets", "hatenna").learnset.imprison = ["8D"];
		this.modData("Learnsets", "hatenna").learnset.chargebeam = ["8M"];
		this.modData("Learnsets", "hatenna").learnset.dreameater = ["8M"];
		this.modData("Learnsets", "hatenna").learnset.echoedvoice = ["8M"];
		this.modData("Learnsets", "hatenna").learnset.flash = ["8M"];
		this.modData("Learnsets", "hatenna").learnset.gravity = ["8M"];
		this.modData("Learnsets", "hatenna").learnset.magiccoat = ["8M"];
		this.modData("Learnsets", "hatenna").learnset.nightmare = ["8M"];
		this.modData("Learnsets", "hatenna").learnset.psychup = ["8M"];
		this.modData("Learnsets", "hatenna").learnset.signalbeam = ["8M"];
		this.modData("Learnsets", "hatenna").learnset.telekinesis = ["8M"];
		// Hattrem
		this.modData("Learnsets", "hattrem").learnset.imprison = ["8D"];
		this.modData("Learnsets", "hattrem").learnset.chargebeam = ["8M"];
		this.modData("Learnsets", "hattrem").learnset.dreameater = ["8M"];
		this.modData("Learnsets", "hattrem").learnset.echoedvoice = ["8M"];
		this.modData("Learnsets", "hattrem").learnset.flash = ["8M"];
		this.modData("Learnsets", "hattrem").learnset.gravity = ["8M"];
		this.modData("Learnsets", "hattrem").learnset.magiccoat = ["8M"];
		this.modData("Learnsets", "hattrem").learnset.nightmare = ["8M"];
		this.modData("Learnsets", "hattrem").learnset.psychup = ["8M"];
		this.modData("Learnsets", "hattrem").learnset.signalbeam = ["8M"];
		this.modData("Learnsets", "hattrem").learnset.telekinesis = ["8M"];
		this.modData("Learnsets", "hatenna").learnset.drainingkiss = ["8E"];
		delete this.modData("Learnsets", "hatenna").learnset.nuzzle;
		// Hatterene
		this.modData("Learnsets", "hatterene").learnset.imprison = ["8D"];
		this.modData("Learnsets", "hatterene").learnset.chargebeam = ["8M"];
		this.modData("Learnsets", "hatterene").learnset.dreameater = ["8M"];
		this.modData("Learnsets", "hatterene").learnset.echoedvoice = ["8M"];
		this.modData("Learnsets", "hatterene").learnset.flash = ["8M"];
		this.modData("Learnsets", "hatterene").learnset.gravity = ["8M"];
		this.modData("Learnsets", "hatterene").learnset.magiccoat = ["8M"];
		this.modData("Learnsets", "hatterene").learnset.nightmare = ["8M"];
		this.modData("Learnsets", "hatterene").learnset.psychup = ["8M"];
		this.modData("Learnsets", "hatterene").learnset.signalbeam = ["8M"];
		this.modData("Learnsets", "hatterene").learnset.telekinesis = ["8M"];
		// Impidimp
		this.modData("Learnsets", "impidimp").learnset.astonish = ["8D"];
		this.modData("Learnsets", "impidimp").learnset.dreameater = ["8M"];
		this.modData("Learnsets", "impidimp").learnset.echoedvoice = ["8M"];
		this.modData("Learnsets", "impidimp").learnset.embargo = ["8M"];
		this.modData("Learnsets", "impidimp").learnset.gravity = ["8M"];
		this.modData("Learnsets", "impidimp").learnset.homeclaws = ["8M"];
		this.modData("Learnsets", "impidimp").learnset.magiccoat = ["8M"];
		this.modData("Learnsets", "impidimp").learnset.psychup = ["8M"];
		this.modData("Learnsets", "impidimp").learnset.rocksmash = ["8M"];
		this.modData("Learnsets", "impidimp").learnset.snatch = ["8M"];
		this.modData("Learnsets", "impidimp").learnset.vitaldrain = ["8M"];
		delete this.modData('Learnsets', 'impidimp').learnset.leechlife;
		// Morgrem
		this.modData("Learnsets", "morgrem").learnset.darkestlariat = ["8D"];
		this.modData("Learnsets", "morgrem").learnset.feintattack = ["8L0"];
		this.modData("Learnsets", "morgrem").learnset.dreameater = ["8M"];
		this.modData("Learnsets", "morgrem").learnset.echoedvoice = ["8M"];
		this.modData("Learnsets", "morgrem").learnset.embargo = ["8M"];
		this.modData("Learnsets", "morgrem").learnset.gravity = ["8M"];
		this.modData("Learnsets", "morgrem").learnset.homeclaws = ["8M"];
		this.modData("Learnsets", "morgrem").learnset.lastresort = ["8M"];
		this.modData("Learnsets", "morgrem").learnset.magiccoat = ["8M"];
		this.modData("Learnsets", "morgrem").learnset.psychup = ["8M"];
		this.modData("Learnsets", "morgrem").learnset.rocksmash = ["8M"];
		this.modData("Learnsets", "morgrem").learnset.snatch = ["8M"];
		this.modData("Learnsets", "morgrem").learnset.strength = ["8M"];
		this.modData("Learnsets", "morgrem").learnset.vitaldrain = ["8M"];
		delete this.modData('Learnsets', 'morgrem').learnset.falsesurrender;
		delete this.modData('Learnsets', 'morgrem').learnset.leechlife;
		// Grimmsnarl
		this.modData("Learnsets", "grimmsnarl").learnset.darkestlariat = ["8D"];
		this.modData("Learnsets", "grimmsnarl").learnset.dreameater = ["8M"];
		this.modData("Learnsets", "grimmsnarl").learnset.dualchop = ["8M"];
		this.modData("Learnsets", "grimmsnarl").learnset.echoedvoice = ["8M"];
		this.modData("Learnsets", "grimmsnarl").learnset.embargo = ["8M"];
		this.modData("Learnsets", "grimmsnarl").learnset.feintattack = ["8M"];
		this.modData("Learnsets", "grimmsnarl").learnset.gravity = ["8M"];
		this.modData("Learnsets", "grimmsnarl").learnset.homeclaws = ["8M"];
		this.modData("Learnsets", "grimmsnarl").learnset.lastresort = ["8M"];
		this.modData("Learnsets", "grimmsnarl").learnset.magiccoat = ["8M"];
		this.modData("Learnsets", "grimmsnarl").learnset.psychup = ["8M"];
		this.modData("Learnsets", "grimmsnarl").learnset.rockclimb = ["8M"];
		this.modData("Learnsets", "grimmsnarl").learnset.rocksmash = ["8M"];
		this.modData("Learnsets", "grimmsnarl").learnset.snatch = ["8M"];
		this.modData("Learnsets", "grimmsnarl").learnset.strength = ["8M"];
		this.modData("Learnsets", "grimmsnarl").learnset.vitaldrain = ["8M"];
		delete this.modData('Learnsets', 'morgrem').learnset.falsesurrender;
		delete this.modData('Learnsets', 'grimmsnarl').learnset.leechlife;
		// Obstagoon
		this.modData("Learnsets", "obstagoon").learnset.throatchop = ["8D"];
		this.modData("Learnsets", "obstagoon").learnset.playrough = ["8L1"];
		this.modData("Learnsets", "obstagoon").learnset.tussle = ["8L1"];
		this.modData("Learnsets", "obstagoon").learnset.block = ["8M"];
		this.modData("Learnsets", "obstagoon").learnset.dualchop = ["8M"];
		this.modData("Learnsets", "obstagoon").learnset.echoedvoice = ["8M"];
		this.modData("Learnsets", "obstagoon").learnset.embargo = ["8M"];
		this.modData("Learnsets", "obstagoon").learnset.honeclaws = ["8M"];
		this.modData("Learnsets", "obstagoon").learnset.lastresort = ["8M"];
		this.modData("Learnsets", "obstagoon").learnset.pursuit = ["8M"];
		this.modData("Learnsets", "obstagoon").learnset.quash = ["8M"];
		this.modData("Learnsets", "obstagoon").learnset.rocksmash = ["8M"];
		this.modData("Learnsets", "obstagoon").learnset.snatch = ["8M"];
		this.modData("Learnsets", "obstagoon").learnset.spite = ["8M"];
		this.modData("Learnsets", "obstagoon").learnset.strength = ["8M"];
		this.modData("Learnsets", "obstagoon").learnset.torment = ["8M"];
		this.modData("Learnsets", "obstagoon").learnset.toxic = ["8M"];
		this.modData("Learnsets", "obstagoon").learnset.xscissor = ["8M"];
		delete this.modData("Learnsets", "obstagoon").learnset.babydolleyes;
		delete this.modData("Learnsets", "obstagoon").learnset.pinmissile;
		// Perrserker
		this.modData("Learnsets", "perrserker").learnset.mefirst = ["8D"];
		this.modData("Learnsets", "perrserker").learnset.aerialace = ["8M"];
		this.modData("Learnsets", "perrserker").learnset.endeavor = ["8M"];
		this.modData("Learnsets", "perrserker").learnset.feintattack = ["8M"];
		this.modData("Learnsets", "perrserker").learnset.flash = ["8M"];
		this.modData("Learnsets", "perrserker").learnset.honeclaws = ["8M"];
		this.modData("Learnsets", "perrserker").learnset.rockpolish = ["8M"];
		this.modData("Learnsets", "perrserker").learnset.smartstrike = ["8M"];
		this.modData("Learnsets", "perrserker").learnset.strength = ["8M"];
		this.modData("Learnsets", "perrserker").learnset.xscissor = ["8M"];
		// Cursola
		this.modData("Learnsets", "cursola").learnset.clearsmog = ["8D"];
		this.modData("Learnsets", "cursola").learnset.dreameater = ["8M"];
		this.modData("Learnsets", "cursola").learnset.dustspray = ["8M"];
		this.modData("Learnsets", "cursola").learnset.endeavor = ["8M"];
		this.modData("Learnsets", "cursola").learnset.explosion = ["8M"];
		this.modData("Learnsets", "cursola").learnset.gravity = ["8M"];
		this.modData("Learnsets", "cursola").learnset.healblock = ["8M"];
		this.modData("Learnsets", "cursola").learnset.magiccoat = ["8M"];
		this.modData("Learnsets", "cursola").learnset.nightmare = ["8M"];
		this.modData("Learnsets", "cursola").learnset.painsplit = ["8M"];
		this.modData("Learnsets", "cursola").learnset.psychup = ["8M"];
		this.modData("Learnsets", "cursola").learnset.telekinesis = ["8M"];
		delete this.modData('Learnsets', 'cursola').learnset.leechlife;
		delete this.modData('Learnsets', 'cursola').learnset.meteorbeam;
		delete this.modData('Learnsets', 'cursola').learnset.poltergeist;
		delete this.modData('Learnsets', 'cursola').learnset.tantrum;
		// Sirfetch'd
		this.modData("Learnsets", "sirfetchd").learnset.megahorn = ["8D"];
		this.modData("Learnsets", "sirfetchd").learnset.aerialace = ["8M"];
		this.modData("Learnsets", "sirfetchd").learnset.afteryou = ["8M"];
		this.modData("Learnsets", "sirfetchd").learnset.chipaway = ["8M"];
		this.modData("Learnsets", "sirfetchd").learnset.endeavor = ["8M"];
		this.modData("Learnsets", "sirfetchd").learnset.fullcollide = ["8M"];
		// Mr. Rime
		this.modData("Learnsets", "mrrime").learnset.followme = ["8D"];
		this.modData("Learnsets", "mrrime").learnset.wakeupslap = ["8L40"];
		this.modData("Learnsets", "mrrime").learnset.afteryou = ["8M"];
		this.modData("Learnsets", "mrrime").learnset.auroraveil = ["8M"];
		this.modData("Learnsets", "mrrime").learnset.dreameater = ["8M"];
		this.modData("Learnsets", "mrrime").learnset.frostbreath = ["8M"];
		this.modData("Learnsets", "mrrime").learnset.flash = ["8M"];
		this.modData("Learnsets", "mrrime").learnset.gravity = ["8M"];
		this.modData("Learnsets", "mrrime").learnset.magiccoat = ["8M"];
		this.modData("Learnsets", "mrrime").learnset.nightmare = ["8M"];
		this.modData("Learnsets", "mrrime").learnset.psychup = ["8M"];
		this.modData("Learnsets", "mrrime").learnset.rocksmash = ["8M"];
		this.modData("Learnsets", "mrrime").learnset.spotlight = ["8M"];
		this.modData("Learnsets", "mrrime").learnset.telekinesis = ["8M"];
		this.modData("Learnsets", "mrrime").learnset.torment = ["8M"];
		delete this.modData('Learnsets', 'mrrime').learnset.suckerpunch;
		delete this.modData('Learnsets', 'mrrime').learnset.toxic;
		// Runerigus
		this.modData("Learnsets", "runerigus").learnset.grudge = ["8D"];
		this.modData("Learnsets", "runerigus").learnset.block = ["8M"];
		this.modData("Learnsets", "runerigus").learnset.dragontail = ["8M"];
		this.modData("Learnsets", "runerigus").learnset.dualchop = ["8M"];
		this.modData("Learnsets", "runerigus").learnset.nightmare = ["8M"];
		this.modData("Learnsets", "runerigus").learnset.rocksmash = ["8M"];
		this.modData("Learnsets", "runerigus").learnset.roleplay = ["8M"];
		this.modData("Learnsets", "runerigus").learnset.strength = ["8M"];
		// Milcery
		this.modData("Learnsets", "milcery").learnset.milkdrink = ["8D"];
		this.modData("Learnsets", "milcery").learnset.flash = ["8M"];
		this.modData("Learnsets", "milcery").learnset.magiccoat = ["8M"];
		// Alcremie
		this.modData("Learnsets", "alcremie").learnset.milkdrink = ["8D"];
		this.modData("Learnsets", "alcremie").learnset.afteryou = ["8M"];
		this.modData("Learnsets", "alcremie").learnset.flash = ["8M"];
		this.modData("Learnsets", "alcremie").learnset.magiccoat = ["8M"];
		// Falinks
		this.modData("Learnsets", "falinks").learnset.beatup = ["8D"];
		this.modData("Learnsets", "falinks").learnset.block = ["8M"];
		this.modData("Learnsets", "falinks").learnset.endeavor = ["8M"];
		this.modData("Learnsets", "falinks").learnset.fullcollide = ["8M"];
		this.modData("Learnsets", "falinks").learnset.laserfocus = ["8M"];
		this.modData("Learnsets", "falinks").learnset.psychup = ["8M"];
		this.modData("Learnsets", "falinks").learnset.rockpolish = ["8M"];
		this.modData("Learnsets", "falinks").learnset.strength = ["8M"];
		// Pincurchin
		this.modData("Learnsets", "pincurchin").learnset.spikecannon = ["8D"];
		this.modData("Learnsets", "pincurchin").learnset.chargebeam = ["8M"];
		this.modData("Learnsets", "pincurchin").learnset.flash = ["8M"];
		this.modData("Learnsets", "pincurchin").learnset.gastroacid = ["8M"];
		this.modData("Learnsets", "pincurchin").learnset.magnetrise = ["8M"];
		this.modData("Learnsets", "pincurchin").learnset.shockwave = ["8M"];
		this.modData("Learnsets", "pincurchin").learnset.spikes = ["8E"];
		// Snom
		this.modData("Learnsets", "snom").learnset.irondefense = ["8D"];
		this.modData("Learnsets", "snom").learnset.bugbite = ["8M"];
		this.modData("Learnsets", "snom").learnset.flash = ["8M"];
		this.modData("Learnsets", "snom").learnset.frostbreath = ["8M"];
		this.modData("Learnsets", "snom").learnset.infestation = ["8M"];
		this.modData("Learnsets", "snom").learnset.signalbeam = ["8M"];
		this.modData("Learnsets", "snom").learnset.stringshot = ["8M"];
		// Frosmoth
		this.modData("Learnsets", "frosmoth").learnset.cottonguard = ["8D"];
		this.modData("Learnsets", "frosmoth").learnset.bugbite = ["8M"];
		this.modData("Learnsets", "frosmoth").learnset.flash = ["8M"];
		this.modData("Learnsets", "frosmoth").learnset.frostbreath = ["8M"];
		this.modData("Learnsets", "frosmoth").learnset.infestation = ["8M"];
		this.modData("Learnsets", "frosmoth").learnset.magiccoat = ["8M"];
		this.modData("Learnsets", "frosmoth").learnset.roost = ["8M"];
		this.modData("Learnsets", "frosmoth").learnset.signalbeam = ["8M"];
		this.modData("Learnsets", "frosmoth").learnset.stringshot = ["8M"];
		this.modData("Learnsets", "frosmoth").learnset.vitaldrain = ["8M"];
		delete this.modData('Learnsets', 'frosmoth').learnset.leechlife;
		// Stonjourner
		this.modData("Learnsets", "stonjourner").learnset.morningsun = ["8D"];
		this.modData("Learnsets", "stonjourner").learnset.embargo = ["8M"];
		this.modData("Learnsets", "stonjourner").learnset.explosion = ["8M"];
		this.modData("Learnsets", "stonjourner").learnset.gravity = ["8M"];
		this.modData("Learnsets", "stonjourner").learnset.magiccoat = ["8M"];
		this.modData("Learnsets", "stonjourner").learnset.naturepower = ["8M"];
		this.modData("Learnsets", "stonjourner").learnset.rocksmash = ["8M"];
		this.modData("Learnsets", "stonjourner").learnset.roleplay = ["8M"];
		this.modData("Learnsets", "stonjourner").learnset.smackdown = ["8M"];
		this.modData("Learnsets", "stonjourner").learnset.strength = ["8M"];
		this.modData("Learnsets", "stonjourner").learnset.telekinesis = ["8M"];
		// Eiscue
		this.modData("Learnsets", "eiscue").learnset.iceball = ["8D"];
		this.modData("Learnsets", "eiscue").learnset.echoedvoice = ["8M"];
		this.modData("Learnsets", "eiscue").learnset.flash = ["8M"];
		this.modData("Learnsets", "eiscue").learnset.frostbreath = ["8M"];
		this.modData("Learnsets", "eiscue").learnset.fullcollide = ["8M"];
		this.modData("Learnsets", "eiscue").learnset.waterpulse = ["8M"];
		// Indeedee ♀
		this.modData("Learnsets", "indeedeef").learnset.happyhour = ["8D"];
		this.modData("Learnsets", "indeedeef").learnset.confide = ["8L1"];
		this.modData("Learnsets", "indeedeef").learnset.dreameater = ["8M"];
		this.modData("Learnsets", "indeedeef").learnset.echoedvoice = ["8M"];
		this.modData("Learnsets", "indeedeef").learnset.embargo = ["8M"];
		this.modData("Learnsets", "indeedeef").learnset.flash = ["8M"];
		this.modData("Learnsets", "indeedeef").learnset.gravity = ["8M"];
		this.modData("Learnsets", "indeedeef").learnset.healbell = ["8M"];
		this.modData("Learnsets", "indeedeef").learnset.laserfocus = ["8M"];
		this.modData("Learnsets", "indeedeef").learnset.magiccoat = ["8M"];
		this.modData("Learnsets", "indeedeef").learnset.recycle = ["8M"];
		this.modData("Learnsets", "indeedeef").learnset.roleplay = ["8M"];
		this.modData("Learnsets", "indeedeef").learnset.snatch = ["8M"];
		this.modData("Learnsets", "indeedeef").learnset.telekinesis = ["8M"];
		// Indeedee ♂
		this.modData("Learnsets", "indeedee").learnset.happyhour = ["8D"];
		this.modData("Learnsets", "indeedee").learnset.confide = ["8L1"];
		this.modData("Learnsets", "indeedee").learnset.dreameater = ["8M"];
		this.modData("Learnsets", "indeedee").learnset.echoedvoice = ["8M"];
		this.modData("Learnsets", "indeedee").learnset.embargo = ["8M"];
		this.modData("Learnsets", "indeedee").learnset.flash = ["8M"];
		this.modData("Learnsets", "indeedee").learnset.gravity = ["8M"];
		this.modData("Learnsets", "indeedee").learnset.healbell = ["8M"];
		this.modData("Learnsets", "indeedee").learnset.laserfocus = ["8M"];
		this.modData("Learnsets", "indeedee").learnset.magiccoat = ["8M"];
		this.modData("Learnsets", "indeedee").learnset.recycle = ["8M"];
		this.modData("Learnsets", "indeedee").learnset.roleplay = ["8M"];
		this.modData("Learnsets", "indeedee").learnset.snatch = ["8M"];
		this.modData("Learnsets", "indeedee").learnset.telekinesis = ["8M"];
		// Morpeko
		this.modData("Learnsets", "morpeko").learnset.rage = ["8D"];
		this.modData("Learnsets", "morpeko").learnset.odorsleuth = ["8L1"];
		this.modData("Learnsets", "morpeko").learnset.chargebeam = ["8M"];
		this.modData("Learnsets", "morpeko").learnset.echoedvoice = ["8M"];
		this.modData("Learnsets", "morpeko").learnset.embargo = ["8M"];
		this.modData("Learnsets", "morpeko").learnset.magnetrise = ["8M"];
		this.modData("Learnsets", "morpeko").learnset.lastresort = ["8M"];
		this.modData("Learnsets", "morpeko").learnset.psychup = ["8M"];
		this.modData("Learnsets", "morpeko").learnset.shockwave = ["8M"];
		this.modData("Learnsets", "morpeko").learnset.snatch = ["8M"];
		this.modData("Learnsets", "morpeko").learnset.spite = ["8M"];
		this.modData("Learnsets", "morpeko").learnset.stuffcheeks = ["8E"];
		this.modData("Learnsets", "morpeko").learnset.tantrum = ["8M"];
		delete this.modData('Learnsets', 'morpeko').learnset.tailwhip;
		// Cufant
		this.modData("Learnsets", "cufant").learnset.magnetbomb = ["8D"];
		this.modData("Learnsets", "cufant").learnset.rototiller = ["8L30"];
		this.modData("Learnsets", "cufant").learnset.powerwhip = ["8E"];
		this.modData("Learnsets", "cufant").learnset.dig = ["8M"];
		this.modData("Learnsets", "cufant").learnset.echoedvoice = ["8M"];
		this.modData("Learnsets", "cufant").learnset.endeavor = ["8M"];
		this.modData("Learnsets", "cufant").learnset.gravity = ["8M"];
		this.modData("Learnsets", "cufant").learnset.magnetrise = ["8M"];
		this.modData("Learnsets", "cufant").learnset.knockoff = ["8M"];
		this.modData("Learnsets", "cufant").learnset.lastresort = ["8M"];
		this.modData("Learnsets", "cufant").learnset.rockclimb = ["8M"];
		this.modData("Learnsets", "cufant").learnset.rockpolish = ["8M"];
		this.modData("Learnsets", "cufant").learnset.smackdown = ["8M"];
		// Copperajah
		this.modData("Learnsets", "copperajah").learnset.magnetbomb = ["8D"];
		this.modData("Learnsets", "copperajah").learnset.rototiller = ["8L30"];
		this.modData("Learnsets", "copperajah").learnset.dig = ["8M"];
		this.modData("Learnsets", "copperajah").learnset.block = ["8M"];
		this.modData("Learnsets", "copperajah").learnset.echoedvoice = ["8M"];
		this.modData("Learnsets", "copperajah").learnset.endeavor = ["8M"];
		this.modData("Learnsets", "copperajah").learnset.gravity = ["8M"];
		this.modData("Learnsets", "copperajah").learnset.magnetrise = ["8M"];
		this.modData("Learnsets", "copperajah").learnset.knockoff = ["8M"];
		this.modData("Learnsets", "copperajah").learnset.lastresort = ["8M"];
		this.modData("Learnsets", "copperajah").learnset.rockclimb = ["8M"];
		this.modData("Learnsets", "copperajah").learnset.rockpolish = ["8M"];
		this.modData("Learnsets", "copperajah").learnset.smackdown = ["8M"];
		// Dracozolt
		this.modData("Learnsets", "dracozolt").learnset.twister = ["8D"];
		this.modData("Learnsets", "dracozolt").learnset.aquatail = ["8M"];
		this.modData("Learnsets", "dracozolt").learnset.chargebeam = ["8M"];
		this.modData("Learnsets", "dracozolt").learnset.flash = ["8M"];
		this.modData("Learnsets", "dracozolt").learnset.magnetrise = ["8M"];
		this.modData("Learnsets", "dracozolt").learnset.painsplit = ["8M"];
		this.modData("Learnsets", "dracozolt").learnset.rockclimb = ["8M"];
		this.modData("Learnsets", "dracozolt").learnset.shockwave = ["8M"];
		this.modData("Learnsets", "dracozolt").learnset.strength = ["8M"];
		delete this.modData('Learnsets', 'dracozolt').learnset.meteorbeam;
		// Arctozolt
		this.modData("Learnsets", "arctozolt").learnset.iondeluge = ["8D"];
		this.modData("Learnsets", "arctozolt").learnset.aquatail = ["8M"];
		this.modData("Learnsets", "arctozolt").learnset.chargebeam = ["8M"];
		this.modData("Learnsets", "arctozolt").learnset.dragontail = ["8M"];
		this.modData("Learnsets", "arctozolt").learnset.flash = ["8M"];
		this.modData("Learnsets", "arctozolt").learnset.frostbreath = ["8M"];
		this.modData("Learnsets", "arctozolt").learnset.magnetrise = ["8M"];
		this.modData("Learnsets", "arctozolt").learnset.painsplit = ["8M"];
		this.modData("Learnsets", "arctozolt").learnset.rockclimb = ["8M"];
		this.modData("Learnsets", "arctozolt").learnset.shockwave = ["8M"];
		this.modData("Learnsets", "arctozolt").learnset.strength = ["8M"];
		delete this.modData('Learnsets', 'arctozolt').learnset.meteorbeam;
		// Dracovish
		this.modData("Learnsets", "dracovish").learnset.liquidation = ["8D"];
		this.modData("Learnsets", "dracovish").learnset.painsplit = ["8M"];
		this.modData("Learnsets", "dracovish").learnset.strength = ["8M"];
		delete this.modData('Learnsets', 'dracovish').learnset.leechlife;
		delete this.modData('Learnsets', 'dracovish').learnset.meteorbeam;
		// Arctovish
		this.modData("Learnsets", "arctovish").learnset.icefang = ["8D"];
		this.modData("Learnsets", "arctovish").learnset.frostbreath = ["8M"];
		this.modData("Learnsets", "arctovish").learnset.painsplit = ["8M"];
		this.modData("Learnsets", "arctovish").learnset.strength = ["8M"];
		delete this.modData('Learnsets', 'arctovish').learnset.meteorbeam;
		// Duraludon
		this.modData("Learnsets", "duraludon").learnset.crushclaw = ["8D"];
		this.modData("Learnsets", "duraludon").learnset.block = ["8M"];
		this.modData("Learnsets", "duraludon").learnset.chargebeam = ["8M"];
		this.modData("Learnsets", "duraludon").learnset.dragontail = ["8M"];
		this.modData("Learnsets", "duraludon").learnset.echoedvoice = ["8M"];
		this.modData("Learnsets", "duraludon").learnset.flash = ["8M"];
		this.modData("Learnsets", "duraludon").learnset.gravity = ["8M"];
		this.modData("Learnsets", "duraludon").learnset.honeclaws = ["8M"];
		this.modData("Learnsets", "duraludon").learnset.magnetrise = ["8M"];
		this.modData("Learnsets", "duraludon").learnset.rockclimb = ["8M"];
		this.modData("Learnsets", "duraludon").learnset.rockpolish = ["8M"];
		this.modData("Learnsets", "duraludon").learnset.strength = ["8M"];
		// Dreepy
		this.modData("Learnsets", "dreepy").learnset.quickguard = ["8D"];
		this.modData("Learnsets", "dreepy").learnset.aerialace = ["8M"];
		this.modData("Learnsets", "dreepy").learnset.aquatail = ["8M"];
		this.modData("Learnsets", "dreepy").learnset.dragontail = ["8M"];
		this.modData("Learnsets", "dreepy").learnset.echoiedvoice = ["8M"];
		this.modData("Learnsets", "dreepy").learnset.embargo = ["8M"];
		this.modData("Learnsets", "dreepy").learnset.flamecharge = ["8M"];
		this.modData("Learnsets", "dreepy").learnset.gravity = ["8M"];
		this.modData("Learnsets", "dreepy").learnset.magiccoat = ["8M"];
		this.modData("Learnsets", "dreepy").learnset.nightmare = ["8M"];
		this.modData("Learnsets", "dreepy").learnset.psychup = ["8M"];
		this.modData("Learnsets", "dreepy").learnset.painsplit = ["8M"];
		this.modData("Learnsets", "dreepy").learnset.snatch = ["8M"];
		this.modData("Learnsets", "dreepy").learnset.spite = ["8M"];
		// Drakloak
		this.modData("Learnsets", "drakloak").learnset.quickguard = ["8D"];
		this.modData("Learnsets", "drakloak").learnset.aerialace = ["8M"];
		this.modData("Learnsets", "drakloak").learnset.aquatail = ["8M"];
		this.modData("Learnsets", "drakloak").learnset.dragontail = ["8M"];
		this.modData("Learnsets", "drakloak").learnset.echoiedvoice = ["8M"];
		this.modData("Learnsets", "drakloak").learnset.embargo = ["8M"];
		this.modData("Learnsets", "drakloak").learnset.flamecharge = ["8M"];
		this.modData("Learnsets", "drakloak").learnset.gravity = ["8M"];
		this.modData("Learnsets", "drakloak").learnset.magiccoat = ["8M"];
		this.modData("Learnsets", "drakloak").learnset.nightmare = ["8M"];
		this.modData("Learnsets", "drakloak").learnset.psychup = ["8M"];
		this.modData("Learnsets", "drakloak").learnset.painsplit = ["8M"];
		this.modData("Learnsets", "drakloak").learnset.snatch = ["8M"];
		this.modData("Learnsets", "drakloak").learnset.spite = ["8M"];
		// Dragapult
		this.modData("Learnsets", "dragapult").learnset.quickguard = ["8D"];
		this.modData("Learnsets", "dragapult").learnset.aerialace = ["8M"];
		this.modData("Learnsets", "dragapult").learnset.aquatail = ["8M"];
		this.modData("Learnsets", "dragapult").learnset.dragontail = ["8M"];
		this.modData("Learnsets", "dragapult").learnset.echoiedvoice = ["8M"];
		this.modData("Learnsets", "dragapult").learnset.embargo = ["8M"];
		this.modData("Learnsets", "dragapult").learnset.flamecharge = ["8M"];
		this.modData("Learnsets", "dragapult").learnset.gravity = ["8M"];
		this.modData("Learnsets", "dragapult").learnset.magiccoat = ["8M"];
		this.modData("Learnsets", "dragapult").learnset.nightmare = ["8M"];
		this.modData("Learnsets", "dragapult").learnset.psychup = ["8M"];
		this.modData("Learnsets", "dragapult").learnset.painsplit = ["8M"];
		this.modData("Learnsets", "dragapult").learnset.smackdown = ["8M"];
		this.modData("Learnsets", "dragapult").learnset.snatch = ["8M"];
		this.modData("Learnsets", "dragapult").learnset.spite = ["8M"];
		// Zacian
		this.modData("Learnsets", "zacian").learnset.meteorassault = ["8D"];
		this.modData("Learnsets", "zacian").learnset.aerialace = ["8M"];
		this.modData("Learnsets", "zacian").learnset.chipaway = ["8M"];
		this.modData("Learnsets", "zacian").learnset.echoidvoice = ["8M"];
		this.modData("Learnsets", "zacian").learnset.endeavor = ["8M"];
		this.modData("Learnsets", "zacian").learnset.healbell = ["8M"];
		this.modData("Learnsets", "zacian").learnset.honeclaws = ["8M"];
		this.modData("Learnsets", "zacian").learnset.naturepower = ["8M"];
		this.modData("Learnsets", "zacian").learnset.quash = ["8M"];
		this.modData("Learnsets", "zacian").learnset.rockclimb = ["8M"];
		this.modData("Learnsets", "zacian").learnset.strength = ["8M"];
		this.modData("Learnsets", "zacian").learnset.xscissor = ["8M"];
		// Zacian Crowned
		this.modData("Learnsets", "zaciancrowned").learnset.meteorassault = ["8D"];
		this.modData("Learnsets", "zaciancrowned").learnset.aerialace = ["8M"];
		this.modData("Learnsets", "zaciancrowned").learnset.chipaway = ["8M"];
		this.modData("Learnsets", "zaciancrowned").learnset.echoidvoice = ["8M"];
		this.modData("Learnsets", "zaciancrowned").learnset.endeavor = ["8M"];
		this.modData("Learnsets", "zaciancrowned").learnset.healbell = ["8M"];
		this.modData("Learnsets", "zaciancrowned").learnset.honeclaws = ["8M"];
		this.modData("Learnsets", "zaciancrowned").learnset.naturepower = ["8M"];
		this.modData("Learnsets", "zaciancrowned").learnset.quash = ["8M"];
		this.modData("Learnsets", "zaciancrowned").learnset.rockclimb = ["8M"];
		this.modData("Learnsets", "zaciancrowned").learnset.strength = ["8M"];
		this.modData("Learnsets", "zaciancrowned").learnset.xscissor = ["8M"];
		// Zamazenta
		this.modData("Learnsets", "zamazenta").learnset.kingsshield = ["8D"];
		this.modData("Learnsets", "zamazenta").learnset.aerialace = ["8M"];
		this.modData("Learnsets", "zamazenta").learnset.block = ["8M"];
		this.modData("Learnsets", "zamazenta").learnset.chipaway = ["8M"];
		this.modData("Learnsets", "zamazenta").learnset.echoidvoice = ["8M"];
		this.modData("Learnsets", "zamazenta").learnset.endeavor = ["8M"];
		this.modData("Learnsets", "zamazenta").learnset.fullcollide = ["8M"];
		this.modData("Learnsets", "zamazenta").learnset.healbell = ["8M"];
		this.modData("Learnsets", "zamazenta").learnset.honeclaws = ["8M"];
		this.modData("Learnsets", "zamazenta").learnset.magiccoat = ["8M"];
		this.modData("Learnsets", "zamazenta").learnset.naturepower = ["8M"];
		this.modData("Learnsets", "zamazenta").learnset.quash = ["8M"];
		this.modData("Learnsets", "zamazenta").learnset.rockclimb = ["8M"];
		this.modData("Learnsets", "zamazenta").learnset.rocksmash = ["8M"];
		this.modData("Learnsets", "zamazenta").learnset.strength = ["8M"];
		// Zamazenta Crowned
		this.modData("Learnsets", "zamazentacrowned").learnset.kingsshield = ["8D"];
		this.modData("Learnsets", "zamazentacrowned").learnset.aerialace = ["8M"];
		this.modData("Learnsets", "zamazentacrowned").learnset.block = ["8M"];
		this.modData("Learnsets", "zamazentacrowned").learnset.chipaway = ["8M"];
		this.modData("Learnsets", "zamazentacrowned").learnset.echoidvoice = ["8M"];
		this.modData("Learnsets", "zamazentacrowned").learnset.endeavor = ["8M"];
		this.modData("Learnsets", "zamazentacrowned").learnset.fullcollide = ["8M"];
		this.modData("Learnsets", "zamazentacrowned").learnset.healbell = ["8M"];
		this.modData("Learnsets", "zamazentacrowned").learnset.honeclaws = ["8M"];
		this.modData("Learnsets", "zamazentacrowned").learnset.magiccoat = ["8M"];
		this.modData("Learnsets", "zamazentacrowned").learnset.naturepower = ["8M"];
		this.modData("Learnsets", "zamazentacrowned").learnset.quash = ["8M"];
		this.modData("Learnsets", "zamazentacrowned").learnset.rockclimb = ["8M"];
		this.modData("Learnsets", "zamazentacrowned").learnset.rocksmash = ["8M"];
		this.modData("Learnsets", "zamazentacrowned").learnset.strength = ["8M"];
		// Eternatus
		this.modData("Learnsets", "eternatus").learnset.growth = ["8D"];
		this.modData("Learnsets", "eternatus").learnset.aquatail = ["8M"];
		this.modData("Learnsets", "eternatus").learnset.chargebeam = ["8M"];
		this.modData("Learnsets", "eternatus").learnset.dragontail = ["8M"];
		this.modData("Learnsets", "eternatus").learnset.dreameater = ["8M"];
		this.modData("Learnsets", "eternatus").learnset.gravity = ["8M"];
		this.modData("Learnsets", "eternatus").learnset.magnetrise = ["8M"];
		this.modData("Learnsets", "eternatus").learnset.shockwave = ["8M"];
		this.modData("Learnsets", "eternatus").learnset.signalbeam = ["8M"];
		this.modData("Learnsets", "eternatus").learnset.strength = ["8M"];
		// Zarude
		this.modData("Learnsets", "zarude").learnset.beatup = ["8D"];
		this.modData("Learnsets", "zarude").learnset.aerialace = ["8M"];
		this.modData("Learnsets", "zarude").learnset.chipaway = ["8M"];
		this.modData("Learnsets", "zarude").learnset.echoedvoice = ["8M"];
		this.modData("Learnsets", "zarude").learnset.embargo = ["8M"];
		this.modData("Learnsets", "zarude").learnset.endeavor = ["8M"];
		this.modData("Learnsets", "zarude").learnset.dualchop = ["8M"];
		this.modData("Learnsets", "zarude").learnset.honeclaws = ["8M"];
		this.modData("Learnsets", "zarude").learnset.knockoff = ["8M"];
		this.modData("Learnsets", "zarude").learnset.laserfocus = ["8M"];
		this.modData("Learnsets", "zarude").learnset.lastresort = ["8M"];
		this.modData("Learnsets", "zarude").learnset.naturalgift = ["8M"];
		this.modData("Learnsets", "zarude").learnset.naturepower = ["8M"];
		this.modData("Learnsets", "zarude").learnset.quash = ["8M"];
		this.modData("Learnsets", "zarude").learnset.strength = ["8M"];
		this.modData("Learnsets", "zarude").learnset.synthesis = ["8M"];
		this.modData("Learnsets", "zarude").learnset.torment = ["8M"];
		this.modData("Learnsets", "zarude").learnset.xscissor = ["8M"];
		// Syclar
		this.modData("Learnsets", "syclar").learnset.firstimpression = ["8D"];
		this.modData("Learnsets", "syclar").learnset.leechlife = ["8L1"];
		this.modData("Learnsets", "syclar").learnset.vitaldrain = ["8M"];
		delete this.modData('Learnsets', 'syclar').learnset.absorb;
		delete this.modData('Learnsets', 'syclar').learnset.toxic;
		// Syclant
		this.modData("Learnsets", "syclant").learnset.firstimpression = ["8D"];
		this.modData("Learnsets", "syclant").learnset.leechlife = ["8L1"];
		this.modData("Learnsets", "syclant").learnset.nastyplot = ["8M"];
		this.modData("Learnsets", "syclant").learnset.screech = ["8M"];
		this.modData("Learnsets", "syclant").learnset.stringshot = ["8M"];
		this.modData("Learnsets", "syclant").learnset.vitaldrain = ["8M"];
		delete this.modData('Learnsets', 'syclant').learnset.absorb;
		delete this.modData('Learnsets', 'syclant').learnset.toxic;
		// Revenankh
		this.modData("Learnsets", "revenankh").learnset.poweruppunch = ["8D"];
		this.modData("Learnsets", "revenankh").learnset.phantomforce = ["8M"];
		this.modData("Learnsets", "revenankh").learnset.poltergeist = ["8M"];
		delete this.modData('Learnsets', 'revenankh').learnset.toxic;
		// Embirch
		this.modData("Learnsets", "embirch").learnset.strangesmoke = ["8M"];
		this.modData("Learnsets", "embirch").learnset.pelletshot = ["8E"];
		delete this.modData('Learnsets', 'embirch').learnset.toxic;
		// Flarelm
		this.modData("Learnsets", "flarelm").learnset.strangesmoke = ["8M"];
		this.modData("Learnsets", "flarelm").learnset.preheat = ["8L1"];
		this.modData("Learnsets", "flarelm").learnset.fullcollide = ["8M"];
		delete this.modData('Learnsets', 'flarelm').learnset.toxic;
		// Pyroak
		this.modData("Learnsets", "pyroak").learnset.strangesmoke = ["8M"];
		this.modData("Learnsets", "pyroak").learnset.preheat = ["8L1"];
		this.modData("Learnsets", "pyroak").learnset.napalm = ["8L64"];
		this.modData("Learnsets", "pyroak").learnset.fullcollide = ["8M"];
		delete this.modData('Learnsets', 'pyroak').learnset.toxic;
		// Breezi
		this.modData("Learnsets", "breezi").learnset.aerate = ["8D"];
		this.modData("Learnsets", "breezi").learnset.bounce = ["8M"];
		this.modData("Learnsets", "breezi").learnset.gunkshot = ["8M"];
		// Fidgit
		this.modData("Learnsets", "fidgit").learnset.aerate = ["8D"];
		this.modData("Learnsets", "fidgit").learnset.bounce = ["8M"];
		this.modData("Learnsets", "fidgit").learnset.gunkshot = ["8M"];
		this.modData("Learnsets", "fidgit").learnset.smartstrike = ["8M"];
		this.modData("Learnsets", "fidgit").learnset.tantrum = ["8M"];
		// Rebble
		this.modData("Learnsets", "rebble").learnset.cosmicpower = ["8D"];
		this.modData("Learnsets", "rebble").learnset.dustspray = ["8L8"];
		delete this.modData('Learnsets', 'rebble').learnset.mudslap;
		delete this.modData('Learnsets', 'rebble').learnset.toxic;
		// Tactite
		this.modData("Learnsets", "tactite").learnset.cosmicpower = ["8D"];
		this.modData("Learnsets", "tactite").learnset.dustspray = ["8L8"];
		delete this.modData('Learnsets', 'tactite').learnset.mudslap;
		delete this.modData('Learnsets', 'tactite').learnset.toxic;
		// Stratagem
		this.modData("Learnsets", "stratagem").learnset.cosmicpower = ["8D"];
		this.modData("Learnsets", "stratagem").learnset.dustspray = ["8L8"];
		this.modData("Learnsets", "stratagem").learnset.meteorbeam = ["8L0"];
		delete this.modData('Learnsets', 'stratagem').learnset.mudslap;
		delete this.modData('Learnsets', 'stratagem').learnset.paleowave;
		delete this.modData('Learnsets', 'stratagem').learnset.toxic;
		// Privatyke
		this.modData("Learnsets", "privatyke").learnset.throatchop = ["8D"];
		this.modData("Learnsets", "privatyke").learnset.octazooka = ["8E"];
		this.modData("Learnsets", "privatyke").learnset.whitewater = ["8L4"];
		delete this.modData('Learnsets', 'privatyke').learnset.toxic;
		// Arghonaut
		this.modData("Learnsets", "arghonaut").learnset.throatchop = ["8D"];
		this.modData("Learnsets", "arghonaut").learnset.lashout = ["8L1"];
		this.modData("Learnsets", "arghonaut").learnset.whitewater = ["8L4"];
		this.modData("Learnsets", "arghonaut").learnset.hydropump = ["8M"];
		delete this.modData('Learnsets', 'arghonaut').learnset.toxic;
		// Nohface
		this.modData("Learnsets", "nohface").learnset.playdead = ["8D"];
		this.modData("Learnsets", "nohface").learnset.pounce = ["8L8"];
		this.modData("Learnsets", "nohface").learnset.doubleteam = ["8E"];
		this.modData("Learnsets", "nohface").learnset.odorsleuth = ["8E"];
		this.modData("Learnsets", "nohface").learnset.phantomforce = ["8M"];
		delete this.modData('Learnsets', 'nohface').learnset.toxic;
		// Kitsunoh
		this.modData("Learnsets", "kitsunoh").learnset.playdead = ["8D"];
		this.modData("Learnsets", "kitsunoh").learnset.pounce = ["8L8"];
		this.modData("Learnsets", "kitsunoh").learnset.shadowbone = ["8L48"];
		this.modData("Learnsets", "kitsunoh").learnset.phantomforce = ["8M"];
		this.modData("Learnsets", "kitsunoh").learnset.poltergeist = ["8M"];
		this.modData("Learnsets", "kitsunoh").learnset.midnight = ["8T"];
		this.modData("Learnsets", "kitsunoh").learnset.steelbeam = ["8T"];
		delete this.modData('Learnsets', 'kitsunoh').learnset.doubleteam;
		delete this.modData('Learnsets', 'kitsunoh').learnset.odorsleuth;
		delete this.modData('Learnsets', 'kitsunoh').learnset.shadowstrike;
		delete this.modData('Learnsets', 'kitsunoh').learnset.toxic;
		// Monohm
		this.modData("Learnsets", "monohm").learnset.mindreader = ["8D"];
		this.modData("Learnsets", "monohm").learnset.eerieimpulse = ["8M"];
		this.modData("Learnsets", "monohm").learnset.electroball = ["8M"];
		delete this.modData('Learnsets', 'monohm').learnset.toxic;
		// Duohm
		this.modData("Learnsets", "duohm").learnset.mindreader = ["8D"];
		this.modData("Learnsets", "duohm").learnset.eerieimpulse = ["8M"];
		this.modData("Learnsets", "duohm").learnset.electroball = ["8M"];
		delete this.modData('Learnsets', 'duohm').learnset.toxic;
		// Cyclohm
		this.modData("Learnsets", "cyclohm").learnset.mindreader = ["8D"];
		this.modData("Learnsets", "cyclohm").learnset.eerieimpulse = ["8M"];
		this.modData("Learnsets", "cyclohm").learnset.electroball = ["8M"];
		this.modData("Learnsets", "cyclohm").learnset.hurricane = ["8M"];
		delete this.modData('Learnsets', 'cyclohm').learnset.toxic;
		// Dorsoil
		this.modData("Learnsets", "dorsoil").learnset.rebound = ["8D"];
		this.modData("Learnsets", "dorsoil").learnset.dustspray = ["8L16"];
		this.modData("Learnsets", "dorsoil").learnset.tussle = ["8L21"];
		this.modData("Learnsets", "dorsoil").learnset.rapidspin = ["8L26"];
		this.modData("Learnsets", "dorsoil").learnset.rototiller = ["8E"];
		this.modData("Learnsets", "dorsoil").learnset.bodypress = ["8M"];
		delete this.modData('Learnsets', 'dorsoil').learnset.mudslap;
		delete this.modData('Learnsets', 'dorsoil').learnset.furyattack;
		delete this.modData('Learnsets', 'dorsoil').learnset.toxic;
		// Colossoil
		this.modData("Learnsets", "colossoil").learnset.rebound = ["8D"];
		this.modData("Learnsets", "colossoil").learnset.dustspray = ["8L16"];
		this.modData("Learnsets", "colossoil").learnset.tussle = ["8L21"];
		this.modData("Learnsets", "colossoil").learnset.rapidspin = ["8L26"];
		this.modData("Learnsets", "colossoil").learnset.bodypress = ["8M"];
		delete this.modData('Learnsets', 'colossoil').learnset.mudslap;
		delete this.modData('Learnsets', 'colossoil').learnset.furyattack;
		delete this.modData('Learnsets', 'colossoil').learnset.toxic;
		// Protowatt
		this.modData("Learnsets", "protowatt").learnset.mefirst = ["8D"];
		this.modData("Learnsets", "protowatt").learnset.flash = ["8M"];
		delete this.modData('Learnsets', 'protowatt').learnset.toxic;
		// Krilowatt
		this.modData("Learnsets", "krilowatt").learnset.heartswap = ["8D"];
		this.modData("Learnsets", "krilowatt").learnset.mindreader = ["8L46"];
		this.modData("Learnsets", "krilowatt").learnset.eerieimpulse = ["8M"];
		this.modData("Learnsets", "krilowatt").learnset.electricterrain = ["8M"];
		this.modData("Learnsets", "krilowatt").learnset.electroball = ["8M"];
		delete this.modData('Learnsets', 'krilowatt').learnset.toxic;
		// Voodoll
		this.modData("Learnsets", "voodoll").learnset.playdead = ["8D"];
		this.modData("Learnsets", "voodoll").learnset.swing = ["8E"];
		delete this.modData('Learnsets', 'voodoll').learnset.toxic;
		// Voodoom
		this.modData("Learnsets", "voodoom").learnset.spiritbreak = ["8D"];
		this.modData("Learnsets", "voodoom").learnset.suckerpunch = ["8L1"];
		this.modData("Learnsets", "voodoom").learnset.brutalswing = ["8M"];
		this.modData("Learnsets", "voodoom").learnset.poltergeist = ["8M"];
		delete this.modData('Learnsets', 'voodoom').learnset.toxic;
		// Scratchet
		this.modData("Learnsets", "scratchet").learnset.morningsun = ["8D"];
		this.modData("Learnsets", "scratchet").learnset.harden = ["8L1"];
		this.modData("Learnsets", "scratchet").learnset.tussle = ["8L4"];
		this.modData("Learnsets", "scratchet").learnset.pounce = ["8L23"];
		this.modData("Learnsets", "scratchet").learnset.roar = ["8M"];
		delete this.modData('Learnsets', 'scratchet').learnset.toxic;
		// Tomohawk
		this.modData("Learnsets", "tomohawk").learnset.morningsun = ["8D"];
		this.modData("Learnsets", "tomohawk").learnset.whirlwind = ["8L0"];
		this.modData("Learnsets", "tomohawk").learnset.aurasphere = ["8L1"];
		this.modData("Learnsets", "tomohawk").learnset.sunnyday = ["8L1", "8M"];
		this.modData("Learnsets", "tomohawk").learnset.raindance = ["8L1", "8M"];
		this.modData("Learnsets", "tomohawk").learnset.scratch = ["8L1"];
		this.modData("Learnsets", "tomohawk").learnset.harden = ["8L1"];
		this.modData("Learnsets", "tomohawk").learnset.tussle = ["8L4"];
		this.modData("Learnsets", "tomohawk").learnset.rocksmash = ["8L9", "8M"];
		this.modData("Learnsets", "tomohawk").learnset.focusenergy = ["8L13"];
		this.modData("Learnsets", "tomohawk").learnset.furyswipes = ["8L18"];
		this.modData("Learnsets", "tomohawk").learnset.pounce = ["8L23"];
		this.modData("Learnsets", "tomohawk").learnset.airslash = ["8L29"];
		this.modData("Learnsets", "tomohawk").learnset.submission = ["8L37"];
		this.modData("Learnsets", "tomohawk").learnset.hypervoice = ["8L43", "8M"];
		this.modData("Learnsets", "tomohawk").learnset.skydrop = ["8L49"];
		this.modData("Learnsets", "tomohawk").learnset.superpower = ["8L57", "8M"];
		this.modData("Learnsets", "tomohawk").learnset.fellswoop = ["8L63"];
		this.modData("Learnsets", "tomohawk").learnset.rest = ["8L69", "8M"];
		this.modData("Learnsets", "tomohawk").learnset.healingwish = ["8L75"];
		this.modData("Learnsets", "tomohawk").learnset.aerialace = ["8M"];
		this.modData("Learnsets", "tomohawk").learnset.heatwave = ["8M"];
		this.modData("Learnsets", "tomohawk").learnset.hurricane = ["8M"];
		this.modData("Learnsets", "tomohawk").learnset.roar = ["8M"];
		this.modData("Learnsets", "tomohawk").learnset.skyattack = ["8M"];
		delete this.modData('Learnsets', 'tomohawk').learnset.toxic;
		// Necturine
		this.modData("Learnsets", "necturine").learnset.sketch = ["8D"];
		this.modData("Learnsets", "necturine").learnset.vitaldrain = ["8M"];
		delete this.modData('Learnsets', 'necturine').learnset.leechlife;
		// Necturna
		this.modData("Learnsets", "necturna").learnset.sketch = ["8D"];
		this.modData("Learnsets", "necturna").learnset.vitaldrain = ["8M"];
		delete this.modData('Learnsets', 'necturna').learnset.leechlife;
		// Mollux
		this.modData("Learnsets", "mollux").learnset.lifedew = ["8D"];
		this.modData("Learnsets", "mollux").learnset.preheat = ["8L1"];
		this.modData("Learnsets", "mollux").learnset.vitaldrain = ["8M"];
		delete this.modData('Learnsets', 'mollux').learnset.leechlife;
		// Cupra
		this.modData("Learnsets", "cupra").learnset.imprison = ["8D"];
		this.modData("Learnsets", "cupra").learnset.doubleteam = ["8L1"];
		delete this.modData('Learnsets', 'cupra').learnset.toxic;
		// Argalis
		this.modData("Learnsets", "argalis").learnset.imprison = ["8D"];
		this.modData("Learnsets", "argalis").learnset.doubleteam = ["8L1"];
		delete this.modData('Learnsets', 'argalis').learnset.toxic;
		// Aurumoth
		this.modData("Learnsets", "aurumoth").learnset.imprison = ["8D"];
		this.modData("Learnsets", "aurumoth").learnset.doubleteam = ["8L1"];
		this.modData("Learnsets", "aurumoth").learnset.silverwind = ["8L7"];
		this.modData("Learnsets", "aurumoth").learnset.compensation = ["8M"];
		delete this.modData('Learnsets', 'aurumoth').learnset.toxic;
		// Brattler
		this.modData("Learnsets", "brattler").learnset.spikyshield = ["8D"];
		this.modData("Learnsets", "brattler").learnset.powertrip = ["8L52"]; //Will update when Brattler itself is
		this.modData("Learnsets", "brattler").learnset.coil = ["8E"];
		this.modData("Learnsets", "brattler").learnset.compensation = ["8M"];
		this.modData("Learnsets", "brattler").learnset.nastyplot = ["8M"];
		// Malaconda
		this.modData("Learnsets", "malaconda").learnset.rejuvenate = ["8D"];
		this.modData("Learnsets", "malaconda").learnset.powertrip = ["8L52"];
		this.modData("Learnsets", "malaconda").learnset.breakingswipe = ["8M"];
		this.modData("Learnsets", "malaconda").learnset.compensation = ["8M"];
		this.modData("Learnsets", "malaconda").learnset.nastyplot = ["8M"];
		// Cawdet
		this.modData("Learnsets", "cawdet").learnset.throatchop = ["8D"];
		this.modData("Learnsets", "cawdet").learnset.whirlpool = ["8M"];
		delete this.modData('Learnsets', 'cawdet').learnset.bellydrum;
		delete this.modData('Learnsets', 'cawdet').learnset.toxic;
		// Cawmodore
		this.modData("Learnsets", "cawmodore").learnset.throatchop = ["8D"];
		this.modData("Learnsets", "cawmodore").learnset.whirlpool = ["8M"];
		delete this.modData('Learnsets', 'cawmodore').learnset.toxic;
		// Volkritter
		this.modData("Learnsets", "volkritter").learnset.firelash = ["8D"];
		this.modData("Learnsets", "volkritter").learnset.preheat = ["8L35"];
		this.modData("Learnsets", "volkritter").learnset.liquidation = ["8M"];
		delete this.modData('Learnsets', 'volkritter').learnset.toxic;
		// Volkraken
		this.modData("Learnsets", "volkraken").learnset.firelash = ["8D"];
		this.modData("Learnsets", "volkraken").learnset.preheat = ["8L35"];
		this.modData("Learnsets", "volkraken").learnset.liquidation = ["8E"];
		delete this.modData('Learnsets', 'volkraken').learnset.toxic;
		// Snugglow
		this.modData("Learnsets", "snugglow").learnset.overdrive = ["8D"];
		this.modData("Learnsets", "snugglow").learnset.poisonsting = ["8L1"];
		this.modData("Learnsets", "snugglow").learnset.thundershock = ["8L1"];
		this.modData("Learnsets", "snugglow").learnset.supersonic = ["8L6"];
		this.modData("Learnsets", "snugglow").learnset.acid = ["8L9"];
		this.modData("Learnsets", "snugglow").learnset.pounce = ["8L12"];
		this.modData("Learnsets", "snugglow").learnset.dive = ["8M"];
		this.modData("Learnsets", "snugglow").learnset.electroball = ["8M"];
		this.modData("Learnsets", "snugglow").learnset.surf = ["8M"];
		// Plasmanta
		this.modData("Learnsets", "plasmanta").learnset.overdrive = ["8D"];
		this.modData("Learnsets", "plasmanta").learnset.poisonsting = ["8L1"];
		this.modData("Learnsets", "plasmanta").learnset.thundershock = ["8L1"];
		this.modData("Learnsets", "plasmanta").learnset.supersonic = ["8L6"];
		this.modData("Learnsets", "plasmanta").learnset.acid = ["8L9"];
		this.modData("Learnsets", "plasmanta").learnset.pounce = ["8L12"];
		this.modData("Learnsets", "plasmanta").learnset.bodypress = ["8M"];
		this.modData("Learnsets", "plasmanta").learnset.dive = ["8M"];
		this.modData("Learnsets", "plasmanta").learnset.electroball = ["8M"];
		this.modData("Learnsets", "plasmanta").learnset.surf = ["8M"];
		// Floatoy
		this.modData("Learnsets", "floatoy").learnset.playnice = ["8D"];
		this.modData("Learnsets", "floatoy").learnset.splash = ["8L1"];
		this.modData("Learnsets", "floatoy").learnset.whitewater = ["8L3"];
		delete this.modData('Learnsets', 'floatoy').learnset.toxic;
		// Caimanoe
		this.modData("Learnsets", "caimanoe").learnset.muddywater = ["8D"];
		this.modData("Learnsets", "caimanoe").learnset.splash = ["8L1"];
		this.modData("Learnsets", "caimanoe").learnset.whitewater = ["8L3"];
		delete this.modData('Learnsets', 'caimanoe').learnset.toxic;
		// Naviathan
		this.modData("Learnsets", "naviathan").learnset.nobleroar = ["8D"];
		this.modData("Learnsets", "naviathan").learnset.splash = ["8L1"];
		this.modData("Learnsets", "naviathan").learnset.whitewater = ["8L3"];
		this.modData("Learnsets", "naviathan").learnset.bodypress = ["8M"];
		this.modData("Learnsets", "naviathan").learnset.breakingswipe = ["8M"];
		this.modData("Learnsets", "naviathan").learnset.screech = ["8M"];
		this.modData("Learnsets", "naviathan").learnset.steelbeam = ["8T"];
		delete this.modData('Learnsets', 'naviathan').learnset.toxic;
		// Crucibelle
		this.modData("Learnsets", "crucibelle").learnset.venomdrench = ["8D"];
		this.modData("Learnsets", "crucibelle").learnset.assurance = ["8M"];
		this.modData("Learnsets", "crucibelle").learnset.faketears = ["8M"];
		this.modData("Learnsets", "crucibelle").learnset.fullcollide = ["8M"];
		this.modData("Learnsets", "crucibelle").learnset.irondefense = ["8M"];
		this.modData("Learnsets", "crucibelle").learnset.powergem = ["8M"];
		// Pluffle
		this.modData("Learnsets", "pluffle").learnset.rebound = ["8D"];
		this.modData("Learnsets", "pluffle").learnset.daydream = ["8L1"];
		this.modData("Learnsets", "pluffle").learnset.pounce = ["8L16"];
		this.modData("Learnsets", "pluffle").learnset.allyswitch = ["8M"];
		this.modData("Learnsets", "pluffle").learnset.encore = ["8M"];
		delete this.modData('Learnsets', 'pluffle').learnset.toxic;
		// Kerfluffle
		this.modData("Learnsets", "kerfluffle").learnset.rebound = ["8D"];
		this.modData("Learnsets", "kerfluffle").learnset.daydream = ["8L1"];
		this.modData("Learnsets", "kerfluffle").learnset.fairywind = ["8L5"];
		this.modData("Learnsets", "kerfluffle").learnset.pounce = ["8L16"];
		this.modData("Learnsets", "kerfluffle").learnset.snore = ["8L41", "8M"];
		this.modData("Learnsets", "kerfluffle").learnset.allyswitch = ["8M"];
		this.modData("Learnsets", "kerfluffle").learnset.endure = ["8M"];
		delete this.modData('Learnsets', 'kerfluffle').learnset.toxic;
		// Pajantom
		this.modData("Learnsets", "pajantom").learnset.imprison = ["8D"];
		this.modData("Learnsets", "pajantom").learnset.breakingswipe = ["8M"];
		this.modData("Learnsets", "pajantom").learnset.hex = ["8M"];
		this.modData("Learnsets", "pajantom").learnset.nastyplot = ["8M"];
		this.modData("Learnsets", "pajantom").learnset.poltergeist = ["8M"];
		delete this.modData('Learnsets', 'pajantom').learnset.toxic;
		// Mumbao
		this.modData("Learnsets", "mumbao").learnset.wish = ["8D"];
		this.modData("Learnsets", "mumbao").learnset.daydream = ["8L21"];
		this.modData("Learnsets", "mumbao").learnset.gigadrain = ["8L31"];
		this.modData("Learnsets", "mumbao").learnset.naturalgift = ["8M"];
		this.modData("Learnsets", "mumbao").learnset.teeterdance = ["8E"];
		delete this.modData('Learnsets', 'mumbao').learnset.toxic;
		// Jumbao
		this.modData("Learnsets", "jumbao").learnset.wish = ["8D"];
		this.modData("Learnsets", "jumbao").learnset.daydream = ["8L21"];
		this.modData("Learnsets", "jumbao").learnset.gigadrain = ["8L32"];
		this.modData("Learnsets", "jumbao").learnset.naturalgift = ["8M"];
		delete this.modData('Learnsets', 'jumbao').learnset.toxic;
		// Fawnifer
		this.modData("Learnsets", "fawnifer").learnset.solarblade = ["8D"];
		this.modData("Learnsets", "fawnifer").learnset.charm = ["8M"];
		this.modData("Learnsets", "fawnifer").learnset.endure = ["8M"];
		delete this.modData('Learnsets', 'fawnifer').learnset.toxic;
		// Electrelk
		this.modData("Learnsets", "electrelk").learnset.solarblade = ["8D"];
		this.modData("Learnsets", "electrelk").learnset.charm = ["8M"];
		this.modData("Learnsets", "electrelk").learnset.eerieimpulse = ["8M"];
		delete this.modData('Learnsets', 'electrelk').learnset.toxic;
		// Caribolt
		this.modData("Learnsets", "caribolt").learnset.solarblade = ["8D"];
		this.modData("Learnsets", "caribolt").learnset.charm = ["8M"];
		this.modData("Learnsets", "caribolt").learnset.eerieimpulse = ["8M"];
		delete this.modData('Learnsets', 'caribolt').learnset.toxic;
		// Smogecko
		this.modData("Learnsets", "smogecko").learnset.strangesmoke = ["8D"];
		this.modData("Learnsets", "smogecko").learnset.preheat = ["8L1"];
		this.modData("Learnsets", "smogecko").learnset.tussle = ["8L1"];
		// Smoguana
		this.modData("Learnsets", "smoguana").learnset.strangesmoke = ["8D"];
		this.modData("Learnsets", "smoguana").learnset.preheat = ["8L1"];
		this.modData("Learnsets", "smoguana").learnset.tussle = ["8L1"];
		// Smokomodo
		this.modData("Learnsets", "smokomodo").learnset.strangesmoke = ["8D"];
		this.modData("Learnsets", "smokomodo").learnset.preheat = ["8L1"];
		this.modData("Learnsets", "smokomodo").learnset.tussle = ["8L1"];
		// Swirlpool
		this.modData("Learnsets", "swirlpool").learnset.lifedew = ["8D"];
		// Coribalis
		this.modData("Learnsets", "coribalis").learnset.lifedew = ["8D"];
		// Snaelstrom
		this.modData("Learnsets", "snaelstrom").learnset.lifedew = ["8D"];
		// Justyke
		this.modData("Learnsets", "justyke").learnset.revenge = ["8D"];
		this.modData("Learnsets", "justyke").learnset.steelbeam = ["8T"];
		// Equilibra
		this.modData("Learnsets", "equilibra").learnset.revenge = ["8D"];
		this.modData("Learnsets", "equilibra").learnset.steelbeam = ["8T"];
		// Solotl
		this.modData("Learnsets", "solotl").learnset.lifedew = ["8D"];
		// Astrolotl
		this.modData("Learnsets", "astrolotl").learnset.lifedew = ["8D"];
		// Miasmite
		this.modData("Learnsets", "miasmite").learnset.jawlock = ["8D"];
		this.modData("Learnsets", "miasmite").learnset.firefang = ["8E"];
		this.modData("Learnsets", "miasmite").learnset.icefang = ["8E"];
		this.modData("Learnsets", "miasmite").learnset.megahorn = ["8E"];
		this.modData("Learnsets", "miasmite").learnset.thunderfang = ["8E"];
		// Miasmaw
		this.modData("Learnsets", "miasmaw").learnset.jawlock = ["8D"];
		delete this.modData('Learnsets', 'miasmaw').learnset.closecombat;
		delete this.modData('Learnsets', 'miasmaw').learnset.highhorsepower;
		// Chromera
		this.modData("Learnsets", "chromera").learnset.recover = ["8D"];
		this.modData("Learnsets", "chromera").learnset.pounce = ["8L10"];
		this.modData("Learnsets", "chromera").learnset.aerialace = ["8L15"];
		this.modData("Learnsets", "chromera").learnset.imprison = ["8L20"];
		this.modData("Learnsets", "chromera").learnset.icefang = ["8L25"];
		this.modData("Learnsets", "chromera").learnset.firefang = ["8L25"];
		this.modData("Learnsets", "chromera").learnset.thunderfang = ["8L25"];
		this.modData("Learnsets", "chromera").learnset.spite = ["8L30"];
		this.modData("Learnsets", "chromera").learnset.firstimpression = ["8L35"];
		this.modData("Learnsets", "chromera").learnset.tantrum = ["8L40"];
		this.modData("Learnsets", "chromera").learnset.crunch = ["8L45"];
		this.modData("Learnsets", "chromera").learnset.toxic = ["8L50"];
		this.modData("Learnsets", "chromera").learnset.wideguard = ["8L55"];
		this.modData("Learnsets", "chromera").learnset.lifedew = ["8L60"];
		this.modData("Learnsets", "chromera").learnset.aromatherapy = ["8L65"];
		this.modData("Learnsets", "chromera").learnset.block = ["8M"];
		this.modData("Learnsets", "chromera").learnset.embargo = ["8M"];
		this.modData("Learnsets", "chromera").learnset.honeclaws = ["8M"];
		this.modData("Learnsets", "chromera").learnset.magiccoat = ["8M"];
		this.modData("Learnsets", "chromera").learnset.nightmare = ["8M"];
		this.modData("Learnsets", "chromera").learnset.roar = ["8M"];
		this.modData("Learnsets", "chromera").learnset.signalbeam = ["8M"];
		this.modData("Learnsets", "chromera").learnset.strength = ["8M"];
		delete this.modData('Learnsets', 'chromera').learnset.decorate;
		//Venomicon
		this.modData("Learnsets", "venomicon").learnset.jawlock = ["8D"];
		this.modData("Learnsets", "venomicon").learnset.curse = ["8L50"];
		this.modData("Learnsets", "venomicon").learnset.fellswoop = ["8L55"];
		this.modData("Learnsets", "venomicon").learnset.hurricane = ["8M"];
		delete this.modData('Learnsets', 'venomicon').learnset.coil;
	},
};