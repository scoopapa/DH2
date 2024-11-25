export const Moves: import('../../../sim/dex-moves').ModdedMoveDataTable = {
	wingattack: {
    	inherit: true,
		basePower: 75,
	},
	leafblade: {
    	inherit: true,
		basePower: 85,
	},
	hail: {
		num: 258,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "For 5 turns, hail falls. Ice: 1.5x SpA.",
		isNonstandard: null,
		name: "Hail",
		pp: 10,
		priority: 0,
		flags: {metronome: 1},
		weather: 'snow',
		secondary: null,
		target: "all",
		type: "Ice",
		zMove: {boost: {spe: 1}},
		contestType: "Beautiful",
	},
	blizzard: {
		num: 59,
		accuracy: 70,
		basePower: 110,
		category: "Special",
		shortDesc: "Can't miss in Hail.",
		name: "Blizzard",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, wind: 1},
		onModifyMove(move) {
			if (this.field.isWeather(['hail', 'snow'])) move.accuracy = true;
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Ice",
		contestType: "Beautiful",
	},
	meanlook: {
		num: 212,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Mean Look",
		pp: 5,
		priority: 0,
		flags: {reflectable: 1, mirror: 1, metronome: 1},
		onHit(target, source, move) {
  			if (!target.hasAbility('runaway')) {
				return target.addVolatile('trapped', source, move, 'trapper');
			}
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		zMove: {boost: {spd: 1}},
		contestType: "Beautiful",
	},
	watershuriken: {
    	inherit: true,
		shortDesc: "Hits 3 times. High critical hit ratio.",
		pp: 5,
		category: "Special",
		gen: 3,
		multihit: 3,
		critRatio: 2,
		isNonstandard: null,
	},
	spikyshield: {
    	inherit: true,
		gen: 3,
		isNonstandard: null,
	},
	mysticalfire: {
    	inherit: true,
		basePower: 75,
		gen: 3,
		isNonstandard: null,
	},
	glare: {
    	inherit: true,
		accuracy: 100,
	},
	bulletpunch: {
    	inherit: true,
		gen: 3,
		isNonstandard: null,
	},
	healingwish: {
    	inherit: true,
		gen: 3,
		isNonstandard: null,
	},
	obstruct: {
    	inherit: true,
		gen: 3,
		isNonstandard: null,
	},
	rockpolish: {
    	inherit: true,
		gen: 3,
		isNonstandard: null,
	},
	poisonfang: {
    	inherit: true,
		shortDesc: "50% chance to badly poison foe.",
		secondary: {
			chance: 50,
			status: 'tox',
		},
	},
	volttackle: {
    	inherit: true,
		shortDesc: "Has 33% recoil. 30% chance to paralyze foe.",
		secondary: {
			chance: 30,
			status: 'par',
		},
	},
	wrathrush: {
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		shortDesc: "Has 33% recoil. 30% chance to burn foe.",
		viable: true,
		name: "Wrath Rush",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Outrage", target);
		},
		recoil: [33, 100],
		secondary: {
			chance: 30,
			status: 'brn',
		},
		target: "normal",
		type: "Ghost",
		contestType: "Tough",
	},
	shelltrap: {
    	inherit: true,
		gen: 3,
		isNonstandard: null,
	},
};
