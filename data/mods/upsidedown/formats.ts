import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 9] Upside Down OU",
		desc: `Modern Mechanics and Pokemon mixed with an Old Gen Powerlevel, complete with No Team Preview!`,
		threads: [
			`<a href="https://docs.google.com/spreadsheets/d/15PdTt3gUYmwb7UKwO-bmboIZOg9rRaC1vZhyXQRWbF0">Spreadsheet</a>`,
		],
		mod: 'upsidedown',
		teambuilderFormat: "National Dex",
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Clause', 'Species Clause', 'Sleep Clause Mod', 'Terastal Clause', '!Team Preview'],
		banlist: ['All Pokemon', 'Arena Trap', 'Moody', 'Power Construct', 'Shadow Tag', 'King\'s Rock', 'item: Quick Claw', 'Razor Fang',
		'Assist', 'Last Respects', 'Shed Tail', 'Sticky Web', 'Victory Dance', 'Diancite', 'Mawilite', 'Heavy Duty Boots', 'Choice Specs', 'Choice Scarf',
		'Life Orb', 'Eviolite', 'Flame Orb', 'Toxic Orb', 'Air Balloon', 'Light Clay', 'Terrain Extender', 'Damp Rock', 'Heat Rock', 'Smooth Rock',
		'Icy Rock', 'Red Card', 'Eject Pack', 'Eject Button', 'Weakness Policy', 'Blunder Policy', 'Booster Energy', 'Throat Spray', 'Clear Amulet',
		'Custap Berry', 'Focus Sash', 'Occa Berry', 'Passho Berry', 'Rindo Berry', 'Wacan Berry', 'Yache Berry', 'Colbur Berry', 'Payapa Berry',
		'Roseli Berry', 'Haban Berry', 'Coba Berry', 'Charti Berry', 'Shuca Berry', 'Tanga Berry', 'Kebia Berry', 'Babiri Berry', 'Chople Berry',
		'Kasib Berry', 'Fire Gem', 'Water Gem', 'Grass Gem', 'Electric Gem', 'Ice Gem', 'Dark Gem', 'Psychic Gem', 'Dragon Gem', 'Flying Gem',
		'Bug Gem', 'Fighting Gem', 'Rock Gem', 'Ground Gem', 'Steel Gem', 'Ghost Gem', 'Poison Gem', 'Abomasite', 'Absolite', 'Aerodactylite',
		'Aggronite', 'Alakazite', 'Altarianite', 'Ampharosite', 'Banettite', 'Beedrillite', 'Blastoisinite', 'Blazikenite', 'Blue Orb',
		'Cameruptite', 'Charizardite X', 'Charizardite Y', 'Galladite', 'Garchompite', 'Gardevoirite', 'Gengarite', 'Glalitite', 'Gyaradosite',
		'Houndoominite', 'Kangaskhanite', 'Latiasite', 'Latiosite', 'Lopunnite', 'Lucarionite', 'Manectite', 'Medichamite', 'Metagrossite',
		'Mewtwonite X', 'Mewtwonite Y', 'Pidgeotite', 'Pinsirite', 'Red Orb', 'Sablenite', 'Salamencite', 'Sceptilite', 'Scizorite',
		'Sharpedonite', 'Slowbronite', 'Steelixite', 'Swampertite', 'Tyranitarite', 'Venusaurite',
		],
		unbanlist: ['Baton Pass', 'Wishiwashi', 'Mawile', 'Togepi', 'Togetic', 'Tarountula', 'Spidops', 'Pyukumuku', 'Cursola', 'Scatterbug', 'Spewpa', 'Vivillon', 'Bunnelby', 'Diggersby', 'Obstagoon',
		'Burmy', 'Wormadam', 'Mothim', 'Woobat', 'Swoobat', 'Wiglett', 'Wugtrio', 'Clodsire', 'Emolga', 'Cubone', 'Dedenne',
		'Togedemaru', 'Morpeko', 'Audino', 'Kecleon', 'Purrloin', 'Liepard', 'Honedge', 'Doublade', 'Snubbull', 'Granbull', 'Nymble',
		'Lokix', 'Nickit', 'Thievul', 'Gossifleur', 'Eldegoss', 'Finneon', 'Lumineon', 'Skwovet', 'Greedent', 'Spritzee', 'Aromatisse',
		'Espurr', 'Throh', 'Sawk', 'Klefki', 'Rellor', 'Rabsca', 'Trubbish', 'Garbodor', 'Stunfisk', 'Furfrou', 'Joltik', 'Galvantula',
		'Phantump', 'Trevenant', 'Tatsugiri', 'Deerling', 'Sawsbuck', 'Snom', 'Frosmoth', 'Cramorant', 'Oricorio', 'Veluza', 'Crabrawler',
		'Crabominable', 'Salandit', 'Salazzle', 'Orthworm', 'Swirlix', 'Slurpuff', 'Darumaka', 'Darmanitan', 'Helioptile', 'Heliolisk',
		'Flittle', 'Espathra', 'Golett', 'Golurk', 'Sandygast', 'Palossand', 'Runerigus', 'Heatmor', 'Durant', 'Venipede', 'Whirlipede',
		'Scolipede', 'Druddigon', 'Pikipek', 'Trumbeak', 'Toucannon', 'Turtonator', 'Pichu', 'Pikachu', 'Shroodle', 'Grafaiai', 'Chewtle',
		'Drednaw', 'Drampa', 'Dwebble', 'Crustle', 'Elgyem', 'Beheeyem', 'Capsakid', 'Scovillain', 'Munna', 'Musharna', 'Rockruff',
		'Greavard', 'Houndstone', 'Pidove', 'Tranquill', 'Unfezant', 'Lechonk', 'Pawmi', 'Pawmo', 'Pawmot', 'Bouffalant', 'Yamper', 'Boltund',
		'Skrelp', 'Dragalge', 'Pancham', 'Pangoro', 'Tirtouga', 'Carracosta', 'Mareanie', 'Toxapex', 'Rookidee', 'Corvisquire',
		'Corviknight', 'Blitzle', 'Zebstrika', 'Pansear', 'Panpour', 'Pansage', 'Simisear', 'Simipour', 'Simisage', 'Fletchling',
		'Fletchinder', 'Talonflame', 'Grubbin', 'Charjabug', 'Vikavolt', 'Varoom', 'Revavroom', 'Mudbray', 'Mudsdale', 'Sewaddle',
		'Swadloon', 'Leavanny', 'Cufant', 'Copperajah', 'Clauncher', 'Clawitzer', 'Carbink', 'Binacle', 'Barbaracle', 'Stufful', 'Bewear',
		'Hawlucha', 'Nacli', 'Naclstack', 'Garganacl', 'Toxel', 'Cubchoo', 'Beartic', 'Maschiff', 'Mabosstiff', 'Dracozolt', 'Arctovish',
		'Sirfetchd', 'Litleo', 'Pyroar', 'Sinistea', 'Polteageist', 'Tympole', 'Palpitoad', 'Seismitoad', 'Bounsweet', 'Steenee',
		'Tsareena', 'Blipbug', 'Dottler', 'Orbeetle', 'Rolycoly', 'Carkol', 'Coalossal', 'Rufflet', 'Silicobra', 'Sandaconda', 'Smoliv',
		'Dolliv', 'Arboliva', 'Impidimp', 'Morgrem', 'Grimmsnarl', 'Hatenna', 'Hattrem', 'Hatterene', 'Bergmite', 'Avalugg', 'Toedscool',
		'Toedscruel', 'Tynamo', 'Eelektrik', 'Eelektross', 'Mime Jr.', 'Mr. Rime', 'Girafarig', 'Farigiraf', 'Cetoddle', 'Cetitan',
		'Stantler', 'Wyrdeer', 'Sizzlipede', 'Centiskorch', 'Glimmet', 'Glimmora', 'Exeggcute', 'Dondozo', 'Noibat', 'Noivern',
		'Duraludon', 'Skiddo', 'Gogoat', 'Dunsparce', 'Dudunsparce', 'Poipole', 'Naganadel', 'Fuecoco', 'Crocalor', 'Skeledirge',
		'Rowlet', 'Dartrix', 'Scorbunny', 'Raboot', 'Cinderace', 'Popplio', 'Brionne', 'Primarina', 'Froakie', 'Frogadier', 'Greninja',
		'Snivy', 'Servine', 'Serperior', 'Flabébé', 'Floette', 'Florges', 'Archen', 'Archeops', 'Blacephalon', 'Celesteela',
		'Slither Wing', 'Iron Jugulis', 'Iron Bundle', 'Scream Tail', 'Sandy Shocks', 'Great Tusk', 'Iron Treads', 'Articuno', 'Virizion',
		'Iron Leaves', 'Brute Bonnet', 'Iron Thorns', 'Meloetta', 'Diancie', 'Goomy', 'Sliggoo', 'Goodra', 'Corsola-Galar',
		'Rattata-Alola', 'Raticate-Alola', 'Zigzagoon-Galar', 'Linoone-Galar', 'Wormadam-Sandy', 'Wormadam-Trash Cloak', 'Wooper-Paldea',
		'Marowak-Alola', 'Sneasel-Hisui', 'Sandshrew-Alola', 'Sandslash-Alola', 'Basculin-White-Striped', 'Basculegion', 'Basculegion-F',
		'Meowstic', 'Meowstic-F', 'Yamask-Galar', 'Raichu-Alola', 'Lycanroc', 'Lycanroc-Midnight', 'Oinkologne', 'Oinkologne-F',
		'Voltorb-Hisui', 'Electrode-Hisui', 'Pumpkaboo', 'Pumpkaboo-Small', 'Pumpkaboo-Large', 'Pumpkaboo-Super', 'Gourgeist',
		'Gourgeist-Small', 'Gourgeist-Large', 'Gourgeist-Super', 'Geodude-Alola', 'Graveler-Alola', 'Golem-Alola', 'Ponyta-Galar',
		'Rapidash-Galar', 'Toxtricity', 'Toxtricity-Low-Key', 'Farfetchd-Galar', 'Braviary-Hisui', 'Mr. Mime-Galar', 'Exeggutor-Alola',
		'Decidueye-Hisui', 'Ursaluna-Bloodmoon', 'Articuno-Galar', 'Audino-Mega', 'Petilil', 'Lilligant-Hisui', 'Clobbopus', 'Grapploct',
		'Amaura', 'Aurorus', 'Diglett-Alola', 'Dugtrio-Alola', 'Qwilfish-Hisui', 'Overqwil', 'Morelull', 'Shiinotic',
		'Wooloo', 'Dubwool', 'Bombirdier',
		],
		onValidateTeam(team, format) {
            /**@type {{[k: string]: true}}*/
            let speciesTable = {};
            let allowedTiers = ['Upside Down OU', 'Upside Down NFE', 'Upside Down LC']; //Upside Down Uber exists but not playable
            for (const set of team) {
                let template = this.dex.species.get(set.species);
                                //if (template === 'Ursaluna-Bloodmoon' && set.nature !== 'Hardy') return [set.species + ' must have a Hardy Nature.'];
									//non functional atm
								//if (template === 'Toxtricity' && ['Lonely', 'Bold', 'Relaxed', 'Timid', 'Serious', 'Modest', 'Mild', 'Quiet', 'Bashful', 'Calm', 'Gentle', 'Careful'].includes(set.nature)) return [set.nature + 'is not a valid nature for this form of Toxtricity.'];
									//non functional atm also amped tox keeps getting
								//if (template === 'Toxtricity-Low-Key' && ['Hardy', 'Brave', 'Adamant', 'Naughty', 'Docile', 'Impish', 'Lax', 'Hasty', 'Jolly', 'Naive', 'Rash', 'Sassy', 'Quirky'].includes(set.nature)) return [set.species + 'is not a valid nature for this form of Toxtricity.'];
                if (!allowedTiers.includes(template.tier)) {
                    return [set.species + ' is not legal in Upside Down OU.'];
                }
            }
        },
	}
];