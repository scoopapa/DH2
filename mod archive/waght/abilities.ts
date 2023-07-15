export const Abilities: {[abilityid: string]: AbilityData} = {
	fighter: {
		shortDesc: "Gains the Fighting typing.",
		onStart(pokemon) {
            if (pokemon.hasType('Fighting')) return;
            if (!pokemon.addType('Fighting')) return;
            this.add('-start', pokemon, 'typeadd', 'Fighting', '[from] Ability: Fighter');
		},
		name: "Fighter",		
	},
};
