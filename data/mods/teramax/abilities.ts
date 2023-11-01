export const Abilities: {[k: string]: ModdedAbilityData} = {
	zenmode: {
		priorityChargeCallback(move, attacker, defender) {
			if (attacker.baseSpecies.baseSpecies !== 'Darmanitan' || attacker.transformed || move.category === 'Status') {
				return;
			}
			if (move.category === 'Special' && !['Zen', 'Galar-Zen'].includes(attacker.species.forme)) {
				attacker.addVolatile('zenmode');
			}
		},
		onEnd(pokemon) {
			if (!pokemon.volatiles['zenmode'] || !pokemon.hp) return;
			pokemon.transformed = false;
			delete pokemon.volatiles['zenmode'];
			if (pokemon.species.baseSpecies === 'Darmanitan' && pokemon.species.battleOnly) {
				pokemon.formeChange(pokemon.species.battleOnly as string, this.effect, false, '[silent]');
			}
		},
		condition: {
			onStart(pokemon) {
				if (!pokemon.species.name.includes('Galar')) {
					if (pokemon.species.id !== 'darmanitanzen') pokemon.formeChange('Darmanitan-Zen');
				} else {
					if (pokemon.species.id !== 'darmanitangalarzen') pokemon.formeChange('Darmanitan-Galar-Zen');
				}
			},
			onEnd(pokemon) {
				if (['Zen', 'Galar-Zen'].includes(pokemon.species.forme)) {
					pokemon.formeChange(pokemon.species.battleOnly as string);
				}
			},
		},
		isPermanent: true,
		name: "Zen Mode",
		rating: 0,
		shortDesc: "Changes this Pokemon's form to Zen Mode before using a Special move.",
		num: 161,
	},
};
