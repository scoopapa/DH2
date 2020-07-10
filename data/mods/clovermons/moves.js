'use strict';

exports.BattleMovedex = {

  //Make Double Iron Bash accessible

	"doubleironbash": {
		num: 742,
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		desc: "Hits twice. If the first hit breaks the target's substitute, it will take damage for the second hit. Has a 30% chance to flinch the target.",
		shortDesc: "Hits twice. 30% chance to flinch.",
		id: "doubleironbash",
		isViable: true,
		name: "Double Iron Bash",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1},
		multihit: 2,
		secondary: {
			chance: 30,
			volatileStatus: 'flinch',
		},
		target: "normal",
		type: "Steel",
		zMovePower: 180,
		contestType: "Clever",
	},
  
  //Implement More Room
  
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
			durationCallback(source, effect) {
				if (source && source.hasAbility(['persistent', 'moreroom'])) {
					this.add('-activate', source, 'ability: More Room', effect);
					return 7;
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
			durationCallback(source, effect) {
				if (source && source.hasAbility(['persistent', 'moreroom'])) {
					this.add('-activate', source, 'ability: More Room', effect);
					return 7;
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
			durationCallback(source, effect) {
				if (source && source.hasAbility(['persistent', 'moreroom'])) {
					this.add('-activate', source, 'ability: More Room', effect);
					return 7;
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
  
  //New Moves
  
	"anattack": {
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		shortDesc: "It's an attack.",
		id: "anattack",
		isViable: true,
		name: "An Attack",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "???",
		zMovePower: 190,
	},
	"chaosdunk": {
		accuracy: 100,
		basePower: 110,
		category: "Physical",
		shortDesc: "No additional effect.",
		id: "chaosdunk",
		isViable: true,
		name: "Chaos Dunk",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Rock",
		zMovePower: 185,
	},
	"comengo": {
		accuracy: 100,
		basePower: 25,
		category: "Special",
		desc: "Hits two to five times. Has a 1/3 chance to hit two or three times, and a 1/6 chance to hit four or five times. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. If the user has the Skill Link Ability, this move will always hit five times.",
		shortDesc: "Hits 2-5 times in one turn.",
		id: "comengo",
		isViable: true,
		name: "Come n' Go",
		pp: 30,
		priority: 0,
		flags: {bullet: 1, protect: 1, mirror: 1},
		multihit: [2, 5],
		secondary: null,
		target: "normal",
		type: "Water",
		zMovePower: 140,
	},
	"dailydose": {
		accuracy: 95,
		basePower: 80,
		category: "Special",
		desc: "Has a 20% chance to either poison, badly poison, or inflict sleep on the target.",
		shortDesc: "20% chance to poison or badly poison or put the target to sleep.",
		id: "dailydose",
		isViable: true,
		name: "Daily Dose",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 20,
			onHit(target, source) {
				let result = this.random(3);
				if (result === 0) {
					target.trySetStatus('psn', source);
				} else if (result === 1) {
					target.trySetStatus('tox', source);
				} else {
					target.trySetStatus('slp', source);
				}
			},
		},
		target: "normal",
		type: "Poison",
		zMovePower: 160,
	},
	"decaydrain": {
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		desc: "The user recovers 1/2 the HP lost by the target, rounded half up. If Big Root is held by the user, the HP recovered is 1.3x normal, rounded half down.",
		shortDesc: "User recovers 50% of the damage dealt.",
		id: "decaydrain",
		isViable: true,
		name: "Decay Drain",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, heal: 1},
		drain: [1, 2],
		secondary: null,
		target: "normal",
		type: "Poison",
		zMovePower: 180,
	},
	"dildocannon": {
		accuracy: 100,
		basePower: 25,
		category: "Physical",
		desc: "Hits two to five times. Has a 1/3 chance to hit two or three times, and a 1/6 chance to hit four or five times. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. If the user has the Skill Link Ability, this move will always hit five times.",
		shortDesc: "Hits 2-5 times in one turn.",
		id: "dildocannon",
		isViable: true,
		name: "Dildo Cannon",
		pp: 10,
		priority: 0,
		flags: {bullet: 1, protect: 1, mirror: 1},
		multihit: [2, 5],
		secondary: null,
		target: "normal",
		type: "Dragon",
		zMovePower: 140,
	},
	"enema": {
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		desc: "The user recovers 1/2 the HP lost by the target, rounded half up. If Big Root is held by the user, the HP recovered is 1.3x normal, rounded half down.",
		shortDesc: "User recovers 50% of the damage dealt.",
		id: "enema",
		isViable: true,
		name: "Enema",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, heal: 1},
		drain: [1, 2],
		secondary: null,
		target: "normal",
		type: "Grass",
		zMovePower: 140,
	},
	"erosionwave": {
		accuracy: 100,
		basePower: 95,
		category: "Special",
		desc: "Has a 10% chance to lower the target's Special Defense by 1 stage.",
		shortDesc: "10% chance to lower the target's Sp. Def by 1.",
		id: "erosionwave",
		isViable: true,
		name: "Erosion Wave",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, nonsky: 1},
		secondary: {
			chance: 10,
			boosts: {
				spd: -1,
			},
		},
		target: "normal",
		type: "Rock",
		zMovePower: 175,
	},
	"falconpunch": {
		accuracy: 90,
		basePower: 100,
		category: "Physical",
		desc: "Has a 10% chance to burn the target.",
		shortDesc: "10% chance to burn the target.",
		id: "falconpunch",
		isViable: true,
		name: "Falcon Punch",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, punch: 1, mirror: 1},
		secondary: {
			chance: 10,
			status: 'brn',
		},
		target: "normal",
		type: "Flying",
		zMovePower: 180,
	},
	"firebomb": {
		accuracy: 95,
		basePower: 100,
		category: "Physical",
		shortDesc: "No additional effect.",
		id: "firebomb",
		isViable: true,
		name: "Fire Bomb",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Fire",
		zMovePower: 180,
	},
	"fizzbitch": {
		accuracy: 80,
		basePower: 150,
		category: "Special",
		desc: "Has a 10% chance to paralyze the target.",
		shortDesc: "10% chance to paralyze the target.",
		id: "fizzbitch",
		isViable: true,
		name: "Fizzbitch",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 10,
			status: 'par',
		},
		target: "normal",
		type: "Grass",
		zMovePower: 200,
	},
	"foryou": {
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		desc: "Has a 100% chance to lower the target's Defense by 1 stage.",
		shortDesc: "100% chance to lower the target's Defense by 1.",
		id: "foryou",
		name: "For You",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 100,
			boosts: {
				def: -1,
			},
		},
		target: "normal",
		type: "Fighting",
		zMovePower: 180,
	},
	"futababreak": {
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		desc: "If this attack does not miss, the effects of Reflect, Light Screen, and Aurora Veil end for the target's side of the field before damage is calculated.",
		shortDesc: "Destroys screens, unless the target is immune.",
		id: "futababreak",
		isViable: true,
		name: "Futaba Break",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTryHit(pokemon) {
			// will shatter screens through sub, before you hit
			if (pokemon.runImmunity('Grass')) {
				pokemon.side.removeSideCondition('reflect');
				pokemon.side.removeSideCondition('lightscreen');
				pokemon.side.removeSideCondition('auroraveil');
			}
		},
		secondary: null,
		target: "normal",
		type: "Grass",
		zMovePower: 170,
	},
	"holyduty": {
		accuracy: 100,
		basePower: 250,
		category: "Special",
		desc: "The user faints after using this move, even if this move fails for having no target. This move is prevented from executing if any active Pokemon has the Damp Ability.",
		shortDesc: "Hits adjacent Pokemon. The user faints.",
		id: "holyduty",
		isViable: true,
		name: "Holy Duty",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		selfdestruct: "always",
		secondary: null,
		target: "allAdjacent",
		type: "Fire",
		zMovePower: 200,
	},
	"lactoseshot": {
		accuracy: 90,
		basePower: 130,
		category: "Special",
		desc: "Lowers the user's Special Attack by 2 stages.",
		shortDesc: "Lowers the user's Sp. Atk by 2.",
		id: "lactoseshot",
		isViable: true,
		name: "Lactose Shot",
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
		type: "Fairy",
		zMovePower: 195,
	},
	"meme": {
		accuracy: 100,
		basePower: 65,
		category: "Special",
		desc: "Has a 10% chance to raise the user's Attack, Defense, Special Attack, Special Defense, and Speed by 1 stage.",
		shortDesc: "10% chance to raise all stats by 1 (not acc/eva).",
		id: "meme",
		name: "Meme",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 10,
			self: {
				boosts: {
					atk: 1,
					def: 1,
					spa: 1,
					spd: 1,
					spe: 1,
				},
			},
		},
		target: "normal",
		type: "???",
		zMovePower: 120,
	},
	"overenergize": {
		accuracy: 100,
		basePower: 150,
		category: "Special",
		desc: "Lowers the user's Special Attack by 2 stages.",
		shortDesc: "Lowers the user's Sp. Atk by 2.",
		id: "overenergize",
		isViable: true,
		name: "Overenergize",
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
		type: "Electric",
		zMovePower: 200,
	},
	"owtheedge": {
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		desc: "If the target lost HP, the user takes recoil damage equal to 25% the HP lost by the target, rounded half up, but not less than 1 HP.",
		shortDesc: "Has 25% recoil.",
		id: "owtheedge",
		isViable: true,
		name: "Ow The Edge",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		recoil: [1, 4],
		secondary: null,
		target: "normal",
		type: "Dark",
		zMovePower: 190,
	},
	"pukeblood": {
		accuracy: 95,
		basePower: 130,
		category: "Special",
		desc: "If the target lost HP, the user takes recoil damage equal to 25% the HP lost by the target, rounded half up, but not less than 1 HP.",
		shortDesc: "Has 25% recoil.",
		id: "owtheedge",
		isViable: true,
		name: "Ow The Edge",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		recoil: [1, 4],
		secondary: null,
		target: "normal",
		type: "Bug",
		zMovePower: 190,
	},
	"punchout": {
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		desc: "If this move is successful and the user has not fainted, the user switches out even if it is trapped and is replaced immediately by a selected party member. The user does not switch out if there are no unfainted party members, or if the target switched out using an Eject Button or through the effect of the Emergency Exit or Wimp Out Abilities.",
		shortDesc: "User switches out after damaging the target.",
		id: "punchout",
		isViable: true,
		name: "Punch Out",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, punch: 1, mirror: 1},
		selfSwitch: true,
		secondary: null,
		target: "normal",
		type: "Fighting",
		zMovePower: 140,
	},
	"regenerate": {
		num: 105,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user restores 1/2 of its maximum HP, rounded half up, and cures its burn, poison, or paralysis.",
		shortDesc: "Heals the user by 50% of its max HP. User cures its burn, poison, or paralysis.",
		id: "regenerate",
		isViable: true,
		name: "Regenerate",
		pp: 5,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		onHit(pokemon) {
			if (['', 'slp', 'frz'].includes(pokemon.status) && pokemon.hp >= pokemon.maxhp) return false;
			pokemon.cureStatus();
		},
		heal: [1, 2],
		secondary: null,
		target: "self",
		type: "Grass",
		zMoveEffect: 'clearnegativeboost',
		contestType: "Clever",
	},
	"riotshield": {
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		desc: "This move summons Safeguard for 5 turns upon use.",
		shortDesc: "Summons Safeguard.",
		id: "riotshield",
		isViable: true,
		name: "Riot Shield",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1},
		self: {
			sideCondition: 'safeguard',
		},
		secondary: null,
		target: "normal",
		type: "Fighting",
	},
	"shitpost": {
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		desc: "The user spends two or three turns locked into this move and becomes confused immediately after its move on the last turn of the effect if it is not already. This move targets an opposing Pokemon at random on each turn. If the user is prevented from moving, is asleep at the beginning of a turn, or the attack is not successful against the target on the first turn of the effect or the second turn of a three-turn effect, the effect ends without causing confusion. If this move is called by Sleep Talk and the user is asleep, the move is used for one turn and does not confuse the user.",
		shortDesc: "Lasts 2-3 turns. Confuses the user afterwards.",
		id: "thrash",
		name: "Thrash",
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
		type: "Ground",
		zMovePower: 190,
	},
	"spookout": {
		accuracy: 100,
		basePower: 60,
		category: "Special",
		desc: "Has a 100% chance to flinch the target. Fails unless it is the user's first turn on the field.",
		shortDesc: "Hits first. First turn out only. 100% flinch chance.",
		id: "spookout",
		isViable: true,
		name: "Spook Out",
		pp: 10,
		priority: 3,
		flags: {sound: 1, protect: 1, mirror: 1},
		onTry(pokemon, target) {
			if (pokemon.activeTurns > 1) {
				this.attrLastMove('[still]');
				this.add('-fail', pokemon);
				this.hint("Fake Out only works on your first turn out.");
				return null;
			}
		},
		secondary: {
			chance: 100,
			volatileStatus: 'flinch',
		},
		target: "normal",
		type: "Ghost",
		zMovePower: 120,
		contestType: "Cute",
	},
	"stratoblade": {
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		desc: "Has a higher chance for a critical hit.",
		shortDesc: "High critical hit ratio.",
		id: "stratoblade",
		isViable: true,
		name: "Strato Blade",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		critRatio: 2,
		secondary: null,
		target: "normal",
		type: "Flying",
		zMovePower: 175,
	},
	"supersnore": {
		accuracy: 100,
		basePower: 255,
		category: "Physical",
		desc: "Fails if the user is not asleep.",
		shortDesc: "User must be asleep.",
		id: "supersnore",
		name: "Super Snore",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, authentic: 1},
		sleepUsable: true,
		onTryHit(target, source) {
			if (source.status !== 'slp' && !source.hasAbility('comatose')) return false;
		},
		target: "normal",
		type: "Ice",
		zMovePower: 220,
		contestType: "Cute",
	},
	"swindle": {
		accuracy: 100,
		basePower: 100,
		category: "Special",
		desc: "If this attack was successful and the user has not fainted, it steals the target's held item if the user is not holding one. The target's item is not stolen if it is a Mail or Z-Crystal, or if the target is a Kyogre holding a Blue Orb, a Groudon holding a Red Orb, a Giratina holding a Griseous Orb, an Arceus holding a Plate, a Genesect holding a Drive, a Silvally holding a Memory, or a Pokemon that can Mega Evolve holding the Mega Stone for its species. Items lost to this move cannot be regained with Recycle or the Harvest Ability.",
		shortDesc: "If the user has no item, it steals the target's.",
		id: "swindle",
		name: "Swindle",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onAfterHit(target, source, move) {
			if (source.item || source.volatiles['gem']) {
				return;
			}
			let yourItem = target.takeItem(source);
			if (!yourItem) {
				return;
			}
			if (!this.singleEvent('TakeItem', yourItem, target.itemData, source, target, move, yourItem) || !source.setItem(yourItem)) {
				target.item = yourItem.id; // bypass setItem so we don't break choicelock or anything
				return;
			}
			this.add('-item', source, yourItem, '[from] move: Swindle', '[of] ' + target);
		},
		secondary: null,
		target: "normal",
		type: "Dark",
		zMovePower: 180,
	},
	"toke": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Lowers the user's Defense and Special Defense by 1 stage. Raises the user's Attack, Special Attack, and Speed by 2 stages.",
		shortDesc: "Lowers Def, SpD by 1; raises Atk, SpA, Spe by 2.",
		id: "toke",
		isViable: true,
		name: "Toke",
		pp: 20,
		priority: 0,
		flags: {snatch: 1},
		boosts: {
			def: -1,
			spd: -1,
			atk: 2,
			spa: 2,
			spe: 2,
		},
		secondary: null,
		target: "self",
		type: "Fire",
		zMoveEffect: 'clearnegativeboost',
		contestType: "Tough",
	},
	"toxiravage": {
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		desc: "No additional effect.",
		shortDesc: "Usually goes first.",
		id: "toxiravage",
		isViable: true,
		name: "Toxiravage",
		pp: 10,
		priority: 1,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Poison",
		zMovePower: 160,
		contestType: "Cool",
	},
	"trigger": {
		accuracy: 100,
		basePower: 30,
		basePowerCallback(pokemon, target, move) {
			if (!pokemon.volatiles.trigger || move.hit === 1) {
				pokemon.addVolatile('trigger');
			}
			return this.clampIntRange(move.basePower * pokemon.volatiles.trigger.multiplier, 1, 160);
		},
		category: "Physical",
		desc: "Power doubles with each successful hit, up to a maximum of 160 power. The power is reset if this move misses or another move is used.",
		shortDesc: "Power doubles with each hit, up to 160.",
		id: "trigger",
		name: "Trigger",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		effect: {
			duration: 2,
			onStart() {
				this.effectData.multiplier = 1;
			},
			onRestart() {
				if (this.effectData.multiplier < 4) {
					this.effectData.multiplier <<= 1;
				}
				this.effectData.duration = 2;
			},
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
		zMovePower: 100,
		contestType: "Cool",
	},
  
	"sudoku": {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		desc: "The user faints.",
		shortDesc: "User faints.",
		id: "sudoku",
		isViable: true,
		name: "Sudoku",
		pp: 5,
		priority: 0,
		flags: {},
		selfdestruct: "ifHit",
		secondary: null,
		target: "self",
		type: "Normal",
		zMoveEffect: 'healreplacement',
		contestType: "Beautiful",
	},
};
