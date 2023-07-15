export const Moves: {[k: string]: ModdedMoveData} = {
	/*
	name: {
		num: -x,
		accuracy: ,
		basePower: ,
		category: "",
		name: "",
		desc: "",
		shortDesc: "",
		pp: ,
		priority: ,
		flags: {},
		secondary: {},
		target: "",
		type: "",
	},
	*/

	terrorsoar: {
		num: -100,
		accuracy: 100,
		basePower: 75,
		category: "Physical",
		name: "Terror Soar",
		desc: "Has a 30% chance to make the target flinch.",
		shortDesc: "30% chance to make the target flinch.",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1},
		onPrepareHit(target, source, move) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Brave Bird", target);
        },
		secondary: {
			chance: 30,
			volatileStatus: 'flinch',
		},
		target: "any",
		type: "Flying",
		contestType: "Cool",	
	},

	venomdrain: {
		num: -101,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Venom Drain",
		desc: "The user recovers 1/2 the HP lost by the target, rounded half up. If Big Root is held by the user, the HP recovered is 1.3x normal, rounded half down.",
		shortDesc: "User recovers 50% of damage dealt.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, heal: 1},
		drain: [1, 2],
		onPrepareHit(target, source, move) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Draining Kiss", target);
        },
		secondary: null,
		target: "normal",
		type: "Poison",
		contestType: "Tough",
	},

	tarpit: { //currently bugged!! ! ):
		num: -102,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Tar Pit",
		desc: "For 5 turns, the terrain becomes a Tar Pit. During the effect, the power of Poison-type attacks used by grounded Pokemon is multiplied by 1.3 and all Pokemon are under the effects of Powder. Camouflage transforms the user into a Poison type, Nature Power becomes Sludge Bomb, and Secret Power has a 30% chance to cause poison. Fails if the current terrain is Tar Pit.",
		shortDesc: "5 turns. Grounded: +Poison power, +Powder.",
		pp: 10,
		priority: 0,
		flags: {nonsky: 1},
		onHitField(source) {
			if (this.field.isTerrain('')) return;
			else {
				for (const terrain of this.field.terrain) {
					this.field.clearTerrain();
				}
			}
			this.field.setTerrain('tarpit');
		},
		condition: {
			onUpdate() {
				if (!this.field.isTerrain('tarpit')) {
					const setTerrain = this.field.getTerrain();
					this.field.clearTerrain();
					this.field.setTerrain(setTerrain);
				}
			}
		},
		secondary: null,
		target: "all",
		type: "Poison",
		zMove: {boost: {def: 1}},
		contestType: "Beautiful",
	},

	scorchedpebbles: {
		num: -103,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Scorched Pebbles",
		desc: "Sets up a hazard on the opposing side of the field, applying Tar Shot to opposing Pokemon that switch in, unless it is a Flying- or Fire-type Pokemon or has the Levitate Ability. Fails if the effect is already active on the opposing side. Can be removed from the opposing side if any opposing Pokemon uses Rapid Spin or Defog successfully, or is hit by Defog.",
		shortDesc: "Applies Tar Shot upon switchin",
		pp: 20,
		priority: 0,
		flags: {reflectable: 1},
		sideCondition: 'scorchedpebbles',
		condition: {
			onStart(side) {
				this.add('-message', "Scorched pebbles now litter the field!");
			},
			onSwitchIn(pokemon) {
				if (pokemon.hasType('Flying') || pokemon.hasType('Fire') ) return;
				if (!pokemon.isGrounded()) return;
				if (pokemon.hasItem('heavydutyboots')) return;
				this.add('-message', `${pokemon.name} was burned by the scorched pebbles!`);
				pokemon.addVolatile('tarshot');
				},
		},
		onPrepareHit(target, source, move) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Stealth Rock", target);
        },
		secondary: null,
		target: "foeSide",
		type: "Fire",
		zMove: {boost: {atk: 1}},
		contestType: "Cool",
	},

	mossysurprise: {
		num: -104,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Mossy Surprise",
		desc: "Has a 30% chance to lower the target's Speed by 2 stages.",
		shortDesc: "30% chance to lower the target's Speed by 2.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Energy Ball", target);
        },
		secondary: {
			chance: 30,
			boosts: {
				spe: -2,
			},
		},
		target: "normal",
		type: "Grass",
	},

	howlingaurora: {
		num: -105,
		accuracy: 100,
		basePower: 45,
		basePowerCallback() {
			if (this.field.pseudoWeather.howlingaurora) {
				return 40 * this.field.pseudoWeather.howlingaurora.multiplier;
			}
			return 40;
		},
		category: "Special",
		name: "Howling Aurora",
		desc: "For every consecutive turn that this move is used by at least one Pokemon, this move's power is multiplied by the number of turns to pass, but not more than 5.",
		shortDesc: "Power increases when used on consecutive turns.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, authentic: 1},
		onTry() {
			this.field.addPseudoWeather('howlingaurora');
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
		onPrepareHit(target, source, move) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Echoed Voice", target);
        },
		secondary: {
			chance: 10,
			boosts: {
				atk: -1,
			}
		},
		target: "normal",
		type: "Ice",
	},

	jawforce: {
		num: -105,
		accuracy: 95,
		basePower: 100,
		category: "Physical",
		name: "Jaw Force",
		desc: "Priority increases by 1 if the user is at or under 1/4th of its maximum HP.",
		shortDesc: "User at 1/4 HP: +1 priority",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, bite: 1},
		secondary: {},
		onModifyPriority(priority, pokemon, move) {
			if(pokemon.hp <= pokemon.maxhp / 4) {
				return priority +1;
			}
		},
		onPrepareHit(target, source, move) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Crunch", target);
        },
		target: "normal",
		type: "Dragon",
	},

	tailspike: {
		num: -106,
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		name: "Tail Spike",
		desc: "If the user moves after the target, the target's Ability is rendered ineffective as long as it remains active. If the target uses Baton Pass, the replacement will remain under this effect. If the target's Ability is As One, Battle Bond, Comatose, Disguise, Gulp Missile, Ice Face, Multitype, Power Construct, RKS System, Schooling, Shields Down, Stance Change, or Zen Mode, this effect does not happen, and receiving the effect through Baton Pass ends the effect immediately.",
		shortDesc: "Nullifies the foe(s) Ability if the foe(s) move first.",
		pp: 10,
		priority: 0,
		flags: {protect: 1},
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
		target: "normal",
		type: "Dragon",
	},

	glacialgale: {
		num: -107,
		accuracy: 75,
		basePower: 110,
		category: "Special",
		name: "Glacial Gale",
		desc: "Has a 10% chance to freeze the target. If the weather is Hail, this move does not check accuracy.",
		shortDesc: "10% chance to freeze foe(s). Can't miss in hail.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyMove(move) {
			if (this.field.isWeather('hail')) move.accuracy = true;
		},
		onPrepareHit(target, source, move) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Blizzard", target);
        },
		secondary: {
			chance: 10,
			status: 'frz',
		},
		target: "allAdjacentFoes",
		type: "Flying",
	},

	luminousdarts: {
		num: -108,
		accuracy: 100,
		basePower: 45,
		category: "Physical",
		name: "Luminous Darts",
		desc: "Hits the target twice. Each hit bypasses Substitute, Reflect, etc.",
		shortDesc: "Hits twice. Bypasses Substitute, Reflect, etc.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, authentic: 1},
		onHit(pokemon, source, move) {
			move.infiltrates = true;
		},
		multihit: 2,
		onPrepareHit(target, source, move) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Dragon Darts", target);
        },
		smartTarget: true,
		secondary: null,
		target: "normal",
		type: "Electric",
		maxMove: {basePower: 130},
	},

	superdrill: {
		num: -109,
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		name: "Super Drill",
		desc: "If this move is successful, removes all hazards from the user's side of the field. If this move fails, sets one layer of Spikes on the opponent's side of the field..",
		shortDesc: "Frees user from hazards. If this move fails, sets Spikes on the opponent's side.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onAfterHit(target, pokemon) {
			const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
			for (const condition of sideConditions) {
				if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
					this.add('-sideend', pokemon.side, this.dex.getEffect(condition).name, '[from] move: Super Drill', '[of] ' + pokemon);
				}
			}
		},
		onAfterSubDamage(damage, target, pokemon) {
			if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
				this.add('-end', pokemon, 'Leech Seed', '[from] move: Super Drill', '[of] ' + pokemon);
			}
			const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
			for (const condition of sideConditions) {
				if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
					this.add('-sideend', pokemon.side, this.dex.getEffect(condition).name, '[from] move: Super Drill', '[of] ' + pokemon);
				}
			}
			if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
				pokemon.removeVolatile('partiallytrapped');
			}
		},
		onMoveFail(target, source, move) {
			source.side.foe.addSideCondition('spikes');
		},
		target: "normal",
		type: "Ground",
		contestType: "Cool",
	},

	stickkick: {
		num: -110,
		accuracy: 90, 
		basePower: 130,
		category: "Physical",
		name: "Stick Kick",
		desc: "If this attack is not successful, the user loses half of its maximum HP, rounded down, as crash damage. Pokemon with the Magic Guard Ability are unaffected by crash damage.",
		shortDesc: "User is hurt by 50% of its max HP if it misses.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, gravity: 1},
		hasCrashDamage: true,
		onMoveFail(target, source, move) {
			this.damage(source.baseMaxhp / 2, source, source, this.dex.getEffect('High Jump Kick'));
		},
		secondary: null,
		target: "normal",
		type: "Grass",
		maxMove: {basePower: 130},
	},

	photonball: {
		num: -111,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Photon Ball",
		desc: "Has a 30% chance to raise the user's Speed by 1 stage.",
		shortDesc: "30% chance to raise the user's Speed by 1.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			self: {
				boosts: {
					spe: 1,
				},
			},
		},
		target: "normal",
		type: "Electric",
	},

	furioustusks: {
		num: -112,
		accuracy: 100,
		basePower: 20,
		category: "Physical",
		name: "Furious Tusks",
		shortDesc: "100% chance to lower Def.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		multihit: 2,
		secondary: {
			chance: 100,
			boosts: {
				def: -1,
			},
		},
		target: "normal",
		type: "Fighting",
		maxMove: {basePower: 100},
		contestType: "Cool",
	},
	
	primevalrock: {
		num: -113,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		name: "Primeval Rock",
		shortDesc: "100% chance to lower Atk.",
		pp: 5,
		priority: 0,
		flags: {authentic: 1, mirror: 1, protect: 1, sound: 1},
		secondary: {
			chance: 100,
			boosts: {
				atk: -1,
			},
		},
		target: "normal",
		type: "Rock",
	},

	flintspear: {
		num: -114,
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		name: "Flint Spear",
		shortDesc: "Target becomes weaker to Fire.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		volatileStatus: 'flintspear',
		condition: {
			onStart(pokemon) {
				this.add('-start', pokemon, 'Flint Spear');
			},
			onEffectivenessPriority: -2,
			onEffectiveness(typeMod, target, type, move) {
				if (move.type !== 'Fire') return;
				if (!target) return;
				if (type !== target.getTypes()[0]) return;
				return typeMod + 1;
			},
		},
		secondary: null,
		target: "normal",
		type: "Ghost",
	},

	foragerspoise: {
		num: 588,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Forager's Poise",
		shortDesc: "Protects from damaging attacks; +1 Crit hit. Contact: -1 Atk.",
		pp: 10,
		priority: 4,
		flags: {},
		stallingMove: true,
		volatileStatus: 'foragerspoise',
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
					target.addVolatile('foragercrit');
				}
				return this.NOT_FAIL;
			},
			onHit(target, source, move) {
				if (move.isZOrMaxPowered && move.flags['contact']) {
					this.boost({atk: -1}, source, target, this.dex.getActiveMove("Forager's Poise"));
				}
			},
		},
		secondary: null,
		target: "self",
		type: "Grass",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Cool",
	},


	//
	//
	//
	//
	// Vanilla moves start here
	//
	//
	//
	//

	acidarmor: {
		inherit: true,
		boosts: {},
		desc: "Raises the user's Defense by 2 stages. If the terrain is Tar Pit, the user's Defense is instead increased by 3 stages.",
		shortDesc: "Raises the user's Defense by 2.",
		onHit(target) {
			if(this.field.isTerrain('tarterrain')) {
				if (target.isGrounded() && !target.isSemiInvulnerable() && !target.hasItem('heavydutyboots')) {
					this.boost({def: 3}, target);
				}
			}
			else {
				this.boost({def: 2}, target);
			}
		},
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
			} else if (this.field.isTerrain('tarterrain')) {
				move = 'sludgebomb';
			}
			this.useMove(move, pokemon, target);
			return null;
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
			} else if (this.field.isTerrain('tarterrain')) {
				move.secondaries.push({
					chance: 30,
					status: 'psn',
				});
			}
		}
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
			case 'tarterrain':
				move.type = 'Poison';
				break;
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
			} else if (this.field.isTerrain('tarterrain')) {
				newType= 'Poison';
			}

			if (target.getTypes().join() === newType || !target.setType(newType)) return false;
			this.add('-start', target, 'typechange', newType);
		},
	},

	defog: {
		inherit: true,
		onHit(target, source, move) {
			let success = false;
			if (!target.volatiles['substitute'] || move.infiltrates) success = !!this.boost({evasion: -1});
			const removeTarget = [
				'reflect', 'lightscreen', 'auroraveil', 'safeguard', 'mist', 'spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge',
			];
			const removeAll = [
				'spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge', 'scorchedpebbles'
			];
			for (const targetCondition of removeTarget) {
				if (target.side.removeSideCondition(targetCondition)) {
					if (!removeAll.includes(targetCondition)) continue;
					this.add('-sideend', target.side, this.dex.getEffect(targetCondition).name, '[from] move: Defog', '[of] ' + source);
					success = true;
				}
			}
			for (const sideCondition of removeAll) {
				if (source.side.removeSideCondition(sideCondition)) {
					this.add('-sideend', source.side, this.dex.getEffect(sideCondition).name, '[from] move: Defog', '[of] ' + source);
					success = true;
				}
			}
			this.field.clearTerrain();
			return success;
		},
	},

	rapidspin: {
		inherit: true,
		onAfterHit(target, pokemon) {
			if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
				this.add('-end', pokemon, 'Leech Seed', '[from] move: Rapid Spin', '[of] ' + pokemon);
			}
			const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge', 'scorchedpebbles'];
			for (const condition of sideConditions) {
				if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
					this.add('-sideend', pokemon.side, this.dex.getEffect(condition).name, '[from] move: Rapid Spin', '[of] ' + pokemon);
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
			const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge', 'scorchedpebbles'];
			for (const condition of sideConditions) {
				if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
					this.add('-sideend', pokemon.side, this.dex.getEffect(condition).name, '[from] move: Rapid Spin', '[of] ' + pokemon);
				}
			}
			if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
				pokemon.removeVolatile('partiallytrapped');
			}
		},
	},

	grassyterrain: {
		inherit: true,
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},

			onBasePower(basePower, attacker, defender, move) {
				const weakenedMoves = ['earthquake', 'bulldoze', 'magnitude'];
				if (weakenedMoves.includes(move.id)) {
					for (const target of this.getAllActive()) {
						if (target.hasAbility('thunderstruck')) {
							return;
						}
					}
					this.debug('move weakened by grassy terrain');
					return this.chainModify(0.5);
				}
				if (move.type === 'Grass' && attacker.isGrounded()) {
					for (const target of this.getAllActive()) {
						if (target.hasAbility('thunderstruck')) {
							return;
						}
					}
					this.debug('grassy terrain boost');
					return this.chainModify([0x14CD, 0x1000]);
				}
			},

			onStart(battle, source, effect) {
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Grassy Terrain', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Grassy Terrain');
				}
			},
			onResidualOrder: 5,
			onResidualSubOrder: 3,
			onResidual() {
				this.eachEvent('Terrain');
			},

			onTerrain(pokemon) {
				if(pokemon.hasAbility('thunderstruck')) return;
				if (pokemon.isGrounded() && !pokemon.isSemiInvulnerable()) {
					this.debug('Pokemon is grounded, healing through Grassy Terrain.');
					this.heal(pokemon.baseMaxhp / 16, pokemon, pokemon);
				}
			},

			onEnd() {
				if (!this.effectData.duration) this.eachEvent('Terrain');
				this.add('-fieldend', 'move: Grassy Terrain');
			},
		}
	},

	mistyterrain: {
		inherit: true,
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			onSetStatus(status, target, source, effect) {
				if (!target.isGrounded() || target.isSemiInvulnerable()) return;
				if (effect && ((effect as Move).status || effect.id === 'yawn')) {
					for (const target of this.getAllActive()) {
						if (target.hasAbility('thunderstruck')) {
							return;
						}
					}
					this.add('-activate', target, 'move: Misty Terrain');
				}
				return false;
			},
			onTryAddVolatile(status, target, source, effect) {
				if (!target.isGrounded() || target.isSemiInvulnerable()) return;
				if (status.id === 'confusion') {
					for (const target of this.getAllActive()) {
						if (target.hasAbility('thunderstruck')) {
							return;
						}
					}
					if (effect.effectType === 'Move' && !effect.secondaries) this.add('-activate', target, 'move: Misty Terrain');
					return null;
				}
			},
			onBasePowerPriority: 6,
			onBasePower(basePower, attacker, defender, move) {
				if (move.type === 'Dragon' && defender.isGrounded() && !defender.isSemiInvulnerable()) {
					for (const target of this.getAllActive()) {
						if (target.hasAbility('thunderstruck')) {
							return;
						}
					}
					this.debug('misty terrain weaken');
					return this.chainModify(0.5);
				}
			},
			onStart(battle, source, effect) {
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Misty Terrain', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Misty Terrain');
				}
			},
			onResidualOrder: 21,
			onResidualSubOrder: 2,
			onEnd(side) {
				this.add('-fieldend', 'Misty Terrain');
			},
		},
	},

	electricterrain: {
		inherit: true,
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			onSetStatus(status, target, source, effect) {
				if (status.id === 'slp' && target.isGrounded() && !target.isSemiInvulnerable()) {
					if (effect.id === 'yawn' || (effect.effectType === 'Move' && !effect.secondaries)) {
						this.add('-activate', target, 'move: Electric Terrain');
					}
					return false;
				}
			},
			onTryAddVolatile(status, target) {
				if (!target.isGrounded() || target.isSemiInvulnerable()) return;
				if (status.id === 'yawn') {
					this.add('-activate', target, 'move: Electric Terrain');
					return null;
				}
			},
			onBasePowerPriority: 6,
			onBasePower(basePower, attacker, defender, move) {
				if (move.type === 'Electric' && attacker.isGrounded() && !attacker.isSemiInvulnerable()) {
					for (const target of this.getAllActive()) {
						if (target.hasAbility('thunderstruck')) {
							return;
						}
					}
					this.debug('electric terrain boost');
					return this.chainModify([0x14CD, 0x1000]);
				}
			},
			onStart(battle, source, effect) {
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Electric Terrain', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Electric Terrain');
				}
			},
			onResidualOrder: 21,
			onResidualSubOrder: 2,
			onEnd() {
				this.add('-fieldend', 'move: Electric Terrain');
			},
		},
	},

	fishiousrend: {
		num: 755,
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		name: "Fishious Rend",
		desc: "The user recovers 1/2 the HP lost by the target, rounded half up. If Big Root is held by the user, the HP recovered is 1.3x normal, rounded half down.",
		shortDesc: "User recovers 50% of damage dealt.",
		pp: 10,
		priority: 0,
		flags: {bite: 1, contact: 1, protect: 1, mirror: 1, heal: 1},
		drain: [1, 2],
		secondary: null,
		target: "normal",
		type: "Water",
	},

	naturalgift: {
		inherit: true,
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
			if (!pokemon.hasAbility('natureprowess')) {
				pokemon.setItem('');
				pokemon.lastItem = item.id;
				pokemon.usedItemThisTurn = true;
				this.runEvent('AfterUseItem', pokemon, null, null, item);
			}
		},
	},
	recrystallize: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Heals up to 50% of the user's max HP; Ice-types recover 67% in Hail and Rock-types recover 67% in Sandstorm.",
		shortDesc: "Heals up to 50% of the user's max HP; Ice-types recover 67% in Hail and Rock-types recover 67% in Sandstorm.",
		isViable: true,
		name: "Recrystallize",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', target, "Rock Polish", source);
		},
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
};
