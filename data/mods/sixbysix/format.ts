import { FormatData } from '../../../sim/dex-formats';

export const format: FormatData = {
		name: "[Gen 9] Six by Six",
		desc: [
			`<b>Six by Six</b>: A Gen 9 micrometa featuring only 6 Pokemon, each with 6 forms.`,
		],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/six-by-six-slate-0-winners.3769141/">Six by Six on the Smogon Forums</a>`,
		],
		mod: 'sixbysix',
		ruleset: ['Standard', 'Sleep Moves Clause', '!Sleep Clause Mod', 'Terastal Clause', 'Data Mod'],
		banlist: ['King\'s Rock', 'Razor Fang', 'Baton Pass', 'Last Respects', 'Shed Tail'],
		onValidateTeam(team, format) {
			let speciesTable = {};
			let allowedTiers = ['King', 'Queen', 'Bishop', 'Knight', 'Rook', 'Pawn'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Six by Six.'];
				}
			}
		},
	};