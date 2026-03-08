import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 9] Speculative Legends Z-A OU",
		mod: 'plza',
		ruleset: ['Standard', 'Terastal Clause', 'Sleep Moves Clause', '!Sleep Clause Mod', 'Mega Data Mod'],
		banlist: [
			'Arena Trap', 'Moody', 'Shadow Tag', 'King\'s Rock', 'Baton Pass', 'Last Respects', 'Shed Tail',
			'Alakazite', 'Blastoisinite', 'Gengarite', 'Salamencite', 'Metagrossite', 'Lucarionite', 'Power Construct',
		],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['FE ZA', 'NFE ZA', 'LC ZA', 'Transfer'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in PLZA.'];
				}
			}
		},
  	},
	{
		name: "[Gen 9] Speculative Legends Z-A VGC",
		gameType: 'doubles',
		ruleset: ['Flat Rules', '!! Adjust Level = 50', 'Min Source Gen = 9', 'VGC Timer', 'Open Team Sheets', 'Mega Data Mod', 'Terastal Clause'],
		banlist: [
			'Mewtwo', 'Xerneas', 'Yveltal', 'Zygarde', 'Diancie', 'Hoopa', 'Volcanion',
		],
		mod: 'plza',
		bestOfDefault: true,
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['FE ZA', 'NFE ZA', 'LC ZA', 'Uber ZA', 'Transfer'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in PLZA.'];
				}
			}
		},
	},
	{
		name: "[Gen 9] Speculative Legends Z-A FFA Royale",
		gameType: 'freeforall',
		mod: 'plza',
		ruleset: ['Standard', 'Terastal Clause', 'Sleep Moves Clause', '!Sleep Clause Mod', 'Mega Data Mod'],
		banlist: [
			'Arena Trap', 'Moody', 'Shadow Tag', 'King\'s Rock', 'Baton Pass', 'Last Respects', 'Shed Tail',
			'Alakazite', 'Gengarite', 'Salamencite', 'Metagrossite', 'Lucarionite', 'Power Construct',
		],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['FE ZA', 'NFE ZA', 'LC ZA', 'Transfer'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in PLZA.'];
				}
			}
		},
  	},
	{
		name: "[Gen 9] PLZA Custom Game",
		mod: 'plza',
		searchShow: false,
		debug: true,
		battle: {trunc: Math.trunc},
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod', 'Max Team Size = 24', 'Max Move Count = 24', 'Max Level = 9999', 'Default Level = 100', 'Mega Data Mod'],
	}
];