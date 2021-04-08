export const Pokedex: {[speciesid: string]: SpeciesData} = {
	//Slate 1: Grass, Fire, Water
	prairret: {
		num: 1,
		name: "Prairret",
		types: ["Grass"],
		baseStats: {hp: 85, atk: 105, def: 100, spa: 65, spd: 75, spe: 100},
		abilities: {0: "Overgrow", H: "Poison Heal"},
		heightm: 0.7,
		weightkg: 35.5,
	},
	fluxtape: {
		num: 2,
		name: "Fluxtape",
		types: ["Fire"],
		baseStats: {hp: 60, atk: 89, def: 50, spa: 115, spd: 60, spe: 126},
		abilities: {0: "Flame Body", 1:"Competitive", H: "Flash Fire"},
		heightm: 1.7,
		weightkg: 0.2,
	},
	cetaidon: {
		num: 3,
		name: "Cetaidon",
		types: ["Water"],
		baseStats: {hp: 110, atk: 125, def: 85, spa: 80, spd: 80, spe: 50},
		abilities: {0: "Torrent", H: "Water Veil"},
		heightm: 1.6,
		weightkg: 371.1,
	},
};