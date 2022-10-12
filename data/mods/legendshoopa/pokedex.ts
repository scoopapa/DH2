export const Pokedex: {[k: string]: ModdedSpeciesData} = {
	/*
	name: {
		inherit: true,
		otherFormes: [""],
		formeOrder: [""],
	},

	name: {
		num: -x,
		name: "Name",
		baseSpecies: "",
		forme: "",
		evos: [""],
		types: [""],
		baseStats: {hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0},
		abilities: {0: ""},
		weightkg: ,
		prevo: "",
	},
	*/

	larvitar: {
		inherit: true,
		evos: ["Pupitar", "Pupitar-Hoenn"],
	},

	pupitar: {
		inherit: true,
		otherFormes: ["Pupitar-Hoenn"],
		formeOrder: ["Pupitar", "Pupitar-Hoenn"],
	},

	pupitarhoenn: {
		num: 247,
		name: "Pupitar-Hoenn",
		baseSpecies: "Pupitar",
		forme: "Hoenn",
		evos: ["Tyranitar-Hoenn"],
		types: ["Fire" , "Rock"],
		baseStats: {hp: 70, atk: 84, def: 70, spa: 65, spd: 70, spe: 51},
		abilities: {0: "Magma Armor"},
		weightkg: 188,
		prevo: "Larvitar",
	},

	tyranitar: {
		inherit: true,
		otherFormes: ["Tyranitar-Hoenn"],
		formeOrder: ["Tyranitar", "Tyranitar-Hoenn"],
	},

	tyranitarhoenn: {
		num: 248,
		name: "Tyranitar-Hoenn",
		baseSpecies: "Tyranitar",
		forme: "Hoenn",
		types: ["Fire", "Rock"],
		baseStats: {hp: 100, atk: 124, def: 110, spa: 85, spd: 80, spe: 91},
		abilities: {0: "Grassy Surge", H: "Ripen"},
		weightkg: 408,
		prevo: "Pupitar-Hoenn",
	},

	slugma: {
		inherit: true,
		evos: ["Magcargo", "Magcargo-Hoenn"],
	},

	magcargo: {
		inherit: true,
		otherFormes: ["Magcargo-Hoenn"],
		formeOrder: ["Magcargo", "Magcargo-Hoenn"],
	},

	magcargohoenn: {
		num: 219,
		name: "Magcargo-Hoenn",
		baseSpecies: "Magcargo",
		forme: "Hoenn",
		types: ["Steel", "Ghost"],
		baseStats: {hp: 70, atk: 50, def: 90, spa: 90, spd: 120, spe: 10},
		abilities: {0: "Magma Armor", 1: "Mirror Armor", H: "Shell Armor"},
		weightkg: 55,
		prevo: "Slugma",
	},

	gloom: {
		inherit: true,
		evos: ["Bellossom", "Bellossom-Hoenn"],
	},

	bellossom: {
		inherit: true,
		otherFormes: ["Bellossom-Hoenn"],
		formeOrder: ["Bellossom", "Bellossom-Hoenn"],
	},

	bellossomhoenn: {
		num: 182,
		name: "Bellossom-Hoenn",
		baseSpecies: "Bellossom",
		forme: "Hoenn",
		types: ["Grass", "Fire"],
		baseStats: {hp: 85, atk: 60, def: 75, spa: 100, spd: 90, spe: 80},
		abilities: {0: "Chlorophyll", H: "Remaining Hope"},
		weightkg: 5.8,
		prevo: "Gloom",
	},

	gastly: {
		inherit: true,
		otherFormes: ["Gastly-Hoenn"],
		formeOrder: ["Gastly", "Gastly-Hoenn"],
	},

	gastlyhoenn: {
		num: 92,
		name: "Gastly-Hoenn",
		baseSpecies: "Gastly",
		forme: "Hoenn",
		evos: ["Haunter-Hoenn"],
		types: ["Ghost", "Water"],
		baseStats: {hp: 30, atk: 35, def: 30, spa: 90, spd: 35, spe: 90},
		abilities: {0: "Levitate"},
		weightkg: 0.1,
	},

	haunter: {
		inherit: true,
		otherFormes: ["Haunter-Hoenn"],
		formeOrder: ["Haunter", "Haunter-Hoenn"],
	},

	haunterhoenn: {
		num: 93,
		name: "Haunter-Hoenn",
		baseSpecies: "Haunter",
		forme: "Hoenn",
		evos: ["Spectrosphere"],
		types: ["Ghost", "Water"],
		baseStats: {hp: 45, atk: 50, def: 45, spa: 95, spd: 55, spe: 115},
		abilities: {0: "Hydration"},
		weightkg: 0.3,
		prevo: "Gastly-Hoenn",
	},

	spectrosphere: {
		num: -100,
		name: "Spectrosphere",
		types: ["Ghost", "Electric"],
		baseStats: {hp: 75, atk: 65, def: 60, spa: 100, spd: 80, spe: 120},
		abilities: {0: "Hydration"},
		weightkg: 10,
		prevo: "Haunter-Hoenn",
	},

	smoochum: {
		inherit: true,
		evos: ["Jynx", "Jynx-Hoenn"],
	},

	jynx: {
		inherit: true,
		otherFormes: ["Jynx-Hoenn"],
		formeOrder: ["Jynx", "Jynx-Hoenn"],
	},

	jynxhoenn: {
		num: 124,
		name: "Jynx-Hoenn",
		baseSpecies: "Jynx",
		forme: "Hoenn",
		types: ["Ice", "Water"],
		baseStats: {hp: 65, atk: 50, def: 45, spa: 115, spd: 85, spe: 95},
		abilities: {0: "Oblivious", 1: "Sirene Voice", H: "Rain Dish"},
		weightkg: 40.6,
		prevo: "Smoochum",
	},

	girafarig: {
		inherit: true,
		otherFormes: ["Girafarig-Hoenn"],
		formeOrder: ["Girafarig", "Girafarig-Hoenn"],
	},

	girafarighoenn: {
		num: 203,
		name: "Girafarig-Hoenn",
		baseSpecies: "Girafarig",
		forme: "Hoenn",
		evos: ["Girafgiraf"],
		types: ["Psychic", "Dark"],
		baseStats: {hp: 70, atk: 80, def: 65, spa: 90, spd: 65, spe: 85},
		abilities: {0: "Strong Jaw", 1: "Inner Focus", H: "Two-Headed"},
		weightkg: 41.5,
	},

	girafgiraf: {
		num: -101,
		name: "Girafgiraf",
		types: ["Psychic", "Ghost"],
		baseStats: {hp: 80, atk: 95, def: 70, spa: 95, spd: 70, spe: 95},
		abilities: {0: "Strong Jaw", 1: "Inner Focus", H: "Two-Headed"},
		weightkg: 51.51,
		prevo: "Girafarig-Hoenn",
	},

	venusaur: {
		inherit: true,
		otherFormes: ["Venusaur-Hoenn"],
		formeOrder: ["Venusaur", "Venusaur-Hoenn"],
	},

	venusaurhoenn: {
		num: 3,
		name: "Venusaur-Hoenn",
		baseSpecies: "Venusaur",
		forme: "Hoenn",
		types: ["Grass", "Psychic"],
		baseStats: {hp: 80, atk: 72, def: 78, spa: 90, spd: 95, spe: 110},
		abilities: {0: "Overgrow", H: "Dream Therapy"},
		weightkg: 90,
		prevo: "Ivysaur",
	},

	delphox: {
		inherit: true,
		otherFormes: ["Delphox-Hoenn"],
		formeOrder: ["Delphox", "Delphox-Hoenn"],
	},

	delphoxhoenn: {
		num: 655,
		name: "Delphox-Hoenn",
		baseSpecies: "Delphox",
		forme: "Hoenn",
		types: ["Fire", "Rock"],
		baseStats: {hp: 81, atk: 64, def: 100, spa: 110, spd: 78, spe: 101},
		abilities: {0: "Blaze", H: "Magician"},
		weightkg: 80,
		prevo: "Braixen",
	},

	feraligatr: {
		inherit: true,
		otherFormes: ["Feraligatr-Hoenn"],
		formeOrder: ["Feraligatr", "Feraligatr-Hoenn"],
	},

	feraligatrhoenn: {
		num: 160,
		name: "Feraligatr-Hoenn",
		baseSpecies: "Feraligatr",
		forme: "Hoenn",
		types: ["Water", "Steel"],
		baseStats: {hp: 95, atk: 110, def: 105, spa: 69, spd: 93, spe: 58},
		abilities: {0: "Torrent", H: "Water Veil"},
		weightkg: 888.8,
		prevo: "Croconaw",
	},

	crustle: {
		inherit: true,
		evos: ["Crusteroid"],
	},
	crusteroid: {
		name: "Crusteroid",
		copyData: "Crustle",

		baseStats: {hp: 110, atk: 115, def: 140, spa: 60, spd: 85, spe: 25},
		abilities: {0: "Sturdy", 1: "Weak Armor", H: "Force of Gravity"},
		movepoolAdditions: [
			"focusblast", "gigaimpact", "gravity", "heatcrash", "hyperbeam", "moonblast", "moonlight", "pinmissile", "powergem", "spikes", "taunt", "trickroom"
		],
		weightkg: 700,

		prevo: "Crustle",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		// creator: "zxgzxg",
	},

	tropius: {
		inherit: true,
		evos: ["Cornutropia"],
	},
	cornutropia: {
		name: "Cornutropia",
		copyData: "Tropius",

		types: ["Grass", "Dragon"],
		baseStats: {hp: 104, atk: 98, def: 83, spa: 92, spd: 87, spe: 71},
		abilities: {0: "Ripen", 1: "Solar Power", H: "Harvest"},
		movepoolAdditions: [
			"appleacid", "aromatherapy", "belch", "berryblast", "breakingswipe", "dracometeor", "dragontail", "grassyterrain", "gravapple", "irontail", "junglehealing",
			"pollenpuff", "spitup", "stockpile", "swallow", "woodhammer"
		],
		heightm: 9.4,
		weightkg: 870,

		prevo: "Tropius",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		// creator: "AquaticPanic",
	},

	tranquill: {
		inherit: true,
		evos: ["Unfezant", "Dovinity", "Dovinity-F"],
	},
	dovinity: {
		name: "Dovinity",
		copyData: "Tranquill",
		baseForme: "M",
		gender: "M",

		types: ["Fairy", "Flying"],
		baseStats: {hp: 90, atk: 50, def: 60, spa: 105, spd: 85, spe: 98},
		abilities: {0: "Big Pecks", 1: "Super Luck", H: "Technician"},
		movepoolAdditions: [
			"bravebird", "dazzlinggleam", "disarmingvoice", "drainingkiss", "fairywind", "fling", "gigaimpact", "hurricane", "hyperbeam", "moonlight",
			"playrough", "postdelivery", "skydrop", "takeheart", "trick"
		],
		heightm: 1.4,
		weightkg: 34,

		prevo: "Tranquill",
		otherFormes: ["Dovinity-F"],
		formeOrder: ["Dovinity", "Dovinity-F"],
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		otherFormes: ["Dovinity-F"],
		formeOrder: ["Dovinity", "Dovinity-F"],
		// creator: "AquaticPanic",
	},
	dovinityf: {
		name: "Dovinity-F",
		copyData: "Tranquill",
		baseSpecies: "Dovinity",
		forme: "F",
		gender: "F",

		types: ["Fairy", "Flying"],
		baseStats: {hp: 90, atk: 105, def: 80, spa: 55, spd: 55, spe: 103},
		abilities: {0: "Big Pecks", 1: "Super Luck", H: "Fluffy"},
		movepoolAdditions: [
			"bravebird", "dazzlinggleam", "disarmingvoice", "drainingkiss", "fairywind", "fling", "gigaimpact", "heartstamp", "hurricane", "hyperbeam", "moonlight",
			"playrough", "postdelivery", "skydrop", "trick"
		],
		heightm: 1.3,
		weightkg: 32,

		prevo: "Tranquill",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		// creator: "AquaticPanic",
	},

	kecleon: {
		inherit: true,
		evos: ["Kaleideon"],
	},
	kaleideon: {
		name: "Kaleideon",
		copyData: "Kecleon",

		baseStats: {hp: 80, atk: 90, def: 70, spa: 80, spd: 70, spe: 110},
		movepoolAdditions: [
			"acidspray", "calmmind", "camoscope", "entrainment", "gigaimpact", "haze", "hyperbeam", "icywind", "lightscreen", "mirrormove", "moonlight", "powerwhip",
			"reflect", "scaleshot", "skittersmack", "snarl", "spikes", "steelwing", "switcheroo", "tailwind", "triattack"
		],

		prevo: "Kecleon",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		// creator: "AquaticPanic",
	},

	wurmple: {
		inherit: true,
		evos: ["Silcoon", "Cascoon", "Saccoon"],
	},
	saccoon: {
		name: "Saccoon",
		copyData: "Wurmple",

		abilities: {0: "Shed Skin"},
		baseStats: {hp: 50, atk: 35, def: 55, spa: 25, spd: 25, spe: 15},
		movepoolAdditions: [
			"harden", "irondefense"
		],
		weightkg: 10.7,

		prevo: "Wurmple",
		evos: ["Floccoth"],
		evoLevel: 7,
		// creator: "Tapler",
	},
	floccoth: {
		name: "Floccoth",
		copyData: "Wurmple",

		types: ["Bug", "Fairy"],
		abilities: {0: "Fluffy", H: "Tinted Lens"},
		baseStats: {hp: 60, atk: 50, def: 95, spa: 70, spd: 50, spe: 65},
		movepoolAdditions: [
			"harden", "irondefense",
			"acrobatics", "aerialace", "aircutter", "attract", "bugbuzz", "captivate", "confide", "dazzlinggleam", "defog", "doubleteam", "doubleedge", "endure",
			"energyball", "facade", "fairywind", "flash", "frustration", "gigadrain", "gigaimpact", "gust", "hiddenpower", "hyperbeam", "infestation", "laserfocus",
			"mimic", "moonblast", "naturalgift", "ominouswind", "protect", "psychic", "quiverdance", "reflect", "rest", "return", "roost", "round", "secretpower",
			"shadowball", "signalbeam", "silverwind", "pixiedust", "sleeptalk", "solarbeam", "strengthsap", "strugglebug", "substitute", "sunnyday", "swagger", "swift",
			"tailwind", "thief", "toxic", "twister", "uturn", "venoshock", "whirlwind"
		],
		weightkg: 30.0,

		prevo: "Saccoon",
		evoLevel: 10,
		// creator: "Tapler",
	},

	lanturn: {
		inherit: true,
		evos: ["Abyssylar", "Abyssylar-F"],
	},
	abyssylar: {
		name: "Abyssylar",
		copyData: "Lanturn",
		baseForme: "M",
		gender: "M",

		types: ["Dark", "Electric"],
		baseStats: {hp: 135, atk: 112, def: 65, spa: 65, spd: 100, spe: 63},
		abilities: {0: "Water Absorb", 1: "Illuminate", H: "Strong Jaw"},
		movepoolAdditions: [
			"bite", "crunch", "darkpulse", "eerieimpulse", "flipturn", "icefang", "jawlock", "leer", "liquidation", "meanlook", "psychicfangs", "recover", "scaryface",
			"snarl", "stormoflight", "thunderfang"
		],
		heightm: 2.4,
		weightkg: 50.3,

		otherFormes: ["Abyssylar-F"],
		formeOrder: ["Abyssylar", "Abyssylar-F"],
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		otherFormes: ["Abyssylar-F"],
		formeOrder: ["Abyssylar", "Abyssylar-F"],
		// creator: "Samtendo09",
	},
	abyssylarf: {
		name: "Abyssylar-F",
		baseSpecies: "Abyssylar",
		forme: "F",
		copyData: "Lanturn",
		gender: "F",

		types: ["Dark", "Electric"],
		baseStats: {hp: 135, atk: 112, def: 65, spa: 65, spd: 100, spe: 63},
		abilities: {0: "Water Absorb", 1: "Illuminate", H: "Strong Jaw"},
		movepoolAdditions: [
			"bite", "crunch", "darkpulse", "eerieimpulse", "flipturn", "icefang", "jawlock", "leer", "liquidation", "meanlook", "psychicfangs", "recover", "scaryface",
			"snarl", "stormoflight", "thunderfang"
		],
		heightm: 4.8,
		weightkg: 100.6,

		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		// creator: "Samtendo09",
	},
};
