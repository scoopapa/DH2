export const Pokedex: { [k: string]: ModdedSpeciesData; } = {
		// Existing Mon Changes
	arbok: {
		inherit: true,
		baseStats: {hp: 60, atk: 105, def: 89, spa: 70, spd: 84, spe: 80},
	},
	ariados: {
		inherit: true,
		baseStats: {hp: 70, atk: 100, def: 75, spa: 90, spd: 75, spe: 40},
	},
	anorith: {
		inherit: true,
		baseStats: {hp: 45, atk: 95, def: 50, spa: 40, spd: 50, spe: 75},
	},
	armaldo: {
		inherit: true,
		baseStats: {hp: 75, atk: 125, def: 100, spa: 70, spd: 80, spe: 65},
	},
	spritzee: {
		inherit: true,
		abilities: {0: "Healer", 1: "Misty Surge", H: "Aroma Veil"},
	},
	tinkaton: {
		inherit: true,
		abilities: {0: "Mold Breaker", 1: "Ironsmith", H: "Pickpocket"},
	},
	aromatisse: {
		inherit: true,
		abilities: {0: "Healer", 1: "Misty Surge", H: "Aroma Veil"},
	},
	articuno: {
		inherit: true,
		abilities: {0: "Permafrost", H: "Snow Cloak"},
	},
	shieldon: {
		inherit: true,
		abilities: {0: "Sturdy", 1: "Heavy Metal", H: "Soundproof"},
	},
	bastiodon: {
		inherit: true,
		abilities: {0: "Sturdy", 1: "Heavy Metal", H: "Soundproof"},
	},
	wurmple: {
		inherit: true,
		abilities: {0: "Shield Dust", 1: "Swarm", H: "Run Away"},
	},
	beautifly: {
		inherit: true,
		baseStats: {hp: 60, atk: 70, def: 50, spa: 100, spd: 50, spe: 85},
		abilities: {0: "Swarm", 1: "Simple", H: "Rivalry"},
	},
	beedrill: {
		inherit: true,
		baseStats: {hp: 65, atk: 95, def: 40, spa: 45, spd: 80, spe: 90},
		abilities: {0: "Swarm", H: "Levitate"},
	},
	beedrillmega: {
		inherit: true,
		baseStats: {hp: 65, atk: 150, def: 40, spa: 35, spd: 80, spe: 145},
	},
	oddish: {
		inherit: true,
		abilities: {0: "Chlorophyll", 1: "Unwaware", H: "Run Away"},
	},
	gloom: {
		inherit: true,
		abilities: {0: "Chlorophyll", 1: "Unwaware", H: "Stench"},
	},
	vileplume: {
		inherit: true,
		abilities: {0: "Chlorophyll", 1: "Unwaware", H: "Effect Spore"},
	},
	bellossom: {
		inherit: true,
		abilities: {0: "Chlorophyll", 1: "Unwaware", H: "Healer"},
	},
	blaziken: {
		inherit: true,
		abilities: {0: "Blaze", H: "Speedster"},
	},
	blazikenmega: {
		inherit: true,
		baseStats: {hp: 80, atk: 160, def: 85, spa: 140, spd: 85, spe: 80},
		abilities: {0: "Speedster"},
	},
	yamper: {
		inherit: true,
		types: ["Electric", "Fairy"],
	},
	boltund: {
		inherit: true,
		types: ["Electric", "Fairy"],
		abilities: {0: "Strong Jaw", 1: "Speed Boost", H: "Competitive"},
	},
	cacturne: {
		inherit: true,
		abilities: {0: "Sand Veil", 1: "Glochidia", H: "Water Absorb"},
	},
	chimecho: {
		inherit: true,
		abilities: {0: "Levitate", H: "Healing Echo"},
	},
	espathra: {
		inherit: true,
		abilities: {0: "Opportunist", 1: "Speedster", H: "Speed Boost"},
	},
	claydol: {
		inherit: true,
		abilities: {0: "Levitate", H: "Anticlockwise"},
	},
	butterfree: {
		inherit: true,
		baseStats: {hp: 60, atk: 45, def: 50, spa: 95, spd: 80, spe: 85},
	},
	calyrex: {
		inherit: true,
		baseStats: {hp: 100, atk: 100, def: 100, spa: 100, spd: 100, spe: 100},
	},
	castform: {
		inherit: true,
		baseStats: {hp: 95, atk: 95, def: 95, spa: 95, spd: 95, spe: 95},
	},
	castformsunny: {
		inherit: true,
		baseStats: {hp: 95, atk: 95, def: 95, spa: 95, spd: 95, spe: 95},
	},
	castformrainy: {
		inherit: true,
		baseStats: {hp: 95, atk: 95, def: 95, spa: 95, spd: 95, spe: 95},
	},
	castformsnowy: {
		inherit: true,
		baseStats: {hp: 95, atk: 95, def: 95, spa: 95, spd: 95, spe: 95},
	},
	cherrimsunshine: {
		inherit: true,
		baseStats: {hp: 70, atk: 90, def: 70, spa: 87, spd: 117, spe: 85},
	},
	cradily: {
		inherit: true,
		baseStats: {hp: 86, atk: 81, def: 97, spa: 81, spd: 127, spe: 43},
	},
	cryogonal: {
		inherit: true,
		abilities: {0: "Levitate", H: "Snow Warning"},
	},
	cursola: {
		inherit: true,
		baseStats: {hp: 60, atk: 55, def: 90, spa: 145, spd: 130, spe: 30},
	},
	darmanitanzen: {
		inherit: true,
		baseStats: {hp: 105, atk: 30, def: 125, spa: 140, spd: 125, spe: 55},
	},
	delcatty: {
		inherit: true,
		baseStats: {hp: 70, atk: 85, def: 85, spa: 75, spd: 75, spe: 110},
	},
	delibird: {
		inherit: true,
		baseStats: {hp: 65, atk: 75, def: 65, spa: 85, spd: 65, spe: 95},
		abilities: {0: "Vital Spirit", 1: "Hustle", H: "Slush Rush"},
	},
	dewgong: {
		inherit: true,
		baseStats: {hp: 90, atk: 70, def: 80, spa: 70, spd: 125, spe: 70},
	},
	dubwool: {
		inherit: true,
		abilities: {0: "Fluffy", 1: "Scrappy", H: "Bulletproof"},
	},
	durant: {
		inherit: true,
		baseStats: {hp: 58, atk: 109, def: 112, spa: 68, spd: 58, spe: 109},
	},
	dustox: {
		inherit: true,
		baseStats: {hp: 60, atk: 50, def: 70, spa: 50, spd: 100, spe: 75},
		abilities: {0: "Shield Dust", 1: "Simple", H: "Compound Eyes"},
	},
	eiscue: {
		inherit: true,
		baseStats: {hp: 58, atk: 109, def: 112, spa: 90, spd: 58, spe: 109},
	},
	eiscuenoice: {
		inherit: true,
		baseStats: {hp: 58, atk: 109, def: 112, spa: 90, spd: 58, spe: 109},
	},
	electivire: {
		inherit: true,
		abilities: {0: "Motor Drive", 1: "Iron Fist", H: "Vital Spirit"},
	},
	emolga: {
		inherit: true,
		baseStats: {hp: 55, atk: 85, def: 60, spa: 75, spd: 60, spe: 113},
	},
	espeon: {
		inherit: true,
		abilities: {0: "Synchronize", 1: "Telepathy", H: "Magic Bounce"},
	},
	spearow: {
		inherit: true,
		abilities: {0: "Keen Eye", 1: "Sniper", H: "Tangled Feet"},
	},
	fearow: {
		inherit: true,
		abilities: {0: "Keen Eye", 1: "Sniper", H: "Gale Wings"},
	},
	flareon: {
		inherit: true,
		abilities: {0: "Flash Fire", 1: "Intimidate", H: "Hustle"},
	},
	fluttermane: {
		inherit: true,
		baseStats: {hp: 65, atk: 65, def: 65, spa: 125, spd: 125, spe: 125},
	},
	vibrava: {
		inherit: true,
		abilities: {0: "Levitate", 1: "Tinted Lens", H: "Sand Force"},
	},
	flygon: {
		inherit: true,
		abilities: {0: "Levitate", 1: "Sand Stream", H: "Sand Force"},
	},
	forretress: {
		inherit: true,
		abilities: {0: "Sturdy", 1: "Filter", H: "Overcoat"},
	},
	furret: {
		inherit: true,
		baseStats: {hp: 85, atk: 91, def: 64, spa: 80, spd: 55, spe: 90},
		abilities: {0: "Run Away", 1: "Keen Eye", H: "Sheer Force"},
	},
	gastly: {
		inherit: true,
		abilities: {0: "Levitate", H: "Cursed Body"},
	},
	haunter: {
		inherit: true,
		abilities: {0: "Levitate", H: "Cursed Body"},
	},
	gengar: {
		inherit: true,
		abilities: {0: "Cursed Body", H: "Levitate"},
	},
	glaceon: {
		inherit: true,
		abilities: {0: "Snow Cloak", 1: "Snow Warning", H: "Ice Body"},
	},
	glaliemega: {
		inherit: true,
		baseStats: {hp: 80, atk: 120, def: 70, spa: 120, spd: 70, spe: 120},
	},
	clamperl: {
		inherit: true,
		abilities: {0: "Shell Armor", 1: "Unaware", H: "Rattled"},
	},
	huntail: {
		inherit: true,
		abilities: {0: "Swift Swim", 1: "Strong Jaw", H: "Water Veil"},
	},
	gorebyss: {
		inherit: true,
		abilities: {0: "Swift Swim", 1: "Serene Grace", H: "Hydration"},
	},
	grapploct: {
		inherit: true,
		baseStats: {hp: 80, atk: 118, def: 100, spa: 70, spd: 90, spe: 42},
		abilities: {0: "Limber", 1: "Splashborne", H: "Technician"},
	},
	greedent: {
		inherit: true,
		baseStats: {hp: 120, atk: 95, def: 95, spa: 75, spd: 75, spe: 20},
	},
	greninjaash: {
		inherit: true,
		baseStats: {hp: 72, atk: 143, def: 67, spa: 145, spd: 71, spe: 132},
	},
	grumpig: {
		inherit: true,
		baseStats: {hp: 80, atk: 45, def: 75, spa: 90, spd: 110, spe: 80},
	},
	gumshoos: {
		inherit: true,
		baseStats: {hp: 88, atk: 110, def: 75, spa: 55, spd: 75, spe: 45},
	},
	heatmor: {
		inherit: true,
		baseStats: {hp: 85, atk: 97, def: 96, spa: 105, spd: 66, spe: 65},
	},
	drowzee: {
		inherit: true,
		abilities: {0: "Insomnia", 1: "Keen Eye", H: "Inner Focus"},
	},
	hypno: {
		inherit: true,
		abilities: {0: "Insomnia", 1: "Keen Eye", H: "Inner Focus"},
	},
	illumise: {
		inherit: true,
		baseStats: {hp: 65, atk: 83, def: 75, spa: 83, spd: 85, spe: 85},
	},
	ironbundle: {
		inherit: true,
		baseStats: {hp: 56, atk: 88, def: 114, spa: 124, spd: 68, spe: 120},
	},
	jolteon: {
		inherit: true,
		abilities: {0: "Volt Absorb", 1: "Static", H: "Quick Feet"},
	},
	skiploom: {
		inherit: true,
		abilities: {0: "Chlorophyll", 1: "Friend Guard", H: "Infiltrator"},
	},
	jumpluff: {
		inherit: true,
		abilities: {0: "Chlorophyll", 1: "Friend Guard", H: "Infiltrator"},
	},
	kricketune: {
		inherit: true,
		baseStats: {hp: 77, atk: 85, def: 71, spa: 55, spd: 71, spe: 65},
		abilities: {0: "Swarm", 1: "Soundproof", H: "Technician"},
	},
	komala: {
		inherit: true,
		baseStats: {hp: 65, atk: 115, def: 80, spa: 75, spd: 95, spe: 65},
	},
	leafeon: {
		inherit: true,
		abilities: {0: "Leaf Guard", 1: "Natural Cure", H: "Chlorophyll"},
	},
	leavanny: {
		inherit: true,
		abilities: {0: "Adaptability", 1: "Chlorophyll", H: "Overcoat"},
	},
	ledian: {
		inherit: true,
		baseStats: {hp: 55, atk: 65, def: 50, spa: 55, spd: 110, spe: 85},
		abilities: {0: "Huge Power", 1: "Early Bird", H: "Iron Fist"},
	},
	lumineon: {
		inherit: true,
		baseStats: {hp: 69, atk: 69, def: 76, spa: 69, spd: 96, spe: 91},
	},
	lunatone: {
		inherit: true,
		baseStats: {hp: 90, atk: 65, def: 95, spa: 70, spd: 105, spe: 55},
		abilities: {0: "Levitate", H: "Magic Guard"},
	},
	luxray: {
		inherit: true,
		baseStats: {hp: 80, atk: 135, def: 79, spa: 95, spd: 79, spe: 70},
	},
	luvdisc: {
		inherit: true,
		baseStats: {hp: 43, atk: 30, def: 55, spa: 125, spd: 65, spe: 97},
	},
	lycanrocmidnight: {
		inherit: true,
		abilities: {0: "Keen Eye", 1: "Vital Spirit", H: "Sheer Force"},
	},
	magby: {
		inherit: true,
		abilities: {0: "Flame Body", H: "Vital Spirit"},
	},
	magmar: {
		inherit: true,
		abilities: {0: "Flame Body", H: "Vital Spirit"},
	},
	magmortar: {
		inherit: true,
		abilities: {0: "Flame Body", H: "Vital Spirit"},
	},
	maractus: {
		inherit: true,
		baseStats: {hp: 75, atk: 86, def: 87, spa: 106, spd: 87, spe: 60},
		abilities: {0: "Glochidia", 1: "Chlorophyll", H: "Storm Drain"},
	},
	cubone: {
		inherit: true,
		abilities: {0: "Rock Head", 1: "Sand Force", H: "Battle Armor"},
	},
	marowak: {
		inherit: true,
		abilities: {0: "Rock Head", 1: "Sand Force", H: "Battle Armor"},
	},
	masquerain: {
		inherit: true,
		abilities: {0: "Intimidate", H: "Splashborne"},
		baseStats: {hp: 70, atk: 60, def: 62, spa: 100, spd: 92, spe: 90},
	},
	meowstic: {
		inherit: true,
		baseStats: {hp: 74, atk: 48, def: 76, spa: 83, spd: 101, spe: 104},
	},
	meowsticf: {
		inherit: true,
		baseStats: {hp: 74, atk: 48, def: 76, spa: 83, spd: 81, spe: 124},
		abilities: {0: "Keen Eye", 1: "Infiltrator", H: "Psychic Surge"},
	},
	metagrossmega: {
		inherit: true,
		abilities: {0: "Mirror Armor"},
	},
	mightyena: {
		inherit: true,
		baseStats: {hp: 70, atk: 110, def: 70, spa: 60, spd: 60, spe: 95},
	},
	moltres: {
		inherit: true,
		abilities: {0: "Blaze", H: "Flame Body"},
	},
	zapdos: {
		inherit: true,
		abilities: {0: "Wattage", H: "Static"},
	},
	mothim: {
		inherit: true,
		baseStats: {hp: 70, atk: 94, def: 50, spa: 94, spd: 50, spe: 86},
	},
	noctowl: {
		inherit: true,
		baseStats: {hp: 100, atk: 50, def: 95, spa: 86, spd: 105, spe: 70},
	},
	oranguru: {
		inherit: true,
		baseStats: {hp: 90, atk: 20, def: 80, spa: 110, spd: 130, spe: 60},
	},
	orbeetle: {
		inherit: true,
		abilities: {0: "Swarm", 1: "Magic Guard", H: "Telepathy"},
	},
	pachirisu: {
		inherit: true,
		baseStats: {hp: 60, atk: 45, def: 70, spa: 65, spd: 90, spe: 110},
	},
	palafinhero: {
		inherit: true,
		baseStats: {hp: 100, atk: 145, def: 97, spa: 106, spd: 87, spe: 100},
	},
	parasect: {
		inherit: true,
		baseStats: {hp: 60, atk: 95, def: 95, spa: 60, spd: 95, spe: 30},
		abilities: {0: "Effect Spore", 1: "Dry Skin", H: "Technician"},
	},
	politoed: {
		inherit: true,
		baseStats: {hp: 90, atk: 75, def: 75, spa: 100, spd: 100, spe: 70},
	},
	probopass: {
		inherit: true,
		abilities: {0: "Sturdy", 1: "Levitate", H: "Sand Force"},
	},
	raikou: {
		inherit: true,
		abilities: {0: "Volt Absorb", H: "Inner Focus"},
	},
	rampardos: {
		inherit: true,
		abilities: {0: "Mold Breaker", 1: "Rock Head", H: "Sheer Force"},
		baseStats: {hp: 97, atk: 165, def: 50, spa: 85, spd: 40, spe: 58},
	},
	relicanth: {
		inherit: true,
		baseStats: {hp: 105, atk: 90, def: 130, spa: 45, spd: 65, spe: 55},
	},
	rotom: {
		inherit: true,
		abilities: {0: "Levitate", 1: "Infiltrator"},
	},
	rotomheat: {
		inherit: true,
		abilities: {0: "Levitate"},
	},
	rotomwash: {
		inherit: true,
		abilities: {0: "Levitate", 1: "Gluttony"},
	},
	rotomfrost: {
		inherit: true,
		abilities: {0: "Levitate", 1: "Refrigerate"},
	},
	rotomfan: {
		inherit: true,
		abilities: {0: "Levitate", 1: "Aerilate"},
	},
	rotommow: {
		inherit: true,
		abilities: {0: "Levitate", 1: "Grassy Surge"},
	},
	salamencemega: {
		inherit: true,
		abilities: {0: "Gale Wings"},
	},
	seaking: {
		inherit: true,
		baseStats: {hp: 80, atk: 92, def: 65, spa: 95, spd: 80, spe: 78},
	},
	seviper: {
		inherit: true,
		baseStats: {hp: 73, atk: 110, def: 60, spa: 110, spd: 60, spe: 70},
		abilities: {0: "Strong Jaw", H: "Infiltrator"},
	},
	sharpedomega: {
		inherit: true,
		baseStats: {hp: 70, atk: 150, def: 50, spa: 130, spd: 50, spe: 105},
	},
	pansage: {
		inherit: true,
		abilities: {0: "Gluttony", 1: "Adaptability", H: "Overgrow"},
	},
	simisage: {
		inherit: true,
		abilities: {0: "Gluttony", 1: "Adaptability", H: "Overgrow"},
	},
	pansear: {
		inherit: true,
		abilities: {0: "Gluttony", 1: "Adaptability", H: "Blaze"},
	},
	simisear: {
		inherit: true,
		abilities: {0: "Gluttony", 1: "Adaptability", H: "Blaze"},
	},
	panpour: {
		inherit: true,
		abilities: {0: "Gluttony", 1: "Adaptability", H: "Torrent"},
	},
	simipour: {
		inherit: true,
		abilities: {0: "Gluttony", 1: "Adaptability", H: "Torrent"},
	},
	sneasler: {
		inherit: true,
		abilities: {0: "Pressure", 1: "Sticky Hold", H: "Poison Touch"},
	},
	solrock: {
		inherit: true,
		baseStats: {hp: 90, atk: 105, def: 65, spa: 95, spd: 55, spe: 70},
		abilities: {0: "Levitate", H: "Magic Guard"},
	},
	spinda: {
		inherit: true,
		abilities: {0: "Full Circle", 1: "Tangled Feet", H: "Contrary"},
	},
	steelixmega: {
		inherit: true,
		baseStats: {hp: 75, atk: 55, def: 230, spa: 125, spd: 95, spe: 30},
		abilities: {0: "Sheer Force"},
	},
	stunfisk: {
		inherit: true,
		abilities: {0: "Static", 1: "Water Absorb", H: "Sand Veil"},
	},
	sudowoodo: {
		inherit: true,
		baseStats: {hp: 70, atk: 120, def: 115, spa: 30, spd: 65, spe: 30},
	},
	suicune: {
		inherit: true,
		abilities: {0: "Fire Absorb", H: "Inner Focus"},
	},
	sunflora: {
		inherit: true,
		baseStats: {hp: 75, atk: 75, def: 55, spa: 105, spd: 85, spe: 75},
		abilities: {0: "Chlorophyll", 1: "Flower Power", H: "Early Bird"},
	},
	sylveon: {
		inherit: true,
		abilities: {0: "Cute Charm", 1: "Anticipation", H: "Pixilate"},
	},
	tropius: {
		inherit: true,
		baseStats: {hp: 99, atk: 78, def: 93, spa: 92, spd: 87, spe: 51},
	},
	umbreon: {
		inherit: true,
		abilities: {0: "Synchronize", 1: "Cute Charm", H: "Inner Focus"},
	},
	unfezant: {
		inherit: true,
		abilities: {0: "Big Pecks", 1: "Super Luck", H: "Adaptability"},
	},
	vaporeon: {
		inherit: true,
		abilities: {0: "Water Absorb", 1: "Damp", H: "Hydration"},
	},
	combee: {
		inherit: true,
		abilities: {0: "Honey Gather", 1: "Hustle", H: "Poison Point"},
	},
	vespiquen: {
		inherit: true,
		baseStats: {hp: 70, atk: 80, def: 112, spa: 80, spd: 112, spe: 40},
		abilities: {0: "Pressure", 1: "Unnerve", H: "Queenly Majesty"},
	},
	grubbin: {
		inherit: true,
		abilities: {0: "Swarm", H: "Anticipation"},
	},
	vikavolt: {
		inherit: true,
		abilities: {0: "Levitate", H: "Electric Surge"},
	},
	volbeat: {
		inherit: true,
		baseStats: {hp: 65, atk: 83, def: 75, spa: 83, spd: 85, spe: 85},
	},
	wailord: {
		inherit: true,
		baseStats: {hp: 170, atk: 90, def: 60, spa: 90, spd: 60, spe: 60},
	},
	walrein: {
		inherit: true,
		baseStats: {hp: 110, atk: 80, def: 90, spa: 95, spd: 110, spe: 65},
	},
	watchog: {
		inherit: true,
		baseStats: {hp: 60, atk: 95, def: 69, spa: 90, spd: 69, spe: 77},
	},
	whiscash: {
		inherit: true,
		baseStats: {hp: 110, atk: 88, def: 73, spa: 76, spd: 71, spe: 60},
	},
	wigglytuff: {
		inherit: true,
		baseStats: {hp: 140, atk: 70, def: 60, spa: 85, spd: 60, spe: 68},
	},
	wormadam: {
		inherit: true,
		abilities: {0: "Filter", H: "Overcoat"},
		baseStats: {hp: 60, atk: 59, def: 85, spa: 99, spd: 105, spe: 36},
	},
	wormadamsandy: {
		inherit: true,
		abilities: {0: "Filter", H: "Overcoat"},
		baseStats: {hp: 60, atk: 99, def: 105, spa: 59, spd: 85, spe: 36},

	},
	wormadamtrash: {
		inherit: true,
		abilities: {0: "Filter", H: "Overcoat"},
		baseStats: {hp: 60, atk: 79, def: 95, spa: 79, spd: 95, spe: 36},

	},
	zebstrika: {
		inherit: true,
		abilities: {0: "Lightning Rod", 1: "Motor Drive", H: "Reckless"},
	},
}
