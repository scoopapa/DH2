function mergeCallback(
	c1?: (this: Battle, ...args: any[]) => any,
	c2?: (this: Battle, ...args: any[]) => any,
): ((this: Battle, ...args: any[]) => any) | undefined {
	if (!c1) return c2;
	if (!c2) return c1;
	return (function (...a) {
		const ret1 = c1.call(this, ...a);
		const ret2 = c2.call(this, ...a);
		return this.actions.combineResults(ret1, ret2);
	});
}

export const Scripts: ModdedBattleScriptsData = {
	gen: 6,
	inherit: 'gen6',
	pokemon: {
		// todo: deal with multiple statuses in the following two functions
		// protocol: use `000` to connect statuses, e.g. `brn000psn`
		getStatus(status: string | Condition) {
			status = this.battle.dex.conditions.get(status);
			if (status.includes('000')) return this.battle.dex.conditions.getByID(this.status);
			const statuses = (status.split('000') as ID[]).map(this.battle.dex.conditions.getByID);
			if (statuses[0].id === statuses[1].id && (statuses[0] as any).stackCondition) {
				return this.battle.dex.conditions.getByID((statuses[0] as any).stackCondition)
			}
			// this is all we need
			const properties = [
				'onStart', 'onResidual', 'onSwitchIn', 'onEnd',
				'onModifyAtk', 'onModifyDef', 'onModifySpA', 'onModifySpD', 'onModifySpe',
				'onAccuracy', 'onBeforeMove', 'onDeductPP', 'onDisableMove', 'onTryHeal',
			];
			let resultStatus = this.battle.dex.deepClone(statuses[0]);
			for (const prop of properties) {
				resultStatus[prop] = mergeCallback((statuses[0] as any)[prop], (statuses[1] as any)[prop])
			}
			return resultStatus;
		},
		setStatus(
			status: string | Condition,
			source: Pokemon | null = null,
			sourceEffect: Effect | null = null,
			ignoreImmunities = false
		) {
			if (!this.hp) return false;
			status = this.battle.dex.conditions.get(status);
			if (this.battle.event) {
				if (!source) source = this.battle.event.source;
				if (!sourceEffect) sourceEffect = this.battle.effect;
			}
			if (!source) source = this;

			// Nihilslave: here
			const slotsInUse = (this.status.split('000') as ID[])
				.map(this.battle.dex.conditions.getByID)
				.map(value => (value as any).statusSlots as number)
				.reduce((prevValue, currValue) => prevValue + currValue, 0);
			if (slotsInUse >= 2) {
				this.battle.add('-fail', source);
				this.battle.attrLastMove('[still]');
				return false;
			}
			// if (this.status === status.id) {
			// 	if ((sourceEffect as Move)?.status === this.status) {
			// 		this.battle.add('-fail', this, this.status);
			// 	} else if ((sourceEffect as Move)?.status) {
			// 		this.battle.add('-fail', source);
			// 		this.battle.attrLastMove('[still]');
			// 	}
			// 	return false;
			// }

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
			const prevStatusState = this.statusState;
			if (status.id) {
				const result: boolean = this.battle.runEvent('SetStatus', this, source, sourceEffect, status);
				if (!result) {
					this.battle.debug('set status [' + status.id + '] interrupted');
					return result;
				}
			}

			this.status = status.id;
			this.statusState = {id: status.id, target: this};
			if (source) this.statusState.source = source;
			if (status.duration) this.statusState.duration = status.duration;
			if (status.durationCallback) {
				this.statusState.duration = status.durationCallback.call(this.battle, this, source, sourceEffect);
			}

			if (status.id && !this.battle.singleEvent('Start', status, this.statusState, this, source, sourceEffect)) {
				this.battle.debug('status start [' + status.id + '] interrupted');
				// cancel the setstatus
				this.status = prevStatus;
				this.statusState = prevStatusState;
				return false;
			}
			if (status.id && !this.battle.runEvent('AfterSetStatus', this, source, sourceEffect, status)) {
				return false;
			}
			return true;
		},
		runImmunity(type: string, message?: string | boolean) {
			if (!type || type === '???') return true;
			// Nihilslave: i think tpdp types can be recognized by this?
			if (!this.battle.dex.types.isName(type)) {
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
				// Nihilslave: here
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
		// todo: for kohryu
		ignoringAbility() {
			if (this.battle.gen >= 5 && !this.isActive) return true;
			if (this.getAbility().isPermanent) return false;
			if (this.volatiles['gastroacid']) return true;
	
			// Check if any active pokemon have the ability Neutralizing Gas
			if (this.hasItem('Ability Shield') || this.ability === ('neutralizinggas' as ID)) return false;
			for (const pokemon of this.battle.getAllActive()) {
				// can't use hasAbility because it would lead to infinite recursion
				if (pokemon.ability === ('neutralizinggas' as ID) && !pokemon.volatiles['gastroacid'] &&
					!pokemon.transformed && !pokemon.abilityState.ending) {
					return true;
				}
			}
	
			return false;
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
