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
	twirlingdance: {
		num: -4,
		accuracy: 90,
		basePower: 20,
		basePowerCallback(pokemon, target, move) {
			return 20 * move.hit;
		},
		category: "Physical",
		shortDesc: "Hits 3 times. Each hit can miss, but power rises.",
		name: "Twirling Dance",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Fiery Dance", target);
		},
		multihit: 3,
		multiaccuracy: true,
		secondary: null,
		target: "normal",
		type: "Fire",
	},
	pompomdance: {
		num: -5,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		shortDesc: "Type varies matches the user's primary type. The user is flung into the air.",
		name: "Pom-pom Dance",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, dance: 1},
		onModifyType(move, pokemon) {
			let type = pokemon.types[0];
			if (type === "Bird") type = "???";
			move.type = type;
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Revelation Dance", target);
		},
		self: {
			volatileStatus: 'telekinesis',
		},
		secondary: null,
		target: "normal",
		type: "Normal",
	},
	skirtdance: {
		num: -6,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		shortDesc: "100% chance to lower the target's Sp. Atk by 1.",
		name: "Skirt Dance",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Quiver Dance", target);
		},
		secondary: {
			chance: 100,
			boosts: {
				spa: -1,
			},
		},
		target: "normal",
		type: "Fairy",
	},
	deathlyskirt: {
		num: -7,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		shortDesc: "User recovers 50% of the damage dealt.",
		name: "Deathly Skirt",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, heal: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Night Shade", target);
		},
		drain: [1, 2],
		secondary: null,
		target: "normal",
		type: "Ghost",
	},
	gearup: {
		num: 674,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Raises user's Attack and Sp. Atk by 1; 2 in Electric Terrain.",
		name: "Gear Up",
		pp: 20,
		priority: 0,
		flags: {snatch: 1, authentic: 1},
		onModifyMove(move, pokemon) {
			if (this.field.isTerrain('electricterrain') && pokemon.isGrounded()) move.boosts = {atk: 2, spa: 2};
		},
		boosts: {
			atk: 1,
			spa: 1,
		},
		secondary: null,
		target: "self",
		type: "Steel",
	},
	pollenpuff: {
		num: 676,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		shortDesc: "30% chance to lower the target's Attack by 1 stage.",
		name: "Pollen Puff",
		pp: 15,
		priority: 0,
		flags: {bullet: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			boosts: {
				atk: -1,
			},
		},
		target: "normal",
		type: "Bug",
	},
	geargrind: {
		inherit: true,
		accuracy: 95,
	},
	wickedblow: {
		inherit: true,
		accuracy: 90,
		basePower: 85,
		shortDesc: "Inflicts Torment on the opponent.",
		pp: 10,
		willCrit: null,
		self: {
			onHit(source) {
				for (const pokemon of source.side.foe.active) {
					pokemon.addVolatile('torment');
				}
			},
		},
	},
	surgingstrikes: {
		inherit: true,
		basePower: 20,
		basePowerCallback(pokemon, target, move) {
			return move.basePower + 10 * pokemon.positiveBoosts();
		},
		shortDesc: "+ 10 power for each of the user's stat boosts.",
		pp: 10,
		flags: {contact: 1, protect: 1, mirror: 1},
		willCrit: null,
		multihit: null,
	},
	glacialcharge: {
		num: -8,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		shortDesc: "No additional effect.",
		name: "Glacial Charge",
		pp: 16,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Glacial Lance", target);
		},
		secondary: null,
		target: "normal",
		type: "Ice",
	},
	astralbarrage: {
		inherit: true,
		accuracy: 80,
		basePower: 100,
		shortDesc: "High critical hit ratio.",
		target: "normal",
		type: "Dark",
	},
};