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
		movepoolAdditions: ["machpunch", "shaveoff"],

		prevo: "Crabominable",
		evoType: "other",
		evoCondition: "A newly-discovered evolution", // use generic flavor where not specified
		creator: "Jade",
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
		movepoolAdditions: ["wringout", "fireblast", "firespin", "flamecharge", "flamethrower", "heatwave", "snowscape", "solarbeam", "willowisp"],
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
		movepoolAdditions: ["auroraburst", "wringout", "fireblast", "firespin", "flamecharge", "flamethrower", "heatwave", "snowscape", "solarbeam", "willowisp"],
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
		creator: "Jade",
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
		name: "Hibearlax-Berserk",
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
		abilities: {0: "Awakening", H: "Telepathy"},
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
		abilities: {0: "Awakening", H: "Telepathy"},
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
		abilities: {0: "Awakening", H: "Telepathy"},
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
		creator: "Jade",
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

		otherFormes: ["Carnelion-Snowcap"],
		formeOrder: ["Carnelion", "Carnelion-Snowcap"],
		prevo: "Persian",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		creator: "abismal",
	},
	carnelionsnowcap: {
		name: "Carnelion-Snowcap",
		copyData: "Persian",
		baseSpecies: "Carnelion",
		forme: "Snowcap",
	
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

	numel: {
		inherit: true,
		otherFormes: ["Numel-Dormant"],
		formeOrder: ["Numel", "Numel-Dormant"],
	},
	numeldormant: {
		name: "Numel-Dormant",
		baseSpecies: "Numel",
		forme: "Dormant",
		copyData: "Numel",

		types: ["Rock", "Ice"],
		abilities: {0: "Comatose", H: "Thick Fat"},
		movepoolAdditions: ["slackoff", "afteryou", "avalanche", "blizzard", "icebeam", "icespinner", "iciclecrash", "icywind", "meteorbeam", "snowscape"],
		movepoolDeletions: ["ember", "eruption", "fireblast", "firespin", "flamecharge", "flamethrower", "flareblitz", "heatcrash", "heatwave", "incinerate", "lavaplume", "overheat", "temperflare", "willowisp"],

		evos: ["Dormedary"],
		creator: "BotwNerd",
	},
	dormedary: {
		name: "Dormedary",
		copyData: "Camerupt",

		types: ["Rock", "Ice"],
		abilities: {0: "Comatose", H: "Thick Fat"},
		movepoolAdditions: ["sheercold", "slackoff", "afteryou", "avalanche", "blizzard", "icebeam", "icespinner", "iciclecrash", "icywind", "meteorbeam", "snowscape"],
		movepoolDeletions: ["ember", "eruption", "fireblast", "firespin", "flamecharge", "flamethrower", "flareblitz", "heatcrash", "heatwave", "incinerate", "lavaplume", "overheat", "temperflare", "willowisp"],

		prevo: "Numel-Dormant",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		evos: ["Dormaderupt"],
		creator: "BotwNerd",
	},
	dormaderupt: {
		name: "Dormaderupt",
		copyData: "Camerupt",

		types: ["Rock", "Ice"],
		baseStats: {hp: 110, atk: 100, def: 70, spa: 115, spd: 85, spe: 55},
		abilities: {0: "Sheer Force", 1: "Speed Boost", H: "Steam Engine"},
		movepoolAdditions: ["mountaingale", "sheercold", "slackoff", "afteryou", "avalanche", "blizzard", "explosion", "icebeam", "icespinner", "iciclecrash", "icywind", "meteorbeam", "selfdestruct", "snowscape"],
		movepoolDeletions: ["ember", "fireblast", "firespin", "flamecharge", "flamethrower", "flareblitz", "heatcrash", "heatwave", "incinerate", "overheat", "temperflare", "willowisp"],

		heightm: 2.5,
		weightkg: 320.5,

		prevo: "Dormedary",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		creator: "BotwNerd",
	},

	// SLATE 1 PROMPT 2

	eelektrik: {
		inherit: true,
		evos: ["Eelektross", "Eelektross-Variant"],
	},
	eelektross: {
		inherit: true,
		otherFormes: ["Eelektross-Variant"],
		formeOrder: ["Eelektross", "Eelektross-Variant"],
	},
	eelektrossvariant: {
		name: "Eelektross-Variant",
		baseSpecies: "Eelektross",
		forme: "Variant",
		copyData: "Eelektross",

		types: ["Flying", "Electric"],
		baseStats: {hp: 80, atk: 115, def: 80, spa: 105, spd: 80, spe: 55},
		abilities: {0: "Storm Chaser", 1: "Wind Rider", H: "Storm Drain"},
		movepoolAdditions: ["hurricane", "weatherball", "aerialace", "roost", "tailwind"],

		prevo: "Eelektrik",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		creator: "quagsi",
	},

	togepi: {
		inherit: true,
		otherFormes: ["Togepi-Variant"],
		formeOrder: ["Togepi", "Togepi-Variant"],
	},
	togepivariant: {
		name: "Togepi-Variant",
		baseSpecies: "Togepi",
		forme: "Variant",
		copyData: "Togepi",

		types: ["Fairy", "Ground"],
		baseStats: {hp: 35, atk: 20, def: 65, spa: 40, spd: 65, spe: 20},
		abilities: {0: "Spiritual", 1: "Serene Grace", H: "Super Luck"},
		movepoolAdditions: ["bulldoze", "dig", "earthquake", "earthpower", "sandstorm", "strength", "rockslide", "rocktomb", "stoneedge"],
		movepoolDeletions: ["followme"],

		evos: ["Togetic-Variant"],
		creator: "Jumpheart",
	},
	togetic: {
		inherit: true,
		otherFormes: ["Togetic-Variant"],
		formeOrder: ["Togetic", "Togetic-Variant"],
		evos: ["Togekiss"],
	},
	togeticvariant: {
		name: "Togetic-Variant",
		baseSpecies: "Togetic",
		forme: "Variant",
		copyData: "Togetic",
		
		types: ["Fairy", "Ground"],
		baseStats: {hp: 55, atk: 40, def: 85, spa: 80, spd: 105, spe: 40},
		abilities: {0: "Spiritual", 1: "Serene Grace", H: "Super Luck"},
		movepoolAdditions: ["bulldoze", "dig", "earthquake", "earthpower", "sandstorm", "strength", "rockslide", "rocktomb", "stoneedge"],
		movepoolDeletions: ["followme"],

		prevo: "Togepi-Variant",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		evos: ["Togepries"],
		creator: "Jumpheart",
	},
	togepries: {
		name: "Togepries",
		copyData: "Togekiss",
		
		types: ["Fairy", "Ground"],
		baseStats: {hp: 80, atk: 95, def: 125, spa: 85, spd: 85, spe: 75},
		abilities: {0: "Spiritual", 1: "Serene Grace", H: "Super Luck"},
		movepoolAdditions: ["bulldoze", "dig", "earthquake", "earthpower", "sandstorm", "strength", "rockslide", "rocktomb", "stoneedge"],
		movepoolDeletions: ["followme"],

		prevo: "Togetic-Variant",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		creator: "Jumpheart",
	},

	drampa: {
		inherit: true,
		otherFormes: ["Drampa-Shifu"],
		formeOrder: ["Drampa", "Drampa-Shifu"],
	},
	drampashifu: {
		name: "Drampa-Shifu",
		baseSpecies: "Drampa",
		forme: "Shifu",
		copyData: "Drampa",
		gender: "M",
		
		types: ["Fighting", "Dragon"],
		baseStats: {hp: 90, atk: 96, def: 91, spa: 63, spd: 97, spe: 108},
		abilities: {0: "Martial Master"},
		movepoolAdditions: ["coil", "ironhead", "brickbreak", "coaching", "focuspunch", "reversal", "revenge", "rocksmash", "strength"],
		movepoolDeletions: ["playnice", "playrough"],

		creator: "lydian",
	},

	cutiefly: {
		inherit: true,
		evos: ["Ribombee", "Thumbulbee"],
	},
	thumbulbee: {
		name: "Thumbulbee",
		copyData: "Ribombee",
		copyMoves: "Cutiefly",

		types: ["Bug", "Fairy"],
		baseStats: {hp: 80, atk: 60, def: 80, spa: 100, spd: 100, spe: 44},
		abilities: {0: "Honey Gather", 1: "Pollen Basket", H: "Sweet Veil"},
		movepoolAdditions: ["agility", "gigaimpact", "hyperbeam", "lunge", "solarbeam"],

		prevo: "Cutiefly",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		creator: "Selene",
	},

	porygon: {
		inherit: true,
		evos: ["Porygon2", "Datagon2"],
	},
	datagon2: {
		name: "Datagon2",
		copyData: "Porygon2",

		types: ["Dark", "Psychic"],
		baseStats: {hp: 100, atk: 80, def: 90, spa: 105, spd: 95, spe: 45},
		abilities: {0: "Patch Note", 1: "Download", H: "Analytic"},
		movepoolAdditions: ["acid", "darkpulse", "poisonsting", "psychicnoise", "reflecttype", "sludge", "calmmind", "taunt", "terablast"],
		movepoolDeletions: ["signalbeam"],

		evos: ["Datagon-Z"],
		prevo: "Porygon",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		creator: "Jade",
	},
	datagonz: {
		name: "Datagon-Z",
		copyData: "Porygon-Z",

		types: ["Dark", "Psychic"],
		baseStats: {hp: 100, atk: 80, def: 60, spa: 135, spd: 60, spe: 100},
		abilities: {0: "Patch Note", 1: "Download", H: "Analytic"},
		movepoolAdditions: ["acid", "poisonsting", "psychicnoise", "reflecttype", "sludge", "calmmind", "taunt", "terablast"],
		movepoolDeletions: ["signalbeam"],

		prevo: "Datagon2",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		creator: "Jade",
	},

	noibat: {
		inherit: true,
		evos: ["Noivern", "Noivern-Variant", "Noivern-Paldea"],
	},
	noivern: {
		inherit: true,
		otherFormes: ["Noivern-Variant", "Noivern-Paldea"],
		formeOrder: ["Noivern", "Noivern-Variant", "Noivern-Paldea"],
	},
	noivernvariant: {
		name: "Noivern-Variant",
		baseSpecies: "Noivern",
		forme: "Variant",
		copyData: "Noivern",

		types: ["Fighting", "Dragon"],
		baseStats: {hp: 95, atk: 70, def: 80, spa: 97, spd: 80, spe: 113},
		abilities: {0: "Levitate"},
		movepoolAdditions: ["aurasphere", "vacuumwave", "bulldoze", "rocktomb"],
		movepoolDeletions: ["boomburst"],

		prevo: "Noibat",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		creator: "Hematite",
	},
	noivernpaldea: {
		name: "Noivern-Paldea",
		baseSpecies: "Noivern",
		forme: "Paldea",
		copyData: "Noivern",

		types: ["Flying", "Electric"],
		baseStats: {hp: 85, atk: 70, def: 80, spa: 87, spd: 80, spe: 133},
		abilities: {0: "Frisk", 1: "Rust Control", H: "Telepathy"},
		movepoolAdditions: ["metalsound", "overdrive", "spark", "chargebeam", "discharge", "electricterrain", "electroball", "electroweb", "flash", "risingvoltage", "thunder", "thunderwave", "thunderbolt", "voltswitch"],
		movepoolDeletions: ["dragondance", "dragontail", "moonlight"],

		prevo: "Noibat",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		creator: "Gravity Monkey",
	},

	flaaffy: {
		inherit: true,
		evos: ["Ampharos", "Ampharos-Urban", "Voltangent"],
	},
	ampharos: {
		inherit: true,
		otherFormes: ["Ampharos-Urban"],
		formeOrder: ["Ampharos", "Ampharos-Urban"],
	},
	ampharosurban: {
		name: "Ampharos-Urban",
		baseSpecies: "Ampharos",
		forme: "Urban",
		copyData: "Ampharos",

		types: ["Normal", "Dragon"],
		baseStats: {hp: 90, atk: 85, def: 75, spa: 115, spd: 90, spe: 55},
		abilities: {0: "Directing Traffic", H: "Motor Drive"},
		movepoolAdditions: ["followme", "triattack", "dracometeor", "flamethrower", "workup"],

		prevo: "Flaaffy",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		creator: "Hematite",
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

	rabsca: {
		inherit: true,
		evos: ["Repehk"],
	},
	repehk: {
		name: "Repehk",
		copyData: "Rabsca",

		types: ["Bug", "Psychic"],
		baseStats: {hp: 115, atk: 90, def: 50, spa: 145, spd: 55, spe: 80},
		abilities: {0: "Drought"},
		movepoolAdditions: ["morningsun", "solarbeam"],

		prevo: "Rabsca",
		evoType: "other",
		evoCondition: "A newly-discovered evolution", // use generic flavor where not specified
		creator: "abismal",
	},

	spoink: {
		inherit: true,
		evos: ["Grumpig", "Grumpig-Alpine"],
	},
	grumpig: {
		inherit: true,
		otherFormes: ["Grumpig-Alpine"],
		formeOrder: ["Grumpig", "Grumpig-Alpine"],
	},
	grumpigalpine: {
		name: "Grumpig-Alpine",
		baseSpecies: "Grumpig",
		forme: "Alpine",
		copyData: "Grumpig",

		types: ["Psychic", "Fighting"],
		baseStats: {hp: 80, atk: 75, def: 65, spa: 60, spd: 110, spe: 80},
		abilities: {0: "Thick Fat", 1: "Own Tempo", H: "Gluttony"},
		movepoolAdditions: ["jumpkick", "rapidspin", "uturn", "bulkup", "coaching", "meteorbeam", "rockblast", "rockpolish", "rockslide", "rocksmash", "rockthrow", "rocktomb", "sandstorm", "smackdown", "stealthrock", "stoneedge", "strength", "superpower"],

		prevo: "Spoink",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		evos: ["Alpignist"],
		creator: "inkbug",
	},
	alpignist: {
		name: "Alpignist",
		copyData: "Grumpig",

		types: ["Rock", "Fighting"],
		baseStats: {hp: 95, atk: 95, def: 70, spa: 75, spd: 115, spe: 85},
		abilities: {0: "Thick Fat", 1: "High Climber", H: "Gluttony"},
		movepoolAdditions: ["jumpkick", "rapidspin", "uturn", "bulkup", "coaching", "meteorbeam", "rockblast", "rockpolish", "rockslide", "rocksmash", "rockthrow", "rocktomb", "sandstorm", "smackdown", "stealthrock", "stoneedge", "strength", "superpower"],

		prevo: "Grumpig-Alpine",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		creator: "inkbug",
	},

	duskull: {
		inherit: true,
		otherFormes: ["Duskull-Variant"],
		formeOrder: ["Duskull", "Duskull-Variant"],
	},
	duskullvariant: {
		name: "Duskull-Variant",
		baseSpecies: "Duskull",
		forme: "Variant",
		copyData: "Duskull",

		types: ["Electric"],
		baseStats: {hp: 20, atk: 40, def: 90, spa: 30, spd: 90, spe: 25},
		abilities: {0: "Levitate"},
		movepoolAdditions: ["blownfuse", "supercellslam", "eerieimpulse", "electricterrain"],
		movepoolDeletions: ["willowisp"],

		evos: ["Dusclops-Variant"],
		creator: "Paulluxx",
	},
	dusclops: {
		inherit: true,
		evos: ["Dusknoir", "Dusglow"],
		otherFormes: ["Dusclops-Variant"],
		formeOrder: ["Dusclops", "Dusclops-Variant"],
	},
	dusclopsvariant: {
		name: "Dusclops-Variant",
		baseSpecies: "Dusclops",
		forme: "Variant",
		copyData: "Dusclops",

		types: ["Electric"],
		baseStats: {hp: 40, atk: 70, def: 130, spa: 60, spd: 130, spe: 25},
		abilities: {0: "Spiritual", H: "Frisk"},
		movepoolAdditions: ["blownfuse", "supercellslam", "eerieimpulse", "electricterrain"],
		movepoolDeletions: ["willowisp"],

		prevo: "Duskull-Variant",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		evos: ["Weltenschertz"],
		creator: "Paulluxx",
	},
	dusglow: {
		name: "Dusglow",
		copyData: "Dusknoir",

		types: ["Ghost", "Fairy"],
		baseStats: {hp: 45, atk: 85, def: 105, spa: 115, spd: 105, spe: 70},
		abilities: {0: "Pressure", H: "Wandering Spirit"},
		movepoolAdditions: ["dazzlinggleam", "drainingkiss"],

		prevo: "Dusclops",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		creator: "Violet",
	},
	weltenschertz: {
		name: "Weltenschertz",
		copyData: "Dusclops",

		types: ["Electric", "Fighting"],
		baseStats: {hp: 45, atk: 100, def: 135, spa: 65, spd: 135, spe: 45},
		abilities: {0: "Spiritual", H: "Frisk"},
		movepoolAdditions: ["blownfuse", "supercellslam", "eerieimpulse", "electricterrain"],
		movepoolDeletions: ["willowisp"],

		prevo: "Dusclops-Variant",
		evoType: "trade",
		evoItem: "Electirizer",
		creator: "Paulluxx",
	},

	hawlucha: {
		inherit: true,
		otherFormes: ["Hawlucha-Rudo"],
		formeOrder: ["Hawlucha", "Hawlucha-Rudo"],
	},
	hawlucharudo: {
		name: "Hawlucha-Rudo",
		baseSpecies: "Hawlucha",
		forme: "Rudo",
		copyData: "Hawlucha",
		
		types: ["Poison", "Flying"],
		baseStats: {hp: 78, atk: 107, def: 90, spa: 64, spd: 63, spe: 98},
		abilities: {0: "Limber", 1: "Cheap Tricks", H: "Mold Breaker"},
		movepoolAdditions: ["partingshot", "gunkshot", "sludgebomb", "venoshock"],
		movepoolDeletions: ["closecombat"],

		creator: "Albatross",
	},

	// SLATE 1 PROMPT 3

	golett: {
		inherit: true,
		evos: ["Golurk", "Golligerent"],
	},
	golligerent: {
		name: "Golligerent",
		copyData: "Golurk",

		types: ["Ground", "Ghost"],
		baseStats: {hp: 69, atk: 129, def: 60, spa: 85, spd: 60, spe: 80},
		abilities: {0: "Iron Fist", 1: "Poison Heal", H: "No Guard"},
		movepoolAdditions: ["shadowbox", "willowisp"],
		movepoolDeletions: ["darkestlariat", "hyperbeam", "stoneedge", "trick"],

		prevo: "Golett",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		creator: "Selene",
	},

	binacle: {
		inherit: true,
		otherFormes: ["Binacle-Paldea"],
		formeOrder: ["Binacle", "Binacle-Paldea"],
	},
	binaclepaldea: {
		name: "Binacle-Paldea",
		baseSpecies: "Binacle",
		forme: "Paldea",
		copyData: "Binacle",

		types: ["Rock", "Psychic"],
		baseStats: {hp: 42, atk: 42, def: 47, spa: 69, spd: 59, spe: 47},
		abilities: {0: "Sticky Hold", 1: "Divinated Protection", H: "Wonder Skin"},
		movepoolAdditions: ["constrict", "extrasensory", "nastyplot", "psychicnoise", "wringout", "calmmind", "expandingforce", "futuresight", "psybeam", "psychic", "shadowball", "skillswap", "trick", "trickroom", "zenheadbutt"],

		evos: ["Horroracle"],
		creator: "lydian",
	},
	horroracle: {
		name: "Horroracle",
		copyData: "Barbaracle",

		types: ["Rock", "Psychic"],
		baseStats: {hp: 72, atk: 85, def: 75, spa: 114, spd: 95, spe: 59},
		abilities: {0: "Sticky Hold", 1: "Divinated Protection", H: "Wonder Skin"},
		movepoolAdditions: ["constrict", "extrasensory", "nastyplot", "psychicnoise", "wringout", "calmmind", "expandingforce", "futuresight", "psybeam", "psychic", "shadowball", "skillswap", "trick", "trickroom", "zenheadbutt"],

		prevo: "Binacle-Paldea",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		creator: "lydian",
	},

	uxie: {
		inherit: true,
		otherFormes: ["Uxie-Ultra-Space"],
		formeOrder: ["Uxie", "Uxie-Ultra-Space"],
	},
	uxieultraspace: {
		name: "Uxie-Ultra-Space",
		baseSpecies: "Uxie",
		forme: "Ultra-Space",
		copyData: "Uxie",

		types: ["Electric"],
		baseStats: {hp: 79, atk: 89, def: 103, spa: 89, spd: 103, spe: 107},
		abilities: {0: "Levitate", H: "Tablets of Ruin", S: "Beast Boost"},

		creator: "Paulluxx",
	},

	clayby: {
		name: "Clayby",
		copyData: "Litwick",

		types: ["Ghost", "Rock"],
		baseStats: {hp: 52, atk: 50, def: 73, spa: 55, spd: 30, spe: 15},
		abilities: {0: "Well-Baked Body", 1: "Shattering Clay", H: "Sand Stream"},
		movepoolAdditions: ["bodypress", "powergem", "bulldoze", "earthpower", "meteorbeam", "rockpolish", "rockslide", "rocktomb", "sandstorm", "stealthrock"],
		movepoolDeletions: ["burningjealousy", "ember", "fireblast", "firespin", "flameburst", "flamecharge", "flamethrower", "flareblitz", "heatwave", "incinerate", "inferno", "mysticalfire", "overheat", "solarbeam", "sunnyday"],

		evos: ["Glament"],
		creator: "pupugugu",
	},
	glament: {
		name: "Glament",
		copyData: "Lampent",

		types: ["Ghost", "Rock"],
		baseStats: {hp: 62, atk: 40, def: 93, spa: 85, spd: 55, spe: 35},
		abilities: {0: "Well-Baked Body", 1: "Shattering Clay", H: "Sand Stream"},
		movepoolAdditions: ["bodypress", "powergem", "bulldoze", "earthpower", "meteorbeam", "rockpolish", "rockslide", "rocktomb", "sandstorm", "stealthrock"],
		movepoolDeletions: ["burningjealousy", "ember", "fireblast", "firespin", "flameburst", "flamecharge", "flamethrower", "flareblitz", "heatwave", "incinerate", "inferno", "mysticalfire", "overheat", "solarbeam", "sunnyday"],

		prevo: "Clayby",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		evos: ["Potthereal"],
		creator: "pupugugu",
	},
	potthereal: {
		name: "Potthereal",
		copyData: "Chandelure",

		types: ["Ghost", "Rock"],
		baseStats: {hp: 72, atk: 85, def: 108, spa: 135, spd: 50, spe: 70},
		abilities: {0: "Well-Baked Body", 1: "Shattering Clay", H: "Sand Stream"},
		movepoolAdditions: ["bodypress", "powergem", "bulldoze", "earthpower", "meteorbeam", "rockpolish", "rockslide", "rocktomb", "sandstorm", "stealthrock"],
		movepoolDeletions: ["burningjealousy", "ember", "fireblast", "firespin", "flameburst", "flamecharge", "flamethrower", "flareblitz", "heatwave", "incinerate", "inferno", "mysticalfire", "overheat", "solarbeam", "sunnyday"],

		prevo: "Glament",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		creator: "pupugugu",
	},

	skiddo: {
		inherit: true,
		otherFormes: ["Skiddo-Hadean"],
		formeOrder: ["Skiddo", "Skiddo-Hadean"],
	},
	skiddohadean: {
		name: "Skiddo-Hadean",
		baseSpecies: "Skiddo",
		forme: "Hadean",
		copyData: "Skiddo",

		types: ["Grass", "Fire"],
		baseStats: {hp: 66, atk: 72, def: 18, spa: 75, spd: 47, spe: 72},
		abilities: {0: "Cud Chew", 1: "Flame Body", H: "Grass Pelt"},
		movepoolAdditions: ["chloroblast", "rekindle", "fireblast", "firespin", "flamecharge", "flamethrower", "heatwave", "overheat", "willowisp"],

		evos: ["Gogoat-Hadean"],
		creator: "abismal",
	},
	gogoat: {
		inherit: true,
		otherFormes: ["Gogoat-Hadean"],
		formeOrder: ["Gogoat", "Gogoat-Hadean"],
	},
	gogoathadean: {
		name: "Gogoat-Hadean",
		baseSpecies: "Gogoat",
		forme: "Hadean",
		copyData: "Gogoat",

		types: ["Grass", "Fire"],
		baseStats: {hp: 123, atk: 107, def: 32, spa: 110, spd: 61, spe: 98},
		abilities: {0: "Cud Chew", 1: "Flame Body", H: "Grass Pelt"},
		movepoolAdditions: ["chloroblast", "rekindle", "fireblast", "firespin", "flamecharge", "flamethrower", "heatwave", "overheat", "willowisp"],

		prevo: "Skiddo-Hadean",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		creator: "abismal",
	},

	nosepass: {
		inherit: true,
		evos: ["Probopass", "Rootsnoot"],
	},
	rootsnoot: {
		name: "Rootsnoot",
		copyData: "Probopass",

		types: ["Rock", "Electric"],
		baseStats: {hp: 80, atk: 70, def: 50, spa: 100, spd: 160, spe: 65},
		abilities: {0: "Stalwart", 1: "Grassy Surge", H: "Galvanize"},
		movepoolAdditions: ["gigadrain", "rapidspin"],
		movepoolDeletions: ["steelbeam"],

		prevo: "Nosepass",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		creator: "quagsi",
	},

	corvisquire: {
		inherit: true,
		evos: ["Corviknight", "Corviknight-Verdant"],
	},
	corviknight: {
		inherit: true,
		otherFormes: ["Corviknight-Verdant"],
		formeOrder: ["Corviknight", "Corviknight-Verdant"],
	},
	corviknightverdant: {
		name: "Corviknight-Verdant",
		baseSpecies: "Corviknight",
		forme: "Verdant",
		copyData: "Corviknight",

		types: ["Psychic", "Grass"],
		baseStats: {hp: 98, atk: 107, def: 85, spa: 53, spd: 65, spe: 87},
		abilities: {0: "Chain Link", 1: "Unburden", H: "Withering Glare"},
		movepoolAdditions: ["entanglement", "grassyglide", "powerwhip", "barrier", "bulletseed", "grassyterrain", "psychicterrain", "seedbomb", "trickroom", "zenheadbutt"],
		movepoolDeletions: ["irondefense", "metalsound", "steelbeam"],

		prevo: "Corvisquire",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		creator: "BlueRay",
	},

	regirock: {
		inherit: true,
		otherFormes: ["Regirock-Kanto"],
		formeOrder: ["Regirock", "Regirock-Kanto"],
	},
	regirockkanto: {
		name: "Regirock-Kanto",
		baseSpecies: "Regirock",
		forme: "Kanto",
		copyData: "Regirock",

		types: ["Rock", "Poison"],
		baseStats: {hp: 80, atk: 100, def: 125, spa: 100, spd: 100, spe: 75},
		abilities: {0: "Calcify", H: "Weak Armor"},
		movepoolAdditions: ["leechseed", "rapidspin", "acidarmor", "acidspray", "sludgebomb", "sludgewave", "venoshock"],

		creator: "Hematite",
	},

	darumaka: {
		inherit: true,
		evos: ["Darmanitan", "Darmanitan-Sage"],
	},
	darmanitan: {
		inherit: true,
		otherFormes: ["Darmanitan-Zen", "Darmanitan-Galar", "Darmanitan-Galar-Zen", "Darmanitan-Sage"],
		formeOrder: ["Darmanitan", "Darmanitan-Zen", "Darmanitan-Galar", "Darmanitan-Galar-Zen", "Darmanitan-Sage"],
	},
	darmanitansage: {
		name: "Darmanitan-Sage",
		baseSpecies: "Darmanitan",
		forme: "Sage",
		copyData: "Darmanitan-Zen",
		copyMoves: "Darmanitan",

		types: ["Fire", "Psychic"],
		baseStats: {hp: 105, atk: 85, def: 65, spa: 105, spd: 105, spe: 75},
		abilities: {0: "Slush Rush", 1: "Telepathy", H: "Frigid Focus"},
		movepoolAdditions: ["gravity", "inferno", "avalanche", "blizzard", "calmmind", "icebeam", "icefang", "icepunch", "iciclecrash", "psychup", "skillswap", "snowscape", "trickroom"],

		prevo: "Darumaka",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		creator: "inkbug",
	},

	// LEGACY EVO MONS

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

	parasect: {
		inherit: true,
		evos: ["Parascelium"],
	},
	parascelium: {
		name: "Parascelium",
		copyData: "Parasect",
		
		types: ["Bug", "Grass"],
		baseStats: {hp: 60, atk: 105, def: 115, spa: 60, spd: 115, spe: 30},
		abilities: {0: "Effect Spore", 1: "Dry Skin", H: "Analytic"},
		movepoolAdditions: ["myceliate", "powder", "skittersmack"],
		
		prevo: "Parasect",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		creator: "Violet",
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

	snom: {
		inherit: true,
		otherFormes: ["Snom-Ma'adowr"],
		formeOrder: ["Snom", "Snom-Ma'adowr"],
	},
	snommaadowr: {
		name: "Snom-Ma'adowr",
		baseSpecies: "Snom",
		forme: "Ma'adowr",
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
		otherFormes: ["Frosmoth-Ma'adowr"],
		formeOrder: ["Frosmoth", "Frosmoth-Ma'adowr"],
	},
	frosmothmaadowr: {
		name: "Frosmoth-Ma'adowr",
		baseSpecies: "Frosmoth",
		forme: "Ma'adowr",
		copyData: "Frosmoth",

		types: ["Normal", "Bug"],
		abilities: {0: "Shield Dust", 1: "Fur Coat", H: "Scale Shift"},
		movepoolAdditions: ["dispersion", "hypervoice"],
		movepoolDeletions: ["aurorabeam", "auroraveil", "avalanche", "blizzard", "hail", "icebeam", "iciclespear", "mist", "powdersnow", "tripleaxel"],

		prevo: "Snom-Ma'adowr",
		evoType: "levelFriendship",
		evoCondition: "at night",
		creator: "BlueRay",
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
		creator: "Jade",
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
		creator: "Jade",
	},

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

	// SLATE 2 PROMPT 1

	pelagicjaw: {
		name: "Pelagic Jaw",
		copyData: "Garchomp",

		types: ["Water"],
		baseStats: {hp: 99, atk: 109, def: 91, spa: 81, spd: 101, spe: 89},
		abilities: {0: "Protosynthesis"},

		creator: "lydian",
	},

	kabuto: {
		inherit: true,
		evos: ["Kabutops", "Kabutops-Hisui"],
	},
	kabutops: {
		inherit: true,
		otherFormes: ["Kabutops-Hisui"],
		formeOrder: ["Kabutops", "Kabutops-Hisui"],
	},
	kabutopshisui: {
		name: "Kabutops-Hisui",
		baseSpecies: "Kabutops",
		forme: "Hisui",
		copyData: "Kabutops",

		types: ["Bug"],
		baseStats: {hp: 60, atk: 115, def: 105, spa: 65, spd: 70, spe: 80},
		abilities: {0: "Fendente", 1: "Battle Armor", H: "Sturdy"},

		prevo: "Kabuto",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		creator: "BlueRay",
	},

	mudbray: {
		inherit: true,
		otherFormes: ["Mudbray-Sinnoh"],
		formeOrder: ["Mudbray", "Mudbray-Sinnoh"],
	},
	mudbraysinnoh: {
		name: "Mudbray-Sinnoh",
		baseSpecies: "Mudbray",
		forme: "Sinnoh",
		copyData: "Mudbray",

		types: ["Grass"],
		baseStats: {hp: 85, atk: 100, def: 55, spa: 35, spd: 70, spe: 40},
		abilities: {0: "Storm Drain", 1: "Stamina", H: "Technician"},
		movepoolAdditions: ["grassyglide", "wallow", "trailblaze", "bulletseed", "gigadrain", "grassyterrain"],
		movepoolDeletions: ["closecombat"],

		evos: ["Mudsdale-Sinnoh"],
		creator: "pupugugu",
	},
	mudsdale: {
		inherit: true,
		otherFormes: ["Mudsdale-Mega", "Mudsdale-Sinnoh"],
		formeOrder: ["Mudsdale", "Mudsdale-Mega", "Mudsdale-Sinnoh"],
	},
	mudsdalesinnoh: {
		name: "Mudsdale-Sinnoh",
		baseSpecies: "Mudsdale",
		forme: "Sinnoh",
		copyData: "Mudsdale",

		types: ["Grass"],
		baseStats: {hp: 115, atk: 125, def: 85, spa: 45, spd: 100, spe: 30},
		abilities: {0: "Storm Drain", 1: "Stamina", H: "Technician"},
		movepoolAdditions: ["grassyglide", "wallow", "trailblaze", "bulletseed", "gigadrain", "grassyterrain"],
		movepoolDeletions: ["closecombat"],

		prevo: "Mudbray-Sinnoh",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		creator: "pupugugu",
	},

	tapukiki: {
		name: "Tapu Kiki",
		copyData: "Tapu Koko",
		copyMoves: "Cosmog", // sloppy shortcuts yay

		types: ["Fairy"],
		baseStats: {hp: 70, atk: 75, def: 95, spa: 75, spd: 95, spe: 115},
		abilities: {0: "Power Surge", H: "Friend Guard"},
		movepoolAdditions: ["dragoncheer", "dragonhammer", "allyswitch", "aromatherapy", "bulkup", "calmmind", "confide", "dazzlinggleam", "defog", "drainingkiss", "echoedvoice", "endure", "facade", "falseswipe", "fling", "focusblast", "frustration", "grassknot", "gravity", "guardswap", "hiddenpower", "icywind", "irondefense", "knockoff", "lightscreen", "magiccoat", "magicroom", "meanlook", "moonblast", "naturepower", "nature'smadness", "playrough", "powerswap", "protect", "psychup", "raindance", "reflect", "rest", "return", "roar", "rototiller", "round", "safeguard", "shadowball", "sleeptalk", "smartstrike", "snore", "storedpower", "substitute", "sunnyday", "swagger", "taunt", "telekinesis", "thief", "thunderwave", "torment", "toxic", "trick", "voltswitch", "withdraw", "wonderroom", "workup"],
		movepoolDeletions: ["teleport", "splash"],

		creator: "quagsi",
	},

	thievul: {
		inherit: true,
		evos: ["Kingxin"],
	},
	kingxin: {
		name: "Kingxin",
		copyData: "Thievul",
		
		baseStats: {hp: 100, atk: 98, def: 63, spa: 107, spd: 92, spe: 75},
		abilities: {0: "Protean", 1: "Unburden", H: "Stakeout"},
		movepoolAdditions: ["mortalspin", "slackoff"],

		prevo: "Thievul",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		creator: "Jade",
	},

	buneary: {
		inherit: true,
		evos: ["Lopunny", "Lopunny-Kitakami"],
	},
	lopunny: {
		inherit: true,
		otherFormes: ["Lopunny-Kitakami"],
		formeOrder: ["Lopunny", "Lopunny-Kitakami"],
	},
	lopunnykitakami: {
		name: "Lopunny-Kitakami",
		baseSpecies: "Lopunny",
		forme: "Kitakami",
		copyData: "Lopunny",

		types: ["Ghost"],
		baseStats: {hp: 65, atk: 86, def: 84, spa: 44, spd: 96, spe: 105},
		abilities: {0: "Regenerator", 1: "Klutz", H: "Merciless"},
		movepoolAdditions: ["pranceandpierce", "shadowsneak", "willowisp"],

		prevo: "Buneary",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		creator: "abismal",
	},

	swablu: {
		inherit: true,
		evos: ["Altaria", "Altaria-Rekindled", "Tenoris"],
	},
	altaria: {
		inherit: true,
		otherFormes: ["Altaria-Mega", "Altaria-Rekindled"],
		formeOrder: ["Altaria", "Altaria-Mega", "Altaria-Rekindled"],
	},
	altariarekindled: {
		name: "Altaria-Rekindled",
		baseSpecies: "Altaria",
		forme: "Rekindled",
		copyData: "Altaria",

		types: ["Fire"],
		baseStats: {hp: 75, atk: 70, def: 90, spa: 70, spd: 105, spe: 80},
		abilities: {0: "Natural Cure", H: "Regenerator"},
		movepoolAdditions: ["grandfinale", "flamecharge"],
		movepoolDeletions: ["dracometeor", "icebeam"],

		prevo: "Swablu",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		creator: "Albatross",
	},
	tenoris: {
		name: "Tenoris",
		copyData: "Altaria",

		types: ["Ice", "Dragon"],
		baseStats: {hp: 75, atk: 110, def: 70, spa: 80, spd: 75, spe: 80},
		abilities: {0: "Volt Absorb", H: "Slush Rush"},
		movepoolAdditions: ["iciclecrash", "blizzard", "hail", "icywind", "snowscape"],
		movepoolDeletions: ["dragondance", "earthquake", "fireblast", "flamethrower"],

		prevo: "Swablu",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		creator: "Albatross",
	},

	// SLATE 2 PROMPT 2

	amira: {
		name: "Amira",
		copyData: "Amaura",

		types: ["Grass"],
		abilities: {0: "Water Absorb", H: "Canopy"},

		evos: ["Aumooras"],
		creator: "Violet",
	},
	aumooras: {
		name: "Aumooras",
		copyData: "Aurorus",

		types: ["Grass"],
		abilities: {0: "Water Absorb", H: "Canopy"},

		prevo: "Amira",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		creator: "Violet",
	},

	mimejr: {
		inherit: true,
		evos: ["Mr. Mime", "Mr. Mime-Galar", "Mr. Mime-Slimy"],
	},
	mrmime: {
		inherit: true,
		otherFormes: ["Mr. Mime-Galar", "Mr. Mime-Slimy"],
		formeOrder: ["Mr. Mime", "Mr. Mime-Galar", "Mr. Mime-Slimy"],
	},
	mrmimegalar: {
		inherit: true,
		evos: ["Mr. Rime", "Mr. Thyme"],
	},
	mrmimeslimy: {
		name: "Mr. Mime-Slimy",
		baseSpecies: "Mr. Mime",
		forme: "Slimy",
		copyData: "Mr. Mime",

		types: ["Poison", "Ground"],
		baseStats: {hp: 90, atk: 70, def: 60, spa: 80, spd: 70, spe: 90},
		abilities: {0: "Soundproof", 1: "Sticky Hold", H: "Technician"},
		movepoolAdditions: ["acidarmor", "acidspray", "afteryou", "block", "bulldoze", "doublekick", "earthpower", "faketears", "mirrorcoat", "mudshot", "rapidspin", "screech", "stompingtantrum", "venoshock"],
		movepoolDeletions: ["bide", "curse", "double-edge", "dynamicpunch", "followme", "nightmare", "rage", "skullbash", "submission", "takedown", "zapcannon"],

		prevo: "Mime Jr.",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		evos: ["Mr. Slime"],
		creator: "Hematite",
	},
	mrthyme: {
		name: "Mr. Thyme",
		copyData: "Mr. Rime",

		types: ["Grass"],
		baseStats: {hp: 85, atk: 70, def: 100, spa: 80, spd: 75, spe: 110},
		abilities: {0: "Curious Medicine", 1: "Screen Cleaner", H: "Flower Veil"},

		prevo: "Mr. Mime-Galar",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		creator: "Paulluxx",
	},
	mrslime: {
		name: "Mr. Slime",
		copyData: "Mr. Rime",
		copyMoves: "Mr. Mime",

		types: ["Poison", "Ground"],
		baseStats: {hp: 125, atk: 75, def: 75, spa: 85, spd: 85, spe: 75},
		abilities: {0: "Soundproof", 1: "Slime Time", H: "Technician"},
		movepoolAdditions: ["slimecannon", "acidarmor", "acidspray", "afteryou", "block", "bulldoze", "doublekick", "earthpower", "faketears", "mirrorcoat", "mudshot", "rapidspin", "screech", "stompingtantrum", "venoshock"],
		movepoolDeletions: ["bide", "curse", "double-edge", "dynamicpunch", "followme", "nightmare", "rage", "skullbash", "submission", "takedown", "zapcannon"],

		prevo: "Mr. Mime-Slimy",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		creator: "Hematite",
	},

	azelf: {
		inherit: true,
		otherFormes: ["Azelf-Ultra-Space"],
		formeOrder: ["Azelf", "Azelf-Ultra-Space"],
	},
	azelfultraspace: {
		name: "Azelf-Ultra-Space",
		baseSpecies: "Azelf",
		forme: "Ultra-Space",
		copyData: "Azelf",

		types: ["Dark"],
		baseStats: {hp: 83, atk: 113, def: 89, spa: 113, spd: 89, spe: 83},
		abilities: {0: "Levitate", H: "Sword of Ruin", S: "Beast Boost"},

		creator: "Gravity Monkey",
	},

	mesprit: {
		inherit: true,
		otherFormes: ["Mesprit-Ultra-Space"],
		formeOrder: ["Mesprit", "Mesprit-Ultra-Space"],
	},
	mespritultraspace: {
		name: "Mesprit-Ultra-Space",
		baseSpecies: "Mesprit",
		forme: "Ultra-Space",
		copyData: "Mesprit",

		types: ["Bug"],
		baseStats: {hp: 103, atk: 127, def: 67, spa: 127, spd: 67, spe: 79},
		abilities: {0: "Levitate", H: "Beads of Ruin", S: "Beast Boost"},

		creator: "Selene",
	},

	nuzleaf: {
		inherit: true,
		evos: ["Shiftry", "Shiftry-Johto"],
	},
	shiftry: {
		inherit: true,
		otherFormes: ["Shiftry-Johto"],
		formeOrder: ["Shiftry", "Shiftry-Johto"],
	},
	shiftryjohto: {
		name: "Shiftry-Johto",
		baseSpecies: "Shiftry",
		forme: "Johto",
		copyData: "Shiftry",

		types: ["Fighting", "Ghost"],
		baseStats: {hp: 80, atk: 92, def: 70, spa: 70, spd: 60, spe: 108},
		abilities: {0: "Aerilate", 1: "Wind Rider", H: "Inspirit"},

		prevo: "Nuzleaf",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		creator: "Hematite",
	},

	ironengines: {
		name: "Iron Engines",
		copyData: "Dodrio",

		types: ["Dark", "Fighting"],
		baseStats: {hp: 70, atk: 90, def: 94, spa: 176, spd: 66, spe: 94},
		abilities: {0: "Hadron Engine"},

		creator: "pupugugu",
	},

	// SLATE 2 PROMPT 3

	zavender: {
		name: "Zavender",
		copyData: "Zacian",

		types: ["Steel"],
		baseStats: {hp: 80, atk: 80, def: 80, spa: 80, spd: 80, spe: 80},
		abilities: {0: "Noble Potential"},
		movepoolDeletions: ["airslash", "assurance", "brutalswing", "falseswipe", "mistyterrain", "nobleroar", "poisonjab", "psychocut", "quickguard", "sacredsword", "solarblade", "swordsdance"],

		evos: ["Zacian", "Zamazenta"],
		creator: "Gravity Monkey",
	},
	zacian: {
		inherit: true,
		prevo: "Zavender",
	},
	zamazenta: {
		inherit: true,
		prevo: "Zavender",
	},

	grubbin: {
		inherit: true,
		evos: ["Charjabug", "Charjabug-Chained"],
	},
	charjabug: {
		inherit: true,
		otherFormes: ["Charjabug-Chained"],
		formeOrder: ["Charjabug", "Charjabug-Chained"],
	},
	charjabugchained: {
		name: "Charjabug-Chained",
		baseSpecies: "Charjabug",
		forme: "Chained",
		copyData: "Charjabug",

		types: ["Poison", "Electric"],
		baseStats: {hp: 58, atk: 58, def: 110, spa: 58, spd: 58, spe: 58},
		abilities: {0: "Battery", 1: "Toxic Chain", H: "Battery Leak"},
		movepoolAdditions: ["sludge", "toxicspikes", "toxicthread", "acidarmor", "acidspray", "sludgebomb", "sludgewave", "venoshock"],
		movepoolDeletions: ["agility", "airslash", "dualwingbeat", "energyball", "roost", "fly", "guillotine", "skydrop"],

		prevo: "Grubbin",
		evoType: "other",
		evos: ["Charjouleak"],
		evoCondition: "A newly-discovered evolution",
		creator: "lydian",
	},
	charjouleak: {
		name: "Charjouleak",
		copyData: "Vikavolt",

		types: ["Poison", "Electric"],
		baseStats: {hp: 68, atk: 68, def: 68, spa: 160, spd: 68, spe: 68},
		abilities: {0: "Battery", 1: "Toxic Chain", H: "Battery Leak"},
		movepoolAdditions: ["sludge", "toxicspikes", "toxicthread", "acidarmor", "acidspray", "sludgebomb", "sludgewave", "venoshock"],
		movepoolDeletions: ["agility", "airslash", "dualwingbeat", "energyball", "roost", "fly", "guillotine", "skydrop"],

		prevo: "Charjabug-Chained",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		creator: "lydian",
	},

	// I hope I did these movepools right aksdjhf
	uraxys: {
		name: "Uraxys",
		copyData: "Deoxys",

		types: ["Dragon", "Poison"],
		baseStats: {hp: 53, atk: 53, def: 53, spa: 59, spd: 53, spe: 149},
		abilities: {0: "Patch Note", H: "Two-Minded", S: "Beast Boost"},
		movepoolAdditions: ["aromatherapy", "refresh", "dracometeor", "psychicnoise", "psychicterrain"],
		movepoolDeletions: ["nastyplot", "superpower", "zapcannon", "counter", "mirrorcoat", "extremespeed"],

		evos: ["Riboxys U"],
		creator: "Paulluxx",
	},
	riboxysu: {
		name: "Riboxys U",
		copyData: "Deoxys",

		types: ["Dragon", "Poison"],
		baseStats: {hp: 83, atk: 83, def: 83, spa: 89, spd: 83, spe: 149},
		abilities: {0: "Patch Note", H: "Two-Minded", S: "Beast Boost"},
		movepoolAdditions: ["aromatherapy", "refresh", "dracometeor", "psychicnoise", "psychicterrain"],
		movepoolDeletions: ["nastyplot", "superpower", "zapcannon", "counter", "mirrorcoat", "extremespeed"],

		prevo: "Uraxys",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		creator: "Paulluxx",
	},
	cytoxys: {
		name: "Cytoxys",
		copyData: "Deoxys-Attack",
		copyMoves: "Deoxys",

		types: ["Bug", "Electric"],
		baseStats: {hp: 53, atk: 59, def: 53, spa: 53, spd: 149, spe: 53},
		abilities: {0: "Patch Note", H: "Two-Minded", S: "Beast Boost"},
		movepoolAdditions: ["aromatherapy", "electroshot", "refresh", "psychicnoise", "psychicterrain"],
		movepoolDeletions: ["nastyplot", "recover", "counter", "mirrorcoat", "extremespeed"],

		evos: ["Riboxys C"],
		creator: "Paulluxx",
	},
	riboxysc: {
		name: "Riboxys C",
		copyData: "Deoxys-Attack",
		copyMoves: "Deoxys",

		types: ["Bug", "Electric"],
		baseStats: {hp: 83, atk: 89, def: 83, spa: 83, spd: 149, spe: 83},
		abilities: {0: "Patch Note", H: "Two-Minded", S: "Beast Boost"},
		movepoolAdditions: ["aromatherapy", "electroshot", "refresh", "psychicnoise", "psychicterrain"],
		movepoolDeletions: ["nastyplot", "recover", "counter", "mirrorcoat", "extremespeed"],

		prevo: "Cytoxys",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		creator: "Paulluxx",
	},
	adexys: {
		name: "Adexys",
		copyData: "Deoxys-Defense",
		copyMoves: "Deoxys",

		types: ["Ghost", "Rock"],
		baseStats: {hp: 149, atk: 53, def: 53, spa: 53, spd: 59, spe: 53},
		abilities: {0: "Patch Note", H: "Two-Minded", S: "Beast Boost"},
		movepoolAdditions: ["aromatherapy", "refresh", "meteorbeam", "psychicnoise", "psychicterrain"],
		movepoolDeletions: ["nastyplot", "cosmicpower", "superpower", "zapcannon", "extremespeed"],

		evos: ["Riboxys A"],
		creator: "Paulluxx",
	},
	riboxysa: {
		name: "Riboxys A",
		copyData: "Deoxys-Defense",
		copyMoves: "Deoxys",

		types: ["Ghost", "Rock"],
		baseStats: {hp: 149, atk: 83, def: 83, spa: 83, spd: 89, spe: 83},
		abilities: {0: "Patch Note", H: "Two-Minded", S: "Beast Boost"},
		movepoolAdditions: ["aromatherapy", "refresh", "meteorbeam", "psychicnoise", "psychicterrain"],
		movepoolDeletions: ["nastyplot", "cosmicpower", "superpower", "zapcannon", "extremespeed"],

		prevo: "Adexys",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		creator: "Paulluxx",
	},
	guaxys: {
		name: "Guaxys",
		copyData: "Deoxys-Speed",
		copyMoves: "Deoxys",

		types: ["Bug", "Normal"],
		baseStats: {hp: 53, atk: 53, def: 149, spa: 53, spd: 53, spe: 59},
		abilities: {0: "Patch Note", H: "Two-Minded", S: "Beast Boost"},
		movepoolAdditions: ["aromatherapy", "refresh", "skullbash", "psychicnoise", "psychicterrain"],
		movepoolDeletions: ["nastyplot", "cosmicpower", "superpower", "zapcannon", "counter", "mirrorcoat"],

		evos: ["Riboxys G"],
		creator: "Paulluxx",
	},
	riboxysg: {
		name: "Riboxys G",
		copyData: "Deoxys-Speed",
		copyMoves: "Deoxys",

		types: ["Bug", "Normal"],
		baseStats: {hp: 83, atk: 83, def: 149, spa: 83, spd: 83, spe: 89},
		abilities: {0: "Patch Note", H: "Two-Minded", S: "Beast Boost"},
		movepoolAdditions: ["aromatherapy", "refresh", "skullbash", "psychicnoise", "psychicterrain"],
		movepoolDeletions: ["nastyplot", "cosmicpower", "superpower", "zapcannon", "counter", "mirrorcoat"],

		prevo: "Guaxys",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		creator: "Paulluxx",
	},

	stunfisk: {
		inherit: true,
		otherFormes: ["Stunfisk-Galar", "Stunfisk-Variant", "Stunfisk-Ultra-Space"],
		formeOrder: ["Stunfisk", "Stunfisk-Galar", "Stunfisk-Variant", "Stunfisk-Ultra-Space"],
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
	stunfiskultraspace: {
		name: "Stunfisk-Ultra-Space",
		baseSpecies: "Stunfisk",
		forme: "Ultra-Space",
		copyData: "Stunfisk",

		types: ["Dark", "Fire"],
		baseStats: {hp: 199, atk: 71, def: 79, spa: 79, spd: 71, spe: 71},
		abilities: {0: "Levitate", H: "Protean", S: "Beast Boost"},
		movepoolAdditions: [ // all three Stunfisk combined and then some more
			"bind", "counter", "crunch", "flashcannon", "icefang", "irondefense", "metalclaw", "metalsound", "screech", "snaptrap", "steelbeam", "terrainpulse",
			"aerialace", "airslash", "banefulbunker", "defog", "fly", "toxicspikes",
			"powertrip", "totaleclipse", "darkpulse", "fireblast", "flamecharge", "heatwave", "overheat", "solarbeam", "willowisp"
		],

		creator: "quagsi",
	},
	
	accelgor: {
		inherit: true,
		evos: ["Velocinobi"],
	},
	velocinobi: { // from Evo 1
		name: "Velocinobi",
		copyData: "Accelgor",

		types: ["Bug", "Ghost"],
		baseStats: {hp: 80, atk: 95, def: 20, spa: 105, spd: 90, spe: 145},
		abilities: {0: "Shed Skin", 1: "Technician", H: "Unburden"},
		movepoolAdditions: ["strengthsap", "hex", "lunge", "shadowball"],

		prevo: "Accelgor",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		creator: "quagsi",
	},
	ironbreath: {
		name: "Iron Breath",
		copyData: "Accelgor",

		types: ["Bug", "Fire"],
		baseStats: {hp: 70, atk: 74, def: 70, spa: 74, spd: 70, spe: 142},
		abilities: {0: "Wind Rider", 1: "Sticky Hold", H: "Unburden", S: "Quark Drive"},
		movepoolAdditions: ["flowingflare", "tailwind", "fireblast", "firespin", "flamecharge", "flamethrower", "flareblitz", "heatwave", "incinerate", "overheat", "scorchingsands", "solarbeam", "willowisp"],

		creator: "Jade",
	},
	
	wimpod: {
		inherit: true,
		evos: ["Golisopod", "Narcissopod"],
	},
	narcissopod: { // from Evo 1
		name: "Narcissopod",
		copyData: "Golisopod",

		types: ["Bug", "Water"],
		baseStats: {hp: 75, atk: 60, def: 90, spa: 105, spd: 120, spe: 80},
		abilities: {0: "Disengage", H: "Mirror Armor"},
		movepoolAdditions: ["gigadrain", "hydropump"],
		movepoolDeletions: ["brickbreak", "closecombat", "drillrun", "dualchop", "ironhead", "rockslide", "rocktomb", "throatchop"],

		prevo: "Wimpod",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		creator: "Violet",
	},
	spiritedaway: {
		name: "Spirited Away",
		copyData: "Wimpod",

		types: ["Bug", "Ghost"],
		baseStats: {hp: 81, atk: 125, def: 81, spa: 81, spd: 81, spe: 81},
		abilities: {0: "Rattled", H: "Archetype", S: "Protosynthesis"},
		movepoolAdditions: ["paranoia", "powertrip", "frostbreath", "hex", "pounce", "shadowball", "willowisp"],

		creator: "BlueRay",
	},

	steenee: {
		inherit: true,
		evos: ["Shiftry", "Shiftry-Johto"],
	},
	tsareena: {
		inherit: true,
		otherFormes: ["Tsareena-Variant"],
		formeOrder: ["Tsareena", "Tsareena-Variant"],
	},
	tsareenavariant: {
		name: "Tsareena-Variant",
		baseSpecies: "Tsareena",
		forme: "Variant",
		copyData: "Tsareena",

		types: ["Grass", "Psychic"],
		baseStats: {hp: 76, atk: 83, def: 73, spa: 74, spd: 74, spe: 130},
		abilities: {0: "Opportunist", 1: "Queenly Majesty", H: "Sweet Veil"},
		movepoolAdditions: ["psykick", "speedswap", "trick", "skillswap"],

		prevo: "Steenee",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		creator: "Selene",
	},

	dragonair: {
		inherit: true,
		evos: ["Dragonite", "Dragoracle"],
	},
	dragoracle: {
		name: "Dragoracle",
		copyData: "Dragonite",
		copyMoves: "Dragonair",

		types: ["Dragon", "Psychic"],
		baseStats: {hp: 91, atk: 89, def: 85, spa: 93, spd: 159, spe: 83},
		abilities: {0: "Cloud Nine", H: "Marvel Scale"},
		movepoolAdditions: ["empathicpulse", "painsplit", "synchronoise", "futuresight", "psybeam", "psychicterrain", "psyshock"],
		movepoolDeletions: ["earthquake", "lowkick", "megakick", "superpower"],

		prevo: "Dragonair",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		creator: "Albatross",
	},
};
