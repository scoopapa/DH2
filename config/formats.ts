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
		name: "[Gen 8] Random Battle",
		desc: `Randomized teams of level-balanced Pok&eacute;mon with sets that are generated to be competitively viable.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3656537/">Random Battle Suggestions</a>`,
		],

		mod: 'gen8',
		team: 'random',
		ruleset: ['PotD', 'Obtainable', 'Species Clause', 'HP Percentage Mod', 'Cancel Mod', 'Sleep Clause Mod'],
	},
	{
		name: "[Gen 8] Unrated Random Battle",

		mod: 'gen8',
		team: 'random',
		challengeShow: false,
		rated: false,
		ruleset: ['Obtainable', 'Species Clause', 'HP Percentage Mod', 'Cancel Mod', 'Sleep Clause Mod'],
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
		name: "[Gen 8] OU (Blitz)",

		mod: 'gen8',
		ruleset: ['[Gen 8] OU', 'Blitz'],
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
		name: "[Gen 8] Random Doubles Battle",

		mod: 'gen8',
		gameType: 'doubles',
		team: 'random',
		ruleset: ['PotD', 'Obtainable', 'Species Clause', 'HP Percentage Mod', 'Cancel Mod'],
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
			'Kyurem-Black', 'Kyurem-White', 'Landorus-Base', 'Lucario-Mega', 'Lugia', 'Lunala', 'Marshadow', 'Mewtwo',
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

	// OM of the Month
	///////////////////////////////////////////////////////////////////

	{
		section: "OM of the Month",
		column: 2,
	},
	{
		name: "[Gen 8] Tier Shift",
		desc: `Pok&eacute;mon below OU get all their stats boosted. UU/RUBL get +10, RU/NUBL get +20, NU/PUBL get +30, and PU or lower get +40.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3662165/">Tier Shift</a>`,
		],

		mod: 'gen8',
		// searchShow: false,
		ruleset: ['[Gen 8] OU'],
		banlist: ['Damp Rock', 'Eviolite', 'Heat Rock'],
		onModifySpecies(species, target, source, effect) {
			if (!species.baseStats) return;
			const boosts: {[tier: string]: number} = {
				uu: 10,
				rubl: 10,
				ru: 20,
				nubl: 20,
				nu: 30,
				publ: 30,
				pu: 40,
				nfe: 40,
				lcuber: 40,
				lc: 40,
			};
			const tier = toID(species.tier) || 'ou';
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
	},
	{
		name: "[Gen 8] 2v2 Doubles",
		desc: `Double battle where you bring four Pok&eacute;mon to Team Preview and choose only two.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3656321/">2v2 Doubles</a>`,
		],

		mod: 'gen8',
		gameType: 'doubles',
		// searchShow: false,
		teamLength: {
			validate: [2, 4],
			battle: 2,
		},
		ruleset: ['Standard Doubles', 'Accuracy Moves Clause', 'Dynamax Clause', 'Sleep Clause Mod'],
		banlist: ['DUber', 'Melmetal', 'Focus Sash', 'Perish Song', 'Swagger'],
		onBegin() {
			if (this.rated && this.format.id === 'gen82v2doubles') {
				this.add('html', `<div class="broadcast-blue"><strong>2v2 Doubles is currently suspecting Dracovish! For information on how to participate check out the <a href="https://www.smogon.com/forums/posts/8514784/">suspect thread</a>.</strong></div>`);
			}
		},
	},

		// Pet Mods ///////////////////////////////////////////////////////////////////
	{
		section: "Pet Mods",
		column: 2,
	},
	{
		name: "[Gen 8] Bench Abilities",
		desc: [
			"&bullet; <a href=https://www.smogon.com/forums/threads/.3648706/>Bench Abilities</a>",
		],
		ruleset: [ 'Species Clause', 'Moody Clause', 'Baton Pass Clause', 
					'Evasion Moves Clause', 'OHKO Clause', 'Swagger Clause', 'Endless Battle Clause', 
					'Team Preview', 'HP Percentage Mod', 'Sleep Clause Mod', 'Cancel Mod', 'Standard GBU',
					'Standard Natdex'],
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
					benchAbility = toID(template.abilities.S);
				}
				let battle = pokemon.battle;
				if ( !battle.benchPokemon ) {
					battle.benchPokemon = [];
					// use this function to retrieve a pokemon's info table using their bench ability ( retrieves FIRST pokemon with that ability )
					battle.benchPokemon.getPKMNInfo = function( ability, side ) 
					{ 
						let battle = side.battle
						let allyBench = battle.benchPokemon[ side.id ]
						ability = toID( ability )
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
		name: "[Gen 8] AbNormal",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/gen-8-abnormal-v3.3656684/">AbNormal v3</a>`,
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
  		name: "[Gen 8] Breeding Variants",
  		desc: ["Breeding Variants, the mod where pokemon degeneracy pays off.",
		      ],
  		ruleset: [ 'Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 
					'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview', 'Swagger Clause', 
					'Baton Pass Clause', 'Standard Natdex'],
		mod: 'breedingvariants',
		onSwitchIn: function (pokemon) {
            this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[silent]');
        },
  	},
	{
		name: "[Gen 8] More Balanced Hackmons",
		desc: `A National Dex mod of Balanced Hackmons with new pokemon, moves, and abilities, as well as some additional bans.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/gen-8-more-balanced-hackmons.3644050/">More Balanced Hackmons</a>`,
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
			const item = toID(set.item);
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
		name: "[Gen 8] Crossover Chaos v2",
		desc: ["&bullet; <a href=https://www.smogon.com/forums/threads/crossover-chaos-v2.3636780/>Crossover Chaos</a>",
		      ],
		ruleset: [ 'Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 
					'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview', 
					'Swagger Clause', 'Baton Pass Clause', 'Obtainable', 'Standard Natdex', 'Dynamax Clause'],
		banlist: ['Uber', 'Arceus', 'Blaziken', 'Darkrai', 'Deoxys-Attack', 'Deoxys-Base', 'Deoxys-Speed', 'Dialga', 'Eternatus', 'Genesect', 'Gengar-Mega',
			'Giratina', 'Groudon', 'Ho-Oh', 'Kangaskhan-Mega', 'Kyogre', 'Kyurem-Black', 'Kyurem-White', 'Landorus-Base', 'Lucario-Mega',
			'Lugia', 'Lunala', 'Marshadow', 'Mewtwo', 'Naganadel', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Palkia', 'Pheromosa',
			'Rayquaza', 'Reshiram', 'Salamence-Mega', 'Shaymin-Sky', 'Solgaleo', 'Xerneas', 'Yveltal', 'Zacian', 'Zamazenta', 'Zekrom'],
		mod: 'crossoverchaos',
    onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			for (const set of team) {
				let template = this.dex.getTemplate(set.species);
				if ( template.tier === 'V1' || template.tier === 'EX' ) {
					return ["You are not allowed to use pokemon from " + template.tier + ". ( " + template.species + " )"];
				}
			}
		},
	},
	{
		name: "[Gen 8] Crossover Chaos Expanded",
		desc: ["&bullet; <a href=https://www.smogon.com/forums/threads/3647108/>Crossover Chaos</a>",
		      ],
		ruleset: [ 'Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 
					'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview', 
					'Swagger Clause', 'Baton Pass Clause', 'Obtainable', 'Standard Natdex', 'Dynamax Clause'],
		banlist: ['Uber', 'Arceus', 'Blaziken', 'Darkrai', 'Deoxys-Attack', 'Deoxys-Base', 'Deoxys-Speed', 'Dialga', 'Eternatus', 'Genesect', 'Gengar-Mega',
			'Giratina', 'Groudon', 'Ho-Oh', 'Kangaskhan-Mega', 'Kyogre', 'Kyurem-Black', 'Kyurem-White', 'Landorus-Base', 'Lucario-Mega',
			'Lugia', 'Lunala', 'Marshadow', 'Mewtwo', 'Naganadel', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Palkia', 'Pheromosa',
			'Rayquaza', 'Reshiram', 'Salamence-Mega', 'Shaymin-Sky', 'Solgaleo', 'Xerneas', 'Yveltal', 'Zacian', 'Zamazenta', 'Zekrom'],
		mod: 'crossoverchaos',
    onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			for (const set of team) {
				let template = this.dex.getTemplate(set.species);
				if ( template.tier === 'V1' || template.tier === 'V2' ) {
					return ["You are not allowed to use pokemon from " + template.tier + ". ( " + template.species + " )"];
				}
			}
		},
	},
	{
		name: "[Gen 8] Crossover Chaos v2 + Expanded Ubers",
		desc: [
				"&bullet; <a href=https://www.smogon.com/forums/threads/crossover-chaos-v2.3636780/>Crossover Chaos</a>",
		      "&bullet; <a href=https://www.smogon.com/forums/threads/crossover-chaos-expanded-side-project.3647108/>Crossover Chaos</a>"],
		ruleset: [ 'Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 
					'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod',
					'Swagger Clause', 'Baton Pass Clause', 'Obtainable', 'Standard Natdex'],
		banlist: [],
		mod: 'crossoverchaos',
	}, 
	{
		name: "[Gen 8] Crossover Chaos Doubles AG",
		gameType: 'doubles',
		desc: [
				"&bullet; <a href=https://www.smogon.com/forums/threads/crossover-chaos-v2.3636780/>Crossover Chaos</a>",
		      "&bullet; <a href=https://www.smogon.com/forums/threads/crossover-chaos-expanded-side-project.3647108/>Crossover Chaos</a>"],
		ruleset: ['Standard Natdex'],
		banlist: [],
		mod: 'crossoverchaos',
	}, 
		{
		name: "[Gen 8] Megamax",
		desc: [
			"&bullet; Every Gigantamax form introduced in Pokemon Sword and Shield is converted into brand new Mega Evolutions.",
			],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3658623/">Megamax</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1QoaocY5tzfwpWg0b5feQO1NMgzodznWxylnBAjM9AR0/edit#gid=0">Archive</a>`,
		],

		mod: 'megamax',
		//ruleset: ['Standard', 'Dynamax Clause'],
		//banlist: ['Uber', 'Moody', 'Shadow Tag', 'Baton Pass'],
	},
	{
		name: "[Gen 8] Optimons",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/gen-8-optimons-gen-4-cross-gen-evos.3657509/">OU Thread</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1k_nvLAq1Qh0yfFjYSr-hy9xsoglgkZTGriKdM6oFRDI/edit#gid=0">Spreadsheet</a>`,
		],

		mod: 'optimons',
		ruleset: ['Standard', 'Dynamax Clause'],
		banlist: ['Uber', 'Moody', 'Shadow Tag', 'Baton Pass'],
	},
	{
		name: "[Gen 8] Perfect Galar",
		desc: [ "The goal of Perfect Galar is to make a Sword and Shield OU metagame where every single fully evolved Pokemon in the Galar Pokedex has a unique, valuable niche.",
				"&bullet; <a href=https://www.smogon.com/forums/threads/gen-8-perfect-galar.3656660/>Perfect Galar</a>",],
		ruleset: ['Obtainable', 'Standard',],
		banlist: ['Uber', 'Shadow Tag', 'Baton Pass'],
		unbanlist: ['Darmanitan-Galar'],
		mod: 'perfectgalar',
		onBegin: function(){
			this.getMaxBoost = function( statName, pokemon ){
				let statBoosts = {
					dynamax: { hp: 0, atk: 10, def: 10, spa: 10, spd: 10, spe: 10 },
					alcremie: { hp: 0, atk: 0, def: 30, spa: 10, spd: 10, spe: 0 },
					appletun: { hp: 0, atk: 0, def: 30, spa: 20, spd: 0, spe: 0 },
					butterfree: { hp: 0, atk: 0, def: 0, spa: 10, spd: 0, spe: 40 },
					centiscorch: { hp: 0, atk: 20, def: 30, spa: 0, spd: 0, spe: 0 },
					charizard: { hp: 0, atk: 30, def: 0, spa: 10, spd: 0, spe: 10 },
					coalossal: { hp: 0, atk: 0, def: 0, spa: 35, spd: 15, spe: 0 },
					copperajah: { hp: 0, atk: 0, def: 30, spa: 0, spd: 20, spe: 0 },
					corviknight: { hp: 0, atk: 10, def: 10, spa: 0, spd: 30, spe: 0 },
					drednaw: { hp: 0, atk: 25, def: 15, spa: 0, spd: 0, spe: 10 },
					duraludon: { hp: 0, atk: 0, def: 5, spa: 20, spd: 25, spe: 0 },
					eevee: { hp: 0, atk: 50, def: 0, spa: 0, spd: 0, spe: 0 },
					flapple: { hp: 20, atk: 5, def: 10, spa: 0, spd: 10, spe: 5 },
					garbodor: { hp: 0, atk: 10, def: 25, spa: 0, spd: 25, spe: -10 },
					gengar: { hp: 0, atk: 0, def: 25, spa: 10, spd: 15, spe: 0 },
					hatterene: { hp: 0, atk: 10, def: 0, spa: 16, spd: 24, spe: 0 },
					kingler: { hp: 0, atk: 20, def: 0, spa: 0, spd: 0, spe: 30 },
					lapras: { hp: 0, atk: 0, def: 20, spa: 0, spd: 30, spe: 0 },
					machamp: { hp: 0, atk: 30, def: 0, spa: 0, spd: 0, spe: 20 },
					melmetal: { hp: 0, atk: 10, def: 10, spa: 0, spd: 0, spe: 30 },
					meowth: { hp: 0, atk: 5, def: 0, spa: 0, spd: 0, spe: 45 },
					orbeetle: { hp: 0, atk: 0, def: 0, spa: 30, spd: 0, spe: 20 },
					pikachu: { hp: 30, atk: 10, def: 10, spa: 20, spd: 10, spe: -30 },
					sandaconda: { hp: 0, atk: 0, def: 20, spa: 0, spd: 0, spe: 30 },
					toxtricity: { hp: 0, atk: 20, def: 0, spa: 4, spd: 16, spe: 10 },
				}
				let boostType = statBoosts.dynamax;
				if ( pokemon.canGigantamax ) boostType = statBoosts[ pokemon.speciesid ];
				let statBoost = boostType[ statName ];
				return statBoost;
			};
			this.doMaxBoostFormeChange = function( pokemon, isPermanent ){
				if ( !pokemon.hasDynamaxed ) return;
				let template = this.dex.deepClone( pokemon.template );
				if ( pokemon.lastFormeBoosted !== pokemon.template.forme ){ // don't boost the same forme twice in a row
					for ( let statName in template.baseStats ){
						let boost = this.getMaxBoost( statName, pokemon );
						template.baseStats[ statName ] = template.baseStats[ statName ] + boost;
					}
				}
				pokemon.lastFormeBoosted = pokemon.template.forme;
				pokemon.formeChange(template, "dynamax", isPermanent);
			};
			let oldMaxPowers = [100, 110, 120, 130, 140, 150];
			let weakMaxPowers = [75, 80, 85, 90, 95, 100];
			let maxPowers = [85, 90, 95, 100, 105, 110];
			this.newGMaxPower = function( move ){
				let gmaxPower = 90;
				if (!move.basePower) {
					return gmaxPower;
				} else if ( !move.gmaxPower ){
					return null;
				} else if (['Fighting', 'Poison'].includes(move.type)) {
					return move.gmaxPower;
				} else if (['Flying'].includes(move.type)) {
					for ( const i in oldMaxPowers ){
						if ( move.gmaxPower === oldMaxPowers[i] ){
							gmaxPower = weakMaxPowers[i]
							break
						}
					}
				} else {
					for ( const i in oldMaxPowers ){
						if ( move.gmaxPower === oldMaxPowers[i] ){
							gmaxPower = maxPowers[i]
							break
						}
					}
				}
				return gmaxPower;
			};
		},
		onSwitchIn( pokemon ){
			if ( pokemon.hasDynamaxed ) pokemon.addVolatile( pokemon.volatileTag );
		},
	}, 
	{
		name: "[Gen 8] PokeClasses",
		desc: ["&bullet; <a href=https://www.smogon.com/forums/threads/gen-8-pokeclasses-playtesting-phase-1.3657264//>PokeClasses</a>"],
		ruleset: ['Standard Natdex', 'PokeSkills Move Legality'],
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
		name: "[Gen 8 Pet Mod] Clean Slate 2",
		desc: `Ubers clean slate. Ubers clean slate.`,
		threads: [
			`<a href="https://www.smogon.com/forums/threads/clean-slate-2.3657640/">Clean Slate 2</a>`,
		],
		mod: 'cleanslate2',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod'],
		onSwitchIn(pokemon) {
			this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[silent]');
		},
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			for (const set of team) {
				let template = this.dex.getSpecies(set.species);
				if ( template.tier !== 'CS2' ) {
					return [set.species + ' is not useable in Clean Slate 2.'];
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
			} 
		}
	},
	{
		name: "[Gen 8 Pet Mod] Clean Slate Tier Shift (BETA)",
		desc: `Clean slate but we forgot to clean the slate between slates.`,
		threads: [
			// `<a href="https://www.smogon.com/forums/threads/clean-slate-2.3657640/">Clean Slate 2</a>`,
		],
		mod: 'cleanslatetiershift',
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
			const tier = toID(species.tier) || 'ou';
			if (!(tier in boosts)) return;
			const pokemon: Species = this.dex.deepClone(species);
			const boost = boosts[tier];
			let statName: StatName;
			for (statName in pokemon.baseStats) {
				if (statName === 'hp') continue;
				pokemon.baseStats[statName] = Utils.clampIntRange(pokemon.baseStats[statName] + boost, 1, 255);
			}
			return pokemon;
		}
	},
	{
		name: "[Gen 8] CCAPM 2020",
		desc: `AAACS.`,
		threads: [
		],
		mod: 'ccapm2020',
		ruleset: ['Obtainable', '!Obtainable Abilities', 'Species Clause', 'Nickname Clause', 'Ability Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Dynamax Clause', 'Sleep Clause Mod', 'Endless Battle Clause'],
		banlist: ['All Pokemon', 'All Abilities', 'Baton Pass'],
		unbanlist: ['porygon2', 'jellicent', 'crabominable', 'oricoriosensu', 'wigglytuff', 'wormadamtrash', 'heatmor', 'beheeyem', 'golbat', 'eelektross', 'togedemaru', 'garchomp', 'whimsicott', 'skuntank', 'lycanrocdusk', 'frosmoth', 'dragonair', 'reshiram', 'aegislash', 'camerupt', 'explosion', 'chesnaught', 'empoleon', 'delibird', 'adaptive', 'elemental', 'contradict', 'countershield', 'embargoact', 'exhaust', 'forager', 'identitytheft', 'inextremis', 'lagbehind', 'prepared', 'survey', 'terror', 'triggerfinger', 'unflagging'],
	},
	{
		name: "[Gen 8] PKMN YB OU",
		desc: ["&bullet; <a href=https://www.smogon.com/forums/threads/solomods-megathread.3660004/post-8365236",],
		mod: 'pkmnyb',	
		ruleset: ['Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause', 'Dynamax Clause'],
		unbanlist: ['Dracovish'],
		banlist: ['Uber', 'Arena Trap', 'Power Construct', 'Shadow Tag', 'Baton Pass', 'Alakazite', 'Blastoisinite', 'Arceus', 'Darkrai', 'Darmanitan-Galar', 'Deoxys-Attack', 'Deoxys-Speed', 'Dialga', 'Genesect', 'Gengarite', 'Greninja-Ash', 'Giratina', 'Giratina-Origin', 'Groudon', 'Ho-Oh', 'Kangaskhanite', 'Kyogre', 'Kyurem-Black', 'Kyurem-White', 'Landorus-Base', 'Lucarionite', 'Lugia', 'Lunala', 'Marshadow', 'Metagrossite', 'Mewtwo', 'Mewtwo-Mega-X', 'Mewtwo-Mega-Y', 'Naganadel', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Palkia', 'Pheromosa', 'Rayquaza', 'Reshiram', 'Salamencite', 'Shaymin-Sky', 'Solgaleo', 'Tornadus-Therian', 'Urshifu', 'Xerneas', 'Yveltal', 'Zacian', 'Zamazenta', 'Zekrom', 'Zygarde', 'Berserk Gene', 'Kommonium Z', 'Eevee-Starter', 'Pikachu-Starter', 'Floette-Eternal', 'Balatadi', 'Poufos', 'Ultratom'],
		onSwitchIn(pokemon) {
			this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[silent]');
		},
	},
		{
		name: "[Gen 8] PKMN YB VGC",
		desc: ["&bullet; <a href=https://www.smogon.com/forums/threads/solomods-megathread.3660004/post-8365236",],
		mod: 'pkmnyb',
		gameType: 'doubles',	
		ruleset: ['VGC Timer', 'Dynamax Clause'],
		forcedLevel: 50,
		teamLength: {
			validate: [4, 6],
			battle: 4,
		},	
		unbanlist: ['Synthinobi', 'Synthinobi-Mega', 'Chemicander', 'Chemicander-Mega', 'Primadillo', 'Primadillo-Mega', 'Bersawk', 'Electzal', 'Pyrogrine', 'Chompean', 'Mothicoal', 'Neurowatt', 'Menursa', 'Bloomivolt', 'Muaytiger', 'Razorine', 'Hareloom', 'Arbborry', 'Mustellar', 'Wolverflare', 'Photyrant', 'Ghoulgoyle', 'Gammaroo', 'Serpentorch', 'Kaclash', 'Solinira', 'Zapish', 'Sanatee', 'Glaciarch', 'Plummuse', 'Sparsqueak','Darsqueak', 'Giraflame', 'Petrasapien', 'Petradvena', 'Fyrecho', 'Osprime', 'Buffalocean','Ingarde', 'Venometta', 'Nimbless', 'Frixen', 'Necrice', 'Goblizz', 'Ptarabola','Dominidon', 'Yamaboucha', 'Geareon', 'Mytheon', 'Butterfree', 'Butterfree-Mega', 'Beedrill','Beedrill-Mega', 'Raticate', 'Raticate-Alola', 'Arbok', 'Pikachu', 'Raichu', 'Raichu-Alola','Sandslash', 'Sandslash-Alola', 'Clefairy', 'Clefable', 'Ninetales', 'Ninetales-Alola', 'Vileplume', 'Wigglytuff', 'Golduck', 'Arcanine', 'Poliwrath', 'Alakazam', 'Alakazam-Mega', 'Victreebel', 'Tentacruel', 'Slowbro', 'Slowbro-Mega', 'Slowbro-Galar', 'Slowbro-Galar-Mega', 'Farfetchd', 'Farfetchd-Galar', 'Dodrio', 'Dewgong', 'Cloyster', 'Gengar', 'Gengar-Mega', 'Hypno', 'Exeggutor', 'Exeggutor-Alola', 'Marowak', 'Marowak-Alola', 'Weezing', 'Weezing-Galar', 'Seaking', 'Mr. Mime', 'Mr. Mime-Galar', 'Scyther', 'Jynx', 'Magmar', 'Electabuzz', 'Pinsir', 'Pinsir-Mega', 'Gyarados', 'Gyarados-Mega', 'Ditto', 'Jolteon', 'Vaporeon', 'Flareon', 'Snorlax', 'Dragonite-Mega', 'Meganium', 'Meganium-Mega', 'Typhlosion', 'Typhlosion-Mega', 'Feraligatr', 'Feraligatr-Mega', 'Furret', 'Ledian', 'Ariados', 'Crobat', 'Golbat', 'Xatu', 'Bellossom', 'Azumarill', 'Sunflora', 'Murkrow', 'Politoed', 'Steelix', 'Steelix-Mega', 'Heracross', 'Heracross-Mega', 'Scizor', 'Scizor-Mega', 'Slowking', 'Slowking-Mega', 'Kingdra', 'Espeon', 'Umbreon', 'Granbull', 'Houndoom', 'Houndoom-Mega', 'Donphan', 'Stantler', 'Mightyena', 'Linoone', 'Linoone-Galar', 'Ludicolo', 'Shiftry', 'Swellow', 'Pelipper', 'Gardevoir', 'Gardevoir-Mega', 'Masquerain', 'Breloom', 'Shedinja', 'Hariyama', 'Delcatty', 'Manectric', 'Manectric-Mega', 'Volbeat', 'Illumise', 'Sharpedo', 'Sharpedo-Mega', 'Camerupt', 'Camerupt-Mega', 'Torkoal', 'Spinda', 'Flygon', 'Flygon-Mega', 'Zangoose', 'Seviper', 'Crawdaunt', 'Kecleon', 'Milotic', 'Milotic-Mega', 'Banette', 'Banette-Mega', 'Dusclops',  'Tropius', 'Clamperl', 'Huntail', 'Gorebyss', 'Luvdisc', 'Glalie', 'Glalie-Mega', 'Metagross', 'Metagross-Mega', 'Staraptor', 'Kricketune', 'Luxray', 'Rampardos', 'Bastiodon', 'Wormadam', 'Wormadam-Sandy', 'Wormadam-Trash', 'Mothim', 'Floatzel', 'Ambipom', 'Drifblim', 'Mismagius', 'Honchkrow', 'Purugly', 'Bronzong', 'Spiritomb', 'Garchomp', 'Garchomp-Mega', 'Toxicroak', 'Lumineon', 'Abomasnow', 'Abomasnow-Mega', 'Weavile', 'Gliscor', 'Tangrowth', 'Yanmega', 'Magmortar', 'Electivire', 'Dusknoir', 'Dusknoir-Mega', 'Gallade', 'Gallade-Mega', 'Froslass', 'Froslass-Mega', 'Leafeon', 'Glaceon', 'Rotom', 'Rotom-Wash', 'Rotom-Heat', 'Rotom-Frost', 'Rotom-Mow', 'Rotom-Fan', 'Uxie', 'Mesprit', 'Azelf', 'Stoutland', 'Simisage', 'Simisear', 'Simipour', 'Musharna', 'Musharna-Mega', 'Zebstrika', 'Zebstrika-Mega', 'Gigalith', 'Excadrill', 'Seismitoad', 'Leavanny', 'Scolipede', 'Krookodile', 'Darmanitan', 'Darmanitan-Galar', 'Sigilyph', 'Cofagrigus', 'Zoroark', 'Zoroark-Mega', 'Cinccino', 'Swanna', 'Sawsbuck', 'Escavalier', 'Alomomola', 'Ferrothorn', 'Eelektross', 'Beheeyem', 'Cryogonal', 'Accelgor', 'Mienshao', 'Mienshao-Mega', 'Druddigon', 'Bisharp', 'Heatmor', 'Durant', 'Hydreigon', 'Hydreigon-Mega', 'Talonflame', 'Talonflame-Mega', 'Pyroar', 'Florges', 'Gogoat', 'Gogoat-Mega', 'Barbaracle', 'Barbaracle-Mega', 'Meowstic', 'Meowstic-F', 'Meowstic-Mega', 'Meowstic-F-Mega', 'Doublade', 'Aegislash', 'Aromatisse', 'Slurpuff', 'Dragalge', 'Clawtizer', 'Heliolisk', 'Tyrantrum', 'Aurorus', 'Sylveon', 'Hawlucha', 'Goodra', 'Goodra-Mega', 'Trevenant', 'Gourgeist', 'Gourgeist-Small', 'Gourgeist-Large', 'Gourgeist-Super', 'Toucannon', 'Gumshoos', 'Crabominable', 'Oricorio', 'Oricorio-Pom-Pom', 'Oricorio-Pau', 'Oricorio-Sensu', 'Ribombee', 'Lycanroc', 'Lycanroc-Midnight', 'Lycanroc-Dusk', 'Wishiwashi', 'Araquanid', 'Lurantis', 'Shiinotic', 'Shiinotic-Mega', 'Oranguru', 'Passimian', 'Golisopod', 'Golisopod-Mega', 'Palossand', 'Type: Null', 'Silvally', 'Silvally-Bug', 'Silvally-Dark', 'Silvally-Dragon', 'Silvally-Electric', 'Silvally-Fairy', 'Silvally-Fighting', 'Silvally-Fire', 'Silvally-Flying', 'Silvally-Ghost', 'Silvally-Grass', 'Silvally-Ground', 'Silvally-Ice', 'Silvally-Poison', 'Silvally-Psychic', 'Silvally-Rock', 'Silvally-Steel', 'Silvally-Water', 'Komala', 'Turtonator', 'Turtonator-Mega', 'Togedemaru', 'Mimikyu', 'Drampa', 'Drampa-Mega', 'Dhelmise', 'Kommo-o', 'Kommo-o-Mega', 'Rillaboom', 'Cinderace', 'Inteleon', 'Corviknight', 'Corviknight-Mega', 'Orbeetle', 'Eldegoss', 'Dubwool', 'Boltund', 'Boltund-Mega', 'Coalossal', 'Flapple', 'Appletun', 'Sandaconda', 'Cramorant', 'Barraskewda', 'Toxtricity', 'Toxtricity-Low-Key', 'Grapploct', 'Obstagoon', 'Sirfetchd', 'Runerigus', 'Mr. Rime', 'Alcremie', 'Falinks', 'Falinks-Mega', 'Pincurchin', 'Stonjourner', 'Eiscue', 'Indeedee', 'Indeedee-F', 'Indeedee-Mega', 'Indeedee-F-Mega', 'Morpeko', 'Duraludon', 'Dragapult', 'Dragapult-Mega',],
		banlist: ['All Pokemon'],
		onSwitchIn(pokemon) {
			this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[silent]');
		},
	},
	{  
		name: "[Gen 8] SylveMons",
		desc: ["&bullet; <a href=https://www.smogon.com/forums/threads/.3612509/>SylveMons</a>",
				 "&bullet; <a href=https://docs.google.com/spreadsheets/d/18DiYjbZXv1Nm7tU-W0OMgPow0ZO7J2ETJF-hWapwM-o/edit>SylveMons Archive</a>",
		      ],
		mod: 'sylvemonstest',
		ruleset: ['Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause', 'Dynamax Clause'],
		banlist: ['Uber', 'Arena Trap', 'Power Construct', 'Shadow Tag', 'Baton Pass', 'Stalwart + Calm Mind', 'Raichu-Alola', 'Regice', 'Reverse Core', 'Alakazite', 'Blastoisinite', 'Arceus', 'Darkrai', 'Darmanitan-Galar', 'Deoxys-Base', 'Deoxys-Attack', 'Deoxys-Speed', 'Dialga', 'Genesect', 'Gengarite', 'Greninja-Ash', 'Giratina', 'Giratina-Origin', 'Groudon', 'Ho-Oh', 'Kangaskhanite', 'Kyogre', 'Kyurem-Black', 'Kyurem-White', 'Landorus-Base', 'Lucarionite', 'Lugia', 'Lunala', 'Marshadow', 'Metagrossite', 'Mewtwo', 'Mewtwo-Mega-X', 'Mewtwo-Mega-Y', 'Naganadel', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Palkia', 'Pheromosa', 'Rayquaza', 'Reshiram', 'Salamencite', 'Shaymin-Sky', 'Solgaleo', 'Urshifu-Base', 'Xerneas', 'Yveltal', 'Zacian', 'Zamazenta', 'Zekrom', 'Zygarde-Base', 'Berserk Gene', 'Kommonium Z', 'Eevee-Starter', 'Pikachu-Starter', 'Eternatus-Eternamax', 'Zygarde-Complete', 'Regigigas', 'Battle Bond', 'Necrozma-Ultra', 'Calyrex-Ice', 'Calyrex-Shadow'],
		unbanlist: ['Dracovish', 'Melmetal', 'Cinderace', 'Magearna', 'Magearna-Original'],
		onSwitchIn(pokemon) {
			this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[silent]');
		},
		onMegaEvo(pokemon) {
			this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[silent]');
		},
	},
		{  
		name: "[Gen 8] SylveMons AG",
		desc: ["&bullet; <a href=https://www.smogon.com/forums/threads/.3612509/>SylveMons</a>",
				 "&bullet; <a href=https://docs.google.com/spreadsheets/d/18DiYjbZXv1Nm7tU-W0OMgPow0ZO7J2ETJF-hWapwM-o/edit>SylveMons Archive</a>",
		      ],
		mod: 'sylvemonstest',
		ruleset: ['Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview'],
		onSwitchIn(pokemon) {
			this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[silent]');
		},
		onMegaEvo(pokemon) {
			this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[silent]');
		},
	},			
	{
		name: "[Gen 8] Twisted Pokemon",
		desc: `You can Twist the Pokemon switching in, changing its type between two predetermined typings.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/pet-mods-submission-thread.3657184/post-8446318">Twisted Pokemon</a>`,
		],		
		mod: 'twisted',
		searchShow: false,
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
      name: "[Gen 1] Rose Red / Iris Blue",
        desc: `A balance mod for Gen 1 that aims to make every fully-evolved Pokémon a viable pick.`,
        threads: [
            `<a href="https://www.smogon.com/forums/threads/gen-1-rose-red-iris-blue.3652237/">Rose Red / Iris Blue</a>`,
        ],
        mod: 'roseredirisblue',
        ruleset: ['Standard', 'Team Preview'],
		unbanlist: ['Ampharos', 'Forretress', 'Seviper', 'Zangoose', 'Gogoat', 'Breloom', 'Sceptile'],
    },
	{
     name: "[Gen 8 Pet Mod] ViAbilities",
     threads: [
         `&bullet; <a href="https://www.smogon.com/forums/threads/viabilities-slate-2-ability-submissions-stage.3664169/">ViAbilities</a>`,
     ],
 
     mod: 'viabilities',
     ruleset: ['Standard', 'Dynamax Clause']

	},
	{
		name: "[Gen 8] Megas for All",
		desc: ["&bullet; Megas for All v7",
		      ],
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Freeze Clause Mod'],
		banlist: [
			'Alakazam-Mega', 'Arceus', 'Blastoise-Mega', 'Blaziken', 'Darkrai', 'Darmanitan-Galar', 'Deoxys-Attack', 'Deoxys-Base', 'Deoxys-Speed', 'Dialga', 'Dracovish',
			'Dragapult', 'Eternatus', 'Genesect', 'Gengar-Mega', 'Giratina', 'Groudon', 'Ho-Oh', 'Kangaskhan-Mega', 'Kyogre', 'Kyurem-Black', 'Kyurem-White', 'Landorus-Base',
			'Lucario-Mega', 'Lugia', 'Lunala', 'Marshadow', 'Metagross-Mega', 'Mewtwo', 'Naganadel', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Necrozma-Ultra',
			'Palkia', 'Pheromosa', 'Rayquaza', 'Reshiram', 'Salamence-Mega', 'Shaymin-Sky', 'Solgaleo', 'Tornadus-Therian', 'Urshifu-Base', 'Xerneas', 'Yveltal',
			'Zacian', 'Zamazenta', 'Zekrom', 'Zygarde-Base', 'Zygarde-Complete',  'Calyrex-Ice', 'Calyrex-Shadow', 'Arena Trap', 'Moody', 'Power Construct', 'Shadow Tag',
			'Baton Pass',
			'BitBitio', 'kakaks', 'DrPumpkinz', 'Magmajudis', // sandbox
			'Flygon + Leech Life', 'Flygon + Quiver Dance', // sandbox
			'Lurantis + Moonblast', 'Lurantis + Moonlight', 'Lurantis + Play Rough', 'Lurantis + Silver Wind', // sandbox (BitBitio)
			'Lurantis + First Impression', 'Lurantis + Fleur Cannon', 'Lurantis + U-turn', // sandbox (kakaks)
			'Drapion + Super Fang', // sandbox
		],
		onAfterMega(pokemon) {
			const species = this.dex.getSpecies(pokemon.species.name);
			const abilities = species.abilities;
			const baseStats = species.baseStats;
			const type = species.types[0];
			if (species.types[1]) {
				const type2 = species.types[1];
				this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="https://${Config.routes.client}/sprites/types/${type}.png" alt="${type}" height="14" width="32"><img src="https://${Config.routes.client}/sprites/types/${type2}.png" alt="${type2}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities[0] + `</span><span class="col abilitycol"></span></span><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` + baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` + baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` + baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` + baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` + baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` + baseStats.spe + `</span> </span></li><li style="clear: both"></li></ul>`);
			} else {
				this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="https://${Config.routes.client}/sprites/types/${type}.png" alt="${type}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities[0] + `</span><span class="col abilitycol"></span></span><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` + baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` + baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` + baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` + baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` + baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` + baseStats.spe + `</span> </span></li><li style="clear: both"></li></ul>`);
			}
		},
		mod: 'm4av6',
	},
	{
		name: "[Gen 8] M4A Doubles",
		desc: ["&bullet; Megas for All v7 but it's a doubles format",
		      ],
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Freeze Clause Mod'],
		banlist: [
			'Mewtwo', 'Lugia', 'Ho-Oh', 'Kyogre', 'Groudon', 'Rayquaza', 'Jirachi', 'Dialga', 'Palkia', 'Giratina',
			'Giratina-Origin', 'Arceus', 'Volcarona', 'Reshiram', 'Zekrom', 'Kyurem-Black', 'Kyurem-White', 'Xerneas',
			'Yveltal', 'Solgaleo', 'Lunala', 'Magearna', 'Marshadow', 'Necrozma-Dusk Mane', 'Necrozma-Dawn Wings',
			'Zacian', 'Zacian-Crowned', 'Zamazenta', 'Zamazenta-Crowned', 'Eternatus', 'Urshifu', 'Calyrex-Ice', 'Calyrex-Shadow',
			'BitBitio', 'kakaks', 'DrPumpkinz', 'Magmajudis', // sandbox
			'Flygon + Leech Life', 'Flygon + Quiver Dance', // sandbox
			'Lurantis + Moonblast', 'Lurantis + Moonlight', 'Lurantis + Play Rough', 'Lurantis + Silver Wind', // sandbox (BitBitio)
			'Lurantis + First Impression', 'Lurantis + Fleur Cannon', 'Lurantis + U-turn', // sandbox (kakaks)
			'Drapion + Super Fang', // sandbox
		],
		onAfterMega(pokemon) {
			const species = this.dex.getSpecies(pokemon.species.name);
			const abilities = species.abilities;
			const baseStats = species.baseStats;
			const type = species.types[0];
			if (species.types[1]) {
				const type2 = species.types[1];
				this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="https://${Config.routes.client}/sprites/types/${type}.png" alt="${type}" height="14" width="32"><img src="https://${Config.routes.client}/sprites/types/${type2}.png" alt="${type2}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities[0] + `</span><span class="col abilitycol"></span></span><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` + baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` + baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` + baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` + baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` + baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` + baseStats.spe + `</span> </span></li><li style="clear: both"></li></ul>`);
			} else {
				this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="https://${Config.routes.client}/sprites/types/${type}.png" alt="${type}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities[0] + `</span><span class="col abilitycol"></span></span><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` + baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` + baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` + baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` + baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` + baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` + baseStats.spe + `</span> </span></li><li style="clear: both"></li></ul>`);
			}
		},
		mod: 'm4av6',
		gameType: 'doubles',
		searchShow: false,
	},
	{
		name: "[Gen 8] M4A: Mega Spooky Cup",
		desc: ["&bullet; Megas for All Halloween tour rules",
		      ],
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod'],
		banlist: [
			'All Pokemon', 'Gengarite',
			'Drapion + Super Fang', 'Magmajudis',
		],
		unbanlist: [
			'Rattata', 'Rattata-Alola', 'Raticate', 'Raticate-Alola', 'Ekans', 'Arbok', 'Pikachu', 'Clefable', 'Zubat', 'Golbat', 'Vileplume', 'Paras', 'Parasect',
			'Meowth-Alola', 'Meowth-Galar', 'Persian-Alola', 'Victreebel', 'Tentacool', 'Tentacruel', 'Grimer', 'Grimer-Alola', 'Muk', 'Muk-Alola', 'Gastly', 'Haunter',
			'Gengar', 'Drowzee', 'Hypno', 'Cubone', 'Marowak', 'Marowak-Alola', 'Koffing', 'Weezing', 'Weezing-Galar', 'Tangela', 'Mr. Mime', 'Pinsir', 'Ditto', 'Eevee',
			'Vaporeon', 'Omanyte', 'Omastar', 'Kabuto', 'Kabutops', 'Aerodactyl', 'Articuno-Galar', 'Moltres-Galar', 'Hoothoot', 'Noctowl', 'Spinarak', 'Ariados', 'Crobat',
			'Espeon', 'Umbreon', 'Murkrow', 'Slowking-Galar', 'Misdreavus', 'Unown', 'Wobbuffet', 'Gligar', 'Granbull', 'Sneasel', 'Corsola-Galar', 'Houndour', 'Houndoom',
			'Mightyena', 'Zigzagoon-Galar', 'Linoone-Galar', 'Dustox', 'Shiftry', 'Shedinja', 'Whismur', 'Loudred', 'Exploud', 'Sableye', 'Mawile', 'Gulpin', 'Swalot', 'Carvanha',
			'Sharpedo', 'Cacnea', 'Cacturne', 'Zangoose', 'Seviper', 'Lunatone', 'Crawdaunt', 'Baltoy', 'Claydol', 'Shuppet', 'Banette', 'Duskull', 'Dusclops', 'Absol', 'Snorunt',
			'Glalie', 'Huntail', 'Drifloon', 'Drifblim', 'Mismagius', 'Honchkrow', 'Stunky', 'Skuntank', 'Spiritomb', 'Skorupi', 'Drapion', 'Croagunk', 'Toxicroak', 'Carnivine',
			'Abomasnow', 'Weavile', 'Tangrowth', 'Electivire', 'Magmortar', 'Yanmega', 'Gliscor', 'Dusknoir', 'Froslass', 'Rotom', 'Purrloin', 'Liepard', 'Gigalith', 'Woobat',
			'Swoobat', 'Venipede', 'Whirlipede', 'Scolipede', 'Basculin', 'Krokorok', 'Krookodile', 'Yamask', 'Yamask-Galar', 'Cofagrigus', 'Trubbish', 'Garbodor', 'Zorua',
			'Zoroark', 'Gothita', 'Gothorita', 'Gothitelle', 'Frillish', 'Jellicent', 'Joltik', 'Galvantula', 'Elgyem', 'Beheeyem', 'Litwick', 'Lampent', 'Chandelure', 'Golett',
			'Golurk', 'Bisharp', 'Vullaby', 'Mandibuzz', 'Zweilous', 'Hydreigon', 'Larvesta', 'Fennekin', 'Braixen', 'Delphox', 'Pancham', 'Pangoro', 'Espurr', 'Meowstic',
			'Meowstic-F', 'Honedge', 'Doublade', 'Aegislash', 'Swirlix', 'Slurpuff', 'Spritzee', 'Aromatisse', 'Malamar', 'Phantump', 'Trevenant', 'Pumpkaboo', 'Gourgeist',
			'Noibat', 'Noivern', 'Hoopa', 'Hoopa-Unbound', 'Decidueye', 'Incineroar', 'Lycanroc-Midnight', 'Mareanie', 'Toxapex', 'Dewpider', 'Araquanid', 'Shiinotic',
			'Salandit', 'Salazzle', 'Stufful', 'Bewear', 'Golisopod', 'Sandygast', 'Palossand', 'Type: Null', 'Silvally', 'Mimikyu', 'Dhelmise', 'Nihilego', 'Xurkitree',
			'Guzzlord', 'Necrozma-Base', 'Poipole', 'Blacephalon', 'Inteleon', 'Corviknight', 'Blipbug', 'Dottler', 'Orbeetle', 'Nickit', 'Thievul', 'Coalossal', 'Silicobra',
			'Sandaconda', 'Toxtricity', 'Sizzlipede', 'Centiskorch', 'Sinistea', 'Polteageist', 'Hatenna', 'Hattrem', 'Hatterene', 'Impidimp', 'Morgrem', 'Grimmsnarl', 'Obstagoon',
			'Perrserker', 'Cursola', 'Runerigus', 'Morpeko', 'Arctovish', 'Arctozolt', 'Dracozolt', 'Dreepy', 'Drakloak', 'Dragapult', 'Zarude', 'Regidrago', 'Spectrier',
		],
		onAfterMega(pokemon) {
			const species = this.dex.getSpecies(pokemon.species.name);
			const abilities = species.abilities;
			const baseStats = species.baseStats;
			const type = species.types[0];
			if (species.types[1]) {
				const type2 = species.types[1];
				this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="https://${Config.routes.client}/sprites/types/${type}.png" alt="${type}" height="14" width="32"><img src="https://${Config.routes.client}/sprites/types/${type2}.png" alt="${type2}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities[0] + `</span><span class="col abilitycol"></span></span><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` + baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` + baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` + baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` + baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` + baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` + baseStats.spe + `</span> </span></li><li style="clear: both"></li></ul>`);
			} else {
				this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="https://${Config.routes.client}/sprites/types/${type}.png" alt="${type}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities[0] + `</span><span class="col abilitycol"></span></span><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` + baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` + baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` + baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` + baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` + baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` + baseStats.spe + `</span> </span></li><li style="clear: both"></li></ul>`);
			}
		},
		searchShow: false,
		mod: 'm4av6', 
	},
	{
		name: "[Gen 8] M4A: Submission Sandbox",
		desc: ["&bullet; Megas for All v7",
		      ],
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Freeze Clause Mod'],
		banlist: [
			'Alakazam-Mega', 'Arceus', 'Blastoise-Mega', 'Blaziken', 'Darkrai', 'Darmanitan-Galar', 'Deoxys-Attack', 'Deoxys-Base', 'Deoxys-Speed', 'Dialga', 'Dracovish',
			'Dragapult', 'Eternatus', 'Genesect', 'Gengar-Mega', 'Giratina', 'Groudon', 'Ho-Oh', 'Kangaskhan-Mega', 'Kyogre', 'Kyurem-Black', 'Kyurem-White', 'Landorus-Base',
			'Lucario-Mega', 'Lugia', 'Lunala', 'Marshadow', 'Metagross-Mega', 'Mewtwo', 'Naganadel', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Necrozma-Ultra',
			'Palkia', 'Pheromosa', 'Rayquaza', 'Reshiram', 'Salamence-Mega', 'Shaymin-Sky', 'Solgaleo', 'Tornadus-Therian', 'Urshifu-Base', 'Xerneas', 'Yveltal',
			'Zacian', 'Zamazenta', 'Zekrom', 'Zygarde-Base', 'Zygarde-Complete',  'Calyrex-Ice', 'Calyrex-Shadow', 'Arena Trap', 'Moody', 'Power Construct', 'Shadow Tag',
			'Baton Pass',
			'kakaks + Moonblast', 'kakaks + Moonlight', 'kakaks + Play Rough', 'kakaks + Silver Wind', // sandbox (BitBitio)
			'BitBitio + First Impression', 'BitBitio + Fleur Cannon', 'BitBitio + U-turn', // sandbox (kakaks)
		],
		onAfterMega(pokemon) {
			const species = this.dex.getSpecies(pokemon.species.name);
			const abilities = species.abilities;
			const baseStats = species.baseStats;
			const type = species.types[0];
			if (species.types[1]) {
				const type2 = species.types[1];
				this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="https://${Config.routes.client}/sprites/types/${type}.png" alt="${type}" height="14" width="32"><img src="https://${Config.routes.client}/sprites/types/${type2}.png" alt="${type2}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities[0] + `</span><span class="col abilitycol"></span></span><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` + baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` + baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` + baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` + baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` + baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` + baseStats.spe + `</span> </span></li><li style="clear: both"></li></ul>`);
			} else {
				this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="https://${Config.routes.client}/sprites/types/${type}.png" alt="${type}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities[0] + `</span><span class="col abilitycol"></span></span><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` + baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` + baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` + baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` + baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` + baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` + baseStats.spe + `</span> </span></li><li style="clear: both"></li></ul>`);
			}
		},
		searchShow: false,
		mod: 'm4av6',
	},
	{
		name: "[Gen 8] Super Smash Mods Melee",
		desc: ["&bullet; Super Smash Mods Melee",
		      ],
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Z-Move Clause'],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			for (const set of team) {
				let template = this.dex.getSpecies(set.species);
				if ( template.tier !== 'Melee' ) {
					return [set.species + ' is not usable in Super Smash Mods Melee.'];
				}
			}
		},
		onSwitchIn(pokemon) {
			this.add('-start', pokemon, 'typechange', pokemon.getTypes(true).join('/'), '[silent]');
		},
		onAfterMega(pokemon) {
			this.add('-start', pokemon, 'typechange', pokemon.getTypes(true).join('/'), '[silent]');
			const species = this.dex.getSpecies(pokemon.species.name);
			const abilities = species.abilities;
			const baseStats = species.baseStats;
			const type = species.types[0];
			if (species.types[1]) {
				const type2 = species.types[1];
				this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="https://${Config.routes.client}/sprites/types/${type}.png" alt="${type}" height="14" width="32"><img src="https://${Config.routes.client}/sprites/types/${type2}.png" alt="${type2}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities[0] + `</span><span class="col abilitycol"></span></span><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` + baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` + baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` + baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` + baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` + baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` + baseStats.spe + `</span> </span></li><li style="clear: both"></li></ul>`);
			} else {
				this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="https://${Config.routes.client}/sprites/types/${type}.png" alt="${type}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities[0] + `</span><span class="col abilitycol"></span></span><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` + baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` + baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` + baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` + baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` + baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` + baseStats.spe + `</span> </span></li><li style="clear: both"></li></ul>`);
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
			} 
		},
		mod: 'smashmodsmelee',
	},
	{
		name: "[Gen 8] Fusion Evolution Alpha",
		desc: ["&bullet; Fusion Evolution Alpha",
		      ],
		ruleset: ['Standard', 'Dynamax Clause'],
		banlist: [
			'All Pokemon', /*'Aloraichium Z', 'Buginium Z', 'Darkinium Z', 'Decidium Z', 'Dragonium Z', 'Eevium Z', 'Electrium Z', 'Fairium Z', 'Fightinium Z',
			'Firium Z', 'Flyinium Z', 'Ghostium Z', 'Grassium Z', 'Groundium Z', 'Icium Z', 'Incinium Z', 'Kommonium Z', 'Lunalium Z', 'Lycanium Z', 'Marshadium Z',
			'Mewnium Z', 'Mimikium Z', 'Normalium Z', 'Pikanium Z', 'Pikashunium Z', 'Poisonium Z', 'Primarium Z', 'Psychium Z', 'Rockium Z', 'Snorlium Z', 'Solganium Z',
			'Steelium Z', 'Tapunium Z', 'Ultranecrozium Z', 'Waterium Z',*/
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
		onSwitchIn(pokemon) {
			this.add('-start', pokemon, 'typechange', pokemon.getTypes(true).join('/'), '[silent]');
		},
		onAfterMega(pokemon) {
			this.add('-start', pokemon, 'typechange', pokemon.getTypes(true).join('/'), '[silent]');
		},
		mod: 'fealpha',
	},
	{
		name: "[Gen 7] DLCmons",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/dlcmons-ultra-ultra-beast-movepool-and-design-slate.3673357/">Thread in Pet Mods</a>`,
		],
		ruleset: ['Standard', 'Dynamax Clause'],
		banlist: [
			'All Pokemon', 'Arena Trap', 'Power Construct', 'Shadow Tag', 'Baton Pass', 'Gengarite', 'Kangaskhanite', 'Lucarionite', 'Metagrossite', 'Salamencite',
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
			'Xatu', 'Nosepass', 'Probopass', 'Pyukumuku', 'Chinchou', 'Lanturn', 'Type: Null', 'Silvally', 'Poipole', 'Zygarde-10', 'Trubbish', 'Garbodor', 'Minccino',
			'Cinccino', 'Pineco', 'Forretress', 'Skarmory', 'Ditto', 'Cleffa', 'Clefairy', 'Clefable', 'Elgyem', 'Beheeyem', 'Minior', 'Beldum', 'Metang', 'Metagross', 'Porygon',
			'Porygon2', 'Porygon-Z', 'Pancham', 'Pangoro', 'Komala', 'Torkoal', 'Turtonator', 'Houndour', 'Houndoom', 'Dedenne', 'Togedemaru', 'Electrike', 'Manectric', 'Elekid',
			'Electabuzz', 'Electivire', 'Geodude', 'Graveler', 'Golem', 'Sandile', 'Krokorok', 'Krookodile', 'Trapinch', 'Vibrava', 'Flygon', 'Gible', 'Gabite', 'Garchomp',
			'Baltoy', 'Claydol', 'Golett', 'Golurk', 'Klefki', 'Mimikyu', 'Shuppet', 'Banette', 'Frillish', 'Jellicent', 'Bruxish', 'Drampa', 'Absol', 'Snorunt', 'Glalie',
			'Froslass', 'Sneasel', 'Weavile', 'Sandshrew', 'Sandslash', 'Vulpix', 'Ninetales', 'Vanillite', 'Vanillish', 'Vanilluxe', 'Scraggy', 'Scrafty', 'Pawniard', 'Bisharp',
			'Snubbull', 'Granbull', 'Shellos', 'Gastrodon', 'Relicanth', 'Dhelmise', 'Carvanha', 'Sharpedo', 'Skrelp', 'Dragalge', 'Clauncher', 'Clawitzer', 'Wailmer', 'Wailord',
			'Lapras', 'Tropius', 'Exeggcute', 'Exeggutor', 'Corphish', 'Crawdaunt', 'Mienfoo', 'Mienshao', 'Jangmo-o', 'Hakamo-o', 'Kommo-o', 'Emolga', 'Scyther', 'Scizor',
			'Heracross', 'Aipom', 'Ambipom', 'Litleo', 'Pyroar', 'Misdreavus', 'Mismagius', 'Druddigon', 'Lickitung', 'Lickilicky', 'Riolu', 'Lucario', 'Dratini', 'Dragonair',
			'Dragonite', 'Aerodactyl', 'Tapu Koko', 'Tapu Lele', 'Tapu Bulu', 'Tapu Fini', 'Cosmog', 'Cosmoem', 'Nihilego', 'Stakataka', 'Blacephalon',
			'Buzzwole', 'Xurkitree', 'Celesteela', 'Kartana', 'Guzzlord', 'Necrozma-Base', 'Magearna', 'Zeraora', 'Plubia', 'Snoxin', 'Komodond',
			'Anglevolt', 'Thundigeist', 'Forsnaken', 'Clangorous Soul',
		],
		onSwitchIn(pokemon) {
			if (['plubia', 'snoxin', 'komodond', 'anglevolt', 'thundigeist', 'forsnaken', 'tapukokokinolau', 'tapulelekinolau', 'tapubulukinolau', 'tapufinikinolau'].includes(pokemon.species.id)) {
				this.add('-start', pokemon, 'typechange', pokemon.getTypes(true).join('/'), '[silent]');
			}
		},
		mod: 'gen7dlcmons',
	},
	{
		name: "[Gen 7] DLCmons VGC",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/dlcmons-ultra-ultra-beast-movepool-and-design-slate.3673357/">Thread in Pet Mods</a>`,
		],
		ruleset: ['Obtainable', 'Species Clause', 'Nickname Clause', 'Item Clause', 'Team Preview', 'Cancel Mod', 'Dynamax Clause'],
		banlist: [
			'All Pokemon'
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
			'Dragonite', 'Aerodactyl', 'Tapu Koko', 'Tapu Lele', 'Tapu Bulu', 'Tapu Fini', 'Nihilego', 'Stakataka', 'Blacephalon', 'Buzzwole', 'Pheromosa', 'Xurkitree',
			'Celesteela', 'Kartana', 'Guzzlord', 'Plubia', 'Snoxin', 'Komodond', 'Anglevolt', 'Thundigeist', 'Forsnaken', 'Clangorous Soul',
		],
		onSwitchIn(pokemon) {
			if (['plubia', 'snoxin', 'komodond', 'anglevolt', 'thundigeist', 'forsnaken', 'tapukokokinolau', 'tapulelekinolau', 'tapubulukinolau', 'tapufinikinolau'].includes(pokemon.species.id)) {
				this.add('-start', pokemon, 'typechange', pokemon.getTypes(true).join('/'), '[silent]');
			}
		},
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
  		ruleset: ['Obtainable', 'Sleep Clause Mod', 'Nickname Clause', 'OHKO Clause', 'Evasion Moves Clause', 
					'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview', 'Dynamax Clause', 'Standard NatDex'],
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
				if (speciesTable[template.species]) {
					return ["You are limited to one of each Pokémon by Species Clause (except for different Rotom formes). ", "You have more than one " + template.baseSpecies + "."];
				}
				speciesTable[template.species] = true;
				if ( template.tier !== 'CSM' ) {
					return [set.species + ' is not useable in Clean Slate: Micro.'];
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
  		name: "[Gen 7] Eevee'd",
  		desc: ["&bullet; <a href=http://www.smogon.com/forums/threads/eeveed-current-slate-sliggoo-and-sunkern-submissions.3602933/>Eeveed</a>",
		      ],
  		ruleset: ['Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
  		banlist: ['Unreleased'],
		mod: 'eeveed',
  	},
	{
  		name: "[Gen 7] Evos for Everyone",
  		desc: ["&bullet; <a href=https://www.smogon.com/forums/threads/evos-for-everyone-slate-10-cryogonal-delibird-moltres.3636813/>Evos for Everyone</a>",
		      ],
  		ruleset: ['Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		mod: 'evosforeveryone',
		banlist: ['Unreleased'],
		onSwitchIn: function (pokemon) {
            this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[silent]');
        },
  	},
	{
  		name: "[Gen 7] Evos for Everyone LC",
  		desc: ["&bullet; <a href=https://www.smogon.com/forums/threads/evos-for-everyone-slate-10-cryogonal-delibird-moltres.3636813/>Evos for Everyone</a>",
		      ],
  		maxLevel: 5,
		mod: 'evosforeveryone',
		ruleset: ['Standard', 'Swagger Clause', 'Team Preview', 'Little Cup'],
		banlist: [
			'Cutiefly', 'Drifloon', 'Gligar', 'Gothita', 'Meditite', 'Misdreavus', 'Murkrow', 'Porygon', 'Scyther', 'Sneasel', 'Swirlix', 'Tangela', 'Vulpix-Base', 'Yanma',
			'Eevium Z', 'Dragon Rage', 'Sonic Boom',
		],
		onSwitchIn: function (pokemon) {
            this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[silent]');
        },
  	},
	{
  		name: "[Gen 7] Fresh Takes",
  		desc: ["Fresh Takes, where the takes are fresh and the pokemon are zesty",
		      ],
  		ruleset: ['Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		mod: 'freshtakes',
		banlist: ['Unreleased', ],
		onSwitchIn: function (pokemon) {
            this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[silent]');
        },
  	},
	{
  		name: "[Gen 7] From Untiered to Ubers",
  		desc: ["&bullet; <a href=https://www.smogon.com/forums/threads/from-untiereds-to-ubers.3651231/>From Untiered to Ubers</a>",
		      ],
  		ruleset: ['Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		mod: 'fromuntieredtoubers',
		banlist: ['Unreleased', ],
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
  		name: "[Gen 7] Fusion Evolution Alpha",
  		desc: ["&bullet; <a href=https://www.smogon.com/forums/threads/3658502/>Fusion Evolution Alpha</a>",
  		      ],
  		//ruleset: ['Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		//banlist: ['Unreleased', /*'Dialcatty', 'Kars', 'Dittsey', 'Diceus', 'Peridot-Mega', 'Kyzor', 'Gonzap', 'Harem', 'Cinshado', 'Enteon', 'Lucashadow-Mega', 'Taiwan', 'Dad', 'Enteon', 'Entir', 'Necrynx-Ultra', 'Shenala', 'Xurkizard-Mega-Y', 'Archedactyl-Mega', 'Miminja', 'Toxicario-Mega', 'Lucasol-Mega-L', 'Alakario-Mega-L', 'Kangorus-Khan-Mega', 'Absoko-Mega', 'Kartaria-Mega', 'Dio', 'Mendoza', 'Deoxurk-Outlet', 'Omneus','Muddy Seed'*/], // Mega Kasukabe Necrozerain-Ultra'
		mod: 'fealpha',
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
		name: "[Gen 7] Generation SD",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/.3641374/">Generation SD</a>`,
		],
		mod: 'gensd',
		gameType: 'doubles',
		ruleset: ['Standard Doubles', 'Swagger Clause', 'Team Preview'],
		//banlist: ['DUber', 'Power Construct', 'Eevium Z', 'Dark Void', 'Gravity ++ Grass Whistle', 'Gravity ++ Hypnosis', 'Gravity ++ Lovely Kiss', 'Gravity ++ Sing', 'Gravity ++ Sleep Powder'],
	},
	{
  		name: "[Gen 7] G-Luke's Ideal World",
  		desc: ["&bullet; <a href=http://www.smogon.com/forums/threads/g-lukes-ideal-world-v1.3627945/>G-Luke's Ideal World</a>",
		      ],
  		ruleset: ['Gen 7 [OU]'],
		mod: 'lukemod',
		//banlist: [],
		unbanlist: ['Blaziken', 'Shaymin-Sky', 'Kangaskhanite', 'Gengarite'],
		onTryHit: function (target, source, move) {
			if (target !== source && move.type === 'Ground' && target.hasType('Lev')) {
				this.add('-immune', target, '[msg]');
				return null;
			}
		},
	},
	{
		name: "[Gen 7] Hazards: The Stackening",
		desc: `A metagame with Stealth Rock variants of every type; and they all stack with each other!.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3639262/">Hazards: The Stackening</a>`,
		],
		mod: 'HTS',
		ruleset: [ 'Standard','OHKO Clause','Team Preview','Evasion Moves Clause','Endless Battle Clause','Sleep Clause Mod', 'Freeze Clause Mod'],
		checkLearnset: function (move, template, lsetData, set) {
			const restrictedMoves = this.format.restrictedMoves || [];
			let prevo = template.isMega ? this.getTemplate(template.species.substring(0, template.species.length - 5)).prevo : template.prevo;
			let stealthHazards = ['stealthnormal', 'stealthwater', 'stealthgrass', 'stealthghost', 'stealthground', 'stealthice', 'stealthelectric', 'stealthdark', 'stealthdragon', 'stealthfire', 'stealthfighting', 'stealthfairy', 'stealthbug', 'stealthpoison', 'stealthpsychic', 'stealthrock', 'stealthsteel', 'stealthflying',];
			let types = {};
			if ( stealthHazards.includes(move.id) && !restrictedMoves.includes(move.name) && !move.isZ ) {
				for ( let i in template.learnset ) {
					if ( i !== 'hiddenpower' ) types[ Dex.getMove(i).type ] = true;
				}	
				while (prevo)
				{
					for ( let i in prevo.learnset ) {
						if ( i !== 'hiddenpower' ) types[ Dex.getMove(i).type ] = true;
					}			
					prevo = Dex.getTemplate(prevo).prevo;
				}
				let baseTemplate = Dex.getTemplate(template.baseSpecies);
				if (baseTemplate.otherFormes) {
					for (const formeid of baseTemplate.otherFormes) {
						let forme = Dex.getTemplate(formeid);
						if (!forme.battleOnly) {
							if (forme.forme !== 'Alola' && forme.forme !== 'Alola-Totem' && forme.baseSpecies !== 'Wormadam') {
								for ( let i in forme.learnset ) {
									if ( i !== 'hiddenpower' ) types[ Dex.getMove(i).type ] = true;
								}			
							}
						}
					}
				}
				if (types[ move.type ]) return null;
			}
			return this.checkLearnset(move, template, lsetData, set);
		},
	},	
	{
		name: "[Gen 7] Jillian",
		desc: ["&bullet; A custom region",
		      ],
		ruleset: ['Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		banlist: [],
		mod: 'jillian',
	},
	{
		name: "[Gen 7] Megas For All",
		desc: ["&bullet; Megas",
		      ],
		ruleset: ['Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		banlist: [],
		mod: 'megasforall',
		searchShow: false,
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
  		name: "[Gen 7] Pokemon Let's Go",
  		desc: ["&bullet; <a href=https://www.smogon.com/forums/threads/p.3640426/>Pokemon: Let's Go</a>",
		      ],
  		ruleset: ['Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		mod: 'letsgo',
		// banlist: ['Unreleased', ],
  	},
	{
		name: "[Gen 7] Monotype Gen 8",
		desc: [
			"A Monotype-based pet mod with lots of new pokemon.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3642289/\">Monotype Gen 8 Thread</a>",
		],

		mod: 'monotypegen8',
		ruleset: ['Standard', 'Swagger Clause', 'Same Type Clause', 'Team Preview'],
		banlist: [
			'Aegislash', 'Arceus', 'Blaziken', 'Darkrai', 'Deoxys-Base', 'Deoxys-Attack', 'Dialga', 'Genesect', 'Giratina', 'Groudon', 'Ho-Oh', 'Hoopa-Unbound',
			'Kartana', 'Kyogre', 'Kyurem-White', 'Lugia', 'Lunala', 'Magearna', 'Marshadow', 'Mewtwo', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane',
			'Palkia', 'Pheromosa', 'Rayquaza', 'Reshiram', 'Shaymin-Sky', 'Solgaleo', 'Tapu Lele', 'Xerneas', 'Yveltal', 'Zekrom', 'Zygarde',
			'Battle Bond', 'Shadow Tag', 'Damp Rock', 'Gengarite', 'Kangaskhanite', 'Lucarionite', 'Mawilite', 'Medichamite', 'Metagrossite', 'Salamencite', 'Smooth Rock', 'Terrain Extender', 'Baton Pass', , 'Unreleased'
		],
		onSwitchIn: function (pokemon) {
            this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[silent]');
        },
	},
	
	{
		name: "[Gen 7] Mega Mirrors",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/mega-mirrors-slate-1-voting-abomasnow-absol-aerodactyl.3644178/">Mega Mirrors</a>`,
		],
		mod: 'megamirrors',
		ruleset: ['Standard', 'Team Preview'],
		banlist: ['Uber', 'Arena Trap', 'Power Construct', 'Shadow Tag', 'Baton Pass'],
	},
	{
  		name: "[Gen 7] OptiMons",
  		desc: ["&bullet; <a href=http://www.smogon.com/forums/threads/.3609208/>OptiMons</a>",
		      ],
  		ruleset: ['Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
  		banlist: ['Unreleased', ],
		mod: 'opti',
  	},
	{
		name: "[Gen 7] Pokemon: The New First Generation",
		desc: ["&bullet; <a href=http://www.smogon.com/forums/threads/pokemon-the-new-first-gen-submissions-for-new-pokemon-over.3578653/>Pokemon: The New First Generation</a>",
		       "&bullet; <a href=https://docs.google.com/spreadsheets/d/1RT8-Ntryi_SvlD_AwBCPWTso7bFZNpAGX4F7wuHBPQY/edit>Pokemon: The New First Gen Spreadhseet</a>",
		       "&bullet; Use /dgen (Pokemon/Item/Ability/Move) for more info",
		      ],
		ruleset: ['Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		banlist: [],
		mod: 'thefirstnewgen',
	},
	{
		name: "[Gen 5] Prism",
		desc: "Under Construction",
		mod: 'prism',
		ruleset: ['Pokemon', 'Standard', 'Evasion Abilities Clause'],
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
  		name: "[Gen 7] Super Smash Mods",
  		desc: [],
  		ruleset: ['Standard', '+Past', 'Dynamax Clause'],
		banlist: ['Uber', 'Power Construct', 'Shadow Tag', 'Baton Pass'],
		mod: 'smashmods',
		onSwitchIn: function (pokemon) {
            this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[silent]');
        },
	},
	{
		name: "[Gen 7] Sylvemons",
		desc: ["&bullet; <a href=https://www.smogon.com/forums/threads/.3612509/>SylveMons</a>",
				 "&bullet; <a href=https://docs.google.com/spreadsheets/d/18DiYjbZXv1Nm7tU-W0OMgPow0ZO7J2ETJF-hWapwM-o/edit>Sylvemons Archive</a>",
		      ],
		ruleset: ['Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		banlist: [ 'Uber', 'Arena Trap', /*'Time Warp', 'Power Construct', 'Shadow Tag', 'Baton Pass', 'Stalwart + Calm Mind', 'Stakataka', 'Raichu-Alola', 'Regice', 'Buzzwole + Perseverance', 'Reverse Core'*/],
		unbanlist: ['Blaziken'],
		mod: 'sylvemons',
	},
	{
		name: "[Gen 7] Sylvemons [Test]",
		desc: ["&bullet; <a href=https://www.smogon.com/forums/threads/.3612509/>SylveMons</a>",
				 "&bullet; <a href=https://docs.google.com/spreadsheets/d/18DiYjbZXv1Nm7tU-W0OMgPow0ZO7J2ETJF-hWapwM-o/edit>Sylvemons Archive</a>",
		      ],
		ruleset: ['Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		banlist: [, 'Uber', 'Arena Trap', 'Time Warp', 'Power Construct', 'Shadow Tag', 'Baton Pass', 'Stalwart + Calm Mind', 'Stakataka', 'Raichu-Alola', 'Regice', 'Buzzwole + Perseverance', 'Reverse Core'],
		unbanlist: ['Blaziken'],
		mod: 'sylvemonstest',
	},
	{
		name: "[Gen 7] Tennysonmons",
		desc: ["&bullet; Benmons",],
		ruleset: ['Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		//banlist: [],
		mod: 'tennysonmons',
		searchShow: false,
		challengeShow: false,
	},
	{
		name: "[Gen 7] The Pokedex According to Spook",
		desc: ["&bullet; <a href=https://www.smogon.com/forums/threads/the-pokedex-according-to-spook.3645318/>The Pokedex According to Spook</a>",],
		ruleset: ['Standard', 'Team Preview'],
		unbanlist: ['Aegislash', 'Aegislash-Blade', 'Shadow Tag', 'Arena Trap'],
		banlist: ['Stance Change', 'Uber'],
		//banlist: [],
		mod: 'Spookdex',
	},
	{
		name: "[Gen 7] Typing: The Mod",
		desc: ["&bullet; <a href=https://www.smogon.com/forums/threads/.3634253/>Typing: The Mod</a>",],
		ruleset: ['Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		//banlist: [],
		onSwitchIn: function (pokemon) {
            this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[silent]');
        },
		onBegin: function () {
			this.zMoveTable.Space = 'Event Horizon'
			this.zMoveTable.Time = 'Eternal Onslaught'
			this.zMoveTable.Light = 'Radiance Nova'
			this.zMoveTable.Heart = 'Compassion Cannon'
			this.zMoveTable.Food = 'Culinary Cataclysm'
		},
		mod: 'ttm',
		
	},
	{
  		name: "[Gen 7] Type Optimisation",
  		desc: ["&bullet; <a href=http://www.smogon.com/forums/threads/type-optimisation-slate-11-submissions-ghost-ghost-psychic-ghost-normal.3602766/>Type Optimisation</a>",
		      ],
  		ruleset: ['Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
  		banlist: ['Unreleased', ],
		mod: 'typeopt',
  	},
	{
		name: "[Gen 7] Ultra Space Variants",
		desc: ["&bullet; With the existence of alternate dimensions and regional Variants, why hasn't anyone combined the two? Welcome to the world of Ultra Space. This world is inhabited by strange creatures called Ultra Beasts. However, oddly enough, stranger creatures called Pokémon have slipped into our dimension through wormholes. These Pokemon have gone through odd changes, but somehow make them even stronger than usual. Astonishing, isn't it?",
				 "&bullet; <a href=http://www.smogon.com/forums/threads/ultra-space-variants-submissions-tentaquil-and-lolwutcar.3594692/>Ultra Space Variants V1</a>",
				 "&bullet; <a href=http://www.smogon.com/forums/threads/ultra-space-variants-v2-slate-johto-starters.3602098/>Ultra Space Variants V2",
		      ],
		ruleset: ['Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		banlist: [],
		mod: 'usv',
	},
	{
		name: "[Gen 7] Z-Moves Everywhere",
		desc: ["&bullet; <a href=http://www.smogon.com/forums/threads/z-moves-everywhere-slate-4-ninetales-torkoal-groudon-submissions-phase-extended.3592186/>Z-Moves Everywhere</a>"],
		ruleset: ['[Gen 7] Ubers'],
		banlist: ['Unreleased', ],
		mod: 'zmoveseverywhere',
	},

	// Other Metagames
	///////////////////////////////////////////////////////////////////

	{
		section: "Other Metagames",
		column: 2,
	},
	{
		name: "[Gen 8] Balanced Hackmons",
		desc: `Anything that can be hacked in-game and is usable in local battles is allowed.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3656408/">Balanced Hackmons</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3659817/">BH Resources</a>`,
		],

		mod: 'gen8',
		ruleset: ['-Nonexistent', 'OHKO Clause', 'Evasion Moves Clause', 'Forme Clause', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Sleep Clause Mod', 'Endless Battle Clause'],
		banlist: [
			'Eternatus-Eternamax', 'Shedinja', 'Comatose + Sleep Talk', 'Double Iron Bash', 'Octolock', 'Shell Smash',
			'Arena Trap', 'Contrary', 'Gorilla Tactics', 'Huge Power', 'Illusion', 'Innards Out', 'Libero', 'Magnet Pull', 'Moody',
			'Neutralizing Gas', 'Parental Bond', 'Protean', 'Pure Power', 'Shadow Tag', 'Stakeout', 'Water Bubble', 'Wonder Guard',
		],
		onValidateSet(set) {
			if (set.species === 'Zacian-Crowned' && (toID(set.item) !== 'rustedsword' || toID(set.ability) !== 'intrepidsword')) {
				return [set.species + " is banned."];
			}
		},
		onChangeSet(set) {
			const item = toID(set.item);
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
	},
	{
		name: "[Gen 8] Mix and Mega",
		desc: `Mega evolve any Pok&eacute;mon with any mega stone and no limit. Boosts based on mega evolution from gen 7.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3656469/">Mix and Mega</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3659028/">M&amp;M Resources</a>`,
		],

		mod: 'mixandmega',
		ruleset: ['Obtainable', 'Species Clause', 'Nickname Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Dynamax Clause', 'Sleep Clause Mod', 'Endless Battle Clause'],
		banlist: [
			'Eternatus', 'Lunala', 'Zacian-Crowned', 'Moody', 'Shadow Tag', 'Baton Pass', 'Electrify',
			'Beedrillite', 'Blazikenite', 'Gengarite', 'Kangaskhanite', 'Mawilite', 'Medichamite', 'Pidgeotite',
		],
		restricted: ['Gengar', 'Kyurem-Black', 'Kyurem-White', 'Marshadow', 'Melmetal', 'Mewtwo', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Reshiram', 'Solgaleo', 'Zacian', 'Zekrom', 'Zeraora'],
		onValidateTeam(team, format) {
			const restrictedPokemon = format.restricted || [];
			const itemTable = new Set<ID>();
			for (const set of team) {
				const item = this.dex.getItem(set.item);
				if (!item || !item.megaStone) continue;
				const species = this.dex.getSpecies(set.species);
				if (species.isNonstandard) return [`${species.baseSpecies} does not exist in gen 8.`];
				if (restrictedPokemon.includes(species.name)) {
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
			const oMegaSpecies = this.dex.getSpecies(pokemon.species.originalMega);
			if (oMegaSpecies.exists && pokemon.m.originalSpecies !== oMegaSpecies.baseSpecies) {
				// Place volatiles on the Pokémon to show its mega-evolved condition and details
				this.add('-start', pokemon, oMegaSpecies.requiredItem || oMegaSpecies.requiredMove, '[silent]');
				const oSpecies = this.dex.getSpecies(pokemon.m.originalSpecies);
				if (oSpecies.types.length !== pokemon.species.types.length || oSpecies.types[1] !== pokemon.species.types[1]) {
					this.add('-start', pokemon, 'typechange', pokemon.species.types.join('/'), '[silent]');
				}
			}
		},
		onSwitchOut(pokemon) {
			// @ts-ignore
			const oMegaSpecies = this.dex.getSpecies(pokemon.species.originalMega);
			if (oMegaSpecies.exists && pokemon.m.originalSpecies !== oMegaSpecies.baseSpecies) {
				this.add('-end', pokemon, oMegaSpecies.requiredItem || oMegaSpecies.requiredMove, '[silent]');
			}
		},
	},
	{
		name: "[Gen 8] Almost Any Ability",
		desc: `Pok&eacute;mon have access to almost any ability.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3656414/">Almost Any Ability</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3659124/">AAA Resources</a>`,
		],

		mod: 'gen8',
		ruleset: ['Obtainable', '!Obtainable Abilities', 'Species Clause', 'Nickname Clause', '2 Ability Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Dynamax Clause', 'Sleep Clause Mod', 'Endless Battle Clause'],
		banlist: [
			'Dracovish', 'Dragapult', 'Eternatus', 'Keldeo', 'Kyurem-Black', 'Kyurem-White', 'Lunala', 'Marshadow', 'Melmetal', 'Mewtwo', 'Necrozma-Dawn-Wings',
			'Necrozma-Dusk-Mane', 'Reshiram', 'Shedinja', 'Solgaleo', 'Urshifu', 'Urshifu-Rapid-Strike', 'Zacian', 'Zamazenta', 'Zekrom', 'Zeraora',
			'Arena Trap', 'Comatose', 'Contrary', 'Fluffy', 'Fur Coat', 'Gorilla Tactics', 'Huge Power', 'Ice Scales', 'Illusion', 'Imposter', 'Innards Out', 'Intrepid Sword',
			'Libero', 'Moody', 'Neutralizing Gas', 'Parental Bond', 'Protean', 'Pure Power', 'Shadow Tag', 'Simple', 'Stakeout', 'Speed Boost', 'Water Bubble', 'Wonder Guard',
			'Baton Pass',
		],
	},
	{
		name: "[Gen 8] STABmons",
		desc: `Pok&eacute;mon can use any move of their typing, in addition to the moves they can normally learn.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3656429/">STABmons</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3658578/">STABmons Resources</a>`,
		],

		mod: 'gen8',
		ruleset: ['Standard', 'STABmons Move Legality', 'Dynamax Clause'],
		banlist: [
			'Darmanitan', 'Darmanitan-Galar', 'Dracovish', 'Dragapult', 'Eternatus', 'Gengar', 'Kyurem-Black', 'Kyurem-White', 'Lunala', 'Marshadow',
			'Mewtwo', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Porygon-Z', 'Reshiram', 'Silvally', 'Solgaleo', 'Zacian', 'Zamazenta', 'Zekrom',
			'King\'s Rock', 'Moody', 'Shadow Tag', 'Baton Pass',
		],
		restricted: ['Acupressure', 'Belly Drum', 'Bolt Beak', 'Double Iron Bash', 'Electrify', 'Extreme Speed', 'Fishious Rend', 'Shell Smash', 'Shift Gear', 'Spore'],
	},
	{
		name: "[Gen 8] NFE",
		desc: `Only Pok&eacute;mon that can evolve are allowed.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3656332/">NFE Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3657558/">NFE Resources</a>`,
		],

		mod: 'gen8',
		ruleset: ['Not Fully Evolved', 'Standard', 'Dynamax Clause'],
		banlist: [
			'Chansey', 'Doublade', 'Gurdurr', 'Haunter', 'Ivysaur', 'Magneton', 'Mr. Mime-Galar',
			'Pawniard', 'Porygon2', 'Rhydon', 'Rufflet', 'Scyther', 'Sneasel', 'Type: Null',
			'Shadow Tag', 'Baton Pass',
		],
	},
	{
		name: "[Gen 8] Camomons",
		desc: `Pok&eacute;mon change type to match their first two moves.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3656413/">Camomons</a>`,
		],

		mod: 'gen8',
		searchShow: false,
		ruleset: ['Obtainable', 'Species Clause', 'Nickname Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Dynamax Clause', 'Sleep Clause Mod', 'Endless Battle Clause'],
		banlist: [
			'Darmanitan-Galar', 'Dracovish', 'Eternatus', 'Hydreigon', 'Kyurem', 'Kyurem-Black', 'Kyurem-White', 'Lunala', 'Marshadow', 'Melmetal',
			'Mewtwo', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Reshiram', 'Shedinja', 'Solgaleo', 'Zacian', 'Zamazenta', 'Zekrom', 'Zeraora',
			'Arena Trap', 'Moody', 'Shadow Tag', 'Baton Pass',
		],
		onModifySpecies(species, target, source, effect) {
			if (!target) return; // Chat command
			if (effect && ['imposter', 'transform'].includes(effect.id)) return;
			const types = [...new Set(target.baseMoveSlots.slice(0, 2).map(move => this.dex.getMove(move.id).type))];
			return Object.assign({}, species, {types: types});
		},
		onSwitchIn(pokemon) {
			this.add('-start', pokemon, 'typechange', pokemon.getTypes(true).join('/'), '[silent]');
		},
		onAfterMega(pokemon) {
			this.add('-start', pokemon, 'typechange', pokemon.getTypes(true).join('/'), '[silent]');
		},
	},
	{
		name: "[Gen 8] Pure Hackmons",
		desc: `Anything that can be hacked in-game and is usable in local battles is allowed.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3656851/">Pure Hackmons</a>`,
		],

		mod: 'gen8',
		searchShow: false,
		ruleset: ['-Nonexistent', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Endless Battle Clause'],
	},
	{
		name: "[Gen 8] Shared Power",
		desc: `Once a Pok&eacute;mon switches in, its ability is shared with the rest of the team.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3660877/">Shared Power</a>`,
		],

		mod: 'gen8',
		searchShow: false,
		ruleset: ['Standard', 'Dynamax Clause'],
		banlist: [
			'Darmanitan-Galar', 'Eternatus', 'Kyurem-Black', 'Kyurem-White', 'Lunala', 'Marshadow', 'Melmetal',
			'Mewtwo', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Reshiram', 'Shedinja', 'Solgaleo', 'Toxapex',
			'Zacian', 'Zamazenta', 'Zekrom', 'Leppa Berry', 'Baton Pass',
			'Arena Trap', 'Contrary', 'Drizzle ++ Swift Swim', 'Drought ++ Chlorophyll', 'Electric Surge ++ Surge Surfer',
			'Flare Boost', 'Fur Coat', 'Guts', 'Huge Power', 'Imposter', 'Innards Out', 'Magic Bounce', 'Magic Guard',
			'Mirror Armor', 'Mold Breaker', 'Moody', 'Neutralizing Gas', 'Regenerator ++ Emergency Exit',
			'Regenerator ++ Wimp Out', 'Sand Rush', 'Sand Veil', 'Shadow Tag', 'Simple', 'Slush Rush', 'Snow Cloak',
			'Speed Boost', 'Steelworker ++ Steely Spirit', 'Tinted Lens', 'Trace', 'Unaware', 'Unburden', 'Water Bubble',
		],
		getSharedPower(pokemon) {
			const sharedPower = new Set<string>();
			for (const ally of pokemon.side.pokemon) {
				if (ally.previouslySwitchedIn > 0) {
					sharedPower.add(ally.baseAbility);
				}
			}
			sharedPower.delete(pokemon.baseAbility);
			return sharedPower;
		},
		onBeforeSwitchIn(pokemon) {
			let format = this.format;
			if (!format.getSharedPower) format = this.dex.getFormat('gen8sharedpower');
			for (const ability of format.getSharedPower!(pokemon)) {
				const effect = 'ability:' + ability;
				pokemon.volatiles[effect] = {id: toID(effect), target: pokemon};
			}
		},
		onSwitchInPriority: 2,
		onSwitchIn(pokemon) {
			let format = this.format;
			if (!format.getSharedPower) format = this.dex.getFormat('gen8sharedpower');
			for (const ability of format.getSharedPower!(pokemon)) {
				const effect = 'ability:' + ability;
				delete pokemon.volatiles[effect];
				pokemon.addVolatile(effect);
			}
		},
		field: {
			suppressingWeather() {
				for (const side of this.battle.sides) {
					for (const pokemon of side.active) {
						if (pokemon && !pokemon.ignoringAbility() && pokemon.hasAbility('Cloud Nine')) {
							return true;
						}
					}
				}
				return false;
			},
		},
		pokemon: {
			hasAbility(ability) {
				if (this.ignoringAbility()) return false;
				if (Array.isArray(ability)) return ability.some(abil => this.hasAbility(abil));
				const abilityid = toID(ability);
				return this.ability === abilityid || !!this.volatiles['ability:' + abilityid];
			},
		},
	},
	{
		name: "[Gen 7] Balanced Hackmons",
		desc: `Anything that can be hacked in-game and is usable in local battles is allowed.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/posts/8407209/">USM Balanced Hackmons</a>`,
		],

		mod: 'gen7',
		searchShow: false,
		ruleset: ['-Nonexistent', '2 Ability Clause', 'OHKO Clause', 'Evasion Moves Clause', 'CFZ Clause', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Sleep Clause Mod', 'Endless Battle Clause'],
		banlist: [
			'Groudon-Primal', 'Rayquaza-Mega', 'Gengarite', 'Comatose + Sleep Talk', 'Chatter',
			'Arena Trap', 'Contrary', 'Huge Power', 'Illusion', 'Innards Out', 'Magnet Pull', 'Moody', 'Parental Bond', 'Protean', 'Psychic Surge', 'Pure Power', 'Shadow Tag', 'Stakeout', 'Water Bubble', 'Wonder Guard',
		],
	},

	// Pet Mods
	///////////////////////////////////////////////////////////////////

	{
		section: "Pet Mods",
		column: 2,
	},
	{
		name: "[Gen 8 Pet Mod] Roulettemons",
		desc: `A metagame made up of brand new Pok&eacute;mon that have randomly generated moves, stats, abilities, and types.`,
		threads: [
			`<a href="https://www.smogon.com/forums/threads/3649106/">Roulettemons</a>`,
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
		name: "[Gen 6] Gen-NEXT OU",

		mod: 'gennext',
		searchShow: false,
		challengeShow: false,
		ruleset: ['Obtainable', 'Standard NEXT', 'Team Preview'],
		banlist: ['Uber'],
	},

	// Randomized Metas
	///////////////////////////////////////////////////////////////////

	{
		section: "Randomized Metas",
		column: 2,
	},
	{
		name: "[Gen 8] Monotype Random Battle",

		mod: 'gen8',
		team: 'random',
		ruleset: ['Obtainable', 'Same Type Clause', 'HP Percentage Mod', 'Cancel Mod', 'Sleep Clause Mod'],
	},
	{
		name: "[Gen 8] Challenge Cup 1v1",

		mod: 'gen8',
		team: 'randomCC',
		teamLength: {
			battle: 1,
		},
		ruleset: ['Obtainable', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview', 'Dynamax Clause'],
	},
	{
		name: "[Gen 8] Challenge Cup 2v2",

		mod: 'gen8',
		team: 'randomCC',
		gameType: 'doubles',
		teamLength: {
			battle: 2,
		},
		searchShow: false,
		ruleset: ['Obtainable', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview', 'Dynamax Clause'],
	},
	{
		name: "[Gen 8] Hackmons Cup",
		desc: `Randomized teams of level-balanced Pok&eacute;mon with absolutely any ability, moves, and item.`,

		mod: 'gen8',
		team: 'randomHC',
		ruleset: ['Obtainable Formes', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "[Gen 8] Doubles Hackmons Cup",

		mod: 'gen8',
		gameType: 'doubles',
		team: 'randomHC',
		searchShow: false,
		ruleset: ['Obtainable', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "[Gen 8] CAP 1v1",
		desc: `Randomly generated 1v1-style teams only including Pok&eacute;mon made by the Create-A-Pok&eacute;mon Project.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3663533/">CAP 1v1</a>`,
		],

		mod: 'gen8',
		team: 'randomCAP1v1',
		teamLength: {
			battle: 1,
		},
		ruleset: ['Species Clause', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Sleep Clause Mod', 'Dynamax Clause'],
	},
	
	{
		name: "[Gen 8] M4A Random Battle",
		mod: 'm4av6',
		team: 'random',
		ruleset: ['Dynamax Clause', 'Obtainable', 'Species Clause', 'HP Percentage Mod', 'Cancel Mod', 'Sleep Clause Mod'],
		onAfterMega(pokemon) {
			const species = this.dex.getSpecies(pokemon.species.name);
			const abilities = species.abilities;
			const baseStats = species.baseStats;
			const type = species.types[0];
			if (species.types[1]) {
				const type2 = species.types[1];
				this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="https://${Config.routes.client}/sprites/types/${type}.png" alt="${type}" height="14" width="32"><img src="https://${Config.routes.client}/sprites/types/${type2}.png" alt="${type2}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities[0] + `</span><span class="col abilitycol"></span></span><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` + baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` + baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` + baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` + baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` + baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` + baseStats.spe + `</span> </span></li><li style="clear: both"></li></ul>`);
			} else {
				this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="https://${Config.routes.client}/sprites/types/${type}.png" alt="${type}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities[0] + `</span><span class="col abilitycol"></span></span><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` + baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` + baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` + baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` + baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` + baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` + baseStats.spe + `</span> </span></li><li style="clear: both"></li></ul>`);
			}
		},
	},
	
	{
		name: "[Gen 8] M4A Random (Dynamax)",

		mod: 'm4av6',
		team: 'random',
		ruleset: ['Obtainable', 'Species Clause', 'HP Percentage Mod', 'Cancel Mod', 'Sleep Clause Mod'],
		onAfterMega(pokemon) {
			const species = this.dex.getSpecies(pokemon.species.name);
			const abilities = species.abilities;
			const baseStats = species.baseStats;
			const type = species.types[0];
			if (species.types[1]) {
				const type2 = species.types[1];
				this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="https://${Config.routes.client}/sprites/types/${type}.png" alt="${type}" height="14" width="32"><img src="https://${Config.routes.client}/sprites/types/${type2}.png" alt="${type2}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities[0] + `</span><span class="col abilitycol"></span></span><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` + baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` + baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` + baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` + baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` + baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` + baseStats.spe + `</span> </span></li><li style="clear: both"></li></ul>`);
			} else {
				this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="https://${Config.routes.client}/sprites/types/${type}.png" alt="${type}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities[0] + `</span><span class="col abilitycol"></span></span><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` + baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` + baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` + baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` + baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` + baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` + baseStats.spe + `</span> </span></li><li style="clear: both"></li></ul>`);
			}
		},
		searchShow: false,
		challengeShow: false, 
	},
	
	{
		name: "[Gen 8] Ink's Winter Wonderland",
		desc: `Play around both your opponent and the treacherous weather conditions in this randomized micrometa!`,
		mod: 'inksrandbats',
		team: 'random', 
		ruleset: ['Dynamax Clause', 'Obtainable', 'Species Clause', 'HP Percentage Mod', 'Cancel Mod', 'Sleep Clause Mod', 'Freeze Clause Mod', 'Permasnow'],
		searchShow: false,
		challengeShow: false,
	},
	
	{
		name: "[Gen 7] Random Battle",
		desc: `Randomized teams of level-balanced Pok&eacute;mon with sets that are generated to be competitively viable.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3591157/">Sets and Suggestions</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3616946/">Role Compendium</a>`,
		],

		mod: 'gen7',
		team: 'random',
		ruleset: ['Obtainable', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "[Gen 7] Random Doubles Battle",
		threads: [`&bullet; <a href="https://www.smogon.com/forums/threads/3601525/">Sets and Suggestions</a>`],

		mod: 'gen7',
		gameType: 'doubles',
		team: 'random',
		searchShow: false,
		ruleset: ['Obtainable', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "[Gen 7] Battle Factory",
		desc: `Randomized teams of Pok&eacute;mon for a generated Smogon tier with sets that are competitively viable.`,

		mod: 'gen7',
		team: 'randomFactory',
		ruleset: ['Obtainable', 'Sleep Clause Mod', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Mega Rayquaza Clause'],
	},
	{
		name: "[Gen 7] BSS Factory",
		desc: `Randomized 3v3 Singles featuring Pok&eacute;mon and movesets popular in Battle Spot Singles.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3604845/">Information and Suggestions Thread</a>`,
		],

		mod: 'gen7',
		team: 'randomBSSFactory',
		searchShow: false,
		teamLength: {
			validate: [3, 6],
			battle: 3,
		},
		ruleset: ['Obtainable', 'Standard GBU'],
	},
	{
		name: "[Gen 7] Hackmons Cup",
		desc: `Randomized teams of level-balanced Pok&eacute;mon with absolutely any ability, moves, and item.`,

		mod: 'gen7',
		team: 'randomHC',
		searchShow: false,
		ruleset: ['HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "[Gen 7] Super Staff Bros Brawl",
		desc: "Super Staff Bros returns for another round! Battle with a random team of pokemon created by the sim staff.",
		threads: [
			`&bullet; <a href="https://www.smogon.com/articles/super-staff-bros-brawl">Introduction &amp; Roster</a>`,
		],

		mod: 'ssb',
		team: 'randomStaffBros',
		ruleset: ['HP Percentage Mod', 'Cancel Mod', 'Sleep Clause Mod'],
		onBegin() {
			this.add('raw|SUPER STAFF BROS <b>BRAWL</b>!!');
			this.add('message', 'GET READY FOR THE NEXT BATTLE!');
			if (this.teamGenerator.allXfix) this.add(`c|~HoeenHero|Oops I dropped my bag of xfix sets sorry!`);
			this.add(`raw|<div class='broadcast-green'><b>Wondering what all these custom moves, abilities, and items do?<br />Check out the <a href="https://www.smogon.com/articles/super-staff-bros-brawl" target="_blank">Super Staff Bros Brawl Guide</a> and find out!</b></div>`);
		},
		onSwitchInPriority: 100,
		onSwitchIn(pokemon) {
			let name: string = toID(pokemon.illusion ? pokemon.illusion.name : pokemon.name);
			if (this.dex.getSpecies(name).exists || name === 'rage') {
				// Certain pokemon have volatiles named after their id
				// To prevent overwriting those, and to prevent accidentaly leaking
				// that a pokemon is on a team through the onStart even triggering
				// at the start of a match, users with pokemon names will need their
				// statuses to end in "user".
				name = name + 'user';
			}
			// Add the mon's status effect to it as a volatile.
			const status = this.dex.getEffect(name);
			if (status?.exists) {
				pokemon.addVolatile(name, pokemon);
			}
		},
	},
	{
		name: "[Gen 7 Let's Go] Random Battle",

		mod: 'letsgo',
		team: 'random',
		searchShow: false,
		ruleset: ['Obtainable', 'Allow AVs', 'HP Percentage Mod', 'Cancel Mod', 'Sleep Clause Mod'],
	},
	{
		name: "[Gen 6] Random Battle",

		mod: 'gen6',
		team: 'random',
		ruleset: ['Obtainable', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "[Gen 6] Battle Factory",
		desc: `Randomized teams of Pok&eacute;mon for a generated Smogon tier with sets that are competitively viable.`,

		mod: 'gen6',
		team: 'randomFactory',
		searchShow: false,
		ruleset: ['Obtainable', 'Sleep Clause Mod', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Mega Rayquaza Clause'],
	},
	{
		name: "[Gen 5] Random Battle",

		mod: 'gen5',
		team: 'random',
		ruleset: ['Obtainable', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "[Gen 4] Random Battle",

		mod: 'gen4',
		team: 'random',
		ruleset: ['Obtainable', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "[Gen 3] Random Battle",

		mod: 'gen3',
		team: 'random',
		ruleset: ['Standard'],
	},
	{
		name: "[Gen 2] Random Battle",

		mod: 'gen2',
		team: 'random',
		ruleset: ['Standard'],
	},
	{
		name: "[Gen 1] Random Battle",

		mod: 'gen1',
		team: 'random',
		ruleset: ['Standard'],
	},
	{
		name: "[Gen 1] Challenge Cup",

		mod: 'gen1',
		team: 'randomCC',
		searchShow: false,
		challengeShow: false,
		ruleset: ['Obtainable', 'HP Percentage Mod', 'Cancel Mod'],
	},

	// RoA Spotlight
	///////////////////////////////////////////////////////////////////

	{
		section: "RoA Spotlight",
		column: 3,
	},
	{
		name: "[Gen 1] Ubers",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/posts/8286283/">RBY Ubers</a>`,
		],

		mod: 'gen1',
		// searchShow: false,
		ruleset: ['Standard'],
	},
	{
		name: "[Gen 3] NU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3503540/">ADV NU Viability Rankings</a>`,
		],

		mod: 'gen3',
		// searchShow: false,
		ruleset: ['[Gen 3] UU', '!NFE Clause'],
		banlist: ['UU'],
	},
	{
		name: "[Gen 5] PU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/posts/7326932/">BW2 PU</a>`,
		],

		mod: 'gen5',
		// searchShow: false,
		ruleset: ['[Gen 5] NU'],
		banlist: ['NU', 'Combusken', 'Linoone', 'Riolu', 'Rotom-Frost', 'Vigoroth'],
	},

	// Past Gens OU
	///////////////////////////////////////////////////////////////////

	{
		section: "Past Gens OU",
		column: 3,
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

	// US/UM Singles
	///////////////////////////////////////////////////////////////////
	{
		section: "US/UM Singles",
		column: 3,
	},
	{
		name: "[Gen 7] Ubers",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/posts/8286276/">USM Ubers</a>`,
		],

		mod: 'gen7',
		// searchShow: false,
		ruleset: ['Standard', 'Mega Rayquaza Clause'],
		banlist: ['Baton Pass'],
	},
	{
		name: "[Gen 7] UU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3621217/">USM UU Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3641346/">USM UU Viability Rankings</a>`,
		],

		mod: 'gen7',
		// searchShow: false,
		ruleset: ['[Gen 7] OU'],
		banlist: ['OU', 'UUBL', 'Drizzle', 'Drought', 'Kommonium Z', 'Mewnium Z'],
	},
	{
		name: "[Gen 7] RU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3645338/">USM RU Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3645873/">USM RU Viability Rankings</a>`,
		],

		mod: 'gen7',
		searchShow: false,
		ruleset: ['[Gen 7] UU'],
		banlist: ['UU', 'RUBL', 'Mimikyu', 'Aurora Veil'],
		unbanlist: ['Drought'],
	},
	{
		name: "[Gen 7] NU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3632667/">USM NU Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3645166/">USM NU Viability Rankings</a>`,
		],

		mod: 'gen7',
		searchShow: false,
		ruleset: ['[Gen 7] RU'],
		banlist: ['RU', 'NUBL', 'Drought'],
	},
	{
		name: "[Gen 7] PU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3611496/">USM PU Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3614892/">USM PU Viability Rankings</a>`,
		],

		mod: 'gen7',
		searchShow: false,
		ruleset: ['[Gen 7] NU'],
		banlist: ['NU', 'PUBL'],
	},
	{
		name: "[Gen 7] LC",
		threads: [
			`&bullet; <a href="https://www.smogon.com/dex/sm/formats/lc/">USM LC Banlist</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3639319/">USM LC Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3621440/">USM LC Viability Rankings</a>`,
		],

		mod: 'gen7',
		searchShow: false,
		maxLevel: 5,
		ruleset: ['Little Cup', 'Standard', 'Swagger Clause'],
		banlist: [
			'Aipom', 'Cutiefly', 'Drifloon', 'Gligar', 'Gothita', 'Meditite', 'Misdreavus', 'Murkrow', 'Porygon',
			'Scyther', 'Sneasel', 'Swirlix', 'Tangela', 'Trapinch', 'Vulpix-Base', 'Wingull', 'Yanma',
			'Eevium Z', 'Baton Pass', 'Dragon Rage', 'Sonic Boom',
		],
	},
	{
		name: "[Gen 7] Monotype",
		desc: `All the Pok&eacute;mon on a team must share a type.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/posts/8411581/">USM Monotype</a>`,
		],

		mod: 'gen7',
		// searchShow: false,
		ruleset: ['Same Type Clause', 'Standard', 'Swagger Clause'],
		banlist: [
			'Aegislash', 'Arceus', 'Blaziken', 'Darkrai', 'Deoxys-Base', 'Deoxys-Attack', 'Dialga', 'Genesect', 'Gengar-Mega', 'Giratina', 'Groudon',
			'Ho-Oh', 'Hoopa-Unbound', 'Kangaskhan-Mega', 'Kartana', 'Kyogre', 'Kyurem-White', 'Lucario-Mega', 'Lugia', 'Lunala', 'Magearna',
			'Marshadow', 'Mawile-Mega', 'Medicham-Mega', 'Metagross-Mega', 'Mewtwo', 'Naganadel', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Palkia',
			'Pheromosa', 'Rayquaza', 'Reshiram', 'Salamence-Mega', 'Shaymin-Sky', 'Solgaleo', 'Tapu Lele', 'Xerneas', 'Yveltal', 'Zekrom', 'Zygarde',
			'Battle Bond', 'Shadow Tag', 'Damp Rock', 'Smooth Rock', 'Terrain Extender', 'Baton Pass',
		],
	},
	{
		name: "[Gen 7] Anything Goes",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3587441/">Anything Goes Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3591711/">Anything Goes Viability Rankings</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3646736/">Anything Goes Sample Teams</a>`,
		],

		mod: 'gen7',
		// searchShow: false,
		ruleset: ['Obtainable', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Endless Battle Clause'],
	},
	{
		name: "[Gen 7] 1v1",
		desc: `Bring three Pok&eacute;mon to Team Preview and choose one to battle.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3646757/">1v1 Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3646758/">1v1 Viability Rankings</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3646826/">1v1 Sample Teams</a>`,
		],

		mod: 'gen7',
		searchShow: false,
		teamLength: {
			validate: [1, 3],
			battle: 1,
		},
		ruleset: ['Obtainable', 'Species Clause', 'Nickname Clause', 'OHKO Clause', 'Swagger Clause', 'Evasion Moves Clause', 'Accuracy Moves Clause', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Endless Battle Clause'],
		banlist: [
			'Arceus', 'Darkrai', 'Deoxys-Base', 'Deoxys-Attack', 'Deoxys-Defense', 'Dialga', 'Giratina',
			'Groudon', 'Ho-Oh', 'Kangaskhan-Mega', 'Kyogre', 'Kyurem-Black', 'Kyurem-White', 'Lugia', 'Lunala', 'Marshadow', 'Mewtwo',
			'Mimikyu', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Palkia', 'Rayquaza', 'Reshiram', 'Salamence-Mega', 'Shaymin-Sky',
			'Snorlax', 'Solgaleo', 'Tapu Koko', 'Xerneas', 'Yveltal', 'Zekrom', 'Focus Sash', 'Moody', 'Perish Song', 'Detect + Fightinium Z',
		],
	},
	{
		name: "[Gen 7] ZU",
		desc: `The unofficial usage-based tier below PU.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3646743/">ZU Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3643412/">ZU Viability Rankings</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3646739/">ZU Sample Teams</a>`,
		],

		mod: 'gen7',
		searchShow: false,
		ruleset: ['[Gen 7] PU'],
		banlist: [
			'PU', 'Carracosta', 'Crabominable', 'Gorebyss', 'Jynx', 'Raticate-Alola',
			'Shiftry', 'Throh', 'Turtonator', 'Type: Null', 'Ursaring', 'Victreebel',
		],
	},
	{
		name: "[Gen 7] CAP",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3621207/">CAP Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3626018/">CAP Viability Rankings</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3648521/">CAP Sample Teams</a>`,
		],

		mod: 'gen7',
		searchShow: false,
		ruleset: ['[Gen 7] OU', '+CAP'],
	},
	{
		name: "[Gen 7] Battle Spot Singles",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3601012/">Introduction to Battle Spot Singles</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3605970/">Battle Spot Singles Viability Rankings</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3601658/">Battle Spot Singles Role Compendium</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3619162/">Battle Spot Singles Sample Teams</a>`,
		],

		mod: 'gen7',
		searchShow: false,
		maxForcedLevel: 50,
		teamLength: {
			validate: [3, 6],
			battle: 3,
		},
		ruleset: ['Standard GBU'],
		minSourceGen: 6,
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

	// US/UM Doubles
	///////////////////////////////////////////////////////////////////

	{
		section: "US/UM Doubles",
		column: 3,
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
	{
		name: "[Gen 7] Doubles UU",
		threads: [`&bullet; <a href="https://www.smogon.com/forums/threads/3598014/">Doubles UU Metagame Discussion</a>`],

		mod: 'gen7',
		gameType: 'doubles',
		searchShow: false,
		ruleset: ['[Gen 7] Doubles OU'],
		banlist: ['DOU', 'DBL'],
	},
	{
		name: "[Gen 7] VGC 2019",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3641100/">VGC 2019 Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3641123/">VGC 2019 Viability Rankings</a>`,
		],

		mod: 'gen7',
		gameType: 'doubles',
		searchShow: false,
		forcedLevel: 50,
		teamLength: {
			validate: [4, 6],
			battle: 4,
		},
		ruleset: ['Minimal GBU', 'VGC Timer'],
		banlist: ['Unown'],
		minSourceGen: 7,
		onValidateTeam(team) {
			const legends = [
				'Mewtwo', 'Lugia', 'Ho-Oh', 'Kyogre', 'Groudon', 'Rayquaza', 'Dialga', 'Palkia', 'Giratina', 'Reshiram', 'Zekrom', 'Kyurem', 'Xerneas', 'Yveltal', 'Zygarde', 'Cosmog', 'Cosmoem', 'Solgaleo', 'Lunala', 'Necrozma',
			];
			let n = 0;
			for (const set of team) {
				const baseSpecies = this.dex.getSpecies(set.species).baseSpecies;
				if (legends.includes(baseSpecies)) n++;
				if (n > 2) return [`You can only use up to two legendary Pok\u00E9mon.`];
			}
		},
	},
	{
		name: "[Gen 7] VGC 2018",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3631800/">VGC 2018 Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3622041/">VGC 2018 Viability Rankings</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3628885/">VGC 2018 Sample Teams</a>`,
		],

		mod: 'gen7',
		gameType: 'doubles',
		searchShow: false,
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
		ruleset: ['Standard GBU'],
		banlist: ['Oranguru + Symbiosis', 'Passimian + Defiant', 'Unown', 'Custap Berry', 'Enigma Berry', 'Jaboca Berry', 'Micle Berry', 'Rowap Berry'],
		minSourceGen: 7,
	},
	{
		name: "[Gen 7] VGC 2017",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3583926/">VGC 2017 Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3591794/">VGC 2017 Viability Rankings</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3590391/">VGC 2017 Sample Teams</a>`,
		],

		mod: 'vgc17',
		gameType: 'doubles',
		searchShow: false,
		forcedLevel: 50,
		teamLength: {
			validate: [4, 6],
			battle: 4,
		},
		timer: {
			starting: 15 * 60,
			addPerTurn: 0,
			maxPerTurn: 55,
			maxFirstTurn: 90,
			grace: 90,
			timeoutAutoChoose: true,
			dcTimerBank: false,
		},
		ruleset: ['Obtainable', 'Alola Pokedex', 'Species Clause', 'Nickname Clause', 'Item Clause', 'Team Preview', 'Cancel Mod'],
		banlist: [
			'Solgaleo', 'Lunala', 'Necrozma', 'Magearna', 'Marshadow', 'Zygarde', 'Mega',
			'Custap Berry', 'Enigma Berry', 'Jaboca Berry', 'Micle Berry', 'Rowap Berry',
		],
		minSourceGen: 7,
	},
	{
		name: "[Gen 7] Battle Spot Doubles",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3595001/">Battle Spot Doubles Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3593890/">Battle Spot Doubles Viability Rankings</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3595859/">Battle Spot Doubles Sample Teams</a>`,
		],

		mod: 'gen7',
		gameType: 'doubles',
		searchShow: false,
		maxForcedLevel: 50,
		teamLength: {
			validate: [4, 6],
			battle: 4,
		},
		ruleset: ['Standard GBU'],
		minSourceGen: 6,
	},
	{
		name: "[Gen 7] Doubles Custom Game",

		mod: 'gen7',
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

	// OR/AS Singles
	///////////////////////////////////////////////////////////////////

	{
		section: "OR/AS Singles",
		column: 4,
	},
	{
		name: "[Gen 6] Ubers",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/posts/8286277/">ORAS Ubers</a>`,
		],

		mod: 'gen6',
		searchShow: false,
		ruleset: ['Standard', 'Swagger Clause', 'Mega Rayquaza Clause'],
	},
	{
		name: "[Gen 6] UU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/dex/xy/tags/uu/">ORAS UU Banlist</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3598164/">ORAS UU Viability Rankings</a>`,
		],

		mod: 'gen6',
		searchShow: false,
		ruleset: ['[Gen 6] OU'],
		banlist: ['OU', 'UUBL', 'Drizzle', 'Drought'],
	},
	{
		name: "[Gen 6] RU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/dex/xy/tags/ru/">ORAS RU Banlist</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3574583/">ORAS RU Viability Rankings</a>`,
		],

		mod: 'gen6',
		searchShow: false,
		ruleset: ['[Gen 6] UU'],
		banlist: ['UU', 'RUBL'],
	},
	{
		name: "[Gen 6] NU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/dex/xy/tags/nu/">ORAS NU Banlist</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3555650/">ORAS NU Viability Rankings</a>`,
		],

		mod: 'gen6',
		searchShow: false,
		ruleset: ['[Gen 6] RU'],
		banlist: ['RU', 'NUBL'],
	},
	{
		name: "[Gen 6] PU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/dex/xy/tags/pu/">ORAS PU Banlist</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3528743/">ORAS PU Viability Rankings</a>`,
		],

		mod: 'gen6',
		searchShow: false,
		ruleset: ['[Gen 6] NU'],
		banlist: ['NU', 'PUBL', 'Chatter'],
	},
	{
		name: "[Gen 6] LC",
		threads: [
			`&bullet; <a href="https://www.smogon.com/dex/xy/formats/lc/">ORAS LC Banlist</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3547566/">ORAS LC Viability Rankings</a>`,
		],

		mod: 'gen6',
		searchShow: false,
		maxLevel: 5,
		ruleset: ['Standard', 'Little Cup'],
		banlist: [
			'Drifloon', 'Gligar', 'Meditite', 'Misdreavus', 'Murkrow', 'Scyther', 'Sneasel', 'Swirlix', 'Tangela', 'Yanma',
			'Baton Pass', 'Dragon Rage', 'Sonic Boom', 'Swagger',
		],
	},
	{
		name: "[Gen 6] Monotype",
		desc: `All the Pok&eacute;mon on a team must share a type.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/posts/8411583/">ORAS Monotype</a>`,
		],

		mod: 'gen6',
		searchShow: false,
		ruleset: ['Standard', 'Swagger Clause', 'Same Type Clause'],
		banlist: [
			'Aegislash', 'Altaria-Mega', 'Arceus', 'Blaziken', 'Charizard-Mega-X', 'Darkrai', 'Deoxys-Base', 'Deoxys-Attack', 'Dialga',
			'Genesect', 'Gengar-Mega', 'Giratina', 'Greninja', 'Groudon', 'Ho-Oh', 'Hoopa-Unbound', 'Kangaskhan-Mega', 'Kyogre',
			'Kyurem-White', 'Lucario-Mega', 'Lugia', 'Mawile-Mega', 'Medicham-Mega', 'Metagross-Mega', 'Mewtwo', 'Palkia', 'Rayquaza',
			'Reshiram', 'Sableye-Mega', 'Salamence-Mega', 'Shaymin-Sky', 'Slowbro-Mega', 'Talonflame', 'Xerneas', 'Yveltal', 'Zekrom',
			'Shadow Tag', 'Damp Rock', 'Smooth Rock', 'Soul Dew', 'Baton Pass',
		],
	},
	{
		name: "[Gen 6] Anything Goes",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3523229/">ORAS Anything Goes</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3548945/">ORAS AG Resources</a>`,
		],

		mod: 'gen6',
		searchShow: false,
		ruleset: ['Obtainable', 'Team Preview', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "[Gen 6] 1v1",
		desc: `Bring three Pok&eacute;mon to Team Preview and choose one to battle.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/posts/8031459/">ORAS 1v1</a>`,
		],

		mod: 'gen6',
		searchShow: false,
		teamLength: {
			validate: [1, 3],
			battle: 1,
		},
		ruleset: ['Obtainable', 'Nickname Clause', 'Moody Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Accuracy Moves Clause', 'Swagger Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview'],
		banlist: [
			'Arceus', 'Blaziken', 'Darkrai', 'Deoxys-Base', 'Deoxys-Attack', 'Deoxys-Defense',
			'Dialga', 'Giratina', 'Groudon', 'Ho-Oh', 'Kangaskhan-Mega', 'Kyogre', 'Kyurem-White', 'Lugia', 'Mewtwo',
			'Palkia', 'Rayquaza', 'Reshiram', 'Salamence-Mega', 'Shaymin-Sky', 'Xerneas', 'Yveltal', 'Zekrom',
			'Focus Sash', 'Soul Dew', 'Perish Song',
		],
	},
	{
		name: "[Gen 6] CAP",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3537407/">ORAS CAP Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/posts/5594694/">ORAS CAP Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3545628/">ORAS CAP Viability Rankings</a>`,
		],

		mod: 'gen6',
		searchShow: false,
		ruleset: ['[Gen 6] OU', '+CAP'],
	},
	{
		name: "[Gen 6] Battle Spot Singles",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3527960/">ORAS Battle Spot Singles</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3554616/">ORAS BSS Viability Rankings</a>`,
		],

		mod: 'gen6',
		searchShow: false,
		maxForcedLevel: 50,
		teamLength: {
			validate: [3, 6],
			battle: 3,
		},
		ruleset: ['Obtainable', 'Standard GBU'],
		minSourceGen: 6,
	},
	{
		name: "[Gen 6] Custom Game",

		mod: 'gen6',
		searchShow: false,
		debug: true,
		maxLevel: 9999,
		battle: {trunc: Math.trunc},
		defaultLevel: 100,
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod'],
	},

	// OR/AS Doubles/Triples
	///////////////////////////////////////////////////////////////////

	{
		section: "OR/AS Doubles/Triples",
		column: 4,
	},
	{
		name: "[Gen 6] Doubles OU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3606255/">ORAS Doubles OU Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/posts/7387213/">ORAS Doubles OU Viability Rankings</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/posts/7387215/">ORAS Doubles OU Sample Teams</a>`,
		],

		mod: 'gen6',
		gameType: 'doubles',
		searchShow: false,
		ruleset: ['Standard Doubles', 'Swagger Clause'],
		banlist: ['DUber', 'Soul Dew', 'Dark Void'],
	},
	{
		name: "[Gen 6] VGC 2016",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3558332/">VGC 2016 Rules</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3580592/">VGC 2016 Viability Rankings</a>`,
		],

		mod: 'gen6',
		gameType: 'doubles',
		searchShow: false,
		maxForcedLevel: 50,
		teamLength: {
			validate: [4, 6],
			battle: 4,
		},
		ruleset: ['Obtainable', 'Species Clause', 'Nickname Clause', 'Item Clause', 'Team Preview', 'Cancel Mod'],
		banlist: [
			'Mew', 'Celebi', 'Jirachi', 'Deoxys', 'Phione', 'Manaphy', 'Darkrai', 'Shaymin', 'Arceus',
			'Victini', 'Keldeo', 'Meloetta', 'Genesect', 'Diancie', 'Hoopa', 'Volcanion', 'Soul Dew',
		],
		minSourceGen: 6,
		onValidateTeam(team) {
			const legends = [
				'Mewtwo', 'Lugia', 'Ho-Oh', 'Kyogre', 'Groudon', 'Rayquaza', 'Dialga', 'Palkia', 'Giratina', 'Reshiram', 'Zekrom', 'Kyurem', 'Xerneas', 'Yveltal', 'Zygarde',
			];
			let n = 0;
			for (const set of team) {
				const baseSpecies = this.dex.getSpecies(set.species).baseSpecies;
				if (legends.includes(baseSpecies)) n++;
				if (n > 2) return ["You can only use up to two legendary Pok\u00E9mon."];
			}
		},
	},
	{
		name: "[Gen 6] Battle Spot Doubles",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3560820/">ORAS Battle Spot Doubles Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3560824/">ORAS BSD Viability Rankings</a>`,
		],

		mod: 'gen6',
		gameType: 'doubles',
		searchShow: false,
		maxForcedLevel: 50,
		teamLength: {
			validate: [4, 6],
			battle: 4,
		},
		ruleset: ['Standard GBU'],
		minSourceGen: 6,
	},
	{
		name: "[Gen 6] Doubles Custom Game",

		mod: 'gen6',
		gameType: 'doubles',
		searchShow: false,
		maxLevel: 9999,
		battle: {trunc: Math.trunc},
		defaultLevel: 100,
		debug: true,
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod'],
	},
	{
		name: "[Gen 6] Battle Spot Triples",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3533914/">ORAS Battle Spot Triples Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3549201/">ORAS BST Viability Rankings</a>`,
		],

		mod: 'gen6',
		gameType: 'triples',
		searchShow: false,
		maxForcedLevel: 50,
		teamLength: {
			validate: [6, 6],
		},
		ruleset: ['Standard GBU'],
		minSourceGen: 6,
	},
	{
		name: "[Gen 6] Triples Custom Game",

		mod: 'gen6',
		gameType: 'triples',
		searchShow: false,
		maxLevel: 9999,
		battle: {trunc: Math.trunc},
		defaultLevel: 100,
		debug: true,
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod'],
	},

	// B2/W2 Singles
	///////////////////////////////////////////////////////////////////

	{
		section: "B2/W2 Singles",
		column: 4,
	},
	{
		name: "[Gen 5] Ubers",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/posts/8286278/">BW2 Ubers</a>`,
		],

		mod: 'gen5',
		searchShow: false,
		ruleset: ['Standard', '!Evasion Moves Clause', 'Sleep Clause Mod'],
	},
	{
		name: "[Gen 5] UU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3474024/">BW2 UU Viability Rankings</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/posts/6431094/">BW2 Sample Teams</a>`,
		],

		mod: 'gen5',
		searchShow: false,
		ruleset: ['Standard', 'Evasion Abilities Clause', 'Baton Pass Clause', 'Swagger Clause', 'Sleep Clause Mod'],
		banlist: ['Uber', 'OU', 'UUBL', 'Arena Trap', 'Drought', 'Sand Stream', 'Snow Warning'],
	},
	{
		name: "[Gen 5] RU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/posts/6431094/">BW2 Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3473124/">BW2 RU Viability Rankings</a>`,
		],

		mod: 'gen5',
		searchShow: false,
		ruleset: ['[Gen 5] UU'],
		banlist: ['UU', 'RUBL', 'Shell Smash + Baton Pass'],
	},
	{
		name: "[Gen 5] NU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/posts/6431094/">BW2 Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3484121/">BW2 NU Viability Rankings</a>`,
		],

		mod: 'gen5',
		searchShow: false,
		ruleset: ['[Gen 5] RU'],
		banlist: ['RU', 'NUBL', 'Prankster + Assist'],
	},
	{
		name: "[Gen 5] LC",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/posts/6431094/">BW2 Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3485860/">BW2 LC Viability Rankings</a>`,
		],

		mod: 'gen5',
		searchShow: false,
		maxLevel: 5,
		ruleset: ['Standard', 'Little Cup', 'Sleep Moves Clause'],
		banlist: [
			'Gligar', 'Meditite', 'Misdreavus', 'Murkrow', 'Scraggy', 'Scyther', 'Sneasel', 'Tangela', 'Vulpix', 'Yanma',
			'Sand Rush', 'Berry Juice', 'Soul Dew', 'Dragon Rage', 'Sonic Boom',
		],
	},
	{
		name: "[Gen 5] Monotype",
		desc: `All the Pok&eacute;mon on a team must share a type.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/posts/8411584/">BW2 Monotype</a>`,
		],

		mod: 'gen5',
		searchShow: false,
		ruleset: ['[Gen 5] OU', 'Same Type Clause'],
	},
	{
		name: "[Gen 5] 1v1",
		desc: `Bring three Pok&eacute;mon to Team Preview and choose one to battle.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/posts/8031458/">BW2 1v1</a>`,
		],

		mod: 'gen5',
		searchShow: false,
		teamLength: {
			validate: [1, 3],
			battle: 1,
		},
		ruleset: ['Standard', 'Baton Pass Clause', 'Swagger Clause'],
		banlist: ['Uber', 'Whimsicott', 'Focus Sash', 'Soul Dew', 'Perish Song'],
		unbanlist: ['Genesect', 'Landorus', 'Manaphy', 'Thundurus', 'Tornadus-Therian'],
	},
	{
		name: "[Gen 5] GBU Singles",

		mod: 'gen5',
		searchShow: false,
		maxForcedLevel: 50,
		teamLength: {
			validate: [3, 6],
			battle: 3,
		},
		ruleset: ['Standard GBU'],
		banlist: ['Dark Void', 'Sky Drop'],
	},
	{
		name: "[Gen 5] Custom Game",

		mod: 'gen5',
		searchShow: false,
		debug: true,
		maxLevel: 9999,
		battle: {trunc: Math.trunc},
		defaultLevel: 100,
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod'],
	},

	// B2/W2 Doubles
	///////////////////////////////////////////////////////////////////

	{
		section: 'B2/W2 Doubles',
		column: 4,
	},
	{
		name: "[Gen 5] Doubles OU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3606719/">BW2 Doubles Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/posts/7393048/">BW2 Doubles Viability Rankings</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/posts/7393081/">BW2 Doubles Sample Teams</a>`,
		],

		mod: 'gen5',
		gameType: 'doubles',
		searchShow: false,
		ruleset: ['Standard', 'Evasion Abilities Clause', 'Swagger Clause', 'Sleep Clause Mod'],
		banlist: ['DUber', 'Soul Dew', 'Dark Void', 'Gravity'],
	},
	{
		name: "[Gen 5] GBU Doubles",

		mod: 'gen5',
		gameType: 'doubles',
		searchShow: false,
		maxForcedLevel: 50,
		teamLength: {
			validate: [4, 6],
			battle: 4,
		},
		ruleset: ['Standard GBU'],
		banlist: ['Dark Void', 'Sky Drop'],
	},
	{
		name: "[Gen 5] Doubles Custom Game",

		mod: 'gen5',
		gameType: 'doubles',
		searchShow: false,
		debug: true,
		maxLevel: 9999,
		battle: {trunc: Math.trunc},
		defaultLevel: 100,
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod'],
	},
	{
		name: "[Gen 5] Triples Custom Game",

		mod: 'gen5',
		gameType: 'triples',
		searchShow: false,
		debug: true,
		maxLevel: 9999,
		battle: {trunc: Math.trunc},
		defaultLevel: 100,
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod'],
	},

	// DPP Singles
	///////////////////////////////////////////////////////////////////

	{
		section: "DPP Singles",
		column: 5,
	},
	{
		name: "[Gen 4] Ubers",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/posts/8286279/">DPP Ubers</a>`,
		],

		mod: 'gen4',
		searchShow: false,
		ruleset: ['Standard', 'Arceus EV Limit'],
	},
	{
		name: "[Gen 4] UU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3532624/">DPP UU Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3503638/">DPP UU Viability Rankings</a>`,
		],

		mod: 'gen4',
		searchShow: false,
		ruleset: ['[Gen 4] OU', 'Baton Pass Clause'],
		banlist: ['OU', 'UUBL'],
		unbanlist: ['Sand Veil', 'Baton Pass'],
	},
	{
		name: "[Gen 4] NU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3583742/">DPP NU Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3512254/">DPP NU Viability Rankings</a>`,
		],

		mod: 'gen4',
		searchShow: false,
		ruleset: ['[Gen 4] UU'],
		banlist: ['UU', 'NUBL'],
	},
	{
		name: "[Gen 4] PU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/posts/7260264/">DPP PU</a>`,
		],

		mod: 'gen4',
		searchShow: false,
		ruleset: ['[Gen 4] NU'],
		banlist: [
			'Articuno', 'Cacturne', 'Charizard', 'Cradily', 'Dodrio', 'Drifblim', 'Dusclops', 'Electrode',
			'Floatzel', 'Gardevoir', 'Gligar', 'Golem', 'Grumpig', 'Haunter', 'Hitmonchan', 'Hypno', 'Jumpluff',
			'Jynx', 'Lickilicky', 'Linoone', 'Magmortar', 'Magneton', 'Manectric', 'Medicham', 'Meganium', 'Nidoqueen',
			'Ninetales', 'Piloswine', 'Poliwrath', 'Porygon2', 'Regice', 'Regirock', 'Roselia', 'Sandslash',
			'Sharpedo', 'Shiftry', 'Skuntank', 'Slowking', 'Tauros', 'Typhlosion', 'Venomoth', 'Vileplume',
		],
	},
	{
		name: "[Gen 4] LC",
		threads: [
			`&bullet; <a href="https://www.smogon.com/dp/articles/little_cup_guide">DPP LC Guide</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/posts/7336500/">DPP LC Viability Rankings</a>`,
		],

		mod: 'gen4',
		searchShow: false,
		maxLevel: 5,
		ruleset: ['Standard', 'Little Cup'],
		banlist: [
			'Meditite', 'Misdreavus', 'Murkrow', 'Scyther', 'Sneasel', 'Tangela', 'Yanma',
			'Berry Juice', 'Deep Sea Tooth', 'Dragon Rage', 'Hypnosis', 'Sonic Boom',
		],
	},
	{
		name: "[Gen 4] 1v1",
		desc: `Bring three Pok&eacute;mon to Team Preview and choose one to battle.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/posts/8031457/">DPP 1v1</a>`,
		],

		mod: 'gen4',
		searchShow: false,
		teamLength: {
			validate: [1, 3],
			battle: 1,
		},
		ruleset: ['[Gen 4] OU', 'Accuracy Moves Clause', 'Sleep Moves Clause', 'Team Preview'],
		banlist: ['Latias', 'Porygon-Z', 'Focus Sash', 'Destiny Bond', 'Explosion', 'Perish Song', 'Self-Destruct'],
		unbanlist: ['Wobbuffet', 'Wynaut', 'Sand Veil'],
	},
	{
		name: "[Gen 4] Anything Goes",

		mod: 'gen4',
		searchShow: false,
		ruleset: ['Obtainable', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "[Gen 4] Custom Game",

		mod: 'gen4',
		searchShow: false,
		debug: true,
		maxLevel: 9999,
		battle: {trunc: Math.trunc},
		defaultLevel: 100,
		// no restrictions
		ruleset: ['Cancel Mod'],
	},

	// DPP Doubles
	///////////////////////////////////////////////////////////////////

	{
		section: "DPP Doubles",
		column: 5,
	},
	{
		name: "[Gen 4] Doubles OU",
		threads: [`&bullet; <a href="https://www.smogon.com/forums/threads/3618411/">DPP Doubles</a>`],

		mod: 'gen4',
		gameType: 'doubles',
		searchShow: false,
		ruleset: ['[Gen 4] OU'],
		banlist: ['Explosion'],
		unbanlist: ['Garchomp', 'Latias', 'Latios', 'Manaphy', 'Mew', 'Salamence', 'Wobbuffet', 'Wynaut'],
	},
	{
		name: "[Gen 4] Doubles Custom Game",

		mod: 'gen4',
		gameType: 'doubles',
		searchShow: false,
		debug: true,
		maxLevel: 9999,
		battle: {trunc: Math.trunc},
		defaultLevel: 100,
		// no restrictions
		ruleset: ['Cancel Mod'],
	},

	// Past Generations
	///////////////////////////////////////////////////////////////////

	{
		section: "Past Generations",
		column: 5,
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
];
