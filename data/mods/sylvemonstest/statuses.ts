export const Statuses: {[k: string]: ModdedStatusData} = {
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
		durationCallback: function (source, effect) {
			if (source && source.hasItem('icyrock')) {
				return 8;
			}
			return 5;
		},
		onStart: function (battle, source, effect) {
			if (effect && effect.effectType === 'Ability') {
				if (this.gen <= 5) this.effectData.duration = 0;
				this.add('-weather', 'Hail', '[from] ability: ' + effect, '[of] ' + source);
			} else {
				this.add('-weather', 'Hail');
			}
		},
		onResidualOrder: 1,
		onResidual: function () {
			this.add('-weather', 'Hail', '[upkeep]');
			if (this.field.isWeather('hail')) this.eachEvent('Weather');
		},
		onModifyDef: function (def, pokemon) {
			if (pokemon.hasType('Ice') && this.field.isWeather('hail')) {
				return this.modify(def, 1.5);
			}
		},
		onWeather: function (target) {
			this.damage(target.maxhp / 16);
		},
		onEnd: function () {
			this.add('-weather', 'none');
		},
	},
	aircurrent: {
		effectType: 'Weather',
		duration: 5,
		num: 0,
		durationCallback: function (source, effect) {
			if (source && source.hasItem('breezerock')) {
				return 8;
			}
			return 5;
		},
		onWeatherModifyDamage: function (damage, attacker, defender, move) {
			if (move.type === 'Rock' || move.type === 'Electric' || move.type === 'Ice' && defender.type === 'Flying') {
				this.debug('Air Current suppress');
				return this.chainModify(0.75);
			}
		},
		onStart: function (battle, source, effect) {
			if (effect && effect.effectType === 'Ability') {
				if (this.gen <= 5) this.effectData.duration = 0;
				this.add('-weather', 'AirCurrent', '[from] ability: ' + effect, '[of] ' + source);
			} else {
				this.add('-weather', 'AirCurrent');
			}
		},
		onResidualOrder: 1,
		onResidual: function () {
			this.add('-weather', 'AirCurrent', '[upkeep]');
			this.eachEvent('Weather');
		},
		onEnd: function () {
			this.add('raw|<h3>Air Current faded away</h3>');
		},
	},
	shadowsky: {
		effectType: 'Weather',
		duration: 5,
		num: 0,
		durationCallback: function (source, effect) {
		if (source && source.hasItem('shadowrock')) {
				return 8;
			}
			return 5;
		},
		onWeatherModifyDamage: function (damage, attacker, defender, move) {
			if (move.type === 'Dark' || move.type === 'Ghost') {
				this.debug('Shadow Sky boost');
				return this.chainModify(1.5);
			}
		},
		onStart: function (battle, source, effect) {
			if (effect && effect.effectType === 'Ability') {
				if (this.gen <= 5) this.effectData.duration = 0;
				this.add('-weather', 'ShadowSky', '[from] ability: ' + effect, '[of] ' + source);
			} else {
				this.add('-weather', 'ShadowSky');
			}
		},
		onResidualOrder: 1,
		onResidual: function () {
			this.add('-weather', 'ShadowSky', '[upkeep]');
			this.eachEvent('Weather');
		},
		onEnd: function () {
			this.add('raw|<h3>Shadow Sky faded away</h3>');
		},
	},
  };
