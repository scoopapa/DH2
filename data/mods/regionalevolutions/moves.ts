export const Moves: { [moveid: string]: ModdedMoveData } = {
	fissionbeam: {
		num: -1,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		name: "Fission Beam",
		pp: 15,
		priority: -3,
		flags: {protect: 1, failmefirst: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failinstruct: 1, bullet: 1},
		priorityChargeCallback(pokemon) {
			pokemon.addVolatile('beakblast');
		},
		condition: {
			duration: 1,
			onStart(pokemon) {
				this.add('-singleturn', pokemon, 'move: Fission Beam');
			},
			onHit(target, source, move) {
				if (this.checkMoveMakesContact(move, source, target)) {
					source.trySetStatus('brn', target);
				}
			},
		},
		// FIXME: onMoveAborted(pokemon) {pokemon.removeVolatile('beakblast')},
		onAfterMove(pokemon) {
			pokemon.removeVolatile('beakblast');
		},
		secondary: null,
		target: "normal",
		type: "Poison",
		contestType: "Tough",
		desc: "If the user is hit by a contact move this turn before it can execute this move, the attacker is burned.",
		shortDesc: "Burns on contact with the user before it moves.",

		start: "  [POKEMON] started heating up its beam!",
	},
	timeout: {
		num: -2,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Time Out",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onBasePower(basePower) {
			if (this.field.getPseudoWeather('gravity')) {
				return this.chainModify(1.5);
			}
		},
		secondary: {
			chance: 100,
			boosts: {
				def: -1,
			},
		},
		target: "normal",
		type: "Normal",
		desc: "Has a 100% chance to lower the target's Defense by 1 stage. Power is multiplied by 1.5 during Gravity's effect.",
		shortDesc: "Target: 100% -1 Def. During Gravity: 1.5x power.",
	},
	dreamdust: {
		num: -3,
		accuracy: 75,
		basePower: 0,
		category: "Status",
		name: "Dream Dust",
		pp: 15,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, metronome: 1, powder: 1},
		status: 'slp',
		secondary: null,
		target: "normal",
		type: "Fairy",
		zMove: {boost: {spe: 1}},
		contestType: "Clever",
		shortDesc: "Causes the target to fall asleep.",
	},
	tonguerush: {
		num: -4,
		accuracy: 100,
		basePower: 95,
		category: "Physical",
		name: "Tongue Rush",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		secondary: {
			chance: 20,
			status: 'par',
		},
		onHit(target) {
			if (target.status === 'par') target.addVolatile('confusion');
		},
		target: "normal",
		type: "Dragon",
		contestType: "Cute",
		desc: "Has a 20% chance to paralyze the target. If they are paralyzed, they are instead confused.",
		shortDesc: "20% chance to paralyze the target. Confuses if paralyzed.",
	},
	vitalitydrain: {
		num: -5,
		accuracy: 100,
		basePower: 75,
		category: "Physical",
		name: "Vitality Drain",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, heal: 1, metronome: 1, bite: 1},
		drain: [1, 2],
		secondary: null,
		target: "normal",
		type: "Poison",
		contestType: "Clever",
		desc: "The user recovers 1/2 the HP lost by the target, rounded half up. If Big Root is held by the user, the HP recovered is 1.3x normal, rounded half down.",
		shortDesc: "User recovers 50% of the damage dealt.",
	},
	coraltrap: {
		num: -6,
		accuracy: 100,
		basePower: 150,
		category: "Physical",
		name: "Coral Trap",
		pp: 5,
		priority: -3,
		flags: {protect: 1, failmefirst: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failinstruct: 1},
		priorityChargeCallback(pokemon) {
			pokemon.addVolatile('shelltrap');
		},
		onTryMove(pokemon) {
			if (!pokemon.volatiles['shelltrap']?.gotHit) {
				this.attrLastMove('[still]');
				this.add('cant', pokemon, 'Coral Trap', 'Coral Trap');
				return null;
			}
		},
		condition: {
			duration: 1,
			onStart(pokemon) {
				this.add('-singleturn', pokemon, 'move: Coral Trap');
			},
			onHit(pokemon, source, move) {
				if (!pokemon.isAlly(source) && move.category === 'Physical') {
					this.effectState.gotHit = true;
					const action = this.queue.willMove(pokemon);
					if (action) {
						this.queue.prioritizeAction(action);
					}
				}
			},
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Water",
		contestType: "Tough",
		desc: "Fails unless the user is hit by a physical attack from an opponent this turn before it can execute the move. If the user was hit and has not fainted, it attacks immediately after being hit, and the effect ends. If the opponent's physical attack had a secondary effect removed by the Sheer Force Ability, it does not count for the purposes of this effect.",
		shortDesc: "User must take physical damage before moving.",

		start: "  [POKEMON] set a coral trap!",
		prepare: "  [POKEMON] set a coral trap!",
		cant: "[POKEMON]'s coral trap didn't work!",
	},
	deafeningroar: {
		num: -7,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		name: "Deafening Roar",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, bypasssub: 1, metronome: 1},
		secondary: {
			chance: 10,
			boosts: {
				spd: -1,
			},
		},
		target: "allAdjacent",
		type: "Dragon",
		contestType: "Tough",
		desc: "Hits all adjacent Pokémon and has a 10% chance of lowering the target's SpD by one stage.",
		shortDesc: "10% chance of lowering target's SpD. Hits adjacent Pokemon.",
	},
};
