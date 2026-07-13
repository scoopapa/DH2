import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 9] Resetmons",
		teambuilderFormat: "National Dex",
		desc: 'A metagame where there are only thirty moves, consisting entirely of fakemon!',
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/resetmons-first-iteration-coming-to-dragonhaven-soon-stay-tuned-for-slate-5s-arrival.3778771/"></a>`,
		],
		mod: 'resetmons',
		ruleset: ['Standard NatDex', 'Data Mod', 'Terastal Clause'],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['Resetmons'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Resetmons.'];
				}
			}
		},
	}
];
