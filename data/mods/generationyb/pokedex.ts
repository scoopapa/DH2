export const Pokedex: import('../../../sim/dex-species').ModdedSpeciesDataTable = {
  // New Pokemon
	urxine: {
		num: 1201,
		name: "Urxine",
		types: ["Grass"],
		genderRatio: {M: 0.875, F: 0.125},
		baseStats: {hp: 65, atk: 63, def: 62, spa: 50, spd: 50, spe: 20},
		abilities: {0: "Overgrow", H: "Symbiosis"},
		weightkg: 10,
		evos: ["Nectear"],
		eggGroups: ["Field", "Grass"],
	},
	nectear: {
		num: 1202,
		name: "Nectear",
		types: ["Grass"],
		genderRatio: {M: 0.875, F: 0.125},
		baseStats: {hp: 85, atk: 93, def: 82, spa: 70, spd: 60, spe: 30},
		abilities: {0: "Overgrow", H: "Symbiosis"},
		weightkg: 50,
		prevo: "Urxine",
		evos: ["Sucrosid"],
		eggGroups: ["Field", "Grass"],
	},
	sucrosid: {
		num: 1203,
		name: "Sucrosid",
		types: ["Grass", "Bug"],
		genderRatio: {M: 0.875, F: 0.125},
		baseStats: {hp: 111, atk: 127, def: 102, spa: 80, spd: 70, spe: 40},
		abilities: {0: "Overgrow", H: "Sugar Shield"},
		weightkg: 250,
		prevo: "Nectear",
		eggGroups: ["Field", "Grass"],
	},
	fyermine: {
		num: 1204,
		name: "Fyermine",
		types: ["Fire"],
		genderRatio: {M: 0.875, F: 0.125},
		baseStats: {hp: 41, atk: 46, def: 47, spa: 74, spd: 47, spe: 55},
		abilities: {0: "Blaze", H: "Adaptability"},
		weightkg: 5,
		evos: ["Exploat"],
		eggGroups: ["Field"],
	},
	exploat: {
		num: 1205,
		name: "Exploat",
		types: ["Fire"],
		genderRatio: {M: 0.875, F: 0.125},
		baseStats: {hp: 66, atk: 76, def: 57, spa: 94, spd: 57, spe: 70},
		abilities: {0: "Blaze", H: "Adaptability"},
		weightkg: 10,
		prevo: "Fyermine",
		evos: ["Ancillarine"],
		eggGroups: ["Field"],
	},
	ancillarine: {
		num: 1206,
		name: "Ancillarine",
		types: ["Fire", "Steel"],
		genderRatio: {M: 0.875, F: 0.125},
		baseStats: {hp: 83, atk: 111, def: 72, spa: 107, spd: 72, spe: 85},
		abilities: {0: "Blaze", H: "Adaptability"},
		weightkg: 100,
		prevo: "Exploat",
		eggGroups: ["Field"],
	},
	hydrattle: {
		num: 1207,
		name: "Hydrattle",
		types: ["Water"],
		genderRatio: {M: 0.875, F: 0.125},
		baseStats: {hp: 38, atk: 54, def: 40, spa: 60, spd: 48, spe: 70},
		abilities: {0: "Torrent", H: "Liquid Ooze"},
		weightkg: 5,
		evos: ["Aquadder"],
		eggGroups: ["Field", "Water 1"],
	},
	aquadder: {
		num: 1208,
		name: "Aquadder",
		types: ["Water"],
		genderRatio: {M: 0.875, F: 0.125},
		baseStats: {hp: 55, atk: 68, def: 56, spa: 89, spd: 62, spe: 90},
		abilities: {0: "Torrent", H: "Liquid Ooze"},
		weightkg: 10,
		prevo: "Hydrattle",
		evos: ["Cobrush"],
		eggGroups: ["Field", "Water 2"],
	},
	cobrush: {
		num: 1209,
		name: "Cobrush",
		types: ["Water", "Ghost"],
		genderRatio: {M: 0.875, F: 0.125},
		baseStats: {hp: 70, atk: 81, def: 70, spa: 114, spd: 73, spe: 122},
		abilities: {0: "Torrent", H: "Liquid Ooze"},
		weightkg: 50,
		prevo: "Aquadder",
		eggGroups: ["Field", "Water 3"],
	},
	silkloth: {
		num: 1210,
		name: "Silkloth",
		types: ["Bug", "Normal"],
		baseStats: {hp: 26, atk: 42, def: 42, spa: 32, spd: 32, spe: 40},
		abilities: {0: "Shield Dust", H: "Gooey"},
		weightkg: 5,
		evos: ["Silkapeau"],
		eggGroups: ["Bug"],
	},
	silkapeau: {
		num: 1211,
		name: "Silkapeau",
		types: ["Bug", "Normal"],
		baseStats: {hp: 46, atk: 32, def: 74, spa: 42, spd: 57, spe: 20},
		abilities: {0: "Shed Skin", H: "Gooey"},
		weightkg: 5,
		prevo: "Silkloth",
		evos: ["Soiecharpe"],
		eggGroups: ["Bug"],
	},
	soiecharpe: {
		num: 1212,
		name: "Soiecharpe",
		types: ["Bug", "Normal"],
		baseStats: {hp: 56, atk: 62, def: 106, spa: 114, spd: 67, spe: 90},
		abilities: {0: "High Fashion", H: "Silk Stream"},
		weightkg: 5,
		prevo: "Silkapeau",
		eggGroups: ["Bug"],
	},
	bittertweet: {
		num: 1213,
		name: "Bittertweet",
		types: ["Flying", "Dark"],
		baseStats: {hp: 44, atk: 44, def: 35, spa: 61, spd: 35, spe: 61},
		abilities: {0: "Unnerve", 1: "Forewarn", H: "Opportunist"},
		weightkg: 5,
		evos: ["Mourvid"],
		eggGroups: ["Flying"],
	},
	mourvid: {
		num: 1214,
		name: "Mourvid",
		types: ["Flying", "Dark"],
		baseStats: {hp: 69, atk: 54, def: 45, spa: 81, spd: 45, spe: 81},
		abilities: {0: "Unnerve", 1: "Forewarn", H: "Opportunist"},
		weightkg: 5,
		prevo: "Bittertweet",
		evos: ["Villainelle"],
		eggGroups: ["Flying"],
	},
	villainelle: {
		num: 1215,
		name: "Villainelle",
		types: ["Flying", "Dark"],
		baseStats: {hp: 91, atk: 61, def: 59, spa: 115, spd: 59, spe: 115},
		abilities: {0: "Orator", 1: "Forewarn", H: "Opportunist"},
		weightkg: 10,
		prevo: "Mourvid",
		eggGroups: ["Flying"],
	},
	knittle: {
		num: 1216,
		name: "Knittle",
		types: ["Normal"],
		baseStats: {hp: 40, atk: 55, def: 35, spa: 30, spd: 35, spe: 55},
		abilities: {0: "Pickup", 1: "Inner Focus", H: "Run Away"},
		weightkg: 5,
		evos: ["Knitwit"],
		eggGroups: ["Field"],
	},
	knitwit: {
		num: 1217,
		name: "Knitwit",
		types: ["Normal", "Steel"],
		baseStats: {hp: 70, atk: 90, def: 100, spa: 50, spd: 65, spe: 85},
		abilities: {0: "Sharpness", 1: "Inner Focus", H: "Run Away"},
		weightkg: 25,
		prevo: "Knittle",
		eggGroups: ["Field"],
	},
	nezuken: {
		num: 1218,
		name: "Nezuken",
		types: ["Electric"],
		genderRatio: {M: 0.25, F: 0.75},
		baseStats: {hp: 41, atk: 52, def: 39, spa: 32, spd: 32, spe: 54},
		abilities: {0: "Motor Drive", 1: "Serene Grace", H: "Klutz"},
		weightkg: 5,
		evos: ["Nezuto"],
		eggGroups: ["Field", "Human-Like"],
	},
	nezuto: {
		num: 1219,
		name: "Nezuto",
		types: ["Electric", "Ice"],
		genderRatio: {M: 0.25, F: 0.75},
		baseStats: {hp: 51, atk: 72, def: 59, spa: 47, spd: 42, spe: 79},
		abilities: {0: "Motor Drive", 1: "Serene Grace", H: "Skill Link"},
		weightkg: 10,
		prevo: "Nezuken",
		evos: ["Nezuketo"],
		eggGroups: ["Field", "Human-Like"],
	},
	nezuketo: {
		num: 1220,
		name: "Nezuketo",
		types: ["Electric", "Ice"],
		genderRatio: {M: 0.25, F: 0.75},
		baseStats: {hp: 67, atk: 92, def: 77, spa: 71, spd: 62, spe: 121},
		abilities: {0: "Motor Drive", 1: "Serene Grace", H: "Skill Link"},
		weightkg: 25,
		prevo: "Nezuto",
		eggGroups: ["Field", "Human-Like"],
	},
	haresay: {
		num: 1221,
		name: "Haresay",
		types: ["Ghost"],
		baseStats: {hp: 65, atk: 30, def: 45, spa: 60, spd: 45, spe: 65},
		abilities: {0: "Cursed Body"},
		weightkg: 5,
		prevo: "Kataralope",
		eggGroups: ["Field", "Fairy"],
	},
	kataralope: {
		num: 1222,
		name: "Kataralope",
		types: ["Ghost", "Poison"],
		baseStats: {hp: 85, atk: 95, def: 75, spa: 85, spd: 95, spe: 85},
		abilities: {0: "Power Rush"},
		weightkg: 10,
		evos: ["Haresay"],
		eggGroups: ["Field", "Fairy"],
	},
	dandileo: {
		num: 1223,
		name: "Dandileo",
		types: ["Grass", "Flying"],
		baseStats: {hp: 43, atk: 72, def: 45, spa: 40, spd: 60, spe: 40},
		abilities: {0: "Wind Rider", 1: "Chlorophyll", H: "Run Away"},
		weightkg: 10,
		evos: ["Taraxane"],
		eggGroups: ["Field", "Grass"],
	},
	taraxane: {
		num: 1224,
		name: "Taraxane",
		types: ["Grass", "Flying"],
		baseStats: {hp: 77, atk: 123, def: 70, spa: 60, spd: 110, spe: 70},
		abilities: {0: "Wind Rider", 1: "Chlorophyll", H: "Unnerve"},
		weightkg: 25,
		prevo: "Dandileo",
		eggGroups: ["Field", "Grass"],
	},
	merecate: {
		num: 1225,
		name: "Merecate",
		types: ["Ground"],
		genderRatio: {M: 0.75, F: 0.25},
		baseStats: {hp: 40, atk: 45, def: 50, spa: 30, spd: 50, spe: 60},
		abilities: {0: "Rattled", H: "Own Tempo"},
		weightkg: 5,
		evos: ["Surisentry", "Suribreak", "Surigreat"],
		eggGroups: ["Field"],
	},
	surisentry: {
		num: 1226,
		name: "Surisentry",
		types: ["Ground"],
		gender: "M",
		baseStats: {hp: 70, atk: 85, def: 75, spa: 55, spd: 75, spe: 120},
		abilities: {0: "Keen Eye", H: "Stakeout"},
		weightkg: 25,
		prevo: "Merecate",
		eggGroups: ["Field"],
	},
	suribreak: {
		num: 1227,
		name: "Suribreak",
		types: ["Ground", "Fighting"],
		gender: "F",
		baseStats: {hp: 70, atk: 120, def: 75, spa: 55, spd: 75, spe: 85},
		abilities: {0: "Scrappy", H: "Vital Spirit"},
		weightkg: 10,
		prevo: "Merecate",
		eggGroups: ["Field"],
	},
	surigreat: {
		num: 1228,
		name: "Surigreat",
		types: ["Ground", "Psychic"],
		gender: "F",
		baseStats: {hp: 70, atk: 55, def: 95, spa: 120, spd: 95, spe: 95},
		abilities: {0: "Queenly Majesty", H: "Supreme Overlord"},
		weightkg: 25,
		prevo: "Merecate",
		eggGroups: ["Field"],
	},
	melivolt: {
		num: 1229,
		name: "Melivolt",
		types: ["Psychic", "Electric"],
		baseStats: {hp: 35, atk: 75, def: 60, spa: 40, spd: 50, spe: 75},
		abilities: {0: "Strong Jaw", 1: "Moxie", H: "Minus"},
		weightkg: 10,
		evos: ["Voltratel"],
		eggGroups: ["Field"],
	},
	voltratel: {
		num: 1230,
		name: "Voltratel",
		types: ["Psychic", "Electric"],
		baseStats: {hp: 55, atk: 105, def: 105, spa: 60, spd: 70, spe: 105},
		abilities: {0: "Strong Jaw", 1: "Moxie", H: "Minus"},
		weightkg: 50,
		prevo: "Melivolt",
		eggGroups: ["Field"],
	},
	extremkitty: {
		num: 1231,
		name: "Extremkitty",
		types: ["Fire", "Ice"],
		baseStats: {hp: 32, atk: 54, def: 49, spa: 41, spd: 49, spe: 52},
		abilities: {0: "Flame Body", 1: "Ice Body", H: "Regenerator"},
		weightkg: 10,
		evos: ["Exopurrmic"],
		eggGroups: ["Field"],
	},
	exopurrmic: {
		num: 1232,
		name: "Exopurrmic",
		types: ["Fire", "Ice"],
		baseStats: {hp: 77, atk: 99, def: 68, spa: 72, spd: 68, spe: 106},
		abilities: {0: "Flame Body", 1: "Ice Body", H: "Regenerator"},
		weightkg: 20,
		prevo: "Extremkitty",
		eggGroups: ["Field"],
	},
	radaroo: {
		num: 1233,
		name: "Radaroo",
		types: ["Fighting", "Psychic"],
		baseStats: {hp: 49, atk: 38, def: 50, spa: 59, spd: 50, spe: 62},
		abilities: {0: "Infiltrator", 1: "Static", H: "Filter"},
		weightkg: 10,
		evos: ["Gammaroo"],
		eggGroups: ["Monster"],
	},
	gammaroo: {
		num: 1234,
		name: "Gammaroo",
		types: ["Fighting", "Psychic"],
		baseStats: {hp: 75, atk: 62, def: 80, spa: 102, spd: 80, spe: 116},
		abilities: {0: "Infiltrator", 1: "Static", H: "Filter"},
		weightkg: 50,
		prevo: "Radaroo",
		eggGroups: ["Monster"],
	},
	puromania: {
		num: 1235,
		name: "Puromania",
		types: ["Fighting"],
		baseStats: {hp: 65, atk: 140, def: 80, spa: 40, spd: 70, spe: 65},
		abilities: {0: "Relentless", 1: "Anger Point", H: "Moxie"},
		weightkg: 10,
		eggGroups: ["Field", "Monster"],
	},
	pebblami: {
		num: 1236,
		name: "Pebblami",
		types: ["Ground", "Rock"],
		baseStats: {hp: 40, atk: 60, def: 50, spa: 30, spd: 40, spe: 60},
		abilities: {0: "Pickup", H: "Sand Force"},
		weightkg: 10,
		evos: ["Sedient"],
		eggGroups: ["Field", "Mineral"],
	},
	sedient: {
		num: 1237,
		name: "Sedient",
		types: ["Ground", "Rock"],
		baseStats: {hp: 60, atk: 100, def: 90, spa: 70, spd: 80, spe: 100},
		abilities: {0: "Parental Bond", H: "Sand Force"},
		weightkg: 100,
		prevo: "Pebblami",
		eggGroups: ["Field", "Mineral"],
	},
	perripacitor: {
		num: 1238,
		name: "Perripacitor",
		types: ["Poison", "Electric"],
		baseStats: {hp: 115, atk: 110, def: 80, spa: 70, spd: 70, spe: 55},
		abilities: {0: "Static", 1: "Poison Touch", H: "Swift Swim"},
		weightkg: 25,
		eggGroups: ["Water 1"],
	},
	tragichiou: {
		num: 1239,
		name: "Tragichiou",
		types: ["Dark", "Fairy"],
		baseStats: {hp: 70, atk: 115, def: 55, spa: 55, spd: 115, spe: 90},
		abilities: {0: "Role Reversal"},
		weightkg: 10,
		eggGroups: ["Human-Like", "Fairy"],
		otherFormes: ["Tragichiou-Comedy"],
		formeOrder: ["Tragichiou", "Tragichiou-Comedy"],
	},
	tragichioucomedy: {
		num: 1239,
		name: "Tragichiou-Comedy",
		baseSpecies: "Tragichiou",
		forme: "Comedy",
		types: ["Dark", "Fairy"],
		baseStats: {hp: 70, atk: 55, def: 115, spa: 115, spd: 55, spe: 90},
		abilities: {0: "Role Reversal"},
		weightkg: 10,
		eggGroups: ["Human-Like", "Fairy"],
		requiredAbility: "Role Reversal",
		battleOnly: "Tragichiou",
	},
	frozun: {
		num: 1240,
		name: "Frozun",
		types: ["Ice"],
		gender: "N",
		baseStats: {hp: 40, atk: 33, def: 40, spa: 66, spd: 40, spe: 13},
		abilities: {0: "Ice Body", 1: "Clear Body", H: "Snow Warning"},
		weightkg: 5,
		evos: ["Glacieux"],
		eggGroups: ["Mineral"],
	},
	glacieux: {
		num: 1241,
		name: "Glacieux",
		types: ["Ice"],
		gender: "N",
		baseStats: {hp: 60, atk: 50, def: 60, spa: 100, spd: 60, spe: 20},
		abilities: {0: "Ice Body", 1: "Clear Body", H: "Snow Warning"},
		weightkg: 100,
		prevo: "Frozun",
		evos: ["Antarctrois"],
		eggGroups: ["Mineral"],
	},
	antarctrois: {
		num: 1242,
		name: "Antarctrois",
		types: ["Ice", "Poison"],
		gender: "N",
		baseStats: {hp: 90, atk: 75, def: 90, spa: 150, spd: 90, spe: 30},
		abilities: {0: "Acidic Slush", 1: "Poison Point", H: "Snow Warning"},
		weightkg: 500,
		prevo: "Glacieux",
		eggGroups: ["Mineral"],
	},
	diamata: {
		num: 1243,
		name: "Diamata",
		types: ["Ice", "Normal"],
		baseStats: {hp: 60, atk: 45, def: 75, spa: 65, spd: 40, spe: 75},
		abilities: {0: "Snowpiercer", 1: "Rough Skin", H: "Ice Body"},
		weightkg: 25,
		evos: ["Crystalizz"],
		eggGroups: ["Monster"],
	},
	crystalizz: {
		num: 1244,
		name: "Crystalizz",
		types: ["Ice", "Normal"],
		baseStats: {hp: 80, atk: 65, def: 95, spa: 105, spd: 70, spe: 110},
		abilities: {0: "Snowpiercer", 1: "Rough Skin", H: "Ice Body"},
		weightkg: 50,
		prevo: "Diamata",
		eggGroups: ["Monster"],
	},
	vismas: {
		num: 1245,
		name: "Vismas",
		types: ["Poison", "Grass"],
		baseStats: {hp: 60, atk: 25, def: 57, spa: 42, spd: 57, spe: 24},
		abilities: {0: "Cute Charm", 1: "Poison Point", H: "Harvest"},
		weightkg: 5,
		evos: ["Blistletoe", "Bristletoe"],
		eggGroups: ["Grass"],
	},
	blistletoe: {
		num: 1246,
		name: "Blistletoe",
		types: ["Poison", "Grass"],
		baseStats: {hp: 90, atk: 55, def: 87, spa: 92, spd: 127, spe: 44},
		abilities: {0: "Cute Charm", 1: "Poison Point", H: "Harvest"},
		weightkg: 10,
		prevo: "Vismas",
		eggGroups: ["Grass"],
	},
	bristletoe: {
		num: 1247,
		name: "Bristletoe",
		types: ["Poison", "Ice"],
		baseStats: {hp: 90, atk: 117, def: 80, spa: 55, spd: 64, spe: 104},
		abilities: {0: "Bitter Cold", 1: "Poison Point", H: "Ice Body"},
		weightkg: 50,
		prevo: "Vismas",
		eggGroups: ["Grass"],
	},
	selachip: {
		num: 1248,
		name: "Selachip",
		types: ["Ghost", "Water"],
		baseStats: {hp: 40, atk: 76, def: 50, spa: 34, spd: 30, spe: 50},
		abilities: {0: "Parasitic", 1: "Infiltrator", H: "Rough Skin"},
		weightkg: 5,
		evos: ["Squavoli"],
		eggGroups: ["Water 2", "Amorphous"],
	},
	squavoli: {
		num: 1249,
		name: "Squavoli",
		types: ["Ghost", "Water"],
		baseStats: {hp: 60, atk: 126, def: 89, spa: 70, spd: 77, spe: 88},
		abilities: {0: "Parasitic", 1: "Infiltrator", H: "Rough Skin"},
		weightkg: 10,
		prevo: "Selachip",
		eggGroups: ["Water 2", "Amorphous"],
	},
	ghoulgoyle: {
		num: 1250,
		name: "Ghoulgoyle",
		types: ["Rock", "Ghost"],
		baseStats: {hp: 89, atk: 113, def: 121, spa: 65, spd: 73, spe: 39},
		abilities: {0: "Levitate", H: "Intimidate"},
		weightkg: 200,
		eggGroups: ["Mineral"],
	},
	petradum: {
		num: 1251,
		name: "Petradum",
		types: ["Rock", "Normal"],
		baseStats: {hp: 51, atk: 79, def: 73, spa: 37, spd: 49, spe: 66},
		abilities: {0: "Earthly Might", 1: "Steadfast", H: "Unburden"},
		weightkg: 25,
		evos: ["Petrander"],
		eggGroups: ["Mineral", "Human-Like"],
	},
	petrander: {
		num: 1252,
		name: "Petrander",
		types: ["Rock", "Normal"],
		baseStats: {hp: 71, atk: 109, def: 93, spa: 62, spd: 69, spe: 91},
		abilities: {0: "Earthly Might", 1: "Steadfast", H: "Unburden"},
		weightkg: 100,
		prevo: "Petradum",
		eggGroups: ["Mineral", "Human-Like"],
	},
	petragena: {
		num: 1253,
		name: "Petragena",
		types: ["Rock", "Psychic"],
		gender: "N",
		baseStats: {hp: 60, atk: 40, def: 40, spa: 100, spd: 100, spe: 15},
		abilities: {0: "Galactic Might", 1: "Levitate", H: "Telepathy"},
		weightkg: 5,
		evos: ["Petradvena"],
		eggGroups: ["Mineral", "Amorphous"],
	},
	petradvena: {
		num: 1254,
		name: "Petradvena",
		types: ["Rock", "Psychic"],
		gender: "N",
		baseStats: {hp: 100, atk: 40, def: 60, spa: 130, spd: 130, spe: 35},
		abilities: {0: "Galactic Might", 1: "Levitate", H: "Telepathy"},
		weightkg: 50,
		prevo: "Petragena",
		eggGroups: ["Mineral", "Amorphous"],
	},
	fearow: {
		inherit: true,
		evos: ["Hearow"],
	},
	hearow: {
		num: 1255,
		name: "Hearow",
		types: ["Fairy", "Flying"],
		baseStats: {hp: 85, atk: 110, def: 80, spa: 71, spd: 71, spe: 115},
		abilities: {0: "Justified", H: "Sniper"},
		weightkg: 58,
		prevo: "Fearow",
		eggGroups: ["Flying"],
	},
	weepinbell: {
		inherit: true,
		evos: ["Victreebel", "Wishinbel"],
	},
	wishinbel: {
		num: 1256,
		name: "Wishinbel",
		types: ["Grass", "Water"],
		baseStats: {hp: 80, atk: 65, def: 105, spa: 100, spd: 80, spe: 60},
		abilities: {0: "Chlorophyll", H: "Storm Drain"},
		weightkg: 41.5,
		prevo: "Weepinbell",
		eggGroups: ["Grass"],
	},
	eevee: {
		inherit: true,
		evos: ["Vaporeon", "Jolteon", "Flareon", "Espeon", "Umbreon", "Leafeon", "Glaceon", "Sylveon", "Mytheon", "Geareon"],
	},
	mytheon: {
		num: 1257,
		name: "Mytheon",
		types: ["Dragon"],
		baseStats: {hp: 110, atk: 95, def: 60, spa: 65, spd: 65, spe: 130},
		abilities: {0: "Pressure", H: "Tough Claws"},
		weightkg: 12,
		prevo: "Eevee",
		eggGroups: ["Field"],
	},
	geareon: {
		num: 1258,
		name: "Geareon",
		types: ["Steel"],
		baseStats: {hp: 60, atk: 65, def: 130, spa: 110, spd: 95, spe: 65},
		abilities: {0: "Heavy Metal", H: "Steam Engine"},
		weightkg: 100,
		prevo: "Eevee",
		eggGroups: ["Field"],
	},
	mightyena: {
		inherit: true,
		evos: ["Blightyena"],
	},
	blightyena: {
		num: 1259,
		name: "Blightyena",
		types: ["Dark"],
		baseStats: {hp: 80, atk: 120, def: 80, spa: 70, spd: 70, spe: 100},
		abilities: {0: "Intimidate", 1: "Neutralizing Gas", H: "Insomnia"},
		weightkg: 72,
		prevo: "Mightyena",
		eggGroups: ["Field"],
	},
	clamperl: {
		inherit: true,
		evos: ["Huntail", "Gorebyss", "Glandrench"],
	},
	glandrench: {
		num: 1260,
		name: "Glandrench",
		types: ["Water", "Poison"],
		baseStats: {hp: 55, atk: 52, def: 105, spa: 94, spd: 75, spe: 104},
		abilities: {0: "Swift Swim", H: "Gooey"},
		weightkg: 24.8,
		prevo: "Clamperl",
		eggGroups: ["Water 1"],
	},
	maractus: {
		inherit: true,
		evos: ["Maracarga"],
	},
	maracarga: {
		num: 1261,
		name: "Maracarga",
		types: ["Grass", "Fire"],
		baseStats: {hp: 90, atk: 86, def: 77, spa: 124, spd: 77, spe: 86},
		abilities: {0: "Water Absorb", 1: "Heatproof", H: "Storm Drain"},
		weightkg: 58,
		prevo: "Maractus",
		eggGroups: ["Grass"],
	},
	solosis: {
		inherit: true,
		otherFormes: ["Solosis-YB"],
		formeOrder: ["Solosis", "Solosis-YB"],
	},
	duochondrion: {
		num: 1262,
		name: "Duochondrion",
		types: ["Grass", "Fighting"],
		baseStats: {hp: 65, atk: 135, def: 55, spa: 40, spd: 45, spe: 30},
		abilities: {0: "Magic Guard", 1: "Chlorophyll", H: "Regenerator"},
		weightkg: 4,
		prevo: "Solosis-YB",
		evos: ["Reuniplast"],
		eggGroups: ["Grass", "Amorphous"],
	},
	reuniplast: {
		num: 1263,
		name: "Reuniplast",
		types: ["Grass", "Fighting"],
		baseStats: {hp: 110, atk: 135, def: 80, spa: 65, spd: 70, spe: 30},
		abilities: {0: "Magic Guard", 1: "Chlorophyll", H: "Regenerator"},
		weightkg: 10.1,
		prevo: "Duochondrion",
		eggGroups: ["Grass", "Amorphous"],
	},
	driscue: {
		num: 1264,
		name: "Driscue",
		types: ["Rock", "Ground"],
		baseStats: {hp: 75, atk: 80, def: 110, spa: 65, spd: 90, spe: 50},
		abilities: {0: "Stone Face"},
		weightkg: 89,
		eggGroups: ["Flying"],
		otherFormes: ["Driscue-No Sand"],
		formeOrder: ["Driscue", "Driscue-No Sand"],
	},
	driscuenosand: {
		num: 1264,
		name: "Driscue-No Sand",
		baseSpecies: "Driscue",
		forme: "No Sand",
		types: ["Rock", "Ground"],
		baseStats: {hp: 75, atk: 80, def: 70, spa: 65, spd: 50, spe: 130},
		abilities: {0: "Stone Face"},
		weightkg: 89,
		eggGroups: ["Flying"],
		requiredAbility: "Stone Face",
		battleOnly: "Driscue",
	},
	lawnjourner: {
		num: 1265,
		name: "Lawnjourner",
		types: ["Grass"],
		baseStats: {hp: 100, atk: 125, def: 135, spa: 20, spd: 20, spe: 70},
		abilities: {0: "Perfect Garden"},
		weightkg: 520,
		eggGroups: ["Grass"],
	},
	aufant: {
		num: 1266,
		name: "Aufant",
		types: ["Ground", "Steel"],
		baseStats: {hp: 72, atk: 80, def: 49, spa: 40, spd: 49, spe: 40},
		abilities: {0: "Dry Skin", H: "Dazzling"},
		weightkg: 310,
		evos: ["Aurrarajah"],
		eggGroups: ["Field", "Mineral"],
	},
	aurrarajah: {
		num: 1267,
		name: "Aurrarajah",
		types: ["Ground", "Steel"],
		baseStats: {hp: 125, atk: 132, def: 87, spa: 61, spd: 64, spe: 30},
		abilities: {0: "Dry Skin", H: "Dazzling"},
		weightkg: 999.9,
		prevo: "Aufant",
		eggGroups: ["Field", "Mineral"],
	},
	toktik: {
		num: 1268,
		name: "Toktik",
		types: ["Steel", "Bug"],
		baseStats: {hp: 20, atk: 60, def: 75, spa: 80, spd: 75, spe: 60},
		abilities: {0: "Soundproof"},
		weightkg: 25,
		evos: ["Analock"],
		eggGroups: ["Amorphous", "Bug"],
	},
	analock: {
		num: 1269,
		name: "Analock",
		types: ["Steel", "Dark"],
		baseStats: {hp: 48, atk: 60, def: 120, spa: 120, spd: 120, spe: 72},
		abilities: {0: "Overclock"},
		weightkg: 50,
		prevo: "Toktik",
		eggGroups: ["Amorphous", "Bug"],
	},
	gbonawola: {
		num: 1270,
		name: "Gbonawola",
		types: ["Fire", "Dragon"],
		baseStats: {hp: 70, atk: 91, def: 65, spa: 130, spd: 104, spe: 110},
		abilities: {0: "Awaiting Destiny"},
		weightkg: 100,
		tags: ["Sub-Legendary"],
		eggGroups: ["Undiscovered"],
	},
	gbonanene: {
		num: 1271,
		name: "Gbonanene",
		types: ["Bug", "Dragon"],
		baseStats: {hp: 70, atk: 65, def: 91, spa: 104, spd: 130, spe: 110},
		abilities: {0: "Awaiting Destiny"},
		weightkg: 100,
		tags: ["Sub-Legendary"],
		eggGroups: ["Undiscovered"],
	},
	gbonablanu: {
		num: 1272,
		name: "Gbonablanu",
		types: ["Ghost", "Dragon"],
		baseStats: {hp: 70, atk: 104, def: 130, spa: 65, spd: 91, spe: 110},
		abilities: {0: "Awaiting Destiny"},
		weightkg: 100,
		tags: ["Sub-Legendary"],
		eggGroups: ["Undiscovered"],
	},
	gbonazito: {
		num: 1273,
		name: "Gbonazito",
		types: ["Electric", "Dragon"],
		baseStats: {hp: 70, atk: 130, def: 104, spa: 91, spd: 65, spe: 110},
		abilities: {0: "Awaiting Destiny"},
		weightkg: 100,
		tags: ["Sub-Legendary"],
		eggGroups: ["Undiscovered"],
	},
	tuatoxa: {
		num: 1274,
		name: "Tuatoxa",
		types: ["Poison"],
		baseStats: {hp: 50, atk: 70, def: 35, spa: 65, spd: 35, spe: 45},
		abilities: {0: "Liquid Ooze", 1: "Poison Point", H: "Merciless"},
		weightkg: 25,
		evos: ["Tuatira"],
		eggGroups: ["Monster", "Dragon"],
	},
	tuatira: {
		num: 1275,
		name: "Tuatira",
		types: ["Poison"],
		baseStats: {hp: 70, atk: 100, def: 55, spa: 85, spd: 45, spe: 65},
		abilities: {0: "Liquid Ooze", 1: "Poison Point", H: "Merciless"},
		weightkg: 50,
		prevo: "Tuatoxa",
		evos: ["Tuamana"],
		eggGroups: ["Monster", "Dragon"],
	},
	tuamana: {
		num: 1276,
		name: "Tuamana",
		types: ["Poison", "Fairy"],
		baseStats: {hp: 100, atk: 130, def: 85, spa: 115, spd: 75, spe: 95},
		abilities: {0: "Gaia Guardian", 1: "Poison Point", H: "Merciless"},
		weightkg: 100,
		prevo: "Tuatira",
		eggGroups: ["Monster", "Dragon"],
	},
	dekanyi: {
		num: 1277,
		name: "Dekanyi",
		types: ["Rock", "Ground"],
		baseStats: {hp: 100, atk: 160, def: 140, spa: 70, spd: 100, spe: 100},
		abilities: {0: "Golden Quills"},
		weightkg: 200,
		tags: ["Restricted Legendary"],
		eggGroups: ["Undiscovered"],
	},
	dekatsosi: {
		num: 1278,
		name: "Dekatsosi",
		types: ["Steel", "Flying"],
		baseStats: {hp: 100, atk: 70, def: 100, spa: 160, spd: 140, spe: 100},
		abilities: {0: "Aluminum Wings"},
		weightkg: 200,
		tags: ["Restricted Legendary"],
		eggGroups: ["Undiscovered"],
	},
	ohunuohunu: {
		num: 1279,
		name: "Ohunu-Ohunu",
		types: ["Bug", "Ghost"],
		baseStats: {hp: 100, atk: 130, def: 105, spa: 130, spd: 105, spe: 100},
		abilities: {0: "Heatproof"},
		weightkg: 150,
		tags: ["Restricted Legendary"],
		eggGroups: ["Undiscovered"],
		otherFormes: ["Ohunu-Ohunu-Core"],
		formeOrder: ["Ohunu-Ohunu", "Ohunu-Ohunu-Core"],
	},
	ohunuohunucore: {
		num: 1279,
		name: "Ohunu-Ohunu-Core",
		baseSpecies: "Ohunu-Ohunu",
		forme: "Core",
		types: ["Bug", "Fire"],
		baseStats: {hp: 100, atk: 160, def: 95, spa: 160, spd: 95, spe: 110},
		abilities: {0: "Molten Threads"},
		weightkg: 999.9,
		tags: ["Restricted Legendary"],
		eggGroups: ["Undiscovered"],
		changesFrom: "Ohunu-Ohunu",
	},
	kaledzi: {
		num: 1280,
		name: "Kaledzi",
		types: ["Fairy", "Fighting"],
		baseStats: {hp: 100, atk: 100, def: 100, spa: 100, spd: 100, spe: 100},
		abilities: {0: "Defiant"},
		weightkg: 10,
		tags: ["Mythical"],
		eggGroups: ["Undiscovered"],
	},

  // Forms
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
	doduo: {
		inherit: true,
		otherFormes: ["Doduo-YB"],
		formeOrder: ["Doduo", "Doduo-YB"],
	},
	doduoyb: {
		num: 84,
		name: "Doduo-YB",
		baseSpecies: "Doduo",
		forme: "YB",
		types: ["Psychic", "Dragon"],
		baseStats: {hp: 30, atk: 90, def: 40, spa: 35, spd: 40, spe: 75},
		abilities: {0: "Insult to Injury", 1: "Own Tempo", H: "Skill Link"},
		weightkg: 40.2,
		evos: ["Dodrio-YB"],
		eggGroups: ["Flying"],
	},
	dodrio: {
		inherit: true,
		otherFormes: ["Dodrio-YB"],
		formeOrder: ["Dodrio", "Dodrio-YB"],
	},
	dodrioyb: {
		num: 85,
		name: "Dodrio-YB",
		baseSpecies: "Dodrio",
		forme: "YB",
		types: ["Psychic", "Dragon"],
		baseStats: {hp: 55, atk: 115, def: 60, spa: 60, spd: 70, spe: 110},
		abilities: {0: "Insult to Injury", 1: "Own Tempo", H: "Skill Link"},
		weightkg: 95.2,
		prevo: "Doduo-YB",
		eggGroups: ["Flying"],
	},
	lunatone: {
		inherit: true,
		otherFormes: ["Lunatone-YB"],
		formeOrder: ["Lunatone", "Lunatone-YB"],
	},
	lunatoneyb: {
		num: 337,
		name: "Lunatone-YB",
		baseSpecies: "Lunatone",
		forme: "YB",
		types: ["Rock", "Dark"],
		baseStats: {hp: 80, atk: 55, def: 55, spa: 105, spd: 75, spe: 90},
		abilities: {0: "Total Eclipse"},
		weightkg: 84,
		eggGroups: ["Mineral"],
	},
	solrock: {
		inherit: true,
		otherFormes: ["Solrock-YB"],
		formeOrder: ["Solrock", "Solrock-YB"],
	},
	solrockyb: {
		num: 338,
		name: "Solrock-YB",
		baseSpecies: "Solrock",
		forme: "YB",
		types: ["Rock", "Fairy"],
		baseStats: {hp: 80, atk: 105, def: 75, spa: 55, spd: 55, spe: 90},
		abilities: {0: "Total Eclipse"},
		weightkg: 77,
		eggGroups: ["Mineral"],
	},
	solosisyb: {
		num: 577,
		name: "Solosis-YB",
		baseSpecies: "Solosis",
		forme: "YB",
		types: ["Grass"],
		baseStats: {hp: 45, atk: 115, def: 45, spa: 30, spd: 35, spe: 20},
		abilities: {0: "Magic Guard", 1: "Chlorophyll", H: "Symbiosis"},
		weightkg: 1,
		evos: ["Duochondrion"],
		eggGroups: ["Grass", "Amorphous"],
	},
	heatmor: {
		inherit: true,
		otherFormes: ["Heatmor-YB"],
		formeOrder: ["Heatmor", "Heatmor-YB"],
	},
	heatmoryb: {
		num: 631,
		name: "Heatmor-YB",
		baseSpecies: "Heatmor",
		forme: "YB",
		types: ["Fire", "Water"],
		baseStats: {hp: 85, atk: 87, def: 61, spa: 105, spd: 61, spe: 85},
		abilities: {0: "Temperature Control", 1: "Storm Drain", H: "Pressure"},
		weightkg: 78,
		eggGroups: ["Field"],
	},
	durant: {
		inherit: true,
		otherFormes: ["Durant-YB"],
		formeOrder: ["Durant", "Durant-YB"],
	},
	durantyb: {
		num: 632,
		name: "Durant-YB",
		baseSpecies: "Durant",
		forme: "YB",
		types: ["Bug", "Rock"],
		baseStats: {hp: 58, atk: 109, def: 122, spa: 38, spd: 58, spe: 99},
		abilities: {0: "Doorstop", 1: "Sturdy", H: "Rock Head"},
		weightkg: 66,
		eggGroups: ["Bug"],
	},
	turtonator: {
		inherit: true,
		abilities: {0: "Shell Armor", H: "Aftermath"},
		otherFormes: ["Turtonator-YB"],
		formeOrder: ["Turtonator", "Turtonator-YB"],
	},
	turtonatoryb: {
		num: 776,
		name: "Turtonator-YB",
		baseSpecies: "Turtonator",
		forme: "YB",
		types: ["Ground", "Fairy"],
		baseStats: {hp: 60, atk: 68, def: 145, spa: 101, spd: 85, spe: 26},
		abilities: {0: "Mirror Armor", H: "Weak Armor"},
		weightkg: 424,
		eggGroups: ["Monster", "Dragon"],
	},
	drampa: {
		inherit: true,
		otherFormes: ["Drampa-YB"],
		formeOrder: ["Drampa", "Drampa-YB"],
	},
	drampayb: {
		num: 780,
		name: "Drampa-YB",
		baseSpecies: "Drampa",
		forme: "YB",
		types: ["Fire", "Fairy"],
		baseStats: {hp: 68, atk: 60, def: 85, spa: 145, spd: 101, spe: 26},
		abilities: {0: "Berserk", 1: "Soundproof", H: "Solar Power"},
		weightkg: 165,
		eggGroups: ["Monster", "Dragon"],
	},

  // Buffs
  shiinotic: {
		inherit: true,
		baseStats: {hp: 60, atk: 45, def: 80, spa: 100, spd: 100, spe: 30},
  },
  paras: {
		inherit: true,
		abilities: {0: "Effect Spore", 1: "Dry Skin", H: "Parasitic"},
  },
  parasect: {
		inherit: true,
		baseStats: {hp: 60, atk: 105, def: 80, spa: 60, spd: 80, spe: 30},
		abilities: {0: "Effect Spore", 1: "Dry Skin", H: "Parasitic"},
  },
  politoed: {
		inherit: true,
		baseStats: {hp: 90, atk: 75, def: 75, spa: 100, spd: 100, spe: 70},
  },
	ledian: {
		inherit: true,
		baseStats: {hp: 55, atk: 35, def: 50, spa: 55, spd: 110, spe: 95},
  },
	furfrou: {
		inherit: true,
		baseStats: {hp: 75, atk: 100, def: 60, spa: 65, spd: 90, spe: 102},
  },
  ariados: {
		inherit: true,
		abilities: {0: "Swarm", 1: "Toxic Debris", H: "Sniper"},
  },
  relicanth: {
		inherit: true,
		baseStats: {hp: 100, atk: 100, def: 130, spa: 45, spd: 65, spe: 55},
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
	dustox: {
		inherit: true,
		baseStats: {hp: 60, atk: 50, def: 80, spa: 50, spd: 90, spe: 65},
		abilities: {0: "Shield Dust", 1: "Toxic Debris", H: "Compound Eyes"},
  },
	beautifly: {
		inherit: true,
		abilities: {0: "Swarm", 1: "Opportunist", H: "Rivalry"},
  },
	nincada: {
		inherit: true,
		abilities: {0: "Compound Eyes", 1: "Parasitic", H: "Run Away"},
  },
	ninjask: {
		inherit: true,
		baseStats: {hp: 61, atk: 100, def: 45, spa: 50, spd: 50, spe: 160},
		abilities: {0: "Speed Boost", 1: "Parasitic", H: "Infiltrator"},
  },
	shedinja: {
		inherit: true,
		baseStats: {hp: 1, atk: 100, def: 45, spa: 30, spd: 30, spe: 40},
  },
	zangoose: {
		inherit: true,
		baseStats: {hp: 73, atk: 115, def: 60, spa: 60, spd: 60, spe: 100},
  },
	seviper: {
		inherit: true,
		baseStats: {hp: 73, atk: 100, def: 60, spa: 100, spd: 60, spe: 75},
  },
	wormadam: {
		inherit: true,
		baseStats: {hp: 80, atk: 59, def: 85, spa: 79, spd: 105, spe: 36},
  },
	wormadamsandy: {
		inherit: true,
		baseStats: {hp: 80, atk: 79, def: 105, spa: 59, spd: 85, spe: 36},
  },
	wormadamtrash: {
		inherit: true,
		baseStats: {hp: 80, atk: 69, def: 95, spa: 69, spd: 95, spe: 36},
  },
	mothim: {
		inherit: true,
		baseStats: {hp: 70, atk: 104, def: 50, spa: 104, spd: 50, spe: 66},
  },
	purugly: {
		inherit: true,
		baseStats: {hp: 71, atk: 92, def: 71, spa: 64, spd: 59, spe: 112},
  },
	chatot: {
		inherit: true,
		baseStats: {hp: 82, atk: 65, def: 55, spa: 92, spd: 52, spe: 91},
  },
	musharna: {
		inherit: true,
		baseStats: {hp: 126, atk: 55, def: 85, spa: 107, spd: 95, spe: 29},
  },
	grapploct: {
		inherit: true,
		baseStats: {hp: 80, atk: 118, def: 100, spa: 70, spd: 90, spe: 42},
  },
	fidough: {
		inherit: true,
		abilities: {0: "Own Tempo", 1: "Gooey", H: "Klutz"},
  },
	dachsbun: {
		inherit: true,
		baseStats: {hp: 67, atk: 90, def: 115, spa: 50, spd: 80, spe: 95},
		abilities: {0: "Well-Baked Body", 1: "Sugar Shield", H: "Aroma Veil"},
  },
	squawkabilly: {
		inherit: true,
		baseStats: {hp: 82, atk: 96, def: 61, spa: 45, spd: 61, spe: 92},
  },
	squawkabillyblue: {
		inherit: true,
		baseStats: {hp: 82, atk: 96, def: 61, spa: 45, spd: 61, spe: 92},
  },
	squawkabillyyellow: {
		inherit: true,
		baseStats: {hp: 82, atk: 96, def: 61, spa: 45, spd: 61, spe: 92},
  },
	squawkabillywhite: {
		inherit: true,
		baseStats: {hp: 82, atk: 96, def: 61, spa: 45, spd: 61, spe: 92},
  },
};