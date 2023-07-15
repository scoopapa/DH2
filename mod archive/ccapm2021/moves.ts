export const Moves: {[moveid: string]: ModdedMoveData} = {
// Existing Moves
	appleacid: {
		inherit: true,
		type: "Food",
	},
	aurawheel: {
		num: 783,
		accuracy: 100,
		basePower: 110,
		category: "Physical",
    	shortDesc: "Morpeko: Electric; Hangry: Feral; 100% +1 Spe.",
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
				move.type = 'Feral';
			} else {
				move.type = 'Electric';
			}
		},
		target: "normal",
		type: "Electric",
	},
	belch: { // will add the berry effect later
		num: 562,
		accuracy: 100,
		basePower: 80,
		category: "Special",
    	shortDesc: "30% chance to Poison, 100% to Toxic if a berry was eaten.",
		isViable: true,
		name: "Belch",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onHit(target, source, move) {
    		if (source.ateBerry) target.setStatus('tox');;
		},
		secondary: {
			chance: 30,
			status: 'psn',
		},
		target: "normal",
		contestType: "Tough",
		type: "Food",
	},
	brutalswing: {
		inherit: true,
		type: "Feral",
	},
	crushclaw: {
		inherit: true,
		accuracy: 100,
		basePower: 80,
		isViable: true,
		type: "Feral",
	},
	decorate: {
		num: 777,
		accuracy: true,
		basePower: 0,
		category: "Status",
    shortDesc: "Raises the user's Atk, Def, Speed by 1.",
		isViable: true,
		name: "Decorate",
		pp: 20,
		priority: 0,
		flags: {snatch: 1},
		boosts: {
			atk: 1,
			def: 1,
			spe: 1,
		},
		secondary: null,
		target: "self",
		zMove: {effect: 'clearnegativeboost'},
		type: "Food",
	},
	eggbomb: {
		inherit: true,
		accuracy: 90,
		type: "Food",
	},
	furyswipes: {
		inherit: true,
		accuracy: 100,
		basePower: 25,
		type: "Feral",
	},
	gastroacid: {
		inherit: true,
		type: "Food",
	},
	gravapple: {
		inherit: true,
		type: "Food",
	},
	howl: {
		inherit: true,
		type: "Feral",
	},
	hyperfang: {
		num: 158,
		accuracy: 95,
		basePower: 90,
		category: "Physical",
    shortDesc: "Destroys screens, unless the target is immune.",
		isViable: true,
		name: "Hyper Fang",
		pp: 10,
		priority: 0,
		flags: {bite: 1, contact: 1, protect: 1, mirror: 1},
		onTryHit(pokemon) {
			// will shatter screens through sub, before you hit
			if (pokemon.runImmunity('Feral')) {
				pokemon.side.removeSideCondition('reflect');
				pokemon.side.removeSideCondition('lightscreen');
				pokemon.side.removeSideCondition('auroraveil');
			}
		},
		secondary: null,
		target: "normal",
		type: "Feral",
	},
	jawlock: {
		inherit: true,
		basePower: 120,
		isViable: true,
		type: "Feral",
	},
	meteorassault: {
		num: 794,
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		name: "Meteor Assault",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		self: {
			boosts: {
				def: -1,
				spd: -1,
			},
		},
		secondary: null,
		target: "normal",
		type: "Food",
	},
	milkdrink: {
		inherit: true,
		type: "Food",
	},
	rage: {
		inherit: true,
		type: "Feral",
	},
	thrash: {
		inherit: true,
		type: "Feral",
	},
	scaryface: {
		inherit: true,
		type: "Feral",
	},
	snarl: {
		inherit: true,
		isViable: true,
		type: "Feral",
	},
	softboiled: {
		inherit: true,
		type: "Food",
	},
	spitup: {
		inherit: true,
		type: "Food",
	},
	swallow: {
		inherit: true,
		type: "Food",
	},
	stockpile: {
		inherit: true,
		type: "Food",
	},
	stuffcheeks: {
		inherit: true,
		type: "Food",
	},
	stomp: {
		inherit: true,
		type: "Feral",
	},
	sweetscent: {
		inherit: true,
		type: "Food",
	},
	roar: {
		inherit: true,
		type: "Feral",
	},
	teatime: {
		inherit: true,
		type: "Food",
	},
	workup: {
		inherit: true,
		isViable: true,
		type: "Feral",
	},

