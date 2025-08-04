export const Moves: import('../../../sim/dex-moves').ModdedMoveDataTable = {
	dimensionalcape: {
		num: -14,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Dimensional Cape",
		shortDesc: "Switches and makes incoming ally immune to entry hazards.",
		pp: 15,
		priority: 0,
		flags: {snatch: 1, metronome: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Phantom Force", source);
			this.add('-anim', source, "Teleport", source);
		},
		slotCondition: 'dimensionalcape',
		condition: {
			duration: 1,
			onSwap(target) {
				if (!target.fainted) {
					target.addVolatile('hazardshield');
				}
				target.side.removeSlotCondition(target, 'dimensionalcape');
			},
		},
		selfSwitch: true,
		secondary: null,
		target: "self",
		type: "Dark",
		contestType: "Cool",
	},
	bigbash: {
		accuracy: 100,
		basePower: 68,
		category: "Physical",
		name: "Big Bash",
		shortDesc: "Guaranteed crit if either Pokemon used Big Button.",
		pp: 20,
		priority: 0,
		flags: {},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Pulverizing Pancake", target);
		},
		onModifyMove(move, pokemon, target) {
			if(pokemon.volatiles['bigbutton'] || target.volatiles['bigbutton']) move.willCrit = true;
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Clever",
	},
	epicbeam: {
		name: "Epic Beam",
		type: "Ice",
		category: "Status",
		basePower: 0,
		accuracy: true,
		pp: 40,
		shortDesc: "Epic Beam",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onTry(source) {
			if (source.side.pokemonLeft > 1) return;
			this.attrLastMove('[still]');
			this.add('-fail', source, 'move: Epic Beam');
			return null;
		},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Prismatic Laser", target);
		},
		onModifyMove(move, pokemon, target) {
			move.category = 'Special';
			move.basePower = 300;
		},
		onAfterHit(target, source) {
			source.side.addSlotCondition(source, 'epicbeam');
		},
		// wtf
		selfSwitch: true,
		condition: {
			duration: 1,
			// sacrificing implemented in side.ts, kind of
		},
		secondary: null,
		target: "normal",
	},
	fisheater: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Fish Eater",
		shortDesc: "-50% foe's fishing tokens; 1/16 heal, +1 stockpile each.",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, fishing: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Life Dew", pokemon);
		},
		onTry(source, target) {
			return (target.side.fishingTokens && target.side.fishingTokens > 0);
		},
		onHit(target, source, move) {
			if (!target.side.fishingTokens || target.side.fishingTokens <= 0 || source.volatiles['stockpile3']) return false;
			const tokens = Math.ceil(target.side.fishingTokens / 2);
			const success = target.side.removeFishingTokens(tokens);
			if (success) {
				for (let i = 0; i < Math.min(3, tokens); i ++) {
					source.addVolatile('stockpile');
				}
				this.heal(Math.ceil(source.maxhp * tokens / 16), source);
			}
			return success;
		},
		secondary: null,
		target: "normal",
		type: "Normal",
	},
	fishingterrain: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Fishing Terrain",
		shortDesc: "5 turns. Grounded: +Fishing power, Fishing tokens +1 on fishing move.",
		pp: 10,
		priority: 0,
		flags: {nonsky: 1, metronome: 1},
		terrain: 'fishingterrain',
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
				let mod = 1;
				if (attacker.isGrounded() && !attacker.isSemiInvulnerable()) {
					if(move.flags['fishing']) mod *= 1.3;
				}
				return this.chainModify(mod);
			},
			onAfterMove(target, source, move) {
				if (move.flags['fishing']) target.side.addFishingTokens(1);
			},
			onFieldStart(field, source, effect) {
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Fishing Terrain', '[from] ability: ' + effect.name, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Fishing Terrain');
				}
			},
			onFieldResidualOrder: 27,
			onFieldResidualSubOrder: 7,
			onFieldEnd() {
				this.add('-fieldend', 'move: Fishing Terrain');
			},
		},
		secondary: null,
		target: "all",
		type: "Water",
	},
	moltenglaze: {
		accuracy: 100,
		basePower: 70,
		category: "Special",
		shortDesc: "Makes foe(s) weaker to Fire.",
		name: "Molten Glaze",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		secondary: {
			chance: 100,
			onHit(target) {
				target.addVolatile('tarshot');
			},
		},
		target: "allAdjacentFoes",
		type: "Fire",
		contestType: "Clever",
	},
	gofish: {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Go Fish",
		shortDesc: "Spends 1 token to switch target. Fails if target is not attacking.",
		pp: 5,
		priority: 1,
		flags: {protect: 1, reflectable: 1, mirror: 1, metronome: 1, fishing: 1,},
		forceSwitch: true,
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Boomburst", target);
		},
		onTry(source, target) {
			const action = this.queue.willMove(target);
			const move = action?.choice === 'move' ? action.move : null;
			if (!move || (move.category === 'Status' && move.id !== 'mefirst') || target.volatiles['mustrecharge'] || !source.side.removeFishingTokens(1)) {
				return false;
			}
		},
		secondary: null,
		target: "normal",
		type: "Water",
		contestType: "Clever",
	},
	fishanddip: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Fish and Dip",
		shortDesc: "Sets 1 Fishing Token on the user's side. User switches out.",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, fishing: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Life Dew", pokemon);
		},
		onHit(target, source, move) {
			source.side.addFishingTokens(1);
		},
		selfSwitch: true,
		secondary: null,
		target: "self",
		type: "Water",
	},
	fishmortar: {
		accuracy: 100,
		basePower: 120,
		category: "Special",
		name: "Fish Mortar",
		shortDesc: "Hits two turns after being used.",
		pp: 10,
		priority: 0,
		flags: { allyanim: 1, metronome: 1, futuremove: 1 },
		ignoreImmunity: true,
		onTry(source, target) {
			if (!target.side.addSlotCondition(target, 'futuremove')) return false;
			Object.assign(target.side.slotConditions[target.position]['futuremove'], {
				move: 'fishmortar',
				source,
				moveData: {
					id: 'fishmortar',
					name: "Fish Mortar",
					accuracy: 100,
					basePower: 120,
					category: "Special",
					priority: 0,
					flags: { allyanim: 1, metronome: 1, futuremove: 1 },
					ignoreImmunity: false,
					effectType: 'Move',
					type: 'Water',
				},
			});
			this.add('-start', source, 'move: Fish Mortar');
			return this.NOT_FAIL;
		},
		secondary: null,
		target: "normal",
		type: "Water",
		contestType: "Clever",
	},
  	fishingminigame: {
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Fishing Minigame",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1, fishing: 1,},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Anchor Shot", target);
		},
		onHit(target, source, move) {
			if (source.isActive) target.addVolatile('trapped', source, move, 'trapper');
		},
		secondary: null,
		target: "normal",
		type: "Water",
		contestType: "Tough",
		shortDesc: "Prevents the target from switching out.",
	},
	goombastomp: {
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		name: "Goomba Stomp",
		shortDesc: "100% chance for -1 Defense. OHKOs Goomba.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, contact: 1, foot: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "High Jump Kick", target);
		},
		secondary: {
			chance: 100,
			boosts: {
				def: -1,
			},
		},
		onModifyMove(move, pokemon) {
			for (const target of pokemon.foes()) {
				if (target.baseSpecies == "Goomba") {
					if (target.volatiles['bigbutton']) {
						basePower = 0;
						damageCallback = function (target) {
							return this.clampIntRange(target.getUndynamaxedHP() / 3, 1);
						}
					} else {
						move.ohko = true;
						move.accuracy = true;
					}
				}
			}
		},
		target: "normal",
		type: "Normal",
		contestType: "Clever",
	},
	gorgingmissile: {
		accuracy: 100,
		basePower: 90,
		category: "Special",
		name: "Gorging Missile",
		shortDesc: "If user is under 50% max HP, paralyzes the opponent.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, fishing: 1,},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Snipe Shot", target);
		},
		onModifyMove(move, pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 2) {
				move.status = 'par';
			}
		},
		secondary: null,
		target: "normal",
		type: "Electric",
		contestType: "Cool",
	},
	yoshisisland: {
		name: "Yoshi\'s Island",
		type: "Normal",
		category: "Physical",
		basePower: 180,
		accuracy: 100,
		pp: 5,
		shortDesc: "Hits all adjacent Pokemon. User faints and gains 3 Fishing Tokens.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		selfdestruct: "always",
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Explosion", target);
		},
		onAfterHit(target, source) {
			source.side.addFishingTokens(3);
		},
		onAfterSubDamage(damage, target, source) {
			source.side.addFishingTokens(3);
		},
		secondary: null,
		target: "normal",
	},
	zekromkick: {
		name: "Zekrom Kick",
		type: "Dragon",
		category: "Physical",
		basePower: 45,
		basePowerCallback(pokemon, target, move) {
			if (pokemon.species.id === 'zekrom') return move.basePower * 2;
			return move.basePower;
		},
		accuracy: 100,
		pp: 15,
		shortDesc: "Zekrom: 2x power. Else transforms into Zekrom.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, contact: 1, foot: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Thunderous Kick", target);
			this.add(`c:|${Math.floor(Date.now() / 1000)}|${getName(pokemon.name)}|shut up idiot ジェイ絵ジェ (ZEKROM KICK)`);
		},
		onAfterMoveSecondarySelf(target, source, move) {
			if (target.species.id !== 'zekrom') target.formeChange('Zekrom', this.effect, false, '0', '[msg]');
		},
		secondary: null,
		target: "normal",
	},
	// collateral
	gravity: {
		num: 356,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Gravity",
		pp: 5,
		priority: 0,
		flags: {nonsky: 1, metronome: 1},
		pseudoWeather: 'gravity',
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem('newtonsapple')) {
						return 8;
					}
					return 5;
			},
			onFieldStart(target, source) {
				if (source?.hasAbility('persistent')) {
					this.add('-fieldstart', 'move: Gravity', '[persistent]');
				} else {
					this.add('-fieldstart', 'move: Gravity');
				}
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
				return this.chainModify([6840, 4096]);
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
				if (move.flags['gravity'] && !move.isZ) {
					this.add('cant', pokemon, 'move: Gravity', move);
					return false;
				}
			},
			onModifyMove(move, pokemon, target) {
				if (move.flags['gravity'] && !move.isZ) {
					this.add('cant', pokemon, 'move: Gravity', move);
					return false;
				}
			},
			onModifyDamage(damage, source, target, move) {
				if (move.id === 'gravitonwave') {
					this.debug('Graviton Wave boost');
					return this.chainModify(1.5);
				}
			},
			onFieldResidualOrder: 27,
			onFieldResidualSubOrder: 2,
			onFieldEnd() {
				this.add('-fieldend', 'move: Gravity');
			},
		},
		secondary: null,
		target: "all",
		type: "Psychic",
		zMove: {boost: {spa: 1}},
		contestType: "Clever",
	},
	stockpile: {
		inherit: true,
		condition: {
			noCopy: true,
			onStart(target, source, effect) {
				this.effectState.layers = 1;
				this.effectState.def = 0;
				this.effectState.spd = 0;
				this.add('-start', target, 'stockpile' + this.effectState.layers);
				if (effect.id === 'fisheater') return;
				const [curDef, curSpD] = [target.boosts.def, target.boosts.spd];
				this.boost({def: 1, spd: 1}, target, target);
				if (curDef !== target.boosts.def) this.effectState.def--;
				if (curSpD !== target.boosts.spd) this.effectState.spd--;
			},
			onRestart(target, source, effect) {
				if (this.effectState.layers >= 3) return false;
				this.effectState.layers++;
				this.add('-start', target, 'stockpile' + this.effectState.layers);
				if (effect.id === 'fisheater') return;
				const curDef = target.boosts.def;
				const curSpD = target.boosts.spd;
				this.boost({def: 1, spd: 1}, target, target);
				if (curDef !== target.boosts.def) this.effectState.def--;
				if (curSpD !== target.boosts.spd) this.effectState.spd--;
			},
			onEnd(target) {
				if (this.effectState.def || this.effectState.spd) {
					const boosts: SparseBoostsTable = {};
					if (this.effectState.def) boosts.def = this.effectState.def;
					if (this.effectState.spd) boosts.spd = this.effectState.spd;
					this.boost(boosts, target, target);
				}
				this.add('-end', target, 'Stockpile');
				if (this.effectState.def !== this.effectState.layers * -1 || this.effectState.spd !== this.effectState.layers * -1) {
					this.hint("In Gen 7, Stockpile keeps track of how many times it successfully altered each stat individually.");
				}
			},
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
			} else if (this.field.isTerrain('fishingterrain')) {
				move = 'fishingminigame';
			} else if (this.field.isTerrain('frigidterrain')) {
				move = 'icebeam';
			}
			this.actions.useMove(move, pokemon, {target});
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
			} else if (this.field.isTerrain('fishingterrain')) {
				move.secondaries.push({
					chance: 100,
					onHit(target, source, move) {
						source.side.addFishingTokens(1);
					},
				});
			} else if (this.field.isTerrain('frigidterrain')) {
				move.secondaries.push({
					chance: 30,
					status: 'frz',
				});
			} 
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
			case 'fishingterrain':
				move.type = 'Water';
				break;
			case 'frigidterrain':
				move.type = 'Ice';
				break;
			}
		},
	},
};
