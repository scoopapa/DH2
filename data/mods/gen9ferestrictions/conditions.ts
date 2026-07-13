export const Conditions: import('../../../sim/dex-conditions').ModdedConditionDataTable = {
	slp: {
		name: 'slp',
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'slp', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else if (sourceEffect && sourceEffect.effectType === 'Move') {
				this.add('-status', target, 'slp', '[from] move: ' + sourceEffect.name);
			} else {
				this.add('-status', target, 'slp');
			}
			// 1-3 turns
			this.effectState.startTime = this.sample([2, 3, 3]);
			this.effectState.time = this.effectState.startTime;

			if (target.removeVolatile('nightmare')) {
				this.add('-end', target, 'Nightmare', '[silent]');
			}
		},
		onBeforeMovePriority: 10,
		onBeforeMove(pokemon, target, move) {
			if (pokemon.hasAbility('earlybird') || pokemon.hasAbility('migration')) {
				pokemon.statusState.time--;
			}
			pokemon.statusState.time--;
			if (pokemon.statusState.time <= 0) {
				pokemon.cureStatus();
				return;
			}
			this.add('cant', pokemon, 'slp');
			if (move.sleepUsable) {
				return;
			}
			return false;
		},
	},
	par: {
		inherit: true,
		onModifySpePriority: -101,
		onModifySpe(spe, pokemon) {
			// Paralysis occurs after all other Speed modifiers, so evaluate all modifiers up to this point first
			spe = this.finalModify(spe);
			if (!pokemon.hasAbility('quickfeet') && !pokemon.hasAbility('quickfat')) {
				spe = Math.floor(spe * 50 / 100);
			}
			return spe;
		},
		onBeforeMove(pokemon) {
			if (this.randomChance(1, 8)) {
				this.add('cant', pokemon, 'par');
				return false;
			}
		},
	},
	frz: {
		inherit: true,
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'frz', '[from] ability: ' + sourceEffect.name, `[of] ${source}`);
			} else {
				this.add('-status', target, 'frz');
			}
			if (target.species.name === 'Shaymin-Sky' && target.baseSpecies.baseSpecies === 'Shaymin') {
				target.formeChange('Shaymin', this.effect, true);
			}

			this.effectState.startTime = 3;
			this.effectState.time = this.effectState.startTime;
		},
		onBeforeMove(pokemon, target, move) {
			if (move.flags['defrost'] && !(move.id === 'burnup' && !pokemon.hasType('Fire'))) return;
			pokemon.statusState.time--;
			if (pokemon.statusState.time <= 0 || this.randomChance(1, 4)) {
				pokemon.cureStatus();
				return;
			}
			this.add('cant', pokemon, 'frz');
			return false;
		},
	},

	/**
	 * If Utility Umbrella continues to work as in previous gens and Mega Sol continues to bypass defensive
	 * weather boosts, the best implementation is:
	 * - run WeatherModifyDamage with `fastExit`
	 * - give WeatherModifyDamagePriority to Mega Sol
	 * - delete the weather conditions below
	 */
	raindance: {
		inherit: true,
		onWeatherModifyDamage(damage, attacker, defender, move) {
			if (attacker.effectiveWeather() !== 'raindance') return;
			if (move.type === 'Water') {
				this.debug('rain water boost');
				return this.chainModify(1.5);
			}
			if (move.type === 'Fire') {
				this.debug('rain fire suppress');
				return this.chainModify(0.5);
			}
		},
	},
	primordialsea: {
		inherit: true,
		onWeatherModifyDamage(damage, attacker, defender, move) {
			if (attacker.effectiveWeather() !== 'primordialsea') return;
			if (move.type === 'Water') {
				this.debug('Rain water boost');
				return this.chainModify(1.5);
			}
		},
	},
	sunnyday: {
		inherit: true,
		onWeatherModifyDamage(damage, attacker, defender, move) {
			if (attacker.effectiveWeather() !== 'sunnyday') return;
			if (move.id === 'hydrosteam') {
				this.debug('Sunny Day Hydro Steam boost');
				return this.chainModify(1.5);
			}
			if (move.type === 'Fire') {
				this.debug('Sunny Day fire boost');
				return this.chainModify(1.5);
			}
			if (move.type === 'Water') {
				this.debug('Sunny Day water suppress');
				return this.chainModify(0.5);
			}
		},
	},
	desolateland: {
		inherit: true,
		onWeatherModifyDamage(damage, attacker, defender, move) {
			if (attacker.effectiveWeather() !== 'desolateland') return;
			if (move.type === 'Fire') {
				this.debug('Desolate Land fire boost');
				return this.chainModify(1.5);
			}
		},
	},
	sandstorm: {
		inherit: true,
		onModifySpD(spd, target, source) {
			if (target.hasType('Rock') && source.effectiveWeather() === 'sandstorm') {
				return this.modify(spd, 1.5);
			}
		},
	},
	snowscape: {
		inherit: true,
		onModifyDef(def, target, source) {
			if (target.hasType('Ice') && source.effectiveWeather() === 'snowscape') {
				return this.modify(def, 1.5);
			}
		},
	},
	// TODO: check Mega Sol's interaction with Deltastream
	// deltastream: {
	// 	inherit: true,
	// 	onEffectiveness(typeMod, target, type, move) {
	// 		if (move && move.effectType === 'Move' && move.category !== 'Status' && type === 'Flying' && typeMod > 0) {
	// 			this.add('-fieldactivate', 'Delta Stream');
	// 			return 0;
	// 		}
	// 	},
	// },
};
