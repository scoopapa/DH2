import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 9] Micrometa Mafia 4",
        desc: [
            "micrometa mafia 4",
        ],
        threads: [
            `&bullet; <a href="https://www.youtube.com/shorts/bbZCltuyZlM">Micrometa Mafia 4 on Smogon Forums</a>`,
              ],
        ruleset: ['Standard NatDex', 'Terastal Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Data Mod', 'Z-Move Clause'],
        banlist: ['Baton Pass', 'Assist', 'Last Respects', 'Shed Tail', 'King\'s Rock', 'Razor Fang', 'Quick Claw', 'Arena Trap', 'Moody', 'Power Construct', 'Shadow Tag', 'Swampertite', 'Altarianite'],
		teambuilderFormat: "National Dex",
        onValidateTeam(team, format) {
            /**@type {{[k: string]: true}} */
            let speciesTable = {};
            for (const set of team) {
                let template = this.dex.species.get(set.species);
                if (template.tier !== 'MMM4') {
                    return [set.species + ' is not usable in Micrometa Mafia 4.'];
                }
            }
        },
        mod: 'mmm4',
	}
];
