export const Abilities: {[k: string]: ModdedAbilityData} = {
	
	quickdraw: {
		shortDesc: "Enables the Pokémon to move first on the first turn each time the user enters battle.",
		onFractionalPriorityPriority: -1,
		onFractionalPriority(priority, pokemon, target, move) {
			if (pokemon.activeMoveActions > 0) return;
			if (move.category !== "Status") {
				this.add('-activate', pokemon, 'ability: Quick Draw');
				return 0.1;
			}
		},
		name: "Quick Draw",
		rating: 3,
		num: 259,
	},
	
	scaryboost: {
		name: 'Scary Boost', 
		rating: 3.5, 
		num: 0.1, 
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual(pokemon) {
			if (pokemon.activeTurns) {
				let activated = false;
				for (const target of pokemon.side.foe.active) {
					if (!target || !this.isAdjacent(target, pokemon)) continue;
					if (!activated) {
						this.add('-ability', pokemon, 'Intimidate', 'boost');
						activated = true;
					}
					if (target.volatiles['substitute']) {
						this.add('-immune', target);
					} else {
						this.boost({atk: -1}, target, pokemon, null, true);
					}
				}
			}
		},
	}, 
}; 