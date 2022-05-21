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
    desc: "If held by Talonflame, Gale Wings can work at any time."
	},

       
