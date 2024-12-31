export const Moves: import('../../../sim/dex-moves').ModdedMoveDataTable = {
	arcanerush: {
		accuracy: 100,
		basePower: 70,
		category: "Special",
		shortDesc: "Always crits in Electric Terrain. Sets Electric Terrain if not up.",
		name: "Arcane Rush",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		terrain: 'electricterrain',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Dynamax Cannon", target);
		},
		onModifyMove(move, pokemon) {
			if (this.field.isTerrain('electricterrain')) {
				move.willCrit = true;
			}
		},
		secondary: null,
		target: "normal",
		type: "Dragon",
		contestType: "Cool",
	},
	// non-new moves
	teraused: {
		shortDesc: "Prevents Terastalization from being used multiple times.",
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Tera Used",
		pp: 5,
		priority: 0,
		flags: {nosketch: 1},
		sideCondition: 'teraused',
		condition: {},
		secondary: null,
		target: "normal",
		type: "Rock",
	},
};
