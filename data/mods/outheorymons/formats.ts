import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 9] OU Theorymons",
		desc: '<b>[Gen 9] OU Theorymons</b>: Fixing niche and unseen Pokemon in the SV OU Metagame with small buffs.',
		threads: [
				`&bullet; <a href="https://www.smogon.com/forums/threads/sv-ou-theorymon.3723892/">OU Theorymon on Smogon Forums</a>`,
			],
		mod: 'outheorymons',
		ruleset: ['Standard', 'Data Mod'],
		banlist: ['Uber', 'AG', 'Arena Trap', 'Moody', 'Sand Veil', 'Shadow Tag', 'Snow Cloak', 'King\'s Rock', 'Baton Pass', 'Last Respects', 'Shed Tail'],
	},
	{
		name: "[Gen 9] Dream World Theorymons",
		desc: '<b>[Gen 8] Gen 9 Dream World Theorymons</b>: A testing ground for the Gen 9 OU Theorymons metagame.',
		mod: 'outheorymons',
		ruleset: ['Standard', 'Data Mod'],
		banlist: ['Uber', 'AG', 'Arena Trap', 'Moody', 'Sand Veil', 'Shadow Tag', 'Snow Cloak', 'King\'s Rock', 'Baton Pass', 'Last Respects'],
	},
	/*{
      name: "[Gen 8] OU Theorymons Random Battle",
      threads: [
          `&bullet; <a href="https://www.smogon.com/forums/threads/ss-ou-theorymon.3695574/">OU Theorymons on Smogon Forums</a>`,
          `&bullet; <a href="https://docs.google.com/spreadsheets/d/1AgqKo8IiXky8apuu0FUgx4MJRVtsVwtuhg_Wj_ACgao/edit#gid=0">Spreadsheet</a>`,
      ],
      team: 'random',
		mod: 'outheorymons',
		ruleset: ['Dynamax Clause', 'Data Mod', 'Species Clause'],
	}*/
];