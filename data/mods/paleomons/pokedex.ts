export const Pokedex: {[speciesid: string]: SpeciesData} = {
	kabutops: {
		inherit: true,
		types: ["Water", "Poison"],
		baseStats: {hp: 88, atk: 67, def: 79, spa: 119, spd: 92, spe: 95},
		abilities: {0: "Natural Cure", 1: "Regenerator", H: "Healer"},
	},
	omastar: {
		inherit: true,
		types: ["Poison", "Psychic"],
		baseStats: {hp: 73, atk: 59, def: 127, spa: 89, spd: 113, spe: 53},
		abilities: {0: "Inner Focus", 1: "Synchronize", H: "Regenerator"},
	},
	aerodactyl: {
		inherit: true,
		types: ["Ghost", "Flying"],
		baseStats: {hp: 90, atk: 105, def: 95, spa: 40, spd: 75, spe: 130},
		abilities: {0: "Infiltrator", 1: "Intimidate", H: "Unnerve"},
	},
	cradily: {
		inherit: true,
		types: ["Grass", "Water"],
		baseStats: {hp: 76, atk: 88, def: 103, spa: 98, spd: 113, spe: 47},
		abilities: {0: "Storm Drain", 1: "Solid Rock", H: "Poison Heal"},
	},
	armaldo: {
		inherit: true,
		types: ["Bug", "Ground"],
		baseStats: {hp: 95, atk: 110, def: 110, spa: 55, spd: 80, spe: 70},
		abilities: {0: "Battle Armor", 1: "Intimidate", H: "Tough Claws"},
	},
	helioliskancient: {
		name: "Heliolisk-Ancient",
		types: ["Fire", "Electric"],
		baseStats: {hp: 62, atk: 109, def: 52, spa: 55, spd: 94, spe: 109},
		abilities: {0: "Flame Body", 1: "Solar Power", H: "Galvanize"},
	},
	laprasabyss: {
		name: "Lapras-Abyss",
		types: ["Water", "Dark"],
		baseStats: {hp: 130, atk: 90, def: 85, spa: 100, spd: 95, spe: 35},
		abilities: {0: "Heatproof", 1: "Shell Armor", H: "Rough Skin"},
	},
	meganiumsonic: {
		name: "Meganium-Sonic",
		types: ["Grass", "Electric"],
		baseStats: {hp: 109, atk: 74, def: 81, spa: 108, spd: 111, spe: 42},
		abilities: {0: "Punk Rock", H: "Leaf Guard"},
	},
};
