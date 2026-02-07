import { FormatData } from '../../../sim/dex-formats';

export const format: FormatData = {
		name: "[Gen 9] Generation X: Desvega [OU]",
		desc: '<b>Generation X</b>: A pet mod that aims to develop new regions with both brand-new Pokemon and select realmons, including ones that are absent from Scarlet and Violet. This format is based in Desvega, the mod\'s first region in Generation 9 and third region overall, as the successor to Loria from Generation 8.',
		threads: [
			`<a href="https://www.smogon.com/forums/threads/3722319/">Gen 9 Generation X</a>`,
		],
		mod: 'genxdesvega',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Clause', 'Species Clause', 'Terastal Clause', 'Sleep Clause Mod', 'Z-Move Clause', 'Mega Data Mod', 'Data Mod'],
		banlist: ['Ursaluna-Bloodmoon', 'Naganadel', 'Arcognition', 'Janutcher', 'Virulope'], //Ubers
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['Desvega OU', 'Desvega NFE', "Desvega LC"];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (template.tier === 'Brunica Uber') {
					return [set.species + ' is banned in Generation X\'s OU format for Desvega.'];
				}
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not available in Generation X\'s Desvega formats.'];
				}
			}
		},
	};