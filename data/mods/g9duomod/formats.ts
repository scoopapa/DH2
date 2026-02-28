import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
        name: "[Gen 9] Duomod Random Battle",
        desc: `<b>gen 9 duomod back and better than ever baybeeeeee</b>`,
        threads: [
            `&bullet; <a href="https://docs.google.com/spreadsheets/d/1VZp8emRachS_ieusnF8FWKFqTcOUjrVyr393J-J17pY/edit?usp=sharing">Spreadsheet</a>`,
        ],
        team: 'random',
        mod: 'gen9duomod',
        ruleset: ['Standard NatDex', 'Subscribe For More Content', 'Duomod Data Mod'],
        onSwitchIn(pokemon) {
            this.add('-start', pokemon, 'typechange', pokemon.species.types.join('/'), '[silent]');
        },
    }
];