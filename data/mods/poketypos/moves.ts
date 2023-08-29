/*
List of flags and their descriptions:
authentic: Ignores a target's substitute.
bite: Power is multiplied by 1.5 when used by a Pokemon with the Strong Jaw Ability.
bullet: Has no effect on Pokemon with the Bulletproof Ability.
charge: The user is unable to make a move between turns.
contact: Makes contact.
dance: When used by a Pokemon, other Pokemon with the Dancer Ability can attempt to execute the same move.
defrost: Thaws the user if executed successfully while the user is frozen.
distance: Can target a Pokemon positioned anywhere in a Triple Battle.
gravity: Prevented from being executed or selected during Gravity's effect.
heal: Prevented from being executed or selected during Heal Block's effect.
mirror: Can be copied by Mirror Move.
mystery: Unknown effect.
nonsky: Prevented from being executed or selected in a Sky Battle.
powder: Has no effect on Grass-type Pokemon, Pokemon with the Overcoat Ability, and Pokemon holding Safety Goggles.
protect: Blocked by Detect, Protect, Spiky Shield, and if not a Status move, King's Shield.
pulse: Power is multiplied by 1.5 when used by a Pokemon with the Mega Launcher Ability.
punch: Power is multiplied by 1.2 when used by a Pokemon with the Iron Fist Ability.
recharge: If this move is successful, the user must recharge on the following turn and cannot make a move.
reflectable: Bounced back to the original user by Magic Coat or the Magic Bounce Ability.
snatch: Can be stolen from the original user and instead used by another Pokemon using Snatch.
sound: Has no effect on Pokemon with the Soundproof Ability.
*/

