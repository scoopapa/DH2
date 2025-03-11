export const Pokedex: {[speciesid: string]: ModdedSpeciesData} = {

	// SLATE 1 PROMPT 1

	crabominable: {
		inherit: true,
		evos: ["Crablitzerd"],
	},
	crablitzerd: {
		name: "Crablitzerd",
		copyData: "Crabominable",

		types: ["Fighting", "Ice"],
		baseStats: {hp: 107, atk: 137, def: 82, spa: 62, spd: 92, spe: 53},
		abilities: {0: "Iron Barbs", 1: "Iron Fist", H: "Anger Point"},
		movepoolAdditions: ["machpunch", "snowin"],

		prevo: "Crabominable",
		evoType: "other",
		evoCondition: "A newly-discovered evolution", // use generic flavor where not specified
		creator: "ausma",
	},

	croagunk: {
		inherit: true,
		otherFormes: ["Croagunk-Glacial"],
		formeOrder: ["Croagunk", "Croagunk-Glacial"],
	},
	croagunkglacial: {
		name: "Croagunk-Glacial",
		baseSpecies: "Croagunk",
		forme: "Glacial",
		copyData: "Croagunk",

		types: ["Poison", "Ice"],
		baseStats: {hp: 48, atk: 61, def: 40, spa: 61, spd: 40, spe: 50},
		abilities: {0: "Anticipation", 1: "Technician", H: "Snow Cloak"},
		movepoolAdditions: ["iceshard", "blizzard", "icebeam", "snowscape"],
		movepoolDeletions: ["swordsdance", "nastyplot"],

		evos: ["Toxicroak-Glacial"],
		creator: "quagsi",
	},
	toxicroak: {
		inherit: true,
		otherFormes: ["Toxicroak-Glacial"],
		formeOrder: ["Toxicroak", "Toxicroak-Glacial"],
		evos: ["Mycecroak"],
	},
	toxicroakglacial: {
		name: "Toxicroak-Glacial",
		baseSpecies: "Toxicroak",
		forme: "Glacial",
		copyData: "Toxicroak",

		types: ["Poison", "Ice"],
		baseStats: {hp: 88, atk: 116, def: 40, spa: 101, spd: 40, spe: 105},
		abilities: {0: "Anticipation", 1: "Technician", H: "Snow Cloak"},
		movepoolAdditions: ["iceshard", "blizzard", "icebeam", "snowscape"],
		movepoolDeletions: ["swordsdance", "nastyplot"],

		prevo: "Croagunk-Glacial",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		evos: ["Ycecroak"],
		creator: "quagsi",
	},
	mycecroak: {
		name: "Mycecroak",
		copyData: "Toxicroak",

		types: ["Poison", "Fighting"],
		baseStats: {hp: 103, atk: 116, def: 85, spa: 96, spd: 85, spe: 65},
		abilities: {0: "Sticky Hold", 1: "Dry Skin", H: "Poison Touch"},
		movepoolAdditions: ["junglehealing"],

		prevo: "Toxicroak",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		creator: "BlueRay",
	},
	ycecroak: {
		name: "Ycecroak",
		copyData: "Toxicroak",

		types: ["Poison", "Ice"],
		baseStats: {hp: 98, atk: 116, def: 40, spa: 106, spd: 65, spe: 125},
		abilities: {0: "Anticipation", 1: "Dry Skin", H: "Snow Warning"},
		movepoolAdditions: ["freezetag", "iceshard", "blizzard", "icebeam", "snowscape"],
		movepoolDeletions: ["swordsdance", "nastyplot"],

		prevo: "Toxicroak-Glacial",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		creator: "quagsi",
	},

	amaura: {
		inherit: true,
		otherFormes: ["Amaura-Volcanic"],
		formeOrder: ["Amaura", "Amaura-Volcanic"],
	},
	amauravolcanic: {
		name: "Amaura-Volcanic",
		baseSpecies: "Amaura",
		forme: "Volcanic",
		copyData: "Amaura",

		types: ["Fire", "Ice"],
		baseStats: {hp: 67, atk: 59, def: 50, spa: 67, spd: 63, spe: 56},
		abilities: {0: "Refrigerate", H: "Flame Body"},
		movepoolAdditions: ["wringout", "fireblast", "firespin", "flamecharge", "flamethrower", "heatwave", "snowscape", "solarbeam", "will-o-wisp"],
		movepoolDeletions: ["freeze-dry", "hail"],

		evos: ["Aurorus-Volcanic"],
		creator: "Violet",
	},
	aurorus: {
		inherit: true,
		otherFormes: ["Aurorus-Volcanic"],
		formeOrder: ["Aurorus", "Aurorus-Volcanic"],
	},
	aurorusvolcanic: {
		name: "Aurorus-Volcanic",
		baseSpecies: "Aurorus",
		forme: "Volcanic",
		copyData: "Aurorus",

		types: ["Fire", "Ice"],
		baseStats: {hp: 108, atk: 77, def: 72, spa: 99, spd: 82, spe: 83},
		abilities: {0: "Refrigerate", H: "Eruptive"},
		movepoolAdditions: ["auroraburst", "wringout", "fireblast", "firespin", "flamecharge", "flamethrower", "heatwave", "snowscape", "solarbeam", "will-o-wisp"],
		movepoolDeletions: ["freeze-dry", "hail"],

		prevo: "Amaura-Volcanic",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		creator: "Violet",
	},

	whiscash: {
		inherit: true,
		evos: ["Whiscazu", "Whiscazu-Hisui"],
	},
	whiscazu: {
		name: "Whiscazu",
		copyData: "Whiscash",

		types: ["Water", "Ground"],
		baseStats: {hp: 110, atk: 78, def: 78, spa: 116, spd: 81, spe: 70},
		abilities: {0: "Oblivious", 1: "Cheek Pouch", H: "Hydration"},
		movepoolAdditions: ["healingwish", "recycle"],

		prevo: "Whiscash",
		otherFormes: ["Whiscazu-Hisui"],
		formeOrder: ["Whiscazu", "Whiscazu-Hisui"],
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		creator: "ausma",
	},
	whiscazuhisui: {
		name: "Whiscazu-Hisui",
		copyData: "Whiscash",
		baseSpecies: "Whiscazu",
		forme: "Hisui",

		types: ["Ice", "Ground"],
		baseStats: {hp: 110, atk: 103, def: 78, spa: 91, spd: 81, spe: 70},
		abilities: {0: "Oblivious", 1: "Ice Body", H: "Hydration"},
		movepoolAdditions: ["healbell", "iciclecrash"],

		prevo: "Whiscash",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		creator: "Gravity Monkey",
	},

	munchlax: {
		inherit: true,
		otherFormes: ["Munchlax-Kalos"],
		formeOrder: ["Munchlax", "Munchlax-Kalos"],
	},
	munchlaxkalos: {
		name: "Munchlax-Kalos",
		baseSpecies: "Munchlax",
		forme: "Kalos",
		copyData: "Munchlax",

		types: ["Normal", "Ice"],
		baseStats: {hp: 85, atk: 40, def: 85, spa: 40, spd: 135, spe: 5},
		abilities: {0: "Pickup", 1: "Thick Fat", H: "Gluttony"},
		movepoolAdditions: ["avalanche", "barrier", "iceball", "snowscape"],
		movepoolDeletions: ["fireblast", "firepunch", "flamethrower", "sandstorm", "solarbeam", "sunnyday"],

		evos: ["Hibearlax"],
		creator: "lydian",
	},
	hibearlax: {
		name: "Hibearlax",
		copyData: "Snorlax",
		baseForme: "Hibernating",

		types: ["Normal", "Ice"],
		baseStats: {hp: 110, atk: 65, def: 110, spa: 65, spd: 160, spe: 30},
		abilities: {0: "Berserk Awakening", 1: "Thick Fat", H: "Gluttony"},
		movepoolAdditions: ["avalanche", "barrier", "closecombat", "iceball", "revenge", "reversal", "rocksmash", "snowscape", "strength", "superpower"],
		movepoolDeletions: ["fireblast", "firepunch", "flamethrower", "heatcrash", "sandstorm", "solarbeam", "sunnyday"],

		prevo: "Munchlax-Kalos",
		otherFormes: ["Hibearlax-Berserk"],
		formeOrder: ["Hibearlax", "Hibearlax-Berserk"],
		creator: "lydian",
	},
	hibearlaxberserk: {
		name: "Hibearlax",
		copyData: "Snorlax",
		baseSpecies: "Hibearlax",
		forme: "Berserk",

		types: ["Fighting", "Ice"],
		baseStats: {hp: 110, atk: 110, def: 110, spa: 65, spd: 65, spe: 80},
		abilities: {0: "Berserk Awakening"},
		movepoolAdditions: ["avalanche", "barrier", "closecombat", "iceball", "revenge", "reversal", "rocksmash", "snowscape", "strength", "superpower"],
		movepoolDeletions: ["fireblast", "firepunch", "flamethrower", "heatcrash", "sandstorm", "solarbeam", "sunnyday"],

		requiredAbility: "Berserk Awakening",
		battleOnly: "Hibearlax",
		creator: "lydian",
	},

	meditite: {
		inherit: true,
		otherFormes: ["Meditite-Variant"],
		formeOrder: ["Meditite", "Meditite-Variant"],
	},
	medititevariant: {
		name: "Meditite-Variant",
		baseSpecies: "Meditite",
		forme: "Variant",
		copyData: "Meditite",

		types: ["Ghost", "Ice"],
		baseStats: {hp: 30, atk: 40, def: 55, spa: 40, spd: 55, spe: 60},
		abilities: {0: "Awakening", H: "Anticipation"},
		movepoolAdditions: ["curse", "frostbreath", "tripleaxel", "blizzard", "hex", "icebeam", "icywind", "snowscape", "willowisp"],
		movepoolDeletions: ["closecombat", "firepunch", "sunnyday"],

		evos: ["Medicham-Variant"],
		creator: "BlueRay",
	},
	medicham: {
		inherit: true,
		otherFormes: ["Medicham-Mega", "Medicham-Variant"],
		formeOrder: ["Medicham", "Medicham-Mega", "Medicham-Variant"],
	},
	medichamvariant: {
		name: "Medicham-Variant",
		baseSpecies: "Medicham",
		forme: "Variant",
		copyData: "Medicham",

		types: ["Ghost", "Ice"],
		baseStats: {hp: 60, atk: 60, def: 75, spa: 60, spd: 75, spe: 80},
		abilities: {0: "Awakening", H: "Anticipation"},
		movepoolAdditions: ["curse", "frostbreath", "tripleaxel", "blizzard", "hex", "icebeam", "icywind", "snowscape", "willowisp"],
		movepoolDeletions: ["closecombat", "firepunch", "sunnyday"],

		prevo: "Meditite-Variant",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		evos: ["Meditendo"],
		creator: "BlueRay",
	},
	meditendo: {
		name: "Meditendo",
		copyData: "Medicham",
	
		types: ["Ghost", "Ice"],
		baseStats: {hp: 80, atk: 100, def: 80, spa: 100, spd: 80, spe: 100},
		abilities: {0: "Awakening", H: "Anticipation"},
		movepoolAdditions: ["curse", "frostbreath", "tripleaxel", "blizzard", "hex", "icebeam", "icywind", "snowscape", "willowisp"],
		movepoolDeletions: ["closecombat", "firepunch", "sunnyday"],

		prevo: "Medicham-Variant",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		creator: "BlueRay",
	},

	plankteenie: {
		name: "Plankteenie",
		copyData: "Mareanie",
		
		types: ["Dark", "Poison"],
		baseStats: {hp: 50, atk: 23, def: 32, spa: 23, spd: 22, spe: 25},
		abilities: {0: "Merciless", 1: "Limber", H: "Cute Charm"},
		movepoolAdditions: ["toxicthread", "knockoff"],
		movepoolDeletions: ["recover"],

		evos: ["Mareanie-Drifter"],
		creator: "Paulluxx",
	},
	mareanie: {
		inherit: true,
		otherFormes: ["Mareanie-Drifter"],
		formeOrder: ["Mareanie", "Mareanie-Drifter"],
	},
	mareaniedrifter: {
		name: "Mareanie-Drifter",
		baseSpecies: "Mareanie",
		forme: "Drifter",
		copyData: "Mareanie",
		
		types: ["Dark", "Poison"],
		baseStats: {hp: 50, atk: 53, def: 62, spa: 43, spd: 52, spe: 45},
		abilities: {0: "Merciless", 1: "Limber", H: "Regenerator"},
		movepoolAdditions: ["swordsdance", "banefulbunker", "toxicthread", "knockoff"],
		movepoolDeletions: ["recover"],

		prevo: "Plankteenie",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		evos: ["Toxapex-Glacial", "Nemesyst"],
		creator: "Paulluxx",
	},
	toxapex: {
		inherit: true,
		otherFormes: ["Toxapex-Glacial"],
		formeOrder: ["Toxapex", "Toxapex-Glacial"],
	},
	toxapexglacial: {
		name: "Toxapex-Glacial",
		baseSpecies: "Toxapex",
		forme: "Glacial",
		copyData: "Toxapex",
		copyMoves: "Mareanie", // told to inherit from Mareanie, not Toxapex
		
		types: ["Dark", "Ice"],
		baseStats: {hp: 50, atk: 63, def: 152, spa: 53, spd: 142, spe: 35},
		abilities: {0: "Water Bubble", 1: "Limber", H: "Regenerator"},
		movepoolAdditions: ["flipturn", "recover", "scald", "swordsdance", "banefulbunker", "toxicthread", "knockoff"],
		movepoolDeletions: ["recover"],

		prevo: "Mareanie-Drifter",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		creator: "Paulluxx",
	},
	nemesyst: {
		name: "Nemesyst",
		copyData: "Toxapex",
		copyMoves: "Mareanie", // told to inherit from Mareanie, not Toxapex

		types: ["Water", "Poison"],
		baseStats: {hp: 50, atk: 88, def: 122, spa: 53, spd: 112, spe: 70},
		abilities: {0: "Merciless", 1: "Limber", H: "Regenerator"},
		movepoolAdditions: ["banefulbayonet", "swordsdance", "banefulbunker", "toxicthread", "knockoff"],
		movepoolDeletions: ["recover"],

		prevo: "Mareanie-Drifter",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		creator: "ausma",
	},

	bronzor: {
		inherit: true,
		evos: ["Bronzong", "Bronzong-New-Year"],
	},
	bronzong: {
		inherit: true,
		otherFormes: ["Bronzong-New-Year"],
		formeOrder: ["Bronzong", "Bronzong-New-Year"],
	},
	bronzongnewyear: {
		name: "Bronzong-New-Year",
		baseSpecies: "Bronzong",
		forme: "New-Year",
		copyData: "Bronzong",

		types: ["Steel", "Ice"],
		baseStats: {hp: 77, atk: 99, def: 94, spa: 89, spd: 108, spe: 33},
		abilities: {0: "Levitate", 1: "Heatproof", H: "Ice Body"},
		movepoolAdditions: ["earthpower", "renewingring", "avalanche", "blizzard", "icebeam", "icywind", "snowscape"],

		prevo: "Bronzor",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		creator: "Hematite",
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
		abilities: {0: "Adaptability", 1: "Hydration", H: "Thick Fat"},
		movepoolAdditions: ["recover"],

		evos: ["Dewgong-Variant"],
		creator: "Selene",
	},
	dewgong: {
		inherit: true,
		otherFormes: ["Dewgong-Variant"],
		formeOrder: ["Dewgong", "Dewgong-Variant"],
		evos: ["Narwhirl"],
	},
	dewgongvariant: {
		name: "Dewgong-Variant",
		baseSpecies: "Dewgong",
		forme: "Variant",
		copyData: "Dewgong",

		types: ["Normal"],
		baseStats: {hp: 90, atk: 50, def: 80, spa: 110, spd: 95, spe: 50},
		abilities: {0: "Adaptability", 1: "Hydration", H: "Thick Fat"},
		movepoolAdditions: ["recover"],

		prevo: "Seel-Variant",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		creator: "Selene",
	},
	narwhirl: {
		name: "Narwhirl",
		copyData: "Dewgong",

		types: ["Water", "Ice"],
		baseStats: {hp: 95, atk: 85, def: 80, spa: 70, spd: 95, spe: 110},
		abilities: {0: "Thick Fat", 1: "Hydration", H: "Permafrost"},
		movepoolAdditions: ["thunderwave", "wavecrash"],

		prevo: "Dewgong",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		creator: "abismal",
	},

	bramblin: {
		inherit: true,
		evos: ["Brambleghast", "Brambleghast-Variant"],
	},
	brambleghast: {
		inherit: true,
		otherFormes: ["Brambleghast-Variant"],
		formeOrder: ["Brambleghast", "Brambleghast-Variant"],
	},
	brambleghastvariant: {
		name: "Brambleghast-Variant",
		baseSpecies: "Brambleghast",
		forme: "Variant",
		copyData: "Brambleghast",
	
		types: ["Ice", "Ghost"],
		baseStats: {hp: 85, atk: 95, def: 70, spa: 80, spd: 70, spe: 80},
		abilities: {0: "Wind Rider", H: "Prankster"},
		movepoolAdditions: ["auroraveil", "chillyreception", "blizzard", "icywind"],

		prevo: "Bramblin",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		creator: "Selene",
	},

	piloswine: {
		inherit: true,
		evos: ["Mamoswine", "Hieroswine"],
	},
	hieroswine: {
		name: "Hieroswine",
		copyData: "Mamoswine",
	
		types: ["Ice", "Ground"],
		baseStats: {hp: 100, atk: 100, def: 80, spa: 110, spd: 85, spe: 55},
		abilities: {0: "Mindful", 1: "Snow Cloak", H: "Thick Fat"},
		movepoolAdditions: ["psychic"],

		prevo: "Piloswine",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		creator: "pupugugu",
	},

	persian: {
		inherit: true,
		evos: ["Carnelion", "Carnelion-Variant"],
	},
	carnelion: {
		name: "Carnelion",
		copyData: "Persian",
		
		types: ["Normal", "Rock"],
		baseStats: {hp: 85, atk: 105, def: 70, spa: 95, spd: 70, spe: 120},
		abilities: {0: "Limber", 1: "Technician", H: "Unnerve"},
		movepoolAdditions: ["rockslide", "rocktomb", "sandstorm", "stealthrock", "stoneedge", "terablast"],

		otherFormes: ["Carnelion-Variant"],
		formeOrder: ["Carnelion", "Carnelion-Variant"],
		prevo: "Persian",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		creator: "abismal",
	},
	carnelionvariant: {
		name: "Whiscazu-Variant",
		copyData: "Persian",
		baseSpecies: "Carnelion",
		forme: "Variant",
	
		types: ["Normal", "Ice"],
		baseStats: {hp: 85, atk: 95, def: 70, spa: 105, spd: 70, spe: 120},
		abilities: {0: "Limber", 1: "Technician", H: "Unnerve"},
		movepoolAdditions: ["chillyreception", "avalanche", "blizzard", "icebeam", "icespinner", "snowscape", "rockslide", "rocktomb", "sandstorm", "stealthrock", "stoneedge", "terablast"],

		prevo: "Persian",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		creator: "inkbug",
	},

	pyukumuku: {
		inherit: true,
		otherFormes: ["Pyukumuku-Hisui"],
		formeOrder: ["Pyukumuku", "Pyukumuku-Hisui"],
	},
	pyukumukuhisui: {
		name: "Pyukumuku-Hisui",
		baseSpecies: "Pyukumuku",
		forme: "Hisui",
		copyData: "Pyukumuku",
	
		types: ["Ice"],
		baseStats: {hp: 75, atk: 65, def: 115, spa: 20, spd: 115, spe: 20},
		abilities: {0: "Snowball Effect"},
		movepoolAdditions: ["iceball", "snowroller"],
		movepoolDeletions: ["curse"],

		creator: "Albatross",
	},

	// SLATE 1 PROMPT 2

	// SLATE 1 PROMPT 3

	// LEGACY EVO MONS

};
