export const Pokedex: import('../../../sim/dex-species').ModdedSpeciesDataTable = {
	wooperpaldea: {
		inherit: true,
		baseStats: {hp: 55, atk: 45, def: 25, spa: 25, spd: 45, spe: 15},
	},
	snom: {
		inherit: true,
		baseStats: {hp: 50, atk: 25, def: 35, spa: 55, spd: 30, spe: 65},
		abilities: {0: "Shield Dust", 1: "Snow Warning", H: "Ice Scales"},
	},
	seedot: {
		inherit: true,
		types: ["Grass", "Dark"],
		baseStats: {hp: 40, atk: 50, def: 65, spa: 30, spd: 40, spe: 30},
	},
	numel: {
		inherit: true,
		baseStats: {hp: 45, atk: 45, def: 30, spa: 35, spd: 45, spe: 35},
		abilities: {0: "Oblivious", 1: "Sturdy", H: "Own Tempo"},
	},
	meowthgalar: {
		inherit: true,
		baseStats: {hp: 50, atk: 55, def: 55, spa: 40, spd: 40, spe: 40},
		abilities: {0: "Rough Skin", 1: "Pickup", H: "Unnerve"},
	},
	cramorant: {
		inherit: true,
		baseStats: {hp: 40, atk: 35, def: 30, spa: 50, spd: 65, spe: 55},
	},
	cramorantgulping: {
		inherit: true,
		baseStats: {hp: 40, atk: 35, def: 30, spa: 50, spd: 65, spe: 55},
	},
	cramorantgorging: {
		inherit: true,
		baseStats: {hp: 40, atk: 35, def: 30, spa: 50, spd: 65, spe: 55},
	},
	diglettalola: {
		inherit: true,
		baseStats: {hp: 45, atk: 25, def: 30, spa: 40, spd: 45, spe: 80},
		abilities: {0: "Sand Veil", 1: "Tangling Hair", H: "Intimidate"},
	},
	smeargle: {
		inherit: true,
		baseStats: {hp: 50, atk: 40, def: 35, spa: 40, spd: 35, spe: 45},
		abilities: {0: "Vital Spirit", 1: "Limber", H: "Water Veil"},
		otherFormes: ["Pokestar Smeargle"],
		formeOrder: ["Smeargle", "Pokestar Smeargle"],
	},
	pokestarsmeargle: { // it's a musical, after all
		num: 235,
		name: "Pokestar Smeargle",
		baseSpecies: "Smeargle",
		forme: "Pokestar",
		types: ["Normal"],
		baseStats: {hp: 50, atk: 40, def: 35, spa: 40, spd: 35, spe: 45},
		abilities: {0: "Vital Spirit", 1: "Limber", H: "Water Veil"},
		heightm: 1.5,
		weightkg: 61,
		color: "White",
		eggGroups: ["Undiscovered"],
		gen: 9,
	},
	flittle: {
		inherit: true,
		types: ["Psychic", "Flying"],
		baseStats: {hp: 30, atk: 35, def: 35, spa: 40, spd: 35, spe: 64},
		abilities: {0: "Anticipation", 1: "Frisk", H: "Psychic Surge"},
	},
	dewpider: {
		inherit: true,
		baseStats: {hp: 38, atk: 45, def: 52, spa: 45, spd: 72, spe: 27},
	},
};
