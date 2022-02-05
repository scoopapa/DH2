export const Items: {[itemid: string]: ItemData} = {
	mawilelite: {
		name: "Mawile-Lite",
		spritenum: 1,
		onStart(pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Mawile') {
				this.boost({atk: 2});
			}
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Mawile') return false;
			return true;
		},
		num: -1,
		gen: 8,
		shortDesc: "When held by Mawile, +2 Attack upon Entry. Can't be Knocked Off.",
	},
	earthplate: {
		inherit: true,
		isNonstandard: null,
	},
};