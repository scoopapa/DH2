import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 9] CCAPM 2024",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3754552/">Community Create-A-Pet Mod 2024</a>`,
		],
		mod: 'ccapm2024',
		teambuilderFormat: "National Dex",
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Sleep Clause Mod', 'Data Mod', 'Terastal Clause'],
		banlist: [],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['CCAPM2024'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in CCAPM 2024.'];
				}
			}
		}
	},
	{
		name: "[Gen 9] CCAPM 2024 Random Battle",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3754552/">Community Create-A-Pet Mod 2024</a>`,
		],
		mod: 'ccapm2024',
		team: 'random',
		ruleset: ['Obtainable', 'Species Clause', 'HP Percentage Mod', 'Sleep Clause Mod', 'Terastal Clause', 'Cancel Mod', 'Data Mod'],
	}
];