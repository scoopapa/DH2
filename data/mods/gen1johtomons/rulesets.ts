      export const Formats: {[k: string]: ModdedFormatsData} = {
	standard: {
		effectType: 'ValidatorRule',
		name: 'Standard',
		ruleset: ['Obtainable', 'Desync Clause Mod', 'Sleep Clause Mod', 'Freeze Clause Mod', 'Species Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod'],
		banlist: ['Dig', 'Fly'],
	},
	standardwithdigandfly: {
		effectType: 'ValidatorRule',
		name: 'Standard With Dig and Fly',
		ruleset: ['Obtainable', 'Desync Clause Mod', 'Stadium Sleep Clause', 'Freeze Clause Mod', 'Species Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod'],
	},
};
