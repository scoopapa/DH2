import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 9] Secret Santa",
	    desc: '<b>[Gen 9] Secret Santa</b>: One person sets restrictions for another to follow in the creation of a fakemon".',
		threads: [
			'&bullet; <a href="https://www.smogon.com/forums/threads/secret-santa-the-pet-mod.3727745/">Secret Santa</a>',
			'https://docs.google.com/spreadsheets/d/1IPFlVP4osQhGtjNRheycCX0AnZiUVipumGwqKdhOS2s/edit#gid=1272593335">Spreadsheet</a>',
		],
		mod: 'secretsanta',
	  ruleset: ['Standard', 'Terastal Clause', 'Data Mod', '+Past'],
		banlist: [
			'Arena Trap', 'Moody', 'Shadow Tag', 'Baton Pass',
		],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (template.tier !== 'santa') {
					return [set.species + ' is not usable in Secret Santa.'];
				}
			}
		},
	}
];