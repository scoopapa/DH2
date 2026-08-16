export const Moves: {[moveid: string]: ModdedMoveData} = {
	omnislash: {
		num: 2000,
		accuracy: 95,
		basePower: 20,
		category: "Physical",
		name: "Omnislash",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, slicing: 1, cantusetwice: 1},
		critRatio: 2,
		multihit: 10,
		multiaccuracy: true,
		secondary: null,
		target: "normal",
		type: "Steel",
		shortDesc: "Hits 10 times. Each hit can miss. High Crit. Cannot be used twice in a row.",
	},
	pkrockin: {
		num: 2001,
		accuracy: 100,
		basePower: 0,
		damageCallback(pokemon) {
			return (this.random(100, 201) * pokemon.level) / 100;
		},
		category: "Special",
		name: "PK Rockin",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Psychic",
		contestType: "Clever",
		shortDesc: "Inflicts random amount of damage equal to 1x-2x the user's level to foe(s).",
	},
	shadefist: {
		num: 2002,
		accuracy: 100,
		basePower: 75,
		category: "Physical",
		name: "Shade Fist",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1, metronome: 1},
		secondary: {
			chance: 10,
			status: 'brn',
		},
		target: "normal",
		type: "Ghost",
		contestType: "Tough",
		shortDesc: "10% chance to burn the target.",
	},
	luminaire: {
		num: 2003,
		accuracy: 100,
		basePower: 120,
		category: "Special",
		name: "Luminaire",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Electric",
		shortDesc: "Hits all adjacent opponents.",
	},
	flurry: {
		num: 2004,
		accuracy: 95,
		basePower: 25,
		category: "Physical",
		name: "Flurry",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		multihit: 4,
		secondary: null,
		target: "normal",
		type: "Normal",
		shortDesc: "Hits 4 times.",
	},
	regenerate: {
		num: 2005,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Regenerate",
		pp: 5,
		priority: 0,
		flags: {snatch: 1, metronome: 1},
		heal: [1, 3],
		onHit(pokemon) {
			if (['', 'slp', 'frz'].includes(pokemon.status)) return false;
			pokemon.cureStatus();
		},
		secondary: null,
		target: "self",
		type: "Normal",
		zMove: {effect: 'heal'},
		contestType: "Cute",
		shortDesc: "Heals 1/3 user's max HP and cures user's burn, poison, or paralysis",
	},
	premonition: {
		num: 2006,
		accuracy: 100,
		basePower: 120,
		category: "Special",
		name: "Premonition",
		pp: 10,
		priority: 0,
		flags: {allyanim: 1, metronome: 1, futuremove: 1},
		ignoreImmunity: true,
		onTry(source, target) {
			if (!target.side.addSlotCondition(target, 'futuremove')) return false;
			Object.assign(target.side.slotConditions[target.position]['futuremove'], {
				duration: 3,
				move: 'Premonition',
				source: source,
				moveData: {
					id: 'premonition',
					name: "Premonition",
					accuracy: 100,
					basePower: 120,
					category: "Special",
					priority: 0,
					flags: {allyanim: 1, metronome: 1, futuremove: 1},
					ignoreImmunity: false,
					effectType: 'Move',
					type: 'Ghost',
				},
			});
			this.add('-start', source, 'move: Premonition');
			return this.NOT_FAIL;
		},
		secondary: null,
		target: "normal",
		type: "Ghost",
		contestType: "Clever",
		shortDesc: "Hits two turns after being used.",
	},
	retreat: {
		num: 2007,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Retreat",
		pp: 10,
		priority: 0,
		flags: {},
		selfSwitch: true,
		secondary: null,
		target: "Self",
		type: "Normal",
		shortDesc: "User switches out.",
	},
	divide: {
		num: 2008,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Divide",
		pp: 20,
		priority: 0,
		flags: {snatch: 1, metronome: 1},
		volatileStatus: 'divide',
		condition: {
			duration: 2,
			onStart(pokemon, source, effect) {
				if (effect && (['costar', 'imposter', 'psychup', 'transform'].includes(effect.id))) {
					this.add('-start', pokemon, 'move: Divide', '[silent]');
				} else {
					this.add('-start', pokemon, 'move: Divide');
				}
			},
			onRestart(pokemon) {
				this.effectState.duration = 2;
				this.add('-start', pokemon, 'move: Divide');
			},
			onBasePowerPriority: 9,
			onBasePower(basePower, attacker, defender, move) {
				if (move.category !== 'Status') {
					this.debug('divide boost');
					return this.chainModify(3);
				}
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'move: Divide', '[silent]');
			},
		},
		secondary: null,
		target: "self",
		type: "Dark",
		zMove: {boost: {spd: 1}},
		contestType: "Clever",
		shortDesc: "User's next move does 3x damage",
	},
	lunarshield: {
		num: 2009,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Lunar Shield",
		pp: 10,
		priority: 4,
		flags: {noassist: 1, failcopycat: 1},
		heal: [1, 8],
		stallingMove: true,
		volatileStatus: 'lunarshield',
		onPrepareHit(pokemon) {
			return !!this.queue.willAct() && this.runEvent('StallMove', pokemon);
		},
		onHit(pokemon) {
			pokemon.addVolatile('stall');
		},
		condition: {
			duration: 1,
			onStart(target) {
				this.add('-singleturn', target, 'Lunar Shield');
			},
			onTryHitPriority: 3,
			onTryHit(target, source, move) {
				if (!move.flags['protect']) {
					if (['gmaxoneblow', 'gmaxrapidflow'].includes(move.id)) return;
					if (move.isZ || move.isMax) target.getMoveHitData(move).zBrokeProtect = true;
					return;
				}
				if (move.smartTarget) {
					move.smartTarget = false;
				} else {
					this.add('-activate', target, 'move: Lunar Shield');
				}
				const lockedmove = source.getVolatile('lockedmove');
				if (lockedmove) {
					if (source.volatiles['lockedmove'].duration === 2) {
						delete source.volatiles['lockedmove'];
					}
				}
				return this.NOT_FAIL;
			},
		},
		secondary: null,
		target: "self",
		type: "Fairy",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Cute",
		shortDesc: "Prevents moves from affecting user this turn. Heals 1/8 max hp. ",
	},
	bannerofcommand: {
		num: 2010,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Banner-Of-Command",
		pp: 15,
		priority: 0,
		flags: {snatch: 1, metronome: 1, wind: 1},
		sideCondition: 'Banner-Of-Command',
		condition: {
			duration: 4,
			onSideStart(side, source) {
					this.add('-sidestart', side, 'move: Banner-Of-Command');
			},
			onBasePowerPriority: 9,
			onBasePower(basePower, attacker, defender, move) {
				if (move.category !== 'Status') {
					this.debug('Banner-Of-Command boost');
					return this.chainModify(1.1);
				}
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 5,
			onSideEnd(side) {
				this.add('-sideend', side, 'move: Banner-Of-Command');
			},
		},
		secondary: null,
		target: "allySide",
		type: "Flying",
		zMove: {effect: 'crit2'},
		contestType: "Cool",
		shortDesc: "For 4 Turns, moves used on user's side have 1.1x power.",
	},
	crescentarc: {
		num: 2011,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		name: "Crescent Arc",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Fairy",
		contestType: "Beautiful",
		shortDesc: "Hits all adjacent opponents",
	},
	brinebucket: {
		num: 2012,
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		name: "Brine Bucket",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		self: {
			onHit(source){
				for (const side of source.side.foeSidesWithConditions()) {
					side.addSideCondition('brinebucket');
				}
			},
		},
		condition: {
			duration: 3,
			onSideStart(targetSide) {
				this.add('-sidestart', targetSide, 'Brine Bucket');
			},
			onResidualOrder: 5,
			onResidualSubOrder: 1,
			onResidual(target) {
				if (!target.hasType('Water')) this.damage(target.baseMaxhp / 8, target);
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 11,
			onSideEnd(targetSide) {
				this.add('-sideend', targetSide, 'Brine Bucket');
			},
		},
		secondary: null,
		target: "adjacentFoe",
		type: "Water",
		contestType: "Cool",
		shortDesc: "Foes: -1/8 HP for 3 turns. Water types immune",
	},
	floraconda: {
		num: 2013,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Floraconda",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		self: {
			onHit(source) {
				for (const side of source.side.foeSidesWithConditions()) {
					side.addSideCondition('floraconda');
				}
			},
		},
		condition: {
			duration: 4,
			onSideStart(targetSide) {
				this.add('-sidestart', targetSide, 'Floraconda');
			},
			onResidualOrder: 5,
			onResidualSubOrder: 1,
			onResidual(target) {
				if (!target.hasType('Grass')) this.damage(target.baseMaxhp / 8, target);
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 11,
			onSideEnd(targetSide) {
				this.add('-sideend', targetSide, 'Floraconda');
			},
		},
		secondary: null,
		target: "adjacentFoe",
		type: "Grass",
		contestType: "Cool",
		shortDesc: "Foes: -1/8 HP for 4 turns. Grass types immune",
	},
	megiddo: {
		num: 2014,
		accuracy: 100,
		basePower: 20,
		category: "Special",
		name: "Megiddo",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		secondary: null,
		target: "normal",
		type: "Ground",
		contestType: "Tough",
		shortDesc: "No additional effect.",
	},
	aebersreckoning: {
		num: 2015,
		accuracy: 100,
		basePower: 95,
		category: "Physical",
		name: "Aeber's Reckoning",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		overrideOffensiveStat: 'spe',
		secondary: null,
		target: "normal",
		type: "Dark",
		shortDesc: "Uses user's speed stat in damage calculation",
	},
	veil: {
		num: 2016,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Veil",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, nonsky: 1, noassist: 1, failcopycat: 1},
		stallingMove: true,
		sideCondition: 'veil',
		onTry(source) {
			if (source.activeMoveActions > 1) {
				this.hint("Veil only works on your first turn out.");
				return false;
			}
			return !!this.queue.willAct();
		},
		condition: {
			duration: 1,
			onSideStart(target, source) {
				this.add('-singleturn', source, 'Veil');
			},
			onTryHitPriority: 3,
			onTryHit(target, source, move) {
				if (!move.flags['protect']) {
					if (['gmaxoneblow', 'gmaxrapidflow'].includes(move.id)) return;
					if (move.isZ || move.isMax) target.getMoveHitData(move).zBrokeProtect = true;
					return;
				}
				if (move && (move.target === 'self' || move.category === 'Status')) return;
				this.add('-activate', target, 'move: Veil', move.name);
				const lockedmove = source.getVolatile('lockedmove');
				if (lockedmove) {
					if (source.volatiles['lockedmove'].duration === 2) {
						delete source.volatiles['lockedmove'];
					}
				}
				return this.NOT_FAIL;
			},
		},
		secondary: null,
		target: "allySide",
		type: "Normal",
		zMove: {boost: {def: 1}},
		contestType: "Cool",
		shortDesc: "Protects allies from damaging attacks. Turn 1 only.",
	},
	forceofnature: {
		num: 2017,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		name: "Force-Of-Nature",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onTryHit(target, source, move) {
			if (source.isAlly(target)) {
				move.basePower = 0;
				move.infiltrates = true;
			}
		},
		onTryMove(source, target, move) {
			if (source.isAlly(target) && source.volatiles['healblock']) {
				this.attrLastMove('[still]');
				this.add('cant', source, 'move: Heal Block', move);
				return false;
			}
		},
		onHit(target, source, move) {
			if (source.isAlly(target)) {
				if (!this.heal(Math.floor(target.baseMaxhp * 0.25))) {
					if (target.volatiles['healblock'] && target.hp !== target.maxhp) {
						this.attrLastMove('[still]');
						// Wrong error message, correct one not supported yet
						this.add('cant', source, 'move: Heal Block', move);
					} else {
						this.add('-immune', target);
					}
					return this.NOT_FAIL;
				}
			}
		},
		onModifyMove(move, source, target) {
			if (!source.isAlly(target)) {
				move.target = 'allAdjacentFoes';
			}
		},
		secondary: null,
		target: "normal",
		type: "Poison",
		contestType: "Cute",
		shortDesc: "Heals target for 1/4 max HP if ally. If foe, Hits all adjacent opponents.",
	},
	selfrepairing: {
		num: -6,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Self-Repairing",
		pp: 10,
		priority: 0,
		flags: { snatch: 1, heal: 1, bypasssub: 1 },
		heal: [1, 3],
		self: {
			volatileStatus: 'selfrepairing',
		},
		condition: {
			onStart(pokemon) {
				this.add('-singlemove', pokemon, 'Self-Repairing');
			},
			onAfterMoveSecondarySelfPriority: -1,
			onAfterMoveSecondarySelf(pokemon, target, move) {
				if (move.category === 'Status' && move.id !== 'selfrepairing') {
					this.heal(pokemon.baseMaxhp / 4);
					pokemon.removeVolatile('selfrepairing');
				}
			},
		},
		onBeforeMovePriority: 100,
		onBeforeMove(pokemon) {
			this.debug('removing Self Repairing before attack');
			pokemon.removeVolatile('selfrepairing');
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Shift Gear", source);
			this.add('-anim', source, "Recover", source);
		},
		rating: 3,
		desc: "Heals 33% of HP. When this Pokemon uses a status move, this Pokemon heals 25% of its max HP.",
		shortDesc: "Heals 1/3 max HP; 1/4 extra after status move.",
		secondary: null,
		target: "allies",
		type: "Steel",
	},
	strongvigor: {
		num: 2018,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Strong Vigor",
		pp: 5,
		priority: 0,
		flags: {snatch: 1, metronome: 1},
		heal: [1, 3],
		onHit(pokemon) {
			if (['', 'slp', 'frz'].includes(pokemon.status)) return false;
			pokemon.cureStatus();
		},
		secondary: null,
		target: "self",
		type: "Normal",
		zMove: {effect: 'heal'},
		contestType: "Cute",
		shortDesc: "Heals 1/3 user's max HP and cures user's burn, poison, or paralysis",
	},
	elementalbreak: {
		num: 2019,
		accuracy: 85,
		basePower: 90,
		category: "Special",
		name: "Elemental Break",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		condition: {
			noCopy: true,
			duration: 3,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Elemental Break');
			},
			onUpdate(pokemon) {
				if (this.effectState.source && !this.effectState.source.isActive) {
					pokemon.removeVolatile('elementalbreak');
				}
			},
			onResidualOrder: 14,
			onResidual(pokemon) {
				this.boost({spd: -1}, pokemon, this.effectState.source);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Elemental Break', '[silent]');
			},
		},
		secondary: {
			chance: 100,
			volatileStatus: 'elementalbreak',
		},
		target: "normal",
		type: "Normal",
		shortDesc: "Target's Spd is lowered by 1 stage for 2 turns.",
	},
	fierystabs: {
		num: 3000,
		accuracy: 90,
		basePower: 45,
		category: "Physical",
		name: "Fiery Stabs",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		multihit: 2,
		self: {
			volatileStatus: 'laserfocus',
		},
		secondary: null,
		target: "normal",
		type: "Fire",
		maxMove: {basePower: 130},
		contestType: "Tough",
		shortDesc: "Hits 2 times. User gains Laser Focus on each hit.",
	},
	physic: {
		num: 3001,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Physic",
		pp: 5,
		priority: 0,
		flags: {snatch: 1, heal: 1, metronome: 1},
		heal: [1, 2],
		secondary: null,
		target: "adjacentAllyOrSelf",
		type: "Normal",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Clever",
		shortDesc: "Heals target for 50% of their max HP.",
	},
};
