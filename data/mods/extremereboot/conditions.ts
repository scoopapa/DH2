export const Conditions: {[k: string]: ConditionData} = {
	frz: {
		name: 'frz',
		start: "  [Pokemon] was chilled!",
		alreadyStarted: "  [POKEMON] is already chilled!",
		end: "  [POKEMON] warmed up!",
		endFromItem: "  [POKEMON]'s [ITEM] warmed it up!",
		endFromMove: "  [POKEMON]'s [MOVE] warmed it up!",
		cant: "[POKEMON] is chilled!",
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'frz', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'frz');
			}
		},
		onModifySpe(spe, pokemon) {
			return this.chainModify(0.5);
		},
	},
	brn: {
		name: 'brn',
		start: "  [Pokemon] was sunburned!",
		alreadyStarted: "  [POKEMON] is already sunburned!",
		end: "  [POKEMON] warmed up!",
		endFromItem: "  [POKEMON]'s [ITEM] healed it's sunburn!",
		endFromMove: "  [POKEMON]'s [MOVE] healed it's sunburn!",
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'brn', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'brn');
			}
		},
		onModifyDef(def, pokemon) {
			return this.chainModify(0.75);
		},
		onModifySpD(spd, pokemon) {
			return this.chainModify(0.75);
		},
	},
	crs: {
		name: 'crs',
		start: "  [Pokemon] was cursed!",
		alreadyStarted: "  [POKEMON] is already cursed!",
		damage: "  [POKEMON] is afflicted by the curse!",
		end: "  [POKEMON]'s curse was lifted!",
		endFromItem: "  [POKEMON]'s [ITEM] lifted the curse!",
		endFromMove: "  [POKEMON]'s [MOVE] lifted the curse!",
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			this.effectData.stage = 0;
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'crs', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'crs');
			}
		},
		onSwitchIn() {
			this.effectData.stage = 0;
		},
		onResidualOrder: 9,
		onResidual(pokemon) {
			if (this.effectData.stage < 15) {
				this.effectData.stage++;
			}
			this.damage(this.clampIntRange(pokemon.baseMaxhp / 16, 1) * this.effectData.stage);
		},
	},
	fer: {
		name: 'fer',
		start: "  [Pokemon] was consumed by fear!",
		alreadyStarted: "  [POKEMON] is already afraid!",
		end: "  [POKEMON] pulled it together!",
		activate: "  [POKEMON] is shaking in fear!",
		endFromItem: "  [POKEMON]'s [ITEM] soothed its fear!",
		endFromMove: "  [POKEMON]'s [MOVE] soothed its fear!",
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			this.effectData.stage = 0;
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'fer', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'fer');
			}
		},
		onResidualOrder: 9,
		onResidual(pokemon) {
			let statName = 'atk';
			let bestStat = 0;
			let s: StatNameExceptHP;
			for (s in source.storedStats) {
				if (s === 'def' || s === 'spd') continue;
				if (source.storedStats[s] > bestStat) {
					statName = s;
					bestStat = source.storedStats[s];
				}
			}
			if (pokemon.hasAbility('unstable')) this.boost({[statName]: -2}, source);
			else this.boost({[statName]: -1}, source);
		},
	},
	highnoon: {
		name: 'High Noon',
		effectType: 'Weather',
		weatherName: "Sun",
		start: "  The sun grew brighter!",
		end: "  The sun went back to normal.",
		upkeep: "  (The sun is high in the sky.)",
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem('trickyhourglass')) {
				return 8;
			}
			return 5;
		},
		onWeatherModifyDamage(damage, attacker, defender, move) {
			if (move.type === 'Summer') {
				this.debug('High Noon Summer boost');
				return this.chainModify(1.5);
			}
			if (move.type === 'Winter') {
				this.debug('High Noon Winter suppress');
				return this.chainModify(0.5);
			}
		},
		onStart(battle, source, effect) {
			if (effect?.effectType === 'Ability') {
				this.add('-weather', 'High Noon', '[from] ability: ' + effect, '[of] ' + source);
			} else {
				this.add('-weather', 'High Noon');
			}
		},
		onResidualOrder: 1,
		onResidual() {
			this.add('-weather', 'High Noon', '[upkeep]');
			this.eachEvent('Weather');
		},
		onEnd() {
			this.add('-weather', 'none');
		},
	},
	rainyseason: {
		name: 'Rainy Season',
		effectType: 'Weather',
		weatherName: "Rain",
		start: "  A rainstorm started!",
		end: "  The rainstorm ended.",
		upkeep: "  (The rain continues to fall.)",
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem('trickyhourglass')) {
				return 8;
			}
			return 5;
		},
		onWeatherModifyDamage(damage, attacker, defender, move) {
			if (move.type === 'Spring' || move.type === 'Sea') {
				return this.chainModify(1.3);
			}
		},
		onStart(battle, source, effect) {
			if (effect?.effectType === 'Ability') {
				this.add('-weather', 'Rainy Season', '[from] ability: ' + effect, '[of] ' + source);
			} else {
				this.add('-weather', 'Rainy Season');
			}
		},
		onResidualOrder: 1,
		onResidual() {
			this.add('-weather', 'Rainy Season', '[upkeep]');
			this.eachEvent('Weather');
		},
		onEnd() {
			this.add('-weather', 'none');
		},
	},
	snowfall: {
		name: 'Snowfall',
		effectType: 'Weather',
		weatherName: "Snow",
		start: "  A snowstorm started!",
		end: "  The snowstorm ended.",
		upkeep: "  (The snow continues to fall.)",
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem('trickyhourglass')) {
				return 8;
			}
			return 5;
		},
		onWeatherModifyDamage(damage, attacker, defender, move) {
			if (move.type === 'Winter') {
				this.debug('Snowfall Winter boost');
				return this.chainModify(1.5);
			}
			if (move.type === 'Summer') {
				this.debug('Snowfall Summer suppress');
				return this.chainModify(0.5);
			}
		},
		onStart(battle, source, effect) {
			if (effect?.effectType === 'Ability') {
				this.add('-weather', 'Snowfall', '[from] ability: ' + effect, '[of] ' + source);
			} else {
				this.add('-weather', 'Snowfall');
			}
		},
		onResidualOrder: 1,
		onResidual() {
			this.add('-weather', 'Snowfall', '[upkeep]');
			this.eachEvent('Weather');
		},
		onEnd() {
			this.add('-weather', 'none');
		},
	},
};
