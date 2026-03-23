import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 9] Mega Revolution",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/mega-revolution-slate-1-kanto-starters.3778769/">Thread on the Smogon Forums</a>`,
		],
		mod: 'megarevolution',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Clause', 'Species Clause', 'Sleep Moves Clause', 'Mega Stone Clause', 'Z-Move Clause', 'Terastal Clause'],
		banlist: ['AG', 'Uber', 'Arena Trap', 'Moody', 'Shadow Tag', 'Zen Mode', 'King\'s Rock', 'Light Clay', 'Quick Claw', 'Razor Fang', 'Baton Pass'],
		teambuilderFormat: 'National Dex',
	},
];