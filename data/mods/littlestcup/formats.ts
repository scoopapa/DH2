import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 9] Littlest Cup",
		desc: [
			"<b>Littlest Cup</b>: A National Dex metagame where only Baby Pokemon are allowed."
		],
		threads: [
			`&bullet; <a href="https://pastebin.com/PtqmRUhG">Littlest Cup VR and Sample Sets</a>`,
		],
		mod: 'littlestcup',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Evasion Items Clause', 'Species Clause', 'Sleep Clause Mod', 'Mega Rayquaza Clause', 'Max Level = 1'],
		teambuilderFormat: 'National Dex',
		banlist: ['All Pokemon', 'Belly Drum', 'Huge Power', 'Shadow Tag'],
		unbanlist: ['Pichu', 'Cleffa', 'Igglybuff', 'Togepi', 'Tyrogue', 'Smoochum', 'Elekid', 'Magby', 'Azurill', 'Wynaut', 'Budew', 'Chingling', 'Bonsly', 'Mime Jr.', 'Happiny', 'Munchlax', 'Riolu', 'Mantyke', 'Toxel'],
	},
	{
		name: "[Gen 9] Littlest Cup (No Tera)",
		desc: [
			"<b>Littlest Cup</b>: A National Dex metagame where only Baby Pokemon are allowed."
		],
		threads: [
			`&bullet; <a href="https://pastebin.com/PtqmRUhG">Littlest Cup VR and Sample Sets</a>`,
		],
		mod: 'littlestcup',
		searchShow: false,
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Evasion Items Clause', 'Species Clause', 'Sleep Clause Mod', 'Mega Rayquaza Clause', 'Max Level = 1', 'Terastal Clause'],
		teambuilderFormat: 'National Dex',
		banlist: ['All Pokemon', 'Belly Drum', 'Huge Power', 'Shadow Tag'],
		unbanlist: ['Pichu', 'Cleffa', 'Igglybuff', 'Togepi', 'Tyrogue', 'Smoochum', 'Elekid', 'Magby', 'Azurill', 'Wynaut', 'Budew', 'Chingling', 'Bonsly', 'Mime Jr.', 'Happiny', 'Munchlax', 'Riolu', 'Mantyke', 'Toxel'],
	},
	{
		name: "[Gen 9] Littlest Cup Random Battle",
		desc: [
			"<b>Littlest Cup</b>: A National Dex metagame where only Baby Pokemon are allowed."
		],
		threads: [
			`&bullet; <a href="https://pastebin.com/PtqmRUhG">Littlest Cup VR and Sample Sets</a>`,
		],
		mod: 'littlestcup',
		team: 'random',
		ruleset: ['Data Mod', 'Cancel Mod', 'Sleep Clause Mod', 'Endless Battle Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Z-Move Clause', 'Max Level = 1'],
	}
];