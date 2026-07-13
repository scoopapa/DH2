import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 9] RPG Mod",
		mod: 'rpgmod',
		desc: `A metagame based on various characters from different turn-based rpg franchises.`,
		threads: [
			'&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3711007/post-11040293">RPGMod</a>',
		],
		ruleset: ['Standard NatDex', 'Data Mod', 'Terastal Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod'],
		banlist: ['Arena Trap'],
		unbanlist: ['Mega Sol'],
		teambuilderFormat: 'National Dex',  
		onValidateTeam(team, format) {
			let speciesTable = {};
			let allowedTiers = ['Rpgmod'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in RPGMod.'];
				}
			}
		},
	}
];