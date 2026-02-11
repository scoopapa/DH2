import { FormatData } from '../../../sim/dex-formats';

export const format: FormatData = {
		name: "[Gen 9] Paleomons",
	   desc: '<b>[Gen 9] Paleomons</b>: In this mod, we will be creating an SV OU-based micrometa of Pokémon based on real critters from the Paleozoic, Mesozoic, and Cenozoic eras.',
		threads: [
			'&bullet; <a href="https://www.smogon.com/forums/threads/paleomons-slate-1-winners.3727753/">Paleomons</a>',
		//	'&bullet; <a href="https://docs.google.com/spreadsheets/d/1wbFWGR5pVcnTTyuy7vAUSrPxqSZsNF-Okx-v1hvD2Vc/edit?usp=sharing">Spreadsheet</a>',
		],
		mod: 'paleomons',
		teambuilderFormat: "National Dex",
	  ruleset: ['Standard', 'Terastal Clause', 'Data Mod', '!! Min Source Gen = 8'],
		banlist: [
			'Arena Trap', 'Moody', 'Shadow Tag', 'Baton Pass',
		],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (template.tier !== 'Paleomons') {
					return [set.species + ' is not usable in Paleomons.'];
				}
			}
		},
	};