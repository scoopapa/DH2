import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 9] Ma'adowr VGC Lost Zone",
		desc: 'Solomod mainly based on cryptids, myths, and spiritualism and run by BlueRay',
		threads: [
								`&bullet; <a href="https://docs.google.com/spreadsheets/d/1oGLi8VC1af6SDyTwUNwoIFN0z868v477pXkIaVRDdDE/edit?gid=168383836#gid=168383836">Spreadsheet</a>`,
		      ],
		gameType: 'doubles',
		ruleset: ['Standard NatDex', 'Flat Rules', '!! Adjust Level = 50', 'VGC Timer', 'Open Team Sheets', 'Data Mod', 'Z-Move Clause', 'Dynamax Clause', 'Terastal Clause', 'Mega Data Mod'],
		banlist: ['Frustration', 'Hail', 'Hidden Power', 'Magic Powder', 'Pursuit', 'Return'],
		teambuilderFormat: 'National Dex',
		onValidateTeam(team, format) {
			let speciesTable = {};
			let allowedTiers = ['LZ', 'LZ NFE'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Lost Zone.'];
				}
			}
		},
		mod: 'maadowrlostzone',
	}
];