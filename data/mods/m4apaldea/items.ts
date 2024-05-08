export const Items: {[itemid: string]: ModdedItemData} = {
	quaquavalite: {
		name: "Quaquavalite",
		spritenum: 578,
		megaStone: "Quaquaval-Mega",
		megaEvolves: "Quaquaval",
		itemUser: ["Quaquaval"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -2001,
		gen: 8,
		desc: "If held by a Quaquaval, this item allows it to Mega Evolve in battle.",
	},
	brambleghite: {
		name: "Brambleghite",
		spritenum: 578,
		megaStone: "Brambleghast-Mega",
		megaEvolves: "Brambleghast",
		itemUser: ["Brambleghast"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -2002,
		gen: 8,
		desc: "If held by a Brambleghast, this item allows it to Mega Evolve in battle.",
	},
	lokixite: {
		name: "Lokixite",
		spritenum: 578,
		megaStone: "Lokix-Mega",
		megaEvolves: "Lokix",
		itemUser: ["Lokix"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -2003,
		gen: 8,
		desc: "If held by a Lokix, this item allows it to Mega Evolve in battle.",
	},
	grumpignite: {
		name: "Grumpignite",
		spritenum: 578,
		megaStone: "Grumpig-Mega",
		megaEvolves: "Grumpig",
		itemUser: ["Grumpig"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -2004,
		gen: 8,
		desc: "If held by a Grumpig, this item allows it to Mega Evolve in battle.",
	},
	dachsbunite: {
		name: "Dachsbunite",
		spritenum: 578,
		megaStone: "Dachsbun-Mega",
		megaEvolves: "Dachsbun",
		itemUser: ["Dachsbun"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -2005,
		gen: 8,
		desc: "If held by a Dachsbun, this item allows it to Mega Evolve in battle.",
	},
	arbolivanite: {
		name: "Arbolivanite",
		spritenum: 578,
		megaStone: "Arboliva-Mega",
		megaEvolves: "Arboliva",
		itemUser: ["Arboliva"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -2006,
		gen: 8,
		desc: "If held by a Arboliva, this item allows it to Mega Evolve in battle.",
	},
};
