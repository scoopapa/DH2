export const Items: {[itemid: string]: ModdedItemData} = {
	boomerang: {
		name: "Boomerang",
		fling: {
			basePower: 120,
		},
 		onTakeItem(pokemon) {
			if (pokemon.item || !pokemon.lastItem) return false;
			const item = pokemon.lastItem;
			pokemon.lastItem = 'Boomerang';
			this.add('-item', pokemon, this.dex.getItem(item), '[from] item: Boomerang');
			pokemon.setItem(item);
		},
		num: -1001,
		gen: 8,
		desc: "Comes back to the user when flung.", 
	},
 	momentumarmor: {
		name: "Momentum Armor",
		fling: {
			basePower: 80,
		},
		onModifyAtkPriority: 1,
		onModifyAtk(atk, pokemon) {
			const def = pokemon.getStat('def', false, true);
      return this.chainModify(def / 4, pokemon, pokemon);
		},
		num: -1002,
		gen: 8,
		desc: "Boosts the user's Attack by 25% of its Defense.", 
	},
 	shellbell: {
		name: "Shell Bell",
		spritenum: 438,
		fling: {
			basePower: 40,
		},
		onAfterMoveSecondarySelfPriority: -1,
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (move.category !== 'Status') {
			this.heal(pokemon.baseMaxhp / 8);
			}
		},
		num: 253,
		gen: 3,
		desc: "The holder heals 12.5% of their max HP upon successfully damaging a Pokemon with an attack.", 
	},
};
