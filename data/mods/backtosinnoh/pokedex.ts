export const Pokedex: { [k: string]: ModdedSpeciesData; } = {
	sparktus: {
		num: -1,
		name: "Sparktus",
		types: ["Grass"],
		baseStats: {hp: 60, atk: 90, def: 65, spa: 70, spd: 70, spe: 50},
		abilities: {0: "Overgrow"},
		evos: ["Cactamp"],
		weightkg: 15,
		eggGroups: ["Grass", "Field"],
	},
	cactamp: {
		num: -2,
		name: "Cactamp",
		types: ["Grass"],
		baseStats: {hp: 50, atk: 70, def: 50, spa: 50, spd: 50, spe: 40},
		abilities: {0: "Overgrow"},
		prevo: "Sparktus",
		evos: ["Succurent"],
		weightkg: 25,
		eggGroups: ["Grass", "Field"],
	},
	succurent: {
		num: -3,
		name: "Succurent",
		types: ["Grass", "Electric"],
		baseStats: {hp: 80, atk: 110, def: 80, spa: 90, spd: 100, spe: 70},
		abilities: {0: "Overgrow"},
		prevo: "Cactamp",
		weightkg: 50,
		eggGroups: ["Grass", "Field"],
	},
	kindlamb: {
		num: -4,
		name: "Kindlamb",
		types: ["Fire"],
		baseStats: {hp: 47, atk: 45, def: 55, spa: 61, spd: 55, spe: 47},
		abilities: {0: "Blaze"},
		weightkg: 6,
		evos: ["Spaark"],
		eggGroups: ["Field"],
	},
	spaark: {
		num: -5,
		name: "Spaark",
		types: ["Fire"],
		baseStats: {hp: 57, atk: 60, def: 85, spa: 76, spd: 75, spe: 52},
		abilities: {0: "Blaze"},
		weightkg: 35,
		prevo: "Kindlamb",
		evos: ["Inferam"],
		eggGroups: ["Field"],
	},
	inferam: {
		num: -6,
		name: "Inferam",
		types: ["Fire", "Steel"],
		baseStats: {hp: 82, atk: 75, def: 110, spa: 96, spd: 100, spe: 67},
		abilities: {0: "Blaze"},
		weightkg: 64,
		prevo: "Spaark",
		eggGroups: ["Field"],
	},
	slapole: {
		num: -7,
		name: "Slapole",
		types: ["Water"],
		baseStats: {hp: 50, atk: 65, def: 50, spa: 55, spd: 40, spe: 50},
		abilities: {0: "Torrent"},
		weightkg: 5,
		evos: ["Strikroak"],
		eggGroups: ["Water 1", "Field"],
	},
	strikroak: {
		num: -8,
		name: "Strikroak",
		types: ["Water"],
		baseStats: {hp: 70, atk: 85, def: 70, spa: 60, spd: 60, spe: 60},
		abilities: {0: "Torrent"},
		weightkg: 30,
		prevo: "Slapole",
		evos: ["Yamatoad"],
		eggGroups: ["Water 1", "Field"],
	},
	yamatoad: {
		num: -9,
		name: "Yamatoad",
		types: ["Water", "Fighting"],
		baseStats: {hp: 100, atk: 120, def: 100, spa: 70, spd: 80, spe: 65},
		abilities: {0: "Torrent"},
		weightkg: 134,
		prevo: "Strikroak",
		eggGroups: ["Water 1", "Field"],
	},
	yuckduck: {
		num: -10,
		name: "Yuckduck",
		types: ["Normal", "Flying"],
		baseStats: {hp: 40, atk: 56, def: 20, spa: 30, spd: 33, spe: 66},
		abilities: {0: "Vital Spirit", 1: "Rain Dish"},
		weightkg: 10,
		evos: ["Swanger"],
		eggGroups: ["Flying", "Field"],
	},
	swanger: {
		num: -11,
		name: "Swanger",
		types: ["Water", "Flying"],
		baseStats: {hp: 50, atk: 71, def: 40, spa: 40, spd: 53, spe: 86},
		abilities: {0: "Vital Spirit", 1: "Rain Dish"},
		weightkg: 21,
		prevo: "Yuckduck",
		evos: ["Aggreswan"],
		eggGroups: ["Flying", "Field"],
	},
	aggreswan: {
		num: -12,
		name: "Aggreswan",
		types: ["Water", "Flying"],
		baseStats: {hp: 70, atk: 101, def: 60, spa: 70, spd: 73, spe: 111},
		abilities: {0: "Vital Spirit", 1: "Water Veil"},
		weightkg: 51,
		prevo: "Swanger",
		eggGroups: ["Flying", "Field"],
	},
	capybaby: {
		num: -13,
		name: "Capybaby",
		types: ["Normal"],
		baseStats: {hp: 80, atk: 31, def: 72, spa: 50, spd: 47, spe: 25},
		abilities: {0: "Natural Cure", 1: "Oblivious"},
		weightkg: 60,
		evos: ["Capyblue"],
		eggGroups: ["Field"],
	},
	capyblue: {
		num: -14,
		name: "Capyblue",
		types: ["Normal", "Water"],
		baseStats: {hp: 110, atk: 51, def: 102, spa: 80, spd: 67, spe: 30},
		abilities: {0: "Natural Cure", 1: "Water Veil"},
		weightkg: 60,
		prevo: "Capybaby",
		eggGroups: ["Field"],
	},
	kotora: {
		num: -15,
		name: "Kotora",
		types: ["Electric"],
		baseStats: {hp: 45, atk: 52, def: 42, spa: 48, spd: 41, spe: 50},
		abilities: {0: "Static", 1: "Run Away"},
		weightkg: 15,
		evos: ["Raitora"],
		eggGroups: ["Field"],
	},
	raitora: {
		num: -16,
		name: "Raitora",
		types: ["Electric"],
		baseStats: {hp: 60, atk: 82, def: 72, spa: 63, spd: 56, spe: 65},
		abilities: {0: "Static", 1: "Intimidate"},
		weightkg: 34,
		prevo: "Kotora",
		evos: ["Gorotora"],
		eggGroups: ["Field"],
	},
	gorotora: {
		num: -17,
		name: "Gorotora",
		types: ["Electric"],
		baseStats: {hp: 100, atk: 107, def: 82, spa: 87, spd: 76, spe: 70},
		abilities: {0: "Static", 1: "Intimidate"},
		weightkg: 69,
		prevo: "Raitora",
		eggGroups: ["Field"],
	},
	sableye: {
		inherit: true,
		evos: ["Sablenvy"],
	},
	sablenvy: {
		num: -18,
		name: "Sablenvy",
		types: ["Dark", "Ghost"],
		baseStats: {hp: 70, atk: 95, def: 115, spa: 80, spd: 105, spe: 30},
		abilities: {0: "Confiscate"},
		weightkg: 160,
		prevo: "Sableye",
		eggGroups: ["Human-Like"],
	},
	tangela: {
		inherit: true,
		abilities: {0: "Chlorophyll", 1: "Overcoat"},
		evos: ["Brambela"],
	},
	brambela: {
		num: -19,
		name: "Brambela",
		types: ["Grass", "Ground"],
		baseStats: {hp: 75, atk: 105, def: 115, spa: 55, spd: 55, spe: 100},
		abilities: {0: "Sand Veil", 1: "Overcoat"},
		weightkg: 20,
		prevo: "Tangela",
		eggGroups: ["Grass"],
	},
	murkrow: {
		inherit: true,
		abilities: { 0: "Insomnia", 1: "Overcoat"},
		evos: ["Huginkrow"],
	},
	huginkrow: {
		num: -20,
		name: "Huginkrow",
		types: ["Dark", "Psychic"],
		baseStats: {hp: 70, atk: 105, def: 72, spa: 105, spd: 72, spe: 101},
		abilities: {0: "Levitate", 1: "Overcoat"},
		weightkg: 110,
		prevo: "Murkrow",
		eggGroups: ["Flying"],
	},
	delibird: {
		inherit: true,
		evos: ["Elfowl"],
	},
	elfowl: {
		num: -21,
		name: "Elfowl",
		types: ["Ice", "Flying"],
		baseStats: {hp: 75, atk: 85, def: 65, spa: 95, spd: 65, spe: 110},
		abilities: {0: "Insomnia", 1: "Thick Fat"},
		weightkg: 51.3,
		prevo: "Delibird",
		eggGroups: ["Water 1", "Field"],
	},
	hoppip: {
		inherit: true,
		abilities: { 0: "Chlorophyll", 1: "Fluffy"},
	},
	skiploom: {
		inherit: true,
		abilities: { 0: "Chlorophyll", 1: "Fluffy"},
		evos: ["Jumpluff", "Gyrobloom"],
	},
	jumpluff: {
		inherit: true,
		abilities: { 0: "Chlorophyll", 1: "Fluffy"},
	},
	gyrobloom: {
		num: -22,
		name: "Gyrobloom",
		types: ["Grass", "Steel"],
		baseStats: {hp: 65, atk: 85, def: 100, spa: 35, spd: 80, spe: 95},
		abilities: {0: "Levitate"},
		weightkg: 130,
		prevo: "Skiploom",
		eggGroups: ["Fairy", "Grass"],
	},
	aipom: {
		inherit: true,
		evos: ["Similash"],
	},
	similas1: {
		num: -23,
		name: "Similash",
		types: ["Normal", "Fighting"],
		baseStats: {hp: 85, atk: 110, def: 55, spa: 60, spd: 55, spe: 115},
		abilities: {0: "Keen Eye", 1: "Pickup"},
		weightkg: 75,
		prevo: "Aipom",
		eggGroups: ["Field"],
	},
	sudowoodo: {
		inherit: true,
		evos: ["Putrewoodo"],
	},
	putrewoodo: {
		num: -24,
		name: "Putrewoodo",
		types: ["Rock", "Ghost"],
		baseStats: {hp: 80, atk: 120, def: 120, spa: 60, spd: 70, spe: 50},
		abilities: {0: "Clear Body", 1: "Rock Head"},
		weightkg: 5,
		prevo: "Sudowoodo",
		eggGroups: ["Mineral"],
	},
	arbok: {
		inherit: true,
		evos: ["Adnocana"],
	},
	adnocana: {
		num: -25,
		name: "Adnocana",
		types: ["Poison", "Dragon"],
		baseStats: {hp: 70, atk: 112, def: 80, spa: 70, spd: 79, spe: 94},
		abilities: {0: "Shed Skin", 1: "Intimidate"},
		weightkg: 31,
		prevo: "Arbok",
		eggGroups: ["Field", "Dragon"],
	},

	pidgey: {
		inherit: true,
		abilities: { 0: "Keen Eye"},
	},
	pidgeotto: {
		inherit: true,
		abilities: { 0: "Keen Eye"},
	},
	pidgeot: {
		inherit: true,
		abilities: { 0: "Keen Eye"},
	},
	nidoranf: {
		inherit: true,
		abilities: { 0: "Poison Point"},
	},
	nidorina: {
		inherit: true,
		abilities: { 0: "Poison Point"},
	},
	nidoqueen: {
		inherit: true,
		abilities: { 0: "Poison Point"},
	},
	nidoranm: {
		inherit: true,
		abilities: { 0: "Poison Point"},
	},
	nidorino: {
		inherit: true,
		abilities: { 0: "Poison Point"},
	},
	nidoking: {
		inherit: true,
		abilities: { 0: "Poison Point"},
	},
	clefairy: {
		inherit: true,
		abilities: { 0: "Cute Charm"},
	},
	clefable: {
		inherit: true,
		abilities: { 0: "Cute Charm"},
	},
	jigglypuff: {
		inherit: true,
		abilities: {0: "Cute Charm", 1: "Confiscate" },
	},
	wigglytuff: {
		inherit: true,
		abilities: {0: "Cute Charm", 1: "Confiscate" },
	},
	paras: {
		inherit: true,
		abilities: { 0: "Effect Spore"},
	},
	parasect: {
		inherit: true,
		abilities: { 0: "Effect Spore"},
	},
	venonat: {
		inherit: true,
		abilities: {0: "Compound Eyes", 1: "Overcoat"},
	},
	venomot1: {
		inherit: true,
		abilities: {0: "Shield Dust", 1: "Overcoat"},
	},
	meowt1: {
		inherit: true,
		abilities: { 0: "Pickup"},
	},
	persian: {
		inherit: true,
		abilities: { 0: "Limber"},
	},
	mankey: {
		inherit: true,
		abilities: { 0: "Vital Spirit"},
	},
	primeape: {
		inherit: true,
		abilities: { 0: "Vital Spirit"},
	},
	machop: {
		inherit: true,
		abilities: { 0: "Guts"},
	},
	machoke: {
		inherit: true,
		abilities: { 0: "Guts" },
	},
	machamp: {
		inherit: true,
		abilities: { 0: "Guts" },
	},
	seel: {
		inherit: true,
		abilities: { 0: "Thick Fat" },
	},
	dewgong: {
		inherit: true,
		abilities: { 0: "Thick Fat" },
	},
	shellder: {
		inherit: true,
		abilities: { 0: "Shell Armor", 1: "Overcoat"},
	},
	cloyster: {
		inherit: true,
		abilities: { 0: "Shell Armor", 1: "Overcoat"},
	},
	drowzee: {
		inherit: true,
		abilities: { 0: "Insomnia", 1: "Confiscate" },
	},
	hypno: {
		inherit: true,
		abilities: { 0: "Insomnia", 1: "Confiscate" },
	},
	hitmonlee: {
		inherit: true,
		abilities: { 0: "Limber", 1: "Striker" },
	},
	hitmonchan: {
		inherit: true,
		abilities: { 0: "Keen Eye" },
	},
	kangaskhan: {
		inherit: true,
		abilities: { 0: "Early Bird" },
	},
	horsea: {
		inherit: true,
		abilities: { 0: "Swift Swim" },
	},
	seadra: {
		inherit: true,
		abilities: { 0: "Poison Point" },
	},
	mrmime: {
		inherit: true,
		abilities: { 0: "Soundproof" },
	},
	scyther: {
		inherit: true,
		abilities: { 0: "Swarm" },
	},
	jynx: {
		inherit: true,
		abilities: { 0: "Oblivious", 1: "Confiscate" },
	},
	pinsir: {
		inherit: true,
		abilities: { 0: "Hyper Cutter" },
	},
	tauros: {
		inherit: true,
		abilities: { 0: "Intimidate"},
	},
	eevee: {
		inherit: true,
		abilities: { 0: "Run Away"},
	},
	flareon: {
		inherit: true,
		abilities: {0: "Flash Fire", 1: "Fluffy"},
	},
	porygon: {
		inherit: true,
		abilities: { 0: "Trace"},
	},
	sentret: {
		inherit: true,
		abilities: {0: "Confiscate", 1: "Keen Eye"},
	},
	furret: {
		inherit: true,
		abilities: {0: "Confiscate", 1: "Keen Eye"},
	},
	cleffa: {
		inherit: true,
		abilities: { 0: "Cute Charm" },
	},
	igglybuff: {
		inherit: true,
		abilities: {0: "Cute Charm", 1: "Confiscate" },
	},
	mareep: {
		inherit: true,
		abilities: {0: "Static", 1: "Fluffy"},
	},
	flaaffy: {
		inherit: true,
		abilities: {0: "Static", 1: "Fluffy"},
	},
	politoed: {
		inherit: true,
		abilities: {0: "Water Absorb", 1: "Precipitate"},
	},
	sunkern: {
		inherit: true,
		abilities: { 0: "Chlorophyll", 1: "Sunshine" },
	},
	sunflora: {
		inherit: true,
		abilities: { 0: "Chlorophyll", 1: "Sunshine" },
	},
	pineco: {
		inherit: true,
		abilities: {0: "Sturdy", 1: "Overcoat"},
	},
	forretress: {
		inherit: true,
		abilities: {0: "Sturdy", 1: "Overcoat"},
	},
	snubbull: {
		inherit: true,
		abilities: { 0: "Intimidate" },
	},
	granbull: {
		inherit: true,
		abilities: { 0: "Intimidate" },
	},
	scizor: {
		inherit: true,
		abilities: { 0: "Swarm" },
	},
	shuckle: {
		inherit: true,
		abilities: { 0: "Sturdy" },
	},
	teddiursa: {
		inherit: true,
		abilities: { 0: "Pickup" },
	},
	ursaring: {
		inherit: true,
		abilities: { 0: "Guts" },
	},
	swinub: {
		inherit: true,
		abilities: { 0: "Oblivious" },
	},
	piloswine: {
		inherit: true,
		abilities: { 0: "Oblivious" },
	},
	remoraid: {
		inherit: true,
		abilities: { 0: "Hustle" },
	},
	octillery: {
		inherit: true,
		abilities: { 0: "Suction Cups" },
	},
	kingdra: {
		inherit: true,
		abilities: { 0: "Swift Swim" },
	},
	porygon2: {
		inherit: true,
		abilities: { 0: "Trace" },
	},
	stantler: {
		inherit: true,
		abilities: { 0: "Intimidate" },
	},
	smeargle: {
		inherit: true,
		abilities: { 0: "Own Tempo" },
	},
	tyrogue: {
		inherit: true,
		abilities: { 0: "Guts" },
	},
	hitmontop: {
		inherit: true,
		abilities: { 0: "Intimidate" },
	},
	smoochum: {
		inherit: true,
		abilities: { 0: "Oblivious", 1: "Confiscate" },
	},
	miltank: {
		inherit: true,
		abilities: { 0: "Thick Fat" },
	},
	poochyena: {
		inherit: true,
		abilities: { 0: "Run Away" },
	},
	mightyena: {
		inherit: true,
		abilities: { 0: "Intimidate" },
	},
	zigzagoon: {
		inherit: true,
		abilities: { 0: "Pickup", 1: "Overcoat"},
	},
	linoone: {
		inherit: true,
		abilities: { 0: "Pickup", 1: "Overcoat"},
	},
	wingull: {
		inherit: true,
		abilities: {0: "Keen Eye", 1: "Precipitate"},
	},
	pelipper: {
		inherit: true,
		abilities: {0: "Keen Eye", 1: "Precipitate"},
	},
	surskit: {
		inherit: true,
		abilities: {0: "Swift Swim", 1: "Rain Dish"},
	},
	masquerain: {
		inherit: true,
		abilities: {0: "Intimidate", 1: "Precipitate"},
	},
	shroomis1: {
		inherit: true,
		abilities: { 0: "Effect Spore" },
	},
	breloom: {
		inherit: true,
		abilities: { 0: "Effect Spore" },
	},
	whismur: {
		inherit: true,
		abilities: {0: "Soundproof", 1: "Cacophony"},
	},
	loudred: {
		inherit: true,
		abilities: {0: "Soundproof", 1: "Cacophony"},
	},
	exploud: {
		inherit: true,
		abilities: {0: "Soundproof", 1: "Cacophony"},
	},
	skitty: {
		inherit: true,
		abilities: { 0: "Cute Charm", 1: "Fluffy" },
	},
	delcatty: {
		inherit: true,
		abilities: { 0: "Cute Charm", 1: "Fluffy" },
	},
	illumise: {
		inherit: true,
		abilities: { 0: "Oblivious" },
	},
	numel: {
		inherit: true,
		abilities: { 0: "Oblivious" },
	},
	camerupt: {
		inherit: true,
		abilities: { 0: "Magma Armor" },
	},
	torkoal: {
		inherit: true,
		abilities: {0: "White Smoke", 1: "Sunshine"},
	},
	spinda: {
		inherit: true,
		abilities: { 0: "Own Tempo" },
	},
	swablu: {
		inherit: true,
		abilities: {0: "Natural Cure", 1: "Fluffy"},
	},
	altaria: {
		inherit: true,
		abilities: {0: "Natural Cure", 1: "Fluffy"},
	},
	solrock: {
		inherit: true,
		abilities: {0: "Levitate", 1: "Sunshine"},
	},
	barboac1: {
		inherit: true,
		abilities: { 0: "Oblivious"},
	},
	whiscas1: {
		inherit: true,
		abilities: { 0: "Oblivious"},
	},
	feebas: {
		inherit: true,
		abilities: { 0: "Swift Swim" },
	},
	shuppet: {
		inherit: true,
		abilities: { 0: "Insomnia", 1: "Confiscate" },
	},
	banette: {
		inherit: true,
		abilities: { 0: "Insomnia", 1: "Confiscate" },
	},
	duskull: {
		inherit: true,
		abilities: {0: "Levitate", 1: "Confiscate"},
	},
	dusclops: {
		inherit: true,
		abilities: {0: "Pressure", 1: "Confiscate"},
	},
	tropius: {
		inherit: true,
		abilities: { 0: "Chlorophyll" },
	},
	absol: {
		inherit: true,
		abilities: { 0: "Pressure" },
	},
	snorunt: {
		inherit: true,
		abilities: { 0: "Inner Focus" },
	},
	glalie: {
		inherit: true,
		abilities: { 0: "Inner Focus" },
	},
	spheal: {
		inherit: true,
		abilities: { 0: "Thick Fat" },
	},
	sealeo: {
		inherit: true,
		abilities: { 0: "Thick Fat" },
	},
	walrein: {
		inherit: true,
		abilities: { 0: "Thick Fat" },
	},
	shelgon: {
		inherit: true,
		abilities: {0: "Rock Head", 1: "Overcoat"},
	},
};