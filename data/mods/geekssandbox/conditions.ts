export const Conditions: {[id: string]: ModdedConditionData} = {
	coerce: {
		name: 'coerce',
		onStart(pokemon) {
			if (pokemon.hasType('Psychic')) {
				this.add('-immune', pokemon, '[from] status: coerce');
				return false;
			}
			this.add('-start', pokemon, 'coerce');
			this.add('-message', `${pokemon.name} was Coerced! 33% chance to not move! Psychic types immune`);
		},
		onBeforeMovePriority: 3,
		onBeforeMove(pokemon, target, move) {
			if (this.randomChance(33, 100)) {
			this.add('cant', pokemon, 'coerce');
			return false;
			}
		},
	},
};
