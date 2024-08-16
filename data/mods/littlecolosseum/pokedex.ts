export const Pokedex: {[speciesid: string]: ModdedSpeciesData} = {
	gastly: {
		inherit: true,
		baseStats: {hp: 30, atk: 35, def: 30, spa: 70, spd: 35, spe: 60},
		abilities: {0: "Frisk", 1: "Protean", H: "Neutralizing Gas"},
	},
	swablu: {
		inherit: true,
		types: ["Fairy", "Flying"],
		baseStats: {hp: 45, atk: 45, def: 60, spa: 45, spd: 75, spe: 50},
		abilities: {0: "Natural Cure", 1: "Scrappy", H: "Pixilate"},
	},
	slugma: {
		inherit: true,
		baseStats: {hp: 30, atk: 40, def: 40, spa: 80, spd: 30, spe: 40},
		abilities: {0: "Magma Armor", 1: "Weak Armor", H: "Hazard Absorb"},
	},
	sprigatito: {
		inherit: true,
		baseStats: {hp: 40, atk: 65, def: 54, spa: 31, spd: 45, spe: 75},
		abilities: {0: "Overgrow", H: "Protean (Gen 7)"},
	},
};
