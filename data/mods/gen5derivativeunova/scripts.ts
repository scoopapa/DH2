const unbanned = ["genesect", "thundurus", "landorus", "tornadustherian", "manaphy"];

export const Scripts: ModdedBattleScriptsData = {
	inherit: 'gen5',
	gen: 5,

	init: function () {
		for (const id in this.dataCache.Pokedex) {
			const pokemon = this.dataCache.Pokedex[id];
			if (this.modData('FormatsData', id)) {
				if (this.modData('FormatsData', id).isNonstandard === 'Past') this.modData('FormatsData', id).isNonstandard = null;
				// singles tiers
				if (unbanned.includes(id)) this.modData('FormatsData', id).tier = "Unbanned";
			}
		};
	}
};
