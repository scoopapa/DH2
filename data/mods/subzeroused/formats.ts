import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 9] SU",
		desc: [
			"<b>Sub-Zero Used</b>: An unofficial usage-based tier below ZU.",
		],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3711007/post-10985413">Post in Solomods Megathread</a>`,
		],
		mod: 'subzeroused',
		ruleset: ['Standard', 'Sleep Moves Clause', '!Sleep Clause Mod'],
		banlist: [
      'Uber', 'AG', 'OU', 'UUBL', 'UU', 'RUBL', 'RU', 'NUBL', 'NU', 'PUBL', 'PU', 'ZUBL',
      'Arena Trap', 'Moody', 'Sand Veil', 'Shadow Tag', 'Snow Cloak', 'King\'s Rock', 'Razor Fang',
      'Baton Pass', 'Last Respects', 'Shed Tail', 'Tera Blast', 'Unburden', 'Heat Rock', 'Damp Rock', 'Drought', 'Quick Claw',
      'Light Clay', 'Basculin', 'Brute Bonnet', 'Charizard', 'Clawitzer', 'Drifblim', 'Farigiraf', 'Froslass', 'Gurdurr',
      'Hitmontop', 'Houndoom', 'Jolteon', 'Lycanroc', 'Magneton', 'Malamar', 'Medicham', 'Mesprit', 'Minior', 'Muk', 'Orthworm',
      'Regirock', 'Sableye', 'Sandslash', 'Skuntank', 'Sneasel', 'Sneasel-Hisui', 'Spiritomb', 'Typhlosion', 'Venusaur', 'Vikavolt',
      'Weezing', 'Whimsicott', 'Whiscash', 'Beartic', 'Primeape', 'Tauros-Paldea-Combat', 'Virizion',
    ],
	}
];
