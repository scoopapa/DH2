export const Items: {[itemid: string]: ModdedItemData} = {
	tikilohiumz: {
		name: "Tikilohium Z",
		desc: "If held by Tikilohi with Helping Souls, it can use Wrathful Soulstrike.",
		spritenum: 644,
		onTakeItem: false,
		zMove: "Wrathful Soulstrike",
		zMoveFrom: "Helping Souls",
		itemUser: ["Tikilohi"],
		num: -1026,
		gen: 7,
	},
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