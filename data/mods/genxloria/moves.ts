export const Moves: {[moveid: string]: ModdedMoveData} = {
	citrusysting: {
		accuracy: 90,
		basePower: 0,
		category: "Status",
    shortDesc: "Paralyzes the target. Grass-types are immune.",
		isViable: true,
		name: "Citrusy Sting",
		pp: 20,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, powder: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Acid Spray", target);
		},
		status: 'par',
		ignoreImmunity: false,
		secondary: null,
		target: "normal",
		type: "Grass",
		zMove: {boost: {spd: 1}},
		contestType: "Cool",
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
		flags: {protect: 1, mirror: 1},
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
	bushclaws: {
		num: 358,
		accuracy: 100,
		basePower: 85,
		basePowerCallback(pokemon, target, move) {
			if (target.status === 'slp' || target.hasAbility('comatose')) return move.basePower * 2;
			return move.basePower;
		},
		category: "Physical",
    shortDesc: "Power doubles if the target is asleep.",
		isViable: true,
		name: "Bush Claws",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Metal Claw", target);
		},
		secondary: null,
		target: "normal",
		type: "Grass",
		contestType: "Tough",
	},
	revelationspin: {
		num: 686,
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
	fieldofvision: {
		accuracy: true,
		basePower: 0,
		category: "Status",
    shortDesc: "Protects the user. If the opponent makes contact, lowers their SpD by 2",
		isViable: true,
		name: "Field of Vision",
		pp: 10,
		priority: 4,
		flags: {},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Laser Focus", target);
		},
		stallingMove: true,
		volatileStatus: 'fieldofvision',
		onTryHit(pokemon) {
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
					this.boost({spd: -2}, source, target, this.dex.getActiveMove("Field of Vision"));
				}
				return this.NOT_FAIL;
			},
			onHit(target, source, move) {
				if (move.isZOrMaxPowered && move.flags['contact']) {
					this.boost({spd: -2}, source, target, this.dex.getActiveMove("Field of Vision"));
				}
			},
		},
		secondary: null,
		target: "self",
		type: "Psychic",
	},
	jawcrush: {
		accuracy: 100,
		basePower: 80,
		category: "Physical",
    shortDesc: "Traps both the user and the target",
		isViable: true,
		name: "Jaw Crush",
		pp: 15,
		priority: 0,
		flags: {bite: 1, contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Crunch", target);
		},
		onHit(target, source, move) {
			source.addVolatile('trapped', target, move, 'trapper');
			target.addVolatile('trapped', source, move, 'trapper');
		},
		secondary: null,
		target: "normal",
		type: "Fighting",
	},
