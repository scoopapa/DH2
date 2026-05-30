import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [

	// Gamenight CAP
	///////////////////////////////////////////////////////////////////
    {
        name: "[Gen 9] Gamenight Draft Doubles",
        desc: `A Gartic Phone-esque tournament was held by a group of 8 people to create wacky fakemon, these are the results.`,
        mod: 'gamenightcap',
        gameType: 'doubles',
        ruleset: ['Standard NatDex', 'Terastal Clause', 'Species Clause', 'Data Mod', 'Z-Move Clause'],
        banlist: ['King\'s Rock', 'Razor Fang'],
        unbanlist: ['Baddy Bad', 'Freezy Frost', 'Glitzy Glow', 'Sappy Seed'],
    		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let allowedTiers = ['GNCOU', 'GNCDOU'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' doesnt exist.'];
				}
            }
        }
    },
    {
        name: "[Gen 9] Gamenight Draft Singles",
        desc: `A Gartic Phone-esque tournament was held by a group of 8 people to create wacky fakemon, these are the results.`,
        mod: 'gamenightcap',
        ruleset: ['Standard NatDex', 'Terastal Clause', 'Sleep Clause Mod', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Data Mod', 'Z-Move Clause'],
        banlist: ['King\'s Rock', 'Razor Fang', 'Shell Smash'],
        unbanlist: ['Baddy Bad', 'Freezy Frost', 'Glitzy Glow', 'Sappy Seed'],
    		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let allowedTiers = ['GNCOU', 'GNCBonus'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' doesnt exist.'];
				}
            }
        }
    },
    {
        name: "[Gen 9] Gamenight Draft Doubles AG",
        desc: `A Gartic Phone-esque tournament was held by a group of 8 people to create wacky fakemon, these are the results.`,
        mod: 'gamenightcap',
        gameType: 'doubles',
        ruleset: ['Standard NatDex', 'Data Mod'],
        unbanlist: ['Baddy Bad', 'Freezy Frost', 'Glitzy Glow', 'Sappy Seed'],
    		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let allowedTiers = ['GNCOU', 'GNCDOU', 'GNCBonus'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' doesnt exist.'];
				}
            }
        }
    },
	{
		name: "[Gen 9] Gamenight Draft FFA",
        desc: `A Gartic Phone-esque tournament was held by a group of 8 people to create wacky fakemon, these are the results.`,
		mod: 'gamenightcap',
		gameType: 'freeforall',
		rated: false,
		ruleset: ['Obtainable', 'Species Clause', 'HP Percentage Mod', 'Cancel Mod', 'Data Mod'],
        unbanlist: ['Baddy Bad', 'Freezy Frost', 'Glitzy Glow', 'Sappy Seed'],
	},
];