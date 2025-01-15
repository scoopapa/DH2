export const Pokedex: {[k: string]: ModdedSpeciesData} = {
	narwa: {
		num: 1,
		species: "Narwa",
		types: ["Dragon", "Electric"],
		baseStats: {hp: 88, atk: 83, def: 77, spa: 105, spd: 112, spe: 75},
		abilities: {0: "Pressure", 1: "Queenly Majesty", H: "Telepathy"},
		weightkg: 244,
	},
	hinakagiyama: {
		num: 2,
		species: "Hina Kagiyama",
		types: ["Poison", "Dark"],
		baseStats: {hp: 100, atk: 110, def: 75, spa: 50, spd: 120, spe: 45},
		abilities: {0: "Cursed Body", H: "Pressure"},
		weightkg: 80,
	},
	luigi: {
		num: 3,
		species: "Luigi",
		types: ["Normal", "Flying"],
		baseStats: {hp: 86, atk: 85, def: 101, spa: 85, spd: 111, spe: 82},
		abilities: {0: "Rattled", 1: "Klutz", H: "Analytic"},
		weightkg: 62,
	},
};
