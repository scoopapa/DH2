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
	
		types: ["Grass", "Fire"],
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
		evoType: "other",
		evoCondition: "must be revived during a battle",
		creator: "BlueRay",
	},
	// end

	// start
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
		evoType: "other",
		evoCondition: "must defeat Gholdengo",
		creator: "BlueRay",
	},
	// end

	// start
	arastinith: {
		num: -27,
		name: "Arastinith",

		baseForme: "Shuttle",
		types: ["Bug", "Psychic"],
		gender: "N",
		baseStats: {hp: 115, atk: 90, def: 145, spa: 90, spd: 145, spe: 115},
		abilities: {0: "Interference"},
		category: "Weaver of Destiny",
		heightm: 13.8,
		weightkg: 777.7,
		color: "Yellow",
		tags: ["Restricted Legendary"],
		eggGroups: ["Undiscovered"],
		otherFormes: ["Arastinith-Protector"],
		formeOrder: ["Arastinith", "Arastinith-Protector"],

		creator: "BlueRay",
	},
	arastinithprotector: {
		num: -27,
		name: "Arastinith-Protector",

		baseSpecies: "Arastinith",
		types: ["Bug", "Ghost"],
		gender: "N",
		baseStats: {hp: 115, atk: 145, def: 90, spa: 145, spd: 90, spe: 115},
		abilities: {0: "Interference"},
		category: "Weaver of Destiny",
		heightm: 13.8,
		weightkg: 777.7,
		color: "Yellow",
		tags: ["Restricted Legendary"],
		eggGroups: ["Undiscovered"],
		changesFrom: "Arastinith",

		creator: "BlueRay",
	},
	// end

	// start
	cicadillo: {
		num: -28,
		name: "Cicadillo",

		types: ["Bug", "Psychic"],
		gender: "N",
		baseStats: {hp: 87, atk: 83, def: 85, spa: 123, spd: 85, spe: 137},
		abilities: {0: "Buzz"},
		category: "Muse",
		heightm: 0.5,
		weightkg: 10.0,
		color: "Green",
		tags: ["Mythical"],
		eggGroups: ["Undiscovered"],

		creator: "BlueRay",
	},
	// end

	// start
	sneezibia0: {
		num: -29,
		name: "Sneezibia-0",

		types: ["Fire", "Ice"],
		genderRatio: {M: 0.875, F: 0.125},
		baseStats: {hp: 63, atk: 61, def: 69, spa: 33, spd: 46, spe: 38},
		abilities: {0: "Blaze", H: "Thermal Expansion"},
		category: "Sneezing Salamander",
		heightm: 0.4,
		weightkg: 19.0,
		color: "Red",
		eggGroups: ["Monster", "Dragon"],

		evos: ["Sneezibia-1"],
		creator: "BlueRay",
	},
	sneezibia1: {
		num: -30,
		name: "Sneezibia-1",

		types: ["Fire", "Ice"],
		genderRatio: {M: 0.875, F: 0.125},
		baseStats: {hp: 78, atk: 86, def: 89, spa: 53, spd: 61, spe: 53},
		abilities: {0: "Blaze", H: "Thermal Expansion"},
		category: "Sneezing Salamander",
		heightm: 1.0,
		weightkg: 50.0,
		color: "Red",
		eggGroups: ["Monster", "Dragon"],

		evos: ["Sneezibia"],
		prevo: "Sneezibia-0",
		evoLevel: 17,
		creator: "BlueRay",
	},
	sneezibia: {
		num: -31,
		name: "Sneezibia",

		types: ["Fire", "Ice"],
		genderRatio: {M: 0.875, F: 0.125},
		baseStats: {hp: 93, atk: 116, def: 119, spa: 63, spd: 76, spe: 63},
		abilities: {0: "Blaze", H: "Thermal Expansion"},
		category: "Sneezing Salamander",
		heightm: 1.6,
		weightkg: 177.6,
		color: "Red",
		eggGroups: ["Monster", "Dragon"],

		prevo: "Sneezibia-1",
		evoLevel: 36,
		creator: "BlueRay",
	},
	// end

	// start
	heatmor: {
		num: 631,
		name: "Heatmor",

		types: ["Fire"],
		baseStats: {hp: 85, atk: 97, def: 66, spa: 105, spd: 66, spe: 65},
		abilities: {0: "Gluttony", 1: "Flash Fire", H: "White Smoke"},
		category: "Anteater",
		heightm: 1.4,
		weightkg: 58.0,
		color: "Red",
		eggGroups: ["Field"],

		evos: ["Gourmant"],
	},
	gourmant: {
		num: -32,
		name: "Gourmant",

		types: ["Fire", "Dark"],
		baseStats: {hp: 115, atk: 127, def: 71, spa: 115, spd: 71, spe: 45},
		abilities: {0: "Gluttony", 1: "Flash Fire", H: "White Smoke"},
		category: "Anteater",
		heightm: 1.4,
		weightkg: 58.0,
		color: "Red",
		eggGroups: ["Field"],

		prevo: "Heatmor",
		evoType: "other",
		evoCondition: "must defeat Hydrapple",
		creator: "quagsi",
	},
	// end

	// start
	litleo: {
		num: 667,
		name: "Litleo",
		
		types: ["Fire", "Normal"],
		genderRatio: {M: 0.125, F: 0.875},
		baseStats: {hp: 62, atk: 50, def: 58, spa: 73, spd: 54, spe: 72},
		category: "Lion Cub",
		abilities: {0: "Rivalry", 1: "Unnerve", H: "Moxie"},
		heightm: 0.6,
		weightkg: 13.5,
		color: "Brown",
		eggGroups: ["Field"],

		evos: ["Pyroar"],
	},
   pyroar: {
		num: 668,
		name: "Pyroar",
		
		types: ["Fire", "Normal"],
		genderRatio: {M: 0.125, F: 0.875},
		baseStats: {hp: 86, atk: 68, def: 72, spa: 109, spd: 66, spe: 106},
		category: "Royal",
		abilities: {0: "Rivalry", 1: "Unnerve", H: "Moxie"},
		heightm: 1.5,
		weightkg: 81.5,
		color: "Brown",
		eggGroups: ["Field"],
		otherFormes: ["Pyroar-Mega"],
		formeOrder: ["Pyroar", "Pyroar-Mega"],

		prevo: "Litleo",
		evoLevel: 35,
	},
	pyroarmega: {
		num: 668,
		name: "Pyroar-Mega",
		
		baseSpecies: "Pyroar",
		forme: "Mega",
		types: ["Fire", "Normal"],
		genderRatio: {M: 0.125, F: 0.875},
		baseStats: {hp: 86, atk: 78, def: 112, spa: 129, spd: 91, spe: 111},
		category: "Royal",
		abilities: {0: "Adaptability"},
		heightm: 1.5,
		weightkg: 81.5,
		color: "Brown",
		eggGroups: ["Field"],
		requiredItem: "Pyroarite",
		
		creator: "DrPumpkinz",
	},
	//  end

	// start
		equinoque0: {
		num: -33,
		name: "Equinoque-0",

		types: ["Water", "Rock"],
		genderRatio: {M: 0.875, F: 0.125},
		baseStats: {hp: 70, atk: 72, def: 48, spa: 30, spd: 38, spe: 52},
		abilities: {0: "Torrent", H: "Sap Sipper"},
		category: "Horse Statue",
		heightm: 1.0,
		weightkg: 100.0,
		color: "Blue",
		eggGroups: ["Field", "Mineral"],

		evos: ["Equinoque-1"],
		creator: "BlueRay",
	},
	equinoque1: {
		num: -34,
		name: "Equinoque-1",

		types: ["Water", "Rock"],
		genderRatio: {M: 0.875, F: 0.125},
		baseStats: {hp: 85, atk: 92, def: 73, spa: 40, spd: 53, spe: 77},
		abilities: {0: "Torrent", H: "Sap Sipper"},
		category: "Horse Statue",
		heightm: 1.5,
		weightkg: 150.0,
		color: "Blue",
		eggGroups: ["Field", "Mineral"],

		evos: ["Equinoque"],
		prevo: "Equinoque-0",
		evoLevel: 17,
		creator: "BlueRay",
	},
	equinoque: {
		num: -35,
		name: "Equinoque",

		types: ["Water", "Rock"],
		genderRatio: {M: 0.875, F: 0.125},
		baseStats: {hp: 100, atk: 112, def: 93, spa: 60, spd: 73, spe: 92},
		abilities: {0: "Torrent", H: "Sap Sipper"},
		category: "Horse Statue",
		heightm: 2.0,
		weightkg: 250.0,
		color: "Blue",
		eggGroups: ["Field", "Mineral"],

		prevo: "Equinoque-1",
		evoLevel: 36,
		creator: "BlueRay",
	},
	// end

	// start
	shelldermaadowr: {
		num: -36,
		name: "Shellder-Ma'adowr",
		
		types: ["Water", "Poison"],
		baseStats: {hp: 30, atk: 65, def: 100, spa: 45, spd: 25, spe: 40},
		abilities: {0: "Poison Point", 1: "Merciless", H: "Overcoat"},
		category: "Bivalve",
		heightm: 0.7,
		weightkg: 6.9,
		color: "Purple",
		eggGroups: ["Water 3"],

		evos: ["Cloyster-Ma'adowr"],
		creator: "BlueRay",
	},
	cloystermaadowr: {
		num: -37,
		name: "Cloyster-Ma'adowr",
		
		types: ["Water", "Poison"],
		baseStats: {hp: 50, atk: 95, def: 180, spa: 85, spd: 45, spe: 70},
		abilities: {0: "Poison Point", 1: "Merciless", H: "Overcoat"},
		category: "Bivalve",
		heightm: 1.5,
		weightkg: 132.5,
		color: "Purple",
		eggGroups: ["Water 3"],

		prevo: "Shellder-Ma'adowr",
		evoType: "useItem",
		evoItem: "Water Stone",
		creator: "BlueRay",
	},
	// end

	// start
	kenuterra: {
		num: -38,
		name: "Kenuterra",

		types: ["Water", "Ground"],
		gender: "N",
		baseStats: {hp: 132, atk: 156, def: 88, spa: 92, spd: 104, spe: 108},
		abilities: {0: "Cultivation"},
		category: "Ram Potter",
		heightm: 4.0,
		weightkg: 800.0,
		color: "Yellow",
		tags: ["Restricted Legendary"],
		eggGroups: ["Undiscovered"],

		creator: "BlueRay",
	},
	// end

	// start
	anquiterra: {
		num: -39,
		name: "Anquiterra",

		types: ["Water", "Grass"],
		gender: "N",
		baseStats: {hp: 132, atk: 92, def: 104, spa: 156, spd: 88, spe: 108},
		abilities: {0: "Cultivation"},
		category: "Life Bringer",
		heightm: 4.0,
		weightkg: 800.0,
		color: "Yellow",
		tags: ["Restricted Legendary"],
		eggGroups: ["Undiscovered"],

		creator: "BlueRay",
	},
	// end

	// start
	vaheelia0: {
		num: -40,
		name: "Vaheelia-0",

		types: ["Ice", "Ghost"],
		baseStats: {hp: 59, atk: 90, def: 50, spa: 20, spd: 50, spe: 71},
		abilities: {0: "Intimidate", 1: "Strong Jaw", H: "Ice Body"},
		category: "Devour",
		heightm: 0.6,
		weightkg: 15.3,
		color: "White",
		eggGroups: ["Field", "Amorphous"],

		evos: ["Vaheelia"],
		creator: "BlueRay",
	},
	vaheelia: {
		num: -41,
		name: "Vaheelia",

		types: ["Ice", "Ghost"],
		baseStats: {hp: 99, atk: 130, def: 50, spa: 40, spd: 70, spe: 111},
		abilities: {0: "Intimidate", 1: "Strong Jaw", H: "Ice Body"},
		category: "Devour",
		heightm: 1.8,
		weightkg: 142.0,
		color: "White",
		eggGroups: ["Field", "Amorphous"],

		prevo: "Vaheelia-0",
		evoType: "useItem",
		evoItem: "Ice Stone",
		creator: "BlueRay",
	},
	// end

	// start
	grillantic0: {
		num: -42,
		name: "Grillantic-0",

		types: ["Ice", "Fire"],
		baseStats: {hp: 35, atk: 35, def: 82, spa: 72, spd: 35, spe: 86},
		abilities: {0: "Flash Fire", 1: "Flare Boost", H: "Technician"},
		category: "Krill",
		heightm: 0.5,
		weightkg: 8.3,
		color: "White",
		eggGroups: ["Water 1", "Water 3"],

		evos: ["Grillantic"],
		creator: "BlueRay",
	},
	grillantic: {
		num: -43,
		name: "Grillantic",

		types: ["Ice", "Fire"],
		baseStats: {hp: 71, atk: 44, def: 85, spa: 118, spd: 69, spe: 113},
		abilities: {0: "Flash Fire", 1: "Flare Boost", H: "Technician"},
		category: "Krill",
		heightm: 1.3,
		weightkg: 35.3,
		color: "White",
		eggGroups: ["Water 1", "Water 3"],

		prevo: "Grillantic-0",
		evoLevel: 37,
		creator: "BlueRay",
	},
	// end

	// start
	callouswarden: {
		num: -44,
		name: "Callous Warden",

		types: ["Ice", "Steel"],
		gender: "N",
		baseStats: {hp: 84, atk: 56, def: 56, spa: 112, spd: 140, spe: 112},
		abilities: {0: "Reconfiguration"},
		category: "Warden",
		heightm: 1.1,
		weightkg: 184.0,
		color: "Blue",
		tags: ["Ancient"],
		eggGroups: ["Undiscovered"],

		creator: "BlueRay",
	},
	// end

	// start
	cryogonal: {
		num: 615,
		name: "Cryogonal",
		
		types: ["Ice"],
		gender: "N",
		baseStats: {hp: 80, atk: 50, def: 50, spa: 95, spd: 135, spe: 105},
		category: "Crystallizing",
		abilities: {0: "Levitate"},
		heightm: 1.1,
		weightkg: 148.0,
		color: "Blue",
		eggGroups: ["Mineral"],
		otherFormes: ["Cryogonal-Mega"],
		formeOrder: ["Cryogonal", "Cryogonal-Mega"],

	},
	cryogonalmega: {
		num: 615,
		name: "Cryogonal-Mega",
		
		baseSpecies: "Cryogonal",
		forme: "Mega",
		types: ["Ice"],
		gender: "N",
		baseStats: {hp: 80, atk: 50, def: 50, spa: 125, spd: 165, spe: 145},
		category: "Crystallizing",
		abilities: {0: "Permafrost"},
		heightm: 1.1,
		weightkg: 148.0,
		color: "Blue",
		eggGroups: ["Mineral"],
		requiredItem: "Cryogonalite",
		
		creator: "BlueRay",
	},
	// end

	// start
	mummifiedseasnake: {
		num: -45,
		name: "Mummified Sea Snake",

		types: ["Electric", "Poison"],
		gender: "N",
		baseStats: {hp: 91, atk: 119, def: 84, spa: 112, spd: 84, spe: 70},
		abilities: {0: "Reconfiguration"},
		category: "Wrapped Eel",
		heightm: 1.8,
		weightkg: 33.0,
		color: "Yellow",
		tags: ["Ancient"],
		eggGroups: ["Undiscovered"],

		creator: "BlueRay",
	},
	// end

	// start
	trouvary0: {
		num: -46,
		name: "Trouvary-0",

		types: ["Electric", "Ground"],
		baseStats: {hp: 70, atk: 65, def: 50, spa: 25, spd: 50, spe: 60},
		abilities: {0: "Frisk", 1: "Static", H: "Contrary"},
		category: "Timid Mouse",
		heightm: 0.8,
		weightkg: 50.0,
		color: "Yellow",
		eggGroups: ["Field"],

		evos: ["Trouvary"],
		creator: "BlueRay",
	},
	trouvary: {
		num: -47,
		name: "Trouvary",

		types: ["Electric", "Ground"],
		baseStats: {hp: 110, atk: 105, def: 70, spa: 45, spd: 70, spe: 90},
		abilities: {0: "Trace", 1: "Static", H: "Contrary"},
		category: "Timid Mouse",
		heightm: 1.4,
		weightkg: 88.0,
		color: "Yellow",
		eggGroups: ["Field"],

		prevo: "Trouvary-0",
		evoType: "useItem",
		evoItem: "Thunder Stone",
		creator: "BlueRay",
	},
	// end

	// start	
	stormulex0: {
		num: -48,
		name: "Stormulex-0",
		
		types: ["Electric", "Rock"],
		gender: "N",
		baseStats: {hp: 61, atk: 89, def: 76, spa: 30, spd: 64, spe: 40},
		category: "Bolt Axe",
		abilities: {0: "Volt Absorb", 1: "Natural Cure", H: "Triage"},
		heightm: 0.7,
		weightkg: 75.0,
		color: "Yellow",
		eggGroups: ["Mineral"],

		evos: ["Stormulex"],
		creator: "BlueRay",
	},
	stormulex: {
		num: -49,
		name: "Stormulex",
		
		types: ["Electric", "Rock"],
		gender: "N",
		baseStats: {hp: 91, atk: 129, def: 96, spa: 40, spd: 84, spe: 60},
		category: "Bolt Axe",
		abilities: {0: "Volt Absorb", 1: "Natural Cure", H: "Triage"},
		heightm: 1.7,
		weightkg: 125.0,
		color: "Yellow",
		eggGroups: ["Mineral"],
		otherFormes: ["Stormulex-Mega"],
		formeOrder: ["Stormulex", "Stormulex-Mega"],

		prevo: "Stormulex-0",
		evoType: "useItem",
		evoItem: "Thunder Stone",
		creator: "BlueRay",
	},
	stormulexmega: {
		num: -49,
		name: "Stormulex-Mega",
		
		baseSpecies: "Stormulex",
		forme: "Mega",
		types: ["Electric", "Rock"],
		gender: "N",
		baseStats: {hp: 91, atk: 149, def: 146, spa: 40, spd: 99, spe: 75},
		category: "Bolt Axe",
		abilities: {0: "Grassy Surge"},
		heightm: 1.7,
		weightkg: 125.0,
		color: "Yellow",
		eggGroups: ["Mineral"],
		requiredItem: "Stormulexite",
		
		creator: "BlueRay",
	},
	// end

	// start
   lostzone: {
		num: -50,
		name: "Lost Zone",

		types: ["Electric", "Ghost"],
		gender: "N",
		baseStats: {hp: 120, atk: 150, def: 84, spa: 72, spd: 98, spe: 46},
		abilities: {0: "Levitate", H: "Analytic"},
		category: "Magnet Area",
		heightm: 1.2,
		weightkg: 90.0,
		color: "Gray",
		tags: ["Extraterrestrial"],
		eggGroups: ["Undiscovered"],

		creator: "BlueRay",
	},
	// end

	// start
	shinx: {
		num: 403,
		name: "Shinx",

		types: ["Electric"],
		baseStats: {hp: 45, atk: 65, def: 34, spa: 40, spd: 34, spe: 45},
		abilities: {0: "Rivalry", 1: "Intimidate", H: "Guts"},
		category: "Flash",
		heightm: 0.5,
		weightkg: 9.5,
		color: "Yellow",
		eggGroups: ["Field"],

		evos: ["Luxio"],
	},
	luxio: {
		num: 404,
		name: "Luxio",

		types: ["Electric"],
		baseStats: {hp: 60, atk: 85, def: 49, spa: 60, spd: 49, spe: 60},
		abilities: {0: "Rivalry", 1: "Intimidate", H: "Guts"},
		category: "Spark",
		heightm: 0.9,
		weightkg: 30.5,
		color: "Yellow",
		eggGroups: ["Field"],

		evos: ["Luxray"],
		prevo: "Luxio",
		evoLevel: 15,
	},
	luxray: {
		num: 405,
		name: "Luxray",

		types: ["Electric"],
		baseStats: {hp: 80, atk: 120, def: 79, spa: 95, spd: 79, spe: 70},
		abilities: {0: "Rivalry", 1: "Intimidate", H: "Guts"},
		category: "Gleam Eyes",
		heightm: 1.4,
		weightkg: 42.0,
		color: "Yellow",
		eggGroups: ["Field"],
		otherFormes: ["Luxray-Mega"],
		formeOrder: ["Luxray", "Luxray-Mega"],

		prevo: "Luxio",
		evoLevel: 30,
	},
	luxraymega: {
		num: 405,
		name: "Luxray-Mega",
		
		baseSpecies: "Luxray",
		forme: "Mega",
		types: ["Electric", "Psychic"],
		baseStats: {hp: 80, atk: 160, def: 94, spa: 95, spd: 94, spe: 100},
		category: "Gleam Eyes",
		abilities: {0: "Dazzling"},
		heightm: 1.8,
		weightkg: 56.5,
		color: "Yellow",
		eggGroups: ["Field"],
		requiredItem: "Luxrite",
		
		creator: "BlueRay",
	},
	// end

	// start
	luminousvessel: {
		num: -51,
		name: "Luminous Vessel",

		types: ["Psychic", "Poison"],
		gender: "N",
		baseStats: {hp: 80, atk: 74, def: 78, spa: 102, spd: 138, spe: 98},
		abilities: {0: "Clear Body", H: "Water Bubble"},
		category: "USO",
		heightm: 1.6,
		weightkg: 55.0,
		color: "Purple",
		tags: ["Extraterrestrial"],
		eggGroups: ["Undiscovered"],

		creator: "BlueRay",
	},
	// end

	// start
	toweringeye: {
		num: -52,
		name: "Towering Eye",

		types: ["Psychic", "Dark"],
		gender: "N",
		baseStats: {hp: 84, atk: 105, def: 84, spa: 105, spd: 84, spe: 98},
		abilities: {0: "Reconfiguration"},
		category: "Big Eye",
		heightm: 10.1,
		weightkg: 101.0,
		color: "Black",
		tags: ["Ancient"],
		eggGroups: ["Undiscovered"],

		creator: "BlueRay",
	},
	// end

	// start
	yamask: {
		num: 562,
		name: "Yamask",
		
		types: ["Ghost"],
		baseStats: {hp: 38, atk: 30, def: 85, spa: 55, spd: 65, spe: 30},
		category: "Spirit",
		abilities: {0: "Mummy"},
		heightm: 0.5,
		weightkg: 1.5,
		color: "Black",
		eggGroups: ["Mineral", "Amorphous"],

		evos: ["Cofagrigus"],
	},
	cofagrigus: {
		num: 563,
		name: "Cofagrigus",
		
		types: ["Ghost"],
		baseStats: {hp: 58, atk: 50, def: 145, spa: 95, spd: 105, spe: 30},
		category: "Coffin",
		abilities: {0: "Mummy"},
		heightm: 1.7,
		weightkg: 76.5,
		color: "Yellow",
		eggGroups: ["Mineral", "Amorphous"],
		otherFormes: ["Cofagrigus-Mega"],
		formeOrder: ["Cofagrigus", "Cofagrigus-Mega"],

		prevo: "Yamask",
		evoLevel: 34,
	},
	cofagrigusmega: {
		num: 563,
		name: "Cofagrigus-Mega",
		
		baseSpecies: "Cofagrigus",
		forme: "Mega",
		types: ["Ghost"],
		baseStats: {hp: 58, atk: 50, def: 185, spa: 135, spd: 125, spe: 30},
		category: "Coffin",
		abilities: {0: "Good as Gold"},
		heightm: 1.7,
		weightkg: 76.5,
		color: "Yellow",
		eggGroups: ["Mineral", "Amorphous"],
		requiredItem: "Cofagrigusite",
		
		creator: "BlueRay",
	},
	// end

	// start
	drifloon: {
		num: 425,
		name: "Drifloon",
		
		types: ["Ghost", "Flying"],
		baseStats: {hp: 90, atk: 50, def: 34, spa: 60, spd: 44, spe: 70},
		category: "Balloon",
		abilities: {0: "Aftermath", 1: "Unburden", H: "Flare Boost"},
		heightm: 0.4,
		weightkg: 1.2,
		color: "Purple",
		eggGroups: ["Amorphous"],

		evos: ["Drifblim"],
	},
	drifblim: {
		num: 426,
		name: "Drifblim",
		
		types: ["Ghost", "Flying"],
		baseStats: {hp: 150, atk: 80, def: 44, spa: 90, spd: 54, spe: 80},
		category: "Blimp",
		abilities: {0: "Aftermath", 1: "Unburden", H: "Flare Boost"},
		heightm: 1.2,
		weightkg: 15.0,
		color: "Purple",
		eggGroups: ["Amorphous"],
		otherFormes: ["Drifblim-Mega"],
		formeOrder: ["Drifblim", "Drifblim-Mega"],

		prevo: "Drifloon",
		evoLevel: 29,
	},
	drifblimmega: {
		num: 426,
		name: "Drifblim-Mega",
		
		baseSpecies: "Drifblim",
		forme: "Mega",
		types: ["Ghost", "Flying"],
		baseStats: {hp: 150, atk: 80, def: 44, spa: 145, spd: 89, spe: 90},
		category: "Blimp",
		abilities: {0: "Neutralizing Gas"},
		heightm: 1.2,
		weightkg: 15.0,
		color: "Purple",
		eggGroups: ["Amorphous"],
		requiredItem: "Drifblimite",
		
		creator: "BlueRay",
	},
	// end

	// start
	skorupi: {
		num: 451,
		name: "Skorupi",
		
		types: ["Poison", "Bug"],
		baseStats: {hp: 40, atk: 50, def: 90, spa: 30, spd: 55, spe: 65},
		category: "Scorpion",
		abilities: {0: "Battle Armor", 1: "Sniper", H: "Keen Eye"},
		movepoolAdditions: ["recover"],
		heightm: 0.8,
		weightkg: 12.0,
		color: "Purple",
		eggGroups: ["Bug", "Water 3"],

		evos: ["Drapion"],
	},
	drapion: {
		num: 452,
		name: "Drapion",
		
		types: ["Poison", "Dark"],
		baseStats: {hp: 70, atk: 90, def: 110, spa: 60, spd: 75, spe: 95},
		category: "Ogre Scorpion",
		abilities: {0: "Battle Armor", 1: "Sniper", H: "Keen Eye"},
		movepoolAdditions: ["recover"],
		heightm: 1.3,
		weightkg: 61.5,
		color: "Purple",
		eggGroups: ["Bug", "Water 3"],
		otherFormes: ["Drapion-Mega"],
		formeOrder: ["Drapion", "Drapion-Mega"],

		prevo: "Skorupi",
		evoLevel: 40,
	},
	drapionmega: {
		num: 452,
		name: "Drapion-Mega",
		
		baseSpecies: "Drapion",
		forme: "Mega",
		types: ["Poison", "Dark"],
		baseStats: {hp: 70, atk: 130, def: 150, spa: 60, spd: 105, spe: 85},
		category: "Ogre Scorpion",
		abilities: {0: "Steelbreaker"},
		heightm: 1.6,
		weightkg: 91.5,
		color: "Purple",
		eggGroups: ["Bug", "Water 3"],
		requiredItem: "Drapionite",
		
		creator: "Hematite",
	},
	// end

	// start
		skrelp: {
		num: 690,
		name: "Skrelp",
		
		types: ["Poison", "Water"],
		baseStats: {hp: 50, atk: 60, def: 60, spa: 60, spd: 60, spe: 30},
		category: "Mock Kelp",
		abilities: {0: "Poison Point", 1: "Poison Touch", H: "Adaptability"},
		movepoolAdditions: ["acidspray", "acidicterrain", "gastroacid", "oilspill", "roost", "terrainpulse"],
		heightm: 0.5,
		weightkg: 7.3,
		color: "Brown",
		eggGroups: ["Water 1", "Dragon"],

		evos: ["Dragalge"],
	},
	dragalge: {
		num: 691,
		name: "Dragalge",
		
		types: ["Poison", "Dragon"],
		baseStats: {hp: 65, atk: 75, def: 90, spa: 97, spd: 123, spe: 44},
		category: "Mock Kelp",
		abilities: {0: "Poison Point", 1: "Poison Touch", H: "Adaptability"},
		movepoolAdditions: ["acidspray", "acidicterrain", "gastroacid", "oilspill", "roost", "terrainpulse"],
		heightm: 1.8,
		weightkg: 81.5,
		color: "Brown",
		eggGroups: ["Water 1", "Dragon"],
		otherFormes: ["Dragalge-Mega"],
		formeOrder: ["Dragalge", "Dragalge-Mega"],

		prevo: "Skrelp",
		evoLevel: 48,
	},
	dragalgemega: {
		num: 691,
		name: "Dragalge-Mega",
		
		baseSpecies: "Dragalge",
		forme: "Mega",
		types: ["Poison", "Dragon"],
		baseStats: {hp: 65, atk: 95, def: 90, spa: 147, spd: 153, spe: 44},
		category: "Mock Kelp",
		abilities: {0: "Acidic Surge"},
		heightm: 2.7,
		weightkg: 121.5,
		color: "Brown",
		eggGroups: ["Water 1", "Dragon"],
		requiredItem: "Dragalgite",
		
		creator: "BlueRay",
	},
	// end

	// start
	eevee: {
		num: 133,
		name: "Eevee",
		
		types: ["Normal"],
		genderRatio: {M: 0.875, F: 0.125},
		baseStats: {hp: 55, atk: 55, def: 50, spa: 45, spd: 65, spe: 55},
		abilities: {0: "Run Away", 1: "Adaptability", H: "Anticipation"},
		category: "Evolution",
		heightm: 0.3,
		weightkg: 6.5,
		color: "Brown",
		eggGroups: ["Field"],

		evos: ["Vaporeon", "Jolteon", "Flareon", "Espeon", "Umbreon", "Leafeon", "Glaceon", "Sylveon", "Umbreon-Ma'adowr"],
	},
	umbreon: {
		num: 197,
		name: "Umbreon",
		
		types: ["Dark"],
		genderRatio: {M: 0.875, F: 0.125},
		baseStats: {hp: 95, atk: 65, def: 110, spa: 60, spd: 130, spe: 65},
		abilities: {0: "Synchronize", 1: "Telepathy", H: "Inner Focus"},
		category: "Moonlight",
		heightm: 0.3,
		weightkg: 1.0,
		color: "Black",
		eggGroups: ["Field"],
		otherFormes: ["Umbreon-Ma'adowr"],
		formeOrder: ["Umbreon", "Umbreon-Ma'adowr"],
	
		prevo: "Eevee",
		evoType: "levelFriendship",
		evoCondition: "at night",
		creator: "BlueRay",
	},
	umbreonmaadowr: {
		num: -53,
		name: "Umbreon-Ma'adowr",
		
		types: ["Poison"],
		genderRatio: {M: 0.875, F: 0.125},
		baseStats: {hp: 95, atk: 65, def: 110, spa: 60, spd: 130, spe: 65},
		abilities: {0: "Poison Point", 1: "Telepathy", H: "Corrosion"},
		category: "Moonlight",
		heightm: 0.3,
		weightkg: 1.0,
		color: "Black",
		eggGroups: ["Field"],
	
		prevo: "Eevee",
		evoType: "levelFriendship",
		evoCondition: "at night in Acidic Terrain",
		creator: "BlueRay",
	},
	// end

	// start
	porygonmaadowr: {
		num: -54,
		name: "Porygon-Ma'adowr",
		
		types: ["Poison", "Bug"],
		gender: "N",
		baseStats: {hp: 65, atk: 50, def: 75, spa: 85, spd: 75, spe: 45},
		abilities: {0: "Electric Surge", 1: "Trace", H: "Malware"},
		category: "Virus",
		heightm: 0.8,
		weightkg: 36.5,
		color: "Purple",
		eggGroups: ["Mineral"],

		evos: ["Porygon2-Ma'adowr"],
		creator: "BlueRay",
	},
	porygon2maadowr: {
		num: -55,
		name: "Porygon2-Ma'adowr",
		
		types: ["Poison", "Bug"],
		gender: "N",
		baseStats: {hp: 85, atk: 60, def: 100, spa: 105, spd: 95, spe: 70},
		abilities: {0: "Electric Surge", 1: "Trace", H: "Malware"},
		category: "Virus",
		heightm: 0.6,
		weightkg: 32.5,
		color: "Purple",
		eggGroups: ["Mineral"],

		evos: ["Porygon-Z-Ma'adowr"],
		prevo: "Porygon-Ma'adowr",
		evoType: "trade",
		evoItem: "Up-Grade",
		creator: "BlueRay",
	},
	porygonzmaadowr: {
		num: -56,
		name: "Porygon-Z-Ma'adowr",
	
		types: ["Poison", "Bug"],
		gender: "N",
		baseStats: {hp: 85, atk: 145, def: 100, spa: 80, spd: 5, spe: 120},
		abilities: {0: "Download", 1: "Adaptability", H: "Malware"},
		category: "Virus",
		heightm: 0.9,
		weightkg: 34.0,
		color: "Purple",
		eggGroups: ["Mineral"],

		prevo: "Porygon2-Ma'adowr",
		evoType: "trade",
		evoItem: "Dubious Disc",
		creator: "BlueRay",
	},
	// end

	// start
	mantykemaadowr: {
		num: -57,
		name: "Mantyke-Ma'adowr",
		
		types: ["Poison", "Flying"],
		baseStats: {hp: 45, atk: 20, def: 50, spa: 60, spd: 120, spe: 50},
		abilities: {0: "Water Absorb", 1: "Swift Swim", H: "Poison Point"},
		category: "Kite",
		heightm: 1.0,
		weightkg: 65.0,
		color: "Brown",
		eggGroups: ["Water 1"],

		evos: ["Mantine-Ma'adowr"],
		creator: "BlueRay",
	},
	mantinemaadowr: {
		num: -58,
		name: "Mantine-Ma'adowr",
		
		types: ["Poison", "Flying"],
		baseStats: {hp: 85, atk: 30, def: 70, spa: 90, spd: 140, spe: 70},
		abilities: {0: "Water Absorb", 1: "Swift Swim", H: "Poison Point"},
		category: "Kite",
		heightm: 2.1,
		weightkg: 220.0,
		color: "Brown",
		eggGroups: ["Water 1"],

		prevo: "Mantyke-Ma'adowr",
		evoType: "levelExtra",
		evoCondition: "with a Remoraid in party",
		creator: "BlueRay",
	},
	// end

	// start
	ekans: {
		num: 23,
		name: "Ekans",

		types: ["Poison"],
		baseStats: {hp: 35, atk: 60, def: 44, spa: 40, spd: 54, spe: 55},
		abilities: {0: "Intimidate", 1: "Shed Skin", H: "Unnerve"},
		category: "Snake",
		heightm: 2.0,
		weightkg: 6.9,
		color: "Purple",
		eggGroups: ["Field", "Dragon"],

		evos: ["Arbok"],
	},
	arbok: {
		num: 24,
		name: "Arbok",

		types: ["Poison"],
		baseStats: {hp: 60, atk: 95, def: 69, spa: 65, spd: 79, spe: 80},
		abilities: {0: "Intimidate", 1: "Shed Skin", H: "Unnerve"},
		category: "Cobra",
		heightm: 3.5,
		weightkg: 65.0,
		color: "Purple",
		eggGroups: ["Field", "Dragon"],

		evos: ["Orasundra"],
		prevo: "Ekans",
		evoLevel: 22,
	},
	orasundra: {
		num: -59,
		name: "Orasundra",

		types: ["Poison", "Psychic"],
		baseStats: {hp: 100, atk: 120, def: 85, spa: 90, spd: 95, spe: 60},
		abilities: {0: "Intimidate", 1: "Poison Spit", H: "Rattled"},
		category: "Messenger",
		heightm: 4.5,
		weightkg: 100.0,
		color: "Purple",
		eggGroups: ["Field", "Dragon"],

		prevo: "Arbok",
		evoType: "other",
		evoCondition: "at level 50 in Sun",
		creator: "BlueRay",
	},
	// end

	// start
	gravessor: {
		num: -60,
		name: "Gravessor",
		
		types: ["Poison", "Steel"],
		gender: "N",
		baseStats: {hp: 95, atk: 99, def: 95, spa: 40, spd: 95, spe: 70},
		category: "Iron Dragon Ship",
		abilities: {0: "Levitate", 1: "Gravitas", H: "Unburden"},
		heightm: 8.6,
		weightkg: 248.0,
		color: "Gray",
		eggGroups: ["Mineral", "Dragon"],

		creator: "BlueRay",
	},
	// end

	// start
	cursinhcor: {
		num: -61,
		name: "Cursinhcor",
		
		types: ["Poison", "Grass"],
		gender: "N",
		baseStats: {hp: 95, atk: 99, def: 95, spa: 40, spd: 95, spe: 70},
		category: "Wooden Dragon Ship",
		abilities: {0: "Levitate", 1: "Ill Wind", H: "Swift Swim"},
		heightm: 8.6,
		weightkg: 248.0,
		color: "Brown",
		eggGroups: ["Grass", "Dragon"],

		creator: "BlueRay",
	},
	// end

	// start
	zubat: {
		num: 41,
		name: "Zubat",

		types: ["Poison", "Flying"],
		baseStats: {hp: 40, atk: 45, def: 35, spa: 30, spd: 40, spe: 55},
		abilities: {0: "Inner Focus", H: "Infiltrator"},
		category: "Bat",
		heightm: 0.8,
		weightkg: 7.5,
		color: "Purple",
		eggGroups: ["Flying"],

		evos: ["Golbat"],
	},
	golbat: {
		num: 42,
		name: "Golbat",

		types: ["Poison", "Flying"],
		baseStats: {hp: 75, atk: 80, def: 70, spa: 65, spd: 75, spe: 90},
		abilities: {0: "Inner Focus", H: "Infiltrator"},
		category: "Bat",
		heightm: 1.6,
		weightkg: 55.0,
		color: "Purple",
		eggGroups: ["Flying"],

		evos: ["Crobat"],
		prevo: "Zubat",
		evoLevel: 22,
	},
	crobat: {
		num: 169,
		name: "Crobat",

		types: ["Poison", "Flying"],
		baseStats: {hp: 80, atk: 90, def: 80, spa: 70, spd: 80, spe: 130},
		abilities: {0: "Inner Focus", H: "Infiltrator"},
		category: "Bat",
		heightm: 1.8,
		weightkg: 75.0,
		color: "Purple",
		eggGroups: ["Flying"],
		otherFormes: ["Crobat-Mega"],
		formeOrder: ["Crobat", "Crobat-Mega"],

		prevo: "Golbat",
		evoType: "levelFriendship",
	},
	crobatmega: {
		num: 169,
		name: "Crobat-Mega",
		
		baseSpecies: "Crobat",
		forme: "Mega",
		types: ["Poison", "Flying"],
		baseStats: {hp: 80, atk: 120, def: 95, spa: 90, spd: 95, spe: 150},
		category: "Bat",
		abilities: {0: "Vampirism"},
		heightm: 2.0,
		weightkg: 82.5,
		color: "Purple",
		eggGroups: ["Flying"],
		requiredItem: "Crobatite",
		
		creator: "BlueRay",
	},
	// end

	// start
	staryumaadowr: {
		num: -62,
		name: "Staryu-Ma'adowr",
		
		types: ["Rock"],
		baseStats: {hp: 30, atk: 45, def: 55, spa: 70, spd: 55, spe: 85},
		abilities: {0: "Dazzling", 1: "Natural Cure", H: "Analytic"},
		category: "Star Shape",
		heightm: 0.8,
		weightkg: 34.5,
		color: "Brown",
		eggGroups: ["Water 3"],

		evos: ["Starmie-Ma'adowr"],
		creator: "BlueRay",
	},
	starmiemaadowr: {
		num: -63,
		name: "Starmie-Ma'adowr",
		
		types: ["Rock", "Ground"],
		baseStats: {hp: 60, atk: 75, def: 85, spa: 100, spd: 85, spe: 115},
		abilities: {0: "Dazzling", 1: "Natural Cure", H: "Analytic"},
		category: "Mysterious",
		heightm: 1.1,
		weightkg: 80.0,
		color: "Brown",
		eggGroups: ["Water 3"],

		prevo: "Staryu-Ma'adowr",
		evoType: "levelExtra",
		evoItem: "Soft Sand",
		creator: "BlueRay",
	},
	// end

	// start
	roggenrola: {
		num: 524,
		name: "Roggenrola",

		types: ["Rock"],
		baseStats: {hp: 55, atk: 75, def: 85, spa: 25, spd: 25, spe: 15},
		abilities: {0: "Sturdy", 1: "Weak Armor", H: "Sand Force"},
		category: "Mantle",
		heightm: 0.4,
		weightkg: 18.0,
		color: "Blue",
		eggGroups: ["Mineral"],

		evos: ["Boldore"],
	},
	boldore: {
		num: 525,
		name: "Boldore",

		types: ["Rock"],
		baseStats: {hp: 70, atk: 105, def: 105, spa: 50, spd: 40, spe: 20},
		abilities: {0: "Sturdy", 1: "Weak Armor", H: "Sand Force"},
		category: "Ore",
		heightm: 0.9,
		weightkg: 102.0,
		color: "Blue",
		eggGroups: ["Mineral"],

		evos: ["Gigalith"],
		prevo: "Roggenrola",
		evoLevel: 25,
	},
	gigalith: {
		num: 526,
		name: "Gigalith",

		types: ["Gigalith"],
		baseStats: {hp: 80, atk: 135, def: 130, spa: 60, spd: 80, spe: 25},
		abilities: {0: "Sturdy", 1: "Sand Stream", H: "Sand Force"},
		category: "Compressed",
		heightm: 1.7,
		weightkg: 260.0,
		color: "Blue",
		eggGroups: ["Mineral"],
		otherFormes: ["Gigalith-Mega"],
		formeOrder: ["Gigalith", "Gigalith-Mega"],

		prevo: "Boldore",
		evoType: "trade",
	},
	gigalithmega: {
		num: 526,
		name: "Gigalith-Mega",
		
		baseSpecies: "Gigalith",
		forme: "Mega",
		types: ["Rock"],
		baseStats: {hp: 85, atk: 135, def: 160, spa: 100, spd: 110, spe: 25},
		category: "Compressed",
		abilities: {0: "Solar Core"},
		heightm: 2.0,
		weightkg: 336.0,
		color: "Blue",
		eggGroups: ["Mineral"],
		requiredItem: "Gigalith",
		
		creator: "ink",
	},
	// end

	// start
	binaclemaadowr: {
		num: -64,
		name: "Binacle-Ma'adowr",
		
		types: ["Rock", "Dark"],
		baseStats: {hp: 53, atk: 52, def: 67, spa: 34, spd: 56, spe: 50},
		abilities: {0: "Toxic Boost", 1: "Sniper", H: "Poison Touch"},
		category: "Two-Handed",
		heightm: 0.5,
		weightkg: 31.5,
		color: "White",
		eggGroups: ["Water 3"],

		evos: ["Barbaracle-Ma'adowr"],
		creator: "BlueRay",
	},
	barbaraclemaadowr: {
		num: -65,
		name: "Barbaracle-Ma'adowr",
		
		types: ["Rock", "Dark"],
		baseStats: {hp: 82, atk: 105, def: 115, spa: 44, spd: 86, spe: 68},
		abilities: {0: "Toxic Boost", 1: "Sniper", H: "Poison Touch"},
		category: "Collective",
		heightm: 1.3,
		weightkg: 96.0,
		color: "White",
		eggGroups: ["Water 3"],

		prevo: "Binacle-Ma'adowr",
		evoLevel: 39,
		creator: "BlueRay",
	},
	// end

	// start
	monelisk: {
		num: -66,
		name: "Monelisk",
		
		types: ["Rock", "Psychic"],
		gender: "N",
		baseStats: {hp: 52, atk: 44, def: 160, spa: 96, spd: 100, spe: 48},
		category: "Monolith",
		abilities: {0: "Solar Power", H: "Fairy Aura"},
		heightm: 3.8,
		weightkg: 240.0,
		color: "Black",
		eggGroups: ["Mineral"],

		creator: "BlueRay",
	},
	// end

	// start
	magistama: {
		num: -67,
		name: "Magistama",
		
		types: ["Rock", "Ghost"],
		gender: "N",
		baseStats: {hp: 70, atk: 80, def: 116, spa: 88, spd: 87, spe: 59},
		category: "Imperial Insignia",
		abilities: {0: "Bulletproof", 1: "Weak Armor", H: "Friend Guard"},
		heightm: 0.4,
		weightkg: 0.4,
		color: "Green",
		eggGroups: ["Mineral"],

		creator: "BlueRay",
	},
	// end

	// start
	horizonoc: {
		num: -68,
		name: "Horizonoc",

		types: ["Rock", "Flying"],
		gender: "N",
		baseStats: {hp: 100, atk: 56, def: 88, spa: 136, spd: 88, spe: 112},
		abilities: {0: "Sharpness", H: "Magic Bounce"},
		category: "Winged Sun Disk",
		heightm: 2.7,
		weightkg: 100.0,
		color: "Yellow",
		tags: ["Sub Legendary"],
		eggGroups: ["Undiscovered"],

		creator: "BlueRay",
	},
	// end

	// start
	oroboroc: {
		num: -69,
		name: "Oroboroc",

		types: ["Rock", "Fire"],
		gender: "N",
		baseStats: {hp: 100, atk: 136, def: 108, spa: 56, spd: 92, spe: 88},
		abilities: {0: "Multiscale", H: "Dry Skin"},
		category: "Diadem",
		heightm: 6.5,
		weightkg: 300.0,
		color: "Yellow",
		tags: ["Sub Legendary"],
		eggGroups: ["Undiscovered"],

		creator: "BlueRay",
	},
	// end

	// start
	hieroturoc: {
		num: -70,
		name: "Hieroturoc",

		types: ["Rock", "Grass"],
		gender: "N",
		baseStats: {hp: 100, atk: 112, def: 96, spa: 112, spd: 96, spe: 64},
		abilities: {0: "Flower Gift", H: "Regenerator"},
		category: "Rebirth",
		heightm: 2.3,
		weightkg: 200.0,
		color: "Yellow",
		tags: ["Sub Legendary"],
		eggGroups: ["Undiscovered"],

		creator: "BlueRay",
	},
	// end

	// start
	vulpixmaadowr: {
		num: -71,
		name: "Vulpix-Ma'adowr",
		
		types: ["Rock"],
		baseStats: {hp: 38, atk: 41, def: 40, spa: 50, spd: 65, spe: 65},
		abilities: {0: "Sand Veil", H: "Sand Stream"},
		category: "Cursed Statue",
		heightm: 0.6,
		weightkg: 19.9,
		color: "White",
		eggGroups: ["Mineral"],

		evos: ["Ninetales-Ma'adowr"],
		creator: "BlueRay",
	},
	ninetalesmaadowr: {
		num: -72,
		name: "Ninetales-Ma'adowr",
		
		types: ["Rock", "Fairy"],
		baseStats: {hp: 73, atk: 67, def: 75, spa: 81, spd: 100, spe: 109},
		abilities: {0: "Sand Veil", H: "Sand Stream"},
		category: "Cursed Statue",
		heightm: 1.1,
		weightkg: 69.9,
		color: "White",
		eggGroups: ["Mineral"],

		prevo: "Vulpix-Ma'adowr",
		evoType: "useItem",
		evoItem: "Moon Stone",
		creator: "BlueRay",
	},
	// end

	// start
	rockruff: {
		num: 744,
		name: "Rockruff",
		
		baseForme: "Midday",
		types: ["Rock"],
		baseStats: {hp: 45, atk: 65, def: 40, spa: 30, spd: 40, spe: 60},
		abilities: {0: "Keen Eye", 1: "Vital Spirit", H: "Steadfast", S: "Own Tempo"},
		category: "Puppy",
		heightm: 0.5,
		weightkg: 9.2,
		color: "Brown",
		eggGroups: ["Field"],
		
		evos: ["Lycanroc", "Lycanroc-Midnight", "Lycanroc-Dusk"],
		formeOrder: ["Rockruff", "Rockruff"], // TODO: Rockruff-Dusk
	},
	lycanroc: {
		num: 745,
		name: "Lycanroc",
		
		baseForme: "Midday",
		types: ["Rock"],
		baseStats: {hp: 75, atk: 115, def: 65, spa: 55, spd: 65, spe: 112},
		abilities: {0: "Keen Eye", 1: "Sand Rush", H: "Steadfast"},
		category: "Wolf",
		heightm: 0.8,
		weightkg: 25,
		color: "Brown",
		eggGroups: ["Field"],
		
		prevo: "Rockruff",
		evoLevel: 25,
		evoCondition: "during the day",
		otherFormes: ["Lycanroc-Midnight", "Lycanroc-Dusk"],
		formeOrder: ["Lycanroc", "Lycanroc-Midnight", "Lycanroc-Dusk"],
	},
	lycanrocmidnight: {
		num: 745,
		name: "Lycanroc-Midnight",
		
		baseSpecies: "Lycanroc",
		forme: "Midnight",
		types: ["Rock"],
		baseStats: {hp: 85, atk: 115, def: 75, spa: 55, spd: 75, spe: 82},
		abilities: {0: "Keen Eye", 1: "Vital Spirit", H: "No Guard"},
		category: "Wolf",
		heightm: 1.1,
		weightkg: 25,
		color: "Red",
		eggGroups: ["Field"],

		evos:  ["Garvaluna"],
		prevo: "Rockruff",
		evoLevel: 25,
		evoCondition: "at night",
	},
	lycanrocdusk: {
		num: 745,
		name: "Lycanroc-Dusk",
		
		baseSpecies: "Lycanroc",
		forme: "Dusk",
		types: ["Rock"],
		baseStats: {hp: 75, atk: 117, def: 65, spa: 55, spd: 65, spe: 110},
		abilities: {0: "Tough Claws"},
		category: "Wolf",
		heightm: 0.8,
		weightkg: 25,
		color: "Brown",
		eggGroups: ["Field"],
		
		prevo: "Rockruff",
		evoLevel: 25,
		evoCondition: "from a special Rockruff",
	},
	// end

	// start
	garvaluna: {
		num: -73,
		name: "Garvaluna",
		
		types: ["Rock", "Fairy"],
		baseStats: {hp: 105, atk: 135, def: 90, spa: 35, spd: 90, spe: 95},
		abilities: {0: "Rattled", 1: "Vital Spirit", H: "Dark Aura"},
		category: "Werewolf",
		heightm: 1.8,
		weightkg: 47.5,
		color: "Red",
		eggGroups: ["Field"],

		prevo: "Lycanroc-Midnight",
		evoLevel: 50,
		evoCondition: "at 23:59",
		otherFormes: ["Garvaluna-Bloodmoon"],
		formeOrder: ["Garvaluna", "Garvaluna-Bloodmoon"],
		creator: "BlueRay",
	},
	garvalunabloodmoon: {
		num: -73,
		name: "Garvaluna-Bloodmoon",
		
		baseSpecies: "Garvaluna",
		forme: "Bloodmoon",
		types: ["Rock", "Fairy"],
		gender: "F",
		baseStats: {hp: 125, atk: 50, def: 105, spa: 120, spd: 80, spe: 75},
		abilities: {0: "Berserk"},
		category: "Werewolf",
		heightm: 2.2,
		weightkg: 75.0,
		color: "Red",
		eggGroups: ["Field"],
		
		creator: "BlueRay",
	},
	// end

	// start
	sizzlipedemaadowr: {
		num: -74,
		name: "Sizzlipede-Ma'adowr",
		
		types: ["Ground", "Bug"],
		baseStats: {hp: 50, atk: 65, def: 45, spa: 50, spd: 50, spe: 45},
		abilities: {0: "Flash Fire", 1: "Poison Heal", H: "Sand Spit"},
		category: "Sand Devourer",
		heightm: 0.7,
		weightkg: 1.0,
		color: "Brown",
		eggGroups: ["Bug"],

		evos: ["Centiskorch-Ma'adowr"],
		creator: "BlueRay",
	},
	centiskorchmaadowr: {
		num: -75,
		name: "Centiskorch-Ma'adowr",
		
		types: ["Ground", "Bug"],
		baseStats: {hp: 100, atk: 115, def: 65, spa: 90, spd: 90, spe: 65},
		abilities: {0: "Flash Fire", 1: "Poison Heal", H: "Sand Spit"},
		category: "Sand Devourer",
		heightm: 3.0,
		weightkg: 120.0,
		color: "Brown",
		eggGroups: ["Bug"],

		prevo: "Sizzlipede-Ma'adowr",
		evoLevel: 28,
		creator: "BlueRay",
	},
	// end

	// start
	pincurchinmaadowr: {
		num: -76,
		name: "Pincurchin-Ma'adowr",
		
		types: ["Ground"],
		baseStats: {hp: 48, atk: 101, def: 95, spa: 91, spd: 85, spe: 15},
		category: "Sea Urchin",
		abilities: {0: "Lightning Rod", H: "Acidic Surge"},
		heightm: 0.3,
		weightkg: 1.0,
		color: "Brown",
		eggGroups: ["Water 1", "Amorphous"],

		creator: "BlueRay",
	},
	// end

	// start
	solgantica: {
		num: -77,
		name: "Solgantica",

		types: ["Ground"],
		baseStats: {hp: 35, atk: 35, def: 141, spa: 125, spd: 127, spe: 77},
		abilities: {0: "Unburden", 1: Immunity, H: "Chlorophyll"},
		category: "Plankton",
		heightm: 0.1,
		weightkg: 0.1,
		color: "Brown",
		eggGroups: ["Water 3", "Mineral"],

		creator: "BlueRay",
	},
	// end

	// start
	slumberingguardian: {
		num: -78,
		name: "Slumbering Guardian",

		types: ["Ground", "Grass"],
		gender: "N",
		baseStats: {hp: 98, atk: 126, def: 91, spa: 77, spd: 91, spe: 77},
		abilities: {0: "Reconfiguration"},
		category: "Slumber",
		heightm: 2.8,
		weightkg: 330.0,
		color: "Green",
		tags: ["Ancient"],
		eggGroups: ["Undiscovered"],

		creator: "BlueRay",
	},
	// end

	// start
	pastura0: {
		num: -79,
		name: "Pastura-0",
		
		types: ["Ground", "Fairy"],
		baseStats: {hp: 55, atk: 80, def: 70, spa: 60, spd: 35, spe: 50},
		category: "Horizon",
		abilities: {0: "Immunity", 1: "Flame Body", H: "Early Bird"},
		heightm: 0.9,
		weightkg: 25.3.,
		color: "Yellow",
		eggGroups: ["Field"],

		evos: ["Pastura"],
		creator: "BlueRay",
	},
	pastura: {
		num: -80,
		name: "Pastura",
		
		types: ["Ground", "Fairy"],
		baseStats: {hp: 90, atk: 120, def: 105, spa: 90, spd: 65, spe: 85},
		category: "Horizon",
		abilities: {0: "Immunity", 1: "Flame Body", H: "Drought"},
		heightm: 2.1,
		weightkg: 175.0,
		color: "Green",
		eggGroups: ["Field"],
		otherFormes: ["Pastura-Mega"],
		formeOrder: ["Pastura", "Pastura-Mega"],

		prevo: "Pastura-0",
		evoType: "useItem",
		evoItem: "Sun Stone",
		creator: "BlueRay",
	},
	pasturamega: {
		num: -80,
		name: "Pastura-Mega",
		
		baseSpecies: "Pastura",
		forme: "Mega",
		types: ["Ground", "Fairy"],
		baseStats: {hp: 90, atk: 150, def: 115, spa: 120, spd: 75, spe: 105},
		category: "Horizon",
		abilities: {0: "Friend Guard"},
		heightm: 2.1,
		weightkg: 175.0,
		color: "Brown",
		eggGroups: ["Field"],
		requiredItem: "Pasturite",
		
		creator: "BlueRay",
	},
	// end

	// start
};
