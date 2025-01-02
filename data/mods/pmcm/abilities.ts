export const Abilities: { [abilityid: string]: ModdedAbilityData } = {
	//placeholder
	thickfat: {
		inherit: true,
		onUpdate(pokemon) {
			if (pokemon.status === 'brn') {
				this.add('-activate', pokemon, 'ability: Thick Fat');
				pokemon.cureStatus();
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'brn') return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Thick Fat');
			}
			return false;
		},
		shortDesc: "Fire-/Ice-type moves against this Pokemon deal 1/2 damage. Burn immune.",
	},
};
