export const Abilities: {[k: string]: ModdedAbilityData} = {
	schooling: {
		onStart(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Soot Sprite' || pokemon.level < 20 || pokemon.transformed) return;
			if (pokemon.hp > pokemon.maxhp / 4) {
				if (pokemon.species.id === 'Soot Sprite') {
					pokemon.formeChange('Soot Sprite-Horde');
				}
			} else {
				if (pokemon.species.id === 'sootspritehorde') {
					pokemon.formeChange('Soot Sprite');
				}
			}
		},
		onResidualOrder: 29,
		onResidual(pokemon) {
			if (
				pokemon.baseSpecies.baseSpecies !== 'Soot Sprite' || pokemon.level < 20 ||
				pokemon.transformed || !pokemon.hp
			) return;
			if (pokemon.hp > pokemon.maxhp / 4) {
				if (pokemon.species.id === 'Soot Sprite') {
					pokemon.formeChange('Soot Sprite-Horde');
				}
			} else {
				if (pokemon.species.id === 'sootspritehorde') {
					pokemon.formeChange('Soot Sprite');
				}
			}
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1},
		name: "Horde",
		rating: 3,
		num: -1,
	},
};
