export const Conditions: {[k: string]: ConditionData} = {
	twoturnmove: {
		inherit: true,
		onSwitchOut(pokemon) {
			pokemon.removeVolatile('twoturnmove');
		},
	},
};