// New Moves
	bananapeel: {
		accuracy: 90,
		basePower: 60,
		category: "Physical",
    shortDesc: "Forces the target to switch to a random ally.",
		isViable: true,
		name: "Banana Peel",
		pp: 10,
		priority: -6,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Energy Ball", target);
		},
		forceSwitch: true,
		target: "normal",
		type: "Food",
		contestType: "Cool",
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
			this.add('-anim', source, "Dragon Darts", target);
		},
		multihit: 2,
		smartTarget: true,
		secondary: null,
		target: "normal",
		type: "Food",
		maxMove: {basePower: 130},
	},
	batterup: {
		accuracy: 100,
		basePower: 60,
		category: "Physical",
    shortDesc: "No additional effect.",
		name: "Batter Up",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Acid Spray", target);
		},
		secondary: null,
		target: "allAdjacent",
		type: "Food",
	},
	berserker: {
		accuracy: true,
		basePower: 0,
		category: "Status",
    shortDesc: "Raises the user's Atk and SpA by 2 stages and confuses it.",
		isViable: true,
		name: "Berserker",
		pp: 20,
		priority: 0,
		flags: {snatch: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Dragon Dance", target);
		},
		volatileStatus: 'confusion',
		boosts: {
			atk: 2,
			spa: 2,
		},
		secondary: null,
		target: "self",
		type: "Feral",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Cute",
	},
	breakthrough: {
		accuracy: 100,
		basePower: 70,
		category: "Special",
    shortDesc: "Super effective on Steel.",
		isViable: true,
		name: "Breakthrough",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Work Up", target);
			this.add('-anim', source, "Psyshock", target);
		},
		onEffectiveness(typeMod, target, type) {
			if (type === 'Steel') return 1;
		},
		target: "normal",
		type: "Feral",
		contestType: "Beautiful",
	},
	caloray: {
		accuracy: 100,
		basePower: 90,
		category: "Special",
    shortDesc: "30% chance to lower the target's Speed by 1.",
		isViable: true,
		name: "Calo-ray",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Flash Cannon", target);
		},
		secondary: {
			chance: 30,
			boosts: {
				spe: -1,
			},
		},
		target: "normal",
		type: "Food",
		contestType: "Beautiful",
	},
	candycrush: {
		accuracy: 100,
		basePower: 120,
		category: "Physical",
    shortDesc: "Has 33% Recoil.",
		isViable: true,
		name: "Candy Crush",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Crush Grip", target);
		},
		recoil: [33, 100],
		secondary: null,
		target: "normal",
		type: "Food",
		contestType: "Tough",
	},
	cherryontop: {
		accuracy: 100,
		basePower: 120,
		category: "Physical",
    shortDesc: "Hits 2 turns later.",
		isViable: true,
		name: "Cherry On Top",
		pp: 10,
		priority: 0,
		flags: {},
		ignoreImmunity: true,
		isFutureMove: true,
		onTry(source, target) {
			if (!target.side.addSlotCondition(target, 'futuremove')) return false;
			Object.assign(target.side.slotConditions[target.position]['futuremove'], {
				duration: 3,
				move: 'cherryontop',
				source: source,
				moveData: {
					id: 'cherryontop',
					name: "Cherry On Top",
					accuracy: 100,
					basePower: 120,
					category: "Physical",
					priority: 0,
					flags: {},
					ignoreImmunity: false,
					effectType: 'Move',
					isFutureMove: true,
					type: 'Food',
				},
			});
			this.add('-start', source, 'move: Cherry On Top');
			return null;
		},
		secondary: null,
		target: "normal",
		type: "Food",
		contestType: "Clever",
	},
	fruitpunch: {
		accuracy: 100,
		basePower: 75,
		category: "Physical",
    shortDesc: "10% chance to lower the opponent's Speed by 1.",
		isViable: true,
		name: "Fruit Punch",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Mega Punch", target);
		},
		secondary: {
			chance: 10,
			boosts: {
				spe: -1,
			},
		},
		target: "normal",
		type: "Food",
		contestType: "Beautiful",
	},
	honeybomb: {
		accuracy: 90,
		basePower: 40,
		category: "Physical",
    shortDesc: "Hits 3 times.",
		isViable: true,
		name: "Honey Bomb",
		pp: 10,
		priority: 0,
		flags: {bullet: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Seed Bomb", target);
		},
		multihit: 3,
		secondary: null,
		target: "normal",
		type: "Food",
		zMove: {basePower: 140},
		maxMove: {basePower: 130},
		contestType: "Tough",
	},
	huntinggaze: {
		accuracy: 100,
		basePower: 0,
		category: "Status",
    shortDesc: "Minimizes the target's evasiveness.",
		isViable: true,
		name: "Hunting Gaze",
		pp: 20,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Glare", target);
		},
		boosts: {
			evasion: -12,
		},
		secondary: null,
		target: "normal",
		type: "Feral",
		zMove: {boost: {atk: 1}},
		contestType: "Cool",
	},
	laserbean: {
		accuracy: 100,
		basePower: 65,
		category: "Special",
    shortDesc: "10% chance to lower the target's Speed by 1.",
		name: "Laser Bean",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Psybeam", target);
		},
		secondary: {
			chance: 10,
			boosts: {
				spe: -1,
			},
		},
		target: "normal",
		type: "Food",
		contestType: "Beautiful",
	},
	spaghettem: {
		accuracy: 100,
		basePower: 80,
		category: "Physical",
    shortDesc: "Traps the opponent.",
		isViable: true,
		name: "Spaghettem",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Octolock", target);
		},
		secondary: {
			chance: 100,
			onHit(target, source, move) {
				if (source.isActive) target.addVolatile('trapped', source, move, 'trapper');
			},
		},
		target: "normal",
		type: "Food",
		contestType: "Tough",
	},
	sweettooth: {
		accuracy: 100,
		basePower: 75,
		category: "Physical",
    shortDesc: "Heals the user for 50% of the damage dealt.",
		isViable: true,
		name: "Sweet Tooth",
		pp: 10,
		priority: 0,
		flags: {bite: 1, contact: 1, protect: 1, mirror: 1, heal: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Psychic Fangs", target);
		},
		drain: [1, 2],
		secondary: null,
		target: "normal",
		type: "Food",
		contestType: "Tough",
	},
	tearapart: {
		accuracy: 100,
		basePower: 20,
		category: "Physical",
    shortDesc: "Hits twice. Lowers the target's Def after each hit.",
		isViable: true,
    name: "Tear Apart",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "X-Scissor", target);
		},
		multihit: 2,
		secondary: {
			chance: 100,
			boosts: {
				def: -1,
			},
    },
		target: "normal",
		type: "Feral",
		maxMove: {basePower: 100},
		contestType: "Tough",
	},
	untamedanger: {
		accuracy: 85,
		basePower: 70,
		category: "Special",
    shortDesc: "Always lands a critical hit.",
		isViable: true,
		name: "Untamed Anger",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Dragon Dance", target);
			this.add('-anim', source, "Aura Sphere", target);
		},
		willCrit: true,
		secondary: null,
		target: "normal",
		type: "Feral",
		contestType: "Beautiful",
	},
	whiskaway: {
		accuracy: true,
		basePower: 0,
		category: "Status",
    shortDesc: "Removes hazards from the user's side of the field. +1 Def if successful.",
		isViable: true,
		name: "Whisk Away",
		pp: 15,
		priority: 0,
		flags: {},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Quiver Dance", target);
		},
		onHit(pokemon) {
			 let didRemove = false;
			 if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
				  this.add('-end', pokemon, 'Leech Seed', '[from] move: Whisk Away', '[of] ' + pokemon);
				  didRemove = true;
			 }
			 const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
			 for (const condition of sideConditions) {
				  if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
						this.add('-sideend', pokemon.side, this.dex.getEffect(condition).name, '[from] move: Whisk Away', '[of] ' + pokemon);
						didRemove = true;
				  }
			 }
			 if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
				  pokemon.removeVolatile('partiallytrapped');
				  didRemove = true;
			 }
			 if (didRemove){
					 this.boost({def: 1}, pokemon);
			 }    
		},
		secondary: null,
		target: "self",
		type: "Food",
		zMove: {boost: {accuracy: 1}},
		contestType: "Cool",
	},
};
