export const Moves: {[k: string]: ModdedMoveData} = {
	mudbomb: {
		num: 426,
		accuracy: 85,
		basePower: 65,
		category: "Special",
		isNonstandard: "Past",
		name: "Mud Bomb",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, bullet: 1},
		condition: {
			noCopy: true,
			duration: 4,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Mud Bomb');
			},
			onUpdate(pokemon) {
				if (this.effectState.source && !this.effectState.source.isActive) {
					pokemon.removeVolatile('syrupbomb');
				}
			},
			onResidualOrder: 14,
			onResidual(pokemon) {
				this.boost({spe: -1}, pokemon, this.effectState.source);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Mud Bomb', '[silent]');
			},
		},
		target: "normal",
		type: "Ground",
		contestType: "Cute",
		secondary: {
			chance: 100,
			volatileStatus: 'syrupbomb',
		},
		shortDesc: "Target's Speed is lowered by 1 stage for 3 turns.",
	},
	batonpass: {
		inherit: true,
		desc: "The user is replaced with another Pokemon in its party. The selected Pokemon has the user's stat stage deductions, confusion, and certain move effects transferred to it.",
		shortDesc: "Modified Baton Pass. Positive boosts are reset.",
	},
	luminacrash: {
		num: 855,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Lumina Crash",
		pp: 5, //the change
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		secondary: {
			chance: 100,
			boosts: {
				spd: -2,
			},
		},
		target: "normal",
		type: "Psychic",
	},
	watershuriken: {
		num: 594,
		accuracy: 100,
		basePower: 15,
		basePowerCallback(pokemon, target, move) {
			if (pokemon.species.name === 'Greninja-Ash' && pokemon.hasAbility('battlebond') &&
				!pokemon.transformed) {
				return move.basePower + 5;
			}
			return move.basePower;
		},
		category: "Physical", //the change
		name: "Water Shuriken",
		pp: 20,
		priority: 1,
		flags: {protect: 1, mirror: 1, metronome: 1},
		multihit: [2, 5],
		secondary: null,
		target: "normal",
		type: "Water",
		contestType: "Cool",
	},
};

