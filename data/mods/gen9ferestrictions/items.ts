export const Items: import('../../../sim/dex-items').ItemDataTable = {
	bugmemory: {
		name: "Bug Memory",
		spritenum: 673,
		onMemory: 'Bug',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 1) || pokemon.baseSpecies.num === 1) {
				return false;
			}
			return true;
		},
		forcedForme: "Silverade-Bug",
		itemUser: ["Silverade-Bug"],
		num: 909,
		gen: 7,
		isNonstandard: null,
	},
	darkmemory: {
		name: "Dark Memory",
		spritenum: 683,
		onMemory: 'Dark',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 1) || pokemon.baseSpecies.num === 1) {
				return false;
			}
			return true;
		},
		forcedForme: "Silverade-Dark",
		itemUser: ["Silverade-Dark"],
		num: 919,
		gen: 7,
		isNonstandard: null,
	},
	dragonmemory: {
		name: "Dragon Memory",
		spritenum: 682,
		onMemory: 'Dragon',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 1) || pokemon.baseSpecies.num === 1) {
				return false;
			}
			return true;
		},
		forcedForme: "Silverade-Dragon",
		itemUser: ["Silverade-Dragon"],
		num: 918,
		gen: 7,
		isNonstandard: null,
	},
	electricmemory: {
		name: "Electric Memory",
		spritenum: 679,
		onMemory: 'Electric',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 1) || pokemon.baseSpecies.num === 1) {
				return false;
			}
			return true;
		},
		forcedForme: "Silverade-Electric",
		itemUser: ["Silverade-Electric"],
		num: 915,
		gen: 7,
		isNonstandard: null,
	},
	fairymemory: {
		name: "Fairy Memory",
		spritenum: 684,
		onMemory: 'Fairy',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 1) || pokemon.baseSpecies.num === 1) {
				return false;
			}
			return true;
		},
		forcedForme: "Silverade-Fairy",
		itemUser: ["Silverade-Fairy"],
		num: 920,
		gen: 7,
		isNonstandard: null,
	},
	fightingmemory: {
		name: "Fighting Memory",
		spritenum: 668,
		onMemory: 'Fighting',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 1) || pokemon.baseSpecies.num === 1) {
				return false;
			}
			return true;
		},
		forcedForme: "Silverade-Fighting",
		itemUser: ["Silverade-Fighting"],
		num: 904,
		gen: 7,
		isNonstandard: null,
	},
	firememory: {
		name: "Fire Memory",
		spritenum: 676,
		onMemory: 'Fire',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 1) || pokemon.baseSpecies.num === 1) {
				return false;
			}
			return true;
		},
		forcedForme: "Silverade-Fire",
		itemUser: ["Silverade-Fire"],
		num: 912,
		gen: 7,
		isNonstandard: null,
	},
	flyingmemory: {
		name: "Flying Memory",
		spritenum: 669,
		onMemory: 'Flying',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 1) || pokemon.baseSpecies.num === 1) {
				return false;
			}
			return true;
		},
		forcedForme: "Silverade-Flying",
		itemUser: ["Silverade-Flying"],
		num: 905,
		gen: 7,
		isNonstandard: null,
	},
	ghostmemory: {
		name: "Ghost Memory",
		spritenum: 674,
		onMemory: 'Ghost',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 1) || pokemon.baseSpecies.num === 1) {
				return false;
			}
			return true;
		},
		forcedForme: "Silverade-Ghost",
		itemUser: ["Silverade-Ghost"],
		num: 910,
		gen: 7,
		isNonstandard: null,
	},
	grassmemory: {
		name: "Grass Memory",
		spritenum: 678,
		onMemory: 'Grass',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 1) || pokemon.baseSpecies.num === 1) {
				return false;
			}
			return true;
		},
		forcedForme: "Silverade-Grass",
		itemUser: ["Silverade-Grass"],
		num: 914,
		gen: 7,
		isNonstandard: null,
	},
	groundmemory: {
		name: "Ground Memory",
		spritenum: 671,
		onMemory: 'Ground',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 1) || pokemon.baseSpecies.num === 1) {
				return false;
			}
			return true;
		},
		forcedForme: "Silverade-Ground",
		itemUser: ["Silverade-Ground"],
		num: 907,
		gen: 7,
		isNonstandard: null,
	},
	icememory: {
		name: "Ice Memory",
		spritenum: 681,
		onMemory: 'Ice',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 1) || pokemon.baseSpecies.num === 1) {
				return false;
			}
			return true;
		},
		forcedForme: "Silverade-Ice",
		itemUser: ["Silverade-Ice"],
		num: 917,
		gen: 7,
		isNonstandard: null,
	},
	poisonmemory: {
		name: "Poison Memory",
		spritenum: 670,
		onMemory: 'Poison',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 1) || pokemon.baseSpecies.num === 1) {
				return false;
			}
			return true;
		},
		forcedForme: "Silverade-Poison",
		itemUser: ["Silverade-Poison"],
		num: 906,
		gen: 7,
		isNonstandard: null,
	},
	psychicmemory: {
		name: "Psychic Memory",
		spritenum: 680,
		onMemory: 'Psychic',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 1) || pokemon.baseSpecies.num === 1) {
				return false;
			}
			return true;
		},
		forcedForme: "Silverade-Psychic",
		itemUser: ["Silverade-Psychic"],
		num: 916,
		gen: 7,
		isNonstandard: null,
	},
	rockmemory: {
		name: "Rock Memory",
		spritenum: 672,
		onMemory: 'Rock',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 1) || pokemon.baseSpecies.num === 1) {
				return false;
			}
			return true;
		},
		forcedForme: "Silverade-Rock",
		itemUser: ["Silverade-Rock"],
		num: 908,
		gen: 7,
		isNonstandard: null,
	},
	steelmemory: {
		name: "Steel Memory",
		spritenum: 675,
		onMemory: 'Steel',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 1) || pokemon.baseSpecies.num === 1) {
				return false;
			}
			return true;
		},
		forcedForme: "Silverade-Steel",
		itemUser: ["Silverade-Steel"],
		num: 911,
		gen: 7,
		isNonstandard: null,
	},
	watermemory: {
		name: "Water Memory",
		spritenum: 677,
		onMemory: 'Water',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 1) || pokemon.baseSpecies.num === 1) {
				return false;
			}
			return true;
		},
		forcedForme: "Silverade-Water",
		itemUser: ["Silverade-Water"],
		num: 913,
		gen: 7,
		isNonstandard: null,
	},
	gyaradosite: {
		name: "Gyaradosite",
		spritenum: 589,
		megaStone: "Gyarafable-Mega",
		megaEvolves: "Gyarafable",
		itemUser: ["Gyarafable"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 676,
		gen: 6,
		isNonstandard: null,
		shortDesc: "If held by a Gyarafable, this item allows it to Mega Evolve in battle.",
	},
	gardevoirite: {
		name: "Gardevoirite",
		spritenum: 587,
		megaStone: "Gardepharos-Mega-X",
		megaEvolves: "Gardepharos",
		itemUser: ["Gardepharos"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 657,
		gen: 6,
		shortDesc: "If held by a Gardepharos, this item allows it to Mega Evolve in battle.",
	},
	ampharosite: {
		name: "Ampharosite",
		spritenum: 580,
		megaStone: "Gardepharos-Mega-Y",
		megaEvolves: "Gardepharos",
		itemUser: ["Gardepharos"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 658,
		gen: 6,
		shortDesc: "If held by a Gardepharos, this item allows it to Mega Evolve in battle.",
	},
	altarianite: {
		name: "Altarianite",
		spritenum: 615,
		megaStone: "Mudsaria-Mega",
		megaEvolves: "Mudsaria",
		itemUser: ["Mudsaria"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 755,
		gen: 6,
		shortDesc: "If held by a Mudsaria, this item allows it to Mega Evolve in battle.",
	},
	salamencite: {
		name: "Salamencite",
		spritenum: 627,
		megaStone: "Buttermence-Mega",
		megaEvolves: "Buttermence",
		itemUser: ["Buttermence"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 769,
		gen: 6,
		shortDesc: "If held by a Buttermence, this item allows it to Mega Evolve in battle.",
	},
};
