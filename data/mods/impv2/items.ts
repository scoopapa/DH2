export const Items: {[itemid: string]: ItemData} = {
	sunflower: {
		name: "Sunflower",
		fling: {
			basePower: 60,
		},
		spritenum: 475,
		onSourceModifyAccuracyPriority: 4,
		onSourceModifyAccuracy(accuracy) {
			if (typeof accuracy === 'number') {
				return accuracy * 2;
			}
		},
		itemUser: ["heliolisk-sirfetchd"],
		num: 259,
		gen: 8,
	},
};
