import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 2] Modern Gen 2",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/gen-9-modern-gen-2.3725808/">Smogon Thread</a>`,
		],
		mod: 'moderngen2',
		searchShow: false,
		ruleset: ['Standard MG2', 'Sleep Moves Clause', '+No Ability', '-All Abilities', 'Gems Clause', '+Normal Gem'],
		banlist: ['AG', 'Uber', 'Fake Out', 'Shell Smash', 'Last Respects', 'Baton Pass', 'Alakazite', 'Soul Dew'],
	},
	{
		name: "[Gen 2] Modern Gen 2 Ubers",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/gen-9-modern-gen-2.3725808/">Smogon Thread</a>`,
		],
		mod: 'moderngen2',
		searchShow: false,
		ruleset: ['Standard', '+No Ability', '-All Abilities', 'Gems Clause'],
		banlist: ['AG', 'Fake Out', 'Baton Pass', 'Rusted Sword'],
		teambuilderFormat: 'Uber',
	},
	{
		name: "[Gen 2] Modern Gen 2 LC",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/gen-9-modern-gen-2.3725808/">Smogon Thread</a>`,
		],
		mod: 'moderngen2',
		searchShow: false,
		ruleset: ['Standard', 'Little Cup', '+No Ability', '-All Abilities', 'Gems Clause'],
		banlist: ['Basculin-White-Striped', 'Qwilfish-Hisui', 'Sneasel-Hisui', 'Dunsparce', 'Scyther', 'Girafarig', 'Type: Null', 'Fake Out', 'Sonic Boom', 'Dragon Rage'],
	}
];