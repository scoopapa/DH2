export const Items: {[itemid: string]: ModdedItemData} = {
  bondiumz: {
		name: "Bondium Z",
		desc: "If held by Luigi with Tri Attack, he can use Linking Lighthouse Launch.",
		spritenum: 631,
		onTakeItem: false,
		zMove: "Linking Lighthouse Launch",
		zMoveFrom: "Tri Attack",
		itemUser: ["Luigi"],
		num: -1,
		gen: 9,
	},
};
