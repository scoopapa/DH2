export const Items: {[itemid: string]: ModdedItemData} = {
	plubiumz: {
		name: "Plubium Z",
		desc: "If held by Plubia with Shadow Ball, it can use Eternal Nightmare.",
		spritenum: 644,
		onTakeItem: false,
		zMove: "Eternal Nightmare",
		zMoveFrom: "Shadow Ball",
		itemUser: ["Plubia"],
		num: -1027,
		gen: 7,
	},
};