export const Moves: {[k: string]: ModdedMoveData} = {
	//Template
	/*movename: {
		num: 0,
		accuracy: 100,
		basePower: 30,
		category: "Physical""Special""Status",
		name: "MoveName",
		desc: "Full move description.",
		shortDesc: "Move effects.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		[multihit: 3,]
		secondary: null,
		target: "normal",
		type: "Normal",
	},*/

	//New signature moves by National Dex order
	//Venusaur
	greatflower: {
		num: 0,
		accuracy: true,
		basePower: 100,
		category: "Special",
		name: "Great Flower",
		desc: "The user gathers energy from its flower to attack with immense power. This move never misses.",
		shortDesc: "Hits adjacent foes, Bypasses accuracy check.",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Grass",
	},
	//Charizard
	greatflame: {
		num: 0,
		accuracy: true,
		basePower: 100,
		category: "Special",
		name: "Great Flame",
		desc: "The user focuses its power over fire and releases a huge blazing breath. This move never misses.",
		shortDesc: "Hits adjacent foes, Bypasses accuracy check.",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Fire",
	},
	//Blastoise
	greatflood: {
		num: 0,
		accuracy: true,
		basePower: 100,
		category: "Special",
		name: "Great Flood",
		desc: "The user launches gallions of water at its foes using its cannons. This move never misses.",
		shortDesc: "Hits adjacent foes, Bypasses accuracy check.",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Water",
	},
	//Dugtrio
	//Dugtrio-Alola
	tripledig: {
		num: 0,
		accuracy: 95,
		basePower: 30,
		category: "Physical",
		name: "Triple Dig",
		desc: "The user performs a well timed triple attack, hitting the target from below three times in a row.",
		shortDesc: "Hits 3 times.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		multihit: 3,
		secondary: null,
		target: "normal",
		type: "Ground",
	},
};
