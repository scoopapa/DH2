import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 9] Crossover Chaos [Ver. C]",
		desc: `Crossover Chaos, a micrometa designed to crossover characters from video game titles.`,
		threads: [
			`<a href="https://www.smogon.com/forums/threads/gen-9-crossover-chaos-ver-c.3757316/">Gen 9 Crossover Chaos (Ver. C)</a>`,
		],
		mod: 'gen9crossoverchaosc',
		teambuilderFormat: "National Dex",
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Data Mod', 'Sleep Moves Clause', 'Terastal Clause', 'Mega Data Mod'],
		banlist: ["Buginium Z", "Darkinium Z", "Dragonium Z", "Electrium Z", "Fairium Z", "Fightinium Z", "Firium Z", "Flyinium Z", "Ghostium Z", 
			"Grassium Z", "Groundium Z", "Icium Z", "Normalium Z", "Poisonium Z", "Psychium Z", "Rockium Z", "Steelium Z", "Waterium Z"],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['CC OU'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Crossover Chaos Version C.'];
				}
			}
		}
	},
	{
		name: "[Gen 9] Crossover Chaos [Ver. C] Random Battle",
		mod: 'gen9crossoverchaosc',
		team: 'random',
		desc: `gen9crossoverchaosc`,
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Data Mod', 'Sleep Moves Clause', 'Terastal Clause', 'Mega Data Mod', '!Team Preview'],
	}
];