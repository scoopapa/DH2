import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 3] Modern Gen 3",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/gen-9-modern-gen-3.3713372/">Smogon Thread</a>`,
		],
		mod: 'moderngen3',
		searchShow: false,
		ruleset: ['Standard', 'Z-Move Clause', 'Gems Clause'],
		banlist: ['AG', 'Uber', 'Assist', 'Baton Pass', 'Arena Trap', 'Shadow Tag', 'Sand Veil', 'Snow Cloak', 'Moody', 'Sand Rush', 'Power Construct', 'Battle Bond', 'King\'s Rock', 'Razor Fang', 'Soul Dew', 'Shed Tail'],
	},
	{
		name: "[Gen 3] Modern Gen 3 Ubers",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/gen-9-modern-gen-3.3713372/">Smogon Thread</a>`,
		],
		mod: 'moderngen3',
		searchShow: false,
		ruleset: ['Standard', 'Z-Move Clause', 'Gems Clause'],
		banlist: ['AG'],
		teambuilderFormat: 'Uber',
	}
];