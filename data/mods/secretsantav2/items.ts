export const Items: {[itemid: string]: ModdedItemData} = {
	drampanite: {
		name: "Drampanite",
		spritenum: 0,
		megaStone: "Drampa-Santian-Mega",
		megaEvolves: "Drampa-Santian",
		itemUser: ["Drampa-Santian, Drampa-Santian-Mega"],
		forcedForme: "Drampa-Santian-Mega",
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 2585,
		gen: 9,
		isNonstandard: null,
	},
};
