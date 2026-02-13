import { FormatData } from '../../../sim/dex-formats';

export const format: FormatData = {
		name: "[Gen 8] Restrictions",
		desc: `<b>Restrictions</b>: A metagame made up of brand new Pok&eacute;mon that are made according to various random and non-random restrictions.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3673824/">Restrictions on Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1XsplBqN8njHZJT9cTP_3i3YSFITB9WaVfNOYAbNY75M/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: 'restrictions',
		ruleset: ['Standard', 'Dynamax Clause', 'Data Mod'],
		banlist: ['uber', 'ou', 'uubl', 'uu', 'rubl', 'ru', 'nubl', 'nu', 'publ', 'pu', 'zu', 'nfe', /*'lcuber',*/ 'lc', 'cap', 'caplc', 'capnfe', 'ag','past', 'future', 'lgpe'],
		teambuilderBans: ['unreleased'],
	};