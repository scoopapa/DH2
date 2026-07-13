export const Items: import('../../../sim/dex-items').ModdedItemDataTable = {
	boosterenergy: {
		name: "Booster Energy",
		spritenum: 745,
		fling: {
			basePower: 30,
		},
		onStart() {
			this.effectState.started = true;
			if (pokemon.hasAbility('jurassicdust') && !this.field.isWeather('sandstorm') && pokemon.useItem()) {
			  this.field.setWeather('sandstorm');
			}
		},
		onUpdate(pokemon) {
			if (!this.effectState.started || pokemon.transformed) return;
			if (this.queue.peek(true)?.choice === 'runSwitch') return;
			if (pokemon.hasAbility('jurassicdust') && !this.field.isWeather('sandstorm') && pokemon.useItem()) {
			  this.field.setWeather('sandstorm');
			}
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.tags.includes("Paradox")) return false;
			return true;
		},
		num: 1880,
		gen: 9,
		shortDesc: "Jurassic Dust Pokemon: Sets Sandstorm for 8 turns on switch-in.",
	},
};
