export const Rulesets: {[k: string]: ModdedFormatData} = {
	standard: {
		effectType: 'ValidatorRule',
		name: 'Standard',
		desc: "The standard ruleset for all offical Smogon singles tiers (Ubers, OU, etc.)",
		ruleset: [
			'Obtainable', 'Team Preview', 'Sleep Clause Mod', 'Species Clause', 'Nickname Clause', 'OHKO Clause', 'Evasion Items Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod',
			'Terastal Clause', 'Min Source Gen = 9', 'Roovnen Move Dexits',
		],
	},
	evasionitemsclause: {
		effectType: 'ValidatorRule',
		name: 'Evasion Items Clause',
		desc: "Bans moves that lower the accuracy of moves used against the user",
		banlist: ['Lax Incense'],
		onBegin() {
			this.add('rule', 'Evasion Items Clause: Evasion items are banned');
		},
	},
	roovnendex: {
		effectType: 'ValidatorRule',
		name: 'Roovnen Dex',
		desc: "Only allows Pok&eacute;mon native to the Roovnen region",
		banlist: [
				'Cubone-Base', 'Sewaddle-Base', 'Swadloon-Base', 'Leavanny-Base', 'Roggenrola-Base', 'Boldore-Base', 'Gigalith-Base', 'Dratini-Base', 'Dragonair-Base', 'Dragonite-Base', 'Golett-Base', 'Rolycoly-Base', 
				'Carkol-Base', 'Vulpix-Alola', 'Ninetales-Alola', 'Raichu-Alola', 'Growlithe-Hisui', 'Arcanine-Hisui', 'Slowpoke-Galar', 'Slowbro-Galar', 'Wooper-Paldea', 'Slowking-Galar', 'Yamask-Galar'],
		onValidateSet(set, format) {
			const roovnenDex = [
				"Kunirsch", "Portrenti", "Elchunst", "Poniarc", "Sizzlorse", "Klimyross", "Zandound", "Fisound", "Synouder", "Pidgey", "Pidgeotto", "Pidgeot", "Nimmaup", "Kokick", "Schmesatt", "Antron", "Queant", 
				"Nymble", "Lokix", "Erinox", "Igloiceus", "Paras", "Parasect", "Fevee", "Pauleon", "Kalaustry", "Ranschaef", "Shroomish", "Breloom", "Boltria", "Falicle", "Frezalk", "Gletschalk", "Snom", "Frosmoth", 
				"Snover", "Abomasnow", "Cubone-Roovnen", "Glacone", "Oetzowak", "Mankey", "Primeape", "Annihilape", "Orkave", "Sewaddle-Roovnen", "Swadloon-Roovnen", "Leavanny-Roovnen", "Volecz", "Lidektro", "Yoar", 
				"Boarax", "Wildaxe", "Zubat", "Golbat", "Crobat", "Roggenrola-Roovnen", "Boldore-Roovnen", "Gigalith-Roovnen", "Sableye", "Mawile", "Graid", "Angrain", "Amethiz", "Scalethyst", "Juwyvern", "Nacli", 
				"Naclstack", "Garganacl", "Seditzel", "Growlithe", "Arcanine", "Fidough", "Dachsbun", "Buneary", "Lopunny", "Wooper", "Quagsire", "Nidoran-F", "Nidorina", "Nidoqueen", "Nidoran-M", "Nidorino", "Nidoking", 
				"Budew", "Roselia", "Roserade", "Tandemaus", "Maushold", "Sigilyph", "Dwebble", "Crustle", "Hippopotas", "Hippowdon", "Palossand", "Torkoal", "Torkoal-Roovnen", "Pauption", "Naturthis", "Kunturthis", 
				"Smeargle", "Cufant", "Copperajah", "Honedge", "Doublade", "Aegislash", "Baltoy", "Claydol", "Bruxish", "Yamask", "Cofagrigus", "Phantump", "Trevenant", "Drifloon", "Drifblim", "Greavard", "Houndstone", 
				"Axew", "Fraxure", "Haxorus", "Dratini-Roovnen", "Dragonair-Roovnen", "Dragonite-Roovnen", "Trapinch", "Vibrava", "Flygon", "Pancham", "Pangoro", "Toedscool", "Toedscruel", "Patwinis", "Rautwinis", 
				"Bounsweet", "Steenee", "Tsareena", "Lunatone", "Solrock", "Golett-Roovnen", "Goltink", "Lileep", "Cradily", "Anorith", "Armaldo", "Bronzor", "Bronzong", "Sinistea", "Polteageist", "Spiritomb", "Planind", 
				"Ysiogue", "Spritzee", "Numel", "Aromatisse", "Klink", "Klang", "Klinklang", "Rotom", "Varoom", "Revavroom", "Rolycoly-Roovnen", "Carkol-Roovnen", "Lockossal", "Drowzee", "Hypno", "Hypsand", "Mudbray", 
				"Mudsdale", "Klawf", "Charcadet", "Armarouge", "Ceruledge", "Gargion", "Carnivine", "Prehuck", "Miltank", "Magnemite",	"Magneton", "Magnezone", "Gligar", "Gliscor", "Taurot", "Minowing", "Cramorant", 
				"Cutiefly", "Ribombee", "Comfey", "Kramlauf", "Skitty", "Delcatty", "Ralts", "Kirlia", "Gardevoir", "Gallade", "Ressuredom", "Manutz", "Decani", "Foongus", "Amoonguss", "Impidimp", "Morgrem", "Grimmsnarl", 
				"Morelull", "Shiinotic", "Flabe\u0301be\u0301", "Floette", "Florges", "Expremoos", "Nuzleaf", "Shiftry", "Lotad", "Lombre", "Ludicolo", "Deerling", "Sawsbuck", "Pawniard", "Bisharp", "Kingambit", "Inkay", 
				"Malamar", "Mareep", "Flaaffy", "Ampharos", "Applin", "Flapple", "Appletun", "Burschuss", "Phoenuss", "Elekid", "Electabuzz", "Electivire", "Magby", "Magmar", "Magmortar", "Dhelmise", "Ostar-Richi", 
				"Musalkas", "Fossgoo", "Karrablast", "Escavalier", "Shelmet", "Accelgor", "Stufful", "Bewear", "Porygon", "Porygon2", "Porygon-Z", "Tinkatink", "Fomantis", "Tinkatuff", "Tinkaton", "Tropius", "Tropalm", 
				"Veluza", "Seganube", "Magikarp", "Gyarados", "Alomomola", "Chinchou", "Lanturn", "Laichto", "Cetoddle", "Cetitan", "Girafarig", "Farigiraf", "Jealokais", "Blitzle", "Zebstrika", "Litleo", "Pyroar", 
				"Bouffalant", "Volkobil", "Tynamo", "Eelektrik", "Eelektross", "Duskull", "Dusclops", "Dusknoir", "Maschiff", "Mabosstiff", "Shellos", "Gastrodon", "Slowpoke", "Slowbro", "Slowking", "Vulpix", "Ninetales", 
				"Mienfoo", "Mienshao", "Klefki", "Corphish", "Crawdaunt", "Oranguru", "Passimian", "Fomantis", "Lurantis", "Stunky", "Skuntank", "Zangoose", "Seviper", "Toxel", "Toxtricity", "Riolu", "Lucario", "Cleffa", 
				"Clefairy", "Clefable", "Timburr", "Gurdurr", "Conkeldurr", "Bellsprout", "Weepinbell", "Victreebel", "Oricorio", "Natu", "Xatu", "Heracross", "Pinsir", "Scyther", "Scizor", "Kleavor", "Venipede", "Whirlipede", 
				"Scolipede", "Ditto", "Larvesta", "Volcarona", "Fletchling", "Fletchinder", "Talonflame", "Vanillite", "Vanillish", "Vanilluxe", "Vullaby", "Mandibuzz", "Aerodactyl", "Pichu", "Pikachu", "Raichu", "Tyrogue", 
				"Hitmonlee", "Hitmonchan", "Hitmontop", "Absol", "Smoochum", "Jynx", "Lapras", "Druddigon", "Munchlax", "Snorlax", "Swinub", "Piloswine", "Mamoswine", "Cyclizar", "Noibat", "Noivern", "Yanma", "Yanmega", 
				"Numel", "Camerupt", "Dracozolt", "Arctozolt", "Dracovish", "Arctovish", "Gimmighoul", "Gholdengo", "Larvitar", "Pupitar", "Tyranitar", "Frigibax", "Artibax", "Baxcalibur", "Deino", "Zweilous", "Hydreigon", 
				"Beldum", "Metang", "Metagross", "Jangmo-o", "Hakamo-o", "Kommo-o", "Unown", "Uninown", "Latias", "Latios", "Ferreel", "Praspin", "Radriss", "Sigisin", "Bredoom", "Frosgross", "Abomacruel", "Porygon-V", 
				"Latakuno", "Yorlator", "Mranovo", "Curtowal", "Guadock", "Stoleagle", "Adlerz", "Hungurul", "Chasilen",
			];
			const species = this.dex.species.get(set.species || set.name);
			if (!roovnenDex.includes(species.baseSpecies) && !roovnenDex.includes(species.name) &&
				!this.ruleTable.has('+' + species.id)) {
				return [`${species.baseSpecies} is not in the Roovnen Pokédex.`];
			}
		},
	},
	roovnenmovedexits: {
		effectType: 'ValidatorRule',
		name: 'Roovnen Move Dexits',
		desc: "Bans dexited moves.",
		banlist: [
			'Absorb', 'Accelerock', 'Acid', 'Air Cutter', 'Aromatic Mist', 'Assurance', 'Astonish', 'Astral Barrage', 'Attack Order', 'Barb Barrage', 'Behemoth Bash', 'Behemoth Blade', 'Belch', 'Bind', 
			'Bitter Malice', 'Blazing Torque', 'Bleakwind Storm', 'Blood Moon', 'Ceaseless Edge', 'Celebrate', 'Chloroblast', 'Circle Throw', 'Combat Torque', 'Cut', 'Defend Order', 'Diamond Storm', 'Dire Claw', 
			'Doodle', 'Dragon Energy', 'Dragon Rush', 'Drum Beating', 'Dynamax Cannon', 'Eerie Impulse', 'Electro Ball', 'Fairy Wind', 'Fiery Wrath', 'Fire Lash', 'Force Palm', 'Freezing Glare', 'Glacial Lance', 
			'Glare', 'Happy Hour', 'Heal Bell', 'Heal Order', 'Hold Hands', 'Hyperspace Fury', 'Hyperspace Hole', 'Inferno', 'Infernalparade', 'Jet Punch', 'Lunar Blessing', 'Lunar Dance', 'Magic Room', 'Magical Torque', 
			'Magma Storm', 'Mortal Spin', 'Mud Shot', 'Mystical Power', 'Night Daze', 'No Retreat', 'Noxious Torque', 'Order Up', 'Origin Pulse', 'Pay Day', 'Precipice Blades', 'Present', 'Psyshield Bash', 'Relic Song', 
			'Roar of Time', 'Sandsear Storm', 'Shadow Force', 'Sludge Wave', 'Snipe Shot', 'Spacial Rend', 'Spicy Extract', 'Spore', 'Springtide Storm', 'Steam Eruption', 'Surging Strikes', 'Tera Blast', 'Thunder Cage', 
			'Thunderous Kick', 'Toxic', 'Triple Arrows', 'V-create', 'Victory Dance', 'Wicked Blow', 'Wicked Torque', 'Wildbolt Storm', 'Work Up'
		],
	},
};
