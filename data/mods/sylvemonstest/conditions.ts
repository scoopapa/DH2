export const Conditions: {[k: string]: ConditionData} = {
	par: {
		name: 'par',
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'par', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'par');
			}
		},
		onModifySpe(spe, pokemon) {
			if (!pokemon.hasAbility('quickfeet')) {
				return this.chainModify(0.5);
			}
		},
		onBeforeMovePriority: 1,
		onBeforeMove(pokemon) {
			if (pokemon.hasAbility('quickfeet')) return;
			if (this.randomChance(1, 4)) {
				this.add('cant', pokemon, 'par');
				return false;
			}
		},
	},
	hail: {
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source && source.hasItem('icyrock')) {
				return 8;
			}
			return 5;
		},
		onStart(battle, source, effect) {
			if (effect && effect.effectType === 'Ability') {
				if (this.gen <= 5) this.effectState.duration = 0;
				this.add('-weather', 'Hail', '[from] ability: ' + effect, '[of] ' + source);
			} else {
				this.add('-weather', 'Hail');
			}
		},
		onResidualOrder: 1,
		onResidual() {
			this.add('-weather', 'Hail', '[upkeep]');
			if (this.field.isWeather('hail')) this.eachEvent('Weather');
		},
		onModifyDef(def, pokemon) {
			if (pokemon.hasType('Ice') && this.field.isWeather('hail')) {
				return this.modify(def, 1.5);
			}
		},
		onWeather(target) {
			this.damage(target.maxhp / 16);
		},
		onEnd() {
			this.add('-weather', 'none');
		},
	},
	aircurrent: {
		effectType: 'Weather',
		duration: 5,
		num: 0,
		durationCallback(source, effect) {
			if (source && source.hasItem('breezerock')) {
				return 8;
			}
			return 5;
		},
		onWeatherModifyDamage(damage, attacker, defender, move) {
			if (move.type === 'Rock' || move.type === 'Electric' || move.type === 'Ice' && defender.type === 'Flying') {
				this.debug('Air Current suppress');
				return this.chainModify(0.75);
			}
		},
		onStart(battle, source, effect) {
			if (effect && effect.effectType === 'Ability') {
				if (this.gen <= 5) this.effectState.duration = 0;
				this.add('-weather', 'AirCurrent', '[from] ability: ' + effect, '[of] ' + source);
			} else {
				this.add('-weather', 'AirCurrent');
			}
		},
		onResidualOrder: 1,
		onResidual() {
			this.add('-weather', 'AirCurrent', '[upkeep]');
			this.eachEvent('Weather');
			this.add('-message', 'Air Current continues.');
		},
		onEnd() {
			this.add('-weather', 'none', '[silent]');
			this.add('-message', 'Air Current faded away.');
		},
	},
	shadowsky: {
		effectType: 'Weather',
		duration: 5,
		num: 0,
		durationCallback(source, effect) {
			if (source && source.hasItem('shadowrock')) {
				return 8;
			}
			return 5;
		},
		onWeatherModifyDamage(damage, attacker, defender, move) {
			if (move.type === 'Dark' || move.type === 'Ghost') {
				this.debug('Shadow Sky boost');
				return this.chainModify(1.5);
			}
		},
		onStart(battle, source, effect) {
			if (effect && effect.effectType === 'Ability') {
				if (this.gen <= 5) this.effectState.duration = 0;
				this.add('-weather', 'ShadowSky', '[from] ability: ' + effect, '[of] ' + source);
			} else {
				this.add('-weather', 'ShadowSky');
			}
		},
		onResidualOrder: 1,
		onResidual() {
			this.add('-weather', 'ShadowSky', '[upkeep]');
			this.eachEvent('Weather');
			this.add('-message', 'Shadow Sky continues.');
		},
		onEnd() {
			this.add('-weather', 'none', '[silent]');
			this.add('-message', 'Shadow Sky faded away.');
		},
	},
};
