export const Items: {[itemid: string]: ModdedItemData} = {
	mentalherb: {
        name: "Mental Herb",
        spritenum: 285,
        fling: {
            basePower: 10,
            effect(pokemon) {
                const conditions = ['attract', 'taunt', 'encore', 'torment', 'disable', 'healblock', 'piercingrampage'];
                for (const firstCondition of conditions) {
                    if (pokemon.volatiles[firstCondition]) {
                        for (const secondCondition of conditions) {
                            pokemon.removeVolatile(secondCondition);
                            if (firstCondition === 'attract' && secondCondition === 'attract') {
                                this.add('-end', pokemon, 'move: Attract', '[from] item: Mental Herb');
                            }
                        }
                        return;
                    }
                }
            },
        },
        onUpdate(pokemon) {
            const conditions = ['attract', 'taunt', 'encore', 'torment', 'disable', 'healblock', 'piercingrampage'];
            for (const firstCondition of conditions) {
                if (pokemon.volatiles[firstCondition]) {
                    if (!pokemon.useItem()) return;
                    for (const secondCondition of conditions) {
                        pokemon.removeVolatile(secondCondition);
                        if (firstCondition === 'attract' && secondCondition === 'attract') {
                            this.add('-end', pokemon, 'move: Attract', '[from] item: Mental Herb');
                        }
                    }
                    return;
                }
            }
        },
        num: 219,
        gen: 3,
    },
};