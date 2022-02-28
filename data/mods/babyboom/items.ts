export const Items: {[itemid: string]: ItemData} = {
	lightball: {
		inherit: true,
		onModifyAtkPriority: 1,
		onModifyAtk(atk, pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Pichu') {
				return this.chainModify(2);
			}
		},
		onModifySpAPriority: 1,
		onModifySpA(spa, pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Pichu') {
				return this.chainModify(2);
			}
		},
		itemUser: ["Pichu"],
		shortDesc: "If held by a Pichu, its Attack and Sp. Atk are doubled.",
		num: 236,
		gen: 2,
	},
};