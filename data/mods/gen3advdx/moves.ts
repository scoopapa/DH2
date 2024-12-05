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
	futuresight: {
		inherit: true,
		accuracy: 85,
		basePower: 120,
		pp: 5,
		onTry(source, target) {
			if (!target.side.addSlotCondition(target, 'futuremove')) return false;
			const moveData = {
				name: "Future Sight",
				basePower: 120,
				category: "Special",
				flags: {metronome: 1, futuremove: 1},
				willCrit: false,
				type: '???',
			} as unknown as ActiveMove;
			const damage = this.actions.getDamage(source, target, moveData, true);
			Object.assign(target.side.slotConditions[target.position]['futuremove'], {
				duration: 3,
				move: 'futuresight',
				source: source,
				moveData: {
					id: 'futuresight',
					name: "Future Sight",
					accuracy: 85,
					basePower: 0,
					damage: damage,
					category: "Special",
					flags: {metronome: 1, futuremove: 1},
					effectType: 'Move',
					type: '???',
				},
			});
			this.add('-start', source, 'Future Sight');
			return null;
		},
	},
	steelwing: {
    	inherit: true,
		accuracy: 100,
	},
	metalclaw: {
    	inherit: true,
		shortDesc: "50% chance to raise the user's Atk by 1.",
		accuracy: 100,
		secondary: {
			chance: 50,
			self: {
				boosts: {
					atk: 1,
				},
			},
		},
	},
	disable: {
    	inherit: true,
		accuracy: 100,
	},
	razorwind: {
		num: 13,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		shortDesc: "Raises Atk by 1, hits turn 2.",
		name: "Razor Wind",
		pp: 15,
		priority: 0,
		flags: {charge: 1, protect: 1, mirror: 1, metronome: 1, nosleeptalk: 1, failinstruct: 1},
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name);
			this.boost({atk: 1}, attacker, attacker, move);
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
		critRatio: 2,
		secondary: null,
		target: "allAdjacentFoes",
		type: "Flying",
		contestType: "Cool",
	},
	smellingsalts: {
    	inherit: true,
		type: "Rock",
	},
	tailglow: {
    	inherit: true,
		shortDesc: "Raises the user's Sp. Atk by 2.",
	},
};
