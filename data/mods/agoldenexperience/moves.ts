export const Moves: {[k: string]: ModdedMoveData} = {
	tentacatch: {
		num: -1,
		accuracy: 85,
		basePower: 60,
		category: "Physical",
		name: "Tentacatch",
		desc: "Traps and damages the target for 4-5 turns. Lowers the target's Atk by 1 stage.",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		volatileStatus: 'partiallytrapped',
		secondary: {
			chance: 100,
			boosts: {
				atk: -1,
			},
		},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Toxic Thread", target);
		},
		target: "normal",
		type: "Poison",
		contestType: "Tough",
	},
	schuss: {
		num: -2,
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		shortDesc: "User takes 1/3 of damages inflicted.",
		name: "Schuss",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, gravity: 1},
		recoil: [33, 100],
		secondary: null,
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Icicle Crash", target);
		},
		target: "normal",
		type: "Ice",
		contestType: "Cool",
	},
	goodfishing: {
		num: -3,
		accuracy: 100,
		basePower: 65,
		category: "Physical",
		name: "Good Fishing",
		shortDesc: "1.5x if foe holds an item. Removes item and heals 10% of max HP.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onBasePower(basePower, source, target, move) {
			const item = target.getItem();
			if (!this.singleEvent('TakeItem', item, target.itemData, target, target, move, item)) return;
			if (item.id) {
				return this.chainModify(1.5);
			}
		},
		onAfterHit(target, source) {
			if (source.hp) {
				const item = target.takeItem();
				if (item) {
					this.add('-enditem', target, item.name, '[from] move: Good Fishing', '[of] ' + source);
					this.heal(source.maxhp / 10, source);
				}
			}
		},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Brave Bird", target);
		},
		secondary: null,
		target: "normal",
		type: "Flying",
		contestType: "Tough",
	},
	magisterialwind: {
		num: -4,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		shortDesc: "Ignores the target's ability, cannot be redirected.",
		name: "Magisterial Wind",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		ignoreAbility: true,
		tracksTarget: true,
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Tailwind", target);
		},
		secondary: null,
		target: "normal",
		type: "Flying",
		contestType: "Cool",
	},
	stellarpunch: {
		num: -5,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		shortDesc: "Ignores the target's ability.",
		name: "Stellar Punch",
		pp: 10,
		priority: 0,
		flags: {punch: 1, contact: 1, protect: 1, mirror: 1},
		ignoreAbility: true,
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Dynamic Punch", target);
		},
		secondary: null,
		target: "normal",
		type: "Fighting",
		contestType: "Tough",
	},
	toxicthread: {
		num: 672,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		isNonstandard: "Past",
		name: "Toxic Thread",
		pp: 20,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1},
		status: 'tox',
		boosts: {
			spe: -1,
		},
		secondary: null,
		target: "normal",
		type: "Poison",
		zMove: {boost: {spe: 1}},
		contestType: "Tough",
	},
	toxicsting: {
		shortDesc: "50% drain; badly poison target.",
		num: -6,
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		name: "Toxic Sting",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, heal: 1},
		drain: [1, 2],
		secondary: {
			chance: 100,
			status: 'tox',
		},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Poison Fang", target);
      },
		target: "normal",
		type: "Poison",
	},
	detectmagic: {
		num: -7,
		accuracy: 100,
		basePower: 70,
		category: "Special",
		name: "Detect Magic",
		desc: "This move is super effective on Dark type targets.",
		shortDesc: "Super effective on Dark targets.",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onEffectiveness(typeMod, target, type) {
			if (type === 'Dark') return 1;
		},
		onModifyMove(move) {
			if (!move.ignoreImmunity) move.ignoreImmunity = {};
			if (move.ignoreImmunity !== true) {
				move.ignoreImmunity['Psychic'] = true;
			}
		},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Psychic", target);
    },
		target: "normal",
		type: "Psychic",
		contestType: "Beautiful",
	},
	dispelmagic: {
		num: -8,
		accuracy: true,
		basePower: 70,
		category: "Special",
		name: "Dispel Magic",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onHit(target) {
			target.clearBoosts();
			this.add('-clearboost', target);
		},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Psyshock", target);
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
		shortDesc: "The target is cleared from all its stat changes.",
	},
	photopower: {
		num: -9,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Photo-Power",
		shortDesc: "Raises user's Sp. Atk by 2 and Speed by 1 in Sun.",
		pp: 5,
		priority: 0,
		flags: {snatch: 1},
		onModifyMove(move, pokemon) {
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) move.boosts = {spa: 2, spe: 1};
		},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Growth", target);
		},
		secondary: null,
		target: "self",
		type: "Grass",
		zMove: {boost: {spa: 1}},
		contestType: "Beautiful",
	},
	draconicwrath: {
		num: -10,
		accuracy: 100,
		basePower: 50,
		basePowerCallback(pokemon, target, move) {
			if (!target.newlySwitched) {
				this.debug('Draconic Wrath damage boost');
				return move.basePower * 2;
			}
			this.debug('Draconic Wrath NOT boosted');
			return move.basePower;
		},
		category: "Physical",
		name: "Draconic Wrath",
		shortDesc: "If a foe isn't switching in, hits it at 2x power.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Outrage", target);
		},
		secondary: null,
		target: "normal",
		type: "Dragon",
	},
	purifyingstream: {
		num: -11,
		accuracy: true,
		basePower: 90,
		category: "Special",
		name: "Purifying Stream",
		shortDesc: "Resets all of the target's stat stages to 0.",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onHit(target) {
			target.clearBoosts();
			this.add('-clearboost', target);
		},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Scald", target);
		},
		secondary: null,
		target: "normal",
		type: "Water",
		contestType: "Beautiful",
	},
	railwaysmash: {
		num: -12,
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		name: "Railway Smash",
		shortDesc: "Has 33% recoil.",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		recoil: [33, 100],
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Iron Head", target);
		},
		target: "normal",
		type: "Steel",
	},
	// unused due to deleted Fakemons
	/* galvanismash: {
		num: -1457,
		accuracy: 80,
		basePower: 150,
		category: "Physical",
		name: "Galvani-Smash",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		recoil: [1, 2],
		secondary: null,
		target: "normal",
		type: "Electric",
		contestType: "Tough",
	},
	nectack: {
		num: -1228,
		accuracy: 100,
		basePower: 60,
		basePowerCallback(pokemon, target, move) {
			// You can't get here unless the pursuit succeeds
			if (target.beingCalledBack) {
				this.debug('Nectack damage boost');
				return move.basePower * 2;
			}
			return move.basePower;
		},
		category: "Physical",
		name: "Nectack",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, bite: 1},
		beforeTurnCallback(pokemon) {
			for (const side of this.sides) {
				if (side === pokemon.side) continue;
				side.addSideCondition('nectack', pokemon);
				const data = side.getSideConditionData('nectack');
				if (!data.sources) {
					data.sources = [];
				}
				data.sources.push(pokemon);
			}
		},
		onModifyMove(move, source, target) {
			if (target?.beingCalledBack) move.accuracy = true;
		},
		onTryHit(target, pokemon) {
			target.side.removeSideCondition('nectack');
		},
		condition: {
			duration: 1,
			onBeforeSwitchOut(pokemon) {
				this.debug('Nectack start');
				let alreadyAdded = false;
				pokemon.removeVolatile('destinybond');
				for (const source of this.effectState.sources) {
					if (!this.queue.cancelMove(source) || !source.hp) continue;
					if (!alreadyAdded) {
						this.add('-activate', pokemon, 'move: Nectack');
						alreadyAdded = true;
					}
					// Run through each action in queue to check if the Pursuit user is supposed to Mega Evolve this turn.
					// If it is, then Mega Evolve before moving.
					if (source.canMegaEvo || source.canUltraBurst) {
						for (const [actionIndex, action] of this.queue.entries()) {
							if (action.pokemon === source && action.choice === 'megaEvo') {
								this.runMegaEvo(source);
								this.queue.list.splice(actionIndex, 1);
								break;
							}
						}
					}
					this.runMove('nectack', source, this.getTargetLoc(pokemon, source));
				}
			},
		},
		secondary: null,
		target: "normal",
		type: "Water",
		contestType: "Clever",
	},
	deadlybreeze: {
		num: -1573,
		accuracy: 100,
		basePower: 70,
		category: "Special",
		name: "Deadly Breeze",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyMove(move) {
			move.infiltrates = true;
			delete move.flags['protect'];
		},
		onTryHit(target, source, move) {
			if (target.hasType('Steel')) {
				return this.chainModify(2);
			}
		},
		secondary: null,
		target: "normal",
		type: "Ice",
		contestType: "Beautiful",
	},
	overcharge: {
		num: 682,
		accuracy: 100,
		basePower: 130,
		category: "Special",
		name: "Overcharge",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, defrost: 1},
		onTryMove(pokemon, target, move) {
			if (pokemon.hasType('Electric')) return;
			this.add('-fail', pokemon, 'move: Overcharge');
			this.attrLastMove('[still]');
			return null;
		},
		self: {
			onHit(pokemon) {
				pokemon.setType(pokemon.getTypes(true).map(type => type === "Electric" ? "???" : type));
				this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[from] move: Overcharge');
			},
		},
		secondary: null,
		target: "normal",
		type: "Electric",
		contestType: "Clever",
	},
	icebarrier: {
		num: -1661,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Ice Barrier",
		pp: 10,
		priority: 4,
		flags: {},
		stallingMove: true,
		volatileStatus: 'banefulbunker',
		onTryHit(target, source, move) {
			return !!this.queue.willAct() && this.runEvent('StallMove', target);
		},
		onHit(pokemon) {
			pokemon.addVolatile('stall');
		},
		condition: {
			duration: 1,
			onStart(target) {
				this.add('-singleturn', target, 'move: Protect');
			},
			onTryHitPriority: 3,
			onTryHit(target, source, move) {
				if (!move.flags['protect']) {
					if (move.isZ || (move.isMax && !move.breaksProtect)) target.getMoveHitData(move).zBrokeProtect = true;
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
				if (move.flags['contact']) {
					source.trySetStatus('psn', target);
				}
				return this.NOT_FAIL;
			},
			onHit(target, source, move) {
				if (move.isZOrMaxPowered && move.flags['contact']) {
					source.trySetStatus('frz', target);
				}
			},
		},
		secondary: null,
		target: "self",
		type: "Ice",
		zMove: {boost: {def: 1}},
		contestType: "Tough",
	},*/
	rolledballed: {
		num: -13,
		accuracy: 90,
		basePower: 35,
		category: "Physical",
    	shortDesc: "Hits twice. Has a 10% chance to lower the target's Def after each hit.",
		name: "Rolled Balled",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		multihit: 2,
		secondary: {
			chance: 10,
			boosts: {
				def: -1,
			},
		},
		target: "normal",
		type: "Ice",
		contestType: "Cool",
	},
	goldenexperience: {
		num: -14,
		accuracy: 100,
		basePower: 75,
		category: "Physical",
		name: "Golden Experience",
		shortDesc: "Heal 50% of damages dealt.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1, heal: 1},
		drain: [1, 2],
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Moonblast", target);
		},
		secondary: null,
		target: "normal",
		type: "Fairy",
		contestType: "Tough",
	},
	dimensionalbleeding: {
		num: -15,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		name: "Dimensional Bleeding",
		shortDesc: "Physical if Atk > SpA.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hyperspace Fury", target);
		},
		secondary: null,
		target: "normal",
		type: "Dark",
	},
	frostbite: {
		num: -16,
		accuracy: 90,
		basePower: 0,
		category: "Status",
		desc: "The Pokémon at the user's position steals some of the target's maximum HP at the end of each turn. Damage begins at 1/16, rounded down, and increases each turn like Toxic. If Big Root is held by the recipient, the HP recovered is 1.3x normal, rounded half down. If the target uses Baton Pass, the replacement will continue being leeched. If the target switches out, the effect ends.",
		shortDesc: "Target's HP is restored to user every turn. Damage increases like Toxic.",
		name: "Frostbite",
		pp: 10,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1},
		volatileStatus: 'frostbite',
		condition: {
			onStart(target) {
				if (target.hasType('Fire') || target.hasType('Ice')) {
					this.hint("Ice and Fire targets are immune to Frostbite.");
					return;
				}
			  this.effectState.stage = 0;
				this.add('-start', target, 'move: Frostbite');
			},
			onResidualOrder: 8,
			onResidual(pokemon) {
	  		if (this.effectState.stage < 15) {
		  		this.effectState.stage++;
		  	}
				const target = this.effectState.source.side.active[pokemon.volatiles['frostbite'].sourcePosition];
				if (!target || target.fainted || target.hp <= 0) {
					this.debug('Nothing to leech into');
					return;
				}
				const damage = this.damage(this.clampIntRange(pokemon.baseMaxhp / 16, 1) * this.effectState.stage, pokemon, target,); // '[silent]'); //looking at that soon
				if (damage) {
					this.heal(damage, target, pokemon);
				}
			},
		},
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Icy Wind", target);
		},
		secondary: null,
		target: "normal",
		type: "Ice",
		zMove: {boost: {def: 1}},
		contestType: "Clever",
	},
	// aspiravoid: {
	// 	num: -17,
	// 	accuracy: 100,
	// 	basePower: 50,
	// 	category: "Special",
	// 	name: "Aspira-Void",
	// 	pp: 5,
	// 	priority: 0,
	// 	flags: {protect: 1, mirror: 1},
	// 	self: {
	// 		chance: 100,
	// 		boosts: {
	// 			// atk: 1,
	// 			spa: 1,
	// 		},
	// 	},
	// 	secondary: {
	// 		chance: 100,
	// 		boosts: {
	// 			// atk: -1,
	// 			spa: -1,
	// 		},
	// 	},
	// 	target: "normal",
	// 	type: "Dark",
	// 	// shortDesc: "-1 Atk/SpA for target; +1 Atk/SpA for this Pokemon.",
	// 	shortDesc: "-1 SpA for target; +1 SpA for this Pokemon.",
	// 	contestType: "Cool",
	// },
	aspiravoid: {
		num: -17,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Aspira Void",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, heal: 1},
		drain: [1, 2],
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Dark Pulse", target);
		},
		secondary: null,
		target: "normal",
		shortDesc: "Heals 50% of damage dealt.",
		type: "Dark",
		contestType: "Clever",
	},
	underdog: {
		num: -18,
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		name: "Underdog",
		shortDesc: "BP x2 if target's Atk > user's Atk.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onBasePower(basePower, source, target, move) {
			const targetAtk = target.storedStats.atk;
			const sourceAtk = source.storedStats.atk;
			if (targetAtk >= sourceAtk) {
				return this.chainModify(2);
			}
		},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Facade", target);
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		zMove: {boost: {spe: 1}},
		contestType: "Clever",
	},
	flamingsphere: {
		num: -19,
		accuracy: 100,
		basePower: 40,
		category: "Special",
		shortDesc: "Usually goes first.",
		name: "Flaming Sphere",
		pp: 20,
		priority: 1,
		flags: {ballistic: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Pyro Ball", target);
		},
		secondary: null,
		target: "normal",
		type: "Fire",
		contestType: "Tough",
	},
	fireball: {
		num: -20,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		name: "Fire Ball",
		shortDesc: "Ends all existing terrains.",
		pp: 10,
		priority: 0,
		flags: {ballistic: 1, protect: 1, mirror: 1},
		onHit() {
			this.field.clearTerrain();
		},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Pyro Ball", target);
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Fire",
		contestType: "Beautiful",
	},
	backfire: {
		num: -21,
		accuracy: 100,
		basePower: 60,
		basePowerCallback(pokemon, target, move) {
			let bp = move.basePower;
			if (pokemon.volatiles['backfire'] && pokemon.volatiles['backfire'].hitCount) {
				bp += 20 * pokemon.volatiles['backfire'].hitCount;
			}
			if (pokemon.status !== 'slp') pokemon.addVolatile('backfire');
			this.debug("Rollout bp: " + bp);
			return bp;
		},
		category: "Physical",
		name: "Backfire",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		condition: {
			duration: 2,
			onStart() {
				this.effectState.hitCount = 1;
			},
			onRestart() {
				this.effectState.hitCount++;
				if (this.effectState.hitCount < 5) {
					this.effectState.duration = 2;
				}
			},
		},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Overheat", target);
		},
		secondary: null,
		target: "normal",
		type: "Fire",
		contestType: "Tough",
		shortDesc: "This move raises in power after each use (5 turns max).",
	},
	highwater: {
		num: -22,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "User restores 1/2 its max HP; cures status if Rain Dance is active.",
		name: "High Water",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		onHit(pokemon) {
			const factor = 0.5;
			if (this.field.isWeather('raindance') || this.field.isWeather('primordialsea')) {
				const success = !!this.heal(this.modify(pokemon.maxhp, 0.25));
				return pokemon.cureStatus() || success;
			}
			return !!this.heal(this.modify(pokemon.maxhp, factor));
		},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Life Dew", target);
		},
		secondary: null,
		target: "self",
		type: "Water",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Beautiful",
	},
	parallelcircuit: {
		num: -2242,
		accuracy: 95,
		basePower: 25,
		category: "Physical",
		name: "Parallel Circuit",
		shortDesc: "Hits 2-5 times in one turn.",
		desc: "Hits 2-5 times in one turn.",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		multihit: [2, 5],
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Bolt Beak", target);
		},
		secondary: null,
		target: "normal",
		type: "Electric",
		zMove: {basePower: 140},
		maxMove: {basePower: 130},
		contestType: "Cool",
	},
	condensate: {
		num: -23,
		accuracy: 100,
		basePower: 65,
		category: "Special",
		name: "Condensate",
		shortDesc: "Power x2 if on Misty Terrain.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onBasePower(basePower, source) {
			if (this.field.isTerrain('mistyterrain') && source.isGrounded()) {
				this.debug('terrain buff');
				return this.chainModify(2);
			}
		},
		onModifyMove(move, source, target) {
			if (this.field.isTerrain('mistyterrain') && source.isGrounded()) {
				move.target = 'allAdjacentFoes';
			}
		},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Icy Wind", target);
		},
		secondary: null,
		target: "normal",
		type: "Ice",
	},
	chillblain: {
		num: -24,
		accuracy: 85,
		basePower: 0,
		category: "Status",
		name: "Chillblain",
		shortDesc: "Freezes the target.",
		pp: 20,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1},
		status: 'frz',
		ignoreImmunity: false,
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Icy Wind", target);
		},
		secondary: null,
		target: "normal",
		type: "Ice",
		contestType: "Cool",
	},
	monkeypunch: {
		num: -25,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Monkey Punch",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1},
		onEffectiveness(typeMod, target, type) {
			if (type === 'Grass' || type === 'Bug') return 1;
		},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Close Combat", target);
		},
		secondary: null,
		target: "normal",
		type: "Fighting",
		contestType: "Tough",
		shortDesc: "Super effective on Bug and Grass targets.",
	},
	indomitablespirit: {
		num: -26,
		accuracy: 95,
		basePower: 75,
		category: "Special",
		shortDesc: "Power doubles if last move failed or was resisted.",
		name: "Indomitable Spirit",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		basePowerCallback(pokemon, target, move) {
			if (pokemon.moveLastTurnResult === false) return move.basePower * 2; // if the last move failed
			if (pokemon.volatiles['indomitablespirit'].boost === 'lastMoveResisted') return move.basePower * 2; // if the last move was resisted
			return move.basePower;
		},
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Vacuum Wave", target);
		},
		condition: { // this is *not* meant to be set as part of the move; partially defined in scripts.ts!
			onModifyDamage(damage, source, target, move) {
				if (target.getMoveHitData(move).typeMod < 0) {
					this.effectState.boost = 'thisMoveResisted';
					this.debug('set Indomitable Spirit boost');
				}
			},
			onBeforeMove(pokemon) {
				if (this.effectState.boost === 'thisMoveResisted') {
					this.effectState.boost = 'lastMoveResisted';
				} else {
					this.effectState.boost = null;
				}
			},
		},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Aura Sphere", target);
		},
		secondary: null,
		target: "normal",
		type: "Fighting",
	},
	cosmicpunch: {
		num: -27,
		accuracy: 100,
		basePower: 80,
		shortDesc: "Damages target based on SpD, not Def.",
		category: "Physical",
		defensiveCategory: "Special",
		name: "Cosmic Punch",
		pp: 10,
		priority: 0,
		flags: {punch: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Dynamic Punch", target);
		},
		secondary: null,
		target: "normal",
		type: "Fighting",
	},
	dissolution: {
		num: -28,
		accuracy: 100,
		basePower: 70,
		category: "Special",
		name: "Dissolution",
		pp: 15,
		shortDesc: "Supresses the target's ability after hit.",
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onHit(target) {
			if (target.getAbility().isPermanent) return;
			if (target.newlySwitched || this.queue.willMove(target)) return;
			target.addVolatile('gastroacid');
		},
		onAfterSubDamage(damage, target) {
			if (target.getAbility().isPermanent) return;
			if (target.newlySwitched || this.queue.willMove(target)) return;
			target.addVolatile('gastroacid');
		},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Acid Spray", target);
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Poison",
	},
	landslide: {
		num: -29,
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		name: "Landslide",
		shortDesc: "Removes the hazards on the field. Lowers the target's Speed by one stage.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onHit(target, source, move) {
			let success = false;
			if (!target.volatiles['substitute'] || move.infiltrates) success = !!this.boost({spe: -1});
			const removeTarget = [
				'reflect', 'lightscreen', 'auroraveil', 'safeguard', 'mist', 'spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge',
			];
			const removeAll = [
				'spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge',
			];
			for (const targetCondition of removeTarget) {
				if (target.side.removeSideCondition(targetCondition)) {
					if (!removeAll.includes(targetCondition)) continue;
					this.add('-sideend', target.side, this.dex.conditions.get(targetCondition).name, '[from] move: Landslide', '[of] ' + source);
					success = true;
				}
			}
			for (const sideCondition of removeAll) {
				if (source.side.removeSideCondition(sideCondition)) {
					this.add('-sideend', source.side, this.dex.conditions.get(sideCondition).name, '[from] move: Landslide', '[of] ' + source);
					success = true;
				}
			}
			return success;
		},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Mud Shot", target);
		},
		target: "normal",
		type: "Ground",
		contestType: "Tough",
	},
	epicenter: {
		num: -30,
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		name: "Epicenter",
		shortDesc: "This move hits 2 turns later.",
		pp: 10,
		priority: 0,
		flags: {},
		ignoreImmunity: true,
		isFutureMove: true,
		onTry(source, target) {
			if (!target.side.addSlotCondition(target, 'futuremove')) return false;
			Object.assign(target.side.slotConditions[target.position]['futuremove'], {
				duration: 3,
				move: 'epicenter',
				source: source,
				moveData: {
					id: 'epicenter',
					name: "epicenter",
					accuracy: 100,
					basePower: 120,
					category: "Physical",
					priority: 0,
					flags: {},
					ignoreImmunity: false,
					effectType: 'Move',
					isFutureMove: true,
					type: 'Ground',
				},
			});
			this.add('-start', source, 'move: Epicenter');
			return null;
		},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Mud Shot", target);
		},
		secondary: null,
		target: "normal",
		type: "Ground",
		contestType: "Tough",
	},
	downdraft: {
		num: -31,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		name: "Downdraft",
		desc: "If the opponent is Flying type or has Levitate, the opponent's Speed is lowered by one stage.",
		shortDesc: "-1 Speed if the target has Levitate or is Flying type.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onAfterHit(this, target, source, move) {
			if (!(target.isGrounded())) {
				this.boost({spe: -1}, target, target, null, true);
			}
		},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hurricane", target);
		},
		secondary: null,
		target: "any",
		type: "Flying",
		contestType: "Cool",
	},
	golemstrike: {
		num: -32,
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		name: "Golem Strike",
		pp: 10,
		shortDesc: "10% chance to lower target's Def",
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 10,
			boosts: {
				def: -1,
			},
		},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Rock Wrecker", target);
		},
		target: "normal",
		type: "Rock",
		contestType: "Tough",
	},
	punishingblow: {
		num: -33,
		accuracy: 90,
		basePower: 80,
		category: "Physical",
		name: "Punishing Blow",
		shortDesc: "If the target has boosts, this move always results in a critical hit.",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onModifyCritRatio(critRatio, source, target) {
			if (target.hasBoosts) return 5;
		},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Wicked Blow", target);
		},
		secondary: null,
		target: "normal",
		type: "Ghost",
		contestType: "Cool",
	},
	draconiccurse: {
		num: -34,
		accuracy: 95,
		basePower: 80,
		category: "Special",
		name: "Draconic Curse",
		desc: "This move has 10% chance to lower every stat of the opponent.",
		shortDesc: "10% chance to lower opponent's stats.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 10,
			boosts: {
				atk: -1,
				def: -1,
				spa: -1,
				spd: -1,
				spe: -1,
			},
		},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Dragon Pulse", target);
		},
		target: "normal",
		type: "Dragon",
		contestType: "Tough",
	},
	draconicfury: {
		num: -35,
		accuracy: 100,
		basePower: 95,
		category: "Physical",
		name: "Draconic Fury",
		shortDesc: "Has a 10% to lower the target's Def.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 10,
			boosts: {
				def: -1,
			},
		},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Outrage", target);
		},
		target: "normal",
		type: "Dragon",
		contestType: "Cool",
	},
	contrariety: {
		num: -36,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Contrariety",
		shortDesc: "Every Pokemon on the field gets Contrary as an ability.",
		pp: 15,
		priority: 0,
		flags: {},
		onHitField() {
			let success = false;
			for (const pokemon of this.getAllActive()) {
				if (pokemon.ability === 'truant' || pokemon.ability === 'contrary' || pokemon.getAbility().isPermanent) continue;
				const oldAbility = pokemon.setAbility('contrary');
				if (oldAbility) this.add('-ability', pokemon, 'Contrary', '[from] move: Contrary');
				success = true;
			}
			return success;
		},
		secondary: null,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Torment", target, source);
		},
		target: "all",
		type: "Dark",
		zMove: {boost: {def: 1}},
	},
	hypnotichorror: {
		num: -37,
		accuracy: 100,
		basePower: 120,
		category: "Special",
		name: "Hypnotic Horror",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		self: {
			boosts: {
				spa: -1,
				spd: -1,
			},
		},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Night Daze", target);
		},
		secondary: null,
		target: "normal",
		shortDesc: "Lowers the user's SpA and SpD by one afterward.",
		type: "Dark",
		contestType: "Tough",
	},
	sneakyassault: {
		num: -38,
		accuracy: 100,
		basePower: 30,
		category: "Physical",
    	shortDesc: "Hits three times. Each hit has 10% to lower the target's Def.",
		isViable: true,
		name: "Sneaky Assault",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		multihit: 3,
		secondary: {
			chance: 10,
			boosts: {
				def: -1,
		   },
		},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Lash Out", target);
		},
		target: "normal",
		type: "Dark",
		contestType: "Cool",
	},
	mercuryshot: {
		num: -39,
		accuracy: 100,
		basePower: 70,
		category: "Special",
		name: "Mercury Shot",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, defrost: 1},
		thawsTarget: true,
		secondary: {
			chance: 30,
			status: 'psn',
		},
		shortDesc: "30% to poison the target.",
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Flash Cannon", target);
		},
		target: "normal",
		type: "Steel",
		contestType: "Tough",
	},
	chakraterrain: {
		num: -40,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Chakra Terrain",
		desc: "Summons Chakra Terrain for 5 turns. All Fighting moves have full accuracy, and pulse moves have x1.3 power.",
		shortDesc: "Summons Chakra Terrain. 100% Acc for Fighting moves; x1.3 BP for pulse moves.",
		pp: 10,
		priority: 0,
		flags: {nonsky: 1},
		terrain: 'chakraterrain',
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			onBasePowerPriority: 6,
			onBasePower(basePower, attacker, defender, move) {
				if (move.flags['pulse'] && attacker.isGrounded() && !attacker.isSemiInvulnerable()) {
					this.debug('chakra terrain boost');
					return this.chainModify([0x14CD, 0x1000]);
				}
			},
			onStart(battle, source, effect) {
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Chakra Terrain', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Chakra Terrain');
				}
			},
			onAnyAccuracy(accuracy, target, source, move) {
				if (move.type === 'Fighting' && (source === this.effectState.target || target === this.effectState.target) && (target.isGrounded() && !target.isSemiInvulnerable())) {
					return true;
				}
				return accuracy;
			},
			onResidualOrder: 21,
			onResidualSubOrder: 2,
			onEnd() {
				this.add('-fieldend', 'move: Chakra Terrain');
			},
		},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Gravity", target);
		},
		secondary: null,
		target: "all",
		type: "Fighting",
		zMove: {boost: {spe: 1}},
		contestType: "Clever",
	},
	naturepower: {
		num: 267,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Nature Power",
		pp: 20,
		priority: 0,
		flags: {},
		onTryHit(target, pokemon) {
			let move = 'triattack';
			if (this.field.isTerrain('electricterrain')) {
				move = 'thunderbolt';
			} else if (this.field.isTerrain('grassyterrain')) {
				move = 'energyball';
			} else if (this.field.isTerrain('mistyterrain')) {
				move = 'moonblast';
			} else if (this.field.isTerrain('psychicterrain')) {
				move = 'psychic';
			} else if (this.field.isTerrain('chakraterrain')) {
				move = 'aurasphere';
			}
			this.useMove(move, pokemon, target);
			return null;
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Beautiful",
	},
	terrainpulse: {
		num: 805,
		accuracy: 100,
		basePower: 50,
		category: "Special",
		name: "Terrain Pulse",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, pulse: 1},
		onModifyType(move, pokemon) {
			if (!pokemon.isGrounded()) return;
			switch (this.field.terrain) {
			case 'electricterrain':
				move.type = 'Electric';
				break;
			case 'grassyterrain':
				move.type = 'Grass';
				break;
			case 'mistyterrain':
				move.type = 'Fairy';
				break;
			case 'psychicterrain':
				move.type = 'Psychic';
				break;
			case 'chakraterrain':
				move.type = 'Fighting';
				break;
			}
		},
		onModifyMove(move, pokemon) {
			if (this.field.terrain && pokemon.isGrounded()) {
				move.basePower *= 2;
			}
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		zMove: {basePower: 160},
		maxMove: {basePower: 130},
	},
	sonicboom: {
		inherit: true,
		damage: null,
		basePower: 40,
		category: "Special",
		desc: "Priority +1, Sound move.",
		shortDesc: "Usually goes first. Sound Move.",
		name: "Sonic Boom",
		priority: 1,
		isNonstandard: null,
		flags: {sound: 1, protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Normal",
	},
	rockwrecker: {
		num: 439,
		accuracy: 90,
		basePower: 140,
		category: "Physical",
		name: "Rock Wrecker",
		shortDesc: "Lowers the user's Atk by 2 afterward.",
		pp: 5,
		priority: 0,
		flags: {bullet: 1, protect: 1, mirror: 1},
		self: {
			boosts: {
				atk: -2,
			},
		},
		secondary: null,
		target: "normal",
		type: "Rock",
		contestType: "Tough",
	},
	triplekick: {
		num: 167,
		accuracy: 90,
		basePower: 20,
		basePowerCallback(pokemon, target, move) {
			return 20 * move.hit;
		},
		category: "Physical",
		name: "Triple Kick",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		multihit: 3,
		multiaccuracy: true,
		secondary: null,
		target: "normal",
		type: "Fighting",
		zMove: {basePower: 120},
		maxMove: {basePower: 80},
		contestType: "Cool",
	},
	playrough: {
		num: 583,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Play Rough",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 10,
			boosts: {
				atk: -1,
			},
		},
		target: "normal",
		type: "Fairy",
		contestType: "Cute",
	},
	payback: {
		num: 371,
		accuracy: 100,
		basePower: 60,
		basePowerCallback(pokemon, target, move) {
			if (target.newlySwitched || this.queue.willMove(target)) {
				this.debug('Payback NOT boosted');
				return move.basePower;
			}
			this.debug('Payback damage boost');
			return move.basePower * 2;
		},
		category: "Physical",
		name: "Payback",
		shortDesc: "Usually goes last. Power doubles if the user moves after the target.",
		pp: 10,
		priority: -1,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Dark",
		contestType: "Tough",
	},
	powdersnow: {
		num: 181,
		accuracy: 100,
		basePower: 20,
		category: "Special",
		name: "Powder Snow",
		pp: 25,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 100,
			status: 'frz',
		},
		target: "allAdjacentFoes",
		type: "Ice",
		contestType: "Beautiful",
		shortDesc: "Has a 100% chance to Freeze the target.",
	},
	nightdaze: {
		num: 539,
		accuracy: 95,
		basePower: 95,
		category: "Special",
		name: "Night Daze",
		shortDesc: "20% chance to lower target's Atk.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 20,
			boosts: {
				atk: -1,
			},
		},
		target: "normal",
		type: "Dark",
		contestType: "Cool",
	},
	batonpass: {
		inherit: true,
		shortDesc: "User switches, passing Substitute and more. No longer passes stats.",
		self: {
			onHit(source) {
				if (source.positiveBoosts()) {
					source.clearBoosts();
					this.add('-clearpositiveboost', source);
				}
			},
		},
	},
	lowsweep: {
		num: 490,
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		name: "Low Sweep",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 100,
			boosts: {
				spe: -1,
			},
		},
		target: "normal",
		type: "Fighting",
		contestType: "Clever",
	},
	powergem: {
		num: 408,
		accuracy: 100,
		basePower: 95,
		category: "Special",
		name: "Power Gem",
		shortDesc: "10% chance to raise user's Def by one.",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 10,
			self: {
				boosts: {
					def: 1,
				},
			},
		},
		target: "normal",
		type: "Rock",
		contestType: "Beautiful",
	},
	roaroftime: {
		num: 459,
		accuracy: 95,
		basePower: 100,
		category: "Special",
		name: "Roar of Time",
		pp: 5,
		priority: 0,
		onHit() {
			this.field.clearTerrain();
			this.field.clearWeather();
		},
		shortDesc: "Clears all terrains and weathers after hit.",
		flags: {protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Dragon",
		contestType: "Beautiful",
	},
	spacialrend: {
		num: 460,
		accuracy: 95,
		basePower: 100,
		category: "Special",
		name: "Spacial Rend",
		shortDesc: "Ends active rooms.",
		pp: 5,
		priority: 0,
		onAfterHit(target, source) {
			this.field.removePseudoWeather('trickroom');
			this.field.removePseudoWeather('magicroom');
			this.field.removePseudoWeather('wonderroom');
		},
		flags: {protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Dragon",
		contestType: "Beautiful",
	},
	darkvoid: {
		num: 464,
		accuracy: 80,
		basePower: 0,
		category: "Status",
		isNonstandard: "Past",
		name: "Dark Void",
		pp: 10,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1},
		status: 'slp',
		onTryMove(pokemon, target, move) {
			if (pokemon.species.name === 'Darkrai' || move.hasBounced) {
				return;
			}
			this.add('-fail', pokemon, 'move: Dark Void');
			this.hint("Only a Pokemon whose form is Darkrai can use this move.");
			return null;
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Dark",
		contestType: "Clever",
	},
	freezeshock: {
		num: 553,
		accuracy: 90,
		basePower: 140,
		category: "Physical",
		name: "Freeze Shock",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		self: {
			boosts: {
				atk: -2,
			},
		},
		secondary: {
			chance: 30,
			status: 'par',
		},
		target: "normal",
		type: "Ice",
		contestType: "Beautiful",
	},
	iceburn: {
		num: 554,
		accuracy: 90,
		basePower: 140,
		category: "Special",
		name: "Ice Burn",
		pp: 5,
		priority: 0,
		flags: {charge: 1, protect: 1, mirror: 1},
		self: {
			boosts: {
				spa: -2,
			},
		},
		secondary: {
			chance: 30,
			status: 'brn',
		},
		target: "normal",
		type: "Ice",
		contestType: "Beautiful",
	},
	relicsong: {
		num: 547,
		accuracy: 100,
		basePower: 95,
		category: "Special",
		isNonstandard: "Past",
		name: "Relic Song",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, authentic: 1},
		secondary: {
			chance: 10,
			status: 'slp',
		},
		onHit(target, pokemon, move) {
			if (pokemon.baseSpecies.baseSpecies === 'Meloetta' && !pokemon.transformed) {
				move.willChangeForme = true;
			}
		},
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (move.willChangeForme) {
				const meloettaForme = pokemon.species.id === 'meloettapirouette' ? '' : '-Pirouette';
				pokemon.formeChange('Meloetta' + meloettaForme, this.effect, false, '[msg]');
			}
		},
		self: {
			sideCondition: 'luckychant',
		},
		target: "allAdjacentFoes",
		type: "Normal",
		contestType: "Beautiful",
	},
	multiattack: {
		num: 718,
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		name: "Multi-Attack",
		shortDesc: "Changes type to match user's first type.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onModifyType(move, pokemon) {
			let type = pokemon.types[0];
			if (type === "Bird") type = "???";
			move.type = type;
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		zMove: {basePower: 185},
		maxMove: {basePower: 95},
		contestType: "Tough",
	},
	prismaticlaser: {
		num: 711,
		accuracy: 100,
		basePower: 130,
		category: "Special",
		name: "Prismatic Laser",
		pp: 10,
		priority: 0,
		flags: {charge: 1, protect: 1, mirror: 1},
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name);
			this.boost({spa: 1}, attacker, attacker, move);
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
		contestType: "Cool",
	},
	photongeyser: {
		num: 722,
		accuracy: 100,
		basePower: 100,
		basePowerCallback(pokemon, target, move) {
			if (pokemon.species.name === 'Necrozma-Ultra' && pokemon.hasAbility('neuroforce')) {
				return move.basePower + 20;
			}
			return move.basePower;
		},
		category: "Special",
		name: "Photon Geyser",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		ignoreAbility: true,
		secondary: null,
		target: "normal",
		type: "Psychic",
		contestType: "Cool",
	},
	eternabeam: {
		num: 795,
		accuracy: 100,
		basePower: 150,
		category: "Special",
		name: "Eternabeam",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		mindBlownRecoil: true,
		onAfterMove(pokemon, target, move) {
			if (move.mindBlownRecoil && !move.multihit) {
				this.damage(Math.round(pokemon.maxhp / 2), pokemon, pokemon, this.dex.conditions.get('Eternabeam'), true);
			}
		},
		secondary: null,
		target: "normal",
		type: "Dragon",
		shortDesc: "User loses 50% max HP.",
	},
	wickedblow: {
		num: 817,
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		name: "Wicked Blow",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, punch: 1, mirror: 1},
		willCrit: true,
		secondary: null,
		target: "normal",
		type: "Dark",
	},
	bouncybubble: {
		num: 733,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		shortDesc: "Heals 50% of damages dealt.",
		name: "Bouncy Bubble",
		pp: 20,
		priority: 0,
		flags: {protect: 1, heal: 1},
		drain: [1, 2],
		secondary: null,
		target: "normal",
		type: "Water",
		contestType: "Clever",
	},
	buzzybuzz: {
		num: 734,
		accuracy: 100,
		basePower: 120,
		category: "Special",
		shortDesc: "10% to paralyze target.",
		name: "Buzzy Buzz",
		pp: 10,
		priority: 0,
		flags: {protect: 1},
		secondary: {
			chance: 10,
			status: 'par',
		},
		target: "normal",
		type: "Electric",
		contestType: "Clever",
	},
	sizzlyslide: {
		num: 735,
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		shortDesc: "30% chance to burn target.",
		name: "Sizzly Slide",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, defrost: 1},
		secondary: {
			chance: 30,
			status: 'brn',
		},
		target: "normal",
		type: "Fire",
		contestType: "Clever",
	},
	glitzyglow: {
		num: 736,
		accuracy: 90,
		basePower: 70,
		category: "Special",
		shortDesc: "-1 SpA/SpD to target.",
		name: "Glitzy Glow",
		pp: 24,
		priority: 0,
		flags: {protect: 1},
		boosts: {
			spa: -1,
			spd: -1,
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
		contestType: "Clever",
	},
	baddybad: {
		num: 737,
		accuracy: 90,
		basePower: 70,
		category: "Special",
		shortDesc: "-1 Atk/Def to target.",
		name: "Baddy Bad",
		pp: 24,
		priority: 0,
		flags: {protect: 1},
		boosts: {
			atk: -1,
			def: -1,
		},
		secondary: null,
		target: "normal",
		type: "Dark",
		contestType: "Clever",
	},
	sappyseed: {
		num: 738,
		accuracy: 100,
		basePower: 40,
		category: "Physical",
		shortDesc: "Inflicts Leech Seed to the opponent.",
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
	freezyfrost: {
		num: 739,
		accuracy: 90,
		basePower: 100,
		category: "Special",
		shortDesc: "Sets Haze.",
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
	sparklyswirl: {
		num: 740,
		accuracy: 100,
		basePower: 120,
		category: "Special",
		shortDesc: "Sets Lucky Chant.",
		name: "Sparkly Swirl",
		pp: 5,
		priority: 0,
		flags: {protect: 1},
		self: {
			sideCondition: 'luckychant',
		},
		secondary: null,
		target: "normal",
		type: "Fairy",
		contestType: "Clever",
	},
	ragingfury: {
		num: -1200,
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		name: "Raging Fury",
		shortDesc: "Lasts 2-3 turns. Confuses the user afterwards.",
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
		type: "Fire",
		contestType: "Cool",
	},
	chloroblast: {
		desc: "This move has 50% recoil. Hits target for at least neutral damages.",
		num: -1720,
		accuracy: 100,
		basePower: 120,
		category: "Special",
		name: "Chloroblast",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		mindBlownRecoil: true,
		onModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).typeMod < 0) {
				this.debug('Tinted Lens boost');
				return this.chainModify(2);
			}
		},
		onAfterMove(pokemon, target, move) {
			if (move.mindBlownRecoil && !move.multihit) {
				this.damage(Math.round(pokemon.maxhp / 2), pokemon, pokemon, this.dex.conditions.get('Mind Blown'), true);
			}
		},
		secondary: null,
		target: "allAdjacent",
		type: "Grass",
		contestType: "Cool",
	},
	infernalparade: {
		num: -1506,
		accuracy: 100,
		basePower: 60,
		basePowerCallback(pokemon, target, move) {
			if (target.status === 'brn' || target.hasAbility('comatose')) return move.basePower * 2;
			return move.basePower;
		},
		category: "Special",
		name: "Infernal Parade",
		shortDesc: "Has a 30% chance to burn the target. Power doubles if the target is burned.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			status: 'brn',
		},
		target: "normal",
		type: "Ghost",
		zMove: {basePower: 160},
		contestType: "Clever",
	},
	/* ceaselessedge: {
		num: -1463,
		accuracy: 90,
		basePower: 80,
		category: "Physical",
		name: "Ceaseless Edge",
		shortDesc: "Traps and damages the target for 4-5 turns.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		volatileStatus: 'partiallytrapped',
		secondary: null,
		target: "normal",
		type: "Dark",
		contestType: "Tough",
	},*/
	ceaselessedge: {
		shortDesc: "Sets Spikes after damage.",
		num: -1006,
		accuracy: 100,
		basePower: 65,
		category: "Physical",
		name: "Ceaseless Edge",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Night Slash", target);
		},
		sideCondition: 'spikes',
		secondary: null,
		target: "adjacentFoe",
		type: "Dark",
		contestType: "Cool",
	},
	victorydance: {
		num: -1483,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Victory Dance",
		shortDesc: "Raises the user's Atk, Def, Speed by 1.",
		pp: 20,
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
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Beautiful",
	},
	bittermalice: {
		num: -1506,
		accuracy: 100,
		basePower: 60,
		basePowerCallback(pokemon, target, move) {
			if (target.status === 'frz' || target.hasAbility('comatose')) return move.basePower * 2;
			return move.basePower;
		},
		category: "Special",
		name: "Bitter Malice",
		shortDesc: "Has a 30% chance to freeze the target. Power doubles if the target is frozen.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			status: 'frz',
		},
		target: "normal",
		type: "Ghost",
		zMove: {basePower: 160},
		contestType: "Clever",
	},
	/* esperwing: {
		num: -1094,
		accuracy: 100,
		basePower: 95,
		category: "Special",
		name: "Esper Wing",
		shortDesc: "30% chance to lower the target's Sp. Def by 1.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			boosts: {
				spd: -1,
			},
		},
		target: "normal",
		type: "Psychic",
		contestType: "Clever",
	},
	mountaingale: {
		num: -1556,
		accuracy: 85,
		basePower: 115,
		category: "Physical",
		name: "Mountain Gale",
		shortDesc: "10% chance to lower the target's Def by 1.",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 10,
			boosts: {
				def: -1,
			},
		},
		target: "normal",
		type: "Ice",
		contestType: "Beautiful",
	},*/
	esperwing: {
		num: 840,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Esper Wing",
		shortDesc: "100% chance to raise user Speed by 1. High crit.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		critRatio: 2,
		secondary: {
			chance: 100,
			self: {
				boosts: {
					spe: 1,
				},
			},
		},
		target: "normal",
		type: "Psychic",
	},
	mountaingale: {
		num: 836,
		accuracy: 85,
		basePower: 100,
		category: "Physical",
		name: "Mountain Gale",
		shortDesc: "30% chance to make the target flinch.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			volatileStatus: 'flinch',
		},
		target: "normal",
		type: "Ice",
	},
	shelter: {
		num: -1661,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Shelter",
		pp: 10,
		priority: 4,
		flags: {},
		stallingMove: true,
		volatileStatus: 'shelter',
		onTryHit(target, source, move) {
			return !!this.queue.willAct() && this.runEvent('StallMove', target);
		},
		onHit(pokemon) {
			pokemon.addVolatile('stall');
		},
		condition: {
			duration: 1,
			onStart(target) {
				this.add('-singleturn', target, 'move: Protect');
			},
			onTryHitPriority: 3,
			onTryHit(target, source, move) {
				if (!move.flags['protect']) {
					if (move.isZ || (move.isMax && !move.breaksProtect)) target.getMoveHitData(move).zBrokeProtect = true;
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
				if (move.flags['contact']) {
					source.clearBoosts();
					this.add('-clearboost', source);
				}
				return this.NOT_FAIL;
			},
			onHit(target, source, move) {
				if (move.isZOrMaxPowered && move.flags['contact']) {
					source.clearBoosts();
					this.add('-clearboost', source);
				}
			},
		},
		secondary: null,
		target: "self",
		type: "Steel",
		zMove: {boost: {def: 1}},
		contestType: "Tough",
		shortDesc: "Protects from moves. Contact: resets opponent's stat boosts.",
	},
	triplearrows: {
		num: -1612,
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		name: "Triple Arrows",
		desc: "100% chance to raise the user's Speed by 1 stage. Raise crit ratio by 2 stages. Target: 50% -1 Defense.",
		shortDesc: "100% chance to +1 Speed; +2 crit ratio; -1 Def to target.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onModifyCritRatio(critRatio) {
			return critRatio + 2;
		},
		secondaries: [
			{
				chance: 50,
				boosts: {
					def: -1,
				},
			}, {
				chance: 100,
				self: {
					boosts: {
						spe: 1,
					},
				},
			},
		],
		target: "normal",
		type: "Fighting",
		contestType: "Tough",
	},
	// triplearrows: {
	// 	num: 843,
	// 	accuracy: 100,
	// 	basePower: 90,
	// 	category: "Physical",
	// 	shortDesc: "High crit. Target: 50% -1 Defense, 30% flinch.",
	// 	name: "Triple Arrows",
	// 	pp: 10,
	// 	priority: 0,
	// 	flags: {protect: 1, mirror: 1},
	// 	critRatio: 2,
	// 	secondaries: [
	// 		{
	// 			chance: 50,
	// 			boosts: {
	// 				def: -1,
	// 			},
	// 		}, {
	// 			chance: 30,
	// 			volatileStatus: 'flinch',
	// 		},
	// 	],
	// 	target: "normal",
	// 	type: "Fighting",
	// },
	/* psyshieldbash: {
		num: -1776,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		name: "Psyshield Bash",
		shortDesc: "Uses user's Def stat as Atk in damage calculation.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		useSourceDefensiveAsOffensive: true,
		secondary: null,
		target: "normal",
		type: "Psychic",
	},
	stoneaxe: {
		num: -1317,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Stone Axe",
		shortDesc: "30% chance to lower the target's Defense by 1.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			boosts: {
				def: -1,
			},
		},
		target: "normal",
		type: "Rock",
		contestType: "Clever",
	},*/
	psyshieldbash: {
		shortDesc: "100% chance to raise the user's Defense by 1.",
		num: -1013,
		accuracy: 90,
		basePower: 70,
		category: "Physical",
		name: "Psyshield Bash",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Zen Headbutt", target);
		},
		secondary: {
			chance: 100,
			self: {
				boosts: {
					def: 1,
				},
			},
		},
		target: "normal",
		type: "Psychic",
		contestType: "Clever",
	},
	stoneaxe: {
		shortDesc: "Sets Stealth Rock after damage.", banefulbunker: {
			num: 661,
			accuracy: true,
			basePower: 0,
			category: "Status",
			name: "Baneful Bunker",
			pp: 10,
			priority: 4,
			flags: {},
			stallingMove: true,
			volatileStatus: 'banefulbunker',
			onTryHit(target, source, move) {
				return !!this.queue.willAct() && this.runEvent('StallMove', target);
			},
			onHit(pokemon) {
				pokemon.addVolatile('stall');
			},
			condition: {
				duration: 1,
				onStart(target) {
					this.add('-singleturn', target, 'move: Protect');
				},
				onTryHitPriority: 3,
				onTryHit(target, source, move) {
					if (!move.flags['protect']) {
						if (move.isZ || (move.isMax && !move.breaksProtect)) target.getMoveHitData(move).zBrokeProtect = true;
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
					if (move.flags['contact']) {
						source.trySetStatus('psn', target);
					}
					return this.NOT_FAIL;
				},
				onHit(target, source, move) {
					if (move.isZOrMaxPowered && move.flags['contact']) {
						source.trySetStatus('psn', target);
					}
				},
			},
			secondary: null,
			target: "self",
			type: "Poison",
			zMove: {boost: {def: 1}},
			contestType: "Tough",
		},
		num: -1014,
		accuracy: 100,
		basePower: 65,
		category: "Physical",
		name: "Stone Axe",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Stone Edge", target);
		},
		sideCondition: 'stealthrock',
		secondary: null,
		target: "adjacentFoe",
		type: "Rock",
		contestType: "Tough",
	},
	headlongrush: {
		num: -1370,
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		name: "Headlong Rush",
		shortDesc: "Lowers the user's Defense and Sp. Def by 1.",
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
		type: "Ground",
		contestType: "Tough",
	},
	// wavecrash: {
	// 	num: -1710,
	// 	accuracy: 100,
	// 	basePower: 75,
	// 	category: "Physical",
	// 	name: "Wave Crash",
	// 	shortDesc: "Has 33% recoil. 100% chance to raise the user's Speed by 1.",
	// 	pp: 10,
	// 	priority: 0,
	// 	flags: {contact: 1, protect: 1, mirror: 1},
	// 	recoil: [1, 3],
	// 	secondary: {
	// 		chance: 100,
	// 		self: {
	// 			boosts: {
	// 				spe: 1,
	// 			},
	// 		},
	// 	},
	// 	target: "normal",
	// 	type: "Water",
	// 	contestType: "Cool",
	// },
	wavecrash: {
		num: -1710,
		accuracy: 100,
		basePower: 75,
		category: "Physical",
		name: "Wave Crash",
		shortDesc: "Has 33% recoil. Usually goes first.",
		pp: 10,
		priority: 1,
		flags: {contact: 1, protect: 1, mirror: 1},
		recoil: [1, 3],
		secondary: null,
		target: "normal",
		type: "Water",
		contestType: "Cool",
	},
	direclaw: {
		num: -1398,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Dire Claw",
		shortDesc: "50% chance to poison the target.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 50,
			status: 'psn',
		},
		target: "normal",
		type: "Poison",
		contestType: "Tough",
	},
	barbbarrage: {
		num: -1506,
		accuracy: 100,
		basePower: 70,
		basePowerCallback(pokemon, target, move) {
			if (target.status === 'psn' || target.hasAbility('comatose')) return move.basePower * 2;
			return move.basePower;
		},
		category: "Physical",
		name: "Barb Barrage",
		shortDesc: "Has a 30% chance to poison the target. Power doubles if the target is poisonned.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 50,
			status: 'psn',
		},
		target: "normal",
		type: "Poison",
	},
	takeheart: {
		num: 850,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "User cures its status and boosts its SpA & SpD by 1.",
		name: "Take Heart",
		pp: 15,
		priority: 0,
		flags: {snatch: 1},
		onHit(pokemon) {
			const success = !!this.boost({spa: 1, spd: 1});
			return pokemon.cureStatus() || success;
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Calm Mind", target);
		},
		secondary: null,
		target: "self",
		type: "Psychic",
	},
	fissure: {
		num: 90,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Fissure",
		desc: "10% chance to lower the target's Defense by 1.",
		shortDesc: "10% chance to lower the target's Defense by 1.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, nonsky: 1},
		secondary: {
			chance: 10,
			boosts: {
				def: -1,
			},
		},
		target: "normal",
		type: "Ground",
		contestType: "Tough",
	},
	sheercold: {
		num: 329,
		accuracy: 100,
		basePower: 150,
		category: "Special",
		name: "Sheer Cold",
		desc: "Sets Hail. User faints after use.",
		shortDesc: "Sets Hail. User faints after use.",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		weather: 'hail',
		secondary: null,
		selfdestruct: "always",
		target: "normal",
		type: "Ice",
		contestType: "Beautiful",
	},
	mistyexplosion: {
		num: 802,
		accuracy: 100,
		basePower: 150,
		category: "Special",
		name: "Misty Explosion",
		desc: "Sets Misty Terrain. User faints after use.",
		shortDesc: "Sets Misty Terrain. User faints after use.",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		selfdestruct: "always",
		terrain: 'mistyterrain',
		secondary: null,
		target: "allAdjacent",
		type: "Fairy",
	},
	guillotine: {
		num: 12,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Guillotine",
		desc: "Raises user's Attack by 1 if this KOes the target.",
		shortDesc: "Raises user's Attack by 1 if this KOes the target.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (!target || target.fainted || target.hp <= 0) this.boost({atk: 1}, pokemon, pokemon, move);
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Cool",
	},
	horndrill: {
		num: 32,
		accuracy: 85,
		basePower: 120,
		category: "Physical",
		name: "Horn Drill",
		desc: "No additional effect.",
		shortDesc: "No additional effect.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Steel",
		contestType: "Cool",
	},
	hiddenpower: {
		num: 237,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		name: "Hidden Power",
		shortDesc: "Varies in type based on the user's IVs. Physical if user's Atk > Sp. Atk.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyType(move, pokemon) {
			move.type = pokemon.hpType || 'Dark';
		},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Clever",
	},
	hiddenpowerbug: {
		num: 237,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		realMove: "Hidden Power",
		name: "Hidden Power Bug",
		shortDesc: "Physical if user's Atk > Sp. Atk.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		secondary: null,
		target: "normal",
		type: "Bug",
		contestType: "Clever",
	},
	hiddenpowerdark: {
		num: 237,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		realMove: "Hidden Power",
		name: "Hidden Power Dark",
		shortDesc: "Physical if user's Atk > Sp. Atk.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		secondary: null,
		target: "normal",
		type: "Dark",
		contestType: "Clever",
	},
	hiddenpowerdragon: {
		num: 237,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		realMove: "Hidden Power",
		name: "Hidden Power Dragon",
		shortDesc: "Physical if user's Atk > Sp. Atk.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		secondary: null,
		target: "normal",
		type: "Dragon",
		contestType: "Clever",
	},
	hiddenpowerelectric: {
		num: 237,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		realMove: "Hidden Power",
		name: "Hidden Power Electric",
		shortDesc: "Physical if user's Atk > Sp. Atk.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		secondary: null,
		target: "normal",
		type: "Electric",
		contestType: "Clever",
	},
	hiddenpowerfighting: {
		num: 237,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		realMove: "Hidden Power",
		name: "Hidden Power Fighting",
		shortDesc: "Physical if user's Atk > Sp. Atk.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		secondary: null,
		target: "normal",
		type: "Fighting",
		contestType: "Clever",
	},
	hiddenpowerfire: {
		num: 237,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		realMove: "Hidden Power",
		name: "Hidden Power Fire",
		shortDesc: "Physical if user's Atk > Sp. Atk.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		secondary: null,
		target: "normal",
		type: "Fire",
		contestType: "Clever",
	},
	hiddenpowerflying: {
		num: 237,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		realMove: "Hidden Power",
		name: "Hidden Power Flying",
		shortDesc: "Physical if user's Atk > Sp. Atk.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		secondary: null,
		target: "normal",
		type: "Flying",
		contestType: "Clever",
	},
	hiddenpowerghost: {
		num: 237,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		realMove: "Hidden Power",
		name: "Hidden Power Ghost",
		shortDesc: "Physical if user's Atk > Sp. Atk.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		secondary: null,
		target: "normal",
		type: "Ghost",
		contestType: "Clever",
	},
	hiddenpowergrass: {
		num: 237,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		realMove: "Hidden Power",
		name: "Hidden Power Grass",
		shortDesc: "Physical if user's Atk > Sp. Atk.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		secondary: null,
		target: "normal",
		type: "Grass",
		contestType: "Clever",
	},
	hiddenpowerground: {
		num: 237,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		realMove: "Hidden Power",
		name: "Hidden Power Ground",
		shortDesc: "Physical if user's Atk > Sp. Atk.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		secondary: null,
		target: "normal",
		type: "Ground",
		contestType: "Clever",
	},
	hiddenpowerice: {
		num: 237,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		realMove: "Hidden Power",
		name: "Hidden Power Ice",
		shortDesc: "Physical if user's Atk > Sp. Atk.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		secondary: null,
		target: "normal",
		type: "Ice",
		contestType: "Clever",
	},
	hiddenpowerpoison: {
		num: 237,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		realMove: "Hidden Power",
		name: "Hidden Power Poison",
		shortDesc: "Physical if user's Atk > Sp. Atk.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		secondary: null,
		target: "normal",
		type: "Poison",
		contestType: "Clever",
	},
	hiddenpowerpsychic: {
		num: 237,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		realMove: "Hidden Power",
		name: "Hidden Power Psychic",
		shortDesc: "Physical if user's Atk > Sp. Atk.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
		contestType: "Clever",
	},
	hiddenpowerrock: {
		num: 237,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		realMove: "Hidden Power",
		name: "Hidden Power Rock",
		shortDesc: "Physical if user's Atk > Sp. Atk.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		secondary: null,
		target: "normal",
		type: "Rock",
		contestType: "Clever",
	},
	hiddenpowersteel: {
		num: 237,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		realMove: "Hidden Power",
		name: "Hidden Power Steel",
		shortDesc: "Physical if user's Atk > Sp. Atk.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		secondary: null,
		target: "normal",
		type: "Steel",
		contestType: "Clever",
	},
	hiddenpowerwater: {
		num: 237,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		realMove: "Hidden Power",
		name: "Hidden Power Water",
		shortDesc: "Physical if user's Atk > Sp. Atk.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		secondary: null,
		target: "normal",
		type: "Water",
		contestType: "Clever",
	},
	snipeshot: {
		num: 745,
		accuracy: 100,
		basePower: 60,
		category: "Special",
		name: "Snipe Shot",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		willCrit: true,
		tracksTarget: true,
		secondary: null,
		shortDesc: "Always results in a critical hit. Cannot be redirected.",
		desc: "Always results in a critical hit. Cannot be redirected.",
		target: "normal",
		type: "Water",
	},
	lightningassault: {
		num: -486,
		accuracy: 100,
		basePower: 0,
		basePowerCallback(pokemon, target) {
			let ratio = Math.floor(pokemon.getStat('spe') / target.getStat('spe'));
			if (!isFinite(ratio)) ratio = 0;
			const bp = [40, 60, 80, 120, 150][Math.min(ratio, 4)];
			this.debug(`${bp} bp`);
			return bp;
		},
		category: "Physical",
		name: "Lightning Assault",
		shortDesc: "More power the faster the user is than the target.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Spark", target);
		},
		target: "normal",
		type: "Flying",
		zMove: {basePower: 160},
		maxMove: {basePower: 130},
		contestType: "Cool",
	},
	conversionz: {
		num: 775,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Conversion-Z",
		shortDesc: "Fails if the user has an item. Raises all stats by 1, and user gets the type of its 3rd move.",
		pp: 5,
		priority: 0,
		flags: {snatch: 1, sound: 1, dance: 1},
		onTryHit(pokemon, target, move) {
			if (pokemon.item) {
				return false;
			}
			if (!this.boost(move.boosts as SparseBoostsTable)) return null;
			delete move.boosts;
		},
		onHit(target) {
			const type = this.dex.moves.get(target.moveSlots[2].id).type;
			if (target.hasType(type) || !target.setType(type)) return false;
			this.add('-start', target, 'typechange', type);
		},
		boosts: {
			atk: 1,
			def: 1,
			spa: 1,
			spd: 1,
			spe: 1,
		},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Conversion", target);
		},
		secondary: null,
		target: "self",
		type: "Normal",
	},
	zawall: {
		num: -1800,
		accuracy: 90,
		basePower: 120,
		category: "Physical",
		name: "Za Wall",
		shortDesc: "Raises user's Atk by 1 on turn 1. Hits turn 2.",
		pp: 10,
		priority: 0,
		flags: {charge: 1, protect: 1, mirror: 1},
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name);
			this.boost({atk: 1}, attacker, attacker, move);
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Head Smash", target);
		},
		secondary: null,
		target: "normal",
		type: "Rock",
	},
	awakening: {
		num: -1659,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Awakening",
		pp: 10,
		priority: 0,
		desc: "Heal this Pokemon for 50% HP, and reveal one of opponent's move.",
		shortDesc: "Heal 50% HP; reveals random opponent's move.",
		flags: {snatch: 1, heal: 1},
		heal: [1, 2],
		onHit(pokemon) {
			for (const target of pokemon.side.foe.active) {
				if (!target || target.fainted) continue;
				let potentialMoves = 0;
				for (const moveSlot of target.moveSlots) {
					if (moveSlot.revealed) continue;
					potentialMoves++;
				}
				let r = 0;
				if (potentialMoves) {
					r = this.random(potentialMoves);
				}
				for (const moveSlot of target.moveSlots) {
					if (moveSlot.revealed) continue;
					if (r === 0) {
						this.add('-message', `${(target.illusion ? target.illusion.name : target.name)} knows the move ${this.dex.moves.get(moveSlot.move).name}!`);
					}
					r--;
					moveSlot.revealed = true;
					return;
				}
			}
		},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Dream Eater", target);
		},
		secondary: null,
		target: "self",
		type: "Psychic",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Beautiful",
	},
	fulldevotion: {
		num: -1270,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Full Devotion",
		shortDesc: "One adjacent ally's move power is 1.5x this turn. Lowers damages this ally receives of 25%.",
		pp: 10,
		priority: 0,
		flags: {authentic: 1},
		volatileStatus: 'helpinghand',
		onTryHit(target) {
			if (!target.newlySwitched && !this.queue.willMove(target)) return false;
		},
		condition: {
			duration: 1,
			onStart(target, source) {
				this.effectState.multiplier = 1.5;
				this.add('-singleturn', target, 'Full Devotion', '[of] ' + source);
			},
			onBasePowerPriority: 10,
			onBasePower(basePower) {
				this.debug('Boosting from Full Devotion: ' + this.effectState.multiplier);
				return this.chainModify(this.effectState.multiplier);
			},
			onDamagingHit(damage, target, source, move) {
				if (source.side !== target.side) {
					return damage *= 0.75;
				}
			},
		},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Psystrike", target);
		},
		secondary: null,
		target: "adjacentAlly",
		type: "Psychic",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Clever",
	},
	braveblade: {
		desc: "Physical if it would be stronger (Shell Side Arm clone). Hits Dark types for neutral damages.",
		num: -1801,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Brave Blade",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, slicing: 1},
		onModifyMove(move, pokemon, target) {
			if (!target) return;
			const atk = pokemon.getStat('atk', false, true);
			const spa = pokemon.getStat('spa', false, true);
			const def = target.getStat('def', false, true);
			const spd = target.getStat('spd', false, true);
			const physical = Math.floor(Math.floor(Math.floor(Math.floor(2 * pokemon.level / 5 + 2) * 90 * atk) / def) / 50);
			const special = Math.floor(Math.floor(Math.floor(Math.floor(2 * pokemon.level / 5 + 2) * 90 * spa) / spd) / 50);
			if (physical > special || (physical === special && this.random(2) === 0)) {
				move.category = 'Physical';
				move.flags.contact = 1;
			}
			if (!move.ignoreImmunity) move.ignoreImmunity = {};
			if (move.ignoreImmunity !== true) {
				move.ignoreImmunity['Psychic'] = true;
			}
		},
		onHit(target, source, move) {
			this.hint(move.category + " Brave Blade");
		},
		onAfterSubDamage(damage, target, source, move) {
			this.hint(move.category + " Brave Blade");
		},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Spacial Rend", target);
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
	},
	teramorphosis: {
		num: -544888,
		accuracy: 100,
		basePower: 75,
		category: "Physical",
		name: "Teramorphosis",
		shortDesc: "Has 33% recoil. 50% chance to raise the user's Spe by 1.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		recoil: [1, 3],
		secondary: {
			chance: 50,
			self: {
				boosts: {
					spe: 1,
				},
			},
		},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Grassy Glide", target);
		},
		target: "normal",
		type: "Grass",
		contestType: "Cool",
	},
	happydance: {
		num: -1240,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Happy Dance",
		pp: 5,
		priority: 0,
		flags: {snatch: 1, dance: 1},
		boosts: {
			spa: 1,
		},
		weather: 'RainDance',
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Rain Dance", target);
		},
		secondary: null,
		target: "all",
		type: "Water",
		shortDesc: "Raises the user's SpA by 1. Summons Rain Dance.",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Beautiful",
	},
	oniwind: {
		num: 740,
		accuracy: 100,
		basePower: 40,
		category: "Special",
		shortDesc: "Sets Tailwind.",
		name: "Oni Wind",
		pp: 5,
		priority: 0,
		flags: {protect: 1, wind: 1, mirror: 1},
		self: {
			sideCondition: 'tailwind',
		},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Tailwind", target);
		},
		secondary: null,
		target: "normal",
		type: "Flying",
		contestType: "Clever",
	},
	houndshowl: {
		num: -1228,
		accuracy: 100,
		basePower: 55,
		category: "Physical",
		name: "Hound's Howl",
		shortDesc: "If a foe is switching out, hits it at 2x power.",
		desc: "If a foe is switching out, hits it at 2x power.",
		basePowerCallback(pokemon, target, move) {
			// You can't get here unless the pursuit succeeds
			if (target.beingCalledBack) {
				this.debug('Hound\'s Howl damage boost');
				return move.basePower * 2;
			}
			return move.basePower;
		},
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		beforeTurnCallback(pokemon) {
			for (const side of this.sides) {
				if (side === pokemon.side) continue;
				side.addSideCondition('houndshowl', pokemon);
				const data = side.getSideConditionData('houndshowl');
				if (!data.sources) {
					data.sources = [];
				}
				data.sources.push(pokemon);
			}
		},
		onModifyMove(move, source, target) {
			if (target?.beingCalledBack) move.accuracy = true;
		},
		onTryHit(target, pokemon) {
			target.side.removeSideCondition('houndshowl');
		},
		condition: {
			duration: 1,
			onBeforeSwitchOut(pokemon) {
				this.debug('Hound\'s Howl start');
				let alreadyAdded = false;
				pokemon.removeVolatile('destinybond');
				for (const source of this.effectState.sources) {
					if (!this.queue.cancelMove(source) || !source.hp) continue;
					if (!alreadyAdded) {
						this.add('-activate', pokemon, 'move: Hound\'s Howl');
						alreadyAdded = true;
					}
					// Run through each action in queue to check if the Pursuit user is supposed to Mega Evolve this turn.
					// If it is, then Mega Evolve before moving.
					if (source.canMegaEvo || source.canUltraBurst) {
						for (const [actionIndex, action] of this.queue.entries()) {
							if (action.pokemon === source && action.choice === 'megaEvo') {
								this.runMegaEvo(source);
								this.queue.list.splice(actionIndex, 1);
								break;
							}
						}
					}
					this.runMove('houndshowl', source, this.getTargetLoc(pokemon, source));
				}
			},
		},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hyper Voice", target);
		},
		secondary: null,
		target: "normal",
		type: "Ghost",
		contestType: "Clever",
	},
	dantesinferno: {
		num: -1881,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Dante's Inferno",
		shortDesc: "Starts Sun.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		weather: 'sunnyday',
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Inferno", target);
		},
		secondary: null,
		target: "all",
		type: "Fire",
	},
	// Gen 9
	mysticalpower: {
		shortDesc: "100% chance to raise the user's Sp. Atk by 1.",
		num: -1018,
		accuracy: 90,
		basePower: 70,
		category: "Special",
		name: "Mystical Power",
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
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Stored Power", target);
		},
		target: "normal",
		type: "Psychic",
		contestType: "Clever",
	},
	lunarblessing: {
		num: 849,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "User and allies: healed 1/4 max HP, status cured.",
		name: "Lunar Blessing",
		pp: 5,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		onHit(pokemon) {
			const success = !!this.heal(this.modify(pokemon.maxhp, 0.25));
			return pokemon.cureStatus() || success;
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Lunar Dance", target);
		},
		secondary: null,
		target: "allies",
		type: "Psychic",
	},
	spicyextract: {
		num: 858,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Spicy Extract",
		shortDesc: "Raises target's Atk by 2 and lowers its Def by 2.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1},
		boosts: {
			atk: 2,
			def: -2,
		},
		secondary: null,
		target: "normal",
		type: "Grass",
	},
	bleakwindstorm: {
		num: 846,
		accuracy: 80,
		basePower: 100,
		category: "Special",
		name: "Bleakwind Storm",
		shortDesc: "20% chance to freeze foe(s).",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, wind: 1},
		secondary: {
			chance: 20,
			status: 'frz',
		},
		target: "allAdjacentFoes",
		type: "Flying",
	},
	sandsearstorm: {
		num: 848,
		accuracy: 80,
		basePower: 100,
		category: "Special",
		name: "Sandsear Storm",
		shortDesc: "20% chance to burn foe(s).",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, wind: 1},
		secondary: {
			chance: 20,
			status: 'brn',
		},
		target: "allAdjacentFoes",
		type: "Ground",
	},
	springtidestorm: {
		num: 831,
		accuracy: 80,
		basePower: 100,
		category: "Special",
		name: "Springtide Storm",
		shortDesc: "30% chance to lower the foe(s) Attack by 1.",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, wind: 1},
		secondary: {
			chance: 30,
			boosts: {
				atk: -1,
			},
		},
		target: "allAdjacentFoes",
		type: "Fairy",
	},
	wildboltstorm: {
		num: 847,
		accuracy: 80,
		basePower: 100,
		category: "Special",
		name: "Wildbolt Storm",
		shortDesc: "20% chance to paralyze foe(s).",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, wind: 1},
		secondary: {
			chance: 20,
			status: 'par',
		},
		target: "allAdjacentFoes",
		type: "Electric",
	},
	axekick: {
		num: 853,
		accuracy: 90,
		basePower: 120,
		category: "Physical",
		name: "Axe Kick",
		shortDesc: "30% confusion. User loses 50% max HP if miss.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		hasCrashDamage: true,
		onMoveFail(target, source, move) {
			this.damage(source.baseMaxhp / 2, source, source, this.dex.conditions.get('High Jump Kick'));
		},
		secondary: {
			chance: 30,
			volatileStatus: 'confusion',
		},
		target: "normal",
		type: "Dark",
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
	kowtowcleave: {
		num: 869,
		accuracy: true,
		basePower: 85,
		category: "Physical",
		name: "Kowtow Cleave",
		shortDesc: "This move does not check accuracy.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, slicing: 1},
		secondary: null,
		target: "normal",
		type: "Dark",
	},
	flowertrick: {
		num: 870,
		accuracy: true,
		basePower: 70,
		category: "Physical",
		name: "Flower Trick",
		shortDesc: "Always results in a critical hit; no accuracy check.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		willCrit: true,
		secondary: null,
		target: "normal",
		type: "Grass",
	},
	torchsong: {
		num: 871,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Torch Song",
		shortDesc: "100% chance to raise the user's Sp. Atk by 1.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, bypasssub: 1},
		secondary: {
			chance: 100,
			self: {
				boosts: {
					spa: 1,
				},
			},
		},
		target: "normal",
		type: "Fire",
		contestType: "Beautiful",
	},
	aquastep: {
		num: 872,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Aqua Step",
		shortDesc: "100% chance to raise the user's Speed by 1.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, dance: 1},
		secondary: {
			chance: 100,
			self: {
				boosts: {
					spe: 1,
				},
			},
		},
		target: "normal",
		type: "Water",
		contestType: "Cool",
	},
	ragingbull: {
		num: 873,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Raging Bull",
		shortDesc: "Destroys screens. Type depends on user's form.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onTryHit(pokemon) {
			// will shatter screens through sub, before you hit
			pokemon.side.removeSideCondition('reflect');
			pokemon.side.removeSideCondition('lightscreen');
			pokemon.side.removeSideCondition('auroraveil');
		},
		onModifyType(move, pokemon) {
			switch (pokemon.species.name) {
			case 'Tauros-Paldea-Combat':
				move.type = 'Fighting';
				break;
			case 'Tauros-Paldea-Blaze':
				move.type = 'Fire';
				break;
			case 'Tauros-Paldea-Aqua':
				move.type = 'Water';
				break;
			}
		},
		secondary: null,
		target: "normal",
		type: "Normal",
	},
	collisioncourse: {
		num: 878,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		name: "Collision Course",
		shortDesc: "Deals 1.3333x damage with supereffective hits.",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onBasePower(basePower, source, target, move) {
			if (target.runEffectiveness(move) > 0) {
				// Placeholder
				this.debug(`collision course super effective buff`);
				return this.chainModify([5461, 4096]);
			}
		},
		secondary: null,
		target: "normal",
		type: "Fighting",
		contestType: "Tough",
	},
	electrodrift: {
		num: 879,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		name: "Electro Drift",
		shortDesc: "Deals 1.3333x damage with supereffective hits.",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onBasePower(basePower, source, target, move) {
			if (target.runEffectiveness(move) > 0) {
				// Placeholder
				this.debug(`electro drift super effective buff`);
				return this.chainModify([5461, 4096]);
			}
		},
		secondary: null,
		target: "normal",
		type: "Electric",
		contestType: "Cool",
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
	twinbeam: {
		num: 888,
		accuracy: 100,
		basePower: 40,
		category: "Special",
		name: "Twin Beam",
		shortDesc: "Hits 2 times in one turn.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		multihit: 2,
		secondary: null,
		target: "normal",
		type: "Psychic",
		contestType: "Cool",
	},
	armorcannon: {
		num: 890,
		accuracy: 100,
		basePower: 120,
		category: "Special",
		name: "Armor Cannon",
		shortDesc: "Lowers the user's Defense and Sp. Def by 1.",
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
		type: "Fire",
	},
	bitterblade: {
		num: 891,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Bitter Blade",
		shortDesc: "User recovers 50% of the damage dealt.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, slicing: 1, heal: 1},
		drain: [1, 2],
		secondary: null,
		target: "normal",
		type: "Fire",
	},
	doubleshock: {
		num: 892,
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		shortDesc: "User's Electric type: typeless; must be Electric.",
		name: "Double Shock",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onTryMove(pokemon, target, move) {
			if (pokemon.hasType('Electric')) return;
			this.add('-fail', pokemon, 'move: Double Shock');
			this.attrLastMove('[still]');
			return null;
		},
		self: {
			onHit(pokemon) {
				pokemon.setType(pokemon.getTypes(true).map(type => type === "Electric" ? "???" : type));
				this.add('-start', pokemon, 'typechange', pokemon.getTypes().join('/'), '[from] move: Double Shock');
			},
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Bolt Strike", target);
		},
		secondary: null,
		target: "normal",
		type: "Electric",
		contestType: "Clever",
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
	tidyup: {
		num: 882,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Tidy Up",
		shortDesc: "User +1 Atk, Spe, Acc. Clears all substitutes/hazards on user's side.",
		pp: 10,
		priority: 0,
		flags: {},
		onHit(pokemon) {
			let success = false;
			for (const active of this.getAllActive()) {
				if (active.removeVolatile('substitute')) success = true;
			}
			const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
			for (const condition of sideConditions) {
				if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
					this.add('-sideend', pokemon.side, this.dex.conditions.get(condition).name, '[from] move: Rapid Spin', '[of] ' + pokemon);
				}
			}
			if (success) this.add('-activate', pokemon, 'move: Tidy Up');
			return !!this.boost({atk: 1, spe: 1, accuracy: 1}, pokemon, pokemon, null, false, true) || success;
		},
		secondary: null,
		target: "self",
		type: "Normal",
	},
	hyperdrill: {
		num: 887,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		name: "Hyper Drill",
		shortDesc: "Bypasses protection without breaking it. 50% chance to lower target's Def by 2 stages.",
		pp: 5,
		priority: 0,
		flags: {contact: 1, mirror: 1},
		secondary: {
			chance: 50,
			boosts: {
				def: -2,
			},
		},
		target: "normal",
		type: "Normal",
		contestType: "Clever",
	},
	ragefist: {
		num: 889,
		accuracy: 100,
		basePower: 50,
		basePowerCallback(pokemon) {
			return Math.min(350, 50 + 25 * pokemon.timesAttacked);
		},
		category: "Physical",
		name: "Rage Fist",
		shortDesc: "+25 power for each time user was hit. Max 6 hits.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1},
		secondary: null,
		target: "normal",
		type: "Ghost",
	},
	gigatonhammer: {
		num: 893,
		accuracy: 100,
		basePower: 160,
		category: "Physical",
		name: "Gigaton Hammer",
		shortDesc: "Cannot be used twice in a row. Super effective on Steel targets.",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onEffectiveness(typeMod, target, type) {
			if (type === 'Steel') return 1;
		},
		onDisableMove(pokemon) {
			if (pokemon.lastMove?.id === 'gigatonhammer') pokemon.disableMove('gigatonhammer');
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
	hydrosteam: {
		num: 876,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Hydro Steam",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, defrost: 1},
		onModifyMove(move, pokemon) {
			if (pokemon.effectiveWeather() === 'sunnyday') {
				move.basePower = 260;
			}
		},
		thawsTarget: true,
		secondary: null,
		target: "normal",
		type: "Water",
	},
	psyblade: {
		num: 875,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Psyblade",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, slicing: 1},
		secondary: null,
		onBasePower(basePower, source) {
			if (this.field.isTerrain('electricterrain')) {
				this.debug('psyblade electric terrain boost');
				return this.chainModify(1.5);
			}
		},
		target: "normal",
		type: "Psychic",
	},

	// Endless Dream field
	wakeupslap: {
		num: 358,
		accuracy: 100,
		basePower: 70,
		basePowerCallback(pokemon, target, move) {
			if (target.status === 'slp' || target.hasAbility('comatose') || target.hasAbility('endlessdream') || pokemon.hasAbility('endlessdream')) return move.basePower * 2;
			return move.basePower;
		},
		category: "Physical",
		name: "Wake-Up Slap",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onHit(target) {
			if (target.status === 'slp') target.cureStatus();
		},
		secondary: null,
		target: "normal",
		type: "Fighting",
		contestType: "Tough",
	},
	dreameater: {
		num: 138,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		name: "Dream Eater",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, heal: 1},
		drain: [1, 2],
		onTryImmunity(target, source) {
			return target.status === 'slp' || target.hasAbility('comatose') || target.hasAbility('endlessdream') || source.hasAbility('endlessdream');
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
		contestType: "Clever",
	},
	nightmare: {
		num: 171,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Nightmare",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		volatileStatus: 'nightmare',
		condition: {
			noCopy: true,
			onStart(target, source) {
				if (target.status !== 'slp' && !target.hasAbility('comatose') && !target.hasAbility('endlessdream') && !source.hasAbility('endlessdream')) {
					return false;
				}
				this.add('-start', pokemon, 'Nightmare');
			},
			onResidualOrder: 9,
			onResidual(pokemon) {
				this.damage(pokemon.baseMaxhp / 4);
			},
		},
		secondary: null,
		target: "normal",
		type: "Ghost",
		zMove: {boost: {spa: 1}},
		contestType: "Clever",
	},
	ultrasleep: { // this move is only for Endless Dream ability
		num: -1433,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Ultrasleep",
		pp: 5,
		priority: -7,
		flags: {mirror: 1},
		pseudoWeather: 'ultrasleep',
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
				this.add('-fieldstart', 'move: Ultrasleep', '[of] ' + source);
			},
			onSetStatus(status, target, source, effect) {
				if (target.hasAbility('vitalspirit') || target.hasAbility('insomnia')) return;
				if (effect && ((effect as Move).status || effect.id === 'yawn')) {
					this.add('-activate', target, 'move: Ultrasleep');
				}
				return false;
			},
			onResidualOrder: 23,
			onEnd() {
				this.add('-fieldend', 'move: Ultrasleep');
			},
		},
		secondary: null,
		target: "all",
		type: "Psychic",
		zMove: {boost: {accuracy: 1}},
		contestType: "Clever",
	},
};
