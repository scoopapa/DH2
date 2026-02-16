import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 9] Do Not Use",
		desc: [
			"<b>Do Not Use</b>: A National Dex metagame where only Pokemon with 280 BST or less are allowed."
		],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/gen-9-do-not-use.3734326/">Do Not Use</a>`,
		],
		mod: 'donotuse',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Evasion Items Clause', 'Species Clause', 'Sleep Clause Mod', 'Mega Rayquaza Clause', 'Terastal Clause', 'Z-Move Clause'],
		teambuilderFormat: 'National Dex',
		banlist: ['Huge Power', 'Pure Power', 'Shadow Tag', 'Arena Trap', 'Baton Pass', 'Moody', 'Cute Charm', 'Hustle', 'Sand Veil', 'Snow Cloak'],
		unbanlist: ['Assist'],
		onValidateTeam(team, format) {
			let speciesTable = {};
			let allowedTiers = ['DoNU', 'DoNU UUBL', 'DoNU UU', 'DoNU RUBL', 'DoNU RU'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in [Gen 9] Do Not Use.'];
				}
			}
		},
	},
	{
		name: "[Gen 9] DNU Random Battle",
		desc: `<b>Do Not Use</b>: A National Dex metagame where only Pokemon with 280 BST or less are allowed.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/gen-9-do-not-use.3734326/">Do Not Use</a>`,
		],
		mod: 'donotuse',
		team: 'random',
		ruleset: ['Obtainable', 'Species Clause', 'HP Percentage Mod', 'Sleep Clause Mod', 'Terastal Clause', 'Cancel Mod'],
	}
];