export const Abilities: {[abilityid: string]: ModdedAbilityData} = {
	shieldsdown: {
		onStart(pokemon) {
			if ((pokemon.baseSpecies.baseSpecies !== 'Minior' && pokemon.baseSpecies.baseSpecies !== 'Stacragus') || pokemon.transformed) return;
			if (pokemon.hp > pokemon.maxhp / 2) {
				if (pokemon.baseSpecies.baseSpecies === 'Minior' && pokemon.species.forme !== 'Meteor') {
					pokemon.formeChange('Minior-Meteor');
				} else if (pokemon.baseSpecies.baseSpecies === 'Stacragus' && pokemon.species.forme !== 'Chrysalis') {
					pokemon.formeChange('Stacragus-Chrysalis');
				}
			} else {
				if (pokemon.species.forme === 'Meteor' || pokemon.species.forme === 'Chrysalis') {
					pokemon.formeChange(pokemon.set.species);
				}
			}
		},
		onResidualOrder: 27,
		onResidual(pokemon) {
			if ((pokemon.baseSpecies.baseSpecies !== 'Minior' && pokemon.baseSpecies.baseSpecies !== 'Stacragus') || pokemon.transformed || !pokemon.hp) return;
			if (pokemon.hp > pokemon.maxhp / 2) {
				if (pokemon.baseSpecies.baseSpecies === 'Minior' && pokemon.species.forme !== 'Meteor') {
					pokemon.formeChange('Minior-Meteor');
				} else if (pokemon.baseSpecies.baseSpecies === 'Stacragus' && pokemon.species.forme !== 'Chrysalis') {
					pokemon.formeChange('Stacragus-Chrysalis');
				}
			} else {
				if (pokemon.species.forme === 'Meteor' || pokemon.species.forme === 'Chrysalis') {
					pokemon.formeChange(pokemon.set.species);
				}
			}
		},
		onSetStatus(status, target, source, effect) {
			if ((target.species.id !== 'miniormeteor' && target.species.id !== 'stacraguschrysalis') || target.transformed) return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Shields Down');
			}
			return false;
		},
		onTryAddVolatile(status, target) {
			if ((target.species.id !== 'miniormeteor' && target.species.id !== 'stacraguschrysalis') || target.transformed) return;
			if (status.id !== 'yawn') return;
			this.add('-immune', target, '[from] ability: Shields Down');
			return null;
		},
		isPermanent: true,
		isUnbreakable: true,
		name: "Shields Down",
		rating: 3,
		num: 197,
	},
};