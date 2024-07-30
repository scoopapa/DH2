export const Moves: {[k: string]: ModdedMoveData} = {
	spikecannon: {
		inherit: true,
		isNonstandard: null,
	},
	hiddenpower: {
		inherit: true,
		isNonstandard: null,
	},
	boneclub: {
		inherit: true,
		isNonstandard: null,
	},
	lovelykiss: {
		inherit: true,
		isNonstandard: null,
	},
	bonemerang: {
		inherit: true,
		isNonstandard: null,
	},
	shadowbone: {
		inherit: true,
		isNonstandard: null,
	},
	retrorewindused: {
		shortDesc: "Allows Retro Rewind to be permament.",
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Retro Rewind Used",
		pp: 5,
		priority: 0,
		flags: {},
		sideCondition: 'retrorewindused',
	   condition: {
			onSwitchIn() {
				const source = this.effectState.source;
				 if (!source.fainted) {
					source.addVolatile('retrorewind')
					this.add('-start', source, 'Retro Rewind');
				 }
			},
	   },
		secondary: null,
		target: "normal",
		type: "Normal",
	},
	blastburn: {
		num: 307,
		accuracy: 90,
		basePower: 150,
		category: "Special",
		name: "Blast Burn",
		pp: 5,
		priority: 0,
		flags: {recharge: 1, protect: 1, mirror: 1, metronome: 1},
		self: null,
		onHit(target, source) {
			if (source.volatiles['retrorewind'] && (!target.hp || target.volatiles['substitutle'])) return;
			if (target.hp) {
				source.addVolatile('mustrecharge');
			}
		},
		secondary: null,
		target: "normal",
		type: "Fire",
		contestType: "Beautiful",
	},
	hydrocannon: {
		num: 308,
		accuracy: 90,
		basePower: 150,
		category: "Special",
		name: "Hydro Cannon",
		pp: 5,
		priority: 0,
		flags: {recharge: 1, protect: 1, mirror: 1, metronome: 1},
		self: null,
		onHit(target, source) {
			if (source.volatiles['retrorewind'] && (!target.hp || target.volatiles['substitutle'])) return;
			if (target.hp) {
				source.addVolatile('mustrecharge');
			}
		},
		secondary: null,
		target: "normal",
		type: "Water",
		contestType: "Beautiful",
	},
	hyperbeam: {
		num: 63,
		accuracy: 90,
		basePower: 150,
		category: "Special",
		name: "Hyper Beam",
		pp: 5,
		priority: 0,
		flags: {recharge: 1, protect: 1, mirror: 1, metronome: 1},
		self: null,
		onHit(target, source) {
			if (source.volatiles['retrorewind'] && (!target.hp || target.volatiles['substitutle'])) return;
			if (target.hp) {
				source.addVolatile('mustrecharge');
			}
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Cool",
	},
	meteorassault: {
		num: 794,
		accuracy: 100,
		basePower: 150,
		category: "Physical",
		isNonstandard: null,
		name: "Meteor Assault",
		pp: 5,
		priority: 0,
		flags: {recharge: 1, protect: 1, mirror: 1, failinstruct: 1},
		self: null,
		onHit(target, source) {
			if (source.volatiles['retrorewind'] && (!target.hp || target.volatiles['substitutle'])) return;
			if (target.hp) {
				source.addVolatile('mustrecharge');
			}
		},
		secondary: null,
		target: "normal",
		type: "Fighting",
	},
	prismaticlaser: {
		num: 711,
		accuracy: 100,
		basePower: 160,
		category: "Special",
		name: "Prismatic Laser",
		pp: 10,
		priority: 0,
		flags: {recharge: 1, protect: 1, mirror: 1, metronome: 1},
		self: null,
		onHit(target, source) {
			if (source.volatiles['retrorewind'] && (!target.hp || target.volatiles['substitutle'])) return;
			if (target.hp) {
				source.addVolatile('mustrecharge');
			}
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
		contestType: "Cool",
	},
	roaroftime: {
		num: 459,
		accuracy: 90,
		basePower: 150,
		category: "Special",
		name: "Roar of Time",
		pp: 5,
		priority: 0,
		flags: {recharge: 1, protect: 1, mirror: 1, metronome: 1},
		self: null,
		onHit(target, source) {
			if (source.volatiles['retrorewind'] && (!target.hp || target.volatiles['substitutle'])) return;
			if (target.hp) {
				source.addVolatile('mustrecharge');
			}
		},
		secondary: null,
		target: "normal",
		type: "Dragon",
		contestType: "Beautiful",
	},
	rockwrecker: {
		num: 439,
		accuracy: 90,
		basePower: 150,
		category: "Physical",
		name: "Rock Wrecker",
		pp: 5,
		priority: 0,
		flags: {recharge: 1, protect: 1, mirror: 1, metronome: 1, bullet: 1},
		self: null,
		onHit(target, source) {
			if (source.volatiles['retrorewind'] && (!target.hp || target.volatiles['substitutle'])) return;
			if (target.hp) {
				source.addVolatile('mustrecharge');
			}
		},
		secondary: null,
		target: "normal",
		type: "Rock",
		contestType: "Tough",
	},
	eternabeam: {
		num: 795,
		accuracy: 90,
		basePower: 160,
		category: "Special",
		isNonstandard: "Past",
		name: "Eternabeam",
		pp: 5,
		priority: 0,
		flags: {recharge: 1, protect: 1, mirror: 1},
		self: null,
		onHit(target, source) {
			if (source.volatiles['retrorewind'] && (!target.hp || target.volatiles['substitutle'])) return;
			if (target.hp) {
				source.addVolatile('mustrecharge');
			}
		},
		secondary: null,
		target: "normal",
		type: "Dragon",
	},
	frenzyplant: {
		num: 338,
		accuracy: 90,
		basePower: 150,
		category: "Special",
		name: "Frenzy Plant",
		pp: 5,
		priority: 0,
		flags: {recharge: 1, protect: 1, mirror: 1, nonsky: 1, metronome: 1},
		self: null,
		onHit(target, source) {
			if (source.volatiles['retrorewind'] && (!target.hp || target.volatiles['substitutle'])) return;
			if (target.hp) {
				source.addVolatile('mustrecharge');
			}
		},
		secondary: null,
		target: "normal",
		type: "Grass",
		contestType: "Cool",
	},
	gigaimpact: {
		num: 416,
		accuracy: 90,
		basePower: 150,
		category: "Physical",
		name: "Giga Impact",
		pp: 5,
		priority: 0,
		flags: {contact: 1, recharge: 1, protect: 1, mirror: 1, metronome: 1},
		self: null,
		onHit(target, source) {
			if (source.volatiles['retrorewind'] && (!target.hp || target.volatiles['substitutle'])) return;
			if (target.hp) {
				source.addVolatile('mustrecharge');
			}
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Tough",
	},
};
