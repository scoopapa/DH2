'use strict';

 exports.BattlePokedex = {
  fletchinder: {
		num: 662,
		species: "Fletchinder",
		types: ["Fire","Flying"],
		baseStats: {hp: 62, atk: 73, def: 55, spa: 56, spd: 52, spe: 84},
		abilities: {0: "Flame Body", H: "Gale Wings"},
		heightm: 0.7,
		weightkg: 16,
		color: "Red",
		prevo: "fletchling",
		evos: ["talonflame","talonfey","talonwave","talonacid","talondrake","talonvolt"],
		evoLevel: 17,
		eggGroups: ["Flying"],
  },
  talonfey: {
      		num: 9001,
      		species: "Talonfey",
      		types: ["Fairy","Flying"],
      		baseStats: {hp: 81, atk: 126, def: 71, spa: 69, spd: 74, spe: 78},
      		abilities: {0: "Dazzling", H: "Gale Wings"},
      		prevo: "fletchinder",
  },
  talonwave: {
      		num: 9002,
      		species: "Talonwave",
      		types: ["Water","Flying"],
      		baseStats: {hp: 126, atk: 71, def: 78, spa: 81, spd: 74, spe: 69},
      		abilities: {0: "Water Absorb", H: "Gale Wings"},
      		prevo: "fletchinder",
  },
  talonacid: {
      		num: 9003,
      		species: "Talonacid",
     		types: ["Poison","Flying"],
      		baseStats: {hp: 74, atk: 69, def: 126, spa: 78, spd: 81, spe: 71},
      		abilities: {0: "Poison Point", H: "Corrosion"},
      		prevo: "fletchinder",
  },
  talondrake: {
      		num: 9004,
      		species: "Talondrake",
     		types: ["Dragon","Flying"],
      		baseStats: {hp: 78, atk: 81, def: 74, spa: 126, spd: 69, spe: 71},
      		abilities: {0: "Tough Claws", H: "Gale Wings"},
      		prevo: "fletchinder",
  },
  talonvolt: {
      		num: 9005,
      		species: "Talonvolt",
      		types: ["Electric","Flying"],
      		baseStats: {hp: 69, atk: 74, def: 71, spa: 126, spd: 78, spe: 81},
      		abilities: {0: "Static", H: "Gale Wings"},
      		prevo: "fletchinder",
  },
  raichu: {
		num: 26,
		species: "Raichu",
		types: ["Electric"],
		baseStats: {hp: 60, atk: 90, def: 55, spa: 90, spd: 80, spe: 110},
		abilities: {0: "Static", H: "Lightning Rod"},
		heightm: 0.8,
		weightkg: 30,
		color: "Yellow",
		prevo: "pikachu",
		evoLevel: 1,
	        evos: ["umichu","armochu","miraclechu","noxiochu","keruchu","conflachu"],
		eggGroups: ["Field", "Fairy"],
		otherFormes: ["raichualola"],
  },
  umichu: {
	        num: 9006,
	        species: "Umichu",
	        types: ["Electric","Water"],
	        baseStats: {hp: 80, atk: 75, def: 110, spa: 90, spd: 115, spe: 80},
	        abilities: {0: "Hydration", H: "Lightning Rod"},
	        prevo: "Raichu"
  },
  armochu: {
	        num: 9007,
	        species: "Armochu",
	        types: ["Electric","Steel"],
	        baseStats: {hp: 89, atk: 55, def: 101, spa: 140, spd: 103, spe: 62},
	        abilities: {0: "Filter", H: "Battle Armor"},
	        prevo: "Raichu"
  },
  miraclechu: {
	        num: 9008,
	        species: "Miraclechu",
	        types: ["Electric","Psychic"],
	        baseStats: {hp: 60, atk: 90, def: 75, spa: 135, spd: 75, spe: 110},
	        abilities: {0: "Static", H: "Miracle Dash"},
	        prevo: "Raichu"
  },
  noxiochu: {
	        num: 9009,
	        species: "Noxiochu",
	        types: ["Electric","Poison"],
	        baseStats: {hp: 75, atk: 112, def: 50, spa: 91, spd: 86, spe: 136},
	        abilities: {0: "Volt Absorb", 1: "Poison Touch", H: "Electrojection"},
	        prevo: "Raichu"
  },
  keruchu: {
	        num: 9010,
	        species: "Keruchu",
	        types: ["Electric","Fighting"],
	        baseStats: {hp: 70, atk: 110, def: 85, spa: 95, spd: 60, spe: 130},
	        abilities: {0: "Scrappy", H: "Sheer Force"},
	        prevo: "Raichu"
  },
  conflachu: {
	        num: 9011,
	        species: "Conflachu",
	        types: ["Electric","Fire"],
	        baseStats: {hp: 110, atk: 130, def: 65, spa: 70, spd: 65, spe: 110},
	        abilities: {0: "Static", H: "Reckless"},
	        prevo: "Raichu"
  },
  sliggoo: {
		num: 705,
		species: "Sliggoo",
		types: ["Dragon"],
		baseStats: {hp: 68, atk: 75, def: 53, spa: 83, spd: 113, spe: 60},
		abilities: {0: "Sap Sipper", 1: "Hydration", H: "Gooey"},
		heightm: 0.8,
		weightkg: 17.5,
		color: "Purple",
		prevo: "goomy",
		evos: ["goodra","goollium","goopsyche","sumogoo","goobolt","dragooxie"],
		evoLevel: 40,
		eggGroups: ["Dragon"],
  },
  goollium: {
	        num: 9012,
	        species: "Goollium",
	        types: ["Dragon","Steel"],
	        baseStats: {hp: 100, atk: 90, def: 150, spa: 80, spd: 70, spe: 110},
	        abilities: {0: "Filter", H: "Regenerator"},
	        prevo: "Sliggoo"
  },
  goopsyche: {
	        num: 9013,
	        species: "Goopsyche",
	        types: ["Dragon","Psychic"],
	        baseStats: {hp: 90, atk: 110, def: 150, spa: 70, spd: 100, spe: 80},
	        abilities: {0: "Bravery", 1: "Guts", H: "Gooey"},
	        prevo: "Sliggoo"
  },
  sumogoo: {
	        num: 9014,
	        species: "Sumogoo",
	        types: ["Dragon","Fighting"],
	        baseStats: {hp: 90, atk: 110, def: 150, spa: 100, spd: 80, spe: 70},
	        abilities: {0: "Hustle", 1: "Hydration", H: "Iron Fist"},
	        prevo: "Sliggoo"
  },
  goobolt: {
	        num: 9015,
	        species: "Goobolt",
	        types: ["Dragon","Electric"],
	        baseStats: {hp: 70, atk: 110, def: 90, spa: 100, spd: 80, spe: 150},
	        abilities: {0: "Motor Drive", 1: "Static", H: "Regenerator"},
	        prevo: "Sliggoo"
  },
  dragooxie: {
	        num: 9016,
	        species: "Dragooxie",
	        types: ["Dragon","Fairy"],
	        baseStats: {hp: 150, atk: 70, def: 90, spa: 110, spd: 100, spe: 80},
	        abilities: {0: "Sap Sipper", 1: "Pixilate", H: "Gooey"},
	        prevo: "Sliggoo"
  },
  sunkern: {
		num: 191,
		species: "Sunkern",
		types: ["Grass"],
		baseStats: {hp: 30, atk: 30, def: 30, spa: 30, spd: 30, spe: 30},
		abilities: {0: "Chlorophyll", 1: "Solar Power", H: "Early Bird"},
		heightm: 0.3,
		weightkg: 1.8,
		color: "Yellow",
		evos: ["sunflora","sunpad","snowflora","moonflora","sunshock","sunspook"],
		eggGroups: ["Grass"],
  },
  sunpad: {
	        num: 9017,
	        species: "Sunpad",
	        types: ["Grass","Water"],
	        baseStats: {hp: 75, atk: 30, def: 75, spa: 85, spd: 105, spe: 55},
	        abilities: {0: "Drizzle", 1: "Triage", H: "Natural Cure"},
	        prevo: "Sunkern"
  },
  snowflora: {
	        num: 9018,
	        species: "Snowflora",
	        types: ["Grass","Ice"],
	        baseStats: {hp: 75, atk: 30, def: 75, spa: 85, spd: 55, spe: 105},
	        abilities: {0: "Snow Warning", 1: "Slush Rush", H: "Refrigerate"},
	        prevo: "Sunkern"
  },
  moonflora: {
	        num: 9019,
	        species: "Moonflora",
	        types: ["Grass","Dark"],
	        baseStats: {hp: 85, atk: 55, def: 75, spa: 30, spd: 75, spe: 105},
	        abilities: {0: "Huge Power", 1: "Grass Pelt", H: "Prankster"},
	        prevo: "Sunkern"
  },
  sunshock: {
	        num: 9020,
	        species: "Sunshock",
	        types: ["Grass","Electric"],
	        baseStats: {hp: 105, atk: 55, def: 75, spa: 85, spd: 75, spe: 30},
	        abilities: {0: "Analytic", 1: "Lightning Rod", H: "Lucky"},
	        prevo: "Sunkern"
  },
  sunspook: {
	        num: 9021,
	        species: "Sunspook",
	        types: ["Grass","Ghost"],
	        baseStats: {hp: 85, atk: 55, def: 75, spa: 105, spd: 75, spe: 30},
	        abilities: {0: "Inverse Ivy", H: "Insomnia"},
	        prevo: "Sunkern"
  },
  dunsparce: {
		num: 206,
		species: "Dunsparce",
		types: ["Normal"],
		baseStats: {hp: 100, atk: 70, def: 70, spa: 65, spd: 65, spe: 45},
		abilities: {0: "Serene Grace", 1: "Run Away", H: "Rattled"},
		heightm: 1.5,
		weightkg: 14,
		color: "Yellow",
	        evos: ["allsparce","dunsoul","landisparce","frosparce","dunsparkle","dunvelop","dunstatic"],
		eggGroups: ["Field"],
  },
  allsparce: {
	        num: 9022,
	        species: "Allsparce",
	        types: ["Normal"],
	        baseStats: {hp: 110, atk: 95, def: 100, spa: 75, spd: 100, spe: 85},
	        abilities: {0: "Protean", H: "Adaptability"},
	        prevo: "Dunsparce"
  },
  dunsoul: {
	        num: 9023,
	        species: "Dunsoul",
	        types: ["Normal","Ghost"],
	        baseStats: {hp: 150, atk: 95, def: 85, spa: 80, spd: 95, spe: 60},
	        abilities: {0: "Serene Grace", 1: "Cursed Body", H: "Rattled"},
	        prevo: "Dunsparce"
  },
  landisparce: {
	        num: 9024,
	        species: "Landisparce",
	        types: ["Normal","Ground"],
	        baseStats: {hp: 105, atk: 126, def: 75, spa: 69, spd: 100, spe: 90},
	        abilities: {0: "Sand Rush", 1: "Sand Force", H: "Hidden Soul"},
	        prevo: "Dunsparce"
  },
  frosparce: {
	        num: 9025,
	        species: "Frosparce",
	        types: ["Normal","Ice"],
	        baseStats: {hp: 100, atk: 130, def: 75, spa: 85, spd: 65, spe: 110},
	        abilities: {0: "Serene Grace", 1: "Frostborn", H: "Levitate"},
	        prevo: "Dunsparce"
  },
  dunsparkle: {
	        num: 9026,
	        species: "Dunsparkle",
	        types: ["Normal","Fairy"],
	        baseStats: {hp: 160, atk: 100, def: 90, spa: 65, spd: 90, spe: 60},
	        abilities: {0: "Dazzling", 1: "Regenerator", H: "Wonder Skin"},
	        prevo: "Dunsparce"
  },
  dunvelop: {
	        num: 9027,
	        species: "Dunvelop",
	        types: ["Normal"],
	        baseStats: {hp: 120, atk: 125, def: 95, spa: 85, spd: 85, spe: 55},
	        abilities: {0: "Thriver"},
	        prevo: "Dunsparce"
  },
  dunstatic: {
	        num: 9028,
	        species: "Dunstatic",
	        types: ["Electric","Flying"],
	        baseStats: {hp: 130, atk: 95, def: 80, spa: 80, spd: 100, spe: 80},
	        abilities: {0: "Serene Grace", 1: "Sheer Force", H: "Static"},
	        prevo: "Dunsparce",
	  		  weightkg: 52.6,
  },  
  scyther: {
		num: 123,
		species: "Scyther",
		types: ["Bug", "Flying"],
		baseStats: {hp: 70, atk: 110, def: 80, spa: 55, spd: 80, spe: 105},
		abilities: {0: "Swarm", 1: "Technician", H: "Steadfast"},
		heightm: 1.5,
		weightkg: 56,
		color: "Green",
		evos: ["scizor","reapther","scypsy","buzzsoar","scyanide","magzor"],
		eggGroups: ["Bug"],
   },
   reapther: {
	        num: 9029,
	        species: "Reapther",
	        types: ["Bug","Ghost"],
	        baseStats: {hp: 40, atk: 120, def: 80, spa: 65, spd: 75, spe: 125},
	        abilities: {0: "Aftermath", 1: "Technicican", H: "Levitate"},
	        prevo: "Scyther"
   },
	 reapthermega : {
num: 9029,
species: "Reapther-Mega",
baseSpecies: "Reapther",
forme: "Mega",
formeLetter: "M", 
types: ["Bug", "Ghost"], 
baseStats:{hp: 40, atk: 150, def: 90, spa: 85, spd: 90, spe: 145},
abilities: {0: "Reaper Slice"}, 
},
   scypsy: {
	        num: 9030,
	        species: "Scypsy",
	        types: ["Bug","Psychic"],
	        baseStats: {hp: 65, atk: 100, def: 70, spa: 55, spd: 80, spe: 130},
	        abilities: {0: "Technician", 1: "Telepathy", H: "Magic Guard"},
	        prevo: "Scyther"
   },
	 scypsymega : {
num: 9030,
species: "Scypsy-Mega",
baseSpecies: "Scypsy",
forme: "Mega",
formeLetter: "M", 
types: ["Bug", "Psychic"], 
baseStats:{hp: 65, atk: 140, def: 80, spa: 75, spd: 90, spe: 150},
abilities: {0: "Dazzling"}, 
},
   buzzsoar: {
	        num: 9031,
	        species: "Buzzsoar",
	        types: ["Bug","Flying"],
	        baseStats: {hp: 80, atk: 50, def: 70, spa: 130, spd: 70, spe: 100},
	        abilities: {0: "Speed Boost", 1: "Quick Claws", H: "Technician"},
	        prevo: "Scyther"
   },
	 buzzasoarmega : {
num: 123,
species: "Buzzasoar-Mega",
baseSpecies: "Buzzasoar",
forme: "Mega",
formeLetter: "M", 
types: ["Bug", "Flying"], 
baseStats:{hp: 80, atk: 60, def: 80, spa: 160, spd: 80, spe: 140},
abilities: {0: "Speed Boost"}, 
// weightkg: ,
},
   scyanide: {
	        num: 9032,
	        species: "Scyanide",
	        types: ["Bug","Poison"],
	        baseStats: {hp: 51, atk: 100, def: 50, spa: 120, spd: 50, spe: 109},
	        abilities: {0: "Tinted Lens", 1: "Poison Touch", H: "Acidic Touch"},
	        prevo: "Scyther"
   },
	 scyanidemega : {
num: 9032,
species: "Scyanide-Mega",
baseSpecies: "Scyanide",
forme: "Mega",
formeLetter: "M", 
types: ["Bug", "Poison"], 
baseStats:{hp: 51, atk: 130, def: 80, spa: 140, spd: 70, spe: 129},
abilities: {0: "Acidic Touch"}, 
heightm: undefined, 
weightkg: undefined, 
},

   magzor: {
	        num: 9033,
	        species: "Magzor",
	        types: ["Bug","Fire"],
	        baseStats: {hp: 70, atk: 130, def: 55, spa: 80, spd: 65, spe: 100},
	        abilities: {0: "Blaze", 1: "Technician", H: "Guts"},
	        prevo: "Scyther"
   },
	 magzormega : {
num: 9033,
species: "Magzor-Mega",
baseSpecies: "Magzor",
forme: "Mega",
formeLetter: "M", 
types: ["Bug", "Fire"], 
baseStats:{hp: 70, atk: 150, def: 65, spa: 100, spd: 75, spe: 140},
abilities: {0: "Technician"}, 
},
	 alunix: {
			num: 9034,
			species: "Alunix",
			types: ["Electric", "Ground"], 
			baseStats:{hp: 85, atk: 45, def: 190, spa: 75, spd: 85, spe: 30},
			abilities: {0: "Rock Head", 1: "Sturdy", H: "Sheer Force"}, 
			/*weightkg: undefined, */
		   prevo: "Onix"
	 },
	 
alunixmega : {
num: 9034,
species: "Alunix-Mega",
baseSpecies: "Alunix",
forme: "Mega",
formeLetter: "M", 
types: ["Electric", "Ground"], 
baseStats:{hp: 85, atk: 50, def: 200, spa: 110, spd: 115, spe: 50},
abilities: {0: "Electric Surge"}, 
heightm: undefined, 
weightkg: undefined, 
},
	 	coffilix: {
			num: 9035,
			species: "Coffilix",
			types: ["Ground", "Ghost"], 
			baseStats:{hp: 75, atk: 30, def: 200, spa: 85, spd: 65, spe: 55},
			abilities: {0: "Mummy", H: "Rough Skin"}, 
			/*weightkg: undefined, */
			prevo: "Onix"
	 },
	 coffilixmega : {
num: 9035,
species: "Coffilix-Mega",
baseSpecies: "Coffilix",
forme: "Mega",
formeLetter: "M", 
types: ["Ground", "Ghost"], 
baseStats:{hp: 75, atk: 65, def: 190, spa: 130, spd: 65, spe: 85},
abilities: {0: "Weak Armor"}, 
},
	 	 	crystix: {
			num: 9036,
			species: "Crystix",
			types: ["Ice", "Dragon"], 
			baseStats:{hp: 100, atk: 110, def: 120, spa: 40, spd: 120, spe: 20},
			abilities: {0: "Crystal Reflection"}, 
			/*weightkg: undefined, */
			prevo: "Onix"
	 },
	 crystixmega : {
num: 9036,
species: "Crystix-Mega",
baseSpecies: "Crystix",
forme: "Mega",
formeLetter: "M", 
types: ["Ice", "Dragon"], 
baseStats:{hp: 100, atk: 150, def: 150, spa: 40, spd: 150, spe: 20},
abilities: {0: "Crystal Reflection"}, 
heightm: undefined, 
weightkg: undefined, 
},
	 	 gemelix: {
			num: 9037,
			species: "Gemelix",
			types: ["Ground", "Fairy"], 
			baseStats:{hp: 85, atk: 75, def: 65, spa: 30, spd: 200, spe: 55},
			abilities: {0: "Multiscale", H: "Clear Body"},  
			/*weightkg: undefined, */
			prevo: "Onix"
	 },
	 gemelixmega : {
num: 9037,
species: "Gemelix-Mega",
baseSpecies: "Gemelix",
forme: "Mega",
formeLetter: "M", 
types: ["Ground", "Fairy"], 
baseStats:{hp: 80, atk: 105, def: 95, spa: 40, spd: 200, spe: 90},
abilities: {0: "Misty Surge"}, 
},
	 	scarix: {
			num: 9038,
			species: "Scarix",
			types: ["Rock", "Fighting"], 
			baseStats:{hp: 70, atk: 120, def: 110, spa: 30, spd: 70, spe: 110},
			abilities: {0: "No Guard", 1: "Moxe", H: "Rough Skin"},  
			/*weightkg: undefined, */
			prevo: "Onix"
	 },
	 scarixmega : {
num: 9038,
species: "Scarix-Mega",
baseSpecies: "Scarix",
forme: "Mega",
formeLetter: "M", 
types: ["Rock", "FIghting"], 
baseStats:{hp: 70, atk: 160, def: 110, spa: 30, spd: 110, spe: 130},
abilities: {0: "Unbreakable"},  
},
	 riolu: {
		 inherit: true,
		 evos: ["lucario","chacario","cryocario","kobucha"],
	 },
	 chacario: {
			num: 9039,
			species: "Chacario",
			types: ["Fighting", "Ground"], 
			baseStats:{hp: 70, atk: 115, def: 70, spa: 90, spd: 70, spe: 110}, 
			abilities: {0: "Steadfast", 1: "Inner Focus", H: "Torrid Sand"},  
			prevo: "Riolu"
	 },
	 cryocario: {
			num: 9040,
			species: "Cryocario",
			types: ["Fighting", "Ice"], 
			baseStats:{hp: 70, atk: 115, def: 65, spa: 115, spd: 60, spe: 100}, // 70	115	65	115	60	100
			abilities: {0: "Justified", 1: "Anger Point", H: "Slush Rush"},  
			prevo: "Riolu"
	 },
	 kobucha: {
			num: 9041,
			species: "Kobucha",
			types: ["Fighting"], 
			baseStats:{hp: 70, atk: 122, def: 78, spa: 70, spd: 78, spe: 107},
			abilities: {0: "Inner Focus", 1: "Pressure", H: "Long Reach"},  
			prevo: "Riolu"
	 },
	 delibird: {
		num: 225,
		species: "Delibird",
		types: ["Ice", "Flying"],
		baseStats: {hp: 45, atk: 55, def: 45, spa: 65, spd: 45, spe: 75},
		abilities: {0: "Vital Spirit", 1: "Hustle", H: "Insomnia"},
		heightm: 0.9,
		weightkg: 16,
		color: "Red",
		eggGroups: ["Water 1", "Field"],
		otherFormes: ["prisent", "deliblaze", "krampost", "punchex"],
	},
	 prisent: {
			num: 9042,
			species: "Prisent",
			types: ["Ice", "Fighting"], 
			baseStats:{hp: 90, atk: 65, def: 90, spa: 65, spd: 80, spe: 85}, // 90 / 65 / 90 / 65 / 80 / 85
			abilities: {0: "Keen Eye", 1: "Huge Power", H: "Justified"},  
			prevo: "Delibird"
	 },
	 deliblaze: {
			num: 9043,
			species: "Deliblaze",
			types: ["Ice", "Fire"], 
			baseStats:{hp: 55, atk: 90, def: 55, spa: 105, spd: 55, spe: 115}, //55 / 90 / 55 / 105 / 55 / 115 
			abilities: {0: "Flash Fire", 1: "Hustle", H: "Adaptability"},  
			prevo: "Delibird"
	 },
	 krampost: {
			num: 9044,
			species: "Krampost",
			types: ["Ice", "Dark"], 
			baseStats:{hp: 70, atk: 35, def: 60, spa: 130, spd: 60, spe: 120}, //70 / 35 / 60 / 130 / 60 / 120
			abilities: {0: "Infiltrator", 1: "Contrary", H: "Intimidate"},  
			prevo: "Delibird"
	 },
	 punchex: {
			num: 9045,
			species: "Punchex",
			types: ["Ice", "Fighting"], 
			baseStats:{hp: 105, atk: 55, def: 90, spa: 75, spd: 55, spe: 95}, //105/55/90/75/55/95
			abilities: {0: "Huge Power", 1: "Tough Claws", H: "Slush Rush"},  
			prevo: "Delibird"
	 },
	 // Ledian
	 ledian: {
		num: 166,
		species: "Ledian",
		types: ["Bug", "Flying"],
		baseStats: {hp: 55, atk: 35, def: 50, spa: 55, spd: 110, spe: 85},
		abilities: {0: "Swarm", 1: "Early Bird", H: "Iron Fist"},
		heightm: 1.4,
		weightkg: 35.6,
		color: "Red",
		prevo: "ledyba",
		evoLevel: 18,
		eggGroups: ["Bug"],
		otherFormes: ["techled", "ledrake", "ledyvalor", "ledwill", "ledizap", "lediqueen", "ledibubble"],
	},
	 techled: {
			num: 9046,
			species: "Techled",
			types: ["Bug", "Electric"], 
			baseStats:{hp: 75, atk: 110, def: 65, spa: 110, spd: 65, spe: 105}, //75 / 110 / 65 / 110 / 65 / 105
			abilities: {0: "Battery", 1: "Download", H: "Motor Drive"},  
			prevo: "Ledian"
	 },
	 ledrake: {
			num: 9047,
			species: "Ledrake",
			types: ["Bug", "Dragon"], 
			baseStats:{hp: 75, atk: 110, def: 65, spa: 110, spd: 65, spe: 105}, //85 / 90 / 80 / 65 / 80 / 130
			abilities: {0: "Bravery", 1: "Pixieproof", H: "Tough Claws"},  // (Pixieproof: The Pokémon with this Ability will bounce Fairy-type Moves, without any harms, back to the user of these moves.)
			prevo: "Ledian"
	 },
	 ledyvalor: {
			num: 9048,
			species: "Ledyvalor",
			types: ["Bug", "Fighting"], 
			baseStats:{hp: 75, atk: 110, def: 65, spa: 110, spd: 65, spe: 105}, // 80 / 120 / 50 / 65 / 120 / 105 
			abilities: {0: "Steadfast", 1: "Justified", H: "Iron Fist"}, 
			prevo: "Ledian"
	 },
	 ledwill: {
			num: 9049,
			species: "Ledwill",
			types: ["Bug", "Psychic"], 
			baseStats:{hp: 70, atk: 50, def: 70, spa: 120, spd: 110, spe: 110}, // 70 / 50 / 70 / 120 / 110 / 110
			abilities: {0: "Levitate", 1: "Power Convert", H: "Comatose"}, 
		 // (Power Convert: The users Physical moves are converted to Special moves.)
			prevo: "Ledian"
	 },
	 ledizap: {
			num: 9050,
			species: "Ledizap",
			types: ["Bug", "Electric"], 
			baseStats:{hp: 65, atk: 109, def: 75, spa: 64, spd: 84, spe: 133}, // 65 / 109 / 75 / 64 / 84 / 133
			abilities: {0: "Galvanize"}, 
			prevo: "Ledian"
	 },
	 lediqueen: {
			num: 9051,
			species: "Lediqueen",
			types: ["Bug", "Psychic"], 
			baseStats:{hp: 134, atk: 43, def: 57, spa: 101, spd: 126, spe: 74}, // 134 / 43 / 57 / 101 / 126 / 74
			abilities: {0: "Synchronize", H: "Swarm Aura"}, 
		 // Bug-type moves' power is increased by 30% (Fairy/Dark Aura clone).
			prevo: "Ledian"
	 },
	 ledibubble: {
			num: 9052,
			species: "Ledibubble",
			types: ["Bug", "Water"], 
			baseStats:{hp: 105, atk: 75, def: 90, spa: 55, spd: 105, spe: 100}, // 105/75/90/55/105/100
			abilities: {0: "Water Bubble", 1: "Swarm", H: "Speed Boost"}, 
			prevo: "Ledian"
	 },
	 lumineon: {
		num: 457,
		species: "Lumineon",
		types: ["Water"],
		baseStats: {hp: 69, atk: 69, def: 76, spa: 69, spd: 86, spe: 91},
		abilities: {0: "Swift Swim", 1: "Storm Drain", H: "Water Veil"},
		heightm: 1.2,
		weightkg: 24,
		color: "Blue",
		prevo: "finneon",
		evoLevel: 31,
		eggGroups: ["Water 2"],
		otherFormes: ["lumalance", "chloroseon", "enticineon", "lumispark", "inferneon"],
	},
	 lumalance: {
			num: 9053,
			species: "Lumalance",
			types: ["Water", "Normal"], 
			baseStats:{hp: 95, atk: 95, def: 95, spa: 95, spd: 95, spe: 95}, // 95 / 95 / 95 / 95 / 95 / 95 (570)
			abilities: {0: "Nature's Gift"}, 
		 // Nature's Gift: The stat boosted by its nature is increased by 30%
			prevo: "Lumineon"
	 },
	 chloroseon: {
			num: 9054,
			species: "Chloroseon",
			types: ["Water", "Grass"], 
			baseStats:{hp: 129, atk: 69, def: 125, spa: 102, spd: 76, spe: 69}, // 129 / 69 / 125 / 102 / 76 / 69
			abilities: {0: "Chlorophyll", 1: "Sap Sipper", H: "Symbiosis"}, 
			prevo: "Lumineon"
	 },
	 enticineon: {
			num: 9055,
			species: "Enticineon",
			types: ["Water", "Electric"], 
			baseStats:{hp: 105, atk: 70, def: 80, spa: 125, spd: 80, spe: 110}, // 105 / 70 / 80 / 125 / 80 / 110
			abilities: {0: "Swift Swim", 1: "Lightning Rod", H: "Sharkbait"}, 
		 	// Sharkbait: Traps in Water-Type foes
			prevo: "Lumineon"
	 },
	 lumispark: {
			num: 9056,
			species: "Lumispark",
			types: ["Water", "Electric"], 
			baseStats:{hp: 96, atk: 46, def: 76, spa: 129, spd: 89, spe: 129}, 
			abilities: {0: "Swift Swim", 1: "Storm Drain", H: "Electrified Water"}, 
		 	// This Pokémon's Water-type moves gain a 1.2x boost and deal double damage on Flying and Water-type foes
			prevo: "Lumineon"
	 },
	 inferneon: {
			num: 9057,
			species: "Inferneon",
			types: ["Water", "Fire"], 
			baseStats:{hp: 110, atk: 60, def: 130, spa: 110, spd: 130, spe: 30}, // 110 / 60 / 130 / 110 / 130 / 30
			abilities: {0: "Swift Swim", 1: "Erodeproof", H: "Flash Fire"}, 
		 	// Ground and Rock attacks do half damage against this pokemon.
			prevo: "Lumineon"
	 },
	 ariados: {
		num: 168,
		species: "Ariados",
		types: ["Bug", "Poison"],
		baseStats: {hp: 70, atk: 90, def: 70, spa: 60, spd: 70, spe: 40},
		abilities: {0: "Swarm", 1: "Insomnia", H: "Sniper"},
		heightm: 1.1,
		weightkg: 33.5,
		color: "Red",
		prevo: "spinarak",
		evoLevel: 22,
		eggGroups: ["Bug"],
		otherFormes: ["webaeria", "spidice", "crimider"],
	},
	 webaeria: {
			num: 9058,
			species: "Webaeria",
			types: ["Bug", "Flying"], 
			baseStats:{hp: 70, atk: 120, def: 75, spa: 40, spd: 75, spe: 130}, // 70 / 120 / 75 / 40 / 75 / 130
			abilities: {0: "Rock Dodger", 1: "Compound Eyes", H: "Guts"},
		 // (Rock Dodger: Immunity to Rock-type, including Stealth Rock damage. Incoming Rock-type damage will be replaced by Speed boost by one stage.)
			prevo: "Ariados"
	 },
	  spidice: {
			num: 9059,
			species: "Spidice",
			types: ["Bug", "Flying"], 
			baseStats:{hp: 45, atk: 120, def: 45, spa: 120, spd: 45, spe: 135}, //45 / 120 / 45 / 120 / 45 / 135
			abilities: {0: "Ice Body", 1: "Compound Eyes", H: "Slush Rush"},
			prevo: "Ariados"
	 },
	 crimider: {
			num: 9060,
			species: "Crimider",
			types: ["Bug", "Dark"], 
			baseStats:{hp: 120, atk: 150, def: 70, spa: 60, spd: 70, spe: 40}, 
			abilities: {0: "Frisk", 1: "Moxie", H: "Contrary"},
			prevo: "Ariados"
	 },
};
