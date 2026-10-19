export const Items: {[itemid: string]: ModdedItemData} = {
	
	// So Arceus-Origin and Arcana can't lose plates
	dracoplate: {
		inherit: true,
		onTakeItem(item, pokemon, source) {
			if (((source && source.baseSpecies.num === 1001) || pokemon.baseSpecies.num === 1001) ||
			    ((source && source.baseSpecies.num === 1012) || pokemon.baseSpecies.num === 1012)) {
				return false;
			}
			return true;
		},
	},
	dreadplate: {
		inherit: true,
		onTakeItem(item, pokemon, source) {
			if (((source && source.baseSpecies.num === 1001) || pokemon.baseSpecies.num === 1001) ||
			    ((source && source.baseSpecies.num === 1012) || pokemon.baseSpecies.num === 1012)) {
				return false;
			}
			return true;
		},
	},
	earthplate: {
		inherit: true,
		onTakeItem(item, pokemon, source) {
			if (((source && source.baseSpecies.num === 1001) || pokemon.baseSpecies.num === 1001) ||
			    ((source && source.baseSpecies.num === 1012) || pokemon.baseSpecies.num === 1012)) {
				return false;
			}
			return true;
		},
	},
	fistplate: {
		inherit: true,
		onTakeItem(item, pokemon, source) {
			if (((source && source.baseSpecies.num === 1001) || pokemon.baseSpecies.num === 1001) ||
			    ((source && source.baseSpecies.num === 1012) || pokemon.baseSpecies.num === 1012)) {
				return false;
			}
			return true;
		},
	},
	flameplate: {
		inherit: true,
		onTakeItem(item, pokemon, source) {
			if (((source && source.baseSpecies.num === 1001) || pokemon.baseSpecies.num === 1001) ||
			    ((source && source.baseSpecies.num === 1012) || pokemon.baseSpecies.num === 1012)) {
				return false;
			}
			return true;
		},
	},
	icicleplate: {
		inherit: true,
		onTakeItem(item, pokemon, source) {
			if (((source && source.baseSpecies.num === 1001) || pokemon.baseSpecies.num === 1001) ||
			    ((source && source.baseSpecies.num === 1012) || pokemon.baseSpecies.num === 1012)) {
				return false;
			}
			return true;
		},
	},
	insectplate: {
		inherit: true,
		onTakeItem(item, pokemon, source) {
			if (((source && source.baseSpecies.num === 1001) || pokemon.baseSpecies.num === 1001) ||
			    ((source && source.baseSpecies.num === 1012) || pokemon.baseSpecies.num === 1012)) {
				return false;
			}
			return true;
		},
	},
	ironplate: {
		inherit: true,
		onTakeItem(item, pokemon, source) {
			if (((source && source.baseSpecies.num === 1001) || pokemon.baseSpecies.num === 1001) ||
			    ((source && source.baseSpecies.num === 1012) || pokemon.baseSpecies.num === 1012)) {
				return false;
			}
			return true;
		},
	},
	meadowplate: {
		inherit: true,
		onTakeItem(item, pokemon, source) {
			if (((source && source.baseSpecies.num === 1001) || pokemon.baseSpecies.num === 1001) ||
			    ((source && source.baseSpecies.num === 1012) || pokemon.baseSpecies.num === 1012)) {
				return false;
			}
			return true;
		},
	},
	mindplate: {
		inherit: true,
		onTakeItem(item, pokemon, source) {
			if (((source && source.baseSpecies.num === 1001) || pokemon.baseSpecies.num === 1001) ||
			    ((source && source.baseSpecies.num === 1012) || pokemon.baseSpecies.num === 1012)) {
				return false;
			}
			return true;
		},
	},
	pixieplate: {
		inherit: true,
		onTakeItem(item, pokemon, source) {
			if (((source && source.baseSpecies.num === 1001) || pokemon.baseSpecies.num === 1001) ||
			    ((source && source.baseSpecies.num === 1012) || pokemon.baseSpecies.num === 1012)) {
				return false;
			}
			return true;
		},
	},
	skyplate: {
		inherit: true,
		onTakeItem(item, pokemon, source) {
			if (((source && source.baseSpecies.num === 1001) || pokemon.baseSpecies.num === 1001) ||
			    ((source && source.baseSpecies.num === 1012) || pokemon.baseSpecies.num === 1012)) {
				return false;
			}
			return true;
		},
	},
	splashplate: {
		inherit: true,
		onTakeItem(item, pokemon, source) {
			if (((source && source.baseSpecies.num === 1001) || pokemon.baseSpecies.num === 1001) ||
			    ((source && source.baseSpecies.num === 1012) || pokemon.baseSpecies.num === 1012)) {
				return false;
			}
			return true;
		},
	},
	spookyplate: {
		inherit: true,
		onTakeItem(item, pokemon, source) {
			if (((source && source.baseSpecies.num === 1001) || pokemon.baseSpecies.num === 1001) ||
			    ((source && source.baseSpecies.num === 1012) || pokemon.baseSpecies.num === 1012)) {
				return false;
			}
			return true;
		},
	},
	stoneplate: {
		inherit: true,
		onTakeItem(item, pokemon, source) {
			if (((source && source.baseSpecies.num === 1001) || pokemon.baseSpecies.num === 1001) ||
			    ((source && source.baseSpecies.num === 1012) || pokemon.baseSpecies.num === 1012)) {
				return false;
			}
			return true;
		},
	},
	toxicplate: {
		inherit: true,
		onTakeItem(item, pokemon, source) {
			if (((source && source.baseSpecies.num === 1001) || pokemon.baseSpecies.num === 1001) ||
			    ((source && source.baseSpecies.num === 1012) || pokemon.baseSpecies.num === 1012)) {
				return false;
			}
			return true;
		},
	},
	zapplate: {
		inherit: true,
		onTakeItem(item, pokemon, source) {
			if (((source && source.baseSpecies.num === 1001) || pokemon.baseSpecies.num === 1001) ||
			    ((source && source.baseSpecies.num === 1012) || pokemon.baseSpecies.num === 1012)) {
				return false;
			}
			return true;
		},
	},
	
}
