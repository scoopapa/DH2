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
	donphanite: {
		name: "Donphanite",
		spritenum: 578,
		megaStone: "Donphan-Mega",
		megaEvolves: "Donphan",
		itemUser: ["Donphan"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -2007,
		gen: 8,
		desc: "If held by a Donphan, this item allows it to Mega Evolve in battle.",
	},
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
		gen: 8,
		desc: "If held by a Armarouge, this item allows it to Mega Evolve in battle.",
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
		gen: 8,
		desc: "If held by a Tinkaton, this item allows it to Mega Evolve in battle.",
	},
	coalossalite: {
		name: "Coalossalite",
		spritenum: 578,
		megaStone: "Coalossal-Mega",
		megaEvolves: "Coalossal",
		itemUser: ["Coalossal"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -2010,
		gen: 8,
		desc: "If held by a Coalossal, this item allows it to Mega Evolve in battle.",
	},
	revavroomite: {
		name: "Revavroomite",
		spritenum: 578,
		megaStone: "Revavroom-Mega",
		megaEvolves: "Revavroom",
		itemUser: ["Revavroom"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -2011,
		gen: 8,
		desc: "If held by a Revavroom, this item allows it to Mega Evolve in battle.",
	},
	cyclizite: {
		name: "Cyclizite",
		spritenum: 578,
		megaStone: "Cyclizar-Mega",
		megaEvolves: "Cyclizar",
		itemUser: ["Cyclizar"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -2012,
		gen: 8,
		desc: "If held by a Cyclizar, this item allows it to Mega Evolve in battle.",
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
		gen: 8,
		desc: "If held by a Pawmot, this item allows it to Mega Evolve in battle.",
	},
	grafaiaite: {
		name: "Grafaiaite",
		spritenum: 578,
		megaStone: "Grafaiai-Mega",
		megaEvolves: "Grafaiai",
		itemUser: ["Grafaiai"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -2014,
		gen: 8,
		desc: "If held by a Grafaiai, this item allows it to Mega Evolve in battle.",
	},
	cetitanite: {
		name: "Cetitanite",
		spritenum: 578,
		megaStone: "Cetitan-Mega",
		megaEvolves: "Cetitan",
		itemUser: ["Cetitan"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -2015,
		gen: 8,
		desc: "If held by a Cetitan, this item allows it to Mega Evolve in battle.",
	},
	ninetalinite: {
		name: "Ninetalinite",
		spritenum: 578,
		megaStone: "Ninetales-Mega",
		megaEvolves: "Ninetales",
		itemUser: ["Ninetales"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -2016,
		gen: 8,
		desc: "If held by a Ninetales, this item allows it to Mega Evolve in battle.",
	},
	noctowlite: {
		name: "Noctowlite",
		spritenum: 578,
		megaStone: "Noctowl-Mega",
		megaEvolves: "Noctowl",
		itemUser: ["Noctowl"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -2017,
		gen: 8,
		desc: "If held by a Noctowl, this item allows it to Mega Evolve in battle.",
	},
	hatterenite: {
		name: "Hatterenite",
		spritenum: 578,
		megaStone: "Hatterene-Mega",
		megaEvolves: "Hatterene",
		itemUser: ["Hatterene"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -2018,
		gen: 8,
		desc: "If held by a Hatterene, this item allows it to Mega Evolve in battle.",
	},
	ribombinite: {
		name: "Ribombinite",
		spritenum: 578,
		megaStone: "Ribombee-Mega",
		megaEvolves: "Ribombee",
		itemUser: ["Ribombee"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -2016,
		gen: 8,
		desc: "If held by a Ribombee, this item allows it to Mega Evolve in battle.",
	},
	bombirdite: {
		name: "Bombirdite",
		spritenum: 578,
		megaStone: "Bombirdier-Mega",
		megaEvolves: "Bombirdier",
		itemUser: ["Bombirdier"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -2017,
		gen: 8,
		desc: "If held by a Bombirdier, this item allows it to Mega Evolve in battle.",
	},
	fezandipitite: {
		name: "Fezandipitite",
		spritenum: 578,
		megaStone: "Fezandipiti-Mega",
		megaEvolves: "Fezandipiti",
		itemUser: ["Fezandipiti"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -2018,
		gen: 8,
		desc: "If held by a Fezandipiti, this item allows it to Mega Evolve in battle.",
	},
};
