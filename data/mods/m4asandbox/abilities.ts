export const Abilities: {[abilityid: string]: ModdedAbilityData} = {
	luchadorsring: {
		shortDesc: "5 turns. Grounded: Magic Coat, +crit rate, 3/2 accuracy.",
		onStart(source) {
			this.field.setTerrain('luchadorterrain');
		},
		name: "Luchador's Ring",
		rating: 4,
		num: -5000,
	},
	masquerade: {
		shortDesc: "Inherits the Ability of the last party member. Wears off when attacked.",
		onStart(pokemon) {
			pokemon.addVolatile('masquerade');
		},
		condition: {
			onStart(pokemon) {
				console.log(`Masquerade started on ${pokemon.name}`);
				pokemon.masquerade = null;
				let i;
				for (i = pokemon.side.pokemon.length - 1; i > pokemon.position; i--) {
					if (!pokemon.side.pokemon[i]) continue;
					if (!pokemon.side.pokemon[i].fainted) break;
				}
				if (!pokemon.side.pokemon[i]) return;
				if (pokemon === pokemon.side.pokemon[i]) return;
				pokemon.masquerade = pokemon.side.pokemon[i];
				console.log(`${pokemon.name} is going to masquerade as ${pokemon.masquerade.name}`);
				const additionalBannedAbilities = [
					'noability', 'flowergift', 'forecast', 'hungerswitch', 'illusion', 'imposter', 'neutralizinggas', 'powerofalchemy', 'receiver', 'trace', 'wonderguard',
				];
				if (pokemon.masquerade.getAbility().isPermanent || additionalBannedAbilities.includes(pokemon.masquerade.ability)) {
					console.log(`${pokemon.name} can't masquerade because ${pokemon.masquerade.name}'s Ability is ${pokemon.masquerade.ability}`);
					pokemon.setAbility('masquerade');
					pokemon.removeVolatile('masquerade');
					return;
				}
				console.log(`${pokemon.name} inherited ${pokemon.masquerade.ability}`);
				pokemon.setAbility(pokemon.masquerade.ability);
				this.add('-ability', pokemon, 'Masquerade');
				this.add('-message', `${pokemon.name} inherited ${this.dex.getAbility(pokemon.ability).name} from ${pokemon.masquerade.name}!`);
				this.add('-ability', pokemon, this.dex.getAbility(pokemon.ability).name);
				console.log(`${pokemon.name}'s Ability is ${pokemon.ability}`);
			},
			onDamagingHit(damage, target, source, move) {
				target.setAbility('masquerade');
				target.removeVolatile('masquerade');
				this.add('-ability', target, 'Masquerade');
				this.add('-message', `${target.name}'s Masquerade wore off!`);
				console.log(`${target.name}'s Ability is ${target.ability}`);
			},
			onFaint(pokemon) {
				pokemon.setAbility('masquerade');
				pokemon.removeVolatile('masquerade');
				this.add('-ability', pokemon, 'Masquerade');
				this.add('-message', `${pokemon.name}'s Masquerade wore off!`);
				console.log(`${pokemon.name}'s Ability is ${pokemon.ability}`);
			},
		},
		name: "Masquerade",
		rating: 3,
		num: -5000,
	},
	ko: {
		shortDesc: "Traps Pokémon with 25% HP or less.",
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
