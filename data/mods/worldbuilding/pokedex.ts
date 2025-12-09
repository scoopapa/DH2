export const Pokedex: import('../../../sim/dex-species').ModdedSpeciesDataTable = {
	lumiquatro: {
		num: 9001,
		name: "Lumiquatro",
		types: ["Steel", "Flying"],
		baseStats: {hp: 90, atk: 100, def: 90, spa: 90, spd: 125, spe: 85},
		abilities: {0: "Pressure", H: "Cloud Nine"},
		weightkg: 55.4,
		otherFormes: ["Lumiquatro-Galar"],
		formeOrder: ["Lumiquatro", "Lumiquatro-Galar"],
	},
	lumiquatrogalar: {
		num: 9001,
		name: "Lumiquatro-Galar",
		baseSpecies: "Lumiquatro",
		forme: "Galar",
		types: ["Grass", "Flying"],
		baseStats: {hp: 90, atk: 100, def: 90, spa: 85, spd: 90, spe: 125},
		abilities: {0: "Moxie"},
		weightkg: 50.9,
	},
	articuno: {
		inherit: true,
		baseStats: {hp: 90, atk: 85, def: 90, spa: 105, spd: 125, spe: 100},
		abilities: {0: "Pressure", H: "Snow Warning"},
	},
	articunogalar: {
		inherit: true,
		baseStats: {hp: 90, atk: 85, def: 100, spa: 125, spd: 90, spe: 105},
	},
	mewtation: {
		num: 9002,
		name: "Mewtation",
		types: ["Psychic", "Poison"],
		baseStats: {hp: 121, atk: 94, def: 115, spa: 165, spd: 115, spe: 60},
		abilities: {0: "Ionization", H: "Perish Body"},
		weightkg: 63,
	},
	mew: {
		inherit: true,
		abilities: {0: "Protean"},
	},
	mewtwo: {
		inherit: true,
		abilities: {0: "Neuroforce"},
	},
	mewtwomegax: {
		inherit: true,
		abilities: {0: "Inner Focus"},
	},
	mewtwomegay: {
		inherit: true,
		abilities: {0: "Natural Cure"},
	},
	morida: {
		num: 9003,
		name: "Morida",
		types: ["Grass"],
		baseStats: {hp: 85, atk: 115, def: 100, spa: 90, spd: 75, spe: 115},
		abilities: {0: "Pressure", H: "Sap Sipper"},
		weightkg: 184.5,
	},
	sunshu: {
		num: 9004,
		name: "Sunshu",
		types: ["Ground"],
		baseStats: {hp: 105, atk: 115, def: 95, spa: 75, spd: 75, spe: 115},
		abilities: {0: "Pressure", H: "Earth Eater"},
		weightkg: 183.5,
	},
	raikou: {
		inherit: true,
		abilities: {0: "Pressure", H: "Volt Absorb"},
	},
	entei: {
		inherit: true,
		abilities: {0: "Pressure", H: "Flash Fire"},
	},
	suicune: {
		inherit: true,
		abilities: {0: "Pressure", H: "Water Absorb"},
	},
};
