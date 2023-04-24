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
		evos: [""],
		types: [""],
		baseStats: {hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0},
		abilities: {0: ""},
		weightkg: ,
		prevo: "",
	},
	*/

	kabuto: {
		inherit: true,
		otherFormes: ["Kabuto-Ancient"],
		formeOrder: ["Kabuto", "Kabuto-Ancient"],
	},

	kabutoancient: {
		num: -99,
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
		num: -100,
		name: "Kabutops-Ancient",
		baseSpecies: "Kabutops",
		forme: "Ancient",
		types: ["Water", "Fairy"],
		baseStats: {hp: 85, atk: 115, def: 95, spa: 80, spd: 75, spe: 85},
		abilities: {0: "Swift Swim", 1:"Battle Armor", H: "Poison Heal"},
		weightkg: 40.5,
		prevo: "Kabuto-Ancient",
	},

	omanyte: {
		inherit: true,
		otherFormes: ["Omanyte-Ancient"],
		formeOrder: ["Omanyte", "Omanyte-Ancient"],
	},

	omanyteancient: {
		num: -101,
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
		num: -102,
		name: "Omastar-Ancient",
		baseSpecies: "Omastar",
		forme: "Ancient",
		types: ["Water", "Poison"],
		baseStats: {hp: 65, atk: 105, def: 105, spa: 55, spd: 85, spe: 80},
		abilities: {0: "Swift Swim", 1: "Shell Armor", H: "Bloodsuck"},
		weightkg: 35,
		prevo: "Omanyte-Ancient",
	},

	aerodactyl: {
		inherit: true,
		otherFormes: ["Aerodactyl-Ancient"],
		formeOrder: ["Aerodactyl", "Aerodactyl-Ancient"],
	},

	aerodactylancient: {
		num: -103,
		name: "Aerodactyl-Ancient",
		baseSpecies: "Aerodactyl",
		forme: "Ancient",
		types: ["Rock", "Flying"],
		baseStats: {hp: 80, atk: 95, def: 70, spa: 60, spd: 80, spe: 130},
		abilities: {0: "Sheer Force", 1: "Pressure", H: "Rough Skin"},
		weightkg: 59,
	},

	anorith: {
		inherit: true,
		otherFormes: ["Anorith-Ancient"],
		formeOrder: ["Anorith", "Anorith-Ancient"],
	},

	anorithancient: {
		num: -104,
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
		prevo: "Anorith-Ancient",
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
		baseStats: {hp: 95, atk: 100, def: 100, spa: 80, spd: 90, spe: 60},
		abilities: {0: "Regenerator", H: "Water Absorb"},
		weightkg: 60,
		prevo: "Lileep-Ancient",
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
		otherFormes: ["Relicanth-Scorched"],
		formeOrder: ["Relicant", "Relicanth-Scorched"],
	},

	relicanthscorched: {
		num: -109,
		name: "Relicanth-Scorched",
		baseSpecies: "Relicanth",
		forme: "Scorched",
		types: ["Fire", "Rock"],
		baseStats: {hp: 85, atk: 40, def: 80, spa: 110, spd: 70, spe: 100},
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
		evos: ["Piloswine-Ancient"],
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
		prevo: "Swinub-Ancient",
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
		prevo: "Piloswine-Ancient",
	},

	dodrumb: {
		num: -113,
		name: "Dodrumb",
		types: ["Normal", "Psychic"],
		baseStats: {hp: 94, atk: 74, def: 104, spa: 94, spd: 64, spe: 64},
		abilities: {0: "Unaware", 1: "Own Tempo", H: "Simple"},
		weightkg: 19,
	},

	blossobite: {
		num: -114,
		name: "Blossobite",
		types: ["Grass", "Electric"],
		baseStats: {hp: 81, atk: 125, def: 100, spa: 70, spd: 70, spe: 81},
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
		baseStats: {hp: 70, atk: 90, def: 110, spa: 65, spd: 85, spe: 80},
		abilities: {0: "Corrosive Pincers", 1: "Cursed Body", H: "Swift Swim"},
		weightkg: 0.2,
		prevo: "Ghoulipinch",
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
		baseStats: {hp: 80, atk: 75, def: 101, spa: 111, spd: 116, spe: 20},
		abilities: {0: "Grass Pelt"},
		weightkg: 149.5,
		prevo: "Shieldon-Overgrown",
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
		prevo: "Cranidos-Cretaceous",
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
		prevo: "Archen-Ancient",
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
		evos: ["Carracosta-Leatherback"],
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
		baseStats: {hp: 74, atk: 108, def: 133, spa: 83, spd: 80, spe: 32},
		abilities: {0: "Dry Skin", 1: "Sturdy", H: "Sand Rush"},
		weightkg: 81,
		prevo: "Tirtouga-Leatherback",
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
		prevo: "Tyrunt-Apex",
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
		prevo: "Amaura-Regnant",
	},

	shellos: {
		inherit: true,
		otherFormes: ["Shellos-Entity", "Shellos-Entity-East"],
		formeOrder: ["Shellos", "Shellos-East", "Shellos-Entity"],
	},
	

	shellosentity: {
		num: 422,
		name: "Shellos-Entity",
		baseSpecies: "Shellos",
		baseForme: "Entity",
		evos: ["Gastrodon-Entity", "Gastrodon-Entity-East"],
		types: ["Poison"],
		baseStats: {hp: 70, atk: 50, def: 60, spa: 50, spd: 60, spe: 40},
		abilities: {0: "Gooey", H: "Poison Point"},
		weightkg: 6.3,
	},

	
	gastrodon: {
		inherit: true,
		otherFormes: ["Gastrodon-Entity", "Gastrodon-Entity-East"],
		formeOrder: ["Gastrodon", "Gastrodon-East", "Gastrodon-Entity", "Gastrodon-Entity-East"],
	},
	

	gastrodonentity: {
		num: 423,
		name: "Gastrodon-Entity",
		baseSpecies: "Gastrodon",
		baseForme: "Entity",
		types: ["Poison", "Dragon"],
		baseStats: {hp: 120, atk: 55, def: 90, spa: 110, spd: 50, spe: 50},
		abilities: {0: "Gooey", H: "Neuroforce"},
		weightkg: 29.9,
		prevo: "Shellos-Entity",
	},

	gastrodonentityeast: {
		num: 423,
		name: "Gastrodon-Entity-East",
		baseSpecies: "Gastrodon",
		forme: "Entity-East",
		types: ["Poison", "Psychic"],
		baseStats: {hp: 100, atk: 55, def: 90, spa: 100, spd: 80, spe: 50},
		abilities: {0: "Gooey", H: "Psychic Surge"},
		weightkg: 29.9,
		prevo: "Shellos-Entity",
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
		evos: ["Yanmega-Ancient"],
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
		baseStats: {hp: 85, atk: 110, def: 70, spa: 90, spd: 70, spe: 90},
		abilities: {0: "Strong Jaw", H: "Chaser"},
		weightkg: 51.5,
		prevo: "Yanma-Ancient",
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
		baseStats: {hp: 100, atk: 105, def: 75, spa: 90, spd: 115, spe: 50},
		abilities: {0: "Mold Breaker", 1: "Grass Pelt", H: "Absorption"},
		weightkg: 128.6,
		prevo: "Tangela-Ancient",
	},

	liluo: {
		num: -135,
		name: "Liluo",
		evos: ["Flaruo"],
		types: ["Fire"],
		baseStats: {hp: 60, atk: 72, def: 40, spa: 67, spd: 57, spe: 55},
		abilities: {0: "Lightning Rod"},
		weightkg: 10,
	},

	flaruo: {
		num: -136,
		name: "Flaruo",
		evos: ["Alohwo"],
		types: ["Fire"],
		baseStats: {hp: 80, atk: 86, def: 65, spa: 76, spd: 69, spe: 75},
		abilities: {0: "Lightning Rod"},
		weightkg: 20,
		prevo: "Liluo",
	},

	alohwo: {
		num: -137,
		name: "Alohwo",
		types: ["Fire"],
		baseStats: {hp: 111, atk: 92, def: 70, spa: 80, spd: 79, spe: 95},
		abilities: {0: "Thunderstruck"}, //temp
		weightkg: 30,
		prevo: "Flaruo",
	},

	wonkway: {
		num: -138,
		name: "Wonkway",
		evos: ["Ilusinogen"],
		types: ["Psychic", "Dark"],
		baseStats: {hp: 73, atk: 59, def: 47, spa: 83, spd: 61, spe: 97},
		abilities: {0: "Beast Boost"},
		weightkg: 7.7,
	},

	illusinogen: {
		num: -139,
		name: "Illusinogen",
		types: ["Psychic", "Dark"],
		baseStats: {hp: 97, atk: 73, def: 67, spa: 101, spd: 89, spe: 113},
		abilities: {0: "Beast Boost"},
		weightkg: 19.7,
		prevo: "Wonkway",
	},

	robusteel: {
		num: -140,
		name: "Robusteel",
		types: ["Steel", "Flying"],
		baseStats: {hp: 75, atk: 67, def: 94, spa: 110, spd: 95, spe: 70},
		abilities: {0: "Mirror Armor", H: "Flare Boost"},
		weightkg: 100,
	},

	velovolt: {
		num: -141,
		name: "Velovolt",
		types: ["Electric", "Fairy"],
		baseStats: {hp: 90, atk: 90, def: 70, spa: 80, spd: 90, spe: 105},
		abilities: {0: "Volt Absorb", H: "Static"},
		weightkg: 190,
	},

	dracosaur: {
		num: -142,
		name: "Dracosaur",
		types: ["Dragon", "Ground"],
		baseStats: {hp: 90, atk: 90, def: 90, spa: 100, spd: 80, spe: 75},
		abilities: {0: "Hustle", H: "Sand Rush"},
		weightkg: 215,
	},

	vishcaca: {
		num: -143,
		name: "Vishcaca",
		types: ["Water"],
		baseStats: {hp: 85, atk: 110, def: 112, spa: 58, spd: 74, spe: 76},
		abilities: {0: "Strong Jaw", 1: "Fanglock", H: "Water Absorb"},
		weightkg: 175,
	},

	gorlifross: {
		num: -144,
		name: "Gorlifross",
		evos: ["Artachoris"],
		types: ["Ice", "Flying"],
		baseStats: {hp: 65, atk: 60, def: 55, spa: 80, spd: 50, spe: 45},
		abilities: {0: "Slush Rush", 1: "Frigid Landing", H: "Snow Warning"},
		weightkg: 43,
	},

	artachoris: {
		num: -145,
		name: "Artachoris",
		types: ["Ice", "Flying"],
		baseStats: {hp: 90, atk: 110, def: 80, spa: 115, spd: 75, spe: 65},
		abilities: {0: "Slush Rush", 1: "Frigid Landing", H: "Snow Warning"},
		weightkg: 150,
		prevo: "Gorlifross",
	},

	dreepy: {
		inherit: true,
		otherFormes: ["Dreepy-Luminous"],
		formeOrder: ["Dreepy", "Dreepy-Luminous"],
	},

	dreepyluminous: {
		num: -146,
		name: "Dreepy-Luminous",
		baseSpecies: "Dreepy",
		forme: "Luminous",
		evos: ["Drakloak-Luminous"],
		types: ["Poison"],
		baseStats: {hp: 89, atk: 60, def: 65, spa: 70, spd: 85, spe: 71},
		abilities: {0: "Clear Body", 1: "Illuminate", H: "Dazzling"},
		weightkg: 1,
	},

	drakloak: {
		inherit: true,
		otherFormes: ["Drakloak-Luminous"],
		formeOrder: ["Drakloak", "Drakloak-Luminous"],
	},

	drakloakluminous: {
		num: -147,
		name: "Drakloak-Luminous",
		baseSpecies: "Drakloak",
		forme: "Luminous",
		evos: ["Dragapult-Luminous"],
		types: ["Poison"],
		baseStats: {hp: 89, atk: 60, def: 65, spa: 70, spd: 85, spe: 71},
		abilities: {0: "Clear Body", 1: "Illuminate", H: "Dazzling"},
		weightkg: 9,
		prevo: "Dreepy-Luminous",
	},

	dragapult: {
		inherit: true,
		otherFormes: ["Dragapult-Luminous"],
		formeOrder: ["Dragapult", "Dragapult-Luminous"],
	},

	dragapultluminous: {
		num: -148,
		name: "Dragapult-Luminous",
		baseSpecies: "Dragapult",
		forme: "Luminous",
		types: ["Poison", "Electric"],
		baseStats: {hp: 109, atk: 90, def: 75, spa: 100, spd: 105, spe: 121},
		abilities: {0: "Clear Body", 1: "Illuminate", H: "Dazzling"},
		weightkg: 46,
		prevo: "Drakloak-Luminous",
	},

	larvitar: {
		inherit: true,
		otherFormes: ["Larvitar-Nature"],
		formeOrder: ["Larvitar", "Larvitar-Nature"],
	},

	larvitarnature: {
		num: -149,
		name: "Larvitar-Nature",
		baseSpecies: "Larvitar",
		forme: "Nature",
		evos: ["Pupitar-Nature"],
		types: ["Grass"],
		baseStats: {hp: 60, atk: 70, def: 45, spa: 35, spd: 45, spe: 45},
		abilities: {0: "Natural Cure", H: "Tough Claws"},
		weightkg: 72,
	},

	pupitar: {
		inherit: true,
		otherFormes: ["Pupitar-Nature"],
		formeOrder: ["Pupitar", "Pupitar-Nature"],
	},

	pupitarnature: {
		num: -150,
		name: "Pupitar-Nature",
		baseSpecies: "Pupitar",
		forme: "Nature",
		evos: ["Tyranitar-Nature"],
		types: ["Grass"],
		baseStats: {hp: 85, atk: 50, def: 90, spa: 60, spd: 85, spe: 45},
		abilities: {0: "Natural Cure", H: "Flower Veil"},
		weightkg: 152,
		prevo: "Larvitar-Nature",
	},

	tyranitar: {
		inherit: true,
		otherFormes: ["Tyranitar-Nature"],
		formeOrder: ["Tyranitar", "Tyranitar-Nature"],
	},

	tyranitarnature: {
		num: -151, //just in case we get prevos in the future
		name: "Tyranitar-Nature",
		baseSpecies: "Tyranitar",
		forme: "Nature",
		types: ["Grass"],
		baseStats: {hp: 110, atk: 100, def: 90, spa: 100, spd: 110, spe: 90},
		abilities: {0: "Natural Cure", H: "Nature Prowess"},
		weightkg: 202,
		prevo: "Pupitar-Nature",
	},

	gible: {
		inherit: true,
		otherFormes: ["Gible-Persistent"],
		formeOrder: ["Gible", "Gible-Persistent"],
	},

	giblepersistent: {
		num: -152,
		name: "Gible-Persistent",
		baseSpecies: "Gible",
		forme: "Persistent",
		evos: ["Gabite-Persistent"],
		types: ["Ground", "Ghost"],
		baseStats: {hp: 55, atk: 53, def: 49, spa: 55, spd: 55, spe: 33},
		abilities: {0: "Persistence", H: "Dragon's Maw"},
		weightkg: 20.5,
	},

	gabite: {
		inherit: true,
		otherFormes: ["Gabite-Persistent"],
		formeOrder: ["Gabite", "Gabite-Persistent"],
	},

	gabitepersistent: {
		num: -153,
		name: "Gabite-Persistent",
		baseSpecies: "Gabite",
		forme: "Persistent",
		evos: ["Garchomp-Persistent"],
		types: ["Ground", "Ghost"],
		baseStats: {hp: 63, atk: 83, def: 59, spa: 75, spd: 75, spe: 53},
		abilities: {0: "Persistence", H: "Dragon's Maw"},
		weightkg: 56,
		prevo: "Gible-Persistent",
	},

	garchomp: {
		inherit: true,
		otherFormes: ["Garchomp-Persistent"],
		formeOrder: ["Garchomp", "Garchomp-Persistent"],
	},

	garchomppersistent: {
		num: -154,
		name: "Garchomp-Persistent",
		baseSpecies: "Garchomp",
		forme: "Persistent",
		types: ["Ground", "Ghost"],
		baseStats: {hp: 95, atk: 113, def: 89, spa: 115, spd: 115, spe: 73},
		abilities: {0: "Persistence", H: "Dragon's Maw"},
		weightkg: 95,
		prevo: "Gabite-Persistent",
	},

	scorcharnia: {
		num: -155,
		name: "Scorcharnia",
		baseForme: "Average",
		types: ["Water", "Fire"],
		baseStats: {hp: 90, atk: 114, def: 85, spa: 70, spd: 80, spe: 76},
		abilities: {0: "Flame Body", H: "Regenerator"},
		weightkg: 40,
		otherFormes: ["Scorcharnia-Short", "Scorcharnia-Long"],
		formeOrder: ["Scorcharnia-Average", "Scorcharnia-Short", "Scorcharnia-Long"],
	},

	scorcharniashort: {
		num: -155,
		name: "Scorcharnia-Short",
		baseSpecies: "Scorcharnia",
		forme: "Short",
		types: ["Water", "Fire"],
		baseStats: {hp: 75, atk: 94, def: 85, spa: 85, spd: 70, spe: 106},
		abilities: {0: "Flame Body", H: "Regenerator"},
		weightkg: 20,
	},

	scorcharnialong: { //longe boye
		num: -155,
		name: "Scorcharnia-Long",
		baseSpecies: "Scorcharnia",
		types: ["Water", "Fire"],
		baseStats: {hp: 105, atk: 134, def: 85, spa: 55, spd: 90, spe: 46},
		abilities: {0: "Flame Body", H: "Regenerator"},
		weightkg: 60,
	},

	listoxina: {
		num: -156,
		name: "Listoxina",
		types: ["Water", "Poison"],
		baseStats: {hp: 120, atk: 60, def: 75, spa: 80, spd: 90, spe: 85},
		abilities: {0: "Sticky Hold", H: "Swift Swim"},
		weightkg: 8,
	},

	spinollina: {
		num: -157,
		name: "Spinollina",
		types: ["Ground", "Electric"],
		baseStats: {hp: 106, atk: 79, def: 75, spa: 90, spd: 82, spe: 60},
		abilities: {0: "Water Absorb", H: "Rough Skin"},
		weightkg: 24,
		otherFormes: ["Spinollina-Mega"],
		formeOrder: ["Spinollina", "Spinollina-Mega"],
	},

	spinollinamega: {
		num: -157,
		name: "Spinollina-Mega",
		baseSpecies: "Spinollina",
		forme: "Mega",
		types: ["Ground", "Electric"],
		baseStats: {hp: 106, atk: 119, def: 75, spa: 90, spd: 82, spe: 120},
		abilities: {0: "Thunder Thighs"},
		weightkg: 35,
		requiredItem: "Spinollite",
	},

	plusle: {
		inherit: true,
		otherFormes: ["Plusle-Primal"],
		formeOrder: ["Pluse", "Plusle-Primal"],
	},

	plusleprimal: {
		num: -158,
		name: "Plusle-Primal",
		baseSpecies: "Plusle",
		forme: "Primal",
		types: ["Electric", "Ghost"],
		baseStats: {hp: 60, atk: 60, def: 70, spa: 105, spd: 105, spe: 105},
		abilities: {0: "Shadow Shield"},
		weightkg: 4.0,
		requiredItem: "Spectral Orb",
	},

	minun: {
		inherit: true,
		otherFormes: ["Minun-Primal"],
		formeOrder: ["Minun", "Minun-Primal"],
	},

	minunprimal: {
		num: -159,
		name: "Minun-Primal",
		baseSpecies: "Minun",
		forme: "Primal",
		types: ["Electric", "Steel"],
		baseStats: {hp: 60, atk: 65, def: 80, spa: 75, spd: 130, spe: 95},
		abilities: {0: "Huge Power"},
		weightkg: 4.2,
		requiredItem: "Blue Orb",
	},

	swalot: {
		inherit: true,
		otherFormes: ["Swalot-Primal"],
		formeOrder: ["Swalot", "Swalot-Primal"],
	},

	swalotprimal: {
		num: -160,
		name: "Swalot-Primal",
		baseSpecies: "Swalot",
		forme: "Primal",
		types: ["Poison", "Fire"],
		baseStats: {hp: 100, atk: 73, def: 83, spa: 113, spd: 83, spe: 115},
		abilities: {0: "Storm Drain"},
		weightkg: 90,
		requiredItem: "Petrol Orb",
	},

	hariyama: {
		inherit: true,
		otherFormes: ["Hariyama-Primal"],
		formeOrder: ["Hariyama", "Hariyama-Primal"],
	},

	hariyamaprimal: {
		num: -161,
		name: "Hariyama-Primal",
		baseSpecies: "Hariyama",
		forme: "Primal",
		types: ["Fighting", "Fairy"],
		baseStats: {hp: 144, atk: 140, def: 80, spa: 40, spd: 100, spe: 70},
		abilities: {0: "Misty Surge"},
		weightkg: 253.8,
		requiredItem: "Crystal Orb",
	},
	
	grumpig: {
		inherit: true,
		otherFormes: ["Grumpig-Primal"],
		formeOrder: ["Grumpig", "Grumpig-Primal"],
	},

	grumpigprimal: {
		num: -162,
		name: "Grumpig-Primal",
		baseSpecies: "Grumpig",
		forme: "Primal",
		types: ["Psychic", "Steel"],
		baseStats: {hp: 80, atk: 60, def: 90, spa: 130, spd: 125, spe: 85},
		abilities: {0: "Magic Surge"},
		weightkg: 71.5,
		requiredItem: "Black Orb",
	},

	flygon: {
		inherit: true,
		otherFormes: ["Flygon-Classical"],
		formeOrder: ["Flygon", "Flygon-Classical"],
	},

	flygonclassical: {
		num: -165, // accounting for future prevos
		name: "Flygon-Classical",
		baseSpecies: "Flygon",
		forme: "Classical",
		types: ["Ground", "Fighting"],
		baseStats: {hp: 80, atk: 90, def: 80, spa: 90, spd: 80, spe: 100},
		abilities: {0: "Levitate", H: "Vibrato"},
		weightkg: 82,
		//prevo: "Vibrava",
	},

	walrein: {
		inherit: true,
		otherFormes: ["Walrein-Ancient"],
		formeOrder: ["Walrein-Ancient"],
	},

	walreinancient: {
		num: -168, // accounting for future prevos
		name: "Walrein-Ancient",
		baseSpecies: "Walrein",
		forme: "Ancient",
		types: ["Ice", "Fighting"],
		baseStats: {hp: 90, atk: 110, def: 65, spa: 90, spd: 95, spe: 80},
		abilities: {0: "Fur Coat", 1: "Ice Body", H: "Oblivious"},
		weightkg: 105.6,
		//prevo: "Sealeo",
	},

	exploud: {
		inherit: true,
		otherFormes: ["Exploud-Ancient"],
		formeOrder: ["Exploud", "Exploud-Ancient"],
	},

	exploudancient: {
		num: -171, // accounting for future evos
		name: "Exploud-Ancient",
		baseSpecies: "Exploud",
		forme: "Ancient",
		types: ["Rock", "Electric"],
		baseStats: {hp: 104, atk: 81, def: 73, spa: 86, spd: 53, spe: 93},
		abilities: {0: "Vital Spirit", H: "Punk Rock"},
		weightkg: 84,
		//prevo: "Loudred",
	},

	anklarmor: {
		num: -172,
		name: "Anklarmor",
		types: ["Steel"],
		baseStats: {hp: 79, atk: 65, def: 102, spa: 90, spd: 111, spe: 46},
		abilities: {0: "Filter", 1: "Justified", H: "Overcoat"},
		weightkg: 398,
	},

	drakabyssal: {
		num: -173,
		name: "Drakabyssal",
		types: ["Water", "Dark"],
		baseStats: {hp: 100, atk: 100, def: 85, spa: 65, spd: 105, spe: 65},
		abilities: {0: "Mold Breaker", H: "Guts"},
		weightkg: 95.2,
	},

	trobsidon: {
		num: -174,
		name: "Trobsidon",
		types: ["Dragon", "Rock"],
		baseStats: {hp: 80, atk: 115, def: 80, spa: 65, spd: 70, spe: 115},
		abilities: {0: "Keen Eye", 1: "Merciless", H: "Technician"},
		weightkg: 56.2,
		otherFormes: ["Trobsidon-Mega"],
		formeOrder: ["Trobsidon", "Trobsidon-Mega"],
	},

	trobsidonmega: {
		num: -174,
		name: "Trobsidon-Mega",
		baseSpecies: "Trobsidon",
		forme: "Mega",
		types: ["Dragon", "Psychic"],
		baseStats: {hp: 80, atk: 115, def: 80, spa: 130, spd: 100, spe: 120},
		abilities: {0: "Solid Rock"},
		weightkg: 33.8,
		requiredItem: "Trobsidonite",
	},

	dhelmise: {
		inherit: true,
		otherFormes: ["Dhelmise-Ancient"],
		formeOrder: ["Dhelmise", "Dhelmise-Ancient"],
	},

	dhelmiseancient: {
		num: -175,
		name: "Dhelmise-Ancient",
		baseSpecies: "Dhelmise",
		forme: "Ancient",
		types: ["Ghost", "Poison"],
		baseStats: {hp: 70, atk: 131, def: 100, spa: 76, spd: 90, spe: 50},
		abilities: {0: "Boneyard"},
		weightkg: 210,
	},

	honedge: {
		inherit: true,
		otherFormes: ["Honedge-Ancient"],
		formeOrder: ["Honedge", "Honedge-Ancient"],
	},

	honedgeancient: {
		num: -176,
		name: "Honedge-Ancient",
		baseSpecies: "Honedge",
		forme: "Ancient",
		evos: ["Doublade-Ancient"],
		types: ["Grass", "Ghost"],
		baseStats: {hp: 50, atk: 80, def: 85, spa: 35, spd: 37, spe: 38},
		abilities: {0: "Long Reach"},
		weightkg: 2,
	},

	doublade: {
		inherit: true,
		otherFormes: ["Doublade-Ancient"],
		formeOrder: ["Doublade", "Doublade-Ancient"],
	},

	doubladeancient: {
		num: -177,
		name: "Doublade-Ancient",
		baseSpecies: "Doublade",
		forme: "Ancient",
		evos: ["Aegislash-Ancinet"],
		types: ["Grass", "Ghost"],
		baseStats: {hp: 69, atk: 100, def: 90, spa: 45, spd: 49, spe: 95},
		abilities: {0: "Long Reach"},
		weightkg: 4.5,
		prevo: "Honedge-Ancient",
	},

	aegislash: {
		inherit: true,
		otherFormes: ["Aegislash-Blade", "Aegislash-Ancient", "Aegislash-Ancient-Hunter"],
		formeOrder: ["Aegislash", "Aegislash-Blade", "Aegislash-Ancient", "Aegislash-Ancient-Hunter"],
	},

	aegislashancient: {
		num: -178,
		name: "Aegislash-Ancient",
		baseSpecies: "Aegislash",
		forme: "Ancient",
		types: ["Grass", "Ghost"],
		baseStats: {hp: 70, atk: 50, def: 110, spa: 50, spd: 110, spe: 110},
		abilities: {0: "Tactics Change"},
		weightkg: 53,
		prevo: "Doublade-Ancient",
	},

	aegislashancienthunter: {
		num: -178,
		name: "Aegislash-Ancient-Hunter",
		baseSpecies: "Aegislash",
		forme: "Ancient-Hunter",
		types: ["Grass", "Ghost"],
		baseStats: {hp: 70, atk: 110, def: 50, spa: 110, spd: 50, spe: 110},
		abilities: {0: "Tactics Change"},
		weightkg: 53,
		requiredAbility: "Tactics Change",
		battleOnly: "Aegislash-Ancient",
	},

	baltoy: {
		inherit: true,
		evos: ["Claydol", "Claydol-Premade"],
	},

	claydol: {
		inherit: true,
		otherFormes: ["Claydol-Premade"],
		formeOrder: ["Claydol", "Claydol-Premade"],
	},

	claydolpremade: {
		num: -179,
		name: "Claydol-Premade",
		baseSpecies: "Claydol",
		forme: "Premade",
		types: ["Rock", "Psychic"],
		baseStats: {hp: 60, atk: 90, def: 70, spa: 120, spd: 65, spe: 95},
		abilities: {0: "Solid Rock", 1: "Trace", H: "Unaware"},
		weightkg: 108,
		prevo: "Baltoy",
	},

	parasect: {
		inherit: true,
		otherFormes: ["Parasect-Ancient"],
		formeOrder: ["Parasect", "Parasect-Ancient"],
	},

	parasectancient: {
		num: -180,
		name: "Parasect-Ancient",
		baseSpecies: "Parasect",
		forme: "Ancient",
		evos: ["Parasinensis"],
		types: ["Bug", "Fighting"],
		baseStats: {hp: 60, atk: 80, def: 95, spa: 60, spd: 80, spe: 30},
		abilities: {0: "Vital Spirit", 1: "Dry Skin", H: "Magic Bounce"},
		weightkg: 29.5,
		//prevo: "Paras", (so it won't inherit Paras's movepool)
	},

	parasinensis: {
		num: -181,
		name: "Parasinensis",
		types: ["Bug", "Fighting"],
		baseStats: {hp: 70, atk: 100, def: 125, spa: 80, spd: 90, spe: 10},
		abilities: {0: "Vital Spirit", 1: "Dry Skin", H: "Magic Bounce"},
		weightkg:  42,
		prevo: "Parasect-Ancient",
	},

	girafarig: {
		inherit: true,
		otherFormes: ["Girafarig-Ancient"],
		formeOrder: ["Girafarig", "Girafarig-Ancient"],
	},

	girafarigancient: {
		num: -182,
		name: "Girafarig-Ancient",
		baseSpecies: "Girafarig",
		forme: "Ancient",
		evos: ["Oligosogilo"],
		types: ["Normal", "Ground"],
		baseStats: {hp: 70, atk: 90, def: 75, spa: 70, spd: 75, spe: 75},
		abilities: {0: "Oblivious", 1: "Early Bird", H: "Sap Sipper"},
		weightkg: 41.5,
	},

	oligosogilo: {
		num: -183,
		name: "Oligosogilo",
		types: ["Normal", "Ground"],
		baseStats: {hp: 100, atk: 120, def: 90, spa: 75, spd: 85, spe: 65},
		abilities: {0: "Oblivious", 1: "Early Bird", H: "Sap Sipper"},
		weightkg: 87,
		prevo: "Girafarig-Ancient",
	},

	poochyena: {
		inherit: true,
		otherFormes: ["Poochyena-Ancient"],
		formeOrder: ["Poochyena", "Poochyena-Ancient"],
	},

	poochyenaancient: {
		num: -184,
		name: "Poochyena-Ancient",
		baseSpecies: "Poochyena",
		forme: "Ancient",
		evos: ["Mightyena-Ancient"],
		types: ["Dark", "Fairy"],
		baseStats: {hp: 35, atk: 55, def: 35, spa: 30, spd: 30, spe: 35},
		abilities: {0: "Run Away", 1: "Quick Feet", H: "Rattled"},
		weightkg: 13.6,
	},

	mightyena: {
		inherit: true,
		otherFormes: ["Mightyena-Ancient"],
		formeOrder: ["Mightyena", "Mightyena-Ancient"],
	},

	mightyenaancient: {
		num: -185,
		name: "Mightyena-Ancient",
		baseSpecies: "Mightyena",
		forme: "Ancient",
		evos: ["Matriaryena"],
		types: ["Dark", "Fairy"],
		baseStats: {hp: 70, atk: 90, def: 70, spa: 60, spd: 60, spe: 70},
		abilities: {0: "Intimidate", 1: "Quick Feet", H: "Pressure"},
		weightkg: 37,
		prevo: "Poochyena-Ancient",
	},

	matriaryena: {
		num: -186,
		name: "Matriaryena",
		types: ["Dark", "Fairy"],
		baseStats: {hp: 85, atk: 110, def: 85, spa: 65, spd: 65, spe: 110},
		abilities: {0: "Intimidate", 1: "Quick Feet", H: "Pressure"},
		weightkg: 53,
		prevo: "Mightyena-Ancient",
	},
	
	teenizino: {
		num: -189,
		name: "Teenizino",
		types: ["Dragon"],
		baseStats: {hp: 35, atk: 50, def: 35, spa: 45, spd: 60, spe: 80},
		abilities: {0: "Run Away", H: "Frisk"},
		weightkg: 44.2,
	
	},
	terrorzino: {
		num: -190,
		name: "Terrorzino",
		types: ["Dragon"],
		baseStats: {hp: 85, atk: 135, def: 80, spa: 75, spd: 110, spe: 60},
		abilities: {0: "Hyper Cutter", H: "Steelworker"},
		weightkg: 274.6,
		prevo: "Teenizino", 
	
	}, 
	sailad: {
		num: -191,
		name: "Sailad", 
		types: ["Fire"], 
		baseStats: {hp: 58, atk: 50, def: 75, spa: 89, spd: 45, spe: 50},
		abilities: {0: "Mummy", H: "Sand Force"},
		weightkg: 23, 
		
	},
	pharaocious: {
		num: -192, 
		name: "Pharaocious", 
		types: ["Fire", "Dark"], 
		baseStats: {hp: 82, atk: 80, def: 111, spa: 106, spd: 70, spe: 78}, 
		abilities: {0: "Mummy", H: "Sand Force"},
		weightkg: 182.6,
		prevo: "Sailad",
		
	}, 
	honkeri: {
		num: -193, 
		name: "Honkeri", 
		types: ["Grass"],
		baseStats: {hp: 55, atk: 50, def: 50, spa: 50, spd: 50, spe: 55}, 
      abilities: {0: "Pastel Veil", H: "Liquid Voice"}, 
		weightkg: 37, 
		
	},
	melophus: {
		num: -194, 
		name: "Melophus", 
		types: ["Grass", "Fairy"],
		baseStats: {hp: 110, atk: 70, def: 90, spa: 90, spd: 70, spe: 95}, 
		abilities: {0: "Pastel Veil", H: "Liquid Voice"}, 
		weightkg: 172,
		prevo: "Honkeri",
		
	},

	noivern: {
		inherit: true,
		otherFormes: ["Noivern-Ancient"],
		formeOrder: ["Noivern", "Noivern-Ancient"],
	},

	noivernancient: {
		num: -196, // accounting for future evos
		name: "Noivern-Ancient",
		baseSpecies: "Noivern",
		forme: "Ancient",
		types: ["Fire", "Flying"],
		baseStats: {hp: 85, atk: 60, def: 97, spa: 90, spd: 80, spe: 123},
		abilities: {0: "Frisk", 1: "Infiltrator", H: "Flame Body"},
		weightkg: 85,
		//prevo: "Noibat",
	},

	diancie: {
		inherit: true,
		otherFormes: ["Diancie-Mega", "Diancie-Cataclysm", "Diancie-Cataclysm-Mega"],
		formeOrder: ["Diancie", "Diancie-Mega", "Diancie-Cataclysm", "Diancie-Cataclysm-Mega"],
	},

	dianciecataclysm: {
		num: -197,
		name: "Diancie-Cataclysm",
		baseSpecies: "Diancie",
		forme: "Cataclysm",
		types: ["Rock", "Poison"],
		gender: "N",
		baseStats: {hp: 50, atk: 130, def: 120, spa: 130, spd: 120, spe: 50},
		abilities: {0: "Flash Fire"},
		weightkg: 8.8,
	},
	dianciecataclysmmega: {
		num: -197,
		name: "Diancie-Cataclysm-Mega",
		baseSpecies: "Diancie-Cataclysm",
		forme: "Mega",
		types: ["Rock", "Ghost"],
		gender: "N",
		baseStats: {hp: 50, atk: 110, def: 160, spa: 110, spd: 160, spe: 110},
		abilities: {0: "Levitate"},
		weightkg: 27.8,
		eggGroups: ["Undiscovered"],
		requiredItem: "Diancite",
	},
	
	steelix: {
		inherit: true,
		otherFormes: ["Steelix-Mega", "Steelix-Crystal", "Steelix-Crystal-Mega"],
		formeOrder: ["Steelix", "Steelix-Mega", "Steelix-Crystal", "Steelix-Crystal-Mega"],
	},

	steelixcrystal: {
		num: -199,
		name: "Steelix-Crystal",
		baseSpecies: "Steelix",
		forme: "Crystal",
		types: ["Ice", "Fairy"],
		baseStats: {hp: 70, atk: 90, def: 190, spa: 50, spd: 80, spe: 30},
		abilities: {0: "Water Absorb", 1: "Sheer Force", H: "Filter"},
		weightkg: 400,
		//prevo: "Onix",
	},
	steelixcrystalmega: {
		num: -199,
		name: "Steelix-Crystal-Mega",
		baseSpecies: "Steelix-Crystal",
		forme: "Mega",
		types: ["Ice", "Water"],
		baseStats: {hp: 70, atk: 135, def: 210, spa: 50, spd: 95, spe: 50},
		abilities: {0: "Polar Ice"},
		weightkg: 740,
		requiredItem: "Steelixite",
	},
};
