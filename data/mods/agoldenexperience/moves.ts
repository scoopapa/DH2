export const Moves: { [k: string]: ModdedMoveData; } = {
	tentacatch: {
		num: -1,
		accuracy: 85,
		basePower: 60,
		category: "Physical",
		name: "Tentacatch",
		shortDesc: "Traps and damages the target for 4-5 turns. Lowers the target's Atk by 1 stage.",
		desc: "Traps and damages the target for 4-5 turns. Lowers the target's Atk by 1 stage.",
		pp: 20,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		volatileStatus: 'partiallytrapped',
		secondary: {
			chance: 100,
			boosts: {
				atk: -1,
			},
		},
		onPrepareHit: function (target, source) {
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
		flags: { contact: 1, protect: 1, mirror: 1, gravity: 1 },
		recoil: [33, 100],
		secondary: null,
		onPrepareHit: function (target, source) {
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
		flags: { contact: 1, protect: 1, mirror: 1 },
		onBasePower(basePower, source, target, move) {
			const item = target.getItem();
			if (!this.singleEvent('TakeItem', item, target.itemState, target, target, move, item)) return;
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
		onPrepareHit: function (target, source) {
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
		flags: { protect: 1, mirror: 1 },
		ignoreAbility: true,
		tracksTarget: true,
		onPrepareHit: function (target, source) {
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
		flags: { punch: 1, contact: 1, protect: 1, mirror: 1 },
		ignoreAbility: true,
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Dynamic Punch", target);
		},
		secondary: null,
		target: "normal",
		type: "Fighting",
		contestType: "Tough",
	},
	toxicthread: {
		inherit: true,
		status: 'tox',
		desc: "Lowers the target's Speed by 1 stage and badly poisons it.",
		shortDesc: "Lowers the target's Speed by 1 and badly poisons it.",
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
		flags: { protect: 1, mirror: 1, heal: 1 },
		drain: [1, 2],
		secondary: {
			chance: 100,
			status: 'tox',
		},
		onPrepareHit: function (target, source) {
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
		flags: { protect: 1, mirror: 1 },
		onEffectiveness(typeMod, target, type) {
			if (type === 'Dark') return 1;
		},
		onModifyMove(move) {
			if (!move.ignoreImmunity) move.ignoreImmunity = {};
			if (move.ignoreImmunity !== true) {
				move.ignoreImmunity['Psychic'] = true;
			}
		},
		onPrepareHit: function (target, source) {
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
		flags: { protect: 1, mirror: 1 },
		onHit(target) {
			target.clearBoosts();
			this.add('-clearboost', target);
		},
		onPrepareHit: function (target, source) {
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
		flags: { snatch: 1 },
		onModifyMove(move, pokemon) {
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) move.boosts = { spa: 2, spe: 1 };
		},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Growth", target);
		},
		secondary: null,
		target: "self",
		type: "Grass",
		zMove: { boost: { spa: 1 } },
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
		flags: { contact: 1, protect: 1, mirror: 1 },
		onPrepareHit: function (target, source) {
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
		flags: { protect: 1, mirror: 1 },
		onHit(target) {
			target.clearBoosts();
			this.add('-clearboost', target);
		},
		onPrepareHit: function (target, source) {
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
		flags: { contact: 1, protect: 1, mirror: 1 },
		recoil: [33, 100],
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Iron Head", target);
		},
		target: "normal",
		type: "Steel",
	},
	goldenexperience: {
		num: -13,
		accuracy: 100,
		basePower: 75,
		category: "Physical",
		name: "Golden Experience",
		shortDesc: "Heal 50% of damages dealt.",
		pp: 10,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, punch: 1, heal: 1 },
		drain: [1, 2],
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Moonblast", target);
		},
		secondary: null,
		target: "normal",
		type: "Fairy",
		contestType: "Tough",
	},
	dimensionalbleeding: {
		num: -14,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		name: "Dimensional Bleeding",
		shortDesc: "Physical if Atk > SpA.",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hyperspace Fury", target);
		},
		secondary: null,
		target: "normal",
		type: "Dark",
	},
	frostbite: {
		num: -15,
		accuracy: 90,
		basePower: 0,
		category: "Status",
		desc: "The Pokémon at the user's position steals some of the target's maximum HP at the end of each turn. Damage begins at 1/16, rounded down, and increases each turn like Toxic. If Big Root is held by the recipient, the HP recovered is 1.3x normal, rounded half down. If the target uses Baton Pass, the replacement will continue being leeched. If the target switches out, the effect ends.",
		shortDesc: "Target's HP is restored to user every turn. Damage increases like Toxic.",
		name: "Frostbite",
		pp: 10,
		priority: 0,
		flags: { protect: 1, reflectable: 1, mirror: 1 },
		volatileStatus: 'frostbite',
		condition: {
			onStart(target) {
				this.effectState.stage = 0;
				this.add('-start', target, 'move: Frostbite');
			},
			onResidualOrder: 8,
			onResidual(pokemon) {
				if (this.effectState.stage < 15) {
					this.effectState.stage++;
				}
				// const target = this.effectState.source.side.active[pokemon.volatiles['frostbite'].sourcePosition];
				for (const target of this.getAllActive()) {
					if (pokemon.volatiles['frostbite']) {
						const damage = this.damage(this.clampIntRange(pokemon.baseMaxhp / 16, 1) * this.effectState.stage, pokemon, target,); //'[silent]'); //looking at that soon
						if (damage) {
							this.heal(damage, target, pokemon);
						}
					}
					if (!target || target.fainted || target.hp <= 0) {
						this.debug('Nothing to leech into');
						return;
					}
				}
			},
		},
		onTryImmunity(target) {
			return (!target.hasType('Fire') && !target.hasType('Ice'));
		},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Icy Wind", target);
		},
		secondary: null,
		target: "normal",
		type: "Ice",
		zMove: { boost: { def: 1 } },
		contestType: "Clever",
	},
	aspiravoid: {
		num: -16,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Aspira Void",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, heal: 1 },
		drain: [1, 2],
		onPrepareHit: function (target, source) {
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
		num: -17,
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		name: "Underdog",
		shortDesc: "BP x2 if target's Atk > user's Atk.",
		pp: 15,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		onBasePower(basePower, source, target, move) {
			const targetAtk = target.storedStats.atk;
			const sourceAtk = source.storedStats.atk;
			if (targetAtk >= sourceAtk) {
				return this.chainModify(2);
			}
		},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Facade", target);
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		zMove: { boost: { spe: 1 } },
		contestType: "Clever",
	},
	flamingsphere: {
		num: -18,
		accuracy: 100,
		basePower: 40,
		category: "Special",
		shortDesc: "Usually goes first.",
		name: "Flaming Sphere",
		pp: 20,
		priority: 1,
		flags: { bullet: 1, protect: 1, mirror: 1 },
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Pyro Ball", target);
		},
		secondary: null,
		target: "normal",
		type: "Fire",
		contestType: "Tough",
	},
	fireball: {
		num: -19,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		name: "Fire Ball",
		shortDesc: "Ends all existing terrains.",
		pp: 10,
		priority: 0,
		flags: { bullet: 1, protect: 1, mirror: 1 },
		onHit() {
			this.field.clearTerrain();
		},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Pyro Ball", target);
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Fire",
		contestType: "Beautiful",
	},
	backfire: {
		num: -20,
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
		flags: { contact: 1, protect: 1, mirror: 1 },
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
		onPrepareHit: function (target, source) {
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
		num: -21,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user restores 1/2 of its maximum HP, rounded half up.",
		shortDesc: "Heals the user by 50% of its max HP.",
		name: "High Water",
		pp: 10,
		priority: 0,
		flags: { snatch: 1, heal: 1 },
		heal: [1, 2],
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Life Dew", target);
		},
		secondary: null,
		target: "self",
		type: "Water",
		zMove: { effect: 'clearnegativeboost' },
		contestType: "Beautiful",
	},
	seajaws: {
		num: -22,
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		name: "Sea Jaws",
		pp: 10,
		priority: 0,
		flags: { bite: 1, contact: 1, protect: 1, mirror: 1 },
		onTryHit(pokemon) {
			// will shatter screens through sub, before you hit
			if (pokemon.runImmunity('Water')) {
				pokemon.side.removeSideCondition('reflect');
				pokemon.side.removeSideCondition('lightscreen');
				pokemon.side.removeSideCondition('auroraveil');
			}
		},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Fishious Rend", target);
		},
		secondary: null,
		desc: "If this attack does not miss, the effects of Reflect, Light Screen, and Aurora Veil end for the target's side of the field before damage is calculated.",
		shortDesc: "Destroys screens, unless the target is immune.",
		target: "normal",
		type: "Water",
		contestType: "Clever",
	},
	parallelcircuit: {
		num: -23,
		accuracy: 100,
		basePower: 25,
		category: "Physical",
		name: "Parallel Circuit",
		shortDesc: "Hits 2-5 times in one turn.",
		desc: "Hits 2-5 times in one turn.",
		pp: 20,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		multihit: [2, 5],
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Bolt Beak", target);
		},
		secondary: null,
		target: "normal",
		type: "Electric",
		zMove: { basePower: 140 },
		maxMove: { basePower: 130 },
		contestType: "Cool",
	},
	condensate: {
		num: -24,
		accuracy: 100,
		basePower: 65,
		category: "Special",
		name: "Condensate",
		shortDesc: "Power x2 if on Misty Terrain.",
		pp: 15,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
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
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Icy Wind", target);
		},
		secondary: null,
		target: "normal",
		type: "Ice",
	},
	chillblain: {
		num: -25,
		accuracy: 85,
		basePower: 0,
		category: "Status",
		name: "Chillblain",
		shortDesc: "Freezes the target.",
		pp: 20,
		priority: 0,
		flags: { protect: 1, reflectable: 1, mirror: 1 },
		status: 'frz',
		ignoreImmunity: false,
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Icy Wind", target);
		},
		secondary: null,
		target: "normal",
		type: "Ice",
		contestType: "Cool",
	},
	monkeypunch: {
		num: -26,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Monkey Punch",
		pp: 10,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, punch: 1 },
		onEffectiveness(typeMod, target, type) {
			if (type === 'Grass' || type === 'Bug') return 1;
		},
		onPrepareHit: function (target, source) {
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
		num: -27,
		accuracy: 95,
		basePower: 75,
		category: "Special",
		shortDesc: "Power doubles if last move failed or was resisted.",
		name: "Indomitable Spirit",
		pp: 10,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		basePowerCallback(pokemon, target, move) {
			if (pokemon.moveLastTurnResult === false) return move.basePower * 2; // if the last move failed
			if (pokemon.volatiles['indomitablespirit'].boost === 'lastMoveResisted') return move.basePower * 2; // if the last move was resisted - problematic line
			return move.basePower;
		},
		onPrepareHit: function (target, source) {
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
		secondary: null,
		target: "normal",
		type: "Fighting",
	},
	cosmicpunch: {
		num: -28,
		accuracy: 100,
		basePower: 80,
		desc: "Deals damage to the target based on its Special Defense instead of Defense.",
		shortDesc: "Damages target based on Sp. Def, not Defense.",
		category: "Physical",
		overrideDefensiveStat: 'spd',
		name: "Cosmic Punch",
		pp: 10,
		priority: 0,
		flags: { punch: 1, protect: 1, mirror: 1 },
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Dynamic Punch", target);
		},
		secondary: null,
		target: "normal",
		type: "Fighting",
	},
	musclecare: {
		num: -29,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Muscle Care",
		pp: 10,
		priority: 0,
		flags: { snatch: 1, heal: 1 },
		heal: [1, 2],
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Bulk Up", target);
		},
		secondary: null,
		target: "self",
		type: "Fighting",
		zMove: { effect: 'clearnegativeboost' },
		desc: "The user restores 1/2 of its maximum HP, rounded half up.",
		shortDesc: "Heals the user by 50% of its max HP.",
		contestType: "Clever",
	},
	dissolution: {
		num: -30,
		accuracy: 100,
		basePower: 70,
		category: "Special",
		name: "Dissolution",
		pp: 15,
		desc: "If the user moves after the target, the target's Ability is rendered ineffective as long as it remains active. If the target uses Baton Pass, the replacement will remain under this effect. If the target's Ability is As One, Battle Bond, Comatose, Disguise, Gulp Missile, Ice Face, Multitype, Power Construct, RKS System, Schooling, Shields Down, Stance Change, Tera Shift, Zen Mode, or Zero to Hero, this effect does not happen, and receiving the effect through Baton Pass ends the effect immediately.",
		shortDesc: "Nullifies the foe(s) Ability if the foe(s) move first.",
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		onHit(target) {
			if (target.getAbility().flags['cantsuppress']) return;
			if (target.newlySwitched || this.queue.willMove(target)) return;
			target.addVolatile('gastroacid');
		},
		onAfterSubDamage(damage, target) {
			if (target.getAbility().flags['cantsuppress']) return;
			if (target.newlySwitched || this.queue.willMove(target)) return;
			target.addVolatile('gastroacid');
		},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Acid Spray", target);
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Poison",
	},
	landslide: {
		num: -31,
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		name: "Landslide",
		shortDesc: "Removes the hazards on the field. Lowers the target's Speed by one stage.",
		pp: 15,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		onHit(target, source, move) {
			let success = false;
			if (!target.volatiles['substitute'] || move.infiltrates) success = !!this.boost({ spe: -1 });
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
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Mud Shot", target);
		},
		target: "normal",
		type: "Ground",
		contestType: "Tough",
	},
	epicenter: {
		num: -32,
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		name: "Epicenter",
		desc: "Deals damage two turns after this move is used. At the end of that turn, the damage is calculated at that time and dealt to the Pokemon at the position the target had when the move was used. If the user is no longer active at the time, damage is calculated based on the user's natural Special Attack stat, types, and level, with no boosts from its held item or Ability. Fails if this move or Doom Desire is already in effect for the target's position.",
		shortDesc: "Hits two turns after being used.",
		pp: 10,
		priority: 0,
		flags: { futuremove: 1, protect: 1, mirror: 1 },
		ignoreImmunity: true,
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
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Mud Shot", target);
		},
		secondary: null,
		target: "normal",
		type: "Ground",
		contestType: "Tough",
	},
	downdraft: {
		num: -33,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		name: "Downdraft",
		desc: "If the opponent is Flying type or has Levitate, the opponent's Speed is lowered by one stage.",
		shortDesc: "-1 Speed if the target has Levitate or is Flying type.",
		pp: 15,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		onAfterHit(this, target, source, move) {
			if (!(target.isGrounded())) {
				this.boost({ spe: -1 }, target, target, null, true);
			}
		},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hurricane", target);
		},
		secondary: null,
		target: "any",
		type: "Flying",
		contestType: "Cool",
	},
	clearmind: {
		num: -34,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Clear Mind",
		pp: 15,
		priority: 0,
		flags: { snatch: 1 },
		boosts: {
			spa: 1,
			accuracy: 1,
		},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Calm Mind", target);
		},
		secondary: null,
		target: "self",
		type: "Psychic",
		desc: "Raises the user's Special Attack and accuracy by 1 stage.",
		shortDesc: "Raises the user's Sp. Attack and accuracy by 1.",
		zMove: { boost: { spa: 1 } },
		contestType: "Cute",
	},
	golemstrike: {
		num: -35,
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		name: "Golem Strike",
		pp: 10,
		shortDesc: "10% chance to lower target's Def",
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 10,
			boosts: {
				def: -1,
			},
		},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Rock Wrecker", target);
		},
		target: "normal",
		type: "Rock",
		contestType: "Tough",
	},
	punishingblow: {
		num: -36,
		accuracy: 90,
		basePower: 80,
		category: "Physical",
		name: "Punishing Blow",
		shortDesc: "If the target has boosts, this move always results in a critical hit.",
		pp: 15,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		onModifyMove(move, pokemon, target) {
			let hasBoost = false;
			let i: BoostID;
			if (!target) return;
			for (i in target.boosts) {
				if (target.boosts[i] !== 0) hasBoost = true;
			}
			if (hasBoost) move.critRatio = 5;
		},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Wicked Blow", target);
		},
		secondary: null,
		target: "normal",
		type: "Ghost",
		contestType: "Cool",
	},
	draconiccurse: {
		num: -37,
		accuracy: 95,
		basePower: 90,
		category: "Special",
		name: "Draconic Curse",
		desc: "This move has 10% chance to lower the opponent's SpD.",
		shortDesc: "10% chance to lower opponent's SpD.",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		secondary: {
			chance: 10,
			boosts: {
				spd: -1,
			},
		},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Dragon Pulse", target);
		},
		target: "normal",
		type: "Dragon",
		contestType: "Tough",
	},
	draconicfury: {
		num: -38,
		accuracy: 100,
		basePower: 95,
		category: "Physical",
		name: "Draconic Fury",
		shortDesc: "Has a 10% to lower the target's Def.",
		pp: 10,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 10,
			boosts: {
				def: -1,
			},
		},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Outrage", target);
		},
		target: "normal",
		type: "Dragon",
		contestType: "Cool",
	},
	contrariety: {
		num: -39,
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
				if (pokemon.ability === 'truant' || pokemon.ability === 'contrary' || pokemon.getAbility().flags['cantsuppress']) continue;
				const oldAbility = pokemon.setAbility('contrary');
				if (oldAbility) this.add('-ability', pokemon, 'Contrary', '[from] move: Contrary');
				success = true;
			}
			return success;
		},
		secondary: null,
		onPrepareHit: function (target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Torment", target, source);
		},
		target: "all",
		type: "Dark",
		zMove: { boost: { def: 1 } },
	},
	blackflash: {
		num: -40,
		accuracy: 100,
		basePower: 120,
		category: "Special",
		name: "Black Flash",
		pp: 5,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		self: {
			boosts: {
				spa: -1,
				spd: -1,
			},
		},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Night Daze", target);
		},
		secondary: null,
		target: "normal",
		shortDesc: "Lowers the user's SpA and SpD by one afterward.",
		type: "Dark",
		contestType: "Tough",
	},
	hypnotichorror: {
		num: -41,
		accuracy: 100,
		basePower: 120,
		category: "Special",
		name: "Hypnotic Horror",
		pp: 5,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		self: {
			boosts: {
				spa: -1,
				spd: -1,
			},
		},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hypnosis", target);
			this.add('-anim', source, "Psycho Boost", target);
		},
		secondary: null,
		target: "normal",
		shortDesc: "Lowers the user's SpA and SpD by one afterward.",
		type: "Psychic",
		contestType: "Tough",
	},
	sneakyassault: {
		num: -42,
		accuracy: 100,
		basePower: 30,
		category: "Physical",
		shortDesc: "Hits three times. Each hit has 10% to lower the target's Def.",
		name: "Sneaky Assault",
		pp: 20,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		multihit: 3,
		secondary: {
			chance: 10,
			boosts: {
				def: -1,
			},
		},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Lash Out", target);
		},
		target: "normal",
		type: "Dark",
		contestType: "Cool",
	},
	mercuryshot: {
		num: -43,
		accuracy: 100,
		basePower: 70,
		category: "Special",
		name: "Mercury Shot",
		pp: 15,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		thawsTarget: true,
		secondary: {
			chance: 30,
			status: 'psn',
		},
		shortDesc: "30% to poison the target.",
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Flash Cannon", target);
		},
		target: "normal",
		type: "Steel",
		contestType: "Tough",
	},
	sweetheart: {
		num: -44,
		accuracy: 100,
		basePower: 65,
		category: "Special",
		name: "Sweetheart",
		pp: 10,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
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
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Dazzling Gleam", target);
		},
		shortDesc: "Heals the user's party's status conditions. Uses SpD instead of SpA.",
		overrideOffensiveStat: 'spd',
		secondary: null,
		target: "normal",
		type: "Fairy",
	},
	chakraterrain: {
		num: -45,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Chakra Terrain",
		desc: "Summons Chakra Terrain for 5 turns. All Fighting moves have full accuracy, and pulse moves have x1.3 power.",
		shortDesc: "Summons Chakra Terrain. 100% Acc for Fighting moves; x1.3 BP for pulse moves.",
		pp: 10,
		priority: 0,
		flags: { nonsky: 1 },
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
			onAnyAccuracy(accuracy, target, source, move) {
				if (move.type === 'Fighting' && source.isGrounded() && !source.isSemiInvulnerable()) {
					return true;
				}
				return accuracy;
			},
			onFieldStart(field, source, effect) {
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Chakra Terrain', '[from] ability: ' + effect.name, '[of] ' + source);
					this.add('-message', "Fighting-type moves used by grounded Pokémon won't miss.");
					this.add('-message', "Pulse moves will be boosted by 30%.");
				} else {
					this.add('-fieldstart', 'move: Chakra Terrain');
				}
			},
			onFieldResidualOrder: 27,
			onFieldResidualSubOrder: 7,
			onFieldEnd() {
				this.add('-fieldend', 'move: Chakra Terrain');
			},
		},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Psychic Terrain", target);
		},
		secondary: null,
		target: "all",
		type: "Fighting",
		zMove: { boost: { spe: 1 } },
		contestType: "Clever",
	},
	naturepower: {
		inherit: true,
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
			this.actions.useMove(move, pokemon, target);
			return null;
		},
	},
	terrainpulse: {
		inherit: true,
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
	},
	secretpower: {
		inherit: true,
		onModifyMove(move, pokemon) {
			if (this.field.isTerrain('')) return;
			move.secondaries = [];
			if (this.field.isTerrain('electricterrain')) {
				move.secondaries.push({
					chance: 30,
					status: 'par',
				});
			} else if (this.field.isTerrain('grassyterrain')) {
				move.secondaries.push({
					chance: 30,
					status: 'slp',
				});
			} else if (this.field.isTerrain('mistyterrain')) {
				move.secondaries.push({
					chance: 30,
					boosts: {
						spa: -1,
					},
				});
			} else if (this.field.isTerrain('psychicterrain')) {
				move.secondaries.push({
					chance: 30,
					boosts: {
						spe: -1,
					},
				});
			} else if (this.field.isTerrain('chakraterrain')) {
				move.secondaries.push({
					chance: 30,
					boosts: {
						def: -1,
					},
				});
			}
		},
	},
	camouflage: {
		inherit: true,
		onHit(target) {
			let newType = 'Normal';
			if (this.field.isTerrain('electricterrain')) {
				newType = 'Electric';
			} else if (this.field.isTerrain('grassyterrain')) {
				newType = 'Grass';
			} else if (this.field.isTerrain('mistyterrain')) {
				newType = 'Fairy';
			} else if (this.field.isTerrain('psychicterrain')) {
				newType = 'Psychic';
			} else if (this.field.isTerrain('chakraterrain')) {
				newType = 'Fighting';
			}

			if (target.hasItem('identitycard')) return false;
			if (target.getTypes().join() === newType || !target.setType(newType)) return false;
			this.add('-start', target, 'typechange', newType);
		},
	},
	sonicboom: {
		inherit: true,
		damage: null,
		basePower: 40,
		accuracy: 100,
		category: "Special",
		desc: "Priority +1, Sound move.",
		shortDesc: "Usually goes first. Sound Move.",
		name: "Sonic Boom",
		priority: 1,
		isNonstandard: null,
		flags: { sound: 1, protect: 1, mirror: 1 },
		secondary: null,
		target: "normal",
		type: "Normal",
	},
	rockwrecker: {
		inherit: true,
		shortDesc: "Cannot be selected the turn after it's used.",
		flags: { protect: 1, mirror: 1, metronome: 1, bullet: 1, cantusetwice: 1 },
		self: null,
	},
	triplekick: {
		inherit: true,
		accuracy: 90,
		basePower: 20,
	},
	playrough: {
		inherit: true,
		accuracy: 100,
	},
	payback: {
		inherit: true,
		basePower: 60,
		basePowerCallback(pokemon, target, move) {
			if (target.newlySwitched || this.queue.willMove(target)) {
				this.debug('Payback NOT boosted');
				return move.basePower;
			}
			this.debug('Payback damage boost');
			return move.basePower * 2;
		},
		shortDesc: "Usually goes last. Power doubles if the user moves after the target.",
		priority: -1,
	},
	armthrust: {
		inherit: true,
		basePower: 25,
	},
	crosschop: {
		inherit: true,
		accuracy: 85,
		basePower: 120,
		pp: 10,
		shortDesc: "No additional effect.",
		desc: "No additional effect.",
	},
	submission: {
		inherit: true,
		accuracy: 100,
		basePower: 120,
		pp: 15,
		recoil: [33, 100],
		desc: "If the target lost HP, the user takes recoil damage equal to 33% the HP lost by the target, rounded half up, but not less than 1 HP.",
		shortDesc: "Has 33% recoil.",
	},
	powdersnow: {
		inherit: true,
		basePower: 20,
		pp: 20,
		secondary: {
			chance: 100,
			status: 'frz',
		},
		desc: "Has a 100% chance to freeze the target.",
		shortDesc: "100% chance to freeze the target.",
	},
	nightdaze: {
		inherit: true,
		accuracy: 100,
		basePower: 95,
		desc: "Has a 20% chance to lower the target's Attack by 1 stage.",
		shortDesc: "20% chance to lower the target's Atk by 1.",
		secondary: {
			chance: 20,
			boosts: {
				atk: -1,
			},
		},
	},
	batonpass: {
		inherit: true,
		shortDesc: "User switches, passing Substitute and more. No longer passes stats.",
		self: {
			onHit(source) {
				source.clearBoosts();
				this.add('-clearboost', source);
			}
		}
	},
	lowsweep: {
		inherit: true,
		basePower: 60,
	},
	powergem: {
		inherit: true,
		basePower: 95,
		desc: "Has a 10% chance to raise the user's Defense by 1 stage.",
		shortDesc: "10% chance to raise user's Defense by 1.",
		secondary: {
			chance: 10,
			self: {
				boosts: {
					def: 1,
				},
			},
		},
	},
	roaroftime: {
		inherit: true,
		accuracy: 95,
		basePower: 100,
		onHit() {
			this.field.clearTerrain();
			this.field.clearWeather();
		},
		onAfterSubDamage() {
			this.field.clearTerrain();
			this.field.clearWeather();
		},
		self: null,
		desc: "Ends the effects of Electric Terrain, Grassy Terrain, Misty Terrain, Psychic Terrain, Chakra Terrain, Snow, Hail, Sun, Rain, and Sand.",
		shortDesc: "Ends the effects of terrain and weather.",
		flags: { protect: 1, mirror: 1, metronome: 1 },
	},
	spacialrend: {
		inherit: true,
		critRatio: 1,
		onAfterHit: function (target, source) {
			this.field.removePseudoWeather('trickroom');
			this.field.removePseudoWeather('magicroom');
			this.field.removePseudoWeather('wonderroom');
		},
		desc: "Ends the effects of Trick Room, Magic Room, and Wonder Room.",
		shortDesc: "Ends the effects of rooms",
		flags: { protect: 1, mirror: 1, metronome: 1 },
	},
	freezeshock: {
		inherit: true,
		flags: { protect: 1, mirror: 1, cantusetwice: 1 },
		onTryMove(attacker, defender, move) {
			return;
		},
		shortDesc: "Cannot be selected the turn after it's used.",
	},
	iceburn: {
		inherit: true,
		flags: { protect: 1, mirror: 1, cantusetwice: 1 },
		onTryMove(attacker, defender, move) {
			return;
		},
		shortDesc: "Cannot be selected the turn after it's used.",
	},
	relicsong: {
		inherit: true,
		basePower: 95,
		secondary: null,
		self: {
			sideCondition: 'luckychant',
		},
		desc: "This move summons Lucky Chant for 5 turns upon use. If this move is successful on at least one target and the user is a Meloetta, it changes to Pirouette Forme if it is currently in Aria Forme, or changes to Aria Forme if it is currently in Pirouette Forme. This forme change does not happen if the Meloetta has the Sheer Force Ability. The Pirouette Forme reverts to Aria Forme when Meloetta is not active.",
		shortDesc: "Summons Lucky Chant. Meloetta transforms.",
	},
	multiattack: {
		inherit: true,
		desc: "This move's type depends on the user's primary type. If the user's primary type is typeless, this move's type is the user's secondary type if it has one, otherwise the added type from Forest's Curse or Trick-or-Treat. This move is typeless if the user's type is typeless alone.",
		shortDesc: "Type varies based on the user's primary type.",
		onModifyType(move, pokemon) {
			let type = pokemon.types[0];
			if (type === "Bird") type = "???";
			move.type = type;
		},
	},
	prismaticlaser: {
		inherit: true,
		basePower: 130,
		flags: { charge: 1, protect: 1, mirror: 1, metronome: 1 },
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name);
			this.boost({ spa: 1 }, attacker, attacker, move);
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
		self: null,
		desc: "This attack charges on the first turn and executes on the second. Raises the user's Special Attack by 1 stage on the first turn. If the user is holding a Power Herb, the move completes in one turn.",
		shortDesc: "Raises user's Sp. Atk by 1 on turn 1. Hits turn 2.",
	},
	photongeyser: {
		inherit: true,
		basePowerCallback(pokemon, target, move) {
			if (pokemon.species.name === 'Necrozma-Ultra') {
				return move.basePower + 20;
			}
			return move.basePower;
		},
	},
	eternabeam: {
		inherit: true,
		accuracy: 100,
		basePower: 150,
		flags: { protect: 1, mirror: 1 },
		mindBlownRecoil: true,
		onAfterMove(pokemon, target, move) {
			if (move.mindBlownRecoil && !move.multihit) {
				this.damage(Math.round(pokemon.maxhp / 2), pokemon, pokemon, this.dex.conditions.get('Eternabeam'), true);
			}
		},
		self: null,
		desc: "Whether or not this move is successful and even if it would cause fainting, the user loses 1/2 of its maximum HP, rounded up, unless the user has the Magic Guard Ability. This move is prevented from executing and the user does not lose HP if any active Pokemon has the Damp Ability.",
		shortDesc: "User loses 50% max HP.",
	},
	// wickedblow: {
	// 	inherit: true,
	// 	basePower: 60,
	// },
	bouncybubble: {
		inherit: true,
		basePower: 90,
		isNonstandard: null,
	},
	buzzybuzz: {
		inherit: true,
		basePower: 120,
		isNonstandard: null,
		shortDesc: "10% to paralyze target.",
		pp: 10,
		secondary: {
			chance: 10,
			status: 'par',
		},
	},
	sizzlyslide: {
		inherit: true,
		basePower: 85,
		isNonstandard: null,
		shortDesc: "30% chance to burn target.",
		secondary: {
			chance: 30,
			status: 'brn',
		},
	},
	glitzyglow: {
		inherit: true,
		desc: "Lowers the target's Special Attack and Special Defense by 1 stage.",
		shortDesc: "Lowers target's Sp. Atk, Sp. Def by 1.",
		self: null,
		boosts: {
			spa: -1,
			spd: -1,
		},
	},
	baddybad: {
		inherit: true,
		desc: "Lowers the target's Attack and Defense by 1 stage.",
		shortDesc: "Lowers target's Atk, Def by 1.",
		self: null,
		boosts: {
			atk: -1,
			def: -1,
		},
	},
	sappyseed: {
		inherit: true,
		accuracy: 100,
		basePower: 40,
		isNonstandard: null,
	},
	freezyfrost: {
		inherit: true,
		isNonstandard: null,
	},
	sparklyswirl: {
		inherit: true,
		accuracy: 100,
		isNonstandard: null,
		self: {
			sideCondition: 'luckychant',
		},
		desc: "This move summons Lucky Chant for 5 turns upon use.",
		shortDesc: "Summons Lucky Chant.",
	},
	veeveevolley: {
		inherit: true,
		isNonstandard: null,
	},
	pikapapow: {
		inherit: true,
		isNonstandard: null,
	},
	splishysplash: {
		inherit: true,
		isNonstandard: null,
	},
	zippyzap: {
		inherit: true,
		isNonstandard: null,
		secondary: {
			chance: 100,
			boosts: {
				evasion: -1,
			},
		},
		shortDesc: "100% chance to lower the target's evasion by 1.",
		desc: "100% chance to lower the target's evasion by 1.",
	},
	ragingfury: {
		inherit: true,
		basePower: 130,
		self: null,
		onAfterMove(pokemon) { },
		basePowerCallback(pokemon, target, move) {
			let bp = move.basePower;
			if (pokemon.volatiles['ragingfury'] && pokemon.volatiles['ragingfury'].hitCount) {
				bp -= 30 * pokemon.volatiles['ragingfury'].hitCount;
			}
			if (pokemon.status !== 'slp') pokemon.addVolatile('ragingfury');
			this.debug("Rollout bp: " + bp);
			return bp;
		},
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
		shortDesc: "Lowers in BP after each use (5 turns max).",
		desc: "This move lowers in power after each use (5 turns max).",
	},
	bittermalice: {
		inherit: true,
		basePower: 60,
		basePowerCallback(pokemon, target, move) {
			if (target.status === 'frz' || target.hasAbility('comatose')) return move.basePower * 2;
			return move.basePower;
		},
		desc: "Has a 30% chance to freeze the target. Power doubles if the target has a non-volatile status condition.",
		shortDesc: "30% freeze. 2x power if target is already statused.",
		secondary: {
			chance: 30,
			status: 'frz',
		},
	},
	shelter: {
		inherit: true,
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
		boosts: null,
		shortDesc: "Protects from moves. Contact: resets opponent's stat boosts.",
	},
	triplearrows: {
		inherit: true,
		volatileStatus: 'focusenergy',
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
		desc: "100% chance to raise the user's Speed by 1 stage. Raise crit ratio by 2 stages. Target: 50% -1 Defense.",
		shortDesc: "100% chance to +1 Speed; +2 crit ratio; -1 Def to target.",
	},
	direclaw: {
		inherit: true,
		basePower: 90,
		shortDesc: "50% chance to poison the target.",
		secondary: {
			chance: 50,
			status: 'psn',
		},
	},
	fissure: {
		inherit: true,
		accuracy: 100,
		basePower: 90,
		ohko: false,
		desc: "10% chance to lower the target's Defense by 1.",
		shortDesc: "10% chance to lower the target's Defense by 1.",
		pp: 10,
		secondary: {
			chance: 10,
			boosts: {
				def: -1,
			},
		},
	},
	sheercold: {
		inherit: true,
		accuracy: 100,
		basePower: 150,
		ohko: false,
		desc: "Sets Snow. User faints after use.",
		shortDesc: "Sets Snow. User faints after use.",
		weather: 'snow',
		secondary: null,
		selfdestruct: "always",
	},
	mistyexplosion: {
		inherit: true,
		basePower: 150,
		desc: "Sets Misty Terrain. User faints after use.",
		shortDesc: "Sets Misty Terrain. User faints after use.",
		terrain: 'mistyterrain',
	},
	guillotine: {
		inherit: true,
		accuracy: 100,
		basePower: 90,
		ohko: false,
		desc: "Raises user's Attack by 1 if this KOes the target.",
		shortDesc: "Raises user's Attack by 1 if this KOes the target.",
		pp: 10,
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (!target || target.fainted || target.hp <= 0) this.boost({ atk: 1 }, pokemon, pokemon, move);
		},
	},
	horndrill: {
		inherit: true,
		accuracy: 85,
		basePower: 120,
		ohko: false,
		desc: "No additional effect.",
		shortDesc: "No additional effect.",
		pp: 10,
		type: "Steel",
	},
	hiddenpower: {
		inherit: true,
		basePower: 80,
		shortDesc: "Varies in type based on the user's IVs. Physical if user's Atk > Sp. Atk.",
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
	},
	hiddenpowerbug: {
		inherit: true,
		basePower: 80,
		shortDesc: "Physical if user's Atk > Sp. Atk.",
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
	},
	hiddenpowerdark: {
		inherit: true,
		basePower: 80,
		shortDesc: "Physical if user's Atk > Sp. Atk.",
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
	},
	hiddenpowerdragon: {
		inherit: true,
		basePower: 80,
		shortDesc: "Physical if user's Atk > Sp. Atk.",
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
	},
	hiddenpowerelectric: {
		inherit: true,
		basePower: 80,
		shortDesc: "Physical if user's Atk > Sp. Atk.",
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
	},
	hiddenpowerfighting: {
		inherit: true,
		basePower: 80,
		shortDesc: "Physical if user's Atk > Sp. Atk.",
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
	},
	hiddenpowerfire: {
		inherit: true,
		basePower: 80,
		shortDesc: "Physical if user's Atk > Sp. Atk.",
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
	},
	hiddenpowerflying: {
		inherit: true,
		basePower: 80,
		shortDesc: "Physical if user's Atk > Sp. Atk.",
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
	},
	hiddenpowerghost: {
		inherit: true,
		basePower: 80,
		shortDesc: "Physical if user's Atk > Sp. Atk.",
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
	},
	hiddenpowergrass: {
		inherit: true,
		basePower: 80,
		shortDesc: "Physical if user's Atk > Sp. Atk.",
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
	},
	hiddenpowerground: {
		inherit: true,
		basePower: 80,
		shortDesc: "Physical if user's Atk > Sp. Atk.",
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
	},
	hiddenpowerice: {
		inherit: true,
		basePower: 80,
		shortDesc: "Physical if user's Atk > Sp. Atk.",
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
	},
	hiddenpowerpoison: {
		inherit: true,
		basePower: 80,
		shortDesc: "Physical if user's Atk > Sp. Atk.",
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
	},
	hiddenpowerpsychic: {
		inherit: true,
		basePower: 80,
		shortDesc: "Physical if user's Atk > Sp. Atk.",
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
	},
	hiddenpowerrock: {
		inherit: true,
		basePower: 80,
		shortDesc: "Physical if user's Atk > Sp. Atk.",
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
	},
	hiddenpowersteel: {
		inherit: true,
		basePower: 80,
		shortDesc: "Physical if user's Atk > Sp. Atk.",
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
	},
	hiddenpowerwater: {
		inherit: true,
		basePower: 80,
		shortDesc: "Physical if user's Atk > Sp. Atk.",
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
	},
	snipeshot: {
		inherit: true,
		basePower: 60,
		willCrit: true,
		shortDesc: "Always results in a critical hit. Cannot be redirected.",
		desc: "Always results in a critical hit. Cannot be redirected.",
	},
	lightningassault: {
		num: -46,
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
		flags: { protect: 1, mirror: 1 },
		secondary: null,
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Spark", target);
		},
		target: "normal",
		type: "Flying",
		zMove: { basePower: 160 },
		maxMove: { basePower: 130 },
		contestType: "Cool",
	},
	conversionz: {
		num: -47,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Conversion-Z",
		shortDesc: "Fails if the user has an item. Raises all stats by 1, and user gets the type of its 3rd move.",
		pp: 5,
		priority: 0,
		flags: { snatch: 1, sound: 1, dance: 1 },
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
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Conversion", target);
		},
		secondary: null,
		target: "self",
		type: "Normal",
	},
	zawall: {
		num: -48,
		accuracy: 90,
		basePower: 120,
		category: "Physical",
		name: "Za Wall",
		desc: "This attack charges on the first turn and executes on the second. Raises the user's Attack by 1 stage on the first turn. If the user is holding a Power Herb, the move completes in one turn.",
		shortDesc: "Raises user's Atk by 1 on turn 1. Hits turn 2.",
		pp: 10,
		priority: 0,
		flags: { charge: 1, protect: 1, mirror: 1 },
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name);
			this.boost({ atk: 1 }, attacker, attacker, move);
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Head Smash", target);
		},
		secondary: null,
		target: "normal",
		type: "Rock",
	},
	awakening: {
		num: -49,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Awakening",
		pp: 10,
		priority: 0,
		desc: "Heal this Pokemon for 50% HP, and reveal one of opponent's move.",
		shortDesc: "Heal 50% HP; reveals random opponent's move.",
		flags: { snatch: 1, heal: 1 },
		heal: [1, 2],
		onHit(pokemon) {
			for (const target of pokemon.side.foe.active) {
				if (target.fainted) return;
				const temp = this.sample(target.moveSlots);
				this.add('-message', pokemon.name + "'s Awakening revealed the move " + temp.move + "!");
			}
		},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Dream Eater", target);
		},
		secondary: null,
		target: "self",
		type: "Psychic",
		zMove: { effect: 'clearnegativeboost' },
		contestType: "Beautiful",
	},
	fulldevotion: {
		num: -50,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Full Devotion",
		shortDesc: "One adjacent ally's move power is 1.5x this turn. Lowers damages this ally receives of 25%.",
		pp: 10,
		priority: 0,
		flags: { snatch: 1, heal: 1 },
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
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Psystrike", target);
		},
		secondary: null,
		target: "adjacentAlly",
		type: "Psychic",
		zMove: { effect: 'clearnegativeboost' },
		contestType: "Clever",
	},
	braveblade: {
		desc: "Physical if it would be stronger (Shell Side Arm clone). Hits Dark types for neutral damages.",
		shortDesc: "Physical if stronger. Hits Dark types for neutral damages.",
		num: -51,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Brave Blade",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, slicing: 1 },
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
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Spacial Rend", target);
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
	},
	teramorphosis: {
		num: -52,
		accuracy: 100,
		basePower: 75,
		category: "Physical",
		name: "Teramorphosis",
		shortDesc: "Has 33% recoil. 50% chance to raise the user's Spe by 1.",
		pp: 10,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		recoil: [1, 3],
		secondary: {
			chance: 50,
			self: {
				boosts: {
					spe: 1,
				},
			},
		},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Grassy Glide", target);
		},
		target: "normal",
		type: "Grass",
		contestType: "Cool",
	},
	happydance: {
		num: -53,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Happy Dance",
		pp: 5,
		priority: 0,
		flags: { snatch: 1, dance: 1 },
		self: {
			boosts: {
				spa: 1,
			},
		},
		weather: 'RainDance',
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Rain Dance", target);
		},
		secondary: null,
		target: "all",
		type: "Water",
		shortDesc: "Raises the user's SpA by 1. Summons Rain Dance.",
		zMove: { effect: 'clearnegativeboost' },
		contestType: "Beautiful",
	},
	windscall: {
		num: -54,
		accuracy: 100,
		basePower: 40,
		category: "Special",
		shortDesc: "Sets Tailwind.",
		name: "Wind's Call",
		pp: 5,
		priority: 0,
		flags: { protect: 1, wind: 1, mirror: 1 },
		self: {
			sideCondition: 'tailwind',
		},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Tailwind", target);
		},
		secondary: null,
		target: "normal",
		type: "Flying",
		contestType: "Clever",
	},
	houndshowl: {
		num: -55,
		accuracy: 100,
		basePower: 40,
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
		flags: { contact: 1, protect: 1, mirror: 1 },
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
					if (!source.isAdjacent(pokemon) || !this.queue.cancelMove(source) || !source.hp) continue;
					if (!alreadyAdded) {
						this.add('-activate', pokemon, 'move: Hound\'s Howl');
						alreadyAdded = true;
					}
					// Run through each action in queue to check if the Pursuit user is supposed to Mega Evolve this turn.
					// If it is, then Mega Evolve before moving.
					if (source.canMegaEvo || source.canUltraBurst) {
						for (const [actionIndex, action] of this.queue.entries()) {
							if (action.pokemon === source && action.choice === 'megaEvo') {
								this.actions.runMegaEvo(source);
								this.queue.list.splice(actionIndex, 1);
								break;
							}
						}
					}
					this.actions.runMove('houndshowl', source, source.getLocOf(pokemon));
				}
			},
		},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hyper Voice", target);
		},
		secondary: null,
		target: "normal",
		type: "Ghost",
		contestType: "Clever",
	},
	dantesinferno: {
		num: -56,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Dante's Inferno",
		shortDesc: "Starts Sun.",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		weather: 'sunnyday',
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Inferno", target);
		},
		secondary: null,
		target: "normal",
		type: "Fire",
	},
	junglehealing: {
		inherit: true,
		onHit(pokemon) {
			const success = !!this.heal(this.modify(pokemon.maxhp, 0.33));
			return pokemon.cureStatus() || success;
		},
	},
	lifedew: {
		inherit: true,
		onHit(pokemon) {
			const success = !!this.heal(this.modify(pokemon.maxhp, 0.33));
			return pokemon.cureStatus() || success;
		},
	},
	lunarblessing: {
		inherit: true,
		onHit(pokemon) {
			const success = !!this.heal(this.modify(pokemon.maxhp, 0.33));
			return pokemon.cureStatus() || success;
		},
		shortDesc: "User and allies: healed 1/3 max HP, status cured.",
	},
	monkeybusiness: {
		num: -57,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Monkey Business",
		shortDesc: "Special if user's SpA > Atk. Eats the target's berry and restores it to the user. Type varies with the user's primary type.",
		pp: 10,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('spa', false, true) > pokemon.getStat('atk', false, true)) move.category = 'Special';
		},
		onModifyType(move, pokemon) {
			let type = pokemon.types[0];
			if (type === "Bird") type = "???";
			move.type = type;
		},
		onHit(pokemon) {
			if (pokemon.item && pokemon.getItem().isBerry) pokemon.eatItem(true);
			if (!pokemon.lastItem) return false;
			const item = pokemon.lastItem;
			pokemon.lastItem = '';
			this.add('-item', pokemon, this.dex.items.get(item), '[from] move: Monkey Business');
			pokemon.setItem(item);
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Normal",
	},
	swarming: {
		num: -58,
		accuracy: 100,
		basePower: 110,
		category: "Special",
		name: "Swarming",
		shortDesc: "Lowers the user's and the target's SpD by one stage.",
		desc: "Lowers the user's and the target's SpD by one stage.",
		pp: 5,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		self: {
			boosts: {
				spd: -1,
			},
		},
		secondary: {
			chance: 100,
			boosts: {
				spd: -1,
			},
		},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Bug Buzz", target);
		},
		target: "normal",
		type: "Bug",
		contestType: "Smart",
	},
	hardwareheat: {
		num: -59,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		name: "Hardware Heat",
		shortDesc: "Lowers the user's Speed by one stage.",
		desc: "Lowers the user's Speed by one stage.",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		self: {
			boosts: {
				spe: -1,
			},
		},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Inferno", target);
		},
		secondary: null,
		target: "normal",
		type: "Fire",
		contestType: "Tough",
	},
	enragedtext: {
		num: -60,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		name: "Enraged Text",
		shortDesc: "Raises the user's Atk by 1.",
		pp: 10,
		priority: 0,
		flags: { snatch: 1, sound: 1 },
		self: {
			boosts: {
				atk: 1,
			},
		},
		secondary: null,
		target: "normal",
		type: "Fighting",
		contestType: "Clever",
	},
	shattering: {
		num: -61,
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		name: "Shattering",
		shortDesc: "The user throws its held item. Fails if the user has no item.",
		desc: "The user throws its held item. Fails if the user has no item.",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, allyanim: 1, noparentalbond: 1 },
		onPrepareHit(target, source, move) {
			if (source.ignoringItem()) return false;
			const item = source.getItem();
			if (!this.singleEvent('TakeItem', item, source.itemState, source, source, move, item)) return false;
			if (!item.fling) return false;
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
					move.secondaries.push({ status: item.fling.status });
				} else if (item.fling.volatileStatus) {
					move.secondaries.push({ volatileStatus: item.fling.volatileStatus });
				}
			}
			source.addVolatile('fling');
			this.attrLastMove('[still]');
			this.add('-anim', source, "Fling", target);
		},
		condition: {
			onUpdate(pokemon) {
				const item = pokemon.getItem();
				pokemon.setItem('');
				pokemon.lastItem = item.id;
				pokemon.usedItemThisTurn = true;
				this.add('-enditem', pokemon, item.name, '[from] move: Shattering');
				this.runEvent('AfterUseItem', pokemon, null, null, item);
				pokemon.removeVolatile('fling');
			},
		},
		secondary: null,
		target: "normal",
		type: "Dark",
		contestType: "Tough",
	},
	defog: {
		inherit: true,
		flags: { protect: 1, reflectable: 1, mirror: 1, bypasssub: 1, wind: 1 },
	},
	grassyglide: {
		inherit: true,
		basePower: 70,
	},
	milkdrink: {
		inherit: true,
		pp: 10,
	},
	recover: {
		inherit: true,
		pp: 10,
	},
	rest: {
		inherit: true,
		pp: 10,
	},
	roost: {
		inherit: true,
		pp: 10,
	},
	shoreup: {
		inherit: true,
		pp: 10,
	},
	slackoff: {
		inherit: true,
		pp: 10,
	},
	softboiled: {
		inherit: true,
		pp: 10,
	},
	bleakwindstorm: {
		inherit: true,
		shortDesc: "20% chance to freeze foe(s).",
		secondary: {
			chance: 20,
			status: 'frz',
		},
	},
	axekick: {
		inherit: true,
		type: "Dark",
		shortDesc: "30% confusion. User loses 50% max HP if miss.",
	},
	ragingbull: {
		inherit: true,
		basePower: 120,
		secondary: {
			chance: 10,
			boosts: {
				def: -1,
			},
		},
	},
	tidyup: {
		inherit: true,
		shortDesc: "User +1 Atk, Spe, Acc. Clears all substitutes/hazards on user's side.",
		onHit(pokemon) {
			let success = false;
			for (const active of this.getAllActive()) {
				if (active.removeVolatile('substitute')) success = true;
			}
			const removeAll = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
			const sides = [pokemon.side, ...pokemon.side.foeSidesWithConditions()];
			for (const side of sides) {
				for (const sideCondition of removeAll) {
					if (side.removeSideCondition(sideCondition)) {
						this.add('-sideend', side, this.dex.conditions.get(sideCondition).name);
						success = true;
					}
				}
			}
			if (success) this.add('-activate', pokemon, 'move: Tidy Up');
			return !!this.boost({ atk: 1, spe: 1, accuracy: 1 }, pokemon, pokemon, null, false, true) || success;
		},
	},
	hyperdrill: {
		inherit: true,
		shortDesc: "Bypasses protection without breaking it. 50% chance to lower target's Def by 2 stages.",
		secondary: {
			chance: 50,
			boosts: {
				def: -2,
			},
		},
	},
	lastrespects: {
		inherit: true,
		basePowerCallback(pokemon, target, move) {
			return 50 + 15 * pokemon.side.totalFainted
		},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('spa', false, true) > pokemon.getStat('atk', false, true)) move.category = 'Special';
		},
		shortDesc: "+15 power for each time an ally fainted. Special if user's SpA > Atk.",
	},
	ragefist: {
		inherit: true,
		basePowerCallback(pokemon) {
			return Math.min(200, 50 + 25 * pokemon.timesAttacked);
		},
		shortDesc: "+25 power for each time user was hit. Max 6 hits.",
		desc: "Power increases by 25 for each time the user was hit this turn. Max 6 hits.",
	},
	gigatonhammer: {
		inherit: true,
		shortDesc: "Cannot be used twice in a row. Super effective on Steel targets.",
		onEffectiveness(typeMod, target, type) {
			if (type === 'Steel') return 1;
		},
	},
	blazingtorque: {
		inherit: true,
		isNonstandard: null,
	},
	combattorque: {
		inherit: true,
		isNonstandard: null,
	},
	magicaltorque: {
		inherit: true,
		isNonstandard: null,
		secondary: {
			chance: 20,
			boosts: {
				def: -1,
			},
		},
		shortDesc: "20% chance to lower target's Def by 1.",
		desc: "20% chance to lower target's Def by 1.",
	},
	noxioustorque: {
		inherit: true,
		isNonstandard: null,
	},
	wickedtorque: {
		inherit: true,
		isNonstandard: null,
		secondary: {
			chance: 20,
			boosts: {
				atk: -1,
			},
		},
		shortDesc: "20% chance to lower target's Atk by 1.",
		desc: "20% chance to lower target's Atk by 1.",
	},
	roguewave: {
		num: -62,
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		name: "Rogue Wave",
		shortDesc: "Has 33% recoil. Usually goes first.",
		pp: 10,
		priority: 1,
		flags: { contact: 1, protect: 1, mirror: 1 },
		recoil: [1, 3],
		secondary: null,
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Wave Crash", target);
		},
		target: "normal",
		type: "Water",
		contestType: "Cool",
	},
	natureswrath: {
		num: -63,
		accuracy: 100,
		basePower: 70,
		category: "Special",
		shortDesc: "Either Grass or Ground-type, whichever is more effective. Heals user by 12.5% of damage dealt.",
		name: "Nature's Wrath",
		pp: 10,
		flags: { protect: 1, mirror: 1, heal: 1, metronome: 1 },
		drain: [1, 8],
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Leaf Storm", target);
		},
		onModifyType(move, pokemon) {
			for (const target of pokemon.side.foe.active) {
				const type1 = 'Grass';
				const type2 = 'Ground';
				if (this.dex.getEffectiveness(type1, target) < this.dex.getEffectiveness(type2, target)) {
					move.type = 'Ground';
				} else if (target.hasType('Flying') || target.hasAbility('eartheater') || target.hasAbility('levitate')) {
					move.type = 'Grass';
				} else if (target.hasAbility('sapsipper')) {
					move.type = 'Ground';
				} else if (this.dex.getEffectiveness(type1, target) === this.dex.getEffectiveness(type2, target)) {
					if (pokemon.hasType('Ground') && !pokemon.hasType('Grass')) {
						move.type = 'Ground';
					}
				}
			}
		},
		onHit(target, source, move) {
			this.add('-message', `Nature's Wrath dealt ${move.type}-type damage!`);
		},
		priority: 0,
		secondary: null,
		target: "any",
		type: "Grass",
		zMove: { basePower: 170 },
		contestType: "Tough",
	},
	magicmissile: {
		num: -64,
		accuracy: true,
		basePower: 25,
		category: "Special",
		name: "Magic Missile",
		shortDesc: "Hits 2-5 times in one turn. Does not check accuracy, bypasses immunities, and always hits for at least neutral damages.",
		desc: "Hits two to five times. This move does not check accuracy, bypasses immunities, and always hits for at least neutral damages.",
		pp: 20,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		multihit: [2, 5],
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Swift", target);
		},
		basePowerCallback(pokemon, target, move) {
			if (target.getMoveHitData(move).typeMod < 0) {
				this.debug('Magic Missile damage boost');
				return move.basePower * 2;
			}
			return move.basePower;
		},
		onModifyMove(move, pokemon, target) {
			let type = move.type;
			if (!move.ignoreImmunity) move.ignoreImmunity = {};
			if (move.ignoreImmunity !== true) {
				move.ignoreImmunity[type] = true;
			}
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		zMove: { basePower: 140 },
		maxMove: { basePower: 130 },
		contestType: "Smart",
	},
	chatter: {
		inherit: true,
		basePower: 80,
		isNonstandard: null,
		pp: 10,
		secondary: {
			chance: 100,
			self: {
				boosts: {
					spa: 1,
				},
			},
		},
		desc: "Has a 100% chance to raise the user's Special Attack by 1 stage.",
		shortDesc: "100% chance to raise the user's Sp. Atk by 1.",
	},
	waterpulse: {
		inherit: true,
		basePower: 80,
	},
	shadowpunch: {
		inherit: true,
		secondary: {
			chance: 100,
			volatileStatus: 'healblock',
		},
		desc: "For 2 turns, the target is prevented from restoring any HP as long as it remains active. During the effect, healing and draining moves are unusable, and Abilities and items that grant healing will not heal the user. If an affected Pokemon uses Baton Pass, the replacement will remain unable to restore its HP. Pain Split and the Regenerator Ability are unaffected. Does not check accuracy.",
		shortDesc: "For 2 turns, the target is prevented from healing. Does not check accuracy.",
	},
	healblock: {
		inherit: true,
		condition: {
			duration: 5,
			durationCallback(target, source, effect) {
				if (effect?.name === "Psychic Noise" || effect?.name === "Shadow Punch") {
					return 2;
				}
				if (source?.hasAbility('persistent')) {
					this.add('-activate', source, 'ability: Persistent', '[move] Heal Block');
					return 7;
				}
				return 5;
			},
			onStart(pokemon, source) {
				this.add('-start', pokemon, 'move: Heal Block');
				source.moveThisTurnResult = true;
			},
			onDisableMove(pokemon) {
				for (const moveSlot of pokemon.moveSlots) {
					if (this.dex.moves.get(moveSlot.id).flags['heal']) {
						pokemon.disableMove(moveSlot.id);
					}
				}
			},
			onBeforeMovePriority: 6,
			onBeforeMove(pokemon, target, move) {
				if (move.flags['heal'] && !move.isZ && !move.isMax) {
					this.add('cant', pokemon, 'move: Heal Block', move);
					return false;
				}
			},
			onModifyMove(move, pokemon, target) {
				if (move.flags['heal'] && !move.isZ && !move.isMax) {
					this.add('cant', pokemon, 'move: Heal Block', move);
					return false;
				}
			},
			onResidualOrder: 20,
			onEnd(pokemon) {
				this.add('-end', pokemon, 'move: Heal Block');
			},
			onTryHeal(damage, target, source, effect) {
				if ((effect?.id === 'zpower') || this.effectState.isZ) return damage;
				return false;
			},
			onRestart(target, source, effect) {
				if (effect?.name === 'Psychic Noise') return;

				this.add('-fail', target, 'move: Heal Block'); // Succeeds to supress downstream messages
				if (!source.moveThisTurnResult) {
					source.moveThisTurnResult = false;
				}
			},
		},
	},
	meteorassault: {
		inherit: true,
		flags: {cantusetwice: 1, slicing: 1, protect: 1, mirror: 1, failinstruct: 1},
		self: null,
		shortDesc: "Cannot be selected the turn after it's used.",
	},
	psyblade: {
		inherit: true,
		onBasePower(basePower, source) {
			return basePower;
		},
		terrain: 'electricterrain',
		shortDesc: "Sets Electric Terrain upon use.",
		desc: "Sets Electric Terrain upon use.",
	},
	revivalblessing: {
		inherit: true,
		flags: {heal: 1, noassist: 1},
	},
	fatbombing: {
		num: -65,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		name: "Fat Bombing",
		pp: 10,
		priority: 0,
		flags: {allyanim: 1, metronome: 1, futuremove: 1},
		ignoreImmunity: true,
		onTry(source, target) {
			if (!target.side.addSlotCondition(target, 'futuremove')) return false;
			Object.assign(target.side.slotConditions[target.position]['futuremove'], {
				duration: 3,
				move: 'fatbombing',
				source: source,
				moveData: {
					id: 'fatbombing',
					name: "Fat Bombing",
					accuracy: 100,
					basePower: 100,
					category: "Physical",
					priority: 0,
					flags: {allyanim: 1, metronome: 1, futuremove: 1},
					ignoreImmunity: false,
					effectType: 'Move',
					type: 'Rock',
				},
			});
			this.add('-start', source, 'move: Fat Bombing');
			return this.NOT_FAIL;
		},
		onBasePower(basePower) {
			if (this.field.getPseudoWeather('gravity')) {
				return this.chainModify(2);
			}
		},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Rock Blast", target);
		},
		secondary: null,
		target: "normal",
		type: "Rock",
		contestType: "Clever",
		desc: "This move deals double damage if used under Gravity. Deals damage two turns after this move is used. At the end of that turn, the damage is calculated at that time and dealt to the Pokemon at the position the target had when the move was used. If the user is no longer active at the time, damage is calculated based on the user's natural Special Attack stat, types, and level, with no boosts from its held item or Ability. Fails if this move or Doom Desire is already in effect for the target's position.",
		shortDesc: "Double damage if used under Gravity. Hits two turns after being used.",
	},
	// Everlasting Winter field
	auroraveil: {
		inherit: true,
		onTry() {
			return this.field.isWeather(['hail', 'snow', 'everlastingwinter']);
		},
	},
	blizzard: {
		inherit: true,
		onModifyMove(move) {
			if (this.field.isWeather(['hail', 'snow', 'everlastingwinter'])) move.accuracy = true;
		},
	},
	dig: {
		inherit: true,
		condition: {
			duration: 2,
			onImmunity(type, pokemon) {
				if (type === 'sandstorm' || type === 'hail' || type === 'everlastingwinter') return false;
			},
			onInvulnerability(target, source, move) {
				if (['earthquake', 'magnitude'].includes(move.id)) {
					return;
				}
				return false;
			},
			onSourceModifyDamage(damage, source, target, move) {
				if (move.id === 'earthquake' || move.id === 'magnitude') {
					return this.chainModify(2);
				}
			},
		},
	},
	dive: {
		inherit: true,
		condition: {
			duration: 2,
			onImmunity(type, pokemon) {
				if (type === 'sandstorm' || type === 'hail' || type === 'everlastingwinter') return false;
			},
			onInvulnerability(target, source, move) {
				if (['surf', 'whirlpool'].includes(move.id)) {
					return;
				}
				return false;
			},
			onSourceModifyDamage(damage, source, target, move) {
				if (move.id === 'surf' || move.id === 'whirlpool') {
					return this.chainModify(2);
				}
			},
		},
	},
	moonlight: {
		inherit: true,
		onHit(pokemon) {
			let factor = 0.5;
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
				factor = 0.667;
				break;
			case 'raindance':
			case 'primordialsea':
			case 'sandstorm':
			case 'hail':
			case 'snow':
			case 'everlastingwinter':
				factor = 0.25;
				break;
			}
			const success = !!this.heal(this.modify(pokemon.maxhp, factor));
			if (!success) {
				this.add('-fail', pokemon, 'heal');
				return this.NOT_FAIL;
			}
			return success;
		},
	},
	morningsun: {
		inherit: true,
		onHit(pokemon) {
			let factor = 0.5;
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
				factor = 0.667;
				break;
			case 'raindance':
			case 'primordialsea':
			case 'sandstorm':
			case 'hail':
			case 'snow':
			case 'everlastingwinter':
				factor = 0.25;
				break;
			}
			const success = !!this.heal(this.modify(pokemon.maxhp, factor));
			if (!success) {
				this.add('-fail', pokemon, 'heal');
				return this.NOT_FAIL;
			}
			return success;
		},
	},
	solarbeam: {
		inherit: true,
		onBasePower(basePower, pokemon, target) {
			const weakWeathers = ['raindance', 'primordialsea', 'sandstorm', 'hail', 'snow', 'everlastingwinter'];
			if (weakWeathers.includes(pokemon.effectiveWeather())) {
				this.debug('weakened by weather');
				return this.chainModify(0.5);
			}
		},
	},
	solarblade: {
		inherit: true,
		onBasePower(basePower, pokemon, target) {
			const weakWeathers = ['raindance', 'primordialsea', 'sandstorm', 'hail', 'snow', 'everlastingwinter'];
			if (weakWeathers.includes(pokemon.effectiveWeather())) {
				this.debug('weakened by weather');
				return this.chainModify(0.5);
			}
		},
	},
	synthesis: {
		inherit: true,
		onHit(pokemon) {
			let factor = 0.5;
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
				factor = 0.667;
				break;
			case 'raindance':
			case 'primordialsea':
			case 'sandstorm':
			case 'hail':
			case 'snow':
			case 'everlastingwinter':
				factor = 0.25;
				break;
			}
			const success = !!this.heal(this.modify(pokemon.maxhp, factor));
			if (!success) {
				this.add('-fail', pokemon, 'heal');
				return this.NOT_FAIL;
			}
			return success;
		},
	},
	weatherball: {
		inherit: true,
		onModifyType(move, pokemon) {
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
				move.type = 'Fire';
				break;
			case 'raindance':
			case 'primordialsea':
				move.type = 'Water';
				break;
			case 'sandstorm':
				move.type = 'Rock';
				break;
			case 'hail':
			case 'snow':
			case 'everlastingwinter':
				move.type = 'Ice';
				break;
			}
		},
		onModifyMove(move, pokemon) {
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
				move.basePower *= 2;
				break;
			case 'raindance':
			case 'primordialsea':
				move.basePower *= 2;
				break;
			case 'sandstorm':
				move.basePower *= 2;
				break;
			case 'hail':
			case 'snow':
			case 'everlastingwinter':
				move.basePower *= 2;
				break;
			}
			this.debug('BP: ' + move.basePower);
		},
	},
	// Karma field
	wish: {
		inherit: true,
		flags: {snatch: 1, heal: 1, metronome: 1, futuremove: 1},
		condition: {
			duration: 2,
			onStart(pokemon, source) {
				if (source.hasAbility('karma')) {
					this.effectState.hp = 3* source.maxhp / 4;
				} 
				else {
					this.effectState.hp = source.maxhp / 2;
				}
			},
			onResidualOrder: 4,
			onEnd(target) {
				if (target && !target.fainted) {
					const damage = this.heal(this.effectState.hp, target, target);
					if (damage) {
						this.add('-heal', target, target.getHealth, '[from] move: Wish', '[wisher] ' + this.effectState.source.name);
					}
				}
			},
		},
	},


	// Endless Dream field
	wakeupslap: {
		inherit: true,
		basePowerCallback(pokemon, target, move) {
			if (target.status === 'slp' || target.hasAbility('comatose') || target.hasAbility('endlessdream') || pokemon.hasAbility('endlessdream')) return move.basePower * 2;
			return move.basePower;
		},
	},
	dreameater: {
		inherit: true,
		onTryImmunity(target, source) {
			return target.status === 'slp' || target.hasAbility('comatose') || target.hasAbility('endlessdream') || source.hasAbility('endlessdream');
		},
	},
	nightmare: {
		inherit: true,
		condition: {
			noCopy: true,
			onStart(pokemon) {
				if (pokemon.status !== 'slp' && !pokemon.hasAbility('comatose') && !pokemon.hasAbility('endlessdream')) {
					return false;
				}
				this.add('-start', pokemon, 'Nightmare');
			},
			onResidualOrder: 9,
			onResidual(pokemon) {
				this.damage(pokemon.baseMaxhp / 4);
			},
		},
	},
	sleeptalk: {
		inherit: true,
		onTry(source) {
			let usable = false;
			for (const opponent of source.adjacentFoes()) {
				if (opponent.hasAbility('endlessdream')) {
					usable = true;
					break;
				}
			}
			return source.status === 'slp' || source.hasAbility('comatose') || usable;
		},
	},
	ultrasleep: { //this move is only for Endless Dream ability
		num: -9999,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Ultrasleep",
		pp: 5,
		priority: -7,
		flags: { mirror: 1 },
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
		zMove: { boost: { accuracy: 1 } },
		contestType: "Clever",
	},

	// Tactical Escape field
	stealthrock: {
		inherit: true,
		condition: {
			// this is a side condition
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Stealth Rock');
			},
			onEntryHazard(pokemon) {
				if (pokemon.hasItem('heavydutyboots') || pokemon.hasAbility('tacticalescape')) return;
				const typeMod = this.clampIntRange(pokemon.runEffectiveness(this.dex.getActiveMove('stealthrock')), -6, 6);
				this.damage(pokemon.maxhp * Math.pow(2, typeMod) / 8);
			},
		},
	},
	spikes: {
		inherit: true,
		condition: {
			// this is a side condition
			onSideStart(side) {
				this.add('-sidestart', side, 'Spikes');
				this.effectState.layers = 1;
			},
			onSideRestart(side) {
				if (this.effectState.layers >= 3) return false;
				this.add('-sidestart', side, 'Spikes');
				this.effectState.layers++;
			},
			onEntryHazard(pokemon) {
				if (!pokemon.isGrounded() || pokemon.hasItem('heavydutyboots') || pokemon.hasAbility('tacticalescape')) return;
				const damageAmounts = [0, 3, 4, 6]; // 1/8, 1/6, 1/4
				this.damage(damageAmounts[this.effectState.layers] * pokemon.maxhp / 24);
			},
		},
	},
	toxicspikes: {
		inherit: true,
		condition: {
			// this is a side condition
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Toxic Spikes');
				this.effectState.layers = 1;
			},
			onSideRestart(side) {
				if (this.effectState.layers >= 2) return false;
				this.add('-sidestart', side, 'move: Toxic Spikes');
				this.effectState.layers++;
			},
			onEntryHazard(pokemon) {
				if (!pokemon.isGrounded()) return;
				if (pokemon.hasType('Poison')) {
					this.add('-sideend', pokemon.side, 'move: Toxic Spikes', '[of] ' + pokemon);
					pokemon.side.removeSideCondition('toxicspikes');
				} else if (pokemon.hasType('Steel') || pokemon.hasItem('heavydutyboots') || pokemon.hasAbility('tacticalescape')) {
					return;
				} else if (this.effectState.layers >= 2) {
					pokemon.trySetStatus('tox', pokemon.side.foe.active[0]);
				} else {
					pokemon.trySetStatus('psn', pokemon.side.foe.active[0]);
				}
			},
		},
	},
	stickyweb: {
		inherit: true,
		condition: {
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Sticky Web');
			},
			onEntryHazard(pokemon) {
				if (!pokemon.isGrounded() || pokemon.hasItem('heavydutyboots') || pokemon.hasAbility('tacticalescape')) return;
				this.add('-activate', pokemon, 'move: Sticky Web');
				this.boost({spe: -1}, pokemon, pokemon.side.foe.active[0], this.dex.getActiveMove('stickyweb'));
			},
		},
	},
	gmaxsteelsurge: {
		inherit: true,
		condition: {
			onSideStart(side) {
				this.add('-sidestart', side, 'move: G-Max Steelsurge');
			},
			onEntryHazard(pokemon) {
				if (pokemon.hasItem('heavydutyboots') || pokemon.hasAbility('tacticalescape')) return;
				// Ice Face and Disguise correctly get typed damage from Stealth Rock
				// because Stealth Rock bypasses Substitute.
				// They don't get typed damage from Steelsurge because Steelsurge doesn't,
				// so we're going to test the damage of a Steel-type Stealth Rock instead.
				const steelHazard = this.dex.getActiveMove('Stealth Rock');
				steelHazard.type = 'Steel';
				const typeMod = this.clampIntRange(pokemon.runEffectiveness(steelHazard), -6, 6);
				this.damage(pokemon.maxhp * Math.pow(2, typeMod) / 8);
			},
		},
	},
};
