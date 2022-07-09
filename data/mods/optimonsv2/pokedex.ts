export const Pokedex: {[speciesid: string]: SpeciesData} = {
	inteleon: {
		inherit: true,
		types: ["Water", "Normal"],
		baseStats: {hp: 70, atk: 70, def: 75, spa: 125, spd: 85, spe: 120},
		abilities: {0: "Torrent", H: "Infiltrator"},
	},
	inteleongmax: {
		inherit: true,
		types: ["Water", "Normal"],
		baseStats: {hp: 70, atk: 70, def: 75, spa: 125, spd: 85, spe: 120},
		abilities: {0: "Torrent", H: "Infiltrator"},
	},
	falinks: {
		inherit: true,
		types: ["Fighting", "Ground"],
		baseStats: {hp: 95, atk: 120, def: 110, spa: 70, spd: 60, spe: 95},
		abilities: {0: "Skill Link", 1: "Defiant", H: "Technician"},
	},
	cramorant: {
		inherit: true,
		baseStats: {hp: 115, atk: 85, def: 75, spa: 85, spd: 95, spe: 80},
	},
	cramorantgulping: {
		inherit: true,
		baseStats: {hp: 115, atk: 85, def: 75, spa: 85, spd: 95, spe: 80},
	},
	cramorantgorging: {
		inherit: true,
		baseStats: {hp: 115, atk: 85, def: 75, spa: 85, spd: 95, spe: 80},
	},
	eiscue: {
		inherit: true,
		types: ["Ice", "Water"],
		baseStats: {hp: 95, atk: 80, def: 120, spa: 65, spd: 110, spe: 50},
	},
	eiscuenoice: {
		inherit: true,
		types: ["Ice", "Water"],
		baseStats: {hp: 95, atk: 90, def: 70, spa: 85, spd: 50, spe: 130},
		abilities: {0: "Swift Swim"},
	},
	perrserker: {
		inherit: true,
		baseStats: {hp: 90, atk: 110, def: 120, spa: 50, spd: 80, spe: 80},
	},
	mrrime: {
		inherit: true,
		baseStats: {hp: 90, atk: 75, def: 95, spa: 110, spd: 100, spe: 70},
		abilities: {0: "Tangled Feet", 1: "Screen Cleaner", H: "Unaware"},
	},
	cursola: {
		inherit: true,
		types: ["Ghost", "Dark"],
		baseStats: {hp: 80, atk: 70, def: 85, spa: 145, spd: 130, spe: 30},
		abilities: {0: "Regenerator", 1: "Filter", H: "Perish Body"},
	},
	rapidashgalar: {
		inherit: true,
		baseStats: {hp: 70, atk: 80, def: 70, spa: 125, spd: 70, spe: 105},
		abilities: {0: "Pastel Veil", 1: "Misty Surge", H: "Competitive"},
	},
	weezinggalar: {
		inherit: true,
		baseStats: {hp: 95, atk: 80, def: 120, spa: 100, spd: 80, spe: 60},
	},
	stunfiskgalar: {
		inherit: true,
		baseStats: {hp: 119, atk: 91, def: 99, spa: 66, spd: 84, spe: 32},
		abilities: {0: "Mimicry", H: "Water Absorb"},
	},
	boltund: {
		inherit: true,
		types: ["Electric", "Normal"],
		baseStats: {hp: 89, atk: 105, def: 60, spa: 105, spd: 60, spe: 146},
		abilities: {0: "Strong Jaw", 1: "Competitive", H: "Scrappy"},
	},
	eldegoss: {
		inherit: true,
		baseStats: {hp: 90, atk: 50, def: 90, spa: 110, spd: 120, spe: 60},
		abilities: {0: "Cotton Down", 1: "Regenerator", H: "Fluffy"},
	},
	greedent: {
		inherit: true,
		baseStats: {hp: 160, atk: 105, def: 105, spa: 55, spd: 75, spe: 20},
		abilities: {0: "Cheek Pouch", 1: "Ripen", H: "Sticky Hold"},
	},
	thievul: {
		inherit: true,
		types: ["Dark", "Ground"],
		baseStats: {hp: 90, atk: 58, def: 78, spa: 107, spd: 92, spe: 95},
		abilities: {0: "Unburden", 1: "Prankster", H: "Stakeout"},
	},
	grapploct: {
		inherit: true,
		types: ["Fighting", "Water"],
		baseStats: {hp: 115, atk: 118, def: 90, spa: 70, spd: 80, spe: 42},
		abilities: {0: "Technician", H: "Poison Heal"},
	},
	coalossal: {
		inherit: true,
		baseStats: {hp: 110, atk: 100, def: 130, spa: 80, spd: 100, spe: 30},
	},
	sandaconda: {
		inherit: true,
		types: ["Ground", "Dragon"],
		baseStats: {hp: 82, atk: 107, def: 125, spa: 65, spd: 90, spe: 75},
	},
	flapple: {
		inherit: true,
		baseStats: {hp: 75, atk: 110, def: 90, spa: 95, spd: 80, spe: 100},
	},
	appletun: {
		inherit: true,
		baseStats: {hp: 120, atk: 85, def: 90, spa: 110, spd: 85, spe: 45},
	},
	magmortar: {
		inherit: true,
		types: ["Fire", "Fighting"],
		baseStats: {hp: 75, atk: 95, def: 67, spa: 125, spd: 95, spe: 83},
		abilities: {0: "Flame Body", H: "Mega Launcher"},
	},
	electivire: {
		inherit: true,
		types: ["Electric", "Fighting"],
		baseStats: {hp: 75, atk: 123, def: 87, spa: 105, spd: 85, spe: 95},
		abilities: {0: "Motor Drive", 1: "Vital Spirit", H: "Sheer Force"},
	},
	yanmega: {
		inherit: true,
		types: ["Bug", "Dragon"],
	},
	dusknoir: {
		inherit: true,
		types: ["Ghost", "Dark"],
		baseStats: {hp: 80, atk: 135, def: 100, spa: 65, spd: 100, spe: 65},
		abilities: {0: "Pressure", H: "Iron Fist"},
	},
	xatu: {
		inherit: true,
		baseStats: {hp: 90, atk: 70, def: 90, spa: 115, spd: 90, spe: 75},
	},
	sudowoodo: {
		inherit: true,
		types: ["Rock", "Grass"],
		baseStats: {hp: 80, atk: 125, def: 125, spa: 50, spd: 80, spe: 50},
	},
	oranguru: {
		inherit: true,
		baseStats: {hp: 90, atk: 60, def: 90, spa: 110, spd: 110, spe: 50},
		abilities: {0: "Oblivious", 1: "Telepathy", H: "Sheer Force"},
	},
	bellossom: {
		inherit: true,
		types: ["Grass", "Fairy"],
		baseStats: {hp: 75, atk: 60, def: 95, spa: 100, spd: 100, spe: 100},
		abilities: {0: "Dancer", 1: "Own Tempo", H: "Triage"},
	},
	garbodor: {
		inherit: true,
		types: ["Poison", "Steel"],
		baseStats: {hp: 100, atk: 60, def: 102, spa: 95, spd: 102, spe: 55},
		abilities: {0: "Stench", 1: "Corrosion", H: "Aftermath"},
	},
	druddigon: {
		inherit: true,
		types: ["Dragon", "Steel"],
		baseStats: {hp: 77, atk: 130, def: 120, spa: 60, spd: 90, spe: 68},
		abilities: {0: "Mold Breaker", 1: "Rough Skin", H: "Sheer Force"},
	},
	flygon: {
		inherit: true,
		baseStats: {hp: 100, atk: 70, def: 90, spa: 115, spd: 90, spe: 100},
		abilities: {0: "Levitate", 1: "Adaptability", H: "Berserk"},
	},
	palossand: {
      inherit: true,
		baseStats: {hp: 85, atk: 65, def: 110, spa: 100, spd: 95, spe: 35},
		abilities: {0: "Water Compaction", H: "Sand Stream"},
	},
	togedemaru: {
		inherit: true,
		baseStats: {hp: 95, atk: 120, def: 94, spa: 35, spd: 73, spe: 103},
		abilities: {0: "Iron Barbs", 1: "Motor Drive", H: "Sturdy"},
	},
	galvantula: {
		inherit: true,
		abilities: {0: "Oblivious", 1: "Compound Eyes", H: "Unnerve"},
	},
	samurott: {
		inherit: true,
		types: ["Water", "Fighting"],
		baseStats: {hp: 95, atk: 117, def: 85, spa: 118, spd: 70, spe: 70},
		abilities: {0: "Torrent", H: "Adaptability"},
	},
	delphox: {
		inherit: true,
		baseStats: {hp: 75, atk: 59, def: 92, spa: 104, spd: 100, spe: 104},
		abilities: {0: "Blaze", H: "Magic Guard"},
	},
	torterra: {
		inherit: true,
		baseStats: {hp: 105, atk: 129, def: 105, spa: 65, spd: 105, spe: 36},
		abilities: {0: "Overgrow", H: "Solid Rock"},
	},
	vikavolt: {
		inherit: true,
		baseStats: {hp: 100, atk: 70, def: 90, spa: 145, spd: 90, spe: 61},
		abilities: {0: "Levitate", H: "Technician"},
	},
	escavalier: {
		inherit: true,
		baseStats: {hp: 80, atk: 135, def: 105, spa: 60, spd: 105, spe: 40},
		abilities: {0: "Swarm", 1: "Shield Dust", H: "Filter"}, 
	},
	accelgor: {
		inherit: true, 
		types: ["Bug", "Dark"],
		baseStats: {hp: 80, atk: 60, def: 80, spa: 105, spd: 80, spe: 145},
		abilities: {0: "Unburden", H: "Infiltrator"},
	},
	aurorus: {
		inherit: true,
		baseStats: {hp: 123, atk: 77, def: 92, spa: 109, spd: 92, spe: 28},
	},
	avalugg: {
		inherit: true,
		types: ["Ice", "Fighting"],
		baseStats: {hp: 105, atk: 117, def: 184, spa: 44, spd: 56, spe: 28},
	},
	lapras: {
		inherit: true,
		baseStats: {hp: 130, atk: 105, def: 80, spa: 85, spd: 95, spe: 60},
		abilities: {0: "Water Absorb", 1: "Shell Armor", H: "Technician"},
	},
   rampardos: {
		inherit: true,
		baseStats: {hp: 92, atk: 155, def: 70, spa: 85, spd: 60, spe: 88},
		abilities: {0: "No Guard", 1: "Mold Breaker", H: "Sheer Force"},
	},
	hitmontop: {
		inherit: true,
		types: ["Fighting", "Normal"],
		baseStats: {hp: 70, atk: 115, def: 95, spa: 35, spd: 110, spe: 90},
	},
	gourgeist: {
		inherit: true,
		baseStats: {hp: 85, atk: 100, def: 132, spa: 58, spd: 85, spe: 84},
		abilities: {0: "Prankster", 1: "Insomnia", H: "Adaptability"},
	},
	gourgeistlarge: {
		inherit: true,
		baseStats: {hp: 95, atk: 105, def: 132, spa: 58, spd: 85, spe: 69},
		abilities: {0: "Prankster", 1: "Insomnia", H: "Adaptability"},
	},
	gourgeistsmall: {
		inherit: true,
		baseStats: {hp: 75, atk: 95, def: 132, spa: 58, spd: 85, spe: 99},
		abilities: {0: "Prankster", 1: "Insomnia", H: "Adaptability"},
	},
	gourgeistsuper: {
		inherit: true,
		baseStats: {hp: 105, atk: 110, def: 132, spa: 58, spd: 85, spe: 54},
		abilities: {0: "Prankster", 1: "Insomnia", H: "Adaptability"},  
	},
	zoroark: {
		inherit: true,
		types: ["Dark", "Fairy"],
		baseStats: {hp: 90, atk: 105, def: 90, spa: 120, spd: 100, spe: 105},
	},
	toxicroak: {
		inherit: true,
		types: ["Poison", "Dark"],
		baseStats: {hp: 90, atk: 115, def: 85, spa: 75, spd: 85, spe: 90},
      abilities: {0: "Emergency Exit", 1: "Dry Skin", H: "Vital Spirit"},
	},
	golemalola: {
		inherit: true,
		baseStats: {hp: 95, atk: 120, def: 120, spa: 45, spd: 85, spe: 85},
		abilities: {0: "Solid Rock", 1: "Sturdy", H: "Galvanize"},
	},
	lycanrocmidnight: {
		inherit: true,
		types: ["Rock", "Ground"],
      baseStats: {hp: 85, atk: 120, def: 75, spa: 55, spd: 75, spe: 87},
		abilities: {0: "No Guard", 1: "Vital Spirit", H: "Tough Claws"},
	},
	corsola: {
		inherit: true,
		baseStats: {hp: 75, atk: 55, def: 115, spa: 105, spd: 125, spe: 45},
      abilities: {0: "Levitate", H: "Regenerator"},
   },
   persian : {
      inherit: true,
      baseStats: {hp: 85, atk: 110, def: 60, spa: 65, spd: 65, spe: 125},
      abilities: {0: "Fur Coat", H: "Simple"},
   },
   furfrou: {
      inherit: true,
      types: ["Normal", "Ghost"],
      baseStats: {hp: 95, atk: 80, def: 60, spa: 80, spd: 90, spe: 125},
   }, 
   furret: { 
      inherit: true, 
      types: ["Normal", "Fighting"],
      baseStats: {hp: 85, atk: 115, def: 64, spa: 106, spd: 55, spe: 110}, 
      abilities: {0: "Frisk", 1: "Keen Eye", H: "No Guard"},
   }, 
};
