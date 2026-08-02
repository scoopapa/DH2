import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 9] Pacifistmons 2",
		mod: 'pacifistmons',
		desc: `Micrometa where all Pokemon have no attacks.`,
		ruleset: ['Standard Natdex', 'Data Mod'],
		teambuilderFormat: 'National Dex',
		onValidateTeam(team, format) {
			let speciesTable = {};
			let allowedTiers = ['PM'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Pacifistmons 2.'];
				}
			}
		},
	}
];