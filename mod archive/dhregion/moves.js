'use strict';

/**@type {{[k: string]: MoveData}} */
let BattleMovedex = {
"playrough": {
		num: 583,
		accuracy: 90,
		basePower: 100,
		category: "Physical",
		desc: "Has a 10% chance to lower the target's Attack by 1 stage.",
		shortDesc: "10% chance to lower the target's Attack by 1.",
		id: "playrough",
		isViable: true,
		name: "Play Rough",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 10,
			boosts: {
				atk: -1,
			},
		},
		target: "normal",
		type: "Fairy",
		zMovePower: 175,
		contestType: "Cute",
	},
  "pixiemallet": {
		num: 438,
		accuracy: 85,
		basePower: 120,
		category: "Physical",
		shortDesc: "Has a 30% chance to flinch the target.",
		id: "pixiemallet",
		isViable: true,
		name: "Pixie Mallet",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			volatileStatus: 'flinch',
		},
		target: "normal",
		type: "fairy",
		zMovePower: 190,
		contestType: "Tough",
	},
  "electrohorn": {
		num: 435,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		desc: "Has a 30% chance to paralyze the target.",
		shortDesc: "30% chance to paralyze adjacent Pokemon.",
		id: "electrohorn",
		isViable: true,
		name: "Electro Horn",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1},
		secondary: {
			chance: 30,
			status: 'par',
		},
		target: "allAdjacent",
		type: "Electric",
		zMovePower: 160,
		contestType: "Beautiful",
	},
};

exports.BattleMovedex = BattleMovedex;
