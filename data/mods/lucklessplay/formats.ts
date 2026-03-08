import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 9] Luckless Play OU",
		mod: 'lucklessplay',
		ruleset: ['Standard', '!Sleep Clause Mod', 'Sleep Moves Clause', '!Evasion Items Clause', 'Hax Meter Rule'],
		banlist: ['Uber', 'AG', 'Arena Trap', 'Moody', 'Shadow Tag', 'Baton Pass', 'Last Respects', 'Shed Tail'],
	},
	{
		name: "[Gen 9] Luckless Play Doubles OU",
		mod: 'lucklessplay',
		gameType: 'doubles',
		ruleset: ['Standard Doubles', 'Hax Meter Rule'],
		banlist: ['DUber', 'Shadow Tag'],
	},
	{
		name: "[Gen 8] Luckless Play OU",
		mod: 'gen8lucklessplay',
		ruleset: ['Standard', '!Evasion Items Clause', 'Dynamax Clause', 'Hax Meter Rule'],          
		banlist: ['Uber', 'AG', 'Arena Trap', 'Moody', 'Power Construct', 'Shadow Tag', 'Baton Pass'],
	},
	{
		name: "[Gen 8] Luckless Play Doubles OU",
		mod: 'gen8lucklessplay',
		gameType: 'doubles',
		ruleset: ['Standard Doubles', 'Dynamax Clause', 'Hax Meter Rule'],
		banlist: ['DUber', 'Power Construct', 'Shadow Tag', 'Swagger'],
	}
];