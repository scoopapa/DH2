export const Items: {[itemid: string]: ModdedItemData} = {
	wishingstone: {
		name: "Wishing Stone",
		spritenum: 22,
		onTakeItem: false,
		zMove: true,
		onStart(pokemon) {
			pokemon.canDynamax = true;
			pokemon.canTerastalize = false;
		},
		num: -1000,
		gen: 9,
		desc: "Allows this the holder to Dynamax.",
	},
};
