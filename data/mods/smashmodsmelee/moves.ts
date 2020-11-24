export const Moves: {[k: string]: ModdedMoveData} = {
	gmaxsteelsurge: {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		desc: "Power is equal to the base move's Max Move power. If this move is successful, it sets up a hazard on the opposing side of the field, damaging each opposing Pokemon that switches in. Foes lose 1/32, 1/16, 1/8, 1/4, or 1/2 of their maximum HP, rounded down, based on their weakness to the Steel type; 0.25x, 0.5x, neutral, 2x, or 4x, respectively. Can be removed from the opposing side if any opposing Pokemon uses Rapid Spin or Defog successfully, or is hit by Defog.",
		shortDesc: "Base move affects power. Foes: Steel hazard.",
		name: "G-Max Steelsurge",
		pp: 5,
		priority: 0,
		flags: {},
		isMax: "Copperajah",
		self: {
			onHit(source) {
				source.side.foe.addSideCondition('gmaxsteelsurge');
			},
		},
		effect: {
			onStart(side) {
				this.add('-sidestart', side, 'move: G-Max Steelsurge');
			},
			onSwitchIn(pokemon) {
				if (pokemon.hasAbility('trashcompactor')) {
					if (!pokemon.volatiles['stockpile']) {
						this.useMove('stockpile', pokemon);
					}
					this.add('-sideend', pokemon.side, 'move: G-Max Steelsurge', '[of] ' + pokemon);
					pokemon.side.removeSideCondition('gmaxsteelsurge');
					return;
				}
				if (pokemon.hasAbility('trashcompactor') || pokemon.hasItem('heavydutyboots')) return;
				// Ice Face and Disguise correctly get typed damage from Stealth Rock
				// because Stealth Rock bypasses Substitute.
				// They don't get typed damage from Steelsurge because Steelsurge doesn't,
				// so we're going to test the damage of a Steel-type Stealth Rock instead.
				const steelHazard = this.dex.getActiveMove('Stealth Rock');
				steelHazard.type = 'Steel';
				const typeMod = this.clampIntRange(pokemon.runEffectiveness(steelHazard), -6, 6);
				this.damage(pokemon.maxhp * Math.pow(2, typeMod) / 8);
			},
		},
		secondary: null,
		target: "adjacentFoe",
		type: "Steel",
		contestType: "Cool",
	},
	spikes: {
		num: 191,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Sets up a hazard on the opposing side of the field, damaging each opposing Pokemon that switches in, unless it is a Flying-type Pokemon or has the Levitate Ability. Can be used up to three times before failing. Opponents lose 1/8 of their maximum HP with one layer, 1/6 of their maximum HP with two layers, and 1/4 of their maximum HP with three layers, all rounded down. Can be removed from the opposing side if any opposing Pokemon uses Rapid Spin or Defog successfully, or is hit by Defog.",
		shortDesc: "Hurts grounded foes on switch-in. Max 3 layers.",
		name: "Spikes",
		pp: 20,
		priority: 0,
		flags: {reflectable: 1, nonsky: 1},
		sideCondition: 'spikes',
		effect: {
			// this is a side condition
			onStart(side) {
				this.add('-sidestart', side, 'Spikes');
				this.effectData.layers = 1;
			},
			onRestart(side) {
				if (this.effectData.layers >= 3) return false;
				this.add('-sidestart', side, 'Spikes');
				this.effectData.layers++;
			},
			onSwitchIn(pokemon) {
				if (!pokemon.isGrounded()) return;
				if (pokemon.hasAbility('trashcompactor')) {
					if (!pokemon.volatiles['stockpile']) {
						this.useMove('stockpile', pokemon);
					}
					this.add('-sideend', pokemon.side, 'move: Spikes', '[of] ' + pokemon);
					pokemon.side.removeSideCondition('spikes');
					return;
				}
				if (pokemon.hasAbility('trashcompactor') || pokemon.hasItem('heavydutyboots')) return;
				const damageAmounts = [0, 3, 4, 6]; // 1/8, 1/6, 1/4
				this.damage(damageAmounts[this.effectData.layers] * pokemon.maxhp / 24);
			},
		},
		secondary: null,
		target: "foeSide",
		type: "Ground",
		zMove: {boost: {def: 1}},
		contestType: "Clever",
	},
	stealthrock: {
		num: 446,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Sets up a hazard on the opposing side of the field, damaging each opposing Pokemon that switches in. Fails if the effect is already active on the opposing side. Foes lose 1/32, 1/16, 1/8, 1/4, or 1/2 of their maximum HP, rounded down, based on their weakness to the Rock type; 0.25x, 0.5x, neutral, 2x, or 4x, respectively. Can be removed from the opposing side if any opposing Pokemon uses Rapid Spin or Defog successfully, or is hit by Defog.",
		shortDesc: "Hurts foes on switch-in. Factors Rock weakness.",
		name: "Stealth Rock",
		pp: 20,
		priority: 0,
		flags: {reflectable: 1},
		sideCondition: 'stealthrock',
		effect: {
			// this is a side condition
			onStart(side) {
				this.add('-sidestart', side, 'move: Stealth Rock');
			},
			onSwitchIn(pokemon) {
				if (pokemon.hasAbility('trashcompactor')) {
					if (!pokemon.volatiles['stockpile']) {
						this.useMove('stockpile', pokemon);
					}
					this.add('-sideend', pokemon.side, 'move: Stealth Rock', '[of] ' + pokemon);
					pokemon.side.removeSideCondition('stealthrock');
					return;
				}
				if (pokemon.hasAbility('trashcompactor') || pokemon.hasItem('heavydutyboots')) return;
				const typeMod = this.clampIntRange(pokemon.runEffectiveness(this.dex.getActiveMove('stealthrock')), -6, 6);
				this.damage(pokemon.maxhp * Math.pow(2, typeMod) / 8);
			},
		},
		secondary: null,
		target: "foeSide",
		type: "Rock",
		zMove: {boost: {def: 1}},
		contestType: "Cool",
	},
	stickyweb: {
		num: 564,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Sets up a hazard on the opposing side of the field, lowering the Speed by 1 stage of each opposing Pokemon that switches in, unless it is a Flying-type Pokemon or has the Levitate Ability. Fails if the effect is already active on the opposing side. Can be removed from the opposing side if any opposing Pokemon uses Rapid Spin or Defog successfully, or is hit by Defog.",
		shortDesc: "Lowers Speed of grounded foes by 1 on switch-in.",
		name: "Sticky Web",
		pp: 20,
		priority: 0,
		flags: {reflectable: 1},
		sideCondition: 'stickyweb',
		effect: {
			onStart(side) {
				this.add('-sidestart', side, 'move: Sticky Web');
			},
			onSwitchIn(pokemon) {
				if (!pokemon.isGrounded()) return;
				if (pokemon.hasAbility('trashcompactor')) {
					if (!pokemon.volatiles['stockpile']) {
						this.useMove('stockpile', pokemon);
					}
					this.add('-sideend', pokemon.side, 'move: Sticky Web', '[of] ' + pokemon);
					pokemon.side.removeSideCondition('stickyweb');
					return;
				}
				if (pokemon.hasAbility('trashcompactor') || pokemon.hasItem('heavydutyboots')) return;
				this.add('-activate', pokemon, 'move: Sticky Web');
				this.boost({spe: -1}, pokemon, this.effectData.source, this.dex.getActiveMove('stickyweb'));
			},
		},
		secondary: null,
		target: "foeSide",
		type: "Bug",
		zMove: {boost: {spe: 1}},
		contestType: "Tough",
	},
	toxicspikes: {
		num: 390,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Sets up a hazard on the opposing side of the field, poisoning each opposing Pokemon that switches in, unless it is a Flying-type Pokemon or has the Levitate Ability. Can be used up to two times before failing. Opposing Pokemon become poisoned with one layer and badly poisoned with two layers. Can be removed from the opposing side if any opposing Pokemon uses Rapid Spin or Defog successfully, is hit by Defog, or a grounded Poison-type Pokemon switches in. Safeguard prevents the opposing party from being poisoned on switch-in, but a substitute does not.",
		shortDesc: "Poisons grounded foes on switch-in. Max 2 layers.",
		name: "Toxic Spikes",
		pp: 20,
		priority: 0,
		flags: {reflectable: 1, nonsky: 1},
		sideCondition: 'toxicspikes',
		effect: {
			// this is a side condition
			onStart(side) {
				this.add('-sidestart', side, 'move: Toxic Spikes');
				this.effectData.layers = 1;
			},
			onRestart(side) {
				if (this.effectData.layers >= 2) return false;
				this.add('-sidestart', side, 'move: Toxic Spikes');
				this.effectData.layers++;
			},
			onSwitchIn(pokemon) {
				if (!pokemon.isGrounded()) return;
				if (pokemon.hasAbility('trashcompactor')) {
					if (!pokemon.volatiles['stockpile']) {
						this.useMove('stockpile', pokemon);
					}
					this.add('-sideend', pokemon.side, 'move: Toxic Spikes', '[of] ' + pokemon);
					pokemon.side.removeSideCondition('toxicspikes');
					return;
				}
				if (pokemon.hasType('Poison') && !this.field.pseudoWeather.stickyresidues) {
					this.add('-sideend', pokemon.side, 'move: Toxic Spikes', '[of] ' + pokemon);
					pokemon.side.removeSideCondition('toxicspikes');
				} else if (pokemon.hasType('Steel') || pokemon.hasType('Poison') || pokemon.hasAbility('trashcompactor') || pokemon.hasItem('heavydutyboots')) {
					return;
				} else if (this.effectData.layers >= 2) {
					pokemon.trySetStatus('tox', pokemon.side.foe.active[0]);
				} else {
					pokemon.trySetStatus('psn', pokemon.side.foe.active[0]);
				}
			},
		},
		secondary: null,
		target: "foeSide",
		type: "Poison",
		zMove: {boost: {def: 1}},
		contestType: "Clever",
	},
	trickroom: {
		num: 433,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "For 5 turns, the Speed of every Pokemon is recalculated for the purposes of determining turn order. During the effect, each Pokemon's Speed is considered to be (10000 - its normal Speed), and if this value is greater than 8191, 8192 is subtracted from it. If this move is used during the effect, the effect ends.",
		shortDesc: "Goes last. For 5 turns, turn order is reversed.",
		name: "Trick Room",
		pp: 5,
		priority: -7,
		flags: {mirror: 1},
		pseudoWeather: 'trickroom',
		effect: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasAbility('persistent')) {
					this.add('-activate', source, 'ability: Persistent', effect);
					return 7;
				}
				if (source?.hasAbility('timewarp')) {
					this.add('-activate', source, 'ability: Time Warp', effect);
					return 0;
				}
				return 5;
			},
			onStart(target, source) {
				this.add('-fieldstart', 'move: Trick Room', '[of] ' + source);
			},
			onRestart(target, source) {
				this.field.removePseudoWeather('trickroom');
			},
			// Speed modification is changed in Pokemon.getActionSpeed() in sim/pokemon.js
			onResidualOrder: 23,
			onEnd() {
				this.add('-fieldend', 'move: Trick Room');
			},
		},
		secondary: null,
		target: "all",
		type: "Psychic",
		zMove: {boost: {accuracy: 1}},
		contestType: "Clever",
	},
	afteryou: {
		inherit: true,
		onModifyMove(move, source, target) {
			if (source.species.id === 'miltank') {
				move.type = 'Fairy';
			}
		},
		onUseMoveMessage(pokemon, target, move) {
			if (pokemon.species.id === 'miltank') {
				this.add('-message', `${pokemon.name}'s ${move.name} is ${move.type}-type!`);
			}
		},
	},
	attract: {
		inherit: true,
		onModifyMove(move, source, target) {
			if (source.species.id === 'miltank') {
				move.type = 'Fairy';
			}
		},
		onUseMoveMessage(pokemon, target, move) {
			if (pokemon.species.id === 'miltank') {
				this.add('-message', `${pokemon.name}'s ${move.name} is ${move.type}-type!`);
			}
		},
	},
	bide: {
		inherit: true,
		onModifyMove(move, source, target) {
			if (source.species.id === 'miltank') {
				move.type = 'Rock';
			}
		},
		onUseMoveMessage(pokemon, target, move) {
			if (pokemon.species.id === 'miltank') {
				this.add('-message', `${pokemon.name}'s ${move.name} is ${move.type}-type!`);
			}
		},
	},
	block: {
		inherit: true,
		onModifyMove(move, source, target) {
			if (source.species.id === 'miltank') {
				move.type = 'Rock';
			}
		},
		onUseMoveMessage(pokemon, target, move) {
			if (pokemon.species.id === 'miltank') {
				this.add('-message', `${pokemon.name}'s ${move.name} is ${move.type}-type!`);
			}
		},
	},
	bodyslam: {
		inherit: true,
		onModifyMove(move, source, target) {
			if (source.species.id === 'miltank') {
				move.type = 'Ground';
			}
		},
		onUseMoveMessage(pokemon, target, move) {
			if (pokemon.species.id === 'miltank') {
				this.add('-message', `${pokemon.name}'s ${move.name} is ${move.type}-type!`);
			}
		},
	},
	captivate: {
		inherit: true,
		onModifyMove(move, source, target) {
			if (source.species.id === 'miltank') {
				move.type = 'Fairy';
			}
		},
		onUseMoveMessage(pokemon, target, move) {
			if (pokemon.species.id === 'miltank') {
				this.add('-message', `${pokemon.name}'s ${move.name} is ${move.type}-type!`);
			}
		},
	},
	confide: {
		inherit: true,
		onModifyMove(move, source, target) {
			if (source.species.id === 'miltank') {
				move.type = 'Dark';
			}
		},
		onUseMoveMessage(pokemon, target, move) {
			if (pokemon.species.id === 'miltank') {
				this.add('-message', `${pokemon.name}'s ${move.name} is ${move.type}-type!`);
			}
		},
	},
	defensecurl: {
		inherit: true,
		onModifyMove(move, source, target) {
			if (source.species.id === 'miltank') {
				move.type = 'Rock';
			}
		},
		onUseMoveMessage(pokemon, target, move) {
			if (pokemon.species.id === 'miltank') {
				this.add('-message', `${pokemon.name}'s ${move.name} is ${move.type}-type!`);
			}
		},
	},
	dizzypunch: {
		inherit: true,
		onModifyMove(move, source, target) {
			if (source.species.id === 'miltank') {
				move.type = 'Psychic';
			}
		},
		onUseMoveMessage(pokemon, target, move) {
			if (pokemon.species.id === 'miltank') {
				this.add('-message', `${pokemon.name}'s ${move.name} is ${move.type}-type!`);
			}
		},
	},
	doubleteam: {
		inherit: true,
		onModifyMove(move, source, target) {
			if (source.species.id === 'miltank') {
				move.type = 'Ghost';
			}
		},
		onUseMoveMessage(pokemon, target, move) {
			if (pokemon.species.id === 'miltank') {
				this.add('-message', `${pokemon.name}'s ${move.name} is ${move.type}-type!`);
			}
		},
	},
	doubleedge: {
		inherit: true,
		onModifyMove(move, source, target) {
			if (source.species.id === 'miltank') {
				move.type = 'Steel';
			}
		},
		onUseMoveMessage(pokemon, target, move) {
			if (pokemon.species.id === 'miltank') {
				this.add('-message', `${pokemon.name}'s ${move.name} is ${move.type}-type!`);
			}
		},
	},
	echoedvoice: {
		inherit: true,
		onModifyMove(move, source, target) {
			if (source.species.id === 'miltank') {
				move.type = 'Flying';
			}
		},
		onUseMoveMessage(pokemon, target, move) {
			if (pokemon.species.id === 'miltank') {
				this.add('-message', `${pokemon.name}'s ${move.name} is ${move.type}-type!`);
			}
		},
	},
	endure: {
		inherit: true,
		onModifyMove(move, source, target) {
			if (source.species.id === 'miltank') {
				move.type = 'Fighting';
			}
		},
		onUseMoveMessage(pokemon, target, move) {
			if (pokemon.species.id === 'miltank') {
				this.add('-message', `${pokemon.name}'s ${move.name} is ${move.type}-type!`);
			}
		},
	},
	facade: {
		inherit: true,
		onModifyMove(move, source, target) {
			if (source.species.id === 'miltank') {
				move.type = 'Fighting';
			}
		},
		onUseMoveMessage(pokemon, target, move) {
			if (pokemon.species.id === 'miltank') {
				this.add('-message', `${pokemon.name}'s ${move.name} is ${move.type}-type!`);
			}
		},
	},
	frustration: {
		inherit: true,
		onModifyMove(move, source, target) {
			if (source.species.id === 'miltank') {
				move.type = 'Dark';
			}
		},
		onUseMoveMessage(pokemon, target, move) {
			if (pokemon.species.id === 'miltank') {
				this.add('-message', `${pokemon.name}'s ${move.name} is ${move.type}-type!`);
			}
		},
	},
	gigaimpact: {
		inherit: true,
		onModifyMove(move, source, target) {
			if (source.species.id === 'miltank') {
				move.type = 'Dark';
			}
		},
		onUseMoveMessage(pokemon, target, move) {
			if (pokemon.species.id === 'miltank') {
				this.add('-message', `${pokemon.name}'s ${move.name} is ${move.type}-type!`);
			}
		},
	},
	growl: {
		inherit: true,
		onModifyMove(move, source, target) {
			if (source.species.id === 'miltank') {
				move.type = 'Fairy';
			}
		},
		onUseMoveMessage(pokemon, target, move) {
			if (pokemon.species.id === 'miltank') {
				this.add('-message', `${pokemon.name}'s ${move.name} is ${move.type}-type!`);
			}
		},
	},
	headbutt: {
		inherit: true,
		onModifyMove(move, source, target) {
			if (source.species.id === 'miltank') {
				move.type = 'Rock';
			}
		},
		onUseMoveMessage(pokemon, target, move) {
			if (pokemon.species.id === 'miltank') {
				this.add('-message', `${pokemon.name}'s ${move.name} is ${move.type}-type!`);
			}
		},
	},
	healbell: {
		inherit: true,
		onModifyMove(move, source, target) {
			if (source.species.id === 'miltank') {
				move.type = 'Steel';
			}
		},
		onUseMoveMessage(pokemon, target, move) {
			if (pokemon.species.id === 'miltank') {
				this.add('-message', `${pokemon.name}'s ${move.name} is ${move.type}-type!`);
			}
		},
	},
	helpinghand: {
		inherit: true,
		onModifyMove(move, source, target) {
			if (source.species.id === 'miltank') {
				move.type = 'Fairy';
			}
		},
		onUseMoveMessage(pokemon, target, move) {
			if (pokemon.species.id === 'miltank') {
				this.add('-message', `${pokemon.name}'s ${move.name} is ${move.type}-type!`);
			}
		},
	},
	hyperbeam: {
		inherit: true,
		onModifyMove(move, source, target) {
			if (source.species.id === 'miltank') {
				move.type = 'Dark';
			}
		},
		onUseMoveMessage(pokemon, target, move) {
			if (pokemon.species.id === 'miltank') {
				this.add('-message', `${pokemon.name}'s ${move.name} is ${move.type}-type!`);
			}
		},
	},
	megakick: {
		inherit: true,
		onModifyMove(move, source, target) {
			if (source.species.id === 'miltank') {
				move.type = 'Fighting';
			}
		},
		onUseMoveMessage(pokemon, target, move) {
			if (pokemon.species.id === 'miltank') {
				this.add('-message', `${pokemon.name}'s ${move.name} is ${move.type}-type!`);
			}
		},
	},
	megapunch: {
		inherit: true,
		onModifyMove(move, source, target) {
			if (source.species.id === 'miltank') {
				move.type = 'Fighting';
			}
		},
		onUseMoveMessage(pokemon, target, move) {
			if (pokemon.species.id === 'miltank') {
				this.add('-message', `${pokemon.name}'s ${move.name} is ${move.type}-type!`);
			}
		},
	},
	metronome: {
		inherit: true,
		onModifyMove(move, source, target) {
			if (source.species.id === 'miltank') {
				move.type = 'Psychic';
			}
		},
		onUseMoveMessage(pokemon, target, move) {
			if (pokemon.species.id === 'miltank') {
				this.add('-message', `${pokemon.name}'s ${move.name} is ${move.type}-type!`);
			}
		},
	},
	milkdrink: {
		inherit: true,
		onModifyMove(move, source, target) {
			if (source.species.id === 'miltank') {
				move.type = 'Fairy';
			}
		},
		onUseMoveMessage(pokemon, target, move) {
			if (pokemon.species.id === 'miltank') {
				this.add('-message', `${pokemon.name}'s ${move.name} is ${move.type}-type!`);
			}
		},
	},
	mimic: {
		inherit: true,
		onModifyMove(move, source, target) {
			if (source.species.id === 'miltank') {
				move.type = 'Psychic';
			}
		},
		onUseMoveMessage(pokemon, target, move) {
			if (pokemon.species.id === 'miltank') {
				this.add('-message', `${pokemon.name}'s ${move.name} is ${move.type}-type!`);
			}
		},
	},
	present: {
		inherit: true,
		onModifyMove(move, pokemon, target) {
			if (pokemon.species.id === 'miltank') {
				move.type = 'Ice';
			}
			const rand = this.random(10);
			if (rand < 2) {
				move.heal = [1, 4];
			} else if (rand < 6) {
				move.basePower = 40;
			} else if (rand < 9) {
				move.basePower = 80;
			} else {
				move.basePower = 120;
			}
		},
		onUseMoveMessage(pokemon, target, move) {
			if (pokemon.species.id === 'miltank') {
				this.add('-message', `${pokemon.name}'s ${move.name} is ${move.type}-type!`);
			}
		},
	},
	protect: {
		inherit: true,
		onModifyMove(move, source, target) {
			if (source.species.id === 'miltank') {
				move.type = 'Psychic';
			}
		},
		onUseMoveMessage(pokemon, target, move) {
			if (pokemon.species.id === 'miltank') {
				this.add('-message', `${pokemon.name}'s ${move.name} is ${move.type}-type!`);
			}
		},
	},
	psychup: {
		inherit: true,
		onModifyMove(move, source, target) {
			if (source.species.id === 'miltank') {
				move.type = 'Psychic';
			}
		},
		onUseMoveMessage(pokemon, target, move) {
			if (pokemon.species.id === 'miltank') {
				this.add('-message', `${pokemon.name}'s ${move.name} is ${move.type}-type!`);
			}
		},
	},
	retaliate: {
		inherit: true,
		onModifyMove(move, source, target) {
			if (source.species.id === 'miltank') {
				move.type = 'dark';
			}
		},
		onUseMoveMessage(pokemon, target, move) {
			if (pokemon.species.id === 'miltank') {
				this.add('-message', `${pokemon.name}'s ${move.name} is ${move.type}-type!`);
			}
		},
	},
	return: {
		inherit: true,
		onModifyMove(move, source, target) {
			if (source.species.id === 'miltank') {
				move.type = 'Fairy';
			}
		},
		onUseMoveMessage(pokemon, target, move) {
			if (pokemon.species.id === 'miltank') {
				this.add('-message', `${pokemon.name}'s ${move.name} is ${move.type}-type!`);
			}
		},
	},
	round: {
		inherit: true,
		onModifyMove(move, source, target) {
			if (source.species.id === 'miltank') {
				move.type = 'Flying';
			}
		},
		onUseMoveMessage(pokemon, target, move) {
			if (pokemon.species.id === 'miltank') {
				this.add('-message', `${pokemon.name}'s ${move.name} is ${move.type}-type!`);
			}
		},
	},
	secretpower: {
		inherit: true,
		onModifyMove(move, pokemon) {
			if (pokemon.species.id === 'miltank') {
				move.type = 'Psychic';
			}
			if (this.field.isTerrain('')) return;
			move.secondaries = [];
			if (this.field.isTerrain('electricterrain')) {
				move.secondaries.push({
					chance: 30,
					status: 'par',
				});
			} else if (this.field.isTerrain('grassyterrain')) {
				move.secondaries.push({
					chance: 30,
					status: 'slp',
				});
			} else if (this.field.isTerrain('mistyterrain')) {
				move.secondaries.push({
					chance: 30,
					boosts: {
						spa: -1,
					},
				});
			} else if (this.field.isTerrain('psychicterrain')) {
				move.secondaries.push({
					chance: 30,
					boosts: {
						spe: -1,
					},
				});
			}
		},
		onUseMoveMessage(pokemon, target, move) {
			if (pokemon.species.id === 'miltank') {
				this.add('-message', `${pokemon.name}'s ${move.name} is ${move.type}-type!`);
			}
		},
	},
	sleeptalk: {
		inherit: true,
		onModifyMove(move, source, target) {
			if (source.species.id === 'miltank') {
				move.type = 'Psychic';
			}
		},
		onUseMoveMessage(pokemon, target, move) {
			if (pokemon.species.id === 'miltank') {
				this.add('-message', `${pokemon.name}'s ${move.name} is ${move.type}-type!`);
			}
		},
	},
	snore: {
		inherit: true,
		onModifyMove(move, source, target) {
			if (source.species.id === 'miltank') {
				move.type = 'Psychic';
			}
		},
		onUseMoveMessage(pokemon, target, move) {
			if (pokemon.species.id === 'miltank') {
				this.add('-message', `${pokemon.name}'s ${move.name} is ${move.type}-type!`);
			}
		},
	},
	stomp: {
		inherit: true,
		onModifyMove(move, source, target) {
			if (source.species.id === 'miltank') {
				move.type = 'Ground';
			}
		},
		onUseMoveMessage(pokemon, target, move) {
			if (pokemon.species.id === 'miltank') {
				this.add('-message', `${pokemon.name}'s ${move.name} is ${move.type}-type!`);
			}
		},
	},
	strength: {
		inherit: true,
		onModifyMove(move, source, target) {
			if (source.species.id === 'miltank') {
				move.type = 'Rock';
			}
		},
		onUseMoveMessage(pokemon, target, move) {
			if (pokemon.species.id === 'miltank') {
				this.add('-message', `${pokemon.name}'s ${move.name} is ${move.type}-type!`);
			}
		},
	},
	substitute: {
		inherit: true,
		onModifyMove(move, source, target) {
			if (source.species.id === 'miltank') {
				move.type = 'Poison';
			}
		},
		onUseMoveMessage(pokemon, target, move) {
			if (pokemon.species.id === 'miltank') {
				this.add('-message', `${pokemon.name}'s ${move.name} is ${move.type}-type!`);
			}
		},
	},
	swagger: {
		inherit: true,
		onModifyMove(move, source, target) {
			if (source.species.id === 'miltank') {
				move.type = 'Dark';
			}
		},
		onUseMoveMessage(pokemon, target, move) {
			if (pokemon.species.id === 'miltank') {
				this.add('-message', `${pokemon.name}'s ${move.name} is ${move.type}-type!`);
			}
		},
	},
	sweetscent: {
		inherit: true,
		onModifyMove(move, source, target) {
			if (source.species.id === 'miltank') {
				move.type = 'Grass';
			}
		},
		onUseMoveMessage(pokemon, target, move) {
			if (pokemon.species.id === 'miltank') {
				this.add('-message', `${pokemon.name}'s ${move.name} is ${move.type}-type!`);
			}
		},
	},
	tackle: {
		inherit: true,
		onModifyMove(move, source, target) {
			if (source.species.id === 'miltank') {
				move.type = 'Ground';
			}
		},
		onUseMoveMessage(pokemon, target, move) {
			if (pokemon.species.id === 'miltank') {
				this.add('-message', `${pokemon.name}'s ${move.name} is ${move.type}-type!`);
			}
		},
	},
	workup: {
		inherit: true,
		onModifyMove(move, source, target) {
			if (source.species.id === 'miltank') {
				move.type = 'Fairy';
			}
		},
		onUseMoveMessage(pokemon, target, move) {
			if (pokemon.species.id === 'miltank') {
				this.add('-message', `${pokemon.name}'s ${move.name} is ${move.type}-type!`);
			}
		},
	},
	spectralresidue: {
		num: -1001,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		desc: "The target's stat stages greater than 0 are stolen from it and applied to the user before dealing damage.",
		shortDesc: "Steals target's boosts before dealing damage.",
		name: "Spectral Residue",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, authentic: 1},
		stealsBoosts: true,
		// Boost stealing implemented in scripts.js
		secondary: null,
		target: "normal",
		type: "Poison",
		contestType: "Cool",
	},
	scumstealing7scrapstrike: {
		num: -1002,
		accuracy: true,
		basePower: 195,
		category: "Physical",
		shortDesc: "No additional effect.",
		name: "Scum-Stealing 7-Scrap Strike",
		pp: 1,
		priority: 0,
		flags: {contact: 1},
		isZ: "marshadiumz",
		secondary: null,
		target: "normal",
		type: "Poison",
		contestType: "Cool",
	},
	sparksplosion: {
		num: -1003,
		accuracy: 100,
		basePower: 140,
		category: "Special",
		desc: "The user faints after using this move, even if this move fails for having no target. This move is prevented from executing if any active Pokémon has the Damp Ability.",
		shortDesc: "Hits, paralyzes adjacent Pokémon. The user faints.",
		name: "Sparksplosion",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		selfdestruct: "always",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Zap Cannon", target);
		},
		secondary: {
			chance: 100,
			status: 'par',
		},
		target: "allAdjacent",
		type: "Electric",
		contestType: "Beautiful",
	},
	inverseroom: {
		num: -1004,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "For 5 turns, all Pokémon on the field are resistant to normally super-effective types and weak to normally not-very-effective types (as in Inverse Battles). Immunities are not bypassed.",
		shortDesc: "For 5 turns, simulates Inverse Battle. Immunities are NOT bypassed.",
		name: "Inverse Room",
		pp: 5,
		priority: 0,
		flags: {mirror: 1},
		pseudoWeather: 'inverseroom',
		effect: {
			duration: 5,
			durationCallback: function(source, effect) {
				if (source && source.hasAbility('persistent')) {
					return 7;
				}
				else if (source && source.hasItem('roomextender')) {
					return 8;
				}
				return 5;
			},
			onStart: function(target, source) {
				this.add('-fieldstart', 'move: Inverse Room', '[of] ' + source);
			},
			onRestart: function (target, source) {
				return null;
			},
			onEffectiveness: function(typeMod, target, type, move) {
				if (move && this.dex.getImmunity(move, type) === false) return 3;
				return -typeMod;
			},
			onResidualOrder: 23,
			onEnd: function() {
				this.add('-fieldend', 'move: Inverse Room');
			},
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', target, "Sunny Day", source);
		},
		secondary: null,
		target: "all",
		type: "Psychic",
		zMoveBoost: {acc: 1},
	},
	meteorshower: {
		num: -1005,
		accuracy: 100,
		basePower: 130,
		category: "Special",
		desc: "Lowers the user's Special Attack by 2 stages.",
		shortDesc: "Lowers the user's Sp. Atk by 2.",
		name: "Meteor Shower",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		self: {
			boosts: {
				spa: -2,
			},
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Draco Meteor", target);
		},
		secondary: null,
		target: "normal",
		type: "Rock",
		contestType: "Beautiful",
	},
	pragmastrike: {
		num: -1006,
		accuracy: 100,
		basePower: 75,
		basePowerCallback: function (pokemon, target, move) {
			if (this.field.pseudoWeather.trickroom || this.field.pseudoWeather.wonderroom || this.field.pseudoWeather.inverseroom || this.field.pseudoWeather.magicroom) {
				return move.basePower * 1.5;
			}
			return move.basePower;
		},
		category: "Physical",
		desc: "Has a 100% chance to lower the target's Speed by 1 stage.",
		shortDesc: "If a Room is active, 1.5x power; destroys the Room.",
		name: "Pragma-Strike",
		pp: 10,
		priority: 0,
		flags: {
			protect: 1,
			mirror: 1,
		},
		secondary: null,
		onAfterHit: function(target, source) {
			this.field.removePseudoWeather('trickroom');
			this.field.removePseudoWeather('magicroom');
			this.field.removePseudoWeather('wonderroom');
			this.field.removePseudoWeather('inverseroom');
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Power Trip", target);
		},
		target: "normal",
		type: "Dark",
		zMovePower: 140,
		contestType: "Tough",
	},
	astonish: {
		num: 310,
		accuracy: 100,
		basePower: 30,
		category: "Physical",
		desc: "Has a 30% chance to flinch the target. For Beheeyem from Sylvemons, has a 100% chance to flinch the target but fails unless it is the user's first turn on the field.",
		shortDesc: "30% chance to flinch the target. For Beheeyem, clone of Fake Out.",
		name: "Astonish",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onTry(pokemon, target) {
			if (pokemon.species.id === 'beheeyem' && pokemon.activeMoveActions > 1) {
				this.attrLastMove('[still]');
				this.add('-fail', pokemon);
				this.hint("For Beheeyem from Sylvemons, Astonish only works on your first turn out.");
				return null;
			}
		},
		onModifyMove(move, source, target) {
			if (source.species.id === 'beheeyem') {
				move.secondaries = [];
				move.secondaries.push({
					chance: 100,
					volatileStatus: 'flinch',
				});
			}
		},
		secondary: {
			chance: 30,
			volatileStatus: 'flinch',
		},
		target: "normal",
		type: "Ghost",
		contestType: "Cute",
	},
	psywave: {
		num: 149,
		accuracy: 100,
		basePower: 0,
		damageCallback(pokemon) {
			if (pokemon.species.id === 'beheeyem') {
				return pokemon.level;
			}
			return (this.random(50, 151) * pokemon.level) / 100;
		},
		category: "Special",
		desc: "Deals damage to the target equal to (user's level) * (X + 50) / 100, where X is a random number from 0 to 100, rounded down, but not less than 1 HP. For Beheeyem from Sylvemons, instead deals damage to the target equal to the user's level.",
		shortDesc: "Random damage equal to 0.5x-1.5x user's level. For Beheeyem, clone of Night Shade.",
		isNonstandard: "Past",
		name: "Psywave",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Psychic",
		contestType: "Clever",
	},
	teleport: {
		num: 100,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "If this move is successful and the user has not fainted, the user switches out even if it is trapped and is replaced immediately by a selected party member. The user does not switch out if there are no unfainted party members. For Beheeyem from Sylvemons, if this move is successful and the user has not fainted, the user switches out even if it is trapped and is replaced immediately by a selected party member. The user does not switch out if there are no unfainted party members, or if the target switched out using an Eject Button or through the effect of the Emergency Exit or Wimp Out Abilities.",
		shortDesc: "User switches out. For Beheeyem, clone of Volt Switch.",
		name: "Teleport",
		pp: 20,
		priority: -6,
		flags: {},
		selfSwitch: true,
		onModifyMove(move, source, target) {
			if (source.species.id === 'beheeyem') {
				move.accuracy = 100;
				move.category = 'Special';
				move.basePower = 70;
				move.target = 'normal';
				move.ignoreImmunity = false;
				move.flags.protect = 1;
				move.flags.mirror = 1;
			} else {
				move.onTryHit = true;
			}
		},
		onModifyPriority(priority, source, target, move) {
			if (source.species.id === 'beheeyem') {
				return 0;
			}
		},
		secondary: null,
		target: "self",
		type: "Psychic",
		zMove: {effect: 'heal'},
		contestType: "Cool",
	},
	powergem: {
		num: 408,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		desc: "For Claydol from CFM, this move's base power is 90, its PP is 24, and it has a 10% chance to lower the target's Special Defense by 1 stage.",
		shortDesc: "CFM Claydol: 90 BP, 24 PP, 10% to lower SpD.",
		name: "Power Gem",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyMove(move, source, target) {
			if (source.species.id === 'claydol') {
				move.basePower = 90;
				move.secondaries = [];
				move.secondaries.push({
					chance: 10,
					boosts: {
						spd: -1,
					},
				});
			}
		},
		secondary: null,
		target: "normal",
		type: "Rock",
		contestType: "Beautiful",
	},
	psyshock: {
		num: 473,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		defensiveCategory: "Physical",
		desc: "Deals damage to the target based on its Defense instead of Special Defense. For Claydol from CFM, this move's base power is 90, and it has a 10% chance to lower the target's Special Defense by 1 stage.",
		shortDesc: "Damages target based on Defense, not Sp. Def. CFM Claydol only: 90 BP, 10% to lower Def.",
		name: "Psyshock",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyMove(move, source, target) {
			if (source.species.id === 'claydol') {
				move.basePower = 90;
				move.secondaries = [];
				move.secondaries.push({
					chance: 10,
					boosts: {
						def: -1,
					},
				});
			}
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
		contestType: "Beautiful",
	},
	zenheadbutt: {
		num: 428,
		accuracy: 90,
		basePower: 80,
		category: "Physical",
		desc: "Has a 20% chance to flinch the target. For Claydol from CFM, this move's base power is 90, and its accuracy is 100%.",
		shortDesc: "20% chance to flinch the target. CFM Claydol: 90 BP, 100 acc.",
		name: "Zen Headbutt",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onModifyMove(move, source, target) {
			if (source.species.id === 'claydol') {
				move.basePower = 90;
				move.accuracy = 100;
			}
		},
		secondary: {
			chance: 20,
			volatileStatus: 'flinch',
		},
		target: "normal",
		type: "Psychic",
		contestType: "Clever",
	},
};
