import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 9] National Dex ZA OU",
		desc: `Speculative turn-based metagame using Pok&eacute;mon obtainable in Legends: Z-A, but with National Dex learnsets.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3772808/">Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/posts/10749086">List of Changes</a>`,
		],
		mod: 'natdexza',
		ruleset: ['Standard', 'Sleep Moves Clause', '!Sleep Clause Mod', 'Terastal Clause'],
		banlist: ['Uber', 'Arena Trap', 'Moody', 'Power Construct', 'Shadow Tag', 'King\'s Rock', 'Light Clay', 'Quick Claw', 'Razor Fang', 'Baton Pass', 'Last Respects', 'Shed Tail'],
		teambuilderFormat: 'National Dex',
	}
];