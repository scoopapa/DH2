export const Moves: {[k: string]: ModdedMoveData} = {
	lightsaunter: {
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Light Saunter",
		shortDesc: "10% chance to raise the user's Speed by 1.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Thrash", target);
		},
		secondary: {
			chance: 10,
			self: {
				boosts: {
					spe: 1,
				}
			}
		},
		target: "normal",
		type: "Flying",
	},
};