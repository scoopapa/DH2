'use strict';

/**@type {{[k: string]: ItemData}} */
const BattleItems = {

	"charizardite": {
		id: "charizardite",
		name: "Charizardite",
		spritenum: 585,
		megaStone: "Charizard-Mega-X",
		megaEvolves: "Charizard",
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 660,
		gen: 6,
		desc: "If held by a Charizard, this item allows it to Mega Evolve in battle.",
	},
};

exports.BattleItems = BattleItems;
