import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 9] Worldbuilding",
		threads: [
			`<a href="https://www.smogon.com/forums/threads/3748841/">Worldbuilding</a>`,
		],
		mod: 'worldbuilding',
		ruleset: ['Standard NatDex', 'Evasion Moves Clause', 'Evasion Items Clause', 'Mega Rayquaza Clause', 'Terastal Clause', 'Z-Move Clause'],
		banlist: ['AG', 'Uber', 'Assist', 'Baton Pass'],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['WLB'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Worldbuilding.'];
				}
			}
		},
	}
];