export const Moves: import('../../../sim/dex-moves').ModdedMoveDataTable = {
	gastroacid: {
		inherit: true,
		condition: {
			// Ability suppression implemented in Pokemon.ignoringAbility() within sim/pokemon.js
			onStart(pokemon) {
				this.add('-endability', pokemon);
				this.singleEvent('End', pokemon.getAbility(), pokemon.abilityState, pokemon, pokemon, 'gastroacid');
				if (pokemon.m.innates) {
					for (const innate of pokemon.m.innates) {
						pokemon.removeVolatile("ability" + innate);
					}
				}
			},
		},
	},
	
	//Banned Moves
	batonpass: {
		inherit: true,
		isNonstandard: "Past",
	},
	lastrespect: {
		inherit: true,
		isNonstandard: "Past",
	},
	shedtail: {
		inherit: true,
		isNonstandard: "Past",
	},
	earthpower: {
		inherit: true,
		isNonstandard: "Past",
	},
	flipturn: {
		inherit: true,
		isNonstandard: "Past",
	},
	freezedry: {
		inherit: true,
		isNonstandard: "Past",
	},
	icebeam: {
		inherit: true,
		isNonstandard: "Past",
	},
	knockoff: {
		inherit: true,
		isNonstandard: "Past",
	},
	spikes: {
		inherit: true,
		isNonstandard: "Past",
	},
	taunt: {
		inherit: true,
		isNonstandard: "Past",
	},
	thunderwave: {
		inherit: true,
		isNonstandard: "Past",
	},
	toxic: {
		inherit: true,
		isNonstandard: "Past",
	},
	voltswitch: {
		inherit: true,
		isNonstandard: "Past",
	},
	focusblast: {
		inherit: true,
		isNonstandard: "Past",
	},
	glare: {
		inherit: true,
		isNonstandard: "Past",
	},
	stickyweb: {
		inherit: true,
		isNonstandard: "Past",
	},
	closecombat: {
		inherit: true,
		isNonstandard: "Past",
	},
	dragondance: {
		inherit: true,
		isNonstandard: "Past",
	},
	meteorbeam: {
		inherit: true,
		isNonstandard: "Past",
	},
	roost: {
		inherit: true,
		isNonstandard: "Past",
	},
	scaleshot: {
		inherit: true,
		isNonstandard: "Past",
	},
	stealthrock: {
		inherit: true,
		isNonstandard: "Past",
	},
	terablast: {
		inherit: true,
		isNonstandard: "Past",
	},
	dracometeor: {
		inherit: true,
		isNonstandard: "Past",
	},
	bellydrum: {
		inherit: true,
		isNonstandard: "Past",
	},
	calmmind: {
		inherit: true,
		isNonstandard: "Past",
	},
	nastyplot: {
		inherit: true,
		isNonstandard: "Past",
	},
};
