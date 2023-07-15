export const Formats: {[k: string]: ModdedFormatsData} = {
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
			this.add('-message', "Welcome to RBY Expansion Pack!");
			this.add('-message', "This is a Solomod that adds things like scrapped content and crossgen evos to RBY OU.");		
			this.add('-message', "For more information, please check this spreadsheet - ");	
			this.add('-message', "https://docs.google.com/spreadsheets/d/1AVXdy6hSW_TtPr0HSGW9JT4m0bstLlPXnH3ccl-rQ20/edit?usp=sharing");	
		},
	},
};
