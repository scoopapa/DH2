import { inherits } from "util";

export const Pokedex: { [k: string]: ModdedSpeciesData } = {
	volcarona: {
		inherit: true,
		abilities: {0: "Fluffy"},
	},
	golemalola: {
		inherit: true,	
	},
	lurantis: {
		inherit: true,
		baseStats: {hp: 85, atk: 105, def: 90, spa: 95, spd: 90, spe: 75},
	},
	ironcrown: {
		inherit: true,
		abilities: {0: "Queenly Majesty", H: "Battle Armor"},
	},
	mamoswine: {
		inherit: true,
	},
	ceruledge: {
		inherit: true,
	},
	carbink: {
		inherit: true,
		abilities: {0: "Magic Bounce"},
	},
	moltres: {
		inherit: true,
		abilities: {0: "Magic Guard"},
	},
	illumise: {
		inherit: true,
		abilities: {0: "Call Volbeat"},
	},
	volbeat: {
		inherit: true,
		abilities: {0: "Call Illumise"},
	},
	abomasnow: {
		inherit: true,
	},
	abomasnowmega: {
		inherit: true,
		baseStats: {hp: 90, atk: 132, def: 105, spa: 92, spd: 105, spe: 70},
		abilities: {0: "Slush Rush"},
	},
};
