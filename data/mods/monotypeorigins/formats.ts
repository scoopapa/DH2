import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 9] Monotype: Origins", // Currently only the free form format is implemented
		desc: `A micrometa featuring a single monotype mon for each type. Inspired by Balls.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3711007/page-8#post-10202864">Monotype: Origins on Smogon Forums</a>`,
		],
		mod: 'monotypeorigins',
		ruleset: ['Standard NatDex', 'Terastal Clause'],
		teambuilderFormat: 'National Dex',
		onValidateTeam(team, format) {
			let speciesTable = {};
			let allowedTiers = ['MO'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (template.tier !== 'MO') {
					return [set.species + ' is not legal in Monotype: Origins.'];
				}
			}
		},
	}
];