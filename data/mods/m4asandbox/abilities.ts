export const Abilities: {[abilityid: string]: ModdedAbilityData} = {
	masquerade: {
		onBeforeSwitchIn(pokemon) {
			pokemon.addVolatile('masquerade');
		},
		condition: {
			onStart(pokemon) {
				pokemon.masquerade = null;
				let i;
				for (i = pokemon.side.pokemon.length - 1; i > pokemon.position; i--) {
					if (!pokemon.side.pokemon[i]) continue;
					if (!pokemon.side.pokemon[i].fainted) break;
				}
				if (!pokemon.side.pokemon[i]) return;
				if (pokemon === pokemon.side.pokemon[i]) return;
				pokemon.masquerade = pokemon.side.pokemon[i];
				const additionalBannedAbilities = [
					'noability', 'flowergift', 'forecast', 'hungerswitch', 'illusion', 'imposter', 'neutralizinggas', 'powerofalchemy', 'receiver', 'trace', 'wonderguard',
				];
				if (pokemon.masquerade.getAbility().isPermanent || additionalBannedAbilities.includes(pokemon.masquerade.ability)) return;
				pokemon.setAbility(pokemon.masquerade.ability);
			},
			onDamagingHit(damage, target, source, move) {
				target.setAbility('masquerade');
				target.removeVolatile('masquerade');
			},
			onFaint(pokemon) {
				pokemon.setAbility('masquerade');
				pokemon.removeVolatile('masquerade');
			},
		},
		name: "Masquerade",
		rating: 3,
		num: -5000,
	},
	ko: {
		onFoeTrapPokemon(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 4 && this.isAdjacent(pokemon, this.effectData.target)) {
				pokemon.tryTrap(true);
			}
		},
		onFoeMaybeTrapPokemon(pokemon, source) {
			if (!source) source = this.effectData.target;
			if (!source || !this.isAdjacent(pokemon, source)) return;
			if (pokemon.hp <= pokemon.maxhp / 4) {
				pokemon.maybeTrapped = true;
			}
		},
		name: "KO",
		rating: 4,
		num: -5000,
	},
};
