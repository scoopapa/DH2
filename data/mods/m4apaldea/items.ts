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
		gen: 9,
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
		gen: 9,
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
		gen: 9,
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
		gen: 9,
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
		gen: 9,
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
		gen: 9,
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
		gen: 9,
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
		gen: 9,
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
		gen: 9,
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
		gen: 9,
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
		gen: 9,
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
		gen: 9,
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
		gen: 9,
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
		gen: 9,
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
		gen: 9,
		desc: "If held by a Cetitan, this item allows it to Mega Evolve in battle.",
	},
	ninetalesite: {
		name: "Ninetalesite",
		spritenum: 578,
		megaStone: "Ninetales-Mega",
		megaEvolves: "Ninetales",
		itemUser: ["Ninetales"],
		onTakeItem(item, source) {
			if (source.species.name.startsWith('Ninetales')) return false;
			return true;
		},
		num: -2016,
		gen: 9,
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
		gen: 9,
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
		gen: 9,
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
		num: -2019,
		gen: 9,
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
		num: -2020,
		gen: 9,
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
		num: -2021,
		gen: 9,
		desc: "If held by a Fezandipiti, this item allows it to Mega Evolve in battle.",
	},
	milotinite: {
		name: "Milotinite",
		spritenum: 578,
		megaStone: "Milotic-Mega",
		megaEvolves: "Milotic",
		itemUser: ["Milotic"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -2022,
		gen: 9,
		desc: "If held by a Milotic, this item allows it to Mega Evolve in battle.",
	},
	probopassite: {
		name: "Probopassite",
		spritenum: 578,
		megaStone: "Probopass-Mega",
		megaEvolves: "Probopass",
		itemUser: ["Probopass"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -2023,
		gen: 9,
		desc: "If held by a Probopass, this item allows it to Mega Evolve in battle.",
	},
	ogerponite: {
		name: "Ogerponite",
		spritenum: 578,
		megaStone: "Ogerpon-Mega",
		megaEvolves: "Ogerpon",
		itemUser: ["Ogerpon"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -2024,
		gen: 9,
		desc: "If held by a Ogerpon, this item allows it to Mega Evolve in battle.",
	},
	dugtrionite: {
		name: "Dugtrionite",
		spritenum: 578,
		megaStone: "Dugtrio-Alola-Mega",
		megaEvolves: "Dugtrio-Alola",
		itemUser: ["Dugtrio-Alola"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -2025,
		gen: 9,
		desc: "If held by a Dugtrio-Alola, this item allows it to Mega Evolve in battle.",
	},
	farigirafite: {
		name: "Farigirafite",
		spritenum: 578,
		megaStone: "Farigiraf-Mega",
		megaEvolves: "Farigiraf",
		itemUser: ["Farigiraf"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -2026,
		gen: 9,
		desc: "If held by a Farigiraf, this item allows it to Mega Evolve in battle.",
	},
	hydrapplinite: {
		name: "Hydrapplinite",
		spritenum: 578,
		megaStone: "Hydrapple-Mega",
		megaEvolves: "Hydrapple",
		itemUser: ["Hydrapple"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -2027,
		gen: 9,
		desc: "If held by a Hydrapple, this item allows it to Mega Evolve in battle.",
	},
	tentacruelinite: {
		name: "Tentacruelinite",
		spritenum: 578,
		megaStone: "Tentacruel-Mega",
		megaEvolves: "Tentacruel",
		itemUser: ["Tentacruel"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -2028,
		gen: 9,
		desc: "If held by a Tentacruel, this item allows it to Mega Evolve in battle.",
	},
	galvantulinite: {
		name: "Galvantulinite",
		spritenum: 578,
		megaStone: "Galvantula-Mega",
		megaEvolves: "Galvantula",
		itemUser: ["Galvantula"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -2029,
		gen: 9,
		desc: "If held by a Galvantula, this item allows it to Mega Evolve in battle.",
	},
	golurkite: {
		name: "Golurkite",
		spritenum: 578,
		megaStone: "Golurk-Mega",
		megaEvolves: "Golurk",
		itemUser: ["Golurk"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -2030,
		gen: 9,
		desc: "If held by a Golurk, this item allows it to Mega Evolve in battle.",
	},
	emboarite: { 
		name: "Emboarite",
		spritenum: 578,
		megaStone: "Emboar-Mega",
		megaEvolves: "Emboar",
		itemUser: ["Emboar"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -2031,
		gen: 9,
		desc: "If held by a Emboar, this item allows it to Mega Evolve in battle.",
	},
	beartite: { 
		name: "Beartite",
		spritenum: 578,
		megaStone: "Beartic-Mega",
		megaEvolves: "Beartic",
		itemUser: ["Beartic"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -2032,
		gen: 9,
		desc: "If held by a Beartic, this item allows it to Mega Evolve in battle.",
	},
	kleavorite: { 
		name: "Kleavorite",
		spritenum: 578,
		megaStone: "Kleavor-Mega",
		megaEvolves: "Kleavor",
		itemUser: ["Kleavor"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -2033,
		gen: 9,
		desc: "If held by a Kleavor, this item allows it to Mega Evolve in battle.",
	},
	slitherite: { 
		name: "Slitherwite",
		spritenum: 578,
		megaStone: "Slither Wing-Mega",
		megaEvolves: "Slither Wing",
		itemUser: ["Slither Wing"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -2034,
		gen: 9,
		desc: "If held by a Slither Wing, this item allows it to Mega Evolve in battle.",
	},
	thornite: { 
		name: "Thornite",
		spritenum: 578,
		megaStone: "Iron Thorns-Mega",
		megaEvolves: "Iron Thorns",
		itemUser: ["Iron Thorns"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -2035,
		gen: 9,
		desc: "If held by a Iron Thorns, this item allows it to Mega Evolve in battle.",
	},
	wochienite: { 
		name: "Wochienite",
		spritenum: 578,
		megaStone: "Wo-Chien-Mega",
		megaEvolves: "Wo-Chien",
		itemUser: ["Wo-Chien"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -2036,
		gen: 9,
		desc: "If held by a Wo-Chien, this item allows it to Mega Evolve in battle.",
	},
};
