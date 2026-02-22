import { FormatData } from '../../../sim/dex-formats';

export const format: FormatData = {
		name: "[Gen 9] Dead Cells",
		desc: "bweeeeh",
		threads: [
		/*	`&bullet; <a href="">Dead Cells on Smogon Forums</a>`,*/
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1dZeB11mp_zb99EmeZ6gn6s3PVx-sxKQ6YbhkmagMks8/">Datasheet</a>`,
			`&bullet; <a href="https://deadcells.wiki.gg/">Dead Cells Wiki</a>`,
		],
		mod: 'deadcells',
		ruleset: ['Standard NatDex', 'Data Mod', 'Terastal Clause', 'Z-Move Clause'],
		teambuilderFormat: 'National Dex',
	/*	banlist: [''], */
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
	};