// Note: These are the rules that formats use
// The list of formats is stored in config/formats.js
export const Formats: {[k: string]: FormatData} = {

	// Rulesets
	///////////////////////////////////////////////////////////////////

	hoenngaidenmod: {
		effectType: 'Rule',
		name: 'Hoenn Gaiden Mod',
		desc: 'At the start of a battle, gives each player a link to the Hoenn Gaiden thread so they can use it to get information about new additions to the metagame.',
		onBegin() {
			this.add(`raw|<img src="https://cdn.discordapp.com/attachments/510822010922860545/864665757446045716/Hoenn_Gaiden_Banner.png" height="213" width="381">`);
			this.add('-message', `Welcome to Hoenn Gaiden!`);
			this.add('-message', `This is a [Gen 3] OU-based format where we add later generation Pokemon, items, moves, and abilities, as well as change up existing ones!`);
			this.add('-message', `You can find our thread and metagame resources here:`);
			this.add('-message', `https://www.smogon.com/forums/threads/hoenn-gaiden-pet-mod-of-the-season-slate-8-concept-voting.3681339/`);
		},
	},
	hgouteambuilder: {
		effectType: 'Rule',
		name: 'HG OU Teambuilder',
	}
};
