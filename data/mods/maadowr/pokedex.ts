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

	// start
	honedgemaadowr: {
		num: -7,
		name: "Honedge-Ma'adowr",
		
		types: ["Grass"],
		baseStats: {hp: 55, atk: 80, def: 100, spa: 25, spd: 37, spe: 28},
		abilities: {0: "Intrepid Sword", H: "Friend Guard"},
		category: "Wooden Sword",
		heightm: 0.8,
		weightkg: 2,
		color: "Green",
		eggGroups: ["Grass"],

		evos: ["Doublade-Ma'adowr"],
		creator: "BlueRay",
	},
	doublademaadowr: {
		num: -8,
		name: "Doublade-Ma'adowr",
		types: ["Grass"],
		baseStats: {hp: 69, atk: 110, def: 150, spa: 35, spd: 49, spe: 35},
		abilities: {0: "Intrepid Sword, H: "Friend Guard"},
		category: "Wooden Sword",
		heightm: 0.8,
		weightkg: 4.5,
		color: "Green",
		eggGroups: ["Grass"],

		evos: ["Aegislash-Ma'adowr"],
		prevo: "Honedge-Ma'adowr",
		evoLevel: 35,
		creator: "BlueRay",
	},
	aegislashmaadowr: {
		num: -9,
		name: "Aegislash-Ma'adowr",
		
		baseForme: "Shield",
		types: [Grass", "Steel"],
		baseStats: {hp: 70, atk: 45, def: 140, spa: 45, spd: 140, spe: 60},
		abilities: {0: "Stance Change"},
		category: "Imperial Insignia",
		heightm: 1.7,
		weightkg: 53,
		color: "Green",
		eggGroups: ["Grass"],
		otherFormes: ["Aegislash-Blade-Ma'adowr"],
		formeOrder: ["Aegislash-Ma'adowr", "Aegislash-Blade-Ma'adowr"],

		prevo: "Doublade-Ma'adowr",
		evoType: "useItem",
		evoItem: "Dawn Stone",
		creator: "BlueRay",
		
	},
	aegislashblademaadowr: {
		num: -9,
		name: "Aegislash-Blade-Ma'adowr",
		
		baseSpecies: "Aegislash-Ma'adowr",
		forme: "Blade",
		types: ["Grass", "Flying"],
		baseStats: {hp: 70, atk: 140, def: 45, spa: 140, spd: 45, spe: 60},
		abilities: {0: "Stance Change"},
		category: "Imperial Insignia",
		heightm: 1.7,
		weightkg: 53,
		color: "Green",
		eggGroups: ["Grass"],
		requiredAbility: "Stance Change",
		battleOnly: "Aegislash-Ma'adowr",

		creator: "BlueRay",
	},
	// end

	// start
	shelldure: {
		num: -10,
		name: "Shelldure",

		types: ["Grass", "Ice"],
		baseStats: {hp: 30, atk: 65, def: 100, spa: 45, spd: 25, spe: 40},
		abilities: {0: "Effect Spore", 1: "Sturdy", H: "Weak Armor"},
		category: "Mushroom Sculpture",
		heightm: 0.7,
		weightkg: 6.9,
		color: "Green",
		eggGroups: ["Grass"],

		evos: ["Cloysture"],
		creator: "BlueRay",
	},
	cloysture: {
		num: -11,
		name: "Cloysture",

		types: ["Grass", "Ice"],
		baseStats: {hp: 50, atk: 95, def: 180, spa: 85, spd: 45, spe: 70},
		abilities: {0: "Effect Spore", 1: "Sturdy", H: "Weak Armor"},
		category: "Mushroom Sculpture",
		heightm: 1.5,
		weightkg: 132.5,
		color: "Green",
		eggGroups: ["Grass"],

		prevo: "Shelldure",
		evoType: "useItem",
		evoItem: "Leaf Stone",
		creator: "BlueRay",
	},
	// end

	// start
	paradisica0: {
		num: -12,
		name: "Paradisica-0",

		types: ["Grass", "Fire"],
		baseStats: {hp: 53, atk: 57, def: 45, spa: 42, spd: 45, spe: 53},
		abilities: {0: "Flame Body", H: "Seed Sower"},
		category: "Flower Bird",
		heightm: 0.4,
		weightkg: 3.6,
		color: "Green",
		eggGroups: ["Grass"],

		evos: ["Paradisica"],
		creator: "BlueRay",
	},
	paradisica: {
		num: -13,
		name: "Paradisica",

		types: ["Grass", "Fire"],
		baseStats: {hp: 103, atk: 97, def: 71, spa: 52, spd: 71, spe: 93},
		abilities: {0: "Flame Body", H: "Seed Sower"},
		category: "Flower Bird",
		heightm: 1.4,
		weightkg: 38.6,
		color: "Green",
		eggGroups: ["Grass"],

		prevo: "Paradisica-0",
		evoLevel: 32,
		creator: "BlueRay",
	},
	// end

	// start
	rolycolymaadowr: {
		num: -14,
		name: "Rolycoly-Ma'adowr",
		
		types: ["Grass"],
		baseStats: {hp: 30, atk: 40, def: 50, spa: 40, spd: 50, spe: 30},
		abilities: {0: "Wood Stove", 1: "Flame Body", H: "Well-Baked Body"},
		category: "Charcoal",
		heightm: 0.3,
		weightkg: 12.0,
		color: "Green",
		eggGroups: ["Grass"],

		evos: ["Carkol-Ma'adowr"],
		creator: "BlueRay",
	},
	carkolmaadowr: {
		num: -15,
		name: "Carkol-Ma'adowr",
		
		types: ["Grass", "Fire"],
		baseStats: {hp: 80, atk: 60, def: 90, spa: 60, spd: 70, spe: 50},
		abilities: {0: "Wood Stove", 1: "Flame Body", H: "Well-Baked Body"},
		category: "Charcoal",
		heightm: 1.1,
		weightkg: 78.0,
		color: "Green",
		eggGroups: ["Grass"],

		evos: ["Coalossal-Ma'adowr"],
		prevo: "Rolycoly-Ma'adowr",
		evoLevel: 18,
		creator: "BlueRay",
	},
	coalossalmaadowr: {
		num: -16,
		name: "Coalossal-Ma'adowr",
	
		types: [Grass", "Fire"],
		baseStats: {hp: 110, atk: 80, def: 120, spa: 80, spd: 90, spe: 30},
		abilities: {0: "Wood Stove", 1: "Flame Body", H: "Well-Baked Body"},
		category: "Charcoal",
		heightm: 2.8,
		weightkg: 310.5,
		color: "Green",
		eggGroups: ["Grass"],

		prevo: "Carkol-Ma'adowr",
		evoLevel: 34,
		creator: "BlueRay",
	},
	// end

	// start
	
};
