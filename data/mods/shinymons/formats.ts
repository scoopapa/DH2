import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 9] Shinymons",
		desc: `A Pet Mods Room Mod where every Pokemon receives a new Shiny form.`,
		mod: 'shinymons',
		ruleset: ['Standard', 'Data Preview', '!Team Preview'],
		banlist: ['Uber'],
		validateSet(set, teamHas) {
			let speciesName = set.species;
			if (set.shiny) speciesName += "-Shiny";
			set.species = speciesName;
			this.dex.data.Pokedex[this.toID(speciesName)].name = speciesName;
			return this.validateSet(set, teamHas);
		},
		onTeamPreview() {
			this.add('clearpoke');
			for (const pokemon of this.getAllPokemon()) {
				const details = pokemon.details
					.replace(/(Arceus|Genesect|Gourgeist|Pumpkaboo|Xerneas|Silvally|Urshifu|Dudunsparce)(-[a-zA-Z?-]+)?/g, '$1-*')
					.replace(/(Zacian|Zamazenta)(?!-Crowned)/g, '$1-*') // Hacked-in Crowned formes will be revealed
					.replace(/(Greninja)(?!-Ash)/g, '$1-*'); // Hacked-in Greninja-Ash will be revealed
				this.add('poke', pokemon.side.id, details, pokemon.item ? 'item' : '');
			}
			this.makeRequest('teampreview');
		},
	}
];