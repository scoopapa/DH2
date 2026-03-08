import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 9] Set in Stone",
		desc: [
			"<b>Set in Stone</b>: A micrometa where Pokemon are customized based on a combination of two player's set ideas.",
		],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/set-in-stone-phase-2-slate-2.3722451/post-9648171"> Set in Stone on Smogon Forums</a>`,
		      ],
		ruleset: ['Standard NatDex', 'Terastal Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Z-Move Clause', 'Data Mod', 'Mega Data Mod'],
		banlist: [],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if ( template.tier !== 'SS') {
					return [set.species + ' is not usable in Set in Stone.'];
				}
			}
		},
		mod: 'setinstone',
	}
];