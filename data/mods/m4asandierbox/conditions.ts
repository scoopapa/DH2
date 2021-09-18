export const Conditions: {[k: string]: ConditionData} = {
	overflow: {
		name: 'Overflow',
		duration: 3,
		onResidualOrder: 1,
		onStart(pokemon) {
			pokemon.setType(pokemon.getTypes(true).map(type => type === "Fire" ? "???" : type));
			this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[from] ability: Overflow');
		},
		onEnd(pokemon) {
			pokemon.setType(pokemon.getTypes(true).map(type => type === "???" ? "Fire" : type));
			this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[from] ability: Overflow');
		},
	},
};
