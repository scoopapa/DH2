export const Items: import('../../../sim/dex-items').ModdedItemDataTable = {
  cornerstonemask: {
		name: "Cornerstone Mask",
		spritenum: 758,
		fling: {
			basePower: 60,
		},
		onStart(pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Ogerpon') {
	  			if (pokemon.side.sideConditions['teraused']) {
	  				pokemon.canTerastallize = null;
	  			} else {
	        		pokemon.canTerastallize = this.actions.canTerastallize(pokemon);
	  			}
      	}
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (user.baseSpecies.name.startsWith('Ogerpon-Cornerstone')) {
				return this.chainModify([4915, 4096]);
			}
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Ogerpon') return false;
			return true;
		},
		forcedForme: "Ogerpon-Cornerstone",
		itemUser: ["Ogerpon-Cornerstone"],
		num: 2406,
		gen: 9,
	},
	hearthflamemask: {
		name: "Hearthflame Mask",
		spritenum: 760,
		fling: {
			basePower: 60,
		},
		onStart(pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Ogerpon') {
	  			if (pokemon.side.sideConditions['teraused']) {
	  				pokemon.canTerastallize = null;
	  			} else {
	        		pokemon.canTerastallize = this.actions.canTerastallize(pokemon);
	  			}
      	}
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (user.baseSpecies.name.startsWith('Ogerpon-Hearthflame')) {
				return this.chainModify([4915, 4096]);
			}
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Ogerpon') return false;
			return true;
		},
		forcedForme: "Ogerpon-Hearthflame",
		itemUser: ["Ogerpon-Hearthflame"],
		num: 2408,
		gen: 9,
	},
	wellspringmask: {
		name: "Wellspring Mask",
		spritenum: 759,
		fling: {
			basePower: 60,
		},
		onStart(pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Ogerpon') {
	  			if (pokemon.side.sideConditions['teraused']) {
	  				pokemon.canTerastallize = null;
	  			} else {
	        		pokemon.canTerastallize = this.actions.canTerastallize(pokemon);
	  			}
      	}
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (user.baseSpecies.name.startsWith('Ogerpon-Wellspring')) {
				return this.chainModify([4915, 4096]);
			}
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Ogerpon') return false;
			return true;
		},
		forcedForme: "Ogerpon-Wellspring",
		itemUser: ["Ogerpon-Wellspring"],
		num: 2407,
		gen: 9,
	},
	terashard: {
		name: "Tera Shard",
		spritenum: 658,
		onTakeItem: false,
		onStart(pokemon) {
			if (['Ogerpon', 'Skeledirge', 'Samurott', 'Tinkaton', 'Pincurchin', 'Metagross', 'Blissey', 'Pawmot', 'Hydrapple', 'Mabosstiff', 'Flygon', 'Iron Leaves', 'Clodsire', 'Weezing', 'Volcanion', 'Meowscarada', 'Okidogi', 'Munkidori', 'Fezandipiti', 'Basculegion', 'Diancie', 'Kleavor', 'Goodra', 'Avalugg', 'Hawlucha', 'Primarina', 'Dragonite', 'Farigiraf', 'Blaziken', 'Palafin', 'Snorlax', 'Iron Crown', 'Leavanny'].includes(pokemon.baseSpecies.baseSpecies)) {
	  			if (pokemon.side.sideConditions['teraused']) {
	  				pokemon.canTerastallize = null;
	  			} else {
	        		pokemon.canTerastallize = this.actions.canTerastallize(pokemon);
	  			}
      	}
		},
		itemUser: ["Ogerpon", "Skeledirge", "Samurott-Hisui", "Tinkaton", "Pincurchin", "Metagross", "Blissey", "Pawmot", "Hydrapple", "Mabosstiff", "Flygon", "Iron Leaves", "Clodsire", "Weezing-Galar", "Volcanion", "Meowscarada", "Okidogi", "Munkidori", "Fezandipiti", "Basculegion-F", "Diancie", "Kleavor", "Goodra", "Avalugg", "Hawlucha", "Primarina", "Dragonite", "Farigiraf", "Blaziken", "Palafin", "Snorlax", "Iron Crown", "Leavanny"],
		num: -1001,
		gen: 9,
		desc: "Allows certain Pokemon to Terastallize.",
    	rating: 3,
	},
	pokeball: {
		name: "Poke Ball",
		spritenum: 345,
		onTakeItem: false,
		onStart(pokemon) {
			if (['Ogerpon', 'Skeledirge', 'Samurott', 'Tinkaton', 'Pincurchin', 'Metagross', 'Blissey', 'Pawmot', 'Hydrapple', 'Mabosstiff', 'Flygon', 'Iron Leaves', 'Clodsire', 'Weezing', 'Volcanion', 'Meowscarada', 'Okidogi', 'Munkidori', 'Fezandipiti', 'Basculegion', 'Diancie', 'Kleavor', 'Goodra', 'Avalugg', 'Hawlucha', 'Primarina', 'Dragonite', 'Farigiraf', 'Blaziken', 'Palafin', 'Snorlax', 'Iron Crown', 'Leavanny'].includes(pokemon.baseSpecies.baseSpecies)) {
	  			if (pokemon.side.sideConditions['teraused']) {
	  				pokemon.canTerastallize = null;
	  			} else {
	        		pokemon.canTerastallize = this.actions.canTerastallize(pokemon);
	  			}
      	}
		},
		num: 4,
		gen: 1,
		isPokeball: true,
		desc: "Allows certain Pokemon to Terastallize.",
    	rating: 3,
	},
	stellarorb: {
		name: "Stellar Orb",
		spritenum: 742,
		fling: {
			basePower: 60,
		},
		onStart(pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Terapagos') {
	  			if (pokemon.side.sideConditions['teraused']) {
	  				pokemon.canTerastallize = null;
	  			} else {
	        		pokemon.canTerastallize = this.actions.canTerastallize(pokemon);
	  			}
      	}
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Terapagos') return false;
			return true;
		},
		itemUser: ["Terapagos", "Terapagos-Terastal"],
		num: -1002,
		gen: 9,
		desc: "Terapagos: Terastallize to gain Stellar form and Teraform Zero.",
	},
};