export const Moves: {[moveid: string]: MoveData} = {
// New Moves
	smokeshuriken: {
		num: 301,
		accuracy: 100,
		basePower: 15,
		category: "Special",
		name: "Smoke Shuriken",
		shortDesc: "Usually goes first. Hits 2-5 times in one turn.",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Water Shuriken", target);
		},
		pp: 20,
		priority: 1,
		flags: {protect: 1, mirror: 1},
		multihit: [2, 5],
		secondary: null,
		target: "normal",
		type: "Flying",
		contestType: "Cool",
	},
	drainingfur: {
		num: 302,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Draining Fur",
		shortDesc: "Heals 50% of the damage dealt.",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Drain Punch", target);
		},
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, distance: 1, heal: 1},
		drain: [1, 2],
		secondary: null,
		target: "any",
		type: "Dragon",
		contestType: "Cool",
	},
	combustion: {
		num: 308,
		accuracy: 100,
		basePower: 95,
		basePowerCallback(pokemon, target, move) {
			if (target.status || target.hasAbility('comatose') || target.volatiles['leechseed']) return move.basePower * 1.5;
			return move.basePower;
		},
		category: "Special",
		name: "Combustion",
		shortDesc: "Removes Leech Seed or any Status the target has. If the previous effect activates, this move deals double damage.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onHit(target) {
			if (target.status) target.cureStatus();
		},
		onHit(target, source) {
			if (target.volatiles['leechseed']) target.removeVolatile('leechseed', source);
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Flamethrower", target);
		},
		secondary: null,
		target: "normal",
		type: "Fire",
	},
	trashtalk: {
		num: 311,
		accuracy: 100,
		basePower: 85,
		category: "Special",
		name: "Trash Talk",
		shortDesc: "Prevents the target from using status moves for 1 turn.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, authentic: 1},
 		onPrepareHit(target, source, move) {
		  this.attrLastMove('[still]');
		  this.add('-anim', source, "Confide", target);
		  this.add('-anim', source, "Gunk Shot", target);
		},
		volatileStatus: 'trashtalk',
		condition: {
			duration: 1,
			onStart(target) {
				this.add('-singleturn', target, 'move: Trash Talk');
			},
			onResidualOrder: 12,
			onEnd(target) {
				this.add('-end', target, 'move: Trash Talk');
			},
			onBeforeMovePriority: 5,
			onBeforeMove(attacker, defender, move) {
				if (!move.isZ && !move.isMax && move.category === 'Status' && move.id !== 'mefirst') {
					this.add('cant', attacker, 'move: Trash Talk', move);
					return false;
				}
			},
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Gunk Shot", target);
		},
		secondary: null,
		target: "normal",
		type: "Poison",
		contestType: "Cool",
	},
	dazzlingspin: {
		num: 312,
		accuracy: 100,
		basePower: 30,
		category: "Physical",
		name: "Dazzling Spin",
		shortDesc: "Frees user from hazards/bind/leech; 50% burn.",
		pp: 40,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onAfterHit(target, pokemon) {
			if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
				this.add('-end', pokemon, 'Leech Seed', '[from] move: Rapid Spin', '[of] ' + pokemon);
			}
			const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
			for (const condition of sideConditions) {
				if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
					this.add('-sideend', pokemon.side, this.dex.conditions.get(condition).name, '[from] move: Rapid Spin', '[of] ' + pokemon);
				}
			}
			if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
				pokemon.removeVolatile('partiallytrapped');
			}
		},
		onAfterSubDamage(damage, target, pokemon) {
			if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
				this.add('-end', pokemon, 'Leech Seed', '[from] move: Rapid Spin', '[of] ' + pokemon);
			}
			const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
			for (const condition of sideConditions) {
				if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
					this.add('-sideend', pokemon.side, this.dex.conditions.get(condition).name, '[from] move: Rapid Spin', '[of] ' + pokemon);
				}
			}
			if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
				pokemon.removeVolatile('partiallytrapped');
			}
		},
		secondary: {
			chance: 50,
			status: 'brn',
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Flame Charge", target);
		},
		target: "normal",
		type: "Fire",
		contestType: "Cool",
	},
	tarshot: {
		num: 749,
		accuracy: 100,
		basePower: 60,
		category: "Special",
		name: "Tar Shot",
		shortDesc: "Lowers the target's Speed by 1.",
		pp: 20,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1},
		boosts: {
			spe: -1,
		},
		secondary: null,
		target: "normal",
		type: "Ground",
	},
	runicrebellion: {
		num: 287,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Runic Rebellion",
		shortDesc: "Cures user’s non-volatile status conditions",
		pp: 20,
		priority: 0,
		flags: {snatch: 1},
		self: {
			onHit(pokemon) {
				pokemon.cureStatus();
			},
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Close Combat", target);
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
		zMove: {effect: 'heal'},
		contestType: "Cute",
	},
	tripledive: {
		num: 813,
		accuracy: 95,
		basePower: 30,
		category: "Physical",
		name: "Triple Dive",
		shortDesc: "Hits 3 times. Target: 10% confusion, 20% -1 speed. High crit.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		critRatio: 2,
		multihit: 3,
		secondaries: [
			{
				chance: 20,
				boosts: {
					spe: -1,
				},
			}, {
			   chance: 10,
		   	volatileStatus: 'confusion',
		   },
		],
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Dive", target);
		},
		target: "normal",
		type: "Water",
		zMove: {basePower: 120},
		maxMove: {basePower: 140},
	},
	blazingtorque: {
		num: 896,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Blazing Torque",
		shortDesc: "30% chance to burn the target.",
		pp: 10,
		priority: 0,
		flags: {protect: 1},
		secondary: {
			chance: 30,
			status: 'brn',
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Flare Blitz", target);
		},
		target: "normal",
		type: "Fire",
	},
	wickedtorque: {
		num: 897,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Wicked Torque",
		shortDesc: "30% chance to lower the target's Defense by 1.",
		pp: 10,
		priority: 0,
		flags: {protect: 1},
		secondary: {
			chance: 30,
			boosts: {
				def: -1,
			},
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Lash Out", target);
		},
		target: "normal",
		type: "Dark",
	},
	noxioustorque: {
		num: 898,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		name: "Noxious Torque",
		shortDesc: "30% chance to poison the target.",
		pp: 10,
		priority: 0,
		flags: {protect: 1},
		secondary: {
			chance: 30,
			status: 'psn',
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Poison Jab", target);
		},
		target: "normal",
		type: "Poison",
	},
	combattorque: {
		num: 899,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		name: "Combat Torque",
		shortDesc: "30% chance to paralyze the target.",
		pp: 10,
		priority: 0,
		flags: {protect: 1},
		secondary: {
			chance: 30,
			status: 'par',
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Close Combat", target);
		},
		target: "normal",
		type: "Fighting",
	},
	magicaltorque: {
		num: 900,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		name: "Magical Torque",
		shortDesc: "10% chance to confuse the target.",
		pp: 10,
		priority: 0,
		flags: {protect: 1},
		secondary: {
			chance: 10,
			volatileStatus: 'confusion',
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Play Rough", target);
		},
		target: "normal",
		type: "Fairy",
	},
	athletesfoot: {
		num: 575,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Athlete's Foot",
		shortDesc: "Lowers target's Def and SpA by 1. User switches.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, authentic: 1},
		onHit(target, source, move) {
			const success = this.boost({def: -1, spa: -1}, target, source);
			if (!success && !target.hasAbility('mirrorarmor')) {
				delete move.selfSwitch;
			}
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Dragon Ascent", target);
		},
		selfSwitch: true,
		secondary: null,
		target: "normal",
		type: "Grass",
		zMove: {effect: 'healreplacement'},
		contestType: "Cool",
	},
   longingwails: {
		num: 1000,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		name: "Longing Wails",
      shortDesc: "Prevents the target from selecting the same move for use two turns in a row.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1},
		onHit(pokemon) {
         pokemon.addVolatile('torment');
		},
      onPrepareHit: function(target, source, move) {
         this.attrLastMove('[still]');
         this.add('-anim', source, "Boomburst", target);
		},
		secondary: null,
		target: "normal",
		type: "Dragon",
		contestType: "Cool",
	},

	// modified moves
	doomdesire: {
		inherit: true,
		basePower: 120,
	},
};
