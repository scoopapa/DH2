import { FormatData } from '../../../../sim/dex-formats';

export const format: FormatData = {
		name: "[Gen 9] A Golden Experience RU",
		desc: `A fun metagame where we try to make everything viable, or at least usable. We also have new Fakemons!`,
		threads: [
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1YJXE8wUNJijWSfNKIUqgObN5uEVgTliewTluGe0w4Y4/edit?usp=sharing">Spreadsheet for the mod</a>`,
		],
		mod: 'agoldenexperience',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Clause', 'Species Clause', 'Sleep Clause Mod', 'Terastal Clause', 'Data Mod', 'Mega Data Mod', 'Z-Move Clause'],
		banlist: [
			'Uber', 'AG', 'OU', 'UUBL', 'UU', 'RUBL', 'Moody', 'Power Construct', 'King\'s Rock',
			'Baton Pass', 'Last Respects', 'Quick Claw', 'Razor Fang', 'Shed Tail',
			'Drizzle', 'Drought', 'Light Clay', 
		],
		unbanlist: ['Battle Bond', 'Greninja-Bond', 'Light of Ruin'],
		teambuilderFormat: 'National Dex RU',
	};