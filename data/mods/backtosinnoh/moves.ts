export const Moves: {[k: string]: ModdedMoveData} = {
	
	thornwhip: {
		num: -1,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Thorn Whip",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1},
		onAfterMove(target, source, move) {
			if (target !== source && move.category !== 'Status' && move.totalDamage) {
				this.damage(source.baseMaxhp / 8, source, target);
			}
		},
		secondary: null,
		shortDesc: "Opponent takes 1/8 HP of additional damage.",
		target: "normal",
		type: "Grass",
		contestType: "Tough",
	},
	parasite: {
		num: -2,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Parasite",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, heal: 1},
		onHit(pokemon) {
			const success = !!this.heal(this.modify(pokemon.maxhp, 0.125));
		},
		secondary: null,
		shortDesc: "User heals 1/8 max HP.",
		target: "normal",
		type: "Grass",
		contestType: "Tough",
	},
	sparkshot: {
		num: -3,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Spark Shot",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, bullet: 1},
		secondary: {
			chance: 30,
			status: 'par',
		},
		shortDesc: "30% chance to paralyze the target.",
		target: "allAdjacent",
		type: "Electric",
		contestType: "Beautiful",
	},
	guidedstrike: {
		num: -4,
		accuracy: 100,
		basePower: 45,
		category: "Physical",
		name: "Guided Strike",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		shortDesc: "Always ends in a critical hit.",
		willCrit: true,
		secondary: null,
		target: "normal",
		type: "Psychic",
	},
	mudbomb: {
		num: 426,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Mud Bomb",
		shortDesc: "10% chance to lower the target's Sp.Defense by 1.",
		pp: 15,
		priority: 0,
		flags: {bullet: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 20,
			boosts: {
				spd: -1,
			},
		},
		target: "normal",
		type: "Ground",
		contestType: "Clever",
	},
	poisondarts: {
		num: -6,
		accuracy: 100,
		basePower: 25,
		category: "Physical",
		name: "Poison Darts",
		pp: 30,
		priority: 0,
		flags: {bullet: 1, protect: 1, mirror: 1},
		multihit: [2, 5],
		secondary: null,
		target: "normal",
		shortDesc: "Hits 2-5 times in one turn.",
		type: "Poison",
		zMove: {basePower: 140},
		maxMove: {basePower: 130},
		contestType: "Cool",
	},
	starstorm: {
		num: -7,
		accuracy: 101,
		basePower: 120,
		category: "Special",
		name: "Starstorm",
		pp: 5,
		priority: 0,
		flags: {allyanim: 1, futuremove: 1},
		ignoreImmunity: true,
		onTry(source, target) {
			if (!target.side.addSlotCondition(target, 'futuremove')) return false;
			Object.assign(target.side.slotConditions[target.position]['futuremove'], {
				duration: 3,
				move: 'starstorm',
				source: source,
				moveData: {
					id: 'starstorm',
					name: "Starstorm",
					accuracy: 101,
					basePower: 120,
					category: "Special",
					priority: 0,
					flags: {allyanim: 1, futuremove: 1},
					ignoreImmunity: false,
					effectType: 'Move',
					type: 'Rock',
				},
			});
			this.add('-start', source, 'move: Future Sight');
			return this.NOT_FAIL;
		},
		secondary: null,
		target: "normal",
		type: "Rock",
		shortDesc: "Hits two turns after being used.",
		desc: "This attack hits two turns after being used.",
		contestType: "Clever",
	},
	souldrain: { 
		num: -8,
		accuracy: 100,
		basePower: 75,
		category: "Physical",
		name: "Soul Drain",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, heal: 1},
		drain: [1, 3],
		condition:
		{
			onTryHealPriority: 1,
			onTryHeal(damage, target, source, effect) {
				return this.chainModify(3);
			},
		},
		secondary: null,
		target: "normal",
		type: "Ghost",
		shortDesc: "Heals the user for 1/3 of the damage dealt. If the target was a Ghost-Type, the user is healed for 100% of the damage dealt",
		contestType: "Clever",
	},
	magneticblast: {
		num: -9,
		accuracy: 100,
		basePower: 110,
		category: "Special",
		name: "Magnetic Blast",
		sideCondition: 'spikes',
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onHit(target, source, side) {
			if (this.effectState.layers == 0) return false;
			this.add('-sideend', target.side, 'Spikes', '[from] move: Rapid Spin', '[of] ' + source);
			this.add('-sidestart', source.side, 'Spikes');
			this.effectState.layers--;
		},
		secondary: null,
		target: "normal",
		type: "Steel",
		shortDesc: "One layer of spikes on the opponent's side of the field is moved on to your side of the field.",
		contestType: "Beautiful",
	},
	cyclonescatter: {
		num: -10,
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		name: "Cyclone Scatter",
		pp: 15,
		priority: -3,
		flags: {protect: 1, failmefirst: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failinstruct: 1},
		priorityChargeCallback(pokemon) {
			pokemon.addVolatile('cyclonescatter');
		},
		condition: {
			duration: 1,
			onStart(pokemon) {
				this.add('-singleturn', pokemon, 'move: Cyclone Scatter');
			},
			onTryHitPriority: 2,
			onTryHit(target, source, move) {
				if (target === source || move.hasBounced || !move.flags['reflectable']) {
					return;
				}
				const newMove = this.dex.getActiveMove(move.id);
				newMove.hasBounced = true;
				newMove.pranksterBoosted = this.effectState.pranksterBoosted;
				this.actions.useMove(newMove, target, source);
				return null;
			},
			onAllyTryHitSide(target, source, move) {
				if (target.isAlly(source) || move.hasBounced || !move.flags['reflectable']) {
					return;
				}
				const newMove = this.dex.getActiveMove(move.id);
				newMove.hasBounced = true;
				newMove.pranksterBoosted = false;
				this.actions.useMove(newMove, this.effectState.target, source);
				return null;
			},
		},
		secondary: null,
		target: "normal",
		type: "Flying",
		contestType: "Tough",
	},
	diamondcharge: {
		num: -11,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Diamond Charge",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		recoil: [1, 4],
		secondary: null,
		target: "normal",
		type: "Rock",
		shortDesc: "Has 1/4 recoil.",
		contestType: "Tough",
	},
	bulletseed: {
		inherit: true,
		basePower: 20,
	},
	iciclespear: {
		inherit: true,
		basePower: 20,
	},
	pinmissile: {
		inherit: true,
		basePower: 20,
		accuracy: 100,
	},
	defog: {
		num: 432,
		accuracy: 100,
		basePower: 60,
		category: "Special",
		name: "Defog",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onModifyMove(move, pokemon) {
			if (pokemon.effectiveWeather()) {
				move.basePower *= 2;
			}
			this.debug('BP: ' + move.basePower);
		},
		onHit() {
			this.field.clearWeather();
		},
		onAfterSubDamage() {
			this.field.clearWeather();
		},
		secondary: null,
		target: "normal",
		type: "Flying",
	},

	absorb: {
		inherit: true,
		pp: 20,
	},
	acid: {
		inherit: true,
		secondary: {
			chance: 10,
			boosts: {
				def: -1,
			},
		},
	},
	ancientpower: {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1},
	},
	astonish: {
		inherit: true,
		basePowerCallback(pokemon, target) {
			if (target.volatiles['minimize']) return 60;
			return 30;
		},
	},
	beatup: {
		inherit: true,
		onModifyMove(move, pokemon) {
			pokemon.addVolatile('beatup');
			move.type = '???';
			move.category = 'Special';
			move.allies = pokemon.side.pokemon.filter(ally => !ally.fainted && !ally.status);
			move.multihit = move.allies.length;
		},
		condition: {
			duration: 1,
			onModifySpAPriority: -101,
			onModifySpA(atk, pokemon, defender, move) {
				// https://www.smogon.com/forums/posts/8992145/
				// this.add('-activate', pokemon, 'move: Beat Up', '[of] ' + move.allies![0].name);
				this.event.modifier = 1;
				return move.allies!.shift()!.species.baseStats.atk;
			},
			onFoeModifySpDPriority: -101,
			onFoeModifySpD(def, pokemon) {
				this.event.modifier = 1;
				return pokemon.species.baseStats.def;
			},
		},
	},
	bide: {
		inherit: true,
		accuracy: 100,
		priority: 0,
		condition: {
			duration: 3,
			onLockMove: 'bide',
			onStart(pokemon) {
				this.effectState.totalDamage = 0;
				this.add('-start', pokemon, 'move: Bide');
			},
			onDamagePriority: -101,
			onDamage(damage, target, source, move) {
				if (!move || move.effectType !== 'Move' || !source) return;
				this.effectState.totalDamage += damage;
				this.effectState.lastDamageSource = source;
			},
			onBeforeMove(pokemon, target, move) {
				if (this.effectState.duration === 1) {
					this.add('-end', pokemon, 'move: Bide');
					if (!this.effectState.totalDamage) {
						this.add('-fail', pokemon);
						return false;
					}
					target = this.effectState.lastDamageSource;
					if (!target) {
						this.add('-fail', pokemon);
						return false;
					}
					if (!target.isActive) {
						const possibleTarget = this.getRandomTarget(pokemon, this.dex.moves.get('pound'));
						if (!possibleTarget) {
							this.add('-miss', pokemon);
							return false;
						}
						target = possibleTarget;
					}
					const moveData = {
						id: 'bide' as ID,
						name: "Bide",
						accuracy: 100,
						damage: this.effectState.totalDamage * 2,
						category: "Physical",
						priority: 0,
						flags: {contact: 1, protect: 1},
						effectType: 'Move',
						type: 'Normal',
					} as unknown as ActiveMove;
					this.actions.tryMoveHit(target, pokemon, moveData);
					pokemon.removeVolatile('bide');
					return false;
				}
				this.add('-activate', pokemon, 'move: Bide');
			},
			onMoveAborted(pokemon) {
				pokemon.removeVolatile('bide');
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'move: Bide', '[silent]');
			},
		},
	},
	blizzard: {
		inherit: true,
		onModifyMove() { },
	},
	brickbreak: {
		inherit: true,
		onTryHit(target, source) {
			// will shatter screens through sub, before you hit
			const foe = source.side.foe;
			foe.removeSideCondition('reflect');
			foe.removeSideCondition('lightscreen');
		},
	},
	charge: {
		inherit: true,
		boosts: null,
	},
	conversion: {
		inherit: true,
		onHit(target) {
			const possibleTypes = target.moveSlots.map(moveSlot => {
				const move = this.dex.moves.get(moveSlot.id);
				if (move.id !== 'curse' && !target.hasType(move.type)) {
					return move.type;
				}
				return '';
			}).filter(type => type);
			if (!possibleTypes.length) {
				return false;
			}
			const type = this.sample(possibleTypes);

			if (!target.setType(type)) return false;
			this.add('-start', target, 'typechange', type);
		},
	},
	counter: {
		inherit: true,
		condition: {
			duration: 1,
			noCopy: true,
			onStart(target, source, move) {
				this.effectState.slot = null;
				this.effectState.damage = 0;
			},
			onRedirectTargetPriority: -1,
			onRedirectTarget(target, source, source2) {
				if (source !== this.effectState.target || !this.effectState.slot) return;
				return this.getAtSlot(this.effectState.slot);
			},
			onDamagePriority: -101,
			onDamage(damage, target, source, effect) {
				if (
					effect.effectType === 'Move' && !source.isAlly(target) &&
					(effect.category === 'Physical' || effect.id === 'hiddenpower')
				) {
					this.effectState.slot = source.getSlot();
					this.effectState.damage = 2 * damage;
				}
			},
		},
	},
	covet: {
		inherit: true,
		flags: {protect: 1, mirror: 1, noassist: 1},
	},
	crunch: {
		inherit: true,
		secondary: {
			chance: 20,
			boosts: {
				spd: -1,
			},
		},
	},
	dig: {
		inherit: true,
		basePower: 60,
	},
	disable: {
		inherit: true,
		accuracy: 55,
		flags: {protect: 1, mirror: 1, bypasssub: 1},
		volatileStatus: 'disable',
		condition: {
			durationCallback() {
				return this.random(2, 6);
			},
			noCopy: true,
			onStart(pokemon) {
				if (!this.queue.willMove(pokemon)) {
					this.effectState.duration++;
				}
				if (!pokemon.lastMove) {
					return false;
				}
				for (const moveSlot of pokemon.moveSlots) {
					if (moveSlot.id === pokemon.lastMove.id) {
						if (!moveSlot.pp) {
							return false;
						} else {
							this.add('-start', pokemon, 'Disable', moveSlot.move);
							this.effectState.move = pokemon.lastMove.id;
							return;
						}
					}
				}
				return false;
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'move: Disable');
			},
			onBeforeMove(attacker, defender, move) {
				if (move.id === this.effectState.move) {
					this.add('cant', attacker, 'Disable', move);
					return false;
				}
			},
			onDisableMove(pokemon) {
				for (const moveSlot of pokemon.moveSlots) {
					if (moveSlot.id === this.effectState.move) {
						pokemon.disableMove(moveSlot.id);
					}
				}
			},
		},
	},
	dive: {
		inherit: true,
		basePower: 60,
	},
	doomdesire: {
		inherit: true,
		onTry(source, target) {
			if (!target.side.addSlotCondition(target, 'futuremove')) return false;
			const moveData = {
				name: "Doom Desire",
				basePower: 120,
				category: "Physical",
				flags: {},
				willCrit: false,
				type: '???',
			} as unknown as ActiveMove;
			const damage = this.actions.getDamage(source, target, moveData, true);
			Object.assign(target.side.slotConditions[target.position]['futuremove'], {
				duration: 3,
				move: 'doomdesire',
				source: source,
				moveData: {
					id: 'doomdesire',
					name: "Doom Desire",
					accuracy: 85,
					basePower: 0,
					damage: damage,
					category: "Physical",
					flags: {futuremove: 1},
					effectType: 'Move',
					type: '???',
				},
			});
			this.add('-start', source, 'Doom Desire');
			return null;
		},
	},
	encore: {
		inherit: true,
		volatileStatus: 'encore',
		condition: {
			durationCallback() {
				return this.random(3, 7);
			},
			onStart(target, source) {
				const moveIndex = target.lastMove ? target.moves.indexOf(target.lastMove.id) : -1;
				if (
					!target.lastMove || target.lastMove.flags['failencore'] ||
					!target.moveSlots[moveIndex] || target.moveSlots[moveIndex].pp <= 0
				) {
					// it failed
					return false;
				}
				this.effectState.move = target.lastMove.id;
				this.add('-start', target, 'Encore');
			},
			onOverrideAction(pokemon) {
				return this.effectState.move;
			},
			onResidualOrder: 10,
			onResidualSubOrder: 14,
			onResidual(target) {
				if (
					target.moves.includes(this.effectState.move) &&
					target.moveSlots[target.moves.indexOf(this.effectState.move)].pp <= 0
				) {
					// early termination if you run out of PP
					target.removeVolatile('encore');
				}
			},
			onEnd(target) {
				this.add('-end', target, 'Encore');
			},
			onDisableMove(pokemon) {
				if (!this.effectState.move || !pokemon.hasMove(this.effectState.move)) {
					return;
				}
				for (const moveSlot of pokemon.moveSlots) {
					if (moveSlot.id !== this.effectState.move) {
						pokemon.disableMove(moveSlot.id);
					}
				}
			},
		},
	},
	extrasensory: {
		inherit: true,
		basePowerCallback(pokemon, target) {
			if (target.volatiles['minimize']) return 160;
			return 80;
		},
	},
	fakeout: {
		inherit: true,
		flags: {protect: 1, mirror: 1},
	},
	feintattack: {
		inherit: true,
		flags: {protect: 1, mirror: 1},
	},
	flash: {
		inherit: true,
		accuracy: 70,
	},
	fly: {
		inherit: true,
		basePower: 70,
	},
	followme: {
		inherit: true,
		volatileStatus: undefined,
		slotCondition: 'followme',
		condition: {
			duration: 1,
			onStart(target, source, effect) {
				this.add('-singleturn', target, 'move: Follow Me');
				this.effectState.slot = target.getSlot();
			},
			onFoeRedirectTargetPriority: 1,
			onFoeRedirectTarget(target, source, source2, move) {
				const userSlot = this.getAtSlot(this.effectState.slot);
				if (this.validTarget(userSlot, source, move.target)) {
					return userSlot;
				}
			},
		},
	},
	foresight: {
		inherit: true,
		accuracy: 100,
	},
	furycutter: {
		inherit: true,
		onHit(target, source) {
			source.addVolatile('furycutter');
		},
	},
	gigadrain: {
		inherit: true,
		pp: 5,
	},
	glare: {
		inherit: true,
		ignoreImmunity: false,
	},
	highjumpkick: {
		inherit: true,
		basePower: 85,
		onMoveFail(target, source, move) {
			if (target.runImmunity('Fighting')) {
				const damage = this.actions.getDamage(source, target, move, true);
				if (typeof damage !== 'number') throw new Error("HJK recoil failed");
				this.damage(this.clampIntRange(damage / 2, 1, Math.floor(target.maxhp / 2)), source, source, move);
			}
		},
	},
	hypnosis: {
		inherit: true,
		accuracy: 60,
	},
	jumpkick: {
		inherit: true,
		basePower: 70,
		onMoveFail(target, source, move) {
			if (target.runImmunity('Fighting')) {
				const damage = this.actions.getDamage(source, target, move, true);
				if (typeof damage !== 'number') throw new Error("Jump Kick didn't recoil");
				this.damage(this.clampIntRange(damage / 2, 1, Math.floor(target.maxhp / 2)), source, source, move);
			}
		},
	},
	leafblade: {
		inherit: true,
		basePower: 70,
	},
	lockon: {
		inherit: true,
		accuracy: 100,
	},
	megadrain: {
		inherit: true,
		pp: 10,
	},
	memento: {
		inherit: true,
		accuracy: true,
	},
	mindreader: {
		inherit: true,
		accuracy: 100,
	},
	mimic: {
		inherit: true,
		flags: {protect: 1, bypasssub: 1, allyanim: 1, failencore: 1, noassist: 1, failmimic: 1},
	},
	mirrorcoat: {
		inherit: true,
		condition: {
			duration: 1,
			noCopy: true,
			onStart(target, source, move) {
				this.effectState.slot = null;
				this.effectState.damage = 0;
			},
			onRedirectTargetPriority: -1,
			onRedirectTarget(target, source, source2) {
				if (source !== this.effectState.target || !this.effectState.slot) return;
				return this.getAtSlot(this.effectState.slot);
			},
			onDamagePriority: -101,
			onDamage(damage, target, source, effect) {
				if (
					effect.effectType === 'Move' && !source.isAlly(target) &&
					effect.category === 'Special' && effect.id !== 'hiddenpower'
				) {
					this.effectState.slot = source.getSlot();
					this.effectState.damage = 2 * damage;
				}
			},
		},
	},
	mirrormove: {
		inherit: true,
		onTryHit() { },
		onHit(pokemon) {
			const noMirror = [
				'assist', 'curse', 'doomdesire', 'focuspunch', 'futuresight', 'magiccoat', 'metronome', 'mimic', 'mirrormove', 'naturepower', 'psychup', 'roleplay', 'sketch', 'sleeptalk', 'spikes', 'spitup', 'taunt', 'teeterdance', 'transform',
			];
			const lastAttackedBy = pokemon.getLastAttackedBy();
			if (!lastAttackedBy?.source.lastMove || !lastAttackedBy.move) {
				return false;
			}
			if (noMirror.includes(lastAttackedBy.move) || !lastAttackedBy.source.hasMove(lastAttackedBy.move)) {
				return false;
			}
			this.actions.useMove(lastAttackedBy.move, pokemon);
		},
		target: "self",
	},
	naturepower: {
		inherit: true,
		accuracy: 95,
		onHit(target) {
			this.actions.useMove('swift', target);
		},
	},
	needlearm: {
		inherit: true,
		basePowerCallback(pokemon, target) {
			if (target.volatiles['minimize']) return 120;
			return 60;
		},
	},
	nightmare: {
		inherit: true,
		accuracy: true,
	},
	odorsleuth: {
		inherit: true,
		accuracy: 100,
	},
	outrage: {
		inherit: true,
		basePower: 90,
	},
	overheat: {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1},
	},
	petaldance: {
		inherit: true,
		basePower: 70,
	},
	recover: {
		inherit: true,
		pp: 20,
	},
	rocksmash: {
		inherit: true,
		basePower: 20,
	},
	sketch: {
		inherit: true,
		flags: {bypasssub: 1, failencore: 1, noassist: 1, failmimic: 1},
	},
	sleeptalk: {
		inherit: true,
		onHit(pokemon) {
			const moves = [];
			for (const moveSlot of pokemon.moveSlots) {
				const moveid = moveSlot.id;
				const pp = moveSlot.pp;
				const move = this.dex.moves.get(moveid);
				if (moveid && !move.flags['nosleeptalk'] && !move.flags['charge']) {
					moves.push({move: moveid, pp: pp});
				}
			}
			if (!moves.length) {
				return false;
			}
			const randomMove = this.sample(moves);
			if (!randomMove.pp) {
				this.add('cant', pokemon, 'nopp', randomMove.move);
				return;
			}
			this.actions.useMove(randomMove.move, pokemon);
		},
	},
	spite: {
		inherit: true,
		onHit(target) {
			const roll = this.random(2, 6);
			if (target.lastMove && target.deductPP(target.lastMove.id, roll)) {
				this.add("-activate", target, 'move: Spite', target.lastMove.id, roll);
				return;
			}
			return false;
		},
	},
	stockpile: {
		inherit: true,
		pp: 10,
		condition: {
			noCopy: true,
			onStart(target) {
				this.effectState.layers = 1;
				this.add('-start', target, 'stockpile' + this.effectState.layers);
			},
			onRestart(target) {
				if (this.effectState.layers >= 3) return false;
				this.effectState.layers++;
				this.add('-start', target, 'stockpile' + this.effectState.layers);
			},
			onEnd(target) {
				this.effectState.layers = 0;
				this.add('-end', target, 'Stockpile');
			},
		},
	},
	struggle: {
		inherit: true,
		flags: {contact: 1, protect: 1, noassist: 1, failencore: 1, failmimic: 1},
		accuracy: 100,
		recoil: [1, 4],
		struggleRecoil: false,
	},
	surf: {
		inherit: true,
		target: "allAdjacentFoes",
	},
	taunt: {
		inherit: true,
		flags: {protect: 1, bypasssub: 1},
		condition: {
			duration: 2,
			onStart(target) {
				this.add('-start', target, 'move: Taunt');
			},
			onResidualOrder: 10,
			onResidualSubOrder: 15,
			onEnd(target) {
				this.add('-end', target, 'move: Taunt', '[silent]');
			},
			onDisableMove(pokemon) {
				for (const moveSlot of pokemon.moveSlots) {
					if (this.dex.moves.get(moveSlot.move).category === 'Status') {
						pokemon.disableMove(moveSlot.id);
					}
				}
			},
			onBeforeMove(attacker, defender, move) {
				if (move.category === 'Status') {
					this.add('cant', attacker, 'move: Taunt', move);
					return false;
				}
			},
		},
	},
	teeterdance: {
		inherit: true,
		flags: {protect: 1},
	},
	tickle: {
		inherit: true,
		flags: {protect: 1, reflectable: 1, mirror: 1, bypasssub: 1},
	},
	uproar: {
		inherit: true,
		condition: {
			onStart(target) {
				this.add('-start', target, 'Uproar');
				// 2-5 turns
				this.effectState.duration = this.random(2, 6);
			},
			onResidual(target) {
				if (target.volatiles['throatchop']) {
					target.removeVolatile('uproar');
					return;
				}
				if (target.lastMove && target.lastMove.id === 'struggle') {
					// don't lock
					delete target.volatiles['uproar'];
				}
				this.add('-start', target, 'Uproar', '[upkeep]');
			},
			onResidualOrder: 10,
			onResidualSubOrder: 11,
			onEnd(target) {
				this.add('-end', target, 'Uproar');
			},
			onLockMove: 'uproar',
			onAnySetStatus(status, pokemon) {
				if (status.id === 'slp') {
					if (pokemon === this.effectState.target) {
						this.add('-fail', pokemon, 'slp', '[from] Uproar', '[msg]');
					} else {
						this.add('-fail', pokemon, 'slp', '[from] Uproar');
					}
					return null;
				}
			},
		},
	},
	vinewhip: {
		inherit: true,
		pp: 10,
	},
	volttackle: {
		inherit: true,
		secondary: null,
	},
	waterfall: {
		inherit: true,
		secondary: null,
	},
	weatherball: {
		inherit: true,
		onModifyMove(move) {
			switch (this.field.effectiveWeather()) {
			case 'sunnyday':
				move.type = 'Fire';
				move.category = 'Special';
				break;
			case 'raindance':
				move.type = 'Water';
				move.category = 'Special';
				break;
			case 'sandstorm':
				move.type = 'Rock';
				break;
			case 'hail':
				move.type = 'Ice';
				move.category = 'Special';
				break;
			}
			if (this.field.effectiveWeather()) move.basePower *= 2;
		},
	},
	zapcannon: {
		inherit: true,
		basePower: 100,
	},
	acupressure: {
		inherit: true,
		isNonstandard: "Past",
	},
	airslash: {
		inherit: true,
		isNonstandard: "Past",
	},
	aquajet: {
		inherit: true,
		isNonstandard: "Past",
	},
	aquaring: {
		inherit: true,
		isNonstandard: "Past",
	},
	aquatail: {
		inherit: true,
		isNonstandard: "Past",
	},
	assurance: {
		inherit: true,
		isNonstandard: "Past",
	},
	attackorder: {
		inherit: true,
		isNonstandard: "Past",
	},
	aurasphere: {
		inherit: true,
		isNonstandard: "Past",
	},
	avalanche: {
		inherit: true,
		isNonstandard: "Past",
	},
	bravebird: {
		inherit: true,
		isNonstandard: "Past",
	},
	brine: {
		inherit: true,
		isNonstandard: "Past",
	},
	bugbite: {
		inherit: true,
		isNonstandard: "Past",
	},
	bugbuzz: {
		inherit: true,
		isNonstandard: "Past",
	},
	bulletpunch: {
		inherit: true,
		isNonstandard: "Past",
	},
	captivate: {
		inherit: true,
		isNonstandard: "Past",
	},
	chargebeam: {
		inherit: true,
		isNonstandard: "Past",
	},
	chatter: {
		inherit: true,
		isNonstandard: "Past",
	},
	closecombat: {
		inherit: true,
		isNonstandard: "Past",
	},
	copycat: {
		inherit: true,
		isNonstandard: "Past",
	},
	crosspoison: {
		inherit: true,
		isNonstandard: "Past",
	},
	crushgrip: {
		inherit: true,
		isNonstandard: "Past",
	},
	darkpulse: {
		inherit: true,
		isNonstandard: "Past",
	},
	darkvoid: {
		inherit: true,
		isNonstandard: "Past",
	},
	defendorder: {
		inherit: true,
		isNonstandard: "Past",
	},
	discharge: {
		inherit: true,
		isNonstandard: "Past",
	},
	doublehit: {
		inherit: true,
		isNonstandard: "Past",
	},
	dracometeor: {
		inherit: true,
		isNonstandard: "Past",
	},
	dragonpulse: {
		inherit: true,
		isNonstandard: "Past",
	},
	dragonrush: {
		inherit: true,
		isNonstandard: "Past",
	},
	drainpunch: {
		inherit: true,
		isNonstandard: "Past",
	},
	earthpower: {
		inherit: true,
		isNonstandard: "Past",
	},
	embargo: {
		inherit: true,
		isNonstandard: "Past",
	},
	energyball: {
		inherit: true,
		isNonstandard: "Past",
	},
	feint: {
		inherit: true,
		isNonstandard: "Past",
	},
	firefang: {
		inherit: true,
		isNonstandard: "Past",
	},
	flareblitz: {
		inherit: true,
		isNonstandard: "Past",
	},
	flashcannon: {
		inherit: true,
		isNonstandard: "Past",
	},
	fling: {
		inherit: true,
		isNonstandard: "Past",
	},
	focusblast: {
		inherit: true,
		isNonstandard: "Past",
	},
	forcepalm: {
		inherit: true,
		isNonstandard: "Past",
	},
	gastroacid: {
		inherit: true,
		isNonstandard: "Past",
	},
	gigaimpact: {
		inherit: true,
		isNonstandard: "Past",
	},
	grassknot: {
		inherit: true,
		isNonstandard: "Past",
	},
	gravity: {
		inherit: true,
		isNonstandard: "Past",
	},
	guardswap: {
		inherit: true,
		isNonstandard: "Past",
	},
	gunkshot: {
		inherit: true,
		isNonstandard: "Past",
	},
	gyroball: {
		inherit: true,
		isNonstandard: "Past",
	},
	hammerarm: {
		inherit: true,
		isNonstandard: "Past",
	},
	headsmash: {
		inherit: true,
		isNonstandard: "Past",
	},
	healblock: {
		inherit: true,
		isNonstandard: "Past",
	},
	healorder: {
		inherit: true,
		isNonstandard: "Past",
	},
	healingwish: {
		inherit: true,
		isNonstandard: "Past",
	},
	heartswap: {
		inherit: true,
		isNonstandard: "Past",
	},
	icefang: {
		inherit: true,
		isNonstandard: "Past",
	},
	iceshard: {
		inherit: true,
		isNonstandard: "Past",
	},
	ironhead: {
		inherit: true,
		isNonstandard: "Past",
	},
	judgment: {
		inherit: true,
		isNonstandard: "Past",
	},
	lastresort: {
		inherit: true,
		isNonstandard: "Past",
	},
	lavaplume: {
		inherit: true,
		isNonstandard: "Past",
	},
	leafstorm: {
		inherit: true,
		isNonstandard: "Past",
	},
	luckychant: {
		inherit: true,
		isNonstandard: "Past",
	},
	lunardance: {
		inherit: true,
		isNonstandard: "Past",
	},
	magmastorm: {
		inherit: true,
		isNonstandard: "Past",
	},
	magnetbomb: {
		inherit: true,
		isNonstandard: "Past",
	},
	magnetrise: {
		inherit: true,
		isNonstandard: "Past",
	},
	mefirst: {
		inherit: true,
		isNonstandard: "Past",
	},
	metalburst: {
		inherit: true,
		isNonstandard: "Past",
	},
	miracleeye: {
		inherit: true,
		isNonstandard: "Past",
	},
	mirrorshot: {
		inherit: true,
		isNonstandard: "Past",
	},
	nastyplot: {
		inherit: true,
		isNonstandard: "Past",
	},
	naturalgift: {
		inherit: true,
		isNonstandard: "Past",
	},
	nightslash: {
		inherit: true,
		isNonstandard: "Past",
	},
	ominouswind: {
		inherit: true,
		isNonstandard: "Past",
	},
	payback: {
		inherit: true,
		isNonstandard: "Past",
	},
	pluck: {
		inherit: true,
		isNonstandard: "Past",
	},
	poisonjab: {
		inherit: true,
		isNonstandard: "Past",
	},
	powergem: {
		inherit: true,
		isNonstandard: "Past",
	},
	powerswap: {
		inherit: true,
		isNonstandard: "Past",
	},
	powertrick: {
		inherit: true,
		isNonstandard: "Past",
	},
	powerwhip: {
		inherit: true,
		isNonstandard: "Past",
	},
	psychocut: {
		inherit: true,
		isNonstandard: "Past",
	},
	psychoshift: {
		inherit: true,
		isNonstandard: "Past",
	},
	punishment: {
		inherit: true,
		isNonstandard: "Past",
	},
	roaroftime: {
		inherit: true,
		isNonstandard: "Past",
	},
	rockclimb: {
		inherit: true,
		isNonstandard: "Past",
	},
	rockpolish: {
		inherit: true,
		isNonstandard: "Past",
	},
	rockwrecker: {
		inherit: true,
		isNonstandard: "Past",
	},
	roost: {
		inherit: true,
		isNonstandard: "Past",
	},
	seedbomb: {
		inherit: true,
		isNonstandard: "Past",
	},
	seedflare: {
		inherit: true,
		isNonstandard: "Past",
	},
	shadowclaw: {
		inherit: true,
		isNonstandard: "Past",
	},
	shadowforce: {
		inherit: true,
		isNonstandard: "Past",
	},
	shadowsneak: {
		inherit: true,
		isNonstandard: "Past",
	},
	spacialrend: {
		inherit: true,
		isNonstandard: "Past",
	},
	stealthrock: {
		inherit: true,
		isNonstandard: "Past",
	},
	stoneedge: {
		inherit: true,
		isNonstandard: "Past",
	},
	suckerpunch: {
		inherit: true,
		isNonstandard: "Past",
	},
	switcheroo: {
		inherit: true,
		isNonstandard: "Past",
	},
	tailwind: {
		inherit: true,
		isNonstandard: "Past",
	},
	thunderfang: {
		inherit: true,
		isNonstandard: "Past",
	},
	toxicspikes: {
		inherit: true,
		isNonstandard: "Past",
	},
	trickroom: {
		inherit: true,
		isNonstandard: "Past",
	},
	trumpcard: {
		inherit: true,
		isNonstandard: "Past",
	},
	uturn: {
		inherit: true,
		isNonstandard: "Past",
	},
	vacuumwave: {
		inherit: true,
		isNonstandard: "Past",
	},
	wakeupslap: {
		inherit: true,
		isNonstandard: "Past",
	},
	woodhammer: {
		inherit: true,
		isNonstandard: "Past",
	},
	worryseed: {
		inherit: true,
		isNonstandard: "Past",
	},
	wringout: {
		inherit: true,
		isNonstandard: "Past",
	},
	xscissor: {
		inherit: true,
		isNonstandard: "Past",
	},
	zenheadbutt: {
		inherit: true,
		isNonstandard: "Past",
	},
};
