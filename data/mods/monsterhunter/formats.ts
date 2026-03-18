import { FormatData } from '../../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 9] Monster Hunter Randoms",
		mod: 'monsterhunter',
		team: 'random',
		ruleset: ['Standard NatDex', 'Data Mod', 'Mega Data Mod', 'Status Mod', 'OHKO Clause', 'Evasion Clause', 
			'Species Clause', 'Terastal Clause', '!Team Preview'],
		onBegin() {
			this.add(`raw|<div class='broadcast-green'><b>Welcome to Monster Hunter Showdown! Coded by KnivesMK<br />Want to learn more and discuss the format?<br />Then check out the <a href="https://discord.gg/JjjRGVrEvc" target="_blank">MHS Discord!</a><br />Need help with all of the new moves, abilities, and gameplay changes?<br />Then make sure to check out the <a href="https://tinyurl.com/MonHunShow" target="_blank">MHS Wikia</a> or use /dt!<br /></b></div>`);
		},
	},
	{
		name: "[Gen 9] Monster Hunter Randoms Doubles (WIP)",
		gameType: 'doubles',
		mod: 'monsterhunter',
		team: 'random',
		ruleset: ['Standard NatDex', 'Data Mod', 'Mega Data Mod', 'Status Mod', 'OHKO Clause', 'Evasion Clause', 
			'Species Clause', 'Terastal Clause', '!Team Preview'],
		onBegin() {
			this.add(`raw|<div class='broadcast-green'><b>Welcome to Monster Hunter Showdown! Coded by KnivesMK<br />Want to learn more and discuss the format?<br />Then check out the <a href="https://discord.gg/JjjRGVrEvc" target="_blank">MHS Discord!</a><br />Need help with all of the new moves, abilities, and gameplay changes?<br />Then make sure to check out the <a href="https://tinyurl.com/MonHunShow" target="_blank">MHS Wikia</a> or use /dt!<br /></b></div>`);
		}
	},
	{
		name: "[Gen 9] Monster Hunter Randoms FFA (WIP)",
		gameType: 'freeforall',
		mod: 'monsterhunter',
		team: 'random',
		ruleset: ['Standard NatDex', 'Data Mod', 'Mega Data Mod', 'Status Mod', 'OHKO Clause', 'Evasion Clause', 
			'Species Clause', 'Terastal Clause', '!Team Preview'],
		onBegin() {
			this.add(`raw|<div class='broadcast-green'><b>Welcome to Monster Hunter Showdown! Coded by KnivesMK<br />Want to learn more and discuss the format?<br />Then check out the <a href="https://discord.gg/JjjRGVrEvc" target="_blank">MHS Discord!</a><br />Need help with all of the new moves, abilities, and gameplay changes?<br />Then make sure to check out the <a href="https://tinyurl.com/MonHunShow" target="_blank">MHS Wikia</a> or use /dt!<br /></b></div>`);
		},
	},
	{
		name: "[Gen 9] Monster Hunter AG",
		teambuilderFormat: 'National Dex',
		threads: [],
		mod: 'monsterhunter',
		ruleset: ['Standard NatDex', 'Data Mod', 'Mega Data Mod', 'Status Mod'],
		banlist: [],
		onBegin() {
			this.add(`raw|<div class='broadcast-green'><b>Welcome to Monster Hunter Showdown! Coded by KnivesMK<br />Want to learn more and discuss the format?<br />Then check out the <a href="https://discord.gg/JjjRGVrEvc" target="_blank">MHS Discord!</a><br />Need help with all of the new moves, abilities, and gameplay changes?<br />Then make sure to check out the <a href="https://tinyurl.com/MonHunShow" target="_blank">MHS Wikia</a> or use /dt!<br /></b></div>`);
		},
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['MHAG', 'MHOU', 'MHUUBL', 'MHUU', 'MHRUBL', 'MHRU'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Monster Hunter AG.'];
				}
			}
		},
	},
	{
		name: "[Gen 9] Monster Hunter Free-For-Alls",
		teambuilderFormat: 'National Dex',
		threads: [],
		mod: 'monsterhunter',
		gameType: 'freeforall',
		ruleset: ['Standard NatDex', 'Data Mod', 'Mega Data Mod', 'Status Mod', 'OHKO Clause', 
			'Evasion Clause', 'Species Clause'],
		banlist: ['Shed Tail', 'Baton Pass', 'Shagaru Magala + Strength Sap'],
		onBegin() {
			this.add(`raw|<div class='broadcast-green'><b>Welcome to Monster Hunter Showdown! Coded by KnivesMK<br />Want to learn more and discuss the format?<br />Then check out the <a href="https://discord.gg/JjjRGVrEvc" target="_blank">MHS Discord!</a><br />Need help with all of the new moves, abilities, and gameplay changes?<br />Then make sure to check out the <a href="https://tinyurl.com/MonHunShow" target="_blank">MHS Wikia</a> or use /dt!<br /></b></div>`);
		},
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['MHAG', 'MHOU', 'MHUUBL', 'MHUU', 'MHRUBL', 'MHRU'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Monster Hunter FFA.'];
				}
			}
		},
	},
	{
		name: "[Gen 9] Monster Hunter Doubles",
		teambuilderFormat: 'National Dex',
		threads: [],
		mod: 'monsterhunter',
		gameType: 'doubles',
		ruleset: ['Standard NatDex', 'Data Mod', 'Mega Data Mod', 'Status Mod', 'OHKO Clause', 
			'Evasion Clause', 'Species Clause', 'Terastal Clause'],
		banlist: ['Normalium Z', 'Fairium Z', 'Fightinium Z', 'Firium Z', 'Flyinium Z', 'Darkinium Z', 'Dragonium Z', 'Buginium Z', 'Waterium Z', 'Electrium Z', 'Ghostium Z', 'Grassium Z',
			'Groundium Z', 'Icium Z', 'Poisonium Z', 'Psychium Z', 'Rockium Z', 'Steelium Z',  'Shed Tail', 'Shagaru Magala + Strength Sap'],
		onBegin() {
			this.add(`raw|<div class='broadcast-green'><b>Welcome to Monster Hunter Showdown! Coded by KnivesMK<br />Want to learn more and discuss the format?<br />Then check out the <a href="https://discord.gg/JjjRGVrEvc" target="_blank">MHS Discord!</a><br />Need help with all of the new moves, abilities, and gameplay changes?<br />Then make sure to check out the <a href="https://tinyurl.com/MonHunShow" target="_blank">MHS Wikia</a> or use /dt!<br /></b></div>`);
		},
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['MHAG', 'MHOU', 'MHUUBL', 'MHUU', 'MHRUBL', 'MHRU'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Monster Hunter Doubles.'];
				}
			}
		},
	},
	{
		name: "[Gen 9] Monster Hunter VGC",
		teambuilderFormat: 'National Dex',
		threads: [],
		mod: 'monsterhunter',
		gameType: 'doubles',
		bestOfDefault: true,
		ruleset: ['Standard NatDex', 'Data Mod', 'Mega Data Mod', 'Status Mod', 'Species Clause', 'Item Clause', 'Picked Team Size = 4', 'Adjust Level = 50', 'VGC Timer',
			'Open Team Sheets'],
		banlist: ['Normalium Z', 'Fairium Z', 'Fightinium Z', 'Firium Z', 'Flyinium Z', 'Darkinium Z', 'Dragonium Z', 'Buginium Z', 'Waterium Z', 'Electrium Z', 'Ghostium Z', 'Grassium Z',
			'Groundium Z', 'Icium Z', 'Poisonium Z', 'Psychium Z', 'Rockium Z', 'Steelium Z', 'Shagaru Magala + Strength Sap'],
		onBegin() {
			this.add(`raw|<div class='broadcast-green'><b>Welcome to Monster Hunter Showdown! Coded by KnivesMK<br />Want to learn more and discuss the format?<br />Then check out the <a href="https://discord.gg/JjjRGVrEvc" target="_blank">MHS Discord!</a><br />Need help with all of the new moves, abilities, and gameplay changes?<br />Then make sure to check out the <a href="https://tinyurl.com/MonHunShow" target="_blank">MHS Wikia</a> or use /dt!<br /></b></div>`);
		},
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['MHAG', 'MHOU', 'MHUUBL', 'MHUU', 'MHRUBL', 'MHRU'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Monster Hunter VGC.'];
				}
			}
		},
	},
	{
		name: "[Gen 9] Monster Hunter OU",
		teambuilderFormat: 'National Dex',
		threads: [],
		mod: 'monsterhunter',
		ruleset: ['Standard NatDex', 'Data Mod', 'Mega Data Mod', 'Status Mod', 'OHKO Clause', 
			'Evasion Clause', 'Species Clause', 'Terastal Clause'],
		banlist: ['Normalium Z', 'Fairium Z', 'Fightinium Z', 'Firium Z', 'Flyinium Z', 'Darkinium Z', 'Dragonium Z', 'Buginium Z', 'Waterium Z', 'Electrium Z', 'Ghostium Z', 'Grassium Z',
			'Groundium Z', 'Icium Z', 'Poisonium Z', 'Psychium Z', 'Rockium Z', 'Steelium Z',  'Shed Tail', 'Baton Pass', 'Shagaru Magala + Strength Sap', 'Light Clay', 'King\'s Rock', 'Razor Fang'],
		onBegin() {
			this.add(`raw|<div class='broadcast-green'><b>Welcome to Monster Hunter Showdown! Coded by KnivesMK<br />Want to learn more and discuss the format?<br />Then check out the <a href="https://discord.gg/JjjRGVrEvc" target="_blank">MHS Discord!</a><br />Need help with all of the new moves, abilities, and gameplay changes?<br />Then make sure to check out the <a href="https://tinyurl.com/MonHunShow" target="_blank">MHS Wikia</a> or use /dt!<br /></b></div>`);
		},
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['MHOU', 'MHUUBL', 'MHUU', 'MHRUBL', 'MHRU'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Monster Hunter OU.'];
				}
			}
		},
	},
	{
		name: "[Gen 9] Monster Hunter UU",
		teambuilderFormat: 'National Dex',
		threads: [],
		mod: 'monsterhunter',
		ruleset: ['Standard NatDex', 'Data Mod', 'Mega Data Mod', 'Status Mod', 'OHKO Clause', 'Evasion Clause', 
			'Species Clause', 'Terastal Clause'],
		banlist: ['Normalium Z', 'Fairium Z', 'Fightinium Z', 'Firium Z', 'Flyinium Z', 'Darkinium Z', 'Dragonium Z', 'Buginium Z', 'Waterium Z', 'Electrium Z', 'Ghostium Z', 'Grassium Z',
			'Groundium Z', 'Icium Z', 'Poisonium Z', 'Psychium Z', 'Rockium Z', 'Steelium Z',  'Shed Tail', 'Baton Pass', "Ice-Armor", 'Shagaru Magala + Strength Sap',
			'Garugite', 'Magnamalite', 'Mizutsunite', 'Crimson Gem', 'White Gem',  'Light Clay', 'King\'s Rock', 'Razor Fang'],
		onBegin() {
			this.add(`raw|<div class='broadcast-green'><b>Welcome to Monster Hunter Showdown! Coded by KnivesMK<br />Want to learn more and discuss the format?<br />Then check out the <a href="https://discord.gg/JjjRGVrEvc" target="_blank">MHS Discord!</a><br />Need help with all of the new moves, abilities, and gameplay changes?<br />Then make sure to check out the <a href="https://tinyurl.com/MonHunShow" target="_blank">MHS Wikia</a> or use /dt!<br /></b></div>`);
		},
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['MHUU', 'MHRUBL', 'MHRU'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Monster Hunter UU.'];
				}
			}
		},
	},
	{
		name: "[Gen 9] Monster Hunter RU",
		teambuilderFormat: 'National Dex',
		threads: [],
		mod: 'monsterhunter',
		ruleset: ['Standard NatDex', 'Data Mod', 'Mega Data Mod', 'Status Mod', 'OHKO Clause', 'Evasion Clause', 
			'Species Clause', 'Terastal Clause'],
		banlist: [ 'Normalium Z', 'Fairium Z', 'Fightinium Z', 'Firium Z', 'Flyinium Z', 'Darkinium Z', 'Dragonium Z', 'Buginium Z', 'Waterium Z', 'Electrium Z', 'Ghostium Z', 'Grassium Z',
			'Groundium Z', 'Icium Z', 'Poisonium Z', 'Psychium Z', 'Rockium Z', 'Steelium Z',  'Shed Tail', 'Baton Pass', 'Lagombite', 'Bariothite', "Ice-Armor",
			'Shagaru Magala + Strength Sap', 'Garugite',  'Light Clay', 'King\'s Rock', 'Razor Fang'],
		onBegin() {
			this.add(`raw|<div class='broadcast-green'><b>Welcome to Monster Hunter Showdown! Coded by KnivesMK<br />Want to learn more and discuss the format?<br />Then check out the <a href="https://discord.gg/JjjRGVrEvc" target="_blank">MHS Discord!</a><br />Need help with all of the new moves, abilities, and gameplay changes?<br />Then make sure to check out the <a href="https://tinyurl.com/MonHunShow" target="_blank">MHS Wikia</a> or use /dt!<br /></b></div>`);
		},
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['MHRU'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Monster Hunter RU.'];
				}
			}
		},
	}
];