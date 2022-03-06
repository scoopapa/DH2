export const Abilities: {[abilityid: string]: AbilityData} = {
	smartprankster: {
		onModifyPriority(priority, pokemon, target, move) {
			if (move?.category === 'Status') {
				move.smartpranksterBoosted = true;
				return priority + 1;
			}
		},
		name: "Smart Prankster",
		shortDesc: "This Pokemon's non-damaging moves have their priority increased by 1.",
		rating: 4,
		num: 158,
	},
	intimidate: {
		onStart(pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Mawile' && pokemon.item === 'mawilelite') return false;
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
		},
		inherit: true,
	},
	grasspelt: {
		onDamagingHit(damage, target, source, move) {
			if (!this.field.isTerrain('grassyterrain')) {
				this.field.setTerrain('grassyterrain');
			}
		},
		name: "Grass Pelt",
		shortDesc: "When this Pokemon is hit, Grassy Terrain begins.",
		rating: 2,
		num: 179,
	},
};