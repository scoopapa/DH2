import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 9] i forgor OU",
		mod: 'iforgor',
		desc: `i forgor`,
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Data Mod', 'Sleep Clause Mod', 'Mega Data Mod'],
		onValidateTeam(team, format) {
			let speciesTable = {};
			let allowedTiers = ['IDK'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return ['you forgor ' + set.species + ' doesnt exist.'];
				}
			}
		},
	},
	{
		name: "[Gen 9] i forgor Ubers",
		mod: 'iforgor',
		desc: `i forgor`,
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Data Mod', 'Sleep Clause Mod', 'Mega Data Mod'],
		onValidateTeam(team, format) {
			let speciesTable = {};
			let allowedTiers = ['EF', 'IDK'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return ['you forgor ' + set.species + ' doesnt exist.'];
				}
			}
		},
	}
];