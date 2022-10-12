export const Moves: {[k: string]: ModdedMoveData} = {

	tephraburst: {
		num: -100,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Tephra Burst",
		shortDesc: "Sets Jagged Splinters.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 100,
			volatileStatus: 'jaggedsplinters',
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Eruption", target);
		},
		target: "normal",
		type: "Fire",
		contestType: "Cool",
	},

	eeriereflection: {
		num: -101,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		name: "Eerie Reflection",
		shortDesc: "50% chance to lower target's SpA.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, authentic: 1},
		secondary: {
			chance: 50,
			boosts: {
				spa: -1,
			},
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Mirror Shot", target);
		},
		target: "allAdjacentFoes",
		type: "Ghost",
	},

	stormin: {
		num: -102,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		name: "Storm In",
		shortDesc: "User becomes Fixated.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 100,
			self: {
				volatileStatus: 'fixated',
			},
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hurricane", target);
		},
		target: "normal",
		type: "Water",
		contestType: "Beautiful",
	},

	florasomnia: {
		num: -103,
		accuracy: 100,
		basePower: 65,
		basePowerCallback(pokemon, target, move) {
			if (target.status || target.hasAbility('comatose')) return move.basePower * 2;
			return move.basePower;
		},
		category: "Special",
		name: "Florasomnia",
		shortDesc: "Deals double damage if target has a status condition. 30% to inflict Drowsy.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			status: 'slp',
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Aromatherapy", target);
		},
		target: "normal",
		type: "Psychic",
	},

	sacredjewel: {
		num: -104,
		accuracy: 100,
		basePower: 75,
		category: "Special",
		name: "Sacred Jewel",
		shortDesc: "Lowers target's SpDef by 1 stage",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 100,
			boosts: {
				spd: -1,
			}
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Power Gem", target);
		},
		target: "normal",
		type: "Rock",
	},

	royalbanquet: {
		num: -105,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Royal Banquet",
		shortDesc: "Sets Aqua Ring on the user",
		pp: 10,
		priority: 0,
		flags: {protect: 1},
		self: {
			volatileStatus: 'aquaring',
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Liquidation", target);
		},
		target: "normal",
		type: "Water",
	},

	berryblast: {
		shortDesc: "Doubles in power if the user is itemless.",
		num: -106,
		accuracy: 100,
		basePower: 55,
		basePowerCallback(pokemon, target, move) {
			if (!pokemon.item) {
				this.debug("Power doubled for no item");
				return move.basePower * 2;
			}
			return move.basePower;
		},
		category: "Physical",
		name: "Berry Blast",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Seed Bomb", target);
		},
		target: "any",
		type: "Grass",
		contestType: "Cute",
	},

	postdelivery: {
		shortDesc: "Does damage 2 turns after use. Physical if the user is female.",
		num: -107,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		name: "Post Delivery",
		pp: 15,
		priority: 0,
		flags: {},
		ignoreImmunity: true,
		isFutureMove: true,
		onTry(source, target) {
			if (!target.side.addSlotCondition(target, 'futuremove')) return false;
			if (source.gender === 'F') {
				Object.assign(target.side.slotConditions[target.position]['futuremove'], {
					duration: 3,
					move: 'postdelivery',
					source: source,
					moveData: {
						id: 'postdelivery',
						name: "Post Delivery",
						accuracy: 100,
						basePower: 90,
						category: "Physical",
						priority: 0,
						flags: {},
						ignoreImmunity: false,
						effectType: 'Move',
						isFutureMove: true,
						type: 'Fairy',
					},
				});
			} else {
				Object.assign(target.side.slotConditions[target.position]['futuremove'], {
					duration: 3,
					move: 'postdelivery',
					source: source,
					moveData: {
						id: 'postdelivery',
						name: "Post Delivery",
						accuracy: 100,
						basePower: 90,
						category: "Special",
						priority: 0,
						flags: {},
						ignoreImmunity: false,
						effectType: 'Move',
						isFutureMove: true,
						type: 'Fairy',
					},
				});
			}
			this.add('-message', `${source.illusion ? source.illusion.name : source.name} is making a special delivery!`);
			return null;
		},
		secondary: null,
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Present", target);
		},
		target: "normal",
		type: "Fairy",
		contestType: "Clever",
	},

	camoscope: {
		shortDesc: "Matches the user's primary type.",
		num: -108,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		name: "Camoscope",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyType(move, pokemon) {
			let type = pokemon.types[0];
			if (type === "Bird") type = "???";
			move.type = type;
		},
		secondary: null,
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Smart Strike", target);
		},
		target: "normal",
		type: "Normal",
		contestType: "Clever",
	},

	pixiedust: {
		shortDesc: "-1 priority. Attempted Fire moves fail and explode; if they do, this move does half damage.",
		num: -109,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		name: "Pixie Dust",
		pp: 10,
		priority: -1,
		flags: {bullet: 1, protect: 1},
		beforeTurnCallback(pokemon) {
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				target.addVolatile('pixiedust', pokemon);
			}
		},
		condition: {
			duration: 1,
			onStart(target) {
				this.add('-singleturn', target, 'Powder'); // display as Powder but it's technically different
			},
			onTryMovePriority: -1,
			onTryMove(pokemon, target, move) {
				if (move.type === 'Fire') {
					this.add('-activate', pokemon, 'move: Powder');
					this.damage(this.clampIntRange(Math.round(pokemon.maxhp / 4), 1));
					this.effectData.activated = true; // because it needs to be removed now
					return false;
				}
			},
		},
		basePowerCallback(pokemon, target, move) {
			if (target.volatiles['pixiedust'] && target.volatiles['pixiedust'].activated) {
				this.debug("Power halved for no Pixie Dust");
				return move.basePower * 0.5;
			}
			return move.basePower;
		},
		onAfterMove(pokemon, target) {
			target.removeVolatile('pixiedust');
		},
		secondary: null,
		target: "normal",
		type: "Fairy",
		contestType: "Cute",
	},

	stormoflight: {
		shortDesc: "The user sacrifices 80% of its current HP.",
		num: -110,
		accuracy: 100,
		basePower: 200,
		category: "Physical",
		name: "Storm of Light",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		mindBlownRecoil: true,
		onAfterMove(pokemon, target, move) {
			if (move.mindBlownRecoil && !move.multihit) {
				this.damage(Math.round(pokemon.maxhp * 4 / 5), pokemon, pokemon, this.dex.getEffect('Steel Beam'), true);
			}
		},
		secondary: null,
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Light That Burns the Sky", target);
		},
		target: "allAdjacent",
		type: "Electric",
		contestType: "Cool",
	},

	takeheart: { // for Dovinity
		shortDesc: "Raises the user's Sp. Atk and Sp. Def by 1. User cures its burn, poison, or paralysis.",
		num: -111,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Take Heart",
		pp: 10,
		priority: 0,
		flags: {snatch: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Tail Glow", target);
		},
		onHit(pokemon) {
			if (pokemon.status === '') return;
			pokemon.cureStatus();
		},
		boosts: {
			spa: 1,
			spd: 1,
		},
		secondary: null,
		target: "self",
		type: "Psychic",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Cute",
	},



	/// canon moves ///





	rest: {
		inherit: true,
		onHit(target, source, move) {
			if (!target.setStatus('slp', source, move)) return false;
			this.heal((target.maxhp * 3) / 4); // Aesthetic only as the healing happens after you fall asleep in-game
		},
	},

	outrage: {
		inherit: true,
		basePower: 90,
			self: {
				volatileStatus: 'fixated',
			},
	},

	petaldance: {
		inherit: true,
		basePower: 90,
		self: {
			volatileStatus: 'fixated',
		},
	},

	rollout: {
		inherit: true,
		self: {
			volatileStatus: 'fixated',
		},
	},

	iceball: {
		inherit: true,
		self: {
			volatileStatus: 'fixated',
		},
	},

	stealthrock: {
		inherit: true,
		accuracy: 100,
		basePower: 40,
		category: "Physical",
		secondary: {
			chance: 100,
			volatileStatus: 'jaggedsplinters',
		},
		flags: {protect: 1, mirror: 1},
		target: "adjacentFoe",
		sideCondition: undefined,
		shortDesc: "Sets Jagged Splinters.",
	},

	spikes: {
		inherit: true,
		accuracy: 100,
		basePower: 40,
		category: "Physical",
		secondary: {
			chance: 100,
			volatileStatus: 'jaggedsplinters',
		},
		flags: {protect: 1, mirror: 1},
		target: "adjacentFoe",
		sideCondition: undefined,
		shortDesc: "Sets Jagged Splinters.",
	},

	pinmissile: {
		inherit: true,
		secondary: {
			chance: 100,
			volatileStatus: 'jaggedsplinters',
		},
		shortDesc: "Sets Jagged Splinters.",
	},

	focusenergy: {
		inherit: true,
		condition: {
			duration: 5,
			onStart(target, source, effect) {
				if (effect?.id === 'zpower') {
					this.add('-start', target, 'move: Focus Energy', '[zeffect]');
				} else if (effect && (['imposter', 'psychup', 'transform'].includes(effect.id))) {
					this.add('-start', target, 'move: Focus Energy', '[silent]');
				} else {
					this.add('-start', target, 'move: Focus Energy');
				}
			},
			onModifyCritRatio(critRatio) {
				return critRatio + 2;
			},
		},
	},

	dragonclaw: {
		inherit: true,
		critRatio: 2,
	},

	xscissor: {
		inherit: true,
		critRatio: 2,
	},

	selfdestruct: {
		inherit: true,
		selfdestruct: '',
		mindBlownRecoil: true,
		onAfterMove(pokemon, target, move) {
			if (move.mindBlownRecoil && !move.multihit) {
				this.damage(Math.round(pokemon.maxhp * 4 / 5), pokemon, pokemon, this.dex.getEffect('Steel Beam'), true);
			}
		},
	},

	venoshock: {
		inherit: true,
		onBasePower(basePower, pokemon, target) {
			if (target.status) {
				return this.chainModify(2);
			}
		},
	},

	chatter: {
		inherit: true,
		basePower: 80,
		self: {
			volatileStatus: 'fixated',
		},
	},

	echoedvoice: {
		inherit: true,
		basePower: 80,
		self: {
			volatileStatus: 'fixated',
		},
		basePowerCallback() {
			return 80;
		},
		onTry() {},
		condition: {
			duration: null,
		},
	},

	explosion: {
		inherit: true,
		selfdestruct: '',
		mindBlownRecoil: true,
		onAfterMove(pokemon, target, move) {
			if (move.mindBlownRecoil && !move.multihit) {
				this.damage(Math.round(pokemon.maxhp * 4 / 5), pokemon, pokemon, this.dex.getEffect('Steel Beam'), true);
			}
		},
	},

	mistyexplosion: {
		inherit: true,
		selfdestruct: '',
		mindBlownRecoil: true,
		onAfterMove(pokemon, target, move) {
			if (move.mindBlownRecoil && !move.multihit) {
				this.damage(Math.round(pokemon.maxhp * 4 / 5), pokemon, pokemon, this.dex.getEffect('Steel Beam'), true);
			}
		},
	},

	fellstinger: {
		inherit: true,
		basePower: 80,
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (!target || target.fainted || target.hp <= 0) {
				this.boost({atk: 3}, pokemon, pokemon, move);
				pokemon.addVolatile('primed');
			}
		},
	},

	thrash: {
		inherit: true,
		basePower: 90,
		self: {
			volatileStatus: 'fixated',
		},
	},

	furycutter: {
		inherit: true,
		self: {
			volatileStatus: 'fixated',
		}
	},

	sing: {
		inherit: true,
		accuracy: 70,
	},

	iciclespear: {
		inherit: true,
		multihit: 1,
		secondary: {
			chance: 100,
			volatileStatus: 'jaggedsplinters',
		},
		shortDesc: "Sets Jagged Splinters",
	},

	rollout: {
		inherit: true,
		self: {
			volatileStatus: 'fixated',
		}
	},

	iceball: {
		inherit: true,
		self: {
			volatileStatus: 'fixated,'
		}
	},

	bellydrum: {
		inherit: true,
		onHit(target) {
			if (target.hp <= target.maxhp / 4 || target.boosts.atk >= 6 || target.maxhp === 1) { // Shedinja clause
				return false;
			}
			this.directDamage(target.maxhp / 4);
			this.boost({atk: 1}, target);
		},
		self: {
			volatileStatus: 'primed',
		},
	},
};
