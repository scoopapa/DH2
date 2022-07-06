export const Pokedex: {[k: string]: ModdedSpeciesData} = {
	flockenload: {
		num: 1001,
		name: "Flockenload",
		types: ["Flying", "Poison"],
		baseStats: {hp: 95, atk: 105, def: 97, spa: 85, spd: 87, spe: 86},
		abilities: {0: "Keen Eye", H: "Sticky Hold"},
		weightkg: 7.8,
	},
	pugilox: {
		num: 1002,
		name: "Pugilox",
		types: ["Fighting", "Poison"],
		baseStats: {hp: 83, atk: 84, def: 114, spa: 68, spd: 81, spe: 75},
		abilities: {0: "Iron Fist", H: "Dry Skin"},
		weightkg: 81,
	},
	retreamole: {
		num: 1003,
		name: "Retreamole",
		types: ["Ground"],
		baseStats: {hp: 90, atk: 100, def: 130, spa: 65, spd: 90, spe: 65},
		abilities: {0: "Emergency Exit"},
		weightkg: 100,
	},
	
	/*
	template: {
		num: 1001,
		name: "template",
		types: ["type1", "type2"],
		baseStats: {hp: 00, atk: 00, def: 00, spa: 00, spd: 00, spe: 00},
		abilities: {0: "ability1", 1: "ability2", H: "abilityH"},
		weightkg: 00,
	},
`	*/
};
