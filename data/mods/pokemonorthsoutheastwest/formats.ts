import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 9] Pokémon North, South, East, West",
		teambuilderFormat: "National Dex",
		desc: 'The largest sprite project ever is now the largest Solomod ever...eventually. Content gradually releases in waves!',
		threads: [
			`&bullet; <a href="https://https://www.smogon.com/forums/threads/solomods-megathread.3711007/page-8#post-10197171"></a>`,
		],
		mod: 'pokemonorthsoutheastwest',
		ruleset: ['Standard NatDex', 'Data Mod', 'Terastal Clause'],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['NSEW','NSEW2','NSEW3', 'NSEW4', 'NSEW5', 'NSEW6','NSEW7','NSEW8', 'NSEW9', 'NSEW10', 'NSEW11', 'NSEW12', 'NSEW13', 'NSEW14', 'NSEW15'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Pokémon North, South, East, and West.'];
				}
			}
		},
	}
];