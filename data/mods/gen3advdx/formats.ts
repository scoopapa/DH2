import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 3] ADV DX OU",
		mod: 'gen3advdx',
		ruleset: ['Standard', 'Freeze Clause Mod', 'Data Mod'],
		banlist: ['Uber', 'Sand Veil', 'Soundproof', 'Assist', 'Baton Pass + Block', 'Baton Pass + Mean Look', 'Baton Pass + Spider Web', 'Smeargle + Ingrain', 'Soul Dew', 'Sand Attack', 'Flash', 'Mud-Slap', 'Kinesis', 'Smokescreen'],
	},
	{
		name: "[Gen 3] ADV DX Doubles",
		mod: 'gen3advdx',
		gameType: 'doubles',
		ruleset: ['Standard', 'Freeze Clause Mod', 'Data Mod', '!Switch Priority Clause Mod'],
		banlist: ['Uber', 'Quick Claw', 'Soul Dew', 'Explosion', 'Self-Destruct', 'Swagger', 'Sand Attack', 'Flash', 'Mud-Slap', 'Kinesis', 'Smokescreen'],
		unbanlist: ['Wobbuffet', 'Wynaut'],
	}
];