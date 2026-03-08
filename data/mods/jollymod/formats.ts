import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
        name: "[Gen 9] Jollymod",
        desc: [
            "jumpscaare",
        ],
        threads: [
            `&bullet; <a href="https://www.youtube.com/shorts/bbZCltuyZlM">Jollymod on Smogon Forums</a>`,
              ],
        ruleset: ['Standard NatDex', 'Terastal Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Z-Move Clause', 'Data Mod', 'Mega Data Mod', 'Jolly'],
        banlist: ['Avalanche'],
		teambuilderFormat: "National Dex",
        onValidateTeam(team, format) {
            /**@type {{[k: string]: true}} */
            let speciesTable = {};
            for (const set of team) {
                let template = this.dex.species.get(set.species);
                if (template.tier !== 'JM') {
                    return [set.species + ' is not usable in Jollymod.'];
                }
            }
        },
        mod: 'jollymod',
    }
];