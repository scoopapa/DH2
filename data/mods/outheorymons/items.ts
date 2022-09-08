export const Items: {[itemid: string]: ItemData} = {
	souldew: {
		inherit: true,
		shortDesc: "If held by a Latias/Latios, its STAB moves have 1.2x power.",
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (
				move && ((user.baseSpecies.num === 380) && (move.type === 'Fairy' || move.type === 'Dragon')) 
				|| ((user.baseSpecies.num === 381) && (move.type === 'Dragon' || move.type === 'Electric'))
			) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
	},
};
