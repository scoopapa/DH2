export const Moves: {[k: string]: ModdedMoveData} = {
	dreameater: {
		num: 138,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		shortDesc: "User recovers 50% of the damage dealt.",
    	viable: true,
		name: "Dream Eater",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, heal: 1, metronome: 1},
		drain: [1, 2],
		secondary: null,
		target: "normal",
		type: "Ghost",
		contestType: "Clever",
	},
	pinmissile: {
		num: 42,
		accuracy: 90,
		basePower: 37,
		category: "Physical",
		shortDesc: "High critical hit ratio.",
		name: "Pin Missile",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		critRatio: 2,
		secondary: null,
		target: "normal",
		type: "Bug",
		zMove: {basePower: 140},
		maxMove: {basePower: 130},
		contestType: "Cool",
	},
	razorwind: {
		num: 13,
		accuracy: 90,
		basePower: 75,
		category: "Physical",
		shortDesc: "No additional effect.",
		isNonstandard: null,
		name: "Razor Wind",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Flying",
		contestType: "Cool",
	},
	bind: {
		inherit: true,
		accuracy: 75,
		basePower: 35,
		pp: 35,
		ignoreImmunity: true,
		volatileStatus: 'partiallytrapped',
		self: {
			volatileStatus: 'partialtrappinglock',
		},
		onHit(target, source) {
			if (target.volatiles['partiallytrapped']) {
				if (source.volatiles['partialtrappinglock'] && source.volatiles['partialtrappinglock'].duration > 1) {
					target.volatiles['partiallytrapped'].duration = 2;
				}
			}
		},
		type: "Rock",
	},
	petaldance: {
		num: 80,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		shortDesc: "No additional effect.",
		name: "Petal Dance",
		pp: 14,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, dance: 1, metronome: 1},
		secondary: null,
		target: "randomNormal",
		type: "Grass",
		contestType: "Beautiful",
	},
	primalcry: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Heals the user by 50% of its max HP.",
		name: "Primal Cry",
		pp: 5,
		priority: 0,
		flags: {snatch: 1, heal: 1, metronome: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Roost", target);
		},
		onHit(target) {
			if (target.hp === target.maxhp) return false;
			// Fail when health is 255 or 511 less than max, unless it is divisible by 256
			if (
				target.hp === target.maxhp ||
				((target.hp === (target.maxhp - 255) || target.hp === (target.maxhp - 511)) && target.hp % 256 !== 0)
			) {
				this.hint(
					"In Gen 1, recovery moves fail if (user's maximum HP - user's current HP + 1) is divisible by 256, " +
					"unless the current hp is also divisible by 256."
				);
				return false;
			}
			this.heal(Math.floor(target.maxhp / 2), target, target);
		},
		target: "self",
		type: "Dragon",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Clever",
    gen: 1,
	},
	willowisp: {
		num: 261,
		shortDesc: "Burns the foe.",
		accuracy: 85,
		basePower: 0,
		category: "Status",
		name: "Will-O-Wisp",
		pp: 20,
		priority: 0,
		flags: {},
		status: 'brn',
		secondary: null,
		target: "normal",
		type: "Fire",
		contestType: "Beautiful",
		gen: 1,
	},
	ioncannon: {
		accuracy: 100,
		basePower: 110,
		category: "Special",
		shortDesc: "No additional effect.",
		name: "Ion Cannon",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hyper Beam", target);
		},
		secondary: null,
		target: "normal",
		type: "Electric",
		contestType: "Beautiful",
		gen: 1,
	},
	avalanche: {
		num: 419,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		shortDesc: "No additional effect.",
		name: "Avalanche",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		secondary: null,
		target: "normal",
		type: "Rock",
		contestType: "Beautiful",
		gen: 1,
	},
	smog: {
		num: 123,
		accuracy: 100,
		basePower: 75,
		category: "Special",
		shortDesc: "33% chance to burn the foe.",
		name: "Smog",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		secondary: {
			chance: 33,
			status: 'brn',
		},
		target: "normal",
		type: "Electric",
		contestType: "Tough",
	},
	nastygoo: {
		accuracy: 100,
		basePower: 75,
		category: "Special",
		shortDesc: "33% chance to paralyze the foe.",
		name: "Nasty Goo",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Sludge Bomb", target);
		},
		secondary: {
			chance: 33,
			status: 'par',
		},
		target: "normal",
		type: "Electric",
		contestType: "Tough",
		gen: 1,
	},
};
