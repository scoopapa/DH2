import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 9] Public Domain",
		desc: `<b>[Gen 9] Public Domain</b>:, a fakemon meta where .`,
		threads: [
			`<a href="https://www.smogon.com/forums/threads/public-domain-slate-4-title-screen.3768377/">Pet Mod - Public Domain</a>`,
		],
		mod: 'publicdomain',
		teambuilderFormat: "National Dex",
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Data Mod', 'Sleep Clause Mod', 'Terastal Clause', 'Mega Data Mod', 'Z-Move Clause'],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['PD'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Public Domain.'];
				}
			}
		},
	}
];