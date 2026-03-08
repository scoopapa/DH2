import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 9] Dex Reversal",
		threads: [
			`<a href="https://www.smogon.com/forums/threads/solomods-megathread.3711007/post-10062853">Dex Reversal</a>`,
		],
		teambuilderFormat: "National Dex",
		mod: 'dexreversal',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Clause', 'Species Clause', 'Sleep Moves Clause', 'Mega Data Mod', 'Data Mod', 'Terastal Clause', 'Z-Move Clause'],
		banlist: ['Baton Pass', 'King\'s Rock', 'Razor Fang', 'Moody', 'Smeargle', 'Shell Smash', 'Shadow Tag', 'Calyrex-Ice', 'Eternatus-Eternamax', 'Medichamite'],
	}
];