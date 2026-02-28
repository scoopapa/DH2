import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 9] Earth & Sky Horizons OU",
		desc: `The metagame based on Pok&eacute;mon Earth & Sky, a set of theoretical games created by En Passant, with the Horizons Expansion.`,
		threads: [
			`&bullet; <a href="https:docs.google.com/spreadsheets/d/1zLXacuxUs05muhn3fTty_UW2ww3KSZCmnzdsUzVR-x8/edit?usp=sharing">Competitive Cheat Sheet</a>`,
		],
		mod: 'earthsky',
		ruleset: [ 'Earth & Sky', 'Restricted Rules'],
		banlist: [
			'Alakazam-Mega', 'Arceus', 'Blaziken-Mega', 'Blastoise-Mega', 'Calyrex-Ice', 'Calyrex-Shadow', 'Chi-Yu', 'Chien-Pao', 'Darkrai',
 			'Deoxys-Attack', 'Deoxys-Base', 'Deoxys-Speed',	'Dialga', 'Eternatus', 'Flutter Mane', 'Genesect', 'Gengar-Mega', 'Giratina', 'Groudon',
 			'Ho-Oh', 'Kartana', 'Koraidon', 'Kyogre', 'Kyurem', 'Landorus-Base', 'Lucario-Mega', 'Lugia', 'Lunala', 'Magearna', 'Marshadow', 'Metagross-Mega',
			'Mewtwo', 'Miraidon', 'Naganadel', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Necrozma-Ultra', 'Palkia', 'Pheromosa', 'Rayquaza', 'Reshiram',
			'Robo Bundle', 'Salamence-Mega', 'Shaymin-Sky', 'Solgaleo', 'Xerneas', 'Yveltal', 'Zacian', 'Zamazenta', 'Zekrom',
 			'Oceides', 'Hatar', 'Zuros', 'Norphaval', 'Khatrophys', 'Arena Trap', 'Power Construct', 'Shadow Tag', 'Baton Pass', 'Stellar Tera Shard'
		],
	},
	{
		name: "[Gen 9] Earth & Sky Random Battle",
		mod: 'earthsky',
		ruleset: [ 'Sleep Clause Mod', 'Cancel Mod', 'Data Mod', 'Mega Data Mod', 'PotD'],
		team: 'random',
	},
	{
		name: "[Gen 9] Earth & Sky ESH Dexes",
		desc: `The Pok&eacute;mon Earth & Sky metagame allowing only Pok&eacute;mon that can have the Egelas, Sartori, and Hassrim origin marks.`,
		threads: [
			`&bullet; <a href="https:docs.google.com/spreadsheets/d/1zLXacuxUs05muhn3fTty_UW2ww3KSZCmnzdsUzVR-x8/edit?usp=sharing">Competitive Cheat Sheet</a>`,
		],
		mod: 'earthsky',
		ruleset: [ '[Gen 9] Earth & Sky Horizons OU'],
		banlist: ['All Pokemon'],
		unbanlist: [
				'Caeleaf','Sprop','Graecust','Iguava','Chucklava','Helmuana','Newtiny','Ruggeft','Claymander','Palrat','Spectrat','Shinx','Luxio','Luxray','Stunky','Skuntank','Fanfowl','Plumifowl','Pealated','Hoothoot','Noctowl','Montura','Twintura','Silvurah','Caterpie','Metapod','Butterfree','Budew','Roselia','Roserade','Sothodil','Sosphodel','Toybot','Aibot','Utilitron','Trubbish','Garbodor','Faerunee','Slowpoke','Slowbro','Slowking','Stunfisk','Burrorm','Burryrm','Scarabouch','Azurill','Marill','Azumarill','Ballooffalo','Magikarp','Gyarados','Tigrissle','Beedive','Basculin','Pikeral','Feebas','Milotic','Deerling','Sawsbuck','Smoliv','Dolliv','Arboliva','Slakoth','Vigoroth','Slaking','Roggenrola','Boldore','Gigalith','Lithoshroom','Litholich','Sableye','Mawile-Base','Klawf','Salandit','Salazzle','Axew','Fraxure','Haxorus','Rugblin','Runogre','Growlithe','Arcanine','Houndour','Houndoom','Joroo','Jaquol','Thylone','Fletchling','Fletchinder','Talonflame','Blitzle','Zebstrika','Falinks','Cufant','Copperajah','Phanpy','Donphan','Teddiursa','Ursaring','Trigenee','Hexyon','Hektillion','Termill','Terrazor','Heracross','Pinsir','Rockruff','Lycanroc','Elpine','Freezelk','Moorfrost','Snover','Abomasnow','Swinub','Piloswine','Mamoswine','Vanillite','Vanillish','Vanilluxe','Smoochum','Jynx','Zubat','Golbat','Crobat','Noibat','Noivern','Dunsparce','Dudunsparce','Drampa','Minior','Prominoid','Cryogonal','Riolu','Lucario-Base','Zorua','Zoroark','Igglybuff','Jigglypuff','Wigglytuff','Delibird','Tynamo','Eelektrik','Eelektross','Elekid','Electabuzz','Electivire','Milcery','Alcremie','Inkay','Malamar','Croagunk','Toxicroak','Farfetch\u2019d','Kendo\u2019no','Deino','Zweilous','Hydreigon','Joltik','Galvantula','Lemurod','Sandygast','Palossand','Crabrawler','Crabominable','Exeggcute','Exeggutor','Tropius','Wingull','Pelipper','Antarctross','Shellder','Cloyster','Finneon','Lumineon','Gobellos','Dragobellos','Plecuum','Vorplec','Pyukumuku','Pincurchin','Lioxin','Frillish','Jellicent','Scrunge','Dhelmise','Cuttlelass','Dreadnautilus','Kravokalypse','Cubone','Marowak','Duskull','Dusclops','Dusknoir','Ralts','Kirlia','Gardevoir','Gallade','Elgyem','Beheeyem','Unown','Sigilyph','Carbink','Stegrowth','Stegrove','Angkol','Macedon','Tauros','Miltank','Durant','Heatmor','Ponyta','Rapidash','Mienfoo','Mienshao','Ascelyte','Paraiagon','Absol','Helioptile','Heliolisk','Silicobra','Sandaconda','Obelith','Pyramyth','Magby','Magmar','Magmortar','Torkoal','Turtonator','Moroth','Keelmora','Yamask','Cofagrigus','Bronzor','Bronzong','Honedge','Doublade','Aegislash','Druddigon','Deceuceus','Fervintill','Selervis','Helyrion','Daemaesthus','Apherove','Poleboar','Pallatinel','Jurotera',
				'Glameow','Purugly','Eevee','Vaporeon','Jolteon','Flareon','Espeon','Umbreon','Leafeon','Glaceon','Sylveon','Audino','Stantler','Wyrdeer','Girafarig','Farigiraf','Hawlucha','Weedle','Kakuna','Beedrill','Petilil','Lilligant','Comfey','Sirfetch\u2019d','Bellsprout','Weepinbell','Victreebell','Carnivine','Ursaluna','Cranidos','Rampardos','Shieldon','Bastiodon','Jangmo-o','Hakamo-o','Kommo-o','Shuckle','Onix','Steelix','Phantump','Trevenant','Charvenant','Slugma','Magcargo','Skorupi','Drapion','Trapinch','Vibrava','Flygon','Slurpin','Suctlot','Corsola','Cursola','Luvdisc','Qwilfish','Overqwil','Basculegion','Minccino','Cinccino','Munna','Musharna','Runerigus','Spritzee','Aromatisse','Murkrow','Honchkrow','Aerodactyl','Snorunt','Glalie','Froslass','Darumaka','Darmanitan','Lillipup','Herdier','Stoutland','Kricketot','Kricketune','Amplitune','Toxel','Toxtricity','Rotom','Phione','Meltan',
				'Shelmet','Accelgor','Karrablast','Escavalier','Wooper','Quagsire','Clodsire','Tympole','Palpitoad','Seismitoad','Surskit','Masquerain','Goomy','Sliggoo','Goodra','Indeedee','Meowth','Persian','Perrserker','Nickit','Thievul','Tandemaus','Maushold','Espurr','Meowstic','Gothita','Gothorita','Gothitelle','Burmy','Wormadam-Plant','Mothim','Klefki','Dedenne','Grubbin','Charjabug','Vikavolt','Squawkabilly','Squawkapo','Gastly','Haunter','Gengar-Base','Koffing','Weezing','Misdreavus','Mismagius','Finizen','Palafin','Horsea','Seadra','Kingdra','Clobbopus','Grapploct','Remoraid','Octillery','Skrelp','Dragalge','Relicanth','Chewtle','Drednaw','Wimpod','Golisopod','Krabby','Kingler','Hippopotas','Hippowdon','Varoom','Revavroom','Kangaskhan','Geodude','Graveler','Golem','Stonjourner','Pawniard','Bisharp','Kingambit','Zangoose','Seviper','Tyrogue','Hitmonchan','Hitmonlee','Hitmontop','Oricorio','Flabebe','Floette-Base','Florges','Skarmory','Vulpix','Ninetales','Solrunt','Ralie','Pharoslass','Bergmite','Avalugg','Charcadet','Armarouge','Ceruledge','Pawmi','Pawmo','Pawmot','Mankey','Primeape','Annihilape','Sneasel','Sneasler','Weavile','Oddish','Gloom','Vileplume','Bellossom','Pumpkaboo','Gourgeist','Tarountula','Spidops','Applin','Flapple','Appletun','Dipplin','Hydrapple','Gimmighoul','Gholdengo'
			]
	},
	/*{
		name: "[Gen 9] Earth & Sky Horizons Doubles",
		threads: [
			`&bullet; <a href="https:docs.google.com/spreadsheets/d/1zLXacuxUs05muhn3fTty_UW2ww3KSZCmnzdsUzVR-x8/edit?usp=sharing">Competitive Cheat Sheet</a>`,
		],
		mod: 'earthsky',
		gameType: 'triples',
		ruleset: [ 'Earth & Sky', 'Restricted Rules', 'Gravity Sleep Clause'],
		banlist: [
			'Arceus', 'Calyrex-Ice', 'Calyrex-Shadow', 'Chi-Yu', 'Chien-Pao', 'Darkrai', 'Deoxys-Attack', 'Deoxys-Base', 'Deoxys-Speed',
			'Dialga', 'Eternatus', 'Genesect', 'Gengar-Mega', 'Giratina', 'Groudon', 'Ho-Oh', 'Koraidon', 'Kyogre', 'Kyurem', 'Landorus-Base',
			'Lugia', 'Lunala', 'Marshadow', 'Metagross-Mega', 'Mewtwo', 'Miraidon', 'Naganadel', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Palkia',
			'Pheromosa', 'Rayquaza', 'Reshiram', 'Salamence-Mega', 'Shaymin-Sky', 'Solgaleo', 'Xerneas', 'Yveltal', 'Zacian', 'Zamazenta', 'Zekrom',
			'Oceides', 'Hatar', 'Zuros', 'Norphaval', 'Khatrophys', 'Arena Trap', 'Power Construct', 'Shadow Tag', 'Baton Pass', 'Stellar Tera Shard'
		],
	},*/
	{
		name: "[Gen 9] Earth & Sky Horizons Triples",
		threads: [
			`&bullet; <a href="https:docs.google.com/spreadsheets/d/1zLXacuxUs05muhn3fTty_UW2ww3KSZCmnzdsUzVR-x8/edit?usp=sharing">Competitive Cheat Sheet</a>`,
		],
		mod: 'earthsky',
		gameType: 'triples',
		ruleset: [ 'Earth & Sky', 'Restricted Rules', 'Gravity Sleep Clause'],
		banlist: [
			'Arceus', 'Calyrex-Ice', 'Calyrex-Shadow', 'Chi-Yu', 'Chien-Pao', 'Darkrai', 'Deoxys-Attack', 'Deoxys-Base', 'Deoxys-Speed',
			'Dialga', 'Eternatus', 'Genesect', 'Gengar-Mega', 'Giratina', 'Groudon', 'Ho-Oh', 'Koraidon', 'Kyogre', 'Kyurem', 'Landorus-Base',
			'Lugia', 'Lunala', 'Marshadow', 'Metagross-Mega', 'Mewtwo', 'Miraidon', 'Naganadel', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Palkia',
			'Pheromosa', 'Rayquaza', 'Reshiram', 'Salamence-Mega', 'Shaymin-Sky', 'Solgaleo', 'Xerneas', 'Yveltal', 'Zacian', 'Zamazenta', 'Zekrom',
			'Oceides', 'Hatar', 'Zuros', 'Norphaval', 'Khatrophys', 'Arena Trap', 'Power Construct', 'Shadow Tag', 'Baton Pass', 'Stellar Tera Shard'
		],
	},
	/*{
		name: "[Gen 9] Earth & Sky Little Cup",
		threads: [
			`&bullet; <a href="https:docs.google.com/spreadsheets/d/1zLXacuxUs05muhn3fTty_UW2ww3KSZCmnzdsUzVR-x8/edit?usp=sharing">Competitive Cheat Sheet</a>`,
		],
		mod: 'earthsky',
		ruleset: [ 'Earth & Sky', 'Little Cup'],
		banlist: ['Aipom', 'Corsola-Galar', 'Cutiefly', 'Drifloon', 'Dunsparce', 'Duraludon', 'Girafarig', 'Gligar', 'Gothita', 'Meditite', 'Misdreavus', 'Murkrow', 'Porygon', 'Scyther', 'Sneasel', 'Stantler', 'Swirlix', 
		'Tangela', 'Trapinch', 'Vulpix', 'Wingull', 'Yanma', 'Baton Pass', 'Dragon Rage', 'Sonic Boom', 'Sticky Web'],
	},
	{
		name: "[Gen 9] Earth & Sky Horizons CAP",
		desc: `Adapts CAP Pok&eacute;mon into Earth & Sky using the same design philosophy as all other Pok&eacute;mon.`,
		threads: [
			`&bullet; <a href="https:docs.google.com/spreadsheets/d/1zLXacuxUs05muhn3fTty_UW2ww3KSZCmnzdsUzVR-x8/edit?usp=sharing">Competitive Cheat Sheet</a>`,
		],
		mod: 'earthsky',
		ruleset: [ '[Gen 9] Earth & Sky Horizons OU', '+CAP'],
	},*/
];