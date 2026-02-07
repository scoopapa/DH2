import { FormatData } from '../../../sim/dex-formats';

export const format: FormatData = {
		name: "[Gen 9] GlaceMons Uber",
		desc: '<b>GlaceMons</b>: The fourth mod in the SylveMons series where Pokemon, items, abilities and moves are redesigned for Gen 9 NatDex OU (and new items, abilities and moves are added) without changing base stats.',
		threads: [
			`&bullet; <a href="">Spreadsheet for the mod</a>`,
		],
		mod: 'glacemonsuber',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Data Mod', 'Mega Data Mod'],
		banlist: ['AG', 'Berserk Gene', 'Sand Veil', 'Snow Cloak', 'King\'s Rock', 'Quick Claw', 'Razor Fang', 'Baton Pass', // 'Gengar + Parallel Mega Orb',
			'Dungeon\s Looplet + Sandshrew', 'Dungeon\s Looplet + Sandslash', 'Dungeon\s Looplet + Diglett-Alola', 'Dungeon\s Looplet + Dugtrio-Alola', 'Dungeon\s Looplet + Geodude', 'Dungeon\s Looplet + Graveler', 'Dungeon\s Looplet + Golem', 'Dungeon\s Looplet + Phanpy', 'Dungeon\s Looplet + Donphan', 'Dungeon\s Looplet + Gligar', 'Dungeon\s Looplet + Gliscor', 'Dungeon\s Looplet + Larvitar', 'Dungeon\s Looplet + Cacnea', 'Dungeon\s Looplet + Cacturne', 'Dungeon\s Looplet + Gible', 'Dungeon\s Looplet + Gabite', 'Dungeon\s Looplet + Helioptile', 'Dungeon\s Looplet + Heliolisk', 'Dungeon\s Looplet + Sandygast','Dungeon\s Looplet + Palossand', 'Dungeon\s Looplet + Silicobra', 'Dungeon\s Looplet + Sandaconda', 'Dungeon\s Looplet + Wiglett', 'Dungeon\s Looplet + Wugtrio', 'Dungeon\s Looplet + Orthworm',
			'Dungeon\s Looplet + Sandshrew-Alola', 'Dungeon\s Looplet + Sandslash-Alola', 'Dungeon\s Looplet + Vulpix-Alola', 'Dungeon\s Looplet + Ninetales-Alola', 'Dungeon\s Looplet + Swinub', 'Dungeon\s Looplet + Piloswine', 'Dungeon\s Looplet + Froslass', 'Dungeon\s Looplet + Vanillite', 'Dungeon\s Looplet + Vanillish', 'Dungeon\s Looplet + Cetoddle',
		],
		unbanlist: ['Light of Ruin'],
		teambuilderFormat: 'National Dex Uber',
		onModifySpeciesPriority: 2,
		onModifySpecies(species, target, source, effect) {
			if (source?.forme && source.forme.startsWith('Mega') && source.hasItem('parallelmegaorb')) {
				let newAbility = source.set.ability
				const oldAbility = source.setAbility(newAbility);
			}
			return {...species};
		},
	},