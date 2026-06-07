import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 9] Yokaimons",
	   desc: '<b>[Gen 9] Yokaimons</b>: YokaiMons is a "faithful" recreation of Yo-kai Watch 1 within the confines of Pokemon Showdown.',
		threads: [
			'&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3711007/post-11013574">Yokaimons</a>',
		//	'&bullet; <a href="https://docs.google.com/spreadsheets/d/1Tu-SS3DsygC0bbA_Jp_PcqPsY6qFdPnqyL5pT62OOns/edit?usp=sharing">Spreadsheet</a>',
		],
		mod: 'yokaimons',
		gameType: 'triples',
	    ruleset: ['Obtainable', 'Team Preview', 'Species Clause', 'Nickname Clause', 'Item Clause', 'Terastal Clause', 'Shift Clause', 'Tribe Unity Mod', 'Soultimate Charge Mod', 'Elemental Damage Mod', 'Data Mod', 'HP Percentage Mod', 'Cancel Mod'],
		banlist: ['All Items'],
		unbanlist: ['Custom'],
		onValidateTeam(team, format) {
			const allowedTiers = ['S Rank', 'A Rank', 'B Rank', 'C Rank', 'D Rank', 'E Rank'];
			const tierLimits: {[k: string]: number} = {'S Rank': 2, 'A Rank': 2};
			const tierCounts: {[k: string]: number} = {};
			const errors = [];
			for (const set of team) {
				const species = this.dex.species.get(set.species);
				if (!allowedTiers.includes(species.tier)) {
					errors.push(`${set.species} is not usable in Yokaimons.`);
					continue;
				}
				tierCounts[species.tier] = (tierCounts[species.tier] || 0) + 1;
				if (tierLimits[species.tier] && tierCounts[species.tier] > tierLimits[species.tier]) {
					errors.push(`You cannot have more than ${tierLimits[species.tier]} ${species.tier} Yo-kai.`);
				}
			}
			return errors;
		},
	}
];