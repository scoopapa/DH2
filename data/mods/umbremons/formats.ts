import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 9 Champions] UmbreMons VGC 2026 Reg M-B",
		desc: `A format centered around introducing new/altered moves, abilities, items, and Pokemon adjustments to Champions VGC.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/umbremons-slate-1.3784079/">UmbreMons</a>`,
		],
		mod: 'umbremons',
		gameType: 'doubles',
		bestOfDefault: true,
		ruleset: ['Flat Rules', 'Open Team Sheets', 'Data Mod'], // Bye Bye vgc timer
		// teambuilderFormat: "National Dex",
	},
];
