import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 9] Deltamon OU",
		mod: 'deltamon',
		desc: "A format where Deltarune and Undertale characters are Pokemon!",
		threads: [
			`&bullet; <a href= "https://docs.google.com/spreadsheets/d/1BEBnhDP6YXtgm3b-lXv4wIK7_mC847meN7O31AIAqVw/edit?gid=0#gid=0" Deltamon Spreadsheet </a>`,
		],
		ruleset: ['Standard NatDex', 'Terastal Clause', 'Data Mod', 'Mega Data Mod', 'Species Clause', 'Sleep Clause Mod', 'OHKO Clause', 'Evasion Clause',],
		banlist: [
			'Arena Trap', 'Shadow Tag', 'King\'s Rock', 'Quick Claw', 'Razor Fang', 'Baton Pass',
		],
		teambuilderFormat: 'National Dex',
		onValidateTeam(team, format) {
			let speciesTable = {};
			let allowedTiers = ['DM OU', 'DM NFE'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not a legal Recruit in Deltamon OU!'];
				}
			}
		},
	},
	{
		name: "[Gen 9] Deltamon Doubles OU",
		mod: 'deltamon',
		gameType: 'doubles',
		desc: "A format where Deltarune and Undertale characters are Pokemon!",
		threads: [
			`&bullet; <a href= "https://docs.google.com/spreadsheets/d/1BEBnhDP6YXtgm3b-lXv4wIK7_mC847meN7O31AIAqVw/edit?gid=0#gid=0" Deltamon Spreadsheet </a>`,
		],
		ruleset: ['Standard NatDex', 'Terastal Clause', 'Data Mod', 'Mega Data Mod', 'Species Clause', 'OHKO Clause', 'Evasion Clause',],
		banlist: [
			'Moody', 'King\'s Rock', 'Quick Claw', 'Razor Fang',
		],
		teambuilderFormat: 'National Dex',
		onValidateTeam(team, format) {
			let speciesTable = {};
			let allowedTiers = ['DM DOU', 'DM NFE'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not a legal Recruit in Deltamon Doubles OU!'];
				}
			}
		},
	},
	{
	name: "[Gen 9] Deltamon Ubers",
		mod: 'deltamon',
		desc: "A format where Deltarune and Undertale characters are Pokemon!",
		threads: [
			`&bullet; <a href= "https://docs.google.com/spreadsheets/d/1BEBnhDP6YXtgm3b-lXv4wIK7_mC847meN7O31AIAqVw/edit?gid=0#gid=0" Deltamon Spreadsheet </a>`,
		],
		ruleset: ['Standard NatDex', 'Terastal Clause', 'Data Mod', 'Mega Data Mod', 'Species Clause', 'Sleep Clause Mod', 'OHKO Clause', 'Evasion Clause',],
		banlist: [
			'King\'s Rock', 'Quick Claw', 'Razor Fang', 'Baton Pass',
		],
		teambuilderFormat: 'National Dex',
		onValidateTeam(team, format) {
			let speciesTable = {};
			let allowedTiers = ['DM Ubers', 'DM OU', 'DM NFE'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not a legal Recruit in Deltamon Ubers!'];
				}
			}
		},
	},
	{	name: "[Gen 9] National Dex Dark World",
		mod: 'deltamon',
		desc: "National Dex Dark World is a format where you can use Deltamon Recruits with any Pokemon available in the Generation 9 National Dex format!",
		threads: [
			`&bullet; <a href= "https://docs.google.com/spreadsheets/d/1BEBnhDP6YXtgm3b-lXv4wIK7_mC847meN7O31AIAqVw/edit?gid=0#gid=0" Deltamon Spreadsheet </a>`,
		],
		ruleset: ['Standard NatDex', 'Terastal Clause', 'Data Mod', 'Mega Data Mod', 'Species Clause', 'Sleep Clause Mod', 'OHKO Clause', 'Evasion Clause',],
		banlist: [
			'ND Uber', 'ND AG', 'DM Ubers', 'Arena Trap', 'Moody', 'Power Construct', 'Shadow Tag', 'King\'s Rock',
			'Quick Claw', 'Razor Fang', 'Assist', 'Baton Pass', 'Last Respects', 'Shed Tail',
		],
		teambuilderFormat: 'National Dex',
	},
];