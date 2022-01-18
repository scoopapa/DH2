export const Moves: {[moveid: string]: ModdedMoveData} = {
	plaquefang: {
		num: -1001,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		shortDesc: "Poisons the target if the user is statused.",
		name: "Plaque Fang",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Poison Fang", target);
		},
		secondary: {
			chance: 100,
			onHit(target, source, move) {
				if (source.status && source.status !== 'slp') {
					target.trySetStatus('psn', source, move);
				}
			},
		},
		target: "normal",
		type: "Poison",
		contestType: "Clever",
	},
	baddybad: { // Gen VII Baddy Bad for Curski
		accuracy: 100,
		basePower: 90,
		isNonstandard: null,
	},
};
