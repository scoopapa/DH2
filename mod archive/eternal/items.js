'use strict';

/**@type {{[k: string]: ItemData}} */
let BattleItems = {
"pikashuniumz": {
		id: "pikashuniumz",
		name: "Pikashunium Z",
		spritenum: 659,
		onTakeItem: false,
		zMove: "10,000,000 Volt Thunderbolt",
		zMoveFrom: "Thunderbolt",
		zMoveUser: ["Pikachu-Original", "Pikachu-Hoenn", "Pikachu-Sinnoh", "Pikachu-Unova", "Pikachu-Kalos", "Pikachu-Alola", "Pikachu-Partner", "Pikachu-Eternal"],
		num: 836,
		gen: 7,
		desc: "If held by cap Pikachu with Thunderbolt, it can use 10,000,000 Volt Thunderbolt.",
	},
  "pikaniumz": {
		id: "pikaniumz",
		name: "Pikanium Z",
		spritenum: 649,
		onTakeItem: false,
		zMove: "Catastropika",
		zMoveFrom: "Volt Tackle",
		zMoveUser: ["Pikachu", "Pikachu-Eternal"],
		num: 794,
		gen: 7,
		desc: "If held by a Pikachu with Volt Tackle, it can use Catastropika.",
	},
"eeviumz": {
inherit: true,
zMoveUser: ["Eevee", "Eevee-Eternal"],
},
};

exports.BattleItems = BattleItems;
