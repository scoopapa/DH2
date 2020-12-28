export const Abilities: {[abilityid: string]: ModdedAbilityData} = {
	illusion: {
		onBeforeSwitchIn(pokemon) {
			pokemon.illusion = null;
			let i;
			for (i = pokemon.side.pokemon.length - 1; i > pokemon.position; i--) {
				if (!pokemon.side.pokemon[i]) continue;
				if (!pokemon.side.pokemon[i].fainted) break;
			}
			if (!pokemon.side.pokemon[i]) return;
			if (pokemon === pokemon.side.pokemon[i]) return;
			pokemon.illusion = pokemon.side.pokemon[i];
		},
		onDamagingHit(damage, target, source, move) {
			if (target.illusion) {
				this.singleEvent('End', this.dex.getAbility('Illusion'), target.abilityData, target, source, move);
			}
		},
		onEnd(pokemon) {
			if (pokemon.illusion) {
				const oMegaSpecies = this.dex.getSpecies(pokemon.species.originalMega);
				if (oMegaSpecies.exists || pokemon.species.forme.startsWith('Mega')) {
					// Place volatiles on the Pokémon to show its mega-evolved condition and details
					this.add('-start', pokemon, pokemon.item, '[silent]');
					this.add('-start', pokemon, 'typechange', pokemon.species.types.join('/'), '[silent]');
				} else {
					this.add('-end', pokemon, 'typechange', '[silent]');
					this.add('-end', pokemon, pokemon.illusion.species.originalMega.requiredItem || pokemon.illusion.species.originalMega.requiredMove, '[silent]');
				}
				this.debug('illusion cleared');
				pokemon.illusion = null;
				const details = pokemon.species.name + (pokemon.level === 100 ? '' : ', L' + pokemon.level) +
					(pokemon.gender === '' ? '' : ', ' + pokemon.gender) + (pokemon.set.shiny ? ', shiny' : '');
				this.add('replace', pokemon, details);
				this.add('-end', pokemon, 'Illusion');
			}
		},
		onFaint(pokemon) {
			pokemon.illusion = null;
		},
		isUnbreakable: true,
		name: "Illusion",
		rating: 4.5,
		num: 149,
	},
}
