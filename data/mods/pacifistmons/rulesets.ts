export const Rulesets: import('../../../sim/dex-formats').ModdedFormatDataTable = {
	terapagosclause: {
		effectType: 'Rule',
		name: 'Terapagos Clause',
		desc: "Only allows Terapagos to Terastallize",
		onBegin() {
			for (const pokemon of this.getAllPokemon()) {
			  if (pokemon.species.baseSpecies !== 'Terapagos') {
				  pokemon.canTerastallize = null;
				}
			}
			this.add('rule', 'Terapagos Clause: Only Terapagos can Terastallize');
		},
	},
};
