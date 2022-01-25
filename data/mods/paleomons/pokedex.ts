export const Pokedex: {[k: string]: ModdedSpeciesData} = {

	/*
	name: {
		num: -x,
		name: "Name",
		baseSpecies: "",
		forme: "",
		types: [""],
		baseStats: {hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0},
		abilities: {0: ""},
		weightkg: ,
	},
	*/

	kabuto: {
		inherit: true,
		otherFormes: ["Kabuto-Ancient"],
		formeOrder: ["Kabuto", "Kabuto-Ancient"],
	},

	kabutoancient: {
		num: -100,
		name: "Kabuto-Ancient",
		baseSpecies: "Kabuto",
		forme: "Ancient",
		types: ["Water", "Fairy"],
		baseStats: {hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0},
		abilities: {0: "Swift Swim", 1:"Battle Armor", H: "Marvel Scale"},
		weightkg: 100,
	},

	kabutops: {
		inherit: true,
		otherFormes: ["Kabutops-Ancient"],
		formeOrder: ["Kabutops", "Kabutops-Ancient"],
	},

	kabutopancient: {
		num: -101,
		name: "Kabutops-Ancient",
		baseSpecies: "Kabutops",
		forme: "Ancient",
		types: ["Water", "Fairy"],
		baseStats: {hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0},
		abilities: {0: "Swift Swim", 1:"Battle Armor", H: "Poison Heal"},
		weightkg: 100,
	},

	omanyte: {
		inherit: true,
		otherFormes: ["Omanyte-Ancient"],
		formeOrder: ["Omanyte", "Omanyte-Ancient"],
	},

	omanyteancient: {
		num: -102,
		name: "Omanyte-Ancient",
		baseSpecies: "Omanyte",
		forme: "Ancient",
		types: ["Water"],
		baseStats: {hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0},
		abilities: {0: "Swift Swim", H: "Torrent"},
		weightkg: 100,
	},

	omastar: {
		inherit: true,
		otherFormes: ["Omastar-Ancient"],
		formeOrder: ["Omastar", "Omastar-Ancient"],
	},

	omastarancient: {
		num: -103,
		name: "Omastar-Ancient",
		baseSpecies: "Omastar",
		forme: "Ancient",
		types: ["Water", "Poison"],
		baseStats: {hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0},
		abilities: {0: "Swift Swim", 1: "Shell Armor", H: "Bloodsuck"},
		weightkg: 100,
	},

	aerodactyl: {
		inherit: true,
		otherFormes: ["Aerodactyl-Ancient"],
		formeOrder: ["Aerodactyl", "Aerodactyl-Ancient"],
	},

	aerodactylancient: {
		num: -104,
		name: "Aerodactyl-Ancient",
		baseSpecies: "Aerodactyl",
		forme: "Ancient",
		types: ["Rock", "Flying"],
		baseStats: {hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0},
		abilities: {0: "Sheer Force", 1: "Pressure", H: "Rough Skin"},
		weightkg: 100,
	},

	anorith: {
		inherit: true,
		otherFormes: ["Anorith-Ancient"],
		formeOrder: ["Anorith", "Anorith-Ancient"],
	},

	anorithancient: {
		num: -105,
		name: "Anorith-Ancient",
		types: ["Bug"],
		baseStats: {hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0},
		abilities: {0: "Swift Swim", 1: "Battle Armor", H: "Weak Armor"},
		weightkg: 100,
	},

	armaldo: {
		inherit: true,
		otherFormes: ["Armaldo-Ancient"],
		formeOrder: ["Armaldo", "Armaldo-Ancient"],
	},

	armaldoancient: {
		num: -105,
		name: "Armaldo-Ancient",
		types: ["Bug", "Fighting"],
		baseStats: {hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0},
		abilities: {0: "Swift Swim", 1: "Battle Armor", H: "Carboniferous"},
		weightkg: 100,
	},
};