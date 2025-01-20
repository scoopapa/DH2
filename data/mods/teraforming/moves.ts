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
	firelash: {
		num: 680,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		shortDesc: "100% chance to lower the target's Sp. Defense by 1.",
		name: "Booming Sands",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, sound: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Round", target);
			this.add('-anim', source, "Stomping Tantrum", target);
		},
		secondary: {
			chance: 100,
			boosts: {
				spd: -1,
			},
		},
		target: "normal",
		type: "Ground",
		contestType: "Cute",
	},
	
	// non-new moves
	pursuit: {
		inherit: true,
    	isNonstandard: null,
	},
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
