export const Items: {[itemid: string]: ModdedItemData} = {
	assaultvest: {
		name: "Assault Vest",
		spritenum: 581,
		fling: {
			basePower: 80,
		},
		onModifySpDPriority: 1,
		onModifySpD(spd) {
			return this.chainModify(1.5);
		},
		onDisableMove(pokemon) {
			for (const moveSlot of pokemon.moveSlots) {
				if (this.dex.getMove(moveSlot.move).category === 'Status' && this.dex.getMove(moveSlot.move).name !== 'fifthmove' && this.dex.getMove(moveSlot.move).name !== 'Fifth Move') {
					pokemon.disableMove(moveSlot.id);
				}
			}
		},
		num: 640,
		gen: 6,
	},
};
