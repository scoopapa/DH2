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
		// Smogon Pet Mods ///////////////////////////////////////////////////////////////////
	{
		section: "Active Smogon Mods",
		column: 1,
	},
	{
		name: "[Gen 8] Abilitypos",
		desc: `<b>Abilitypos</b>: In this Pet Mod, your goal is to take an ability and change a few letters in its name to make it brand new. `,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/abilitypos-slate-3-keen-eye-clear-body-and-inner-focus.3703365/">Abilitypos on Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1B2LTJv_UnAG_vDGlmyyA00qL6KcY2aFkZ6NCixbdpmU/edit#gid=1595974891">Spreadsheet</a>`,
		],
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Data Mod', 'Z-Move Clause'],
		banlist: ['All Pokemon'],
		unbanlist: ['Sceptile', 'Charizard', 'Inteleon', 'Lanturn', 'Larvesta', 'Aggron', 'Sableye', 'Carbink', 'Entei', 'Hatterene', 'Raticate-Alola', 'Lapras'],
		mod: "abilitypos",
	},
	{
		name: "[Gen 8] Alternatium EX",
		desc: `<b>Alternatium EX</b>: A metagame made up of only Pokemon with alternate forms exist, with all of them being seperate and unique Pokemon.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/alternatium-ex-slate-1-starter-pack.3701560/">Alternatium EX on Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1bvvkPg1CrUBJFJJeuwkts8elfJcEcahGOoHm-vGBXOI/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: 'alternatiumex',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Data Mod', 'Z-Move Clause'],
		banlist: ['All Pokemon'],
		unbanlist: [
				'Decidueye-Hermit', 'Decidueye-Autumn', 'Typhlosion-Explosive', 'Typhlosion-Warlock', 'Samurott-Foamy', 'Samurott-Rogue', 'Oricorio', 'Oricorio-Cheerleader',
				'Oricorio-Pa\u2019u', 'Horrorcorio', 'Pikachu-Kanto', 'Pikachu-Hoenn', 'Pikachu-Sinnoh', 'Pikachu-Unova', 'Pikachu-Tactic', 'Pikachu-Alola', 'Pikachu-World',
				'Ribombee', 'Ribombee-Totem', 'Araquanid', 'Araquanid-Totem', 'Vikavolt', 'Vikavolt-Totem', 'Urshifu', 'Urshifu-Erosion', 'Calyrex-Mythic', 'Calyrex-Glacier', 
				'Calyrex-Midnight', 'Kommo-o', 'Rockmo-o', 'Salazzle', 'Salazzle-Ruler', 'Lurantis', 'Lurantio', 'Mr. Mime', 'Mr. Mime-Prance', 'Stunfisk', 'Stunfisk-Trap',
				'Necrozma', 'Necrozma-Lionheart', 'Necrozma-Batwing', 'Necrozma-Dragon', 'Braviary-Patriot', 'Braviary-Hisui', 'Lilligant-Bard', 'Mistlegant', 'Electrode-Screwball', 
				'Electrode-Ringo', 'Persian-Bandit', 'Persian-Omen', 'Meowstic-Untethered', 'Meowstic-TwoTales', "Indeedee-Devil", "Indeedee-Angel", "Polteageist", "Polteageist-Antique",
				"Toxtricity-Rock-Star", "Toxtricity-Low-Key", "Articuno-Mistral", "Articuno-Tsunami", "Zapdos", "Charpados", "Moltres", "Bennutres", "Marowak", "Alolawak", "Marowak-Alola-Totem",
				"Enamorus", "Violentine", "Dialga", "Archronos", "Palkia", "Palkia-Origin", "Basculin-Hot-Headed",
				"Basculectric", "Basculin-Skyship", "Basculegion",
				"Basculagoon", "Magearna", "Magearna-Prototype",
				"Zarude", "Zarude-Hero",
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
		name: "[Gen 8] Black Market",
		mod: "blackmarket",
		desc: [
			`<b>Black Market</b>: A Pet Mod where users build Fakemon over the span of a tournament.`
		],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/tournament-black-market-starting-phase.3704607/">Black Market on Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/10BkMc61hCnfEc6XpjozDrQ20zMVAt5rArlvjsCENR7I/edit#gid=0">Spreadsheet</a>`,
		],
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod'],
		unbanlist: ['Dragapult', 'Tornadus-Therian', 'Blaziken', 'Greninja-Ash', 'Kyurem'], 
		banlist: [
			'Alakazam-Mega', 'Arceus', 'Blastoise-Mega', 'Blaziken', 'Darkrai', 'Darmanitan-Galar', 'Deoxys-Attack', 'Deoxys-Base', 'Deoxys-Speed', 'Dialga',
			'Eternatus', 'Genesect', 'Gengar-Mega', 'Giratina', 'Groudon', 'Ho-Oh', 'Kangaskhan-Mega', 'Kyogre', 'Kyurem-Black', 'Kyurem-White',
			'Landorus-Base', 'Lucario-Mega', 'Lugia', 'Lunala', 'Marshadow', 'Metagross-Mega', 'Mewtwo', 'Naganadel', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane',
			'Palkia', 'Pheromosa', 'Rayquaza', 'Reshiram', 'Salamence-Mega', 'Shaymin-Sky', 'Solgaleo', 'Tornadus-Therian', 'Urshifu-Base', 'Xerneas', 'Yveltal',
			'Zacian', 'Zamazenta', 'Zekrom', 'Zygarde-Base', 'Arena Trap', 'Moody', 'Power Construct', 'Shadow Tag', 'Baton Pass',
			'Normalium Z', 'Fairium Z', 'Fightinium Z', 'Firium Z', 'Flyinium Z', 'Darkinium Z', 'Dragonium Z', 'Buginium Z', 'Waterium Z', 'Electrium Z', 'Ghostium Z', 'Grassium Z', 'Groundium Z', 'Icium Z', 'Poisonium Z', 'Psychium Z', 'Rockium Z', 'Steelium Z'
		],
	},
	{
		name: "[Gen 9] Book of Enigmas",
		desc: [
			"<b>Book of Enigmas</b>: A Pet Mod that aims to create new Paradox Pokemon based on Ho-oh and Lugia - the sky and the sea, respectively.",
		],
		threads: [
			`&bullet: <a href="https://www.smogon.com/forums/threads/book-of-enigmas-slate-0-the-beginning-custom-abilities-names.3711490/">Thread on Smogon.`,
		],
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Data Mod',],
		banlist: [
			'Arena Trap', 'Moody', 'Shadow Tag', 'Baton Pass',
			'Sceptilite', 'Blazikenite', 'Swampertite', 'Gardevoirite', 'Galladite', 'Alakazite', 'Gyaradosite',
			'Sablenite', 'Mawilite', 'Aggronite', 'Medichamite', 'Manectite', 'Sharpedonite', 'Cameruptite', 
			'Altarianite', 'Absolite', 'Glalitite', 'Salamencite', 'Metagrossite', 'Latiasite', 'Latiosite', 
			'Garchompite', 'Steelixite', 'Beedrillite', 'Pidgeotite', 
			'Blue Orb', 'Red Orb', //this is just copied from ANL's lol
		],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			let allowedTiers = ['BoE OU', "BoE NFE", "BoE LC"];
			for (const set of team) {
				let template = this.dex.getSpecies(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Book of Enigmas OU.'];
				}
			}
		},
		validateSet(set, teamHas) { // stolen from SV Specualative
			const species = this.dex.getSpecies(set.species);
			const ability = this.dex.getAbility(set.ability);
			if (!set.hpType === 'Fairy' && !set.hpType === 'Normal') {
				return this.validateSet(set, teamHas);
			} else {
				const terastal = set.hpType;
				set.hpType = 'Fire';
				const fakeValidation = this.validateSet(set, teamHas);
				if (fakeValidation?.length) return fakeValidation;
				set.hpType = terastal;
				return null;
			}
		},
		mod: 'bookofenigmas',
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
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1QL_789vTzxG8An43itUxPonK9ee7ezxH6GCR9dD_JyQ/edit?usp=sharing">Crystal: Sevii Islands spreadsheet</a>`,
		      ],
		mod: 'gen2crystalseviiislands',
		ruleset: ['Standard', 'Data Mod', 'Crystal: Sevii Islands Mod'],
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
		name: "[Gen 8] Eternal Pokemon V2",
		desc: [
			"The idea behind this Pet Mod would be to give every single Non Fully Evolved Pokémon the same treatment that was given to Floette-E.",
		],
		threads: [
			'&bullet; <a href="https://www.smogon.com/forums/threads/eternal-pokemon-v2-slate-3-high-horse-power.3700796/">Eternal Pokemon V2</a>',
			'&bullet; <a href="https://docs.google.com/spreadsheets/d/1o7QNbqIN85CWuLJm-MJJ0u7yoUXvOZGuJfL_08oI1b4/edit#gid=0">Spreadsheet</a>',
			  ],
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod'],
		banlist: [
						'Alakazam-Mega', 'Arceus', 'Blastoise-Mega', 'Blaziken', 'Calyrex-Ice', 'Calyrex-Shadow', 'Cinderace', 'Darkrai', 'Darmanitan-Galar', 'Deoxys-Attack', 'Deoxys-Base', 'Deoxys-Speed', 
			'Dialga', 'Dracovish', 'Dragapult', 'Eternatus', 'Genesect', 'Gengar-Mega', 'Giratina', 'Groudon', 'Ho-Oh', 'Kangaskhan-Mega', 'Kyogre', 'Kyurem-Black', 'Kyurem-White', 'Landorus-Base', 
			'Lucario-Mega', 'Lugia', 'Lunala', 'Marshadow', 'Magearna', 'Metagross-Mega', 'Mewtwo', 'Naganadel', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Palkia', 'Pheromosa', 'Rayquaza', 'Reshiram', 
			'Salamence-Mega', 'Shaymin-Sky', 'Solgaleo', 'Spectrier', 'Tornadus-Therian', 'Urshifu-Base', 'Xerneas', 'Yveltal', 'Zacian', 'Zamazenta', 'Zekrom', 'Zygarde-Base',
			'Arena Trap', 'Moody', 'Power Construct', 'Shadow Tag', 'Baton Pass',
			],
		unbanlist: ['Thwackey-Eternal','Floette-Eternal'],
		mod: "eternalpokemonv2",
		teambuilderFormat: "OU",
	},
	
	{
        name: "[Gen 8] Expansions",
        desc: `<b>Expansions</b>: A Fakemon meta where everything gets up to 3 active abilities and a new secret move.`,
        threads: [
            `&bullet; <a href="https://docs.google.com/spreadsheets/d/1lguyF31tjV8f-Gv3uLxmZXGAlg23k2fkF_nBqevJouM/edit?usp=sharing">Spreadsheet</a>`,
        ],
        mod: 'expansions',
        ruleset: ['Standard NatDex', 'Dynamax Clause', 'Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 'Swagger Clause', 'Baton Pass Clause', 'OHKO Clause', 'Fifth Move Additions'],
        banlist: ['All Pokemon', 'Normalium Z', 'Fairium Z', 'Fightinium Z', 'Firium Z', 'Flyinium Z', 'Darkinium Z', 'Dragonium Z', 'Buginium Z', 'Waterium Z', 'Electrium Z', 'Ghostium Z', 'Grassium Z', 'Groundium Z', 'Icium Z', 'Poisonium Z', 'Psychium Z', 'Rockium Z', 'Steelium Z',],
        unbanlist: [
             'Threedy', 'Amvip', 'Capsaken', 'Shinamako', 'Abrakin', 'Avasterror', 'Dustrake', 'Eneryth', 'Skyrider', 'Tusquoka', 'Turbulusk', 'Baloon-Popped', 'Rapteroid', 'Lilyqueen', 'Gladiarbor', 'Showmandril', 'Animeleon', 'Equivalor',
			],	
				onBegin() {
			for (const pokemon of this.getAllPokemon()) {
				if (pokemon.ability === this.toID(pokemon.species.abilities['S'])) {
					continue;
				}
				pokemon.m.innates = Object.keys(pokemon.species.abilities)
					.filter(key => key !== 'S' && (key !== 'H' || !pokemon.species.unreleasedHidden))
					.map(key => this.toID(pokemon.species.abilities[key as "0" | "1" | "H" | "S"]))
					.filter(ability => ability !== pokemon.ability);
			}
		},
		onSwitchInPriority: 2,
		onSwitchIn(pokemon) {
			this.add('-start', pokemon, 'typechange', pokemon.species.types.join('/'), '[silent]');
			if (pokemon.m.innates) {
				for (const innate of pokemon.m.innates) {
					pokemon.addVolatile("ability:" + innate, pokemon);
				}
			}
		},
		onEnd(pokemon) {
			for (const innate of Object.keys(pokemon.volatiles).filter(i => i.startsWith('ability:'))) {
				pokemon.removeVolatile(innate);
			}
		},
/*		onFaint(pokemon) {
			for (const innate of Object.keys(pokemon.volatiles).filter(i => i.startsWith('ability:'))) {
				const innateEffect = this.dex.conditions.get(innate) as Effect;
				this.singleEvent('End', innateEffect, null, pokemon);
			}
		},
*/		onAfterMega(pokemon) {
			for (const innate of Object.keys(pokemon.volatiles).filter(i => i.startsWith('ability:'))) {
				pokemon.removeVolatile(innate);
			}
			pokemon.m.innates = undefined;
		},
	},
	
	{
		name: "[Gen 8] Extreme Reboot",
		desc: `A metagame where the types, statuses, moves, abilities, and pokemon are rebooted.`,
		threads: [
			`<a href="https://www.smogon.com/forums/threads/3695749/">Extreme Reboot</a>`,
		],

		mod: 'extremereboot',
		ruleset: ['Standard', 'Dynamax Clause', 'Data Mod',],
		banlist: ['All Pokemon', 'All Items'],
		unbanlist: [
			'Extreme Ribbit', 'Baobloss', 'Tenquarrel', 'Tradituki', 'Hibarrage', 'Pumking', 'Carboneichus', 'Calmengo', 'Paciphal', 'Hullacane', 'Cylindrake', 
			'Efflor', 'Rantler', 'Zeploom', 'Terraphi', 'Stratophi', 'Pelaphi', 'Sunmola', 'Phantahawk', 'Memilifyy', 'Plantadiomicrisa', 'Terrahephas', 'Parvualias', 
			'Rancicoon', 'Meditoid', 'Yukinooh', 'Misausmia', 'Pavronin', 'Kraklone', 'Crustair', 'Yulisse', 'Totodem', 'Persebloom', 'Persebloom-Frost', 'Hawkmorph', 
			'Gallurise', 'Hensomnia', 'Protectonic', 'Crowbotic', 'Sponjourner', 'Emajanaja', 'Zenphin', 'Technophin', 'Beavair', 'Gyozumo-Spring', 'Gyozumo-Summer', 
			'Onlaxy', 'Infinistar', 'Guareye', 'Curuprowl', 'Fertiri', 'Ruinne', 'Tantton', 'Crimsoil', 'Stakstok', 'Lychy', 'Onigashiba', 'Lunsura', 'Galactagon', 
			'Axolacred', 'Dimetrogem', 'Anhaflara', 'Stormanos', 'Alchemeel', 'Alchemeel-Offense', 'Rasteal', 'Nailberg', 'Hoolican', 'Anchorage', 'Nosferanguis', 
			'Pontiac', 'Sclam', 'Cicaguren', /*'Bozunami', 'Cryptice',*/ 'Mekangiras', 'Mononokero', 'Surfright', 'Potsworth', 'Cloudim', 'Salamoon', 'Salamoon-Allegro', 
			'Gokaeru', 'Himekuji', 'Guroteserp', 'Galaxea', 'Galaxea-Complete', 'Pegathemum', 'Pegathemum-Complete', 'Cyrome-Book', 'Cyrome-Scribe', 'Cyrome-Author', 
			'Darkira', 'Darkira-Ancient', 'Lakera', 'Lakera-Ancient', 'Mew 3.0', 'Solamateru', 'Jirachi-Extreme',
			'Blood Vial', 'Calming Salt', 'Cursed Orb', 'Emblematic Scarf', 'Enigmatic Shield', 'Fell Scythe', 'Gospel Notes', 'Life Gem', 'Maid Dress', 'Metalmorph',
			'Pokemon Standard', 'Power Stone', 'Seasons Gem', 'Tricky Hourglass', 'Platinum Orb', 'Iridescent Orb', 'Frosted Seed',
		],
		onModifySpeciesPriority: 2,
		onModifySpecies(species, target, source, effect) {
			if (!target) return; // Chat command
			if (effect && ['imposter', 'transform'].includes(effect.id)) return;
			if (species.id !== 'extremeribbit') return;
			const types = [...new Set(target.baseMoveSlots.slice(0, 2).map(move => this.dex.getMove(move.id).type))];
			return {...species, types: types};
		},
		onSwitchIn(pokemon) {
			if (pokemon.species.id === 'extremeribbit') return;
			this.add('-start', pokemon, 'typechange', (pokemon.illusion || pokemon).getTypes(true).join('/'), '[silent]');
		},
	},
	// {
		// name: "[Gen 8] EXTREME ROULETTEMONS",
		// desc: `A metagame where the types, moves, abilities, and pokemon are randomized.`,
		// threads: [
			// `<a href="https://www.smogon.com/forums/threads/3681345/">EXTREME</a>`,
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
		name: "[Gen 8] Fusion Evolution NU",
		mod: "feuu",
		desc: [
			`<b>Fusion Evolution Never Used</b>: A micrometa Pet Mod aiming to create excessively-more-balanced-than-usual "Pokemon Fusions" with unique abilities.`
		],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/fusion-evolution-never-used-slate-1-results-not-open-for-submissions.3701949/">Fusion Evolution Never Used on Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1PGYIFPSfjMtA0cGQgjyxnngJ2WODLWIH9v46_upPSOA/edit#gid=0">Spreadsheet</a>`,
		],
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Z-Move Clause', 'Data Mod', 'Mega Data Mod'],
		banlist: [
			'All Pokemon', 'Baton Pass', 'Salamencite', 'Abomasite', 'Absolite', 'Medichamite', 'Lopunnite', 'Diancite', 'Gengarite', 'Sablemime + Sablenite',
		],
		unbanlist: [
	 		'Rhybite',
			'Appledam', 'Regidurr', 'Duskoma', 'Fraxblade', 'Igglycian-Crowned', 
			'Eiscudile', 'Carcannon', 'Lapfisk', 'Whisdur', 'Emposerker', 'Salasian-Alola',
			"Pelilicky", "Zaponaw-Galar", "Yandos", "Mudscash", "Woopquaza-Mega", "Woopquaza", "Qwilsimian", "Buzzvine", "Solabat",
			"Jellopod", "Jellopod-F", "Espetops", "Regigoss", "Nihitrio",
			"Ferropion", "Scytic", "Dragancie", "Yanturne", "Emberajah",
			"Tornett-Alola", "Togelot", "Aegix", "Dugflame", "Mr. Gar", "Spewtwo", "Spewtwo-Mega-X", "Spewtwo-Mega-Y",
			"Victreegeist-Small", "Dragerigus", "Drudlinks", "Oricroak", "Deciduvolt",
			
			'Claylamar', 'Vishitomb', 'Swampflora', 'Swampflora-Mega', 'Azekrow', 'Trapeino', 'Bearyx', 'Fetchey', "Aromarel", 'Googersby', 'Harisect', 
			'Absable', 'Tapu Lop', 'Hypnakart', 'Hawlazzle', 'Glasnow', 'Paracoal',
			'Swannamence', 'Vullacham', 
			"Krowtom", "Sablemime", "Lycaking-Dusk",
			
			'Silvino-Bug', 'Silvino-Electric', 'Silvino-Fighting',
			'Silvino-Fire', 'Silvino-Flying', 'Silvino-Grass', 'Silvino-Ice', 
			'Silvino-Poison', 'Silvino-Psychic', 'Silvino-Rock', 'Silvino', 'Silvino-Mega',	
			
			'Corveotto', 'Torraaffy', 'Rosadin', 'Mr. Boot-Galar', 'Palpitrik', 'Pikabat', 'Krokocroco', 'Ivycat', 'Tranquorino', 'Kadabeak', 'Vibrachu', 'Chokloom', 'Magmabuzz', 'Mr. Haunt-Galar', "Dartbug",
			'Mariwick', 'Krabsweet', 'Slowmite', 'Eebat', 'Gibloon', 'Mieyu', 'Duspoke', 'Frillnub', 'Dreepig', 'Meowruff-Galar', 'Golidimp', 'Panchanpy', 'Shroolix', 'Noixel', 'Pidgeidee', 'Bronlin', 'Seedpoke-Galar', 'Glitoy', 'Munchyke', 'Venipawn', 'Krelpinch', 'Tirtipek', 'Grinamo', 'Cubodile', 'Snodew', 'Claunchiwag', 'Scymask', 'Fletchee', 'Farsola-Galar', 'Cottonas', 'Snipole', 'Maritten', 'Snogepi', 'Hippee', 'Dwepig', 'Parycoly', 'Charblu', 'Inkshrew-Alola', 'Chewkit', 'Duckgon', 'Larvaura', 'Crabrola', 'Chespew', 'Rowlipede', 'Scor Jr.', 'Porymask', 'Wimbuto', 'Larkiddo', 'Bergmel',
			'Croagma', 'Inktoy', 'Sunkip', 'Sniloon', 'Rhyble', 'Goolts', 'Clobbgar', 'Sursfant', 'Hatamask-Galar', 'Tynapole', "Meowruff", "Carvipede", "Froakaboo", "Spritdoof", "Beldino", "Pibat", "Darumaka-Prime", "Totosand", "Bulbalit", 'Vullarogue', 'Grubbur', 'Purrlithe', 'Venoran-F', 'Zubnemite', 'Abripek', 'Nidove-M', 'Gooby', 'Pinchu', 'Buixew', 'Pawnrunt', 'Tyrunxel', 'Shellitite', 'Oddchop', 'Makuras', 'Litlokuda', 'Croagshrew-Alola', 'Tentatwig', 'Magkid', 'Elecoink', 'Ferrolu', 'Koffipoke-Galar', 'Shelbur', 'Grimcery',
			'Burmlin', 'Axedge', 'Rolypek', 'Piplouth-Galar', 'Bagouth-Alola', "Mudboach", "Lickigull", "Frillopod", "Frillopod-F", "Eevuto", "Yannea", "Cupig", "Digling", "Gas Jr.", "Rockoran-M", "Rowbbin", "Maskrelp", "Bellaboo-Small",
			'Exeggcute',
		],
	},
	{
	name: "[Gen 1] FutureProofing",
	   desc: `<b>[Gen 1] FutureProofing</b>: Adapting Dark, Steel, and Fairy-type moves and Pokemon to the Gen 1 OU metagame.`,
	   threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/gen-1-futureproofing-slate-1-discussion.3703375/">FutureProofing on Smogon Forums</a>`,
	   ],
      mod: 'gen1futureproofing',
      ruleset: ['Standard', 'Data Mod'],
		banlist: ['Uber'],
		unbanlist: ['Tyranitar', 'Gardevoir', 'Escavalier', 'Karrablast', 'Ralts', 'Kirlia', 'Pupitar', 'Larvitar',
					   'Snarl', 'Steel Wing', 'Strange Steam',
					   'Deino', 'Zweilous', 'Hydreigon', 'Scizor', 'Cottonee', 'Whimsicott', 
						'Nature\'s Madness', 'Fake Tears', 'Gear Up',
						'Steelix', 'Spiritomb', 'Swablu', 'Altaria',
						'Fleur Cannon', 'Taunt', 'Heavy Slam',
						'Yveltal', 'Skarmory', 'Tapu Koko',
						'Lash Out', 'Crafty Shield', 'Sunsteel Strike',
						'Cacnea', 'Cacturne', 'Duraludon', 'Milcery', 'Alcremie', 
						'Zigzagoon-Galar', 'Linoone-Galar', 'Obstagoon', 'Stunfisk-Galar', 'Mimikyu', 'Mimikyu-Busted', 
						'Oshawott', 'Dewott', 'Samurott-Hisui', 'Riolu', 'Lucario', 'Popplio', 'Brionne', 'Primarina',
						'Grimmsnarl', 'Impidimp', 'Morgrem', 'Sylveon', 'Diglett-Alola', 'Dugtrio-Alola',
						'Magnezone', 'Houndour', 'Houndoom', 'Cutiefly', 'Ribombee',
						'Zarude', 'Zarude-Dada', 'Vulpix-Alola', 'Ninetales-Alola', 'Piplup', 'Prinplup', 'Empoleon',
					  ],
    },
   {
		name: "[Gen 8] Generation X - Loria",
		desc: ["<b>Generation X</b>: A mod that aims to add everything you would expect from a whole new generation of Pokemon games. Welcome to the Florida-inspired Loria region!",],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/generation-x.3670676/>Generation X on Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1zMDn-TjrGfvaDKi6ejM63RV8QmddTvbLl2CKIZbMct0/edit?usp=sharing>Spreadsheet</a>`,
		],

		mod: 'genxloria',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Freeze Clause Mod', 'Data Mod', 'Z-Move Clause', 'Mega Data Mod'],
		banlist: [
			'Arena Trap', 'Moody', 'Power Construct', 'Shadow Tag', 'Baton Pass',
			'Bright Powder', 'Lax Incense', 'King\'s Rock', 'Razor Fang',
			'Altarianite', 'Gengarite', 'Salamencite',
			'Calaguaca-Revered', 'Poruvia-Revered',
			'Pyraustragon', 'Darmanitan-Galar',
		],
		onValidateTeam(team, format) {
			let speciesTable = {};
			let allowedTiers = ['Loria FE', 'Loria NFE', 'Loria LC'];
			for (const set of team) {
				let template = this.dex.getSpecies(set.species);
				if ( !allowedTiers.includes(template.tier) ) {
					return [set.species + ' is not useable in Gen X Loria.'];
				}
			}
		},
	},
	{
		name: "[Gen 3] Hoenn Gaiden",
		desc: ["<b>Hoenn Gaiden</b>: A Gen 3 pet mod that aims to devamp Gen 4-8 Pokemon, moves and items into the Gen 3 mechanics."],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/hoenn-gaiden-the-gen-3-pet-mod-round-1-discussion.3681339/">Hoenn Gaiden on Smogon Forums</a>`,
		],

		mod: 'gen3hoenngaiden',
		ruleset: ['Standard', 'Data Mod', 'Baton Pass Mod', 'Freeze Clause Mod', 'Hoenn Gaiden Mod'],
		banlist: ['Uber', 'Air Balloon'],
		unbanlist: [
			//Abilities
			'Sand Veil',
		],
		teambuilderFormat: 'OU',
	},
	{
		name: "[Gen 8] Impersonators V2",
		mod: "impv2",
		desc: [
			`<b>Impersonators V2</b>: The idea of this Pet Mod is for a Pokémon to "replace" another Pokémon, taking some of their key features in the process.`
		],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/impersonators-v2-slate-1-winners-tiebreaker.3700611/">Impersonators V2 on Smogon Forums</a>`,
		],
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Z-Move Clause', 'Data Mod', 'Mega Data Mod'],
		banlist: [
			'All Pokemon', 'Baton Pass', 'Gardevoirite',
		],
		unbanlist: [
			'Throh-Inteleon', 'Dhelmise-Rillaboom', 'Starmie-Cinderace', 'Riolu-Perrserker', 'Heliolisk-Sirfetchd', 'Axew-MrRime', 'Corviknight-Obstagoon', 'Chesnaught-Runerigus', 'Grimer-Alola-Cursola', 'Garchomp-Venusaur', 'Garchomp-Venusaur-Mega', 'Flygon-Gardevoir', 'Hitmontop-Scizor', 'Hitmontop-Scizor-Mega', 'Gloom-Diancie', 'Gloom-Diancie-Mega', 'Tapu Koko-Slowbro', 'Tapu Koko-Slowbro-Mega', 'Tentacruel-Volcanion', 'Sandslash-Alola-Zygarde', 'Glaceon-Dragapult', 'Swinub-Glastrier', 'Slowbro-Galar-Necrozma', 'Corviknight-Zarude', 'Centiskorch-Hydreigon', 'Zarude-Tyranitar', 'Zarude-Tyranitar-Mega', 'Slowpoke-Gliscor', 'Torkoal-Chesnaught', 'Bibarel-Politoed', 'Fraxure-Vespiquen', 'Qwilfish-Komala', 'Gallade-Gogoat',
		],
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
		unbanlist: ['Dragapult', 'Tornadus-Therian', 'Blaziken', 'Greninja-Ash', 'Moody', 'Shaymin-Sky', 'Kangaskhan-Mega', 'Darmanitan-Galar', 'Metagross-Mega'],
		banlist: ['Uber', 'Arena Trap', 'Power Construct', 'Shadow Tag', 'Baton Pass', 'Arceus', 'Blazikenite', 'Blastoisinite', 'Darkrai', 'Deoxys-Base', 'Deoxys-Attack', 'Deoxys-Speed', 'Dialga', 'Genesect', 'Gengarite', 'Giratina', 'Giratina-Origin', 'Groudon', 'Ho-Oh', 'Kyogre', 'Kyurem-Black', 'Kyurem-White', 'Landorus-Base', 'Lugia', 'Lunala', 'Marshadow', 'Mewtwo', 'Mewtwo-Mega-X', 'Mewtwo-Mega-Y', 'Naganadel', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Palkia', 'Pheromosa', 'Rayquaza', 'Reshiram', 'Salamencite', 'Solgaleo', 'Xerneas', 'Yveltal', 'Zacian', 'Zamazenta', 'Zekrom', 'Zygarde-Base', 'Berserk Gene', 'Eevee-Starter', 'Pikachu-Starter', 'Moody', 'Magearna', 'Spectrier', 'Dracovish', 'Urshifu-Base',
					'Normalium Z', 'Fairium Z', 'Fightinium Z', 'Firium Z', 'Flyinium Z', 'Darkinium Z', 'Dragonium Z', 'Buginium Z', 'Waterium Z', 'Electrium Z', 'Ghostium Z', 'Grassium Z', 'Groundium Z', 'Icium Z', 'Poisonium Z', 'Psychium Z', 'Rockium Z', 'Steelium Z', 'Decidium Z', 'Kommonium Z',
					'Soul Blade Lvl. 2', 'Soul Blade Lvl. 3', 'Soul Blade Lvl. 4', 'Soul Blade Lvl. 5', 'Ultra Soul Blade',
					'Bright Powder', 'Lax Incense', 'King\'s Rock', 'Razor Fang'],
	},
	{
		name: "[Gen 8] Legends: Hoopa",
		desc: [
			"<b>A New Legend</b>: A Pet Mod that aims to create a hypothetical new entry in a full Pokemon Legends subseries - Pokemon Legends Hoopa.",
		],
		threads: [
			`&bullet: <a href="https://www.smogon.com/forums/threads/a-new-legend-hoopa.3703382/">Thread on Smogon.`,
			`&bullet: <a href="https://docs.google.com/spreadsheets/d/1oBcQpXGar8CwoBpqbIa7Y1gVbx7HwtqtXMy_c017OoY/edit?usp=sharing">Spreadsheet.`,
		],
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Data Mod', 'Legends Boosts Mod'],
		banlist: [
			'Arena Trap', 'Moody', 'Shadow Tag', 'Baton Pass',
			'Sceptilite', 'Blazikenite', 'Swampertite', 'Gardevoirite', 'Galladite', 'Alakazite', 'Gyaradosite',
			'Sablenite', 'Mawilite', 'Aggronite', 'Medichamite', 'Manectite', 'Sharpedonite', 'Cameruptite', 
			'Altarianite', 'Absolite', 'Glalitite', 'Salamencite', 'Metagrossite', 'Latiasite', 'Latiosite', 
			'Garchompite', 'Steelixite', 'Beedrillite', 'Pidgeotite', 
			'Blue Orb', 'Red Orb',
			'Dragon Ascent', 'Hidden Power', //fuck Unown I'm not coding this sorry
			'Beedrill-Mega', 'Pidgeot-Mega', //?????
		],
		mod: 'legendshoopa',
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			let allowedTiers = ['ANL OU', "ANL NFE", "ANL LC"];
			for (const set of team) {
				let template = this.dex.getSpecies(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Pokemon Legends: Hoopa OU.'];
				}
			}
		},
	},
	{
		name: "[Gen 8] Megas for All: Kalos",
		desc: ["<b>Megas for All</b>: A Pet Mod that aims to create unique Mega Evolutions for every fully evolved Pokémon. Current season is focused on the Kalos dex!",
		      ],
		threads: [
				`&bullet; <a href="https://www.smogon.com/forums/threads/3671140/">Megas for All v7 on Smogon Forums</a>`,
				`&bullet; <a href="https://docs.google.com/spreadsheets/d/1TdeAUUtjh0f_tcIBllbF_imgepwV-dV2YomoTCRlPgI/edit?usp=sharing">Spreadsheet</a>`,
				`&bullet; <a href="http://megasforall.wikidot.com/">Wiki</a>`
		      ],
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Z-Move Clause', 'Sleep Clause Mod', 'Freeze Clause Mod', 'Mega Data Mod'],
		banlist: [
			'AG', 'Uber',
			'Aegislash', 'Hoopa-Unbound', 'Greninja',
			'Arena Trap', 'Moody', 'Power Construct', 'Shadow Tag',
			'Baton Pass',
			'Bright Powder', 'Lax Incense', 'King\'s Rock', 'Razor Fang', 'Quick Claw',
		],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			for (const set of team) {
				let template = this.dex.getSpecies(set.species);
				if (template.tier !== 'Mega' && template.tier !== 'Kalos' && template.tier !== 'Kalos (NFE)') {
					return [set.species + ' is not a part of the Kalos Pokédex.'];
				}
			}
		},
		onValidateSet(set) {
			const problems: string[] = [];
			const setHas: {[k: string]: true} = {};
			let species = this.dex.getSpecies(set.species);
			let item = this.dex.getItem(set.item);
			let tierSpecies = species;

			if (item.megaEvolves === species.name) {
				if (item.megaStone && this.dex.getSpecies(item.megaStone).tier !== 'Mega') return [item.name + ' is not a legal Mega Stone.'];
			}
		},
		mod: 'm4akalos',
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
		name: "[Gen 8] MetaMons",
		desc: [
			"In this Pet Mod, we will aim to create a decently-sized micrometa that will expand in the unique niches of some Pokémon, giving them the spotlight after all the time they have been waiting.",
		],
		threads: [
			'&bullet; <a href="https://www.smogon.com/forums/threads/metamons-slate-3-galarian-slowbro-sableye-grapploct.3703361/">MetaMons</a>',
			'&bullet; <a href="https://docs.google.com/spreadsheets/d/142lxuFtTgQCY56Wz_ZjAGaqlk7HgJj0CVKMChQcei1U/edit#gid=0">Spreadsheet</a>',
		],
		mod: 'metamons', 
		ruleset:['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Data Mod', 'Mega Data Mod', 'Z-Move Clause'],
		banlist: ['All Pokemon', 'Baton Pass', 'Sablenite'],
		unbanlist: ['Whimsicott', 'Salazzle', 'Kingler', 'Ariados', 'Sandslash', 'Bastiodon', 'Slowbro-Galar', 'Sableye', 'Grapploct', 'Eelektross', 'Arcanine', 'Tauros', 'Tsareena', 'Sylveon', 'Perrserker', 'Mantine', 'Persian-Alola', 'Druddigon', 'Duraludon', 'Houndoom', 'Stunfisk', 'Emolga', 'Espeon', 'Toxicroak', 'Granbull', 'Abomasnow', 'Eldegoss', 'Guzzlord', 'Entei', 'Necrozma'],
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
      ruleset: ['Standard', 'Dynamax Clause', 'Data Mod'],
		banlist: ['Uber', 'Arena Trap', 'Moody', 'Shadow Tag', 'Baton Pass'], 
	},

	{
		name: "[Gen 8] Paleomons",
		desc: [
			"<b>Paleomons</b>: A Sword and Shield metagame that aims to create a micrometa full of ancient Pokemon."
		],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/paleomons-slate-3-non-dino-stars-dimetrodon-dodo-sea-scorpion-submission-phase.3695565/">Paleomons on Smogon Forums`,
		],

		mod: 'paleomons',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Z-Move Clause', 'Data Mod', 'Mega Data Mod'],
		banlist: [
			'Arena Trap', 'Moody', 'Shadow Tag', 'Baton Pass',
		],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			let allowedTiers = ['Paleomons', 'Paleomons NFE', 'Paleomons LC'];
			for (const set of team) {
				let template = this.dex.getSpecies(set.species);
				if (template.tier !== 'Paleomons' && template.tier !== 'Paleomons NFE' && template.tier !== 'Paleomons LC') {
					return [set.species + ' is not legal in the Paleomons format.'];
				}
			}
		},
	},
	{
		name: "[Gen 1] RBY CAP",
	   desc: `<b>[Gen 1] RBY CAP</b>: Community-made competitive Pokemon are added into the Gen 1 OU Metagame.`,
	   threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/rby-cap-cap-2-competitive-learnset.3695740/">RBY CAP on Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1twipN48WDYX018Wg8QIEmM65agXuO50RZRrPa8QxdfE/edit#gid=1313603655">Spreadsheet</a>`,
	   ],
      mod: 'gen1rbycap',
      ruleset: ['Standard', 'Data Mod'],
		banlist: ['Uber', 'Dracolilla + Recover + Thunder Wave'],
		unbanlist: ['Lagosnow', 'Dracolilla'],
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
		name: "[Gen 8] Signature Restrictions",
		desc: `<b>Singature Restrictions</b>: A metagame made up of brand new Pok&eacute;mon that are made according to various restrictions provided by Pet Mod Users.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3673824/">Singature Restrictions on Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1nUaGjuy4ZHWa7x-f1hpw7jc6ecNUZtT7QChAidv5CvY/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: 'signaturerestrictions',
		ruleset: ['Standard', 'Dynamax Clause', 'Data Mod'],
		banlist: ['uber', 'ou', 'uubl', 'uu', 'rubl', 'ru', 'nubl', 'nu', 'publ', 'pu', 'zu', 'nfe', 'lcuber', 'lc', 'cap', 'caplc', 'capnfe', 'ag','past', 'future', 'lgpe'],
		teambuilderBans: ['unreleased'],
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
		banlist: ['Gardevoirite', 'Chillytite', 'Bisharpite', 'Baton Pass'],
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
		name: "[Gen 8] Ubermons",	
		mod: 'ubermons',
		desc: [
			"<b>Ubermons</b>: A Pet Mod that aims to rebalance Ubers for OU. The goal is to make every single ban into a viable and healthy part of the metagame.",
		],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/ubermons-slate-2-spooky-scary-skeletons-dragapult-marshadow-spectrier.3683759/">Ubermons on Smogon Forums</a>`,
		], 
		ruleset: ['Standard NatDex', 'Evasion Moves Clause', 'Species Clause', 'Sleep Clause Mod', 'Data Mod', 'Mega Data Mod'],
		banlist: [],
		teambuilderFormat: 'OU',
	},
	{
		section: "Recent Smogon Mods",
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

		mod: 'abnormalv3',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Data Mod', 'Mega Data Mod'],
		banlist: [
		'Alakazite', 'Arceus', 'Blastoisinite', 'Blazikenite', 'Calyrex-Ice', 'Calyrex-Shadow', 'Cinderace', 'Darkrai', 'Darmanitan-Galar', 'Deoxys-Attack', 
		'Deoxys-Base', 'Deoxys-Speed', 'Dialga', 'Dracovish', 'Dragapult', 'Eternatus', 'Genesect', 'Gengarite', 'Giratina', 'Giratina-Origin', 'Groudon', 'Ho-Oh',
		'Kangaskhanite', 'Kyogre', 'Kyurem-Black', 'Kyurem-White', 'Landorus-Base', 'Lucarionite', 'Lugia', 'Lunala', 'Magearna', 'Marshadow', 'Metagrossite', 'Mewtwo',
		'Naganadel', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Ultranecrozium Z', 'Palkia', 'Pheromosa', 'Rayquaza', 'Reshiram', 'Salamencite', 'Shaymin-Sky', 'Solgaleo', 
		'Spectrier', 'Tornadus-Therian', 'Urshifu-Base', 'Xerneas', 'Yveltal', 'Zacian', 'Zacian-Crowned', 'Zamazenta', 'Zamazenta-Crowned', 'Zekrom', 'Zygarde-Base',
		'Zygarde-Complete', 'Arena Trap', 'Moody', 'Power Construct', 'Sand Veil', 'Shadow Tag', 'Snow Cloak', 'Bright Powder', 'King\'s Rock', 'Lax Incense', 'Razor Fang',
		'Quick Claw', 'Baton Pass',
		],
	},
	{
		name: "[Gen 8] Alternatium",
		desc: `<b>Alternatium</b>: A metagame made up of only Pokemon with alternate forms exist, with all of them being seperate and unique Pokemon.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/alternatium-slate-7-slow-twins-slate-also-vote-in-poll.3683767/">Alternatium on Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1bvvkPg1CrUBJFJJeuwkts8elfJcEcahGOoHm-vGBXOI/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: 'alternatium',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Data Mod', 'Z-Move Clause'],
		banlist: ['All Pokemon', 'Slowbronite', 'Red Orb', 'Blue Orb'],
		unbanlist: [
					'Silvally', 'Silvally-Bug', 'Silvally-Dark', 'Silvally-Dragon', 'Silvally-Electric', 'Silvally-Fairy', 'Silvally-Fighting', 'Silvally-Fire', 'Silvally-Flying', 'Silvally-Ghost', 
					'Silvally-Grass', 'Silvally-Ground', 'Silvally-Ice', 'Silvally-Poison', 'Silvally-Psychic', 'Silvally-Rock', 'Silvally-Steel', 'Silvally-Water', 'Pikachu', 'Pikachu-Rock-Star', 
					'Pikachu-Belle', 'Pikachu-Idol', 'Pikachu-PhD', 'Pikachu-Libre', 'Pikachu-Partner', 'Pikachu-Starter', 'Darmanitan', 'Darmanitan-Zen', 'Darmanitan-Galar', 'Darmanitan-Galar-Zen', 
					'Aegishield', 'Aegislash', 'Zacian', 'Zacian-Crowned', 'Zamazenta', 'Zamazenta-Crowned', 'Rotom', 'Rotom-Heat', 'Rotom-Wash', 'Rotom-Frost', 'Rotom-Fan', 'Rotom-Mow', 'Dugtrio', 
					'Dugtrio-Alola', 'Muk', 'Muk-Oilslick', 'Slowbro', 'Slowbro-Galar', 'Slowking', 'Slowking-Galar', 'Tornadus', 'Cummulus', 'Thundurus', 'Thundurus-Therian', 'Landorus', 'Landorus-Bengal', 
					'Vivillon-Fancy', 'Vivillon-Spirit', 'Vivillon-Combat', 'Genesect', 'Genesect-Douse', 'Genesect-Molten', 'Genesect-Freezer', 'Genesect-Type-Delta', 'Groudon', 'Groudon-Primal', 'Kyogre', 
					'Kyogre-Primal', 'Deoxys-Wood', 'Deoxys-Gem', 'Deoxys-Tank', 'Deoxys-Speed', 'Sandslash-Lustrous', 'Sandslash-Alola', 'Ninetales-Steamwork', 'Ninetales-Alola', 'Giratina', 'Giratina-Shadow', 
					'Eternatus', 'Manustorm', 'Exeggutor', 'Exeggutor-Lighthouse', 'Weezing', 'Weezing-King', 'Raticate', 'Raticate-Alola', 'Linoone', 'Linoone-Punk', 'Castform', 'Castform-Firestorm', 
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
		'Alakazite', 'Arceus', 'Blastoisinite', 'Blazikenite', 'Calyrex-Ice', 'Calyrex-Shadow', 'Cinderace', 'Darkrai', 'Darmanitan-Galar', 'Deoxys-Attack', 
		'Deoxys-Base', 'Deoxys-Speed', 'Dialga', 'Dracovish', 'Dragapult', 'Eternatus', 'Genesect', 'Gengarite', 'Giratina', 'Giratina-Origin', 'Groudon', 'Ho-Oh',
		'Kangaskhanite', 'Kyogre', 'Kyurem-Black', 'Kyurem-White', 'Landorus-Base', 'Lucarionite', 'Lugia', 'Lunala', 'Magearna', 'Marshadow', 'Metagrossite', 'Mewtwo',
		'Naganadel', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Ultranecrozium Z', 'Palkia', 'Pheromosa', 'Rayquaza', 'Reshiram', 'Salamencite', 'Shaymin-Sky', 'Solgaleo', 
		'Spectrier', 'Tornadus-Therian', 'Urshifu-Base', 'Xerneas', 'Yveltal', 'Zacian', 'Zacian-Crowned', 'Zamazenta', 'Zamazenta-Crowned', 'Zekrom', 'Zygarde-Base',
		'Zygarde-Complete', 'Arena Trap', 'Moody', 'Power Construct', 'Sand Veil', 'Shadow Tag', 'Snow Cloak', 'Bright Powder', 'King\'s Rock', 'Lax Incense', 'Razor Fang',
		'Quick Claw', 'Baton Pass',
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
		mod: 'gen5derivativeunova',
		name: "[Gen 5] Derivative Unova",
		desc: ["<b>Derivative Unova</b> - A Gen 5 based pet mod that explores a systematic overlook and retiering of BW OU."],
		threads: [
			`&bullet; <a href="https://placeholder">Derivative Unova (BW Retiered) thread on Smogon Forums</a>`,
			`&bullet; <a href="https://placeholder">Derivative Unova spreadsheet spreadsheet</a>`,
		],
		ruleset: ['Standard', 'Derivative Unova Mod'],
		banlist: ['Uber', 'King\'s Rock', 'Razor Fang', 'Bright Powder'],
		unbanlist: [],
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
			'All Pokemon', 'Red Orb', 'Baton Pass', 'Ninjacross + Heracronite', 'Kokovoir + Gardevoirite', 'Salamencite', 'Charizardite Y', 'Blue Orb', 'Wishirupti + Cameruptite', 'Mawilite', 'Gastrocham + Medichamite', 'Manectite', 'Herasir + Heracronite', 'Herasir + Pinsirite', 'Light Ball', 'Gengarite', 'Sablemime + Sablenite',
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
			'Mr. Basc', 'Gastrocham', 'Manditop', 'Mienpa', 'Vikadrill',
			'Venoqueen', 'Arcalie', 'Yangarde', 
			'Xurkirat', 'Golneton', 'Alakannon', 'Alakannon-Mega', 'Kingfezant', 'Googersby', 
			'Dhelarina', 'Flychu-Alola', 'Haxel', 'Frossharp', 'Tyrantricity-Low-Key', 
			'Champlume', 'Pyraskewda', 'Rotofable', 'Harisect', 'Tapu Pilo', 'Appletom-Wash', 'Phancrozma-Dawn-Wings', 'Phancrozma-Ultra',
			'Toxislash-Alola', 'Tentaterra', 'Minimie', 'Tsarant', 'Golevish-Alola',
			'Manecpig', 'Herasir', 'Magmovire', 'Giga Fini',
			'Impert-Female', 'Impert-Female-Mega', 'Koalicuno-Galar', 'Weezking-Galar', 'Ferrocario', 'Ferrocario-Mega', 'Mukremie', 'Acceldrill', 
			
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
			
			
			'Appledam', 'Regidurr', 'Duskoma', 'Fraxblade', 'Igglycian-Crowned', 
			'Eiscudile', 'Carcannon', 'Lapfisk', 'Whisdur', 'Emposerker', 'Salasian-Alola', 'Salasian-Alola-Mega', 
			"Pelilicky", "Zaponaw-Galar", "Yandos", "Mudscash", "Woopquaza-Mega", "Woopquaza", "Qwilsimian", "Buzzvine", "Solabat",
			"Jellopod", "Jellopod-F", "Espetops", "Regigoss", "Nihitrio",
			"Ferropion", "Scytic", "Dragancie", "Dragancie-Mega", "Yanturne", "Emberajah",
			"Tornett-Alola", "Togelot", "Aegix", "Dugflame", "Mr. Gar", "Spewtwo", "Spewtwo-Mega-X", "Spewtwo-Mega-Y",
			"Krowtom", "Sablemime", "Lycaking-Dusk",
			"Victreegeist-Small", "Dragerigus", "Drudlinks", "Oricroak", "Deciduvolt",

			'Corveotto', 'Torraaffy', 'Rosadin', 'Mr. Boot-Galar', 'Palpitrik', 'Pikabat', 'Krokocroco', 'Ivycat', 'Tranquorino', 'Kadabeak', 'Vibrachu', 'Chokloom', 'Magmabuzz', 'Mr. Haunt-Galar', "Dartbug",
			'Mariwick', 'Krabsweet', 'Slowmite', 'Eebat', 'Gibloon', 'Mieyu', 'Duspoke', 'Frillnub', 'Dreepig', 'Meowruff-Galar', 'Golidimp', 'Panchanpy', 'Shroolix', 'Noixel', 'Pidgeidee', 'Bronlin', 'Seedpoke-Galar', 'Glitoy', 'Munchyke', 'Venipawn', 'Krelpinch', 'Tirtipek', 'Grinamo', 'Cubodile', 'Snodew', 'Claunchiwag', 'Scymask', 'Fletchee', 'Farsola-Galar', 'Cottonas', 'Snipole', 'Maritten', 'Snogepi', 'Hippee', 'Dwepig', 'Parycoly', 'Charblu', 'Inkshrew-Alola', 'Chewkit', 'Duckgon', 'Larvaura', 'Crabrola', 'Chespew', 'Rowlipede', 'Scor Jr.', 'Porymask', 'Wimbuto', 'Larkiddo', 'Bergmel',
			'Croagma', 'Inktoy', 'Sunkip', 'Sniloon', 'Rhyble', 'Goolts', 'Clobbgar', 'Sursfant', 'Hatamask-Galar', 'Tynapole', "Meowruff", "Carvipede", "Froakaboo", "Spritdoof", "Beldino", "Pibat", "Darumaka-Prime", "Totosand", "Bulbalit", 'Vullarogue', 'Grubbur', 'Purrlithe', 'Venoran-F', 'Zubnemite', 'Abripek', 'Nidove-M', 'Gooby', 'Pinchu', 'Buixew', 'Pawnrunt', 'Tyrunxel', 'Shellitite', 'Oddchop', 'Makuras', 'Litlokuda', 'Croagshrew-Alola', 'Tentatwig', 'Magkid', 'Elecoink', 'Ferrolu', 'Koffipoke-Galar', 'Shelbur', 'Grimcery',
			'Burmlin', 'Axedge', 'Rolypek', 'Piplouth-Galar', 'Bagouth-Alola', "Mudboach", "Lickigull", "Frillopod", "Frillopod-F", "Eevuto", "Yannea", "Cupig", "Digling", "Gas Jr.", "Rockoran-M", "Rowbbin", "Maskrelp", "Bellaboo-Small",
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
			'All Pokemon', 'Baton Pass', 'Gardevoirite', 'Mawilite', 'Cameruptite', 'Scizorite', 'Glalitite', 'Sablenite', 'Lopunnite', 'Garchompite', 'Venusaurite', 'Pinsirite', 'Medichamite', 'Alakazite', 'Beedrillite', 'Manectite', 'Herasir + Heracronite', 'Charizardite Y', 'Charizardite X', 'Lucarionite', 'Swannamence + Salamencite', 'Diancite', 'Gengarite', 'Sablemime + Sablenite',
		],
		unbanlist: [
			'Torranadus-Therian', 'Togetops', 'Toxicargo', 'Claylamar', 'Vishitomb', 'Swampflora', 'Swampflora-Mega', 'Swalurchin', 'Serpeblim',
			'Azekrow', 'Trapeino', 'Goodevoir', 'Duramaw', 'Rhybite', 'Oricolyph-Sensu',
			'Grapplor', 'Masquerajah', 'Litleesect', 'Bearyx', 'Fetchey', 'Audiyem', 'Audiyem-Mega',
			'Eelektoad', 'Dialgast', 'Galsola', 'Galsola-Mega', 'Hatterune',
			'Deodon-Attack', 'Sharpiskorch', "Sharpiskorch-Mega", "Gourninja", "Cleracross", "Cleracross-Mega", "Aromarel", "Lycansian",
			'Landowak-Alola', 'Emolggron', 'Emolggron-Mega', 'Metagon', 'Hoopagigas-Unbound', 'Nashifu', 'Cramotricity', 'Raibat', 'Darmanitan-Prime',
			'Zarapex', 'Pingar', 'Kommo-tot', 'Rotokyu', 'Krookogatr', 'Venuroar', 'Klefilego', 'Rhychomp',
			'Mr. Basc', 'Gastrocham', 'Manditop', 'Mienpa', 'Vikadrill',  
			'Venoqueen', 'Arcalie', 'Yangarde', 
			'Xurkirat', 'Golneton', 'Alakannon', 'Kingfezant', 'Googersby',
			'Dhelarina', 'Flychu-Alola', 'Haxel', 'Frossharp', 'Tyrantricity-Low-Key', 
			'Champlume', 'Pyraskewda', 'Rotofable', 'Harisect', 'Tapu Pilo', 'Appletom-Wash', 'Phancrozma-Dawn-Wings', 'Phancrozma-Ultra',
			'Toxislash-Alola', 'Tentaterra', 'Minimie', 'Tsarant', 'Golevish-Alola',
			'Manecpig', 'Herasir', 'Magmovire', 'Giga Fini',
			'Impert-Female', 'Impert-Female-Mega', 'Koalicuno-Galar', 'Weezking-Galar', 'Ferrocario', 'Mukremie', 'Acceldrill', 
			
			'Tapu Lop', 'Absable', 'Absable-Mega-X', 'Cofazor', 'Lurodactyl', 'Lurodactyl-Mega', 'Wishirupti', 'Hypnakart', 'Talonsyl', 'Paracoal', 'Avarupt', 'Pherogonga', 
			'Hawlazzle', 'Glakiss', 'Glasnow', 'Glasnow-Mega', 'Dusking', 'Strikados-Galar', 'Regibee',
			'Toxalure', 'Pigapult', 'Eternabat', 'Goatitar', 'Goatitar-Mega', 'Altarizard', 'Serpanadel', 'Crustboar', 'Flaant', 'Keclyrex-Shadow', 'Frozerade', 'Sirsola', 'Snortine',
			'Swannamence', 'Vullacham', 
			
			'Silvino-Bug', 'Silvino-Dark', 'Silvino-Dragon', 'Silvino-Electric', 'Silvino-Fairy', 'Silvino-Fighting',
			'Silvino-Fire', 'Silvino-Flying', 'Silvino-Ghost', 'Silvino-Grass', 'Silvino-Ground', 'Silvino-Ice', 
			'Silvino-Poison', 'Silvino-Psychic', 'Silvino-Rock', 'Silvino-Steel', 'Silvino-Water', 'Silvino', 'Silvino-Mega',			
			'Litleesect-Douse', 'Litleesect-Shock', 'Litleesect-Burn', 'Litleesect-Chill',
			
			'Appledam', 'Regidurr', 'Duskoma', 'Fraxblade', 'Igglycian-Crowned', 
			'Eiscudile', 'Carcannon', 'Lapfisk', 'Whisdur', 'Emposerker', 'Salasian-Alola', 'Salasian-Alola-Mega', 
			"Pelilicky", "Zaponaw-Galar", "Yandos", "Mudscash", "Woopquaza-Mega", "Woopquaza", "Qwilsimian", "Buzzvine", "Solabat",
			"Jellopod", "Jellopod-F", "Espetops", "Regigoss", "Nihitrio",
			"Ferropion", "Scytic", "Dragancie", "Yanturne", "Emberajah",
			"Tornett-Alola", "Togelot", "Aegix", "Dugflame", "Mr. Gar", "Spewtwo", "Spewtwo-Mega-X", "Spewtwo-Mega-Y",
			"Krowtom", "Sablemime", "Lycaking-Dusk",
			"Victreegeist-Small", "Dragerigus", "Drudlinks", "Oricroak", "Deciduvolt",
			
			'Corveotto', 'Torraaffy', 'Rosadin', 'Mr. Boot-Galar', 'Palpitrik', 'Pikabat', 'Krokocroco', 'Ivycat', 'Tranquorino', 'Kadabeak', 'Vibrachu', 'Chokloom', 'Magmabuzz', 'Mr. Haunt-Galar', "Dartbug",
			'Mariwick', 'Krabsweet', 'Slowmite', 'Eebat', 'Gibloon', 'Mieyu', 'Duspoke', 'Frillnub', 'Dreepig', 'Meowruff-Galar', 'Golidimp', 'Panchanpy', 'Shroolix', 'Noixel', 'Pidgeidee', 'Bronlin', 'Seedpoke-Galar', 'Glitoy', 'Munchyke', 'Venipawn', 'Krelpinch', 'Tirtipek', 'Grinamo', 'Cubodile', 'Snodew', 'Claunchiwag', 'Scymask', 'Fletchee', 'Farsola-Galar', 'Cottonas', 'Snipole', 'Maritten', 'Snogepi', 'Hippee', 'Dwepig', 'Parycoly', 'Charblu', 'Inkshrew-Alola', 'Chewkit', 'Duckgon', 'Larvaura', 'Crabrola', 'Chespew', 'Rowlipede', 'Scor Jr.', 'Porymask', 'Wimbuto', 'Larkiddo', 'Bergmel',
			'Croagma', 'Inktoy', 'Sunkip', 'Sniloon', 'Rhyble', 'Goolts', 'Clobbgar', 'Sursfant', 'Hatamask-Galar', 'Tynapole', "Meowruff", "Carvipede", "Froakaboo", "Spritdoof", "Beldino", "Pibat", "Darumaka-Prime", "Totosand", "Bulbalit", 'Vullarogue', 'Grubbur', 'Purrlithe', 'Venoran-F', 'Zubnemite', 'Abripek', 'Nidove-M', 'Gooby', 'Pinchu', 'Buixew', 'Pawnrunt', 'Tyrunxel', 'Shellitite', 'Oddchop', 'Makuras', 'Litlokuda', 'Croagshrew-Alola', 'Tentatwig', 'Magkid', 'Elecoink', 'Ferrolu', 'Koffipoke-Galar', 'Shelbur', 'Grimcery',
			'Burmlin', 'Axedge', 'Rolypek', 'Piplouth-Galar', 'Bagouth-Alola', "Mudboach", "Lickigull", "Frillopod", "Frillopod-F", "Eevuto", "Yannea", "Cupig", "Digling", "Gas Jr.", "Rockoran-M", "Rowbbin", "Maskrelp", "Bellaboo-Small",
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
				if (speciesTable[template.name]) {
					return ["You are limited to one of each Pokémon by Species Clause (except for different Rotom formes). ", "You have more than one " + template.baseSpecies + "."];
				}
				speciesTable[template.name] = true;
				if (template.tier !== 'MV') {
					return [set.species + ' is not usable in Multiverse.'];
				}
			}
		},
		mod: 'multiverse',
		ruleset: ['Standard', '!Species Clause', 'Dynamax Clause', 'Data Mod', 'Multiverse Mod'],
		banlist: ['Arena Trap', 'Moody', 'Shadow Tag', 'Baton Pass', 'Snow Cloak', 'Bright Powder', 'Lax Incense'],
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
		name: "[Gen 8] OptiMons v2",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/gen-8-optimons-v2-3rd-slate-creepy.3700473/">OptiMons v2</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1TfbiVvD6JHglCDJKCQeDV9OTKYJqDM5rSJY8zh0bsVA/edit#gid=0">Spreadsheet</a>`,
		],

		mod: 'optimonsv2',
   	ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod'],
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
		pokeClasses: ['warrior','mage','thief','barbarian'],
		pokeSkills: ['blade','destruction','athletics','restoration'],
		onSwitchInPriority: 2,
		onSwitchIn(pokemon) {
			if ( pokemon.pokeClass ) pokemon.addVolatile('ability:' + pokemon.pokeClass, pokemon);
			if ( pokemon.pokeSkill ) pokemon.addVolatile(pokemon.pokeSkill);
		},
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
		'Bright Powder', 'Lax Incense', 'King\'s Rock', 'Razor Fang', 'Kangaskhanite', 'Medichamite', 'Kangaskhan-Mega', 'Kartana', 'Kyurem', 'Medicham-Mega'],
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
		name: "[Gen 8] Two-Step Mons",
		desc: `<b>Restrictions</b>: A metagame where we first make moves and abilities, then build pokemon around them.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3694386/">Two-Step Mons on Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1ON4XRtxK2WA55812tPPKrezUcDi2kSriZ1QnDaQgSO8/edit#gid=0">Spreadsheet</a>`,
		],
		mod: 'twostepmons',
		ruleset: ['Standard', 'Dynamax Clause', 'Data Mod'],
		banlist: ['all pokemon'],
		unbanlist: ['Sharpedo', 'Eelektross', 'Sableye', 'Rotom', 'Porygon', 'Tentacruel', 'Rillaboom', 'Nihilego', 'Oricorio', 'Archeops', 'Camerupt', 'Carkol', 
			'Guemanon', 'Snoorwill', 'Aterrundu', 'Metagross', 'Zygarde', 'Groudon'
		],
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
		ruleset: ['Standard Doubles', 'Dynamax Clause', 'Data Mod', '+Unobtainable', '+Past', 'Z-Move Clause'],
		banlist: ['All Pokemon'],
		unbanlist: [
					'Silvally', 'Silvally-Bug', 'Silvally-Dark', 'Silvally-Dragon', 'Silvally-Electric', 'Silvally-Fairy', 'Silvally-Fighting', 'Silvally-Fire', 'Silvally-Flying', 'Silvally-Ghost', 
					'Silvally-Grass', 'Silvally-Ground', 'Silvally-Ice', 'Silvally-Poison', 'Silvally-Psychic', 'Silvally-Rock', 'Silvally-Steel', 'Silvally-Water', 'Pikachu', 'Pikachu-Rock-Star', 
					'Pikachu-Belle', 'Pikachu-Idol', 'Pikachu-PhD', 'Pikachu-Libre', 'Pikachu-Partner', 'Pikachu-Starter', 'Darmanitan', 'Darmanitan-Zen', 'Darmanitan-Galar', 'Darmanitan-Galar-Zen', 
					'Aegishield', 'Aegislash', 'Zacian', 'Zacian-Crowned', 'Zamazenta', 'Zamazenta-Crowned', 'Rotom', 'Rotom-Heat', 'Rotom-Wash', 'Rotom-Frost', 'Rotom-Fan', 'Rotom-Mow', 'Dugtrio', 
					'Dugtrio-Alola', 'Muk', 'Muk-Oilslick', 'Slowbro', 'Slowbro-Galar', 'Slowking', 'Slowking-Galar', 'Tornadus', 'Cummulus', 'Thundurus', 'Thundurus-Therian', 'Landorus', 'Landorus-Bengal', 
					'Vivillon-Fancy', 'Vivillon-Spirit', 'Vivillon-Combat', 'Genesect', 'Genesect-Douse', 'Genesect-Molten', 'Genesect-Freezer', 'Genesect-Type-Delta', 'Groudon', 'Groudon-Primal', 'Kyogre', 
					'Kyogre-Primal', 'Deoxys-Wood', 'Deoxys-Gem', 'Deoxys-Tank', 'Deoxys-Speed', 'Sandslash-Lustrous', 'Sandslash-Alola', 'Ninetales-Steamwork', 'Ninetales-Alola', 'Giratina', 'Giratina-Shadow', 
					'Eternatus', 'Manustorm', 'Exeggutor', 'Exeggutor-Lighthouse', 'Weezing', 'Weezing-King', 'Raticate', 'Raticate-Alola', 'Linoone', 'Linoone-Punk', 'Castform', 'Castform-Firestorm', 
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
			'All Pokemon', 'Red Orb', 'Baton Pass', 'Ninjacross + Heracronite', 'Kokovoir + Gardevoirite', 'Salamencite', 'Charizardite Y', 'Blue Orb', 'Wishirupti + Cameruptite', 'Mawilite', 'Gastrocham + Medichamite', 'Manectite', 'Herasir + Heracronite', 'Herasir + Pinsirite', 'Light Ball', 'Gengarite',
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
			'Mr. Basc', 'Gastrocham', 'Manditop', 'Mienpa', 'Vikadrill',
			'Venoqueen', 'Arcalie', 'Yangarde', 
			'Xurkirat', 'Golneton', 'Alakannon', 'Alakannon-Mega', 'Kingfezant', 'Googersby', 
			'Dhelarina', 'Flychu-Alola', 'Haxel', 'Frossharp', 'Tyrantricity-Low-Key', 
			'Champlume', 'Pyraskewda', 'Rotofable', 'Harisect', 'Tapu Pilo', 'Appletom-Wash', 'Phancrozma-Dawn-Wings', 'Phancrozma-Ultra',
			'Toxislash-Alola', 'Tentaterra', 'Minimie', 'Tsarant', 'Golevish-Alola',
			'Manecpig', 'Herasir', 'Magmovire', 'Giga Fini',
			'Impert-Female', 'Impert-Female-Mega', 'Koalicuno-Galar', 'Weezking-Galar', 'Ferrocario', 'Ferrocario-Mega', 'Mukremie', 'Acceldrill', 
			
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
			
			
			'Appledam', 'Regidurr', 'Duskoma', 'Fraxblade', 'Igglycian-Crowned', 
			'Eiscudile', 'Carcannon', 'Lapfisk', 'Whisdur', 'Emposerker', 'Salasian-Alola', 'Salasian-Alola-Mega', 
			"Pelilicky", "Zaponaw-Galar", "Yandos", "Mudscash", "Woopquaza-Mega", "Woopquaza", "Qwilsimian", "Buzzvine", "Solabat",
			"Jellopod", "Jellopod-F", "Espetops", "Regigoss", "Nihitrio",
			"Ferropion", "Scytic", "Dragancie", "Dragancie-Mega", "Yanturne", "Emberajah",
			"Tornett-Alola", "Togelot", "Aegix", "Dugflame", "Mr. Gar", "Spewtwo", "Spewtwo-Mega-X", "Spewtwo-Mega-Y",
			"Krowtom", "Sablemime", "Lycaking-Dusk",
			"Victreegeist-Small", "Dragerigus", "Drudlinks", "Oricroak", "Deciduvolt",

			'Corveotto', 'Torraaffy', 'Rosadin', 'Mr. Boot-Galar', 'Palpitrik', 'Pikabat', 'Krokocroco', 'Ivycat', 'Tranquorino', 'Kadabeak', 'Vibrachu', 'Chokloom', 'Magmabuzz', 'Mr. Haunt-Galar', "Dartbug",
			'Mariwick', 'Krabsweet', 'Slowmite', 'Eebat', 'Gibloon', 'Mieyu', 'Duspoke', 'Frillnub', 'Dreepig', 'Meowruff-Galar', 'Golidimp', 'Panchanpy', 'Shroolix', 'Noixel', 'Pidgeidee', 'Bronlin', 'Seedpoke-Galar', 'Glitoy', 'Munchyke', 'Venipawn', 'Krelpinch', 'Tirtipek', 'Grinamo', 'Cubodile', 'Snodew', 'Claunchiwag', 'Scymask', 'Fletchee', 'Farsola-Galar', 'Cottonas', 'Snipole', 'Maritten', 'Snogepi', 'Hippee', 'Dwepig', 'Parycoly', 'Charblu', 'Inkshrew-Alola', 'Chewkit', 'Duckgon', 'Larvaura', 'Crabrola', 'Chespew', 'Rowlipede', 'Scor Jr.', 'Porymask', 'Wimbuto', 'Larkiddo', 'Bergmel',
			'Croagma', 'Inktoy', 'Sunkip', 'Sniloon', 'Rhyble', 'Goolts', 'Clobbgar', 'Sursfant', 'Hatamask-Galar', 'Tynapole', "Meowruff", "Carvipede", "Froakaboo", "Spritdoof", "Beldino", "Pibat", "Darumaka-Prime", "Totosand", "Bulbalit", 'Vullarogue', 'Grubbur', 'Purrlithe', 'Venoran-F', 'Zubnemite', 'Abripek', 'Nidove-M', 'Gooby', 'Pinchu', 'Buixew', 'Pawnrunt', 'Tyrunxel', 'Shellitite', 'Oddchop', 'Makuras', 'Litlokuda', 'Croagshrew-Alola', 'Tentatwig', 'Magkid', 'Elecoink', 'Ferrolu', 'Koffipoke-Galar', 'Shelbur', 'Grimcery',
			'Burmlin', 'Axedge', 'Rolypek', 'Piplouth-Galar', 'Bagouth-Alola', "Mudboach", "Lickigull", "Frillopod", "Frillopod-F", "Eevuto", "Yannea", "Cupig", "Digling", "Gas Jr.", "Rockoran-M", "Rowbbin", "Maskrelp", "Bellaboo-Small",
			'Exeggcute',
		],
    },
	{
		name: "[Gen 8] Fusion Evolution LC",
		mod: "feuu",
		forcedLevel: 5,
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
			'Croagma', 'Inktoy', 'Sunkip', 'Sniloon', 'Rhyble', 'Goolts', 'Clobbgar', 'Sursfant', 'Hatamask-Galar', 'Tynapole', "Meowruff", "Carvipede", "Froakaboo", "Spritdoof", "Beldino", "Pibat", "Darumaka-Prime", "Totosand", "Bulbalit", 'Vullarogue', 'Grubbur', 'Purrlithe', 'Venoran-F', 'Zubnemite', 'Abripek', 'Nidove-M', 'Gooby', 'Pinchu', 'Buixew', 'Pawnrunt', 'Tyrunxel', 'Shellitite', 'Oddchop', 'Makuras', 'Litlokuda', 'Croagshrew-Alola', 'Tentatwig', 'Magkid', 'Elecoink', 'Ferrolu', 'Koffipoke-Galar', 'Shelbur', 'Grimcery',
			'Ferros', 'Trapeino', 'Exeggcute',
			'Burmlin', 'Axedge', 'Rolypek', 'Piplouth-Galar', 'Bagouth-Alola', "Mudboach", "Lickigull", "Frillopod", "Frillopod-F", "Eevuto", "Yannea", "Cupig", "Digling", "Gas Jr.", "Rockoran-M", "Rowbbin", "Maskrelp", "Bellaboo-Small",
		],
	},
	{
		name: "[Gen 8] Generation X - Loria NatDex",
		desc: ["<b>Generation X</b>: A mod that aims to add everything you would expect from 2 new generations of Pokemon games. Welcome to the Brazil-inspired Brazdo region and the Florida-inspired Loria region!",],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/generation-x.3670676/>Generation X on Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1fUwoUiu1uVOxW08diz_Xq60LBfyAN3f_ioysAS0-BJE/edit?usp=sharing>Brazdo Spreadsheet</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1zMDn-TjrGfvaDKi6ejM63RV8QmddTvbLl2CKIZbMct0/edit?usp=sharing>Loria Spreadsheet</a>`,
		],

		mod: 'genxloria',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Freeze Clause Mod', 'Data Mod', 'Mega Data Mod'],
		banlist: [
			'Alakazam-Mega', 'Arceus', 'Blastoise-Mega', 'Dracovish', 'Darkrai', 'Deoxys-Attack', 'Deoxys-Base', 'Deoxys-Speed',
			'Dialga', 'Eternatus', 'Genesect', 'Gengar-Mega', 'Giratina', 'Groudon', 'Ho-Oh', 'Kangaskhan-Mega', 'Kyogre',
			'Kyurem-Black', 'Kyurem-White', 'Landorus-Base', 'Lucario-Mega', 'Lugia', 'Lunala', 'Marshadow', 'Mewtwo',
			'Naganadel', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Palkia', 'Pheromosa', 'Rayquaza', 'Reshiram',
			'Salamence-Mega', 'Shaymin-Sky', 'Solgaleo', 'Xerneas', 'Yveltal', 'Zacian', 'Zamazenta', 'Zekrom', 'Zygarde-Base',
			'Amzodulan-Base', 'Flowiai-Base', 'Poruvia-Revered', 'Calaguaca-Revered',
			'Arena Trap', 'Moody', 'Power Construct', 'Shadow Tag', 'Baton Pass',
		],
	},
	{
		name: "[Gen 8] Generation X - Loria VGC",
		desc: ["<b>Generation X</b>: A mod that aims to add everything you would expect from a whole new generation of Pokemon games. Welcome to the Florida-inspired Loria region!",],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/generation-x.3670676/>Generation X on Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1zMDn-TjrGfvaDKi6ejM63RV8QmddTvbLl2CKIZbMct0/edit?usp=sharing>Spreadsheet</a>`,
		],

		mod: 'genxloria',
		ruleset: ['Standard GBU', 'VGC Timer', 'Dynamax Clause', 'Data Mod', 'Mega Data Mod', '+Past', 'Z-Move Clause', 'Mega Data Mod'],
		gameType: 'doubles',
		forcedLevel: 50,
		teamLength: {
			validate: [4, 6],
			battle: 4,
		},
		banlist: [
			'Altarianite', 'Gengarite', 'Salamencite',
			'Calaguaca', 'Poruvia', 'Mudaracan',
			'Fortuigon', 'Chibardo', 'Hyakada',
		],
		onValidateTeam(team, format) {
			let speciesTable = {};
			let allowedTiers = ['Loria FE', 'Loria NFE', 'Loria LC'];
			for (const set of team) {
				let template = this.dex.getSpecies(set.species);
				if ( !allowedTiers.includes(template.tier) ) {
					return [set.species + ' is not useable in Gen X Loria.'];
				}
			}
		},
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
		banlist: ['Wobbuffet + Leftovers'],
		unbanlist: [
		],
		teambuilderFormat: 'Uber',
	},
	{
		name: "[Gen 3] Hoenn Gaiden UU",
		desc: ["<b>Hoenn Gaiden</b>: A Gen 3 pet mod that aims to devamp Gen 4-8 Pokemon, moves and items into the Gen 3 mechanics."],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/hoenn-gaiden-the-gen-3-pet-mod-round-1-discussion.3681339/">Hoenn Gaiden on Smogon Forums</a>`,
		],

		mod: 'gen3hoenngaiden',
		searchShow: false,
		ruleset: ['[Gen 3] Hoenn Gaiden'],
		banlist: ['OU', 'UUBL'],
		unbanlist: [
		],
		teambuilderFormat: 'OU',
	},
	/*{
		name: "[Gen 3] Hoenn Gaiden Uber",
		desc: ["<b>Hoenn Gaiden</b>: A Gen 3 pet mod that aims to devamp Gen 4-8 Pokemon, moves and items into the Gen 3 mechanics."],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/hoenn-gaiden-the-gen-3-pet-mod-round-1-discussion.3681339/">Hoenn Gaiden on Smogon Forums</a>`,
		],

		mod: 'gen3hoenngaiden',
		searchShow: false,
		ruleset: ['Standard', 'Data Mod', 'Hoenn Gaiden Mod'],
		banlist: ['Wobbuffet + Leftovers'],
		unbanlist: [
		],
		teambuilderFormat: 'Uber',
	},*/
	{
		name: "[Gen 8] JolteMons 1v1",
		desc: [
			"<b>JolteMons</b>: A sequel to SylveMons where Pokemon, items, abilities and moves are redesigned for OU (and new items, abilities and moves are added) without changing base stats.",
		],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/joltemons-slate-1-distribution-phase.3694234/">Thread on the Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/149ZlQY0bJIAqfWB_233Dvbpqs3pVSHYpIoAQQkwquls/edit?usp=sharing">Spreadsheet</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/joltemons-playtesting-phase-uu.3694234/post-9143011">Banlist</a>`,
		],
		mod: 'joltemons',	
		teambuilderFormat: 'OU',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Data Mod', 'Mega Data Mod', 'Accuracy Moves Clause'],
		unbanlist: ['Moody', 'Shaymin-Sky', 'Kangaskhan-Mega', 'Darmanitan-Galar', 'Naganadel', 'Dracovish', 'Urshifu-Base', 'Spectrier', 'Pheromosa', 'Zygarde', 'Landorus-Base'],
		banlist: ['Uber', 'Power Construct', 'Arceus', 'Blazikenite', 'Blastoisinite', 'Darkrai', 'Deoxys-Base', 'Deoxys-Attack', 'Deoxys-Defense', 'Dialga', 'Genesect', 'Gengarite', 'Giratina', 'Giratina-Origin', 'Groudon', 'Ho-Oh', 'Kyogre', 'Kyurem-Black', 'Kyurem-White', 'Lucarionite', 'Lugia', 'Lunala', 'Marshadow', 'Metagrossite', 'Mewtwo', 'Mewtwo-Mega-X', 'Mewtwo-Mega-Y', 'Naganadel', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Palkia', 'Rayquaza', 'Reshiram', 'Salamencite', 'Solgaleo', 'Xerneas', 'Yveltal', 'Zacian', 'Zamazenta', 'Zekrom', 'Berserk Gene', 'Eevee-Starter', 'Pikachu-Starter', 'Magearna', 'Dragonite', 'Jirachi', 'Mew', 'Mimikyu', 'Necrozma', 'Sableye', 'Snorlax', 'Victini', 'Bright Powder', 'Focus Band', 'Focus Sash', 'Lax Incense', 'Quick Claw','Acupressure', 'Hypnosis', 'Perish Song', 'Sing',
					'Normalium Z', 'Fairium Z', 'Fightinium Z', 'Firium Z', 'Flyinium Z', 'Darkinium Z', 'Dragonium Z', 'Buginium Z', 'Waterium Z', 'Electrium Z', 'Ghostium Z', 'Grassium Z', 'Groundium Z', 'Icium Z', 'Poisonium Z', 'Psychium Z', 'Rockium Z', 'Steelium Z', 'Decidium Z', 'Kommonium Z',
					'Soul Blade Lvl. 2', 'Soul Blade Lvl. 3', 'Soul Blade Lvl. 4', 'Soul Blade Lvl. 5', 'Ultra Soul Blade',
					],
		teamLength: {
			validate: [1, 3],
			battle: 1,
		},
	},
	{
		name: "[Gen 8] JolteMons UU",
		desc: [
			"<b>JolteMons</b>: A sequel to SylveMons where Pokemon, items, abilities and moves are redesigned for OU (and new items, abilities and moves are added) without changing base stats.",
		],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/joltemons-slate-1-distribution-phase.3694234/">Thread on the Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/149ZlQY0bJIAqfWB_233Dvbpqs3pVSHYpIoAQQkwquls/edit?usp=sharing">Spreadsheet</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/joltemons-playtesting-phase-uu.3694234/post-9143011">Banlist</a>`,
		],
		mod: 'joltemons',	
		teambuilderFormat: 'UU',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Data Mod', 'Mega Data Mod'],
		unbanlist: ['Moody', 'Kangaskhan-Mega', 'Darmanitan-Galar'],
		banlist: ['OU', 'UUBL', 'Uber', 'Arena Trap', 'Power Construct', 'Shadow Tag', 'Baton Pass', 'Arceus', 'Blazikenite', 'Blastoisinite', 'Darkrai', 'Deoxys-Base', 'Deoxys-Attack', 'Deoxys-Speed', 'Dialga', 'Genesect', 'Gengarite', 'Giratina', 'Giratina-Origin', 'Groudon', 'Ho-Oh', 'Kyogre', 'Kyurem-Black', 'Kyurem-White', 'Landorus-Base', 'Lucarionite', 'Lugia', 'Lunala', 'Marshadow', 'Metagrossite', 'Mewtwo', 'Mewtwo-Mega-X', 'Mewtwo-Mega-Y', 'Naganadel', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Palkia', 'Pheromosa', 'Rayquaza', 'Reshiram', 'Salamencite', 'Solgaleo', 'Xerneas', 'Yveltal', 'Zacian', 'Zamazenta', 'Zekrom', 'Zygarde-Base', 'Berserk Gene', 'Eevee-Starter', 'Pikachu-Starter', 'Moody', 'Magearna', 'Spectrier', 'Dracovish', 'Urshifu-Base',
					'Normalium Z', 'Fairium Z', 'Fightinium Z', 'Firium Z', 'Flyinium Z', 'Darkinium Z', 'Dragonium Z', 'Buginium Z', 'Waterium Z', 'Electrium Z', 'Ghostium Z', 'Grassium Z', 'Groundium Z', 'Icium Z', 'Poisonium Z', 'Psychium Z', 'Rockium Z', 'Steelium Z', 'Decidium Z', 'Kommonium Z',
					'Soul Blade Lvl. 2', 'Soul Blade Lvl. 3', 'Soul Blade Lvl. 4', 'Soul Blade Lvl. 5', 'Ultra Soul Blade',
					'Chill Pill G', 'Lopunnite', 'Scizorite', 'Gyaradosite', 'Charizardite Y', 'Charizardite X', 'Pinsirite', 'Heracronite', 'Aerodactylite', 'Alakazite', 'Galladite', 'Gardevoirite', 'Medichamite', 'Diancite', 'Mawilite', 'Beedrillite', 'Swampertite', 'Latiasite', 'Latiosite', 'Tyranitarite', 'Venusaurite', 'Graduation Scale', 'Sablenite',
					'Light Clay', 'Bright Powder', 'Lax Incense', 'King\'s Rock', 'Razor Fang'],
	},
	{
		name: "[Gen 8] JolteMons RU",
		desc: [
			"<b>JolteMons</b>: A sequel to SylveMons where Pokemon, items, abilities and moves are redesigned for OU (and new items, abilities and moves are added) without changing base stats.",
		],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/joltemons-slate-1-distribution-phase.3694234/">Thread on the Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/149ZlQY0bJIAqfWB_233Dvbpqs3pVSHYpIoAQQkwquls/edit?usp=sharing">Spreadsheet</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/joltemons-playtesting-phase-uu.3694234/post-9143011">Banlist</a>`,
		],
		mod: 'joltemons',	
		teambuilderFormat: 'RU',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Data Mod', 'Mega Data Mod'],
		unbanlist: ['Moody', 'Kangaskhan-Mega'],
		banlist: ['OU', 'UUBL', 'RUBL', 'UU', 'Uber', 'Arena Trap', 'Power Construct', 'Shadow Tag', 'Baton Pass', 'Arceus', 'Blazikenite', 'Blastoisinite', 'Darkrai', 'Deoxys-Base', 'Deoxys-Attack', 'Deoxys-Speed', 'Dialga', 'Genesect', 'Gengarite', 'Giratina', 'Giratina-Origin', 'Groudon', 'Ho-Oh', 'Kyogre', 'Kyurem-Black', 'Kyurem-White', 'Landorus-Base', 'Lucarionite', 'Lugia', 'Lunala', 'Marshadow', 'Metagrossite', 'Mewtwo', 'Mewtwo-Mega-X', 'Mewtwo-Mega-Y', 'Naganadel', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Palkia', 'Pheromosa', 'Rayquaza', 'Reshiram', 'Salamencite', 'Solgaleo', 'Xerneas', 'Yveltal', 'Zacian', 'Zamazenta', 'Zekrom', 'Zygarde-Base', 'Berserk Gene', 'Eevee-Starter', 'Pikachu-Starter', 'Moody', 'Magearna', 'Spectrier', 'Dracovish', 'Urshifu-Base',
					'Normalium Z', 'Fairium Z', 'Fightinium Z', 'Firium Z', 'Flyinium Z', 'Darkinium Z', 'Dragonium Z', 'Buginium Z', 'Waterium Z', 'Electrium Z', 'Ghostium Z', 'Grassium Z', 'Groundium Z', 'Icium Z', 'Poisonium Z', 'Psychium Z', 'Rockium Z', 'Steelium Z', 'Decidium Z', 'Kommonium Z',
					'Soul Blade Lvl. 2', 'Soul Blade Lvl. 3', 'Soul Blade Lvl. 4', 'Soul Blade Lvl. 5', 'Ultra Soul Blade',
					'Chill Pill G', 'Lopunnite', 'Scizorite', 'Gyaradosite', 'Charizardite Y', 'Charizardite X', 'Pinsirite', 'Heracronite', 'Aerodactylite', 'Alakazite', 'Galladite', 'Gardevoirite', 'Medichamite', 'Diancite', 'Mawilite', 'Beedrillite', 'Swampertite', 'Latiasite', 'Latiosite', 'Tyranitarite', 'Venusaurite', 'Graduation Scale', 'Sablenite',
					'Altarianite', 'Chill Pill', 'Relic Charm', 'Drizzle', 'Ampharosite', 'Manectite', 'Pidgeotite', 'Steelixite', 'Aggronite', 'Banettite', 'Sharpedonite',
					'Light Clay', 'Bright Powder', 'Lax Incense', 'King\'s Rock', 'Razor Fang'],
	},
	{
		name: "[Gen 8] JolteMons NU",
		desc: [
			"<b>JolteMons</b>: A sequel to SylveMons where Pokemon, items, abilities and moves are redesigned for OU (and new items, abilities and moves are added) without changing base stats.",
		],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/joltemons-slate-1-distribution-phase.3694234/">Thread on the Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/149ZlQY0bJIAqfWB_233Dvbpqs3pVSHYpIoAQQkwquls/edit?usp=sharing">Spreadsheet</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/joltemons-playtesting-phase-uu.3694234/post-9143011">Banlist</a>`,
		],
		mod: 'joltemons',	
		teambuilderFormat: 'NU',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Data Mod', 'Mega Data Mod'],
		unbanlist: ['Moody'],
		banlist: ['OU', 'UUBL', 'RUBL', 'UU', 'Uber', 'RU', 'NUBL', 'Arena Trap', 'Power Construct', 'Shadow Tag', 'Baton Pass', 'Arceus', 'Blazikenite', 'Blastoisinite', 'Darkrai', 'Deoxys-Base', 'Deoxys-Attack', 'Deoxys-Speed', 'Dialga', 'Genesect', 'Gengarite', 'Giratina', 'Giratina-Origin', 'Groudon', 'Ho-Oh', 'Kyogre', 'Kyurem-Black', 'Kyurem-White', 'Landorus-Base', 'Lucarionite', 'Lugia', 'Lunala', 'Marshadow', 'Metagrossite', 'Mewtwo', 'Mewtwo-Mega-X', 'Mewtwo-Mega-Y', 'Naganadel', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Palkia', 'Pheromosa', 'Rayquaza', 'Reshiram', 'Salamencite', 'Solgaleo', 'Xerneas', 'Yveltal', 'Zacian', 'Zamazenta', 'Zekrom', 'Zygarde-Base', 'Berserk Gene', 'Eevee-Starter', 'Pikachu-Starter', 'Moody', 'Magearna', 'Spectrier', 'Dracovish', 'Urshifu-Base',
					'Normalium Z', 'Fairium Z', 'Fightinium Z', 'Firium Z', 'Flyinium Z', 'Darkinium Z', 'Dragonium Z', 'Buginium Z', 'Waterium Z', 'Electrium Z', 'Ghostium Z', 'Grassium Z', 'Groundium Z', 'Icium Z', 'Poisonium Z', 'Psychium Z', 'Rockium Z', 'Steelium Z', 'Decidium Z', 'Kommonium Z',
					'Soul Blade Lvl. 2', 'Soul Blade Lvl. 3', 'Soul Blade Lvl. 4', 'Soul Blade Lvl. 5', 'Ultra Soul Blade',
					'Chill Pill G', 'Lopunnite', 'Scizorite', 'Gyaradosite', 'Charizardite Y', 'Charizardite X', 'Pinsirite', 'Heracronite', 'Aerodactylite', 'Alakazite', 'Galladite', 'Gardevoirite', 'Medichamite', 'Diancite', 'Mawilite', 'Beedrillite', 'Swampertite', 'Latiasite', 'Latiosite', 'Tyranitarite', 'Venusaurite', 'Graduation Scale', 'Sablenite',
					'Altarianite', 'Chill Pill', 'Relic Charm', 'Drizzle', 'Ampharosite', 'Manectite', 'Pidgeotite', 'Steelixite', 'Aggronite', 'Banettite', 'Sharpedonite',
					'Absolite', 'Audinite', 'Kangaskhanite', 'Sceptilite', 'Cameruptite', 'Ghost Memory',
					'Light Clay', 'Bright Powder', 'Lax Incense', 'King\'s Rock', 'Razor Fang'],
	},
