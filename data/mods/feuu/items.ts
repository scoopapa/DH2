export const Items: {[itemid: string]: ModdedItemData} = {
	garchompite: {
		name: "Garchompite",
		spritenum: 589,
		megaStone: "Chomplim-Mega",
		megaEvolves: "Chomplim",
		itemUser: ["Chomplim"],
		onTakeItem: false,
		num: 683,
		desc: "If held by a Chomplim or Rhychomp, this item allows it to Mega Evolve in battle.",
	},
	audinite: {
		name: "Audinite",
		spritenum: 617,
		megaStone: "Silvino-Mega",
		megaEvolves: "Silvino",
		itemUser: ["Silvino"],
		onTakeItem: false,
		num: 757,
		desc: "If held by a Silvino or Audiyem, this item allows it to Mega Evolve in battle.",
	},
	lopunnite: {
		name: "Lopunnite",
		spritenum: 626,
		megaStone: "Tapu Lop-Mega",
		megaEvolves: "Tapu Lop",
		itemUser: ["Tapu Lop"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 768,
		desc: "If held by a Tapu Lop, this item allows it to Mega Evolve in battle.",
	},
	redorb: {
		name: "Red Orb",
		spritenum: 390,
		onSwitchIn(pokemon) {
			if (pokemon.isActive && pokemon.baseSpecies.name === 'Groudon') {
				this.queue.insertChoice({choice: 'runPrimal', pokemon: pokemon});
			} else if (pokemon.isActive && pokemon.baseSpecies.name === 'Grousle') {
				this.queue.insertChoice({choice: 'runPrimal', pokemon: pokemon});
			}
		},
		onPrimal(pokemon) {
			if (pokemon.baseSpecies.name === 'Groudon') {
				pokemon.formeChange('Groudon-Primal', this.effect, true);
			} else if (pokemon.baseSpecies.name === 'Grousle') {
				pokemon.formeChange('Grousle-Primal', this.effect, true);
			}
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Groudon' || source.baseSpecies.baseSpecies === 'Grousle') return false;
			return true;
		},
		itemUser: ["Groudon", "Grousle"],
		num: 534,
	},
	blueorb: {
		name: "Blue Orb",
		spritenum: 41,
		onSwitchIn(pokemon) {
			if (pokemon.isActive && pokemon.baseSpecies.name === 'Kyogre') {
				this.queue.insertChoice({choice: 'runPrimal', pokemon: pokemon});
			} else if (pokemon.isActive && pokemon.baseSpecies.name === 'Kyottler') {
				this.queue.insertChoice({choice: 'runPrimal', pokemon: pokemon});
			}
		},
		onPrimal(pokemon) {
			if (pokemon.baseSpecies.name === 'Kyogre') {
				pokemon.formeChange('Kyogre-Primal', this.effect, true);
			} else if (pokemon.baseSpecies.name === 'Kyottler') {
				pokemon.formeChange('Kyottler-Primal', this.effect, true);
			}		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Kyogre' || source.baseSpecies.baseSpecies === 'Kyottler') return false;
			return true;
		},
		itemUser: ["Kyogre", "Kyottler"],
		num: 535,
	},
	pidgeotite: {
		name: "Pidgeotite",
		spritenum: 622,
		megaStone: "Corveot-Mega",
		megaEvolves: "Corveot",
		itemUser: ["Corveot"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 762,
		desc: "If held by a Corveot, this item allows it to Mega Evolve in battle.",
	},
	tyranitarite: {
		name: "Tyranitarite",
		spritenum: 607,
		megaStone: "Pincurchitar-Mega",
		megaEvolves: "Pincurchitar",
		itemUser: ["Pincurchitar"],
		onTakeItem: false,
		num: 669,
		desc: "If held by a Pincurchitar or Goatitar, this item allows it to Mega Evolve in battle.",
	},
	absolite: {
		name: "Absolite",
		spritenum: 576,
		megaStone: "Absable-Mega-X",
		megaEvolves: "Absable",
		itemUser: ["Absable"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 677,
		desc: "If held by an Absable, this item allows it to Mega Evolve in battle.",
	},
	sablenite: {
		name: "Sablenite",
		spritenum: 614,
		megaStone: "Sableior-Mega",
		megaEvolves: "Sableior",
		itemUser: ["Sableior"],
		onTakeItem: false,
		num: 754,
		desc: "If held by a Sableior or an Absable, this item allows it to Mega Evolve in battle.",
	},
	heracronite: {
		name: "Heracronite",
		spritenum: 590,
		megaStone: "Ninjacross-Mega",
		megaEvolves: "Ninjacross",
		itemUser: ["Ninjacross"],
		onTakeItem: false,
		num: 680,
		desc: "If held by a Ninjacross or Cleracross, this item allows it to Mega Evolve in battle.",
	},
	houndoominite: {
		name: "Houndoominite",
		spritenum: 591,
		megaStone: "Dracodoom-Mega",
		megaEvolves: "Dracodoom",
		itemUser: ["Dracodoom"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 666,
		desc: "If held by a Dracodoom, this item allows it to Mega Evolve in battle.",
	},
	abomasite: {
		name: "Abomasite",
		spritenum: 575,
		megaStone: "Glasnow-Mega",
		megaEvolves: "Glasnow",
		itemUser: ["Glasnow"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 674,
		desc: "If held by a Glasnow, this item allows it to Mega Evolve in battle.",
	},
	gardevoirite: {
		name: "Gardevoirite",
		spritenum: 587,
		megaStone: "Kokovoir-Mega",
		megaEvolves: "Kokovoir",
		itemUser: ["Kokovoir"],
		onTakeItem: false,
		num: 657,
		desc: "If held by a Kokovoir or Goodevoir, this item allows it to Mega Evolve in battle.",
	},
	scizorite: {
		name: "Scizorite",
		spritenum: 605,
		megaStone: "Cofazor-Mega",
		megaEvolves: "Cofazor",
		itemUser: ["Cofazor"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 670,
		desc: "If held by a Cofazor, this item allows it to Mega Evolve in battle.",
	},
	ampharosite: {
		name: "Ampharosite",
		spritenum: 580,
		megaStone: "Roaramp-Mega",
		megaEvolves: "Roaramp",
		itemUser: ["Roaramp"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 658,
		desc: "If held by a Roaramp, this item allows it to Mega Evolve in battle.",
	},
	steelixite: {
		name: "Steelixite",
		spritenum: 621,
		megaStone: "Dracolix-Mega",
		megaEvolves: "Dracolix",
		itemUser: ["Dracolix"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 761,
		desc: "If held by a Dracolix, this item allows it to Mega Evolve in battle.",
	},
	medichamite: {
		name: "Medichamite",
		spritenum: 599,
		megaStone: "Vullacham-Mega",
		megaEvolves: "Vullacham",
		itemUser: ["Vullacham"],
		onTakeItem: false,
		num: 665,
		desc: "If held by a Vullacham or Gastrocham, this item allows it to Mega Evolve in battle.",
	},
	glalitite: {
		name: "Glalitite",
		spritenum: 623,
		megaStone: "Glakiss-Mega",
		megaEvolves: "Glakiss",
		itemUser: ["Glakiss"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 763,
		desc: "If held by a Glakiss, this item allows it to Mega Evolve in battle.",
	},
	depletedultranecroziumz: {
		name: "Depleted Ultranecrozium Z",
		spritenum: 687,
		itemUser: ["Noze-Dawn-Wings"],
		onTakeItem: false,
		num: -1001,
		desc: "If held by a Noze-Dawn-Wings, this item allows it to Ultra Burst in battle. This does not allow it to use a Z-Move.",
	},
	charizarditex: {
		name: "Charizardite X",
		spritenum: 585,
		megaStone: "Altarizard-Mega-X",
		megaEvolves: "Altarizard",
		itemUser: ["Altarizard"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 660,
		desc: "If held by a Altarizard, this item allows it to Mega Evolve in battle.",
	},
	charizarditey: {
		name: "Charizardite Y",
		spritenum: 586,
		megaStone: "Altarizard-Mega-Y",
		megaEvolves: "Altarizard",
		itemUser: ["Altarizard"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 678,
		desc: "If held by a Altarizard, this item allows it to Mega Evolve in battle.",
	},
	altarianite: {
		name: "Altarianite",
		spritenum: 615,
		megaStone: "Altarizard-Mega",
		megaEvolves: "Altarizard",
		itemUser: ["Altarizard"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 755,
		desc: "If held by a Altarizard, this item allows it to Mega Evolve in battle.",
	},
	adrenalineorb: {
		name: "Adrenaline Orb",
		spritenum: 660,
		fling: {
			basePower: 30,
		},
		onAfterBoost(boost, target, source, effect) {
			if (effect.id === 'intimidate' || effect.id === 'debilitate' || effect.id === 'sinkorswim' || effect.id === 'scarilyadorable' || effect.id === 'peckingorder') {
				target.useItem();
			}
		},
		boosts: {
			spe: 1,
		},
		num: 846,
		gen: 7,
	},
	salamencite: {
		name: "Salamencite",
		spritenum: 627,
		megaStone: "Swannamence-Mega",
		megaEvolves: "Swannamence",
		itemUser: ["Swannamence"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 769,
		desc: "If held by a Swannamence, this item allows it to Mega Evolve in battle.",
	},
	aerodactylite: {
		name: "Aerodactylite",
		spritenum: 577,
		megaStone: "Lurodactyl-Mega",
		megaEvolves: "Lurodactyl",
		itemUser: ["Lurodactyl"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 672,
		desc: "If held by a Lurodactyl, this item allows it to Mega Evolve in battle.",
	},
	beedrillite: {
		name: "Beedrillite",
		spritenum: 628,
		megaStone: "Regibee-Mega",
		megaEvolves: "Regibee",
		itemUser: ["Regibee"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 770,
		desc: "If held by a Regibee, this item allows it to Mega Evolve in battle.",
	},
	cameruptite: {
		name: "Cameruptite",
		spritenum: 625,
		megaStone: "Avarupt-Mega",
		megaEvolves: "Avarupt",
		itemUser: ["Avarupt"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 767,
		desc: "If held by an Avarupt or Wishirupti, this item allows it to Mega Evolve in battle.",
	},
	swampertite: {
		name: "Swampertite",
		spritenum: 612,
		megaStone: "Swampflora-Mega",
		megaEvolves: "Swampflora",
		itemUser: ["Swampflora"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 752,
		desc: "If held by a Swampflora, this item allows it to Mega Evolve in battle.",
	},
	mawilite: {
		name: "Mawilite",
		spritenum: 598,
		megaStone: "Duramaw-Mega",
		megaEvolves: "Duramaw",
		itemUser: ["Duramaw"],
		onTakeItem: false,
		num: 681,
		desc: "If held by a Duramaw, this item allows it to Mega Evolve in battle.",
	},
	burndrive: {
		name: "Burn Drive",
		spritenum: 54,
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 129 || source.baseSpecies.num === 136) || pokemon.baseSpecies.num === 129 || pokemon.baseSpecies.num === 136) {
				return false;
			}
			return true;
		},
		onDrive: 'Fire',
		forcedForme: ["Litleesect-Burn", "Genebro-Galar-Burn"],
		itemUser: ["Litleesect-Burn", "Genebro-Galar-Burn"],
		num: 118,
		gen: 5,
	},
	chilldrive: {
		name: "Chill Drive",
		spritenum: 67,
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 129 || source.baseSpecies.num === 136) || pokemon.baseSpecies.num === 129 || pokemon.baseSpecies.num === 136) {
				return false;
			}
			return true;
		},
		onDrive: 'Ice',
		forcedForme: ["Litleesect-Chill", "Genebro-Galar-Chill"],
		itemUser: ["Litleesect-Chill", "Genebro-Galar-Chill"],
		num: 119,
		gen: 5,
	},
	dousedrive: {
		name: "Douse Drive",
		spritenum: 103,
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 129 || source.baseSpecies.num === 136) || pokemon.baseSpecies.num === 129 || pokemon.baseSpecies.num === 136) {
				return false;
			}
			return true;
		},
		onDrive: 'Water',
		forcedForme: ["Litleesect-Douse", "Genebro-Galar-Douse"],
		itemUser: ["Litleesect-Douse", "Genebro-Galar-Douse"],
		num: 116,
		gen: 5,
	},
	shockdrive: {
		name: "Shock Drive",
		spritenum: 442,
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 129 || source.baseSpecies.num === 136) || pokemon.baseSpecies.num === 129 || pokemon.baseSpecies.num === 136) {
				return false;
			}
			return true;
		},
		onDrive: 'Electric',
		forcedForme: ["Litleesect-Shock", "Genebro-Galar-Shock"],
		itemUser: ["Litleesect-Shock", "Genebro-Galar-Shock"],
		num: 117,
		gen: 5,
	},
	galladite: {
		name: "Galladite",
		spritenum: 616,
		megaStone: "Galsola-Mega",
		megaEvolves: "Galsola",
		itemUser: ["Galsola"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 756,
		desc: "If held by a Galsola, this item allows it to Mega Evolve in battle.",
	},
	sharpedonite: {
		name: "Sharpedonite",
		spritenum: 619,
		megaStone: "Sharpiskorch-Mega",
		megaEvolves: "Sharpiskorch",
		itemUser: ["Sharpiskorch"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 759,
		desc: "If held by a Sharpiskorch, this item allows it to Mega Evolve in battle.",
	},
	aggronite: {
		name: "Aggronite",
		spritenum: 578,
		megaStone: "Emolggron-Mega",
		megaEvolves: "Emolggron",
		itemUser: ["Emolggron"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 667,
		desc: "If held by a Emolggron, this item allows it to Mega Evolve in battle.",
	},
	venusaurite: {
		name: "Venusaurite",
		spritenum: 608,
		megaStone: "Venuroar-Mega",
		megaEvolves: "Venuroar",
		itemUser: ["Venuroar"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 659,
		desc: "If held by a Venuroar, this item allows it to Mega Evolve in battle.",
	},
	pinsirite: {
		name: "Pinsirite",
		spritenum: 602,
		megaStone: "Pingar-Mega",
		megaEvolves: "Pingar",
		itemUser: ["Pingar"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 671,
		desc: "If held by a Pingar, this item allows it to Mega Evolve in battle.",
	},
	stick: {
		name: "Stick",
		fling: {
			basePower: 60,
		},
		spritenum: 475,
		onModifyCritRatio(critRatio, user) {
			if (this.toID(user.baseSpecies.baseSpecies) === 'fetchey') {
				return critRatio + 2;
			}
		},
		itemUser: ["Fetchey"],
		num: 259,
		gen: 2,
		desc: "If held by Fetchey: +2 crit ratio.",
	},
	leek: {
		name: "Leek",
		fling: {
			basePower: 60,
		},
		spritenum: 475,
		onModifyCritRatio(critRatio, user) {
			if (["fetchey"].includes(this.toID(user.baseSpecies.baseSpecies))) {
				return critRatio + 2;
			}
		},
		itemUser: ["Fetchey"],
		num: 259,
		gen: 8,
		desc: "If held by Fetchey: +2 crit ratio.",
	},
	luckypunch: {
		name: "Lucky Punch",
		spritenum: 261,
		fling: {
			basePower: 40,
		},
		onModifyCritRatio(critRatio, user) {
			if (user.baseSpecies.name === 'Fetchey') {
				return critRatio + 2;
			}
		},
		itemUser: ["Fetchey"],
		num: 256,
		gen: 2,
		desc: "If held by Fetchey: +2 crit ratio.",
	},
	alakazite: {
		name: "Alakazite",
		spritenum: 579,
		megaStone: "Alakannon-Mega",
		megaEvolves: "Alakannon",
		itemUser: ["Alakannon"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 679,
		desc: "If held by an Alakannon, this item allows it to Mega Evolve in battle.",
	},
	
// silvino moment :jokerification:
	bugmemory: {
		onMemory: 'Bug',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 14) || pokemon.baseSpecies.num === 14) {
				return false;
			}
			return true;
		},
		forcedForme: "Silvino-Bug",
		itemUser: ["Silvino-Bug"],
	},
	darkmemory: {
		name: "Dark Memory",
		onMemory: 'Dark',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 14) || pokemon.baseSpecies.num === 14) {
				return false;
			}
			return true;
		},
		forcedForme: "Silvino-Dark",
		itemUser: ["Silvino-Dark"],
	},
	dragonmemory: {
		name: "Dragon Memory",
		onMemory: 'Dragon',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 14) || pokemon.baseSpecies.num === 14) {
				return false;
			}
			return true;
		},
		forcedForme: "Silvino-Dragon",
		itemUser: ["Silvino-Dragon"],
	},
	electricmemory: {
		name: "Electric Memory",
		onMemory: 'Electric',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 14) || pokemon.baseSpecies.num === 14) {
				return false;
			}
			return true;
		},
		forcedForme: "Silvino-Electric",
		itemUser: ["Silvino-Electric"],
	},
	fightingmemory: {
		name: "Fighting Memory",
		onMemory: 'Fighting',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 14) || pokemon.baseSpecies.num === 14) {
				return false;
			}
			return true;
		},
		forcedForme: "Silvino-Fighting",
		itemUser: ["Silvino-Fighting"],
	},
	firememory: {
		name: "Fire Memory",
		onMemory: 'Fire',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 14) || pokemon.baseSpecies.num === 14) {
				return false;
			}
			return true;
		},
		forcedForme: "Silvino-Fire",
		itemUser: ["Silvino-Fire"],
	},
	flyingmemory: {
		name: "Flying Memory",
		onMemory: 'Flying',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 14) || pokemon.baseSpecies.num === 14) {
				return false;
			}
			return true;
		},
		forcedForme: "Silvino-Flying",
		itemUser: ["Silvino-Flying"],
	},
	ghostmemory: {
		name: "Ghost Memory",
		onMemory: 'Ghost',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 14) || pokemon.baseSpecies.num === 14) {
				return false;
			}
			return true;
		},
		forcedForme: "Silvino-Ghost",
		itemUser: ["Silvino-Ghost"],
	},
	grassmemory: {
		name: "Grass Memory",
		onMemory: 'Grass',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 14) || pokemon.baseSpecies.num === 14) {
				return false;
			}
			return true;
		},
		forcedForme: "Silvino-Grass",
		itemUser: ["Silvino-Grass"],
	},
	groundmemory: {
		name: "Ground Memory",
		onMemory: 'Ground',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 14) || pokemon.baseSpecies.num === 14) {
				return false;
			}
			return true;
		},
		forcedForme: "Silvino-Ground",
		itemUser: ["Silvino-Ground"],
	},
	icememory: {
		name: "Ice Memory",
		onMemory: 'Ice',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 14) || pokemon.baseSpecies.num === 14) {
				return false;
			}
			return true;
		},
		forcedForme: "Silvino-Ice",
		itemUser: ["Silvino-Ice"],
	},
	poisonmemory: {
		name: "Poison Memory",
		spritenum: 670,
		onMemory: 'Poison',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 14) || pokemon.baseSpecies.num === 14) {
				return false;
			}
			return true;
		},
		forcedForme: "Silvino-Poison",
		itemUser: ["Silvino-Poison"],
	},
	psychicmemory: {
		name: "Psychic Memory",
		onMemory: 'Psychic',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 14) || pokemon.baseSpecies.num === 14) {
				return false;
			}
			return true;
		},
		forcedForme: "Silvino-Psychic",
		itemUser: ["Silvino-Psychic"],
	},
	rockmemory: {
		name: "Rock Memory",
		onMemory: 'Rock',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 14) || pokemon.baseSpecies.num === 14) {
				return false;
			}
			return true;
		},
		forcedForme: "Silvino-Rock",
		itemUser: ["Silvino-Rock"],
	},
	steelmemory: {
		name: "Steel Memory",
		onMemory: 'Steel',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 14) || pokemon.baseSpecies.num === 14) {
				return false;
			}
			return true;
		},
		forcedForme: "Silvino-Steel",
		itemUser: ["Silvino-Steel"],
	},
	watermemory: {
		name: "Water Memory",
		onMemory: 'Water',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 14) || pokemon.baseSpecies.num === 14) {
				return false;
			}
			return true;
		},
		forcedForme: "Silvino-Water",
		itemUser: ["Silvino-Water"],
	},
	fairymemory: {
		name: "Fairy Memory",
		onMemory: 'Fairy',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 14) || pokemon.baseSpecies.num === 14) {
				return false;
			}
			return true;
		},
		forcedForme: "Silvino-Fairy",
		itemUser: ["Silvino-Fairy"],
	},
};
