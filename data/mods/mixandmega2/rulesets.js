'use strict';

exports.Formats = {
	stoneclause: {
		effectType: 'ValidatorRule',
		name: 'Stone Clause',
		onStart: function () {
			this.add('rule', 'Stone Clause: Limit one of each mega stone');
		},
		onValidateTeam: function (team, format) {
			let itemTable = {};
			for (let i = 0; i < team.length; i++) {
				let item = this.getItem(team[i].item);
				if (!item.megaStone && !item.onPrimal) continue;
				if (itemTable[item.id]) {
					return ["You are limited to one of each mega stone by Mega Stone Clause.", "(You have more than one " + item.name + ")"];
				}
				itemTable[item.id] = true;
			}
		},
	},
};
