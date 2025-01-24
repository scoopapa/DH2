export const Moves: {[k: string]: ModdedMoveData} = {
	crosscutter: {
		num: -1,
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		name: "Cross Cutter",
		pp: 25,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		critRatio: 3,
		shortDesc: "High critical hit ratio.",
		secondary: null,
		target: "normal",
		type: "Bug",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "X-Scissor", target);
		},
	},
	windride: {
		num: -2,
		accuracy: 95,
		basePower: 100,
		category: "Physical",
		name: "Wind Ride",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 10,
			status: 'frz'
		},
		shortDesc: "30% chance to freeze.",
		target: "normal",
		type: "Flying",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Dragon Ascent", target);
		},
	},
	brightmoss: {
		num: -3,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Bright Moss",
		pp: 20,
		priority: 0,
		flags: {mirror: 1},
		self: {
			boosts: {
				accuracy: 1
			}
		},
		secondary: null,
		shortDesc: "Raises accuracy by 1 stage.",
		target: "self",
		type: "Grass",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Tail Glow", source);
		},
	},
	coinhurl: {
		num: -4,
		accuracy: 100,
		basePower: 150,
		category: "Physical",
		name: "Coin Hurl",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		shortDesc: "Power varies depending on money.",
		target: "normal",
		type: "Normal",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Pay Day", target);
		},
	},
	megaphone: {
		num: -5,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Megaphone",
		pp: 40,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, sound: 1},
		boosts: {
			spa: -1
		},
		secondary: null,
		shortDesc: "Lowers the target's Special Attack by 1 stage.",
		target: "normal",
		type: "Normal",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Chatter", target);
		},
	},
	// Unfinished
	// uproot: {
		// num: -6,
	// },
	synchronize: {
		num: -7,
		accuracy: 100,
		basePower: 0,
		category: "Special",
		name: "Synchronize",
		pp: 10,
		priority: -1,
		flags: {protect: 1},
		// copied Mirror Coat gen2 code and adjusted it
		damageCallback(pokemon, target) {
			const lastAttackedBy = pokemon.getLastAttackedBy();
			if (!lastAttackedBy?.move || !lastAttackedBy.thisTurn) return false;

			if (target.lastMove?.id !== 'sleeptalk') {
				return lastAttackedBy.damage;
			}
			return false;
		},
		shortDesc: "Deals equal damage to the opponent what was taken. -1 priority.",
		type: "Psychic",
		target: "normal",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Night Shade", target);
		},
	},
	rockhead: {
		num: -8,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Rock Head",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			volatileStatus: 'flinch',
		},
		shortDesc: "30% chance to make the target flinch.",
		target: "normal",
		type: "Rock",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Iron Head", target);
		},
	},
	rockslash: {
		num: -9,
		accuracy: 80,
		basePower: 100,
		category: "Physical",
		name: "Rock Slash",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		shortDesc: "No additional effect.",
		secondary: null,
		target: "normal",
		type: "Rock",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Slash", target);
		},
	},
	uppercut: {
		num: -14,
		accuracy: 80,
		basePower: 55,
		category: "Physical",
		name: "Uppercut",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		shortDesc: "30% chance to make the target flinch.",
		secondary: {
			chance: 30,
			volatileStatus: 'flinch',
		},
		target: "normal",
		type: "Fighting",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Sky Uppercut", target);
		},
	},
	strongarm: {
		num: -16,
		accuracy: 90,
		basePower: 75,
		category: "Physical",
		name: "Strong Arm",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		shortDesc: "30% chance to raise attack by 1 stage.",
		secondary: {
			chance: 10,
			self: {
				boosts: {
					atk: 1,
				},
			}
		},
		target: "normal",
		type: "Steel",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hammer Arm", target);
		},
	},
	// bounce: {
	// 	num: -11,
	// 	shortDesc: "",
	// },
	// watersport: {
	// 	num: -12,
	// }
	//FAIRY
	dazzlinggleam: {
		num: -10,
		inherit: true
	},
	disarmingvoice: {
		num: -13,
		inherit: true
	},
	drainingkiss: {
		num: -11,
		inherit: true
	},
	fairywind: {
		num: -12,
		inherit: true		
	},
	playrough: {
		num: -15,
		inherit: true
	},
	charm: {
		inherit: true,
		type: "Fairy"
	},
	sweetkiss: {
		inherit: true,
		type: "Fairy"
	},
};
