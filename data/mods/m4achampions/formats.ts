import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 9 Champions] M4A VGC 2026 M-C",
		desc: ["<b>Megas for All</b>: A Pet Mod that aims to create unique Mega Evolutions for every fully evolved Pokémon. Current season is focused on regulation M-C of Pokemon Champions!",
		      ],
		threads: [
				`&bullet; <a href="https://www.smogon.com/forums/threads/3671140/">Megas for All v7 on Smogon Forums</a>`,
				`&bullet; <a href="https://docs.google.com/spreadsheets/d/1TdeAUUtjh0f_tcIBllbF_imgepwV-dV2YomoTCRlPgI/edit?usp=sharing">Spreadsheet</a>`,
				`&bullet; <a href="http://megasforall.wikidot.com/">Wiki</a>`
		      ],
		mod: 'm4achampions',
		gameType: 'doubles',
		bestOfDefault: true,
		ruleset: ['Flat Rules', 'Open Team Sheets', 'Data Mod', 'Terastal Clause', 'IV Clause'], // Bye Bye vgc timer
	},
];
