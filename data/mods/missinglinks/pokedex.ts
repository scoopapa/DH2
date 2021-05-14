export const Pokedex: {[speciesid: string]: SpeciesData} = {
	weepinbell: {
		inherit: true,
		evos: ["Victreebel", "Canonbell"],
	},
	canonbell: {
		num: 1001,
		name: "Canonbell",
		types: ["Grass", "Dark"],
		baseStats: {hp: 70, atk: 90, def: 65, spa: 125, spd: 70, spe: 70},
		abilities: {0: "Chlorophyll", H: "Mega Launcher"},
		weightkg: 21,
		prevo: "Weepinbell",
		eggGroups: ["Grass"],
	},
	butterfree: {
		inherit: true,
		otherFormes: ["Butterfree-Mega"],
		formeOrder: ["Butterfree", "Butterfree-Mega"],
	},
	butterfreemega: {
		num: 12,
		name: "Butterfree-Mega",
		baseSpecies: "Butterfree",
		forme: "Mega",
		types: ["Bug", "Psychic"],
		baseStats: {hp: 65, atk: 55, def: 70, spa: 110, spd: 130, spe: 70},
		abilities: {0: "Magic Guard"},
		heightm: 1.5,
		weightkg: 52,
		eggGroups: ["Bug"],
		requiredItem: "Butterfrite",
	},
};
