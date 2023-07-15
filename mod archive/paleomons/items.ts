export const Items: {[itemid: string]: ItemData} = {
	spinollite: {
		name: "Spinollite",
		spritenum: 624,
		megaStone: "Spinollina-Mega",
		megaEvolves: "Spinollina",
		itemUser: ["Spinollina"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -100,
		shortDesc: "If held by a Spinollina, this item allows it to Mega Evolve in battle.",
		//isNonstandard: "Past",
	},

	// technically these don't actually *do* anything, since the holder needs to be the base form in order for runPrimal
	// to be called. But whatever, if its ever decided that the forme change should activate then the codes
	// already there lol
	spectralorb: {
		name: "Spectral Orb",
		spritenum: 41,
		onSwitchIn(pokemon) {
			if (pokemon.isActive && pokemon.baseSpecies.name === 'Plusle') {
				this.queue.insertChoice({choice: 'runPrimal', pokemon: pokemon});
			}
		},
		onPrimal(pokemon) {
			pokemon.formeChange('Plusle-Primal', this.effect, true);
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Plusle') return false;
			return true;
		},
		itemUser: ["Plusle"],
		num: -101,
		gen: 6,
		shortDesc: "If held by Plusle, this item triggers its Primal Reversion in battle.",
		//isNonstandard: "Past",
	},

	blueorb: {
		name: "Blue Orb",
		spritenum: 41,
		onSwitchIn(pokemon) {
			if ((pokemon.isActive && pokemon.baseSpecies.name === 'Kyogre') || (pokemon.isActive && pokemon.baseSpecies.name === 'Minun')) {
				this.queue.insertChoice({choice: 'runPrimal', pokemon: pokemon});
			}
		},
		onPrimal(pokemon) {
			if (pokemon.baseSpecies.name === 'Kyogre') {
				pokemon.formeChange('Kyogre-Primal', this.effect, true);
			} else if (pokemon.baseSpecies.name === 'Minun') {
				pokemon.formeChange('Minun-Primal', this.effect, true);
			}
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Kyogre' || source.baseSpecies.baseSpecies === 'Minun') return false;
			return true;
		}, 
		itemUser: ["Kyogre", "Minun"],
		num: -102,
		gen: 6,
		shortDesc: "If held by Kyogre or Plusle, this item triggers its Primal Reversion in battle.",
		isNonstandard: "Past",
	},

	petrolorb: {
		name: "Petrol Orb",
		spritenum: 41,
		onSwitchIn(pokemon) {
			if (pokemon.isActive && pokemon.baseSpecies.name === 'Swalot') {
				this.queue.insertChoice({choice: 'runPrimal', pokemon: pokemon});
			}
		},
		onPrimal(pokemon) {
			pokemon.formeChange('Swalot-Primal', this.effect, true);
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Swalot') return false;
			return true;
		},
		itemUser: ["Swalot"],
		num: -103,
		gen: 6,
		shortDesc: "If held by Swalot, this item triggers its Primal Reversion in battle.",
		//isNonstandard: "Past",
	},

	crystalorb: {
		name: "Crystal Orb",
		spritenum: 41,
		onSwitchIn(pokemon) {
			if (pokemon.isActive && pokemon.baseSpecies.name === 'Hariyama') {
				this.queue.insertChoice({choice: 'runPrimal', pokemon: pokemon});
			}
		},
		onPrimal(pokemon) {
			pokemon.formeChange('Hariyama-Primal', this.effect, true);
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Hariyama') return false;
			return true;
		},
		itemUser: ["Hariyama"],
		num: -104,
		gen: 6,
		shortDesc: "If held by Hariyama, this item triggers its Primal Reversion in battle.",
		//isNonstandard: "Past",
	},

	blackorb: {
		name: "Black Orb",
		spritenum: 41,
		onSwitchIn(pokemon) {
			if (pokemon.isActive && pokemon.baseSpecies.name === 'Grumpig') {
				this.queue.insertChoice({choice: 'runPrimal', pokemon: pokemon});
			}
		},
		onPrimal(pokemon) {
			pokemon.formeChange('Grumpig-Primal', this.effect, true);
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Grumpig') return false;
			return true;
		},
		itemUser: ["Grumpig"],
		num: -105,
		gen: 6,
		shortDesc: "If held by Grumpig, this item triggers its Primal Reversion in battle.",
		//isNonstandard: "Past",
	},

	trobsidonite: {
		name: "Trobsidonite",
		spritenum: 624,
		megaStone: "Trobsidon-Mega",
		megaEvolves: "Trobsidon",
		itemUser: ["Trobsidon"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -106,
		shortDesc: "If held by a Trobsidon, this item allows it to Mega Evolve in battle.",
		//isNonstandard: "Past",
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
		gen: 8,
		shortDesc: "If held by a Steelix-Crystal, this item allows it to Mega Evolve in battle.",
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
		gen: 8,
		shortDesc: "If held by a Diancie-Cataclysm, this item allows it to Mega Evolve in battle.",
	},
};
