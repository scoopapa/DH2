export const Items: {[itemid: string]: ModdedItemData} = {
	heavydutyboots: {
		inherit: true,
		shortDesc: "Holder is immune to hazards. 1/4 max HP: eats item to heal 1/4 max HP.",
		onUpdate(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 4) {
				pokemon.eatItem();
			}
		},
		onTryEatItem(item, pokemon) {
			if (!this.runEvent('TryHeal', pokemon, null, this.effect, pokemon.baseMaxhp / 4)) return false;
		},
		onEat(pokemon) {
			this.heal(pokemon.baseMaxhp / 4);
		},
	},
	lifeinsurance: {
		name: "Life Insurance",
		shortDesc: "When holder faints, replacement healed for 1/4 holder's HP, status cured.",
		onFaint(pokemon) {
			pokemon.useItem();
			this.effectState.hp = pokemon.maxhp / 4;
			pokemon.side.addSlotCondition('lifeinsurance');
		},
		condition: {
			onSwap(target) {
				if (!target.fainted && (target.hp < target.maxhp || target.status)) {
					target.heal(target.maxhp);
					target.clearStatus();
					this.add('-heal', target, this.effectState.hp, '[from] move: Healing Wish');
					target.side.removeSlotCondition(target, 'lifeinsurance');
				}
			},
		},
	},
	
}
