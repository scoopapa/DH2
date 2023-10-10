export const Pokedex: { [k: string]: ModdedSpeciesData; } = {
	sparktus: {
		num: 1001,
		name: "Sparktus",
		types: ["Grass"],
		baseStats: {hp: 60, atk: 90, def: 65, spa: 70, spd: 70, spe: 50},
		abilities: {0: "Overgrow"},
		evos: ["Cactamp"],
		weightkg: 15,
		eggGroups: ["Grass", "Field"],
	},
	cactamp: {
		num: 1002,
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
		num: 1003,
		name: "Succurent",
		types: ["Grass", "Electric"],
		baseStats: {hp: 80, atk: 110, def: 80, spa: 90, spd: 100, spe: 70},
		abilities: {0: "Overgrow"},
		prevo: "Cactamp",
		weightkg: 50,
		eggGroups: ["Grass", "Field"],
	},
	kindlamb: {
		num: 1004,
		name: "Kindlamb",
		types: ["Fire"],
		baseStats: {hp: 47, atk: 45, def: 55, spa: 61, spd: 55, spe: 47},
		abilities: {0: "Blaze"},
		weightkg: 6,
		evos: ["Spaark"],
		eggGroups: ["Field"],
	},
	spaark: {
		num: 1005,
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
		num: 1006,
		name: "Inferam",
		types: ["Fire", "Steel"],
		baseStats: {hp: 82, atk: 75, def: 110, spa: 96, spd: 100, spe: 67},
		abilities: {0: "Blaze"},
		weightkg: 64,
		prevo: "Spaark",
		eggGroups: ["Field"],
	},
	slapole: {
		num: 1007,
		name: "Slapole",
		types: ["Water"],
		baseStats: {hp: 50, atk: 65, def: 50, spa: 55, spd: 40, spe: 50},
		abilities: {0: "Torrent"},
		weightkg: 5,
		evos: ["Strikroak"],
		eggGroups: ["Water 1", "Field"],
	},
	strikroak: {
		num: 1008,
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
		num: 1009,
		name: "Yamatoad",
		types: ["Water", "Fighting"],
		baseStats: {hp: 100, atk: 120, def: 100, spa: 70, spd: 80, spe: 65},
		abilities: {0: "Torrent"},
		weightkg: 134,
		prevo: "Strikroak",
		eggGroups: ["Water 1", "Field"],
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
	venomoth: {
		inherit: true,
		abilities: {0: "Shield Dust", 1: "Overcoat"},
	},
	meowth: {
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
	tangela: {
		inherit: true,
		abilities: {0: "Chlorophyll", 1: "Overcoat"},
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
		abilities: {0: "Static", H: "Fluffy"},
	},
	hoppip: {
		inherit: true,
		abilities: { 0: "Chlorophyll" },
	},
	skiploom: {
		inherit: true,
		abilities: { 0: "Chlorophyll" },
	},
	jumpluff: {
		inherit: true,
		abilities: { 0: "Chlorophyll", 1: "Fluffy"},
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
	murkrow: {
		inherit: true,
		abilities: { 0: "Insomnia", 1: "Overcoat"},
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
	shroomish: {
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
		abilities: {0: "Natural Cure", H: "Fluffy"},
	},
	altaria: {
		inherit: true,
		abilities: {0: "Natural Cure", H: "Fluffy"},
	},
	solrock: {
		inherit: true,
		abilities: {0: "Levitate", 1: "Sunshine"},
	},
	barboach: {
		inherit: true,
		abilities: { 0: "Oblivious"},
	},
	whiscash: {
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