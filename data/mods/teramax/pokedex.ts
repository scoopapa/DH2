export const Pokedex: {[speciesid: string]: ModdedSpeciesData} = {
	darmanitangalarzen: {
		inherit: true,
		baseStats: {hp: 105, atk: 55, def: 65, spa: 120, spd: 65, spe: 130},
	},
	fluttermane: {
		inherit: true,
		types: ["Ghost", "Bug"],
		baseStats: {hp: 65, atk: 95, def: 55, spa: 115, spd: 135, spe: 105},
	},
	palafinhero: {
		inherit: true,
		types: ["Water", "Fighting"],
		baseStats: {hp: 100, atk: 100, def: 135, spa: 83, spd: 92, spe: 60},
	},
	ironbundle: {
		inherit: true,
		baseStats: {hp: 56, atk: 92, def: 114, spa: 116, spd: 64, spe: 128},
	},
	dracovish: {
		inherit: true,
		abilities: {0: "Water Absorb", 1: "Regenerator", H: "Sand Rush"},
	},
	annihilape: {
		inherit: true,
		types: ["Ghost", "Fighting"],
		baseStats: {hp: 130, atk: 115, def: 70, spa: 75, spd: 50, spe: 95},
		abilities: {0: "Vital Spirit", 1: "Cursed Body", H: "Iron Fist"},
	},
};
