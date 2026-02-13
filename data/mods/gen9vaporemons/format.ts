import { FormatData } from '../../../sim/dex-formats';

export const format: FormatData = {
		name: "[Gen 9] VaporeMons",
		desc: [
			"<b>VaporeMons</b>: The third mod in the SylveMons series where Pokemon, items, abilities and moves are redesigned for OU (and new items, abilities and moves are added) without changing base stats.",
		],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/vaporemons-slate-1-discussion-phase.3722917/">Thread on the Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1_5AwZ24dPu3-5m5yOyIO4OTPmW9OwIWXXzZ5IJZkj4c/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: 'gen9vaporemons',
		ruleset: ['Standard', 'Terastal Clause', 'Data Mod', 'Sleep Moves Clause', '!Sleep Clause Mod'],
		banlist: ['AG', 'Uber', 'Arena Trap', 'Moody', 'Shadow Tag', 'King\'s Rock', 'Baton Pass', 'Last Respects', 'Shed Tail', 'Light Clay', 'Fling + Segin Star Shard', /*'Damp Rock'*/],
	};