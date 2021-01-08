export const Moves: {[moveid: string]: ModdedMoveData} = {
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
		condition: {
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
		condition: {
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
		condition: {
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
		condition: {
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
		condition: {
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
		condition: {
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
			} else if (source.species.id === 'claydol') {
				let type = source.types[0];
				if (type === "Bird") type = "???";
				move.type = type;
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
		condition: {
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
	spikecannon: {
		num: 131,
		accuracy: 100,
		basePower: 20,
		category: "Physical",
		desc: "Hits two to five times. Has a 35% chance to hit two or three times and a 15% chance to hit four or five times. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. If the user has the Skill Link Ability, this move will always hit five times. For Escavalier from Sylvemons, this move is Steel-type and its base power is 25.",
		shortDesc: "Hits 2-5 times in one turn. For Escavalier, Steel-type and 25 BP.",
		name: "Spike Cannon",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		multihit: [2, 5],
		onModifyMove(move, source, target) {
			if (source.species.id === 'escavalier') {
				move.type = 'Steel';
				move.basePower = 25;
			}
		},
		onUseMoveMessage(pokemon, target, move) {
			if (pokemon.species.id === 'escavalier') {
				this.add('-message', `${pokemon.name}'s ${move.name} is ${move.type}-type!`);
			}
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		maxMove: {basePower: 120},
		contestType: "Cool",
	},
	guillotine: {
		num: 12,
		accuracy: 30,
		basePower: 0,
		category: "Physical",
		desc: "Deals damage to the target equal to the target's maximum HP. Ignores accuracy and evasiveness modifiers. This attack's accuracy is equal to (user's level - target's level + 30)%, and fails if the target is at a higher level. Pokémon with the Sturdy Ability are immune. For Escavalier from Sylvemons, the move's base power is 130, its accuracy is 100, and it lowers the user's Attack by 2 stages.",
		shortDesc: "OHKOs the target. Fails if user is a lower level. For Escavalier, physical clone of Overheat.",
		name: "Guillotine",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onModifyMove(move, source, target) {
			if (source.species.id === 'escavalier') {
				move.accuracy = 100;
				move.basePower = 130;
			} else {
				move.ohko = true;
			}
		},
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (pokemon.species.id === 'escavalier') this.boost({atk: -2}, pokemon, pokemon, move);
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		zMove: {basePower: 180},
		maxMove: {basePower: 130},
		contestType: "Cool",
	},
	horndrill: {
		num: 32,
		accuracy: 30,
		basePower: 0,
		category: "Physical",
		desc: "Deals damage to the target equal to the target's maximum HP. Ignores accuracy and evasiveness modifiers. This attack's accuracy is equal to (user's level - target's level + 30)%, and fails if the target is at a higher level. Pokémon with the Sturdy Ability are immune. For Escavalier from Sylvemons, the move's base power is 130, its accuracy is 100, and it lowers the user's Attack by 2 stages.",
		shortDesc: "OHKOs the target. Fails if user is a lower level. For Escavalier, physical clone of Overheat",
		name: "Horn Drill",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onModifyMove(move, source, target) {
			if (source.species.id === 'escavalier') {
				move.accuracy = 100;
				move.basePower = 130;
			} else {
				move.ohko = true;
			}
		},
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (pokemon.species.id === 'escavalier') this.boost({atk: -2}, pokemon, pokemon, move);
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		zMove: {basePower: 180},
		maxMove: {basePower: 130},
		contestType: "Cool",
	},
	fellstinger: {
		num: 565,
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		desc: "Raises the user's Attack by 3 stages if this move knocks out the target. For Escavalier from Sylvemons, the move's base power is 65.",
		shortDesc: "Raises user's Attack by 3 if this KOes the target. For Escavalier, 65 BP.",
		name: "Fell Stinger",
		pp: 25,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (!target || target.fainted || target.hp <= 0) this.boost({atk: 3}, pokemon, pokemon, move);
		},
		onModifyMove(move, source, target) {
			if (source.species.id === 'escavalier') {
				move.basePower = 65;
			}
		},
		secondary: null,
		target: "normal",
		type: "Bug",
		contestType: "Cool",
	},
	furycutter: {
		num: 210,
		accuracy: 95,
		basePower: 40,
		basePowerCallback(pokemon, target, move) {
			if (pokemon.species.id === 'escavalier') {
				return 120;
			}
			if (!pokemon.volatiles['furycutter'] || move.hit === 1) {
				pokemon.addVolatile('furycutter');
			}
			return this.clampIntRange(move.basePower * pokemon.volatiles['furycutter'].multiplier, 1, 160);
		},
		category: "Physical",
		desc: "Power doubles with each successful hit, up to a maximum of 160 power. The power is reset if this move misses or another move is used. For Escavalier from Sylvemons, the user spends two or three turns locked into this move and becomes confused immediately after its move on the last turn of the effect if it is not already. This move targets an opposing Pokémon at random on each turn. If the user is prevented from moving, is asleep at the beginning of a turn, or the attack is not successful against the target on the first turn of the effect or the second turn of a three-turn effect, the effect ends without causing confusion. If this move is called by Sleep Talk and the user is asleep, the move is used for one turn and does not confuse the user.",
		shortDesc: "Power doubles with each hit, up to 160. For Escavalier, lasts 2-3 turns. Confuses Escavalier afterwards.",
		name: "Fury Cutter",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onModifyMove(move, source, target) {
			if (source.species.id === 'escavalier') {
				move.accuracy = 100;
			}
		},
		onAfterMove(pokemon) {
			pokemon.addVolatile('lockedmove');
			if (pokemon.volatiles['lockedmove']) {
				if (pokemon.volatiles['lockedmove'].duration === 1) {
					pokemon.removeVolatile('lockedmove');
				}
			}
		},
		condition: {
			duration: 2,
			onStart() {
				this.effectData.multiplier = 1;
			},
			onRestart() {
				if (this.effectData.multiplier < 4) {
					this.effectData.multiplier <<= 1;
				}
				this.effectData.duration = 2;
			},
		},
		secondary: null,
		target: "normal",
		type: "Bug",
		contestType: "Cool",
	},
	twineedle: {
		num: 41,
		accuracy: 100,
		basePower: 25,
		category: "Physical",
		desc: "Hits twice, with each hit having a 20% chance to poison the target. If the first hit breaks the target's substitute, it will take damage for the second hit. For Escavalier from Sylvemons, the move's power is 50, and its accuracy is 90.",
		shortDesc: "Hits 2 times. Each hit has 20% chance to poison. For Escavalier, 50 BP and 90 acc.",
		name: "Twineedle",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		multihit: 2,
		onModifyMove(move, source, target) {
			if (source.species.id === 'escavalier') {
				move.accuracy = 90;
				move.power = 50;
			}
		},
		secondary: {
			chance: 20,
			status: 'psn',
		},
		target: "normal",
		type: "Bug",
		maxMove: {basePower: 100},
		contestType: "Cool",
	},
	bugbite: {
		num: 450,
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		desc: "If this move is successful and the user has not fainted, it steals the target's held Berry if it is holding one and eats it immediately, gaining its effects even if the user's item is being ignored. For Escavalier from Sylvemons, this move's power is 65, and if the target is holding an item that can be removed from it, ignoring the Sticky Hold Ability, this move's power is multiplied by 1.5. If the user has not fainted, the target loses its held item. This move cannot cause Pokémon with the Sticky Hold Ability to lose their held item or cause a Kyogre, a Groudon, a Giratina, an Arceus, a Genesect, a Silvally, a Zacian, or a Zamazenta to lose their Blue Orb, Red Orb, Griseous Orb, Plate, Drive, Memory, Rusted Sword, or Rusted Shield respectively. Items lost to this move cannot be regained with Recycle or the Harvest Ability.",
		shortDesc: "User steals and eats the target's Berry. For Escavalier, 65 BP and 1.5x damage if foe holds an item; removes item and eats if Berry.",
		name: "Bug Bite",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onBasePower(basePower, source, target, move) {
			if (source.species.id === 'escavalier') {
				const item = target.getItem();
				if (!this.singleEvent('TakeItem', item, target.itemData, target, target, move, item)) return;
				if (item.id) {
					return this.chainModify(1.5);
				}
			}
		},
		onHit(target, source) {
			const item = target.getItem();
			if (source.hp && item.isBerry && target.takeItem(source)) {
				this.add('-enditem', target, item.name, '[from] stealeat', '[move] Bug Bite', '[of] ' + source);
				if (this.singleEvent('Eat', item, null, source, null, null)) {
					this.runEvent('EatItem', source, null, null, item);
					if (item.id === 'leppaberry') target.staleness = 'external';
				}
				if (item.onEat) source.ateBerry = true;
			}
		},
		onAfterHit(target, source) {
			if (source.hp && source.species.id === 'escavalier') {
				const item = target.takeItem();
				if (item) {
					this.add('-enditem', target, item.name, '[from] move: Bug Bite', '[of] ' + source);
				}
			}
		},
		onModifyMove(move, source, target) {
			if (source.species.id === 'escavalier') {
				move.power = 65;
			}
		},
		secondary: null,
		target: "normal",
		type: "Bug",
		contestType: "Cute",
	},
	pluck: {
		num: 365,
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		desc: "If this move is successful and the user has not fainted, it steals the target's held Berry if it is holding one and eats it immediately, gaining its effects even if the user's item is being ignored. For Escavalier from Sylvemons, this move's power is 65, and if the target is holding an item that can be removed from it, ignoring the Sticky Hold Ability, this move's power is multiplied by 1.5. If the user has not fainted, the target loses its held item. This move cannot cause Pokémon with the Sticky Hold Ability to lose their held item or cause a Kyogre, a Groudon, a Giratina, an Arceus, a Genesect, a Silvally, a Zacian, or a Zamazenta to lose their Blue Orb, Red Orb, Griseous Orb, Plate, Drive, Memory, Rusted Sword, or Rusted Shield respectively. Items lost to this move cannot be regained with Recycle or the Harvest Ability.",
		shortDesc: "User steals and eats the target's Berry. For Escavalier, 65 BP and 1.5x damage if foe holds an item; removes item and eats if Berry.",
		name: "Pluck",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, distance: 1},
		onBasePower(basePower, source, target, move) {
			if (source.species.id === 'escavalier') {
				const item = target.getItem();
				if (!this.singleEvent('TakeItem', item, target.itemData, target, target, move, item)) return;
				if (item.id) {
					return this.chainModify(1.5);
				}
			} else {
				return 60;
			}
		},
		onHit(target, source) {
			const item = target.getItem();
			if (source.hp && item.isBerry && target.takeItem(source)) {
				this.add('-enditem', target, item.name, '[from] stealeat', '[move] Bug Bite', '[of] ' + source);
				if (this.singleEvent('Eat', item, null, source, null, null)) {
					this.runEvent('EatItem', source, null, null, item);
					if (item.id === 'leppaberry') target.staleness = 'external';
				}
				if (item.onEat) source.ateBerry = true;
			}
		},
		onAfterHit(target, source) {
			if (source.hp && source.species.id === 'escavalier') {
				const item = target.takeItem();
				if (item) {
					this.add('-enditem', target, item.name, '[from] move: Pluck', '[of] ' + source);
				}
			}
		},
		onModifyMove(move, source, target) {
			if (source.species.id === 'escavalier') {
				move.power = 65;
			}
		},
		secondary: null,
		target: "any",
		type: "Flying",
		contestType: "Cute",
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
	bulldoze: {
		num: 523,
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		shortDesc: "CFM Claydol: 80 BP, 90 acc, 50% chance to lower Speed.",
		name: "Bulldoze",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1, nonsky: 1},
		onModifyMove(move, source, target) {
			move.secondaries = [];
			if (source.species.id === 'claydol') {
				move.power = 80;
				move.accuracy = 90;
				move.secondaries.push({
					chance: 50,
					boosts: {
						spe: -1,
					},
				});
			} else {
				move.secondaries.push({
					chance: 100,
					boosts: {
						spe: -1,
					}
				});
			}
		},
		target: "allAdjacent",
		type: "Ground",
		contestType: "Tough",
	},
	chargebeam: {
		num: 451,
		accuracy: 90,
		basePower: 50,
		category: "Special",
		shortDesc: "CFM Claydol: 40 BP, 100 acc, 100% chance to raise Sp. Atk.",
		name: "Charge Beam",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyMove(move, source, target) {
			move.secondaries = [];
			if (source.species.id === 'claydol') {
				move.power = 40;
				move.accuracy = 100;
				move.secondaries.push({
					chance: 100,
					self: {
						boosts: {
							spa: 1,
						}
					},
				});
			} else {
				move.secondaries.push({
					chance: 70,
					self: {
						boosts: {
							spa: 1,
						}
					}
				});
			}
		},
		target: "normal",
		type: "Electric",
		contestType: "Beautiful",
	},
	dreameater: {
		num: 138,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		shortDesc: "CFM Claydol: 75 BP, 1.5x on sleeping targets; does not fail if the target is awake.",
		name: "Dream Eater",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, heal: 1},
		drain: [1, 2],
		onTryImmunity(target, source) {
			if (source.species.id === 'claydol') {
				return this.dex.getImmunity('Psychic', target);
			}
			return target.status === 'slp' || target.hasAbility('comatose');
		},
		onModifyMove(move, source, target) {
			if (source.species.id === 'claydol') {
				move.power = 75;
			}
		},
		onBasePower(basePower, pokemon, target) {
			if (pokemon.species.id === 'claydol') {
				if (target.status === 'slp' || target.hasAbility('comatose')) {
					return this.chainModify(1.5);
				}
			}
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
		contestType: "Clever",
	},
	drillrun: {
		num: 529,
		accuracy: 95,
		basePower: 80,
		category: "Physical",
		shortDesc: "CFM Claydol: 85 BP, 100 acc, normal crit ratio, 10% lower Def, hits Ground-immune targets for at most neutral damage.",
		name: "Drill Run",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		critRatio: 2,
		onModifyMove(move, source, target) {
			if (source.species.id === 'claydol') {
				move.power = 85;
				move.accuracy = 100;
				move.critRatio = 1;
				move.secondaries = [];
				move.secondaries.push({
					chance: 10,
					boosts: {
						def: -1,
					},
				});
			} else {
				delete move.ignoreImmunity;
			}
		},
		onEffectiveness(typeMod, target, type, move) {
			if (move.type !== 'Ground') return;
			if (!target) return; // avoid crashing when called from a chat plugin
			// ignore effectiveness if the target should be immune to Ground AND would be weak to Ground
			if (!target.runImmunity('Ground')) {
				if (typeMod > 0) return 0;
			}
		},
		ignoreImmunity: {'Ground': true},
		secondary: null,
		target: "normal",
		type: "Ground",
		contestType: "Tough",
	},
	earthquake: {
		num: 89,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		shortDesc: "CFM Claydol: never misses.",
		name: "Earthquake",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, nonsky: 1},
		onModifyMove(move, source, target) {
			if (source.species.id === 'claydol') {
				move.accuracy = true;
			}
		},
		secondary: null,
		target: "allAdjacent",
		type: "Ground",
		contestType: "Tough",
	},
	grassknot: {
		num: 447,
		accuracy: 100,
		basePower: 0,
		basePowerCallback(pokemon, target) {
			const targetWeight = target.getWeight();
			if (targetWeight >= 2000) {
				this.debug('120 bp');
				return 120;
			}
			if (targetWeight >= 1000) {
				this.debug('100 bp');
				return 100;
			}
			if (targetWeight >= 500) {
				this.debug('80 bp');
				return 80;
			}
			if (targetWeight >= 250) {
				this.debug('60 bp');
				return 60;
			}
			if (targetWeight >= 100) {
				this.debug('40 bp');
				return 40;
			}
			this.debug('20 bp');
			return 20;
		},
		category: "Special",
		shortDesc: "CFM Claydol: does not make contact.",
		name: "Grass Knot",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, nonsky: 1},
		onTryHit(target, source, move) {
			if (target.volatiles['dynamax']) {
				this.add('-fail', source, 'move: Grass Knot', '[from] Dynamax');
				this.attrLastMove('[still]');
				return null;
			}
		},
		onModifyMove(move, source, target) {
			if (source.species.id === 'claydol') {
				move.flags.contact = 0;
			}
		},
		secondary: null,
		target: "normal",
		type: "Grass",
		zMove: {basePower: 160},
		maxMove: {basePower: 130},
		contestType: "Cute",
	},
	naturalgift: {
		num: 363,
		accuracy: 100,
		basePower: 0,
		category: "Physical",
		shortDesc: "CFM Claydol: does not consume held Berry.",
		name: "Natural Gift",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyType(move, pokemon) {
			if (pokemon.ignoringItem()) return;
			const item = pokemon.getItem();
			if (!item.naturalGift) return;
			move.type = item.naturalGift.type;
		},
		onPrepareHit(target, pokemon, move) {
			if (pokemon.ignoringItem()) return false;
			const item = pokemon.getItem();
			if (!item.naturalGift) return false;
			move.basePower = item.naturalGift.basePower;
			if (pokemon.species.id !== 'claydol') {
				pokemon.setItem('');
				pokemon.lastItem = item.id;
				pokemon.usedItemThisTurn = true;
				this.runEvent('AfterUseItem', pokemon, null, null, item);
			}
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		zMove: {basePower: 160},
		maxMove: {basePower: 130},
		contestType: "Clever",
	},
	psychic: {
		num: 94,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		shortDesc: "CFM Claydol: 20% chance to lower Sp. Def.",
		name: "Psychic",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyMove(move, source, target) {
			move.secondaries = [];
			if (source.species.id === 'claydol') {
				move.secondaries.push({
					chance: 20,
					boosts: {
						spd: -1,
					},
				});
			} else {
				move.secondaries.push({
					chance: 10,
					boosts: {
						spd: -1,
					},
				});
			}
		},
		target: "normal",
		type: "Psychic",
		contestType: "Clever",
	},
	rest: {
		inherit: true,
		onModifyMove(move, source, target) {
			if (source.species.id === 'claydol') {
				move.type = 'Normal';
			}
		},
		onUseMoveMessage(pokemon, target, move) {
			if (pokemon.species.id === 'claydol') {
				this.add('-message', `${pokemon.name}'s ${move.name} is ${move.type}-type!`);
			}
		},
	},
	rockslide: {
		num: 157,
		accuracy: 90,
		basePower: 75,
		category: "Physical",
		shortDesc: "CFM Claydol: 80 BP, 100 acc, 20% chance to flinch.",
		name: "Rock Slide",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyMove(move, source, target) {
			move.secondaries = [];
			if (source.species.id === 'claydol') {
				move.power = 80;
				move.accuracy = 100;
				move.secondaries.push({
					chance: 20,
					volatileStatus: 'flinch',
				});
			} else {
				move.secondaries.push({
					chance: 30,
					volatileStatus: 'flinch',
				});
			}
		},
		target: "allAdjacentFoes",
		type: "Rock",
		contestType: "Tough",
	},
	rocksmash: {
		num: 249,
		accuracy: 100,
		basePower: 40,
		category: "Physical",
		shortDesc: "CFM Claydol: 60 BP.",
		name: "Rock Smash",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onModifyMove(move, source, target) {
			if (source.species.id === 'claydol') {
				move.power = 60;
			}
		},
		secondary: {
			chance: 50,
			boosts: {
				def: -1,
			},
		},
		target: "normal",
		type: "Fighting",
		contestType: "Tough",
	},
	shadowball: {
		num: 247,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		shortDesc: "CFM Claydol: 90 BP.",
		name: "Shadow Ball",
		pp: 15,
		priority: 0,
		flags: {bullet: 1, protect: 1, mirror: 1},
		onModifyMove(move, source, target) {
			if (source.species.id === 'claydol') {
				move.power = 90;
			}
		},
		secondary: {
			chance: 20,
			boosts: {
				spd: -1,
			},
		},
		target: "normal",
		type: "Ghost",
		contestType: "Clever",
	},
	sleeptalk: {
		num: 214,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "CFM Claydol: no chance to call Rest.",
		name: "Sleep Talk",
		pp: 10,
		priority: 0,
		flags: {},
		sleepUsable: true,
		onTryHit(pokemon) {
			if (pokemon.status !== 'slp' && !pokemon.hasAbility('comatose')) return false;
		},
		onHit(pokemon) {
			const noSleepTalk = [
				'assist', 'beakblast', 'belch', 'bide', 'celebrate', 'chatter', 'copycat', 'dynamaxcannon', 'focuspunch', 'mefirst', 'metronome', 'mimic', 'mirrormove', 'naturepower', 'shelltrap', 'sketch', 'sleeptalk', 'uproar',
			];
			const cfmNoSleepTalk = [
				'rest',
			];
			const moves = [];
			for (const moveSlot of pokemon.moveSlots) {
				const moveid = moveSlot.id;
				if (!moveid) continue;
				const move = this.dex.getMove(moveid);
				if (noSleepTalk.includes(moveid) || (pokemon.species.id === 'claydol' && cfmNoSleepTalk.includes(moveid)) || move.flags['charge'] || (move.isZ && move.basePower !== 1)) {
					continue;
				}
				moves.push(moveid);
			}
			let randomMove = '';
			if (moves.length) randomMove = this.sample(moves);
			if (!randomMove) {
				return false;
			}
			this.useMove(randomMove, pokemon);
		},
		secondary: null,
		target: "self",
		type: "Normal",
		zMove: {effect: 'crit2'},
		contestType: "Cute",
	},
	solarbeam: {
		num: 76,
		accuracy: 100,
		basePower: 120,
		category: "Special",
		shortDesc: "CFM Claydol: no charge turn; half power in all non-sun weather.",
		name: "Solar Beam",
		pp: 10,
		priority: 0,
		flags: {charge: 1, protect: 1, mirror: 1},
		onTryMove(attacker, defender, move) {
			if (attacker.species.id === 'claydol') return;
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name);
			if (['sunnyday', 'desolateland'].includes(attacker.effectiveWeather())) {
				this.attrLastMove('[still]');
				this.addMove('-anim', attacker, move.name, defender);
				return;
			}
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
		onBasePower(basePower, pokemon, target) {
			if (['raindance', 'primordialsea', 'sandstorm', 'hail'].includes(pokemon.effectiveWeather())) {
				this.debug('weakened by weather');
				return this.chainModify(0.5);
			} else if (pokemon.species.id === 'claydol' && ['deltastream'].includes(pokemon.effectiveWeather())) {
				this.debug('weakened by weather');
				return this.chainModify(0.5);
			}
		},
		secondary: null,
		target: "normal",
		type: "Grass",
		contestType: "Cool",
	},
	stoneedge: {
		num: 444,
		accuracy: 80,
		basePower: 100,
		category: "Physical",
		shortDesc: "CFM Claydol: 85 acc; never misses in sandstorm.",
		name: "Stone Edge",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		critRatio: 2,
		onModifyMove(move, source, target) {
			if (source.species.id === 'claydol') {
				if (this.field.isWeather('sandstorm')) {
					move.accuracy = true;
				} else {
					move.accuracy = 85;
				}
			}
		},
		secondary: null,
		target: "normal",
		type: "Rock",
		contestType: "Tough",
	},
	telekinesis: {
		num: 477,
		accuracy: true,
		basePower: 0,
		category: "Status",
		isNonstandard: "Past",
		shortDesc: "CFM Claydol: 80 BP special move; cannot be reflected by Magic Coat.",
		name: "Telekinesis",
		pp: 15,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, gravity: 1, mystery: 1},
		volatileStatus: 'telekinesis',
		condition: {
			duration: 3,
			onStart(target) {
				if (['Diglett', 'Dugtrio', 'Palossand', 'Sandygast'].includes(target.baseSpecies.baseSpecies) ||
						target.baseSpecies.name === 'Gengar-Mega') {
					this.add('-immune', target);
					return null;
				}
				if (target.volatiles['smackdown'] || target.volatiles['ingrain']) return false;
				this.add('-start', target, 'Telekinesis');
			},
			onAccuracyPriority: -1,
			onAccuracy(accuracy, target, source, move) {
				if (move && !move.ohko) return true;
			},
			onImmunity(type) {
				if (type === 'Ground') return false;
			},
			onUpdate(pokemon) {
				if (pokemon.baseSpecies.name === 'Gengar-Mega') {
					delete pokemon.volatiles['telekinesis'];
					this.add('-end', pokemon, 'Telekinesis', '[silent]');
				}
			},
			onResidualOrder: 16,
			onEnd(target) {
				this.add('-end', target, 'Telekinesis');
			},
		},
		onModifyMove(move, source, target) {
			if (source.species.id === 'claydol') {
				move.accuracy = 100;
				move.category = 'Special';
				move.basePower = 80;
				move.ignoreImmunity = false;
				move.flags.reflectable = 0;
			} else {
				move.onTryHit = true;
			}
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
		zMove: {boost: {spa: 1}},
		contestType: "Clever",
	},
	washaway: {
		num: -1007,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The effects of binding moves, Reflect, Light Screen, Aurora Veil, Safeguard and Mist end for all affected targets. If this move affects at least one target, all hazards are removed from both sides of the field, and any terrain will be cleared.",
		shortDesc: "Clears trapping and screens from affected targets, then clears all hazards and terrain.",
		name: "Wash Away",
		pp: 20,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, authentic: 1},
		onHitField(target, source, move) {
			let hasLanded = false;
			let result = false;
			for (const pokemon of this.getAllActive()) {
				if (pokemon.hasAbility('waterabsorb')) {
					if (pokemon.hp === pokemon.maxHP) {
						this.add('-immune', pokemon, '[from] ability: Water Absorb');
					} else {
						this.add('-ability', pokemon, 'Water Absorb');
						this.heal(this.modify(pokemon.baseMaxhp, 0.75));
					}
				} else if (pokemon.hasAbility('stormdrain')) {
					if (pokemon.boosts.spa >= 6) {
						this.add('-immune', pokemon, '[from] ability: Storm Drain');
					} else {
						this.add('-ability', pokemon, 'Storm Drain');
						this.boost({spa: 1}, pokemon);
					}
				} else {
					hasLanded = true;
					if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
						pokemon.removeVolatile('partiallytrapped');
						result = true;
					}
					const washAway = [
						'reflect', 'lightscreen', 'auroraveil', 'safeguard', 'mist',
					];
					for (const targetCondition of washAway) {
						if (pokemon.side.removeSideCondition(targetCondition)) {
							this.add('-sideend', pokemon.side, this.dex.getEffect(targetCondition).name, '[from] move: Wash Away', '[of] ' + source);
							result = true;
						}
					}
				}
			}
			const removeAll = [
				'spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge',
			];
			if (hasLanded === true) {
				for (const targetCondition of removeAll) {
					if (target.side.removeSideCondition(targetCondition)) {
						if (!removeAll.includes(targetCondition)) continue;
						this.add('-sideend', target.side, this.dex.getEffect(targetCondition).name, '[from] move: Wash Away', '[of] ' + source);
						result = true;
					}
				}
				for (const sideCondition of removeAll) {
					if (source.side.removeSideCondition(sideCondition)) {
						this.add('-sideend', source.side, this.dex.getEffect(sideCondition).name, '[from] move: Wash Away', '[of] ' + source);
						result = true;
					}
				}
				if (this.field.terrain) {
					this.field.clearTerrain();
					result = true;
				}
				return result;
			}
		},
		secondary: null,
		target: "all",
		type: "Water",
		zMove: {boost: {accuracy: 1}},
		contestType: "Cool",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Soak", target);
		},
	},
	fieryboost: {
		num: -1008,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Raises the user's Attack and Special Defense by 1 stage.",
		shortDesc: "Raises the user's Attack and Sp. Def by 1.",
		name: "Fiery Boost",
		pp: 20,
		priority: 0,
		flags: {snatch: 1},
		boosts: {
			atk: 1,
			spd: 1,
		},
		secondary: null,
		target: "self",
		type: "Fire",
		zMove: {boost: {atk: 1}},
		contestType: "Cool",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Growth", target);
		},
	},
	stormshardslash: {
		num: -1009,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		desc: "Ends the effects of Electric Terrain, Grassy Terrain, Misty Terrain, and Psychic Terrain. Has a higher chance for a critical hit.",
		shortDesc: "Ends the effects of terrain. High critical hit ratio.",
		name: "Stormshard Slash",
		pp: 10,
		priority: 0,
		flags: {},
		critRatio: 2,
		onHit() {
			this.field.clearTerrain();
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Splintered Stormshards", target);
		},
		secondary: null,
		target: "normal",
		type: "Rock",
		contestType: "Cool",
	},
	stalwartsword: {
		num: -1009,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		desc: "Has a 30% chance to raise the user's Special Attack by 1 stage. Has a higher chance for a critical hit.",
		shortDesc: "30% chance to raise the user's Defense by 1. High critical hit ratio.",
		name: "Stalwart Sword",
		pp: 10,
		priority: 0,
		flags: {},
		critRatio: 2,
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Behemoth Blade", target);
		},
		secondary: {
			chance: 30,
			self: {
				boosts: {
					def: 1,
				},
			},
		},
		target: "normal",
		type: "Rock",
		contestType: "Cool",
	},
	shieldslam: {
		num: -1010,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		shortDesc: "Uses user's Def stat as Atk in damage calculation.",
		name: "Shield Slam",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		useSourceDefensiveAsOffensive: true,
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Behemoth Bash", target);
		},
		secondary: null,
		target: "normal",
		type: "Steel",
	},
	shieldbash: { // pfff
		num: -1011,
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		shortDesc: "Uses user's Def stat as Atk in damage calculation.",
		name: "Shield Bash",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		useSourceDefensiveAsOffensive: true,
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Behemoth Bash", target);
		},
		secondary: null,
		target: "normal",
		type: "Steel",
	},
	cleansinglight: {
		num: -1012,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Cleansing Light",
		pp: 10,
		priority: 0,
		flags: {charge: 1, snatch: 1, distance: 1, authentic: 1},
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name);
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
		onHit(pokemon, source) {
			this.add('-activate', source, 'move: Cleansing Light');
			const side = pokemon.side;
			let success = false;
			for (const ally of side.pokemon) {
				if (ally === source) {
					if (this.heal(ally.baseMaxhp)) success = true;
				}
				if (ally.cureStatus()) success = true;
			}
			return success;
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Tail Glow", target);
		},
		secondary: null,
		target: "allyTeam",
		type: "Normal",
		zMove: {boost: {atk: 1, def: 1, spa: 1, spd: 1, spe: 1}},
		contestType: "Beautiful",
	},
	redgauntlet: {
		num: -1013,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		shortDesc: "Destroys screens, unless the target is immune.",
		name: "Red Gauntlet",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onTryHit(pokemon) {
			// will shatter screens through sub, before you hit
			if (pokemon.runImmunity('Rock')) {
				pokemon.side.removeSideCondition('reflect');
				pokemon.side.removeSideCondition('lightscreen');
				pokemon.side.removeSideCondition('auroraveil');
			}
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Power-Up Punch", target);
		},
		secondary: null,
		target: "normal",
		type: "Rock",
		contestType: "Tough",
	},
};
