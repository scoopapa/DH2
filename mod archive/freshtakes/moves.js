'use strict';

exports.BattleMovedex = {
	"diamondstorm": {
		num: 591,
		accuracy: 95,
		basePower: 100,
		category: "Special",
		desc: "Has a 50% chance to raise the user's Defense by 2 stages.",
		shortDesc: "50% chance to raise user's Def by 2 for each hit.",
		id: "diamondstorm",
		isViable: true,
		name: "Diamond Storm",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 50,
			self: {
				boosts: {
					def: 2,
				},
			},
		},
		target: "allAdjacentFoes",
		type: "Rock",
		zMovePower: 180,
		contestType: "Beautiful",
	},
};