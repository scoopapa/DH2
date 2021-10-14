'use strict';

/**@type {{[k: string]: MoveData}} */
let BattleMovedex = {
"mindtap": {
		num: 577,
		accuracy: 100,
		basePower: 50,
		category: "Special",
		desc: "The user recovers 3/4 the HP lost by the target, rounded half up. If Big Root is held by the user, the HP recovered is 1.3x normal, rounded half down.",
		shortDesc: "User recovers 75% of the damage dealt.",
		id: "mindtap",
		name: "Mind Tap",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, heal: 1},
		drain: [3, 4],
		secondary: null,
		target: "normal",
		type: "Psychic",
		zMovePower: 100,
		contestType: "Cute",
	},
};

exports.BattleMovedex = BattleMovedex;
