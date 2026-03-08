import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 9] The 3-3-1 Typechart",
		desc: [
			"<b>The 3-3-1 Typechart</b>: A solomod that gives every type 3 weaknesses, 3 resistances, and 1 immunity.",
			],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3711007/post-9403413">Post in the Solomods Megathread</a>`,
		],

		mod: 'the331typechartg9',
		teambuilderFormat: 'National Dex',
		ruleset:['Standard NatDex', 'OHKO Clause', 'Evasion Clause', 'Species Clause', 'Sleep Clause Mod', 'Data Mod', 'Mega Data Mod'],
		banlist: [
			'Uber', 'AG', 'Arena Trap', 'Moody', 'Power Construct', 'Shadow Tag', 'King\'s Rock',
			'Quick Claw', 'Razor Fang', 'Assist', 'Baton Pass', 'Last Respects', 'Shed Tail',
			'Slowking-Base', 'Slowbro-Base'
		],
		onBegin() {
			this.add('-message', `Be sure to use /weak to find out everything's new type interactions!`);
		},
	}
];