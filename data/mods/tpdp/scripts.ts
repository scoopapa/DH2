import {toID} from './dex';
export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	teambuilderConfig: {
		// for micrometas to only show custom tiers
		excludeStandardTiers: true,
		// only to specify the order of custom tiers
		customTiers: ['TPDP OU', 'TPDP LC'],
	},
	battle: {
		findPokemonEventHandlers(pokemon: Pokemon, callbackName: string, getKey?: 'duration') {
			const handlers: EventListener[] = [];

			let callback;
			for (const id in pokemon.status) {
				const statusState = pokemon.status[id];
				const status = this.dex.conditions.getByID(id as ID);
				// @ts-ignore - dynamic lookup
				callback = status[callbackName];
				if (callback !== undefined || (getKey && statusState[getKey])) {
					handlers.push(this.resolvePriority({
						effect: status, callback, state: statusState, end: pokemon.clearStatus, effectHolder: pokemon,
					}, callbackName));
				}
			}
			for (const id in pokemon.volatiles) {
				const volatileState = pokemon.volatiles[id];
				const volatile = this.dex.conditions.getByID(id as ID);
				// @ts-ignore - dynamic lookup
				callback = volatile[callbackName];
				if (callback !== undefined || (getKey && volatileState[getKey])) {
					handlers.push(this.resolvePriority({
						effect: volatile, callback, state: volatileState, end: pokemon.removeVolatile, effectHolder: pokemon,
					}, callbackName));
				}
			}
			const ability = pokemon.getAbility();
			// @ts-ignore - dynamic lookup
			callback = ability[callbackName];
			if (callback !== undefined || (getKey && pokemon.abilityState[getKey])) {
				handlers.push(this.resolvePriority({
					effect: ability, callback, state: pokemon.abilityState, end: pokemon.clearAbility, effectHolder: pokemon,
				}, callbackName));
			}
			const item = pokemon.getItem();
			// @ts-ignore - dynamic lookup
			callback = item[callbackName];
			if (callback !== undefined || (getKey && pokemon.itemState[getKey])) {
				handlers.push(this.resolvePriority({
					effect: item, callback, state: pokemon.itemState, end: pokemon.clearItem, effectHolder: pokemon,
				}, callbackName));
			}
			const species = pokemon.baseSpecies;
			// @ts-ignore - dynamic lookup
			callback = species[callbackName];
			if (callback !== undefined) {
				handlers.push(this.resolvePriority({
					effect: species, callback, state: pokemon.speciesState, end() {}, effectHolder: pokemon,
				}, callbackName));
			}
			const side = pokemon.side;
			for (const conditionid in side.slotConditions[pokemon.position]) {
				const slotConditionState = side.slotConditions[pokemon.position][conditionid];
				const slotCondition = this.dex.conditions.getByID(conditionid as ID);
				// @ts-ignore - dynamic lookup
				callback = slotCondition[callbackName];
				if (callback !== undefined || (getKey && slotConditionState[getKey])) {
					handlers.push(this.resolvePriority({
						effect: slotCondition,
						callback,
						state: slotConditionState,
						end: side.removeSlotCondition,
						endCallArgs: [side, pokemon, slotCondition.id],
						effectHolder: side,
					}, callbackName));
				}
			}

			return handlers;
		}
	},
	pokemon: {
		getStatusSlots(): number {
			let statusSlots = 0;
			for (const st in this.status) {
				const s = this.battle.dex.getEffect(st);
				console.log(s);
				if (s.statusSlots)
					statusSlots += s.statusSlots;
			}
			console.log(statusSlots);
			return statusSlots;
		},
		setStatus(
			status: string | string[] | Condition | Condition[],
			source: Pokemon | null = null,
			sourceEffect: Effect | null = null,
			ignoreImmunities = false,
			force = false
		) {
			if (Array.isArray(status)) {
				for (const s of status) {
					this.setStatus(s);
				}
				return;
			}
			if (!this.hp) return false;
			let statusSlots = this.getStatusSlots();
			console.log(statusSlots);
			status = this.battle.dex.getEffect(status);
			if (status.statusSlots && statusSlots + status.statusSlots > 2) {
				if ((sourceEffect as Move)?.status) {
					this.battle.add('-fail', source);
					this.battle.attrLastMove('[still]');
				}
				return false;
			}

			if (this.battle.event) {
				if (!source) source = this.battle.event.source;
				if (!sourceEffect) sourceEffect = this.battle.effect;
			}
			if (!source) source = this;

			if (this.status[status.id]) {
				if (status.stackCondition) {
					delete this.status[status.id];
					status = this.battle.dex.conditions.get(status.stackCondition);
				} else if ((sourceEffect as Move)?.status) {
					this.battle.add('-fail', source);
					this.battle.attrLastMove('[still]');
					return false;
				}
			}

			if (!ignoreImmunities && status.id &&
					!(source?.hasAbility('corrosion') && ['tox', 'psn'].includes(status.id))) {
				// the game currently never ignores immunities
				if (!this.runStatusImmunity(status.id === 'tox' ? 'psn' : status.id)) {
					this.battle.debug('immune to status');
					if ((sourceEffect as Move)?.status) {
						this.battle.add('-immune', this);
					}
					return false;
				}
			}
			const prevStatus = this.status;
			if (status.id) {
				const result: boolean = this.battle.runEvent('SetStatus', this, source, sourceEffect, status);
				if (!result) {
					this.battle.debug('set status [' + status.id + '] interrupted');
					return result;
				}
			}

			//where it actually sets status
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
		runImmunity(type: string, message?: string | boolean) {
			if (!type || type === '???') return true;
			if (!(type in this.battle.dex.data.TypeChart)) {
				if (
					type === 'Void'|| 
					type === 'Nature' || 
					type === 'Earth' ||
					type === 'Wind' ||
					type === 'Light' ||
					type === 'Nether' ||
					type === 'Illusion' ||
					type === 'Sound' ||
					type === 'Warped' ||
					type === 'Dream') return true;
				throw new Error("Use runStatusImmunity for " + type);
			}
			if (this.fainted) return false;

			const negateImmunity = !this.battle.runEvent('NegateImmunity', this, type);
			const notImmune = type === 'Earth' ?
				this.isGrounded(negateImmunity) :
				negateImmunity || this.battle.dex.getImmunity(type, this);
			if (notImmune) return true;
			if (!message) return false;
			if (notImmune === null) {
				this.battle.add('-immune', this, '[from] ability: Air Cushion');
			} else {
				this.battle.add('-immune', this);
			}
			return false;
		},
		getActionSpeed() {
			let speed = this.getStat('spe', false, false);
			if (this.battle.field.getPseudoWeather('trickroom') || this.battle.field.isTerrain('genbu')) {
				speed = 10000 - speed;
			}
			return this.battle.trunc(speed, 13);
		},
		ignoringAbility() {
			// Check if any active pokemon have the ability Neutralizing Gas
			let neutralizinggas = false;
			for (const pokemon of this.battle.getAllActive()) {
				// can't use hasAbility because it would lead to infinite recursion
				if (pokemon.ability === ('neutralizinggas' as ID) && !pokemon.volatiles['gastroacid'] &&
					!pokemon.abilityData.ending) {
					neutralizinggas = true;
					break;
				}
			}

			return !!(
				(this.battle.gen >= 5 && !this.isActive) ||
				((this.volatiles['gastroacid'] || (neutralizinggas && this.ability !== ('neutralizinggas' as ID))) &&
				!this.getAbility().isPermanent
				)
			);
		},
		ignoringItem() {
			return !!((this.battle.gen >= 5 && !this.isActive) ||
			(!this.getItem().ignoreKlutz && this.hasAbility(['klutz', 'wasteful'])) ||
			(this.battle.field.isTerrain('kohryu') && !this.hasAbility('centralexpanse')));
		},
		isGrounded(negateImmunity = false) {
			if ('perch' in this.volatiles) return true;
			if ('gravity' in this.battle.field.pseudoWeather) return true;
			if ('ingrain' in this.volatiles && this.battle.gen >= 4) return true;
			if ('smackdown' in this.volatiles) return true;
			const item = (this.ignoringItem() ? '' : this.item);
			if (item === 'ironball') return true;
			// If a Fire/Flying type uses Burn Up and Roost, it becomes ???/Flying-type, but it's still grounded.
			if (!negateImmunity && this.hasType('Wind') && !(this.hasType('???') && 'perch' in this.volatiles)) return false;
			if (this.hasAbility('aircushion') && !this.battle.field.isWeather("duststorm")) return false;
			if ('magnetrise' in this.volatiles) return false;
			if ('telekinesis' in this.volatiles) return false;
			return item !== 'airballoon' && item !== 'floatingstone';
		},		
		/*
		calculateStat(statName: StatNameExceptHP, boost: number, modifier?: number) {
			statName = toID(statName) as StatNameExceptHP;
			// @ts-ignore - type checking prevents 'hp' from being passed, but we're paranoid
			if (statName === 'hp') throw new Error("Please read `maxhp` directly");

			// base stat
			let stat = this.storedStats[statName];

			// Wonder Room swaps defenses before calculating anything else
			if (this.battle.field.isWeather('sunshower')) {
				if (statName === 'def') {
					stat = this.storedStats['spd'];
				} else if (statName === 'spd') {
					stat = this.storedStats['def'];
				}
			}

			// stat boosts
			let boosts: SparseBoostsTable = {};
			const boostName = statName as BoostName;
			boosts[boostName] = boost;
			boosts = this.battle.runEvent('ModifyBoost', this, null, null, boosts);
			boost = boosts[boostName]!;
			const boostTable = [1, 1.5, 2, 2.5, 3, 3.5, 4];
			if (boost > 6) boost = 6;
			if (boost < -6) boost = -6;
			if (boost >= 0) {
				stat = Math.floor(stat * boostTable[boost]);
			} else {
				stat = Math.floor(stat / boostTable[-boost]);
			}

			// stat modifier
			return this.battle.modify(stat, (modifier || 1));
		},
		getStat(statName: StatNameExceptHP, unboosted?: boolean, unmodified?: boolean) {
			statName = toID(statName) as StatNameExceptHP;
			// @ts-ignore - type checking prevents 'hp' from being passed, but we're paranoid
			if (statName === 'hp') throw new Error("Please read `maxhp` directly");

			// base stat
			let stat = this.storedStats[statName];

			// Download ignores Wonder Room's effect, but this results in
			// stat stages being calculated on the opposite defensive stat
			if (this.battle.field.isWeather('sunshower')) {
				if (statName === 'def') {
					statName = 'spd';
				} else if (statName === 'spd') {
					statName = 'def';
				}
			}

			// stat boosts
			if (!unboosted) {
				const boosts = this.battle.runEvent('ModifyBoost', this, null, null, {...this.boosts});
				let boost = boosts[statName];
				const boostTable = [1, 1.5, 2, 2.5, 3, 3.5, 4];
				if (boost > 6) boost = 6;
				if (boost < -6) boost = -6;
				if (boost >= 0) {
					stat = Math.floor(stat * boostTable[boost]);
				} else {
					stat = Math.floor(stat / boostTable[-boost]);
				}
			}

			// stat modifier effects
			if (!unmodified) {
				const statTable: {[s in StatNameExceptHP]?: string} = {atk: 'Atk', def: 'Def', spa: 'SpA', spd: 'SpD', spe: 'Spe'};
				stat = this.battle.runEvent('Modify' + statTable[statName], this, null, null, stat);
			}

			if (statName === 'spe' && stat > 10000) stat = 10000;
			return stat;
		},*/
	},
};
