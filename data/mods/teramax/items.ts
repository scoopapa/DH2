export const Items: {[itemid: string]: ModdedItemData} = {
	wishingstone: {
		name: "Wishing Stone",
		spritenum: 22,
		onTakeItem: false,
		zMove: true,
		onStart(pokemon) {
			if (pokemon.side.sideConditions['dynamaxused']) {
				pokemon.side.dynamaxUsed = true;
			} else {
				pokemon.side.dynamaxUsed = false;				
			}
			if (pokemon.gigantamax) {
				pokemon.addVolatile('dynamax');
			}
		},
		onSwitchOut(pokemon) {
			pokemon.side.dynamaxUsed = true;
		},
		num: -1000,
		gen: 9,
		desc: "Allows this the holder to Dynamax.",
	},
};
