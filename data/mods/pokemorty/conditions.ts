export const Conditions: {[k: string]: ModdedConditionData} = {
	par: {
		inherit: true,
		onModifySpe() {},
		onBeforeMove(pokemon) {
			if (this.randomChance(1, 7)) {
				this.add('cant', pokemon, 'par');
				return false;
			}
		},
	},
	psn: {
		inherit: true,
		onResidual(pokemon) {
			this.damage(pokemon.baseMaxhp / 10);
		},
	},
}
