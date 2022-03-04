export const Pokedex: {[k: string]: ModdedSpeciesData} = {

	/*
	name: {
		inherit: true,
		otherFormes: [""],
		formeOrder: [""],
	},

	name: {
		num: -x,
		name: "Name",
		baseSpecies: "",
		forme: "",
		types: [""],
		baseStats: {hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0},
		abilities: {0: ""},
		weightkg: ,
	},
	*/

	kabuto: {
		inherit: true,
		otherFormes: ["Kabuto-Ancient"],
		formeOrder: ["Kabuto", "Kabuto-Ancient"],
	},

	kabutoancient: {
		num: -100,
		name: "Kabuto-Ancient",
		baseSpecies: "Kabuto",
		forme: "Ancient",
		evos: ["Kabutops-Ancient"],
		types: ["Water", "Fairy"],
		baseStats: {hp: 55, atk: 70, def: 110, spa: 80, spd: 85, spe: 20},
		abilities: {0: "Swift Swim", 1:"Battle Armor", H: "Marvel Scale"},
		weightkg: 11.5,
	},

	kabutops: {
		inherit: true,
		otherFormes: ["Kabutops-Ancient"],
		formeOrder: ["Kabutops", "Kabutops-Ancient"],
	},

	kabutopsancient: {
		num: -101,
		name: "Kabutops-Ancient",
		baseSpecies: "Kabutops",
		forme: "Ancient",
		types: ["Water", "Fairy"],
		baseStats: {hp: 75, atk: 115, def: 75, spa: 95, spd: 75, spe: 90},
		abilities: {0: "Swift Swim", 1:"Battle Armor", H: "Poison Heal"},
		weightkg: 40.5,
	},

	omanyte: {
		inherit: true,
		otherFormes: ["Omanyte-Ancient"],
		formeOrder: ["Omanyte", "Omanyte-Ancient"],
	},

	omanyteancient: {
		num: -102,
		name: "Omanyte-Ancient",
		baseSpecies: "Omanyte",
		forme: "Ancient",
		evos: ["Omastar-Ancient"],
		types: ["Water"],
		baseStats: {hp: 45, atk: 80, def: 70, spa: 30, spd: 40, spe: 50},
		abilities: {0: "Swift Swim", H: "Torrent"},
		weightkg: 7.5,
	},

	omastar: {
		inherit: true,
		otherFormes: ["Omastar-Ancient"],
		formeOrder: ["Omastar", "Omastar-Ancient"],
	},

	omastarancient: {
		num: -103,
		name: "Omastar-Ancient",
		baseSpecies: "Omastar",
		forme: "Ancient",
		types: ["Water", "Poison"],
		baseStats: {hp: 85, atk: 105, def: 95, spa: 55, spd: 75, spe: 80},
		abilities: {0: "Swift Swim", 1: "Shell Armor", H: "Bloodsuck"},
		weightkg: 35,
	},

	aerodactyl: {
		inherit: true,
		otherFormes: ["Aerodactyl-Ancient"],
		formeOrder: ["Aerodactyl", "Aerodactyl-Ancient"],
	},

	aerodactylancient: {
		num: -104,
		name: "Aerodactyl-Ancient",
		baseSpecies: "Aerodactyl",
		forme: "Ancient",
		types: ["Rock", "Flying"],
		baseStats: {hp: 80, atk: 105, def: 70, spa: 60, spd: 80, spe: 130},
		abilities: {0: "Sheer Force", 1: "Pressure", H: "Rough Skin"},
		weightkg: 59,
	},

	anorith: {
		inherit: true,
		otherFormes: ["Anorith-Ancient"],
		formeOrder: ["Anorith", "Anorith-Ancient"],
	},

	anorithancient: {
		num: -105,
		name: "Anorith-Ancient",
		types: ["Bug"],
		baseSpecies: "Anorith",
		forme: "Ancient",
		evos: ["Armaldo-Ancient"],
		baseStats: {hp: 60, atk: 100, def: 50, spa: 40, spd: 80, spe: 50},
		abilities: {0: "Swift Swim", 1: "Battle Armor", H: "Weak Armor"},
		weightkg: 12.5,
	},

	armaldo: {
		inherit: true,
		otherFormes: ["Armaldo-Ancient"],
		formeOrder: ["Armaldo", "Armaldo-Ancient"],
	},

	armaldoancient: {
		num: -105,
		name: "Armaldo-Ancient",
		baseSpecies: "Armaldo",
		forme: "Ancient",
		types: ["Bug", "Fighting"],
		baseStats: {hp: 80, atk: 125, def: 100, spa: 70, spd: 80, spe: 75},
		abilities: {0: "Swift Swim", 1: "Battle Armor", H: "Carboniferous"},
		weightkg: 68.2,
	},

	lileep: {
		inherit: true,
		otherFormes: ["Lileep-Ancient"],
		formeOrder: ["Lileep", "Lileep-Ancient"],
	},

	lileepancient: {
		num: -106,
		name: "Lileep-Ancient",
		baseSpecies: "Lileep",
		forme: "Ancient",
		evos: ["Cradily-Ancient"],
		types: ["Grass"],
		baseStats: {hp: 66, atk: 41, def: 77, spa: 61, spd: 87, spe: 23},
		abilities: {0: "Suction Cups", H: "Storm Drain"},
		weightkg: 23.8,
	},

	cradily: {
		inherit: true,
		otherFormes: ["Cradily-Ancient"],
		formeOrder: ["Cradily", "Cradily-Ancient"],
	},

	cradilyancient: {
		num: -107,
		name: "Cradily-Ancient",
		baseSpecies: "Cradily",
		forme: "Ancient",
		types: ["Grass", "Ground"],
		baseStats: {hp: 85, atk: 100, def: 100, spa: 80, spd: 90, spe: 60},
		abilities: {0: "Regenerator"},
		weightkg: 60,
	},
	
	torkoal: {
		inherit: true,
		otherFormes: ["Torkoal-Pottery"],
		formeOrder: ["Torkoal", "Torkoal-Pottery"],
	},

	torkoalpottery: {
		num: -108,
		name: "Torkoal-Pottery",
		baseSpecies: "Torkoal",
		forme: "Pottery",
		types: ["Fire", "Ground"],
		baseStats: {hp: 70, atk: 65, def: 140, spa: 95, spd: 70, spe: 30},
		abilities: {0: "White Smoke", 1: "Water Compaction", H: "Oblivious"},
		weightkg: 80/4,
	},

	relicanth: {
		inherit: true,
		otherFormes: ["Relicanth-Ancient"],
		formeOrder: ["Relicant", "Relicanth-Ancient"],
	},

	relicanthancient: {
		num: -109,
		name: "Relicanth-Ancient",
		baseSpecies: "Relicanth",
		forme: "Ancient",
		types: ["Fire", "Rock"],
		baseStats: {hp: 85, atk: 60, def: 80, spa: 85, spd: 75, spe: 100},
		abilities: {0: "Water Bubble", H: "Rock Head"},
		weightkg: 23.4,
	},

	swinub: {
		inherit: true,
		otherFormes: ["Swinub-Ancient"],
		formeOrder: ["Swinub", "Swinub-Ancient"],
	},

	swinubancient: {
		num: -110,
		name: "Swinub-Ancient",
		baseSpecies: "Swinub",
		forme: "Ancient",
		types: ["Ice"],
		evos: ["Swinub-Ancient"],
		baseStats: {hp: 50, atk: 30, def: 40, spa: 30, spd: 50, spe: 50},
		abilities: {0: "Oblivious", 1: "Snow Cloak", H: "Adaptability"},
		weightkg: 6.5,
	},

	piloswine: {
		inherit: true,
		otherFormes: ["Piloswine-Ancient"],
		formeOrder: ["Piloswine", "Piloswine-Ancient"],
	},

	piloswineancient: {
		num: -111,
		name: "Piloswine-Ancient",
		baseSpecies: "Piloswine",
		forme: "Ancient",
		types: ["Ice", "Poison"],
		evos: ["Mamoswine-Ancient"],
		baseStats: {hp: 100, atk: 80, def: 80, spa: 60, spd: 80, spe: 50},
		abilities: {0: "Oblivious", 1: "Poison Touch", H: "Oozing Tar"},
		weightkg: 55.8,
	},

	mamoswine: {
		inherit: true,
		otherFormes: ["Mamoswine-Ancient"],
		formeOrder: ["Mamoswine", "Mamoswine-Ancient"],
	},

	mamoswineancient: {
		num: -112,
		name: "Mamoswine-Ancient",
		baseSpecies: "Mamoswine",
		forme: "Ancient",
		types: ["Ice", "Poison"],
		baseStats: {hp: 110, atk: 110, def: 80, spa: 70, spd: 80, spe: 80},
		abilities: {0: "Oblivious", 1: "Poison Touch", H: "Oozing Tar"},
		weightkg: 291,
	},

	dodrumb: {
		num: -113,
		name: "Dodrumb",
		types: ["Normal", "Psychic"],
		baseStats: {hp: 84, atk: 74, def: 104, spa: 74, spd: 54, spe: 64},
		abilities: {0: "Unaware", 1: "Own Tempo", H: "Simple"},
		weightkg: 19,
	},

	blossobite: {
		num: -114,
		name: "Blossobite",
		types: ["Grass", "Electric"],
		baseStats: {hp: 81, atk: 113, def: 100, spa: 70, spd: 60, spe: 71},
		abilities: {0: "Chlorophyll", 1: "Lightning Rod", H: "Underbrush Tactics"},
		weightkg: 223,
	},

	ghoulipinch: {
		num: -115,
		name: "Ghoulipinch",
		types: ["Water", "Ghost"],
		evos: ["Ghoulpion"],
		baseStats: {hp: 50, atk: 40, def: 80, spa: 35, spd: 55, spe: 70},
		abilities: {0: "Corrosive Pincers", 1: "Cursed Body", H: "Swift Swim"},
		weightkg: 0.1,
	},

	ghoulpion: {
		num: -116,
		name: "Ghoulpion",
		types: ["Water", "Ghost"],
		baseStats: {hp: 70, atk: 90, def: 110, spa: 65, spd: 75, spe: 80},
		abilities: {0: "Corrosive Pincers", 1: "Cursed Body", H: "Swift Swim"},
		weightkg: 0.2,
	},

	
	shieldon: {
		inherit: true,
		otherFormes: ["Shieldon-Overgrown"],
		formeOrder: ["Shieldon", "Shieldon-Overgrown"]
	},

	shieldonovergrown: {
		num: -117,
		name: "Shieldon-Overgrown",
		baseSpecies: "Shieldon",
		forme: "Overgrown",
		evos: ["Bastiodon-Overgrown"],
		types: ["Steel", "Grass"],
		baseStats: {hp: 56, atk: 46, def: 77, spa: 67, spd: 97, spe: 30},
		abilities: {0: "Bulletproof", 1: "Leaf Guard", H: "Grassy Surge"},
		weightkg: 57,
	},

	bastiodon: {
		inherit: true,
		otherFormes: ["Bastiodon-Overgrown"],
		formeOrder: ["Bastiodon", "Bastiodon-Overgrown"],
	},

	bastiodonovergrown: {
		num: -118,
		name: "Bastiodon-Overgrown",
		baseSpecies: "Bastiodon",
		forme: "Overgrown",
		types: ["Steel", "Grass"],
		baseStats: {hp: 80, atk: 70, def: 101, spa: 101, spd: 131, spe: 20},
		abilities: {0: "Bulletproof", 1: "Leaf Guard", H: "Grassy Surge"},
		weightkg: 149.5,
	},

	cranios: {
		inherit: true,
		otherFormes: ["Cranidos-Cretaceous"],
		formeOrder: ["Cranidos", "Cranidos-Cretaceous"],
	},

	cranidoscretaceous: {
		num: -119,
		name: "Cranidos-Cretaceous",
		baseSpecies: "Cranidos",
		forme: "Cretaceous",
		evos: ["Rampardos-Cretaceous"],
		types: ["Rock", "Normal"],
		baseStats: {hp: 77, atk: 95, def: 43, spa: 34, spd: 42, spe: 55},
		abilities: {0: "Rock Head", H: "Mold Breaker"},
		weightkg: 31.5,
	},

	rampardos: {
		inherit: true,
		otherFormes: ["Rampardos-Cretaceous"],
		formeOrder: ["Rampardos", "Rampardos-Cretaceous"],
	},

	rampardoscretaceous: {
		num: -120,
		name: "Rampardos-Cretaceous",
		baseSpecies: "Rampardos",
		forme: "Cretaceous",
		types: ["Rock", "Normal"],
		baseStats: {hp: 107, atk: 125, def: 83, spa: 74, spd: 73, spe: 78},
		abilities: {0: "Rock Head", H: "Mold Breaker"},
		weightkg: 102.5,
	},

	
	archen: {
		inherit: true,
		otherFormes: ["Archen-Ancient"],
		formeOrder: ["Archen", "Archen-Ancient"],
	},

	archenancient: {
		num: -121,
		name: "Archen-Ancient",
		baseSpecies: "Archen",
		forme: "Ancient",
		evos: ["Archeops-Ancient"],
		types: ["Fairy", "Flying"],
		baseStats: {hp: 60, atk: 60, def: 70, spa: 68, spd: 65, spe: 90},
		abilities: {0: "Natural Cure"},
		weightkg: 9.5,
	},
	

	archeops: {
		inherit: true,
		otherFormes: ["Archeops-Ancient"],
		formeOrder: ["Archeops", "Archeops-Ancient"],
	},

	archeopsancient: {
		num: -122,
		name: "Archeops-Ancient",
		baseSpecies: "Archeops",
		forme: "Ancient",
		types: ["Fairy", "Flying"],
		baseStats: {hp: 85, atk: 75, def: 96, spa: 85, spd: 90, spe: 140},
		abilities: {0: "Regenerator"},
		weightkg: 32,
	},

	tirtouga: {
		inherit: true,
		otherFormes: ["Tirtouga-Leatherback"],
		formeOrder: ["Tirtouga", "Tirtouga-Leatherback"],
	},

	tirtougaleatherback: {
		num: -123,
		name: "Tirtouga-Leatherback",
		baseSpecies: "Tirtouga",
		forme: "Leatherback",
		types: ["Ground", "Dark"],
		baseStats: {hp: 54, atk: 78, def: 103, spa: 53, spd: 45, spe: 22},
		abilities: {0: "Dry Skin", 1: "Sturdy", H: "Sand Rush"},
		weightkg: 16.5,
	},

	carracosta: {
		inherit: true,
		otherFormes: ["Carracosta-Leatherback"],
		formeOrder: ["Carracosta", "Carracosta-Leatherback"],
	},

	carracostaleatherback: {
		num: -124,
		name: "Carracosta-Leatherback",
		baseSpecies: "Carracosta",
		forme: "Leatherback",
		types: ["Ground", "Dark"],
		baseStats: {hp: 74, atk: 108, def: 133, spa: 83, spd: 65, spe: 32},
		abilities: {0: "Dry Skin", 1: "Sturdy", H: "Sand Rush"},
		weightkg: 81,
	},

	tyrunt: {
		inherit: true,
		otherFormes: ["Tyrunt-Apex"],
		formeOrder: ["Tyrunt", "Tyrunt-Apex"],
	},

	tyruntapex: {
		num: -125,
		name: "Tyrunt-Apex",
		baseSpecies: "Tyrunt",
		forme: "Apex",
		evos: ["Tyrantrum-Apex"],
		types: ["Dragon", "Steel"],
		baseStats: {hp: 58, atk: 89, def: 75, spa: 50, spd: 45, spe: 50},
		abilities: {0: "Anger Point", H: "Iron Barbs"},
		weightkg: 26,
	},

	tyrantrum: {
		inherit: true,
		otherFormes: ["Tyrantrum-Apex"],
		formeOrder: ["Tyrantrum", "Tyrantrum-Apex"],
	},

	tyrantrumapex: {
		num: -126,
		name: "Tyrantrum-Apex",
		baseSpecies: "Tyrantrum",
		forme: "Apex",
		types: ["Dragon", "Steel"],
		baseStats: {hp: 82, atk: 121, def: 110, spa: 74, spd: 65, spe: 74},
		abilities: {0: "Strong Jaw", H: "Iron Barbs"},
		weightkg: 270,
	},

	amaura: {
		inherit: true,
		otherFormes: ["Amaura-Regnant"],
		formeOrder: ["Amaura", "Amaura-Regnant"],
	},

	amauraregnant: {
		num: -127,
		name: "Amaura-Regnant",
		baseSpecies: "Amaura",
		forme: "Regnant",
		evos: ["Aurorus-Regnant"],
		types: ["Ice"],
		baseStats: {hp: 70, atk: 37, def: 45, spa: 70, spd: 67, spe: 58},
		abilities: {0: "Snow Warning", H: "Refrigerate"},
		weightkg: 25.2,
	},

	aurorus: {
		inherit: true,
		otherFormes: ["Aurorus-Regnant"],
		formeOrder: ["Aurorus", "Aurorus-Regnant"],
	},

	aurorusregnant: {
		num: -128,
		name: "Aurorus-Regnant",
		baseSpecies: "Aurorus",
		forme: "Regnant",
		types: ["Fairy", "Ice"],
		baseStats: {hp: 90, atk: 77, def: 85, spa: 109, spd: 90, spe: 88},
		abilities: {0: "Snow Warning", H:"Refrigerate"},
		weightkg: 225,
	},

	/*
	shellos: {
		inherit: true,
		otherFormes: ["Shellos-Entity"],
		formeOrder: ["Shellos", "Shellos-East", "Shellos-Entity"],
	},
	*/

	shellosentity: {
		num: -129,
		name: "Shellos-Entity",
		//baseSpecies: "Shellos",
		//baseForme: "Entity",
		evos: ["Gastrodon-Entity", "Gastrodon-Entity-East"],
		types: ["Poison"],
		baseStats: {hp: 70, atk: 50, def: 60, spa: 50, spd: 60, spe: 40},
		abilities: {0: "Gooey", H: "Poison Point"},
		weightkg: 6.3,
	},

	/*
	gastrodon: {
		inherit: true,
		otherFormes: ["Gastrodon-Entity"],
		formeOrder: ["Gastrodon", "Gastrodon-East", "Gastrodon-Entity", "Gastrodon-Entity-East"],
	},
	*/

	gastrodonentity: {
		num: -130,
		name: "Gastrodon-Entity",
		//baseSpecies: "Gastrodon",
		//baseForme: "Entity",
		types: ["Poison", "Dragon"],
		baseStats: {hp: 120, atk: 95, def: 60, spa: 100, spd: 50, spe: 50},
		abilities: {0: "Gooey", H: "Damp"},
		weightkg: 29.9,
		otherFormes: ["Gastrodon-Entity-East"],
		formeOrder: ["Gastrodon-Entity", "Gastrodon-Entity-East"],
	},

	gastrodonentityeast: {
		num: -130,
		name: "Gastrodon-Entity-East",
		baseSpecies: "Gastrodon-Entity",
		forme: "Entity-East",
		types: ["Poison", "Psychic"],
		baseStats: {hp: 100, atk: 75, def: 80, spa: 80, spd: 70, spe: 70},
		abilities: {0: "Gooey", H: "Neuroforce"},
		weightkg: 29.9,
	},

	yanma: {
		inherit: true,
		otherFormes: ["Yanma-Ancient"],
		formeOrder: ["Yanma", "Yanma-Ancient"],
	},

	yanmaancient: {
		num: -131,
		name: "Yanma-Ancient",
		baseSpecies: "Yanma",
		forme: "Ancient",
		types: ["Bug", "Dragon"],
		baseStats: {hp: 60, atk: 80, def: 55, spa: 80, spd: 55, spe: 60},
		abilities: {0: "Compound Eyes", H: "Chaser"},
		weightkg: 38,
	},

	yanmega: {
		inherit: true,
		otherFormes: ["Yanmega-Ancient"],
		formeOrder: ["Yanmega", "Yanmega-Ancient"],
	},

	yanmegaancient: {
		num: -132,
		name: "Yanmega-Ancient",
		baseSpecies: "Yanmega",
		forme: "Ancient",
		types: ["Bug", "Dragon"],
		baseStats: {hp: 85, atk: 110, def: 70, spa: 110, spd: 70, spe: 70},
		abilities: {0: "Strong Jaw", H: "Chaser"},
		weightkg: 51.5,
	},

	tangela: {
		inherit: true,
		otherFormes: ["Tangela-Ancient"],
		formeOrder: ["Tangela", "Tangela-Ancient"],
	},

	tangelaancient: {
		num: -133,
		name: "Tangela-Ancient",
		baseSpecies: "Tangela",
		forme: "Ancient",
		evos: ["Tangrowth-Ancient"],
		types: ["Grass", "Fire"],
		baseStats: {hp: 65, atk: 55, def: 40, spa: 100, spd: 115, spe: 60},
		abilities: {0: "Mold Breaker", 1: "Grass Pelt", H: "Absorption"},
		weightkg: 35,
	},

	tangrowth: {
		inherit: true,
		otherFormes: ["Tangrowth-Ancient"],
		formeOrder: ["Tangrowth", "Tangrowth-Ancient"],
	},

	tangrowthancient: {
		num: -134,
		name: "Tangrowth-Ancient",
		baseSpecies: "Tangrowth",
		forme: "Ancient",
		types: ["Grass", "Fire"],
		baseStats: {hp: 100, atk: 100, def: 50, spa: 110, spd: 125, spe: 50},
		abilities: {0: "Mold Breaker", 1: "Grass Pelt", H: "Absorption"},
		weightkg: 128.6,
	},
};