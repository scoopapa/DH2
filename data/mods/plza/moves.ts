export const Moves: import('../../../sim/dex-moves').ModdedMoveDataTable = {
	nihillight: {
		accuracy: 100,
		basePower: 200,
		category: "Special",
		shortDesc: "Ignores the foe(s)'s immunities and stat changes.",
		isNonstandard: "Past",
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
};
