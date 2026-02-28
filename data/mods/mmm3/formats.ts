import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
        name: "[Gen 9] Micrometa Mafia 3",
        desc: [
            "micrometa mafia 3",
        ],
        threads: [
            `&bullet; <a href="https://www.youtube.com/shorts/bbZCltuyZlM">Micrometa Mafia 3 on Smogon Forums</a>`,
              ],
        ruleset: ['Standard NatDex', 'Terastal Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Data Mod', 'Z-Move Clause'],
        banlist: ['Baton Pass', 'Assist', 'Last Respects', 'Shed Tail', 'King\'s Rock', 'Razor Fang', 'Quick Claw', 'Arena Trap', 'Moody', 'Power Construct', 'Shadow Tag'],
		teambuilderFormat: "National Dex",
        onValidateTeam(team, format) {
            /**@type {{[k: string]: true}} */
            let speciesTable = {};
            for (const set of team) {
                let template = this.dex.species.get(set.species);
                if (template.tier !== 'MMM3') {
                    return [set.species + ' is not usable in Micrometa Mafia 3.'];
                }
            }
        },
        mod: 'mmm3',
    }
];