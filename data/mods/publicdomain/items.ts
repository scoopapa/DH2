export const Items: {[itemid: string]: ModdedItemData} = {
	starsweet: {
		inherit: true,
		shortDesc: "Holder's use of Meteor Shower lasts 8 turns instead of 5.",
		rating: 2,
	},
	sligmaball: {
		name: "Sligma Ball",
		spritenum: 625,
		megaStone: "Sligma-Mega",
		megaEvolves: "Sligma",
		itemUser: ["Sligma", "Sligma-Mega"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1,
		gen: 9,
		desc: "If held by Sligma, this item allows it to Mega Evolve in battle.",
	},
	stunfiskite: {
		name: "Stunfiskite",
		spritenum: 628,
		megaStone: "Stunfisk-Galar-Mega",
		megaEvolves: "Stunfisk-Galar",
		itemUser: ["Stunfisk-Galar", "Stunfisk-Galar-Mega"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -2,
		gen: 9,
		desc: "If held by Stunfisk-Galar, this item allows it to Mega Evolve in battle.",
	},
};