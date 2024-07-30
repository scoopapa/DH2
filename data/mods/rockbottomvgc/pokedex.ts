export const Pokedex: {[speciesid: string]: ModdedSpeciesData} = {
	beautifly: {
		inherit: true,
		baseStats: {hp: 60, atk: 70, def: 50, spa: 105, spd: 50, spe: 65},
	},
	brionne: {
		inherit: true,
		baseStats: {hp: 60, atk: 69, def: 69, spa: 91, spd: 91, spe: 50},
		prevo: null,
		evos: null,
	},
	cherrim: {
		inherit: true,
		prevo: null,
	},
	chinchou: {
		inherit: true,
		baseStats: {hp: 75, atk: 38, def: 48, spa: 66, spd: 66, spe: 67},
	},
	cubone: {
		inherit: true,
		baseStats: {hp: 50, atk: 50, def: 95, spa: 40, spd: 60, spe: 35},
		evos: null,
	},
	dragonair: {
		inherit: true,
		baseStats: {hp: 71, atk: 84, def: 75, spa: 70, spd: 70, spe: 70},
		prevo: null,
		evos: null,
	},
	glalie: {
		inherit: true,
		abilities: {0: "Inner Focus", H: "Ice Body"},
		prevo: null,
	},
	hypno: {
		inherit: true,
		baseStats: {hp: 75, atk: 73, def: 70, spa: 73, spd: 105, spe: 67},
		prevo: null,
	},
	monferno: {
		inherit: true,
		baseStats: {hp: 59, atk: 83, def: 47, spa: 73, spd: 47, spe: 96},
	},
	seviper: {
		inherit: true,
		baseStats: {hp: 73, atk: 95, def: 60, spa: 90, spd: 65, spe: 75},
	},
	swoobat: {
		inherit: true,
		abilities: {0: "Unaware", H: "Klutz"},
		prevo: null,
	},
	vibrava: {
		inherit: true,
		baseStats: {hp: 50, atk: 80, def: 50, spa: 80, spd: 50, spe: 80},
	},
	wugtrio: {
		inherit: true,
		baseStats: {hp: 35, atk: 90, def: 50, spa: 50, spd: 70, spe: 120},
	},
};
