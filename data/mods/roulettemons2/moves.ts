export const Moves: {[k: string]: ModdedMoveData} = {
	attackjumpkick: {
		num: 9001,
		accuracy: 90,
		basePower: 115,
		category: "Physical",
		name: "Attack Jump Kick",
		pp: 30,
		priority: 0,
		flags: {protect: 1, snatch: 1},
		boosts: {
			atk: 1,
		},
		secondary: null,
		target: "normal",
		type: "Fighting",
	},

  milkslide: {
		num: 9002,
		accuracy: 100,
		basePower: 130,
		category: "Physical",
		name: "Milk Slide",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, nonsky: 1},
		secondary: {
			chance: 30,
			status: 'par',
		},
		target: "normal",
		type: "Flying",
	},

  trumpbell: {
		num: 9003,
		accuracy: 100,
		basePower: 70,
		basePowerCallback(pokemon, target, move) {
			return move.basePower + 20 * pokemon.positiveBoosts();
		},
		category: "Physical",
		name: "Trump Bell",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Bug",
	},
};
