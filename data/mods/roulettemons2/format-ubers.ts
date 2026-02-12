import { FormatData } from '../../../sim/dex-formats';

export const format: FormatData = {
		name: "[Gen 9] Roulettemons 2 Ubers",
		desc: `<b>[Gen 9] Roulettemons 2 Ubers</b>: A broken meta where the only legal Pokemon are randomly-generated Fakemon.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3717145/">Roulettemons 2 on Smogon Forums</a>`,
		],
		mod: 'roulettemons2',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Z-Move Clause', 'Data Mod', 'Mega Data Mod'],
		banlist: [
			'Arena Trap', 'Moody', 'Shadow Tag', 'Baton Pass',
		],
		onValidateTeam(team, format) {
			let speciesTable = {};
			let allowedTiers = ['R2', 'R2Ubers'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (template.tier !== 'R2' && template.tier !== 'R2Ubers') {
					return [set.species + ' is not legal in [Gen 9] Roulettemons 2.'];
				}
			}
		},
	};