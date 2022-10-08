woodcrash: {
num: 10000,
accuracy: 100,
basePower: 95,
category: "Physical",
name: "Wood Crash",
pp: 10,
priority: 0,
flags: {contact: 1,protect: 1, mirror: 1},
self:{
			onHit(source) {
				source.side.foe.addSideCondition('spikes');
			},
		},
target: "normal",
type: "Grass",
contestType: "Clever",
 },
burstclaws: {
		num: 10001,
		accuracy: 100,
		basePower: 95,
		category: "Physical",
		defensiveCategory: "Special",
		name: "Burst Claws",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Fire",
		contestType: "Cool",
	},
waterpressure: {
		num: 10002,
		accuracy: 100,
		basePower: 95,
		category: "Special",
		name: "Water Pressure",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			volatileStatus: 'flinch',
		},
		target: "normal",
		type: "Water",
		contestType: "Beautiful",
	},

hunt: {
		num: 10003,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Hunt",
		pp: 5,
		priority: 0,
		flags: {snatch: 1},
		boosts: {
			def: -1,
			spd: -1,
			atk: 1,
			spa: 1,
		},
self: {
			onHit(source) {
				for (const pokemon of source.side.active) {
					pokemon.addVolatile('hunt');
				}
			},
		},
		condition: {
			noCopy: true,
			onStart(target, source, effect) {
				this.effectData.layers = 1;
				if (!['imposter', 'psychup', 'transform'].includes(effect?.id)) {
					this.add('-start', target, 'move: Hunt');
				}
			},
			onRestart(target, source, effect) {
				if (this.effectData.layers >= 3) return false;
				this.effectData.layers++;
				if (!['imposter', 'psychup', 'transform'].includes(effect?.id)) {
					this.add('-start', target, 'move: Hunt');
				}
			},
			onModifyCritRatio(critRatio) {
				return critRatio + this.effectData.layers;
			},
		},
		secondary: null,
		target: "self",
		type: "Normal",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Cool",
	},
deepcrunch: {
		num: 10004,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Deep Crunch",
		pp: 15,
		priority: 0,
		flags: {bite: 1, contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 20,
			boosts: {
				def: -1,
			},
		},
		target: "normal",
		type: "Water",
		contestType: "Tough",
	},
fireworks: {
		num: 10005,
		accuracy: 100,
		basePower: 85,
		category: "Special",
		name: "Fire Works",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 50,
			boosts: { spd: -1},
		},
		target: "allAdjacent",
		type: "Fire",
		contestType: "Beautiful",
	},
windblade: {
		num: 10006,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Wind Blade",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, distance: 1},
self: {
			onHit(source) {
				for (const pokemon of source.side.active) {
					pokemon.addVolatile('gmaxchistrike');
				}
			},
		},
		condition: {
			noCopy: true,
			onStart(target, source, effect) {
				this.effectData.layers = 1;
				if (!['imposter', 'psychup', 'transform'].includes(effect?.id)) {
					this.add('-start', target, 'move: Wind Blade');
				}
			},
			onRestart(target, source, effect) {
				if (this.effectData.layers >= 3) return false;
				this.effectData.layers++;
				if (!['imposter', 'psychup', 'transform'].includes(effect?.id)) {
					this.add('-start', target, 'move: Wind Blade');
				}
			},
			onModifyCritRatio(critRatio) {
				return critRatio + this.effectData.layers;
			},
		},
		secondary: null,
		target: "any",
		type: "Flying",
		contestType: "Cool",
	},
sharpbranches: {
		num: 10007,
		accuracy: 100,
		basePower: 110,
		category: "Physical",
		name: "Sharp Branches",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 10,
			self: {
				boosts: {
					atk: 1,
				},
			},
		},
		target: "normal",
		type: "Grass",
		contestType: "Cool",
	},
trihornattack: {
		num: 10008,
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		name: "Tri-Horn Attack",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		recoil: [33, 100],
		secondary: null,
		target: "normal",
		type: "Steel",
		contestType: "Tough",
	},
snowslam: {
		num: 10009,
		accuracy: 90,
		basePower: 120,
		category: "Physical",
		name: "Snow Slam",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 10,
			status: 'frz',
		},

		target: "allAdjacentFoes",
		type: "Ice",
		contestType: "Beautiful",
	},
bullhorns: {
		num: 10010,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Bull Horns",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 10,
			volatileStatus: 'flinch',
		},
		target: "normal",
		type: "Ground",
		contestType: "Tough",
	},
sweetwater: {
		num: 10011,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Sweet Water",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, heal: 1},
		drain: [1, 2],
		secondary: null,
		target: "allAdjacentFoes",
		type: "Water",
		contestType: "Clever",
	},
