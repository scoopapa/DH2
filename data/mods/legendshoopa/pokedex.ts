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
		abilities: {0: "Strong Jaw", 1: "Inner Focus", H: "Two Headded"},
		weightkg: 41.5,
	},

	girafgiraf: {
		num: -101,
		name: "Girafgiraf",
		types: ["Psychic", "Ghost"],
		baseStats: {hp: 80, atk: 95, def: 70, spa: 95, spd: 70, spe: 95},
		abilities: {0: "Strong Jaw", 1: "Inner Focus", H: "Two Headded"},
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
};