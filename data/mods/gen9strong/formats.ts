import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 9] National Dex Strongest State",
		threads: [
		],

		mod: 'gen9strong',
		ruleset: ['Standard NatDex', 'Terastal Clause', 'OHKO Clause', 'Evasion Clause', 'Species Clause', 'Sleep Moves Clause'/*, 'Para Moves Clause'*/],
		banlist: ['AG', 'Uber', 'Arena Trap', 'Moody', 'Power Construct', 'Shadow Tag', 'King\'s Rock', 'Quick Claw', 'Razor Fang', 'Baton Pass',
				'Blizzard', 'Explosion', 'Self-Destruct', 'Drizzle', 'Drought', 'Sand Stream', 'Aguav Berry', 'Figy Berry', 'Iapapa Berry', 'Mago Berry', 'Soul Dew', 'Wiki Berry', 'Last Respects',
		],
		teambuilderFormat: 'National Dex',
	},
	{
		name: "[Gen 9] National Dex Strongest State Ubers",
		threads: [
		],

		mod: 'gen9strong',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Clause', 'Species Clause', 'Sleep Moves Clause'],
		banlist: ['AG', 'Baton Pass', 'Blizzard', 'Moody'],
		teambuilderFormat: 'National Dex Uber',
	}
];