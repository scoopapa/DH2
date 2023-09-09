export const Items: {[itemid: string]: ModdedItemData} = {
	souldew: {
		inherit: true,
		desc: "If held by a Latias, its Sp. Atk and Sp. Def are 1.3x.",
		onBasePower() {},
		onModifySpAPriority: 1,
		onModifySpA(spa, pokemon) {
			if (pokemon.baseSpecies.num === 380) {
				return this.chainModify([5325, 4096]);
			}
		},
		onModifySpDPriority: 2,
		onModifySpD(spd, pokemon) {
			if (pokemon.baseSpecies.num === 380) {
				return this.chainModify([5325, 4096]);
			}
		},
		isNonstandard: null,
	},
};