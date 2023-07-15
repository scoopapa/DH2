export const Moves: {[moveid: string]: ModdedMoveData} = {
	rockout: {
		accuracy: 100,
		basePower: 85,
		category: "Special",
   shortDesc: "Ignores the Abilities of other Pokemon.",
		isViable: true,
		name: "Rock Out",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, authentic: 1},
 		onPrepareHit: function(target, source, move) {
		  this.attrLastMove('[still]');
		  this.add('-anim', source, "Rock Polish", target);
		  this.add('-anim', source, "Hyper Voice", target);
		},
		ignoreAbility: true,
		secondary: null,
		target: "allAdjacentFoes",
		type: "Rock",
	},
	chloroscythe: {
		accuracy: 100,
		basePower: 90,
		category: "Physical",
   shortDesc: "Charges and lowers the user's Attack by 1 on Turn 1, Attacks and lowers the user Attack by 1 on Turn 2.",
		isViable: true,
		name: "Chloroscythe",
		pp: 10,
		priority: 0,
		flags: {charge: 1, protect: 1, mirror: 1, contact: 1},
 		onPrepareHit: function(target, source, move) {
		  this.attrLastMove('[still]');
		  this.add('-anim', source, "Solar Blade", target);
		},
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name);
			this.boost({atk: -1}, attacker, attacker, move);
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
		secondary: {
			chance: 100,
			self: {
				boosts: {
					atk: -1,
				},
			},
		},		
      target: "normal",
		type: "Grass",
	},
	berrybomb: {
		accuracy: 100,
		basePower: 0,
		category: "Physical",
    shortDesc: "Power and type depends on the user's berry.",
		isViable: true,
		name: "Berry Bomb",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, bullet: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Natural Gift", target);
		},
		onModifyType(move, pokemon) {
			if (pokemon.ignoringItem()) return;
			const item = pokemon.getItem();
			if (!item.naturalGift) return;
			move.type = item.naturalGift.type;
		},
		onPrepareHit(target, pokemon, move) {
			if (pokemon.ignoringItem()) return false;
			const item = pokemon.getItem();
			if (!item.naturalGift) return false;
			move.basePower = item.naturalGift.basePower;
			pokemon.setItem('');
			pokemon.lastItem = item.id;
			pokemon.usedItemThisTurn = true;
			this.runEvent('AfterUseItem', pokemon, null, null, item);
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		zMove: {basePower: 160},
		maxMove: {basePower: 130},
		contestType: "Clever",
	},
	berryblast: {
		accuracy: 100,
		basePower: 0,
		category: "Special",
    shortDesc: "Power and type depends on the user's berry.",
		isViable: true,
		name: "Berry Blast",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, bullet: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Terrain Pulse", target);
		},
		onModifyType(move, pokemon) {
			if (pokemon.ignoringItem()) return;
			const item = pokemon.getItem();
			if (!item.naturalGift) return;
			move.type = item.naturalGift.type;
		},
		onPrepareHit(target, pokemon, move) {
			if (pokemon.ignoringItem()) return false;
			const item = pokemon.getItem();
			if (!item.naturalGift) return false;
			move.basePower = item.naturalGift.basePower;
			pokemon.setItem('');
			pokemon.lastItem = item.id;
			pokemon.usedItemThisTurn = true;
			this.runEvent('AfterUseItem', pokemon, null, null, item);
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		zMove: {basePower: 160},
		maxMove: {basePower: 130},
		contestType: "Clever",
	},
	sinisterarrowraid: {
		num: 695,
		accuracy: true,
		basePower: 180,
		category: "Physical",
    shortDesc: "Traps the foe.",
		isNonstandard: "Past",
		name: "Sinister Arrow Raid",
		pp: 1,
		priority: 0,
		flags: {},
		onHit(target, source, move) {
			if (source.isActive) target.addVolatile('trapped', source, move, 'trapper');
		},
		isZ: "decidiumz",
		secondary: null,
		target: "normal",
		type: "Ghost",
		contestType: "Cool",
	},
	swampysmackdown: {
		accuracy: true,
		basePower: 170,
		category: "Special",
    	shortDesc: "Summons a swamp for 4 turns.",
		isNonstandard: "Past",
		name: "Swampy Smackdown",
		pp: 1,
		priority: 0,
		flags: {},
		onPrepareHit: function(target, source, move) {
		  this.attrLastMove('[still]');
		  this.add('-anim', source, "Frenzy Plant", target);
		},
		onHit(target, source, move) {
			target.side.addSideCondition('grasspledge');
		},
		isZ: "venusauriumz",
		secondary: null,
		target: "normal",
		type: "Grass",
		contestType: "Cool",
	},
	intensifiedinferno: {
		accuracy: true,
		basePower: 170,
		category: "Special",
    	shortDesc: "Summons a sea of fire for 4 turns.",
		isNonstandard: "Past",
		name: "Intensified Inferno",
		pp: 1,
		priority: 0,
		flags: {},
		onPrepareHit: function(target, source, move) {
		  this.attrLastMove('[still]');
		  this.add('-anim', source, "Blast Burn", target);
		},
		onHit(target, source, move) {
			target.side.addSideCondition('firepledge');
		},
		isZ: "charizardiumz",
		secondary: null,
		target: "normal",
		type: "Fire",
		contestType: "Cool",
	},
	destructivedownpour: {
		accuracy: true,
		basePower: 170,
		category: "Special",
    	shortDesc: "Summons a rainbow on the user's side of the field for 4 turns.",
		isNonstandard: "Past",
		name: "Destructive Downpour",
		pp: 1,
		priority: 0,
		flags: {},
		onPrepareHit: function(target, source, move) {
		  this.attrLastMove('[still]');
		  this.add('-anim', source, "Hydro Cannon", target);
		},
		onHit(target, source, move) {
			source.side.addSideCondition('waterpledge');
		},
		isZ: "blastoisiumz",
		secondary: null,
		target: "normal",
		type: "Water",
		contestType: "Cool",
	},
	mindrake: {
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		defensiveCategory: "Special",
    shortDesc: "Damages target based on Sp. Def, not Defense.",
		isViable: true,
		name: "Mind Rake",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
		  this.attrLastMove('[still]');
		  this.add('-anim', source, "Psycho Cut", target);
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
		contestType: "Beautiful",
	},
	relicrejuvenation: {
		accuracy: 100,
		basePower: 0,
		damage: 'level',
		category: "Special",
    shortDesc: "Does damage equal to the user's level. Heals the user by 50% of the damage dealt.",
		isViable: true,
		name: "Relic Rejuvenation",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
		  this.attrLastMove('[still]');
		  this.add('-anim', source, "Recover", target);
		  this.add('-anim', source, "Psywave", target);
		},
		drain: [1, 2],
		secondary: null,
		target: "normal",
		type: "Psychic",
		contestType: "Clever",
	},
	deepseafinale: {
		accuracy: 90,
		basePower: 130,
		category: "Special",
		name: "Deep Sea Finale",
    shortDesc: "Lowers the user's Special Attack by 2 stages.",
		isViable: true,
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, authentic: 1},
		onPrepareHit: function(target, source, move) {
		  this.attrLastMove('[still]');
		  this.add('-anim', source, "Oceanic Operetta", target);
		},
		self: {
			boosts: {
				spa: -2,
			},
		},
		secondary: null,
		target: "normal",
		type: "Water",
		contestType: "Beautiful",
	},
	revelationspin: {
		accuracy: 100,
		basePower: 90,
		category: "Physical",
    shortDesc: "Type matches the user's primary type.",
		isViable: true,
		name: "Revelation Spin",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, dance: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Revelation Dance", target);
		},
		onModifyType(move, pokemon) {
			let type = pokemon.types[0];
			if (type === "Bird") type = "???";
			move.type = type;
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Beautiful",
	},
	revelationdance: {
		num: 686,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		isNonstandard: null,
		name: "Revelation Dance",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, dance: 1},
		onModifyType(move, pokemon) {
			let type = pokemon.types[0];
			if (type === "Bird") type = "???";
			move.type = type;
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Beautiful",
	},
	bananasplit: {
		accuracy: 100,
		basePower: 50,
		category: "Physical",
    shortDesc: "Hits twice. Doubles: Tries to hit each foe once.",
		isViable: true,
		name: "Banana Split",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Icy Wind", target);
		},
		multihit: 2,
		smartTarget: true,
		secondary: null,
		target: "allAdjacentFoes",
		type: "Ice",
		maxMove: {basePower: 130},
	},
	greentea: {
		accuracy: 100,
		basePower: 70,
		category: "Special",
    shortDesc: "30% chance to burn the target. Thaws target.",
		isViable: true,
		name: "Green Tea",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, defrost: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Energy Ball", target);
		},
		thawsTarget: true,
		secondary: {
			chance: 30,
			status: 'brn',
		},
		target: "allAdjacentFoes",
		type: "Grass",
	},
	futureshock: {
		accuracy: 100,
		basePower: 80,
		category: "Physical",
    shortDesc: "10% chance to paralyze the target",
		isViable: true,
		name: "Future Shock",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Freeze Shock", target);
		},
		secondary: {
			chance: 10,
			status: 'par',
		},
		target: "normal",
		type: "Ice",
		contestType: "Beautiful",
	},
	breakdown: {
		accuracy: 100,
		basePower: 85,
		category: "Physical",
    shortDesc: "Burns the user.",
		isViable: true,
		name: "Breakdown",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Fiery Wrath", target);
			this.add('-anim', source, "Bulk Up", target);
		},
		onHit(target, source, move) {
			source.trySetStatus('brn', source, move);
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Dark",
		contestType: "Tough",
	},
	shootingstar: {
		accuracy: 100,
		basePower: 90,
		category: "Special",
    shortDesc: "Gives the foe the Telekinesis effect.",
		isViable: true,
		name: "Shooting Star",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Cosmic Power", target);
			this.add('-anim', source, "Psychic", target);
		},
		onHit(target, source, move) {
			target.addVolatile('telekinesis');
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Psychic",
		contestType: "Clever",
	},
	haywire: {
		accuracy: 75,
		basePower: 100,
		category: "Special",
    shortDesc: "Traps and damages the target for 4-5 turns.",
		isViable: true,
		name: "Haywire",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Magnet Rise", target);
			this.add('-anim', source, "Leaf Storm", target);
		},
		volatileStatus: 'partiallytrapped',
		secondary: null,
		target: "allAdjacentFoes",
		type: "Grass",
		contestType: "Tough",
	},
	stinkbomb: {
		accuracy: 75,
		basePower: 100,
		category: "Physical",
    shortDesc: "Traps and damages the target for 4-5 turns.",
		isViable: true,
		name: "Stink Bomb",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, bullet: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Toxic", target);
			this.add('-anim', source, "Sludge Bomb", target);
		},
		volatileStatus: 'partiallytrapped',
		secondary: null,
		target: "allAdjacentFoes",
		type: "Poison",
		contestType: "Tough",
	},
	stampede: {
		accuracy: 100,
		basePower: 95,
		category: "Physical",
    shortDesc: "Gives the foe the Embargo effect.",
		isViable: true,
		name: "Stampede",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Agility", target);
			this.add('-anim', source, "Stomp", target);
		},
		onHit(target, source, move) {
			target.addVolatile('embargo');
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Normal",
		contestType: "Clever",
	},
	petrify: {
		num: 137,
		accuracy: 100,
		basePower: 0,
		category: "Status",
    shortDesc: "Paralyzes the foe and changes their type to Rock.",
		isViable: true,
		name: "Petrify",
		pp: 15,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, mystery: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Glare", target);
			this.add('-anim', source, "Rock Polish", target);
		},
		onHit(target) {
			if (target.getTypes().join() === 'Rock' || !target.setType('Rock')) {
				// Soak should animate even when it fails.
				// Returning false would suppress the animation.
				this.add('-fail', target);
				return null;
			}
			this.add('-start', target, 'typechange', 'Rock');
		},
		status: 'par',
		secondary: null,
		target: "allAdjacentFoes",
		type: "Rock",
		zMove: {boost: {def: 1}},
		contestType: "Tough",
	},
	rarerune: {
		accuracy: 100,
		basePower: 100,
		category: "Physical",
    shortDesc: "Changes the foe's ability to Wandering Spirit and wakes them up.",
		isViable: true,
		name: "Rare Rune",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Poltergeist", target);
			this.add('-anim', source, "Hex", target);
		},
		onTryImmunity(target) {
			// Truant and Insomnia have special treatment; they fail before
			// checking accuracy and will double Stomping Tantrum's BP
			if (target.ability === 'truant') {
				return false;
			}
		},
		onTryHit(target) {
			if (target.getAbility().isPermanent) {
				return false;
			}
		},
		onHit(pokemon) {
			const oldAbility = pokemon.setAbility('wanderingspirit');
			if (oldAbility) {
				this.add('-ability', pokemon, 'Wandering Spirit', '[from] move: Rare Rune');
				if (pokemon.status === 'slp') {
					pokemon.cureStatus();
				}
				return;
			}
			return false;
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Ghost",
		contestType: "Clever",
	},
	heelheat: {
		accuracy: 100,
		basePower: 95,
		category: "Special",
    shortDesc: "Uses target's Special Attack stat in damage calculation.",
		isViable: true,
		name: "Heel Heat",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Burn Up", target);
		},
		useTargetOffensive: true,
		secondary: null,
		target: "normal",
		type: "Fire",
		contestType: "Clever",
	},
	energyblast: {
		accuracy: 100,
		basePower: 120,
		category: "Special",
    shortDesc: "Has 33% recoil.",
		isViable: true,
		name: "Energy Blast",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hyper Beam", target);
		},
		recoil: [33, 100],
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Tough",
	},
	aurawheel: {
		num: 783,
		accuracy: 100,
		basePower: 110,
		category: "Physical",
		shortDesc: "Morpeko: Fairy; Hangry: Dark; 100% +1 Spe.",
		name: "Aura Wheel",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 100,
			self: {
				boosts: {
					spe: 1,
				},
			},
		},
		onTry(pokemon) {
			if (pokemon.species.baseSpecies === 'Morpeko') {
				return;
			}
			this.hint("Only a Pokemon whose form is Morpeko or Morpeko-Hangry can use this move.");
			this.add('-fail', pokemon, 'move: Aura Wheel');
			return null;
		},
		onModifyType(move, pokemon) {
			if (pokemon.species.name === 'Morpeko-Hangry') {
				move.type = 'Dark';
			} else {
				move.type = 'Fairy';
			}
		},
		target: "normal",
		type: "Fairy",
	},
	pressurecook: {
		accuracy: 100,
		basePower: 70,
		category: "Special",
    shortDesc: "Super effective on Water.",
		isViable: true,
		name: "Pressure Cook",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Psyshock", target);
		},
		onEffectiveness(typeMod, target, type) {
			if (type === 'Water') return 1;
		},
		target: "normal",
		type: "Psychic",
		contestType: "Beautiful",
	},
	poisondart: {
		accuracy: 100,
		basePower: 40,
		category: "Physical",
    shortDesc: "Usually goes first. 10% chance to poison",
		isViable: true,
		name: "Poison Dart",
		pp: 30,
		priority: 1,
		flags: {protect: 1, mirror: 1, contact: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Poison Sting", target);
		},
		secondary: {
			chance: 10,
			status: 'psn',
		},
		target: "normal",
		type: "Poison",
		contestType: "Cool",
	},
};
