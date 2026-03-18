// Hopefully this doesn't break... My lack of technical experience has really made itself known making this mod.

import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 9] Terrariamons",
		desc: "A solomod that interprets every Terraria Armor (and Flinx Fur Coat) as Pokemon.",
		threads: [
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1qaAn374BZcaGEFFFSZvzF1VUJvrKm59BQkVZaDCrK_w/edit?usp=sharing">Datasheet</a>`,
		],
		mod: 'terrariamons',
		ruleset: ['Standard NatDex', 'Data Mod', 'Mega Data Mod', 'Sleep Clause Mod', 'Z-Move Clause', 'Terastal Clause'],
		banlist: ['Rapid Healing'],
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
	},
];