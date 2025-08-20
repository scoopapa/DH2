export const Moves: {[k: string]: ModdedMoveData} = {
	rockwrecker: {
		inherit: true,
		isNonstandard: null,
	},
	headcharge: {
		inherit: true,
		isNonstandard: null,
	},
	cleaveweave: {
			num: -1,
			accuracy: 100,
			basePower: 80,
			category: "Special",
			overrideDefensiveStat: 'def',
			name: "Cleave Weave",
			shortDesc: "Damages target based on Defense, not Sp. Def.",
			pp: 10,
			priority: 0,
			flags: {protect: 1, mirror: 1, metronome: 1},
			secondary: null,
			target: "normal",
			type: "Dark",
			contestType: "Beautiful",
		},
};
