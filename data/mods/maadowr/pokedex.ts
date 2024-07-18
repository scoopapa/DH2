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
};
