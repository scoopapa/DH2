import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 9] Pokémon Go! Go! Tamagotchi!",
		desc: 'They did not deserve to be forgotten to Digimon...a Solomod that contains three hundred adult form Tamagotchi!',
		threads: [
		`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3711007/page-9#post-10311554"></a>`,
		],
		mod: 'tamagotchi',
		ruleset: ['Standard', 'Data Mod', 'Terastal Clause'],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['Go! Go! Tamagotchi!'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not a Tamagotchi.'];
				}
			}
		},
	}
];