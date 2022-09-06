export const Moves: {[moveid: string]: MoveData} = {
	duststorm: {
		num: -1,
		accuracy: 75,
		basePower: 100,
		category: "Physical",
		name: "Dust Storm",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		volatileStatus: 'partiallytrapped',
		secondary: null,
		target: "normal",
		type: "Ground",
		contestType: "Tough",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hurricane", target);
		},
	},
};