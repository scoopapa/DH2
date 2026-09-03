import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 9] Deltamon OU",
		mod: 'deltamon',
		desc: "A format where Deltarune and Undertale characters are Pokemon!",
		threads: [
			`&bullet; <a href= "https://docs.google.com/spreadsheets/d/1BEBnhDP6YXtgm3b-lXv4wIK7_mC847meN7O31AIAqVw/edit?gid=0#gid=0"> Deltamon Spreadsheet </a>`,
		],
		ruleset: ['Standard NatDex', 'Terastal Clause', 'Data Mod', 'Mega Data Mod', 'Species Clause', 'Sleep Clause Mod', 'Evasion Clause', 'OHKO Clause'],
		banlist: [
			'Arena Trap', 'Shadow Tag', 'Moody', 'King\'s Rock', 'Quick Claw', 'Razor Fang',
			'Shed Tail', 'Baton Pass', 'Assist', 'Last Respects',
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
			`&bullet; <a href= "https://docs.google.com/spreadsheets/d/1BEBnhDP6YXtgm3b-lXv4wIK7_mC847meN7O31AIAqVw/edit?gid=0#gid=0"> Deltamon Spreadsheet </a>`,
		],
		ruleset: ['Standard NatDex', 'Terastal Clause', 'Data Mod', 'Mega Data Mod', 'Species Clause', 'Evasion Clause', 'OHKO Clause', 'Gravity Sleep Clause'],
		banlist: [
			'Moody', 'King\'s Rock', 'Quick Claw', 'Razor Fang', 'Fissure', 'Guillotine', 'Horn Drill', 'Sheer Cold', 'Assist',
		],
		teambuilderFormat: 'National Dex',
		onValidateTeam(team, format) {
			let speciesTable = {};
			let allowedTiers = ['DM DOU', 'DM NFE'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.doublesTier)) {
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
			`&bullet; <a href= "https://docs.google.com/spreadsheets/d/1BEBnhDP6YXtgm3b-lXv4wIK7_mC847meN7O31AIAqVw/edit?gid=0#gid=0"> Deltamon Spreadsheet </a>`,
		],
		ruleset: ['Standard NatDex', 'Terastal Clause', 'Data Mod', 'Mega Data Mod', 'Species Clause', 'Sleep Clause Mod', 'Evasion Clause', 'OHKO Clause'],
		banlist: [
			'King\'s Rock', 'Quick Claw', 'Razor Fang', 'Baton Pass', 'Fissure', 'Guillotine', 'Horn Drill', 'Sheer Cold',
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
	{
		name: "[Gen 9] Deltamon Doubles Ubers",
		mod: 'deltamon',
		gameType: 'doubles',
		desc: "A format where Deltarune and Undertale characters are Pokemon!",
		threads: [
			`&bullet; <a href= "https://docs.google.com/spreadsheets/d/1BEBnhDP6YXtgm3b-lXv4wIK7_mC847meN7O31AIAqVw/edit?gid=0#gid=0"> Deltamon Spreadsheet </a>`,
		],
		ruleset: ['Standard NatDex', 'Terastal Clause', 'Data Mod', 'Mega Data Mod', 'Species Clause', 'Evasion Clause', 'OHKO Clause', 'Gravity Sleep Clause'],
		banlist: [
			'King\'s Rock', 'Quick Claw', 'Razor Fang', 'Fissure', 'Guillotine', 'Horn Drill', 'Sheer Cold', 'Assist',
		],
		teambuilderFormat: 'National Dex',
		onValidateTeam(team, format) {
			let speciesTable = {};
			let allowedTiers = ['DM DOU', 'DM DUbers', 'DM NFE'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.doublesTier)) {
					return [set.species + ' is not a legal Recruit in Deltamon Doubles Ubers!'];
				}
			}
		},
	},
	{	
		name: "[Gen 9] Deltamon: National Dex Dark World",
		mod: 'deltamon',
		desc: "National Dex Dark World is a format where you can use Deltamon Recruits with any Pokemon available in the Generation 9 National Dex format!",
		threads: [
			`&bullet; <a href= "https://docs.google.com/spreadsheets/d/1BEBnhDP6YXtgm3b-lXv4wIK7_mC847meN7O31AIAqVw/edit?gid=0#gid=0"> Deltamon Spreadsheet </a>`,
		],
		ruleset: ['Standard NatDex', 'Terastal Clause', 'Data Mod', 'Mega Data Mod', 'Species Clause', 'Sleep Clause Mod', 'Evasion Clause', 'OHKO Clause'],
		banlist: [
			'ND Uber', 'ND AG', 'Arena Trap', 'Moody', 'Power Construct', 'Shadow Tag', 'King\'s Rock',
			'Quick Claw', 'Razor Fang', 'Assist', 'Baton Pass', 'Last Respects', 'Shed Tail', 'Fissure', 'Guillotine', 'Horn Drill', 'Sheer Cold',
		],
		unbanlist: ['Jester\'s Shadow Crystal', 'Puppet\'s Shadow Crystal', 'Knight\'s Shadow Crystal', 'Cyan Omega Petal', 'Violet Omega Petal', 'Amber Omega Petal', 'Verdant Omega Petal', 
					'Azure Omega Petal', 'Golden Omega Petal', 'Thorn Ring', 'Queenite', 'Spamtonite', 'Gersonite', 'Kaardite', 'Undynite', 'Mettatonite X', 'Mettatonite Y', 'Floweyite', 'Black Knife', 'Bellowing Starburst Slice'],
		teambuilderFormat: 'National Dex',
	},
	{	
		name: "[Gen 9] Deltamon: National Dex Dark World Doubles",
		mod: 'deltamon',
		gameType: 'doubles',
		desc: "National Dex Dark World Doubles is a doubles format where you can use Deltamon Recruits with any Pokemon available in the Generation 9 National Dex format!",
		threads: [
			`&bullet; <a href= "https://docs.google.com/spreadsheets/d/1BEBnhDP6YXtgm3b-lXv4wIK7_mC847meN7O31AIAqVw/edit?gid=0#gid=0"> Deltamon Spreadsheet </a>`,
		],
		ruleset: ['Standard NatDex', 'Terastal Clause', 'Data Mod', 'Mega Data Mod', 'Species Clause', 'Sleep Clause Mod', 'Gravity Sleep Clause', 'OHKO Clause', 'Evasion Clause'],
		banlist: [
			'Kaardite', 'ND AG', 'Moody', 'King\'s Rock', 'Quick Claw', 'Razor Fang', 'Fissure', 'Guillotine', 'Horn Drill', 'Sheer Cold',
			'Annihilape', 'Arceus', 'Calyrex-Ice', 'Calyrex-Shadow', 'Deoxys-Attack', 'Dialga', 'Dialga-Origin', 'Espathra', 'Eternatus',
			'Genesect', 'Gengar-Mega', 'Giratina', 'Giratina-Origin', 'Groudon', 'Ho-Oh', 'Koraidon', 'Kyogre', 'Kyurem-White', 'Lugia',
			'Lunala', 'Magearna', 'Melmetal', 'Metagross-Mega', 'Mewtwo', 'Miraidon', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane',
			'Necrozma-Ultra', 'Palkia', 'Palkia-Origin', 'Rayquaza', 'Reshiram', 'Shedinja', 'Solgaleo', 'Stakataka', 'Terapagos',
			'Urshifu', 'Urshifu-Rapid-Strike', 'Xerneas', 'Yveltal', 'Zacian', 'Zacian-Crowned', 'Zamazenta', 'Zamazenta-Crowned',
			'Zekrom', 'Zygarde-50%', 'Zygarde-Complete', 'Commander', 'Power Construct', 'Eevium Z', 'Assist', 'Dark Void', 'Swagger',
		],
		unbanlist: ['Jester\'s Shadow Crystal', 'Puppet\'s Shadow Crystal', 'Knight\'s Shadow Crystal', 'Cyan Omega Petal', 'Violet Omega Petal', 'Amber Omega Petal', 'Verdant Omega Petal', 
					'Azure Omega Petal', 'Golden Omega Petal', 'Thorn Ring', 'Queenite', 'Spamtonite', 'Gersonite', 'Undynite', 'Mettatonite X', 'Mettatonite Y', 'Floweyite', 'Black Knife', 'Bellowing Starburst Slice', 'Shadow Tag'],
		teambuilderFormat: 'National Dex Doubles',
	},
];
