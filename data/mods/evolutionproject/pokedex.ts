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
		evoCondition: "while poisoned",
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
		baseStats: {hp: 90, atk: 137, def: 71, spa: 110, spd: 71, spe: 55},
		abilities: {0: "Gluttony", 1: "Flash Fire", H: "White Smoke"},
		movepoolAdditions: ["darkpulse", "lashout"],

		prevo: "Heatmor",
		evoLevel: 35,
		evoItem: "Black Glasses",
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
		baseStats: {hp: 94, atk: 105, def: 82, spa: 100, spd: 82, spe: 51},
		movepoolAdditions: ["coil", "poisonjab", "raindance", "venoshock"],

		prevo: "Carnivine",
		evoType: "trade",
		evoItem: "Poison Barb",
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
		evoType: "trade",
		evoItem: "Razor Claw",
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
		movepoolAdditions: ["memento", "poisongas", "raindance"],

		prevo: "Ariados",
		evoType: "levelExtra",
		evoCondition: "at night after poisoning 4 Pokémon in the same battle",
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
		evoType: "levelHold",
		evoItem: "Lucky Punch",
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

	scraggy: {
		inherit: true,
		evos: ["Scrafty", "Scrafiti"],
	},
	scrafiti: {
		name: "Scrafiti",
		copyData: "Scrafty",

		baseStats: {hp: 65, atk: 100, def: 115, spa: 45, spd: 115, spe: 48},
		abilities: {0: "Shed Skin", 1: "Moxie", H: "Prankster"},
		movepoolAdditions: ["copycat"],

		prevo: "Scraggy",
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
		movepoolAdditions: ["hiddenpower", "grassknot", "naturalgift", "rototiller", "solarbeam", "toxic", "weatherball"],

		prevo: "Greedent",
		evoType: "levelFriendship",
		evoCondition: "while holding a Berry",
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
		movepoolAdditions: ["recycle", "stealthrock"],

		prevo: "Whiscash",
		evoLevel: 55,
		evoCondition: "after defeating a Rock-type",
		creator: "ausma",
	},

	tropius: {
		inherit: true,
		evos: ["Musasoar"],
	},
	musasoar: {
		name: "Musasoar",
		copyData: "Tropius",

		baseStats: {hp: 109, atk: 78, def: 83, spa: 72, spd: 87, spe: 66},
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
		movepoolAdditions: [
			"brickbreak", "bulldoze", "earthpower", "focuspunch", "gigaimpact", "hyperbeam", "leafstorm", "outrage", "rapidspin", "rockclimb", "rockslide",
			"rocktomb", "uturn",
		],

		prevo: "Snover",
		evoType: "levelExtra",
		evoCondition: "on steep cliffs",
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
		movepoolAdditions: ["drainpunch", "rockblast", "stoneedge", "smackdown", "stealthrock", "wideguard"],
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
		movepoolAdditions: ["appleacid", "belch", "sludgebomb", "stuffcheeks"],
		movepoolDeletions: ["aromatherapy", "bellydrum", "calmmind", "cottonguard", "dazzlinggleam", "drainingkiss", "fairywind", "mistyexplosion", "playrough"],

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
		movepoolAdditions: ["appleacid", "belch", "sludgebomb", "stuffcheeks"],
		movepoolDeletions: ["aromatherapy", "bellydrum", "calmmind", "cottonguard", "dazzlinggleam", "drainingkiss", "fairywind", "mistyexplosion", "playrough"],

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
		baseStats: {hp: 60, atk: 61, def: 60, spa: 90, spd: 80, spe: 54},
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
		otherFormes: ["Venipede-Variant", "Venipede-Paldea"],
		formeOrder: ["Venipede", "Venipede-Variant", "Venipede-Paldea"],
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
		otherFormes: ["Whirlipede-Variant", "Whirlipede-Paldea"],
		formeOrder: ["Whirlipede", "Whirlipede-Variant", "Whirlipede-Paldea"],
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
		otherFormes: ["Scolipede-Variant", "Scolipede-Paldea"],
		formeOrder: ["Scolipede", "Scolipede-Variant", "Scolipede-Paldea"],
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
		evoType: "useItem",
		evoItem: "Shiny Stone",
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
	gigalith: {
		inherit: true,
		otherFormes: ["Gigalith-Kalos"],
		formeOrder: ["Gigalith", "Gigalith-Kalos"],
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
			"quickguard", "revenge", "reversal", "rockblast", "sandstorm", "shoreup", "tripleaxel", "workup",
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

	// SLATE 3

	mantyke: {
		inherit: true,
		otherFormes: ["Mantyke-Variant"],
		formeOrder: ["Mantyke", "Mantyke-Variant"],
	},
	mantykevariant: {
		name: "Mantyke-Variant",
		baseSpecies: "Mantyke",
		forme: "Variant",
		copyData: "Mantyke",

		types: ["Fire"],
		baseStats: {hp: 45, atk: 20, def: 50, spa: 50, spd: 120, spe: 60},
		abilities: {0: "Cloud Nine", 1: "Levitate", H: "Flame Body"},
		movepoolAdditions: ["ember", "fireblast", "firespin", "flamecharge", "flamethrower", "heatwave", "incinerate", "morningsun", "overheat", "solarbeam", "sunnyday", "willowisp"],
		movepoolDeletions: ["aquaring", "aquatail", "blizzard", "brine", "bubble", "bubblebeam", "dive", "hail", "haze", "hydropump", "icebeam", "icywind", "liquidation", "raindance", "watergun", "waterpulse", "watersport", "waterfall", "whirlpool"],

		evos: ["Mantine-Variant"],
		creator: "Violet",
	},
	mantine: {
		inherit: true,
		otherFormes: ["Mantine-Variant"],
		formeOrder: ["Mantine", "Mantine-Galar"],
	},
	mantinevariant: {
		name: "Mantine-Variant",
		baseSpecies: "Mantine",
		forme: "Variant",
		copyData: "Mantine",

		types: ["Fire"],
		baseStats: {hp: 85, atk: 40, def: 70, spa: 70, spd: 140, spe: 80},
		abilities: {0: "Cloud Nine", 1: "Levitate", H: "Flame Body"},
		movepoolAdditions: ["ember", "fireblast", "firespin", "flamecharge", "flamethrower", "heatwave", "incinerate", "morningsun", "overheat", "solarbeam", "sunnyday", "willowisp"],
		movepoolDeletions: ["aquaring", "aquatail", "blizzard", "brine", "bubble", "bubblebeam", "dive", "hail", "haze", "hydropump", "icebeam", "icywind", "liquidation", "raindance", "watergun", "waterpulse", "watersport", "waterfall", "whirlpool"],

		prevo: "Mantyke-Variant",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		creator: "Violet",
	},

	lotad: {
		inherit: true,
		otherFormes: ["Lotad-Ultra"],
		formeOrder: ["Lotad", "Lotad-Ultra"],
	},
	lotadultra: {
		name: "Lotad-Ultra",
		baseSpecies: "Lotad",
		forme: "Ultra",
		copyData: "Lotad",

		types: ["Fire", "Grass"],
		baseStats: {hp: 41, atk: 31, def: 19, spa: 53, spd: 47, spe: 29},
		abilities: {0: "Lava Flow", 1: "Vital Spirit", S: "Beast Boost"},
		movepoolAdditions: ["fireblast", "flamethrower", "heatwave", "overheat", "petaldance", "scorchingsands", "willowisp"],
		movepoolDeletions: ["blizzard", "bubble", "bubblebeam", "dive", "hail", "hydropump", "icebeam", "icywind", "mist", "muddywater", "scald", "surf", "waterfall", "watergun", "waterpulse", "watersport", "whirlpool"],

		evos: ["Lombre-Ultra"],
		creator: "Violet",
	},
	lombre: {
		inherit: true,
		otherFormes: ["Lombre-Ultra"],
		formeOrder: ["Lombre", "Lombre-Ultra"],
	},
	lombreultra: {
		name: "Lombre-Ultra",
		baseSpecies: "Lombre",
		forme: "Ultra",
		copyData: "Lombre",

		types: ["Fire", "Grass"],
		baseStats: {hp: 59, atk: 47, def: 41, spa: 73, spd: 67, spe: 53},
		abilities: {0: "Lava Flow", 1: "Vital Spirit", S: "Beast Boost"},
		movepoolAdditions: ["fireblast", "flamethrower", "heatwave", "overheat", "petaldance", "scorchingsands", "willowisp"],
		movepoolDeletions: ["blizzard", "bubble", "bubblebeam", "dive", "hail", "hydropump", "icebeam", "icywind", "mist", "muddywater", "scald", "surf", "waterfall", "watergun", "waterpulse", "watersport", "whirlpool"],

		prevo: "Lotad-Ultra",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		evos: ["Ludicolo-Ultra"],
		creator: "Violet",
	},
	ludicolo: {
		inherit: true,
		otherFormes: ["Ludicolo-Ultra"],
		formeOrder: ["Ludicolo", "Ludicolo-Ultra"],
	},
	ludicoloultra: {
		name: "Ludicolo-Ultra",
		baseSpecies: "Ludicolo",
		forme: "Ultra",
		copyData: "Ludicolo",

		types: ["Fire", "Grass"],
		baseStats: {hp: 79, atk: 71, def: 53, spa: 107, spd: 97, spe: 73},
		abilities: {0: "Lava Flow", 1: "Vital Spirit", S: "Beast Boost"},
		movepoolAdditions: ["fireblast", "flamethrower", "heatwave", "overheat", "fierydance", "petaldance", "scorchingsands", "willowisp"],
		movepoolDeletions: ["blizzard", "bubble", "bubblebeam", "dive", "hail", "hydropump", "icebeam", "icywind", "mist", "muddywater", "scald", "surf", "waterfall", "watergun", "waterpulse", "watersport", "whirlpool"],

		prevo: "Lombre-Ultra",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		creator: "Violet",
	},

	drifloon: {
		inherit: true,
		evos: ["Driflblim", "Driflblim-Variant"],
	},
	drifblim: {
		inherit: true,
		otherFormes: ["Drifblim-Variant"],
		formeOrder: ["Drifblim", "Drifblim-Variant"],
	},
	drifblimvariant: {
		name: "Drifblim-Variant",
		baseSpecies: "Drifblim",
		forme: "Variant",
		copyData: "Drifblim",

		types: ["Fire", "Flying"],
		baseStats: {hp: 140, atk: 70, def: 24, spa: 84, spd: 74, spe: 106},
		abilities: {0: "Emergency Exit"},
		movepoolAdditions: ["fireblast", "flamecharge", "flamethrower", "heatwave", "lightscreen", "mindblown", "overheat", "solarbeam"],
		movepoolDeletions: ["phantomforce"],

		prevo: "Drifloon",
		evoType: "levelHold",
		evoItem: "Charcoal",
		evoCondition: "during the day",
		creator: "inkbug",
	},

	psyduck: {
		inherit: true,
		evos: ["Golduck", "Bafflack"],
	},
	bafflack: {
		name: "Bafflack",
		copyData: "Golduck",

		baseStats: {hp: 80, atk: 62, def: 18, spa: 125, spd: 110, spe: 105},
		abilities: {0: "Psychic Surge", 1: "Cloud Nine", H: "Pure Power"},
		movepoolAdditions: ["aurasphere", "expandingforce"],
		movepoolDeletions: ["flipturn"],

		prevo: "Psyduck",
		evoType: "levelFriendship",
		evoCondition: "in Psychic Terrain",
		creator: "KeroseneZanchu",
	},

	goomy: {
		inherit: true,
		otherFormes: ["Goomy-Arctara"],
		formeOrder: ["Goomy", "Goomy-Arctara"],
	},
	goomyarctara: {
		name: "Goomy-Arctara",
		baseSpecies: "Goomy",
		forme: "Arctara",
		copyData: "Goomy",

		types: ["Water", "Ice"],
		baseStats: {hp: 25, atk: 55, def: 35, spa: 55, spd: 75, spe: 55},
		abilities: {0: "Stamina", 1: "Hydration", H: "Water Absorb"},
		movepoolAdditions: ["iciclecrash", "painsplit"],
		movepoolDeletions: ["dracometeor", "fireblast", "firepunch", "flamethrower", "incinerate", "shockwave", "thunder", "thunderbolt", "thunderpunch"],

		evos: ["Sliggoo-Arctara"],
		creator: "ausma",
	},
	sliggoo: {
		inherit: true,
		otherFormes: ["Sliggoo-Arctara"],
		formeOrder: ["Sliggoo", "Sliggoo-Arctara"],
	},
	sliggooarctara: {
		name: "Sliggoo-Arctara",
		baseSpecies: "Sliggoo",
		forme: "Arctara",
		copyData: "Sliggoo",

		types: ["Water", "Ice"],
		baseStats: {hp: 37, atk: 83, def: 53, spa: 83, spd: 113, spe: 83},
		abilities: {0: "Stamina", 1: "Hydration", H: "Water Absorb"},
		movepoolAdditions: ["iciclecrash", "painsplit"],
		movepoolDeletions: ["dracometeor", "fireblast", "firepunch", "flamethrower", "incinerate", "shockwave", "thunder", "thunderbolt", "thunderpunch"],

		prevo: "Goomy-Arctara",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		evos: ["Goodra-Arctara"],
		creator: "ausma",
	},
	goodra: {
		inherit: true,
		otherFormes: ["Goodra-Arctara"],
		formeOrder: ["Goodra", "Goodra-Arctara"],
	},
	goodraarctara: {
		name: "Goodra-Arctara",
		baseSpecies: "Goodra",
		forme: "Arctara",
		copyData: "Goodra",

		types: ["Water", "Ice"],
		baseStats: {hp: 50, atk: 110, def: 70, spa: 110, spd: 150, spe: 110},
		abilities: {0: "Stamina", 1: "Hydration", H: "Water Absorb"},
		movepoolAdditions: ["iciclecrash", "painsplit"],
		movepoolDeletions: ["dracometeor", "fireblast", "firepunch", "flamethrower", "incinerate", "shockwave", "thunder", "thunderbolt", "thunderpunch"],

		prevo: "Sliggoo-Arctara",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		creator: "ausma",
	},

	electrode: {
		inherit: true,
		evos: ["Ballistic"],
	},
	ballistic: {
		name: "Ballistic",
		copyData: "Electrode",

		types: ["Electric", "Normal"],
		baseStats: {hp: 70, atk: 110, def: 10, spa: 90, spd: 110, spe: 150},
		abilities: {0: "Soundproof", 1: "Reckless", H: "Aftermath"},
		movepoolAdditions: ["endeavor"],

		prevo: "Electrode",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		creator: "BlueRay",
	},

	trevenant: {
		inherit: true,
		evos: ["Freedling"],
	},
	freedling: {
		name: "Freedling",
		copyData: "Trevenant",

		types: ["Grass"],
		baseStats: {hp: 90, atk: 110, def: 106, spa: 65, spd: 92, spe: 73},
		abilities: {0: "Natural Cure", 1: "Sticky Hold", H: "Gooey"},
		movepoolAdditions: ["synthesis", "spikes"],

		prevo: "Trevenant",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		creator: "ausma",
	},

	smoochum: {
		inherit: true,
		evos: ["Jynx", "Jynx-Variant"],
	},
	jynx: {
		inherit: true,
		otherFormes: ["Jynx-Variant"],
		formeOrder: ["Jynx", "Jynx-Variant"],
	},
	jynxvariant: {
		name: "Jynx-Variant",
		baseSpecies: "Jynx",
		forme: "Variant",
		copyData: "Jynx",

		types: ["Grass", "Fighting"],
		baseStats: {hp: 65, atk: 50, def: 95, spa: 115, spd: 35, spe: 95},
		abilities: {0: "Dancer", 1: "Flame Body", H: "Flash Fire"},
		movepoolAdditions: ["fierydance", "gigadrain", "morningsun"],

		prevo: "Smoochum",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		creator: "abismal",
	},

	noibat: {
		inherit: true,
		evos: ["Noivern", "Noivern-Variant"],
	},
	noivern: {
		inherit: true,
		otherFormes: ["Noivern-Variant"],
		formeOrder: ["Noivern", "Noivern-Variant"],
	},
	noivernvariant: {
		name: "Noivern-Variant",
		baseSpecies: "Noivern",
		forme: "Variant",
		copyData: "Noivern",

		types: ["Fighting", "Dragon"],
		baseStats: {hp: 95, atk: 70, def: 80, spa: 97, spd: 80, spe: 113},
		abilities: {0: "Levitate"},
		movepoolAdditions: ["aurasphere", "bulldoze", "rocktomb", "vacuumwave"],
		movepoolDeletions: ["boomburst", "dragondance"],

		prevo: "Noibat",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		creator: "Hematite",
	},

	drilbur: {
		inherit: true,
		otherFormes: ["Drilbur-Hisui"],
		formeOrder: ["Drilbur", "Drilbur-Hisui"],
	},
	drilburhisui: {
		name: "Drilbur-Hisui",
		baseSpecies: "Drilbur",
		forme: "Hisui",
		copyData: "Drilbur",

		types: ["Ground", "Normal"],
		abilities: {0: "Centrifuge", 1: "Sand Force", H: "Technician"},
		movepoolAdditions: ["feint", "knockoff"],
		movepoolDeletions: ["honeclaws", "irondefense", "ironhead", "metalclaw", "metalsound", "rockslide", "steelbeam", "swordsdance"],

		evos: ["Excadrill-Hisui"],
		creator: "ausma",
	},
	excadrill: {
		inherit: true,
		otherFormes: ["Excadrill-Hisui"],
		formeOrder: ["Excadrill", "Excadrill-Hisui"],
	},
	excadrillhisui: {
		name: "Excadrill-Hisui",
		baseSpecies: "Excadrill",
		forme: "Hisui",
		copyData: "Excadrill",

		types: ["Ground", "Normal"],
		abilities: {0: "Centrifuge", 1: "Sand Force", H: "Technician"},
		movepoolAdditions: ["feint", "knockoff"],
		movepoolDeletions: ["honeclaws", "irondefense", "ironhead", "metalclaw", "metalsound", "rockslide", "steelbeam", "swordsdance"],

		prevo: "Drilbur-Hisui",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		creator: "ausma",
	},

	fearow: {
		inherit: true,
		evos: ["Endurow"],
	},
	endurow: {
		name: "Endurow",
		copyData: "Fearow",

		types: ["Flying"],
		baseStats: {hp: 82, atk: 110, def: 65, spa: 61, spd: 61, spe: 118},
		abilities: {0: "Stamina", H: "Sniper"},
		movepoolAdditions: ["acrobatics", "bravebird", "superpower"],

		prevo: "Fearow",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		creator: "Violet",
	},

	wailmer: {
		inherit: true,
		otherFormes: ["Wailmer-Ultra"],
		formeOrder: ["Wailmer", "Wailmer-Ultra"],
	},
	wailmerultra: {
		name: "Wailmer-Ultra",
		baseSpecies: "Wailmer",
		forme: "Ultra",
		copyData: "Wailmer",
		gender: "N",

		types: ["Psychic"],
		baseStats: {hp: 131, atk: 71, def: 31, spa: 71, spd: 37, spe: 59},
		abilities: {0: "Illuminate", 1: "Oblivious", S: "Beast Boost"},
		movepoolAdditions: ["calmmind", "futuresight", "gravity", "mirrorcoat", "storedpower", "trickroom", "wish"],
		movepoolDeletions: ["bodypress", "soak", "waterfall", "waterspout"],

		evos: ["Wailord-Ultra"],
		creator: "abismal",
	},
	wailord: {
		inherit: true,
		otherFormes: ["Wailord-Ultra"],
		formeOrder: ["Wailord", "Wailord-Ultra"],
	},
	wailordultra: {
		name: "Wailord-Ultra",
		baseSpecies: "Wailord",
		forme: "Ultra",
		copyData: "Wailord",
		gender: "N",

		types: ["Psychic"],
		baseStats: {hp: 173, atk: 89, def: 43, spa: 89, spd: 47, spe: 59},
		abilities: {0: "Illuminate", 1: "Oblivious", S: "Beast Boost"},
		movepoolAdditions: ["calmmind", "futuresight", "gravity", "mirrorcoat", "overheat", "storedpower", "trickroom", "wish"],
		movepoolDeletions: ["bodypress", "liquidation", "soak", "waterfall", "waterspout"],

		prevo: "Wailmer-Ultra",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		creator: "abismal",
	},

	hypno: {
		inherit: true,
		evos: ["Mezmir"],
	},
	mezmir: {
		name: "Mezmir",
		copyData: "Hypno",

		types: ["Psychic", "Fighting"],
		baseStats: {hp: 90, atk: 103, def: 70, spa: 73, spd: 115, spe: 77},
		abilities: {0: "Comatose", 1: "Forewarn", H: "Inner Focus"},

		prevo: "Hypno",
		evoType: "levelExtra",
		evoCondition: "while asleep at night",
		creator: "quagsi",
	},

	spewpa: {
		inherit: true,
		evos: ["Vivillon", "Coconfetti"],
	},
	coconfetti: {
		name: "Coconfetti",
		copyData: "Vivillon",

		types: ["Bug"],
		baseStats: {hp: 80, atk: 70, def: 90, spa: 27, spd: 35, spe: 109},
		abilities: {0: "Fluffy", H: "Friend Guard"},
		movepoolAdditions: ["bodypress", "cottonguard", "cottonspore", "leechlife", "recover", "reflect"],
		movepoolDeletions: ["acrobatics", "aerialace", "gust", "hurricane", "lightscreen", "quiverdance", "roost", "tailwind"],

		prevo: "Spewpa",
		evoLevel: 50,
		evoCondition: "with 252 EVs in Defense",
		creator: "quagsi",
	},

	accelgor: {
		inherit: true,
		evos: ["Velocinobi"],
	},
	velocinobi: {
		name: "Velocinobi",
		copyData: "Accelgor",

		types: ["Bug", "Ghost"],
		baseStats: {hp: 80, atk: 95, def: 20, spa: 105, spd: 90, spe: 145},
		abilities: {0: "Shed Skin", 1: "Technician", H: "Unburden"},
		movepoolAdditions: ["hex", "lunge", "shadowball", "strengthsap"],

		prevo: "Accelgor",
		evoType: "trade",
		evoItem: "Reaper Cloth",
		creator: "quagsi",
	},

	vespiquen: {
		inherit: true,
		evos: ["Oonabee"],
	},
	oonabee: {
		name: "Oonabee",
		copyData: "Vespiquen",
		gender: "F",

		types: ["Bug", "Fairy"],
		baseStats: {hp: 85, atk: 90, def: 110, spa: 100, spd: 110, spe: 60},
		abilities: {0: "Pressure", 1: "Flash Fire", H: "Flare Boost"},
		movepoolAdditions: ["dazzlinggleam", "drainingkiss", "heatwave", "psychoshift"],

		prevo: "Vespiquen",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		creator: "BlueRay",
	},

	karrablast: {
		inherit: true,
		evos: ["Escavalier", "Escavalier-Variant"],
	},
	escavalier: {
		inherit: true,
		otherFormes: ["Escavalier-Variant"],
		formeOrder: ["Escavalier", "Escavalier-Variant"],
	},
	escavaliervariant: {
		name: "Escavalier-Variant",
		baseSpecies: "Escavalier",
		forme: "Variant",
		copyData: "Escavalier",

		types: ["Ghost"],
		abilities: {0: "Shed Skin", 1: "Chain Link", H: "Overcoat"},
		movepoolAdditions: ["phantomforce", "willowisp"],

		prevo: "Karrablast",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		creator: "BlueRay",
	},

	curski: {
		name: "Curski",
		copyData: "Spiritomb", // does not grant Eviolite access (compare Melmetal)

		types: ["Dark"],
		baseStats: {hp: 50, atk: 117, def: 108, spa: 92, spd: 108, spe: 35},
		abilities: {0: "Dark Aura", H: "Infiltrator"},
		movepoolAdditions: ["assurance", "baddybad", "punishment"],

		creator: "KeroseneZanchu",
	},

	sinistea: {
		inherit: true,
		otherFormes: ["Sinistea-Dark-Roast"],
		formeOrder: ["Sinistea", "Sinistea-Dark-Roast"],
	},
	sinisteadarkroast: {
		name: "Sinistea-Dark-Roast",
		baseSpecies: "Sinistea",
		forme: "Dark-Roast",
		copyData: "Sinistea",
		gender: "N",

		types: ["Dark"],
		baseStats: {hp: 50, atk: 45, def: 35, spa: 54, spd: 74, spe: 50},
		abilities: {0: "Bulletproof", H: "Insomnia"},
		movepoolAdditions: ["blizzard", "encore", "frostbreath", "frustration", "hail", "hiddenpower", "icebeam", "icywind", "raindance", "return", "snatch", "taunt", "toxic"],
		movepoolDeletions: ["hex", "shellsmash"],

		evos: ["Polteageist-Cold-Brew"],
		creator: "Hematite",
	},
	polteageist: {
		inherit: true,
		otherFormes: ["Polteageist-Cold-Brew"],
		formeOrder: ["Polteageist", "Polteageist-Cold-Brew"],
	},
	polteageistcoldbrew: {
		name: "Polteageist-Cold-Brew",
		baseSpecies: "Polteageist",
		forme: "Cold-Brew",
		copyData: "Polteageist",
		gender: "N",

		types: ["Dark", "Ice"],
		baseStats: {hp: 80, atk: 65, def: 45, spa: 114, spd: 134, spe: 70},
		abilities: {0: "Bulletproof", H: "Insomnia"},
		movepoolAdditions: ["blizzard", "encore", "frostbreath", "frustration", "hail", "hiddenpower", "icebeam", "icywind", "raindance", "return", "snatch", "taunt", "toxic"],
		movepoolDeletions: ["hex", "shellsmash"],

		prevo: "Sinistea-Dark-Roast",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		creator: "Hematite",
	},

	granbull: {
		inherit: true,
		evos: ["Constabull"],
	},
	constabull: {
		name: "Constabull",
		copyData: "Granbull",

		baseStats: {hp: 93, atk: 130, def: 110, spa: 80, spd: 80, spe: 32},
		abilities: {0: "Intimidate", 1: "Early Bird", H: "Iron Barbs"},
		movepoolAdditions: ["coaching", "smackdown"],

		prevo: "Granbull",
		evoLevel: 40,
		creator: "inkbug",
	},

	// SLATE 4

	eevee: {
		inherit: true,
		evos: ["Vaporeon", "Jolteon", "Flareon", "Espeon", "Umbreon", "Leafeon", "Glaceon", "Sylveon", "Aleon"],
	},
	aleon: {
		name: "Aleon",
		copyData: "Eevee",

		baseStats: {hp: 103, atk: 79, def: 53, spa: 89, spd: 67, spe: 134},
		abilities: {0: "Adaptability", H: "Normalize", S: "Beast Boost"},
		movepoolAdditions: [
			"blizzard", "chargebeam", "discharge", "expandingforce", "futuresight", "gigaimpact", "haze", "hyperbeam", "icebeam", "icywind", "magiccoat",
			"naturepower", "psychic", "psyshock", "reflect", "reflecttype", "risingvoltage", "scald", "shockwave", "signalbeam", "skillswap", "snarl", "solarbeam",
			"suckerpunch", "surf", "terrainpulse", "thunder", "thunderbolt", "thunderwave", "trick", "voltswitch", "waterpulse", "wonderroom", "zapcannon",
		],

		prevo: "Eevee",
		evoType: "levelExtra",
		evoCondition: "in Ultra Space",
		creator: "inkbug",
	},


	watchog: {
		inherit: true,
		evos: ["Chukaurd"],
	},
	chukaurd: {
		name: "Chukaurd",
		copyData: "Watchog",

		baseStats: {hp: 85, atk: 110, def: 69, spa: 85, spd: 69, spe: 99},
		abilities: {0: "Tinted Lens", 1: "Scrappy", H: "Analytic"},
		movepoolAdditions: ["glare", "obstruct"],

		prevo: "Watchog",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		creator: "quagsi",
	},

	seel: {
		inherit: true,
		otherFormes: ["Seel-Variant"],
		formeOrder: ["Seel", "Seel-Variant"],
	},
	seelvariant: {
		name: "Seel-Variant",
		baseSpecies: "Seel",
		forme: "Variant",
		copyData: "Seel",

		types: ["Normal"],
		baseStats: {hp: 65, atk: 35, def: 55, spa: 65, spd: 70, spe: 35},
		abilities: {0: "Hydration", 1: "Adaptability", H: "Thick Fat"},
		movepoolAdditions: ["recover"],

		evos: ["Dewgong-Variant"],
		creator: "Magmajudis",
	},
	dewgong: {
		inherit: true,
		otherFormes: ["Dewgong-Variant"],
		formeOrder: ["Dewgong", "Dewgong-Variant"],
	},
	dewgongvariant: {
		name: "Dewgong-Variant",
		baseSpecies: "Dewgong",
		forme: "Variant",
		copyData: "Dewgong",

		types: ["Normal"],
		baseStats: {hp: 90, atk: 50, def: 80, spa: 110, spd: 95, spe: 50},
		abilities: {0: "Hydration", 1: "Adaptability", H: "Thick Fat"},
		movepoolAdditions: ["recover"],

		prevo: "Seel-Variant",
		evoLevel: 34,
		creator: "Magmajudis",
	},

	spinda: {
		inherit: true,
		evos: ["Trippan"],
	},
	trippan: {
		name: "Trippan",
		copyData: "Spinda",

		baseStats: {hp: 111, atk: 69, def: 70, spa: 60, spd: 70, spe: 114},
		abilities: {0: "Truant", 1: "Tangled Feet", H: "Contrary"},
		movepoolAdditions: ["uturn"],

		prevo: "Spinda",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		creator: "abismal",
	},

	whismur: {
		inherit: true,
		otherFormes: ["Whismur-Variant"],
		formeOrder: ["Whismur", "Whismur-Variant"],
	},
	whismurvariant: {
		name: "Whismur-Variant",
		baseSpecies: "Whismur",
		forme: "Variant",
		copyData: "Whismur",

		types: ["Normal", "Electric"],
		abilities: {0: "Blowout"},
		movepoolAdditions: ["overdrive", "risingvoltage", "thunderbolt", "thunderwave", "voltswitch"],
		movepoolDeletions: ["avalanche", "blizzard", "hydropump", "icebeam", "icefang", "icepunch", "icywind", "surf"],

		evos: ["Loudred-Variant"],
		creator: "ausma",
	},
	loudred: {
		inherit: true,
		otherFormes: ["Loudred-Variant"],
		formeOrder: ["Loudred", "Loudred-Variant"],
	},
	loudredvariant: {
		name: "Loudred-Variant",
		baseSpecies: "Loudred",
		forme: "Variant",
		copyData: "Loudred",

		types: ["Normal", "Electric"],
		abilities: {0: "Blowout"},
		movepoolAdditions: ["drainpunch", "overdrive", "risingvoltage", "thunderbolt", "thunderwave", "voltswitch"],
		movepoolDeletions: ["avalanche", "blizzard", "hydropump", "icebeam", "icefang", "icepunch", "icywind", "surf"],

		evos: ["Boomblare"],
		prevo: "Whismur-Variant",
		evoLevel: 20,
		creator: "ausma",
	},
	boomblare: {
		name: "Boomblare",
		copyData: "Exploud",

		types: ["Normal", "Electric"],
		baseStats: {hp: 104, atk: 116, def: 58, spa: 76, spd: 58, spe: 78},
		abilities: {0: "Blowout"},
		movepoolAdditions: ["drainpunch", "overdrive", "risingvoltage", "thunderbolt", "thunderwave", "voltswitch"],
		movepoolDeletions: ["avalanche", "blizzard", "hydropump", "icebeam", "icefang", "icepunch", "icywind", "surf"],

		prevo: "Loudred-Variant",
		evoLevel: 40,
		creator: "ausma",
	},

	starly: {
		inherit: true,
		otherFormes: ["Starly-Crown", "Starly-Crown-Cloud"],
		formeOrder: ["Starly", "Starly-Crown", "Starly-Crown-Cloud"],
	},
	starlycrown: {
		name: "Starly-Crown",
		baseSpecies: "Starly",
		forme: "Crown",
		copyData: "Starly",

		abilities: {0: "Murmuration"},
		movepoolAdditions: ["flurry", "rapidspin", "retaliate"],
		movepoolDeletions: ["bravebird", "doubleedge", "frustration", "return", "takedown", "workup"],

		creator: "KeroseneZanchu",
	},
	starlycrowncloud: {
		name: "Starly-Crown-Cloud",
		baseSpecies: "Starly",
		forme: "Crown-Cloud",
		copyData: "Starly",

		baseStats: {hp: 40, atk: 120, def: 170, spa: 50, spd: 161, spe: 100},
		abilities: {0: "Murmuration"},
		movepoolAdditions: ["flurry", "rapidspin", "retaliate"],
		movepoolDeletions: ["bravebird", "doubleedge", "frustration", "return", "takedown", "workup"],

		requiredAbility: "Murmuration",
		battleOnly: "Starly-Crown",
		creator: "KeroseneZanchu",
	},

	snom: {
		inherit: true,
		otherFormes: ["Snom-Variant"],
		formeOrder: ["Snom", "Snom-Variant"],
	},
	snomvariant: {
		name: "Snom-Variant",
		baseSpecies: "Snom",
		forme: "Variant",
		copyData: "Snom",

		types: ["Normal", "Bug"],
		abilities: {0: "Shield Dust", 1: "Fur Coat", H: "Scale Shift"},
		movepoolAdditions: ["dispersion", "hypervoice"],
		movepoolDeletions: ["aurorabeam", "auroraveil", "avalanche", "blizzard", "hail", "icebeam", "iciclespear", "mist", "powdersnow", "tripleaxel"],

		evos: ["Frosmoth-Variant"],
		creator: "BlueRay",
	},
	frosmoth: {
		inherit: true,
		otherFormes: ["Frosmoth-Variant"],
		formeOrder: ["Frosmoth", "Frosmoth-Variant"],
	},
	frosmothvariant: {
		name: "Frosmoth-Variant",
		baseSpecies: "Frosmoth",
		forme: "Variant",
		copyData: "Frosmoth",

		types: ["Normal", "Bug"],
		abilities: {0: "Shield Dust", 1: "Fur Coat", H: "Scale Shift"},
		movepoolAdditions: ["dispersion", "hypervoice"],
		movepoolDeletions: ["aurorabeam", "auroraveil", "avalanche", "blizzard", "hail", "icebeam", "iciclespear", "mist", "powdersnow", "tripleaxel"],

		prevo: "Snom-Variant",
		evoType: "levelFriendship",
		evoCondition: "at night",
		creator: "BlueRay",
	},

	baltoy: {
		inherit: true,
		otherFormes: ["Baltoy-Variant"],
		formeOrder: ["Baltoy", "Baltoy-Variant"],
	},
	baltoyvariant: {
		name: "Baltoy-Variant",
		baseSpecies: "Baltoy",
		forme: "Variant",
		copyData: "Baltoy",
		gender: "N",

		types: ["Normal"],
		abilities: {0: "Telepathy", H: "Anticipation"},
		movepoolAdditions: ["bodyslam", "workup"],
		movepoolDeletions: [
			"bulldoze", "dazzlinggleam", "dig", "drillrun", "earthpower", "earthquake", "frustration", "grassknot", "gyroball", "hiddenpower", "icebeam",
			"nastyplot", "rockslide", "rocktomb", "sandtomb", "scorchingsands", "signalbeam", "stoneedge",
		],

		evos: ["Playdol"],
		creator: "Violet",
	},
	playdol: {
		name: "Playdol",
		copyData: "Claydol",
		gender: "N",

		types: ["Normal", "Ghost"],
		baseStats: {hp: 60, atk: 85, def: 90, spa: 85, spd: 105, spe: 75},
		abilities: {0: "Telepathy", H: "Anticipation"},
		movepoolAdditions: ["bodyslam", "workup"],
		movepoolDeletions: [
			"bulldoze", "dazzlinggleam", "dig", "drillrun", "earthpower", "earthquake", "frustration", "grassknot", "gyroball", "hiddenpower", "icebeam",
			"nastyplot", "rockslide", "rocktomb", "sandtomb", "scorchingsands", "signalbeam", "stoneedge",
		],

		prevo: "Baltoy-Variant",
		evoLevel: 36,
		creator: "Violet",
	},

	michu: {
		name: "Michu",
		copyData: "Mimikyu",

		types: ["Normal", "Fairy"],
		baseStats: {hp: 35, atk: 80, def: 60, spa: 30, spd: 95, spe: 101},
		abilities: {0: "Rattled"},
		movepoolDeletions: ["nightmare", "phantomforce", "shadowsneak", "woodhammer"],

		evos: ["Mimikyu"],
		creator: "Hematite",
	},
	mimikyu: {
		inherit: true,
		prevo: "Michu",
		evoType: "levelFriendship",
	},

	luvdisc: {
		inherit: true,
		evos: ["Adourami"],
	},
	adourami: {
		name: "Adourami",
		copyData: "Luvdisc",

		types: ["Water", "Fairy"],
		baseStats: {hp: 63, atk: 30, def: 85, spa: 95, spd: 105, spe: 112},
		abilities: {0: "Swift Swim", 1: "Soul-Heart", H: "Unburden"},
		movepoolAdditions: ["coaching", "dazzlinggleam", "faketears"],

		prevo: "Luvdisc",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		creator: "BlueRay",
	},

	sizzlipede: {
		inherit: true,
		otherFormes: ["Sizzlipede-Kanto"],
		formeOrder: ["Sizzlipede", "Sizzlipede-Kanto"],
	},
	sizzlipedekanto: {
		name: "Sizzlipede-Kanto",
		baseSpecies: "Sizzlipede",
		forme: "Kanto",
		copyData: "Sizzlipede",

		types: ["Electric", "Poison"],
		abilities: {0: "Lightning Rod", 1: "Battery", H: "Static"},
		movepoolAdditions: [
			"charge", "electroweb", "gunkshot", "hiddenpower", "raindance", "risingvoltage", "sludgebomb", "thunder", "thunderwave", "thunderbolt", "toxic",
			"wildcharge",
		],
		movepoolDeletions: [
			"burnup", "ember", "fireblast", "firelash", "firespin", "flamewheel", "flamethrower", "flareblitz", "heatcrash", "inferno", "mysticalfire", "sunnyday",
		],

		evos: ["Centiskorch-Kanto"],
		creator: "quagsi",
	},
	centiskorch: {
		inherit: true,
		otherFormes: ["Centiskorch-Kanto"],
		formeOrder: ["Centiskorch", "Centiskorch-Kanto"],
	},
	centiskorchkanto: {
		name: "Centiskorch-Kanto",
		baseSpecies: "Centiskorch",
		forme: "Kanto",
		copyData: "Centiskorch",

		types: ["Electric", "Poison"],
		abilities: {0: "Lightning Rod", 1: "Battery", H: "Static"},
		movepoolAdditions: [
			"charge", "electroweb", "gunkshot", "hiddenpower", "raindance", "risingvoltage", "sludgebomb", "thunder", "thunderwave", "thunderbolt", "toxic",
			"wildcharge",
		],
		movepoolDeletions: [
			"burnup", "ember", "fireblast", "firelash", "firespin", "flamewheel", "flamethrower", "flareblitz", "heatcrash", "inferno", "mysticalfire", "sunnyday",
		],

		prevo: "Sizzlipede-Kanto",
		evoLevel: 28,
		creator: "quagsi",
	},

	flaaffy: {
		inherit: true,
		evos: ["Ampharos", "Voltangent"],
	},
	voltangent: {
		name: "Voltangent",
		copyData: "Ampharos",

		types: ["Electric", "Dragon"],
		baseStats: {hp: 100, atk: 115, def: 85, spa: 75, spd: 90, spe: 45},
		abilities: {0: "Regenerator", H: "Minus"},
		movepoolAdditions: ["dracometeor"],

		prevo: "Flaaffy",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		creator: "Paulluxx",
	},

	luxio: {
		inherit: true,
		evos: ["Luxray", "Luxray-Johto"],
	},
	luxray: {
		inherit: true,
		otherFormes: ["Luxray-Johto"],
		formeOrder: ["Luxray", "Luxray-Johto"],
	},
	luxrayjohto: {
		name: "Luxray-Johto",
		baseSpecies: "Luxray",
		forme: "Johto",
		copyData: "Luxray",

		types: ["Electric", "Fairy"],
		baseStats: {hp: 80, atk: 95, def: 79, spa: 120, spd: 79, spe: 70},
		abilities: {0: "Infiltrator", 1: "Intimidate", H: "Pixilate"},
		movepoolAdditions: ["dazzlinggleam", "drainingkiss", "psychoshift"],

		prevo: "Luxio",
		evoLevel: 30,
		creator: "abismal",
	},

	onix: {
		inherit: true,
		otherFormes: ["Onix-Crystal"],
		formeOrder: ["Onix", "Onix-Crystal"],
	},
	onixcrystal: {
		name: "Onix-Crystal",
		baseSpecies: "Onix",
		forme: "Crystal",
		copyData: "Onix",

		types: ["Ice"],
		baseStats: {hp: 35, atk: 30, def: 160, spa: 45, spd: 45, spe: 70},
		abilities: {0: "Clear Body", 1: "Dry Skin", H: "Sheer Force"},
		movepoolAdditions: ["blizzard", "freezedry", "hail", "icebeam", "icywind"],

		evos: ["Steelix-Crystal"],
		creator: "BlueRay",
	},
	steelix: {
		inherit: true,
		otherFormes: ["Steelix-Mega", "Steelix-Crystal"],
		formeOrder: ["Steelix", "Steelix-Mega", "Steelix-Crystal"],
	},
	steelixcrystal: {
		name: "Steelix-Crystal",
		baseSpecies: "Steelix",
		forme: "Crystal",
		copyData: "Steelix",

		types: ["Ice"],
		baseStats: {hp: 75, atk: 55, def: 200, spa: 85, spd: 65, spe: 30},
		abilities: {0: "Clear Body", 1: "Dry Skin", H: "Sheer Force"},
		movepoolAdditions: ["blizzard", "freezedry", "hail", "icebeam", "icywind"],

		prevo: "Onix-Crystal",
		evoType: "trade",
		evoItem: "Never-Melt Ice",
		creator: "BlueRay",
	},

	solosis: {
		inherit: true,
		otherFormes: ["Solosis-Neural"],
		formeOrder: ["Solosis", "Solosis-Neural"],
	},
	solosisneural: {
		name: "Solosis-Neural",
		baseSpecies: "Solosis",
		forme: "Neural",
		copyData: "Solosis",

		types: ["Fighting"],
		baseStats: {hp: 45, atk: 105, def: 30, spa: 30, spd: 50, spe: 30},
		abilities: {0: "Overcoat", 1: "Electric Surge", H: "Regenerator"},
		movepoolAdditions: ["axonrush", "bulkup", "earthquake", "fakeout"],
		movepoolDeletions: ["calmmind", "lightscreen", "magiccoat", "psychic", "psyshock", "storedpower"],

		evos: ["Duosion-Neural"],
		creator: "ausma",
	},
	duosion: {
		inherit: true,
		otherFormes: ["Duosion-Neural"],
		formeOrder: ["Duosion", "Duosion-Neural"],
	},
	duosionneural: {
		name: "Duosion-Neural",
		baseSpecies: "Duosion",
		forme: "Neural",
		copyData: "Duosion",

		types: ["Fighting"],
		baseStats: {hp: 65, atk: 125, def: 40, spa: 40, spd: 60, spe: 40},
		abilities: {0: "Overcoat", 1: "Electric Surge", H: "Regenerator"},
		movepoolAdditions: ["axonrush", "bulkup", "earthquake", "fakeout"],
		movepoolDeletions: ["calmmind", "lightscreen", "magiccoat", "psychic", "psyshock", "storedpower"],

		evos: ["Reuniclus-Neural"],
		prevo: "Solosis-Neural",
		evoLevel: 32,
		creator: "ausma",
	},
	reuniclus: {
		inherit: true,
		otherFormes: ["Reuniclus-Neural"],
		formeOrder: ["Reuniclus", "Reuniclus-Neural"],
	},
	reuniclusneural: {
		name: "Reuniclus-Neural",
		baseSpecies: "Reuniclus",
		forme: "Neural",
		copyData: "Reuniclus",

		types: ["Fighting"],
		baseStats: {hp: 110, atk: 125, def: 65, spa: 65, spd: 85, spe: 40},
		abilities: {0: "Overcoat", 1: "Electric Surge", H: "Regenerator"},
		movepoolAdditions: ["axonrush", "bulkup", "earthquake", "fakeout"],
		movepoolDeletions: ["calmmind", "lightscreen", "magiccoat", "psychic", "psyshock", "storedpower"],

		prevo: "Duosion-Neural",
		evoLevel: 41,
		creator: "ausma",
	},

	arbok: {
		inherit: true,
		evos: ["Condana"],
	},
	condana: {
		name: "Condana",
		copyData: "Arbok",
		otherFormes: ["Condana-Coiled"],
		formeOrder: ["Condana", "Condana-Coiled"],

		types: ["Poison", "Dark"],
		baseStats: {hp: 75, atk: 39, def: 120, spa: 39, spd: 120, spe: 115},
		abilities: {0: "Stance Change"},
		movepoolAdditions: ["jawlock", "taunt"],

		prevo: "Arbok",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		creator: "abismal",
	},
	condanacoiled: {
		name: "Condana-Coiled",
		baseSpecies: "Condana",
		forme: "Coiled",
		copyData: "Arbok",

		types: ["Poison", "Dark"],
		baseStats: {hp: 75, atk: 135, def: 49, spa: 135, spd: 49, spe: 65},
		abilities: {0: "Stance Change"},
		movepoolAdditions: ["jawlock", "taunt"],

		requiredAbility: "Stance Change",
		battleOnly: "Condana",
		creator: "abismal",
	},

	marowak: {
		inherit: true,
		evos: ["Resurrectric"],
	},
	resurrectric: {
		name: "Resurrectric",
		copyData: "Marowak",

		types: ["Ground", "Electric"],
		baseStats: {hp: 80, atk: 60, def: 130, spa: 90, spd: 80, spe: 45},
		abilities: {0: "Inner Focus", 1: "Lightning Rod", H: "Battle Armor"},
		movepoolAdditions: ["discharge", "healingwish", "risingvoltage", "thunder", "voltswitch"],

		prevo: "Marowak",
		evoLevel: 40,
		evoType: "levelExtra",
		evoCondition: "in a thunderstorm",
		creator: "Hematite",
	},

	wimpod: {
		inherit: true,
		evos: ["Golisopod", "Narcissopod"],
	},
	narcissopod: {
		name: "Narcissopod",
		copyData: "Golisopod",

		baseStats: {hp: 75, atk: 60, def: 90, spa: 105, spd: 120, spe: 80},
		abilities: {0: "Disengage", H: "Mirror Armor"},
		movepoolAdditions: ["gigadrain", "hydropump"],
		movepoolDeletions: ["brickbreak", "closecombat", "drillrun", "dualchop", "ironhead", "rockslide", "rocktomb", "throatchop"],

		prevo: "Wimpod",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		creator: "Violet",
	},

	blipbug: {
		inherit: true,
		evos: ["Dottler", "Dottler-Variant"],
	},
	dottler: {
		inherit: true,
		otherFormes: ["Dottler-Variant"],
		formeOrder: ["Dottler", "Dottler-Variant"],
	},
	dottlervariant: {
		name: "Dottler-Variant",
		baseSpecies: "Dottler",
		forme: "Variant",
		copyData: "Dottler",

		types: ["Bug", "Electric"],
		baseStats: {hp: 50, atk: 35, def: 80, spa: 90, spd: 50, spe: 30},
		abilities: {0: "Swarm", 1: "Frisk", H: "Cotton Down"},
		movepoolAdditions: ["charge", "electroball", "electroweb", "flash"],
		movepoolDeletions: ["calmmind", "hypnosis"],

		prevo: "Blipbug",
		evoLevel: 10,
		creator: "Magmajudis",
	},
	orbeetle: {
		inherit: true,
		otherFormes: ["Orbeetle-Variant"],
		formeOrder: ["Orbeetle", "Orbeetle-Variant"],
	},
	orbeetlevariant: {
		name: "Orbeetle-Variant",
		baseSpecies: "Orbeetle",
		forme: "Variant",
		copyData: "Orbeetle",

		types: ["Bug", "Electric"],
		baseStats: {hp: 60, atk: 45, def: 110, spa: 120, spd: 80, spe: 90},
		abilities: {0: "Swarm", 1: "Frisk", H: "Cotton Down"},
		movepoolAdditions: ["charge", "electroball", "electroweb", "flash"],
		movepoolDeletions: ["calmmind", "hypnosis"],

		prevo: "Dottler-Variant",
		evoLevel: 30,
		creator: "Magmajudis",
	},

	scyther: {
		inherit: true,
		otherFormes: ["Scyther-Glacial"],
		formeOrder: ["Scyther", "Scyther-Glacial"],
		evos: ["Scizor", "Sundor"],
	},
	sundor: {
		name: "Sundor",
		copyData: "Scizor",

		copyMoves: "Scyther", // although its data is based on Scizor, it doesn't have all of Scizor's moves
		types: ["Bug", "Fighting"],
		baseStats: {hp: 70, atk: 55, def: 80, spa: 110, spd: 80, spe: 105},
		abilities: {0: "Swarm", 1: "Technician", H: "Steadfast"},
		movepoolAdditions: ["aurasphere", "calmmind"],

		prevo: "Scyther",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		creator: "Magmajudis",
	},

	poipole: {
		inherit: true,
		otherFormes: ["Poipole-Terrestrial"],
		formeOrder: ["Poipole", "Poipole-Terrestrial"],
	},
	poipoleterrestrial: {
		name: "Poipole-Terrestrial",
		baseSpecies: "Poipole",
		forme: "Terrestrial",
		copyData: "Poipole",

		types: ["Bug"],
		baseStats: {hp: 73, atk: 67, def: 73, spa: 67, spd: 73, spe: 67},
		abilities: {0: "Regenerator", S: "Beast Boost"},
		movepoolAdditions: ["dazzlinggleam", "rapidspin", "skittersmack", "spikes", "strugglebug", "uturn"],

		evos: ["Naganadel-Terrestrial"],
		creator: "KeroseneZanchu",
	},
	naganadel: {
		inherit: true,
		otherFormes: ["Naganadel-Terrestrial"],
		formeOrder: ["Naganadel", "Naganadel-Terrestrial"],
	},
	naganadelterrestrial: {
		name: "Naganadel-Terrestrial",
		baseSpecies: "Naganadel",
		forme: "Terrestrial",
		copyData: "Naganadel",

		types: ["Bug", "Dragon"],
		baseStats: {hp: 73, atk: 127, def: 73, spa: 127, spd: 73, spe: 67},
		abilities: {0: "Regenerator", S: "Beast Boost"},
		movepoolAdditions: ["dazzlinggleam", "rapidspin", "skittersmack", "strugglebug"],

		prevo: "Poipole-Terrestrial",
		evoType: "levelMove",
		evoMove: "Dragon Pulse",
		creator: "KeroseneZanchu",
	},

	golett: {
		inherit: true,
		otherFormes: ["Golett-Variant"],
		formeOrder: ["Golett", "Golett-Variant"],
	},
	golettvariant: {
		name: "Golett-Variant",
		baseSpecies: "Golett",
		forme: "Variant",
		copyData: "Golett",
		gender: "N",

		types: ["Rock", "Normal"],
		baseStats: {hp: 59, atk: 64, def: 60, spa: 35, spd: 50, spe: 35},
		abilities: {0: "Water Absorb", 1: "Klutz", H: "Immunity"},
		movepoolDeletions: ["phantomforce", "poltergeist", "shadowball"],

		evos: ["Golurk-Variant"],
		creator: "Albatross",
	},
	golurk: {
		inherit: true,
		otherFormes: ["Golurk-Variant"],
		formeOrder: ["Golurk", "Golurk-Variant"],
	},
	golurkvariant: {
		name: "Golurk-Variant",
		baseSpecies: "Golurk",
		forme: "Variant",
		copyData: "Golurk",
		gender: "N",

		types: ["Rock", "Normal"],
		baseStats: {hp: 89, atk: 124, def: 90, spa: 55, spd: 80, spe: 55},
		abilities: {0: "Water Absorb", 1: "Klutz", H: "Poison Heal"},
		movepoolDeletions: ["phantomforce", "poltergeist", "shadowball"],

		prevo: "Golett-Variant",
		evoLevel: 43,
		creator: "Albatross",
	},

	yamask: {
		inherit: true,
		evos: ["Cofagrigus", "Cofagrigus-Unbound"],
	},
	cofagrigus: {
		inherit: true,
		baseForme: "Confined",
		otherFormes: ["Cofagrigus-Unbound"],
		formeOrder: ["Cofagrigus", "Cofagrigus-Unbound"],
	},
	cofagrigusunbound: {
		name: "Cofagrigus-Unbound",
		baseSpecies: "Cofagrigus",
		forme: "Unbound",
		copyData: "Cofagrigus",

		types: ["Dark"],
		baseStats: {hp: 58, atk: 95, def: 145, spa: 50, spd: 90, spe: 45},
		abilities: {0: "Pickpocket", H: "Unburden"},
		movepoolAdditions: ["assurance", "brutalswing", "darkestlariat", "skullbash", "lashout"],

		changesFrom: "Cofagrigus",
		creator: "inkbug",
	},

	horsea: {
		inherit: true,
		otherFormes: ["Horsea-Variant"],
		formeOrder: ["Horsea", "Horsea-Variant"],
	},
	horseavariant: {
		name: "Horsea-Variant",
		baseSpecies: "Horsea",
		forme: "Variant",
		copyData: "Horsea",

		types: ["Dark"],
		abilities: {0: "Poison Point", 1: "Merciless", H: "Damp"},
		movepoolAdditions: ["assurance", "darkpulse", "foulplay", "lashout", "payback", "sludgebomb", "superpower"],
		movepoolDeletions: ["aurorabeam", "blizzard", "hurricane", "icebeam", "icywind"],

		evos: ["Seadra-Variant"],
		creator: "ausma",
	},
	seadra: {
		inherit: true,
		otherFormes: ["Seadra-Variant"],
		formeOrder: ["Seadra", "Seadra-Variant"],
	},
	seadravariant: {
		name: "Seadra-Variant",
		baseSpecies: "Seadra",
		forme: "Variant",
		copyData: "Seadra",

		types: ["Dark"],
		abilities: {0: "Poison Point", 1: "Merciless", H: "Damp"},
		movepoolAdditions: ["assurance", "darkpulse", "foulplay", "lashout", "payback", "sludgebomb", "superpower"],
		movepoolDeletions: ["aurorabeam", "blizzard", "hurricane", "icebeam", "icywind"],

		evos: ["Tyrandra"],
		prevo: "Horsea-Variant",
		evoLevel: 32,
		creator: "ausma",
	},
	tyrandra: {
		name: "Tyrandra",
		copyData: "Kingdra",

		types: ["Dark", "Dragon"],
		baseStats: {hp: 70, atk: 90, def: 95, spa: 90, spd: 95, spe: 100},
		abilities: {0: "Poison Point", 1: "Merciless", H: "Damp"},
		movepoolAdditions: ["assurance", "darkpulse", "foulplay", "lashout", "payback", "sludgebomb", "superpower"],
		movepoolDeletions: ["aurorabeam", "blizzard", "hurricane", "icebeam", "icywind"],

		prevo: "Seadra-Variant",
		evoType: "trade",
		evoItem: "Dragon Scale",
		creator: "ausma",
	},

	lairon: {
		inherit: true,
		evos: ["Aggron", "Aggron-Hisui"],
	},
	aggron: {
		inherit: true,
		otherFormes: ["Aggron-Variant"],
		formeOrder: ["Aggron", "Aggron-Variant"],
	},
	aggronhisui: {
		name: "Aggron-Hisui",
		baseSpecies: "Aggron",
		forme: "Hisui",
		copyData: "Aggron",

		types: ["Steel", "Fighting"],
		baseStats: {hp: 70, atk: 60, def: 180, spa: 110, spd: 60, spe: 50},
		abilities: {0: "Sturdy", 1: "Soundproof", H: "Heavy Metal"},
		movepoolAdditions: ["coaching", "vacuumwave"],
		movepoolDeletions: ["meteorbeam"],

		prevo: "Lairon",
		evoLevel: 42,
		creator: "Violet",
	},

	ufogepi: {
		name: "UFOgepi",
		copyData: "Togepi",
		gender: "N",

		types: ["Steel"],
		baseStats: {hp: 35, atk: 40, def: 65, spa: 20, spd: 65, spe: 20},
		abilities: {0: "Hustle", 1: "Hover Drive", H: "Super Luck"},
		movepoolAdditions: ["flashcannon", "honeclaws", "irondefense", "steelbeam"],
		movepoolDeletions: ["followme", "morningsun", "roost", "softboiled"],

		evos: ["UFOgetic"],
		creator: "quagsi",
	},
	ufogetic: {
		name: "UFOgetic",
		copyData: "Togetic",
		gender: "N",

		types: ["Steel"],
		baseStats: {hp: 55, atk: 80, def: 85, spa: 50, spd: 85, spe: 50},
		abilities: {0: "Hustle", 1: "Hover Drive", H: "Super Luck"},
		movepoolAdditions: ["flashcannon", "honeclaws", "irondefense", "steelbeam"],
		movepoolDeletions: ["followme", "morningsun", "roost", "softboiled"],

		evos: ["UFOgekiss"],
		prevo: "UFOgepi",
		evoType: "levelFriendship",
		creator: "quagsi",
	},
	ufogekiss: {
		name: "UFOgekiss",
		copyData: "Togekiss",
		gender: "N",

		types: ["Steel"],
		baseStats: {hp: 85, atk: 120, def: 95, spa: 60, spd: 95, spe: 90},
		abilities: {0: "Hustle", 1: "Hover Drive", H: "Super Luck"},
		movepoolAdditions: ["flashcannon", "honeclaws", "irondefense", "steelbeam"],
		movepoolDeletions: ["followme", "morningsun", "roost", "softboiled"],

		prevo: "UFOgetic",
		evoType: "useItem",
		evoItem: "Shiny Stone",
		creator: "quagsi",
	},

	klefki: {
		inherit: true,
		otherFormes: ["Klefki-Galar", "Klefki-Galar-Revealed"],
		formeOrder: ["Klefki", "Klefki-Galar", "Klefki-Galar-Revealed"],
	},
	klefkigalar: {
		name: "Klefki-Galar",
		baseSpecies: "Klefki",
		forme: "Galar",
		copyData: "Klefki",

		types: ["Steel", "Dark"],
		baseStats: {hp: 57, atk: 60, def: 106, spa: 70, spd: 87, spe: 90},
		abilities: {0: "Hunger Switch"},
		movepoolAdditions: ["knockoff", "darkpulse", "swordsdance"],

		creator: "Albatross",
	},
	klefkigalarrevealed: {
		name: "Klefki-Galar-Revealed",
		baseSpecies: "Klefki",
		forme: "Galar-Revealed",
		copyData: "Klefki",

		types: ["Fairy", "Dark"],
		baseStats: {hp: 57, atk: 116, def: 50, spa: 70, spd: 87, spe: 90},
		abilities: {0: "Hunger Switch"},
		movepoolAdditions: ["knockoff", "darkpulse", "swordsdance"],

		requiredAbility: "Hunger Switch",
		battleOnly: "Klefki-Galar",
		creator: "Albatross",
	},
//Slate Final: Prompt 1
	scytherglacial: {
		name: "Scyther-Glacial",
		baseSpecies: "Scyther",
		forme: "Glacial",
		copyData: "Scyther",
		
		types: ["Bug", "Ice"],
		baseStats: {hp: 70, atk: 115, def: 80, spa: 45, spd: 80, spe: 110},
		abilities: {0: "Swarm", 1: "Technician", H: "Wind Rider"},//Hopefully that just works.
		movepoolAdditions: ["clatteringblades", "iceshard", "iciclecrash", "icywind", "hail"],
	
		creator: "BlueRay",
	},
	
	dhelmise: {
		inherit: true,
		otherFormes: ["Dhelmise-Variant"],
		formeOrder: ["Dhelmise", "Dhelmise-Variant"],
	},
	dhelmisevariant: {
		name: "Dhelmise-Variant",
		baseSpecies: "Dhelmise",
		forme: "Variant",
		copyData: "Dhelmise",
		
		types: ["Electric", "Ghost"],
		baseStats: {hp: 70, atk: 116, def: 100, spa: 101, spd: 90, spe: 40},
		abilities: {0: "Steelworker", H: "Surge Surfer"},
		movepoolAdditions: ["chargebeam", "risingvoltage", "thunder", "thunderbolt", "thundercage", "thunderwave", "voltswitch"],
		movepoolDeletions: ["absorb", "anchorshot", "energyball", "gigadrain", "grassknot", "grassyglide", "megadrain", "powerwhip", "solarbeam", "solarblade", "synthesis"],
		
		creator: "quagsi",
	},

	sandygast: {
		inherit: true,
		evos: ["Palossand", "Palossnow"],
	},
	palossnow: {
		name: "Palossnow",
		copyData: "Palossand",
		
		types: ["Ghost", "Ice"],
		//copyData base stats
		abilities: {0: "Water Compaction", 1: "Snowpack", H: "Ice Body"},
		movepoolAdditions: ["blizzard", "icebeam", "icywind", "freezedry", "hail", "shaveoff", "trickroom"],
		
		prevo: "Sandygast",
		evoType: "other",
		evoCondition: "On Mt. Lanakila",
		creator: "OctoNerd & Paulluxx",
	},

	zubat: {
		inherit: true,
		otherFormes: ["Zubat-Variant"],
		formeOrder: ["Zubat", "Zubat-Variant"],
	},
	zubatvariant: {
		name: "Zubat-Variant",
		baseSpecies: "Zubat",
		forme: "Variant",
		copyData: "Zubat",
		
		types: ["Poison", "Rock"],
		baseStats: {hp: 40, atk: 50, def: 35, spa: 30, spd: 40, spe: 50},
		abilities: {0: "Solid Rock", H: "Infiltrator"},
		movepoolAdditions: ["sandstorm", "rockslide", "rockblast", "stealthrock", "stoneedge", "smackdown", "dig"],
		movepoolDeletions: ["roost", "toxic", "bravebird", "airslash", "acrobatics", "hurricane", "aircutter", "fly", "aerialace", "dualwingbeat"],
		
		evos: ["Golbat-Variant"],
		eggGroups: ["Mineral"],
		creator: "ausma",
	},
	golbat: {
		inherit: true,
		otherFormes: ["Golbat-Variant"],
		formeOrder: ["Golbat", "Golbat-Variant"],
	},
	golbatvariant: {
		name: "Golbat-Variant",
		baseSpecies: "Golbat",
		forme: "Variant",
		copyData: "Golbat",
		
		types: ["Poison", "Rock"],
		baseStats: {hp: 75, atk: 90, def: 70, spa: 65, spd: 75, spe: 80},
		abilities: {0: "Solid Rock", H: "Infiltrator"},
		movepoolAdditions: ["mineraldrain", "sandstorm", "rockslide", "rockblast", "stealthrock", "stoneedge", "smackdown", "dig"],
		movepoolDeletions: ["roost", "toxic", "bravebird", "airslash", "acrobatics", "hurricane", "aircutter", "fly", "aerialace", "dualwingbeat"],
		
		evos: ["Stalagbat"],
		prevo: "Zubat-Variant",
		evoLevel: 22,
		eggGroups: ["Mineral"],
		creator: "ausma",
	},
	stalagbat: {
		name: "Stalagbat",
		copyData: "Crobat",
		
		types: ["Poison", "Rock"],
		baseStats: {hp: 85, atk: 100, def: 80, spa: 70, spd: 80, spe: 120},
		abilities: {0: "Solid Rock", H: "Infiltrator"},
		movepoolAdditions: ["mineraldrain", "sandstorm", "rockslide", "rockblast", "stealthrock", "stoneedge", "smackdown", "dig"],
		movepoolDeletions: ["roost", "toxic", "bravebird", "airslash", "acrobatics", "hurricane", "aircutter", "fly", "aerialace", "dualwingbeat"],
		
		prevo: "Golbat-Variant",
		evoType: "levelFriendship",
		eggGroups: ["Mineral"],
		creator: "ausma",
	},

	magikarp: {
		inherit: true,
		otherFormes: ["Magikarp-Glacial"],
		formeOrder: ["Magikarp", "Magikarp-Glacial"],
	},
	magikarpglacial: {
		name: "Magikarp-Glacial",
		baseSpecies: "Magikarp",
		forme: "Glacial",
		copyData: "Magikarp",
		
		types: ["Ice", "Water"],
		baseStats: {hp: 60, atk: 10, def: 55, spa: 15, spd: 20, spe: 40},
		abilities: {0: "Ice Body", H: "Rattled"},
		movepoolDeletions: ["hydropump"],
		movepoolAdditions: ["blizzard"],//It's only fair
		
		evos: ["Geyserdos"],
		creator: "Albatross",
	},
	geyserdos: {
		name: "Geyserdos",
		copyData: "Gyarados",
		
		types: ["Ice", "Fire"],
		baseStats: {hp: 105, atk: 115, def: 100, spa: 90, spd: 79, spe: 51},
		abilities: {0: "Intimidate", H: "No Guard"},
		movepoolAdditions: ["firefang"],
		movepoolDeletions: ["aquatail", "hydropump", "powerwhip", "waterfall", "zapcannon"],
		
		prevo: "Magikarp-Glacial",
		evoLevel: 20,
		creator: "Albatross",
	},

	qwilfish: {
		inherit: true,
		otherFormes: ["Qwilfish-Hisui", "Qwilfish-Kalos", "Qwilfish-Kalos-Zen"],
		formeOrder: ["Qwilfish", "Qwilfish-Hisui", "Qwilfish-Kalos", "Qwilfish-Kalos-Zen"],
	},
	qwilfishkalos: {
		name: "Qwilfish-Kalos",
		baseSpecies: "Qwilfish",
		forme: "Kalos",
		copyData: "Qwilfish",
		
		types: ["Steel", "Ghost"],
		baseStats: {hp: 55, atk: 85, def: 70, spa: 85, spd: 50, spe: 95},
		abilities: {0: "Poison Point", 1: "Aftermath", H: "Zen Mode"},
		movepoolAdditions: ["expandingforce", "flashcannon", "futuresight", "psychic", "psychup", "smartstrike", "steelbeam", "trickroom"],
		movepoolDeletions: ["scald"],
		
		evos: ["Overchill"],
		creator: "inkbug",
	},
	qwilfishkaloszen: {
		name: "Qwilfish-Kalos-Zen",
		baseSpecies: "Qwilfish",
		forme: "Kalos-Zen",
		copyData: "Qwilfish",
		
		types: ["Steel", "Psychic"],
		baseStats: {hp: 55, atk: 115, def: 100, spa: 115, spd: 80, spe: 35},
		abilities: {0: "Zen Mode"},
		movepoolAdditions: ["expandingforce", "flashcannon", "futuresight", "psychic", "psychup", "smartstrike", "steelbeam", "trickroom"],
		movepoolDeletions: ["scald"],
		
		requiredAbility: "Zen Mode",
		battleOnly: "Qwilfish-Kalos",
		creator: "inkbug",
	},
	overchill: {
		name: "Overchill",
		copyData: "Overqwil",
		copyMoves: "Qwilfish",
		
		types: ["Steel", "Ghost"],
		baseStats: {hp: 75, atk: 105, def: 80, spa: 95, spd: 60, spe: 95},
		abilities: {0: "Poison Point", 1: "Aftermath", H: "Zen Mode"},
		movepoolAdditions: ["voltswitch", "expandingforce", "flashcannon", "futuresight", "psychic", "psychup", "smartstrike", "steelbeam", "trickroom"],
		movepoolDeletions: ["scald"],
		
		prevo: "Qwilfish-Kalos",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		creator: "inkbug",
	},
	overchillzen: {
		name: "Overchill-Zen",
		baseSpecies: "Overchill",
		forme: "Zen",
		copyData: "Overqwil",
		copyMoves: "Qwilfish",
		
		types: ["Steel", "Psychic"],
		baseStats: {hp: 75, atk: 125, def: 110, spa: 135, spd: 90, spe: 35},
		abilities: {0: "Zen Mode"},
		movepoolAdditions: ["voltswitch", "expandingforce", "flashcannon", "futuresight", "psychic", "psychup", "smartstrike", "steelbeam", "trickroom"],
		movepoolDeletions: ["scald"],
		
		requiredAbility: "Zen Mode",
		battleOnly: "Overchill",
		creator: "inkbug",
	},
	
	stunfisk: {
		inherit: true,
		otherFormes: ["Stunfisk-Galar", "Stunfisk-Variant"],
		formeOrder: ["Stunfisk", "Stunfisk-Galar", "Stunfisk-Variant"],
	},
	stunfiskvariant: {
		name: "Stunfisk-Variant",
		baseSpecies: "Stunfisk",
		forme: "Variant",
		copyData: "Stunfisk",
		
		types: ["Poison", "Flying"],
		baseStats: {hp: 109, atk: 81, def: 84, spa: 66, spd: 99, spe: 32},
		abilities: {0: "Poison Heal", 1: "Limber", H: "Sand Veil"},
		movepoolAdditions: ["aerialace", "airslash", "banefulbunker", "defog", "fly", "toxicspikes"],
		movepoolDeletions: ["charge", "discharge", "earthpower", "electricterrain", "magnetrise", "painsplit", "spark", "stealthrock", "stoneedge", "thunder", "thunderbolt", "thunderwave"],
		
		creator: "abismal",
	},

	venipedepaldea: {
		name: "Venipede-Paldea",
		baseSpecies: "Venipede",
		forme: "Paldea",
		copyData: "Venipede",
		
		types: ["Fire", "Poison"],
		baseStats: {hp: 35, atk: 45, def: 59, spa: 30, spd: 39, spe: 52},
		abilities: {0: "Poison Point", H: "Technician"},
		movepoolAdditions: ["firespin", "sunnyday", "willowisp"],
		
		evos: ["Whirlipede-Paldea"],
		creator: "Magmajudis",
	},
	whirlipedepaldea: {
		name: "Whirlipede-Paldea",
		baseSpecies: "Whirlipede",
		forme: "Paldea",
		copyData: "Whirlipede",
		
		types: ["Fire", "Poison"],
		baseStats: {hp: 55, atk: 55, def: 99, spa: 40, spd: 79, spe: 32},
		abilities: {0: "Poison Point", H: "Technician"},
		movepoolAdditions: ["flamewheel", "firespin", "sunnyday", "willowisp"],
		
		evos: ["Scolipede-Paldea"],
		prevo: "Venipede-Paldea",
		evoLevel: 22,
		creator: "Magmajudis",
	},
	scolipedepaldea: {
		name: "Scolipede-Paldea",
		baseSpecies: "Scolipede",
		forme: "Paldea",
		copyData: "Scolipede",
		
		types: ["Fire", "Poison"],
		baseStats: {hp: 90, atk: 100, def: 89, spa: 55, spd: 69, spe: 82},
		abilities: {0: "Poison Point", H: "Technician"},
		movepoolAdditions: ["firespin", "sunnyday", "willowisp", "flamewheel", "coil", "fireblast", "flamecharge", "flamethrower", "gunkshot", "incinerate", "overheat"],
		
		prevo: "Whirlipede-Paldea",
		evoLevel: 30,
		creator: "Magmajudis",
	},

	trapinch: {
		inherit: true,
		otherFormes: ["Trapinch-Woodland"],
		formeOrder: ["Trapinch", "Trapinch-Woodland"],
	},
	trapinchwoodland: {
		name: "Trapinch-Woodland",
		baseSpecies: "Trapinch",
		forme: "Woodland",
		copyData: "Trapinch",
		
		types: ["Dragon"],
		baseStats: {hp: 45, atk: 90, def: 45, spa: 55, spd: 45, spe: 10},
		abilities: {0: "Shield Dust", 1: "Guts", H: "Serene Grace"},
		movepoolAdditions: ["dragonbreath", "dracometeor", "dragontail", "dragonpulse", "outrage"],
		movepoolDeletions: ["rockslide"],
		
		evos: ["Vibrava-Woodland"],
		creator: "Violet",
	},
	vibrava: {
		inherit: true,
		otherFormes: ["Vibrava-Woodland"],
		formeOrder: ["Vibrava", "Vibrava-Woodland"],
	},
	vibravawoodland: {
		name: "Vibrava-Woodland",
		baseSpecies: "Vibrava",
		forme: "Woodland",
		copyData: "Vibrava",
		
		types: ["Dragon", "Fairy"],
		baseStats: {hp: 50, atk: 60, def: 50, spa: 60, spd: 50, spe: 70},
		abilities: {0: "Shield Dust", 1: "Marvel Scale", H: "Serene Grace"},
		movepoolAdditions: ["dazzlinggleam", "drainingkiss", "chargebeam"],//spirit break evo move
		movepoolDeletions: ["rockslide", "airslash"],
		
		evos: ["Flygon-Woodland"],
		prevo: "Trapinch-Woodland",
		evoLevel: 35,
		creator: "Violet",
	},
	flygon: {
		inherit: true,
		otherFormes: ["Flygon-Woodland"],
		formeOrder: ["Flygon", "Flygon-Woodland"],
	},
	flygonwoodland: {
		name: "Flygon-Woodland",
		baseSpecies: "Flygon",
		forme: "Woodland",
		copyData: "Flygon",
		
		types: ["Dragon", "Fairy"],
		baseStats: {hp: 80, atk: 90, def: 80, spa: 90, spd: 80, spe: 100},
		abilities: {0: "Shield Dust", 1: "Marvel Scale", H: "Serene Grace"},
		movepoolAdditions: ["spiritbreak", "chargebeam", "dazzlinggleam", "drainingkiss"],
		movepoolDeletions: ["rockslide", "airslash", "dragondance"],
		
		prevo: "Vibrava-Woodland",
		evoLevel: 45,
		creator: "Violet",
	},
	//Prompt 2
	vullaby: {
		inherit: true,
		otherFormes: ["Vullaby-Galar"],
		formeOrder: ["Vullaby", "Vullaby-Galar"],
	},
	vullabygalar: {
		name: "Vullaby-Galar",
		baseSpecies: "Vullaby",
		forme: "Galar",
		copyData: "Vullaby",
		
		types: ["Ghost", "Flying"],
		baseStats: {hp: 65, atk: 80, def: 70, spa: 60, spd: 60, spe: 35},
		abilities: {0: "Big Pecks", 1: "Overcoat", H: "Analytic"},
		movepoolAdditions: ["hex", "beakblast"],
		movepoolDeletions: ["foulplay", "knockoff"],
		
		evos: ["Mandibuzz-Galar"],
		creator: "Albatross",
	},
	mandibuzz: {
		inherit: true,
		otherFormes: ["Mandibuzz-Galar"],
		formeOrder: ["Mandibuzz", "Mandibuzz-Galar"],
	},
	mandibuzzgalar: {
		name: "Mandibuzz-Galar",
		baseSpecies: "Mandibuzz",
		forme: "Galar",
		copyData: "Mandibuzz",
		
		types: ["Ghost", "Flying"],
		baseStats: {hp: 105, atk: 90, def: 100, spa: 70, spd: 90, spe: 55},
		abilities: {0: "Big Pecks", 1: "Overcoat", H: "Analytic"},
		movepoolAdditions: ["shadowbone", "hex", "beakblast"],
		movepoolDeletions: ["foulplay", "knockoff"],
		
		prevo: "Vullaby-Galar",
		evoLevel: 54,
		creator: "Albatross",
	},
	cacnea: {
		inherit: true,
		otherFormes: ["Cacnea-Unova"],
		formeOrder: ["Cacnea", "Cacnea-Unova"],
	},
	cacneaunova: {
		name: "Cacnea-Unova",
		baseSpecies: "Cacnea",
		forme: "Unova",
		copyData: "Cacnea",
		
		types: ["Ground"],
		baseStats: {hp: 50, atk: 65, def: 55, spa: 65, spd: 55, spe: 45},
		abilities: {0: "Rattled", H: "Water Absorb"},
		movepoolAdditions: ["bulldoze", "drillrun", "partingshot", "rocktomb", "rockslide"],
		movepoolDeletions: ["poisonjab", "swordsdance"],
		
		evos: ["Cacturne-Unova"],
		creator: "Violet",
	},
	cacturne: {
		inherit: true,
		otherFormes: ["Cacturne-Unova"],
		formeOrder: ["Cacturne", "Cacturne-Unova"],
	},
	cacturneunova: {
		name: "Cacturne-Unova",
		baseSpecies: "Cacturne",
		forme: "Unova",
		copyData: "Cacturne",
		
		types: ["Ground", "Fighting"],
		baseStats: {hp: 70, atk: 95, def: 75, spa: 95, spd: 75, spe: 65},
		abilities: {0: "Rattled", H: "Water Absorb"},
		movepoolAdditions: ["tripleneedle", "bulldoze", "drillrun", "partingshot", "rocktomb", "rockslide"],
		movepoolDeletions: ["poisonjab", "swordsdance"],
		
		prevo: "Cacnea-Unova",
		evoLevel: 32,
		creator: "Violet",
	},
	froslass: {
		inherit: true,
		otherFormes: ["Froslass-Theater", "Froslass-Theater-Unmasked"],
		formeOrder: ["Froslass", "Froslass-Theater", "Froslass-Theater-Unmasked"],
	},
	froslasstheater: {
		name: "Froslass-Theater",
		baseSpecies: "Froslass",
		forme: "Theater",
		copyData: "Froslass",
		gender: "F",
		
		types: ["Ice", "Dark"],
		baseStats: {hp: 70, atk: 100, def: 65, spa: 70, spd: 65, spe: 110},
		abilities: {0: "Ice Face", H: "Cursed Body"},
		movepoolAdditions: ["assurance", "chillyreception", "darkpulse", "foulplay", "knockoff"],
		movepoolDeletions: ["hex", "poltergeist", "willowisp"],//Snorunt gets hex but I'll note it here anyway
		
		prevo: "Snorunt",
		evoType: "useItem",
		evoItem: "Dusk Stone",
		creator: "ausma"
	},
	froslasstheaterunmasked: { //No stat changes, but I assume needs to exist for the Ability to work
		name: "Froslass-Theater-Unmasked",
		baseSpecies: "Froslass",
		forme: "Theater-Unmasked",
		copyData: "Froslass",
		
		types: ["Ice", "Dark"],
		baseStats: {hp: 70, atk: 100, def: 65, spa: 70, spd: 65, spe: 110},
		abilities: {0: "Ice Face"},
		movepoolAdditions: ["assurance", "chillyreception", "darkpulse", "foulplay", "knockoff"],
		movepoolDeletions: ["hex", "poltergeist", "willowisp"],//Snorunt gets hex but I'll note it here anyway
		
		requiredAbility: "Ice Face",
		battleOnly: "Froslass-Theater",
		creator: "ausma",
	},
	passimian: {
		inherit: true,
		otherFormes: ["Passimian-Hoenn"],
		formeOrder: ["Passimian", "Passimian-Hoenn"],
	},
	passimianhoenn: {
		name: "Passimian-Hoenn",
		baseSpecies: "Passimian",
		forme: "Hoenn",
		copyData: "Passimian",
		
		types: ["Fighting", "Ground"],
		baseStats: {hp: 100, atk: 110, def: 90, spa: 40, spd: 60, spe: 90},
		abilities: {0: "Damp", H: "Defiant"},
		movepoolAdditions: ["brine", "courtchange", "earthpower", "muddywater", "razorshell", "scorchingsands"],
		movepoolDeletions: ["closecombat", "energyball", "grassknot", "seedbomb"],
		
		creator: "quagsi",
	},
	clobbopus: {
		inherit: true,
		evos: ["Grapploct", "Neuroboxin"],
	},
	neuroboxin: {
		name: "Neuroboxin",
		copyData: "Grapploct",
		
		types: ["Fighting", "Poison"],
		baseStats: {hp: 108, atk: 90, def: 80, spa: 70, spd: 60, spe: 72},
		abilities: {0: "Limber", H: "Trace"},
		movepoolAdditions: ["acidarmor", "counter", "poisonjab", "raindance", "sludgebomb", "toxic", "trick", "venoshock"],
		
		color: "Red",
		prevo: "Clobbopus",
		evoType: "levelMove",
		evoMove: "Reversal",//Doesnt feel THAT fitting, but 5 levels later than Grapploct/you gotta wait
		creator: "inkbug",
	},
	honedge: {
		inherit: true,
		otherFormes: ["Honedge-Verdant"],
		formeOrder: ["Honedge", "Honedge-Verdant"],
	},
	honedgeverdant: {
		name: "Honedge-Verdant",
		baseSpecies: "Honedge",
		forme: "Verdant",
		copyData: "Honedge",
		
		types: ["Grass"],
		baseStats: {hp: 55, atk: 80, def: 100, spa: 25, spd: 37, spe: 28},
		abilities: {0: "Intrepid Sword", H: "Friend Guard"},
		movepoolAdditions: ["defog", "energyball", "gigadrain", "helpinghand", "leafblade", "tailwind", "whirlwind"],
		movepoolDeletions: ["toxic"],
		
		evos: ["Doublade-Verdant"],
		creator: "BlueRay",
	},
	doublade: {
		inherit: true,
		otherFormes: ["Doublade-Verdant"],
		formeOrder: ["Doublade", "Doublade-Verdant"],
	},
	doubladeverdant: {
		name: "Doublade-Verdant",
		baseSpecies: "Doublade",
		forme: "Verdant",
		copyData: "Doublade",
		
		types: ["Grass"],
		baseStats: {hp: 69, atk: 110, def: 150, spa: 35, spd: 49, spe: 35},
		abilities: {0: "Intrepid Sword", H: "Friend Guard"},
		movepoolAdditions: ["defog", "energyball", "gigadrain", "helpinghand", "leafblade", "tailwind", "whirlwind"],//Honedge has Helping Hand already from TM but it should be evolution move
		movepoolDeletions: ["toxic"],
		
		prevo: "Honedge-Verdant",
		evoLevel: 35,
		evos: ["Aegislash-Verdant"],
		creator: "BlueRay",
	},
	aegislash: {
		inherit: true,
		otherFormes: ["Aegislash-Blade", "Aegislash-Verdant", "Aegislash-Verdant-Blade"],
		formeOrder: ["Aegislash", "Aegislash-Blade", "Aegislash-Verdant", "Aegislash-Verdant-Blade"],
	},
	aegislashverdant: {
		name: "Aegislash-Verdant",
		baseSpecies: "Aegislash",
		forme: "Verdant",
		copyData: "Aegislash",
		
		types: ["Grass", "Steel"],
		baseStats: {hp: 70, atk: 45, def: 140, spa: 45, spd: 140, spe: 60},
		abilities: {0: "Stance Change"},
		movepoolAdditions: ["flurry", "defog", "energyball", "gigadrain", "helpinghand", "leafblade", "tailwind", "whirlwind"],
		movepoolDeletions: ["toxic"],
		
		prevo: "Doublade-Verdant",
		evoType: "useItem",
		evoItem: "Leaf Stone",
		creator: "BlueRay",
	},
	aegislashverdantblade: {
		name: "Aegislash-Verdant-Blade",
		baseSpecies: "Aegislash",
		forme: "Verdant-Blade",
		copyData: "Aegislash",
		
		types: ["Grass", "Flying"],
		baseStats: {hp: 70, atk: 140, def: 45, spa: 140, spd: 45, spe: 60},
		abilities: {0: "Stance Change"},
		movepoolAdditions: ["flurry", "defog", "energyball", "gigadrain", "helpinghand", "leafblade", "tailwind", "whirlwind"],
		movepoolDeletions: ["toxic"],
		
		requiredAbility: "Stance Change",
		battleOnly: "Aegislash-Verdant",
		creator: "BlueRay",
	},
	psiamat: {
		name: "Psiamat",
		copyData: "Meowstic",//Phione-like ""adjacent""; no evolutionary connection
		gender: "N",
		
		types: ["Psychic"],
		baseStats: {hp: 84, atk: 48, def: 86, spa: 93, spd: 91, spe: 91},
		abilities: {0: "Trace", 1: "Telepathy", H: "Technician"},
		movepoolAdditions: ["twinbeam", "extrasensory", "futuresight", "magicalleaf", "mefirst", "storedpower"],//new move + Meowstic-F's moves (cant be bothered)
		
		creator: "Paulluxx",
	},
	seviper: {
		inherit: true,
		otherFormes: ["Seviper-Hisui"],
		formeOrder: ["Seviper", "Seviper-Hisui"],
	},
	seviperhisui: {
		name: "Seviper-Hisui",
		baseSpecies: "Seviper",
		forme: "Hisui",
		copyData: "Seviper",
		
		types: ["Fairy"],
		baseStats: {hp: 83, atk: 45, def: 90, spa: 90, spd: 70, spe: 80},
		abilities: {0: "Poison Heal", H: "Infiltrator"},
		movepoolAdditions: ["charm", "dazzlinggleam", "moonblast", "takeheart"],
		
		creator: "abismal",
	},
	lilligant: {
		inherit: true,
		otherFormes: ["Lilligant-Hisui", "Lilligant-Kalos"],
		formeOrder: ["Lilligant", "Lilligant-Hisui", "Lilligant-Kalos"],
	},
	lilligantkalos: {
		name: "Lilligant-Kalos",
		baseSpecies: "Lilligant",
		forme: "Kalos",
		copyData: "Lilligant",
		gender: "F",
		
		types: ["Grass", "Flying"],
		baseStats: {hp: 90, atk: 110, def: 70, spa: 60, spd: 80, spe: 70},
		abilities: {0: "Chlorophyll", 1: "Wind Rider", H: "Own Tempo"},
		copyMoves: "Petilil",//??? i think?
		movepoolAdditions: ["acrobatics", "aerialace", "airslash", "allyswitch", "defog", "fly", "gigaimpact", "grassyterrain", "hurricane", "hyperbeam", "leafblade", "lightscreen", "metronome", "quiverdance", "roleplay", "solarblade", "tailwind", "tropkick"],
		movepoolDeletions: ["quiverdance"],
		
		prevo: "Petilil",
		evoType: "useItem",
		evoItem: "Sun Stone",
		creator: "Magmajudis",
	},
	//Prompt 3
	dedenne: {
		inherit: true,
		evos: ["Dedellite"],
	},
	dedellite: {
		name: "Dedellite",
		copyData: "Dedenne",
		
		types: ["Electric", "Fairy"],
		baseStats: {hp: 67, atk: 68, def: 92, spa: 96, spd: 99, spe: 119},
		abilities: {0: "Cheek Pouch", 1: "Receiver", H: "Plus"},
		movepoolAdditions: ["drainingkiss", "stockpile", "spitup", "swallow", "terrainpulse"],
		
		prevo: "Dedenne",
		evoType: "useItem",
		evoItem: "Shiny Stone",
		creator: "quagsi",
	},
	toxicroak: {
		inherit: true,
		evos: ["Mycecroak"],
	},
	mycecroak: {
		name: "Mycecroak",
		copyData: "Toxicroak",
		
		types: ["Poison", "Fighting"],
		baseStats: {hp: 103, atk: 116, def: 85, spa: 96, spd: 85, spe: 65},
		abilities: {0: "Sticky Hold", 1: "Dry Skin", H: "Poison Touch"},
		movepoolAdditions: ["junglehealing"],
		
		prevo: "Toxicroak",
		evoType: "levelHold",
		evoItem: "Big Mushroom",//If its mad about this im gonna be so sad
		creator: "BlueRay",
	},
	corsola: {
		inherit: true,
		otherFormes: ["Corsola-Galar", "Corsola-Mirage"],
		formeOrder: ["Corsola", "Corsola-Galar", "Corsola-Mirage"],
	},
	corsolamirage: {
		name: "Corsola-Mirage",
		baseSpecies: "Corsola",
		forme: "Mirage",
		copyData: "Corsola",
		
		types: ["Ground"],
		baseStats: {hp: 65, atk: 55, def: 95, spa: 65, spd: 95, spe: 35},
		abilities: {0: "Forewarn", 1: "Natural Cure", H: "Regenerator"},
		movepoolAdditions: ["confusion", "scorchingsands"],
		movepoolDeletions: ["aquaring", "blizzard", "brine", "bubble", "bubblebeam", "hydropump", "icebeam", "iciclespear", "icywind", "irondefense", "lifedew", "raindance", "scald", "suckerpunch", "surf", "throatchop"],
		
		evos: ["Psychosola"],
		creator: "ausma",
	},
	psychosola: {
		name: "Psychosola",
		copyData: "Corsola",//Movepool based on Mirage Corsola, not Cursola
		
		types: ["Ground", "Psychic"],
		baseStats: {hp: 65, atk: 66, def: 125, spa: 90, spd: 145, spe: 30},
		abilities: {0: "Anticipation", 1: "Natural Cure", H: "Regenerator"},
		movepoolAdditions: ["confusion", "scorchingsands", "counter", "futuresight", "psyshock", "trickroom"],
		movepoolDeletions: ["aquaring", "blizzard", "brine", "bubble", "bubblebeam", "hydropump", "icebeam", "iciclespear", "icywind", "irondefense", "lifedew", "raindance", "scald", "suckerpunch", "surf", "throatchop"],
		
		prevo: "Corsola-Mirage",
		evoLevel: 38,
		creator: "ausma",
	},
	meditite: {
		inherit: true,
		evos: ["Medicham", "Spiritite"],
	},
	spiritite: {
		name: "Spiritite",
		copyData: "Meditite",
		
		types: ["Fighting", "Ghost"],
		baseStats: {hp: 30, atk: 20, def: 160, spa: 20, spd: 160, spe: 60},
		abilities: {0: "Sturdy", H: "Telepathy"},
		movepoolAdditions: ["astonish", "willowisp"],
		
		prevo: "Meditite",
		evoType: "levelHold",
		evoItem: "Spell Tag",
		evoCondition: "At below 1/2 max HP",
		creator: "abismal",
	},
	larvesta: {
		inherit: true,
		otherFormes: ["Larvesta-Hisui"],
		formeOrder: ["Larvesta", "Larvesta-Hisui"],
	},
	larvestahisui: {
		name: "Larvesta-Hisui",
		baseSpecies: "Larvesta",
		forme: "Hisui",
		copyData: "Larvesta",
		
		types: ["Bug", "Dark"],
		baseStats: {hp: 55, atk: 85, def: 55, spa: 50, spd: 55, spe: 60},
		abilities: {0: "Flame Body", H: "Swarm"},
		movepoolAdditions: ["burnup", "darkpulse"],
		movepoolDeletions: ["fireblast", "flamethrower", "heatwave", "overheat", "psychic", "quiverdance", "zenheadbutt"],
		
		evos: ["Nympra"],
		creator: "Albatross",
	},
	nympra: {
		name: "Nympra",
		copyData: "Volcarona",
		
		types: ["Bug", "Dark"],
		baseStats: {hp: 105, atk: 85, def: 75, spa: 80, spd: 95, spe: 110},
		abilities: {0: "Flame Body", H: "Adaptability"},
		movepoolAdditions: ["burnup", "darkpulse", "foulplay"],
		movepoolDeletions: ["fireblast", "flamethrower", "heatwave", "overheat", "psychic", "quiverdance", "zenheadbutt"],
		
		prevo: "Larvesta-Hisui",
		evoLevel: 59,
		creator: "Albatross",
	},
	parasect: {
		inherit: true,
		evos: ["Parascelium"],
		//movepoolAdditions: ["myceliate"],//Is this allowed? Like Hyper Drill and Twin Beam; evolves via knowing a new move given in a new gen.
		//Hardcoded in scripts I guess.
	},
	parascelium: {
		name: "Parascelium",
		copyData: "Parasect",
		
		types: ["Bug", "Grass"],
		baseStats: {hp: 60, atk: 105, def: 115, spa: 60, spd: 115, spe: 30},
		abilities: {0: "Effect Spore", 1: "Dry Skin", H: "Analytic"},
		movepoolAdditions: ["myceliate", "powder", "skittersmack"],
		
		prevo: "Parasect",
		evoType: "levelMove",
		evoMove: "Myceliate",
		creator: "Violet",
	},
	crustle: {
		inherit: true,
		evos: ["Mantle"],
	},
	mantle: {
		name: "Mantle",
		copyData: "Crustle",
		
		types: ["Bug", "Fire"],
		baseStats: {hp: 70, atk: 105, def: 155, spa: 75, spd: 105, spe: 35},
		abilities: {0: "Sturdy", 1: "Magma Armor", H: "Sticky Hold"},
		movepoolAdditions: ["lavaplume", "leechlife", "spikes"],
		
		prevo: "Crustle",
		evoType: "useItem",
		evoItem: "Fire Stone",
		creator: "Paulluxx",
	},
};
