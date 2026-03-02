import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
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
	},
	{
		name: "[Gen 9] TeraMax VGC",
		mod: 'teramax',
		gameType: 'doubles',
		bestOfDefault: true,
		ruleset: ['Obtainable', 'Team Preview', 'Species Clause', 'Nickname Clause', 'Item Clause', 'Cancel Mod', 'Picked Team Size = 4', 'Adjust Level = 50', 'VGC Timer', 'Open Team Sheets', 'Data Mod'],
		banlist: [
			'Battle Bond', 'Melmetal-Gmax', 'Ogerpon-Hearthflame + Close Combat', 'Ogerpon-Hearthflame + Rock Blast',
			'Ogerpon-Wellspring + Close Combat', 'Ogerpon-Wellspring + Rock Blast', 'Ogerpon-Cornerstone + Rock Blast',
			'Restricted Legendary', 'Mythical',
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
	}
];