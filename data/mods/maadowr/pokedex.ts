export const Pokedex: { [k: string]: ModdedSpeciesData } = {
	
	// start
	
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
	// end

	// start
	immanitite: {
		num: -4,
		name: "Immanitite",

		types: ["Grass", "Psychic"],
		gender: "N",
		baseStats: {hp: 56, atk: 35, def: 42, spa: 71, spd: 42, spe: 64},
		abilities: {0: "Pure Power", H: "Anticipation"},
		category: "Wooden Statue",
		heightm: 0.6,
		weightkg: 11.2,
		color: "Green",
		eggGroups: ["Grass", "Human-like"],

		evos: ["Immanicham"],
		creator: "BlueRay",
	},
	immanicham: {
		num: -5,
		name: "Immanicham",

		types: ["Grass", "Psychic"],
		gender: "N",
		baseStats: {hp: 60, atk: 60, def: 75, spa: 60, spd: 75, spe: 80},
		abilities: {0: "Pure Power", H: "Anticipation"},
		category: "Wooden Statue",
		heightm: 1.3,
		weightkg: 31.5,
		color: "Green",
		eggGroups: ["Grass", "Human-like"],

		evos: ["Immanicus"],
		prevo: "Immanitite",
		evoLevel: 37,
		creator: "BlueRay",
	},
	immanicus: {
		num: -6,
		name: "Immanicus",

		baseForme: "Standard",
		types: ["Grass", "Psychic"],
		gender: N,
		baseStats: {hp: 100, atk: 75, def: 100, spa: 75, spd: 100, spe: 60},
		abilities: {0: "Pure Power", H: "Zen Mode"},
		category: "Wooden Statue",
		heightm: 5.3,
		weightkg: 251.3,
		color: "Green",
		eggGroups: ["Grass", "Human-like"],
		otherFormes: ["Immanicus-Zen"],
		formeOrder: ["Immanicus", "Immanicus-Zen"],

		prevo: "Immanicham",
		evoType: "other",
		creator: "BlueRay",
	},
	immanicuszen: {
		num: -6,
		name: "Immanicus-Zen",

		baseSpecies: "Immanicus",
		forme: "Zen",
		types: ["Grass", "Psychic"],
		gender: N,
		baseStats: {hp: 100, atk: 150, def: 25, spa: 150, spd: 25, spe: 120},
		abilities: {0: "Zen Mode"},
		category: "Wooden Statue",
		heightm: 5.3,
		weightkg: 251.3,
		color: "Green",
		eggGroups: ["Grass", "Human-like"],
		requiredAbility: "Zen Mode",
		battleOnly: "Immanicus",

		creator: "BlueRay",
	},
	// end
};
