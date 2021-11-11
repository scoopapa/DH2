/*

Ratings and how they work:

-1: Detrimental
	  An ability that severely harms the user.
	ex. Defeatist, Slow Start

 0: Useless
	  An ability with no overall benefit in a singles battle.
	ex. Color Change, Plus

 1: Ineffective
	  An ability that has minimal effect or is only useful in niche situations.
	ex. Light Metal, Suction Cups

 2: Useful
	  An ability that can be generally useful.
	ex. Flame Body, Overcoat

 3: Effective
	  An ability with a strong effect on the user or foe.
	ex. Chlorophyll, Sturdy

 4: Very useful
	  One of the more popular abilities. It requires minimal support to be effective.
	ex. Adaptability, Magic Bounce

 5: Essential
	  The sort of ability that defines metagames.
	ex. Imposter, Shadow Tag

*/

export const Abilities: {[abilityid: string]: AbilityData} = {
	schooling: {
		onStart(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Jaegorm' || pokemon.transformed) return;
			if (pokemon.hp > pokemon.maxhp / 4) {
				if (pokemon.species.id === 'Jaegorm') {
					pokemon.formeChange('Jaegorm-Collective');
				}
			} else {
				if (pokemon.species.id === 'jaegormcollective') {
					pokemon.formeChange('Jaegorm');
				}
			}
		},
		onResidualOrder: 27,
		onResidual(pokemon) {
			if (
				pokemon.baseSpecies.baseSpecies !== 'Jaegorm' ||
				pokemon.transformed || !pokemon.hp
			) return;
			if (pokemon.hp > pokemon.maxhp / 4) {
				if (pokemon.species.id === 'Jaegorm') {
					pokemon.formeChange('Jaegorm-Collective');
				}
			} else {
				if (pokemon.species.id === 'jaegormcollective') {
					pokemon.formeChange('Jaegorm');
				}
			}
		},
		isPermanent: true,
		name: "Schooling",
		shortDesc: "If user is Jaegorm, changes to Collective Form if it has > 1/4 max HP, else Solo Form.",
		rating: 3,
		num: 208,
	},
};
