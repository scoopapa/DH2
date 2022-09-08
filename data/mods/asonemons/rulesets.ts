// Note: These are the rules that formats use
// The list of formats is stored in config/formats.js
export const Formats: {[k: string]: FormatData} = {

	// Rulesets
	///////////////////////////////////////////////////////////////////

	asonemonsmod: {
		effectType: 'Rule',
		name: 'AsOnemons Mod',
		desc: 'At the start of a battle, gives each player a link to the AsOnemons spreasheet so they can use it to get information about the metagame.',
		onBegin() {
			this.add(`raw|<img src="https://cdn.discordapp.com/attachments/983778415620546576/985258209575051384/aso_eee.png" height="218" width="381">`);
			this.add('-message', `Welcome to AsOnemons!`);
			this.add('-message', `This is a [Gen 8] based micrometa where every Pokémon is a new As One form and gains a custom move!`);
			this.add('-message', `You can find our spreadsheet with the information on every Pokémon here:`);
			this.add('-message', `https://docs.google.com/spreadsheets/d/1TRYfbFkLYSnFrOidd42FvQVlOjgYBzuSoK4tCFZPNOU/edit?usp=sharing`);
			this.add('-message', `Good luck and have fun with your battle!`);
		},
	},
};
