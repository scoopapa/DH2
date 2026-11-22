export const Items: {[itemid: string]: ModdedItemData} = {
	//unchanged
	burndrive: {
		inherit: true,
		isNonstandard: null,
	},
	chilldrive: {
		inherit: true,
		isNonstandard: null,
	},
	dousedrive: {
		inherit: true,
		isNonstandard: null,
	},
	shockdrive: {
		inherit: true,
		isNonstandard: null,
	},
	
	//slate 1
	mail: {
		inherit: true,
		shortDesc: "Cannot be removed by any means.",
		onTakeItem: false,
		isNonstandard: null,
	},
	
	//slate 2
	skarmorite: {
		inherit: true,
		isNonstandard: null,
	},

	//slate 3
	ironball: {
		inherit: true,
		shortDesc: "Iron Ball + Physical attacks have 1.5x power in Gravity.",
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (this.field.getPseudoWeather('gravity') && move.category === "Physical") {
				return this.chainModify(1.5);
			}
		},
	},
}
