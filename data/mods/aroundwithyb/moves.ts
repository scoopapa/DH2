export const Moves: {[k: string]: ModdedMoveData} = {



 // Old Moves
	direclaw: {
		num: 827,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		shortDesc: "50% chance to freeze, poison, or paralyze target.",
		name: "Dire Claw",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 50,
			onHit(target, source) {
				const result = this.random(3);
				if (result === 0) {
					target.trySetStatus('psn', source);
				} else if (result === 1) {
					target.trySetStatus('par', source);
				} else {
					target.trySetStatus('frz', source);
				}
			},
		},
		target: "normal",
		type: "Poison",
	},
	facade: {
		num: 263,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		shortDesc: "Power doubles if user is statused.",
		name: "Facade",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onBasePower(basePower, pokemon) {
			if (pokemon.status || pokemon.hasAbility('comatose')) {
				return this.chainModify(2);
			}
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Cute",
	},
	boltbeak: {
		inherit: true,
		isNonstandard: null,
	},
	fishiousrend: {
		inherit: true,
		isNonstandard: null,
	},
	meteorassault: {
		inherit: true,
		isNonstandard: null,
	},
	defog: {
		inherit: true,
		flags: {protect: 1, reflectable: 1, mirror: 1, bypasssub: 1, wind: 1},
	},
	xscissor: {
		num: 404,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		shortDesc: "High critical hit ratio.",
		name: "X-Scissor",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, slicing: 1},
		critRatio: 2,
		secondary: null,
		target: "normal",
		type: "Bug",
		contestType: "Cool",
	},
	dragonclaw: {
		num: 337,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		shortDesc: "High critical hit ratio.",
		name: "Dragon Claw",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		critRatio: 2,
		secondary: null,
		target: "normal",
		type: "Dragon",
		contestType: "Cool",
	},
	muddywater: {
		num: 330,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		shortDesc: "30% chance to lower the foe(s) SpA.",
		name: "Muddy Water",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, nonsky: 1},
		secondary: {
			chance: 30,
			boosts: {
				spa: -1,
			},
		},
		target: "allAdjacentFoes",
		type: "Water",
		contestType: "Tough",
	},
	multiattack: {
		inherit: true,
		isNonstandard: null,
	},
	oblivionwing: {
		inherit: true,
		isNonstandard: null,
	},
	geomancy: {
		inherit: true,
		isNonstandard: null,
	},
	thousandwaves: {
		inherit: true,
		isNonstandard: null,
	},
	thousandarrows: {
		inherit: true,
		isNonstandard: null,
	},
	coreenforcer: {
		inherit: true,
		isNonstandard: null,
	},
	landswrath: {
		inherit: true,
		isNonstandard: null,
	},
	iondeluge: {
		inherit: true,
		isNonstandard: null,
	},
	kingsshield: {
		inherit: true,
		isNonstandard: null,
	},
	kinesis: {
		inherit: true,
		isNonstandard: null,
	},
	stormthrow: {
		inherit: true,
		isNonstandard: null,
	},
	steamroller: {
		inherit: true,
		isNonstandard: null,
	},
	electrify: {
		inherit: true,
		isNonstandard: null,
	},
	boneclub: {
		inherit: true,
		isNonstandard: null,
	},
	bonemerang: {
		inherit: true,
		isNonstandard: null,
	},
	shadowbone: {
		inherit: true,
		isNonstandard: null,
	},
	matblock: {
		inherit: true,
		isNonstandard: null,
	},
	chatter: {
		inherit: true,
		isNonstandard: null,
	},
	snaptrap: {
		inherit: true,
		isNonstandard: null,
	},
	trickortreat: {
		inherit: true,
		isNonstandard: null,
	},
	lovelykiss: {
		inherit: true,
		isNonstandard: null,
	},
	lightofruin: {
		inherit: true,
		isNonstandard: null,
	},
	firepledge: {
		num: 519,
		accuracy: 100,
		basePower: 80,
		basePowerCallback(target, source, move) {
			if (['grasspledge', 'waterpledge'].includes(move.sourceEffect)) {
				this.add('-combine');
				return 150;
			}
			return 80;
		},
		category: "Special",
		name: "Fire Pledge",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, nonsky: 1, pledgecombo: 1},
		onPrepareHit(target, source, move) {
			for (const action of this.queue.list as MoveAction[]) {
				if (
					!action.move || !action.pokemon?.isActive ||
					action.pokemon.fainted || action.maxMove || action.zmove
				) {
					continue;
				}
				if (action.pokemon.isAlly(source) && ['grasspledge', 'waterpledge'].includes(action.move.id)) {
					this.queue.prioritizeAction(action, move);
					this.add('-waiting', source, action.pokemon);
					return null;
				}
			}
		},
		onModifyMove(move) {
			if (move.sourceEffect === 'waterpledge') {
				move.type = 'Water';
				move.forceSTAB = true;
				move.self = {sideCondition: 'waterpledge'};
			}
			if (move.sourceEffect === 'grasspledge') {
				move.type = 'Fire';
				move.forceSTAB = true;
				move.sideCondition = 'firepledge';
			}
		},
		condition: {
			duration: 4,
			onSideStart(targetSide) {
				this.add('-sidestart', targetSide, 'Fire Pledge');
			},
			onResidualOrder: 5,
			onResidualSubOrder: 1,
			onResidual(pokemon) {
				if (!pokemon.hasType('Fire')) this.damage(pokemon.baseMaxhp / 6, pokemon);
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 8,
			onSideEnd(targetSide) {
				this.add('-sideend', targetSide, 'Fire Pledge');
			},
		},
		secondary: null,
		target: "normal",
		type: "Fire",
		contestType: "Beautiful",
	},
	waterpledge: {
		num: 518,
		accuracy: 100,
		basePower: 80,
		basePowerCallback(target, source, move) {
			if (['firepledge', 'grasspledge'].includes(move.sourceEffect)) {
				this.add('-combine');
				return 150;
			}
			return 80;
		},
		category: "Special",
		name: "Water Pledge",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, nonsky: 1, pledgecombo: 1},
		onPrepareHit(target, source, move) {
			for (const action of this.queue) {
				if (action.choice !== 'move') continue;
				const otherMove = action.move;
				const otherMoveUser = action.pokemon;
				if (
					!otherMove || !action.pokemon || !otherMoveUser.isActive ||
					otherMoveUser.fainted || action.maxMove || action.zmove
				) {
					continue;
				}
				if (otherMoveUser.isAlly(source) && ['firepledge', 'grasspledge'].includes(otherMove.id)) {
					this.queue.prioritizeAction(action, move);
					this.add('-waiting', source, otherMoveUser);
					return null;
				}
			}
		},
		onModifyMove(move) {
			if (move.sourceEffect === 'grasspledge') {
				move.type = 'Grass';
				move.forceSTAB = true;
				move.sideCondition = 'grasspledge';
			}
			if (move.sourceEffect === 'firepledge') {
				move.type = 'Water';
				move.forceSTAB = true;
				move.self = {sideCondition: 'waterpledge'};
			}
		},
		condition: {
			duration: 4,
			onSideStart(targetSide) {
				this.add('-sidestart', targetSide, 'Water Pledge');
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 7,
			onSideEnd(targetSide) {
				this.add('-sideend', targetSide, 'Water Pledge');
			},
  		onModifyDamage(damage, source, target, move) {
				if (target !== source && this.effectState.target.hasAlly(target)) {
  				return this.chainModify([5324, 4096]);
  			}
  		},
		},
		secondary: null,
		target: "normal",
		type: "Water",
		contestType: "Beautiful",
	},
	lightthatburnsthesky: {
		num: 723,
		accuracy: true,
		basePower: 200,
		category: "Special",
		isNonstandard: "Past",
		name: "Light That Burns the Sky",
		pp: 1,
		priority: 0,
		flags: {},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		ignoreAbility: true,
		isZ: "psychiumz",
		secondary: null,
		target: "normal",
		type: "Psychic",
		contestType: "Cool",
	},
	zippyzap: {
		num: 729,
		accuracy: 100,
		basePower: 50,
		category: "Special",
		shortDesc: "Nearly always goes first. Always crits.",
		isNonstandard: null,
		name: "Zippy Zap",
		pp: 10,
		priority: 2,
		flags: {contact: 1, protect: 1, mirror: 1},
		willCrit: true,
		secondary: null,
		target: "normal",
		type: "Electric",
		contestType: "Cool",
	},
	psychicnoise: {
		num: 917,
		accuracy: 100,
		basePower: 75,
		category: "Special",
		name: "Psychic Noise",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, bypasssub: 1},
		secondary: {
			chance: 100,
			volatileStatus: 'healblock',
		},
		target: "allAdjacentFoes",
		type: "Psychic",
	},
	nightdaze: {
		num: 539,
		accuracy: 90,
		basePower: 100,
		category: "Special",
		shortDesc: "Clears weather if it hits.",
		name: "Night Daze",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onHit() {
			this.field.clearWeather();
		},
		onAfterSubDamage() {
			this.field.clearWeather();
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Dark",
		contestType: "Cool",
	},
	dragoncheer: {
		num: 913,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "User or Ally: Crit ratio +1, or +2 if target is Dragon type.",
		name: "Dragon Cheer",
		pp: 15,
		priority: 0,
		flags: {bypasssub: 1, allyanim: 1},
		volatileStatus: 'dragoncheer',
		condition: {
			onStart(target, source, effect) {
				if (target.volatiles['focusenergy']) return false;
				if (effect && (['costar', 'imposter', 'psychup', 'transform'].includes(effect.id))) {
					this.add('-start', target, 'move: Dragon Cheer', '[silent]');
				} else {
					this.add('-start', target, 'move: Dragon Cheer');
				}
				// Store at the start because the boost doesn't change if a Pokemon
				// Terastallizes into Dragon while having this volatile
				// Found by DarkFE:
				// https://www.smogon.com/forums/threads/scarlet-violet-battle-mechanics-research.3709545/post-9894139
				this.effectState.hasDragonType = target.hasType("Dragon");
			},
			onModifyCritRatio(critRatio, source) {
				return critRatio + (this.effectState.hasDragonType ? 2 : 1);
			},
		},
		secondary: null,
		target: "adjacentAllyOrSelf",
		type: "Dragon",
	},
	upperhand: {
		num: 918,
		accuracy: 100,
		basePower: 65,
		category: "Physical",
		name: "Upper Hand",
		pp: 15,
		priority: 3,
		flags: {contact: 1, protect: 1, mirror: 1},
		onTryHit(target, pokemon) {
			const action = this.queue.willMove(target);
			const move = action?.choice === 'move' ? action.move : null;
			if (!move || move.priority <= 0.1) {
				return false;
			}
		},
		secondary: {
			chance: 100,
			volatileStatus: 'flinch',
		},
		target: "normal",
		type: "Fighting",
	},
};
