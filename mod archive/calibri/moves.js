/*
List of flags and their descriptions:
authentic: Ignores a target's substitute.
bite: Power is multiplied by 1.5 when used by a Pokemon with the Ability Strong Jaw.
bullet: Has no effect on Pokemon with the Ability Bulletproof.
charge: The user is unable to make a move between turns.
contact: Makes contact.
defrost: Thaws the user if executed successfully while the user is frozen.
distance: Can target a Pokemon positioned anywhere in a Triple Battle.
gravity: Prevented from being executed or selected during Gravity's effect.
heal: Prevented from being executed or selected during Heal Block's effect.
mirror: Can be copied by Mirror Move.
nonsky: Prevented from being executed or selected in a Sky Battle.
powder: Has no effect on Grass-type Pokemon, Pokemon with the Ability Overcoat, and Pokemon holding Safety Goggles.
protect: Blocked by Detect, Protect, Spiky Shield, and if not a Status move, King's Shield.
pulse: Power is multiplied by 1.5 when used by a Pokemon with the Ability Mega Launcher.
punch: Power is multiplied by 1.2 when used by a Pokemon with the Ability Iron Fist.
recharge: If this move is successful, the user must recharge on the following turn and cannot make a move.
reflectable: Bounced back to the original user by Magic Coat or the Ability Magic Bounce.
snatch: Can be stolen from the original user and instead used by another Pokemon using Snatch.
sound: Has no effect on Pokemon with the Ability Soundproof.
*/

'use strict';

