export const Pokedex: {[k: string]: ModdedSpeciesData} = {
	// REAL
	pichu: {
		inherit: true,
		otherFormes: ["Pichu-Spiky-eared"],
		formeOrder: ["Pichu", "Pichu-Spiky-eared"],
		gen: 1,
	},
	pichuspikyeared: {
		inherit: true,
		gen: 2
	},
	raichu: {
		inherit: true,
		evos: ["Gorochu"],
		otherFormes: ["Raichu-Alola"]
	},
	raichualola: {
		inherit: true,
		gen: 1,
		"baseStats": {
			"atk": 85,
			"def": 50,
			"hp": 60,
			"spa": 95,
			"spd": 85,
			"spe": 100
		},
	},
	eevee: {
		inherit: true,
	},
	leafeon: {
		inherit: true,
		gen: 1
	},
	glaceon: {
		inherit: true,
		gen: 1
	},
	sylveon: {
		inherit: true,
		gen: 1
	},
	rattata: {
		inherit: true,
		otherFormes: ["Rattata-Alola"]
	},
	rattataalola: {
		inherit: true,
		gen: 1
	},
	raticate: {
		inherit: true,
		otherFormes: ["Raticate-Alola"]
	},
	raticatealola: {
		inherit: true,
		gen: 1
	},
	paras: {
		inherit: true,
		prevo: "Paraspor",
	},
	meowth: {
		inherit: true,
		otherFormes: ["Meowth-Alola", "Meowth-Galar"],
		prevo: "Coinpur",
	},
	meowthalola: {
		inherit: true,
		gen: 1
	},
	meowthgalar: {
		inherit: true,
		gen: 1
	},
	persian: {
		inherit: true,
		otherFormes: ["Persian-Alola"]
	},
	persianalola: {
		inherit: true,
		gen: 1
	},
	perrserker: {
		inherit: true,
		gen: 1
	},
	geodude: {
		inherit: true,
		otherFormes: ["Geodude-Alola"]
	},
	geodudealola: {
		inherit: true,
		gen: 1
	},
	graveler: {
		inherit: true,
		otherFormes: ["Graveler-Alola"]
	},
	graveleralola: {
		inherit: true,
		gen: 1
	},
	golem: {
		inherit: true,
		otherFormes: ["Golem-Alola"]
	},
	golemalola: {
		inherit: true,
		gen: 1,
		"baseStats": {
			"atk": 110,
			"def": 130,
			"hp": 80,
			"spa": 55,
			"spd": 65,
			"spe": 45
		},
	},
	sandshrew: {
		inherit: true,
		otherFormes: ["Sandshrew-Alola"]
	},
	sandshrewalola: {
		inherit: true,
		gen: 1
	},
	sandslash: {
		inherit: true,
		otherFormes: ["Sandslash-Alola"]
	},
	sandslashalola: {
		inherit: true,
		gen: 1
	},
	vulpix: {
		inherit: true,
		otherFormes: ["Vulpix-Alola"]
	},
	vulpixalola: {
		inherit: true,
		gen: 1
	},
	ninetales: {
		inherit: true,
		otherFormes: ["Ninetales-Alola"]
	},
	ninetalesalola: {
		inherit: true,
		gen: 1
	},
	annihilape: {
		inherit: true,
		gen: 1
	},
	lickilicky: {
		inherit: true,
		gen: 1
	},
	growlithe: {
		inherit: true,
		otherFormes: ["Growlithe-Hisui"]
	},
	growlithehisui: {
		inherit: true,
		gen: 1
	},
	arcanine: {
		inherit: true,
		otherFormes: ["Arcanine-Hisui"]
	},
	arcaninehisui: {
		inherit: true,
		gen: 1
	},
	farfetchd: {
		inherit: true,
		otherFormes: ["Farfetch\u2019d-Galar"],
		evos: ["Luxwan"]
	},
	farfetchdgalar: {
		inherit: true,
		gen: 1
	},
	sirfetchd: {
		inherit: true,
		gen: 1
	},
	diglett: {
		inherit: true,
		otherFormes: ["Diglett-Alola"]
	},
	diglettalola: {
		inherit: true,
		gen: 1
	},
	dugtrio: {
		inherit: true,
		otherFormes: ["Dugtrio-Alola"]
	},
	dugtrioalola: {
		inherit: true,
		gen: 1,
		"baseStats": {
			"atk": 80,
			"def": 60,
			"hp": 35,
			"spa": 50,
			"spd": 70,
			"spe": 110
		},
	},
	wiglett: {
		inherit: true,
		gen: 1
	},
	wugtrio: {
		inherit: true,
		gen: 1,
		"baseStats": {
			"atk": 80,
			"def": 50,
			"hp": 35,
			"spa": 50,
			"spd": 70,
			"spe": 120
		},
	},
	voltorb: {
		inherit: true,
		otherFormes: ["Voltorb-Hisui"]
	},
	voltorbhisui: {
		inherit: true,
		gen: 1
	},
	electrode: {
		inherit: true,
		otherFormes: ["Electrode-Hisui"]
	},
	electrodehisui: {
		inherit: true,
		gen: 1,
		"baseStats": {
			"atk": 50,
			"def": 70,
			"hp": 60,
			"spa": 80,
			"spd": 80,
			"spe": 140
		},
	},
	toedscool: {
		inherit: true,
		gen: 1
	},
	toedscruel: {
		inherit: true,
		gen: 1
	},
	magnezone: {
		inherit: true,
		gen: 1
	},
	slowpoke: {
		inherit: true,
		otherFormes: ["Slowpoke-Galar"]
	},
	slowpokegalar: {
		inherit: true,
		gen: 1
	},
	slowbro: {
		inherit: true,
		otherFormes: ["Slowbro-Galar"]
	},
	slowbrogalar: {
		inherit: true,
		gen: 1
	},
	slowking: {
		inherit: true,
		otherFormes: ["Slowking-Galar"],
		gen: 1
	},
	slowkinggalar: {
		inherit: true,
		gen: 1
	},
	ponyta: {
		inherit: true,
		otherFormes: ["Ponyta-Galar"]
	},
	ponytagalar: {
		inherit: true,
		gen: 1
	},
	rapidash: {
		inherit: true,
		otherFormes: ["Rapidash-Galar"]
	},
	rapidashgalar: {
		inherit: true,
		gen: 1
	},
	marowak: {
		inherit: true,
		evos: ["Guardia"],
		otherFormes: ["Marowak-Alola"]
	},
	marowakalola: {
		inherit: true,
		gen: 1
	},
	grimer: {
		inherit: true,
		otherFormes: ["Grimer-Alola"]
	},
	grimeralola: {
		inherit: true,
		gen: 1
	},
	muk: {
		inherit: true,
		otherFormes: ["Muk-Alola"]
	},
	mukalola: {
		inherit: true,
		gen: 1
	},
	weezing: {
		inherit: true,
		otherFormes: ["Weezing-Galar"]
	},
	weezinggalar: {
		inherit: true,
		gen: 1
	},
	tangrowth: {
		inherit: true,
		gen: 1
	},
	exeggutor: {
		inherit: true,
		otherFormes: ["Exeggutor-Alola"]
	},
	exeggutoralola: {
		inherit: true,
		gen: 1,
		"baseStats": {
			"atk": 105,
			"def": 85,
			"hp": 95,
			"spa": 125,
			"spd": 65,
			"spe": 45
		},
	},
	rhyperior: {
		inherit: true,
		gen: 1
	},
	kleavor: {
		inherit: true,
		gen: 1
	},
	tauros: {
		inherit: true,
		otherFormes: ["Tauros-Paldea-Combat", "Tauros-Paldea-Blaze", "Tauros-Paldea-Aqua"]
	},
	taurospaldeacombat: {
		inherit: true,
		gen: 1
	},
	taurospaldeablaze: {
		inherit: true,
		gen: 1
	},
	taurospaldeaaqua: {
		inherit: true,
		gen: 1
	},
	happiny: {
		inherit: true,
		gen: 1
	},
	mimejr: {
		inherit: true,
		gen: 1
	},
	mrmime: {
		inherit: true,
		otherFormes: ["Mr. Mime-Galar"]
	},
	mrmimegalar: {
		inherit: true,
		gen: 1
	},
	mrrime: {
		inherit: true,
		gen: 1
	},
	electivire: {
		inherit: true,
		gen: 1
	},
	magmortar: {
		inherit: true,
		gen: 1
	},
	porygonz: {
		inherit: true,
		gen: 1
	},
	aerodactyl: {
		inherit: true,
		prevo: "Ferodactyl",
	},
	munchlax: {
		inherit: true,
		gen: 1
	},
	screamtail: {
		inherit: true,
		gen: 1
	},
	sandyshocks: {
		inherit: true,
		gen: 1
	},
	articuno: {
		inherit: true,
		otherFormes: ["Articuno-Galar"]
	},
	articunogalar: {
		inherit: true,
		gen: 1
	},
	zapdos: {
		inherit: true,
		otherFormes: ["Zapdos-Galar"]
	},
	zapdosgalar: {
		inherit: true,
		gen: 1
	},
	moltres: {
		inherit: true,
		otherFormes: ["Moltres-Galar"]
	},
	moltresgalar: {
		inherit: true,
		gen: 1
	},
	meltan: {
		inherit: true,
		gen: 1
	},
	melmetal: {
		inherit: true,
		gen: 1
	},
	typhlosion: {
		inherit: true,
		otherFormes: ["Typhlosion-Hisui"]
	},
	typhlosionhisui: {
		inherit: true,
		gen: 2
	},
	ursaluna: {
		inherit: true,
		gen: 2,
		otherFormes: ["Ursaluna-Bloodmoon"],
	},
	ursalunabloodmoon: {
		inherit: true,
		gen: 2
	},
	wynaut: {
		inherit: true,
		gen: 2
	},
	dudunsparce: {
		inherit: true,
		gen: 2,
		otherFormes: ["Dudunsparce-Three-Segment"],
	},
	dudunsparcethreesegment: {
		inherit: true,
		gen: 2
	},
	farigiraf: {
		inherit: true,
		gen: 2
	},
	azurill: {
		inherit: true,
		gen: 2
	},
	woooper: {
		inherit: true,
		otherFormes: ["Wooper-Paldea"]
	},
	wooperpaldea: {
		inherit: true,
		gen: 2
	},
	clodsire: {
		inherit: true,
		gen: 2
	},
	yanmega: {
		inherit: true,
		gen: 2
	},
	ambipom: {
		inherit: true,
		gen: 2
	},
	bonsly: {
		inherit: true,
		gen: 2
	},
	mantyke: {
		inherit: true,
		gen: 2
	},
	corsola: {
		inherit: true,
		otherFormes: ["Corsola-Galar"]
	},
	corsolagalar: {
		inherit: true,
		gen: 2,
		"baseStats": {
			"atk": 55,
			"def": 90,
			"hp": 50,
			"spa": 65,
			"spd": 90,
			"spe": 30
		},
	},
	cursola: {
		inherit: true,
		gen: 2
	},
	wyrdeer: {
		inherit: true,
		gen: 2
	},
	honchkrow: {
		inherit: true,
		gen: 2
	},
	mismagius: {
		inherit: true,
		gen: 2
	},
	qwilfish: {
		inherit: true,
		evos: ["Qwilfather", "Kazeppelin"],
		otherFormes: ["Qwilfish-Hisui"]
	},
	qwilfishhisui: {
		inherit: true,
		gen: 2,
		"baseStats": {
			"atk": 95,
			"def": 75,
			"hp": 65,
			"spa": 55,
			"spd": 55,
			"spe": 85
		},
	},
	overqwil: {
		inherit: true,
		gen: 2
	},
	mamoswine: {
		inherit: true,
		gen: 2
	},
	sneasel: {
		inherit: true,
		otherFormes: ["Sneasel-Hisui"]
	},
	sneaselhisui: {
		inherit: true,
		gen: 2
	},
	weavile: {
		inherit: true,
		gen: 2
	},
	sneasler: {
		inherit: true,
		gen: 2
	},
	gliscor: {
		inherit: true,
		gen: 2
	},
	togekiss: {
		inherit: true,
		gen: 2
	},
	greattusk: {
		inherit: true,
		gen: 2
	},
	fluttermane: {
		inherit: true,
		gen: 2
	},
	irontreads: {
		inherit: true,
		gen: 2
	},
	ironbundle: {
		inherit: true,
		gen: 2
	},
	ironthorns: {
		inherit: true,
		gen: 2
	},
	walkingwake: {
		inherit: true,
		gen: 2
	},
	ragingbolt: {
		inherit: true,
		gen: 2
	},
	gougingfire: {
		inherit: true,
		gen: 2
	},
	// KEP to JEP
	cleffa: {
		inherit: true,
		gen: 1
	},
	igglybuff: {
		inherit: true,
		gen: 1
	},
	steelix: {
		inherit: true,
		gen: 1
	},
	politoed: {
		inherit: true,
		gen: 1
	},
	scizor: {
		inherit: true,
		gen: 1
	},
	tyrogue: {
		inherit: true,
		gen: 1
	},
	magby: {
		inherit: true,
		gen: 1
	},
	smoochum: {
		inherit: true,
		gen: 1
	},
	elekid: {
		inherit: true,
		gen: 1
	},
	espeon: {
		inherit: true,
		gen: 1
	},
	umbreon: {
		inherit: true,
		gen: 1
	},
	kingdra: {
		inherit: true,
		gen: 1
	},
	porygon2: {
		inherit: true,
		gen: 1
	},
	blissey: {
		inherit: true,
		gen: 1
	},
	natu: {
		inherit: true,
		evos: ["Qatu"]
	},
	xatu: {
		inherit: true,
		prevo: "Qatu"
	},
	golduck: {
		inherit: true,
		prevo: "Weirduck"
	},

	// BETAMONS + EVO LINES UPDATES
	// Procedurally generated using https://github.com/Rezzo64/JepJsonTransformer
	"aercrow": {
		num: -1,
		eggGroups: ["Flying"],
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 80,
			"def": 95,
			"hp": 65,
			"spa": 100,
			"spd": 70,
			"spe": 30
		},
		"evos": [
			""
		],
		"gen": 2,
		"name": "Aercrow",
		"types": [
			"Grass",
			"Flying"
		]
		
	},
	"balumba": {
		num: -2,
		eggGroups: ["Amorphous"],
		genderRatio: {M: 0.25, F: 0.75},
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 50,
			"def": 30,
			"hp": 90,
			"spa": 100,
			"spd": 75,
			"spe": 125
		},
		"evos": [
			""
		],
		"gen": 1,
		"name": "Balumba",
		"types": [
			"Fairy",
			"Flying"
		]
	},
	"barreau": {
		num: -3,
		eggGroups: ["Bug"],
		gender: "M",
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 35,
			"def": 60,
			"hp": 60,
			"spa": 75,
			"spd": 85,
			"spe": 80
		},
		"evos": [
			""
		],
		prevo: "Folage",
		"gen": 2,
		"name": "Barreau",
		"types": [
			"Bug",
			"Psychic"
		]
	},
	"belledam": {
		num: -4,
		eggGroups: ["Fairy"],
		gender: "F",
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 85,
			"def": 60,
			"hp": 60,
			"spa": 85,
			"spd": 70,
			"spe": 90
		},
		"evos": [
			""
		],
		prevo: "Moibelle",
		"gen": 2,
		"name": "Belledam",
		"types": [
			"Dark"
		]
	},
	"bellignan": {
		num: -5,
		eggGroups: ["Grass"],
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 120,
			"def": 65,
			"hp": 80,
			"spa": 85,
			"spd": 60,
			"spe": 70
		},
		"evos": [
			""
		],
		prevo: "Weepinbell",
		evoType: "useItem", 
		evoItem: "Sun Stone",
		"gen": 1,
		"name": "Bellignan",
		"types": [
			"Grass",
			"Poison"
		]
	},
	"bipulla": {
		num: -6,
		eggGroups: ["Amorphous"],
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 20,
			"def": 20,
			"hp": 20,
			"spa": 65,
			"spd": 45,
			"spe": 45
		},
		"evos": [
			"Calflac"
		],
		"gen": 2,
		"name": "Bipulla",
		"types": [
			"Ghost"
		]
	},
	"bittybat": {
		num: -7,
		eggGroups: ["Undiscovered"],
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 40,
			"def": 30,
			"hp": 35,
			"spa": 25,
			"spd": 35,
			"spe": 50
		},
		"evos": [
			"Zubat"
		],
		"gen": 1,
		"name": "Bittybat",
		"types": [
			"Poison",
			"Flying"
		]
	},
	"blastyke": {
		num: -8,
		eggGroups: ["Monster", "Water 1"],
		genderRatio: {M: 0.875, F: 0.125},
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 43,
			"def": 60,
			"hp": 49,
			"spa": 45,
			"spd": 65,
			"spe": 48
		},
		"evos": [
			"Blastoise"
		],
		"gen": 1,
		"name": "Blastyke",
		"types": [
			"Water"
		]
	},
	"blottle": {
		num: -9,
		eggGroups: ["Water 3"],
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 35,
			"def": 60,
			"hp": 60,
			"spa": 65,
			"spd": 65,
			"spe": 50
		},
		evos: ["Pendraken"],
		"gen": 1,
		"name": "Blottle",
		"types": [
			"Water",
			"Fairy"
		]
	},
	"bruinous": {
		num: -10,
		eggGroups: ["Field"],
		genderRatio: {M: 0.875, F: 0.125},
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 105,
			"def": 84,
			"hp": 87,
			"spa": 100,
			"spd": 73,
			"spe": 85
		},
		"evos": [
			""
		],
		prevo: "Flambear",
		"gen": 2,
		"name": "Bruinous",
		"types": [
			"Fire"
		]
	},
	"burgela": {
		num: -11,
		eggGroups: ["Undiscovered"],
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 35,
			"def": 85,
			"hp": 45,
			"spa": 80,
			"spd": 20,
			"spe": 40
		},
		"evos": [
			"Tangela"
		],
		"gen": 1,
		"name": "Burgela",
		"types": [
			"Grass"
		]
	},
	"buu": {
		num: -12,
		eggGroups: ["Human-Like"],
		gender: "F",
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 93,
			"def": 57,
			"hp": 65,
			"spa": 95,
			"spd": 85,
			"spe": 95
		},
		"evos": [
			""
		],
		"gen": 1,
		"name": "Buu",
		"types": [
			"Ice"
		]
	},
	"cactormus": {
		num: -13,
		eggGroups: ["Grass"],
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 95,
			"def": 100,
			"hp": 60,
			"spa": 75,
			"spd": 75,
			"spe": 90
		},
		"evos": [
			""
		],
		"gen": 1,
		"name": "Cactormus",
		"types": [
			"Grass",
			"Ground"
		]
	},
	"calflac": {
		num: -14,
		eggGroups: ["Field", "Amorphous"],
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 40,
			"def": 40,
			"hp": 40,
			"spa": 75,
			"spd": 55,
			"spe": 65
		},
		"evos": [
			"Girafarig"
		],
		prevo: "Bipulla",
		"gen": 2,
		"name": "Calflac",
		"types": [
			"Normal",
			"Psychic"
		]
	},
	"carapthor": {
		num: -15,
		eggGroups: ["Bug"],
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 85,
			"def": 50,
			"hp": 60,
			"spa": 60,
			"spd": 70,
			"spe": 60
		},
		"evos": [
			""
		],
		prevo: "Pupal",
		evoLevel: 10,
		"gen": 2,
		"name": "Carapthor",
		"types": [
			"Bug",
			"Fighting"
		]
	},
	"cheep": {
		num: -16,
		eggGroups: ["Water 2"],
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 65,
			"def": 40,
			"hp": 45,
			"spa": 40,
			"spd": 40,
			"spe": 40
		},
		evos: ["Jabetta"],
		"gen": 1,
		"name": "Cheep",
		"types": [
			"Water"
		]
	},
	"chikorita": {
		inherit: true,
		evos: ["Bayleef, Blossomole"]
	},
	"coinpur": {
		num: -17,
		eggGroups: ["Undiscovered"],
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 40,
			"def": 30,
			"hp": 35,
			"spa": 35,
			"spd": 35,
			"spe": 85
		},
		"evos": [
			"Meowth"
		],
		"gen": 1,
		"name": "Coinpur",
		"types": [
			"Normal"
		]
	},
	"croakozuna": {
		num: -18,
		eggGroups: ["Water 1"],
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 75,
			"def": 70,
			"hp": 134,
			"spa": 75,
			"spd": 80,
			"spe": 60
		},
		"evos": [
			""
		],
		prevo: "Ribbito",
		"gen": 1,
		"name": "Croakozuna",
		"types": [
			"Water",
			"Dark"
		]
	},
	"cubburn": {
		num: -19,
		eggGroups: ["Field"],
		genderRatio: {M: 0.875, F: 0.125},
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 52,
			"def": 46,
			"hp": 51,
			"spa": 65,
			"spd": 47,
			"spe": 48
		},
		"evos": [
			"Flambear"
		],
		"gen": 2,
		"name": "Cubburn",
		"types": [
			"Fire"
		]
	},
	"decilla": {
		num: -20,
		eggGroups: ["Monster"],		
		genderRatio: {M: 0.875, F: 0.125},
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 90,
			"def": 70,
			"hp": 61,
			"spa": 30,
			"spd": 40,
			"spe": 15
		},
		evos: ["Gawarhed"],
		"gen": 1,
		"name": "Decilla",
		"types": [
			"Rock"
		]
	},
	"disturban": {
		num: -21,
		eggGroups: ["Water 3"],
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 125,
			"def": 145,
			"hp": 70,
			"spa": 75,
			"spd": 65,
			"spe": 50
		},
		"evos": [
			""
		],
		prevo: "Shellder",
		evoType: "useItem",
		evoItem: "Water Stone",
		"gen": 1,
		"name": "Disturban",
		"types": [
			"Water"
		]
	},
	"ditto": {
		inherit: true,
		evos: ["Mimmeo"]
	},
	"dodaerie": {
		num: -22,
		eggGroups: ["Undiscovered"],
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 65,
			"def": 25,
			"hp": 15,
			"spa": 15,
			"spd": 15,
			"spe": 55
		},
		"evos": [
			"Doduo"
		],
		"gen": 1,
		"name": "Dodaerie",
		"types": [
			"Normal",
			"Flying"
		]
	},
	"donmarin": {
		num: -103,
		eggGroups: ["Monster", "Water 1"],
		genderRatio: {M: 0.875, F: 0.125},
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 73,
			"def": 78,
			"hp": 103,
			"spa": 103,
			"spd": 105,
			"spe": 68
		},
		"evos": [
			""
		],
		prevo: "Pressio",
		"gen": 2,
		"name": "Donmarin",
		"types": [
			"Water"
		]
	},
	"elebebi": {
		num: -23,
		eggGroups: ["Undiscovered"],
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 48,
			"def": 22,
			"hp": 30,
			"spa": 50,
			"spd": 40,
			"spe": 80
		},
		"evos": [
			"Elekid"
		],
		"gen": 2,
		"name": "Elebebi",
		"types": [
			"Electric"
		]
	},
	"ferodactyl": {
		num: -24,
		eggGroups: ["Undiscovered"],
		genderRatio: {M: 0.875, F: 0.125},
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 85,
			"def": 45,
			"hp": 60,
			"spa": 40,
			"spd": 55,
			"spe": 110
		},
		"evos": [
			"Aerodactyl"
		],
		"gen": 2,
		"name": "Ferodactyl",
		"types": [
			"Rock"
		]
	},
	"flambear": {
		num: -104,
		eggGroups: ["Field"],
		genderRatio: {M: 0.875, F: 0.125},
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 72,
			"def": 64,
			"hp": 70,
			"spa": 85,
			"spd": 55,
			"spe": 63
		},
		"evos": [
			"Bruinous"
		],
		prevo: "Cubburn",
		"gen": 2,
		"name": "Flambear",
		"types": [
			"Fire"
		]
	},
	"folage": {
		num: -105,
		eggGroups: ["Bug"],
		genderRatio: {M: 0.125, F: 0.875},
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 25,
			"def": 45,
			"hp": 40,
			"spa": 25,
			"spd": 45,
			"spe": 15
		},
		"evos": [
			"Barreau"
		],
		"gen": 2,
		"name": "Folage",
		"types": [
			"Bug"
		]
	},
	"gaotora": {
		num: -25,
		eggGroups: ["Field"],
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 80,
			"def": 65,
			"hp": 65,
			"spa": 75,
			"spd": 50,
			"spe": 50
		},
		prevo: "Kotora",
		evoLevel: 16,
		evos: ["Gorotora", "Raitora"],
		"gen": 1,
		"name": "Gaotora",
		"types": [
			"Electric"
		]
	},
	"gavillain": {
		num: -106,
		eggGroups: ["Dragon", "Monster"],
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 80,
			"def": 75,
			"hp": 80,
			"spa": 90,
			"spd": 75,
			"spe": 95
		},
		"evos": [
			""
		],
		"gen": 1,
		"name": "Gavillain",
		"types": [
			"Dragon",
			"Electric"
		]
	},
	"gawarhed": {
		num: -26,
		eggGroups: ["Monster"],
		genderRatio: {M: 0.875, F: 0.125},
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 124,
			"def": 100,
			"hp": 101,
			"spa": 65,
			"spd": 95,
			"spe": 30
		},
		"evos": [
			""
		],
		prevo: "Decilla",
		evoLevel: 50,
		"gen": 1,
		"name": "Gawarhed",
		"types": [
			"Rock"
		]
	},
	"gentlarva": {
		num: -107,
		eggGroups: ["Bg"],
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 35,
			"def": 30,
			"hp": 40,
			"spa": 25,
			"spd": 25,
			"spe": 45
		},
		evos: ["Pupal"],
		"gen": 2,
		"name": "Gentlarva",
		"types": [
			"Bug"
		]
	},
	"gorochu": {
		num: -27,
		eggGroups: ["Field", "Fairy"],
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 100,
			"def": 65,
			"hp": 70,
			"spa": 100,
			"spd": 90,
			"spe": 110
		},
		"evos": [
			""
		],
		prevo: "Raichu",
		evoType: "trade",
		"gen": 1,
		"name": "Gorochu",
		"types": [
			"Electric"
		]
	},
	"gorotora": {
		num: -108,
		eggGroups: ["Field"],
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 105,
			"def": 85,
			"hp": 90,
			"spa": 95,
			"spd": 75,
			"spe": 80
		},
		"evos": [
			""
		],
		prevo: "Gaotora",
		evoLevel: 36,
		"gen": 1,
		"name": "Gorotora",
		"types": [
			"Electric"
		]
	},
	"guardia": {
		num: -28,
		eggGroups: ["Monster"],
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 90,
			"def": 120,
			"hp": 70,
			"spa": 70,
			"spd": 100,
			"spe": 65
		},
		prevo: "Marowak",
		evoType: "trade",
		evoCondition: "with a Kangaskhan", //I believe this wouldn't cause a crash as iirc they aren't actually coded in, just displayed with /dt. If it causes problems, just remove it, as it's not like this specific evo condition actually exists in RBY anyway.
		"gen": 1,
		"name": "Guardia",
		"types": [
			"Ground"
		]
	},
	"iguanarch": {
		num: -29,
		eggGroups: ["Dragon"],
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 93,
			"def": 76,
			"hp": 102,
			"spa": 121,
			"spd": 100,
			"spe": 108
		},
		"evos": [
			""
		],
		"gen": 1,
		prevo: "Ministare",
		evoLevel: 50,
		"name": "Iguanarch",
		"types": [
			"Dragon"
		]
	},
	"jabetta": {
		num: -30,
		eggGroups: ["Water 2"],
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 125,
			"def": 70,
			"hp": 80,
			"spa": 80,
			"spd": 60,
			"spe": 80
		},
		"evos": [
			""
		],
		prevo: "Cheep",
		evoLevel: 30,
		"gen": 1,
		"name": "Jabetta",
		"types": [
			"Water",
			"Fighting"
		]
	},
	"jungela": {
		num: -31,
		eggGroups: ["Grass"],
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 75,
			"def": 110,
			"hp": 100,
			"spa": 125,
			"spd": 75,
			"spe": 50
		},
		"evos": [
			""
		],
		prevo: "Tangela",
		"gen": 2,
		"name": "Jungela",
		"types": [
			"Grass",
			"Dark"
		]
	},
	"kolta": {
		num: -32,
		eggGroups: ["Undiscovered"],
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 65,
			"def": 35,
			"hp": 30,
			"spa": 45,
			"spd": 45,
			"spe": 70
		},
		"evos": [
			"Ponyta"
		],
		"gen": 1,
		"name": "Kolta",
		"types": [
			"Fire"
		]
	},
	"kotora": {
		num: -33,
		eggGroups: ["Field"],
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 65,
			"def": 45,
			"hp": 50,
			"spa": 55,
			"spd": 35,
			"spe": 40
		},
		evos: ["Gaotora"],
		"gen": 1,
		"name": "Kotora",
		"types": [
			"Electric"
		]
	},
	"lickilord": {
		num: -34,
		eggGroups: ["Monster"],
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 110,
			"def": 105,
			"hp": 80,
			"spa": 65,
			"spd": 85,
			"spe": 70
		},
		"evos": [
			""
		],
		prevo: "Lickitung",
		"gen": 2,
		"name": "Lickilord",
		"types": [
			"Normal",
			"Poison"
		]
	},
	"lickitung": {
		inherit: true,
		evos: ["Lickilicky, Lickilord"]
	},
	"luxwan": {
		num: -35,
		eggGroups: ["Flying", "Field"],
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 105,
			"def": 75,
			"hp": 72,
			"spa": 63,
			"spd": 72,
			"spe": 70
		},
		"evos": [
			""
		],
		prevo: "Farfetch\u2019d",
		evoLevel: 24,
		"gen": 1,
		"name": "Luxwan",
		"types": [
			"Normal",
			"Flying"
		]
	},
	"magikarp": {
		inherit: true,
		otherFormes: [""]
	},
	"magnetite": {
		num: -36,
		eggGroups: ["Undiscovered"],
		gender: "N",
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 45,
			"def": 80,
			"hp": 35,
			"spa": 105,
			"spd": 60,
			"spe": 55
		},
		prevo: "Magnemite",
		"evos": [
			"Magneton"
		],
		"gen": 1,
		"name": "Magnetite",
		"types": [
			"Electric",
			"Steel"
		]
	},
	"mimmeo": {
		num: -37,
		eggGroups: ["Ditto"],
		gender: "N",
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 55,
			"def": 50,
			"hp": 100,
			"spa": 50,
			"spd": 50,
			"spe": 150
		},
		"evos": [
			""
		],
		prevo: "Ditto",
		"gen": 2,
		"name": "Mimmeo",
		"types": [
			"Steel"
		]
	},
	"ministare": {
		num: -38,
		eggGroups: ["Dragon"],
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 53,
			"def": 46,
			"hp": 72,
			"spa": 81,
			"spd": 60,
			"spe": 98
		},
		prevo: "Squeamata",
		evoLevel: 30,
		"evos": [
			"Iguanarch"
		],
		"gen": 1,
		"name": "Ministare",
		"types": [
			"Dragon"
		]
	},
	"moibelle": {
		num: -39,
		eggGroups: ["Field", "Fairy"],
		gender: "F",
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 65,
			"def": 40,
			"hp": 40,
			"spa": 65,
			"spd": 50,
			"spe": 70
		},
		"evos": [
			"Belledam"
		],
		"gen": 2,
		"name": "Moibelle",
		"types": [
			"Dark"
		]
	},
	"nidoreign": {
		num: -40,
		eggGroups: ["Undiscovered"],
		gender: "N",
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 92,
			"def": 87,
			"hp": 90,
			"spa": 85,
			"spd": 85,
			"spe": 85
		},
		"evos": [
			""
		],
		prevo: "Nidorino", // It seems we can't have convergent evolutions, so Nidorino will be used here. I believe it'll be functionally identical in the validator as long as I make it learn the Nidorina-exclusive moves via an event entry or something. 
		evoType: "useItem", //NOTE TO SELF: Make the moves all learned at L1 and L50. The lowest reasonable level people will use this at is 50, and this will resolve any incompatabilities in the validator. The moves suck but let's make sure nobody becomes uncanny.
		evoItem: "Moon Stone",
		"gen": 1,
		"name": "Nidoreign",
		"types": [
			"Poison",
			"Rock"
		]
	},
	"omegadge": {
		num: -109,
		eggGroups: ["Undiscovered"],
		gender: "N",
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 106,
			"def": 120,
			"hp": 101,
			"spa": 95,
			"spd": 68,
			"spe": 25
		},
		"evos": [
			""
		],
		"gen": 1,
		"name": "Omegadge",
		"types": [
			"Steel"
		]
	},
	"orfry": {
		num: -41,
		eggGroups: ["Undiscovered"],
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 57,
			"def": 50,
			"hp": 35,
			"spa": 15,
			"spd": 40,
			"spe": 53
		},
		"evos": [
			"Goldeen"
		],
		"gen": 1,
		"name": "Orfry",
		"types": [
			"Water"
		]
	},
	"palssio": {
		num: -42,
		eggGroups: ["Monster"],
		genderRatio: {M: 0.875, F: 0.125},
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 34,
			"def": 48,
			"hp": 60,
			"spa": 65,
			"spd": 64,
			"spe": 43
		},
		"evos": [
			"Pressio"
		],
		"gen": 2,
		"name": "Palssio",
		"types": [
			"Water"
		]
	},
	"paraspor": {
		num: -43,
		eggGroups: ["Undiscovered"],
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 55,
			"def": 40,
			"hp": 20,
			"spa": 40,
			"spd": 45,
			"spe": 10
		},
		"evos": [
			"Paras"
		],
		"gen": 1,
		"name": "Paraspor",
		"types": [
			"Bug",
			"Grass"
		]
	},
	"pendraken": {
		num: -44,
		eggGroups: ["Water 3"],
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 60,
			"def": 85,
			"hp": 80,
			"spa": 105,
			"spd": 95,
			"spe": 90
		},
		"evos": [
			""
		],
		"gen": 1,
		"name": "Pendraken",
		prevo: "Blottle",
		evoLevel: 30,
		"types": [
			"Water",
			"Fairy"
		]
	},
	"phandarin": {
		num: -45,
		eggGroups: ["Amorphous"],
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 85,
			"def": 70,
			"hp": 85,
			"spa": 50,
			"spd": 50,
			"spe": 60
		},
		"evos": [
			""
		],
		prevo: "Stromen",
		"gen": 2,
		"name": "Phandarin",
		"types": [
			"Ghost",
			"Fairy"
		]
	},
	"pinsir": {
		inherit: true,
		evos: ["Tricules"]
	},
	"pressio": {
		num: -46,
		eggGroups: ["Monster"],
		genderRatio: {M: 0.875, F: 0.125},
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 44,
			"def": 58,
			"hp": 80,
			"spa": 86,
			"spd": 84,
			"spe": 53
		},
		"evos": [
			"Donmarin"
		],
		prevo: "Palssio",
		"gen": 2,
		"name": "Pressio",
		"types": [
			"Water"
		]
	},
	"psyduck": {
		inherit: true,
		evos: ["Weirduck"]
	},
	"pupal": {
		num: -110,
		eggGroups: ["Bug"],
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 20,
			"def": 50,
			"hp": 45,
			"spa": 30,
			"spd": 30,
			"spe": 40
		},
		evos: ["Carapthor"],
		prevo: "Gentlarva",
		evoLevel: 7,
		"gen": 1,
		"name": "Pupal",
		"types": [
			"Bug"
		]
	},
	"pupperon": {
		num: -47,
		eggGroups: ["Undiscovered"],
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 50,
			"def": 25,
			"hp": 35,
			"spa": 50,
			"spd": 30,
			"spe": 40
		},
		"evos": [
			"Growlithe"
		],
		"gen": 1,
		"name": "Pupperon",
		"types": [
			"Fire"
		]
	},
	"raitora": {
		num: -48,
		eggGroups: ["Field"],
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 95,
			"def": 65,
			"hp": 80,
			"spa": 105,
			"spd": 75,
			"spe": 70
		},
		"evos": [
			""
		],
		prevo: "Gaotora",
		"gen": 2,
		"name": "Raitora",
		"types": [
			"Electric"
		]
	},
	"ramoose": {
		num: -49,
		eggGroups: ["Field"],
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 110,
			"def": 85,
			"hp": 85,
			"spa": 65,
			"spd": 90,
			"spe": 60
		},
		"evos": [
			""
		],
		"gen": 1,
		"name": "Ramoose",
		"types": [
			"Normal",
			"Grass"
		]
	},
	"ribbito": {
		num: -111,
		eggGroups: ["Water 1"],
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 55,
			"def": 50,
			"hp": 94,
			"spa": 55,
			"spd": 60,
			"spe": 40
		},
		"evos": [
			"Croakozuna"
		],
		"gen": 1,
		"name": "Ribbito",
		"types": [
			"Water"
		]
	},
	"sharpoon": {
		num: -50,
		eggGroups: ["Water 2"],
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 115,
			"def": 100,
			"hp": 80,
			"spa": 85,
			"spd": 50,
			"spe": 60
		},
		"evos": [
			""
		],
		"gen": 1,
		"name": "Sharpoon",
		"types": [
			"Water",
			"Steel"
		]
	},
	"shellder": {
		inherit: true,
		evos: ["Cloyster", "Disturban"]
	},
	"shishi": {
		num: -51,
		eggGroups: ["Undiscovered"],
		gender: "N",
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 154,
			"def": 90,
			"hp": 106,
			"spa": 130,
			"spd": 90,
			"spe": 110
		},
		"evos": [
			""
		],
		"gen": 2,
		"name": "Shishi",
		"types": [
			"Ice",
			"Flying"
		]
	},
	"shuckle": {
		inherit: true,
		evos: ["Pockle"]
	},
	"smujj": {
		num: -52,
		eggGroups: ["Undiscovered"],
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 60,
			"def": 30,
			"hp": 60,
			"spa": 20,
			"spd": 30,
			"spe": 10
		},
		"evos": [
			"Grimer"
		],
		"gen": 2,
		"name": "Smujj",
		"types": [
			"Poison"
		]
	},
	"squeamata": {
		num: -53,
		eggGroups: ["Dragon"],
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 43,
			"def": 36,
			"hp": 62,
			"spa": 71,
			"spd": 50,
			"spe": 88
		},
		"evos": [
			"Ministare"
		],
		"gen": 1,
		"name": "Squeamata",
		"types": [
			"Dragon"
		]
	},
	"stromen": {
		num: -54,
		eggGroups: ["Amorphous"],
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 120,
			"def": 60,
			"hp": 30,
			"spa": 120,
			"spd": 60,
			"spe": 10
		},
		"evos": [
			""
		],
		"gen": 2,
		"name": "Stromen",
		"types": [
			"Ghost",
			"Dark"
		]
	},
	"sunkern": {
		inherit: true,
		evos: ["Sunbud"]
	},
	"tangela": {
		inherit: true,
		evos: ["Tangrowth", "Jungela"]
	},
	"totartle": {
		num: -55,
		eggGroups: ["Monster", "Water 1"],
		genderRatio: {M: 0.875, F: 0.125},
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 83,
			"def": 85,
			"hp": 79,
			"spa": 100,
			"spd": 105,
			"spe": 78
		},
		/* It seemed less complicated to separate Blastoise and Totartle when coding so I went
		** back on the branch evolution aspect. It's cool and gives a PokeGod aspect, 
		** but it's more accurate and moves are retained properly anyway.
		*/
		prevo: "Wartortle", 
		evoLevel: 43,
		"gen": 1,
		"name": "Totartle",
		"types": [
			"Water",
			"Grass"
		]
	},
	"trampel": {
		num: -56,
		eggGroups: ["Monster", "Field"],
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 100,
			"def": 90,
			"hp": 110,
			"spa": 64,
			"spd": 70,
			"spe": 56
		},
		"evos": [
			""
		],
		"gen": 1,
		"name": "Trampel",
		"types": [
			"Normal",
			"Ground"
		]
	},
	"tricules": {
		num: -57,
		eggGroups: ["Bug"],
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 125,
			"def": 140,
			"hp": 65,
			"spa": 50,
			"spd": 70,
			"spe": 45
		},
		"evos": [
			""
		],
		prevo: "Pinsir",
		evoLevel: 42,
		"gen": 1,
		"name": "Tricules",
		"types": [
			"Bug",
			"Steel"
		]
	},
	"vulpiii": {
		num: -58,
		eggGroups: ["Undiscovered"],
		genderRatio: {M: 0.25, F: 0.75},
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 31,
			"def": 30,
			"hp": 28,
			"spa": 45,
			"spd": 60,
			"spe": 60
		},
		"evos": [
			"Vulpix"
		],
		"gen": 2,
		"name": "Vulpiii",
		"types": [
			"Fire"
		]
	},
	"wartortle": {
		inherit: true,
		evos: ["Totartle"]
	},
	"weepinbell": {
		inherit: true,
		evos: ["Victreebel", "Bellignan"]
	},
	"weirduck": {
		num: -59,
		eggGroups: ["Water 1"],
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 67,
			"def": 63,
			"hp": 65,
			"spa": 80,
			"spd": 65,
			"spe": 70
		},
		"evos": [
			"Golduck"
		],
		prevo: "Psyduck",
		"gen": 1,
		"name": "Weirduck",
		"types": [
			"Water"
		]
	},
	// MANUAL INPUTS START HERE
	foxfire: {
		num: -60,
		eggGroups: ["Field"],
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 65,
			"def": 60,
			"hp": 70,
			"spa": 85,
			"spd": 80,
			"spe": 85
		},
		"evos": [
			""
		],
		"gen": 2,
		"name": "Foxfire",
		"types": [
			"Fire"
		]
	},
	reroad: {
		num: -61,
		eggGroups: ["Water 1"],
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 85,
			"def": 75,
			"hp": 90,
			"spa": 85,
			"spd": 70,
			"spe": 70
		},
		"evos": [
			""
		],
		"gen": 2,
		"name": "Reroad",
		"types": [
			"Water",
			"Normal"
		]
	},
	sunbud: {
		num: -62,
		eggGroups: ["Grass"],
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 45,
			"def": 45,
			"hp": 55,
			"spa": 65,
			"spd": 65,
			"spe": 30
		},
		"evos": [
			"Sunflora"
		],
		prevo: "Sunkern",
		"gen": 2,
		"name": "Sunbud",
		"types": [
			"Grass"
		]
	},
	hippunk: {
		num: -63,
		eggGroups: ["Monster", "Field"],
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 75,
			"def": 75,
			"hp": 90,
			"spa": 80,
			"spd": 80,
			"spe": 30
		},
		"evos": [
			""
		],
		"gen": 2,
		"name": "Hippunk",
		"types": [
			"Psychic",
			"Dark"
		]
	},
	pockle: {
		num: -64,
		eggGroups: ["Bug"],
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 70,
			"def": 130,
			"hp": 80,
			"spa": 70,
			"spd": 130,
			"spe": 25
		},
		"evos": [
			""
		],
		prevo: "Shuckle",
		"gen": 2,
		"name": "Pockle",
		"types": [
			"Ground",
			"Rock"
		]
	},
	caretorker: {
		num: -65,
		eggGroups: ["Flying"],
		gender: "F",
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 65,
			"def": 65,
			"hp": 90,
			"spa": 75,
			"spd": 118,
			"spe": 72
		},
		"evos": [
			""
		],
		"gen": 2,
		"name": "Caretorker",
		"types": [
			"Flying",
			"Fairy"
		]
	},
	stricheel: {
		num: -66,
		eggGroups: ["Water 2", "Water 3"],
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 60,
			"def": 65,
			"hp": 50,
			"spa": 60,
			"spd": 35,
			"spe": 20
		},
		"evos": [
			"Lurreel"
		],
		"gen": 2,
		"name": "Stricheel",
		"types": [
			"Water"
		]
	},
	lurreel: {
		num: -67,
		eggGroups: ["Water 2", "Water 3"],
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 85,
			"def": 105,
			"hp": 70,
			"spa": 105,
			"spd": 65,
			"spe": 55
		},
		"evos": [
			""
		],
		prevo: "Stricheel",
		"gen": 2,
		"name": "Lurreel",
		"types": [
			"Water",
			"Dark"
		]
	},
	kazeppelin: {
		num: -68,
		eggGroups: ["Water 2"],
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 95,
			"def": 75,
			"hp": 75,
			"spa": 115,
			"spd": 85,
			"spe": 65
		},
		"evos": [
			""
		],
		prevo: "Qwilfish",
		"gen": 2,
		"name": "Kazeppelin",
		"types": [
			"Water",
			"Electric"
		]
	},
	qwilfather: {
		num: -69,
		eggGroups: ["Water 2"],
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 115,
			"def": 85,
			"hp": 75,
			"spa": 75,
			"spd": 75,
			"spe": 85
		},
		"evos": [
			""
		],
		prevo: "Qwilfish",
		"gen": 2,
		"name": "Qwilfather",
		"types": [
			"Water",
			"Poison"
		]
	},
	sailwing: {
		num: -70,
		eggGroups: ["Water 2", "Flying"],
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 65,
			"def": 50,
			"hp": 70,
			"spa": 95,
			"spd": 60,
			"spe": 95
		},
		"evos": [
			""
		],
		"gen": 2,
		"name": "Sailwing",
		"types": [
			"Water",
			"Flying"
		]
	},
	grenmar: {
		num: -71,
		eggGroups: ["Water 1", "Field"],
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 80,
			"def": 80,
			"hp": 70,
			"spa": 105,
			"spd": 80,
			"spe": 55
		},
		"evos": [
			""
		],
		"gen": 2,
		"name": "Grenmar",
		"types": [
			"Fire",
			"water"
		]
	},
	bunice: {
		num: -72,
		eggGroups: ["Fairy", "Field"],
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 25,
			"def": 50,
			"hp": 40,
			"spa": 60,
			"spd": 55,
			"spe": 40
		},
		"evos": [
			"Bundra"
		],
		"gen": 2,
		"name": "Bunice",
		"types": [
			"Ice"
		]
	},
	bundra: {
		num: -73,
		eggGroups: ["Fairy", "Field"],
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 40,
			"def": 70,
			"hp": 60,
			"spa": 80,
			"spd": 70,
			"spe": 60
		},
		"evos": [
			"Bunberg",
			"Bundrake"
		],
		prevo: "Bunice",
		"gen": 2,
		"name": "Bundra",
		"types": [
			"Ice",
			"Grass"
		]
	},
	bunberg: {
		num: -74,
		eggGroups: ["Fairy", "Field"],
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 50,
			"def": 90,
			"hp": 80,
			"spa": 100,
			"spd": 100,
			"spe": 80
		},
		"evos": [
			""
		],
		prevo: "Bundra",
		"gen": 2,
		"name": "Bunberg",
		"types": [
			"Ice",
			"Grass"
		]
	},
	bundrake: {
		num: -75,
		eggGroups: ["Fairy", "Field"],
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 50,
			"def": 100,
			"hp": 80,
			"spa": 110,
			"spd": 90,
			"spe": 70
		},
		"evos": [
			""
		],
		prevo: "Bundra",
		"gen": 2,
		"name": "Bundrake",
		"types": [
			"Water",
			"Grass"
		]
	},
	warfurs: {
		num: -76,
		eggGroups: ["Field"],
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 70,
			"def": 60,
			"hp": 45,
			"spa": 50,
			"spd": 50,
			"spe": 55
		},
		"evos": [
			"Wearlycan"
		],
		"gen": 2,
		"name": "Warfurs",
		"types": [
			"Normal",
			"Ice"
		]
	},	
	wearlycan: {
		num: -77,
		eggGroups: ["Field"],
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 110,
			"def": 80,
			"hp": 75,
			"spa": 80,
			"spd": 70,
			"spe": 85
		},
		"evos": [
			""
		],
		prevo: "Warfurs",
		"gen": 2,
		"name": "Wearlycan",
		"types": [
			"Normal",
			"Ice"
		]
	},
	waruchu: {
		num: -78,
		eggGroups: ["Fairy", "Field"],
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 75,
			"def": 50,
			"hp": 55,
			"spa": 90,
			"spd": 60,
			"spe": 110
		},
		"evos": [
			""
		],
		"gen": 2,
		"name": "Waruchu",
		"types": [
			"Electric",
			"Dark"
		]
	},
	sonegg: {
		num: -79,
		eggGroups: ["Flying"],
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 35,
			"def": 50,
			"hp": 40,
			"spa": 70,
			"spd": 65,
			"spe": 65
		},
		"evos": [
			"Cacawphony", "Trebir"
		],
		"gen": 2,
		"name": "Sonegg",
		"types": [
			"Normal",
			"Flying"
		]
	},
	cacawphony: {
		num: -80,
		eggGroups: ["Flying"],
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 85,
			"def": 70,
			"hp": 60,
			"spa": 90,
			"spd": 85,
			"spe": 85
		},
		"evos": [
			""
		],
		prevo: "Sonegg",
		"gen": 2,
		"name": "Cacawphony",
		"types": [
			"Normal",
			"Flying"
		]
	},
	trebir: {
		num: -81,
		eggGroups: ["Flying"],
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 70,
			"def": 60,
			"hp": 60,
			"spa": 115,
			"spd": 85,
			"spe": 85
		},
		"evos": [
			""
		],
		prevo: "Sonegg",
		"gen": 2,
		"name": "Trebir",
		"types": [
			"Normal",
			"Flying"
		]
	},
	sakuraze: {
		num: -82,
		eggGroups: ["Grass"],
		genderRatio: {M: 0.25, F: 0.75},
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 90,
			"def": 70,
			"hp": 70,
			"spa": 87,
			"spd": 117,
			"spe": 85
		},
		"evos": [
			""
		],
		"gen": 2,
		"name": "Sakuraze",
		"types": [
			"Grass",
			"Fire"
		]
	},
	amanobi: {
		num: -83,
		eggGroups: ["Field"],
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 90,
			"def": 65,
			"hp": 50,
			"spa": 75,
			"spd": 50,
			"spe": 105
		},
		"evos": [
			""
		],
		"gen": 2,
		"name": "Amanobi",
		"types": [
			"Fighting",
			"Steel"
		]
	},
	trustan: {
		num: -84,
		eggGroups: ["Field"],
		gender: "M",
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 75,
			"def": 40,
			"hp": 50,
			"spa": 95,
			"spd": 50,
			"spe": 115
		},
		"evos": [
			""
		],
		"gen": 2,
		"name": "Trustan",
		"types": [
			"Normal",
			"Fire"
		]
	},
	kuwaguard: {
		num: -85,
		eggGroups: ["Bug"],
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 95,
			"def": 90,
			"hp": 60,
			"spa": 60,
			"spd": 65,
			"spe": 75
		},
		"evos": [
			""
		],
		"gen": 2,
		"name": "Kuwaguard",
		"types": [
			"Bug",
			"Flying"
		]
	},
	tonquito: {
		num: -86,
		eggGroups: ["Bug"],
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 50,
			"def": 45,
			"hp": 60,
			"spa": 95,
			"spd": 90,
			"spe": 105
		},
		"evos": [
			""
		],
		"gen": 2,
		"name": "Tonquito",
		"types": [
			"Bug",
			"Flying"
		]
	},
	molambino: {
		num: -87,
		eggGroups: ["Water 2"],
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 35,
			"def": 65,
			"hp": 70,
			"spa": 65,
			"spd": 70,
			"spe": 35
		},
		"evos": [
			"Luanbo"
		],
		"gen": 2,
		"name": "Molambino",
		"types": [
			"Water",
			"Fairy"
		]
	},
	luanbo: {
		num: -88,
		eggGroups: ["Water 2"],
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 45,
			"def": 75,
			"hp": 95,
			"spa": 75,
			"spd": 95,
			"spe": 45
		},
		"evos": [
			"Granbo"
		],
		prevo: "Molambino",
		"gen": 2,
		"name": "Luanbo",
		"types": [
			"Water",
			"Fairy"
		]
	},
	granbo: {
		num: -89,
		eggGroups: ["Water 2"],
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 65,
			"def": 85,
			"hp": 120,
			"spa": 85,
			"spd": 120,
			"spe": 45
		},
		"evos": [
			""
		],
		prevo: "Luanbo",
		"gen": 2,
		"name": "Granbo",
		"types": [
			"Water",
			"Fairy"
		]
	},
	angore: {
		num: -90,
		eggGroups: ["Water 2"],
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 110,
			"def": 60,
			"hp": 90,
			"spa": 55,
			"spd": 60,
			"spe": 110
		},
		"evos": [
			""
		],
		"gen": 2,
		"name": "Angore",
		"types": [
			"Water",
			"Steel"
		]
	},
	eucla: {
		num: -91,
		eggGroups: ["Field"],
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 105,
			"def": 65,
			"hp": 75,
			"spa": 35,
			"spd": 55,
			"spe": 45
		},
		"evos": [
			""
		],
		"gen": 2,
		"name": "Eucla",
		"types": [
			"Normal",
			"Grass"
		]
	},
	kiwooked: {
		num: -92,
		eggGroups: ["Flying"],
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 95,
			"def": 40,
			"hp": 50,
			"spa": 45,
			"spd": 60,
			"spe": 105
		},
		"evos": [
			""
		],
		"gen": 2,
		"name": "Kiwooked",
		"types": [
			"Ground",
			"Flying"
		]
	},
	cyclorp: {
		num: -93,
		eggGroups: ["Bug"],
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 95,
			"def": 80,
			"hp": 75,
			"spa": 80,
			"spd": 70,
			"spe": 70
		},
		"evos": [
			""
		],
		"gen": 2,
		"name": "Cyclorp",
		"types": [
			"Bug",
			"Dark"
		]
	},
	kitsen: {
		num: -94,
		eggGroups: ["Amorphous"],
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 90,
			"def": 50,
			"hp": 50,
			"spa": 80,
			"spd": 60,
			"spe": 100
		},
		"evos": [
			""
		],
		"gen": 2,
		"name": "Kitsen",
		"types": [
			"Ghost",
			"Flying"
		]
	},
	wispirit: {
		num: -95,
		eggGroups: ["Amorphous"],
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 30,
			"def": 45,
			"hp": 75,
			"spa": 105,
			"spd": 60,
			"spe": 99
		},
		"evos": [
			""
		],
		"gen": 2,
		"name": "Wispirit",
		"types": [
			"Ghost",
			"Fire"
		]
	},
	coatl: {
		num: -96,
		eggGroups: ["Dragon"],
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 65,
			"def": 60,
			"hp": 60,
			"spa": 90,
			"spd": 70,
			"spe": 90
		},
		"evos": [
			""
		],
		"gen": 2,
		"name": "Coatl",
		"types": [
			"Dragon"
		]
	},
	mimear: {
		num: -97,
		eggGroups: ["Fairy"],
		genderRatio: {M: 0.25, F: 0.75},
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 70,
			"def": 75,
			"hp": 65,
			"spa": 95,
			"spd": 80,
			"spe": 100
		},
		"evos": [
			""
		],
		"gen": 2,
		"name": "Mimear",
		"types": [
			"Fairy"
		]
	},
	inoshika: {
		num: -98,
		eggGroups: ["Field"],
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 100,
			"def": 80,
			"hp": 95,
			"spa": 70,
			"spd": 60,
			"spe": 55
		},
		"evos": [
			""
		],
		"gen": 2,
		"name": "Inoshika",
		"types": [
			"Normal",
			"Rock"
		]
	},
	ruddernaut: {
		num: -99,
		eggGroups: ["Water 1", "Monster"],
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 80,
			"def": 85,
			"hp": 130,
			"spa": 95,
			"spd": 60,
			"spe": 85
		},
		"evos": [
			""
		],
		"gen": 2,
		"name": "Ruddernaut",
		"types": [
			"Water",
			"Psychic"
		]
	},
	xylodon: {
		num: -100,
		eggGroups: ["Monster"],
		genderRatio: {M: 0.875, F: 0.125},
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 95,
			"def": 90,
			"hp": 65,
			"spa": 55,
			"spd": 50,
			"spe": 20
		},
		"evos": [
			"Xylofin"
		],
		"gen": 2,
		"name": "Xylodon",
		"types": [
			"Rock"
		]
	},
	xylofin: {
		num: -101,
		eggGroups: ["Monster"],
		genderRatio: {M: 0.875, F: 0.125},
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 115,
			"def": 110,
			"hp": 85,
			"spa": 85,
			"spd": 70,
			"spe": 50
		},
		"evos": [
			""
		],
		prevo: "Xylodon",
		"gen": 2,
		"name": "Xylofin",
		"types": [
			"Rock",
			"Steel"
		]
	},
	dokuroar: {
		num: -112,
		eggGroups: ["Mineral"],
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 123,
			"def": 110,
			"hp": 87,
			"spa": 65,
			"spd": 65,
			"spe": 65
		},
		"evos": [
			""
		],
		"gen": 2,
		"name": "Dokuroar",
		"types": [
			"Ghost",
			"Rock"
		]
	},
	qatu: {
		num: -113,
		eggGroups: ["Flying"],
		abilities: [""],
		weightkg: 1,
		"baseStats": {
			"atk": 60,
			"def": 55,
			"hp": 50,
			"spa": 80,
			"spd": 55,
			"spe": 80
		},
		"evos": [
			"Xatu"
		],
		prevo: "Natu",
		"gen": 2,
		"name": "Qatu",
		"types": [
			"Psychic",
			"Flying"
		]
	}
};
