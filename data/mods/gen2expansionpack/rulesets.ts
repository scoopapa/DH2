export const Rulesets: {[k: string]: ModdedFormatData} = {
	obtainablemoves: {
		inherit: true,
	},
	standard: {
		effectType: 'ValidatorRule',
		name: 'Standard',
		ruleset: ['Obtainable', 'Sleep Clause Mod', 'Freeze Clause Mod', 'Species Clause', 'Nickname Clause', 'OHKO Clause', 'Evasion Items Clause', 'Evasion Moves Clause', 'Endless battle Clause', 'HP Percentage Mod', 'Cancel Mod'],
		banlist: [
			'Hypnosis + Mean Look',
			'Hypnosis + Spider Web',
			'Lovely Kiss + Mean Look',
			'Lovely Kiss + Spider Web',
			'Sing + Mean Look',
			'Sing + Spider Web',
			'Sleep Powder + Mean Look',
			'Sleep Powder + Spider Web',
			'Spore + Mean Look',
			'Spore + Spider Web',
		],
	},
	welcomemessage: {
		effectType: 'Rule',
		name: 'Welcome Message',
		desc: '',
		onBegin() {
			this.add('-message', "Welcome to Johto Expansion Pack!");
			this.add('-message', "This is a Solomod that adds things like scrapped content and crossgen evos to GSC OU.");
			this.add('-message', "For more information, please check this spreadsheet - ");
			this.add('-message', "https://docs.google.com/spreadsheets/d/1t54hCQrMGj102ck9L7mW47GJxrHMmJy5Ygum6ldWVX0/edit?usp=sharing");
		},
	},
}