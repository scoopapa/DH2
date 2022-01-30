export const Conditions: {[k: string]: ConditionData} = {
	chrienmor: {
        name: 'Chrienmor',
        onTypePriority: 1,
        onType(types, pokemon) {
            if (pokemon.transformed || pokemon.ability !== 'prism' && this.gen >= 8) return types;
            let type: string | undefined = 'Normal';
            if (pokemon.ability === 'prism') {
                type = pokemon.getItem().onMemory;
                if (!type) {
                    type = 'Normal';
                }
            }
            return [type];
        },
	},
};