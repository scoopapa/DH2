export const Items: {[itemid: string]: ModdedItemData} = {
        shakujo: {
		name: "Shakujo",
		fling: {
			basePower: 40,
			status: 'par',
		},
		onModifySpAPriority: 1,
		onModifySpA(spa, pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Pikachu') {
				return this.chainModify(2);
			}
		},
		itemUser: ["Miroku"],
		num: -1,
		gen: 9,
	},
}
