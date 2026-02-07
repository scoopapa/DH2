import { FormatData } from '../../../sim/dex-formats';

export const format: FormatData = {
		name: "[Gen 9] Eramons",
		desc: `<b>Eramons</b>: A Gen 9 Pet Mod based on broad strokes of real-life historical time periods.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3727769/">Gen 9 Eramons</a>`,
		],

		mod: 'eramons',
		ruleset: ['Standard', 'Terastal Clause'],
		banlist: ['Arena Trap', 'Moody', 'Sand Veil', 'Shadow Tag', 'Snow Cloak', 'King\'s Rock', 'Razor Fang', 'Baton Pass', 'Last Respects', 'Shed Tail'],
		onValidateTeam(team, format, teamHas) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			let era : string[] = [];
			let allowedTiers = ['ECiv', 'Med', 'PrDay', 'FFut'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				let tier = template.tier;
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Eramons.'];
				}
				if (!(era.includes(tier))) {
					era.push(tier)
				}
			}
			if (era.length > 1) return ['Each Pokemon needs to be from the same era.'];
		},
	};