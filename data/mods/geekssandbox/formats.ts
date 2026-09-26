import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
	name: "[Gen 9] Geek's Sandbox",
		mod: 'geekssandbox',
		desc: `My personal solomod for all my whacky ideas.`,
		ruleset: ['Standard NatDex', 'Data Mod', 'No Crit Mod', 'Sleep Clause Mod', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Terastal Clause', 'Dynamax Clause'],
		banlist: ['Houndoominite'],
		threads: [
			'&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3711007/post-11077037">Geeks Sandbox</a>',
		],
		unbanlist: ['Stick', 'Snap Trap', 'Head Charge'],
		teambuilderFormat: 'National Dex',  
		onValidateTeam(team, format) {
			let speciesTable = {};
			let allowedTiers = ['Idiom', 'Geekmicro'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Geeks Sandbox.'];
				}
			}
		},
	},
	{
	name: "[Gen 9] GS Geekmicro",
		mod: 'geekssandbox',
		desc: `My personal solomod for all my whacky ideas.`,
		ruleset: ['Standard NatDex', 'Data Mod', 'No Crit Mod', 'Sleep Clause Mod', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Terastal Clause', 'Dynamax Clause'],
		banlist: ['Houndoominite'],
		threads: [
			'&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3711007/post-11077037">Geekmicro</a>',
		],
		unbanlist: ['Stick', 'Snap Trap', 'Head Charge'],
		teambuilderFormat: 'National Dex',  
		onValidateTeam(team, format) {
			let speciesTable = {};
			let allowedTiers = ['Geekmicro'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in GS Geekmicro'];
				}
			}
		},
	},
];
