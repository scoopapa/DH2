import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
	  name: "[Gen 9] Natural Selection",
     desc: '<b>Natural Selection</b>: A micrometa where Pokemon actively evolve, fill new niches, and go extinct based on usage stats.',
	  threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/natural-selection.3732415/">Natural Selection on Smogon Forums</a>`,
		],
     mod: 'naturalselection',
	  ruleset: ['Standard', 'Data Mod', 'Terastal Clause'],
	  banlist: ['Uber', 'AG', 'Arena Trap', 'Moody', 'Sand Veil', 'Shadow Tag', 'Snow Cloak', 'King\'s Rock', 'Baton Pass', 'Last Respects', 'Shed Tail'],
		onValidateTeam(team, format) {
			let speciesTable = {};
			let allowedTiers = ['NS'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (template.tier !== 'NS') {
					return [set.species + ' is not legal in [Gen 9] Natural Selection.'];
				}
			}
		},
	}
];