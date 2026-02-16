import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
	name: "[Gen 9] Masquerade",
    desc: '<b>Masquerade</b>: A micrometa where every Pokemon has at least one Ogerpon-like Mask form that can Terastalize to change its ability.',
	  threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/masquerade-slate-2-winners.3731477/">Masquerade on Smogon Forums</a>`,
		],
     mod: 'masquerade',
	  ruleset: ['Standard', 'Data Mod', 'Terastal Clause'],
	  banlist: ['Uber', 'AG', 'Arena Trap', 'Moody', 'Sand Veil', 'Shadow Tag', 'Snow Cloak', 'King\'s Rock',
					'Baton Pass', 'Last Respects', 'Shed Tail', 'Cornerstone Mask'],
		onValidateTeam(team, format) {
			let speciesTable = {};
			let allowedTiers = ['MSQ'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (template.tier !== 'MSQ') {
					return [set.species + ' is not legal in [Gen 9] Masquerade.'];
				}
			}
		},
	}
];