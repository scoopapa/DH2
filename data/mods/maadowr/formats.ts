import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 9] Ma'adowr Singles",
		desc: 'Solomod mainly based on Ancient Egypt and run by BlueRay',
		threads: [
								`&bullet; <a href="https://docs.google.com/spreadsheets/d/1fE71uVoWpYSGSncowLJ6yc9gzfUdYYj9khn23r7gCtM/edit?gid=168383836#gid=168383836">Spreadsheet</a>`,
		      ],
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Evasion Items Clause', 'Species Clause', 'Sleep Clause Mod', 'Z-Move Clause', 'Data Mod', 'Mega Data Mod', 'Terastal Clause'],
		banlist: ['Arena Trap', 'Ill Wind', 'Moody', 'Sand Veil', 'Shadow Tag', 'Snow Cloak', 'King\'s Rock', 'Quick Claw', 'Baton Pass', 'Baxcalibur', 'Espathra', 'Gengarite', 'Lucarionite', 'Mawilite', 'Metagrossite', 'Sablenite', 'Chantyrus Engraving', 'Frustration', 'Hail', 'Hidden Power', 'Last Respects', 'Magic Powder', 'Pursuit', 'Return'],
		teambuilderFormat: 'National Dex',
		onValidateTeam(team, format) {
			let speciesTable = {};
			let allowedTiers = ['MD', 'MD NFE']; // 'EXP'
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Maadowr.'];
				}
			}
		},
		/*onValidateSet(set) {
			const problems: string[] = [];
			const setHas: {[k: string]: true} = {};
			let species = this.dex.species.get(set.species);
			let item = this.dex.items.get(set.item);
			let tierSpecies = species;

			if (item.megaEvolves === species.name) {
				if (item.megaStone && this.dex.species.get(item.megaStone).tier !== 'Mega') return [item.name + ' is not a legal Mega Stone.'];
			}
		}, */
		mod: 'maadowr',
	},
	{
		name: "[Gen 9] Ma'adowr VGC",
		desc: 'Solomod mainly based on Ancient Egypt and run by BlueRay',
		threads: [
								`&bullet; <a href="https://docs.google.com/spreadsheets/d/1fE71uVoWpYSGSncowLJ6yc9gzfUdYYj9khn23r7gCtM/edit?gid=168383836#gid=168383836">Spreadsheet</a>`,
		      ],
		gameType: 'doubles',
		ruleset: ['Standard NatDex', 'Flat Rules', '!! Adjust Level = 50', 'VGC Timer', 'Open Team Sheets', 'Data Mod', 'Z-Move Clause', 'Dynamax Clause', 'Terastal Clause', 'Mega Data Mod'],
		banlist: ['Frustration', 'Hail', 'Hidden Power', 'Magic Powder', 'Pursuit', 'Return'],
		teambuilderFormat: 'National Dex',
		onValidateTeam(team, format) {
			let speciesTable = {};
			let allowedTiers = ['MD', 'MD NFE']; // 'EXP'
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Maadowr.'];
				}
			}
		},
		/*onValidateSet(set) {
			const problems: string[] = [];
			const setHas: {[k: string]: true} = {};
			let species = this.dex.species.get(set.species);
			let item = this.dex.items.get(set.item);
			let tierSpecies = species;

			if (item.megaEvolves === species.name) {
				if (item.megaStone && this.dex.species.get(item.megaStone).tier !== 'Mega') return [item.name + ' is not a legal Mega Stone.'];
			}
		}, */
		mod: 'maadowr',
	},
	{
		name: "[Gen 9] Ma'adowr VGC Restricted",
		desc: 'Solomod mainly based on Ancient Egypt and run by BlueRay',
		threads: [
								`&bullet; <a href="https://docs.google.com/spreadsheets/d/1fE71uVoWpYSGSncowLJ6yc9gzfUdYYj9khn23r7gCtM/edit?gid=168383836#gid=168383836">Spreadsheet</a>`,
		      ],
		gameType: 'doubles',
		ruleset: ['Standard NatDex', 'Flat Rules', '!! Adjust Level = 50', 'VGC Timer', 'Open Team Sheets', 'Data Mod', 'Z-Move Clause', 'Dynamax Clause', 'Terastal Clause', 'Mega Data Mod', 'Limit Two Restricted'],
		banlist: ['Frustration', 'Hail', 'Hidden Power', 'Magic Powder', 'Pursuit', 'Return'],
		restricted: ['Restricted Legendary'],
		teambuilderFormat: 'National Dex',
		onValidateTeam(team, format) {
			let speciesTable = {};
			let allowedTiers = ['MD', 'MD NFE', 'MD Ubers', 'EXP2']; // 'EXP'
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Maadowr.'];
				}
			}
		},
		mod: 'maadowr',
	}
];