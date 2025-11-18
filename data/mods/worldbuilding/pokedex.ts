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
		num: 9002,
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
};
