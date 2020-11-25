"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; } const Moves = {
	"sheepiousrend": {
		num: 755,
		accuracy: 100,
		basePower: 85,
		basePowerCallback(pokemon, target, move) {
			if (target.newlySwitched || this.queue.willMove(target)) {
				this.debug('Sheepious Rend damage boost');
				return move.basePower * 2;
			}
			this.debug('Sheepious Rend NOT boosted');
			return move.basePower;
		},
		category: "Physical",
		desc: "If the user moves before the target, this move's power is doubled.",
		shortDesc: "Double power if the user moves first.",
		id: "sheepiousrend",
		isViable: true,
		name: "Sheepious Rend",
		pp: 10,
		priority: 0,
		flags: {bite: 1, contact: 1, protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Normal",
	},
	"scopein": {
		num: 489,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Raises the user's Accuracy, Speed, and applies Focus Energy.",
		shortDesc: "Raises the user's Accuracy, Speed, and applies Focus Energy.",
		id: "scopein",
		isViable: true,
		name: "Scope-In",
		pp: 20,
		priority: 0,
		flags: {snatch: 1},
		boosts: {
			spe: 1,
			accuracy: 1,
		},
		self: {
			onHit(source) {
				for (let pokemon of source.side.active) {
					pokemon.addVolatile('focusenergy');
				}
			},
		},
		secondary: null,
		target: "self",
		type: "Poison",
		zMoveEffect: 'clearnegativeboost',
		contestType: "Tough",
	},
	"gravity": {
		num: 356,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "For 5 turns, the evasiveness of all active Pokemon is multiplied by 0.6. At the time of use, Bounce, Fly, Magnet Rise, Sky Drop, and Telekinesis end immediately for all active Pokemon. During the effect, Bounce, Fly, Flying Press, High Jump Kick, Jump Kick, Magnet Rise, Sky Drop, Splash, and Telekinesis are prevented from being used by all active Pokemon. Ground-type attacks, Spikes, Toxic Spikes, Sticky Web, and the Arena Trap Ability can affect Flying types or Pokemon with the Levitate Ability. Fails if this move is already in effect.",
		shortDesc: "For 5 turns, negates all Ground immunities.",
		id: "gravity",
		name: "Gravity",
		pp: 5,
		priority: 0,
		flags: {nonsky: 1},
		pseudoWeather: 'gravity',
		effect: {
			duration: 5,
			durationCallback: function (source, effect) {
				if (effect && effect.effectType === 'Ability') {
					return 8;
				}
				if (source && source.hasItem('metalpowder')) {
					return 8;
				}
				return 5;
			},
			onStart: function () {
				this.add('-fieldstart', 'move: Gravity');
				if ( this.field.effectiveWeather() !== 'none' ) this.field.clearWeather();
				for (const pokemon of this.sides[0].active.concat(this.sides[1].active)) {
					let applies = false;
					if (pokemon.removeVolatile('bounce') || pokemon.removeVolatile('fly')) {
						applies = true;
						this.cancelMove(pokemon);
						pokemon.removeVolatile('twoturnmove');
					}
					if (pokemon.volatiles['skydrop']) {
						applies = true;
						this.cancelMove(pokemon);

						if (pokemon.volatiles['skydrop'].source) {
							this.add('-end', pokemon.volatiles['twoturnmove'].source, 'Sky Drop', '[interrupt]');
						}
						pokemon.removeVolatile('skydrop');
						pokemon.removeVolatile('twoturnmove');
					}
					if (pokemon.volatiles['magnetrise']) {
						applies = true;
						delete pokemon.volatiles['magnetrise'];
					}
					if (pokemon.volatiles['telekinesis']) {
						applies = true;
						delete pokemon.volatiles['telekinesis'];
					}
					if (applies) this.add('-activate', pokemon, 'move: Gravity');
				}
			},
			onModifyAccuracy: function (accuracy) {
				if (typeof accuracy !== 'number') return;
				return accuracy * 5 / 3;
			},
			onDisableMove: function (pokemon) {
				for (const moveSlot of pokemon.moveSlots) {
					if (this.dex.getMove(moveSlot.id).flags['gravity']) {
						pokemon.disableMove(moveSlot.id);
					}
				}
			},
			// groundedness implemented in battle.engine.js:BattlePokemon#isGrounded
			onBeforeMovePriority: 6,
			onBeforeMove: function (pokemon, target, move) {
				if (move.flags['gravity']) {
					this.add('cant', pokemon, 'move: Gravity', move);
					return false;
				}
			},
			onResidualOrder: 22,
			onEnd: function () {
				this.add('-fieldend', 'move: Gravity');
			},
		},
		secondary: null,
		target: "all",
		type: "Psychic",
		zMoveBoost: {spa: 1},
		contestType: "Clever",
	},

	"petalblast": {
        num: 585.5,
        accuracy: 100,
        basePower: 95,
        category: "Special",
        desc: "Has a 30% chance to lower the target's Special Attack by 1 stage.",
        shortDesc: "30% chance to lower the target's Sp. Atk by 1.",
        id: "petalblast",
        isViable: true,
        name: "Petal Blast",
        pp: 15,
        priority: 0,
        flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Petal Dance", target);
		},
        secondary: {
            chance: 30,
            boosts: {
                spa: -1,
            },
        },
        target: "normal",
        type: "Dragon",
        zMovePower: 175,
    },
    "viciousmockery": {
        num: 691.5,
        accuracy: 100,
        basePower: 110,
        category: "Special",
        desc: "Lowers the user's Special Attack by 1 stage.",
        shortDesc: "Lowers the user's Special Attack by 1.",
        id: "viciousmockery",
        isViable: true,
        name: "Vicious Mockery",
        pp: 5,
        priority: 0,
        flags: {protect: 1, mirror: 1, sound: 1, authentic: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Torment", target);
		},
        selfBoost: {
            boosts: {
                spa: -1,
            },
        },
        secondary: null,
        target: "allAdjacentFoes",
        type: "Dark",
        zMovePower: 185,
    },
    "venostrike": {
        num: 474,
        accuracy: 100,
        basePower: 65,
        category: "Special",
        desc: "Power doubles if the target has a negative stat change.",
        shortDesc: "Power doubles if the target has a negative stat change.",
        id: "venostrike",
        name: "Venostrike",
        pp: 10,
        priority: 0,
        flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Cross Poison", target);
		},
        onBasePowerPriority: 4,
        onBasePower: function (basePower, pokemon, target) {
			let negativeBoosts = false;
			for (const stat of ['atk', 'def', 'spa', 'spd', 'spe']) {
				if ( target.boosts[ stat ] < 0 ) negativeBoosts = true;
			}
			if ( negativeBoosts === true) {
                return this.chainModify(2);
            }
        },
        secondary: null,
        target: "normal",
        type: "Poison",
        zMovePower: 120,
    },
	"cactusattack": {
		num: 389,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		desc: "Fails if the target did not select a physical attack, special attack, or Me First for use this turn, or if the target moves before the user.",
		shortDesc: "Usually goes first. Fails if target is not attacking.",
		id: "cactusattack",
		isViable: true,
		name: "Cactus Attack",
		pp: 5,
		priority: 1,
		flags: {contact: 1, protect: 1, mirror: 1},
		onTry(source, target) {
			const action = this.queue.willMove(target);
			const move = _optionalChain([action, 'optionalAccess', _ => _.choice]) === 'move' ? action.move : null;
			if (!move || (move.category === 'Status' && move.id !== 'mefirst') || target.volatiles.mustrecharge) {
				this.add('-fail', source);
				this.attrLastMove('[still]');
				return null;
			}
		},
		secondary: null,
		target: "normal",
		type: "Grass",
		zMovePower: 140,
		contestType: "Clever",
	},
	"venomslam": {
		num: 690,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		desc: "If the user is hit by a contact move this turn before it can execute this move, the attacker is badly poisoned.",
		shortDesc: "Badly Poisons on contact with the user before it moves.",
		id: "venomslam",
		isViable: true,
		name: "Venom Slam",
		pp: 15,
		priority: -3,
		flags: {bullet: 1, protect: 1},
		beforeTurnCallback: function (pokemon) {
			pokemon.addVolatile('venomslam');
		},
		effect: {
			duration: 1,
			onStart: function ( pokemon, source, move ) {
				this.add('-singleturn', pokemon, 'move: Venom Slam');
			},
			onHit: function (pokemon, source, move) {
				if (move.flags['contact']) {
					source.trySetStatus('tox', pokemon);
				}
			},
		},
		onMoveAborted: function (pokemon) {
			pokemon.removeVolatile('venomslam');
		},
		onAfterMove: function (pokemon) {
			pokemon.removeVolatile('venomslam');
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Poison Jab", target);
		},
		secondary: null,
		target: "normal",
		type: "Poison",
		zMovePower: 180,
		contestType: "Tough",
	},
	 "titaniatears": {
        num: 500,
        accuracy: 100,
        basePower: 20,
        basePowerCallback: function (pokemon, target, move) {
            return move.basePower + 20 * pokemon.positiveBoosts();
        },
        category: "Special",
        desc: "Power is equal to 20+(X*20), where X is the user's total stat stage changes that are greater than 0.",
        shortDesc: " + 20 power for each of the user's stat boosts.",
        id: "titaniatears",
        name: "Titania Tears",
        pp: 10,
        priority: 0,
        flags: {protect: 1, mirror: 1},
        secondary: null,
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Fake Tears", target);
		},
        target: "normal",
        type: "Fairy",
        zMovePower: 160,
        contestType: "Clever",
    },
	"diamonddagger": {
        num: 348,
        accuracy: 85,
        basePower: 95,
        category: "Special",
        desc: "Has a higher chance for a critical hit.",
        shortDesc: "High critical hit ratio.",
        id: "diamonddagger",
        isViable: true,
        name: "Diamond Dagger",
        pp: 5,
        priority: 0,
        flags: {protect: 1, mirror: 1},
        critRatio: 2,
        secondary: null,
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Slash", target);
		},
        target: "normal",
        type: "Rock",
        zMovePower: 175,
        contestType: "Cool",
    },
}; exports.Moves = Moves;