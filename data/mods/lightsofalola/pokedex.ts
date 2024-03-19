export const Pokedex: {[speciesid: string]: ModdedSpeciesData} = {
	masquerain: {
		inherit: true,
		types: ["Bug", "Water"],
  },
	psyduck: {
		inherit: true,
		abilities: {0: "Good as Gold", 1: "Cloud Nine", H: "Swift Swim"},
  },
	golduck: {
		inherit: true,
		abilities: {0: "Good as Gold", 1: "Cloud Nine", H: "Swift Swim"},
  },
	ledian: {
		inherit: true,
		baseStats: {hp: 55, atk: 35, def: 50, spa: 55, spd: 110, spe: 95},
  },
	furfrou: {
		inherit: true,
		baseStats: {hp: 75, atk: 100, def: 60, spa: 65, spd: 90, spe: 102},
  },
	exeggcute: {
		inherit: true,
		abilities: {0: "Chlorophyll", 1: "Opportunist", H: "Harvest"},
  },
	exeggutor: {
		inherit: true,
		abilities: {0: "Chlorophyll", 1: "Opportunist", H: "Harvest"},
  },
	exeggutoralola: {
		inherit: true,
		abilities: {0: "Frisk", 1: "Graviseeds", H: "Harvest"},
  },
  politoed: {
		inherit: true,
		baseStats: {hp: 90, atk: 75, def: 75, spa: 100, spd: 100, spe: 70},
  },
  xatu: {
		inherit: true,
		baseStats: {hp: 75, atk: 75, def: 70, spa: 95, spd: 70, spe: 95},
  },
  okidogi: {
		inherit: true,
		baseStats: {hp: 88, atk: 128, def: 120, spa: 58, spd: 86, spe: 90},
  },
  munkidori: {
		inherit: true,
		baseStats: {hp: 88, atk: 75, def: 66, spa: 136, spd: 99, spe: 106},
  },
  fezandipiti: {
		inherit: true,
		baseStats: {hp: 88, atk: 101, def: 82, spa: 70, spd: 130, spe: 99},
  },
  toucannon: {
		inherit: true,
		baseStats: {hp: 95, atk: 120, def: 75, spa: 75, spd: 75, spe: 60},
  },
  spinarak: {
		inherit: true,
		abilities: {0: "Swarm", 1: "Toxic Debris", H: "Sniper"},
  },
  ariados: {
		inherit: true,
		abilities: {0: "Swarm", 1: "Toxic Debris", H: "Sniper"},
  },
  sudowoodo: {
		inherit: true,
		baseStats: {hp: 70, atk: 100, def: 115, spa: 30, spd: 75, spe: 30},
  },
	smeargle: {
		inherit: true,
		otherFormes: ["Pokestar Smeargle"],
		formeOrder: ["Smeargle", "Pokestar Smeargle"],
	},
	pokestarsmeargle: {
		num: 235,
		name: "Pokestar Smeargle",
		baseSpecies: "Smeargle",
		forme: "Pokestar",
		types: ["Normal"],
		baseStats: {hp: 55, atk: 20, def: 35, spa: 20, spd: 45, spe: 75},
		abilities: {0: "Costar", 1: "Technician", H: "Moody"},
		heightm: 1.5,
		weightkg: 61,
		color: "White",
		eggGroups: ["Undiscovered"],
		gen: 9,
	},
  whiscash: {
		inherit: true,
		baseStats: {hp: 110, atk: 78, def: 73, spa: 76, spd: 71, spe: 70},
  },
  shiinotic: {
		inherit: true,
		baseStats: {hp: 60, atk: 45, def: 80, spa: 100, spd: 100, spe: 30},
  },
  parasect: {
		inherit: true,
		baseStats: {hp: 60, atk: 105, def: 80, spa: 60, spd: 80, spe: 30},
  },
  seaking: {
		inherit: true,
		baseStats: {hp: 80, atk: 102, def: 65, spa: 65, spd: 80, spe: 68},
  },
  garbodor: {
		inherit: true,
		baseStats: {hp: 80, atk: 95, def: 92, spa: 60, spd: 92, spe: 75},
  },
  granbull: {
		inherit: true,
		baseStats: {hp: 100, atk: 120, def: 75, spa: 60, spd: 60, spe: 45},
  },
  relicanth: {
		inherit: true,
		baseStats: {hp: 100, atk: 90, def: 130, spa: 45, spd: 65, spe: 65},
  },
	octillery: {
		inherit: true,
		baseStats: {hp: 75, atk: 115, def: 75, spa: 115, spd: 75, spe: 45},
  },
	kecleon: {
		inherit: true,
		baseStats: {hp: 70, atk: 100, def: 70, spa: 60, spd: 120, spe: 40},
		abilities: {0: "Color Change", 1: "Tipped Scales", H: "Protean"},
  },
	tropius: {
		inherit: true,
		baseStats: {hp: 109, atk: 68, def: 93, spa: 72, spd: 97, spe: 51},
  },
	scrafty: {
		inherit: true,
		baseStats: {hp: 70, atk: 95, def: 115, spa: 45, spd: 115, spe: 58},
  },
	beheeyem: {
		inherit: true,
		baseStats: {hp: 75, atk: 75, def: 75, spa: 135, spd: 95, spe: 40},
  },
	terapagosstellar: {
		inherit: true,
		baseStats: {hp: 95, atk: 110, def: 130, spa: 140, spd: 130, spe: 95},
  },
};
