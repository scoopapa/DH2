"use strict";Object.defineProperty(exports, "__esModule", {value: true}); const Items = {
	flyingmemory: {
		name: "Flying Memory",
		spritenum: 669,
		onMemory: 'Flying',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.id === "shayminsky") || pokemon.baseSpecies.id === "shayminsky") {
				return false;
			}
			return true;
		},
		forcedForme: "Shaymin-Sky",
		itemUser: ["Shaymin-Sky"],
		num: 905,
		gen: 7,
		desc: "Holder's Multi-Attack is Flying type. Shaymin holding this will enter battle as Shaymin-Sky",
	},
}; exports.Items = Items;
