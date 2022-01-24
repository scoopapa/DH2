export const Moves: {[k: string]: ModdedMoveData} = {
	toxicthread: {
		num: 672,
		accuracy: 100,
		basePower: 0,
		category: "Status",
    shortDesc: "Badly poisons and lowers the target's Speed by 2",
		isViable: true,
		isNonstandard: null,
		name: "Toxic Thread",
		pp: 20,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1},
		status: 'tox',
		boosts: {
			spe: -2,
		},
		secondary: null,
		target: "normal",
		type: "Poison",
		zMove: {boost: {spe: 1}},
		contestType: "Tough",
	},
 	meltdown: {
		accuracy: 100,
		basePower: 80,
		category: "Special",
    shortDesc: "Replaces the user's Ice-type with Water. 1.5x power when used by Ice-types. Soaks foe.",
		name: "Meltdown",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, defrost: 1},
 		onPrepareHit: function(target, source, move) {
		  this.attrLastMove('[still]');
		  this.add('-anim', source, "Scald", target);
		  this.add('-anim', source, "Acid Armor", target);
		},
		onBasePower(basePower, pokemon, target) {
			if (pokemon.hasType('Ice') && !pokemon.hasType('Water')) {
				return this.chainModify(1.5);
			}
		},
		onHit(target) {
			if (target.getTypes().join() === 'Water' || !target.setType('Water')) {
				// Soak should animate even when it fails.
				// Returning false would suppress the animation.
				this.add('-fail', target);
				return null;
			}
			this.add('-start', target, 'typechange', 'Water');
		},
		self: {
			onHit(pokemon) {
				if (pokemon.hasType('Water')) { 					
				pokemon.setType(pokemon.getTypes(true).map(type => type === "Ice" ? "???" : type));
				this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[from] move: Meltdown');
				} else {
				pokemon.setType(pokemon.getTypes(true).map(type => type === "Ice" ? "Water" : type));
				this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[from] move: Meltdown');
				}
			},
		},
		secondary: null,
		target: "normal",
		type: "Water",
		contestType: "Clever",
	},
