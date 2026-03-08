import { FormatData } from '../../../sim/dex-formats';

export const format: FormatData = {
	
// Example tier 

		name: "Placeholder Mod",
		mod: 'placeholder',
		desc: `The example modfolder.`,
		ruleset: ['Standard', 'Data Mod'],
		// teambuilderFormat: 'National Dex', // (uncomment this line if your mod is natdex)
		onValidateTeam(team, format) {
			let speciesTable = {};
			let allowedTiers = [''];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Placeholder Mod.'];
				}
			}
		},
	};