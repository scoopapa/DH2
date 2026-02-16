import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 9] ReGeneration",
		desc: [
			"In this Pet Mod, we will redesign the competitive functions of the Kantonian Pokemon after a Paldean counterpart.",
		],
		threads: [
			'&bullet; <a href="https://www.smogon.com/forums/threads/regeneration-slate-4-seadra-dodrio-wigglytuff.3718196/">ReGeneration</a>',
			'&bullet; <a href="https://docs.google.com/spreadsheets/d/1wbFWGR5pVcnTTyuy7vAUSrPxqSZsNF-Okx-v1hvD2Vc/edit?usp=sharing">Spreadsheet</a>',
		],
		mod: 'regeneration',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod'],
		banlist: [
			'Arena Trap', 'Moody', 'Shadow Tag', 'Baton Pass',
		   'Aerodactylite', 'Alakazite', 'Beedrillite', 'Blastoisinite', 'Charizardite X', 'Charizardite Y', 'Gengarite',
         'Gyaradosite', 'Kangaskhanite', 'Mewtwonite X', 'Mewtwonite Y', 'Pidgeotite', 'Pinsirite', 'Slowbronite', 'Venusaurite'
		],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (template.tier !== 'ReGeneration' && template.tier !== 'ReGeneration NFE' && template.tier !== 'ReGeneration LC') {
					return [set.species + ' is not usable in ReGeneration.'];
				}
			}
		},
	}
];