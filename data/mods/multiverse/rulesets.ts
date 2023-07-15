export const Formats: {[k: string]: FormatData} = {
	multiversemod: {
		effectType: 'Rule',
		name: 'Multiverse Mod',
		desc: 'At the start of a battle, gives each player a link to the Multiverse spreasheet so they can use it to get information about the metagame.',
		onBegin() {
			this.add(`raw|<img src="https://www.smogon.com/forums/attachments/multiverse-png.415286/" height="212" width="381">`);
			this.add('-message', `Welcome to Multiverse!`);
			this.add('-message', `This is a Pet Mod where Pokemon are balanced around a niche they have in a metagame.!`);
			this.add('-message', `You can find our spreadsheet with all the new additions here:`);
			this.add('-message', `https://docs.google.com/spreadsheets/d/1z4aeAAeQR_HkWKA0Q81gWIz-jQfBMTnSDzBx9E6lcH8/edit?usp=sharing`);
			this.add('-message', `Good luck and have fun with your battle!`);
		},
	},
	teampreview: {
		effectType: 'Rule',
		name: 'Team Preview',
		desc: "Allows each player to see the Pok&eacute;mon on their opponent's team before they choose their lead Pok&eacute;mon",
		onBegin() {
			this.add('clearpoke');
			for (const pokemon of this.getAllPokemon()) {
				const details = pokemon.details.replace(', shiny', '')
					.replace(/(Mimikyu|Genesect)(-[a-zA-Z?-]+)?/g, '$1-*');
				this.add('poke', pokemon.side.id, details, '');
			}
		},
		onTeamPreview() {
			this.makeRequest('teampreview');
		},
	},
};
