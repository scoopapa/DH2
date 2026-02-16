import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 9] Do Not Use: The Pet Mod: The Musical",
		desc: '<b>Do Not Use: The Pet Mod: The Musical</b>: A National Dex Pet Mod where only Pokemon with 280 BST or less, with some exception, are allowed. New Pokemon are added and edited into the existing DNU metagame.',
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3749356/">Do Not Use: The Pet Mod: The Musical</a>`,
		],
		mod: 'donotusetmptm',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Evasion Items Clause', 'Species Clause', 'Sleep Clause Mod', 'Mega Rayquaza Clause', 'Terastal Clause', 'Z-Move Clause', 'Data Mod'],
		teambuilderFormat: 'National Dex',
		banlist: ['Huge Power', 'Pure Power', 'Shadow Tag', 'Arena Trap', 'Baton Pass', 'Moody', 'Cute Charm'],
		unbanlist: ['Assist'],
		onValidateTeam(team, format) {
			let speciesTable = {};
			let allowedTiers = ['DoNU', 'DoNU UUBL', 'DoNU UU', 'DoNU RUBL', 'DoNU RU'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in [Gen 9] Do Not Use: The Pet Mod: The Musical.'];
				}
			}
		},
	}
];