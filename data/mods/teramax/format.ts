import { FormatData } from '../../../sim/dex-formats';

export const format: FormatData = {
		name: "[Gen 9] TeraMax",
		mod: 'teramax',
		ruleset: ['Standard', 'Data Mod'],
		banlist: [
			'Arena Trap', 'Power Construct', 'Moody', 'Shadow Tag', 'Stellar Shift', 'Stellar Shell', 'King\'s Rock', 'Baton Pass',
			'Last Respects', 'Shed Tail', 'Wishing Stone > 1', 'Light Clay',
		],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['TMOU', 'TMFE', 'TMNFE', "TMLC"];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in TeraMax.'];
				}
			}
		},
		onSwitchOut(pokemon) {
			const isTeraStellar = pokemon.terastallized === 'Stellar';
			if (isTeraStellar) {
			   pokemon.stellarBoostedTypes = [];
			}
		},
	};