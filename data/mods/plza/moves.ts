export const Moves: import('../../../sim/dex-moves').ModdedMoveDataTable = {
	nihillight: {
		accuracy: 100,
		basePower: 200,
		category: "Special",
		shortDesc: "Ignores the foe(s)'s immunities and stat changes.",
		isNonstandard: null,
		name: "Nihil Light",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		ignoreImmunity: true,
		ignoreEvasion: true,
		ignoreDefensive: true,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Core Enforcer", source);
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Dragon",
		zMove: {basePower: 140},
		contestType: "Tough",
	},
	healblock: {
		inherit: true,
		isNonstandard: null,
	},
	poweruppunch: {
		inherit: true,
		isNonstandard: null,
	},
	landswrath: {
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
	trickortreat: {
		inherit: true,
		isNonstandard: null,
	},
	kingsshield: {
		inherit: true,
		isNonstandard: null,
	},
	geomancy: {
		inherit: true,
		isNonstandard: null,
	},
	oblivionwing: {
		inherit: true,
		isNonstandard: null,
	},
	lightofruin: {
		inherit: true,
		isNonstandard: null,
	},
};
