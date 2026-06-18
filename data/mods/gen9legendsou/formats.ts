import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
    {
		name: "[Gen 9] Legends Z-A OU",
		desc: `Speculative turn-based metagame using Pok&eacute;mon obtainable in Legends: Z-A, but with National Dex learnsets.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3772808/">Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/posts/10749086">List of Changes</a>`,
		],
		mod: 'gen9legendsou',
		ruleset: ['Standard', 'Sleep Moves Clause', '!Sleep Clause Mod', 'Min Source Gen = 3', 'Terastal Clause'],
		banlist: ['Uber', 'Arena Trap', 'Moody', 'Power Construct', 'Shadow Tag', 'King\'s Rock', 'Light Clay', 'Quick Claw', 'Razor Fang', 'Baton Pass', 'Last Respects', 'Shed Tail'],
	},
	{
		name: "[Gen 9] Legends Z-A Draft",
		desc: `Speculative turn-based metagame using Pok&eacute;mon obtainable in Legends: Z-A, but with National Dex learnsets.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3772808/">Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/posts/10749086">List of Changes</a>`,
		],
		mod: 'zadraft',
		ruleset: ['Standard Draft', 'Sleep Moves Clause', '!Sleep Clause Mod', 'Min Source Gen = 3', 'Terastal Clause', 'Freeze Clause Mod'],
		banlist: ['Moody', 'Power Construct', 'King\'s Rock', 'Light Clay', 'Quick Claw', 'Razor Fang', 'Last Respects', 'Shed Tail',
				'Greninja + Battle Bond + Greninjite', 'Slowbro-Galar + Slowbronite'],
	},
];