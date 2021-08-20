  
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
};
