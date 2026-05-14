import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [

	// Gamenight CAP
	///////////////////////////////////////////////////////////////////

	{
		section: "Gamenight CAP",
	},	
    {
        name: "[Gen 9] Gamenight Draft Doubles",
        desc: `A Gartic Phone-esque tournament was held by a group of 8 people to create wacky fakemon, these are the results.`,
        mod: 'gamenightcap',
        gameType: 'doubles',
        ruleset: ['Cancel Mod', 'Species Clause', 'HP Percentage Mod', 'Sleep Clause Mod', 'Terastal Clause', '+Past', '+LGPE'],
        banlist: ['King\'s Rock', 'Razor Fang', 'Berserk Gene'],
    },
    {
        name: "[Gen 9] Gamenight Draft Singles",
        desc: `A Gartic Phone-esque tournament was held by a group of 8 people to create wacky fakemon, these are the results.`,
        mod: 'gamenightcap',
        ruleset: ['Cancel Mod', 'HP Percentage Mod', 'Sleep Clause Mod', 'Terastal Clause', '+Past', '+LGPE'],
        banlist: ['King\'s Rock', 'Razor Fang', 'Berserk Gene'],
    },
    {
        name: "[Gen 9] Gamenight Draft Doubles AG",
        desc: `A Gartic Phone-esque tournament was held by a group of 8 people to create wacky fakemon, these are the results.`,
        mod: 'gamenightcap',
        gameType: 'doubles',
        ruleset: ['Cancel Mod', 'HP Percentage Mod', '+Past', '+LGPE'],
    },
	{
		name: "[Gen 9] Gamenight Draft FFA",
        desc: `A Gartic Phone-esque tournament was held by a group of 8 people to create wacky fakemon, these are the results.`,
		mod: 'gamenightcap',
		gameType: 'freeforall',
		rated: false,
		ruleset: ['Obtainable', 'Species Clause', 'HP Percentage Mod', 'Cancel Mod', 'Sleep Clause Mod', '+Past', '+LGPE'],
	},
];
