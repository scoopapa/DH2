export const Pokedex: import('../../../sim/dex-species').ModdedSpeciesDataTable = {
	landorus: {
		inherit: true,
		abilities: {0: "Sand Force", H: "Defiant"},
	},
	urshifu: {
		inherit: true,
		baseStats: {hp: 100, atk: 120, def: 100, spa: 73, spd: 60, spe: 97},
	},
	ogerponhearthflame: {
		inherit: true,
		abilities: {0: "Regenerator"},
	},
	
	darkrai: {
		inherit: true,
		baseStats: {hp: 90, atk: 90, def: 90, spa: 120, spd: 90, spe: 120},
	},
	kingambit: {
		inherit: true,
		baseStats: {hp: 100, atk: 125, def: 130, spa: 60, spd: 85, spe: 50},
	},
	chienpao: {
		inherit: true,
		baseStats: {hp: 80, atk: 100, def: 80, spa: 90, spd: 85, spe: 135},
	},
	chiyu: {
		inherit: true,
		baseStats: {hp: 85, atk: 90, def: 90, spa: 95, spd: 130, spe: 80},
	},
	
	deoxys: {
		inherit: true,
		baseStats: {hp: 50, atk: 120, def: 90, spa: 120, spd: 90, spe: 130},
		abilities: {0: "Infiltrator"},
	},
	deoxysattack: {
		inherit: true,
		baseStats: {hp: 50, atk: 150, def: 80, spa: 150, spd: 80, spe: 90},
		abilities: {0: "No Guard"},
	},
	deoxysdefense: {
		inherit: true,
		abilities: {0: "Thick Fat"},
	},
	deoxysspeed: {
		inherit: true,
		baseStats: {hp: 50, atk: 90, def: 110, spa: 90, spd: 110, spe: 150},
		abilities: {0: "Aftermath"},
	},
	xerneas: {
		inherit: true,
		types: ["Fairy", "Fighting"],
		baseStats: {hp: 108, atk: 121, def: 80, spa: 71, spd: 84, spe: 86},
	},
	xerneasneutral: {
		inherit: true,
		types: ["Fairy", "Fighting"],
		baseStats: {hp: 108, atk: 121, def: 80, spa: 71, spd: 84, spe: 86},
	},
	yveltal: {
		inherit: true,
		baseStats: {hp: 96, atk: 118, def: 75, spa: 94, spd: 78, spe: 94},
		abilities: {0: "Intimidate", H: "Dark Aura"},
	},
	zygarde: {
		inherit: true,
		baseStats: {hp: 108, atk: 101, def: 100, spa: 101, spd: 85, spe: 75},
	},
	zygardecomplete: {
		inherit: true,
		baseStats: {hp: 216, atk: 81, def: 80, spa: 103, spd: 65, spe: 75},
	},
};