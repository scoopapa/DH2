export const Items: {[k: string]: ModdedItemData} = {
	mysteriousbat: {
		name: "Mysterious Bat",
		spritenum: 1,
		megaStone: { "Dracula": "Dracula-Final" },
		itemUser: ["Dracula"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		num: -1,
		gen: 9,
		desc: "If held by a Dracula, this item allows it to turn into Dracula-Final in battle.",
	}
};