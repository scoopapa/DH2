'use strict';

exports.BattlePokedex = {

    torterra: {
        inherit: true,
        types: ["Grass", "Rock"],
    },
    absol: {
        inherit: true,
        types: ["Dark", "Fairy"],
    },
    absolmega: {
        inherit: true,
        types: ["Dark", "Fairy"],
    },
	chansey: {
		inherit: true,
		types: ["Normal"],
      abilities: {0: "Natural Cure", 1: "Housekeeping", H: "Healer"},
	},
    blissey: {
        inherit: true,
        types: ["Normal", "Fairy"],
        abilities: {0: "Natural Cure", 1: "Housekeeping", H: "Healer"},
    },
	 oshawott: {
		inherit: true,
		types: ["Water"],
      abilities: {0: "Torrent", 1: "Knight's Blade", H: "Shell Armor"},
	 },
	 dewott: {
		inherit: true,
		types: ["Water", "Fighting"],
      abilities: {0: "Torrent", 1: "Knight's Blade", H: "Shell Armor"},
	 },
    samurott: {
      inherit: true,
      types: ["Water", "Fighting"],
      abilities: {0: "Torrent", 1: "Knight's Blade", H: "Shell Armor"},
    },
    musharna: {
        inherit: true,
        types: ["Psychic", "Fairy"],
        abilities: {0: "Time Warp", 1: "Synchronize", H: "Telepathy"},
    },
    spritzee: {
        inherit: true,
        types: ["Fairy", "Poison"],
		  abilities: {0: "Healer", 1: "Misty Surge", H: "Aroma Veil"},
    },
    aromatisse: {
        inherit: true,
        types: ["Fairy", "Poison"],
		  abilities: {0: "Healer", 1: "Misty Surge", H: "Aroma Veil"},
    },
    stakataka: {
        inherit: true,
        types: ["Ghost", "Steel"],
		  abilities: {0: "Beast Boost", H: "Bulletproof"},
    },
    staraptor: {
        inherit: true,
        types: ["Fighting", "Flying"],
    },
	misdreavus: {
		inherit: true,
		types: ["Ghost", "Fairy"],
		abilities: {0: "Levitate", H: "Magic Healing"},
	},
	mismagius: {
		inherit: true,
		types: ["Ghost", "Fairy"],
		abilities: {0: "Levitate", H: "Magic Healing"},
	},
	yanmega: {
		inherit: true,
		types: ["Bug", "Dragon"],
	},
	goodra: {
		inherit: true,
		types: ["Dragon", "Poison"],
      abilities: {0: "Sap Sipper", 1: "Thick Fat", H: "Gooey"},
	},
	xurkitree: {
		inherit: true,
		types: ["Electric", "Grass"],
      abilities: {0: "Beast Boost", H: "Electric Surge"},
	},
	servine: {
		inherit: true,
		types: ["Grass", "Dragon"],
	},
	serperior: {
		inherit: true,
		types: ["Grass", "Dragon"],
	},
	parasect: {
		inherit: true,
		types: ["Bug", "Ghost"],
		abilities: {0: "Effect Spore", 1: "Cursed Body", H: "Prankster"},
	},
	mawile: {
		inherit: true,
		types: ["Dark", "Fairy"],
	},
	mawilemega: {
		inherit: true,
		types: ["Dark", "Fairy"],
	},
	vespiquen: {
		inherit: true,
		types: ["Bug", "Poison"],
		abilities: {0: "Unnerve", 1: "Poison Point", H: "Intimidate"},
	},
	rotomfan: {
		inherit: true,
		types: ["Electric", "Steel"],
	},
	granbull: {
		inherit: true,
		types: ["Fairy", "Dark"],
		abilities: {0: "Intimidate", 1: "Strong Jaw", H: "Rattled"},
	},
	celebi: {
		inherit: true,
		types: ["Grass", "Fairy"],
	},
	jirachi: {
		inherit: true,
		types: ["Steel", "Fairy"],
	},
	manaphy: {
		inherit: true,
		types: ["Water", "Fairy"],
	},
	phione: {
		inherit: true,
		types: ["Water", "Fairy"],
	},
	victini: {
		inherit: true,
		types: ["Fire", "Fairy"],
	},
	lycanroc: {
		inherit: true,
		types: ["Rock", "Normal"],
		abilities: {0: "Rock Head", 1: "Sand Rush", H: "Adaptability"},
	},
	lycanrocmidnight: {
		inherit: true,
		types: ["Rock", "Dark"],
		abilities: {0: "Keen Eye", 1: "Obstinacy", H: "Adaptability"},
	},
	lycanrocdusk: {
		inherit: true,
		types: ["Rock", "Fire"],
		abilities: {0: "Tough Claws", 1: "Technician", H: "Adaptability"},
	},
	cosmog: {
		inherit: true,
		types: ["Psychic"],
		abilities: {0: "Unaware", H: "Dimension Warp"},
	},
	solgaleo: {
		inherit: true,
		types: ["Steel", "Fire"],
		abilities: {0: "Full Metal Body", H: "Drought"},
	},
	lunala: {
		inherit: true,
		types: ["Ghost", "Fairy"],
		abilities: {0: "Shadow Shield", H: "Shadow Surge"},
	},
	necrozma: {
		inherit: true,
		types: ["Psychic", "Dark"],
		abilities: {0: "Prism Armor", H: "Magic Bounce"},
	},
	necrozmaduskmane: {
		inherit: true,
		types: ["Psychic", "Steel"],
		abilities: {0: "Prism Armor", H: "Full Metal Body"},
	},
	necrozmadawnwings: {
		inherit: true,
		types: ["Dark", "Ghost"],
		abilities: {0: "Prism Armor", H: "Shadow Shield"},
	},
	milotic: {
		inherit: true,
		types: ["Water", "Fairy"],
		abilities: {0: "Multiscale", 1: "Competitive", H: "Soul-Heart"},
	},
	growlithe: {
		inherit: true,
		types: ["Fire", "Normal"],
	},
	arcanine: {
		inherit: true,
		types: ["Fire", "Normal"],
	},
	slaking: {
		inherit: true,
		abilities: {0: "Truant", H: "Klutz"},
	},
	trapinch: {
		inherit: true,
		types: ["Ground", "Bug"],
		abilities: {0: "Hyper Cutter", 1: "Sand Stream", H: "Arena Trap"},
	},
	vibrava: {
		inherit: true,
		types: ["Ground", "Bug"],
		abilities: {0: "Levitate", 1: "Sand Stream", H: "Tinted Lens"},
	},
	flygon: {
		inherit: true,
		types: ["Ground", "Bug"],
		abilities: {0: "Levitate", 1: "Sand Stream", H: "Tinted Lens"},
	},
	remoraid: {
		inherit: true,
		types: ["Water"],
		abilities: {0: "Hustle", 1: "Sniper", H: "Mega Launcher"},
	},
	octillery: {
		inherit: true,
		types: ["Water", "Fire"],
		abilities: {0: "Protean", 1: "Regenerator", H: "Mega Launcher"},
	},
	//deerling: null,
    deerlingwinter: {
    	num: 585,
		species: "Deerling-Winter",
		baseSpecies: "Deerling",
		forme: "Winter",
		formeLetter: 'W',
		baseStats: {hp: 60, atk: 60, def: 50, spa: 40, spd: 50, spe: 75},
		heightm: 0.6,
		weightkg: 19.5,
		color: "Pink",
		evos: ["sawsbuck"],
		eggGroups: ["Field"],
        types: ["Grass", "Ice"],
        abilities: {0: "Slush Rush", 1: "Sap Sipper", H: "Snow Warning"},
    },
    deerlingsummer: {
    	num: 585,
		species: "Deerling-Summer",
		baseSpecies: "Deerling",
		forme: "Summer",
		formeLetter: 'S',
        types: ["Grass", "Fire"],
		baseStats: {hp: 60, atk: 60, def: 50, spa: 40, spd: 50, spe: 75},
        abilities: {0: "Chrolophyll", 1: "Sap Sipper", H: "Drought"},
		heightm: 0.6,
		weightkg: 19.5,
		color: "Pink",
		evos: ["sawsbuck"],
		eggGroups: ["Field"],
    },
    deerling: {
    	num: 585,
		species: "Deerling",
		baseForme: "Spring",
		baseStats: {hp: 60, atk: 60, def: 50, spa: 40, spd: 50, spe: 75},
		heightm: 0.6,
		weightkg: 19.5,
		color: "Pink",
		evos: ["sawsbuck"],
		eggGroups: ["Field"],
        types: ["Grass", "Fairy"],
        abilities: {0: "Surge Surfer", 1: "Sap Sipper", H: "Misty Surge"},
		otherForms: ["deerlingsummer", "deerlingautumn", "deerlingwinter"],
    },
    deerlingautumn: {
    	num: 585,
		species: "Deerling-Autumn",
		baseSpecies: "Deerling",
		forme: "Autumn",
		formeLetter: 'A',
		baseStats: {hp: 60, atk: 60, def: 50, spa: 40, spd: 50, spe: 75},
		heightm: 0.6,
		weightkg: 19.5,
		color: "Pink",
		evos: ["sawsbuck"],
		eggGroups: ["Field"],
        types: ["Grass", "Ghost"],
        abilities: {0: "Chrolophyll", 1: "Sap Sipper", H: "Shadow Surge"},
    },
    sawsbuckwinter: {
		num: 586,
		species: "Sawsbuck-Winter",
		baseSpecies: "Sawsbuck",
		forme: "Winter",
		formeLetter: 'W',
		baseStats: {hp: 80, atk: 100, def: 70, spa: 60, spd: 70, spe: 95},
		heightm: 1.9,
		weightkg: 92.5,
		color: "Brown",
		prevo: "deerling",
		evoLevel: 34,
		eggGroups: ["Field"],
		abilities: {0: "Slush Rush", 1: "Sap Sipper", H: "Snow Warning"},
		types: ["Grass", "Ice"],
    },
    sawsbucksummer: {
		num: 586,
		species: "Sawsbuck-Summer",
		baseSpecies: "Sawsbuck",
		forme: "Summer",
		formeLetter: 'S',
		baseStats: {hp: 80, atk: 100, def: 70, spa: 60, spd: 70, spe: 95},
		heightm: 1.9,
		weightkg: 92.5,
		color: "Brown",
		prevo: "deerling",
		evoLevel: 34,
		eggGroups: ["Field"],
		otherForms: ["sawsbucksummer", "sawsbuckautumn", "sawsbuckwinter"],
        types: ["Grass", "Fire"],
        abilities: {0: "Chrolophyll", 1: "Sap Sipper", H: "Drought"},
    },
    sawsbuck: {
		num: 586,
		species: "Sawsbuck",
		baseForme: "Spring",
		baseStats: {hp: 80, atk: 100, def: 70, spa: 60, spd: 70, spe: 95},
		heightm: 1.9,
		weightkg: 92.5,
		color: "Brown",
		prevo: "deerling",
		evoLevel: 34,
		eggGroups: ["Field"],
        types: ["Grass", "Fairy"],
        abilities: {0: "Surge Surfer", 1: "Sap Sipper", H: "Misty Surge"},
		otherForms: ["sawsbucksummer", "sawsbuckautumn", "sawsbuckwinter"],
    },
    sawsbuckautumn: {
		num: 586,
		species: "Sawsbuck-Autumn",
		baseSpecies: "Sawsbuck",
		forme: "Autumn",
		formeLetter: 'A',
		baseStats: {hp: 80, atk: 100, def: 70, spa: 60, spd: 70, spe: 95},
		heightm: 1.9,
		weightkg: 92.5,
		color: "Brown",
		prevo: "deerling",
		evoLevel: 34,
		eggGroups: ["Field"],
        types: ["Grass", "Ghost"],
        abilities: {0: "Chrolophyll", 1: "Sap Sipper", H: "Shadow Surge"},
    },
	oricorio: {
      inherit: true,
		types: ["Fire", "Flying"],
		abilities: {0: "Dancer", H: "Serene Grace"},
	},
	oricoriopompom: {
      inherit: true,
		types: ["Electric", "Flying"],
		abilities: {0: "Dancer", H: "Serene Grace"},
	},
	oricoriopau: {
      inherit: true,
		types: ["Psychic", "Flying"],
		abilities: {0: "Dancer", H: "Serene Grace"},
	},
	oricoriosensu: {
      inherit: true,
		types: ["Ghost", "Flying"],
		abilities: {0: "Dancer", H: "Serene Grace"},
	},
	audinomega: {
      inherit: true,
		types: ["Normal", "Fairy"],
		abilities: {0: "Magic Healing"},
	},
	fennekin: {
      inherit: true,
		types: ["Fire"],
      abilities: {0: "Blaze", H: "Magic Healing"},
	},
	braixen: {
      inherit: true,
		types: ["Fire"],
      abilities: {0: "Blaze", H: "Magic Healing"},
	},
	delphox: {
      inherit: true,
		types: ["Fire", "Psychic"],
      abilities: {0: "Blaze", H: "Magic Healing"},
	},
	hoopa: {
      inherit: true,
		types: ["Psychic", "Ghost"],
      abilities: {0: "Magician", 1: "Dimension Warp", H: "Magic Healing"},
	},
	cresselia: {
		inherit: true,
		types: ["Psychic", "Fairy"],
		abilities: {0: "Levitate", H: "Magic Healing"},
	},
	chingling: {
		inherit: true,
		types: ["Psychic"],
		abilities: {0: "Levitate", H: "Magic Healing"},
	},
	chimecho: {
		inherit: true,
		types: ["Psychic"],
		abilities: {0: "Levitate", H: "Magic Healing"},
	},
	sigilyph: {
		inherit: true,
		types: ["Psychic", "Flying"],
      abilities: {0: "Magic Healing", 1: "Magic Guard", H: "Tinted Lens"},
	},
	haunter: {
		inherit: true,
		types: ["Ghost", "Poison"],
		abilities: {0: "Levitate", H: "Etheral Fist"},
	},
	gengar: {
		inherit: true,
		types: ["Ghost", "Poison"],
		abilities: {0: "Cursed Body", H: "Etheral Fist"},
	},
	solosis: {
		inherit: true,
		types: ["Psychic"],
      abilities: {0: "Etheral Fist", 1: "Magic Guard", H: "Regenerator"},
	},
	duosion: {
		inherit: true,
		types: ["Psychic"],
      abilities: {0: "Etheral Fist", 1: "Magic Guard", H: "Regenerator"},
	},
	reuniclus: {
		inherit: true,
		types: ["Psychic"],
      abilities: {0: "Etheral Fist", 1: "Magic Guard", H: "Regenerator"},
	},
	alakazam: {
		inherit: true,
		types: ["Psychic"],
      abilities: {0: "Synchronize", 1: "Etheral Fist", H: "Magic Guard"},
	},
	alakazammega: {
		inherit: true,
		types: ["Psychic"],
      abilities: {0: "Etheral Fist"},
	},
	dusknoir: {
		inherit: true,
		types: ["Ghost"],
      abilities: {0: "Pressure", 1: "Etheral Fist", H: "Frisk"},
	},
	shaymin: {
		inherit: true,
		types: ["Grass"],
      abilities: {0: "Natural Cure", H: "Disperal"},
	},
	sunkern: {
		inherit: true,
		types: ["Grass"],
      abilities: {0: "Chlorophyll", 1: "Solar Power", H: "Disperal"},
	},
	sunflora: {
		inherit: true,
		types: ["Grass"],
      abilities: {0: "Drought", 1: "Solar Power", H: "Disperal"},
	},
	bulbasaur: {
		inherit: true,
		types: ["Grass", "Poison"],
      abilities: {0: "Overgrow", H: "Disperal"},
	},
	ivysaur: {
		inherit: true,
		types: ["Grass", "Poison"],
      abilities: {0: "Overgrow", H: "Disperal"},
	},
	venusaur: {
		inherit: true,
		types: ["Grass", "Poison"],
      abilities: {0: "Overgrow", H: "Disperal"},
	},
	trevenant: {
		inherit: true,
		types: ["Ghost", "Grass"],
      abilities: {0: "Natural Cure", 1: "Disperal", H: "Harvest"},
	},
	cinccino: {
		inherit: true,
		types: ["Normal"],
      abilities: {0: "Cute Charm", 1: "Housekeeping", H: "Skill Link"},
	},
	jirachi: {
		inherit: true,
		types: ["Steel", "Fairy"],
      abilities: {0: "Serene Grace", H: "Housekeeping"},
	},
	delcatty: {
		inherit: true,
		types: ["Normal"],
      abilities: {0: "Cute Charm", 1: "Normalize", H: "Housekeeping"},
	},
	igglybuff: {
		inherit: true,
		types: ["Normal", "Fairy"],
      abilities: {0: "Misty Surge", 1: "Competitive", H: "Friend Guard"},
	},
	jigglypuff: {
		inherit: true,
		types: ["Normal", "Fairy"],
      abilities: {0: "Misty Surge", 1: "Competitive", H: "Friend Guard"},
	},
	wigglytuff: {
		inherit: true,
		types: ["Normal", "Fairy"],
      abilities: {0: "Misty Surge", 1: "Competitive", H: "Housekeeping"},
	},
	inkay: {
		inherit: true,
		types: ["Dark", "Psychic"],
      abilities: {0: "Dimension Warp", 1: "Contrary", H: "Infiltrator"},
	},
	malamar: {
		inherit: true,
		types: ["Dark", "Psychic"],
      abilities: {0: "Dimension Warp", 1: "Contrary", H: "Mind Trick"},
	},
	litwick: {
		inherit: true,
		types: ["Ghost", "Fire"],
      abilities: {0: "Flash Fire", 1: "Mind Trick", H: "Infiltrator"},
	},
	lampent: {
		inherit: true,
		types: ["Ghost", "Fire"],
      abilities: {0: "Flash Fire", 1: "Mind Trick", H: "Infiltrator"},
	},
	chandelure: {
		inherit: true,
		types: ["Ghost", "Fire"],
      abilities: {0: "Flash Fire", 1: "Mind Trick", H: "Infiltrator"},
	},
	drowzee: {
		inherit: true,
		types: ["Psychic"],
      abilities: {0: "Insomnia", 1: "Psychic Surge", H: "Inner Focus"},
	},
	hypno: {
		inherit: true,
		types: ["Psychic"],
      abilities: {0: "Insomnia", 1: "Psychic Surge", H: "Mind Trick"},
	},
	gallade: {
		inherit: true,
		types: ["Psychic", "Fighting"],
      abilities: {0: "Knight's Blade", 1: "Justified", H: "Guard Up"},
	},
	gallademega: {
		inherit: true,
		types: ["Psychic", "Fighting"],
      abilities: {0: "Knight's Blade"},
	},
	honedge: {
		inherit: true,
		types: ["Steel", "Ghost"],
      abilities: {0: "No Guard", 1: "Knight's Blade", H: "Guard Up"},
	},
	doublade: {
		inherit: true,
		types: ["Steel", "Ghost"],
      abilities: {0: "No Guard", 1: "Knight's Blade", H: "Guard Up"},
	},
	escavalier: {
		inherit: true,
		types: ["Bug", "Steel"],
      abilities: {0: "Guard Up", 1: "Shell Armor", H: "Knight's Blade"},
	},
	pawniard: {
		inherit: true,
		types: ["Dark", "Steel"],
      abilities: {0: "Defiant", 1: "Knight's Blade", H: "Pressure"},
	},
	bisharp: {
		inherit: true,
		types: ["Dark", "Steel"],
      abilities: {0: "Defiant", 1: "Knight's Blade", H: "Pressure"},
	},
	tornadus: {
		inherit: true,
		types: ["Flying"],
      abilities: {0: "Prankster", 1: "Forecast", H: "Defiant"},
	},
	maractus: {
		inherit: true,
		types: ["Grass"],
      abilities: {0: "Water Absorb", 1: "Chlorophyll", H: "Forecast"},
	},
	
	celebi: {
		inherit: true,
		types: ["Fairy", "Grass"],
      abilities: {0: "Natural Cure", H: "Time Warp"},
	},
	dialga: {
		inherit: true,
		types: ["Steel", "Dragon"],
      abilities: {0: "Pressure", 1: "Infuriation", H: "Time Warp"},
	},
	baltoy: {
		inherit: true,
		types: ["Ground", "Psychic"],
      abilities: {0: "Levitate", H: "Time Warp"},
	},
	claydol: {
		inherit: true,
		types: ["Ground", "Psychic"],
      abilities: {0: "Levitate", H: "Time Warp"},
	},
	elgyem: {
		inherit: true,
		types: ["Psychic"],
      abilities: {0: "Time Warp", 1: "Synchronize", H: "Analytic"},
	},
	beheeyem: {
		inherit: true,
		types: ["Psychic"],
      abilities: {0: "Time Warp", 1: "Synchronize", H: "Analytic"},
	},
	natu: {
		inherit: true,
		types: ["Psychic"],
      abilities: {0: "Synchronize", 1: "Time Warp", H: "Magic Bounce"},
	},
	xatu: {
		inherit: true,
		types: ["Psychic"],
      abilities: {0: "Synchronize", 1: "Time Warp", H: "Magic Bounce"},
	},
	munna: {
		inherit: true,
		types: ["Psychic"],
      abilities: {0: "Time Warp", 1: "Synchronize", H: "Telepathy"},
	},
	gulpin: {
		inherit: true,
		types: ["Poison"],
      abilities: {0: "Liquid Ooze", 1: "Corrosion", H: "Gluttony"},
	},
	swalot: {
		inherit: true,
		types: ["Poison"],
      abilities: {0: "Liquid Ooze", 1: "Corrosion", H: "Gluttony"},
	},
	grimer: {
		inherit: true,
		types: ["Poison"],
      abilities: {0: "Stench", 1: "Corrosion", H: "Poison Touch"},
	},
	muk: {
		inherit: true,
		types: ["Poison"],
      abilities: {0: "Stench", 1: "Corrosion", H: "Poison Touch"},
	},
	skrelp: {
		inherit: true,
		types: ["Poison", "Water"],
      abilities: {0: "Corrosion", 1: "Poison Touch", H: "Adaptability"},
	},
	dragalge: {
		inherit: true,
		types: ["Poison", "Dragon"],
      abilities: {0: "Corrosion", 1: "Poison Touch", H: "Adaptability"},
	},
	drifblim: {
		inherit: true,
		types: ["Ghost", "Flying"],
      abilities: {0: "Aftermath", 1: "Air Stream", H: "Flare Boost"},
	},
	altaria: {
		inherit: true,
		types: ["Dragon", "Flying"],
      abilities: {0: "Natural Cure", 1: "Air Stream", H: "Cloud Nine"},
	},
	swanna: {
		inherit: true,
		types: ["Water", "Flying"],
      abilities: {0: "Air Stream", 1: "Big Pecks", H: "Hydration"},
	},
	unfezant: {
		inherit: true,
		types: ["Normal", "Flying"],
      abilities: {0: "Big Pecks", 1: "Air Stream", H: "Rivalry"},
	},
	shelmet: {
		inherit: true,
		types: ["Bug"],
      abilities: {0: "Guard Up", 1: "Shell Armor", H: "Overcoat"},
	},
	chespin: {
		inherit: true,
		types: ["Grass"],
      abilities: {0: "Overgrow", H: "Guard Up"},
	},
	quilladin: {
		inherit: true,
		types: ["Grass"],
      abilities: {0: "Overgrow", H: "Guard Up"},
	},
	chesnaught: {
		inherit: true,
		types: ["Grass", "Fighting"],
      abilities: {0: "Overgrow", H: "Guard Up"},
	},
	metapod: {
		inherit: true,
		types: ["Bug"],
      abilities: {0: "Shed Skin", H: "Guard Up"},
	},
	kakuna: {
		inherit: true,
		types: ["Bug", "Poison"],
      abilities: {0: "Shed Skin", H: "Guard Up"},
	},
	silcoon: {
		inherit: true,
		types: ["Bug"],
      abilities: {0: "Shed Skin", H: "Guard Up"},
	},
	cascoon: {
		inherit: true,
		types: ["Bug"],
      abilities: {0: "Shed Skin", H: "Guard Up"},
	},
	sewaddle: {
		inherit: true,
		types: ["Bug", "Grass"],
      abilities: {0: "Grassy Surge", 1: "Chlorophyll", H: "Overcoat"},
	},
	swadloon: {
		inherit: true,
		types: ["Bug", "Grass"],
      abilities: {0: "Grassy Surge", 1: "Chlorophyll", H: "Guard Up"},
	},
	leavanny: {
		inherit: true,
		types: ["Bug", "Grass"],
      abilities: {0: "Grassy Surge", 1: "Chlorophyll", H: "Overcoat"},
	},
	spewpa: {
		inherit: true,
		types: ["Bug"],
      abilities: {0: "Shed Skin", 1: "Friend Guard", H: "Guard Up"},
	},
	hitmonchan: {
		inherit: true,
		types: ["Fighting"],
      abilities: {0: "Guard Up", 1: "Iron Fist", H: "Inner Focus"},
	},
	burmy: {
		inherit: true,
		types: ["Bug"],
      abilities: {0: "Shed Skin", 1: "Guard Up", H: "Overcoat"},
	},
	burmysandy: {
		inherit: true,
		types: ["Bug"],
      abilities: {0: "Shed Skin", 1: "Guard Up", H: "Overcoat"},
	},
	burmytrash: {
		inherit: true,
		types: ["Bug"],
      abilities: {0: "Shed Skin", 1: "Guard Up", H: "Overcoat"},
	},
	wormadam: {
		inherit: true,
		types: ["Bug", "Grass"],
      abilities: {0: "Anticipation", 1: "Guard Up", H: "Overcoat"},
	},
	wormadamsandy: {
		inherit: true,
		types: ["Bug", "Ground"],
      abilities: {0: "Anticipation", 1: "Guard Up", H: "Overcoat"},
	},
	wormadamtrash: {
		inherit: true,
		types: ["Bug", "Steel"],
      abilities: {0: "Anticipation", 1: "Guard Up", H: "Overcoat"},
	},
	mothim: {
		inherit: true,
		types: ["Bug", "Flying"],
      abilities: {0: "Swarm", 1: "Guard Up", H: "Tinted Lens"},
	},
	gardevoir: {
		inherit: true,
		types: ["Psychic", "Fairy"],
      abilities: {0: "Synchronize", 1: "Perseverance", H: "Guard Up"},
	},
	golisopod: {
		inherit: true,
		types: ["Bug", "Water"],
      abilities: {0: "Emergency Exit", H: "Guard Up"},
	},
	jangmoo: {
		inherit: true,
		types: ["Dragon"],
      abilities: {0: "Bulletproof", 1: "Soundproof", H: "Scrappy"},
	},
	hakamoo: {
		inherit: true,
		types: ["Dragon", "Fighting"],
      abilities: {0: "Bulletproof", 1: "Soundproof", H: "Scrappy"},
	},
	kommoo: {
		inherit: true,
		types: ["Dragon", "Fighting"],
      abilities: {0: "Bulletproof", 1: "Soundproof", H: "Scrappy"},
	},
	sandile: {
		inherit: true,
		types: ["Ground", "Dark"],
      abilities: {0: "Intimidate", 1: "Moxie", H: "Scrappy"},
	},
	krokorok: {
		inherit: true,
		types: ["Ground", "Dark"],
      abilities: {0: "Intimidate", 1: "Moxie", H: "Scrappy"},
	},
	krookodile: {
		inherit: true,
		types: ["Ground", "Dark"],
      abilities: {0: "Intimidate", 1: "Moxie", H: "Scrappy"},
	},
	cubone: {
		inherit: true,
		types: ["Ground"],
      abilities: {0: "Rock Head", 1: "Scrappy", H: "Battle Armor"},
	},
	marowak: {
		inherit: true,
		types: ["Ground"],
      abilities: {0: "Rock Head", 1: "Scrappy", H: "Battle Armor"},
	},
	doduo: {
		inherit: true,
		types: ["Normal", "Flying"],
      abilities: {0: "Run Away", 1: "Scrappy", H: "Sole Caliber"},
	},
	dodrio: {
		inherit: true,
		types: ["Normal", "Flying"],
      abilities: {0: "Run Away", 1: "Scrappy", H: "Sole Caliber"},
	},
	pichu: {
		inherit: true,
		types: ["Electric"],
      abilities: {0: "Static", 1: "Scrappy", H: "Lightning Rod"},
	},
	pikachu: {
		inherit: true,
		types: ["Electric"],
      abilities: {0: "Static", 1: "Scrappy", H: "Lightning Rod"},
	},
	raichu: {
		inherit: true,
		types: ["Electric"],
      abilities: {0: "Static", 1: "Scrappy", H: "Lightning Rod"},
	},
	deino: {
		inherit: true,
		types: ["Dark", "Dragon"],
      abilities: {0: "Hustle", H: "Scrappy"},
	},
	zweilous: {
		inherit: true,
		types: ["Dark", "Dragon"],
      abilities: {0: "Hustle", H: "Scrappy"},
	},
	hydreigon: {
		inherit: true,
		types: ["Dark", "Dragon"],
      abilities: {0: "Levitate", H: "Scrappy"},
	},
	palkia: {
		inherit: true,
		types: ["Water", "Dragon"],
      abilities: {0: "Pressure", H: "Infuriation"},
	},
	garchompmega: {
		inherit: true,
		types: ["Dragon", "Ground"],
      abilities: {0: "Sand Veil"},
	},
	tyrunt: {
		inherit: true,
		types: ["Rock", "Dragon"],
      abilities: {0: "Strong Jaw", H: "Anger Point"},
	},
	klink: {
		inherit: true,
		types: ["Steel"],
      abilities: {0: "Plus", 1: "Minus", H: "Technician"},
	},
	klang: {
		inherit: true,
		types: ["Steel"],
      abilities: {0: "Plus", 1: "Minus", H: "Technician"},
	},
	klinklang: {
		inherit: true,
		types: ["Steel"],
      abilities: {0: "Plus", 1: "Minus", H: "Technician"},
	},
	buizel: {
		inherit: true,
		types: ["Water"],
      abilities: {0: "Swift Swim", 1: "Technician", H: "Water Veil"},
	},
	floatzel: {
		inherit: true,
		types: ["Water"],
      abilities: {0: "Swift Swim", 1: "Technician", H: "Water Veil"},
	},
	beldum: {
		inherit: true,
		types: ["Steel", "Psychic"],
      abilities: {0: "Clear Body", 1: "Technician", H: "Light Metal"},
	},
	metang: {
		inherit: true,
		types: ["Steel", "Psychic"],
      abilities: {0: "Clear Body", 1: "Technician", H: "Light Metal"},
	},
	metagross: {
		inherit: true,
		types: ["Steel", "Psychic"],
      abilities: {0: "Clear Body", 1: "Technician", H: "Light Metal"},
	},
	meloetta: {
		inherit: true,
		types: ["Normal", "Psychic"],
      abilities: {0: "Serene Grace", H: "Technician"},
	},
	meloettapirouette: {
		inherit: true,
		types: ["Normal", "Fighting"],
      abilities: {0: "Serene Grace", H: "Technician"},
	},
	tauros: {
		inherit: true,
		types: ["Normal"],
      abilities: {0: "Intimidate", 1: "Obstinacy", H: "Technician"},
	},
	braviary: {
		inherit: true,
		types: ["Normal", "Flying"],
      abilities: {0: "Obstinacy", 1: "Sheer Force", H: "Defiant"},
	},
	primeape: {
		inherit: true,
		types: ["Fighting"],
      abilities: {0: "Obstinacy", 1: "Anger Point", H: "Defiant"},
	},
	linoone: {
		inherit: true,
		types: ["Normal"],
      abilities: {0: "Pickup", 1: "Obstinacy", H: "Quick Feet"},
	},
	mudbray: {
		inherit: true,
		types: ["Ground"],
      abilities: {0: "Own Tempo", 1: "Stamina", H: "Sole Caliber"},
	},
	mudsdale: {
		inherit: true,
		types: ["Ground"],
      abilities: {0: "Obstinacy", 1: "Stamina", H: "Sole Caliber"},
	},
	vigoroth: {
		inherit: true,
		types: ["Normal"],
      abilities: {0: "Vital Spirit", H: "Obstinacy"},
	},
	haxorus: {
		inherit: true,
		types: ["Dragon"],
      abilities: {0: "Rivalry", 1: "Obstinacy", H: "Unnerve"},
	},
	lucario: {
		inherit: true,
		types: ["Fighting", "Steel"],
      abilities: {0: "Obstinacy", 1: "Inner Focus", H: "Justified"},
	},
	darkrai: {
		inherit: true,
		types: ["Dark"],
      abilities: {0: "Bad Dreams", H: "Shadow Surge"},
	},
	spiritomb: {
		inherit: true,
		types: ["Ghost", "Dark"],
      abilities: {0: "Pressure", 1: "Shadow Surge", H: "Infiltrator"},
	},
	houndoommega: {
		inherit: true,
		types: ["Dark", "Fire"],
      abilities: {0: "Shadow Surge"},
	},
	wailmer: {
		inherit: true,
		types: ["Water"],
      abilities: {0: "Thick Fat", 1: "Liquid Voice", H: "Pressure"},
	},
	wailord: {
		inherit: true,
		types: ["Water"],
      abilities: {0: "Thick Fat", 1: "Liquid Voice", H: "Pressure"},
	},
	guzzlord: {
		inherit: true,
		types: ["Dark", "Dragon"],
      abilities: {0: "Beast Boost", H: "Thick Fat"},
	},
	golemalola: {
		inherit: true,
		types: ["Rock", "Electric"],
      abilities: {0: "Mega Launcher", 1: "Sturdy", H: "Galvanize"},
	},
	magmortar: {
		inherit: true,
		types: ["Fire"],
      abilities: {0: "Flame Body", 1: "Mega Launcher", H: "Vital Spirit"},
	},
	kingdra: {
		inherit: true,
		types: ["Water", "Dragon"],
      abilities: {0: "Swift Swim", 1: "Sniper", H: "Mega Launcher"},
	},
	genesect: {
		inherit: true,
		types: ["Bug", "Steel"],
      abilities: {0: "Download", H: "Mega Launcher"},
	},
	volcanion: {
		inherit: true,
		types: ["Fire", "Water"],
      abilities: {0: "Water Absorb", H: "Mega Launcher"},
	},
	lapras: {
		inherit: true,
		types: ["Water", "Ice"],
      abilities: {0: "Water Absorb", 1: "Thick Fat", H: "Liquid Voice"},
	},
	politoed: {
		inherit: true,
		types: ["Water"],
      abilities: {0: "Water Absorb", 1: "Liquid Voice", H: "Drizzle"},
	},
	tympole: {
		inherit: true,
		types: ["Water"],
      abilities: {0: "Liquid Voice", 1: "Hydration", H: "Water Absorb"},
	},
	palpitoad: {
		inherit: true,
		types: ["Water", "Ground"],
      abilities: {0: "Liquid Voice", 1: "Hydration", H: "Water Absorb"},
	},
	seismitoad: {
		inherit: true,
		types: ["Water", "Ground"],
      abilities: {0: "Liquid Voice", 1: "Poison Touch", H: "Water Absorb"},
	},
	vaporeon: {
		inherit: true,
		types: ["Water"],
      abilities: {0: "Water Absorb", 1: "Drizzle", H: "Liquid Voice"},
	},
	jolteon: {
		inherit: true,
		types: ["Electric"],
      abilities: {0: "Volt Absorb", 1: "Electric Surge", H: "Quick Feet"},
	},
	flareon: {
		inherit: true,
		types: ["Fire"],
      abilities: {0: "Flash Fire", 1: "Drought", H: "Guts"},
	},
	espeon: {
		inherit: true,
		types: ["Psychic"],
      abilities: {0: "Synchronize", 1: "Psychic Surge", H: "Magic Bounce"},
	},
	umbreon: {
		inherit: true,
		types: ["Dark"],
      abilities: {0: "Synchronize", 1: "Shadow Surge", H: "Inner Focus"},
	},
	leafeon: {
		inherit: true,
		types: ["Grass"],
      abilities: {0: "Leaf Guard", 1: "Grassy Surge", H: "Chlorophyll"},
	},
	glaceon: {
		inherit: true,
		types: ["Ice"],
      abilities: {0: "Snow Cloak", 1: "Snow Warning", H: "Ice Body"},
	},
	sylveon: {
		inherit: true,
		types: ["Fairy"],
      abilities: {0: "Cute Charm", 1: "Misty Surge", H: "Pixilate"},
	},
	huntail: {
		inherit: true,
		types: ["Water"],
      abilities: {0: "Swift Swim", 1: "Shark Bait", H: "Water Veil"},
	},
	gorebyss: {
		inherit: true,
		types: ["Water"],
      abilities: {0: "Swift Swim", 1: "Liquid Voice", H: "Hydration"},
	},
	slowbromega: {
		inherit: true,
		types: ["Water", "Psychic"],
      abilities: {0: "Drizzle"},
	},
	articuno: {
		inherit: true,
		types: ["Ice", "Flying"],
      abilities: {0: "Pressure", 1: "Snow Warning", H: "Snow Cloak"},
	},
	zapdos: {
		inherit: true,
		types: ["Electric", "Flying"],
      abilities: {0: "Pressure", 1: "Drizzle", H: "Static"},
	},
	moltres: {
		inherit: true,
		types: ["Fire", "Flying"],
      abilities: {0: "Pressure", 1: "Drought", H: "Flame Body"},
	},
	lugia: {
		inherit: true,
		types: ["Water", "Dragon"],
      abilities: {0: "Pressure", 1: "Drizzle", H: "Multiscale"},
	},
	regirock: {
		inherit: true,
		types: ["Rock"],
      abilities: {0: "Clear Body", 1: "Sand Stream", H: "Sturdy"},
	},
	regice: {
		inherit: true,
		types: ["Ice"],
      abilities: {0: "Clear Body", 1: "Snow Warning", H: "Ice Body"},
	},
	registeel: {
		inherit: true,
		types: ["Steel"],
      abilities: {0: "Clear Body", 1: "Bulletproof", H: "Light Metal"},
	},
	magcargo: {
		inherit: true,
		types: ["Fire", "Rock"],
      abilities: {0: "Drought", 1: "Flame Body", H: "Weak Armor"},
	},
	solrock: {
		inherit: true,
		types: ["Rock", "Psychic"],
      abilities: {0: "Levitate", H: "Drought"},
	},
	lunatone: {
		inherit: true,
		types: ["Rock", "Psychic"],
      abilities: {0: "Levitate", H: "Sand Stream"},
	},
	palossand: {
		inherit: true,
		types: ["Ground", "Ghost"],
      abilities: {0: "Water Compaction", 1: "Sand Stream", H: "Sand Veil"},
	},
	larvitar: {
		inherit: true,
		types: ["Rock", "Ground"],
      abilities: {0: "Guts", 1: "Sand Stream", H: "Sand Veil"},
	},
	pupitar: {
		inherit: true,
		types: ["Rock", "Ground"],
      abilities: {0: "Shed Skin", H: "Sand Stream"},
	},
	cryogonal: {
		inherit: true,
		types: ["Ice"],
      abilities: {0: "Levitate", H: "Snow Warning"},
	},
	flabebe: {
		inherit: true,
		types: ["Fairy"],
      abilities: {0: "Flower Veil", 1: "Misty Surge", H: "Symbiosis"},
	},
	floette: {
		inherit: true,
		types: ["Fairy"],
      abilities: {0: "Flower Veil", 1: "Misty Surge", H: "Symbiosis"},
	},
	florges: {
		inherit: true,
		types: ["Fairy"],
      abilities: {0: "Flower Veil", 1: "Misty Surge", H: "Symbiosis"},
	},
	mareep: {
		inherit: true,
		types: ["Electric"],
      abilities: {0: "Static", 1: "Electric Surge", H: "Plus"},
	},
	flaaffy: {
		inherit: true,
		types: ["Electric"],
      abilities: {0: "Static", 1: "Electric Surge", H: "Plus"},
	},
	ampharos: {
		inherit: true,
		types: ["Electric"],
      abilities: {0: "Static", 1: "Electric Surge", H: "Plus"},
	},
	shinx: {
		inherit: true,
		types: ["Electric"],
      abilities: {0: "Electric Surge", 1: "Intimidate", H: "Guts"},
	},
	luxio: {
		inherit: true,
		types: ["Electric"],
      abilities: {0: "Electric Surge", 1: "Intimidate", H: "Guts"},
	},
	luxray: {
		inherit: true,
		types: ["Electric"],
      abilities: {0: "Electric Surge", 1: "Intimidate", H: "Guts"},
	},
	budew: {
		inherit: true,
		types: ["Grass", "Poison"],
      abilities: {0: "Grassy Surge", 1: "Poison Point", H: "Leaf Guard"},
	},
	roselia: {
		inherit: true,
		types: ["Grass", "Poison"],
      abilities: {0: "Grassy Surge", 1: "Poison Point", H: "Leaf Guard"},
	},
	roserade: {
		inherit: true,
		types: ["Grass", "Poison"],
      abilities: {0: "Grassy Surge", 1: "Poison Point", H: "Technician"},
	},
	exeggutor: {
		inherit: true,
		types: ["Grass", "Psychic"],
      abilities: {0: "Chlorophyll", 1: "Grassy Surge", H: "Harvest"},
	},
	exeggutoralola: {
		inherit: true,
		types: ["Grass", "Dragon"],
      abilities: {0: "Frisk", 1: "Bask", H: "Harvest"},
	},
	skiddo: {
		inherit: true,
		types: ["Grass"],
      abilities: {0: "Sap Sipper", 1: "Grassy Surge", H: "Grass Pelt"},
	},
	gogoat: {
		inherit: true,
		types: ["Grass"],
      abilities: {0: "Sap Sipper", 1: "Grassy Surge", H: "Grass Pelt"},
	},
	gothita: {
		inherit: true,
		types: ["Psychic"],
      abilities: {0: "Psychic Surge", 1: "Competitive", H: "Shadow Tag"},
	},
	gothorita: {
		inherit: true,
		types: ["Psychic"],
      abilities: {0: "Psychic Surge", 1: "Competitive", H: "Shadow Tag"},
	},
	gothitelle: {
		inherit: true,
		types: ["Psychic"],
      abilities: {0: "Psychic Surge", 1: "Competitive", H: "Shadow Tag"},
	},
	deoxys: {
		inherit: true,
		types: ["Psychic"],
      abilities: {0: "Pressure", H: "Psychic Surge"},
	},
	deoxysdefense: {
		inherit: true,
		types: ["Psychic"],
      abilities: {0: "Pressure", H: "Psychic Surge"},
	},
	deoxysspeed: {
		inherit: true,
		types: ["Psychic"],
      abilities: {0: "Pressure", H: "Psychic Surge"},
	},
	steelixmega: {
		inherit: true,
		types: ["Steel", "Ground"],
      abilities: {0: "Bulletproof"},
	},
	pineco: {
		inherit: true,
      abilities: {0: "Sturdy", 1: "Bulletproof", H: "Overcoat"},
	},
	forretress: {
		inherit: true,
      abilities: {0: "Sturdy", 1: "Bulletproof", H: "Overcoat"},
	},
	bergmite: {
		inherit: true,
      abilities: {0: "Bulletproof", 1: "Ice Body", H: "Sturdy"},
	},
	avalugg: {
		inherit: true,
      abilities: {0: "Bulletproof", 1: "Ice Body", H: "Sturdy"},
	},
	rhyperior: {
		inherit: true,
      abilities: {0: "Bulletproof", 1: "Solid Rock", H: "Reckless"},
	},
	giratina: {
		inherit: true,
      abilities: {0: "Pressure", 1: "Dimension Warp", H: "Telepathy"},
	},
	unown: {
		inherit: true,
		abilities: {0: "Levitate", H: "Dimension Warp"},
	},
	uxie: {
		inherit: true,
		types: ["Psychic", "Ghost"],
		abilities: {0: "Levitate", H: "Dimension Warp"},
	},
	mesprit: {
		inherit: true,
		types: ["Psychic", "Fairy"],
		abilities: {0: "Levitate", H: "Dimension Warp"},
	},
	azelf: {
		inherit: true,
		types: ["Psychic", "Dark"],
		abilities: {0: "Levitate", H: "Dimension Warp"},
	},
	nihilego: {
		inherit: true,
		abilities: {0: "Beast Boost", H: "Dimension Warp"},
	},
	porygon: {
		inherit: true,
      abilities: {0: "Trace", 1: "Download", H: "Dimension Warp"},
	},
	porygon2: {
		inherit: true,
      abilities: {0: "Trace", 1: "Download", H: "Dimension Warp"},
	},
	porygonz: {
		inherit: true,
      abilities: {0: "Adaptability", 1: "Download", H: "Dimension Warp"},
	},
	buzzwole: {
		inherit: true,
		abilities: {0: "Beast Boost", H: "Perseverance"},
	},
	pheromosa: {
		inherit: true,
		abilities: {0: "Beast Boost", H: "Sole Caliber"},
	},
	taillow: {
		inherit: true,
      abilities: {0: "Guts", 1: "Sugar Glider", H: "Scrappy"},
	},
	swellow: {
		inherit: true,
      abilities: {0: "Guts", 1: "Sugar Glider", H: "Scrappy"},
	},
	cottonee: {
		inherit: true,
      abilities: {0: "Prankster", 1: "Infiltrator", H: "Sugar Glider"},
	},
	whimsicott: {
		inherit: true,
      abilities: {0: "Prankster", 1: "Infiltrator", H: "Sugar Glider"},
	},
	hoppip: {
		inherit: true,
      abilities: {0: "Sugar Glider", 1: "Leaf Guard", H: "Infiltrator"},
	},
	skiploom: {
		inherit: true,
      abilities: {0: "Sugar Glider", 1: "Leaf Guard", H: "Infiltrator"},
	},
	jumpluff: {
		inherit: true,
      abilities: {0: "Sugar Glider", 1: "Leaf Guard", H: "Infiltrator"},
	},
	emolga: {
		inherit: true,
      abilities: {0: "Static", 1: "Sugar Glider", H: "Motor Drive"},
	},
	tsareena: {
		inherit: true,
      abilities: {0: "Sole Caliber", 1: "Queenly Majesty", H: "Sweet Veil"},
	},
	lopunny: {
		inherit: true,
      abilities: {0: "Cute Charm", 1: "Klutz", H: "Sole Caliber"},
	},
	chinchou: {
		inherit: true,
      abilities: {0: "Volt Absorb", 1: "Illuminate", H: "Shark Bait"},
	},
	lanturn: {
		inherit: true,
      abilities: {0: "Volt Absorb", 1: "Illuminate", H: "Shark Bait"},
	},
	wingull: {
		inherit: true,
      abilities: {0: "Shark Bait", 1: "Hydration", H: "Rain Dish"},
	},
	pelipper: {
		inherit: true,
      abilities: {0: "Shark Bait", 1: "Drizzle", H: "Rain Dish"},
	},
	stunfisk: {
		inherit: true,
      abilities: {0: "Static", 1: "Shark Bait", H: "Sand Veil"},
	},
	cherubi: {
		inherit: true,
      abilities: {0: "Bask"},
	},
	salazzle: {
		inherit: true,
      abilities: {0: "Corrosion", 1: "Bask", H: "Oblivious"},
	},
	helioptile: {
		inherit: true,
      abilities: {0: "Dry Skin", 1: "Bask", H: "Solar Power"},
	},
	heliolisk: {
		inherit: true,
      abilities: {0: "Dry Skin", 1: "Bask", H: "Solar Power"},
	},
	charmander: {
		inherit: true,
      abilities: {0: "Blaze", H: "Bask"},
	},
	charmeleon: {
		inherit: true,
      abilities: {0: "Blaze", H: "Bask"},
	},
	charizard: {
		inherit: true,
      abilities: {0: "Blaze", H: "Bask"},
	},
	empoleon: {
		inherit: true,
      abilities: {0: "Torrent", H: "Wet Suit"},
	},
	lotad: {
		inherit: true,
      abilities: {0: "Swift Swim", 1: "Wet Suit", H: "Own Tempo"},
	},
	lombre: {
		inherit: true,
      abilities: {0: "Swift Swim", 1: "Wet Suit", H: "Own Tempo"},
	},
	ludicolo: {
		inherit: true,
      abilities: {0: "Swift Swim", 1: "Wet Suit", H: "Own Tempo"},
	},
	surskit: {
		inherit: true,
      abilities: {0: "Swift Swim", H: "Wet Suit"},
	},
	makuhita: {
		inherit: true,
      abilities: {0: "Stamina", 1: "Guts", H: "Sheer Force"},
	},
	hariyama: {
		inherit: true,
      abilities: {0: "Stamina", 1: "Guts", H: "Sheer Force"},
	},
	druddigon: {
		inherit: true,
      abilities: {0: "Rough Skin", 1: "Stamina", H: "Mold Breaker"},
	},
	anorith: {
		inherit: true,
      abilities: {0: "Battle Armor", H: "Stamina"},
	},
	armaldo: {
		inherit: true,
      abilities: {0: "Battle Armor", H: "Stamina"},
	},
	turtonator: {
		inherit: true,
      abilities: {0: "Shell Armor", H: "Stamina"},
	},
	mewtwo: {
		inherit: true,
      abilities: {0: "Pressure", 1: "Infuriation", H: "Unnerve"},
	},
	cyndaquil: {
		inherit: true,
      abilities: {0: "Blaze", H: "Infuriation"},
	},
	quilava: {
		inherit: true,
      abilities: {0: "Blaze", H: "Infuriation"},
	},
	typhlosion: {
		inherit: true,
      abilities: {0: "Blaze", H: "Infuriation"},
	},
	drampa: {
		inherit: true,
      abilities: {0: "Infuriation", 1: "Sap Sipper", H: "Cloud Nine"},
	},
	whismur: {
		inherit: true,
      abilities: {0: "Soundproof", 1: "Infuriation", H: "Rattled"},
	},
	loudred: {
		inherit: true,
      abilities: {0: "Soundproof", 1: "Infuriation", H: "Scrappy"},
	},
	exploud: {
		inherit: true,
      abilities: {0: "Soundproof", 1: "Infuriation", H: "Scrappy"},
	},
	chikorita: {
		inherit: true,
      abilities: {0: "Overgrow", H: "Perseverance"},
	},
	bayleef: {
		inherit: true,
      abilities: {0: "Overgrow", H: "Perseverance"},
	},
	meganium: {
		inherit: true,
      abilities: {0: "Overgrow", H: "Perseverance"},
	},
	meditite: {
		inherit: true,
      abilities: {0: "Pure Power", H: "Perseverance"},
	},
	medicham: {
		inherit: true,
      abilities: {0: "Pure Power", H: "Perseverance"},
	},
	raikou: {
		inherit: true,
      abilities: {0: "Pressure", H: "Stalwart"},
	},
	entei: {
		inherit: true,
      abilities: {0: "Pressure", H: "Stalwart"},
	},
	suicune: {
		inherit: true,
      abilities: {0: "Pressure", H: "Stalwart"},
	},
	zeraora: {
		inherit: true,
      abilities: {0: "Volt Absorb", H: "Stalwart"},
	},
	golurk: {
		inherit: true,
      abilities: {0: "Iron Fist", 1: "Stalwart", H: "No Guard"},
	},
	buizel: {
		inherit: true,
      abilities: {0: "Swift Swim", 1: "Technician", H: "Wet Suit"},
	},
	floatzel: {
		inherit: true,
      abilities: {0: "Swift Swim", 1: "Technician", H: "Wet Suit"},
	},
	voltorb: {
		inherit: true,
      abilities: {0: "Soundproof", 1: "Electric Surge", H: "Aftermath"},
	},
	electrode: {
		inherit: true,
      abilities: {0: "Soundproof", 1: "Electric Surge", H: "Aftermath"},
	},
	exeggutor: {
		inherit: true,
      abilities: {0: "Grassy Surge", 1: "Bask", H: "Harvest"},
	},
	hitmonlee: {
		inherit: true,
      abilities: {0: "Sole Caliber", 1: "Reckless", H: "Unburden"},
	},
	golduck: {
		inherit: true,
      abilities: {0: "Wet Suit", 1: "Cloud Nine", H: "Swift Swim"},
	},
	farfetchd: {
		inherit: true,
      abilities: {0: "Keen Eye", 1: "Knight's Blade", H: "Defiant"},
	},
   keldeo: {
		inherit: true,
      abilities: {0: "Justified", 1: "Knight's Blade"},
	},
	keldeoresolute: {
		inherit: true,
      abilities: {0: "Justified", 1: "Knight's Blade"},
	},
	terrakion: {
		inherit: true,
      abilities: {0: "Justified", H: "Knight's Blade"},
	},
	virizion: {
		inherit: true,
      abilities: {0: "Justified", H: "Knight's Blade"},
	},	
	cobalion: {
		inherit: true,
      abilities: {0: "Justified", H: "Knight's Blade"},
	},
	blaziken: {
		inherit: true,
      abilities: {0: "Blaze", H: "Sole Caliber"},
	},
	kartana: {
		inherit: true,
      abilities: {0: "Beast Boost", H: "Knight's Blade"},
	},
	grookey: {
			inherit: true,        
		abilities: {0: "Overgrow", H: "Loudspeaker"},
    },
};
