import { FormatData } from '../../../sim/dex-formats';

export const format: FormatData = {
		name: "[Gen 9] Breeding Variants V4",
		desc: `A NatDex format that adds alternate forms for Pokemon based around inheriting elements from a possible breeding partner.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/breeding-variants-v4.3760184/">Breeding Variants V4</a>`,
		],
		mod: 'breedingvariantsnatdex',
		teambuilderFormat: "National Dex",
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Data Mod', 'Sleep Clause Mod', 'Terastal Clause', 'Mega Data Mod'],
		banlist: [
			'Uber', 'AG', 'Arena Trap', 'Moody', 'Power Construct', 'Shadow Tag', 'King\'s Rock',
			'Quick Claw', 'Razor Fang', 'Assist', 'Baton Pass', 'Last Respects', 'Shed Tail',
		],
	};