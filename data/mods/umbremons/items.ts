export const Items: {[itemid: string]: ModdedItemData} = {
	// New Items
	healthpack: {
		num: -1,
		onSwitchInPriority: -2,
        onStart(pokemon) {
            for (const ally of pokemon.adjacentAllies()) {
                if (!pokemon.ignoringItem() && this.runEvent('TryHeal', ally, null, this.effect, ally.baseMaxhp / 4)) {
                    pokemon.useItem();
                    this.heal(ally.baseMaxhp / 4, ally, pokemon);
                    return;
                }
            }
        },
		fling: {
			basePower: 30,
			effect(target, source, move) {
				this.heal(target.maxhp / 2, target, source);
		},
	},
		shortDesc: "When the holder enters the field, consumes and restores 1/4 of its ally's HP",
	},
	// Item Adjustments
	assaultvest: {
		inherit: true,
		isNonstandard: null,
	},
	powerherb: {
		inherit: true,
		isNonstandard: null,
	},
	toxicorb: {
		inherit: true,
		isNonstandard: null,
	},
	flameorb: {
		inherit: true,
		isNonstandard: null,
	},
};
