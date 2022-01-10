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
};