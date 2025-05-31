export const Items: {[itemid: string]: ModdedItemData} = {
	summerbackdoor: {
		name: "Summer Backdoor",
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 5) || pokemon.baseSpecies.num === 5) {
				return false;
			}
			return true;
		},
		itemUser: ["Cirno-Tanned"],
	},
	jeweledpagoda: {
		name: "Jeweled Pagoda",
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Fairy') {
				return this.chainModify(1.5);
			}
		},
		itemUser: ["Nazrin", "Shou Toramaru"],
	},
	
	
	//vanilla
	boosterenergy: {
		inherit: true,
		onUpdate(pokemon) {
			if (!this.effectState.started || pokemon.transformed) return;

			if (pokemon.hasAbility('protosynthesis') && !this.field.isWeather('sunnyday') && pokemon.useItem()) {
				pokemon.addVolatile('protosynthesis');
			}
			if (pokemon.hasAbility('quarkdrive') && !this.field.isTerrain('electricterrain') && pokemon.useItem()) {
				pokemon.addVolatile('quarkdrive');
			}
			if (pokemon.hasAbility('cactusdrive') && !this.field.isTerrain('grassyterrain') && pokemon.useItem()) {
				pokemon.addVolatile('cactusdrive');
			}
		},
	},
	dracoplate: {
		inherit: true,
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 38) || pokemon.baseSpecies.num === 38) {
				return false;
			}
			return true;
		},
	},
	dreadplate: {
		inherit: true,
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 38) || pokemon.baseSpecies.num === 38) {
				return false;
			}
			return true;
		},
	},
	earthplate: {
		inherit: true,
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 38) || pokemon.baseSpecies.num === 38) {
				return false;
			}
			return true;
		},
	},
	fistplate: {
		inherit: true,
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 38) || pokemon.baseSpecies.num === 38) {
				return false;
			}
			return true;
		},
	},
	flameplate: {
		inherit: true,
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 38) || pokemon.baseSpecies.num === 38) {
				return false;
			}
			return true;
		},
	},
	icicleplate: {
		inherit: true,
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 38) || pokemon.baseSpecies.num === 38) {
				return false;
			}
			return true;
		},
	},
	insectplate: {
		inherit: true,
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 38) || pokemon.baseSpecies.num === 38) {
				return false;
			}
			return true;
		},
	},
	ironplate: {
		inherit: true,
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 38) || pokemon.baseSpecies.num === 38) {
				return false;
			}
			return true;
		},
	},
	meadowplate: {
		inherit: true,
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 38) || pokemon.baseSpecies.num === 38) {
				return false;
			}
			return true;
		},
	},
	mindplate: {
		inherit: true,
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 38) || pokemon.baseSpecies.num === 38) {
				return false;
			}
			return true;
		},
	},
	pixieplate: {
		inherit: true,
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 38) || pokemon.baseSpecies.num === 38) {
				return false;
			}
			return true;
		},
	},
	skyplate: {
		inherit: true,
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 38) || pokemon.baseSpecies.num === 38) {
				return false;
			}
			return true;
		},
	},
	splashplate: {
		inherit: true,
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 38) || pokemon.baseSpecies.num === 38) {
				return false;
			}
			return true;
		},
	},
	spookyplate: {
		inherit: true,
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 38) || pokemon.baseSpecies.num === 38) {
				return false;
			}
			return true;
		},
	},
	stoneplate: {
		inherit: true,
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 38) || pokemon.baseSpecies.num === 38) {
				return false;
			}
			return true;
		},
	},
	toxicplate: {
		inherit: true,
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 38) || pokemon.baseSpecies.num === 38) {
				return false;
			}
			return true;
		},
	},
	zapplate: {
		inherit: true,
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 38) || pokemon.baseSpecies.num === 38) {
				return false;
			}
			return true;
		},
	},
}
