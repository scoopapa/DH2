export const Items: {[k: string]: ModdedItemData} = {
	//TODO
	thickclub: {
		inherit: true,
		itemUser: ["Marowak", "Marowak-Alola", "Marowak-Alola-Totem", "Cubone", "Guardia"],
	},
	metalpowder: {
		inherit: true,
		itemUser: ["Ditto", "Mimmeo"],
	},
	stick: {
		inherit: true,
		itemUser: ["Farfetch\u2019d", "Farfetch\u2019d-Galar", "Sirfetch\u2019d", "Luxwan"],
		onModifyCritRatio(critRatio, user) {
			if (['farfetchd', 'farfetchdgalar', 'sirfetchd', 'luxwan'].includes(user.species.id)) {
				return 3;
			}
		},
	}
};
