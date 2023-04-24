export const Items: {[itemid: string]: ModdedItemData} = {
	dededesmask: {
		name: "Dedede's Mask",
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 2) || pokemon.baseSpecies.num === 2) {
				return false;
			}
			return true;
		},
		forcedForme: "Masked Dedede",
		itemUser: ["Masked Dedede"],
		num: -1,
		gen: 9,
		desc: "If held by King Dedede, this item changes its forme to Masked Dedede.", 
	},
	dracocentauriumz: {
		name: "Dracocentaurium Z",
		spritenum: 632,
		onTakeItem: false,
		zMove: "Great Fire",
		zMoveFrom: "Draco Burning",
		itemUser: ["Draco Centauros"],
		num: -2,
		gen: 9,
	},
};
