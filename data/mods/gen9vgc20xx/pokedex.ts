export const Pokedex: { [k: string]: ModdedSpeciesData } = {
	
    // start
	matokoda: {
		num: -1000,
		name: "Matokoda",

		types: ["Grass", "Ghost"],
		genderRatio: {M: 0.875, F: 0.125},
		baseStats: {hp: 105, atk: 65, def: 85, spa: 125, spd: 75, spe: 75},
		abilities: {0: "Overgrow", H: "Friend Guard"},
	//	category: "Guardian",
		heightm: 2.0,
		weightkg: 220.0,
		color: "Green",
		eggGroups: ["Grass", "Field"],
	//	creator: "BlueRay",
	},
	// end
	
	// start
	valoseus: {
		num: -1001,
		name: "Valoseus",

		types: ["Grass"],
		baseStats: {hp: 110, atk: 125, def: 85, spa: 65, spd: 75, spe: 30},
		abilities: {0: "Filter", 1: "Water Bubble", H: "Iron Fist"},
		heightm: 1.0,
		weightkg: 2.1,
		color: "Green",
		eggGroups: ["Grass"],
	//	creator: "BlueRay",
	},
	// end

	// start
	roseradedelta: {
		num: -1002,
		name: "Roserade-Delta",

	//	baseSpecies: "Roserade",
		forme: "Delta",
		types: ["Grass", "Steel"],
		gender: "N",
		baseStats: {hp: 63, atk: 51, def: 81, spa: 123, spd: 93, spe: 111},
		abilities: {0: "Emergency Exit", 1: "Sturdy", H: "Technician"},
		heightm: 0.9,
		weightkg: 24.5,
		color: "Green",
		eggGroups: ["Undiscovered"],
	//	creator: "BlueRay",
	},
	// end

	// start
	nihilink: {
		num: -1003,
		name: "Nihilink",
	
		types: ["Grass"],
		gender: "N",
		baseStats: {hp: 110, atk: 50, def: 100, spa: 95, spd: 125, spe: 95},
		abilities: {0: "Unnerve"},
	//	heightm: 1.5,
		weightkg: 13.3,
		color: "Green",
		tags: ["Sub-Legendary"],
		eggGroups: ["Undiscovered"],
		otherFormes: ["Nihilink-Necro"],
		formeOrder: ["Nihilink", "Nihilink-Necro"],
	},
	nihilinknecro: {
		num: -1003,
		name: "Nihilink-Necro",
		baseSpecies: "Nihilink",

		forme: "Necro",
		types: ["Grass", "Ghost"],
		gender: "N",
		baseStats: {hp: 110, atk: 50, def: 100, spa: 95, spd: 125, spe: 95},
		abilities: {0: "Unnerve"},
	//	heightm: 1.5,
		weightkg: 13.3,
		color: "Green",
		tags: ["Sub-Legendary"],
		eggGroups: ["Undiscovered"],
	},
	// end

	// start
	ariados: {
		inherit: true,
		evos: ["Araneidos"],
	},
	araneidos: {
		num: 1004,
		name: "Araneidos",
		types: ["Bug", "Poison"],
		baseStats: {hp: 80, atk: 105, def: 105, spa: 65, spd: 105, spe: 65},
		abilities: {0: "Swarm", 1: "Insomnia", H: "Malignant"},
	//	heightm: 1.1,
		weightkg: 45.3,
		color: "Red",
		eggGroups: ["Bug"],

		prevo: "Ariados",
	},
	// end

	// start
	illophyr: {
		num: -1005,
		name: "Illophyr",

		types: ["Bug", "Ghost"],
		baseStats: {hp: 50, atk: 85, def: 90, spa: 35, spd: 90, spe: 70},
		abilities: {0: "Compound Eyes", H: "Ill Wind"},
	//	heightm: 1.0,
		weightkg: 19.0,
		color: "Purple",
		eggGroups: ["Bug"],
	//	creator: "BlueRay",
	},
	// end

	// start
	phlocules: {
		num: -1006,
		name: "Phlocules",

		types: ["Bug", "Rock"],
		baseStats: {hp: 103, atk: 108, def: 110, spa: 63, spd: 89, spe: 70},
		abilities: {0: "Solid Rock", 1: "Sheer Force", H: "Steadfast"},
	//	heightm: 1.0,
		weightkg: 1275.7,
		color: "Green",
		eggGroups: ["Bug"],
	},
	// end

	// start
	metagrossprime: {
		num: -1007,
		name: "Metagross-Prime",

	//	baseSpecies: "Metagross",
		forme: "Prime",
		types: ["Bug", "Dark"],
		gender: "N",
		baseStats: {hp: 80, atk: 135, def: 120, spa: 115, spd: 80, spe: 70},
		abilities: {0: "Infiltrator", H: "Psy Net"},
	//	heightm: 0.9,
		weightkg: 550.0,
		color: "Black",
		eggGroups: ["Undiscovered"],
	//	creator: "BlueRay",
	},
	// end

	// start
	almgid: {
		num: -1008,
		name: "Almgid",

		types: ["Fire", "Ice"],
		genderRatio: {M: 0.875, F: 0.125},
		baseStats: {hp: 123, atk: 46, def: 111, spa: 79, spd: 112, spe: 59},
		abilities: {0: "Blaze", H: "Ice Body"},
	//	heightm: 2.0,
		weightkg: 64.0,
		color: "Red",
		eggGroups: ["Field"],
	},
	// end

	// start
	fieratt: {
		num: -1009,
		name: "Fieratt",

		types: ["Fire", "Dark"],
		baseStats: {hp: 80, atk: 130, def: 75, spa: 90, spd: 65, spe: 110},
		abilities: {0: "Run Away", H: "Magic Bounce"},
	//	heightm: 2.0,
		weightkg: 10.5,
		color: "Red",
		eggGroups: ["Field"],
	},
	// end

	// start
	karion: {
		num: -1010,
		name: "Karion",

		types: ["Fire", "Fighting"],
		baseStats: {hp: 90, atk: 110, def: 80, spa: 100, spd: 60, spe: 70},
		abilities: {0: "Inner Focus", H: "Justified"},
	//	heightm: 2.0,
		weightkg: 85.3,
		color: "Red",
		eggGroups: ["Field"],
	},
	// end

	// start
	mutinuncle: {
		num: -1011,
		name: "Mutinuncle",
		
		types: ["Fire"],
		gender: "N",
		baseStats: {hp: 90, atk: 35, def: 145, spa: 100, spd: 155, spe: 50},
		abilities: {0: "Unnerve"},
	//	heightm: 1.5,
		weightkg: 9.7,
		color: "Fire",
		tags: ["Sub-Legendary"],
		eggGroups: ["Undiscovered"],
		otherFormes: ["Mutinuncle-Necro"],
		formeOrder: ["Mutinuncle", "Mutinuncle-Necro"],
	},
	mutinunclenecro: {
		num: -1011,
		name: "Mutinuncle-Necro",
		baseSpecies: "Mutinuncle",

		forme: "Necro",
		types: ["Fire", "Ghost"],
		gender: "N",
		baseStats: {hp: 90, atk: 35, def: 145, spa: 100, spd: 155, spe: 50},
		abilities: {0: "Unnerve"},
	//	heightm: 1.5,
		weightkg: 9.7,
		color: "Fire",
		tags: ["Sub-Legendary"],
		eggGroups: ["Undiscovered"],
	},
	// end

	// start
	delphynan: {
		num: -1012,
		name: "Delphynan",

		types: ["Water", "Rock"],
		genderRatio: {M: 0.875, F: 0.125},
		baseStats: {hp: 91, atk: 70, def: 70, spa: 123, spd: 100, spe: 76},
		abilities: {0: "Torrent", H: "Poison Point"},
	//	heightm: 2.0,
		weightkg: 90.0,
		color: "Blue",
		eggGroups: ["Water 1"],
	},
	// end

	// start
	upvybones: {
		num: -1013,
		name: "Upvybones",
		
		types: ["Water"],
		gender: "N",
		baseStats: {hp: 105, atk: 115, def: 105, spa: 95, spd: 100, spe: 55},
		abilities: {0: "Unnerve"},
	//	heightm: 1.5,
		weightkg: 96.3,
		color: "Water",
		tags: ["Sub-Legendary"],
		eggGroups: ["Undiscovered"],
		otherFormes: ["Upvybones-Necro"],
		formeOrder: ["Upvybones", "Upvybones-Necro"],
	},
	upvybonesnecro: {
		num: -1013,
		name: "Upvybones-Necro",
		baseSpecies: "Upvybones",

		forme: "Necro",
		types: ["Water", "Ghost"],
		gender: "N",
		baseStats: {hp: 105, atk: 115, def: 105, spa: 95, spd: 100, spe: 55},
		abilities: {0: "Unnerve"},
	//	heightm: 1.5,
		weightkg: 96.3,
		color: "Water",
		tags: ["Sub-Legendary"],
		eggGroups: ["Undiscovered"],
	},
	// end

	// start
	eiscue: {
		inherit: true,
		evos: ["Keisberg"],
	},
	keisberg: {
		num: -1014,
		name: "Keisberg",
		
		types: ["Ice", "Steel"],
		baseStats: {hp: 105, atk: 110, def: 110, spa: 75, spd: 120, spe: 25},
		abilities: {0: "Eternal Ice"},
	//	heightm: 3.4,
		weightkg: 555.5,
		color: "Blue",
		eggGroups: ["Water 1", "Field"],
		
		prevo: "Eiscue",
	//	evoLevel: 60,
	},
	// end

	// start
	zebstrika: {
		inherit: true,
		evos: ["Zebsonavolt"],
	},
	zebsonavolt: {
		num: -1015,
		name: "Zebsonavolt",
		
		types: ["Electric"],
		baseStats: {hp: 95, atk: 120, def: 74, spa: 60, spd: 74, spe: 126},
		abilities: {0: "Lightning Rod", 1: "Inflammation", H: "Sap Sipper"},
	//	heightm: 3.4,
		weightkg: 93.2,
		color: "Yellow",
		eggGroups: ["Field"],
		
		prevo: "Zebstrika",
	//	evoLevel: 60,
	},
	// end

	// start
	honedgelight: {
		num: -1016,
		name: "Honedge-Light",
		
		types: ["Electric"],
		baseStats: {hp: 55, atk: 80, def: 100, spa: 25, spd: 37, spe: 28},
		abilities: {0: "Battery"},
	//	category: "Guardian",
		heightm: 0.8,
		weightkg: 2,
		color: "Blue",
		eggGroups: ["Mineral"],

		evos: ["Doublade-Light"],
	//	creator: "BlueRay",
	},
	doubladelight: {
		num: -1017,
		name: "Doublade-Light",

		types: ["Electric", "Fighting"],
		baseStats: {hp: 69, atk: 110, def: 150, spa: 35, spd: 49, spe: 35},
		abilities: {0: "Battery"},
	//	category: "Guardian",
		heightm: 0.8,
		weightkg: 4.5,
		color: "Blue",
		eggGroups: ["Mineral"],

		evos: ["Aegislash-Light"],
		prevo: "Honedge-Light",
		evoLevel: 35,
	//	creator: "BlueRay",
	},
	aegislashlight: {
		num: -1018,
		name: "Aegislash-Light",
		
		baseForme: "Shield",
		types: ["Electric", "Fighting"],
		baseStats: {hp: 70, atk: 45, def: 140, spa: 45, spd: 140, spe: 60},
		abilities: {0: "Stance Change"},
	//	category: "Guardian",
		heightm: 1.7,
		weightkg: 53,
		color: "Blue",
		eggGroups: ["Mineral"],
		otherFormes: ["Aegislash-Blade-Light"],
		formeOrder: ["Aegislash-Light", "Aegislash-Blade-Light"],

		prevo: "Doublade-Light",
		evoType: "useItem",
		evoItem: "Thunder Stone",
	//	creator: "BlueRay",
		
	},
	aegislashbladelight: {
		num: -1018,
		name: "Aegislash-Blade-Light",
		
		baseSpecies: "Aegislash-Light",
		forme: "Blade",
		types: ["Electric", "Psychic"],
		baseStats: {hp: 70, atk: 140, def: 45, spa: 140, spd: 45, spe: 60},
		abilities: {0: "Stance Change"},
	//	category: "Guardian",
		heightm: 1.7,
		weightkg: 53,
		color: "Blue",
		eggGroups: ["Mineral"],
		requiredAbility: "Stance Change",
		battleOnly: "Aegislash-Light",

	//	creator: "BlueRay",
	},
	// end

	// start
	wizareetin: {
		num: -1019,
		name: "Wizareetin",

		types: ["Electric"],
		gender: "N",
		baseStats: {hp: 41, atk: 75, def: 88, spa: 140, spd: 112, spe: 144},
		abilities: {0: "Levitate"},
	//	heightm: 1.5,
		weightkg: 1.6,
		color: "Yellow",
		tags: ["Sub-Legendary"],
		eggGroups: ["Undiscovered"],
		otherFormes: ["Wizareetin-Gravelord"],
		formeOrder: ["Wizareetin", "Wizareetin-Gravelord"],
	},
	wizareetingravelord: {
		num: -1019,
		name: "Wizareetin-Gravelord",
		baseSpecies: "Wizareetin",

		forme: "Gravelord",
		types: ["Electric", "Ghost"],
		gender: "N",
		baseStats: {hp: 41, atk: 75, def: 88, spa: 140, spd: 112, spe: 144},
		abilities: {0: "Levitate"},
	//	heightm: 1.5,
		weightkg: 1.6,
		color: "Yellow",
		tags: ["Sub-Legendary"],
		eggGroups: ["Undiscovered"],
	},
	// end

	// start
	foongusenlightened: {
		num: -1020,
		name: "Foongus-Enlightened",
		baseSpecies: "Foongus",

		forme: "Enlightened",
		types: ["Psychic", "Poison"],
		baseStats: {hp: 90, atk: 91, def: 72, spa: 91, spd: 72, spe: 35},
		abilities: {0: "Effect Spore", 1: "Shared Mindset", H: "Regenerator"},
	//	category: "Forlorn",
		heightm: 0.4,
		weightkg: 2.0,
		color: "Purple",

		eggGroups: ["Grass"],

	//	creator: "BlueRay",
	},
    // end

	// start
	dustnoir: {
		num: -1021,
		name: "Dustnoir",

		types: ["Ghost", "Rock"],
		baseStats: {hp: 45, atk: 110, def: 135, spa: 55, spd: 135, spe: 40},
		abilities: {0: "Poison Point", 1: "Sturdy", H: "Sand Stream"},
		heightm: 2.2,
		weightkg: 213.2,
		color: "Brown",
		eggGroups: ["Amorphous"],
	},
	// end

	// start
	malitch: {
		num: -1022,
		name: "Malitch",

		types: ["Ghost", "Poison"],
		gender: "N",
		baseStats: {hp: 40, atk: 70, def: 115, spa: 80, spd: 130, spe: 50},
		abilities: {0: "Pressure", 1: "Poison Touch", H: "Selfish"},
		weightkg: 0.3,
		color: "Purple",
		eggGroups: ["Amorphous"],
	},
	// end

	// start
	stonjourner: {
		inherit: true,
		evos: ["Stontank"],
	},
	stontank: {
		num: -1023,
		name: "Stontank",
		
		types: ["Rock", "Grass"],
		baseStats: {hp: 120, atk: 140, def: 140, spa: 50, spd: 70, spe: 25},
		abilities: {0: "Power Spot"},
	//	heightm: 1.7,
		weightkg: 732.0,
		color: "Brown",
		eggGroups: ["Mineral"],
		
		prevo: "Stonjourner",
	//	evoType: "levelHold",
	//	evoItem: "Big Mushroom",
	},
	// end

	// start
	mountalon: {
		num: -1024,
		name: "Mountalon",

		types: ["Rock", "Flying"],
		baseStats: {hp: 95, atk: 70, def: 90, spa: 110, spd: 100, spe: 65},
		abilities: {0: "Pickpocket", H: "Thick Fat"},
		weightkg: 48.0,
		color: "Brown",
		eggGroups: ["Mineral"],
	},
	// end

	// start
	dustform: {
		num: -1025,
		name: "Dustform",
		types: ["Ground"],
		baseStats: {hp: 105, atk: 35, def: 70, spa: 105, spd: 70, spe: 35},
		abilities: {0: "Desert Mirage", H: "Sand Force"},
		heightm: 0.3,
		weightkg: 0.8,
		color: "Brown",
		eggGroups: ["Fairy", "Amorphous"],

		otherFormes: ["Dustform-Sunny", "Dustform-Rainy", "Dustform-Snowy", "Dustform-Sandy", "Dustform-Acidic"],
		formeOrder: ["Dustform", "Dustform-Sunny", "Dustform-Rainy", "Dustform-Snowy", "Dustform-Sandy", "Dustform-Acidic"],
	},
	dustformsunny: {
		num: -1025,
		name: "Dustform-Sunny",
		baseSpecies: "Dustform",
		forme: "Sunny",

		types: ["Ground", "Fire"],
		baseStats: {hp: 105, atk: 35, def: 70, spa: 105, spd: 70, spe: 35},
		abilities: {0: "Desert Mirage"},
		heightm: 0.3,
		weightkg: 0.8,
		color: "Brown",
		eggGroups: ["Fairy", "Amorphous"],

		requiredAbility: "Desert Mirage",
		battleOnly: "Dustform",
	},
	dustformrainy: {
		num: -1025,
		name: "Dustform-Rainy",
		baseSpecies: "Dustform",
		forme: "Rainy",
		
		types: ["Ground", "Water"],
		baseStats: {hp: 105, atk: 35, def: 70, spa: 105, spd: 70, spe: 35},
		abilities: {0: "Desert Mirage"},
		heightm: 0.3,
		weightkg: 0.8,
		color: "Brown",
		eggGroups: ["Fairy", "Amorphous"],

		requiredAbility: "Desert Mirage",
		battleOnly: "Dustform",
	},
	dustformsnowy: {
		num: -1025,
		name: "Dustform-Snowy",
		baseSpecies: "Dustform",
		forme: "Snowy",
		
		types: ["Ground", "Ice"],
		baseStats: {hp: 105, atk: 35, def: 70, spa: 105, spd: 70, spe: 35},
		abilities: {0: "Desert Mirage"},
		heightm: 0.3,
		weightkg: 0.8,
		color: "Brown",
		eggGroups: ["Fairy", "Amorphous"],

		requiredAbility: "Desert Mirage",
		battleOnly: "Dustform",
	},
	dustformsandy: {
		num: -1025,
		name: "Dustform-Sandy",
		baseSpecies: "Dustform",
		forme: "Sandy",
		
		types: ["Ground", "Flying"],
		baseStats: {hp: 105, atk: 35, def: 70, spa: 105, spd: 70, spe: 35},
		abilities: {0: "Desert Mirage"},
		heightm: 0.3,
		weightkg: 0.8,
		color: "Brown",
		eggGroups: ["Fairy", "Amorphous"],

		requiredAbility: "Desert Mirage",
		battleOnly: "Dustform",
	},
	dustformacidic: {
		num: -1025,
		name: "Dustform-Acidic",
		baseSpecies: "Dustform",
		forme: "Sandy",
		
		types: ["Ground", "Poison"],
		baseStats: {hp: 105, atk: 35, def: 70, spa: 105, spd: 70, spe: 35},
		abilities: {0: "Desert Mirage"},
		heightm: 0.3,
		weightkg: 0.8,
		color: "Brown",
		eggGroups: ["Fairy", "Amorphous"],

		requiredAbility: "Desert Mirage",
		battleOnly: "Dustform",
	},
	// end

	// start
	kagunawa: {
		num: -1026,
		name: "Kagunawa",

		types: ["Dragon", "Dark"],
		baseStats: {hp: 96, atk: 66, def: 80, spa: 132, spd: 80, spe: 96},
		abilities: {0: "Ancient Core"},
		heightm: 5.6,
		weightkg: 92.1,
		color: "Black",
		eggGroups: ["Dragon"],
	},
	// end

	// start
	judigon: {
		num: -1027,
		name: "Judigon",

		types: ["Dragon", "Fighting"],
		baseStats: {hp: 100, atk: 90, def: 105, spa: 60, spd: 70, spe: 75},
		abilities: {0: "Weight Breaker"},
		heightm: 1.7,
		weightkg: 101.0,
		color: "Brown",
		eggGroups: ["Dragon", "Human-like"],
	},
	// end

	// start
	mauycacque: {
		num: -1028,
		name: "Mauycacque",

		types: ["Normal", "Fighting"],
		baseStats: {hp: 75, atk: 125, def: 80, spa: 60, spd: 60, spe: 100},
		abilities: {0: "Iron Fist", 1: "Scrappy", H: "Prankster"},
		heightm: 1.5,
		weightkg: 6.1,
		color: "Brown",
		eggGroups: ["Field"],
	},
	// end

	// start
	mudaimer: {
		num: -1029,
		name: "Mudaimer",

		types: ["Normal", "Ground"],
		gender: "N",
		baseStats: {hp: 174, atk: 121, def: 54, spa: 73, spd: 81, spe: 67},
		abilities: {0: "Abnormal"},
		heightm: 5.2,
		weightkg: 252.5,
		color: "Brown",
		// tags: ["Sub-Legendary"],
		eggGroups: ["Undiscovered"],
	},
	// end

	// start
	cheverpent: {
		num: -1030,
		name: "Cheverpent",

		types: ["Normal", "Water"],
		gender: "N",
		baseStats: {hp: 58, atk: 92, def: 149, spa: 101, spd: 67, spe: 103},
		abilities: {0: "Abnormal"},
		heightm: 7.4,
		weightkg: 523.5,
		color: "Blue",
	//	tags: ["Sub-Legendary"],
		eggGroups: ["Undiscovered"],
	},
	// end

	// start
	eereyster: {
		num: -1031,
		name: "Eereyster",

		types: ["Normal", "Ghost"],
		gender: "N",
		baseStats: {hp: 109, atk: 118, def: 109, spa: 93, spd: 109, spe: 32},
		abilities: {0: "Abnormal"},
		heightm: 10.8,
		weightkg: 123.5,
		color: "Purple",
		// tags: ["Sub-Legendary"],
		eggGroups: ["Undiscovered"],
	},
	// end

	// start
	magikite: {
		num: -1032,
		name: "Magikite",

		types: ["Flying"],
		baseStats: {hp: 95, atk: 125, def: 100, spa: 60, spd: 79, spe: 81},
		abilities: {0: "Unburden", 1: "Aerilate", H: "Cloud Nine"},
		heightm: 6.5,
		weightkg: 88.3,
		color: "White",
		eggGroups: ["Dragon", "Water 2"],
	},
	// end

	// start
	ahimstalag: {
		num: -1033,
		name: "Ahimstalag",

		types: ["Steel"],
		baseStats: {hp: 64, atk: 104, def: 114, spa: 54, spd: 44, spe: 124},
		abilities: {0: "Simple", 1: "Heatproof", H: "Oblivious"},
		heightm: 16.0,
		weightkg: 60.0,
		color: "Grey",
		eggGroups: ["Mineral"],
	},
	// end

	// start
	toxicroak: {
		inherit: true,
		evos: ["Mycecroak"],
	},
	mycecroak: {
		num: -1034,
		name: "Mycecroak",
		
		types: ["Poison", "Fighting"],
		baseStats: {hp: 108, atk: 121, def: 80, spa: 101, spd: 80, spe: 60},
		abilities: {0: "Sticky Hold", 1: "Dry Skin", H: "Poison Touch"},
		heightm: 1.7,
		weightkg: 78.6,
		color: "Purple",
		eggGroups: ["Human-like"],
		
		prevo: "Toxicroak",
		evoType: "levelHold",
		evoItem: "Big Mushroom",
	},
	// end

	// start
	malamar: {
		inherit: true,
		evos: ["Cthulauder"],
	},
	cthulauder: {
		num: -1035,
		name: "Cthulauder",
		
		types: ["Dark", "Psychic"],
		baseStats: {hp: 119, atk: 134, def: 88, spa: 99, spd: 57, spe: 45},
		abilities: {0: "Contrary", 1: "Costar", H: "Mind Control"},
		heightm: 3.4,
		weightkg: 97.5,
		color: "Blue",
		eggGroups: ["Water 1", "Water 3"],
		
		prevo: "Malamar",
		evoLevel: 60,
	},
	// end

	// start
	bennusule: {
		num: -1036,
		name: "Bennusule",

		types: ["Dark", "Fire"],
		baseStats: {hp: 98, atk: 125, def: 90, spa: 55, spd: 85, spe: 43},
		abilities: {0: "Unburden", H: "Rewind"},
		heightm: 2.1,
		weightkg: 67.8,
		color: "Red",
		eggGroups: ["Flying"],
	},
	// end

	// start
	ulmiraj: {
		num: -1037,
		name: "Ulmiraj",

		types: ["Fairy"],
		baseStats: {hp: 80, atk: 70, def: 80, spa: 110, spd: 85, spe: 65},
		abilities: {0: "Unnerve", 1: "Intimidate", H: "Huge Power"},
	//	heightm: 2.1,
		weightkg: 15.2,
		color: "Pink",
		eggGroups: ["Fairy"],
	},
	// end

	// start
	meowscaradarift: {
		num: -1038,
		name: "Meowscarada-Rift",
		forme: "Rift",

		types: ["Grass", "Psychic"],
		genderRatio: {M: 0.875, F: 0.125},
		baseStats: {hp: 76, atk: 120, def: 70, spa: 71, spd: 70, spe: 123},
		abilities: {0: "Overgrow", H: "Ailuromancy"},
	//	category: "Trickster",
		heightm: 1.5,
		weightkg: 31.2,
		color: "Green",
		eggGroups: ["Field", "Grass"],
	//	creator: "BlueRay",
	},
	// end

	// start
	delphoxrift: {
		num: -1039,
		name: "Delphox-Rift",
		forme: "Rift",

		types: ["Fire", "Fairy"],
		genderRatio: {M: 0.875, F: 0.125},
		baseStats: {hp: 75, atk: 69, def: 72, spa: 114, spd: 100, spe: 104},
		abilities: {0: "Blaze", H: "Curious Medicine"},
	//	category: "Medic Witch",
		heightm: 1.5,
		weightkg: 39.0,
		color: "Red",
		eggGroups: ["Field"],
	//	creator: "BlueRay",
	},
	// end

	// start
	swampertrift: {
		num: -1040,
		name: "Swampert-Rift",
		forme: "Rift",

		types: ["Water", "Dark"],
		genderRatio: {M: 0.875, F: 0.125},
		baseStats: {hp: 100, atk: 110, def: 90, spa: 85, spd: 90, spe: 60},
		abilities: {0: "Torrent", H: "Volt Absorb"},
	//	category: "Trickster",
		heightm: 1.5,
		weightkg: 81.9,
		color: "Blue",
		eggGroups: ["Monster", "Water 1"],
	//	creator: "BlueRay",
	},
	// end

	// start
	meganiumxelian: {
		num: -1041,
		name: "Meganium-Xelian",
		forme: "Xelian",

		types: ["Grass", "Steel"],
		genderRatio: {M: 0.875, F: 0.125},
		baseStats: {hp: 80, atk: 63, def: 100, spa: 122, spd: 100, spe: 60},
		abilities: {0: "Overgrow", H: "Regenerator"},
	//	category: "",
		heightm: 1.9,
		weightkg: 132.6,
		color: "Green",
		eggGroups: ["Monster", "Grass"],
	//	creator: "Samtendo09",
	},
	// end

	// start
	infernapexelian: {
		num: -1042,
		name: "Infernape-Xelian",
		forme: "Xelian",

		types: ["Fire", "Flying"],
		genderRatio: {M: 0.875, F: 0.125},
		baseStats: {hp: 74, atk: 107, def: 71, spa: 107, spd: 71, spe: 104},
		abilities: {0: "Blaze", H: "Magic Guard"},
	//	category: "",
		heightm: 1.2,
		weightkg: 49.5,
		color: "Red",
		eggGroups: ["Field", "Human-like"],
	//	creator: "Samtendo09",
	},
	// end

	// start
	quaquavalxelian: {
		num: -1043,
		name: "Quaquaval-Xelian",
		forme: "Xelian",

		types: ["Water", "Rock"],
		genderRatio: {M: 0.875, F: 0.125},
		baseStats: {hp: 85, atk: 120, def: 70, spa: 105, spd: 70, spe: 80},
		abilities: {0: "Torrent", H: "No Guard"},
	//	category: "",
		heightm: 1.7,
		weightkg: 91.7,
		color: "Blue",
		eggGroups: ["Flying", "Water 1"],
	//	creator: "Samtendo09",
	},
	// end

	// start
	hattlock: {
		num: -1044,
		name: "Hattlock",
		types: ["Grass", "Poison"],
		baseStats: {hp: 95, atk: 120, def: 145, spa: 60, spd: 75, spe: 65},
		abilities: {0: "Poison Touch", 1: "Own Tempo", H: "Simple"},
	//	category: "",
	//	heightm: "",
		weightkg: 10.0,
		color: "Green",
		eggGroups: ["Grass", "Fairy"],
	//	creator: "PalpitoadChamp",
	},
	// end

	// start
	intestinorm: {
		num: -1045,
		name: "Intestinorm",

		types: ["Bug", "Ground"],
		gender: "N",
		baseStats: {hp: 84, atk: 72, def: 138, spa: 132, spd: 78, spe: 96},
		abilities: {0: "Archetype", H: "Electric Surge"},
	//	category: "Essence",
		heightm: 4.2,
		weightkg: 398.0,
		color: "Red",
		tags: ["Sub-Legendary"],
		eggGroups: ["Undiscovered"],
	//	creator: "BlueRay",
	},
	// end

	// start
	conotox: {
		num: -1046,
		name: "Conotox",
		types: ["Normal", "Poison"],
		baseStats: {hp: 55, atk: 75, def: 125, spa: 95, spd: 105, spe: 50},
		abilities: {0: "Weak Armor", 1: "Shell Armor", H: "Mimicry"},
	//	category: "",
	//	heightm: "",
		weightkg: 29.9,
		color: "White",
		eggGroups: ["Water 1"],
	//	creator: "BlueRay",
	},
	// end

	// start
	qullumen: {
		num: -1047,
		name: "Qullumen",
		types: ["Rock", "Fairy"],
		baseStats: {hp: 90, atk: 80, def: 60, spa: 90, spd: 145, spe: 55},
		abilities: {0: "Hearth", 1: "Flare Boost", H: "Hospitality"},
	//	category: "",
	//	heightm: "",
		weightkg: 29.5,
		color: "Black",
		eggGroups: ["Mineral"],
	//	creator: "Genuine_Angus_B33F",
	},
	// end

	// start
	solastor: {
		num: -1048,
		name: "Solastor",

		baseForme: "Standard",
		types: ["Fire", "Flying"],
		baseStats: {hp: 55, atk: 110, def: 55, spa: 110, spd: 55, spe: 100},
		abilities: {0: "Drought", 1: "Overcoat", H: "Zen Mode"},
	//	category: "",
	//	heightm: "",
		weightkg: 0.1,
		color: "Red",
		eggGroups: ["Amorphous"],
		otherFormes: ["Solastor-Zen"],
		formeOrder: ["Solastor", "Solastor-Zen"],
	//	creator: "Ubertrainer2000",
	},
	solastorzen: {
		num: -1048,
		name: "Solastor-Zen",

		baseSpecies: "Solastor",
		forme: "Zen",
		types: ["Fire", "Flying"],
		baseStats: {hp: 55, atk: 140, def: 25, spa: 140, spd: 25, spe: 100},
		abilities: {0: "Zen Mode"},
	//	category: "",
	//	heightm: "",
		weightkg: 0.1,
		color: "Red",
		eggGroups: ["Amorphous"],
		requiredAbility: "Zen Mode",
		battleOnly: "Solastor",
	//	creator: "Ubertrainer2000",
	},
	// end

	// start
	lullux: {
		num: -1049,
		name: "Lullux",

		baseForme: "Standard",
		types: ["Water", "Flying"],
		baseStats: {hp: 100, atk: 55, def: 110, spa: 55, spd: 110, spe: 55},
		abilities: {0: "Drizzle", 1: "Overcoat", H: "Zen Mode"},
	//	category: "",
	//	heightm: "",
		weightkg: 0.1,
		color: "Blue",
		eggGroups: ["Amorphous"],
		otherFormes: ["Lullux-Zen"],
		formeOrder: ["Lullux", "Lullux-Zen"],
	//	creator: "Ubertrainer2000",
	},
	lulluxzen: {
		num: -1049,
		name: "Lullux-Zen",

		baseSpecies: "Lullux",
		forme: "Zen",
		types: ["Water", "Flying"],
		baseStats: {hp: 100, atk: 25, def: 140, spa: 25, spd: 140, spe: 55},
		abilities: {0: "Zen Mode"},
	//	category: "",
	//	heightm: "",
		weightkg: 0.1,
		color: "Blue",
		eggGroups: ["Amorphous"],
		requiredAbility: "Zen Mode",
		battleOnly: "Lullux",
	//	creator: "Ubertrainer2000",
	},
	// end

	// start
	possmortem: {
		num: -1050,
		name: "Possmortem",
		types: ["Normal", "Ghost"],
		baseStats: {hp: 80, atk: 85, def: 55, spa: 100, spd: 97, spe: 103},
		abilities: {0: "Quick Feet", 1: "Run Away", H: "Feign Death"},
	//	category: "",
	//	heightm: "",
		weightkg: 17.8,
		color: "White",
		eggGroups: ["Field"],
	//	creator: "PalpitoadChamp",
	},
	// end

	// start
	cashatrew: {
		num: -1051,
		name: "Cashatrew",
		types: ["Grass", "Flying"],
		baseStats: {hp: 80, atk: 103, def: 100, spa: 55, spd: 97, spe: 85},
		abilities: {0: "Battle Armor", 1: "Chlorophyll", H: "Prankster"},
	//	category: "",
	//	heightm: "",
		weightkg: 7.8,
		color: "Green",
		eggGroups: ["Flying"],
	//	creator: "PalpitoadChamp",
	},
	// end

	// start
	anthroll: {
		num: -1052,
		name: "Anthroll",
		types: ["Ice", "Poison"],
		baseStats: {hp: 91, atk: 112, def: 90, spa: 52, spd: 128, spe: 39},
		abilities: {0: "Regenerator", 1: "Magic Guard", H: "Guts"},
	//	category: "",
		heightm: 1.1,
		weightkg: 38.2,
		color: "Purple",
		eggGroups: ["Fairy"],
	//	creator: "Samtendo09",
	},
	// end

	// start
	kolbolt: {
		num: -1053,
		name: "Kolbolt",
		types: ["Ice", "Electric"],
		baseStats: {hp: 91, atk: 52, def: 70, spa: 102, spd: 70, spe: 127},
		abilities: {0: "Poison Heal", 1: "Technician", H: "Sturdy"},
	//	category: "",
		heightm: 1.5,
		weightkg: 25.3,
		color: "Yellow",
		eggGroups: ["Fairy"],
	//	creator: "Samtendo09",
	},
	// end

	// start
	deermetrius: {
		num: -1054,
		name: "Deermetrius",
		types: ["Fighting", "Fairy"],
		baseStats: {hp: 85, atk: 110, def: 75, spa: 55, spd: 85, spe: 125},
		abilities: {0: "Justified", 1: "Grass Pelt", H: "Vigor Surge"},
	//	category: "",
	//	heightm: ,
		weightkg: 150.0,
		color: "Purple",
		eggGroups: ["Fairy", "Field"],
	//	creator: "Cyaneedle",
	},
	// end

	// start
	wresteddy: {
		num: -1055,
		name: "Wresteddy",
		types: ["Fighting", "Normal"],
		baseStats: {hp: 110, atk: 115, def: 85, spa: 60, spd: 80, spe: 50},
		abilities: {0: "Iron Fist", 1: "Cute Charm", H: "Analytic"},
	//	category: "",
	//	heightm: ,
		weightkg: 95.0,
		color: "Brown",
		eggGroups: ["Field"],
	//	creator: "Cyaneedle",
	},
	// end

	// start
	arbok: {
		inherit: true,
		evos: ["Orasundra"],
	},
	orasundra: {
		num: -1056,
		name: "Orasundra",

		types: ["Poison", "Psychic"],
		baseStats: {hp: 100, atk: 120, def: 84, spa: 90, spd: 94, spe: 60},
		abilities: {0: "Intimidate", 1: "Photolysis", H: "Rattled"},
	//	category: "Messenger",
		heightm: 4.5,
		weightkg: 100.0,
		color: "Purple",
		eggGroups: ["Field", "Dragon"],

		prevo: "Arbok",
		evoType: "other",
		evoCondition: "at level 50 in Sun",
	//	creator: "BlueRay",
	},
	// end

	// start
	tokujira: {
		num: -1057,
		name: "Tokujira",

		types: ["Poison", "Water"],
		gender: "N",
		baseStats: {hp: 170, atk: 125, def: 65, spa: 90, spd: 65, spe: 85},
		abilities: {0: "Transmutation"},
	//	category: "Kaiju",
		heightm: 25.1,
		weightkg: 874.1,
		color: "Black",
		eggGroups: ["Undiscovered"],
	//	creator: "BlueRay",
	},
    // end

	// start
	cacturne: {
		inherit: true,
		evos: ["Cacmora"],
	},
	cacmora: {
		num: -1058,
		name: "Cacmora",
		
		types: ["Grass", "Dark"],
		baseStats: {hp: 90, atk: 130, def: 80, spa: 130, spd: 80, spe: 40},
		abilities: {0: "Transmutation", 1: "Coup de Grass", H: "Water Absorb"},
		heightm: 2.1,
		weightkg: 77.4,
		color: "Green",
		eggGroups: ["Grass", "Human-like"],

		prevo: "Cacturne",
		evoType: "other",
		evoCondition: "at level 50 in Sandstorm",
		//	creator: "BlueRay",
	},

	// start
	ledian: {
		inherit: true,
		evos: ["Ledellar"],
	},
	ledellar: {
		num: -1048,
		name: "Ledellar",
		types: ["Bug", "Fighting"],
		baseStats: {hp: 70, atk: 120, def: 55, spa: 55, spd: 110, spe: 110},
		abilities: {0: "Defiant", 1: "Mold Breaker", H: "Iron Fist"},
	//	heightm: ,
		weightkg: 63.6,
		color: "Red",
		eggGroups: ["Bug"],

		prevo: "Ledian",
		//	creator: "Samtendo09",
	},
	// end

	// start
	cemmetar: {
		num: -1049,
		name: "Cemmetar",
		types: ["Rock", "Ground"],
		baseStats: {hp: 80, atk: 135, def: 65, spa: 70, spd: 55, spe: 115},
		abilities: {0: "Skill Link", 1: "Sand Force", H: "Underhanded"},
	//	category: "",
	//	heightm: "",
		weightkg: 108.8,
		color: "Brown",
		eggGroups: ["Mineral"],
	//	creator: "Sugarbear",
	},
	// end

	// start
	lachespind: {
		num: -1050,
		name: "Lachespind",
		types: ["Psychic"],
		gender: "F",
		baseStats: {hp: 76, atk: 81, def: 54, spa: 60, spd: 101, spe: 113},
		abilities: {0: "Shield Dust", 1: "Overcoat", H: "Cotton Down"},
	//	category: "",
	//	heightm: "",
		weightkg: 15.0,
		color: "Purple",
		eggGroups: ["Field"],
	//	creator: "Genuine_Angus_B33F",
	},
	// end

	// start
	snomxelian: {
		num: -1059,
		name: "Snom-Xelian",
		forme: "Xelian",
		types: ["Normal", "Bug"],
		baseStats: {hp: 30, atk: 15, def: 40, spa: 45, spd: 30, spe: 25},
		abilities: {0: "Shield Dust", 1: "Fur Coat", H: "Scale Shift"},
	//	category: "Mimicry",
		heightm: 0.3,
		weightkg: 3.8,
		color: "White",
		eggGroups: ["Bug"],

		evos: ["Frosmoth-Xelian"],
		//	creator: "BlueRay",
	},
	frosmothxelian: {
		num: -1060,
		name: "Frosmoth-Xelian",
		forme: "Xelian",
		types: ["Normal", "Bug"],
		baseStats: {hp: 70, atk: 45, def: 70, spa: 125, spd: 90, spe: 75},
		abilities: {0: "Shield Dust", 1: "Fur Coat", H: "Scale Shift"},
	//	category: "Mimicry",
		heightm: 1.3,
		weightkg: 42.0,
		color: "White",
		eggGroups: ["Bug"],

		prevo: "Snom-Xelian",
		evoType: "levelFriendship",
		//	creator: "BlueRay",
	},
	//

	//
	golduckxelian: {
		num: -1061,
		name: "Golduck-Xelian",
		forme: "Xelian",
		types: ["Electric", "Water"],
		baseStats: {hp: 70, atk: 92, def: 68, spa: 95, spd: 70, spe: 105},
		abilities: {0: "Thundercloud", 1: "Damp", H: "Forewarn"},
	//	category: "",
	//	heightm: ,
		weightkg: 72.2,
		color: "Yellow",
		eggGroups: ["Water 1"],
	//	creator: "Samtendo09",
	},
	//
	avigutaw: {
		num: -1062,
		name: "Avigutaw",
		types: ["Ice", "Ghost"],
		baseStats: {hp: 100, atk: 72, def: 95, spa: 52, spd: 125, spe: 61},
		abilities: {0: "Levitate"},
	//	category: "",
	//	heightm: ,
		weightkg: 11.0,
		color: "Purple",
		eggGroups: ["Flying"],
	//	creator: "Genuine_Angus_B33F",
	},
	//  end

	// Changes
	// start
	shiftry: {
		inherit: true,
		baseStats: {hp: 90, atk: 110, def: 60, spa: 90, spd: 60, spe: 80},
	},
	// end

	// start
	escavalier: {
		inherit: true,
		abilities: {0: "Swarm", 1: "Shell Armor", H: "Defiant"},
	},
	// end

	// start
	vespiquen: {
		inherit: true,
		baseStats: {hp: 70, atk: 80, def: 102, spa: 80, spd: 102, spe: 70},
		abilities: {0: "Pressure", 1: "Intimidate", H: "Unnerve"},
	},
	// end

	// start
	golisopod: {
		inherit: true,
		abilities: {0: "Emergency Exit", H: "Armor Piercer"},
	},
	// end

	// start
	orbeetle: {
		inherit: true,
		abilities: {0: "Swarm", 1: "Hyper Gravity", H: "Telepathy"},
	},
	// end

	// start
	beartic: {
		inherit: true,
		baseStats: {hp: 95, atk: 130, def: 80, spa: 70, spd: 80, spe: 70},
	},
	// end

	// start
	gengar: {
		inherit: true,
		abilities: {0: "Levitate", H: "Toxic Debris"},
	},
	// end

	// start
	golurk: {
		inherit: true,
		abilities: {0: "Contrary", 1: "Klutz", H: "No Guard"},
	},
	// end

	// start
	hariyama: {
		inherit: true,
		abilities: {0: "Thick Fat", 1: "Guts", H: "Purifying Salt"},
	},
	// end

	// start
	flygon: {
		inherit: true,
		abilities: {0: "Levitate", H: "Archetype"},
	},
	// end

	// start
	snorlax: {
		inherit: true,
		abilities: {0: "Poison Heal", 1: "Thick Fat", H: "Gluttony"},
	},
	// end

	// start
	kangaskhan: {
		inherit: true,
		baseStats: {hp: 105, atk: 105, def: 80, spa: 40, spd: 80, spe: 90},
	},
	// end

	// start
	delcatty: {
		inherit: true,
		baseStats: {hp: 90, atk: 75, def: 75, spa: 55, spd: 55, spe: 90},
	},
	// end

	// start
	perrserker: {
		inherit: true,
		baseStats: {hp: 70, atk: 120, def: 100, spa: 50, spd: 60, spe: 50},
	},
	// end

	// start
	weavile: {
		inherit: true,
		abilities: {0: "Pressure", 1: "Inner Focus", H: "Pickpocket"},
	},
	// end
};