drinkjuice: {
		num: 10012,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Drink Juice",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		heal: [1, 2],
onHit(pokemon) {
			if (['', 'slp', 'frz'].includes(pokemon.status)) return false;
			pokemon.cureStatus();
		},
		secondary: null,
		target: "self",
		type: "Bug",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Cute",
	},
dreampunch: {
		num: 10013,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Dream Punch",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1},
		secondary: {
			chance: 10,
			status: 'slp',
		},
		target: "normal",
		type: "Psychic",
		contestType: "Beautiful",
	},
sharpbone: {
		num: 10014,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Sharp Bone",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			status: 'tox',
		},
		target: "normal",
		type: "Ground",
		contestType: "Clever",
	},
	aircurrents: {
		num: 10015,
		accuracy: 90,
		basePower: 110,
		category: "Special",
		name: "Air Currents",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		self: {
			onHit(source) {
				for (const pokemon of source.side.active) {
					this.boost({spe: 2}, pokemon);
				}
			},
		},
		target: "adjacentFoe",
		type: "Flying",
		contestType: "Cool",
	},
cleaning: {
		num: 10016,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Cleaning",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		onHit(pokemon) {
			let factor = 0.5;
			if (this.field.isTerrain('mistyterrain')) {
				factor = 0.667;
			}
			return !!this.heal(this.modify(pokemon.maxhp, factor));
		},
		secondary: null,
		target: "self",
		type: "Fairy",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Beautiful",
	},
sweethoney: {
		num: 10017,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Sweet Honey",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		onHit(pokemon) {
			let factor = 0.5;
			if (this.field.isTerrain('grassyterrain')) {
				factor = 0.667;
			}
			return !!this.heal(this.modify(pokemon.maxhp, factor));
		},
		secondary: null,
		target: "self",
		type: "Bug",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "cute",
	},
exopunch: {
		num: 10018,
		accuracy: 90,
		basePower: 100,
		category: "Physical",
		name: "Exo-Punch",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1},
		secondary: {
			chance: 50,
			self: {
				boosts: {
					atk: 1,
				},
			},
		},
		target: "normal",
		type: "Bug",
		contestType: "Cool",
	},
nutrientdrain: {
		num: 10019,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Nutrient Drain",
		pp: 10,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, heal: 1},
		onHit(target, source) {
			if (target.boosts.spa === -6) return false;
			const spa = target.getStat('spa', false, true);
			const success = this.boost({spa: -1}, target, source, null, false, true);
			return !!(this.heal(spa, source, target) || success);
		},
		secondary: null,
		target: "normal",
		type: "Grass",
		zMove: {boost: {def: 1}},
		contestType: "Cute",
	},
elastictail: {
		num: 10020,
		accuracy: 85,
		basePower: 120,
		category: "Physical",
		name: "Elastic Tail",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			boosts: {
				def: -1,
			},
		},
		target: "allAdjacentFoes",
		type: "Bug",
		contestType: "Tough",
	},
dualscissors: {
		num: 10021,
		accuracy: 90,
		basePower: 95,
		category: "Physical",
		name: "Dual Scissors",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 50,
			self: {
				boosts: {
					atk: 1,
				},
			},
		},
		target: "normal",
		type: "Dark",
		contestType: "Cool",
	},
timeout: {
		num: 10022,
		accuracy: 100,
		basePower: 250,
		category: "Physical",
		name: "Time Out",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		selfdestruct: "always",
		secondary: null,
		target: "allAdjacent",
		type: "Fire",
		contestType: "Beautiful",
	},
leechclaws: {
		num: 10023,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Leech Claws",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, heal: 1},
		drain: [1, 2],
		secondary: null,
		target: "normal",
		type: "Steel",
		contestType: "Tough",
	},
outofcontrol: {
		num: 10024,
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		name: "Out of Control",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		self: {
			boosts: {
				def: -1,
				spd: -1,
			},
		},
		secondary: null,
		target: "normal",
		type: "Dark",
		contestType: "Tough",
	},
doubleimpact: {
		num: 10025,
		accuracy: 100,
		basePower: 65,
		category: "Physical",
		name: "Double Impact",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		multihit: 2,
		secondary: null,
		target: "normal",
		type: "Normal",
		zMove: {basePower: 140},
		maxMove: {basePower: 120},
		contestType: "Cool",
	},
souldrain: {
		num: 10026,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		name: "Soul Drain",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, heal: 1},
		drain: [1, 2],
		secondary: null,
		target: "normal",
		type: "Ghost",
		contestType: "Clever",
	},