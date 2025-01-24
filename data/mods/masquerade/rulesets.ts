export const Rulesets: {[k: string]: ModdedFormatData} = {
	terastalclause: {
		effectType: 'Rule',
		name: 'Terastal Clause',
		desc: "Prevents Pok&eacute;mon from Terastallizing",
		onBegin() {
			for (const pokemon of this.getAllPokemon()) {
			  if (pokemon.species.baseSpecies !== 'Ogerpon') {
				  pokemon.canTerastallize = null;
        }
			}
			this.add('rule', 'Terastal Clause: You cannot Terastallize');
		},
	},
};
