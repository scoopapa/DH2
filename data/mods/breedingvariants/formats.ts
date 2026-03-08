import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 9] Breeding Variants V4 SV Cup",
		desc: `A SV OU format that adds alternate forms for Pokemon based around inheriting elements from a possible breeding partner.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/breeding-variants-v4.3760184/">Breeding Variants V4</a>`,
		],
		mod: 'breedingvariants',
		teambuilderFormat: "OU",
		ruleset: ['Standard', 'Data Mod', 'Sleep Moves Clause', '!Sleep Clause Mod'],
		banlist: ['Uber', 'AG', 'Arena Trap', 'Moody', 'Sand Veil', 'Shadow Tag', 'Snow Cloak', 'King\'s Rock', 'Razor Fang', 'Baton Pass', 'Last Respects', 'Shed Tail'],
	}
];