// Note: These are the rules that formats use
// The list of formats is stored in config/formats.js
export const Formats: {[k: string]: FormatData} = {

	// Rulesets
	///////////////////////////////////////////////////////////////////	
	teampreview: {
		effectType: 'Rule',
		name: 'Team Preview',
		desc: "Allows each player to see the Pok&eacute;mon on their opponent's team before they choose their lead Pok&eacute;mon",
		onBegin() {
			this.add('clearpoke');
			for (const pokemon of this.getAllPokemon()) {
				const details = pokemon.details.replace(', shiny', '')
					.replace(/(Pumpkaboo)(-[a-zA-Z?-]+)?/g, '$1-*');
				this.add('poke', pokemon.side.id, details, '');
			}
		},
		onTeamPreview() {
			this.makeRequest('teampreview');
		},
	},
};