exports.BattleMovedex = {
    "eradicate": {
		num: 1000,
		accuracy: 65,
		basePower: 145,
		category: "Physical",
		desc: "This move combines Ground in its type effectiveness against the target. Damage doubles and no accuracy check is done if the target has used Minimize while active.",
		shortDesc: "Combines Ground in type effectiveness. 1/4 Recoil.",
		id: "eradicate",
		name: "Eradicate",
		pp: 5,
		flags: {contact: 1, protect: 1, mirror: 1, gravity: 1, distance: 1, nonsky: 1},
	        recoil: [1, 4],
		onEffectiveness: function (typeMod, type, move) {
			return typeMod + this.getEffectiveness('Ground', type);
		},
		priority: 0,
		secondary: false,
		target: "allAdjacent",
		type: "Dragon",
		zMovePower: 200,
		contestType: "Cool",
    },
    "hitandrun": {
		num: 1001,
		accuracy: 90,
		basePower: 95,
		category: "Physical",
		desc: "If this move is successful and the user has not fainted, the user switches out even if it is trapped and is replaced immediately by a selected party member. The user does not switch out if there are no unfainted party members, or if the target switched out using an Eject Button.",
		shortDesc: "Forces user to switch out. 1/8 Recoil.",
		id: "hitandrun",
		isViable: true,
		name: "Hit And Run",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
	        recoil: [1, 8],
	        selfSwitch: true,
		secondary: false,
		target: "normal",
		type: "Normal",
		zMovePower: 135,
		contestType: "Cute",
    },
    "shieldstrike": {
		num: 1002,
		accuracy: false,
		basePower: 75,
		category: "Physical",
		desc: "Doesn't make accuracy check; Guaranteed to hit. Protects the user from critical hits for 1 turn.",
		shortDesc: "Always hits. Blocks critical hits for 2 turns.",
		id: "shieldstrike",
		name: "Shield Strike",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		sideCondition: 'luckychant',
		effect: {
			duration: 1,
			onStart: function (side) {
				this.add('-sidestart', side, 'move: Lucky Chant'); // "Shield strike shielded [side.name]'s team from critical hits!"
			},
			onCriticalHit: false,
			onResidualOrder: 21,
			onResidualSubOrder: 2,
			onEnd: function (side) {
				this.add('-sideend', side, 'move: Lucky Chant'); // "[side.name]'s team's Shield Strike protection wore off!"
			},
		},
		secondary: false,
		target: "normal",
		type: "Fighting",
		zMovePower: 140,
		contestType: "Tough",
    },
    "tundrasweep": {
		num: 1003,
		accuracy: 100,
		basePower: 70,
		category: "Special",
		shortDesc: "Hits all Pokemon. 20% chance to freeze.",
		id: "tundrasweep",
		isViable: true,
		name: "Tundra Sweep",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 20,
			status: 'frz',
		},
		target: "allAdjacent",
		type: "Ice",
		zMovePower: 135,
		contestType: "Beautiful",
    },
    "narrowfang": {
		num: 1004,
		accuracy: 90,
		basePower: 85,
		category: "Physical",
		desc: "Lowers the target's Attack, Special Attack, and Speed by 1 stage if the target is poisoned. Fails if the target is not poisoned.",
		shortDesc: "x1.3 damage if the target is burned.",
		id: "narrowfang",
		name: "Narrow Fang",
		pp: 20,
		priority: 0,
		flags: {protect: 1, contact: 1, mirror: 1},
		onHit: function (target, source, move) {
			if (target.status === 'brn' || target.status === 'brn') {
				return this.chainModify(1.3);
			}
			return false;
		},
		secondary: false,
		target: "normal",
		type: "Steel",
		zMovePower: 140,
		contestType: "Tough",
    },
    "heavysuplex": {
		num: 1005,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		desc: "This move combines Fighting in its type effectiveness against the target. Damage doubles and no accuracy check is done if the target has used Minimize while active.",
		shortDesc: "Combines Fighting in type effectiveness. 1/5 Recoil.",
		id: "heavysuplex",
		name: "Heavy Suplex",
		pp: 10,
		flags: {contact: 1, protect: 1, mirror: 1},
	        recoil: [1, 5],
		onEffectiveness: function (typeMod, type, move) {
			return typeMod + this.getEffectiveness('Fighting', type);
		},
		priority: 0,
		secondary: false,
		target: "allAdjacent",
		type: "Normal",
		zMovePower: 165,
		contestType: "Tough",
    },
    "webbedterrain": {
		num: 1006,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "For 5 turns, the terrain becomes Webbed Terrain. During the effect, the power of Bug-type attacks made by grounded Pokemon is multiplied by 1.5 and grounded Pokemon cannot be paralyzed; Pokemon already pararlyzed are not cured. Camouflage transforms the user into an Bug type, Nature Power becomes X-Scissor, and Secret Power has a 30% chance to cause paralysis. Fails if the current terrain is Webbed Terrain.",
		shortDesc: "5 turns. Grounded: +Bug power, can't be paralyzed.",
		id: "webbedterrain",
		name: "Webbed Terrain",
		pp: 20,
		priority: 0,
		flags: {nonsky: 1},
		terrain: 'webbedterrain',
		effect: {
			duration: 5,
			durationCallback: function (source, effect) {
				if (source && source.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			onSetStatus: function (status, target, source, effect) {
				if (status.id === 'slp' && target.isGrounded() && !target.isSemiInvulnerable()) {
					if (effect.effectType === 'Move' && !effect.secondaries) {
						this.add('-activate', target, 'move: Webbed Terrain');
					}
					return false;
				}
			},
			onTryAddVolatile: function (status, target) {
				if (!target.isGrounded() || target.isSemiInvulnerable()) return;
				if (status.id === 'yawn') {
					this.add('-activate', target, 'move: Webbed Terrain');
					return null;
				}
			},
			onBasePower: function (basePower, attacker, defender, move) {
				if (move.type === 'Bug' && attacker.isGrounded() && !attacker.isSemiInvulnerable()) {
					this.debug('webbed terrain boost');
					return this.chainModify(1.5);
				}
			},
			onStart: function (battle, source, effect) {
				if (effect && effect.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Webbed Terrain', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Webbed Terrain');
				}
			},
			onResidualOrder: 21,
			onResidualSubOrder: 2,
			onEnd: function () {
				this.add('-fieldend', 'move: Webbed Terrain');
			},
		},
		secondary: false,
		target: "all",
		type: "Bug",
		zMoveBoost: {spe: 2},
		contestType: "Clever",
	},
	"malevolantstrike": {
		num: 1007,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		desc: "Has a 50% chance to poison the target.",
		shortDesc: "50% chance to poison the target.",
		id: "malevolantstrke",
		isViable: true,
		name: "Malevolant Strike",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 50,
			status: 'psn',
		},
		target: "normal",
		type: "Dark",
		zMovePower: 165,
		contestType: "Tough",
	},
	"thunderclap": {
		num: 1008,
		accuracy: 100,
		basePower: 135,
		category: "Physical",
		desc: "Paralyzes the user and the opposing Pokemon on use.",
		shortDesc: "Paralyzes the user and the target.",
		id: "thunderclap",
		isViable: true,
		name: "Thunderclap",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 100,
			status: 'par',
		},
		target: "normal",
		type: "Electric",
		zMovePower: 200,
		contestType: "Beautiful",
	},
	"powerbomb": {
		num: 1009,
		accuracy: true,
		basePower: 75,
		category: "Physical",
		desc: "The power of this move is doubled if Stealth Rocks are active on your opponent's side of the field.",
		shortDesc: "Doubled damage with Stealth Rocks active.",
		id: "powerbomb",
		name: "Powerbomb",
		pp: 20,
		priority: 0,
		flags: {bullet: 1, protect: 1, mirror: 1},
		secondary: false,
		target: "normal",
		type: "Steel",
		zMovePower: 135,
		contestType: "Tough",
	},
	"colossalroar": {
		num: 1010,
		accuracy: false,
		basePower: 0,
		category: "Status",
		desc: "Lower's the Attack and SpAttack of all adjacent Pokemon by 4 stages, and requires the user to recharge next turn.",
		shortDesc: "Lowers all target's Atk/SpAtk by 4. Recharge.",
		id: "colossalroar",
		name: "Colossal Roar",
		pp: 5,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, sound: 1, authentic: 1},
		boosts: {
			atk: -4,
			spa: -4,
		},
		secondary: false,
		target: "allAdjacent",
		type: "Dragon",
		zMoveBoost: {atk: 2},
		contestType: "Tough",
	},
	"terrafreeze": {
		num: 1011,
		accuracy: true,
		basePower: 80,
		category: "Special",
		desc: "If Terrafreeze critical hits, it gains a 100% chance to freeze the opponent.",
		shortDesc: "Freezes on critical hit. +1 Priority.",
		id: "terrafreeze",
		name: "Terrafreeze",
		pp: 15,
		priority: 1,
		flags: {},
		onCriticalHit: function (target, source) {
			target.trySetStatus('frz', source);
		},
		secondary: false,
		target: "normal",
		type: "Ice",
		zMoveEffect: 'crit3',
		contestType: "Beautiful",
	},
       
};
	    
