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
}