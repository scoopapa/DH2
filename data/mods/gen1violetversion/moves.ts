export const Moves: {[k: string]: ModdedMoveData} = {
	acid: {
		inherit: true,
		desc: "Drops defense 1 stage.",
		shortDesc: "Drops def -1.",
		basePower: 60,
		pp: 15,
		secondary: {
			chance: 100,
			boosts: {
				def: -1,
			},
		},
	},
	bind: {
		inherit: true,
		basePower: 40,
		pp: 5,
		type: "Bug",
	},
	conversion: { //Typing needs to be retained after switch-out
		desc: "Copies foe's typing, and heals 50% health.",
		shortDesc: "Copy foe's typing, heal 50%",
		sideCondition: 'conversion',
		condition: {
			     onStart: function (target, source) {
			     	source.types = target.types;
				this.add('-start', source, 'typechange', source.types.join(', '), '[from] move: Conversion', '[of] ' + source);
				return;
			     }
		},
		pp: 10,
		accuracy: true,
		target: "normal",
		onHit: function (target, source) {
			this.heal(Math.floor(source.maxhp / 2), source, source);
		},
	},
	clamp: {
		inherit: true,
		basePower: 70,
		pp: 5,
	},
	disable: {
		accuracy: 100,
		category: "Status",
		id: "disable",
		isViable: true,
		name: "Disable",
		pp: 5,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, authentic: 1},
		onHit: function (target, source) {
			if (!target.moves.length) return false;
			let sideCondition = target.side.sideConditions['disable'];
			if (sideCondition) {
				target.side.removeSideCondition('disable');
			}
			target.side.addSideCondition('disable', target);
		},
		condition: {
			noCopy: true, // doesn't get copied by Baton Pass
			onStart: function (side, target) {
				let moves = target.moves;
				let moveId = moves[this.random(moves.length)];
				if (!moveId) return false;
				let move = this.getMove(moveId);
				this.add('-start', target, 'Disable', move.name);
				this.effectData.move = move.id;
				return;
			},
			onBeforeMovePriority: 7,
			onBeforeMove: function (attacker, defender, move) {
				if (this.effectData.source !== attacker) return;
				if (move.id === this.effectData.move) {
					this.add('cant', attacker, 'Disable', move);
					return false;
				}
			},
			onDisableMove: function (pokemon) {
				if (this.effectData.source !== pokemon) return;
				let moves = pokemon.moveset;
				for (let i = 0; i < moves.length; i++) {
					if (moves[i].id === this.effectData.move) {
						pokemon.disableMove(moves[i].id);
					}
				}
			},
		},
	},
	dreameater: {
		inherit: true,
		category: "Physical",
		basePower: 200,
		drain: [1, 1],
		onTryImmunity(target) {
			return target.status === 'slp' || target.status === 'psn' || target.status === 'tox' || target.hasAbility('comatose');
		},
		type: "Ghost",
	},
	firespin: {
		inherit: true,
		basePower: 30,
		pp: 5,
	},
	glare: {
		inherit: true,
		accuracy: 100,
	},
	gust: {
		inherit: true,
		desc: "Always drops attack 1 stage.",
		shortDesc: "Atk drops -1.",
		basePower: 80,
		pp: 15,
		secondary: {
			chance: 30,
			boosts: {
				atk: -1,
			},
		},
		type: "Flying",
    },
	haze: {
		desc: "Eliminates any stat stage changes and status from all active Pokemon. Heal both Pokemon by 33%.",
		shortDesc: "Remove stat changes, own status, both heal 33%",
		accuracy: true,
		pp: 15,
		onHit(target, source) {
			this.add('-clearallboost');
			for (const pokemon of this.getAllActive()) {
				pokemon.clearBoosts();
				this.heal(Math.floor(pokemon.maxhp * 0.33), pokemon, pokemon);

				if (pokemon === source) {
					// Clears the status from the user
					pokemon.cureStatus();
				}
			}
		},
		target: "self",
	},
	karatechop: {
		inherit: true,
		type: "Fighting",
	},
	leechlife: {
		inherit: true,
		basePower: 60,
		drain: [1, 1],
	},
	leechseed: {
		inherit: true,
		condition: {
			onStart(target) {
				this.add('-start', target, 'move: Leech Seed');
			},
			onResidualOrder: 8,
			onResidual(pokemon) {
				const target = this.getAtSlot(pokemon.volatiles['leechseed'].sourceSlot);
				if (!target || target.fainted || target.hp <= 0) {
					this.debug('Nothing to leech into');
					return;
				}
				const damage = this.damage(pokemon.baseMaxhp / 8, pokemon, target);
				if (damage) {
					this.heal(damage, target, pokemon);
				}
			},
		},
		onTryImmunity(target) {
			return !target.hasType('Grass');
		},
		secondary: null,
		target: "normal",
		type: "Grass",
	},
  	meditate: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Meditate",
		pp: 10,
		priority: 0,
		volatileStatus: 'aquaring',
		condition: {
			onStart(pokemon) {
				this.add('-start', pokemon, 'Aqua Ring');
			},
			onResidualOrder: 6,
			onResidual(pokemon) {
				this.heal(pokemon.baseMaxhp / 8);
			},
		},
		secondary: null,
		target: "self",
		type: "Psychic",
	},
	megadrain: {
		inherit: true,
		drain: [1, 1],
	},
	mimic: { 
		inherit: true,
		desc: "Permanently learns a random move from the foe's moveset.",
		shortDesc: "Keeps a random move from foe.",
		onHit(target, source) {
			let moveslot = source.moves.indexOf('mimic');
			if (moveslot < 0) return false;
			let noMimic = source.moves;
			
			let moves = [];
			
			for (const moveSlot of target.moveSlots) {
				let moveid = moveSlot.id;
				if (noMimic.includes(moveid)) continue;
				moves.push(moveid);
			}
			
			let moveid = this.sample(moves);
			if (!moveid) return false;
			let move = this.dex.getMove(moveid);
			let mimicMove = {
				move: move.name,
				id: move.id,
				pp: source.moveSlots[moveslot].pp,
				maxpp: move.pp * 8 / 5,
				target: move.target,
				disabled: false,
				used: false,
				virtual: true,
			};
			source.moveSlots[moveslot] = mimicMove;
			source.baseMoveSlots[moveslot] = mimicMove;
			this.add('-start', source, 'Mimic', move.name);
		},
	},
	mirrormove: {
		inherit: true,
		desc: "The user uses the last move used by the target. Fails if the target has not made a move, or if the last move used was Mirror Move.",
		onHit(pokemon) {
			let foe = pokemon.side.foe.active[0];
			if (foe.side.lastMove.id === 'mirrormove') {
				return false;
			}
			this.useMove(foe.side.lastMove.id, pokemon);
		},
	},
	poisonsting: {
		inherit: true,
		basePower: 95,
		pp: 15,
		secondary: {
			chance: 30,
			status: 'psn',
		},
  },
	recover: {
		inherit: true,
		onHit(target) {
			this.heal(Math.floor(target.maxhp / 2), target, target);
		},
	},
	rockslide: {
		inherit: true,
		basePower: 85,
  },
	skyattack: {
		inherit: true,
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name, defender);
			this.boost({def:1}, attacker, attacker, move);
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
  },
	softboiled: {
		inherit: true,
		onHit(target) {
			this.heal(Math.floor(target.maxhp / 2), target, target);
		},
	},
	solarbeam: {
		inherit: true,
		basePower: 100,
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name, defender);
			this.boost({spa:1}, attacker, attacker, move);
			this.boost({spd:1}, attacker, attacker, move);
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
  },
	submission: {
		inherit: true,
		basePower: 100,
		accuracy: 100,
  },
	thrash: {
		inherit: true,
		category: "Special",
		basePower: 60,
		type: "Dragon",
		secondary: {
			chance: 30,
			status: 'par',
  },
	toxic: {
		inherit: true,
		accuracy: 100,
  },
	transform: {
		inherit: true,
		desc: "The user transforms into the target. The target's current stats, stat stages, types, moves, DVs, species, and sprite are copied. The user's level and HP remain the same and each copied move receives only 5 PP. This move can hit a target using Dig or Fly.",
	},
	triattack: {
		inherit: true,
		accuracy: 100,
		type: "Ghost",
  },
	twineedle: {
		inherit: true,
		basePower: 40,
		multihit: 2,
		secondary: {
			chance: 20,
			status: 'psn',
		}
  },
	visegrip: {
		inherit: true,
		critRatio: 2,
		type: "Bug",
	},
	whirlwind: {
		desc: "Forces enemy out.",
		shortDesc: "Forces enemy out.",
		id: "whirlwind",
		name: "Whirlwind",
		isViable: true,
		forceSwitch: true,
		onTryHit: function () {},
		priority: -6,
		basePower: 50,
		accuracy: 100,
		category: "Physical",
		pp: 5,
		target: "normal",
		type: "Flying",
	},
	wrap: {
		inherit: true,
		basePower: 40,
		pp: 5,
  },
};
