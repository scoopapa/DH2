import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 3] Shadow Colosseum",
		mod: 'gen3shadowcolosseum',
		gameType: 'doubles',
		desc: [
			`<b>[Gen 3] Shadow Colosseum</b>: A Gen 3 Orre Colosseum (Gen 3 VGC) metagame that adds Shadow Pokemon and moves to the game.`,
		],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3774822/">Shadow Colosseum on the Smogon Forums</a>`,
		],
		ruleset: [
			'Obtainable', 'Team Preview', 'Species Clause', 'Stadium Sleep Clause', 'Freeze Clause Mod', 'Max Team Size = 6', 'VGC Timer',
			'Nickname Clause', 'Endless Battle Clause', 'Cancel Mod', 'Picked Team Size = 4', 'Exact HP Mod', 'Item Clause', 'Open Team Sheets',
			'Shadow Mechanic', 'Data Preview',
		],
		banlist: ['Soul Dew', 'Deoxys-Defense', 'Deoxys-Attack', 'Deoxys-Speed', 'Restricted Legendary', 'Mythical'],
		unbanlist: ['Latios', 'Latias', 'Wobbuffet', 'Wynaut'],
		bestOfDefault: true,
		onBegin() {
			this.add('rule', 'Self-KO Clause: If your last Pok\u00e9mon faints to a self-KO move or effect, you will lose the battle');
		},
	},
	{
		name: "[Gen 3] Shadow Colosseum Custom Game",
		mod: 'gen3shadowcolosseum',
		gameType: 'doubles',
		searchShow: false,
		debug: true,
		battle: {trunc: Math.trunc},
		ruleset: [
			'HP Percentage Mod', 'Cancel Mod', 'Max Team Size = 24', 'Max Move Count = 24', 'Max Level = 9999',
			'Default Level = 100', 'Shadow Mechanic', 'Data Preview', 'Exact HP Mod', 'Open Team Sheets', 'Team Preview',
		],
	}
];