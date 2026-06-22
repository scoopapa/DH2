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
		unbanlist: ['Custom', 'Worn Bangle', 'Rocker Wrist', 'Brute Bracer', 'Sun Bracelet', 'Fiend Band',
					'Rusty Ring', 'Pretty Ring', 'Illusion Ring', 'Lunar Ring', 'Fiend Ring', 'Fire Ring',
					'Water Ring', 'Lightning Ring', 'Earth Ring', 'Ice Ring', 'Wind Ring', 'Aged Charm',
					'Runic Charm', 'Armor Charm', 'Galaxy Charm', 'Fiend Charm', 'Blaze Charm', 'Flood Charm',
					'Bolt Charm', 'Quake Charm', 'Frost Charm', 'Storm Charm', 'Simple Badge', 'Shiny Badge',
					'Hermes Badge', 'Meteor Badge', 'Fiend Badge', 'Cicada Sword', 'Beefy Bell', 'Spell Bell',
					'Tough Bell', 'Speed Bell', 'Big Bottle', 'Tengu Fan', 'Cheery Coat', 'Nail Bat', 'Reversword',
					'Turnabeads', 'Reflector', 'Ritzy Studs', "Sleep 'n' Study", 'Die of Fate', 'Iron Plates',
					'Thick Specs', 'Ancient Scale', 'Venoct Gauntlet', 'Heavenly Sash', 'Ski Mask', 'Sticker of Hate',
					'Vampiric Fangs', 'Crystal Ball', 'Sleepillow', 'Restraint Belt', 'Guard Gem', 'Monkey Circlet'],
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