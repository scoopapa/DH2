"use strict";
exports.BattleMovedex = {
	"booop": {
		accuracy: 95,
		basePower: 180,
		category: "Physical",
		desc: "V-Create clone but without drops",
		shortDesc: "V-Create clone but without drops",
		id: "booop",
		isViable: true,
		name: "BOOOP",
		pp: 5,
		priority: 0,
		flags: {
			contact: 1,
			protect: 1,
			mirror: 1
		},
		selfBoost: {
			boosts: {
				spe: 1,
			},
		},
		secondary: null,
		target: "normal",
		type: "Fire",
		zMovePower: 220,
		contestType: "Cool",
	},
	"wh0spillsarethese": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Stockpile + Slack Off.",
		id: "wh0spillsarethese",
		name: "Wh0s Pills are These",
		pp: 20,
		priority: 0,
		flags: {
			snatch: 1,
			heal: 1
		},
		heal: [1, 2],
		onTryHit: function(target, pokemon) {
			this.add('-anim', pokemon, "Refresh", target);
			this.useMove("Stockpile", pokemon);
			this.useMove("Slack Off", pokemon);
		},
		secondary: false,
		target: "self",
		type: "Normal",
		zMoveEffect: 'heal',
		contestType: "Tough",
	},
	"cosmictrap": {
		num: 681,
		accuracy: 100,
		basePower: 50,
		basePowerCallback: function(pokemon, target, move) {
			return move.basePower + 20 * pokemon.positiveBoosts();
		},
		category: "Physical",
		desc: "Power is equal to 50+(X*20), where X is the user's total stat stage changes that are greater than 0. +1 defenses.",
		shortDesc: " + 20 power for each of the user's stat boosts. +1 defenses.",
		id: "cosmictrap",
		name: "Cosmic Trap",
		pp: 10,
		priority: 0,
		flags: {
			contact: 1,
			protect: 1,
			mirror: 1
		},
		secondary: {
			chance: 100,
			self: {
				boosts: {
					def: 1,
					spd: 1,
				},
			},
		},
		target: "normal",
		type: "Dark",
	},
	"imtoxicyoureslippinunder": {
		accuracy: true,
		basePower: 250,
		category: "Physical",
		desc: "Uses the target's attack to deal sum Poison damage.",
		shortDesc: "User recovers the damage dealt.",
		id: "imtoxicyoureslippinunder",
		isViable: true,
		name: "I'm Toxic You're Slippin Under",
		pp: 1,
		priority: 3,
		ignoreEvasion: true,
		ignoreDefensive: true,
		useTargetOffensive: true,
		flags: {
			heal: 1,
			authentic: 1
		},
		secondary: {
			chance: 100,
			self: {
				boosts: {
					def: -2,
					spd: -2,
				},
			},
		},
		drain: [4, 4],
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add("c|+Mareanie|What, you think i'm cute?");
			this.add('-anim', source, "Acid Downpour", target);
			this.add("c|+Mareanie|Well, lemme show you what i can do");
			this.add('-anim', source, "Giga Impact", target);
			this.add("c|+Mareanie|Never underestimate a cutemon.");
			this.add('-anim', source, "Charm", target);
		},
		onAfterMove: function(target, source, move) {
			this.add("c|+Mareanie|I AM STRONK, OKAY?")
		},
		type: "Poison",
		isZ: "spandansphone",
	},
	"heresmyphone3": {
		num: 516,
		accuracy: true,
		basePower: 0,
		category: "Physical",
		desc: "The target receives the user's phone, and loses its item.",
		shortDesc: "User passes its held item to the target.",
		id: "heresmyphone3",
		name: "Here's my phone <3",
		pp: 5,
		priority: 1,
		onHit: function(target, source, move) {
			let yourItem = source.takeItem();
			if (!yourItem) return false;
			if (!this.singleEvent('TakeItem', yourItem, source.itemData, source, target, move, yourItem)) return;
			this.add('-item', target, yourItem.name, '[from] move: Here\'s my phone <3', '[of] ' + source);
			if (!target.setItem(yourItem)) {
				source.item = yourItem.id;
				return false;
			}
		},
		secondary: false,
		target: "normal",
		type: "Fairy",
		contestType: "Cute",
	},
	"getboostcode": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user codes some boosts into himself if he has his phone.",
		shortDesc: "The user codes some boosts into himself if he has his phone.",
		id: "getboostcode",
		isViable: true,
		name: "Get Boost Code",
		pp: 25,
		priority: 1,
		onPrepareHit: function(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Charge", source);
		},
		onModifyMove: function(move, pokemon) {
			if (pokemon.getItem().id === 'spandansphone') {
				move.boosts = {
					def: 1,
					spd: 1,
					spe: 1
				};
			}
		},
		onHit: function(pokemon) {
			if (pokemon.getItem().id === 'spandansphone') {
				this.add('message', "Mareanie is using his phone to code some boosts into himself!");
			} else {
				this.add("c|+Mareanie|wtf where's my phone i cant boost myself");
			}
		},
		secondary: false,
		target: "self",
		type: "Electric",
	},
	"gethpcode": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user restores 1/2 of his maximum HP if he has his phone, and 1/4 of his maximum HP if he doesn't.",
		shortDesc: "Heals the user by a phone-dependent amount.",
		id: "gethpcode",
		isViable: true,
		name: "Get HP Code",
		pp: 25,
		priority: 1,
		flags: {
			heal: 1
		},
		onPrepareHit: function(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Tail Glow", source);
		},
		onHit: function(pokemon) {
			if (pokemon.getItem().id === 'spandansphone') {
				this.add('message', "Mareanie is using his phone to code some HP into himself!");
				return this.heal(this.modify(pokemon.maxhp, 0.667));
			} else {
				this.add("c|+Mareanie|wtf where's my phone i cant restore much hp :(");
				return this.heal(this.modify(pokemon.maxhp, 0.25));
			}
		},
		secondary: false,
		target: "self",
		type: "Electric",
	},
	"buildup": {
		accuracy: true,
		basePower: 100,
		category: "Physical",
		id: "buildup",
		isViable: true,
		name: "Build Up",
		pp: 15,
		flags: {
			protect: 1,
			contact: 1,
			mirror: 1,
			authentic: 1
		},
		shortDesc: "Does many things!",
		drain: [4, 5],
		ignoreAbility: true,
		secondary: {
			chance: 100,
			self: {
				boosts: {
					atk: 1,
					def: 1,
				},
			},
		},
		onTryHit: function(target, pokemon, source) {
			this.add('-anim', pokemon, "Imprison", source);
			this.add('-anim', pokemon, "Dark Void", target);
			this.add('-anim', pokemon, "Dragon Ascent", target);
		},
		target: "normal",
		type: "Steel",
	},
	"smackaround": {
		accuracy: 100,
		category: "Physical",
		id: "smackaround",
		isViable: true,
		name: "Smack Around",
		pp: 15,
		shortDesc: "Smack Down + Earthquake + Smack Down. Raises Atk and Def by 1 stage.",
		onTryHit: function(target, pokemon) {
			this.add('-anim', pokemon, "Catastropika", target);
			this.useMove("Smack Down", pokemon);
			this.useMove("Bulk Up", pokemon);
			this.useMove("Earthquake", pokemon);
			this.useMove("Smack Down", pokemon);
			this.add("c|@Iron Crusher|hah, Crushed!");
		},
		secondary: false,
		target: "normal",
		type: "Steel",
	},
	"healingarea": {
		accuracy: true,
		category: "Status",
		id: "healingarea",
		shortDesc: "Recover, Wish and Grassy Terrain in one move",
		isViable: true,
		name: "Healing Area",
		pp: 5,
		priority: 0,
		flags: {},
		onTryHit: function(target, pokemon) {
			this.add('-anim', pokemon, "Catastropika", target);
			this.useMove("Recover", pokemon);
			this.useMove("Wish", pokemon);
			this.useMove("Grassy Terrain", pokemon);
		},
		secondary: false,
		target: "normal",
		type: "Dragon",
	},
	"fullhazards": {
		accuracy: true,
		basePower: 0,
		Category: "Status",
		desc: "Sets up all hazards",
		shortDesc: "Sets up all hazards",
		id: "fullhazards",
		isViable: true,
		name: "Full Hazards",
		pp: 15,
		priority: 0,
		flags: {
			reflectable: 1
		},
		onPrepareHit: function(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Stealth Rock", target);
			this.add('-anim', source, "Spikes", target);
			this.add('-anim', source, "Toxic Spikes", target);
			this.add('-anim', source, "Sticky Web", target);
		},
		onHit: function(target, source) {
			target.side.addSideCondition('toxicspikes', source);
			target.side.addSideCondition('toxicspikes', source);
			target.side.addSideCondition('toxicspikes', source);
			target.side.addSideCondition('spikes', source);
			target.side.addSideCondition('spikes', source);
			target.side.addSideCondition('spikes', source);
			target.side.addSideCondition('stealthrock', source);
			target.side.addSideCondition('stickyweb', source);
			if (source.name === 'EchoGaia') this.add("c|$EchoGaia|You're screwed now)");
		},
		secondary: false,
		target: "foeSide",
		type: "Ground",
		zMoveBoost: {
			evasion: 1
		},
		contestType: "Clever",
	},
	"infernalrain": {
		accuracy: 100,
		basePower: 10,
		category: "Special",
		shortDesc: "Hits 10 times. Has a 20% chance to burn with each hit.",
		id: "infernalrain",
		isViable: true,
		name: "Infernal Rain",
		pp: 10,
		priority: 0,
		flags: {
			authentic: 1,
			defrost: 1,
			protect: 1
		},
		multihit: 10,
		secondary: {
			chance: 20,
			status: 'brn',
		},
		target: "allAdjacent",
		type: "Fire",
		zMovePower: 100,
		contestType: "Cool",
	},
	"infernalabyss": {
		accuracy: true,
		basePower: 250,
		category: "Special",
		shortDesc: "Sets up harsh sunlight. Give the user +2 to SpA and Spe and -12 in Atk. SE against dragon. Burns the target(s)",
		id: "infernalabyss",
		name: "Infernal Abyss",
		pp: 1,
		priority: 0,
		flags: {},
		selfBoost: {
			boosts: {
				atk: -12,
				spa: 2,
				spe: 2,
			},
		},
		weather: 'sunnyday',
		onEffectiveness: function(typeMod, type) {
			if (type === 'Dragon') return 1;
		},
		isZ: "ludicrousiumz",
		secondary: {
			chance: 100,
			status: 'brn',
		},
		target: "allAdjacent",
		type: "Fire",
		contestType: "Cool",
	},
	"waitaminute": {
		accuracy: 100,
		basePower: 180,
		category: "Physical",
		shortDesc: "Raises user's Attack, Defense, Special Defence and Speed by 2 on turn 1. Hits turn 2.",
		id: "waitaminute",
		isViable: true,
		name: "Wait A Minute",
		pp: 10,
		priority: 0,
		flags: {
			charge: 1,
			protect: 1,
			mirror: 1
		},
		onTry: function(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name, defender);
			this.boost({
				atk: 1,
				def: 1,
				spd: 1,
				spe: 1
			}, attacker, attacker, this.getMove('waitaminute'));
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				this.add('-anim', attacker, move.name, defender);
				attacker.removeVolatile(move.id);
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
		secondary: false,
		target: "normal",
		type: "Dark",
		zMovePower: 220,
		contestType: "Cool",
	},
	"shitpost": {
		accuracy: true,
		basePower: 170,
		category: "Physical",
		desc: "Targets all foes. Can hit Ghost-types.",
		shortDesc: "Targets all foes. Can hit Ghost-types.",
		id: "shitpost",
		isViable: true,
		name: "Shitpost",
		pp: 24,
		priority: 0,
		flags: {
			protect: 1,
			mirror: 1
		},
		onEffectiveness: function(typeMod, type) {
			if (type === 'Ghost') return 1;
		},
		onPrepareHit: function(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "High Jump Kick", target);
		},
		target: "allAdjacentFoes",
		type: "Fighting",
		zMovePower: 230,
		contestType: "Tough",
	},
	"kneeofjustice": {
		accuracy: true,
		basePower: 230,
		category: "Physical",
		desc: "Can hit Ghost Types.",
		shortDesc: "Can hit Ghost Types.",
		id: "kneeofjustice",
		isViable: true,
		name: "Knee of Justice",
		pp: 1,
		priority: 0,
		flags: {
			contact: 1,
			protect: 1,
			mirror: 1
		},
		onPrepareHit: function(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Dragon Ascent", target);
		},
		secondary: {
			boosts: {
				def: -3,
				spd: -3,
				atk: -3,
			},
		},
		onEffectiveness: function(typeMod, type) {
			if (type === 'Ghost') return 1;
		},
		secondary: false,
		target: "normal",
		type: "Fighting",
		zMovePower: 230,
		contestType: "Cool",
		isZ: "zapmasteriumz",
	},
	"thenetherlandsfirst": {
		accuracy: 100,
		basePower: 150,
		category: "Physical",
		desc: "No additional effect.",
		shortDesc: "Nearly always goes first.",
		id: "thenetherlandsfirst",
		isViable: true,
		name: "The Netherlands First",
		pp: 10,
		priority: 2,
		flags: {
			contact: 1,
			protect: 1,
			mirror: 1
		},
		onPrepareHit: function(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Extreme Speed", target);
		},
		self: {
			boosts: {
				def: -1,
				spd: -1,
			},
		},
		secondary: false,
		target: "normal",
		type: "Normal",
		zMovePower: 160,
		contestType: "Cool",
	},
	"superduperwombocombo": {
		shortDesc: "Uses Nature Power, Weather Ball, Splash, and Belly Drum",
		accuracy: true,
		category: "Status",
		id: "superduperwombocombo",
		name: "Super Duper Wombo Combo",
		pp: 5,
		priority: 0,
		flags: {},
		onTryHit: function(target, pokemon) {
			this.add('-anim', pokemon, "Revelation Dance", target);
			this.useMove("Nature Power", pokemon);
			this.useMove("Weather Ball", pokemon);
			this.useMove("Splash", pokemon);
			this.useMove("Belly Drum", pokemon);
		},
		secondary: false,
		target: "normal",
		type: "Dragon",
	},
	"zransei": {
		shortDesc: "Mega evolves Ransei",
		accuracy: 100,
		basePower: 300,
		category: "Special",
		id: "zransei",
		isViable: true,
		name: "Z-Ransei",
		pp: 10,
		priority: 1,
		flags: {
			authentic: 1
		},
		onTryHit: function(target, pokemon) {
			this.attrLastMove('[still]');
			pokemon.formeChange('Rayquaza-Mega');
			this.add('-formechange', pokemon, 'Rayquaza-Mega', '[msg]');
			this.add('-anim', pokemon, "Dragon Pulse", target);
		},
		onAfterHit: function(target, pokemon) {
			pokemon.formeChange('Rayquaza');
			this.add('-formechange', pokemon, 'Rayquaza', '[msg]');
		},
		target: "allAdjacentFoes",
		type: "Dragon",
		isZ: "ransiumz",
	},
	"heroicbeatdown": {
		shortDesc: "Boosts Def, SpD, and Atk by 1 stage and Speed by 2 stages",
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		id: "heroicbeatdown",
		isViable: true,
		name: "Heroic Beatdown",
		pp: 10,
		priority: 0,
		flags: {
			contact: 1,
			protect: 1,
			mirror: 1
		},
		self: {
			boosts: {
				def: 1,
				spd: 1,
				atk: 1,
				spe: 2,
			},
		},
		onPrepareHit: function(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Close Combat", target);
		},
		secondary: false,
		target: "normal",
		type: "Fighting",
		contestType: "Tough",
	},
	"eradicate": {
		accuracy: 75,
		basePower: 145,
		category: "Physical",
		desc: "This move combines Ground in its type effectiveness against the target. Damage doubles and no accuracy check is done if the target has used Minimize while active.",
		shortDesc: "Combines Ground in type effectiveness. 33% Recoil.",
		id: "eradicate",
		name: "Eradicate",
		pp: 5,
		flags: {
			contact: 1,
			protect: 1,
			mirror: 1,
			gravity: 1,
			distance: 1,
			nonsky: 1
		},
		recoil: [1, 3],
		onEffectiveness: function(typeMod, type, move) {
			return typeMod + this.getEffectiveness('Ground', type);
		},
		priority: 0,
		secondary: false,
		target: "allAdjacent",
		type: "Dragon",
		zMovePower: 200,
		contestType: "Cool",
	},
	"totalannhilation": {
		accuracy: true,
		basePower: 300,
		category: "Physical",
		desc: "The user recovers the HP lost by the target, rounded half up. If Big Root is held by the user, the HP recovered is 1.3x normal, rounded half down.",
		shortDesc: "User recovers the damage dealt.",
		id: "totalannhilation",
		isViable: true,
		name: "Total Annhilation",
		pp: 1,
		priority: 3,
		ignoreEvasion: true,
		ignoreDefensive: true,
		flags: {
			heal: 1,
			authentic: 1
		},
		secondary: {
			chance: 100,
			self: {
				boosts: {
					def: -1,
					spd: -1,
					atk: -1,
					spa: -1,
				},
			},
		},
		drain: [4, 4],
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "V-Create", target);
			this.add('-anim', source, "Extreme Speed", target);
			this.add('-anim', source, "Gigavolt Havoc", target);
			this.add('-anim', source, "Explosion", target);
			this.add("c|~Spandan|YOU DONT MESS WITH ME IDIOT");
		},
		onAfterMove: function(target, source, move) {
			this.add("c|~Spandan|Huh im exhausted.")
		},
		type: "Flying",
		isZ: "salamencite",
	},
	"powerlick": {
		shortDesc: "Drains 25% of the damage dealt",
		accuracy: 100,
		basePower: 110,
		category: "Special",
		id: "powerlick",
		name: "Power Lick",
		pp: 15,
		priority: 0,
		flags: {
			protect: 1,
			mirror: 1
		},
		onHit: function(target, source) {
			let stat = [];
			if (this.random(10) < 1) {
				stat = ['par', 'slp']
				source.trySetStatus(stat[this.random(2)], target);
			}
			if (this.random(10) < 3) {
				stat = ['atk', 'def', 'spa', 'spd', 'spe', 'evasion', 'accuracy']
				boostobj = {};
				boostobj[stat[this.random(6)]] = 1;
				this.boost(boostobj, source);
			}
		},
		onPrepareHit: function(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Lick", target);
		},
		flags: {
			contact: 1,
			protect: 1,
			mirror: 1,
			heal: 1
		},
		drain: [25, 200],
		target: "normal",
		type: "Ice",
		contestType: "Beautiful",
	},
	"blizzard": {
		num: 59,
		accuracy: 70,
		basePower: 110,
		category: "Special",
		desc: "Has a 10% chance to freeze the target. If the weather is Hail, this move does not check accuracy.",
		shortDesc: "10% chance to freeze the foe(s).",
		id: "blizzard",
		isViable: true,
		name: "Blizzard",
		pp: 5,
		priority: 0,
		flags: {
			protect: 1,
			mirror: 1
		},
		onModifyMove: function(move) {
			if (this.field.isWeather('hail') || this.field.isWeather('russianwinter')) move.accuracy = true;
		},
		secondary: {
			chance: 10,
			status: 'frz',
		},
		target: "allAdjacentFoes",
		type: "Ice",
		contestType: "Beautiful",
	},
	"hornleech": {
		num: 532,
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		desc: "The user recovers 1/2 the HP lost by the target, rounded half up. If Big Root is held by the user, the HP recovered is 1.3x normal, rounded half down.",
		shortDesc: "User recovers 50% of the damage dealt.",
		id: "hornleech",
		isViable: true,
		name: "Horn Leech",
		pp: 10,
		priority: 0,
		flags: {
			contact: 1,
			protect: 1,
			mirror: 1,
			heal: 1
		},
		drain: [1, 1],
		secondary: false,
		target: "normal",
		type: "Grass",
		contestType: "Tough",
	},
	"partingshotspam": {
		num: 575,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		desc: "Lowers the target's Attack and Special Attack by 1 stage. If this move is successful, the user switches out even if it is trapped and is replaced immediately by a selected party member. The user does not switch out if there are no unfainted party members.",
		shortDesc: "Lowers target's Atk, Sp. Atk by 1. User switches.",
		id: "partingshotspam",
		isViable: true,
		name: "Parting Shot Spam",
		pp: 20,
		priority: 0,
		flags: {
			protect: 1,
			reflectable: 1,
			mirror: 1,
			sound: 1,
			authentic: 1
		},
		selfSwitch: true,
		boosts: {
			atk: -2,
			spa: -2,
		},
		secondary: false,
		target: "normal",
		type: "Dark",
		contestType: "Cool",
	},
	"theloomeffect": {
		shortDesc: "Boosts Defense and Special Defense by 2 stages",
		num: 407,
		accuracy: 100,
		basePower: 110,
		category: "Special",
		id: "theloomeffect",
		name: "The Loom Effect",
		pp: 10,
		priority: 0,
		flags: {
			contact: 1,
			protect: 1,
			mirror: 1
		},
		secondary: {
			chance: 100,
			self: {
				boosts: {
					def: 2,
					spd: 2,
				},
			},
		},
		onPrepareHit: function(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Core Enforcer", target);
		},
		target: "normal",
		type: "Dragon",
	},
	chachadance: {
		shortDesc: "50% chance to raise the user's speed by 1 stage, confuses and burns it",
		accuracy: 100,
		basePower: 190,
		category: "Physical",
		id: "chachadance",
		name: "Cha Cha Dance",
		pp: 5,
		priority: 0,
		flags: {
			protect: 1,
			mirror: 1
		},
		secondary: {
			chance: 100,
			status: 'brn',
			volatileStatus: 'confusion',
		},
		self: {
			chance: 50,
			boosts: {
				spe: 1,
			},
		},
		onPrepareHit: function(target, source) {
			this.attrLastMove('[still]');
			if (source.name == 'Quiet Chimchar') this.add("c|@Quiet Chimchar|I like to Cha Cha");
			this.add('-anim', source, "Teeter Dance", target);
		},
		type: "Fire",
		contestType: "Cool",
	},
	"rushb": {
		accuracy: 100,
		basePower: 250,
		category: "Special",
		id: "rushb",
		name: "Rush B",
		pp: 10,
		priority: 0,
		flags: {},
		ignoreImmunity: true,
		isFutureMove: true,
		onPrepareHit: function(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Doom Desire", source);
			if (source.name == 'Zmeeed') this.add("c|@Zmeeed|LET'S GO RUSH B! ON BOMBSITE B! CYKA YEBANY IDI NAKHUI LET'S GO RUSH B!~");
			this.add('-anim', source, "Double Edge", target);
		},
		onTry: function(source, target) {
			if (!target.side.addSlotCondition(target, 'futuremove')) return false;
			Object.assign(target.side.slotConditions[target.position]['futuremove'], {
				move: 'rushb',
				source: source,
				moveData: {
					id: 'rushb',
					name: "Rush B",
					accuracy: 100,
					basePower: 250,
					category: "Special",
					flags: {},
					ignoreImmunity: false,
					effectType: 'Move',
					isFutureMove: true,
					type: 'Fighting',
				},
			});
			this.add('-start', source, 'move: Rush B');
			return null;
		},
		secondary: false,
		target: "normal",
		type: "Rush B",
		contestType: "Clever",
	},
	//%Elcrest
	"turbulence": {
		accuracy: 100,
		basePower: 110,
		category: "Physical",
		shortDesc: "Nearly always goes first.",
		id: "turbulence",
		isViable: true,
		name: "Turbulence",
		pp: 10,
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Dragon Ascent", target);
		},
		priority: 2,
		flags: {
			contact: 1,
			protect: 1,
			mirror: 1
		},
		secondary: false,
		target: "normal",
		type: "Flying"
	},
	spacecompress: {
		shortDesc: "Lowers the foe's Atk, Speed, and Def by 1 stage. Raises the user's SpA by 1 stage and SpD by 2 stages",
		accuracy: 100,
		category: "Status",
		id: "spacecompress",
		name: "Space Compress",
		isNonstandard: true,
		pp: 15,
		priority: 0,
		flags: {
			protect: 1,
			reflectable: 1,
			mirror: 1,
			authentic: 1
		},
		onPrepareHit: function(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Wish", target);
			this.add('-anim', target, "Dark Void", target);
		},
		self: {
			boosts: {
				spa: 1,
				spd: 2,
			},
		},
		boosts: {
			atk: -1,
			spe: -1,
			def: -1,
		},
		secondary: false,
		target: "normal",
		type: "Dragon",
	},
	ggm8: {
		shortDesc: "80% Chance to increase the user's speed by one stage, 50% chance to burn the target, has 40% Recoil.",
		accuracy: 100,
		pp: 15,
		id: "ggm8",
		name: "gg m8",
		isNonstandard: true,
		isViable: true,
		basePower: 200,
		category: "Physical",
		type: "Dragon",
		target: "normal",
		secondary: {
			chance: 80,
			self: {
				boosts: {
					spe: 1,
				},
			},
		},
		drain: [3, 4],
		onHit: function(target, source) {
			if (this.random(2) === 1) target.trySetStatus('brn', source);
		},
		onPrepareHit: function(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Tail Glow", source);
			this.add('-anim', source, "Beak Blast", source);
			this.add('-anim', source, "V-Create", target);
			this.add("c|&charizard8888|gg m8!");
		},
	},
	sacredhax: {
		shortDesc: "40% Chance to burn the target",
		accuracy: 100,
		pp: 15,
		id: "sacredhax",
		name: "Sacred Hax",
		isNonstandard: true,
		isViable: true,
		basePower: 150,
		category: "Physical",
		type: "Psychic",
		target: "normal",
		secondary: {
			secondary: {
				chance: 40,
				status: 'brn',
			},
		},
		onPrepareHit: function(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Bolt Strike", target);
		},
	},
	hyperspeedpunch: {
		shortDesc: "20% chance to flinch the target",
		accuracy: 100,
		basePower: 45,
		category: "Physical",
		id: "hyperspeedpunch",
		isViable: true,
		isNonstandard: true,
		name: "Hyperspeed Punch",
		pp: 10,
		priority: 2,
		flags: {
			protect: 1,
			mirror: 1
		},
		onPrepareHit: function(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Mach Punch", target);
		},
		secondary: {
			chance: 20,
			volatileStatus: 'flinch',
		},
		target: "normal",
		type: "Bug",
	},
	garchompepicness: {
		shortDesc: "Raises Def, Speed, and SpD by 3 stages and Attack by 4 stages. Sets up 3 layers of Toxic Spikes and Lucky Chant.",
		accuracy: 100,
		category: "Status",
		id: "garchompepicness",
		isNonstandard: true,
		name: "GARCHOMP EPICNESS",
		pp: 5,
		priority: 2,
		flags: {
			mirror: 1,
			authentic: 1
		},
		self: {
			boosts: {
				spe: 4,
				atk: 4,
				def: 4,
				spd: 4
			}
		},
		secondary: {
			self: {
				boosts: {
					atk: 4,
					def: 3,
					spe: 3,
					spd: 3,
				},
			},
		},
		onHit: function(target, source) {
			target.side.addSideCondition('toxicspikes', source);
			target.side.addSideCondition('toxicspikes', source);
			target.side.addSideCondition('toxicspikes', source);
			source.side.addSideCondition('luckychant', source);
			if (source.name === 'PI EddyChomp') this.add("c|&PI EddyChomp|Wait guys, powering up! Listen to this: https://www.youtube.com/watch?v=A0fAuX8jiPk while you're waiting! :)");
		},
		onModifyMove: function(move, pokemon, target) {
			move.type = '???';
		},
		target: "normal",
		type: "Normal",
	},
	"blehflame": {
		accuracy: 100,
		basePower: 160,
		category: "Special",
		desc: "Has a 40% chance to raise the user's Attack, Defense, Special Attack, Special Defense, and Speed by 1 stage.",
		shortDesc: "40% chance to raise SpA, Def, SpD, and Speed by 3 stages and Attack by 1 stage",
		id: "blehflame",
		isViable: true,
		name: "Bleh fLame",
		pp: 10,
		priority: 0,
		onPrepareHit: function(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Inferno Overdrive", target);
		},
		flags: {
			protect: 1,
			mirror: 1
		},
		secondary: {
			chance: 50,
			self: {
				boosts: {
					atk: 1,
					def: 3,
					spa: 3,
					spd: 3,
					spe: 3,
				},
			},
		},
		target: "normal",
		type: "Fire",
		contestType: "Tough",
	},
	haxingrage: {
		accuracy: 100,
		pp: 10,
		id: "haxingrage",
		name: "Haxing Rage",
		isNonstandard: true,
		isViable: true,
		basePower: 120,
		category: "Physical",
		type: "Dragon",
		target: "normal",
		secondary: {
			chance: 10,
			self: {
				boosts: {
					atk: 1,
				},
			},
			volatileStatus: 'confusion',
		},
		drain: [1, 2],
		flags: {
			protect: 1,
			mirror: 1,
			heal: 1
		},
		onPrepareHit: function(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Outrage", target);
		},
	},
	"waitandhope": {
		accuracy: 100,
		basePower: 160,
		category: "Special",
		id: "waitandhope",
		name: "Wait and hope",
		pp: 20,
		priority: 0,
		flags: {
			contact: 1,
			charge: 1,
			protect: 1,
			mirror: 1,
			gravity: 1,
			distance: 1
		},
		onTry: function(source, target, move) {
			if (source.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', source, "skyattack", target);
			if (!this.runEvent('ChargeMove', source, target, move)) {
				this.add('-anim', source, "skyattack", target);
				return;
			}
			source.addVolatile('twoturnmove', target);
			return null;
		},
		effect: {
			duration: 2,
			onAccuracy: function(accuracy, target, source, move) {
				if (move.id === 'gust' || move.id === 'twister') {
					return;
				}
				if (move.id === 'skyuppercut' || move.id === 'thunder' || move.id === 'hurricane' || move.id === 'smackdown' || move.id === 'thousandarrows' || move.id === 'helpinghand') {
					return;
				}
				if (source.hasAbility('noguard') || target.hasAbility('noguard')) {
					return;
				}
				if (source.volatiles['lockon'] && target === source.volatiles['lockon'].source) return;
				return 0;
			},
			onSourceModifyDamage: function(damage, source, target, move) {
				if (move.id === 'gust' || move.id === 'twister') {
					return this.chainModify(2);
				}
			},
		},
		secondary: {
			chance: 30,
			status: 'par',
		},
		target: "any",
		type: "Dragon",
	},
	"yomammajoke": {
		accuracy: 100,
		basePower: 180,
		category: "Physical",
		desc: "The user recovers 3/4 the HP lost by the target, rounded half up. If Big Root is held by the user, the HP recovered is 1.3x normal, rounded half down.",
		shortDesc: "User recovers 75% of the damage dealt.",
		id: "yomammajoke",
		isViable: true,
		name: "Yo Mamma Joke",
		pp: 10,
		priority: 1,
		flags: {
			protect: 1,
			mirror: 1,
			distance: 1,
			heal: 1,
			sound: 1
		},
		drain: [3, 4],
		secondary: false,
		target: "any",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Taunt", target);
			this.add('-anim', source, "Boomburst", target);
			this.add('-anim', source, "Extreme Speed", target);
			this.add("c|~Spandan|" + ["Yo mama so stupid she got locked in a grocery store and starved!", "Yo mama so fat that the Richie Rich had to pay for her lipo-suction operation.", "Yo mama so fat it took her four weeks to die from lethal injection.", "Yo mama so fat she sat on an iPhone and turned it into an iPad", "Yo mama so fat when she stepped on the scale, the doctor said \"Holy Crap, That's My Phone Number\"", "Yo mama so fat she uses Google Earth to take a selfie.", "Yo mama so stupid when the computer said \"Press any key to continue\", she couldn't find the \"Any\" key.", "Yo mama so bald, I could polish her head and take her bowling.", "Yo mama is so ugly, Bob the builder said: 'i can't fix that.'", "Yo mama so ugleh, the Illuminati closed its eye.", "Yo mama so ugleh, Hello Kitty said goodbye.", "Yo mama so ugly, One direction went the other direction."][this.random(12)]);
		},
		type: "Flying",
		contestType: "Cool",
	},
	dragonshift: {
		accuracy: 100,
		category: "Status",
		id: "dragonshift",
		isNonstandard: true,
		name: "Dragon Shift",
		pp: 5,
		priority: 0,
		flags: {
			protect: 1,
			reflectable: 1,
			mirror: 1,
			authentic: 1
		},
		self: {
			boosts: {
				atk: 3,
				def: 1,
				spe: 2,
				spd: 1,
			},
		},
		secondary: false,
		onPrepareHit: function(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Dragon Dance", source);
			if (source.name === 'Kyuramber') this.add("c|&Kyuramber|Get re(kt)ddy");
			this.useMove('Wish', source);
		},
		target: "self",
		type: "Dragon",
	},
	legendsambition: {
		accuracy: 100,
		basePower: 130,
		category: "Special",
		id: "legendsambition",
		isNonstandard: true,
		name: "Legend\'s Ambition",
		pp: 5,
		priority: 1,
		flags: {
			protect: 1,
			mirror: 1
		},
		onPrepareHit: function(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Judgment", target);
		},
		self: {
			boosts: {
				def: -1,
				spd: -1,
			},
		},
		contestType: "Cool",
		target: "normal",
		type: "Dragon",
	},
	"logicpower": {
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		defensiveCategory: "Special",
		desc: "Deals damage to the target based on its Special Defense instead of Defense.",
		shortDesc: "Damages target based on Sp. Def, not Def.",
		id: "logicpower",
		isViable: true,
		name: "Logic Power",
		pp: 10,
		priority: 0,
		self: {
			boosts: {
				def: 1,
				spd: 1,
			},
		},
		onPrepareHit: function(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Black Hole Eclipse", target);
		},
		flags: {
			protect: 1,
			mirror: 1
		},
		secondary: false,
		target: "normal",
		type: "Dark",
		contestType: "Beautiful",
	},
	"superswitch": {
		num: 226,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user is replaced with another Pokemon in its party. The selected Pokemon has the user's stat stage changes, confusion, and certain move effects transferred to it.",
		shortDesc: "User switches, passing stat changes and more.",
		id: "superswitch",
		isViable: true,
		name: "Super Switch",
		pp: 40,
		priority: 5,
		self: {
			boosts: {
				def: 1,
				spd: 1,
			},
		},
		onPrepareHit: function(target, source) {
			this.useMove('Substitute', source);
			this.useMove('Baton Pass', source);
		},
		flags: {},
		selfSwitch: 'copyvolatile',
		secondary: false,
		target: "self",
		type: "Dragon",
		contestType: "Cute",
	},
	"banhammah": {
		num: 18,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The target is forced to switch out and be replaced with a random unfainted ally. Fails if the target used Ingrain previously or has the Ability Suction Cups.",
		shortDesc: "Forces the target to switch to a random ally.",
		id: "banhammah",
		isViable: true,
		name: "BANHAMMAH!!!!",
		pp: 5,
		priority: 7,
		flags: {
			reflectable: 1,
			mirror: 1,
			authentic: 1
		},
		forceSwitch: true,
		secondary: false,
		target: "normal",
		type: "Dark",
		contestType: "Clever",
	},
	"massacre": {
		num: 153,
		accuracy: 100,
		basePower: 250,
		category: "Physical",
		desc: "The user faints after using this move, even if this move fails for having no target. This move is prevented from executing if any active Pokemon has the Ability Damp.",
		shortDesc: "Hits adjacent Pokemon. The user faints.",
		id: "massacre",
		isViable: true,
		name: "Massacre",
		pp: 5,
		priority: 3,
		flags: {
			protect: 1,
			mirror: 1
		},
		selfdestruct: "ifHit",
		secondary: false,
		target: "allAdjacent",
		type: "Dragon",
		contestType: "Beautiful",
	},
	"raginglake": {
		num: 560,
		accuracy: 60,
		basePower: 150,
		category: "Physical",
		desc: "This move combines Flying in its type effectiveness against the target. Damage doubles and no accuracy check is done if the target has used Minimize while active.",
		shortDesc: "Combines Flying in its type effectiveness.",
		id: "raginglake",
		name: "Raging Lake",
		pp: 10,
		flags: {
			contact: 1,
			protect: 1,
			mirror: 1,
			gravity: 1,
			distance: 1,
			nonsky: 1
		},
		onEffectiveness: function(typeMod, type, move) {
			return typeMod + this.getEffectiveness('Dragon', type);
		},
		priority: 0,
		secondary: false,
		target: "any",
		type: "Water",
		contestType: "Tough",
	},
	dragonsymphony: {
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		id: "dragonsymphony",
		isNonstandard: true,
		isViable: true,
		name: "Dragon Symphony",
		pp: 20,
		noPPBoosts: true,
		priority: 0,
		flags: {
			mirror: 1,
			protect: 1
		},
		onPrepareHit: function(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Sunsteel Strike", target);
		},
		onHit: function(target, source) {
			if (toID(source.name) === 'eternalmayhem') {
				this.add('c|@Eternal Mayhem|How \'bout we turn on some trap, eh? Or the classics, they\'ll lull you to sleep, they will!');
			}
		},
		secondary: {
			chance: 100,
			status: 'sleep',
		},
		self: {
			chance: 60,
			boosts: {
				atk: 2,
				spe: 2,
			},
		},
		recoil: [1, 5],
		target: "normal",
		type: "Dragon",
	},
	"secretkiller": {
		num: 20000,
		accuracy: 100,
		basePower: 0,
		damageCallback: function(pokemon, target) {
			this.damage(target.maxhp / 16, target, pokemon);
		},
		category: "Special",
		desc: "Deals damage to the target equal to half of its current HP, rounded down, but not less than 1 HP.",
		shortDesc: "Does damage equal to 1/2 target's current HP.",
		id: "secretkiller",
		isViable: true,
		name: "Secret Killer",
		boosts: {
			atk: -1,
			def: -1,
			spa: -1,
			spd: -1,
			spe: -1,
			accuracy: -1,
			evasion: -1,
		},
		status: 'slp',
		pp: 15,
		priority: 1,
		flags: {
			protect: 1,
			mirror: 1
		},
		onPrepareHit: function(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Dark Void", target);
		},
		secondary: false,
		target: "ghost",
		type: "Ghost",
		contestType: "Tough",
	},
	girlygirl: {
		shortDesc: "120 BP Special Normal-type move with 16 PP and 95% accuracy. It's a sound move and raises the user's speed sharply.",
		accuracy: 100,
		pp: 15,
		id: "girlygirl",
		name: "Girly Girl",
		isNonstandard: true,
		isViable: true,
		basePower: 120,
		category: "Special",
		type: "Normal",
		target: "normal",
		secondary: {
			chance: 100,
			self: {
				boosts: {
					spe: 2,
					def: 1,
				},
			},
		},
		onPrepareHit: function(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Boomburst", target);
		},
	},
	"stonewrap": {
		num: 42069,
		accuracy: 100,
		basePower: 20,
		category: "Physical",
		desc: "Prevents the target from switching for four or five turns; seven turns if the user is holding Grip Claw. Causes damage to the target equal to 1/8 of its maximum HP (1/6 if the user is holding Binding Band), rounded down, at the end of each turn during effect. The target can still switch out if it is holding Shed Shell or uses Baton Pass, Parting Shot, U-turn, or Volt Switch. The effect ends if either the user or the target leaves the field, or if the target uses Rapid Spin or Substitute. This effect is not stackable or reset by using this or another partial-trapping move.",
		shortDesc: "Traps and damages the target for 4-5 turns.",
		id: "stonewrap",
		name: "Stone Wrap",
		pp: 20,
		priority: 0,
		flags: {
			contact: 1,
			protect: 1,
			mirror: 1
		},
		volatileStatus: 'partiallytrapped',
		secondary: false,
		target: "normal",
		type: "Rock",
		zMovePower: 100,
		contestType: "Tough",
	},
	// Modified moves
	"defog": {
		inherit: true,
		onHit: function(target, source, move) {
			if (!target.volatiles['substitute'] || move.infiltrates) this.boost({
				evasion: -1
			});
			let removeTarget = {
				reflect: 1,
				lightscreen: 1,
				safeguard: 1,
				mist: 1,
				spikes: 1,
				toxicspikes: 1,
				burnspikes: 1,
				stealthrock: 1,
				stickyweb: 1
			};
			let removeAll = {
				spikes: 1,
				toxicspikes: 1,
				burnspikes: 1,
				stealthrock: 1,
				stickyweb: 1
			};
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
	},
	"rapidspin": {
		inherit: true,
		self: {
			onHit: function(pokemon) {
				if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
					this.add('-end', pokemon, 'Leech Seed', '[from] move: Rapid Spin', '[of] ' + pokemon);
				}
				let sideConditions = {
					spikes: 1,
					toxicspikes: 1,
					burnspikes: 1,
					stealthrock: 1,
					stickyweb: 1
				};
				for (let i in sideConditions) {
					if (pokemon.hp && pokemon.side.removeSideCondition(i)) {
						this.add('-sideend', pokemon.side, this.getEffect(i).name, '[from] move: Rapid Spin', '[of] ' + pokemon);
					}
				}
				if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
					pokemon.removeVolatile('partiallytrapped');
				}
				if (pokemon.hp && pokemon.volatiles['maelstrm']) {
					pokemon.removeVolatile('maelstrm');
				}
				if (pokemon.hp && pokemon.volatiles['splinters']) {
					pokemon.removeVolatile('splinters');
				}
			},
		},
	},
	"hypnosis": {
		inherit: true,
		accuracy: 45,
	},
	/*"toxicspikes": {
		inherit: true,
		if (pokemon.hasType('Poison') || pokemon.template.species === 'Shuckle') {
					this.add('-sideend', pokemon.side, 'move: Toxic Spikes', '[of] ' + pokemon);
					pokemon.side.removeSideCondition('toxicspikes');
				} else if (this.effectData.layers >= 2) {
					pokemon.trySetStatus('tox', pokemon.side.foe.active[0]);
				} else {
					pokemon.trySetStatus('psn', pokemon.side.foe.active[0]);
				}
},*/
};
