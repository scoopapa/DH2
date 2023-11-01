export const Items: {[itemid: string]: ModdedItemData} = {
	wishingstone: {
		name: "Wishing Stone",
		spritenum: 22,
		onTakeItem: false,
		onStart(pokemon) {
			pokemon.canDynamax = true;
		},
		num: -1000,
		gen: 9,
		desc: "Allows this the holder to Dynamax.",
	},
};
