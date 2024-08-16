export const Pokedex: { [k: string]: ModdedSpeciesData } = {
	stonjourner: {
		inherit: true,
		otherFormes: ["Stonjourner-Mega"],
		formeOrder: ["Stonjourner", "Stonjourner-Mega"],
	},
	stonjournermega: {
		num: 874,
		name: "Stonjourner-Mega",
		baseSpecies: "Stonjourner",
		forme: "Mega",
		types: ["Rock", "Psychic"],
		baseStats: {hp: 100, atk: 75, def: 115, spa: 75, spd: 135, spe: 70},
		abilities: {0: "Cosmic Energy"},
		heightm: 2.5,
		weightkg: 520,
		color: "Gray",
		eggGroups: ["Mineral"],
		requiredItem: "Stonjournerite",
	},
};
