  
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
};
