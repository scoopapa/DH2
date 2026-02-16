import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 9] Clean Slate Micro 2",
		desc: `Clean Slate.`,
		threads: [
			`<a href="https://www.smogon.com/forums/threads/clean-slate-micro-2.3696166/">Clean Slate Micro 2</a>`,
		],
		mod: 'csm2',
		ruleset: ['Standard', 'Dynamax Clause'],
		// onSwitchIn(pokemon) {
			// this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[silent]');
		// },
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (template.tier !== 'CSM2') {
					return [set.species + ' is not useable in Clean Slate Micro 2.'];
				}
			}
		},
	}
];