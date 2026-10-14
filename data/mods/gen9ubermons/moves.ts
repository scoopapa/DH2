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
	psychoboost: {
		inherit: true,
		basePower: 130,
	},
	geomancy: {
		inherit: true,
		desc: "The user restores 1/2 of its maximum HP, rounded half up.",
		shortDesc: "Heals the user by 50% of its max HP.",
		pp: 5,
		flags: {heal: 1, snatch: 1, metronome: 1},
		onTryMove() {},
		boosts: null,
		type: "Fairy",
		zMove: {effect: 'clearnegativeboost'},
		//zMove: {boost: {atk: 1, def: 1, spa: 1, spd: 1, spe: 1}},
	},
	oblivionwing: {
		inherit: true,
		category: "Physical",
		flags: {contact: 1, protect: 1, mirror: 1, distance: 1, heal: 1, metronome: 1},
	},
	thousandarrows: {
		inherit: true,
		desc: "Hits Fairy-type Pokemon for neutral damage.",
		shortDesc: "Hits Fairy-type Pokemon for neutral damage.",
		onEffectiveness() {},
		volatileStatus: null,
		ignoreImmunity: {'Dragon': true},
		type: "Dragon",
	},
	landswrath: {
		inherit: true,
		category: "Special",
		desc: "This move has a high critical hit ratio.",
		shortDesc: "High crit ratio. Hits adjacent foes.",
		critRatio: 2,
	},
};
