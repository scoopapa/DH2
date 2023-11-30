export const Moves: {[moveid: string]: ModdedMoveData} = {
	crystalcutter: {
		name: "Crystal Cutter",
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		pp: 15,
		type: "Crystal",
		shortDesc: "Always crits. User recovers 50% of damage dealt",
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1, slicing: 1},
		target: "normal",
		willCrit: true,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Psycho Cut", target);
		},
		drain: [1, 2],
	},
	crystaltail: {
		name: "Crystal Tail",
		accuracy: 85,
		basePower: 120,
		category: "Physical",
		pp: 5,
		type: "Crystal",
		shortDesc: "20% to lower foe's Atk by 1",
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1},
		target: "normal",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Dragon Tail", target);
		},
		secondary: {
			chance: 20,
			boosts: {
				atk: -1,
			},
		},
	},
	crystalbash: {
		name: "Crystal Bash",
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		pp: 10,
		type: "Crystal",
		shortDesc: "10% to lower foe's Atk by 1",
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1},
		target: "normal",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Iron Head", target);
		},
		secondary: {
			chance: 10,
			boosts: {
				atk: -1,
			},
		},
	},
	crystalbeam: {
		name: "Crystal Beam",
		accuracy: 100,
		basePower: 90,
		category: "Special",
		pp: 15,
		type: "Crystal",
		shortDesc: "30% to lower foe's SpA by 1",
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Aurora Beam", target);
		},
		secondary: {
			chance: 30,
			boosts: {
				spa: -1,
			},
		},
	},
	crystalcage: {
		name: "Crystal Cage",
		accuracy: 85,
		basePower: 85,
		category: "Special",
		pp: 10,
		type: "Crystal",
		shortDesc: "Traps and damages for 4-5 turns.",
		priority: 0,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Diamond Storm", target);
		},
		flags: {protect: 1, mirror: 1},
		volatileStatus: 'partiallytrapped',
		target: "normal",
		secondary: null,
	},
	crystalburst: {
		accuracy: 100,
		basePower: 120,
		category: "Special",
		name: "Crystal Burst",
		pp: 5,
		shortDesc: "Lower's user's SpA by 1",
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Clanging Scales", target);
		},
		self: {
			boosts: {
				spa: -1,
			},
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Crystal",
		contestType: "Beautiful",
	},
	crystalhealing: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Crystal Healing",
		pp: 5,
		priority: 0,
		shortDesc: "Cures whole team's status conditions. 1/16 residual healing at the end of each turn.",
		flags: {snatch: 1, distance: 1, authentic: 1},
		onHit(pokemon, source) {
			this.add('-activate', source, 'move: Crystal Healing');
			const side = pokemon.side;
			let success = false;
			for (const ally of side.pokemon) {
				if (ally.cureStatus()) success = true;
			}
			return success;
		},
		volatileStatus: 'crystalhealing',
		condition: {
			onStart(pokemon) {
				this.add('-start', pokemon, 'Crystal Healing');
			},
			onResidualOrder: 6,
			onResidual(pokemon) {
				this.heal(pokemon.baseMaxhp / 16);
			},
		},
		target: "allyTeam",
		type: "Crystal",
		zMove: {effect: 'heal'},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Heal Bell", target);
		},
		contestType: "Beautiful",
	},
	crystalfortification: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Crystal Fortification",
		pp: 20,
		priority: 0,
		shortDesc: "+1 Def, +1 SpD. Clears negative stat changes.",
		flags: {snatch: 1},
		onHit(pokemon, source) {
			let b: BoostName;
			let didBoost = false;
			const negBoosts = {};
			for (b in source.boosts) {
				if (source.boosts[b] < 0) negBoosts[b] = source.boosts[b] * -1;
				didBoost = true;
			}
			if (didBoost) {
				this.boost(negBoosts, source);
			}
		},
		boosts: {
			def: 1,
			spd: 1,
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Iron Defense", target);
		},
		secondary: null,
		target: "self",
		type: "Crystal",
		zMove: {boost: {spd: 1}},
		contestType: "Beautiful",
	},
	crystalshard: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Crystal Shard",
		shortDesc: "Sets a layer of Spikes. (Not a new kind of hazard)",
		pp: 20,
		priority: 0,
		flags: {reflectable: 1, nonsky: 1},
		onHitSide(side, source) {
			source.side.foe.addSideCondition("spikes");
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Spikes", target);
		},
		secondary: null,
		target: "foeSide",
		type: "Crystal",
		zMove: {boost: {spd: 1}},
		contestType: "Beautiful",
	},
	feralbite: {
		name: "Feral Bite",
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		pp: 15,
		type: "Feral",
		shortDesc: "30% chance to Poison foe.",
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1, bite: 1},
		target: "normal",
		secondary: {
			chance: 30,
			status: "psn",
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Poison Fang", target);
		},
	},
	feralshred: {
		name: "Feral Shred",
		accuracy: 100,
		basePower: 20,
		category: "Physical",
		pp: 15,
		type: "Feral",
		shortDesc: "Hits twice. Lowers foe's Def by 1 on each hit",
		priority: 0,
		multihit: 2,
		flags: {protect: 1, mirror: 1, contact: 1},
		target: "normal",
		secondary: {
			chance: 100,
			boosts: {
				def: -1,
			},
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Dragon Claw", target);
		},
	},
	feralrush: {
		name: "Feral Rush",
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		pp: 10,
		type: "Feral",
		shortDesc: "User takes 1/3 recoil damage. 20% to lower foe's Def by 1",
		priority: 0,
		recoil: [33, 100],
		flags: {protect: 1, mirror: 1, contact: 1},
		target: "normal",
		secondary: {
			chance: 20,
			boosts: {
				def: -1,
			},
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Double-Edge", target);
		},
	},
	feralshriek: {
		name: "Feral Shriek",
		accuracy: 100,
		basePower: 90,
		category: "Special",
		pp: 15,
		type: "Feral",
		shortDesc: "20% to lower foe's SpD by 1",
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1},
		target: "allAdjacentFoes",
		secondary: {
			chance: 20,
			boosts: {
				spd: -1,
			},
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Overdrive", target);
		},
	},
	feralpower: {
		accuracy: 100,
		basePower: 110,
		category: "Special",
		name: "Feral Power",
		pp: 5,
		priority: 0,
		shortDesc: "Lowers user's Def by 1",
		flags: {protect: 1, mirror: 1, authentic: 1},
		selfBoost: {
			boosts: {
				def: -1,
			},
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Searing Shot", target);
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Feral",
		contestType: "Tough",
	},
	feralbreath: {
		name: "Feral Breath",
		accuracy: 100,
		basePower: 80,
		category: "Special",
		pp: 10,
		type: "Feral",
		shortDesc: "100% to lower foe's SpD by 1",
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		secondary: {
			chance: 100,
			boosts: {
				spd: -1,
			},
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Dragon Rage", target);
		},
	},
	feralhealing: {
		num: 816,
		accuracy: true,
		basePower: 0,
		category: "Status",
		//pp: 10,
		priority: 0,
		flags: {heal: 1, bypasssub: 1, allyanim: 1},
		onHit(pokemon) {
			const success = !!this.heal(this.modify(pokemon.maxhp, 0.25));
			return pokemon.cureStatus() || success;
		},
		secondary: null,
		target: "allies",
		name: "Feral Healing",
		pp: 15,
		shortDesc: "Heals user 25% and cures status.",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Jungle Healing", target);
		},
		type: "Feral",
		zMove: {boost: {def: 1}},
		contestType: "Cool",
	},
	feralspray: {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Feral Spray",
		pp: 25,
		priority: 0,
		shortDesc: "+1 Atk, +1 SpA. Poisons the foe.",
		flags: {protect: 1, reflectable: 1, mirror: 1},
		selfBoost: {
			boosts: {
				atk: 1,
				spa: 1,
			},
		},
		status: 'psn',
		secondary: null,
		target: "normal",
		type: "Feral",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Acid Spray", target);
		},
		zMove: {boost: {def: 1}},
		contestType: "Clever",
	},
	feralresilience: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Feral Resilience",
		pp: 20,
		priority: 0,
		flags: {snatch: 1},
		shortDesc: "+1 Atk, +1 SpA. Cures user's status conditions.",
		onHit(pokemon) {
			if (['', 'slp'].includes(pokemon.status)) return false;
			pokemon.cureStatus();
		},
		secondary: null,
		target: "self",
		boosts: {
			atk: 1,
			spa: 1,
		},
		type: "Feral",
		zMove: {effect: 'heal'},
		contestType: "Cute",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Refresh", target);
		},
	},
};
