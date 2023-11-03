export const Items: {[itemid: string]: ModdedItemData} = {
	wishingstone: {
		name: "Wishing Stone",
		spritenum: 22,
		onTakeItem: false,
		zMove: true,
		onStart(pokemon) {
			for (const side of this.sides) {
				side.dynamaxUsed = false;
			}
			pokemon.canDynamaxNow() = true;
		},
		num: -1000,
		gen: 9,
		desc: "Allows this the holder to Dynamax.",
	},
};
