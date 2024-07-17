export const Pokedex: { [k: string]: ModdedSpeciesData } = {
	chantyrus0: {
		num: -1,
		name: "Chantyrus-0",

		types: ["Grass", "Flying"],
		genderRatio: {M: 0.875, F: 0.125},
		baseStats: {hp: 56, atk: 35, def: 42, spa: 71, spd: 42, spe: 64},
		abilities: {0: "Overgrow", H: "Harvest"},
		category: "Papyrus Bird",
		heightm: 0.3,
		weightkg: 1.8,
		color: "Green",
		eggGroups: ["Flying", "Grass"],

		evos: ["Chantyrus-1"],
		creator: "BlueRay",
	},
	chantyrus1: {
		num: -2,
		name: "Chantyrus-1",

		types: ["Grass", "Flying"],
		genderRatio: {M: 0.875, F: 0.125},
		baseStats: {hp: 71, atk: 50, def: 57, spa: 96, spd: 57, spe: 89},
		abilities: {0: "Overgrow", H: "Harvest"},
		category: "Papyrus Bird",
		heightm: 1.1,
		weightkg: 30.0,
		color: "Green",
		eggGroups: ["Flying", "Grass"],

		evos: ["Chantyrus"],
		prevo: "Chantyrus-0",
		evoLevel: 17,
		creator: "BlueRay",
	},
	chantyrus: {
		num: -3,
		name: "Chantyrus",

		types: ["Grass", "Flying"],
		genderRatio: {M: 0.875, F: 0.125},
		baseStats: {hp: 86, atk: 60, def: 72, spa: 126, spd: 72, spe: 114},
		abilities: {0: "Overgrow", H: "Harvest"},
		category: "Papyrus Bird",
		heightm: 1.5,
		weightkg: 39.5,
		color: "Green",
		eggGroups: ["Flying", "Grass"],

		prevo: "Chantyrus-1",
		evoLevel: 36,
		creator: "BlueRay",
	},
};
