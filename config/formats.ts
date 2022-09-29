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
		name: "[Gen 8] National Dex AG",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3656779/">AG Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3659562/">AG Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3658581/">AG Viability Rankings</a>`,
		],

		mod: 'gen8',
		ruleset: ['Standard NatDex'],
	},
	// Solo Mods
	{
		section: "Roovnen",
		column: 2,
	},
	{
		name: "[Gen 8] Roovnen Uber",
		desc: '<b>A solomod with Pokémon based on and related to Austria, Germany and Switzerland',
		threads: [
		`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3660004/post-8753030">Post in Solomods Megathread</a>`,
		`&bullet; <a href="https://docs.google.com/spreadsheets/d/1KL8Cl-QkZUCau-24-37S3UkcEEqdAtDFHcas5HRL6v0/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: 'roovnen',
		searchShow: false,
		ruleset: ['Standard NatDex', 'Data Mod', 'Mega Data Mod', 'Mega Evolution Clause', 'Dynamax Clause', 'Z-Move Clause'],	
		banlist: [
			//Tiers
			'AG',
		
			//Abilities
			'Shadow Tag',
			
			//Moves
			'Baton Pass', 'Hidden Power',
		],
		teambuilderFormat: 'Uber',
	},
	{
		name: "[Gen 8] Roovnen OU",
		desc: '<b>A solomod with Pokémon based on and related to Austria, Germany and Switzerland',
		threads: [
		`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3660004/post-8753030">Post in Solomods Megathread</a>`,
		`&bullet; <a href="https://docs.google.com/spreadsheets/d/1KL8Cl-QkZUCau-24-37S3UkcEEqdAtDFHcas5HRL6v0/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: 'roovnen',
		searchShow: false,
		ruleset: ['[Gen 8] Roovnen Uber'],	
		banlist: [
			//Tiers
			'Uber',
		
			//Abilities
			'Drizzle', 'Sand Veil', 'Snow Cloak',
			
			//Items
			'King\'s Rock', 'Lax Incense', 'Quick Claw', 'Razor Fang', 'Soul Dew',
		],
		teambuilderFormat: 'OU',
	},
	{
		name: "[Gen 8] Roovnen UU",
		desc: '<b>A solomod with Pokémon based on and related to Austria, Germany and Switzerland',
		threads: [
		`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3660004/post-8753030">Post in Solomods Megathread</a>`,
		`&bullet; <a href="https://docs.google.com/spreadsheets/d/1KL8Cl-QkZUCau-24-37S3UkcEEqdAtDFHcas5HRL6v0/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: 'roovnen',
		searchShow: false,
		ruleset: ['[Gen 8] Roovnen OU'],	
		banlist: [
			//Tiers
			'OU', 'UUBL',
		],
		teambuilderFormat: 'UU',
	},
	{
		name: "[Gen 8] Roovnen RU",
		desc: '<b>A solomod with Pokémon based on and related to Austria, Germany and Switzerland',
		threads: [
		`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3660004/post-8753030">Post in Solomods Megathread</a>`,
		`&bullet; <a href="https://docs.google.com/spreadsheets/d/1KL8Cl-QkZUCau-24-37S3UkcEEqdAtDFHcas5HRL6v0/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: 'roovnen',
		searchShow: false,
		ruleset: ['[Gen 8] Roovnen UU'],	
		banlist: [
			//Tiers
			'UU', 'RUBL',
		],
		teambuilderFormat: 'RU',
	},
	{
		name: "[Gen 8] Roovnen NU",
		desc: '<b>A solomod with Pokémon based on and related to Austria, Germany and Switzerland',
		threads: [
		`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3660004/post-8753030">Post in Solomods Megathread</a>`,
		`&bullet; <a href="https://docs.google.com/spreadsheets/d/1KL8Cl-QkZUCau-24-37S3UkcEEqdAtDFHcas5HRL6v0/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: 'roovnen',
		searchShow: false,
		ruleset: ['[Gen 8] Roovnen RU'],	
		banlist: [
			//Tiers
			'RU', 'NUBL',
		],
		teambuilderFormat: 'NU',
	},
	{
		name: "[Gen 8] Roovnen PU",
		desc: '<b>A solomod with Pokémon based on and related to Austria, Germany and Switzerland',
		threads: [
		`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3660004/post-8753030">Post in Solomods Megathread</a>`,
		`&bullet; <a href="https://docs.google.com/spreadsheets/d/1KL8Cl-QkZUCau-24-37S3UkcEEqdAtDFHcas5HRL6v0/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: 'roovnen',
		searchShow: false,
		ruleset: ['[Gen 8] Roovnen NU'],	
		banlist: [
			//Tiers
			'NU', 'PUBL',
		],
		teambuilderFormat: 'PU',
	},
	{
		name: "[Gen 8] Roovnen ZU",
		desc: '<b>A solomod with Pokémon based on and related to Austria, Germany and Switzerland',
		threads: [
		`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3660004/post-8753030">Post in Solomods Megathread</a>`,
		`&bullet; <a href="https://docs.google.com/spreadsheets/d/1KL8Cl-QkZUCau-24-37S3UkcEEqdAtDFHcas5HRL6v0/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: 'roovnen',
		searchShow: false,
		ruleset: ['[Gen 8] Roovnen PU'],	
		banlist: [
			//Tiers
			'PU',
		],
		teambuilderFormat: '(PU)',
	},
	{
		name: "[Gen 8] Roovnen LC",
		desc: '<b>A solomod with Pokémon based on and related to Austria, Germany and Switzerland',
		threads: [
		`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3660004/post-8753030">Post in Solomods Megathread</a>`,
		`&bullet; <a href="https://docs.google.com/spreadsheets/d/1KL8Cl-QkZUCau-24-37S3UkcEEqdAtDFHcas5HRL6v0/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: 'roovnen',
		searchShow: false,
		maxLevel: 5,
		ruleset: ['Standard', 'Data Mod', 'Mega Data Mod', 'Sketch Gen 8 Moves', 'Dynamax Clause', 'Little Cup'],	
		banlist: [
			//Abilities
			'Shadow Tag',
			
			//Moves
			'Baton Pass',
		],
		teambuilderFormat: 'LC',
	},
	{
		name: "[Gen 8] Roovnen Doubles",
		desc: '<b>A solomod with Pokémon based on and related to Austria, Germany and Switzerland',
		threads: [
		`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3660004/post-8753030">Post in Solomods Megathread</a>`,
		`&bullet; <a href="https://docs.google.com/spreadsheets/d/1KL8Cl-QkZUCau-24-37S3UkcEEqdAtDFHcas5HRL6v0/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: 'roovnen',
		searchShow: false,
		gameType: 'doubles',
		ruleset: ['Standard Doubles', 'Data Mod', 'Mega Data Mod', 'Sketch Gen 8 Moves'],	
		banlist: [
			//Tiers
			'DUber',
		
			//Abilities
			'Shadow Tag',
			
			//Moves
			'Swagger',
		],
		teambuilderFormat: 'DOU',
	},
	{
		section: "Tests",
		column: 3,
	},
];
