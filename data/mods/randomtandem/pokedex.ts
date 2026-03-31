export const Pokedex: {[k: string]: ModdedSpeciesData} = {
	/*
	placeholder: {
		inherit: true,
		mons: [
			[
				{
					species: '',
					item: '',
					ability: ['', ''],
					teraType: ['', ''],
				},
				['', ''], ['', '', '']
			],
			[
				{
					species: '',
					item: '',
					ability: '',
					teraType: '',
				},
				['', '', '', '']
			]
		],
	},
	*/
	garchomp: {
		inherit: true,
		mons: [
			[
				{
					species: 'Forretress',
					item: 'leftovers',
					ability: 'Sturdy',
					teraType: 'Water',
				},
				['recover', 'ironhead'], ['rapidspin', 'voltswitch', 'spikes']
			],
			[
				{
					species: 'Rotom-Heat',
					item: 'heavydutyboots',
					ability: 'Levitate',
					gender: 'N',
					teraType: ['Poison', 'Grass', 'Fire'],
				},
				['blueflare', 'voltswitch'], ['nastyplot', 'painsplit', 'willowisp']
			],
			[
				{
					species: 'Gardevoir',
					item: 'lifeorb',
					ability: 'Trace',
					teraType: ['Fairy', 'Fire'],
				},
				['calmmind', 'psyshock', 'moonblast', 'mysticalfire']
			],
			[
				{
					species: 'Froslass',
					item: 'focussash',
					ability: ['Cursed Body', 'Perish Body'],
					gender: 'F',
					teraType: ['Fighting', 'Steel'],
				},
				['tripleaxel', 'poltergeist'], ['willowisp', 'spikes', 'destinybond']
			]
		],
	},
	slitherwing: {
		inherit: true,
		mons: [
			[
				{
					species: 'Magnezone',
					item: 'assaultvest',
					ability: 'Analytic',
					gender: 'N',
					teraType: ['Grass', 'Fire'],
				},
				['discharge', 'flashcannon', 'voltswitch', 'terablast']
			],
			[
				{
					species: 'Walking Wake',
					item: 'choicespecs',
					ability: 'Protosynthesis',
					gender: 'N',
					teraType: ['Water', 'Dragon'],
				},
				['dracometeor', 'flamethrower', 'hydrosteam', 'dragonpulse']
			],
			[
				{
					species: 'Arcanine',
					item: 'heavydutyboots',
					ability: 'Intimidate',
					teraType: ['Fire', 'Fighting', 'Flying'],
				},
				['flareblitz', 'extremespeed'], ['closecombat', 'morningsun', 'swordsdance']
			],
			[
				{
					species: 'Tsareena',
					item: 'heatrock',
					ability: 'Drought',
					teraType: ['Fire', 'Steel'],
				},
				['solarblade', 'rapidspin'], ['knockoff', 'uturn', 'synthesis']
			]
		],
	},
	slowking: {
		inherit: true,
		mons: [
			[
				{
					species: 'Glaceon',
					item: 'heavydutyboots',
					ability: 'Slush Rush',
					teraType: 'Ground',
				},
				['freezedry', 'terablast'], ['blizzard', 'shadowball', 'calmmind']
			],
			[
				{
					species: 'Hydrapple',
					item: 'heavydutyboots',
					ability: 'Regenerator',
					teraType: ['Fairy', 'Steel'],
				},
				['ficklebeam', 'earthpower'], ['recover', 'gigadrain', 'nastyplot']
			],
			[
				{
					species: 'Excadrill',
					item: 'leftovers',
					ability: 'Mold Breaker',
					teraType: 'Flying',
				},
				['rapidspin', 'earthquake'], ['ironhead', 'swordsdance', 'stealthrock', 'zingzap']
			],
			[
				{
					species: 'Flutter Mane',
					item: ['leftovers', 'lifeorb'],
					ability: 'Levitate',
					gender: 'N',
					teraType: ['Ghost', 'Electric'],
				},
				['moonblast', 'shadowball'], ['thunderbolt', 'calmmind', 'taunt']
			],
		],
	},
	cobalion: {
		inherit: true,
		mons: [
			[
				{
					species: 'Hatterene',
					item: ['leftovers', 'rockyhelmet'],
					ability: 'magicbounce',
					teraType: 'Water',
				},
				['psychicnoise', 'nuzzle'], ['drainingkiss', 'mysticalfire', 'calmmind']
			],
			[
				{
					species: 'Flygon',
					item: 'choicescarf',
					ability: 'Levitate',
					teraType: 'Steel',
				},
				['earthquake', 'uturn'], ['flareblitz', 'dragonclaw', 'stoneedge']
			],
			[
				{
					species: 'Klefki',
					item: 'leftovers',
					ability: 'Prankster',
					teraType: ['Water', 'Ghost'],
				},
				['encore', 'thunderwave'], ['spikes', 'foulplay', 'playrough']
			],
			[
				{
					species: 'Scream Tail',
					item: ['choiceband', 'assaultvest'],
					ability: 'Huge Power',
					gender: 'N',
					teraType: ['Fairy', 'Water'],
				},
				['playrough', 'drainpunch'], ['psychicfangs', 'firepunch', 'icepunch', 'thunderpunch']
			]
		],
	},
	keldeo: {
		inherit: true,
		mons: [
			[
				{
					species: 'Zarude',
					item: ['choiceband', 'choicescarf'],
					ability: 'darkaura',
					gender: 'N',
					teraType: ['Electric', 'Fighting'],
				},
				['powerwhip', 'knockoff', 'closecombat', 'uturn']
			],
			[
				{
					species: 'Manaphy',
					item: 'leftovers',
					ability: 'Unaware',
					gender: 'N',
					teraType: ['Steel', 'Grass'],
				},
				['scald', 'energyball'], ['heartswap', 'knockoff', 'uturn']
			],
			[
				{
					species: 'Volcanion',
					item: 'assaultvest',
					ability: 'Water Absorb',
					gender: 'N',
					teraType: ['Ground', 'Fire'],
				},
				['steameruption', 'bitterblade'], ['earthquake', 'sludgebomb', 'flamecharge']
			],
			[
				{
					species: 'Shaymin-Sky',
					item: 'widelens',
					ability: 'Serene Grace',
					gender: 'N',
					teraType: 'Fire',
				},
				['seedflare', 'fusionflare', 'substitute', 'leechseed']
			]
		],
	},
	keldeoresolute: {
		inherit: true,
		mons: [
			[
				{
					species: 'Zarude',
					item: ['choiceband', 'choicescarf'],
					ability: 'darkaura',
					gender: 'N',
					teraType: ['Electric', 'Fighting'],
				},
				['powerwhip', 'knockoff', 'closecombat', 'uturn']
			],
			[
				{
					species: 'Manaphy',
					item: 'leftovers',
					ability: 'Unaware',
					gender: 'N',
					teraType: ['Steel', 'Grass'],
				},
				['scald', 'energyball'], ['heartswap', 'knockoff', 'uturn']
			],
			[
				{
					species: 'Volcanion',
					item: 'assaultvest',
					ability: 'Water Absorb',
					gender: 'N',
					teraType: ['Ground', 'Fire'],
				},
				['steameruption', 'bitterblade'], ['earthquake', 'sludgebomb', 'flamecharge']
			],
			[
				{
					species: 'Shaymin-Sky',
					item: 'widelens',
					ability: 'Serene Grace',
					gender: 'N',
					teraType: 'Fire',
				},
				['seedflare', 'fusionflare', 'substitute', 'leechseed']
			]
		],
	},
	tsareena: {
		inherit: true,
		mons: [
			[
				{
					species: 'Salazzle',
					item: 'leftovers',
					ability: ['corrosion', 'merciless'],
					teraType: ['Grass', 'Ground'],
				},
				['toxic', 'flamethrower'], ['nastyplot', 'toxic', 'substitute', 'encore', 'sludgebomb', 'protect']
			],
			[
				{
					species: 'Primarina',
					item: 'choicespecs',
					ability: 'Liquid Voice',
					teraType: 'Water',
				},
				['clangingscales', 'flipturn', 'energyball', 'moonblast']
			],
			[
				{
					species: 'Entei',
					item: 'choiceband',
					ability: ['Pressure', 'Inner Focus'],
					gender: 'N',
					teraType: ['Fire', 'Ground', 'Normal'],
				},
				['sacredfire', 'stoneedge', 'earthquake', 'extremespeed']
			],
			[
				{
					species: 'Gyarados',
					item: 'lumberry',
					ability: ['Moxie', 'Motor Drive'],
					teraType: ['Flying', 'Grass', 'Ice'],
				},
				['waterfall', 'terablast', 'dragondance', 'earthquake']
			]
		],
	},
	zapdos: {
		inherit: true,
		mons: [
			[
				{
					species: 'Snorlax',
					item: 'leftovers',
					ability: 'thickfat',
					teraType: ['Fairy', 'Ghost'],
				},
				['bodyslam', 'slackoff'], ['curse', 'earthquake', 'heatcrash', 'crunch']
			],
			[
				{
					species: 'Cloyster',
					item: 'heavydutyboots',
					ability: 'Skill Link',
					teraType: ['Water', 'Ice'],
				},
				['shellsmash', 'iciclespear', 'rockblast', 'watershuriken']
			],
			[
				{
					species: 'Tyranitar',
					item: ['leftovers', 'chopleberry'],
					ability: 'Sand Stream',
					teraType: ['Flying', 'Steel'],
				},
				['knockoff', 'rockblast'], ['stealthrock', 'mortalspin', 'earthquake']
			],
			[
				{
					species: 'Gengar',
					item: 'leftovers',
					ability: 'Levitate',
					teraType: ['Fairy', 'Electric'],
				},
				['hex', 'sludgebomb'], ['taunt', 'willowisp', 'toxic', 'thunderwave']
			]
		],
	},
	landorustherian: {
		inherit: true,
		mons: [
			[
				{
					species: 'Cresselia',
					item: 'leftovers',
					ability: 'Levitate',
					gender: 'N',
					teraType: ['Poison', 'Fairy'],
				},
				['moonblast', 'mysticalpower'], ['moonlight', 'thunderwave', 'lunardance']
			],
			[
				{
					species: 'Heatran',
					item: 'airballoon',
					ability: ['Flash Fire', 'Flame Body'],
					gender: 'N',
					teraType: ['Ground', 'Grass'],
				},
				['magmastorm', 'earthpower'], ['lavaplume', 'heavyslam', 'torment', 'protect']
			],
			[
				{
					species: 'Amoonguss',
					item: ['rockyhelmet', 'blacksludge'],
					ability: 'Regenerator',
					teraType: 'Water',
				},
				['spore', 'foulplay'], ['synthesis', 'clearsmog', 'gigadrain', 'rapidspin']
			],
			[
				{
					species: 'Kingdra',
					item: 'scopelens',
					ability: 'Sniper',
					teraType: ['Water', 'Fairy'],
				},
				['focusenergy', 'dracometeor', 'agility', 'snipeshot']
			]
		],
	},
	ironjugulis: {
		inherit: true,
		mons: [
			[
				{
					species: 'Raikou',
					item: 'terrainextender',
					ability: 'Electric Surge',
					gender: 'N',
					teraType: 'Ice',
				},
				['voltswitch', 'scald', 'terablast', 'thunderbolt']
			],
			[
				{
					species: 'Basculegion-F',
					item: 'choicespecs',
					ability: 'Surge Surfer',
					gender: 'F',
					teraType: ['Water', 'Ghost'],
				},
				['surf', 'shadowball', 'flipturn', 'icebeam']
			],
			[
				{
					species: 'Weezing-Galar',
					item: 'heavydutyboots',
					ability: ['Neutralizing Gas', 'Levitate'],
					teraType: ['Ghost', 'Grass'],
				},
				['sludgebomb', 'moonlight'], ['strangesteam', 'defog', 'willowisp']
			],
			[
				{
					species: 'Kommo-o',
					item: 'throatspray',
					ability: ['Soundproof', 'Bulletproof'],
					teraType: ['Normal', 'Steel'],
				},
				['clangoroussoul', 'clangingscales'], ['drainpunch', 'boomburst', 'flashcannon']
			]
		],
	},
	sinistcha: {
		inherit: true,
		mons: [
			[
				{
					species: 'Goodra-Hisui',
					item: 'leftovers',
					ability: ['Corrosion', 'Regenerator'],
					teraType: ['Flying', 'Dragon'],
				},
				['dracometeor', 'toxic', 'fireblast', 'heavyslam']
			],
			[
				{
					species: 'Zapdos-Galar',
					item: 'lifeorb',
					ability: ['Defiant', 'Wind Rider', 'Scrappy'],
					gender: 'N',
					teraType: ['Flying', 'Electric'],
				},
				['closecombat', 'bravebird', 'tailwind', 'supercellslam']
			],
			[
				{
					species: 'Ninetales-Alola',
					item: 'lightclay',
					ability: 'Snow Warning',
					teraType: 'Water',
				},
				['auroraveil', 'blizzard'], ['freezedry', 'encore', 'moonblast']
			],
			[
				{
					species: 'Walking Wake',
					item: ['choicespecs', 'choicescarf'],
					ability: ['Orichalcum Pulse', 'Hadron Engine'],
					gender: 'N',
					teraType: ['Fire', 'Water', 'Electric'],
				},
				['hydrosteam', 'flamethrower', 'dracometeor', 'voltswitch']
			]
		],
	},
	azumarill: {
		inherit: true,
		mons: [
			[
				{
					species: 'Arcanine-Hisui',
					item: 'lifeorb',
					ability: ['Magic Guard', 'Regenerator'],
					teraType: ['Flying', 'Normal'],
				},
				['flareblitz', 'headsmash'], ['extremespeed', 'morningsun', 'stealthrock', 'bravebird']
			],
			[
				{
					species: 'Meowscarada',
					item: 'focussash',
					ability: ['Protean', 'Prankster'],
					teraType: ['Dark', 'Grass'],
				},
				['flowertrick', 'stickyweb'], ['knockoff', 'uturn', 'taunt', 'tripleaxel']
			],
			[
				{
					species: 'Oricorio-Sensu',
					item: 'heavydutyboots',
					ability: ['Shadow Shield', 'Adaptability'],
					teraType: ['Fighting', 'Psychic'],
				},
				['quiverdance', 'revelationdance'], ['hurricane', 'roost', 'taunt', 'storedpower']
			],
			[
				{
					species: 'Torterra',
					item: 'whiteherb',
					ability: ['Orichalcum Pulse', 'Grassy Surge'],
					teraType: ['Rock', 'Fire'],
				},
				['shellsmash', 'woodhammer'], ['headlongrush', 'grassyglide', 'terablast', 'diamondstorm']
			],
		],
	},
	revavroom: {
		inherit: true,
		mons: [
			[
				{
					species: 'Ogerpon-Cornerstone',
					item: 'cornerstonemask',
					ability: ['Sturdy', 'Tough Claws'],
					gender: 'F',
					teraType: 'Rock',
				},
				['ivycudgel', 'headlongrush'], ['uturn', 'powerwhip', 'knockoff', 'swordsdance']
			],
			[
				{
					species: 'Talonflame',
					item: 'heavydutyboots',
					ability: ['Rock Head', 'Flame Body'],
					teraType: ['Steel', 'Dragon', 'Bug'],
				},
				['flareblitz', 'bravebird'], ['uturn', 'woodhammer', 'roost', 'swordsdance']
			],
			[
				{
					species: 'Blastoise',
					item: ['heavydutyboots', 'whiteherb'],
					ability: ['Torrent', 'Mega Launcher'],
					teraType: ['Water', 'Dragon'],
				},
				['shellsmash', 'originpulse'], ['dragonpulse', 'icebeam', 'darkpulse', 'aurasphere']
			],
			[
				{
					species: 'Sandy Shocks',
					item: 'heavydutyboots',
					ability: ['Levitate', 'Magnet Pull'],
					gender: 'N',
					teraType: 'Ghost',
				},
				['spikes', 'voltswitch'], ['earthpower', 'discharge', 'icebeam']
			]
		],
	},
	heatran: {
		inherit: true,
		mons: [
			[
				{
					species: 'Tapu Koko',
					item: 'heavydutyboots',
					ability: 'Hadron Engine',
					gender: 'N',
					teraType: ['Electric', 'Grass'],
				},
				['wildcharge', 'roost', 'dazzlinggleam', 'voltswitch']
			],
			[
				{
					species: 'Hawlucha',
					item: ['electricseed', 'sitrusberry'],
					ability: 'Unburden',
					teraType: 'Flying',
				},
				['acrobatics', 'lowkick'], ['swordsdance', 'taunt', 'substitute', 'icepunch']
			],
			[
				{
					species: 'Kyurem-Black',
					item: 'powerherb',
					ability: 'Teravolt',
					gender: 'N',
					teraType: ['Ice', 'Fairy', 'Electric'],
				},
				['freezeshock', 'fusionbolt'], ['icebeam', 'earthpower', 'recover']
			],
			[
				{
					species: 'Rillaboom',
					item: 'assaultvest',
					ability: 'Regenerator',
					teraType: ['Fairy', 'Water'],
				},
				['woodhammer', 'earthquake', 'knockoff', 'uturn']
			]
		],
	},
	indeedee: {
		inherit: true,
		mons: [
			[
				{
					species: 'Armarouge',
					item: ['heavydutyboots', 'lifeorb', 'weaknesspolicy'],
					ability: 'Weak Armor',
					teraType: ['Psychic', 'Grass'],
				},
				['armorcannon', 'expandingforce'], ['energyball', 'focusblast', 'scorchingsands', 'calmmind', 'endure']
			],
			[
				{
					species: 'Sharpedo',
					item: ['lifeorb', 'focussash'],
					ability: 'Speed Boost',
					teraType: ['Dark', 'Water'],
				},
				['ceaselessedge', 'liquidation'], ['closecombat', 'crunch', 'destinybond', 'protect', 'taunt']
			],
			[
				{
					species: 'Sneasler',
					item: ['psychicseed', 'whiteherb'],
					ability: 'Unburden',
					teraType: ['Fighting', 'Flying'],
				},
				['closecombat', 'swordsdance'], ['direclaw', 'icehammer', 'acrobatics', 'throatchop']
			],
			[
				{
					species: 'Diancie',
					item: 'leftovers',
					ability: 'Clear Body',
					gender: 'N',
					teraType: ['Fighting', 'Psychic', 'Water'],
				},
				['diamondstorm', 'takeheart'], ['moonblast', 'storedpower', 'earthpower', 'bodypress']
			]
		],
	},
	weavile: {
		inherit: true,
		mons: [
			[
				{
					species: 'Kartana',
					item: 'choicescarf',
					ability: 'Moxie',
					gender: 'N',
					teraType: ['Fighting', 'Dark'],
				},
				['leafblade', 'smartstrike', 'sacredsword', 'knockoff']
			],
			[
				{
					species: 'Espathra',
					item: 'choicespecs',
					ability: 'Speed Boost',
					teraType: 'Fairy',
				},
				['luminacrash', 'shadowball', 'dazzlinggleam', 'uturn']
			],
			[
				{
					species: 'Iron Moth',
					item: 'boosterenergy',
					ability: 'Quark Drive',
					gender: 'N',
					teraType: 'Poison',
				},
				['fierydance', 'sludgewave', 'energyball', 'agility']
			],
			[
				{
					species: 'Quaquaval',
					item: 'lifeorb',
					ability: 'Moxie',
					teraType: 'Water',
				},
				['closecombat', 'aquastep'], ['icespinner', 'swordsdance', 'jetpunch']
			]
		],
	},
	fezandipiti: {
		inherit: true,
		mons: [
			[
				{
					species: 'gholdengo',
					item: 'metalcoat',
					ability: 'goodasgold',
					teraType: 'Steel',
				},
				['nastyplot', 'makeitrain', 'shadowball', 'recover']
			],
			[
				{
					species: 'mandibuzz',
					item: 'heavydutyboots',
					ability: 'unaware',
					teraType: 'steel',
				},
				['foulplay', 'roost', 'uturn', 'toxic']
			],
			[
				{
					species: 'latios',
					item: 'souldew',
					ability: 'Levitate',
					teraType: 'steel',
				},
				['dracometeor', 'lusterpurge', 'recover', 'nastyplot']
			],
			[
				{
					species: 'slowbro',
					item: 'heavydutyboots',
					ability: 'regenerator',
					teraType: 'steel',
				},
				['scald', 'futuresight', 'slackoff', 'teleport']
			],
		],
	},
	skarmory: {
		inherit: true,
		mons: [
			[
				{
					species: 'alomomola',
					item: 'assaultvest',
					ability: 'Regenerator',
					teraType: ['Fairy', 'Grass'],
				},
				['scald', 'flipturn'], ['playrough', 'mirrorcoat', 'rapidspin']
			],
			[
				{
					species: 'zamazenta',
					item: 'heavydutyboots',
					ability: 'dauntlessshield',
					teraType: ['Dark', 'Fighting'],
				},
				['crunch', 'closecombat'], ['encore', 'icefang', 'stoneedge']
			],
			[
				{
					species: 'latias',
					item: 'leftovers',
					ability: 'Levitate',
					teraType: 'Fairy',
				},
				['takeheart', 'recover', 'drainingkiss', 'psychic']
			],
			[
				{
					species: 'trevenant',
					item: ['leftovers', 'colburberry'],
					ability: 'Prankster',
					teraType: ['dark', 'water'],
				},
				['woodhammer', 'painsplit'], ['willowisp', 'toxic', 'poltergeist', 'leechseed']
			],
		],
	},
	clefable: {
		inherit: true,
		mons: [
			[
				{
					species: 'gliscor',
					item: 'toxicorb',
					ability: 'poisonheal',
					teraType: ['Fire', 'Water', 'Steel'],
				},
				['earthquake', 'protect', 'toxic', 'firelash']
			],
			[
				{
					species: 'hydreigon',
					item: 'choicespecs',
					ability: 'Levitate',
					teraType: 'steel',
				},
				['dracometeor', 'darkpulse', 'flashcannon', 'earthpower']
			],
			[
				{
					species: 'lunala',
					item: 'heavydutyboots',
					ability: 'shadowshield',
					teraType: ['ghost', 'fairy'],
				},
				['moongeistbeam', 'moonlight'], ['futuresight', 'willowisp', 'teleport', 'thunderwave']
			],
			[
				{
					species: 'mienshao',
					item: 'lifeorb',
					ability: 'regenerator',
					teraType: ['fighting', 'steel'],
				},
				['closecombat', 'uturn'], ['knockoff', 'tripleaxel', 'gigatonhammer']
			],
		],
	},
	ogerpon: {
		inherit: true,
		mons: [
			[
				{
					species: 'scizor',
					item: 'metalcoat',
					ability: 'technician',
					teraType: ['Fire', 'Steel'],
				},
				['swordsdance', 'bulletpunch'], ['closecombat', 'pinmissile', 'knockoff']
			],
			[
				{
					species: 'primarina',
					item: 'leftovers',
					ability: 'torrent',
					teraType: ['ghost', 'steel'],
				},
				['calmmind', 'moonblast', 'hydropump', 'watershuriken']
			],
			[
				{
					species: 'dragapult',
					item: ['leftovers', 'heavydutyboots'],
					ability: ['infiltrator', 'defiant'],
					teraType: ['ghost', 'fairy'],
				},
				['hex', 'willowisp'], ['dragondarts', 'dracometeor', 'uturn', 'thunderwave']
			],
			[
				{
					species: 'regieleki',
					item: ['magnet', 'heavydutyboots'],
					ability: 'transistor',
					teraType: ['fire', 'electric'],
				},
				['thunderbolt', 'overheat', 'rapidspin', 'voltswitch']
			],
		],
	},
	pecharunt: {
		inherit: true,
		mons: [
			[
				{
					species: 'ironmoth',
					item: 'heavydutyboots',
					ability: 'merciless',
					teraType: ['Fairy', 'Grass'],
				},
				['fierydance', 'sludgewave'], ['dazzlinggleam', 'energyball', 'agility']
			],
			[
				{
					species: 'mandibuzz',
					item: 'heavydutyboots',
					ability: 'overcoat',
					teraType: 'steel',
				},
				['jawlock', 'roost'], ['uturn', 'toxic', 'defog']
			],
			[
				{
					species: 'dudunsparce',
					item: 'toxicorb',
					ability: 'poisonheal',
					teraType: ['ghost', 'poison'],
				},
				['facade', 'toxic'], ['roost', 'stealthrock', 'protect']
			],
			[
				{
					species: 'ironvaliant',
					item: 'boosterenergy',
					ability: 'quarkdrive',
					teraType: ['fairy', 'steel'],
				},
				['magicaltorque', 'closecombat', 'knockoff', 'encore']
			],
		],
	},
	moltres: {
		inherit: true,
		mons: [
			[
				{
					species: 'duraludon',
					item: 'eviolite',
					ability: 'regenerator',
					teraType: 'Grass',
				},
				['dracometeor', 'stealthrock'], ['flashcannon', 'bodypress', 'thunderwave']
			],
			[
				{
					species: 'mamoswine',
					item: 'lifeorb',
					ability: 'thickfat',
					teraType: ['ice', 'ground'],
				},
				['iciclecrash', 'earthquake', 'iceshard', 'knockoff']
			],
			[
				{
					species: 'miraidon',
					item: 'heavydutyboots',
					ability: 'stickyhold',
					teraType: ['Electric', 'steel'],
				},
				['discharge', 'dragonpulse', 'flashcannon', 'uturn']
			],
			[
				{
					species: 'chandelure',
					item: 'choicespecs',
					ability: 'stormdrain',
					teraType: ['fire', 'steel'],
				},
				['shadowball', 'fireblast', 'energyball', 'trick']
			],
		],
	},
};
