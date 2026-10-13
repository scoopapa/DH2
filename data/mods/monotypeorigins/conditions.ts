export const Conditions: {[id: string]: ModdedConditionData} = {
	arcana: {
		name: 'Arcana',
		onTypePriority: 1,
		onType(types, pokemon) {
			if (pokemon.transformed || pokemon.ability !== 'truthandideals') return types;
			let type: string | undefined = '';
			if (pokemon.ability === 'truthandideals') {
				type = pokemon.getItem().onPlate;
				if (!type || type == 'Dragon') {
					return ['Dragon'];
				}
			}
			return ['Dragon', type];
		},
	},
};
