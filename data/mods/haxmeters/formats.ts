import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 9] Hax Meters OU",
		mod: 'haxmeters',
		ruleset: ['Standard', '!Sleep Clause Mod', 'Sleep Moves Clause', '!Evasion Items Clause', 'Hax Meter Rule'],
		banlist: ['Uber', 'AG', 'Arena Trap', 'Moody', 'Shadow Tag', 'Baton Pass', 'Last Respects', 'Shed Tail', 'Tera Blast'],
	},
	{
		name: "[Gen 9] Hax Meters Doubles OU",
		mod: 'haxmeters',
		gameType: 'doubles',
		ruleset: ['Standard Doubles', 'Hax Meter Rule'],
		banlist: ['DUber', 'Commander', 'Shadow Tag'],
	},
	{
		name: "[Gen 9] Hax Meters Randoms",
		mod: 'haxmeters',
		team: 'random',
		ruleset: ['Species Clause', 'HP Percentage Mod', 'Cancel Mod', 'Sleep Clause Mod', 'Illusion Level Mod', 'Hax Meter Rule'],
	},
	{
		name: "[Gen 8] Hax Meters OU",
		mod: 'gen8haxmeters',
		ruleset: ['Standard', '!Evasion Items Clause', 'Dynamax Clause', 'Hax Meter Rule'],          
		banlist: ['Uber', 'AG', 'Arena Trap', 'Moody', 'Power Construct', 'Shadow Tag', 'Baton Pass'],
	},
	{
		name: "[Gen 8] Hax Meters Doubles OU",
		mod: 'gen8haxmeters',
		gameType: 'doubles',
		ruleset: ['Standard Doubles', 'Dynamax Clause', 'Hax Meter Rule'],
		banlist: ['DUber', 'Power Construct', 'Shadow Tag', 'Swagger'],
	},
	{
		name: "[Gen 8] Hax Meters Randoms",
		mod: 'gen8haxmeters',
		team: 'random',
		ruleset: ['Species Clause', 'HP Percentage Mod', 'Cancel Mod', 'Sleep Clause Mod', 'Illusion Level Mod', 'Hax Meter Rule'],      
	}
];