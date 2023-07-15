// Note: These are the rules that formats use
// The list of formats is stored in config/formats.js
export const Formats: {[k: string]: FormatData} = {

	// Rulesets
	///////////////////////////////////////////////////////////////////

	crystalseviiislandsmod: {
		effectType: 'Rule',
		name: 'Crystal: Sevii Islands Mod',
		desc: 'At the start of a battle, gives each player a link to the Crystal: Sevii Islands spreasheet so they can use it to get information about new additions to the metagame.',
		onBegin() {
			this.add(`raw|<img src="https://www.smogon.com/forums/attachments/151df61d-7d50-438a-ac00-32f18fe1424b-png.395890/" height="212" width="381">`);
			this.add('-message', `Welcome to Crystal: Sevii Islands!`);
			this.add('-message', `This is a [Gen 2] OU-based format where we add new Fakemon, items, moves and even lore!`);
			this.add('-message', `You can find our spreadsheet with all the new additions here:`);
			this.add('-message', `https://docs.google.com/spreadsheets/d/1QL_789vTzxG8An43itUxPonK9ee7ezxH6GCR9dD_JyQ/edit?usp=sharing`);
			this.add('-message', `Good luck and have fun with your battle!`);
		},
	},
};
