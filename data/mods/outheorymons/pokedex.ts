export const Pokedex: {[speciesid: string]: ModdedSpeciesData} = {
   gengar: {
		inherit: true,
		abilities: {0: "Cursed Body", H: "Levitate"},
	},
	weezinggalar: {
		inherit: true,
		baseStats: {hp: 80, atk: 90, def: 120, spa: 85, spd: 70, spe: 60},
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
	keldeo: {
		inherit: true,
		abilities: {0: "Justified", H: "Poison Heal"},
	},
	keldeoresolute: {
		inherit: true,
		abilities: {0: "Justified", H: "Poison Heal"},
	},
	dragalge: {
		inherit: true,
		baseStats: {hp: 85, atk: 75, def: 90, spa: 97, spd: 123, spe: 44},
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
	copperajah: {
      inherit: true,
		types: ["Steel", "Water"],
		baseStats: {hp: 122, atk: 130, def: 69, spa: 80, spd: 89, spe: 30},
	},
	latios: {
		inherit: true,
		types: ["Dragon", "Electric"],
	},
	virizion: {
		inherit: true,
		abilities: {0: "Justified", H: "Adaptability"},
	},
	wishiwashi: {
		inherit: true,
		baseStats: {hp: 65, atk: 20, def: 20, spa: 25, spd: 25, spe: 40},
	},
	wishiwashischool: {
		inherit: true,
		baseStats: {hp: 65, atk: 140, def: 130, spa: 140, spd: 135, spe: 30},
	},
	celebi: {
		inherit: true,
		types: ["Grass", "Fairy"],
		abilities: {0: "Natural Cure", H: "Flower Veil"},
   },
   articunogalar: {
      inherit: true, 
      abilities: {0: "Competitive", H: "Trace"},
   }, 
   krookodile: {
      inherit: true,
      baseStats: {hp: 95, atk: 117, def: 80, spa: 65, spd: 70, spe: 103},
   }, 
   goodra: {
      inherit: true,
      abilities: {0: "Sap Sipper", 1: "Analytic", H: "Gooey"},
   }, 
   noctowl: {
      inherit: true, 
      types: ["Steel", "Flying"],
      baseStats: {hp: 100, atk: 50, def: 50, spa: 86, spd: 116, spe: 70},
   }, 
   scrafty: {
      inherit: true, 
      baseStats: {hp: 80, atk: 90, def: 115, spa: 45, spd: 115, spe: 58},
   },
   rotommow: {
      inherit: true, 
      abilities: {0: "Levitate", H: "Grassy Surge"},
   }, 
   flygon: {
      inherit: true, 
      abilities: {0: "Levitate", H: "Poison Heal"},
   },
   appletun: { 
      inherit: true, 
      types: ["Poison", "Dragon"],
   },
   vanilluxe: {
      inherit: true, 
      types: ["Ice", "Ground"],
      baseStats: {hp: 71, atk: 95, def: 85, spa: 110, spd: 95, spe: 99},
   },
   rotomfan: {
      inherit: true, 
      abilities: {0: "Levitate", H: "Magic Bounce"},
   }, 
   aromatisse: {
      inherit: true, 
      types: ["Steel", "Fairy"],
   }, 
   marowakalola: { 
      inherit: true, 
      abilities: {0: "Magic Guard", 1: "Lightning Rod", H: "Cursed Body"},
	}, 
   rapidash: { 
      inherit: true, 
      abilities: {0: "Run Away", 1: "Flash Fire", H: "Contrary"},
		baseStats: {hp: 65, atk: 100, def: 70, spa: 80, spd: 80, spe: 113},
	}, 
   tornadus: { 
      inherit: true, 
      types: ["Flying", "Fighting"],
      abilities: {0: "Prankster", 1: "Victory Star", H: "Defiant"},
	}, 
   toxicroak: { 
      inherit: true, 
		baseStats: {hp: 83, atk: 106, def: 65, spa: 86, spd: 65, spe: 105},
	}, 
   archeops: { 
      inherit: true, 
      abilities: {0: "Defeatist", H: "Dazzling"},
		baseStats: {hp: 75, atk: 140, def: 65, spa: 112, spd: 65, spe: 130},
	}, 
   musharna: {
      inherit: true, 
      types: ["Psychic", "Fire"],
		abilities: {0: "Forewarn", 1: "Synchronize", H: "Magic Bounce"},
   }, 
   unfezant: {
      inherit: true, 
		types: ["Ground", "Flying"],
	}, 
	beartic: {
		inherit: true, 
		types: ["Ice", "Fighting"],
		baseStats: {hp: 95, atk: 130, def: 80, spa: 70, spd: 80, spe: 70},
	},
	stunfiskgalar: {
		inherit: true,
		abilities: {0: "Mimicry", H: "Regenerator"},
	},
	frosmoth: {
		inherit: true,
		baseStats: {hp: 70, atk: 65, def: 60, spa: 125, spd: 90, spe: 85},
	},
	lycanrocdusk: {
		inherit: true,
		types: ["Rock", "Ghost"],
	},
	salamence: {
		inherit: true,
		abilities: {0: "Intimidate", 1: "Aerilate", H: "Moxie"},
   }, 
};
