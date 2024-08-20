export const Moves: {[k: string]: ModdedMoveData} = {
	piss: {
		num: 9001,
		species: "Piss",
		types: ["Normal"],
		baseStats: {hp: 70, atk: 110, def: 50, spa: 50, spd: 50, spe: 120},
		abilities: {0: "Magic Guard"},
		weightkg: 382,
	},
	snabterra: {
		num: 9002,
		species: "Snabterra",
		types: ["Bug", "Ground"],
		baseStats: {hp: 85, atk: 100, def: 75, spa: 40, spd: 50, spe: 75},
		abilities: {0: "Compound Eyes"},
		weightkg: 600,
	},
	drakkannon: {
		num: 9003,
		species: "Drakkannon",
		types: ["Fighting", "Dragon"],
		baseStats: {hp: 80, atk: 50, def: 40, spa: 100, spd: 40, spe: 80},
		abilities: {0: "Mega Launcher"},
		weightkg: 59,
	},
	arsenstorm: {
		num: 9004,
		species: "Arsenstorm",
		types: ["Poison", "Ground"],
		baseStats: {hp: 100, atk: 50, def: 95, spa: 80, spd: 60, spe: 55},
		abilities: {0: "Neutralizing Gas", H: "Levitate"},
		weightkg: 15,
	},
	badjur: {
		num: 9005,
		species: "Badjur",
		types: ["Normal"],
		baseStats: {hp: 100, atk: 100, def: 75, spa: 60, spd: 75, spe: 105},
		abilities: {0: "Poison Heal"},
		weightkg: 16,
	},

};
