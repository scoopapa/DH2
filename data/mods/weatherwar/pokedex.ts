export const Pokedex: {[k: string]: ModdedSpeciesData} = {
	hitmonchan: {
		inherit: true,
		types: ["Fighting", "Steel"],
		baseStats: {hp: 80, atk: 115, def: 79, spa: 35, spd: 110, spe: 106},
		abilities: {0: "Beatdown", H: "Technician"},
	},
	garganacl: {
		inherit: true,
		types: ["Rock"],
		baseStats: {hp: 100, atk: 100, def: 130, spa: 45, spd: 90, spe: 35},
		abilities: {0: "Landslide", H: "Sand Force"},
	},
	
	//duomod reference
	impsaustor: {
		num: 999.5,
		species: "Impsaustor",
		types: ["Dark", "Poison"],
		gender: "N",
		baseStats: {hp: 100, atk: 120, def: 80, spa: 80, spd: 120, spe: 100}, // i'm so freaking tired i did this to be funny lmao
		abilities: {0: "Vent"},
		heightm: 1,
		weightkg: 5,
		eggGroups: ["Undiscovered"],
	},
}