import { FormatData } from '../../../sim/dex-formats';

export const format: FormatData = {
		name: "[Gen 9] Poketypos",
		desc: `<b>[Gen 9] Poketypos</b>: A NatDex metagame that alters the names of Pokemon and change said Pokemon to fit their new name.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/pok%C3%A9typos-slate-2-single-stage-pokemon.3711498/">Poketypos on Smogon Forums</a>`,
		],
		mod: 'poketypos',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Terastal Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Z-Move Clause', 'Data Mod', 'Mega Data Mod'],
		banlist: [
			'Arena Trap', 'Moody', 'Shadow Tag', 'Baton Pass',
		],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			let allowedTiers = ['Poketypos', 'Poketypos NFE', 'Poketypos LC'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (template.tier !== 'Poketypos' && template.tier !== 'Poketypos NFE' && template.tier !== 'Poketypos LC') {
					return [set.species + ' is not legal in the Poketypos format.'];
				}
			}
		},
	};