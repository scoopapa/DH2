export const Items: import("../../../sim/dex-items").ModdedItemDataTable = {
	insectplate: {
		inherit: true,
		onTakeItem(item, pokemon, source) {
			if (
				(pokemon.baseSpecies.id === "megaman" && pokemon.ability === "multitype") ||
				(source?.baseSpecies.id === "megaman" && source.ability === "multitype")
			) return false;
			if (source?.baseSpecies.num === 493 || pokemon.baseSpecies.num === 493) return false;
			return true;
		},
	},
	dracoplate: {
		inherit: true,
		onTakeItem(item, pokemon, source) {
			if (
				(pokemon.baseSpecies.id === "megaman" && pokemon.ability === "multitype") ||
				(source?.baseSpecies.id === "megaman" && source.ability === "multitype")
			) return false;
			if (source?.baseSpecies.num === 493 || pokemon.baseSpecies.num === 493) return false;
			return true;
		},
	},
	dreadplate: {
		inherit: true,
		onTakeItem(item, pokemon, source) {
			if (
				(pokemon.baseSpecies.id === "megaman" && pokemon.ability === "multitype") ||
				(source?.baseSpecies.id === "megaman" && source.ability === "multitype")
			) return false;
			if (source?.baseSpecies.num === 493 || pokemon.baseSpecies.num === 493) return false;
			return true;
		},
	},
	earthplate: {
		inherit: true,
		onTakeItem(item, pokemon, source) {
			if (
				(pokemon.baseSpecies.id === "megaman" && pokemon.ability === "multitype") ||
				(source?.baseSpecies.id === "megaman" && source.ability === "multitype")
			) return false;
			if (source?.baseSpecies.num === 493 || pokemon.baseSpecies.num === 493) return false;
			return true;
		},
	},
	fistplate: {
		inherit: true,
		onTakeItem(item, pokemon, source) {
			if (
				(pokemon.baseSpecies.id === "megaman" && pokemon.ability === "multitype") ||
				(source?.baseSpecies.id === "megaman" && source.ability === "multitype")
			) return false;
			if (source?.baseSpecies.num === 493 || pokemon.baseSpecies.num === 493) return false;
			return true;
		},
	},
	flameplate: {
		inherit: true,
		onTakeItem(item, pokemon, source) {
			if (
				(pokemon.baseSpecies.id === "megaman" && pokemon.ability === "multitype") ||
				(source?.baseSpecies.id === "megaman" && source.ability === "multitype")
			) return false;
			if (source?.baseSpecies.num === 493 || pokemon.baseSpecies.num === 493) return false;
			return true;
		},
	},
	icicleplate: {
		inherit: true,
		onTakeItem(item, pokemon, source) {
			if (
				(pokemon.baseSpecies.id === "megaman" && pokemon.ability === "multitype") ||
				(source?.baseSpecies.id === "megaman" && source.ability === "multitype")
			) return false;
			if (source?.baseSpecies.num === 493 || pokemon.baseSpecies.num === 493) return false;
			return true;
		},
	},
	ironplate: {
		inherit: true,
		onTakeItem(item, pokemon, source) {
			if (
				(pokemon.baseSpecies.id === "megaman" && pokemon.ability === "multitype") ||
				(source?.baseSpecies.id === "megaman" && source.ability === "multitype")
			) return false;
			if (source?.baseSpecies.num === 493 || pokemon.baseSpecies.num === 493) return false;
			return true;
		},
	},
	meadowplate: {
		inherit: true,
		onTakeItem(item, pokemon, source) {
			if (
				(pokemon.baseSpecies.id === "megaman" && pokemon.ability === "multitype") ||
				(source?.baseSpecies.id === "megaman" && source.ability === "multitype")
			) return false;
			if (source?.baseSpecies.num === 493 || pokemon.baseSpecies.num === 493) return false;
			return true;
		},
	},
	mindplate: {
		inherit: true,
		onTakeItem(item, pokemon, source) {
			if (
				(pokemon.baseSpecies.id === "megaman" && pokemon.ability === "multitype") ||
				(source?.baseSpecies.id === "megaman" && source.ability === "multitype")
			) return false;
			if (source?.baseSpecies.num === 493 || pokemon.baseSpecies.num === 493) return false;
			return true;
		},
	},
	pixieplate: {
		inherit: true,
		onTakeItem(item, pokemon, source) {
			if (
				(pokemon.baseSpecies.id === "megaman" && pokemon.ability === "multitype") ||
				(source?.baseSpecies.id === "megaman" && source.ability === "multitype")
			) return false;
			if (source?.baseSpecies.num === 493 || pokemon.baseSpecies.num === 493) return false;
			return true;
		},
	},
	skyplate: {
		inherit: true,
		onTakeItem(item, pokemon, source) {
			if (
				(pokemon.baseSpecies.id === "megaman" && pokemon.ability === "multitype") ||
				(source?.baseSpecies.id === "megaman" && source.ability === "multitype")
			) return false;
			if (source?.baseSpecies.num === 493 || pokemon.baseSpecies.num === 493) return false;
			return true;
		},
	},
	splashplate: {
		inherit: true,
		onTakeItem(item, pokemon, source) {
			if (
				(pokemon.baseSpecies.id === "megaman" && pokemon.ability === "multitype") ||
				(source?.baseSpecies.id === "megaman" && source.ability === "multitype")
			) return false;
			if (source?.baseSpecies.num === 493 || pokemon.baseSpecies.num === 493) return false;
			return true;
		},
	},
	spookyplate: {
		inherit: true,
		onTakeItem(item, pokemon, source) {
			if (
				(pokemon.baseSpecies.id === "megaman" && pokemon.ability === "multitype") ||
				(source?.baseSpecies.id === "megaman" && source.ability === "multitype")
			) return false;
			if (source?.baseSpecies.num === 493 || pokemon.baseSpecies.num === 493) return false;
			return true;
		},
	},
	stoneplate: {
		inherit: true,
		onTakeItem(item, pokemon, source) {
			if (
				(pokemon.baseSpecies.id === "megaman" && pokemon.ability === "multitype") ||
				(source?.baseSpecies.id === "megaman" && source.ability === "multitype")
			) return false;
			if (source?.baseSpecies.num === 493 || pokemon.baseSpecies.num === 493) return false;
			return true;
		},
	},
	toxicplate: {
		inherit: true,
		onTakeItem(item, pokemon, source) {
			if (
				(pokemon.baseSpecies.id === "megaman" && pokemon.ability === "multitype") ||
				(source?.baseSpecies.id === "megaman" && source.ability === "multitype")
			) return false;
			if (source?.baseSpecies.num === 493 || pokemon.baseSpecies.num === 493) return false;
			return true;
		},
	},
	zapplate: {
		inherit: true,
		onTakeItem(item, pokemon, source) {
			if (
				(pokemon.baseSpecies.id === "megaman" && pokemon.ability === "multitype") ||
				(source?.baseSpecies.id === "megaman" && source.ability === "multitype")
			) return false;
			if (source?.baseSpecies.num === 493 || pokemon.baseSpecies.num === 493) return false;
			return true;
		},
	},
};