/*
 	reconstruct: {
		accuracy: true,
		basePower: 0,
		category: "Status",
    shortDesc: "(Bugged) Charges turn 1. Heals 50% and resets lowered stats turn 2.",
		name: "Reconstruct",
		pp: 10,
		priority: 0,
		flags: {charge: 1, heal: 1},
 		heal: [1, 2],
		beforeTurnCallback(pokemon) {
			pokemon.addVolatile('reconstruct');
		},
		condition: {
			duration: 2,
			onStart(pokemon) {
				this.add('-start', pokemon, 'move: Reconstruct');
			},
			onSourceModifyDamage(damage, source, target, move) {
				if (move.category === 'Special' || move.category === 'Physical') {
					return this.chainModify(0.5);
				}
			},
			onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name);
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
		},
		onAfterMove(pokemon) {
			pokemon.removeVolatile('reconstruct');
		},
		self: {
			onHit(pokemon) {
				const boosts: SparseBoostsTable = {};
				let i: BoostName;
				for (i in pokemon.boosts) {
					if (pokemon.boosts[i] < 0) {
						boosts[i] = 0;
					}
				}
				pokemon.setBoost(boosts);
				this.add('-clearnegativeboost', pokemon, '[silent]');
				this.add('-message', pokemon.name + "'s negative stat changes were removed!");
	    },
		},
		secondary: null,
		target: "self",
		type: "Steel",
	},
 	reconstruct: {
		accuracy: true,
		basePower: 0,
		category: "Status",
    shortDesc: "Charges turn 1. Heals 50% and resets lowered stats turn 2.",
		name: "Reconstruct",
		pp: 10,
		priority: 0,
		flags: {charge: 1, heal: 1},
 		heal: [1, 2],
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name);
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
		self: {
			onHit(pokemon) {
				const boosts: SparseBoostsTable = {};
				let i: BoostName;
				for (i in pokemon.boosts) {
					if (pokemon.boosts[i] < 0) {
						boosts[i] = 0;
					}
				}
				pokemon.setBoost(boosts);
				this.add('-clearnegativeboost', pokemon, '[silent]');
				this.add('-message', pokemon.name + "'s negative stat changes were removed!");
	    },
		},
		secondary: null,
		target: "self",
		type: "Steel",
	},
*/
	reconstruct: {
		accuracy: true,
		basePower: 0,
		category: "Status",
    shortDesc: "Charges turn 1. Heals 50% and resets lowered stats turn 2.",
		name: "Reconstruct",
		pp: 10,
		priority: 5,
		flags: {charge: 1, heal: 1},
		volatileStatus: 'reconstruct',
 		onPrepareHit: function(target, source, move) {
		  this.attrLastMove('[still]');
		  this.add('-anim', source, "Recover", target);
		},
		beforeMoveCallback(pokemon) {
			if (pokemon.volatiles['reconstruct']) return true;
		},
		condition: {
			duration: 2,
			onLockMove: 'reconstruct',
			onStart(pokemon) {
				this.effectData.totalDamage = 0;
				this.add('-start', pokemon, 'move: Reconstruct');
			},
			onSourceModifyDamage(damage, source, target, move) {
				if (move.category === 'Special' || move.category === 'Physical') {
					return this.chainModify(0.5);
				}
			},
			onBeforeMove(pokemon, target, move) {
				if (this.effectData.duration === 1) {
					this.add('-end', pokemon, 'move: Reconstruct');
					const moveData: Partial<ActiveMove> = {
						id: 'reconstruct' as ID,
						name: "Reconstruct",
						accuracy: true,
						category: "Status",
						priority: 0,
						flags: {charge: 1, heal: 1},
						heal: [1, 2],
						effectType: 'Move',
						type: 'Steel',
					};
					this.tryMoveHit(target, pokemon, moveData as ActiveMove);
					return false;
				}
				this.add('-activate', pokemon, 'move: Reconstruct');
			},
			onMoveAborted(pokemon) {
				pokemon.removeVolatile('reconstruct');
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'move: Reconstruct', '[silent]');
			},
		},
		self: {
			onHit(pokemon) {
				const boosts: SparseBoostsTable = {};
				let i: BoostName;
				for (i in pokemon.boosts) {
					if (pokemon.boosts[i] < 0) {
						boosts[i] = 0;
					}
				}
				pokemon.setBoost(boosts);
				this.add('-clearnegativeboost', pokemon, '[silent]');
				this.add('-message', pokemon.name + "'s negative stat changes were removed!");
	    },
		},
		secondary: null,
		target: "self",
		type: "Steel",
		contestType: "Tough",
	},
 	focusblast: {
		num: 411,
		accuracy: 70,
		basePower: 120,
		category: "Special",
    shortDesc: "10% chance to lower the foe's SpD. Never misses if the user moves last.",
		name: "Focus Blast",
		pp: 5,
		priority: 0,
		flags: {bullet: 1, protect: 1, mirror: 1},
		onModifyMove(move, source, target) {
			if (target.newlySwitched || !this.queue.willMove(target)) move.accuracy = true;
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
/*
	aridabsorption: {
		accuracy: true,
		basePower: 0,
		category: "Status",
    shortDesc: "(Placeholder, Currently a Life Dew clone)",
		name: "Arid Absorption",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1},
 		onPrepareHit: function(target, source, move) {
		  this.attrLastMove('[still]');
		  this.add('-anim', source, "Shore Up", target);
		},
		heal: [1, 4],
		secondary: null,
		target: "self",
		type: "Ground",
	},
*/
	aridabsorption: {
		accuracy: true,
		basePower: 0,
		category: "Status",
    shortDesc: "Heals by 33% of its max HP +33% and +1 Atk for every active Water-type. Active Water-types lose 33% of their max HP.",
		name: "Arid Absorption",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1},
 		onPrepareHit: function(target, source, move) {
		  this.attrLastMove('[still]');
		  this.add('-anim', source, "Shore Up", target);
		},
		self: {
			onHit(pokemon, source, move) {
				this.heal(source.baseMaxhp / 3, source, pokemon);
			}
		},
		onHitField(target, source) {
			if (target.hasType('Water')) {
				this.heal(source.baseMaxhp / 3, source, target);
				this.boost({atk: 1}, source);
				this.damage(target.baseMaxhp / 3, target, source);
			}
			if (source.hasType('Water')) {
				this.heal(source.baseMaxhp / 3, source, target);
				this.damage(source.baseMaxhp / 3, source, target);
			}
		},
		secondary: null,
		target: "all",
		type: "Ground",
	},	
	rototiller: {
		num: 563,
		accuracy: true,
		basePower: 0,
		category: "Status",
    shortDesc: "Raises Atk/Def of grounded Grass types by 1, sets Grassy Terrain.",
		isViable: true,
		name: "Rototiller",
		pp: 10,
		priority: 0,
		flags: {distance: 1, nonsky: 1},
		onHitField(target, source) {
			this.field.setTerrain('grassyterrain');
			const targets: Pokemon[] = [];
			let anyAirborne = false;
			for (const pokemon of this.getAllActive()) {
				if (!pokemon.runImmunity('Ground')) {
					this.add('-immune', pokemon);
					anyAirborne = true;
					continue;
				}
				if (pokemon.hasType('Grass')) {
					// This move affects every grounded Grass-type Pokemon in play.
					targets.push(pokemon);
				}
			}
			if (!targets.length && !anyAirborne) return false; // Fails when there are no grounded Grass types or airborne Pokemon
			for (const pokemon of targets) {
				this.boost({atk: 1, def: 1}, pokemon, source);
			}
		},
		secondary: null,
		target: "all",
		type: "Ground",
		zMove: {boost: {atk: 1}},
		contestType: "Tough",
	},
	armthrust: {
		num: 292,
		accuracy: 100,
		basePower: 25,
		category: "Physical",
		name: "Arm Thrust",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1},
		multihit: [2, 5],
		secondary: null,
		target: "normal",
		type: "Fighting",
		contestType: "Tough",
	},
	counterspell: {
		accuracy: 100,
		basePower: 110,
		category: "Special",
    shortDesc: "Uses target's SpA stat in damage calculation. -1 priority.",
		name: "Counterspell",
		pp: 15,
		priority: -1,
		flags: {protect: 1, mirror: 1},
 		onPrepareHit: function(target, source, move) {
		  this.attrLastMove('[still]');
		  this.add('-anim', source, "Psybeam", target);
		},
		useTargetOffensive: true,
		secondary: null,
		target: "normal",
		type: "Fairy",
		contestType: "Clever",
	},
	lightninglance: {
		accuracy: 100,
		basePower: 110,
		category: "Physical",
    shortDesc: "Lowers the user's Attack and Sp. Def by 1.",
		name: "Lightning Lance",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, defrost: 1},
 		onPrepareHit: function(target, source, move) {
		  this.attrLastMove('[still]');
		  this.add('-anim', source, "Charge", target);
		  this.add('-anim', source, "Sacred Sword", target);
		},
		self: {
			boosts: {
				atk: -1,
				spd: -1,
			},
		},
		secondary: null,
		target: "normal",
		type: "Electric",
		contestType: "Cool",
	},
	lifedew: {
		num: 791,
		accuracy: true,
		basePower: 0,
		category: "Status",
    shortDesc: "Heals the user by 50% of its max HP.",
		name: "Life Dew",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1, authentic: 1},
		heal: [1, 2],
		secondary: null,
		target: "allies",
		type: "Water",
	},
	trashtalk: {
		accuracy: 100,
		basePower: 85,
		category: "Special",
    shortDesc: "Prevents the target from using status moves for 1 turn.",
		name: "Trash Talk",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, authentic: 1},
 		onPrepareHit: function(target, source, move) {
		  this.attrLastMove('[still]');
		  this.add('-anim', source, "Confide", target);
		  this.add('-anim', source, "Gunk Shot", target);
		},
		volatileStatus: 'trashtalk',
		condition: {
			duration: 1,
			onStart(target) {
				this.add('-singleturn', target, 'move: Trash Talk');
			},
			onResidualOrder: 12,
			onEnd(target) {
				this.add('-end', target, 'move: Trash Talk');
			},
			onBeforeMovePriority: 5,
			onBeforeMove(attacker, defender, move) {
				if (!move.isZ && !move.isMax && move.category === 'Status' && move.id !== 'mefirst') {
					this.add('cant', attacker, 'move: Trash Talk', move);
					return false;
				}
			},
		},
		secondary: null,
		target: "normal",
		type: "Poison",
		contestType: "Cool",
	},
	deafeningshriek: {
		accuracy: 100,
		basePower: 130,
		category: "Special",
    shortDesc: "Target becomes immune to sound moves after being hit.",
		name: "Deafening Shriek",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, authentic: 1},
 		onPrepareHit: function(target, source, move) {
		  this.attrLastMove('[still]');
		  this.add('-anim', source, "Hyper Voice", target);
		  this.add('-anim', source, "Boomburst", target);
		},
		volatileStatus: 'deafeningshriek',
		condition: {
			onStart(target) {
				this.add('-start', target, 'move: Deafening Shriek');
			},
			onTryHitPriority: 3,
			onTryHit(target, source, move) {
				if (move.target !== 'self' && move.flags['sound']) {
					this.add('-immune', target, '[from] move: Deafening Shriek');
					return null;
				}
			},
		},
		target: "normal",
		type: "Ghost",
		contestType: "Cool",
	},
	enchantedpunch: {
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		defensiveCategory: "Special",
    shortDesc: "Damages target based on Sp. Def, not Defense.",
		name: "Enchanted Punch",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1, punch: 1},
 		onPrepareHit: function(target, source, move) {
		  this.attrLastMove('[still]');
		  this.add('-anim', source, "Meteor Mash", target);
		},
		secondary: null,
		target: "normal",
		type: "Fairy",
		contestType: "Beautiful",
	},
	electroball: {
		num: 486,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Electro Ball",
		pp: 10,
		priority: 0,
		flags: {bullet: 1, protect: 1, mirror: 1},
		useSourceSpeedAsOffensive: true,
		secondary: null,
		target: "normal",
		type: "Electric",
		contestType: "Clever",
		shortDesc: "Uses user's Spe stat as SpA in damage calculation.",
	},
	firepunch: {
		num: 7,
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		name: "Fire Punch",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1},
		secondary: {
			chance: 10,
			status: 'brn',
		},
		target: "normal",
		type: "Fire",
		contestType: "Tough",
	},
	icepunch: {
		num: 8,
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		name: "Ice Punch",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1},
		secondary: {
			chance: 10,
			status: 'frz',
		},
		target: "normal",
		type: "Ice",
		contestType: "Beautiful",
	},
	thunderpunch: {
		num: 9,
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		name: "Thunder Punch",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1},
		secondary: {
			chance: 10,
			status: 'par',
		},
		target: "normal",
		type: "Electric",
		contestType: "Cool",
	},
	skyuppercut: {
		num: 327,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		shortDesc: "Hits Flying-types super effectively. Can hit Pokemon using Bounce, Fly, or Sky Drop.",
		name: "Sky Uppercut",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1},
		onEffectiveness(typeMod, target, type) {
			if (type === 'Flying') return 1;
		},
		secondary: null,
		target: "normal",
		type: "Fighting",
		contestType: "Cool",
	},
	crushclaw: {
		num: 306,
		accuracy: 100,
		basePower: 20,
		category: "Physical",
    shortDesc: "Hits twice. Lowers the target's Def after each hit.",
		isViable: true,
		name: "Crush Claw",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		multihit: 2,
		secondary: {
			chance: 100,
			boosts: {
				def: -1,
			},
    },
		target: "normal",
		type: "Dark",
		maxMove: {basePower: 100},
		contestType: "Cool",
	},
	poisondart: {
		accuracy: true,
		basePower: 40,
		category: "Physical",
    shortDesc: "Usually goes first. 10% chance to poison foe.",
		isViable: true,
		name: "Poison Dart",
		pp: 30,
		priority: 1,
		flags: {protect: 1, mirror: 1},
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
	acidicfists: {
		accuracy: 100,
		basePower: 90,
		category: "Physical",
    shortDesc: "Destroys screens, unless the target is immune. 10% poison chance.",
		isViable: true,
		name: "Acidic Fists",
		pp: 10,
		priority: 0,
		flags: {punch: 1, contact: 1, protect: 1, mirror: 1},
 		onPrepareHit: function(target, source, move) {
		  this.attrLastMove('[still]');
		  this.add('-anim', source, "Poison Jab", target);
		  this.add('-anim', source, "Corrosive Gas", target);
		},
		onTryHit(pokemon) {
			// will shatter screens through sub, before you hit
			if (pokemon.runImmunity('Poison')) {
				pokemon.side.removeSideCondition('reflect');
				pokemon.side.removeSideCondition('lightscreen');
				pokemon.side.removeSideCondition('auroraveil');
			}
		},
		secondary: {
			chance: 10,
			status: 'psn',
		},
		target: "normal",
		type: "Poison",
		contestType: "Cool",
	},
	mudspike: {
		num: 398,
		accuracy: 100,
		basePower: 85,
		category: "Physical",
    shortDesc: "10% poison chance, 30% if the user is a Poison-type",
		isViable: true,
		name: "Mud Spike",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
 		onPrepareHit: function(target, source, move) {
		  this.attrLastMove('[still]');
		  this.add('-anim', source, "Muddy Water", target);
		  this.add('-anim', source, "Corrosive Gas", target);
		},
		onModifyMove(move, pokemon) {
			if (!pokemon.hasType('Poison')) return;
			move.secondaries = [];
			if (pokemon.hasType('Poison')) {
				move.secondaries.push({
					chance: 30,
					status: 'psn',
				});
			}
		},
		secondary: {
			chance: 10,
			status: 'psn',
		},
		target: "normal",
		type: "Ground",
		contestType: "Tough",
	},
	bonemerang: {
		num: 155,
		accuracy: 100,
		basePower: 50,
		category: "Physical",
    shortDesc: "First hit has +1 priority, second hit has -1 priority.",
		isViable: true,
		name: "Bonemerang",
		pp: 10,
		priority: 1,
		flags: {protect: 1, mirror: 1},
		onHit(source, target) {
			if (!target.side.addSlotCondition(target, 'futuremove') && source.hp) return false;
			Object.assign(target.side.slotConditions[target.position]['futuremove'], {
				duration: 1,
				move: 'bonemerang',
				source: target,
				moveData: {
					id: 'bonemerang',
					name: "Bonemerang",
					accuracy: true,
					basePower: 50,
					category: "Physical",
					priority: -1,
					flags: {protect: 1},
					ignoreImmunity: false,
					effectType: 'Move',
					isFutureMove: true,
					type: 'Ground',
				},
			});
			this.add('-start', source, 'move: Bonemerang');
			return null;
		},
		secondary: null,
		target: "normal",
		type: "Ground",
		maxMove: {basePower: 130},
		contestType: "Tough",
	},
	explosion: {
		num: 153,
		accuracy: 100,
		basePower: 500,
		category: "Physical",
		isViable: true,
		name: "Explosion",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		selfdestruct: "always",
		secondary: null,
		target: "allAdjacent",
		type: "Normal",
		contestType: "Beautiful",
	},
	selfdestruct: {
		num: 120,
		accuracy: 100,
		basePower: 340,
		category: "Physical",
		name: "Self-Destruct",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		selfdestruct: "always",
		secondary: null,
		target: "allAdjacent",
		type: "Normal",
		contestType: "Beautiful",
	},
	mistyexplosion: {
		num: 802,
		accuracy: 100,
		basePower: 260,
		category: "Special",
		name: "Misty Explosion",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		selfdestruct: "always",
		onBasePower(basePower, source) {
			if (this.field.isTerrain('mistyterrain') && source.isGrounded()) {
				this.debug('misty terrain boost');
				return this.chainModify(1.5);
			}
		},
		secondary: null,
		target: "allAdjacent",
		type: "Fairy",
	},
	rashpowder: {
		accuracy: 75,
		basePower: 0,
		category: "Status",
    shortDesc: "Burns the target.",
		isViable: true,
		name: "Rash Powder",
		pp: 30,
		priority: 0,
		flags: {powder: 1, protect: 1, reflectable: 1, mirror: 1},
 		onPrepareHit: function(target, source, move) {
		  this.attrLastMove('[still]');
		  this.add('-anim', source, "Spore", target);
		},
		status: 'brn',
		secondary: null,
		target: "normal",
		type: "Grass",
		zMove: {boost: {def: 1}},
		contestType: "Clever",
	},
	
// stuff that needs to be edited because of other stuff
	fling: {
		num: 374,
		accuracy: 100,
		basePower: 0,
		category: "Physical",
		name: "Fling",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, mystery: 1},
		onPrepareHit(target, source, move) {
			if (source.ignoringItem()) return false;
			const item = source.getItem();
			if (!this.singleEvent('TakeItem', item, source.itemData, source, source, move, item)) return false;
			if (!item.fling) return false;
			move.basePower = item.fling.basePower;
			if (item.isBerry) {
				move.onHit = function (foe) {
					if (this.singleEvent('Eat', item, null, foe, null, null)) {
						this.runEvent('EatItem', foe, null, null, item);
						if (item.id === 'leppaberry') foe.staleness = 'external';
					}
					if (item.onEat) foe.ateBerry = true;
				};
			} else if (item.fling.effect) {
				move.onHit = item.fling.effect;
			} else {
				if (!move.secondaries) move.secondaries = [];
				if (item.fling.status) {
					move.secondaries.push({status: item.fling.status});
				} else if (item.fling.volatileStatus) {
					move.secondaries.push({volatileStatus: item.fling.volatileStatus});
				}
			}
			source.addVolatile('fling');
			if (item.id === 'boomerang') {
				source.removeVolatile('fling');
			}
		},
		condition: {
			onUpdate(pokemon) {
				const item = pokemon.getItem();
				pokemon.setItem('');
				pokemon.lastItem = item.id;
				pokemon.usedItemThisTurn = true;
				this.add('-enditem', pokemon, item.name, '[from] move: Fling');
				this.runEvent('AfterUseItem', pokemon, null, null, item);
				pokemon.removeVolatile('fling');
			},
		},
		secondary: null,
		target: "normal",
		type: "Dark",
		contestType: "Cute",
	},
	knockoff: {
		num: 282,
		accuracy: 100,
		basePower: 65,
		category: "Physical",
		name: "Knock Off",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onBasePower(basePower, source, target, move) {
			const item = target.getItem();
			if (!this.singleEvent('TakeItem', item, target.itemData, target, target, move, item)) return;
			if (item.id && item.id !== 'boomerang') {
				return this.chainModify(1.5);
			}
		},
		onAfterHit(target, source) {
			if (source.hp) {
				const item = target.takeItem();
				if (item) {
					this.add('-enditem', target, item.name, '[from] move: Knock Off', '[of] ' + source);
				}
				if (item.id === 'boomerang') {
					this.add('-item', target, this.dex.getItem(item), '[from] item: Boomerang');
					target.setItem(item);				
				}
			}
		},
		secondary: null,
		target: "normal",
		type: "Dark",
		contestType: "Clever",
	},
	stealthrock: {
		inherit: true,
		condition: {
			// this is a side condition
			onStart(side) {
				this.add('-sidestart', side, 'move: Stealth Rock');
			},
			onSwitchIn(pokemon) {
				if (
					pokemon.hasItem('heavydutyboots') || pokemon.hasItem('coalengine')
				) return;
				const typeMod = this.clampIntRange(pokemon.runEffectiveness(this.dex.getActiveMove('stealthrock')), -6, 6);
				this.damage(pokemon.maxhp * Math.pow(2, typeMod) / 8);
			},
		},
	},
};
