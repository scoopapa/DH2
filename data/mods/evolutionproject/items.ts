export const Items: {[itemid: string]: ModdedItemData} = {
	luckypunch: {
		name: "Lucky Punch",
		desc: "If held by Chansey or Lediluck, its critical hit ratio is raised by 2 stages.",
		spritenum: 261,
		fling: {
			basePower: 40,
		},
		onModifyCritRatio(critRatio, user) {
			if (user.baseSpecies.name === 'Chansey' || user.baseSpecies.name === 'Lediluck') {
				return critRatio + 2;
			}
		},
		itemUser: ["Chansey", "Lediluck"],
		num: 256,
		gen: 2,
	},
	thickclub: {
		name: "Thick Club",
		desc: "If held by a Cubone, Marowak or Resurrectric, its Attack is doubled.",
		spritenum: 491,
		fling: {
			basePower: 90,
		},
		onModifyAtkPriority: 1,
		onModifyAtk(atk, pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Cubone' || pokemon.baseSpecies.baseSpecies === 'Marowak' || pokemon.baseSpecies.baseSpecies === 'Resurrectric') {
				return this.chainModify(2);
			}
		},
		itemUser: ["Resurrectric", "Marowak", "Cubone"],
		num: 258,
		gen: 2,
	},
};
