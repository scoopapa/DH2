export const Items: {[k: string]: ModdedItemData} = {
	pitchasaurite: {
		name: "Pitchasaurite",
		spritenum: 586,
		megaStone: "Pitchasaur-Mega",
		megaEvolves: "Pitchasaur",
		itemUser: ["Pitchasaur"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1001,
		gen: 8,
		desc: "If held by a Pitchasaur, this item allows it to Mega Evolve in battle.",
	},
	blastonoisite: {
		name: "Blastonoisite",
		spritenum: 586,
		megaStone: "Blastonoise-Mega",
		megaEvolves: "Blastonoise",
		itemUser: ["Blastonoise"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1002,
		gen: 8,
		desc: "If held by a Blastonoise, this item allows it to Mega Evolve in battle.",
	},
	charodilitex: {
		name: "Charodilite X",
		spritenum: 586,
		megaStone: "Charodile-Mega-X",
		megaEvolves: "Charodile",
		itemUser: ["Charodile"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1003,
		gen: 8,
		desc: "If held by a Charodile, this item allows it to Mega Evolve in battle.",
	},
	charodilitey: {
		name: "Charodilite Y",
		spritenum: 586,
		megaStone: "Charodile-Mega-Y",
		megaEvolves: "Charodile",
		itemUser: ["Charodile"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1004,
		gen: 8,
		desc: "If held by a Charodile, this item allows it to Mega Evolve in battle.",
	},
	hornetoxite: {
		name: "Hornetoxite",
		spritenum: 586,
		megaStone: "Hornetox-Mega",
		megaEvolves: "Hornetox",
		itemUser: ["Hornetox"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1005,
		gen: 8,
		desc: "If held by a Hornetox, this item allows it to Mega Evolve in battle.",
	},
	banshigenite: {
		name: "Banshigenite",
		spritenum: 586,
		megaStone: "Banshigen-Mega",
		megaEvolves: "Banshigen",
		itemUser: ["Banshigen"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1006,
		gen: 8,
		desc: "If held by a Banshigen, this item allows it to Mega Evolve in battle.",
	},
	lapidourite: {
		name: "Lapidourite",
		spritenum: 586,
		megaStone: "Lapidour-Mega",
		megaEvolves: "Lapidour",
		itemUser: ["Lapidour"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1007,
		gen: 8,
		desc: "If held by a Lapidour, this item allows it to Mega Evolve in battle.",
	},
	jorunnite: {
		name: "Jorunnite",
		spritenum: 586,
		megaStone: "Jorunny-Mega",
		megaEvolves: "Jorunny",
		itemUser: ["Jorunny"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1008,
		gen: 8,
		desc: "If held by a Jorunny, this item allows it to Mega Evolve in battle.",
	},
	auranubite: {
		name: "Auranubite",
		spritenum: 586,
		megaStone: "Auranubis-Mega",
		megaEvolves: "Auranubis",
		itemUser: ["Auranubis"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1009,
		gen: 8,
		desc: "If held by a Auranubis, this item allows it to Mega Evolve in battle.",
	},
	bugmemory: {
		name: "Bug Memory",
		spritenum: 673,
		onMemory: 'Bug',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === -140) || pokemon.baseSpecies.num === -140) {
				return false;
			}
			return true;
		},
		forcedForme: "Chrienmor-Bug",
		itemUser: ["Chrienmor-Bug"],
		num: 909,
		gen: 7,
	},
	darkmemory: {
		name: "Dark Memory",
		spritenum: 683,
		onMemory: 'Dark',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === -140) || pokemon.baseSpecies.num === -140) {
				return false;
			}
			return true;
		},
		forcedForme: "Chrienmor-Dark",
		itemUser: ["Chrienmor-Dark"],
		num: 919,
		gen: 7,
	},
    dragonmemory: {
		name: "Dragon Memory",
		spritenum: 682,
		onMemory: 'Dragon',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === -140) || pokemon.baseSpecies.num === -140) {
				return false;
			}
			return true;
		},
		forcedForme: "Chrienmor-Dragon",
		itemUser: ["Chrienmor-Dragon"],
		num: 918,
		gen: 7,
	},
    electricmemory: {
		name: "Electric Memory",
		spritenum: 679,
		onMemory: 'Electric',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === -140) || pokemon.baseSpecies.num === -140) {
				return false;
			}
			return true;
		},
		forcedForme: "Chrienmor-Electric",
		itemUser: ["Chrienmor-Electric"],
		num: 915,
		gen: 7,
	},
    fairymemory: {
		name: "Fairy Memory",
		spritenum: 684,
		onMemory: 'Fairy',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === -140) || pokemon.baseSpecies.num === -140) {
				return false;
			}
			return true;
		},
		forcedForme: "Chrienmor-Fairy",
		itemUser: ["Chrienmor-Fairy"],
		num: 920,
		gen: 7,
	},
    fightingmemory: {
		name: "Fighting Memory",
		spritenum: 668,
		onMemory: 'Fighting',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === -140) || pokemon.baseSpecies.num === -140) {
				return false;
			}
			return true;
		},
		forcedForme: "Chrienmor-Fighting",
		itemUser: ["Chrienmor-Fighting"],
		num: 904,
		gen: 7,
	},
    firememory: {
		name: "Fire Memory",
		spritenum: 676,
		onMemory: 'Fire',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === -140) || pokemon.baseSpecies.num === -140) {
				return false;
			}
			return true;
		},
		forcedForme: "Chrienmor-Fire",
		itemUser: ["Chrienmor-Fire"],
		num: 912,
		gen: 7,
	},
    flyingmemory: {
		name: "Flying Memory",
		spritenum: 669,
		onMemory: 'Flying',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === -140) || pokemon.baseSpecies.num === -140) {
				return false;
			}
			return true;
		},
		forcedForme: "Chrienmor-Flying",
		itemUser: ["Chrienmor-Flying"],
		num: 905,
		gen: 7,
	},
    ghostmemory: {
		name: "Ghost Memory",
		spritenum: 674,
		onMemory: 'Ghost',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === -140) || pokemon.baseSpecies.num === -140) {
				return false;
			}
			return true;
		},
		forcedForme: "Chrienmor-Ghost",
		itemUser: ["Chrienmor-Ghost"],
		num: 910,
		gen: 7,
	},
    grassmemory: {
		name: "Grass Memory",
		spritenum: 678,
		onMemory: 'Grass',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === -140) || pokemon.baseSpecies.num === -140) {
				return false;
			}
			return true;
		},
		forcedForme: "Chrienmor-Grass",
		itemUser: ["Chrienmor-Grass"],
		num: 914,
		gen: 7,
	},
    groundmemory: {
		name: "Ground Memory",
		spritenum: 671,
		onMemory: 'Ground',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === -140) || pokemon.baseSpecies.num === -140) {
				return false;
			}
			return true;
		},
		forcedForme: "Chrienmor-Ground",
		itemUser: ["Chrienmor-Ground"],
		num: 907,
		gen: 7,
	},
    icememory: {
		name: "Ice Memory",
		spritenum: 681,
		onMemory: 'Ice',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === -140) || pokemon.baseSpecies.num === -140) {
				return false;
			}
			return true;
		},
		forcedForme: "Chrienmor-Ice",
		itemUser: ["Chrienmor-Ice"],
		num: 917,
		gen: 7,
	},
    poisonmemory: {
		name: "Poison Memory",
		spritenum: 670,
		onMemory: 'Poison',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === -140) || pokemon.baseSpecies.num === -140) {
				return false;
			}
			return true;
		},
		forcedForme: "Chrienmor-Poison",
		itemUser: ["Chrienmor-Poison"],
		num: 906,
		gen: 7,
	},
    psychicmemory: {
		name: "Psychic Memory",
		spritenum: 680,
		onMemory: 'Psychic',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === -140) || pokemon.baseSpecies.num === -140) {
				return false;
			}
			return true;
		},
		forcedForme: "Chrienmor-Psychic",
		itemUser: ["Chrienmor-Psychic"],
		num: 916,
		gen: 7,
	},
    rockmemory: {
		name: "Rock Memory",
		spritenum: 672,
		onMemory: 'Rock',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === -140) || pokemon.baseSpecies.num === -140) {
				return false;
			}
			return true;
		},
		forcedForme: "Chrienmor-Rock",
		itemUser: ["Chrienmor-Rock"],
		num: 908,
		gen: 7,
	},
    steelmemory: {
		name: "Steel Memory",
		spritenum: 675,
		onMemory: 'Steel',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === -140) || pokemon.baseSpecies.num === -140) {
				return false;
			}
			return true;
		},
		forcedForme: "Chrienmor-Steel",
		itemUser: ["Chrienmor-Steel"],
		num: 911,
		gen: 7,
	},
    watermemory: {
		name: "Water Memory",
		spritenum: 677,
		onMemory: 'Water',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === -140) || pokemon.baseSpecies.num === -140) {
				return false;
			}
			return true;
		},
		forcedForme: "Chrienmor-Water",
		itemUser: ["Chrienmor-Water"],
		num: 913,
		gen: 7,
	},
	primorhythiumz: {
		name: "Primorhythium Z",
		spritenum: 655,
		onTakeItem: false,
		zMove: "Freestyle Tsunami",
		zMoveFrom: "Scald",
		itemUser: ["Primorhythm"],
		num: 803,
		gen: 7,
		isNonstandard: "Past",
	},
};
