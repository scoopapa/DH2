'use strict'
exports.BattleMovedex = {
	"backdraft": {
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		shortDesc: "If this attack damages a target, the User's Attack rises one stage. If this attack targets a Fire-type Pokemon, the User's Attack rises by two stages.",
		id: "backdraft",
		name: "Backdraft",
		pp: 16,
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1},
		secondary: {
			chance: 100,
			self: {
				boosts: {
					atk: 1,
				},
			},
		},
		onAfterMoveSecondarySelf: function(pokemon, target, move) {
			if (target.hasType('Fire')) this.boost({
				atk: 1
			}, pokemon, pokemon, move);
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Flare Blitz", target);
		},
		target: "normal",
		type: "Fire",
		zMovePower: 160,
	},
	"overclock": {
		accuracy: 100,
		basePower: 40,
		basePowerCallback: function(pokemon, target, move) {
			if (pokemon.boosts.atk > 0) {
				return move.basePower + 40 * pokemon.boosts.atk;
			} else {
				return move.basePower;
			}
		},
		category: "Physical",
		shortDesc: "This move's Base Power rises by 40 for every stage the Attack stat is boosted. User recovers 50% of the damage dealt.",
		id: "overclock",
		name: "Overclock",
		pp: 8,
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1, punch: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Flare Blitz", target);
		},
		drain: [1, 2],
		secondary: false,
		target: "normal",
		type: "Fire",
		zMovePower: 160,
	},
	"syncrekick": {
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		shortDesc: "This move's Base Power rises by 30 for every kick move executed by this Pokemon since switching in.",
		id: "syncrekick",
		name: "Syncrekick",
		pp: 8,
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Low Kick", target);
		},
		secondary: false,
		target: "normal",
		type: "Water",
		zMovePower: 160,
	},
	"poisonmelt": {
		accuracy: 100,
		basePower: 70,
		category: "Special",
		shortDesc: "This attack hits Steel-types super effectively and has a 30% chance to decrease the target’s SpD by 1 stage.",
		id: "poisonmelt",
		name: "Poison Melt",
		pp: 32,
		priority: 0,
		flags: {protect: 1, mirror: 1,},
		secondary: {
			chance: 10,
			boosts: {
				spd: -1,
			},
		},
		onEffectiveness: function(typeMod, type) {
			if (type === 'Steel') return 1;
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Acid Downpour", target);
		},
		ignoreImmunity: true,
		target: "normal",
		type: "Poison",
		zMovePower: 175,
	},
	"passiveagressivity": {
		accuracy: 100,
		basePower: 0,
		damage: 'level',
		category: "Special",
		desc: "Deals damage to the target equal to the user's level. 20% chance of raising the user's defences by 1 stage each.",
		shortDesc: "Does damage equal to the user's level. 20% chance of raising the user's defences by 1 stage each.",
		id: "seismictoss",
		isViable: true,
		name: "Passive-Agressivity",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 20,
			self: {
				boosts: {
					def: 1,
					spd: 1,
				},
			},
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Seismic Toss", target);
		},
		target: "normal",
		type: "Fighting",
		zMovePower: 100,
	},
	"tremors": {
		accuracy: 100,
		basePower: 25,
		category: "Physical",
		desc: "Hits two to five times. Has a 1/3 chance to hit two or three times, and a 1/6 chance to hit four or five times. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. If the user has the Skill Link Ability, this move will always hit five times.",
		shortDesc: "Hits 2-5 times in one turn.",
		id: "tremors",
		isViable: true,
		name: "Tremors",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, nonsky: 1},
		multihit: [2, 5],
		secondary: null,
		target: "normal",
		type: "Ground",
		zMovePower: 140,
	},
	"passiveaggressivity": {
		accuracy: 100,
		basePower: 0,
		damage: 'level',
		category: "Special",
		desc: "Deals damage to the target equal to the user's level.",
		shortDesc: "Does damage equal to the user's level.",
		id: "passiveaggressivity",
		isViable: true,
		name: "Passive-Aggressivity",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Psychic",
		zMovePower: 100,
	},
	"flutterdust": {
		accuracy: 100,
		basePower: 50,
		category: "Special",
		desc: "Lowers the target's SpD, SpA and Spe by 1 stage.",
		shortDesc: "Lowers the target's SpD, SpA and Spe by 1 stage",
		id: "flutterdust",
		isViable: true,
		name: "Flutter Dust",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		boosts: {
			spa: -1,
			spd: -1,
			spe: -1,
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Bug Buzz", target);
		},
		target: "normal",
		type: "Bug",
		zMovePower: 100,
	},
	"stingerstorm": {
		accuracy: 100,
		basePower: 25,
		category: "Physical",
		desc: "Hits two to five times. Has a 1/3 chance to hit two or three times, and a 1/6 chance to hit four or five times. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. If the user has the Skill Link Ability, this move will always hit five times.",
		shortDesc: "Hits 2-5 times in one turn; 10% chance to poison",
		id: "stingerstorm",
		isViable: true,
		name: "Stinger Storm",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		multihit: [2, 5],
		secondary: {
			chance: 10,
			status: 'psn',
		},
		target: "normal",
		type: "Poison",
		zMovePower: 140,
	},
	"beautydrain": {
		accuracy: 100,
		basePower: 80,
		category: "Special",
		desc: "The user recovers 1/2 the HP lost by the target, rounded half up. If Big Root is held by the user, the HP recovered is 1.3x normal, rounded half down.",
		shortDesc: "User recovers 50% of the damage dealt.",
		id: "beautydrain",
		isViable: true,
		name: "Beauty Drain",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, heal: 1},
		drain: [1, 2],
		secondary: null,
		target: "normal",
		type: "Fairy",
		zMovePower: 160,
	},
	"toxicturmoil": {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		desc: "Removes 4 PP from last used move. If the opponent is poisoned, the PP reduction is doubled.",
		shortDesc: "Removes 4 PP from last used move. If the opponent is poisoned, the PP reduction is doubled.",
		id: "toxicturmoil",
		name: "Toxic Turmoil",
		pp: 20,
		priority: 0,
		flags: {
			protect: 1,
			reflectable: 1,
			mirror: 1,
			authentic: 1
		},
		onHit: function(target) {
			if (target.lastMove) {
				let ppDeducted = target.deductPP(target.lastMove.id, 4);
				if (target.status === 'psn' || target.status === 'tox') {
					ppDeducted = target.deductPP(target.lastMove.id, 8);
				}
				if (ppDeducted) {
					this.add("-activate", target, 'move: Spite', this.getMove(target.lastMove.id).name, ppDeducted);
					return;
				}
			}
			return false;
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Toxic", target);
		},
		secondary: false,
		target: "normal",
		type: "Poison",
		zMoveBoost: {
			spd: 1
		},
	},
	"jubileedance": {
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		desc: "This move's type depends on the user's primary type. If the user's primary type is typeless, this move's type is the user's secondary type if it has one, otherwise the added type from Forest's Curse or Trick-or-Treat. This move is typeless if the user's type is typeless alone.",
		shortDesc: "Type varies based on the user's primary type.",
		id: "jubileedance",
		isViable: true,
		name: "Jubilee Dance",
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
	},
	"regireset": {
		accuracy: 100,
		basePower: 100,
		category: "Special",
		desc: "No additional effect.",
		shortDesc: "No additional effect. Hits adjacent Pokemon.",
		id: "regireset",
		isViable: true,
		name: "Regireset",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, authentic: 1},
		onHit: function (target) {
			target.clearBoosts();
			this.add('-clearboost', target);
		},
		secondary: null,
		target: "allAdjacent",
		type: "Steel",
		zMovePower: 180,
	},
	"checkmate": {
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		desc: "Prevents the target from switching out. The target can still switch out if it is holding Shed Shell or uses Baton Pass, Parting Shot, U-turn, or Volt Switch. If the target leaves the field using Baton Pass, the replacement will remain trapped. The effect ends if the user leaves the field.",
		shortDesc: "Prevents the target from switching out.",
		id: "checkmate",
		isViable: true,
		name: "Checkmate",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 100,
			onHit: function (target, source, move) {
				if (source.isActive) target.addVolatile('trapped', source, move, 'trapper');
			},
		},
		target: "normal",
		type: "Steel",
		zMovePower: 160,
	},
	"cobblestone": {
		accuracy: 100,
		basePower: 0,
		damageCallback: function (pokemon) {
			if (!pokemon.volatiles['cobblestone']) return 0;
			return pokemon.volatiles['cobblestone'].damage || 1;
		},
		category: "Physical",
		desc: "Deals damage to the last opposing Pokemon to hit the user with an attack this turn equal to 1.5 times the HP lost by the user from that attack, rounded down. If the user did not lose HP from the attack, this move deals 1 HP of damage instead. If that opposing Pokemon's position is no longer in use and there is another opposing Pokemon on the field, the damage is done to it instead. Only the last hit of a multi-hit attack is counted. Fails if the user was not hit by an opposing Pokemon's attack this turn.",
		shortDesc: "If hit by an attack, returns 1.5x damage.",
		id: "cobblestone",
		name: "Cobblestone",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		beforeTurnCallback: function (pokemon) {
			pokemon.addVolatile('cobblestone');
		},
		onTryHit: function (target, source, move) {
			if (!source.volatiles['cobblestone']) return false;
			if (source.volatiles['cobblestone'].position === null) return false;
		},
		effect: {
			duration: 1,
			noCopy: true,
			onStart: function (target, source, source2, move) {
				this.effectData.position = null;
				this.effectData.damage = 0;
			},
			onRedirectTargetPriority: -1,
			onRedirectTarget: function (target, source, source2) {
				if (source !== this.effectData.target) return;
				return source.side.foe.active[this.effectData.position];
			},
			onAfterDamage: function (damage, target, source, effect) {
				if (effect && effect.effectType === 'Move' && source.side !== target.side) {
					this.effectData.position = source.position;
					this.effectData.damage = 1.5 * damage;
				}
			},
		},
		secondary: null,
		target: "scripted",
		type: "Rock",
		zMovePower: 100,
	},
	"fracture": {
		accuracy: 100,
		basePower: 60,
		category: "Special",
		desc: "No additional effect.",
		shortDesc: "Usually goes first; 20% chance to flinch",
		id: "fracture",
		isViable: true,
		name: "Fracture",
		pp: 20,
		priority: 1,
		flags: {contact: 1, protect: 1, mirror: 1},
      secondary: {
			chance: 20,
			volatileStatus: 'flinch',
		},
		target: "normal",
		type: "Ground",
		zMovePower: 100,
	},
	"crocobite": {
		accuracy: 90,
		basePower: 90,
		category: "Physical",
		desc: "Prevents the target from switching out. The target can still switch out if it is holding Shed Shell or uses Baton Pass, Parting Shot, U-turn, or Volt Switch. If the target leaves the field using Baton Pass, the replacement will remain trapped. The effect ends if the user leaves the field.",
		shortDesc: "Prevents the target from switching out.",
		id: "crocobite",
		isViable: true,
		name: "Crocobite",
		pp: 20,
		priority: 0,
		flags: {bite: 1, contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 100,
			onHit: function (target, source, move) {
				if (source.isActive) target.addVolatile('trapped', source, move, 'trapper');
			},
		},
		target: "normal",
		type: "Water",
		zMovePower: 175,
	},
	"shiftingplates": {
		accuracy: 90,
		basePower: 60,
		category: "Physical",
		desc: "If both the user and the target have not fainted, the target is forced to switch out and be replaced with a random unfainted ally. This effect fails if the target used Ingrain previously, has the Suction Cups Ability, or this move hit a substitute.",
		shortDesc: "Forces the target to switch to a random ally.",
		id: "shiftingplates",
		isViable: true,
		name: "Shifting Plates",
		pp: 10,
		priority: -6,
		flags: {contact: 1, protect: 1, mirror: 1},
		forceSwitch: true,
		target: "normal",
		type: "Ground",
		zMovePower: 120,
	},
	"stumblepunch": {
		accuracy: 90,
		basePower: 100,
		category: "Physical",
		desc: "Lowers the user's Speed and Attack by 1 stage.",
		shortDesc: "Lowers the user's Speed and Attack by 1.",
		id: "stumblepunch",
		isViable: true,
		name: "Stumble Punch",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1},
		self: {
			boosts: {
				atk: -1,
				spe: -1,
			},
		},
		secondary: null,
		target: "normal",
		type: "Fairy",
		zMovePower: 180,
	},
	"meteorshower": {
		accuracy: 90,
		basePower: 90,
		category: "Special",
		desc: "Has a 20% chance to raise the user's Special Attack by 1 stage.",
		shortDesc: "20% chance to raise the user's Sp. Atk by 1.",
		id: "meteorshower",
		name: "Meteor Shower",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 20,
			self: {
				boosts: {
					spa: 1,
				},
			},
		},
		target: "normal",
		type: "Rock",
		zMovePower: 185,
	},
	"backspinkick": {
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		desc: "Applies Telekinesis to the opponent",
		shortDesc: "Applies Telekinesis to the opponent",
		id: "backspinkick",
		isViable: true,
		name: "Backspin Kick",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		volatileStatus: 'telekinesis',
		effect: {
			duration: 3,
			onStart: function (target) {
				if (['Diglett', 'Dugtrio', 'Palossand', 'Sandygast'].includes(target.baseTemplate.baseSpecies) ||
						target.baseTemplate.species === 'Gengar-Mega') {
					this.add('-immune', target, '[msg]');
					return null;
				}
				if (target.volatiles['smackdown'] || target.volatiles['ingrain']) return false;
				this.add('-start', target, 'Telekinesis');
			},
			onAccuracyPriority: -1,
			onAccuracy: function (accuracy, target, source, move) {
				if (move && !move.ohko) return true;
			},
			onImmunity: function (type) {
				if (type === 'Ground') return false;
			},
			onUpdate: function (pokemon) {
				if (pokemon.baseTemplate.species === 'Gengar-Mega') {
					delete pokemon.volatiles['telekinesis'];
					this.add('-end', pokemon, 'Telekinesis', '[silent]');
				}
			},
			onResidualOrder: 16,
			onEnd: function (target) {
				this.add('-end', target, 'Telekinesis');
			},
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
		zMovePower: 120,
	},
	"warpsin": {
		accuracy: 100,
		basePower: 40,
		category: "Physical",
		desc: "Removes binding, Leech Seed, and hazards from the user or user's field. If any targeted the user this turn, the user executes that move on the initial sender.",
		shortDesc: "Removes binding, Leech Seed, and hazards from the user or user's field. If any targeted the user this turn, the user executes that move on the initial sender.", //Get move execution working
		id: "warpspin",
		isViable: true,
		name: "Warp Spin",
		pp: 40,
		priority: -1,
		flags: {contact: 1, protect: 1, mirror: 1},
		self: {
			onHit: function (pokemon) {
				if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
					this.add('-end', pokemon, 'Leech Seed', '[from] move: Rapid Spin', '[of] ' + pokemon);
				}
				let sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb'];
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
		secondary: null,
		target: "normal",
		type: "Psychic",
		zMovePower: 100,
	},
	"vampirefang": {
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		desc: "The user recovers 1/2 the HP lost by the target, rounded half up. If Big Root is held by the user, the HP recovered is 1.3x normal, rounded half down.",
		shortDesc: "User recovers 50% of the damage dealt.",
		id: "vampirefang",
		isViable: true,
		name: "Vampire Fang",
		pp: 10,
		priority: 0,
		flags: {bite: 1, protect: 1, mirror: 1, heal: 1},
		drain: [1, 2],
		secondary: null,
		target: "normal",
		type: "Poison",
		zMovePower: 160,
	},
	"devilrystrike": {
		accuracy: 100,
		basePower: 110,
		category: "Physical",
		desc: "Does neutral damage to Fairy types",
		shortDesc: "Does neutral damage to Fairy types",
		id: "devilrystrike",
		isViable: true,
		name: "Devilry Strike",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onEffectiveness: function (typeMod, type) {
			if (type === 'Fairy') return 0;
		},
		secondary: null,
		target: "normal",
		type: "Dark",
		zMovePower: 185,
		contestType: "Beautiful",
	},
};
