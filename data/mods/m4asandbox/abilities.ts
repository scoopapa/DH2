export const Abilities: {[abilityid: string]: ModdedAbilityData} = {
	acidrocknerfed: {
		shortDesc: "On switch-in, this Pokémon poisons every Pokémon on the field.",
		onStart(pokemon) {
			for (const target of this.getAllActive()) {
				if (!target || !this.isAdjacent(target, pokemon) || target.status) continue;
				if (target.hasAbility('soundproof')) {
					this.add('-ability', pokemon, 'Acid Rock');
					this.add('-immune', target, "[from] ability: Soundproof", "[of] " + target);
				} else if (!target.runStatusImmunity('psn')) {
					this.add('-ability', pokemon, 'Acid Rock');
					this.add('-immune', target);
				} else {
					target.setStatus('psn', pokemon);
				}
			}
		},
		name: "Acid Rock (Nerfed)",
		rating: 4,
		num: -1045,
	},
};
