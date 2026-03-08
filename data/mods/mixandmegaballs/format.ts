import { FormatData } from '../../../sim/dex-formats';

export const format: FormatData = {
		name: "[Gen 9] Balls",
		mod: 'mixandmegaballs',
		desc: `A hilarious metagame filled with nothing but balls.`,
		ruleset: ['Standard', 'Data Mod'],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['Balls', 'Guns'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' doesnt exist.'];
				}
			}
		},
	};