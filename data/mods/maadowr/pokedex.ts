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
	organtica: {
		num: -17,
		name: "Organtica",

		types: ["Grass"],
		baseStats: {hp: 35, atk: 35, def: 77, spa: 125, spd: 127, spe: 141},
		abilities: {0: "Leaf Guard", 1: Immunity, H: "Solar Power"},
		category: "Plankton",
		heightm: 0.1,
		weightkg: 0.1,
		color: "Green",
		eggGroups: ["Grass", "Water 3"],

		creator: "BlueRay",
	},
	// end

	// start
	cacnea: {
		num: 331,
		name: "Cacnea",
		
		types: ["Grass"],
		baseStats: {hp: 50, atk: 85, def: 45, spa: 85, spd: 45, spe: 35},
		category: "Cactus",
		abilities: {0: "Sand Veil", H: "Water Absorb"},
		movepoolAdditions: ["assurance", "brine"],
		heightm: 0.4,
		weightkg: 51.3,
		color: "Green",
		eggGroups: ["Grass", "Human-like"],

		evos: ["Cacturne"],
	},
	cacturne: {
		num: 332,
		name: "Cacturne",
		
		types: ["Grass", "Dark"],
		baseStats: {hp: 70, atk: 115, def: 60, spa: 115, spd: 60, spe: 55},
		category: "Scarecrow",
		abilities: {0: "Sand Veil", H: "Water Absorb"},
		movepoolAdditions: ["assurance", "brine"],
		heightm: 1.3,
		weightkg: 77.4,
		color: "Green",
		eggGroups: ["Grass", "Human-like"],
		otherFormes: ["Cacturne-Mega"],
		formeOrder: ["Cacturne", "Cacturne-Mega"],

		prevo: "Cacnea",
		evoLevel: 32,
	},
	cacturnemega: {
		num: 332,
		name: "Cacturne-Mega",
		
		baseSpecies: "Cacturne",
		forme: "Mega",
		types: ["Grass", "Dark"],
		baseStats: {hp: 70, atk: 115, def: 115, spa: 115, spd: 105, spe: 55},
		category: "Scarecrow",
		abilities: {0: "Coup de Grass"},
		heightm: 1.3,
		weightkg: 77.4,
		color: "Green",
		eggGroups: ["Grass", "Human-like"],
		requiredItem: "Cacturnite",
		
		creator: "Hematite",
	},
	// end

	// start
	paras: {
		num: 46,
		name: "Paras",

		types: ["Bug", "Grass"],
		baseStats: {hp: 35, atk: 70, def: 55, spa: 45, spd: 55, spe: 25},
		abilities: {0: "Effect Spore", 1: "Dry Skin", H: "Damp"},
		movepoolAdditions: ["earthpower"],
		category: "Mushroom",
		heightm: 0.3,
		weightkg: 5.4,
		color: "Green",
		eggGroups: ["Bug", "Grass"],

		evos: ["Parasect"],
	},
	parasect: {
		num: 47,
		name: "Parasect",

		types: ["Bug", "Grass"],
		baseStats: {hp: 60, atk: 95, def: 80, spa: 60, spd: 80, spe: 30},
		abilities: {0: "Effect Spore", 1: "Dry Skin", H: "Damp"},
		movepoolAdditions: ["earthpower"],
		category: "Mushroom",
		heightm: 1.0,
		weightkg: 29.5,
		color: "Green",
		eggGroups: ["Bug", "Grass"],

		evos: ["Parascent"],
		prevo: "Paras",
		evoLevel: 24,
	},
	parascent: {
		num: -18,
		name: "Parascent",

		types: ["Bug", "Grass"],
		baseStats: {hp: 95, atk: 115, def: 95, spa: 85, spd: 95, spe: 30},
		abilities: {0: "Effect Spore", 1: "Inoculum", H: "Aroma Veil"},
		category: "Mushroom",
		heightm: 2.0,
		weightkg: 91.3,
		color: "Green",
		eggGroups: ["Bug", "Grass"],

		prevo: "Parasect",
		evoType: "levelExtra",
		evoCondition: "with a special mushroom item",
		creator: "BlueRay",
	},
	// end

	// start
	pinsirmaadowr: {
		num: -19,
		name: "Pinsir-Ma'adowr",
		
		types: ["Bug", "Ground"],
		baseStats: {hp: 65, atk: 125, def: 100, spa: 55, spd: 70, spe: 85},
		abilities: {0: "Natural Cure", 1: "Mold Breaker", H: "Filter"},
		category: "Stag Beetle",
		heightm: 1.5,
		weightkg: 55.0,
		color: "Green",
		eggGroups: ["Bug"],

		evos: ["Kabujatsu"],
		creator: "BlueRay",
	},
	kabujatsu: {
		num: -20,
		name: "Kabujatsu",

		types: ["Bug", "Ground"],
		baseStats: {hp: 105, atk: 135, def: 115, spa: 45, spd: 85, spe: 65},
		abilities: {0: "Natural Cure", 1: "Mold Breaker", H: "Filter"},
		category: "Chest Armor",
		heightm: 1.9,
		weightkg: 105.0,
		color: "Green",
		eggGroups: ["Bug"],

		prevo: "Pinsir-Ma'adowr",
		evoType: "levelExtra",
		evoCondition: "re-enact a performence and defeat four Ma'adowrian Pinsir",
		creator: "BlueRay",
	},
	// end

	// start
	goldenorbweaver: {
		num: -21,
		name: "Golden Orb Weaver",

		types: ["Bug", "Rock"],
		gender: "N",
		baseStats: {hp: 49, atk: 77, def: 98, spa: 112, spd: 98, spe: 126},
		abilities: {0: "Reconfiguration"},
		category: "Golden Spider",
		heightm: 0.1,
		weightkg: 6.0,
		color: "Yellow",
		tags: ["Ancient"],
		eggGroups: ["Undiscovered"],

		creator: "BlueRay",
	},
	// end

	// start
	dragantis0: {
		num: -22,
		name: "Dragantis-0",
		
		types: ["Bug"],
		baseStats: {hp: 40, atk: 50, def: 30, spa: 15, spd: 30, spe: 105},
		category: "Mantis",
		abilities: {0: "Compound Eyes", H: "Agitation"},
		heightm: 0.6,
		weightkg: 3.0,
		color: "Green",
		eggGroups: ["Bug", "Dragon"],

		evos: ["Dragantis"],
		creator: "BlueRay",
	},
	dragantis: {
		num: -23,
		name: "Dragantis",
		
		types: ["Bug", "Dragon"],
		baseStats: {hp: 70, atk: 100, def: 85, spa: 45, spd: 85, spe: 135},
		category: "Mantis",
		abilities: {0: "Compound Eyes", H: "Agitation"},
		heightm: 1.8,
		weightkg: 39.0,
		color: "Green",
		eggGroups: ["Bug", "Dragon"],
		otherFormes: ["Dragantis-Mega"],
		formeOrder: ["Dragantis", "Dragantis-Mega"],

		prevo: "Dragantis-0",
		evoType: "trade",
		evoItem: "Dragon Scale",
		creator: "BlueRay",
	},
	dragantismega: {
		num: -23,
		name: "Dragantis-Mega",
		
		baseSpecies: "Dragantis",
		forme: "Mega",
		types: ["Bug", "Dragon"],
		baseStats: {hp: 70, atk: 120, def: 105, spa: 65, spd: 105, spe: 155},
		category: "Mantis",
		abilities: {0: "Technician"},
		heightm: 2.4,
		weightkg: 48.0,
		color: "Green",
		eggGroups: ["Bug", "Dragon"],
		requiredItem: "Dragantistite",
		
		creator: "BlueRay",
	},
	// end

	// start
	cropcircleartist: {
		num: -24,
		name: "Crop Circle Artist",

		types: ["Bug", "Ground"],
		gender: "N",
		baseStats: {hp: 75, atk: 128, def: 95, spa: 63, spd: 95, spe: 114},
		abilities: {0: "Masquerade", H: "Overcoat"},
		category: "Crop Circle",
		heightm: 1.2,
		weightkg: 20.5,
		color: "Yellow",
		tags: ["Extraterrestrial"],
		eggGroups: ["Undiscovered"],

		creator: "BlueRay",
	},
	// end

	// start
	combee: {
		num: 415,
		name: "Combee",

		types: ["Bug", "Flying"],
		genderRatio: {M: 0.875, F: 0.125},
		baseStats: {hp: 30, atk: 30, def: 42, spa: 30, spd: 42, spe: 70},
		abilities: {0: "Honey Gather", 1: "Early Bird", H: "Hustle"},
		category: "Tiny Bee",
		heightm: 0.3,
		weightkg: 5.5,
		color: "Yellow",
		eggGroups: ["Bug"],

		evos: ["Vespiquen"],
	},
	vespiquen: {
		num: 416,
		name: "Vespiquen",

		types: ["Bug", "Flying"],
		gender: "F",
		baseStats: {hp: 70, atk: 80, def: 102, spa: 80, spd: 102, spe: 40},
		abilities: {0: "Pressure", 1: "Queenly Majesty", H: "Unnerve"},
		movepoolAdditions: ["heatwave", "nastyplot"],
		category: "Beehive",
		heightm: 1.2,
		weightkg: 38.5,
		color: "Yellow",
		eggGroups: ["Bug"],

		evos: ["Oonabee"],
		prevo: "Combee",
		evoLevel: 21,
	},
	oonabee: {
		num: -25,
		name: "Oonabee",

		types: ["Bug", "Fairy"],
		gender: "F",
		baseStats: {hp: 90, atk: 100, def: 107, spa: 100, spd: 107, spe: 50},
		abilities: {0: "Pressure", 1: "Flash Fire", H: "Flare Boost"},
		category: "One True Monarch",
		heightm: 2.0,
		weightkg: 72.5,
		color: "Yellow",
		eggGroups: ["Bug"],

		prevo: "vespiquen",
		evoType: "levelExtra",
		evoCondition: "must be revived during a battle",
		creator: "BlueRay",
	},
	// end
	durant: {
		num: 632,
		name: "Durant",

		types: ["Bug", "Steel"],
		baseStats: {hp: 58, atk: 109, def: 112, spa: 48, spd: 48, spe: 109},
		abilities: {0: "Swarm", 1: "Hustle", H: "Truant"},
		category: "Iron Ant",
		heightm: 0.3,
		weightkg: 33.0,
		color: "Gray",
		eggGroups: ["Bug"],

		evos: ["Aurulant"],
	},
	aurulant: {
		num: -26,
		name: "Aurulant",

		types: ["Bug", "Steel"],
		baseStats: {hp: 83, atk: 124, def: 127, spa: 58, spd: 58, spe: 94},
		abilities: {0: "Earth Eater", 1: "Good as Gold", H: "Truant"},
		category: "Golden Ant",
		heightm: 1.3,
		weightkg: 99.0,
		color: "Gray",
		eggGroups: ["Bug"],

		prevo: "Durant",
		evoCondition: "must defeat Hydrapple",
		creator: "BlueRay",
	},
	// end

	// start
};
