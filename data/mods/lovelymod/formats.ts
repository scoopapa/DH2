import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 9] Lovelymod",
		desc: `Double battle where you bring four Pok&eacute;mon to Team Preview and choose only two.`,
		mod: 'lovelymod',
		gameType: 'doubles',
		ruleset: [
			'Picked Team Size = 2', 'Max Team Size = 6',
			'Standard Doubles', 'Accuracy Moves Clause', 'Terastal Clause', 'Sleep Clause Mod', 'Evasion Items Clause', 'Data Mod', 'Mega Data Mod'
		],
		banlist: [
			'Focus Sash', 'King\'s Rock', 'Razor Fang', 'Ally Switch', 'Final Gambit', 'Perish Song', 'Swagger',
		],
    onValidateTeam(team, format) {
        /**@type {{[k: string]: true}} */
        let speciesTable = {};
        for (const set of team) {
            let template = this.dex.species.get(set.species);
            if (template.tier !== 'LM') {
                return [set.species + ' is not usable in Lovelymod.'];
            }
        }
    },
	},
	{
		name: "[Gen 9] Lovelymod Bo3",
		desc: `Double battle where you bring four Pok&eacute;mon to Team Preview and choose only two.`,
		mod: 'lovelymod',
		gameType: 'doubles',
		ruleset: [
			'Picked Team Size = 2', 'Max Team Size = 6',
			'Standard Doubles', 'Accuracy Moves Clause', 'Terastal Clause', 'Sleep Clause Mod', 'Evasion Items Clause', 'Data Mod', 'Mega Data Mod','Best Of = 3',
		],
		banlist: [
			'Focus Sash', 'King\'s Rock', 'Razor Fang', 'Ally Switch', 'Final Gambit', 'Perish Song', 'Swagger', 
		],
    onValidateTeam(team, format) {
        /**@type {{[k: string]: true}} */
        let speciesTable = {};
        for (const set of team) {
            let template = this.dex.species.get(set.species);
            if (template.tier !== 'LM') {
                return [set.species + ' is not usable in Lovelymod.'];
            }
        }
    },
	}
];
