export const Items: {[itemid: string]: ItemData} = {
	spinollite: {
		name: "Spinollite",
		spritenum: 624,
		megaStone: "Spinollina-Mega",
		megaEvolves: "Spinollina",
		itemUser: ["Spinollina"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -100,
		//isNonstandard: "Past",
	},
};