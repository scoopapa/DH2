export const Conditions: {[id: string]: ModdedConditionData} = {
	autism: {
		name: 'Autism',
		effectType: 'Status',
		onStart(pokemon) {
			if (pokemon.hasType('Normal')) {
            	this.add('-immune', pokemon, '[from] status: Autism');
            	return false;
        	}
			this.add('-start', pokemon, 'Autistic');
			this.add('-message', `${pokemon.name} is autistic!`);
		},
		onResidualOrder: 10,
		onResidual(pokemon) {
			this.damage(pokemon.baseMaxhp / 4);
		},
		onModifySTAB(stab, source, target, move) {
        	return 1;
    	},
		onEnd(pokemon) {
			this.add('-end', pokemon, 'Autistic');
			this.add('-message', `${pokemon.name} overcame its autism!`);
		},
	},
};
