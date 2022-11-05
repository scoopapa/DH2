export const Items: {[itemid: string]: ModdedItemData} = {
	bugiceite: {
		name: "bugiceite",
		spritenum: 622,
		megaStone: "bugice-Mega",
		megaEvolves: "bugice",
		itemUser: ["bugice"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 762,
		desc: "If held by a bugice, this item allows it to Mega Evolve in battle.",
	},
	bugpsychicite: {
		name: "bugpsychicite",
		spritenum: 579,
		megaStone: "bugpsychic-Mega",
		megaEvolves: "bugpsychic",
		itemUser: ["bugpsychic"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 679,
		desc: "If held by a bugpsychic, this item allows it to Mega Evolve in battle.",
	},
	normalpoisonite: {
		name: "normalpoisonite",
		spritenum: 608,
		megaStone: "normalpoison-Mega",
		megaEvolves: "normalpoison",
		itemUser: ["normalpoison"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 659,
		desc: "If held by a normalpoison, this item allows it to Mega Evolve in battle.",
	},
	groundfairyite: {
		name: "groundfairyite",
		spritenum: 585,
		megaStone: "groundfairy-Mega",
		megaEvolves: "groundfairy",
		itemUser: ["groundfairy"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 660,
		desc: "If held by a groundfairy, this item allows it to Mega Evolve in battle.",
	},
	electricpoisonite: {
		name: "electricpoisonite",
		spritenum: 586,
		megaStone: "electricpoison-Mega",
		megaEvolves: "electricpoison",
		itemUser: ["electricpoison"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 678,
		desc: "If held by an electricpoison, this item allows it to Mega Evolve in battle.",
	},
	normalite: {
		name: "normalite",
		spritenum: 620,
		megaStone: "normal-Mega",
		megaEvolves: "normal",
		itemUser: ["normal"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 760,
		desc: "If held by a normal, this item allows it to Mega Evolve in battle.",
	},
	normalfairyite: {
		name: "normalfairyite",
		spritenum: 588,
		megaStone: "normalfairy-Mega",
		megaEvolves: "normalfairy",
		itemUser: ["normalfairy"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 656,
		desc: "If held by a normalfairy, this item allows it to Mega Evolve in battle.",
	},
	watergroundite: {
		name: "watergroundite",
		spritenum: 583,
		megaStone: "waterground-Mega",
		megaEvolves: "waterground",
		itemUser: ["waterground"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 661,
		desc: "If held by a waterground, this item allows it to Mega Evolve in battle.",
	},
	darkfairyite: {
		name: "darkfairyite",
		spritenum: 602,
		megaStone: "darkfairy-Mega",
		megaEvolves: "darkfairy",
		itemUser: ["darkfairy"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 671,
		desc: "If held by a darkfairy, this item allows it to Mega Evolve in battle.",
	},
	poisonpsychicite: {
		name: "poisonpsychicite",
		spritenum: 592,
		megaStone: "poisonpsychic-Mega",
		megaEvolves: "poisonpsychic",
		itemUser: ["poisonpsychic"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 675,
		desc: "If held by a poisonpsychic, this item allows it to Mega Evolve in battle.",
	},
	darkrockite: {
		name: "darkrockite",
		spritenum: 600,
		megaStone: "darkrock-Mega",
		megaEvolves: "darkrock",
		itemUser: ["darkrock"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 662,
		desc: "If held by a darkrock, this item allows it to Mega Evolve in battle.",
	},
	poisongroundite: {
		name: "poisongroundite",
		spritenum: 601,
		megaStone: "poisonground-Mega",
		megaEvolves: "poisonground",
		itemUser: ["poisonground"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 663,
		desc: "If held by a poisonground, this item allows it to Mega Evolve in battle.",
	},
	ghostgroundite: {
		name: "ghostgroundite",
		spritenum: 628,
		megaStone: "ghostground-Mega",
		megaEvolves: "ghostground",
		itemUser: ["ghostground"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 770,
		desc: "If held by a ghostground, this item allows it to Mega Evolve in battle.",
	},
	watericeite: {
		name: "watericeite",
		spritenum: 589,
		megaStone: "waterice-Mega",
		megaEvolves: "waterice",
		itemUser: ["waterice"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 676,
		desc: "If held by a waterice, this item allows it to Mega Evolve in battle.",
	},
	dragongroundite: {
		name: "dragongroundite",
		spritenum: 577,
		megaStone: "dragonground-Mega",
		megaEvolves: "dragonground",
		itemUser: ["dragonground"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 672,
		desc: "If held by a dragonground, this item allows it to Mega Evolve in battle.",
	},
	firesteelite: {
		name: "firesteelite",
		megaStone: "firesteel-Mega",
		megaEvolves: "firesteel",
		itemUser: ["firesteel"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 1000,
		desc: "If held by a firesteel, this item allows it to Mega Evolve in battle.",
	},
	waterpoisonite: {
		name: "waterpoisonite",
		megaStone: "waterpoison-Mega",
		megaEvolves: "waterpoison",
		itemUser: ["waterpoison"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 1001,
		desc: "If held by a waterpoison, this item allows it to Mega Evolve in battle.",
	},
	groundflyingite: {
		name: "groundflyingite",
		megaStone: "groundflying-Mega",
		megaEvolves: "groundflying",
		itemUser: ["groundflying"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 1002,
		desc: "If held by a groundflying, this item allows it to Mega Evolve in battle.",
	},
};