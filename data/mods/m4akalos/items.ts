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
		num: -1002,
		gen: 8,
		desc: "If held by a Clawitzer, this item allows it to Mega Evolve in battle.",
	},
	wormadamite: {
		name: "Wormadamite",
		spritenum: 578,
		megaStone: "Wormadam-Sandy-Mega",
		megaEvolves: "Wormadam-Sandy",
		itemUser: ["Wormadam-Sandy"],
		onTakeItem(item, source) {
			if (source.species.name.startsWith('Wormadam-Sandy')) return false;
			return true;
		},
		num: -1003,
		gen: 8,
		desc: "If held by a Wormadam-Sandy, this item allows it to Mega Evolve in battle.",
	},
	drifblimite: {
		name: "Drifblimite",
		spritenum: 578,
		megaStone: "Drifblim-Mega",
		megaEvolves: "Drifblim",
		itemUser: ["Drifblim"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1004,
		gen: 8,
		desc: "If held by a Drifblim, this item allows it to Mega Evolve in battle.",
	},
	heliolite: {
		name: "Heliolite",
		spritenum: 578,
		megaStone: "Heliolisk-Mega",
		megaEvolves: "Heliolisk",
		itemUser: ["Heliolisk"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1005,
		gen: 8,
		desc: "If held by a Heliolisk, this item allows it to Mega Evolve in battle.",
	},
	escavalite: {
		name: "Escavalite",
		spritenum: 578,
		megaStone: "Escavalier-Mega",
		megaEvolves: "Escavalier",
		itemUser: ["Escavalier"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1006,
		gen: 8,
		desc: "If held by an Escavalier, this item allows it to Mega Evolve in battle.",
	},
	haxorite: {
		name: "Haxorite",
		spritenum: 578,
		megaStone: "Haxorus-Mega",
		megaEvolves: "Haxorus",
		itemUser: ["Haxorus"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1007,
		gen: 8,
		desc: "If held by a Haxorus, this item allows it to Mega Evolve in battle.",
	},
	mienshaonite: {
		name: "Mienshaonite",
		spritenum: 578,
		megaStone: "Mienshao-Mega",
		megaEvolves: "Mienshao",
		itemUser: ["Mienshao"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1008,
		gen: 8,
		desc: "If held by a Mienshao, this item allows it to Mega Evolve in battle.",
	},
	espeonite: {
		name: "Espeonite",
		spritenum: 578,
		megaStone: "Espeon-Mega",
		megaEvolves: "Espeon",
		itemUser: ["Espeon"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1009,
		gen: 8,
		desc: "If held by an Espeon, this item allows it to Mega Evolve in battle.",
	},
	umbreonite: {
		name: "Umbreonite",
		spritenum: 578,
		megaStone: "Umbreon-Mega",
		megaEvolves: "Umbreon",
		itemUser: ["Umbreon"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1010,
		gen: 8,
		desc: "If held by an Umbreon, this item allows it to Mega Evolve in battle.",
	},
	sylveonite: {
		name: "Sylveonite",
		spritenum: 578,
		megaStone: "Sylveon-Mega",
		megaEvolves: "Sylveon",
		itemUser: ["Sylveon"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1011,
		gen: 8,
		desc: "If held by a Sylveon, this item allows it to Mega Evolve in battle.",
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
		num: -1012,
		gen: 8,
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
		num: -1013,
		gen: 8,
		desc: "If held by a Seviper, this item allows it to Mega Evolve in battle.",
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
		num: -1014,
		gen: 8,
		desc: "If held by a Solrock, this item allows it to Mega Evolve in battle.",
	},
	quagsite: {
		name: "Quagsite",
		spritenum: 578,
		megaStone: "Quagsire-Mega",
		megaEvolves: "Quagsire",
		itemUser: ["Quagsire"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1015,
		gen: 8,
		desc: "If held by a Quagsire, this item allows it to Mega Evolve in battle.",
	},
	heatmorite: {
		name: "Heatmorite",
		spritenum: 578,
		megaStone: "Heatmor-Mega",
		megaEvolves: "Heatmor",
		itemUser: ["Heatmor"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1016,
		gen: 8,
		desc: "If held by a Heatmor, this item allows it to Mega Evolve in battle.",
	},
	pangoronite: {
		name: "Pangoronite",
		spritenum: 578,
		megaStone: "Pangoro-Mega",
		megaEvolves: "Pangoro",
		itemUser: ["Pangoro"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1017,
		gen: 8,
		desc: "If held by a Pangoro, this item allows it to Mega Evolve in battle.",
	},
	jumpluffite: {
		name: "Jumpluffite",
		spritenum: 578,
		megaStone: "Jumpluff-Mega",
		megaEvolves: "Jumpluff",
		itemUser: ["Jumpluff"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1018,
		gen: 8,
		desc: "If held by a Jumpluff, this item allows it to Mega Evolve in battle.",
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
	skarmorite: {
		name: "Skarmorite",
		spritenum: 578,
		megaStone: "Skarmory-Mega",
		megaEvolves: "Skarmory",
		itemUser: ["Skarmory"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1021,
		gen: 8,
		desc: "If held by a Skarmory, this item allows it to Mega Evolve in battle.",
	},
	druddigonite: {
		name: "Druddigonite",
		spritenum: 578,
		megaStone: "Druddigon-Mega",
		megaEvolves: "Druddigon",
		itemUser: ["Druddigon"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1022,
		gen: 8,
		desc: "If held by a Druddigon, this item allows it to Mega Evolve in battle.",
	},
	chesnite: {
		name: "Chesnite",
		spritenum: 578,
		megaStone: "Chesnaught-Mega",
		megaEvolves: "Chesnaught",
		itemUser: ["Chesnaught"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1023,
		gen: 8,
		desc: "If held by a Chesnaught, this item allows it to Mega Evolve in battle.",
	},
	skuntankite: {
		name: "Skuntankite",
		spritenum: 578,
		megaStone: "Skuntank-Mega",
		megaEvolves: "Skuntank",
		itemUser: ["Skuntank"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1024,
		gen: 8,
		desc: "If held by a Skuntank, this item allows it to Mega Evolve in battle.",
	},
	emolganite: {
		name: "Emolganite",
		spritenum: 578,
		megaStone: "Emolga-Mega",
		megaEvolves: "Emolga",
		itemUser: ["Emolga"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1025,
		gen: 8,
		desc: "If held by an Emolga, this item allows it to Mega Evolve in battle.",
	},
	avaluggite: {
		name: "Avaluggite",
		spritenum: 578,
		megaStone: "Avalugg-Mega",
		megaEvolves: "Avalugg",
		itemUser: ["Avalugg"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1026,
		gen: 8,
		desc: "If held by an Avalugg, this item allows it to Mega Evolve in battle.",
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
		num: -1027,
		gen: 8,
		desc: "If held by a Lapras, this item allows it to Mega Evolve in battle.",
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
		num: -1028,
		gen: 8,
		desc: "If held by a Pyroar, this item allows it to Mega Evolve in battle.",
	},
	carbinite: {
		name: "Carbinite",
		spritenum: 578,
		megaStone: "Carbink-Mega",
		megaEvolves: "Carbink",
		itemUser: ["Carbink"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1029,
		gen: 8,
		desc: "If held by a Carbink, this item allows it to Mega Evolve in battle.",
	},

	// crossover Megas

	lanturnite: {
		name: "Lanturnite",
		spritenum: 578,
		megaStone: "Lanturn-Mega",
		megaEvolves: "Lanturn",
		itemUser: ["Lanturn"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -111,
		gen: 8,
		desc: "If held by a Lanturn, this item allows it to Mega Evolve in battle.",
	},
	simisearite: {
		name: "Simisearite",
		spritenum: 578,
		megaStone: "Simisear-Mega",
		megaEvolves: "Simisear",
		itemUser: ["Simisear"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -85,
		gen: 8,
		desc: "If held by a Simisear, this item allows it to Mega Evolve in battle.",
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
		num: -48,
		gen: 8,
		desc: "If held by an Aurorus, this item allows it to Mega Evolve in battle.",
	},
};
