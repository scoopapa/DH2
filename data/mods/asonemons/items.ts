export const Items: {[k: string]: ModdedItemData} = {
	leek: {
		name: "Leek",
		fling: {
			basePower: 60,
		},
		spritenum: 475,
		onModifyCritRatio(critRatio, user) {
			if (["farfetchd", "sirfetchd", "sirfetchdfantasy"].includes(this.toID(user.baseSpecies.baseSpecies))) {
				return critRatio + 2;
			}
		},
		itemUser: ["Farfetch\u2019d", "Sirfetch\u2019d", "Sirfetch\u2019d-Fantasy"],
		num: 259,
		gen: 8,
    desc: "If held by a Farfetch’d, Sirfetch’d, or Sirfetch'd-Fantasy, its critical hit ratio is raised by 2 stages.",
	},
};

