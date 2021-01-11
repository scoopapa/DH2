'use strict';

exports.BattleMovedex = {
	"burningice": {
		num: 126,
		accuracy: 85,
		basePower: 110,
		category: "Special",
		desc: "Has a 10% chance to burn the target.",
		shortDesc: "10% chance to burn the target.",
		id: "burningice",
		isViable: true,
		name: "Burning Ice",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 10,
			status: 'brn',
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Diamond Storm", target);
		},
		target: "normal",
		type: "Ice",
		zMovePower: 185,
		contestType: "Beautiful",
	},
  
  "freezingfire": {
		num: 126,
		accuracy: 85,
		basePower: 110,
		category: "Physical",
		desc: "Has a 10% chance to freeze the target.",
		shortDesc: "10% chance to freeze the target.",
		id: "freezingfire",
		isViable: true,
		name: "Freezing Fire",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 10,
			status: 'frz',
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Blue Flare", target);
		},
		target: "normal",
		type: "Fire",
		zMovePower: 185,
		contestType: "Beautiful",
	},
	"cleansingfire": {
		num: 432,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Removes screens, hazards, Safeguard, Mist, and Leech Seed from both sides of the field. If any active pokemon has a status condition, that status condition is cured and the pokemon takes damage equal to 1/16 of their max HP, multiplied by their weakness or resistance to Fire.",
		shortDesc: "Clears screens, hazards, safeguard, mist, and Leech Seed. Any statused pokemon is cured and takes damage.",
		id: "cleansingfire",
		isViable: true,
		name: "Cleansing Fire",
		pp: 15,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, authentic: 1},
		onHit: function (target, source, move) {
			/**@type {?boolean | number} */
			let success = false;
			if (( !target.volatiles['substitute'] || move.infiltrates) && ( target.cureStatus()) )
			{
				let typeMod = this.clampIntRange(target.runEffectiveness('Fire'), -6, 6);
				this.damage(target.maxhp * Math.pow(2, typeMod) / 8);
				success = true;
			}
			if ( source.cureStatus() )
			{
				let typeMod = this.clampIntRange(source.runEffectiveness('Fire'), -6, 6);
				this.damage(source.maxhp * Math.pow(2, typeMod) / 8, source);
				success = true;
			}
			let removeAll = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'reflect', 'lightscreen', 'auroraveil', 'safeguard', 'mist',];
			for (const sideCondition of removeAll) {
				if (source.side.removeSideCondition(sideCondition)) {
					this.add('-sideend', source.side, this.getEffect(sideCondition).name, '[from] move: Cleansing Fire', '[of] ' + source);
					success = true;
				}
				if (target.side.removeSideCondition(sideCondition)) {
					this.add('-sideend', target.side, this.getEffect(sideCondition).name, '[from] move: Cleansing Fire', '[of] ' + source);
					success = true;
				}
			}
			return success;
		},
		secondary: null,
		target: "normal",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Searing Shot", target);
		},
		type: "Fire",
		zMoveBoost: {accuracy: 1},
		contestType: "Beautiful",
	},
	"coaltrap": {
		num: 390,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Sets up a hazard on the opposing side of the field, burning each opposing Pokemon that switches in, unless it is a Flying-type Pokemon or has the Levitate Ability. Can be removed from the opposing side if any opposing Pokemon uses Rapid Spin or Defog successfully, is hit by Defog, or a grounded Poison-type Pokemon switches in. Safeguard prevents the opposing party from being poisoned on switch-in, but a substitute does not.",
		shortDesc: "Burns grounded foes on switch-in.",
		id: "coaltrap",
		isViable: true,
		name: "Coal Trap",
		pp: 20,
		priority: 0,
		flags: {reflectable: 1, nonsky: 1},
		sideCondition: 'coaltrap',
		effect: {
			// this is a side condition
			onStart: function (side) {
				this.add('-sidestart', side, 'move: Coal Trap');
				this.effectData.layers = 1;
			},
			onRestart: function (side) {
				if (this.effectData.layers >= 1) return false;
			},
			onSwitchIn: function (pokemon) {
				if (!pokemon.isGrounded()) return;
				if (!pokemon.runImmunity('Fire')) return;
				if (pokemon.hasType('Fire')) {
					this.add('-sideend', pokemon.side, 'move: Coal Trap', '[of] ' + pokemon);
					pokemon.side.removeSideCondition('coaltrap');
				} 
				else {
					pokemon.trySetStatus('brn', pokemon.side.foe.active[0]);
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
	"buzzbomb": {
		num: 315,
		accuracy: 90,
		basePower: 130,
		category: "Special",
		desc: "Lowers the user's Special Attack by 2 stages.",
		shortDesc: "Lowers the user's Sp. Atk by 2.",
		id: "buzzbomb",
		isViable: true,
		name: "Buzz Bomb",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		self: {
			boosts: {
				spa: -2,
			},
		},
		secondary: null,
		target: "normal",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Bug Buzz", target);
			this.add('-anim', target, "Explosion", source);
		},
		type: "Fire",
		zMovePower: 195,
		contestType: "Clever",
	},
	"crystalbeam": {
		num: 33,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		shortDesc: "No additional effect.",
		id: "crystalbeam",
		name: "Crystal Beam",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Power Gem", target);
		},
		type: "Rock",
		zMovePower: 100,
		contestType: "Beautiful",
	},
	"gyrationdimension": {
		num: 703,
		accuracy: true,
		basePower: 170,
		category: "Physical",
		desc: "If this move is successful, Trick Room is set up.",
		shortDesc: "Sets Trick Room.",
		id: "gyrationdimension",
		name: "Gyration Dimension",
		pp: 1,
		priority: 0,
		flags: {},
		isZ: "stakatakiumz",
		target: "normal",
		type: "Steel",
		contestType: "Cool",
	},
	"ironslash": {
		num: 331,
		accuracy: 100,
		basePower: 25,
		category: "Physical",
		desc: "Hits two to five times. Has a 1/3 chance to hit two or three times, and a 1/6 chance to hit four or five times. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. If the user has the Skill Link Ability, this move will always hit five times.",
		shortDesc: "Hits 2-5 times in one turn.",
		id: "ironslash",
		isViable: true,
		name: "Iron Slash",
		pp: 30,
		priority: 0,
		flags: {bullet: 1, protect: 1, mirror: 1},
		multihit: [2, 5],
		secondary: null,
		target: "normal",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Metal Claw", target);
		},
		type: "Steel",
		zMovePower: 140,
		contestType: "Tough",
	},
	"fangcharge": {
		num: 33,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		desc: "If the target lost HP, the user takes recoil damage equal to 1/4 the HP lost by the target, rounded half up, but not less than 1 HP. 30% chance to badly poison",
		shortDesc: "Has 1/4 recoil. May badly poison (30%)",
		id: "fangcharge",
		isViable: true,
		name: "Fang Charge",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		recoil: [1, 4],
		secondary: {
			chance: 30,
			status: 'tox',
		},
		target: "normal",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Dragon Rush", target);
		},
		type: "Dragon",
		zMovePower: 175,
		contestType: "Tough",
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
			let removeTarget = ['reflect', 'lightscreen', 'auroraveil', 'safeguard', 'mist', 'spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'coaltrap'];
			let removeAll = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'coaltrap'];
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
			if (source.hp && source.removeVolatile('leechseed')) {
				this.add('-end', source, 'Leech Seed', '[from] move: Cleansing Fire', '[of] ' + source);
			}
			if (target.hp && target.removeVolatile('leechseed')) {
				this.add('-end', target, 'Leech Seed', '[from] move: Cleansing Fire', '[of] ' + source);
			}
			return success;
		},
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
			durationCallback(target, source, effect) {
				if (source && source.hasItem('roomextender')) {
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
		secondary: null,
		target: "all",
		type: "Psychic",
		zMoveBoost: {spd: 1},
		contestType: "Clever",
	},
	"magicroom": {
		num: 478,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "For 5 turns, the held items of all active Pokemon have no effect. An item's effect of causing forme changes is unaffected, but any other effects from such items are negated. During the effect, Fling and Natural Gift are prevented from being used by all active Pokemon. If this move is used during the effect, the effect ends.",
		shortDesc: "For 5 turns, all held items have no effect.",
		id: "magicroom",
		name: "Magic Room",
		pp: 10,
		priority: 0,
		flags: {mirror: 1},
		pseudoWeather: 'magicroom',
		effect: {
			duration: 5,
			durationCallback(target, source, effect) {
				if (source && source.hasItem('roomextender')) {
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
		secondary: null,
		target: "all",
		type: "Psychic",
		zMoveBoost: {spd: 1},
		contestType: "Clever",
	},
	"trickroom": {
		num: 433,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "For 5 turns, the Speed of every Pokemon is recalculated for the purposes of determining turn order. During the effect, each Pokemon's Speed is considered to be (10000 - its normal Speed), and if this value is greater than 8191, 8192 is subtracted from it. If this move is used during the effect, the effect ends.",
		shortDesc: "Goes last. For 5 turns, turn order is reversed.",
		id: "trickroom",
		name: "Trick Room",
		pp: 5,
		priority: -7,
		flags: {mirror: 1},
		pseudoWeather: 'trickroom',
		effect: {
			duration: 5,
			durationCallback(target, source, effect) {
				if (source && source.hasItem('roomextender')) {
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
		secondary: null,
		target: "all",
		type: "Psychic",
		zMoveBoost: {accuracy: 1},
		contestType: "Clever",
	},
	"sacredcurrent": {
		num: 160,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Boosts the user's two highest stats by 1 stage.",
		shortDesc: "Boosts the user's two highest stats by 1 stage.",
		id: "sacredcurrent",
		name: "Sacred Current",
		pp: 10,
		priority: 0,
		flags: {snatch: 1},
		onHit(target) {
			let statNames = [ 'atk', 'def', 'spa', 'spd', 'spe' ];
			let highestStats = [];
			highestStats[0] = '';
			let bestStat = 0;
			for ( let i = 0; i < 2; i++) {
				for ( let j = 0; j < 5; j++) {
					let statName = statNames[ j ];
					if ( target.storedStats[ statName ] > bestStat && highestStats[0] !== statName ) {
						bestStat = target.storedStats[ statName ];
						highestStats[ i ] = statName;
					}
				}
				bestStat = 0;
			}
			let boosts = {};
			boosts[ highestStats[0] ] = 1;
			boosts[ highestStats[1] ] = 1;
			this.boost(boosts, target);
		},
		secondary: null,
		target: "self",
		type: "Water",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Aqua Ring", source);
		},
		zMoveEffect: 'clearnegativeboost',
		contestType: "Beautiful",
	},
	"machwing": {
		num: 98,
		accuracy: 100,
		basePower: 40,
		category: "Physical",
		desc: "No additional effect.",
		shortDesc: "Usually goes first.",
		id: "machwing",
		isViable: true,
		name: "Mach Wing",
		pp: 30,
		priority: 1,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Flying",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Quick Attack", target);
		},
		zMovePower: 100,
		contestType: "Cool",
	},
};
