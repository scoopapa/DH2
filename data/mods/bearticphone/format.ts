import { FormatData } from '../../../sim/dex-formats';

export const format: FormatData = {
		name: "[Gen 9] Beartic Phone",
	   desc: '<b>[Gen 9] Beartic Phone</b>: A group of 5 people unknowingly work together to create a fakemon, very similar to the online game "Gartic Phone".',
		threads: [
			'&bullet; <a href="https://www.smogon.com/forums/threads/beartic-phone.3727739/">Beartic Phone</a>',
			'https://docs.google.com/spreadsheets/d/1-Hfz-p0nomMLVFa4-4nGbLKaoWSl0xFTZA5Aiapw-Ko/edit#gid=1161734506">Spreadsheet</a>',
		],
		mod: 'bearticphone',
	  ruleset: ['Standard', 'Terastal Clause', 'Data Mod'],
		banlist: [
			'Arena Trap', 'Moody', 'Shadow Tag', 'Baton Pass',
		],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (template.tier !== 'bear') {
					return [set.species + ' is not usable in Beartic Phone.'];
				}
			}
		},
	};