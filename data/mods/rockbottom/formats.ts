import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 9] Rock Bottom",
		desc: [
			"<b>Rock Bottom</b>: A micrometa with an extremely low powerlevel and typically common strong tools being thinly distributed.",
		],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3711007/post-10151175">Post in the Solomods Megathread</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1BySngRBKJhUiq0-hynrDp2HVNqzWjL-8RaL8mQIyCqA/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: 'rockbottom',
		ruleset: ['Standard', 'Terastal Clause', 'Data Mod', 'Sleep Moves Clause', '!Sleep Clause Mod'],
		banlist: ['Arena Trap', 'Moody', 'Shadow Tag', 'King\'s Rock', 'Baton Pass', 'Last Respects', 'Shed Tail'],
		onValidateTeam(team, format) {
			let speciesTable = {};
			let allowedTiers = ['RB'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in [Gen 9] Rock Bottom.'];
				}
			}
		},
	}
];