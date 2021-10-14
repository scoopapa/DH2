export const Abilities: {[abilityid: string]: ModdedAbilityData} = {
    asonetorkoal: {
		onPreStart(pokemon) {
			this.add('-ability', pokemon, 'As One');
		},
		onStart(source) {
			for (const action of this.queue) {
				if (action.choice === 'runPrimal' && action.pokemon === source && source.species.id === 'groudon') return;
				if (action.choice !== 'runSwitch' && action.choice !== 'runPrimal') break;
			}
			this.field.setWeather('sunnyday');
		},
        onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual(pokemon) {
			if (pokemon.activeTurns) {
				this.boost({spe: 1});
                this.dex.getAbility('speedboost'));
			}
		},
		isPermanent: true,
		name: "As One (Torkoal)",
        shortDesc: "The combination of Drought and Speed Boost.",
		rating: 4,
		num: 1001,
	},
};
