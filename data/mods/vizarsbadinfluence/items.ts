export const Items: {[itemid: string]: ModdedItemData} = {
	sawsbuckite: {
		name: "Sawsbuckite",
		spritenum: 578,
		megaStone: "Sawsbuck-Mega",
		megaEvolves: "Sawsbuck",
		itemUser: ["Sawsbuck"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			if (source.baseSpecies.baseSpecies === 'Delibird') return false;
			return true;
		},
		num: -1068,
		gen: 8,
		desc: "If held by a Sawsbuck, this item allows it to Mega Evolve in battle.",
	},
	venusaurite: {
		name: "Venusaurite",
		spritenum: 608,
		megaStone: "Venuroar-Mega",
		megaEvolves: "Venuroar",
		itemUser: ["Venuroar"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 659,
		desc: "If held by a Venuroar, this item allows it to Mega Evolve in battle.",
	},
};
