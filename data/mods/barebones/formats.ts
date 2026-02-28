import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 9] Bare Bones",
		desc: 'bare bones micrometa',
		mod: 'barebones',
		ruleset: [
		'Team Preview', 'Nickname Clause', 'HP Percentage Mod', 'Cancel Mod', 'Endless Battle Clause', 'Terastal Clause', 'Data Mod', 'Camomons Mod',
		],
		banlist: ['All Items', 'All Abilities'],
		unbanlist: [
		'Pinch Berry', 'Tsersi Berry', 'Leftovers', 'Silk Scarf', 'Charcoal', 'Mystic Water', 'Miracle Seed', 'Magnet', 'Never-Melt Ice', 'Black Belt', 'Poison Barb',
		'Soft Sand', 'Sharp Beak', 'Twisted Spoon', 'Silver Powder', 'Hard Stone', 'Spell Tag', 'Dragon Fang', 'Black Glasses', 'Metal Coat', 'Fairy Feather', 'Muscle Band',
		'Wise Glasses', 'Exchanger', 'Focus Sash',

		'Desperation', 'Last Stand', 'Appraisal', 'Rejuvenate', 'Recycler', 'Somewhat Reckless', 'Tinted Tactics', 'Intimidate', 'Sceptic',
		],
		onValidateTeam(team, format) {
			let speciesTable = {};
			let allowedTiers = ['bbones'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not in Bare Bones.'];
				}
			}
		}
	}
];