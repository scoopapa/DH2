export const Items: {[k: string]: ModdedItemData} = {
	abomasite: {
		name: "Abomasite",
		spritenum: 575,
		megaStone: "Abomasnow-Mega",
		altMegaStone: ["Abomasnow-Evergreen-Mega"],
		megaEvolves: "Abomasnow",
		megaExcludes: [],
		itemUser: ["Abomasnow"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies && !item.megaExcludes.includes(source.name)) return false;
			return true;
		},
		num: 674,
		gen: 6,
		isNonstandard: "Past",
	},
	absolite: {
		name: "Absolite",
		spritenum: 576,
		megaStone: "Absol-Mega",
		altMegaStone: ["Absol-Jaded-Mega"],
		megaEvolves: "Absol",
		megaExcludes: [],
		itemUser: ["Absol"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies && !item.megaExcludes.includes(source.name)) return false;
			return true;
		},
		num: 677,
		gen: 6,
		isNonstandard: "Past",
	},
	aerodactylite: {
		name: "Aerodactylite",
		spritenum: 577,
		megaStone: "Aerodactyl-Mega",
		altMegaStone: [],
		megaEvolves: "Aerodactyl",
		megaExcludes: [],
		itemUser: ["Aerodactyl"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies && !item.megaExcludes.includes(source.name)) return false;
			return true;
		},
		num: 672,
		gen: 6,
		isNonstandard: "Past",
	},
	aggronite: {
		name: "Aggronite",
		spritenum: 578,
		megaStone: "Aggron-Mega",
		altMegaStone: [],
		megaEvolves: "Aggron",
		megaExcludes: [],
		itemUser: ["Aggron"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies && !item.megaExcludes.includes(source.name)) return false;
			return true;
		},
		num: 667,
		gen: 6,
		isNonstandard: "Past",
	},
	alakazite: {
		name: "Alakazite",
		spritenum: 579,
		megaStone: "Alakazam-Mega",
		altMegaStone: [],
		megaEvolves: "Alakazam",
		megaExcludes: [],
		itemUser: ["Alakazam"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies && !item.megaExcludes.includes(source.name)) return false;
			return true;
		},
		num: 679,
		gen: 6,
		isNonstandard: "Past",
	},
	altarianite: {
		name: "Altarianite",
		spritenum: 615,
		megaStone: "Altaria-Mega",
		altMegaStone: ["Altaria-Predator-Mega"],
		megaEvolves: "Altaria",
		megaExcludes: [],
		itemUser: ["Altaria"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies && !item.megaExcludes.includes(source.name)) return false;
			return true;
		},
		num: 755,
		gen: 6,
		isNonstandard: "Past",
	},
	ampharosite: {
		name: "Ampharosite",
		spritenum: 580,
		megaStone: "Ampharos-Mega",
		altMegaStone: [],
		megaEvolves: "Ampharos",
		megaExcludes: [],
		itemUser: ["Ampharos"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies && !item.megaExcludes.includes(source.name)) return false;
			return true;
		},
		num: 658,
		gen: 6,
		isNonstandard: "Past",
	},
	audinite: {
		name: "Audinite",
		spritenum: 617,
		megaStone: "Audino-Mega",
		altMegaStone: [],
		megaEvolves: "Audino",
		megaExcludes: [],
		itemUser: ["Audino"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies && !item.megaExcludes.includes(source.name)) return false;
			return true;
		},
		num: 757,
		gen: 6,
		isNonstandard: "Past",
	},
	banettite: {
		name: "Banettite",
		spritenum: 582,
		megaStone: "Banette-Mega",
		altMegaStone: ["Banette-Blademaster-Mega"],
		megaEvolves: "Banette",
		megaExcludes: [],
		itemUser: ["Banette"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies && !item.megaExcludes.includes(source.name)) return false;
			return true;
		},
		num: 668,
		gen: 6,
		isNonstandard: "Past",
	},
	beedrillite: {
		name: "Beedrillite",
		spritenum: 628,
		megaStone: "Beedrill-Mega",
		altMegaStone: [],
		megaEvolves: "Beedrill",
		megaExcludes: [],
		itemUser: ["Beedrill"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies && !item.megaExcludes.includes(source.name)) return false;
			return true;
		},
		num: 770,
		gen: 6,
		isNonstandard: "Past",
	},
	blastoisinite: {
		name: "Blastoisinite",
		spritenum: 583,
		megaStone: "Blastoise-Mega",
		altMegaStone: [],
		megaEvolves: "Blastoise",
		megaExcludes: [],
		itemUser: ["Blastoise"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies && !item.megaExcludes.includes(source.name)) return false;
			return true;
		},
		num: 661,
		gen: 6,
		isNonstandard: "Past",
	},
	blazikenite: {
		name: "Blazikenite",
		spritenum: 584,
		megaStone: "Blaziken-Mega",
		altMegaStone: [],
		megaEvolves: "Blaziken",
		megaExcludes: [],
		itemUser: ["Blaziken"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies && !item.megaExcludes.includes(source.name)) return false;
			return true;
		},
		num: 664,
		gen: 6,
		isNonstandard: "Past",
	},
	cameruptite: {
		name: "Cameruptite",
		spritenum: 625,
		megaStone: "Camerupt-Mega",
		altMegaStone: ["Camerupt-Pumpback-Mega"],
		megaEvolves: "Camerupt",
		megaExcludes: [],
		itemUser: ["Camerupt"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies && !item.megaExcludes.includes(source.name)) return false;
			return true;
		},
		num: 767,
		gen: 6,
		isNonstandard: "Past",
	},
	charizarditex: {
		name: "Charizardite X",
		spritenum: 585,
		megaStone: "Charizard-Mega-X",
		altMegaStone: [],
		megaEvolves: "Charizard",
		megaExcludes: [],
		itemUser: ["Charizard"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies && !item.megaExcludes.includes(source.name)) return false;
			return true;
		},
		num: 660,
		gen: 6,
		isNonstandard: "Past",
	},
	charizarditey: {
		name: "Charizardite Y",
		spritenum: 586,
		megaStone: "Charizard-Mega-Y",
		altMegaStone: [],
		megaEvolves: "Charizard",
		megaExcludes: [],
		itemUser: ["Charizard"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies && !item.megaExcludes.includes(source.name)) return false;
			return true;
		},
		num: 678,
		gen: 6,
		isNonstandard: "Past",
	},
	diancite: {
		name: "Diancite",
		spritenum: 624,
		megaStone: "Diancie-Mega",
		altMegaStone: [],
		megaEvolves: "Diancie",
		megaExcludes: [],
		itemUser: ["Diancie"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies && !item.megaExcludes.includes(source.name)) return false;
			return true;
		},
		num: 764,
		gen: 6,
		isNonstandard: "Past",
	},
	galladite: {
		name: "Galladite",
		spritenum: 616,
		megaStone: "Gallade-Mega",
		altMegaStone: [],
		megaEvolves: "Gallade",
		megaExcludes: [],
		itemUser: ["Gallade"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies && !item.megaExcludes.includes(source.name)) return false;
			return true;
		},
		num: 756,
		gen: 6,
		isNonstandard: "Past",
	},
	garchompite: {
		name: "Garchompite",
		spritenum: 589,
		megaStone: "Garchomp-Mega",
		altMegaStone: [],
		megaEvolves: "Garchomp",
		megaExcludes: [],
		itemUser: ["Garchomp"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies && !item.megaExcludes.includes(source.name)) return false;
			return true;
		},
		num: 683,
		gen: 6,
		isNonstandard: "Past",
	},
	gardevoirite: {
		name: "Gardevoirite",
		spritenum: 587,
		megaStone: "Gardevoir-Mega",
		altMegaStone: ["Gardevoir-Genius-Mega"],
		megaEvolves: "Gardevoir",
		megaExcludes: [],
		itemUser: ["Gardevoir"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies && !item.megaExcludes.includes(source.name)) return false;
			return true;
		},
		num: 657,
		gen: 6,
		isNonstandard: "Past",
	},
	gengarite: {
		name: "Gengarite",
		spritenum: 588,
		megaStone: "Gengar-Mega",
		altMegaStone: [],
		megaEvolves: "Gengar",
		megaExcludes: [],
		itemUser: ["Gengar"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies && !item.megaExcludes.includes(source.name)) return false;
			return true;
		},
		num: 656,
		gen: 6,
		isNonstandard: "Past",
	},
	glalitite: {
		name: "Glalitite",
		spritenum: 623,
		megaStone: "Glalie-Mega",
		altMegaStone: ["Glalie-Seaglass-Mega"],
		megaEvolves: "Glalie",
		megaExcludes: [],
		itemUser: ["Glalie"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies && !item.megaExcludes.includes(source.name)) return false;
			return true;
		},
		num: 763,
		gen: 6,
		isNonstandard: "Past",
	},
	gyaradosite: {
		name: "Gyaradosite",
		spritenum: 589,
		megaStone: "Gyarados-Mega",
		altMegaStone: [],
		megaEvolves: "Gyarados",
		megaExcludes: [],
		itemUser: ["Gyarados"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies && !item.megaExcludes.includes(source.name)) return false;
			return true;
		},
		num: 676,
		gen: 6,
		isNonstandard: "Past",
	},
	heracronite: {
		name: "Heracronite",
		spritenum: 590,
		megaStone: "Heracross-Mega",
		altMegaStone: [],
		megaEvolves: "Heracross",
		megaExcludes: ["Heracross-Dustdevil"],
		itemUser: ["Heracross"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies && !item.megaExcludes.includes(source.name)) return false;
			return true;
		},
		num: 680,
		gen: 6,
		isNonstandard: "Past",
	},
	houndoominite: {
		name: "Houndoominite",
		spritenum: 591,
		megaStone: "Houndoom-Mega",
		altMegaStone: [],
		megaEvolves: "Houndoom",
		megaExcludes: [],
		itemUser: ["Houndoom"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies && !item.megaExcludes.includes(source.name)) return false;
			return true;
		},
		num: 666,
		gen: 6,
		isNonstandard: "Past",
	},
	kangaskhanite: {
		name: "Kangaskhanite",
		spritenum: 592,
		megaStone: "Kangaskhan-Mega",
		altMegaStone: [],
		megaEvolves: "Kangaskhan",
		megaExcludes: [],
		itemUser: ["Kangaskhan"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies && !item.megaExcludes.includes(source.name)) return false;
			return true;
		},
		num: 675,
		gen: 6,
		isNonstandard: "Past",
	},
	latiasite: {
		name: "Latiasite",
		spritenum: 629,
		megaStone: "Latias-Mega",
		altMegaStone: [],
		megaEvolves: "Latias",
		megaExcludes: [],
		itemUser: ["Latias"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies && !item.megaExcludes.includes(source.name)) return false;
			return true;
		},
		num: 684,
		gen: 6,
		isNonstandard: "Past",
	},
	latiosite: {
		name: "Latiosite",
		spritenum: 630,
		megaStone: "Latios-Mega",
		altMegaStone: [],
		megaEvolves: "Latios",
		megaExcludes: [],
		itemUser: ["Latios"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies && !item.megaExcludes.includes(source.name)) return false;
			return true;
		},
		num: 685,
		gen: 6,
		isNonstandard: "Past",
	},
	lopunnite: {
		name: "Lopunnite",
		spritenum: 626,
		megaStone: "Lopunny-Mega",
		altMegaStone: ["Lopunny-Bara-Mega"],
		megaEvolves: "Lopunny",
		megaExcludes: [],
		itemUser: ["Lopunny"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies && !item.megaExcludes.includes(source.name)) return false;
			return true;
		},
		num: 768,
		gen: 6,
		isNonstandard: "Past",
	},
	lucarionite: {
		name: "Lucarionite",
		spritenum: 594,
		megaStone: "Lucario-Mega",
		altMegaStone: [],
		megaEvolves: "Lucario",
		megaExcludes: [],
		itemUser: ["Lucario"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies && !item.megaExcludes.includes(source.name)) return false;
			return true;
		},
		num: 673,
		gen: 6,
		isNonstandard: "Past",
	},
	manectite: {
		name: "Manectite",
		spritenum: 596,
		megaStone: "Manectric-Mega",
		altMegaStone: [],
		megaEvolves: "Manectric",
		megaExcludes: [],
		itemUser: ["Manectric"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies && !item.megaExcludes.includes(source.name)) return false;
			return true;
		},
		num: 682,
		gen: 6,
		isNonstandard: "Past",
	},
	mawilite: {
		name: "Mawilite",
		spritenum: 598,
		megaStone: "Mawile-Mega",
		altMegaStone: [],
		megaEvolves: "Mawile",
		megaExcludes: [],
		itemUser: ["Mawile"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies && !item.megaExcludes.includes(source.name)) return false;
			return true;
		},
		num: 681,
		gen: 6,
		isNonstandard: "Past",
	},
	medichamite: {
		name: "Medichamite",
		spritenum: 599,
		megaStone: "Medicham-Mega",
		altMegaStone: [],
		megaEvolves: "Medicham",
		megaExcludes: [],
		itemUser: ["Medicham"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies && !item.megaExcludes.includes(source.name)) return false;
			return true;
		},
		num: 665,
		gen: 6,
		isNonstandard: "Past",
	},
	metagrossite: {
		name: "Metagrossite",
		spritenum: 618,
		megaStone: "Metagross-Mega",
		altMegaStone: [],
		megaEvolves: "Metagross",
		megaExcludes: ["Metagross-BattleBot"],
		itemUser: ["Metagross"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies && !item.megaExcludes.includes(source.name)) return false;
			return true;
		},
		num: 758,
		gen: 6,
		isNonstandard: "Past",
	},
	mewtwonitex: {
		name: "Mewtwonite X",
		spritenum: 600,
		megaStone: "Mewtwo-Mega-X",
		altMegaStone: [],
		megaEvolves: "Mewtwo",
		megaExcludes: [],
		itemUser: ["Mewtwo"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies && !item.megaExcludes.includes(source.name)) return false;
			return true;
		},
		num: 662,
		gen: 6,
		isNonstandard: "Past",
	},
	mewtwonitey: {
		name: "Mewtwonite Y",
		spritenum: 601,
		megaStone: "Mewtwo-Mega-Y",
		altMegaStone: [],
		megaEvolves: "Mewtwo",
		megaExcludes: [],
		itemUser: ["Mewtwo"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies && !item.megaExcludes.includes(source.name)) return false;
			return true;
		},
		num: 663,
		gen: 6,
		isNonstandard: "Past",
	},
	pidgeotite: {
		name: "Pidgeotite",
		spritenum: 622,
		megaStone: "Pidgeot-Mega",
		altMegaStone: [],
		megaEvolves: "Pidgeot",
		megaExcludes: [],
		itemUser: ["Pidgeot"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies && !item.megaExcludes.includes(source.name)) return false;
			return true;
		},
		num: 762,
		gen: 6,
		isNonstandard: "Past",
	},
	pinsirite: {
		name: "Pinsirite",
		spritenum: 602,
		megaStone: "Pinsir-Mega",
		altMegaStone: [],
		megaEvolves: "Pinsir",
		megaExcludes: [],
		itemUser: ["Pinsir"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies && !item.megaExcludes.includes(source.name)) return false;
			return true;
		},
		num: 671,
		gen: 6,
		isNonstandard: "Past",
	},
	sablenite: {
		name: "Sablenite",
		spritenum: 614,
		megaStone: "Sableye-Mega",
		altMegaStone: [],
		megaEvolves: "Sableye",
		megaExcludes: [],
		itemUser: ["Sableye"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies && !item.megaExcludes.includes(source.name)) return false;
			return true;
		},
		num: 754,
		gen: 6,
		isNonstandard: "Past",
	},
	salamencite: {
		name: "Salamencite",
		spritenum: 627,
		megaStone: "Salamence-Mega",
		altMegaStone: [],
		megaEvolves: "Salamence",
		megaExcludes: [],
		itemUser: ["Salamence"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies && !item.megaExcludes.includes(source.name)) return false;
			return true;
		},
		num: 769,
		gen: 6,
		isNonstandard: "Past",
	},
	sceptilite: {
		name: "Sceptilite",
		spritenum: 613,
		megaStone: "Sceptile-Mega",
		altMegaStone: ["Sceptile-Iron-Mega"],
		megaEvolves: "Sceptile",
		megaExcludes: [],
		itemUser: ["Sceptile"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies && !item.megaExcludes.includes(source.name)) return false;
			return true;
		},
		num: 753,
		gen: 6,
		isNonstandard: "Past",
	},
	scizorite: {
		name: "Scizorite",
		spritenum: 605,
		megaStone: "Scizor-Mega",
		altMegaStone: [],
		megaEvolves: "Scizor",
		megaExcludes: [],
		itemUser: ["Scizor"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies && !item.megaExcludes.includes(source.name)) return false;
			return true;
		},
		num: 670,
		gen: 6,
		isNonstandard: "Past",
	},
	sharpedonite: {
		name: "Sharpedonite",
		spritenum: 619,
		megaStone: "Sharpedo-Mega",
		altMegaStone: [],
		megaEvolves: "Sharpedo",
		megaExcludes: [],
		itemUser: ["Sharpedo"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies && !item.megaExcludes.includes(source.name)) return false;
			return true;
		},
		num: 759,
		gen: 6,
		isNonstandard: "Past",
	},
	slowbronite: {
		name: "Slowbronite",
		spritenum: 620,
		megaStone: "Slowbro-Mega",
		altMegaStone: [],
		megaEvolves: "Slowbro",
		megaExcludes: [],
		itemUser: ["Slowbro"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies && !item.megaExcludes.includes(source.name)) return false;
			return true;
		},
		num: 760,
		gen: 6,
		isNonstandard: "Past",
	},
	steelixite: {
		name: "Steelixite",
		spritenum: 621,
		megaStone: "Steelix-Mega",
		altMegaStone: ["Steelix-MagicLamp-Mega"],
		megaEvolves: "Steelix",
		megaExcludes: [],
		itemUser: ["Steelix"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies && !item.megaExcludes.includes(source.name)) return false;
			return true;
		},
		num: 761,
		gen: 6,
		isNonstandard: "Past",
	},
	swampertite: {
		name: "Swampertite",
		spritenum: 612,
		megaStone: "Swampert-Mega",
		altMegaStone: [],
		megaEvolves: "Swampert",
		megaExcludes: [],
		itemUser: ["Swampert"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies && !item.megaExcludes.includes(source.name)) return false;
			return true;
		},
		num: 752,
		gen: 6,
		isNonstandard: "Past",
	},
	tyranitarite: {
		name: "Tyranitarite",
		spritenum: 607,
		megaStone: "Tyranitar-Mega",
		altMegaStone: [],
		megaEvolves: "Tyranitar",
		megaExcludes: [],
		itemUser: ["Tyranitar"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies && !item.megaExcludes.includes(source.name)) return false;
			return true;
		},
		num: 669,
		gen: 6,
		isNonstandard: "Past",
	},
	venusaurite: {
		name: "Venusaurite",
		spritenum: 608,
		megaStone: "Venusaur-Mega",
		altMegaStone: [],
		megaEvolves: "Venusaur",
		megaExcludes: [],
		itemUser: ["Venusaur"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies && !item.megaExcludes.includes(source.name)) return false;
			return true;
		},
		num: 659,
		gen: 6,
		isNonstandard: "Past",
	},

	// Since this reworks mega stones, it reworks Crucibellite here just in case
	crucibellite: {
		name: "Crucibellite",
		spritenum: 577,
		megaStone: "Crucibelle-Mega",
		altMegaStone: [],
		megaEvolves: "Crucibelle",
		megaExcludes: [],
		itemUser: ["Crucibelle"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies && !item.megaExcludes.includes(source.name)) return false;
			return true;
		},
		num: -1,
		gen: 6,
		isNonstandard: "CAP",
	},
};