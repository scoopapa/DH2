export const Pokedex: {[speciesid: string]: ModdedSpeciesData} = {
   gengar: {
		inherit: true,
		abilities: {0: "Cursed Body", H: "Levitate"},
	},
	starmie: {
      inherit: true,
      baseStats: {hp: 60, atk: 75, def: 85, spa: 115, spd: 85, spe: 115},
   },
	gyarados: {
      inherit: true,
      baseStats: {hp: 95, atk: 125, def: 79, spa: 60, spd: 100, spe: 91},
   },
	crobat: {
      inherit: true,
      abilities: {0: "Inner Focus", 1: "Tinted Lens", H: "Infiltrator"},
   },
	raikou: {
      inherit: true,
      abilities: {0: "Pressure", 1: "Competitive", H: "Inner Focus"},
   },
	milotic: {
      inherit: true,
      abilities: {0: "Marvel Scale", 1: "Competitive", H: "Pure Power"},
	},
	latias: {
		inherit: true,
		types: ["Dragon", "Fairy"],
	},
	mamoswine: {
		inherit: true,
		baseStats: {hp: 110, atk: 130, def: 80, spa: 70, spd: 60, spe: 100},
	},
	scolipede: {
		inherit: true,
		types: ["Bug", "Ground"],
	}, 
	darmanitan: {
		inherit: true,
		types: ["Fire", "Fighting"],
	},
	cofagrigus: {
		inherit: true,
		types: ["Ghost", "Fighting"],
	},
	zoroark: {
		inherit: true,
		types: ["Dark", "Fairy"],
		baseStats: {hp: 60, atk: 105, def: 60, spa: 120, spd: 60, spe: 115},
	},
	haxorus: {
		inherit: true,
		types: ["Dragon", "Steel"],
	}, 
	cobalion: {
		inherit: true,
		baseStats: {hp: 91, atk: 90, def: 129, spa: 90, spd: 72, spe: 128},
	},
	sylveon: {
		inherit: true,
	   types: ["Fairy", "Ground"],
		baseStats: {hp: 95, atk: 65, def: 80, spa: 110, spd: 130, spe: 60},
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
	comfey: {
		inherit: true,
		types: ["Fairy", "Flying"],
	},
	dhelmise: {
		inherit: true,
		types: ["Ghost", "Steel"],
	},
	turtonator: {
		inherit: true,
		baseStats: {hp: 75, atk: 78, def: 135, spa: 91, spd: 85, spe: 36},
		abilities: {0: "Shell Armor", H: "Regenerator"},
	},
	obstagoon: {
		inherit: true,
		baseStats: {hp: 93, atk: 90, def: 101, spa: 60, spd: 81, spe: 105},
	}, 
};
