import { FormatData } from '../../../sim/dex-formats';

export const format: FormatData = {
		name: "[Gen 9] Triple Threat",
		desc: [
			"<b>Triple Threat</b>: A micrometa where Pokemon are allowed to have up to three types.",
		],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/triple-threat-slate-2-dragon-fairy-steel.3722322">Triple Threat on Smogon Forums</a>`,
		      ],
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Z-Move Clause', 'Data Mod', 'Mega Data Mod'],
		banlist: [],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if ( template.tier !== 'TT') {
					return [set.species + ' is not usable in Triple Threat.'];
				}
			}
		},
		mod: 'triplethreat',
	};