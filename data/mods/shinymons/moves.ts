export const Moves: import('../../../sim/dex-moves').ModdedMoveDataTable = {
	corrosivejab: {
		num: -1001,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		desc: "Has a 30% chance to poison the target. This move's type effectiveness against Steel is changed to be not very effective no matter what this move's type is. Can poison Steel-types.",
		shortDesc: "30% chance to poison. Not very effective on Steel.",
		name: "Corrosive Jab",
		pp: 20,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1 },
		ignoreImmunity: { 'Poison': true },
		onEffectiveness(typeMod, target, type, move) {
			if (type === 'Steel') return -1;
		},
		secondary: {
			chance: 30,
			status: 'psn',
		},
		target: "normal",
		type: "Poison",
		contestType: "Tough",
	},
	weldingclaw: {
		num: -1002,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		desc: "Always does an additional 1/16th damage.",
		shortDesc: "Always does an additional 1/16th damage.",
		name: "Welding Claw",
		pp: 10,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1 },
		onAfterMove(pokemon, target, move) {
			this.damage(target.baseMaxhp / 16, target, pokemon, this.dex.conditions.get('Welding Claw'));
		},
		target: "normal",
		type: "Electric",
		contestType: "Cool",
	},
	poisonoushug: {
		num: -1003,
		accuracy: 100,
		basePower: 35,
		category: "Special",
		desc: "Lowers the target's Special Attack by 1 stage and badly poisons it.",
		shortDesc: "Lowers the target's Sp. Atk by 1 and toxics it.",
		name: "Poisonous Hug",
		pp: 10,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1 },
		secondary: {
			chance: 100,
			status: 'tox',
			boosts: {
				spa: -2,
			},
		},
		target: "normal",
		type: "Poison",
		contestType: "Tough",
	},
	himalayantraveller: {
		num: -1004,
		accuracy: 100,
		basePower: 150,
		desc: "Power is equal to (user's current HP * 150 / user's maximum HP), rounded down, but not less than 1.",
		shortDesc: "Less power as user's HP decreases.",
		basePowerCallback(pokemon, target, move) {
			const bp = move.basePower * pokemon.hp / pokemon.maxhp;
			this.debug(`BP: ${bp}`);
			return bp;
		},
		category: "Physical",
		name: "Himalayan Traveller",
		pp: 5,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1 },
		secondary: null,
		target: "normal",
		type: "Dark",
		contestType: "Cool",
	},
	gild: { // Talk to Pokerimastari about editing to do something like a Soak effect instead
		num: -1005,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		desc: "Deals damage to the target based on its Defense instead of Special Defense. Has a 100% chance to lower the target's Speed by 1 stage.",
		shortDesc: "Damages target based on Defense, not Sp. Def. -Spe.",
		overrideDefensiveStat: 'def',
		name: "Gild",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1 },
		secondary: {
			chance: 100,
			boosts: {
				spe: -1,
			},
		},
		target: "normal",
		type: "Steel",
		contestType: "Beautiful",
	},
	heatdeath: {
		num: -1006,
		accuracy: 100,
		basePower: 130,
		category: "Physical",
		desc: "Fails unless the user has Desolate Land. If this move is successful, the user's ability becomes Levigtate and if this move is successful and the user is not Terastallized, the user's Fire type becomes typeless as long as it remains active.\n" +
			"\n" +
			"The user thaws out if it is frozen.",
		shortDesc: "Desolate Land &rarr; Levitate; Fire type removed.",
		isNonstandard: "Unobtainable",
		name: "Heat Death",
		pp: 5,
		priority: 0,
		flags: { protect: 1, mirror: 1, defrost: 1, metronome: 1 },
		onTryMove(pokemon, target, move) {
			if (pokemon.hasAbility('Desolate Land')) return;
			this.add('-fail', pokemon, 'move: Heat Death');
			this.attrLastMove('[still]');
			return null;
		},
		self: {
			onHit(pokemon) {
				pokemon.setType(pokemon.getTypes(true).map(type => type === "Fire" ? "???" : type));
				pokemon.setAbility('levitate');
				this.add('-start', pokemon, 'typechange', pokemon.getTypes().join('/'), '[from] move: Heat Death');
			},
		},
		secondary: null,
		target: "normal",
		type: "Fire",
		contestType: "Tough",
	},
	rockslap: {
		num: -1007,
		accuracy: 90,
		basePower: 95,
		category: "Physical",
		desc: "The user recovers 1/2 the HP lost by the target, rounded half up. If Big Root is held by the user, the HP recovered is 1.3x normal, rounded half down.",
		shortDesc: "User recovers 50% of the damage dealt.",
		name: "Rock Slap",
		pp: 10,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, heal: 1, metronome: 1 },
		drain: [1, 2],
		target: "normal",
		type: "Rock",
		contestType: "Tough",
	},
	jawsoflife: {
		num: -1009,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		desc: "The user recovers 1/2 the HP lost by the target, rounded half up. If Big Root is held by the user, the HP recovered is 1.3x normal, rounded half down.",
		shortDesc: "User recovers 50% of the damage dealt.",
		name: "Jaws of Life",
		pp: 10,
		priority: 0,
		flags: { bite: 1, contact: 1, protect: 1, mirror: 1, heal: 1, metronome: 1 },
		drain: [1, 2],
		target: "normal",
		type: "Ghost",
		contestType: "Clever",
	},
	apexclaw: {
		num: -1010,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		desc: "Has a 100% chance to lower the target's Defense by 1 stage.",
		shortDesc: "100% chance to lower the target's Defense by 1.",
		name: "Apex Claw",
		pp: 5,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1 },
		secondary: {
			chance: 100,
			boosts: {
				def: -1,
			},
		},
		target: "normal",
		type: "Rock",
		contestType: "Tough",
	},
	chillingstream: {
		num: -1011,
		accuracy: 90,
		basePower: 70,
		category: "Special",
		desc: "This move's type effectiveness against Fire is changed to be super effective no matter what this move's type is.",
		shortDesc: "Super effective on Fire.",
		name: "Chilling Stream",
		pp: 20,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1 },
		onEffectiveness(typeMod, target, type) {
			if (type === 'Fire') return 1;
		},
		target: "normal",
		type: "Ice",
		contestType: "Beautiful",
	},
	ascension: {
		num: -1012,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Ascension",
		pp: 5,
		priority: 0,
		flags: { snatch: 1, heal: 1, metronome: 1 },
		heal: [1, 2],
		self: {
			volatileStatus: 'telekinesis',
		},
		onHitField(target, source) {
			for (const pokemon of this.getAllActive()) {
				pokemon.addVolatile('telekinesis');
				pokemon.volatiles['telekinesis'].duration = 0;
			}
		},
		secondary: null,
		target: "all",
		type: "Flying",
		zMove: { effect: 'clearnegativeboost' },
		contestType: "Beautiful",
	},
};
