export const Rulesets: {[k: string]: ModdedFormatData} = {
	jolly: {
		name: 'Jolly',
		desc: "Jollymod",
		onBegin() {
			this.add('rule', 'Jollymod', 'uh santas really mad rn');
		},
		onResidual(pokemon) {
			console.log(pokemon.side.active);
			if(pokemon.side.active) pokemon.side.punish();
		},
	},
};