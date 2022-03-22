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
	darmanitan: {
		inherit: true,
		types: ["Fire", "Fighting"],
	},
	zoroark: {
		inherit: true,
		types: ["Dark", "Fairy"],
		baseStats: {hp: 60, atk: 105, def: 60, spa: 120, spd: 60, spe: 105},
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
	salazzle: {
		inherit: true,
		baseStats: {hp: 68, atk: 64, def: 60, spa: 121, spd: 60, spe: 117},
	},
	dhelmise: {
		inherit: true,
		types: ["Ghost", "Steel"],
	},
	turtonator: {
		inherit: true,
		baseStats: {hp: 60, atk: 78, def: 135, spa: 91, spd: 85, spe: 36},
		abilities: {0: "Shell Armor", H: "Regenerator"},
	},
	obstagoon: {
		inherit: true,
		baseStats: {hp: 93, atk: 90, def: 101, spa: 60, spd: 81, spe: 105},
	}, 
};
