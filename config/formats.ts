// Note: This is the list of formats
// The rules that formats use are stored in data/rulesets.ts
/*
If you want to add custom formats, create a file in this folder named: "custom-formats.ts"
Paste the following code into the file and add your desired formats and their sections between the brackets:
--------------------------------------------------------------------------------
// Note: This is the list of formats
// The rules that formats use are stored in data/rulesets.ts
export const Formats: FormatList = [
];
--------------------------------------------------------------------------------
If you specify a section that already exists, your format will be added to the bottom of that section.
New sections will be added to the bottom of the specified column.
The column value will be ignored for repeat sections.
*/

export const Formats: FormatList = [
	// Sw/Sh Singles
	///////////////////////////////////////////////////////////////////

	{
		section: "Sw/Sh Singles",
	},
	{
		name: "[Gen 8] OU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3666169/">OU Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3666247/">OU Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3666340/">OU Viability Rankings</a>`,
		],

		mod: 'gen8',
		ruleset: ['Standard', 'Dynamax Clause'],
		banlist: ['Uber', 'Arena Trap', 'Moody', 'Shadow Tag', 'Baton Pass'],
	},
	{
		name: "[Gen 8] Ubers",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3659981/">Ubers Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3658364/">Ubers Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3661412/">Ubers Viability Rankings</a>`,
		],

		mod: 'gen8',
		ruleset: ['Standard', 'Dynamax Ubers Clause'],
		banlist: [],
		restricted: ['Ditto', 'Kyurem-White', 'Lunala', 'Marshadow', 'Mewtwo', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Reshiram', 'Solgaleo', 'Zekrom'],
	},
	{
		name: "[Gen 8] UU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3666248/">UU Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3659681/">UU Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3659427/">UU Viability Rankings</a>`,
		],

		mod: 'gen8',
		ruleset: ['[Gen 8] OU'],
		banlist: ['OU', 'UUBL', 'Drizzle'],
	},
	{
		name: "[Gen 8] RU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3659533/">RU Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3661013/">RU Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3660617/">RU Viability Rankings</a>`,
		],

		mod: 'gen8',
		ruleset: ['[Gen 8] UU'],
		banlist: ['UU', 'RUBL'],
	},
	{
		name: "[Gen 8] NU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3660646/">NU Metagame Discussion</a>`,
		],

		mod: 'gen8',
		ruleset: ['[Gen 8] RU'],
		banlist: ['RU', 'NUBL', 'Drought'],
	},
	{
		name: "[Gen 8] PU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3661966/">PU Metagame Discussion</a>`,
		],

		mod: 'gen8',
		ruleset: ['[Gen 8] NU'],
		banlist: ['NU', 'PUBL', 'Heat Rock'],
	},
	{
		name: "[Gen 8] LC",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3656348/">LC Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3661419/">LC Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3657374/">LC Viability Rankings</a>`,
		],

		mod: 'gen8',
		maxLevel: 5,
		ruleset: ['Little Cup', 'Standard', 'Dynamax Clause'],
		banlist: [
			'Corsola-Galar', 'Cutiefly', 'Drifloon', 'Gastly', 'Gothita', 'Rufflet', 'Scyther', 'Sneasel', 'Swirlix', 'Tangela', 'Vulpix-Alola',
			'Chlorophyll', 'Moody', 'Baton Pass',
		],
	},
	{
		name: "[Gen 8] Monotype",
		desc: `All the Pok&eacute;mon on a team must share a type.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3656253/">Monotype Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3658745/">Monotype Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3660603">Monotype Viability Rankings</a>`,
		],

		mod: 'gen8',
		ruleset: ['Same Type Clause', 'Standard', 'Dynamax Clause'],
		banlist: [
			'Eternatus', 'Kyurem-Black', 'Kyurem-White', 'Lunala', 'Magearna', 'Marshadow', 'Melmetal', 'Mewtwo',
			'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Reshiram', 'Solgaleo', 'Zacian', 'Zamazenta', 'Zekrom',
			'Damp Rock', 'Smooth Rock', 'Moody', 'Shadow Tag', 'Baton Pass',
		],
	},
	{
		name: "[Gen 8] Anything Goes",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3656317/">Anything Goes</a>`,
		],

		mod: 'gen8',
		searchShow: false,
		ruleset: ['Obtainable', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Endless Battle Clause'],
	},
	{
		name: "[Gen 8] ZU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3661968/">ZU Metagame Discussion</a>`,
		],

		mod: 'gen8',
		ruleset: ['[Gen 8] PU'],
		banlist: ['PU', 'Silvally-Electric'],
	},
	{
		name: "[Gen 8] 1v1",
		desc: `Bring three Pok&eacute;mon to Team Preview and choose one to battle.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3656364/">1v1 Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3664157/">1v1 Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3657779/">1v1 Viability Rankings</a>`,
		],

		mod: 'gen8',
		teamLength: {
			validate: [1, 3],
			battle: 1,
		},
		ruleset: ['Obtainable', 'Species Clause', 'Nickname Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Accuracy Moves Clause', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Dynamax Clause', 'Endless Battle Clause'],
		banlist: [
			'Cinderace', 'Eternatus', 'Jirachi', 'Kyurem-Black', 'Kyurem-White', 'Lunala', 'Magearna', 'Marshadow', 'Melmetal', 'Mew', 'Mewtwo',
			'Mimikyu', 'Necrozma', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Reshiram', 'Sableye', 'Solgaleo', 'Zacian', 'Zamazenta', 'Zekrom',
			'Focus Sash', 'Moody', 'Perish Song',
		],
	},
	{
		name: "[Gen 8] CAP",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3656824/">CAP Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3662655/">CAP Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3658514/">CAP Viability Rankings</a>`,
		],

		mod: 'gen8',
		ruleset: ['[Gen 8] OU', '+CAP'],
		banlist: ['Clefable', 'Crucibelle-Mega'],
	},
	{
		name: "[Gen 8] Battle Stadium Singles",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3656336/">BSS Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3658806/">BSS Viability Rankings</a>`,
		],

		mod: 'gen8',
		forcedLevel: 50,
		teamLength: {
			validate: [3, 6],
			battle: 3,
		},
		ruleset: ['Standard GBU'],
		minSourceGen: 8,
	},
	{
		name: "[Gen 8] Custom Game",

		mod: 'gen8',
		searchShow: false,
		debug: true,
		maxLevel: 9999,
		battle: {trunc: Math.trunc},
		defaultLevel: 100,
		teamLength: {
			validate: [1, 24],
			battle: 24,
		},
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod'],
	},

	// Sw/Sh Doubles
	///////////////////////////////////////////////////////////////////

	{
		section: "Sw/Sh Doubles",
	},
	{
		name: "[Gen 8] Doubles OU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3661422/">Doubles OU Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3658826/">Doubles OU Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3658242/">Doubles OU Viability Rankings</a>`,
		],

		mod: 'gen8',
		gameType: 'doubles',
		ruleset: ['Standard Doubles', 'Dynamax Clause'],
		banlist: ['DUber', 'Beat Up'],
	},
	{
		name: "[Gen 8] Doubles Ubers",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3661142/">Doubles Ubers Metagame Discussion</a>`,
		],

		mod: 'gen8',
		gameType: 'doubles',
		ruleset: ['Standard Doubles', '!Gravity Sleep Clause'],
		banlist: [],
	},
	{
		name: "[Gen 8] Doubles UU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3658504/">Doubles UU Metagame Discussion</a>`,
		],

		mod: 'gen8',
		gameType: 'doubles',
		ruleset: ['[Gen 8] Doubles OU'],
		banlist: ['DOU', 'DBL'],
	},
	{
		name: "[Gen 8] VGC 2020",
		threads: [
			`&bullet; <a href="https://www.pokemon.com/us/pokemon-news/2020-pokemon-video-game-championships-vgc-format-rules/">VGC 2020 Rules</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3657818/">VGC 2020 Sample Teams</a>`,
		],

		mod: 'gen8',
		gameType: 'doubles',
		forcedLevel: 50,
		teamLength: {
			validate: [4, 6],
			battle: 4,
		},
		ruleset: ['Standard GBU', 'VGC Timer'],
		minSourceGen: 8,
	},
	{
		name: '[Gen 8] Metronome Battle',
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3632075/">Metronome Battle</a>`,
		],

		mod: 'gen8',
		gameType: 'doubles',
		// rated: false,
		teamLength: {
			validate: [2, 2],
			battle: 2,
		},
		ruleset: ['HP Percentage Mod', 'Cancel Mod'],
		banlist: [
			'Pokestar Spirit', 'Battle Bond', 'Cheek Pouch', 'Cursed Body', 'Desolate Land', 'Dry Skin', 'Fluffy', 'Fur Coat', 'Gorilla Tactics',
			'Grassy Surge', 'Huge Power', 'Ice Body', 'Iron Barbs', 'Libero', 'Moody', 'Parental Bond', 'Perish Body', 'Poison Heal', 'Power Construct',
			'Pressure', 'Primordial Sea', 'Protean', 'Pure Power', 'Rain Dish', 'Rough Skin', 'Sand Spit', 'Sand Stream', 'Snow Warning', 'Stamina',
			'Volt Absorb', 'Water Absorb', 'Wonder Guard', 'Abomasite', 'Aguav Berry', 'Assault Vest', 'Berry', 'Berry Juice', 'Berserk Gene',
			'Black Sludge', 'Enigma Berry', 'Figy Berry', 'Gold Berry', 'Iapapa Berry', 'Kangaskhanite', 'Leftovers', 'Mago Berry', 'Medichamite',
			'Oran Berry', 'Rocky Helmet', 'Shell Bell', 'Sitrus Berry', 'Wiki Berry', 'Shedinja + Sturdy', 'Harvest + Jaboca Berry', 'Harvest + Rowap Berry',
		],
		onValidateSet(set) {
			const species = this.dex.getSpecies(set.species);
			if (species.types.includes('Steel')) {
				return [`${species.name} is a Steel-type, which is banned from Metronome Battle.`];
			}
			let bst = 0;
			let stat: StatName;
			for (stat in species.baseStats) {
				bst += species.baseStats[stat];
			}
			if (bst > 625) {
				return [`${species.name} is banned.`, `(Pok\u00e9mon with a BST higher than 625 are banned)`];
			}
			const item = this.dex.getItem(set.item);
			if (set.item && item.megaStone) {
				let bstMega = 0;
				const megaSpecies = this.dex.getSpecies(item.megaStone);
				let megaStat: StatName;
				for (megaStat in megaSpecies.baseStats) {
					bstMega += megaSpecies.baseStats[megaStat];
				}
				if (species.baseSpecies === item.megaEvolves && bstMega > 625) {
					return [
						`${set.name || set.species}'s item ${item.name} is banned.`, `(Pok\u00e9mon with a BST higher than 625 are banned)`,
					];
				}
			}
			if (set.moves.length !== 1 || this.dex.getMove(set.moves[0]).id !== 'metronome') {
				return [`${set.name || set.species} has illegal moves.`, `(Pok\u00e9mon can only have one Metronome in their moveset)`];
			}
		},
	},
	{
		name: "[Gen 8] Doubles Custom Game",

		mod: 'gen8',
		gameType: 'doubles',
		searchShow: false,
		maxLevel: 9999,
		battle: {trunc: Math.trunc},
		defaultLevel: 100,
		debug: true,
		teamLength: {
			validate: [2, 24],
			battle: 24,
		},
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod'],
	},

	// National Dex
	///////////////////////////////////////////////////////////////////

	{
		section: "National Dex",
	},
	{
		name: "[Gen 8] National Dex",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3656899/">National Dex Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3658849/">National Dex Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3659038/">National Dex Viability Rankings</a>`,
		],

		mod: 'gen8',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod'],
		banlist: [
			'Alakazam-Mega', 'Arceus', 'Blastoise-Mega', 'Blaziken', 'Darkrai', 'Deoxys-Attack', 'Deoxys-Base', 'Deoxys-Speed',
			'Dialga', 'Eternatus', 'Genesect', 'Gengar-Mega', 'Giratina', 'Groudon', 'Ho-Oh', 'Kangaskhan-Mega', 'Kyogre',
			'Kyurem', 'Landorus-Base', 'Lucario-Mega', 'Lugia', 'Lunala', 'Marshadow', 'Mewtwo',
			'Naganadel', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Palkia', 'Pheromosa', 'Rayquaza', 'Reshiram',
			'Salamence-Mega', 'Shaymin-Sky', 'Solgaleo', 'Xerneas', 'Yveltal', 'Zacian', 'Zamazenta', 'Zekrom', 'Zygarde-Base',
			'Arena Trap', 'Moody', 'Power Construct', 'Shadow Tag', 'Baton Pass',
		],
	},
	{
		name: "[Gen 8] National Dex UU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3660920/">National Dex UU</a>`,
		],

		mod: 'gen8',
		searchShow: false,
		ruleset: ['[Gen 8] National Dex'],
		banlist: [
			// National Dex OU
			'Blacephalon', 'Chansey', 'Clefable', 'Corviknight', 'Darmanitan-Galar', 'Dracovish', 'Dragapult', 'Excadrill', 'Ferrothorn', 'Garchomp',
			'Garchomp-Mega', 'Gliscor', 'Greninja', 'Greninja-Ash', 'Heatran', 'Kartana', 'Kommo-o', 'Landorus-Therian', 'Lopunny-Mega', 'Magearna',
			'Magnezone', 'Melmetal', 'Metagross-Mega', 'Pelipper', 'Rotom-Heat', 'Scizor-Mega', 'Serperior', 'Slowbro', 'Slowbro-Mega', 'Slowbro-Galar',
			'Swampert-Mega', 'Tangrowth', 'Tapu Fini', 'Tapu Koko', 'Tapu Lele', 'Tornadus-Therian', 'Toxapex', 'Urshifu', 'Urshifu-Rapid-Strike',
			'Volcarona', 'Zapdos',
			'nduubl', // National Dex UUBL
			'Aegislash', 'Alakazam', 'Azumarill', 'Charizard-Mega-X', 'Charizard-Mega-Y', 'Cinderace', 'Deoxys-Defense', 'Dragonite', 'Gallade-Mega',
			'Grimmsnarl', 'Hawlucha', 'Heracross-Mega', 'Hoopa-Unbound', 'Hydreigon', 'Latias-Mega', 'Latios', 'Latios-Mega', 'Manaphy', 'Mawile-Mega',
			'Medicham-Mega', 'Mew', 'Pinsir-Mega', 'Scolipede', 'Staraptor', 'Thundurus', 'Thundurus-Therian', 'Victini', 'Drizzle', 'Drought', 'Aurora Veil',
		],
	},
	{
		name: "[Gen 8] National Dex AG",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3656779/">AG Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3659562/">AG Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3658581/">AG Viability Rankings</a>`,
		],

		mod: 'gen8',
		ruleset: ['Standard NatDex'],
	},
	{
		name: "[Gen 8] Littlest Cup",
		desc: [
			"<b>Littlest Cup</b>: A National Dex metagame where only Baby Pokemon are allowed."
		],
		threads: [
			`&bullet; <a href="https://pastebin.com/PtqmRUhG">Littlest Cup VR and Sample Sets</a>`,
		],
		mod: 'littleestcup',
		maxLevel: 1,
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod'],
		banlist: ['All Pokemon'],
		unbanlist: ['Shadow Tag', 'Pichu', 'Cleffa', 'Igglybuff', 'Togepi', 'Tyrogue', 'Smoochum', 'Elekid', 'Magby', 'Azurill', 'Wynaut', 'Budew', 'Chingling', 'Bonsly', 'Mime Jr.', 'Happiny', 'Munchlax', 'Riolu', 'Mantyke', 'Toxel'],
	},
		// Smogon Pet Mods ///////////////////////////////////////////////////////////////////
	{
		section: "Smogon Pet Mods",
		column: 2,
	},
	{
		name: "[Gen 8] AbNormal",
		desc: [
			"<b>AbNormal</b>: This Pet Mod aims to replace the Normal type completely, changing the type of every Normal-type Pokemon or move to something else."
		],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/gen-8-abnormal-v3.3656684/">AbNormal v3 on Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1p7Ws085V5KK_CX_3xt3DtvDy2w8SYdnCE199Bqtrwgc/edit?usp=sharing">Spreadsheet</a>`
		],

		mod: 'abnormal',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod'],
		banlist: [
			'Arceus', 'Blaziken', 'Darkrai', 'Deoxys-Attack', 'Deoxys-Base', 'Deoxys-Speed', 'Dialga', 'Eternatus', 'Genesect', 'Gengar-Mega',
			'Giratina', 'Groudon', 'Ho-Oh', 'Kangaskhan-Mega', 'Kyogre', 'Kyurem-Black', 'Kyurem-White', 'Landorus-Base', 'Lucario-Mega',
			'Lugia', 'Lunala', 'Marshadow', 'Mewtwo', 'Naganadel', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Palkia', 'Pheromosa',
			'Rayquaza', 'Reshiram', 'Salamence-Mega', 'Shaymin-Sky', 'Solgaleo', 'Xerneas', 'Yveltal', 'Zacian', 'Zamazenta', 'Zekrom',
			'Arena Trap', 'Moody', 'Power Construct', 'Shadow Tag', 'Baton Pass',
		],
	},
	{
		name: "[Gen 8] Alternatium",
		desc: `<b>Restrictions</b>: A metagame made up of only Pokemon with alternate forms exist, with all of them being seperate and unique Pokemon.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/alternatium-slate-7-slow-twins-slate-also-vote-in-poll.3683767/">Alternatium on Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1bvvkPg1CrUBJFJJeuwkts8elfJcEcahGOoHm-vGBXOI/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: 'alternatium',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Data Mod'],
		banlist: ['All Pokemon'],
		unbanlist: [
					'Silvally', 'Silvally-Bug', 'Silvally-Dark', 'Silvally-Dragon', 'Silvally-Electric', 'Silvally-Fairy', 'Silvally-Fighting', 'Silvally-Fire', 'Silvally-Flying', 'Silvally-Ghost', 
					'Silvally-Grass', 'Silvally-Ground', 'Silvally-Ice', 'Silvally-Poison', 'Silvally-Psychic', 'Silvally-Rock', 'Silvally-Steel', 'Silvally-Water', 'Pikachu', 'Pikachu-Rock-Star', 
					'Pikachu-Belle', 'Pikachu-Idol', 'Pikachu-PhD', 'Pikachu-Libre', 'Pikachu-Partner', 'Pikachu-Starter', 'Darmanitan', 'Darmanitan-Zen', 'Darmanitan-Galar', 'Darmanitan-Galar-Zen', 
					'Aegishield', 'Aegislash', 'Zacian', 'Zacian-Crowned', 'Zamazenta', 'Zamazenta-Crowned', 'Rotom', 'Rotom-Heat', 'Rotom-Wash', 'Rotom-Frost', 'Rotom-Fan', 'Rotom-Mow', 'Dugtrio', 
					'Dugtrio-Alola', 'Muk', 'Muk-Oilslick', 'Slowbro', 'Slowbro-Galar', 'Slowking', 'Slowking-Galar', 'Tornadus', 'Cummulus', 'Thundurus', 'Thundurus-Therian', 'Landorus', 'Landorus-Bengal', 
					'Vivillon-Fancy', 'Vivillon-Spirit', 'Vivillon-Combat', 'Genesect', 'Genesect-Password', 'Genesect-Molten', 'Genesect-Freezer', 'Genesect-Type-Delta', 'Groudon', 'Groudon-Primal', 'Kyogre', 
					'Kyogre-Primal', 'Deoxys-Wood', 'Deoxys-Gem', 'Deoxys-Tank', 'Deoxys-Speed', 'Sandslash-Lustrous', 'Sandslash-Alola', 'Ninetales-Steamwork', 'Ninetales-Alola', 'Giratina', 'Giratina-Shadow', 
					'Eternatus', 'Manustorm', 'Exeggutor', 'Exeggutor-Lighthouse', 'Weezing', 'Weezing-King', 'Raticate', 'Raticate-Alola', 'Linoone', 'Linoone-Punk', 'Catastroform', 'Castform-Firestorm', 
					'Castform-Thunderstorm', 'Castform-Snowy', 'Wormadam', 'Wormadam-Sandy', 'Fibormadam', 'Farfetch\u2019d', 'Farfetch\u2019d-Galar', 'Corsola', 'Corsoul', 'Shaymin', 'Shaymin-Sky', 'Keldeo', 
					'Swordeo', 'Meloetta', 'Meloetta-Fighter', 'Lycanday', 'Lycanroc-Spectre', 'Lycanroc-Dusk', 'Gourgeist', 'Gourgeist-Fae', 'Gourgeist-Pulpy', 'Supergeist', 'Cramorant', 'Cramorant-Swimmer', 
					'Cramorant-Gorging', 'Eiscue', 'Eiscue-Noice', 'Mimikyu', 'Mimikyu-Sparkstone', 'Morpeko-Marsh', 'Morvilant', 'Zygarde-Wyrm', 'Zygarde-Canid', 'Zygarde-Goliath',
		],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			for (const set of team) {
				let template = this.dex.getSpecies(set.species);
				if (speciesTable[template.id]) {
					return ["You are limited to one of each Pokémon by Species Clause (except for different formes). ", "You have more than one " + template.id + "."];
				}
				speciesTable[template.id] = true;
			}
		},
	},
	{
		name: "[Gen 8] Blindsided",
		mod: "blindsided",
		desc: [
			`<b>Blindsided</b>: A Pet Mod where users submit Fakemon without knowing the ones other people made.`
		],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/blindsided-slate-1-discussion-and-playtesting.3690242/">Blindsided on Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1VQ2G1bbR3yDVbmmPJAQ7BAqBtGPlmP9u8q3F8Zx26X4">Spreadsheet</a>`,
		],
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Z-Move Clause', 'Data Mod', 'Mega Data Mod'],
		banlist: [
			'All Pokemon','Baton Pass',
		],
		unbanlist: [
			'Asubakraken', 'Barad-Jur', 'Batana', 'Boreastra', 'Burrodon', 'Cachanaut', 'Casko', 'Dolphena', 'Dolphure', 'Drasapor', 'Elbalfatross',
			'Faerosion', 'Firenra', 'Frozalisk', 'Gammaroo', 'Gloriode', 'Headrake', 'idk', 'Lunoccyx', 'Minocharge', 'Neuroboxin', 'Nixlean',
			'Niyang', 'Ruinastle', 'Parakinesis', 'Poultergeist', 'Puremaid', 'Rosereve', 'Salava', 'Saltidan', 'Scorpiost', 'Spexel', 'Tactaval',
			'Wendigoul', 'Vesuvenge', 'Vipier', 'Zawa'
		],
	},
	{
		name: "[Gen 8] Branched Potential",
		desc: [
			"<b>Branched Potential</b>: A mod that designs new branched evolutions (i.e., Slowpoke being able to evolve into either Slowbro or Slowking) for Pokemon that don't already have them.",
			],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/branched-potential-v2-aircraft-slate-yanmega-magnezone-dragapult.3688252/">Branched Potential on Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/135ZGOSBMqzI9Ff-iVhtQzAwy80nORF2Qrv8iJU583NE/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: 'branchedpotential',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Data Mod', 'Mega Data Mod'],
		banlist: [
			'Alakazam-Mega', 'Arceus', 'Blastoise-Mega', 'Blaziken-Mega', 'Calyrex-Ice', 'Calyrex-Shadow', 'Cinderace', 'Darkrai', 'Darmanitan-Galar',
         'Deoxys-Attack', 'Deoxys-Base', 'Deoxys-Speed', 'Dialga', 'Dracovish', 'Dragapult', 'Eternatus', 'Genesect', 'Gengar-Mega', 'Giratina',
         'Giratina-Origin', 'Groudon', 'Ho-Oh', 'Kangaskhan-Mega', 'Kyogre', 'Kyurem-Black', 'Kyurem-White', 'Landorus-Base', 'Lucario-Mega',
         'Lugia', 'Lunala', 'Magearna', 'Marshadow', 'Metagross-Mega', 'Mewtwo', 'Naganadel', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane',
         'Necrozma-Ultra', 'Palkia', 'Pheromosa', 'Rayquaza', 'Reshiram', 'Salamence-Mega', 'Shaymin-Sky', 'Solgaleo', 'Spectrier', 'Tornadus-Therian',
         'Urshifu-Base', 'Xerneas', 'Yveltal', 'Zacian', 'Zacian-Crowned', 'Zamazenta', 'Zamazenta-Crowned', 'Zekrom', 'Zygarde-Base', 'Zygarde-Complete',
         'Arena Trap', 'Moody', 'Power Construct', 'Shadow Tag', 'Baton Pass', 
			'Alakazite', 'Blastoisinite', 'Blazikenite', 'Gengarite', 'Kangaskhanite', 'Lucarionite', 'Metagrossite', 'Salamencite',
		],
	},
	{
		name: "[Gen 8] Break This Team",
		desc: [
			"<b>Break This Team</b>: In this mod, a team will be posted and people can submit two-Fakemon cores that can beat the entire team.",
		],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/break-this-team-the-pet-mod-slate-9-btt-ou-ou-playable-on-dh.3674601/">Break This Team: The Pet Mod on Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1tAb8Gq-uvQ0_fx2KLleOC_hhH2PoDU_tDv_Zc8jH3EI/edit#gid=0">Spreadsheet</a>`,
		],
		ruleset: ['Standard', 'Dynamax Clause', 'Data Mod'],
		banlist: ['Uber', 'Arena Trap', 'Moody', 'Shadow Tag', 'Baton Pass'],
		mod: "breakthisteam", 
		teambuilderFormat: "OU", 	
	},
	{
  		name: "[Gen 8] Breeding Variants",
  		desc: ["<b>Breeding Variants</b>: Have you seen those cool fanart posts where someone makes drawings of a Pokemon and what they would look like if their offspring took traits from their breeding partner? This Pet Mod takes this concept and puts it into a playable form.",
		      ],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/breeding-variants-v2.3658458/">Breeding Variants V3 on Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1EElnaRtulywum6cNWS2nzPTwtzMQHvFDNN3uNNWOnHE/edit#gid=1305095826">Spreadsheet</a>`,
		],
  		ruleset: [ 'Standard', 'Data Mod'],
		mod: 'breedingvariants',
  	},
	{
		name: "[Gen 8] Bust A Move",
    desc: [
		"<b>Bust A Move</b>: A Pet Mod where previously competitively useless moves are given much needed makeovers.",
      ],
    threads: [
      `&bullet; <a href="https://www.smogon.com/forums/threads/bust-a-move-slate-5-sing-synchronoise-and-sparkling-aria.3681338/">Bust A Move on Smogon Forums</a>`,
      `&bullet; <a href="https://docs.google.com/spreadsheets/d/149hYZMn1N92ofxiBdJEQ78g1EaQdBmex2wHCK3Fyais/edit?usp=sharing">Spreadsheet</a>`,
      ],
		mod: 'bustamove',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod'],
		banlist: [
			'Alakazam-Mega', 'Arceus', 'Blastoise-Mega', 'Blaziken', 'Calyrex-Ice', 'Calyrex-Shadow', 'Cinderace', 'Darkrai', 'Darmanitan-Galar', 'Deoxys-Attack', 'Deoxys-Base', 'Deoxys-Speed', 
			'Dialga', 'Dracovish', 'Dragapult', 'Eternatus', 'Genesect', 'Gengar-Mega', 'Giratina', 'Groudon', 'Ho-Oh', 'Kangaskhan-Mega', 'Kyogre', 'Kyurem-Black', 'Kyurem-White', 'Landorus-Base', 
			'Lucario-Mega', 'Lugia', 'Lunala', 'Marshadow', 'Magearna', 'Metagross-Mega', 'Mewtwo', 'Naganadel', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Palkia', 'Pheromosa', 'Rayquaza', 'Reshiram', 
			'Salamence-Mega', 'Shaymin-Sky', 'Solgaleo', 'Spectrier', 'Tornadus-Therian', 'Urshifu-Base', 'Xerneas', 'Yveltal', 'Zacian', 'Zamazenta', 'Zekrom', 'Zygarde-Base',
			'Arena Trap', 'Moody', 'Power Construct', 'Shadow Tag', 'Baton Pass',
		],
		teambuilderFormat: "OU",
	},
	{
		name: "[Gen 8] CCAPM 2020",
		desc: `<b>Community Create-a-Pet Mod 2020</b>: an "Almost Any Ability Clean Slate", where a selection of Pokemon can use any of the new custom abilities.`,
		threads: [
		],
		mod: 'ccapm2020',
		ruleset: ['Obtainable', '!Obtainable Abilities', 'Species Clause', 'Nickname Clause', 'Ability Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Dynamax Clause', 'Sleep Clause Mod', 'Endless Battle Clause'],
		banlist: ['All Pokemon', 'All Abilities', 'Baton Pass'],
		unbanlist: ['porygon2', 'jellicent', 'crabominable', 'oricoriosensu', 'wigglytuff', 'wormadamtrash', 'heatmor', 'beheeyem', 'golbat', 'eelektross', 'togedemaru', 'garchomp', 'whimsicott', 'skuntank', 'lycanrocdusk', 'frosmoth', 'dragonair', 'reshiram', 'aegislash', 'camerupt', 'explosion', 'chesnaught', 'empoleon', 'delibird', 'adaptive', 'elemental', 'contradict', 'countershield', 'embargoact', 'exhaust', 'forager', 'identitytheft', 'inextremis', 'lagbehind', 'prepared', 'survey', 'terror', 'triggerfinger', 'unflagging'],
	},
	{
		name: "[Gen 8] CCAPM 2021",
		desc: `<b>Community Create-a-Pet Mod 2021</b>: Redoing Typing: The Mod, where 2 new types were created alongside numerous moves, items, and abilities.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/community-create-a-pet-mod-2021.3693263/">CCAPM 2021 on Smogon Forums</a>`,
      `&bullet; <a href="https://docs.google.com/spreadsheets/d/1YfSmgK0CSPYT5FiRdJR1vFGLvxoQCRKjJbmejL1niQw/edit?usp=sharing>Spreadsheet</a>`,
		],
		mod: 'ccapm2021',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Data Mod', 'Mega Data Mod'],
		banlist: [
			'Alakazam-Mega', 'Arceus', 'Blastoise-Mega', 'Blaziken', 'Darkrai', 'Deoxys-Attack', 'Deoxys-Base', 'Deoxys-Speed',
			'Dialga', 'Eternatus', 'Genesect', 'Gengar-Mega', 'Giratina', 'Groudon', 'Ho-Oh', 'Kangaskhan-Mega', 'Kyogre',
			'Kyurem-Black', 'Kyurem-White', 'Landorus-Base', 'Lucario-Mega', 'Lugia', 'Lunala', 'Marshadow', 'Mewtwo',
			'Naganadel', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Palkia', 'Pheromosa', 'Rayquaza', 'Reshiram',
			'Salamence-Mega', 'Shaymin-Sky', 'Solgaleo', 'Xerneas', 'Yveltal', 'Zacian', 'Zamazenta', 'Zekrom', 'Zygarde-Base',
			'Arena Trap', 'Moody', 'Power Construct', 'Shadow Tag', 'Baton Pass', 'Calyrex-Ice', 'Calyrex-Shadow', 'Cinderace', 'Dracovish', 'Dragapult', 'Spectrier', 
		],
	},
	{
		name: "[Gen 8] Clean Slate 2",
		desc: `Ubers clean slate. Ubers clean slate.`,
		threads: [
			`<a href="https://www.smogon.com/forums/threads/clean-slate-2.3657640/">Clean Slate 2</a>`,
		],
		mod: 'cleanslate2',
		banlist: ['Vivillon-Fancy', 'Vivillon-Pokeball',],
		teambuilderBans: ['Unown',],
		ruleset: ['Standard', 'Dynamax Clause'],
		onSwitchIn(pokemon) {
			this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[silent]');
		},
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			for (const set of team) {
				let template = this.dex.getSpecies(set.species);
				if (template.tier !== 'CS2') {
					return [set.species + ' is not useable in Clean Slate 2.'];
				}
			}
		},
		onModifySpecies(species, target, source, effect) {
			if (this.unownStats) {
				let stats = this.unownStats[ species.id ];
				if (stats) {
					return Object.assign({}, species, 
						{baseStats: stats.baseStats},
						{abilities: stats.abilities},
						{types: stats.types},
					);
				}
			}
		},
		onChangeSet(set) {
			if (set.species === 'Snorlax-Gmax') {
				set.species = 'Snorlax';
			}
		},
	},
	{
		name: "[Gen 8] Crossover Chaos v2",
		desc: ["<b>Crossover Chaos</b> aims to turn characters from other franchises into Pokemon. Many other franchises such as Soul Calibur, Mario Kart, Sonic the Hedgehog, and of course Super Smash Brothers have had cameos from other franchises to either promote a series or create a crossover title.",],
		threads: [`&bullet; <a href="https://www.smogon.com/forums/threads/crossover-chaos-v2.3636780/">Crossover Chaos v2 on Smogon Forums</a>`,],
		ruleset: [ 'Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 
					'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview', 
					'Swagger Clause', 'Baton Pass Clause', 'Obtainable', 'Standard NatDex', 'Dynamax Clause'],
		banlist: ['Uber'],
		teambuilderBans: ['EX'],
		mod: 'crossoverchaos',
		teambuilderFormat: 'OU',
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			for (const set of team) {
				let template = this.dex.getSpecies(set.species);
				if ( template.tier === 'V1' || template.tier === 'EX' ) {
					return ["You are not allowed to use pokemon from " + template.tier + ". ( " + template.species + " )"];
				}
			}
		},
	},
	{
		name: "[Gen 8] Crossover Chaos Expanded",
		desc: ["<b>Crossover Chaos Expanded</b>: Crossover Chaos, but for non-video game characters."],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3647108/">Crossover Chaos Expanded on Smogon Forums</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/crossover-chaos-expanded-part-ii.3657518/">Crossover Chaos Expanded - Part II on Smogon Forums</a>`,
		      ],
		ruleset: [ 'Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 
					'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview', 
					'Swagger Clause', 'Baton Pass Clause', 'Obtainable', 'Standard NatDex', 'Dynamax Clause'],
		banlist: ['Uber'],
		teambuilderBans: ['V2'],
		mod: 'crossoverchaos',
		teambuilderFormat: 'OU',
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			for (const set of team) {
				let template = this.dex.getSpecies(set.species);
				if ( template.tier === 'V1' || template.tier === 'V2' ) {
					return ["You are not allowed to use pokemon from " + template.tier + ". ( " + template.species + " )"];
				}
			}
		},
	},
	{
		name: "[Gen 2] Crystal: Sevii Islands",
		desc: ["<b>Crystal: Sevii Islands</b>- A Gen 2 pet mod that aims to create new Pokemon, items, and moves for the GSC OU Metagame."],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/crystal-sevii-islands.3695569/">Crystal: Sevii Islands on Smogon Forums</a>`,
		      ],
		mod: 'gen2crystalseviiislands',
		ruleset: ['Standard', 'Data Mod'],
		banlist: ['Uber'],
	},
	{
		name: "[Gen 7] DLCmons",
		desc: [
			"<b>[Gen 7] DLCmons</b>: This Pet Mod aims to add an aditional (set of) island(s) to the Alola region. This will include new abilities, moves, items, regional variants and new Pokemon.",
		],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/dlcmons-ultra-ultra-beast-movepool-and-design-slate.3673357/">DLCmons on Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/e/2PACX-1vQLdCoZ4q0Oar_bxPFrv-tEg3OSWpgqjPkq_1KOnXFfg69navnSjsTOiRKn-MpqtawS3nvnFs0xRdEy/pubhtml">Spreadsheet</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/dlcmons-ultra-metagame-discussion.3673357/post-8711996">Metagame Resources</a>`,
		],
		ruleset: ['Standard', 'Dynamax Clause', 'Data Mod', 'Mega Data Mod'],
		banlist: [
			'All Pokemon', 'Uber', 'Arena Trap', 'Power Construct', 'Shadow Tag', 'Baton Pass', 'Gengarite', 'Kangaskhanite', 'Lucarionite', 'Metagrossite', 'Salamencite'
		],
		unbanlist: [
			'Rowlet', 'Dartrix', 'Decidueye', 'Litten', 'Torracat', 'Incineroar', 'Popplio', 'Brionne', 'Primarina', 'Pikipek', 'Trumbeak', 'Toucannon', 'Yungoos', 'Gumshoos',
			'Rattata', 'Raticate', 'Caterpie', 'Metapod', 'Butterfree', 'Ledyba', 'Ledian', 'Spinarak', 'Ariados', 'Buneary', 'Lopunny', 'Inkay', 'Malamar', 'Zorua', 'Zoroark',
			'Furfrou', 'Pichu', 'Pikachu', 'Raichu', 'Grubbin', 'Charjabug', 'Vikavolt', 'Bonsly', 'Sudowoodo', 'Happiny', 'Chansey', 'Blissey', 'Munchlax', 'Snorlax',
			'Slowpoke', 'Slowbro', 'Slowking', 'Wingull', 'Pelipper', 'Abra', 'Kadabra', 'Alakazam', 'Meowth', 'Persian', 'Magnemite', 'Magneton', 'Magnezone', 'Grimer', 'Muk',
			'Mime Jr.', 'Mr. Mime', 'Ekans', 'Arbok', 'Dunsparce', 'Growlithe', 'Arcanine', 'Drowzee', 'Hypno', 'Makuhita', 'Hariyama', 'Smeargle', 'Crabrawler', 'Crabominable',
			'Gastly', 'Haunter', 'Gengar', 'Drifloon', 'Drifblim', 'Murkrow', 'Honchkrow', 'Zubat', 'Golbat', 'Crobat', 'Noibat', 'Noivern', 'Diglett', 'Dugtrio', 'Spearow',
			'Fearow', 'Rufflet', 'Braviary', 'Vullaby', 'Mandibuzz', 'Mankey', 'Primeape', 'Delibird', 'Hawlucha', 'Oricorio', 'Cutiefly',
			'Ribombee', 'Flabébé', 'Floette', 'Florges', 'Petilil', 'Lilligant', 'Cottonee', 'Whimsicott', 'Psyduck', 'Golduck', 'Smoochum', 'Jynx', 'Magikarp', 'Gyarados',
			'Barboach', 'Whiscash', 'Seel', 'Dewgong', 'Machop', 'Machoke', 'Machamp', 'Roggenrola', 'Boldore', 'Gigalith', 'Carbink', 'Sableye', 'Mawile', 'Rockruff',
			'Lycanroc', 'Spinda', 'Tentacool', 'Tentacruel', 'Finneon', 'Lumineon', 'Wishiwashi', 'Luvdisc', 'Corsola', 'Mareanie', 'Toxapex', 'Shellder', 'Cloyster', 'Clamperl',
			'Huntail', 'Gorebyss', 'Remoraid', 'Octillery', 'Mantyke', 'Mantine', 'Bagon', 'Shelgon', 'Salamence', 'Lillipup', 'Herdier', 'Stoutland', 'Eevee', 'Vaporeon',
			'Jolteon', 'Flareon', 'Espeon', 'Umbreon', 'Leafeon', 'Glaceon', 'Sylveon', 'Mareep', 'Flaaffy', 'Ampharos', 'Mudbray', 'Mudsdale', 'Igglybuff', 'Jigglypuff',
			'Wigglytuff', 'Tauros', 'Miltank', 'Surskit', 'Masquerain', 'Dewpider', 'Araquanid', 'Fomantis', 'Lurantis', 'Morelull', 'Shiinotic', 'Paras', 'Parasect', 'Poliwag',
			'Poliwhirl', 'Poliwrath', 'Politoed', 'Goldeen', 'Seaking', 'Basculin', 'Feebas', 'Milotic', 'Alomomola', 'Fletchling', 'Fletchinder', 'Talonflame', 'Salandit',
			'Salazzle', 'Cubone', 'Marowak', 'Kangaskhan', 'Magby', 'Magmar', 'Magmortar', 'Larvesta', 'Volcarona', 'Stufful', 'Bewear', 'Bounsweet', 'Steenee', 'Tsareena',
			'Comfey', 'Pinsir', 'Hoothoot', 'Noctowl', 'Kecleon', 'Oranguru', 'Passimian', 'Goomy', 'Sliggoo', 'Goodra', 'Castform', 'Wimpod', 'Golisopod', 'Staryu', 'Starmie',
			'Sandygast', 'Palossand', 'Omanyte', 'Omastar', 'Kabuto', 'Kabutops', 'Lileep', 'Cradily', 'Anorith', 'Armaldo', 'Cranidos', 'Rampardos', 'Shieldon', 'Bastiodon',
			'Archen', 'Archeops', 'Tirtouga', 'Carracosta', 'Tyrunt', 'Tyrantrum', 'Amaura', 'Aurorus', 'Larvitar', 'Pupitar', 'Tyranitar', 'Phantump', 'Trevenant', 'Natu',
			'Xatu', 'Nosepass', 'Probopass', 'Pyukumuku', 'Chinchou', 'Lanturn', 'Type: Null', 'Silvally', 'Silvally-Bug', 'Silvally-Dark',	'Silvally-Dragon', 'Silvally-Electric', 
			'Silvally-Fairy', 'Silvally-Fighting', 'Silvally-Fire', 'Silvally-Flying', 'Silvally-Ghost', 'Silvally-Grass', 'Silvally-Ground', 'Silvally-Ice', 'Silvally-Poison', 
			'Silvally-Psychic', 'Silvally-Rock', 'Silvally-Steel', 'Silvally-Water', 'Poipole', 'Zygarde-10', 'Trubbish', 'Garbodor', 'Minccino', 'Cinccino', 'Pineco', 'Forretress', 
			'Skarmory', 'Ditto', 'Cleffa', 'Clefairy', 'Clefable', 'Elgyem', 'Beheeyem', 'Minior', 'Beldum', 'Metang', 'Metagross', 'Porygon', 'Porygon2', 'Porygon-Z', 'Pancham', 
			'Pangoro', 'Komala', 'Torkoal', 'Turtonator', 'Houndour', 'Houndoom', 'Dedenne', 'Togedemaru', 'Electrike', 'Manectric', 'Elekid', 'Electabuzz', 'Electivire', 'Geodude', 
			'Graveler', 'Golem', 'Sandile', 'Krokorok', 'Krookodile', 'Trapinch', 'Vibrava', 'Flygon', 'Gible', 'Gabite', 'Garchomp', 'Baltoy', 'Claydol', 'Golett', 'Golurk', 'Klefki', 
			'Mimikyu', 'Shuppet', 'Banette', 'Frillish', 'Jellicent', 'Bruxish', 'Drampa', 'Absol', 'Snorunt', 'Glalie', 'Froslass', 'Sneasel', 'Weavile', 'Sandshrew', 'Sandslash', 
			'Vulpix', 'Ninetales', 'Vanillite', 'Vanillish', 'Vanilluxe', 'Scraggy', 'Scrafty', 'Pawniard', 'Bisharp', 'Snubbull', 'Granbull', 'Shellos', 'Gastrodon', 'Relicanth', 
			'Dhelmise', 'Carvanha', 'Sharpedo', 'Skrelp', 'Dragalge', 'Clauncher', 'Clawitzer', 'Wailmer', 'Wailord', 'Lapras', 'Tropius', 'Exeggcute', 'Exeggutor', 'Corphish', 
			'Crawdaunt', 'Mienfoo', 'Mienshao', 'Jangmo-o', 'Hakamo-o', 'Kommo-o', 'Emolga', 'Scyther', 'Scizor', 'Heracross', 'Aipom', 'Ambipom', 'Litleo', 'Pyroar', 'Misdreavus', 
			'Mismagius', 'Druddigon', 'Lickitung', 'Lickilicky', 'Riolu', 'Lucario', 'Dratini', 'Dragonair', 'Dragonite', 'Aerodactyl', 'Tapu Koko', 'Tapu Koko-Kinolau', 'Tapu Lele', 
			'Tapu Lele-Kinolau', 'Tapu Bulu', 'Tapu Bulu-Kinolau', 'Tapu Fini', 'Tapu Fini-Kinolau', 'Cosmog', 'Cosmoem', 'Nihilego', 'Stakataka', 'Blacephalon', 'Buzzwole', 'Xurkitree', 
			'Celesteela', 'Kartana', 'Guzzlord', 'Necrozma-Base', 'Magearna', 'Zeraora', 'Diglett-Alola', 'Dugtrio-Alola', 'Exeggutor-Alola', 'Geodude-Alola', 'Graveler-Alola', 'Golem-Alola', 
			'Grimer-Alola', 'Marowak-Alola', 'Meowth-Alola', 'Muk-Alola', 'Ninetales-Alola', 'Persian-Alola', 'Raichu-Alola', 'Raticate-Alola', 'Rattata-Alola', 'Sandshrew-Alola', 'Sandslash-Alola', 
			'Vulpix-Alola', 'Absol-Mega', 'Aerodactyl-Mega', 'Alakazam-Mega', 'Garchomp-Mega', 'Gyarados-Mega', 'Heracross-Mega', 'Houndoom-Mega', 'Lopunny-Mega', 'Manectric-Mega', 'Mawile-Mega',
			'Pinsir-Mega', 'Sableye-Mega', 'Scizor-Mega', 'Sharpedo-Mega', 'Slowbro-Mega', 'Tyranitar-Mega', 'Ampharos-Mega', 'Glalie-Mega', 'Banette-Mega', 'Camerupt-Mega',
			'Plubia', 'Snoxin', 'Komodond', 'Anglevolt', 'Thundigeist', 'Forsnaken',
			'Chindle', 'Chaldera', 'Flarenix', 'Firmlio', 'Irotyke', 'Coyotalloy', 'Tikilohi',
			'Numel', 'Camerupt', 'Drilbur', 'Excadrill', 'Volcanion', 'Shaymin', 'Shaymin-Sky', 'Heatran', 'Qwilfish', 'Krabby', 'Kingler',
			'Chikorita', 'Bayleef', 'Meganium', 'Cyndaquil', 'Quilava', 'Typhlosion', 'Totodile', 'Croconaw', 'Feraligatr',
			'Arachsoil', 'Sunkern-Alola', 'Sanddern',
			'Kubfu', 'Urshifu', 'Urshifu-Alola', 'Urshifu-Rapid-Strike', 'Urshifu-Rapid-Strike-Alola', 'Tynamo', 'Tynamo-Alola', 'Eelektrik', 'Eelektrik-Alola', 'Eelektross', 'Eelektross-Alola', 'Onix', 'Onix-Alola', 
			'Steelix', 'Steelix-Alola', 'Steelix-Mega', 'Steelix-Alola-Mega', 'Shelmet', 'Shelmet-Alola', 'Accelgor', 'Accelgor-Alola', 'Shinobug', 'Falinks', 'Falinks-Alola', 'Feebas-Alola', 
			'Milotic-Alola', 'Stethaaina'
		],
		mod: 'gen7dlcmons',
		teambuilderFormat: 'OU',
	},
	{
		name: "[Gen 8] Döppelgangers",
		desc: [
			"<b>Döppelgangers</b>: A project that aims to create a counter to every Pokemon.",
		],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/d%C3%B6ppelgangers-v2.3691045/">Döppelgangers on Smogon Forums</a>`,
		      ],
		ruleset: ['Standard', 'Dynamax Clause', 'Data Mod'],
		banlist: ['Uber', 'Arena Trap', 'Moody', 'Shadow Tag', 'Baton Pass'],
		mod: 'doeppelgangers',
	},
	{
		name: "[Gen 8] Double Trouble",
		desc: `<b>Double Trouble</b>: Doubles-based metagame where Pok&eacute;mon are adjusted to become DOU-viable.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/gen-8-double-trouble-v2-slate-21-set-up-sweepers-leaders-choice.3677466/">Double Trouble</a>`,
		],

		mod: 'doubletrouble',
		gameType: 'doubles',
		searchShow: false,
		ruleset: ['[Gen 8] Doubles OU'],
		// Dumb hack because Mawile has 5 abilities for some reason
		validateSet(set, teamHas) {
			const species = this.dex.getSpecies(set.species);
			const ability = this.dex.getAbility(set.ability);
			if (species.name === "Mawile" && set.moves.includes("Follow Me") && ability.name !== "Steelworker") {
				return [`Mawile can only use Follow Me with Steelworker.`];
			}
			if (!(species.name === 'Mawile' && ability.name === 'Huge Power')) {
				return this.validateSet(set, teamHas);
			} else {
				const abil = set.ability;
				set.ability = 'Steelworker';
				const fakeValidation = this.validateSet(set, teamHas);
				if (fakeValidation?.length) return fakeValidation;
				set.ability = abil;
				return null;
			}
		},
	},
	// {
		// name: "[Gen 8] EXTREME ROULETTEMONS",
		// desc: `A metagame where the types, moves, abilities, and pokemon are randomized.`,
		// threads: [
			// `<a href="https://www.smogon.com/forums/threads/3681345/">EXTREME ROULETTEMONS</a>`,
		// ],

		// mod: 'EXTREMEROULETTEMONS',
		// ruleset: ['Standard NatDex', 'Dynamax Clause', 'Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 'Swagger Clause', 'Baton Pass Clause', 'OHKO Clause'],
		// banlist: ['All Pokemon'],
		// unbanlist: [
			
		// ],
		// onSwitchIn(pokemon) {
			// this.add('-start', pokemon, 'typechange', pokemon.species.types.join('/'), '[silent]');
		// },
	// },
	{
		name: "[Gen 8] Fusion Evolution Alpha",
		desc: [`<b>Fusion Evolution Alpha</b>: A completed micrometa comprised of 35 "Pokemon Fusions" with unique abilities.`,
		      ],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/fusion-evolution-alpha-metagame-updates-and-closure.3658502/">Fusion Evolution Alpha on Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1VnRGTaWn24bB_P071Zy-ZIC15J1CA432YQDfNco3Cnk/edit#gid=0">Spreadsheet</a>`,
		],
		ruleset: ['Standard', 'Dynamax Clause', 'Data Mod', 'Mega Data Mod'],
		banlist: [
			'All Pokemon', /*'Aloraichium Z', 'Buginium Z', 'Darkinium Z', 'Decidium Z', 'Dragonium Z', 'Eevium Z', 'Electrium Z', 'Fairium Z', 'Fightinium Z',
			'Firium Z', 'Flyinium Z', 'Ghostium Z', 'Grassium Z', 'Groundium Z', 'Icium Z', 'Incinium Z', 'Kommonium Z', 'Lunalium Z', 'Lycanium Z', 'Marshadium Z',
			'Mewnium Z', 'Mimikium Z', 'Normalium Z', 'Pikanium Z', 'Pikashunium Z', 'Poisonium Z', 'Primarium Z', 'Psychium Z', 'Rockium Z', 'Snorlium Z', 'Solganium Z',
			'Steelium Z', 'Tapunium Z', 'Ultranecrozium Z', 'Waterium Z',*/
			'Belly Drum', 
		],
		unbanlist: [
			//Slate 1
				'Uranus', 'Saturn', 
			//Slate 2
				'Doot', 'Mr. Gross', 'Pluto', 'Zeus', 
			//Slate 3
				'Picante', 'Mr. Volcano', 'Vespithorn', 'Ishtar', 
			//Slate 4
				'Ananke', 'Dark Rose', 'Kratos', 'White Rider', 
			//Slate 5
				'Curchys-Peed', 'Corvilord', 'Kord', "Sir Pass'd", 
			//Slate 6
				'Teepee', 'Composite', 'Alilat', 'Umbrisse', 
			//Slate 7
				'Black Rider', 'Frother', 'Beezone', 'Toxiking',
			//Slate 8
				'Norn', 'Oni', 'Ares', 'Armalion', 
			//Slate 9
				'Nug', 'Tyragor', 'Pale Rider', 'Laurorusorus', 'Hypnihil', 
			//
		],
		mod: 'fealpha',

	},
	{
		name: "[Gen 8] Fusion Evolution UU",
		mod: "feuu",
		desc: [
			`<b>Fusion Evolution Under Used</b>: A micrometa Pet Mod aiming to create more-balanced-than-usual "Pokemon Fusions" with unique abilities.`
		],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/fusion-evolution-under-used-submission-slate-3.3674163/">Fusion Evolution Under Used on Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1zFk1_DBIoXFFn_7JpvYbVBrW-f1oFFh80Wn0CJNnbVo/edit#gid=0">Spreadsheet</a>`,
		],
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Z-Move Clause', 'Data Mod', 'Mega Data Mod'],
		banlist: [
			'All Pokemon', 'Red Orb', 'Baton Pass', 'Ninjacross + Heracronite', 'Kokovoir + Gardevoirite', 'Salamencite', 'Charizardite Y', 'Blue Orb', 'Wishirupti + Cameruptite', 'Mawilite',
		],
		unbanlist: [
			'Volquag', 'Toxalure', 'Kingtsar', 'Tanette', 'Slowton', 
			'Flaant', 'Umbat', 'Chomplim', 'Chomplim-Mega', 'Xotalion', 'Miemie', 'Dusking', 'Jelliswine',
			'Pigapult', 'Lycanserker-Dusk', 'Tapu Lop', 'Tapu Lop-Mega', 'Dragontler', 'Eternabat',
			'Grimmlurk', 'Manicuno-Galar', 'Yacian-Crowned', 'Cryogolem', 'Stoudrago',
			'Grousle', 'Dongoro', 'Slurpum', 
			'Corveot', 'Corveot-Mega', 'Igglyzenta-Crowned', 'Arctres-Galar', 'Garborude', 'Noicity', 'Ferros',
			'Landmaldo-Therian', 'Tentoxys-Defense', 'Strikados-Galar', 'Hooporant',
			'Brontun', 'Mesflame', 'Thornbro-Galar', 'Glidol', 'Pincurchitar', 'Pincurchitar-Mega', 'Snortine', 'Flygalge',
			'Absable', 'Absable-Mega-X', 'Absable-Mega-Y', 'Scolisharp', 'Ninjacross', 'Gossephalon', 'Dracodoom', 
			'Dracodoom-Mega', 'Toucosta', 'Weezlord-Galar', 'Sableior', 'Sableior-Mega', 'Sableior-Meteor', 'Sableior-Meteor-Mega', 
			'Eeluk', 'Maroligatr-Alola', 'Frozerade',
			'Hattaka', 'Glasnow', 'Glasnow-Mega', 'Kokovoir', 'Kyottler', 'Clawliwrath',
			'Meloslash', 'Meloslash-Melee', 'Tornachamp', 'Cofazor', 'Cofazor-Mega', 'Talonsyl', 'Heatki', 
			'Sirsola', 'Noze-Dawn-Wings', 'Noze-Ultra', 'Bruxray', 'Kingdeedee', 'Tapu Koma', 'Hawlazzle',
			'Whimsilotic', 'Vullacham', 'Vullacham-Mega', 'Dracolix', 'Dracolix-Mega', 'Serpanadel', 'Accelest', 'Buzzeggutor-Alola',
			'Roaramp', 'Roaramp-Mega', 'Glakiss', 'Glakiss-Mega', 'Leafdon',
			'Crustboar', 'Paracoal', 'Arctovic', 'Altarizard', 'Altarizard-Mega-X', 'Altarizard-Mega', 'Sandamar-Alola', 
			'Jirachonator', 'Dredvul', 'Druddifini', 'Swannamence', 'Tyranette-Eternal',
			'Lurodactyl', 'Lurodactyl-Mega', 'Ninelands-Alola', 'Aurorona', 'Monferpa-Unbound', 'Gigacrab', 'Rosenaught', 'Keclyrex-Shadow',
			'Regibee', 'Regibee-Mega', 'Sigileye', 'Darmearna', 'Mr. Ace', 'Deciduskorch', 'Hypnakart', 'Zerclef',
			'Exeggutor-Prime', 'Porygrigus', 'Golisotops',
			'Avarupt', 'Avarupt-Mega', 'Goatitar', 'Goatitar-Mega', 'Fraxshadow', 'Pherogonga', 'Crawmise', 'Wishirupti',
			
			'Torranadus-Therian', 'Togetops', 'Toxicargo', 'Claylamar', 'Vishitomb', 'Swampflora', 'Swampflora-Mega', 'Swalurchin', 'Serpeblim',
			'Azekrow', 'Trapeino', 'Goodevoir', 'Goodevoir-Mega', 'Duramaw', 'Rhybite', 'Oricolyph-Sensu',
			'Grapplor', 'Masquerajah', 'Litleesect', 'Bearyx', 'Fetchey', 'Audiyem', 'Audiyem-Mega',
			'Eelektoad', 'Dialgast', 'Galsola', 'Galsola-Mega', 'Genebro-Galar', 'Hatterune',
			'Deodon-Attack', 'Sharpiskorch', "Sharpiskorch-Mega", "Gourninja", "Cleracross", "Cleracross-Mega", "Aromarel", "Lycansian",
			'Landowak-Alola', 'Emolggron', 'Emolggron-Mega', 'Metagon', 'Hoopagigas-Unbound', 'Nashifu', 'Cramotricity', 'Raibat', 'Darmanitan-Prime',
			'Zarapex', 'Pingar', 'Pingar-Mega', 'Kommo-tot', 'Rotokyu', 'Krookogatr', 'Venuroar', 'Venuroar-Mega', 'Klefilego', 'Rhychomp-Mega', 'Rhychomp',
			'Mr. Basc', 'Shellicham', 'Shellicham-Mega', 'Manditop', 'Mienpa', 'Vikadrill',  
			
			'Silvino-Bug', 'Silvino-Dark', 'Silvino-Dragon', 'Silvino-Electric', 'Silvino-Fairy', 'Silvino-Fighting',
			'Silvino-Fire', 'Silvino-Flying', 'Silvino-Ghost', 'Silvino-Grass', 'Silvino-Ground', 'Silvino-Ice', 
			'Silvino-Poison', 'Silvino-Psychic', 'Silvino-Rock', 'Silvino-Steel', 'Silvino-Water', 'Silvino',
			
			/*'Silvino-Bug-Mega', 'Silvino-Dark-Mega', 'Silvino-Dragon-Mega', 
			'Silvino-Electric-Mega', 'Silvino-Fairy-Mega', 'Silvino-Fighting-Mega',
			'Silvino-Fire-Mega', 'Silvino-Flying-Mega', 'Silvino-Ghost-Mega', 
			'Silvino-Grass-Mega', 'Silvino-Ground-Mega', 'Silvino-Ice-Mega', 
			'Silvino-Poison-Mega', 'Silvino-Psychic-Mega', 'Silvino-Rock-Mega', 
			'Silvino-Steel-Mega', 'Silvino-Water-Mega',*/ 'Silvino-Mega',
			
			'Litleesect-Douse', 'Litleesect-Shock', 'Litleesect-Burn', 'Litleesect-Chill',
			'Genebro-Galar-Douse', 'Genebro-Galar-Shock', 'Genebro-Galar-Burn', 'Genebro-Galar-Chill',

			'Corveotto', 'Torraaffy', 'Rosadin', 'Mr. Boot-Galar', 'Palpitrik', 'Pikabat', 'Krokocroco', 'Ivycat',
			'Mariwick', 'Krabsweet', 'Slowmite', 'Eebat', 'Gibloon', 'Mieyu', 'Duspoke', 'Frillnub', 'Dreepig', 'Meowruff-Galar', 'Golidimp', 'Panchanpy', 'Shroolix', 'Noixel', 'Pidgeidee', 'Bronlin', 'Seedpoke-Galar', 'Glitoy', 'Munchyke', 'Venipawn', 'Krelpinch', 'Tirtipek', 'Grinamo', 'Cubodile', 'Snodew', 'Claunchiwag', 'Scymask', 'Fletchee', 'Farsola-Galar', 'Cottonas', 'Snipole', 'Maritten', 'Snogepi', 'Hippee', 'Dwepig', 'Parycoly', 'Charblu', 'Inkshrew-Alola', 'Chewkit', 'Duckgon', 'Larvaura', 'Crabrola', 'Chespew', 'Rowlipede', 'Scor Jr.', 'Porymask', 'Wimbuto', 'Larkiddo', 'Bergmel',
			'Croagma', 'Inktoy', 'Sunkip', 'Sniloon', 'Rhyble', 'Goolts', 'Clobbgar', 'Sursfant', 'Hatamask-Galar', 'Tynapole', "Meowruff", "Carvipede", "Froakaboo", "Spritdoof", "Beldino", "Pibat", "Darumaka-Prime", "Totosand", "Bulbalit",
			'Exeggcute',
		],
	},
	{
		name: "[Gen 8] Fusion Evolution RU",
		mod: "feuu",
		desc: [
			`<b>Fusion Evolution Rarely Used</b>: A micrometa Pet Mod aiming to create even-more-balanced-than-usual "Pokemon Fusions" with unique abilities.`
		],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/fusion-evolution-rarely-used-slate-1-results-discussion-not-open-for-submissions.3691700/">Fusion Evolution Rarely Used on Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1oelJdiPECm0guZWA9lIHG0w8xQV2nReGZu5lh2d0qcI/edit#gid=0">Spreadsheet</a>`,
		],
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Z-Move Clause', 'Data Mod', 'Mega Data Mod'],
		banlist: [
			'All Pokemon', 'Baton Pass', 'Gardevoirite', 'Mawilite', 'Cameruptite', 'Abomasite', 'Scizorite', 'Glalitite', 'Sablenite', 'Aerodactylite', 'Lopunnite', 'Garchompite', 'Venusaurite', 'Pinsirite', 'Medichamite',
		],
		unbanlist: [
			'Torranadus-Therian', 'Togetops', 'Toxicargo', 'Claylamar', 'Vishitomb', 'Swampflora', 'Swampflora-Mega', 'Swalurchin', 'Serpeblim',
			'Azekrow', 'Trapeino', 'Goodevoir', 'Duramaw', 'Rhybite', 'Oricolyph-Sensu',
			'Grapplor', 'Masquerajah', 'Litleesect', 'Bearyx', 'Fetchey', 'Audiyem', 'Audiyem-Mega',
			'Eelektoad', 'Dialgast', 'Galsola', 'Galsola-Mega', 'Genebro-Galar', 'Hatterune',
			'Deodon-Attack', 'Sharpiskorch', "Sharpiskorch-Mega", "Gourninja", "Cleracross", "Cleracross-Mega", "Aromarel", "Lycansian",
			'Landowak-Alola', 'Emolggron', 'Emolggron-Mega', 'Metagon', 'Hoopagigas-Unbound', 'Nashifu', 'Cramotricity', 'Raibat', 'Darmanitan-Prime',
			'Zarapex', 'Pingar', 'Kommo-tot', 'Rotokyu', 'Krookogatr', 'Venuroar', 'Klefilego', 'Rhychomp',
			'Mr. Basc', 'Shellicham', 'Manditop', 'Mienpa', 'Vikadrill',  
			
			'Tapu Lop', 'Absable', 'Cofazor', 'Lurodactyl', 'Wishirupti', 'Hypnakart', 'Talonsyl', 'Paracoal', 'Avarupt', 'Pherogonga', 
			'Hawlazzle', 'Glakiss', 'Glasnow', 'Dusking', 'Strikados-Galar',
			
			'Silvino-Bug', 'Silvino-Dark', 'Silvino-Dragon', 'Silvino-Electric', 'Silvino-Fairy', 'Silvino-Fighting',
			'Silvino-Fire', 'Silvino-Flying', 'Silvino-Ghost', 'Silvino-Grass', 'Silvino-Ground', 'Silvino-Ice', 
			'Silvino-Poison', 'Silvino-Psychic', 'Silvino-Rock', 'Silvino-Steel', 'Silvino-Water', 'Silvino', 'Silvino-Mega',			
			'Litleesect-Douse', 'Litleesect-Shock', 'Litleesect-Burn', 'Litleesect-Chill',
			'Genebro-Galar-Douse', 'Genebro-Galar-Shock', 'Genebro-Galar-Burn', 'Genebro-Galar-Chill',
			
			'Corveotto', 'Torraaffy', 'Rosadin', 'Mr. Boot-Galar', 'Palpitrik', 'Pikabat', 'Krokocroco', 'Ivycat',
			'Mariwick', 'Krabsweet', 'Slowmite', 'Eebat', 'Gibloon', 'Mieyu', 'Duspoke', 'Frillnub', 'Dreepig', 'Meowruff-Galar', 'Golidimp', 'Panchanpy', 'Shroolix', 'Noixel', 'Pidgeidee', 'Bronlin', 'Seedpoke-Galar', 'Glitoy', 'Munchyke', 'Venipawn', 'Krelpinch', 'Tirtipek', 'Grinamo', 'Cubodile', 'Snodew', 'Claunchiwag', 'Scymask', 'Fletchee', 'Farsola-Galar', 'Cottonas', 'Snipole', 'Maritten', 'Snogepi', 'Hippee', 'Dwepig', 'Parycoly', 'Charblu', 'Inkshrew-Alola', 'Chewkit', 'Duckgon', 'Larvaura', 'Crabrola', 'Chespew', 'Rowlipede', 'Scor Jr.', 'Porymask', 'Wimbuto', 'Larkiddo', 'Bergmel',
			'Croagma', 'Inktoy', 'Sunkip', 'Sniloon', 'Rhyble', 'Goolts', 'Clobbgar', 'Sursfant', 'Hatamask-Galar', 'Tynapole', "Meowruff", "Carvipede", "Froakaboo", "Spritdoof", "Beldino", "Pibat", "Darumaka-Prime", "Totosand", "Bulbalit",
			'Exeggcute',
		],
	},
	{
		name: "[Gen 8] Generation X",
		desc: ["<b>Generation X</b>: A mod that aims to add everything you would expect from a whole new generation of Pokemon games. Welcome to the Brazil-inspired Brazdo region!",],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/generation-x.3670676/>Generation X on Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1fUwoUiu1uVOxW08diz_Xq60LBfyAN3f_ioysAS0-BJE/edit?usp=sharing>Spreadsheet</a>`,
		],

		mod: 'genx',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Freeze Clause Mod', 'Data Mod'],
		banlist: [
			'Alakazam-Mega', 'Arceus', 'Blastoise-Mega', 'Blaziken', 'Darkrai', 'Deoxys-Attack', 'Deoxys-Base', 'Deoxys-Speed',
			'Dialga', 'Eternatus', 'Genesect', 'Gengar-Mega', 'Giratina', 'Groudon', 'Ho-Oh', 'Kangaskhan-Mega', 'Kyogre',
			'Kyurem-Black', 'Kyurem-White', 'Landorus-Base', 'Lucario-Mega', 'Lugia', 'Lunala', 'Marshadow', 'Mewtwo',
			'Naganadel', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Palkia', 'Pheromosa', 'Rayquaza', 'Reshiram',
			'Salamence-Mega', 'Shaymin-Sky', 'Solgaleo', 'Xerneas', 'Yveltal', 'Zacian', 'Zamazenta', 'Zekrom', 'Zygarde-Base',
			'Arena Trap', 'Moody', 'Power Construct', 'Shadow Tag', 'Baton Pass',
		],
	},
	{
		name: "[Gen 3] Hoenn Gaiden",
		desc: ["<b>Hoenn Gaiden</b>: A Gen 3 pet mod that aims to devamp Gen 4-8 Pokemon, moves and items into the Gen 3 mechanics."],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/hoenn-gaiden-the-gen-3-pet-mod-round-1-discussion.3681339/">Hoenn Gaiden on Smogon Forums</a>`,
		],

		mod: 'gen3hoenngaiden',
		ruleset: ['Standard', 'Data Mod', 'Hoenn Gaiden Mod'],
		banlist: ['Uber', 'Past'],
		unbanlist: [
			//Abilities
			'Sand Veil', 'Snow Warning', 'RKS System', 'Ice Body', 'Magic Guard', 'Galvanize', 'Overcoat', 'Desolate Land', 'Mold Breaker', 'Gulp Missile', 'Analytic', 'Protean', 'Neutralizing Gas',
			
			//Pokémon
			'Snover', 'Abomasnow', 'Gliscor', 'Frillish', 'Jellicent', 'Tynamo', 'Eelektrik', 'Eelektross', 'Cryogonal', 'Type: Null', 'Silvally', 'Silvally-Bug', 'Silvally-Dark',
			'Silvally-Dragon', 'Silvally-Electric', 'Silvally-Fighting', 'Silvally-Fire', 'Silvally-Flying', 'Silvally-Ghost', 'Silvally-Grass', 'Silvally-Ground', 'Silvally-Ice', 
			'Silvally-Poison', 'Silvally-Psychic', 'Silvally-Rock', 'Silvally-Steel', 'Silvally-Water', 'Golett', 'Golurk', 'Geodude-Alola', 'Graveler-Alola', 'Golem-Alola', 'Croagunk', 
			'Toxicroak', 'Crabrawler', 'Crabominable', 'Starly', 'Staravia', 'Staraptor', 'Fletchling', 'Fletchinder', 'Talonflame', 'Mawile', 'Stunky', 'Skuntank', 'Sylveon', 'Zarude',
			'Zarude-Dada', 'Buneary', 'Lopunny', 'Chespin', 'Quilladin', 'Chesnaught', 'Cramorant', 'Guzzlord',
			'Litten', 'Torracat', 'Incineroar', 'Mr. Mime-Galar', 'Mr. Rime', 'Uxie', 'Mime Jr.', 'Glaceon',
			'Dracovish', 'Slowpoke-Galar', 'Slowking-Galar', 'Marowak-Alola', 'Marowak-Alola-Totem',
			'Regieleki', 'Milcery', 'Alcremie',
			'Mamoswine', 'Roserade', 'Leafeon', 'Dusknoir', 'Slowbro-Galar', 'Mismagius', 'Honchkrow', 'Budew', 'Ambipom', 'Chingling', 'Munchlax', 'Weavile', 'Happiny', 'Lickilicky', 'Rhyperior', 'Tangrowth', 'Electivire', 'Magmortar', 'Togekiss', 'Yanmega', 'Porygon-Z', 'Magnezone', 'Gallade', 'Froslass', 'Probopass',
			'Rattata-Alola', 'Raticate-Alola', 'Raichu-Alola', 'Dugtrio-Alola', 'Persian-Alola', 'Diglett-Alola', 'Meowth-Alola', 'Meowth-Galar', 'Perrserker', 'Grimer-Alola', 'Muk-Alola', 'Exeggutor-Alola', 'Farfetchd-Galar', 'Weezing-Galar', 'Zigzagoon-Galar', 'Linoone-Galar', 'Corsola-Galar', 'Cursola', 'Obstagoon', 'Sirfetchd', 'Zapdos-Galar', 'Articuno-Galar', 'Moltres-Galar', 'Vulpix-Alola', 'Ninetales-Alola', 'Sandshrew-Alola', 'Sandslash-Alola', 'Ponyta-Galar', 'Rapidash-Galar',
			'Mantyke', 'Bonsly',
			'Stunfisk', 'Stunfisk-Galar', 'Regidrago', 'Skrelp', 'Dragalge', 'Sandile', 'Krokorok', 'Krookodile', 'Wimpod', 'Golisopod', 'Impidimp', 'Morgrem', 'Grimmsnarl', 'Pincurchin',
			
			//Moves
			'Multi-Attack', 'Ice Hammer', 'Acrobatics', 'Lunge', 'Foul Play', 'Spiky Shield', 'Sucker Punch', 'Jungle Healing', 'Ice Shard', 'Body Press', 'Boomburst', 'Spirit Break',
			
			//Items
			'Expert Belt', 'Occa Berry', 'Passho Berry', 'Wacan Berry', 'Rindo Berry', 'Yache Berry', 'Chople Berry', 'Kebia Berry', 'Shuca Berry', 'Coba Berry', 'Payapa Berry', 'Tanga Berry', 
			'Charti Berry', 'Kasib Berry', 'Haban Berry', 'Colbur Berry', 'Babiri Berry', 'Chilan Berry', 'Custap Berry', 'Air Balloon',
		],
		teambuilderFormat: 'OU',
	},
	{
		name: "[Gen 8] JolteMons",
		desc: [
			"<b>JolteMons</b>: A sequel to SylveMons where Pokemon, items, abilities and moves are redesigned for OU (and new items, abilities and moves are added) without changing base stats.",
		],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/joltemons-slate-1-distribution-phase.3694234/">Thread on the Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/149ZlQY0bJIAqfWB_233Dvbpqs3pVSHYpIoAQQkwquls/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: 'joltemons',	
		teambuilderFormat: 'OU',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Data Mod', 'Mega Data Mod'],
		unbanlist: ['Dragapult', 'Tornadus-Therian', 'Blaziken', 'Greninja-Ash', 'Moody'],
		banlist: ['Uber', 'Arena Trap', 'Power Construct', 'Shadow Tag', 'Baton Pass', 'Arceus', 'Blazikenite', 'Blastoisinite', 'Darkrai', 'Gorilla Tactics', 'Deoxys-Base', 'Deoxys-Attack', 'Deoxys-Speed', 'Dialga', 'Genesect', 'Gengarite', 'Giratina', 'Giratina-Origin', 'Groudon', 'Ho-Oh', 'Kangaskhanite', 'Kyogre', 'Kyurem-Black', 'Kyurem-White', 'Landorus-Base', 'Lucarionite', 'Lugia', 'Lunala', 'Marshadow', 'Metagrossite', 'Mewtwo', 'Mewtwo-Mega-X', 'Mewtwo-Mega-Y', 'Naganadel', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Palkia', 'Pheromosa', 'Rayquaza', 'Reshiram', 'Salamencite', 'Solgaleo', 'Xerneas', 'Yveltal', 'Zacian', 'Zamazenta', 'Zekrom', 'Zygarde-Base', 'Berserk Gene', 'Eevee-Starter', 'Pikachu-Starter', 'Moody', 'Magearna', 'Spectrier', 'Dracovish', 'Urshifu-Base', 'Shaymin-Sky',
					'Normalium Z', 'Fairium Z', 'Fightinium Z', 'Firium Z', 'Flyinium Z', 'Darkinium Z', 'Dragonium Z', 'Buginium Z', 'Waterium Z', 'Electrium Z', 'Ghostium Z', 'Grassium Z', 'Groundium Z', 'Icium Z', 'Poisonium Z', 'Psychium Z', 'Rockium Z', 'Steelium Z', 'Decidium Z', 'Kommonium Z'],
	},
	{
		name: "[Gen 8] Megas for All",
		desc: ["<b>Megas for All</b>: A Pet Mod that aims to create unique Mega Evolutions for every fully evolved Pokémon. Plays like National Dex, just with more Megas.",
		      ],
		threads: [
				`&bullet; <a href="https://www.smogon.com/forums/threads/megas-for-all-v7-slate-33-electrode-golurk-and-silvally-please-read-the-first-post-fully-playable-through-slate-32.3671140/">Megas for All v7 on Smogon Forums</a>`,
				`&bullet; <a href="https://docs.google.com/spreadsheets/d/1TdeAUUtjh0f_tcIBllbF_imgepwV-dV2YomoTCRlPgI/edit?usp=sharing">Spreadsheet</a>`,
				`&bullet; <a href="http://megasforall.wikidot.com/">Wiki</a>`
		      ],
		ruleset: ['Standard NatDex', 'Standard M4A', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Freeze Clause Mod', 'Mega Data Mod'],
		mod: 'm4av6',
		// teambuilderFormat: 'OU',
	},
	{
		name: "[Gen 8] Megamax",
		desc: [
			"<b>Megamax</b>: Every Gigantamax form introduced in Pokemon Sword and Shield is converted into brand new Mega Evolutions.",
			],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3658623/">Megamax on Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1QoaocY5tzfwpWg0b5feQO1NMgzodznWxylnBAjM9AR0/edit#gid=0">Spreadsheet</a>`,
		],

		mod: 'megamax',
		ruleset: ['Standard', 'Dynamax Clause', 'Mega Data Mod'],
		//banlist: ['Uber', 'Moody', 'Shadow Tag', 'Baton Pass'],
	},
	{
		name: "[Gen 8] Mega Revolution",
		desc: [
			"<b>Mega Revolution</b>: This Pet Mod converts mega Evolutions into fully evolved independent Pokémon.",
			],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3674638/">Mega Revolution on Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1whBOIqnepKVIjEVOa2HF-3-pxzH8oVcVxVDww0XZgxI/edit?usp=sharing">Spreadsheet</a>`,
		],

		mod: 'megarevolution',
		teambuilderFormat: 'OU',
		ruleset: ['Standard', 'Dynamax Clause', 'Data Mod'],
		banlist: ['Uber', 'AG', 'Arena Trap', 'Power Construct', 'Moody', 'King\'s Rock', 'Shadow Tag', 'Baton Pass'],
	},
	/*
	{
		name: "[Gen 8] Metamorphosis",
		desc: [
			"<b>Metamorphosis</b>: A mod that adds brand new forme changes to existing Pokemon.",
			],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/metamorphosis-slate-3-liepard-delcatty-meowstic.3683773/">Metamorphosis on Smogon Forums</a>`,
		],

		mod: 'gen8',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Data Mod'],
		banlist: [
			'Alakazam-Mega', 'Arceus', 'Blastoise-Mega', 'Blaziken', 'Calyrex-Ice', 'Calyrex-Shadow', 'Cinderace', 'Darkrai', 'Darmanitan-Galar',
            'Deoxys-Attack', 'Deoxys-Base', 'Deoxys-Speed', 'Dialga', 'Dracovish', 'Dragapult', 'Eternatus', 'Genesect', 'Gengar-Mega', 'Giratina',
            'Giratina-Origin', 'Groudon', 'Ho-Oh', 'Kangaskhan-Mega', 'Kyogre', 'Kyurem-Black', 'Kyurem-White', 'Landorus-Base', 'Lucario-Mega',
            'Lugia', 'Lunala', 'Magearna', 'Marshadow', 'Metagross-Mega', 'Mewtwo', 'Naganadel', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane',
            'Necrozma-Ultra', 'Palkia', 'Pheromosa', 'Rayquaza', 'Reshiram', 'Salamence-Mega', 'Shaymin-Sky', 'Solgaleo', 'Spectrier', 'Tornadus-Therian',
            'Urshifu-Base', 'Xerneas', 'Yveltal', 'Zacian', 'Zacian-Crowned', 'Zamazenta', 'Zamazenta-Crowned', 'Zekrom', 'Zygarde-Base', 'Zygarde-Complete',
            'Arena Trap', 'Moody', 'Power Construct', 'Shadow Tag', 'Baton Pass'
		],
	},
	*/
	{
	name: "[Gen 8] Micrometa Mafia",
		desc: `<b>Micrometa Mafia</b>: A Clean Slate based Micrometa where randomly selected participants will attempt to have unhealthy additions to the meta added alongside normal submissions.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/micrometa-mafia-a-clean-slate-spinoff-slate-4-2-enablers-2-abusers.3690180/">Micrometa Mafia on Smogon Forums</a>`,
      	`&bullet; <a href="https://docs.google.com/spreadsheets/d/1IQUF4j3A_cxfIn-ICvedck0EZ28NAw2AoEC_UDus-yg/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: 'micrometamafia',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Data Mod', 'Mega Data Mod'],
		banlist: ['All Pokemon', 'Baton Pass'],
		unbanlist: ['Gastrodon', 'Klefki', 'Regice-Saboteur', 'Skarmory', 'Latios-Saboteur', 'Honchkrow', 'Sableye', 'Pincurchin', 'Dedenne', 'Salazzle', 'Slowbro-Galar-Saboteur', 'Shiftry-Saboteur', 'Articuno-Saboteur', 'Sandslash-Alola-Saboteur'],
	},
	{
		name: "[Gen 8] Missing Links",
		desc: `<b>Missing Links</b>: A National Dex mod that adds evolutions, Mega Evolutions, stat changes, regional forms, and more to Pokemon who's counterparts have them but they don't.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/missing-links-slate-1-5-tiebreaker.3683787/">Missing Links on Smogon Forums</a>`,
      `&bullet; <a href="https://docs.google.com/spreadsheets/d/1wA1o2X5hUNRzGwy5b0YO3CaWAlrn6qvqpnokS-YZoj4/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: 'missinglinks',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Data Mod', 'Mega Data Mod'],
		banlist: [
			'Alakazam-Mega', 'Arceus', 'Blastoise-Mega', 'Blaziken', 'Darkrai', 'Deoxys-Attack', 'Deoxys-Base', 'Deoxys-Speed',
			'Dialga', 'Eternatus', 'Genesect', 'Gengar-Mega', 'Giratina', 'Groudon', 'Ho-Oh', 'Kangaskhan-Mega', 'Kyogre',
			'Kyurem-Black', 'Kyurem-White', 'Landorus-Base', 'Lucario-Mega', 'Lugia', 'Lunala', 'Marshadow', 'Mewtwo',
			'Naganadel', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Palkia', 'Pheromosa', 'Rayquaza', 'Reshiram',
			'Salamence-Mega', 'Shaymin-Sky', 'Solgaleo', 'Xerneas', 'Yveltal', 'Zacian', 'Zamazenta', 'Zekrom', 'Zygarde-Base',
			'Arena Trap', 'Moody', 'Power Construct', 'Shadow Tag', 'Baton Pass', 'Calyrex-Ice', 'Calyrex-Shadow', 'Cinderace', 'Dracovish', 'Dragapult', 'Spectrier', 
		],
	},
	{
		name: "[Gen 8] More Balanced Hackmons",
		desc: `<b>More Balanced Hackmons</b>: A National Dex mod of Balanced Hackmons with new pokemon, moves, and abilities, as well as some additional bans.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/gen-8-more-balanced-hackmons.3644050/">More Balanced Hackmons on Smogon Forums</a>`,
		],
		mod: 'morebalancedhackmons',
		ruleset: [ 'OHKO Clause', 'Evasion Moves Clause', 'CFZ Clause', 'Sleep Clause Mod',
					'Endless Battle Clause', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod', 
					'Species Clause', '+Past'],
		banlist: ['Groudon-Primal', 'Eternatus-Eternamax', 'Arena Trap', 'Huge Power', 'Illusion', 'Innards Out', 'Magnet Pull', 
					'Moody', 'Parental Bond', 'Protean', 'Octolock', 'Pure Power', 'Shadow Tag',
					'Stakeout', 'Water Bubble', 'Wonder Guard', 'Gengarite', 'Chatter', 'Comatose + Sleep Talk',
					'Libero', 'Neutralizing Gas', 'Gorilla Tactics', 'Contrary'],
		onChangeSet(set) {
			const item = this.toID(set.item);
			if (set.species === 'Zacian' || set.species === 'Zacian-Crowned') {
				if (item === 'rustedsword') {
					set.species = 'Zacian-Crowned';
					set.ability = 'Intrepid Sword';
					let ironHead = set.moves.indexOf('ironhead');
					if (ironHead >= 0) {
						set.moves[ironHead] = 'behemothblade';
					}
				} else {
					set.species = 'Zacian';
				}
			}
			else if (set.species === 'Zamazenta' || set.species === 'Zamazenta-Crowned') {
				if (item === 'rustedshield') {
					set.species = 'Zamazenta-Crowned';
					set.ability = 'Dauntless Shield';
					let ironHead = set.moves.indexOf('ironhead');
					if (ironHead >= 0) {
						set.moves[ironHead] = 'behemothbash';
					}
				} else {
					set.species = 'Zamazenta';
				}
			}
		},
		onValidateTeam(team, format){
			/**@type {{[k: string]: true}} */
			for (const set of team) {
				if (set.species == 'Zacian-Crowned' && set.ability !== 'Intrepid Sword')
					 return ["Zacian-Crowned can only have Intrepid Sword as its ability."]
				if ((set.species !== 'Zacian-Crowned' && set.species !== 'Zacian') && set.ability === 'Intrepid Sword')
					 return ["Only Zacian-Crowned can have Intrepid Sword as its ability."]
			}
		},
	},
	{
		name: "[Gen 8] Multiverse",
		desc: [
			"<b>Multiverse</b>: A Pet Mod where Pokemon are balanced around a niche they have in a metagame.",
		],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/multiverse-submissions-generation-one.3695526/">Multiverse on Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1z4aeAAeQR_HkWKA0Q81gWIz-jQfBMTnSDzBx9E6lcH8/edit?usp=sharing">Spreadsheet</a>`,
		],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			for (const set of team) {
				let template = this.dex.getSpecies(set.species);
				if ( template.tier !== 'MV') {
					return [set.species + ' is not usable in Multiverse.'];
				}
			}
		},
		mod: 'multiverse',
		ruleset: ['Standard', 'Dynamax Clause', 'Data Mod', 'Mega Data Mod'],
		banlist: ['Arena Trap', 'Moody', 'Shadow Tag', 'Baton Pass'],
	},
	{
		name: "[Gen 8] National Dex Balanced Hackmons v3",
		desc: `<b>More Balanced Hackmons</b>: A National Dex mod of Balanced Hackmons with new pokemon, moves, and abilities, as well as some additional bans.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/national-dex-bh-v3.3690179/">More Balanced Hackmons on Smogon Forums</a>`,
		],

		mod: 'nationaldexbalancedhackmons',
		ruleset: ['Standard NatDex', '+Nonexistent', '!Obtainable Abilities', '!Obtainable Moves', '!Obtainable Formes', 'Forme Clause', '2 Ability Clause', 'OHKO Clause', 'Evasion Moves Clause', 'CFZ Clause', 'Dynamax Clause'/*, 'Arceus Clause'*/],
		banlist: [
				'Groudon-Primal', 'Rayquaza-Mega', 'Shedinja', 'Cramorant-Gorging', 'Calyrex-Shadow', 'Eternatus-Eternamax', 
				'Arena Trap', 'Contrary', 'Gorilla Tactics', 'Huge Power', 'Illusion', 'Innards Out', 'Libero', 'Magnet Pull', 
				'Moody', 'Neutralizing Gas', 'Parental Bond', 'Protean', 'Pure Power', 'Shadow Tag', 'Stakeout', 'Water Bubble', 'Wonder Guard', 
				'Gengarite', 
				'Chatter', 'Octolock', 'Double Iron Bash', 'Shell Smash', 'Bolt Beak', 'Belly Drum', 'Electrify', 
				'Comatose + Sleep Talk', 'Imprison + Transform',
		],
		onChangeSet(set) {
			const item = this.dex.toID(set.item);
			if (set.species === 'Zacian' && item === 'rustedsword') {
				set.species = 'Zacian-Crowned';
				set.ability = 'Intrepid Sword';
				const ironHead = set.moves.indexOf('ironhead');
				if (ironHead >= 0) {
					set.moves[ironHead] = 'behemothblade';
				}
			}
			if (set.species === 'Zamazenta' && item === 'rustedshield') {
				set.species = 'Zamazenta-Crowned';
				set.ability = 'Dauntless Shield';
				const ironHead = set.moves.indexOf('ironhead');
				if (ironHead >= 0) {
					set.moves[ironHead] = 'behemothbash';
				}
			}
		},
		onValidateTeam(team, format){
			/**@type {{[k: string]: true}} */
			for (const set of team) {
				if (set.species == 'Zacian-Crowned' && set.ability !== 'Intrepid Sword')
					 return ["Zacian-Crowned can only have Intrepid Sword as its ability."]
				if (set.species == 'Zacian-Crowned' && set.item !== 'Rusted Sword')
					 return ["Zacian-Crowned can only have Rusted Sword as its item."]
				if ((set.species !== 'Zacian-Crowned' && set.species !== 'Zacian') && set.ability === 'Intrepid Sword')
					 return ["Only Zacian-Crowned can have Intrepid Sword as its ability."]
			}
		},
	},
	{
		name: "[Gen 8] OptiMons",
		desc: [
			"<b>OptiMons</b>: A Pet Mod where each Pokemon is 'optimized' to its fullest extent.",
		],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/gen-8-optimons-gen-4-cross-gen-evos.3657509/">OptiMons on Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1k_nvLAq1Qh0yfFjYSr-hy9xsoglgkZTGriKdM6oFRDI/edit#gid=0">Spreadsheet</a>`,
		],

		mod: 'optimons',
		ruleset: ['Standard', 'Dynamax Clause'],
		banlist: ['Uber', 'Moody', 'Shadow Tag', 'Baton Pass'],
	},
	{
		name: "[Gen 8] OU Theorymon",
		desc: [
		   "<b>OU Theorymon</b>: A Sword and Shield OU metagame where low-ranked Pokemon are improved to become more viable.",
		],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/ss-ou-theorymon.3695574/">OU Theorymon on Smogon Forums</a>`,
		],
		
		mod: 'outheorymons',
      ruleset: ['Standard', 'Dynamax Clause'],
		banlist: ['Uber', 'Arena Trap', 'Moody', 'Shadow Tag', 'Baton Pass'], 
	},
	{
		name: "[Gen 8] Perfect Galar",
		desc: ["The goal of <b>Perfect Galar</b> is to make a Sword and Shield OU metagame where every single fully evolved Pokemon in the Galar Pokedex has a unique, valuable niche. Also, Dynamax has been rebalanced!",
		],
		threads: [
				`&bullet; <a href="https://www.smogon.com/forums/threads/gen-8-perfect-galar.3656660/">Perfect Galar on Smogon Forums</a>`,
				`&bullet; <a href="https://docs.google.com/spreadsheets/d/1jdnSkuV4FIjaoOSGvbE_ET4ZXobAx8_L6oMpPNgXGFE/edit#gid=0">Spreadsheet</a>`,
				],
		ruleset: ['Obtainable', 'Standard', 'Data Mod'],
		banlist: ['Uber', 'Baton Pass', 'Blissey', 'Chansey', 'Happiny', 'Buzzwole', 'Dragonite', 'Dragonair', 'Dratini', 'Garchomp', 'Gabite', 'Gible', 'Nidoking', 'Nidoqueen', 'Swampert', 'Marshtomp', 'Mudkip', 'Pheromosa', 'Heatran', 'Kartana', 'Landorus', 'Landorus-Therian', 'Magearna', 'Tornadus', 'Tornadus-Therian', 'Blacephalon', 'Alakazam', 'Azelf', 'Mesprit', 'Uxie', 'Celesteela', 'Buneary', 'Lopunny', 'Igglybuff', 'Jigglypuff', 'Wigglytuff', 'Fomantis', 'Lurantis', 'Fletchling', 'Fletchinder', 'Talonflame', 'Klefki', 'Tentacool', 'Tentacruel', 'Dunsparce', 'Lickitung', 'Lickilicky', 'Druddigon', 'Venipede', 'Whirlipede', 'Scolipede', 'Foongus', 'Amoonguss', 'Comfey', 'Tangela', 'Tangrowth', 'Zorua', 'Zoroark', 'Staryu', 'Starmie', 'Emolga', 'Dedenne', 'Magnemite', 'Magnezone', 'Carvanha', 'Sharpedo', 'Lillipup', 'Herdier', 'Stoutland', 'Tauros', 'Miltank', 'Scyther', 'Scizor', 'Pinsir', 'Heracross', 'Sandygast', 'Palossand', 'Azurill', 'Azumarill', 'Poliwag', 'Poliwhirl', 'Poliwrath', 'Politoed', 'Psyduck', 'Golduck', 'Skarmory', 'Rockruff', 'Lycanroc', 'Lycanroc-Midnight', 'Lycanroc-Dusk', 'Mienfoo', 'Mienshao', 'Sandshrew', 'Sandslash', 'Sandshrew-Alola', 'Sandslash-Alola', 'Cubone', 'Marowak', 'Marowak-Alola', 'Kangaskhan', 'Sandile', 'Krokorok', 'Krookodile', 'Larvesta', 'Volcarona', 'Skrelp', 'Dragalge', 'Clauncher', 'Clawitzer', 'Horsea', 'Seadra', 'Petilil', 'Lilligant', 'Exeggcute', 'Exeggutor', 'Exeggutor-Alola', 'Porygon', 'Porygon2', 'Porygon-Z', 'Nidoran-F', 'Nidoran-M', 'Nidorino', 'Nidorina', 'Jynx', 'Smoochum', 'Electabuzz', 'Electivire', 'Elekid', 'Magmar', 'Magby', 'Magmortar', 'Omanyte', 'Omastar', 'Kabuto', 'Kabutops', 'Aerodactyl', 'Raikou', 'Entei', 'Suicune', 'Treecko', 'Grovyle', 'Sceptile',
		'Torchic', 'Combusken', 'Blaziken', 'Aron', 'Lairon', 'Aggron', 'Swablu', 'Altaria', 'Lileep', 'Cradily', 'Anorith', 'Armaldo', 'Absol', 'Spheal', 'Sealeo', 'Walrein', 'Relicanth', 'Bagon', 'Shelgon', 'Salamence', 'Beldum', 'Metang', 'Metagross', 'Latias', 'Latios', 'Spiritomb', 'Cresselia', 'Victini', 'Audino', 'Tirtouga', 'Carracosta', 'Archen', 'Archeops', 'Cryogonal', 'Thundurus', 'Thundurus-Therian', 'Tyrunt', 'Tyrantrum', 'Amaura', 'Aurorus', 'Carbink', 'Zygarde', 'Zygarde-10', 'Diancie', 'Volcanion', 'Tapu Koko', 'Tapu Fini', 'Tapu Lele', 'Tapu Bulu', 'Nihilego', 'Xurkitree', 'Guzzlord', 'Poipole', 'Stakataka', 'Mew', 'Celebi', 'Jirachi', 'Magearna-Original', 'Kyurem', 'Necrozma'],
		mod: 'perfectgalar',
		teambuilderFormat: 'OU',
		onSwitchIn( pokemon ){
			if ( pokemon.hasDynamaxed ) pokemon.addVolatile( pokemon.volatileTag );
		},
	}, 
	{
		name: "[Gen 8] PokeClasses",
		desc: [
			`<b>PokeClasses</b>: A Pet Mod that allows for the creation of "classes" you can choose for your Pokémon by nicknaming them. These give stat boosts and can function like abilities, giving certain side effects.`,
		],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/gen-8-pokeclasses-slate-7-crusader-hand-to-hand-minotaur-slates-1-3-coded.3657264/">PokeClasses on Smogon Forums</a>`
		],
		ruleset: ['Standard NatDex', 'PokeSkills Move Legality'],
		banlist: [],
		mod: 'pokeclasses',
		onBegin() {
			let allPokemon = this.p1.pokemon.concat( this.p2.pokemon );
			for ( let pokemon of allPokemon ) {
				//apply pokeClasses
				if ( this.format.pokeClasses.includes( pokemon.set.name )){
					pokemon.pokeClass = pokemon.set.name;
				}
				//apply pokeSkills
				for ( let i in pokemon.set.moves ) {
					let pokeSkillName = pokemon.set.moves[i];
					if ( this.format.pokeSkills.includes( pokeSkillName )){
						pokemon.pokeSkill = pokeSkillName;
					}
				}
			}
		},
		pokeClasses: ['warrior','mage','thief'],
		pokeSkills: ['blade','destruction','athletics'],
		onSwitchInPriority: 2,
		onSwitchIn(pokemon) {
			if ( pokemon.pokeClass ) pokemon.addVolatile('ability:' + pokemon.pokeClass, pokemon);
			if ( pokemon.pokeSkill ) pokemon.addVolatile(pokemon.pokeSkill);
		},
	},
	{
		name: "[Gen 8] Randommons",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3656899/">National Dex Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3658849/">National Dex Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3659038/">National Dex Viability Rankings</a>`,
		],

		mod: 'random',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Data Mod'],
		banlist: [
			'Alakazam-Mega', 'Arceus', 'Blastoise-Mega', 'Blaziken', 'Darkrai', 'Deoxys-Attack', 'Deoxys-Base', 'Deoxys-Speed',
			'Dialga', 'Eternatus', 'Genesect', 'Gengar-Mega', 'Giratina', 'Groudon', 'Ho-Oh', 'Kangaskhan-Mega', 'Kyogre',
			'Kyurem-Black', 'Kyurem-White', 'Landorus-Base', 'Lucario-Mega', 'Lugia', 'Lunala', 'Marshadow', 'Mewtwo',
			'Naganadel', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Palkia', 'Pheromosa', 'Rayquaza', 'Reshiram',
			'Salamence-Mega', 'Shaymin-Sky', 'Solgaleo', 'Xerneas', 'Yveltal', 'Zacian', 'Zamazenta', 'Zekrom', 'Zygarde-Base',
			'Arena Trap', 'Moody', 'Power Construct', 'Shadow Tag', 'Baton Pass',
		],
		teambuilderFormat: "Rand",
	},
	{
		name: "[Gen 8] Random Dex",
		desc: `<b>Random Dex</b>: A micrometagame project consisting of 80 randomly-selected fully-evolved Pokemon.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/random-dex.3690182/">Thread in Pet Mods</a>`,
		],
		mod: 'randomdex',
		teambuilderFormat: "RDex OU",
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Data Mod', 'Mega Data Mod'],
		banlist: ['Arena Trap', 'Moody', 'Shadow Tag', 'Baton Pass',
		'Bright Powder', 'Lax Incense', 'King\'s Rock', 'Razor Fang', 'Kangaskhanite', 'Medichamite'],
		onValidateTeam(team, format) {
			let speciesTable = {};
			let allowedTiers = ['RDex OU', 'RDex UUBL', 'RDex UU', 'RDex NFE', 'RDex LC'];
			for (const set of team) {
				let template = this.dex.getSpecies(set.species);
				if ( !allowedTiers.includes(template.tier) ) {
					return [set.species + ' is not useable in Random Dex.'];
				}
			}
		},
	},
	{
		name: "[Gen 8] Restrictions",
		desc: `<b>Restrictions</b>: A metagame made up of brand new Pok&eacute;mon that are made according to various random and non-random restrictions.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3673824/">Restrictions on Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1XsplBqN8njHZJT9cTP_3i3YSFITB9WaVfNOYAbNY75M/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: 'restrictions',
		ruleset: ['Standard', 'Dynamax Clause', 'Data Mod'],
		banlist: ['uber', 'ou', 'uubl', 'uu', 'rubl', 'ru', 'nubl', 'nu', 'publ', 'pu', 'zu', 'nfe', 'lcuber', 'lc', 'cap', 'caplc', 'capnfe', 'ag','past', 'future', 'lgpe'],
		teambuilderBans: ['unreleased'],
	},
	{
  		name: "[Gen 8] Regional Evolutions",
  		desc: ["<b>Breeding Variants</b>: Have you seen those cool fanart posts where someone makes drawings of a Pokemon and what they would look like if their offspring took traits from their breeding partner? This Pet Mod takes this concept and puts it into a playable form.",
		      ],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/breeding-variants-v2.3658458/">Breeding Variants V3 on Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1EElnaRtulywum6cNWS2nzPTwtzMQHvFDNN3uNNWOnHE/edit#gid=1305095826">Spreadsheet</a>`,
		],
  		ruleset: [ 'OHKO Clause', 'Evasion Moves Clause', 'CFZ Clause', 'Sleep Clause Mod',
					'Endless Battle Clause', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod', 
					'Species Clause', '+Past'],
		mod: 'regionalevos',
  	},
	{
		name: "[Gen 8] Return to Orre",
		desc: `<b>Random Dex</b>: A micrometagame project consisting of the 158 Pokemon found in the Orre Region.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/return-to-orre-slate-1-a-dire-situation.3695530/">Thread in Pet Mods</a>`,
		],
		mod: 'returntoorre',
		teambuilderFormat: "RTO",
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Data Mod', 'Mega Data Mod'],
		banlist: ['Arena Trap', 'Moody', 'Shadow Tag', 'Baton Pass',
		'Bright Powder', 'Lax Incense', 'King\'s Rock', 'Razor Fang'],
		onValidateTeam(team, format) {
			let speciesTable = {};
			let allowedTiers = ['RTO', 'RTO NFE'];
			for (const set of team) {
				let template = this.dex.getSpecies(set.species);
				if ( !allowedTiers.includes(template.tier) ) {
					return [set.species + ' is not found in Orre.'];
				}
			}
		},
	},
	{
      name: "[Gen 1] Rose Red / Iris Blue",
        desc: `<b>[Gen 1] Rose Red/Iris Blue</b>: A balance mod for Gen 1 that aims to make every fully-evolved Pokémon a viable pick.`,
        threads: [
            `&bullet; <a href="https://www.smogon.com/forums/threads/gen-1-rose-red-iris-blue.3652237/">Rose Red / Iris Blue on Smogon Forums</a>`,
            `&bullet; <a href="https://docs.google.com/document/d/1MY2Y9FWH93-ujhT0UjRjbJdnus_hPmDusBf18VbnWpg/edit">Metagame doc with changes</a>`,
        ],
        mod: 'roseredirisblue',
        ruleset: ['Standard', 'Team Preview'],
		unbanlist: ['Ampharos', 'Forretress', 'Seviper', 'Zangoose', 'Gogoat', 'Breloom', 'Sceptile'],
    },
	{
		name: "[Gen 8] Roulettemons",
		desc: `<b>Roulettemons</b>: A metagame made up of brand new Pok&eacute;mon that have randomly generated moves, stats, abilities, and types.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3649106/">Roulettemons on Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1EOA1m7JXTq7Zz0ViVI4n6lBppFjVBa4S1GqhAwkPTZQ/edit?usp=sharing">Spreadsheet</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1J5ZMVzTAfJ48KQWVE7jt1S6fm7Y8DQX1tFX0-iENWiw/edit?usp=sharing">Bonus Random Team Generator</a>`,
		],

		mod: 'roulettemons',
		ruleset: ['Standard NatDex', 'Dynamax Clause', 'Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 'Swagger Clause', 'Baton Pass Clause', 'OHKO Clause'],
		banlist: ['All Pokemon'],
		unbanlist: [
			'Koatric', 'Aquazelle', 'Salamalix', 'Brawnkey', 'Stuneleon', 'Chillyte', 'Eartharoo', 'Crazefly', 'Electritar', 'Aquatopus', 'Scorpita', 'Baloon', 'Kinesel', 'Glacida', 'Pidgeotine', 'Gorilax', 'Albatrygon', 'Chillvark', 'Komodith', 'Giranium', 'Flamyle', 'Voltecta', 'Ostria', 'Ninjoth', 'Herbigator', 'Anteros', 'Gladiaster', 'Hyperoach', 'Barracoth', 'Toados', 'Voltarak', 'Mosqung', 'Flamepion', 'Hyenix', 'Rhinolite', 'Bellena', 'Falcola', 'Beanium', 'Lemotic', 'Biceon', 'Skeleray', 'Specyte', 'Ramron', 'Panthee', 'Blastora', 'Balar', 'Dropacle', 'Fluffora', 'Dolphena', 'Tigire', 'Catelax',
		],
		onSwitchIn(pokemon) {
			this.add('-start', pokemon, 'typechange', pokemon.species.types.join('/'), '[silent]');
		},
	},
	{
		name: "[Gen 8] Super Smash Mods Melee",
		desc: [
			`<b>Super Smash Mods Melee</b>: The sequel to the original <a href="https://www.smogon.com/forums/threads/super-smash-mods.3650982/">Super Smash Mods</a>, a micrometa created using Pokemon and items from a variety of different Pet Mods.`,
		],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/super-smash-mods-melee-final-slate.3672634/">Super Smash Mods Melee on Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1weBn0WOP7rLsK04aMHgUK2wWddvmFPYZFqTKIeui9Xk/">Spreadsheet</a>`,
		      ],
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Z-Move Clause', 'Data Mod', 'Mega Data Mod'],
		banlist: ['Gengarite', 'Slowbronite', 'Baton Pass'],
		teambuilderBans: ['Unown'],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			for (const set of team) {
				let template = this.dex.getSpecies(set.species);
				if ( template.tier !== 'Melee') {
					return [set.species + ' is not usable in Super Smash Mods Melee.'];
				}
			}
		},
		onChangeSet(set) {
			if (set.species === 'Unown') {
				set.forme = 'Unown-M';
				// why does this not do *anything*
				// please
				// whoever hard-coded Unown like this
				// undo it
				// I'm begging you
				// you make me so sad do you understand
			}
		},
		mod: 'smashmodsmelee',
	},
	{
		name: "[Gen 8] Super Smash Stereotypes",
		desc: [
			"<b>Super Smash Stereotypes</b>: A project that aims to create a micrometa containing a Pokemon from other mods for all 171 possible types.",
		],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/super-smash-stereotypes-fire-grass-water.3690227/">Super Smash Mods Melee on Smogon Forums</a>`,
		      ],
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Z-Move Clause', 'Data Mod', 'Mega Data Mod'],
		banlist: ['Gardevoirite', 'Chillytite', 'Baton Pass'],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			for (const set of team) {
				let template = this.dex.getSpecies(set.species);
				if ( template.tier !== 'SSS') {
					return [set.species + ' is not usable in Super Smash Stereotypes.'];
				}
			}
		},
		mod: 'smashstereotypes',
	},
	{
		name: "[Gen 8] Stereotypes",
		mod: "stereotypes",
		desc: [
			"<b>Stereotypes</b>: A project that aims to create a micrometa containing a unique new Pokemon for all 171 possible types, with the hope that each mon will use its typing and the options that typing affords well, while still being balanced and interesting.",
		],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/stereotypes-slate-1-fire-grass-water.3681312/">Stereotypes on Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/19CbVWEkREchf_88VNfyEpcYEIdH_aJe20VMQyc8i-8Y/edit?usp=sharing">Spreadsheet</a>`,
		],
		ruleset: ['Standard', 'Dynamax Clause', 'Data Mod'],
		banlist: ['Conversion', 'Conversion2', 'Libero', 'Protean', 'Transistor', 'Dragon\'s Maw', 'Steelworker', 'Steely Spirit', 'Color Change', 'Arena Trap', 'Shadow Tag', 'Moody'],
		onValidateTeam(team, format) {
			let speciesTable = {};
			let allowedTiers = ['ST', 'ST NFE', 'ST LC'];
			for (const set of team) {
				let template = this.dex.getSpecies(set.species);
				if ( !allowedTiers.includes(template.tier) ) {
					return [set.species + ' is not useable in Stereotypes.'];
				}
			}
		},
		teambuilderFormat: "ST",
	},
	{  
		name: "[Gen 8] SylveMons",
		desc: [
			"<b>SylveMons</b>: A Pet Mod where Pokemon, items, abilities and moves are redesigned for OU (and new items, abilities and moves are added) without changing base stats.",
		],
		threads: [`&bullet; <a href="https://www.smogon.com/forums/threads/.3612509/">SylveMons on Smogon Forums</a>`,
				 `&bullet; <a href="https://docs.google.com/spreadsheets/d/18DiYjbZXv1Nm7tU-W0OMgPow0ZO7J2ETJF-hWapwM-o/edit">Spreadsheet</a>`,
		      ],
		mod: 'sylvemonstest',
		teambuilderFormat: 'OU',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Data Mod', 'Mega Data Mod', 'SylveMons Intro Mod'],
		banlist: ['Uber', 'Arena Trap', 'Power Construct', 'Baton Pass', 'Stalwart + Calm Mind', 'Reverse Core', 'Alakazite', 'Blastoisinite', 'Arceus', 'Darkrai', 'Darmanitan-Galar', 'Deoxys-Base', 'Deoxys-Attack', 'Deoxys-Speed', 'Dialga', 'Genesect', 'Gengarite', 'Greninja-Ash', 'Giratina', 'Giratina-Origin', 'Groudon', 'Ho-Oh', 'Kyogre', 'Kyurem-Black', 'Kyurem-White', 'Landorus-Base', 'Lucarionite', 'Lugia', 'Lunala', 'Marshadow', 'Metagrossite', 'Mewtwo', 'Mewtwo-Mega-X', 'Mewtwo-Mega-Y', 'Naganadel', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Palkia', 'Pheromosa', 'Rayquaza', 'Reshiram', 'Salamencite', 'Shaymin-Sky', 'Solgaleo', 'Urshifu-Base', 'Xerneas', 'Yveltal', 'Zacian', 'Zamazenta', 'Zekrom', 'Zygarde-Base', 'Berserk Gene', 'Kommonium Z', 'Eevee-Starter', 'Pikachu-Starter', 'Eternatus-Eternamax', 'Zygarde-Complete', 'Regigigas', 'Battle Bond', 'Necrozma-Ultra', 'Calyrex-Ice', 'Calyrex-Shadow', 'Ring Target', 'Ice Skates', 'Serperior ++ Flamethrower', 'Moon Stone', 'Shiny Stone', 'Dusk Stone', 'Moody'],
		unbanlist: ['Melmetal', 'Cinderace', 'Magearna', 'Magearna-Original', 'Floette-Eternal', 'Ribombee-Totem', 'Marowak-Alola-Totem', 'Kommo-o-Totem', 'Salazzle-Totem', 'Togedemaru-Totem', 'Mimikyu-Totem', 'Light of Ruin'],
	},
	{
		name: "[Gen 8] To The Gigantamax AG",
		desc: [
			"<b>To The Gigantamax AG</b>: An AG metagame that adds new Gigantamax forms.",
		],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/to-the-gigantamax-v2-slate-18-all-grown-up-voting-phase.3668706/">To The Gigantamax v2 on Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1v01hykZ3PwSNqgJ-HPCSnEPDZnP_ArTguOTT6NAOusc/edit?usp=sharing">Spreadsheet</a>`,
		],
		teambuilderFormat: 'AG',
		mod: 'tothegigantamax',
		ruleset: ['Obtainable', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Endless Battle Clause'],
	},
	{
		name: "[Gen 8] To The Gigantamax VGC",
		desc: [
			"<b>To The Gigantamax VGC</b>: A metagame based on VGC Series 7 that adds new Gigantamax forms.",
		],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/to-the-gigantamax-v2-slate-18-all-grown-up-voting-phase.3668706/">To The Gigantamax v2 on Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1v01hykZ3PwSNqgJ-HPCSnEPDZnP_ArTguOTT6NAOusc/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: 'tothegigantamax',
		gameType: 'doubles',
		forcedLevel: 50,
		teamLength: {
			validate: [4, 6],
			battle: 4,
		},
		ruleset: ['Standard GBU', 'VGC Timer'],
		minSourceGen: 8,
	},	
	{
		name: "[Gen 8] Twisted Pokemon",
		desc: `You can Twist the Pokemon switching in, changing its type between two predetermined typings.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/pet-mods-submission-thread.3657184/post-8446318">Twisted Pokemon</a>`,
			`&bullet; That link is broken, I can't find a more current link anywhere in the Pet Mods subforum, and I'm pretty sure the code doesn't function...`,
			`&bullet; ... Proceed with caution, I guess? - ink`,
		],		
		mod: 'twisted',
		searchShow: false,
		challengeShow: false,
		debug: true,
		forcedLevel: 50,
		teamLength: {
			validate: [3, 6],
			battle: 3,
		},
		ruleset: ['Dynamax Clause', 'Team Preview'],
		banlist: ['Moody', 'Power Construct'],
		minSourceGen: 8,
		onBegin(){
			const move = this.dex.getMove('twist');
			const twistMove = {
				move: move.name,
				id: move.id,
				pp: move.pp,
				maxpp: move.pp,
				target: move.target,
				disabled: false,
				used: false,
			};
			for (const pokemon of this.getAllPokemon()) {
				pokemon.moveSlots.push(twistMove);
				pokemon.baseMoveSlots.push(twistMove);
				pokemon.canMegaEvo = null;
			}
		},
		onSwitchInPriority: 2,
		onSwitchIn(pokemon) {
			if (pokemon.canMegaEvo === 'L' || pokemon.canMegaEvo === 'R') 
				pokemon.addVolatile('twisted');
		},
	},
	{
		name: "[Gen 8] Ubermons",	
		mod: 'ubermons',
		desc: [
			"<b>Ubermons</b>: A Pet Mod that aims to rebalance Ubers for OU. The goal is to make every single ban into a viable and healthy part of the metagame.",
		],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/ubermons-slate-2-spooky-scary-skeletons-dragapult-marshadow-spectrier.3683759/">Ubermons on Smogon Forums</a>`,
		], 
		ruleset: ['Standard NatDex', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Data Mod', 'Mega Data Mod', 'Mega Rayquaza Clause'],
		banlist: [
			//Pokémon
			'Arceus', 'Calyrex-Ice', 'Calyrex-Shadow', 'Darkrai', 'Eternatus', 'Naganadel', 'Tornadus-Therian', 'Xerneas', 'Yveltal', 'Zacian', 'Zamazenta', 'Zygarde-Base', 'Rayquaza-Mega',
			//Abilities
			'Moody', 'Power Construct',
			//Items
			'Blazikenite', 'Lucarionite', 'Salamencite', 'Blue Orb', 'Red Orb', 'Mewtwonite X', 'Mewtwonite Y', 'Ultranecrozium Z',
			//Moves
			'Baton Pass',
		],
		teambuilderFormat: 'OU',
	},
	{
     name: "[Gen 8] ViAbilities",
	 desc: [
		"<b>ViAbilities</b>: A Pet Mod that rebalances abilities that are generally not useful in competitive Single Battles.",
	 ],
     threads: [
         `&bullet; <a href="https://www.smogon.com/forums/threads/viabilities-slate-2-ability-submissions-stage.3664169/">ViAbilities on Smogon Forums</a>`,
         `&bullet; <a href="https://docs.google.com/spreadsheets/d/1w1PaZXQnRdPFEgUQ12MyE91-PeaGFF3rjQEZJiUfVaE/edit?usp=drivesdk">Spreadsheet</a>`,
     ],
     mod: 'viabilities',
     ruleset: ['Standard', 'Dynamax Clause']

	},
	// Pet Mod Secondary Formats ////////////////////////////////////////////////////////////////
	{
		section: "Pet Mods Bonus Formats",
		column: 3,
	},
	{
		name: "[Gen 8] Alternatium Doubles",
		desc: `<b>Restrictions</b>: A metagame made up of only Pokemon with alternate forms exist, with all of them being seperate and unique Pokemon.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/alternatium-slate-7-slow-twins-slate-also-vote-in-poll.3683767/">Alternatium on Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1bvvkPg1CrUBJFJJeuwkts8elfJcEcahGOoHm-vGBXOI/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: 'alternatium',
		searchShow: false,
		gameType: 'doubles',
		ruleset: ['Standard Doubles', 'Dynamax Clause', 'Data Mod', '+Unobtainable', '+Past'],
		banlist: ['All Pokemon'],
		unbanlist: [
					'Silvally', 'Silvally-Bug', 'Silvally-Dark', 'Silvally-Dragon', 'Silvally-Electric', 'Silvally-Fairy', 'Silvally-Fighting', 'Silvally-Fire', 'Silvally-Flying', 'Silvally-Ghost', 
					'Silvally-Grass', 'Silvally-Ground', 'Silvally-Ice', 'Silvally-Poison', 'Silvally-Psychic', 'Silvally-Rock', 'Silvally-Steel', 'Silvally-Water', 'Pikachu', 'Pikachu-Rock-Star', 
					'Pikachu-Belle', 'Pikachu-Idol', 'Pikachu-PhD', 'Pikachu-Libre', 'Pikachu-Partner', 'Pikachu-Starter', 'Darmanitan', 'Darmanitan-Zen', 'Darmanitan-Galar', 'Darmanitan-Galar-Zen', 
					'Aegishield', 'Aegislash', 'Zacian', 'Zacian-Crowned', 'Zamazenta', 'Zamazenta-Crowned', 'Rotom', 'Rotom-Heat', 'Rotom-Wash', 'Rotom-Frost', 'Rotom-Fan', 'Rotom-Mow', 'Dugtrio', 
					'Dugtrio-Alola', 'Muk', 'Muk-Oilslick', 'Slowbro', 'Slowbro-Galar', 'Slowking', 'Slowking-Galar', 'Tornadus', 'Cummulus', 'Thundurus', 'Thundurus-Therian', 'Landorus', 'Landorus-Bengal', 
					'Vivillon-Fancy', 'Vivillon-Spirit', 'Vivillon-Combat', 'Genesect', 'Genesect-Password', 'Genesect-Molten', 'Genesect-Freezer', 'Genesect-Type-Delta', 'Groudon', 'Groudon-Primal', 'Kyogre', 
					'Kyogre-Primal', 'Deoxys-Wood', 'Deoxys-Gem', 'Deoxys-Tank', 'Deoxys-Speed', 'Sandslash-Lustrous', 'Sandslash-Alola', 'Ninetales-Steamwork', 'Ninetales-Alola', 'Giratina', 'Giratina-Shadow', 
					'Eternatus', 'Manustorm', 'Exeggutor', 'Exeggutor-Lighthouse', 'Weezing', 'Weezing-King', 'Raticate', 'Raticate-Alola', 'Linoone', 'Linoone-Punk', 'Catastroform', 'Castform-Firestorm', 
					'Castform-Thunderstorm', 'Castform-Snowy', 'Wormadam', 'Wormadam-Sandy', 'Fibormadam', 'Farfetch\u2019d', 'Farfetch\u2019d-Galar', 'Corsola', 'Corsoul', 'Shaymin', 'Shaymin-Sky', 'Keldeo', 
					'Swordeo', 'Meloetta', 'Meloetta-Fighter', 'Lycanday', 'Lycanroc-Spectre', 'Lycanroc-Dusk', 'Gourgeist', 'Gourgeist-Fae', 'Gourgeist-Pulpy', 'Supergeist', 'Cramorant', 'Cramorant-Swimmer', 
					'Cramorant-Gorging', 'Eiscue', 'Eiscue-Noice', 'Mimikyu', 'Mimikyu-Sparkstone', 'Morpeko-Marsh', 'Morvilant', 'Zygarde-Wyrm', 'Zygarde-Canid', 'Zygarde-Goliath',
		],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			for (const set of team) {
				let template = this.dex.getSpecies(set.species);
				if (speciesTable[template.id]) {
					return ["You are limited to one of each Pokémon by Species Clause (except for different formes). ", "You have more than one " + template.id + "."];
				}
				speciesTable[template.id] = true;
			}
		},
	},
	{
		name: "[Gen 8] CCAPM 2021 Galar Dex",
		desc: `<b>Community Create-a-Pet Mod 2021</b>: Redoing Typing: The Mod, where 2 new types were created alongside numerous moves, items, and abilities.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/community-create-a-pet-mod-2021.3693263/">CCAPM 2021 on Smogon Forums</a>`,
      `&bullet; <a href="https://docs.google.com/spreadsheets/d/1YfSmgK0CSPYT5FiRdJR1vFGLvxoQCRKjJbmejL1niQw/edit?usp=sharing>Spreadsheet</a>`,
		],
		mod: 'ccapm2021',
		ruleset: ['Standard', 'Dynamax Clause', 'Data Mod'],
		banlist: ['Uber', 'Moody', 'Shadow Tag', 'Baton Pass'],
  },
  {
		name: "[Gen 8] Bench Abilities",
		desc: [
			"<b>Bench Abilities</b>: A Pet Mod based on SM Battle Spot Singles, in which Pokemon have 'bench abilities' that passively aid their allies when they aren't actively in battle."
		],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/.3648706/">Bench Abilities on Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/14GDawSGTJsvZD6aAaTgnsdygPRFb3Kx1Pb6lEksvXLo/edit?usp=sharing">Spreadsheet</a>`,
		],
		ruleset: [ 'Species Clause', 'Moody Clause', 'Baton Pass Clause', 
					'Evasion Moves Clause', 'OHKO Clause', 'Swagger Clause', 'Endless Battle Clause', 
					'Team Preview', 'HP Percentage Mod', 'Sleep Clause Mod', 'Cancel Mod', 'Standard GBU',
					'Standard NatDex'],
		banlist: ['Unreleased', ],
		mod: "benchabilities",
		maxForcedLevel: 50,
		teamLength: {
			validate: [3, 6],
			battle: 3,
		},
		requirePentagon: true,
		
		onBegin: function () {
			let allPokemon = this.p1.pokemon.concat(this.p2.pokemon);
			for (let pokemon of allPokemon) {
				let benchAbility = ''
				let template = pokemon.template
				if (template.abilities.S){
					benchAbility = this.toID(template.abilities.S);
				}
				let battle = pokemon.battle;
				if ( !battle.benchPokemon ) {
					battle.benchPokemon = [];
					// use this function to retrieve a pokemon's info table using their bench ability ( retrieves FIRST pokemon with that ability )
					battle.benchPokemon.getPKMNInfo = function( ability, side ) 
					{ 
						let battle = side.battle
						let allyBench = battle.benchPokemon[ side.id ]
						ability = this.toID( ability )
						for (let i = 0; i < 6; i++ ) {
							let pkmnInfo = allyBench[ i ];
							if ( pkmnInfo && pkmnInfo.ability === ability ) {
								return pkmnInfo;
							}
						}
					};
				}
				let sideID = pokemon.side.id;
				if ( !battle.benchPokemon[ sideID ] ) {
					battle.benchPokemon[ sideID ] = [];
				}
				let allyBench = battle.benchPokemon[ sideID ]
				let pkmnInfo = {}
				// add code here if you need more info about bench pokemon for an ability
				pkmnInfo[ 'id' ] = pokemon.id;
				pkmnInfo[ 'name' ] = pokemon.name;
				pkmnInfo[ 'types' ] = pokemon.types;
				pkmnInfo[ 'ability' ] = benchAbility;
				pkmnInfo[ 'item' ] = pokemon.item;
				//-----------------------------------------------------------------------
				allyBench.push( pkmnInfo )
			}
		},
		onBeforeSwitchIn: function (pokemon) {
			let battle = pokemon.battle;
			let sideID = pokemon.side.id;
			let allyBench = battle.benchPokemon[ sideID ];
			if ( battle.turn === 0 ) {
				for (const ally of pokemon.side.pokemon) {
					for ( var pos in allyBench ) {
						 if ( allyBench[ pos ].id === ally.id 
							|| allyBench[ pos ].id === pokemon.id )
						{					
							 delete allyBench[ pos ];
						}
					}
				}
				//Precocious Pupae move change to Stored Power ----------------------------------
				let precociousPupae = [ 'kakuna', 'metapod', 'silcoon', 'cascoon', 'spewpa' ]
				for (const ally of pokemon.side.pokemon) {
					 if ( precociousPupae.includes( pokemon.speciesid ) 
						&& battle.getPKMNInfo( 'precociouspupae', sideID ))
					{
						console.log( ally.set )
					}
				}
				//-------------------------------------------------------------------------------
			}
			for ( var pos in allyBench ) {  
				let benchAbility = allyBench[ pos ].ability
				if ( benchAbility !== '' ) {
					let effect = 'ability' + benchAbility;
					pokemon.volatiles[effect] = {id: effect, target: pokemon};
				}
			}
		},
		onSwitchInPriority: 2,
		onSwitchIn: function (pokemon) {
			let battle = pokemon.battle;
			let sideID = pokemon.side.id;
			let allyBench = battle.benchPokemon[ sideID ];
			for ( var pos in allyBench) {
				let benchAbility = allyBench[ pos ].ability
				if ( benchAbility !== '' ) {
					let effect = 'ability' + benchAbility;
					delete pokemon.volatiles[effect];
					pokemon.addVolatile(effect);
				}
			}
		},
		onAfterMega: function (pokemon) {
			let battle = pokemon.battle;
			let sideID = pokemon.side.id;
			let allyBench = battle.benchPokemon[ sideID ];
			pokemon.removeVolatile('ability' + pokemon.baseAbility);
			for (var pos in allyBench) {  
				let benchAbility = allyBench[ pos ].ability
				if ( benchAbility !== '' ) {
					let effect = 'ability' + benchAbility;
					pokemon.addVolatile(effect);
				}
			}
		},
	},
  {
		name: "[Gen 8] Blindsided VGC",
		mod: "blindsided",
		desc: [
			`<b>Blindsided</b>: A Pet Mod where users submit Fakemon without knowing the ones other people made.`
		],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/blindsided-slate-1-discussion-and-playtesting.3690242/">Blindsided on Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1VQ2G1bbR3yDVbmmPJAQ7BAqBtGPlmP9u8q3F8Zx26X4">Spreadsheet</a>`,
		],
		gameType: 'doubles',
		forcedLevel: 50,
		teamLength: {
			validate: [4, 6],
			battle: 4,
		},
		ruleset: ['Standard GBU', 'VGC Timer', 'Dynamax Clause', 'Z-Move Clause', 'Data Mod', 'Mega Data Mod'],
		banlist: [
			'All Pokemon',
		],
		unbanlist: [
			'Asubakraken', 'Barad-Jur', 'Batana', 'Boreastra', 'Burrodon', 'Cachanaut', 'Casko', 'Dolphena', 'Dolphure', 'Drasapor', 'Elbalfatross',
			'Faerosion', 'Firenra', 'Frozalisk', 'Gammaroo', 'Gloriode', 'Headrake', 'idk', 'Lunoccyx', 'Minocharge', 'Neuroboxin', 'Nixlean',
			'Niyang', 'Ruinastle', 'Parakinesis', 'Poultergeist', 'Puremaid', 'Rosereve', 'Salava', 'Saltidan', 'Scorpiost', 'Spexel', 'Tactaval',
			'Wendigoul', 'Vesuvenge', 'Vipier', 'Zawa'
		],
	},
	{
		name: "[Gen 8] Clean Slate Tier Shift",
		desc: `Clean slate but we forgot to clean the slate between slates.`,
		threads: [
			// `<a href="https://www.smogon.com/forums/threads/clean-slate-2.3657640/">Clean Slate 2</a>`,
		],
		mod: 'csts',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod'],
		banlist: ['Eviolite'],
		onSwitchIn(pokemon) {
			this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[silent]');
		},
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			for (const set of team) {
				let template = this.dex.getSpecies(set.species);
				let tiers = [ 'CSM', 'CS1', 'CS2' ];
				if ( !tiers.includes( template.tier )) {
					return [set.species + ' is not useable in Clean Slate Tier Shift.'];
				}
			}
		},
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			for (const set of team) {
				let template = this.dex.getSpecies(set.species);
				if (speciesTable[template.name]) {
					return ["You are limited to one of each Pokémon by Species Clause (except for different Rotom formes). ", "You have more than one " + template.baseSpecies + "."];
				}
				speciesTable[template.name] = true;
				let tiers = [ 'CSM', 'CS1', 'CS2' ];
				if ( !tiers.includes( template.tier )) {
					return [set.name + ' is not useable in Clean Slate: Tier Shift.'];
				}
			}
		},
		onModifySpecies(species, target, source, effect) {
			let stats = this.unownStats[ species.id ];
			if (stats) {
				return Object.assign({}, species, 
					{baseStats: stats.baseStats},
					{abilities: stats.abilities},
					{types: stats.types},
				);
			};
			if (!species.baseStats) return;
			const boosts: {[tier: string]: number} = {
				csm: 25,
				cs1: 20,
			};
			const tier = this.toID(species.tier) || 'ou';
			if (!(tier in boosts)) return;
			const pokemon: Species = this.dex.deepClone(species);
			const boost = boosts[tier];
			let statName: StatName;
			for (statName in pokemon.baseStats) {
				if (statName === 'hp') continue;
				pokemon.baseStats[statName] = Utils.clampIntRange(pokemon.baseStats[statName] + boost, 1, 255);
			}
			return pokemon;
		},
		onChangeSet(set) {
			if (set.species === 'Snorlax-Gmax') {
				set.species = 'Snorlax';
			}
		},
	},
	{
		name: "[Gen 8] Crossover Chaos v2 + Expanded Ubers",
		threads: [
				"&bullet; <a href=https://www.smogon.com/forums/threads/crossover-chaos-v2.3636780/>Crossover Chaos v2</a>",
		      "&bullet; <a href=https://www.smogon.com/forums/threads/crossover-chaos-expanded-side-project.3647108/>Crossover Chaos Expanded</a>"],
		ruleset: [ 'Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 
					'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod',
					'Swagger Clause', 'Baton Pass Clause', 'Obtainable', 'Standard NatDex'],
		banlist: [],
		mod: 'crossoverchaos',
		teambuilderFormat: 'Ubers',
	}, 
	{
		name: "[Gen 8] Crossover Chaos Doubles AG",
		gameType: 'doubles',
		threads: [
				"&bullet; <a href=https://www.smogon.com/forums/threads/crossover-chaos-v2.3636780/>Crossover Chaos v2</a>",
		      "&bullet; <a href=https://www.smogon.com/forums/threads/crossover-chaos-expanded-side-project.3647108/>Crossover Chaos Expanded</a>"],
		ruleset: ['Standard NatDex'],
		banlist: [],
		mod: 'crossoverchaos',
	},
	{
		name: "[Gen 7] DLCmons VGC",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/dlcmons-ultra-ultra-beast-movepool-and-design-slate.3673357/">Thread in Pet Mods</a>`,
		],
		ruleset: ['Obtainable', 'Species Clause', 'Nickname Clause', 'Item Clause', 'Team Preview', 'Cancel Mod', 'Dynamax Clause', 'Data Mod', 'Mega Data Mod'],
		banlist: [
			'DUber', 'All Pokemon'
		],
		unbanlist: [
			'Rowlet', 'Dartrix', 'Decidueye', 'Litten', 'Torracat', 'Incineroar', 'Popplio', 'Brionne', 'Primarina', 'Pikipek', 'Trumbeak', 'Toucannon', 'Yungoos', 'Gumshoos',
			'Rattata', 'Raticate', 'Caterpie', 'Metapod', 'Butterfree', 'Ledyba', 'Ledian', 'Spinarak', 'Ariados', 'Buneary', 'Lopunny', 'Inkay', 'Malamar', 'Zorua', 'Zoroark',
			'Furfrou', 'Pichu', 'Pikachu', 'Raichu', 'Grubbin', 'Charjabug', 'Vikavolt', 'Bonsly', 'Sudowoodo', 'Happiny', 'Chansey', 'Blissey', 'Munchlax', 'Snorlax',
			'Slowpoke', 'Slowbro', 'Slowking', 'Wingull', 'Pelipper', 'Abra', 'Kadabra', 'Alakazam', 'Meowth', 'Persian', 'Magnemite', 'Magneton', 'Magnezone', 'Grimer', 'Muk',
			'Mime Jr.', 'Mr. Mime', 'Ekans', 'Arbok', 'Dunsparce', 'Growlithe', 'Arcanine', 'Drowzee', 'Hypno', 'Makuhita', 'Hariyama', 'Smeargle', 'Crabrawler', 'Crabominable',
			'Gastly', 'Haunter', 'Gengar', 'Drifloon', 'Drifblim', 'Murkrow', 'Honchkrow', 'Zubat', 'Golbat', 'Crobat', 'Noibat', 'Noivern', 'Diglett', 'Dugtrio', 'Spearow',
			'Fearow', 'Rufflet', 'Braviary', 'Vullaby', 'Mandibuzz', 'Mankey', 'Primeape', 'Delibird', 'Hawlucha', 'Oricorio', 'Cutiefly',
			'Ribombee', 'Flabébé', 'Floette', 'Florges', 'Petilil', 'Lilligant', 'Cottonee', 'Whimsicott', 'Psyduck', 'Golduck', 'Smoochum', 'Jynx', 'Magikarp', 'Gyarados',
			'Barboach', 'Whiscash', 'Seel', 'Dewgong', 'Machop', 'Machoke', 'Machamp', 'Roggenrola', 'Boldore', 'Gigalith', 'Carbink', 'Sableye', 'Mawile', 'Rockruff',
			'Lycanroc', 'Spinda', 'Tentacool', 'Tentacruel', 'Finneon', 'Lumineon', 'Wishiwashi', 'Luvdisc', 'Corsola', 'Mareanie', 'Toxapex', 'Shellder', 'Cloyster', 'Clamperl',
			'Huntail', 'Gorebyss', 'Remoraid', 'Octillery', 'Mantyke', 'Mantine', 'Bagon', 'Shelgon', 'Salamence', 'Lillipup', 'Herdier', 'Stoutland', 'Eevee', 'Vaporeon',
			'Jolteon', 'Flareon', 'Espeon', 'Umbreon', 'Leafeon', 'Glaceon', 'Sylveon', 'Mareep', 'Flaaffy', 'Ampharos', 'Mudbray', 'Mudsdale', 'Igglybuff', 'Jigglypuff',
			'Wigglytuff', 'Tauros', 'Miltank', 'Surskit', 'Masquerain', 'Dewpider', 'Araquanid', 'Fomantis', 'Lurantis', 'Morelull', 'Shiinotic', 'Paras', 'Parasect', 'Poliwag',
			'Poliwhirl', 'Poliwrath', 'Politoed', 'Goldeen', 'Seaking', 'Basculin', 'Feebas', 'Milotic', 'Alomomola', 'Fletchling', 'Fletchinder', 'Talonflame', 'Salandit',
			'Salazzle', 'Cubone', 'Marowak', 'Kangaskhan', 'Magby', 'Magmar', 'Magmortar', 'Larvesta', 'Volcarona', 'Stufful', 'Bewear', 'Bounsweet', 'Steenee', 'Tsareena',
			'Comfey', 'Pinsir', 'Hoothoot', 'Noctowl', 'Kecleon', 'Oranguru', 'Passimian', 'Goomy', 'Sliggoo', 'Goodra', 'Castform', 'Wimpod', 'Golisopod', 'Staryu', 'Starmie',
			'Sandygast', 'Palossand', 'Omanyte', 'Omastar', 'Kabuto', 'Kabutops', 'Lileep', 'Cradily', 'Anorith', 'Armaldo', 'Cranidos', 'Rampardos', 'Shieldon', 'Bastiodon',
			'Archen', 'Archeops', 'Tirtouga', 'Carracosta', 'Tyrunt', 'Tyrantrum', 'Amaura', 'Aurorus', 'Larvitar', 'Pupitar', 'Tyranitar', 'Phantump', 'Trevenant', 'Natu',
			'Xatu', 'Nosepass', 'Probopass', 'Pyukumuku', 'Chinchou', 'Lanturn', 'Type: Null', 'Silvally', 'Poipole', 'Naganadel', 'Trubbish', 'Garbodor', 'Minccino',
			'Cinccino', 'Pineco', 'Forretress', 'Skarmory', 'Ditto', 'Cleffa', 'Clefairy', 'Clefable', 'Elgyem', 'Beheeyem', 'Minior', 'Beldum', 'Metang', 'Metagross', 'Porygon',
			'Porygon2', 'Porygon-Z', 'Pancham', 'Pangoro', 'Komala', 'Torkoal', 'Turtonator', 'Houndour', 'Houndoom', 'Dedenne', 'Togedemaru', 'Electrike', 'Manectric', 'Elekid',
			'Electabuzz', 'Electivire', 'Geodude', 'Graveler', 'Golem', 'Sandile', 'Krokorok', 'Krookodile', 'Trapinch', 'Vibrava', 'Flygon', 'Gible', 'Gabite', 'Garchomp',
			'Baltoy', 'Claydol', 'Golett', 'Golurk', 'Klefki', 'Mimikyu', 'Shuppet', 'Banette', 'Frillish', 'Jellicent', 'Bruxish', 'Drampa', 'Absol', 'Snorunt', 'Glalie',
			'Froslass', 'Sneasel', 'Weavile', 'Sandshrew', 'Sandslash', 'Vulpix', 'Ninetales', 'Vanillite', 'Vanillish', 'Vanilluxe', 'Scraggy', 'Scrafty', 'Pawniard', 'Bisharp',
			'Snubbull', 'Granbull', 'Shellos', 'Gastrodon', 'Relicanth', 'Dhelmise', 'Carvanha', 'Sharpedo', 'Skrelp', 'Dragalge', 'Clauncher', 'Clawitzer', 'Wailmer', 'Wailord',
			'Lapras', 'Tropius', 'Exeggcute', 'Exeggutor', 'Corphish', 'Crawdaunt', 'Mienfoo', 'Mienshao', 'Jangmo-o', 'Hakamo-o', 'Kommo-o', 'Emolga', 'Scyther', 'Scizor',
			'Heracross', 'Aipom', 'Ambipom', 'Litleo', 'Pyroar', 'Misdreavus', 'Mismagius', 'Druddigon', 'Lickitung', 'Lickilicky', 'Riolu', 'Lucario', 'Dratini', 'Dragonair',
			'Dragonite', 'Aerodactyl', 'Tapu Koko', 'Tapu Koko-Kinolau', 'Tapu Lele', 'Tapu Lele-Kinolau', 'Tapu Bulu', 'Tapu Bulu-Kinolau', 'Tapu Fini', 'Tapu Fini-Kinolau',
			'Nihilego', 'Stakataka', 'Blacephalon', 'Buzzwole', 'Pheromosa', 'Xurkitree', 'Celesteela', 'Kartana', 'Guzzlord', 
			'Necrozma-Base', 'Magearna', 'Zeraora',
			'Diglett-Alola', 'Dugtrio-Alola', 'Exeggutor-Alola', 'Geodude-Alola', 'Graveler-Alola', 'Golem-Alola', 'Grimer-Alola', 'Marowak-Alola', 'Meowth-Alola', 'Muk-Alola',
			'Ninetales-Alola', 'Persian-Alola', 'Raichu-Alola', 'Raticate-Alola', 'Rattata-Alola', 'Sandshrew-Alola', 'Sandslash-Alola', 'Vulpix-Alola',
			'Absol-Mega', 'Aerodactyl-Mega', 'Alakazam-Mega', 'Garchomp-Mega', 'Gyarados-Mega', 'Heracross-Mega', 'Houndoom-Mega', 'Lopunny-Mega', 'Manectric-Mega', 'Mawile-Mega',
			'Pinsir-Mega', 'Sableye-Mega', 'Scizor-Mega', 'Sharpedo-Mega', 'Slowbro-Mega', 'Tyranitar-Mega', 'Ampharos-Mega', 'Glalie-Mega', 'Banette-Mega', 'Camerupt-Mega',
			'Plubia', 'Snoxin', 'Komodond', 'Anglevolt', 'Thundigeist', 'Forsnaken',
			'Chindle', 'Chaldera', 'Flarenix', 'Firmlio', 'Irotyke', 'Coyotalloy', 'Tikilohi',
			'Numel', 'Camerupt', 'Drilbur', 'Excadrill', 'Volcanion', 'Shaymin-Base', 'Heatran', 'Qwilfish', 'Krabby', 'Kingler',
			'Chikorita', 'Bayleef', 'Meganium', 'Cyndaquil', 'Quilava', 'Typhlosion', 'Totodile', 'Croconaw', 'Feraligatr',
			'Arachsoil', 'Sunkern-Alola', 'Sanddern',
			'Kubfu', 'Urshifu-Alola', 'Urshifu-Rapid-Strike-Alola', 'Tynamo', 'Tynamo-Alola', 'Eelektrik', 'Eelektrik-Alola', 'Eelektross', 'Eelektross-Alola', 'Onix', 'Onix-Alola', 
			'Steelix', 'Steelix-Alola', 'Steelix-Mega', 'Steelix-Alola-Mega', 'Shelmet', 'Shelmet-Alola', 'Accelgor', 'Accelgor-Alola', 'Shinobug', 'Falinks-Alola', 'Feebas-Alola', 
			'Milotic-Alola', 'Stethaaina'
		],
		gameType: 'doubles',
		forcedLevel: 50,
		teamLength: {
			validate: [4, 6],
			battle: 4,
		},
		timer: {
			starting: 5 * 60,
			addPerTurn: 0,
			maxPerTurn: 55,
			maxFirstTurn: 90,
			grace: 90,
			timeoutAutoChoose: true,
			dcTimerBank: false,
		},
		minSourceGen: 7,
		mod: 'gen7dlcmons',
		teambuilderFormat: 'Doubles OU',
	},
	{
        name: "[Gen 8] Fusion Evolution DUU",
        mod: "feuu",
        threads: [
            `&bullet; <a href="https://www.smogon.com/forums/threads/fusion-evolution-under-used-submission-slate-3.3674163/">Thread in Pet Mods</a>`
        ],
        gameType: "doubles",
        ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Z-Move Clause', 'Data Mod', 'Mega Data Mod'],
        banlist: [
			'All Pokemon', 'Red Orb', 'Baton Pass', 'Ninjacross + Heracronite', 'Kokovoir + Gardevoirite', 'Salamencite', 'Charizardite Y', 'Blue Orb', 'Wishirupti + Cameruptite', 'Mawilite',
        ],
        unbanlist: [
			'Volquag', 'Toxalure', 'Kingtsar', 'Tanette', 'Slowton', 
			'Flaant', 'Umbat', 'Chomplim', 'Chomplim-Mega', 'Xotalion', 'Miemie', 'Dusking', 'Jelliswine',
			'Pigapult', 'Lycanserker-Dusk', 'Tapu Lop', 'Tapu Lop-Mega', 'Dragontler', 'Eternabat',
			'Grimmlurk', 'Manicuno-Galar', 'Yacian-Crowned', 'Cryogolem', 'Stoudrago',
			'Grousle', 'Dongoro', 'Slurpum', 
			'Corveot', 'Corveot-Mega', 'Igglyzenta-Crowned', 'Arctres-Galar', 'Garborude', 'Noicity', 'Ferros',
			'Landmaldo-Therian', 'Tentoxys-Defense', 'Strikados-Galar', 'Hooporant',
			'Brontun', 'Mesflame', 'Thornbro-Galar', 'Glidol', 'Pincurchitar', 'Pincurchitar-Mega', 'Snortine', 'Flygalge',
			'Absable', 'Absable-Mega-X', 'Absable-Mega-Y', 'Scolisharp', 'Ninjacross', 'Gossephalon', 'Dracodoom', 
			'Dracodoom-Mega', 'Toucosta', 'Weezlord-Galar', 'Sableior', 'Sableior-Mega', 'Sableior-Meteor', 'Sableior-Meteor-Mega', 
			'Eeluk', 'Maroligatr-Alola', 'Frozerade',
			'Hattaka', 'Glasnow', 'Glasnow-Mega', 'Kokovoir', 'Kyottler', 'Clawliwrath',
			'Meloslash', 'Meloslash-Melee', 'Tornachamp', 'Cofazor', 'Cofazor-Mega', 'Talonsyl', 'Heatki', 
			'Sirsola', 'Noze-Dawn-Wings', 'Noze-Ultra', 'Bruxray', 'Kingdeedee', 'Tapu Koma', 'Hawlazzle',
			'Whimsilotic', 'Vullacham', 'Vullacham-Mega', 'Dracolix', 'Dracolix-Mega', 'Serpanadel', 'Accelest', 'Buzzeggutor-Alola',
			'Roaramp', 'Roaramp-Mega', 'Glakiss', 'Glakiss-Mega', 'Leafdon',
			'Crustboar', 'Paracoal', 'Arctovic', 'Altarizard', 'Altarizard-Mega-X', 'Altarizard-Mega', 'Sandamar-Alola', 
			'Jirachonator', 'Dredvul', 'Druddifini', 'Swannamence', 'Tyranette-Eternal',
			'Lurodactyl', 'Lurodactyl-Mega', 'Ninelands-Alola', 'Aurorona', 'Monferpa-Unbound', 'Gigacrab', 'Rosenaught', 'Keclyrex-Shadow',
			'Regibee', 'Regibee-Mega', 'Sigileye', 'Darmearna', 'Mr. Ace', 'Deciduskorch', 'Hypnakart', 'Zerclef',
			'Exeggutor-Prime', 'Porygrigus', 'Golisotops',
			'Avarupt', 'Avarupt-Mega', 'Goatitar', 'Goatitar-Mega', 'Fraxshadow', 'Pherogonga', 'Crawmise', 'Wishirupti',
			
			'Torranadus-Therian', 'Togetops', 'Toxicargo', 'Claylamar', 'Vishitomb', 'Swampflora', 'Swampflora-Mega', 'Swalurchin', 'Serpeblim',
			'Azekrow', 'Trapeino', 'Goodevoir', 'Goodevoir-Mega', 'Duramaw', 'Rhybite', 'Oricolyph-Sensu',
			'Grapplor', 'Masquerajah', 'Litleesect', 'Bearyx', 'Fetchey', 'Audiyem', 'Audiyem-Mega',
			'Eelektoad', 'Dialgast', 'Galsola', 'Galsola-Mega', 'Genebro-Galar', 'Hatterune',
			'Deodon-Attack', 'Sharpiskorch', "Sharpiskorch-Mega", "Gourninja", "Cleracross", "Cleracross-Mega", "Aromarel", "Lycansian",
			'Landowak-Alola', 'Emolggron', 'Emolggron-Mega', 'Metagon', 'Hoopagigas-Unbound', 'Nashifu', 'Cramotricity', 'Raibat', 'Darmanitan-Prime',
			'Zarapex', 'Pingar', 'Pingar-Mega', 'Kommo-tot', 'Rotokyu', 'Krookogatr', 'Venuroar', 'Venuroar-Mega', 'Klefilego', 'Rhychomp-Mega', 'Rhychomp',
			'Mr. Basc', 'Shellicham', 'Shellicham-Mega', 'Manditop', 'Mienpa', 'Vikadrill',  
			
			'Silvino-Bug', 'Silvino-Dark', 'Silvino-Dragon', 'Silvino-Electric', 'Silvino-Fairy', 'Silvino-Fighting',
			'Silvino-Fire', 'Silvino-Flying', 'Silvino-Ghost', 'Silvino-Grass', 'Silvino-Ground', 'Silvino-Ice', 
			'Silvino-Poison', 'Silvino-Psychic', 'Silvino-Rock', 'Silvino-Steel', 'Silvino-Water', 'Silvino',
			
			/*'Silvino-Bug-Mega', 'Silvino-Dark-Mega', 'Silvino-Dragon-Mega', 
			'Silvino-Electric-Mega', 'Silvino-Fairy-Mega', 'Silvino-Fighting-Mega',
			'Silvino-Fire-Mega', 'Silvino-Flying-Mega', 'Silvino-Ghost-Mega', 
			'Silvino-Grass-Mega', 'Silvino-Ground-Mega', 'Silvino-Ice-Mega', 
			'Silvino-Poison-Mega', 'Silvino-Psychic-Mega', 'Silvino-Rock-Mega', 
			'Silvino-Steel-Mega', 'Silvino-Water-Mega',*/ 'Silvino-Mega',
			
			'Litleesect-Douse', 'Litleesect-Shock', 'Litleesect-Burn', 'Litleesect-Chill',
			'Genebro-Galar-Douse', 'Genebro-Galar-Shock', 'Genebro-Galar-Burn', 'Genebro-Galar-Chill',

			'Corveotto', 'Torraaffy', 'Rosadin', 'Mr. Boot-Galar', 'Palpitrik', 'Pikabat', 'Krokocroco', 'Ivycat',
			'Mariwick', 'Krabsweet', 'Slowmite', 'Eebat', 'Gibloon', 'Mieyu', 'Duspoke', 'Frillnub', 'Dreepig', 'Meowruff-Galar', 'Golidimp', 'Panchanpy', 'Shroolix', 'Noixel', 'Pidgeidee', 'Bronlin', 'Seedpoke-Galar', 'Glitoy', 'Munchyke', 'Venipawn', 'Krelpinch', 'Tirtipek', 'Grinamo', 'Cubodile', 'Snodew', 'Claunchiwag', 'Scymask', 'Fletchee', 'Farsola-Galar', 'Cottonas', 'Snipole', 'Maritten', 'Snogepi', 'Hippee', 'Dwepig', 'Parycoly', 'Charblu', 'Inkshrew-Alola', 'Chewkit', 'Duckgon', 'Larvaura', 'Crabrola', 'Chespew', 'Rowlipede', 'Scor Jr.', 'Porymask', 'Wimbuto', 'Larkiddo', 'Bergmel',
			'Croagma', 'Inktoy', 'Sunkip', 'Sniloon', 'Rhyble', 'Goolts', 'Clobbgar', 'Sursfant', 'Hatamask-Galar', 'Tynapole', "Meowruff", "Carvipede", "Froakaboo", "Spritdoof", "Beldino", "Pibat", "Darumaka-Prime", "Totosand", "Bulbalit",
			'Exeggcute',
        ],
    },
	{
		name: "[Gen 8] Fusion Evolution LC",
		mod: "feuu",
		maxLevel: 5,
		desc: [
			`<b>Fusion Evolution Little Cup</b>: A micrometa Pet Mod including the prevoultions of the balanced fusions featured in Fusion Evolution's Lower Tiers.`
		],
		threads: [
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1kMsbcskEBV3cl_Hri6ZWJzPHIFWpEZEzhqJdNg9CW2E/edit#gid=0">Spreadsheet</a>`,
		],
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Z-Move Clause', 'Data Mod', 'Mega Data Mod'],
		banlist: [
			'All Pokemon', 'Baton Pass',
		],
		unbanlist: [
			'Woopopotas', 'Mareapod', 'Bel Jr.', 'Seedbee', 'Stardile', 'Wailidee', 'Treemo-o', 'Eezee', 'Elgyemite', 'Toxoran-Male', 'Porykrelp', 'Crabitten', 'Rowlask-Galar', 'Larvilmet', 'Chimwick',
			'Mariwick', 'Krabsweet', 'Slowmite', 'Eebat', 'Gibloon', 'Mieyu', 'Duspoke', 'Frillnub', 'Dreepig', 'Meowruff-Galar', 'Golidimp', 'Panchanpy', 'Shroolix', 'Noixel', 'Pidgeidee', 'Bronlin', 'Seedpoke-Galar', 'Glitoy', 'Munchyke', 'Venipawn', 'Krelpinch', 'Tirtipek', 'Grinamo', 'Cubodile', 'Snodew', 'Claunchiwag', 'Scymask', 'Fletchee', 'Farsola-Galar', 'Cottonas', 'Snipole', 'Maritten', 'Snogepi', 'Hippee', 'Dwepig', 'Parycoly', 'Charblu', 'Inkshrew-Alola', 'Chewkit', 'Duckgon', 'Larvaura', 'Crabrola', 'Chespew', 'Rowlipede', 'Scor Jr.', 'Porymask', 'Wimbuto', 'Larkiddo', 'Bergmel',
			'Croagma', 'Inktoy', 'Sunkip', 'Sniloon', 'Rhyble', 'Goolts', 'Clobbgar', 'Sursfant', 'Hatamask-Galar', 'Tynapole', "Meowruff", "Carvipede", "Froakaboo", "Spritdoof", "Beldino", "Pibat", "Darumaka-Prime", "Totosand", "Bulbalit",
			'Ferros', 'Trapeino', 'Exeggcute',
		],
	},
	{
		name: "[Gen 3] Hoenn Gaiden UU",
		desc: ["<b>Hoenn Gaiden</b>: A Gen 3 pet mod that aims to devamp Gen 4-8 Pokemon, moves and items into the Gen 3 mechanics."],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/hoenn-gaiden-the-gen-3-pet-mod-round-1-discussion.3681339/">Hoenn Gaiden on Smogon Forums</a>`,
		],

		mod: 'gen3hoenngaiden',
		searchShow: false,
		ruleset: ['Standard', 'Data Mod', 'Hoenn Gaiden Mod'],
		banlist: ['Uber', 'OU', 'UUBL', 'Snow Warning', 'Past'],
		unbanlist: [
			//Abilities
			'Sand Veil', 'Snow Warning', 'RKS System', 'Ice Body', 'Magic Guard', 'Galvanize', 'Overcoat', 'Desolate Land', 'Mold Breaker', 'Gulp Missile', 'Analytic', 'Protean', 'Neutralizing Gas',
			
			//Pokémon
			'Snover', 'Abomasnow', 'Gliscor', 'Frillish', 'Jellicent', 'Tynamo', 'Eelektrik', 'Eelektross', 'Cryogonal', 'Type: Null', 'Silvally', 'Silvally-Bug', 'Silvally-Dark',
			'Silvally-Dragon', 'Silvally-Electric', 'Silvally-Fighting', 'Silvally-Fire', 'Silvally-Flying', 'Silvally-Ghost', 'Silvally-Grass', 'Silvally-Ground', 'Silvally-Ice', 
			'Silvally-Poison', 'Silvally-Psychic', 'Silvally-Rock', 'Silvally-Steel', 'Silvally-Water', 'Golett', 'Golurk', 'Geodude-Alola', 'Graveler-Alola', 'Golem-Alola', 'Croagunk', 
			'Toxicroak', 'Crabrawler', 'Crabominable', 'Starly', 'Staravia', 'Staraptor', 'Fletchling', 'Fletchinder', 'Talonflame', 'Mawile', 'Stunky', 'Skuntank', 'Sylveon', 'Zarude',
			'Zarude-Dada', 'Buneary', 'Lopunny', 'Chespin', 'Quilladin', 'Chesnaught', 'Cramorant', 'Guzzlord',
			'Litten', 'Torracat', 'Incineroar', 'Mr. Mime-Galar', 'Mr. Rime', 'Uxie', 'Mime Jr.', 'Glaceon',
			'Dracovish', 'Slowpoke-Galar', 'Slowking-Galar', 'Marowak-Alola', 'Marowak-Alola-Totem',
			'Regieleki', 'Milcery', 'Alcremie',
			'Mamoswine', 'Roserade', 'Leafeon', 'Dusknoir', 'Slowbro-Galar', 'Mismagius', 'Honchkrow', 'Budew', 'Ambipom', 'Chingling', 'Munchlax', 'Weavile', 'Happiny', 'Lickilicky', 'Rhyperior', 'Tangrowth', 'Electivire', 'Magmortar', 'Togekiss', 'Yanmega', 'Porygon-Z', 'Magnezone', 'Gallade', 'Froslass', 'Probopass',
			'Rattata-Alola', 'Raticate-Alola', 'Raichu-Alola', 'Dugtrio-Alola', 'Persian-Alola', 'Diglett-Alola', 'Meowth-Alola', 'Meowth-Galar', 'Perrserker', 'Grimer-Alola', 'Muk-Alola', 'Exeggutor-Alola', 'Farfetchd-Galar', 'Weezing-Galar', 'Zigzagoon-Galar', 'Linoone-Galar', 'Corsola-Galar', 'Cursola', 'Obstagoon', 'Sirfetchd', 'Zapdos-Galar', 'Articuno-Galar', 'Moltres-Galar', 'Vulpix-Alola', 'Ninetales-Alola', 'Sandshrew-Alola', 'Sandslash-Alola', 'Ponyta-Galar', 'Rapidash-Galar',
			'Mantyke', 'Bonsly',
			'Stunfisk', 'Stunfisk-Galar', 'Regidrago', 'Skrelp', 'Dragalge', 'Sandile', 'Krokorok', 'Krookodile', 'Wimpod', 'Golisopod', 'Impidimp', 'Morgrem', 'Grimmsnarl', 'Pincurchin',
			
			//Moves
			'Multi-Attack', 'Ice Hammer', 'Acrobatics', 'Lunge', 'Foul Play', 'Spiky Shield', 'Sucker Punch', 'Jungle Healing', 'Ice Shard', 'Body Press', 'Boomburst', 'Spirit Break',
			
			//Items
			'Expert Belt', 'Occa Berry', 'Passho Berry', 'Wacan Berry', 'Rindo Berry', 'Yache Berry', 'Chople Berry', 'Kebia Berry', 'Shuca Berry', 'Coba Berry', 'Payapa Berry', 'Tanga Berry', 
			'Charti Berry', 'Kasib Berry', 'Haban Berry', 'Colbur Berry', 'Babiri Berry', 'Chilan Berry', 'Custap Berry', 'Air Balloon',
		],
		teambuilderFormat: 'UU',
	},
	{
		name: "[Gen 3] Hoenn Gaiden Uber",
		desc: ["<b>Hoenn Gaiden</b>: A Gen 3 pet mod that aims to devamp Gen 4-8 Pokemon, moves and items into the Gen 3 mechanics."],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/hoenn-gaiden-the-gen-3-pet-mod-round-1-discussion.3681339/">Hoenn Gaiden on Smogon Forums</a>`,
		],

		mod: 'gen3hoenngaiden',
		searchShow: false,
		ruleset: ['Standard', 'Data Mod', 'Hoenn Gaiden Mod'],
		banlist: ['Wobbuffet + Leftovers', 'Past'],		
		unbanlist: [
			//Abilities
			'Sand Veil', 'Snow Warning', 'RKS System', 'Ice Body', 'Magic Guard', 'Galvanize', 'Overcoat', 'Desolate Land', 'Mold Breaker', 'Gulp Missile', 'Analytic', 'Protean', 'Neutralizing Gas',
			
			//Pokémon
			'Snover', 'Abomasnow', 'Gliscor', 'Frillish', 'Jellicent', 'Tynamo', 'Eelektrik', 'Eelektross', 'Cryogonal', 'Type: Null', 'Silvally', 'Silvally-Bug', 'Silvally-Dark',
			'Silvally-Dragon', 'Silvally-Electric', 'Silvally-Fighting', 'Silvally-Fire', 'Silvally-Flying', 'Silvally-Ghost', 'Silvally-Grass', 'Silvally-Ground', 'Silvally-Ice', 
			'Silvally-Poison', 'Silvally-Psychic', 'Silvally-Rock', 'Silvally-Steel', 'Silvally-Water', 'Golett', 'Golurk', 'Geodude-Alola', 'Graveler-Alola', 'Golem-Alola', 'Croagunk', 
			'Toxicroak', 'Crabrawler', 'Crabominable', 'Starly', 'Staravia', 'Staraptor', 'Fletchling', 'Fletchinder', 'Talonflame', 'Mawile', 'Stunky', 'Skuntank', 'Sylveon', 'Zarude',
			'Zarude-Dada', 'Buneary', 'Lopunny', 'Chespin', 'Quilladin', 'Chesnaught', 'Cramorant', 'Guzzlord',
			'Litten', 'Torracat', 'Incineroar', 'Mr. Mime-Galar', 'Mr. Rime', 'Uxie', 'Mime Jr.', 'Glaceon',
			'Dracovish', 'Slowpoke-Galar', 'Slowking-Galar', 'Marowak-Alola', 'Marowak-Alola-Totem',
			'Regieleki', 'Milcery', 'Alcremie',
			'Mamoswine', 'Roserade', 'Leafeon', 'Dusknoir', 'Slowbro-Galar', 'Mismagius', 'Honchkrow', 'Budew', 'Ambipom', 'Chingling', 'Munchlax', 'Weavile', 'Happiny', 'Lickilicky', 'Rhyperior', 'Tangrowth', 'Electivire', 'Magmortar', 'Togekiss', 'Yanmega', 'Porygon-Z', 'Magnezone', 'Gallade', 'Froslass', 'Probopass',
			'Rattata-Alola', 'Raticate-Alola', 'Raichu-Alola', 'Dugtrio-Alola', 'Persian-Alola', 'Diglett-Alola', 'Meowth-Alola', 'Meowth-Galar', 'Perrserker', 'Grimer-Alola', 'Muk-Alola', 'Exeggutor-Alola', 'Farfetchd-Galar', 'Weezing-Galar', 'Zigzagoon-Galar', 'Linoone-Galar', 'Corsola-Galar', 'Cursola', 'Obstagoon', 'Sirfetchd', 'Zapdos-Galar', 'Articuno-Galar', 'Moltres-Galar', 'Vulpix-Alola', 'Ninetales-Alola', 'Sandshrew-Alola', 'Sandslash-Alola', 'Ponyta-Galar', 'Rapidash-Galar',
			'Mantyke', 'Bonsly',
			'Stunfisk', 'Stunfisk-Galar', 'Regidrago', 'Skrelp', 'Dragalge', 'Sandile', 'Krokorok', 'Krookodile', 'Wimpod', 'Golisopod', 'Impidimp', 'Morgrem', 'Grimmsnarl', 'Pincurchin',
			
			//Moves
			'Multi-Attack', 'Ice Hammer', 'Acrobatics', 'Lunge', 'Foul Play', 'Spiky Shield', 'Sucker Punch', 'Jungle Healing', 'Ice Shard', 'Body Press', 'Boomburst', 'Spirit Break',
			
			//Items
			'Expert Belt', 'Occa Berry', 'Passho Berry', 'Wacan Berry', 'Rindo Berry', 'Yache Berry', 'Chople Berry', 'Kebia Berry', 'Shuca Berry', 'Coba Berry', 'Payapa Berry', 'Tanga Berry', 
			'Charti Berry', 'Kasib Berry', 'Haban Berry', 'Colbur Berry', 'Babiri Berry', 'Chilan Berry', 'Custap Berry', 'Air Balloon',
		],
		teambuilderFormat: 'Uber',
	},
	/*
	{
		name: "[Gen 8] M4A Doubles",
		desc: ["&bullet; Megas for All v7 but it's a doubles format",
		      ],
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Freeze Clause Mod', 'Mega Data Mod'],
		banlist: [
			'Mewtwo', 'Lugia', 'Ho-Oh', 'Kyogre', 'Groudon', 'Rayquaza', 'Jirachi', 'Dialga', 'Palkia', 'Giratina',
			'Giratina-Origin', 'Arceus', 'Volcarona', 'Reshiram', 'Zekrom', 'Kyurem-Black', 'Kyurem-White', 'Xerneas',
			'Yveltal', 'Solgaleo', 'Lunala', 'Magearna', 'Marshadow', 'Necrozma-Dusk Mane', 'Necrozma-Dawn Wings',
			'Zacian', 'Zacian-Crowned', 'Zamazenta', 'Zamazenta-Crowned', 'Eternatus', 'Urshifu', 'Calyrex-Ice', 'Calyrex-Shadow',
		],
		mod: 'm4av6',
		gameType: 'doubles',
		searchShow: false,
	},
*/
	{
		name: "[Gen 8] M4A UU",
		desc: ["Megas for All v7 but it's Natdex UU",
		      ],
		threads: [
				`&bullet; <a href="https://www.smogon.com/forums/threads/megas-for-all-v7-slate-33-electrode-golurk-and-silvally-please-read-the-first-post-fully-playable-through-slate-32.3671140/">Megas for All v7 on Smogon Forums</a>`,
				`&bullet; <a href="https://docs.google.com/spreadsheets/d/1TdeAUUtjh0f_tcIBllbF_imgepwV-dV2YomoTCRlPgI/edit?usp=sharing">Spreadsheet</a>`,
				`&bullet; <a href="http://megasforall.wikidot.com/">Wiki</a>`
		      ],
		ruleset: ['Standard NatDex', 'Standard M4A', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Freeze Clause Mod', 'Mega Data Mod'],
		banlist: [
			'OU', 'UUBL',
			// Abilities
			'Drizzle', 'Drought',
		],
		mod: 'm4auu',
		// teambuilderFormat: 'UU',
	},
	{
		name: "[Gen 8] M4A VGC",
		desc: ["Megas for All v7 but it's a VGC format",
		      ],
		threads: [
				`&bullet; <a href="https://www.smogon.com/forums/threads/3671140/">Megas for All v7 on Smogon Forums</a>`,
				`&bullet; <a href="https://docs.google.com/spreadsheets/d/1TdeAUUtjh0f_tcIBllbF_imgepwV-dV2YomoTCRlPgI/edit?usp=sharing">Spreadsheet</a>`,
				`&bullet; <a href="http://megasforall.wikidot.com/">Wiki</a>`
		      ],
		gameType: 'doubles',
		forcedLevel: 50,
		teamLength: {
			validate: [4, 6],
			battle: 4,
		},
		ruleset: ['Standard GBU', '+Unobtainable', '+Past', 'VGC Timer', 'Dynamax Clause', 'Mega Data Mod'],
		mod: 'm4av6',
		// teambuilderFormat: 'S',
		onValidateSet(set) {
			// These Pokemon are still unobtainable
			const unobtainables = [
				'Eevee-Starter', 'Floette-Eternal', 'Pichu-Spiky-eared', 'Pikachu-Belle', 'Pikachu-Cosplay', 'Pikachu-Libre',
				'Pikachu-PhD', 'Pikachu-Pop-Star', 'Pikachu-Rock-Star', 'Pikachu-Starter', 'Eternatus-Eternamax',
			];
			const species = this.dex.getSpecies(set.species);
			if (unobtainables.includes(species.name)) {
				if (this.ruleTable.has(`+pokemon:${species.id}`)) return;
				return [`${set.name || set.species} does not exist in the National Dex.`];
			}
			if (species.tier === "Unreleased") {
				const basePokemon = this.toID(species.baseSpecies);
				if (this.ruleTable.has(`+pokemon:${species.id}`) || this.ruleTable.has(`+basepokemon:${basePokemon}`)) {
					return;
				}
				return [`${set.name || set.species} does not exist in the National Dex.`];
			}
		},
	},
	{
		name: "[Gen 8] M4A VGC Restricted",
		desc: ["Megas for All v7 but it's a VGC format",
		      ],
		threads: [
				`&bullet; <a href="https://www.smogon.com/forums/threads/3671140/">Megas for All v7 on Smogon Forums</a>`,
				`&bullet; <a href="https://docs.google.com/spreadsheets/d/1TdeAUUtjh0f_tcIBllbF_imgepwV-dV2YomoTCRlPgI/edit?usp=sharing">Spreadsheet</a>`,
				`&bullet; <a href="http://megasforall.wikidot.com/">Wiki</a>`
		      ],
		searchShow: false,
		gameType: 'doubles',
		forcedLevel: 50,
		teamLength: {
			validate: [4, 6],
			battle: 4,
		},
		banlist: [
			'Battle Bond',
			'Mew', 'Celebi', 'Jirachi', 'Deoxys', 'Phione', 'Manaphy', 'Darkrai', 'Shaymin', 'Arceus', 'Victini', 'Keldeo', 'Meloetta',
			'Genesect', 'Diancie', 'Hoopa', 'Volcanion', 'Magearna', 'Marshadow', 'Zeraora', 'Meltan', 'Melmetal', 'Zarude',
			'Mewtwonite X', 'Mewtwonite Y', 'Blue Orb', 'Red Orb', 'Dragon Ascent',
		],
		restricted: [
			'Mewtwo', 'Ho-Oh', 'Lugia', 'Kyogre', 'Groudon', 'Rayquaza', 'Dialga', 'Palkia', 'Giratina', 'Reshiram', 'Zekrom', 'Kyurem',
			'Xerneas', 'Yveltal', 'Zygarde', 'Cosmog', 'Cosmoem', 'Solgaleo', 'Lunala', 'Necrozma', 'Zacian', 'Zamazenta', 'Eternatus',
			'Calyrex',
		],
		ruleset: ['Obtainable', 'Team Preview', 'Species Clause', 'Nickname Clause', 'Item Clause', 'Cancel Mod', '+Unobtainable', '+Past', 'VGC Timer', 'Dynamax Clause', 'Mega Data Mod'],
		mod: 'm4av6',
		// teambuilderFormat: 'Restricted',
		onValidateTeam(team) {
			const restrictedSpecies = [];
			for (const set of team) {
				const species = this.dex.getSpecies(set.species);
				if (this.ruleTable.isRestrictedSpecies(species)) restrictedSpecies.push(species.name);
			}
			if (restrictedSpecies.length > 1) {
				return [`You can only use up to one restricted Pok\u00E9mon (you have: ${restrictedSpecies.join(', ')})`];
			}
		},
		onValidateSet(set) {
			// These Pokemon are still unobtainable
			const unobtainables = [
				'Eevee-Starter', 'Floette-Eternal', 'Pichu-Spiky-eared', 'Pikachu-Belle', 'Pikachu-Cosplay', 'Pikachu-Libre',
				'Pikachu-PhD', 'Pikachu-Pop-Star', 'Pikachu-Rock-Star', 'Pikachu-Starter', 'Eternatus-Eternamax',
			];
			const species = this.dex.getSpecies(set.species);
			if (unobtainables.includes(species.name)) {
				if (this.ruleTable.has(`+pokemon:${species.id}`)) return;
				return [`${set.name || set.species} does not exist in the National Dex.`];
			}
			if (species.tier === "Unreleased") {
				const basePokemon = this.toID(species.baseSpecies);
				if (this.ruleTable.has(`+pokemon:${species.id}`) || this.ruleTable.has(`+basepokemon:${basePokemon}`)) {
					return;
				}
				return [`${set.name || set.species} does not exist in the National Dex.`];
			}
		},
	},
	{
		name: "[Gen 8] M4A Spooky Cup",
		desc: ["Megas for All v7 but it's a VGC format but it's October",
		      ],
		threads: [
				`&bullet; <a href="https://www.smogon.com/forums/threads/3671140/">Megas for All v7 on Smogon Forums</a>`,
				`&bullet; <a href="https://docs.google.com/spreadsheets/d/1TdeAUUtjh0f_tcIBllbF_imgepwV-dV2YomoTCRlPgI/edit?usp=sharing">Spreadsheet</a>`,
				`&bullet; <a href="http://megasforall.wikidot.com/">Wiki</a>`
		      ],
		gameType: 'doubles',
		forcedLevel: 50,
		teamLength: {
			validate: [4, 6],
			battle: 4,
		},
		ruleset: ['Obtainable', 'Team Preview', 'Species Clause', 'Nickname Clause', 'Item Clause', 'Cancel Mod', '+Unobtainable', '+Past', 'VGC Timer', 'Dynamax Clause', 'Mega Data Mod'],
		banlist: ['All Pokemon'],
		unbanlist: [
			'Rattata-Base', 'Rattata-Alola', 'Raticate-Base', 'Raticate-Alola', 'Ekans', 'Arbok', 'Pikachu', 'Clefable', 'Zubat', 'Golbat', 'Vileplume', 'Paras', 'Parasect',
			'Meowth-Alola', 'Persian-Alola', 'Victreebel', 'Tentacool', 'Tentacruel', 'Grimer', 'Grimer-Alola', 'Muk', 'Muk-Alola', 'Gastly', 'Haunter', 'Gengar', 'Drowzee',
			'Hypno', 'Cubone', 'Marowak', 'Marowak-Alola', 'Koffing', 'Weezing', 'Weezing-Galar', 'Tangela', 'Mr. Mime', 'Pinsir', 'Ditto', 'Eevee', 'Vaporeon', 'Omanyte',
			'Omastar', 'Kabuto', 'Kabutops', 'Aerodactyl', 'Hoothoot', 'Noctowl', 'Spinarak', 'Ariados', 'Crobat', 'Espeon', 'Umbreon', 'Murkrow', 'Slowking-Galar', 'Misdreavus',
			'Unown', 'Wobbuffet', 'Gligar', 'Granbull', 'Sneasel', 'Corsola-Galar', 'Houndour', 'Houndoom', 'Mightyena', 'Zigzagoon-Galar', 'Linoone-Galar', 'Dustox', 'Shiftry',
			'Shedinja', 'Whismur', 'Loudred', 'Exploud', 'Sableye', 'Mawile', 'Gulpin', 'Swalot', 'Carvanha', 'Sharpedo', 'Cacnea', 'Cacturne', 'Zangoose', 'Seviper', 'Lunatone',
			'Crawdaunt', 'Baltoy', 'Claydol', 'Shuppet', 'Banette', 'Duskull', 'Dusclops', 'Absol', 'Snorunt', 'Glalie', 'Huntail', 'Drifloon', 'Drifblim', 'Mismagius',
			'Honchkrow', 'Stunky', 'Skuntank', 'Spiritomb', 'Skorupi', 'Drapion', 'Croagunk', 'Toxicroak', 'Carnivine', 'Abomasnow', 'Weavile', 'Tangrowth', 'Electivire',
			'Magmortar', 'Yanmega', 'Gliscor', 'Dusknoir', 'Froslass', 'Rotom', 'Purrloin', 'Liepard', 'Simisear', 'Gigalith', 'Woobat', 'Swoobat', 'Leavanny', 'Venipede',
			'Whirlipede', 'Scolipede', 'Basculin', 'Krokorok', 'Krookodile', 'Yamask', 'Yamask-Galar', 'Cofagrigus', 'Trubbish', 'Garbodor', 'Zorua', 'Zoroark', 'Gothita',
			'Gothorita', 'Gothitelle', 'Deerling-Autumn', 'Sawsbuck-Autumn', 'Frillish', 'Jellicent', 'Joltik', 'Galvantula', 'Klink', 'Klang', 'Klinklang', 'Elgyem', 'Beheeyem',
			'Litwick', 'Lampent', 'Chandelure', 'Golett', 'Golurk', 'Bisharp', 'Vullaby', 'Mandibuzz', 'Zweilous', 'Hydreigon', 'Larvesta', 'Volcarona', 'Fennekin', 'Braixen',
			'Delphox', 'Pancham', 'Pangoro', 'Espurr', 'Meowstic', 'Meowstic-F', 'Honedge', 'Doublade', 'Aegislash', 'Swirlix', 'Slurpuff', 'Spritzee', 'Aromatisse', 'Malamar',
			'Hawlucha', 'Phantump', 'Trevenant', 'Pumpkaboo', 'Gourgeist', 'Noibat', 'Noivern', 'Decidueye', 'Incineroar', 'Lycanroc-Midnight', 'Mareanie', 'Toxapex', 'Dewpider',
			'Araquanid', 'Shiinotic', 'Salandit', 'Salazzle', 'Stufful', 'Bewear', 'Golisopod', 'Sandygast', 'Palossand', 'Type: Null', 'Silvally', 'Mimikyu', 'Dhelmise',
			'Nihilego', 'Xurkitree', 'Guzzlord', 'Poipole', 'Naganadel', 'Blacephalon', 'Inteleon', 'Corviknight', 'Blipbug', 'Dottler', 'Orbeetle', 'Nickit', 'Thievul',
			'Coalossal', 'Sizzlipede', 'Centiskorch', 'Sinistea', 'Polteageist', 'Hatenna', 'Hattrem', 'Hatterene', 'Impidimp', 'Morgrem', 'Grimmsnarl', 'Obstagoon', 'Cursola',
			'Runerigus', 'Pincurchin', 'Dracovish', 'Dreepy', 'Drakloak', 'Dragapult', 'Spectrier',
		],
		mod: 'm4av6',
		teambuilderFormat: 'Doubles OU',
		onValidateSet(set) {
			// These Pokemon are still unobtainable
			const unobtainables = [
				'Eevee-Starter', 'Floette-Eternal', 'Pichu-Spiky-eared', 'Pikachu-Belle', 'Pikachu-Cosplay', 'Pikachu-Libre',
				'Pikachu-PhD', 'Pikachu-Pop-Star', 'Pikachu-Rock-Star', 'Pikachu-Starter', 'Eternatus-Eternamax',
			];
			const offseason = [
				'Deerling', 'Deerling-Summer', 'Deerling-Winter',
				'Sawsbuck', 'Sawsbuck-Summer', 'Sawsbuck-Winter',
			];
			const species = this.dex.getSpecies(set.species);
			if (unobtainables.includes(species.name)) {
				if (this.ruleTable.has(`+pokemon:${species.id}`)) return;
				return [`${set.name || set.species} does not exist in the National Dex.`];
			}
			if (offseason.includes(species.name)) {
				if (this.ruleTable.has(`+pokemon:${species.id}`)) return;
				return [`${set.name || set.species} is not spooky enough! Try fall colors instead. .w.`];
			}
			if (species.tier === "Unreleased") {
				const basePokemon = this.toID(species.baseSpecies);
				if (this.ruleTable.has(`+pokemon:${species.id}`) || this.ruleTable.has(`+basepokemon:${basePokemon}`)) {
					return;
				}
				return [`${set.name || set.species} does not exist in the National Dex.`];
			}
		},
	},
	{
		name: "[Gen 8] M4A Sandbox",
		desc: ["Megas for All v7 but it's Custom Game. Add custom typings and stats via Sandbox Mod!",
		      ],
		threads: [
				`&bullet; <a href="https://docs.google.com/document/d/1hhF49OIQKot72C30mCzSwxYgb3Ephhm9KCL_nMPrCW0/edit">Sandbox Mod Usage Guide</a>`,
				`&bullet; <a href="https://www.smogon.com/forums/threads/megas-for-all-v7-slate-33-electrode-golurk-and-silvally-please-read-the-first-post-fully-playable-through-slate-32.3671140/">Megas for All v7 on Smogon Forums</a>`,
				`&bullet; <a href="https://docs.google.com/spreadsheets/d/1TdeAUUtjh0f_tcIBllbF_imgepwV-dV2YomoTCRlPgI/edit?usp=sharing">Spreadsheet</a>`,
				`&bullet; <a href="http://megasforall.wikidot.com/">Wiki</a>`
		      ],
		searchShow: false,
		// now intended as a custom game-esque format with more freedom for testing
		ruleset: ['Team Preview', 'Cancel Mod', 'HP Percentage Mod', 'OHKO Clause', 'Evasion Moves Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Freeze Clause Mod', 'Mega Data Mod', 'Sandbox Mod', 'Overflow Stat Mod'],
		mod: 'm4asandbox',
	},
	{
		name: "[Gen 8] M4A Sandierbox",
		desc: ["Megas for All v7 but it's Custom Game. Add custom typings and stats via Sandbox Mod! + Test Abilities",
		      ],
		threads: [
				`&bullet; <a href="https://docs.google.com/document/d/1hhF49OIQKot72C30mCzSwxYgb3Ephhm9KCL_nMPrCW0/edit">Sandbox Mod Usage Guide</a>`,
				`&bullet; <a href="https://www.smogon.com/forums/threads/megas-for-all-v7-slate-33-electrode-golurk-and-silvally-please-read-the-first-post-fully-playable-through-slate-32.3671140/">Megas for All v7 on Smogon Forums</a>`,
				`&bullet; <a href="https://docs.google.com/spreadsheets/d/1TdeAUUtjh0f_tcIBllbF_imgepwV-dV2YomoTCRlPgI/edit?usp=sharing">Spreadsheet</a>`,
				`&bullet; <a href="http://megasforall.wikidot.com/">Wiki</a>`
		      ],
		searchShow: false,
		// now intended as a custom game-esque format with more freedom for testing
		ruleset: ['Team Preview', 'Cancel Mod', 'HP Percentage Mod', 'OHKO Clause', 'Evasion Moves Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Freeze Clause Mod', 'Mega Data Mod', 'Sandbox Mod', 'Overflow Stat Mod'],
		mod: 'm4asandierbox',
	},
	{
		name: "[Gen 8] M4A VGC Sandbox",
		desc: ["Megas for All v7 but it's a VGC format but it's Custom Game. Add custom typings and stats via Sandbox Mod!",
		      ],
		threads: [
				`&bullet; <a href="https://docs.google.com/document/d/1hhF49OIQKot72C30mCzSwxYgb3Ephhm9KCL_nMPrCW0/edit">Sandbox Mod Usage Guide</a>`,
				`&bullet; <a href="https://www.smogon.com/forums/threads/megas-for-all-v7-slate-33-electrode-golurk-and-silvally-please-read-the-first-post-fully-playable-through-slate-32.3671140/">Megas for All v7 on Smogon Forums</a>`,
				`&bullet; <a href="https://docs.google.com/spreadsheets/d/1TdeAUUtjh0f_tcIBllbF_imgepwV-dV2YomoTCRlPgI/edit?usp=sharing">Spreadsheet</a>`,
				`&bullet; <a href="http://megasforall.wikidot.com/">Wiki</a>`
		      ],
		// now intended as a custom game-esque format with more freedom for testing
		mod: 'm4asandbox',
		searchShow: false,
		gameType: 'doubles',
		forcedLevel: 50,
		teamLength: {
			validate: [4, 6],
			battle: 4,
		},
		ruleset: ['Team Preview', 'Cancel Mod', 'VGC Timer', 'Mega Data Mod', 'Sandbox Mod', 'Overflow Stat Mod'],
		teambuilderFormat: 'Doubles OU',
	},
	{
		name: "[Gen 8] M4A VGC Sandierbox",
		desc: ["Megas for All v7 but it's a VGC format but it's Custom Game. Add custom typings and stats via Sandbox Mod! + Test Abilities",
		      ],
		threads: [
				`&bullet; <a href="https://docs.google.com/document/d/1hhF49OIQKot72C30mCzSwxYgb3Ephhm9KCL_nMPrCW0/edit">Sandbox Mod Usage Guide</a>`,
				`&bullet; <a href="https://www.smogon.com/forums/threads/megas-for-all-v7-slate-33-electrode-golurk-and-silvally-please-read-the-first-post-fully-playable-through-slate-32.3671140/">Megas for All v7 on Smogon Forums</a>`,
				`&bullet; <a href="https://docs.google.com/spreadsheets/d/1TdeAUUtjh0f_tcIBllbF_imgepwV-dV2YomoTCRlPgI/edit?usp=sharing">Spreadsheet</a>`,
				`&bullet; <a href="http://megasforall.wikidot.com/">Wiki</a>`
		      ],
		// now intended as a custom game-esque format with more freedom for testing
		mod: 'm4asandierbox',
		searchShow: false,
		gameType: 'doubles',
		forcedLevel: 50,
		teamLength: {
			validate: [4, 6],
			battle: 4,
		},
		ruleset: ['Team Preview', 'Cancel Mod', 'VGC Timer', 'Mega Data Mod', 'Sandbox Mod', 'Overflow Stat Mod'],
		teambuilderFormat: 'Doubles OU',
	},
/*
	{
		name: "[Gen 8] M4A Suspect",
		desc: ["Megas for All v7 with specific unbans for upcoming suspects",
		      ],
		threads: [
				`&bullet; <a href="https://www.smogon.com/forums/threads/megas-for-all-v7-slate-33-electrode-golurk-and-silvally-please-read-the-first-post-fully-playable-through-slate-32.3671140/">Megas for All v7 on Smogon Forums</a>`,
				`&bullet; <a href="https://docs.google.com/spreadsheets/d/1TdeAUUtjh0f_tcIBllbF_imgepwV-dV2YomoTCRlPgI/edit?usp=sharing">Spreadsheet</a>`,
				`&bullet; <a href="http://megasforall.wikidot.com/">Wiki</a>`
		      ],
		ruleset: ['Standard NatDex', 'Standard M4A', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Freeze Clause Mod', 'Mega Data Mod'],
		mod: 'm4av6',
		searchShow: false,
	},
*/
	{
		name: "[Gen 8] Mix and M4A",
		desc: `Mega Evolve any Pokémon with any Mega Stone and no limit. Boosts based on Mega Evolution from Megas for All v7.`,
		threads: [
				`&bullet; <a href="https://www.smogon.com/forums/threads/megas-for-all-v7-slate-33-electrode-golurk-and-silvally-please-read-the-first-post-fully-playable-through-slate-32.3671140/">Megas for All v7 on Smogon Forums</a>`,
				`&bullet; <a href="https://docs.google.com/spreadsheets/d/1TdeAUUtjh0f_tcIBllbF_imgepwV-dV2YomoTCRlPgI/edit?usp=sharing">Spreadsheet</a>`,
				`&bullet; <a href="http://megasforall.wikidot.com/">Wiki</a>`
		      ],
		mod: 'mnm4a',
		searchShow: false,
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Freeze Clause Mod', 'Overflow Stat Mod', 'Mega Data Mod'],
		banlist: [
			'Calyrex-Shadow', 'Zacian-Crowned',
			'Beedrillite', 'Blazikenite', 'Gengarite', 'Kangaskhanite', 'Mawilite', 'Medichamite', 'Pidgeotite',
			'Araquanite', 'Bastiodite', 'Butterfrite', 'Delibirdite', 'Electrodite', 'Gourgeite', 'Gumshoosite', 'Klinklite', 'Leavannite', 'Lurantisite', 'Luxrite', 'Meowsticite',
			'Parasite', 'Talonflite',
			'Moody', 'Shadow Tag', 'Baton Pass', 'Electrify',
		],
		restricted: [
			'Arceus', 'Blissey', 'Calyrex-Ice', 'Deoxys-Attack', 'Deoxys-Base', 'Dialga', 'Eternatus', 'Gengar', 'Giratina', 'Groudon', 'Ho-Oh', 'Kyogre',
			'Kyurem-Black', 'Kyurem-White', 'Lugia', 'Lunala', 'Marshadow', 'Melmetal', 'Mewtwo', 'Naganadel', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane',
			'Palkia', 'Rayquaza', 'Regigigas', 'Reshiram', 'Slaking', 'Xerneas', 'Yveltal', 'Zacian', 'Zekrom', 'Zygarde-Complete',
		],
		onValidateTeam(team) {
			const itemTable = new Set<ID>();
			for (const set of team) {
				const item = this.dex.getItem(set.item);
				if (!item || !item.megaStone) continue;
				const species = this.dex.getSpecies(set.species);
				if (species.isNonstandard) return [`${species.baseSpecies} does not exist in gen 8.`];
				if (this.ruleTable.isRestrictedSpecies(species) || this.toID(set.ability) === 'powerconstruct') {
					return [`${species.name} is not allowed to hold ${item.name}.`];
				}
				if (itemTable.has(item.id)) {
					return [`You are limited to one of each mega stone.`, `(You have more than one ${item.name})`];
				}
				itemTable.add(item.id);
			}
		},
		onBegin() {
			for (const pokemon of this.getAllPokemon()) {
				pokemon.m.originalSpecies = pokemon.baseSpecies.name;
			}
		},
		onSwitchIn(pokemon) {
			// @ts-ignore
			if (pokemon.illusion) {
				const oMegaSpecies = this.dex.getSpecies(pokemon.illusion.species.originalMega);
				if (oMegaSpecies.exists) {
					// Place volatiles on the Pokémon to show its mega-evolved condition and details
					this.add('-start', pokemon, oMegaSpecies.requiredItem || oMegaSpecies.requiredMove, '[silent]');
					const oSpecies = this.dex.getSpecies(pokemon.illusion.m.originalSpecies);
					if (oSpecies.types.length !== pokemon.illusion.species.types.length || oSpecies.types[1] !== pokemon.species.types[1]) {
						this.add('-start', pokemon, 'typechange', pokemon.illusion.species.types.join('/'), '[silent]');
					}
				}
			} else {
				const oMegaSpecies = this.dex.getSpecies(pokemon.species.originalMega);
				if (oMegaSpecies.exists) {
					// Place volatiles on the Pokémon to show its mega-evolved condition and details
					this.add('-start', pokemon, oMegaSpecies.requiredItem || oMegaSpecies.requiredMove, '[silent]');
					const oSpecies = this.dex.getSpecies(pokemon.m.originalSpecies);
					if (oSpecies.types.length !== pokemon.species.types.length || oSpecies.types[1] !== pokemon.species.types[1]) {
						this.add('-start', pokemon, 'typechange', pokemon.species.types.join('/'), '[silent]');
					}
				}
			}
		},
		onSwitchOut(pokemon) {
			// @ts-ignore
			const oMegaSpecies = this.dex.getSpecies(pokemon.species.originalMega);
			if (oMegaSpecies.exists) {
				this.add('-end', pokemon, oMegaSpecies.requiredItem || oMegaSpecies.requiredMove, '[silent]');
			}
		},
  },
  {
		name: "[Gen 8] M4A Monotype",
		desc: ["Megas for All v7 but it's a Monotype format",
		      ],
		threads: [
				`&bullet; <a href="https://www.smogon.com/forums/threads/megas-for-all-v7-slate-33-electrode-golurk-and-silvally-please-read-the-first-post-fully-playable-through-slate-32.3671140/">Megas for All v7 on Smogon Forums</a>`,
				`&bullet; <a href="https://docs.google.com/spreadsheets/d/1TdeAUUtjh0f_tcIBllbF_imgepwV-dV2YomoTCRlPgI/edit?usp=sharing">Spreadsheet</a>`,
				`&bullet; <a href="http://megasforall.wikidot.com/">Wiki</a>`
		      ],
		ruleset: ['Same Type Clause', 'Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Freeze Clause Mod', 'Mega Data Mod'],
		banlist: [
			//Pokemon restrictions
			'Arceus', 'Blaziken', 'Calyrex-Ice', 'Calyrex-Shadow', 'Darkrai', 'Deoxys-Base', 'Deoxys-Attack', 'Dialga', 'Dracovish', 'Dragapult', 
			'Eternatus', 'Genesect', 'Giratina', 'Giratina-Origin', 'Greninja-Ash', 'Groudon', 'Ho-oh', 'Hoopa-Unbound', 'Kartana', 
			'Kyogre', 'Kyurem-B', 'Kyurem-W', 'Landorus-Base', 'Lugia', 'Lunala', 'Magearna', 'Marshadow', 'Mewtwo', 'Naganadel', 'Necrozma-DW',
			'Necrozma-DM', 'Palkia', 'Pheromosa', 'Rayquaza', 'Reshiram', 'Shaymin-Sky', 'Solgaleo', 'Spectrier', 'Urshifu-Base', 'Xerneas', 'Yveltal', 'Zacian',
			'Zacian-Crowned', 'Zamazenta', 'Zamazenta-Crowned', 'Zekrom', 'Zygarde-Base',
			
			//Ability restrictions
			'Moody', 'Shadow Tag', 'Power Construct', 'Battle Bond',
			
			//Move restrictions
			'Baton Pass',
			
			//Item Restrictions
			'Blastoisinite', 'Damp Rock', 'Gengarite', 'Kangaskhanite', 'Lucarionite', 'Mawilite', 'Medichamite', 'Metagrossite', 'Salamencite', 'Smooth Rock', 'Terrain Extender',
			'Bright Powder', 'Lax Incense', 'King\'s Rock', 'Quick Claw', 'Razor Fang',
			//Banned MfA Stones
			'Butterfrite', 'Dragalgite',
		],
		mod: 'm4av6',
	},
	{
		name: "[Gen 8] Megas for Two",
		desc: ["Megas for All but you get to Mega Evolve two Pokemon in a battle"],
		ruleset: ['Standard NatDex', 'Standard M4A', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Freeze Clause Mod', 'Mega Data Mod'],
		banlist: ['Hawluchanite ++ Lurantisite'],
		mod: 'm4many',
		searchShow: false,
		//challengeShow: false,
		onBegin() {
			this.battle.megaCap = 2;
		},
	},
	{
		name: "[Gen 8] Mega Revolution Uber",
		desc: [
			"<b>Mega Revolution</b>: This Pet Mod converts mega Evolutions into fully evolved independent Pokémon.",
			],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3674638/">Mega Revolution on Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1whBOIqnepKVIjEVOa2HF-3-pxzH8oVcVxVDww0XZgxI/edit?usp=sharing">Spreadsheet</a>`,
		],

		mod: 'megarevolution',
		teambuilderFormat: 'Uber',
		ruleset: ['Standard', 'Dynamax Clause', 'Data Mod'],
		banlist: ['AG', 'Moody', 'Shadow Tag', 'Baton Pass'],
	},
	{
		name: "[Gen 8] Mega Revolution AG",
		desc: [
			"<b>Mega Revolution</b>: This Pet Mod converts mega Evolutions into fully evolved independent Pokémon.",
			],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3674638/">Mega Revolution on Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1whBOIqnepKVIjEVOa2HF-3-pxzH8oVcVxVDww0XZgxI/edit?usp=sharing">Spreadsheet</a>`,
		],

		mod: 'megarevolution',
		teambuilderFormat: 'AG',
		ruleset: ['Obtainable', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Endless Battle Clause', 'Data Mod'],
		banlist: [],
	},
	{
		name: "[Gen 8] Random Dex Ubers",
		desc: `<b>Random Dex</b>: A micrometagame project consisting of 80 randomly-selected fully-evolved Pokemon.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/random-dex.3690182/">Thread in Pet Mods</a>`,
		],
		mod: 'randomdex',
		teambuilderFormat: "RDex Uber",
		ruleset: ['Standard', 'Dynamax Clause'],
		banlist: ['Arena Trap', 'Moody', 'Shadow Tag', 'Baton Pass',
		'Bright Powder', 'Lax Incense', 'King\'s Rock', 'Razor Fang'],
		onValidateTeam(team, format) {
			let speciesTable = {};
			let allowedTiers = ['RDex Uber', 'RDex OU', 'RDex UUBL', 'RDex UU', 'RDex NFE', 'RDex LC'];
			for (const set of team) {
				let template = this.dex.getSpecies(set.species);
				if ( !allowedTiers.includes(template.tier) ) {
					return [set.species + ' is not useable in Random Dex.'];
				}
			}
		},
	},
	/*
	{
		name: "[Gen 8] Random Dex UU",
		desc: `<b>Random Dex</b>: A micrometagame project consisting of 80 randomly-selected fully-evolved Pokemon.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/random-dex.3690182/">Thread in Pet Mods</a>`,
		],
		mod: 'randomdex',
		teambuilderFormat: "RDex UU",
		ruleset: ['Standard', 'Dynamax Clause'],
		banlist: ['Arena Trap', 'Moody', 'Shadow Tag', 'Baton Pass',
		'Bright Powder', 'Lax Incense', 'King\'s Rock', 'Razor Fang'],
		onValidateTeam(team, format) {
			let speciesTable = {};
			let allowedTiers = ['RDex UU', 'RDex NFE', 'RDex LC'];
			for (const set of team) {
				let template = this.dex.getSpecies(set.species);
				if ( !allowedTiers.includes(template.tier) ) {
					return [set.species + ' is not useable in Random Dex.'];
				}
			}
		},
	},
	{
		name: "[Gen 8] Random Dex LC",
		desc: `<b>Random Dex</b>: A micrometagame project consisting of 80 randomly-selected fully-evolved Pokemon.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/random-dex.3690182/">Thread in Pet Mods</a>`,
		],
		mod: 'randomdex',
		teambuilderFormat: "RDex LC",
		maxLevel: 5,
		ruleset: ['Standard', 'Little Cup', 'Dynamax Clause'],
		banlist: ['Moody', 'Shadow Tag', 'Baton Pass', 'Bright Powder', 'Lax Incense', 'King\'s Rock', 'Razor Fang'],
		onValidateTeam(team, format) {
			let speciesTable = {};
			let allowedTiers = ['RDex LC'];
			for (const set of team) {
				let template = this.dex.getSpecies(set.species);
				if ( !allowedTiers.includes(template.tier) ) {
					return [set.species + ' is not useable in Random Dex.'];
				}
			}
		},
	},*/
	{
		name: "[Gen 8] Stereotypes LC",
		mod: "stereotypes",
		searchShow: false,
		desc: [
			"<b>Stereotypes</b>: A project that aims to create a micrometa containing a unique new Pokemon for all 171 possible types, with the hope that each mon will use its typing and the options that typing affords well, while still being balanced and interesting.",
		],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/stereotypes-slate-1-fire-grass-water.3681312/">Stereotypes on Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/19CbVWEkREchf_88VNfyEpcYEIdH_aJe20VMQyc8i-8Y/edit?usp=sharing">Spreadsheet</a>`,
		],
		forcedLevel: 5,
		defaultLevel: 5,
		ruleset: ['Standard', 'Dynamax Clause', 'Data Mod'],
		onValidateTeam(team, format) {
			let speciesTable = {};
			let allowedTiers = ['ST LC'];
			for (const set of team) {
				let template = this.dex.getSpecies(set.species);
				if ( !allowedTiers.includes(template.tier) ) {
					return [set.species + ' is not useable in Stereotypes LC.'];
				}
			}
		},
		teambuilderFormat: "ST LC",
	},
	{
		name: "[Gen 8] Stereotypes NFE",
		mod: "stereotypes",
		searchShow: false,
		desc: [
			"<b>Stereotypes</b>: A project that aims to create a micrometa containing a unique new Pokemon for all 171 possible types, with the hope that each mon will use its typing and the options that typing affords well, while still being balanced and interesting.",
		],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/stereotypes-slate-1-fire-grass-water.3681312/">Stereotypes on Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/19CbVWEkREchf_88VNfyEpcYEIdH_aJe20VMQyc8i-8Y/edit?usp=sharing">Spreadsheet</a>`,
		],
		ruleset: ['Standard', 'Dynamax Clause', 'Data Mod', 'Not Fully Evolved'],
		onValidateTeam(team, format) {
			let speciesTable = {};
			let allowedTiers = ['ST NFE', 'ST LC'];
			for (const set of team) {
				let template = this.dex.getSpecies(set.species);
				if ( !allowedTiers.includes(template.tier) ) {
					return [set.species + ' is not useable in Stereotypes NFE.'];
				}
			}
		},
		teambuilderFormat: "ST NFE",
	},
	{  
		name: "[Gen 8] SylveMons AG",
		threads: ["&bullet; <a href=https://www.smogon.com/forums/threads/.3612509/>SylveMons</a>",
				 "&bullet; <a href=https://docs.google.com/spreadsheets/d/18DiYjbZXv1Nm7tU-W0OMgPow0ZO7J2ETJF-hWapwM-o/edit>SylveMons Archive</a>",
		      ],
		mod: 'sylvemonstest',
		teambuilderFormat: 'AG',
		ruleset: ['Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview', 'Data Mod', 'Mega Data Mod', 'SylveMons Intro Mod'],
	},		
	// Old Pet Mods ///////////////////////////////////////////////////////////////////
	
	{
		section: "Old Pet Mods",
		column: 3,
	},
	{
  		name: "[Gen 7] Clean Slate",
  		desc: [
			"A brand new micrometagame made from scratch",
			"&bullet; <a href=https://www.smogon.com/forums/threads/.3639262/>Clean Slate</a>",
			"&bullet; <a href=https://www.smogon.com/forums/threads/clean-slate-resources.3643897/>Clean Slate Resources</a>",
		      ],
  		ruleset: ['Standard'],
		banlist: ['Uber', 'Power Construct', 'Shadow Tag', 'Baton Pass'],
		mod: 'cleanslate',
		onSwitchIn: function (pokemon) {
            this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[silent]');
        },
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			for (const set of team) {
				let template = this.dex.getSpecies(set.species);
				if ( template.tier !== 'CS1' ) {
					return [set.species + ' is not useable in Clean Slate.'];
				}
			}
		},
  	},
	{
  		name: "[Gen 7] Clean Slate: Micro",
		desc: `, with only 21 pokemon. The first PMOTM.`,
  		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/.3652540/">Clean Slate: Micro</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1GNLvQsM1F6pw1JS7IA6IyrgME1iJ4M0UWLrieGSPQuU/edit#gid=1994258282">Spreadsheet of Changes</a>`,
		      ],
  		ruleset: ['Standard', '!Species Clause'],
		banlist: ['Uber', 'Power Construct', 'Shadow Tag', 'Baton Pass'],
		mod: 'cleanslatemicro',
		banlist: ['Baton Pass', 'Heracross-Mega', 'Heracronite'],
		onSwitchIn: function (pokemon) {
            this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[silent]');
        },
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			for (const set of team) {
				let template = this.dex.getSpecies(set.species);
				if (speciesTable[template.name]) {
					return ["You are limited to one of each Pokémon by Species Clause (except for different Rotom formes). ", "You have more than one " + template.baseSpecies + "."];
				}
				speciesTable[template.name] = true;
				if ( template.tier !== 'CSM' ) {
					return [set.name + ' is not useable in Clean Slate: Micro.'];
				}
			}
		},
  	},
	{
  		name: "[Gen 7] Community Create a Pet Mod",
  		desc: [
			"&bullet; <a href=https://www.smogon.com/forums/threads/.3644840/>Community Create a Pet Mod</a>",
		      ],
  		ruleset: ['Pokemon2', 'Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		mod: 'ccam',
		banlist: ['Unreleased'],
		onSwitchIn: function (pokemon) {
            this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[silent]');
        },
  	},
	{
  		name: "[Gen 7] Fusion Evolution",
  		desc: ["&bullet; <a href=http://www.smogon.com/forums/threads/fusion-evolution-v2-submission-phase.3560216/>Fusion Evolution</a>",
  		       "&bullet; <a href=http://www.smogon.com/forums/threads/fusion-moves-fusion-evolution-companion-project.3564805/>Fusion Moves</a>",
  		      ],
  		ruleset: ['Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		banlist: ['Unreleased', /*'Dialcatty', 'Kars', 'Dittsey', 'Diceus', 'Peridot-Mega', 'Kyzor', 'Gonzap', 'Harem', 'Cinshado', 'Enteon', 'Lucashadow-Mega', 'Taiwan', 'Dad', 'Enteon', 'Entir', 'Necrynx-Ultra', 'Shenala', 'Xurkizard-Mega-Y', 'Archedactyl-Mega', 'Miminja', 'Toxicario-Mega', 'Lucasol-Mega-L', 'Alakario-Mega-L', 'Kangorus-Khan-Mega', 'Absoko-Mega', 'Kartaria-Mega', 'Dio', 'Mendoza', 'Deoxurk-Outlet', 'Omneus','Muddy Seed'*/], // Mega Kasukabe Necrozerain-Ultra'
		mod: 'fe',
		onPrepareHit: function(target, source, move) {
			if (!move.contestType) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Celebrate", target);
			}
		},
//   		onModifyTemplate: function (template, pokemon, source) {
//   			//This hack is for something important: The Pokemon's Sprite.
//   			if (!template.base) return template;
//   			let temp = Object.assign({}, template);
//   			temp.species = temp.baseSpecies = template.base;
// 			pokemon.name = template.species;
// 			pokemon.fullname = `${pokemon.side.id}: ${pokemon.name}`;
// 			pokemon.id = pokemon.fullname;
// 			return temp;
//   		},
		onSwitchIn: function (pokemon) {
			if (pokemon.illusion){
			this.add('-start', pokemon, 'typechange', pokemon.illusion.template.types.join('/'), '[silent]');
				let illusionability = this.getAbility(pokemon.illusion.ability);
				this.add('raw',illusionability,illusionability.shortDesc);
			} else {
				let ability = this.getAbility(pokemon.ability);
				if (pokemon.hasAbility('typeillusionist') || pokemon.hasAbility('sleepingsystem')){
			 this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[silent]');	
				} else {
				this.add('-start', pokemon, 'typechange', pokemon.getTypes().join('/'), '[silent]');
				}
				this.add('raw',ability,ability.shortDesc);
			}
        },
		checkLearnset: function (move, template, lsetData, set) {
           return null
        },
  	},
	{
  		name: "[Gen 7] Mega Mirrors",
		desc: [
			"<b>Mega Mirrors</b>: A Pet Mod where every existing Mega Evolution is given an X or Y counterpart.",
		],
		threads: [`&bullet; <a href="https://www.smogon.com/forums/threads/mega-mirrors-slate-16-5-discussion.3644178/">Mega Mirrors on Smogon Forums</a>`,
				 `&bullet; <a href="https://docs.google.com/spreadsheets/d/1ufsBygUXiq1LIpm2ivisQpbKCCsa3WraEeVCCPbmUgQ/edit?usp=sharing">Spreadsheet</a>`,
		      ],
  		ruleset: ['Standard', 'Dynamax Clause', 'Mega Data Mod'],
		banlist: ['Uber', 'Power Construct', 'Shadow Tag', 'Baton Pass'],
		mod: 'gen7megamirrors',
		teambuilderFormat: "OU",
  	},
	{
		name: "[Gen 1 The Pokedex Redone] OU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3572352/">RBY OU Viability Ranking</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3650478/#post-8133786">RBY Sample Teams</a>`,
		],

		mod: 'tpr',
		ruleset: ['Standard'],
		banlist: ['Uber'],
	},
	{
  		name: "[Gen 7] Super Smash Mods",
  		desc: [],
  		ruleset: ['Standard', '+Past', 'Dynamax Clause'],
		banlist: ['Uber', 'Power Construct', 'Shadow Tag', 'Baton Pass'],
		mod: 'smashmods',
		onSwitchIn: function (pokemon) {
            this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[silent]');
        },
	},
	
	// Randomized Metas
	///////////////////////////////////////////////////////////////////

	{
		section: "Randomized Metas",
		column: 3,
	},
	{
		name: "[Gen 8] Branched Potential Random Battle",
		threads: [
				`&bullet; <a href="https://www.smogon.com/forums/threads/branched-potential-v2-aircraft-slate-yanmega-magnezone-dragapult.3688252/">Branched Potential on Smogon Forums</a>`,
				`&bullet; <a href="https://docs.google.com/spreadsheets/d/135ZGOSBMqzI9Ff-iVhtQzAwy80nORF2Qrv8iJU583NE/edit?usp=sharing">Spreadsheet</a>`,
		      ],
		mod: 'branchedpotential',
		team: 'random',
		ruleset: ['OHKO Clause', 'Obtainable', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Z-Move Clause', 'Data Mod', 'Mega Data Mod', 'Cancel Mod',],
	},
	{
		name: "[Gen 8] Fusion Evolution UU Random Battle",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/fusion-evolution-under-used-submission-slate-3.3674163/">Fusion Evolution Under Used on Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1zFk1_DBIoXFFn_7JpvYbVBrW-f1oFFh80Wn0CJNnbVo/edit#gid=0">Spreadsheet</a>`,
		],
		mod: 'feuu',
		team: 'random',
		ruleset: ['OHKO Clause', 'Obtainable', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Z-Move Clause', 'Data Mod', 'Mega Data Mod', 'Cancel Mod'],
	},
	{
		name: "[Gen 8] M4A Random Battle",
		threads: [
				`&bullet; <a href="https://www.smogon.com/forums/threads/megas-for-all-v7-slate-33-electrode-golurk-and-silvally-please-read-the-first-post-fully-playable-through-slate-32.3671140/">Megas for All v7 on Smogon Forums</a>`,
				`&bullet; <a href="https://docs.google.com/spreadsheets/d/1TdeAUUtjh0f_tcIBllbF_imgepwV-dV2YomoTCRlPgI/edit?usp=sharing">Spreadsheet</a>`,
				`&bullet; <a href="http://megasforall.wikidot.com/">Wiki</a>`
		      ],
		mod: 'm4asandbox',
		team: 'random',
		ruleset: ['Dynamax Clause', 'Obtainable', 'Species Clause', 'HP Percentage Mod', 'Cancel Mod', 'Sleep Clause Mod', 'Freeze Clause Mod', 'Mega Data Mod', 'Mega Hint Mod'],
	},
/*
	{
		name: "[Gen 8] M4A Random (Dynamax)",
		threads: [
				`&bullet; <a href="https://www.smogon.com/forums/threads/megas-for-all-v7-slate-33-electrode-golurk-and-silvally-please-read-the-first-post-fully-playable-through-slate-32.3671140/">Megas for All v7 on Smogon Forums</a>`,
				`&bullet; <a href="https://docs.google.com/spreadsheets/d/1TdeAUUtjh0f_tcIBllbF_imgepwV-dV2YomoTCRlPgI/edit?usp=sharing">Spreadsheet</a>`,
				`&bullet; <a href="http://megasforall.wikidot.com/">Wiki</a>`
		      ],
		mod: 'm4av6',
		team: 'random',
		ruleset: ['Obtainable', 'Species Clause', 'HP Percentage Mod', 'Cancel Mod', 'Sleep Clause Mod', 'Freeze Clause Mod', 'Mega Data Mod', 'Mega Hint Mod'],
		searchShow: false,
		challengeShow: false, 
	},
*/
	{
		name: "[Gen 8] Roulettemons Random",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3649106/">Roulettemons on Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1EOA1m7JXTq7Zz0ViVI4n6lBppFjVBa4S1GqhAwkPTZQ/edit?usp=sharing">Spreadsheet</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1J5ZMVzTAfJ48KQWVE7jt1S6fm7Y8DQX1tFX0-iENWiw/edit?usp=sharing">Bonus Random Team Generator</a>`,
		],
		team: 'random',
		mod: 'roulettemons',
		ruleset: ['Standard NatDex', 'Dynamax Clause', 'Sleep Clause Mod'],
		onSwitchIn(pokemon) {
			this.add('-start', pokemon, 'typechange', pokemon.species.types.join('/'), '[silent]');
		},
		onChangeSet(set) {
			if (set.species === 'Chillyte-Mega') {
				set.species = 'Chillyte';
				set.ability = 'Grassy Surge';
			}
		},
	},
	{
		name: "[Gen 8] Roulettemons Random Doubles",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3649106/">Roulettemons on Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1EOA1m7JXTq7Zz0ViVI4n6lBppFjVBa4S1GqhAwkPTZQ/edit?usp=sharing">Spreadsheet</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1J5ZMVzTAfJ48KQWVE7jt1S6fm7Y8DQX1tFX0-iENWiw/edit?usp=sharing">Bonus Random Team Generator</a>`,
		],
		team: 'random',
		gameType: 'doubles',
		mod: 'roulettemons',
		ruleset: ['Standard NatDex', 'Sleep Clause Mod'],
		onSwitchIn(pokemon) {
			this.add('-start', pokemon, 'typechange', pokemon.species.types.join('/'), '[silent]');
		},
		onChangeSet(set) {
			if (set.species === 'Chillyte-Mega') {
				set.species = 'Chillyte';
			}
		},
	},
	{
		name: "[Gen 8] SylveMons Random Battle",
		threads: [`&bullet; <a href="https://www.smogon.com/forums/threads/.3612509/">SylveMons on Smogon Forums</a>`,
				 `&bullet; <a href="https://docs.google.com/spreadsheets/d/18DiYjbZXv1Nm7tU-W0OMgPow0ZO7J2ETJF-hWapwM-o/edit">Spreadsheet</a>`,
		      ],
		mod: 'sylvemonstest',
		team: 'random',
		ruleset: ['Dynamax Clause', 'Obtainable', 'Species Clause', 'HP Percentage Mod', 'Cancel Mod', 'Sleep Clause Mod', 'SylveMons Intro Mod', 'Data Mod', 'Mega Data Mod'],
		onSwitchIn(pokemon) {
			this.add('-start', pokemon, 'typechange', pokemon.species.types.join('/'), '[silent]');
		},
	},
	/*
	{
		name: "[Gen 8] Ink's Winter Wonderland",
		desc: `Play around both your opponent and the treacherous weather conditions in this randomized micrometa!`,
		mod: 'inksrandbats',
		team: 'random', 
		ruleset: ['Dynamax Clause', 'Obtainable', 'Species Clause', 'HP Percentage Mod', 'Cancel Mod', 'Sleep Clause Mod', 'Freeze Clause Mod', 'Permasnow'],
		searchShow: false,
		challengeShow: false,
	},
	*/
	// Non-Smogon Mods
	{
		section: "Non-Smogon Mods",
		column: 4,
	},
	{
		name: "[Gen 8] Conniecord Draft League", 
		desc: [
			"<b>Conniecord Draft League</b>: Initially for a draft league being run on a friends server on Discord, but now we just add and play around with new Fakemon for fun.",
		],
		threads: [
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1cPOiJawmEFg7yBK73nrVJepq1zbEcD7NjP-ZBaBQgkI/edit?usp=sharing">Spreadsheet (does not include learnsets)</a>`,
			`&bullet; <a href="http://conniecorddraft.wikidot.com/">Incomplete reference</a>`,

		],
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Z-Move Clause', 'Movexit Clause', 'Data Mod', 'Mega Data Mod'],
		mod: 'conniecorddraft',
		searchShow: false,
		banlist: [
			'Alakazam-Mega', 'Arceus', 'Blaziken', 'Deoxys-Attack', 'Deoxys-Base', 'Deoxys-Speed',
			'Dialga', 'Eternatus', 'Genesect', 'Gengar-Mega', 'Giratina', 'Groudon', 'Ho-Oh', 'Kyogre',
			'Kyurem-White', 'Landorus-Base', 'Lucario-Mega', 'Lugia', 'Lunala', 'Marshadow', 'Mewtwo',
			'Naganadel', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Palkia', 'Pheromosa', 'Rayquaza', 'Reshiram',
			'Salamence-Mega', 'Shaymin-Sky', 'Solgaleo', 'Xerneas', 'Yveltal', 'Zacian', 'Zamazenta', 'Zekrom', 
			'Latias-Mega', 'Latios-Mega', 'Mawile-Mega', 
			'Arena Trap', 'Moody', 'Power Construct', 'Shadow Tag',
			'Alakazite', 'Gengarite', 'Lucarionite', 'Salamencite', 'Latiasite', 'Latiosite', 'Mawilite', 
			'Shell Smash ++ Blastoisinite', 'Seismic Toss ++ Kangaskhanite', 'Kyurem-Black ++ Dragon Dance', 
			'Cinderace ++ Libero', 'Kommo-o ++ Clangorous Soul', 'Greninja ++ Protean',
		],
	},
	{
		name: "[Gen 8] Evolution Project",
		desc: [
			`<b>Evolution Project</b>: A small group's creative exercise being given a test run. More details when we go public!`,
		],
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Z-Move Clause', 'Data Mod', 'Mega Data Mod'],
		banlist: ['Alakazam', 'Lycanroc-Dusk', 'Scolipede-Base', 'Baton Pass'],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			for (const set of team) {
				let template = this.dex.getSpecies(set.species);
				if (template.tier !== 'Evo!' && template.tier !== 'Evo (NFE)') {
					return [set.species + ' is not legal in the Evolution Project format.'];
				}
			}
		},
		onValidateSet(set) {
			const item = this.dex.getItem(set.item);
			if (item.megaStone) return [`${set.name || set.species} is not currently allowed to Mega Evolve.`];
		},
		mod: 'evolutionproject',
		searchShow: false,
	},
	{
		name: "[Gen 8] Evolution Project VGC",
		desc: [
			`<b>Evolution Project</b>: A small group's creative exercise being given a test run. More details when we go public!`,
		],
		gameType: 'doubles',
		forcedLevel: 50,
		teamLength: {
			validate: [4, 6],
			battle: 4,
		},
		ruleset: ['Standard GBU', 'VGC Timer', 'Dynamax Clause', 'Z-Move Clause', 'Data Mod', 'Mega Data Mod'],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			for (const set of team) {
				let template = this.dex.getSpecies(set.species);
				if (template.tier !== 'Evo!' && template.tier !== 'Evo (NFE)') {
					return [set.species + ' is not legal in the Evolution Project format.'];
				}
			}
		},
		onValidateSet(set) {
			const item = this.dex.getItem(set.item);
			if (item.megaStone) return [`${set.name || set.species} is not currently allowed to Mega Evolve.`];
		},
		mod: 'evolutionproject',
		searchShow: false,
	},
	{
		name: "[Gen 5] Prism",
		desc: "Under Construction",
		mod: 'prism',
		ruleset: ['Pokemon', 'Standard Prism', 'Evasion Abilities Clause'],
		banlist: ['Weedle', 'Kakuna', 'Beedrill', 'Rattata', 'Raticate', 'Ekans', 'Arbok', 'Sandshrew', 'Sandslash', 'Nidoran-F', 'Nidorina', 'Nidoqueen', 'Nidoran-M', 'Nidorino', 'Nidoking',
		'Diglett', 'Dugtrio', 'Meowth', 'Persian', 'Psyduck', 'Golduck', 'Mankey', 'Primeape', 'Poliwag', 'Poliwhirl', 'Poliwrath', 'Doduo', 'Dodrio', 'Seel', 'Dewgong', 'Grimer', 'Muk',
		'Shellder', 'Cloyster', 'Drowzee', 'Hypno', 'Krabby', 'Kingler', 'Voltorb', 'Electrode', 'Cubone', 'Marowak', 'Lickitung', 'Horsea', 'Seadra','Staryu', 'Starmie', 'Mr. Mime', 'Jynx',
		'Pinsir', 'Tauros', 'Lapras', 'Omanyte', 'Omastar', 'Kabuto', 'Kabutops', 'Aerodactyl', 'Dratini', 'Dragonair', 'Dragonite', 'Hoothoot', 'Noctowl', 'Ledyba', 'Ledian', 'Bellossom',
		'Sudowoodo', 'Politoed', 'Hoppip', 'Skiploom', 'Jumpluff', 'Aipom', 'Sunkern', 'Sunflora', 'Wooper', 'Quagsire', 'Murkrow', 'Unown', 'Wobbuffet', 'Girafarig', 'Dunsparce', 'Snubbull', 
		'Granbull', 'Qwilfish', 'Shuckle', 'Heracross', 'Corsola', 'Remoraid', 'Octillery', 'Mantine', 'Skarmory', 'Kingdra', 'Stantler', 'Smeargle', 'Smoochum', 'Miltank', 'Raikou', 'Entei',
		'Suicune', 'Celebi', 'Treecko', 'Grovyle', 'Sceptile', 'Torchic', 'Combusken', 'Blaziken', 'Mudkip', 'Marshtomp', 'Swampert', 'Poochyena', 'Mightyena', 'Zigzagoon', 'Linoone', 'Wurmple',
		'Silcoon', 'Beautifly', 'Cascoon', 'Dustox', 'Seedot', 'Nuzleaf', 'Shiftry', 'Wingull', 'Pelipper', 'Slakoth', 'Vigoroth', 'Slaking', 'Nincada', 'Ninjask', 'Shedinja', 'Azurill', 'Nosepass',
		'Skitty', 'Delcatty', 'Meditite', 'Medicham', 'Plusle', 'Minun', 'Roselia', 'Gulpin', 'Swalot', 'Carvanha', 'Sharpedo', 'Spoink', 'Grumpig', 'Spinda', 'Zangoose', 'Seviper', 'Barboach', 'Whiscash',
		'Corphish', 'Crawdaunt', 'Baltoy', 'Claydol', 'Castform', 'Kecleon', 'Tropius', 'Wynaut', 'Spheal', 'Sealeo', 'Walrein', 'Clamperl', 'Huntail', 'Gorebyss', 'Luvdisc', 'Regirock', 'Regice', 'Registeel', 
		'Latias', 'Latios', 'Jirachi', 'Deoxys', 'Turtwig', 'Grotle', 'Torterra', 'Chimchar', 'Monferno', 'Infernape', 'Piplup', 'Prinplup', 'Empoleon', 'Starly', 'Staravia', 'Staraptor', 
		'Bidoof', 'Bibarel', 'Kricketot', 'Kricketune', 'Budew', 'Roserade', 'Burmy', 'Wormadam', 'Mothim', 'Combee', 'Vespiquen', 'Pachirisu', 'Buizel', 'Floatzel', 'Cherubi', 'Cherrim',
		'Shellos', 'Gastrodon', 'Ambipom', 'Honchkrow', 'Glameow', 'Purugly', 'Stunky', 'Skuntank', 'Bonsly', 'Mime Jr.', 'Happiny', 'Chatot', 'Munchlax', 'Hippopotas', 'Hippowdon', 'Croagunk',
		'Toxicroak', 'Finneon', 'Lumineon', 'Mantyke', 'Snover', 'Abomasnow', 'Lickilicky', 'Probopass', 'Rotom', 'Uxie', 'Mesprit', 'Azelf', 'Dialga', 'Palkia', 'Heatran', 'Regigigas', 'Giratina',
		'Cresselia', 'Phione', 'Manaphy', 'Darkrai', 'Shaymin', 'Arceus',],
	},
	{
		name: "[Gen 8] Ink's Custom Game",
		desc: [
			"Ink's code sandbox for whatever is on his mind at the time. It's called Custom Game so it won't show up in the teambuilder, but also there are no legality rules for testing purposes so",
		],
		threads: [
			`&bullet; <a href="https://docs.google.com/document/d/19GrXiOJswv6gv8r6ZU5C58SLu1Low_VX-KqAlv7Qhi8/edit?usp=sharing">Reference doc</a>`,
		],
		ruleset: ['Team Preview', 'Cancel Mod', 'HP Percentage Mod', 'Data Mod', 'Mega Data Mod'],
		mod: "inksdynamaxadventure",
		searchShow: false,
		challengeShow: false,
	},
	// Solo Mods
	{
		section: "Solomods",
		column: 4,
	},
	{    
        name: "[Gen 8] Abismons OU",
        desc: 'The result of "What if we let abismal make his own metagame?"',
			threads: [
				`&bullet; <a href="https://docs.google.com/spreadsheets/d/1pQvZOZZ7ZQ7dufJzQ0oQDC19yq5EdTJU_fNl_ZFSdQA/edit#gid=0">Spreadsheet</a>`,
			],
        mod: "abismons",
        teambuilderFormat: 'OU',
        ruleset: ['Standard NatDex', 'Dynamax Clause', 'Sleep Clause Mod', 'Evasion Moves Clause', 'Species Clause'],
        banlist: ['Uber', 'Arena Trap', 'Moody', 'Shadow Tag', 'Baton Pass', 'Cinderace ++ Libero', 'Battle Bond', 'Magearna'],
        unbanlist: ['Spectrier']
    },
    {    
        name: "[Gen 8] Abismons Ubers",
        desc: 'Abismons 2 Electric Boogaloo.',
		 threads: [
				`&bullet; <a href="https://docs.google.com/spreadsheets/d/1pQvZOZZ7ZQ7dufJzQ0oQDC19yq5EdTJU_fNl_ZFSdQA/edit#gid=0">Spreadsheet</a>`,
			],
        mod: "abismons",
        teambuilderFormat: 'Ubers',
        ruleset: ['Standard NatDex', 'Dynamax Clause', 'Evasion Moves Clause', 'Species Clause', 'Sleep Clause Mod'],
        banlist: ['Rayquaza-Mega'],
    },
    {    
        name: "[Gen 8] Abismons AG",
        desc: 'ABISMONS: CLASH OF THE TITANS, IN THEATERS NOW NEAR YOU',
		 threads: [
				`&bullet; <a href="https://docs.google.com/spreadsheets/d/1pQvZOZZ7ZQ7dufJzQ0oQDC19yq5EdTJU_fNl_ZFSdQA/edit#gid=0">Spreadsheet</a>`,
			],
        mod: "abismons",
        teambuilderFormat: 'Ubers',
        ruleset: ['Standard NatDex'],
        banlist: [],
	},
	{
        name: "[Gen 8] Duomod",
        desc: `<b>Duomod</b>: DuoM2's solomod, which cuts 6 of the 18 types and only allows the use of certain Fakemon.`,
        threads: [
            `&bullet; <a href="https://docs.google.com/spreadsheets/d/1lguyF31tjV8f-Gv3uLxmZXGAlg23k2fkF_nBqevJouM/edit?usp=sharing">Spreadsheet</a>`,
        ],

        mod: 'duomod',
        ruleset: ['Standard NatDex', 'Dynamax Clause', 'Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 'Swagger Clause', 'Baton Pass Clause', 'OHKO Clause'],
        banlist: ['All Pokemon'],
        unbanlist: [
            'Abysseil', 'Annelait', 'Arachwich', 'Azurolt', 'Baloon', 'Batravolt', 'Bismage', 'Blastora', 'Blaydge', 'Cadbunny', 'Castarupt', 'Catelax', 'Cephalopire', 'Chemiclysm', 'Chimida', 'Chollunge', 'Crazefly', 'Crypterid', 'Debring', 'Deliriophage', 'Detonuke', 'Draglow', 'Draxplosion', 'Eggg', 'Eggg-Cracked', 'Electritar', 'Falkick', 'Fantom', 'Flamepion', 'Floundrawn', 'Fluidrake', 'Fluxtape', 'Fluxtape-Stereo', 'Grievenge', 'Hyperoach', 'Inscuba', 'Joulibranch', 'Lemotic', 'Modolith', 'Monstratus', 'Mortemoth', 'Nectrance', 'Pterrost', 'Sharmpedo', 'Smorke', 'Spirox', 'Treemu', 'Valianch', 
        ],
        onSwitchIn(pokemon) {
            this.add('-start', pokemon, 'typechange', pokemon.species.types.join('/'), '[silent]');
        },
    },
	{
		name: "[Gen 8] Earth & Sky OU",
		desc: `The metagame based on Pok&eacute;mon Earth & Sky, a set of theoretical games created by En Passant.`,
		threads: [
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1CL_DALzaisaMwr2709KMleWU6ntxBPnzfHukN0SR5Ss">Competitive Cheat Sheet</a>`,
		],
		ruleset: [ 'Earth & Sky',],
		mod: 'earthsky',
		banlist: [
			'Alakazam-Mega', 'Arceus', 'Blaziken-Mega', 'Blastoise-Mega', 'Darkrai', 'Deoxys-Attack', 'Deoxys-Base', 'Deoxys-Speed',
			'Dialga', 'Eternatus', 'Genesect', 'Gengar-Mega', 'Giratina', 'Groudon', 'Ho-Oh', 'Kangaskhan-Mega', 'Kyogre',
			'Kyurem', 'Landorus-Base', 'Lucario-Mega', 'Lugia', 'Lunala', 'Marshadow', 'Mewtwo',
			'Naganadel', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Palkia', 'Pheromosa', 'Rayquaza', 'Reshiram',
			'Salamence-Mega', 'Shaymin-Sky', 'Solgaleo', 'Xerneas', 'Yveltal', 'Zacian', 'Zamazenta', 'Zekrom',
			/*'ES Uber', */'Oceides', 'Hatar', 'Zuros', 'Norphaval', 'Arena Trap', 'Power Construct', 'Shadow Tag', 'Baton Pass',
		],
	},
	{
		name: "[Gen 8] Earth & Sky Egelas Dex",
		threads: [
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1CL_DALzaisaMwr2709KMleWU6ntxBPnzfHukN0SR5Ss">Competitive Cheat Sheet</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/u/1/d/1N_kSuPC2XifKplZ9huLVlxmkYv3fCmt2">Egelan Pokedex</a>`,
		],
		ruleset: [ '[Gen 8] Earth & Sky OU', 'Egelas Pokedex',],
		mod: 'earthsky',
	},
	{
		name: "[Gen 8] Earth & Sky Ubers",
		threads: [
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1CL_DALzaisaMwr2709KMleWU6ntxBPnzfHukN0SR5Ss">Competitive Cheat Sheet</a>`,
		],
		ruleset: [ 'Earth & Sky',],
		banlist: [],
		mod: 'earthsky',
		teambuilderFormat: 'Ubers',
	},
	{
		name: "[Gen 8] GPT2mons",
	   desc: '<b>GPT2mons</b>: A solomod featuring pokemon generated using a GPT2 neural network. It is currently unfinished',
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3660004/post-8809448">Post in Solomods Megathread</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1ec0GmZbGuVu1P7xtmv2pOAe5Nd0xS_gzU0KpsHnch1s/edit?usp=sharing">Spreadsheet</a>`,
		],
		ruleset: ['Standard', 'Dynamax Clause', 'Data Mod'],
		banlist: ['Uber', 'Arena Trap', 'Moody', 'Shadow Tag', 'Baton Pass'],
		searchShow: false,
		challengeShow: false,
		mod: "gpt2mons", 
		teambuilderFormat: "OU", 	
	},
	{    
       name: "[Gen 8] JosMons",
       desc: 'A meta created by JosJet focused on making balance changes to the NatDex OU meta. Ex. Bug-type Buff.',
       mod: "josmons",
       teambuilderFormat: 'OU',
       ruleset: ['Standard NatDex', 'Dynamax Clause', 'Sleep Clause Mod', 'Evasion Moves Clause', 'Species Clause'],
       banlist: ['Uber', 'Arena Trap', 'Moody', 'Shadow Tag', 'Baton Pass', 'Cinderace', 'Magearna', 'Darmanitan-Galar', 'Dracovish', 'Dragapult', 'Metagross-Mega', 'Tornadus-Therian', 'Urshifu'],
    },
	{
		name: "[Gen 8] Journey to Kilirthy",
		desc: '<b>Journey to Kilirthy</b>: A solomod, where Fakemons are added as if it was a new game.',
    threads: [
      `&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3660004/post-8753030">Post in Solomods Megathread</a>`,
      `&bullet; <a href="https://docs.google.com/spreadsheets/d/1Sie-60JVUUuY3sNL4LTvDLGJeITbc-JEt3-ZTnIL_v0/edit?usp=drivesdk">Spreadsheet</a>`,
      ],
		mod: 'j2k',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Data Mod', 'Mega Data Mod'],
		banlist: [
			'Uber', 'Alakazam-Mega', 'Arceus', 'Blastoise-Mega', 'Darkrai', 'Deoxys-Attack', 'Deoxys-Base', 'Deoxys-Speed',
			'Dialga', 'Eternatus', 'Genesect', 'Gengar-Mega', 'Giratina', 'Groudon', 'Ho-Oh', 'Kangaskhan-Mega', 'Kyogre',
			'Kyurem-Black', 'Kyurem-White', 'Landorus-Base', 'Lucario-Mega', 'Lugia', 'Lunala', 'Marshadow', 'Mewtwo',
			'Naganadel', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Palkia', 'Pheromosa', 'Rayquaza', 'Reshiram',
			'Salamence-Mega', 'Shaymin-Sky', 'Solgaleo', 'Xerneas', 'Yveltal', 'Zacian', 'Zamazenta', 'Zekrom', 'Zygarde-Base',
			'Arena Trap', 'Moody', 'Power Construct', 'Shadow Tag', 'Baton Pass', 'Regieleki',
		],
		teambuilderFormat: 'OU',
	},
	{
		name: "[Gen 8] Journey to Kilirthy Ubers",
		desc: '<b>Journey to Kilirthy</b>: A solomod, where Fakemons are added as if it was a new game.',
    threads: [
      `&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3660004/post-8753030">Post in Solomods Megathread</a>`,
      `&bullet; <a href="https://docs.google.com/spreadsheets/d/1Sie-60JVUUuY3sNL4LTvDLGJeITbc-JEt3-ZTnIL_v0/edit?usp=drivesdk">Spreadsheet</a>`,
      ],
		mod: 'j2k',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Data Mod', 'Mega Data Mod'],
		banlist: [
			'AG', 'Eternatus-Eternamax', 'Rayquaza-Mega', 'Zacian-Crowned', 'Moody', 'Shadow Tag', 'Baton Pass',
		],
		teambuilderFormat: 'Uber',
	},
	{
		name: "[Gen 8] Metagame Madness",
		desc: '<b>Metagame Madness</b>: A Solomod where Pokemon are buffed to an extreme while still providing a lot of diversity.',
    threads: [
      `&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3660004/post-8955460">Post in Solomods Megathread</a>`,
      `&bullet; <a href="https://docs.google.com/document/d/1JUnOPKk2mMJ7W1S98xQ9Rbjb0F8V0enM_TFDQL7Rfz0/edit?usp=sharing">Spreadsheet</a>`,
      ],
		mod: 'metagamemadness',
		ruleset: ['Standard NatDex', 'Dynamax Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Sleep Clause Mod', 'Data Mod', 'Mega Data Mod'],
		banlist: [
			'Uber', 'All Pokemon', 'Shadow Tag', 'Power Construct', 'Teleport', 'Baton Pass', 'Hidden Power', 
		],
		unbanlist: [/*GEN 1*/'Venusaur', 'Venusaur-Mega', 'Venusaur-Gmax', 'Charizard', 'Charizard-Mega-X', 'Charizard-Mega-Y', 'Charizard-Gmax', 'Blastoise', 'Blastoise-Mega', 'Blastoise-Gmax', 
					'Raichu', 'Raichu-Alola', 'Marowak', 'Marowak-Alola', 'Pidgeot', 'Pidgeot-Mega', 'Butterfree', 'Rapidash', 'Rapidash-Galar', 'Dugtrio', 'Dugtrio-Alola', 'Beedrill', 
					'Beedrill-Mega', 'Slowbro', 'Slowbro-Mega', 'Slowbro-Galar', 'Primeape', 'Poliwrath', 'Dodrio', 'Eevee', 'Eevee-Gmax', 'Vaporeon', 'Jolteon', 'Flareon', 'Gengar', 
					'Gengar-Mega', 'Gengar-Gmax', 'Kangaskhan', 'Kangaskhan-Mega', 'Pinsir', 'Pinsir-Mega', 'Gyarados', 'Gyarados-Mega', 'Omastar', 'Kabutops', 'Aerodactyl', 'Aerodactyl-Mega', 
					'Snorlax', 'Snorlax-Gmax', 'Dragonite', 'Articuno', 'Moltres', 'Zapdos', 
					/*GEN 2*/'Meganium', 'Typhlosion', 'Feraligatr', 'Ampharos', 'Ampharos-Mega', 'Noctowl', 'Girafarig', 'Scizor', 'Scizor-Mega', 'Xatu', 'Lanturn', 'Porygon2', 'Slowking', 
					'Slowking-Galar', 'Heracross', 'Heracross-Mega', 'Houndoom', 'Houndoom-Mega', 'Tyranitar', 'Tyranitar-Mega', 'Steelix', 'Steelix-Mega', 'Umbreon', 'Espeon', 'Sunflora', 
					'Celebi', 'Politoed', 'Kingdra', 
					/*GEN 3*/'Sceptile', 'Sceptile-Mega', 'Blaziken', 'Blaziken-Mega', 'Swampert', 'Swampert-Mega', 'Swellow', 'Sableye', 'Sableye-Mega', 'Sharpedo', 'Sharpedo-Mega', 'Camerupt', 
					'Camerupt-Mega', 'Altaria', 'Altaria-Mega', 'Cradily', 'Armaldo', 'Crawdaunt', 'Delcatty', 'Breloom', 'Glalie', 'Glalie-Mega', 'Salamence', 'Salamence-Mega', 'Metagross', 
					'Metagross-Mega', 'Gardevoir', 'Gardevoir-Mega', 'Mawile', 'Mawile-Mega', 'Aggron', 'Aggron-Mega', 'Ninjask', 'Shedinja', 'Absol', 'Absol-Mega', 'Medicham', 'Medicham-Mega', 
					'Manectric', 'Manectric-Mega', 'Banette', 'Banette-Mega', 'Regirock', 'Regice', 'Registeel', 'Jirachi', 'Deoxys', 'Deoxys-Attack', 'Deoxys-Defense', 'Deoxys-Speed', 'Latias', 
					'Latias-Mega', 'Latios', 'Latios-Mega', 'Linoone', 
					/*GEN 4*/'Torterra', 'Infernape', 'Empoleon', 'Staraptor', 'Froslass', 'Weavile', 'Ambipom', 'Rampardos', 'Bastiodon', 'Gallade', 'Gallade-Mega', 'Garchomp', 'Garchomp-Mega', 
					'Lucario', 'Lucario-Mega', 'Abomasnow', 'Abomasnow-Mega', 'Lopunny', 'Lopunny-Mega', 'Gliscor', 'Lumineon', 'Rotom', 'Rotom-Fan', 'Rotom-Frost', 'Rotom-Heat', 'Rotom-Mow', 
					'Rotom-Wash', 'Mismagius', 'Porygon-Z', 'Gastrodon', 'Tangrowth', 'Floatzel', 'Regigigas', 'Manaphy', 'Phione', 'Darkrai', 'Shaymin', 'Shaymin-Sky', 'Glaceon', 'Leafeon', 
					/*GEN 5*/'Serperior', 'Emboar', 'Samurott', 'Mandibuzz', 'Genesect', 'Genesect-Burn', 'Genesect-Chill', 'Genesect-Douse', 'Genesect-Shock', 'Audino', 'Audino-Mega', 'Archeops', 
					'Carracosta', 'Swoobat', 'Sigilyph', 'Hydreigon', 'Ferrothorn', 'Volcarona', 'Stunfisk', 'Vanilluxe', 'Bisharp', 'Accelgor', 'Excadrill', 'Keldeo', 'Meloetta', 'Seismitoad', 
					'Cofagrigus', 
					/*GEN 6*/'Chesnaught', 'Delphox', 'Greninja', 'Greninja-Ash', 'Diggersby', 'Sylveon', 'Goodra', 'Avalugg', 'Tyrantrum', 'Aurorus', 'Aegislash', 'Pyroar', 'Diancie', 'Hoopa', 
					'Hoopa-Unbound', 'Volcanion', 
					/*GEN 7*/'Decidueye', 'Incineroar', 'Primarina', 'Ribombee', 'Minior', 'Zeraora', 'Tapu Koko', 'Tapu Lele', 'Tapu Bulu', 'Tapu Fini', 'Nihilego', 'Buzzwole', 'Pheromosa', 
					'Xurkitree', 'Celesteela', 'Kartana', 'Guzzlord', 'Blacephalon', 'Stakataka', 'Naganadel', 'Marshadow', 'Melmetal', 'Magearna', 
					/*GEN 8*/'Rillaboom', 'Rillaboom-Gmax', 'Cinderace', 'Cinderace-Gmax', 'Inteleon', 'Inteleon-Gmax', 'Corviknight', 'Corviknight-Gmax', 'Dubwool', 'Runerigus', 'Falinks', 
					'Coalossal', 'Coalossal-Gmax', 'Copperajah', 'Copperajah-Gmax', 'Grapploct', 'Flapple', 'Flapple-Gmax', 'Appletun', 'Appletun-Gmax', 'Indeedee', 'Indeedee-F', 'Dracozolt', 
					'Dracovish', 'Arctozolt', 'Arctovish', 'Obstagoon', 'Barraskewda', 'Sandaconda', 'Sandaconda-Gmax', 'Duraludon', 'Duraludon-Gmax', 'Dragapult', 'Grimmsnarl', 'Grimmsnarl-Gmax', 
					'Hatterene', 'Hatterene-Gmax', 'Zarude', 'Glastrier', 'Spectrier', 'Calyrex', 'Calyrex-Ice', 'Calyrex-Shadow', 'Regieleki', 'Regidrago', 'Articuno-Galar', 'Moltres-Galar', 
					'Zapdos-Galar', 'Cramorant',
		],
		teambuilderFormat: 'OU',
	},
	{
		name: "[Gen 8] PKMN YB OU",
		desc: [
			"PKMN YB",
		],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3660004/post-8365236">Post in Solomods Megathread</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1ikLNnDXoImPnAzMtqVniU3FASOq4tIyxlqjaI7LK5ZU/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: 'pkmnybv2',	
		teambuilderFormat: 'OU',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Data Mod', 'Mega Data Mod'],
		unbanlist: ['Floette-Eternal', 'Light of Ruin'],
		banlist: ['Uber', 'Arena Trap', 'Power Construct', 'Shadow Tag', 'Baton Pass', 'Alakazite', 'Arceus', 'Darkrai', 'Gorilla Tactics', 'Deoxys-Attack', 'Deoxys-Speed', 'Dialga', 'Genesect', 'Gengarite', 'Greninja-Ash', 'Giratina', 'Giratina-Origin', 'Groudon', 'Ho-Oh', 'Kyogre', 'Kyurem-Black', 'Kyurem-White', 'Landorus-Base', 'Lucarionite', 'Lugia', 'Lunala', 'Marshadow', 'Metagrossite', 'Mewtwo', 'Mewtwo-Mega-X', 'Mewtwo-Mega-Y', 'Naganadel', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Palkia', 'Pheromosa', 'Rayquaza', 'Reshiram', 'Salamencite', 'Solgaleo', 'Tornadus-Therian', 'Xerneas', 'Yveltal', 'Zacian', 'Zamazenta', 'Zekrom', 'Zygarde', 'Berserk Gene', 'Kommonium Z', 'Eevee-Starter', 'Pikachu-Starter', 'Moody',
					'Normalium Z', 'Fairium Z', 'Fightinium Z', 'Firium Z', 'Flyinium Z', 'Darkinium Z', 'Dragonium Z', 'Buginium Z', 'Waterium Z', 'Electrium Z', 'Ghostium Z', 'Grassium Z', 'Groundium Z', 'Icium Z', 'Poisonium Z', 'Psychium Z', 'Rockium Z', 'Steelium Z'],
	},
	{
		name: "[Gen 8] PKMN YB VGC",
		desc: [
			"PKMN YB",
		],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3660004/post-8365236">Post in Solomods Megathread</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1ikLNnDXoImPnAzMtqVniU3FASOq4tIyxlqjaI7LK5ZU/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: 'pkmnybv2',
		teambuilderFormat: 'Doubles OU',
		gameType: 'doubles',
		forcedLevel: 77,
		teamLength: {
			validate: [4, 6],
			battle: 4,
		},
		ruleset: ['Standard GBU', 'VGC Timer', 'Dynamax Clause', 'Data Mod', 'Mega Data Mod', '+Past'],
		banlist: ['All Pokemon', 'Normalium Z', 'Fairium Z', 'Fightinium Z', 'Firium Z', 'Flyinium Z', 'Darkinium Z', 'Dragonium Z', 'Buginium Z', 'Waterium Z', 'Electrium Z', 'Ghostium Z', 'Grassium Z', 'Groundium Z', 'Icium Z', 'Poisonium Z', 'Psychium Z', 'Rockium Z', 'Steelium Z', 'Seal Away', 'Moody'],
		unbanlist: [
			'Floette-Eternal', 'Light of Ruin',
			'Synthinobi', 'Chemicander', 'Primadillo', 'Bersawk', 'Electzal', 'Pyrogrine', 'Chompean', 'Mothicoal', 'Neurowatt', 'Menursa', 'Bloomivolt', 'Muaytiger', 'Hareloom', 'Razorine', 'Frospherous', 'Arbborry', 'Mustellar', 'Wolverflare', 'Photyrant', 'Ghoulgoyle', 'Cortefauna', 'Gammaroo', 'Serpentorch', 'Kaclash', 'Solinira', 'Zapish', 'Sanatee', 'Glaciarch', 'Creaviary', 'Plummuse', 'Sparsqueak', 'Darsqueak', 'Giraflame', 'Lycacia', 'Remodile', 'Petrasapien', 'Petradvena', 'Fyrecho', 'Osprime', 'Buffalocean', 'Ingarde', 'Venometta', 'Nimbless', 'Frixen', 'Necrice', 'Goblizz', 'Ptarabola', 'Dominidon', 'Frostonna', 'Geareon', 'Mytheon',  
			'Butterfree', 'Vespiquen', 'Ariados', 'Ledian', 'Yanmega', 'Accelgor', 'Escavalier', 'Masquerain', 'Mothim', 'Pinsir',
			'Drapion', 'Thievul', 'Hypno', 'Weavile', 'Scrafty', 'Absol', 'Houndoom', 'Morpeko', 'Cacturne', 'Sharpedo', 
			'Hydreigon', 'Noivern', 'Drampa', 'Goodra', 'Flygon', 'Tyrantrum', 'Dracovish', 'Dracozolt', 'Dragalge', 'Altaria',
			'Boltund', 'Togedemaru', 'Electivire', 'Pachirisu', 'Luxray', 'Lanturn', 'Raichu', 'Volbeat', 'Vikavolt', 'Eelektross',
			'Granbull', 'Shiinotic', 'Ribombee', 'Florges', 'Illumise', 'Mienshao', 'Wigglytuff', 'Rapidash', 'Gardevoir', 'Comfey',
			'Bewear', 'Falinks', 'Infernape', 'Passimian', 'Breloom', 'Grapploct', 'Hariyama', 'Toxicroak', 'Poliwrath', 'Heracross',  
			'Typhlosion', 'Turtonator', 'Magmortar', 'Ninetales', 'Camerupt', 'Pyroar', 'Salazzle', 'Magcargo', 'Centiskorch', 'Darmanitan',  
			'Talonflame', 'Honchkrow', 'Beautifly', 'Gliscor', 'Staraptor', 'Cramorant', 'Drifblim', 'Sirfetchd', 'Minior', 'Pidgeot', 
			'Dusknoir', 'Mismagius', 'Banette', 'Gourgeist', 'Golurk', 'Palossand', 'Jellicent', 'Polteageist', 'Cofagrigus', 'Sableye',  
			'Meganium', 'Cherrim', 'Carnivine', 'Wormadam', 'Tropius', 'Jumpluff', 'Cradily', 'Tsareena', 'Gogoat', 'Victreebel',  
			'Krookodile', 'Torterra', 'Wormadam-Sandy', 'Sandaconda', 'Claydol', 'Whiscash', 'Golem', 'Dugtrio', 'Steelix', 'Sandslash', 
			'Froslass', 'Walrein', 'Glalie', 'Arctozolt', 'Vanilluxe', 'Dewgong', 'Mamoswine', 'Eiscue', 'Avalugg', 'Minun',
			'Cinccino', 'Lickilicky', 'Delcatty', 'Oranguru', 'Castform', 'Bibarel', 'Kecleon', 'Purugly', 'Stantler', 'Zangoose',
			'Tentacruel', 'Roserade', 'Dustox', 'Vileplume', 'Crobat', 'Swalot', 'Toxtricity', 'Seviper', 'Garbodor', 'Arbok', 
			'Malamar', 'Beheeyem', 'Slowbro', 'Mr. Mime', 'Gallade', 'Xatu', 'Girafarig', 'Bruxish', 'Musharna', 'Exeggutor',  
			'Rhyperior', 'Aurorus', 'Gigalith', 'Armaldo', 'Stonjourner', 'Drednaw', 'Sudowoodo', 'Lycanroc', 'Shuckle', 'Probopass',
			'Duraludon', 'Copperajah', 'Empoleon', 'Wormadam-Trash', 'Chimecho', 'Skarmory', 'Scizor', 'Perrserker', 'Klinklang', 'Bisharp', 
			'Feraligatr', 'Slowking', 'Milotic', 'Arctovish', 'Clawitzer', 'Floatzel', 'Politoed', 'Seaking', 'Qwilfish', 'Quagsire',
			'Zweilous', 'Electabuzz', 'Magmar', 'Murkrow', 'Misdreavus', 'Dusclops', 'Lickitung', 'Roselia', 'Rhydon', 'Floette', 'Mr. Mime-Galar', 'Pikachu', 'Charjabug', 'Jigglypuff', 'Jynx', 'Scyther', 
			'Unown', 'Mr. Rime', 'Azelf', 'Uxie', 'Mesprit', 'Rapidash-Galar', 'Ninetales-Alola', 'Simisage', 'Simisear', 'Simipour', 'Darmanitan-Galar', 'Gourgeist-Large', 'Gourgeist-Super', 'Gourgeist-Small', 'Runerigus', 'Bellossom', 'Golem-Alola', 'Dugtrio-Alola', 'Sandslash-Alola', 'Plusle', 'Exeggutor-Alola', 'Lycanroc-Midnight', 'Lycanroc-Dusk', 'Persian', 'Persian-Alola',
 			'Farfetchd', 'Farfetchd-Galar', 'Raichu-Alola', 'Eevee', 'Vaporeon', 'Flareon', 'Jolteon', 'Espeon', 'Umbreon', 'Leafeon', 'Sylveon', 'Glaceon', 'Skuntank', 'Sneasel', 'Gligar',		
			'Absol-Mega', 'Altaria-Mega', 'Banette-Mega', 'Bewear-Mega', 'Butterfree-Mega', 'Camerupt-Mega', 'Cinccino-Mega', 'Drapion-Mega', 'Duraludon-Mega', 'Dusknoir-Mega', 'Feraligatr-Mega', 'Froslass-Mega', 'Gallade-Mega', 'Gardevoir-Mega', 'Glalie-Mega', 'Granbull-Mega', 'Heracross-Mega', 'Houndoom-Mega', 'Hydreigon-Mega', 'Malamar-Mega', 'Meganium-Mega', 'Milotic-Mega', 'Pidgeot-Mega', 'Pinsir-Mega', 'Sableye-Mega', 'Scizor-Mega', 'Sharpedo-Mega', 'Shiinotic-Mega', 'Slowbro-Mega', 'Slowking-Mega', 'Steelix-Mega', 'Talonflame-Mega', 'Thievul-Mega', 'Tentacruel-Mega', 'Typhlosion-Mega',
		],
	},
	{    
        name: "[Gen 8] Pokemon North & South OU",
        desc: "Gravity Monkey's solomod, where a brand new generation of pokemon is playable in a restricted regional dex format.",
			threads: [
				`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3660004/page-4#post-8981852">Thread</a>`,
				`&bullet; <a href="https://docs.google.com/spreadsheets/d/1yW-XuEn5FoXQ6zbdFGwQ9bk9A5ex9pIHbbie84Beyzw/edit?usp=sharing">Spreadsheet</a>`,
			],
        mod: "pokemonns",
		teambuilderFormat: 'NSOU',
        ruleset: ['Standard', 'Dynamax Clause', 'Data Mod'],
        banlist: ['Baton Pass'],
		onValidateTeam(team, format) {
			let speciesTable = {};
			let allowedTiers = ['NSOU', 'NSNFE', 'NSLC'];
			for (const set of team) {
				let template = this.dex.getSpecies(set.species);
				if ( !allowedTiers.includes(template.tier) ) {
					return [set.species + ' is not usable in Pokemon North & South OU.'];
				}
			}
		},
	},
	{    
		name: "[Gen 8] Pupumons OU",
		desc: "Pupugugu's fakemon region, the Apple region!",
		threads: [
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1pBJ8SD-BwSduBQL59pLwEAImxMMK1eabrebSmko1OCI/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: "pupumons",
		teambuilderFormat: 'Pupumons',
		ruleset: ['Standard NatDex', 'Dynamax Clause', 'Sleep Clause Mod', 'Evasion Moves Clause', 'Species Clause', 'Data Mod'],
		banlist: ['All Pokemon'],
		unbanlist: ['Grizzeal', 'Stampyro', 'Hippothagoras', 'Moleder', 'Bombatross', 'Galvia', 'Calistaiji', 'Setstorm', 'Kheprise', 'Weeplim', 'Puddogre', 'Doderror', 'Strignight', 'Coowoo', 'Spectropa', 'Crikeri', 'Boxetta', 'Kingphan', 'Skuntomic', 'Croantagion', 'Gaggular', 'Ultranaut', 'Ultranaut-V', 'Dragulonimbus', 'Dragulare', 'Dragulanche', 'Scrittle', 'Corruptrain', 'Pasdovo', 'Glasiosaur', 'Bellophus', 'Velocust', 'Kuwengu', 'Putango', 'Rishelios', 'Odonaga', 'Solrock-Apple', 'Lunatone-Apple', 'Ooreina', 'Ooreina-Flare', 'Amphikits', 'Detectrice', 'Nosferoyle', 'Amplifire', 'Lumberax', 'Anjamanis', 'Bonfiper', 'Kalover', 'Sophisturn', 'Trestoobee', 'Uractal', 'Venusmog', 'Plutrapeze', 'Mercureign', 'Moncub', 'Rabbear', 'Elephire', 'Centrunkion', 'Hippothesis', 'Hippothalamus', 'Dwole', 'Ducket', 'Swannon', 'Calistone', 'Calistower', 'Dungee', 'Scarobus', 'Seedlim', 'Peetlim', 'Goblone', 'Doduo-Apple', 'Dodrio-Apple', 'Hoothoot-Apple', 'Noctowl-Apple', 'Hauntvea', 'Geecrik', 'Hopetta', 'Phanpy-Apple', 'Donphan-Apple', 'Stunky-Apple', 'Skuntank-Apple', 'Croagunk-Apple', 'Toxicroak-Apple', 'Juguler', 'Astromini', 'Dragutus', 'Peeckay', 'Prettysaur', 'Crichus', 'Anthusol', 'Samunata', 'Odaimyo', 'Anjawoof', 'Threador', 'Goldov'],
	},
	{    
		name: "[Gen 8] Pupumons Ubers",
		desc: "Pupugugu's fakemon region, the Apple region!",
		threads: [
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1pBJ8SD-BwSduBQL59pLwEAImxMMK1eabrebSmko1OCI/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: "pupumons",
		teambuilderFormat: 'Pupumons Ubers',
		ruleset: ['Standard NatDex', 'Dynamax Clause', 'Sleep Clause Mod', 'Evasion Moves Clause', 'Species Clause', 'Data Mod'],
		banlist: ['All Pokemon'],
		unbanlist: ['Grizzeal', 'Stampyro', 'Hippothagoras', 'Moleder', 'Bombatross', 'Galvia', 'Calistaiji', 'Setstorm', 'Kheprise', 'Weeplim', 'Puddogre', 'Doderror', 'Strignight', 'Coowoo', 'Spectropa', 'Crikeri', 'Boxetta', 'Kingphan', 'Skuntomic', 'Croantagion', 'Gaggular', 'Ultranaut', 'Ultranaut-V', 'Dragulonimbus', 'Dragulare', 'Dragulanche', 'Scrittle', 'Corruptrain', 'Pasdovo', 'Glasiosaur', 'Bellophus', 'Velocust', 'Kuwengu', 'Putango', 'Rishelios', 'Odonaga', 'Solrock-Apple', 'Lunatone-Apple', 'Venomab', 'Forganon', 'Isladon', 'Ooreina', 'Ooreina-Flare', 'Rangdemos', 'Baronglaiv', 'Thundra', 'Eruptil', 'Amphikits', 'Detectrice', 'Nosferoyle', 'Amplifire', 'Lumberax', 'Batakala', 'Batambu', 'Anjamanis', 'Bonfiper', 'Kalover', 'Sophisturn', 'Trestoobee', 'Uractal', 'Venusmog', 'Plutrapeze', 'Mercureign', 'Moncub', 'Rabbear', 'Elephire', 'Centrunkion', 'Hippothesis', 'Hippothalamus', 'Dwole', 'Ducket', 'Swannon', 'Calistone', 'Calistower', 'Dungee', 'Scarobus', 'Seedlim', 'Peetlim', 'Goblone', 'Doduo-Apple', 'Dodrio-Apple', 'Hoothoot-Apple', 'Noctowl-Apple', 'Hauntvea', 'Geecrik', 'Hopetta', 'Phanpy-Apple', 'Donphan-Apple', 'Stunky-Apple', 'Skuntank-Apple', 'Croagunk-Apple', 'Toxicroak-Apple', 'Juguler', 'Astromini', 'Dragutus', 'Peeckay', 'Prettysaur', 'Crichus', 'Anthusol', 'Samunata', 'Odaimyo', 'Anjawoof', 'Threador', 'Goldov'],
	},
	{    
		name: "[Gen 8] Pupumons VGC",
		desc: "Pupugugu's fakemon region, the Apple region!",
		threads: [
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1pBJ8SD-BwSduBQL59pLwEAImxMMK1eabrebSmko1OCI/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: "pupumons",
		gameType: 'doubles',
		forcedLevel: 50,
		teamLength: {
			validate: [4, 6],
			battle: 4,
		},
		ruleset: ['Standard GBU', 'VGC Timer', 'Data Mod', '+Past'],
		teambuilderFormat: 'PupuVGC',
		banlist: ['All Pokemon', 'Normalium Z', 'Fairium Z', 'Fightinium Z', 'Firium Z', 'Flyinium Z', 'Darkinium Z', 'Dragonium Z', 'Buginium Z', 'Waterium Z', 'Electrium Z', 'Ghostium Z', 'Grassium Z', 'Groundium Z', 'Icium Z', 'Poisonium Z', 'Psychium Z', 'Rockium Z', 'Steelium Z', 'Doderrium Z', 'Kingphanium Z', 'Skuntonium Z', 'Croantagium Z', 'Strignium Z', 'Solrockium Z', 'Lunatonium Z', 'Hippothagorium Z', 'Stampyrium Z', 'Grizzealium Z', 'Odonagium Z'],
		unbanlist: ['Grizzeal', 'Stampyro', 'Hippothagoras', 'Moleder', 'Bombatross', 'Galvia', 'Calistaiji', 'Setstorm', 'Kheprise', 'Weeplim', 'Puddogre', 'Doderror', 'Strignight', 'Coowoo', 'Spectropa', 'Crikeri', 'Boxetta', 'Kingphan', 'Skuntomic', 'Croantagion', 'Gaggular', 'Ultranaut', 'Ultranaut-V', 'Dragulonimbus', 'Dragulare', 'Dragulanche', 'Scrittle', 'Corruptrain', 'Pasdovo', 'Glasiosaur', 'Bellophus', 'Velocust', 'Kuwengu', 'Putango', 'Rishelios', 'Odonaga', 'Solrock-Apple', 'Lunatone-Apple', 'Ooreina', 'Ooreina-Flare', 'Amphikits', 'Detectrice', 'Nosferoyle', 'Amplifire', 'Lumberax', 'Anjamanis', 'Bonfiper', 'Kalover', 'Sophisturn', 'Trestoobee', 'Uractal', 'Venusmog', 'Plutrapeze', 'Mercureign', 'Venomab', 'Forganon', 'Thundra', 'Eruptil', 'Moncub', 'Rabbear', 'Elephire', 'Centrunkion', 'Hippothesis', 'Hippothalamus', 'Dwole', 'Ducket', 'Swannon', 'Calistone', 'Calistower', 'Dungee', 'Scarobus', 'Seedlim', 'Peetlim', 'Goblone', 'Doduo-Apple', 'Dodrio-Apple', 'Hoothoot-Apple', 'Noctowl-Apple', 'Hauntvea', 'Geecrik', 'Hopetta', 'Phanpy-Apple', 'Donphan-Apple', 'Stunky-Apple', 'Skuntank-Apple', 'Croagunk-Apple', 'Toxicroak-Apple', 'Juguler', 'Astromini', 'Dragutus', 'Peeckay', 'Prettysaur', 'Crichus', 'Anthusol', 'Samunata', 'Odaimyo', 'Anjawoof', 'Threador', 'Goldov'],
	},
	{    
		name: "[Gen 8] Pupumons NFE",
		desc: "Pupugugu's fakemon region, the Apple region!",
		threads: [
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1pBJ8SD-BwSduBQL59pLwEAImxMMK1eabrebSmko1OCI/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: "pupumons",
		searchShow: false,
		challengeShow: false,
		teambuilderFormat: 'Pupumons NFE',
		ruleset: ['Standard NatDex', 'Dynamax Clause', 'Sleep Clause Mod', 'Evasion Moves Clause', 'Species Clause', 'Data Mod', 'Not Fully Evolved'],
		banlist: ['All Pokemon'],
		unbanlist: ['Moncub', 'Rabbear', 'Elephire', 'Centrunkion', 'Hippothesis', 'Hippothalamus', 'Dwole', 'Ducket', 'Swannon', 'Calistone', 'Calistower', 'Dungee', 'Scarobus', 'Seedlim', 'Peetlim', 'Goblone', 'Doduo-Apple', 'Dodrio-Apple', 'Hoothoot-Apple', 'Noctowl-Apple', 'Hauntvea', 'Geecrik', 'Hopetta', 'Phanpy-Apple', 'Donphan-Apple', 'Stunky-Apple', 'Skuntank-Apple', 'Croagunk-Apple', 'Toxicroak-Apple', 'Juguler', 'Astromini', 'Dragutus', 'Peeckay', 'Prettysaur', 'Crichus', 'Anthusol', 'Samunata', 'Odaimyo', 'Anjawoof', 'Threador', 'Goldov'],
	},
	{    
		name: "[Gen 8] Pupumons LC",
		desc: "Pupugugu's fakemon region, the Apple region!",
		threads: [
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1pBJ8SD-BwSduBQL59pLwEAImxMMK1eabrebSmko1OCI/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: "pupumons",
		maxLevel: 5,
		searchShow: false,
		challengeShow: false,
		teambuilderFormat: 'Pupumons LC',
		ruleset: ['Little Cup', 'Standard NatDex', 'Dynamax Clause', 'Sleep Clause Mod', 'Evasion Moves Clause', 'Species Clause', 'Data Mod'],
		banlist: ['All Pokemon'],
		unbanlist: ['Moncub', 'Elephire', 'Hippothesis', 'Dwole', 'Ducket', 'Calistone', 'Dungee', 'Seedlim', 'Goblone', 'Doduo-Apple', 'Hoothoot-Apple', 'Hauntvea', 'Geecrik', 'Hopetta', 'Phanpy-Apple', 'Stunky-Apple', 'Croagunk-Apple', 'Juguler', 'Astromini', 'Dragutus', 'Peeckay', 'Prettysaur', 'Crichus', 'Anthusol', 'Samunata', 'Anjawoof', 'Threador', 'Goldov'],
	},
	{
		name: "[Gen 8] The 3-3-1 Typechart",
		desc: [
			"<b>The 3-3-1 Typechart</b>: A solomod that gives every type 3 weaknesses, 3 resistances, and 1 immunity.",
			],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3660004/post-8939651">Post in the Solomods Megathread</a>`,
		],

		mod: 'the331typechart',
		teambuilderFormat: 'OU',
		ruleset: ['Standard', 'Dynamax Clause', 'Data Mod'],
		banlist: ['Uber', 'Moody', 'Shadow Tag', 'Baton Pass'],
	},
	// Past Gens OU
	///////////////////////////////////////////////////////////////////

	{
		section: "Past Gens OU",
		column: 4,
	},
	{
		name: "[Gen 7] OU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/dex/sm/tags/ou/">USM OU Banlist</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3638845/">USM OU Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3621329/">USM OU Viability Rankings</a>`,
		],

		mod: 'gen7',
		ruleset: ['Standard'],
		banlist: ['Uber', 'Arena Trap', 'Power Construct', 'Shadow Tag', 'Baton Pass'],
	},
	{
		name: "[Gen 6] OU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/dex/xy/tags/ou/">ORAS OU Banlist</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/posts/8133793/">ORAS OU Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3623399/">ORAS OU Viability Rankings</a>`,
		],

		mod: 'gen6',
		ruleset: ['Standard', 'Swagger Clause'],
		banlist: ['Uber', 'Arena Trap', 'Shadow Tag', 'Soul Dew', 'Baton Pass'],
	},
	{
		name: "[Gen 5] OU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/posts/8133791/">BW2 Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3658220/">BW2 OU Viability Rankings</a>`,
		],

		mod: 'gen5',
		ruleset: ['Standard', 'Evasion Abilities Clause', 'Baton Pass Clause', 'Sleep Moves Clause', 'Swagger Clause'],
		banlist: ['Uber', 'Arena Trap', 'Drizzle ++ Swift Swim', 'Drought ++ Chlorophyll', 'Sand Rush', 'Shadow Tag', 'Soul Dew'],
	},
	{
		name: "[Gen 4] OU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3506147/">DPP OU Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/posts/8133790/">DPP Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3652538/">DPP OU Viability Rankings</a>`,
		],

		mod: 'gen4',
		ruleset: ['Standard'],
		banlist: ['Uber', 'Sand Veil', 'Soul Dew', 'Swinub + Snow Cloak', 'Piloswine + Snow Cloak', 'Mamoswine + Snow Cloak', 'Baton Pass'],
	},
	{
		name: "[Gen 3] OU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/posts/8133789/">ADV Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3503019/">ADV OU Viability Rankings</a>`,
		],

		mod: 'gen3',
		ruleset: ['Standard', '3 Baton Pass Clause'],
		banlist: ['Uber', 'Smeargle + Baton Pass'],
	},
	{
		name: "[Gen 2] OU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/posts/8133788/">GSC Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3556533/">GSC OU Viability Rankings</a>`,
		],

		mod: 'gen2',
		ruleset: ['Standard'],
		banlist: ['Uber'],
	},
	{
		name: "[Gen 1] OU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/posts/8133786/">RBY Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3572352/">RBY OU Viability Rankings</a>`,
		],

		mod: 'gen1',
		ruleset: ['Standard'],
		banlist: ['Uber'],
	},
	{
		name: "[Gen 7 Let's Go] OU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3658931/">LGPE OU Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3656868/">LGPE OU Viability Rankings</a>`,
		],

		mod: 'letsgo',
		searchShow: false,
		forcedLevel: 50,
		ruleset: ['Obtainable', 'Species Clause', 'Nickname Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Sleep Clause Mod'],
		banlist: ['Uber'],
	},
	{
		name: "[Gen 7] Custom Game",

		mod: 'gen7',
		searchShow: false,
		debug: true,
		maxLevel: 9999,
		battle: {trunc: Math.trunc},
		defaultLevel: 100,
		teamLength: {
			validate: [1, 24],
			battle: 24,
		},
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod'],
	},
	{
		name: "[Gen 7] Doubles OU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3661293/">USUM Doubles OU Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/posts/8394179/">USUM Doubles OU Viability Rankings</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/posts/8394190/">USUM Doubles OU Sample Teams</a>`,
		],

		mod: 'gen7',
		gameType: 'doubles',
		// searchShow: false,
		ruleset: ['Standard Doubles', 'Swagger Clause'],
		banlist: ['DUber', 'Power Construct', 'Eevium Z', 'Dark Void'],
	},
	// Past Generations
	///////////////////////////////////////////////////////////////////

	{
		section: "Past Generations",
		column: 4,
	},
	{
		name: "[Gen 3] Ubers",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/posts/8286280/">ADV Ubers</a>`,
		],

		mod: 'gen3',
		searchShow: false,
		ruleset: ['Standard'],
		banlist: ['Wobbuffet + Leftovers'],
	},
	{
		name: "[Gen 3] UU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3585923/">ADV UU Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3548578/">ADV UU Viability Rankings</a>`,
		],

		mod: 'gen3',
		searchShow: false,
		ruleset: ['Standard', 'NFE Clause'],
		banlist: ['Uber', 'OU', 'UUBL', 'Smeargle + Ingrain'],
		unbanlist: ['Scyther'],
	},
	{
		name: "[Gen 3] 1v1",
		desc: `Bring three Pok&eacute;mon to Team Preview and choose one to battle.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/posts/8031456/">ADV 1v1</a>`,
		],

		mod: 'gen3',
		searchShow: false,
		teamLength: {
			validate: [1, 3],
			battle: 1,
		},
		ruleset: ['[Gen 3] OU', 'Accuracy Moves Clause', 'Sleep Moves Clause', 'Team Preview'],
		banlist: ['Slaking', 'Snorlax', 'Suicune', 'Destiny Bond', 'Explosion', 'Ingrain', 'Perish Song', 'Self-Destruct'],
	},
	{
		name: "[Gen 3] Custom Game",

		mod: 'gen3',
		searchShow: false,
		debug: true,
		maxLevel: 9999,
		battle: {trunc: Math.trunc},
		defaultLevel: 100,
		ruleset: ['HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "[Gen 3] Doubles Custom Game",

		mod: 'gen3',
		gameType: 'doubles',
		searchShow: false,
		debug: true,
		ruleset: ['HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "[Gen 2] Ubers",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/posts/8286282/">GSC Ubers</a>`,
		],

		mod: 'gen2',
		searchShow: false,
		ruleset: ['Standard'],
	},
	{
		name: "[Gen 2] UU",
		threads: [`&bullet; <a href="https://www.smogon.com/forums/threads/3576710/">GSC UU</a>`],

		mod: 'gen2',
		searchShow: false,
		ruleset: ['[Gen 2] OU'],
		banlist: ['OU', 'UUBL'],
	},
	{
		name: "[Gen 2] NU",
		threads: [`&bullet; <a href="https://www.smogon.com/forums/threads/3642565/">GSC NU</a>`],

		mod: 'gen2',
		searchShow: false,
		ruleset: ['[Gen 2] UU'],
		banlist: ['UU', 'NUBL'],
	},
	{
		name: "[Gen 2] Custom Game",

		mod: 'gen2',
		searchShow: false,
		debug: true,
		maxLevel: 9999,
		battle: {trunc: Math.trunc},
		defaultLevel: 100,
		ruleset: ['HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "[Gen 1] UU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3573896/">RBY UU Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3647713/">RBY UU Viability Rankings</a>`,
		],

		mod: 'gen1',
		searchShow: false,
		ruleset: ['[Gen 1] OU'],
		banlist: ['OU', 'UUBL'],
	},
	{
		name: "[Gen 1] OU (Tradeback)",
		desc: `RBY OU with movepool additions from the Time Capsule.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/articles/rby-tradebacks-ou">RBY Tradebacks OU</a>`,
		],

		mod: 'gen1',
		searchShow: false,
		ruleset: ['Obtainable', 'Allow Tradeback', 'Sleep Clause Mod', 'Freeze Clause Mod', 'Species Clause', 'OHKO Clause', 'Evasion Moves Clause', 'HP Percentage Mod', 'Cancel Mod'],
		banlist: ['Uber',
			'Nidoking + Fury Attack + Thrash', 'Exeggutor + Poison Powder + Stomp', 'Exeggutor + Sleep Powder + Stomp',
			'Exeggutor + Stun Spore + Stomp', 'Jolteon + Focus Energy + Thunder Shock', 'Flareon + Focus Energy + Ember',
		],
	},
	{
		name: "[Gen 1] Stadium OU",

		mod: 'stadium',
		searchShow: false,
		ruleset: ['Standard', 'Team Preview', '!Sleep Clause Mod', 'Stadium Sleep Clause'],
		banlist: ['Uber',
			'Nidoking + Fury Attack + Thrash', 'Exeggutor + Poison Powder + Stomp', 'Exeggutor + Sleep Powder + Stomp',
			'Exeggutor + Stun Spore + Stomp', 'Jolteon + Focus Energy + Thunder Shock', 'Flareon + Focus Energy + Ember',
		],
	},
	{
		name: "[Gen 1] Custom Game",

		mod: 'gen1',
		searchShow: false,
		debug: true,
		maxLevel: 9999,
		battle: {trunc: Math.trunc},
		defaultLevel: 100,
		ruleset: ['HP Percentage Mod', 'Cancel Mod'],
	},
	
	{
		section: "Super Secret Tour Formats",
		column: 4,
	},
	// SUPER SECRET FORMATS OWO
	// These are all titled Custom Game so they don't show up in the teambuilder.
	{
		name: "[Gen 8] M4A Monothreat Normal Custom Game",
		ruleset: ['Monothreat Normal', 'Standard NatDex', 'Standard M4A Monothreat'],
		banlist: ['Lopunnite'],
		mod: 'm4av6',
		searchShow: false,
		challengeShow: false,
	},
	{
		name: "[Gen 8] M4A Monothreat Fire Custom Game",
		ruleset: ['Monothreat Fire', 'Standard NatDex', 'Standard M4A Monothreat'],
		mod: 'm4av6',
		searchShow: false,
		challengeShow: false,
	},
	{
		name: "[Gen 8] M4A Monothreat Water Custom Game",
		ruleset: ['Monothreat Water', 'Standard NatDex', 'Standard M4A Monothreat'],
		mod: 'm4av6',
		searchShow: false,
		challengeShow: false,
	},
	{
		name: "[Gen 8] M4A Monothreat Electric Custom Game",
		ruleset: ['Monothreat Electric', 'Standard NatDex', 'Standard M4A Monothreat'],
		mod: 'm4av6',
		searchShow: false,
		challengeShow: false,
	},
	{
		name: "[Gen 8] M4A Monothreat Grass Custom Game",
		ruleset: ['Monothreat Grass', 'Standard NatDex', 'Standard M4A Monothreat'],
		mod: 'm4av6',
		searchShow: false,
		challengeShow: false,
	},
	{
		name: "[Gen 8] M4A Monothreat Ice Custom Game",
		ruleset: ['Monothreat Ice', 'Standard NatDex', 'Standard M4A Monothreat'],
		mod: 'm4av6',
		searchShow: false,
		challengeShow: false,
	},
	{
		name: "[Gen 8] M4A Monothreat Fighting Custom Game",
		ruleset: ['Monothreat Fighting', 'Standard NatDex', 'Standard M4A Monothreat'],
		mod: 'm4av6',
		searchShow: false,
		challengeShow: false,
	},
	{
		name: "[Gen 8] M4A Monothreat Poison Custom Game",
		ruleset: ['Monothreat Poison', 'Standard NatDex', 'Standard M4A Monothreat'],
		mod: 'm4av6',
		searchShow: false,
		challengeShow: false,
	},
	{
		name: "[Gen 8] M4A Monothreat Ground Custom Game",
		ruleset: ['Monothreat Ground', 'Standard NatDex', 'Standard M4A Monothreat'],
		mod: 'm4av6',
		searchShow: false,
		challengeShow: false,
	},
	{
		name: "[Gen 8] M4A Monothreat Flying Custom Game",
		ruleset: ['Monothreat Flying', 'Standard NatDex', 'Standard M4A Monothreat'],
		banlist: ['Talonflite'],
		unbanlist: ['Butterfrite'],
		mod: 'm4av6',
		searchShow: false,
		challengeShow: false,
	},
	{
		name: "[Gen 8] M4A Monothreat Psychic Custom Game",
		ruleset: ['Monothreat Psychic', 'Standard NatDex', 'Standard M4A Monothreat'],
		banlist: ['Meowstic-Base ++ Meowsticite', 'Meowstic-Mega'],
		unbanlist: ['Meowstic-F-Mega'],
		mod: 'm4av6',
		searchShow: false,
		challengeShow: false,
	},
	{
		name: "[Gen 8] M4A Monothreat Bug Custom Game",
		ruleset: ['Monothreat Bug', 'Standard NatDex', 'Standard M4A Monothreat'],
		mod: 'm4av6',
		searchShow: false,
		challengeShow: false,
	},
	{
		name: "[Gen 8] M4A Monothreat Rock Custom Game",
		ruleset: ['Monothreat Rock', 'Standard NatDex', 'Standard M4A Monothreat'],
		banlist: ['Lycanroc-Dusk-Mega', 'Lycanroc-Dusk ++ Lycanite'],
		mod: 'm4av6',
		searchShow: false,
		challengeShow: false,
	},
	{
		name: "[Gen 8] M4A Monothreat Ghost Custom Game",
		ruleset: ['Monothreat Ghost', 'Standard NatDex', 'Standard M4A Monothreat'],
		banlist: ['Gourgeist-Large-Mega', 'Gourgeist-Large ++ Gourgeite'],
		mod: 'm4av6',
		searchShow: false,
		challengeShow: false,
	},
	{
		name: "[Gen 8] M4A Monothreat Dragon Custom Game",
		ruleset: ['Monothreat Dragon', 'Standard NatDex', 'Standard M4A Monothreat'],
		banlist: ['Altarianite'],
		mod: 'm4av6',
		searchShow: false,
		challengeShow: false,
	},
	{
		name: "[Gen 8] M4A Monothreat Dark Custom Game",
		ruleset: ['Monothreat Dark', 'Standard NatDex', 'Standard M4A Monothreat'],
		mod: 'm4av6',
		searchShow: false,
		challengeShow: false,
	},
	{
		name: "[Gen 8] M4A Monothreat Steel Custom Game",
		ruleset: ['Monothreat Steel', 'Standard NatDex', 'Standard M4A Monothreat'],
		mod: 'm4av6',
		searchShow: false,
		challengeShow: false,
	},
	{
		name: "[Gen 8] M4A Monothreat Fairy Custom Game",
		ruleset: ['Monothreat Fairy', 'Standard NatDex', 'Standard M4A Monothreat'],
		mod: 'm4av6',
		searchShow: false,
		challengeShow: false,
	},
	{
		name: "[Gen 8] M4A Megas Only Custom Game",
		ruleset: ['Megas Only Mod', 'Standard NatDex', 'Standard M4A', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Freeze Clause Mod', 'Mega Data Mod'],
		mod: 'm4av6',
		searchShow: false,
		challengeShow: false,
	},
	{
		name: "[Gen 8] Megas for Three Custom Game",
		desc: ["Megas for All but you get to Mega Evolve three Pokemon in a battle"],
		ruleset: ['Standard NatDex', 'Standard M4A', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Freeze Clause Mod', 'Mega Data Mod'],
		banlist: ['Hawluchanite ++ Lurantisite'],
		mod: 'm4many',
		searchShow: false,
		challengeShow: false,
		onBegin() {
			this.battle.megaCap = 3;
		},
	},
	{
		name: "[Gen 8] Megas for Four Custom Game",
		desc: ["Megas for All but you get to Mega Evolve four Pokemon in a battle"],
		ruleset: ['Standard NatDex', 'Standard M4A', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Freeze Clause Mod', 'Mega Data Mod'],
		banlist: ['Hawluchanite ++ Lurantisite'],
		mod: 'm4many',
		searchShow: false,
		challengeShow: false,
		onBegin() {
			this.battle.megaCap = 4;
		},
	},
	{
		name: "[Gen 8] Megas for Five Custom Game",
		desc: ["Megas for All but you get to Mega Evolve 5 Pokemon in a battle"],
		ruleset: ['Standard NatDex', 'Standard M4A', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Freeze Clause Mod', 'Mega Data Mod'],
		banlist: ['Hawluchanite ++ Lurantisite'],
		mod: 'm4many',
		searchShow: false,
		challengeShow: false,
		onBegin() {
			this.battle.megaCap = 5;
		},
	},
	{
		name: "[Gen 8] Megas for Six Custom Game",
		desc: ["Megas for All but you get to Mega Evolve all of your Pokemon in a battle"],
		ruleset: ['Standard NatDex', 'Standard M4A', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Freeze Clause Mod', 'Mega Data Mod'],
		banlist: ['Hawluchanite ++ Lurantisite'],
		mod: 'm4many',
		searchShow: false,
		challengeShow: false,
		onBegin() {
			this.battle.megaCap = 6;
		},
	},
];
