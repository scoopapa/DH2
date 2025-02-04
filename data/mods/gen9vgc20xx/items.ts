import { TARGET_HP_BASED_MOVES } from "../../cg-team-data";

export const Items: {[k: string]: ModdedItemData} = {
	/*cacturnite: {
		name: "Cacturnite",
		spritenum: 613,
		megaStone: "Cacturne-Mega",
		megaEvolves: "Cacturne",
		itemUser: ["Cacturne"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1008,
		gen: 9,
		desc: "If held by a Cacturne, this item allows it to Mega Evolve in battle.",
	},
	// end*/

	// Changes to items
	// start
	honey: {
		name: "Honey",
		spritenum: 22, // Replace with the correct sprite number
		fling: {
			basePower: 30,
		},
		onResidualOrder: 26, // Executes at the end of the turn
		onResidualSubOrder: 1,
		onResidual(pokemon) {
			if (
				pokemon.hasType('Bug') || 
				pokemon.hasAbility('honeygather')
			) {
				if (pokemon.useItem()) {
					const bestStat = pokemon.getBestStat(true);
					this.boost({ [bestStat]: 1 }, pokemon);
				}
			}
		},
		num: -1000, // It doesn't seem like Honey item is on DH.. So, it's technically considered a new item here, I guess...
		gen: 9,
	},
	
	zoomlens: {
		name: "Zoom Lens",
		spritenum: 574,
		fling: {
			basePower: 10,
		},
		onSourceModifyAccuracyPriority: -2,
		onSourceModifyAccuracy(accuracy, target) {
			if (typeof accuracy === 'number' && !this.queue.willMove(target)) {
				this.debug('Zoom Lens boosting accuracy');
				return this.chainModify([4915, 4096]);
			}
		},
		onModifyDamage(damage, source, target, move) {
			// Check if the source moves after the target
			if (!this.queue.willMove(target)) {
				this.debug('Zoom Lens boosting damage');
				return this.chainModify([4915, 4096]); // Increase damage by 20%
			}
		},
		num: 276,
		gen: 4,
	},
	// end

};
