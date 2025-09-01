/**
 * Gen 3 moves
 */

export const Moves: import('../../../sim/dex-moves').ModdedMoveDataTable = {
	absorb: {
		inherit: true,
		flags: {protect: 1, mirror: 1, heal: 1, metronome: 1},
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
		accuracy: 90,
		basePower: 110,
		self: {
			boosts: {
				def: -1,
				spd: -1,
			},
		},
		secondary: null,
		desc: "Lowers the user's Defense and Special Defense by 1 stage.",
		shortDesc: "Lowers the user's Defense and Sp. Def by 1.",
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
	},
	assist: {
		inherit: true,
		flags: {metronome: 1, noassist: 1, nosleeptalk: 1},
	},
	astonish: {
		inherit: true,
		basePowerCallback(pokemon, target) {
			if (target.volatiles['minimize']) return 60;
			return 30;
		},
	},
	aurorabeam: {
		inherit: true,
		desc: "If used in hail, prevents the target from healing for 3 turns if used in Hail. During the effect, healing and draining moves are unusable, and Abilities and items that grant healing will not heal the user.",
		shortDesc: "Applies Heal Block for 3 turns in hail.",
		basePower: 75,
		pp: 10,
		onModifyMove(move, pokemon, target) {
			if (target?.effectiveWeather() == 'hail') {
				move.secondaries = [];
				move.secondaries.push({
					chance: 100,
					volatileStatus: 'aurorabeam',
				});
			}
		},
		secondary: {}, //sheer force boosted
	},
	beatup: {
		inherit: true,
		desc: "Deals typeless damage. Hits one time for each unfainted Pokemon without a non-volatile status condition in the user's party, or fails if no Pokemon meet the criteria. For each hit, the damage formula uses the participating Pokemon's base Attack as the Attack stat, the target's base Defense as the Defense stat, and ignores stat stages and other effects that modify Attack or Defense; each hit is considered to come from the user.",
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
				return this.dex.species.get(move.allies!.shift()!.set.species).baseStats.atk;
			},
			onFoeModifySpDPriority: -101,
			onFoeModifySpD(def, pokemon) {
				this.event.modifier = 1;
				return this.dex.species.get(pokemon.set.species).baseStats.def;
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
	bind: {
		inherit: true,
		accuracy: 85,
		desc: "Prevents the target from switching for four or five turns (seven turns if the user is holding Grip Claw). Causes damage to the target equal to 1/8 of its maximum HP (1/6 if the user is holding Binding Band), rounded down, at the end of each turn during effect. The target can still switch out if it is holding Shed Shell or uses Baton Pass, Flip Turn, Parting Shot, Shed Tail, Teleport, U-turn, or Volt Switch. The effect ends if either the user or the target leaves the field, or if the target uses Mortal Spin, Rapid Spin, or Substitute successfully. This effect is not stackable or reset by using this or another binding move.",
		shortDesc: "Traps and damages the target for 4-5 turns.",
	},
	blastburn: {
		inherit: true,
		basePower: 140,
		accuracy: 100,
		viable: true,
		desc: "If this move is successful, the user must recharge on the following turn and cannot select a move, unless the target was knocked out by this move.",
		shortDesc: "Can't move next turn if target is not KOed.",
	},
	blizzard: {
		inherit: true,
		desc: "Has a 10% chance to freeze the target. If the weather is Snow, this move does not check accuracy.",
		shortDesc: "10% chance to freeze foe(s). Can't miss in Snow.",
		onModifyMove(move) {
			if (this.field.isWeather(['hail', 'snow'])) move.accuracy = true;
		},
	},
	brickbreak: {
		inherit: true,
		desc: "If this attack does not miss and whether or not the target is immune, the effects of Reflect and Light Screen end for the opponent's side of the field before damage is calculated.",
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
	clamp: {
		inherit: true,
		accuracy: 85,
		pp: 15,
		desc: "Prevents the target from switching for four or five turns (seven turns if the user is holding Grip Claw). Causes damage to the target equal to 1/8 of its maximum HP (1/6 if the user is holding Binding Band), rounded down, at the end of each turn during effect. The target can still switch out if it is holding Shed Shell or uses Baton Pass, Flip Turn, Parting Shot, Shed Tail, Teleport, U-turn, or Volt Switch. The effect ends if either the user or the target leaves the field, or if the target uses Mortal Spin, Rapid Spin, or Substitute successfully. This effect is not stackable or reset by using this or another binding move.",
		shortDesc: "Traps and damages the target for 4-5 turns.",
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
		desc: "Deals damage to the last opposing Pokemon to hit the user with a physical attack this turn equal to twice the HP lost by the user from that attack. If that opposing Pokemon's position is no longer in use and there is another opposing Pokemon on the field, the damage is done to it instead. This move considers Hidden Power as Normal type, and only the last hit of a multi-hit attack is counted. Fails if the user was not hit by an opposing Pokemon's physical attack this turn, or if the user did not lose HP from the attack.",
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
		desc: "Has a 20% chance to lower the target's Special Defense by 1 stage.",
		shortDesc: "20% chance to lower the target's Sp. Def by 1.",
		inherit: true,
		secondary: {
			chance: 20,
			boosts: {
				spd: -1,
			},
		},
	},
	dreameater: {
		inherit: true,
		flags: {protect: 1, mirror: 1, heal: 1, metronome: 1},
	},
	dig: {
		inherit: true,
		basePower: 60,
	},
	disable: {
		inherit: true,
		desc: "For 2 to 5 turns, the target's last move used becomes disabled. Fails if one of the target's moves is already disabled, if the target has not made a move, if the target no longer knows the move, or if the move has 0 PP.",
		shortDesc: "For 2-5 turns, disables the target's last move.",
		accuracy: 55,
		flags: {protect: 1, mirror: 1, bypasssub: 1, metronome: 1},
		volatileStatus: 'disable',
		condition: {
			durationCallback() {
				return this.random(2, 6);
			},
			noCopy: true,
			onStart(pokemon) {
				if (!this.queue.willMove(pokemon)) {
					this.effectState.duration!++;
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
		num: 353,
		accuracy: 100,
		basePower: 120,
		category: "Special",
		name: "Doom Desire",
		pp: 5,
		priority: 0,
		flags: {metronome: 1, futuremove: 1},
		onTry(source, target) {
			if (!target.side.addSlotCondition(target, 'futuremove')) return false;
			Object.assign(target.side.slotConditions[target.position]['futuremove'], {
				move: 'doomdesire',
				source: source,
				moveData: {
					id: 'doomdesire',
					name: "Doom Desire",
					accuracy: 100,
					basePower: 140,
					category: "Special",
					priority: 0,
					flags: {metronome: 1, futuremove: 1},
					effectType: 'Move',
					type: 'Steel',
				},
			});
			this.add('-start', source, 'Doom Desire');
			return this.NOT_FAIL;
		},
		secondary: null,
		target: "normal",
		type: "Steel",
		contestType: "Beautiful",
	},
	doomsdayclock: {
		num: 1110,
		desc: "Deals damage two turns after this move is used. At the end of that turn, the damage is calculated at that time and dealt to the Pokemon at the position the target had when the move was used. If the user is no longer active at the time, damage is calculated based on the user's natural Special Attack stat, types, and level, with no boosts from its held item or Ability. Fails if this move or Doom Desire is already in effect for the target's position.",
		shortDesc: "Hits two turns after being used.",
		accuracy: 100,
		basePower: 110,
		category: "Special",
		name: "Doomsday Clock",
		pp: 10,
		priority: 0,
		viable: true,
		flags: {metronome: 1, futuremove: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onTry(source, target) {
			this.add('-anim', source, 'Future Sight', target);
			if (!target.side.addSlotCondition(target, 'futuremove')) return false;
			Object.assign(target.side.slotConditions[target.position]['futuremove'], {
				duration: 3,
				move: 'doomsdayclock',
				source: source,
				moveData: {
					id: 'doomsdayclock',
					name: "Doomsday Clock",
					accuracy: 100,
					basePower: 110,
					category: "Special",
					priority: 0,
					flags: {metronome: 1, futuremove: 1},
					ignoreImmunity: false,
					onPrepareHit(target, source) {
						this.add('-anim', target, 'Judgment', target);
					},
					effectType: 'Move',
					type: 'Dark',
				},
			});
			this.add('-start', source, 'move: Doomsday Clock');
			return this.NOT_FAIL;
		},
		secondary: null,
		target: "normal",
		type: "Dark",
		contestType: "Clever",
		gen: 3,
	},
	dragondarts: {
		inherit: true,
		gen: 3,
	},
	dragontail: {
		inherit: true,
		gen: 3,
	},
	encore: {
		inherit: true,
		desc: "For 3 to 6 turns, the target is forced to repeat its last move used. If the affected move runs out of PP, the effect ends. Fails if the target is already under this effect, if it has not made a move, if the move has 0 PP, or if the move is Encore, Mimic, Mirror Move, Sketch, Struggle, or Transform.",
		shortDesc: "The target repeats its last move for 3-6 turns.",
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
	energyball: {
		inherit: true,
		basePower: 90,
		gen: 3,
	},
	extrasensory: {
		inherit: true,
		basePowerCallback(pokemon, target) {
			if (target.volatiles['minimize']) return 160;
			return 80;
		},
	},
	explosion: {
		inherit: true,
		shortDesc: "Target's Def halved during damage. User faints.",
		desc: "The user faints after using this move. The target's Defense is halved during damage calculation. This move is prevented from executing if any active Pokemon has the Damp Ability.",
	},
	fakeout: {
		inherit: true,
		flags: {protect: 1, mirror: 1, metronome: 1},
	},
	feintattack: {
		inherit: true,
		flags: {protect: 1, mirror: 1, metronome: 1},
	},
	firespin: {
		inherit: true,
		accuracy: 85,
		basePower: 35,
		desc: "Prevents the target from switching for four or five turns (seven turns if the user is holding Grip Claw). Causes damage to the target equal to 1/8 of its maximum HP (1/6 if the user is holding Binding Band), rounded down, at the end of each turn during effect. The target can still switch out if it is holding Shed Shell or uses Baton Pass, Flip Turn, Parting Shot, Shed Tail, Teleport, U-turn, or Volt Switch. The effect ends if either the user or the target leaves the field, or if the target uses Mortal Spin, Rapid Spin, or Substitute successfully. This effect is not stackable or reset by using this or another binding move.",
		shortDesc: "Traps and damages the target for 4-5 turns.",
	},
	fishanddip: {
		num: 1111,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Fish and Dip",
		shortDesc: "User switches out. Adds 1 Fishing Token.",
		pp: 10,
		priority: 0,
		flags: {metronome: 1},
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
		gen: 3,
	},
	flail: {
		inherit: true,
		desc: "The power of this move is 20 if X is 33 to 48, 40 if X is 17 to 32, 80 if X is 10 to 16, 100 if X is 5 to 9, 150 if X is 2 to 4, and 200 if X is 0 or 1, where X is equal to (user's current HP * 48 / user's maximum HP), rounded down.",
		basePowerCallback(pokemon) {
			const ratio = Math.max(Math.floor(pokemon.hp * 48 / pokemon.maxhp), 1);
			let bp;
			if (ratio < 2) {
				bp = 200;
			} else if (ratio < 5) {
				bp = 150;
			} else if (ratio < 10) {
				bp = 100;
			} else if (ratio < 17) {
				bp = 80;
			} else if (ratio < 33) {
				bp = 40;
			} else {
				bp = 20;
			}
			this.debug(`BP: ${bp}`);
			return bp;
		},
	},
	flash: {
		inherit: true,
		accuracy: 70,
	},
	flowertrick: {
		inherit: true,
		gen: 3,
		basePower: 60,
		pp: 15,
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
	frenzyplant: {
		inherit: true,
		basePower: 140,
		accuracy: 100,
		viable: true,
		desc: "If this move is successful, the user must recharge on the following turn and cannot select a move, unless the target was knocked out by this move.",
		shortDesc: "Can't move next turn if target is not KOed.",
	},
	furycutter: {
		inherit: true,
		onHit(target, source) {
			source.addVolatile('furycutter');
		},
	},
	futuresight: {
		num: 248,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Future Sight",
		pp: 10,
		priority: 0,
		flags: {allyanim: 1, metronome: 1, futuremove: 1},
		ignoreImmunity: true,
		onTry(source, target) {
			if (!target.side.addSlotCondition(target, 'futuremove')) return false;
			Object.assign(target.side.slotConditions[target.position]['futuremove'], {
				duration: 3,
				move: 'futuresight',
				source: source,
				moveData: {
					id: 'futuresight',
					name: "Future Sight",
					accuracy: 100,
					basePower: 120,
					category: "Special",
					priority: 0,
					flags: {allyanim: 1, metronome: 1, futuremove: 1},
					ignoreImmunity: false,
					effectType: 'Move',
					type: 'Psychic',
				},
			});
			this.add('-start', source, 'move: Future Sight');
			return this.NOT_FAIL;
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
		contestType: "Clever",
	},
	gigadrain: {
		inherit: true,
		flags: {protect: 1, mirror: 1, heal: 1, metronome: 1},
		pp: 5,
	},
	glare: {
		inherit: true,
		ignoreImmunity: false,
	},
	grasspledge: {
		inherit: true,
		desc: "After a successful hit, has different effects based on the weather. Lowers foe's Speed in rain and damages foe by an extra 1/8 of its max HP in sun.",
		shortDesc: "Lowers foe's Speed in rain, deals extra 12.5% in sun.",
		basePower: 80,
		viable: true,
		onHit(target, source, move) {
			switch (target?.effectiveWeather()) {
			case 'raindance':
			case 'primordialsea':
				this.add('-message', `${target.name} was bogged down by wet grass!`);
				!!this.boost({spe: -1}, target, source, move);
				break;
			case 'sunnyday':
			case 'desolateland':
				this.add('-message', `${target.name} was hurt by burning grass!`);
				this.damage(target.baseMaxhp / 8, target, source);
				break;
			}
		},
		basePowerCallback(target, source, move) {
			return move.basePower;
		},
		onPrepareHit(target, source, move) {},
		onModifyMove(move) {},
		condition: {},
		secondary: null,
		gen: 3,
	},
	haze: {
		inherit: true,
		onHitField() {
			this.add('-clearallboost');
			for (const pokemon of this.getAllActive()) {
				pokemon.clearBoosts();
			}
		},
	},
	hiddenpower: {
		inherit: true,
		category: "Physical",
		onModifyMove(move, pokemon) {
			move.type = pokemon.hpType || 'Dark';
			const specialTypes = ['Fire', 'Water', 'Grass', 'Ice', 'Electric', 'Dark', 'Psychic', 'Dragon'];
			move.category = specialTypes.includes(move.type) ? 'Special' : 'Physical';
		},
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
	hydrocannon: {
		inherit: true,
		basePower: 140,
		accuracy: 100,
		viable: true,
		desc: "If this move is successful, the user must recharge on the following turn and cannot select a move, unless the target was knocked out by this move.",
		shortDesc: "Can't move next turn if target is not KOed.",
	},
	hyperbeam: {
		inherit: true,
		basePower: 140,
		accuracy: 100,
		viable: true,
		desc: "If this move is successful, the user must recharge on the following turn and cannot select a move, unless the target was knocked out by this move.",
		shortDesc: "Can't move next turn if target is not KOed.",
	},
	hypnosis: {
		inherit: true,
		accuracy: 60,
	},
	icebeam: {
		inherit: true,
		desc: "Has a 10% chance to freeze the target if used more than once without switching out.",
		shortDesc: "10% freeze after first use on the field.",
		onModifyMove(move, pokemon, target) {
			if (pokemon.volatiles['icebeam']) {
				move.secondaries = [];
				move.secondaries.push({
					chance: 10,
					status: 'frz',
				});
			} else {
				pokemon.addVolatile('icebeam');
			}
			return null;
		},
		secondary: null,
	},
	icywind: {
		inherit: true,
		accuracy: 100,
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
	knockoff: {
		inherit: true,
		shortDesc: "Target's item is lost and it cannot obtain another.",
		desc: "The target's held item is lost for the rest of the battle, unless it has the Sticky Hold Ability. During the effect, the target cannot gain a new item by any means.",
	},
	leafblade: {
		inherit: true,
		basePower: 70,
	},
	leechlife: {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, heal: 1, metronome: 1},
	},
	lockon: {
		inherit: true,
		accuracy: 100,
	},
	megadrain: {
		inherit: true,
		flags: {protect: 1, mirror: 1, heal: 1, metronome: 1},
		pp: 10,
	},
	memento: {
		inherit: true,
		accuracy: 90,
	},
	meteormash: {
		inherit: true,
		accuracy: 90,
	},
	milkdrink: {
		inherit: true,
		flags: {snatch: 1, heal: 1, metronome: 1},
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
		flags: {metronome: 1, failencore: 1, nosleeptalk: 1, noassist: 1},
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
	moonlight: {
		inherit: true,
		flags: {snatch: 1, heal: 1, metronome: 1},
	},
	morningsun: {
		inherit: true,
		flags: {snatch: 1, heal: 1, metronome: 1},
	},
	naturepower: {
		inherit: true,
		desc: "This move calls another move for use depending on the battle terrain. Swift in Wi-Fi battles.",
		shortDesc: "Attack changes based on terrain. (Swift)",
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
	nightslash: {
		inherit: true,
		basePower: 65,
		gen: 3,
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
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
	},
	petaldance: {
		inherit: true,
		basePower: 70,
	},
	rapidspin: {
		inherit: true,
		shortDesc: "Frees user from hazards, binding, Leech Seed.",
		desc: "If this move is successful, the effects of Leech Seed and binding moves end against the user, and all hazards are removed from the user's side of the field.",
	},
	recover: {
		inherit: true,
		flags: {snatch: 1, heal: 1, metronome: 1},
		pp: 20,
	},
	rest: {
		inherit: true,
		flags: {snatch: 1, heal: 1, metronome: 1},
	},
	reversal: {
		inherit: true,
		basePowerCallback(pokemon) {
			const ratio = Math.max(Math.floor(pokemon.hp * 48 / pokemon.maxhp), 1);
			let bp;
			if (ratio < 2) {
				bp = 200;
			} else if (ratio < 5) {
				bp = 150;
			} else if (ratio < 10) {
				bp = 100;
			} else if (ratio < 17) {
				bp = 80;
			} else if (ratio < 33) {
				bp = 40;
			} else {
				bp = 20;
			}
			this.debug(`BP: ${bp}`);
			return bp;
		},
	},
	rockslide: {
		inherit: true,
		accuracy: 100,
		desc: "Has a 40% chance to make the target flinch if they are paralyzed.",
		shortDesc: "40% flinch against paralyzed foes.",
		onModifyMove(move, pokemon, target) {
			if (target && target.status === 'par') {
				move.secondaries = [];
				move.secondaries.push({
					chance: 40,
					volatileStatus: 'flinch',
				});
			}
		},
		secondary: null,
	},
	rocksmash: {
		inherit: true,
		basePower: 20,
	},
	rocktomb: {
		inherit: true,
		basePower: 60,
		pp: 15,
		accuracy: 95,
	},
	sacredfire: {
		inherit: true,
		accuracy: 100,
	},
	sandstorm: {
		inherit: true,
		desc: "For 5 turns, the weather becomes Sandstorm. At the end of each turn except the last, all active Pokemon lose 1/16 of their maximum HP, rounded down, unless they are a Ground, Rock, or Steel type, or have the Sand Veil Ability. Fails if the current weather is Sandstorm.",
		shortDesc: "For 5 turns, a sandstorm rages.",
	},
	sandtomb: {
		inherit: true,
		accuracy: 85,
		basePower: 35,
		desc: "Prevents the target from switching for four or five turns (seven turns if the user is holding Grip Claw). Causes damage to the target equal to 1/8 of its maximum HP (1/6 if the user is holding Binding Band), rounded down, at the end of each turn during effect. The target can still switch out if it is holding Shed Shell or uses Baton Pass, Flip Turn, Parting Shot, Shed Tail, Teleport, U-turn, or Volt Switch. The effect ends if either the user or the target leaves the field, or if the target uses Mortal Spin, Rapid Spin, or Substitute successfully. This effect is not stackable or reset by using this or another binding move.",
		shortDesc: "Traps and damages the target for 4-5 turns.",
	},
	selfdestruct: {
		inherit: true,
		shortDesc: "Target's Def halved during damage. User faints.",
		desc: "The user faints after using this move. The target's Defense is halved during damage calculation. This move is prevented from executing if any active Pokemon has the Damp Ability.",
	},
	sketch: {
		inherit: true,
		flags: {bypasssub: 1, failencore: 1, noassist: 1, failmimic: 1, nosketch: 1},
	},
	slackoff: {
		inherit: true,
		flags: {snatch: 1, heal: 1, metronome: 1},
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
	softboiled: {
		inherit: true,
		flags: {snatch: 1, heal: 1, metronome: 1},
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
	steameruption: {
		inherit: true,
		desc: "Has a 20% chance to burn the target. The target thaws out if it is frozen.",
		shortDesc: "20% chance to burn the target. Thaws target.",
		gen: 3,
		secondary: {
			chance: 20,
			status: 'brn',
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
		desc: "Deals typeless damage to a random opposing Pokemon. If this move was successful, the user takes damage equal to 1/4 the HP lost by the target, rounded down, but not less than 1 HP, and the Rock Head Ability does not prevent this. This move is automatically used if none of the user's known moves can be selected.",
		shortDesc: "User loses 1/4 the HP lost by the target.",
		flags: {contact: 1, protect: 1, noassist: 1, failencore: 1, failmimic: 1, nosketch: 1},
		accuracy: 100,
		recoil: [1, 4],
		struggleRecoil: false,
	},
	suckerpunch: {
		inherit: true,
		basePower: 80,
		gen: 3,
	},
	surf: {
		inherit: true,
		desc: "Power doubles if the target is using Dive.",
		shortDesc: "Hits foes. Power doubles against Dive.",
		target: "allAdjacentFoes",
	},
	swallow: {
		inherit: true,
		flags: {snatch: 1, heal: 1, metronome: 1},
	},
	swandive: {
		num: 1112,
		accuracy: 100,
		basePower: 140,
		category: "Physical",
		name: "Swan Dive",
		desc: "If this move is successful, the user must recharge on the following turn and cannot select a move, unless the target was knocked out by this move.",
		shortDesc: "Can't move next turn if target is not KOed.",
		pp: 5,
		priority: 0,
		flags: {recharge: 1, metronome: 1, protect: 1, mirror: 1, contact: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Brave Bird", target);
		},
		self: {
			volatileStatus: 'mustrecharge',
		},
		secondary: null,
		target: "normal",
		type: "Flying",
		gen: 3,
	},
	synthesis: {
		inherit: true,
		flags: {snatch: 1, heal: 1, metronome: 1},
	},
	taunt: {
		inherit: true,
		desc: "For 2 turns, prevents the target from using non-damaging moves.",
		shortDesc: "For 2 turns, the target can't use status moves.",
		flags: {protect: 1, bypasssub: 1, metronome: 1},
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
		flags: {protect: 1, metronome: 1},
	},
	thunder: {
		inherit: true,
		desc: "Has a 15% chance to paralyze the target. This move can hit a target using Fly. If the weather is Rain Dance, this move does not check accuracy. If the weather is Sunny Day, this move's power is halved.",
		shortDesc: "15% para. Can't miss in rain; half damage in sun.",
		onModifyMove(move, pokemon, target) {
			switch (target?.effectiveWeather()) {
			case 'raindance':
			case 'primordialsea':
				move.accuracy = true;
				break;
			case 'sunnyday':
			case 'desolateland':
				move.basePower = move.basePower / 2;
				break;
			}
		},
		secondary: {
			chance: 15,
			status: 'par',
		},
	},
	tickle: {
		inherit: true,
		flags: {protect: 1, reflectable: 1, mirror: 1, bypasssub: 1, metronome: 1},
	},
	toxic: {
		inherit: true,
		desc: "Badly poisons the target.",
		shortDesc: "Badly poisons the target.",
		accuracy: 90,
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
		desc: "No additional effect.",
		shortDesc: "No additional effect.",
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
	whirlpool: {
		inherit: true,
		accuracy: 85,
		basePower: 35,
		desc: "Prevents the target from switching for four or five turns (seven turns if the user is holding Grip Claw). Causes damage to the target equal to 1/8 of its maximum HP (1/6 if the user is holding Binding Band), rounded down, at the end of each turn during effect. The target can still switch out if it is holding Shed Shell or uses Baton Pass, Flip Turn, Parting Shot, Shed Tail, Teleport, U-turn, or Volt Switch. The effect ends if either the user or the target leaves the field, or if the target uses Mortal Spin, Rapid Spin, or Substitute successfully. This effect is not stackable or reset by using this or another binding move.",
		shortDesc: "Traps and damages the target for 4-5 turns.",
	},
	willowisp: {
		inherit: true,
		accuracy: 90,
	},
	wish: {
		inherit: true,
		flags: {snatch: 1, heal: 1, metronome: 1},
	},
	workup: {
		inherit: true,
		gen: 3,
	},
	wrap: {
		inherit: true,
		accuracy: 90,
		desc: "Prevents the target from switching for four or five turns (seven turns if the user is holding Grip Claw). Causes damage to the target equal to 1/8 of its maximum HP (1/6 if the user is holding Binding Band), rounded down, at the end of each turn during effect. The target can still switch out if it is holding Shed Shell or uses Baton Pass, Flip Turn, Parting Shot, Shed Tail, Teleport, U-turn, or Volt Switch. The effect ends if either the user or the target leaves the field, or if the target uses Mortal Spin, Rapid Spin, or Substitute successfully. This effect is not stackable or reset by using this or another binding move.",
		shortDesc: "Traps and damages the target for 4-5 turns.",
	},
	zapcannon: {
		inherit: true,
		basePower: 100,
	},
};
