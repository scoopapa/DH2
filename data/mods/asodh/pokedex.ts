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
		types: ["Rock"],
		baseStats: {hp: 100, atk: 125, def: 135, spa: 20, spd: 20, spe: 70},
		abilities: {0: "Cosmic Energy"},
		heightm: 2.5,
		weightkg: 520,
		color: "Gray",
		eggGroups: ["Mineral"],
		requiredItem: "Stonjournerite",
	},
};
