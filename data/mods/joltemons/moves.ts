export const Moves: {[k: string]: ModdedMoveData} = {
	toxicthread: {
		num: 672,
		accuracy: 90,
		basePower: 0,
		category: "Status",
    shortDesc: "Badly poisons and lowers the target's Speed by 2",
		isViable: true,
		isNonstandard: null,
		name: "Toxic Thread",
		pp: 20,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1},
		status: 'tox',
		boosts: {
			spe: -2,
		},
		secondary: null,
		target: "normal",
		type: "Poison",
		zMove: {boost: {spe: 1}},
		contestType: "Tough",
	},
 	meltdown: {
		accuracy: 100,
		basePower: 80,
		category: "Special",
    shortDesc: "Replaces the user's Ice-type with Water. 1.5x power when used by Ice-types.",
		name: "Meltdown",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, defrost: 1},
 		onPrepareHit: function(target, source, move) {
		  this.attrLastMove('[still]');
		  this.add('-anim', source, "Scald", target);
		  this.add('-anim', source, "Acid Armor", target);
		},
		onBasePower(basePower, pokemon, target) {
			if (pokemon.type === 'Ice') {
				return this.chainModify(1.5);
			}
		},
		self: {
			onHit(pokemon) {
				pokemon.setType(pokemon.getTypes(true).map(type => type === "Ice" ? "Water" : type));
				this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[from] move: Meltdown');
			},
		},
		secondary: null,
		target: "normal",
		type: "Water",
		contestType: "Clever",
	},
 	reconstruct: {
		accuracy: true,
		basePower: 0,
		category: "Status",
    shortDesc: "Charges turn 1. Heals 50% and resets lowered stats turn 2.",
		name: "Reconstruct",
		pp: 10,
		priority: 0,
		flags: {charge: 1, heal: 1},
 		heal: [1, 2],
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name);
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
		self: {
			onHit(pokemon) {
				const boosts: SparseBoostsTable = {};
				let i: BoostName;
				for (i in pokemon.boosts) {
					if (pokemon.boosts[i] < 0) {
						boosts[i] = 0;
					}
				}
				pokemon.setBoost(boosts);
				this.add('-clearnegativeboost', pokemon, '[silent]');
				this.add('-message', pokemon.name + "'s negative stat changes were removed!");
	    },
		},
		secondary: null,
		target: "self",
		type: "Steel",
	},
 	focusblast: {
		num: 411,
		accuracy: 70,
		basePower: 120,
		category: "Special",
    shortDesc: "10% chance to lower the foe's SpD. Never misses if the user moves last.",
		name: "Focus Blast",
		pp: 5,
		priority: 0,
		flags: {bullet: 1, protect: 1, mirror: 1},
		onModifyMove(move, target) {
			if (target.newlySwitched || !this.queue.willMove(target)) move.accuracy = true;
		},
		secondary: {
			chance: 10,
			boosts: {
				spd: -1,
			},
		},
		target: "normal",
		type: "Fighting",
		contestType: "Cool",
	},
	aridabsorption: {
		accuracy: true,
		basePower: 0,
		category: "Status",
    shortDesc: "(Non-functional placeholder, Currently a Life Dew clone)",
		name: "Arid Absorption",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1},
 		onPrepareHit: function(target, source, move) {
		  this.attrLastMove('[still]');
		  this.add('-anim', source, "Shore Up", target);
		},
		heal: [1, 4],
		secondary: null,
		target: "self",
		type: "Ground",
	},
};
