'use strict';

exports.BattleStatuses = {

	poisonscent: {
		effectType: 'Weather',
		duration: 5,
		durationCallback: function (source, effect) {
				if (source && source.hasItem('toxicstone')) {
					return 8;
				}
				return 5;
			},
	},
	onStart: function(battle, source, effect) {
		if (effect && effect.effectType === 'Ability') {
			if (this.gen <= 5) this.effectData.duration = 0;
			this.add('-weather', 'PoisonScent', '[from] ability: ' + effect, '[of] ' + source);
		} else {
			this.add('-weather', 'PoisonScent');
		}
	},
	onResidualOrder: 1,
	onResidual: function() {
		this.add('-weather', 'PoisonScent', '[upkeep]');
		if (this.field.isWeather('PoisonScent')) this.eachEvent('Weather');
	},
	onWeather: function (target) {
		let typeMod = this.clampIntRange(target.runEffectiveness('Poison'), -6, 6);
		this.damage(target.maxhp * Math.pow(2, typeMod) / 8);
	},
	onEnd: function() {
		this.add('-weather', 'none');
	},
        poopytimebomb: {
	         effectType: 'Weather',
	         duration: 3,
        },
	onStart: function(battle, source, effect) {
		if (effect && effect.effectType === 'Ability') {
			if (this.gen <= 5) this.effectData.duration = 0;
			this.add('-weather', 'PoopyTimeBomb', '[from] ability: ' + effect, '[of] ' + source);
		} else {
			this.add('-weather', 'PoopyTimeBomb');
		}
	},
        onResidualOrder: 1,
	onResidual: function() {
		this.add('-weather', 'PoopyTimeBomb', '[upkeep]');
		if (this.field.isWeather('PoopyTimeBomb')) this.eachEvent('Weather');
	},
        onEnd: function (target) {
	target.faint();
	},
	onEnd: function() {
		this.add('-weather', 'none');
	},
};
