import { FormatData } from '../../../sim/dex-formats';

export const format: FormatData = {
		name: "[Gen 9] Do Not Use VGC",
		desc: [
			"<b>Do Not Use</b>: A National Dex VGC metagame where only Pokemon with 280 BST or less are allowed. Certain Pokemon have been added as restricteds."
		],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/gen-9-do-not-use.3734326/">Do Not Use</a>`,
		],
		mod: 'donotusevgc',

		gameType: 'doubles',
		teambuilderFormat: 'National Dex Doubles',
		ruleset: ['Standard NatDex', 'Item Clause', 'Adjust Level = 50', 'Picked Team Size = 4', 'VGC Timer', 'Data Mod', 'Force Open Team Sheets', 'Terastal Clause', 'Z-Move Clause', 'Best of = 3', 'Limit One Restricted'],
		restricted: ['Cottonee', 'Dewpider', 'Diglett-Alola', 'Flittle', 'Nidoran-M', 'Wattrel', 'Wingull', 'Zigzagoon', 'Shedinja'],
		banlist: ['Huge Power', 'Pure Power', 'Smeargle', 'Wishiwashi', 'Goomy'],
		unbanlist: ['Assist'],
		onValidateTeam(team, format) {
			let speciesTable = {};
			let allowedTiers = ['Restricted', 'DDoNU'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in [Gen 9] Do Not Use VGC.'];
				}
			}
		},
	};