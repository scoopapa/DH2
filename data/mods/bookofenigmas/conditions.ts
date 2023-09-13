export const Conditions: {[k: string]: ConditionData} = {
	storm: {
		name: 'storm',
		onStart(pokemon) {
			this.add('-start', pokemon, 'storm');
		},
		onResidualOrder: 14,
		onResidual(pokemon) {
			this.damage(pokemon.baseMaxhp / 8);
		},
		onEnd(pokemon) {
			this.add('-end', pokemon, 'storm');
		},
	},
};
