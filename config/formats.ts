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
	///////////////////////////////////////////////////////////////
	///////////////////// Gen 9 Pet Mods //////////////////////////
	///////////////////////////////////////////////////////////////
	{
		section: "Gen 9 Pet Mods",
		column: 1,
		// name: "gen9petmods",
	},
	{
		name: "[Gen 9] Alternatium EX",
		desc: `<b>Alternatium EX</b>: A metagame made up of only Pokemon with alternate forms exist, with all of them being seperate and unique Pokemon.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/alternatium-ex-slate-1-starter-pack.3701560/">Alternatium EX on Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1bvvkPg1CrUBJFJJeuwkts8elfJcEcahGOoHm-vGBXOI/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: 'alternatiumex',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Sleep Clause Mod', 'Min Source Gen = 3', 'Terastal Clause'],
		banlist: ['All Pokemon', 'Baton Pass'],
		unbanlist: [
				'Decidueye-Hermit', 'Decidueye-Autumn', 'Typhlosion-Explosive', 'Typhlosion-Warlock', 'Samurott-Foamy', 'Samurott-Rogue', 
				'Oricorio', 'Oricorio-Cheerleader','Oricorio-Pa\u2019u', 'Horrorcorio',
				'Pikachu-Kanto', 'Pikachu-Hoenn', 'Pikachu-Sinnoh', 'Pikachu-Unova', 'Pikachu-Tactic', 'Pikachu-Alola', 'Pikachu-World',
				'Ribombee', 'Ribombee-Totem', 'Araquanid', 'Araquanid-Totem', 'Vikavolt', 'Vikavolt-Totem',
				'Urshifu', 'Urshifu-Erosion', 'Calyrex-Mythic', 'Calyrex-Glacier','Calyrex-Midnight',
				'Kommo-o', 'Rockmo-o', 'Salazzle', 'Salazzle-Ruler', 'Lurantis', 'Lurantio',
				'Mr. Mime', 'Mr. Mime-Prance', 'Stunfisk', 'Stunfisk-Trap',
				'Necrozma', 'Necrozma-Lionheart', 'Necrozma-Batwing', 'Necrozma-Dragon',
				'Braviary-Patriot', 'Braviary-Hisui', 'Lilligant-Bard', 'Mistlegant', 'Electrode-Screwball','Electrode-Ringo',
				'Persian-Bandit', 'Persian-Omen', 'Meowstic-Untethered', 'Meowstic-TwoTales',
				"Indeedee-Devil", "Indeedee-Angel", "Polteageist", "Polteageist-Antique", "Toxtricity-Rock-Star", "Toxtricity-Low-Key", 
				"Articuno-Mistral", "Articuno-Tsunami", "Zapdos", "Charpados", "Moltres", "Bennutres",
				"Marowak", "Alolawak", "Marowak-Alola-Totem", "Enamorus", "Violentine",
				"Dialga", "Archronos", "Palkia", "Palkia-Origin",
				"Basculin-Hot-Headed","Basculectric", "Basculin-Skyship", "Basculegion", "Basculagoon",
				"Magearna", "Magearna-Prototype", "Zarude", "Zarude-Hero",
				"Qwilfish", "Aquattack", "Zoroark-Jorogumo", "Zoroark-Hoarfrost", "Goodra-Tsunade", "Goodra-Symbiotic",
				"Maushold-Raider", "Maushold-Extended", "Oinkologne", "Oinkologne-F", "Dudunsparce", "Dududunsparce",
				"Greninja", "Greninja-Ronin", "Imperil", "Hoopa-Ifrit",
				"Kyurem", "Kyurem-Black", "Kyurem-White", "Xerneas-Dormant", "Xerneas-Justice",
				"Arcanine-Water Balloon", "Arcanine-Noble", "Avalugg-Prism", "Avalugg-Plated",
				"Squawkabilly", "Squawkabiluck", "Squawkalone", "Squawkabilly-Yellow",
				"Wishiwashi-Lonesome", "Winardin", "Palafin", "Hercuphin",
				'Gumshoos', 'Gumshoos-Totem', 'Togedemaru', 'Totemaru',
				'Tauros', 'Bravatoro', 'Tauros-Steam', 'Tauros-Azul',
				'Raichu', 'Raichu-Soft', 'Rapidash', 'Rapidash-Galar', 'Golem-Berserker', 'Golem-Alola',
				'Cherrim', 'Cherrine', 'Minior', 'Minior-Meteor', 'Eevee', 'Eevee-Starter',
		],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (speciesTable[template.id]) {
					return ["You are limited to one of each Pokémon by Species Clause (except for different formes). ", "You have more than one " + template.id + "."];
				}
				speciesTable[template.id] = true;
			}
		},
	},
	{
		name: "[Gen 4] Back to Sinnoh",
		desc: `Recreation of Gen 4 OU, with a lot of new Fakemons, moves, and abilities! No vanilla Gen 4 Pokemon allowed!`,
		threads: [],
		mod: 'backtosinnoh',
		ruleset: ['Standard', 'Data Mod'],
		banlist: ['Uber', 'Arena Trap', 'Sand Veil', 'Quick Claw', 'Soul Dew', 'Baton Pass'],
	},
	{
		name: "[Gen 9] Banhammers Cycle 2",
		desc: `<b>Banhammers</b>: A metagame where players are allowed to ban Pokemon, Moves, Items, and Abilities through earning points in room tournaments.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/banhammers-cycle-2-week-2-second-roomtour-6-17.3711488/">Banhammers on Smogon Forums</a>`,
         `&bullet; <a href="https://docs.google.com/spreadsheets/d/1prtFrCj_mdOpFtKPpsCH6S3CsO12tEgTIWaQJOEnUcY/edit?usp=sharing">Spreadsheet</a>`,			
		],

		mod: 'gen9',
		ruleset: ['Standard'],
		banlist: ['Uber', 'AG', 'Arena Trap', 'Moody', 'Sand Veil', 'Shadow Tag', 'Snow Cloak', 'King\'s Rock', 'Baton Pass', 'Last Respects', 'Shed Tail'],
	},
	{
		name: "[Gen 9] Beartic Phone",
	   desc: '<b>[Gen 9] Beartic Phone</b>: A group of 5 people unknowingly work together to create a fakemon, very similar to the online game "Gartic Phone".',
		threads: [
			'&bullet; <a href="https://www.smogon.com/forums/threads/beartic-phone.3727739/">Beartic Phone</a>',
			'https://docs.google.com/spreadsheets/d/1-Hfz-p0nomMLVFa4-4nGbLKaoWSl0xFTZA5Aiapw-Ko/edit#gid=1161734506">Spreadsheet</a>',
		],

		mod: 'gen9',
		ruleset: ['Standard'],
		banlist: ['AG', 'Moody', 'King\'s Rock', 'Baton Pass'],
	},
	{
		name: "[Gen 9] UU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3713709/">UU Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3716435/">UU Viability Rankings</a>`,
		],

		mod: 'gen9',
		ruleset: ['[Gen 9] OU'],
		banlist: ['OU', 'UUBL'],
	},
	{
		name: "[Gen 9] RU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3713711/">RU Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3717138/">RU Viability Rankings</a>`,
		],

		mod: 'gen9',
		ruleset: ['[Gen 9] UU'],
		banlist: ['UU', 'RUBL', 'Light Clay'],
	},
	{
		name: "[Gen 9] NU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3715408/">NU Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3715712/">NU Viability Rankings</a>`,
		],

		mod: 'gen9',
		ruleset: ['[Gen 9] RU'],
		banlist: ['RU', 'NUBL'],
	},
	{
		name: "[Gen 9] PU",

		mod: 'gen9',
		ruleset: ['[Gen 9] NU'],
		banlist: ['NU', 'PUBL'],
	},
	{
		name: "[Gen 9] LC",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3710868/">Little Cup Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3712989/">Little Cup Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3712664/">Little Cup Viability Rankings</a>`,
		],

		mod: 'gen9',
		ruleset: ['Little Cup', 'Standard'],
		banlist: [
			'Aipom', 'Basculin-White-Striped', 'Cutiefly', 'Diglett-Base', 'Dunsparce', 'Flittle', 'Gastly', 'Girafarig', 'Gligar', 'Growlithe-Hisui',
			'Meditite', 'Misdreavus', 'Murkrow', 'Qwilfish-Hisui', 'Rufflet', 'Scyther', 'Sneasel', 'Sneasel-Hisui', 'Stantler', 'Vulpix', 'Vulpix-Alola',
			'Yanma', 'Moody', 'Baton Pass', 'Sticky Web',
		],
		
        onValidateTeam(team, format) {
            let speciesTable = {};
            let allowedTiers = ['hi'];
            for (const set of team) {
                let template = this.dex.species.get(set.species);
                if (template.tier !== 'hi') {
                    return [set.species + ' is not legal in [Gen 9] Blindsided.'];
                }
            }
        },
     },
	{
		name: "[Gen 9] Monotype",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3710724/">Monotype Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3715794/">Monotype Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3714063/">Monotype Viability Rankings</a>`,
		],

		mod: 'gen9',
		ruleset: ['Standard', 'Evasion Abilities Clause', 'Same Type Clause', 'Terastal Clause'],
		banlist: [
			'Arceus', 'Calyrex-Ice', 'Calyrex-Shadow', 'Chi-Yu', 'Dialga', 'Dialga-Origin', 'Eternatus', 'Giratina', 'Giratina-Origin',
			'Groudon', 'Iron Bundle', 'Koraidon', 'Kyogre', 'Magearna', 'Mewtwo', 'Miraidon', 'Palafin', 'Palkia', 'Palkia-Origin',
			'Rayquaza', 'Shaymin-Sky', 'Zacian', 'Zacian-Crowned', 'Zamazenta-Crowned', 'Moody', 'Shadow Tag', 'Booster Energy',
			'Damp Rock', 'Focus Band', 'King\'s Rock', 'Quick Claw', 'Acupressure', 'Baton Pass', 'Last Respects',
		],
	},
	{
		name: "[Gen 9] Monothreat Fairy",
		desc: `Monotype where every Pok&eacute;mon is required to be part Fairy.`,

		mod: 'gen9',
		searchShow: false,
		ruleset: ['[Gen 9] Monotype', 'Force Monotype = Fairy'],
	},
	{
		name: "[Gen 9] 1v1",
		desc: `Bring three Pok&eacute;mon to Team Preview and choose one to battle.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3710864/">1v1 Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3712375/">1v1 Viability Rankings</a>`,
		],

		mod: 'gen9',
		ruleset: [
			'Picked Team Size = 1', 'Max Team Size = 3',
			'Standard', 'Terastal Clause', 'Sleep Moves Clause', 'Accuracy Moves Clause', '!Sleep Clause Mod',
		],
		banlist: [
			'Arceus', 'Calyrex-Ice', 'Calyrex-Shadow', 'Chi-Yu', 'Cinderace', 'Dialga', 'Dialga-Origin', 'Dragonite', 'Eternatus', 'Flutter Mane',
			'Gholdengo', 'Giratina', 'Giratina-Origin', 'Groudon', 'Hoopa-Unbound', 'Jirachi', 'Koraidon', 'Kyogre', 'Magearna', 'Meloetta', 'Mew',
			'Mewtwo', 'Mimikyu', 'Miraidon', 'Palkia', 'Palkia-Origin', 'Rayquaza', 'Scream Tail', 'Shaymin-Sky', 'Zacian', 'Zacian-Crowned',
			'Zamazenta', 'Zamazenta-Crowned', 'Moody', 'Focus Band', 'Focus Sash', 'King\'s Rock', 'Quick Claw', 'Acupressure', 'Perish Song',
		],
		unbanlist: [
			"Agonette", "Alchevul", "Androimatide", "Armaruin", "Awesdruk", "Baashful", "Basilud", "Brasshopper", "Bruined", "Caddismith", "Caeruleto", "Capanopy", "Cardborg", "Carecrow", "Cavvage", "Chitana", "Chloravage", "Chubee", "Cloconstruct", "Covloris", "Croakast", "Cryosaurite", "Diabol", "Draatle", "Dreampunk", "Faeraith", "Falstiletto", "Fendeerie", "Ferticotta", "Flumflare", "Fridgeate", "Frozalisk", "Fulmineus", "Funera", "Gachacha", "Gastrel", "Gnomeush", "Gorilax", "Harmadillo", "Hydrongea", "IronRailgun", "Jamborai", "Kaledzi", "Kepa-ying", "Klimausion", "Kurayami", "Lepwozectur", "Libuble", "Lizhaman", "Locustab", "Marshwift", "Matitrick", "Melethyst", "Mochiknight", "Mon-Chi", "Mustank", "Neuranium", "Ohlmagoon", "Orbitgami", "Origyrant", "Phantasail", "Phanthazem", "Plasmacaw", "Pompadork", "Possabomb", "Pyrelic", "Pyroccult", "Pyrove", "Ralirulero", "Rexxon", "Roquack", "Roseaphot", "Sail-Goshi", "Sapparine", "Scorjester", "Scorpdyceps", "Searberus", "Shockatrice", "Snowpea", "Spectache", "Spirem", "Spongimney", "Squwhirrl", "Sundon", "Surchin", "Thorbarage", "Tiramitzu", "Tometex", "Tusquoka-Agent", "Tyrannyan", "Vamperilico", "Velvittle", "Vesquadron", "Vulchar", "Wiifii", "Wildemyst", "Zassansa", "Zauryo", "Zenoise", "Zunowy"
		],
        onValidateTeam(team, format) {
            let speciesTable = {};
            let allowedTiers = ['hi'];
            for (const set of team) {
                let template = this.dex.species.get(set.species);
                if (template.tier !== 'hi') {
                    return [set.species + ' is not legal in [Gen 9] Blindsided.'];
                }
            }
        },
    },
	{
		name: "[Gen 1] Burgundy Version",
		desc: `<b>[Gen 1] Burgundy Version</b>: An expansion of the Gen 1 OU metagame that changes some mechanics and adds new Pokemon and moves, both original and from later gens.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/gen-1-burgundy-version-slate-3-new-moves-voting.3711525/">Burgundy Version on Smogon Forums</a>`,
		],

		mod: 'gen9',
		searchShow: false,
		ruleset: ['Standard OMs', 'Not Fully Evolved', 'Sleep Moves Clause', 'Terastal Clause', 'Min Source Gen = 9'],
		banlist: [
			'Basculin-White-Striped', 'Bisharp', 'Chansey', 'Haunter', 'Magnemite', 'Magneton', 'Primeape', 'Scyther', 'Sneasel-Hisui', 'Ursaring', 'Arena Trap', 'Shadow Tag', 'Baton Pass',
		],
	},
	{
		name: "[Gen 9] Book of Enigmas",
		desc: [
			"<b>Book of Enigmas</b>: A Pet Mod that aims to create new Paradox Pokemon based on Ho-oh and Lugia - the sky and the sea, respectively.",
		],

		mod: 'gen9',
		ruleset: ['[Gen 9] PU'],
		banlist: ['PU'],
	},
	{
		name: "[Gen 9] LC UU",
		threads: [
			`&bullet: <a href="https://www.smogon.com/forums/threads/book-of-enigmas-slate-0-the-beginning-custom-abilities-names.3711490/">Thread on Smogon.`,
		],
		ruleset: ['Standard NatDex', 'Data Mod',],
		banlist: [
			'Axew', 'Crabrawler', 'Croagunk', 'Diglett-Alola', 'Drifloon', 'Foongus', 'Fuecoco', 'Glimmet', 'Gothita', 'Grimer-Alola',
			'Grookey', 'Houndour', 'Mareanie', 'Meowth-Base', 'Mudbray', 'Numel', 'Nymble', 'Pawniard', 'Quaxly', 'Shellder', 'Shellos',
			'Shroodle', 'Teddiursa', 'Tinkatink', 'Toedscool', 'Voltorb-Hisui', 'Wattrel', 'Zorua-Hisui',
		],
	},
	{
		name: "[Gen 9] Clean Slate Micro 2",
		desc: `Clean Slate.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/9437555/">SV CAP Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/9544282/">SV CAP Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/9460153/">SV CAP Viability Rankings</a>`,
		],

		mod: 'gen9',
		ruleset: ['[Gen 9] OU', '+CAP'],
		banlist: ['Crucibellite'],
	},
	{
		name: "[Gen 9] Crossover Chaos Gen 9",
		desc: `Crossover Chaos, a micrometa designed to crossover characters from video game titles.`,
		threads: [
			`<a href="https://www.smogon.com/forums/threads/gen-9-crossover-chaos.3711854/#post-9421623">Gen 9 Crossover Chaos</a>`,
		],

		mod: 'gen9',
		gameType: 'freeforall',
		rated: false,
		tournamentShow: false,
		ruleset: ['Standard', '!Evasion Items Clause'],
		banlist: [
			'Annihilape', 'Arceus', 'Calyrex-Ice', 'Calyrex-Shadow', 'Chi-Yu', 'Darkrai', 'Dialga', 'Dialga-Origin', 'Eternatus', 'Flutter Mane', 'Giratina',
			'Giratina-Origin', 'Groudon', 'Hoopa-Unbound', 'Iron Bundle', 'Koraidon', 'Kyogre', 'Landorus-Base', 'Magearna', 'Mewtwo', 'Miraidon', 'Palafin',
			'Palkia', 'Palkia-Origin', 'Rayquaza', 'Shaymin-Sky', 'Spectrier', 'Ursaluna', 'Ursaluna-Bloodmoon', 'Urshifu-Base', 'Zacian', 'Zacian-Crowned',
			'Moody', 'Shadow Tag', 'Toxic Chain', 'Toxic Debris', 'Acupressure', 'Aromatic Mist', 'Baton Pass', 'Court Change', 'Final Gambit', 'Flatter',
			'Follow Me', 'Heal Pulse', 'Last Respects', 'Poison Fang', 'Rage Powder', 'Spicy Extract', 'Swagger', 'Toxic', 'Toxic Spikes',
		],
	},
	{
		name: "[Gen 9] Battle Stadium Singles Regulation C",

		mod: 'gen9predlc',
		searchShow: false,
		ruleset: ['Flat Rules', '!! Adjust Level = 50', 'Paldea Pokedex', 'Min Source Gen = 9', 'VGC Timer'],
	},
	{
		name: "[Gen 9] Battle Stadium Singles Regulation D",

		mod: 'gen9predlc',
		ruleset: ['Flat Rules', '!! Adjust Level = 50', 'Min Source Gen = 9', 'VGC Timer'],
		banlist: ['Walking Wake', 'Iron Leaves'],
	},
	{
		name: "[Gen 9] Battle Stadium Singles Regulation E",

		mod: 'gen9',
		searchShow: false,
		ruleset: ['Flat Rules', '!! Adjust Level = 50', 'Min Source Gen = 9', 'VGC Timer'],
		banlist: ['Walking Wake', 'Iron Leaves'],
	},
	{
		name: "[Gen 9] Custom Game",

		mod: 'gen9',
		searchShow: false,
		debug: true,
		battle: {trunc: Math.trunc},
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod', 'Max Team Size = 24', 'Max Move Count = 24', 'Max Level = 9999', 'Default Level = 100'],
	},

	// S/V Doubles
	///////////////////////////////////////////////////////////////////

	{
		section: "S/V Doubles",
	},
	{
		name: "[Gen 9] Fakemon Frontier OU",
		desc: `<b>[Gen 9] Fakemon Frontier OU</b>: A meta where the only legal Pokemon are community-made Fakemon that follow two of four predetermined "rules."`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3722349/">Fakemon Frontier on Smogon Forums</a>`,
		],
		mod: 'fakemonfrontier',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Clause', 'Species Clause', 'Terastal Clause', 'Sleep Clause Mod', 'Z-Move Clause', 'Mega Data Mod', 'Data Mod'],
		banlist: [
			'Karate Chop', 'Double Slap', 'Comet Punch', 'Razor Wind', 'Jump Kick', 'Rolling Kick', 'Sonic Boom', 'Submission', 'Dragon Rage', 'Meditate', 'Rage', 'Barrier', 'Bide', 'Mirror Move', 'Egg Bomb', 'Bone Club', 'Clamp', 'Skull Bash', 'Spike Cannon', 'Constrict', 'Kinesis', 'Barrage', 'Lovely Kiss', 'Bubble', 'Dizzy Punch', 'Flash', 'Psywave', 'Bonemerang', 'Hyper Fang', 'Sharpen', 'Triple Kick', 'Spider Web', 'Mind Reader', 'Nightmare', 'Feint Attack', 'Octazooka', 'Foresight', 'Return', 'Frustration', 'Magnitude', 'Pursuit', 'Vital Throw', 'Hidden Power', 'Hail', 'Smelling Salts', 'Nature Power', 'Assist', 'Magic Coat', 'Revenge', 'Refresh', 'Grudge', 'Snatch', 'Secret Power', 'Camouflage', 'Mud Sport', 'Ice Ball', 'Needle Arm', 'Aromatherapy', 'Odor Sleuth', 'Silver Wind', 'Grass Whistle', 'Signal Beam', 'Sky Uppercut', 'Water Sport', 'Miracle Eye', 'WakeUp Slap', 'Natural Gift', 'Embargo', 'Psycho Shift', 'Trump Card', 'Heal Block', 'Wring Out', 'Lucky Chant', 'Me First', 'Punishment', 'Mud Bomb', 'Mirror Shot', 'Rock Climb', 'Rock Wrecker', 'Magnet Bomb', 'Captivate', 'Dark Void', 'Ominous Wind', 'Autotomize', 'Telekinesis', 'Storm Throw', 'Flame Burst', 'Synchronoise', 'Chip Away', 'Sky Drop', 'Bestow', 'Dual Chop', 'Heart Stamp', 'Leaf Tornado', 'Steamroller', 'Rototiller', 'Ion Deluge', 'Crafty Shield', 'Flower Shield', 'Electrify', 'Venom Drench', 'Powder', 'PowerUp Punch', 'Light of Ruin', 'Sparkling Aria', 'Floral Healing', 'Laser Focus', 'Gear Up', 'Aura Wheel'
		],
		onValidateTeam(team, format) {
			let speciesTable = {};
			let allowedTiers = ['FFOU'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (template.tier !== 'FFOU') {
					return [set.species + ' is not legal in [Gen 9] Fakemon Frontier OU.'];
				}
			}
		},
	},
	{
		name: "[Gen 9] Fusion Evolution",
		threads: [
			`<a href="https://www.smogon.com/forums/threads/3717085/">Gen 9 Fusion Evolution</a>`,
		],
		mod: 'feou',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Clause', 'Species Clause', 'Terastal Clause', 'Sleep Clause Mod', 'Z-Move Clause', 'Mega Data Mod', 'Data Mod'],
		banlist: ['Metagrossite', 'Revival Blessing', 'Shed Tail', 'Last Respects', 'Absolite', 'Gengarite', 'Ampharosite', 'Salamencite', 'Baton Pass', 'Light Clay'],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['FEOU', 'FENFE', "FELC"];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Fusion Evolution.'];
				}
			}
		},
	},
	{
		name: "[Gen 9] Generation X",
		threads: [
			`<a href="https://www.smogon.com/forums/threads/3717085/">Gen 9 Generation X</a>`,
		],
		mod: 'genxdesvega',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Clause', 'Species Clause', 'Terastal Clause', 'Sleep Clause Mod', 'Z-Move Clause', 'Mega Data Mod', 'Data Mod'],
		banlist: [],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['Desvega OU', 'Desvega NFE', "Desvega LC"];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Generation X.'];
				}
			}
		},
	},
	{
		name: "[Gen 3] Hoenn Gaiden",
		desc: ["<b>Hoenn Gaiden</b>: A Gen 3 pet mod that aims to devamp Gen 4-8 Pokemon, moves and items into the Gen 3 mechanics."],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/hoenn-gaiden-pet-mod-of-the-season.3714737/">Hoenn Gaiden on Smogon Forums</a>`,
		],

		mod: 'gen9',
		gameType: 'doubles',
		searchShow: false,
		ruleset: ['Standard Doubles', 'Little Cup', 'Sleep Clause Mod'],
		banlist: ['Basculin-White-Striped', 'Dunsparce', 'Murkrow', 'Qwilfish-Hisui', 'Scyther', 'Sneasel', 'Sneasel-Hisui'],
	},
	{
		name: "[Gen 3] Hoenn Gaiden UU",
		desc: ["<b>Hoenn Gaiden</b>: A Gen 3 pet mod that aims to devamp Gen 4-8 Pokemon, moves and items into the Gen 3 mechanics."],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/hoenn-gaiden-pet-mod-of-the-season.3714737/">Hoenn Gaiden on Smogon Forums</a>`,
		],

		mod: 'gen3uuhoenngaiden',
		searchShow: false,
		ruleset: ['Standard', 'Data Mod', 'Freeze Clause Mod'],
		banlist: [
			'Arceus', 'Calyrex-Ice', 'Calyrex-Shadow', 'Chi-Yu', 'Dialga', 'Dialga-Origin', 'Eternatus', 'Giratina', 'Giratina-Origin', 'Groudon', 'Iron Hands',
			'Koraidon', 'Kyogre', 'Magearna', 'Mewtwo', 'Miraidon', 'Palkia', 'Palkia-Origin', 'Rayquaza', 'Tornadus-Base', 'Urshifu', 'Urshifu-Rapid-Strike',
			'Zacian', 'Zacian-Crowned', 'Zamazenta', 'Zamazenta-Crowned', 'Commander', 'Moody', 'Focus Sash', 'King\'s Rock', 'Ally Switch', 'Final Gambit',
			'Perish Song', 'Swagger',
		],
	},
	{
		name: "[Gen 9] VGC 2023 Regulation C",

		mod: 'gen9predlc',
		gameType: 'doubles',
		searchShow: false,
		ruleset: ['Flat Rules', '!! Adjust Level = 50', 'Paldea Pokedex', 'Min Source Gen = 9', 'VGC Timer', 'Open Team Sheets'],
	},
	{
		name: "[Gen 9] VGC 2023 Regulation D",

		mod: 'gen9predlc',
		gameType: 'doubles',
		ruleset: ['Flat Rules', '!! Adjust Level = 50', 'Min Source Gen = 9', 'VGC Timer', 'Open Team Sheets'],
		banlist: ['Walking Wake', 'Iron Leaves'],
	},
	{
		name: "[Gen 9] VGC 2023 Regulation E",

		mod: 'gen9',
		gameType: 'doubles',
		ruleset: ['Flat Rules', '!! Adjust Level = 50', 'Min Source Gen = 9', 'VGC Timer', 'Open Team Sheets'],
		banlist: ['Walking Wake', 'Iron Leaves'],
	},
	{
		name: "[Gen 9] Doubles Custom Game",

		mod: 'gen9',
		gameType: 'doubles',
		searchShow: false,
		battle: {trunc: Math.trunc},
		debug: true,
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod', 'Max Team Size = 24', 'Max Move Count = 24', 'Max Level = 9999', 'Default Level = 100'],
	},

	// National Dex
	///////////////////////////////////////////////////////////////////

	{
		section: "National Dex",
	},
	{
		name: "[Gen 9] National Dex",
		threads: [
				`&bullet; <a href="https://www.smogon.com/forums/threads/3671140/">Megas for All v7 on Smogon Forums</a>`,
				`&bullet; <a href="https://docs.google.com/spreadsheets/d/1TdeAUUtjh0f_tcIBllbF_imgepwV-dV2YomoTCRlPgI/edit?usp=sharing">Spreadsheet</a>`,
				`&bullet; <a href="http://megasforall.wikidot.com/">Wiki</a>`
		      ],
		ruleset: ['Standard NatDex', 'Z-Move Clause', 'Dynamax Clause', 'Mega Data Mod'],
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
				let template = this.dex.species.get(set.species);
				if (template.tier !== 'Mega' && template.tier !== 'Kalos' && template.tier !== 'Kalos (NFE)') {
					return [set.species + ' is not a part of the Kalos Pokédex.'];
				}
			}
		},
		onValidateSet(set) {
			const problems: string[] = [];
			const setHas: {[k: string]: true} = {};
			let species = this.dex.species.get(set.species);
			let item = this.dex.items.get(set.item);
			let tierSpecies = species;

			if (item.megaEvolves === species.name) {
				if (item.megaStone && this.dex.species.get(item.megaStone).tier !== 'Mega') return [item.name + ' is not a legal Mega Stone.'];
			}
		},
		mod: 'm4akalos',
	},
	{
		name: "[Gen 6] Megas Revisited",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3713949/">Megas Revisited on Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1wK11cPHnPCmH7JFss6leKW6_-cumn3DuZA-YMzrzF-U/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: 'gen6megasrevisited',
		ruleset: ['Standard', 'Swagger Clause', 'Mega Data Mod'],
		banlist: ['Uber', 'Arena Trap', 'Shadow Tag', 'Soul Dew', 'Baton Pass', 'Blaziken + Speed Boost'],
	},
	{
		name: "[Gen 9] MetaMons",
		desc: [
			"In this Pet Mod, we will aim to create a decently-sized micrometa that will expand in the unique niches of some Pokémon, giving them the spotlight after all the time they have been waiting.",
		],
		threads: [
			'&bullet; <a href="https://www.smogon.com/forums/threads/metamons-slate-3-galarian-slowbro-sableye-grapploct.3703361/">MetaMons</a>',
			'&bullet; <a href="https://docs.google.com/spreadsheets/d/142lxuFtTgQCY56Wz_ZjAGaqlk7HgJj0CVKMChQcei1U/edit#gid=0">Spreadsheet</a>',
		],
		mod: 'metamons', 
		ruleset:['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Terastal Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Data Mod', 'Mega Data Mod', 'Z-Move Clause'],
		banlist: [
			'Arena Trap', 'Moody', 'Shadow Tag', 'Baton Pass', 'Beedrillite'
		],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (template.tier !== 'MetaMons') {
					return [set.species + ' is not usable in MetaMons.'];
				}
			}
		},
	},
	{
		name: "[Gen 9] More Balanced Hackmons v4",
		desc: `Balanced Hackmons with National Dex elements mixed in.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3711482/">More Balanced Hackmons v4</a>`,
		],
		mod: 'morebalancedhackmons',
		// debug: true,
		ruleset: ['-Nonexistent', 'Standard NatDex', 'Forme Clause', 'Sleep Moves Clause', 'Ability Clause = 2', 'OHKO Clause', 'Evasion Moves Clause', 'Dynamax Clause', 'CFZ Clause', 'Terastal Clause', '!Obtainable'],
		banlist: [
			'Eternatus-Eternamax', 'Groudon-Primal', 'Rayquaza-Mega', 'Shedinja', 'Arena Trap',
			'Gorilla Tactics', 'Huge Power', 'Illusion', 'Innards Out', 'Magnet Pull', 'Moody', 'Parental Bond',
			'Stakeout', 'Wonder Guard', 'Gengarite', 'Belly Drum', 'Chatter', 'Double Iron Bash', 'Electrify',
			'Last Respects', 'Octolock', 'Revival Blessing', 'Shed Tail', 'Shell Smash', 'Comatose + Sleep Talk', 'Imprison + Transform',
		],
		restricted: ['Arceus'],
		onValidateTeam(team, format) {
			// baseSpecies:count
			const restrictedPokemonCount = new Map<string, number>();
			for (const set of team) {
				const species = this.dex.species.get(set.species);
				if (!this.ruleTable.isRestrictedSpecies(species)) continue;
				restrictedPokemonCount.set(species.baseSpecies, (restrictedPokemonCount.get(species.baseSpecies) || 0) + 1);
			}
			for (const [baseSpecies, count] of restrictedPokemonCount) {
				if (count > 1) {
					return [
						`You are limited to one ${baseSpecies} forme.`,
						`(You have ${count} ${baseSpecies} forme${count === 1 ? '' : 's'}.)`,
					];
				}
			}
		},
	},
	{
		name: "[Gen 9] Multiverse",
		threads: [
			'&bullet; <a href="https://www.smogon.com/forums/threads/multiverse-gen-9-slate-4-voting.3723507/">Multiverse</a>',
			'&bullet; <a href="https://docs.google.com/spreadsheets/d/1Bu2Mm9L7vURggEI9mkkFM7mo-eLtLj2K95f4Rchaolg/edit?usp=sharing">Spreadsheet</a>',
		],
		mod: 'gen9multiverse',
		ruleset: ['Standard', 'Terastal Clause', 'Data Mod'],
		banlist: ['Moody', 'Baton Pass'],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['MV'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Multiverse.'];
				}
			}
		},
	},
	{
	  name: "[Gen 9] OU Theorymons",
     desc: '<b>[Gen 9] OU Theorymons</b>: Fixing niche and unseen Pokemon in the SV OU Metagame with small buffs.',
	  threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/sv-ou-theorymon.3723892/">OU Theorymon on Smogon Forums</a>`,
		],
     mod: 'outheorymons',
	  ruleset: ['Standard', 'Data Mod'],
	  banlist: ['Uber', 'AG', 'Arena Trap', 'Moody', 'Sand Veil', 'Shadow Tag', 'Snow Cloak', 'King\'s Rock', 'Baton Pass', 'Last Respects', 'Shed Tail'],
	},
	{
		name: "[Gen 9] Paleomons",
	   desc: '<b>[Gen 9] Paleomons</b>: In this mod, we will be creating an SV OU-based micrometa of Pokémon based on real critters from the Paleozoic, Mesozoic, and Cenozoic eras.',
		threads: [
			'&bullet; <a href="https://www.smogon.com/forums/threads/paleomons-slate-1-winners.3727753/">Paleomons</a>',
		//	'&bullet; <a href="https://docs.google.com/spreadsheets/d/1wbFWGR5pVcnTTyuy7vAUSrPxqSZsNF-Okx-v1hvD2Vc/edit?usp=sharing">Spreadsheet</a>',
		],
		mod: 'paleomons', 
	  ruleset: ['Standard', 'Terastal Clause', 'Data Mod'],
		banlist: [
			'Arena Trap', 'Moody', 'Shadow Tag', 'Baton Pass',
		],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (template.tier !== 'Paleomons') {
					return [set.species + ' is not usable in Paleomons.'];
				}
			}
		},
	},
	{
		name: "[Gen 9] Poketypos",
		desc: `<b>[Gen 9] Poketypos</b>: A NatDex metagame that alters the names of Pokemon and change said Pokemon to fit their new name.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/hoenn-gaiden-pet-mod-of-the-season.3714737/">Hoenn Gaiden on Smogon Forums</a>`,
		],

		mod: 'gen3hoenngaiden',
		ruleset: ['HG Standard', 'Freeze Clause Mod'],
		banlist: ['Uber'],
		unbanlist: ['Sand Veil'],
	},
	{
		name: "[Gen 8] JolteMons Random Battle",
		desc: `Pok&eacute;mon, items, abilities, and moves are redesigned for OU, and new items, abilities, and moves are added, all without changing base stats.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3694234/">JolteMons</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/149ZlQY0bJIAqfWB_233Dvbpqs3pVSHYpIoAQQkwquls/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: 'gen8joltemons',
		team: 'random',
		ruleset: ['Dynamax Clause', 'Obtainable', 'Species Clause', 'HP Percentage Mod', 'Cancel Mod', 'Sleep Clause Mod', 'Mega Data Mod', 'Z-Move Clause'],
	},
	{
		name: "[Gen 6] NEXT OU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3476151/">Gen-NEXT Development Thread</a>`,
		],

		mod: 'gennext',
		searchShow: false,
		challengeShow: false,
		ruleset: ['Obtainable', 'Standard NEXT', 'Team Preview'],
		banlist: ['Uber'],
	},

	// Draft League
	///////////////////////////////////////////////////////////////////

	{
		section: "Draft",
		column: 1,
	},
	{
		name: "[Gen 9] Paldea Dex Draft",

		mod: 'gen9',
		searchShow: false,
		ruleset: ['Draft', 'Min Source Gen = 9'],
	},
	{
		name: "[Gen 9] Tera Preview Paldea Dex Draft",

		mod: 'gen9',
		searchShow: false,
		ruleset: ['[Gen 9] Paldea Dex Draft', 'Tera Type Preview'],
	},
	{
		name: "[Gen 9] 6v6 Doubles Draft",

		mod: 'gen9',
		gameType: 'doubles',
		searchShow: false,
		ruleset: ['Draft', '!Sleep Clause Mod', '!Evasion Clause', 'Min Source Gen = 9'],
	},
	{
		name: "[Gen 9] 4v4 Doubles Draft",

		mod: 'gen9',
		gameType: 'doubles',
		searchShow: false,
		ruleset: ['Draft', 'Item Clause', 'VGC Timer', '!Sleep Clause Mod', '!OHKO Clause', '!Evasion Clause', 'Adjust Level = 50', 'Picked Team Size = 4', 'Min Source Gen = 9'],
	},
	{
		name: "[Gen 9] NatDex Draft",

		mod: 'gen9',
		searchShow: false,
		ruleset: ['Draft', '+Unobtainable', '+Past'],
	},
	{
		name: "[Gen 9] Tera Preview NatDex Draft",

		mod: 'gen9',
		searchShow: false,
		ruleset: ['[Gen 9] NatDex Draft', 'Tera Type Preview'],
	},
	{
		name: "[Gen 9] NatDex 6v6 Doubles Draft",

		mod: 'gen9',
		gameType: 'doubles',
		searchShow: false,
		ruleset: ['[Gen 9] 6v6 Doubles Draft', '+Unobtainable', '+Past', '!! Min Source Gen = 3'],
	},
	{
		name: "[Gen 9] NatDex 4v4 Doubles Draft",

		mod: 'gen9',
		gameType: 'doubles',
		searchShow: false,
		ruleset: ['[Gen 9] 4v4 Doubles Draft', '+Unobtainable', '+Past', '!! Min Source Gen = 3'],
	},
	{
		name: "[Gen 9] NatDex LC Draft",

		mod: 'gen9',
		searchShow: false,
		ruleset: ['[Gen 9] NatDex Draft', 'Double Item Clause', 'Little Cup'],
		banlist: ['Dragon Rage', 'Sonic Boom'],
	},
	{
		name: "[Gen 8] Galar Dex Draft",

		mod: 'gen8',
		searchShow: false,
		ruleset: ['Draft', 'Dynamax Clause'],
	},
	{
		name: "[Gen 8] NatDex Draft",

		mod: 'gen8',
		searchShow: false,
		ruleset: ['Draft', 'Dynamax Clause', '+Past'],
	},
	{
		name: "[Gen 8] NatDex 4v4 Doubles Draft",

		mod: 'gen8',
		gameType: 'doubles',
		searchShow: false,
		ruleset: ['Draft', 'Item Clause', '!Sleep Clause Mod', '!OHKO Clause', '!Evasion Moves Clause', 'Adjust Level = 50', 'Picked Team Size = 4', '+Past'],
	},
	{
		name: "[Gen 7] Draft",

		mod: 'gen7',
		searchShow: false,
		ruleset: ['Draft', '+LGPE'],
	},
	{
		name: "[Gen 6] Draft",

		mod: 'gen6',
		searchShow: false,
		ruleset: ['Draft', 'Moody Clause', 'Swagger Clause'],
		banlist: ['Soul Dew'],
	},

	// OM of the Month
	///////////////////////////////////////////////////////////////////

	{
		section: "OM of the Month",
		column: 2,
	},
	{
		name: "[Gen 9] Frantic Fusions",
		desc: `Pok&eacute;mon nicknamed after another Pok&eacute;mon get their stats buffed by 1/4 of that Pok&eacute;mon's stats, barring HP, and access to one of their abilities.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3725593/">Frantic Fusions</a>`,
		],

		mod: 'gen9',
		ruleset: ['Standard OMs', '!Nickname Clause', '!Obtainable Abilities', 'Sleep Moves Clause', 'Frantic Fusions Mod', 'Terastal Clause', 'Min Source Gen = 9'],
		banlist: [
			'Annihilape', 'Arceus', 'Baxcalibur', 'Calyrex-Ice', 'Calyrex-Shadow', 'Chien-Pao', 'Chi-Yu', 'Darkrai', 'Dialga', 'Dialga-Origin', 'Ditto',
			'Dragapult', 'Enamorus-Base', 'Eternatus', 'Flutter Mane', 'Giratina', 'Giratina-Origin', 'Groudon', 'Hoopa-Unbound', 'Iron Bundle', 'Iron Hands',
			'Iron Valiant', 'Koraidon', 'Komala', 'Kyogre', 'Landorus-Base', 'Magearna', 'Mewtwo', 'Miraidon', 'Numel', 'Palafin', 'Palkia', 'Palkia-Origin',
			'Persian-Alola', 'Rayquaza', 'Regieleki', 'Shaymin-Sky', 'Slaking', 'Spectrier', 'Toxapex', 'Urshifu', 'Urshifu-Rapid-Strike', 'Weavile', 'Zacian',
			'Zacian-Crowned', 'Zamazenta', 'Zamazenta-Crowned', 'Arena Trap', 'Contrary', 'Huge Power', 'Ice Scales', 'Illusion', 'Magnet Pull', 'Moody',
			'Neutralizing Gas', 'Poison Heal', 'Pure Power', 'Shadow Tag', 'Stakeout', 'Stench', 'Speed Boost', 'Unburden', 'Damp Rock', 'Heat Rock', 'King\'s Rock',
			'Quick Claw', 'Baton Pass', 'Last Respects', 'Revival Blessing', 'Shed Tail',
		],
	},
	{
		name: "[Gen 7] Pure Hackmons",
		desc: `Anything that can be hacked in-game and is usable in local battles is allowed.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/posts/9142994">USUM Pure Hackmons</a>`,
		],

		mod: 'gen7',
		ruleset: ['-Nonexistent', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Endless Battle Clause'],
	},

	// Other Metagames
	///////////////////////////////////////////////////////////////////

	{
		section: "Other Metagames",
		column: 2,
	},
	{
		name: "[Gen 9] Almost Any Ability",
		desc: `Pok&eacute;mon have access to almost any ability.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3717145/">Roulettemons 2 on Smogon Forums</a>`,
		],
		mod: 'roulettemons2',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Terastal Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Z-Move Clause', 'Data Mod', 'Mega Data Mod'],
		banlist: [
			'Annihilape', 'Arceus', 'Baxcalibur', 'Calyrex-Ice', 'Calyrex-Shadow', 'Darkrai', 'Dialga', 'Dialga-Origin', 'Dragapult', 'Enamorus-Base',
			'Eternatus', 'Flutter Mane', 'Giratina', 'Giratina-Origin', 'Gholdengo', 'Groudon', 'Hariyama', 'Hoopa-Unbound', 'Iron Bundle', 'Iron Hands',
			'Iron Valiant', 'Koraidon', 'Kyogre', 'Magearna', 'Mewtwo', 'Miraidon', 'Noivern', 'Palkia', 'Palkia-Origin', 'Rayquaza', 'Shaymin-Sky',
			'Slaking', 'Sneasler', 'Spectrier', 'Ursaluna-Base', 'Urshifu', 'Urshifu-Rapid-Strike', 'Zacian', 'Zacian-Crowned', 'Zamazenta-Base',
			'Zoroark-Hisui', 'Arena Trap', 'Comatose', 'Contrary', 'Fur Coat', 'Good as Gold', 'Gorilla Tactics', 'Huge Power', 'Ice Scales', 'Illusion',
			'Imposter', 'Innards Out', 'Magic Bounce', 'Magnet Pull', 'Moody', 'Neutralizing Gas', 'Orichalcum Pulse', 'Parental Bond', 'Poison Heal',
			'Pure Power', 'Shadow Tag', 'Simple', 'Speed Boost', 'Stakeout', 'Unburden', 'Water Bubble', 'Wonder Guard', 'King\'s Rock', 'Baton Pass',
			'Last Respects', 'Revival Blessing', 'Shed Tail',
		],
	},
	{
		name: "[Gen 9] Balanced Hackmons",
		desc: `Anything directly hackable onto a set (EVs, IVs, forme, ability, item, and move) and is usable in local battles is allowed.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3710859/">Balanced Hackmons</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3712766/">BH Resources</a>`,
		],

		mod: 'gen9',
		ruleset: [
			'OHKO Clause', 'Evasion Clause', 'Species Clause', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Sleep Moves Clause',
			'Endless Battle Clause', 'Hackmons Forme Legality', 'Species Reveal Clause', 'Terastal Clause',
		],
		banlist: [
			'Calyrex-Shadow', 'Gengar-Mega', 'Groudon-Primal', 'Mewtwo-Mega-Y', 'Rayquaza-Mega', 'Regigigas', 'Shedinja', 'Slaking', 'Arena Trap',
			'Comatose', 'Contrary', 'Gorilla Tactics', 'Hadron Engine', 'Huge Power', 'Illusion', 'Innards Out', 'Libero', 'Magnet Pull', 'Moody',
			'Neutralizing Gas', 'Orichalcum Pulse', 'Parental Bond', 'Poison Heal', 'Protean', 'Pure Power', 'Shadow Tag', 'Stakeout', 'Water Bubble',
			'Wonder Guard', 'Baton Pass', 'Belly Drum', 'Ceaseless Edge', 'Dire Claw', 'Imprison', 'Last Respects', 'Quiver Dance', 'Rage Fist',
			'Revival Blessing', 'Shed Tail', 'Substitute', 'Shell Smash', 'Tail Glow',
		],
	},
	{
		name: "[Gen 9] Roulettemons 2 Ubers",
		desc: `<b>[Gen 9] Roulettemons 2 Ubers</b>: A broken meta where the only legal Pokemon are randomly-generated Fakemon.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3717145/">Roulettemons 2 on Smogon Forums</a>`,
		],
		mod: 'roulettemons2',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Z-Move Clause', 'Data Mod', 'Mega Data Mod'],
		banlist: [
			'Calyrex-Shadow', 'Eternatus', 'Koraidon', 'Kyogre', 'Miraidon', 'Moody', 'Rusted Sword', 'Shadow Tag', 'Beedrillite',
			'Blazikenite', 'Gengarite', 'Kangaskhanite', 'Mawilite', 'Medichamite', 'Pidgeotite', 'Baton Pass', 'Shed Tail',
		],
		restricted: [
			'Arceus', 'Basculegion-Base', 'Calyrex-Ice', 'Dialga', 'Dragapult', 'Flutter Mane', 'Gengar', 'Gholdengo', 'Giratina', 'Groudon',
			'Iron Bundle', 'Kilowattrel', 'Mewtwo', 'Palkia', 'Rayquaza', 'Slaking', 'Sneasler', 'Urshifu', 'Urshifu-Rapid-Strike', 'Zacian',
		],
		onValidateTeam(team) {
			const itemTable = new Set<ID>();
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (template.tier !== 'R2' && template.tier !== 'R2Ubers') {
					return [set.species + ' is not legal in [Gen 9] Roulettemons 2.'];
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
			const originalFormeSecies = this.dex.species.get(pokemon.species.originalSpecies);
			if (originalFormeSecies.exists && pokemon.m.originalSpecies !== originalFormeSecies.baseSpecies) {
				// Place volatiles on the Pokémon to show its mega-evolved condition and details
				this.add('-start', pokemon, originalFormeSecies.requiredItem || originalFormeSecies.requiredMove, '[silent]');
				const oSpecies = this.dex.species.get(pokemon.m.originalSpecies);
				if (oSpecies.types.length !== pokemon.species.types.length || oSpecies.types[1] !== pokemon.species.types[1]) {
					this.add('-start', pokemon, 'typechange', pokemon.species.types.join('/'), '[silent]');
				}
			}
		},
		onSwitchOut(pokemon) {
			// @ts-ignore
			const oMegaSpecies = this.dex.species.get(pokemon.species.originalSpecies);
			if (oMegaSpecies.exists && pokemon.m.originalSpecies !== oMegaSpecies.baseSpecies) {
				this.add('-end', pokemon, oMegaSpecies.requiredItem || oMegaSpecies.requiredMove, '[silent]');
			}
		},
	},
	{
		name: "[Gen 9] Godly Gift",
		desc: `Each Pok&eacute;mon receives one base stat from a God (AG/Uber Pok&eacute;mon) depending on its position in the team. If there is no Uber Pok&eacute;mon, it uses the Pok&eacute;mon in the first slot.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3710734/">Godly Gift</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3718065/">Godly Gift Resources</a>`,
		],

		mod: 'gen9',
		ruleset: ['Standard OMs', 'Sleep Moves Clause', 'Godly Gift Mod', 'Min Source Gen = 9'],
		banlist: [
			'Blissey', 'Calyrex-Shadow', 'Chansey', 'Arena Trap', 'Huge Power', 'Moody', 'Pure Power', 'Shadow Tag', 'Swift Swim',
			'Bright Powder', 'Focus Band', 'King\'s Rock', 'Quick Claw', 'Baton Pass', 'Last Respects', 'Shed Tail',
		],
	},
	{
		name: "[Gen 9] STABmons",
		desc: `Pok&eacute;mon can use any move of their typing, in addition to the moves they can normally learn.`,
		threads: [
			'&bullet; <a href="https://www.smogon.com/forums/threads/regeneration-slate-4-seadra-dodrio-wigglytuff.3718196/">ReGeneration</a>',
			'&bullet; <a href="https://docs.google.com/spreadsheets/d/1wbFWGR5pVcnTTyuy7vAUSrPxqSZsNF-Okx-v1hvD2Vc/edit?usp=sharing">Spreadsheet</a>',
		],
		mod: 'regeneration', 
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod'],
		banlist: [
			'Arceus', 'Azumarill', 'Basculegion', 'Basculegion-F', 'Calyrex-Ice', 'Calyrex-Shadow', 'Chi-Yu', 'Chien-Pao', 'Cloyster', 'Darkrai',
			'Dialga', 'Dialga-Origin', 'Dragapult', 'Dragonite', 'Enamorus-Base', 'Eternatus', 'Flutter Mane', 'Garchomp', 'Giratina', 'Giratina-Origin',
			'Groudon', 'Iron Bundle', 'Komala', 'Koraidon', 'Kyogre', 'Landorus-Base', 'Lilligant-Hisui', 'Magearna', 'Mewtwo', 'Miraidon', 'Palkia',
			'Palkia-Origin', 'Rayquaza', 'Regieleki', 'Shaymin-Sky', 'Spectrier', 'Ursaluna-Base', 'Urshifu-Base', 'Walking Wake', 'Zacian', 'Zacian-Crowned',
			'Zamazenta', 'Zamazenta-Crowned', 'Zoroark-Hisui', 'Arena Trap', 'Moody', 'Shadow Tag', 'Damp Rock', 'King\'s Rock', 'Baton Pass', 'Shed Tail',
		],
		restricted: [
			'Acupressure', 'Astral Barrage', 'Belly Drum', 'Dire Claw', 'Extreme Speed', 'Fillet Away', 'Gigaton Hammer', 'Last Respects',
			'No Retreat', 'Revival Blessing', 'Shell Smash', 'Shift Gear', 'Triple Arrows', 'V-create', 'Victory Dance', 'Wicked Blow',
		],
	},
	{
		name: "[Gen 9] Partners in Crime",
		desc: `Doubles-based metagame where both active ally Pok&eacute;mon share abilities and moves.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3710997/">Partners in Crime</a>`,
		],

		mod: 'partnersincrime',
		gameType: 'doubles',
		ruleset: ['Standard Doubles'],
		banlist: [
			'Annihilape', 'Arceus', 'Calyrex-Ice', 'Calyrex-Shadow', 'Chi-Yu', 'Cresselia', 'Darkrai', 'Dialga', 'Dialga-Origin', 'Enamorus-Base',
			'Eternatus', 'Flutter Mane', 'Giratina', 'Giratina-Origin', 'Groudon', 'Koraidon', 'Kyogre', 'Magearna', 'Mewtwo', 'Miraidon', 'Palkia',
			'Palkia-Origin', 'Rayquaza', 'Urshifu', 'Urshifu-Rapid-Strike', 'Zacian', 'Zacian-Crowned', 'Zamazenta', 'Zamazenta-Crowned', 'Dancer',
			'Huge Power', 'Moody', 'Pure Power', 'Shadow Tag', 'Bright Powder', 'King\'s Rock', 'Ally Switch', 'Last Respects', 'Revival Blessing',
			'Swagger',
		],
		onBegin() {
			for (const pokemon of this.getAllPokemon()) {
				pokemon.m.trackPP = new Map<string, number>();
			}
		},
		onBeforeSwitchIn(pokemon) {
			pokemon.m.curMoves = this.dex.deepClone(pokemon.moves);
			let ngas = false;
			for (const poke of this.getAllActive()) {
				if (this.toID(poke.ability) === ('neutralizinggas' as ID)) {
					ngas = true;
					break;
				}
			}
			const BAD_ABILITIES = ['trace', 'imposter', 'neutralizinggas', 'illusion', 'wanderingspirit'];
			const ally = pokemon.side.active.find(mon => mon && mon !== pokemon && !mon.fainted);
			if (ally && ally.ability !== pokemon.ability) {
				if (!pokemon.m.innate && !BAD_ABILITIES.includes(this.toID(ally.ability))) {
					pokemon.m.innate = 'ability:' + ally.ability;
					if (!ngas || ally.getAbility().isPermanent || pokemon.hasItem('Ability Shield')) {
						pokemon.volatiles[pokemon.m.innate] = {id: pokemon.m.innate, target: pokemon};
						pokemon.m.startVolatile = true;
					}
				}
				if (!ally.m.innate && !BAD_ABILITIES.includes(this.toID(pokemon.ability))) {
					ally.m.innate = 'ability:' + pokemon.ability;
					if (!ngas || pokemon.getAbility().isPermanent || ally.hasItem('Ability Shield')) {
						ally.volatiles[ally.m.innate] = {id: ally.m.innate, target: ally};
						ally.m.startVolatile = true;
					}
				}
			}
		},
		// Starting innate abilities in scripts#actions
		onSwitchOut(pokemon) {
			if (pokemon.m.innate) {
				pokemon.removeVolatile(pokemon.m.innate);
				delete pokemon.m.innate;
			}
			const ally = pokemon.side.active.find(mon => mon && mon !== pokemon && !mon.fainted);
			if (ally && ally.m.innate) {
				ally.removeVolatile(ally.m.innate);
				delete ally.m.innate;
			}
		},
		onFaint(pokemon) {
			if (pokemon.m.innate) {
				pokemon.removeVolatile(pokemon.m.innate);
				delete pokemon.m.innate;
			}
			const ally = pokemon.side.active.find(mon => mon && mon !== pokemon && !mon.fainted);
			if (ally && ally.m.innate) {
				ally.removeVolatile(ally.m.innate);
				delete ally.m.innate;
			}
		},
	},
	{
		name: "[Gen 9] Return to Orre: Tercera",
	   desc: [
			"This is a micrometa that only uses Pokemon obtainable in Colosseum and XD.",
		],
		threads: [
			'&bullet; <a href="https://www.smogon.com/forums/threads/return-to-orre-tercera-open-for-submissions.3722389/">RTO: Tercera</a>',
		],
		mod: 'returntoorretercera', 
		ruleset: ['Standard NatDex', 'Terastal Clause', 'Picked Team Size = 3', 'Adjust Level = 50', 'VGC Timer'],
		banlist: [
			'Arceus', 'Calyrex-Ice', 'Calyrex-Shadow', 'Cresselia', 'Dialga', 'Dialga-Origin', 'Dondozo', 'Dragapult', 'Enamorus-Base', 'Espathra', 'Eternatus',
			'Flittle', 'Flutter Mane', 'Giratina', 'Giratina-Origin', 'Groudon', 'Hoopa-Unbound', 'Iron Bundle', 'Koraidon', 'Kyogre', 'Magearna', 'Mewtwo',
			'Miraidon', 'Palkia', 'Palkia-Origin', 'Rayquaza', 'Regieleki', 'Samurott-Hisui', 'Shaymin-Sky', 'Slaking', 'Spectrier', 'Torkoal', 'Ursaluna-Base',
			'Urshifu-Base', 'Zacian', 'Zacian-Crowned', 'Zamazenta', 'Zamazenta-Crowned', 'Arena Trap', 'Huge Power', 'Imposter', 'Magnet Pull', 'Moody',
			'Poison Heal', 'Pure Power', 'Shadow Tag', 'King\'s Rock', 'Baton Pass', 'Fillet Away', 'Last Respects', 'Rage Fist', 'Shed Tail', 'Shell Smash',
		],
		getEvoFamily(speciesid) {
			let species = Dex.species.get(speciesid);
			while (species.prevo) {
				const prevoSpecies = Dex.species.get(species.prevo);
				if (prevoSpecies.evos.length > 1) break;
				species = prevoSpecies;
			}
			return species.id;
		},
		validateSet(set, teamHas) {
			const unreleased = (pokemon: Species) => pokemon.tier === "Unreleased" && pokemon.isNonstandard === "Unobtainable";
			if (!teamHas.abilityMap) {
				teamHas.abilityMap = Object.create(null);
				for (const pokemon of Dex.species.all()) {
					if (pokemon.isNonstandard || (unreleased(pokemon) && !this.ruleTable.has('+unobtainable'))) continue;
					if (pokemon.requiredAbility || pokemon.requiredItem || pokemon.requiredMove) continue;
					if (this.ruleTable.isBannedSpecies(pokemon)) continue;

					for (const key of Object.values(pokemon.abilities)) {
						const abilityId = this.dex.toID(key);
						if (abilityId in teamHas.abilityMap) {
							teamHas.abilityMap[abilityId][pokemon.evos ? 'push' : 'unshift'](pokemon.id);
						} else {
							teamHas.abilityMap[abilityId] = [pokemon.id];
						}
					}
				}
			}

			const problem = this.validateForme(set);
			if (problem.length) return problem;

			const species = this.dex.species.get(set.species);
			if (!species.exists || species.num < 1) return [`The Pok\u00e9mon "${set.species}" does not exist.`];
			if (species.isNonstandard || (unreleased(species) && !this.ruleTable.has('+unobtainable'))) {
				return [`${species.name} is not obtainable in Generation ${this.dex.gen}.`];
			}

			const name = set.name;
			if (this.ruleTable.isBannedSpecies(species)) {
				return this.validateSet(set, teamHas);
			}

			const ability = this.dex.abilities.get(set.ability);
			if (!ability.exists || ability.isNonstandard) return [`${name} needs to have a valid ability.`];
			const pokemonWithAbility = teamHas.abilityMap[ability.id];
			if (!pokemonWithAbility) return [`${ability.name} is not available on a legal Pok\u00e9mon.`];

			(this.format as any).debug = true;

			if (!teamHas.abilitySources) teamHas.abilitySources = Object.create(null);
			const validSources: string[] = teamHas.abilitySources[this.toID(set.species)] = []; // Evolution families

			let canonicalSource = ''; // Specific for the basic implementation of Donor Clause (see onValidateTeam).

			for (const donor of pokemonWithAbility) {
				const donorSpecies = this.dex.species.get(donor);
				let format = this.format;
				if (!format.getEvoFamily) format = this.dex.formats.get('gen9inheritance');
				const evoFamily = format.getEvoFamily!(donorSpecies.id);
				if (validSources.includes(evoFamily)) continue;

				set.species = donorSpecies.name;
				set.name = donorSpecies.baseSpecies;
				const problems = this.validateSet(set, teamHas) || [];
				if (!problems.length) {
					validSources.push(evoFamily);
					canonicalSource = donorSpecies.name;
				}
				// Specific for the basic implementation of Donor Clause (see onValidateTeam).
				if (validSources.length > 1) break;
			}
			(this.format as any).debug = false;

			set.name = name;
			set.species = species.name;
			if (!validSources.length) {
				if (pokemonWithAbility.length > 1) return [`${name}'s set is illegal.`];
				return [`${name} has an illegal set with an ability from ${this.dex.species.get(pokemonWithAbility[0]).name}.`];
			}

			// Protocol: Include the data of the donor species in the `ability` data slot.
			// Afterwards, we are going to reset the name to what the user intended.
			set.ability = `${set.ability}0${canonicalSource}`;
			return null;
		},
		onValidateTeam(team, f, teamHas) {
			if (this.ruleTable.has('abilityclause')) {
				const abilityTable = new Map<string, number>();
				const base: {[k: string]: string} = {
					airlock: 'cloudnine',
					armortail: 'queenlymajesty',
					battlearmor: 'shellarmor',
					clearbody: 'whitesmoke',
					dazzling: 'queenlymajesty',
					emergencyexit: 'wimpout',
					filter: 'solidrock',
					gooey: 'tanglinghair',
					insomnia: 'vitalspirit',
					ironbarbs: 'roughskin',
					libero: 'protean',
					minus: 'plus',
					moxie: 'chillingneigh',
					powerofalchemy: 'receiver',
					propellertail: 'stalwart',
					teravolt: 'moldbreaker',
					turboblaze: 'moldbreaker',
				};
				const num = parseInt(this.ruleTable.valueRules.get('abilityclause')!);
				for (const set of team) {
					let ability = this.toID(set.ability.split('0')[0]);
					if (!ability) continue;
					if (ability in base) ability = base[ability] as ID;
					if ((abilityTable.get(ability) || 0) >= num) {
						return [
							`You are limited to ${num} of each ability by ${num} Ability Clause.`,
							`(You have more than ${num} ${this.dex.abilities.get(ability).name} variants)`,
						];
					}
					abilityTable.set(ability, (abilityTable.get(ability) || 0) + 1);
				}
			}

			// Donor Clause
			const evoFamilyLists = [];
			for (const set of team) {
				const abilitySources = teamHas.abilitySources?.[this.dex.toID(set.species)];
				if (!abilitySources) continue;
				let format = this.format;
				if (!format.getEvoFamily) format = this.dex.formats.get('gen9inheritance');
				evoFamilyLists.push(abilitySources.map(format.getEvoFamily!));
			}

			// Checking actual full incompatibility would require expensive algebra.
			// Instead, we only check the trivial case of multiple Pokémon only legal for exactly one family. FIXME?
			const requiredFamilies = Object.create(null);
			for (const evoFamilies of evoFamilyLists) {
				if (evoFamilies.length !== 1) continue;
				const [familyId] = evoFamilies;
				if (!(familyId in requiredFamilies)) {
					requiredFamilies[familyId] = 1;
				} else {
					requiredFamilies[familyId]++;
				}
				if (requiredFamilies[familyId] > 1) {
					return [
						`You are limited to up to one inheritance from each evolution family by the Donor Clause.`,
						`(You inherit more than once from ${this.dex.species.get(familyId).name}).`,
					];
				}
			}
		},
		onBegin() {
			for (const pokemon of this.getAllPokemon()) {
				if (pokemon.baseAbility.includes('0')) {
					const donor = pokemon.baseAbility.split('0')[1];
					pokemon.m.donor = this.toID(donor);
					pokemon.baseAbility = this.toID(pokemon.baseAbility.split('0')[0]);
					pokemon.ability = pokemon.baseAbility;
				}
			}
		},
		onSwitchIn(pokemon) {
			if (!pokemon.m.donor) return;
			const donorTemplate = this.dex.species.get(pokemon.m.donor);
			if (!donorTemplate.exists) return;
			// Place volatiles on the Pokémon to show the donor details.
			this.add('-start', pokemon, donorTemplate.name, '[silent]');
		},
	},

	// Challengeable OMs
	///////////////////////////////////////////////////////////////////

	{
		section: "Challengeable OMs",
		column: 2,
	},
	{
		name: "[Gen 9] Camomons",
		desc: `Pok&eacute;mon have their types set to match their first two moves.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3711340/">Camomons</a>`,
		],

		mod: 'gen9',
		searchShow: false,
		ruleset: ['Standard OMs', 'Sleep Clause Mod', 'Evasion Items Clause', 'Evasion Abilities Clause', 'Terastal Clause', 'Camomons Mod', 'Min Source Gen = 9'],
		banlist: [
			'Arceus', 'Baxcalibur', 'Calyrex-Ice', 'Calyrex-Shadow', 'Chi-Yu', 'Chien-Pao', 'Dialga', 'Dialga-Origin', 'Dragonite', 'Drednaw', 'Enamorus-Base',
			'Espathra', 'Eternatus', 'Flutter Mane', 'Giratina', 'Giratina-Origin', 'Groudon', 'Iron Bundle', 'Koraidon', 'Kyogre', 'Landorus-Base', 'Magearna',
			'Mewtwo', 'Miraidon', 'Palafin', 'Palkia', 'Palkia-Origin', 'Rayquaza', 'Roaring Moon', 'Sneasler', 'Spectrier', 'Tornadus-Therian', 'Volcarona',
			'Zacian', 'Zacian-Crowned', 'Zamazenta-Crowned', 'Arena Trap', 'Moody', 'Shadow Tag', 'Booster Energy', 'King\'s Rock', 'Baton Pass', 'Last Respects',
			'Shed Tail',
		],
	},
	{
		name: "[Gen 9] Convergence",
		desc: `Allows all Pok&eacute;mon that have identical types to share moves and abilities.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3714048/">Convergence</a>`,
		],

		mod: 'gen9',
		searchShow: false,
		ruleset: ['Standard OMs', 'Sleep Clause Mod', 'Convergence Legality', '!Obtainable Abilities', 'Min Source Gen = 9'],
		banlist: [
			'Arceus', 'Calyrex-Ice', 'Calyrex-Shadow', 'Chi-Yu', 'Dialga', 'Dialga-Origin', 'Dondozo', 'Eternatus', 'Flutter Mane', 'Giratina', 'Giratina-Origin',
			'Groudon', 'Inteleon', 'Iron Bundle', 'Iron Hands', 'Koraidon', 'Kyogre', 'Landorus-Base', 'Magearna', 'Mewtwo', 'Miraidon', 'Palafin', 'Palkia',
			'Palkia-Origin', 'Rayquaza', 'Regieleki', 'Slaking', 'Spectrier', 'Urshifu-Base', 'Zacian', 'Zacian-Crowned', 'Zamazenta', 'Zamazenta-Crowned',
			'Arena Trap', 'Comatose', 'Imposter', 'Moody', 'Pure Power', 'Shadow Tag', 'Speed Boost', 'Damp Rock', 'King\'s Rock', 'Baton Pass', 'Extreme Speed',
			'Last Respects', 'Quiver Dance', 'Rage Fist', 'Shed Tail', 'Shell Smash', 'Spore', 'Transform',
		],
	},
	{
		name: "[Gen 9] National Dex BH",
		desc: `Balanced Hackmons with National Dex elements mixed in.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3711099/">National Dex BH</a>`,
		],

		mod: 'gen9',
		searchShow: false,
		ruleset: ['Standard OMs', 'Ability Clause = 2', 'Sleep Moves Clause', 'Min Source Gen = 9'],
		banlist: [
			'Basculin-White-Striped', 'Girafarig', 'Miraidon', 'Scyther', 'Sneasel', 'Sneasel-Hisui', 'Ursaring', 'Arena Trap', 'Huge Power', 'Ice Scales',
			'Pure Power', 'Shadow Tag', 'Speed Boost', 'Moody', 'King\'s Rock', 'Baton Pass', 'Revival Blessing',
		],
		restricted: ['Gallade', 'Gholdengo'],
		onValidateTeam(team) {
			const names = new Set<ID>();
			for (const set of team) {
				const species = this.dex.species.get(set.species);
				if (!this.ruleTable.isRestrictedSpecies(species)) continue;
				restrictedPokemonCount.set(species.baseSpecies, (restrictedPokemonCount.get(species.baseSpecies) || 0) + 1);
			}
			for (const [baseSpecies, count] of restrictedPokemonCount) {
				if (count > 1) {
					return [
						`You are limited to one ${baseSpecies} forme.`,
						`(You have ${count} ${baseSpecies} forme${count === 1 ? '' : 's'}.)`,
					];
				}
			}
		},
	},
	{
		name: "[Gen 9] Super Smash Stereotypes",
		desc: [
			"<b>Super Smash Stereotypes</b>: A project that aims to create a micrometa containing a Pokemon from other mods for all 171 possible types.",
		],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3713983/">Fortemons</a>`,
		],

		mod: 'gen9',
		searchShow: false,
		ruleset: ['Standard OMs', 'Sleep Clause Mod', 'Min Source Gen = 9'],
		banlist: [
			'Annihilape', 'Arceus', 'Calyrex-Ice', 'Calyrex-Shadow', 'Chi-Yu', 'Chien-Pao', 'Cloyster', 'Darkrai', 'Dialga-Base', 'Dragonite', 'Espathra',
			'Eternatus', 'Flutter Mane', 'Giratina-Base', 'Great Tusk', 'Groudon', 'Iron Bundle', 'Koraidon', 'Kyogre', 'Magearna', 'Mewtwo', 'Miraidon',
			'Palafin', 'Palkia', 'Palkia-Origin', 'Rayquaza', 'Regieleki', 'Shaymin-Sky', 'Spectrier', 'Sneasler', 'Urshifu-Base', 'Zacian', 'Zacian-Crowned',
			'Zamazenta-Base', 'Arena Trap', 'Moody', 'Serene Grace', 'Shadow Tag', 'Damp Rock', 'Heat Rock', 'Baton Pass', 'Beat Up', 'Last Respects',
		],
		restricted: [
			'Dynamic Punch', 'Flail', 'Flip Turn', 'Fury Cutter', 'Grass Knot', 'Grassy Glide', 'Heavy Slam', 'Inferno',
			'Low Kick', 'Nuzzle', 'Power Trip', 'Reversal', 'Spit Up', 'Stored Power', 'Volt Switch', 'Zap Cannon',
		],
		onValidateTeam(team) {
			const itemTable = new Set<string>();
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if ( template.tier !== 'SSS') {
					return [set.species + ' is not usable in Super Smash Stereotypes.'];
				}
			}
		},
		mod: 'smashstereotypes',
	},
	{
		name: "[Gen 9] Triple Threat",
		desc: [
			"<b>Triple Threat</b>: A micrometa where Pokemon are allowed to have up to three types.",
		],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/triple-threat-slate-2-dragon-fairy-steel.3722322">Triple Threat on Smogon Forums</a>`,
		      ],
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Z-Move Clause', 'Data Mod', 'Mega Data Mod'],
		banlist: [],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if ( template.tier !== 'TT') {
					return [set.species + ' is not usable in Triple Threat.'];
				}
			}
		},
		onModifyTypePriority: 1,
		onModifyType(move, pokemon, target) {
			const forte = pokemon.m.forte;
			if (move.category !== 'Status' && forte) {
				this.singleEvent('ModifyType', forte, null, pokemon, target, move, move);
			}
		},
		onHitPriority: 1,
		onHit(target, source, move) {
			const forte = source.m.forte;
			if (move?.category !== 'Status' && forte) {
				this.singleEvent('Hit', forte, {}, target, source, move);
				if (forte.self) this.singleEvent('Hit', forte.self, {}, source, source, move);
				this.singleEvent('AfterHit', forte, {}, target, source, move);
			}
		},
		onAfterSubDamage(damage, target, source, move) {
			const forte = source.m.forte;
			if (move?.category !== 'Status' && forte) {
				this.singleEvent('AfterSubDamage', forte, null, target, source, move, damage);
			}
		},
		onModifySecondaries(secondaries, target, source, move) {
			if (secondaries.some(s => !!s.self)) move.selfDropped = false;
		},
		onAfterMoveSecondaryPriority: 1,
		onAfterMoveSecondarySelf(source, target, move) {
			const forte = source.m.forte;
			if (move?.category !== 'Status' && forte) {
				this.singleEvent('AfterMoveSecondarySelf', forte, null, source, target, move);
			}
		},
		onBasePowerPriority: 1,
		onBasePower(basePower, source, target, move) {
			const forte = source.m.forte;
			if (move.category !== 'Status' && forte?.onBasePower) {
				forte.onBasePower.call(this, basePower, source, target, move);
			}
		},
		pokemon: {
			getItem() {
				const move = this.battle.dex.moves.get(this.m.forte);
				if (!move.exists) return Object.getPrototypeOf(this).getItem.call(this);
				return {
					...this.battle.dex.items.get('mail'),
					name: move.name, id: move.id, ignoreKlutz: true, onTakeItem: false,
				};
			},
		},
	},
	{
		name: "[Gen 9] Full Potential",
		desc: `Pok&eacute;mon's moves hit off of their highest stat.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3711127/">Full Potential</a>`,
		],

		mod: 'fullpotential',
		searchShow: false,
		ruleset: ['Standard OMs', 'Evasion Abilities Clause', 'Evasion Items Clause', 'Sleep Moves Clause', 'Terastal Clause', 'Min Source Gen = 9'],
		banlist: [
			'Arceus', 'Calyrex-Ice', 'Calyrex-Shadow', 'Dialga', 'Dialga-Origin', 'Dragapult', 'Eternatus', 'Giratina', 'Giratina-Origin', 'Groudon',
			'Iron Bundle', 'Koraidon', 'Kyogre', 'Mewtwo', 'Miraidon', 'Palkia', 'Palkia-Origin', 'Rayquaza', 'Regieleki', 'Scream Tail', 'Shaymin-Sky',
			'Spectrier', 'Zacian', 'Zacian-Crowned', 'Zamazenta', 'Zamazenta-Crowned', 'Arena Trap', 'Chlorophyll', 'Drought', 'Moody', 'Sand Rush',
			'Shadow Tag', 'Slush Rush', 'Swift Swim', 'Unburden', 'Booster Energy', 'Choice Scarf', 'Heat Rock', 'King\'s Rock', 'Baton Pass', 'Shed Tail',
			'Tailwind',
		],
	},
	{
		name: "[Gen 8] Alternatium",
		desc: `<b>Alternatium</b>: A metagame made up of only Pokemon with alternate forms exist, with all of them being seperate and unique Pokemon.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/alternatium-slate-7-slow-twins-slate-also-vote-in-poll.3683767/">Alternatium on Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1bvvkPg1CrUBJFJJeuwkts8elfJcEcahGOoHm-vGBXOI/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: 'pokebilities',
		searchShow: false,
		ruleset: ['Standard OMs', 'Sleep Clause Mod', 'Min Source Gen = 9'],
		banlist: [
			'Arceus', 'Calyrex-Ice', 'Calyrex-Shadow', 'Chi-Yu', 'Dialga', 'Dialga-Origin', 'Espathra', 'Eternatus', 'Flutter Mane', 'Giratina',
			'Giratina-Origin', 'Groudon', 'Iron Bundle', 'Koraidon', 'Kyogre', 'Landorus-Base', 'Miraidon', 'Mewtwo', 'Palafin', 'Palkia',
			'Palkia-Origin', 'Rayquaza', 'Regieleki', 'Spectrier', 'Zacian', 'Zacian-Crowned', 'Arena Trap', 'Moody', 'Shadow Tag', 'King\'s Rock',
			'Baton Pass', 'Shed Tail', 'Last Respects',
		],
		onValidateSet(set) {
			const species = this.dex.species.get(set.species);
			const unSeenAbilities = Object.keys(species.abilities)
				.filter(key => key !== 'S' && (key !== 'H' || !species.unreleasedHidden))
				.map(key => species.abilities[key as "0" | "1" | "H" | "S"])
				.filter(ability => ability !== set.ability);
			if (unSeenAbilities.length && this.toID(set.ability) !== this.toID(species.abilities['S'])) {
				for (const abilityName of unSeenAbilities) {
					const banReason = this.ruleTable.check('ability:' + this.toID(abilityName));
					if (banReason) {
						return [`${set.name}'s ability ${abilityName} is ${banReason}.`];
					}
				}
			}
		},
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
		onBeforeSwitchIn(pokemon) {
			// Abilities that must be applied before both sides trigger onSwitchIn to correctly
			// handle switch-in ability-to-ability interactions, e.g. Intimidate counters
			const neededBeforeSwitchInIDs = [
				'clearbody', 'competitive', 'contrary', 'defiant', 'fullmetalbody', 'hypercutter', 'innerfocus',
				'mirrorarmor', 'oblivious', 'owntempo', 'rattled', 'scrappy', 'simple', 'whitesmoke',
			];
			if (pokemon.m.innates) {
				for (const innate of pokemon.m.innates) {
					if (!neededBeforeSwitchInIDs.includes(innate)) continue;
					if (pokemon.hasAbility(innate)) continue;
					pokemon.addVolatile("ability:" + innate, pokemon);
				}
			}
		},
		onSwitchInPriority: 2,
		onSwitchIn(pokemon) {
			if (pokemon.m.innates) {
				for (const innate of pokemon.m.innates) {
					if (pokemon.hasAbility(innate)) continue;
					pokemon.addVolatile("ability:" + innate, pokemon);
				}
			}
		},
		onSwitchOut(pokemon) {
			for (const innate of Object.keys(pokemon.volatiles).filter(i => i.startsWith('ability:'))) {
				pokemon.removeVolatile(innate);
			}
		},
		onFaint(pokemon) {
			for (const innate of Object.keys(pokemon.volatiles).filter(i => i.startsWith('ability:'))) {
				const innateEffect = this.dex.conditions.get(innate) as Effect;
				this.singleEvent('End', innateEffect, null, pokemon);
			}
		},
		onAfterMega(pokemon) {
			for (const innate of Object.keys(pokemon.volatiles).filter(i => i.startsWith('ability:'))) {
				pokemon.removeVolatile(innate);
			}
			pokemon.m.innates = undefined;
		},
	},
	{
		name: "[Gen 9] Pure Hackmons",
		desc: `Anything directly hackable onto a set (EVs, IVs, forme, ability, item, and move) and is usable in local battles is allowed.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3712086/">Pure Hackmons</a>`,
		],

		mod: 'gen9',
		searchShow: false,
		ruleset: ['Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Hackmons Forme Legality', 'Species Reveal Clause', 'Endless Battle Clause'],
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
		ruleset: ['Standard NatDex'],
		unbanlist: ['Dragapult', 'Tornadus-Therian', 'Blaziken', 'Greninja-Ash', 'Kyurem'], 
		banlist: [
			'Arceus', 'Barraskewda', 'Calyrex-Ice', 'Calyrex-Shadow', 'Chi-Yu', 'Dialga', 'Dialga-Origin', 'Dragonite', 'Espathra', 'Eternatus',
			'Flutter Mane', 'Giratina', 'Giratina-Origin', 'Groudon', 'Iron Bundle', 'Koraidon', 'Kyogre', 'Landorus-Base', 'Mewtwo', 'Miraidon',
			'Noivern', 'Palafin', 'Palkia', 'Palkia-Origin', 'Rayquaza', 'Spectrier', 'Urshifu-Base', 'Zacian', 'Zacian-Crowned', 'Zamazenta-Crowned',
			'Arena Trap', 'Moody', 'Shadow Tag', 'King\'s Rock', 'Baton Pass', 'Last Respects',
		],
		restricted: ['U-turn', 'Volt Switch'],
	},
	{
		name: "[Gen 8] Bust A Move",
		desc: [
			"<b>Bust A Move</b>: A Pet Mod where previously competitively useless moves are given much needed makeovers.",
		  ],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3711011/">Shared Power</a>`,
		],

		mod: 'sharedpower',
		searchShow: false,
		ruleset: ['Standard OMs', 'Evasion Abilities Clause', 'Evasion Items Clause', 'Sleep Moves Clause', 'Terastal Clause', 'Min Source Gen = 9'],
		banlist: [
			'Arceus', 'Calyrex-Shadow', 'Chien-Pao', 'Gholdengo', 'Koraidon', 'Komala', 'Miraidon', 'Numel', 'Persian-Alola', 'Raichu-Alola', 'Rayquaza',
			'Slowbro-Galar', 'Zacian-Crowned', 'Arena Trap', 'Armor Tail', 'Chlorophyll', 'Contrary', 'Dazzling', 'Huge Power', 'Illusion', 'Imposter',
			'Magic Bounce', 'Magic Guard', 'Magnet Pull', 'Mold Breaker', 'Moody', 'Neutralizing Gas', 'Poison Heal', 'Prankster', 'Pure Power', 'Purifying Salt',
			'Queenly Majesty', 'Quick Feet', 'Regenerator', 'Sand Rush', 'Shadow Tag', 'Slush Rush', 'Speed Boost', 'Stakeout', 'Stench', 'Sturdy', 'Swift Swim',
			'Tinted Lens', 'Unaware', 'Unburden', 'Starf Berry', 'King\'s Rock', 'Baton Pass',
		],
		onValidateRule() {
			if (this.format.gameType !== 'singles') {
				throw new Error(`Shared Power currently does not support ${this.format.gameType} battles.`);
			}
		},
		getSharedPower(pokemon) {
			const sharedPower = new Set<string>();
			for (const ally of pokemon.side.pokemon) {
				if (ally.previouslySwitchedIn > 0) {
					if (pokemon.battle.dex.currentMod !== 'sharedpower' && ['trace', 'mirrorarmor'].includes(ally.baseAbility)) {
						sharedPower.add('noability');
						continue;
					}
					sharedPower.add(ally.baseAbility);
				}
			}
			sharedPower.delete(pokemon.baseAbility);
			return sharedPower;
		},
		onBeforeSwitchIn(pokemon) {
			let format = this.format;
			if (!format.getSharedPower) format = this.dex.formats.get('gen9sharedpower');
			for (const ability of format.getSharedPower!(pokemon)) {
				const effect = 'ability:' + ability;
				pokemon.volatiles[effect] = {id: this.toID(effect), target: pokemon};
				if (!pokemon.m.abils) pokemon.m.abils = [];
				if (!pokemon.m.abils.includes(effect)) pokemon.m.abils.push(effect);
			}
		},
		onSwitchInPriority: 2,
		onSwitchIn(pokemon) {
			let format = this.format;
			if (!format.getSharedPower) format = this.dex.formats.get('gen9sharedpower');
			for (const ability of format.getSharedPower!(pokemon)) {
				if (ability === 'noability') {
					this.hint(`Mirror Armor and Trace break in Shared Power formats that don't use Shared Power as a base, so they get removed from non-base users.`);
				}
				const effect = 'ability:' + ability;
				delete pokemon.volatiles[effect];
				pokemon.addVolatile(effect);
			}
		},
	},
	{
		name: "[Gen 9] Sharing is Caring",
		desc: `All Pok&eacute;mon on a team share their items.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3727118/">Sharing is Caring</a>`,
		],

		mod: 'sharingiscaring',
		searchShow: false,
		ruleset: ['Standard OMs', 'Evasion Items Clause', 'Sleep Moves Clause', 'Min Source Gen = 9'],
		banlist: [
			'Arceus', 'Calyrex-Ice', 'Calyrex-Shadow', 'Chi-Yu', 'Chien-Pao', 'Darkrai', 'Dialga', 'Dialga-Origin', 'Espathra', 'Eternatus', 'Flutter Mane',
			'Giratina', 'Giratina-Origin', 'Groudon', 'Iron Bundle', 'Koraidon', 'Kyogre', 'Landorus-Base', 'Magearna', 'Mewtwo', 'Miraidon', 'Palafin', 'Palkia',
			'Palkia-Origin', 'Rayquaza', 'Regieleki', 'Shaymin-Sky', 'Spectrier', 'Urshifu-Base', 'Zacian', 'Zacian-Crowned', 'Zamazenta', 'Zamazenta-Crowned',
			'Arena Trap', 'Moody', 'Shadow Tag', 'Choice Scarf', 'Focus Band', 'Focus Sash', 'King\'s Rock', 'Quick Claw', 'Razor Fang', 'Baton Pass',
			'Last Respects', 'Revival Blessing', 'Shed Tail',
		],
		onValidateRule() {
			if (this.format.gameType !== 'singles') {
				throw new Error(`Sharing is Caring currently does not support ${this.format.gameType} battles.`);
			}
		},
		getSharedItems(pokemon) {
			const items = new Set<string>();
			for (const ally of pokemon.side.pokemon) {
				if (!ally.item) continue;
				items.add(ally.item);
			}
			items.delete(pokemon.item);
			return items;
		},
		onBeforeSwitchIn(pokemon) {
			let format = this.format;
			if (!format.getSharedItems) format = this.dex.formats.get('gen9sharingiscaring');
			for (const item of format.getSharedItems!(pokemon)) {
				const effect = 'item:' + item;
				pokemon.volatiles[effect] = {id: this.toID(effect), target: pokemon};
				if (!pokemon.m.items) pokemon.m.items = [];
				if (!pokemon.m.items.includes(effect)) pokemon.m.items.push(effect);
			}
		},
		onSwitchInPriority: 2,
		onSwitchIn(pokemon) {
			let format = this.format;
			if (!format.getSharedItems) format = this.dex.formats.get('gen9sharingiscaring');
			for (const item of format.getSharedItems!(pokemon)) {
				const effect = 'item:' + item;
				delete pokemon.volatiles[effect];
				pokemon.addVolatile(effect);
			}
		},
	},
	{
		name: "[Gen 2] Crystal: Sevii Islands",
		desc: ["<b>Crystal: Sevii Islands</b>- A Gen 2 pet mod that aims to create new Pokemon, items, and moves for the GSC OU Metagame."],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3715801/">Tera Donation</a>`,
		],

		mod: 'gen9',
		searchShow: false,
		ruleset: ['Standard OMs', 'Sleep Moves CLause', 'Tera Type Preview', 'Min Source Gen = 9'],
		banlist: [
			'Annihilape', 'Arceus', 'Calyrex-Ice', 'Calyrex-Shadow', 'Chi-Yu', 'Chien-Pao', 'Cyclizar', 'Dialga', 'Dialga-Origin', 'Espathra', 'Eternatus',
			'Giratina', 'Giratina-Origin', 'Groudon', 'Flutter Mane', 'Hoopa-Unbound', 'Iron Bundle', 'Koraidon', 'Kyogre', 'Landorus-Base', 'Mewtwo',
			'Miraidon', 'Palafin', 'Palkia', 'Palkia-Origin', 'Rayquaza', 'Urshifu-Base', 'Zacian', 'Zacian-Crowned', 'Zamazenta-Crowned', 'Arena Trap',
			'Moody', 'Shadow Tag', 'Booster Energy', 'Heat Rock', 'King\'s Rock', 'Baton Pass', 'Last Respects',
		],
		onSwitchIn(pokemon) {
			if (this.turn === 0) {
				this.actions.terastallize(pokemon);
				const teraType = pokemon.teraType;
				for (const poke of pokemon.side.pokemon) {
					poke.m.thirdType = teraType;
				}
			}
			if (!pokemon.terastallized) {
				this.add('-start', pokemon, 'typechange', (pokemon.illusion || pokemon).getTypes(true).join('/'), '[silent]');
			}
		},
		onModifyMove(move, pokemon, target) {
			if (move.id === 'terablast') {
				const teraType = pokemon.m.thirdType;
				if (teraType && pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) {
					move.category = 'Physical';
				}
			}
		},
		onModifyType(move, pokemon, target) {
			if (move.id === 'terablast') {
				const teraType = pokemon.m.thirdType;
				if (teraType) {
					move.type = teraType;
				}
			}
		},
		pokemon: {
			getTypes(excludeAdded, preterastallized) {
				if (!preterastallized && this.terastallized) return [this.terastallized];
				const types = this.battle.runEvent('Type', this, null, null, this.types);
				if (!excludeAdded && this.addedType) return types.concat(this.addedType);
				const addTeraType = this.m.thirdType;
				if (types.length) {
					if (addTeraType) return Array.from(new Set([...types, addTeraType]));
					return types;
				}
				return [this.battle.gen >= 5 ? 'Normal' : '???'];
			},
		},
	},
	{
		name: "[Gen 8] Extreme Reboot",
		desc: `A metagame where the types, statuses, moves, abilities, and pokemon are rebooted.`,
		threads: [
			`<a href="https://www.smogon.com/forums/threads/3695749/">Extreme Reboot</a>`,
		],

		mod: 'thecardgame',
		searchShow: false,
		ruleset: ['Standard OMs', 'Sleep Moves Clause', 'Evasion Abilities Clause', 'Evasion Items Clause', 'Terastal Clause', 'Min Source Gen = 9'],
		banlist: [
			'Annihilape', 'Arceus', 'Baxcalibur', 'Calyrex-Ice', 'Calyrex-Shadow', 'Chi-Yu', 'Chien-Pao', 'Dialga', 'Dialga-Origin', 'Dragapult', 'Dragonite',
			'Dudunsparce', 'Eternatus', 'Giratina', 'Giratina-Origin', 'Groudon', 'Haxorus', 'Hydreigon', 'Iron Valiant', 'Kommo-o', 'Koraidon', 'Kyogre',
			'Landorus-Base', 'Mewtwo', 'Miraidon', 'Noivern', 'Palafin', 'Palkia', 'Palkia-Origin', 'Rayquaza', 'Regidrago', 'Regieleki', 'Roaring Moon',
			'Salamence', 'Ursaluna-Base', 'Urshifu-Base', 'Walking Wake', 'Zacian', 'Zacian-Crowned', 'Arena Trap', 'Moody', 'Shadow Tag', 'Baton Pass',
			'Last Respects', 'Shed Tail',
		],
		onBegin() {
			for (const pokemon of this.getAllPokemon()) {
				pokemon.hpType = pokemon.hpType.replace(/(Ghost|Fairy)/g, 'Psychic')
					.replace(/Bug/g, 'Grass')
					.replace(/Ice/g, 'Water')
					.replace(/(Rock|Ground)/g, 'Fighting')
					.replace(/Flying/g, 'Normal')
					.replace(/Poison/g, 'Dark');
				pokemon.teraType = pokemon.teraType.replace(/(Ghost|Fairy)/g, 'Psychic')
					.replace(/Bug/g, 'Grass')
					.replace(/Ice/g, 'Water')
					.replace(/(Rock|Ground)/g, 'Fighting')
					.replace(/Flying/g, 'Normal')
					.replace(/Poison/g, 'Dark');
			}
		},
		onSwitchIn(pokemon) {
			if (pokemon.species.id === 'extremeribbit') return;
			this.add('-start', pokemon, 'typechange', (pokemon.illusion || pokemon).getTypes(true).join('/'), '[silent]');
		},
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
		ruleset: ['Standard NatDex', 'Z-Move Clause', 'Data Mod', 'Mega Data Mod'],
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
		ruleset: ['Standard NatDex', 'Z-Move Clause', 'Data Mod', 'Mega Data Mod'],
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
		name: "[Gen 8] Fusion Evolution NU",
		mod: "feuu",
		desc: [
			`<b>Fusion Evolution Never Used</b>: A micrometa Pet Mod aiming to create excessively-more-balanced-than-usual "Pokemon Fusions" with unique abilities.`
		],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/fusion-evolution-never-used-slate-1-results-not-open-for-submissions.3701949/">Fusion Evolution Never Used on Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1PGYIFPSfjMtA0cGQgjyxnngJ2WODLWIH9v46_upPSOA/edit#gid=0">Spreadsheet</a>`,
		],
		ruleset: ['Standard NatDex', 'Data Mod', 'Mega Data Mod'],
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
		name: "[Gen 8] JolteMons",
		desc: [
			"<b>JolteMons</b>: A sequel to SylveMons where Pokemon, items, abilities and moves are redesigned for OU (and new items, abilities and moves are added) without changing base stats.",
		],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/joltemons-slate-1-distribution-phase.3694234/">Thread on the Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/149ZlQY0bJIAqfWB_233Dvbpqs3pVSHYpIoAQQkwquls/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: 'gen8joltemons',	
		teambuilderFormat: 'OU',
		ruleset: ['Standard NatDex', 'Data Mod', 'Mega Data Mod'],
		unbanlist: ['Dragapult', 'Tornadus-Therian', 'Blaziken', 'Greninja-Ash', 'Moody', 'Shaymin-Sky', 'Kangaskhan-Mega', 'Darmanitan-Galar', 'Metagross-Mega'],
		banlist: ['Uber', 'Arena Trap', 'Power Construct', 'Shadow Tag', 'Baton Pass', 'Arceus', 'Blazikenite', 'Blastoisinite', 'Darkrai', 'Deoxys-Base', 'Deoxys-Attack', 'Deoxys-Speed', 'Dialga', 'Genesect', 'Gengarite', 'Giratina', 'Giratina-Origin', 'Groudon', 'Ho-Oh', 'Kyogre', 'Kyurem-Black', 'Kyurem-White', 'Landorus-Base', 'Lugia', 'Lunala', 'Marshadow', 'Mewtwo', 'Mewtwo-Mega-X', 'Mewtwo-Mega-Y', 'Naganadel', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Palkia', 'Pheromosa', 'Rayquaza', 'Reshiram', 'Salamencite', 'Solgaleo', 'Xerneas', 'Yveltal', 'Zacian', 'Zamazenta', 'Zekrom', 'Zygarde-Base', 'Berserk Gene', 'Eevee-Starter', 'Pikachu-Starter', 'Moody', 'Magearna', 'Spectrier', 'Dracovish', 'Urshifu-Base',
					'Normalium Z', 'Fairium Z', 'Fightinium Z', 'Firium Z', 'Flyinium Z', 'Darkinium Z', 'Dragonium Z', 'Buginium Z', 'Waterium Z', 'Electrium Z', 'Ghostium Z', 'Grassium Z', 'Groundium Z', 'Icium Z', 'Poisonium Z', 'Psychium Z', 'Rockium Z', 'Steelium Z', 'Decidium Z', 'Kommonium Z',
					'Bright Powder', 'Lax Incense', 'King\'s Rock', 'Razor Fang'],
	},
	{
		name: "[Gen 9 Pre-DLC] Doubles OU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3710876/">Doubles OU Sample Teams</a>`,
		],

		mod: 'gen9',
		searchShow: false,
		gameType: 'doubles',
		ruleset: ['Standard Doubles'],
		banlist: ['DUber', 'Shadow Tag'],
	},
	{
		name: "[Gen 9 Pre-DLC] Doubles Ubers",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3712864/">Doubles Ubers</a>`,
		],

		mod: 'gen9predlc',
		searchShow: false,
		gameType: 'doubles',
		ruleset: ['Standard Doubles', '!Gravity Sleep Clause'],
	},
	{
		name: "[Gen 9 Pre-DLC] Doubles UU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3712825/">Doubles UU</a>`,
		],

		mod: 'gen9predlc',
		searchShow: false,
		gameType: 'doubles',
		ruleset: ['[Gen 9 Pre-DLC] Doubles OU'],
		banlist: ['DOU', 'DBL'],
	},
	{
		name: "[Gen 9 Pre-DLC] Doubles LC",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3710957/">Doubles LC</a>`,
		],

		mod: 'gen9predlc',
		searchShow: false,
		gameType: 'doubles',
		ruleset: ['Standard Doubles', 'Little Cup', 'Sleep Clause Mod'],
		banlist: ['Basculin-White-Striped', 'Dunsparce', 'Murkrow', 'Qwilfish-Hisui', 'Scyther', 'Sneasel', 'Sneasel-Hisui'],
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
		ruleset: ['Standard NatDex', 'Picked Team Size = 4', 'Adjust Level = 50', 'VGC Timer', 'Dynamax Clause', 'Mega Data Mod'],
		banlist: [
			'Mewtwo', 'Mew',
			'Lugia', 'Ho-Oh', 'Celebi',
			'Kyogre', 'Groudon', 'Rayquaza', 'Jirachi', 'Deoxys',
			'Dialga', 'Palkia', 'Giratina', 'Phione', 'Manaphy', 'Darkrai', 'Shaymin', 'Arceus',
			'Victini', 'Reshiram', 'Zekrom', 'Kyurem', 'Keldeo', 'Meloetta', 'Genesect',
			'Xerneas', 'Yveltal', 'Zygarde', 'Diancie', 'Hoopa', 'Volcanion',
			'Cosmog', 'Cosmoem', 'Solgaleo', 'Lunala', 'Necrozma', 'Magearna', 'Marshadow', 'Zeraora',
			'Zacian', 'Zamazenta', 'Eternatus', 'Zarude', 'Calyrex',
		],
		mod: 'm4av6',
		onValidateSet(set) {
			// These Pokemon are still unobtainable
			const unobtainables = [
				'Eevee-Starter', 'Floette-Eternal', 'Pichu-Spiky-eared', 'Pikachu-Belle', 'Pikachu-Cosplay', 'Pikachu-Libre',
				'Pikachu-PhD', 'Pikachu-Pop-Star', 'Pikachu-Rock-Star', 'Pikachu-Starter', 'Eternatus-Eternamax',
			];
			const species = this.dex.species.get(set.species);
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
		name: "[Gen 8] M4A Kalos VGC",
		desc: ["<b>Megas for All</b>: A Pet Mod that aims to create unique Mega Evolutions for every fully evolved Pokémon. Current season is focused on the Kalos dex!",
		      ],
		threads: [
				`&bullet; <a href="https://www.smogon.com/forums/threads/3671140/">Megas for All v7 on Smogon Forums</a>`,
				`&bullet; <a href="https://docs.google.com/spreadsheets/d/1TdeAUUtjh0f_tcIBllbF_imgepwV-dV2YomoTCRlPgI/edit?usp=sharing">Spreadsheet</a>`,
				`&bullet; <a href="http://megasforall.wikidot.com/">Wiki</a>`
		      ],
		gameType: 'doubles',
		ruleset: ['Standard NatDex', 'Picked Team Size = 4', 'Adjust Level = 50', 'VGC Timer', 'Z-Move Clause', 'Dynamax Clause', 'Terastal Clause', 'Mega Data Mod'],
		banlist: [
			'Xerneas', 'Yveltal', 'Zygarde', 'Diancie', 'Hoopa-Unbound', 'Volcanion',
			// legalizes Hoopa-Confined, and only Hoopa-Confined, because it has a Mega specific to this season! (confirmed by Blue)
		],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (template.tier !== 'Mega' && template.tier !== 'Kalos' && template.tier !== 'Kalos (NFE)') {
					return [set.species + ' is not a part of the Kalos Pokédex.'];
				}
			}
		},
		onValidateSet(set) {
			const problems: string[] = [];
			const setHas: {[k: string]: true} = {};
			let species = this.dex.species.get(set.species);
			let item = this.dex.items.get(set.item);
			let tierSpecies = species;

			if (item.megaEvolves === species.name) {
				if (item.megaStone && this.dex.species.get(item.megaStone).tier !== 'Mega') return [item.name + ' is not a legal Mega Stone.'];
			}
		},
		mod: 'm4akalos',
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
	// {
		// name: "[Gen 8] National Dex Balanced Hackmons v3",
		// desc: `<b>More Balanced Hackmons</b>: A National Dex mod of Balanced Hackmons with new pokemon, moves, and abilities, as well as some additional bans.`,
		// threads: [
			// `&bullet; <a href="https://www.smogon.com/forums/threads/national-dex-bh-v3.3690179/">More Balanced Hackmons on Smogon Forums</a>`,
		// ],

		// mod: 'nationaldexbalancedhackmons',
		// ruleset: ['Standard NatDex', '+Nonexistent', '!Obtainable Abilities', '!Obtainable Moves', '!Obtainable Formes', /*'Forme Clause', '2 Ability Clause', 'Arceus Clause'*/], // these clauses were not recognized after gen 9 update
		// banlist: [
				// 'Groudon-Primal', 'Rayquaza-Mega', 'Shedinja', 'Cramorant-Gorging', 'Calyrex-Shadow', 'Eternatus-Eternamax', 
				// 'Arena Trap', 'Contrary', 'Gorilla Tactics', 'Huge Power', 'Illusion', 'Innards Out', 'Libero', 'Magnet Pull', 
				// 'Moody', 'Neutralizing Gas', 'Parental Bond', 'Protean', 'Pure Power', 'Shadow Tag', 'Stakeout', 'Water Bubble', 'Wonder Guard', 
				// 'Gengarite', 
				// 'Chatter', 'Octolock', 'Double Iron Bash', 'Shell Smash', 'Bolt Beak', 'Belly Drum', 'Electrify', 
				// 'Comatose + Sleep Talk', 'Imprison + Transform',
		// ],
		// onChangeSet(set) {
			// const item = this.dex.toID(set.item);
			// if (set.species === 'Zacian' && item === 'rustedsword') {
				// set.species = 'Zacian-Crowned';
				// set.ability = 'Intrepid Sword';
				// const ironHead = set.moves.indexOf('ironhead');
				// if (ironHead >= 0) {
					// set.moves[ironHead] = 'behemothblade';
				// }
			// }
			// if (set.species === 'Zamazenta' && item === 'rustedshield') {
				// set.species = 'Zamazenta-Crowned';
				// set.ability = 'Dauntless Shield';
				// const ironHead = set.moves.indexOf('ironhead');
				// if (ironHead >= 0) {
					// set.moves[ironHead] = 'behemothbash';
				// }
			// }
		// },
		// onValidateTeam(team, format){
			// /**@type {{[k: string]: true}} */
			// for (const set of team) {
				// if (set.species == 'Zacian-Crowned' && set.ability !== 'Intrepid Sword')
					 // return ["Zacian-Crowned can only have Intrepid Sword as its ability."]
				// if (set.species == 'Zacian-Crowned' && set.item !== 'Rusted Sword')
					 // return ["Zacian-Crowned can only have Rusted Sword as its item."]
				// if ((set.species !== 'Zacian-Crowned' && set.species !== 'Zacian') && set.ability === 'Intrepid Sword')
					 // return ["Only Zacian-Crowned can have Intrepid Sword as its ability."]
			// }
		// },
	// },
  //	{
   	//	name: "[Gen 8] OU Theorymon",
   	// desc: [
	   	// "<b>OU Theorymon</b>: A Sword and Shield OU metagame where low-ranked Pokemon are improved to become more viable.",
		// ],
		// threads: [
			// `&bullet; <a href="https://www.smogon.com/forums/threads/ss-ou-theorymon.3695574/">OU Theorymon on Smogon Forums</a>`,
		// ],

		// mod: 'outheorymons',
      // ruleset: ['Standard', 'Dynamax Clause', 'Data Mod'],
		// banlist: ['Uber', 'Arena Trap', 'Moody', 'Shadow Tag', 'Baton Pass'], 
	// },
	// {
		// name: "[Gen 8] Paleomons",
		// desc: [
			// "<b>Paleomons</b>: A Sword and Shield metagame that aims to create a micrometa full of ancient Pokemon."
		// ],
		// threads: [
			// `&bullet; <a href="https://www.smogon.com/forums/threads/paleomons-slate-3-non-dino-stars-dimetrodon-dodo-sea-scorpion-submission-phase.3695565/">Paleomons on Smogon Forums`,
		// ],

		// mod: 'paleomons',
		// ruleset: ['Standard NatDex', 'Z-Move Clause', 'Data Mod', 'Mega Data Mod'],
		// banlist: [
			// 'Arena Trap', 'Moody', 'Shadow Tag', 'Baton Pass',
		// ],
		// onValidateTeam(team, format) {
			// /**@type {{[k: string]: true}} */
			// let speciesTable = {};
			// let allowedTiers = ['Paleomons', 'Paleomons NFE', 'Paleomons LC'];
			// for (const set of team) {
				// let template = this.dex.species.get(set.species);
				// if (template.tier !== 'Paleomons' && template.tier !== 'Paleomons NFE' && template.tier !== 'Paleomons LC') {
					// return [set.species + ' is not legal in the Paleomons format.'];
				// }
			// }
		// },
	// },
	{
		name: "[Gen 8] Restrictions",
		desc: `<b>Restrictions</b>: A metagame made up of brand new Pok&eacute;mon that are made according to various random and non-random restrictions.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3673824/">Restrictions on Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1XsplBqN8njHZJT9cTP_3i3YSFITB9WaVfNOYAbNY75M/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: 'restrictions',
		ruleset: ['Standard', 'Dynamax Clause', 'Data Mod'],
		banlist: ['uber', 'ou', 'uubl', 'uu', 'rubl', 'ru', 'nubl', 'nu', 'publ', 'pu', 'zu', 'nfe', /*'lcuber',*/ 'lc', 'cap', 'caplc', 'capnfe', 'ag','past', 'future', 'lgpe'],
		teambuilderBans: ['unreleased'],
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
		banlist: ['uber', 'ou', 'uubl', 'uu', 'rubl', 'ru', 'nubl', 'nu', 'publ', 'pu', 'zu', 'nfe', 'lc', 'cap', 'caplc', 'capnfe', 'ag','past', 'future', 'lgpe'],
		teambuilderBans: ['unreleased'],
	},
	{
		name: "[Gen 8] Stereotypes",
		mod: "stereotypes",
		desc: [
			"<b>Stereotypes</b>: A project that aims to create a micrometa containing a unique new Pokemon for all 171 possible types, with the hope that each mon will use its typing and the options that typing affords well, while still being balanced and interesting.",
		],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3712296/">Inheritance</a>`,
		],

		mod: 'gen9predlc',
		searchShow: false,
		ruleset: ['Standard OMs', 'Ability Clause = 1', 'Sleep Moves Clause', 'Terastal Clause', 'Min Source Gen = 9'],
		banlist: [
			'Arceus', 'Calyrex-Ice', 'Calyrex-Shadow', 'Cresselia', 'Dialga', 'Dialga-Origin', 'Dondozo', 'Dragapult', 'Enamorus-Base', 'Espathra', 'Eternatus',
			'Flittle', 'Flutter Mane', 'Giratina', 'Giratina-Origin', 'Groudon', 'Hoopa-Unbound', 'Iron Bundle', 'Koraidon', 'Kyogre', 'Magearna', 'Mewtwo',
			'Miraidon', 'Palkia', 'Palkia-Origin', 'Rayquaza', 'Regieleki', 'Samurott-Hisui', 'Slaking', 'Spectrier', 'Torkoal', 'Ursaluna', 'Urshifu-Base',
			'Zacian', 'Zacian-Crowned', 'Zamazenta', 'Zamazenta-Crowned', 'Arena Trap', 'Huge Power', 'Imposter', 'Magnet Pull', 'Moody', 'Poison Heal',
			'Pure Power', 'Shadow Tag', 'King\'s Rock', 'Baton Pass', 'Fillet Away', 'Last Respects', 'Rage Fist', 'Shed Tail', 'Shell Smash',
		],
		getEvoFamily(speciesid) {
			let species = Dex.species.get(speciesid);
			while (species.prevo) {
				const prevoSpecies = Dex.species.get(species.prevo);
				if (prevoSpecies.evos.length > 1) break;
				species = prevoSpecies;
			}
			return species.id;
		},
		validateSet(set, teamHas) {
			const unreleased = (pokemon: Species) => pokemon.tier === "Unreleased" && pokemon.isNonstandard === "Unobtainable";
			if (!teamHas.abilityMap) {
				teamHas.abilityMap = Object.create(null);
				for (const pokemon of Dex.species.all()) {
					if (pokemon.isNonstandard || (unreleased(pokemon) && !this.ruleTable.has('+unobtainable'))) continue;
					if (pokemon.requiredAbility || pokemon.requiredItem || pokemon.requiredMove) continue;
					if (this.ruleTable.isBannedSpecies(pokemon)) continue;

					for (const key of Object.values(pokemon.abilities)) {
						const abilityId = this.dex.toID(key);
						if (abilityId in teamHas.abilityMap) {
							teamHas.abilityMap[abilityId][pokemon.evos ? 'push' : 'unshift'](pokemon.id);
						} else {
							teamHas.abilityMap[abilityId] = [pokemon.id];
						}
					}
				}
			}

			const problem = this.validateForme(set);
			if (problem.length) return problem;

			const species = this.dex.species.get(set.species);
			if (!species.exists || species.num < 1) return [`The Pok\u00e9mon "${set.species}" does not exist.`];
			if (species.isNonstandard || (unreleased(species) && !this.ruleTable.has('+unobtainable'))) {
				return [`${species.name} is not obtainable in Generation ${this.dex.gen}.`];
			}

			const name = set.name;
			if (this.ruleTable.isBannedSpecies(species)) {
				return this.validateSet(set, teamHas);
			}

			const ability = this.dex.abilities.get(set.ability);
			if (!ability.exists || ability.isNonstandard) return [`${name} needs to have a valid ability.`];
			const pokemonWithAbility = teamHas.abilityMap[ability.id];
			if (!pokemonWithAbility) return [`${ability.name} is not available on a legal Pok\u00e9mon.`];

			(this.format as any).debug = true;

			if (!teamHas.abilitySources) teamHas.abilitySources = Object.create(null);
			const validSources: string[] = teamHas.abilitySources[this.toID(set.species)] = []; // Evolution families

			let canonicalSource = ''; // Specific for the basic implementation of Donor Clause (see onValidateTeam).

			for (const donor of pokemonWithAbility) {
				const donorSpecies = this.dex.species.get(donor);
				let format = this.format;
				if (!format.getEvoFamily) format = this.dex.formats.get('gen9inheritance');
				const evoFamily = format.getEvoFamily!(donorSpecies.id);
				if (validSources.includes(evoFamily)) continue;

				set.species = donorSpecies.name;
				set.name = donorSpecies.baseSpecies;
				const problems = this.validateSet(set, teamHas) || [];
				if (!problems.length) {
					validSources.push(evoFamily);
					canonicalSource = donorSpecies.name;
				}
				// Specific for the basic implementation of Donor Clause (see onValidateTeam).
				if (validSources.length > 1) break;
			}
			(this.format as any).debug = false;

			set.name = name;
			set.species = species.name;
			if (!validSources.length) {
				if (pokemonWithAbility.length > 1) return [`${name}'s set is illegal.`];
				return [`${name} has an illegal set with an ability from ${this.dex.species.get(pokemonWithAbility[0]).name}.`];
			}

			// Protocol: Include the data of the donor species in the `ability` data slot.
			// Afterwards, we are going to reset the name to what the user intended.
			set.ability = `${set.ability}0${canonicalSource}`;
			return null;
		},
		onValidateTeam(team, f, teamHas) {
			if (this.ruleTable.has('abilityclause')) {
				const abilityTable = new Map<string, number>();
				const base: {[k: string]: string} = {
					airlock: 'cloudnine',
					armortail: 'queenlymajesty',
					battlearmor: 'shellarmor',
					clearbody: 'whitesmoke',
					dazzling: 'queenlymajesty',
					emergencyexit: 'wimpout',
					filter: 'solidrock',
					gooey: 'tanglinghair',
					insomnia: 'vitalspirit',
					ironbarbs: 'roughskin',
					libero: 'protean',
					minus: 'plus',
					moxie: 'chillingneigh',
					powerofalchemy: 'receiver',
					propellertail: 'stalwart',
					teravolt: 'moldbreaker',
					turboblaze: 'moldbreaker',
				};
				const num = parseInt(this.ruleTable.valueRules.get('abilityclause')!);
				for (const set of team) {
					let ability = this.toID(set.ability.split('0')[0]);
					if (!ability) continue;
					if (ability in base) ability = base[ability] as ID;
					if ((abilityTable.get(ability) || 0) >= num) {
						return [
							`You are limited to ${num} of each ability by ${num} Ability Clause.`,
							`(You have more than ${num} ${this.dex.abilities.get(ability).name} variants)`,
						];
					}
					abilityTable.set(ability, (abilityTable.get(ability) || 0) + 1);
				}
			}

			// Donor Clause
			const evoFamilyLists = [];
			for (const set of team) {
				const abilitySources = teamHas.abilitySources?.[this.dex.toID(set.species)];
				if (!abilitySources) continue;
				let format = this.format;
				if (!format.getEvoFamily) format = this.dex.formats.get('gen9inheritance');
				evoFamilyLists.push(abilitySources.map(format.getEvoFamily!));
			}

			// Checking actual full incompatibility would require expensive algebra.
			// Instead, we only check the trivial case of multiple Pokémon only legal for exactly one family. FIXME?
			const requiredFamilies = Object.create(null);
			for (const evoFamilies of evoFamilyLists) {
				if (evoFamilies.length !== 1) continue;
				const [familyId] = evoFamilies;
				if (!(familyId in requiredFamilies)) {
					requiredFamilies[familyId] = 1;
				} else {
					requiredFamilies[familyId]++;
				}
				if (requiredFamilies[familyId] > 1) {
					return [
						`You are limited to up to one inheritance from each evolution family by the Donor Clause.`,
						`(You inherit more than once from ${this.dex.species.get(familyId).name}).`,
					];
				}
			}
		},
	},
	///////////////////////////////////////////////////////////////
	//////////////////////// Solomods /////////////////////////////
	///////////////////////////////////////////////////////////////
	{
		section: "Solomods",
		column: 2,
	},
	{
		name: "[Gen 9] A Golden Experience",
		desc: `A fun metagame where we try to make everything viable, or at least usable. We also have new Fakemons!`,
		threads: [
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1YJXE8wUNJijWSfNKIUqgObN5uEVgTliewTluGe0w4Y4/edit?usp=sharing">Spreadsheet for the mod</a>`,
		],
		mod: 'agoldenexperience',
		ruleset: ['Standard NatDex', 'Terastal Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Data Mod', 'Mega Data Mod'],
		banlist: ['Uber', 'Power Construct', 'Berserk Gene', 'Eevee-Starter', 'Pikachu-Starter', 'Moody',
					'Normalium Z', 'Fairium Z', 'Fightinium Z', 'Firium Z', 'Flyinium Z', 'Darkinium Z', 'Dragonium Z', 'Buginium Z', 'Waterium Z', 'Electrium Z', 'Ghostium Z', 'Grassium Z', 'Groundium Z', 'Icium Z', 'Poisonium Z', 'Psychium Z', 'Rockium Z', 'Steelium Z', 'Pikanium Z', 'Aloraichium Z', 'Eevium Z', 'Snorlium Z', 'Mewnium Z', 'Ultranecrozium Z', 'Pikashunium Z', 'Decidium Z', 'Incinium Z', 'Primarium Z', 'Lycanium Z', 'Mimikium Z', 'Kommonium Z', 'Tapunium Z', 'Solganium Z', 'Lunalium Z', 'Marshadium Z', 
					'Bright Powder', 'Lax Incense', 'King\'s Rock', 'Razor Fang', 'Last Respects', 'Shed Tail', 'Light Clay',
				'Rusted Sword', 'Rusted Shield'],
		teambuilderFormat: 'National Dex',
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
		name: "[Gen 9] A Golden Experience Ubers",
		desc: `A fun metagame where we try to make everything viable, or at least usable. We also have new Fakemons!`,
		threads: [
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1YJXE8wUNJijWSfNKIUqgObN5uEVgTliewTluGe0w4Y4/edit?usp=sharing">Spreadsheet for the mod</a>`,
		],
		mod: 'agoldenexperience',
		ruleset: ['Standard NatDex', 'Terastal Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Data Mod', 'Mega Data Mod'],
		banlist: ['Berserk Gene', 'Eevee-Starter', 'Pikachu-Starter', 'Moody',
					'Normalium Z', 'Fairium Z', 'Fightinium Z', 'Firium Z', 'Flyinium Z', 'Darkinium Z', 'Dragonium Z', 'Buginium Z', 'Waterium Z', 'Electrium Z', 'Ghostium Z', 'Grassium Z', 'Groundium Z', 'Icium Z', 'Poisonium Z', 'Psychium Z', 'Rockium Z', 'Steelium Z', 'Pikanium Z', 'Aloraichium Z', 'Eevium Z', 'Snorlium Z', 'Mewnium Z', 'Ultranecrozium Z', 'Pikashunium Z', 'Decidium Z', 'Incinium Z', 'Primarium Z', 'Lycanium Z', 'Mimikium Z', 'Kommonium Z', 'Tapunium Z', 'Solganium Z', 'Lunalium Z', 'Marshadium Z', 
					'Bright Powder', 'Lax Incense', 'King\'s Rock', 'Razor Fang'],
		teambuilderFormat: 'National Dex Ubers',
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
		name: "[Gen 9] A Golden Experience UU",
		desc: `A fun metagame where we try to make everything viable, or at least usable. We also have new Fakemons!`,
		threads: [
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1YJXE8wUNJijWSfNKIUqgObN5uEVgTliewTluGe0w4Y4/edit?usp=sharing">Spreadsheet for the mod</a>`,
		],
		mod: 'agoldenexperience',
		ruleset: ['Standard NatDex', 'Terastal Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Data Mod', 'Mega Data Mod'],
		banlist: ['Uber', 'OU', 'UUBL', 'Battle Bond', 'Power Construct', 'Berserk Gene', 'Eevee-Starter', 'Pikachu-Starter', 'Moody',
					'Normalium Z', 'Fairium Z', 'Fightinium Z', 'Firium Z', 'Flyinium Z', 'Darkinium Z', 'Dragonium Z', 'Buginium Z', 'Waterium Z', 'Electrium Z', 'Ghostium Z', 'Grassium Z', 'Groundium Z', 'Icium Z', 'Poisonium Z', 'Psychium Z', 'Rockium Z', 'Steelium Z', 'Pikanium Z', 'Aloraichium Z', 'Eevium Z', 'Snorlium Z', 'Mewnium Z', 'Ultranecrozium Z', 'Pikashunium Z', 'Decidium Z', 'Incinium Z', 'Primarium Z', 'Lycanium Z', 'Mimikium Z', 'Kommonium Z', 'Tapunium Z', 'Solganium Z', 'Lunalium Z', 'Marshadium Z', 
					'Bright Powder', 'Lax Incense', 'King\'s Rock', 'Razor Fang',
					'Drizzle', 'Drought', 'Aerodactylite', 'Alakazite', 'Ampharosite', 'Arbokinite', 'Baskironite', 'Blazikenite', 'Butterfrite', 'Cacturnite X', 'Centiskorchite X', 'Centiskorchite Y', 'Charizardite X', 'Charizardite Y', 'Dhelmite', 'Diancite', 'Flygonite', 'Froslassite', 'Galladite', 'Gardevoirite', 'Gengarite', 'Glalitite', 'Golisopodite', 'Gyaradosite', 'Houndoominite', 'Infarmatemite', 'Krookodite', 'Latiasite', 'Lopunnite', 'Lucarionite', 'Mawilite', 'Medichamite', 'Metagrossite', 'Ribombinite', 'Salamencite', 'Sceptilite', 'Scizorite', 'Swampertite', 'Terreptilite', 'Whiscashite',
				'Latiosite', 'Pidgeotite', 'Pinsirite', 'Sablenite', 'Darmanitan-Galar + Zen Mode', 'Light Clay'],
		teambuilderFormat: 'National Dex UU',
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
		name: "[Gen 9] Computer-Generated Teams",
		desc: `Teams generated automatically based on heuristics (rules), with levels based on previous success/failure in battle. ` +
			`Not affiliated with Random Battles formats. Some sets will by nature be worse than others, but you can report egregiously bad sets ` +
			`with <a href="https://forms.gle/DYwQN5qGVegz3YU38">this form</a>.`,

		mod: 'gen9',
		team: 'computerGenerated',
		ruleset: ['Obtainable', 'Species Clause', 'HP Percentage Mod', 'Cancel Mod', 'Sleep Clause Mod'],
	},
	{
		name: "[Gen 9] Hackmons Cup",
		desc: `Randomized teams of level-balanced Pok&eacute;mon with absolutely any ability, moves, and item.`,

		mod: 'gen9',
		team: 'randomHC',
		ruleset: ['HP Percentage Mod', 'Cancel Mod'],
		banlist: ['CAP', 'LGPE', 'MissingNo.', 'Pikachu-Cosplay', 'Pichu-Spiky-eared', 'Pokestar Smeargle', 'Pokestar UFO', 'Pokestar UFO-2', 'Pokestar Brycen-Man', 'Pokestar MT', 'Pokestar MT2', 'Pokestar Transport', 'Pokestar Giant', 'Pokestar Humanoid', 'Pokestar Monster', 'Pokestar F-00', 'Pokestar F-002', 'Pokestar Spirit', 'Pokestar Black Door', 'Pokestar White Door', 'Pokestar Black Belt', 'Pokestar UFO-PropU2', 'Xerneas-Base'],
		unbanlist: ['All Pokemon'],
	},
	{
		name: "[Gen 9] Doubles Hackmons Cup",
		desc: `Randomized teams of level-balanced Pok&eacute;mon with absolutely any ability, moves, and item. Now with TWICE the Pok&eacute;mon per side!`,

		mod: 'gen9',
		team: 'randomHC',
		searchShow: false,
		gameType: 'doubles',
		ruleset: ['[Gen 9] Hackmons Cup'],
	},
	{
		name: "[Gen 9] Broken Cup",
		desc: `[Gen 9] Hackmons Cup but with only the most powerful Pok&eacute;mon, moves, abilities, and items.`,

		team: 'randomHC',
		searchShow: false,
		ruleset: ['HP Percentage Mod', 'Cancel Mod'],
		banlist: ['All Pokemon', 'All Abilities', 'All Items', 'All Moves'],
		unbanlist: [
			'10,000,000 Volt Thunderbolt', 'Abomasnow-Mega', 'Absol-Mega', 'Accelerock', 'Acid Spray', 'Adaptability',
			'Aeroblast', 'Aerodactyl-Mega', 'Aggron', 'Aggron-Mega', 'Aguav Berry', 'Air Balloon', 'Air Slash', 'Alakazam-Mega',
			'Altaria-Mega', 'Ampharos-Mega', 'Analytic', 'Anchor Shot', 'Anger Shell', 'Annihilape', 'Anticipation', 'Apple Acid',
			'Aqua Step', 'Arcanine', 'Arcanine-Hisui', 'Archeops', 'Arena Trap', 'Armarouge', 'Armor Cannon', 'Aromatherapy',
			'Articuno', 'Articuno-Galar', 'Assault Vest', 'Astral Barrage', 'Attack Order', 'Audino-Mega', 'Aura Sphere',
			'Axe Kick', 'Azelf', 'Baddy Bad', 'Baneful Bunker', 'Banette-Mega', 'Barb Barrage', 'Basculegion', 'Basculegion-F',
			'Baton Pass', 'Baxcalibur', 'Beads of Ruin', 'Beak Blast', 'Beast Boost', 'Behemoth Bash', 'Behemoth Blade',
			'Belly Drum', 'Berserk', 'Bitter Blade', 'Bitter Malice', 'Blacephalon', 'Blastoise', 'Blastoise-Mega', 'Blaziken',
			'Blaziken-Mega', 'Blazing Torque', 'Bleakwind Storm', 'Blissey', 'Blizzard', 'Blue Flare', 'Blunder Policy',
			'Body Press', 'Body Slam', 'Bolt Beak', 'Bolt Strike', 'Boomburst', 'Bouncy Bubble', 'Brave Bird', 'Bright Powder',
			'Brute Bonnet', 'Bug Buzz', 'Buginium Z', 'Bullet Punch', 'Buzzwole', 'Buzzy Buzz', 'Calm Mind', 'Calyrex-Ice',
			'Calyrex-Shadow', 'Camerupt-Mega', 'Catastropika', 'Ceaseless Edge', 'Celebi', 'Celesteela', 'Centiskorch',
			'Ceruledge', 'Charizard', 'Charizard-Mega-X', 'Charizard-Mega-Y', 'Chatter', 'Chesnaught', 'Chesto Berry', 'Chi-Yu',
			'Chien-Pao', 'Chilan Berry', 'Chilly Reception', 'Choice Band', 'Choice Scarf', 'Choice Specs', 'Cinderace',
			'Circle Throw', 'Clanging Scales', 'Clangorous Soul', 'Clangorous Soulblaze', 'Clear Amulet', 'Close Combat',
			'Cloyster', 'Cobalion', 'Coil', 'Collision Course', 'Comatose', 'Combat Torque', 'Competitive', 'Compound Eyes',
			'Contrary', 'Core Enforcer', 'Cosmic Power', 'Cotton Guard', 'Court Change', 'Covert Cloak', 'Crabhammer',
			'Cresselia', 'Crobat', 'Custap Berry', 'Dark Pulse', 'Darkest Lariat', 'Darkinium Z', 'Darkrai', 'Darmanitan-Galar-Zen',
			'Darmanitan-Zen', 'Decidueye', 'Decidueye-Hisui', 'Defend Order', 'Defiant', 'Defog', 'Delphox', 'Deoxys',
			'Deoxys-Attack', 'Deoxys-Defense', 'Deoxys-Speed', 'Desolate Land', 'Dialga', 'Dialga-Origin', 'Diamond Storm',
			'Diancie', 'Diancie-Mega', 'Dire Claw', 'Disable', 'Discharge', 'Dondozo', 'Doom Desire', 'Double Iron Bash',
			'Download', 'Draco Meteor', 'Draco Plate', 'Dragapult', 'Dragon Ascent', 'Dragon Dance', 'Dragon Darts',
			'Dragon Energy', 'Dragon Hammer', 'Dragon Pulse', 'Dragon Tail', 'Dragonite', 'Dragonium Z', 'Drain Punch',
			'Dread Plate', 'Drill Peck', 'Drizzle', 'Drought', 'Drum Beating', 'Dry Skin', 'Duraludon', 'Dusknoir',
			'Dynamax Cannon', 'Earth Eater', 'Earth Plate', 'Earth Power', 'Earthquake', 'Eerie Spell', 'Effect Spore',
			'Eject Pack', 'Electivire', 'Electric Surge', 'Electrium Z', 'Electro Drift', 'Emboar', 'Empoleon', 'Enamorus',
			'Enamorus-Therian', 'Encore', 'Energy Ball', 'Entei', 'Eruption', 'Espeon', 'Esper Wing', 'Eternatus',
			'Eternatus-Eternamax', 'Exeggutor', 'Exeggutor-Alola', 'Expanding Force', 'Expert Belt', 'Explosion',
			'Extreme Evoboost', 'Extreme Speed', 'Fairium Z', 'Fake Out', 'Feraligatr', 'Fiery Wrath', 'Fightinium Z',
			'Figy Berry', 'Filter', 'Fire Blast', 'Fire Lash', 'Firium Z', 'First Impression', 'Fishious Rend', 'Fist Plate',
			'Flame Body', 'Flame Charge', 'Flame Plate', 'Flamethrower', 'Flare Blitz', 'Flareon', 'Flash Cannon', 'Fleur Cannon',
			'Flip Turn', 'Floaty Fall', 'Florges', 'Flower Trick', 'Fluffy', 'Flutter Mane', 'Flyinium Z', 'Focus Blast',
			'Focus Sash', 'Forewarn', 'Foul Play', 'Freeze-Dry', 'Freezing Glare', 'Freezy Frost', 'Frost Breath', 'Fur Coat',
			'Fusion Bolt', 'Fusion Flare', 'Future Sight', 'G-Max Cannonade', 'G-Max Centiferno', 'G-Max Resonance', 'G-Max Steelsurge',
			'G-Max Stonesurge', 'G-Max Sweetness', 'G-Max Vine Lash', 'G-Max Volcalith', 'G-Max Wildfire', 'G-Max Wind Rage',
			'Gallade-Mega', 'Garchomp', 'Garchomp-Mega', 'Gardevoir-Mega', 'Gear Grind', 'Genesect', 'Genesis Supernova',
			'Gengar-Mega', 'Gholdengo', 'Ghostium Z', 'Giga Drain', 'Gigaton Hammer', 'Giratina', 'Giratina-Origin',
			'Glaceon', 'Glacial Lance', 'Glaive Rush', 'Glalie-Mega', 'Glare', 'Glastrier', 'Glimmora', 'Glitzy Glow', 'Gogoat',
			'Golisopod', 'Good as Gold', 'Goodra', 'Goodra-Hisui', 'Gooey', 'Gorilla Tactics', 'Grassium Z', 'Grassy Surge',
			'Grav Apple', 'Great Tusk', 'Greninja', 'Greninja-Ash', 'Groudon', 'Groudon-Primal', 'Groundium Z',
			'Guardian of Alola', 'Gunk Shot', 'Guzzlord', 'Gyarados', 'Gyarados-Mega', 'Hadron Engine', 'Hammer Arm', 'Haxorus',
			'Haze', 'Head Charge', 'Head Smash', 'Headlong Rush', 'Heal Bell', 'Heal Order', 'Healing Wish', 'Heart Swap',
			'Heat Crash', 'Heat Wave', 'Heatran', 'Heavy-Duty Boots', 'Heracross-Mega', 'High Horsepower', 'High Jump Kick',
			'Hippowdon', 'Ho-Oh', 'Hoopa', 'Hoopa-Unbound', 'Horn Leech', 'Houndoom-Mega', 'Huge Power', 'Hurricane', 'Hydreigon',
			'Hydro Steam', 'Hyper Drill', 'Iapapa Berry', 'Ice Beam', 'Ice Hammer', 'Ice Scales', 'Ice Shard', 'Ice Spinner',
			'Icicle Plate', 'Icium Z', 'Illusion', 'Imposter', 'Incineroar', 'Infernape', 'Innards Out', 'Insect Plate',
			'Inteleon', 'Intimidate', 'Intrepid Sword', 'Iron Barbs', 'Iron Bundle', 'Iron Hands', 'Iron Head', 'Iron Jugulis',
			'Iron Leaves', 'Iron Moth', 'Iron Plate', 'Iron Thorns', 'Iron Treads', 'Iron Valiant', 'Jet Punch', 'Jirachi',
			'Jolteon', 'Judgment', 'Kangaskhan-Mega', 'Kartana', 'Keldeo', 'Keldeo-Resolute', 'King\'s Rock', 'King\'s Shield',
			'Kingambit', 'Kingdra', 'Knock Off', 'Kommo-o', 'Koraidon', 'Kyogre', 'Kyogre-Primal', 'Kyurem', 'Kyurem-Black',
			'Kyurem-White', 'Landorus', 'Landorus-Therian', 'Lapras', 'Last Respects', 'Latias', 'Latias-Mega', 'Latios',
			'Latios-Mega', 'Lava Plume', 'Leaf Blade', 'Leaf Storm', 'Leafeon', 'Leech Life', 'Leech Seed', 'Leftovers',
			'Leppa Berry', 'Let\'s Snuggle Forever', 'Levitate', 'Libero', 'Liechi Berry', 'Life Orb', 'Light Screen',
			'Light That Burns the Sky', 'Light of Ruin', 'Lightning Rod', 'Liquidation', 'Lopunny-Mega', 'Lovely Kiss',
			'Low Kick', 'Lucario', 'Lucario-Mega', 'Lugia', 'Lum Berry', 'Lumina Crash', 'Lunala', 'Lunar Blessing',
			'Lunar Dance', 'Lunge', 'Mach Punch', 'Magearna', 'Magic Bounce', 'Magic Guard', 'Magical Torque', 'Magma Storm',
			'Magmortar', 'Magnezone', 'Mago Berry', 'Make It Rain', 'Malicious Moonsault', 'Mamoswine', 'Manaphy',
			'Manectric-Mega', 'Marshadow', 'Max Guard', 'Meadow Plate', 'Megahorn', 'Meganium', 'Melmetal', 'Meloetta',
			'Meloetta-Pirouette', 'Memento', 'Menacing Moonraze Maelstrom', 'Mental Herb', 'Meowscarada', 'Mesprit', 'Metagross',
			'Metagross-Mega', 'Meteor Beam', 'Meteor Mash', 'item: Metronome', 'Mew', 'Mewtwo', 'Mewtwo-Mega-X', 'Mewtwo-Mega-Y',
			'Milk Drink', 'Milotic', 'Mind Plate', 'Minimize', 'Miraidon', 'Mirror Herb', 'Misty Explosion', 'Misty Surge',
			'Mold Breaker', 'Moltres', 'Moltres-Galar', 'Moody', 'Moonblast', 'Moongeist Beam', 'Moonlight', 'Morning Sun',
			'Mortal Spin', 'Mountain Gale', 'Moxie', 'Multiscale', 'Muscle Band', 'Mystical Fire', 'Mystical Power', 'Naganadel',
			'Nasty Plot', 'Nature\'s Madness', 'Necrozma', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Necrozma-Ultra',
			'Neutralizing Gas', 'Night Daze', 'Night Shade', 'Nihilego', 'No Retreat', 'Noivern', 'Normalium Z', 'Noxious Torque',
			'Nuzzle', 'Oblivion Wing', 'Obstruct', 'Oceanic Operetta', 'Octolock', 'Opportunist', 'Orichalcum Pulse',
			'Origin Pulse', 'Outrage', 'Overdrive', 'Overheat', 'Palafin-Hero', 'Palkia', 'Palkia-Origin', 'Parental Bond',
			'Parting Shot', 'Perish Body', 'Petaya Berry', 'Pheromosa', 'Photon Geyser', 'Pidgeot-Mega', 'Pinsir-Mega',
			'Pixie Plate', 'Plasma Fists', 'Play Rough', 'Poison Heal', 'Poisonium Z', 'Pollen Puff', 'Poltergeist',
			'Population Bomb', 'Porygon-Z', 'Power Gem', 'Power Trip', 'Power Whip', 'Prankster', 'Precipice Blades', 'Primarina',
			'Primordial Sea', 'Probopass', 'Protean', 'Protect', 'Psyblade', 'Psychic Fangs', 'Psychic Surge', 'Psychic',
			'Psychium Z', 'Psycho Boost', 'Psyshield Bash', 'Psystrike', 'Pulverizing Pancake', 'Pure Power', 'Purifying Salt',
			'Pursuit', 'Pyro Ball', 'Quaquaval', 'Quick Claw', 'Quiver Dance', 'Rage Fist', 'Raging Bull', 'Raging Fury', 'Raikou',
			'Rapid Spin', 'Rayquaza', 'Rayquaza-Mega', 'Razor Claw', 'Recover', 'Red Card', 'Reflect', 'Regenerator', 'Regice',
			'Regidrago', 'Regieleki', 'Regigigas', 'Regirock', 'Registeel', 'Reshiram', 'Rest', 'Revelation Dance',
			'Revival Blessing', 'Rhyperior', 'Rillaboom', 'Roaring Moon', 'Rockium Z', 'Rocky Helmet', 'Roost', 'Rough Skin',
			'Ruination', 'Sacred Fire', 'Sacred Sword', 'Salac Berry', 'Salamence', 'Salamence-Mega', 'Salt Cure', 'Samurott',
			'Samurott-Hisui', 'Sandsear Storm', 'Sandy Shocks', 'Sap Sipper', 'Sappy Seed', 'Scald', 'Sceptile', 'Sceptile-Mega',
			'Scizor-Mega', 'Scope Lens', 'Scream Tail', 'Searing Shot', 'Searing Sunraze Smash', 'Secret Sword', 'Seed Flare',
			'Seismic Toss', 'Serene Grace', 'Serperior', 'Shadow Ball', 'Shadow Bone', 'Shadow Shield', 'Shadow Sneak',
			'Shadow Tag', 'Sharpedo-Mega', 'Shaymin', 'Shaymin-Sky', 'Shed Tail', 'Sheer Force', 'Shell Side Arm',
			'Shell Smash', 'Shield Dust', 'Shift Gear', 'Silk Scarf', 'Silk Trap', 'Silvally', 'Simple', 'Sinister Arrow Raid',
			'Sitrus Berry', 'Sizzly Slide', 'Skeledirge', 'Sky Plate', 'Slack Off', 'Slaking', 'Sleep Powder', 'Slither Wing',
			'Slowbro-Mega', 'Sludge Bomb', 'Sludge Wave', 'Snarl', 'Snipe Shot', 'Snorlax', 'Soft-Boiled', 'Solgaleo',
			'Solid Rock', 'Soul-Heart', 'Soul-Stealing 7-Star Strike', 'Spacial Rend', 'Sparkly Swirl', 'Spectral Thief',
			'Spectrier', 'Speed Boost', 'Spikes', 'Spiky Shield', 'Spin Out', 'Spirit Break', 'Spirit Shackle', 'Splash Plate',
			'Splintered Stormshards', 'Splishy Splash', 'Spooky Plate', 'Spore', 'Springtide Storm', 'Stakataka', 'Stakeout',
			'Stamina', 'Stealth Rock', 'Steam Eruption', 'Steelium Z', 'Steelix-Mega', 'Sticky Web', 'Stoked Sparksurfer',
			'Stone Axe', 'Stone Edge', 'Stone Plate', 'Stored Power', 'Storm Drain', 'Storm Throw', 'Strange Steam',
			'Strength Sap', 'Sucker Punch', 'Suicune', 'Sunsteel Strike', 'Super Fang', 'Superpower', 'Supreme Overlord', 'Surf',
			'Surging Strikes', 'Swampert', 'Swampert-Mega', 'Sword of Ruin', 'Swords Dance', 'Sylveon', 'Synthesis',
			'Tablets of Ruin', 'Tail Glow', 'Tangrowth', 'Tapu Bulu', 'Tapu Fini', 'Tapu Koko', 'Tapu Lele', 'Taunt',
			'Techno Blast', 'Teleport', 'Tera Blast', 'Teravolt', 'Terrakion', 'Thick Fat', 'Thousand Arrows', 'Thousand Waves',
			'Throat Spray', 'Thunder Cage', 'Thunder Wave', 'Thunder', 'Thunderbolt', 'Thunderous Kick', 'Thundurus', 'Thundurus-Therian',
			'Tidy Up', 'Ting-Lu', 'Tinted Lens', 'Togekiss', 'Topsy-Turvy', 'Torch Song', 'Tornadus', 'Tornadus-Therian', 'Torterra',
			'Tough Claws', 'Toxic Debris', 'Toxic Plate', 'Toxic Spikes', 'Toxic', 'Tri Attack', 'Triage', 'Triple Arrows',
			'Triple Axel', 'Turboblaze', 'Type: Null', 'Typhlosion', 'Typhlosion-Hisui', 'Tyranitar', 'Tyranitar-Mega', 'U-turn',
			'Umbreon', 'Unaware', 'Unburden', 'Ursaluna', 'Urshifu', 'Urshifu-Rapid-Strike', 'Uxie', 'V-create', 'Vanilluxe',
			'Vaporeon', 'Venusaur', 'Venusaur-Mega', 'Vessel of Ruin', 'Victini', 'Victory Dance', 'Virizion', 'Volcanion',
			'Volcarona', 'Volt Absorb', 'Volt Switch', 'Volt Tackle', 'Walking Wake', 'Walrein', 'Water Absorb', 'Water Bubble',
			'Water Shuriken', 'Water Spout', 'Waterfall', 'Waterium Z', 'Wave Crash', 'Weakness Policy', 'Well-Baked Body',
			'White Herb', 'Wicked Blow', 'Wicked Torque', 'Wide Lens', 'Wiki Berry', 'Wild Charge', 'Wildbolt Storm',
			'Will-O-Wisp', 'Wise Glasses', 'Wish', 'Wishiwashi-School', 'Wo-Chien', 'Wonder Guard', 'Wood Hammer', 'Wyrdeer',
			'Xerneas', 'Xurkitree', 'Yawn', 'Yveltal', 'Zacian', 'Zacian-Crowned', 'Zamazenta', 'Zamazenta-Crowned', 'Zap Plate',
			'Zapdos', 'Zapdos-Galar', 'Zarude', 'Zekrom', 'Zeraora', 'Zing Zap', 'Zippy Zap', 'Zygarde', 'Zygarde-Complete',
		],
	},
	{
		name: "[Gen 9] Dream World Theorymons",
		desc: '<b>[Gen 8] Gen 9 Dream World Theorymons</b>: A testing ground for the Gen 9 OU Theorymons metagame.',
		mod: 'outheorymons',
		ruleset: ['Standard', 'Data Mod'],
		banlist: ['Uber', 'AG', 'Arena Trap', 'Moody', 'Sand Veil', 'Shadow Tag', 'Snow Cloak', 'King\'s Rock', 'Baton Pass', 'Last Respects'],
	},
   {
		name: "[Gen 9] Earth & Sky Horizons OU",
		desc: `The metagame based on Pok&eacute;mon Earth & Sky, a set of theoretical games created by En Passant, with the Horizons Expansion for Gen 9.`,
		threads: [
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1zLXacuxUs05muhn3fTty_UW2ww3KSZCmnzdsUzVR-x8/edit?usp=sharing">Competitive Cheat Sheet</a>`,
		],
		//gen: 9,
		mod: 'earthsky',
		ruleset: [ 'Earth & Sky', 'Restricted Rules'],
		banlist: [
			'Alakazam-Mega', 'Arceus', 'Blaziken-Mega', 'Blastoise-Mega', 'Calyrex-Ice', 'Calyrex-Shadow', 'Chi-Yu', 'Chien-Pao', 'Darkrai', 
			'Deoxys-Attack', 'Deoxys-Base', 'Deoxys-Speed',	'Dialga', 'Eternatus', 'Flutter Mane', 'Genesect', 'Gengar-Mega', 'Giratina', 'Groudon', 
			'Ho-Oh', 'Kartana', 'Koraidon', 'Kyogre', 'Kyurem', 'Landorus-Base', 'Lucario-Mega', 'Lugia', 'Lunala', 'Marshadow', 'Mewtwo', 'Miraidon',
			'Naganadel', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Palkia', 'Pheromosa', 'Rayquaza', 'Reshiram', 'Robo Bundle',
			'Salamence-Mega', 'Shaymin-Sky', 'Solgaleo', 'Xerneas', 'Yveltal', 'Zacian', 'Zamazenta', 'Zekrom',
			/*'ES Uber', */'Oceides', 'Hatar', 'Zuros', 'Norphaval', 'Arena Trap', 'Power Construct', 'Shadow Tag', 'Baton Pass',
		],
		//formatType: 'natdex',
		teambuilderFormat: 'National Dex',
	},
	{
		name: "[Gen 9] Earth & Sky Horizons Triples",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3675374/">Information and Suggestions Thread</a>`,
		],

		mod: 'gen8',
		team: 'randomBSSFactory',
		ruleset: ['Flat Rules'],
	},
	{
		name: "[Gen 8] Super Staff Bros 4",
		desc: `The fourth iteration of Super Staff Bros is here! Battle with a random team of Pok&eacute;mon created by the sim staff.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/articles/super-staff-bros-4">Introduction &amp; Roster</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/super-staff-bros-4-discussion-thread.3675237/">Discussion Thread</a>`,
		],

		mod: 'ssb',
		team: 'randomStaffBros',
		ruleset: ['Dynamax Clause', 'HP Percentage Mod', 'Cancel Mod', 'Sleep Clause Mod'],
		onBegin() {
			if (!this.ruleTable.has('dynamaxclause')) {
				// Old joke format we're bringing back
				for (const side of this.sides) {
					side.dynamaxUsed = true;
				}
				this.add('message', 'Delphox only');
				this.add('message', 'No items');
				this.add('message', 'Final Destination');
				return;
			}
			// TODO look into making an event to put this right after turn|1
			// https://discordapp.com/channels/630837856075513856/630845310033330206/716126469528485909
			// Requires client change
			this.add(`raw|<div class='broadcast-green'><b>Wondering what all these custom moves, abilities, and items do?<br />Check out the <a href="https://www.smogon.com/articles/super-staff-bros-4" target="_blank">Super Staff Bros 4 Guide</a> or use /ssb to find out!</b></div>`);

			this.add('message', [
				'THE BATTLE FOR SURVIVAL BEGINS!', 'WHO WILL SURVIVE?', 'GET READY TO KEEP UP!', 'GET READY!', 'DARE TO BELIEVE YOU CAN SURVIVE!', 'THERE CAN BE ONLY ONE WINNER!', 'GET READY FOR THE FIGHT OF YOUR LIFE!', 'WHO WILL PREVAIL?', 'ONLY ONE TEAM WILL BE LEFT STANDING!', 'BATTLE WITHOUT LIMITS!',
			][this.random(10)]);
			this.add('message', 'FIGHT!');
		},
		onSwitchInPriority: 100,
		onSwitchIn(pokemon) {
			let name: string = this.toID(pokemon.illusion ? pokemon.illusion.name : pokemon.name);
			if (this.dex.species.get(name).exists || this.dex.moves.get(name).exists || this.dex.abilities.get(name).exists) {
				// Certain pokemon have volatiles named after their id
				// To prevent overwriting those, and to prevent accidentaly leaking
				// that a pokemon is on a team through the onStart even triggering
				// at the start of a match, users with pokemon names will need their
				// statuses to end in "user".
				name = name + 'user';
			}
			// Add the mon's status effect to it as a volatile.
			const status = this.dex.conditions.get(name);
			if (status?.exists) {
				pokemon.addVolatile(name, pokemon);
			}
			if (pokemon.m.hasBounty) this.add('-start', pokemon, 'bounty', '[silent]');
			const details = pokemon.species.name + (pokemon.level === 100 ? '' : ', L' + pokemon.level) +
				(pokemon.gender === '' ? '' : ', ' + pokemon.gender) + (pokemon.set.shiny ? ', shiny' : '');
			if (pokemon.m.nowShiny) this.add('replace', pokemon, details);
		},
		onFaint(target, source, effect) {
			if (effect?.effectType !== 'Move') return;
			if (!target.m.hasBounty) return;
			if (source) {
				this.add('-message', `${source.name} received the bounty!`);
				this.boost({atk: 1, def: 1, spa: 1, spd: 1, spe: 1}, source, target, effect);
			}
		},
	},
	{
		name: "[Gen 8] Hackmons Cup",
		desc: `Randomized teams of level-balanced Pok&eacute;mon with absolutely any ability, moves, and item.`,

		mod: 'gen8',
		team: 'randomHC',
		ruleset: ['HP Percentage Mod', 'Cancel Mod'],
		banlist: ['Nonexistent'],
	},
	{
		name: "[Gen 9] Earth & Sky Horizons Dex",
		threads: [
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1zLXacuxUs05muhn3fTty_UW2ww3KSZCmnzdsUzVR-x8/edit?usp=sharing">Competitive Cheat Sheet</a>`,
		],
		//gen: 9,
		mod: 'earthsky',
		ruleset: [ '[Gen 9] Earth & Sky Horizons OU', 'Horizons Pokedex',],
		banlist: ['Diancie-Mega', 'Manaphy', 'Mawile-Mega', 'Melmetal', 'Meloetta-Pirouette'],
		//formatType: 'natdex',
		teambuilderFormat: 'National Dex',
	},
	{
		name: "[Gen 9] Earth & Sky Horizons Ubers",
		threads: [
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1zLXacuxUs05muhn3fTty_UW2ww3KSZCmnzdsUzVR-x8/edit?usp=sharing">Competitive Cheat Sheet</a>`,
		],
		//gen: 9,
		mod: 'earthsky',
		ruleset: [ 'Earth & Sky',],
		banlist: [],
		//formatType: 'natdex',
		teambuilderFormat: 'National Dex',
	},
	{
		name: "[Gen 8] Evolution Project",
		desc: [
			`<b>Evolution Project</b>: A small group's creative exercise being given a test run. More details when we go public!`,
		],
		ruleset: ['Standard NatDex', 'Z-Move Clause', 'Data Mod', 'Mega Data Mod', 'Terastal Clause'],
		banlist: [
			'Alakazam', 'Excadrill-Base', 'Exploud', 'Lycanroc-Dusk', 'Naganadel-Base', 'Reuniclus-Base', 'Scizor', 'Scolipede-Base', 'Starmie-Base', 'Polteageist-Base',
			'Polteageist-Antique', 'Volcarona', 'Aegislash-Base', 'Gyarados', 'Moody', 'Baton Pass'
		],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (template.tier !== 'Evo!' && template.tier !== 'Evo (NFE)' && template.tier !== "Evo NFE!") {
					return [set.species + ' is not legal in the Evolution Project format.'];
				}
			}
		},
		onValidateSet(set) {
			const item = this.dex.items.get(set.item);
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
		banlist: ['Aegislash-Base', 'Scizor'],
		ruleset: ['Flat Rules', '!! Adjust Level = 50', 'VGC Timer', '+Unobtainable', '+Past', 'Dynamax Clause', 'Z-Move Clause', 'Data Mod', 'Mega Data Mod', 'Terastal Clause'],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (template.tier !== 'Evo!' && template.tier !== 'Evo (NFE)' && template.tier !== "Evo NFE!") {
					return [set.species + ' is not legal in the Evolution Project format.'];
				}
			}
		},
		onValidateSet(set) {
			const unobtainables = [
				'Eevee-Starter', 'Floette-Eternal', 'Pichu-Spiky-eared', 'Pikachu-Belle', 'Pikachu-Cosplay', 'Pikachu-Libre',
				'Pikachu-PhD', 'Pikachu-Pop-Star', 'Pikachu-Rock-Star', 'Pikachu-Starter', 'Eternatus-Eternamax',
			];
			const species = this.dex.species.get(set.species);
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
			const item = this.dex.items.get(set.item);
			if (item.gen > 8) {
				return [`${species.name} is from gen 9, which is banned from [Gen 8] Metronome Battle.`];
			}
			if (set.item && item.megaStone) {
				const megaSpecies = this.dex.species.get(item.megaStone);
				if (species.baseSpecies === item.megaEvolves && megaSpecies.bst > 625) {
					return [
						`${set.name || set.species}'s item ${item.name} is banned.`, `(Pok\u00e9mon with a BST higher than 625 are banned)`,
					];
				}
			}
			const ability = this.dex.abilities.get(set.ability);
			if (ability.gen > 8) {
				return [`${species.name} is from gen 9, which is banned from [Gen 8] Metronome Battle.`];
			}
			if (set.moves.length !== 1 || this.dex.moves.get(set.moves[0]).id !== 'metronome') {
				return [`${set.name || set.species} has illegal moves.`, `(Pok\u00e9mon can only have one Metronome in their moveset)`];
			}
		},
	},

	// RoA Spotlight
	///////////////////////////////////////////////////////////////////

	{
		section: "RoA Spotlight",
		column: 4,
	},
	{
		name: "[Gen 4] Ubers",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/posts/8286279/">DPP Ubers</a>`,
		],

		mod: 'gen4',
		// searchShow: false,
		ruleset: ['Standard'],
		banlist: ['AG'],
	},
	{
		name: "[Gen 5] 1v1",
		desc: `Bring three Pok&eacute;mon to Team Preview and choose one to battle.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/posts/8031460/">BW2 1v1</a>`,
		],

		mod: 'gen5',
		// searchShow: false,
		ruleset: [
			'Picked Team Size = 1', 'Max Team Size = 3',
			'Standard', 'Baton Pass Clause', 'Swagger Clause', 'Accuracy Moves Clause', 'Sleep Moves Clause',
		],
		banlist: ['Uber', 'Cottonee', 'Dragonite', 'Jirachi', 'Kyurem-Black', 'Mew', 'Togekiss', 'Whimsicott', 'Victini', 'Focus Band', 'Focus Sash', 'Quick Claw', 'Soul Dew', 'Perish Song'],
		unbanlist: ['Genesect', 'Landorus', 'Manaphy', 'Thundurus', 'Tornadus-Therian'],
	},
	{
		name: "[Gen 1] PU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3700527/">RBY PU Metagame Discussion &amp; Resources</a>`,
		],

		mod: 'gen1',
		// searchShow: false,
		ruleset: ['[Gen 1] NU'],
		banlist: ['NU', 'PUBL'],
	},

	// Past Gens OU
	///////////////////////////////////////////////////////////////////

	{
		section: "Past Gens OU",
		column: 4,
	},
	{
		name: "[Gen 8] OU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3672210/">SS OU Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3672556/">SS OU Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3674058/">SS OU Viability Rankings</a>`,
		],
		mod: 'kitchen',
		ruleset: ['Standard'],
		banlist: ['Uber', 'AG', 'Arena Trap', 'Moody', 'Sand Veil', 'Shadow Tag', 'Snow Cloak', 'King\'s Rock', 'Baton Pass'],
		unbanlist: ['Athleetah'],
	},
	{
		name: "[Gen 1] Glitch OU",
		mod: 'gen1glitch',
		ruleset: ['Standard', 'Data Mod'],
		banlist: ['Uber', 'Agility + Wrap', 'Agility + Fire Spin', 'Agility + Bind', 'Agility + Clamp', 'Amnesia', 'Sleep Powder', 'Self-Destruct', 'Explosion'],
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
		name: "[Gen 6] Doubles OU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3606255/">ORAS Doubles OU Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/posts/7387213/">ORAS Doubles OU Viability Rankings</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/posts/7387215/">ORAS Doubles OU Sample Teams</a>`,
		],

		mod: 'gen6',
		gameType: 'doubles',
		ruleset: ['Standard Doubles', 'Swagger Clause'],
		banlist: ['DUber', 'Soul Dew', 'Dark Void'],
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
		name: "[Gen 4] Doubles OU",
		threads: [`&bullet; <a href="https://www.smogon.com/forums/threads/3717286/">DPP Doubles</a>`],

		mod: 'gen4',
		gameType: 'doubles',
		searchShow: false,
		ruleset: ['Standard'],
		banlist: ['AG', 'Uber', 'Soul Dew', 'Dark Void', 'Sand Veil'],
		unbanlist: ['Latios', 'Manaphy', 'Mew', 'Salamence', 'Wobbuffet', 'Wynaut'],
	},
	{
		name: "[Gen 3] Doubles OU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3666831/">ADV Doubles OU</a>`,
		],

		mod: 'gen3',
		gameType: 'doubles',
		searchShow: false,
		ruleset: ['Standard', '!Switch Priority Clause Mod'],
		banlist: ['Uber', 'Soul Dew', 'Swagger'],
		unbanlist: ['Latias', 'Wobbuffet', 'Wynaut'],
	},

	// Sw/Sh Singles
	///////////////////////////////////////////////////////////////////

	{
		section: "Sw/Sh Singles",
		column: 4,
	},
	{
		name: "[Gen 1] JohtoMons",
		desc: '<b>[Gen 1] JohtoMons</b>: Adding the Johto mons to RBY',
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/gen-1-futureproofing-slate-1-discussion.3703375/">FutureProofing on Smogon Forums</a>`,
		],
		mod: 'gen1johtomons',
		ruleset: ['Standard', 'Data Mod'],
		banlist: ['Uber'],
		unbanlist: ['Aeroblast', 'Sacred Fire', 'Sketch', 'Present', 'Megahorn', 'Steel Wing', 'Milk Drink', 'Metal Claw', 'Spider Web', 'Hidden Power', 'Octazooka', 'Triple Kick', 'Vital Throw', 'Extreme Speed', 'Mach Punch', 'Outrage', 'Morning Sun',
			'Chikorita', 'Bayleef', 'Meganium', 'Cyndaquil', 'Quilava', 'Typhlosion', 'Sentret', 'Furret', 'Hoothoot', 'Noctowl', 'Ledyba', 'Ledian', 'Spinarak', 'Ariados', 'Crobat', 'Chinchou', 'Lanturn', 'Pichu', 'Cleffa', 'Igglybuff', 'Togepi', 'Togetic',
			'Natu', 'Xatu', 'Mareep', 'Flaaffy', 'Ampharos', 'Bellossom', 'Marill', 'Azumarill', 'Sudowoodo', 'Politoed', 'Hoppip', 'Skiploom', 'Jumpluff', 'Aipom', 'Sunkern', 'Sunflora', 'Yanma', 'Wooper', 'Quagsire', 'Espeon', 'Umbreon', 'Murkrow', 'Slowking', 
			'Misdreavus', 'Unown', 'Wobbuffet', 'Girafarig', 'Pineco', 'Forretress', 'Dunsparce', 'Gligar', 'Steelix', 'Snubbull', 'Granbull', 'Qwilfish', 'Scizor', 'Shuckle', 'Heracross', 'Sneasel', 'Teddiursa', 'Ursaring', 'Slugma', 'Magcargo', 'Swinub', 
			'Piloswine', 'Corsola', 'Remoraid', 'Octillery', 'Delibird', 'Mantine', 'Skarmory', 'Houndour', 'Houndoom', 'Kingdra', 'Phanpy', 'Donphan', 'Porygon2', 'Stantler', 'Smeargle', 'Tyrogue', 'Hitmontop', 'Smoochum', 'Elekid', 'Magby', 'Miltank', 
			'Blissey', 'Raikou', 'Entei', 'Suicune', 'Larvitar', 'Pupitar', 'Tyranitar', 'Lugia', 'Ho-Oh', 'Celebi',
		],
    },
	{
		name: "[Gen 1] Kanto Expansion Pak OU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3660004/post-9233581">Post in Solomods Megathread</a>`,
      	`&bullet; <a href="https://docs.google.com/spreadsheets/d/1TpTH9ksUWOOJJQK69RIcvnot_mH_JvfGfM4zra6V3Ec/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: 'gen1expansionpack',
		ruleset: ['Standard', 'Data Mod', 'Welcome Message', 'Allow Tradeback'],
		banlist: ['Uber'],
	},
		{
		name: "[Gen 1] Kanto Expansion Pak Ubers",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3660004/post-9233581">Post in Solomods Megathread</a>`,
      	`&bullet; <a href="https://docs.google.com/spreadsheets/d/1TpTH9ksUWOOJJQK69RIcvnot_mH_JvfGfM4zra6V3Ec/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: 'gen1expansionpack',
		ruleset: ['Standard', 'Data Mod', 'Welcome Message', 'Allow Tradeback'],
	},
	{
		name: "[Gen 8] Kaen's Dex",
		mod: "kaensdex",
		ruleset: ['Standard NatDex', 'Z-Move Clause', 'Data Mod'],
		banlist: ['All Pokemon'],
		unbanlist: ['Luvdisc', 'Hypno','Arbok','Shuckle','Woodite','Manteaf','Fasmiwood','Smice','Ratevil','Burstrat',		'Doplash','Makid','Merdolph','Princeguin',
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
		name: "[Gen 9] Limited Meta",
		mod: 'limited',
		ruleset: ['Standard'],
		banlist: ['Baton Pass'],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['LOU'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Limited.'];
				}
			}
		},
	},
	{
		name: "[Gen 1] Modern Gen 1",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/gen-9-modern-gen-1.3711533/">Smogon Thread</a>`,
		],
		mod: 'moderngen1',
		searchShow: false,
		ruleset: ['Standard', 'Partial Trapping Clause', 'Protect Clause', 'Field Effect Clause', 'Sleep Moves Clause', '+No Ability', '-All Abilities', '-All Items'],
		banlist: ['Uber', 'Fake Out', 'Confuse Ray', 'Supersonic', 'Swagger', 'Sweet Kiss', 'Flatter', 'Dig', 'Fly'],	
	},
	{
		name: "[Gen 1] Modern Gen 1 Uber",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/gen-9-modern-gen-1.3711533/">Smogon Thread</a>`,
		],
		mod: 'moderngen1',
		searchShow: false,
		ruleset: ['Standard', 'Partial Trapping Clause', 'Protect Clause', 'Field Effect Clause', 'Sleep Moves Clause', '+No Ability', '-All Abilities', '-All Items'],
		banlist: ['AG', 'Fake Out', 'Confuse Ray', 'Supersonic', 'Swagger', 'Sweet Kiss', 'Flatter', 'Dig', 'Fly'],	
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
		banlist: ['Uber', 'OU', 'UUBL', 'Fake Out', 'Confuse Ray', 'Supersonic', 'Swagger', 'Sweet Kiss', 'Flatter', 'Dig', 'Fly'],	
	},
	{
		name: "[Gen 9] Patratdex",
		desc: `<b>Patratdex</b>: Galvantic's Solomod, containing a new regional dex with a bunch of new stuff, notably 151 Fakemon.`,
		mod: 'patratdex',
		ruleset: ['Standard NatDex', 'Dynamax Clause', 'Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 'Swagger Clause', 'Baton Pass Clause', 'OHKO Clause', 'Realmon Clause'],
		banlist: ['Normalium Z', 'Fairium Z', 'Fightinium Z', 'Firium Z', 'Flyinium Z', 'Darkinium Z', 'Dragonium Z', 'Buginium Z', 'Waterium Z', 'Electrium Z', 'Ghostium Z', 'Grassium Z', 'Groundium Z', 'Icium Z', 'Poisonium Z', 'Psychium Z', 'Rockium Z', 'Steelium Z',],
		onSwitchIn(pokemon) {
      	this.add('-start', pokemon, 'typechange', pokemon.species.types.join('/'), '[silent]');
		},	
	},
	{
		name: "[Gen 8] Roulettemons The Solomod",
		desc: `<b>Roulettemons The Solomod</b>: literally roulettemons but a solomod + clean slate micro`,
		mod: 'roulettemonsthesolomod',
		ruleset: ['Standard NatDex', 'Data Mod'],
		banlist: ['All Pokemon'],
		unbanlist: [
			'Spinmadillo', 'Coyoctric', 'Spizelle', 'Fierhog', 'Elatuff', 'Glasyte', 'Bisong', 'Megalo', 'Oysteat', 'Ponymph', 'Hypepion', 'Chickola', 'Skelehawk', 'Catetar', 'Blastquito', 'Hawkward', 'Pandaid', 'Autoad', 'Skelephin', 'Doomossum', 'Llamagic', 'Venoroach', 'Salamados', 'Steelboon', 'Jaguaplume',
		],
		onSwitchIn(pokemon) {
			this.add('-start', pokemon, 'typechange', pokemon.species.types.join('/'), '[silent]');
		},
	},
	{
		name: "[Gen 9] Roovnen OU",
		desc: '<b>A solomod with Pokémon based on and related to Austria, Germany and Switzerland',
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3711007/post-9485572">Post in Solomods Megathread</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1ZzNqkSOwGYx2E1Rn28jCzGpJahMIcM-KjiGprjQAT68/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: 'gen9roovnen',
		searchShow: false,
		ruleset: ['Standard'],
		banlist: ['AG', 'Uber', 'King\'s Rock', 'Quick Claw', 'Razor Fang', 'Shed Tail', 'Soul Dew'],
	},
	{
		name: "[Gen 9] Roovnen UU",
		desc: '<b>A solomod with Pokémon based on and related to Austria, Germany and Switzerland',
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3711007/post-9485572">Post in Solomods Megathread</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1ZzNqkSOwGYx2E1Rn28jCzGpJahMIcM-KjiGprjQAT68/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: 'gen9roovnen',
		searchShow: false,
		ruleset: ['[Gen 9] Roovnen OU'],
		banlist: ['OU', 'UUBL'],
		teambuilderFormat: 'UU',
	},
	/*{
		name: "[Gen 9] Roovnen Uber",
		desc: '<b>A solomod with Pokémon based on and related to Austria, Germany and Switzerland',
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3711007/post-9485572">Post in Solomods Megathread</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1ZzNqkSOwGYx2E1Rn28jCzGpJahMIcM-KjiGprjQAT68/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: 'gen9roovnen',
		searchShow: false,
		ruleset: ['[Gen 8] Doubles OU'],
		banlist: ['DOU', 'DBL'],
	},
	{
		name: "[Gen 9] Roovnen Doubles",
		desc: '<b>A solomod with Pokémon based on and related to Austria, Germany and Switzerland',
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3711007/post-9485572">Post in Solomods Megathread</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1ZzNqkSOwGYx2E1Rn28jCzGpJahMIcM-KjiGprjQAT68/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: 'gen9roovnen',
		gameType: 'doubles',
		searchShow: false,
		ruleset: ['Standard Doubles'],
		banlist: ['DUber', 'Shadow Tag', 'Soul Dew', 'Shadow Dew'],
		teambuilderFormat: 'DOU',
	},
	/*{
		name: "[Gen 9] Roovnen LC",
		desc: '<b>A solomod with Pokémon based on and related to Austria, Germany and Switzerland',
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3711007/post-9485572">Post in Solomods Megathread</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1ZzNqkSOwGYx2E1Rn28jCzGpJahMIcM-KjiGprjQAT68/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: 'gen9roovnen',
		searchShow: false,
		ruleset: ['Standard', 'Little Cup'],
		banlist: [
			'Cutiefly', 'Girafarig', 'Gligar', 'Growlithe-Hisui', 'Scyther', 'Torkoal', 'Torkoal-Roovnen', 'Tropius', 'Vulpix', 'Vulpix-Alola', 'Yanma', 'Baton Pass', 'Sticky Web',
		],
	},*/
	{
		name: "[Gen 9] Scootopia",
		desc: "A solomod consisting of Scoopapa's first 30 sprited fakemons!",
		threads: [
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1khgnzqe3xldhLw1LbfjyYDcsltZrgyo8by4Y8EDE4vQ/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: "scootopia",
		ruleset: ['Standard NatDex', 'Z-Move Clause', 'Data Mod'],
		banlist: ['All Pokemon'],
		unbanlist: ['Orchile', 'Dolphena', 'Scalaron', 'Rantler', 'Cobracotta', 'Albatrygon', 'Electangle', 'Torgeist', 'Platypad', 'Soleron', 'Nunopod', 'Zeploom', 'Brawnkey', 'Salamalix', 'Cinnastar', "Muab'Boa", 'Volvolpa', 'Harzodia', 'Cyllindrake', 'Kodokai', 'Jaegorm', 'Jaegorm-Collective', 'Faerenheit', 'Cellsius', 'Kelven', 'Salaos', 'Morndos', 'Pythos', 'Quadringo', 'Corundell', 'Flocura' ],
	},
	{
		name: "[Gen 9] Super Types OU",
		desc: "The Super Type mechanic from Scootopia, only it's applied to current gen 9 OU.",
		threads: [
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1khgnzqe3xldhLw1LbfjyYDcsltZrgyo8by4Y8EDE4vQ/edit#gid=1291687635">Types + Moves Explained</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1khgnzqe3xldhLw1LbfjyYDcsltZrgyo8by4Y8EDE4vQ/edit#gid=894228879">List of Defensive Type Combos</a>`,
		],
		mod: "supertypesou",
		ruleset: ['Standard NatDex', 'Z-Move Clause', 'Data Mod'],
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
		name: "[Gen 9] UUbers",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3710870/">Ubers Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3712978/">Ubers Viability Rankings</a>`,
		],

		mod: 'gen9uubers',
		ruleset: ['Standard'],
		banlist: ['AG', 'Moody', 'King\'s Rock', 'Razor Fang', 'Baton Pass',
				//Ubers above 4.52% Usage
				/*'Miraidon', 'Koraidon', 'Ting-Lu', 'Zacian-Crowned', 'Flutter Mane', 'Kyogre', 'Arceus-Base', 'Skeledirge', 'Groudon', 'Arceus-Ground', 
				'Ogerpon-Hearthflame', 'Baxcalibur', 'Giratina-Origin', 'Rayquaza', 'Iron Bundle', 'Eternatus', 'Annihilape', 'Chien-Pao', 'Great Tusk', 
				'Ribombee', 'Calyrex-Ice', 'Regieleki', 'Kingambit', 'Clodsire', 'Arceus-Fairy', 'Landorus-Therian', 'Basculegion-Base', 'Corviknight', 
				'Mewtwo', 'Glimmora', 'Toxapex', 'Iron Treads', 'Arceus-Ghost', 'Ditto', 'Arceus-Steel', 'Arceus-Water', 'Arceus-Flying', 'Arceus-Electric',*/
		],
		teambuilderFormat: 'Uber',
	},
	{
		name: "[Gen 8] VGC by RNG",
		desc: `VGC by RNG, a solomod inspired by the Gen 8 mod Random Dex, where the dex of legal Pokemon is decided randomly.`,
		gameType: 'doubles',
		mod: 'vgcbyrng',
		ruleset: ['Flat Rules', '!! Adjust Level = 50', 'VGC Timer', 'Dynamax Clause', 'Mega Data Mod'],
		banlist: ['Revival Blessing'],
		validateSet(set, teamHas) { // stolen from SV Speculative
			const species = this.dex.species.get(set.species);
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
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['RNG FE', 'RNG NFE', 'RNG LC'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in VGC by RNG.'];
				}
			}
		},
	},
	{
		name: "[Gen 8] Weedmons",
		desc: `Weedmons is a SoloMod originally led by The Reptile, whose purpose is primarily to make a fun micrometa based on the	completely arbitrary limitations of the theme of Weed!.`,
		mod: 'weedmons',
		gen: 9,
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Species Clause', 'Sleep Clause Mod', 'Dynamax Clause'],
		banlist: ['All Pokemon', 'Arena Trap', 'Moody', 'Power Construct', 'Shadow Tag', 'King\'s Rock', 'item: Quick Claw' /*Wtf is this validator on? What ability?*/, 'Razor Fang', 
		'Assist', 'Baton Pass', 'Last Respects', 'Shed Tail', 'Altarianite', 'Charizardite X', 'Charizardite Y', 'Blazikenite',],
		unbanlist: ['Altaria', 'Azumarill', 'Azurill', 'Blaziken', 'Braixen', 'Brionne', 'Blitzle', 'Bouffalant', 'Castform', 'Centiskorch', 'Charizard', 'Charmander', 'Charmeleon', 'Cherubi', 
		'Chimchar', 'Cinderace', 'Combusken', 'Crocalor', 'Cyndaquil', 'Dartrix', 'Deerling', 'Delphox', 'Dragonair', 'Drampa', 'Drizzile', 'Emboar', 'Farigiraf', 'Fennekin', 'Fuecoco', 'Girafarig', 
		'Gogoat', 'Golduck', 'Goodra', 'Goodra-Hisui', 'Goomy', 'Hakamo-O', 'Heatmor', 'Incineroar', 'Infernape', 'Lickilicky', 'Lickitung', 'Linoone', 'Linoone-Galar', 'Litten', 'Marill', 'Metang', 
		'Mightyena', 'Miltank', 'Monferno', 'Oddish', 'Pansear', 'Pignite', 'Poipole', 'Psyduck', 'Quilava', 'Raboot', 'Sawsbuck', 'Scorbunny', 'Shelgon', 'Simisear', 'Sizzlipede', 'Skeledirge', 
		'Skiddo', 'Sliggoo', 'Sliggoo-Hisui', 'Stantler', 'Swablu', 'Tepig', 'Thwackey', 'Torchic', 'Torkoal', 'Torracat', 'Typhlosion', 'Typhlosion-Hisui', 'Watchog', 'Wyrdeer', 'Zebstrika', 'Zweilous',
		],
	},
	///////////////////////////////////////////////////////////////
	///////////////////// Non-Smogon Mods /////////////////////////
	///////////////////////////////////////////////////////////////
	// {
		// section: "Non-Smogon Mods",
		// column: 2,
	// },

	///////////////////////////////////////////////////////////////
	//////////////////////// Randbats /////////////////////////////
	///////////////////////////////////////////////////////////////
	// {
		// section: "Randbats",
		// column: 2,
	// },
	// {
        // name: "[Gen 9] Duomod Randbats",
        // desc: `<b>gen 9 duomod back and better than ever baybeeeeee</b>`,
        // threads: [
            // `&bullet; <a href="https://docs.google.com/spreadsheets/d/1VZp8emRachS_ieusnF8FWKFqTcOUjrVyr393J-J17pY/edit?usp=sharing">Spreadsheet</a>`,
        // ],
        // team: 'random',
        // mod: 'gen9duomod',
        // ruleset: ['Standard NatDex', 'Subscribe For More Content', 'Duomod Data Mod'],
        // onSwitchIn(pokemon) {
            // this.add('-start', pokemon, 'typechange', pokemon.species.types.join('/'), '[silent]');
        // },
    // },
	// {
		// name: "[Gen 8] Duomod Randbats",
		// desc: `<b>Duomod</b>: Legendary YouTuber and professional Smash player DuoM2's solomod, build around the idea where nobody is ever truly losing.`,
        // threads: [
            // `&bullet; <a href="https://docs.google.com/spreadsheets/d/1lguyF31tjV8f-Gv3uLxmZXGAlg23k2fkF_nBqevJouM/edit?usp=sharing">Spreadsheet</a>`,
        // ],
		// team: 'random',
		// mod: 'duomod',
		// ruleset: ['Standard NatDex', 'Subscribe For More Content', 'Duomod Data Mod'],
		// onSwitchIn(pokemon) {
			// this.add('-start', pokemon, 'typechange', pokemon.species.types.join('/'), '[silent]');
		// },
	// },
	// {
		// name: "[Gen 8] Fusion Evolution UU Random Battle",
		// threads: [
			// `&bullet; <a href="https://www.smogon.com/forums/threads/fusion-evolution-under-used-submission-slate-3.3674163/">Fusion Evolution Under Used on Smogon Forums</a>`,
			// `&bullet; <a href="https://docs.google.com/spreadsheets/d/1zFk1_DBIoXFFn_7JpvYbVBrW-f1oFFh80Wn0CJNnbVo/edit#gid=0">Spreadsheet</a>`,
		// ],
		// mod: 'feuu',
		// team: 'random',
		// ruleset: ['OHKO Clause', 'Obtainable', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Z-Move Clause', 'Data Mod', 'Mega Data Mod', 'Cancel Mod'],
	// },
	// {
		// name: "[Gen 1] FutureProofing Random Battle",
	   // desc: `<b>[Gen 1] FutureProofing</b>: Adapting Dark, Steel, and Fairy-type moves and Pokemon to the Gen 1 OU metagame.`,
	   // threads: [
			// `&bullet; <a href="https://www.smogon.com/forums/threads/gen-1-futureproofing-slate-1-discussion.3703375/">FutureProofing on Smogon Forums</a>`,
	   // ],
		// mod: 'gen1futureproofing',
		// team: 'random',
		// ruleset: ['Standard', 'Data Mod'],
	// },
	// {
		// name: "[Gen 8] JolteMons Random Battle",
		// desc: [
			// "<b>JolteMons</b>: A sequel to SylveMons where Pokemon, items, abilities and moves are redesigned for OU (and new items, abilities and moves are added) without changing base stats.",
		// ],
		// threads: [
			// `&bullet; <a href="https://www.smogon.com/forums/threads/joltemons-slate-1-distribution-phase.3694234/">Thread on the Smogon Forums</a>`,
			// `&bullet; <a href="https://docs.google.com/spreadsheets/d/149ZlQY0bJIAqfWB_233Dvbpqs3pVSHYpIoAQQkwquls/edit?usp=sharing">Spreadsheet</a>`,
		// ],
		// mod: 'joltemons',	
		// team: 'random',
		// ruleset: ['Dynamax Clause', 'Obtainable', 'Species Clause', 'HP Percentage Mod', 'Cancel Mod', 'Sleep Clause Mod', 'Mega Data Mod', 'Data Mod', 'Z-Move Clause'],
	// },
	// {
		// name: "[Gen 8] Roulettemons Random",
		// threads: [
			// `&bullet; <a href="https://www.smogon.com/forums/threads/3649106/">Roulettemons on Smogon Forums</a>`,
			// `&bullet; <a href="https://docs.google.com/spreadsheets/d/1EOA1m7JXTq7Zz0ViVI4n6lBppFjVBa4S1GqhAwkPTZQ/edit?usp=sharing">Spreadsheet</a>`,
			// `&bullet; <a href="https://docs.google.com/spreadsheets/d/1J5ZMVzTAfJ48KQWVE7jt1S6fm7Y8DQX1tFX0-iENWiw/edit?usp=sharing">Bonus Random Team Generator</a>`,
		// ],
		// team: 'random',
		// mod: 'roulettemons',
		// ruleset: ['Standard NatDex', 'Dynamax Clause', 'Sleep Clause Mod'],
		// onSwitchIn(pokemon) {
			// this.add('-start', pokemon, 'typechange', pokemon.species.types.join('/'), '[silent]');
		// },
		// onChangeSet(set) {
			// if (set.species === 'Chillyte-Mega') {
				// set.species = 'Chillyte';
				// set.ability = 'Grassy Surge';
			// }
		// },
	// },
	// {
      // name: "[Gen 8] OU Theorymons Random Battle",
      // threads: [ 
          // `&bullet; <a href="https://www.smogon.com/forums/threads/ss-ou-theorymon.3695574/">OU Theorymons on Smogon Forums</a>`,
          // `&bullet; <a href="https://docs.google.com/spreadsheets/d/1AgqKo8IiXky8apuu0FUgx4MJRVtsVwtuhg_Wj_ACgao/edit#gid=0">Spreadsheet</a>`,
      // ],
      // team: 'random',
		// mod: 'outheorymons', 
		// ruleset: ['Dynamax Clause', 'Data Mod', 'Species Clause'],
	// },
	// {
		// name: "[Gen 8] Roulettemons Random Doubles",
		// threads: [
		   // `&bullet; <a href="https://www.smogon.com/forums/threads/3649106/">Roulettemons on Smogon Forums</a>`,
			// `&bullet; <a href="https://docs.google.com/spreadsheets/d/1EOA1m7JXTq7Zz0ViVI4n6lBppFjVBa4S1GqhAwkPTZQ/edit?usp=sharing">Spreadsheet</a>`,
			// `&bullet; <a href="https://docs.google.com/spreadsheets/d/1J5ZMVzTAfJ48KQWVE7jt1S6fm7Y8DQX1tFX0-iENWiw/edit?usp=sharing">Bonus Random Team Generator</a>`,
		// ],
		// team: 'random',
		// gameType: 'doubles',
		// mod: 'roulettemons',
		// ruleset: ['Standard NatDex', 'Sleep Clause Mod'],
		// onSwitchIn(pokemon) {
			// this.add('-start', pokemon, 'typechange', pokemon.species.types.join('/'), '[silent]');
		// },
		// onChangeSet(set) {
			// if (set.species === 'Chillyte-Mega') {
				// set.species = 'Chillyte';
			// }
		// },
	// },
	///////////////////////////////////////////////////////////////
	/////////////// Pet Mods Bonus Formats //////////////////
	///////////////////////////////////////////////////////////////
	{
		section: "Pet Mods Bonus Formats",
		column: 3,
		// name: "petmodsbonusformats",
	},
	{
		name: "[Gen 8] JolteMons Random Battle",
		desc: `Pok&eacute;mon, items, abilities, and moves are redesigned for OU, and new items, abilities, and moves are added, all without changing base stats.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3694234/">JolteMons</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/149ZlQY0bJIAqfWB_233Dvbpqs3pVSHYpIoAQQkwquls/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: 'gen8joltemons',
		team: 'random',
		ruleset: ['Dynamax Clause', 'Obtainable', 'Species Clause', 'HP Percentage Mod', 'Cancel Mod', 'Sleep Clause Mod', 'Mega Data Mod', 'Z-Move Clause'],
	},
	{
		name: "[Gen 9] MetaMons Expanded",
		desc: [
			"In this Pet Mod, we will aim to create a decently-sized micrometa that will expand in the unique niches of some Pokémon, giving them the spotlight after all the time they have been waiting.",
		],
		threads: [
			'&bullet; <a href="https://www.smogon.com/forums/threads/metamons-slate-3-galarian-slowbro-sableye-grapploct.3703361/">MetaMons</a>',
			'&bullet; <a href="https://docs.google.com/spreadsheets/d/142lxuFtTgQCY56Wz_ZjAGaqlk7HgJj0CVKMChQcei1U/edit#gid=0">Spreadsheet</a>',
		],
		mod: 'metamons', 
		ruleset:['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Terastal Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Data Mod', 'Mega Data Mod', 'Z-Move Clause'],
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
		ruleset: ['Standard', 'Swagger Clause', 'Evasion Abilities Clause', 'Same Type Clause'],
		banlist: [
			'Aegislash', 'Altaria-Mega', 'Arceus', 'Blaziken', 'Darkrai', 'Deoxys-Base', 'Deoxys-Attack', 'Deoxys-Speed', 'Dialga', 'Genesect',
			'Gengar-Mega', 'Giratina', 'Giratina-Origin', 'Greninja', 'Groudon', 'Ho-Oh', 'Hoopa-Unbound', 'Kangaskhan-Mega', 'Kyogre', 'Kyurem-White',
			'Lucario-Mega', 'Lugia', 'Mawile-Mega', 'Medicham-Mega', 'Metagross-Mega', 'Mewtwo', 'Palkia', 'Rayquaza', 'Reshiram', 'Sableye-Mega',
			'Salamence-Mega', 'Shaymin-Sky', 'Slowbro-Mega', 'Talonflame', 'Xerneas', 'Yveltal', 'Zekrom',
			'Shadow Tag', 'Damp Rock', 'Focus Band', 'King\'s Rock', 'Quick Claw', 'Razor Fang', 'Smooth Rock', 'Soul Dew', 'Baton Pass',
		],
	},
	{
		name: "[Gen 6] Mix and Megas Revisited",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3713949/">Megas Revisited on Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1wK11cPHnPCmH7JFss6leKW6_-cumn3DuZA-YMzrzF-U/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: 'gen6mixandmegasrevisited',
		ruleset: ['Standard', 'Swagger Clause', 'Mega Data Mod'],
		banlist: [
			'Medichamite', 'Glalitite', 'Altarianite',
		],
		restricted: [
			'Arceus', 'Cresselia', 'Darkrai', 'Deoxys-Attack', 'Deoxys-Normal', 'Deoxys-Speed', 'Dialga', 'Dragonite', 'Genesect',
			'Giratina', 'Groudon', 'Ho-Oh', 'Kyogre', 'Kyurem-Black', 'Kyurem-White', 'Lucario', 'Lugia', 'Manaphy', 'Mewtwo',
			'Palkia', 'Rayquaza', 'Regigigas', 'Reshiram', 'Shaymin-Sky', 'Slaking', 'Xerneas', 'Yveltal', 'Zekrom',		
		],
		onValidateTeam(team) {
			const itemTable = new Set<ID>();
			for (const set of team) {
				const item = this.dex.items.get(set.item);
				if (!item.megaStone && !item.onPrimal &&
					!item.forcedForme?.endsWith('Origin') && !item.name.startsWith('Rusted')) continue;
				const natdex = this.ruleTable.has('standardnatdex');
				if (natdex && item.id !== 'ultranecroziumz') continue;
				const species = this.dex.species.get(set.species);
				if (species.isNonstandard && !this.ruleTable.has(`+pokemontag:${this.toID(species.isNonstandard)}`)) {
					return [`${species.baseSpecies} does not exist in gen 9.`];
				}
				if ((item.itemUser?.includes(species.name) && !item.megaStone && !item.onPrimal) ||
					(natdex && species.name.startsWith('Necrozma-') && item.id === 'ultranecroziumz')) {
					continue;
				}
				if (this.ruleTable.isRestrictedSpecies(species) || this.toID(set.ability) === 'powerconstruct') {
					return [`${species.name} is not allowed to hold ${item.name}.`];
				}
				if (itemTable.has(item.id)) {
					return [
						`You are limited to one of each mega stone/orb/rusted item/sinnoh item.`,
						`(You have more than one ${item.name})`,
					];
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
			const originalFormeSecies = this.dex.species.get(pokemon.species.originalSpecies);
			if (originalFormeSecies.exists && pokemon.m.originalSpecies !== originalFormeSecies.baseSpecies) {
				// Place volatiles on the Pokémon to show its mega-evolved condition and details
				this.add('-start', pokemon, originalFormeSecies.requiredItem || originalFormeSecies.requiredMove, '[silent]');
				const oSpecies = this.dex.species.get(pokemon.m.originalSpecies);
				if (oSpecies.types.length !== pokemon.species.types.length || oSpecies.types[1] !== pokemon.species.types[1]) {
					this.add('-start', pokemon, 'typechange', pokemon.species.types.join('/'), '[silent]');
				}
			}
		},
		onSwitchOut(pokemon) {
			// @ts-ignore
			const oMegaSpecies = this.dex.species.get(pokemon.species.originalSpecies);
			if (oMegaSpecies.exists && pokemon.m.originalSpecies !== oMegaSpecies.baseSpecies) {
				this.add('-end', pokemon, oMegaSpecies.requiredItem || oMegaSpecies.requiredMove, '[silent]');
			}
		},
	},
	
	///////////////////////////////////////////////////////////////
	/////////////// Gen 9 Offical Smogon Formats //////////////////
	///////////////////////////////////////////////////////////////
	{
		section: "Offical Smogon Formats",
		column: 3,
		// name: "officialsmogonformats",
	},
	{
		name: "[Gen 9] OU",

		mod: 'gen9',
		ruleset: ['Standard'],
		banlist: ['Uber', 'AG', 'Arena Trap', 'Moody', 'Sand Veil', 'Shadow Tag', 'Snow Cloak', 'King\'s Rock', 'Baton Pass'],
	},
	{
		name: "[Gen 9] Anything Goes",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3710911/">AG Metagame Discussion</a>`,
		],

		mod: 'gen9',
		ruleset: ['Min Source Gen = 9', 'Obtainable', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Endless Battle Clause'],
	},
	{
		name: "[Gen 9] Custom Game",

		mod: 'gen9',
		searchShow: false,
		debug: true,
		battle: {trunc: Math.trunc},
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod', 'Max Team Size = 24', 'Max Move Count = 24', 'Max Level = 9999', 'Default Level = 100'],
	},

	// B2/W2 Singles
	///////////////////////////////////////////////////////////////////

	{
		section: "B2/W2 Singles",
		column: 6,
	},
	{
		name: "[Gen 5] Ubers",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/posts/8286278/">BW2 Ubers</a>`,
		],

		mod: 'gen5',
		searchShow: false,
		ruleset: ['Standard', 'Sleep Clause Mod'],
	},
	{
		name: "[Gen 5] UU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3474024/">BW2 UU Viability Rankings</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/posts/6431094/">BW2 Sample Teams</a>`,
		],

		mod: 'gen5',
		searchShow: false,
		ruleset: ['Standard', 'Evasion Abilities Clause', 'Swagger Clause', 'Sleep Clause Mod'],
		banlist: ['Uber', 'OU', 'UUBL', 'Arena Trap', 'Drought', 'Sand Stream', 'Snow Warning', 'Prankster + Assist', 'Prankster + Copycat', 'Baton Pass'],
	},
	{
		name: "[Gen 5] RU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/posts/6431094/">BW2 Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3473124/">BW2 RU Viability Rankings</a>`,
		],

		mod: 'gen5',
		searchShow: false,
		ruleset: ['[Gen 5] UU', 'Baton Pass Clause', '!Sleep Clause Mod', 'Sleep Moves Clause'],
		banlist: ['UU', 'RUBL', 'Shadow Tag', 'Shell Smash + Baton Pass'],
		unbanlist: ['Prankster + Assist', 'Prankster + Copycat', 'Baton Pass'],
	},
	{
		name: "[Gen 5] NU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/posts/6431094/">BW2 Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3484121/">BW2 NU Viability Rankings</a>`,
		],

		mod: 'gen5',
		searchShow: false,
		ruleset: ['[Gen 5] RU', '!Sleep Moves Clause', 'Sleep Clause Mod'],
		banlist: ['RU', 'NUBL', 'Assist', 'Copycat'],
	},
	{
		name: "[Gen 5] PU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/posts/7326932/">BW2 PU</a>`,
		],

		mod: 'gen5',
		searchShow: false,
		ruleset: ['[Gen 5] NU', 'Sleep Moves Clause'],
		banlist: ['NU', 'PUBL', 'Damp Rock'],
	},
	{
		name: "[Gen 5] LC",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/posts/6431094/">BW2 Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3485860/">BW2 LC Viability Rankings</a>`,
		],

		mod: 'gen5',
		searchShow: false,
		ruleset: ['Standard', 'Little Cup', 'Sleep Moves Clause'],
		banlist: [
			'Gligar', 'Meditite', 'Misdreavus', 'Murkrow', 'Scraggy', 'Scyther', 'Sneasel', 'Tangela', 'Vulpix', 'Yanma',
			'Sand Rush', 'Sand Veil', 'Berry Juice', 'Soul Dew', 'Baton Pass', 'Dragon Rage', 'Sonic Boom', 'Swagger',
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
		ruleset: ['[Gen 5] OU', 'Same Type Clause', '!Gems Clause'],
		banlist: ['Latios'],
	},
	{
		name: "[Gen 5] ZU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/posts/8034680/">BW2 ZU</a>`,
		],

		mod: 'gen5',
		searchShow: false,
		ruleset: ['[Gen 5] PU'],
		banlist: ['PU', 'Articuno', 'Dragonair', 'Glalie', 'Machoke', 'Marowak', 'Omanyte', 'Regigigas', 'Trubbish', 'Whirlipede', 'Baton Pass'],
		unbanlist: ['Damp Rock'],
	},
	{
		name: "[Gen 5] CAP",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/posts/8967093/">BW2 CAP Viability Rankings</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/posts/8969768/">BW2 CAP Sample Teams</a>`,
		],

		mod: 'gen9',
		gameType: 'doubles',
		ruleset: ['Standard Doubles'],
		banlist: ['DUber', 'Shadow Tag'],
	},
	{
		name: "[Gen 5] Triples Custom Game",

		mod: 'gen5',
		gameType: 'triples',
		searchShow: false,
		debug: true,
		battle: {trunc: Math.trunc},
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod'],
	},

	// DPP Singles
	///////////////////////////////////////////////////////////////////

	{
		section: "DPP Singles",
		column: 7,
	},
	{
		name: "[Gen 4] UU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3710848/">National Dex Metagame Discussion</a>`,
		],

		mod: 'gen9',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Clause', 'Species Clause', 'Sleep Clause Mod'],
		banlist: ['ND Uber', 'Arena Trap', 'Moody', 'Power Construct', 'Shadow Tag', 'King\'s Rock', 'Quick Claw', 'Razor Fang', 'Baton Pass'],
	},
	{
		name: "[Gen 9] National Dex AG",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3672423/">National Dex AG</a>`,
		],

		mod: 'gen9',
		ruleset: ['Standard NatDex'],
	},
	{
		name: "[Gen 1] Custom Game",
		mod: 'gen1',
		searchShow: false,
		debug: true,
		battle: {trunc: Math.trunc},
		ruleset: ['HP Percentage Mod', 'Cancel Mod', 'Desync Clause Mod', 'Max Team Size = 24', 'Max Move Count = 24', 'Max Level = 9999', 'Default Level = 100'],
	},
	{
		name: "[Gen 2] Custom Game",

		mod: 'gen2',
		searchShow: false,
		debug: true,
		battle: {trunc: Math.trunc},
		ruleset: ['HP Percentage Mod', 'Cancel Mod', 'Max Team Size = 24', 'Max Move Count = 24', 'Max Level = 9999', 'Default Level = 100'],
	},
	{
		name: "[Gen 3] Custom Game",
		mod: 'gen3',
		searchShow: false,
		debug: true,
		battle: {trunc: Math.trunc},
		ruleset: ['HP Percentage Mod', 'Cancel Mod', 'Max Team Size = 24', 'Max Move Count = 24', 'Max Level = 9999', 'Default Level = 100'],
	},

	///////////////////////////////////////////////////////////////
	/////////////// Non-Pet Mod Formats //////////////////
	///////////////////////////////////////////////////////////////
	{
		section: "Non-Pet Mod Formats",
		column: 3,
		// name: "nonpetmodformats",
	},
	{
		name: "[Gen 2] NU",
		threads: [`&bullet; <a href="https://www.smogon.com/forums/threads/3642565/">GSC NU</a>`],

		mod: 'gen2',
		searchShow: false,
		ruleset: ['[Gen 2] UU'],
		banlist: ['UU', 'NUBL'],
		unbanlist: ['Agility + Baton Pass'],
	},
	{
		name: "[Gen 2] 1v1",
		threads: [`&bullet; <a href="https://www.smogon.com/forums/posts/8031464/">GSC 1v1</a>`],

		mod: 'gen2',
		searchShow: false,
		ruleset: [
			'Picked Team Size = 1', 'Max Team Size = 3',
			'[Gen 2] OU', 'Accuracy Moves Clause', 'Sleep Moves Clause', 'Team Preview',
		],
		banlist: [
			'Alakazam', 'Clefable', 'Snorlax', 'Zapdos', 'Berserk Gene', 'Focus Band', 'King\'s Rock', 'Quick Claw',
			'Attract', 'Destiny Bond', 'Explosion', 'Perish Song', 'Present', 'Self-Destruct', 'Swagger',
		],
	},
	{
		name: "[Gen 2] Nintendo Cup 2000",
		threads: [
			`&bullet; <a href="https://pastebin.com/PtqmRUhG">Littlest Cup VR and Sample Sets</a>`,
		],
		mod: 'littlestcup',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Evasion Items Clause', 'Species Clause', 'Sleep Clause Mod', 'Mega Rayquaza Clause', 'Max Level = 1'],
		banlist: ['All Pokemon', 'Belly Drum', 'Huge Power'],
		unbanlist: ['Shadow Tag', 'Pichu', 'Cleffa', 'Igglybuff', 'Togepi', 'Tyrogue', 'Smoochum', 'Elekid', 'Magby', 'Azurill', 'Wynaut', 'Budew', 'Chingling', 'Bonsly', 'Mime Jr.', 'Happiny', 'Munchlax', 'Riolu', 'Mantyke', 'Toxel'],
  },
	{
		name: "[Gen 9] Littlest Cup (No Tera)",
		desc: [
			"<b>Littlest Cup</b>: A National Dex metagame where only Baby Pokemon are allowed."
		],
		threads: [
			`&bullet; <a href="https://pastebin.com/PtqmRUhG">Littlest Cup VR and Sample Sets</a>`,
		],
		mod: 'littlestcup',
		searchShow: false,
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Evasion Items Clause', 'Species Clause', 'Sleep Clause Mod', 'Mega Rayquaza Clause', 'Max Level = 1', 'Terastal Clause'],
		banlist: ['All Pokemon', 'Belly Drum', 'Huge Power'],
		unbanlist: ['Shadow Tag', 'Pichu', 'Cleffa', 'Igglybuff', 'Togepi', 'Tyrogue', 'Smoochum', 'Elekid', 'Magby', 'Azurill', 'Wynaut', 'Budew', 'Chingling', 'Bonsly', 'Mime Jr.', 'Happiny', 'Munchlax', 'Riolu', 'Mantyke', 'Toxel'],
  },
	{
		name: "[Gen 6] TPDP Open",
		mod: 'tpdp2',
		debug: true,
		battle: {trunc: Math.trunc},
		ruleset: ['HP Percentage Mod', 'Cancel Mod', 'Max Team Size = 24', 'Max Move Count = 24', 'Max Level = 9999', 'Default Level = 100'],
	},
	{
		name: "[Gen 1] Ubers",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/posts/8286283/">RBY Ubers</a>`,
		],

		mod: 'gen1',
		searchShow: false,
		ruleset: ['Standard'],
	},
	{
		name: "[Gen 1] UU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3573896/">RBY UU Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3647713/">RBY UU Viability Rankings</a>`,
		],

		mod: 'gen1',
		searchShow: false,
		ruleset: ['[Gen 1] OU', 'APT Clause', 'Sleep Moves Clause'],
		banlist: ['OU', 'UUBL'],
	},
	{
		name: "[Gen 1] NU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3679758/">RBY NU Metagame Discussion &amp; Resources</a>`,
		],

		mod: 'gen1',
		searchShow: false,
		ruleset: ['[Gen 1] UU', '!APT Clause', '!Sleep Moves Clause'],
		banlist: ['UU', 'NUBL'],
	},
	{
		name: "[Gen 1] PU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3700527/">RBY PU Metagame Discussion &amp; Resources</a>`,
		],

		mod: 'gen1',
		searchShow: false,
		ruleset: ['[Gen 1] NU'],
		banlist: ['NU', 'PUBL'],
	},
	{
		name: "[Gen 6] TPDP Netplay",
		mod: 'tpdp2',
		debug: true,
		desc: `a close approximation of Touhou Puppet Dance Performance`,
		ruleset: ['Team Preview', 'Species Clause', 'Item Clause', 'Adjust Level Down = 50', 'OHKO Clause', 'Evasion Moves Clause', 'Dynamax Clause', 'Data Mod', 'Sleep Clause Mod'],
		banlist: ['Boundary Trance', 'Dream Shard', 
		'Camouflage', 'Favorable Wind', 'Dead of Night', //evasion
		'Poison Labyrinth', 'Adverse Wind', //trapping
		'Moody',
		'Backup Plan', //baton pass
		],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['TPDP OU', 'TPDP LC'];
			let natures = ['Red', 'Blue', 'Black', 'Green', 'White'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not allowed in TPDP.'];
				}
				if (!natures.includes(set.nature)) {
					return [set.nature + ' is not a valid nature in TPDP. Hint: to set Red, Blue, Black, White, or Green nature, use the Import/Export button.'];
				}
			}
		},
	},
	{
		name: "[Gen 9] White Tusk",

		mod: 'whitetusk',
		ruleset: ['Standard', 'Data Mod'],
		banlist: ['All Pokemon', 'King\'s Rock', 'Baton Pass'],
		unbanlist: ['Dust Bunnie', 'Rebirb', 'Strummingbird', 'Strummingbird-Viola', 'Strummingbird-Cello', 'Strummingbird-Contrabass', 'Strummingbird-Acoustic', 'Strummingbird-Electric', 'Strummingbird-Bass', 'Xylomist', 'Yeomelt', 'Zoplite', 'Yeoxylo', 'Xylozop', 'Zopyeo', 'Xylyeozop', 'Xylobone', 'Dormirr', 'Pufferfinch', 'Gumbawl', 'Gumbrawl-Empty', 'Gumbrawl-Bubble', 'Gumbrawl-Fresh', 'Gnawing Bark', 'Iron Mint', 'Caramilitant', 'Toughfee', 'Gasharmoir', 'Gumbrawl-Gachamech', 'Tartridge', 'Opixsi', 'Pinfrino', 'Leagle', 'Kuadrosin', 'Blite', 'Doctoxin', 'Moosquito', 'Parrox'],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			let combinationTable = ['Xylomist', 'Yeomelt', 'Zoplite', 'Yeoxylo', 'Xylozop', 'Zopyeo', 'Xylyeozop'];
			let combinationTest = [];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				console.log(template.name);
				if (combinationTable.includes(template.name)) {
					combinationTest.push(template.name);
				}
			}
			if ((combinationTest.includes('Xylomist') && combinationTest.includes('Yeoxylo')) ||
				(combinationTest.includes('Xylomist') && combinationTest.includes('Xylozop')) ||
				(combinationTest.includes('Xylomist') && combinationTest.includes('Xylyeozop')) ||
				(combinationTest.includes('Yeomelt') && combinationTest.includes('Yeoxylo')) ||
				(combinationTest.includes('Yeomelt') && combinationTest.includes('Zopyeo')) ||
				(combinationTest.includes('Yeomelt') && combinationTest.includes('Xylyeozop')) ||
				(combinationTest.includes('Zoplite') && combinationTest.includes('Xylozop')) ||
				(combinationTest.includes('Zoplite') && combinationTest.includes('Zopyeo')) ||
				(combinationTest.includes('Zoplite') && combinationTest.includes('Xylyeozop'))) {
				return ['You cannot have XYZ Pokemon with their combined forms.'];
			}
		},
	},
];
