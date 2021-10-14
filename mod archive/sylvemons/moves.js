/*
List of flags and their descriptions:
authentic: Ignores a target's substitute.
bite: Power is multiplied by 1.5 when used by a Pokemon with the Ability Strong Jaw.
bullet: Has no effect on Pokemon with the Ability Bulletproof.
charge: The user is unable to make a move between turns.
contact: Makes contact.
dance: When used by a Pokemon, other Pokemon with the Ability Dancer can attempt to execute the same move.
defrost: Thaws the user if executed successfully while the user is frozen.
distance: Can target a Pokemon positioned anywhere in a Triple Battle.
gravity: Prevented from being executed or selected during Gravity's effect.
heal: Prevented from being executed or selected during Heal Block's effect.
mirror: Can be copied by Mirror Move.
mystery: Unknown effect.
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
	"shieldslam": {
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		desc: "Damage is calculated using the user's Defense stat, including stat stage changes.",
		shortDesc: "Uses user's Defense stat in damage calculation.",
		id: "shieldslam",
		isViable: true,
		name: "Shield Slam",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Heavy Slam", target);
		},
		//useTargetOffensive: true,
		secondary: null,
		target: "normal",
		type: "Steel",
		zMovePower: 160,
		contestType: "Clever",
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
		condition: {
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
			onEffectiveness: function(typeMod, target, type, move) {
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
		secondary: null,
		target: "all",
		type: "Psychic",
		zMoveBoost: {acc: 1},
	},
	"shadowcharge": {
		accuracy: 95,
		basePower: 85,
		category: "Physical",
		shortDesc: "Power is boosted 1.5x if target is switching in.",
		id: "shadowcharge",
		isViable: true,
		name: "Shadow Charge",
		pp: 24,
		priority: 0,
		flags: {
			contact: 1,
			protect: 1,
			mirror: 1
		},
		onBasePower: function(basePower, attacker, defender) {
			if (!defender.activeTurns) {
				return this.chainModify(1.5);
			}
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Outrage", target);
		},
		secondary: null,
		target: "normal",
		type: "Ghost",
		zMovePower: 160,
		contestType: "Cool",
	},
	"hauntingscream": {
		accuracy: 100,
		basePower: 90,
		category: "Special",
		shortDesc: "30% chance to inflict Perish Song on foe.",
		id: "hauntingscream",
		isViable: true,
		name: "Haunting Scream",
		pp: 16,
		priority: 0,
		flags: {
			protect: 1,
			mirror: 1,
			sound: 1
		},
		secondary: {
			chance: 30,
			volatileStatus: 'perishsong',
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Boomburst", target);
		},
		target: "normal",
		type: "Ghost",
		zMovePower: 140,
		contestType: "Cool",
	},
	"swampland": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Halves the opponent's team's Speed for 4 turns",
		id: "swampland",
		isViable: true,
		name: "Swampland",
		pp: 15,
		priority: 0,
		flags: {
			snatch: 1
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Rain Dance", target);
		},
		sideCondition: 'swampland',
		condition: {
			duration: 4,
			durationCallback: function(target, source, effect) {
				if (source && source.hasAbility('persistent')) {
					return 6;
				}
				return 4;
			},
			onStart: function(side) {
				this.add('-sidestart', side, 'move: Swampland');
			},
			onModifySpe: function(spe, pokemon) {
				return this.chainModify(0.5);
			},
			onResidualOrder: 21,
			onResidualSubOrder: 4,
			onEnd: function(side) {
				this.add('-sideend', side, 'move: Swampland');
			},
		},
		secondary: null,
		target: "foeSide",
		type: "Water",
		zMoveBoost: {
			spa: 1
		},
		contestType: "Cool",
	},
	"stormstrike": {
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		desc: "Power doubles during weather effects (except strong winds) and this move's type changes to match; Ice type during Hail, Water type during Rain Dance, Rock type during Sandstorm, and Fire type during Sunny Day.",
		shortDesc: "Power doubles and type varies in each weather.",
		id: "stormstrike",
		name: "Storm Strike",
		pp: 10,
		priority: 0,
		flags: {
			bullet: 1,
			protect: 1,
			mirror: 1
		},
		onModifyMove: function(move) {
			switch (this.field.effectiveWeather()) {
				case 'sunnyday':
				case 'desolateland':
					move.type = 'Fire';
					move.basePower *= 2;
					break;
				case 'raindance':
				case 'primordialsea':
					move.type = 'Water';
					move.basePower *= 2;
					break;
				case 'sandstorm':
					move.type = 'Rock';
					move.basePower *= 2;
					break;
				case 'hail':
					move.type = 'Ice';
					move.basePower *= 2;
					break;
			}
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Weather Ball", target);
			this.add('-anim', source, "Knock Off", target);
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		zMovePower: 160,
		contestType: "Beautiful",
	},
	"allterrainblast": {
		accuracy: 100,
		basePower: 50,
		category: "Special",
		shortDesc: "Power doubles and type varies in each terrain.",
		id: "allterrainblast",
		name: "All-Terrain Blast",
		pp: 10,
		priority: 0,
		flags: {
			bullet: 1,
			protect: 1,
			mirror: 1
		},
		onModifyMove: function(move) {
			switch (this.effectiveTerrain()) {
				case 'electricterrain':
					move.type = 'Electric';
					move.basePower *= 2;
					break;
				case 'psychicterrain':
					move.type = 'Psychic';
					move.basePower *= 2;
					break;
				case 'mistyterrain':
					move.type = 'Fairy';
					move.basePower *= 2;
					break;
				case 'grassyterrain':
					move.type = 'Grass';
					move.basePower *= 2;
					break;
			}
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Weather Ball", target);
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		zMovePower: 160,
		contestType: "Beautiful",
	},
	"mistyterrain": {
		num: 581,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "For 5 turns, the terrain becomes Misty Terrain. During the effect, the power of Dragon-type attacks used against grounded Pokemon is multiplied by 0.5 and grounded Pokemon cannot be inflicted with a major status condition nor confusion. Camouflage transforms the user into a Fairy type, Nature Power becomes Moonblast, and Secret Power has a 30% chance to lower Special Attack by 1 stage. Fails if the current terrain is Misty Terrain.",
		shortDesc: "5 turns. Can't status,-Dragon power vs grounded. Fairy power is 1.5x.",
		id: "mistyterrain",
		name: "Misty Terrain",
		pp: 10,
		priority: 0,
		flags: {
			nonsky: 1
		},
		terrain: 'mistyterrain',
		condition: {
			duration: 5,
			durationCallback: function(source, effect) {
				if (source && source.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			onSetStatus: function(status, target, source, effect) {
				if (!target.isGrounded() || target.isSemiInvulnerable()) return;
				if (effect && effect.status) {
					this.add('-activate', target, 'move: Misty Terrain');
				}
				return false;
			},
			onTryAddVolatile: function(status, target, source, effect) {
				if (!target.isGrounded() || target.isSemiInvulnerable()) return;
				if (status.id === 'confusion') {
					if (effect.effectType === 'Move' && !effect.secondaries) this.add('-activate', target, 'move: Misty Terrain');
					return null;
				}
			},
			onBasePower: function(basePower, attacker, defender, move) {
				if (move.type === 'Dragon' && defender.isGrounded() && !defender.isSemiInvulnerable()) {
					this.debug('misty terrain weaken');
					return this.chainModify(0.5);
				}
				if (move.type === 'Electric' && attacker.isGrounded() && !attacker.isSemiInvulnerable()) {
					this.debug('electric terrain boost');
					return this.chainModify(1.5);
				}
			},
			onStart: function(battle, source, effect) {
				if (effect && effect.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Misty Terrain', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Misty Terrain');
				}
			},
			onResidualOrder: 21,
			onResidualSubOrder: 2,
			onEnd: function(side) {
				this.add('-fieldend', 'Misty Terrain');
			},
		},
		secondary: null,
		target: "all",
		type: "Fairy",
		zMoveBoost: {
			spd: 1
		},
		contestType: "Beautiful",
	},
	"defog": {
		num: 432,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Lowers the target's evasiveness by 1 stage. If this move is successful and whether or not the target's evasiveness was affected, the effects of Reflect, Light Screen, Aurora Veil, Safeguard, Mist, Spikes, Toxic Spikes, Stealth Rock, and Sticky Web end for the target's side, and the effects of Spikes, Toxic Spikes, Stealth Rock, and Sticky Web end for the user's side. Ignores a target's substitute, although a substitute will still block the lowering of evasiveness.",
		shortDesc: "-1 evasion; clears user and target side's hazards, clears rooms.",
		id: "defog",
		isViable: true,
		name: "Defog",
		pp: 15,
		priority: 0,
		flags: {
			protect: 1,
			reflectable: 1,
			mirror: 1,
			authentic: 1
		},
		onHit: function(target, source, move) {
			if (!target.volatiles['substitute'] || move.infiltrates) this.boost({
				evasion: -1
			});
			let removeTarget = ['reflect', 'lightscreen', 'auroraveil', 'safeguard', 'mist', 'spikes', 'toxicspikes', 'stealthrock', 'stickyweb'];
			let removeAll = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb'];
			let success = false;
			for (let targetCondition of removeTarget) {
				if (target.side.removeSideCondition(targetCondition)) {
					if (!removeAll.includes(targetCondition)) continue;
					this.add('-sideend', target.side, this.getEffect(targetCondition).name, '[from] move: Defog', '[of] ' + target);
					success = true;
				}
			}
			for (let sideCondition of removeAll) {
				if (source.side.removeSideCondition(sideCondition)) {
					this.add('-sideend', source.side, this.getEffect(sideCondition).name, '[from] move: Defog', '[of] ' + source);
					success = true;
				}
			}
			return success;
		},
		onTryHit: function(target, source) {
			this.field.removePseudoWeather('trickroom');
			this.field.removePseudoWeather('magicroom');
			this.field.removePseudoWeather('wonderroom');
			this.field.removePseudoWeather('inverseroom');
		},
		secondary: null,
		target: "normal",
		type: "Flying",
		zMoveBoost: {
			accuracy: 1
		},
		contestType: "Cool",
	},
	"splinteredstormshards": {
		num: 727,
		accuracy: true,
		basePower: 190,
		category: "Physical",
		desc: "Ends the effects of Electric Terrain, Grassy Terrain, Misty Terrain, and Psychic Terrain.",
		shortDesc: "Ends the effects of Terrain and Room.",
		id: "splinteredstormshards",
		name: "Splintered Stormshards",
		pp: 1,
		priority: 0,
		flags: {},
		onTryHit: function(target, source) {
			this.field.removePseudoWeather('trickroom');
			this.field.removePseudoWeather('magicroom');
			this.field.removePseudoWeather('wonderroom');
			this.field.removePseudoWeather('inverseroom');
		},
		onHit: function() {
			this.clearTerrain();
		},
		isZ: "lycaniumz",
		secondary: null,
		target: "normal",
		type: "Rock",
		contestType: "Cool",
	},
	"haze": {
		num: 114,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Resets the stat stages of all active Pokemon to 0.",
		shortDesc: "Eliminates all stat changes. Removes rooms",
		id: "haze",
		isViable: true,
		name: "Haze",
		pp: 30,
		priority: 0,
		flags: {
			authentic: 1
		},
		onHitField: function(target, source) {
			this.field.removePseudoWeather('trickroom');
			this.field.removePseudoWeather('magicroom');
			this.field.removePseudoWeather('wonderroom');
			this.field.removePseudoWeather('inverseroom');
			this.add('-clearallboost');
			for (let i = 0; i < this.sides.length; i++) {
				for (let j = 0; j < this.sides[i].active.length; j++) {
					if (this.sides[i].active[j] && this.sides[i].active[j].isActive) this.sides[i].active[j].clearBoosts();
				}
			}
		},
		secondary: null,
		target: "all",
		type: "Ice",
		zMoveEffect: 'heal',
		contestType: "Beautiful",
	},
	"bulldoze": {
		num: 523,
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		desc: "Has a 100% chance to lower the target's Speed by 1 stage.",
		shortDesc: "100% chance to lower adjacent Pkmn Speed by 1. Removes Rooms.",
		id: "bulldoze",
		name: "Bulldoze",
		pp: 20,
		priority: 0,
		flags: {
			protect: 1,
			mirror: 1,
			nonsky: 1
		},
		secondary: {
			chance: 100,
			boosts: {
				spe: -1,
			},
		},
		onTryHit: function(target, source) {
			this.field.removePseudoWeather('trickroom');
			this.field.removePseudoWeather('magicroom');
			this.field.removePseudoWeather('wonderroom');
			this.field.removePseudoWeather('inverseroom');
		},
		target: "allAdjacent",
		type: "Ground",
		zMovePower: 120,
		contestType: "Tough",
	},
	"flamebullet": {
		accuracy: 100,
		basePower: 40,
		category: "Special",
		desc: "Usually goes first.",
		shortDesc: "Usually goes first.",
		id: "flamebullet",
		isViable: true,
		name: "Flame Bullet",
		pp: 30,
		priority: 1,
		flags: {
			bullet: 1,
			defrost: 1,
			mirror: 1,
			protect: 1
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Ember", target);
		},
		secondary: null,
		target: "normal",
		type: "Fire",
		zMovePower: 100,
		contestType: "Beautiful",
	},
	"meteorshower": {
		accuracy: 100,
		basePower: 130,
		category: "Special",
		desc: "Lowers the user's Special Attack by 2 stages.",
		shortDesc: "Lowers the user's Sp. Atk by 2.",
		id: "meteorshower",
		isViable: true,
		name: "Meteor Shower",
		pp: 5,
		priority: 0,
		flags: {
			mirror: 1,
			protect: 1
		},
		self: {
			boosts: {
				spa: -2,
			},
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Draco Meteor", target);
		},
		secondary: null,
		target: "normal",
		type: "Rock",
		zMovePower: 195,
		contestType: "Beautiful",
	},
	"teleport": {
		accuracy: 100,
		basePower: 70,
		category: "Special",
		desc: "The user switches out after successful use.",
		shortDesc: "The user switches out after successful use.",
		id: "teleport",
		name: "Teleport",
		pp: 32,
		priority: 0,
		flags: {
			protect: 1,
			mirror: 1
		},
		selfSwitch: true,
		secondary: null,
		target: "normal",
		type: "Psychic",
		zMovePower: '140',
		contestType: "Cool",
	},
	"plumecannon": {
		accuracy: 90,
		basePower: 25,
		category: "Physical",
		desc: "Hits two to five times. Has a 1/3 chance to hit two or three times, and a 1/6 chance to hit four or five times. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. If the user has the Ability Skill Link, this move will always hit five times.",
		shortDesc: "Hits 2-5 times in one turn.",
		id: "plumecannon",
		isViable: true,
		name: "Plume Cannon",
		pp: 8,
		priority: 0,
		flags: {
			protect: 1,
			mirror: 1
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Feather Dance", target);
		},
		multihit: [2, 5],
		secondary: null,
		target: "normal",
		type: "Flying",
		zMovePower: 140,
		contestType: "Tough",
	},
	"slipstream": {
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		desc: "The user switches out after successful use. Deals double damage under Tailwind",
		shortDesc: "The user switches out after successful use. Deals double damage under Tailwind",
		id: "slipstream",
		isViable: true,
		name: "Slipstream",
		pp: 32,
		priority: 0,
		flags: {
			contact: 1,
			protect: 1,
			mirror: 1
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Pluck", target);
		},
		onBasePowerPriority: 8,
		onBasePower: function(basePower, source, target) {
			//if (source.sideCondition('tailwind') || target.sideCondition('tailwind')) {
			return this.chainModify(2);
			//}
		},
		selfSwitch: true,
		secondary: null,
		target: "normal",
		type: "Flying",
		zMovePower: 120,
		contestType: "Cute",
	},
	"thunderclap": {
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		desc: "No additional effect.",
		shortDesc: "No additional effect. Hits adjacent Pokemon.",
		id: "thunderclap",
		isViable: true,
		name: "Thunder Clap",
		pp: 10,
		priority: 0,
		flags: {
			protect: 1,
			mirror: 1,
			sound: 1,
			authentic: 1
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Earthquake", target);
			this.add('-anim', source, "Thunder", target);
		},
		secondary: null,
		target: "allAdjacent",
		type: "Electric",
		zMovePower: 200,
		contestType: "Tough",
	},
	"rinseoff": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Heals the user by 50% (66% in rain)",
		shortDesc: "Heals the user by 50% (66% in rain)",
		id: "rinseoff",
		isViable: true,
		name: "Rinse Off",
		pp: 16,
		priority: 0,
		flags: {
			snatch: 1,
			heal: 1
		},
		onHit: function(pokemon) {
			if (this.field.isWeather(['raindance', 'primordialsea'])) {
				return this.heal(this.modify(pokemon.maxhp, 0.667));
			} else {
				return this.heal(this.modify(pokemon.maxhp, 0.5));
			}
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', target, "Recover", source);
		},
		secondary: null,
		target: "self",
		type: "Water",
		zMoveEffect: 'clearnegativeboost',
		contestType: "Beautiful",
	},
	"acidmelt": {
		accuracy: 100,
		basePower: 70,
		category: "Special",
		desc: "10% chance to burn the opponent and is super effective against Steel-types.",
		shortDesc: "Super Effective against Steel. 10% Burn chance.",
		id: "acidmelt",
		isViable: true,
		name: "Acid Melt",
		pp: 32,
		priority: 0,
		flags: {
			protect: 1,
			mirror: 1
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Acid", target);
		},
		onModifyMovePriority: -5,
		onModifyMove: function(move) {
			if (!move.ignoreImmunity) move.ignoreImmunity = {};
			if (move.ignoreImmunity !== true) {
				move.ignoreImmunity['Steel'] = true;
				move.ignoreImmunity['Poison'] = true;
			}
		},
		onEffectiveness: function(typeMod, type) {
			if (type === 'Steel') return 1;
		},
		secondary: {
			chance: 10,
			status: 'brn',
		},
		target: "normal",
		type: "Poison",
		zMovePower: 140,
		contestType: "Beautiful",
	},
	"fairycharge": {
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		desc: "The user receives 1/3 damage inflicted in recoil. Has a 10% chance to decrease the target's Atk by 1 stage.",
		shortDesc: "33% recoil. Has a 10% chance to decrease the target's Atk by 1 stage.",
		id: "fairycharge",
		isViable: true,
		name: "Fairy Charge",
		pp: 10,
		priority: 0,
		flags: {
			contact: 1,
			protect: 1,
			mirror: 1
		},
		recoil: [1, 3],
		secondary: {
			chance: 10,
			boosts: {
				atk: -1,
			},
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Double Edge", target);
		},
		target: "normal",
		type: "Fairy",
		zMovePower: 180,
		contestType: "Cute",
	},
	"jetstream": {
		accuracy: 100,
		basePower: 40,
		category: "Special",
		desc: "Has +1 Priority. ",
		shortDesc: "Has +1 Priority. ",
		id: "jetstream",
		isViable: true,
		name: "Jetstream",
		pp: 48,
		priority: 1,
		flags: {
			protect: 1,
			mirror: 1,
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Gust", target);
		},
		target: "normal",
		type: "Flying",
		zMovePower: 190,
		contestType: "Cool",
	},
	"recrystalize": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Heals up to 50% of the user's max HP; Ice-types recover 67% in Hail and Rock-types recover 67% in Sandstorm.",
		shortDesc: "Heals up to 50% of the user's max HP; Ice-types recover 67% in Hail and Rock-types recover 67% in Sandstorm.",
		id: "recrystalize",
		isViable: true,
		name: "Recrystalize",
		pp: 5,
		priority: 0,
		flags: {
			snatch: 1,
			heal: 1
		},
		onHit: function(pokemon) {
			if (this.field.isWeather(['hail', 'sandstorm'])) {
				return this.heal(this.modify(pokemon.maxhp, 0.667));
			} else {
				return this.heal(this.modify(pokemon.maxhp, 0.5));
			}
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', target, "Rock Polish", source);
		},
		secondary: null,
		target: "self",
		type: "Normal",
		zMoveEffect: 'clearnegativeboost',
		contestType: "Beautiful",
	},
	"stalwartsword": {
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		desc: "Has a high critical hit ratio and a 30% chance to increase the user’s Def by 1 stage.",
		shortDesc: "High critical hit ratio. 30% chance to increase the user’s Def by 1 stage.",
		id: "stalwartsword",
		isViable: true,
		name: "Stalwart Sword",
		pp: 10,
		priority: 0,
		flags: {
			contact: 1,
			protect: 1,
			mirror: 1,
			punch: 1
		},
		critRatio: 2,
		secondary: {
			chance: 30,
			self: {
				boosts: {
					def: 1,
				},
			},
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Sacred Sword", target);
		},
		target: "normal",
		type: "Steel",
		zMovePower: 175,
		contestType: "Cool",
	},
	"ionabsorb": {
		accuracy: 100,
		basePower: 80,
		category: "Special",
		desc: "Applies the Charge effect to the user after doing damage (If used while boosted by Charge, effect is not applied)",
		shortDesc: "Applies the Charge effect to the user after doing damage.",
		id: "ionabsorb",
		isViable: true,
		name: "Ion Absorb",
		pp: 10,
		priority: 0,
		flags: {
			contact: 1,
			protect: 1,
			mirror: 1,
			punch: 1
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Parabolic Charge", target);
		},
		onTryHit: function(target, pokemon, move) {
			if (!pokemon.volatiles['charge']) {
				move.chargeup = true;
			}
		},
		secondary: {
			chance: 100,
			self: {
				volatileStatus: 'charge',
			},
		},
		onHit: function(target, pokemon, move) {
			if (move.chargeup) {
			pokemon.addVolatile('charge');
			this.add('-activate', pokemon, 'move: Charge');
			}
		},
		target: "normal",
		type: "Electric",
		zMovePower: 175,
		contestType: "Cool",
	},
	"morningsun": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user restores 1/2 of its maximum HP if no weather conditions are in effect, 2/3 of its maximum HP if the weather is Sunny Day, and 1/4 of its maximum HP if the weather is Hail, Rain Dance, or Sandstorm, all rounded half down.",
		shortDesc: "User restores 1/2 its max HP; 2/3 in Sun.",
		id: "morningsun",
		isViable: true,
		name: "Morning Sun",
		pp: 16,
		priority: 0,
		flags: {
			snatch: 1,
			heal: 1
		},
		onHit: function(pokemon) {
			if (this.field.isWeather(['desolateland', 'sunnyday'])) {
				return this.heal(this.modify(pokemon.maxhp, 0.667));
			} else {
				return this.heal(this.modify(pokemon.maxhp, 0.5));
			}
		},
		secondary: null,
		target: "self",
		type: "Normal",
		zMoveEffect: 'clearnegativeboost',
	},
	"moonlight": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user restores 1/2 of its maximum HP if no weather conditions are in effect, 2/3 of its maximum HP if the weather is Sunny Day, and 1/4 of its maximum HP if the weather is Hail, Rain Dance, or Sandstorm, all rounded half down.",
		shortDesc: "User restores 1/2 its max HP; 2/3 in Sun.",
		id: "moonlight",
		isViable: true,
		name: "Moonlight",
		pp: 16,
		priority: 0,
		flags: {
			snatch: 1,
			heal: 1
		},
		onHit: function(pokemon) {
			if (this.field.isWeather(['desolateland', 'sunnyday'])) {
				return this.heal(this.modify(pokemon.maxhp, 0.667));
			} else {
				return this.heal(this.modify(pokemon.maxhp, 0.5));
			}
		},
		secondary: null,
		target: "self",
		type: "Fairy",
		zMoveEffect: 'clearnegativeboost',
	},
	"synthesis": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user restores 1/2 of its maximum HP if no weather conditions are in effect, 2/3 of its maximum HP if the weather is Sunny Day, and 1/4 of its maximum HP if the weather is Hail, Rain Dance, or Sandstorm, all rounded half down.",
		shortDesc: "User restores 1/2 its max HP; 2/3 in Sun.",
		id: "synthesis",
		isViable: true,
		name: "Synthesis",
		pp: 16,
		priority: 0,
		flags: {
			snatch: 1,
			heal: 1
		},
		onHit: function(pokemon) {
			if (this.field.isWeather(['desolateland', 'sunnyday'])) {
				return this.heal(this.modify(pokemon.maxhp, 0.667));
			} else {
				return this.heal(this.modify(pokemon.maxhp, 0.5));
			}
		},
		secondary: null,
		target: "self",
		type: "Grass",
		zMoveEffect: 'clearnegativeboost',
	},
	"bugbite": {
		accuracy: 100,
		basePower: 65,
		category: "Physical",
		desc: "If this move is successful and the user has not fainted, it steals the target's held Berry if it is holding one and eats it immediately. Items lost to this move cannot be regained with Recycle or the Ability Harvest.",
		shortDesc: "1.5x damage if foe holds an item. Removes item.",
		id: "bugbite",
		name: "Bug Bite",
		pp: 32,
		priority: 0,
		flags: {
			contact: 1,
			protect: 1,
			mirror: 1
		},
		onBasePowerPriority: 4,
		onBasePower: function(basePower, source, target, move) {
			let item = target.getItem();
			if (!this.singleEvent('TakeItem', item, target.itemData, target, source, move, item)) return;
			if (item.id) {
				return this.chainModify(1.5);
			}
		},
		onHit: function(target, source) {
			let item = target.getItem();
			if (source.hp && item.isBerry && target.takeItem(source)) {
				this.add('-enditem', target, item.name, '[from] stealeat', '[move] Bug Bite', '[of] ' + source);
				if (this.singleEvent('Eat', item, null, source, null, null)) {
					this.runEvent('EatItem', source, null, null, item);
				}
				if (item.onEat) source.ateBerry = true;
			}
		},
		onAfterHit: function(target, source) {
			if (source.hp) {
				let item = target.takeItem();
				if (item) {
					this.add('-enditem', target, item.name, '[from] move: Bug Bite', '[of] ' + source);
				}
			}
		},
		secondary: null,
		target: "normal",
		type: "Bug",
		zMovePower: 120,
		contestType: "Cute",
	},
	"pluck": {
		accuracy: 100,
		basePower: 65,
		category: "Physical",
		desc: "If this move is successful and the user has not fainted, it steals the target's held Berry if it is holding one and eats it immediately. Items lost to this move cannot be regained with Recycle or the Ability Harvest.",
		shortDesc: "1.5x damage if foe holds an item. Removes item.",
		id: "pluck",
		name: "Pluck",
		pp: 32,
		priority: 0,
		flags: {
			contact: 1,
			protect: 1,
			mirror: 1
		},
		onBasePowerPriority: 4,
		onBasePower: function(basePower, source, target, move) {
			let item = target.getItem();
			if (!this.singleEvent('TakeItem', item, target.itemData, target, source, move, item)) return;
			if (item.id) {
				return this.chainModify(1.5);
			}
		},
		onHit: function(target, source) {
			let item = target.getItem();
			if (source.hp && item.isBerry && target.takeItem(source)) {
				this.add('-enditem', target, item.name, '[from] stealeat', '[move] Pluck', '[of] ' + source);
				if (this.singleEvent('Eat', item, null, source, null, null)) {
					this.runEvent('EatItem', source, null, null, item);
				}
				if (item.onEat) source.ateBerry = true;
			}
		},
		onAfterHit: function(target, source) {
			if (source.hp) {
				let item = target.takeItem();
				if (item) {
					this.add('-enditem', target, item.name, '[from] move: Pluck', '[of] ' + source);
				}
			}
		},
		secondary: null,
		target: "normal",
		type: "Flying",
		zMovePower: 120,
	},
	"incinerate": {
		accuracy: 100,
		basePower: 65,
		category: "Special",
		desc: "If this move is successful and the user has not fainted, it steals the target's held Berry if it is holding one and eats it immediately. Items lost to this move cannot be regained with Recycle or the Ability Harvest.",
		shortDesc: "1.5x damage if foe holds an item. Removes item.",
		id: "incinerate",
		name: "Incinerate",
		pp: 32,
		priority: 0,
		flags: {
			protect: 1,
			mirror: 1
		},
		onBasePowerPriority: 4,
		onBasePower: function(basePower, source, target, move) {
			let item = target.getItem();
			if (!this.singleEvent('TakeItem', item, target.itemData, target, source, move, item)) return;
			if (item.id) {
				return this.chainModify(1.5);
			}
		},
		onHit: function(target, source) {
			let item = target.getItem();
			if (source.hp && item.isBerry && target.takeItem(source)) {
				this.add('-enditem', target, item.name, '[from] stealeat', '[move] Bug Bite', '[of] ' + source);
				if (this.singleEvent('Eat', item, null, source, null, null)) {
					this.runEvent('EatItem', source, null, null, item);
				}
				if (item.onEat) source.ateBerry = true;
			}
		},
		onAfterHit: function(target, source) {
			if (source.hp) {
				let item = target.takeItem();
				if (item) {
					this.add('-enditem', target, item.name, '[from] move: Incinerate', '[of] ' + source);
				}
			}
		},
		secondary: null,
		target: "normal",
		type: "Fire",
		zMovePower: 120,
	},
	doublehit: {
		inherit: true,
		basePower: 50,
		pp: 16,
		zMovePower: 100,
	},
	doublekick: {
		inherit: true,
		basePower: 50,
		pp: 16,
		zMovePower: 100,
	},
	"twineedle": {
		num: 41,
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		desc: "Hits twice, with each hit having a 20% chance to poison the target. If the first hit breaks the target's substitute, it will take damage for the second hit.",
		shortDesc: "Hits 2 times. Each hit has 20% chance to poison.",
		id: "twineedle",
		name: "Twineedle",
		pp: 16,
		priority: 0,
		flags: {
			protect: 1,
			mirror: 1,
			contact: 1
		},
		multihit: [2, 2],
		secondary: {
			chance: 20,
			status: 'psn',
		},
		target: "normal",
		type: "Bug",
		zMovePower: 100,
		contestType: "Cool",
	},
	dualchop: {
		inherit: true,
		basePower: 50,
		pp: 16,
		zMovePower: 100,
	},
	"seedbomb": { // 50% chance to seed the target
		num: 402,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		desc: "No additional effect.",
		shortDesc: "50% chance to inflict Leech Seed on foe.",
		id: "seedbomb",
		isViable: true,
		name: "Seed Bomb",
		pp: 15,
		priority: 0,
		flags: {
			bullet: 1,
			protect: 1,
			mirror: 1
		},
		secondary: {
			chance: 50,
			volatileStatus: 'leechseed',
		},
		target: "normal",
		type: "Grass",
		zMovePower: 160,
		contestType: "Tough",
	},
	"dragonrage": {
		num: 82,
		accuracy: 100,
		basePower: 0,
		damage: 'level',
		category: "Special",
		desc: "Deals fixed damage equal to the user's level",
		shortDesc: "Deals fixed damage equal to the user's level",
		id: "dragonrage",
		name: "Dragon Rage",
		pp: 16,
		priority: 0,
		flags: {
			protect: 1,
			mirror: 1
		},
		secondary: null,
		target: "normal",
		type: "Dragon",
		zMovePower: 100,
		contestType: "Cool",
	},
	"sonicboom": {
		num: 49,
		accuracy: 90,
		basePower: 0,
		damage: 'level',
		category: "Special",
		desc: "Deals fixed damage equal to the user's level",
		shortDesc: "Deals fixed damage equal to the user's level",
		id: "sonicboom",
		name: "Sonic Boom",
		pp: 32,
		priority: 0,
		flags: {
			protect: 1,
			mirror: 1
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		zMovePower: 100,
		contestType: "Cool",
	},
	"psywave": {
		num: 149,
		accuracy: 100,
		basePower: 0,
		damage: 'level',
		category: "Special",
		desc: "Deals fixed damage equal to the user's level",
		shortDesc: "Deals fixed damage equal to the user's level",
		id: "psywave",
		name: "Psywave",
		pp: 24,
		priority: 0,
		flags: {
			protect: 1,
			mirror: 1
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
		zMovePower: 100,
		contestType: "Clever",
	},
	"geargrind": {
		num: 544,
		accuracy: 85,
		basePower: 50,
		category: "Physical",
		desc: "Hits twice. If the first hit breaks the target's substitute, it will take damage for the second hit.",
		shortDesc: "Hits 2 times in one turn.",
		id: "geargrind",
		isViable: true,
		name: "Gear Grind",
		pp: 16,
		priority: 0,
		flags: {
			contact: 1,
			protect: 1,
			mirror: 1
		},
		multihit: 2,
		secondary: null,
		target: "normal",
		type: "Steel",
		zMovePower: 100,
		contestType: "Clever",
	},
	"shadowsky": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Summons Shadow Sky",
		id: "shadowsky",
		name: "Shadow Sky",
		pp: 16,
		priority: 0,
		flags: {},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Sunny Day", target);
		},
		weather: 'shadowsky',
		secondary: null,
		target: "all",
		type: "Ghost",
		zMoveBoost: {
			spe: 1
		},
	},
	"aircurrent": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Summons Air Current",
		id: "aircurrent",
		name: "Air Current",
		pp: 16,
		priority: 0,
		flags: {},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', target, "Tailwind", source);
		},
		weather: 'aircurrent',
		secondary: null,
		target: "all",
		type: "Flying",
		zMoveBoost: {
			spe: 1
		},
	},
	"hurricane": {
		num: 542,
		accuracy: 70,
		basePower: 110,
		category: "Special",
		desc: "Has a 30% chance to confuse the target. This move can hit a target using Bounce, Fly, or Sky Drop. If the weather is Rain Dance, this move does not check accuracy. If the weather is Sunny Day, this move's accuracy is 50%.",
		shortDesc: "30% chance to confuse target. Can't miss in rain or air current.",
		id: "hurricane",
		isViable: true,
		name: "Hurricane",
		pp: 10,
		priority: 0,
		flags: {
			protect: 1,
			mirror: 1,
			distance: 1
		},
		onModifyMove: function(move) {
			if (this.field.isWeather(['raindance', 'primordialsea', 'aircurrent'])) {
				move.accuracy = true;
			} else if (this.field.isWeather(['sunnyday', 'desolateland'])) {
				move.accuracy = 50;
			}
		},
		secondary: {
			chance: 30,
			volatileStatus: 'confusion',
		},
		target: "any",
		type: "Flying",
		zMovePower: 185,
		contestType: "Tough",
	},
	"weatherball": {
		num: 311,
		accuracy: 100,
		basePower: 50,
		basePowerCallback: function(pokemon, target, move) {
			if (this.weather) return move.basePower * 2;
			return move.basePower;
		},
		category: "Special",
		desc: "Power doubles during weather effects and this move's type changes to match; Ice type during Hail, Water type during Rain Dance, Rock type during Sandstorm, and Fire type during Sunny Day.",
		shortDesc: "Power doubles and type varies in each weather.",
		id: "weatherball",
		name: "Weather Ball",
		pp: 10,
		priority: 0,
		flags: {
			bullet: 1,
			protect: 1,
			mirror: 1
		},
		onModifyMove: function(move) {
			switch (this.field.effectiveWeather()) {
				case 'sunnyday':
				case 'desolateland':
					move.type = 'Fire';
					break;
				case 'raindance':
				case 'primordialsea':
					move.type = 'Water';
					break;
				case 'sandstorm':
					move.type = 'Rock';
					break;
				case 'hail':
					move.type = 'Ice';
					break;
				case 'aircurrent':
					move.type = 'Flying';
					break;
			}
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		zMovePower: 160,
		contestType: "Beautiful",
	},
	"trickroom": {
		num: 433,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "For 5 turns, all active Pokemon with lower Speed will move before those with higher Speed, within their priority brackets. If this move is used during the effect, the effect ends.",
		shortDesc: "For 5 turns, slower Pokemon move first.",
		id: "trickroom",
		name: "Trick Room",
		pp: 5,
		priority: -7,
		flags: {
			mirror: 1
		},
		pseudoWeather: 'trickroom',
		condition: {
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
			this.field.removePseudoWeather('magicroom');
			this.field.removePseudoWeather('wonderroom');
			this.field.removePseudoWeather('inverseroom');
				this.add('-fieldstart', 'move: Trick Room', '[of] ' + source);
			},
			onRestart: function(target, source) {
				return null;
			},
			onResidualOrder: 23,
			onEnd: function() {
				this.add('-fieldend', 'move: Trick Room');
			},
		},
		secondary: null,
		target: "all",
		type: "Psychic",
		zMoveBoost: {
			accuracy: 1
		},
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
		flags: {
			mirror: 1
		},
		pseudoWeather: 'magicroom',
		condition: {
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
			this.field.removePseudoWeather('wonderroom');
			this.field.removePseudoWeather('inverseroom');
				this.add('-fieldstart', 'move: Magic Room', '[of] ' + source);
			},
			onRestart: function(target, source) {
				return null;
			},
			// Item suppression implemented in Pokemon.ignoringItem() within sim/pokemon.js
			onResidualOrder: 25,
			onEnd: function() {
				this.add('-fieldend', 'move: Magic Room', '[of] ' + this.effectData.source);
			},
		},
		secondary: null,
		target: "all",
		type: "Psychic",
		zMoveBoost: {
			spd: 1
		},
		contestType: "Clever",
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
		condition: {
			duration: 5,
			durationCallback: function (source, effect) {
				if (source && source.hasAbility('persistent')) {
					return 7;
				}
					else if (source && source.hasItem('roomextender')) {
					return 8;
				}
				return 5;
			},
			onStart: function (side, source) {
			this.field.removePseudoWeather('trickroom');
			this.field.removePseudoWeather('magicroom');
			this.field.removePseudoWeather('inverseroom');
				this.add('-fieldstart', 'move: Wonder Room', '[of] ' + source);
			},
			onRestart: function (target, source) {
				this.field.removePseudoWeather('wonderroom');
			},
			// Swapping defenses implemented in sim/pokemon.js:Pokemon#calculateStat and Pokemon#getStat
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
	"astonish": {
		num: 130,
		accuracy: 100,
		basePower: 40,
		category: "Physical",
		desc: "Has a 100% chance to flinch the target. Fails unless it is the user's first turn on the field.",
		shortDesc: "Hits first. First turn out only. 100% flinch chance.",
		id: "astonish",
		isViable: true,
		name: "Astonish",
		pp: 10,
		priority: 3,
		flags: {contact: 1, protect: 1, mirror: 1},
		onTry: function (pokemon, target) {
			if (pokemon.activeTurns > 1) {
				this.attrLastMove('[still]');
				this.add('-fail', pokemon);
				this.add('-hint', "Astonish only works on your first turn out.");
				return null;
			}
		},
		secondary: {
			chance: 100,
			volatileStatus: 'flinch',
		},
		target: "normal",
		type: "Ghost",
		zMovePower: 100,
		contestType: "Cute",
	},
	"armthrust": {
		num: 292,
		accuracy: 100,
		basePower: 25,
		category: "Physical",
		desc: "Hits two to five times. Has a 1/3 chance to hit two or three times, and a 1/6 chance to hit four or five times. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. If the user has the Ability Skill Link, this move will always hit five times.",
		shortDesc: "Hits 2-5 times in one turn.",
		id: "armthrust",
		name: "Arm Thrust",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		multihit: [2, 5],
		secondary: null,
		target: "normal",
		type: "Fighting",
		zMovePower: 100,
		contestType: "Tough",
	},
	"spikecannon": {
		num: 131,
		accuracy: 100,
		basePower: 25,
		category: "Physical",
		desc: "Hits two to five times. Has a 1/3 chance to hit two or three times, and a 1/6 chance to hit four or five times. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. If the user has the Ability Skill Link, this move will always hit five times.",
		shortDesc: "Hits 2-5 times in one turn.",
		id: "spikecannon",
		name: "Spike Cannon",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		multihit: [2, 5],
		secondary: null,
		target: "normal",
		type: "Steel",
		zMovePower: 100,
		contestType: "Cool",
	},
	"poisonsting": {
		num: 40,
		accuracy: 100,
		basePower: 25,
		category: "Physical",
		desc: "Hits two to five times. Has a 1/3 chance to hit two or three times, and a 1/6 chance to hit four or five times. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. If the user has the Ability Skill Link, this move will always hit five times.",
		shortDesc: "Hits 2-5 times in one turn.",
		id: "poisonsting",
		name: "Poison Sting",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		multihit: [2, 5],
		secondary: null,
		target: "normal",
		type: "Poison",
		zMovePower: 100,
		contestType: "Clever",
	},
	"bubblebeam": {
		num: 61,
		accuracy: 100,
		basePower: 25,
		category: "Special",
		desc: "Hits two to five times. Has a 1/3 chance to hit two or three times, and a 1/6 chance to hit four or five times. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. If the user has the Ability Skill Link, this move will always hit five times.",
		shortDesc: "Hits 2-5 times in one turn.",
		id: "bubblebeam",
		name: "Bubble Beam",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		multihit: [2, 5],
		secondary: null,
		target: "normal",
		type: "Water",
		zMovePower: 100,
		contestType: "Beautiful",
	},
	"powdersnow": {
		num: 410,
		accuracy: 100,
		basePower: 40,
		category: "Special",
		desc: "No additional effect.",
		shortDesc: "Usually goes first. 10% Freeze chance.",
		id: "powdersnow",
		name: "Powder Snow",
		pp: 30,
		priority: 1,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 10,
			status: 'frz',
		},
		target: "normal",
		type: "Ice",
		zMovePower: 100,
		contestType: "Beautiful",
	},
	"pragmastrike": {
		accuracy: 100,
		basePower: 75,
		basePowerCallback: function (pokemon, target, move) {
			if (this.field.pseudoWeather.trickroom || this.field.pseudoWeather.wonderroom || this.field.pseudoWeather.inverseroom || this.field.pseudoWeather.magicroom) {
				return move.basePower * 1.5;
			}
			return move.basePower;
		},
		category: "Physical",
		desc: "Has a 100% chance to lower the target's Speed by 1 stage.",
		shortDesc: "If a Room is active, 1.5x power; destroys the Room.",
		id: "pragmastrike",
		name: "Pragma-Strike",
		pp: 10,
		priority: 0,
		flags: {
			protect: 1,
			mirror: 1,
		},
		secondary: null,
		onAfterHit: function(target, source) {
			this.field.removePseudoWeather('trickroom');
			this.field.removePseudoWeather('magicroom');
			this.field.removePseudoWeather('wonderroom');
			this.field.removePseudoWeather('inverseroom');
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Power Trip", target);
		},
		target: "normal",
		type: "Dark",
		zMovePower: 140,
		contestType: "Tough",
	},
"wildcharge": {
		num: 528,
		accuracy: 80,
		basePower: 150,
		category: "Physical",
		desc: "If the target lost HP, the user takes recoil damage equal to 1/2 the HP lost by the target, rounded half up, but not less than 1 HP.",
		shortDesc: "Has 1/2 recoil.",
		id: "wildcharge",
		isViable: true,
		name: "Wild Charge",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		recoil: [1, 2],
		secondary: null,
		target: "normal",
		type: "Electric",
		zMovePower: 200,
		contestType: "Tough",
	},
	"stickyweb": {
		inherit: true,
		condition: {
			onStart: function (side) {
				this.add('-sidestart', side, 'move: Sticky Web');
			},
			onSwitchIn: function (pokemon) {
				if (!pokemon.isGrounded() || pokemon.hasItem('safetysocks')) return;
				this.add('-activate', pokemon, 'move: Sticky Web');
				this.boost({spe: -1}, pokemon, pokemon.side.foe.active[0], this.getMove('stickyweb'));
			},
		},
	},
	"toxicspikes": {
		inherit: true,
		condition: {
			// this is a side condition
			onStart: function (side) {
				this.add('-sidestart', side, 'move: Toxic Spikes');
				this.effectData.layers = 1;
			},
			onRestart: function (side) {
				if (this.effectData.layers >= 2) return false;
				this.add('-sidestart', side, 'move: Toxic Spikes');
				this.effectData.layers++;
			},
			onSwitchIn: function (pokemon) {
				if (!pokemon.isGrounded()) return;
				if (!pokemon.runImmunity('Poison')) return;
				if (!pokemon.hasItem('safetysocks')) return;
				if (pokemon.hasType('Poison')) {
					this.add('-sideend', pokemon.side, 'move: Toxic Spikes', '[of] ' + pokemon);
					pokemon.side.removeSideCondition('toxicspikes');
				} else if (this.effectData.layers >= 2) {
					pokemon.trySetStatus('tox', pokemon.side.foe.active[0]);
				} else {
					pokemon.trySetStatus('psn', pokemon.side.foe.active[0]);
				}
			},
		},
	},
	"skyuppercut": {
        num: 327,
        accuracy: 100,
        basePower: 70,
        category: "Physical",
        desc: "This move's type effectiveness against Flying is changed to be super effective no matter what this move's type is.",
        shortDesc: "Super effective on Flying.",
        id: "skyuppercut",
        isViable: true,
        name: "Sky Uppercut",
        pp: 20,
        priority: 0,
        flags: {protect: 1, mirror: 1, contact: 1, punch: 1},
        onEffectiveness(typeMod, target, type) {
            if (type === 'Flying') return 1;
        },
        target: "normal",
        type: "Fighting",
        contestType: "Cool",
    },
   "leafage": {
        num: 670,
        accuracy: 100,
        basePower: 40,
        category: "Physical",
        shortDesc: "+1 Priority.",
        id: "leafage",
        name: "Leafage",
        pp: 40,
        priority: 1,
        flags: {protect: 1, mirror: 1},
        secondary: null,
        target: "normal",
        type: "Grass",
        contestType: "Tough",
    },
    "fairywind": {
        num: 584,
        accuracy: 100,
        basePower: 40,
        category: "Special",
        shortDesc: "+1 Priority.",
        id: "fairywind",
        name: "Fairy Wind",
        pp: 30,
        priority: 1,
        flags: {protect: 1, mirror: 1},
        secondary: null,
        target: "normal",
        type: "Fairy",
        contestType: "Beautiful",
    },
    "fissure": {
        num: 90,
        accuracy: 90,
        basePower: 130,
        category: "Physical",
        desc: "Lowers the user's Attack by 2 stages.",
        shortDesc: "Lowers the user's Atk by 2.",
        id: "fissure",
        isViable: true,
        name: "Fissure",
        pp: 5,
        priority: 0,
        flags: {protect: 1, mirror: 1, nonsky: 1},
        self: {
            boosts: {
                atk: -2,
            },
        },
        secondary: null,
        target: "normal",
        type: "Ground",
        contestType: "Beautiful",
    },
    "guillotine": {
        num: 12,
        accuracy: 90,
        basePower: 130,
        category: "Physical",
        desc: "Lowers the user's Attack by 2 stages.",
        shortDesc: "Lowers the user's Atk by 2.",
        id: "guillotine",
        isViable: true,
        name: "Guillotine",
        pp: 5,
        priority: 0,
        flags: {protect: 1, mirror: 1, contact: 1, blade: 1},
        self: {
            boosts: {
                atk: -2,
            },
        },
        secondary: null,
        target: "normal",
        type: "Normal",
        contestType: "Beautiful",
    },
    "horndrill": {
        num: 32,
        accuracy: 90,
        basePower: 130,
        category: "Physical",
        desc: "Lowers the user's Attack by 2 stages.",
        shortDesc: "Lowers the user's Atk by 2.",
        id: "horndrill",
        isViable: true,
        name: "Horn Drill",
        pp: 5,
        priority: 0,
        flags: {protect: 1, mirror: 1, contact: 1},
        self: {
            boosts: {
                atk: -2,
            },
        },
        secondary: null,
        target: "normal",
        type: "Normal",
        contestType: "Beautiful",
    },
    "sheercold": {
        num: 329,
        accuracy: 90,
        basePower: 130,
        category: "Special",
        desc: "Lowers the user's Special Attack by 2 stages.",
        shortDesc: "Lowers the user's Sp. Atk by 2.",
        id: "sheercold",
        isViable: true,
        name: "Sheer Cold",
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
        type: "Ice",
        contestType: "Beautiful",
    },
    "rollout": {
        num: 205,
        accuracy: 100,
        basePower: 120,
        category: "Physical",
        desc: "The user spends two or three turns locked into this move and becomes confused immediately after its move on the last turn of the effect if it is not already. This move targets an opposing Pokemon at random on each turn. If the user is prevented from moving, is asleep at the beginning of a turn, or the attack is not successful against the target on the first turn of the effect or the second turn of a three-turn effect, the effect ends without causing confusion. If this move is called by Sleep Talk and the user is asleep, the move is used for one turn and does not confuse the user.",
        shortDesc: "Lasts 2-3 turns. Confuses the user afterwards.",
        id: "rollout",
        isViable: true,
        name: "Rollout",
        pp: 10,
        priority: 0,
        flags: {contact: 1, protect: 1, mirror: 1},
        self: {
            volatileStatus: 'lockedmove',
        },
        onAfterMove(pokemon) {
            if (pokemon.volatiles['lockedmove'] && pokemon.volatiles['lockedmove'].duration === 1) {
                pokemon.removeVolatile('lockedmove');
            }
        },
        secondary: null,
        target: "randomNormal",
        type: "Rock",
        contestType: "Cool",
    },
    "iceball": {
        num: 301,
        accuracy: 100,
        basePower: 120,
        category: "Physical",
        desc: "The user spends two or three turns locked into this move and becomes confused immediately after its move on the last turn of the effect if it is not already. This move targets an opposing Pokemon at random on each turn. If the user is prevented from moving, is asleep at the beginning of a turn, or the attack is not successful against the target on the first turn of the effect or the second turn of a three-turn effect, the effect ends without causing confusion. If this move is called by Sleep Talk and the user is asleep, the move is used for one turn and does not confuse the user.",
        shortDesc: "Lasts 2-3 turns. Confuses the user afterwards.",
        id: "iceball",
        isViable: true,
        name: "iceball",
        pp: 10,
        priority: 0,
        flags: {contact: 1, protect: 1, mirror: 1, bullet: 1},
        self: {
            volatileStatus: 'lockedmove',
        },
        onAfterMove(pokemon) {
            if (pokemon.volatiles['lockedmove'] && pokemon.volatiles['lockedmove'].duration === 1) {
                pokemon.removeVolatile('lockedmove');
            }
        },
        secondary: null,
        target: "randomNormal",
        type: "Ice",
        contestType: "Cool",
    },
    "furycutter": {
        num: 210,
        accuracy: 100,
        basePower: 120,
        category: "Physical",
        desc: "The user spends two or three turns locked into this move and becomes confused immediately after its move on the last turn of the effect if it is not already. This move targets an opposing Pokemon at random on each turn. If the user is prevented from moving, is asleep at the beginning of a turn, or the attack is not successful against the target on the first turn of the effect or the second turn of a three-turn effect, the effect ends without causing confusion. If this move is called by Sleep Talk and the user is asleep, the move is used for one turn and does not confuse the user.",
        shortDesc: "Lasts 2-3 turns. Confuses the user afterwards.",
        id: "furycutter",
        isViable: true,
        name: "Fury Cutter",
        pp: 10,
        priority: 0,
        flags: {contact: 1, protect: 1, mirror: 1, blade: 1},
        self: {
            volatileStatus: 'lockedmove',
        },
        onAfterMove(pokemon) {
            if (pokemon.volatiles['lockedmove'] && pokemon.volatiles['lockedmove'].duration === 1) {
                pokemon.removeVolatile('lockedmove');
            }
        },
        secondary: null,
        target: "randomNormal",
        type: "Bug",
        contestType: "Cool",
    },
};
