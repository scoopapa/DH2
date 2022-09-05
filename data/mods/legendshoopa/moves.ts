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
		onModifyMove(move, target, source) {
			this.damage((source.maxhp * 4) / 5);
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
		onModifyMove(move, target, source) {
			this.damage((source.maxhp * 4) / 5);
		},
	},

	mistyexplosion: {
		inherit: true,
		selfdestruct: '',
		onModifyMove(move, target, source) {
			this.damage((source.maxhp * 4) / 5);
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