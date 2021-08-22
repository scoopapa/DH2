  
export const Pokedex: {[k: string]: ModdedSpeciesData} = {
	blastoisemega: {
    	inherit: true,
		baseStats: {hp: 79, atk: 113, def: 130, spa: 115, spd: 125, spe: 68},
	},
	butterfree: {
    	inherit: true,
		types: ["Bug", "Psychic"],
		otherFormes: ["Butterfree-Mega"],
		formeOrder: ["Butterfree", "Butterfree-Mega"],
	},
	butterfreemega: {
		num: 12,
		name: "Butterfree-Mega",
		baseSpecies: "Butterfree",
		forme: "Mega",
		types: ["Bug", "Psychic"],
		baseStats: {hp: 60, atk: 15, def: 50, spa: 150, spd: 80, spe: 140},
		abilities: {0: "Magic Guard"},
		weightkg: 32,
		color: "Blue",
		requiredItem: "Butterfrite",
	},
	raticate: {
    	inherit: true,
		baseStats: {hp: 65, atk: 101, def: 67, spa: 50, spd: 80, spe: 97},
	},
	raticatealola: {
    	inherit: true,
		baseStats: {hp: 85, atk: 91, def: 77, spa: 40, spd: 90, spe: 77},
	},
	fearow: {
    	inherit: true,
		abilities: {0: "Keen Eye", 1: "Hustle", H: "Sniper"},
	},
	spearow: {
    	inherit: true,
		abilities: {0: "Keen Eye", 1: "Hustle", H: "Sniper"},
	},
	ekans: {
    	inherit: true,
		types: ["Poison", "Dragon"],
	},
	arbok: {
    	inherit: true,
		types: ["Poison", "Dragon"],
		baseStats: {hp: 60, atk: 105, def: 79, spa: 65, spd: 81, spe: 90},
	},
	raichualola: {
    	inherit: true,
		abilities: {0: "Levitate", 1: "Surge Surfer", H: "Mental Health"},
	},
	sandslash: {
    	inherit: true,
		baseStats: {hp: 75, atk: 110, def: 110, spa: 45, spd: 55, spe: 85},
		abilities: {0: "Sand Veil", 1: "Rough Skin", H: "Sand Rush"},
	},
	sandslashalola: {
    	inherit: true,
		baseStats: {hp: 75, atk: 110, def: 120, spa: 25, spd: 65, spe: 85},
		abilities: {0: "Snow Cloak", 1: "Iron Barbs", H: "Slush Rush"},
	},
	nidoqueen: {
    	inherit: true,
		baseStats: {hp: 91, atk: 92, def: 87, spa: 75, spd: 85, spe: 76},
		abilities: {0: "Poison Point", 1: "Royal Presence", H: "Sheer Force"},
	},
	nidoking: {
    	inherit: true,
		baseStats: {hp: 81, atk: 102, def: 77, spa: 85, spd: 75, spe: 86},
		abilities: {0: "Poison Point", 1: "Royal Presence", H: "Sheer Force"},
	},
	wigglytuff: {
    	inherit: true,
		baseStats: {hp: 140, atk: 80, def: 55, spa: 95, spd: 55, spe: 58},
		abilities: {0: "Cute Charm", 1: "Competitive", H: "Cacophony"},
	},
	oddish: {
    	inherit: true,
		abilities: {0: "Chlorophyll", 1: "Leaf Guard", H: "Run Away"},
	},
	gloom: {
    	inherit: true,
		abilities: {0: "Chlorophyll", 1: "Leaf Guard", H: "Stench"},
	},
	vileplume: {
    	inherit: true,
		abilities: {0: "Chlorophyll", 1: "Leaf Guard", H: "Effect Spore"},
	},
	parasect: {
    	inherit: true,
		types: ["Bug", "Ghost"],
		baseStats: {hp: 60, atk: 125, def: 80, spa: 30, spd: 80, spe: 30},
		abilities: {0: "Effect Spore", 1: "Dry Skin", H: "Cursed Body"},
	},
	dugtrioalola: {
    	inherit: true,
		baseStats: {hp: 35, atk: 100, def: 50, spa: 40, spd: 80, spe: 120},
	},
	persian: {
    	inherit: true,
		baseStats: {hp: 65, atk: 85, def: 60, spa: 65, spd: 65, spe: 115},
	},
	persianalola: {
    	inherit: true,
		baseStats: {hp: 65, atk: 60, def: 60, spa: 90, spd: 65, spe: 115},
	},
	golduck: {
    	inherit: true,
		types: ["Water", "Psychic"],
		baseStats: {hp: 80, atk: 82, def: 78, spa: 110, spd: 80, spe: 90},
		abilities: {0: "Mental Health", 1: "Cloud Nine", H: "Swift Swim"},
	},
	psyduck: {
    	inherit: true,
		types: ["Water", "Psychic"],
		abilities: {0: "Mental Health", 1: "Cloud Nine", H: "Swift Swim"},
	},
	machamp: {
    	inherit: true,
		baseStats: {hp: 90, atk: 130, def: 80, spa: 55, spd: 80, spe: 70},
	},
	victreebel: {
    	inherit: true,
		abilities: {0: "Chlorophyll", 1: "Harvest", H: "Gluttony"},
	},
	tentacruel: {
    	inherit: true,
		otherFormes: ["Tentacruel-Mega"],
		formeOrder: ["Tentacruel", "Tentacruel-Mega"],
	},
	tentacruelmega: {
		num: 73,
		name: "Tentacruel-Mega",
		baseSpecies: "Tentacruel",
		forme: "Mega",
		types: ["Water", "Poison"],
		baseStats: {hp: 80, atk: 70, def: 90, spa: 125, spd: 125, spe: 125},
		abilities: {0: "Merciless"},
		weightkg: 55,
		color: "Blue",
		requiredItem: "Tentacruelite",
	},
	rapidash: {
    	inherit: true,
		types: ["Fire", "Fairy"],
		baseStats: {hp: 65, atk: 100, def: 70, spa: 80, spd: 80, spe: 115},
		abilities: {0: "Reckless", 1: "Flash Fire", H: "Flame Body"},
	},
	rapidashgalar: {
    	inherit: true,
		baseStats: {hp: 65, atk: 90, def: 70, spa: 90, spd: 80, spe: 115},
		abilities: {0: "Pixie Power", 1: "Pastel Veil", H: "Anticipation"},
	},
	farfetchdgalar: {
    	inherit: true,
		types: ["Fighting", "Flying"],
	},
	dodrio: {
    	inherit: true,
		abilities: {0: "Quick Feet", 1: "Early Bird", H: "Tangled Feet"},
	},
	seel: {
    	inherit: true,
		abilities: {0: "Thick Fat", 1: "Technician", H: "Seal Away"},
	},
	dewgong: {
    	inherit: true,
		baseStats: {hp: 95, atk: 70, def: 95, spa: 70, spd: 95, spe: 70},
		abilities: {0: "Thick Fat", 1: "Technician", H: "Seal Away"},
	},
	drowzee: {
    	inherit: true,
		types: ["Psychic", "Dark"],
		abilities: {0: "Insomnia", 1: "Forewarn", H: "Mental Health"},
	},
	hypno: {
    	inherit: true,
		types: ["Psychic", "Dark"],
		baseStats: {hp: 85, atk: 83, def: 70, spa: 83, spd: 125, spe: 67},
		abilities: {0: "Insomnia", 1: "Forewarn", H: "Mental Health"},
	},
	kingler: {
    	inherit: true,
		baseStats: {hp: 55, atk: 140, def: 115, spa: 50, spd: 50, spe: 75},
	},
	exeggcute: {
    	inherit: true,
		abilities: {0: "Chlorophyll", 1: "Mental Health", H: "Harvest"},
	},
	exeggutor: {
    	inherit: true,
		abilities: {0: "Chlorophyll", 1: "Mental Health", H: "Harvest"},
	},
	exeggutoralola: {
    	inherit: true,
		abilities: {0: "Chlorophyll", 1: "Frisk", H: "Harvest"},
	},
	marowak: {
    	inherit: true,
		types: ["Ground", "Fighting"],
	},
	hitmonlee: {
    	inherit: true,
		baseStats: {hp: 70, atk: 120, def: 53, spa: 35, spd: 110, spe: 87},
	},
	hitmonchan: {
    	inherit: true,
		baseStats: {hp: 70, atk: 89, def: 100, spa: 35, spd: 110, spe: 71},
	},
	weezing: {
    	inherit: true,
		baseStats: {hp: 65, atk: 90, def: 130, spa: 85, spd: 70, spe: 60},
	},
	weezinggalar: {
    	inherit: true,
		baseStats: {hp: 65, atk: 85, def: 130, spa: 90, spd: 70, spe: 60},
	},
	goldeen: {
    	inherit: true,
		abilities: {0: "Swift Swim", 1: "Lightning Rod", H: "Galvanize"},
	},
	seaking: {
    	inherit: true,
		baseStats: {hp: 80, atk: 112, def: 75, spa: 65, spd: 80, spe: 88},
		abilities: {0: "Swift Swim", 1: "Lightning Rod", H: "Galvanize"},
	},
	jynx: {
    	inherit: true,
		evos: ["Frostonna"],
	},
	frostonna: {
		num: 8998,
		name: "Frostonna",
		types: ["Ice", "Psychic"],
		gender: "F",
		baseStats: {hp: 75, atk: 60, def: 67, spa: 138, spd: 115, spe: 85},
		abilities: {0: "Oblivious", 1: "Demotivate", H: "Dry Skin"},
		heightm: 1.7,
		weightkg: 80.6,
		color: "Red",
		prevo: "Jynx",
		evoType: "trade",
		evoItem: "Frosterizer",
		eggGroups: ["Human-Like"],
	},
	elekid: {
    	inherit: true,
		abilities: {0: "Static", 1: "Lightning Rod", H: "Vital Spirit"},
	},
	electabuzz: {
    	inherit: true,
		abilities: {0: "Static", 1: "Lightning Rod", H: "Vital Spirit"},
	},
	magby: {
    	inherit: true,
		abilities: {0: "Flame Body", 1: "Flash Fire", H: "Vital Spirit"},
	},
	magmar: {
    	inherit: true,
		abilities: {0: "Flame Body", 1: "Flash Fire", H: "Vital Spirit"},
	},
	magikarp: {
    	inherit: true,
		abilities: {0: "Swift Swim", 1: "Steadfast", H: "Rattled"},
	},
	gyarados: {
    	inherit: true,
		abilities: {0: "Intimidate", 1: "Defiant", H: "Moxie"},
	},
	ditto: {
    	inherit: true,
		baseStats: {hp: 58, atk: 58, def: 58, spa: 58, spd: 58, spe: 58},
	},
	eevee: {
    	inherit: true,
		evos: ["Vaporeon", "Jolteon", "Flareon", "Espeon", "Umbreon", "Leafeon", "Glaceon", "Sylveon", "Geareon", "Mytheon"],
	},
	geareon: {
		num: 8999,
		name: "Geareon",
		types: ["Steel"],
		genderRatio: {M: 0.875, F: 0.125},
		baseStats: {hp: 95, atk: 65, def: 130, spa: 110, spd: 60, spe: 65},
		abilities: {0: "Light Metal", H: "Steam Engine"},
		heightm: 1.1,
		weightkg: 50,
		color: "Gray",
		prevo: "Eevee",
		evoType: "trade",
		evoItem: "Metal Coat",
		eggGroups: ["Field"],
	},
	mytheon: {
		num: 9000,
		name: "Mytheon",
		types: ["Dragon"],
		genderRatio: {M: 0.875, F: 0.125},
		baseStats: {hp: 110, atk: 95, def: 65, spa: 60, spd: 65, spe: 130},
		abilities: {0: "Pressure", H: "Tough Claws"},
		heightm: 0.9,
		weightkg: 24,
		color: "Blue",
		prevo: "Eevee",
		evoType: "trade",
		evoItem: "Dragon Scale",
		eggGroups: ["Field"],
	},
	jolteon: {
    	inherit: true,
		abilities: {0: "Volt Absorb", H: "Iron Barbs"},
	},
	flareon: {
    	inherit: true,
		baseStats: {hp: 65, atk: 130, def: 60, spa: 110, spd: 65, spe: 95},
	},
	porygon: {
    	inherit: true,
		types: ["Normal", "Electric"],
	},
	porygon2: {
    	inherit: true,
		types: ["Normal", "Electric"],
	},
	porygonz: {
    	inherit: true,
		types: ["Normal", "Electric"],
	},
	chikorita: {
    	inherit: true,
		abilities: {0: "Overgrow", H: "Flower Veil"},
	},
	bayleef: {
    	inherit: true,
		abilities: {0: "Overgrow", H: "Flower Veil"},
	},
	meganium: {
    	inherit: true,
		abilities: {0: "Overgrow", H: "Flower Veil"},
		otherFormes: ["Meganium-Mega"],
		formeOrder: ["Meganium", "Meganium-Mega"],
	},
	meganiummega: {
		num: 154,
		name: "Meganium-Mega",
		baseSpecies: "Meganium",
		forme: "Mega",
		types: ["Grass"],
		baseStats: {hp: 80, atk: 85, def: 131, spa: 118, spd: 131, spe: 80},
		abilities: {0: "Unaware"},
		weightkg: 101,
		color: "Green",
		requiredItem: "Meganiumite",
	},
	cyndaquil: {
    	inherit: true,
		baseStats: {hp: 52, atk: 39, def: 50, spa: 65, spd: 43, spe: 60},
	},
	quilava: {
    	inherit: true,
		baseStats: {hp: 64, atk: 58, def: 65, spa: 80, spd: 58, spe: 80},
	},
	typhlosion: {
    	inherit: true,
		baseStats: {hp: 84, atk: 78, def: 85, spa: 100, spd: 78, spe: 109},
		otherFormes: ["Typhlosion-Mega"],
		formeOrder: ["Typhlosion", "Typhlosion-Mega"],
	},
	typhlosionmega: {
		num: 157,
		name: "Typhlosion-Mega",
		baseSpecies: "Typhlosion",
		forme: "Mega",
		types: ["Fire"],
		baseStats: {hp: 84, atk: 78, def: 110, spa: 143, spd: 100, spe: 119},
		abilities: {0: "Demotivate"},
		weightkg: 80,
		color: "Yellow",
		requiredItem: "Typhlosionite",
	},
	feraligatr: {
    	inherit: true,
		otherFormes: ["Typhlosion-Mega"],
		formeOrder: ["Typhlosion", "Typhlosion-Mega"],
	},
	feraligatrmega: {
		num: 160,
		name: "Feraligatr-Mega",
		baseSpecies: "Feraligatr",
		forme: "Mega",
		types: ["Water"],
		baseStats: {hp: 85, atk: 155, def: 120, spa: 79, spd: 103, spe: 88},
		abilities: {0: "Strong Jaw"},
		weightkg: 89,
		color: "Blue",
		requiredItem: "Feraligatrite",
	},
	sentret: {
    	inherit: true,
		types: ["Normal", "Fairy"],
		abilities: {0: "Long Reach", 1: "Keen Eye", H: "Friend Guard"},
	},
	furret: {
    	inherit: true,
		types: ["Normal", "Fairy"],
		baseStats: {hp: 85, atk: 81, def: 64, spa: 45, spd: 95, spe: 90},
		abilities: {0: "Long Reach", 1: "Keen Eye", H: "Fluffy"},
	},
	noctowl: {
    	inherit: true,
		baseStats: {hp: 110, atk: 50, def: 60, spa: 96, spd: 96, spe: 70},
	},
	ledyba: {
    	inherit: true,
		abilities: {0: "Swarm", 1: "Early Bird", H: "Pure Power"},
	},
	ledian: {
    	inherit: true,
		types: ["Bug", "Fighting"],
		baseStats: {hp: 55, atk: 50, def: 45, spa: 55, spd: 110, spe: 95},
		abilities: {0: "Swarm", 1: "Early Bird", H: "Pure Power"},
	},
	ariados: {
    	inherit: true,
		baseStats: {hp: 70, atk: 100, def: 70, spa: 60, spd: 70, spe: 40},
		abilities: {0: "Swarm", 1: "Insomnia", H: "Prankster"},
	},
	lanturn: {
    	inherit: true,
		baseStats: {hp: 125, atk: 58, def: 58, spa: 86, spd: 86, spe: 67},
	},
	xatu: {
    	inherit: true,
		baseStats: {hp: 75, atk: 75, def: 80, spa: 95, spd: 80, spe: 95},
	},
	bellossom: {
    	inherit: true,
		abilities: {0: "Chlorophyll", 1: "Dancer", H: "Healer"},
	},
	politoed: {
    	inherit: true,
		baseStats: {hp: 90, atk: 75, def: 75, spa: 90, spd: 100, spe: 80},
	},
	sunflora: {
    	inherit: true,
		baseStats: {hp: 85, atk: 65, def: 85, spa: 105, spd: 95, spe: 30},
		abilities: {0: "Chlorophyll", 1: "Drought", H: "Early Bird"},
	},
	umbreon: {
    	inherit: true,
		abilities: {0: "Synchronize", H: "Poison Point"},
	},
	slowking: {
    	inherit: true,
		otherFormes: ["Slowking-Mega", "Slowking-Galar"],
		formeOrder: ["Slowking", "Slowking-Mega", "Slowking-Galar"],
	},
	slowkingmega: {
		num: 199,
		name: "Slowking-Mega",
		baseSpecies: "Slowking",
		forme: "Mega",
		types: ["Water", "Psychic"],
		baseStats: {hp: 95, atk: 75, def: 80, spa: 130, spd: 180, spe: 30},
		abilities: {0: "Analytic"},
		weightkg: 279.5,
		color: "Pink",
		requiredItem: "Slowkinite",
	},
	misdreavus: {
    	inherit: true,
		types: ["Ghost", "Fairy"],
	},
	unown: {
    	inherit: true,
		baseStats: {hp: 48, atk: 48, def: 48, spa: 144, spd: 48, spe: 48},
		abilities: {0: "Levitate"},
	},
	girafarig: {
    	inherit: true,
		baseStats: {hp: 70, atk: 100, def: 65, spa: 100, spd: 65, spe: 85},
		abilities: {0: "Inner Focus", 1: "Sap Sipper", H: "Parental Bond"},
	},
	dunsparce: {
    	inherit: true,
		types: ["Normal", "Dragon"],
		baseStats: {hp: 100, atk: 90, def: 80, spa: 70, spd: 60, spe: 50},
	},
	steelixmega: {
    	inherit: true,
		abilities: {0: "Solidify"},
	},
	granbull: {
    	inherit: true,
		otherFormes: ["Granbull-Mega"],
		formeOrder: ["Granbull", "Granbull-Mega"],
	},
	granbullmega: {
		num: 210,
		name: "Granbull-Mega",
		baseSpecies: "Granbull",
		forme: "Mega",
		types: ["Fairy", "Dark"],
		baseStats: {hp: 90, atk: 150, def: 105, spa: 60, spd: 90, spe: 55},
		abilities: {0: "Strong Jaw"},
		weightkg: 48.7,
		color: "Pink",
		requiredItem: "Granbullite",
	},
	ursaring: {
    	inherit: true,
		abilities: {0: "Guts", 1: "Quick Feet", H: "Honey Gather"},
	},
	magcargo: {
    	inherit: true,
		baseStats: {hp: 60, atk: 50, def: 140, spa: 100, spd: 80, spe: 50},
	},
	corsolagalar: {
    	inherit: true,
		abilities: {0: "Weak Armor", 1: "Cursed Body", H: "Perish Body"},
	},
	remoraid: {
    	inherit: true,
		abilities: {0: "Hustle", 1: "Mega Launcher", H: "Moody"},
	},
	octillery: {
    	inherit: true,
		abilities: {0: "Suction Cups", 1: "Mega Launcher", H: "Protean"},
	},
	stantler: {
    	inherit: true,
		baseStats: {hp: 73, atk: 85, def: 72, spa: 105, spd: 65, spe: 95},
	},
	hitmontop: {
    	inherit: true,
		baseStats: {hp: 70, atk: 95, def: 95, spa: 35, spd: 110, spe: 70},
	},
	raikou: {
    	inherit: true,
		abilities: {0: "Pressure", H: "Vital Spirit"},
	},
	entei: {
    	inherit: true,
		abilities: {0: "Pressure", H: "Scrappy"},
	},
	mightyena: {
    	inherit: true,
		baseStats: {hp: 70, atk: 100, def: 70, spa: 60, spd: 60, spe: 100},
	},
	beautifly: {
    	inherit: true,
		baseStats: {hp: 60, atk: 70, def: 50, spa: 100, spd: 50, spe: 75},
		abilities: {0: "Swarm", 1: "Tinted Lens", H: "Rivalry"},
	},
	dustox: {
    	inherit: true,
		baseStats: {hp: 60, atk: 50, def: 70, spa: 50, spd: 100, spe: 75},
		abilities: {0: "Shield Dust", 1: "Compound Eyes", H: "Honey Gather"},
	},
	taillow: {
    	inherit: true,
		abilities: {0: "Guts", 1: "Scrappy", H: "Cacophony"},
	},
	swellow: {
    	inherit: true,
		abilities: {0: "Guts", 1: "Scrappy", H: "Cacophony"},
	},
	masquerain: {
    	inherit: true,
		types: ["Bug", "Water"],
	},
	slakoth: {
    	inherit: true,
		abilities: {0: "Truant", H: "Klutz"},
	},
	slaking: {
    	inherit: true,
		abilities: {0: "Truant", H: "Klutz"},
	},
	vigoroth: {
    	inherit: true,
		abilities: {0: "Vital Spirit", H: "Tough Claws"},
	},
	shedinja: {
    	inherit: true,
		baseStats: {hp: 1, atk: 110, def: 45, spa: 30, spd: 30, spe: 40},
	},
	loudred: {
    	inherit: true,
		abilities: {0: "Soundproof", 1: "Scrappy", H: "Cacophony"},
	},
	exploud: {
    	inherit: true,
		abilities: {0: "Soundproof", 1: "Scrappy", H: "Cacophony"},
	},
	whismur: {
    	inherit: true,
		abilities: {0: "Soundproof", 1: "Rattled", H: "Cacophony"},
	},
	nosepass: {
    	inherit: true,
		types: ["Rock", "Electric"],
	},
	delcatty: {
    	inherit: true,
		baseStats: {hp: 90, atk: 65, def: 65, spa: 55, spd: 55, spe: 90},
	},
	plusle: {
    	inherit: true,
		types: ["Electric", "Fire"],
		baseStats: {hp: 60, atk: 60, def: 50, spa: 95, spd: 85, spe: 95},
	},
	minun: {
    	inherit: true,
		types: ["Electric", "Ice"],
		baseStats: {hp: 60, atk: 50, def: 60, spa: 85, spd: 95, spe: 95},
	},
	gulpin: {
    	inherit: true,
		types: ["Poison", "Normal"],
	},
	swalot: {
    	inherit: true,
		types: ["Poison", "Normal"],
		baseStats: {hp: 113, atk: 83, def: 83, spa: 83, spd: 83, spe: 63},
	},
	wailord: {
    	inherit: true,
		baseStats: {hp: 190, atk: 100, def: 45, spa: 100, spd: 45, spe: 60},
	},
	grumpig: {
    	inherit: true,
		baseStats: {hp: 80, atk: 90, def: 65, spa: 90, spd: 110, spe: 80},
	},
	spinda: {
    	inherit: true,
		baseStats: {hp: 70, atk: 70, def: 70, spa: 70, spd: 70, spe: 70},
	},
	trapinch: {
    	inherit: true,
		types: ["Ground", "Bug"],
	},
	vibrava: {
    	inherit: true,
		types: ["Ground", "Bug"],
		abilities: {0: "Levitate", 1: "Shield Dust", H: "Tinted Lens"},
	},
	flygon: {
    	inherit: true,
		types: ["Ground", "Bug"],
		abilities: {0: "Levitate", 1: "Shield Dust", H: "Tinted Lens"},
	},
	zangoose: {
    	inherit: true,
		baseStats: {hp: 73, atk: 115, def: 60, spa: 60, spd: 60, spe: 100},
	},
	seviper: {
    	inherit: true,
		baseStats: {hp: 73, atk: 75, def: 60, spa: 100, spd: 60, spe: 100},
	},
	whiscash: {
    	inherit: true,
		baseStats: {hp: 130, atk: 78, def: 73, spa: 78, spd: 73, spe: 71},
	},
	baltoy: {
    	inherit: true,
		abilities: {0: "Levitate", H: "Seal Away"},
	},
	claydol: {
    	inherit: true,
		abilities: {0: "Levitate", H: "Seal Away"},
	},
	milotic: {
    	inherit: true,
		otherFormes: ["Milotic-Mega"],
		formeOrder: ["Milotic", "Milotic-Mega"],
	},
	miloticmega: {
		num: 350,
		name: "Milotic-Mega",
		baseSpecies: "Milotic",
		forme: "Mega",
		types: ["Water", "Fairy"],
		baseStats: {hp: 95, atk: 70, def: 109, spa: 130, spd: 155, spe: 81},
		abilities: {0: "Pressure"},
		weightkg: 162,
		color: "Blue",
		requiredItem: "Milotite",
	},
	castform: {
    	inherit: true,
		otherFormes: ["Castform-Sunny", "Castform-Rainy", "Castform-Snowy", "Castform-Sandy"],
		formeOrder: ["Castform", "Castform-Sunny", "Castform-Rainy", "Castform-Snowy", "Castform-Sandy"],
	},
	castformsandy: {
		num: 351,
		name: "Castform-Sandy",
		baseSpecies: "Castform",
		forme: "Sandy",
		types: ["Rock"],
		baseStats: {hp: 70, atk: 70, def: 70, spa: 70, spd: 70, spe: 70},
		abilities: {0: "Forecast"},
		heightm: 0.3,
		weightkg: 0.8,
		color: "Brown",
		eggGroups: ["Fairy", "Amorphous"],
		requiredAbility: "Forecast",
		battleOnly: "Castform",
	},
	kecleon: {
    	inherit: true,
		baseStats: {hp: 80, atk: 100, def: 70, spa: 70, spd: 120, spe: 40},
	},
	shuppet: {
    	inherit: true,
		types: ["Ghost", "Normal"],
	},
	banette: {
    	inherit: true,
		types: ["Ghost", "Normal"],
	},
	banettemega: {
    	inherit: true,
		types: ["Ghost", "Normal"],
	},
	duskull: {
    	inherit: true,
		abilities: {0: "Levitate", 1: "Seal Away", H: "Frisk"},
	},
	dusclops: {
    	inherit: true,
		abilities: {0: "Pressure", 1: "Seal Away", H: "Frisk"},
	},
	dusknoir: {
    	inherit: true,
		abilities: {0: "Levitate", 1: "Seal Away", H: "Frisk"},
		otherFormes: ["Dusknoir-Mega"],
		formeOrder: ["Dusknoir", "Dusknoir-Mega"],
	},
	dusknoirmega: {
		num: 477,
		name: "Dusknoir-Mega",
		baseSpecies: "Dusknoir",
		forme: "Mega",
		types: ["Ghost", "Fighting"],
		baseStats: {hp: 45, atk: 140, def: 160, spa: 75, spd: 160, spe: 45},
		abilities: {0: "Iron Fist"},
		weightkg: 107,
		color: "Black",
		requiredItem: "Dusknoirite",
	},
	tropius: {
    	inherit: true,
		types: ["Grass", "Dragon"],
		baseStats: {hp: 109, atk: 68, def: 93, spa: 72, spd: 97, spe: 51},
		abilities: {0: "Chlorophyll", 1: "Thick Fat", H: "Harvest"},
	},
	chimecho: {
    	inherit: true,
		types: ["Psychic", "Steel"],
		baseStats: {hp: 75, atk: 50, def: 80, spa: 105, spd: 100, spe: 65},
	},
	absolmega: {
    	inherit: true,
		types: ["Dark", "Fairy"],
	},
	froslass: {
    	inherit: true,
		otherFormes: ["Froslass-Mega"],
		formeOrder: ["Froslass", "Froslass-Mega"],
	},
	froslassmega: {
		num: 478,
		name: "Froslass-Mega",
		baseSpecies: "Froslass",
		forme: "Mega",
		types: ["Ice", "Ghost"],
		baseStats: {hp: 70, atk: 120, def: 70, spa: 120, spd: 70, spe: 130},
		abilities: {0: "Shadow Beacon"},
		weightkg: 27,
		color: "White",
		requiredItem: "Froslassite",
	},
	huntail: {
    	inherit: true,
		types: ["Water", "Dark"],
	},
	gorebyss: {
    	inherit: true,
		types: ["Water", "Psychic"],
	},
	luvdisc: {
    	inherit: true,
		types: ["Water", "Fairy"],
		abilities: {0: "Swift Swim", 1: "Mental Health", H: "Regenerator"},
		evos: ["Alomomola"],
	},
	alomomola: {
    	inherit: true,
		types: ["Water", "Fairy"],
		abilities: {0: "Swift Swim", 1: "Mental Health", H: "Regenerator"},
		prevo: "Luvdisc",
		evoLevel: 40,
		canHatch: true,
	},
	deoxys: {
    	inherit: true,
		types: ["Psychic", "Poison"],
		baseStats: {hp: 50, atk: 110, def: 110, spa: 110, spd: 110, spe: 110},
	},
	deoxysattack: {
    	inherit: true,
		types: ["Psychic", "Poison"],
	},
	deoxysdefense: {
    	inherit: true,
		types: ["Psychic", "Poison"],
	},
	deoxysspeed: {
    	inherit: true,
		types: ["Psychic", "Poison"],
	},
	torterra: {
    	inherit: true,
		baseStats: {hp: 95, atk: 114, def: 110, spa: 66, spd: 85, spe: 64},
	},
	piplup: {
    	inherit: true,
		abilities: {0: "Torrent", H: "Competitive"},
	},
	prinplup: {
    	inherit: true,
		abilities: {0: "Torrent", H: "Competitive"},
	},
	empoleon: {
    	inherit: true,
		baseStats: {hp: 88, atk: 86, def: 88, spa: 111, spd: 101, spe: 60},
		abilities: {0: "Torrent", H: "Competitive"},
	},
	bibarel: {
    	inherit: true,
		baseStats: {hp: 99, atk: 85, def: 60, spa: 75, spd: 60, spe: 81},
	},
	kricketune: {
    	inherit: true,
		types: ["Bug", "Normal"],
		baseStats: {hp: 77, atk: 85, def: 51, spa: 85, spd: 51, spe: 75},
		abilities: {0: "Swarm", 1: "Cacophony", H: "Technician"},
	},
	kricketot: {
    	inherit: true,
		types: ["Bug", "Normal"],
		abilities: {0: "Shed Skin", 1: "Soundproof", H: "Run Away"},
	},
	shinx: {
    	inherit: true,
		abilities: {0: "Strong Jaw", 1: "Intimidate", H: "Guts"},
	},
	luxio: {
    	inherit: true,
		abilities: {0: "Strong Jaw", 1: "Intimidate", H: "Guts"},
	},
	luxray: {
    	inherit: true,
		types: ["Electric", "Dark"],
		baseStats: {hp: 80, atk: 120, def: 79, spa: 95, spd: 79, spe: 80},
		abilities: {0: "Strong Jaw", 1: "Intimidate", H: "Guts"},
	},
	cranidos: {
    	inherit: true,
		types: ["Rock", "Fighting"],
		abilities: {0: "Mold Breaker", 1: "Reckless", H: "Sheer Force"},
	},
	rampardos: {
    	inherit: true,
		types: ["Rock", "Fighting"],
		baseStats: {hp: 97, atk: 165, def: 50, spa: 65, spd: 50, spe: 68},
		abilities: {0: "Mold Breaker", 1: "Reckless", H: "Sheer Force"},
	},
	shieldon: {
    	inherit: true,
		baseStats: {hp: 30, atk: 42, def: 118, spa: 52, spd: 88, spe: 20},
		abilities: {0: "Sturdy", 1: "Solid Rock", H: "Soundproof"},
	},
	bastiodon: {
    	inherit: true,
		baseStats: {hp: 70, atk: 42, def: 158, spa: 62, spd: 138, spe: 20},
		abilities: {0: "Sturdy", 1: "Solid Rock", H: "Soundproof"},
	},
	burmy: {
    	inherit: true,
		abilities: {0: "Shed Skin", 1: "Rattled", H: "Overcoat"},
	},
	wormadam: {
    	inherit: true,
		baseStats: {hp: 70, atk: 69, def: 95, spa: 89, spd: 135, spe: 36},
		abilities: {0: "Anticipation", 1: "Grass Pelt", H: "Overcoat"},
	},
	wormadamsandy: {
    	inherit: true,
		baseStats: {hp: 70, atk: 89, def: 135, spa: 69, spd: 95, spe: 36},
		abilities: {0: "Anticipation", 1: "Sand Force", H: "Overcoat"},
	},
	wormadamtrash: {
    	inherit: true,
		baseStats: {hp: 70, atk: 79, def: 115, spa: 79, spd: 115, spe: 36},
		abilities: {0: "Anticipation", 1: "Light Metal", H: "Overcoat"},
	},
	mothim: {
    	inherit: true,
		baseStats: {hp: 70, atk: 104, def: 60, spa: 104, spd: 60, spe: 86},
		abilities: {0: "Swarm", 1: "Honey Gather", H: "Tinted Lens"},
	},
	combee: {
    	inherit: true,
		abilities: {0: "Healer", 1: "Honey Gather", H: "Hustle"},
	},
	vespiquen: {
    	inherit: true,
		types: ["Bug", "Poison"],
		baseStats: {hp: 70, atk: 90, def: 112, spa: 90, spd: 112, spe: 40},
		abilities: {0: "Royal Presence", 1: "Honey Gather", H: "Intimidate"},
	},
	pachirisu: {
    	inherit: true,
		types: ["Electric", "Grass"],
		baseStats: {hp: 70, atk: 45, def: 90, spa: 55, spd: 90, spe: 95},
		abilities: {0: "Anticipation", 1: "Pickup", H: "Volt Absorb"},
	},
	buizel: {
    	inherit: true,
		abilities: {0: "Swift Swim", 1: "Technician", H: "Water Veil"},
	},
	floatzel: {
    	inherit: true,
		types: ["Water", "Dark"],
		baseStats: {hp: 85, atk: 115, def: 55, spa: 85, spd: 50, spe: 115},
		abilities: {0: "Swift Swim", 1: "Technician", H: "Water Veil"},
	},
	cherrim: {
    	inherit: true,
		types: ["Grass", "Ghost"],
		baseStats: {hp: 70, atk: 80, def: 70, spa: 87, spd: 78, spe: 105},
	},
	cherrimsunshine: {
    	inherit: true,
		types: ["Grass", "Fairy"],
		baseStats: {hp: 70, atk: 80, def: 70, spa: 87, spd: 78, spe: 105},
	},
	drifblim: {
    	inherit: true,
		baseStats: {hp: 150, atk: 80, def: 44, spa: 100, spd: 54, spe: 80},
	},
	mismagius: {
    	inherit: true,
		types: ["Ghost", "Fairy"],
		baseStats: {hp: 60, atk: 60, def: 60, spa: 115, spd: 115, spe: 115},
	},
	honchkrow: {
    	inherit: true,
		types: ["Dark", "Flying"],
		baseStats: {hp: 100, atk: 125, def: 52, spa: 105, spd: 52, spe: 91},
	},
	chingling: {
    	inherit: true,
		types: ["Psychic", "Steel"],
	},
	stunky: {
    	inherit: true,
		abilities: {0: "Stench", 1: "Aftermath", H: "Honey Gather"},
	},
	skuntank: {
    	inherit: true,
		baseStats: {hp: 103, atk: 93, def: 67, spa: 91, spd: 61, spe: 84},
		abilities: {0: "Stench", 1: "Aftermath", H: "Honey Gather"},
	},
	chatot: {
    	inherit: true,
		baseStats: {hp: 76, atk: 65, def: 65, spa: 97, spd: 62, spe: 91},
		abilities: {0: "Keen Eye", 1: "Cacophony", H: "Own Tempo"},
	},
	spiritomb: {
    	inherit: true,
		baseStats: {hp: 54, atk: 108, def: 108, spa: 108, spd: 108, spe: 54},
		abilities: {0: "Seal Away", 1: "Shadow Beacon", H: "Infiltrator"},
	},
	drapion: {
    	inherit: true,
		otherFormes: ["Drapion-Mega"],
		formeOrder: ["Drapion", "Drapion-Mega"],
	},
	drapionmega: {
		num: 452,
		name: "Drapion-Mega",
		baseSpecies: "Drapion",
		forme: "Mega",
		types: ["Poison", "Dark"],
		baseStats: {hp: 70, atk: 130, def: 130, spa: 60, spd: 110, spe: 110},
		abilities: {0: "Tough Claws"},
		weightkg: 62,
		color: "Purple",
		requiredItem: "Drapionite",
	},
	toxicroak: {
    	inherit: true,
		baseStats: {hp: 83, atk: 106, def: 65, spa: 86, spd: 65, spe: 95},
	},
	carnivine: {
    	inherit: true,
		baseStats: {hp: 84, atk: 120, def: 82, spa: 90, spd: 82, spe: 46},
	},
	lumineon: {
    	inherit: true,
		baseStats: {hp: 89, atk: 69, def: 89, spa: 89, spd: 89, spe: 109},
	},
	abomasnowmega: {
    	inherit: true,
		baseStats: {hp: 90, atk: 122, def: 90, spa: 132, spd: 90, spe: 70},
	},
	weavile: {
    	inherit: true,
		abilities: {0: "Pressure", 1: "Unnerve", H: "Pickpocket"},
	},
	electivire: {
    	inherit: true,
		types: ["Electric", "Fighting"],
		abilities: {0: "Motor Drive", 1: "Reckless", H: "Vital Spirit"},
	},
	magmortar: {
    	inherit: true,
		types: ["Fire", "Dark"],
		abilities: {0: "Flame Body", 1: "Mega Launcher", H: "Vital Spirit"},
	},
	yanmega: {
    	inherit: true,
		types: ["Bug", "Dragon"],
	},
	leafeon: {
    	inherit: true,
		abilities: {0: "Chlorophyll", H: "Technician"},
	},
	glaceon: {
    	inherit: true,
		abilities: {0: "Ice Body", H: "Magic Guard"},
	},
	gallade: {
    	inherit: true,
		abilities: {0: "Steadfast", 1: "Inner Focus", H: "Justified"},
	},
	gallademega: {
    	inherit: true,
		abilities: {0: "Knight's Blade"},
	},
	rotom: {
    	inherit: true,
		abilities: {0: "Levitate", H: "Download"},
	},
	rotomheat: {
    	inherit: true,
		abilities: {0: "Levitate", H: "Flame Body"},
	},
	rotomwash: {
    	inherit: true,
		abilities: {0: "Levitate", H: "Water Absorb"},
	},
	rotomfrost: {
    	inherit: true,
		abilities: {0: "Levitate", H: "Ice Body"},
	},
	rotommow: {
    	inherit: true,
		abilities: {0: "Levitate", H: "Hyper Cutter"},
	},
	rotomfan: {
    	inherit: true,
		types: ["Electric", "Steel"],
		abilities: {0: "Levitate", H: "Light Metal"},
	},
	uxie: {
    	inherit: true,
		abilities: {0: "Levitate", H: "Oblivious"},
	},
	mesprit: {
    	inherit: true,
		abilities: {0: "Levitate", H: "Vital Spirit"},
	},
	azelf: {
    	inherit: true,
		abilities: {0: "Levitate", H: "Sturdy"},
	},
	phione: {
    	inherit: true,
		types: ["Water", "Fairy"],
		abilities: {0: "Hydration", H: "Pixie Power"},
	},
	manaphy: {
    	inherit: true,
		types: ["Water", "Fairy"],
		abilities: {0: "Hydration", H: "Pixie Power"},
	},
	shayminsky: {
    	inherit: true,
		baseStats: {hp: 100, atk: 100, def: 85, spa: 103, spd: 85, spe: 127},
		abilities: {0: "Cloud Nine"},
	},
	pignite: {
    	inherit: true,
		types: ["Fire", "Rock"],
	},
	emboar: {
    	inherit: true,
		types: ["Fire", "Rock"],
	},
	oshawott: {
    	inherit: true,
		abilities: {0: "Torrent", H: "Knight's Blade"},
	},
	dewott: {
    	inherit: true,
		types: ["Water", "Fighting"],
		abilities: {0: "Torrent", H: "Knight's Blade"},
	},
	samurott: {
    	inherit: true,
		types: ["Water", "Fighting"],
		abilities: {0: "Torrent", H: "Knight's Blade"},
	},
	watchog: {
    	inherit: true,
		types: ["Normal", "Psychic"],
		baseStats: {hp: 60, atk: 105, def: 69, spa: 60, spd: 69, spe: 97},
	},
	simisage: {
    	inherit: true,
		baseStats: {hp: 75, atk: 113, def: 63, spa: 113, spd: 63, spe: 101},
		abilities: {0: "Gluttony", 1: "Own Tempo", H: "Overgrow"},
	},
	simisear: {
    	inherit: true,
		baseStats: {hp: 75, atk: 113, def: 63, spa: 113, spd: 63, spe: 101},
		abilities: {0: "Gluttony", 1: "Soundproof", H: "Blaze"},
	},
	simipour: {
    	inherit: true,
		baseStats: {hp: 75, atk: 113, def: 63, spa: 113, spd: 63, spe: 101},
		abilities: {0: "Gluttony", 1: "Keen Eye", H: "Torrent"},
	},
	musharna: {
    	inherit: true,
		types: ["Psychic", "Fairy"],
		abilities: {0: "Telepathy", 1: "Synchronize", H: "Comatose"},
	},
	swoobat: {
    	inherit: true,
		baseStats: {hp: 77, atk: 57, def: 65, spa: 77, spd: 65, spe: 114},
	},
	audinomega: {
    	inherit: true,
		abilities: {0: "Regenerator"},
	},
	throh: {
    	inherit: true,
		abilities: {0: "Guts", 1: "Sniper", H: "Mold Breaker"},
	},
	leavanny: {
    	inherit: true,
		baseStats: {hp: 75, atk: 103, def: 80, spa: 70, spd: 80, spe: 102},
		abilities: {0: "Swarm", 1: "Chlorophyll", H: "Grass Pelt"},
	},
	darmanitangalarzen: {
    	inherit: true,
		baseStats: {hp: 105, atk: 160, def: 85, spa: 30, spd: 85, spe: 75},
	},
	maractus: {
    	inherit: true,
		baseStats: {hp: 125, atk: 86, def: 67, spa: 116, spd: 67, spe: 60},
		abilities: {0: "Water Absorb", 1: "Iron Barbs", H: "Storm Drain"},
	},
	garbodor: {
    	inherit: true,
		types: ["Poison", "Steel"],
		baseStats: {hp: 80, atk: 95, def: 92, spa: 60, spd: 92, spe: 81},
	},
	cinccino: {
    	inherit: true,
		types: ["Normal", "Fairy"],
		otherFormes: ["Cinccino-Mega"],
		formeOrder: ["Cinccino", "Cinccino-Mega"],
	},
	cinccinomega: {
		num: 573,
		name: "Cinccino-Mega",
		baseSpecies: "Cinccino",
		forme: "Mega",
		types: ["Normal", "Fairy"],
		baseStats: {hp: 75, atk: 126, def: 82, spa: 65, spd: 82, spe: 140},
		abilities: {0: "Fur Coat"},
		weightkg: 15,
		color: "Gray",
		requiredItem: "Cinccinite",
	},
	gothita: {
    	inherit: true,
		abilities: {0: "Mental Health", 1: "Competitive", H: "Shadow Tag"},
	},
	gothorita: {
    	inherit: true,
		abilities: {0: "Mental Health", 1: "Competitive", H: "Shadow Tag"},
	},
	gothitelle: {
    	inherit: true,
		abilities: {0: "Mental Health", 1: "Competitive", H: "Shadow Tag"},
	},
	swanna: {
    	inherit: true,
		baseStats: {hp: 75, atk: 87, def: 73, spa: 87, spd: 73, spe: 108},
	},
	sawsbuck: {
    	inherit: true,
		baseStats: {hp: 80, atk: 110, def: 70, spa: 60, spd: 70, spe: 95},
	},
	emolga: {
    	inherit: true,
		baseStats: {hp: 55, atk: 75, def: 60, spa: 75, spd: 60, spe: 105},
		abilities: {0: "Static", 1: "Motor Drive", H: "Energy Beacon"},
	},
	eelektross: {
    	inherit: true,
		baseStats: {hp: 85, atk: 125, def: 80, spa: 115, spd: 80, spe: 50},
	},
	beartic: {
    	inherit: true,
		types: ["Ice", "Fighting"],
		baseStats: {hp: 95, atk: 130, def: 80, spa: 65, spd: 80, spe: 55},
	},
	accelgor: {
    	inherit: true,
		types: ["Bug", "Dark"],
	},
	mienshao: {
    	inherit: true,
		types: ["Fighting", "Fairy"],
	},
	golett: {
    	inherit: true,
		abilities: {0: "Iron Fist", 1: "Seal Away", H: "No Guard"},
	},
	golurk: {
    	inherit: true,
		abilities: {0: "Iron Fist", 1: "Seal Away", H: "No Guard"},
	},
	bouffalant: {
    	inherit: true,
		abilities: {0: "Reckless", 1: "Sap Sipper", H: "Rock Head"},
	},
	rufflet: {
    	inherit: true,
		types: ["Fighting", "Flying"],
	},
	braviary: {
    	inherit: true,
		types: ["Fighting", "Flying"],
	},
	heatmor: {
    	inherit: true,
		baseStats: {hp: 85, atk: 117, def: 66, spa: 95, spd: 66, spe: 75},
	},
	durant: {
    	inherit: true,
		baseStats: {hp: 58, atk: 109, def: 112, spa: 58, spd: 58, spe: 109},
	},
	hydreigon: {
    	inherit: true,
		otherFormes: ["Hydreigon-Mega"],
		formeOrder: ["Hydreigon", "Hydreigon-Mega"],
	},
	hydreigonmega: {
		num: 635,
		name: "Hydreigon-Mega",
		baseSpecies: "Hydreigon",
		forme: "Mega",
		types: ["Dark", "Dragon"],
		baseStats: {hp: 92, atk: 130, def: 115, spa: 150, spd: 115, spe: 98},
		abilities: {0: "Intimidate"},
		weightkg: 160,
		color: "Black",
		requiredItem: "Hydreigonite",
	},
	cobalion: {
    	inherit: true,
		abilities: {0: "Justified", H: "Knight's Blade"},
	},
	terrakion: {
    	inherit: true,
		abilities: {0: "Justified", H: "Knight's Blade"},
	},
	virizion: {
    	inherit: true,
		abilities: {0: "Justified", H: "Knight's Blade"},
	},
	keldeo: {
    	inherit: true,
		abilities: {0: "Justified", H: "Knight's Blade"},
	},
	talonflame: {
    	inherit: true,
		otherFormes: ["Talonflame-Mega"],
		formeOrder: ["Talonflame", "Talonflame-Mega"],
	},
	talonflamemega: {
		num: 663,
		name: "Talonflame-Mega",
		baseSpecies: "Talonflame",
		forme: "Mega",
		types: ["Fire", "Flying"],
		baseStats: {hp: 78, atk: 132, def: 81, spa: 74, spd: 94, spe: 140},
		abilities: {0: "Reckless"},
		weightkg: 25,
		color: "Red",
		requiredItem: "Talonflite",
	},
	pyroar: {
    	inherit: true,
		abilities: {0: "Rivalry", 1: "Demotivate", H: "Cacophony"},
	},
	flabebe: {
    	inherit: true,
		abilities: {0: "Pixie Power", 1: "Flower Veil", H: "Symbiosis"},
	},
	floette: {
    	inherit: true,
		abilities: {0: "Pixie Power", 1: "Flower Veil", H: "Symbiosis"},
	},
	floetteeternal: {
    	inherit: true,
		abilities: {0: "Pixie Power"},
	},
	florges: {
    	inherit: true,
		abilities: {0: "Pixie Power", 1: "Flower Veil", H: "Symbiosis"},
	},
	furfrou: {
    	inherit: true,
		baseStats: {hp: 83, atk: 80, def: 60, spa: 65, spd: 90, spe: 102},
	},
	meowstic: {
    	inherit: true,
		baseStats: {hp: 74, atk: 68, def: 76, spa: 81, spd: 93, spe: 124},
	},
	meowsticf: {
    	inherit: true,
		baseStats: {hp: 74, atk: 76, def: 68, spa: 93, spd: 81, spe: 124},
	},
	honedge: {
    	inherit: true,
		abilities: {0: "No Guard", H: "Knight's Blade"},
	},
	doublade: {
    	inherit: true,
		abilities: {0: "No Guard", H: "Knight's Blade"},
	},
	spritzee: {
    	inherit: true,
		types: ["Fairy", "Poison"],
	},
	aromatisse: {
    	inherit: true,
		types: ["Fairy", "Poison"],
		baseStats: {hp: 110, atk: 72, def: 79, spa: 99, spd: 89, spe: 29},
	},
	malamar: {
    	inherit: true,
		baseStats: {hp: 86, atk: 92, def: 88, spa: 88, spd: 75, spe: 73},
		otherFormes: ["Malamar-Mega"],
		formeOrder: ["Malamar", "Malamar-Mega"],
	},
	malamarmega: {
		num: 687,
		name: "Malamar-Mega",
		baseSpecies: "Malamar",
		forme: "Mega",
		types: ["Dark", "Psychic"],
		baseStats: {hp: 86, atk: 122, def: 98, spa: 118, spd: 85, spe: 93},
		abilities: {0: "Download"},
		weightkg: 47,
		color: "Black",
		requiredItem: "Malamarite",
	},
	aurorus: {
    	inherit: true,
		baseStats: {hp: 123, atk: 62, def: 77, spa: 101, spd: 90, spe: 68},
	},
	goodra: {
    	inherit: true,
		types: ["Dragon", "Water"],
	},
	klefki: {
    	inherit: true,
		abilities: {0: "Prankster", 1: "Seal Away", H: "Magician"},
	},
	trevenant: {
    	inherit: true,
		baseStats: {hp: 105, atk: 116, def: 86, spa: 65, spd: 82, spe: 56},
	},
	gourgeist: {
    	inherit: true,
		baseStats: {hp: 65, atk: 100, def: 122, spa: 58, spd: 75, spe: 90},
		abilities: {0: "Intimidate", 1: "Frisk", H: "Flare Boost"},
	},
	gourgeistsmall: {
    	inherit: true,
		baseStats: {hp: 55, atk: 95, def: 122, spa: 58, spd: 75, spe: 105},
		abilities: {0: "Intimidate", 1: "Frisk", H: "Flare Boost"},
	},
	gourgeistlarge: {
    	inherit: true,
		baseStats: {hp: 75, atk: 105, def: 122, spa: 58, spd: 75, spe: 75},
		abilities: {0: "Intimidate", 1: "Frisk", H: "Flare Boost"},
	},
	gourgeistsuper: {
    	inherit: true,
		baseStats: {hp: 85, atk: 110, def: 122, spa: 58, spd: 75, spe: 60},
		abilities: {0: "Intimidate", 1: "Frisk", H: "Flare Boost"},
	},
	avalugg: {
    	inherit: true,
		abilities: {0: "Anticipation", 1: "Sturdy", H: "Ice Body"},
	},
	noibat: {
    	inherit: true,
		abilities: {0: "Frisk", 1: "Infiltrator", H: "Cacophony"},
	},
	noivern: {
    	inherit: true,
		abilities: {0: "Frisk", 1: "Infiltrator", H: "Cacophony"},
	},
	hoopa: {
    	inherit: true,
		abilities: {0: "Magician", H: "Seal Away"},
	},
	hoopaunbound: {
    	inherit: true,
		abilities: {0: "Magician", H: "Cursed Body"},
	},
	volcanion: {
    	inherit: true,
		abilities: {0: "Water Absorb", H: "Mega Launcher"},
	},
	rowlet: {
    	inherit: true,
		baseStats: {hp: 48, atk: 65, def: 55, spa: 50, spd: 42, spe: 60},
	},
	dartrix: {
    	inherit: true,
		baseStats: {hp: 58, atk: 85, def: 70, spa: 70, spd: 52, spe: 85},
	},
	decidueye: {
    	inherit: true,
		baseStats: {hp: 78, atk: 107, def: 75, spa: 100, spd: 70, spe: 100},
	},
	pikipek: {
    	inherit: true,
		abilities: {0: "Cacophony", 1: "Skill Link", H: "Sheer Force"},
	},
	trumbeak: {
    	inherit: true,
		abilities: {0: "Cacophony", 1: "Skill Link", H: "Sheer Force"},
	},
	toucannon: {
    	inherit: true,
		baseStats: {hp: 95, atk: 120, def: 75, spa: 75, spd: 75, spe: 60},
		abilities: {0: "Cacophony", 1: "Skill Link", H: "Sheer Force"},
	},
	gumshoos: {
    	inherit: true,
		baseStats: {hp: 100, atk: 110, def: 75, spa: 55, spd: 75, spe: 45},
	},
	crabominable: {
    	inherit: true,
		baseStats: {hp: 97, atk: 132, def: 97, spa: 62, spd: 87, spe: 43},
	},
	oricorio: {
    	inherit: true,
		abilities: {0: "Dancer", H: "Serene Grace"},
	},
	oricoriopompom: {
    	inherit: true,
		abilities: {0: "Dancer", H: "Serene Grace"},
	},
	oricoriopau: {
    	inherit: true,
		abilities: {0: "Dancer", H: "Serene Grace"},
	},
	oricoriosensu: {
    	inherit: true,
		abilities: {0: "Dancer", H: "Serene Grace"},
	},
	lycanroc: {
    	inherit: true,
		types: ["Rock", "Normal"],
		abilities: {0: "Keen Eye", 1: "Sand Rush", H: "No Guard"},
	},
	lycanrocmidnight: {
    	inherit: true,
		types: ["Rock", "Dark"],
		baseStats: {hp: 105, atk: 115, def: 65, spa: 55, spd: 65, spe: 82},
		abilities: {0: "Keen Eye", 1: "Sand Rush", H: "No Guard"},
	},
	lycanrocdusk: {
    	inherit: true,
		types: ["Rock", "Fighting"],
	},
	shiinotic: {
    	inherit: true,
		otherFormes: ["Shiinotic-Mega"],
		formeOrder: ["Shiinotic", "Shiinotic-Mega"],
	},
	shiinoticmega: {
		num: 756,
		name: "Shiinotic-Mega",
		baseSpecies: "Shiinotic",
		forme: "Mega",
		types: ["Grass", "Fairy"],
		baseStats: {hp: 60, atk: 45, def: 110, spa: 130, spd: 140, spe: 20},
		abilities: {0: "Triage"},
		weightkg: 12,
		color: "Purple",
		requiredItem: "Shiinotite",
	},
	bewear: {
    	inherit: true,
		otherFormes: ["Bewear-Mega"],
		formeOrder: ["Bewear", "Bewear-Mega"],
	},
	bewearmega: {
		num: 760,
		name: "Bewear-Mega",
		baseSpecies: "Bewear",
		forme: "Mega",
		types: ["Normal", "Fighting"],
		baseStats: {hp: 120, atk: 155, def: 120, spa: 55, spd: 90, spe: 60},
		abilities: {0: "Prankster"},
		weightkg: 135,
		color: "Pink",
		requiredItem: "Bewearite",
	},
	tsareena: {
    	inherit: true,
		abilities: {0: "Leaf Guard", 1: "Royal Presence", H: "Sweet Veil"},
	},
	comfey: {
    	inherit: true,
		baseStats: {hp: 52, atk: 51, def: 90, spa: 92, spd: 110, spe: 100},
	},
	sandygast: {
    	inherit: true,
		abilities: {0: "Water Compaction", 1: "Sand Veil", H: "Regenerator"},
	},
	palossand: {
    	inherit: true,
		abilities: {0: "Water Compaction", 1: "Sand Veil", H: "Regenerator"},
	},
	typenull: {
    	inherit: true,
		abilities: {0: "Battle Armor", H: "Seal Away"},
	},
	nihilego: {
    	inherit: true,
		abilities: {0: "Beast Boost", H: "Levitate"},
	},
	buzzwole: {
    	inherit: true,
		abilities: {0: "Beast Boost", H: "Iron Fist"},
	},
	pheromosa: {
    	inherit: true,
		abilities: {0: "Beast Boost", H: "Dazzling"},
	},
	xurkitree: {
    	inherit: true,
		types: ["Electric", "Grass"],
		abilities: {0: "Beast Boost", H: "Lightning Rod"},
	},
	celesteela: {
    	inherit: true,
		abilities: {0: "Beast Boost", H: "Heavy Metal"},
	},
	kartana: {
    	inherit: true,
		abilities: {0: "Beast Boost", H: "Knight's Blade"},
	},
	guzzlord: {
    	inherit: true,
		abilities: {0: "Beast Boost", H: "Thick Fat"},
	},
	poipole: {
    	inherit: true,
		abilities: {0: "Beast Boost", H: "Sniper"},
	},
	naganadel: {
    	inherit: true,
		abilities: {0: "Beast Boost", H: "Sniper"},
	},
	stakataka: {
    	inherit: true,
		abilities: {0: "Beast Boost", H: "Bulletproof"},
	},
	blacephalon: {
    	inherit: true,
		abilities: {0: "Beast Boost", H: "Aftermath"},
	},

};
