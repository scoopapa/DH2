export const Moves: import('../../../sim/dex-moves').ModdedMoveDataTable = {
	wickedblow: {
		inherit: true,
		basePower: 120,
		desc: "Cannot be selected the turn after it's used.",
		shortDesc: "Cannot be selected the turn after it's used.",
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1, cantusetwice: 1},
		willCrit: null,
	},
	
	darkvoid: {
		inherit: true,
		accuracy: 90,
		basePower: 80,
		category: "Special",
		desc: "The user recovers 1/2 the HP lost by the target, rounded half up. If Big Root is held by the user, the HP recovered is 1.3x normal, rounded half down.",
		shortDesc: "User recovers 50% of the damage dealt.",
		name: "Dark Void",
		pp: 15,
		flags: {heal: 1, protect: 1, mirror: 1, metronome: 1},
		viable: true,
		drain: [1, 2],
		status: null,
		onTry() {},
	},
	kowtowcleave: {
		inherit: true,
		basePower: 80,
		desc: "This move gains 1.3x power if any stat by the user is lowered.",
		shortDesc: "1.3x power if the user has one stat lowered.",
		onBasePower(basePower, pokemon) {
			if (pokemon.boosts.atk < 0 || pokemon.boosts.def < 0 || pokemon.boosts.spa < 0 || pokemon.boosts.spd < 0 || 
				pokemon.boosts.spe < 0 || pokemon.boosts.accuracy < 0 || pokemon.boosts.evasion < 0) {
				return this.chainModify(1.3);
			}
		},
	},
};
