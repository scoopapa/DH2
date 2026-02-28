import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 9] Fusion Evolution Restrictions",
		threads: [
			`<a href="https://www.smogon.com/forums/threads/3770550/">Fusion Evolution Restrictions</a>`,
		],
		mod: 'gen9ferestrictions',
		ruleset: ['Standard', 'Evasion Abilities Clause', 'Sleep Moves Clause', '!Sleep Clause Mod', 'Terastal Clause', 'Mega Rayquaza Clause', 'Mega Data Mod', 'Data Mod'],
		banlist: ['Revival Blessing', 'Shed Tail', 'Baton Pass', 'King\'s Rock', 'Razor Fang', 'Altarianite'],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['FERE', 'FERENFE', 'FERELC', 'Silverade'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Fusion Evolution Restricted.'];
				}
			}
		},
	}
];