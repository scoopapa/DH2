export const Moves: {[k: string]: ModdedMoveData} = {
	fertilize: {
		num: -1,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		shortDesc: "50% chance to inflict Leech Seed on foe.",
		name: "Fertilize",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Mud Shot", target);
			this.add('-anim', source, "Leech Seed", target);
		},
		secondary: {
			chance: 50,
			volatileStatus: 'leechseed',
		},
		target: "normal",
		type: "Rock",
	},
	mycamel: {
		num: -2,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Raises user's SpA, SpD and Spe by 1; 2 in Sun.",
		name: "MYCAMEL",
		pp: 5,
		priority: 0,
		flags: {snatch: 1, metronome: 1},
		onModifyMove(move, pokemon) {
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) move.boosts = {spa: 2, spd: 2, spe: 2};
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Growth", target);
		},
		boosts: {
			spa: 1,
			spd: 1,
			spe: 1,
		},
		secondary: null,
		target: "self",
		type: "Normal",
	},
	dragoncall: {
		num: -3,
		accuracy: 100,
		basePower: 85,
		category: "Special",
		shortDesc: "100% chance to raise the user's Sp. Atk by 1.",
		name: "Dragon Call",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, bypasssub: 1, metronome: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Boomburst", target);
		},
		secondary: {
			chance: 100,
			self: {
				boosts: {
					spa: 1,
				},
			},
		},
		target: "normal",
		type: "Dragon",
	},
};
