import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 9] Clubmons: Requiem",
		mod: 'clubmonsrequiem',
		desc: `A micrometagame focused on accessibility and teambuilder diversity.`,
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Evasion Items Clause', 'Species Clause', 'Sleep Clause Mod', 'Z-Move Clause', 'Data Mod', 'Mega Data Mod', 'Terastal Clause'],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3711007/page-8#post-10124271">Clubmons on Smogon Forums</a>`,
		],
		banlist: ['Arena Trap', 'Moody', 'Sand Veil', 'Shadow Tag', 'Snow Cloak', 'King\'s Rock', 'Quick Claw', 'Baton Pass', 'Shed Tail', 'Last Respects', 'Hidden Power', 'Absolite', 'Sablenite'],
		teambuilderFormat: 'National Dex',
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['CM', 'CM (NFE)'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Clubmons.'];
				}
			}
		},
	}
];