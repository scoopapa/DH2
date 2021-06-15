export const Items: {[k: string]: ModdedItemData} = {
	venusauritey: {
		name: "Venusaurite Y",
		spritenum: 608,
		megaStone: "Venusaur-Mega-Y",
		megaEvolves: "Venusaur",
		itemUser: ["Venusaur"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 10000,
		gen: 7,
		desc: "If held by a Venusaur, this item allows it to Mega Evolve in battle.",
	},
	abomasitex: {
		name: "Abomasite X",
		spritenum: 608,
		megaStone: "Abomasnow-Mega-X",
		megaEvolves: "Abomasnow",
		itemUser: ["Abomasnow"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 10001,
		gen: 7,
		desc: "If held by an Abomasnow, this item allows it to Mega Evolve in battle.",
	},
	absolitey: {
		name: "Absolite Y",
		spritenum: 576,
		megaStone: "Absol-Mega-Y",
		megaEvolves: "Absol",
		itemUser: ["Absol"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 10002,
		gen: 7,
		desc: "If held by an Absol, this item allows it to Mega Evolve in battle.",
	},
	aerodactylitey: {
		name: "Aerodactylite Y",
		spritenum: 577,
		megaStone: "Aerodactyl-Mega-Y",
		megaEvolves: "Aerodactyl",
		itemUser: ["Aerodactyl"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 10003,
		gen: 7,
		desc: "If held by an Aerodactyl, this item allows it to Mega Evolve in battle.",
	},
	aggronitey: {
		name: "Aggronite Y",
		spritenum: 578,
		megaStone: "Aggron-Mega-Y",
		megaEvolves: "Aggron",
		itemUser: ["Aggron"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 10004,
		gen: 7,
		desc: "If held by an Aggron, this item allows it to Mega Evolve in battle.",
	},
	alakazitex: {
		name: "Alakazite X",
		spritenum: 579,
		megaStone: "Alakazam-Mega-X",
		megaEvolves: "Alakazam",
		itemUser: ["Alakazam"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 10005,
		gen: 7,
		desc: "If held by an Alakazam, this item allows it to Mega Evolve in battle.",
	},
	altarianitey: {
		name: "Altarianite Y",
		spritenum: 615,
		megaStone: "Altaria-Mega-Y",
		megaEvolves: "Altaria",
		itemUser: ["Altaria"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 10006,
		gen: 7,
		desc: "If held by an Altaria, this item allows it to Mega Evolve in battle.",
	},
	ampharositex: {
		name: "Ampharosite X",
		spritenum: 580,
		megaStone: "Ampharos-Mega-X",
		megaEvolves: "Ampharos",
		itemUser: ["Ampharos"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 10007,
		gen: 7,
		desc: "If held by an Ampharos, this item allows it to Mega Evolve in battle.",
	},
	glalititex: {
		name: "Glalitite X",
		spritenum: 623,
		megaStone: "Glalie-Mega-X",
		megaEvolves: "Glalie",
		itemUser: ["Glalie"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 10008,
		gen: 7,
		desc: "If held by a Glalie, this item allows it to Mega Evolve in battle.",
	},
	audinitey: {
		name: "Audinite Y",
		spritenum: 617,
		megaStone: "Audino-Mega-Y",
		megaEvolves: "Audino",
		itemUser: ["Audino"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 10009,
		gen: 7,
		desc: "If held by an Audino, this item allows it to Mega Evolve in battle.",
	},
	banettitey: {
		name: "Banettite Y",
		spritenum: 582,
		megaStone: "Banette-Mega-Y",
		megaEvolves: "Banette",
		itemUser: ["Banette"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 10010,
		gen: 7,
		desc: "If held by a Banette, this item allows it to Mega Evolve in battle.",
	},
	beedrillitey: {
		name: "Beedrillite Y",
		spritenum: 628,
		megaStone: "Beedrill-Mega-Y",
		megaEvolves: "Beedrill",
		itemUser: ["Beedrill"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 10011,
		gen: 7,
		desc: "If held by a Beedrill, this item allows it to Mega Evolve in battle.",
	},
	blastoisinitex: {
		name: "Blastoisinite X",
		spritenum: 583,
		megaStone: "Blastoise-Mega-X",
		megaEvolves: "Blastoise",
		itemUser: ["Blastoise"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 10012,
		gen: 7,
		desc: "If held by a Blastoise, this item allows it to Mega Evolve in battle.",
	},
	blazikenitey: {
		name: "Blazikenite Y",
		spritenum: 584,
		megaStone: "Blaziken-Mega-Y",
		megaEvolves: "Blaziken",
		itemUser: ["Blaziken"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 10013,
		gen: 7,
		desc: "If held by a Blaziken, this item allows it to Mega Evolve in battle.",
	},
	cameruptitex: {
		name: "Cameruptite X",
		spritenum: 625,
		megaStone: "Camerupt-Mega-X",
		megaEvolves: "Camerupt",
		itemUser: ["Camerupt"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 10014,
		gen: 7,
		desc: "If held by a Camerupt, this item allows it to Mega Evolve in battle.",
	},
	crucibellitey: {
		name: "Crucibellite Y",
		spritenum: 577,
		megaStone: "Crucibelle-Mega-Y",
		megaEvolves: "Crucibelle",
		itemUser: ["Crucibelle"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -2,
		gen: 7,
		desc: "If held by a Crucibelle, this item allows it to Mega Evolve in battle.",
		isNonstandard: "CAP",
	},
	diancitey: {
		name: "Diancite Y",
		spritenum: 624,
		megaStone: "Diancie-Mega-Y",
		megaEvolves: "Diancie",
		itemUser: ["Diancie"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 10015,
		gen: 7,
		desc: "If held by a Diancie, this item allows it to Mega Evolve in battle.",
	},
	galladitey: {
		name: "Galladite Y",
		spritenum: 616,
		megaStone: "Gallade-Mega-Y",
		megaEvolves: "Gallade",
		itemUser: ["Gallade"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 10016,
		gen: 7,
		desc: "If held by a Gallade, this item allows it to Mega Evolve in battle.",
	},
	garchompitey: {
		name: "Garchompite Y",
		spritenum: 589,
		megaStone: "Garchomp-Mega-Y",
		megaEvolves: "Garchomp",
		itemUser: ["Garchomp"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 10017,
		gen: 7,
		desc: "If held by a Garchomp, this item allows it to Mega Evolve in battle.",
	},
	gardevoiritex: {
		name: "Gardevoirite X",
		spritenum: 587,
		megaStone: "Gardevoir-Mega-X",
		megaEvolves: "Gardevoir",
		itemUser: ["Gardevoir"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 10018,
		gen: 7,
		desc: "If held by a Gardevoir, this item allows it to Mega Evolve in battle.",
	},
	gengaritex: {
		name: "Gengarite X",
		spritenum: 588,
		megaStone: "Gengar-Mega-X",
		megaEvolves: "Gengar",
		itemUser: ["Gengar"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 10019,
		gen: 7,
		desc: "If held by a Gengar, this item allows it to Mega Evolve in battle.",
	},
	gyaradositey: {
		name: "Gyaradosite Y",
		spritenum: 589,
		megaStone: "Gyarados-Mega-Y",
		megaEvolves: "Gyarados",
		itemUser: ["Gyarados"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 10020,
		gen: 7,
		desc: "If held by a Gyarados, this item allows it to Mega Evolve in battle.",
	},
	heracronitey: {
		name: "Heracronite Y",
		spritenum: 590,
		megaStone: "Heracross-Mega-Y",
		megaEvolves: "Heracross",
		itemUser: ["Heracross"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 10021,
		gen: 7,
		desc: "If held by a Heracross, this item allows it to Mega Evolve in battle.",
	},
	houndoominitex: {
		name: "Houndoominite X",
		spritenum: 591,
		megaStone: "Houndoom-Mega-X",
		megaEvolves: "Houndoom",
		itemUser: ["Houndoom"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 10022,
		gen: 7,
		desc: "If held by a Houndoom, this item allows it to Mega Evolve in battle.",
	},
	kangaskhanitey: {
		name: "Kangaskhanite Y",
		spritenum: 592,
		megaStone: "Kangaskhan-Mega-Y",
		megaEvolves: "Kangaskhan",
		itemUser: ["Kangaskhan"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 10023,
		gen: 7,
		desc: "If held by a Kangaskhan, this item allows it to Mega Evolve in battle.",
	},
	latiasitey: {
		name: "Latiasite Y",
		spritenum: 629,
		megaStone: "Latias-Mega-Y",
		megaEvolves: "Latias",
		itemUser: ["Latias"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 10024,
		gen: 7,
		desc: "If held by a Latias, this item allows it to Mega Evolve in battle.",
	},
	latiositex: {
		name: "Latiosite X",
		spritenum: 630,
		megaStone: "Latios-Mega-X",
		megaEvolves: "Latios",
		itemUser: ["Latios"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 10025,
		gen: 7,
		desc: "If held by a Latios, this item allows it to Mega Evolve in battle.",
	},
	lucarionitey: {
		name: "Lucarionite Y",
		spritenum: 594,
		megaStone: "Lucario-Mega-Y",
		megaEvolves: "Lucario",
		itemUser: ["Lucario"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 10026,
		gen: 7,
		desc: "If held by a Lucario, this item allows it to Mega Evolve in battle.",
	},
	manectitex: {
		name: "Manectite X",
		spritenum: 596,
		megaStone: "Manectric-Mega-X",
		megaEvolves: "Manectric",
		itemUser: ["Manectric"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 10027,
		gen: 7,
		desc: "If held by a Manectric, this item allows it to Mega Evolve in battle.",
	},
	mawilitey: {
		name: "Mawilite Y",
		spritenum: 598,
		megaStone: "Mawile-Mega-Y",
		megaEvolves: "Mawile",
		itemUser: ["Mawile"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 10028,
		gen: 7,
		desc: "If held by a Mawile, this item allows it to Mega Evolve in battle.",
	},
	medichamitey: {
		name: "Medichamite Y",
		spritenum: 599,
		megaStone: "Medicham-Mega-Y",
		megaEvolves: "Medicham",
		itemUser: ["Medicham"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 10029,
		gen: 7,
		desc: "If held by a Medicham, this item allows it to Mega Evolve in battle.",
	},
	metagrossitey: {
		name: "Metagrossite Y",
		spritenum: 618,
		megaStone: "Metagross-Mega-Y",
		megaEvolves: "Metagross",
		itemUser: ["Metagross"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 10030,
		gen: 7,
		desc: "If held by a Metagross, this item allows it to Mega Evolve in battle.",
	},
	sablenitey: {
		name: "Sablenite Y",
		spritenum: 614,
		megaStone: "Sableye-Mega-Y",
		megaEvolves: "Sableye",
		itemUser: ["Sableye"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 10031,
		gen: 7,
		desc: "If held by a Sableye, this item allows it to Mega Evolve in battle.",
	},
	pidgeotitex: {
		name: "Pidgeotite X",
		spritenum: 622,
		megaStone: "Pidgeot-Mega-X",
		megaEvolves: "Pidgeot",
		itemUser: ["Pidgeot"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 10032,
		gen: 7,
		desc: "If held by a Pidgeot, this item allows it to Mega Evolve in battle.",
	},
	pinsiritey: {
		name: "Pinsirite Y",
		spritenum: 602,
		megaStone: "Pinsir-Mega-Y",
		megaEvolves: "Pinsir",
		itemUser: ["Pinsir"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 10033,
		gen: 7,
		desc: "If held by a Pinsir, this item allows it to Mega Evolve in battle.",
	},
	salamencitey: {
		name: "Salamencite Y",
		spritenum: 627,
		megaStone: "Salamence-Mega-Y",
		megaEvolves: "Salamence",
		itemUser: ["Salamence"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 10034,
		gen: 7,
		desc: "If held by a Salamence, this item allows it to Mega Evolve in battle.",
	},
	sceptilitex: {
		name: "Sceptilite X",
		spritenum: 613,
		megaStone: "Sceptile-Mega-X",
		megaEvolves: "Sceptile",
		itemUser: ["Sceptile"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 10035,
		gen: 7,
		desc: "If held by a Sceptile, this item allows it to Mega Evolve in battle.",
	},
	scizoritey: {
		name: "Scizorite Y",
		spritenum: 605,
		megaStone: "Scizor-Mega-Y",
		megaEvolves: "Scizor",
		itemUser: ["Scizor"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 10036,
		gen: 7,
		desc: "If held by a Scizor, this item allows it to Mega Evolve in battle.",
	},
	sharpedonitey: {
		name: "Sharpedonite Y",
		spritenum: 619,
		megaStone: "Sharpedo-Mega-Y",
		megaEvolves: "Sharpedo",
		itemUser: ["Sharpedo"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 10037,
		gen: 7,
		desc: "If held by a Sharpedo, this item allows it to Mega Evolve in battle.",
	},
	slowbronitex: {
		name: "Slowbronite X",
		spritenum: 620,
		megaStone: "Slowbro-Mega-X",
		megaEvolves: "Slowbro",
		itemUser: ["Slowbro"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 10038,
		gen: 7,
		desc: "If held by a Slowbro, this item allows it to Mega Evolve in battle.",
	},
	steelixitey: {
		name: "Steelixite Y",
		spritenum: 621,
		megaStone: "Steelix-Mega-Y",
		megaEvolves: "Steelix",
		itemUser: ["Steelix"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 10039,
		gen: 7,
		desc: "If held by a Steelix, this item allows it to Mega Evolve in battle.",
	},
	swampertitey: {
		name: "Swampertite Y",
		spritenum: 612,
		megaStone: "Swampert-Mega-Y",
		megaEvolves: "Swampert",
		itemUser: ["Swampert"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 10040,
		gen: 7,
		desc: "If held by a Swampert, this item allows it to Mega Evolve in battle.",
	},
	tyranitaritey: {
		name: "Tyranitarite Y",
		spritenum: 607,
		megaStone: "Tyranitar-Mega-Y",
		megaEvolves: "Tyranitar",
		itemUser: ["Tyranitar"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 10041,
		gen: 7,
		desc: "If held by a Tyranitar, this item allows it to Mega Evolve in battle.",
	},
	purenecroziumz: {
		name: "Purenecrozium Z",
		spritenum: 687,
		onTakeItem: false,
		zMove: "Dawn of a New Day",
		zMoveFrom: "Life's Light",
		itemUser: ["Necrozma-Pure"],
		num: 10042,
		gen: 7,
		desc: "Dusk Mane/Dawn Wings Necrozma: Ultra Burst, then Z-Move w/ Life's Light.",
	},
	greenorb: {
		name: "Green Orb",
		spritenum: 41,
		onSwitchIn(pokemon) {
			if (pokemon.isActive && pokemon.baseSpecies.name === 'Kyogre') {
				this.queue.insertChoice({choice: 'runPrimal', pokemon: pokemon});
			}
		},
		onPrimal(pokemon) {
			pokemon.formeChange('Kyogre-Edge', this.effect, true);
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Kyogre') return false;
			return true;
		},
		itemUser: ["Kyogre"],
		num: 10043,
		gen: 7,
		desc: "Allows Kyogre to Primal Revert into Edge Kyogre",
	},
	goldenorb: {
		name: "Golden Orb",
		spritenum: 41,
		onSwitchIn(pokemon) {
			if (pokemon.isActive && pokemon.baseSpecies.name === 'Groudon') {
				this.queue.insertChoice({choice: 'runPrimal', pokemon: pokemon});
			}
		},
		onPrimal(pokemon) {
			pokemon.formeChange('Groudon-Fallen', this.effect, true);
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Groudon') return false;
			return true;
		},
		itemUser: ["Groudon"],
		num: 10044,
		gen: 7,
		desc: "Allows Groudon to Primal Revert into Fallen Groudon",
	},
};
