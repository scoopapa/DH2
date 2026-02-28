import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 3] Modern Gen 2 The Sequel: Just The Birds",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3711007/post-10203354">Post in the Solomods Megathread</a>`,
		],
		mod: 'moderngen2birds',
		searchShow: false,
		ruleset: ['Standard', 'Z-Move Clause', '!Obtainable Abilities', 'Gems Clause'], // temporary until I can figure why HAs work in MG3 but not here
		banlist: [
			'Assist', 'Baton Pass', 'Arena Trap', 'Shadow Tag', 'Sand Veil', 'Snow Cloak', 'Moody', 'Sand Rush',
			'Power Construct', 'Battle Bond', 'King\'s Rock', 'Razor Fang', 'Soul Dew', 'Shed Tail',
		],
		onValidateTeam(team, format) {
			let speciesTable = {};
			let allowedTiers = ['Birds'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not a bird (according to the mod leader).'];
				}
			}
		},
	}
];