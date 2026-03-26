import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 9] Regional Evolutions",
		desc: 'A NatDex micrometa, with only new regional forms and regional evolutions!',
		threads: [],
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Evasion Items Clause', 'Species Clause', 'Sleep Clause Mod', 'Z-Move Clause', 'Data Mod', 'Mega Data Mod', 'Terastal Clause'],
		banlist: ['Arena Trap', 'Moody', 'Sand Veil', 'Shadow Tag', 'Snow Cloak', 'King\'s Rock', 'Quick Claw', 'Baton Pass'],
		teambuilderFormat: 'National Dex',
		onValidateTeam(team, format) {
			let speciesTable = {};
			let allowedTiers = ['RegEvo', 'RegEvo NFE'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in RegEvo.'];
				}
			}
		},
		mod: 'regionalevolutions',
	}
];