export const Moves: {[moveid: string]: MoveData} = {
	dazzlinghorn: {
		accuracy: 100,
		basePower: 95,
		category: "Special",
		name: "Dazzling Horn",
		shortDesc: "Has 25% recoil.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Flash", target);
		},
		recoil: [25, 100],
		secondary: null,
		target: "normal",
		type: "Fairy",
		contestType: "Tough",
	},
	auraspur: {
		accuracy: 100,
		basePower: 90,
		category: "Special",
		name: "Absorb",
		shortDesc: "User recovers 50% of the damage dealt.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, heal: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Horn Leech", target);
		},
		drain: [1, 2],
		secondary: null,
		target: "normal",
		type: "Fighting",
		contestType: "Clever",
	},
	oilchange: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Oil Change",
		shortDesc: "User heals HP equal to its Speed.",
		pp: 5,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Shift Gear", target);
		},
		onHit(target, source) {
			const spe = source.getStat('spe', false, true);
			return !!this.heal(spe, source, target);
		},
		secondary: null,
		target: "self",
		type: "Steel",
	},
	crystalwash: {
		accuracy: 100,
		basePower: 90,
		category: "Special",
		name: "Crystal Wash",
		shortDesc: "30% chance to poison the target.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Muddy Water", target);
		},
		secondary: {
			chance: 30,
			status: 'psn',
		},
		target: "normal",
		type: "Rock",
	},
	bubbleball: {
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		name: "Bubble Ball",
		shortDesc: "User recovers 75% of the damage dealt.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, heal: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Weather Ball", target);
		},
		drain: [3, 4],
		secondary: null,
		target: "normal",
		type: "Water",
	},
};