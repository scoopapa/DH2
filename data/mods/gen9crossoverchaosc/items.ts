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
	suwakium: {
		name: "Suwakium Z",
		desc: "If held by Suwako Moriya with Muddy Water, she can use Froggy Braves the Wind and Rain.",
		spritenum: 633,
		onTakeItem: false,
		zMove: "Froggy Braves the Wind and Rain",
		zMoveFrom: "Muddy Water",
		itemUser: ["Suwako Moriya"],
		num: -2,
		gen: 9,
	},
};
