import { FormatData } from '../../../sim/dex-formats';

export const format: FormatData = {
		name: "[Gen 9] Generation X: Brunica [OU]",
		desc: '<b>Generation X</b>: A pet mod that aims to develop new regions with brand-new Pokemon and select realmons, including ones that are absent from Scarlet and Violet. This format is based in Brunica, the mod\'s second region in Generation 9 after Desvega and fourth overall.',
		threads: [
			`<a href="https://www.smogon.com/forums/threads/3722319/">Gen 9 Generation X</a>`,
			`<a href="https://www.smogon.com/forums/threads/3722319/post-10114743">Announcement of Generation X's fourth iteration</a>`,
		],
		mod: 'genxbrunica',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Clause', 'Species Clause', 'Terastal Clause', 'Sleep Clause Mod', 'Z-Move Clause', 'Mega Data Mod', 'Data Mod'],
		banlist: ['Akulut', 'Kaiwakaw', 'Lutakon', 'Lutakon-Awakened', 'Tinozous'], //Ubers
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['Brunica OU', 'Brunica NFE', "Brunica LC"];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (template.tier === 'Brunica Uber') {
					return [set.species + ' is banned in Generation X\'s OU format for Brunica.'];
				}
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not available in Generation X\'s Brunica formats.'];
				}
			}
		},
	};