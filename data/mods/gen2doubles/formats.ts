import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 2] GSC Doubles Ubers",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/gsc-doubles-new-lcots.3755811/">Thread on Smogon</a>`,
		],

		mod: 'gen2doubles',
		gameType: 'doubles',
		ruleset: ['Standard Doubles', 'Swagger Clause'],
		banlist: ['Bright Powder', 'King\'s Rock', 'Quick Claw'],
	},
	{
		name: "[Gen 2] GSC Doubles OU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/gsc-doubles-new-lcots.3755811/">Thread on Smogon</a>`,
		],

		mod: 'gen2doubles',
		gameType: 'doubles',
		ruleset: ['Standard Doubles', 'Swagger Clause'],
		banlist: ['Uber', 'Bright Powder', 'King\'s Rock', 'Quick Claw'],
	},
	{
		name: "[Gen 2] GSC Doubles UU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/gsc-doubles-new-lcots.3755811/">Thread on Smogon</a>`,
		],

		mod: 'gen2doubles',
		gameType: 'doubles',
		ruleset: ['Standard Doubles', 'Swagger Clause'],
		banlist: ['OU', 'Uber', 'Bright Powder', 'King\'s Rock', 'Quick Claw'],
	},
	{
		name: "[Gen 2] GSC Doubles Random Battle",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/gsc-doubles-new-lcots.3755811/">Thread on Smogon</a>`,
		],

		mod: 'gen2doubles',
		gameType: 'doubles',
		team: 'random',
		ruleset: ['Standard Doubles', 'Swagger Clause'],
		banlist: ['Uber', 'Bright Powder', 'King\'s Rock', 'Quick Claw'],
	},
	{
		name: "[Gen 2] VGC 2001",
		mod: 'gen2doubles',
		gameType: 'doubles',
		ruleset: ['Flat Rules', '!! Adjust Level = 50', 'VGC Timer', 'Open Team Sheets', 'Team Preview', 'Picked Team Size = 4', 'Min Source Gen = 2'],
		banlist: [],
		// teambuilderFormat: 'OU',
	}
];
