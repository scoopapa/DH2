import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 9] Dense AF",
		desc: 'experimental format with few things and things that are smooshed together',
		mod: 'denseaf',
		ruleset: [
		'Nickname Clause', 'Species Clause', 'HP Percentage Mod', 'Cancel Mod', 'Endless Battle Clause', 'Terastal Clause', 'Dense AF Mod',
		],
		banlist: ['All Items'],
		unbanlist: [
		'Pinch Berry', 'Tsersi Berry', 'Nota Berry', 'Soft Silver Magnet', 'Miracle Stone Belt', 'Big Neutral Energy', 'Twisted Mystic Coal', 'Black Ice Coat',
		'Sharp Feather Barb', 'Focus Sash', 'Adrenaline Orb', 'Shed Shell',
		],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['DAF'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not DenseAF.'];
				}
			}
		}
	}
];