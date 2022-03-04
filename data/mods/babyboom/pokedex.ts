export const Pokedex: {[speciesid: string]: SpeciesData} = {
	pichu: {
		inherit: true,
		baseStats: {hp: 20, atk: 40, def: 15, spa: 35, spd: 35, spe: 50},
	},
	cleffa: {
		inherit: true,
		baseStats: {hp: 60, atk: 25, def: 28, spa: 45, spd: 55, spe: 15},
	},
	igglybuff: {
		inherit: true,
		types: ["Fairy", "Flying"],
		baseStats: {hp: 90, atk: 30, def: 25, spa: 40, spd: 30, spe: 15},
		abilities: {0: "Cute Charm", 1: "Competitive", H: "Regenerator"},
	},
	togepi: {
		inherit: true,
	},
	tyrogue: {
		inherit: true,
		baseStats: {hp: 45, atk: 45, def: 45, spa: 45, spd: 45, spe: 45},
	},
	smoochum: {
		inherit: true,
		baseStats: {hp: 45, atk: 30, def: 15, spa: 85, spd: 65, spe: 85},
		abilities: {0: "Oblivious", 1: "Forewarn", H: "Dry Skin"},
	},
	elekid: {
		inherit: true,
	},
	magby: {
		inherit: true,
	},
	azurill: {
		inherit: true,
		types: ["Water", "Fairy"],
	},
	wynaut: {
		inherit: true,
	},
	budew: {
		inherit: true,
	},
	chingling: {
		inherit: true,
	},
	bonsly: {
		inherit: true,
	},
	mimejr: {
		inherit: true,
	},
	happiny: {
		inherit: true,
	},
	munchlax: {
		inherit: true,
		baseStats: {hp: 105, atk: 85, def: 40, spa: 40, spd: 85, spe: 5},
	},
	riolu: {
		inherit: true,
	},
	mantyke: {
		inherit: true,
	},
	toxel: {
		inherit: true,
		baseStats: {hp: 50, atk: 38, def: 45, spa: 54, spd: 45, spe: 40},
		abilities: {0: "Rattled", 1: "Static", H: "Sticky Hold"},
	},
	
	//New Babies
	crawscor: {
		num: -1,
		name: "Crawscor",
		types: ["Ground"],
		baseStats: {hp: 45, atk: 55, def: 75, spa: 20, spd: 40, spe: 60},
		abilities: {0: "Hyper Cutter", 1: "Sand Veil", H: "Immunity"},
		heightm: 0.4,
		weightkg: 11,
		color: "Purple",
		evos: ["Gligar"],
		eggGroups: ["Bug"],
		canHatch: true,
	},
	gligar: {
		inherit: true,
		prevo: "Crawscor",
	},
	armorick: {
		num: -2,
		name: "Armorick",
		types: ["Steel", "Flying"],
		baseStats: {hp: 45, atk: 55, def: 100, spa: 20, spd: 50, spe: 55},
		abilities: {0: "Keen Eye", 1: "Sturdy", H: "Weak Armor"},
		heightm: 1.0,
		weightkg: 11,
		color: "Gray",
		evos: ["Skarmory"],
		eggGroups: ["Flying"],
		canHatch: true,
	},
	skarmory: {
		inherit: true,
		prevo: "Armorick",
	},
	dreddon: {
		num: -3,
		name: "Dreddon",
		types: ["Dragon"],
		baseStats: {hp: 48, atk: 72, def: 54, spa: 36, spd: 54, spe: 29},
		abilities: {0: "Rough Skin", 1: "Sheer Force", H: "Mold Breaker"},
		heightm: 0.6,
		weightkg: 11,
		color: "Red",
		evos: ["Druddigon"],
		eggGroups: ["Monster", "Dragon"],
		canHatch: true,
	},
	druddigon: {
		inherit: true,
		prevo: "Dreddon",
	},
};