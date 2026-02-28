import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 9] Super Smash Mods Brawl",
		desc: [
			"<b>Super Smash Mods Brawl</b>: The third in the Super Smash Mods series, creating a micrometa using Pokemon from other Pet Mods and Solomods.",
		],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3768342/">Super Smash Mods Brawl on Smogon Forums</a>`,
		],
		teambuilderFormat: "National Dex",
		ruleset: ['Standard NatDex', 'Sleep Moves Clause', 'Terastal Clause', /*'Z-Move Clause',*/ 'Data Mod', 'Mega Data Mod'],
		banlist: [
			'Arena Trap', 'Moody', 'Sand Veil', 'Shadow Tag', 'Snow Cloak', 'King\'s Rock', 'Razor Fang', 'Baton Pass', 'Last Respects', 'Shed Tail',
			'Normalium Z', 'Fairium Z', 'Fightinium Z', 'Firium Z', 'Flyinium Z', 'Darkinium Z', 'Dragonium Z', 'Buginium Z', 'Waterium Z', 'Electrium Z',
			'Ghostium Z', 'Grassium Z', 'Groundium Z', 'Icium Z', 'Poisonium Z', 'Psychium Z', 'Rockium Z', 'Steelium Z', 'Houndoominite',
			'Zinogrite', 
			/*'Wishing Stone',*/ 'Epic Beam', // temp bans
		],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if ( template.tier !== 'SSB') {
					return [set.species + ' is not usable in Super Smash Mods Brawl.'];
				}
			}
		},
		mod: 'smashmodsbrawl',
	}
];