import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 9] Secret Santa v2",
	    desc: '<b>[Gen 9] Secret Santa</b>: One person sets restrictions for another to follow in the creation of a fakemon".',
		threads: [
			'&bullet; <a href="https://www.smogon.com/forums/threads/secret-santa-slate-1.3789225/">Secret Santa</a>',
		],
		mod: 'secretsantav2',
		ruleset: ['Standard', 'Terastal Clause', 'Data Mod'],
		banlist: ['Baton Pass'],
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