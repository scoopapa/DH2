export const Items: { [itemid: string]: ItemData } = {
	maisarite: {
		name: "Maisarite",
		num: -1000,
		desc: "Allows Maisart to Mega Evolve.",
		spritenum: 624,
		megaStone: "Maisart-Mega",
		megaEvolves: "Maisart",
		itemUser: ["Maisart"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		gen: 9,
	},
	
};
