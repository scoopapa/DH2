import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 9] VGC 20xx",
		desc: ["Custom VGC format by sugarbear",
		      ],
		threads: [
				`&bullet; <a href="https://www.smogon.com/forums/threads/vgc-20xx-slate-11-regional-starters.3748800/">VGC 20xx on Smogon Forums</a>`,
				`&bullet; <a href="https://docs.google.com/spreadsheets/d/1QCYYfW_sW13N7ZjympTL3k0QraBAa42qWl8sJRJw63s/edit?gid=0#gid=0">Spreadsheet New Stuff</a>`,
				`&bullet; <a href="https://docs.google.com/spreadsheets/d/1C-SvNhnPrRbzfZ-zPIWEi-ylVJzwhlmCCK9xK_ErGOE/edit?gid=0#gid=0">Spreadsheet Returning Stuff and Changes</a>`,
		      ],
	//	searchShow: false,
		gameType: 'doubles',
		ruleset: ['Flat Rules', '!! Adjust Level = 50', 'Min Source Gen = 9', 'VGC Timer', 'Terastal Clause', 'Data Mod', 'Force Open Team Sheets', 'Best of = 3'],
		mod: 'gen9vgc20xx',
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['VGC', 'VGC NFE'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in VGC 20xx.'];
				}
			}
		},
	}
];