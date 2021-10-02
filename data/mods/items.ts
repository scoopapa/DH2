export const Items: {[itemid: string]: ModdedItemData} = {
	swellowite: {
	name: "Swellowite",
	spritenum: 586,
	megaStone: "Swellow-Mega",
	megaEvolves: "Swellow",
	itemUser: ["Swellow"],
	onTakeItem(item, source) {
		if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
		return true;
		},
	num: -1001,
	gen: 8,
	desc: "If held by a Swellow, this item allows it to Mega Evolve in battle.",
	},
	milotite: {
		name: "Milotite",
		spritenum: 586,
		megaStone: "Milotic-Mega",
		megaEvolves: "MIlotic",
		itemUser: ["Milotic"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1002,
		gen: 8,
		desc: "If held by a MIlotite, this item allows it to Mega Evolve in battle.",
	},
	luminite: {
		name: "Luminite",
		spritenum: 586,
		megaStone: "Lumineon-Mega",
		megaEvolves: "Lumineon",
		itemUser: ["Lumineon"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1003,
		gen: 8,
		desc: "If held by a Lumineon, this item allows it to Mega Evolve in battle.",
	},
	emolgite: {
		name: "Emolgite",
		spritenum: 586,
		megaStone: "Emolga-Mega",
		megaEvolves: "Emolga",
		itemUser: ["Emolga"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1003,
		gen: 8,
		desc: "If held by a Emolga, this item allows it to Mega Evolve in battle.",
	},
	chimechite: {
		name: "Chimechite",
		spritenum: 586,
		megaStone: "Chimecho-Mega",
		megaEvolves: "Chimecho",
		itemUser: ["Chimecho"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1004,
		gen: 8,
		desc: "If held by a Dragonite, this item allows it to Mega Evolve in battle.",
	},
	sirfetchdite: {
		name: "Sirfetch\u2019dite",
		spritenum: 578,
		megaStone: "Sirfetch\u2019d-Mega",
		megaEvolves: "Sirfetch\u2019d",
		itemUser: ["Sirfetch\u2019d"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1005,
		gen: 8,
		desc: "If held by a Sirfetch\u2019d, this item allows it to Mega Evolve in battle.",
	},
},