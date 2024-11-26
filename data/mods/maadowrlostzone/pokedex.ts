export const Pokedex: { [k: string]: ModdedSpeciesData } = {
	
    // start
	organtica: {
		num: -1000,
		name: "Organtica",

		types: ["Grass"],
		baseStats: {hp: 35, atk: 35, def: 77, spa: 125, spd: 127, spe: 141},
		abilities: {0: "Leaf Guard", 1: "Immunity", H: "Solar Power"},
	//	category: "Plankton",
		heightm: 0.1,
		weightkg: 0.1,
		color: "Green",
		eggGroups: ["Grass", "Water 3"],

	//	creator: "BlueRay",
	},
    // end

    // start
	matokoda0: {
		num: -1001,
		name: "Matokoda-0",

		types: ["Grass", "Normal"],
		genderRatio: {M: 0.875, F: 0.125},
		baseStats: {hp: 70, atk: 40, def: 50, spa: 70, spd: 4, spe: 40},
		abilities: {0: "Overgrow", H: "Friend Guard"},
	//	category: "Guardian",
		heightm: 1.0,
		weightkg: 55.0,
		color: "Green",
		eggGroups: ["Grass", "Field"],

		evos: ["Matokoda-1"],
	//	creator: "BlueRay",
	},
	matokoda1: {
		num: -1002,
		name: "Matokoda-1",

		types: ["Grass", "Normal"],
		genderRatio: {M: 0.875, F: 0.125},
		baseStats: {hp: 85, atk: 55, def: 65, spa: 95, spd: 60, spe: 60},
		abilities: {0: "Overgrow", H: "Friend Guard"},
	//	category: "Guardian",
		heightm: 1.5,
		weightkg: 165.0,
		color: "Green",
		eggGroups: ["Grass", "Field"],

		evos: ["Matokoda"],
		prevo: "Matokoda-0",
		evoLevel: 16,
	//	creator: "BlueRay",
	},
	matokoda: {
		num: -1003,
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

		otherFormes: ["Matokoda-Ascend"],
		formeOrder: ["Matokoda", "Matokoda-Ascend"],
		prevo: "Matokoda-1",
		evoLevel: 36,
	//	creator: "BlueRay",
	},
	matokodaascend: {
		num: -1003,
		name: "Matokoda-Ascend",
		baseSpecies: "Matokoda",
		forme: "Ascend",
		types: ["Grass", "Ghost"],
		genderRatio: {M: 0.875, F: 0.125},
		baseStats: {hp: 105, atk: 125, def: 95, spa: 135, spd: 85, spe: 85},
		abilities: {0: "Berserk"},
		heightm: 2.0,
		weightkg: 220.0,
		color: "Green",
		eggGroups: ["Grass", "Field"],
		requiredItem: "Matokodium",
	},
    // end

    // start
	arbarnacle: {
		num: -1004,
		name: "Arbarnacle",

		types: ["Grass", "Water"],
		baseStats: {hp: 101, atk: 112, def: 99, spa: 47, spd: 87, spe: 77},
		abilities: {0: "Suction Cups", 1: "Heatproof", H: "Caretaker"},
	//	category: "Barnacle Tree",
		heightm: 1.7,
		weightkg: 86.0,
		color: "Brown",
		eggGroups: ["Grass"],
	//	creator: "BlueRay",
	},
    // end

    // start
	flebonabat0: {
		num: -1005,
		name: "Flebonabat-0",
		
		types: ["Grass", "Poison"],
		baseStats: {hp: 40, atk: 59, def: 35, spa: 30, spd: 40, spe: 41},
		abilities: {0: "Super Luck", H: "Magic Bounce"},
	//	category: "Bat Flower",
		heightm: 0.4,
		weightkg: 3.7,
		color: "Black",
		eggGroups: ["Grass"],

		evos: ["Flebonabat-1"],
	//	creator: "BlueRay",
	},
	flebonabat1: {
		num: -1006,
		name: "Flebonabat-1",
		
		types: ["Grass", "Poison"],
		baseStats: {hp: 75, atk: 94, def: 70, spa: 65, spd: 75, spe: 76},
		abilities: {0: "Super Luck", H: "Magic Bounce"},
	//	category: "Bat Flower",
		heightm: 0.8,
		weightkg: 27.5,
		color: "Black",
		eggGroups: ["Grass"],

		evos: ["Flebonabat"],
		prevo: "Flebonabat-0",
		evoLevel: 22,
	//	creator: "BlueRay",
	},
	flebonabat: {
		num: -1007,
		name: "Flebonabat",
	
		types: ["Grass", "Poison"],
		baseStats: {hp: 85, atk: 104, def: 80, spa: 70, spd: 80, spe: 116},
		abilities: {0: "Super Luck", H: "Magic Bounce"},
	//	category: "Bat Flower",
		heightm: 0.9,
		weightkg: 38.0,
		color: "Black",
		eggGroups: ["Grass"],

		prevo: "Flebonabat-1",
		evoType: "useItem",
		evoItem: "Dark Stone",
	//	creator: "BlueRay",
	},
	// end

	// start
	enchantress0: {
		num: -1008,
		name: "Enchantress-0",
		
		types: ["Grass", "Psychic"],
		baseStats: {hp: 55, atk: 39, def: 52, spa: 77, spd: 60, spe: 64},
		abilities: {0: "Tangling Hair", 1: "Symbiosis", H: "Trace"},
	//	category: "Lost Hair",
		heightm: 0.7,
		weightkg: 6.9,
		color: "White",
		eggGroups: ["Grass"],

		evos: ["Enchantress"],
	//	creator: "BlueRay",
	},
	enchantress: {
		num: -1009,
		name: "Enchantress",

		types: ["Grass", "Psychic"],
		baseStats: {hp: 85, atk: 59, def: 72, spa: 117, spd: 80, spe: 84},
		abilities: {0: "Tangling Hair", 1: "Symbiosis", H: "Trace"},
	//	category: "Lost Hair",
		heightm: 1.0,
		weightkg: 13.0,
		color: "White",
		eggGroups: ["Grass"],

		prevo: "Enchantress-0",
		evoType: "other",
		evoCondition: "must defeat Shiftry",
	//	creator: "BlueRay",
	},
	// end

	// start
	carryu: {
		num: -1010,
		name: "Carryu",
		
		types: ["Grass"],
		gender: "N",
		baseStats: {hp: 30, atk: 45, def: 55, spa: 70, spd: 55, spe: 85},
		abilities: {0: "Reeking Stench", H: "Lightning Rod"},
	//	category: "Corpse Flower",
		heightm: 0.8,
		weightkg: 34.5,
		color: "Red",
		eggGroups: ["Grass"],

		evos: ["Caremie"],
	//	creator: "BlueRay",
	},
	caremie: {
		num: -1011,
		name: "Caremie",
		
		types: ["Grass", "Dark"],
		gender: "N",
		baseStats: {hp: 60, atk: 75, def: 85, spa: 100, spd: 85, spe: 115},
		abilities: {0: "Reeking Stench", H: "Lightning Rod"},
	//	category: "Corpse Flower",
		heightm: 1.1,
		weightkg: 80.0,
		color: "Red",
		eggGroups: ["Grass"],

		prevo: "Carryu",
		evoType: "useItem",
		evoItem: "Leaf Stone",
	//	creator: "BlueRay",
	},
	// end

	// start
	tropius: {
		num: 357,
		name: "Tropius",

		types: ["Grass", "Flying"],
		baseStats: {hp: 99, atk: 68, def: 83, spa: 72, spd: 87, spe: 51},
		abilities: {0: "Chlorophyll", 1: "Solar Power", H: "Harvest"},
		heightm: 2,
		weightkg: 100,
		color: "Green",
		eggGroups: ["Monster", "Grass"],

		evos: ["Tropalith"],
	},
	tropalith: {
		num: -1012,
		name: "Tropalith",

		types: ["Grass", "Flying"],
		baseStats: {hp: 129, atk: 88, def: 88, spa: 92, spd: 92, spe: 61},
		abilities: {0: "Chlorophyll", 1: "Solar Power", H: "Tropical Breeze"},
		heightm: 4.5,
		weightkg: 250.0,
		color: "Grass",
		eggGroups: ["Monster", "Dragon"],

		prevo: "Tropius",
		evoLevel: 50,
	//	creator: "BlueRay",
	},
	// end

	// start
	verdantnebulith: {
		num: -1013,
		name: "Verdant Nebulith",

		types: ["Grass", "Rock"],
		gender: "N",
		baseStats: {hp: 99, atk: 121, def: 110, spa: 77, spd: 88, spe: 55},
		abilities: {0: "Star Force"},
	//	category: "Planewalker",
		heightm: 2.2,
		weightkg: 310.0,
		color: "Green",
		eggGroups: ["Undiscovered"],

	//	creator: "BlueRay",
	},
    // end

	// start
	blipbug: {
		num: 824,
		name: "Blipbug",

		types: ["Bug"],
		baseStats: {hp: 25, atk: 20, def: 20, spa: 25, spd: 45, spe: 45},
		abilities: {0: "Swarm", 1: "Compound Eyes", H: "Telepathy"},
		heightm: 0.4,
		weightkg: 8,
		color: "Blue",
		evos: ["Dottler"],
		eggGroups: ["Bug"],
	},
	dottler: {
		num: 825,
		name: "Dottler",

		types: ["Bug", "Psychic"],
		baseStats: {hp: 50, atk: 35, def: 80, spa: 50, spd: 90, spe: 30},
		abilities: {0: "Swarm", 1: "Compound Eyes", H: "Telepathy"},
		heightm: 0.4,
		weightkg: 19.5,
		color: "Yellow",
		prevo: "Blipbug",
		evoLevel: 10,
		evos: ["Orbeetle"],
		eggGroups: ["Bug"],
	},
	orbeetle: {
		num: 826,
		name: "Orbeetle",

		types: ["Bug", "Psychic"],
		baseStats: {hp: 60, atk: 45, def: 110, spa: 80, spd: 120, spe: 90},
		abilities: {0: "Swarm", 1: "Frisk", H: "Telepathy"},
		heightm: 0.4,
		weightkg: 40.8,
		color: "Red",
		prevo: "Dottler",
		evoLevel: 30,
		eggGroups: ["Bug"],
		
		otherFormes: ["Orbeettle-Mega"],
		formeOrder: ["Orbeetle", "Orbeetle-Mega"],
	},
	orbeetlemega: {
		num: 826,
		name: "Orbeetle-Mega",
		
		baseSpecies: "Orbeetle",
		forme: "Mega",
		types: ["Bug", "Psychic"],
		baseStats: {hp: 60, atk: 45, def: 140, spa: 120, spd: 150, spe: 90},
		abilities: {0: "G-Force"},
		heightm: 0.4,
		weightkg: 40.8,
		color: "Red",
		eggGroups: ["Bug"],
		requiredItem: "Orbeetite",
		
	//	inspiration: "Scoopapa",
	},
	// end

	// start
	scimantis0: {
		num: -1014,
		name: "Scimantis-0",

		types: ["Bug"],
		baseStats: {hp: 40, atk: 65, def: 45, spa: 20, spd: 45, spe: 45},
		abilities: {0: "Sand Rush", 1: "Sand Veil", H: "Fendente"},
		heightm: 0.5,
		weightkg: 2.5,
		color: "Brown",
		eggGroups: ["Bug"],

		evos: ["Scimantis"],
		//	creator: "BlueRay",
	},
	scimantis: {
		num: -1015,
		name: "Scimantis",

		types: ["Bug"],
		baseStats: {hp: 70, atk: 115, def: 95, spa: 50, spd: 95, spe: 75},
		abilities: {0: "Sand Rush", 1: "Sand Veil", H: "Fendente"},
		heightm: 1.7,
		weightkg: 34.0,
		color: "Brown",
		eggGroups: ["Bug"],

		prevo: "Scimantis-0",
		evoLevel: 33,
	//	creator: "BlueRay",
	},
	// end

	// start
	shrapnoscore0: {
		num: -1016,
		name: "Shrapnoscore-0",

		types: ["Bug"],
		baseStats: {hp: 60, atk: 70, def: 80, spa: 25, spd: 45, spe: 55},
		abilities: {0: "Technician", 1: "Skill Link", H: "Sniper"},
		heightm: 0.7,
		weightkg: 6.9,
		color: "Brown",
		eggGroups: ["Bug"],

		evos: ["Shrapnoscore"],
		//	creator: "BlueRay",
	},
	shrapnoscore: {
		num: -1017,
		name: "Shrapnoscore",

		types: ["Bug"],
		baseStats: {hp: 85, atk: 110, def: 120, spa: 45, spd: 85, spe: 80},
		abilities: {0: "Technician", 1: "Skill Link", H: "Sniper"},
		heightm: 2.1,
		weightkg: 87.1,
		color: "Brown",
		eggGroups: ["Bug"],

		prevo: "Shrapnoscore-0",
		evoType: "other",
		evoCondition: "get 3 crits in battle",
	//	creator: "BlueRay",
	},
	// end

	// start
	gorbitwitch0: {
		num: -1018,
		name: "Gorbitwitch-0",

		types: ["Bug"],
		gender: "F",
		baseStats: {hp: 38, atk: 20, def: 56, spa: 52, spd: 102, spe: 57},
		abilities: {0: "Poison Spit", H: "Flash Fire"},
		heightm: 0.7,
		weightkg: 15.9,
		color: "Yellow",
		eggGroups: ["Bug"],

		evos: ["Gorbitwitch"],
		//	creator: "BlueRay",
	},
	gorbitwitch: {
		num: -1019,
		name: "Gorbitwitch",

		types: ["Bug"],
		gender: "F",
		baseStats: {hp: 58, atk: 40, def: 86, spa: 82, spd: 132, spe: 77},
		abilities: {0: "Poison Spit", H: "Flash Fire"},
		heightm: 1.5,
		weightkg: 42.7,
		color: "Yellow",
		eggGroups: ["Bug"],

		prevo: "Gorbitwitch-0",
		evoLevel: 33,
	//	creator: "BlueRay",
	},
	// end

	// start
	spinarak: {
		num: 167,
		name: "Spinarak",
		types: ["Bug", "Poison"],
		baseStats: {hp: 40, atk: 60, def: 40, spa: 40, spd: 40, spe: 30},
		abilities: {0: "Swarm", 1: "Insomnia", H: "Sniper"},
		heightm: 0.5,
		weightkg: 8.5,
		color: "Green",
		eggGroups: ["Bug"],

		evos: ["Ariados"],
	},
	ariados: {
		num: 168,
		name: "Ariados",
		types: ["Bug", "Poison"],
		baseStats: {hp: 70, atk: 90, def: 70, spa: 60, spd: 70, spe: 40},
		abilities: {0: "Swarm", 1: "Insomnia", H: "Sniper"},
		heightm: 1.1,
		weightkg: 33.5,
		color: "Red",
		eggGroups: ["Bug"],

		evos: ["Dolorak"],
		prevo: "Spinarak",
		evoLevel: 22,
	},
	dolorak: {
		num: -1020,
		name: "Dolorak",

		types: ["Bug", "Poison"],
		baseStats: {hp: 90, atk: 110, def: 90, spa: 70, spd: 90, spe: 60},
		abilities: {0: "Prankster", 1: "Insomnia", H: "Sniper"},
		heightm: 1.8,
		weightkg: 51.5,
		color: "Yellow",
		eggGroups: ["Bug"],

		prevo: "Ariados",
		evoType: "other",
		evoCondition: "poison 4 Pokémon",
	//	creator: "BlueRay",
	},
	// end

	// start
	ledyba: {
		num: 165,
		name: "Ledyba",

		types: ["Bug", "Flying"],
		baseStats: {hp: 40, atk: 20, def: 30, spa: 40, spd: 80, spe: 55},
		abilities: {0: "Swarm", 1: "Early Bird", H: "Rattled"},
		heightm: 1,
		weightkg: 10.8,
		color: "Red",
		eggGroups: ["Bug"],

		evos: ["Ledian"],
	},
	ledian: {
		num: 166,
		name: "Ledian",

		types: ["Bug", "Flying"],
		baseStats: {hp: 55, atk: 35, def: 50, spa: 55, spd: 110, spe: 85},
		abilities: {0: "Swarm", 1: "Early Bird", H: "Iron Fist"},
		heightm: 1.4,
		weightkg: 35.6,
		color: "Red",
		eggGroups: ["Bug"],

		evos: ["Lediastra"],
		prevo: "Ledyba",
		evoLevel: 18,
	},
	lediastra: {
		num: -1021,
		name: "Lediastra",

		types: ["Bug", "Electric"],
		baseStats: {hp: 75, atk: 55, def: 75, spa: 75, spd: 125, spe: 100},
		abilities: {0: "Speed Boost", 1: "Early Bird", H: "Iron Fist"},
		heightm: 1.0,
		weightkg: 41.0,
		color: "Red",
		eggGroups: ["Bug"],

		prevo: "Ledian",
		evoType: "other",
		evoCondition: "defeat 5 Pokémon",
	//	creator: "BlueRay",
	},
	// end

	// start
	tarountula: {
		num: 917,
		name: "Tarountula",
		types: ["Bug"],
		baseStats: {hp: 35, atk: 41, def: 45, spa: 29, spd: 40, spe: 20},
		abilities: {0: "Insomnia", H: "Stakeout"},
		heightm: 0.3,
		weightkg: 4,
		color: "White",
		eggGroups: ["Bug"],

		evos: ["Spidops"],
	},
	spidops: {
		num: 918,
		name: "Spidops",
		types: ["Bug"],
		baseStats: {hp: 60, atk: 79, def: 92, spa: 52, spd: 86, spe: 35},
		abilities: {0: "Insomnia", H: "Stakeout"},
		heightm: 1,
		weightkg: 16.5,
		color: "Green",
		eggGroups: ["Bug"],

		evos: ["Spidraxis"],
		prevo: "Tarountula",
		evoLevel: 15,
	},
	spidraxis: {
		num: -1022,
		name: "Spidraxis",

		types: ["Bug"],
		baseStats: {hp: 75, atk: 107, def: 119, spa: 65, spd: 112, spe: 45},
		abilities: {0: "Insomnia", 1: "Arena Trap", H: "Stakeout"},
		heightm: 1.8,
		weightkg: 29.0,
		color: "Green",
		eggGroups: ["Bug"],

		prevo: "Spidops",
		evoLevel: 44,
	//	creator: "BlueRay",
	},
	// end

	// start
	wimpodhaunted: {
		num: -1023,
		name: "Wimpod-Haunted",
		types: ["Bug", "Ghost"],
		baseStats: {hp: 20, atk: 35, def: 40, spa: 20, spd: 30, spe: 85},
		abilities: {0: "Rattled"},
		heightm: 0.5,
		weightkg: 12,
		color: "Purple",
		eggGroups: ["Bug", "Water 3"],

		evos: ["Golisopod-Haunted"],
		//	creator: "BlueRay",
	},
	golisopodhaunted: {
		num: -1024,
		name: "Golisopod-Haunted",
		types: ["Bug", "Ghost"],
		baseStats: {hp: 70, atk: 120, def: 140, spa: 60, spd: 90, spe: 50},
		abilities: {0: "Rattled"},
		heightm: 2,
		weightkg: 108,
		color: "Purple",
		eggGroups: ["Bug", "Water 3"],

		prevo: "Wimpod-Haunted",
		evoLevel: 30,
		//	creator: "BlueRay",
	},
	// end

	// start
	morthalume0: {
		num: -1025,
		name: "Morthalume-0",
		types: ["Bug"],
		baseStats: {hp: 75, atk: 50, def: 50, spa: 25, spd: 75, spe: 50},
		abilities: {0: "Swarm", 1: "Shield Dust", H: "Telepathy"},
		heightm: 0.5,
		weightkg: 1.0,
		color: "White",
		eggGroups: ["Bug"],

		evos: ["Morthalume-1"],
		//	creator: "BlueRay",
	},
	morthalume1: {
		num: -1026,
		name: "Morthalume-1",
		types: ["Bug"],
		baseStats: {hp: 100, atk: 75, def: 75, spa: 50, spd: 100, spe: 50},
		abilities: {0: "Swarm", 1: "Shield Dust", H: "Telepathy"},
		heightm: 2.5,
		weightkg: 25.0,
		color: "White",
		eggGroups: ["Bug"],

		evos: ["Morthalume"],
		prevo: "Morthalume-0",
		evoLevel: 25,
		//	creator: "BlueRay",
	},
	morthalume: {
		num: -1027,
		name: "Morthalume",

		types: ["Bug", "Ghost"],
		baseStats: {hp: 150, atk: 125, def: 50, spa: 100, spd: 75, spe: 100},
		abilities: {0: "Swarm", 1: "Pressure", H: "Telepathy"},
		heightm: 7.5,
		weightkg: 350.0,
		color: "Yellow",
		eggGroups: ["Bug"],

		prevo: "Morthalume-1",
		evoLevel: 50,
	//	creator: "BlueRay",
	},
	// end

	// start
	morthalesson: {
		num: -1028,
		name: "Morthalesson",

		types: ["Bug", "Fairy"],
		gender: "N",
		baseStats: {hp: 150, atk: 125, def: 50, spa: 100, spd: 75, spe: 100},
		abilities: {0: "Swarm", 1: "Unnerve", H: "Defiant"},
	//	category: "Imago",
		heightm: 7.5,
		weightkg: 350.0,
		color: "Black",
		eggGroups: ["Undiscovered"],
	//	creator: "BlueRay",
	},
    // end

	// start
	kumonga: {
		num: -1029,
		name: "Kumonga",

		types: ["Bug"],
		gender: "N",
		baseStats: {hp: 115, atk: 79, def: 90, spa: 112, spd: 132, spe: 42},
		abilities: {0: "Metamorphosis"},
	//	category: "Kaiju",
		heightm: 8.2,
		weightkg: 300.9,
		color: "Brown",
		eggGroups: ["Undiscovered"],
	//	creator: "BlueRay",
	},
    // end

	// start
	megaguirus: {
		num: -1030,
		name: "Megaguirus",

		types: ["Bug"],
		gender: "N",
		baseStats: {hp: 129, atk: 100, def: 80, spa: 50, spd: 80, spe: 131},
		abilities: {0: "Transmutation"},
	//	category: "Kaiju",
		heightm: 5.0,
		weightkg: 264.7,
		color: "Red",
		eggGroups: ["Undiscovered"],
	//	creator: "BlueRay",
	},
    // end

	// start
	intestinorm: {
		num: -1031,
		name: "Intestinorm",

		types: ["Bug", "Ground"],
		gender: "N",
		baseStats: {hp: 84, atk: 60, def: 126, spa: 132, spd: 78, spe: 90},
		abilities: {0: "Archetype", H: "Electric Surge"},
	//	category: "Essence",
		heightm: 4.2,
		weightkg: 398.0,
		color: "Red",
		tags: ["Sub-Legendary"],
		eggGroups: ["Undiscovered"],

	//	creator: "BlueRay",
	},
	mesmortbid: {
		num: -1032,
		name: "Mesmortbid",

		types: ["Bug", "Dark"],
		gender: "N",
		baseStats: {hp: 108, atk: 132, def: 84, spa: 60, spd: 90, spe: 96},
		abilities: {0: "Archetype", H: "Parasignal"},
	//	category: "Omen",
		heightm: 2.1,
		weightkg: 63.0,
		color: "Black",
		tags: ["Sub-Legendary"],
		eggGroups: ["Undiscovered"],

	//	creator: "BlueRay",
	},
	gigantipede: {
		num: -1033,
		name: "Gigantipede",

		types: ["Bug", "Water"],
		gender: "N",
		baseStats: {hp: 132, atk: 96, def: 78, spa: 114, spd: 66, spe: 84},
		abilities: {0: "Archetype", H: "Poison Heal"},
	//	category: "Sea Serpent",
		heightm: 14.0,
		weightkg: 560.0,
		color: "Green",
		tags: ["Sub-Legendary"],
		eggGroups: ["Undiscovered"],

	//	creator: "BlueRay",
	},
	rodwell: {
		num: -1034,
		name: "Rodwell",

		types: ["Bug", "Electric"],
		gender: "N",
		baseStats: {hp: 60, atk: 114, def: 72, spa: 66, spd: 126, spe: 132},
		abilities: {0: "Archetype", H: "Galvanize"},
	//	category: "Sky Fish",
		heightm: 1.4,
		weightkg: 14.0,
		color: "White",
		tags: ["Sub-Legendary"],
		eggGroups: ["Undiscovered"],

	//	creator: "BlueRay",
	},
	// end

	// start
	ursilkith: {
		num: -1035,
		name: "Ursilkith",

		baseForme: "Alternate",
		types: ["Bug"],
		gender: "N",
		baseStats: {hp: 100, atk: 125, def: 130, spa: 85, spd: 130, spe: 130},
		abilities: {0: "Gravitational Pull"},
	//	category: "Ancient",
		heightm: 13.8,
		weightkg: 777.7,
		color: "White",
		tags: ["Restricted Legendary"],
		eggGroups: ["Undiscovered"],
		otherFormes: ["Ursilkith-Origin"],
		formeOrder: ["Ursilkith", "Ursilkith-Origin"],

	//	creator: "BlueRay",
	},
	ursilkithorigin: {
		num: -1035,
		name: "Ursilkith-Origin",

		baseSpecies: "Ursilkith",
		forme: "Origin",
		types: ["Bug", "Ice"],
		gender: "N",
		baseStats: {hp: 100, atk: 125, def: 130, spa: 85, spd: 255, spe: 5},
		abilities: {0: "Gravitational Pull"},
	//	category: "Ancient",
		heightm: 13.8,
		weightkg: 777.7,
		color: "White",
		tags: ["Restricted Legendary"],
		eggGroups: ["Undiscovered"],
		changesFrom: "Ursilkith",

	//	creator: "BlueRay",
	},
	// end

	// start
	piahchi0: {
		num: -1036,
		name: "Piahchi-0",

		types: ["Fire", "Normal"],
		genderRatio: {M: 0.875, F: 0.125},
		baseStats: {hp: 45, atk: 30, def: 45, spa: 58, spd: 75, spe: 57},
		abilities: {0: "Blaze", H: "Curious Medicine"},
	//	category: "Vibrant",
		heightm: 0.5,
		weightkg: 3.0,
		color: "Blue",
		eggGroups: ["Flying"],

		evos: ["Piahchi-1"],
	//	creator: "BlueRay",
	},
	piahchi1: {
		num: -1037,
		name: "Piahchi-1",

		types: ["Fire", "Normal"],
		genderRatio: {M: 0.875, F: 0.125},
		baseStats: {hp: 65, atk: 40, def: 60, spa: 83, spd: 105, spe: 67},
		abilities: {0: "Blaze", H: "Curious Medicine"},
	//	category: "Vibrant",
		heightm: 1.0,
		weightkg: 6.0,
		color: "Blue",
		eggGroups: ["Flying"],

		evos: ["Piahchi"],
		prevo: "Piahchi-0",
		evoLevel: 16,
	//	creator: "BlueRay",
	},
	piahchi: {
		num: -1038,
		name: "Piahchi",

		types: ["Fire", "Fairy"],
		genderRatio: {M: 0.875, F: 0.125},
		baseStats: {hp: 95, atk: 55, def: 70, spa: 103, spd: 125, spe: 82},
		abilities: {0: "Blaze", H: "Curious Medicine"},
	//	category: "Vibrant",
		heightm: 1.5,
		weightkg: 18.0,
		color: "Blue",
		eggGroups: ["Flying"],

		otherFormes: ["Piahchi-Ascend"],
		formeOrder: ["Piahchi", "Piahchi-Ascend"],
		prevo: "Piahchi-1",
		evoLevel: 36,
	//	creator: "BlueRay",
	},
	piahchiascend: {
		num: -1038,
		name: "Piahchi-Ascend",
		baseSpecies: "Piahchi",
		forme: "Ascend",
		types: ["Fire", "Fairy"],
		genderRatio: {M: 0.875, F: 0.125},
		baseStats: {hp: 95, atk: 85, def: 85, spa: 133, spd: 140, spe: 92},
		abilities: {0: "Dazzling"},
		heightm: 1.5,
		weightkg: 18.0,
		color: "Blue",
		eggGroups: ["Flying"],
		requiredItem: "Piahchium",
	},
	// end

	// start
	hinmira0: {
		num: -1039,
		name: "Hinmira-0",
		types: ["Fire", "Poison"],
		baseStats: {hp: 52, atk: 68, def: 60, spa: 40, spd: 50, spe: 44},
		abilities: {0: "Levitate", H: "Sand Rush"},
		heightm: 0.6,
		weightkg: 17.4,
		color: "Red",
		eggGroups: ["Field", "Fairy"],

		evos: ["Hinmira"],
		//	creator: "BlueRay",
	},
	hinmira: {
		num: -1040,
		name: "Hinmira",
		types: ["Fire", "Poison"],
		baseStats: {hp: 77, atk: 103, def: 95, spa: 65, spd: 85, spe: 69},
		abilities: {0: "Levitate", H: "Sand Rush"},
		heightm: 1.3,
		weightkg: 39.2,
		color: "Red",
		eggGroups: ["Field", "Fairy"],

		prevo: "Hinmira-0",
		evoLevel: 24,
		//	creator: "BlueRay",
	},
	// end

	// start
	qwilinh0: {
		num: -1041,
		name: "Qwilinh-0",
		types: ["Fire", "Fighting"],
		baseStats: {hp: 86, atk: 80, def: 50, spa: 89, spd: 50, spe: 35},
		abilities: {0: "Goodwill"},
		heightm: 1.5,
		weightkg: 45.0,
		color: "Yellow",
		eggGroups: ["Field", "Dragon"],

		evos: ["Qwilinh"],
		//	creator: "BlueRay",
	},
	qwilinh: {
		num: -1042,
		name: "Qwilinh",
		types: ["Fire", "Fighting"],
		baseStats: {hp: 126, atk: 100, def: 70, spa: 129, spd: 70, spe: 55},
		abilities: {0: "Goodwill"},
		heightm: 2.4,
		weightkg: 136.0,
		color: "Yellow",
		eggGroups: ["Field", "Dragon"],

		otherFormes: ["Qwilinh-Ascend"],
		formeOrder: ["Qwilinh", "Qwilinh-Ascend"],
		prevo: "Qwilinh-0",
		evoLevel: 49,
		//	creator: "BlueRay",
	},
	qwilinhascend: {
		num: -1042,
		name: "Qwilinh-Ascend",
		baseSpecies: "Qwilinh",
		forme: "Ascend",
		types: ["Fire", "Fighting"],
		baseStats: {hp: 126, atk: 120, def: 70, spa: 149, spd: 70, spe: 115},
		abilities: {0: "Goodwill"},
		heightm: 2.4,
		weightkg: 136.0,
		color: "Yellow",
		eggGroups: ["Field", "Dragon"],
		requiredItem: "Qwilinhium",
	},
	// end

	// start
	frayva: {
		num: -1043,
		name: "Frayva",

		types: ["Fire"],
		baseStats: {hp: 79, atk: 115, def: 80, spa: 85, spd: 70, spe: 111},
		abilities: {0: "Prankster", H: "Rebel"},
	//	category: "Burning Spirit",
		heightm: 1.4,
		weightkg: 58.0,
		color: "Red",
		eggGroups: ["Field", "Fairy"],

	//	creator: "BlueRay",
	},
    // end

	// start
	gamera: {
		num: -1044,
		name: "Gamera",

		types: ["Fire", "Psychic"],
		gender: "N",
		baseStats: {hp: 160, atk: 89, def: 135, spa: 85, spd: 65, spe: 36},
		abilities: {0: "Metamorphosis"},
	//	category: "Kaiju",
		heightm: 7.0,
		weightkg: 844.3,
		color: "Red",
		eggGroups: ["Undiscovered"],
	//	creator: "BlueRay",
	},
    // end

	// start
	crimsonrover: {
		num: -1045,
		name: "Crimson Rover",

		types: ["Fire", "Ground"],
		gender: "N",
		baseStats: {hp: 121, atk: 77, def: 99, spa: 110, spd: 77, spe: 66},
		abilities: {0: "Star Force"},
	//	category: "Probe",
		heightm: 1.6,
		weightkg: 326.5,
		color: "Brown",
		eggGroups: ["Undiscovered"],

	//	creator: "BlueRay",
	},
    // end

	// start
	ursolastice: {
		num: -1046,
		name: "Ursolastice",

		types: ["Fire"],
		gender: "N",
		baseStats: {hp: 168, atk: 100, def: 145, spa: 110, spd: 82, spe: 75},
		abilities: {0: "Solar Flare"},
	//	category: "Sun Bearer",
		heightm: 15.5,
		weightkg: 515.0,
		color: "Red",
		tags: ["Restricted Legendary"],
		eggGroups: ["Undiscovered"],

	//	creator: "BlueRay",
	},
	// end

	// start
	lapras: {
		num: 131,
		name: "Lapras",

		types: ["Water", "Ice"],
		baseStats: {hp: 130, atk: 85, def: 80, spa: 85, spd: 95, spe: 60},
		abilities: {0: "Water Absorb", 1: "Shell Armor", H: "Hydration"},
		heightm: 2.5,
		weightkg: 220,
		color: "Blue",

		eggGroups: ["Monster", "Water 1"],
		otherFormes: ["Lapras-Mega"],
		formeOrder: ["Lapras", "Lapras-Mega"],
	},
	laprasmega: {
		num: 131,
		name: "Lapras-Mega",
	
		baseSpecies: "Lapras",
		forme: "Mega",
		types: ["Water", "Ice"],
		baseStats: {hp: 130, atk: 85, def: 100, spa: 135, spd: 115, spe: 70},
		abilities: {0: "Concordia"},
		heightm: 2.5,
		weightkg: 220,
		color: "Blue",

		eggGroups: ["Monster", "Water 1"],
		requiredItem: "Laprasite",
	
	//	creator: "BlueRay",
	},
	// end

	// start
	zantui0: {
		num: -1047,
		name: "Zantui-0",

		types: ["Water", "Normal"],
		genderRatio: {M: 0.875, F: 0.125},
		baseStats: {hp: 55, atk: 70, def: 51, spa: 31, spd: 51, spe: 52},
		abilities: {0: "Torrent", H: "Intimidate"},
	//	category: "Water Tiger",
		heightm: 0.3,
		weightkg: 25.0,
		color: "White",
		eggGroups: ["Water 1", "Field"],

		evos: ["Zantui-1"],
	//	creator: "BlueRay",
	},
	zantui1: {
		num: -1048,
		name: "Zantui-1",

		types: ["Water", "Normal"],
		genderRatio: {M: 0.875, F: 0.125},
		baseStats: {hp: 70, atk: 95, def: 66, spa: 46, spd: 66, spe: 77},
		abilities: {0: "Torrent", H: "Intimidate"},
	//	category: "Water Tiger",
		heightm: 0.8,
		weightkg: 75.0,
		color: "White",
		eggGroups: ["Water 1", "Field"],

		evos: ["Zantui"],
		prevo: "Zantui-0",
		evoLevel: 16,
	//	creator: "BlueRay",
	},
	zantui: {
		num: -1049,
		name: "Zantui",

		types: ["Water", "Psychic"],
		genderRatio: {M: 0.875, F: 0.125},
		baseStats: {hp: 85, atk: 125, def: 81, spa: 56, spd: 81, spe: 102},
		abilities: {0: "Torrent", H: "Intimidate"},
	//	category: "Water Tiger",
		heightm: 1.2,
		weightkg: 150.0,
		color: "Blue",
		eggGroups: ["Water 1", "Field"],

		otherFormes: ["Zantui-Ascend"],
		formeOrder: ["Zantui", "Zantui-Ascend"],
		prevo: "Zantui-1",
		evoLevel: 36,
	//	creator: "BlueRay",
	},
	zantuiascend: {
		num: -1049,
		name: "Zantui-Ascend",
		baseSpecies: "Zantui",
		forme: "Ascend",
		types: ["Water", "Psychic"],
		genderRatio: {M: 0.875, F: 0.125},
		baseStats: {hp: 85, atk: 155, def: 101, spa: 56, spd: 101, spe: 132},
		abilities: {0: "Magic Bounce"},
		heightm: 1.2,
		weightkg: 150.0,
		color: "Blue",
		eggGroups: ["Water 1", "Field"],
		requiredItem: "Zantium",
	},
	// end

	// start
	churipple0: {
		num: -1050,
		name: "Churipple-0",

		types: ["Water"],
		baseStats: {hp: 50, atk: 55, def: 40, spa: 32, spd: 30, spe: 90},
		abilities: {0: "Rivalry", 1: "Swift Swim", H: "Fur Coat"},
		heightm: 1.9,
		weightkg: 41.3,
		color: "Brown",
		eggGroups: ["Fairy"],

		evos: ["Churipple"],
		//	creator: "BlueRay",
	},
	churipple: {
		num: -1051,
		name: "Churipple",

		types: ["Water"],
		baseStats: {hp: 90, atk: 95, def: 70, spa: 62, spd: 60, spe: 130},
		abilities: {0: "Rivalry", 1: "Swift Swim", H: "Fur Coat"},
		heightm: 4.6,
		weightkg: 132.8,
		color: "Brown",
		eggGroups: ["Fairy"],

		prevo: "Churipple-0",
		evoType: "levelFriendship",
		//	creator: "BlueRay",
	},
	// end

	// start
	ducklett: {
		num: 580,
		name: "Ducklett",
		types: ["Water", "Flying"],
		baseStats: {hp: 62, atk: 44, def: 50, spa: 44, spd: 50, spe: 55},
		abilities: {0: "Keen Eye", 1: "Big Pecks", H: "Hydration"},
		heightm: 0.5,
		weightkg: 5.5,
		color: "Blue",
		eggGroups: ["Water 1", "Flying"],

		evos: ["Swanna"],
	},
	swanna: {
		num: 581,
		name: "Swanna",

		types: ["Water", "Flying"],
		baseStats: {hp: 75, atk: 87, def: 63, spa: 87, spd: 63, spe: 98},
		abilities: {0: "Keen Eye", 1: "Big Pecks", H: "Hydration"},
		heightm: 1.3,
		weightkg: 24.2,
		color: "White",
		eggGroups: ["Water 1", "Flying"],

		evos: ["Swanneil"],
		prevo: "Ducklett",
		evoLevel: 35,
	},
	swanneil: {
		num: -1052,
		name: "Swanneil",

		types: ["Water", "Flying"],
		baseStats: {hp: 90, atk: 97, def: 73, spa: 97, spd: 73, spe: 113},
		abilities: {0: "Masquerade", 1: "Big Pecks", H: "Hydration"},
		heightm: 1.7,
		weightkg: 28.7,
		color: "Black",
		eggGroups: ["Water 1", "Flying"],

		prevo: "Swanna",
		evoType: "levelFriendship",
		//	creator: "BlueRay",
	},
	// end

	// start
	cryptobug: {
		num: -1053,
		name: "Cryptobug",

		types: ["Water", "Bug"],
		baseStats: {hp: 33, atk: 11, def: 220, spa: 22, spd: 220, spe: 11},
		abilities: {0: "Hydration", H: "Cryptobiosis"},
	//	category: "Resilient",
		heightm: 0.1,
		weightkg: 0.1,
		color: "Blue",
		eggGroups: ["Bug"],

	//	creator: "BlueRay",
	},
    // end

	// start
	azuresquadron: {
		num: -1054,
		name: "Azure Squadron",

		types: ["Water", "Flying"],
		gender: "N",
		baseStats: {hp: 77, atk: 121, def: 66, spa: 88, spd: 66, spe: 132},
		abilities: {0: "Star Force"},
	//	category: "Commander",
		heightm: 1.9,
		weightkg: 45.2,
		color: "Blue",
		eggGroups: ["Undiscovered"],

	//	creator: "BlueRay",
	},
    // end

	// start
	urcrypbanys: {
		num: -1055,
		name: "Urcrypbanys",

		types: ["Water", "Rock"],
		gender: "N",
		baseStats: {hp: 100, atk: 85, def: 255, spa: 125, spd: 130, spe: 5},
		abilities: {0: "Residual Drain"},
	//	category: "Abyss",
		heightm: 27.4,
		weightkg: 999.9,
		color: "Blue",
		tags: ["Restricted Legendary"],
		eggGroups: ["Undiscovered"],

	//	creator: "BlueRay",
	},
	// end

	// start
	bergmite: {
		num: 712,
		name: "Bergmite",

		types: ["Ice"],
		baseStats: {hp: 55, atk: 69, def: 85, spa: 32, spd: 35, spe: 28},
		abilities: {0: "Own Tempo", 1: "Ice Body", H: "Sturdy"},
		heightm: 1,
		weightkg: 99.5,
		color: "Blue",
		eggGroups: ["Monster", "Mineral"],

		evos: ["Avalugg", "Avalugg-Hisui"],
	},
	avalugg: {
		num: 713,
		name: "Avalugg",

		types: ["Ice"],
		baseStats: {hp: 95, atk: 117, def: 184, spa: 44, spd: 46, spe: 28},
		abilities: {0: "Own Tempo", 1: "Ice Body", H: "Sturdy"},
		heightm: 2,
		weightkg: 505,
		color: "Blue",
		eggGroups: ["Monster", "Mineral"],

		prevo: "Bergmite",
		evoLevel: 37,
		otherFormes: ["Avalugg-Mega", "Avalugg-Hisui"],
		formeOrder: ["Avalugg", "Avalugg-Mega", "Avalugg-Hisui"],
	},
	avaluggmega: {
		num: 713,
		name: "Avalugg-Mega",

		baseSpecies: "Avalugg",
		forme: "Mega",
		types: ["Ice"],
		baseStats: {hp: 95, atk: 157, def: 214, spa: 44, spd: 76, spe: 28},
		abilities: {0: "Stamina"},
		heightm: 2,
		weightkg: 505,
		color: "Blue",
		eggGroups: ["Monster", "Mineral"],

		requiredItem: "Avaluggite",
	},
	// end

	// start
	vaheelia0: {
		num: -1056,
		name: "Vaheelia-0",

		types: ["Ice", "Ghost"],
		baseStats: {hp: 59, atk: 90, def: 50, spa: 20, spd: 50, spe: 71},
		abilities: {0: "Intimidate", 1: "Strong Jaw", H: "Ice Body"},
	//	category: "Devour",
		heightm: 0.6,
		weightkg: 15.3,
		color: "White",
		eggGroups: ["Field", "Amorphous"],

		evos: ["Vaheelia"],
	//	creator: "BlueRay",
	},
	vaheelia: {
		num: -1057,
		name: "Vaheelia",

		types: ["Ice", "Ghost"],
		baseStats: {hp: 99, atk: 130, def: 90, spa: 40, spd: 70, spe: 111},
		abilities: {0: "Intimidate", 1: "Strong Jaw", H: "Ice Body"},
	//	category: "Devour",
		heightm: 1.8,
		weightkg: 142.0,
		color: "White",
		eggGroups: ["Field", "Amorphous"],

		prevo: "Vaheelia-0",
		evoType: "useItem",
		evoItem: "Ice Stone",
	//	creator: "BlueRay",
	},
	// end

	// start
	divortiscinia0: {
		num: -1058,
		name: "Divortiscinia-0",

		types: ["Ice", "Dark"],
		baseStats: {hp: 76, atk: 65, def: 55, spa: 25, spd: 35, spe: 59},
		abilities: {0: "Ice Body", H: "Fur Coat"},
	//	category: "Malevolent",
		heightm: 1.7,
		weightkg: 84.2,
		color: "Gray",
		eggGroups: ["Fairy"],

		evos: ["Divortiscinia"],
	//	creator: "BlueRay",
	},
	divortiscinia: {
		num: -1059,
		name: "Divortiscinia",

		types: ["Ice", "Dark"],
		baseStats: {hp: 111, atk: 105, def: 95, spa: 40, spd: 70, spe: 99},
		abilities: {0: "Ice Body", H: "Fur Coat"},
	//	category: "Malevolent",
		heightm: 2.4,
		weightkg: 136.4,
		color: "Gray",
		eggGroups: ["Fairy"],

		prevo: "Divortiscinia-0",
		evoType: "useItem",
		evoItem: "Dark Stone",
	//	creator: "BlueRay",
	},
	// end

	// start
	glaciussomnus: {
		num: -1060,
		name: "Glacius Somnus",

		types: ["Ice", "Psychic"],
		gender: "N",
		baseStats: {hp: 99, atk: 132, def: 187, spa: 44, spd: 55, spe: 33},
		abilities: {0: "Star Force"},
	//	category: "Sleep Cube",
		heightm: 2.0,
		weightkg: 505.0,
		color: "White",
		eggGroups: ["Undiscovered"],

	//	creator: "BlueRay",
	},
    // end

	// start
	ratrival0: {
		num: -1061,
		name: "Ratrival-0",

		types: ["Electric", "Water"],
		baseStats: {hp: 52, atk: 64, def: 52, spa: 52, spd: 64, spe: 76},
		abilities: {0: "Static", 1: "Team Up", H: "Adaptability"},
	//	category: "Headstart",
		heightm: 0.3,
		weightkg: 9.5,
		color: "Yellow",
		eggGroups: ["Field", "Fairy"],

		evos: ["Ratrival"],
	//	creator: "BlueRay",
	},
	ratrival: {
		num: -1062,
		name: "Ratrival",

		types: ["Electric", "Water"],
		baseStats: {hp: 72, atk: 84, def: 72, spa: 72, spd: 84, spe: 96},
		abilities: {0: "Static", 1: "Team Up", H: "Adaptability"},
	//	category: "Headstart",
		heightm: 0.8,
		weightkg: 25.0,
		color: "Yellow",
		eggGroups: ["Field", "Fairy"],

		prevo: "Ratrival-0",
		evoType: "levelHold",
		evoItem: "Quick Claw",
		evoCondition: "in Doubles",
	//	creator: "BlueRay",
	},
	// end

	// start
	honedgelight: {
		num: -1063,
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
		num: -1064,
		name: "Doublade-Light",

		types: ["Electric"],
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
		num: -1065,
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
		num: -1065,
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
	citrineglider: {
		num: -1066,
		name: "Citrine Glider",

		types: ["Electric", "Dark"],
		gender: "N",
		baseStats: {hp: 33, atk: 44, def: 132, spa: 143, spd: 110, spe: 88},
		abilities: {0: "Star Force"},
	//	category: "Stealth",
		heightm: 0.3,
		weightkg: 6.0,
		color: "Gray",
		eggGroups: ["Undiscovered"],

	//	creator: "BlueRay",
	},
    // end

	// start
	patrellor0: {
		num: -1067,
		name: "Patrellor-0",

		types: ["Psychic", "Dark"],
		baseStats: {hp: 130, atk: 88, def: 40, spa: 30, spd: 35, spe: 67},
		abilities: {0: "Swift Swim", 1: "Strong Jaw", H: "Anticipation"},
		heightm: 2.6,
		weightkg: 181.1,
		color: "Black",
		eggGroups: ["Field", "Water 2"],

		evos: ["Patrellor"],
		//	creator: "BlueRay",
	},
	patrellor: {
		num: -1068,
		name: "Patrellor",

		types: ["Psychic", "Dark"],
		baseStats: {hp: 170, atk: 108, def: 60, spa: 40, spd: 55, spe: 87},
		abilities: {0: "Swift Swim", 1: "Strong Jaw", H: "Anticipation"},
		heightm: 9.8,
		weightkg: 750.0,
		color: "Black",
		eggGroups: ["Field", "Water 2"],

		prevo: "Patrellor-0",
		evoLevel: 40,
		//	creator: "BlueRay",
	},
	// end

	engoatix0: {
		num: -1069,
		name: "Engoatix-0",

		types: ["Psychic", "Poison"],
		baseStats: {hp: 57, atk: 58, def: 41, spa: 29, spd: 74, spe: 91},
		abilities: {0: "Limber", 1: "Guts", H: "Poison Touch"},
		heightm: 0.7,
		weightkg: 7.7,
		color: "Green",
		eggGroups: ["Field"],

		evos: ["Engoatix"],
	},
	engoatix: {
		num: -1070,
		name: "Engoatix",

		types: ["Psychic", "Poison"],
		baseStats: {hp: 77, atk: 88, def: 66, spa: 44, spd: 99, spe: 121},
		abilities: {0: "Limber", 1: "Guts", H: "Poison Touch"},
		heightm: 1.2,
		weightkg: 14.3,
		color: "Green",
		eggGroups: ["Field"],

		prevo: "Engoatix-0",
		evoType: "levelFriendship",
	},
	// end

	// start
	natu: {
		num: 177,
		name: "Natu",
		types: ["Psychic", "Flying"],
		baseStats: {hp: 40, atk: 50, def: 45, spa: 70, spd: 45, spe: 70},
		abilities: {0: "Synchronize", 1: "Early Bird", H: "Magic Bounce"},
		heightm: 0.2,
		weightkg: 2,
		color: "Green",
		eggGroups: ["Flying"],

		evos: ["Xatu"],
	},
	xatu: {
		num: 178,
		name: "Xatu",

		types: ["Psychic", "Flying"],
		baseStats: {hp: 65, atk: 75, def: 70, spa: 95, spd: 70, spe: 95},
		abilities: {0: "Synchronize", 1: "Early Bird", H: "Magic Bounce"},
		heightm: 1.5,
		weightkg: 15,
		color: "Green",
		eggGroups: ["Flying"],

		evos: ["Azlatu"],
		prevo: "Natu",
		evoLevel: 25,
	},
	azlatu: {
		num: -1071,
		name: "Azlatu",
		
		types: ["Psychic", "Flying"],
		baseStats: {hp: 90, atk: 80, def: 95, spa: 120, spd: 95, spe: 60},
		abilities: {0: "Psych Out", 1: "Stakeout", H: "Magic Bounce"},
		heightm: 1.7,
		weightkg: 17,
		color: "Green",
		eggGroups: ["Flying"],

		prevo: "Xatu",
		evoType: "other",
		evoCondition: "survive with 1 HP",
	},
	// end

	// start
	foongusenlightened: {
		num: -1072,
		name: "Foongus-Enlightened",

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
	restowl0: {
		num: -1073,
		name: "Restowl-0",

		types: ["Flying", "Ice"],
		baseStats: {hp: 54, atk: 39, def: 46, spa: 59, spd: 52, spe: 45},
		abilities: {0: "Ice Body", 1: "Magic Guard", H: "Vital Spirit"},
		heightm: 0.6,
		weightkg: 23.6,
		color: "White",
		eggGroups: ["Flying"],

		evos: ["Restowl"],
		//	creator: "BlueRay",
	},
	restowl: {
		num: -1074,
		name: "Restowl",

		baseForme: "Standard",
		types: ["Ghost", "Ice"],
		baseStats: {hp: 94, atk: 59, def: 76, spa: 99, spd: 82, spe: 75},
		abilities: {0: "Ice Body", 1: "Magic Guard", H: "Poultageist"},
		heightm: 1.4,
		weightkg: 40.4,
		color: "White",
		eggGroups: ["Flying"],
		otherFormes: ["Restowl-Guardian"],
		formeOrder: ["Restowl", "Restowl-Guardian"],

		prevo: "Restowl-0",
		evoLevel: 26,
		//	creator: "BlueRay",
	},
	restowlguardian: {
		num: -1074,
		name: "Restowl-Guardian",
		baseSpecies: "Restowl",
		forme: "Guardian",
		types: ["Ghost", "Ice"],
		baseStats: {hp: 1, atk: 59, def: 76, spa: 99, spd: 82, spe: 75},
		maxHP: 1,
		abilities: {0: "Wonder Guard", 1: "Wonder Guard", H: "Wonder Guard"},
		heightm: 1.4,
		weightkg: 40.4,
		color: "White",
		eggGroups: ["Flying"],
		requiredAbility: "Wonder Guard",
		battleOnly: "Restowl",
	},
	// end

	// start
	dragdimmar: {
		num: -1075,
		name: "Dragdimmar",

		types: ["Ghost", "Poison"],
		baseStats: {hp: 56, atk: 117, def: 60, spa: 91, spd: 65, spe: 117},
		abilities: {0: "Poison Touch", H: "Poison Point"},
	//	category: "Revenant",
		heightm: 1.8,
		weightkg: 39.9,
		color: "Black",

		eggGroups: ["Amorphous"],

	//	creator: "BlueRay",
	},
    // end

	// start
	zawkelder: {
		num: -1076,
		name: "Zawkelder",

		types: ["Ghost"],
		baseStats: {hp: 120, atk: 80, def: 110, spa: 50, spd: 80, spe: 45},
		abilities: {0: "Rattled", H: "Limber"},
	//	category: "Collective",
		heightm: 10.4,
		weightkg: 471.0,
		color: "White",

		eggGroups: ["Amorphous"],

	//	creator: "BlueRay",
	},
    // end

	// start
	warynaut: {
		num: -1077,
		name: "Warynaut",

		types: ["Ghost"],
		baseStats: {hp: 92, atk: 45, def: 75, spa: 105, spd: 120, spe: 73},
		abilities: {0: "Suction Cups", 1: "Water Absorb", H: "Drizzle"},
	//	category: "Storm Spirit",
		heightm: 6.5,
		weightkg: 204.0,
		color: "Black",

		eggGroups: ["Water 3", "Amorphous"],

	//	creator: "BlueRay",
	},
    // end

	// start
	alghulazam0: {
		num: -1078,
		name: "Al-Ghulazam-0",

		types: ["Ghost", "Psychic"],
		baseStats: {hp: 46, atk: 64, def: 80, spa: 45, spd: 30, spe: 54},
		abilities: {0: "Sand Veil", 1: "Illusion", H: "Prankster"},
		heightm: 0.7,
		weightkg: 27.6,
		color: "White",
		eggGroups: ["Amorphous"],

		evos: ["Al-Ghulazam"],
		//	creator: "BlueRay",
	},
	alghulazam: {
		num: -1079,
		name: "Al-Ghulazam",

		types: ["Ghost", "Psychic"],
		baseStats: {hp: 66, atk: 104, def: 120, spa: 75, spd: 70, spe: 84},
		abilities: {0: "Sand Veil", 1: "Illusion", H: "Prankster"},
		heightm: 1.7,
		weightkg: 56.0,
		color: "White",
		eggGroups: ["Amorphous"],

		prevo: "Al-Ghulazam-0",
		evoLevel: 38,
		//	creator: "BlueRay",
	},
	// end

	// start
	baggaluv0: {
		num: -1080,
		name: "Baggaluv-0",

		types: ["Fairy", "Grass"],
		baseStats: {hp: 43, atk: 65, def: 55, spa: 40, spd: 97, spe: 30},
		abilities: {0: "Poison Scatter", H: "Unburden"},
		heightm: 0.7,
		weightkg: 6.9,
		color: "Pink",
		eggGroups: ["Grass", "Fairy"],

		evos: ["Baggaluv"],
		//	creator: "BlueRay",
	},
	baggaluv: {
		num: -1081,
		name: "Baggaluv",

		types: ["Fairy", "Grass"],
		baseStats: {hp: 63, atk: 85, def: 75, spa: 60, spd: 117, spe: 50},
		abilities: {0: "Poison Scatter", H: "Unburden"},
		heightm: 1.0,
		weightkg: 13.0,
		color: "Pink",
		eggGroups: ["Grass", "Fairy"],

		prevo: "Baggaluv-0",
		evoLevel: 23,
		//	creator: "BlueRay",
	},
	// end

	// start
	urtidelene: {
		num: -1082,
		name: "Urtidelene",

		types: ["Fairy"],
		gender: "N",
		baseStats: {hp: 168, atk: 110, def: 82, spa: 100, spd: 145, spe: 75},
		abilities: {0: "Lunar Particles"},
	//	category: "Moon Bearer",
		heightm: 15.5,
		weightkg: 515.0,
		color: "Gray",
		tags: ["Restricted Legendary"],
		eggGroups: ["Undiscovered"],

	//	creator: "BlueRay",
	},
	// end

	// start
	tyrunt: {
		num: 696,
		name: "Tyrunt",
		types: ["Rock", "Dragon"],
		genderRatio: {M: 0.875, F: 0.125},
		baseStats: {hp: 58, atk: 89, def: 77, spa: 45, spd: 45, spe: 48},
		abilities: {0: "Strong Jaw", H: "Sturdy"},
		heightm: 0.8,
		weightkg: 26,
		color: "Brown",
		eggGroups: ["Monster", "Dragon"],

		evos: ["Tyrantrum"],
	},
	tyrantrum: {
		num: 697,
		name: "Tyrantrum",
		types: ["Rock", "Dragon"],
		genderRatio: {M: 0.875, F: 0.125},
		baseStats: {hp: 82, atk: 121, def: 119, spa: 69, spd: 59, spe: 71},
		abilities: {0: "Strong Jaw", H: "Rock Head"},
		heightm: 2.5,
		weightkg: 270,
		color: "Red",
		eggGroups: ["Monster", "Dragon"],

		otherFormes: ["Tyrantrum-Mega"],
		formeOrder: ["Tyrantrum", "Tyrantrum-Mega"],
		prevo: "Tyrunt",
		evoLevel: 39,
		evoCondition: "during the day",
	},
	tyrantrummega: {
		num: 697,
		name: "Tyrantrum-Mega",

		baseSpecies: "Tyrantrum",
		forme: "Mega",
		types: ["Rock", "Dragon"],
		genderRatio: {M: 0.875, F: 0.125},
		baseStats: {hp: 82, atk: 151, def: 149, spa: 69, spd: 79, spe: 91},
		abilities: {0: "Fluffy"},
		heightm: 3.3,
		weightkg: 311.2,
		color: "Red",
		eggGroups: ["Monster", "Dragon"],
		requiredItem: "Tyrantrumite",
	},
	// end

	// start
	amaura: {
		num: 698,
		name: "Amaura",
		types: ["Rock", "Ice"],
		genderRatio: {M: 0.875, F: 0.125},
		baseStats: {hp: 77, atk: 59, def: 50, spa: 67, spd: 63, spe: 46},
		abilities: {0: "Refrigerate", H: "Snow Warning"},
		heightm: 1.3,
		weightkg: 25.2,
		color: "Blue",
		eggGroups: ["Monster"],

		evos: ["Aurorus"],
	},
	aurorus: {
		num: 699,
		name: "Aurorus",
		types: ["Rock", "Ice"],
		genderRatio: {M: 0.875, F: 0.125},
		baseStats: {hp: 123, atk: 77, def: 72, spa: 99, spd: 92, spe: 58},
		abilities: {0: "Refrigerate", H: "Snow Warning"},
		heightm: 2.7,
		weightkg: 225,
		color: "Blue",
		eggGroups: ["Monster"],

		otherFormes: ["Aurorus-Mega"],
		formeOrder: ["Aurorus", "Aurorus-Mega"],
		prevo: "Amaura",
		evoLevel: 39,
		evoCondition: "at night",
	},
	aurorusmega: {
		num: 699,
		name: "Aurorus-Mega",
		
		baseSpecies: "Aurorus",
		forme: "Mega",
		types: ["Rock", "Ice"],
		baseStats: {hp: 123, atk: 77, def: 102, spa: 129, spd: 122, spe: 68},
		abilities: {0: "Ice Age"},
		heightm: 4.0,
		weightkg: 350.0,
		color: "Blue",
		eggGroups: ["Monster"],
		requiredItem: "Aurorite",
		
	//	creator: "BlueRay",
	},
	// end

	// start
	sentinoyle: {
		num: -1083,
		name: "Sentinoyle",

		types: ["Rock", "Fairy"],
		baseStats: {hp: 112, atk: 102, def: 92, spa: 42, spd: 82, spe: 72},
		abilities: {0: "Levitate", 1: "Sturdy", H: "Dazzling"},
	//	category: "Gargoyle",
		heightm: 3.0,
		weightkg: 227.9,
		color: "Gray",

		eggGroups: ["Mineral"],

		otherFormes: ["Sentinoyle-Ascend"],
		formeOrder: ["Sentinoyle", "Sentinoyle-Ascend"],
	//	creator: "BlueRay",
	},
	sentinoyleascend: {
		num: -1083,
		name: "Sentinoyle-Ascend",
		
		baseSpecies: "Sentinoyle",
		forme: "Ascend",
		types: ["Rock", "Fairy"],
		baseStats: {hp: 112, atk: 132, def: 102, spa: 42, spd: 92, spe: 122},
		abilities: {0: "Levitate"},
		heightm: 3.0,
		weightkg: 227.9,
		color: "Gray",
		eggGroups: ["Mineral"],
		requiredItem: "Sentinoylium",
		
	//	creator: "BlueRay",
	},
    // end

	// start
	litanite: {
		num: -1084,
		name: "Litanite",
		types: ["Rock", "Psychic"],
		baseStats: {hp: 55, atk: 30, def: 55, spa: 65, spd: 55, spe: 15},
		abilities: {0: "Solid Rock", 1: "Sturdy", H: "Unburden"},
		heightm: 0.3,
		weightkg: 6.2,
		color: "White",
		eggGroups: ["Mineral"],

		evos: ["Lampite"],
	},
	lampite: {
		num: -1085,
		name: "Lampite",
		types: ["Rock", "Psychic"],
		baseStats: {hp: 70, atk: 40, def: 60, spa: 95, spd: 60, spe: 45},
		abilities: {0: "Solid Rock", 1: "Sturdy", H: "Unburden"},
		heightm: 0.6,
		weightkg: 26.0,
		color: "White",
		eggGroups: ["Mineral"],

		prevo: "Litanite",
		evoLevel: 41,
		evos: ["Channelite"],
	},
	channelite: {
		num: -1086,
		name: "Channelite",
		types: ["Rock", "Psychic"],
		baseStats: {hp: 70, atk: 55, def: 90, spa: 145, spd: 90, spe: 70},
		abilities: {0: "Solid Rock", 1: "Sturdy", H: "Unburden"},
		heightm: 1,
		weightkg: 102.9,
		color: "White",
		eggGroups: ["Mineral"],

		prevo: "Lampite",
		evoType: "useItem",
		evoItem: "Dawn Stone",
	},
	// end

	// start
	yamarunt: {
		num: -1087,
		name: "Yamarunt",

		types: ["Rock"],
		baseStats: {hp: 50, atk: 50, def: 50, spa: 50, spd: 50, spe: 50},
		abilities: {0: "Rocky Payload", H: "Stakeout"},
		heightm: 0.7,
		weightkg: 25.2,
		color: "Brown",
		evos: ["Bucketallie", "Yamalass"],
		eggGroups: ["Fairy", "Mineral"],
	},
	bucketallie: {
		num: -1088,
		name: "Bucketallie",

		types: ["Rock"],
		baseStats: {hp: 90, atk: 110, def: 80, spa: 50, spd: 80, spe: 70},
		abilities: {0: "Rocky Payload", H: "Stakeout"},
		heightm: 2.1,
		weightkg: 350.2,
		color: "Brown",

		prevo: "Yamarunt",
		evoLevel: 42,
		eggGroups: ["Fairy", "Mineral"],
	},
	yamalass: {
		num: -1089,
		name: "Yamalass",

		types: ["Rock", "Ghost"],
		gender: "F",
		baseStats: {hp: 80, atk: 50, def: 70, spa: 90, spd: 70, spe: 110},
		abilities: {0: "Illusion", H: "Fimbulvetr"},
		heightm: 1.3,
		weightkg: 31.2,
		color: "Brown",

		prevo: "Yamarunt",
		evoType: "useItem",
		evoItem: "Dusk Stone",
		eggGroups: ["Fairy", "Mineral"],
	},
	// end

	// start
	destoroyah: {
		num: -1090,
		name: "Destoroyah",

		types: ["Rock", "Flying"],
		gender: "N",
		baseStats: {hp: 97, atk: 132, def: 140, spa: 65, spd: 86, spe: 50},
		abilities: {0: "Transmutation"},
	//	category: "Kaiju",
		heightm: 16.5,
		weightkg: 725.7,
		color: "Red",
		eggGroups: ["Undiscovered"],
	//	creator: "BlueRay",
	},
    // end

	// start
	silicobra: {
		num: 843,
		name: "Silicobra",

		types: ["Ground"],
		baseStats: {hp: 52, atk: 57, def: 75, spa: 35, spd: 50, spe: 46},
		abilities: {0: "Sand Spit", 1: "Shed Skin", H: "Sand Veil"},
		heightm: 2.2,
		weightkg: 7.6,
		color: "Green",

		evos: ["Sandaconda"],
		eggGroups: ["Field", "Dragon"],
	},
	sandaconda: {
		num: 844,
		name: "Sandaconda",

		types: ["Ground"],
		baseStats: {hp: 72, atk: 107, def: 125, spa: 65, spd: 70, spe: 71},
		abilities: {0: "Sand Spit", 1: "Shed Skin", H: "Sand Veil"},
		heightm: 3.8,
		weightkg: 65.5,
		color: "Green",

		prevo: "Silicobra",
		evoLevel: 36,
		eggGroups: ["Field", "Dragon"],
		otherFormes: ["Sandaconda-Mega"],
		formeOrder: ["Sandaconda", "Sandaconda-Mega"],
	},
	sandacondamega: {
		num: 844,
		name: "Sandaconda-Mega",

		baseSpecies: "Sandaconda",
		forme: "Mega",
		types: ["Ground"],
		baseStats: {hp: 72, atk: 137, def: 155, spa: 75, spd: 85, spe: 86},
		abilities: {0: "Split System"},
		heightm: 5.6,
		weightkg: 92.1,
		color: "Green",
		eggGroups: ["Field", "Dragon"],

		requiredItem: "Sandaconite",
	},
	// end

	// start
	solgantica: {
		num: -1091,
		name: "Solgantica",

		types: ["Ground"],
		baseStats: {hp: 35, atk: 35, def: 141, spa: 125, spd: 127, spe: 77},
		abilities: {0: "Unburden", 1: "Immunity", H: "Chlorophyll"},
	//	category: "Plankton",
		heightm: 0.1,
		weightkg: 0.1,
		color: "Brown",
		eggGroups: ["Water 3", "Mineral"],

	//	creator: "BlueRay",
	},
	// end

	// start
	sandshrew: {
		num: 27,
		name: "Sandshrew",

		types: ["Ground"],
		baseStats: {hp: 50, atk: 75, def: 85, spa: 20, spd: 30, spe: 40},
		abilities: {0: "Sand Veil", 1: "Grass Pelt", H: "Sand Rush"},
		heightm: 0.6,
		weightkg: 12,
		color: "Yellow",
		eggGroups: ["Field"],

		evos: ["Sandslash"],
		otherFormes: ["Sandshrew-Alola"],
		formeOrder: ["Sandshrew", "Sandshrew-Alola"],
	},
	sandslash: {
		num: 28,
		name: "Sandslash",
		types: ["Ground"],

		baseStats: {hp: 75, atk: 100, def: 110, spa: 45, spd: 55, spe: 65},
		abilities: {0: "Sand Veil", 1: "Grass Pelt", H: "Sand Rush"},
		heightm: 1,
		weightkg: 29.5,
		color: "Yellow",
		eggGroups: ["Field"],

		evos: ["Sandirash"],
		prevo: "Sandshrew",
		evoLevel: 22,
		otherFormes: ["Sandslash-Alola"],
		formeOrder: ["Sandslash", "Sandslash-Alola"],
	},
	sandirash: {
		num: -1092,
		name: "Sandirash",
		types: ["Ground"],
		
		baseStats: {hp: 90, atk: 115, def: 125, spa: 60, spd: 70, spe: 80},
		abilities: {0: "Sand Veil", 1: "Grassy Surge", H: "Sand Rush"},
		heightm: 1.7,
		weightkg: 43.5,
		color: "Yellow",
		eggGroups: ["Field"],

		prevo: "Sandslash",
		evoLevel: 47,
	},
	// end

	// start
	dustform: {
		num: -1093,
		name: "Dustform",
		types: ["Ground"],
		baseStats: {hp: 105, atk: 35, def: 70, spa: 105, spd: 70, spe: 35},
		abilities: {0: "Desert Mirage", H: "Sand Force"},
		heightm: 0.3,
		weightkg: 0.8,
		color: "Brown",
		eggGroups: ["Fairy", "Amorphous"],

		otherFormes: ["Dustform-Sunny", "Dustform-Rainy", "Dustform-Snowy", "Dustform-Sandy"],
		formeOrder: ["Dustform", "Dustform-Sunny", "Dustform-Rainy", "Dustform-Snowy", "Dustform-Sandy"],
	},
	dustformsunny: {
		num: -1093,
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

		requiredAbility: "Forecast",
		battleOnly: "Dustform",
	},
	dustformrainy: {
		num: -1093,
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

		requiredAbility: "Forecast",
		battleOnly: "Dustform",
	},
	dustformsnowy: {
		num: -1093,
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

		requiredAbility: "Forecast",
		battleOnly: "Dustform",
	},
	dustformsandy: {
		num: -1093,
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

		requiredAbility: "Forecast",
		battleOnly: "Dustform",
	},
	// end

	// start
	baragon: {
		num: -1094,
		name: "Baragon",

		types: ["Ground"],
		gender: "N",
		baseStats: {hp: 115, atk: 102, def: 87, spa: 95, spd: 100, spe: 71},
		abilities: {0: "Metamorphosis"},
	//	category: "Kaiju",
		heightm: 12.5,
		weightkg: 550.0,
		color: "Brown",
		eggGroups: ["Undiscovered"],
	//	creator: "BlueRay",
	},
    // end

	// start
	anguirus: {
		num: -1095,
		name: "Anguirus",

		types: ["Ground", "Ice"],
		gender: "N",
		baseStats: {hp: 130, atk: 95, def: 140, spa: 55, spd: 75, spe: 75},
		abilities: {0: "Transmutation"},
	//	category: "Kaiju",
		heightm: 20.3,
		weightkg: 660.9,
		color: "Brown",
		eggGroups: ["Undiscovered"],
	//	creator: "BlueRay",
	},
    // end

	// start
	falinkshaunted: {
		num: -1096,
		name: "Falinks-Haunted",

		types: ["Fighting", "Ghost"],
		gender: "N",
		baseStats: {hp: 65, atk: 100, def: 100, spa: 70, spd: 60, spe: 75},
		abilities: {0: "Battle Armor", 1: "Swift Swim", H: "Defiant"},
		heightm: 3,
		weightkg: 62,
		color: "Green",
		eggGroups: ["Fairy", "Mineral"],
	},
	// end

	// start
	chiwengard0: {
		num: -1097,
		name: "Chiwengard-0",

		types: ["Fighting", "Dragon"],
		baseStats: {hp: 76, atk: 54, def: 58, spa: 53, spd: 50, spe: 40},
		abilities: {0: "Counterbalance"},
		heightm: 2.5,
		weightkg: 111.0,
		color: "Gray",
		eggGroups: ["Mineral", "Dragon"],

		evos: ["Chiwengard"],
		//	creator: "BlueRay",
	},
	chiwengard: {
		num: -1098,
		name: "Chiwengard",

		types: ["Fighting", "Dragon"],
		baseStats: {hp: 111, atk: 99, def: 93, spa: 88, spd: 85, spe: 55},
		abilities: {0: "Counterbalance"},
		heightm: 7.5,
		weightkg: 440.0,
		color: "Gray",
		eggGroups: ["Mineral", "Dragon"],

		otherFormes: ["Chiwengard-Ascend"],
		formeOrder: ["Chiwengard", "Chiwengard-Ascend"],
		prevo: "Chiwengard-0",
		evoLevel: 50,
		//	creator: "BlueRay",
	},
	chiwengardascend: {
		num: -1098,
		name: "Chiwengard-Ascend",
		baseSpecies: "Chiwengard",
		forme: "Ascend",
		types: ["Fighting", "Dragon"],
		baseStats: {hp: 111, atk: 120, def: 93, spa: 108, spd: 85, spe: 114},
		abilities: {0: "Counterbalance"},
		heightm: 7.5,
		weightkg: 440.0,
		color: "Gray",
		eggGroups: ["Mineral", "Dragon"],
		requiredItem: "Chiwengardium",
	},
	// end

	// start
	kingkong: {
		num: -1099,
		name: "King Kong",

		types: ["Fighting"],
		gender: "N",
		baseStats: {hp: 110, atk: 140, def: 80, spa: 40, spd: 110, spe: 90},
		abilities: {0: "Metamorphosis"},
	//	category: "Kaiju",
		heightm: 18.2,
		weightkg: 754.2,
		color: "Brown",
		eggGroups: ["Undiscovered"],
	//	creator: "BlueRay",
	},
    // end

	// start
	urxarigi: {
		num: -1100,
		name: "Urxarigi",

		types: ["Fighting"],
		gender: "N",
		baseStats: {hp: 168, atk: 100, def: 145, spa: 132, spd: 60, spe: 75},
		abilities: {0: "Cosmic Pull"},
	//	category: "Cosmic Street",
		heightm: 15.5,
		weightkg: 515.0,
		color: "White",
		tags: ["Restricted Legendary"],
		eggGroups: ["Undiscovered"],

	//	creator: "BlueRay",
	},
	// end

	// start
	hoothoot: {
		num: 163,
		name: "Hoothoot",
		types: ["Normal", "Flying"],
		baseStats: {hp: 60, atk: 30, def: 30, spa: 36, spd: 56, spe: 50},
		abilities: {0: "Insomnia", 1: "Keen Eye", H: "Tinted Lens"},
		heightm: 0.7,
		weightkg: 21.2,
		color: "Brown",
		eggGroups: ["Flying"],

		evos: ["Noctowl"],
	},
	noctowl: {
		num: 164,
		name: "Noctowl",

		types: ["Normal", "Flying"],
		baseStats: {hp: 100, atk: 50, def: 50, spa: 86, spd: 96, spe: 70},
		abilities: {0: "Insomnia", 1: "Keen Eye", H: "Tinted Lens"},
		heightm: 1.6,
		weightkg: 40.8,
		color: "Brown",
		eggGroups: ["Flying"],

		prevo: "Hoothoot",
		evoLevel: 20,
		otherFormes: ["Noctowl-Mega"],
		formeOrder: ["Noctowl", "Noctowl-Mega"],
	},
	noctowlmega: {
		num: 164,
		name: "Noctowl-Mega",

		baseSpecies: "Noctowl",
		forme: "Mega",
		types: ["Normal", "Flying"],
		baseStats: {hp: 100, atk: 50, def: 70, spa: 126, spd: 116, spe: 90},
		abilities: {0: "Endless Dream"},
		heightm: 1.6,
		weightkg: 40.8,
		color: "Brown",
		eggGroups: ["Flying"],

		requiredItem: "Noctowlite",
	},
	// end

	// start
	deerling: {
		num: 585,
		name: "Deerling",

		baseForme: "Spring",
		types: ["Normal", "Grass"],
		baseStats: {hp: 60, atk: 60, def: 50, spa: 40, spd: 50, spe: 75},
		abilities: {0: "Chlorophyll", 1: "Sap Sipper", H: "Serene Grace"},
		heightm: 0.6,
		weightkg: 19.5,
		color: "Pink",
		eggGroups: ["Field"],

		evos: ["Sawsbuck"],
		cosmeticFormes: ["Deerling-Summer", "Deerling-Autumn", "Deerling-Winter"],
		formeOrder: ["Deerling", "Deerling-Summer", "Deerling-Autumn", "Deerling-Winter"],
	},
	sawsbuck: {
		inherit: true,
		otherFormes: ["Sawsbuck-Mega", "Sawsbuck-Summer-Mega", "Sawsbuck-Autumn-Mega", "Sawsbuck-Winter-Mega"],
		formeOrder: ["Sawsbuck", "Sawsbuck-Summer", "Sawsbuck-Autumn", "Sawsbuck-Winter", "Sawsbuck-Mega", "Sawsbuck-Summer-Mega", "Sawsbuck-Autumn-Mega", "Sawsbuck-Winter-Mega"],
	},
	sawsbuckmega: {
		num: 586,
		name: "Sawsbuck-Mega",

		baseSpecies: "Sawsbuck",
		forme: "Mega",
		types: ["Fire", "Grass"],
		baseStats: {hp: 80, atk: 140, def: 90, spa: 60, spd: 90, spe: 115},
		abilities: {0: "Seed Sower"},
		heightm: 1.9,
		weightkg: 92.5,
		color: "Brown",
		eggGroups: ["Field"],

		requiredItem: "Sawsbuckite",
	//	creator: "BlueRay",
	},
	sawsbucksummermega: {
		num: 586,
		name: "Sawsbuck-Summer-Mega",
		baseSpecies: "Sawsbuck",
		forme: "Mega-Summer",
		types: ["Water", "Grass"],
		baseStats: {hp: 80, atk: 140, def: 90, spa: 60, spd: 90, spe: 115},
		abilities: {0: "Purifying Salt"},
		heightm: 1.9,
		weightkg: 92.5,
		color: "Brown",
		eggGroups: ["Field"],

		requiredItem: "Sawsbuckite",
		battleOnly: "Sawsbuck-Summer",
	//	creator: "BlueRay",
	},
	sawsbuckautumnmega: {
		num: 586,
		name: "Sawsbuck-Autumn-Mega",
		baseSpecies: "Sawsbuck",
		forme: "Mega-Autumn",
		types: ["Electric", "Grass"],
		baseStats: {hp: 80, atk: 140, def: 90, spa: 60, spd: 90, spe: 115},
		abilities: {0: "Tempestuous"},
		heightm: 1.9,
		weightkg: 92.5,
		color: "Brown",
		eggGroups: ["Field"],

		requiredItem: "Sawsbuckite",
		battleOnly: "Sawsbuck-Autumn",
	//	creator: "BlueRay",
	},
	sawsbuckwintermega: {
		num: 586,
		name: "Sawsbuck-Winter-Mega",

		baseSpecies: "Sawsbuck",
		forme: "Mega-Winter",
		types: ["Ice", "Grass"],
		baseStats: {hp: 80, atk: 140, def: 90, spa: 60, spd: 90, spe: 115},
		abilities: {0: "Wind Rider"},
		heightm: 1.9,
		weightkg: 92.5,
		color: "Brown",
		eggGroups: ["Field"],

		requiredItem: "Sawsbuckite",
		battleOnly: "Sawsbuck-Winter",
	//	creator: "BlueRay",
	},
	// end

	// start
	pharmacol0: {
		num: -1101,
		name: "Pharmacol-0",

		types: ["Normal", "Bug"],
		baseStats: {hp: 30, atk: 41, def: 78, spa: 21, spd: 68, spe: 23},
		abilities: {0: "Adaptability", 1: "Color Change", H: "Color Spray"},
		heightm: 0.7,
		weightkg: 6.9,
		color: "Green",
		eggGroups: ["Bug"],

		evos: ["Pharmacol"],
		//	creator: "BlueRay",
	},
	pharmacol: {
		num: -1102,
		name: "Pharmacol",

		types: ["Normal", "Bug"],
		baseStats: {hp: 60, atk: 71, def: 128, spa: 41, spd: 118, spe: 33},
		abilities: {0: "Adaptability", 1: "Color Change", H: "Color Spray"},
		heightm: 1.0,
		weightkg: 13.0,
		color: "Green",
		eggGroups: ["Bug"],

		prevo: "Pharmacol-0",
		evoLevel: 19,
		//	creator: "BlueRay",
	},
	// end

	// start
	scryminsker0: {
		num: -1103,
		name: "Scryminsker-0",

		types: ["Normal", "Psychic"],
		baseStats: {hp: 33, atk: 58, def: 36, spa: 23, spd: 51, spe: 78},
		abilities: {0: "Strong Jaw", 1: "Anticipation", H: "Myomancy"},
		heightm: 0.7,
		weightkg: 6.9,
		color: "Brown",
		eggGroups: ["Field"],

		evos: ["Scryminsker"],
		//	creator: "BlueRay",
	},
	scryminsker: {
		num: -1104,
		name: "Scryminsker",

		types: ["Normal", "Psychic"],
		baseStats: {hp: 63, atk: 108, def: 56, spa: 43, spd: 81, spe: 118},
		abilities: {0: "Strong Jaw", 1: "Anticipation", H: "Myomancy"},
		heightm: 1.0,
		weightkg: 13.0,
		color: "Brown",
		eggGroups: ["Bug"],

		prevo: "Scryminsker-0",
		evoLevel: 23,
		//	creator: "BlueRay",
	},
	// end

	// start
	komala: {
		num: 775,
		name: "Komala",

		types: ["Normal"],
		baseStats: {hp: 65, atk: 115, def: 65, spa: 75, spd: 95, spe: 65},
		abilities: {0: "Comatose"},
		heightm: 0.4,
		weightkg: 19.9,
		color: "Blue",
		eggGroups: ["Field"],

		evos: ["Oobamala"],
	},
	oobamala: {
		num: -1105,
		name: "Oobamala",

		types: ["Normal", "Ghost"],
		baseStats: {hp: 105, atk: 125, def: 75, spa: 85, spd: 105, spe: 45},
		abilities: {0: "Comatose"},
		heightm: 1.6,
		weightkg: 79.6,
		color: "Blue",
		eggGroups: ["Field"],

		prevo: "Komala",
		evoLevel: 41,
	},
	// end

	// start
	ditto: {
		num: 132,
		name: "Ditto",

		types: ["Normal"],
		gender: "N",
		baseStats: {hp: 48, atk: 48, def: 48, spa: 48, spd: 48, spe: 48},
		abilities: {0: "Limber", 1: "Sticky Hold", H: "Imposter"},
		heightm: 0.3,
		weightkg: 4,
		color: "Purple",
		eggGroups: ["Ditto"],

		evos: ["Dittobolo"],
	},
	dittobolo: {
		num: -1106,
		name: "Dittobolo",

		types: ["Normal"],
		gender: "N",
		baseStats: {hp: 96, atk: 96, def: 72, spa: 96, spd: 72, spe: 48},
		abilities: {0: "Limber", 1: "Sticky Hold", H: "Dittobolic"},
		heightm: 1.2,
		weightkg: 16.0,
		color: "Purple",
		eggGroups: ["Ditto"],

		prevo: "Ditto",
		evoType: "other",
		evoCondition: "no PP left",
	},
	// end

	// start
	ivorydroid: {
		num: -1107,
		name: "Ivory Droid",

		types: ["Normal", "Fighting"],
		gender: "N",
		baseStats: {hp: 66, atk: 121, def: 110, spa: 66, spd: 66, spe: 121},
		abilities: {0: "Star Force"},
	//	category: "Sync",
		heightm: 1.8,
		weightkg: 58.2,
		color: "Brown",
		eggGroups: ["Undiscovered"],

	//	creator: "BlueRay",
	},
    // end

	// start
	ibliss: {
		num: -1108,
		name: "Ibliss",
		
		types: ["Flying"],
		baseStats: {hp: 130, atk: 93, def: 100, spa: 43, spd: 75, spe: 76},
	//	category: "Wisdom",
		abilities: {0: "Stall"},
		heightm: 1.2,
		weightkg: 42.0,
		color: "White",
		eggGroups: ["Flying"],

	//	creator: "BlueRay",
	},
	// end

	// start
	chloroslink: {
		num: -1109,
		name: "Chloroslink",
		
		types: ["Flying"],
		baseStats: {hp: 36, atk: 93, def: 67, spa: 116, spd: 54, spe: 122},
	//	category: "Air Glider",
		abilities: {0: "Limber", 1: "Dry Skin", H: "Aerilate"},
		heightm: 1.2,
		weightkg: 1.0,
		color: "Green",
		eggGroups: ["Field"],

	//	creator: "BlueRay",
	},
	// end

	// start
	fulgavis0: {
		num: -1110,
		name: "Fulgavis-0",

		types: ["Flying", "Electric"],
		baseStats: {hp: 75, atk: 71, def: 65, spa: 33, spd: 65, spe: 60},
		abilities: {0: "Static", 1: "Motor Drive", H: "Electromorphosis"},
		heightm: 0.7,
		weightkg: 14.8,
		color: "Yellow",
		eggGroups: ["Flying"],

		evos: ["Fulgavis"],
	},
	fulgavis: {
		num: -1111,
		name: "Fulgavis",

		types: ["Flying", "Electric"],
		baseStats: {hp: 105, atk: 101, def: 85, spa: 53, spd: 85, spe: 80},
		abilities: {0: "Static", 1: "Motor Drive", H: "Electromorphosis"},
		heightm: 1.9,
		weightkg: 46.3,
		color: "Yellow",
		eggGroups: ["Flying"],

		prevo: "Fulgavis-0",
		evoLevel: 54,
	},
	// end

	// start
	rodan: {
		num: -1112,
		name: "Rodan",

		types: ["Flying", "Fire"],
		gender: "N",
		baseStats: {hp: 110, atk: 105, def: 95, spa: 60, spd: 70, spe: 130},
		abilities: {0: "Transmutation"},
	//	category: "Kaiju",
		heightm: 7.2,
		weightkg: 390.4,
		color: "Red",
		eggGroups: ["Undiscovered"],
	//	creator: "BlueRay",
	},
    // end

	// start
	axew: {
		num: 610,
		name: "Axew",

		types: ["Dragon"],
		baseStats: {hp: 46, atk: 87, def: 60, spa: 30, spd: 40, spe: 57},
		abilities: {0: "Rivalry", 1: "Mold Breaker", H: "Unnerve"},
		heightm: 0.6,
		weightkg: 18,
		color: "Green",
		eggGroups: ["Monster", "Dragon"],

		evos: ["Fraxure"],
	},
	fraxure: {
		num: 611,
		name: "Fraxure",

		types: ["Dragon"],
		baseStats: {hp: 66, atk: 117, def: 70, spa: 40, spd: 50, spe: 67},
		abilities: {0: "Rivalry", 1: "Mold Breaker", H: "Unnerve"},
		heightm: 1,
		weightkg: 36,
		color: "Green",
		eggGroups: ["Monster", "Dragon"],

		prevo: "Axew",
		evoLevel: 38,
		evos: ["Haxorus"],
		
	},
	haxorus: {
		num: 612,
		name: "Haxorus",

		types: ["Dragon"],
		baseStats: {hp: 76, atk: 147, def: 90, spa: 60, spd: 70, spe: 97},
		abilities: {0: "Rivalry", 1: "Mold Breaker", H: "Unnerve"},
		heightm: 1.8,
		weightkg: 105.5,
		color: "Yellow",
		eggGroups: ["Monster", "Dragon"],

		prevo: "Fraxure",
		evoLevel: 48,
		otherFormes: ["Haxorus-Mega"],
		formeOrder: ["Haxorus", "Haxorus-Mega"],
	},
	haxorusmega: {
		num: 612,
		name: "Haxorus-Mega",

		baseSpecies: "Haxorus",
		forme: "Mega",
		types: ["Dragon"],
		baseStats: {hp: 76, atk: 177, def: 130, spa: 70, spd: 90, spe: 97},
		abilities: {0: "Technician"},
		heightm: 2.2,
		weightkg: 142.0,
		color: "Yellow",
		eggGroups: ["Monster", "Dragon"],

		requiredItem: "Haxorusite",
	},
	// end

	// start
	durassat: {
		num: -1113,
		name: "Durassat",
		types: ["Dragon", "Rock"],
		baseStats: {hp: 70, atk: 95, def: 115, spa: 120, spd: 50, spe: 85},
		abilities: {0: "Solid Rock", 1: "Sand Force", H: "Solar Power"},
		heightm: 1.8,
		weightkg: 100,
		color: "Yellow",
		eggGroups: ["Mineral", "Dragon"],

		evos: ["Archaludon"],
	},
	archinvast: {
		num: -1114,
		name: "Archinvast",
		types: ["Dragon", "Rock"],

		baseStats: {hp: 90, atk: 105, def: 130, spa: 125, spd: 65, spe: 85},
		abilities: {0: "Solid Rock", 1: "Sand Force", H: "Solar Power"},
		heightm: 2,
		weightkg: 150,
		color: "Yellow",
		eggGroups: ["Mineral", "Dragon"],

		prevo: "Duraludon",
		evoType: "useItem",
		evoItem: "Sand Pillar",
	},
	// end

	// start
	ghidorah: {
		num: -1115,
		name: "Ghidorah",

		types: ["Dragon", "Electric"],
		gender: "N",
		baseStats: {hp: 140, atk: 145, def: 90, spa: 90, spd: 80, spe: 45},
		abilities: {0: "Transmutation"},
	//	category: "Kaiju",
		heightm: 15.7,
		weightkg: 876.8,
		color: "Yellow",
		eggGroups: ["Undiscovered"],
	//	creator: "BlueRay",
	},
    // end

	// start
	patrilling0: {
		num: -1116,
		name: "Patrilling-0",

		types: ["Steel", "Water"],
		baseStats: {hp: 65, atk: 78, def: 45, spa: 90, spd: 45, spe: 67},
		abilities: {0: "Swift Swim", 1: "Super Luck", H: "Regenerator"},
		heightm: 2.2,
		weightkg: 104.6,
		color: "Brown",
		eggGroups: ["Field", "Water 2"],

		evos: ["Patrilling"],
		//	creator: "BlueRay",
	},
	patrilling: {
		num: -1117,
		name: "Patrilling",

		types: ["Steel", "Water"],
		baseStats: {hp: 85, atk: 118, def: 60, spa: 110, spd: 60, spe: 87},
		abilities: {0: "Swift Swim", 1: "Super Luck", H: "Regenerator"},
		heightm: 9.4,
		weightkg: 350.0,
		color: "Brown",
		eggGroups: ["Field", "Water 2"],

		prevo: "Patrilling-0",
		evoLevel: 40,
		//	creator: "BlueRay",
	},
	// end

	// start
	roseastellarshield: {
		num: -1118,
		name: "Rosea Stellar Shield",

		types: ["Steel", "Fairy"],
		gender: "N",
		baseStats: {hp: 55, atk: 77, def: 110, spa: 121, spd: 132, spe: 55},
		abilities: {0: "Star Force"},
	//	category: "Energy Shield",
		heightm: 1.0,
		weightkg: 23.0,
		color: "Pink",
		eggGroups: ["Undiscovered"],

	//	creator: "BlueRay",
	},
    // end

	// start
	gigan: {
		num: -1119,
		name: "Gigan",

		types: ["Steel", "Dark"],
		gender: "N",
		baseStats: {hp: 110, atk: 123, def: 83, spa: 91, spd: 95, spe: 98},
		abilities: {0: "Split System"},
	//	category: "Kaiju",
		heightm: 6.5,
		weightkg: 272.4,
		color: "Black",
		eggGroups: ["Undiscovered"],
	//  Mythical
	//	creator: "BlueRay",
	},
    // end

	// start
	zubat: {
		num: 41,
		name: "Zubat",

		types: ["Poison", "Flying"],
		baseStats: {hp: 40, atk: 45, def: 35, spa: 30, spd: 40, spe: 55},
		abilities: {0: "Inner Focus", H: "Infiltrator"},
	//	movepoolDeletions: ["frustration", "hiddenpower", "return"],
	//	category: "Bat",
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
	//	movepoolDeletions: ["frustration", "hiddenpower", "return"],
	//	category: "Bat",
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
		baseStats: {hp: 85, atk: 90, def: 80, spa: 70, spd: 80, spe: 130},
		abilities: {0: "Inner Focus", H: "Infiltrator"},
	//	movepoolDeletions: ["frustration", "hiddenpower", "return"],
	//	category: "Bat",
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
		baseStats: {hp: 85, atk: 120, def: 95, spa: 90, spd: 95, spe: 150},
	//	category: "Bat",
		abilities: {0: "Vampirism"},
		heightm: 2.0,
		weightkg: 82.5,
		color: "Purple",
		eggGroups: ["Flying"],
		requiredItem: "Crobatite",
		
	//	creator: "BlueRay",
	},
	// end

	// start
	skrelp: {
		num: 690,
		name: "Skrelp",
		
		types: ["Poison", "Water"],
		baseStats: {hp: 50, atk: 60, def: 60, spa: 60, spd: 60, spe: 30},
	//	category: "Mock Kelp",
		abilities: {0: "Poison Point", 1: "Poison Touch", H: "Adaptability"},
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
	//	category: "Mock Kelp",
		abilities: {0: "Poison Point", 1: "Poison Touch", H: "Adaptability"},
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
	//	category: "Mock Kelp",
		abilities: {0: "Acidic Surge"},
		heightm: 2.7,
		weightkg: 121.5,
		color: "Brown",
		eggGroups: ["Water 1", "Dragon"],
		requiredItem: "Dragalgite",
		
	//	creator: "BlueRay",
	},
	// end

	// start
	toxicroak: {
		inherit: true,
		evos: ["Mycecroak"],
	},
	mycecroak: {
		num: -1120,
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
	hedorah: {
		num: -1121,
		name: "Hedorah",

		types: ["Poison"],
		gender: "N",
		baseStats: {hp: 223, atk: 73, def: 83, spa: 73, spd: 53, spe: 65},
		abilities: {0: "Transmutation"},
	//	category: "Kaiju",
		heightm: 12.0,
		weightkg: 480.0,
		color: "Gray",
		eggGroups: ["Undiscovered"],
	//	creator: "BlueRay",
	},
    // end

	// start
	godzilla: {
		num: -1122,
		name: "Godzilla",

		types: ["Poison", "Water"],
		gender: "N",
		baseStats: {hp: 170, atk: 125, def: 65, spa: 90, spd: 55, spe: 85},
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
	abyssalure0: {
		num: -1123,
		name: "Abyssalure-0",

		types: ["Dark"],
		baseStats: {hp: 75, atk: 70, def: 40, spa: 30, spd: 70, spe: 60},
		abilities: {0: "Water Bubble", 1: "Volt Absorb", H: "Unburden"},
		heightm: 1.1,
		weightkg: 32.0,
		color: "Red",
		eggGroups: ["Water 3"],

		evos: ["Abyssalure"],
	},
	abyssalure: {
		num: -1124,
		name: "Abyssalure",

		types: ["Dark"],
		baseStats: {hp: 120, atk: 90, def: 60, spa: 50, spd: 90, spe: 80},
		abilities: {0: "Water Bubble", 1: "Volt Absorb", H: "Unburden"},
		heightm: 2.1,
		weightkg: 134.0,
		color: "Red",
		eggGroups: ["Water 3"],

		prevo: "Abyssalure-0",
		evoLevel: 35,
	},
	// end

	// start
	grinsegrin: {
		num: -1125,
		name: "Grinsegrin",

		types: ["Dark", "Electric"],
		baseStats: {hp: 82, atk: 53, def: 70, spa: 88, spd: 75, spe: 114},
		abilities: {0: "Rattled", 1: "Static", H: "Motor Drive"},
		heightm: 0.9,
		weightkg: 32.7,
		color: "Yellow",
		eggGroups: ["Field"],
		otherFormes: ["Grinsegrin-Alternate"],
		formeOrder: ["Grinsegrin", "Grinsegrin-Alternate"],
	},
	grinsegrinalternate: {
		num: -1125,
		name: "Grinsegrin-Alternate",

		baseSpecies: "Grinsegrin",
		forme: "Alternate",
		types: ["Ghost", "Electric"],
		baseStats: {hp: 82, atk: 53, def: 70, spa: 88, spd: 75, spe: 114},
		abilities: {0: "Rattled", 1: "Static", H: "Motor Drive"},
		heightm: 0.9,
		weightkg: 32.7,
		color: "Yellow",
		eggGroups: ["Field"],

		battleOnly: "Grinsegrin",
	},
	// end

	// start
	mightyena: {
		inherit: true,
		evos: ["Alyena"],
	},
	alyena: {
		num: -1126,
		name: "Alyena",
		
		types: ["Dark", "Psychic"],
		baseStats: {hp: 90, atk: 110, def: 90, spa: 70, spd: 70, spe: 90},
		abilities: {0: "Intimidate", 1: "Quick Feet", H: "Moxie"},
		heightm: 1.6,
		weightkg: 52.4,
		color: "Black",
		eggGroups: ["Field"],
		
		prevo: "Mightyena",
		evoType: "levelHold",
		evoItem: "Black Glasses",
	},
	// end

	// start
	malamar: {
		inherit: true,
		evos: ["Cthulauder"],
	},
	cthulauder: {
		num: -1127,
		name: "Cthulauder",
		
		types: ["Dark", "Psychic"],
		baseStats: {hp: 119, atk: 134, def: 88, spa: 99, spd: 57, spe: 45},
		abilities: {0: "Contrary", 1: "Costar", H: "Withering Glare"},
		heightm: 3.4,
		weightkg: 97.5,
		color: "Blue",
		eggGroups: ["Water 1", "Water 3"],
		
		prevo: "Malamar",
		evoLevel: 60,
	},
	// end

	// start
	nottingrat0: {
		num: -1128,
		name: "Nottingrat-0",

		types: ["Normal", "Poison"],
		baseStats: {hp: 55, atk: 51, def: 35, spa: 40, spd: 45, spe: 57},
		abilities: {0: "Rattled"},
	//	category: "Street Rat",
		heightm: 0.3,
		weightkg: 4.0,
		color: "White",
		eggGroups: ["Field"],

		evos: ["Nottingrat"],
	//	creator: "BlueRay",
	},
	nottingrat: {
		num: -1129,
		name: "Nottingrat",

		types: ["Normal", "Poison"],
		baseStats: {hp: 95, atk: 91, def: 65, spa: 60, spd: 75, spe: 87},
		abilities: {0: "Parental Bond"},
	//	category: "Knotted Rat",
		heightm: 0.9,
		weightkg: 44.0,
		color: "White",
		eggGroups: ["Field"],

		prevo: "Nottingrat-0",
		evoLevel: 23,
	//	creator: "BlueRay",
	},
	// end

	// start
	/*megalos: {
		num: -1130,
		name: "Megalos",

		types: ["Normal", "Bug"],
		gender: "N",
		baseStats: {hp: 105, atk: 155, def: 120, spa: 65, spd: 70, spe: 85},
		abilities: {0: "Water Veil"},
	//	category: "Kaiju",
		heightm: 5.5,
		weightkg: 440.9,
		color: "Green",
		eggGroups: ["Undiscovered"],
	//  Mythical
	//	creator: "BlueRay",
	},*/
    // end

	// start
	chronosensis: {
		num: -1131,
		name: "Chronosensis",

		types: ["Ground", "Rock"],
		gender: "N",
		baseStats: {hp: 60, atk: 120, def: 60, spa: 120, spd: 60, spe: 60},
		abilities: {0: "Rewind"},
	//	category: "Passage of Time",
		heightm: 1.2,
		weightkg: 60.0,
		color: "Brown",
		eggGroups: ["Mineral"],
		otherFormes: ["Chronosensis-Alternate"],
		formeOrder: ["Chronosensis", "Chronosensis-Alternate"],
	//	creator: "BlueRay",
	},
	chronosensisalternate: {
		num: -1131,
		name: "Chronosensis-Alternate",

		baseSpecies: "Chronosensis",
		forme: "Alternate",
		types: ["Ground", "Rock"],
		baseStats: {hp: 60, atk: 60, def: 120, spa: 60, spd: 120, spe: 60},
		abilities: {0: "Rewind"},
		heightm: 1.2,
		weightkg: 60.0,
		color: "Brown",
		eggGroups: ["Mineral"],

		battleOnly: "Chronosensis",
	},
    // end

	// changes
	// start
	flareon: {
		inherit: true,
		abilities: {0: "Flash Fire", 1: "Flame Body", H: "Guts"},
	},
	jolteon: {
		inherit: true,
		abilities: {0: "Volt Absorb", 1: "Tempestuous", H: "Quick Feet"},
	},
	vaporeon: {
		inherit: true,
		abilities: {0: "Water Absorb", 1: "Misty Surge", H: "Hydration"},
	},
	espeon: {
		inherit: true,
		abilities: {0: "Synchronize", 1: "Solar Power", H: "Magic Bounce"},
	},
	glaceon: {
		inherit: true,
		abilities: {0: "Snow Cloak", 1: "Clear Body", H: "Ice Body"},
	},
	leafeon: {
		inherit: true,
		abilities: {0: "Leaf Guard", 1: "Sharpness", H: "Chlorophyll"},
	},
	sylveon: {
		inherit: true,
		abilities: {0: "Cute Charm", 1: "Wonder Skin", H: "Pixilate"},
	},
	// end

	// start
	delibird: {
		inherit: true,
		abilities: {0: "Soothing Gift", 1: "Hustle", H: "Insomnia"},
	},
	//

	// start
	tynamo: {
		inherit: true,
		abilities: {0: "Levitate", H: "Surge Surfer"},
	},
	eelektrik: {
		inherit: true,
		abilities: {0: "Levitate", H: "Surge Surfer"},
	},
	eelektross: {
		inherit: true,
		abilities: {0: "Levitate", H: "Surge Surfer"},
	},
	// end

	// start
	turtonator: {
		inherit: true,
		abilities: {0: "Shell Armor", 1: "White Smoke", H: "Neutralizing Gas"},
	},
	// end

	// start
	flygon: {
		inherit: true,
		abilities: {0: "Levitate", 1: "Coordination", H: "Tinted Lens"},
	},
	// end

	// start
	dusknoir: {
		inherit: true,
		abilities: {0: "Pressure", 1: "Curse Energy", H: "Frisk"},
	},
	// end

	// start
	florges: {
		inherit: true,
		abilities: {0: "Flower Veil", 1: "Fortify", H: "Symbiosis"},
	},
	// end
};
