'use strict';

exports.BattleStatuses = {
	raindance: {
		inherit: true,
		durationCallback(source, effect) {
			if (source && ( source.hasItem('damprock') || source.hasItem('waterlily'))) {
				return 8;
			}
			return 5;
		},
	},
};
