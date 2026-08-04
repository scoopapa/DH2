export const Moves: {[moveid: string]: ModdedMoveData} = {
	/*
	placeholder: {
		name: "",
		type: "",
		category: "",
		basePower: 0,
		accuracy: 100,
		pp: 10,
		shortDesc: "",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "", target);
		},
		secondary: null,
		target: "normal",
	},
	*/
	struggle: {
		inherit: true,
		shortDesc: "Highest stat = offensive stat. Uses user's primary type. 100% recoil.",
		basePower: 90,
		struggleRecoil: false,
		recoil: [100, 100],
		onModifyMove(move, pokemon) {
			const stat = pokemon.getBestStat(false, true);
			move.overrideOffensiveStat = stat;
			if (['spa', 'spd'].includes(stat)) move.category = "Special";
		},
		onModifyType(move, pokemon) {
			const types = pokemon.getTypes();
			let type = types[0];
			if (type === 'Bird') type = '???';
			if (type === '???' && types[1]) type = types[1];
			move.type = type;
		},
	},
	
	trickroom: {
		inherit: true,
		shortDesc: "Goes last. For 8 turns, turn order is reversed.",
		condition: {
			duration: 8,
			onFieldStart(target, source) {
				if (source?.hasAbility('persistent')) {
					this.add('-fieldstart', 'move: Trick Room', `[of] ${source}`, '[persistent]');
				} else {
					this.add('-fieldstart', 'move: Trick Room', `[of] ${source}`);
				}
			},
			onFieldRestart(target, source) {
				this.field.removePseudoWeather('trickroom');
			},
			// Speed modification is changed in Pokemon.getActionSpeed() in sim/pokemon.js
			onFieldResidualOrder: 27,
			onFieldResidualSubOrder: 1,
			onFieldEnd() {
				this.add('-fieldend', 'move: Trick Room');
			},
		},
	},
	magicroom: {
		inherit: true,
		shortDesc: "For 8 turns, all held items have no effect.",
		condition: {
			duration: 8,
			onFieldStart(target, source) {
				if (source?.hasAbility('persistent')) {
					this.add('-fieldstart', 'move: Magic Room', `[of] ${source}`, '[persistent]');
				} else {
					this.add('-fieldstart', 'move: Magic Room', `[of] ${source}`);
				}
				for (const mon of this.getAllActive()) {
					this.singleEvent('End', mon.getItem(), mon.itemState, mon);
				}
			},
			onFieldRestart(target, source) {
				this.field.removePseudoWeather('magicroom');
			},
			// Item suppression implemented in Pokemon.ignoringItem() within sim/pokemon.js
			onFieldResidualOrder: 27,
			onFieldResidualSubOrder: 6,
			onFieldEnd() {
				this.add('-fieldend', 'move: Magic Room', '[of] ' + this.effectState.source);
			},
		},
	},
	gravity: {
		inherit: true,
		shortDesc: "8 turns: no Ground immunities, 1.67x accuracy.",
		condition: {
			duration: 8,
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
			onFieldResidualOrder: 27,
			onFieldResidualSubOrder: 2,
			onFieldEnd() {
				this.add('-fieldend', 'move: Gravity');
			},
		},	
	},
	teleport: {
		inherit: true,
		priority: 0,
	},
	painsplit: {
		inherit: true,
		pp: 5,
	},
	taunt: {
		inherit: true,
		shortDesc: "Target can't use status moves next turn. Can't use twice.",
		flags: { protect: 1, reflectable: 1, mirror: 1, bypasssub: 1, metronome: 1, cantusetwice: 1},
		condition: {
			duration: 2,
			onStart(target) {
				if (target.activeTurns && !this.queue.willMove(target)) {
					this.effectState.duration!++;
				}
				this.add('-start', target, 'move: Taunt');
			},
			onResidualOrder: 15,
			onEnd(target) {
				this.add('-end', target, 'move: Taunt');
			},
			onDisableMove(pokemon) {
				for (const moveSlot of pokemon.moveSlots) {
					const move = this.dex.moves.get(moveSlot.id);
					if (move.category === 'Status' && move.id !== 'mefirst') {
						pokemon.disableMove(moveSlot.id);
					}
				}
			},
			onBeforeMovePriority: 5,
			onBeforeMove(attacker, defender, move) {
				if (!(move.isZ && move.isZOrMaxPowered) && move.category === 'Status' && move.id !== 'mefirst') {
					this.add('cant', attacker, 'move: Taunt', move);
					return false;
				}
			},
		},
	},
	clangoroussoul: {
		inherit: true,
		shortDesc: "User loses 1/8 of its max HP. +1 to all stats.",
		onTry(source) {
			if (source.hp <= (source.maxhp * 1 / 8) || source.maxhp === 1) return false;
		},
		onHit(pokemon) {
			this.directDamage(pokemon.maxhp * 1 / 8);
		},
		zMove: { effect: 'heal' },
	},
	batonpass: {
		inherit: true,
		shortDesc: "User switches out, passing volatiles.",
		onHit(pokemon) {
			pokemon.boosts = {atk: 0, def: 0, spa: 0, spd: 0, spe: 0, accuracy: 0, evasion: 0};
		},
	},
	fling: {
		inherit: true,
		shortDesc: "User consumes and activates its item on the target.",
		category: "Status",
		onPrepareHit(target, source, move) {
			if (source.ignoringItem(true)) return false;
			const item = source.getItem();
			if (!this.singleEvent('TakeItem', item, source.itemState, source, source, move, item)) return false;
			if (!item.fling) return false;
			if (item.isBerry) {
				if (source.hasAbility('cudchew')) {
					this.singleEvent('EatItem', source.getAbility(), source.abilityState, source, source, move, item);
				}
				move.onHit = function (foe) {
					if (this.singleEvent('Eat', item, source.itemState, foe, source, move)) {
						this.runEvent('EatItem', foe, source, move, item);
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
		},
	},
	
	spite: {
		inherit: true,
		pp: 1,
		noPPBoosts: true,
	},
	refresh: {
		inherit: true,
		pp: 1,
		noPPBoosts: true,
	},
	healbell: {
		inherit: true,
		pp: 1,
		noPPBoosts: true,
	},
	aromatherapy: {
		inherit: true,
		pp: 1,
		noPPBoosts: true,
	},
	lunarblessing: {
		inherit: true,
		shortDesc: "User loses 25% max HP. Next turn, that amount is restored.",
		onTry(source) {
			if (source.hp <= (source.maxhp * 25 / 100) || source.maxhp === 1) return false;
		},
		onHit(pokemon) {
			this.directDamage(pokemon.maxhp * 25 / 100);
		},
		slotCondition: 'lunarblessing',
		condition: {
			onStart(pokemon, source) {
				this.effectState.hp = source.maxhp / 4;
			},
			onResidualOrder: 4,
			onResidual(target: Pokemon) {
				if (this.getOverflowedTurnCount() <= this.effectState.startingTurn) return;
				target.side.removeSlotCondition(this.getAtSlot(this.effectState.sourceSlot), 'lunarblessing');
			},
			onEnd(target) {
				if (target && !target.fainted) {
					const damage = this.heal(this.effectState.hp, target, target);
					if (damage) {
						this.add('-heal', target, target.getHealth, '[from] move: Lunar Blessing', '[wisher] ' + this.effectState.source.name);
					}
				}
			},
		},
	},
	
	block: {
		inherit: true,
		shortDesc: "Target can't switch out for 2 turns.",
	},
	meanlook: {
		inherit: true,
		shortDesc: "Target can't switch out for 2 turns.",
	},
	
	willowisp: {
		inherit: true,
		accuracy: 100,
		pp: 15,
	},
	
	sheercold: {
		inherit: true,
		shortDesc: "Freezes the target.",
		accuracy: 100,
		pp: 15,
		status: 'frz',
		ohko: null,
	},

	glare: {
		inherit: true,
		pp: 15,
		type: "Electric",
	},
	stunspore: {
		inherit: true,
		pp: 15,
		accuracy: 100,
	},

	hypnosis: {
		inherit: true,
		accuracy: 100,
		pp: 15,
	},
	sing: {
		inherit: true,
		shortDesc: "Puts the target to sleep after 1 turn.",
		accuracy: 100,
		status: null,
		volatileStatus: 'yawn',
	},
	lovelykiss: {
		inherit: true,
		accuracy: 100,
	},

	toxic: {
		inherit: true,
		pp: 5,
		accuracy: 100,
	},
	toxicthread: {
		inherit: true,
		pp: 10,
	},
	poisongas: {
		inherit: true,
		pp: 15,
	},
	poisonpowder: {
		inherit: true,
		pp: 15,
		accuracy: 100,
	},

	purify: {
		inherit: true,
		shortDesc: "Replaces target's status with Purified.",
		type: "Dragon",
		pp: 15,
		isNonstandard: null,
		flags: { protect: 1, reflectable: 1, metronome: 1 },
		onHit(target, source) {
			if (!target.cureStatus()) {
				this.add('-fail', source);
				this.attrLastMove('[still]');
				return this.NOT_FAIL;
			}
			target.setStatus('pur');
		},
	},
	coreenforcer: {
		inherit: true,
		shortDesc: "Suppresses the target's ability and removes their item if they are purified.",
		basePower: 0,
		category: "Status",
		isNonstandard: null,
		onHit(target) {
			if (target.status !== 'pur') return false;
			if (!target.getAbility().flags['cantsuppress']) target.addVolatile('gastroacid');
			const item = target.takeItem(source);
			if (item) {
				this.add('-enditem', target, item.name, '[from] move: Corrosive Gas', `[of] ${source}`);
			}
		},
		onAfterSubDamage: null,
	},
	nihillight: {
		inherit: true,
		shortDesc: "Target faints if a majority of its team is Purified.",
		basePower: 0,
		category: "Status",
		isNonstandard: null,
		ignoreEvasion: null,
		ignoreDefensive: null,
		ignoreImmunity: null,
		flags: { protect: 1, mirror: 1, bypasssub: 1 },
		onHit(target, source) {
			const purified = target.side.pokemon.filter(p => !p.fainted && p.status === 'pur').length;
			if (purified / target.side.pokemonLeft >= 0.5) target.faint();
			else return false;
		},
	},
	terastarstorm: {
		inherit: true,
		shortDesc: "User heals 1/4 lost HP if the target is purified.",
		basePower: 0,
		category: "Status",
		onModifyType: null,
		onModifyMove: null,
		flags: { protect: 1, mirror: 1, noassist: 1, failcopycat: 1, failmimic: 1, nosketch: 1, heal: 1 },
		onHit(target, source) {
			if (!target || !target.status === 'pur') return false;
			if (!source.side.terastarstormUses) source.side.terastarstormUses = 0;
			source.side.terastarstormUses ++;
			return !!(this.heal((source.baseMaxhp - source.hp) / 4, source, source));
		},
	},


	psychicterrain: {
		inherit: true,
		shortDesc: "Psychic Terrain + Confusion isn't removed when switching out.",
		condition: {
			effectType: 'Terrain',
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			onTryHitPriority: 4,
			onTryHit(target, source, effect) {
				if (effect && (effect.priority <= 0.1 || effect.target === 'self')) {
					return;
				}
				if (target.isSemiInvulnerable() || target.isAlly(source)) return;
				if (!target.isGrounded()) {
					const baseMove = this.dex.moves.get(effect.id);
					if (baseMove.priority > 0) {
						this.hint("Psychic Terrain doesn't affect airborne Pokémon.");
					}
					return;
				}
				this.add('-activate', target, 'move: Psychic Terrain');
				return null;
			},
			onUpdate(pokemon) {
				pokemon.confusion = !!pokemon.volatiles['confusion'];
			},
			onSwitchIn(pokemon) {
				if (pokemon.confusion && !pokemon.volatiles['confusion']) {
					pokemon.addVolatile('confusion');
				}
			},
			onFieldStart(field, source, effect) {
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Psychic Terrain', '[from] ability: ' + effect.name, `[of] ${source}`);
				} else {
					this.add('-fieldstart', 'move: Psychic Terrain');
				}
			},
			onFieldResidualOrder: 27,
			onFieldResidualSubOrder: 7,
			onFieldEnd() {
				this.add('-fieldend', 'move: Psychic Terrain');
				for (const pokemon of this.getAllActive()) {
					if (pokemon.confusion) pokemon.confusion = false;
				}
			},
		},
	},

	infestation: {
		inherit: true,
		shortDesc: "Enervates the target.",
		basePower: 0,
		category: "Status",
		volatileStatus: "enervate",
		flags: { protect: 1, mirror: 1},
	},

	doomdesire: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Doom Desire",
		shortDesc: "In 2 turns, the target gains 140 Doom.",
		pp: 5,
		priority: 0,
		flags: { authentic: 1, metronome: 1, futuremove: 1 },
		isFutureMove: true,
		ignoreImmunity: true,
		onTry(source, target) {
			if (!target.side.addSlotCondition(target, 'futuremove')) return false;
			Object.assign(target.side.slotConditions[target.position]['futuremove'], {
				duration: 3,
				move: 'doomdesire',
				source: source,
				moveData: {
					id: 'doomdesire',
					name: "Doom Desire",
					accuracy: 100,
					basePower: 0,
					category: "Status",
					priority: 0,
					flags: {},
					effectType: 'Move',
					isFutureMove: true,
					type: 'Steel',
					onHit(target) {
						target.addDoom(140);
					},
				},
			});
			this.add('-start', source, 'move: Doom Desire');
			return null;
		},
		secondary: null,
		target: "normal",
		type: "Steel",
	},
	torment: {
		inherit: true,
		shortDesc: "Target gains 30 Doom. If the target already has Doom, add 60 instead.",
		volatileStatus: null,
		onHit(target, source) {
			if (!target.doom) {
				if (!target.addDoom(30)) return false;
			} else {
				if (!target.addDoom(60)) return false;
			}
		},
	},
	darkvoid: {
		inherit: true,
		shortDesc: "Doubles the target's Doom.",
		accuracy: 100,
		status: null,
		onTry(source, target, move) {},
		onHit(target, source) {
			if (!target.doom) return false;
			else {
				if (!target.doubleDoom()) return false;
			}
		},
	},
	
	submission: {
		inherit: true,
		shortDesc: "Stuns the target.",
		basePower: 0,
		accuracy: 100,
		category: "Status",
		volatileStatus: "stun",
		flags: { protect: 1, mirror: 1},
	},

	curse: {
		inherit: true,
		onModifyMove(move, source, target) {
			if (!source.hasType('Ghost') && !source.hasItem('spelltag')) {
				move.target = move.nonGhostTarget!;
			} else if (source.isAlly(target)) {
				move.target = 'randomNormal';
			}
		},
		onTryHit(target, source, move) {
			if (!source.hasType('Ghost') && !source.hasItem('spelltag')) {
				delete move.volatileStatus;
				delete move.onHit;
				move.self = { boosts: { spe: -1, atk: 1, def: 1 } };
			} else if (move.volatileStatus && target.volatiles['curse']) {
				return false;
			}
		},
	},

	leechseed: {
		inherit: true,
		flags: { protect: 1, reflectable: 1, mirror: 1, metronome: 1, powder: 1 },
	},
};
