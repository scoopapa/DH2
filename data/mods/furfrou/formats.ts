import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 9] FurfrOU",
		mod: 'furfrou',
		desc: `A micrometagame balanced and designed around furry-adjacent Pokemon, as well as the OCs/sonas of Smogon's Furry userbase.`,
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Evasion Items Clause', 'Species Clause', 'Sleep Clause Mod', 'Z-Move Clause', 'Data Mod', 'Mega Data Mod', 'Terastal Clause'],
		threads: [
			`None`,
		],
		banlist: ['Arena Trap', 'Moody', 'Sand Veil', 'Shadow Tag', 'Snow Cloak', 'King\'s Rock', 'Quick Claw', 'Baton Pass', 'Last Respects', 'Hidden Power', 'Lucarionite'],
		teambuilderFormat: 'National Dex',
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['FROU', 'FROU (NFE)'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in FurfrOU.'];
				}
			}
		},
	}
];