export const Pokedex: {[speciesid: string]: SpeciesData} = {
	basalisk: {
		num: 1,
		name: "Basalisk",
		types: ["Dark", "Rock"],
		baseStats: {hp: 89, atk: 111, def: 71, spa: 67, spd: 91, spe: 121},
		abilities: {0: "Rough Skin", 1: "Rattled", H: "Swift Swim"},
	},
	beryl: {
		num: 2,
		name: "Beryl",
		types: ["Grass", "Fairy"],
		baseStats: {hp: 80, atk: 85, def: 113, spa: 97, spd: 60, spe: 90},
		abilities: {0: "Ripen", 1: "Chlorophyll", H: "Gluttony"},
	},
	bexipine: {
		num: 2,
		name: "Bexipine",
		types: ["Ice", "Steel"],
		baseStats: {hp: 70, atk: 65, def: 120, spa: 110, spd: 80, spe: 85},
		abilities: {0: "Ice Body", 1: "Iron Barbs", H: "Ice Scales"},
	},
};
