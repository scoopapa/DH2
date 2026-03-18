import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 9] Bad 'n Boosted",
		desc: `Base stats of 70 and lower get doubled.`,
		mod: 'badnboosted',
		ruleset: ['Standard'],
		banlist: ['AG', 'Moody', 'King\'s Rock', 'Razor Fang', 'Baton Pass', 'Last Respects', 'Eviolite', 'Huge Power', 'Pure Power', 'Espathra', 'Cyclizar', 'Polteageist', 'Shadow Tag', 'Pawmot'],
		onBegin() {
			this.add('-message', "Welcome to Bad 'n Boosted!");
			this.add('-message', "This is a Generation 9 Pet Mod where Pokemon's base stats of 70 or lower get doubled!");
			this.add('-message', `You can join our Discord now:`);
			this.add('-message', `https://discord.gg/vYdSwRreNd`);
		},
	},
	{
		name: "[Gen 9] Doubles Bad 'n Boosted",
		desc: `Base stats of 70 and lower get doubled.`,
		mod: 'badnboosted',
		gameType: 'doubles',
		ruleset: ['Standard Doubles', '!Gravity Sleep Clause'],
	},
	{
		name: "[Gen 9] National Dex Bad 'n Boosted",
		mod: 'badnboosted',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Evasion Items Clause', 'Species Clause', 'Sleep Clause Mod', 'Mega Rayquaza Clause'],
		banlist: ['ND AG', 'Shedinja', 'Assist', 'Baton Pass'],
	},
	{
		name: "[Gen 9] Free-For-All Bad 'n Boosted",
		mod: 'badnboosted',
		gameType: 'freeforall',
		rated: false,
		tournamentShow: false,
		ruleset: ['Standard', 'Sleep Moves Clause', '!Sleep Clause Mod', '!Evasion Items Clause'],
		banlist: ['Moody', 'Shadow Tag', 'Toxic Chain', 'Toxic Debris', 'Aromatic Mist', 'Baton Pass', 'Coaching',
			'Court Change', 'Decorate', 'Dragon Cheer', 'Final Gambit', 'Flatter', 'Fling', 'Floral Healing', 'Follow Me', 'Heal Pulse', 'Heart Swap', 'Last Respects',
			'Malignant Chain', 'Poison Fang', 'Rage Powder', 'Skill Swap', 'Spicy Extract', 'Swagger', 'Toxic', 'Toxic Spikes',
		],
	},
	{
		name: "[Gen 9] Bad 'n Boosted Hackmons Cup",
		desc: `Randomized teams of level-balanced Pok&eacute;mon with absolutely any ability, moves, and item where base stats of 70 and lower get doubled.`,
		mod: 'badnboosted',
		team: 'randomHC',
		ruleset: ['HP Percentage Mod', 'Cancel Mod'],
		banlist: ['CAP', 'LGPE', 'MissingNo.', 'Pikachu-Cosplay', 'Pichu-Spiky-eared', 'Pokestar Smeargle', 'Pokestar UFO', 'Pokestar UFO-2', 'Pokestar Brycen-Man', 'Pokestar MT', 'Pokestar MT2', 'Pokestar Transport', 'Pokestar Giant', 'Pokestar Humanoid', 'Pokestar Monster', 'Pokestar F-00', 'Pokestar F-002', 'Pokestar Spirit', 'Pokestar Black Door', 'Pokestar White Door', 'Pokestar Black Belt', 'Pokestar UFO-PropU2', 'Xerneas-Neutral'],
		unbanlist: ['All Pokemon'],
	}
];