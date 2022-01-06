export const Abilities: {[abilityid: string]: ModdedAbilityData} = {
	hoard: {
		shortDesc: "When it leaves battle, the Pokémon restores its original held item.",
		onSwitchOut(pokemon) {
			if (!pokemon.item && pokemon.m.originalItem) {
				if (pokemon.setItem(pokemon.m.originalItem)) {
          this.add('-ability', pokemon, 'Hoard');
					this.add('-item', ally, this.dex.getItem(item), '[from] Ability: Hoard');
				}
			}
		},
		name: "Hoard",
		rating: 3,
		num: -1,
	},
};
