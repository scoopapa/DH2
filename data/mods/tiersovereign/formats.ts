import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 9] Tier Sovereign",
		desc: [
			"<b>Tier Sovereign</b>: A micrometa where Lindwallow rules.",
		],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/tier-sovereign-gen-9-natdex-slate-3-submissions-closed.3768338/">Tier Sovereign on Smogon Forums</a>`,
		      ],
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Z-Move Clause', 'Data Mod', 'Mega Data Mod','Tier Sovereign Mod','Terastal Clause'],
		banlist: [],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			let allowedTiers = ['Tier Sovereign', 'TSOU']
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not usable in Tier Sovereign.'];
				}
			}
		},
		mod: 'tiersovereign',
	}
];