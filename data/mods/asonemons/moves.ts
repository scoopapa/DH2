export const Moves: {[k: string]: ModdedMoveData} = {
	coalsting: {
		num: 827,
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		name: "Coal Sting",
		shortDesc: "30% chance to burn the target. Thaws target.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, defrost: 1},
		thawsTarget: true,
		secondary: {
			chance: 30,
			status: 'brn',
		},
		target: "normal",
		type: "Fire",
		contestType: "Tough",
	},
   inkgulp: {
		num: 828,
		accuracy: 100,
		basePower: 60,
		category: "Special",
		name: "Ink Gulp",
		shortDesc: "User recovers 50% of the damage dealt. Raises user's Special Attack by 1 if this KOes the target.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, heal: 1},
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (!target || target.fainted || target.hp <= 0) this.boost({spa: 1}, pokemon, pokemon, move);
		},
      drain: [3, 4],
		target: "normal",
		type: "Poison",
		contestType: "Tough",
	},
	bouldertoss: {
		num: 829,
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		name: "Boulder Toss",
		shortDesc: "No additional effect.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		type: "Rock",
		contestType: "Tough",
	},
	icescream: {
		num: 830,
		accuracy: 90,
		basePower: 130,
		category: "Special",
		name: "Ice Scream",
      shortDesc: "Lowers the user's Sp. Atk by 2.",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, authentic: 1},
		self: {
			boosts: {
				spa: -2,
			},
		},
		secondary: null,
		target: "normal",
		type: "Ice",
		contestType: "Beautiful",
	},
	baitsplash: {
		num: 831,
		accuracy: 90,
		basePower: 80,
		category: "Special",
		name: "Bait Splash",
      shortDesc: "Traps and damages the target for 4-5 turns.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		volatileStatus: 'partiallytrapped',
		secondary: null,
		target: "normal",
		type: "Water",
		contestType: "Tough",
	},
	hamsterslam: {
        accuracy: 100,
        basePower: 50,
        category: "Physical",
        name: "Hamster Slam",
		  shortDesc: "Power doubles if the user has no held item.",
        pp: 10,
        priority: 0,
        flags: {contact: 1, protect: 1, mirror: 1},
        basePowerCallback(pokemon, target, move) {
			if (!pokemon.item) {
				this.debug("Power doubled for no item");
				return move.basePower * 2;
		     }
			   return move.basePower;
	  	  },
        secondary: null,
        target: "normal",
        type: "Electric",
        contestType: "Tough",
   },
	shellstack: {
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		name: "Shell Stack",
		shortDesc: "Uses user's Def stat as Atk in damage calculation.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		useSourceDefensiveAsOffensive: true,
		secondary: null,
		target: "normal",
		type: "Steel",
	},
	biobelly: {
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Bio Belly",
		shortDesc: "User recovers 50% of the damage dealt, cures its own status.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1, heal: 1},
		self: {
			onHit(source) {
				for (const ally of source.side.pokemon) {
					ally.cureStatus();
				}
			},
		},
		drain: [1, 2],
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Tough",
	},
	hardwork: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Hard Work",
		shortDesc: "Raises the user's Atk and Sp. Def by 1.",
		pp: 20,
		priority: 0,
		flags: {snatch: 1},
		boosts: {
			atk: 1,
			spd: 1,
		},
		secondary: null,
		target: "self",
		type: "Normal",
		contestType: "Cool",
	},
	excaliburslash: {
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		name: "Excalibur Slash",
		shortDesc: "High critical hit ratio.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1},
		critRatio: 2,
		target: "normal",
		type: "Fairy",
		contestType: "Cool",
	},
	bubbleblades: {
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		name: "Bubble Blades",
		shortDesc: "+ 15 power for each of the user's stat boosts.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		basePowerCallback(pokemon, target, move) {
				return move.basePower + 15 * pokemon.positiveBoosts();
		  },
		secondary: null,
		target: "normal",
		type: "Water",
		contestType: "Tough",
	},
	float: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Float",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, gravity: 1},
		volatileStatus: 'float',
		condition: {
			duration: 5,
			onStart(target) {
				if (target.volatiles['smackdown'] || target.volatiles['ingrain']) return false;
				this.add('-start', target, 'Float');
			},
			onImmunity(type) {
				if (type === 'Ground') return false;
			},
			onResidualOrder: 15,
			onEnd(target) {
				this.add('-end', target, 'Float');
			},
		},
		secondary: null,
		target: "self",
		type: "Flying",
		contestType: "Clever",
	},
	gravity: {
		num: 356,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Gravity",
		pp: 5,
		priority: 0,
		flags: {nonsky: 1},
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
					if (pokemon.volatiles['float']) {
						applies = true;
						delete pokemon.volatiles['float'];
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
					if (this.dex.getMove(moveSlot.id).flags['gravity']) {
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
		target: "all",
		type: "Psychic",
		zMove: {boost: {spa: 1}},
		contestType: "Clever",
	},
	smackdown: {
		num: 479,
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		name: "Smack Down",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, nonsky: 1},
		volatileStatus: 'smackdown',
		condition: {
			noCopy: true,
			onStart(pokemon) {
				let applies = false;
				if (pokemon.hasType('Flying') || pokemon.hasAbility('levitate')) applies = true;
				if (pokemon.hasItem('ironball') || pokemon.volatiles['ingrain'] ||
					this.field.getPseudoWeather('gravity')) applies = false;
				if (pokemon.removeVolatile('fly') || pokemon.removeVolatile('bounce')) {
					applies = true;
					this.queue.cancelMove(pokemon);
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
				if (pokemon.volatiles['float']) {
					applies = true;
					delete pokemon.volatiles['float'];
				}
				if (!applies) return false;
				this.add('-start', pokemon, 'Smack Down');
			},
			onRestart(pokemon) {
				if (pokemon.removeVolatile('fly') || pokemon.removeVolatile('bounce')) {
					this.queue.cancelMove(pokemon);
					this.add('-start', pokemon, 'Smack Down');
				}
			},
			// groundedness implemented in battle.engine.js:BattlePokemon#isGrounded
		},
		secondary: null,
		target: "normal",
		type: "Rock",
		contestType: "Tough",
	},
	balloonburner: {
		accuracy: 100,
		basePower: 75,
		category: "Special",
		name: "Balloon Burner",
		shortDesc: "For 5 turns, the user has immunity to Ground.",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, defrost: 1},
		self: {
				volatileStatus: 'float',
			},
		thawsTarget: true,
		secondary: {
		chance: 10,
		status: 'brn',
		},
		target: "normal",
		type: "Fire",
		contestType: "Tough",
	},
	extendneck: {
		accuracy: 100,
		basePower: 40,
		basePowerCallback(pokemon, target, move) {
			// You can't get here unless the pursuit succeeds
			if (target.beingCalledBack) {
				this.debug('Pursuit damage boost');
				return move.basePower * 2;
			}
			return move.basePower;
		},
		category: "Special",
		name: "Extend Neck",
		shortDesc: "If a foe is switching out, hits it at 2x power.",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		beforeTurnCallback(pokemon) {
			for (const side of this.sides) {
				if (side === pokemon.side) continue;
				side.addSideCondition('extendneck', pokemon);
				const data = side.getSideConditionData('extendneck');
				if (!data.sources) {
					data.sources = [];
				}
				data.sources.push(pokemon);
			}
		},
		onModifyMove(move, source, target) {
			if (target?.beingCalledBack) move.accuracy = true;
			if (target?.beingCalledBack) move.pp = true;
		},
		onTryHit(target, pokemon) {
			target.side.removeSideCondition('extendneck');
		},
		condition: {
			duration: 1,
			onBeforeSwitchOut(pokemon) {
				this.debug('Extend Neck start');
				let alreadyAdded = false;
				pokemon.removeVolatile('destinybond');
				for (const source of this.effectData.sources) {
					if (!this.queue.cancelMove(source) || !source.hp) continue;
					if (!alreadyAdded) {
						this.add('-activate', pokemon, 'move: Extend Neck');
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
					this.runMove('extendneck', source, this.getTargetLoc(pokemon, source));
				}
			},
		},
		secondary: null,
		target: "normal",
		type: "Fighting",
		contestType: "Clever",
	},
	pungiblow: {
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Pungi Blow",
		shortDesc: "10% chance to lower the target's Attack by 1.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 20,
			boosts: {
				atk: -1,
			},
		},
		target: "normal",
		type: "Steel",
	},
	beamup: {
		accuracy: 100,
		basePower: 85,
		category: "Special",
		name: "Beam Up",
		shortDesc: "Ignores Dark-type immunity.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		ignoreImmunity: {'Psychic': true},
		target: "normal",
		type: "Psychic",
		contestType: "Clever",
	},
	darkfractals: {
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		name: "Dark Fractals",
		shortDesc: "Hits two turns after being used.",
		pp: 10,
		priority: 0,
		flags: {},
		ignoreImmunity: true,
		isFutureMove: true,
		onTry(source, target) {
			if (!target.side.addSlotCondition(target, 'futuremove')) return false;
			Object.assign(target.side.slotConditions[target.position]['futuremove'], {
				duration: 3,
				move: 'darkfractals',
				source: source,
				moveData: {
					id: 'darkfractals',
					name: "Dark Fractals",
					accuracy: 100,
					basePower: 100,
					category: "Physical",
					priority: 0,
					flags: {},
					ignoreImmunity: false,
					effectType: 'Move',
					isFutureMove: true,
					type: 'Dark',
				},
			});
			this.add('-start', source, 'move: Dark Fractals');
			return null;
		},
		secondary: null,
		target: "normal",
		type: "Dark",
		contestType: "Clever",
	},
	sulfuricflame: {
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Sulfuric Flame",
		shortDesc: "Deals 1.5x damage to statused opponents. Removes non-poison status conditions from opponent.",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, authentic: 1},
		onBasePower(basePower, pokemon, target) {
			if (target.status === 'psn' || target.status === 'tox') {
				return this.chainModify(1.5);
			}
		},
		secondary: {
			dustproof: true,
			chance: 100,
			onHit(target) {
				if (target.status === 'brn') { target.cureStatus();
				} else if (target.status === 'par') { target.cureStatus();
				} else if (target.status === 'frz') target.cureStatus();
			},
		},
		target: "normal",
		type: "Fire",
		contestType: "Tough",
	},
	lushsoil: {
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		name: "Lush Soil",
		shortDesc: "User on Grassy Terrain: 1.5x power. Ends Grassy Terrain.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onBasePower(basePower, source) {
			if (this.field.isTerrain('grassyterrain') && source.isGrounded()) {
				this.debug('terrain buff');
				return this.chainModify(1.5);
			}
		},
		onModifyMove(move, source, target) {
			if (this.field.isTerrain('grassyterrain') && source.isGrounded()) {
				move.target = 'allAdjacentFoes';
			}
		},
		onHit(move, source, target) {
			if (this.field.isTerrain('grassyterrain') && source.isGrounded()) {
			this.field.clearTerrain();
			}
		},
		secondary: null,
		target: "normal",
		type: "Ground",
	},
   entrancingsound: {
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Entrancing Sound",
		shortDesc: "Prevents the target from switching out.",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, authentic: 1},
		secondary: {
			chance: 100,
			onHit(target, source, move) {
				if (source.isActive) target.addVolatile('trapped', source, move, 'trapper');
			},
		},
		target: "allAdjacentFoes",
		type: "Fairy",
	},
   paralyzinggoo: {
		accuracy: 100,
		basePower: 110,
		category: "Special",
		name: "Paralyzing Goo",
		shortDesc: "-1 Priority. 30% chance to Paralyze target.",
		pp: 10,
		priority: -1,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			status: 'par',
		},
		target: "allAdjacent",
		type: "Dragon",
	},
   neurodrain: {
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Neuro Drain",
		shortDesc: "User recovers 75% of the damage dealt.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, heal: 1},
		drain: [3, 4],
		secondary: null,
		target: "normal",
		type: "Psychic",
	},
   spikeburst: {
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Spike Burst",
		shortDesc: "Sets a layer of Spikes.",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		self: {
			onHit(source) {
				source.side.foe.addSideCondition('spikes');
			},
		},
		secondary: null,
		target: "allAdjacent",
		type: "Ground",
	},
   aerialassault: {
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Aerial Assault",
		shortDesc: "Inflicts Torment on the target after succesfully being used.",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		volatileStatus: 'torment',
		condition: {
			noCopy: true,
			onStart(pokemon) {
				if (pokemon.volatiles['dynamax']) {
					delete pokemon.volatiles['torment'];
					return false;
				}
				this.add('-start', pokemon, 'Torment');
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Torment');
			},
			onDisableMove(pokemon) {
				if (pokemon.lastMove && pokemon.lastMove.id !== 'struggle') pokemon.disableMove(pokemon.lastMove.id);
			},
		},
		secondary: null,
		target: "normal",
		type: "Steel",
	},
   airsurveillance: {
		accuracy: true,
		basePower: 80,
		category: "Physical",
		name: "Air Surveillance",
		shortDesc: "Resets all of the target's stat stages to 0.",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onHitField() {
			this.add('-clearallboost');
			for (const pokemon of this.getAllActive()) {
				pokemon.clearBoosts();
			}
		},
		secondary: null,
		target: "all",
		type: "Flying",
	},
   gourdspirit: {
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Gourd Spirit",
		shortDesc: "1.5x damage under any terrain. Ends active terrain.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyType(move, pokemon) {
			if (!pokemon.isGrounded()) return;
			switch (this.field.terrain) {
			case 'electricterrain':
				move.type = 'Ghost';
				break;
			case 'grassyterrain':
				move.type = 'Ghost';
				break;
			case 'mistyterrain':
				move.type = 'Ghost';
				break;
			case 'psychicterrain':
				move.type = 'Ghost';
				break;
			}
		},
		onModifyMove(move, pokemon) {
			if (this.field.terrain && pokemon.isGrounded()) {
				move.basePower *= 1.5;
			}
		},
      onHit() {
			this.field.clearTerrain();
		},
		secondary: null,
		target: "normal",
		type: "Ghost",
	},
   moonritual: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Moon Ritual",
		shortDesc: "For 5 turns, damage to allies is halved. (Light Clay extends duration to 8 turns.) 1/2 Recoil",
		pp: 20,
		priority: 0,
		flags: {snatch: 1},
		sideCondition: 'moonritual',
		onPrepareHit: function(target, source, move) {
			this.damage(source.baseMaxhp / 2, source);
			this.attrLastMove('[still]');
			this.add('-anim', source, "Moonlight", target);
			this.add('-message', `${source.name} praised the moon!`);
		},
		condition: {
			duration: 5,
			durationCallback(target, source, effect) {
				if (source?.hasItem('lightclay')) {
					return 8;
				}
				return 5;
			},
			onAnyModifyDamage(damage, source, target, move) {
				if (target !== source && target.side === this.effectData.target) {
					if ((target.side.getSideCondition('reflect') && this.getCategory(move) === 'Physical') ||
							(target.side.getSideCondition('lightscreen') && this.getCategory(move) === 'Special')) {
						return;
					}
					if (!target.getMoveHitData(move).crit && !move.infiltrates) {
						this.debug('Moon Ritual weaken');
						if (target.side.active.length > 1) return this.chainModify([0xAAC, 0x1000]);
						return this.chainModify(0.5);
					}
				}
			},
			onStart(side) {
				this.add('-sidestart', side, 'move: Moon Ritual');
			},
			onResidualOrder: 21,
			onResidualSubOrder: 1,
			onEnd(side) {
				this.add('-sideend', side, 'move: Moon Ritual');
			},
		},
        secondary: null,
		target: "allySide",
		type: "Fairy",
	},
   illomen: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Ill Omen",
		shortDesc: "Sets Trick Room two turns after being used.",
		pp: 10,
		priority: 0,
		flags: {},
		ignoreImmunity: true,
		isFutureMove: true,
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Mean Look", target);
			this.add('-message', `${source.name} had a vision...`);
		},
		onTry(source, target) {
			if (!target.side.addSlotCondition(target, 'futuremove')) return false;
			Object.assign(target.side.slotConditions[target.position]['futuremove'], {
				duration: 3,
				move: 'trickroom',
				source: source,
				moveData: {
                    id: 'illomen',
                    name: "Ill Omen",
                    accuracy: true,
                    basePower: 0,
                    category: "Status",
                    priority: -7,
		            flags: {mirror: 1},
                    ignoreImmunity: true,
					
		            pseudoWeather: 'trickroom',
                    condition: {
                        duration: 5,
                        onStart(target, source) {
                            this.add('-fieldstart', 'move: Trick Room', '[of] ' + source);
                        },
                        onRestart(target, source) {
                            this.field.removePseudoWeather('trickroom');
                        },
                        // Speed modification is changed in Pokemon.getActionSpeed() in sim/pokemon.js
                        onResidualOrder: 23,
                        onEnd() {
                            this.add('-fieldend', 'move: Trick Room');
                        },
                    },
                    effectType: 'Move',
                    isFutureMove: true,
					type: 'Poison',
				},
			});
			this.add('-start', source, 'move: Trick Room');
			return null;
		},
		secondary: null,
		target: "all",
		type: "Psychic",
	},
   souraroma: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Sour Aroma",
		shortDesc: "Raises the user's SpA and Def by 1.",
		pp: 20,
		priority: 0,
		flags: {snatch: 1},
		boosts: {
			spa: 1,
			def: 1,
		},
		secondary: null,
		target: "self",
		type: "Grass",
	},
   vengefulspirit: {
		accuracy: 100,
		basePower: 85,
		category: "Special",
		name: "Vengeful Spirit",
		shortDesc: "Sets Safeguard.",
		pp: 15,
		priority: 0,
		flags: {},
		self: {
			onHit(source) {
				source.side.addSideCondition('safeguard');
			},
		},
		secondary: null,
		target: "normal",
		type: "Ghost",
	},
   innerdeviation: {
		accuracy: 90,
		basePower: 100,
		category: "Special",
		name: "Inner Deviation",
		shortDesc: "Lowers the user's Speed by 1.",
		pp: 10,
		flags: {protect: 1, mirror: 1},
		self: {
			boosts: {
				spe: -1,
			},
		},
		priority: 0,
		secondary: null,
		target: "normal",
		type: "Dark",
	},
};

