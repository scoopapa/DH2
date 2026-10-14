export const Moves: {[moveid: string]: ModdedMoveData} = {
	fierystabs: {
		num: 3000,
		accuracy: 90,
		basePower: 45,
		category: "Physical",
		name: "Fiery Stabs",
		pp: 15,
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
		desc: "Hits 2 times. User gains Laser Focus on each hit",
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
	},
	jarringjingle: {
		num: 3002,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Jarring Jingle",
		pp: 20,
		priority: -6,
		flags: {reflectable: 1, mirror: 1, bypasssub: 1, allyanim: 1, metronome: 1, noassist: 1, failcopycat: 1, wind: 1},
		forceSwitch: true,
		secondary: null,
		target: "normal",
		type: "Steel",
		zMove: {boost: {spd: 1}},
		contestType: "Clever",
		shortDesc: "Forces target to switch to a random ally.",
	},
	digestion: {
		num: 3003,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Digestion",
		pp: 5,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, metronome: 1},
		volatileStatus: 'digestion',
		condition: {
			onStart(target) {
				this.add('-start', target, 'move: Digestion');
			},
			onResidualOrder: 8,
			onResidual(pokemon) {
				const target = this.getAtSlot(pokemon.volatiles['digestion'].sourceSlot);
				if (!target || target.fainted || target.hp <= 0) {
					this.debug('Cant Digest the Target');
					return;
				}
				const damage = this.damage(pokemon.baseMaxhp / 6, pokemon, target);
				if (damage && target.volatiles['partiallytrapped']) {
					this.heal(damage, target, pokemon);
				}
			},
		},
		secondary: null,
		target: "normal",
		type: "Grass",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Clever",
		shortDesc: "If target is trapped. User recovers 1/6 of target's hp.",
	},
	gravapple: {
		num: 788,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Grav Apple",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		pseudoWeather: 'gravity',
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
		type: "Grass",
		shortDesc: "Target: 100% -1 Def. In Gravity: 1.5x power. Sets Gravity",
	},
};
