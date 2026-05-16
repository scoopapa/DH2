import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 9] National Dex Weakest State",
		threads: [
		],

		mod: 'gen9weak',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Clause', 'Species Clause', 'Sleep Moves Clause', 'Terastal Clause'],
		banlist: ['AG', 'Uber', 'Arena Trap', 'Moody', 'Power Construct', 'Shadow Tag', 'King\'s Rock', 'Light Clay', 'Quick Claw', 'Razor Fang', 'Baton Pass', 'Hidden Power'],
		teambuilderFormat: 'National Dex',
	},
	{
		name: "[Gen 9] National Dex Weakest State Ubers",
		threads: [
		],

		mod: 'gen9weak',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Clause', 'Species Clause', 'Sleep Moves Clause'],
		banlist: ['AG'],
		teambuilderFormat: 'National Dex Uber',
	},
];