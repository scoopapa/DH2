import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 9] Crossover Chaos Expanded",
		desc: `Crossover Chaos Expanded`,
		threads: [
			`<a href="https://www.smogon.com/forums/threads/crossover-chaos-expanded-returns-gen-9-slate-6-alternate-forms-winners.3784483/">Gen 9 Crossover Chaos Expanded</a>`,
		],
		mod: 'ccex',
		teambuilderFormat: "National Dex",
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Data Mod', 'Sleep Moves Clause', 'Terastal Clause', 'Mega Data Mod'],
		//banlist: [],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['CCEX OU'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Crossover ChaosExpanded.'];
				}
			}
		}
	},
];