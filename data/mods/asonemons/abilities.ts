export const Abilities: {[k: string]: ModdedAbilityData} = {	
    asonetorkoal: {
		onPreStart(pokemon) {
			this.add('-ability', pokemon, 'As One');
		},
		onStart(source) {
			this.field.setWeather('sunnyday');
		},
		onResidual(pokemon) {
			if (pokemon.activeTurns) {
				this.boost({spe: 1});
			}
		},
		isPermanent: true,
		name: "As One (Torkoal)",
      shortDesc: "The combination of Drought and Speed Boost.",
		rating: 4,
		num: 1001,
	},
};
