export const Moves: import('../../../sim/dex-moves').ModdedMoveDataTable = {
monkeystaff: {
		num: 9999,
                       shortDesc: "Hits 9 times. No extra hits on Rain or Psychic Terrain.",
		accuracy: 100,
		basePower: 10,
		category: "Physical",
		name: "Monkey Staff",
		pp: 16,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		multihit: [9],
		secondary: null,
		target: "normal",
		type: "Psychic",
		contestType: "Cool",
	},

	trustedswine: {
		num: 8203,
                       shortDesc: "Has +1 Priority, + Poison on Grassy Terrain. Does not set up an healing-stealing energy field.",
		accuracy: 100,
		basePower: 60,
		category: "Special",
		name: "Trusted Swine",
		pp: 16,
		priority: 1,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		onHit(target, source) {
			if (this.field.isTerrain('grassyterrain') && source.isGrounded()) {
				source.trySetStatus('psn', target);
			}
		},
		secondary: null,
		target: "normal",
		type: "Grass",
		contestType: "Cool",
	},
	dropoff: {
		num: 8910,
                       shortDesc: "Discard’s the user’s item to increase their highest stat by 2.",
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Drop Off",
		pp: 40,
		priority: 0,
		flags: {metronome: 1},
		onHit(target, source) {
			const item = target.takeItem(source);
			if (item) {
				this.add('-enditem', target, item.name, '[from] move: Drop Off', '[of] ' + source);
				const bestStat = source.getBestStat(true, true);
				this.boost({[bestStat]: length}, source);

			} else {
				this.add('-fail', target, 'move: Drop Off');
			}
		},
		secondary: null,
		target: "self",
		type: "Dark",
	},
fireworkblazer: {
		num: 2259,
                       shortDesc: "Clears hazards. Power doubles on Nighttime.",
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		name: "Firework Blazer",
		pp: 16,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onAfterHit(target, pokemon, move) {
			if (!move.hasSheerForce) {
				if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
					this.add('-end', pokemon, 'Leech Seed', '[from] move: Rapid Spin', '[of] ' + pokemon);
				}
				const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
				for (const condition of sideConditions) {
					if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
						this.add('-sideend', pokemon.side, this.dex.conditions.get(condition).name, '[from] move: Rapid Spin', '[of] ' + pokemon);
					}
				}
				if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
					pokemon.removeVolatile('partiallytrapped');
				}
			}
		},
		onAfterSubDamage(damage, target, pokemon, move) {
			if (!move.hasSheerForce) {
				if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
					this.add('-end', pokemon, 'Leech Seed', '[from] move: Rapid Spin', '[of] ' + pokemon);
				}
				const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
				for (const condition of sideConditions) {
					if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
						this.add('-sideend', pokemon.side, this.dex.conditions.get(condition).name, '[from] move: Rapid Spin', '[of] ' + pokemon);
					}
				}
				if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
					pokemon.removeVolatile('partiallytrapped');
				}
			}
		},
		secondary: null,
		target: "normal",
		type: "Fire",
		contestType: "Cool",
	},
equestrianbolt: {
		num: 9055,
                       shortDesc: "Charges turn 1, hits turn 2 with 10% Par. +3 Speed: Fires instantly.",
		accuracy: 100,
		basePower: 130,
		category: "Special",
		name: "Equestrian Bolt",
		pp: 10,
		priority: 0,
		flags: {charge: 1, protect: 1, mirror: 1, metronome: 1},
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name);
			if (pokemon.boosts['spe'] > 2) {
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
		secondary: {
			chance: 10,
			status: 'par',
		},
		hasSheerForce: true,
		target: "normal",
		type: "Electric",
	},

