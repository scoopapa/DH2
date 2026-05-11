export const Moves: import('../../../sim/dex-moves').ModdedMoveDataTable = {
	multiattack: {
		inherit: true,
		isNonstandard: null,
	},
	lightofruin: {
		inherit: true,
		isNonstandard: null,
	},

	// champions
	anchorshot: {
		inherit: true,
		basePower: 90,
	},
	appleacid: {
		inherit: true,
		basePower: 90,
	},
	banefulbunker: {
		inherit: true,
		pp: 5,
	},
	beakblast: {
		inherit: true,
		basePower: 120,
		pp: 5,
	},
	belch: {
		inherit: true,
		onDisableMove: undefined, // no inherit
		desc: "Fails unless the user has eaten a Berry, either by eating one that was held, stealing and eating one off another Pokemon with Bug Bite or Pluck, or eating one that was thrown at it with Fling. Once the condition is met, this move can be selected and used for the rest of the battle even if the user gains or uses another item or switches out. Consuming a Berry with Natural Gift does not count for the purposes of eating one.",
		shortDesc: "Fails unless the user has eaten a Berry.",
	},
	bloodmoon: {
		inherit: true,
		basePower: 130,
	},
	boltbeak: {
		inherit: true,
		basePower: 80,
	},
	bonerush: {
		inherit: true,
		basePower: 30,
	},
	clangoroussoul: {
		inherit: true,
		accuracy: true,
	},
	crabhammer: {
		inherit: true,
		accuracy: 95,
	},
	crushclaw: {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, slicing: 1},
	},
	direclaw: {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, slicing: 1},
		secondary: {
			chance: 30,
			onHit(target, source) {
				const status = this.sample(['psn', 'par', 'slp']);
				// This seems to only happen with Dire Claw
				if (target.status) {
					if (target.status === status) {
						this.add('-fail', target, status);
					} else {
						this.add('-fail', source);
					}
					return;
				}
				target.trySetStatus(status, source);
			},
		},
		desc: "Has a 30% chance to cause the target to either fall asleep, become poisoned, or become paralyzed.",
		shortDesc: "30% chance to sleep, poison, or paralyze target.",
	},
	dragoncheer: {
		inherit: true,
		flags: {bypasssub: 1, allyanim: 1, metronome: 1, sound: 1},
	},
	dragonclaw: {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, slicing: 1},
	},
	dragonhammer: {
		inherit: true,
		basePower: 100,
	},
	encore: {
		inherit: true,
		condition: {
			inherit: true,
			onStart(target) {
				let move: Move | ActiveMove | null = target.lastMove;
				if (!move || target.volatiles['dynamax']) return false;
				// Encore only works on Max Moves if the base move is not itself a Max Move
				if (move.isMax && move.baseMove) move = this.dex.moves.get(move.baseMove);
				const moveSlot = target.getMoveData(move.id);
				if (move.isZ || move.isMax || move.flags['failencore'] || !moveSlot || moveSlot.pp <= 0) {
					// it failed
					return false;
				}
				this.effectState.move = move.id;
				this.add('-start', target, 'Encore');
				const action = this.queue.willMove(target);
				if (!action) {
					this.effectState.duration!++;
					// TODO: this is a quick fix, check if move priority is changed when Mental Herb cures Encore
				} else if (!target.hasItem('mentalherb')) {
					const priority = action.priority -
						this.dex.moves.get(action.moveid).priority +
						this.dex.moves.get(move.id).priority;
					this.queue.changeAction(target, {
						choice: 'move',
						// target: undefined,
						// targetLoc: undefined,
						moveid: move.id,
						order: action.order,
					});
					this.queue.willMove(target)!.priority = priority;
				}
			},
		},
	},
	fakeout: {
		inherit: true,
		onDisableMove(pokemon) {
			if (pokemon.activeMoveActions > 1) {
				pokemon.disableMove('fakeout');
			}
		},
		desc: "Has a 100% chance to make the target flinch. This move cannot be selected unless it is the user's first turn on the field.",
	},
	firelash: {
		inherit: true,
		basePower: 90,
	},
	firstimpression: {
		inherit: true,
		basePower: 100,
		onDisableMove(pokemon) {
			if (pokemon.activeMoveActions > 1) {
				pokemon.disableMove('firstimpression');
			}
		},
		desc: "This move cannot be selected unless it is the user's first turn on the field.",
	},
	fishiousrend: {
		inherit: true,
		basePower: 80,
	},
	freezedry: {
		inherit: true,
		secondary: undefined, // no inherit
		desc: "This move's type effectiveness against Water is changed to be super effective no matter what this move's type is.",
		shortDesc: "Super effective on Water.",
	},
	geargrind: {
		inherit: true,
		accuracy: 90,
		basePower: 60,
	},
	gravapple: {
		inherit: true,
		basePower: 90,
	},
	growth: {
		inherit: true,
		onModifyMove(move, pokemon) {
			if (pokemon.hasAbility('megasol') && this.field.weather !== 'sunnyday') {
				// TODO: check in future patches
				delete move.boosts;
			} else if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				move.boosts = { atk: 2, spa: 2 };
			}
		},
		type: "Grass",
	},
	hyperdrill: {
		inherit: true,
		basePower: 120,
	},
	infernalparade: {
		inherit: true,
		basePower: 65,
	},
	ironhead: {
		inherit: true,
		secondary: {
			chance: 20,
			volatileStatus: 'flinch',
		},
		desc: "Has a 20% chance to make the target flinch.",
		shortDesc: "20% chance to make the target flinch.",
	},
	kingsshield: {
		inherit: true,
		isNonstandard: null,
		pp: 5,
	},
	makeitrain: {
		inherit: true,
		accuracy: 95,
	},
	metalclaw: {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, slicing: 1},
	},
	moonblast: {
		inherit: true,
		secondary: {
			chance: 10,
			boosts: {
				spa: -1,
			},
		},
		desc: "Has a 10% chance to lower the target's Special Attack by 1 stage.",
		shortDesc: "10% chance to lower the target's Sp. Atk by 1.",
	},
	mountaingale: {
		inherit: true,
		basePower: 120,
	},
	nightdaze: {
		inherit: true,
		basePower: 90,
	},
	nightslash: {
		inherit: true,
		pp: 20,
	},
	nihillight: {
		inherit: true,
		pp: 5,
	},
	obstruct: {
		inherit: true,
		pp: 5,
	},
	protect: {
		inherit: true,
		pp: 5,
	},
	psyshieldbash: {
		inherit: true,
		basePower: 90,
	},
	purify: {
		inherit: true,
		pp: 5,
	},
	revelationdance: {
		inherit: true,
		basePower: 100,
	},
	saltcure: {
		inherit: true,
		condition: {
			inherit: true,
			onResidual(pokemon) {
				this.damage(pokemon.baseMaxhp / (pokemon.hasType(['Water', 'Steel']) ? 8 : 16));
			},
		},
		desc: "Causes damage to the target equal to 1/16 of its maximum HP (1/8 if the target is Steel or Water type), rounded down, at the end of each turn during effect. This effect ends when the target is no longer active.",
		shortDesc: "Deals 1/16 max HP each turn; 1/8 on Steel, Water.",
	},
	sandstorm: {
		inherit: true,
		pp: 5,
	},
	shadowclaw: {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, slicing: 1},
	},
	shelltrap: {
		inherit: true,
		pp: 10,
	},
	snaptrap: {
		inherit: true,
		isNonstandard: null,
		type: "Steel",
	},
	snipeshot: {
		inherit: true,
		basePower: 85,
	},
	snowscape: {
		inherit: true,
		pp: 5,
	},
	spikyshield: {
		inherit: true,
		pp: 5,
	},
	spinout: {
		inherit: true,
		pp: 10,
	},
	spiritshackle: {
		inherit: true,
		basePower: 90,
	},
	stuffcheeks: {
		inherit: true,
		onDisableMove: undefined, // no inherit
		desc: "Fails if the user is not holding a Berry. The user eats its Berry and raises its Defense by 2 stages. This effect is not prevented by the Klutz or Unnerve Abilities, or the effects of Embargo or Magic Room.",
		shortDesc: "Fails unless the user has a berry. User eats Berry, Def +2.",
	},
	syrupbomb: {
		inherit: true,
		accuracy: 90,
	},
	toxicthread: {
		inherit: true,
		boosts: {
			spe: -2,
		},
		desc: "Lowers the target's Speed by 2 stages and poisons it.",
		shortDesc: "Lowers the target's Speed by 2 and poisons it.",
	},
	tripledive: {
		inherit: true,
		basePower: 35,
	},
	tropkick: {
		inherit: true,
		basePower: 85,
	},
};
