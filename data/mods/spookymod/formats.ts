import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
        name: "[Gen 9] Spookymod",
        desc: [
            "jumpscaare",
        ],
        threads: [
            `&bullet; <a href="https://www.youtube.com/shorts/bbZCltuyZlM">Spookymod on Smogon Forums</a>`,
              ],
        ruleset: ['Standard NatDex', 'Terastal Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Z-Move Clause','Spokymod'],
        banlist: [],
		teambuilderFormat: "National Dex",
        onValidateTeam(team, format) {
            /**@type {{[k: string]: true}} */
            let speciesTable = {};
            let f = false;
            let ff = false;
            for (const set of team) {
                if (set.species === 'Flutter Mane') f = true;
                else if (set.species === 'Flutter Mane 2') ff = true;
                if(f && ff) return ['Did you think you could bring two Flutter Manes to a game? Are you stupid?'];
                let template = this.dex.species.get(set.species);
                if (template.tier !== 'SM') {
                    return [set.species + ' is not usable in Spookymod.'];
                }
            }
        },
        mod: 'spookymod',
    },
	{
        name: "[Gen 9] Spookymod Random Battle",
        desc: [
            "jumpscaare",
        ],
        threads: [
            `&bullet; <a href="https://www.youtube.com/shorts/bbZCltuyZlM">Spookymod on Smogon Forums</a>`,
              ],
        ruleset: ['Standard NatDex', 'Terastal Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Z-Move Clause', '!Team Preview', 'Spokymod'],
        banlist: [],
		team: 'random',
        mod: 'spookymod',
    }
];