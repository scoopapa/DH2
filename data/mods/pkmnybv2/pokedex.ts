  
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
};
