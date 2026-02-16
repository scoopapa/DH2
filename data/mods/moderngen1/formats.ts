import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 1] Modern Gen 1",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/gen-9-modern-gen-1.3711533/">Smogon Thread</a>`,
		],
		mod: 'moderngen1',
		searchShow: false,
		ruleset: ['Standard', 'Partial Trapping Clause', 'Protect Clause', 'Field Effect Clause', 'Sleep Moves Clause', '+No Ability', '-All Abilities', '-All Items'],
		banlist: ['Uber', 'Fake Out', 'Confuse Ray', 'Supersonic', 'Swagger', 'Sweet Kiss', 'Shell Smash', 'Teeter Dance', 'Flatter'],
	},
	{
		name: "[Gen 1] Modern Gen 1 Random Battle",
		desc: `Pok&eacute;mon, items, abilities, and moves are redesigned for OU, and new items, abilities, and moves are added, all without changing base stats.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/gen-9-modern-gen-1.3711533/">MG1</a>`,
		],
		mod: 'moderngen1',
		team: 'random',
		ruleset: ['Obtainable', 'Species Clause', 'HP Percentage Mod', 'Freeze Clause Mod', 'Cancel Mod'],
	},
	{
		name: "[Gen 1] Modern Gen 1 Ubers",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/gen-9-modern-gen-1.3711533/">Smogon Thread</a>`,
		],
		mod: 'moderngen1',
		searchShow: false,
		ruleset: ['Standard', 'Partial Trapping Clause', 'Protect Clause', 'Field Effect Clause', 'Sleep Moves Clause', '+No Ability', '-All Abilities', '-All Items'],
		banlist: ['AG', 'Fake Out', 'Confuse Ray', 'Supersonic', 'Swagger', 'Sweet Kiss', 'Flatter'],
		teambuilderFormat: 'Uber',
	},
	{
		name: "[Gen 1] Modern Gen 1 UU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/gen-9-modern-gen-1.3711533/">Smogon Thread</a>`,
		],
		mod: 'moderngen1',
		searchShow: false,
		ruleset: ['Standard', 'Partial Trapping Clause', 'Protect Clause', 'Field Effect Clause', 'Sleep Moves Clause', '+No Ability', '-All Abilities', '-All Items'],
		banlist: ['Uber', 'OU', 'UUBL', 'Fake Out', 'Confuse Ray', 'Supersonic', 'Swagger', 'Sweet Kiss', 'Flatter'],
	},
	{
		name: "[Gen 1] Modern Gen 1 LC",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/gen-9-modern-gen-1.3711533/">Smogon Thread</a>`,
		],
		mod: 'moderngen1',
		searchShow: false,
		ruleset: ['Standard', 'Little Cup', 'Partial Trapping Clause', 'Field Effect Clause', 'Sleep Moves Clause', '+No Ability', '-All Abilities', '-All Items'],
		banlist: ['Basculin-White-Striped', 'Qwilfish-Hisui', 'Sneasel', 'Stantler', 'Tangela', 'Sneasel-Hisui', 'Dunsparce', 'Scyther', 'Girafarig', 'Type: Null', 'Fake Out'],
	}
];