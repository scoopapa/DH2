import { FormatData } from '../../../sim/dex-formats';

export const format: FormatData = {
		name: "[Gen 9] Generation X: Brunica [Uber]",
		desc: '<b>Generation X</b>: A pet mod that aims to develop new regions with brand-new Pokemon and select realmons, including ones that are absent from Scarlet and Violet. This format is based in Brunica, the mod\'s second region in Generation 9 after Desvega and fourth overall.',
		threads: [
			`<a href="https://www.smogon.com/forums/threads/3722319/">Gen 9 Generation X</a>`,
			`<a href="https://www.smogon.com/forums/threads/3722319/post-10114743">Announcement of Generation X's fourth iteration</a>`,
		],
		mod: 'genxbrunica',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Terastal Clause', 'Sleep Clause Mod', 'Z-Move Clause', 'Mega Data Mod', 'Data Mod'],
		banlist: [],
		unbanlist: ['Last Respects', 'Shed Tail', 'Bright Powder', 'Razor Fang', 'Arena Trap', 'Moody', 'Shadow Tag'], //Uber unbans
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['Brunica Uber', 'Brunica OU', 'Brunica NFE', "Brunica LC"];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not available in Generation X\'s Brunica formats.'];
				}
			}
		},/*
		onChangeSet(set) {
			if (set.species.startsWith('Lutakon')) {
				const item = this.toID(set.item);
				if (item === 'awakeningseed') {
					set.species = 'Lutakon-Awakened';
					set.ability = 'Guardian of Nature';
					let synthesis = set.moves.indexOf('Synthesis');
					if (synthesis < 0) {
						synthesis = set.moves.indexOf('synthesis');
					}
					if (synthesis >= 0) {
						let gaiaRecoveryIndex = set.moves.indexOf('gaiarecovery');
						if (gaiaRecoveryIndex < 0) {
							gaiaRecoveryIndex = set.moves.indexOf('Gaia Recovery');
						}
						if (gaiaRecoveryIndex >= 0) {
							delete set.moves[synthesis];
						}
						else {
							set.moves[synthesis] = 'gaiarecovery';
						}
					}
				} else {
					set.species = 'Lutakon';
				}
			}
		},*/
};