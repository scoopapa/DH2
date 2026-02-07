import { FormatData } from '../../../sim/dex-formats';

export const format: FormatData = {
		name: "[Gen 9] GlaceMons",
		desc: '<b>GlaceMons</b>: The fourth mod in the SylveMons series where Pokemon, items, abilities and moves are redesigned for Gen 9 NatDex OU (and new items, abilities and moves are added) without changing base stats.',
		threads: [
			`&bullet; <a href="">Spreadsheet for the mod</a>`,
		],
		mod: 'glacemons',
		ruleset: ['Standard NatDex', 'Terastal Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Data Mod', 'Mega Data Mod'],
		banlist: ['AG', 'Uber', 'Power Construct', 'Berserk Gene', 'Arena Trap', 'Sand Veil', 'Snow Cloak', 'Shadow Tag', 'King\'s Rock', 'Quick Claw', 'Razor Fang', 'Baton Pass', 'Last Respects', 'Shed Tail',
			// 'Blastoise + Parallel Mega Orb', 'Salamence + Parallel Mega Orb', 'Gengar + Parallel Mega Orb', 'Alakazam + Parallel Mega Orb', 'Blaziken + Parallel Mega Orb', 'Lucario + Parallel Mega Orb', 'Gallade + Parallel Mega Orb',
			'Special Tera Orb',
			// stupid dungeon's looplet
			'Dungeon\s Looplet + Zygarde-10%',
			'Dungeon\s Looplet + Diglett', 'Dungeon\s Looplet + Dugtrio', 'Dungeon\s Looplet + Trapinch',
			'Dungeon\s Looplet + Sandshrew', 'Dungeon\s Looplet + Sandslash', 'Dungeon\s Looplet + Diglett-Alola', 'Dungeon\s Looplet + Dugtrio-Alola', 'Dungeon\s Looplet + Geodude', 'Dungeon\s Looplet + Graveler', 'Dungeon\s Looplet + Golem', 'Dungeon\s Looplet + Phanpy', 'Dungeon\s Looplet + Donphan', 'Dungeon\s Looplet + Gligar', 'Dungeon\s Looplet + Gliscor', 'Dungeon\s Looplet + Larvitar', 'Dungeon\s Looplet + Cacnea', 'Dungeon\s Looplet + Cacturne', 'Dungeon\s Looplet + Gible', 'Dungeon\s Looplet + Gabite', 'Dungeon\s Looplet + Helioptile', 'Dungeon\s Looplet + Heliolisk', 'Dungeon\s Looplet + Sandygast','Dungeon\s Looplet + Palossand', 'Dungeon\s Looplet + Silicobra', 'Dungeon\s Looplet + Sandaconda', 'Dungeon\s Looplet + Wiglett', 'Dungeon\s Looplet + Wugtrio', 'Dungeon\s Looplet + Orthworm',
			'Dungeon\s Looplet + Sandshrew-Alola', 'Dungeon\s Looplet + Sandslash-Alola', 'Dungeon\s Looplet + Vulpix-Alola', 'Dungeon\s Looplet + Ninetales-Alola', 'Dungeon\s Looplet + Swinub', 'Dungeon\s Looplet + Piloswine', 'Dungeon\s Looplet + Froslass', 'Dungeon\s Looplet + Vanillite', 'Dungeon\s Looplet + Vanillish', 'Dungeon\s Looplet + Cetoddle',
			'Dungeon\s Looplet + Wobbuffet', 'Dungeon\s Looplet + Wynaut', 'Dungeon\s Looplet + Gothita', 'Dungeon\s Looplet + Gothorita', 'Dungeon\s Looplet + Gothitelle',
			// will free later on
			'Parallel Mega Orb',
		],
		unbanlist: ['Light of Ruin'],
		teambuilderFormat: 'National Dex',
	};