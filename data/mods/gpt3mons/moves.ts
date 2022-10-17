export const Moves: {[moveid: string]: ModdedMoveData} = {
	ampup: {
		num: 3001,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Amp Up",
		shortDesc: "Raises the user's Def and Sp. Atk by 1.",
		pp: 20,
		priority: 0,
		flags: {snatch: 1},
		onPrepareHit: function(target, source, move) {
		    this.attrLastMove('[still]');
		    this.add('-anim', source, "Magnetic Flux", target);
		},
		boosts: {
			def: 1,
			spa: 1,
		},
		secondary: null,
		target: "normal",
		type: "Electric",
		zMove: {boost: {spe: 1}},
		contestType: "Tough",
	},
	bindingshot: {
		num: 3002,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Binding Shot",
		shortDesc: "Applies Embargo to the target and prevents it from switching out.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
		    this.attrLastMove('[still]');
		    this.add('-anim', source, "Anchor Shot", target);
		},
		volatileStatus: 'embargo',
		condition: {
			duration: 5,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Embargo');
			},
			// Item suppression implemented in Pokemon.ignoringItem() within sim/pokemon.js
			onResidualOrder: 21,
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Embargo');
			},
		},
		secondary: {
			chance: 100,
			onHit(target, source, move) {
				if (source.isActive) target.addVolatile('trapped', source, move, 'trapper');
			},
		},
		target: "normal",
		type: "Steel",
		contestType: "Tough",
	},
	curseofthemoon: {
		num: 3003,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Curse of the Moon",
		shortDesc: "User turns into a Ghost/Dark type and uses Moonlight.",
		pp: 10,
		priority: 0,
		flags: {snatch: 1},
		onPrepareHit: function(target, source, move) {
		    this.attrLastMove('[still]');
		    this.add('-anim', source, "Curse", target);
		},
		onHit(pokemon) {
			this.add('-start', pokemon, 'typechange', ['Ghost', 'Dark']);
			this.useMove("Moonlight", pokemon);
		},
		target: "self",
		type: "Dark",
		zMove: {boost: {spe: 2}},
		contestType: "Tough",
	},
	draconicroar: {
		num: 3004,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		name: "Draconic Roar",
		shortDesc: "No additional effect.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1},
		secondary: null,
		target: "normal",
		type: "Dragon",
		contestType: "Beautiful",
	},
	earthenprison: {
		num: 3005,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Earthen Prison",
		shortDesc: "Applies Embargo to the target and prevents it from switching out.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
		    this.attrLastMove('[still]');
		    this.add('-anim', source, "Sand Tomb", target);
		},
		volatileStatus: 'embargo',
		condition: {
			duration: 5,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Embargo');
			},
			// Item suppression implemented in Pokemon.ignoringItem() within sim/pokemon.js
			onResidualOrder: 21,
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Embargo');
			},
		},
		secondary: {
			chance: 100,
			onHit(target, source, move) {
				if (source.isActive) target.addVolatile('trapped', source, move, 'trapper');
			},
		},
		target: "normal",
		type: "Ground",
		contestType: "Tough",
	},
	finaljudgment: {
		num: 3006,
		accuracy: 100,
		basePower: 200,
		category: "Special",
		name: "Final Judgment",
		shortDesc: "The user faints.",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
		    this.attrLastMove('[still]');
		    this.add('-anim', source, "Explosion", target);
		},
		selfdestruct: "always",
		secondary: null,
		target: "allAdjacent",
		type: "Normal",
		contestType: "Beautiful",
	},
	gravitycrush: {
		num: 3007,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Gravity Crush",
		shortDesc: "Prevents the target from switching out and sets Gravity.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
		    this.attrLastMove('[still]');
		    this.add('-anim', source, "Gravity", target);
		},
		secondary: {
			chance: 100,
			onHit(target, source, move) {
				if (source.isActive) target.addVolatile('trapped', source, move, 'trapper');
			},
		},
		target: "normal",
		type: "Dark",
		contestType: "Tough",
	},
	hauntinghowl: {
		num: 3008,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Noble Roar",
		shortDesc: "Lowers the target's Atk, Def, SpD, and Spe by 1.",
		pp: 20,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, sound: 1, bypasssub: 1},
		onPrepareHit: function(target, source, move) {
		    this.attrLastMove('[still]');
		    this.add('-anim', source, "Noble Roar", target);
		},
		boosts: {
			atk: -1,
			def: -1,
			spd: -1,
			spe: -1,
		},
		secondary: null,
		target: "normal",
		type: "Ghost",
		zMove: {boost: {spe: 1}},
		contestType: "Tough",
	},
	ionburst: {
		num: 3009,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Ion Burst",
		shortDesc: "100% chance to raise the user's SpA by 1.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
		    this.attrLastMove('[still]');
		    this.add('-anim', source, "Discharge", target);
		},
		secondary: {
			chance: 100,
			self: {
				boosts: {
					spa: 1,
				},
			},
		},
		target: "normal",
		type: "Electric",
		contestType: "Beautiful",
	},
	jeeringjab: {
		num: 3010,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		name: "Jeering Jab",
		shortDesc: "100% chance to lower the target's Defense by 1.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
		    this.attrLastMove('[still]');
		    this.add('-anim', source, "Darkest Lariat", target);
		},
		secondary: {
			chance: 100,
			boosts: {
				def: -1,
			},
		},
		target: "normal",
		type: "Dark",
		contestType: "Cute",
	},
	krakensmaw: {
		num: 3011,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Kraken's Maw",
		shortDesc: "100% chance to lower the target's Speed by 1.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, bite: 1},
		onPrepareHit: function(target, source, move) {
		    this.attrLastMove('[still]');
		    this.add('-anim', source, "Fishious Rend", target);
		},
		secondary: {
			chance: 100,
			boosts: {
				spe: -1,
			},
		},
		target: "normal",
		type: "Water",
		contestType: "Cute",
	},
	lunarburst: {
		num: 3012,
		accuracy: 100,
		basePower: 110,
		category: "Special",
		name: "Lunar Burst",
		shortDesc: "No additional effect. Hits adjacent foes.",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
		    this.attrLastMove('[still]');
		    this.add('-anim', source, "Dazzling Gleam", target);
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Fairy",
		contestType: "Beautiful",
	},
	miasma: {
		num: 3013,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Miasma",
		shortDesc: "100% chance to lower the target's SpD by 1.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
		    this.attrLastMove('[still]');
		    this.add('-anim', source, "Sludge Wave", target);
		},
		secondary: {
			chance: 100,
			boosts: {
				spd: -1,
			},
		},
		target: "normal",
		type: "Poison",
		contestType: "Cute",
	},
	neurostrike: {
		num: 3014,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		name: "Neurostrike",
		shortDesc: "Lowers the user's Defense by 1.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
		    this.attrLastMove('[still]');
		    this.add('-anim', source, "Superpower", target);
		},
		self: {
			boosts: {
				def: -1,
			},
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
		contestType: "Tough",
	},
	oasis: {
		num: 3015,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Oasis",
		shortDesc: "User restores 1/2 its max HP; 2/3 in Sun.",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		onPrepareHit: function(target, source, move) {
		    this.attrLastMove('[still]');
		    this.add('-anim', source, "Shore Up", target);
		},
		onHit(pokemon) {
			let factor = 0.5;
			if (this.field.isWeather('sunnyday')) {
				factor = 0.667;
			}
			const success = !!this.heal(this.modify(pokemon.maxhp, factor));
			if (!success) {
				this.add('-fail', pokemon, 'heal');
				return this.NOT_FAIL;
			}
			return success;
		},
		secondary: null,
		target: "self",
		type: "Water",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Beautiful",
	},
	paralyzingglare: {
		num: 3016,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Paralyzing Glare",
		shortDesc: "Changes the target's type to Rock and paralyzes it.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, allyanim: 1},
		onPrepareHit: function(target, source, move) {
		    this.attrLastMove('[still]');
		    this.add('-anim', source, "Glare", target);
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
		target: "normal",
		type: "Normal",
		zMove: {boost: {spa: 1}},
		contestType: "Cute",
	},
	qiblast: {
		num: 3017,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		name: "Focus Blast",
		shortDesc: "10% chance to lower the target's Special Defense by 1.",
		pp: 10,
		priority: 0,
		flags: {bullet: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
		    this.attrLastMove('[still]');
		    this.add('-anim', source, "Aura Sphere", target);
		},
		secondary: {
			chance: 10,
			boosts: {
				spd: -1,
			},
		},
		target: "normal",
		type: "Fighting",
		contestType: "Cool",
	},
	rampage: {
		num: 3018,
		accuracy: 85,
		basePower: 120,
		category: "Physical",
		name: "Rampage",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
		    this.attrLastMove('[still]');
		    this.add('-anim', source, "Thrash", target);
		},
		recoil: [1, 8],
		secondary: null,
		target: "normal",
		type: "Rock",
		contestType: "Tough",
	},
	sonicburst: {
		num: 3019,
		accuracy: true,
		basePower: 80,
		category: "Special",
		name: "Sonic Burst",
		shortDesc: "Usually goes first. Never misses.",
		pp: 10,
		priority: 2,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
		    this.attrLastMove('[still]');
		    this.add('-anim', source, "Electro Ball", target);
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Cool",
	},
	taigablaze: {
		num: 3020,
		accuracy: 100,
		basePower: 110,
		category: "Special",
		name: "Taiga Blaze",
		shortDesc: "30% chance to burn the target.",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, defrost: 1},
		onPrepareHit: function(target, source, move) {
		    this.attrLastMove('[still]');
		    this.add('-anim', source, "Ice Burn", target);
		},
		thawsTarget: true,
		secondary: {
			chance: 30,
			status: 'brn',
		},
		target: "normal",
		type: "Ice",
		contestType: "Tough",
	},
	umbralburst: {
		num: 3021,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Umbral Burst",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
		    this.attrLastMove('[still]');
		    this.add('-anim', source, "Aura Sphere", target);
		},
		secondary: {
			chance: 100,
			boosts: {
				spa: -1,
			},
		},
		target: "normal",
		type: "Dark",
		contestType: "Cool",
	},
	vainglory: {
		num: 3022,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Vainglory",
		pp: 40,
		priority: 0,
		flags: {snatch: 1},
		onPrepareHit: function(target, source, move) {
		    this.attrLastMove('[still]');
		    this.add('-anim', source, "Swords Dance", target);
		},
		onHit(target) {
			if (target.hasType('Fighting')) return false;
			if (!target.addType('Fighting')) return false;
			this.add('-start', target, 'typeadd', 'Fighting', '[from] move: Fighting');
		},
		secondary: null,
		target: "self",
		type: "Normal",
		zMove: {boost: {atk: 1, def: 1, spa: 1, spd: 1, spe: 1}},
		contestType: "Cute",
	},
	weepingcut: {
		num: 3023,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		name: "Weeping Cut",
		shortDesc: "100% chance to lower the target's Defense by 1.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
		    this.attrLastMove('[still]');
		    this.add('-anim', source, "Leaf Blade", target);
		},
		secondary: {
			chance: 100,
			boosts: {
				def: -1,
			},
		},
		target: "normal",
		type: "Grass",
		contestType: "Cute",
	},
	xiscreech: {
		num: 3024,
		accuracy: true,
		basePower: 60,
		category: "Special",
		name: "Xi Screech",
		shortDesc: "Never misses. Lowers the target's Atk and SpA by 1.",
		pp: 20,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, sound: 1, bypasssub: 1},
		onPrepareHit: function(target, source, move) {
		    this.attrLastMove('[still]');
		    this.add('-anim', source, "Noble Roar", target);
		},
		secondary: {
			chance: 100,
			boosts: {
				atk: -1,
				spa: -1,
			},
		},
		target: "normal",
		type: "Dragon",
		contestType: "Tough",
	},
	yetisfury: {
		num: 3020,
		accuracy: 80,
		basePower: 100,
		category: "Physical",
		name: "Yeti's Fury",
		shortDesc: "20% chance to lower the target's Defense by 1.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1},
		onPrepareHit: function(target, source, move) {
		    this.attrLastMove('[still]');
		    this.add('-anim', source, "Ice Hammer", target);
		},
		thawsTarget: true,
		secondary: {
			chance: 20,
			boosts: {
				def: -1,
			},
		},
		target: "normal",
		type: "Ice",
		contestType: "Tough",
	},
	zombiebite: {
		num: 435,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Zombie Bite",
		pp: 10,
		priority: 0,
		flags: {bite: 1, contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
		    this.attrLastMove('[still]');
		    this.add('-anim', source, "Poison Fang", target);
		},
		secondary: {
			chance: 30,
			status: 'par',
		},
		target: "normal",
		type: "Poison",
		contestType: "Beautiful",
	},
};