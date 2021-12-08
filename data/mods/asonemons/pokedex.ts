export const Pokedex: {[speciesid: string]: SpeciesData} = {
	yanmegashell: {
		fusion: ['Yanmega', 'Torkoal'],
		num: 1,
		name: "Yanmega-Shell",
		types: ["Bug", "Fire"],
		baseStats: {hp: 70, atk: 105, def: 145, spa: 85, spd: 90, spe: 60},
		abilities: {0: "As One (Torkoal)"},
		weightkg: 131.9,
	},
	pelipperink: {
      fusion: ['Pelipper', 'Tentacruel'],
		num: 2,
		name: "Pelipper-Ink",
		types: ["Water", "Poison"],
		baseStats: {hp: 80, atk: 78, def: 85, spa: 100, spd: 135, spe: 105},
		abilities: {0: "As One (Tentacruel)"},
		weightkg: 83,
	},
};
