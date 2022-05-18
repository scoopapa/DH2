export const Moves: {[moveid: string]: MoveData} = {
	triplearrows: {
		num: -1,
		accuracy: 100,
		basePower: 25,
		category: "Special",
		shortDesc: "Hits 3 times. Lowers target's Sp. Def. after the 3rd hit.",
		name: "Triple Arrows",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onHit(target, source, move) {
			if (move.hit === 3) {
				return !!this.boost({spd: -1}, target, source, move);
			}
			return false;
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Thousand Arrows", target);
		},
		multihit: 3,
		secondary: null,
		target: "normal",
		type: "Fighting",
	},
	infernalparade: {
		num: -2,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		shortDesc: "Traps and damages the target for 4-5 turns.",
		name: "Infernal Parade",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hex", target);
		},
		volatileStatus: 'partiallytrapped',
		secondary: null,
		target: "normal",
		type: "Ghost",
	},
	razorshell: {
		inherit: true,
		accuracy: 100,
		basePower: 80,
		shortDesc: "100% chance to lower the target's Defense by 1.",
		pp: 15,
		secondary: {
			chance: 100,
			boosts: {
				def: -1,
			},
		},
	},
	ceaselessedge: {
		num: -3,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		shortDesc: "If this move is not very effective on a target, it sets a layer of Spikes.",
		name: "Ceaseless Edge",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onHit(target, source, move) {
			if (!move || !target) return;
			if (target !== source && move.category !== 'Status' && target.getMoveHitData(move).typeMod < 0) {
				source.side.foe.addSideCondition('spikes');
			}
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Night Slash", target);
		},
		secondary: null,
		target: "normal",
		type: "Dark",
	},
};