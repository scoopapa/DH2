export const Conditions: { [k: string]: ConditionData; } = {
	frz: {
		inherit: true,
		onBeforeMove(pokemon, target, move) {},
		// Damage reduction is handled directly in the sim/battle.js damage function
		onResidualOrder: 10,
		onResidual(pokemon) {
			this.damage(pokemon.baseMaxhp / 16);
		},
	},
};