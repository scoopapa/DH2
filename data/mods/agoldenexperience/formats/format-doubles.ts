import { FormatData } from '../../../../sim/dex-formats';

export const format: FormatData = {
		name: "[Gen 9] A Golden Experience Doubles",
		desc: `A fun metagame where we try to make everything viable, or at least usable. We also have new Fakemons!`,
		threads: [
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1YJXE8wUNJijWSfNKIUqgObN5uEVgTliewTluGe0w4Y4/edit?usp=sharing">Spreadsheet for the mod</a>`,
		],
		mod: 'agoldenexperience',
		gameType: 'doubles',
		teambuilderFormat: 'National Dex Doubles',
		ruleset: ['Standard NatDex', 'Terastal Clause', 'Dynamax Clause', 'Data Mod', 'Mega Data Mod', 'Z-Move Clause'],
		banlist: [
			'DUber', 'Commander', 'Power Construct', 'Coaching', 'Dark Void', 'Swagger',
		],
		unbanlist: ['Battle Bond', 'Greninja-Bond', 'Light of Ruin'],
	};