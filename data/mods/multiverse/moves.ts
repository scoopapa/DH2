export const Moves: {[moveid: string]: MoveData} = {
	flameburst: {
		inherit: true,
		isNonstandard: null,
	},
	judgment: {
		inherit: true,
		isNonstandard: null,
	},
	jumpkick: {
		inherit: true,
		isNonstandard: null,
	},
	refresh: {
		inherit: true,
		isNonstandard: null,
	},
	return: {
		inherit: true,
		isNonstandard: null,
	},
	
	
	flytrap: {
		num: -1,
		accuracy: 75,
		basePower: 100,
		category: "Special",
		shortDesc: "Traps and damages the target for 4-5 turns.",
		name: "Flytrap",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Petal Dance", target);
		},
		volatileStatus: 'partiallytrapped',
		secondary: null,
		target: "normal",
		type: "Grass",
	},
	thunderburst: {
		num: -2,
		accuracy: 100,
		basePower: 70,
		category: "Special",
		shortDesc: "No additional effect.",
		name: "Thunder Burst",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hidden Power", target);
		},
		secondary: null,
		target: "normal",
		type: "Electric",
	},
	leafburst: {
		num: -3,
		accuracy: 100,
		basePower: 70,
		category: "Special",
		shortDesc: "No additional effect.",
		name: "Leaf Burst",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hidden Power", target);
		},
		secondary: null,
		target: "normal",
		type: "Grass",
	},
	huntdown: {
		num: -4,
		accuracy: 100,
		basePower: 40,
		basePowerCallback(pokemon, target, move) {
			// You can't get here unless the huntdown succeeds
			if (target.beingCalledBack) {
				this.debug('Huntdown damage boost');
				return move.basePower * 2;
			}
			return move.basePower;
		},
		category: "Special",
		shortDesc: "If a foe is switching out, hits it at 2x power.",
		name: "Huntdown",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Pursuit", target);
		},
		beforeTurnCallback(pokemon) {
			for (const side of this.sides) {
				if (side === pokemon.side) continue;
				side.addSideCondition('huntdown', pokemon);
				const data = side.getSideConditionData('huntdown');
				if (!data.sources) {
					data.sources = [];
				}
				data.sources.push(pokemon);
			}
		},
		onModifyMove(move, source, target) {
			if (target?.beingCalledBack) move.accuracy = true;
		},
		onTryHit(target, pokemon) {
			target.side.removeSideCondition('huntdown');
		},
		condition: {
			duration: 1,
			onBeforeSwitchOut(pokemon) {
				this.debug('Huntdown start');
				let alreadyAdded = false;
				pokemon.removeVolatile('destinybond');
				for (const source of this.effectData.sources) {
					if (!this.queue.cancelMove(source) || !source.hp) continue;
					if (!alreadyAdded) {
						this.add('-activate', pokemon, 'move: Huntdown');
						alreadyAdded = true;
					}
					// Run through each action in queue to check if the Huntdown user is supposed to Mega Evolve this turn.
					// If it is, then Mega Evolve before moving.
					if (source.canMegaEvo || source.canUltraBurst) {
						for (const [actionIndex, action] of this.queue.entries()) {
							if (action.pokemon === source && action.choice === 'megaEvo') {
								this.runMegaEvo(source);
								this.queue.list.splice(actionIndex, 1);
								break;
							}
						}
					}
					this.runMove('huntdown', source, this.getTargetLoc(pokemon, source));
				}
			},
		},
		secondary: null,
		target: "normal",
		type: "Dark",
	},
	heavyflip: {
		num: -5,
		accuracy: 100,
		basePower: 60,
		basePowerCallback(pokemon, target, move) {
			if (pokemon.item) {
				this.debug("Power doubled for item");
				return move.basePower * 2;
			}
			return move.basePower;
		},
		category: "Physical",
		shortDesc: "Power doubles if the user has a held item.",
		name: "Heavy Flip",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, distance: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Acrobatics", target);
		},
		secondary: null,
		target: "any",
		type: "Flying",
	},
	lowswept: {
		num: -6,
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		shortDesc: "100% chance to lower the target's Speed by 1.",
		name: "Low Swept",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Low Sweep", target);
		},
		secondary: {
			chance: 100,
			boosts: {
				spe: -1,
			},
		},
		target: "normal",
		type: "Fighting",
	},
	overcharge: {
		num: -7,
		accuracy: 100,
		basePower: 250,
		category: "Physical",
		shortDesc: "Hits adjacent Pokemon. The user faints.",
		name: "Overcharge",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Explosion", target);
		},
		selfdestruct: "always",
		secondary: null,
		target: "allAdjacent",
		type: "Electric",
	},
	sharpleaves: {
		num: -8,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		shortDesc: "Always results in a critical hit.",
		name: "Sharp Leaves",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Razor Leaf", target);
		},
		willCrit: true,
		secondary: null,
		target: "allAdjacentFoes",
		type: "Grass",
	},
	bringsticks: {
		num: -9,
		accuracy: 100,
		basePower: 40,
		basePowerCallback(pokemon, target, move) {
			// You can't get here unless the bringsticks succeeds
			if (target.beingCalledBack) {
				this.debug('Bring Sticks damage boost');
				return move.basePower * 2;
			}
			return move.basePower;
		},
		category: "Physical",
		shortDesc: "If a foe is switching out, hits it at 2x power.",
		name: "Bring Sticks",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Pursuit", target);
		},
		beforeTurnCallback(pokemon) {
			for (const side of this.sides) {
				if (side === pokemon.side) continue;
				side.addSideCondition('bringsticks', pokemon);
				const data = side.getSideConditionData('bringsticks');
				if (!data.sources) {
					data.sources = [];
				}
				data.sources.push(pokemon);
			}
		},
		onModifyMove(move, source, target) {
			if (target?.beingCalledBack) move.accuracy = true;
		},
		onTryHit(target, pokemon) {
			target.side.removeSideCondition('bringsticks');
		},
		condition: {
			duration: 1,
			onBeforeSwitchOut(pokemon) {
				this.debug('Bring Sticks start');
				let alreadyAdded = false;
				pokemon.removeVolatile('destinybond');
				for (const source of this.effectData.sources) {
					if (!this.queue.cancelMove(source) || !source.hp) continue;
					if (!alreadyAdded) {
						this.add('-activate', pokemon, 'move: Bring Sticks');
						alreadyAdded = true;
					}
					// Run through each action in queue to check if the Bring Sticks user is supposed to Mega Evolve this turn.
					// If it is, then Mega Evolve before moving.
					if (source.canMegaEvo || source.canUltraBurst) {
						for (const [actionIndex, action] of this.queue.entries()) {
							if (action.pokemon === source && action.choice === 'megaEvo') {
								this.runMegaEvo(source);
								this.queue.list.splice(actionIndex, 1);
								break;
							}
						}
					}
					this.runMove('bringsticks', source, this.getTargetLoc(pokemon, source));
				}
			},
		},
		secondary: null,
		target: "normal",
		type: "Dark",
	},
	chillburst: {
		num: -10,
		accuracy: 100,
		basePower: 70,
		category: "Special",
		shortDesc: "No additional effect.",
		name: "Chill Burst",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hidden Power", target);
		},
		secondary: null,
		target: "normal",
		type: "Ice",
	},
	absoluteimpact: {
		num: -11,
		accuracy: 90,
		basePower: 100,
		category: "Physical",
		shortDesc: "Has 33% recoil.",
		name: "Absolute Impact",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		recoil: [33, 100],
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Giga Impact", target);
		},
		secondary: null,
		target: "normal",
		type: "Dragon",
	},
	foggymist: {
		num: -12,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "-1 evasion; clears user and target side's hazards.",
		name: "Foggy Mist",
		pp: 15,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, authentic: 1},
		onHit(target, source, move) {
			let success = false;
			if (!target.volatiles['substitute'] || move.infiltrates) success = !!this.boost({evasion: -1});
			const removeTarget = [
				'reflect', 'lightscreen', 'auroraveil', 'safeguard', 'mist', 'spikes', 'toxicspikes', 'stealthrock', 'stickyweb',
			];
			const removeAll = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb'];
			for (const targetCondition of removeTarget) {
				if (target.side.removeSideCondition(targetCondition)) {
					if (!removeAll.includes(targetCondition)) continue;
					this.add('-sideend', target.side, this.dex.getEffect(targetCondition).name, '[from] move: Defog', '[of] ' + source);
					success = true;
				}
			}
			for (const sideCondition of removeAll) {
				if (source.side.removeSideCondition(sideCondition)) {
					this.add('-sideend', source.side, this.dex.getEffect(sideCondition).name, '[from] move: Defog', '[of] ' + source);
					success = true;
				}
			}
			return success;
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Defog", target);
		},
		secondary: null,
		target: "normal",
		type: "Flying",
	},
	hiddenforce: {
		num: -13,
		accuracy: 100,
		basePower: 60,
		category: "Special",
		name: "Hidden Force",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hidden Force", target);
		},
		secondary: null,
		target: "normal",
		type: "Normal",
	},
	hiddenforcebug: {
		num: -13,
		accuracy: 100,
		basePower: 60,
		category: "Special",
		realMove: "Hidden Force",
		name: "Hidden Force Bug",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hidden Force", target);
		},
		secondary: null,
		target: "normal",
		type: "Bug",
	},
	hiddenforcedark: {
		num: -13,
		accuracy: 100,
		basePower: 60,
		category: "Special",
		realMove: "Hidden Force",
		name: "Hidden Force Dark",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hidden Force", target);
		},
		secondary: null,
		target: "normal",
		type: "Dark",
	},
	hiddenforcedragon: {
		num: -13,
		accuracy: 100,
		basePower: 60,
		category: "Special",
		realMove: "Hidden Force",
		name: "Hidden Force Dragon",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hidden Force", target);
		},
		secondary: null,
		target: "normal",
		type: "Dragon",
	},
	hiddenforceelectric: {
		num: -13,
		accuracy: 100,
		basePower: 60,
		category: "Special",
		realMove: "Hidden Force",
		name: "Hidden Force Electric",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hidden Force", target);
		},
		secondary: null,
		target: "normal",
		type: "Electric",
	},
	hiddenforcefighting: {
		num: -13,
		accuracy: 100,
		basePower: 60,
		category: "Special",
		realMove: "Hidden Force",
		name: "Hidden Force Fighting",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hidden Force", target);
		},
		secondary: null,
		target: "normal",
		type: "Fighting",
	},
	hiddenforcefire: {
		num: -13,
		accuracy: 100,
		basePower: 60,
		category: "Special",
		realMove: "Hidden Force",
		name: "Hidden Force Fire",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hidden Force", target);
		},
		secondary: null,
		target: "normal",
		type: "Fire",
	},
	hiddenforceflying: {
		num: -13,
		accuracy: 100,
		basePower: 60,
		category: "Special",
		realMove: "Hidden Force",
		name: "Hidden Force Flying",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hidden Force", target);
		},
		secondary: null,
		target: "normal",
		type: "Flying",
	},
	hiddenforceghost: {
		num: -13,
		accuracy: 100,
		basePower: 60,
		category: "Special",
		realMove: "Hidden Force",
		name: "Hidden Force Ghost",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hidden Force", target);
		},
		secondary: null,
		target: "normal",
		type: "Ghost",
	},
	hiddenforcegrass: {
		num: -13,
		accuracy: 100,
		basePower: 60,
		category: "Special",
		realMove: "Hidden Force",
		name: "Hidden Force Grass",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hidden Force", target);
		},
		secondary: null,
		target: "normal",
		type: "Grass",
	},
	hiddenforceground: {
		num: -13,
		accuracy: 100,
		basePower: 60,
		category: "Special",
		realMove: "Hidden Force",
		name: "Hidden Force Ground",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hidden Force", target);
		},
		secondary: null,
		target: "normal",
		type: "Ground",
	},
	hiddenforceice: {
		num: -13,
		accuracy: 100,
		basePower: 60,
		category: "Special",
		realMove: "Hidden Force",
		name: "Hidden Force Ice",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hidden Force", target);
		},
		secondary: null,
		target: "normal",
		type: "Ice",
	},
	hiddenforcepoison: {
		num: -13,
		accuracy: 100,
		basePower: 60,
		category: "Special",
		realMove: "Hidden Force",
		name: "Hidden Force Poison",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hidden Force", target);
		},
		secondary: null,
		target: "normal",
		type: "Poison",
	},
	hiddenforcepsychic: {
		num: -13,
		accuracy: 100,
		basePower: 60,
		category: "Special",
		realMove: "Hidden Force",
		name: "Hidden Force Psychic",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hidden Force", target);
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
	},
	hiddenforcerock: {
		num: -13,
		accuracy: 100,
		basePower: 60,
		category: "Special",
		realMove: "Hidden Force",
		name: "Hidden Force Rock",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hidden Force", target);
		},
		secondary: null,
		target: "normal",
		type: "Rock",
	},
	hiddenforcesteel: {
		num: -13,
		accuracy: 100,
		basePower: 60,
		category: "Special",
		realMove: "Hidden Force",
		name: "Hidden Force Steel",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hidden Force", target);
		},
		secondary: null,
		target: "normal",
		type: "Steel",
	},
	hiddenforcewater: {
		num: -13,
		accuracy: 100,
		basePower: 60,
		category: "Special",
		realMove: "Hidden Force",
		name: "Hidden Force Water",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hidden Force", target);
		},
		secondary: null,
		target: "normal",
		type: "Water",
	},
	perrserkpaw: {
		num: -14,
		accuracy: 100,
		basePower: 65,
		category: "Physical",
		shortDesc: "User recovers 75% of the damage dealt.",
		name: "Perrserk Paw",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, heal: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Metal Claw", target);
		},
		drain: [3, 4],
		secondary: null,
		target: "normal",
		type: "Steel",
	},
	courtchange: {
		inherit: true,
		basePower: 60,
		category: "Physical",
		name: "Court Change",
		pp: 15,
		flags: {mirror: 1, protect: 1, contact: 1},
		target: "all",
		type: "Fighting",
	},
};