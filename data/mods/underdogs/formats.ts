import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 9] Underdogs",
		mod: 'underdogs',
		desc: `A metagame dedicated to exploring weak design features in Pokemon (poor typings, awful abilities, restricted movepools and low stats) and attempts to make them Work.`,
		ruleset: ['Standard NatDex', 'Data Mod', 'Sleep Moves Clause', 'Z-Move Clause', 'Dynamax Clause', 'Terastal Clause'],
		banlist: ['Baton Pass', 'Hidden Power', 
			'Bright Powder', 'Lax Incense', 'King\'s Rock', 'Razor Fang', 'Quick Claw', 
			'Golurkite', 'Houndoominite', 'Swampertite', 'Staraptite'],
		teambuilderFormat: 'National Dex',
		onValidateTeam(team, format) {
			let speciesTable = {};
			let allowedTiers = ['underdogs'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Underdogs.'];
				}
			}
		},
	}
];