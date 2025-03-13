export const Moves: {[k: string]: ModdedMoveData} = {
// Additions
	vitalenergy: {
		num: 284,
		accuracy: 100,
		basePower: 150,
		basePowerCallback(pokemon, target, move) {
			return move.basePower * pokemon.hp / pokemon.maxhp;
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Seed Flare", target);
		},
		category: "Special",
		name: "Vital Energy",
		shortDesc: "Less power as user's HP decreases. Hits foe(s).",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Grass",
		contestType: "Beautiful",
	},
	smokytorment: {
		num: 1000,
		accuracy: true,
		basePower: 75,
		category: "Physical",
		name: "Smoky Torment",
		shortDesc: "Applies the Torment effect on opponent.",
		pp: 10,
		priority: 0,
		flags: {},
		self: {
		   volatileStatus: 'encore',
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Outrage", target);
		},
		secondary: null,
		target: "normal",
		type: "Dark",
		contestType: "Cool",
	},
	powerwash: {
		num: 229,
		accuracy: 100,
		basePower: 50,
		category: "Special",
		name: "Power Wash",
		shortDesc: "Removes all hazards in the field. If any hazards are cleared, the user heals for 50% of its maximum HP.",
		pp: 40,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onHit(target, source, move) {
			let success = false;
			const removeAll = [
				'spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge',
			];
			for (const sideCondition of removeAll) {
				if (source.side.removeSideCondition(sideCondition)) {
					this.add('-sideend', source.side, this.dex.conditions.get(sideCondition).name, '[from] move: Power Wash', '[of] ' + source);
					success = true;
				}
			}
			this.heal(Math.ceil(source.maxhp * 0.5), source);
			return success;
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Volt Switch", target);
		},
		target: "normal",
		type: "Water",
		contestType: "Cool",
	},
	brainwave: {
		accuracy: 100,
		basePower: 70,
		category: "Special",
		name: "Brainwave",
		shortDesc: "Uses user's Special Defense stat as Special Attack in damage calculation.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		useSourceDefensiveAsOffensive: true,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Expanding Force", target);
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
	},
	illwind: {
		num: 202,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		name: "Ill Wind",
		shortDesc: "Lowers the user's Sp. Atk by 1. Heals 25% of the damage done. Heals another 25% for each stage the user's Special Attack is lowered.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, heal: 1},
		self: {
			boosts: {
				spa: -1,
			},
		},
		drain: [1, 4],
		onModifyMove(move, pokemon) {
			move.drain = [pokemon.negativeBoosts.spa(), 4];
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Icy Wind", target);
		},
		secondary: null,
		target: "normal",
		type: "Ice",
		contestType: "Clever",
	},
	guardiandive: {
		accuracy: 100,
		basePower: 75,
		category: "Physical",
		name: "Guardian Dive",
		shortDesc: "Uses user's Defense stat as Attack in damage calculation.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		useSourceDefensiveAsOffensive: true,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Acrobatics", target);
		},
		secondary: null,
		target: "normal",
		type: "Flying",
	},
	coralcrash: {
		num: 38,
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		name: "Coral Crash",
		shortDesc: "33% recoil. 10% chance to poison.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 10,
			status: 'psn',
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Aqua Tail", target);
		},
		recoil: [33, 100],
		target: "normal",
		type: "Poison",
		contestType: "Tough",
	},
	slipaway: {
		num: 575,
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		name: "Slip Away",
		shortDesc: "100% chance to lower the target's Attack by 1, switches the user out.",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, authentic: 1},
		secondary: {
			chance: 100,
			boosts: {
				atk: -1,
			},
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Aqua Tail", target);
		},
		selfSwitch: true,
		target: "normal",
		type: "Water",
		zMove: {effect: 'healreplacement'},
		contestType: "Cool",
	},
	flareout: {
		num: 575,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		name: "Flare Out",
      shortDesc: "100% chance to lower the target's Defense by 1, switches the user out.",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, authentic: 1},
		secondary: {
			chance: 100,
			boosts: {
				def: -1,
			},
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Flame Charge", target);
		},
		selfSwitch: true,
		target: "normal",
		type: "Fire",
		zMove: {effect: 'healreplacement'},
		contestType: "Cool",
	},
	buzzoff: {
		num: 575,
		accuracy: 100,
		basePower: 60,
		category: "Special",
		name: "Buzz Off",
      shortDesc: "100% chance to lower the target's Speed by 1, switches the user out.",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1, authentic: 1},
		secondary: {
			chance: 100,
			boosts: {
				spe: -1,
			},
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Volt Switch", target);
		},
		selfSwitch: true,
		target: "normal",
		type: "Electric",
		zMove: {effect: 'healreplacement'},
		contestType: "Cool",
	},
	powdergale: {
		num: 367,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Powder Gale",
      shortDesc: "100% chance to poison. Harshly lowers a random one of the target's stat.",
		pp: 30,
		priority: 0,
		flags: {},
		onHit(target) {
			const stats: BoostID[] = [];
			let stat: BoostID;
			for (stat in target.boosts) {
				if (stat === 'accuracy' || stat === 'evasion') continue;
				if (target.boosts[stat] < 6) {
					stats.push(stat);
				}
			}
			if (stats.length) {
				const randomStat = this.sample(stats);
				const boost: SparseBoostsTable = {};
				boost[randomStat] = -2;
				this.boost(boost);
			} else {
				return;
			}
		},
		secondary: {
			chance: 100,
			status: 'psn',
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hurricane", target);
		},
		target: "normal",
		type: "Bug",
		zMove: {effect: 'crit2'},
		contestType: "Tough",
	},
	splashback: {
		num: 889,
		accuracy: 100,
		basePower: 50,
		basePowerCallback(pokemon) {
			return Math.min(300, 50 + 50 * pokemon.timesAttacked);
		},
		onEnd(pokemon) {
			this.add('-end', pokemon, 'Splashback', '[silent]');
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Flip Turn", target);
		},
		category: "Physical",
		name: "Splashback",
      shortDesc: "Base power increases by 50 every time this Pokemon is hit. Max 300 BP. Reset on switch out.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1},
		secondary: null,
		target: "normal",
		type: "Water",
	},
	ragingtorrent: {
		num: 612,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Raging Torrent",
      shortDesc: "Lowers the target's Atk by 1. Inflicts Encore on the user.",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		self: {
		   volatileStatus: 'encore',
		},
		secondary: {
			chance: 100,
			boosts: {
				atk: -1,
			},
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Liquidation", target);
		},
		target: "allAdjacentFoes",
		type: "Water",
		contestType: "Tough",
	},
};
