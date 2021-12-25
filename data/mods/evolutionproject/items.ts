export const Items: {[itemid: string]: ModdedItemData} = {
	luckypunch: {
		name: "Lucky Punch",
		desc: "If held by Chansey or Lediluck, its critical hit ratio is raised by 2 stages.",
		spritenum: 261,
		fling: {
			basePower: 40,
		},
		onModifyCritRatio(critRatio, user) {
			if (user.baseSpecies.name === 'Chansey' || user.baseSpecies.name === 'Lediluck') {
				return critRatio + 2;
			}
		},
		itemUser: ["Chansey", "Lediluck"],
		num: 256,
		gen: 2,
	},
};
