import { FormatData } from '../../../sim/dex-formats';

export const format: FormatData = {
		name: "[Gen 9] Woomod",
		desc: `woo`,
		threads: [
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1YJXE8wUNJijWSfNKIUqgObN5uEVgTliewTluGe0w4Y4/edit?usp=sharing">Spreadsheet for the mod</a>`,
		],
		mod: 'woomod',
		ruleset: ['Standard NatDex', 'Terastal Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Sleep Clause Mod', 'Data Mod', 'Z-Move Clause'],
		banlist: ['Eviolite', 'Light Ball','Baton Pass','Ditto'],
		teambuilderFormat: 'National Dex',
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['woomod'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in woomod.'];
				}
			}
		},
	};