export const Pokedex: {[speciesid: string]: SpeciesData} = {
	castform: {
		num: 351,
		name: "Castform",
		types: ["Normal"],
		baseStats: {hp: 70, atk: 70, def: 70, spa: 70, spd: 70, spe: 70},
		abilities: {0: "Forecast", 1: "Ice Face"},
		heightm: 0.3,
		weightkg: 0.8,
		color: "Gray",
		eggGroups: ["Fairy", "Amorphous"],
		otherFormes: ["Castform-Sunny", "Castform-Rainy", "Castform-Snowy"],
		formeOrder: ["Castform", "Castform-Sunny", "Castform-Rainy", "Castform-Snowy"],
	},
	castformsnowy: {
		num: 351,
		name: "Castform-Snowy",
		baseSpecies: "Castform",
		forme: "Snowy",
		types: ["Ice"],
		baseStats: {hp: 70, atk: 70, def: 70, spa: 70, spd: 70, spe: 70},
		abilities: {0: "Forecast", 1: "Ice Face"},
		heightm: 0.3,
		weightkg: 0.8,
		color: "White",
		eggGroups: ["Fairy", "Amorphous"],
		requiredAbility: "Forecast",
		battleOnly: "Castform",
	},
	
	gallade: {
		inherit: true,
		abilities: {0: "Steadfast", 1: "Trace", H: "Justified"}
	},
	
	arctozolt: {
		inherit: true,
		abilities: {0: "Volt Absorb", 1: "Static", H: "Flurry Rush"},
	},
	
	arctovish: {
		inherit: true,
		abilities: {0: "Water Absorb", 1: "Ice Body", H: "Flurry Rush"},
	},
};