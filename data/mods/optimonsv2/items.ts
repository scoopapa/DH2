export const Items: {[itemid: string]: ModdedItemData} = {
	sharpbeakoptimized: {
		name: "Sharp Beak-Optimized",
		spritenum: 436,
		fling: {
			basePower: 50,
		},
      onModifyPriority(priority, pokemon, target, move) {
		  	if (move?.type === 'Flying') return priority + 1;
		},
      itemUser: ["Talonflame"],
		num: 210,
		gen: 4,
      desc: "If held by Talonflame, Gale Wings gets changed to work at any time."
	},
   reaperclothoptimized: {
      name: "Reaper Cloth-Optimized",
      spritenum: 385,
	   fling: {
			basePower: 100,
		 },
		onModifyDefPriority: 2,
		onModifyDef(def, pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Sableye') {
				return this.chainModify(1.5);
			}
		},
		onModifySpDPriority: 2,
		onModifySpD(spd, pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Sableye') {
				return this.chainModify(1.5);
			}
		},
		onTakeItem: false,
		num: 325,
		gen: 4,
		desc: "When held by Sableye, its Defense and Sp. Def are 1.5x and it's unable to be removed."
	},
};
