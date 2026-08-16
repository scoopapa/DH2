import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 9] National Dex Expanded",
		mod: 'natdexexpanded',
		desc: `Coded by iforgetwhyimhere`,
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Clause', 'Species Clause', 'Sleep Clause Mod', 'Terastal Clause', 'Mega Data Mod'],
		unbanlist: ['Gengar-Mega'],
		banlist: ['ND Uber', 'ND AG', 'Arena Trap', 'Moody', 'Power Construct', 'Shadow Tag', 'King\'s Rock', 'Levitate',
					'Quick Claw', 'Razor Fang', 'Assist', 'Baton Pass', 'Last Respects', 'Shed Tail', 'Ancient Soul Dew', 'Raikou-Mega', 'Suicune-Mega', 'Salamence-Mega-Z', 'Empoleon-Mega', 'Regigigas-Mega', 'Hydreigon-Mega', 'Volcarona-Mega', 'Keldeo-Mega', 'Victini-Perfected', 'Goodra-Mega', 'Dragapult-Mega', 'Kingambit-Mega', 'Gholdengo-Mega', 'Archaludon-Mega'],
		teambuilderFormat: 'National Dex',
	},
	{
		name: "[Gen 9] NatDex Expanded AG",
		mod: 'natdexexpanded',
		desc: `Coded by iforgetwhyimhere`,
		ruleset: ['Standard NatDex', 'Mega Data Mod'],
		banlist: ['Levitate'],
		teambuilderFormat: 'National Dex',
	},
	{
		name: "[Gen 9] National Dex Expanded VGC",
		mod: 'natdexexpanded',
		desc: `Coded by iforgetwhyimhere`,
		gameType: 'doubles',
		ruleset: ['Flat Rules', '!! Adjust Level = 50', 'Min Source Gen = 9', 'VGC Timer', 'Open Team Sheets', 'Limit One Restricted', 'Terastal Clause', 'Mega Data Mod', 'Standard NatDex'],
		restricted: ['Restricted Legendary'],
		banlist: ['Ancient Soul Dew', 'Levitate'],
		teambuilderFormat: 'National Dex',
	},
];