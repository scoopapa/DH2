import { FormatData } from '../../../sim/dex-formats';

export const format: FormatData = {
		name: "[Gen 9] Multiverse",
		threads: [
			'&bullet; <a href="https://www.smogon.com/forums/threads/multiverse-gen-9-slate-4-voting.3723507/">Multiverse</a>',
			'&bullet; <a href="https://docs.google.com/spreadsheets/d/1Bu2Mm9L7vURggEI9mkkFM7mo-eLtLj2K95f4Rchaolg/edit?usp=sharing">Spreadsheet</a>',
		],
		mod: 'gen9multiverse',
		ruleset: ['Standard', 'Terastal Clause', 'Data Mod'],
		banlist: ['Moody', 'Baton Pass'],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['MV'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Multiverse.'];
				}
			}
		},
	};