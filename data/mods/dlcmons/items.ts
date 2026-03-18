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
		gen: 6,
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
		gen: 6,
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
		gen: 6,
		desc: "If held by a Floatzel, this item allows it to Mega Evolve in battle.",
	},
	zangoosite: {
		name: "Zangoosite",
		spritenum: 578,
		megaStone: "Zangoose-Mega",
		megaEvolves: "Zangoose",
		itemUser: ["Zangoose"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -3,
		gen: 6,
		desc: "If held by a Zangoose, this item allows it to Mega Evolve in battle.",
	},
	seviperite: {
		name: "Seviperite",
		spritenum: 578,
		megaStone: "Seviper-Mega",
		megaEvolves: "Seviper",
		itemUser: ["Seviper"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -4,
		gen: 6,
		desc: "If held by a Seviper, this item allows it to Mega Evolve in battle.",
	},
	cryogonalite: {
		name: "Cryogonalite",
		spritenum: 578,
		megaStone: "Cryogonal-Mega",
		megaEvolves: "Cryogonal",
		itemUser: ["Cryogonal"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -5,
		gen: 6,
		desc: "If held by an Cryogonal, this item allows it to Mega Evolve in battle.",
	},
	regigigite: {
		name: "Regigigite",
		spritenum: 578,
		megaStone: "Regigigas-Mega",
		megaEvolves: "Regigigas",
		itemUser: ["Regigigas"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -6,
		gen: 6,
		desc: "If held by an Regigigas, this item allows it to Mega Evolve in battle.",
	},
	laprasite: {
		name: "Laprasite",
		spritenum: 578,
		megaStone: "Lapras-Mega",
		megaEvolves: "Lapras",
		itemUser: ["Lapras"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -7,
		gen: 6,
		desc: "If held by a Lapras, this item allows it to Mega Evolve in battle.",
	},
	wigglytite: {
		name: "Wigglytite",
		spritenum: 578,
		megaStone: "Wigglytuff-Mega",
		megaEvolves: "Wigglytuff",
		itemUser: ["Wigglytuff"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -8,
		gen: 6,
		desc: "If held by a Wigglytuff, this item allows it to Mega Evolve in battle.",
	},
};
