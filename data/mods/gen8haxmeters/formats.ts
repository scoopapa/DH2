import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 9] Hax Meters OU",
		mod: 'haxmeters',
		ruleset: ['Standard', '!Sleep Clause Mod', 'Sleep Moves Clause', '!Evasion Items Clause', 'Hax Meter Rule'],
		banlist: ['Uber', 'AG', 'Arena Trap', 'Moody', 'Shadow Tag', 'Baton Pass', 'Last Respects', 'Shed Tail'],
	},
	{
		name: "[Gen 9] Hax Meters Random Battle",
		mod: 'haxmeters',
		team: 'random',
		ruleset: ['Standard', '!Team Preview', '!Evasion Items Clause', 'Hax Meter Rule'],
	},
	{
		name: "[Gen 8] Hax Meters OU",
		mod: 'gen8haxmeters',
		ruleset: ['Standard', '!Evasion Items Clause', 'Dynamax Clause', 'Hax Meter Rule'],          
		banlist: ['Uber', 'AG', 'Arena Trap', 'Moody', 'Power Construct', 'Shadow Tag', 'Baton Pass'],
	},
	{
		name: "[Gen 8] Hax Meters Random Battle",
		mod: 'gen8haxmeters',
		team: 'random',
		ruleset: ['Standard', '!Team Preview', '!Evasion Items Clause', 'Hax Meter Rule'],          
	}
];