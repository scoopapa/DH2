export const Items: import('../../../sim/dex-items').ModdedItemDataTable = {
	wishingstone: { 
		name: "Wishing Stone",
		spritenum: 22,
		onTakeItem: false,
		zMove: true,
		onSwitchIn(pokemon) {
			if (pokemon.side.sideConditions['dynamaxused']) {
				pokemon.side.dynamaxUsed = true;
			} else {
				pokemon.side.dynamaxUsed = false;				
			}
			if (pokemon.gigantamax && pokemon.side.sideConditions['gmaxused']) {
				pokemon.addVolatile('dynamax');
			}
		},
		onSwitchOut(pokemon) {
			pokemon.side.dynamaxUsed = true;
		},
		onFaint(pokemon) {
			pokemon.side.dynamaxUsed = true;
		},
		num: -1000,
		gen: 9,
		desc: "Allows this the holder to Dynamax.",
		rating: 3,
		itemUser: [
			"Venusaur-Gmax", "Charizard-Gmax", "Blastoise-Gmax", "Butterfree-Gmax", "Pikachu-Gmax", "Meowth-Gmax", "Machamp-Gmax", "Gengar-Gmax", "Kingler-Gmax", "Lapras-Gmax", 
			"Eevee-Gmax", "Snorlax-Gmax", "Garbodor-Gmax", "Melmetal-Gmax", "Rillaboom-Gmax", "Cinderace-Gmax", "Inteleon-Gmax", "Corviknight-Gmax", "Orbeetle-Gmax", "Drednaw-Gmax", 
			"Coalossal-Gmax", "Flapple-Gmax", "Appletun-Gmax", "Sandaconda-Gmax", "Centiskorch-Gmax", "Toxtricity-Gmax", "Toxtricity-Low-Key-Gmax", "Hatterene-Gmax", "Grimmsnarl-Gmax", 
			"Alcremie-Gmax", "Copperajah-Gmax", "Duraludon-Gmax", "Urshifu-Gmax", "Urshifu-Rapid-Strike-Gmax"
		],
	},
	bugmemory: {
		inherit: true,
		isNonstandard: null,
	},
	darkmemory: {
		inherit: true,
		isNonstandard: null,
	},
	dragonmemory: {
		inherit: true,
		isNonstandard: null,
	},
	electricmemory: {
		inherit: true,
		isNonstandard: null,
	},
	fairymemory: {
		inherit: true,
		isNonstandard: null,
	},
	fightingmemory: {
		inherit: true,
		isNonstandard: null,
	},
	firememory: {
		inherit: true,
		isNonstandard: null,
	},
	flyingmemory: {
		inherit: true,
		isNonstandard: null,
	},
	ghostmemory: {
		inherit: true,
		isNonstandard: null,
	},
	grassmemory: {
		inherit: true,
		isNonstandard: null,
	},
	groundmemory: {
		inherit: true,
		isNonstandard: null,
	},
	icememory: {
		inherit: true,
		isNonstandard: null,
	},
	leek: {
		inherit: true,
		isNonstandard: null,
	},
	poisonmemory: {
		inherit: true,
		isNonstandard: null,
	},
	psychicmemory: {
		inherit: true,
		isNonstandard: null,
	},
	rockmemory: {
		inherit: true,
		isNonstandard: null,
	},
	steelmemory: {
		inherit: true,
		isNonstandard: null,
	},
	watermemory: {
		inherit: true,
		isNonstandard: null,
	},
};
