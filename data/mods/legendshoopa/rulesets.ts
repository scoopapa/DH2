export const Formats: {[k: string]: FormatData} = {
	legendsboostsmod: {
		effectType: 'Rule',
		name: 'Legends Boosts Mod',
		desc: "Applies Legends: Arceus' stat boost mechanics.",
		//banlist: [],
		/*
		onBegin() {
			this.add('rule', "Legends Boost Mod: Stat changes imitate Legends: Arceus's!");
		},
		*/
		onSwap(pokemon) {
			pokemon.addVolatile('legendsboost');
		},
	},
};
