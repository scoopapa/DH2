export const Items: {[itemid: string]: ModdedItemData} = {
	lunatonite: {
		name: "Lunatonite",
		spritenum: 578,
		megaStone: "Lunatone-Mega",
		megaEvolves: "Lunatone",
		itemUser: ["Lunatone"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1,
		gen: 9,
		desc: "If held by a Lunatone, this item allows it to Mega Evolve in battle.",
	},
	solrockite: {
		name: "Solrockite",
		spritenum: 578,
		megaStone: "Solrock-Mega",
		megaEvolves: "Solrock",
		itemUser: ["Solrock"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -2,
		gen: 9,
		desc: "If held by a Solrock, this item allows it to Mega Evolve in battle.",
	},
	floatzelite: {
		name: "Floatzelite",
		spritenum: 578,
		megaStone: "Floatzel-Mega",
		megaEvolves: "Floatzel",
		itemUser: ["Floatzel"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -2,
		gen: 9,
		desc: "If held by a Floatzel, this item allows it to Mega Evolve in battle.",
	},
};
