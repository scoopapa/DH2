export const Items: import('../../../sim/dex-items').ModdedItemDataTable = {
	abomasite: {
		name: "Abomasite",
		spritenum: 575,
		megaStone: "Abomasnow-Mega",
		megaEvolves: "Abomasnow",
		itemUser: ["Abomasnow"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 674,
		gen: 6,
		isNonstandard: null,
	},
	absolite: {
		name: "Absolite",
		spritenum: 576,
		megaStone: "Absol-Mega",
		megaEvolves: "Absol",
		itemUser: ["Absol"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 677,
		gen: 6,
		isNonstandard: null,
	},
	aerodactylite: {
		name: "Aerodactylite",
		spritenum: 577,
		megaStone: "Aerodactyl-Mega",
		megaEvolves: "Aerodactyl",
		itemUser: ["Aerodactyl"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 672,
		gen: 6,
		isNonstandard: null,
	},
	aggronite: {
		name: "Aggronite",
		spritenum: 578,
		megaStone: "Aggron-Mega",
		megaEvolves: "Aggron",
		itemUser: ["Aggron"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 667,
		gen: 6,
		isNonstandard: null,
	},
	alakazite: {
		name: "Alakazite",
		spritenum: 579,
		megaStone: "Alakazam-Mega",
		megaEvolves: "Alakazam",
		itemUser: ["Alakazam"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 679,
		gen: 6,
		isNonstandard: null,
	},
	altarianite: {
		name: "Altarianite",
		spritenum: 615,
		megaStone: "Altaria-Mega",
		megaEvolves: "Altaria",
		itemUser: ["Altaria"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 755,
		gen: 6,
		isNonstandard: null,
	},
	ampharosite: {
		name: "Ampharosite",
		spritenum: 580,
		megaStone: "Ampharos-Mega",
		megaEvolves: "Ampharos",
		itemUser: ["Ampharos"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 658,
		gen: 6,
		isNonstandard: null,
	},
	audinite: {
		name: "Audinite",
		spritenum: 617,
		megaStone: "Audino-Mega",
		megaEvolves: "Audino",
		itemUser: ["Audino"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 757,
		gen: 6,
		isNonstandard: null,
	},
	banettite: {
		name: "Banettite",
		spritenum: 582,
		megaStone: "Banette-Mega",
		megaEvolves: "Banette",
		itemUser: ["Banette"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 668,
		gen: 6,
		isNonstandard: null,
	},
	beedrillite: {
		name: "Beedrillite",
		spritenum: 628,
		megaStone: "Beedrill-Mega",
		megaEvolves: "Beedrill",
		itemUser: ["Beedrill"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 770,
		gen: 6,
		isNonstandard: null,
	},
	blastoisinite: {
		name: "Blastoisinite",
		spritenum: 583,
		megaStone: "Blastoise-Mega",
		megaEvolves: "Blastoise",
		itemUser: ["Blastoise"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 661,
		gen: 6,
		isNonstandard: null,
	},
	cameruptite: {
		name: "Cameruptite",
		spritenum: 625,
		megaStone: "Camerupt-Mega",
		megaEvolves: "Camerupt",
		itemUser: ["Camerupt"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 767,
		gen: 6,
		isNonstandard: null,
	},
	charizarditex: {
		name: "Charizardite X",
		spritenum: 585,
		megaStone: "Charizard-Mega-X",
		megaEvolves: "Charizard",
		itemUser: ["Charizard"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 660,
		gen: 6,
		isNonstandard: null,
	},
	charizarditey: {
		name: "Charizardite Y",
		spritenum: 586,
		megaStone: "Charizard-Mega-Y",
		megaEvolves: "Charizard",
		itemUser: ["Charizard"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 678,
		gen: 6,
		isNonstandard: null,
	},
	diancite: {
		name: "Diancite",
		spritenum: 624,
		megaStone: "Diancie-Mega",
		megaEvolves: "Diancie",
		itemUser: ["Diancie"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 764,
		gen: 6,
		isNonstandard: null,
	},
	galladite: {
		name: "Galladite",
		spritenum: 616,
		megaStone: "Gallade-Mega",
		megaEvolves: "Gallade",
		itemUser: ["Gallade"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 756,
		gen: 6,
		isNonstandard: null,
	},
	garchompite: {
		name: "Garchompite",
		spritenum: 589,
		megaStone: "Garchomp-Mega",
		megaEvolves: "Garchomp",
		itemUser: ["Garchomp"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 683,
		gen: 6,
		isNonstandard: null,
	},
	gardevoirite: {
		name: "Gardevoirite",
		spritenum: 587,
		megaStone: "Gardevoir-Mega",
		megaEvolves: "Gardevoir",
		itemUser: ["Gardevoir"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 657,
		gen: 6,
		isNonstandard: null,
	},
	gengarite: {
		name: "Gengarite",
		spritenum: 588,
		megaStone: "Gengar-Mega",
		megaEvolves: "Gengar",
		itemUser: ["Gengar"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 656,
		gen: 6,
		isNonstandard: null,
	},
	glalitite: {
		name: "Glalitite",
		spritenum: 623,
		megaStone: "Glalie-Mega",
		megaEvolves: "Glalie",
		itemUser: ["Glalie"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 763,
		gen: 6,
		isNonstandard: null,
	},
	gyaradosite: {
		name: "Gyaradosite",
		spritenum: 589,
		megaStone: "Gyarados-Mega",
		megaEvolves: "Gyarados",
		itemUser: ["Gyarados"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 676,
		gen: 6,
		isNonstandard: null,
	},
	heracronite: {
		name: "Heracronite",
		spritenum: 590,
		megaStone: "Heracross-Mega",
		megaEvolves: "Heracross",
		itemUser: ["Heracross"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 680,
		gen: 6,
		isNonstandard: null,
	},
	houndoominite: {
		name: "Houndoominite",
		spritenum: 591,
		megaStone: "Houndoom-Mega",
		megaEvolves: "Houndoom",
		itemUser: ["Houndoom"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 666,
		gen: 6,
		isNonstandard: null,
	},
	kangaskhanite: {
		name: "Kangaskhanite",
		spritenum: 592,
		megaStone: "Kangaskhan-Mega",
		megaEvolves: "Kangaskhan",
		itemUser: ["Kangaskhan"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 675,
		gen: 6,
		isNonstandard: null,
	},
	lopunnite: {
		name: "Lopunnite",
		spritenum: 626,
		megaStone: "Lopunny-Mega",
		megaEvolves: "Lopunny",
		itemUser: ["Lopunny"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 768,
		gen: 6,
		isNonstandard: null,
	},
	lucarionite: {
		name: "Lucarionite",
		spritenum: 594,
		megaStone: "Lucario-Mega",
		megaEvolves: "Lucario",
		itemUser: ["Lucario"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 673,
		gen: 6,
		isNonstandard: null,
	},
	manectite: {
		name: "Manectite",
		spritenum: 596,
		megaStone: "Manectric-Mega",
		megaEvolves: "Manectric",
		itemUser: ["Manectric"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 682,
		gen: 6,
		isNonstandard: null,
	},
	mawilite: {
		name: "Mawilite",
		spritenum: 598,
		megaStone: "Mawile-Mega",
		megaEvolves: "Mawile",
		itemUser: ["Mawile"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 681,
		gen: 6,
		isNonstandard: null,
	},
	medichamite: {
		name: "Medichamite",
		spritenum: 599,
		megaStone: "Medicham-Mega",
		megaEvolves: "Medicham",
		itemUser: ["Medicham"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 665,
		gen: 6,
		isNonstandard: null,
	},
	metagrossite: {
		name: "Metagrossite",
		spritenum: 618,
		megaStone: "Metagross-Mega",
		megaEvolves: "Metagross",
		itemUser: ["Metagross"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 758,
		gen: 6,
		isNonstandard: null,
	},
	mewtwonitex: {
		name: "Mewtwonite X",
		spritenum: 600,
		megaStone: "Mewtwo-Mega-X",
		megaEvolves: "Mewtwo",
		itemUser: ["Mewtwo"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 662,
		gen: 6,
		isNonstandard: null,
	},
	mewtwonitey: {
		name: "Mewtwonite Y",
		spritenum: 601,
		megaStone: "Mewtwo-Mega-Y",
		megaEvolves: "Mewtwo",
		itemUser: ["Mewtwo"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 663,
		gen: 6,
		isNonstandard: null,
	},
	pidgeotite: {
		name: "Pidgeotite",
		spritenum: 622,
		megaStone: "Pidgeot-Mega",
		megaEvolves: "Pidgeot",
		itemUser: ["Pidgeot"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 762,
		gen: 6,
		isNonstandard: null,
	},
	pinsirite: {
		name: "Pinsirite",
		spritenum: 602,
		megaStone: "Pinsir-Mega",
		megaEvolves: "Pinsir",
		itemUser: ["Pinsir"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 671,
		gen: 6,
		isNonstandard: null,
	},
	sablenite: {
		name: "Sablenite",
		spritenum: 614,
		megaStone: "Sableye-Mega",
		megaEvolves: "Sableye",
		itemUser: ["Sableye"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 754,
		gen: 6,
		isNonstandard: null,
	},
	salamencite: {
		name: "Salamencite",
		spritenum: 627,
		megaStone: "Salamence-Mega",
		megaEvolves: "Salamence",
		itemUser: ["Salamence"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 769,
		gen: 6,
		isNonstandard: null,
	},
	scizorite: {
		name: "Scizorite",
		spritenum: 605,
		megaStone: "Scizor-Mega",
		megaEvolves: "Scizor",
		itemUser: ["Scizor"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 670,
		gen: 6,
		isNonstandard: null,
	},
	sharpedonite: {
		name: "Sharpedonite",
		spritenum: 619,
		megaStone: "Sharpedo-Mega",
		megaEvolves: "Sharpedo",
		itemUser: ["Sharpedo"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 759,
		gen: 6,
		isNonstandard: null,
	},
	slowbronite: {
		name: "Slowbronite",
		spritenum: 620,
		megaStone: "Slowbro-Mega",
		megaEvolves: "Slowbro",
		itemUser: ["Slowbro"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 760,
		gen: 6,
		isNonstandard: null,
	},	
  steelixite: {
		name: "Steelixite",
		spritenum: 621,
		megaStone: "Steelix-Mega",
		megaEvolves: "Steelix",
		itemUser: ["Steelix"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 761,
		gen: 6,
		isNonstandard: null,
	},
	tyranitarite: {
		name: "Tyranitarite",
		spritenum: 607,
		megaStone: "Tyranitar-Mega",
		megaEvolves: "Tyranitar",
		itemUser: ["Tyranitar"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 669,
		gen: 6,
		isNonstandard: null,
	},
	venusaurite: {
		name: "Venusaurite",
		spritenum: 608,
		megaStone: "Venusaur-Mega",
		megaEvolves: "Venusaur",
		itemUser: ["Venusaur"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 659,
		gen: 6,
		isNonstandard: null,
	},
	barbaracite: {
		name: "Barbaracite",
		spritenum: 0,
		megaStone: "Barbaracle-Mega",
		megaEvolves: "Barbaracle",
		itemUser: ["Barbaracle"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 2581,
		gen: 9,
		isNonstandard: null,
	},
	chandelurite: {
		name: "Chandelurite",
		spritenum: 0,
		megaStone: "Chandelure-Mega",
		megaEvolves: "Chandelure",
		itemUser: ["Chandelure"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 2574,
		gen: 9,
		isNonstandard: null,
	},
	chesnaughtite: {
		name: "Chesnaughtite",
		spritenum: 0,
		megaStone: "Chesnaught-Mega",
		megaEvolves: "Chesnaught",
		itemUser: ["Chesnaught"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 2575,
		gen: 9,
		isNonstandard: null,
	},
	clefablite: {
		name: "Clefablite",
		spritenum: 0,
		megaStone: "Clefable-Mega",
		megaEvolves: "Clefable",
		itemUser: ["Clefable"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 2559,
		gen: 9,
		isNonstandard: null,
	},
	delphoxite: {
		name: "Delphoxite",
		spritenum: 0,
		megaStone: "Delphox-Mega",
		megaEvolves: "Delphox",
		itemUser: ["Delphox"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 2576,
		gen: 9,
		isNonstandard: null,
	},
	dragalgite: {
		name: "Dragalgite",
		spritenum: 0,
		megaStone: "Dragalge-Mega",
		megaEvolves: "Dragalge",
		itemUser: ["Dragalge"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 2582,
		gen: 9,
		isNonstandard: null,
	},
	dragoninite: {
		name: "Dragoninite",
		spritenum: 0,
		megaStone: "Dragonite-Mega",
		megaEvolves: "Dragonite",
		itemUser: ["Dragonite"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 2562,
		gen: 9,
		isNonstandard: null,
	},
	drampanite: {
		name: "Drampanite",
		spritenum: 0,
		megaStone: "Drampa-Mega",
		megaEvolves: "Drampa",
		itemUser: ["Drampa"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 2585,
		gen: 9,
		isNonstandard: null,
	},
	eelektrossite: {
		name: "Eelektrossite",
		spritenum: 0,
		megaStone: "Eelektross-Mega",
		megaEvolves: "Eelektross",
		itemUser: ["Eelektross"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 2573,
		gen: 9,
		isNonstandard: null,
	},
	emboarite: {
		name: "Emboarite",
		spritenum: 0,
		megaStone: "Emboar-Mega",
		megaEvolves: "Emboar",
		itemUser: ["Emboar"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 2569,
		gen: 9,
		isNonstandard: null,
	},
	excadrite: {
		name: "Excadrite",
		spritenum: 0,
		megaStone: "Excadrill-Mega",
		megaEvolves: "Excadrill",
		itemUser: ["Excadrill"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 2570,
		gen: 9,
		isNonstandard: null,
	},
	falinksite: {
		name: "Falinksite",
		spritenum: 0,
		megaStone: "Falinks-Mega",
		megaEvolves: "Falinks",
		itemUser: ["Falinks"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 2586,
		gen: 9,
		isNonstandard: null,
	},
	feraligite: {
		name: "Feraligite",
		spritenum: 0,
		megaStone: "Feraligatr-Mega",
		megaEvolves: "Feraligatr",
		itemUser: ["Feraligatr"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 2564,
		gen: 9,
		isNonstandard: null,
	},
	floettite: {
		name: "Floettite",
		spritenum: 0,
		megaStone: "Floette-Mega",
		megaEvolves: "Floette-Eternal",
		itemUser: ["Floette-Eternal"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.name) return false;
			return true;
		},
		num: 2579,
		gen: 9,
		isNonstandard: null,
	},
	froslassite: {
		name: "Froslassite",
		spritenum: 0,
		megaStone: "Froslass-Mega",
		megaEvolves: "Froslass",
		itemUser: ["Froslass"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 2566,
		gen: 9,
		isNonstandard: null,
	},
	greninjite: {
		name: "Greninjite",
		spritenum: 0,
		megaStone: "Greninja-Mega",
		megaEvolves: "Greninja",
		itemUser: ["Greninja"],
		onTakeItem(item, source) {
			// TODO: Figure out if this works on Greninja-Bond
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 2577,
		gen: 9,
		isNonstandard: null,
	},
	hawluchanite: {
		name: "Hawluchanite",
		spritenum: 0,
		megaStone: "Hawlucha-Mega",
		megaEvolves: "Hawlucha",
		itemUser: ["Hawlucha"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 2583,
		gen: 9,
		isNonstandard: null,
	},
	malamarite: {
		name: "Malamarite",
		spritenum: 0,
		megaStone: "Malamar-Mega",
		megaEvolves: "Malamar",
		itemUser: ["Malamar"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 2580,
		gen: 9,
		isNonstandard: null,
	},
	meganiumite: {
		name: "Meganiumite",
		spritenum: 0,
		megaStone: "Meganium-Mega",
		megaEvolves: "Meganium",
		itemUser: ["Meganium"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 2563,
		gen: 9,
		isNonstandard: null,
	},
	pyroarite: {
		name: "Pyroarite",
		spritenum: 0,
		megaStone: "Pyroar-Mega",
		megaEvolves: "Pyroar",
		itemUser: ["Pyroar"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 2578,
		gen: 9,
		isNonstandard: null,
	},
	scolipite: {
		name: "Scolipite",
		spritenum: 0,
		megaStone: "Scolipede-Mega",
		megaEvolves: "Scolipede",
		itemUser: ["Scolipede"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 2571,
		gen: 9,
		isNonstandard: null,
	},
	scraftinite: {
		name: "Scraftinite",
		spritenum: 0,
		megaStone: "Scrafty-Mega",
		megaEvolves: "Scrafty",
		itemUser: ["Scrafty"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 2572,
		gen: 9,
		isNonstandard: null,
	},
	skarmorite: {
		name: "Skarmorite",
		spritenum: 0,
		megaStone: "Skarmory-Mega",
		megaEvolves: "Skarmory",
		itemUser: ["Skarmory"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 2565,
		gen: 9,
		isNonstandard: null,
	},
	starminite: {
		name: "Starminite",
		spritenum: 0,
		megaStone: "Starmie-Mega",
		megaEvolves: "Starmie",
		itemUser: ["Starmie"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 2561,
		gen: 9,
		isNonstandard: null,
	},
	victreebelite: {
		name: "Victreebelite",
		spritenum: 0,
		megaStone: "Victreebel-Mega",
		megaEvolves: "Victreebel",
		itemUser: ["Victreebel"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 2560,
		gen: 9,
		isNonstandard: null,
	},
	zygardite: {
		name: "Zygardite",
		spritenum: 0,
		megaStone: "Zygarde-Mega",
		megaEvolves: "Zygarde-Complete",
		itemUser: ["Zygarde-Complete"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 2584,
		gen: 9,
		isNonstandard: null,
	},
	// dlc time
	raichunitex: {
		name: "Raichunite X",
		spritenum: 0,
		megaStone: "Raichu-Mega-X",
		megaEvolves: "Raichu",
		itemUser: ["Raichu"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.name ||
				item.megaStone === source.baseSpecies.name) return false;
			return true;
		},
		num: 2585,
		gen: 9,
		isNonstandard: null,
	},
	raichunitey: {
		name: "Raichunite Y",
		spritenum: 0,
		megaStone: "Raichu-Mega-Y",
		megaEvolves: "Raichu",
		itemUser: ["Raichu"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.name ||
				item.megaStone === source.baseSpecies.name) return false;
			return true;
		},
		num: 2586,
		gen: 9,
		isNonstandard: null,
	},
	chimechite: {
		name: "Chimechite",
		spritenum: 0,
		megaStone: "Chimecho-Mega",
		megaEvolves: "Chimecho",
		itemUser: ["Chimecho"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 2587,
		gen: 9,
		isNonstandard: null,
	},
	chilldrive: {
		inherit: true,
		isNonstandard: null,
	},
	burndrive: {
		inherit: true,
		isNonstandard: null,
	},
	shockdrive: {
		inherit: true,
		isNonstandard: null,
	},
	dousedrive: {
		inherit: true,
		isNonstandard: null,
	},
	absolitez: {
		name: "Absolite Z",
		spritenum: 576,
		megaStone: "Absol-Mega-Z",
		megaEvolves: "Absol",
		itemUser: ["Absol"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 2588,
		gen: 9,
		isNonstandard: null,
	},
	staraptite: {
		name: "Staraptite",
		spritenum: 0,
		megaStone: "Staraptor-Mega",
		megaEvolves: "Staraptor",
		itemUser: ["Staraptor"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 2589,
		gen: 9,
		isNonstandard: null,
	},
	garchompitez: {
		name: "Garchompite Z",
		spritenum: 573,
		megaStone: "Garchomp-Mega-Z",
		megaEvolves: "Garchomp",
		itemUser: ["Garchomp"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 2590,
		gen: 9,
		isNonstandard: null,
	},
	lucarionitez: {
		name: "Lucarionite Z",
		spritenum: 594,
		megaStone: "Lucario-Mega-Z",
		megaEvolves: "Lucario",
		itemUser: ["Lucario"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 2591,
		gen: 9,
		isNonstandard: null,
	},
	heatranite: {
		name: "Heatranite",
		spritenum: 0,
		megaStone: "Heatran-Mega",
		megaEvolves: "Heatran",
		itemUser: ["Heatran"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 2592,
		gen: 9,
		isNonstandard: null,
	},
	darkranite: {
		name: "Darkranite",
		spritenum: 0,
		megaStone: "Darkrai-Mega",
		megaEvolves: "Darkrai",
		itemUser: ["Darkrai"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 2593,
		gen: 9,
		isNonstandard: null,
	},
	golurkite: {
		name: "Golurkite",
		spritenum: 0,
		megaStone: "Golurk-Mega",
		megaEvolves: "Golurk",
		itemUser: ["Golurk"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 2594,
		gen: 9,
		isNonstandard: null,
	},
	meowsticite: {
		name: "Meowsticite",
		spritenum: 0,
		megaStone: ["Meowstic-M-Mega", "Meowstic-F-Mega"],
		megaEvolves: ["Meowstic", "Meowstic-F"],
		itemUser: ["Meowstic", "Meowstic-F"],
		onTakeItem(item, source) {
			if (item.megaEvolves!.includes(source.baseSpecies.baseSpecies)) return false;
			return true;
		},
		num: 2594,
		gen: 9,
		isNonstandard: null,
	},
	crabominite: {
		name: "Crabominite",
		spritenum: 0,
		megaStone: "Crabominable-Mega",
		megaEvolves: "Crabominable",
		itemUser: ["Crabominable"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 2595,
		gen: 9,
		isNonstandard: null,
	},
	golisopite: {
		name: "Golisopite",
		spritenum: 0,
		megaStone: "Golisopod-Mega",
		megaEvolves: "Golisopod",
		itemUser: ["Golisopod"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 2596,
		gen: 9,
		isNonstandard: null,
	},
	magearnite: {
		name: "Magearnite",
		spritenum: 0,
		megaStone: ["Magearna-Mega", "Magearna-Original-Mega"],
		megaEvolves: ["Magearna", "Magearna-Original"],
		itemUser: ["Magearna", "Magearna-Original"],
		onTakeItem(item, source) {
			if (item.megaEvolves!.includes(source.baseSpecies.baseSpecies)) return false;
			return true;
		},
		num: 2597,
		gen: 9,
		isNonstandard: null,
	},
	zeraorite: {
		name: "Zeraorite",
		spritenum: 0,
		megaStone: "Zeraora-Mega",
		megaEvolves: "Zeraora",
		itemUser: ["Zeraora"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 2598,
		gen: 9,
		isNonstandard: null,
	},
	scovillainite: {
		name: "Scovillainite",
		spritenum: 0,
		megaStone: "Scovillain-Mega",
		megaEvolves: "Scovillain",
		itemUser: ["Scovillain"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 2599,
		gen: 9,
		isNonstandard: null,
	},
	glimmoranite: {
		name: "Glimmoranite",
		spritenum: 0,
		megaStone: "Glimmora-Mega",
		megaEvolves: "Glimmora",
		itemUser: ["Glimmora"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 2600,
		gen: 9,
		isNonstandard: null,
	},
	tatsugirinite: {
		name: "Tatsugirinite",
		spritenum: 0,
		megaStone: ["Tatsugiri-Mega"],
		megaEvolves: ["Tatsugiri"/*, "Tatsugiri-Droopy", "Tatsugiri-Stretchy"*/],
		itemUser: ["Tatsugiri"/*, "Tatsugiri-Droopy", "Tatsugiri-Stretchy"*/],
		onTakeItem(item, source) {
			if (item.megaEvolves!.includes(source.baseSpecies.baseSpecies)) return false;
			return true;
		},
		num: 2601,
		gen: 9,
		isNonstandard: null,
	},
	baxcalibrite: {
		name: "Baxcalibrite",
		spritenum: 0,
		megaStone: "Baxcalibur-Mega",
		megaEvolves: "Baxcalibur",
		itemUser: ["Baxcalibur"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 2601,
		gen: 9,
		isNonstandard: null,
	},
};
