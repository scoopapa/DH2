import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 9] Eternal Pokémon",
		mod: 'eternalpokemon',
		desc: 'A Pet Mod that aims to give Eternal Floette-like formes to other NFE Pokémon.',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Evasion Items Clause', 'Species Clause', 'Sleep Moves Clause', 'Z-Move Clause', 'Data Mod', 'Terastal Clause', 'Picked Team Size = 6'], // temporarily asks for team order until Magikarp-Eternal situation is solved
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/eternal-pok%C3%A9mon.3755140/">Eternal Pokémon on Smogon Forums</a>`,
		],
		banlist: ['Aegislash', 'Aerodactylite', 'Gardevoirite', 'Gengarite', 'Kangaskhanite', 'Lucarionite', 'Power Construct', 'Salamencite', 'Zygarde', 'Arena Trap', 'Baton Pass', 'Moody', 'Sand Veil', 'Shadow Tag', 'Snow Cloak', 'King\'s Rock', 'Razor Fang', 'Quick Claw'],
		teambuilderFormat: 'National Dex',
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['FE', '1x NFE', '2x NFE'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (template.tier == 'Banned') return [set.species + ' is banned in Eteral Pokémon'];
				if (template.tier == 'WIP') return [set.species + ' has some coding challenges, so it\'s not allowed yet!'];
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not available in Eternal Pokémon.'];
				}
			}
		},
	}
];