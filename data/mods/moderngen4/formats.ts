import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 4] Modern Gen 4",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3711007/post-9837342">Smogon Post</a>`,
		],
		mod: 'moderngen4',
		searchShow: false,
		ruleset: ['Standard', 'Sleep Moves Clause', '!Sleep Clause Mod', 'Z-Move Clause', 'Gems Clause'],
		banlist: ['AG', 'Uber', 'Arena Trap', 'Drizzle', 'Drought', 'Shadow Tag', 'Moody', 'Sand Rush', 'Power Construct', 'King\'s Rock', 'Quick Claw', 'Razor Fang', 'Assist', 'Baton Pass', 'Last Respects', 'Shed Tail', 'Toxic Spikes'],
	},
	{
		name: "[Gen 4] Modern Gen 4 Ubers",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3711007/post-9837342">Smogon Post</a>`,
		],
		mod: 'moderngen4',
		searchShow: false,
		ruleset: ['Standard', 'Sleep Moves Clause', '!Sleep Clause Mod', 'Gems Clause'],
		banlist: ['AG'],
		teambuilderFormat: 'Uber',
	}
];