/*
	{
		name: "[Gen 8] JolteMons (Suspect Test)",
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
		unbanlist: ['Dragapult', 'Tornadus-Therian', 'Blaziken', 'Greninja-Ash', 'Moody', 'Shaymin-Sky', 'Kangaskhan-Mega', 'Darmanitan-Galar', 'Metagross-Mega'],
		banlist: ['Uber', 'Arena Trap', 'Power Construct', 'Shadow Tag', 'Baton Pass', 'Arceus', 'Blazikenite', 'Blastoisinite', 'Darkrai', 'Deoxys-Base', 'Deoxys-Attack', 'Deoxys-Speed', 'Dialga', 'Genesect', 'Gengarite', 'Giratina', 'Giratina-Origin', 'Groudon', 'Ho-Oh', 'Kyogre', 'Kyurem-Black', 'Kyurem-White', 'Landorus-Base', 'Lugia', 'Lunala', 'Marshadow', 'Mewtwo', 'Mewtwo-Mega-X', 'Mewtwo-Mega-Y', 'Naganadel', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Palkia', 'Pheromosa', 'Rayquaza', 'Reshiram', 'Salamencite', 'Solgaleo', 'Xerneas', 'Yveltal', 'Zacian', 'Zamazenta', 'Zekrom', 'Zygarde-Base', 'Berserk Gene', 'Eevee-Starter', 'Pikachu-Starter', 'Moody', 'Magearna', 'Spectrier', 'Dracovish', 'Urshifu-Base',
					'Normalium Z', 'Fairium Z', 'Fightinium Z', 'Firium Z', 'Flyinium Z', 'Darkinium Z', 'Dragonium Z', 'Buginium Z', 'Waterium Z', 'Electrium Z', 'Ghostium Z', 'Grassium Z', 'Groundium Z', 'Icium Z', 'Poisonium Z', 'Psychium Z', 'Rockium Z', 'Steelium Z', 'Decidium Z', 'Kommonium Z',
					'Soul Blade Lvl. 2', 'Soul Blade Lvl. 3', 'Soul Blade Lvl. 4', 'Soul Blade Lvl. 5', 'Ultra Soul Blade'],
	},
*/
	{
		name: "[Gen 8] M4A OU (Natdex)",
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
			if (restrictedSpecies.length > 2) {
				return [`You can only use up to two restricted Pok\u00E9mon (you have: ${restrictedSpecies.join(', ')})`];
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
		name: "[Gen 8] M4A VGC x Hisui Tour",
		desc: ["Megas for All v7 but it's a VGC format that features Pokémon from Legends: Arceus",
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
		banlist: ['All Pokemon', 'Porygodite-Z', 'Pichunite'],
		unbanlist: [
			'Rowlet', 'Dartrix', 'Decidueye-Hisui', 'Cyndaquil', 'Quilava', 'Typhlosion-Hisui', 'Oshawott', 'Dewott', 'Samurott-Hisui', 'Bidoof', 'Bibarel', 'Starly',
			'Staravia', 'Staraptor', 'Shinx', 'Luxio', 'Luxray', 'Wurmple', 'Silcoon', 'Beautifly', 'Cascoon', 'Dustox', 'Ponyta-Base', 'Rapidash-Base', 'Eevee',
			'Vaporeon', 'Jolteon', 'Flareon', 'Espeon', 'Umbreon', 'Leafeon', 'Glaceon', 'Sylveon', 'Zubat', 'Golbat', 'Crobat', 'Drifloon', 'Drifblim', 'Kricketot',
			'Kricketune', 'Buizel', 'Floatzel', 'Burmy', 'Wormadam', 'Mothim', 'Geodude-Base', 'Graveler-Base', 'Golem-Base', 'Stantler', 'Wyrdeer', 'Munchlax', 'Snorlax',
			'Paras', 'Parasect', 'Pichu', 'Pikachu', 'Raichu-Base', 'Abra', 'Kadabra', 'Alakazam', 'Chimchar', 'Monferno', 'Infernape', 'Buneary', 'Lopunny', 'Cherubi',
			'Cherrim', 'Psyduck', 'Golduck', 'Combee', 'Vespiquen', 'Scyther', 'Kleavor', 'Scizor', 'Heracross', 'Mime Jr.', 'Mr. Mime-Base', 'Aipom', 'Ambipom',
			'Magikarp', 'Gyarados', 'Shellos', 'Gastrodon', 'Qwilfish-Hisui', 'Overqwil', 'Happiny', 'Chansey', 'Blissey', 'Budew', 'Roselia', 'Roserade', 'Carnivine',
			'Petilil', 'Lilligant-Hisui', 'Tangela', 'Tangrowth', 'Barboach', 'Whiscash', 'Croagunk', 'Toxicroak', 'Ralts', 'Kirlia', 'Gardevoir', 'Gallade', 'Yanma',
			'Yanmega', 'Hippopotas', 'Hippowdon', 'Pachirisu', 'Stunky', 'Skuntank', 'Teddiursa', 'Ursaring', 'Ursaluna', 'Goomy', 'Sliggoo-Hisui', 'Goodra-Hisui',
			'Onix', 'Steelix', 'Rhyhorn', 'Rhydon', 'Rhyperior', 'Bonsly', 'Sudowoodo', 'Lickitung', 'Lickilicky', 'Togepi', 'Togetic', 'Togekiss', 'Turtwig', 'Grotle',
			'Torterra', 'Porygon', 'Porygon2', 'Porygon-Z', 'Gastly', 'Haunter', 'Gengar', 'Spiritomb', 'Murkrow', 'Honchkrow', 'Unown', 'Spheal', 'Sealeo', 'Walrein',
			'Remoraid', 'Octillery', 'Skorupi', 'Drapion', 'Growlithe-Hisui', 'Arcanine-Hisui', 'Glameow', 'Purugly', 'Machop', 'Machoke', 'Machamp', 'Chatot', 'Duskull',
			'Dusclops', 'Dusknoir', 'Piplup', 'Prinplup', 'Empoleon', 'Mantyke', 'Mantine', 'Basculin-White-Striped', 'Basculegion', 'Vulpix', 'Ninetales', 'Tentacool',
			'Tentacruel', 'Finneon', 'Lumineon', 'Magby', 'Magmar', 'Magmortar', 'Magnemite', 'Magneton', 'Magnezone', 'Bronzor', 'Bronzong', 'Elekid', 'Electabuzz',
			'Electivire', 'Gligar', 'Gliscor', 'Gible', 'Gabite', 'Garchomp', 'Nosepass', 'Probopass', 'Voltorb-Hisui', 'Electrode-Hisui', 'Rotom', 'Chingling',
			'Chimecho', 'Misdreavus', 'Mismagius', 'Cleffa', 'Clefairy', 'Clefable', 'Sneasel', 'Sneasler', 'Weavile', 'Snorunt', 'Glalie', 'Froslass', 'Cranidos',
			'Rampardos', 'Shieldon', 'Bastiodon', 'Swinub', 'Piloswine', 'Mamoswine', 'Bergmite', 'Avalugg-Hisui', 'Snover', 'Abomasnow', 'Zorua-Hisui', 'Zoroark-Hisui',
			'Rufflet', 'Braviary-Hisui', 'Riolu', 'Lucario', 'Uxie', 'Mesprit', 'Azelf', 'Heatran', 'Regigigas', 'Cresselia', 'Tornadus', 'Thundurus', 'Landorus',
			'Enamorus',
		],
		mod: 'm4asandbox',
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
		ruleset: ['Team Preview', 'Cancel Mod', 'HP Percentage Mod', 'OHKO Clause', 'Evasion Moves Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Freeze Clause Mod', 'Data Mod', 'Mega Data Mod', 'Sandbox Mod', 'Overflow Stat Mod'],
		mod: 'm4asandbox',
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
		name: "[Gen 8] PaLCeomons",
		desc: [
			"<b>PaLCeomons</b>: A Paleomons bonus format featuring the first forms of Paleomon's fully evolved metagame."
		],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/paleomons-slate-3-non-dino-stars-dimetrodon-dodo-sea-scorpion-submission-phase.3695565/">Paleomons on Smogon Forums`,
		],

		mod: 'paleomons',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Z-Move Clause', 'Data Mod', 'Mega Data Mod'],
		banlist: [
			'All Pokemon',
		],
		unbanlist: [
			'kabuto-ancient', 'omanyte-ancient', 'anorith-ancient', 'lileep-ancient', 'swinub-ancient', 'ghoulipinch', 'shieldon-overgrown', 'cranidos-cretaceous', 'archen-ancient', 'tirtouga-leatherback',
			'tyrunt-apex', 'amaura-regnant', 'shellos-entity', 'yanma-ancient', 'tangela-ancient', 'liluo', 'wonkway', 'gorlifross', 'dreepy-luminous', 'larvitar-nature', 'gible-persistent',
		],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			let allowedTiers = ['Paleomons LC'];
			for (const set of team) {
				let template = this.dex.getSpecies(set.species);
				if (template.tier !== 'Paleomons LC') {
					return [set.species + ' is not legal in the PaLCeomons format.'];
				}
			}
		},
		forcedLevel: 5,
		defaultLevel: 5,
		maxLevel: 5,
		teambuilderFormat: "PaLCeomons",
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
	{
		name: "[Gen 8] Ubermons Doubles",
		mod: 'ubermons',
		desc: [
			"<b>Ubermons</b>: A Pet Mod that aims to rebalance Ubers for OU. The goal is to make every single ban into a viable and healthy part of the metagame.",
		],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/ubermons-slate-2-spooky-scary-skeletons-dragapult-marshadow-spectrier.3683759/">Ubermons on Smogon Forums</a>`,
		],
		ruleset: ['Standard Doubles', 'Sleep Clause Mod', 'Data Mod', 'Mega Data Mod'],
		banlist: [],
		gameType: 'doubles',
		teambuilderFormat: 'DOU',
	},
	{
		name: "[Gen 8] Ubermons LC",	
		mod: 'ubermons',
		desc: [
			"<b>Ubermons</b>: A Pet Mod that aims to rebalance Ubers for OU. The goal is to make every single ban into a viable and healthy part of the metagame.",
		],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/ubermons-slate-2-spooky-scary-skeletons-dragapult-marshadow-spectrier.3683759/">Ubermons on Smogon Forums</a>`,
		],
		forcedLevel: 5,
		maxLevel: 5,
		ruleset: ['Standard NatDex', 'Evasion Moves Clause', 'Species Clause', 'Sleep Clause Mod', 'Data Mod', 'Little Cup'],
		banlist: ['Sticky Web', 'Chlorophyll', 'Sticky Web', 'Dragon Rage', 'Sonic Boom', 'Eevium Z'],
		teambuilderFormat: 'LC',
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
		name: "[Gen 8] Duomod Randbats",
		desc: `<b>Duomod</b>: Legendary YouTuber and professional Smash player DuoM2's solomod, build around the idea where nobody is ever truly losing.`,
        threads: [
            `&bullet; <a href="https://docs.google.com/spreadsheets/d/1lguyF31tjV8f-Gv3uLxmZXGAlg23k2fkF_nBqevJouM/edit?usp=sharing">Spreadsheet</a>`,
        ],
		team: 'random',
		mod: 'duomod',
		ruleset: ['Standard NatDex', 'Dynamax Clause', 'Sleep Clause Mod', 'Subscribe For More Content', 'Duomod Data Mod'],
		onSwitchIn(pokemon) {
			this.add('-start', pokemon, 'typechange', pokemon.species.types.join('/'), '[silent]');
		},
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
		name: "[Gen 1] FutureProofing Random Battle",
	   desc: `<b>[Gen 1] FutureProofing</b>: Adapting Dark, Steel, and Fairy-type moves and Pokemon to the Gen 1 OU metagame.`,
	   threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/gen-1-futureproofing-slate-1-discussion.3703375/">FutureProofing on Smogon Forums</a>`,
	   ],
		mod: 'gen1futureproofing',
		team: 'random',
		ruleset: ['Standard', 'Data Mod'],
	},
	{
		name: "[Gen 8] JolteMons Random Battle",
		desc: [
			"<b>JolteMons</b>: A sequel to SylveMons where Pokemon, items, abilities and moves are redesigned for OU (and new items, abilities and moves are added) without changing base stats.",
		],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/joltemons-slate-1-distribution-phase.3694234/">Thread on the Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/149ZlQY0bJIAqfWB_233Dvbpqs3pVSHYpIoAQQkwquls/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: 'joltemons',	
		team: 'random',
		ruleset: ['Dynamax Clause', 'Obtainable', 'Species Clause', 'HP Percentage Mod', 'Cancel Mod', 'Sleep Clause Mod', 'Mega Data Mod', 'Data Mod', 'Z-Move Clause'],
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
      name: "[Gen 8] OU Theorymons Random Battle",
      threads: [ 
          `&bullet; <a href="https://www.smogon.com/forums/threads/ss-ou-theorymon.3695574/">OU Theorymons on Smogon Forums</a>`,
          `&bullet; <a href="https://docs.google.com/spreadsheets/d/1AgqKo8IiXky8apuu0FUgx4MJRVtsVwtuhg_Wj_ACgao/edit#gid=0">Spreadsheet</a>`,
      ],
      team: 'random',
		mod: 'outheorymons', 
		ruleset: ['Dynamax Clause', 'Data Mod', 'Species Clause'],
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
	{
		name: "[Gen 8] Ubermons Random Battle",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/ubermons-slate-2-spooky-scary-skeletons-dragapult-marshadow-spectrier.3683759/">Ubermons on Smogon Forums</a>`,
		], 
		mod: 'ubermons',
		team: 'random',
		ruleset: ['[Gen 8] Ubermons', '!Team Preview', '!Dynamax Clause'],
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
		banlist: [
			'Alakazam', 'Excadrill-Base', 'Exploud', 'Lycanroc-Dusk', 'Naganadel-Base', 'Reuniclus-Base', 'Scizor', 'Scolipede-Base', 'Starmie-Base', 'Polteageist-Base',
			'Polteageist-Antique', 'Baton Pass'
		],
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
		banlist: ['Scizor'],
		ruleset: ['Standard GBU', '+Unobtainable', '+Past', 'VGC Timer', 'Dynamax Clause', 'Z-Move Clause', 'Data Mod', 'Mega Data Mod'],
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
			// Items other than Z-Crystals and Pokémon-specific items should be illegal
			if (!set.item) return;
			const item = this.dex.getItem(set.item);
			if (item.megaStone) return [`${set.name || set.species} is not currently allowed to Mega Evolve.`];
			if (!item.isNonstandard) return;
			if (['Past', 'Unobtainable'].includes(item.isNonstandard) && !item.zMove && !item.itemUser && !item.forcedForme) {
				if (this.ruleTable.has(`+item:${item.id}`)) return;
				return [`${set.name}'s item ${item.name} does not exist in Gen ${this.dex.gen}.`];
			}
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
	{
		name: "[Gen 8] SV Speculative",
		desc: [
			"Currently just a custom game format with Terastal implemented instead of Mega Evolution; will make a more specific speculative format for SV when we have a bit more to work with!",
		],

		searchShow: false,
		
		ruleset: ['Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Dynamax Clause', 'Sleep Clause Mod'],
		onValidateSet(set) {
			const item = this.dex.getItem(set.item);
			if (item.megaStone) return [`${set.name || set.species} is not allowed to Mega Evolve. (We have Terastal instead!)`];
			if (item.zMove) return [`${set.name || set.species} is not allowed to hold a Z-Crystal. (We have Terastal instead!)`];
		},
		validateSet(set, teamHas) {
			const species = this.dex.getSpecies(set.species);
			const ability = this.dex.getAbility(set.ability);
			if (!set.hpType === 'Fairy' && !set.hpType === 'Normal') {
				return this.validateSet(set, teamHas);
			} else {
				const terastal = set.hpType;
				set.hpType = 'Fire';
				const fakeValidation = this.validateSet(set, teamHas);
				if (fakeValidation?.length) return fakeValidation;
				set.hpType = terastal;
				return null;
			}
		},
		mod: 'svspeculative',
	},
	{
		name: "[Gen 8] Spookymons 2022",
		desc: [
			"Testing currently",
		],
		mod: "spookyhalloweenfuntimes",
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Item Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Z-Move Clause', 'Data Mod', 'Mega Data Mod'],
		searchShow: false,
	},
	{
		name: "[Gen 8] Spookymons 2022 VGC",
		desc: [
			"Testing currently",
		],
		mod: "spookyhalloweenfuntimes",
		ruleset: ['Standard GBU', '+Unobtainable', '+Past', 'VGC Timer', 'Dynamax Clause', 'Z-Move Clause', 'Data Mod', 'Mega Data Mod'],
		searchShow: false,
		gameType: 'doubles',
		forcedLevel: 50,
		teamLength: {
			validate: [4, 6],
			battle: 4,
		},
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
		name: "[Gen 8] A Golden Experience",
		mod: "agoldenexperience", 
		desc: 'Another Pet Mod, NatDex based, where we try to make every single Pokemon viable, or at least usable, and we also have Fakemons!',
		threads: [
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1YJXE8wUNJijWSfNKIUqgObN5uEVgTliewTluGe0w4Y4/edit?usp=sharing">Spreadsheet</a>`,
		],
		ruleset: ['Standard NatDex', 'Dynamax Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Sleep Clause Mod', 'Data Mod', 'Mega Data Mod'],
		banlist: [
			'Arceus', 'Blaziken-Mega', 'Blazikenite', 'Calyrex-Ice', 'Calyrex-Shadow', 'Darkrai', 'Deoxys-Attack', 'Deoxys-Speed',
		    'Dialga', 'Eternatus', 'Gengar-Mega', 'Gengarite', 'Giratina', 'Groudon', 'Ho-Oh', 'Kyogre',
			'Kyurem-Black', 'Kyurem-White', 'Lucario-Mega', 'Lucarionite', 'Lugia', 'Lunala', 'Marshadow', 'Mewtwo', 'Necrozma-Dawn-Wings', 
			'Necrozma-Dusk-Mane', 'Palkia', 'Parafgufa', 'Rayquaza', 'Reshiram', 'Salamence-Mega', 'Salamencite', 'Solgaleo', 'Xerneas', 'Yveltal', 
			'Zacian', 'Zamazenta', 'Zekrom', 'Zygarde-Base', 'Moody', 'Power Construct', 'Heavy-Duty Boots', 'Bright Powder', 'Lax Incense', 'Quick Claw', 'Razor Fang', 'King\'s Rock',
			'Normalium Z', 'Fairium Z', 'Fightinium Z', 'Firium Z', 'Flyinium Z', 'Darkinium Z', 'Dragonium Z', 'Buginium Z', 'Waterium Z', 'Electrium Z', 'Ghostium Z', 'Grassium Z', 'Groundium Z', 'Icium Z', 'Poisonium Z', 'Psychium Z', 'Rockium Z', 'Steelium Z', 'Pikanium Z', 'Pikashunium Z', 'Aloraichium Z', 'Eevium Z', 'Snorlium Z', 'Mewnium Z', 'Decidium Z', 'Incinium Z', 'Primarium Z', 'Lycanium Z', 'Mimikium Z', 'Kommonium Z', 'Tapunium Z', 'Solganium Z', 'Lunalium Z', 'Ultranecrozium Z', 'Marshadium Z', 
		],
		teambuilderFormat: 'National Dex',
	},

	{
		name: "[Gen 8] A Golden Experience Uber",
		mod: "agoldenexperience", 
		desc: 'Another Pet Mod, NatDex based, where we try to make every single Pokemon viable, or at least usable, and we also have Fakemons !',
		threads: [
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1YJXE8wUNJijWSfNKIUqgObN5uEVgTliewTluGe0w4Y4/edit?usp=sharing">Spreadsheet</a>`,
		],
		ruleset: ['Standard NatDex', 'Dynamax Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Sleep Clause Mod', 'Data Mod', 'Mega Data Mod'],
		banlist: [
			'Moody', 'Bright Powder', 'Lax Incense', 'Quick Claw', 'Razor Fang', 'King\'s Rock',
			'Normalium Z', 'Fairium Z', 'Fightinium Z', 'Firium Z', 'Flyinium Z', 'Darkinium Z', 'Dragonium Z', 'Buginium Z', 'Waterium Z', 'Electrium Z', 'Ghostium Z', 'Grassium Z', 'Groundium Z', 'Icium Z', 'Poisonium Z', 'Psychium Z', 'Rockium Z', 'Steelium Z', 'Pikanium Z', 'Pikashunium Z', 'Aloraichium Z', 'Eevium Z', 'Snorlium Z', 'Mewnium Z', 'Decidium Z', 'Incinium Z', 'Primarium Z', 'Lycanium Z', 'Mimikium Z', 'Kommonium Z', 'Tapunium Z', 'Solganium Z', 'Lunalium Z', 'Ultranecrozium Z', 'Marshadium Z', 
		],
		teambuilderFormat: 'National Dex',
	},


	{    
		name: "[Gen 8] AsOnemons",
		desc: 'AsOnemons is a Generation 8 based Solomod that revolves around creating new As One forms for official Pokémon.',
		threads: [
				`&bullet; <a href="https://docs.google.com/spreadsheets/d/1TRYfbFkLYSnFrOidd42FvQVlOjgYBzuSoK4tCFZPNOU/edit?usp=sharing">Spreadsheet</a>`,
		],
		
		mod: 'asonemons',
		ruleset: ['Standard', 'Dynamax Clause', 'Data Mod', 'AsOnemons Mod'],
		banlist: ['All Pokemon', 'Baton Pass'],
		unbanlist: ['Yanmega-Shell', 'Pelipper-Ink', 'Excadrill-Boulder', 'Vanilluxe-Fur', 'Butterfree-Angler', 'Dedenne-Luchador', 'Shuckle-Brick', 'Munchlax-Forest', 'Bunnelby-Worker', 'Sirfetch\u2019d-Fantasy', 'Frogadier-Beetle', 'Chandelure-Balloon', 'Infernape-Climber', 'Ribombee-Charmer', 'Beheeyem-UFO', 'Sableye-Doom', 'Mareanie-Magma', 'Thwackey-Dune', 'Spheal-Siren', 'Pincurchin-Goo', 'Nihilego-Psychosis', 'Stunfisk-Jagged', 'Pawniard-Aviation', 'Watchog-Scout', 'Mothim-Gourd', 'Clefairy-Selene', 'Hoothoot-Perch', 'Swoobat-Aroma', 'Blacephalon-Borealis', 'Malamar-Parallel'],
	},
	{
		name: "[Gen 8] Baby Boom",
		desc: '<b>Baby Boom</b>: A Solomod where only Baby Pokemon are allowed and are balanced around each other.',
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3660004/post-9069509">Post in Solomods Megathread</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1QrZKlNrqKiRcprYtvyIPveR0vMp0dpM1X60zeo6N5xU/edit#gid=999775779">Spreadsheet</a>`,
		],
		mod: 'babyboom',
		ruleset: ['Standard', 'Dynamax Clause', 'Data Mod'],
		banlist: ['All Pokemon', 'Baton Pass'],
		unbanlist: ['Pichu', 'Cleffa', 'Igglybuff', 'Togepi', 'Tyrogue', 'Smoochum', 'Elekid', 'Magby', 'Azurill', 'Wynaut', 'Budew', 
					'Chingling', 'Bonsly', 'Mime Jr.', 'Happiny', 'Munchlax', 'Mantyke', 'Riolu', 'Toxel', 'Armorick', 'Crawscor', 'Dreddon',
					'Sneaz', 'Durone', 'Drifble', 'Tangel',
		],
	},
	{
		name: "[Gen 8] Blindstrictions",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3660004/post-9056974">Post in Solomods Megathread</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1hn_35rXKq6cNk1k4mg4g3IkgG4xTnX7JQT3wsvHRd4U/edit#gid=0">Spreadsheet</a>`,
		],
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Z-Move Clause', 'Data Mod'],
		banlist: ['Baton Pass'],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			for (const set of team) {
				let template = this.dex.getSpecies(set.species);
				if ( template.tier !== 'Blindstrictions') {
					return [set.species + ' is not usable in Blindstrictions.'];
				}
			}
		},
		mod: 'blindstrictions',
	},
	{    
		name: "[Gen 8] Boatmod OU",
		desc: "Regic Boat's solomod.",
		threads: [
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/e/2PACX-1vQoBw-L2HININ-a3khG8iCqIqspSN4IRbifAZsoaGW1BMPlTE95JMxBeCWRPKHWygIdv336kyI4JVhN/pubhtml#">Spreadsheet</a>`,
		],
		mod: "boatmod",
		teambuilderFormat: 'boatmod',
		ruleset: ['Standard NatDex', 'Dynamax Clause', 'Sleep Clause Mod', 'Evasion Moves Clause', 'Species Clause', 'Data Mod'],
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
		name: "[Gen 8] Chaos Chaos Chaos",
		desc: `Chaos Chaos Chaos`,
  		threads: [
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1MsqO579H1XzNJawNxL064ANjtPwyS4823882JTImnoU/edit?usp=sharing">Spreadsheet</a>`,
		    `&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3660004/post-9187061">Forum Post</a>`
			],
  		ruleset: ['Standard NatDex', 'Species Clause','!Species Clause', 'Dynamax Clause', 'Z-Move Clause'],
		banlist: ['Uber', 'Power Construct', 'Baton Pass'],
		mod: 'chaoschaoschaos',
		banlist: ['Baton Pass', 'Stance Change', 'Aerodactylite', 'Eviolite', 'Cameruptite', 'Gulp Missile', 'Glalitite', 'Manectite', 'Mawilite', 'Aspear Berry', 'Sinistea-Antique'],
		onSwitchIn: function (pokemon) {
            this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[silent]');
        },
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			for (const set of team) {
				let template = this.dex.getSpecies(set.species);
				if (speciesTable[template.name]) {
					return ["You are limited to one of each Pokémon by Species Clause. ", "You have more than one " + template.baseSpecies + "."];
				}
				speciesTable[template.name] = true;
				if ( template.tier !== 'CCC' ) {
					return [set.name + ' is not useable in Chaos Chaos Chaos.'];
				}
			}
		},
	},
	{
        name: "[Gen 8] Dance of the Dead",
        desc: `<b>?????</b>`,
        threads: [
            `&bullet; <a href="https://docs.google.com/spreadsheets/d/1sh7JljsjdTXlVlvUq45O2rT8x6ZM3nVv-kWkMnCgK_A/edit?usp=sharing">Spreadsheet</a>`,
        ],
        mod: 'danceofthedead',
        ruleset: ['Standard NatDex', 'Dynamax Clause', 'Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 'Swagger Clause', 'Baton Pass Clause', 'OHKO Clause', 'Item Clause', 'Data Mod'],
        banlist: ['All Pokemon', 'Normalium Z', 'Fairium Z', 'Fightinium Z', 'Firium Z', 'Flyinium Z', 'Darkinium Z', 'Dragonium Z', 'Buginium Z', 'Waterium Z', 'Electrium Z', 'Ghostium Z', 'Grassium Z', 'Groundium Z', 'Icium Z', 'Poisonium Z', 'Psychium Z', 'Rockium Z', 'Steelium Z', 'King\'s Rock',],
        unbanlist: [
 'Baloon-Popped', 'Encrave', 'Eneryth', 'Fantom', 'Flamepion', 'Grievenge', 'Hydread', 'Marspookial', 'Mortemoth', 'Pozaqes', 'Sanbatter', 'Sheegal', 'Spirox', 'Tumbleak', 'Wistape',			  
			],	
			onSwitchIn(pokemon) {
        		this.add('-start', pokemon, 'typechange', pokemon.species.types.join('/'), '[silent]');
        	},	
	}, 
	{
		name: "[Gen 8] Dex Reversal",
		desc: `<b>Dex Reversal</b>.`,
		mod: 'dexreversal',
		teambuilderFormat: "National Dex AG",
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Moves Clause', 'Z-Move Clause', 'Data Mod', 'Mega Data Mod'],
		banlist: [
				//Abilities
				'Arena Trap', 'Drizzle', 'Moody', 'Shadow Tag',
				
				//Items
				'Blastoisinite', 'Blazikenite', 'Bright Powder', 'Charizardite X', 'Eviolite', 'Gengarite', 'Kangaskhanite', 
				'King\'s Rock', 'Lax Incense', 'Light Ball', 'Medichamite', 'Pidgeotite', 'Razor Fang', 'Red Orb', 'Sablenite', 
				'Swampertite', 'Thick Club',
				
				//Moves
				'Baton Pass', 'Quiver Dance',
				
				//Pokemon
				'AG',
		],
	},
	{
        name: "[Gen 8] Duomod",
        desc: `<b>Duomod</b>: Legendary YouTuber and professional Smash player DuoM2's solomod, built around the idea where nobody is ever truly losing.`,
        threads: [
            `&bullet; <a href="https://docs.google.com/spreadsheets/d/1lguyF31tjV8f-Gv3uLxmZXGAlg23k2fkF_nBqevJouM/edit?usp=sharing">Spreadsheet</a>`,
        ],
        mod: 'duomod',
        ruleset: ['Standard NatDex', 'Dynamax Clause', 'Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 'Swagger Clause', 'Baton Pass Clause', 'OHKO Clause', 'Subscribe For More Content', 'Duomod Data Mod'],
        banlist: ['All Pokemon', 'Normalium Z', 'Fairium Z', 'Fightinium Z', 'Firium Z', 'Flyinium Z', 'Darkinium Z', 'Dragonium Z', 'Buginium Z', 'Waterium Z', 'Electrium Z', 'Ghostium Z', 'Grassium Z', 'Groundium Z', 'Icium Z', 'Poisonium Z', 'Psychium Z', 'Rockium Z', 'Steelium Z', 'King\'s Rock',],
        unbanlist: [
             'Abysseil', 'Annelait', 'Azurolt', 'Baloon', 'BaloonPopped', 'BaloonWater', 'Catelax', 'Crypterid', 'Deliriophage', 'Detonuke', 'Draglow', 'Draxplosion', 'Fluidrake', 'Fluxtape', 'FluxtapeRadio', 'FluxtapeStereo', 'Gorilax', 'Grievenge', 'Hyperoach', 'Lemotic', 'Lumineel', 'Modolith', 'Monstratus', 'Mortemoth', 'Pokat', 'Spirox', 'SpiroxAncient', 'SpiroxRipped', 'Treemu', 'Valianch', 'Spisces', 'Pterrost', 'Jewelode', 'Jellyolk', 'Crazefly', 'Fairydisc', 'Badgearth', 'Shroominesce', 'Fleetle', 'Sharmpedo', 'Steroach',
			  
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
		mod: 'earthsky',
		ruleset: [ 'Earth & Sky',],
		banlist: [
			'Alakazam-Mega', 'Arceus', 'Blaziken-Mega', 'Blastoise-Mega', 'Darkrai', 'Deoxys-Attack', 'Deoxys-Base', 'Deoxys-Speed',
			'Dialga', 'Eternatus', 'Genesect', 'Gengar-Mega', 'Giratina', 'Groudon', 'Ho-Oh', 'Kyogre',
			'Kyurem', 'Landorus-Base', 'Lucario-Mega', 'Lugia', 'Lunala', 'Marshadow', 'Mewtwo',
			'Naganadel', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Palkia', 'Pheromosa', 'Rayquaza', 'Reshiram',
			'Salamence-Mega', 'Shaymin-Sky', 'Solgaleo', 'Xerneas', 'Yveltal', 'Zacian', 'Zamazenta', 'Zekrom',
			/*'ES Uber', */'Oceides', 'Hatar', 'Zuros', 'Norphaval', 'Arena Trap', 'Power Construct', 'Shadow Tag', 'Baton Pass',
		],
		teambuilderFormat: 'National Dex',
	},
	{
		name: "[Gen 8] Earth & Sky Egelas Dex",
		threads: [
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1CL_DALzaisaMwr2709KMleWU6ntxBPnzfHukN0SR5Ss">Competitive Cheat Sheet</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/u/1/d/1N_kSuPC2XifKplZ9huLVlxmkYv3fCmt2">Egelan Pokedex</a>`,
		],
		mod: 'earthsky',
		ruleset: [ '[Gen 8] Earth & Sky OU', 'Egelas Pokedex',],
		teambuilderFormat: 'National Dex',
	},
	{
		name: "[Gen 8] Earth & Sky Ubers",
		threads: [
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1CL_DALzaisaMwr2709KMleWU6ntxBPnzfHukN0SR5Ss">Competitive Cheat Sheet</a>`,
		],
		mod: 'earthsky',
		ruleset: [ 'Earth & Sky',],
		banlist: [],
		teambuilderFormat: 'National Dex Ubers',
	},
	{
		name: "[Gen 8] Ema Mod",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3660004/post-9065303">Post in Solomods Megathread</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/e/2PACX-1vQZ39z8ud7QYaf1R5TIz9Ad967U4bmhABy-CGYNK-LpXjjKw_RHVAFi-5etInNdaCR9Gudv2JWpPPL2/pubhtml">Spreadsheet</a>`,
		],
		mod: 'emamod',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod'],
		unbanlist: ['Deoxys-Defense', 'Landorus-Therian', 'Zygarde-10%'],
		banlist: [
			'Alakazam-Mega', 'Arceus', 'Arceus-Bug', 'Arceus-Dark', 'Arceus-Dragon', 'Arceus-Electric', 'Arceus-Fairy', 'Arceus-Fighting', 
			'Arceus-Fire', 'Arceus-Flying', 'Arceus-Ghost', 'Arceus-Grass', 'Arceus-Ground', 'Arceus-Ice', 'Arceus-Poison', 'Arceus-Psychic', 
			'Arceus-Rock', 'Arceus-Steel', 'Arceus-Water', 'Blastoise-Mega', 'Blaziken-Mega', 'Calyrex-Ice', 'Calyrex-Shadow', 'Cinderace', 
			'Darkrai', 'Darmanitan-Galar', 'Deoxys', 'Deoxys-Attack', 'Deoxys-Speed', 'Dialga', 'Dialga-Origin', 'Dracovish', 'Dragapult', 
			'Eternatus', 'Genesect', 'Genesect-Burn', 'Genesect-Chill', 'Genesect-Douse', 'Genesect-Shock', 'Gengar-Mega', 'Giratina', 
			'Giratina-Origin', 'Groudon', 'Groudon-Primal', 'Ho-Oh', 'Kangaskhan-Mega', 'Kyogre', 'Kyogre-Primal', 'Kyurem-Black','Kyurem-White', 
			'Landorus', 'Lucario-Mega', 'Lugia', 'Lunala', 'Magearna', 'Magearna-Original', 'Marshadow', 'Metagross-Mega', 'Mewtwo', 'Mewtwo-Mega-X', 
			'Mewtwo-Mega-Y', 'Naganadel', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Necrozma-Ultra', 'Palkia', 'Palkia-Origin', 'Pheromosa', 
			'Rayquaza', 'Rayquaza-Mega', 'Reshiram','Salamence-Mega', 'Shaymin-Sky', 'Solgaleo', 'Spectrier', 'Tornadus-Therian', 'Urshifu-Base', 
			'Xerneas', 'Yveltal', 'Zacian','Zacian-Crowned', 'Zamazenta', 'Zamazenta-Crowned', 'Zekrom', 'Zygarde', 'Zygarde-Complete', 'Arena Trap', 
			'Moody','Power Construct', 'Sand Veil', 'Shadow Tag', 'Snow Cloak', 'Bright Powder', 'King\'s Rock', 'Lax Incense', 'Razor Fang',
			'Quick Claw', 'Baton Pass',
		],
	},
	{
		name: "[Gen 8] FE Imposter's Cut",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3660004/post-8988462">Solomod Post</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1VlWGUuOnTRpWnZT4_rUttVhIlSw3LeogaFv6clwbnNs/edit#gid=0">Spreadsheet</a>`,
		],
		mod: "feimposter",
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Z-Move Clause', 'Data Mod', 'Mega Data Mod'],
		banlist: [
			'All Pokemon', 'Baton Pass',
		],
		unbanlist: [
			'Butterchomp', 'Bascugly', 'Tapu Sawk', 'Wormaiclus', 'Nidoreena', 'Persaconda', 'Swalagross', 'Ramaparaptor', 'Dragasire', 'Slasle', 'Dubdos', 
			'Toxtriceebel', 'Gliscremie', 'Spirisopod', 'Tornabeat', 'Weezking', 'Typhlobat', 'Chimerem', 'Duskcino', 'Kecletana', 'Xataskewda', 'Hoopiinotic', 
			'Ariarados', 'Mimidactyl', 'Stantilego', 'Trevecuno', 'Calyrex-Amp-Rider', 'Leavo-o', 'Corsizor', 'Wigglytres',
		],
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
		name: "[Gen 8] GPT3mons",
	   desc: '<b>GPT3mons</b>: A solomod featuring pokemon generated using a GPT3 neural network.',
		threads: [
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1tJ99u-GxfyCq5-fGMaygDUN8FUzQadk0aK5Y9Gstf9k/edit#gid=0
			">Spreadsheet</a>`,
		],
		mod: "gpt3mons",
		teambuilderFormat: "G3",
		ruleset: ['Standard NatDex', 'Dynamax Clause', 'Sleep Clause Mod', 'Evasion Moves Clause', 'Species Clause', 'OHKO Clause', 'Data Mod'],
		banlist: ['All Pokemon', 'Baton Pass'],
		unbanlist: ['Abrakin', 'Bunbunt', 'Crawk', 'Dopplebop', 'Echovine', 'Fiendal', 'Grimalkin', 'Hoarfrost', 'Isickle', 'Jiagu', 'Kitsune', 'Leaford', 'Miasmax', 'Nyaon', 'Obscurio', 'Piplant', 'Quirog', 'Rolyboly', 'Saevus', 'Toxidile', 'Ursaforce', 'Vectol', 'Wyverna', 'Xaetron', 'Yeetle', 'Zaprong'],	
	},
	{
		name: "[Gen 2] GSC Doubles",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3660004/post-9132049">Post in Solomods Megathread</a>`,
		],

		mod: 'gen2doubles',
		gameType: 'doubles',
		ruleset: ['Standard Doubles', 'Swagger Clause'],
		banlist: ['Uber'],
	},
    {
		name: "[Gen 3] Hoennification",
        mod: 'gen3hoennification',
		ruleset: ['Standard', 'One Boost Passer Clause', 'Freeze Clause Mod', 'Data Mod'],
		banlist: ['Uber', 'Soundproof', 'Assist', 'Baton Pass + Block', 'Baton Pass + Mean Look', 'Baton Pass + Spider Web', 'Smeargle + Ingrain'],
	},
	{    
       name: "[Gen 8] i forgor OU",
       desc: 'i forgor :skull: (the anaconja solomod)',
       mod: "iforgor",
       teambuilderFormat: 'OU',
       ruleset: ['Standard NatDex', 'Dynamax Clause', 'Sleep Clause Mod', 'Evasion Moves Clause', 'Species Clause', 'OHKO Clause', 'Data Mod', 'Mega Data Mod'],
       banlist: ['All Pokemon', 'dragongroundite', 'firepsychic', 'electricnormal', 'iceghost', 'firedark'],
		 unbanlist: ['grasselectric', 'firerock', 'waterghost', 'darkpoison', 'normalpsychic', 'fightingflying', 'bugice', 'bugicemega', 'bugpsychic', 'bugpsychicmega', 'grassfairy', 'grassfire', 'normalpoison', 'normalpoisonmega', 'groundfairy', 'groundfairymega', 'bugelectric', 'darkflying', 'fightingice', 'fightingsteel', 'dragon', 'steelflying', 'electricpoison', 'electricpoisonmega', 'ground', 'rockghost', 'fairyflying', 'electricsteel', 'rockgrass', 'fairydragon', 'icepoison', 'icerock', 'normal', 'normalmega', 'normalfairy', 'normalfairymega', 'bugfighting', 'ghostdragon', 'waterground', 'watergroundmega', 'watersteel', 'fireground', 'firenormal', 'grassnormal', 'electric', 'dragonpoison', 'darkfairy', 'darkfairymega', 'poisonpsychic', 'poisonpsychicmega', 'darkrock', 'darkrockmega', 'poisonground', 'poisongroundmega', 'rockpsychic', 'rockfighting', 'water', 'waterelectric', 'dragonsteel', 'psychicfighting', 'bugsteel', 'psychicdragon', 'normalghost', 'darksteel', 'ghostground', 'ghostgroundmega', 'electricflying', 'grasspoison', 'dragonfighting', 'waterice', 'watericemega', 'ghostflying', 'bugdark', 'iceground', 'bugwater', 'bugfire', 'grassice', 'dragonground', 'psychicfairy', 'grassflying', 'firepsychic', 'darkghost', 'waterflying', 'steel', 'rock', 'iceghost', 'electricnormal', 'firedark', 'firefairy', 'fighting', 'steelfairy', 'waterpoison', 'waterpoisonmega', 'firepoison', 'bug', 'buggrass', 'waterfairy', 'firesteel', 'firesteelmega', 'iceelectric', 'groundflying', 'groundflyingmega', 'rockflying', 'rockground', 'grassfighting', 'electricdark', 'normaldark', 'ghostfighting', 'dragonice', 'dragonnormal', 'ghostpsychic', 'psychic'],	
	},
	{    
       name: "[Gen 8] i forgor Ubers",
       desc: 'i forgor :skull: (the anaconja solomod)',
       mod: "iforgor",
       teambuilderFormat: 'Uber',
       ruleset: ['Standard NatDex', 'Dynamax Clause', 'Sleep Clause Mod', 'Evasion Moves Clause', 'Species Clause', 'OHKO Clause', 'Data Mod', 'Mega Data Mod'],
       banlist: ['All Pokemon'],
		   unbanlist: ['grasselectric', 'firerock', 'waterghost', 'darkpoison', 'normalpsychic', 'fightingflying', 'bugice', 'bugicemega', 'bugpsychic', 'bugpsychicmega', 'grassfairy', 'grassfire', 'normalpoison', 'normalpoisonmega', 'groundfairy', 'groundfairymega', 'bugelectric', 'darkflying', 'fightingice', 'fightingsteel', 'dragon', 'steelflying', 'electricpoison', 'electricpoisonmega', 'ground', 'rockghost', 'fairyflying', 'electricsteel', 'rockgrass', 'fairydragon', 'icepoison', 'icerock', 'normal', 'normalmega', 'normalfairy', 'normalfairymega', 'bugfighting', 'ghostdragon', 'waterground', 'watergroundmega', 'watersteel', 'fireground', 'firenormal', 'grassnormal', 'electric', 'dragonpoison', 'darkfairy', 'darkfairymega', 'poisonpsychic', 'poisonpsychicmega', 'darkrock', 'darkrockmega', 'poisonground', 'poisongroundmega', 'rockpsychic', 'rockfighting', 'water', 'waterelectric', 'dragonsteel', 'psychicfighting', 'bugsteel', 'psychicdragon', 'normalghost', 'darksteel', 'ghostground', 'ghostgroundmega', 'electricflying', 'grasspoison', 'dragonfighting', 'waterice', 'watericemega', 'ghostflying', 'bugdark', 'iceground', 'bugwater', 'bugfire', 'grassice', 'dragonground', 'psychicfairy', 'grassflying', 'firepsychic', 'darkghost', 'waterflying', 'steel', 'rock', 'iceghost', 'electricnormal', 'firedark', 'firefairy', 'fighting', 'steelfairy', 'waterpoison', 'waterpoisonmega', 'firepoison', 'bug', 'buggrass', 'waterfairy', 'firesteel', 'firesteelmega', 'iceelectric', 'groundflying', 'groundflyingmega', 'rockflying', 'rockground', 'grassfighting', 'electricdark', 'normaldark', 'ghostfighting', 'dragonice', 'dragonnormal', 'ghostpsychic', 'psychic', 'dragongroundmega'], 
  },
	{
		name: "[Gen 3] Inverse Split",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3660004/post-9230529">Solomod Post</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1dzHPJfiqSyvTeZkeBmJOI7OfUIEb6SVDjb7P3vrX9L4/edit">Spreadsheet</a>`,
		],
		mod: 'gen3inversesplit',
		ruleset: ['Standard', '3 Baton Pass Clause'],
		banlist: ['Uber', 'Smeargle + Baton Pass', 'Overheat', 'Psycho Boost'],
	},
	/*
	{    
       name: "[Gen 8] JosMons",
       desc: 'A meta created by JosJet focused on making balance changes to the NatDex OU meta. Ex. Bug-type Buff.',
       mod: "josmons",
       teambuilderFormat: 'OU',
       ruleset: ['Standard NatDex', 'Dynamax Clause', 'Sleep Clause Mod', 'Evasion Moves Clause', 'Species Clause'],
       banlist: ['Uber', 'Arena Trap', 'Moody', 'Shadow Tag', 'Baton Pass', 'Cinderace', 'Magearna', 'Darmanitan-Galar', 'Dracovish', 'Dragapult', 'Metagross-Mega', 'Tornadus-Therian', 'Urshifu'],
   },
	*/
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
		name: "[Gen 8] Kaen's Dex",
		mod: "kaensdex",
		ruleset: ['Standard NatDex', 'Dynamax Clause', 'Evasion Moves Clause', 'Species Clause', 'Z-Move Clause', 'Data Mod'],
		banlist: ['All Pokemon'],
		unbanlist: ['Luvdisc', 'Hypno','Arbok','Shuckle','Woodite','Manteaf','Fasmiwood','Smice','Ratevil','Burstrat','Doplash','Makid','Merdolph','Princeguin',
						'Kinguin','Ekidna','Porcusquill','Mop','Mopper','Puppessum','Grimssum','Spiball','Scopiball','Navird','Peckbeard','Bask','Peayes','Weaworm',
						'Lilfly','Koafly','Puptwin','Duog','Bureep','Parllama','Debi','Deecrust','Pickynest','Vulcdor','Buroach','Bugler','Roamai','Rack','Mountse',
						'Lacorn','Antney','Hairpu','Sockorm','Kibaion','Kibasol','Gnodog','Dressog','Tigle','Biitora','Psyguana','Forguana','Timk','Dynabite','Positt',
						'Frogassin','Jaklove','Wospark','Ravesp','Cabbitt','Haresprout','Seerd','Evialden','Ostranch','Pasuragu','Grussgu','Orvenom','Nerdium','Smartish',
						'Higarden','Unimount','Birnal','Yeagle','Flysh','Seaplane','Airpier','Likaba','Sucabra','Mousse','Donter','Melops','Harvetops','Pentamelop',
						'Scarferret','Lovefume','Smolle','Molvel','Toxtaur','Venotauro','Helmdillo','Rescurer','Crimske','Snagant','Zhulong','Yufo','Spavader','Grichick',
						'Grileo','Sbusho','Pangearth','Ankylonite','Champkylo','Slomoss','Milomoss','Rampeck','Terroccer','Tifrost','Smilofrost','Vizcachu','Paramer',
						'Toolsaur','Neuro','Brancell','Freezegon','Snoak','Coldrake','Capowt','Capoedar','Warcon','Istrebitel','Voltcro','Wirechomp','Thungator',
						'Scalpick','Roostlax','Eagatrice','Theri','Theriscyno','Ghoca','Moclaw','Jawlusk','Tumbna','Plesioskul','Laveel','Thermaque','Thermandril',
						'Tamantula','Spideth','Abomigo','Chillma','Wintber','Evergrowl','Stontler','Balatone','Coayena','Pherosmoke','Octovase','Cthulhurn','Shahood',
						'Karakasa','Grag','Kimokus','Toknight','Cowpy','Cowork','Barbecow','Hoorel','Baishark','Luviu','Shucklony','Dreamer','Nohtyp']
	},
	{
		name: "[Gen 8] Kantodex",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3660004/post-9213138">Post in Solomods Megathread</a>`,
		],
		mod: 'kantodex',
		ruleset: ['Standard', 'Dynamax Clause'],
		banlist: ['Uber', 'Arena Trap', 'Baton Pass', 'Sand Veil', 'Snow Cloak'],
	},
    {
		name: "[Gen 1] Kantoification",
		mod: 'gen1kantoification',
		ruleset: ['Standard'],
		banlist: ['Uber'],
	},
	{
		name: "[Gen 1] Modern Gen 1",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3660004/post-9250110">Post in Solomods Megathread</a>`,
		],
		mod: 'gen1moderngen1',
		ruleset: ['Standard Natdex', '!Obtainable', 'Sleep Moves Clause', 'Evasion Moves Clause', 'OHKO Clause', 'Species Clause', '!Team Preview'],
		banlist: ['All Abilities', 'Bind', 'Clamp', 'Fire Spin', 'Infestation', 'Magma Storm', 'Sand Tomb', 'Snap Trap', 'Thunder Cage', 'Whirlpool', 'Wrap', 'Spikes', 'Toxic Spikes', 'Stealth Rock', 'Sticky Web', 'Fake Out', 'Wonder Room', 'Trick Room', 'Magic Room', 'Lucky Chant', 'Tailwind', 'Safeguard', 'Gravity', 'Mew', 'Inteleon', 'Regigigas', 'Regieleki', 'Slaking', 'Kyurem', 'Omastar', 'Cloyster', 'Gorebyss', 'Arceus', 'Calyrex-Ice', 'Calyrex-Shadow', 'Darkrai', 'Deoxys', 'Deoxys-Attack', 'Deoxys-Speed', 'Dialga', 'Eternatus', 'Genesect', 'Giratina', 'Groudon', 'Ho-oh', 'Kyogre', 'Kyurem-White', 'Kyurem-Black', 'Lugia', 'Lunala', 'Marshadow', 'Mewtwo', 'Naganadel', 'Necrozma-Dusk-Mane', 'Necrozma-Dawn-Wings', 'Palkia', 'Pheromosa', 'Rayquaza', 'Reshiram', 'Solgaleo', 'Xerneas', 'Zacian', 'Zamazenta', 'Zekrom', 'Dragapult', 'Zygarde'],
		unbanlist: ['No Ability'],
	},
	{
		name: "[Gen 1] Kanto Expansion Pak OU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3660004/post-9233581">Post in Solomods Megathread</a>`,
      	`&bullet; <a href="https://docs.google.com/spreadsheets/d/1TpTH9ksUWOOJJQK69RIcvnot_mH_JvfGfM4zra6V3Ec/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: 'gen1expansionpack',
		ruleset: ['Standard', 'Data Mod', 'Welcome Message'],
		banlist: ['Uber'],
	},
		{
		name: "[Gen 1] Kanto Expansion Pak Ubers",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3660004/post-9233581">Post in Solomods Megathread</a>`,
      	`&bullet; <a href="https://docs.google.com/spreadsheets/d/1TpTH9ksUWOOJJQK69RIcvnot_mH_JvfGfM4zra6V3Ec/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: 'gen1expansionpack',
		ruleset: ['Standard', 'Data Mod', 'Welcome Message'],
	},
	{
      name: "[Gen 8] Mememons",
      desc: `<b>Mememons</b>: solomod`,
      mod: 'mememons',
      ruleset: ['Standard NatDex', 'Dynamax Clause', 'Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 'Swagger Clause', 'Baton Pass Clause', 'OHKO Clause', 'Realmon Clause'],
      banlist: ['Normalium Z', 'Fairium Z', 'Fightinium Z', 'Firium Z', 'Flyinium Z', 'Darkinium Z', 'Dragonium Z', 'Buginium Z', 'Waterium Z', 'Electrium Z', 'Ghostium Z', 'Grassium Z', 'Groundium Z', 'Icium Z', 'Poisonium Z', 'Psychium Z', 'Rockium Z', 'Steelium Z',],
		onSwitchIn(pokemon) {
      	this.add('-start', pokemon, 'typechange', pokemon.species.types.join('/'), '[silent]');
      },	
	},
	{
		name: "[Gen 8] National Dex VGC",
		mod: 'gen8',
		gameType: 'doubles',
		ruleset: ['Standard NatDex', 'Species Clause', 'Item Clause', '!! Adjust Level = 50', 'VGC Timer', 'Picked Team Size = 4', 'Limit Two Restricted'],
		banlist: ['Mythical'],
		restricted: ['Restricted Legendary'],
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
		banlist: ['Uber', 'Arena Trap', 'Power Construct', 'Shadow Tag', 'Baton Pass', 'Alakazite', 'Arceus', 'Darkrai', 'Gorilla Tactics', 'Deoxys-Attack', 'Deoxys-Speed', 'Dialga', 'Genesect', 'Greninja-Ash', 'Giratina', 'Giratina-Origin', 'Groudon', 'Ho-Oh', 'Kyogre', 'Kyurem-Black', 'Kyurem-White', 'Landorus-Base', 'Lucarionite', 'Lugia', 'Lunala', 'Metagrossite', 'Mewtwo', 'Mewtwo-Mega-X', 'Mewtwo-Mega-Y', 'Naganadel', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Palkia', 'Pheromosa', 'Rayquaza', 'Reshiram', 'Salamencite', 'Solgaleo', 'Tornadus-Therian', 'Xerneas', 'Yveltal', 'Zacian', 'Zamazenta', 'Zekrom', 'Zygarde', 'Berserk Gene', 'Kommonium Z', 'Eevee-Starter', 'Pikachu-Starter', 'Moody',
					'Normalium Z', 'Fairium Z', 'Fightinium Z', 'Firium Z', 'Flyinium Z', 'Darkinium Z', 'Dragonium Z', 'Buginium Z', 'Waterium Z', 'Electrium Z', 'Ghostium Z', 'Grassium Z', 'Groundium Z', 'Icium Z', 'Poisonium Z', 'Psychium Z', 'Rockium Z', 'Steelium Z'],
	},
	
	{
		name: "[Gen 8] Patratdex",
		desc: `<b>Patratdex</b>: Galvantic's Solomod, containing a new regional dex with a bunch of new stuff, notably 151 Fakemon.`,
		mod: 'patratdex',
		ruleset: ['Standard NatDex', 'Dynamax Clause', 'Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 'Swagger Clause', 'Baton Pass Clause', 'OHKO Clause', 'Realmon Clause'],
		banlist: ['Normalium Z', 'Fairium Z', 'Fightinium Z', 'Firium Z', 'Flyinium Z', 'Darkinium Z', 'Dragonium Z', 'Buginium Z', 'Waterium Z', 'Electrium Z', 'Ghostium Z', 'Grassium Z', 'Groundium Z', 'Icium Z', 'Poisonium Z', 'Psychium Z', 'Rockium Z', 'Steelium Z',],
		onSwitchIn(pokemon) {
      	this.add('-start', pokemon, 'typechange', pokemon.species.types.join('/'), '[silent]');
		},	
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
		name: "[Gen 8] Pupumons Natdex",
		threads: [
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1pBJ8SD-BwSduBQL59pLwEAImxMMK1eabrebSmko1OCI/edit?usp=sharing">Spreadsheet</a>`,
		],

		mod: 'pupumons',
		teambuilderFormat: 'National Dex',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Data Mod'],
		banlist: [
			'Alakazam-Mega', 'Arceus', 'Blastoise-Mega', 'Blaziken', 'Darkrai', 'Deoxys-Attack', 'Deoxys-Base', 'Deoxys-Speed',
			'Dialga', 'Eternatus', 'Genesect', 'Gengar-Mega', 'Giratina', 'Groudon', 'Ho-Oh', 'Kangaskhan-Mega', 'Kyogre',
			'Kyurem-Black', 'Kyurem-White', 'Landorus-Base', 'Lucario-Mega', 'Lugia', 'Lunala', 'Marshadow', 'Mewtwo',
			'Naganadel', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Palkia', 'Pheromosa', 'Rayquaza', 'Reshiram',
			'Salamence-Mega', 'Shaymin-Sky', 'Solgaleo', 'Xerneas', 'Yveltal', 'Zacian', 'Zamazenta', 'Zekrom', 'Zygarde-Base',
			'Arena Trap', 'Moody', 'Power Construct', 'Shadow Tag', 'Baton Pass', 'Venomab', 'Forganon', 'Isladon', 'Rangdemos',
			'Baronglaiv', 'Thundra', 'Eruptil', 'Batakala', 'Batambu'
		],
	},
	{
		name: "[Gen 8] Randomly Exist",
		desc: `<b>Randomly Exist</b>: A micrometa where randomly chosen Pokemon can only have their custom regional forms used. Stats are randomly determined.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3660004/page-7#post-9275823">Randomly Exist on Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1sl4Ds-vbd_ye4L_jJH6NC85uorT4riX3UxdwQuQEbzA/edit#gid=0">Spreadsheet</a>`,
		],
		mod: 'randomlyexist',
		ruleset: ['Standard', 'Dynamax Clause', 'Data Mod'],
		banlist: ['All Pokemon'],
		unbanlist: ['Dragalge', 'Rotom-Wash', 'Pyroar', 'Bronzong', 'Dragapult', 'Spheal', 'Octillery', 'Stakataka', 'Ralts', 'Corsola', 'Exeggcute', 'Regice', 'Vivillon', 'Zapdos', 'Giratina', 'Ninjask', 'Galvantula', 'Gyarados', 'Lunala', 'Reuniclus', 'Porygon-Z', 'Floette', 'Karrablast', 'Vanilluxe'],
	},
