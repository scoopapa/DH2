// Mega Stones

export const Items: {[itemid: string]: ModdedItemData} = {
	gogoatite: {
		name: "Gogoatite",
		spritenum: 578,
		megaStone: "Gogoat-Mega",
		megaEvolves: "Gogoat",
		itemUser: ["Gogoat"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1001,
		gen: 8,
		desc: "If held by a Gogoat, this item allows it to Mega Evolve in battle.",
	},
	pyroarite: {
		name: "Pyroarite",
		spritenum: 578,
		megaStone: "Pyroar-Mega",
		megaEvolves: "Pyroar",
		itemUser: ["Pyroar"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1002,
		gen: 8,
		desc: "If held by a Pyroar, this item allows it to Mega Evolve in battle.",
	},
	clawitzerite: {
		name: "Clawitzerite",
		spritenum: 578,
		megaStone: "Clawitzer-Mega",
		megaEvolves: "Clawitzer",
		itemUser: ["Clawitzer"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1003,
		gen: 8,
		desc: "If held by a Clawitzer, this item allows it to Mega Evolve in battle.",
	},
};
