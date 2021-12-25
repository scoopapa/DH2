export const Pokedex: {[speciesid: string]: ModdedSpeciesData} = {
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
		evoType: "other",
		evoCondition: "A newly-discovered evolution", // generic flavor where not specified
		creator: "ausma",
	},

	noctowl: {
		inherit: true,
		evos: ["hoobarn"],
	},
	hoobarn: {
		name: "Hoobarn",
		copyData: "Noctowl",

		baseStats: {hp: 100, atk: 70, def: 90, spa: 86, spd: 96, spe: 70},
		abilities: {0: "Insomnia", 1: "Keen Eye", H: "Prankster"},

		prevo: "Noctowl",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
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
		evos: ["Mienshao", "Mienshao-Variant"],
	},
	mienshaovariant: {
		name: "Mienshao-Variant",
		baseSpecies: "Mienshao",
		forme: "Variant",
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

		copyMoves: "Kadabra", // although its data is based on Alakazam, it doesn't have Alakazam's moves
		movepoolAdditions: ["metalclaw", "shadowclaw", "spite", "willowisp"],

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
		abilities: {0: "Gluttony", 1: "Corrosion"},
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
		otherFormes: ["Inkay-Variant"],
		formeOrder: ["Inkay", "Inkay-Variant"],
	},
	inkayvariant: {
		name: "Inkay-Variant",
		baseSpecies: "Inkay",
		forme: "Variant",
		copyData: "Inkay",

		types: ["Dark", "Water"],
		baseStats: {hp: 53, atk: 59, def: 53, spa: 27, spd: 56, spe: 40},
		abilities: {0: "Keen Eye", 1: "Prankster", H: "Mimicry"},
		movepoolAdditions: ["brine", "dive", "firstimpression", "terrainpulse", "scald", "surf", "watergun", "waterpulse"],
		movepoolDeletions: ["brutalswing", "calmmind", "futuresight", "guardswap", "powersplit", "psybeam", "psyshock", "storedpower"],

		evos: ["Malamar-Variant"],
		creator: "Violettes",
	},
	malamar: {
		inherit: true,
		otherFormes: ["Malamar-Variant"],
		formeOrder: ["Malamar", "Malamar-Variant"],
	},
	malamarvariant: {
		name: "Malamar-Variant",
		baseSpecies: "Malamar",
		forme: "Variant",
		copyData: "Malamar",

		types: ["Dark", "Water"],
		baseStats: {hp: 86, atk: 102, def: 88, spa: 48, spd: 95, spe: 63},
		abilities: {0: "Keen Eye", 1: "Prankster", H: "Mimicry"},
		movepoolAdditions: ["brine", "dive", "firstimpression", "terrainpulse", "scald", "surf", "watergun", "waterpulse"],
		movepoolDeletions: ["brutalswing", "calmmind", "futuresight", "guardswap", "powersplit", "psybeam", "psyshock", "storedpower"],

		prevo: ["Inkay-Variant"],
		evoLevel: 30,
		evoCondition: "with the console turned upside-down",
		creator: "Violettes",
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
};
