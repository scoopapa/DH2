import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
	name: "[Gen 9] Geek's Sandbox",
		mod: 'geekssandbox',
		desc: `My personal solomod for all my whacky ideas.`,
		ruleset: ['Standard NatDex', 'Data Mod'],
		onValidateTeam(team, format) {
			let speciesTable = {};
			let allowedTiers = ['Idiom'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Geeks Sandbox.'];
				}
			}
		},
	}
];