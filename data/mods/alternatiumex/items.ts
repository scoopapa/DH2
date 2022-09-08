export const Items: {[itemid: string]: ItemData} = {
	lightball: {
		name: "Light Ball",
		spritenum: 251,
		fling: {
			basePower: 30,
			status: 'par',
		},
		onModifyAtkPriority: 1,
		onModifyAtk(atk, pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Pikachu-Unova') {
				return this.chainModify(2);
			}
		},
		onModifySpAPriority: 1,
		onModifySpA(spa, pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Pikachu-Unova') {
				return this.chainModify(2);
			}
		},
		itemUser: ["Pikachu-Hoenn", "Pikachu-Unova"],
		shortDesc: "If held by a Pikachu-Unova, its Attack and Sp. Atk are doubled.",
		num: 236,
		gen: 2,
	},
	ultranecroziumz: {
		inherit: true,
		zMove: null,
		zMoveFrom: null,
		itemUser: null,
	},
};