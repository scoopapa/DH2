export const Items: {[itemid: string]: ModdedItemData} = {
	missingbonei: {
		name: "Missing Bone I",
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 1072) || pokemon.baseSpecies.num === 1072) {
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
			if ((source && source.baseSpecies.num === 1073) || pokemon.baseSpecies.num === 1073) {
				return false;
			}
			return true;
		},
		forcedForme: "Galapagunk-Completed",
		itemUser: ["Galapagunk-Completed"],
		desc: "If held by a Galapagunk, this item changes it to its Completed form.",
		gen: 8,
	},
};
