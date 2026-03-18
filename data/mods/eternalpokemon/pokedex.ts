export const Pokedex: { [k: string]: ModdedSpeciesData } = {

	// Phase I
	// Slate I

	// Eternal Magikarp
	magikarp: {
		inherit: true,
		otherFormes: ["Magikarp-Eternal"],
		formeOrder: ["Magikarp", "Magikarp-Eternal"],
	},
	magikarpeternal: {
		name: "Magikarp-Eternal",
		baseSpecies: "Magikarp",
		forme: "Eternal",
		copyData: "Magikarp",
		
		types: ["Water"],
		baseStats: {hp: 89, atk: 80, def: 75, spa: 95, spd: 80, spe: 120},
		abilities: {0: "Swift Swim"},
		movepoolAdditions: ["callforfamily"],

		gender: "M",
		// heightm: 0,
		// weightkg: 0,
		// color: "White",
		eggGroups: ["Undiscovered"],

		prevo: null,
		evos: [],
		evoType: null,
		evoCondition: null,

		creator: "BlueRay",
	},

	// Eternal Spinarak	
	spinarak: {
		inherit: true,
		otherFormes: ["Spinarak-Eternal"],
		formeOrder: ["Spinarak", "Spinarak-Eternal"],
	},
	spinaraketernal: {
		num: 169,
		name: "Spinarak-Eternal",
		baseSpecies: "Spinarak",
		forme: "Eternal",
		copyData: "Spinarak",
		
		types: ["Bug", "Poison"],
		baseStats: {hp: 42, atk: 126, def: 42, spa: 42, spd: 42, spe: 105},
		abilities: {0: "Sniper"},
		movepoolAdditions: ["cheliceraprey"],

		gender: "F",
		// heightm: 0,
		// weightkg: 0,
		// color: "White",
		eggGroups: ["Undiscovered"],

		prevo: null,
		evos: [],
		evoType: null,
		evoCondition: null,

		creator: "lydian",
	},

	// Eternal Skrelp
	skrelp: {
		inherit: true,
		otherFormes: ["Skrelp-Eternal"],
		formeOrder: ["Skrelp", "Skrelp-Eternal"],
	},
	skrelpeternal: {
		num: 690,
		name: "Skrelp-Eternal",
		baseSpecies: "Skrelp",
		forme: "Eternal",
		copyData: "Skrelp",
		
		types: ["Poison", "Water"],
		baseStats: {hp: 63, atk: 100, def: 120, spa: 60, spd: 120, spe: 30},
		abilities: {0: "Adaptability"},
		movepoolAdditions: ["spiraldrain"],

		gender: "M",
		// heightm: 0,
		// weightkg: 0,
		// color: "White",
		eggGroups: ["Undiscovered"],

		prevo: null,
		evos: [],
		evoType: null,
		evoCondition: null,

		creator: "BlueRay",
	},

	// Phase I
	// Slate II

	// Eternal Pikachu
	pikachu: {
		inherit: true,
		otherFormes: ["Pikachu-Eternal"],
		formeOrder: ["Pikachu", "Pikachu-Eternal"],
	},
	pikachueternal: {
		name: "Pikachu-Eternal",
		baseSpecies: "Pikachu",
		forme: "Eternal",
		copyData: "Pikachu",
		
		types: ["Electric"],
		baseStats: {hp: 85, atk: 75, def: 84, spa: 55, spd: 90, spe: 95},
		abilities: {0: "Lightning Rod"},
		movepoolAdditions: ["stormfront"],

		gender: "M",
		// heightm: 0,
		// weightkg: 0,
		// color: "White",
		eggGroups: ["Undiscovered"],

		prevo: null,
		evos: [],
		evoType: null,
		evoCondition: null,

		creator: "PalpitoadChamp",
	},

	// Eternal Fletchinder
	fletchinder: {
		inherit: true,
		otherFormes: ["Fletchinder-Eternal"],
		formeOrder: ["Fletchinder", "Fletchinder-Eternal"],
	},
	fletchindereternal: {
		name: "Fletchinder-Eternal",
		baseSpecies: "Fletchinder",
		forme: "Eternal",
		copyData: "Fletchinder",
		
		types: ["Fire", "Flying"],
		baseStats: {hp: 91, atk: 73, def: 55, spa: 85, spd: 81, spe: 113},
		abilities: {0: "Gale Wings"},
		movepoolAdditions: ["secondwind"],

		gender: "F",
		// heightm: 0,
		// weightkg: 0,
		// color: "White",
		eggGroups: ["Undiscovered"],

		prevo: null,
		evos: [],
		evoType: null,
		evoCondition: null,

		creator: "lydian",
	},

	// Eternal Noibat
	noibat: {
		inherit: true,
		otherFormes: ["Noibat-Eternal"],
		formeOrder: ["Noibat", "Noibat-Eternal"],
	},
	noibateternal: {
		name: "Noibat-Eternal",
		baseSpecies: "Noibat",
		forme: "Eternal",
		copyData: "Noibat",
		
		types: ["Flying", "Dragon"],
		baseStats: {hp: 91, atk: 47, def: 86, spa: 113, spd: 91, spe: 106},
		abilities: {0: "Infiltrator"},
		movepoolAdditions: ["ultraresonance"],

		gender: "M",
		// heightm: 0,
		// weightkg: 0,
		// color: "White",
		eggGroups: ["Undiscovered"],

		prevo: null,
		evos: [],
		evoType: null,
		evoCondition: null,

		creator: "lydian",
	},

	// Phase I
	// Slate III

	// Eternal Onix
	onix: {
		inherit: true,
		otherFormes: ["Onix-Eternal"],
		formeOrder: ["Onix", "Onix-Eternal"],
	},
	onixeternal: {
		name: "Onix-Eternal",
		baseSpecies: "Onix",
		forme: "Eternal",
		copyData: "Onix",
		
		types: ["Rock", "Ground"],
		baseStats: {hp: 97, atk: 107, def: 98, spa: 30, spd: 138, spe: 39},
		abilities: {0: "Rock Head"},
		movepoolAdditions: ["crystallize"],

		gender: "M",
		// heightm: 0,
		// weightkg: 0,
		// color: "White",
		eggGroups: ["Undiscovered"],

		prevo: null,
		evos: [],
		evoType: null,
		evoCondition: null,

		creator: "lydian",
	},

	// Eternal Staryu
	staryu: {
		inherit: true,
		otherFormes: ["Staryu-Eternal"],
		formeOrder: ["Staryu", "Staryu-Eternal"],
	},
	staryueternal: {
		name: "Staryu-Eternal",
		baseSpecies: "Staryu",
		forme: "Eternal",
		copyData: "Staryu",
		
		types: ["Water"],
		baseStats: {hp: 66, atk: 99, def: 93, spa: 126, spd: 93, spe: 42},
		abilities: {0: "Analytic"},
		movepoolAdditions: ["corereaction"],

		gender: "N",
		// heightm: 0,
		// weightkg: 0,
		// color: "White",
		eggGroups: ["Undiscovered"],

		prevo: null,
		evos: [],
		evoType: null,
		evoCondition: null,

		creator: "lydian",
	},

	// Eternal Doublade
	doublade: {
		inherit: true,
		otherFormes: ["Doublade-Eternal"],
		formeOrder: ["Doublade", "Doublade-Eternal"],
	},
	doubladeeternal: {
		name: "Doublade-Eternal",
		baseSpecies: "Doublade",
		forme: "Eternal",
		copyData: "Doublade",
		
		types: ["Steel", "Ghost"],
		// baseStats: {hp: 59, atk: 127, def: 99, spa: 28, spd: 49, spe: 137},
		baseStats: {hp: 59, atk: 127, def: 99, spa: 45, spd: 49, spe: 120}, // changed as of 19/04/2025
		abilities: {0: "No Guard"},
		movepoolAdditions: ["soulsplittingslices"],

		gender: "F",
		// heightm: 0,
		// weightkg: 0,
		// color: "White",
		eggGroups: ["Undiscovered"],

		prevo: null,
		evos: [],
		evoType: null,
		evoCondition: null,

		creator: "lydian",
	},

	// Phase I
	// Slate IV

	// Eternal Ekans
	ekans: {
		inherit: true,
		otherFormes: ["Ekans-Eternal"],
		formeOrder: ["Ekans", "Ekans-Eternal"],
	},
	ekanseternal: {
		name: "Ekans-Eternal",
		baseSpecies: "Ekans",
		forme: "Eternal",
		copyData: "Ekans",
		
		types: ["Poison"],
		baseStats: {hp: 75, atk: 99, def: 74, spa: 40, spd: 84, spe: 75},
		abilities: {0: "Intimidate"},
		movepoolAdditions: ["rocketwrap"],

		gender: "F",
		// heightm: 0,
		// weightkg: 0,
		// color: "White",
		eggGroups: ["Undiscovered"],

		prevo: null,
		evos: [],
		evoType: null,
		evoCondition: null,

		creator: "PalpitoadChamp",
	},

	// Eternal Krokorok
	krokorok: {
		inherit: true,
		otherFormes: ["Krokorok-Eternal"],
		formeOrder: ["Krokorok", "Krokorok-Eternal"],
	},
	krokoroketernal: {
		name: "Krokorok-Eternal",
		baseSpecies: "Krokorok",
		forme: "Eternal",
		copyData: "Krokorok",
		
		types: ["Ground", "Dark"],
		baseStats: {hp: 111, atk: 111, def: 111, spa: 74, spd: 74, spe: 37},
		abilities: {0: "Intimidate"},
		movepoolAdditions: ["kleptomania"],

		gender: "M",
		// heightm: 0,
		// weightkg: 0,
		// color: "White",
		eggGroups: ["Undiscovered"],

		prevo: null,
		evos: [],
		evoType: null,
		evoCondition: null,

		creator: "lydian",
	},

	// Eternal Litleo
	litleo: {
		inherit: true,
		otherFormes: ["Litleo-Eternal"],
		formeOrder: ["Litleo", "Litleo-Eternal"],
	},
	litleoeternal: {
		name: "Litleo-Eternal",
		baseSpecies: "Litleo",
		forme: "Eternal",
		copyData: "Litleo",
		
		types: ["Fire", "Normal"],
		baseStats: {hp: 92, atk: 115, def: 92, spa: 46, spd: 69, spe: 92},
		abilities: {0: "Moxie"},
		movepoolAdditions: ["fieryprovocation"],

		gender: "M",
		// heightm: 0,
		// weightkg: 0,
		// color: "White",
		eggGroups: ["Undiscovered"],

		prevo: null,
		evos: [],
		evoType: null,
		evoCondition: null,

		creator: "lydian",
	},

	// Phase I
	// Slate V

	// Eternal Weepinbell
	weepinbell: {
		inherit: true,
		otherFormes: ["Weepinbell-Eternal"],
		formeOrder: ["Weepinbell", "Weepinbell-Eternal"],
	},
	weepinbelleternal: {
		name: "Weepinbell-Eternal",
		baseSpecies: "Weepinbell",
		forme: "Eternal",
		copyData: "Weepinbell",
		
		types: ["Grass", "Poison"],
		baseStats: {hp: 98, atk: 101, def: 83, spa: 85, spd: 111, spe: 11},
		abilities: {0: "Gluttony"},
		movepoolAdditions: ["flytrap"],

		gender: "M",
		// heightm: 0,
		// weightkg: 0,
		// color: "White",
		eggGroups: ["Undiscovered"],

		prevo: null,
		evos: [],
		evoType: null,
		evoCondition: null,

		creator: "lydian",
	},

	eevee: {
		inherit: true,
		otherFormes: ["Eevee-Eternal"],
		formeOrder: ["Eevee", "Eevee-Eternal"],
	},
	eeveeeternal: {
		name: "Eevee-Eternal",
		baseSpecies: "Eevee",
		forme: "Eternal",
		copyData: "Eevee",
		
		types: ["Normal"],
		baseStats: {hp: 95, atk: 85, def: 89, spa: 75, spd: 95, spe: 85},
		abilities: {0: "Adaptability"},
		movepoolAdditions: ["continuoussteps"],

		gender: "F",
		// heightm: 0,
		// weightkg: 0,
		// color: "White",
		eggGroups: ["Undiscovered"],

		prevo: null,
		evos: [],
		evoType: null,
		evoCondition: null,

		creator: "PalpitoadChamp",
	},

	dragonair: {
		inherit: true,
		otherFormes: ["Dragonair-Eternal"],
		formeOrder: ["Dragonair", "Dragonair-Eternal"],
	},
	dragonaireternal: {
		name: "Dragonair-Eternal",
		baseSpecies: "Dragonair",
		forme: "Eternal",
		copyData: "Dragonair",
		
		types: ["Dragon"],
		baseStats: {hp: 95, atk: 94, def: 95, spa: 115, spd: 120, spe: 80},
		abilities: {0: "Shed Skin"},
		movepoolAdditions: ["nineorbassault"],

		gender: "F",
		// heightm: 0,
		// weightkg: 0,
		// color: "White",
		eggGroups: ["Undiscovered"],

		prevo: null,
		evos: [],
		evoType: null,
		evoCondition: null,

		creator: "PalpitoadChamp",
	},

	hippopotas: {
		inherit: true,
		otherFormes: ["Hippopotas-Eternal"],
		formeOrder: ["Hippopotas", "Hippopotas-Eternal"],
	},
	hippopotaseternal: {
		name: "Hippopotas-Eternal",
		baseSpecies: "Hippopotas",
		forme: "Eternal",
		copyData: "Hippopotas",
		
		types: ["Ground"],
		baseStats: {hp: 88, atk: 52, def: 93, spa: 113, spd: 83, spe: 95},
		abilities: {0: "Sand Stream"},
		movepoolAdditions: ["sirocco"],

		gender: "F",
		// heightm: 0,
		// weightkg: 0,
		// color: "White",
		eggGroups: ["Undiscovered"],

		prevo: null,
		evos: [],
		evoType: null,
		evoCondition: null,

		creator: "G-Luke",
	},

	// Phase I
	// Slate VI

	// Eternal Kirlia
	kirlia: {
		inherit: true,
		otherFormes: ["Kirlia-Eternal"],
		formeOrder: ["Kirlia", "Kirlia-Eternal"],
	},
	kirliaeternal: {
		name: "Kirlia-Eternal",
		baseSpecies: "Kirlia",
		forme: "Eternal",
		copyData: "Kirlia",
		
		types: ["Psychic", "Fairy"],
		baseStats: {hp: 66, atk: 66, def: 88, spa: 110, spd: 121, spe: 66},
		abilities: {0: "Synchronize"},
		movepoolAdditions: ["sentimentalpirouette"],

		gender: "M",
		// heightm: 0,
		// weightkg: 0,
		// color: "White",
		eggGroups: ["Undiscovered"],

		prevo: null,
		evos: [],
		evoType: null,
		evoCondition: null,

		creator: "lydian",
	},

	// Eternal Skiddo
	skiddo: {
		inherit: true,
		otherFormes: ["Skiddo-Eternal"],
		formeOrder: ["Skiddo", "Skiddo-Eternal"],
	},
	skiddoeternal: {
		name: "Skiddo-Eternal",
		baseSpecies: "Skiddo",
		forme: "Eternal",
		copyData: "Skiddo",
		
		types: ["Grass"],
		baseStats: {hp: 96, atk: 85, def: 78, spa: 77, spd: 117, spe: 77},
		abilities: {0: "Grass Pelt"},
		movepoolAdditions: ["mosspit"],

		gender: "M",
		// heightm: 0,
		// weightkg: 0,
		// color: "White",
		eggGroups: ["Undiscovered"],

		prevo: null,
		evos: [],
		evoType: null,
		evoCondition: null,

		creator: "PalpitoadChamp",
	},

	// Eternal Pancham
	pancham: {
		inherit: true,
		otherFormes: ["Pancham-Eternal"],
		formeOrder: ["Pancham", "Pancham-Eternal"],
	},
	panchameternal: {
		name: "Pancham-Eternal",
		baseSpecies: "Pancham",
		forme: "Eternal",
		copyData: "Pancham",
		
		types: ["Fighting"],
		baseStats: {hp: 89, atk: 120, def: 79, spa: 39, spd: 59, spe: 108},
		abilities: {0: "Iron Fist"},
		movepoolAdditions: ["corkscrewpunch"],

		gender: "F",
		// heightm: 0,
		// weightkg: 0,
		// color: "White",
		eggGroups: ["Undiscovered"],

		prevo: null,
		evos: [],
		evoType: null,
		evoCondition: null,

		creator: "G-Luke",
	},

	// Eternal Espurr
	espurr: {
		inherit: true,
		otherFormes: ["Espurr-Eternal"],
		formeOrder: ["Espurr", "Espurr-Eternal"],
	},
	espurreternal: {
		name: "Espurr-Eternal",
		baseSpecies: "Espurr",
		forme: "Eternal",
		copyData: "Espurr",
		
		types: ["Psychic"],
		baseStats: {hp: 92, atk: 28, def: 88, spa: 115, spd: 111, spe: 31},
		abilities: {0: "Infiltrator"},
		movepoolAdditions: ["catseye"],

		gender: "F",
		// heightm: 0,
		// weightkg: 0,
		// color: "White",
		eggGroups: ["Undiscovered"],

		prevo: null,
		evos: [],
		evoType: null,
		evoCondition: null,

		creator: "G-Luke",
	},
};
