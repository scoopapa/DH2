'use strict';

exports.BattleMovedex = {
	"aerialstab": {
		num: 10001,
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		desc: "Has a higher chance for a critical hit.",
		shortDesc: "High critical hit ratio.",
		id: "aerialstab",
		isViable: true,
		name: "Aerial Stab",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		critRatio: 2,
		secondary: null,
		target: "normal",
		type: "Flying",
		zMovePower: 120,
		contestType: "Cool",
	},
	"blimpblast": {
		num: 10002,
		accuracy: 100,
		basePower: 0,
		basePowerCallback(pokemon, target) {
			let ratio = (pokemon.getStat('spe') / target.getStat('spe'));
			let power = ( ratio * 30 ) + 1;
			this.debug([40, 60, 80, 120, 150][(Math.floor(ratio) > 4 ? 4 : Math.floor(ratio))] + ' bp');
			if (power >= 120) {
				return 120;
			}
			return power;
		},
		category: "Special",
		desc: "The power of this move depends on (user's current Speed / target's current Speed), rounded down. Power is equal to 150 if the result is 4 or more, 120 if 3, 80 if 2, 60 if 1, 40 if less than 1. If the target's current Speed is 0, this move's power is 40.",
		shortDesc: "More power the faster the user is than the target.",
		id: "blimpblast",
		name: "Blimp Blast",
		pp: 10,
		priority: 0,
		flags: {bullet: 1, protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Flying",
		zMovePower: 160,
		contestType: "Cool",
	},
	"defensivebarrier": {
		num: 10003,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "For 2 turns, damage to allies is halved. 4 turns with Light Clay",
		shortDesc: "For 2 turns, damage to allies is halved.",
		id: "defensivebarrier",
		isViable: true,
		name: "Defensive Barrier",
		pp: 20,
		priority: 0,
		flags: {snatch: 1},
		sideCondition: 'defensivebarrier',
		effect: {
			duration: 5,
			durationCallback(target, source, effect) {
				if (source && source.hasItem('lightclay')) {
					return 4;
				}
				return 2;
			},
			onAnyModifyDamage(damage, source, target, move) {
				if (target !== source && target.side === this.effectData.target) {
					if ((target.side.getSideCondition('reflect') && this.getCategory(move) === 'Physical') ||
							(target.side.getSideCondition('lightscreen') && this.getCategory(move) === 'Special')) {
						return;
					}
					if (!target.getMoveHitData(move).crit && !move.infiltrates) {
						this.debug('Defensive Barrier weaken');
						if (target.side.active.length > 1) return this.chainModify([0xAAC, 0x1000]);
						return this.chainModify(0.5);
					}
				}
			},
			onStart(side) {
				this.add('-sidestart', side, 'move: Aurora Veil');
			},
			onResidualOrder: 21,
			onResidualSubOrder: 1,
			onEnd(side) {
				this.add('-sideend', side, 'move: Aurora Veil');
			},
		},
		secondary: null,
		target: "allySide",
		type: "Rock",
		zMoveBoost: {spe: 1},
		contestType: "Beautiful",
	},
	"lingeringblast": {
		num: 10004,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		desc: "No additional effect.",
		shortDesc: "No additional effect. Hits adjacent foes.",
		id: "lingeringblast",
		isViable: true,
		name: "Lingering Blast",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, authentic: 1},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Ghost",
		zMovePower: 180,
		contestType: "Cool",
	},
	"lingeringsurround": {
		num: 99998,
		accuracy: true,
		basePower: 195,
		category: "Special",
		desc: "If this move is successful, it sets Magic Room.",
		shortDesc: "Summons Magic Room.",
		id: "lingeringsurround",
		name: "Lingering Surround",
		pp: 1,
		priority: 0,
		flags: { sound: 1,},
		isZ: "persaniumz",
		secondary: {
			chance: 100,
			self: {
				onHit() {
					this.field.addPseudoWeather('magicroom');
				},
			},
		},
		target: "normal",
		type: "Ghost",
		contestType: "Cool",
	},
	"naturesguardian": {
		num: 10005,
		accuracy: true,
		basePower: 190,
		category: "Special",
		desc: "If this move is successful, the terrain becomes Grassy Terrain.",
		shortDesc: "Summons Grassy Terrain.",
		id: "naturesguardian",
		name: "Nature's Guardian",
		pp: 1,
		priority: 0,
		flags: {},
		isZ: "simisagiumz",
		secondary: {
			chance: 100,
			self: {
				onHit() {
					this.field.setTerrain('grassyterrain');
				},
			},
		},
		target: "normal",
		type: "Grass",
		contestType: "Cool",
	},
	"pebblepunch": {
		num: 10006,
		accuracy: 100,
		basePower: 75,
		category: "Physical",
		shortDesc: "No additional effect.",
		id: "pebblepunch",
		name: "Pebble Punch",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1},
		secondary: null,
		target: "normal",
		type: "Rock",
		zMovePower: 150,
		contestType: "Tough",
	},
	"puffup": {
		num: 10007,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Raises the user's Special Attack and Special Defense by 1 stage.",
		shortDesc: "Raises the user's Sp. Atk and Sp. Def by 1.",
		id: "puffup",
		isViable: true,
		name: "Puff Up",
		pp: 20,
		priority: 0,
		flags: {snatch: 1},
		boosts: {
			def: 1,
			spa: 1,
			spd: 1,
		},
		secondary: null,
		target: "self",
		type: "Normal",
		zMoveEffect: 'clearnegativeboost',
		contestType: "Clever",
	},
	"spikebomb": {
		num: 10008,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		desc: ".",
		shortDesc: ".",
		id: "spikebomb",
		name: "Spike Bomb",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, nonsky: 1},
		secondary: {
			chance: 60,
			onHit(target, source, move) {
				console.log('hi');
				target.side.addSideCondition( 'spikes' );
			},
		},
		target: "allAdjacentFoes",
		type: "Ground",
		zMovePower: 140,
		contestType: "Tough",
	},
	"staticsignal": {
		num: 10009,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Sets up a hazard on the opposing side of the field, burning each opposing Pokemon that switches in, unless it is a Flying-type Pokemon or has the Levitate Ability. Can be removed from the opposing side if any opposing Pokemon uses Rapid Spin or Defog successfully, is hit by Defog, or a grounded Poison-type Pokemon switches in. Safeguard prevents the opposing party from being poisoned on switch-in, but a substitute does not.",
		shortDesc: "Burns grounded foes on switch-in.",
		id: "staticsignal",
		isViable: true,
		name: "Static Signal",
		pp: 20,
		priority: 0,
		flags: {reflectable: 1, nonsky: 1},
		sideCondition: 'staticsignal',
		effect: {
			// this is a side condition
			onStart: function (side) {
				this.add('-sidestart', side, 'move: Static Signal');
				this.effectData.layers = 1;
			},
			onRestart: function (side) {
				if (this.effectData.layers >= 1) return false;
			},
			onSwitchIn: function (pokemon) {
				if (!pokemon.isGrounded()) return;
				if (!pokemon.runImmunity('Electric')) return;
				if (pokemon.hasType('Electric')) {
					this.add('-sideend', pokemon.side, 'move: Static Signal', '[of] ' + pokemon);
					pokemon.side.removeSideCondition('staticsignal');
				} 
				else {
					pokemon.trySetStatus('par', pokemon.side.foe.active[0]);
				}
			},
		},
		secondary: null,
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Lava Plume", target);
		},
		target: "foeSide",
		type: "Fire",
		zMoveBoost: {def: 1},
		contestType: "Clever",
	},
	"rapidspin": {
		inherit: true,
		self: {
			onHit: function (pokemon) {
				if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
					this.add('-end', pokemon, 'Leech Seed', '[from] move: Rapid Spin', '[of] ' + pokemon);
				}
				let sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'coaltrap'];
				for (const condition of sideConditions) {
					if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
						this.add('-sideend', pokemon.side, this.getEffect(condition).name, '[from] move: Rapid Spin', '[of] ' + pokemon);
					}
				}
				if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
					pokemon.removeVolatile('partiallytrapped');
				}
			},
		},
	},
	"defog": {
		inherit: true,
		onHit: function (target, source, move) {
			/**@type {?boolean | number} */
			let success = false;
			if (!target.volatiles['substitute'] || move.infiltrates) success = this.boost({evasion: -1});
			let removeTarget = ['reflect', 'lightscreen', 'auroraveil', 'safeguard', 'mist', 'spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'staticsignal'];
			let removeAll = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'staticsignal'];
			for (const targetCondition of removeTarget) {
				if (target.side.removeSideCondition(targetCondition)) {
					if (!removeAll.includes(targetCondition)) continue;
					this.add('-sideend', target.side, this.getEffect(targetCondition).name, '[from] move: Defog', '[of] ' + target);
					success = true;
				}
			}
			for (const sideCondition of removeAll) {
				if (source.side.removeSideCondition(sideCondition)) {
					this.add('-sideend', source.side, this.getEffect(sideCondition).name, '[from] move: Defog', '[of] ' + source);
					success = true;
				}
			}
			return success;
		},
	},
	"coralpulse": {
		num: 10010,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		desc: "Has a 20% chance to flinch the target.",
		shortDesc: "20% chance to flinch the target.",
		id: "coralpulse",
		isViable: true,
		name: "Coral Pulse",
		pp: 10,
		priority: 0,
		flags: {protect: 1, pulse: 1, mirror: 1, distance: 1},
		secondary: {
			chance: 30,
			boosts: {
				spe: -1,
			},
		},
		target: "any",
		type: "Rock",
		zMovePower: 160,
		contestType: "Beautiful",
	},
	"fallingearth": {
		num: 10011,
		accuracy: 85,
		basePower: 120,
		category: "Physical",
		desc: "If the target lost HP, the user takes recoil damage equal to 33% the HP lost by the target, rounded half up, but not less than 1 HP.",
		shortDesc: "Has 33% recoil.",
		id: "fallingearth",
		isViable: true,
		name: "Falling Earth",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		recoil: [33, 100],
		secondary: null,
		target: "normal",
		type: "Normal",
		zMovePower: 190,
		contestType: "Tough",
	},
	"giftofgaea": {
		num: 10012,
		accuracy: true,
		basePower: 100,
		category: "Special",
		desc: "Every Pokemon in the user's party is cured of its major status condition. Active Pokemon with the Sap Sipper Ability are not cured, unless they are the user.",
		shortDesc: "Cures the user's party of all status conditions.",
		id: "giftofgaea",
		isViable: true,
		name: "Gift of Gaea",
		pp: 5,
		priority: 0,
		flags: {snatch: 1, distance: 1},
		onHit(pokemon, source, move) {
			this.add('-activate', source, 'move: Aromatherapy');
			let success = false;
			for (const ally of pokemon.side.pokemon) {
				if (ally !== source && ((ally.hasAbility('sapsipper')) ||
						(ally.volatiles['substitute'] && !move.infiltrates))) {
					continue;
				}
				if (ally.cureStatus()) success = true;
			}
			return success;
		},
		target: "allAdjacentFoes",
		type: "Grass",
		zMoveEffect: 'heal',
		contestType: "Clever",
	},
	"gigagaea": {
		num: 10013,
		accuracy: true,
		basePower: 180,
		category: "Special",
		desc: "If this move is successful, it removes the target's stat boosts.",
		shortDesc: "Summons Magic Room.",
		id: "gigagaea",
		name: "Giga Gaea",
		pp: 1,
		priority: 0,
		flags: { sound: 1,},
		isZ: "tropiumz",
		onTryHit( pokemon ) {
			pokemon.clearBoosts();
		},
		target: "normal",
		type: "Grass",
		contestType: "Clever",
	},
	"heave": {
		num: 10014,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Raises the user's Special Attack, Special Defense, and Speed by 1 stage.",
		shortDesc: "Raises the user's Sp. Atk, Sp. Def, Speed by 1.",
		id: "heave",
		isViable: true,
		name: "Heave",
		pp: 10,
		priority: 0,
		flags: {snatch: 1,},
		onTryHit( pokemon ) {
			if ( pokemon.ability !== "Slow Start" ) return false;
		},
		onHit( pokemon, source, move ) {
			if ( pokemon.volatiles['slowstart'] ) {
				let slowStart = pokemon.volatiles['slowstart'];
				slowStart.effectData.duration--;
				if ( move.isZ ) pokemon.removeVolatile('slowstart');
			}
		},
		boosts: {
			atk: 1,
			def: 1,
			spe: 1,
		},
		secondary: null,
		target: "self",
		type: "Normal",
		zMoveEffect: 'clearnegativeboost',
		contestType: "Beautiful",
	},
	"lunarvision": {
		num: 10015,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		desc: "Lowers the target's Attack and Defense by 1 stage.",
		shortDesc: "Lowers the target's Attack and Defense by 1.",
		id: "lunarvision",
		name: "Lunar Vision",
		pp: 10,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, mystery: 1},
		boosts: {
			spe: -1,
			spd: -1,
			evasion: -1,
		},
		secondary: null,
		target: "normal",
		type: "Flying",
		zMoveEffect: 'crit2',
		contestType: "Cute",
	},
	"lifedrain": {
		num: 10016,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		desc: "The user recovers 1/2 the HP lost by the target, rounded half up. If Big Root is held by the user, the HP recovered is 1.3x normal, rounded half down.",
		shortDesc: "User recovers 50% of the damage dealt.",
		id: "lifedrain",
		isViable: true,
		name: "Life Drain",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, heal: 1},
		drain: [1, 2],
		secondary: null,
		target: "normal",
		type: "Ghost",
		zMovePower: 160,
		contestType: "Clever",
	},
	"rocketsurfing": {
		num: 10017,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		desc: "Nearly always goes first.",
		shortDesc: "Nearly always goes first.",
		id: "rocketsurfing",
		isViable: true,
		name: "Rocket Surfing",
		pp: 5,
		priority: 2,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Water",
		zMovePower: 160,
		contestType: "Cool",
	},
	"soundburst": {
		num: 10018,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		desc: "Nearly always goes first.",
		shortDesc: "Nearly always goes first.",
		id: "soundburst",
		isViable: true,
		name: "Sound Burst",
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		pp: 5,
		priority: 2,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Flying",
		zMovePower: 160,
		contestType: "Cool",
	},
	"lightspeedstrike": {
		num: 10019,
		accuracy: true,
		basePower: 160,
		category: "Special",
		desc: "Nearly always goes first.",
		shortDesc: "Nearly always goes first.",
		id: "lightspeedstrike",
		name: "Lightspeed Strike",
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		pp: 1,
		priority: 0,
		flags: { sound: 1,},
		isZ: "ninjaskiumz",
		target: "normal",
		type: "Flying",
		contestType: "Clever",
	},
	"lilypadleap": {
		num: 10020,
		accuracy: true,
		basePower: 50,
		category: "Physical",
		desc: "Sets up Aqua Ring for the user.",
		shortDesc: "Sets up Aqua Ring for the user.",
		id: "lilypadleap",
		isViable: true,
		name: "Lily Pad Leap",
		pp: 5,
		priority: 0,
		flags: {snatch: 1, distance: 1},
		onHit(pokemon, source, move) {
			source.addVolatile('aquaring')
		},
		onEffectiveness(typeMod, target, type, move) {
			return typeMod + this.getEffectiveness('Grass', type);
		},
		target: "allAdjacentFoes",
		type: "Water",
		zMoveEffect: 'heal',
		contestType: "Clever",
	},
	"lilypadlaunch": {
		num: 10021,
		accuracy: true,
		basePower: 100,
		category: "Physical",
		desc: "Sets up Ingrain for the user.",
		shortDesc: "Sets up Ingrain for the user.",
		id: "lilypadlaunch",
		name: "Lily Pad Launch",
		onHit(pokemon, source, move) {
			source.addVolatile('ingrain')
		},
		onEffectiveness(typeMod, target, type, move) {
			return typeMod + this.getEffectiveness('Grass', type);
		},
		pp: 1,
		priority: 0,
		flags: { sound: 1,},
		isZ: "politoediumz",
		target: "normal",
		type: "Water",
		contestType: "Clever",
	},
	"stonewave": {
		num: 10022,
		accuracy: 100,
		basePower: 95,
		category: "Special",
		shortDesc: "No additional effect.",
		id: "stonewave",
		isViable: true,
		name: "Stone Wave",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Rock",
		zMovePower: 175,
		contestType: "Beautiful",
	},
	"warfeathers": {
		num: 10023,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Raises the user's Attack and Defense by 1 stage.",
		shortDesc: "Raises the user's Attack and Defense by 1.",
		id: "warfeathers",
		isViable: true,
		name: "War Feathers",
		pp: 10,
		priority: 0,
		flags: {snatch: 1},
		boosts: {
			atk: 1,
			def: 1,
		},
		onHit(pokemon, source, move) {
			source.addVolatile('focusenergy')
		},
		secondary: null,
		target: "self",
		type: "Fighting",
		zMoveBoost: {atk: 1},
		contestType: "Cool",
	},
	"wonderroom": {
		inherit: true,
		effect: {
			duration: 5,
			durationCallback(target, source, effect) {
				if (source && source.hasItem('roomkey')) {
					return 8;
				}
				return 5;
			},
			onStart(side, source) {
				this.add('-fieldstart', 'move: Wonder Room', '[of] ' + source);
			},
			onRestart(target, source) {
				this.field.removePseudoWeather('wonderroom');
			},
			// Swapping defenses implemented in sim/pokemon.js:Pokemon#calculateStat and Pokemon#getStat
			onResidualOrder: 24,
			onEnd() {
				this.add('-fieldend', 'move: Wonder Room');
			},
		},
	},
	"magicroom": {
		inherit: true,
		effect: {
			duration: 5,
			durationCallback(target, source, effect) {
				if (source && source.hasItem('roomkey')) {
					return 8;
				}
				return 5;
			},
			onStart(target, source) {
				this.add('-fieldstart', 'move: Magic Room', '[of] ' + source);
			},
			onRestart(target, source) {
				this.field.removePseudoWeather('magicroom');
			},
			// Item suppression implemented in Pokemon.ignoringItem() within sim/pokemon.js
			onResidualOrder: 25,
			onEnd() {
				this.add('-fieldend', 'move: Magic Room', '[of] ' + this.effectData.source);
			},
		},
	},
	"trickroom": {
		inherit: true,
		effect: {
			duration: 5,
			durationCallback(target, source, effect) {
				if (source && source.hasItem('roomkey')) {
					return 8;
				}
				return 5;
			},
			onStart(target, source) {
				this.add('-fieldstart', 'move: Trick Room', '[of] ' + source);
			},
			onRestart(target, source) {
				this.field.removePseudoWeather('trickroom');
			},
			// Speed modification is changed in Pokemon.getActionSpeed() in sim/pokemon.js
			onResidualOrder: 23,
			onEnd() {
				this.add('-fieldend', 'move: Trick Room');
			},
		},
	},
	"electricterrain": {
		inherit: true,
		onTryHit( pokemon ) {
			for (const target of pokemon.side.foe.active) {
				if ( target.ability === "Terrain Breaker" ) return false;
			}
		}
	},
	"psychicterrain": {
		inherit: true,
		onTryHit( pokemon ) {
			for (const target of pokemon.side.foe.active) {
				if ( target.ability === "Terrain Breaker" ) return false;
			}
		}
	},
	"mistyterrain": {
		inherit: true,
		onTryHit( pokemon ) {
			for (const target of pokemon.side.foe.active) {
				if ( target.ability === "Terrain Breaker" ) return false;
			}
		}
	},
	"grassyterrain": {
		inherit: true,
		onTryHit( pokemon ) {
			for (const target of pokemon.side.foe.active) {
				if ( target.ability === "Terrain Breaker" ) return false;
			}
		},
		effect: {
			duration: 5,
			durationCallback(source, effect) {
				if (source && ( source.hasItem('terrainextender') || source.hasItem('waterlily'))) {
					return 8;
				}
				return 5;
			},
			onBasePower(basePower, attacker, defender, move) {
				let weakenedMoves = ['earthquake', 'bulldoze', 'magnitude'];
				if (weakenedMoves.includes(move.id)) {
					this.debug('move weakened by grassy terrain');
					return this.chainModify(0.5);
				}
				if (move.type === 'Grass' && attacker.isGrounded()) {
					this.debug('grassy terrain boost');
					return this.chainModify(1.5);
				}
			},
			onStart(battle, source, effect) {
				if (effect && effect.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Grassy Terrain', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Grassy Terrain');
				}
			},
			onResidualOrder: 5,
			onResidualSubOrder: 3,
			onResidual() {
				this.eachEvent('Terrain');
			},
			onTerrain(pokemon) {
				if (pokemon.isGrounded() && !pokemon.isSemiInvulnerable()) {
					this.debug('Pokemon is grounded, healing through Grassy Terrain.');
					this.heal(pokemon.maxhp / 16, pokemon, pokemon);
				}
			},
			onEnd() {
				if (!this.effectData.duration) this.eachEvent('Terrain');
				this.add('-fieldend', 'move: Grassy Terrain');
			},
		},
	},
	"quicksand": {
		num: 10023,
		accuracy: 90,
		basePower: 110,
		category: "Special",
		shortDesc: "No additional effect.",
		id: "quicksand",
		isViable: true,
		name: "Quicksand",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onHit() {
			if ( this.field.isWeather('sandstorm')) {
				target.addVolatile('partiallytrapped');
			}
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Ground",
		zMovePower: 175,
		contestType: "Beautiful",
	},
	"tsunamipunch": {
		num: 10024,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		desc: "This move combines Flying in its type effectiveness against the target. Damage doubles and no accuracy check is done if the target has used Minimize while active.",
		shortDesc: "Combines Flying in its type effectiveness.",
		id: "tsunamipunch",
		name: "Tsunami Punch",
		pp: 10,
		flags: {contact: 1, protect: 1, mirror: 1, distance: 1, punch: 1},
		onEffectiveness(typeMod, target, type, move) {
			return typeMod + this.getEffectiveness('Fighting', type);
		},
		priority: 0,
		secondary: null,
		target: "any",
		type: "Water",
		zMovePower: 170,
		contestType: "Tough",
	},
	"tidalplow": {
		num: 10025,
		accuracy: true,
		basePower: 150,
		category: "Physical",
		desc: "Sets up Ingrain for the user.",
		shortDesc: "Sets up Ingrain for the user.",
		id: "tidalplow",
		name: "Tidal Plow",
		volatileStatus: 'partiallytrapped',
		onEffectiveness(typeMod, target, type, move) {
			return typeMod + this.getEffectiveness('Fighting', type);
		},
		pp: 1,
		priority: 0,
		flags: { sound: 1,},
		isZ: "poliwrathiumz",
		target: "normal",
		type: "Water",
		contestType: "Clever",
	},
	"gravity": {
		inherit: true,
		effect: {
			duration: 5,
			durationCallback(source, effect) {
				let toReturn = 5;
				if (source && source.hasAbility('persistent')) {
					this.add('-activate', source, 'ability: Persistent', effect);
					toReturn += 2;
				}
				if (source && source.hasItem('densityamplifier')) {
					toReturn += 3;
				}
				return toReturn;
			},
			onStart() {
				this.add('-fieldstart', 'move: Gravity');
				for (const pokemon of this.getAllActive()) {
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
			onModifyAccuracy(accuracy) {
				if (typeof accuracy !== 'number') return;
				return accuracy * 5 / 3;
			},
			onDisableMove(pokemon) {
				for (const moveSlot of pokemon.moveSlots) {
					if (this.getMove(moveSlot.id).flags['gravity']) {
						pokemon.disableMove(moveSlot.id);
					}
				}
			},
			// groundedness implemented in battle.engine.js:BattlePokemon#isGrounded
			onBeforeMovePriority: 6,
			onBeforeMove(pokemon, target, move) {
				if (move.flags['gravity']) {
					this.add('cant', pokemon, 'move: Gravity', move);
					return false;
				}
			},
			onResidualOrder: 22,
			onEnd() {
				this.add('-fieldend', 'move: Gravity');
			},
		},
	},
};