/*
	clinch: {
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		name: "Clinch",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onModifyMove(move, source, target) {
			if (target.newlySwitched || this.queue.willMove(target)) {
				move.secondaries = [];
				move.secondaries.push({
					chance: 100,
					boosts: {
						def: -1,
					},
				});
			}
		},
		secondary: {
			chance: 100,
			boosts: {
				spe: -1,
			},
		},
		target: "normal",
		type: "Fighting",
		contestType: "Tough",
	},

	sonicpulse: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Sonic Pulse",
		pp: 30,
		priority: 0,
		flags: {snatch: 1},
		volatileStatus: 'sonicpulse',
		condition: {
			duration: 100,
			onStart(pokemon, source, effect) {
				if (effect && (['imposter', 'psychup', 'transform'].includes(effect.id))) {
					this.add('-start', pokemon, 'move: Sonic Pulse', '[silent]');
				} else {
					this.add('-start', pokemon, 'move: Sonic Pulse');
				}
			},
			onRestart(pokemon) {
				this.effectData.duration = 100;
				this.add('-start', pokemon, 'move: Sonic Pulse');
			},
			onSourceModifyCritRatio(critRatio) {
				return 5;
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'move: Sonic Pulse', '[silent]');
			},
		},
		secondary: null,
		target: "self",
		type: "Normal",
		zMove: {boost: {atk: 1}},
		contestType: "Cool",
	},
*/
	centuryblade: {
		accuracy: 90,
		basePower: 120,
		category: "Physical",
    shortDesc: "Charges turn 1. Hits turn 2. +1 Def when charging. Attacks immediately under sun.",
		isViable: true,
		name: "Century Blade",
		pp: 10,
		priority: 0,
		flags: {charge: 1, protect: 1, mirror: 1, contact: 1},
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name);
			this.boost({def: 1}, attacker, attacker, move);
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
		secondary: null,
		target: "normal",
		type: "Rock",
	},
	drainfang: {
		accuracy: 100,
		basePower: 80,
		category: "Physical",
    shortDesc: "Heals the user by 50% of the damage dealt.",
		isViable: true,
		name: "Drain Fang",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, heal: 1, bite: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Strength Sap", target);
		},
		drain: [1, 2],
		secondary: null,
		target: "normal",
		type: "Ghost",
		contestType: "Clever",
	},
	terracharge: {
		accuracy: 100,
		basePower: 120,
		category: "Physical",
    shortDesc: "Deals 33% of the damage dealt in recoil. 10% chance to lower the target's Speed.",
		isViable: true,
		name: "Terra Charge",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Head Smash", target);
		},
		recoil: [33, 100],
		secondary: {
			chance: 10,
			boosts: {
				spe: -1,
			},
		},
		target: "normal",
		type: "Ground",
		contestType: "Cool",
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
		contestType: "Beautiful",
	},
	darkfang: {
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		shortDesc: "Hits twice. Doubles: Tries to hit each foe once",
		isViable: true,
		name: "Dark Fang",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1, bite: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Bite", target);
		},
		multihit: 2,
		smartTarget: true,
		secondary: null,
		target: "normal",
		type: "Dark",
		maxMove: {basePower: 130},
	},
	eyeofchaos: {
		accuracy: 100,
		basePower: 80,
		category: "Special",
		shortDesc: "Uses user's SpD stat as SpA in damage calculation.",
		isViable: true,
		name: "Eye of Chaos",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Glare", target);
		},
		useSourceDefensiveAsOffensive: true,
		secondary: null,
		target: "normal",
		type: "Dark",
	},
	dreadwing: {
		accuracy: 100,
		basePower: 95,
		category: "Special",
		shortDesc: "Uses target's SpA stat in damage calculation.",
		isViable: true,
		name: "Dread Wing",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Oblivion Wing", target);
		},
		useTargetOffensive: true,
		secondary: null,
		target: "normal",
		type: "Flying",
		contestType: "Clever",
	},
	forestrage: {
		accuracy: 95,
		basePower: 85,
		category: "Physical",
		shortDesc: "Ignores resistances.",
		isViable: true,
		name: "Forest Rage",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Work Up", target);
			this.add('-anim', source, "Leaf Storm", target);
		},
        onEffectiveness(typeMod, target, type) {
            if (typeMod < 0) {
                this.debug('Ignoring resist');
                return 0;
            }
        },
		secondary: null,
		target: "normal",
		type: "Grass",
		contestType: "Clever",
	},
	riverwrath: {
		accuracy: 95,
		basePower: 85,
		category: "Special",
		shortDesc: "Ignores resistances.",
		isViable: true,
		name: "River Wrath",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Work Up", target);
			this.add('-anim', source, "Hydro Pump", target);
		},
        onEffectiveness(typeMod, target, type) {
            if (typeMod < 0) {
                this.debug('Ignoring resist');
                return 0;
            }
        },
		secondary: null,
		target: "normal",
		type: "Water",
		contestType: "Clever",
	},
   // Flare Up, Toxic Snowball
	flareup: {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		shortDesc: "If User's Attack > Target's, it gains +1 Speed, else target gains -1 Defense.",
		isViable: true,
		name: "Flare Up",
		pp: 30,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Taunt", target);
		},
		boosts: {
			def: -1,
		},
		onModifyMove(move, source, target) {
			if (source.getStat('atk', false, true) > target.getStat('spa', false, true)) {
				delete move.boosts;
				move.self = {boosts: {spe: 1}};
			}
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Normal",
		zMove: {boost: {atk: 1}},
		contestType: "Cool",
	},
	toxicsnowball: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Protects the user. If hit by a contact move, the attacker loses 25% of thier max HP and gets poisoned.",
		isViable: true,
		name: "Toxic Snowball",
		pp: 10,
		priority: 4,
		flags: {},
		stallingMove: true,
		volatileStatus: 'toxicsnowball',
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Baneful Bunker", target);
		},
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
				if (move.category == 'Special') {
					this.damage(source.baseMaxhp / 4, source, target);
					source.trySetStatus('psn', target);
				}
				return this.NOT_FAIL;
			},
			onHit(target, source, move) {
				if (move.isZOrMaxPowered && move.category == 'Special') {
					this.damage(source.baseMaxhp / 4, source, target);
					source.trySetStatus('psn', target);
				}
			},
		},
		secondary: null,
		target: "self",
		type: "Ice",
		zMove: {boost: {def: 1}},
		contestType: "Tough",
	},
	// Loria Region
	purification: {
		accuracy: 100,
		basePower: 100,
		category: "Special",
		shortDesc: "Resets the user's lowered stats.",
		isViable: true,
		name: "Purification",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Diamond Storm", target);
			this.add('-anim', source, "Recover", target);
		},
		onHit(target, source, move){
			let b: BoostName;
			for (b in source.boosts) {
				if (source.boosts[b] < 0) source.boosts[b] = 0;
			}
		},
		target: "normal",
		type: "Rock",
		contestType: "Beautiful",
	},
	guardianwind: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Sets Mist and Safeguard for 3 turns. The user then switches out.",
		isViable: true,
		name: "Guardian Wind",
		pp: 10,
		priority: 0,
		flags: {},
		selfSwitch: true,
		sideCondition: 'guardianwind',
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Tailwind", target);
		},
		condition: {
			duration: 3,
			onBoost(boost, target, source, effect) {
				if (effect.effectType === 'Move' && effect.infiltrates && target.side !== source.side) return;
				if (source && target !== source) {
					let showMsg = false;
					let i: BoostName;
					for (i in boost) {
						if (boost[i]! < 0) {
							delete boost[i];
							showMsg = true;
						}
					}
					if (showMsg && !(effect as ActiveMove).secondaries) {
						this.add('-activate', target, 'move: Guardian Wind');
					}
				}
			},
			onSetStatus(status, target, source, effect) {
				if (!effect || !source) return;
				if (effect.id === 'yawn') return;
				if (effect.effectType === 'Move' && effect.infiltrates && target.side !== source.side) return;
				if (target !== source) {
					this.debug('interrupting setStatus');
					if (effect.id === 'synchronize' || (effect.effectType === 'Move' && !effect.secondaries)) {
						this.add('-activate', target, 'move: Guardian Wind');
					}
					return null;
				}
			},
			onTryAddVolatile(status, target, source, effect) {
				if (!effect || !source) return;
				if (effect.effectType === 'Move' && effect.infiltrates && target.side !== source.side) return;
				if ((status.id === 'confusion' || status.id === 'yawn') && target !== source) {
					if (effect.effectType === 'Move' && !effect.secondaries) this.add('-activate', target, 'move: Guardian Wind');
					return null;
				}
			},
			onStart(side) {
				this.add('-sidestart', side, 'Guardian Wind');
			},
			onResidualOrder: 21,
			onResidualSubOrder: 3,
			onEnd(side) {
				this.add('-sideend', side, 'Guardian Wind');
			},
		},
		secondary: null,
		target: "allySide",
		type: "Flying",
		zMove: {effect: 'heal'},
		contestType: "Cool",
	},
	coconutburst: {
		accuracy: 100,
		basePower: 25,
		category: "Physical",
		shortDesc: "Hits 2-5 times. 10% chance to lower the target's Defense by 1.",
		isViable: true,
		name: "Coconut Burst",
		pp: 30,
		priority: 0,
		flags: {bullet: 1, protect: 1, mirror: 1},
		multihit: [2, 5],
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Rock Blast", target);
		},
		secondary: {
			chance: 10,
			boosts: {
				def: -1,
			},
		},
    target: "normal",
		type: "Grass",
		zMove: {basePower: 140},
		maxMove: {basePower: 130},
		contestType: "Cool",
	},
	heatrelease: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Heals 66% of the user's HP and removes it Fire-type. Fails if the user is not Fire.",
		isViable: true,
		name: "Heat Release",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		heal: [2, 3],
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Bulk Up", target);
		},
		onTryMove(pokemon, target, move) {
			if (pokemon.hasType('Fire')) return;
			this.add('-fail', pokemon, 'move: Heat Release');
			this.attrLastMove('[still]');
			return null;
		},
		onHit(pokemon) {
			pokemon.setType(pokemon.getTypes(true).map(type => type === "Fire" ? "???" : type));
			this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[from] move: Heat Release');
		},
		secondary: null,
		target: "self",
		type: "Fire",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Clever",
	},
	steadystream: {
		accuracy: 100,
		basePower: 50,
		basePowerCallback() {
			if (this.field.pseudoWeather.steadystream) {
				return 50 * this.field.pseudoWeather.steadystream.multiplier;
			}
			return 50;
		},
		category: "Special",
		shortDesc: "Power increases when used on consecutive turns.",
		isViable: true,
		name: "Steady Stream",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, authentic: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Sparkling Aria", target);
		},
		onTry() {
			this.field.addPseudoWeather('steadystream');
		},
		condition: {
			duration: 2,
			onStart() {
				this.effectData.multiplier = 1;
			},
			onRestart() {
				if (this.effectData.duration !== 2) {
					this.effectData.duration = 2;
					if (this.effectData.multiplier < 5) {
						this.effectData.multiplier++;
					}
				}
			},
		},
		secondary: null,
		target: "normal",
		type: "Water",
		contestType: "Beautiful",
	},
	psychicsurf: {
		accuracy: 100,
		basePower: 95,
		category: "Special",
		shortDesc: "If Psychic Terrain is active, user's Speed goes up by 1 stage.",
		isViable: true,
		name: "Psychic Surf",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Expanding Force", target);
		},
		secondary: {
			chance: 100,
			self: {
			onHit(target, source, move) {
				if (this.field.isTerrain('psychicterrain') && source.isGrounded()) {
					return !!this.boost({spe: 1}, source);
				}
				return false;
			},
			},
		},
		target: "allAdjacent",
		type: "Psychic",
		contestType: "Beautiful",
	},
	shocktail: {
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		shortDesc: "If the opponent has any stat boosts, they are paralyzed.",
		isViable: true,
		name: "Shock Tail",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Charge", target);
			this.add('-anim', source, "Iron Tail", target);
		},
		secondary: {
			chance: 100,
			onHit(target, source, move) {
				if (target.positiveBoosts()) {
					target.trySetStatus('par', source, move);
				}
			},
		},
		target: "normal",
		type: "Electric",
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
	swindle: {
		accuracy: 100,
		basePower: 0,
		category: "Status",
    	shortDesc: "(Bugged) Switches the user's item with the foes, then switches out if successful.",
		isViable: true,
		name: "Swindle",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1, mystery: 1, reflectable: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Trick", target);
		},
		onTryImmunity(target) {
			return !target.hasAbility('stickyhold');
		},
		onHit(target, source, move) {
			const yourItem = target.takeItem(source);
			const myItem = source.takeItem();
			if (target.item || source.item || (!yourItem && !myItem)) {
				if (yourItem) target.item = yourItem.id;
				if (myItem) source.item = myItem.id;
				return false;
			}
			if (
				(myItem && !this.singleEvent('TakeItem', myItem, source.itemData, target, source, move, myItem)) ||
				(yourItem && !this.singleEvent('TakeItem', yourItem, target.itemData, source, target, move, yourItem))
			) {
				if (yourItem) target.item = yourItem.id;
				if (myItem) source.item = myItem.id;
				return false;
			}
			this.add('-activate', source, 'move: Trick', '[of] ' + target);
			if (myItem) {
				target.setItem(myItem);
				this.add('-item', target, myItem, '[from] move: Switcheroo');
			} else {
				this.add('-enditem', target, yourItem, '[silent]', '[from] move: Switcheroo');
			}
			if (yourItem) {
				source.setItem(yourItem);
				this.add('-item', source, yourItem, '[from] move: Switcheroo');
			} else {
				this.add('-enditem', source, myItem, '[silent]', '[from] move: Switcheroo');
			}
		},
		selfSwitch: true,
		secondary: null,
		target: "normal",
		type: "Dark",
		zMove: {boost: {spe: 2}},
		contestType: "Clever",
	},
	sparkingleap: {
		accuracy: 100,
		basePower: 80,
		category: "Physical",
    	shortDesc: "High critical hit ratio.",
		isViable: true,
		name: "Sparking Leap",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Bolt Beak", target);
		},
		critRatio: 2,
		secondary: null,
		target: "normal",
		type: "Electric",
		contestType: "Cool",
	},
	pearlbarrage: {
		accuracy: 100,
		basePower: 85,
		category: "Special",
    	shortDesc: "Lowers the foe(s)'s Attack and Special Attack by 1 stage.",
		isViable: true,
		name: "Pearl Barrage",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Power Gem", target);
		},
		secondary: {
			chance: 100,
			boosts: {
				atk: -1,
				spa: -1,
			},
		},
		target: "allAdjacentFoes",
		type: "Rock",
	},
	fireworkleaf: {
		accuracy: 100,
		basePower: 70,
		category: "Special",
    	shortDesc: "Super effective against Steel-types.",
		isViable: true,
		name: "Firework Leaf",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, bullet: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Jungle Healing", target);
			this.add('-anim', source, "Flame Burst", target);
		},
		onEffectiveness(typeMod, target, type) {
			if (type === 'Steel') return 1;
		},
		secondary: null,
		target: "normal",
		type: "Grass",
		contestType: "Beautiful",
	},
	quickshot: {
		accuracy: 100,
		basePower: 40,
		category: "Special",
    	shortDesc: "Usually goes first.",
		isViable: true,
		name: "Quick Shot",
		pp: 30,
		priority: 1,
		flags: {protect: 1, mirror: 1, bullet: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Ember", target);
		},
		secondary: null,
		target: "normal",
		type: "Fire",
		contestType: "Cool",
	},
	mercilessrend: {
		accuracy: 95,
		basePower: 85,
		category: "Physical",
    	shortDesc: "Traps the target and deals damage for 4 turns.",
		isViable: true,
		name: "Merciless Rend",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1, bite: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Crunch", target);
		},
		volatileStatus: 'partiallytrapped',
		secondary: null,
		target: "normal",
		type: "Dark",
		contestType: "Tough",
	},
	skylance: {
		accuracy: 100,
		basePower: 130,
		category: "Physical",
    	shortDesc: "Fails if the user is grounded.",
		isViable: true,
		name: "Sky Lance",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, gravity: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Aerial Ace", target);
		},
		onTryHit(target, source) {
			if (source.isGrounded()) return false;
		},
		secondary: null,
		target: "normal",
		type: "Flying",
		contestType: "Cool",
	},
	spellcast: {
		accuracy: 100,
		basePower: 80,
		category: "Special",
    	shortDesc: "20% chance to paralyze or poison or put the target to sleep.",
		isViable: true,
		name: "Spell Cast",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hex", target);
		},
		secondary: {
			chance: 20,
			onHit(target, source) {
				const result = this.random(3);
				if (result === 0) {
					target.trySetStatus('par', source);
				} else if (result === 1) {
					target.trySetStatus('slp', source);
				} else {
					target.trySetStatus('psn', source);
				}
			},
		},
		target: "normal",
		type: "Dark",
		contestType: "Beautiful",
	},
	steamingblast: {
		accuracy: 90,
		basePower: 95,
		category: "Special",
    	shortDesc: "Super effective against Water. 30% chance to burn.",
		isViable: true,
		name: "Steaming Blast",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, defrost: 1},
		thawsTarget: true,
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Steam Eruption", target);
		},
		onEffectiveness(typeMod, target, type) {
			if (type === 'Water') return 1;
		},
		secondary: {
			chance: 30,
			status: 'brn',
		},
		target: "normal",
		type: "Water",
		contestType: "Beautiful",
	},
	jawsoflife: {
		accuracy: 100,
		basePower: 80,
		category: "Physical",
    	shortDesc: "If used on foe, traps the foe. If used on ally, heals them by 50% of their max HP.",
		isViable: true,
		name: "Jaws of Life",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, bite: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Psychic Fangs", target);
		},
		onTryHit(target, source, move) {
			if (source.side === target.side) {
				move.basePower = 0;
				move.infiltrates = true;
				delete move.secondaries;
			}
		},
		onHit(target, source) {
			if (source.side === target.side) {
				if (!this.heal(Math.floor(target.baseMaxhp * 0.5))) {
					this.add('-immune', target);
				}
			}
		},
		secondary: {
			chance: 100,
			onHit(target, source, move) {
				if (source.isActive) target.addVolatile('trapped', source, move, 'trapper');
			},
		},
		target: "normal",
		type: "Normal",
		contestType: "Clever",
	},
	javelinstone: {
		accuracy: 90,
		basePower: 120,
		category: "Physical",
    	shortDesc: "20% chance to lower the target's Defense by 1 stage.",
		isViable: true,
		name: "Javelin Stone",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Rock Wrecker", target);
		},
		secondary: {
			chance: 20,
			boosts: {
				def: -1,
			},
		},
		target: "normal",
		type: "Rock",
		contestType: "Cool",
	},
	crippleclobber: {
		accuracy: 100,
		basePower: 80,
		category: "Physical",
    	shortDesc: "Lowers the target's Speed by 1.",
		isViable: true,
		name: "Cripple Clobber",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Low Kick", target);
		},
		secondary: {
			chance: 100,
			boosts: {
				spe: -1,
			},
		},
		target: "normal",
		type: "Rock",
		contestType: "Cute",
	},
	thunderstrike: {
		accuracy: 70,
		basePower: 110,
		category: "Physical",
    	shortDesc: "30% chance to paralyze foe. Perfect accuracy in Sun.",
		isViable: true,
		name: "Thunderstrike",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Bolt Strike", target);
		},
		onModifyMove(move, pokemon, target) {
			switch (target?.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
				move.accuracy = true;
				break;
			}
		},
		secondary: {
			chance: 30,
			status: 'par',
		},
		target: "normal",
		type: "Electric",
		contestType: "Cool",
	},
	aquaballet: {
		accuracy: true,
		basePower: 0,
		category: "Status",
    	shortDesc: "Raises the user's Special Attack and Speed by 1 stage",
		isViable: true,
		name: "Aqua Ballet",
		pp: 20,
		priority: 0,
		flags: {snatch: 1, dance: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Rain Dance", target);
		},
		boosts: {
			spa: 1,
			spe: 1,
		},
		secondary: null,
		target: "self",
		type: "Water",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Beautiful",
	},
	ironblaster: {
		accuracy: 80,
		basePower: 120,
		category: "Special",
    	shortDesc: "30% chance to lower the foe's Special Defense by 1 stage",
		isViable: true,
		name: "Iron Blaster",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Steel Beam", target);
		},
		secondary: {
			chance: 30,
			boosts: {
				spd: -1,
			},
		},
		target: "normal",
		type: "Steel",
		contestType: "Cool",
	},
	genesiswave: {
		accuracy: 100,
		basePower: 80,
		category: "Special",
    	shortDesc: "Heals the user by 75% of the damage dealt",
		isViable: true,
		name: "Genesis Wave",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, distance: 1, heal: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Parabolic Charge", target);
		},
		drain: [3, 4],
		secondary: null,
		target: "any",
		type: "Electric",
		contestType: "Cool",
	},
	idlethunder: {
		accuracy: 100,
		basePower: 140,
		category: "Special",
    	shortDesc: "Hits two turns after being used",
		isViable: true,
		name: "Idle Thunder",
		pp: 5,
		priority: 0,
		flags: {},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Zap Cannon", target);
		},
		isFutureMove: true,
		onTry(source, target) {
			if (!target.side.addSlotCondition(target, 'futuremove')) return false;
			Object.assign(target.side.slotConditions[target.position]['futuremove'], {
				move: 'idlethunder',
				source: source,
				moveData: {
					id: 'idlethunder',
					name: "Idle Thunder",
					accuracy: 100,
					basePower: 140,
					category: "Special",
					priority: 0,
					flags: {},
					effectType: 'Move',
					isFutureMove: true,
					type: 'Electric',
				},
			});
			this.add('-start', source, 'Idle Thunder');
			return null;
		},
		secondary: null,
		target: "normal",
		type: "Electric",
		contestType: "Beautiful",
	},
	disasterbolt: {
		accuracy: 100,
		basePower: 100,
		category: "Special",
    	shortDesc: "100% chance to lower the foe's Special Defense by 1 stage",
		isViable: true,
		name: "Disaster Bolt",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Thunder", target);
		},
		secondary: {
			chance: 100,
			boosts: {
				spd: -1,
			},
		},
		target: "normal",
		type: "Electric",
	},
	dragonsgift: {
		accuracy: 90,
		basePower: 0,
		category: "Physical",
    	shortDesc: "80, 100, 120 power, or raises the target's crit ratio by 1 stage.",
		isViable: true,
		name: "Dragon's Gift",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Dynamax Cannon", target);
		},
		onModifyMove(move, pokemon, target) {
			const rand = this.random(10);
			if (rand < 2) {
				target.addVolatile('gmaxchistrike');
				move.infiltrates = true;
			} else if (rand < 6) {
				move.basePower = 80;
			} else if (rand < 9) {
				move.basePower = 100;
			} else {
				move.basePower = 120;
			}
		},
		secondary: null,
		target: "normal",
		type: "Dragon",
		contestType: "Cute",
	},
		
