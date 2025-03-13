export const Moves: {[moveid: string]: MoveData} = {
	magnalance: {
		num: 2000,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		name: "Magna Lance",
		shortDesc: "Usually goes first. Fails if target is not attacking.",
		pp: 5,
		priority: 1,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		onTry(source, target) {
			const action = this.queue.willMove(target);
			const move = action?.choice === 'move' ? action.move : null;
			if (!move || (move.category === 'Status' && move.id !== 'mefirst') || target.volatiles['mustrecharge']) {
				return false;
			}
		},
		secondary: null,
		target: "normal",
		type: "Fire",
		contestType: "Clever",
	},
	eggbarrage: {
		num: 2001,
		accuracy: 90,
		basePower: 20,
		basePowerCallback(pokemon, target, move) {
			return 20 * move.hit;
		},
		category: "Physical",
		name: "Egg Barrage",
		shortDesc: "Hits 3 times. Each hit can miss, but power rises.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		multihit: 3,
		multiaccuracy: true,
		secondary: null,
		target: "normal",
		type: "Normal",
		zMove: {basePower: 120},
		maxMove: {basePower: 140},
	},
	glidebomb: {
		num: 2002,
		accuracy: 100,
		basePower: 25,
		category: "Physical",
		name: "Glide Bomb",
		pp: 30,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		multihit: [2, 5],
		secondary: null,
		target: "normal",
		type: "Fire",
		zMove: {basePower: 140},
		maxMove: {basePower: 130},
		contestType: "Beautiful",
	},
	dragonator: {
		num: 2003,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		name: "Dragonator",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onEffectiveness(typeMod, target, type) {
			if (type === 'Dragon') return 1;
		},
		secondary: {
			chance: 10,
			volatileStatus: 'flinch',
		},
		target: "normal",
		type: "Steel",
		contestType: "Beautiful",
	},
	vcreate: {
		num: 557,
		accuracy: 95,
		basePower: 180,
		category: "Physical",
		name: "V-create",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		self: {
			boosts: {
				spe: -1,
				def: -1,
				spd: -1,
			},
		},
		secondary: null,
		target: "normal",
		type: "Fire",
		zMove: {basePower: 220},
		contestType: "Cool",
	},
};
