export const Items: {[itemid: string]: ItemData} = {
	cottoncoat: {
		name: "Cotton Coat",
		spritenum: 1,
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (user.species.id === 'venomoth' && move.type === 'Bug') {
				return this.chainModify(2);
				user.useItem();
			}
		},
		shortDesc: "If held by a Venomoth, Bug-type attacks will do 2x damage. Single use.",
		num: -1,
		gen: 8,
	},
};