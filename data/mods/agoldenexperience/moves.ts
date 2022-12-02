import computeSourceMap from "sucrase/dist/types/computeSourceMap";

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
		target: "normal",
		type: "Poison",
		contestType: "Tough",
	},
	schuss: {
		num: -2,
		accuracy: 90,
		basePower: 130,
		category: "Physical",
		shortDesc: "User takes 1/3 of damages inflicted.",
		name: "Schuss",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, gravity: 1},
		recoil: [33, 100],
		secondary: null,
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
		category: "Special",
		name: "Toxic Sting",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, heal: 1},
		drain: [1, 2],
		secondary: {
			chance: 100,
			status: 'tox',
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
		target: "normal",
		type: "Steel",
	},
	//unused due to deleted Fakemons
	/*galvanismash: {
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
				for (const source of this.effectData.sources) {
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
			  this.effectData.stage = 0;
				this.add('-start', target, 'move: Frostbite');
			},
			onResidualOrder: 8,
			onResidual(pokemon) {
	  		if (this.effectData.stage < 15) {
		  		this.effectData.stage++;
		  	}
				const target = this.effectData.source.side.active[pokemon.volatiles['frostbite'].sourcePosition];
				if (!target || target.fainted || target.hp <= 0) {
					this.debug('Nothing to leech into');
					return;
				}
				const damage = this.damage(this.clampIntRange(pokemon.baseMaxhp / 16, 1) * this.effectData.stage, pokemon, target,); //'[silent]'); //looking at that soon
				if (damage) {
					this.heal(damage, target, pokemon);
				}
			},
		},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Icy Wind", target);
		},
		secondary: null,
		target: "normal",
		type: "Ice",
		zMove: {boost: {def: 1}},
		contestType: "Clever",
	},
	aspiravoid: {
		num: -17,
		accuracy: 100,
		basePower: 50,
		category: "Special",
		name: "Aspira-Void",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		self: {
			chance: 100,
			boosts: {
				atk: 1,
				spa: 1,
			},
		},
		secondary: {
			chance: 100,
			boosts: {
				atk: -1,
				spa: -1,
			},
		},
		target: "normal",
		type: "Dark",
		shortDesc: "-1 Atk/SpA for target; +1 Atk/SpA for this Pokemon.",
		contestType: "Cool",
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
		pp: 10,
		priority: 0,
		flags: {ballistic: 1, protect: 1, mirror: 1},
		onHit() {
			this.field.clearTerrain();
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
				//bp *= Math.pow(2, pokemon.volatiles['backfire'].hitCount);
				bp += 20*pokemon.volatiles['backfire'].hitCount;
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
				this.effectData.hitCount = 1;
			},
			onRestart() {
				this.effectData.hitCount++;
				if (this.effectData.hitCount < 5) {
					this.effectData.duration = 2;
				}
			},
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
			let factor = 0.5;
			if (this.field.isWeather('raindance') || this.field.isWeather('primordialsea')) {
				const success = !!this.heal(this.modify(pokemon.maxhp, 0.25));
				return pokemon.cureStatus() || success;
			}
			return !!this.heal(this.modify(pokemon.maxhp, factor));
		},
		secondary: null,
		target: "self",
		type: "Water",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Beautiful",
	},
	condensate: {
		num: -23,
		accuracy: 100,
		basePower: 65,
		category: "Special",
		name: "Condensate",
		shortDesc: "BP x2 if on Misty Terrain.",
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
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Vacuum Wave", target);
		},
		condition: { // this is *not* meant to be set as part of the move; partially defined in scripts.ts!
			onModifyDamage(damage, source, target, move) {
				if (target.getMoveHitData(move).typeMod < 0) {
					this.effectData.boost = 'thisMoveResisted';
					this.debug('set Indomitable Spirit boost');
				}
			},
			onBeforeMove(pokemon) {
				if (this.effectData.boost === 'thisMoveResisted') {
					this.effectData.boost = 'lastMoveResisted';
				} else {
					this.effectData.boost = null;
				}
			},
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
		pp: 16,
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
					this.add('-sideend', target.side, this.dex.getEffect(targetCondition).name, '[from] move: Landslide', '[of] ' + source);
					success = true;
				}
			}
			for (const sideCondition of removeAll) {
				if (source.side.removeSideCondition(sideCondition)) {
					this.add('-sideend', source.side, this.dex.getEffect(sideCondition).name, '[from] move: Landslide', '[of] ' + source);
					success = true;
				}
			}
			return success;
		},
		secondary: {
			chance: 100,
			boosts: {
				spe: -1,
			},
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
			if (!(target.isGrounded())){
				this.boost({spe: -1}, target, target, null, true);
			}
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
		onPrepareHit: function(target, source, move) {
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
				if (move.type === 'Fighting' && (source === this.effectData.target || target === this.effectData.target) && (target.isGrounded() && !target.isSemiInvulnerable())) {
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
		self: {
			onHit(source) {
				if (source.positiveBoosts()) {
					source.clearBoosts();
					this.add('-clearpositiveboost', source);
				}
			}
		}
		shortDesc: "User switches, passing Substitute and more. No longer passes stats.",
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
		onAfterHit: function(target, source) {
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
				this.damage(Math.round(pokemon.maxhp / 2), pokemon, pokemon, this.dex.getEffect('Eternabeam'), true);
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
				this.damage(Math.round(pokemon.maxhp / 2), pokemon, pokemon, this.dex.getEffect('Mind Blown'), true);
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
	ceaselessedge: {
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
	esperwing: {
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
					target.clearBoosts();
				}
				return this.NOT_FAIL;
			},
			onHit(target, source, move) {
				if (move.isZOrMaxPowered && move.flags['contact']) {
					target.clearBoosts();
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
		desc: "100% chance to raise the user's Speed by 1 stage. Raise crit ratio by 2 stages.",
		shortDesc: "100% chance to +1 Speed; +2 crit ratio.",
		pp: 16,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onModifyCritRatio(critRatio) {
			return critRatio + 2;
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
		type: "Fighting",
		contestType: "Tough",
	},
	psyshieldbash: {
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
	wavecrash: {
		num: -1710,
		accuracy: 100,
		basePower: 75,
		category: "Physical",
		name: "Wave Crash",
		shortDesc: "Has 33% recoil. 100% chance to raise the user's Speed by 1.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		recoil: [1, 3],
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
	direclaw: {
		num: -1398,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Dire Claw",
		shortDesc: "50% chance to poison the target.",
		pp: 16,
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
			chance: 30,
			status: 'psn',
		},
		target: "normal",
		type: "Poison",
		zMove: {basePower: 160},
		contestType: "Clever",
	},
	hiddenpower: {
		num: 237,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		name: "Hidden Power",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyType(move, pokemon) {
			move.type = pokemon.hpType || 'Dark';
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
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
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
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
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
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
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
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
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
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
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
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
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
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
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
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
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
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
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
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
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
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
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
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
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
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
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
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
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
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
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
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Water",
		contestType: "Clever",
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
			const type = this.dex.getMove(target.moveSlots[2].id).type;
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
		secondary: null,
		target: "self",
		type: "Normal",
	},
	weneedawall: {
		num: -1800,
		accuracy: 90,
		basePower: 120,
		category: "Physical",
		name: "We Need A Wall",
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
                        this.add('-message', `${(target.illusion ? target.illusion.name : target.name)} knows the move ${this.dex.getMove(moveSlot.move).name}!`);
                    }
                    r--;
                    moveSlot.revealed = true;
                    return;
                }
            }
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
				this.effectData.multiplier = 1.5;
				this.add('-singleturn', target, 'Full Devotion', '[of] ' + source);
			},
			onBasePowerPriority: 10,
			onBasePower(basePower) {
				this.debug('Boosting from Full Devotion: ' + this.effectData.multiplier);
				return this.chainModify(this.effectData.multiplier);
			},
			onDamagingHit(damage, target, source, move){
				if (source.side !== target.side){
					return damage *= 0.75;
				}
			},
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
		flags: {protect: 1, mirror: 1},
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
		},
		onHit(target, source, move) {
			this.hint(move.category + " Brave Blade");
		},
		onEffectiveness(typeMod, target, type) {
			if (type === 'Dark') return 1;
		},
		onAfterSubDamage(damage, target, source, move) {
			this.hint(move.category + " Brave Blade");
		},
		secondary: null,
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
	ultrasleep: { //this move is only for Endless Dream ability
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
}