export const Rulesets: import('../../../sim/dex-formats').ModdedFormatDataTable = {
	terastalclause: {
		effectType: 'Rule',
		name: 'Terastal Clause',
		desc: "Only Pok&eacute;mon with TeraForms can Terastallize",
		onBegin() {
			for (const pokemon of this.getAllPokemon()) {
				pokemon.canTerastallize = null;
			}
			this.add('rule', 'Terastal Clause: Only Pokemon with TeraForms can Terastallize');
		},
	},
};
