'use strict';

exports.BattleStatuses = {
	// Gem Energy
	raindance: {
		inherit: true,
		durationCallback: function (source, effect) {
			let duration = 5;
			if (source && source.hasItem('damprock')) duration += 3;
			if (this.field.isTerrain('rockyterrain') && source && source.hasAbility('gemenergy')) duration += 2;
			return duration;
		},
	},
	sunnyday: {
		inherit: true,
		durationCallback: function (source, effect) {
			let duration = 5;
			if (source && source.hasItem('heatrock')) duration += 3;
			if (this.field.isTerrain('rockyterrain') && source && source.hasAbility('gemenergy')) duration += 2;
			return duration;
		},
	},
	sandstorm: {
		inherit: true,
		durationCallback: function (source, effect) {
			let duration = 5;
			if (source && source.hasItem('smoothrock')) duration += 3;
			if (this.field.isTerrain('rockyterrain') && source && source.hasAbility('gemenergy')) duration += 2;
			return duration;
		},
	},
	hail: {
		inherit: true,
		durationCallback: function (source, effect) {
			let duration = 5;
			if (source && source.hasItem('icyrock')) duration += 3;
			if (this.field.isTerrain('rockyterrain') && source && source.hasAbility('gemenergy')) duration += 2;
			return duration;
		},
	},
};
