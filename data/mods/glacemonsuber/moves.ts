export const Moves: { [moveid: string]: ModdedMoveData; } = {
	// slate 1
	aeroblast: {
		inherit: true,
		willCrit: true,
		desc: "This move is always a critical hit unless the target is under the effect of Lucky Chant or has the Battle Armor or Shell Armor Abilities.",
		shortDesc: "Always results in a critical hit.",
	},
	// slate 2
	diamondstorm: {
		inherit: true,
		accuracy: 100,
		basePower: 110,
		pp: 10,
	},
	dracometeor: {
		inherit: true,
		accuracy: 100,
	},
	rockthrow: {
		inherit: true,
		accuracy: 100,
		basePower: 60,
		pp: 10,
		priority: -3,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, noassist: 1, failcopycat: 1},
		forceSwitch: true,
		desc: "If both the user and the target have not fainted, the target is forced to switch out and be replaced with a random unfainted ally. This effect fails if the target is under the effect of Ingrain, has the Suction Cups Ability, or this move hit a substitute.",
		shortDesc: "Forces the target to switch to a random ally.",
	},
	fairywind: {
		inherit: true,
		basePower: 60,
		pp: 10,
		priority: -3,
		flags: {protect: 1, mirror: 1, metronome: 1, noassist: 1, failcopycat: 1, wind: 1},
		forceSwitch: true,
		desc: "If both the user and the target have not fainted, the target is forced to switch out and be replaced with a random unfainted ally. This effect fails if the target is under the effect of Ingrain, has the Suction Cups Ability, or this move hit a substitute.",
		shortDesc: "Forces the target to switch to a random ally.",
	},
	mountaingale: {
		inherit: true,
		accuracy: 100,
		basePower: 60,
		priority: -3,
		flags: {protect: 1, mirror: 1, metronome: 1, noassist: 1, failcopycat: 1},
		secondary: null,
		forceSwitch: true,
		desc: "If both the user and the target have not fainted, the target is forced to switch out and be replaced with a random unfainted ally. This effect fails if the target is under the effect of Ingrain, has the Suction Cups Ability, or this move hit a substitute.",
		shortDesc: "Forces the target to switch to a random ally.",
	},
	circlethrow: {
		inherit: true,
		accuracy: 100,
		priority: -3,
	},
};
