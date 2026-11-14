// Mega Stones

export const Items: { [itemid: string]: ModdedItemData } = {
	// slate 0/import
	armarouginite: {
		name: "Armarouginite",
		spritenum: 578,
		megaStone: "Armarouge-Mega",
		megaEvolves: "Armarouge",
		itemUser: ["Armarouge"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -2008,
		gen: 9,
		desc: "If held by a Armarouge, this item allows it to Mega Evolve in battle.",
	},
	aurorite: {
		name: "Aurorite",
		spritenum: 578,
		megaStone: "Aurorus-Mega",
		megaEvolves: "Aurorus",
		itemUser: ["Aurorus"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1048,
		gen: 8,
		desc: "If held by an Aurorus, this item allows it to Mega Evolve in battle.",
	},
	corviknite: {
		name: "Corviknite",
		spritenum: 578,
		megaStone: "Corviknight-Mega",
		megaEvolves: "Corviknight",
		itemUser: ["Corviknight"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1006,
		gen: 8,
		desc: "If held by a Corviknight, this item allows it to Mega Evolve in battle.",
	},
	florgesite: {
		name: "Florgesite",
		spritenum: 578,
		megaStone: "Florges-Mega",
		megaEvolves: "Florges",
		itemUser: ["Florges"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1020,
		gen: 8,
		desc: "If held by a Florges, this item allows it to Mega Evolve in battle.",
	},
	mausholdinite: {
		name: "Mausholdinite",
		spritenum: 578,
		megaStone: "Maushold-Mega",
		megaEvolves: "Maushold",
		itemUser: ["Maushold"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -2045,
		gen: 9,
		desc: "If held by a Maushold, this item allows it to Mega Evolve in battle.",
	},
	pawmite: {
		name: "Pawmite",
		spritenum: 578,
		megaStone: "Pawmot-Mega",
		megaEvolves: "Pawmot",
		itemUser: ["Pawmot"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -2013,
		gen: 9,
		desc: "If held by a Pawmot, this item allows it to Mega Evolve in battle.",
	},
	rhyperiorite: {
		name: "Rhyperiorite",
		spritenum: 578,
		megaStone: "Rhyperior-Mega",
		megaEvolves: "Rhyperior",
		itemUser: ["Rhyperior"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1019,
		gen: 8,
		desc: "If held by a Rhyperior, this item allows it to Mega Evolve in battle.",
	},
	slowkinite: {
		name: "Slowkinite",
		spritenum: 578,
		megaStone: "Slowking-Mega",
		megaEvolves: "Slowking",
		itemUser: ["Slowking"],
		onTakeItem(item, source) {
			if (source.species.name.startsWith('Slowking')) return false;
			return true;
		},
		num: -1025,
		gen: 8,
		desc: "If held by a Slowking, this item allows it to Mega Evolve in battle.",
	},
	tinkatonite: {
		name: "Tinkatonite",
		spritenum: 578,
		megaStone: "Tinkaton-Mega",
		megaEvolves: "Tinkaton",
		itemUser: ["Tinkaton"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -2009,
		gen: 9,
		desc: "If held by a Tinkaton, this item allows it to Mega Evolve in battle.",
	},
	vanillite: {
		name: "Vanillite",
		spritenum: 578,
		megaStone: "Vanilluxe-Mega",
		megaEvolves: "Vanilluxe",
		itemUser: ["Vanilluxe"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1019,
		gen: 8,
		desc: "If held by a Vanilluxe, this item allows it to Mega Evolve in battle.",
	},
};
