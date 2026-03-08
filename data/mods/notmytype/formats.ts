import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 9] Not My Type",
		desc: `Not My Type, a tier with user-submitted Fakemon only that's built around three of the eighteen types being removed. These three types are Electric, Ground, Rock.`,
		threads: [
			`<a href="https://www.smogon.com/forums/threads/not-my-type.3773605/">Gen 9 Not My Type</a>`,
		],
		mod: 'notmytype',
		teambuilderFormat: "National Dex",
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Data Mod', 'Sleep Moves Clause', 'Terastal Clause', 'Z-Move Clause'],
		banlist: [],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['NMT'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Not My Type.'];
				}
			}
		},
	}
];