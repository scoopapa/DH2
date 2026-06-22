export const Items: {[itemid: string]: ModdedItemData} = {
	smolossite: {
		name: "Smolossite",
		spritenum: 215,
		megaStone: { "S\u2019molossus": "S\u2019molossus-Mega" },
		itemUser: ["S\u2019molossus"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		num: 9001,
		desc: "If held by a S\u2019molossus, this item allows it to Mega Evolve in battle.",
	},	
	mholmite: {
		name: "Mholmite",
		spritenum: 215,
		megaStone: { "Mholm": "Mholm-Mega" },
		itemUser: ["Mholm"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		num: 9002,
		desc: "If held by a Mholm, this item allows it to Mega Evolve in battle.",
	},	
	alecorite: {
		name: "Alecorite",
		spritenum: 215,
		megaStone: { "Alecore": "Alecore-Mega" },
		itemUser: ["Alecore"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		num: 9003,
		desc: "If held by an Alecore, this item allows it to Mega Evolve in battle.",
	},	
	gargothite: {
		name: "Gargothite",
		spritenum: 215,
		megaStone: { "Gargothorn": "Gargothorn-Mega" },
		itemUser: ["Gargothorn"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		num: 9004,
		desc: "If held by a Gargothorn, this item allows it to Mega Evolve in battle.",
	},	
};
