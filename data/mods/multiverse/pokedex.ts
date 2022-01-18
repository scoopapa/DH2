export const Pokedex: {[speciesid: string]: SpeciesData} = {
	venusaur: {
		inherit: true,
		baseStats: {hp: 80, atk: 102, def: 83, spa: 100, spd: 100, spe: 80},
		abilities: {0: "Overgrow"},
	},
	clefable: {
		inherit: true,
		types: ["Normal"],
		baseStats: {hp: 95, atk: 90, def: 73, spa: 95, spd: 100, spe: 60},
		abilities: {0: "Magic Guard"},
	},
	venomoth: {
		inherit: true,
		baseStats: {hp: 80, atk: 65, def: 60, spa: 110, spd: 95, spe: 110},
	},
	victreebel: {
		inherit: true,
		baseStats: {hp: 80, atk: 105, def: 65, spa: 100, spd: 100, spe: 70},
		abilities: {0: "Sniper", H: "Gluttony"},
	},
	golem: {
		inherit: true,
		types: ["Steel", "Ground"],
		baseStats: {hp: 80, atk: 130, def: 130, spa: 55, spd: 85, spe: 45},
		abilities: {0: "Sturdy"},
	},
	omastar: {
		inherit: true,
		types: ["Rock", "Water"],
		baseStats: {hp: 90, atk: 60, def: 135, spa: 115, spd: 70, spe: 55},
		abilities: {0: "Sand Stream"},
	},
	articuno: {
		inherit: true,
		baseStats: {hp: 85, atk: 75, def: 75, spa: 115, spd: 115, spe: 100},
		abilities: {0: "Snow Warning"},
	},
	mew: {
		inherit: true,
		types: ["Psychic", "Water"],
		baseStats: {hp: 100, atk: 100, def: 80, spa: 100, spd: 100, spe: 80},
	},
	noctowl: {
		inherit: true,
		types: ["Steel", "Flying"],
		baseStats: {hp: 100, atk: 50, def: 50, spa: 96, spd: 106, spe: 70},
		abilities: {0: "Insomnia", H: "Keen Eye"},
	},
	crobat: {
		inherit: true,
		types: ["Poison", "Flying"],
		baseStats: {hp: 95, atk: 95, def: 80, spa: 70, spd: 80, spe: 130},
		abilities: {0: "Overcoat", H: "Infiltrator"},
	},
	jumpluff: {
		inherit: true,
		types: ["Flying"],
		baseStats: {hp: 85, atk: 95, def: 80, spa: 55, spd: 105, spe: 120},
		abilities: {0: "Frisk", 1: "Limber", H: "Infiltrator"},
	},
	murkrow: {
		inherit: true,
		baseStats: {hp: 80, atk: 110, def: 62, spa: 110, spd: 62, spe: 111},
		abilities: {0: "Insomnia", 1: "Super Luck", H: "Smart Prankster"},
	},
	forretress: {
		inherit: true,
		baseStats: {hp: 85, atk: 90, def: 150, spa: 60, spd: 80, spe: 30},
	},
	houndoom: {
		inherit: true,
		baseStats: {hp: 85, atk: 90, def: 65, spa: 115, spd: 90, spe: 95},
		abilities: {0: "Early Bird", H: "Drought"},
	},
	magby: {
		inherit: true,
		types: ["Fire", "Fighting"],
		baseStats: {hp: 75, atk: 115, def: 67, spa: 110, spd: 85, spe: 83},
		abilities: {0: "Flame Body", 1: "Multiscale", H: "Vital Spirit"},
		evos: null,
	},
	entei: {
		inherit: true,
		baseStats: {hp: 100, atk: 115, def: 100, spa: 100, spd: 80, spe: 85},
	},
};