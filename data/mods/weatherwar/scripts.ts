export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	gen: 9,
	teambuilderConfig: {
		// for micrometas to only show custom tiers
		excludeStandardTiers: true,
		// only to specify the order of custom tiers
	},
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
};