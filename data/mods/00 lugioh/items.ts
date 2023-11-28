export const Items: {[itemid: string]: ModdedItemData} = {
	shellbell: {
		name: "Shell Bell",
		spritenum: 438,
		fling: {
			basePower: 30,
		},
		onAfterMoveSecondarySelfPriority: -1,
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (move.totalDamage && !pokemon.forceSwitchFlag) {
				this.heal(10, pokemon);
			}
		},
		num: 253,
		gen: 3,
	},
};