// PLA Moves
	psyshieldbash: {
		accuracy: 100,
		basePower: 70,
		category: "Physical",
    	shortDesc: "Raises the user's Defense by 1 stage.",
		isViable: true,
		name: "Psyshield Bash",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
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
		contestType: "Tough",
	},
	ragingfury: {
		accuracy: 100,
		basePower: 120,
		category: "Physical",
    	shortDesc: "Lasts 2-3 turns. Confuses the user afterwards.",
		isViable: true,
		name: "Raging Fury",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, defrost: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Flare Blitz", target);
			this.add('-anim', source, "Bulk Up", target);
		},
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
	wavecrash: {
		accuracy: 100,
		basePower: 70,
		category: "Physical",
    	shortDesc: "Usually goes first. 33% Recoil.",
		isViable: true,
		name: "Wave Crash",
		pp: 10,
		priority: 1,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Waterfall", target);
		},
		recoil: [33, 100],
		secondary: null,
		target: "normal",
		type: "Water",
		contestType: "Cool",
	},
	bittermalice: {
		accuracy: 100,
		basePower: 60,
		basePowerCallback(pokemon, target, move) {
			if (target.status || target.hasAbility('comatose')) return move.basePower * 2;
			return move.basePower;
		},
		category: "Special",
    	shortDesc: "10% chance to freeze the foe(s). Double damage if the target is statused.",
		isViable: true,
		name: "Bitter Malice",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Fiery Wrath", target);
		},
		secondary: {
			chance: 10,
			status: 'frz',
		},
		target: "allAdjacentFoes",
		type: "Ghost",
		zMove: {basePower: 160},
		contestType: "Clever",
	},
	ceaselessedge: {
		accuracy: 90,
		basePower: 60,
		category: "Physical",
    	shortDesc: "Sets one layer of Spikes after dealing damage.",
		isViable: true,
		name: "Ceaseless Edge",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Night Slash", target);
			this.add('-anim', source, "Spikes", target);
		},
		self: {
			onHit(source) {
				source.side.foe.addSideCondition('spikes');
			},
		},
		secondary: null,
		target: "normal",
		type: "Dark",
		contestType: "Tough",
	},
};
