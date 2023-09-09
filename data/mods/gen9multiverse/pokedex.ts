export const Pokedex: {[k: string]: ModdedSpeciesData} = {
	venusaur: {
		inherit: true,
		baseStats: {hp: 80, atk: 91, def: 103, spa: 111, spd: 110, spe: 80},
		abilities: {0: "Thick Fat"},
	},
	machamp: {
		inherit: true,
		baseStats: {hp: 100, atk: 130, def: 70, spa: 65, spd: 120, spe: 45},
		abilities: {0: "Inner Focus", H: "Brazen Brawn"},
	},
	gengar: {
		inherit: true,
		baseStats: {hp: 60, atk: 65, def: 60, spa: 130, spd: 130, spe: 110},
		abilities: {0: "Neutralizing Gas"},
		prevo: null,
	},
	starmie: {
		inherit: true,
		baseStats: {hp: 60, atk: 75, def: 95, spa: 100, spd: 95, spe: 115},
		abilities: {0: "Natural Cure", 1: "Analytic", H: "Chromatophore"},
	},
	dragonite: {
		inherit: true,
		types: ["Dragon", "Normal"],
		baseStats: {hp: 91, atk: 104, def: 95, spa: 120, spd: 100, spe: 90},
		abilities: {0: "Inner Focus"},
	},
	magneton: {
		inherit: true,
		baseStats: {hp: 75, atk: 60, def: 85, spa: 105, spd: 85, spe: 135},
		abilities: {0: "Analytic"},
		evos: null,
	},
	hypno: {
		inherit: true,
		baseStats: {hp: 100, atk: 73, def: 70, spa: 93, spd: 125, spe: 67},
		abilities: {0: "Insomnia", H: "Immunity"},
	},
	gastly: {
		inherit: true,
		types: ["Ghost", "Dark"],
		baseStats: {hp: 80, atk: 65, def: 60, spa: 120, spd: 90, spe: 110},
		evos: null,
	},
	rapidash: {
		inherit: true,
		baseStats: {hp: 90, atk: 100, def: 90, spa: 110, spd: 85, spe: 105},
		abilities: {0: "Daymare", H: "Flash Fire"},
	},
	mewtwo: {
		inherit: true,
		types: ["Psychic", "Fighting"],
		baseStats: {hp: 86, atk: 115, def: 100, spa: 64, spd: 95, spe: 90},
		abilities: {0: "Steadfast", H: "Sword of Ruin"},
	},
	lanturn: {
		inherit: true,
		baseStats: {hp: 125, atk: 58, def: 63, spa: 86, spd: 86, spe: 67},
		abilities: {0: "Compound Eyes", 1: "Volt Absorb", H: "Water Absorb"},
	},
	quagsire: {
		inherit: true,
		baseStats: {hp: 105, atk: 105, def: 85, spa: 65, spd: 85, spe: 35},
		abilities: {0: "Water Absorb"},
	},
	ursaring: {
		inherit: true,
		types: ["Normal", "Fairy"],
		baseStats: {hp: 90, atk: 120, def: 95, spa: 70, spd: 80, spe: 55},
		abilities: {0: "Guts"},
		evos: null,
	},
	donphan: {
		inherit: true,
		abilities: {0: "Sturdy", H: "Regenerator"},
	},
	hitmontop: {
		inherit: true,
		types: ["Fighting", "Steel"],
		baseStats: {hp: 80, atk: 105, def: 100, spa: 40, spd: 110, spe: 60},
		abilities: {0: "Regenerator", 1: "Intimidate", H: "Technician"},
	},
	raikou: {
		inherit: true,
		baseStats: {hp: 80, atk: 85, def: 80, spa: 115, spd: 100, spe: 110},
		abilities: {0: "Legendary Beast"},
	},
	hooh: {
		inherit: true,
		baseStats: {hp: 106, atk: 120, def: 95, spa: 80, spd: 104, spe: 75},
		abilities: {0: "Regenerator"},
	},
	gardevoir: {
		inherit: true,
		baseStats: {hp: 88, atk: 65, def: 65, spa: 125, spd: 115, spe: 100},
		abilities: {0: "Pixelgreat", H: "Trace"},
	},
	cacturne: {
		inherit: true,
		baseStats: {hp: 70, atk: 120, def: 85, spa: 115, spd: 80, spe: 90},
		abilities: {0: "Water Absorb", H: "Rough Skin"},
	},
	solrock: {
		inherit: true,
		types: ["Rock", "Fairy"],
		baseStats: {hp: 90, atk: 135, def: 125, spa: 55, spd: 75, spe: 70},
		abilities: {0: "Levitate"},
	},
	absol: {
		inherit: true,
		types: ["Dark", "Steel"],
		baseStats: {hp: 70, atk: 130, def: 60, spa: 115, spd: 60, spe: 115},
		abilities: {0: "Justified", H: "Magic Bounce"},
	},
	glalie: {
		inherit: true,
		baseStats: {hp: 80, atk: 120, def: 80, spa: 80, spd: 80, spe: 100},
		abilities: {0: "Refrigerate", H: "Moody"},
	},
	regirock: {
		inherit: true,
		types: ["Rock", "Flying"],
		baseStats: {hp: 80, atk: 105, def: 200, spa: 50, spd: 100, spe: 45},
		abilities: {0: "Accretion"},
	},
	latias: {
		inherit: true,
		types: ["Dragon"],
		baseStats: {hp: 80, atk: 80, def: 85, spa: 85, spd: 90, spe: 110},
	},
};