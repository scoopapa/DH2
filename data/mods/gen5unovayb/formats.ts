import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 5] Best Wishes from YB",
		desc: [
			"<b>Best Wishes from YB</b>: A Gen 5 Solomod where are only Unovan Pokemon are allowed, with them getting many changes.",
		],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3778759/">Thread on the Smogon Forums</a>`,
		],
		mod: 'gen5unovayb',
		ruleset: ['Standard', 'Sleep Moves Clause', 'Swagger Clause', 'Data Mod'],
		banlist: ['Uber', 'Shadow Tag', 'King\'s Rock', 'Razor Fang', 'Soul Dew', 'Assist', 'Hidden Power', 'Baton Pass'],
	},
	{
		name: "[Gen 5] Best Wishes from YB Random Battle",
		desc: [
			"<b>Best Wishes from YB</b>: A Gen 5 Solomod where are only Unovan Pokemon are allowed, with them getting many changes.",
		],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3778759/">Thread on the Smogon Forums</a>`,
		],
		mod: 'gen5unovayb',
		team: 'random',
		ruleset: ['Species Clause', 'HP Percentage Mod', 'Cancel Mod', 'Sleep Clause Mod', 'Illusion Level Mod', 'Data Mod'],
	},
];
