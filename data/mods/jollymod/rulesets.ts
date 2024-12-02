export const Rulesets: {[k: string]: ModdedFormatData} = {
	jollymod: {
		effectType: 'ValidatorRule',
		name: 'Jollymod',
		desc: "Jollymod",
		onBegin() {
			this.add('rule', 'Jollymod');
		},
		onResidual(pokemon) {
			console.log(pokemon.side.active);
			if(pokemon.side.active) punish(pokemon.side);
		},
	},
};