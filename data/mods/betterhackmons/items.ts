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
		rating: 3,
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
		rating: 3,
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (this.field.getPseudoWeather('gravity') && move.category === "Physical") {
				return this.chainModify(1.5);
			}
		},
	},
	
	//reordering
	//down
	aguavberry: {
		inherit: true,
		rating: 2,
	},
	expertbelt: {
		inherit: true,
		rating: 2,
	},
	figyberry: {
		inherit: true,
		rating: 2,
	},
	iapapaberry: {
		inherit: true,
		rating: 2,
	},
	magoberry: {
		inherit: true,
		rating: 2,
	},
	mentalherb: {
		inherit: true,
		rating: 2,
	},
	powerherb: {
		inherit: true,
		rating: 2,
	},
	salacberry: {
		inherit: true,
		rating: 2,
	},
	wikiberry: {
		inherit: true,
		rating: 2,
	},
	
	//up
	abilityshield: {
		inherit: true,
		rating: 3,
	},
	covertcloak: {
		inherit: true,
		rating: 3,
	},
	ejectbutton: {
		inherit: true,
		rating: 3,
	},
	flameorb: {
		inherit: true,
		rating: 3,
	},
	redcard: {
		inherit: true,
		rating: 3,
	},
	shedshell: {
		inherit: true,
		rating: 3,
	},
	toxicorb: {
		inherit: true,
		rating: 3,
	},
}
