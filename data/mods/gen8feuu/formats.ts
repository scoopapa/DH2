import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 8] Fusion Evolution UU",
		mod: "gen8feuu",
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
		mod: "gen8feuu",
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
		mod: "gen8feuu",
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
	/*{
		name: "[Gen 8] Fusion Evolution UU Random Battle",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/fusion-evolution-under-used-submission-slate-3.3674163/">Fusion Evolution Under Used on Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1zFk1_DBIoXFFn_7JpvYbVBrW-f1oFFh80Wn0CJNnbVo/edit#gid=0">Spreadsheet</a>`,
		],
		mod: 'gen8feuu',
		team: 'random',
		ruleset: ['OHKO Clause', 'Obtainable', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Z-Move Clause', 'Data Mod', 'Mega Data Mod', 'Cancel Mod'],
	}*/
];