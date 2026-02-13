import { FormatData } from '../../../sim/dex-formats';

export const format: FormatData = {
		name: "[Gen 9] Double Trouble",
		mod: 'doubletrouble',
		desc: `A Fakemons meta made by a few friends`,
		ruleset: ['Standard NatDex', 'Data Mod', 'Terastal Clause', 'OHKO Clause', 'Evasion Clause', 'Species Clause', 'Sleep Clause Mod'],
		teambuilderFormat: 'National Dex',
		banlist: ['Baton Pass'],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['DT OU', 'DT NFE'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Double Trouble.'];
				}
			}
		},
	};