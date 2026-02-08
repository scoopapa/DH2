import { FormatData } from '../../../sim/dex-formats';

export const format: FormatData = {
		name: "[Gen 9] M4A OU NatDex",
		desc: ["<b>Megas for All</b>: A Pet Mod that aims to create unique Mega Evolutions for every fully evolved Pokémon. Plays like National Dex, just with more Megas.",
		      ],
		threads: [
				`&bullet; <a href="https://www.smogon.com/forums/threads/megas-for-all-v7-slate-33-electrode-golurk-and-silvally-please-read-the-first-post-fully-playable-through-slate-32.3671140/">Megas for All v7 on Smogon Forums</a>`,
				`&bullet; <a href="https://docs.google.com/spreadsheets/d/1TdeAUUtjh0f_tcIBllbF_imgepwV-dV2YomoTCRlPgI/edit?usp=sharing">Spreadsheet</a>`,
				`&bullet; <a href="http://megasforall.wikidot.com/">Wiki</a>`
		      ],
		ruleset: ['Standard NatDex', 'Terastal Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Data Mod', 'Mega Data Mod'],
		mod: 'm4ag9',
		banlist: ['Slowking-Galar-Mega', 'Slowking-Galar + Slowkinite', 'Uber', 'AG', 'Baton Pass', 'King\'s Rock', 'Razor Fang', 'Moody',
			'Arena Trap', 'Power Construct', 'Shadow Tag', 'Snow Cloak', 'Sand Veil'
		],
		onValidateTeam(team, format) {
			let speciesTable = {};
			let allowedTiers = ['Mega of the Day!', 'Popular', 'Popular Megas', 'Other Megas', 'Heat!', 'NFE'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in M4A OU NatDex.'];
				}
			}
		},
	};