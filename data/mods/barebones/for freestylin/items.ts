export const Items: {[itemid: string]: ModdedItemData} = {
	pinchberry: {
		name: "Pinch Berry",
		shortDesc: "Restores 1/2 max HP at 1/3 max HP or less. Single use.",
		spritenum: 448,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Stellar",
		},
		onUpdate(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 3 || (pokemon.hp <= pokemon.maxhp / 2 &&
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
		num: 1001,
		gen: 9,
		rating: 3,
	},
	
	tsersiberry: {
		name: "Tsersi Berry",
		shortDesc: "Halves damage taken from a super-effective attack. Single use.",
		spritenum: 124,
		isBerry: true,
		naturalGift: {
			basePower: 100,
			type: "Stellar",
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
		onEat() { },
		num: 1002,
		gen: 9,
		rating: 3,
	},
};


