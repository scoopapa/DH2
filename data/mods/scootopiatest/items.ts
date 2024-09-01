export const Items: {[itemid: string]: ItemData} = {
	crystalorb: {
		inherit: true,
		isNonstandard: "Past",
	},
	feralorb: {
		inherit: true,
		isNonstandard: "Past",
	},
	shatteredorb: {
		name: "Shattered Orb",
		fling: {
			basePower: 30,
		},
		desc: "Single use per battle. Instantly sets a World Effect in the holder's moveset.",
		onStart(pokemon) {
			if (!pokemon.side.usedShatteredOrb) pokemon.side.usedShatteredOrb = false;
			let wMove = this.dex.dataCache.scootopia.getWorldEffectMove(pokemon)
			if (!wMove) return;
			if (!pokemon.ignoringItem() && this.dex.dataCache.scootopia.getWorldEffect(pokemon) !== wMove) {
				pokemon.useItem();
				pokemon.battle.field.addPseudoWeather(wMove);
				pokemon.side.usedShatteredOrb = true;
			}
		},
		onUpdate(pokemon) {
			if (pokemon.side.usedShatteredOrb) return;
			let wMove = this.dex.dataCache.scootopia.getWorldEffectMove(pokemon)
			if (!wMove) return;
			if (!pokemon.ignoringItem() && this.dex.dataCache.scootopia.getWorldEffect(pokemon) !== wMove) {
				pokemon.useItem();
				pokemon.battle.field.addPseudoWeather(wMove);
				pokemon.side.usedShatteredOrb = true;
			}
		},
		onTakeItem(item, pokemon, source) {
			if (pokemon.side.usedShatteredOrb) return true;
			return false;
		},
		gen: 9,
		rating: 3,
	},
};
