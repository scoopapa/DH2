'use strict';

exports.BattleItems = {
	"redorb": {
		inherit: true,
		onSwitchIn: function (pokemon) {
		},
		onPrimal: function (pokemon) {
		},
		onTakeItem: function (item, source) {
			if (source.baseTemplate.baseSpecies === 'Groudon') return false;
			return true;
		},
	},
	"blueorb": {
		inherit: true,
		onSwitchIn: function (pokemon) {
		},
		onPrimal: function (pokemon) {
		},
		onTakeItem: function (item, source) {
			if (source.baseTemplate.baseSpecies === 'Kyogre') return false;
			return true;
		},
	},
};