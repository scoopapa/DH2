export const Pokedex: {[speciesid: string]: SpeciesData} = {
   tinkaton: {
		inherit: true,
		baseStats: {hp: 85, atk: 95, def: 77, spa: 70, spd: 105, spe: 94},
	},
	salamence: {
		inherit: true,
		baseStats: {hp: 115, atk: 135, def: 80, spa: 110, spd: 80, spe: 100},
	},
   electrodehisui: {
		inherit: true,
	   abilities: {0: "Soundproof", 1: "Magic Guard", H: "Aftermath"},
	},
	delphox: {
		inherit: true,
		types: ["Fire", "Fairy"],
		baseStats: {hp: 95, atk: 69, def: 72, spa: 114, spd: 100, spe: 104},
	},
	slitherwing: {
		inherit: true,
		abilities: {0: "Protosynthesis", H: "Fluffy"},
	},
	taurospaldeacombat: {
		inherit: true,
		types: ["Fighting", "Fairy"],
		baseStats: {hp: 75, atk: 110, def: 125, spa: 30, spd: 70, spe: 100},
	},
	cloyster: {
		inherit: true,
		types: ["Ice", "Ground"],
	},
};
