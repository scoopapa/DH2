'use strict';

/**@type {{[k: string]: MoveData}} */
let BattleMovedex = {
	"seasonalstrike": {
		num: 686,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		desc: "This move's type depends on the user's primary type. If the user's primary type is typeless, this move's type is the user's secondary type if it has one, otherwise the added type from Forest's Curse or Trick-or-Treat. This move is typeless if the user's type is typeless alone.",
		shortDesc: "Type varies based on the user's primary type.",
		id: "seasonalstrike",
		isViable: true,
		name: "Seasonal Strike",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, dance: 1},
		onModifyMove: function (move, pokemon) {
			let type = pokemon.types[0];
			if (type === "Bird") type = "???";
			move.type = type;
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		zMovePower: 175,
		contestType: "Beautiful",
	},
"inverseroom": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "For 5 turns, all Pokémon on the field are resistant to normally super-effective types and weak to normally not-very-effective or ineffective types (as in Inverse Battles) ",
		id: "inverseroom",
		name: "Inverse Room",
		pp: 8,
		priority: 0,
		flags: {mirror: 1},
		pseudoWeather: 'inverseroom',
		effect: {
			duration: 5,
			durationCallback: function(source, effect) {
				if (source && source.hasAbility('persistent')) {
					return 7;
				}
				else if (source && source.hasItem('roomextender')) {
					return 8;
				}
				return 5;
			},
			onStart: function(target, source) {
			this.field.removePseudoWeather('trickroom');
			this.field.removePseudoWeather('magicroom');
			this.field.removePseudoWeather('wonderroom');
				this.add('-fieldstart', 'move: Inverse Room', '[of] ' + source);
			},
			onRestart: function (target, source) {
				return null;
			},
			onEffectiveness: function (typeMod, target, type, move) {
			// The effectiveness of Freeze Dry on Water isn't reverted
			if (move && move.id === 'freezedry' && type === 'Water') return;
			if (move && !this.getImmunity(move, type)) return 1;
			return -typeMod;
		},
			onResidualOrder: 23,
			onEnd: function() {
				this.add('-fieldend', 'move: Inverse Room');
			},
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', target, "Sunny Day", source);
		},
		secondary: false,
		target: "all",
		type: "Psychic",
		zMoveBoost: {acc: 1},
	},
	"wonderroom": {
		num: 472,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "For 5 turns, all active Pokemon have their Defense and Special Defense stats swapped. Stat stage changes are unaffected. If this move is used during the effect, the effect ends.",
		shortDesc: "For 5 turns, all Defense and Sp. Def stats switch.",
		id: "wonderroom",
		name: "Wonder Room",
		pp: 10,
		priority: 0,
		flags: {mirror: 1},
		pseudoWeather: 'wonderroom',
		effect: {
			duration: 5,
			durationCallback: function (source, effect) {
				if (source && source.hasAbility('persistent')) {
					this.add('-activate', source, 'ability: Persistent', effect);
					return 7;
				}
				return 5;
			},
			onStart: function (side, source, pokemon) {
				this.add('-fieldstart', 'move: Wonder Room', '[of] ' + source);
			},
			onRestart: function (target, source, pokemon) {
				this.field.removePseudoWeather('wonderroom');
			},
			onModifyMovePriority: 8,
			onModifyMove: function(move, pokemon) {
			if (move.category === 'Physical') {
				move.category = 'Special';
			}
			else if (move.category === 'Physical') {
				move.category = 'Special';
			}
		},
			// Swapping defenses implemented in sim/pokemon.js:Pokemon#calculateStat and Pokemon#getStat // Fix this
			onResidualOrder: 24,
			onEnd: function () {
				this.add('-fieldend', 'move: Wonder Room');
			},
		},
		secondary: null,
		target: "all",
		type: "Psychic",
		zMoveBoost: {spd: 1},
		contestType: "Clever",
	},
	"craftyshield": {
		num: 578,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user and its party members are protected from non-damaging attacks made by other Pokemon, including allies, during this turn. Fails if the user moves last this turn or if this move is already in effect for the user's side.",
		shortDesc: "Protects allies from Status moves this turn.",
		id: "craftyshield",
		name: "Crafty Shield",
		pp: 10,
		priority: 3,
		flags: {},
		sideCondition: 'craftyshield',
		onTryHitSide: function (side, source) {
			return !!this.willAct();
		},
		effect: {
			duration: 3,
			onStart: function (target, source) {
				this.add('-singleturn', source, 'Crafty Shield');
			},
			onTryHitPriority: 3,
			onTryHit: function (target, source, move) {
				if (move && (move.target === 'self' || move.category !== 'Status')) return;
				this.add('-activate', target, 'move: Crafty Shield');
				source.moveThisTurnResult = true;
				return null;
			},
		},
		secondary: null,
		target: "allySide",
		type: "Fairy",
		zMoveBoost: {spd: 1},
		contestType: "Clever",
	},
	"safeguard": {
		inherit: true,
		priority: 1,
	},
	"luckychant": {
		num: 381,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "For 5 turns, the user and its party members cannot be struck by a critical hit. Fails if the effect is already active on the user's side.",
		shortDesc: "For 5 turns, shields user's party from critical hits.",
		id: "luckychant",
		name: "Lucky Chant",
		pp: 30,
		priority: 0,
		flags: {snatch: 1},
		sideCondition: 'luckychant',
		effect: {
			//duration: 5,
			onStart: function (side) {
				this.add('-sidestart', side, 'move: Lucky Chant'); // "The Lucky Chant shielded [side.name]'s team from critical hits!"
			},
			onCriticalHit: false,
			onResidualOrder: 21,
			onResidualSubOrder: 5,
			onEnd: function (side) {
				this.add('-sideend', side, 'move: Lucky Chant'); // "[side.name]'s team's Lucky Chant wore off!"
			},
		},
		secondary: null,
		target: "allySide",
		type: "Normal",
		zMoveBoost: {evasion: 1},
		contestType: "Cute",
	},
	"technoblast": {
		num: 546,
		accuracy: 100,
		basePower: 120,
		category: "Special",
		desc: "This move's type depends on the user's held Drive.",
		shortDesc: "Type varies based on the held Drive.",
		id: "technoblast",
		isViable: true,
		name: "Techno Blast",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyMove: function (move, pokemon) {
			move.type = this.runEvent('Drive', pokemon, null, 'technoblast', 'Normal');
		},
		onHit: function (source, pokemon) {
			let thirdtype = this.runEvent('Drive', pokemon, null, 'technoblast', 'Normal');
			source.addType(thirdtype);
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		zMovePower: 190,
		contestType: "Cool",
	},
	"mist": {
		num: 54,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "For 5 turns, the user and its party members are protected from having their stat stages lowered by other Pokemon. Fails if the effect is already active on the user's side.",
		shortDesc: "For 5 turns, protects user's party from stat drops.",
		id: "mist",
		name: "Mist",
		pp: 30,
		priority: 0,
		flags: {snatch: 1},
		sideCondition: 'mist',
		effect: {
			duration: 5,
			onFoeTryMove: function (source, target, move) {
				if (move.id === 'spikes' || move.id === 'stealthrock' || move.id === 'stickyweb' || move.id === 'toxicspikes') {
					this.add('-fail', source);
					return false;
					 }
			},
			onDamage: function (damage, target, source, effect) {
			if (effect.id === 'stealthrock') {
				return false;
			}
		},
			onBoost: function (boost, target, source, effect) {
			if (effect.id === 'stickyweb') return false;
		},
			onStart: function (side) {
				this.add('-sidestart', side, 'Mist');
			},
			onResidualOrder: 21,
			onResidualSubOrder: 3,
			onEnd: function (side) {
				this.add('-sideend', side, 'Mist');
			},
		},
		secondary: null,
		target: "allySide",
		type: "Ice",
		zMoveEffect: 'heal',
		contestType: "Beautiful",
	},
	"mudsport": {
		num: 300,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "For 5 turns, all Electric-type attacks used by any active Pokemon have their power multiplied by 0.33. Fails if this effect is already active.",
		shortDesc: "For 5 turns, Electric-type attacks have 1/3 power.",
		id: "mudsport",
		name: "Mud Sport",
		pp: 15,
		priority: 0,
		flags: {nonsky: 1},
		pseudoWeather: 'mudsport',
		effect: {
			onStart: function (side, source) {
				this.add('-fieldstart', 'move: Mud Sport', '[of] ' + source);
			},
			onBasePowerPriority: 1,
			onBasePower: function (basePower, attacker, defender, move) {
				if (move.type === 'Electric') {
					this.debug('mud sport weaken');
					return this.chainModify([0x548, 0x1000]);
				}
			},
			onAfterMove: function (pokemon, target, move) {
				if (move.type === 'Electric') {
					this.field.removePseudoWeather('mudsport');
				}
			},
			onResidualOrder: 21,
			onEnd: function () {
				this.add('-fieldend', 'move: Mud Sport');
			},
		},
		secondary: null,
		target: "all",
		type: "Ground",
		zMoveBoost: {spd: 1},
		contestType: "Cute",
	},
	"watersport": {
		num: 346,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "For 5 turns, all Fire-type attacks used by any active Pokemon have their power multiplied by 0.33. Fails if this effect is already active.",
		shortDesc: "For 5 turns, Fire-type attacks have 1/3 power.",
		id: "watersport",
		name: "Water Sport",
		pp: 15,
		priority: 0,
		flags: {nonsky: 1},
		pseudoWeather: 'watersport',
		effect: {
			duration: 5,
			onStart: function (side, source) {
				this.add('-fieldstart', 'move: Water Sport', '[of] ' + source);
			},
			onBasePowerPriority: 1,
			onBasePower: function (basePower, attacker, defender, move) {
				if (move.type === 'Fire') {
					this.debug('water sport weaken');
					return this.chainModify([0x548, 0x1000]);
				}
			},
			onAfterMove: function (pokemon, target, move) {
				if (move.type === 'Fire') {
					this.field.removePseudoWeather('watersport');
				}
			},
			onResidualOrder: 21,
			onEnd: function () {
				this.add('-fieldend', 'move: Water Sport');
			},
		},
		secondary: null,
		target: "all",
		type: "Water",
		zMoveBoost: {spd: 1},
		contestType: "Cute",
	},
};
exports.BattleMovedex = BattleMovedex;
