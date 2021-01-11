'use strict';

/**@type {{[k: string]: MoveData}} */
let BattleMovedex = {
"flaredash": {
		num: 410,
		accuracy: 100,
		basePower: 40,
		category: "Special",
		desc: "No additional effect.",
		shortDesc: "Usually goes first.",
		id: "flaredash",
		name: "Flare Dash",
		pp: 30,
		priority: 1,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Fire",
		zMovePower: 100,
		contestType: "Cool",
	},
"stingjab": {
		num: 410,
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		desc: "30% chance to paralyze.",
		shortDesc: "30% chance to paralyze.",
		id: "stingjab",
		name: "Sting Jab",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			status: 'par',
		},
		target: "normal",
		type: "Poison",
		zMovePower: 160,
		contestType: "Cool",
	},
};

exports.BattleMovedex = BattleMovedex;
