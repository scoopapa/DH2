import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 9] Better Hackmons",
		desc: `Anything directly hackable onto a set (EVs, IVs, forme, ability, item, and move) and is usable in local battles is allowed.`,
		mod: 'gen9',
		ruleset: [
			'OHKO Clause', 'Evasion Clause', 'Species Clause', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Sleep Moves Clause',
			'Endless Battle Clause', 'Hackmons Forme Legality', 'Species Reveal Clause', 'Terastal Clause',
		],
		banlist: [
			'Aerodactyl-Mega', 'Aggron-Mega', 'Ampharos-Mega', 'Arceus', 'Blastoise-Mega', 'Blaziken-Mega', 'Calyrex-Ice', 'Calyrex-Shadow', 'Charizard-Mega-X', 'Charizard-Mega-Y', 'Deoxys-Attack', 'Dialga', 'Diancie-Mega', 'Eternatus', 'Gallade-Mega', 'Garchomp-Mega', 'Gardevoir-Mega', 'Giratina', 'Groudon', 'Gyarados-Mega', 'Ho-Oh', 'Hoopa-Unbound', 'Koraidon', 'Kyogre', 'Kyurem', 'Latias-Mega', 'Latios-Mega', 'Lucario-Mega', 'Lugia', 'Lunala', 'Metagross-Mega', 'Mewtwo', 'Miraidon', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Necrozma-Ultra', 'Palafin-Hero', 'Palkia', 'Rayquaza', 'Regigigas', 'Reshiram', 'Salamence-Mega', 'Sceptile-Mega', 'Shedinja', 'Slaking', 'Solgaleo', 'Steelix-Mega', 'Swampert-Mega', 'Terapagos-Stellar', 'Tyranitar-Mega', 'Venusaur-Mega', 'Wishiwashi-School', 'Xerneas', 'Yveltal', 'Zacian', 'Zamazenta', 'Zekrom', 'Zygarde-Complete',
			'Arena Trap', 'Contrary', 'Gorilla Tactics', 'Hadron Engine', 'Huge Power', 'Illusion', 'Innards Out', 'Libero', 'Liquid Ooze', 'Magnet Pull', 'Moody', 'Neutralizing Gas', 'Orichalcum Pulse', 'Parental Bond', 'Poison Heal', 'Protean', 'Pure Power', 'Shadow Tag', 'Stakeout', 'Water Bubble', 'Wonder Guard',
			'Baton Pass', 'Belly Drum', 'Burning Bulwark', 'Ceaseless Edge', 'Clangorous Soul', 'Dire Claw', 'Electro Shot', 'Fillet Away', 'Imprison', 'Last Respects', 'Lumina Crash', 'No Retreat', 'Photon Geyser', 'Population Bomb', 'Power Trip', 'Quiver Dance', 'Rage Fist', 'Revival Blessing', 'Shed Tail', 'Shell Smash', 'Sleep Talk', 'Substitute', 'Tail Glow', 'Triple Arrows', 'V-Create',
			'King\'s Rock', 'Razor Fang',
		],
	},
];