export const Pokedex: {[speciesid: string]: ModdedSpeciesData} = {

// SLATE 1

// sample entry... mostly to remind me of the functionality I need P:
	raticate: {
		inherit: true,
		evos: ["Plaguicate"], // Eviolite compatibility
	},
	plaguicate: {
		name: "Plaguicate",
		copyData: "Raticate", // inherits information from Raticate wherever it's missing data

		types: ["Normal", "Poison"],
		baseStats: {hp: 75, atk: 91, def: 80, spa: 65, spd: 90, spe: 97},
		abilities: {0: "Poison Touch", 1: "Guts", H: "Hustle"},

		// copyMoves: "Raticate", // not always the same as copyData, but it should copy that by default so I don't need to enumerate this every time
		movepoolAdditions: ["plaquefang", "poisonfang", "venoshock"],
		// movepoolDeletions: ["struggle"], // an optional separate line for split evolutions
		// (example: Tenoris, which inherits moves from Altaria mostly but removes some that Swablu doesn't get anyway)

		prevo: "Raticate",
		evoLevel: 36,
		evoCondition: "Level up while poisoned",
		creator: "ausma",
	},

	noctowl: {
		inherit: true,
		evos: ["Hoobarn"],
	},
	hoobarn: {
		name: "Hoobarn",
		copyData: "Noctowl",

		baseStats: {hp: 100, atk: 70, def: 90, spa: 86, spd: 96, spe: 70},
		abilities: {0: "Insomnia", 1: "Keen Eye", H: "Prankster"},

		prevo: "Noctowl",
		evoType: "other",
		evoCondition: "A newly-discovered evolution", // use generic flavor where not specified
		creator: "Bolivia",
	},

	heatmor: {
		inherit: true,
		evos: ["Gourmant"],
	},
	gourmant: {
		name: "Gourmant",
		copyData: "Heatmor",

		types: ["Fire", "Dark"],
		baseStats: {hp: 85, atk: 137, def: 66, spa: 105, spd: 66, spe: 75},
		abilities: {0: "Gluttony", 1: "Flash Fire", H: "White Smoke"},
		movepoolAdditions: ["darkpulse", "lashout", "powerwhip"],

		prevo: "Heatmor",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		creator: "quagsi",
	},

	carnivine: {
		inherit: true,
		evos: ["Carnivenom"],
	},
	carnivenom: {
		name: "Carnivenom",
		copyData: "Carnivine",

		types: ["Grass", "Poison"],
		baseStats: {hp: 94, atk: 105, def: 82, spa: 100, spd: 102, spe: 51},
		movepoolAdditions: ["coil", "poisonjab", "raindance", "venoshock"],

		prevo: "Carnivine",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		creator: "inkbug",
	},

	cryogonal: {
		inherit: true,
		evos: ["Pollugonal"],
	},
	pollugonal: {
		name: "Pollugonal",
		copyData: "Cryogonal",

		types: ["Ice", "Poison"],
		baseStats: {hp: 90, atk: 50, def: 50, spa: 95, spd: 140, spe: 105},
		movepoolAdditions: ["sludgebomb", "spikes", "toxicspikes"],

		prevo: "Cryogonal",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		creator: "Magmajudis",
	},

	swablu: {
		inherit: true,
		evos: ["Altaria", "Tenoris"],
	},
	tenoris: {
		name: "Tenoris",
		copyData: "Altaria", // evolves from Swablu but has more in common with Altaria

		types: ["Ice", "Dragon"],
		baseStats: {hp: 75, atk: 110, def: 70, spa: 80, spd: 75, spe: 80},
		abilities: {0: "Volt Absorb", H: "Slush Rush"},
		movepoolAdditions: ["blizzard", "hail", "iciclecrash", "icywind"],
		movepoolDeletions: ["dragondance", "earthquake", "fireblast", "flamethrower"],

		prevo: "Swablu",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		creator: "Albatross",
	},

	mienfoo: {
		inherit: true,
		evos: ["Mienshao", "Mienshao-Yaoguai"],
	},
	mienshao: {
		inherit: true,
		otherFormes: ["Mienshao-Yaoguai"],
		formeOrder: ["Mienshao", "Mienshao-Yaoguai"],
	},
	mienshaoyaoguai: {
		name: "Mienshao-Yaoguai",
		baseSpecies: "Mienshao",
		forme: "Yaoguai",
		copyData: "Mienshao",

		types: ["Fighting", "Ghost"],
		baseStats: {hp: 65, atk: 125, def: 60, spa: 105, spd: 60, spe: 95},
		abilities: {0: "Inner Focus", 1: "Prankster", H: "Berserk"},
		movepoolAdditions: ["firespin", "hex", "shadowball", "spite"],

		prevo: "Mienfoo",
		evoLevel: 50,
		creator: "Hematite",
	},

	sandaconda: {
		inherit: true,
		evos: ["Coilrig"],
	},
	coilrig: {
		name: "Coilrig",
		copyData: "Sandaconda",

		types: ["Ground", "Poison"],
		baseStats: {hp: 77, atk: 107, def: 130, spa: 105, spd: 75, spe: 41},
		abilities: {0: "Sand Spit", 1: "Shed Skin", H: "Liquid Ooze"},
		movepoolAdditions: ["painsplit", "poisongas", "sludgebomb", "toxic", "venoshock"],

		prevo: "Sandaconda",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		creator: "Hematite",
	},

	kadabra: {
		inherit: true,
		evos: ["Alakazam", "Hocuspocus"],
	},
	hocuspocus: {
		name: "Hocuspocus",
		copyData: "Alakazam",

		types: ["Psychic", "Ghost"],
		baseStats: {hp: 55, atk: 95, def: 45, spa: 120, spd: 70, spe: 115},
		abilities: {0: "Tough Claws", 1: "Inner Focus", H: "Super Luck"},

		copyMoves: "Kadabra", // although its data is based on Alakazam, it doesn't have all of Alakazam's moves
		movepoolAdditions: ["gigaimpact", "hyperbeam", "metalclaw", "shadowclaw", "spite", "willowisp"],

		prevo: "Kadabra",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		creator: "ausma",
	},

	ariados: {
		inherit: true,
		evos: ["Dolorak"],
	},
	dolorak: {
		name: "Dolorak",
		copyData: "Ariados",

		baseStats: {hp: 85, atk: 110, def: 80, spa: 70, spd: 80, spe: 90},
		abilities: {0: "Swarm", 1: "Insomnia", H: "Prankster"},
		movepoolAdditions: ["memento", "poisongas"],

		prevo: "Ariados",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		creator: "BlueRay",
	},

	ledian: {
		inherit: true,
		evos: ["Lediluck"],
	},
	lediluck: {
		name: "Lediluck",
		copyData: "Ledian",

		baseStats: {hp: 65, atk: 85, def: 60, spa: 65, spd: 120, spe: 105},
		abilities: {0: "Swarm", 1: "Super Luck", H: "Iron Fist"},

		prevo: "Ledian",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		creator: "inkbug",
	},

	wormadamtrash: {
		inherit: true,
		evos: ["Balleringue"],
	},
	balleringue: {
		name: "Balleringue",
		copyData: "Wormadam-Trash",

		baseStats: {hp: 80, atk: 109, def: 105, spa: 69, spd: 105, spe: 29},
		abilities: {0: "Anticipation", 1: "Triage", H: "Overcoat"},
		movepoolAdditions: ["leechlife", "rapidspin"],

		prevo: "Wormadam-Trash",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		creator: "Magmajudis",
	},

	mismagius: {
		inherit: true,
		evos: ["Alchemissus"],
	},
	alchemissus: {
		name: "Alchemissus",
		copyData: "Mismagius",

		types: ["Ghost", "Poison"],
		baseStats: {hp: 66, atk: 66, def: 66, spa: 114, spd: 113, spe: 107},
		abilities: {0: "Levitate", 1: "Corrosion", H: "Gluttony"}, // this started as a typo but has been adopted as canon
		movepoolAdditions: ["poisongas", "toxicspikes", "venoshock"],

		prevo: "Mismagius",
		evoType: "useItem",
		evoItem: "Dawn Stone",
		creator: "KeroseneZanchu",
	},

	druddigon: {
		inherit: true,
		evos: ["Rubulwark"],
	},
	rubulwark: {
		name: "Rubulwark",
		copyData: "Druddigon",

		types: ["Dragon", "Rock"],
		baseStats: {hp: 87, atk: 160, def: 90, spa: 60, spd: 90, spe: 38},
		abilities: {0: "Weak Armor", 1: "Sheer Force", H: "Mold Breaker"},
		movepoolAdditions: ["dragonhammer", "irondefense", "sandstorm"],

		prevo: "Druddigon",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		creator: "Hematite",
	},

	inkay: {
		inherit: true,
		otherFormes: ["Inkay-Alola"],
		formeOrder: ["Inkay", "Inkay-Alola"],
	},
	inkayalola: {
		name: "Inkay-Alola",
		baseSpecies: "Inkay",
		forme: "Alola",
		copyData: "Inkay",

		types: ["Dark", "Water"],
		baseStats: {hp: 53, atk: 59, def: 53, spa: 27, spd: 56, spe: 40},
		abilities: {0: "Keen Eye", 1: "Prankster", H: "Mimicry"},
		movepoolAdditions: ["brine", "dive", "firstimpression", "terrainpulse", "scald", "surf", "watergun", "waterpulse"],
		movepoolDeletions: ["brutalswing", "calmmind", "futuresight", "guardswap", "powersplit", "psybeam", "psyshock", "storedpower"],

		evos: ["Malamar-Alola"],
		creator: "Violet",
	},
	malamar: {
		inherit: true,
		otherFormes: ["Malamar-Alola"],
		formeOrder: ["Malamar", "Malamar-Alola"],
	},
	malamaralola: {
		name: "Malamar-Alola",
		baseSpecies: "Malamar",
		forme: "Alola",
		copyData: "Malamar",

		types: ["Dark", "Water"],
		baseStats: {hp: 86, atk: 102, def: 88, spa: 48, spd: 95, spe: 63},
		abilities: {0: "Keen Eye", 1: "Prankster", H: "Mimicry"},
		movepoolAdditions: ["brine", "dive", "firstimpression", "terrainpulse", "scald", "surf", "watergun", "waterpulse"],
		movepoolDeletions: ["brutalswing", "calmmind", "futuresight", "guardswap", "powersplit", "psybeam", "psyshock", "storedpower"],

		prevo: "Inkay-Alola",
		evoLevel: 30,
		evoCondition: "with the console turned upside-down",
		creator: "Violet",
	},

	scrafty: {
		inherit: true,
		evos: ["Scrafiti"],
	},
	scrafiti: {
		name: "Scrafiti",
		copyData: "Scrafty",

		baseStats: {hp: 70, atk: 105, def: 120, spa: 60, spd: 120, spe: 48},
		abilities: {0: "Shed Skin", 1: "Moxie", H: "Prankster"},
		movepoolAdditions: ["copycat"],

		prevo: "Scrafty",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		creator: "Magmajudis",
	},

// SLATE 2

	greedent: {
		inherit: true,
		evos: ["Farmunk"],
	},
	farmunk: {
		name: "Farmunk",
		copyData: "Greedent",

		types: ["Normal", "Grass"],
		baseStats: {hp: 130, atk: 85, def: 115, spa: 95, spd: 75, spe: 20},
		abilities: {0: "Cheek Pouch", 1: "Harvest", H: "Gluttony"},
		movepoolAdditions: ["hiddenpower", "grassknot", "naturalgift", "solarbeam", "toxic", "weatherball"],

		prevo: "Greedent",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		creator: "quagsi",
	},

	persian: {
		inherit: true,
		evos: ["Carnelion"],
	},
	carnelion: {
		name: "Carnelion",
		copyData: "Persian",

		types: ["Normal", "Rock"],
		baseStats: {hp: 85, atk: 105, def: 70, spa: 95, spd: 70, spe: 120},
		movepoolAdditions: ["rockslide", "rocktomb", "sandstorm", "stealthrock", "stoneedge"],

		prevo: "Persian",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		creator: "abismal",
	},

	whiscash: {
		inherit: true,
		evos: ["Whiscazu"],
	},
	whiscazu: {
		name: "Whiscazu",
		copyData: "Whiscash",

		baseStats: {hp: 110, atk: 78, def: 78, spa: 116, spd: 81, spe: 70},
		abilities: {0: "Oblivious", 1: "Cheek Pouch", H: "Hydration"},
		movepoolAdditions: ["calmmind", "recycle"],

		prevo: "Whiscash",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		creator: "ausma",
	},

	tropius: {
		inherit: true,
		evos: ["Musasoar"],
	},
	musasoar: {
		name: "Musasoar",
		copyData: "Tropius",

		baseStats: {hp: 109, atk: 108, def: 83, spa: 72, spd: 87, spe: 76},
		abilities: {0: "Chlorophyll", 1: "Leaf Guard", H: "Harvest"},
		movepoolAdditions: ["acrobatics", "dualwingbeat", "woodhammer"],
		heightm: 2.4,
		weightkg: 180,

		prevo: "Tropius",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		creator: "Violet",
	},

	snover: {
		inherit: true,
		evos: ["Abomasnow", "Skiversnow"],
	},
	skiversnow: {
		name: "Skiversnow",
		copyData: "Abomasnow",

		baseStats: {hp: 90, atk: 92, def: 55, spa: 92, spd: 65, spe: 100},
		abilities: {0: "Snow Warning", H: "Pressure"},

		copyMoves: "Snover", // although its data is based on Abomasnow, it doesn't have all of Abomasnow's moves
		movepoolAdditions: ["brickbreak", "earthpower", "gigaimpact", "hyperbeam", "outrage", "rapidspin", "rockslide", "uturn"],

		prevo: "Snover",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		creator: "ausma",
	},

	falinks: {
		inherit: true,
		otherFormes: ["Falinks-Terracotta"],
		formeOrder: ["Falinks", "Falinks-Terracotta"],
	},
	falinksterracotta: {
		name: "Falinks-Terracotta",
		baseSpecies: "Falinks",
		forme: "Terracotta",
		copyData: "Falinks",

		types: ["Fighting", "Rock"],
		baseStats: {hp: 65, atk: 100, def: 100, spa: 60, spd: 60, spe: 85},
		abilities: {0: "Solid Rock", 1: "Skill Link", H: "Defiant"},
		movepoolAdditions: ["drainpunch", "rockblast", "stoneedge", "smackdown", "stealthrock"],
		movepoolDeletions: ["closecombat", "swordsdance"],

		creator: "Hematite",
	},

	swirlix: {
		inherit: true,
		otherFormes: ["Swirlix-Variant"],
		formeOrder: ["Swirlix", "Swirlix-Variant"],
	},
	swirlixvariant: {
		name: "Swirlix-Variant",
		baseSpecies: "Swirlix",
		forme: "Variant",
		copyData: "Swirlix",

		types: ["Poison"],
		abilities: {0: "Sticky Hold", H: "Unburden"},
		movepoolAdditions: ["belch", "sludgebomb", "stuffcheeks"],
		movepoolDeletions: ["aromatherapy", "bellydrum", "cottonguard", "dazzlinggleam", "drainingkiss", "fairywind", "mistyexplosion", "playrough"],

		evos: ["Slurpuff-Variant"],
		creator: "abismal",
	},
	slurpuff: {
		inherit: true,
		otherFormes: ["Slurpuff-Variant"],
		formeOrder: ["Slurpuff", "Slurpuff-Variant"],
	},
	slurpuffvariant: {
		name: "Slurpuff-Variant",
		baseSpecies: "Slurpuff",
		forme: "Variant",
		copyData: "Slurpuff",

		types: ["Poison"],
		abilities: {0: "Sticky Hold", H: "Unburden"},
		movepoolAdditions: ["belch", "sludgebomb", "stuffcheeks"],
		movepoolDeletions: ["aromatherapy", "bellydrum", "cottonguard", "dazzlinggleam", "drainingkiss", "fairywind", "mistyexplosion", "playrough"],

		prevo: "Swirlix-Variant",
		evoType: "trade",
		evoItem: "Black Sludge",
		creator: "abismal",
	},

	morelull: {
		inherit: true,
		evos: ["Shiinotic", "Shiinotic-Kalos"],
	},
	shiinotic: {
		inherit: true,
		otherFormes: ["Shiinotic-Kalos"],
		formeOrder: ["Shiinotic", "Shiinotic-Kalos"],
	},
	shiinotickalos: {
		name: "Shiinotic-Kalos",
		baseSpecies: "Shiinotic",
		forme: "Kalos",
		copyData: "Shiinotic",

		types: ["Poison", "Fairy"],
		baseStats: {hp: 60, atk: 45, def: 60, spa: 90, spd: 80, spe: 70},
		abilities: {0: "Illuminate", 1: "Effect Spore", H: "Technician"},
		movepoolAdditions: ["acidspray", "nastyplot", "venoshock"],

		prevo: "Morelull",
		evoLevel: 24,
		creator: "Hematite",
	},

	unown: {
		inherit: true,
		evos: ["Nown"],
	},
	nown: {
		name: "Nown",
		copyData: "Unown",

		baseStats: {hp: 108, atk: 91, def: 28, spa: 132, spd: 23, spe: 98},
		abilities: {0: "Protean"},
		movepoolAdditions: ["guardsplit", "naturepower", "weatherball"],

		prevo: "Unown",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		creator: "abismal",
	},

	venipede: {
		inherit: true,
		otherFormes: ["Venipede-Variant"],
		formeOrder: ["Venipede", "Venipede-Variant"],
	},
	venipedevariant: {
		name: "Venipede-Variant",
		baseSpecies: "Venipede",
		forme: "Variant",
		copyData: "Venipede",

		types: ["Bug", "Ground"],
		baseStats: {hp: 50, atk: 45, def: 39, spa: 45, spd: 24, spe: 57},
		abilities: {0: "Poison Heal", 1: "Swarm", H: "Quick Feet"},
		movepoolAdditions: ["earthpower", "gigadrain", "scorchingsands", "stealthrock"],
		movepoolDeletions: ["toxicspikes"],

		evos: ["Whirlipede-Variant"],
		creator: "BlueRay",
	},
	whirlipede: {
		inherit: true,
		otherFormes: ["Whirlipede-Variant"],
		formeOrder: ["Whirlipede", "Whirlipede-Variant"],
	},
	whirlipedevariant: {
		name: "Whirlipede-Variant",
		baseSpecies: "Whirlipede",
		forme: "Variant",
		copyData: "Whirlipede",

		types: ["Bug", "Ground"],
		baseStats: {hp: 60, atk: 55, def: 79, spa: 55, spd: 64, spe: 47},
		abilities: {0: "Poison Heal", 1: "Swarm", H: "Quick Feet"},
		movepoolAdditions: ["earthpower", "gigadrain", "scorchingsands", "stealthrock"],
		movepoolDeletions: ["toxicspikes"],

		prevo: "Venipede-Variant",
		evoLevel: 22,
		evos: ["Scolipede-Variant"],
		creator: "BlueRay",
	},
	scolipede: {
		inherit: true,
		otherFormes: ["Scolipede-Variant"],
		formeOrder: ["Scolipede", "Scolipede-Variant"],
	},
	scolipedevariant: {
		name: "Scolipede-Variant",
		baseSpecies: "Scolipede",
		forme: "Variant",
		copyData: "Scolipede",

		types: ["Bug", "Ground"],
		baseStats: {hp: 100, atk: 100, def: 49, spa: 85, spd: 39, spe: 112},
		abilities: {0: "Poison Heal", 1: "Swarm", H: "Quick Feet"},
		movepoolAdditions: ["earthpower", "gigadrain", "scorchingsands", "stealthrock"],
		movepoolDeletions: ["toxicspikes"],

		prevo: "Whirlipede-Variant",
		evoLevel: 30,
		creator: "BlueRay",
	},

	staryu: {
		inherit: true,
		otherFormes: ["Staryu-Variant"],
		formeOrder: ["Staryu", "Staryu-Variant"],
	},
	staryuvariant: {
		name: "Staryu-Variant",
		baseSpecies: "Staryu",
		forme: "Variant",
		copyData: "Staryu",

		types: ["Rock"],
		abilities: {0: "Dazzling", 1: "Natural Cure", H: "Analytic"},
		movepoolAdditions: ["earthpower", "muddywater", "rockpolish", "sandstorm", "scorchingsands", "stealthrock"],

		evos: ["Starmie-Variant"],
		creator: "BlueRay",
	},
	starmie: {
		inherit: true,
		otherFormes: ["Starmie-Variant"],
		formeOrder: ["Starmie", "Starmie-Variant"],
	},
	starmievariant: {
		name: "Starmie-Variant",
		baseSpecies: "Starmie",
		forme: "Variant",
		copyData: "Starmie",

		types: ["Rock"],
		abilities: {0: "Dazzling", 1: "Natural Cure", H: "Analytic"},
		movepoolAdditions: ["earthpower", "muddywater", "rockpolish", "sandstorm", "scorchingsands", "stealthrock"],

		prevo: "Staryu-Variant",
		evoType: "other",
		evoCondition: "A newly-discovered evolution", // use generic flavor where not specified
		creator: "BlueRay",
	},

	carkol: {
		inherit: true,
		evos: ["Coalossal", "Stokomotive"],
	},
	stokomotive: {
		name: "Stokomotive",
		copyData: "Coalossal", // evolves from Carkol but has more in common with Coalossal

		baseStats: {hp: 80, atk: 100, def: 70, spa: 100, spd: 48, spe: 112},
		movepoolAdditions: ["autotomize", "healbell"],
		movepoolDeletions: ["megakick", "megapunch"],

		prevo: "Carkol",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		creator: "inkbug",
	},

	roggenrola: {
		inherit: true,
		otherFormes: ["Roggenrola-Kalos"],
		formeOrder: ["Roggenrola", "Roggenrola-Kalos"],
	},
	roggenrolakalos: {
		name: "Roggenrola-Kalos",
		baseSpecies: "Roggenrola",
		forme: "Kalos",
		copyData: "Roggenrola",

		types: ["Rock", "Electric"],
		baseStats: {hp: 55, atk: 25, def: 85, spa: 75, spd: 25, spe: 15},
		abilities: {0: "Sturdy", 1: "Weak Armor", H: "Solar Power"},
		movepoolAdditions: ["chargebeam", "risingvoltage", "sunnyday", "thunderbolt", "thunderwave"],

		evos: ["Boldore-Kalos"],
		creator: "Violet",
	},
	boldore: {
		inherit: true,
		otherFormes: ["Boldore-Kalos"],
		formeOrder: ["Boldore", "Boldore-Kalos"],
	},
	boldorekalos: {
		name: "Boldore-Kalos",
		baseSpecies: "Boldore",
		forme: "Kalos",
		copyData: "Boldore",

		types: ["Rock", "Electric"],
		baseStats: {hp: 70, atk: 50, def: 105, spa: 105, spd: 40, spe: 20},
		abilities: {0: "Sturdy", 1: "Weak Armor", H: "Solar Power"},
		movepoolAdditions: ["chargebeam", "risingvoltage", "sunnyday", "thunderbolt", "thunderwave"],

		prevo: "Roggenrola-Kalos",
		evoLevel: 25,
		evos: ["Gigalith-Kalos"],
		creator: "Violet",
	},
	gigalithkalos: {
		name: "Gigalith-Kalos",
		baseSpecies: "Gigalith",
		forme: "Kalos",
		copyData: "Gigalith",

		types: ["Rock", "Electric"],
		baseStats: {hp: 85, atk: 60, def: 130, spa: 135, spd: 80, spe: 25},
		abilities: {0: "Sturdy", 1: "Drought", H: "Solar Power"},
		movepoolAdditions: ["chargebeam", "risingvoltage", "sunnyday", "thunderbolt", "thunderwave"],

		prevo: "Boldore-Kalos",
		evoType: "trade",
		creator: "Violet",
	},

	rockruff: {
		inherit: true,
		evos: ["Lycanroc", "Lycanroc-Midnight", "Lycanroc-Dusk", "Lycanroc-Arctara"],
	},
	lycanroc: {
		inherit: true,
		otherFormes: ["Lycanroc-Midnight", "Lycanroc-Dusk", "Lycanroc-Arctara"],
		formeOrder: ["Lycanroc", "Lycanroc-Midnight", "Lycanroc-Dusk", "Lycanroc-Arctara"],
	},
	lycanrocarctara: {
		name: "Lycanroc-Arctara",
		baseSpecies: "Lycanroc",
		forme: "Arctara",
		copyData: "Lycanroc",

		types: ["Rock", "Ice"],
		baseStats: {hp: 95, atk: 70, def: 80, spa: 55, spd: 120, spe: 67},
		abilities: {0: "Fur Coat", 1: "Tough Claws", H: "Sand Rush"},
		movepoolAdditions: [
			"accelerock", "assurance", "blizzard", "brickbreak", "bulkup", "closecombat", "counter", "drillrun", "gigaimpact", "icebeam", "icywind", "psychicfangs",
			"quickguard", "revenge", "reversal", "rockblast", "sandstorm", "shoreup", "tripleaxel", "workup"
		],

		prevo: "Rockruff",
		evoLevel: 25,
		evoCondition: "Evolves at level 45 unless the season is spring",
		creator: "KeroseneZanchu",
	},

	solrock: {
		inherit: true,
		evos: ["Eclipseroid"],
	},
	lunatone: {
		inherit: true,
		evos: ["Eclipseroid"],
	},
	eclipseroid: {
		name: "Eclipseroid",
		copyData: "Solrock",

		types: ["Rock", "Ghost"],
		baseStats: {hp: 90, atk: 100, def: 90, spa: 100, spd: 90, spe: 70},
		movepoolAdditions: ["recover"],
		// going to hard-code its movepool a little
		weightkg: 322,
		color: "Purple",

		prevo: ["Solrock", "Lunatone"], // no idea if this will work
		evoType: "other",
		evoCondition: "A mysterious Pokémon that can evolve from either Solrock or Lunatone...",
		creator: "ausma",
	},

	gourgeist: {
		inherit: true,
		evos: ["Jackourd"],
	},
	gourgeistsmall: {
		inherit: true,
		evos: ["Jackourd-Small"],
	},
	gourgeistlarge: {
		inherit: true,
		evos: ["Jackourd-Large"],
	},
	gourgeistsuper: {
		inherit: true,
		evos: ["Jackourd-Super"],
	},
	jackourd: {
		name: "Jackourd",
		copyData: "Gourgeist",

		baseStats: {hp: 75, atk: 102, def: 122, spa: 67, spd: 75, spe: 90},
		abilities: {0: "Pickup", 1: "Harvest", H: "Hoard"},
		movepoolAdditions: ["naturalgift", "weatherball"],

		prevo: "Gourgeist",
		evoType: "levelHold",
		evoItem: "Razor Claw",
		creator: "KeroseneZanchu",
	},
	jackourdsmall: {
		name: "Jackourd-Small",
		baseSpecies: "Jackourd",
		forme: "Small",
		copyData: "Gourgeist-Small",

		baseStats: {hp: 65, atk: 103, def: 122, spa: 58, spd: 75, spe: 108},
		abilities: {0: "Pickup", 1: "Harvest", H: "Hoard"},
		copyMoves: "Gourgeist", // it doesn't like copying from other Gourgeist forms
		movepoolAdditions: ["naturalgift", "weatherball"],

		prevo: "Gourgeist-Small",
		evoType: "levelHold",
		evoItem: "Razor Claw",
		creator: "KeroseneZanchu",
	},
	jackourdlarge: {
		name: "Jackourd-Large",
		baseSpecies: "Jackourd",
		forme: "Large",
		copyData: "Gourgeist-Large",

		baseStats: {hp: 85, atk: 101, def: 122, spa: 76, spd: 75, spe: 72},
		abilities: {0: "Pickup", 1: "Harvest", H: "Hoard"},
		copyMoves: "Gourgeist", // it doesn't like copying from other Gourgeist forms
		movepoolAdditions: ["naturalgift", "weatherball"],

		prevo: "Gourgeist-Large",
		evoType: "levelHold",
		evoItem: "Razor Claw",
		creator: "KeroseneZanchu",
	},
	jackourdsuper: {
		name: "Jackourd-Super",
		baseSpecies: "Jackourd",
		forme: "Super",
		copyData: "Gourgeist-Super",

		baseStats: {hp: 95, atk: 100, def: 122, spa: 85, spd: 75, spe: 54},
		abilities: {0: "Pickup", 1: "Harvest", H: "Hoard"},
		copyMoves: "Gourgeist", // it doesn't like copying from other Gourgeist forms
		movepoolAdditions: ["naturalgift", "weatherball"],

		prevo: "Gourgeist-Super",
		evoType: "levelHold",
		evoItem: "Razor Claw",
		creator: "KeroseneZanchu",
	},

	dusclops: {
		inherit: true,
		evos: ["Dusknoir", "Dusglow"],
	},
	dusglow: {
		name: "Dusglow",
		copyData: "Dusknoir", // evolves from Dusclops but has more in common with Dusknoir

		types: ["Ghost", "Fairy"],
		baseStats: {hp: 45, atk: 85, def: 105, spa: 115, spd: 105, spe: 70},
		abilities: {0: "Pressure", H: "Wandering Spirit"},
		copyMoves: "Dusclops",
		movepoolAdditions: ["dazzlinggleam", "drainingkiss"],

		prevo: "Dusclops",
		evoType: "useItem",
		evoItem: "Dawn Stone",
		creator: "Violet",
	},

	slugma: {
		inherit: true,
		otherFormes: ["Slugma-Galar"],
		formeOrder: ["Slugma", "Slugma-Galar"],
	},
	slugmagalar: {
		name: "Slugma-Galar",
		baseSpecies: "Slugma",
		forme: "Galar",
		copyData: "Slugma",

		types: ["Steel"],
		abilities: {0: "Steam Engine", 1: "Flame Body", H: "Gooey"},
		movepoolAdditions: ["flashcannon", "scorchingsands", "sludgebomb", "steelbeam", "toxicspikes", "venoshock"],
		movepoolDeletions: ["ancientpower", "fireblast", "flameburst", "flamethrower", "flameburst", "inferno", "lavaplume", "overheat", "shellsmash", "stoneedge"],

		evos: ["Magcargo-Galar"],
		creator: "quagsi",
	},
	magcargo: {
		inherit: true,
		otherFormes: ["Magcargo-Galar"],
		formeOrder: ["Magcargo", "Magcargo-Galar"],
	},
	magcargogalar: {
		name: "Magcargo-Galar",
		baseSpecies: "Magcargo",
		forme: "Galar",
		copyData: "Magcargo",

		types: ["Steel", "Poison"],
		baseStats: {hp: 60, atk: 50, def: 60, spa: 90, spd: 60, spe: 110},
		abilities: {0: "Steam Engine", 1: "Flame Body", H: "Gooey"},
		movepoolAdditions: ["flashcannon", "scorchingsands", "sludgebomb", "steelbeam", "toxicspikes", "venoshock"],
		movepoolDeletions: ["ancientpower", "fireblast", "flameburst", "flamethrower", "flameburst", "inferno", "lavaplume", "overheat", "shellsmash", "stoneedge"],

		prevo: "Slugma-Galar",
		evoLevel: 38,
		creator: "quagsi",
	},

};
