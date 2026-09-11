import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 9] Moonmons",
		mod: 'moonmons',
		desc: `Project Moon Petmod.`,
		ruleset: ['Standard', 'Data Mod'],
		// teambuilderFormat: 'National Dex', // (uncomment this line if your mod is natdex)
		onValidateTeam(team, format) {
			let speciesTable = {};
			let allowedTiers = ['Moon'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in MoonMons.'];
				}
			}
		},
	}
];
