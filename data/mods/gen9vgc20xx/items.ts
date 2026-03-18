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
					const bestStat = pokemon.getBestStat(false, true);
					this.boost({ [bestStat]: 1 }, pokemon);
				}
			}
		},
		num: -1000, // It doesn't seem like Honey item is on DH.. So, it's technically considered a new item here, I guess...
		gen: 9,
		desc: "At the end of turn, boosts Bug's best stat. Consumable.",
	},
	//
	ancientarmor: {
		name: "Ancient Armor",
		spritenum: 581,
		fling: {
			basePower: 80,
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).typeMod > 0) {
				this.debug('Ancient Armor neutralize');
				return this.chainModify(0.75);
			}
	   },
		num: -1001,
		gen: 9,
		desc: "User receives 25% less damage from a super effective move.",
	},
	// end
	
	gaiaberry: {
		name: "Gaia Berry",
		spritenum: 262,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Flying",
		},
		onUpdate(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 4 || (pokemon.hp <= pokemon.maxhp / 2 &&
					pokemon.hasAbility('gluttony') && pokemon.abilityState.gluttony)) {
				pokemon.eatItem();
			}
		},
		onTryEatItem(item, pokemon) {
			if (!this.runEvent('TryHeal', pokemon, null, this.effect, pokemon.baseMaxhp / 2)) return false;
		},
		onEat(pokemon) {
			this.heal(pokemon.baseMaxhp / 2);
		},
		num: -1002,
		gen: 9,
		desc: "At or below 25% HP, recovers half of its HP.",
	},
	//
	vigorseed: {
		name: "Vigor Seed",
		spritenum: 666,
		fling: {
			basePower: 10,
		},
		onStart(pokemon) {
			if (!pokemon.ignoringItem() && this.field.isTerrain('vigorterrain')) {
				pokemon.useItem();
			}
		},
		onTerrainChange(pokemon) {
			if (this.field.isTerrain('vigorterrain')) {
				pokemon.useItem();
			}
		},
		boosts: {
			def: 1,
		},
		num: -1003,
	},
	//
	corrosiverock: {
		name: "Corrosive Rock",
		spritenum: 88,
		fling: {
			basePower: 60,
		},
		num: -1004,
	},
	//
	safetygoggles: {
		name: "Safety Goggles",
		spritenum: 604,
		fling: {
			basePower: 80,
		},
		onImmunity(type, pokemon) {
			if (type === 'sandstorm' || type === 'hail' || type === 'acidicrain' || type === 'powder') return false;
		},
		onTryHit(pokemon, source, move) {
			if (move.flags['powder'] && pokemon !== source && this.dex.getImmunity('powder', pokemon)) {
				this.add('-activate', pokemon, 'item: Safety Goggles', move.name);
				return null;
			}
		},
		num: 650,
		gen: 6,
	},
	//
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
