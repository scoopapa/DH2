
'use strict';

/**@type {{[k: string]: ItemData}} */
let BattleItems = {
souldew: {
		inherit: true,
		desc: "If held by a Latias or a Latios, its Sp. Atk and Sp. Def are 1.5x.",
		onBasePower: function () {},
		onModifySpAPriority: 1,
		onModifySpA: function (spa, pokemon) {
			if (pokemon.baseTemplate.num === 380 || pokemon.baseTemplate.num === 381) {
				return this.chainModify(1.5);
			}
		},
		onModifySpDPriority: 2,
		onModifySpD: function (spd, pokemon) {
			if (pokemon.baseTemplate.num === 380 || pokemon.baseTemplate.num === 381) {
				return this.chainModify(1.5);
			}
		},
	},
};

exports.BattleItems = BattleItems;
