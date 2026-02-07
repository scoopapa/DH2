import { FormatData } from '../../../../sim/dex-formats';

export const format: FormatData = {
		name: "[Gen 9] Monster Hunter Randoms FFA (WIP)",
		gameType: 'freeforall',
		mod: 'monsterhunter',
		team: 'random',
		ruleset: ['Standard NatDex', 'Data Mod', 'Mega Data Mod', 'Status Mod', 'OHKO Clause', 'Evasion Clause', 
			'Species Clause', 'Terastal Clause', '!Team Preview'],
		onBegin() {
			this.add(`raw|<div class='broadcast-green'><b>Welcome to Monster Hunter Showdown! Coded by KnivesMK<br />Want to learn more and discuss the format?<br />Then check out the <a href="https://discord.gg/JjjRGVrEvc" target="_blank">MHS Discord!</a><br />Need help with all of the new moves, abilities, and gameplay changes?<br />Then make sure to check out the <a href="https://tinyurl.com/MonHunShow" target="_blank">MHS Wikia</a> or use /dt!<br /></b></div>`);
		},
	};