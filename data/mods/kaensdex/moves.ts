export const Moves: {[k: string]: ModdedMoveData} = {

	woodcrash: {
		num: 10000,
		accuracy: 100,
		basePower: 95,
		category: "Physical",
		name: "Wood Crash",
		shortDesc: "Set Spikes on hit.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		self: {
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
		shortDesc: "Hits Special Defense.",
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
		shortDesc: "30% chance to flinch target.",
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
		shortDesc: "Rise Atk, SpA and Critical Hit Ratio 1 stage.",
		pp: 5,
		priority: 0,
		flags: {snatch: 1},
		boosts: {
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
				this.effectState.layers = 1;
				if (!['imposter', 'psychup', 'transform'].includes(effect?.id)) {
					this.add('-start', target, 'move: Hunt');
				}
			},
			onRestart(target, source, effect) {
				if (this.effectState.layers >= 3) return false;
				this.effectState.layers++;
				if (!['imposter', 'psychup', 'transform'].includes(effect?.id)) {
					this.add('-start', target, 'move: Hunt');
				}
			},
			onModifyCritRatio(critRatio) {
				return critRatio + this.effectState.layers;
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
		shortDesc: "20% chance to drop Def. Biting Move.",
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
		shortDesc: "50% chance to drop SpD.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 50,
			boosts: {spd: -1},
		},
		target: "allAdjacent",
		type: "Fire",
		contestType: "Beautiful",
	},
	windblade: {
		num: 10006,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		name: "Wind Blade",
		shortDesc: "Rises Critical Hit Ratio 1 stage on hit.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, distance: 1, slicing: 1, wind: 1},
		self: {
			onHit(source) {
				for (const pokemon of source.side.active) {
					pokemon.addVolatile('windblade');
				}
			},
		},
		condition: {
			noCopy: true,
			onStart(target, source, effect) {
				this.effectState.layers = 1;
				if (!['imposter', 'psychup', 'transform'].includes(effect?.id)) {
					this.add('-start', target, 'move: Wind Blade');
				}
			},
			onRestart(target, source, effect) {
				if (this.effectState.layers >= 3) return false;
				this.effectState.layers++;
				if (!['imposter', 'psychup', 'transform'].includes(effect?.id)) {
					this.add('-start', target, 'move: Wind Blade');
				}
			},
			onModifyCritRatio(critRatio) {
				return critRatio + this.effectState.layers;
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
		shortDesc: "10% chance to rise Atk 1 stage.",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, slicing: 1},
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
		shortDesc: "Has 33% recoil.",
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
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		name: "Snow Slam",
		shortDesc: "10% chance to freeze foe(s).",
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
		basePower: 120,
		category: "Physical",
		name: "Bull Horns",
		shortDesc: "10% chance to flinch target.",
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
		basePower: 70,
		category: "Special",
		name: "Sweet Water",
		shortDesc: "User recovers 50% of the damage dealt.",
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
		shortDesc: "Heals by 50% HP and cures its Burn, Paralysis or Poison.",
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
		shortDesc: "30% chance to put target to sleep.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1},
		secondary: {
			chance: 30,
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
		shortDesc: "30% chance to badly poison the target.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, slicing: 1},
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
		shortDesc: "Raises the user's and its ally's Speed by two stages.",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, wind: 1},
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
		shortDesc: "User restores 1/2 its max HP; 2/3 in Misty Terrain.",
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
		shortDesc: "User restores 1/2 its max HP; 2/3 in Grassy Terrain.",
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
		shortDesc: "50% chance to rise Atk 1 stage. Punching move.",
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
		shortDesc: "User heals HP=target's SpA stat. Lowers SpA by 1.",
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
		shortDesc: "50% chance to drop Defense.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 50,
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
		shortDesc: "Raises Atk 1 stage.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, slicing: 1},
		secondary: {
			chance: 100,
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
		shortDesc: "The user faints.",
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
		shortDesc: "User recovers 50% of the damage dealt.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, heal: 1, slicing: 1},
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
		shortDesc: "Lowers the user's Defense and SpD by 1 stage.",
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
		shortDesc: "Hits twice.",
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
		shortDesc: "User recovers 50% of the damage dealt.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, heal: 1},
		drain: [1, 2],
		secondary: null,
		target: "normal",
		type: "Ghost",
		contestType: "Clever",
	},
	acidjuice: {
		num: 10027,
		accuracy: 100,
		basePower: 0,
		damage: 'level',
		category: "Special",
		name: "Acid Juice",
		shortDesc: "Deal damage equal to the user's level.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Grass",
		contestType: "Clever",
	},

	saberfangs: {
		num: 10028,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Saber Fangs",
		shortDesc: "Ignores the target's ability. Biting Move.",
		pp: 15,
		priority: 0,
		flags: {bite: 1, contact: 1, protect: 1, mirror: 1},
		ignoreAbility: true,
		secondary: null,
		target: "normal",
		type: "Rock",
		contestType: "Tough",
	},

	meteorimpact: {
		num: 10029,
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		name: "Meteor Impact",
		shortDesc: "1/3 recoil. 10% chance to burn the target.",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, defrost: 1},
		recoil: [33, 100],
		secondary: {
			chance: 10,
			status: 'brn',
		},
		target: "normal",
		type: "Rock",
		contestType: "Cool",
	},

	gravitationalwave: {
		num: 10030,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		name: "Gravitational Wave",
		shortDesc: "Drops Speed by 1 stage.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 100,
			boosts: {
				spe: -1,
			},
		},
		target: "allAdjacentFoes",
		type: "Rock",
		contestType: "Beautiful",
	},

	sharpblade: {
		num: 10031,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Sharp Blade",
		shortDesc: "High critical hit ratio. Slicing move.",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, slicing: 1},
		critRatio: 2,
		secondary: null,
		target: "normal",
		type: "Steel",
		contestType: "Cool",
	},

	maliciousprogram: {
		num: 10032,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Malicious Program",
		shortDesc: "Steals target's boosts before dealing damage.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, authentic: 1},
		stealsBoosts: true,
		// Boost stealing implemented in scripts.js
		secondary: null,
		target: "normal",
		type: "Electric",
		contestType: "Cool",
	},

	draconicaura: {
		num: 10033,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		name: "Draconic Aura",
		shortDesc: "Sets Safeguard. Pulse move.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, pulse: 1},
		self: {
			sideCondition: 'safeguard',
		},
		secondary: null,
		target: "normal",
		type: "Dragon",
		contestType: "Cool",
	},

	earthforce: {
		num: 10034,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Earth Force",
		shortDesc: "Sets Gravity.",
		pp: 10,
		priority: 0,
		flags: {nonsky: 1, protect: 1, mirror: 1},
		pseudoWeather: 'gravity',
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasAbility('persistent')) {
					this.add('-activate', source, 'ability: Persistent', effect);
					return 7;
				}
				return 5;
			},
			onStart() {
				this.add('-fieldstart', 'move: Gravity');
				for (const pokemon of this.getAllActive()) {
					let applies = false;
					if (pokemon.removeVolatile('bounce') || pokemon.removeVolatile('fly')) {
						applies = true;
						this.queue.cancelMove(pokemon);
						pokemon.removeVolatile('twoturnmove');
					}
					if (pokemon.volatiles['skydrop']) {
						applies = true;
						this.queue.cancelMove(pokemon);

						if (pokemon.volatiles['skydrop'].source) {
							this.add('-end', pokemon.volatiles['twoturnmove'].source, 'Sky Drop', '[interrupt]');
						}
						pokemon.removeVolatile('skydrop');
						pokemon.removeVolatile('twoturnmove');
					}
					if (pokemon.volatiles['magnetrise']) {
						applies = true;
						delete pokemon.volatiles['magnetrise'];
					}
					if (pokemon.volatiles['telekinesis']) {
						applies = true;
						delete pokemon.volatiles['telekinesis'];
					}
					if (applies) this.add('-activate', pokemon, 'move: Gravity');
				}
			},
			onModifyAccuracy(accuracy) {
				if (typeof accuracy !== 'number') return;
				return accuracy * 5 / 3;
			},
			onDisableMove(pokemon) {
				for (const moveSlot of pokemon.moveSlots) {
					if (this.dex.moves.get(moveSlot.id).flags['gravity']) {
						pokemon.disableMove(moveSlot.id);
					}
				}
			},
			// groundedness implemented in battle.engine.js:BattlePokemon#isGrounded
			onBeforeMovePriority: 6,
			onBeforeMove(pokemon, target, move) {
				if (move.flags['gravity']) {
					this.add('cant', pokemon, 'move: Gravity', move);
					return false;
				}
			},
			onResidualOrder: 22,
			onEnd() {
				this.add('-fieldend', 'move: Gravity');
			},
		},
		secondary: null,
		target: "normal",
		type: "Ground",
		contestType: "Clever",
	},

	lovearrow: {
		num: 10035,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Love Arrow",
		shortDesc: "Makes the opponent fall in love. 10% Confusion chance.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		volatileStatus: 'attract',
		condition: {
			noCopy: true, // doesn't get copied by Baton Pass
			onStart(pokemon, source, effect) {
				if (effect.id === 'cutecharm') {
					this.add('-start', pokemon, 'Attract', '[from] ability: Cute Charm', '[of] ' + source);
				} else if (effect.id === 'destinyknot') {
					this.add('-start', pokemon, 'Attract', '[from] item: Destiny Knot', '[of] ' + source);
				} else {
					this.add('-start', pokemon, 'Attract');
				}
			},
			onUpdate(pokemon) {
				if (this.effectState.source && !this.effectState.source.isActive && pokemon.volatiles['attract']) {
					this.debug('Removing Attract volatile on ' + pokemon);
					pokemon.removeVolatile('attract');
				}
			},
			onBeforeMovePriority: 2,
			onBeforeMove(pokemon, target, move) {
				this.add('-activate', pokemon, 'move: Attract', '[of] ' + this.effectState.source);
				if (this.randomChance(1, 2)) {
					this.add('cant', pokemon, 'Attract');
					return false;
				}
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Attract', '[silent]');
			},
		},
		secondary: {
			chance: 10,
			volatileStatus: 'confusion',
		},
		target: "normal",
		type: "Fairy",
		contestType: "Beautiful",
	},

	penguindance: {
		num: 10036,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Penguin Dance",
		shortDesc: "Def -1, +1 SpA, +1SpD and +2Spe. Dance Move.",
		pp: 5,
		priority: 0,
		flags: {snatch: 1, dance: 1},
		boosts: {
			def: -1,
			spa: 1,
			spd: 1,
			spe: 2,
		},
		secondary: null,
		target: "self",
		type: "Ice",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Beautiful",
	},

	floorcleaning: {
		num: 10037,
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		name: "Floor Cleaning",
		shortDesc: "Free user from hazards/bind/Leech Seed; +1 SpD.",
		pp: 40,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onAfterHit(target, pokemon) {
			if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
				this.add('-end', pokemon, 'Leech Seed', '[from] move: Rapid Spin', '[of] ' + pokemon);
			}
			const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge', 'electricspores', 'icetrap'];
			for (const condition of sideConditions) {
				if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
					this.add('-sideend', pokemon.side, this.dex.conditions.get(condition).name, '[from] move: Floor Cleaning', '[of] ' + pokemon);
				}
			}
			if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
				pokemon.removeVolatile('partiallytrapped');
			}
		},
		onAfterSubDamage(damage, target, pokemon) {
			if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
				this.add('-end', pokemon, 'Leech Seed', '[from] move: Rapid Spin', '[of] ' + pokemon);
			}
			const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge', 'electricspores', 'icetrap'];
			for (const condition of sideConditions) {
				if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
					this.add('-sideend', pokemon.side, this.dex.conditions.get(condition).name, '[from] move: Floor Cleaning', '[of] ' + pokemon);
				}
			}
			if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
				pokemon.removeVolatile('partiallytrapped');
			}
		},
		secondary: {
			chance: 100,
			self: {
				boosts: {
					spd: 1,
				},
			},
		},
		target: "normal",
		type: "Water",
		contestType: "Cool",
	},

	dreadfulscreech: {
		num: 10038,
		accuracy: 100,
		basePower: 60,
		category: "Special",
		name: "Dreadful Screech",
		shortDesc: "Usually goes first. Sound Move.",
		pp: 30,
		priority: 1,
		flags: {protect: 1, mirror: 1, sound: 1},
		secondary: null,
		target: "normal",
		type: "Ghost",
		contestType: "Cool",
	},

	flammabletoxin: {
		num: 10039,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Flammable Toxin",
		shortDesc: "30% poison/tox/burn. 2x power if target is already burned.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1},
		onBasePower(basePower, pokemon, target) {
			if (target.status === 'brn') {
				return this.chainModify(2);
			}
		},
		secondary: {
			chance: 30,
			onHit(target, source) {
				const result = this.random(3);
				if (result === 0) {
					target.trySetStatus('brn', source);
				} else if (result === 1) {
					target.trySetStatus('psn', source);
				} else {
					target.trySetStatus('tox', source);
				}
			},
		},
		target: "normal",
		type: "Poison",
		contestType: "Beautiful",
	},

	mindshock: {
		num: 10040,
		accuracy: 100,
		basePower: 60,
		basePowerCallback(pokemon, target, move) {
			if (target.status || target.hasAbility('comatose')) return move.basePower * 2;
			return move.basePower;
		},
		category: "Special",
		name: "Mind Shock",
		shortDesc: "30% paralyze. 2x power if target is already statused.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			status: 'par',
		},
		target: "normal",
		type: "Psychic",
	},

	fightingspirit: {
		num: 10041,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Fighting Spirit",
		shortDesc: "Burns the user. +1SpD, +1Spe, +1Acc.",
		pp: 10,
		priority: 0,
		flags: {snatch: 1},
		onTryMove(pokemon) {
			if (pokemon.status === 'slp' || pokemon.hasAbility('comatose')) {
				this.add('-fail', pokemon);
				return null;
			}
		},
		onHit(target, source, move) {
			if (!target.setStatus('brn', source, move)) return false;
		},
		boosts: {
			spd: 1,
			spe: 1,
			accuracy: 1,
		},
		secondary: null,
		target: "self",
		type: "Fighting",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Cool",
	},

	airvibration: {
		num: 10042,
		accuracy: 100,
		basePower: 40,
		category: "Special",
		name: "Air Vibration",
		shortDesc: "Usually goes first. Sound and Wind move.",
		pp: 10,
		priority: 1,
		flags: {protect: 1, mirror: 1, distance: 1, sound: 1, wind: 1},
		secondary: null,
		target: "any",
		type: "Flying",
		contestType: "Tough",
	},

	passingtheball: {
		num: 10043,
		accuracy: 90,
		basePower: 20,
		basePowerCallback(pokemon, target, move) {
			return 20 * move.hit;
		},
		category: "Physical",
		name: "Passing the Ball",
		shortDesc: "Hits 3 times. Power doubles on each hit. Bullet move.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, bullet: 1},
		multihit: 3,
		multiaccuracy: true,
		secondary: null,
		target: "normal",
		type: "Fighting",
		zMove: {basePower: 120},
		maxMove: {basePower: 140},
	},

	blazingspin: {
		num: 10044,
		accuracy: 100,
		basePower: 30,
		category: "Special",
		name: "Blazing Spin",
		shortDesc: "Burn foes, frees user from hazards/bind/leech.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onAfterHit(target, pokemon) {
			if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
				this.add('-end', pokemon, 'Leech Seed', '[from] move: Blazing Spin', '[of] ' + pokemon);
			}
			const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge', 'electricspores', 'icetrap'];
			for (const condition of sideConditions) {
				if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
					this.add('-sideend', pokemon.side, this.dex.conditions.get(condition).name, '[from] move: Blazing Spin', '[of] ' + pokemon);
				}
			}
			if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
				pokemon.removeVolatile('partiallytrapped');
			}
		},
		onAfterSubDamage(damage, target, pokemon) {
			if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
				this.add('-end', pokemon, 'Leech Seed', '[from] move: Blazing Spin', '[of] ' + pokemon);
			}
			const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge', 'electricspores', 'icetrap'];
			for (const condition of sideConditions) {
				if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
					this.add('-sideend', pokemon.side, this.dex.conditions.get(condition).name, '[from] move: Blazing Spin', '[of] ' + pokemon);
				}
			}
			if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
				pokemon.removeVolatile('partiallytrapped');
			}
		},
		secondary: {
			chance: 100,
			status: 'brn',
		},
		target: "allAdjacentFoes",
		type: "Fire",
	},

	fearthenight: {
		num: 10045,
		accuracy: 85,
		basePower: 100,
		category: "Special",
		name: "Fear the Night",
		shortDesc: "100% chance to lower the target's Atk by 2.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 100,
			boosts: {
				atk: -2,
			},
		},
		target: "normal",
		type: "Dark",
		contestType: "Cool",
	},

	armwhip: {
		num: 10046,
		accuracy: 100,
		basePower: 60,
		onModifyPriority(priority, source, target, move) {
			if (!pokemon.item) {
				return priority + 1;
			}
		},
		category: "Physical",
		name: "Arm Whip",
		shortDesc: "+1 priority if the user has no held item.",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: null,
		target: "any",
		type: "Grass",
		contestType: "Cool",
	},

	lovescent: {
		num: 10047,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Love Scent",
		shortDesc: "Badly poisons the target. It also falls in love. Wind move.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, authentic: 1, wind: 1},
		status: 'tox',
		volatileStatus: 'attract',
		condition: {
			noCopy: true, // doesn't get copied by Baton Pass
			onStart(pokemon, source, effect) {
				if (!(pokemon.gender === 'M' && source.gender === 'F') && !(pokemon.gender === 'F' && source.gender === 'M')) {
					this.debug('incompatible gender');
					return false;
				}
				if (!this.runEvent('Attract', pokemon, source)) {
					this.debug('Attract event failed');
					return false;
				}

				if (effect.id === 'cutecharm') {
					this.add('-start', pokemon, 'Attract', '[from] ability: Cute Charm', '[of] ' + source);
				} else if (effect.id === 'destinyknot') {
					this.add('-start', pokemon, 'Attract', '[from] item: Destiny Knot', '[of] ' + source);
				} else {
					this.add('-start', pokemon, 'Attract');
				}
			},
			onUpdate(pokemon) {
				if (this.effectState.source && !this.effectState.source.isActive && pokemon.volatiles['attract']) {
					this.debug('Removing Attract volatile on ' + pokemon);
					pokemon.removeVolatile('attract');
				}
			},
			onBeforeMovePriority: 2,
			onBeforeMove(pokemon, target, move) {
				this.add('-activate', pokemon, 'move: Attract', '[of] ' + this.effectState.source);
				if (this.randomChance(1, 2)) {
					this.add('cant', pokemon, 'Attract');
					return false;
				}
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Attract', '[silent]');
			},
		},
		secondary: null,
		target: "normal",
		type: "Poison",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Cute",
	},

	replaceableteeth: {
		num: 10048,
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		name: "Replaceable Teeth",
		shortDesc: "Set Steel hazards. Biting move.",
		pp: 10,
		priority: 0,
		flags: {bite: 1, contact: 1, protect: 1},
		self: {
			onHit(source) {
				source.side.foe.addSideCondition('gmaxsteelsurge');
			},
		},
		secondary: null,
		target: "normal",
		type: "Steel",
		contestType: "Cool",
	},

	draconicrelease: {
		num: 10049,
		accuracy: 100,
		basePower: 85,
		basePowerCallback(pokemon, target, move) {
			if (target.status === 'par') return move.basePower * 2;
			return move.basePower;
		},
		category: "Physical",
		name: "Draconic Release",
		shortDesc: "Power doubles if target is paralyzed, and heals it.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onHit(target) {
			if (target.status === 'par') target.cureStatus();
		},
		secondary: null,
		target: "normal",
		type: "Dragon",
		contestType: "Tough",
	},

	spidertrap: {
		num: 10050,
		accuracy: 100,
		basePower: 95,
		category: "Physical",
		name: "Spider Trap",
		shortDesc: "Sets Sticky Web.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		self: {
			onHit(source) {
				source.side.foe.addSideCondition('stickyweb');
			},
		},
		secondary: {}, // allows sheer force to trigger
		target: "normal",
		type: "Bug",
	},

	misfortune: {
		num: 10051,
		accuracy: 100,
		basePower: 110,
		category: "Special",
		name: "Misfortune",
		shortDesc: "Hits a turn after being used.",
		pp: 10,
		priority: 0,
		flags: {},
		ignoreImmunity: true,
		isFutureMove: true,
		onTry(source, target) {
			if (!target.side.addSlotCondition(target, 'futuremove')) return false;
			Object.assign(target.side.slotConditions[target.position]['futuremove'], {
				duration: 2,
				move: 'misfortune',
				source: source,
				moveData: {
					id: 'misfortune',
					name: "Misfortune",
					accuracy: 100,
					basePower: 110,
					category: "Special",
					priority: 0,
					flags: {},
					ignoreImmunity: false,
					effectType: 'Move',
					isFutureMove: true,
					type: 'Dragon',
				},
			});
			this.add('-start', source, 'move: Misfortune');
			return null;
		},
		secondary: null,
		target: "normal",
		type: "Dragon",
		contestType: "Clever",
	},

	coldmedicine: {
		num: 10052,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Cold Medicine",
		shortDesc: "User restores 1/2 its max HP; 2/3 in Hail.",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		onHit(pokemon) {
			let factor = 0.5;
			if (this.field.isWeather('hail')) {
				factor = 0.667;
			}
			return !!this.heal(this.modify(pokemon.maxhp, factor));
		},
		secondary: null,
		target: "self",
		type: "Ice",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Beautiful",
	},

	alienabduction: {
		num: 10053,
		accuracy: 100,
		basePower: 85,
		category: "Special",
		name: "Alien Abduction",
		shortDesc: "User recovers 50% of the damage dealt.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, heal: 1},
		drain: [1, 2],
		secondary: null,
		target: "normal",
		type: "Steel",
		contestType: "Clever",
	},

	icebreakinghug: {
		num: 10054,
		accuracy: 100,
		basePower: 90,
		basePowerCallback(pokemon, target, move) {
			if (target.status === 'frz') return move.basePower * 2;
			return move.basePower;
		},
		category: "Physical",
		name: "Ice-Breaking Hug",
		shortDesc: "Power doubles if target is frozen, and heals it.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onHit(target) {
			if (target.status === 'frz') target.cureStatus();
		},
		secondary: null,
		target: "normal",
		type: "Dark",
		contestType: "Tough",
	},

	focusedmind: {
		num: 10055,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Focused Mind",
		shortDesc: "+1SpD, +1Spe, +1Acc.",
		pp: 15,
		priority: 0,
		flags: {snatch: 1},
		boosts: {
			spd: 1,
			spe: 1,
			accuracy: 1,
		},
		secondary: null,
		target: "self",
		type: "Psychic",
		zMove: {boost: {atk: 1}},
		contestType: "Cute",
	},

	wonderfulservice: {
		num: 10056,
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		name: "Wonderful Service",
		shortDesc: "Sets Wonder Room.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		pseudoWeather: 'wonderroom',
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasAbility('persistent')) {
					this.add('-activate', source, 'ability: Persistent', effect);
					return 7;
				}
				return 5;
			},
			onStart(side, source) {
				this.add('-fieldstart', 'move: Wonder Room', '[of] ' + source);
			},
			// Swapping defenses implemented in sim/pokemon.js:Pokemon#calculateStat and Pokemon#getStat
			onResidualOrder: 24,
			onEnd() {
				this.add('-fieldend', 'move: Wonder Room');
			},
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
		contestType: "Clever",
	},

	incredibleservice: {
		num: 10057,
		accuracy: 100,
		basePower: 60,
		category: "Special",
		name: "Incredible Service",
		shortDesc: "Sets Magic Room.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		pseudoWeather: 'magicroom',
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasAbility('persistent')) {
					this.add('-activate', source, 'ability: Persistent', effect);
					return 7;
				}
				return 5;
			},
			onStart(target, source) {
				this.add('-fieldstart', 'move: Magic Room', '[of] ' + source);
			},
			// Item suppression implemented in Pokemon.ignoringItem() within sim/pokemon.js
			onResidualOrder: 25,
			onEnd() {
				this.add('-fieldend', 'move: Magic Room', '[of] ' + this.effectState.source);
			},
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
		contestType: "Clever",
	},

	call: {
		num: 10058,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Call",
		shortDesc: "Curses the target. Requires 1/4 of the user's HP.",
		pp: 10,
		priority: 0,
		flags: {authentic: 1},
		volatileStatus: 'curse',
		onTryHit(target, source, move) {
			if (move.volatileStatus && target.volatiles['curse']) {
				return false;
			}
		},
		onHit(target, source) {
			this.directDamage(source.maxhp / 4, source, source);
		},
		condition: {
			onStart(pokemon, source) {
				this.add('-start', pokemon, 'Curse', '[of] ' + source);
			},
			onResidualOrder: 10,
			onResidual(pokemon) {
				this.damage(pokemon.baseMaxhp / 4);
			},
		},
		secondary: null,
		target: "normal",
		type: "Water",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Tough",
	},

	rockcrash: {
		num: 10059,
		accuracy: 100,
		basePower: 0,
		basePowerCallback(pokemon, target) {
			const targetWeight = target.getWeight();
			const pokemonWeight = pokemon.getWeight();
			if (pokemonWeight > targetWeight * 5) {
				return 120;
			}
			if (pokemonWeight > targetWeight * 4) {
				return 100;
			}
			if (pokemonWeight > targetWeight * 3) {
				return 80;
			}
			if (pokemonWeight > targetWeight * 2) {
				return 60;
			}
			return 40;
		},
		category: "Physical",
		name: "Rock Crash",
		shortDesc: "More power the heavier the user than the target.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, nonsky: 1},
		onTryHit(target, pokemon, move) {
			if (target.volatiles['dynamax']) {
				this.add('-fail', pokemon, 'Dynamax');
				this.attrLastMove('[still]');
				return null;
			}
		},
		secondary: null,
		target: "normal",
		type: "Rock",
		zMove: {basePower: 160},
		maxMove: {basePower: 130},
		contestType: "Tough",
	},

	dancebattle: {
		num: 10060,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Dance Battle",
		shortDesc: "Raises all stats by 1 of both user and target.",
		pp: 20,
		priority: 0,
		flags: {snatch: 1, dance: 1},
		boosts: {
			atk: 1,
			def: 1,
			spa: 1,
			spd: 1,
			spe: 1,
		},
		self: {
			boosts: {
				atk: 1,
				def: 1,
				spa: 1,
				spd: 1,
				spe: 1,
			},
		},
		secondary: null,
		target: "normal",
		type: "Fighting",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Cool",
	},

	froghop: {
		num: 10061,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		name: "Frog Hop",
		shortDesc: "User switches out after damaging the target.",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		selfSwitch: true,
		secondary: null,
		target: "normal",
		type: "Poison",
	},

	aerialassault: {
		num: 10062,
		accuracy: true,
		basePower: 70,
		category: "Physical",
		name: "Aerial Assault",
		shortDesc: "Always results in a critical hit; no accuracy check.",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		willCrit: true,
		secondary: null,
		target: "normal",
		type: "Flying",
		contestType: "Cool",
	},

	snowthrower: {
		num: 10063,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Snow Thrower",
		shortDesc: "30% chance to freeze adjacent Pokemon.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			status: 'frz',
		},
		target: "allAdjacent",
		type: "Ice",
		contestType: "Beautiful",
	},

	puppetmasters: {
		num: 10064,
		accuracy: 100,
		basePower: 45,
		category: "Special",
		name: "Puppet Masters",
		shortDesc: "Traps target. Hits twice.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		multihit: 2,
		secondary: {
			chance: 100,
			onHit(target, source, move) {
				if (source.isActive) target.addVolatile('trapped', source, move, 'trapper');
			},
		},
		target: "normal",
		type: "Ghost",
		contestType: "Tough",
	},

	fangclaws: {
		num: 10065,
		accuracy: 75,
		basePower: 100,
		category: "Physical",
		name: "Fang-Claws",
		shortDesc: "Traps and damages the target for 4-5 turns.",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, bite: 1},
		volatileStatus: 'partiallytrapped',
		secondary: null,
		target: "normal",
		type: "Dark",
		contestType: "Tough",
	},

	bonebreaker: {
		num: 10066,
		accuracy: 100,
		basePower: 95,
		category: "Physical",
		name: "Bone Breaker",
		shortDesc: "Set Toxic Spikes on hit.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		self: {
			onHit(source) {
				source.side.foe.addSideCondition('toxicspikes');
			},
		},
		target: "normal",
		type: "Poison",
		contestType: "Clever",
	},

	ectoplasm: {
		num: 10067,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		name: "Ectoplasm",
		shortDesc: "30% to badly poison the target.",
		pp: 10,
		priority: 0,
		flags: {bullet: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			status: 'tox',
		},
		target: "normal",
		type: "Ghost",
		contestType: "Tough",
	},

	surprise: {
		num: 10068,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		name: "Surprise",
		shortDesc: "User switches out after damaging the target.",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		selfSwitch: true,
		secondary: null,
		target: "normal",
		type: "Fairy",
		contestType: "Cute",
	},

	hailblast: {
		num: 10069,
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		name: "Hail Blast",
		shortDesc: "Summons a hailstorm.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		weather: 'hail',
		secondary: null,
		target: "allAdjacent",
		type: "Ice",
	},

	concert: {
		num: 10070,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Concert",
		shortDesc: "The target's Ability becomes Dancer. Sound. Mega Only.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, sound: 1, mirror: 1},
		onTryMove(pokemon, target, move) {
			if (pokemon.species.name === 'Vizcachu-Mega' || move.hasBounced) {
				return;
			}
			this.add('-fail', pokemon, 'move: Concert');
			this.hint("Only a Pokemon whose form is Vizcachu-Mega can use this move.");
			return null;
		},
		onTryHit(target) {
			if (target.getAbility().isPermanent || target.ability === 'dancer' || target.ability === 'truant') {
				return false;
			}
		},
		onHit(pokemon) {
			const oldAbility = pokemon.setAbility('dancer');
			if (oldAbility) {
				this.add('-ability', pokemon, 'Dancer', '[from] move: Concert');
				return;
			}
			return false;
		},
		secondary: null,
		target: "allAdjacent",
		type: "Electric",
		zMove: {boost: {spa: 1}},
		contestType: "Cool",
	},

	vampbite: {
		num: 10071,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Vamp Bite",
		shortDesc: "User recovers 50% of the damage dealt. Biting move.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, heal: 1, bite: 1},
		drain: [1, 2],
		secondary: null,
		target: "normal",
		type: "Dark",
		contestType: "Clever",
	},

	divinebreeze: {
		num: 10072,
		accuracy: 100,
		basePower: 85,
		category: "Special",
		name: "Divine Breeze",
		shortDesc: "-1 evasion; clears terrain and hazards on both sides. Wind move.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, authentic: 1, wind: 1},
		onHit(target, source, move) {
			let success = false;
			if (!target.volatiles['substitute'] || move.infiltrates) success = !!this.boost({evasion: -1});
			const removeTarget = [
				'reflect', 'lightscreen', 'auroraveil', 'safeguard', 'mist', 'spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge', 'electricspores', 'icetrap',
			];
			const removeAll = [
				'spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge', 'electricspores', 'icetrap',
			];
			for (const targetCondition of removeTarget) {
				if (target.side.removeSideCondition(targetCondition)) {
					if (!removeAll.includes(targetCondition)) continue;
					this.add('-sideend', target.side, this.dex.conditions.get(targetCondition).name, '[from] move: Divine Breeze', '[of] ' + source);
					success = true;
				}
			}
			for (const sideCondition of removeAll) {
				if (source.side.removeSideCondition(sideCondition)) {
					this.add('-sideend', source.side, this.dex.conditions.get(sideCondition).name, '[from] move: Divine Breeze', '[of] ' + source);
					success = true;
				}
			}
			this.field.clearTerrain();
			return success;
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Flying",
		zMove: {boost: {accuracy: 1}},
		contestType: "Cool",
	},

	dragonscurse: {
		num: 10073,
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		name: "Dragon's Curse",
		shortDesc: "Adds Dragon to the target's type(s).",
		pp: 10,
		priority: 0,
		flags: {protect: 1, contact: 1, mirror: 1},
		onHit(target) {
			if (target.hasType('Dragon')) return false;
			if (!target.addType('Dragon')) return false;
			this.add('-start', target, 'typeadd', 'Dragon', '[from] move: Dragon\'s Curse');
		},
		secondary: null,
		target: "normal",
		type: "Dragon",
		zMove: {boost: {atk: 1, def: 1, spa: 1, spd: 1, spe: 1}},
		contestType: "Clever",
	},

	cursedtail: {
		num: 10074,
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		name: "Cursed Tail",
		shortDesc: "All active Pokemon will faint in 3 turns.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onHit(target, source, move) {
			let result = false;
			let message = false;
			for (const pokemon of this.getAllActive()) {
				if (this.runEvent('Invulnerability', pokemon, source, move) === false) {
					this.add('-miss', source, pokemon);
					result = true;
				} else if (this.runEvent('TryHit', pokemon, source, move) === null) {
					result = true;
				} else if (!pokemon.volatiles['perishsong']) {
					pokemon.addVolatile('perishsong');
					this.add('-start', pokemon, 'perish3', '[silent]');
					result = true;
					message = true;
				}
			}
			if (!result) return false;
			if (message) this.add('-fieldactivate', 'move: Perish Song');
		},
		condition: {
			duration: 4,
			onEnd(target) {
				this.add('-start', target, 'perish0');
				target.faint();
			},
			onResidualOrder: 20,
			onResidual(pokemon) {
				const duration = pokemon.volatiles['perishsong'].duration;
				this.add('-start', pokemon, 'perish' + duration);
			},
		},
		secondary: null,
		target: "normal",
		type: "Dark",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Beautiful",
	},
	butterflyeffect: {
		num: 10075,
		accuracy: 100,
		basePower: 130,
		category: "Special",
		name: "Butterfly Effect",
		shortDesc: "Lowers the user's Defense and Sp. Atk by 1.",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		self: {
			boosts: {
				def: -1,
				spa: -1,
			},
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Bug",
		contestType: "Beautiful",
	},
	furyswirls: {
		num: 10076,
		accuracy: 100,
		basePower: 38,
		category: "Physical",
		name: "Fury Swirls",
		shortDesc: "Hits 2-5 times in one turn.",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		multihit: [2, 5],
		secondary: null,
		target: "normal",
		type: "Fairy",
		maxMove: {basePower: 100},
		contestType: "Cute",
	},
	frostbite: {
		num: 10077,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Frostbite",
		shortDesc: "Freeze the target, halving its SpA and dealing damage.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1},
		status: 'frz',
		secondary: null,
		target: "normal",
		type: "Ice",
		zMove: {boost: {atk: 1}},
		contestType: "Beautiful",
	},

	undyingspiritofthebrave: {
		num: 10078,
		accuracy: true,
		basePower: 200,
		category: "Physical",
		name: "Undying Spirit of the Brave",
		shortDesc: "100% chance to raise the user's Attack by 1.",
		pp: 1,
		priority: 0,
		flags: {},
		isZ: "dothdiumz",
		self: {
			boosts: {
				atk: 1,
			},
		},
		ignoreAbility: true,
		target: "normal",
		type: "Flying",
		contestType: "Cool",
	},

	eventhesunwillburn: {
		num: 10079,
		accuracy: true,
		basePower: 160,
		category: "Physical",
		name: "Even the Sun will burn",
		shortDesc: "Sets Sunny Day and burns the target.",
		pp: 1,
		priority: 0,
		flags: {},
		isZ: "burstratiumz",
		self: {
			onHit(source) {
				this.field.setWeather('sunnyday');
			},
		},
		secondary: {
			chance: 100,
			status: 'brn',
		},
		ignoreAbility: true,
		target: "normal",
		type: "Fire",
		contestType: "Cool",
	},

	anewtreeoflife: {
		num: 10080,
		accuracy: true,
		basePower: 160,
		category: "Physical",
		name: "A new tree of life",
		shortDesc: "Sets Grassy Terrain and paralyze the target.",
		pp: 1,
		priority: 0,
		flags: {},
		isZ: "fasmiwoodiumz",
		self: {
			onHit(source) {
				this.field.setTerrain('grassyterrain');
			},
		},
		secondary: {
			chance: 100,
			status: 'par',
		},
		ignoreAbility: true,
		target: "normal",
		type: "Grass",
		contestType: "Cool",
	},

	theoceandoesnotforgive: {
		num: 10081,
		accuracy: true,
		basePower: 160,
		category: "Special",
		name: "The ocean does not forgive",
		shortDesc: "Sets Rain and freeze the target.",
		pp: 1,
		priority: 0,
		flags: {},
		isZ: "merdolphiumz",
		self: {
			onHit(source) {
				this.field.setWeather('rain');
			},
		},
		secondary: {
			chance: 100,
			status: 'frz',
		},
		ignoreAbility: true,
		target: "normal",
		type: "Water",
		contestType: "Cool",
	},

	mindclear: {
		num: 10082,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		name: "Mind Clear",
		shortDesc: "10% chance to sleep. Super effective on Dark.",
		pp: 20,
		priority: 0,
		ignoreImmunity: true,
		flags: {protect: 1, mirror: 1},
		onEffectiveness(typeMod, target, type) {
			if (type === 'Dark') return 1;
		},
		secondary: {
			chance: 10,
			status: 'slp',
		},
		target: "normal",
		type: "Psychic",
		contestType: "Clever",
	},

	electricspores: {
		num: 10083,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Electric Spores",
		shortDesc: "Hurts on switch-in. Removed by Grass and Electric Types.",
		pp: 20,
		priority: 0,
		flags: {reflectable: 1},
		sideCondition: 'electricspores',
		condition: {
			// this is a side condition
			onStart(side) {
				this.add('-sidestart', side, 'move: Electric Spores');
			},
			onSwitchIn(pokemon) {
				if (pokemon.hasItem('heavydutyboots') || pokemon.hasItem('safetygoggles') || pokemon.hasAbility('overcoat')) return;
				if (pokemon.hasType('Electric') || pokemon.hasType('Grass') || pokemon.hasAbility('Climber')) {
					this.add('-sideend', pokemon.side, 'move: Electric Spores', '[of] ' + pokemon);
					pokemon.side.removeSideCondition('electricspores');
				} else {
					const typeMod = this.clampIntRange(pokemon.runEffectiveness(this.dex.getActiveMove('electricspores')), -6, 6);
					this.damage(pokemon.maxhp * Math.pow(2, typeMod) / 8);
				}
			},
		},
		secondary: null,
		target: "foeSide",
		type: "Electric",
		zMove: {boost: {def: 1}},
		contestType: "Cool",
	},

	combustion: {
		num: 10084,
		accuracy: 100,
		basePower: 85,
		category: "Special",
		name: "Combustion",
		shortDesc: "Ignores Ability. +1 Atk/SpA/Spe. Part Fire.",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		ignoreAbility: true,
		onEffectiveness(typeMod, target, type, move) {
			return typeMod + this.dex.getEffectiveness('Fire', type);
		},
		secondary: {
			chance: 100,
			self: {
				boosts: {
					atk: 1,
					spa: 1,
					spe: 1,
				},
			},
		},
		target: "normal",
		type: "Normal",
		contestType: "Cool",
	},

	frozentongue: {
		num: 10085,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Frozen Tongue",
		shortDesc: "Traps, freeze and deals damage to target.",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		volatileStatus: 'partiallytrapped',
		secondary: {
			chance: 100,
			status: 'frz',
		},
		target: "normal",
		type: "Ice",
		contestType: "Clever",
	},

	icetrap: {
		num: 10086,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Ice Trap",
		shortDesc: "Hurts on switch-in. Removed by Fire Types.",
		pp: 20,
		priority: 0,
		flags: {reflectable: 1},
		sideCondition: 'icetrap',
		condition: {
			// this is a side condition
			onStart(side) {
				this.add('-sidestart', side, 'move: Ice Trap');
			},
			onSwitchIn(pokemon) {
				if (pokemon.hasItem('heavydutyboots') || pokemon.hasAbility('coldheart')) return;
				if (pokemon.hasType('Fire') || pokemon.hasAbility('Climber')) {
					this.add('-sideend', pokemon.side, 'move: Ice Trap', '[of] ' + pokemon);
					pokemon.side.removeSideCondition('icetrap');
				} else {
					const typeMod = this.clampIntRange(pokemon.runEffectiveness(this.dex.getActiveMove('icetrap')), -6, 6);
					this.damage(pokemon.maxhp * Math.pow(2, typeMod) / 8);
				}
			},
		},
		secondary: null,
		target: "foeSide",
		type: "Ice",
		zMove: {boost: {def: 1}},
		contestType: "Beautiful",
	},

	shellburst: {
		num: 10087,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		name: "Shell Burst",
		shortDesc: "30% chance to raise Atk. Guerrevo transforms.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			self: {
				boosts: {
					atk: 1,
				},
			},
		},
		onHit(target, pokemon, move) {
			if (pokemon.species.id === 'guerrevo' && !pokemon.transformed) {
				move.willChangeForme = true;
			}
		},
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (move.willChangeForme) {
				const guerrevoForme = pokemon.species.id === 'guerrevonacer' ? '' : '-Nacer';
				pokemon.formeChange('Guerrevo' + guerrevoForme, this.effect, false, '[msg]');
			}
		},
		target: "normal",
		type: "Rock",
		contestType: "Cool",
	},

	// updated old moves
	hypnosis: {
		num: 95,
		accuracy: 85,
		basePower: 0,
		category: "Status",
		name: "Hypnosis",
		pp: 20,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1},
		status: 'slp',
		secondary: null,
		target: "normal",
		type: "Psychic",
		zMove: {boost: {spe: 1}},
		contestType: "Clever",
	},

	sing: {
		num: 47,
		accuracy: 90,
		basePower: 0,
		category: "Status",
		name: "Sing",
		pp: 15,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, sound: 1, authentic: 1},
		status: 'slp',
		secondary: null,
		target: "normal",
		type: "Normal",
		zMove: {boost: {spe: 1}},
		contestType: "Cute",
	},

	grasswhistle: {
		num: 320,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		isNonstandard: "Past",
		name: "Grass Whistle",
		pp: 15,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, sound: 1, authentic: 1},
		status: 'slp',
		secondary: null,
		target: "normal",
		type: "Grass",
		zMove: {boost: {spe: 1}},
		contestType: "Clever",
	},

	sleeppowder: {
		num: 79,
		accuracy: 90,
		basePower: 0,
		category: "Status",
		name: "Sleep Powder",
		pp: 15,
		priority: 0,
		flags: {powder: 1, protect: 1, reflectable: 1, mirror: 1},
		status: 'slp',
		secondary: null,
		target: "normal",
		type: "Grass",
		zMove: {boost: {spe: 1}},
		contestType: "Clever",
	},
	// climber interactions
	stealthrock: {
		num: 446,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Stealth Rock",
		pp: 20,
		priority: 0,
		flags: {reflectable: 1},
		sideCondition: 'stealthrock',
		condition: {
			// this is a side condition
			onStart(side) {
				this.add('-sidestart', side, 'move: Stealth Rock');
			},
			onSwitchIn(pokemon) {
				if (pokemon.hasItem('heavydutyboots')) return;
				if (pokemon.hasAbility('Climber')) {
					this.add('-sideend', pokemon.side, 'move: Stealth Rock', '[of] ' + pokemon);
					pokemon.side.removeSideCondition('stealthrock');
				} else {
					const typeMod = this.clampIntRange(pokemon.runEffectiveness(this.dex.getActiveMove('stealthrock')), -6, 6);
					this.damage(pokemon.maxhp * Math.pow(2, typeMod) / 8);
				}
			},
		},
		secondary: null,
		target: "foeSide",
		type: "Rock",
		zMove: {boost: {def: 1}},
		contestType: "Cool",
	},

	toxicspikes: {
		num: 390,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Toxic Spikes",
		pp: 20,
		priority: 0,
		flags: {reflectable: 1, nonsky: 1},
		sideCondition: 'toxicspikes',
		condition: {
			// this is a side condition
			onStart(side) {
				this.add('-sidestart', side, 'move: Toxic Spikes');
				this.effectState.layers = 1;
			},
			onRestart(side) {
				if (this.effectState.layers >= 2) return false;
				this.add('-sidestart', side, 'move: Toxic Spikes');
				this.effectState.layers++;
			},
			onSwitchIn(pokemon) {
				if (!pokemon.isGrounded()) return;
				if (pokemon.hasType('Poison') || pokemon.hasAbility('Climber')) {
					this.add('-sideend', pokemon.side, 'move: Toxic Spikes', '[of] ' + pokemon);
					pokemon.side.removeSideCondition('toxicspikes');
				} else if (pokemon.hasType('Steel') || pokemon.hasItem('heavydutyboots')) {
					return;
				} else if (this.effectState.layers >= 2) {
					pokemon.trySetStatus('tox', pokemon.side.foe.active[0]);
				} else {
					pokemon.trySetStatus('psn', pokemon.side.foe.active[0]);
				}
			},
		},
		secondary: null,
		target: "foeSide",
		type: "Poison",
		zMove: {boost: {def: 1}},
		contestType: "Clever",
	},

	spikes: {
		num: 191,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Spikes",
		pp: 20,
		priority: 0,
		flags: {reflectable: 1, nonsky: 1},
		sideCondition: 'spikes',
		condition: {
			// this is a side condition
			onStart(side) {
				this.add('-sidestart', side, 'Spikes');
				this.effectState.layers = 1;
			},
			onRestart(side) {
				if (this.effectState.layers >= 3) return false;
				this.add('-sidestart', side, 'Spikes');
				this.effectState.layers++;
			},
			onSwitchIn(pokemon) {
				if (!pokemon.isGrounded()) return;
				if (pokemon.hasItem('heavydutyboots')) return;
				if (pokemon.hasAbility('Climber')) {
					this.add('-sideend', pokemon.side, 'move: Spikes', '[of] ' + pokemon);
					pokemon.side.removeSideCondition('spikes');
				} else {
					const damageAmounts = [0, 3, 4, 6]; // 1/8, 1/6, 1/4
					this.damage(damageAmounts[this.effectState.layers] * pokemon.maxhp / 24);
				}
			},
		},
		secondary: null,
		target: "foeSide",
		type: "Ground",
		zMove: {boost: {def: 1}},
		contestType: "Clever",
	},

	stickyweb: {
		num: 564,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Sticky Web",
		pp: 20,
		priority: 0,
		flags: {reflectable: 1},
		sideCondition: 'stickyweb',
		condition: {
			onStart(side) {
				this.add('-sidestart', side, 'move: Sticky Web');
			},
			onSwitchIn(pokemon) {
				if (!pokemon.isGrounded()) return;
				if (pokemon.hasItem('heavydutyboots')) return;
				if (pokemon.hasAbility('Climber')) {
					this.add('-sideend', pokemon.side, 'move: Sticky Web', '[of] ' + pokemon);
					pokemon.side.removeSideCondition('stickyweb');
				} else {
					this.add('-activate', pokemon, 'move: Sticky Web');
					this.boost({spe: -1}, pokemon, this.effectState.source, this.dex.getActiveMove('stickyweb'));
				}
			},
		},
		secondary: null,
		target: "foeSide",
		type: "Bug",
		zMove: {boost: {spe: 1}},
		contestType: "Tough",
	},

	gmaxsteelsurge: {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		isNonstandard: "Gigantamax",
		name: "G-Max Steelsurge",
		pp: 5,
		priority: 0,
		flags: {},
		isMax: "Copperajah",
		self: {
			onHit(source) {
				source.side.foe.addSideCondition('gmaxsteelsurge');
			},
		},
		condition: {
			onStart(side) {
				this.add('-sidestart', side, 'move: G-Max Steelsurge');
			},
			onSwitchIn(pokemon) {
				if (pokemon.hasItem('heavydutyboots')) return;
				if (pokemon.hasAbility('Climber')) {
					this.add('-sideend', pokemon.side, 'move: G-Max Steelsurge', '[of] ' + pokemon);
					pokemon.side.removeSideCondition('gmaxsteelsurge');
				} else {
				// Ice Face and Disguise correctly get typed damage from Stealth Rock
				// because Stealth Rock bypasses Substitute.
				// They don't get typed damage from Steelsurge because Steelsurge doesn't,
				// so we're going to test the damage of a Steel-type Stealth Rock instead.
					const steelHazard = this.dex.getActiveMove('Stealth Rock');
					steelHazard.type = 'Steel';
					const typeMod = this.clampIntRange(pokemon.runEffectiveness(steelHazard), -6, 6);
					this.damage(pokemon.maxhp * Math.pow(2, typeMod) / 8);
				}
			},
		},
		secondary: null,
		target: "adjacentFoe",
		type: "Steel",
		contestType: "Cool",
	},
	// electric spores/ice trap interactions
	courtchange: {
		num: 756,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Court Change",
		pp: 10,
		priority: 0,
		flags: {mirror: 1},
		onHitField(target, source) {
			const sourceSide = source.side;
			const targetSide = source.side.foe;
			const sideConditions = [
				'icetrap', 'electricspores', 'mist', 'lightscreen', 'reflect', 'spikes', 'safeguard', 'tailwind', 'toxicspikes', 'stealthrock', 'waterpledge', 'firepledge', 'grasspledge', 'stickyweb', 'auroraveil', 'gmaxsteelsurge', 'gmaxcannonade', 'gmaxvinelash', 'gmaxwildfire',
			];
			let success = false;
			for (const id of sideConditions) {
				const effectName = this.dex.conditions.get(id).name;
				if (sourceSide.sideConditions[id] && targetSide.sideConditions[id]) {
					[sourceSide.sideConditions[id], targetSide.sideConditions[id]] = [
						targetSide.sideConditions[id], sourceSide.sideConditions[id],
					];
					this.add('-sideend', sourceSide, effectName, '[silent]');
					this.add('-sideend', targetSide, effectName, '[silent]');
				} else if (sourceSide.sideConditions[id] && !targetSide.sideConditions[id]) {
					targetSide.sideConditions[id] = sourceSide.sideConditions[id];
					delete sourceSide.sideConditions[id];
					this.add('-sideend', sourceSide, effectName, '[silent]');
				} else if (targetSide.sideConditions[id] && !sourceSide.sideConditions[id]) {
					sourceSide.sideConditions[id] = targetSide.sideConditions[id];
					delete targetSide.sideConditions[id];
					this.add('-sideend', targetSide, effectName, '[silent]');
				} else {
					continue;
				}
				let sourceLayers = sourceSide.sideConditions[id] ? (sourceSide.sideConditions[id].layers || 1) : 0;
				let targetLayers = targetSide.sideConditions[id] ? (targetSide.sideConditions[id].layers || 1) : 0;
				for (; sourceLayers > 0; sourceLayers--) {
					this.add('-sidestart', sourceSide, effectName, '[silent]');
				}
				for (; targetLayers > 0; targetLayers--) {
					this.add('-sidestart', targetSide, effectName, '[silent]');
				}
				success = true;
			}
			if (!success) return false;
			this.add('-activate', source, 'move: Court Change');
		},
		secondary: null,
		target: "all",
		type: "Normal",
	},

	defog: {
		num: 432,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Defog",
		pp: 15,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, authentic: 1},
		onHit(target, source, move) {
			let success = false;
			if (!target.volatiles['substitute'] || move.infiltrates) success = !!this.boost({evasion: -1});
			const removeTarget = [
				'reflect', 'lightscreen', 'auroraveil', 'safeguard', 'mist', 'spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge', 'electricspores', 'icetrap',
			];
			const removeAll = [
				'spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge', 'electricspores', 'icetrap',
			];
			for (const targetCondition of removeTarget) {
				if (target.side.removeSideCondition(targetCondition)) {
					if (!removeAll.includes(targetCondition)) continue;
					this.add('-sideend', target.side, this.dex.conditions.get(targetCondition).name, '[from] move: Defog', '[of] ' + source);
					success = true;
				}
			}
			for (const sideCondition of removeAll) {
				if (source.side.removeSideCondition(sideCondition)) {
					this.add('-sideend', source.side, this.dex.conditions.get(sideCondition).name, '[from] move: Defog', '[of] ' + source);
					success = true;
				}
			}
			this.field.clearTerrain();
			return success;
		},
		secondary: null,
		target: "normal",
		type: "Flying",
		zMove: {boost: {accuracy: 1}},
		contestType: "Cool",
	},

	rapidspin: {
		num: 229,
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		name: "Rapid Spin",
		pp: 40,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onAfterHit(target, pokemon) {
			if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
				this.add('-end', pokemon, 'Leech Seed', '[from] move: Rapid Spin', '[of] ' + pokemon);
			}
			const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge', 'electricspores', 'icetrap'];
			for (const condition of sideConditions) {
				if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
					this.add('-sideend', pokemon.side, this.dex.conditions.get(condition).name, '[from] move: Rapid Spin', '[of] ' + pokemon);
				}
			}
			if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
				pokemon.removeVolatile('partiallytrapped');
			}
		},
		onAfterSubDamage(damage, target, pokemon) {
			if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
				this.add('-end', pokemon, 'Leech Seed', '[from] move: Rapid Spin', '[of] ' + pokemon);
			}
			const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge', 'electricspores', 'icetrap'];
			for (const condition of sideConditions) {
				if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
					this.add('-sideend', pokemon.side, this.dex.conditions.get(condition).name, '[from] move: Rapid Spin', '[of] ' + pokemon);
				}
			}
			if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
				pokemon.removeVolatile('partiallytrapped');
			}
		},
		secondary: {
			chance: 100,
			self: {
				boosts: {
					spe: 1,
				},
			},
		},
		target: "normal",
		type: "Normal",
		contestType: "Cool",
	},

	// recharge moves
	hyperbeam: {
		num: 63,
		accuracy: 90,
		basePower: 130,
		category: "Special",
		name: "Hyper Beam",
		shortDesc: "Cannot be used twice in a row.",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		self: {
			volatileStatus: "hyperbeam",
		},
		condition: {
			onDisableMove(pokemon) {
				if (pokemon.lastMove?.id === 'hyperbeam') pokemon.disableMove('hyperbeam');
			},
		},
		beforeMoveCallback(pokemon) {
			if (pokemon.lastMove?.id === 'hyperbeam') pokemon.addVolatile('hyperbeam');
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Cool",
	},
	gigaimpact: {
		num: 416,
		accuracy: 90,
		basePower: 130,
		category: "Physical",
		name: "Giga Impact",
		shortDesc: "Cannot be used twice in a row.",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		self: {
			volatileStatus: "gigaimpact",
		},
		condition: {
			onDisableMove(pokemon) {
				if (pokemon.lastMove?.id === 'gigaimpact') pokemon.disableMove('gigaimpact');
			},
		},
		beforeMoveCallback(pokemon) {
			if (pokemon.lastMove?.id === 'gigaimpact') pokemon.addVolatile('gigaimpact');
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Tough",
	},
	blastburn: {
		num: 307,
		accuracy: 90,
		basePower: 130,
		category: "Special",
		name: "Blast Burn",
		shortDesc: "Cannot be used twice in a row.",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		self: {
			volatileStatus: "blastburn",
		},
		condition: {
			onDisableMove(pokemon) {
				if (pokemon.lastMove?.id === 'blastburn') pokemon.disableMove('blastburn');
			},
		},
		beforeMoveCallback(pokemon) {
			if (pokemon.lastMove?.id === 'blastburn') pokemon.addVolatile('blastburn');
		},
		secondary: null,
		target: "normal",
		type: "Fire",
		contestType: "Beautiful",
	},
	hydrocannon: {
		num: 308,
		accuracy: 90,
		basePower: 130,
		category: "Special",
		name: "Hydro Cannon",
		shortDesc: "Cannot be used twice in a row.",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		self: {
			volatileStatus: "hydrocannon",
		},
		condition: {
			onDisableMove(pokemon) {
				if (pokemon.lastMove?.id === 'hydrocannon') pokemon.disableMove('hydrocannon');
			},
		},
		beforeMoveCallback(pokemon) {
			if (pokemon.lastMove?.id === 'hydrocannon') pokemon.addVolatile('hydrocannon');
		},
		secondary: null,
		target: "normal",
		type: "Water",
		contestType: "Beautiful",
	},
	frenzyplant: {
		num: 338,
		accuracy: 90,
		basePower: 130,
		category: "Special",
		name: "Frenzy Plant",
		shortDesc: "Cannot be used twice in a row.",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, nonsky: 1},
		self: {
			volatileStatus: "frenzyplant",
		},
		condition: {
			onDisableMove(pokemon) {
				if (pokemon.lastMove?.id === 'frenzyplant') pokemon.disableMove('frenzyplant');
			},
		},
		beforeMoveCallback(pokemon) {
			if (pokemon.lastMove?.id === 'frenzyplant') pokemon.addVolatile('frenzyplant');
		},
		secondary: null,
		target: "normal",
		type: "Grass",
		contestType: "Cool",
	},
	meteorassault: {
		num: 794,
		accuracy: 100,
		basePower: 130,
		category: "Physical",
		name: "Meteor Assault",
		shortDesc: "Cannot be used twice in a row.",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		self: {
			volatileStatus: "meteorassault",
		},
		condition: {
			onDisableMove(pokemon) {
				if (pokemon.lastMove?.id === 'meteorassault') pokemon.disableMove('meteorassault');
			},
		},
		beforeMoveCallback(pokemon) {
			if (pokemon.lastMove?.id === 'meteorassault') pokemon.addVolatile('meteorassault');
		},
		secondary: null,
		target: "normal",
		type: "Fighting",
	},
	roaroftime: {
		num: 459,
		accuracy: 90,
		basePower: 130,
		category: "Special",
		name: "Roar of Time",
		shortDesc: "Cannot be used twice in a row.",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		self: {
			volatileStatus: "roaroftime",
		},
		condition: {
			onDisableMove(pokemon) {
				if (pokemon.lastMove?.id === 'roaroftime') pokemon.disableMove('roaroftime');
			},
		},
		beforeMoveCallback(pokemon) {
			if (pokemon.lastMove?.id === 'roaroftime') pokemon.addVolatile('roaroftime');
		},
		secondary: null,
		target: "normal",
		type: "Dragon",
		contestType: "Beautiful",
	},

	rockwrecker: {
		num: 439,
		accuracy: 90,
		basePower: 130,
		category: "Physical",
		name: "Rock Wrecker",
		shortDesc: "Cannot be used twice in a row.",
		pp: 5,
		priority: 0,
		flags: {bullet: 1, protect: 1, mirror: 1},
		self: {
			volatileStatus: "rockwrecker",
		},
		condition: {
			onDisableMove(pokemon) {
				if (pokemon.lastMove?.id === 'rockwrecker') pokemon.disableMove('rockwrecker');
			},
		},
		beforeMoveCallback(pokemon) {
			if (pokemon.lastMove?.id === 'rockwrecker') pokemon.addVolatile('rockwrecker');
		},
		secondary: null,
		target: "normal",
		type: "Rock",
		contestType: "Tough",
	},

	prismaticlaser: {
		num: 711,
		accuracy: 100,
		basePower: 130,
		category: "Special",
		name: "Prismatic Laser",
		shortDesc: "Cannot be used twice in a row.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		self: {
			volatileStatus: "prismaticlaser",
		},
		condition: {
			onDisableMove(pokemon) {
				if (pokemon.lastMove?.id === 'prismaticlaser') pokemon.disableMove('prismaticlaser');
			},
		},
		beforeMoveCallback(pokemon) {
			if (pokemon.lastMove?.id === 'prismaticlaser') pokemon.addVolatile('prismaticlaser');
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
		contestType: "Cool",
	},

	// pp nerf
	recover: {
		num: 105,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Recover",
		pp: 5,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		heal: [1, 2],
		secondary: null,
		target: "self",
		type: "Normal",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Clever",
	},
	softboiled: {
		num: 135,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Soft-Boiled",
		pp: 5,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		heal: [1, 2],
		secondary: null,
		target: "self",
		type: "Normal",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Cute",
	},
	roost: {
		num: 355,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Roost",
		pp: 5,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		heal: [1, 2],
		self: {
			volatileStatus: 'roost',
		},
		condition: {
			duration: 1,
			onResidualOrder: 20,
			onStart(target) {
				this.add('-singleturn', target, 'move: Roost');
			},
			onTypePriority: -1,
			onType(types, pokemon) {
				this.effectState.typeWas = types;
				return types.filter(type => type !== 'Flying');
			},
		},
		secondary: null,
		target: "self",
		type: "Flying",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Clever",
	},
	milkdrink: {
		num: 208,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Milk Drink",
		pp: 5,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		heal: [1, 2],
		secondary: null,
		target: "self",
		type: "Normal",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Cute",
	},
	slackoff: {
		num: 303,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Slack Off",
		pp: 5,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		heal: [1, 2],
		secondary: null,
		target: "self",
		type: "Normal",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Cute",
	},
	rest: {
		num: 156,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Rest",
		pp: 5,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		onTryMove(pokemon) {
			if (pokemon.hp === pokemon.maxhp) {
				this.add('-fail', pokemon, 'heal');
				return null;
			}
			if (pokemon.status === 'slp' || pokemon.hasAbility('comatose')) {
				this.add('-fail', pokemon);
				return null;
			}
		},
		onHit(target, source, move) {
			if (!target.setStatus('slp', source, move)) return false;
			target.statusData.time = 3;
			target.statusData.startTime = 3;
			this.heal(target.maxhp); // Aesthetic only as the healing happens after you fall asleep in-game
		},
		secondary: null,
		target: "self",
		type: "Psychic",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Cute",
	},
	// eevee moves back to their original values
	buzzybuzz: {
		num: 734,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		name: "Buzzy Buzz",
		pp: 20,
		priority: 0,
		flags: {protect: 1},
		secondary: {
			chance: 100,
			status: 'par',
		},
		target: "normal",
		type: "Electric",
		contestType: "Clever",
	},

	glitzyglow: {
		num: 736,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		name: "Glitzy Glow",
		pp: 15,
		priority: 0,
		flags: {protect: 1},
		self: {
			sideCondition: 'lightscreen',
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
		contestType: "Clever",
	},

	sizzlyslide: {
		num: 735,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Sizzly Slide",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, defrost: 1},
		secondary: {
			chance: 100,
			status: 'brn',
		},
		target: "normal",
		type: "Fire",
		contestType: "Clever",
	},

	freezyfrost: {
		num: 739,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		name: "Freezy Frost",
		pp: 10,
		priority: 0,
		flags: {protect: 1},
		onHit() {
			this.add('-clearallboost');
			for (const pokemon of this.getAllActive()) {
				pokemon.clearBoosts();
			}
		},
		secondary: null,
		target: "normal",
		type: "Ice",
		contestType: "Clever",
	},

	sappyseed: {
		num: 738,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Sappy Seed",
		pp: 10,
		priority: 0,
		flags: {protect: 1, reflectable: 1},
		onHit(target, source) {
			if (target.hasType('Grass')) return null;
			target.addVolatile('leechseed', source);
		},
		secondary: null,
		target: "normal",
		type: "Grass",
		contestType: "Clever",
	},

	sparklyswirl: {
		num: 740,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		name: "Sparkly Swirl",
		pp: 5,
		priority: 0,
		flags: {protect: 1},
		self: {
			onHit(pokemon, source, move) {
				this.add('-activate', source, 'move: Aromatherapy');
				for (const ally of source.side.pokemon) {
					if (ally !== source && (ally.volatiles['substitute'] && !move.infiltrates)) {
						continue;
					}
					ally.cureStatus();
				}
			},
		},
		secondary: null,
		target: "normal",
		type: "Fairy",
		contestType: "Clever",
	},

	// gen9 stuff
	ceaselessedge: {
		num: 845,
		accuracy: 90,
		basePower: 65,
		category: "Physical",
		name: "Ceaseless Edge",
		shortDesc: "Sets a layer of Spikes on the opposing side.",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, slicing: 1},
		self: {
			onHit(source) {
				source.side.foe.addSideCondition('spikes');
			},
		},
		secondary: {}, // allows sheer force to trigger
		target: "normal",
		type: "Dark",
	},

	aquacutter: {
		num: 895,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		name: "Aqua Cutter",
		shortDesc: "High critical hit ratio.",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1, slicing: 1},
		critRatio: 2,
		secondary: null,
		target: "normal",
		type: "Water",
		contestType: "Cool",
	},

	mortalspin: {
		num: 866,
		accuracy: 100,
		basePower: 30,
		category: "Physical",
		name: "Mortal Spin",
		shortDesc: "Poisons foes, frees user from hazards/bind/leech.",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onAfterHit(target, pokemon) {
			if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
				this.add('-end', pokemon, 'Leech Seed', '[from] move: Mortal Spin', '[of] ' + pokemon);
			}
			const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge', 'electricspores', 'icetrap'];
			for (const condition of sideConditions) {
				if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
					this.add('-sideend', pokemon.side, this.dex.conditions.get(condition).name, '[from] move: Mortal Spin', '[of] ' + pokemon);
				}
			}
			if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
				pokemon.removeVolatile('partiallytrapped');
			}
		},
		onAfterSubDamage(damage, target, pokemon) {
			if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
				this.add('-end', pokemon, 'Leech Seed', '[from] move: Mortal Spin', '[of] ' + pokemon);
			}
			const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge', 'electricspores', 'icetrap'];
			for (const condition of sideConditions) {
				if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
					this.add('-sideend', pokemon.side, this.dex.conditions.get(condition).name, '[from] move: Mortal Spin', '[of] ' + pokemon);
				}
			}
			if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
				pokemon.removeVolatile('partiallytrapped');
			}
		},
		secondary: {
			chance: 100,
			status: 'psn',
		},
		target: "allAdjacentFoes",
		type: "Poison",
	},

	icespinner: {
		num: 861,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Ice Spinner",
		shortDesc: "Ends the effects of terrain.",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onHit() {
			this.field.clearTerrain();
		},
		onAfterSubDamage() {
			this.field.clearTerrain();
		},
		secondary: null,
		target: "normal",
		type: "Ice",
	},

	barbbarrage: {
		num: 839,
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		name: "Barb Barrage",
		shortDesc: "50% psn. 2x power if target already poisoned.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onBasePower(basePower, pokemon, target) {
			if (target.status === 'psn' || target.status === 'tox') {
				return this.chainModify(2);
			}
		},
		secondary: {
			chance: 50,
			status: 'psn',
		},
		target: "normal",
		type: "Poison",
	},

	chillyreception: {
		num: 881,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Chilly Reception",
		shortDesc: "Starts Hail. User switches out.",
		pp: 10,
		priority: 0,
		flags: {},
		// TODO show prepare message before the "POKEMON used MOVE!" message
		// This happens even before sleep shows its "POKEMON is fast asleep." message
		weather: 'hail',
		selfSwitch: true,
		secondary: null,
		target: "all",
		type: "Ice",
	},

	infernalparade: {
		num: 844,
		accuracy: 100,
		basePower: 60,
		basePowerCallback(pokemon, target, move) {
			if (target.status || target.hasAbility('comatose')) return move.basePower * 2;
			return move.basePower;
		},
		category: "Special",
		name: "Infernal Parade",
		shortDesc: "30% burn. 2x power if target is already statused.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			status: 'brn',
		},
		target: "normal",
		type: "Ghost",
	},

	mysticalpower: {
		num: 832,
		accuracy: 90,
		basePower: 70,
		category: "Special",
		name: "Mystical Power",
		shortDesc: "100% chance to raise the user's Sp. Atk by 1.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 100,
			self: {
				boosts: {
					spa: 1,
				},
			},
		},
		target: "normal",
		type: "Psychic",
	},

	silktrap: {
		num: 852,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Silk Trap",
		shortDesc: "Protects from damaging attacks. Contact: -1 Spe.",
		pp: 10,
		priority: 4,
		flags: {},
		stallingMove: true,
		volatileStatus: 'silktrap',
		onPrepareHit(pokemon) {
			return !!this.queue.willAct() && this.runEvent('StallMove', pokemon);
		},
		onHit(pokemon) {
			pokemon.addVolatile('stall');
		},
		condition: {
			duration: 1,
			onStart(target) {
				this.add('-singleturn', target, 'Protect');
			},
			onTryHitPriority: 3,
			onTryHit(target, source, move) {
				if (!move.flags['protect'] || move.category === 'Status') {
					if (move.isZ || move.isMax) target.getMoveHitData(move).zBrokeProtect = true;
					return;
				}
				if (move.smartTarget) {
					move.smartTarget = false;
				} else {
					this.add('-activate', target, 'move: Protect');
				}
				const lockedmove = source.getVolatile('lockedmove');
				if (lockedmove) {
					// Outrage counter is reset
					if (source.volatiles['lockedmove'].duration === 2) {
						delete source.volatiles['lockedmove'];
					}
				}
				if (this.checkMoveMakesContact(move, source, target)) {
					this.boost({spe: -1}, source, target, this.dex.getActiveMove("Silk Trap"));
				}
				return this.NOT_FAIL;
			},
			onHit(target, source, move) {
				if (move.isZOrMaxPowered && this.checkMoveMakesContact(move, source, target)) {
					this.boost({spe: -1}, source, target, this.dex.getActiveMove("Silk Trap"));
				}
			},
		},
		target: "self",
		type: "Bug",
	},

	direclaw: {
		num: 827,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Dire Claw",
		shortDesc: "50% chance to sleep, poison, or paralyze target.",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 50,
			onHit(target, source) {
				const result = this.random(3);
				if (result === 0) {
					target.trySetStatus('psn', source);
				} else if (result === 1) {
					target.trySetStatus('par', source);
				} else {
					target.trySetStatus('slp', source);
				}
			},
		},
		target: "normal",
		type: "Poison",
	},

	populationbomb: {
		num: 860,
		accuracy: 90,
		basePower: 20,
		category: "Physical",
		name: "Population Bomb",
		shortDesc: "Hits 10 times. Each hit can miss.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, slicing: 1},
		multihit: 10,
		multiaccuracy: true,
		secondary: null,
		target: "normal",
		type: "Normal",
	},

	victorydance: {
		num: 837,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Victory Dance",
		shortDesc: "Raises the user's Attack, Defense, Speed by 1.",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, dance: 1},
		boosts: {
			atk: 1,
			def: 1,
			spe: 1,
		},
		secondary: null,
		target: "self",
		type: "Fighting",
	},

	chloroblast: {
		num: 835,
		accuracy: 95,
		basePower: 150,
		category: "Special",
		name: "Chloroblast",
		shortDesc: "User loses 50% max HP.",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		mindBlownRecoil: true,
		onAfterMove(pokemon, target, move) {
			if (move.mindBlownRecoil && !move.multihit) {
				const hpBeforeRecoil = pokemon.hp;
				this.damage(Math.round(pokemon.maxhp / 2), pokemon, pokemon, this.dex.conditions.get('Chloroblast'), true);
				if (pokemon.hp <= pokemon.maxhp / 2 && hpBeforeRecoil > pokemon.maxhp / 2) {
					this.runEvent('EmergencyExit', pokemon, pokemon);
				}
			}
		},
		secondary: null,
		target: "normal",
		type: "Grass",
	},

	stoneaxe: {
		num: 830,
		accuracy: 90,
		basePower: 65,
		category: "Physical",
		name: "Stone Axe",
		shortDesc: "Sets Stealth Rock on the target's side.",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, slicing: 1},
		self: {
			onHit(source) {
				for (const side of source.side.foeSidesWithConditions()) {
					side.addSideCondition('stealthrock');
				}
			},
		},
		secondary: {}, // allows sheer force to trigger
		target: "normal",
		type: "Rock",
	},

	trailblaze: {
		num: 885,
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		name: "Trailblaze",
		shortDesc: "100% chance to raise the user's Speed by 1.",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 100,
			self: {
				boosts: {
					spe: 1,
				},
			},
		},
		target: "normal",
		type: "Grass",
		contestType: "Cool",
	},

	gigatonhammer: {
		num: 893,
		accuracy: 100,
		basePower: 160,
		category: "Physical",
		name: "Gigaton Hammer",
		shortDesc: "Cannot be used twice in a row.",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		self: {
			volatileStatus: "gigatonhammer",
		},
		condition: {
			onDisableMove(pokemon) {
				if (pokemon.lastMove?.id === 'gigatonhammer') pokemon.disableMove('gigatonhammer');
			},
		},
		beforeMoveCallback(pokemon) {
			if (pokemon.lastMove?.id === 'gigatonhammer') pokemon.addVolatile('gigatonhammer');
		},
		onAfterMove(pokemon) {
			if (pokemon.removeVolatile('gigatonhammer')) {
				this.add('-hint', "Some effects can force a Pokemon to use Gigaton Hammer again in a row.");
			}
		},
		condition: {},
		secondary: null,
		target: "normal",
		type: "Steel",
	},

	aerialace: {
		num: 332,
		accuracy: true,
		basePower: 60,
		category: "Physical",
		name: "Aerial Ace",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, distance: 1, slicing: 1},
		secondary: null,
		target: "any",
		type: "Flying",
		contestType: "Cool",
	},

	aircutter: {
		num: 314,
		accuracy: 95,
		basePower: 60,
		category: "Special",
		name: "Air Cutter",
		pp: 25,
		priority: 0,
		flags: {protect: 1, mirror: 1, slicing: 1, wind: 1},
		critRatio: 2,
		secondary: null,
		target: "allAdjacentFoes",
		type: "Flying",
		contestType: "Cool",
	},
	airslash: {
		num: 403,
		accuracy: 95,
		basePower: 75,
		category: "Special",
		name: "Air Slash",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, distance: 1, slicing: 1},
		secondary: {
			chance: 30,
			volatileStatus: 'flinch',
		},
		target: "any",
		type: "Flying",
		contestType: "Cool",
	},

	crosspoison: {
		num: 440,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		name: "Cross Poison",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, slicing: 1},
		secondary: {
			chance: 10,
			status: 'psn',
		},
		critRatio: 2,
		target: "normal",
		type: "Poison",
		contestType: "Cool",
	},

	furycutter: {
		num: 210,
		accuracy: 95,
		basePower: 40,
		basePowerCallback(pokemon, target, move) {
			if (!pokemon.volatiles['furycutter'] || move.hit === 1) {
				pokemon.addVolatile('furycutter');
			}
			const bp = this.clampIntRange(move.basePower * pokemon.volatiles['furycutter'].multiplier, 1, 160);
			this.debug('BP: ' + bp);
			return bp;
		},
		category: "Physical",
		name: "Fury Cutter",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, slicing: 1},
		condition: {
			duration: 2,
			onStart() {
				this.effectState.multiplier = 1;
			},
			onRestart() {
				if (this.effectState.multiplier < 4) {
					this.effectState.multiplier <<= 1;
				}
				this.effectState.duration = 2;
			},
		},
		secondary: null,
		target: "normal",
		type: "Bug",
		contestType: "Cool",
	},

	leafblade: {
		num: 348,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Leaf Blade",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, slicing: 1},
		critRatio: 2,
		secondary: null,
		target: "normal",
		type: "Grass",
		contestType: "Cool",
	},

	nightslash: {
		num: 400,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		name: "Night Slash",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, slicing: 1},
		critRatio: 2,
		secondary: null,
		target: "normal",
		type: "Dark",
		contestType: "Cool",
	},

	psychocut: {
		num: 427,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		name: "Psycho Cut",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1, slicing: 1},
		critRatio: 2,
		secondary: null,
		target: "normal",
		type: "Psychic",
		contestType: "Cool",
	},

	razorshell: {
		num: 534,
		accuracy: 95,
		basePower: 75,
		category: "Physical",
		name: "Razor Shell",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, slicing: 1},
		secondary: {
			chance: 50,
			boosts: {
				def: -1,
			},
		},
		target: "normal",
		type: "Water",
		contestType: "Cool",
	},

	sacredsword: {
		num: 533,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Sacred Sword",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, slicing: 1},
		ignoreEvasion: true,
		ignoreDefensive: true,
		secondary: null,
		target: "normal",
		type: "Fighting",
		contestType: "Cool",
	},

	slash: {
		num: 163,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		name: "Slash",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, slicing: 1},
		critRatio: 2,
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Cool",
	},

	solarblade: {
		num: 669,
		accuracy: 100,
		basePower: 125,
		category: "Physical",
		name: "Solar Blade",
		pp: 10,
		priority: 0,
		flags: {contact: 1, charge: 1, protect: 1, mirror: 1, slicing: 1},
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name);
			if (['sunnyday', 'desolateland'].includes(attacker.effectiveWeather())) {
				this.attrLastMove('[still]');
				this.addMove('-anim', attacker, move.name, defender);
				return;
			}
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
		onBasePower(basePower, pokemon, target) {
			const weakWeathers = ['raindance', 'primordialsea', 'sandstorm', 'hail', 'snow'];
			if (weakWeathers.includes(pokemon.effectiveWeather())) {
				this.debug('weakened by weather');
				return this.chainModify(0.5);
			}
		},
		secondary: null,
		target: "normal",
		type: "Grass",
		contestType: "Cool",
	},

	xscissor: {
		num: 404,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "X-Scissor",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, slicing: 1},
		secondary: null,
		target: "normal",
		type: "Bug",
		contestType: "Cool",
	},

	blizzard: {
		num: 59,
		accuracy: 70,
		basePower: 110,
		category: "Special",
		name: "Blizzard",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, wind: 1},
		onModifyMove(move) {
			if (this.field.isWeather(['hail', 'snow'])) move.accuracy = true;
		},
		secondary: {
			chance: 10,
			status: 'frz',
		},
		target: "allAdjacentFoes",
		type: "Ice",
		contestType: "Beautiful",
	},

	heatwave: {
		num: 257,
		accuracy: 90,
		basePower: 95,
		category: "Special",
		name: "Heat Wave",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, wind: 1},
		secondary: {
			chance: 10,
			status: 'brn',
		},
		target: "allAdjacentFoes",
		type: "Fire",
		contestType: "Beautiful",
	},

	hurricane: {
		num: 542,
		accuracy: 70,
		basePower: 110,
		category: "Special",
		name: "Hurricane",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, distance: 1, wind: 1},
		onModifyMove(move, pokemon, target) {
			switch (target?.effectiveWeather()) {
			case 'raindance':
			case 'primordialsea':
				move.accuracy = true;
				break;
			case 'sunnyday':
			case 'desolateland':
				move.accuracy = 50;
				break;
			}
		},
		secondary: {
			chance: 30,
			volatileStatus: 'confusion',
		},
		target: "any",
		type: "Flying",
		contestType: "Tough",
	},

	icywind: {
		num: 196,
		accuracy: 95,
		basePower: 55,
		category: "Special",
		name: "Icy Wind",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, wind: 1},
		secondary: {
			chance: 100,
			boosts: {
				spe: -1,
			},
		},
		target: "allAdjacentFoes",
		type: "Ice",
		contestType: "Beautiful",
	},

	petalblizzard: {
		num: 572,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Petal Blizzard",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, wind: 1},
		secondary: null,
		target: "allAdjacent",
		type: "Grass",
		contestType: "Beautiful",
	},

	sandstorm: {
		num: 201,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Sandstorm",
		pp: 10,
		priority: 0,
		flags: {wind: 1},
		weather: 'Sandstorm',
		secondary: null,
		target: "all",
		type: "Rock",
		zMove: {boost: {spe: 1}},
		contestType: "Tough",
	},

	tailwind: {
		num: 366,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Tailwind",
		pp: 15,
		priority: 0,
		flags: {snatch: 1, wind: 1},
		sideCondition: 'tailwind',
		condition: {
			duration: 4,
			durationCallback(target, source, effect) {
				if (source?.hasAbility('persistent')) {
					this.add('-activate', source, 'ability: Persistent', '[move] Tailwind');
					return 6;
				}
				return 4;
			},
			onSideStart(side, source) {
				if (source?.hasAbility('persistent')) {
					this.add('-sidestart', side, 'move: Tailwind', '[persistent]');
				} else {
					this.add('-sidestart', side, 'move: Tailwind');
				}
			},
			onModifySpe(spe, pokemon) {
				return this.chainModify(2);
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 5,
			onSideEnd(side) {
				this.add('-sideend', side, 'move: Tailwind');
			},
		},
		secondary: null,
		target: "allySide",
		type: "Flying",
		zMove: {effect: 'crit2'},
		contestType: "Cool",
	},

	whirlwind: {
		num: 18,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Whirlwind",
		pp: 20,
		priority: -6,
		flags: {reflectable: 1, mirror: 1, bypasssub: 1, allyanim: 1, wind: 1},
		forceSwitch: true,
		secondary: null,
		target: "normal",
		type: "Normal",
		zMove: {boost: {spd: 1}},
		contestType: "Clever",
	},

	triplearrows: {
		num: 843,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		isNonstandard: "Unobtainable",
		name: "Triple Arrows",
		shortDesc: "High crit. Target: 50% -1 Defense, 30% flinch.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		critRatio: 2,
		secondaries: [
			{
				chance: 50,
				boosts: {
					def: -1,
				},
			}, {
				chance: 30,
				volatileStatus: 'flinch',
			},
		],
		target: "normal",
		type: "Fighting",
	},
};
