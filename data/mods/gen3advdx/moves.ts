export const Moves: import('../../../sim/dex-moves').ModdedMoveDataTable = {
	wingattack: {
    inherit: true,
		basePower: 75,
	},
	leafblade: {
    inherit: true,
		basePower: 85,
	},
	hail: {
		num: 258,
		accuracy: true,
		basePower: 0,
		category: "Status",
		isNonstandard: null,
		name: "Hail",
		pp: 10,
		priority: 0,
		flags: {metronome: 1},
		weather: 'snow',
		secondary: null,
		target: "all",
		type: "Ice",
		zMove: {boost: {spe: 1}},
		contestType: "Beautiful",
	},
	blizzard: {
		num: 59,
		accuracy: 70,
		basePower: 110,
		category: "Special",
		name: "Blizzard",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, wind: 1},
		onModifyMove(move) {
			if (this.field.isWeather(['hail', 'snow'])) move.accuracy = true;
		},
		secondary: {
			chance: 10,
			status: 'frz',
		},
		target: "allAdjacentFoes",
		type: "Ice",
		contestType: "Beautiful",
	},
	meanlook: {
		num: 212,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Mean Look",
		pp: 5,
		priority: 0,
		flags: {reflectable: 1, mirror: 1, metronome: 1},
		onHit(target, source, move) {
  			if (!target.hasAbility('runaway')) {
				return target.addVolatile('trapped', source, move, 'trapper');
			}
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		zMove: {boost: {spd: 1}},
		contestType: "Beautiful",
	},
};
