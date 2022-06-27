export const Items: {[itemid: string]: ModdedItemData} = {
	missingbonei: {
		name: "Missing Bone I",
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 1073) || pokemon.baseSpecies.num === 1073) {
				return false;
			}
			return true;
		},
		forcedForme: "Irrigator-Completed",
		itemUser: ["Irrigator-Completed"],
		desc: "If held by an Irrigator, this item changes it to its Completed form.",
		gen: 8,
	},

	missingboneg: {
		name: "Missing Bone G",
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 1074) || pokemon.baseSpecies.num === 1074) {
				return false;
			}
			return true;
		},
		forcedForme: "Galapagunk-Completed",
		itemUser: ["Galapagunk-Completed"],
		desc: "If held by a Galapagunk, this item changes it to its Completed form.",
		gen: 8,
	},
	
// Mega Stones
	jaibastionite: {
		name: "Jaibastionite",
		spritenum: 578,
		megaStone: "Jaibastion-Mega",
		megaEvolves: "Jaibastion",
		itemUser: ["Jaibastion"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		gen: 8,
		desc: "If held by a Jaibastion, this item allows it to Mega Evolve in battle.",
	},
	sulfuramite: {
		name: "Sulfuramite",
		spritenum: 578,
		megaStone: "Sulfuram-Mega",
		megaEvolves: "Sulfuram",
		itemUser: ["Sulfuram"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		gen: 8,
		desc: "If held by a Sulfuram, this item allows it to Mega Evolve in battle.",
	},
	minkfinitite: {
		name: "Minkfinitite",
		spritenum: 578,
		megaStone: "Minkfinit-Mega",
		megaEvolves: "Minkfinit",
		itemUser: ["Minkfinit"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		gen: 8,
		desc: "If held by a Minkfinit, this item allows it to Mega Evolve in battle.",
	},
};
