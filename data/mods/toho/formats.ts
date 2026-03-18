import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 9] Touhoumons",
		desc: `2hu`,
		threads: [
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1YJXE8wUNJijWSfNKIUqgObN5uEVgTliewTluGe0w4Y4/edit?usp=sharing">Spreadsheet for the mod</a>`,
		],
		mod: 'toho',
		ruleset: ['Standard NatDex', 'Terastal Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Data Mod', 'Mega Data Mod', 'Z-Move Clause'],
		banlist: ['Bug Gem', 'Dark Gem', 'Dragon Gem', 'Electric Gem', 'Fairy Gem', 'Fighting Gem', 'Fire Gem', 'Flying Gem', 'Ghost Gem', 'Grass Gem', 'Ground Gem', 'Ice Gem', 'Poison Gem', 'Psychic Gem', 'Rock Gem', 'Steel Gem', 'Water Gem'],
		unbanlist: ['Light of Ruin'],
		teambuilderFormat: 'National Dex',
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (template.tier !== 'Toho') {
					return [set.species + ' is not a Touhou character.'];
				}
				if (set.species == 'Cirno-Tanned' && set.ability !== 'Drought')
					 return ["Cirno-Tanned can only have Drought as its ability."]
				if ((set.species !== 'Cirno-Tanned' && set.species !== 'Cirno') && set.ability === 'Drought')
					 return ["Only Cirno-Tanned can have Drought as its ability."]
			}
		},
	},
	{
		name: "[Gen 9] Touhoumons Doubles",
		desc: `2hu`,
		threads: [
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1YJXE8wUNJijWSfNKIUqgObN5uEVgTliewTluGe0w4Y4/edit?usp=sharing">Spreadsheet for the mod</a>`,
		],
		mod: 'toho',
		gameType: 'doubles',
		ruleset: ['Standard NatDex', 'Terastal Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Sleep Clause Mod', 'Data Mod', 'Mega Data Mod'],
		banlist: [],
		unbanlist: [],
		teambuilderFormat: 'National Dex',
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (template.tier !== 'DToho') {
					return [set.species + ' is not a Touhou character.'];
				}
				if (set.species == 'Cirno-Tanned' && set.ability !== 'Drought')
					 return ["Cirno-Tanned can only have Drought as its ability."]
				if ((set.species !== 'Cirno-Tanned' && set.species !== 'Cirno') && set.ability === 'Drought')
					 return ["Only Cirno-Tanned can have Drought as its ability."]
			}
		},
	}
];