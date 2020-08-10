'use strict';
export const Abilities: {[k: string]: ModdedAbilityData} = {
	"intimidate": {
		inherit: true,
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.side.foe.active) {
				if (!target || !this.isAdjacent(target, pokemon)) continue;
				if (!activated) {
					this.add('-ability', pokemon, 'Intimidate', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} 
				else if ( target.hasAbility(['Inner Focus', 'Oblivious', 'Own Tempo', 'Scrappy']) 
					|| (target.pokeClass && target.pokeClass === 'blade' ))
				{
					this.add('-immune', target, `[from] ability: ${target.getAbility().name}`);
				}
				else {
					this.boost({atk: -1}, target, pokemon, null, true);
				}
			}
		},
	},
};
