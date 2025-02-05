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
	dugtrio: {
		inherit: true,
	},
	altaria: {
		inherit: true,
		abilities: {0: "Fluffy"},
	},
	altariamega: {
		inherit: true,
	},
	tyranitar: {
		inherit: true,
		abilities: {0: "Sharpness"},
	},
	tyranitarmega: {
		inherit: true,
		baseStats: {hp: 100, atk: 114, def: 150, spa: 155, spd: 110, spe: 71},
		types: ["Rock", "Dragon"],
	},
	mimikyu: {
		inherit: true,
		baseStats: {hp: 65, atk: 110, def: 80, spa: 50, spd: 105, spe: 96},
	},
	mimikyubusted: {
		inherit: true,
		abilities: {0: "Perish Body"},
		baseStats: {hp: 65, atk: 90, def: 80, spa: 50, spd: 105, spe: 116},
	},
	mesprit: {
		inherit: true,
		abilities: {0: "Liquid Voice"},
		types: ["Water", "Psychic"],
	},
	electrode: {
		inherit: true,
		abilities: {0: "Short Fuse"},
		types: ["Normal", "Electric"],
	},
	taurospaldeacombat: {
		inherit: true,
		abilities: {0: "Adaptability"},
	},
	chiyu: {
		inherit: true,
		abilities: {0: "Water Absorb"},
		baseStats: {hp: 55, atk: 135, def: 80, spa: 80, spd: 120, spe: 100},
	},
	wochien: {
		inherit: true,
		abilities: {0: "Liquid Ooze"},
		types: ["Grass", "Water"],
	},
	staraptor: {
		inherit: true,
		types: ["Flying"],
	},
	archaludon: {
		inherit: true,
		abilities: {0: "Hydroelectric Dam", 1: "Stamina"},
	},
	malamar: {
		inherit: true,
		abilities: {0: "Flip Flop"},
		baseStats: {hp: 86, atk: 92, def: 88, spa: 88, spd: 75, spe: 73},
	},
	empoleon: {
		inherit: true,
		abilities: {0: "Rough Skin"},
		baseStats: {hp: 84, atk: 111, def: 88, spa: 86, spd: 101, spe: 60},
	},
	glastrier: {
		inherit: true,
		abilities: {0: "Frozen Armor"},
	},
	calyrexice: {
		inherit: true,
		baseStats: {hp: 100, atk: 165, def: 130, spa: 85, spd: 110, spe: 90},
	},
	regieleki: {
		inherit: true,
		abilities: {0: "Galvanize"},
	},
	lycanrocmidnight: {
		inherit: true,
		abilities: {0: "Technician"},
	},
	lycanroc: {
		inherit: true,
		abilities: {0: "Drought"},
	},
	lycanrocdusk: {
		inherit: true,
		abilities: {0: "Strong Jaw"},
	},
	dodrio: {
		inherit: true,
		abilities: {0: "Speed Boost"},
		types: ["Flying", "Fighting"],
	},
	whiscash: {
		inherit: true,
		abilities: {0: "Regenerator"},
		baseStats: {hp: 110, atk: 78, def: 88, spa: 76, spd: 86, spe: 60},
	},
	hippowdon: {
		inherit: true,
		abilities: {0: "Earth Eater"},
	},
	cramorant: {
		inherit: true,
		baseStats: {hp: 90, atk: 85, def: 75, spa: 85, spd: 95, spe: 85},
	},
	cramorantgulping: {
		inherit: true,
		baseStats: {hp: 90, atk: 85, def: 75, spa: 85, spd: 95, spe: 85},
		abilities: {0: "Storm Drain"},
	},
	cramorantgorging: {
		inherit: true,
		baseStats: {hp: 90, atk: 85, def: 75, spa: 85, spd: 95, spe: 85},
		abilities: {0: "Lightning Rod"},
	},
	grafaiai: {
		inherit: true,
		baseStats: {hp: 83, atk: 95, def: 65, spa: 80, spd: 72, spe: 110},
	},
	tatsugiri: {
		inherit: true,
		abilities: {0: "Dry Skin"},
	},
};
