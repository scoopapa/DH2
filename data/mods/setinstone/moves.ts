export const Moves: {[moveid: string]: MoveData} = {
	shortcircuit: {
		num: -1,
		accuracy: 100,
		basePower: 65,
		category: "Physical",
		name: "Short Circuit",
		shortDesc: "Doubles in power if the target is paralyzed.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onBasePower(basePower, pokemon, target) {
			if (target.status === 'par') {
				return this.chainModify(2);
			}
		},
		secondary: null,
		target: "normal",
		type: "Electric",
	},
};