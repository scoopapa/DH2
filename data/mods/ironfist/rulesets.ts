export const Rulesets: {[k: string]: ModdedFormatData} = {
	speciesclause: {
		inherit: true,
		onSwitchIn(pokemon) {
			if (pokemon.big) {
				pokemon.addVolatile('bigbutton');
			}
			if (pokemon.set.nature === 'Serious') {
				if (pokemon.addType('Serious')) this.add('-start', pokemon, 'typeadd', 'Serious');
			}
		},
	},
};