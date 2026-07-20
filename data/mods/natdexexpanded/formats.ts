import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 9] National Dex Expanded",
		mod: 'natdexexpanded',
		desc: `Coded by iforgetwhyimhere`,
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Clause', 'Species Clause', 'Sleep Clause Mod', 'Terastal Clause', 'Mega Data Mod'],
		unbanlist: ['All Pokemon'],
		banlist: ['ND Uber', 'ND AG', 'Arena Trap', 'Moody', 'Power Construct', 'Shadow Tag', 'King\'s Rock',
					'Quick Claw', 'Razor Fang', 'Assist', 'Baton Pass', 'Last Respects', 'Shed Tail', 'Ancient Soul Dew'],
		teambuilderFormat: 'National Dex',
		onValidateSet(set, format, setHas, teamHas) {
			const species = this.dex.species.get(set.species);
			if (set.ability === 'Levitate') return [`Levitate is on ${species} already! Pick [one of] its other Ability[s].`];
		},
	},
	{
		name: "[Gen 9] NatDex Expanded AG",
		mod: 'natdexexpanded',
		desc: `Coded by iforgetwhyimhere`,
		ruleset: ['Standard NatDex', 'Mega Data Mod'],
		unbanlist: ['All Pokemon'],
		teambuilderFormat: 'National Dex',
		onValidateSet(set, format, setHas, teamHas) {
			const species = this.dex.species.get(set.species);
			if (set.ability === 'Levitate') return [`Levitate is on ${species} already! Pick [one of] its other Ability[s].`];
		},
	},
	{
		name: "[Gen 9] National Dex Expanded VGC",
		mod: 'natdexexpanded',
		desc: `Coded by iforgetwhyimhere`,
		gameType: 'doubles',
		ruleset: ['Flat Rules', '!! Adjust Level = 50', 'Min Source Gen = 9', 'VGC Timer', 'Open Team Sheets', 'Limit One Restricted', 'Terastal Clause', 'Mega Data Mod'],
		unbanlist: ['All Pokemon'],
		restricted: ['Restricted Legendary'],
		banlist: ['Ancient Soul Dew'],
		teambuilderFormat: 'National Dex',
		onValidateSet(set, format, setHas, teamHas) {
			const species = this.dex.species.get(set.species);
			if (set.ability === 'Levitate') return [`Levitate is on ${species} already! Pick [one of] its other Ability[s].`];
		},
	},
];