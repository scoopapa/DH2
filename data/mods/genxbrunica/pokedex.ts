export const Pokedex: {[speciesid: string]: SpeciesData} = {
	//new mons
	
	//(Grass starter is 1458, picking up where Virulope left off)
	
		akulut: {
		num: 1697,
		species: "Akulut",
		types: ["Dark", "Water"],
		gender: "N",
		baseStats: {hp: 100, atk: 133, def: 133, spa: 102, spd: 102, spe: 110},
		abilities: {0: "Darkest Hunger"},
		eggGroups: ["Undiscovered"],
	},
	wendora: {
		num: 1698,
		species: "Wendora",
		types: ["Ghost", "Ice"],
		gender: "N",
		baseStats: {hp: 90, atk: 102, def: 90, spa: 134, spd: 130, spe: 124},
		abilities: {0: "Coldest Heart"},
		eggGroups: ["Undiscovered"],
	},
	lutakon: {
		num: 1699,
		species: "Lutakon",
		baseForme: "Resting",
		types: ["Grass"],
		gender: "N",
		baseStats: {hp: 100, atk: 120, def: 90, spa: 120, spd: 130, spe: 90},
		abilities: {0: "Guardian of Nature"},
		otherFormes: ["Lutakon-Awakened"],
		formeOrder: ["Lutakon", "Lutakon-Awakened"],
		eggGroups: ["Undiscovered"],
	},
	lutakonawakened: {
		num: 1699,
		species: "Lutakon-Awakened",
		baseSpecies: "Lutakon",
		forme: "Awakened",
		types: ["Grass"],
		gender: "N",
		baseStats: {hp: 100, atk: 150, def: 150, spa: 150, spd: 150, spe: 70},
		abilities: {0: "Guardian of Nature"},
		eggGroups: ["Undiscovered"],
		requiredItem: "Awakening Seed",
		changesFrom: "Lutakon",
	},
};
