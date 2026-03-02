// This is unused right now because it keeps breaking.

import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 9] Dead Cells",
		desc: "bweeeeh",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3711007/post-10882279">Dead Cells on Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1dZeB11mp_zb99EmeZ6gn6s3PVx-sxKQ6YbhkmagMks8/">Datasheet</a>`,
			`&bullet; <a href="https://deadcells.wiki.gg/">Dead Cells Wiki</a>`,
		],
		mod: 'deadcells',
		ruleset: ['Standard NatDex', 'Data Mod', 'Terastal Clause'],
		banlist: [/*"DeCe Uber",*/ "Dire Claw", "Shadow Tag", "Choice Band", "Choice Specs", "Eviolite"],
		onValidateTeam(team, format) {
			let speciesTable = {};
			let allowedTiers = [/*'DeCe Uber',*/ 'DeCe', 'DeCe NFE', 'DeCe LC'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Dead Cells OU.'];
				}
			}
		},
	},
	{
		name: "[Gen 9] Dead Cells Ubers",
		desc: "bweeeeh",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3711007/post-10882279">Dead Cells on Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1dZeB11mp_zb99EmeZ6gn6s3PVx-sxKQ6YbhkmagMks8/">Datasheet</a>`,
			`&bullet; <a href="https://deadcells.wiki.gg/">Dead Cells Wiki</a>`,
		],
		mod: 'deadcells',
		ruleset: ['Standard NatDex', 'Data Mod', 'Terastal Clause'],
		banlist: ["Eviolite"],
		onValidateTeam(team, format) {
			let speciesTable = {};
			let allowedTiers = ['DeCe Uber', 'DeCe', 'DeCe NFE', 'DeCe LC'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Dead Cells Ubers.'];
				}
			}
		},
	},
];
