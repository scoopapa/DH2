import { FormatData } from '../../../../sim/dex-formats';

export const format: FormatData = {
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
	};