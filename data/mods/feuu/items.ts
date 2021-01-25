export const Items: {[itemid: string]: ModdedItemData} = {
	chomplimite: {
		name: "Chomplimite",
		spritenum: 576,
		megaStone: "Chomplim-Mega",
		megaEvolves: "Chomplim",
		itemUser: ["Chomplim"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0.5,
		desc: "If held by a Chomplim, this item allows it to Mega Evolve in battle.",
	},
	silvinite: {
		name: "Silvinite",
		spritenum: 576,
		megaStone: "Silvino-Mega",
		megaEvolves: "Silvino",
		itemUser: ["Silvino"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0.5,
		desc: "If held by a Silvino, this item allows it to Mega Evolve in battle.",
	},
	tapulopunnite: {
		name: "Tapu Lopunnite",
		spritenum: 576,
		megaStone: "Tapu Lop-Mega",
		megaEvolves: "Tapu Lop",
		itemUser: ["Tapu Lop"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0.5,
		desc: "If held by a Tapu Lop, this item allows it to Mega Evolve in battle.",
	},
};