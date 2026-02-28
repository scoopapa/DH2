import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 9] CommunityUsed 2: Regional Dex",
		mod: 'communityused2',
		desc: `A micrometa that combines secret santa with Generation X.`,
		ruleset: ['Standard NatDex', 'Data Mod', 'Terastal Clause', 'Z-Move Clause', 'OHKO Clause', 'Evasion Clause', 'Species Clause', 'Sleep Clause Mod'],
		teambuilderFormat: 'National Dex',
		banlist: ['Baton Pass'],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3711007/post-10093481">CU2 on Smogon Forums</a>`,
		],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['CU2 OU', 'CU2 NFE'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in CommunityUsed 2.'];
				}
			}
		},
	},
	{
		name: "[Gen 9] CU2 Random Battle",
		desc: `A micrometa that combines secret santa with Generation X.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3711007/post-10093481">CU2 on Smogon Forums</a>`,
		],
		mod: 'communityused2',
		team: 'random',
		ruleset: ['Obtainable', 'Species Clause', 'HP Percentage Mod', 'Sleep Clause Mod', 'Terastal Clause', 'Cancel Mod'],
	}
];