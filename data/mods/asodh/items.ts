export const Items: {[k: string]: ModdedItemData} = {
	stonjournerite: {
		name: "Stonjournerite",
		spritenum: 578,
		megaStone: "Stonjourner-Mega",
		megaEvolves: "Stonjourner",
		itemUser: ["Stonjourner"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1,
		gen: 9,
		desc: "If held by a Stonjourner, this item allows it to Mega Evolve in battle.",
	},
};
