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
	"drainingminds": {
		accuracy: 100,
		basePower: 80,
		category: "Special",
		desc: "The user recovers 1/2 the HP lost by the target, rounded half up. If Big Root is held by the user, the HP recovered is 1.3x normal, rounded half down.",
		shortDesc: "User recovers 50% of the damage dealt.",
		id: "drainingminds",
		name: "Draining Minds",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, heal: 1},
		drain: [1, 2],
		secondary: false,
		target: "normal",
		type: "Psychic",
		zMovePower: 160,
		contestType: "Clever",
	},
	"frostofaurora": {
		accuracy: 90,
		basePower: 100,
		category: "Special",
		desc: "This move's type effectiveness against Grass is changed to be super effective no matter what this move's type is.",
		shortDesc: "This move deals super effective damage on Grass",
		id: "frostofaurora",
		isViable: true,
		name: "Frost of Aurora",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: false,
		onEffectiveness: function(typeMod, type) {
			if (type === 'Grass') return 1;
		},
		target: "normal",
		type: "Water",
		zMovePower: 180,
		contestType: "Beautiful",
	},
	"magneticbeam": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Prevents the target from switching for four or five turns; seven turns if the user is holding Grip Claw. Causes damage to the target equal to 1/8 of its maximum HP (1/6 if the user is holding Binding Band), rounded down, at the end of each turn during effect. The target can still switch out if it is holding Shed Shell or uses Baton Pass, Parting Shot, U-turn, or Volt Switch. The effect ends if either the user or the target leaves the field, or if the target uses Rapid Spin or Substitute. This effect is not stackable or reset by using this or another partial-trapping move.",
		shortDesc: "Traps and damages the target for 4-5 turns.",
		id: "magneticbeam",
		name: "Magnetic Beam",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: false,
		volatileStatus: 'partiallytrapped',
		target: "normal",
		type: "Electric",
		zMoveBoost: {spe: 2},
		contestType: "Beautiful",
	},
	"fullpowered": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Raises the user's Attack, Defense, and Speed by 2 stages. This attack charges on the first turn and executes on the second. If the user is holding a Power Herb, the move completes in one turn.",
		shortDesc: "Charges, then raises Atk, Def, Spe by 2 turn 2.",
		id: "fullpowered",
		isViable: true,
		name: "Full Powered",
		pp: 5,
		priority: 0,
		flags: {charge: 1, nonsky: 1},
		onTry: function(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name, defender);
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				this.add('-anim', attacker, move.name, defender);
				attacker.removeVolatile(move.id);
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
		boosts: {
			atk: 2,
			def: 2,
			spe: 2,
		},
		secondary: false,
		target: "self",
		type: "Steel",
		zMoveBoost: {atk: 1, def: 1, spa: 1, spd: 1, spe: 1},
		contestType: "Clever",
	},
	"icyteardrop": {
		accuracy: 100,
		basePower: 60,
		category: "Special",
		desc: "Has a 30% chance to lower the target's accuracy by 2 stages.",
		shortDesc: "30% chance to lower the target's accuracy by 2.",
		id: "icyteardrop",
		name: "Icy Teardrop",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			boosts: {
				accuracy: -2,
			}
		},
		target: "normal",
		type: "Ice",
		zMovePower: 120,
		contestType: "Cute",
	},
	"shieldoftheforest": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Raises Defense and Special Defense of the user by 2 stages each, lowers Attack, Special Attack and Speed of the user by 1 stage each",
		shortDesc: "+ Def and SpD by 2. -Atk, SpA and Spe by 1.",
		id: "shieldoftheforest",
		isViable: true,
		name: "Shield of the Forest",
		pp: 15,
		priority: 0,
		flags: {snatch: 1},
		boosts: {
			def: 2,
			spd: 2,
			atk: -1,
			spa: -1,
			spe: -1,
		},
		secondary: false,
		target: "self",
		type: "Grass",
		zMoveEffect: 'clearnegativeboost',
		contestType: "Tough",
	},
	"magicalwater": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user restores 1/2 of its maximum HP, rounded half down. If the weather is Rain, the user instead restores 2/3 of its maximum HP, rounded half down. If the weather is Sun, the move only heals 1/4.",
		shortDesc: "User restores 1/2 its max HP; 2/3 in Rain, 25% in Sun.",
		id: "magicalwater",
		isViable: true,
		name: "Magical Water",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		onHit: function(pokemon) {
			if (this.field.isWeather(['raindance', 'primordialsea'])) {
				this.heal(this.modify(pokemon.maxhp, 0.667));
			} else if (this.field.isWeather(['sunnyday', 'desolateland'])) {
				this.heal(this.modify(pokemon.maxhp, 0.25));
			}  else {
				this.heal(this.modify(pokemon.maxhp, 0.5));
			}
		},
		secondary: false,
		target: "self",
		type: "Water",
		zMoveEffect: 'clearnegativeboost',
		contestType: "Beautiful",
	},
	"electriccloud": {
		accuracy: 95,
		basePower: 65,
		category: "Special",
		desc: "This move has 30% chance to paralyze the foe, under Rain Dance, the power is doubled",
		shortDesc: "30% chance paralyze foe. In Rain, x2 power",
		id: "electriccloud",
		isViable: true,
		name: "Electric Cloud",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyMove: function(move) {
			if (this.field.isWeather(['raindance', 'primordialsea'])) {
				return move.basePower * 2;
			}
		},
		secondary: {
			chance: 30,
			status: 'par',

		},
		target: "normal",
		type: "Electric",
		zMovePower: 140,
		contestType: "Cool",
	},
	"dynamitekick": {
		accuracy: 90,
		basePower: 100,
		category: "Physical",
		desc: "Has a 10% chance to paralyze the target. If the user misses, it loses 1/3 of its health",
		shortDesc: "10% chance paralyze foe. If miss, 1/3 recoil damage",
		id: "dynamitekick",
		isViable: true,
		name: "Dynamite Kick",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		hasCustomRecoil: true,
		onMoveFail: function(target, source, move) {
			this.damage(source.maxhp / 3, source, source, 'dynamitekick');
		},
		secondary: {
			chance: 10,
			status: 'par',
		},
		target: "normal",
		type: "Fighting",
		zMovePower: 190,
		contestType: "Cool",
	},
	"megatonpunch": {
		accuracy: 85,
		basePower: 130,
		category: "Physical",
		desc: "Has a 30% chance of paralyzing the foe",
		shortDesc: "30% chance paralyze the target",
		id: "megatonpunch",
		isViable: true,
		name: "Megaton Punch",
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1},
		pp: 10,
		priority: 0,
		secondary: {
			chance: 30,
			status: 'par',
		},
		target: "normal",
		type: "Fighting",
		zMovePower: 210,
		contestType: "Tough",
	},
	"bombattack": {
		accuracy: 55,
		basePower: 150,
		category: "Physical",
		desc: "Have a 40% chance of confusing the target",
		shortDesc: "40% chance of confusing the target",
		id: "bombattack",
		isViable: true,
		name: "Bomb Attack",
		pp: 5,
		priority: 0,
		flags: {bullet: 1, contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 40,
			volatileStatus: 'confusion',
		},
		target: "normal",
		type: "Fighting",
		zMovePower: 220,
		contestType: "Tough",
	},
	"poisonscent": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "This move spreads a poisoned air onto the battlefield for 5 turns, Pokemon in battle take damage factoring Poison weakness each turn",
		shortDesc: "Passive damage each turn, Poison weakness",
		id: "poisonscent",
		isViable: true,
		name: "Poison Scent",
		pp: 10,
		priority: 0,
		flags: {},
		weather: 'poisonscent',
		secondary: false,
		target: "all",
		type: "Poison",
		zMoveBoost: {spe: 1},
		contestType: "Clever",
	},
	"iciclestatue": {
		accuracy: 95,
		basePower: 130,
		category: "Special",
		desc: "This move drops the user's Special Attack by 2 stages after use. 40% chance of freezing the foe",
		shortDesc: "Drops the user's SpA by 2. 40% freeze.",
		id: "iciclestatue",
		isViable: true,
		name: "Icicle Statue",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		self: {
			boosts: {
				spa: -2,
			},
		},
		secondary: {
			chance: 40,
			status: 'frz',

		},
		target: "normal",
		type: "Ice",
		zMovePower: 200,
		contestType: "Beautiful",
	},
	"iceberg": {
		accuracy: 100,
		basePower: 65,
		category: "Special",
		desc: "Has a 10% chance to lower the target's Speed by 2 stages.",
		shortDesc: "10% chance -Spe by 2.",
		id: "iceberg",
		isViable: true,
		name: "iceberg",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 10,
			boosts: {
				spe: -2,
			},
		},
		target: "normal",
		type: "Water",
		zMovePower: 130,
		contestType: "Cute",
	},
	"trickydimension": {
		accuracy: 60,
		basePower: 140,
		category: "Special",
		desc: "The Pokemon hits extremely hard so that it twists the dimensions. Setup Trick Room after damaging the target",
		shortDesc: "Hits extremely hard. Setup Trick Room.",
		id: "trickydimension",
		isViable: true,
		name: "Tricky Dimension",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onHit: function(source, effect) {
			this.field.addPseudoWeather('trickroom', source, effect, '[of] ' + source);

		},
		secondary: false,
		target: "normal",
		type: "Psychic",
		zMovePower: 210,
		contestType: "Clever",
	},
	"metalcutters": {
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		desc: "Has a higher chance for a critical hit",
		shortDesc: "High critical hit ratio",
		id: "metalcutters",
		isViable: true,
		name: "Metal Cutters",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		critRatio: 2,
		secondary: false,
		target: "allAdjacentFoes",
		type: "Steel",
		zMovePower: 160,
		contestType: "Cool",
	},
	"magmabomb": {
		accuracy: 100,
		basePower: 80,
		category: "Special",
		desc: "This move deals also Rock type damage in combination of Fire type damage. 20% chance to burn the foe",
		shortDesc: "+Rock type effectiveness. 20% burn chance",
		id: "magmabomb",
		isViable: true,
		name: "Magma Bomb",
		pp: 10,
		priority: 0,
		flags: {bullet: 1, protect: 1, mirror: 1},
		onEffectiveness: function(typeMod, type, move) {
			return typeMod + this.getEffectiveness('Rock', type);
		},
		secondary: {
			chance: 20,
			status: 'brn',

		},
		target: "normal",
		type: "Fire",
		zMovePower: 160,
		contestType: "Tough",
	},
	"rapidspin": {
		num: 229,
		accuracy: 100,
		basePower: 20,
		category: "Physical",
		desc: "If this move is successful and the user has not fainted, the effects of Leech Seed and partial-trapping moves end for the user, and all hazards are removed from the user's side of the field.",
		shortDesc: "Frees user from hazards/partial trap/Leech Seed.",
		id: "rapidspin",
		isViable: true,
		name: "Rapid Spin",
		pp: 40,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		self: {
			onHit: function (pokemon) {
				if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
					this.add('-end', pokemon, 'Leech Seed', '[from] move: Rapid Spin', '[of] ' + pokemon);
				}
				let sideConditions = {spikes:1, toxicspikes:1, stealthrock:1, stickyweb:1, marabunta:1, burningthorns:1, stunningbarbs:1};
				for (let i in sideConditions) {
					if (pokemon.hp && pokemon.side.removeSideCondition(i)) {
						this.add('-sideend', pokemon.side, this.getEffect(i).name, '[from] move: Rapid Spin', '[of] ' + pokemon);
					}
				}
				if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
					pokemon.removeVolatile('partiallytrapped');
				}
			},
		},
		secondary: false,
		target: "normal",
		type: "Normal",
		zMovePower: 100,
		contestType: "Cool",
	},
	"defog": {
		num: 432,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Lowers the target's evasiveness by 1 stage. If this move is successful and whether or not the target's evasiveness was affected, the effects of Reflect, Light Screen, Safeguard, Mist, Spikes, Toxic Spikes, Stealth Rock, and Sticky Web end for the target's side, and the effects of Spikes, Toxic Spikes, Stealth Rock, and Sticky Web end for the user's side. Ignores a target's substitute, although a substitute will still block the lowering of evasiveness.",
		shortDesc: "-1 evasion; clears user and target side's hazards.",
		id: "defog",
		isViable: true,
		name: "Defog",
		pp: 15,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, authentic: 1},
		onHit: function (target, source, move) {
			if (!target.volatiles['substitute'] || move.infiltrates) this.boost({evasion:-1});
			let removeTarget = {reflect:1, lightscreen:1, auroraveil: 1, safeguard:1, mist:1, spikes:1, toxicspikes:1, stealthrock:1, stickyweb:1, marabunta:1, burningthorns:1, stunningbarbs:1};
			let removeAll = {spikes:1, toxicspikes:1, stealthrock:1, stickyweb:1, marabunta:1, burningthorns:1, stunningbarbs:1};
			for (let targetCondition in removeTarget) {
				if (target.side.removeSideCondition(targetCondition)) {
					if (!removeAll[targetCondition]) continue;
					this.add('-sideend', target.side, this.getEffect(targetCondition).name, '[from] move: Defog', '[of] ' + target);
				}
			}
			for (let sideCondition in removeAll) {
				if (source.side.removeSideCondition(sideCondition)) {
					this.add('-sideend', source.side, this.getEffect(sideCondition).name, '[from] move: Defog', '[of] ' + source);
				}
			}
		},
		secondary: false,
		target: "normal",
		type: "Flying",
		zMoveBoost: {accuracy: 1},
		contestType: "Cool",
	},
	"metalliccrush": {
		accuracy: 75,
		basePower: 150,
		category: "Physical",
		desc: "This move cause half of the damage dealt into recoil, this recoil is negated if the user has the ability Rock Head",
		shortDesc: "Deals 1/2 of damage dealt in recoil",
		id: "metalliccrush",
		isViable: true,
		name: "Metallic Crush",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		recoil: [1, 2],
		secondary: false,
		target: "normal",
		type: "Steel",
		zMovePower: 200,
		contestType: "Tough",
	},
	"mindgame": {
		accuracy: 100,
		basePower: 90,
		category: "Special",
		desc: "This move uses the target Special Attack stat in damage calculation",
		shortDesc: "Uses the foe's SpA in damage calculation",
		id: "mindgame",
		isViable: true,
		name: "Mind Game",
		flags: {mirror: 1, protect: 1},
		pp: 15,
		priority: 0,
		useTargetOffensive: true,
		secondary: false,
		target: "normal",
		type: "Psychic",
		zMovePower: 175,
		contestType: "Clever",
	},
	"mythicalpunch": {
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		defensiveCategory: "Special",
		desc: "This move uses the target's Special Defense in damage calculation instead of Defense",
		shortDesc: "Uses Special Defense instead of Defense in damage calculation",
		id: "mythicalpunch",
		isViable: true,
		name: "Mythical Punch",
		flags: {mirror: 1, protect: 1, contact: 1, punch: 1},
		pp: 15,
		priority: 0,
		secondary: false,
		target: "normal",
		type: "Fighting",
		zMovePower: 175,
		contestType: "Clever",
	},
	"fairyfangs": {
		accuracy: 100,
		basePower: 75,
		category: "Physical",
		desc: "30% chance to flinch",
		id: "fairyfangs",
		isViable: true,
		name: "Fairy Fangs",
		flags: {mirror: 1, protect: 1, contact: 1, bite: 1},
		pp: 15,
		priority: 0,
		secondary: {
			chance: 30,
			volatileStatus: 'flinch',
		},
		target: "normal",
		type: "Fairy",
		zMovePower: 175,
		contestType: "Clever",
	},
	"ninjastrike": {
		accuracy: 50,
		basePower: 100,
		category: "Physical",
		desc: "100% chance to confuse the foe",
		id: "ninjastrike",
		isViable: true,
		name: "Ninja Strike",
		flags: {mirror: 1, protect: 1, contact: 1},
		pp: 15,
		priority: 0,
		secondary: {
			chance: 100,
			volatileStatus: 'confusion',
		},
		target: "normal",
		type: "Dark",
		zMovePower: 190,
		contestType: "Clever",
	},
	"fireshock": {
		accuracy: 100,
		basePower: 65,
		category: "Special",
		desc: "Power doubles if the target is burned.",
		shortDesc: "Power doubles if the target is burned.",
		id: "fireshock",
		name: "Fireshock",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onBasePowerPriority: 4,
		onBasePower: function (basePower, pokemon, target) {
			if (target.status === 'brn') {
				return this.chainModify(2);
			}
		},
		secondary: false,
		target: "normal",
		type: "Fire",
		zMovePower: 120,
		contestType: "Beautiful",
	},
	"cryotherapy": {
		accuracy: 100,
		basePower: 65,
		category: "Special",
		desc: "Power doubles if the target is frozen.",
		shortDesc: "Power doubles if the target is frozen.",
		id: "cryotherapy",
		name: "Cryotherapy",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onBasePowerPriority: 4,
		onBasePower: function (basePower, pokemon, target) {
			if (target.status === 'frz') {
				return this.chainModify(2);
			}
		},
		secondary: false,
		target: "normal",
		type: "Ice",
		zMovePower: 120,
		contestType: "Beautiful",
	},
	"parashock": {
		accuracy: 100,
		basePower: 65,
		category: "Special",
		desc: "Power doubles if the target is paralyzed.",
		shortDesc: "Power doubles if the target is paralyzed.",
		id: "parashock",
		name: "parashock",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onBasePowerPriority: 4,
		onBasePower: function (basePower, pokemon, target) {
			if (target.status === 'par') {
				return this.chainModify(2);
			}
		},
		secondary: false,
		target: "normal",
		type: "Electric",
		zMovePower: 120,
		contestType: "Beautiful",
	},
	"autumnseason": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "This move heals the user by 50% of its max HP, rounded half down",
		shortDesc: "Heals 50% of max HP",
		id: "autumnseason",
		isViable: true,
		name: "Autumn Season",
		flags: {snatch: 1, heal: 1},
		pp: 10,
		priority: 0,
		heal: [1, 2],
		secondary: false,
		target: "self",
		type: "Grass",
		zMoveEffect: 'clearnegativeboost',
		contestType: "Clever",
	},
	"bellbang": {
		accuracy: 100,
		basePower: 110,
		category: "Special",
		shortDesc: "No additional effect, hits adjacent foes",
		id: "bellbang",
		isViable: true,
		name: "Bell Bang",
		flags: {protect: 1, mirror: 1, sound: 1, authentic: 1},
		pp: 15,
		priority: 0,
		secondary: false,
		target: "allAdjacentFoes",
		type: "Steel",
		zMovePower: 190,
		contestType: "Clever",
	},
	"prayerofheaven": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Raises the user's Special Attack and Speed by 12 stages in exchange for the user losing 1/2 of its maximum HP, rounded down. Fails if the user would faint or if its Special Attack or Speed stat stage is 6.",
		shortDesc: "Cut 50% max HP. Max Special Attack + Speed.",
		id: "prayerofheaven",
		name: "Prayer of Heaven",
		pp: 10,
		priority: 0,
		flags: {snatch: 1},
		onHit: function(target) {
			if (target.hp <= target.maxhp / 2 || target.boosts.spa >= 6 || target.boosts.spe >= 6 || target.maxhp === 1) { // Shedinja clause
				return false;
			}
			this.directDamage(target.maxhp / 2);
			this.boost({spa: 12, spe: 12}, target);
		},
		secondary: false,
		target: "self",
		type: "Fairy",
		zMoveEffect: 'heal',
		contestType: "Cute",
	},
	"congelation": {
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		desc: "Has a 30% chance to freeze the target.",
		shortDesc: "30% chance to freeze the target.",
		id: "congelation",
		isViable: true,
		name: "Congelation",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			status: 'frz',
		},
		target: "normal",
		type: "Ice",
		zMovePower: 160,
		contestType: "Beautiful",
	},
	"timeout": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user restores 1/2 of its maximum HP, rounded half up, priority -1",
		shortDesc: "Heals 50% of max HP, priority -1",
		id: "timeout",
		isViable: true,
		name: "Time Out",
		pp: 10,
		priority: -1,
		flags: {snatch: 1, heal: 1},
		heal: [1, 2],
		secondary: false,
		target: "self",
		type: "Fighting",
		zMoveEffect: 'clearnegativeboost',
		contestType: "Clever",
	},
	"cursedsentence": {
		accuracy: 100,
		basePower: 85,
		category: "Special",
		desc: "Power doubles if the target is Cursed.",
		shortDesc: "Power doubles if the target is Cursed.",
		id: "cursed sentence",
		isViable: true,
		name: "Cursed Sentence",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onBasePowerPriority: 4,
		onBasePower: function(basePower, pokemon, target) {
			if (target.volatileStatus === 'curse') {
				return this.chainModify(2);
			}
		},
		secondary: false,
		target: "normal",
		type: "Ghost",
		zMovePower: 160,
		contestType: "Cool",
	},
	"goddesssong": {
		accuracy: 100,
		basePower: 75,
		category: "Special",
		desc: "Has a 10% chance to cause the target to fall asleep.",
		shortDesc: "10% chance to sleep foe(s).",
		id: "goddesssong",
		isViable: true,
		name: "Goddess Song",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, authentic: 1},
		secondary: {
			chance: 10,
			status: 'slp',
		},
		target: "allAdjacentFoes",	
		type: "Fairy",
		zMovePower: 140,
		contestType: "Beautiful",
	},
	"marabunta": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Sets up a hazard on the foe's side of the field, damaging the foe according to their weakness to Bug and lowering the evasion by 1 stage of each foe that switches in, unless it is a Flying-type Pokemon or has the Ability Levitate. Can be used only once before failing. Can be removed from the foe's side if any foe uses Rapid Spin or Defog, or is hit by Defog.",
		shortDesc: "Switch-in, -1 eva, damage Bug weakness",
		id: "marabunta",
		isViable: true,
		name: "Marabunta",
		pp: 20,
		priority: 0,
		flags: {reflectable: 1},
		sideCondition: 'marabunta',
		effect: {
			onStart: function(side) {
				this.add('-sidestart', side, 'move: Marabunta');
			},
			onSwitchIn: function(pokemon) {
				if (!pokemon.isGrounded()) return;
				this.add('-activate', pokemon, 'move: Marabunta');
				let typeMod = this.clampIntRange(pokemon.runEffectiveness('Bug'), -6, 6);
				this.damage(pokemon.maxhp * Math.pow(2, typeMod) / 8);
				this.boost({
					evasion: -1
				}, pokemon, pokemon.side.foe.active[0], this.getMove('marabunta'));
			},
		},
		secondary: false,
		target: "foeSide",
		type: "Bug",
		zMoveBoost: {evasion: 1},
		contestType: "Tough",
	},
	"skywrath": {
		accuracy: 70,
		basePower: 110,
		category: "Special",
		desc: "Has a 20% chance to confuse the target. This move can hit a target using Bounce, Fly, or Sky Drop. If the weather is Rain Dance, this move does not check accuracy. If the weather is Sunny Day, this move's accuracy is 50%, lands Rain on hit",
		shortDesc: "20% confuse chance, Rain no miss, Land Rain",
		id: "skywrath",
		isViable: true,
		name: "Sky Wrath",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, distance: 1},
		onHit: function(target) {
			this.setWeather('raindance');
		},
		onModifyMove: function(move) {
			if (this.field.isWeather(['raindance', 'primordialsea'])) {
				move.accuracy = true;
			} else if (this.field.isWeather(['sunnyday', 'desolateland'])) {
				move.accuracy = 50;
			}
		},
		secondary: {
			chance: 20,
			volatileStatus: 'confusion',
		},
		target: "any",
		type: "Flying",
		zMovePower: 185,
		contestType: "Tough",
        },
	"quickpoopthrow": {
		accuracy: 100,
		basePower: 40,
		category: "Special",
		desc: "Has a 10% chance to badly poison the target. Priority +1",
		shortDesc: "10% chance to badly poison the target. Priority +1",
		id: "quickpoopthrow",
		name: "Quick Poop Throw",
		pp: 20,
		priority: 1,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 10,
			status: 'tox',
		},
		target: "normal",
		type: "Poison",
		zMovePower: 100,
		contestType: "Clever",
	},
        "giantpoopthrow": {
		accuracy: 85,
		basePower: 120,
		category: "Special",
		desc: "Has a 30% chance to confuse the target.",
		shortDesc: "30% chance to confuse the target.",
		id: "giantpoopthrow",
		name: "Giant Poop Throw",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			volatileStatus: 'confusion',
		},
		target: "normal",
		type: "Poison",
		zMovePower: 190,
		contestType: "Clever",
	},
	"randomquickpoopthrow": {
		accuracy: 100,
		basePower: 50,
		category: "Special",
		desc: "Has a 20% chance to badly poison the foe(s). Priority +1",
		shortDesc: "20% chance to badly poison the foe(s). Priority +1",
		id: "randomquickpoopthrow",
		name: "Random Quick Poop Throw",
		pp: 15,
		priority: 1,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 20,
			status: 'tox',
		},
		target: "allAdjacentFoes",
		type: "Poison",
		zMovePower: 100,
		contestType: "Clever",
	},
	"randomgiantpoopthrow": {
		accuracy: 85,
		basePower: 110,
		category: "Special",
		desc: "Has a 30% chance to confuse the foe(s).",
		shortDesc: "30% chance to confuse the foe(s).",
		id: "randomgiantpoopthrow",
		name: "Random Giant Poop Throw",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			volatileStatus: 'confusion',
		},
		target: "allAdjacentFoes",
		type: "Poison",
		zMovePower: 170,
		contestType: "Clever",
	},
	"stinkscent": {
		accuracy: 95,
		basePower: 85,
		category: "Special",
		desc: "Has a 30% chance to paralyse the foe(s).",
		shortDesc: "30% chance to paralyse the foe(s).",
		id: "stinkscent",
		name: "Stink Scent",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			status: 'par',
		},
		target: "allAdjacentFoes",
		type: "Poison",
		zMovePower: 190,
		contestType: "Clever",
	},
        "poopytimebomb": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Summons a poop time bomb on the field, considered a weather. After 3 turns, the bomb explodes and all active pokemon faint",
		shortDesc: "A poop bomb is summoned. After 3 turns, Pokemon faint",
		id: "poopytimebomb",
		name: "Poopy Time Bomb",
		pp: 10,
		priority: 0,
		flags: {},
		weather: 'poopytimebomb',
		secondary: false,
		target: "all",
		type: "Poison",
		zMoveBoost: {spe: 3},
		contestType: "Clever",
	},
	"propulsorbeam": {
		accuracy: 85,
		basePower: 110,
		category: "Special",
		desc: "Has a 30% chance to burn the target.",
		shortDesc: "30% chance to burn the target.",
		id: "propulsorbeam",
		isViable: true,
		name: "Propulsor Beam",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			status: 'brn',
		},
		target: "normal",
		type: "Fire",
		zMovePower: 185,
		contestType: "Beautiful",
	},
	"megabeam": {
		accuracy: 90,
		basePower: 110,
		category: "Special",
		desc: "Steel-type move that has 30% chance of dropping the foe's Special Defense by 3 stages",
		shortDesc: "30% chance to drop SpD by 3.",
		id: "megabeam",
		name: "Mega Beam",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			boosts: {
				spd: -3,
			},
		},
		target: "normal",
		type: "Steel",
		zMovePower: 190,
		contestType: "Cool",
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
		onHitField: function (target, source, effect) {
			if (this.field.pseudoWeather['wonderroom']) {
				this.field.removePseudoWeather('wonderroom', source, effect, '[of] ' + source);
			} else {
				this.field.addPseudoWeather('wonderroom', source, effect, '[of] ' + source);
			}
		},
		effect: {
			duration: 5,
			durationCallback: function (source, effect) {
				if (source && source.hasItem('wonderstone')) {
					return 8;
				}
				return 5;
			},
			onStart: function (side, source) {
				this.add('-fieldstart', 'move: WonderRoom', '[of] ' + source);
			},
			// Swapping defenses implemented in battle-engine.js:BattlePokemon#calculateStat and BattlePokemon#getStat
			onResidualOrder: 24,
			onEnd: function () {
				this.add('-fieldend', 'move: Wonder Room');
			},
		},
		secondary: false,
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
		onHitField: function (target, source, effect) {
			if (this.field.pseudoWeather['magicroom']) {
				this.field.removePseudoWeather('magicroom', source, effect, '[of] ' + source);
			} else {
				this.field.addPseudoWeather('magicroom', source, effect, '[of] ' + source);
			}
		},
		effect: {
			duration: 5,
			durationCallback: function (source, effect) {
				if (source && source.hasItem('magicstone')) {
					return 8;
				}
				return 5;
			},
			onStart: function (target, source) {
				this.add('-fieldstart', 'move: Magic Room', '[of] ' + source);
			},
			// Item suppression implemented in BattlePokemon.ignoringItem() within battle-engine.js
			onResidualOrder: 25,
			onEnd: function () {
				this.add('-fieldend', 'move: Magic Room', '[of] ' + this.effectData.source);
			},
		},
		secondary: false,
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
		desc: "For 5 turns, all active Pokemon with lower Speed will move before those with higher Speed, within their priority brackets. If this move is used during the effect, the effect ends.",
		shortDesc: "For 5 turns, slower Pokemon move first.",
		id: "trickroom",
		name: "Trick Room",
		pp: 5,
		priority: -7,
		flags: {mirror: 1},
		onHitField: function (target, source, effect) {
			if (this.field.pseudoWeather['trickroom']) {
				this.field.removePseudoWeather('trickroom', source, effect, '[of] ' + source);
			} else {
				this.field.addPseudoWeather('trickroom', source, effect, '[of] ' + source);
			}
		},
		effect: {
			duration: 5,
			durationCallback: function (source, effect) {
				if (source && source.hasItem('trickystone')) {
					return 8;
				}
				return 5;
			},
			onStart: function (target, source) {
				this.add('-fieldstart', 'move: Trick Room', '[of] ' + source);
			},
			// Speed modification is changed in BattlePokemon.getDecisionSpeed() in battle-engine.js
			onResidualOrder: 23,
			onEnd: function () {
				this.add('-fieldend', 'move: Trick Room');
			},
		},
		secondary: false,
		target: "all",
		type: "Psychic",
		zMoveBoost: {accuracy: 1},
		contestType: "Clever",
	},
	"weatherball": {
		num: 311,
		accuracy: 100,
		basePower: 50,
		basePowerCallback: function (pokemon, target, move) {
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
		flags: {bullet: 1, protect: 1, mirror: 1},
		onModifyMove: function (move) {
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
			case  'poisonscent' :
				move.type= 'Poison';
				break;
			}
		},
		secondary: false,
		target: "normal",
		type: "Normal",
		zMovePower: 160,
		contestType: "Beautiful",
	},
	"naturetricks" : {
		accuracy: 100,
		basePower: 80,
		category: 'Physical',
		desc: "30% chance to flinch the target",
		id: "naturetricks",
		name: "Nature Tricks",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			volatileStatus: 'flinch',
		},
		target: "normal",
		type: "Grass",
		zMovePower: 160,
		contestType: "Cool",
	},
	"warpingawaykick": {
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		desc: "Does a very fast kick like the Pokemon was warping away, usually goes first. Boosts the user's Speed by 1 stage",
		shortDesc: "Usually goes first. +1 Speed for the user.",
		id: "warpingawaykick",
		isViable: true,
		name: "Warping Away Kick",
		pp: 10,
		priority: 2,
		flags: {protect: 1, mirror: 1, contact: 1},
		self: {
			boosts: {
				spe: 1,
			},
		},
		secondary: false,
		target: "normal",
		type: "Fighting",
		zMovePower: 180,
		contestType: "Tough",
	},
	"atkblast": {
		accuracy: 100,
		basePower: 0,
		damageCallback: function (pokemon) {
			let damage = pokemon.stats.atk;
			pokemon.faint();
			return damage;
		},
		category: "Special",
		desc: "Deals damage to the target equal to the user's current Attack. If this move is successful, the user faints.",
		shortDesc: "Does damage equal to the user's Attack. User faints.",
		id: "atkblast",
		isViable: true,
		name: "ATK Blast",
		pp: 5,
		priority: 0,
		flags: {protect: 1},
		selfdestruct: "ifHit",
		secondary: false,
		target: "normal",
		type: "Fighting",
		zMovePower: 180,
		contestType: "Tough",
	},
	"defblast": {
		accuracy: 100,
		basePower: 0,
		damageCallback: function (pokemon) {
			let damage = pokemon.stats.def;
			pokemon.faint();
			return damage;
		},
		category: "Special",
		desc: "Deals damage to the target equal to the user's current Defense. If this move is successful, the user faints.",
		shortDesc: "Does damage equal to the user's Defense. User faints.",
		id: "defblast",
		isViable: true,
		name: "DEF Blast",
		pp: 5,
		priority: 0,
		flags: {protect: 1},
		selfdestruct: "ifHit",
		secondary: false,
		target: "normal",
		type: "Fighting",
		zMovePower: 180,
		contestType: "Tough",
	},
	"spablast": {
		basePower: 0,
		damageCallback: function (pokemon) {
			let damage = pokemon.stats.spa;
			pokemon.faint();
			return damage;
		},
		category: "Special",
		desc: "Deals damage to the target equal to the user's current Special Attack. If this move is successful, the user faints.",
		shortDesc: "Does damage equal to the user's Special Attack. User faints.",
		id: "spablast",
		isViable: true,
		name: "SpA Blast",
		pp: 5,
		priority: 0,
		flags: {protect: 1},
		selfdestruct: "ifHit",
		secondary: false,
		target: "normal",
		type: "Fighting",
		zMovePower: 180,
		contestType: "Tough",
	},
	"spdblast": {
		accuracy: 100,
		basePower: 0,
		damageCallback: function (pokemon) {
			let damage = pokemon.stats.spd;
			pokemon.faint();
			return damage;
		},
		category: "Special",
		desc: "Deals damage to the target equal to the user's current Special Defense. If this move is successful, the user faints.",
		shortDesc: "Does damage equal to the user's Special Defense. User faints.",
		id: "spdblast",
		isViable: true,
		name: "SpD Blast",
		pp: 5,
		priority: 0,
		flags: {protect: 1},
		selfdestruct: "ifHit",
		secondary: false,
		target: "normal",
		type: "Fighting",
		zMovePower: 180,
		contestType: "Tough",
	},
	"holysnow": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user restores 1/2 of its maximum HP, rounded half down. If the weather is Hail, the user instead restores 2/3 of its maximum HP, rounded half down. If the weather is Sandstorm, the move only heals 1/4.",
		shortDesc: "User restores 1/2 its max HP; 2/3 in Hail, 25% in Sand.",
		id: "holysnow",
		isViable: true,
		name: "Holy Snow",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		onHit: function(pokemon) {
			if (this.field.isWeather(['hail'])) {
				this.heal(this.modify(pokemon.maxhp, 0.667));
			} else if (this.field.isWeather(['sandstorm'])) {
				this.heal(this.modify(pokemon.maxhp, 0.25));
			}  else {
				this.heal(this.modify(pokemon.maxhp, 0.5));
			}
		},
		secondary: false,
		target: "self",
		type: "Ice",
		zMoveEffect: 'clearnegativeboost',
		contestType: "Beautiful",
	},
	"shoreup": {
		gen: 7,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user restores 1/2 of its maximum HP, rounded half down. If the weather is Sandstorm, the user instead restores 2/3 of its maximum HP, rounded half down. If the weather is Hail, the move only heals 1/4.",
		shortDesc: "User restores 1/2 its max HP; 2/3 in Sand, 25% in Hail.",
		id: "shoreup",
		isViable: true,
		name: "Shore Up",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		onHit: function(pokemon) {
			if (this.field.isWeather(['sandstorm'])) {
				this.heal(this.modify(pokemon.maxhp, 0.667));
			} else if (this.field.isWeather(['hail'])) {
				this.heal(this.modify(pokemon.maxhp, 0.25));
			}  else {
				this.heal(this.modify(pokemon.maxhp, 0.5));
			}
		},
		secondary: false,
		target: "self",
		type: "Ground",
		zMoveEffect: 'clearnegativeboost',
		contestType: "Beautiful",
	},	
	"speedblast": {
		accuracy: 100,
		basePower: 0,
		damageCallback: function (pokemon) {
			let damage = pokemon.stats.spe;
			pokemon.faint();
			return damage;
		},
		category: "Special",
		desc: "Deals damage to the target equal to the user's current Speed. If this move is successful, the user faints.",
		shortDesc: "Does damage equal to the user's Speed. User faints.",
		id: "speedblast",
		isViable: true,
		name: "Speed Blast",
		pp: 5,
		priority: 0,
		flags: {protect: 1},
		selfdestruct: "ifHit",
		secondary: false,
		target: "normal",
		type: "Fighting",
		zMovePower: 180,
		contestType: "Tough",
	},
	"burningthorns": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Sets up a hazard on the foe's side of the field, burning each foe that switches in, unless it is a Flying-type Pokemon or has the Ability Levitate. Can be used up to one time before failing. Can be removed from the foe's side if any foe uses Rapid Spin or Defog, is hit by Defog, or a grounded Fire-type Pokemon switches in. Safeguard prevents the foe's party from being burned on switch-in, but a substitute does not.",
		shortDesc: "Burns grounded foes on switch-in. Max 1 layer.",
		id: "burningthorns",
		isViable: true,
		name: "Burning Thorns",
		pp: 20,
		priority: 0,
		flags: {reflectable: 1, nonsky: 1},
		sideCondition: 'burningthorns',
		effect: {
			// this is a side condition
			onStart: function (side) {
				this.add('-sidestart', side, 'move: Burning Thorns');
				this.effectData.layers = 1;
			},
			onSwitchIn: function (pokemon) {
				if (!pokemon.isGrounded()) return;
				if (!pokemon.runImmunity('Fire')) return;
				if (pokemon.hasType('Fire')) {
					this.add('-sideend', pokemon.side, 'move: Burning Thorns', '[of] ' + pokemon);
					pokemon.side.removeSideCondition('burningthorns');
				} else {
					pokemon.trySetStatus('brn', pokemon.side.foe.active[0]);
				}
			},
		},
		secondary: false,
		target: "foeSide",
		type: "Fire",
		zMoveBoost: {def: 1},
		contestType: "Clever",
	},
	"stunningbarbs": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Sets up a hazard on the foe's side of the field, paralysing each foe that switches in, unless it is a Flying-type Pokemon or has the Ability Levitate. Can be used up to one time before failing. Can be removed from the foe's side if any foe uses Rapid Spin or Defog, is hit by Defog, or a grounded Electric-type Pokemon switches in. Safeguard prevents the foe's party from being paralysed on switch-in, but a substitute does not.",
		shortDesc: "Paralyses grounded foes on switch-in. Max 1 layer.",
		id: "stunningbarbs",
		isViable: true,
		name: "Stunning Barbs",
		pp: 20,
		priority: 0,
		flags: {reflectable: 1, nonsky: 1},
		sideCondition: 'stunningbarbs',
		effect: {
			// this is a side condition
			onStart: function (side) {
				this.add('-sidestart', side, 'move: Stunning Barbs');
				this.effectData.layers = 1;
			},
			onSwitchIn: function (pokemon) {
				if (!pokemon.isGrounded()) return;
				if (!pokemon.runImmunity('Electric')) return;
				if (pokemon.hasType('Electric')) {
					this.add('-sideend', pokemon.side, 'move: Stunning Barbs', '[of] ' + pokemon);
					pokemon.side.removeSideCondition('stunningbarbs');
				} else {
					pokemon.trySetStatus('par', pokemon.side.foe.active[0]);
				}
			},
		},
		secondary: false,
		target: "foeSide",
		type: "Electric",
		zMoveBoost: {def: 1},
		contestType: "Clever",
	},
	"cutietackle": {
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		desc: "The user cutely and quickly attacks its foe, usually goes first, fails if the target's not attacking",
		id: "cutietackle",
		isViable: true,
		name: "Cutie Tackle",
		pp: 10,
		priority: 1,
		flags: {protect: 1, mirror: 1, contact: 1},
		onTry: function (source, target) {
			let decision = this.willMove(target);
			if (!decision || decision.choice !== 'move' || (decision.move.category === 'Status' && decision.move.id !== 'mefirst') || target.volatiles.mustrecharge) {
				this.attrLastMove('[still]');
				this.add('-fail', source);
				return null;
			}
		},
		secondary: false,
		target: "normal",
		type: "Fairy",
		zMovePower: 160,
		contestType: "Cute",
	},
	"rageofmothernature": {
		accuracy: true,
		basePower: 170,
		category: "Physical",
		desc: "Combines Grass and Ground type effectivnesses in damage dealt",
		id: "rageofmothernature",
		isViable: true,
		name: "Rage of Mother Nature",
		pp: 1,
		priority: 0,
		flags: {contact: 1},
		isZ: "treenomiumz",
		onEffectiveness: function(typeMod, type, move) {
			return typeMod + this.getEffectiveness('Ground', type);
		},
		secondary: false,
		target: "normal",
		type: "Grass",
		contestType: "Beautiful",
	},
	"infernallavagrowl": {
		accuracy: true,
		basePower: 180,
		category: "Special",
		desc: "100% chance to burn the foe",
		id: "infernallavagrowl",
		isViable: true,
		name: "Infernal Lava Growl",
		pp: 1,
		priority: 0,
		flags: {},
		isZ: "volcanoliumz",
		secondary: {
			chance: 100,
			status: 'brn',

		},
		target: "normal",
		type: "Fire",
		contestType: "Beautiful",
	},
	"gianttidalwave": {
		accuracy: true,
		basePower: 210,
		category: "Special",
		desc: "Ignore stat changes of the foe",
		id: "gianttidalwave",
		isViable: true,
		name: "Giant Tidal Wave",
		pp: 1,
		priority: 0,
		flags: {},
		isZ: "poseidiumz",
		ignoreDefensive: true,
		ignoreEvasion: true,
		secondary: false,
		target: "normal",
		type: "Water",
		contestType: "Beautiful",
	},
	"redflarerush": {
		accuracy: true,
		basePower: 165,
		category: "Physical",
		desc: "Summons Sunny Day on hit",
		id: "redflarerush",
		isViable: true,
		name: "Red Flare Rush",
		pp: 1,
		priority: 0,
		flags: {},
		isZ: "flareoniumz",
		onHit: function(target) {
			this.setWeather('sunnyday');
		},
		secondary: false,
		target: "normal",
		type: "Fire",
		contestType: "Beautiful",
	},
	"blueoceandepths": {
		accuracy: true,
		basePower: 185,
		category: "Special",
		desc: "Summons Rain Dance on hit",
		id: "blueoceandepths",
		isViable: true,
		name: "Blue Ocean Depths",
		pp: 1,
		priority: 0,
		flags: {},
		isZ: "vaporeoniumz",
		onHit: function(target) {
			this.setWeather('raindance');
		},
		secondary: false,
		target: "normal",
		type: "Water",
		contestType: "Beautiful",
	},
	"highvoltagedischarge": {
		accuracy: true,
		basePower: 150,
		category: "Special",
		desc: "100% chance to paralyze the foe",
		id: "highvoltagedischarge",
		isViable: true,
		name: "High Voltage Discharge",
		pp: 1,
		priority: 0,
		flags: {},
		isZ: "jolteoniumz",
		secondary: {
			chance: 100,
			status: 'par',

		},
		target: "normal",
		type: "Electric",
		contestType: "Beautiful",
	},
	"icywindofthefarnorth": {
		accuracy: true,
		basePower: 160,
		category: "Special",
		desc: "100% chance to freeze the foe",
		id: "icywindofthefarnorth",
		isViable: true,
		name: "Icy Wind of The Far North",
		pp: 1,
		priority: 0,
		flags: {},
		isZ: "glaceoniumz",
		secondary: {
			chance: 100,
			status: 'frz',

		},
		target: "normal",
		type: "Ice",
		contestType: "Beautiful",
	},
	"mentalsevilnesscrusher": {
		accuracy: true,
		basePower: 180,
		category: "Special",
		desc: "This move is super effective against Dark",
		id: "mentalsevilnesscrusher",
		isViable: true,
		name: "Mental's Evilness Crusher",
		pp: 1,
		priority: 0,
		flags: {},
		isZ: "espeoniumz",
		onEffectiveness: function(typeMod, type) {
			if (type === 'Dark') return 1;
		},
		secondary: false,
		target: "normal",
		type: "Psychic",
		contestType: "Clever",
	},
	"ultimatemadness": {
		accuracy: true,
		basePower: 160,
		category: "Special",
		desc: "Steals the target's stat boosts before dealing damage",
		id: "ultimatemadness",
		isViable: true,
		name: "Ultimate Madness",
		pp: 1,
		priority: 0,
		flags: {},
		isZ: "umbreoniumz",
		stealsBoosts: true,
		secondary: false,
		target: "normal",
		type: "Dark",
		contestType: "Clever",
	},
	"blessingofthegods": {
		accuracy: true,
		basePower: 180,
		category: "Special",
		desc: "Setup Misty Terrain",
		id: "blessingofthegods",
		isViable: true,
		name: "Blessing of the Gods",
		pp: 1,
		priority: 0,
		flags: {},
		isZ: "sylveoniumz",
		secondary: {
			chance: 100,
			self: {
				onHit: function () {
					this.field.setTerrain('mistyterrain');
				},
			},
		},
		target: "normal",
		type: "Fairy",
		contestType: "Clever",
	},
	"extremepummeling": {
		accuracy: true,
		basePower: 200,
		category: "Physical",
		desc: "Ignores the foe stats boost when dealing damage",
		id: "extremepummeling",
		isViable: true,
		name: "Extreme Pummeling",
		pp: 1,
		priority: 0,
		flags: {contact: 1},
		isZ: "puncheoniumz",
		ignoreDefensive: true,
		ignoreEvasion: true,
		secondary: false,
		target: "normal",
		type: "Fighting",
		contestType: "Clever",
	},
	"wrathofshiningskies": {
		accuracy: true,
		basePower: 180,
		category: "Special",
		desc: "Deals super effective damage against Flying types",
		id: "wrathofshiningskies",
		isViable: true,
		name: "Wrath Of Shining Skies",
		pp: 1,
		priority: 0,
		flags: {},
		isZ: "zephyreoniumz",
		onEffectiveness: function(typeMod, type) {
			if (type === 'Flying') return 1;
		},
		secondary: false,
		target: "normal",
		type: "Flying",
		contestType: "Clever",
	},
	"giantsandburial": {
		accuracy: true,
		basePower: 165,
		category: "Special",
		desc: "Summons Sandstorm on hit",
		id: "giantsandburial",
		isViable: true,
		name: "Giant Sand Burial",
		pp: 1,
		priority: 0,
		flags: {},
		isZ: "landineoniumz",
		onHit: function(target) {
			this.setWeather('sandstorm');
		},
		secondary: false,
		target: "normal",
		type: "Ground",
		contestType: "Beautiful",
	},
	"sentenceofthewalkingdead": {
		accuracy: true,
		basePower: 160,
		category: "Special",
		desc: "100% chance to sleep the foe",
		id: "sentenceofthewalkingdead",
		isViable: true,
		name: "Sentence of the Walking Dead",
		pp: 1,
		priority: 0,
		flags: {},
		isZ: "tombeoniumz",
		secondary: {
			chance: 100,
			status: 'slp',

		},
		target: "normal",
		type: "Ghost",
		contestType: "Beautiful",
	},
	"rageofthesuperiordragon": {
		accuracy: true,
		basePower: 190,
		category: "Physical",
		desc: "Hits Fairy types super effectively",
		id: "rageofthesuperiordragon",
		isViable: true,
		name: "Rage of the Superior Dragon",
		pp: 1,
		priority: 0,
		flags: {},
		isZ: "quetzaleoniumz",
		onEffectiveness: function(typeMod, type) {
			if (type === 'Fairy') return 1;
		},
		secondary: false,
		target: "normal",
		type: "Dragon",
		contestType: "Beautiful",
	},
	"volcanicapocalypse": {
		accuracy: true,
		basePower: 180,
		category: "Physical",
		desc: "70% chance to burn the foe",
		id: "volcanicapocalypse",
		isViable: true,
		name: "Volcanic Apocalypse",
		pp: 1,
		priority: 0,
		flags: {},
		isZ: "groudoniumz",
		secondary: {
			chance: 70,
			status: 'brn',

		},
		target: "normal",
		type: "Ground",
		contestType: "Beautiful",
	},
	"outrageofthesevenseas": {
		accuracy: true,
		basePower: 190,
		category: "Special",
		desc: "Hits Dragon types super effectively",
		id: "outrageofthesevenseas",
		isViable: true,
		name: "Outrage of the Seven Seas",
		pp: 1,
		priority: 0,
		flags: {},
		isZ: "kyogriumz",
		onEffectiveness: function(typeMod, type) {
			if (type === 'Dragon') return 1;
		},
		secondary: false,
		target: "normal",
		type: "Water",
		contestType: "Beautiful",
	},
	"ultimatepoweroftheskies": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Raises the user's stats by 3 stages each, but traps it.",
		id: "ultimatepoweroftheskies",
		isViable: true,
		name: "Ultimate Power of the Skies",
		pp: 1,
		priority: 0,
		flags: {},
		isZ: "rayquazaniumz",
		onTrapPokemon: function (pokemon) {
				pokemon.tryTrap();
		},
		boosts: {
			atk: 3,
			def: 3,
			spa: 3,
			spd: 3,
			spe: 3,
		},
		secondary: false,
		target: "self",
		type: "Flying",
		contestType: "Beautiful",
	},
	"tradesforawish": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "User +2 in each stat, heal 1/2, but user is trapped",
		id: "tradesforawish",
		isViable: true,
		name: "Trades for a Wish",
		pp: 1,
		priority: 0,
		flags: {},
		isZ: "jirachiumz",
		onTrapPokemon: function (pokemon) {
				pokemon.tryTrap();
		},
		self: {
			atk: 2,
			def: 2,
			spa: 2,
			spd: 2,
			spe: 2,
			accuracy: 2,
			evasion: 2,
		},
		heal: [1,2],
		secondary: false,
		target: "self",
		type: "Normal",
		contestType: "Beautiful",
	},
 	"ultimatemindcontrol": {
		accuracy: true,
		basePower: 200,
		category: "Special",
		desc: "100% chance to confuse the foe",
		id: "ultimatemindcontrol",
		isViable: true,
		name: "Ultimate Mind Control",
		pp: 1,
		priority: 0,
		flags: {},
		isZ: "deoxyiumz",
		secondary: {
			chance: 100,
			volatileStatus: 'confusion',

		},
		target: "normal",
		type: "Psychic",
		contestType: "Beautiful",
	},	
	"lavashieldingdefense": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Raises user's defensive stats by 3 stages, and heals 50% HP",
		id: "lavashieldingdefense",
		isViable: true,
		name: "Lava Shielding Defense",
		pp: 1,
		priority: 0,
		flags: {heal: 1},
		isZ: "torkoaliumz",
		heal: [1,2],
		boosts: {
		        def: 3,
			spd: 3,
		},
		secondary: false,
		target: "self",
		type: "Fire",
		contestType: "Beautiful",
	},
	"wrathofthehundredyearoldtrees": {
		accuracy: true,
		basePower: 180,
		category: "Special",
		desc: "50% chance to randomly status a foe",
		id: "wrathofthehundredyearoldtrees",
		isViable: true,
		name: "Wrath of The Hundred-Year-Old Trees",
		pp: 1,
		priority: 0,
		flags: {},
		isZ: "leafeoniumz",
		secondary: {
			chance: 50,
			onHit: function (target, source) {
				let result = this.random(5);
				if (result === 0) {
					target.trySetStatus('brn', source);
				} else if (result === 1) {
					target.trySetStatus('par', source);
				} else if (result === 2) {
					target.trySetStatus('frz', source);
				} else if (result === 3) {
					target.trySetStatus('psn', source);
				} else if (result === 4) {
					target.trySetStatus('slp', source);
				}
			},
		},
		target: "normal",
		type: "Grass",
		contestType: "Cool",
	},
	"propheticalcurse": {
		accuracy: true,
		basePower: 210,
		category: "Special",
		desc: "Combines Fire and Ghost type effectivnesses in damage dealt",
		id: "propheticalcurse",
		isViable: true,
		name: "Prophetical Curse",
		pp: 1,
		priority: 0,
		flags: {},
		isZ: "ninetalesiumz",
		onEffectiveness: function(typeMod, type, move) {
			return typeMod + this.getEffectiveness('Fire', type);
		},
		secondary: false,
		target: "normal",
		type: "Ghost",
		contestType: "Beautiful",
	},
	"spectrallightningstrike": {
		accuracy: true,
		basePower: 160,
		category: "Special",
		desc: "Always results in a critical hit",
		id: "spectrallightningstrike",
		isViable: true,
		name: "Spectral Lightning Strike",
		pp: 1,
		priority: 0,
		flags: {},
		willCrit: true,
		isZ: "lunaliumz",
		secondary: false,
		target: "normal",
		type: "Ghost",
		contestType: "Beautiful",
	},
	"fullmetalheavyshot": {
		accuracy: true,
		basePower: 190,
		category: "Physical",
		desc: "100% chance to drop Defense by 2 stages",
		id: "fullmetalheavyshot",
		isViable: true,
		name: "Full Metal Heavy Shot",
		pp: 1,
		priority: 0,
		flags: {},
		isZ: "solgaleoniumz",
		secondary: {
			chance: 100,
			boosts: {
				def: -2,
			},
		},
		target: "normal",
		type: "Steel",
		contestType: "Beautiful"
	},
	"infinitethunderstrike": {
		accuracy: true,
		basePower: 190,
		category: "Special",
		desc: "100% chance to drop Speed by 2 stages, always crits",
		id: "infinitethunderstrike",
		isViable: true,
		name: "Infinite Thunder Strike",
		pp: 1,
		priority: 0,
		flags: {},
		isZ: "xurkitriumz",
		willCrit: true,
		secondary: {
			chance: 100,
			boosts: {
				spe: -2,
			},
		},
		target: "normal",
		type: "Electric",
		contestType: "Beautiful",
	},
	"scorchingbleedingblades": {
		accuracy: true,
		basePower: 430,
		category: "Physical",
		desc: "No additional effect",
		id: "scorchingbleedingblades",
		isViable: true,
		name: "Scorching Bleeding Blades",
		pp: 1,
		priority: 0,
		flags: {},
		isZ: "kartaniumz",
		secondary: false,
		target: "normal",
		type: "Steel",
		contestType: "Beautiful",
	},
	"extremepoisonousdownpour": {
		accuracy: true,
		basePower: 180,
		category: "Special",
		desc: "100% chance to toxic poison the foe",
		id: "extremepoisonousdownpour",
		isViable: true,
		name: "Extreme Poisonous Downpour",
		pp: 1,
		priority: 0,
		flags: {},
		isZ: "nihilegoniumz",
		secondary: {
			chance: 100,
			Status: 'tox',

		},
		target: "normal",
		type: "Poison",
		contestType: "Beautiful",
	},
	"steelshieldingdefense": {
		accuracy: true,
		basePower: 130,
		category: "Physical",
		desc: "Boosts the user's Defense by 2 stages",
		id: "steelshieldingdefense",
		isViable: true,
		name: "Steel Shielding Defense",
		pp: 1,
		priority: 0,
		flags: {},
		boosts: {
			def: 2,
		},
		isZ: "celesteeliniumz",
		secondary: false,
		target: "normal",
		type: "Steel",
		contestType: "Beautiful",
	},
	"intothevoid": {
		accuracy: true,
		basePower: 210,
		category: "Special",
		desc: "Lowers the opponent's stat stages by 3",
		id: "intothevoid",
		isViable: true,
		name: "Into the Void",
		pp: 1,
		priority: 0,
		flags: {},
		isZ: "guzzlordiumz",
		secondary: {
			chance: 100,
			boosts: {
				atk: -3,
				def: -3,
				spa: -3,
				spd: -3,
				spe: -3,
				accuracy: -3,
				evasion: -3,
			},
		},
		target: "normal",
		type: "Dark",
		contestType: "Beautiful",
	},
	"mantisscorchinglunge": {
		accuracy: true,
		basePower: 180,
		category: "Physical",
		desc: "100% chance to drop Attack by 2 stages",
		id: "mantisscorchinglunge",
		isViable: true,
		name: "Mantis Scorching Lunge",
		pp: 1,
		priority: 0,
		flags: {},
		isZ: "pheromosiumz",
		secondary: {
			chance: 100,
			boosts: {
				atk: -2,
			},
		},
		target: "normal",
		type: "Bug",
		contestType: "Cute",
	},
	"onepunchknockout": {
		accuracy: true,
		basePower: 200,
		category: "Physical",
		desc: "Deals heavy damage to the target, boosts the user's Attack by 2 stages",
		id: "onepunchknockout",
		isViable: true,
		name: "One Punch Knock Out",
		pp: 1,
		priority: 0,
		flags: {},
		isZ: "buzzwolium Z",
		self: {
			atk: 2,
		},
		secondary: false,
		target: "normal",
		type: "Fighting",
		contestType: "Cute",
	 },			
};
