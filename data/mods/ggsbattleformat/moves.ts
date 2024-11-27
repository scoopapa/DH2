export const Moves: {[k: string]: ModdedMoveData} = {
	tripledig: {
		num: 0,
		accuracy: 95,
		basePower: 30,
		category: "Physical",
		desc: "The user performs a well timed triple attack, hitting the target from below three times in a row.",
		shortDesc: "Contact, Hits 3 times",
		name: "Triple Dig",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		multihit: 3,
		secondary: null,
		target: "normal",
		type: "Ground",
	},
};