horseserve: {
		num: 8023,
                       shortDesc: "Has +1 Priority + Never misses if target is weak to Grass.",
		accuracy: 100,
		basePower: 55,
		category: "Physical",
		name: "Horse Serve",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		onModifyPriority(priority, source, target, move) {
			if (source.getMoveHitData(move).typeMod > 0)  {
                                               move.accuracy = true;
				return priority + 1;
			}
		},
		secondary: null,
		target: "normal",
		type: "Grass",
		contestType: "Cool",
	},

	eastseawave: {
		num: 812,
                       shortDesc: "User switches out after use. Does not power up on Terrain.",
		accuracy: 100,
		basePower: 60,
		category: "Special",
		name: "East Sea Wave",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		selfSwitch: true,
		secondary: null,
		target: "normal",
		type: "Water",
	},


	nighttime: {
		num: 2421,
                       shortDesc: "For five turns: Dark +50%, Light-50%, Dark is immune to Priority.",
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Nighttime",
		pp: 5,
		priority: 0,
		flags: {metronome: 1},
		weather: 'nighttime',
		secondary: null,
		target: "all",
		type: "Dark",
		zMove: {boost: {spe: 1}},
		contestType: "Beautiful",
	},

	ancientrecharge: {
		num: 1500,
                       shortDesc: "Increases the Ancient Gauge by 1. Currently not functional.",
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Ancient Recharge",
		pp: 8,
		priority: 0,
		flags: {gravity: 1, metronome: 1},
		onTry(source, target, move) {
			// Additional Gravity check for Z-move variant
			if (this.field.getPseudoWeather('Gravity')) {
				this.add('cant', source, 'move: Gravity', move);
				return null;
			}
		},
		onTryHit(target, source) {
			this.add('-nothing');
		},
		secondary: null,
		target: "self",
		type: "Normal",
		zMove: {boost: {atk: 3}},
		contestType: "Cute",
	},
		ironslash: {
		num: 1633,
			shortDesc: "High Critical Hit Ratio.",
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		name: "Iron Slash",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, slicing: 1},
		critRatio: 2,
		secondary: null,
		target: "normal",
		type: "Steel",
		contestType: "Cool",
	},
		drilldown: {
		num: 4341,
						shortDesc: "Hits 1-5 times, each hit having 20% chance to lower defence by 1.",
		accuracy: 100,
		basePower: 20,
		category: "Physical",
		name: "Drilldown",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		multihit: [1, 5],
		secondary: {
			chance: 20,
			boosts: {
				def: -1,
			},
		},
		target: "normal",
		type: "Rock",
		maxMove: {basePower: 100},
		contestType: "Cool",
	},
		feartheviper: {
			shortDesc: "20% chance to freeze the target by petrifying them.",
		num: 5238,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Fear The Viper",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, bite: 1},
		secondary: {
			chance: 20,
			status: 'frz',
		},
		target: "normal",
		type: "Rock",
		contestType: "Beautiful",
	},
		alarm: {
		num: 3538,
					shortDesc: "Power doubles against sleeping targets + wakes them up.",
		accuracy: 100,
		basePower: 60,
		basePowerCallback(pokemon, target, move) {
			if (target.status === 'slp' || target.hasAbility('comatose')) {
				this.debug('BP doubled on sleeping target');
				return move.basePower * 2;
			}
			return move.basePower;
		},
		category: "Special",
		name: "Alarm",
		pp: 16,
		priority: 0,
		flags: {contact: 1, protect: 1, sound: 1, mirror: 1, metronome: 1},
		onHit(target) {
			if (target.status === 'slp') target.cureStatus();
		},
		secondary: null,
		target: "normal",
		type: "Sound",
		contestType: "Tough",
	},
	Amplify: {
		num: 2568,
		accuracy: true,
					shortDesc: "Boosts the power of the user's next Sound move + Raises SpDef by 1.",
		basePower: 0,
		category: "Status",
		name: "Amplify",
		pp: 20,
		priority: 0,
		flags: {snatch: 1, metronome: 1},
		volatileStatus: 'amplify',
		condition: {
			onBasePowerPriority: 9,
			onBasePower(basePower, attacker, defender, move) {
				if (move.type === 'Sound') {
					this.debug('amplify boost');
					return this.chainModify(2);
				}
			},
			onMoveAborted(pokemon, target, move) {
				if (move.type === 'Sound' && move.id !== 'charge') {
					pokemon.removeVolatile('amplify');
				}
			},
			onAfterMove(pokemon, target, move) {
				if (move.type === 'Sound' && move.id !== 'charge') {
					pokemon.removeVolatile('amplify');
				}
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Amplify', '[silent]');
			},
		},
		boosts: {
			spd: 1,
		},
		secondary: null,
		target: "self",
		type: "Sound",
		zMove: {boost: {spd: 1}},
		contestType: "Clever",
	},
		bassdrop: {
		num: 3433,
						shortDesc: "Good against Ice, Ghost, Bug, and Rock.",
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Bass Drop",
		pp: 16,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, sound: 1, metronome: 1},
		secondary: null,
		target: "normal",
		type: "Sound",
		contestType: "Tough",
	},
		cymbalcutter: {
		num: 4400,
			shortDesc: "High critical hit ratio + 20% chance to cause confusion.",
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		name: "Cymbal Cutter",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, sound: 1, slicing: 1},
		critRatio: 2,
		secondary: {
			chance: 20,
			volatileStatus: 'confusion',
		},
		target: "normal",
		type: "Sound",
		contestType: "Cool",
	},
	deafeningscream: {
		num: 3858,
		accuracy: 100,
		basePower: 150,
		category: "Sound",
		name: "Deafening Scream",
					shortDesc: "Changes the target's ability to Soundproof.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, sound: 1, protect: 1, mirror: 1, metronome: 1},
		onTryImmunity(target) {
			// Truant and Insomnia have special treatment; they fail before
			// checking accuracy and will double Stomping Tantrum's BP
			if (target.ability === 'truant' || target.ability === 'soundproof') {
				return false;
			}
		},
		onTryHit(target) {
			if (target.getAbility().flags['cantsuppress']) {
				return false;
			}
		},
		onHit(pokemon) {
			const oldAbility = pokemon.setAbility('soundproof');
			if (oldAbility) {
				this.add('-ability', pokemon, 'Soundproof', '[from] move: Worry Seed');
				if (pokemon.status === 'slp') {
					pokemon.cureStatus();
				}
				return;
			}
			return oldAbility as false | null;
		},
		secondary: null,
		target: "normal",
		type: "Sound",
		zMove: {boost: {spe: 1}},
		contestType: "Clever",
	},
		drumroll: {
		num: 1637,
				shortDesc: "Hits three times.",
		accuracy: 90,
		basePower: 30,
		category: "Physical",
		name: "Drumroll",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		multihit: 3,
		multiaccuracy: true,
		secondary: null,
		target: "normal",
		type: "Sound",
		zMove: {basePower: 120},
		maxMove: {basePower: 80},
		contestType: "Cool",
	},
			fallingpiano: {
		num: 3483,
						shortDesc: "Sound-types are weak to Water and Ghost.",
		accuracy: 100,
		basePower: 115,
		category: "Physical",
		name: "Falling Piano",
		pp: 16,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, metronome: 1},
		secondary: null,
		target: "normal",
		type: "Sound",
		contestType: "Tough",
	},	
		grandfinale: {
		num: 6233,
							shortDesc: "The user must spend the next turn recharging.",
		accuracy: 90,
		basePower: 150,
		category: "Special",
		name: "Grand Finale",
		pp: 5,
		priority: 0,
		flags: {recharge: 1, sound: 1, protect: 1, mirror: 1, metronome: 1},
		self: {
			volatileStatus: 'mustrecharge',
		},
		secondary: null,
		target: "normal",
		type: "Sound",
		contestType: "Cool",
	},	
		guitarsmash: {
		num: 3343,
		accuracy: 100,
			shortDesc: "No special effect.",
		basePower: 50,
		category: "Physical",
		name: "Guitar Smash",
		pp: 35,
		viable: false,
		priority: 0,
		flags: {contact: 1, protect: 1, sound: 1, mirror: 1, metronome: 1},
		secondary: null,
		target: "normal",
		type: "Sound",
		contestType: "Tough",
	},
		orchestra: {
		num: 4139,
		accuracy: 100,
				shortDesc: "Power doubles if the user moves after the target. Currently uses Avalanche's code.",
		basePower: 60,
		basePowerCallback(pokemon, target, move) {
			const damagedByTarget = pokemon.attackedBy.some(
				p => p.source === target && p.damage > 0 && p.thisTurn
			);
			if (damagedByTarget) {
				this.debug('BP doubled for getting hit by ' + target);
				return move.basePower * 2;
			}
			return move.basePower;
		},
		category: "Special",
		name: "Orchestra",
		pp: 10,
		priority: -4,
		flags: {contact: 1, protect: 1, mirror: 1, sound: 1, metronome: 1},
		secondary: null,
		target: "normal",
		type: "Sound",
		contestType: "Beautiful",
	},
		performance: {
		num: 95,
		accuracy: 40,
		basePower: 0,
			shortDesc: "Puts the target to sleep. Secondary effect currently not available.",
		category: "Status",
		name: "Performance",
		viable: false,
		pp: 20,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, sound: 1, metronome: 1},
		status: 'slp',
		secondary: null,
		target: "normal",
		type: "Sound",
		zMove: {boost: {spe: 1}},
		contestType: "Clever",
	},
		sonarsmash: {
		num: 12935,
		accuracy: true,
					shortDesc: "Does not check accuracy, and is ultra effective against Ice.",
		basePower: 70,
		category: "Special",
		name: "Sonar Smash",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, metronome: 1},
			onEffectiveness(typeMod, target, type) {
			if (type === 'Ice') return 1;
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Sound",
		contestType: "Cool",
	},
			sonicwave: {
		num: 12935,
						shortDesc: "Does not check accuracy.",
		accuracy: true,
		basePower: 70,
		category: "Special",
				viable: false,
		name: "Sonic Wave",
		pp: 32,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, metronome: 1},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Sound",
		contestType: "Cool",
	},
		whistle: {
		num: 958,
		shortDesc: "Has +1 Priority.",
		accuracy: 100,
		basePower: 30,
		category: "Special",
		name: "Whistle",
		pp: 30,
		priority: 1,
		flags: {contact: 1, protect: 1, sound: 1, mirror: 1, metronome: 1},
		secondary: null,
		target: "normal",
		type: "Sound",
		contestType: "Cool",
	},
		letslearn: {
		num: 3341,
		accuracy: 100,
					shortDesc: "Hits twice. Currently does not have its secondary effect.",
		basePower: 60,
		category: "Physical",
		name: "Let's Learn",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		multihit: 2,
		target: "normal",
		type: "Ghost",
		maxMove: {basePower: 100},
		contestType: "Cool",
	},
		blackaxe: {
		num: 3559,
		accuracy: 100,
								shortDesc: "20% chance to cause flinching. Lower's the user's speed by 1.",
		basePower: 120,
		category: "Physical",
		name: "Black Axe",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, slicing: 1, metronome: 1},
		self: {
			boosts: {
				spe: -1,
			},
		},
			secondary: {
			chance: 20,
			volatileStatus: 'flinch',
		},
		secondary: null,
		target: "normal",
		type: "Fighting",
		contestType: "Tough",
	},
}
