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
	meowthofaloliumz: {
		name: "Meowthofalolium Z",
		spritenum: 646,
		onTakeItem: false,
		zMove: "infinite baseball reaction",
		zMoveFrom: "Parting Shot",
		itemUser: ["Meowth-Alola"],
		num: -1,
		gen: 9,
		desc: "If held by a Meowth-Alola with Parting Shot, it can use infinite baseball reaction.",
	},
};
