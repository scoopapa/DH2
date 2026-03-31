 import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
	    name: "[Gen 9] Micrometa Mafia 2",
        desc: [
            "micrometa mafia 2",
        ],
        threads: [
            `&bullet; <a href="https://www.youtube.com/shorts/bbZCltuyZlM">Micrometa Mafia 2 on Smogon Forums</a>`,
              ],
        ruleset: ['Standard NatDex', 'Terastal Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Data Mod', 'Z-Move Clause'],
        banlist: [],
		teambuilderFormat: "National Dex",
        onValidateTeam(team, format) {
            /**@type {{[k: string]: true}} */
            let speciesTable = {};
            for (const set of team) {
                let template = this.dex.species.get(set.species);
                if (template.tier !== 'MMM2') {
                    return [set.species + ' is not usable in Micrometa Mafia 2.'];
                }
            }
        },
        mod: 'mmm2',
    }
];