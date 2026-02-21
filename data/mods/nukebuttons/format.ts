import { FormatData } from '../../../sim/dex-formats';

export const format: FormatData = {
		name: "[Gen 9] Nuke Buttons",
		mod: 'nukebuttons',
		desc: `nuke buttons (by ifwih)`,
		threads: [
		`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3711007/post-10876663">Nuke Buttons on Smogon Forums</a>`,
		`&bullet; <a href="https://docs.google.com/spreadsheets/d/1arRmUhN6MOAmgLLn-ZGMM95fp9tP7bwssS3depNnM_M/">Changes Sheet</a>`,
		],
		ruleset: ['Standard Natdex','Data Mod', 'Terastal Clause', 'Picked Team Size = 3'/*, 'Nuke Buttons'*/],
		banlist: ['Raticate', 'Choice Band', 'Choice Scarf', 'Choice Specs', 'Focus Sash', 'Focus Band'],
		teambuilderFormat: 'National Dex',
		searchShow: false,
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