/*
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
*/
	{
		name: "[Gen 8] Random Pool 0",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3660004/post-8894655">Post in Solomods Megathread</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1e49Kywx7ouHlUMQAp7R88wnQ-ZF3ykrUUiMCvK0coCE/edit#gid=171151629">Spreadsheet</a>`,
		],
		mod: 'randompool0',
		ruleset: ['Standard', 'Dynamax Clause', "Data Mod", "Mega Data Mod"],
		banlist: ['Arena Trap', 'Moody', 'Shadow Tag', 'Baton Pass'],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			for (const set of team) {
				let template = this.dex.getSpecies(set.species);
				if (template.tier !== 'RP0') {
					return [set.species + ' is not useable in Random Pool 0.'];
				}
			}
		},
	},
	{
		name: "[Gen 8] Roulettemons The Solomod",
		desc: `<b>Roulettemons The Solomod</b>: literally roulettemons but a solomod + clean slate micro`,
		mod: 'roulettemonsthesolomod',
		ruleset: ['Standard NatDex', 'Dynamax Clause', 'Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 'Swagger Clause', 'Baton Pass Clause', 'OHKO Clause', 'Data Mod'],
		banlist: ['All Pokemon'],
		unbanlist: [
			'Spinmadillo', 'Coyoctric', 'Spizelle', 'Fierhog', 'Elatuff', 'Glasyte', 'Bisong', 'Megalo', 'Oysteat', 'Ponymph', 'Hypepion', 'Chickola', 'Skelehawk', 'Catetar', 'Blastquito', 'Hawkward', 'Pandaid', 'Autoad', 'Skelephin', 'Doomossum',
		],
		onSwitchIn(pokemon) {
			this.add('-start', pokemon, 'typechange', pokemon.species.types.join('/'), '[silent]');
		},
	},
	{
		name: "[Gen 8] Scootopia",
		desc: "A solomod consisting of Scoopapa's first 30 sprited fakemons!",
		threads: [
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1khgnzqe3xldhLw1LbfjyYDcsltZrgyo8by4Y8EDE4vQ/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: "scootopia",
		ruleset: ['Standard NatDex', 'Dynamax Clause', 'Evasion Moves Clause', 'Species Clause', 'Z-Move Clause', 'Data Mod'],
		banlist: ['All Pokemon'],
		unbanlist: ['Orchile', 'Dolphena', 'Scalaron', 'Rantler', 'Cobracotta', 'Albatrygon', 'Electangle', 'Torgeist', 'Platypad', 'Soleron', 'Nunopod', 'Zeploom', 'Brawnkey', 'Salamalix', 'Cinnastar', "Muab'Boa", 'Volvolpa', 'Harzodia', 'Cyllindrake', 'Kodokai', 'Jaegorm', 'Jaegorm-Collective', 'Faerenheit', 'Cellsius', 'Kelven', 'Salaos', 'Morndos', 'Pythos', 'Quadringo', 'Corundell', 'Flocura' ],
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
		banlist: ['Uber', 'Moody', 'Shadow Tag', 'Baton Pass', 'Kyurem', 'Slowking-Base', 'Slowbro-Base'],
	},
	{    
        name: "[Gen 8] Under The Weather",
        desc: 'Only pokemon with abilities affected by weather are allowed.',
        mod: "undertheweather",
        ruleset: ['Standard NatDex', 'Dynamax Clause', 'Sleep Clause Mod', 'Evasion Moves Clause', 'Species Clause', 'Z-Move Clause'],
        banlist: ['Groudon', 'Kyogre', 'Rayquaza', 'Dracovish', 'Dracozolt', 'Arctozolt', 'Arena Trap', 'Moody', 'Shadow Tag', 'Baton Pass', 'Charizard-Mega-Y', 'Charizard-Mega-X', 'Abomasnow-Mega', 'Tyranitar-Mega'],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			for (const set of team) {
				let template = this.dex.getSpecies(set.species);
				if (template.tier !== 'Sun' && template.tier !== 'Rain' && template.tier !== 'Sand' && template.tier !== 'Hail' && template.tier !== 'NFE') {
					return [set.species + ' is not legal in the Under The Weather format.'];
				}
			}
		},
	},
	{
		name: "[Gen 8] Waght",
		desc: 'A giant memepost. Abismons 2 electric boogaloo',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Data Mod', 'Z-Move Clause'],
		banlist: ['All Pokemon'],
		unbanlist: ['Chansey', 'Rhydon', 'Ivysaur', 'Blaziken', 'Megaracross', 'Barboach', 'Nickit', 'Chandelure'],
		mod: "waght",
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			for (const set of team) {
				let template = this.dex.getSpecies(set.species);
				if (template.tier !== 'Waght' && template.tier !== 'DoublesWaght') {
					return [set.species + ' is not legal in the [Gen 8] Waght format.'];
				}
			}
		},
	},
	{
		name: "[Gen 8] Wild'mons",
		desc: `<b>Wildmons</b>.`,
		mod: 'wildmons',
		teambuilderFormat: "OU",
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Moves Clause', 'Z-Move Clause', 'Mega Rayquaza Clause', 'Data Mod',],
		banlist: [
				//Abilities
				'Arena Trap', 'Power Construct', 'Moody', 'Shadow Tag',
				
				//Items
				'Abomasite', 'Absolite', 'Aerodactylite', 'Aggronite', 'Alakazite', 'Altarianite', 'Ampharosite', 'Audinite', 
				'Banettite', 'Beedrillite', 'Blastoisinite', 'Blazikenite', 'Blue Orb', 'Cameruptite', 'Charizardite X', 
				'Charizardite Y', 'Galladite', 'Gardevoirite', 'Gengarite', 'Glalitite', 'Gyaradosite', 'Heracronite', 
				'Houndoominite', 'Kangaskhanite', 'Latiasite', 'Latiosite', 'Lopunnite', 'Lucarionite', 'Manectite', 'Mawilite', 
				'Medichamite', 'Metagrossite', 'Mewtwonite X', 'Mewtwonite Y', 'Pidgeotite', 'Pinsirite', 'Sablenite', 'Salamencite', 
				'Sceptilite', 'Scizorite', 'Sharpedonite', 'Slowbronite', 'Steelixite', 'Swampertite', 'Tyranitarite', 'Venusaurite', 
				'Bright Powder', 'King\'s Rock', 'Red Orb',
				
				'Assault Vest', 'Choice Band', 'Choice Scarf', 'Choice Specs', 'Eviolite', 'Expert Belt', 'Focus Sash', 'Life Orb',
				'Rocky Helmet', 'Absorb Bulb', 'Adrenaline Orb', 'Air Balloon', 'Black Sludge', 'Blunder Policy', 'Cell Battery', 
				'Damp Rock', 'Eject Button', 'Eject Pack', 'Electric Seed', 'Flame Orb', 'Full Incense', 'Grassy Seed', 'Grip Claw', 
				'Heat Rock', 'Icy Rock', 'Lagging Tail', 'Lax Incense', 'Light Clay', 'Luminous Moss', 'item:Metronome', 'Misty Seed', 
				'Muscle Band', 'Normal Gem', 'Odd Incense', 'Protective Pads', 'Quick Claw', 'Razor Claw', 'Red Card', 'Rock Incense', 
				'Room Service', 'Rose Incense', 'Safety Goggles', 'Scope Lens', 'Sea Incense', 'Shed Shell', 'Shell Bell', 'Smooth Rock', 
				'Snowball', 'Sticky Barb', 'Terrain Extender', 'Throat Spray', 'Toxic Orb', 'Utility Umbrella', 'Wave Incense', 
				'Weakness Policy', 'Wide Lens', 'Wise Glasses', 'Zoom Lens',

				'Heavy-Duty Boots',

				'Big Root', 'Binding Band', 'Destiny Knot', 'Float Stone', 'Focus Band', 'Iron Ball', 'Macho Brace', 'Power Anklet',
				'Power Band', 'Power Belt', 'Power Bracer', 'Power Lens', 'Power Weight', 'Ring Target',

				//Legendary items
				/*'Adamant Orb', 'Griseous Orb', 'Lustrous Orb', 'Soul Dew',*/

				//Moves
				'Baton Pass',
				
				//Pokemon
				'AG', 'Uber',
		],
	},
	{
		name: "[Gen 8] Yoshiblaze's Greatest Hits",
		desc: [
			"Yoshiblaze's Greatest Hits",
		],
		threads: [
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/10_bQ22nYNsWUrEyEvl080VaijY1CMZip0x-ItLqXOsk/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: 'ybsgreatesthits',	
		ruleset: ['Standard', 'Dynamax Clause', 'Data Mod'],
		banlist: ['All Pokemon', 'Arena Trap', 'Moody', 'Shadow Tag', 'Baton Pass'],
		unbanlist: ['Decidium Z', 'Revelation Dance',
					  'Alakazam', 'Riolu', 'Gallade', 'Gardevoir', 'Morpeko', 'Zapdos-Galar', 'Archeops', 'Castform', 'Corsola', 'Chatot', 
						'Ariados', 'Carnivine', 'Weavile', 'Noctowl', 'Lurantis', 'Octillery', 'Articuno', 'Unfezant', 'Kricketune', 'Leafeon',
						'Dedenne', 'Electrode', 'Luxray', 'Seviper', 'Kangaskhan', 'Venusaur', 'Charizard', 'Blastoise', 'Houndoom', 'Scyther',
						'Probopass', 'Luxio', 'Banette', 'Heracross', 'Pidgeot', 'Kirlia', 'Sandslash', 'Pelipper', 'Monferno', 'Greedent', 
						'Indeedee-F', 'Primarina', 'Hoopa', 'Hoopa-Unbound', 'Delibird', 'Vanilluxe', 'Oranguru', 'Primeape', 'Machamp', 
						'Wartortle', 'Garbodor', 'Yanmega', 'Rotom-Fan', 'Oricorio-Sensu', 'Ledian', 'Accelgor', 'Floatzel', 'Furret', 'Masquerain',
						'Arbok', 'Rapidash', 'Flygon', 'Polteageist', 'Decidueye', 'Kyurem-Black', 'Obstagoon', 'Starmie', 'Xurkitree', 'Skuntank',
						'Tauros', 'Sudowoodo', 'Runerigus', 'Talonflame', 'Incineroar', 'Dracovish', 'Armaldo', 'Hitmonlee', 'Flaaffy', 'Sunflora',
						'Clefable', 'Mawile', 'Avalugg', 'Deoxys', 'Cherrim', 'Ampharos', 'Centiskorch', 'Magmortar', 'Electivire', 'Swampert', 'Copperajah',
						'Pyroar', 'Pinsir', 'Toucannon', 'Tapu Koko', 'Rotom-Heat', 'Fearow', 'Mightyena', 'Manectric', 'Slaking', 'Dragapult',
						'Krookodile', 'Carracosta', 'Goodra', 'Oricorio-Pom-Pom', 'Delcatty', 'Tropius', 'Skitty'],
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
		name: "[Gen 3] Sample Team Randbats",
		team: 'random',
		mod: 'gen3sampleteamrandbats',
		ruleset: ['Standard', 'One Boost Passer Clause', 'Freeze Clause Mod'],
		onBegin() {
			for (const pokemon of this.getAllPokemon()) {
				var side = pokemon.side;
				this.hint(side.team[0].sampleTeamName, true, pokemon.side);
			}
		},
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

	/*{
		section: "Past Generations",
		column: 4,
	},*/
	{
		name: "[Gen 3] Ubers Custom Game",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/posts/8286280/">ADV Ubers</a>`,
		],

		mod: 'gen3',
		searchShow: false,
		challengeShow: false,
		ruleset: ['Standard'],
		banlist: ['Wobbuffet + Leftovers'],
	},
	{
		name: "[Gen 3] UU Custom Game",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3585923/">ADV UU Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3548578/">ADV UU Viability Rankings</a>`,
		],

		mod: 'gen3',
		searchShow: false,
		challengeShow: false,
		ruleset: ['Standard', 'NFE Clause'],
		banlist: ['Uber', 'OU', 'UUBL', 'Smeargle + Ingrain'],
		unbanlist: ['Scyther'],
	},
	{
		name: "[Gen 3] 1v1 Custom Game",
		desc: `Bring three Pok&eacute;mon to Team Preview and choose one to battle.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/posts/8031456/">ADV 1v1</a>`,
		],

		mod: 'gen3',
		searchShow: false,
		challengeShow: false,
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
		challengeShow: false,
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
		challengeShow: false,
		debug: true,
		ruleset: ['HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "[Gen 2] Ubers Custom Game",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/posts/8286282/">GSC Ubers</a>`,
		],

		mod: 'gen2',
		searchShow: false,
		challengeShow: false,
		ruleset: ['Standard'],
	},
	{
		name: "[Gen 2] UU Custom Game",
		threads: [`&bullet; <a href="https://www.smogon.com/forums/threads/3576710/">GSC UU</a>`],

		mod: 'gen2',
		searchShow: false,
		challengeShow: false,
		ruleset: ['[Gen 2] OU'],
		banlist: ['OU', 'UUBL'],
	},
	{
		name: "[Gen 2] NU Custom Game",
		threads: [`&bullet; <a href="https://www.smogon.com/forums/threads/3642565/">GSC NU</a>`],

		mod: 'gen2',
		searchShow: false,
		challengeShow: false,
		ruleset: ['[Gen 2] UU'],
		banlist: ['UU', 'NUBL'],
	},
	{
		name: "[Gen 2] Custom Game",

		mod: 'gen2',
		searchShow: false,
		challengeShow: false,
		debug: true,
		maxLevel: 9999,
		battle: {trunc: Math.trunc},
		defaultLevel: 100,
		ruleset: ['HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "[Gen 1] UU Custom Game",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3573896/">RBY UU Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3647713/">RBY UU Viability Rankings</a>`,
		],

		mod: 'gen1',
		searchShow: false,
		challengeShow: false,
		ruleset: ['[Gen 1] OU'],
		banlist: ['OU', 'UUBL'],
	},
	{
		name: "[Gen 1] OU (Tradeback) Custom Game",
		desc: `RBY OU with movepool additions from the Time Capsule.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/articles/rby-tradebacks-ou">RBY Tradebacks OU</a>`,
		],

		mod: 'gen1',
		searchShow: false,
		challengeShow: false,
		ruleset: ['Obtainable', 'Allow Tradeback', 'Sleep Clause Mod', 'Freeze Clause Mod', 'Species Clause', 'OHKO Clause', 'Evasion Moves Clause', 'HP Percentage Mod', 'Cancel Mod'],
		banlist: ['Uber',
			'Nidoking + Fury Attack + Thrash', 'Exeggutor + Poison Powder + Stomp', 'Exeggutor + Sleep Powder + Stomp',
			'Exeggutor + Stun Spore + Stomp', 'Jolteon + Focus Energy + Thunder Shock', 'Flareon + Focus Energy + Ember',
		],
	},
	{
		name: "[Gen 1] Stadium OU Custom Game",

		mod: 'stadium',
		searchShow: false,
		challengeShow: false,
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
		challengeShow: false,
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
		section: "Non-Pet Mod Bonus Formats",
		column: 4,
	},
	// Littlest Cup
	///////////////////////////////////////////////////////////////////
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
		banlist: ['All Pokemon', 'Belly Drum', 'Huge Power'],
		unbanlist: ['Shadow Tag', 'Pichu', 'Cleffa', 'Igglybuff', 'Togepi', 'Tyrogue', 'Smoochum', 'Elekid', 'Magby', 'Azurill', 'Wynaut', 'Budew', 'Chingling', 'Bonsly', 'Mime Jr.', 'Happiny', 'Munchlax', 'Riolu', 'Mantyke', 'Toxel'],
	},
];
