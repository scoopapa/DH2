import { FormatData } from '../../../sim/dex-formats';

export const format: FormatData = {
		name: "[Gen 9] Nuke Buttons",
		mod: 'nukebuttons',
		desc: `nuke buttons`,
		ruleset: ['Standard Natdex','Data Mod', 'Terastal Clause', 'Picked Team Size = 3'/*, 'Nuke Buttons'*/],
		banlist: ['Raticate', 'Choice Band', 'Choice Scarf', 'Choice Specs', 'Focus Sash', 'Focus Band'],
		teambuilderFormat: 'National Dex',
		onValidateTeam(team, format) {
			let speciesTable = {};
			let allowedTiers = ['NB', 'NBU'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not a Pokemon in Nuke Buttons.'];
				}
			}
		},
	};