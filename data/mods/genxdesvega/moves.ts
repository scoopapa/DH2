export const Moves: {[moveid: string]: MoveData} = {
	mindmelt: {
		num: -1,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		name: "Mind Melt",
		shortDesc: "30% of inflicting Confusion on the target.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Confusion", target);
		},
		secondary: {
			chance: 30,
			volatileStatus: 'confusion',
		},
		target: "normal",
		type: "Psychic",
	},
	watchfuleye: {
		num: -2,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Watchful Eye",
		shortDesc: "Traps the target.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Mean Look", target);
		},
		secondary: {
			chance: 100,
			onHit(target, source, move) {
				if (source.isActive) target.addVolatile('trapped', source, move, 'trapper');
			},
		},
		target: "normal",
		type: "Dark",
	},
	poisonousflight: {
		num: -3,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		name: "Poisonous Flight",
		shortDesc: "User switches out after damaging the target.",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Mortal Spin", target);
		},
		selfSwitch: true,
		secondary: null,
		target: "normal",
		type: "Poison",
	},
	sleuth: {
		num: -4,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Sleuth",
		shortDesc: "Reveals the target's moveset.",
		pp: 20,
		priority: 0,
		flags: {reflectable: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Foresight", target);
		},
		onHit(target, pokemon) {
			let warnMoves: (Move | Pokemon)[][] = [];
			let warnBp = 1;
			for (const target of pokemon.foes()) {
				for (const moveSlot of target.moveSlots) {
					const move = this.dex.moves.get(moveSlot.move);
					warnMoves.push(" " + move);
				}
			}
			if (!warnMoves.length) return;
			this.add('-message', `${pokemon.name} revealed ${target.name}'s${warnMoves}!`);
		},
		secondary: null,
		target: "normal",
		type: "Dark",
	},
	lastlaugh: {
		num: -5,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Last Laugh",
		shortDesc: "Lower's the target's Attack, Sp. Atk, and Spe by 1. The user faints.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Memento", target);
		},
		boosts: {
			atk: -1,
			spa: -1,
			spe: -1,
		},
		selfdestruct: "ifHit",
		secondary: null,
		target: "normal",
		type: "Fairy",
	},
	geistbite: {
		num: -6,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		name: "Geist Bite",
		shortDesc: "20% chance to lower the target's Def and SpD by 1 stage.",
		pp: 15,
		priority: 0,
		flags: {bite: 1, contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Crunch", target);
		},
		secondary: {
			chance: 20,
			boosts: {
				def: -1,
				spd: -1,
			},
		},
		target: "normal",
		type: "Ghost",
	},
	frostfeint: {
		num: -7,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		name: "Frost Feint",
		shortDesc: "User switches out after damaging the target.",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Ice Spinner", target);
		},
		selfSwitch: true,
		secondary: null,
		target: "normal",
		type: "Ice",
	},
	drift: {
		num: -8,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		name: "Drift",
		shortDesc: "User switches out after damaging the target.",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Flame Charge", target);
		},
		selfSwitch: true,
		secondary: null,
		target: "normal",
		type: "Fire",
	},
	magicspin: {
		num: -9,
		accuracy: 100,
		basePower: 95,
		category: "Physical",
		name: "Magic Spin",
		shortDesc: "10% chance to confuse the target.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Magical Torque", target);
		},
		secondary: {
			chance: 10,
			volatileStatus: 'confusion',
		},
		target: "normal",
		type: "Fairy",
	},
	sheriffshot: {
		num: -10,
		accuracy: 100,
		basePower: 95,
		category: "Physical",
		name: "Sheriff Shot",
		shortDesc: "50% chance to lower the target's Def by 1 stage.",
		pp: 10,
		priority: 0,
		flags: {bullet: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Vacuum Wave", target);
		},
		secondary: {
			chance: 50,
			boosts: {
				def: -1,
			},
		},
		target: "normal",
		type: "Fighting",
	},
	banditblast: {
		num: -11,
		accuracy: 100,
		basePower: 95,
		category: "Physical",
		name: "Bandit Blast",
		shortDesc: "50% chance to lower the target's Def by 1 stage.",
		pp: 10,
		priority: 0,
		flags: {bullet: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Vacuum Wave", target);
		},
		secondary: {
			chance: 50,
			boosts: {
				def: -1,
			},
		},
		target: "normal",
		type: "Dark",
	},
	fanthehammer: {
		num: -12,
		accuracy: 100,
		basePower: 25,
		category: "Physical",
		name: "Fan the Hammer",
		shortDesc: "Hits 2-5 times in one turn.",
		pp: 30,
		priority: 0,
		flags: {bullet: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Rock Blast", target);
		},
		multihit: [2, 5],
		secondary: null,
		target: "normal",
		type: "Steel",
		contestType: "Cool",
	},
	ironstrike: {
		num: -13,
		accuracy: 100,
		basePower: 80,
		name: "Iron Strike",
		shortDesc: "The target takes hazard damage after being hit by this move.",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Iron Head", target);
		},
		onAfterHit(target, source) {
			const targetSide = source.side.foe;
			if (targetSide.getSideCondition('stealthrock')) {
				if (target.hasItem('heavydutyboots')) return;
				const typeMod = this.clampIntRange(target.runEffectiveness(this.dex.getActiveMove('stealthrock')), -6, 6);
				this.damage(target.maxhp * Math.pow(2, typeMod) / 8);
				this.add('-message', `Pointed stones dug into ${target.name}!`);
			}
			if (targetSide.getSideCondition('spikes')) {
				//if (!target.isGrounded()) return;
				if (target.hasItem('heavydutyboots')) return;
				const damageAmounts = [0, 3, 4, 6]; // 1/8, 1/6, 1/4
				this.damage(damageAmounts[this.effectData.layers] * target.maxhp / 24);
				this.add('-message', `${target.name} was hurt by the spikes!`);
			}
		},
		secondary: null,
		target: "normal",
		type: "Steel",
	},
	railwayblitz: {
		num: -14,
		accuracy: 90,
		basePower: 60,
		category: "Physical",
		name: "Railway Blitz",
		shortDesc: "Usually moves first.",
		pp: 10,
		priority: 1,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Bullet Punch", target);
		},
		secondary: null,
		target: "normal",
		type: "Steel",
		contestType: "Cool",
	},
	dragonfang: {
		num: -15,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Dragon Fang",
		shortDesc: "30% chance to burn the target.",
		pp: 15,
		priority: 0,
		flags: {bite: 1, contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hyper Fang", target);
		},
		secondary: {
			chance: 30,
			status: 'brn',
		},
		target: "normal",
		type: "Dragon",
		contestType: "Tough",
	},
	poisonterrain: {
		num: -16,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Poison Terrain",
		shortDesc: "5 turns. Grounded: +Poison power, -1/16 max HP if not Bug/Poison/Steel, Poison -> Toxic.",
		pp: 10,
		priority: 0,
		flags: {nonsky: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Grassy Terrain", target);
		},
		terrain: 'poisonterrain',
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
				if (move.type === 'Poison' && attacker.isGrounded()) {
					this.debug('poison terrain boost');
					return this.chainModify([5325, 4096]);
				}
			},
			onFieldStart(field, source, effect) {
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Poison Terrain', '[from] ability: ' + effect.name, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Poison Terrain');
				}
			},
			onResidualOrder: 5,
			onResidualSubOrder: 2,
			onResidual(pokemon) {
				if (pokemon.isGrounded() && !pokemon.isSemiInvulnerable()) {
					if(!pokemon.hasType(['Bug', 'Poison', 'Steel'])) this.damage(pokemon.baseMaxhp / 16, pokemon, pokemon);
				} else {
					this.debug(`Pokemon semi-invuln or not grounded; Poison Terrain skipped`);
				}
			},
			onModifyMove(move, source, target) {
				if (move.status === 'psn'){
					this.debug("Poison Terrain upgrading poison to bad poison");
					move.status = 'tox';
				} else if(move.secondaries){
					for (const secondary of move.secondaries){
						if(secondary.status === 'psn'){
							this.debug("Poison Terrain upgrading poison to bad poison");
							secondary.status = 'tox';
						}
					}
				}
			},
			onFieldResidualOrder: 27,
			onFieldResidualSubOrder: 7,
			onFieldEnd() {
				this.add('-fieldend', 'move: Poison Terrain');
			},
		},
		secondary: null,
		target: "all",
		type: "Poison",
	},
	rototiller: {
		inherit: true,
		shortDesc: "Raises Atk/Sp. Atk of grounded Grass types by 1, 2 if Grassy Terrain.",
		onHitField(target, source) {
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
				if (this.field.isTerrain('grassyterrain')) this.boost({atk: 2, spa: 2}, pokemon, source);
				else this.boost({atk: 1, spa: 1}, pokemon, source);
			}
		},
	},
	toxicshock: {
		num: -17,
		accuracy: 95,
		basePower: 70,
		category: "Physical",
		name: "Toxic Shock",
		shortDesc: "Always results in a critical hit against foes affected by Poison Terrain.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Gunk Shot", target);
		},
		onModifyCritRatio(critRatio, source, target) {
			if (this.field.isTerrain('poisonterrain') && target && target.isGrounded()) {
				this.hint(`${move.name} always crits on grounded targets in Poison Terrain.`);
				return 5;
			}
		},
		secondary: null,
		target: "normal",
		type: "Poison",
		contestType: "Beautiful",
	},
	iceshove: {
		num: -18,
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		name: "Ice Shove",
		shortDesc: "High critical hit ratio. 100% chance to raise the user's Speed by 1.",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Ice Spinner", target);
		},
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
		type: "Ice",
		contestType: "Cool",
	},
	airdive: {
		num: -19,
		accuracy: 90,
		basePower: 60,
		category: "Physical",
		name: "Air Dive",
		shortDesc: "Always results in a critical hit.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Beak Blast", target);
		},
		willCrit: true,
		secondary: null,
		target: "normal",
		type: "Flying",
		contestType: "Cool",
	},
	oilslick: {
		num: -20,
		accuracy: 100,
		basePower: 40,
		category: "Physical",
		name: "Oil Slick",
		shortDesc: "Usually moves first.",
		pp: 30,
		priority: 1,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Quick Attack", target);
		},
		secondary: null,
		target: "normal",
		type: "Poison",
		contestType: "Cool",
	},
	pepperrush: {
		num: -21,
		accuracy: 95,
		basePower: 100,
		category: "Physical",
		name: "Pepper Rush",
		shortDesc: "Has 1.5x power if the user is burned. 10% chance to burn the target. Burns the user.",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Flare Blitz", target);
		},
		onBasePower(basePower, pokemon) {
			if (pokemon.status && pokemon.status === 'brn') {
				return this.chainModify(1.5);
			}
		},
		onAfterHit(target, source) {
			if (source.hp) {
				source.trySetStatus('brn', source);
			}
		},
		secondary: {
			chance: 10,
			status: 'brn',
		},
		target: "normal",
		type: "Fire",
		contestType: "Cool",
	},
	pluspulse: {
		num: -22,
		accuracy: true,
		basePower: 80,
		category: "Special",
		name: "Plus Pulse",
		shortDesc: "Has 1.5x power if the target has a stat boosted.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onBasePower(basePower, pokemon, target) {
			if (target.positiveBoosts() > 0) {
				return this.chainModify(1.5);
			}
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Shock Wave", target);
		},
		secondary: null,
		target: "normal",
		type: "Electric",
		contestType: "Cool",
	},
	minusion: {
		num: -23,
		accuracy: true,
		basePower: 80,
		category: "Physical",
		name: "Plus Pulse",
		shortDesc: "Has 1.5x power if the target has a stat lowered.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onBasePower(basePower, pokemon, target) {
			for (i in target.boosts) {
				if (target.boosts[i] < 0) {
					return this.chainModify(1.5);
				}
			}
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Zing Zap", target);
		},
		secondary: null,
		target: "normal",
		type: "Electric",
		contestType: "Cool",
	},
	infestation: {
		inherit: true,
		shortDesc: "Traps and damages the target for 3 turns, even if the user switches out.",
		onAfterHit(target, source, move) {
			target.addVolatile('infestation');
		},
		condition: {
			duration: 3,
			noCopy: true,
			onTrapPokemon(pokemon) {
				pokemon.tryTrap();
			},
			onResidual(pokemon) {
				this.damage(pokemon.baseMaxhp / 8);
			},
			onStart(target) {
				this.add('-activate', target, 'infestation');
			},
		}
	},
	octazooka: {
		inherit: true,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		shortDesc: "30% chance to poison the target.",
		secondary: {
			chance: 30,
			status: 'psn',
		}
	},
	inkburst: {
		num: -24,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		name: "Ink Burst",
		shortDesc: "30% chance to lower the target's Speed by 1 stage. Type depends on Crayoct's forme.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Sludge Bomb", target);
		},
		onModifyType(move, pokemon) {
			switch (pokemon.species.name) {
			case 'Crayoct-Red':
				move.type = 'Fire';
				break;
			case 'Crayoct-Blue':
				move.type = 'Flying';
				break;
			case 'Crayoct-Yellow':
				move.type = 'Electric';
				break;
			case 'Crayoct-Pink':
				move.type = 'Fairy';
				break;
			case 'Crayoct-Brown':
				move.type = 'Ground';
				break;
			}
		},
		secondary: {
			chance: 30,
			boosts: {
				spe: -1,
			}
		},
		target: "normal",
		type: "Normal",
	},
};