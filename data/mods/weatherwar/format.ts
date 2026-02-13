import { FormatData } from '../../../sim/dex-formats';

export const format: FormatData = {
        name: "[Gen 9] Climate Change",
        desc: [
            "weather war",
        ],
        threads: [
            `&bullet; <a href="https://www.youtube.com/shorts/bbZCltuyZlM">Climate Change on Smogon Forums</a>`,
              ],
        ruleset: ['Standard NatDex', 'Terastal Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Z-Move Clause', 'Data Mod', 'Mega Data Mod'],
        banlist: ['Sunny Day', 'Rain Dance', 'Sandstorm', 'Hail', 'Snowscape', 'Chilly Reception', 'Charizardite X'],
		teambuilderFormat: "National Dex",
        onValidateTeam(team, format) {
            /**@type {{[k: string]: true}} */
            let speciesTable = {};
            for (const set of team) {
                let template = this.dex.species.get(set.species);
                if (template.tier !== 'CC') {
                    return [set.species + ' is not usable in Climate Change.'];
                }
            }
        },
        mod: 'weatherwar',
    };