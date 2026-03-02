import { FormatData } from '../../../sim/dex-formats';

export const format: FormatData = {
		name: "[Gen 9] Terrariamons",
		desc: "A solomod that interprets every Terraria Armor (and Flinx Fur Coat) as Pokemon.",
		threads: [
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1qaAn374BZcaGEFFFSZvzF1VUJvrKm59BQkVZaDCrK_w/edit?usp=sharing">Datasheet</a>`,
		],
		mod: 'terrariamons2',
		ruleset: ['Standard NatDex', 'Data Mod', 'Mega Data Mod', 'Z-Move Clause', 'Terastal Clause'],
		banlist: [],
		onValidateTeam(team, format) {
			let speciesTable = {};
			let allowedTiers = ['TerrariaOU'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not a Terraria Armor.'];
				}
			}
		},
	};
