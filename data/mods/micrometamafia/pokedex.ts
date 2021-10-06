export const Pokedex: {[speciesid: string]: SpeciesData} = {
	gastrodon: {
		num: 423,
		name: "Gastrodon",
		types: ["Water", "Ground"],
		baseStats: {hp: 95, atk: 75, def: 75, spa: 75, spd: 95, spe: 74},
		abilities: {0: "Damp", 1: "Poison Touch", H: "Water Absorb"},
		weightkg: 29.9,
	},
	klefki: {
		num: 707,
		name: "Klefki",
		types: ["Steel", "Fairy"],
		baseStats: {hp: 85, atk: 90, def: 90, spa: 90, spd: 90, spe: 85},
		abilities: {0: "Damp", 1: "Poison Touch", H: "Water Absorb"},
		weightkg: 29.9,
	},
};
