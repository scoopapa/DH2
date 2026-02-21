import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
{
		name: "[Gen 9] Dead Cells",
		desc: [
			"bweeeeh"
		],
		threads: [
		/*	`&bullet; <a href="">Do Not Use</a>`,*/
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1dZeB11mp_zb99EmeZ6gn6s3PVx-sxKQ6YbhkmagMks8/">Datasheet</a>,`
		],
		mod: 'donotuse',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Evasion Items Clause', 'Species Clause', 'Sleep Clause Mod', 'Mega Rayquaza Clause', 'Terastal Clause', 'Z-Move Clause'],
		teambuilderFormat: 'National Dex',
		banlist: ['Huge Power', 'Pure Power', 'Shadow Tag', 'Arena Trap', 'Baton Pass', 'Moody', 'Cute Charm', 'Hustle', 'Sand Veil', 'Snow Cloak'],
		unbanlist: ['Assist'],
		onValidateTeam(team, format) {
			let speciesTable = {};
			let allowedTiers = ['DeCe', 'DeCe NFE', 'DeCe LC'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in [Gen 9] Dead Cells.'];
				}
			}
		},
	},
];