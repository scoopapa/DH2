export const Items: {[itemid: string]: ModdedItemData} = {
	stick: {
		inherit: true,
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (
				move && (this.toID(user.baseSpecies.baseSpecies) === 'farfetchd') &&
				(move.type === 'Fighting' || move.type === 'Flying')
			) {
				return this.chainModify([4915, 4096]);
			}
		},
		shortDesc: "If farfetchd, power of Fighting and Flying moves 1.2x",
	},
}
