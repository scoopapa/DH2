import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 9] Super Types OU",
		desc: "The Super Type mechanic from Scootopia, only it's applied to current gen 9 OU.",
		threads: [
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1khgnzqe3xldhLw1LbfjyYDcsltZrgyo8by4Y8EDE4vQ/edit#gid=1291687635">Types + Moves Explained</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1khgnzqe3xldhLw1LbfjyYDcsltZrgyo8by4Y8EDE4vQ/edit#gid=894228879">List of Defensive Type Combos</a>`,
		],
		mod: "supertypesou",
		ruleset: ['Standard NatDex', 'Z-Move Clause', 'Data Mod'],
	}
];