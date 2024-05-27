export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	gen: 9,
	teambuilderConfig: {
		// for micrometas to only show custom tiers
		excludeStandardTiers: true,
		// only to specify the order of custom tiers
	},
	
	pokemon: {
		ignoringItem() {
			return !!(
				this.itemState.knockedOff || // Gen 3-4
				(this.battle.gen >= 5 && !this.isActive) ||
				(!this.getItem().ignoreKlutz && this.hasAbility('klutz')) ||
				this.volatiles['embargo'] || this.battle.field.pseudoWeather['magicroom'] || this.battle.field.pseudoWeather['mindfuck']
			);
		}
		ignoringAbility() {
			if (this.battle.gen >= 5 && !this.isActive) return true;

			const evilAbilities = ['intimidate', 'defiant', 'angerpoint', 'unnerve', 'moody', 'infiltrator', 'pickpocket', 'darkaura', 'merciless', 'berserk', 'swordofruin', 'tabletsofruin', 'vesselofruin', 'beadsofruin', 'poisonpuppeteer', 'shadowtag', 'toxicchain', 'corrosion'];
			
			// Certain Abilities won't activate while Transformed, even if they ordinarily couldn't be suppressed (e.g. Disguise)
			if (this.getAbility().flags['notransform'] && this.transformed) return true;
			if (this.getAbility().flags['cantsuppress']) return false;
			if (this.volatiles['gastroacid']) return true;

			// Check if any active pokemon have the ability Neutralizing Gas
			if (this.hasItem('Ability Shield') || this.ability === ('neutralizinggas' as ID)) return false;
			for (const pokemon of this.battle.getAllActive()) {
				// can't use hasAbility because it would lead to infinite recursion
				if (pokemon.ability === ('neutralizinggas' as ID) && !pokemon.volatiles['gastroacid'] && 
				!pokemon.transformed && !pokemon.abilityState.ending && !this.volatiles['commanding']) {
					return true;
				}
				if (this.battle.field.pseudoWeather['fable'] && evilAbilities.includes(pokemon.ability)) return true;
			}

			return false;
		}
		calculateStat(statName: StatIDExceptHP, boost: number, modifier?: number, statUser?: Pokemon) {
		statName = toID(statName) as StatIDExceptHP;
		// @ts-ignore - type checking prevents 'hp' from being passed, but we're paranoid
		if (statName === 'hp') throw new Error("Please read `maxhp` directly");

		// base stat
		let stat = this.storedStats[statName];

		// Wonder Room swaps defenses before calculating anything else
		if ('wonderroom' in this.battle.field.pseudoWeather || 'mindfuck' in this.battle.field.pseudoWeather) {
			if (statName === 'def') {
				stat = this.storedStats['spd'];
			} else if (statName === 'spd') {
				stat = this.storedStats['def'];
			}
		}

		// stat boosts
		let boosts: SparseBoostsTable = {};
		const boostName = statName as BoostID;
		boosts[boostName] = boost;
		boosts = this.battle.runEvent('ModifyBoost', statUser || this, null, null, boosts);
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
	}
		getStat(statName: StatIDExceptHP, unboosted?: boolean, unmodified?: boolean) {
		statName = toID(statName) as StatIDExceptHP;
		// @ts-ignore - type checking prevents 'hp' from being passed, but we're paranoid
		if (statName === 'hp') throw new Error("Please read `maxhp` directly");

		// base stat
		let stat = this.storedStats[statName];

		// Download ignores Wonder Room's effect, but this results in
		// stat stages being calculated on the opposite defensive stat
		if (unmodified && ('wonderroom' in this.battle.field.pseudoWeather || 'mindfuck' in this.battle.field.pseudoWeather)) {
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
			const statTable: {[s in StatIDExceptHP]: string} = {atk: 'Atk', def: 'Def', spa: 'SpA', spd: 'SpD', spe: 'Spe'};
			stat = this.battle.runEvent('Modify' + statTable[statName], this, null, null, stat);
		}

		if (statName === 'spe' && stat > 10000 && !this.battle.format.battle?.trunc) stat = 10000;
		return stat;
	}
	},
	
	/*
	field: {
		constructor(battle: Battle) {
			this.battle = battle;
			const fieldScripts = this.battle.format.field || this.battle.dex.data.Scripts.field;
			if (fieldScripts) Object.assign(this, fieldScripts);
			this.id = '';

			this.weather = {};
			this.weatherState = {id: ''};
			this.terrain = '';
			this.terrainState = {id: ''};
			this.pseudoWeather = {};
		},
		setWeather(status: string | Condition, source: Pokemon | 'debug' | null = null, sourceEffect: Effect | null = null) {
			status = this.battle.dex.conditions.get(status);
			if (typeof(this.weather) == "string") this.weather = {};
			if (!sourceEffect && this.battle.effect) sourceEffect = this.battle.effect;
			if (!source && this.battle.event && this.battle.event.target) source = this.battle.event.target;
			if (source === 'debug') source = this.battle.sides[0].active[0];

			if (this.weather === status.id) {
				if (sourceEffect && sourceEffect.effectType === 'Ability') {
					if (this.battle.gen > 5 || this.weatherState.duration === 0) {
						return false;
					}
				} else if (this.battle.gen > 2 || status.id === 'sandstorm') {
					return false;
				}
			}
			if (source) {
				const result = this.battle.runEvent('SetWeather', source, source, status);
				if (!result) {
					if (result === false) {
						if ((sourceEffect as Move)?.weather) {
							this.battle.add('-fail', source, sourceEffect, '[from] ' + this.weather);
						} else if (sourceEffect && sourceEffect.effectType === 'Ability') {
							this.battle.add('-ability', source, sourceEffect, '[from] ' + this.weather, '[fail]');
						}
					}
					return null;
				}
			}
			const prevWeather = this.weather;
			const prevWeatherState = this.weatherState;
			this.shiftWeather(status);
			if (source) {
				this.weatherState.source = source;
				this.weatherState.sourceSlot = source.getSlot();
			}
			if (status.duration) {
				this.weatherState.duration = status.duration;
			}
			if (status.durationCallback) {
				if (!source) throw new Error(`setting weather without a source`);
				this.weatherState.duration = status.durationCallback.call(this.battle, source, source, sourceEffect);
			}
			if (!this.battle.singleEvent('FieldStart', status, this.weatherState, this, source, sourceEffect)) {
				this.weather = prevWeather;
				this.weatherState = prevWeatherState;
				return false;
			}
			this.battle.eachEvent('WeatherChange', sourceEffect);
			return true;
		},
		shiftWeather(status: string | Condition) {
			status = this.battle.dex.conditions.get(status);
			for(let i = 0; i < 4; i ++) {
				if(this.weather[i]) this.weather[i] = this.weather[i + 1];
			}
			this.weather[0] = status;
			return true;
		},
	},
	*/
};