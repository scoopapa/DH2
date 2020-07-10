'use strict';

/**@type {{[k: string]: ItemData}} */
let BattleItems = {
	"omnitrix": {
		id: "omnitrix",
		name: "Omnitrix",
		onTakeItem: false,
		desc: "If held by an Alien with an Omni-forme, it allows the Alien to Omni enhance in battle.",
	},
  "ultimatrix": {
		id: "ultimatrix",
		name: "Ultimatrix",
		onTakeItem: false,
		desc: "If held by an Alien with an Ultimate forme, it allows the Alien to Ultra evolve in battle.",
	},
	"nemetrix": {
		id: "nemetrix",
		name: "Nemetrix",
		onTakeItem: false,
		desc: "Should be held by Alien with an Predator-forme.",
	},
 };

exports.BattleItems = BattleItems;
