import { inherits } from "util";

export const Moves: { [moveid: string]: ModdedMoveData } = {

	confoundingcrystal: {
		// TODO
		num: -1000,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Confounding Crystal",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1 },
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Tackle', target);
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Tough",
		shortDesc: "Placeholder",
	},
	mineraldrain: {
		// TODO
		num: -1001,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Mineral Drain",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1 },
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Tackle', target);
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Tough",
		shortDesc: "Placeholder",
	},
	nullaurora: {
		// TODO
		num: -1002,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Null Aurora",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1 },
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Tackle', target);
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Tough",
		shortDesc: "Placeholder",
	},
	graverobbing: {
		// TODO
		num: -1003,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Grave Robbing",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1 },
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Tackle', target);
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Tough",
		shortDesc: "Placeholder",
	},
	unityveil: {
		// TODO
		num: -1004,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Unity Veil",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1 },
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Tackle', target);
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Tough",
		shortDesc: "Placeholder",
	},
	conduct: {
		// TODO
		num: -1005,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Conduct",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1 },
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Tackle', target);
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Tough",
		shortDesc: "Placeholder",
	},
	canalsurge: {
		// TODO
		num: -1006,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Canal Surge",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1 },
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Tackle', target);
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Tough",
		shortDesc: "Placeholder",
	},
	stickyfingers: {
		// TODO
		num: -1007,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Sticky Fingers",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1 },
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Tackle', target);
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Tough",
		shortDesc: "Placeholder",
	},
	somnawave: {
		// TODO
		num: -1008,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Somnawave",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1 },
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Tackle', target);
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Tough",
		shortDesc: "Placeholder",
	},
	earthshatteringelegy: {
		// TODO
		num: -1009,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Earth-Shattering Elegy",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1 },
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Tackle', target);
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Tough",
		shortDesc: "Placeholder",
	},
	acidrain: {
		// TODO
		num: -1010,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Acid Rain",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1 },
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Tackle', target);
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Tough",
		shortDesc: "Placeholder",
	},
	
}
