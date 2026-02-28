import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	/*{
		name: "[Gen 8] Roulettemons Random",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3649106/">Roulettemons on Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1EOA1m7JXTq7Zz0ViVI4n6lBppFjVBa4S1GqhAwkPTZQ/edit?usp=sharing">Spreadsheet</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1J5ZMVzTAfJ48KQWVE7jt1S6fm7Y8DQX1tFX0-iENWiw/edit?usp=sharing">Bonus Random Team Generator</a>`,
		],
		team: 'random',
		mod: 'roulettemons',
		ruleset: ['Standard NatDex', 'Dynamax Clause', 'Sleep Clause Mod'],
		onSwitchIn(pokemon) {
			this.add('-start', pokemon, 'typechange', pokemon.species.types.join('/'), '[silent]');
		},
		onChangeSet(set) {
			if (set.species === 'Chillyte-Mega') {
				set.species = 'Chillyte';
				set.ability = 'Grassy Surge';
			}
		},
	},
	{
		name: "[Gen 8] Roulettemons Random Doubles",
		threads: [
		   `&bullet; <a href="https://www.smogon.com/forums/threads/3649106/">Roulettemons on Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1EOA1m7JXTq7Zz0ViVI4n6lBppFjVBa4S1GqhAwkPTZQ/edit?usp=sharing">Spreadsheet</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1J5ZMVzTAfJ48KQWVE7jt1S6fm7Y8DQX1tFX0-iENWiw/edit?usp=sharing">Bonus Random Team Generator</a>`,
		],
		team: 'random',
		gameType: 'doubles',
		mod: 'roulettemons',
		ruleset: ['Standard NatDex', 'Sleep Clause Mod'],
		onSwitchIn(pokemon) {
			this.add('-start', pokemon, 'typechange', pokemon.species.types.join('/'), '[silent]');
		},
		onChangeSet(set) {
			if (set.species === 'Chillyte-Mega') {
				set.species = 'Chillyte';
			}
		},
	}*/
];