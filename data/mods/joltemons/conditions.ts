	export const Conditions: {[k: string]: ConditionData} = {

  silvally: {
		name: 'Silvally',
		onTypePriority: 1,
		onType(types, pokemon) {
			if (pokemon.transformed || (pokemon.ability !== 'rkssystem' || pokemon.ability !== 'powerofalchemysilvally') && this.gen >= 8) return types;
			let type: string | undefined = 'Normal';
			if (pokemon.ability === 'rkssystem' || pokemon.ability === 'powerofalchemysilvally') {
				type = pokemon.getItem().onMemory;
				if (!type) {
					type = 'Normal';
				}
			}
			return [type];
		},
	},
};
