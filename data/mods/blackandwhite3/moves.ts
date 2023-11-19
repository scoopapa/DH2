export const Moves: {[k: string]: ModdedMoveData} = {
railwaysmash: {
		num: -1,
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		name: "Railway Smash",
		shortDesc: "Has 33% recoil.",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		recoil: [33, 100],
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Iron Head", target);
		},
		target: "normal",
		type: "Steel",
	},
	enragedtext: {
		num: -2,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		name: "Enraged Text",
		shortDesc: "Raises the user's Atk by 1.",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, sound: 1},
		self: {
			boosts: {
				atk: 1,
			},
		},
		secondary: null,
		target: "self",
		type: "Fighting",
		contestType: "Clever",
	},
}
