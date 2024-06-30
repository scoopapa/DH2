export const Rulesets: {[k: string]: ModdedFormatsData} = {
	standard: {
		effectType: 'ValidatorRule',
		name: 'Standard',
		ruleset: ['Obtainable', 'Desync Clause Mod', 'Sleep Clause Mod', 'Freeze Clause Mod', 'Species Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod'],
		banlist: ['Dig', 'Fly'],
	},

	welcomemessage: {
		effectType: 'Rule',
		name: 'Welcome Message',
		desc: 'https://www.youtube.com/channel/UCvVihnVokWwZ4NpeMsBk48A',
		onBegin() {
			this.add('-message', "Welcome to RBY Moonside!");
			this.add('-message', "For more information, please check this spreadsheet - -!");
			this.add('-message', "oh whoops wheres that spreadsheet...? oh well just wing it. And remember:");
			this.add('-message', "Fuzzy Pickle!");
		},
	},
};
