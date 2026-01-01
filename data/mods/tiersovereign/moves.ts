export const Moves: {[moveid: string]: ModdedMoveData} = {
	/*
	placeholder: {
		name: "",
		type: "",
		category: "",
		basePower: 0,
		accuracy: 100,
		pp: 10,
		shortDesc: "",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "", target);
		},
		secondary: null,
		target: "normal",
	},
	*/
	calamityquake: {
		num: -1,
		accuracy: 100,
		basePower: 75,
		category: "Special",
		name: "Calamity Quake",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Precipice Blades", target);
		},
		secondary: {
			chance: 30,
			status: 'psn',
		},
		target: "allAdjacentFoes",
		type: "Ground",
		contestType: "Cool",
		desc: "Has a 30% chance to inflict Poison to the target.",
		shortDesc: "30% chance to inflict Poison to the target.",
	},
	bigslap: {
		num: -2,
		accuracy: 100,
		basePower: 130,
		category: "Physical",
		name: "Big Slap",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1, cantusetwice: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Brick Break", target);
		},
		secondary: null,
		target: "normal",
		type: "Fighting",
		contestType: "Cool",
		desc: "This move cannot be used consecutively.",
		shortDesc: "Cannot be used consecutively.",
	},
};
