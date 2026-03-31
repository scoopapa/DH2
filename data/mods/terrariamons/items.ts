export const Items: {[itemid: string]: ModdedItemData} = {
brokenherosword: {
		name: "Broken Hero Sword",
		spritenum: 28,
		shortDesc: "Reverts Shadow and Hallowed to their Ancient formes.",
		onSwitchIn(pokemon) {
			if (pokemon.isActive && pokemon.baseSpecies.name === 'Shadow') {
				this.queue.insertChoice({choice: 'runPrimal', pokemon: pokemon});
			}
			if (pokemon.isActive && pokemon.baseSpecies.name === 'Hallowed') {
				this.queue.insertChoice({choice: 'runPrimal', pokemon: pokemon});
			}
		},
		onPrimal(pokemon) {
			if(pokemon.baseSpecies.name === 'Shadow') {
				pokemon.formeChange('Ancient Shadow', this.effect, true);
			}
			if(pokemon.baseSpecies.name === 'Hallowed') {
				pokemon.formeChange('Ancient Hallowed', this.effect, true);
			}
		},
		onTakeItem(item, pokemon, source) {
			if (source.baseSpecies.baseSpecies === 'Shadow' || source.baseSpecies.baseSpecies === 'Hallowed') {
				return false;
			}
			return true;
		},
		itemUser: ["Shadow", "Hallowed", "Ancient Shadow", "Ancient Hallowed"],
	},
}
