import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 8] Duomod Random Battle",
		desc: `<b>Duomod</b>: Legendary YouTuber and professional Smash player DuoM2's solomod, build around the idea where nobody is ever truly losing.`,
        threads: [
            `&bullet; <a href="https://docs.google.com/spreadsheets/d/1lguyF31tjV8f-Gv3uLxmZXGAlg23k2fkF_nBqevJouM/edit?usp=sharing">Spreadsheet</a>`,
        ],
		team: 'random',
		mod: 'duomod',
		ruleset: ['Standard NatDex', 'Subscribe For More Content', 'Duomod Data Mod'],
		onSwitchIn(pokemon) {
			this.add('-start', pokemon, 'typechange', pokemon.species.types.join('/'), '[silent]');
		},
	}
];