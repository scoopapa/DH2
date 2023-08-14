export const Rulesets: {[k: string]: ModdedFormatData} = {
	legendsboostsmod: {
		effectType: 'Rule',
		name: 'Legends Boosts Mod',
		desc: "Applies Legends: Arceus' stat boost mechanics.",
		// banlist: [],
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
