export const Pokedex: {[speciesid: string]: ModdedSpeciesData} = {
   starmie: {
      inherit: true,
      baseStats: {hp: 60, atk: 75, def: 85, spa: 115, spd: 85, spe: 115},
   },
	gyarados: {
      inherit: true,
      baseStats: {hp: 95, atk: 125, def: 79, spa: 60, spd: 100, spe: 91},
   },
	raikou: {
      inherit: true,
      abilities: {0: "Pressure", 1: "Competitive", H: "Inner Focus"},
	},
	latias: {
		inherit: true,
		types: ["Dragon", "Fairy"],
	},
	scolipede: {
		inherit: true,
		types: ["Bug", "Ground"],
	}, 
	haxorus: {
		inherit: true,
		types: ["Dragon", "Steel"],
	}, 
	golisopod: {
		inherit: true,
		baseStats: {hp: 75, atk: 125, def: 140, spa: 60, spd: 110, spe: 40},
	}, 
	mudsdale: {
		inherit: true,
		baseStats: {hp: 100, atk: 125, def: 110, spa: 55, spd: 85, spe: 35},
	}, 
	obstagoon: {
		inherit: true,
		baseStats: {hp: 93, atk: 90, def: 101, spa: 60, spd: 81, spe: 105},
	}, 
	zarude: {
      inherit: true,
		baseStats: {hp: 105, atk: 110, def: 105, spa: 80, spd: 95, spe: 105},
      abilities: {0: "Leaf Guard", H: "Tough Claws"},
   },
	zarudedada: {
      inherit: true,
		baseStats: {hp: 105, atk: 110, def: 105, spa: 80, spd: 95, spe: 105},
      abilities: {0: "Leaf Guard", H: "Tough Claws"},
   },
};
