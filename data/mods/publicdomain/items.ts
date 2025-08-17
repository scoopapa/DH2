export const Items: {[itemid: string]: ModdedItemData} = {
	sligmaball: {
		name: "Sligma Ball",
		spritenum: 585,
		megaStone: "Sligma-Mega",
		megaEvolves: "Sligma",
		itemUser: ["Sligma"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1,
		gen: 9,
		desc: "If held by Sligma, this item allows it to Mega Evolve in battle.",
	},
	starsweet: {
		inherit: true,
		shortDesc: "Holder's use of Meteor Shower lasts 8 turns instead of 5.",
		rating: 2,
	},
};