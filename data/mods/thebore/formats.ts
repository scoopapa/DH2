import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 9] NatDex The Bore",
		threads: [
		],

		mod: 'thebore',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Clause', 'Species Clause', 'Sleep Moves Clause', 'Z-Move Clause', 'Terastal Clause'],
		banlist: ['AG', 'Uber', 'Arena Trap', 'Moody', 'Shadow Tag', 'Zen Mode', 'King\'s Rock', 'Light Clay', 'Quick Claw', 'Razor Fang', 'Baton Pass'],
		teambuilderFormat: 'National Dex',
	},
	{
		name: "[Gen 9] NatDex The Bore UU",
		threads: [
		],

		mod: 'thebore',
		ruleset: ['[Gen 9] NatDex The Bore'],
		banlist: ['OU', 'UUBL'],
		teambuilderFormat: 'National Dex UU',
	}
];