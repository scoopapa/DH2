import { FormatData } from '../../../sim/dex-formats';

export const format: FormatData = {
		name: "[Gen 9] Fusion Evolution",
		threads: [
			`<a href="https://www.smogon.com/forums/threads/3717085/">Gen 9 Fusion Evolution</a>`,
		],
		mod: 'gen9fe',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Clause', 'Species Clause', 'OU Terastal Clause', 'Sleep Clause Mod', 'Z-Move Clause', 'Mega Data Mod', 'Data Mod'],
		banlist: ['Metagrossite', 'Revival Blessing', 'Shed Tail', 'Last Respects', 'Gengarite', 'Ampharosite', 'Salamencite', 'Baton Pass', 'Light Clay', 'Absolite', 'Medichamite'],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['FEOU', 'FEUUBL', 'FEUU', 'FENFE', "FELC"];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Fusion Evolution.'];
				}
			}
		},
	};