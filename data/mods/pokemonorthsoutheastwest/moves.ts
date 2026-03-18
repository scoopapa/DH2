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
		num: -34,
		accuracy: 100,
		basePower: 70,
		category: "Special",
		name: "East Sea Wave",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "allAdjacentFoes",
		type: "Water",
		shortDesc: "Hits foes. Extends terrain/weather duration by 1 (max 8).",
		condition: {
			duration: 1,
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Surf', target);
		},
		onAfterMove(source, target, move) {
		//  onHit(target, source, move) { 
			const weather = source.side.battle.field.weather;
			const terrain = source.side.battle.field.terrain;

			// Extend weather duration
			if (weather && source.side.battle.field.weatherState.duration < 8) {
				source.side.battle.field.weatherState.duration++;
				this.add(`-message`, `${source.name}'s East Sea Wave extended the weather! It will last ${this.field.weatherState.duration} turns now.`);
				//this.add('-message', `${source.name}'s East Sea Wave extended the weather!`);
			}

			// Extend terrain duration
			if (terrain && source.side.battle.field.terrainState.duration < 8) {
				source.side.battle.field.terrainState.duration++;
				this.add(`-message`, `${source.name}'s East Sea Wave extended the terrain! It will last ${this.field.terrainState.duration} turns now.`);
				//this.add('-message', `${source.name}'s East Sea Wave extended the terrain!`);
			}
		},
		secondary: null,
		contestType: "Beautiful",
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
	amplify: {
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
		flags: {protect: 1, sound: 1, mirror: 1, metronome: 1},
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
		target: "normal",
		type: "Fighting",
		contestType: "Tough",
	},
		mistyterrain: {
		num: 581,
		accuracy: true,
		basePower: 0,
		category: "Status",
			shortDesc: "For five turns, Fairy powers up, Dragon moves are weakned, and grounded Pokémon can't get status conditions.",
		name: "Misty Terrain",
		pp: 10,
		priority: 0,
		flags: { nonsky: 1, metronome: 1 },
		terrain: 'mistyterrain',
		condition: {
			effectType: 'Terrain',
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			onSetStatus(status, target, source, effect) {
				if (!target.isGrounded() || target.isSemiInvulnerable()) return;
				if (effect && ((effect as Move).status || effect.id === 'yawn')) {
					this.add('-activate', target, 'move: Misty Terrain');
				}
				return false;
			},
			onTryAddVolatile(status, target, source, effect) {
				if (!target.isGrounded() || target.isSemiInvulnerable()) return;
				if (status.id === 'confusion') {
					if (effect.effectType === 'Move' && !effect.secondaries) this.add('-activate', target, 'move: Misty Terrain');
					return null;
				}
			},
			onBasePowerPriority: 6,
			onBasePower(basePower, attacker, defender, move) {
				if (move.type === 'Dragon' && defender.isGrounded() && !defender.isSemiInvulnerable()) {
					this.debug('misty terrain weaken');
					return this.chainModify(0.5);
				}
				if (move.type === 'Fairy' && attacker.isGrounded() && !attacker.isSemiInvulnerable()) {
					this.debug('misty terrain boost');
					return this.chainModify([5325, 4096]);
				}
			},
			onFieldStart(field, source, effect) {
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Misty Terrain', '[from] ability: ' + effect.name, `[of] ${source}`);
				} else {
					this.add('-fieldstart', 'move: Misty Terrain');
				}
			},
			onFieldResidualOrder: 27,
			onFieldResidualSubOrder: 7,
			onFieldEnd() {
				this.add('-fieldend', 'Misty Terrain');
			},
		},
		secondary: null,
		target: "all",
		type: "Fairy",
		zMove: { boost: { spd: 1 } },
		contestType: "Beautiful",
	},
	attract: {
		num: 213,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Attract",
		pp: 15,
		priority: 0,
		flags: { protect: 1, reflectable: 1, mirror: 1, bypasssub: 1, metronome: 1 },
		volatileStatus: 'attract',
		condition: {
			noCopy: true, // doesn't get copied by Baton Pass
			onStart(pokemon, source, effect) {
				if (!(pokemon.gender === 'M' && source.gender === 'F') && !(pokemon.gender === 'F' && source.gender === 'M')) {
					this.debug('incompatible gender');
					return false;
				}
				if (!this.runEvent('Attract', pokemon, source)) {
					this.debug('Attract event failed');
					return false;
				}

				if (effect.name === 'Cute Charm') {
					this.add('-start', pokemon, 'Attract', '[from] ability: Cute Charm', `[of] ${source}`);
				} else if (effect.name === 'Destiny Knot') {
					this.add('-start', pokemon, 'Attract', '[from] item: Destiny Knot', `[of] ${source}`);
				} else {
					this.add('-start', pokemon, 'Attract');
				}
			},
			onUpdate(pokemon) {
				if (this.effectState.source && !this.effectState.source.isActive && pokemon.volatiles['attract']) {
					this.debug(`Removing Attract volatile on ${pokemon}`);
					pokemon.removeVolatile('attract');
				}
			},
			onBeforeMovePriority: 2,
			onBeforeMove(pokemon, target, move) {
				this.add('-activate', pokemon, 'move: Attract', '[of] ' + this.effectState.source);
				if (this.randomChance(1, 2)) {
					this.add('cant', pokemon, 'Attract');
					return false;
				}
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Attract', '[silent]');
			},
		},
		onTryImmunity(target, source) {
			return (target.gender === 'M' && source.gender === 'F') || (target.gender === 'F' && source.gender === 'M');
		},
		secondary: null,
		target: "normal",
		type: "Fairy",
		zMove: { effect: 'clearnegativeboost' },
		contestType: "Cute",
	},
	perishsong: {
		num: 195,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Perish Song",
		pp: 5,
		priority: 0,
		flags: { sound: 1, distance: 1, bypasssub: 1, metronome: 1 },
		onHitField(target, source, move) {
			let result = false;
			let message = false;
			for (const pokemon of this.getAllActive()) {
				if (this.runEvent('Invulnerability', pokemon, source, move) === false) {
					this.add('-miss', source, pokemon);
					result = true;
				} else if (this.runEvent('TryHit', pokemon, source, move) === null) {
					result = true;
				} else if (!pokemon.volatiles['perishsong']) {
					pokemon.addVolatile('perishsong');
					this.add('-start', pokemon, 'perish3', '[silent]');
					result = true;
					message = true;
				}
			}
			if (!result) return false;
			if (message) this.add('-fieldactivate', 'move: Perish Song');
		},
		condition: {
			duration: 4,
			onEnd(target) {
				this.add('-start', target, 'perish0');
				target.faint();
			},
			onResidualOrder: 24,
			onResidual(pokemon) {
				const duration = pokemon.volatiles['perishsong'].duration;
				this.add('-start', pokemon, `perish${duration}`);
			},
		},
		secondary: null,
		target: "all",
		type: "Ghost",
		zMove: { effect: 'clearnegativeboost' },
		contestType: "Beautiful",
	},
	pollenseason: {
		num: 2440,
		shortDesc: "Doubles effect chances and powers up Grass-type moves for 5 turns.",
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Pollen Season",
		pp: 5,
		priority: 0,
		flags: { metronome: 1 },
		weather: 'PollenSeason',
		secondary: null,
		target: "all",
		type: "Grass",
		zMove: { boost: { spe: 1 } },
		contestType: "Beautiful",
	},
	greatsneeze: {
		num: 3333,
		shortDesc: "Fails if the user is not Poisoned or if it is not Pollen Season.",
		accuracy: 100,
		basePower: 110,
		category: "Special",
		name: "Great Sneeze",
		pp: 5,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1 },
                onTry(source) {
                if (!pokemon.status === 'psn' || !pokemon.status === 'tox') {
			if (!this.field.isWeather('pollenseason')) {
				return false;
			}
                }
                },
		secondary: null,
		target: "normal",
		type: "Grass",
		contestType: "Tough",
	},
   mucusseed: {
		num: 723,
			shortDesc: "Leech Seed, then user switches out. Has +1 Priority in Pollen Season.",
		accuracy: 90,
		basePower: 0,
		category: "Status",
		name: "Mucus Seed",
		pp: 10,
		priority: 0,
		flags: { protect: 1, reflectable: 1, mirror: 1, metronome: 1 },
		volatileStatus: 'leechseed',
		onModifyPriority(priority, source, target, move) {
			if (this.field.isWeather('pollenseason')) {
				return priority + 1;
			}
		},
	        onTry(source) {
			return !!this.canSwitch(source.side);
		},
		condition: {
			onStart(target) {
				this.add('-start', target, 'move: Leech Seed');
			},
			onResidualOrder: 8,
			onResidual(pokemon) {
				const target = this.getAtSlot(pokemon.volatiles['leechseed'].sourceSlot);
				if (!target || target.fainted || target.hp <= 0) {
					this.debug('Nothing to leech into');
					return;
				}
				const damage = this.damage(pokemon.baseMaxhp / 8, pokemon, target);
				if (damage) {
					this.heal(damage, target, pokemon);
				}
			},
		},
		onTryImmunity(target) {
			return !target.hasType('Grass');
		},
		secondary: null,
		target: "normal",
		type: "Poison",
		zMove: { effect: 'clearnegativeboost' },
		contestType: "Clever",
	},
			weatherball: {
		num: 311,
		accuracy: 100,
		basePower: 50,
		category: "Special",
		name: "Weather Ball",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1, bullet: 1 },
		onModifyType(move, pokemon) {
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
				move.type = 'Fire';
				break;
			case 'raindance':
			case 'primordialsea':
				move.type = 'Water';
				break;
			case 'sandstorm':
				move.type = 'Rock';
				break;
			case 'nighttime':
				move.type = 'Dark';
				break;
			case 'shadowsky':
				move.type = 'Shadow';
				break;
			case 'pollenseason':
				move.type = 'Grass';
				break;
			case 'hail':
			case 'snowscape':
				move.type = 'Ice';
				break;
			}
		},
		onModifyMove(move, pokemon) {
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
				move.basePower *= 2;
				break;
			case 'raindance':
			case 'primordialsea':
				move.basePower *= 2;
				break;
			case 'sandstorm':
				move.basePower *= 2;
				break;
			case 'nighttime':
				move.basePower *= 2;
				break;
			case 'shadowsky':
				move.basePower *= 2;
				break;
			case 'pollenseason':
				move.basePower *= 2;
				break;
			case 'hail':
			case 'snowscape':
				move.basePower *= 2;
				break;
			}
			this.debug(`BP: ${move.basePower}`);
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		zMove: { basePower: 160 },
		maxMove: { basePower: 130 },
		contestType: "Beautiful",
	},
		beckon: {
					shortDesc: "The user switches out. Has -6 Priority.",
		num: 14200,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Beckon",
		pp: 20,
		priority: -6,
		flags: { metronome: 1 },
		onTry(source) {
			return !!this.canSwitch(source.side);
		},
		selfSwitch: true,
		secondary: null,
		target: "self",
		type: "Light",
		zMove: { effect: 'heal' },
		contestType: "Cool",
	},
		blinder: {
		num: 1892,
					shortDesc: "Hits both enemies, lowering their accuracy by 1.",
		accuracy: 100,
		basePower: 60,
		category: "Special",
		name: "Blinder",
		pp: 5,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1 },
		secondary: {
			chance: 100,
			boosts: {
				accuracy: -1,
			},
		},
		target: "normal",
		type: "Light",
		contestType: "Cute",
	},
		cleanse: {
					shortDesc: "Cleanses all status conditions from the user.",
		num: 28527,
		accuracy: true,
		basePower: 0,
		category: "Status",
		isNonstandard: "Past",
		name: "Cleanse",
		pp: 20,
		priority: 0,
		flags: { snatch: 1, metronome: 1 },
		onHit(pokemon) {
			if (['', 'slp', 'frz'].includes(pokemon.status)) return false;
			pokemon.cureStatus();
		},
		secondary: null,
		target: "self",
		type: "Light",
		zMove: { effect: 'heal' },
		contestType: "Cute",
	},
		discrimination: {
		num: 333333,
		accuracy: 100,
		basePower: 80,
							shortDesc: "Strong against Ghost and Dark.",
		category: "Physical",
		name: "Discrimination",
		pp: 35,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1 },
		secondary: null,
		target: "normal",
		type: "Light",
		contestType: "Tough",
	},
	domination: {
		num: 2824,
				shortDesc: "Weaker the more damaged the user is.",
		accuracy: 100,
		basePower: 150,
		basePowerCallback(pokemon, target, move) {
			const bp = move.basePower * pokemon.hp / pokemon.maxhp;
			this.debug(`BP: ${bp}`);
			return bp;
		},
		category: "Special",
		name: "Domination",
		pp: 5,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1 },
		secondary: null,
		target: "allAdjacentFoes",
		type: "Light",
		contestType: "Beautiful",
	},
	eyebeam: {
		num: 3523,
				shortDesc: "Ignores Protect.",
		accuracy: 100,
		basePower: 40,
		category: "Physical",
		name: "Eye Beam",
		pp: 35,
		priority: 0,
		flags: { contact: 1, mirror: 1, metronome: 1 },
		secondary: null,
		target: "normal",
		viable: false,
		type: "Light",
		contestType: "Tough",
	},
		gleam: {
					shortDesc: "Lowers the target's attack by 1.",
		num: 3341,
		accuracy: 100,
		basePower: 50,
		category: "Special",
		name: "Gleam",
		pp: 15,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1 },
		secondary: {
			chance: 100,
			boosts: {
				atk: -1,
			},
		},
		target: "normal",
		type: "Light",
		contestType: "Tough",
	},
			holyarrow: {
		num: 12935,
		// accuracy: true,
					shortDesc: "Ultra effective against Dark.",
		basePower: 60,
		accuracy: 100,
		category: "Physical",
		name: "Holy Arrow",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
			onEffectiveness(typeMod, target, type) {
			if (type === 'Dark') return 1;
		},
		secondary: null,
		target: "normal",
		type: "Light",
		contestType: "Cool",
	},
		holywrath: {
					shortDesc: "Gets stronger the more the user has healed. Currently does not have its secondary effect.",
		num: 35253,
		accuracy: 100,
		basePower: 70,
		category: "Special",
		name: "Holy Wrath",
		pp: 35,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1 },
		secondary: null,
		target: "normal",
		type: "Light",
		contestType: "Tough",
	},
		lightshine: {
					shortDesc: "May lower the target's accuracy by 1.",
		num: 1892,
		accuracy: 100,
		basePower: 40,
		category: "Special",
		name: "Light Shine",
			viable: false,
		pp: 24,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1 },
		secondary: {
			chance: 20,
			boosts: {
				accuracy: -1,
			},
		},
		target: "normal",
		type: "Light",
		contestType: "Cute",
	},
	lustersword: {
		num: 1623,
				shortDesc: "High critical hit ratio.",
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		name: "Luster Sword",
		pp: 20,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, slicing: 1 },
		critRatio: 2,
		secondary: null,
		target: "normal",
		type: "Light",
		contestType: "Cool",
	},
		pillarsmash: {
					shortDesc: "May lower the target's defence by 1.",
		num: 8223,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		name: "Pillar Smash",
		pp: 10,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 20,
			boosts: {
				def: -1,
			},
		},
		target: "normal",
		type: "Light",
	},
		radiantfire: {
					shortDesc: "May cause burning.",
		num: 53323,
		accuracy: 100,
		basePower: 70,
		category: "Special",
		name: "Radiant Fire",
		pp: 15,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1 },
		secondary: {
			chance: 20,
			status: 'brn',
		},
		target: "normal",
		type: "Fire",
		contestType: "Beautiful",
	},
		renew: {
					shortDesc: "Heals 50% of the user's health.",
		num: 1205,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Renew",
		pp: 5,
		priority: 0,
		flags: { snatch: 1, heal: 1, metronome: 1 },
		heal: [1, 2],
		secondary: null,
		target: "self",
		type: "Light",
		zMove: { effect: 'clearnegativeboost' },
		contestType: "Clever",
	},
		resurrection: {
					shortDesc: "Revives a fainted party member at 50% health.",
		num: 8623,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Reserrection",
		pp: 1,
		noPPBoosts: true,
		priority: 0,
		flags: { heal: 1, nosketch: 1 },
		onTryHit(source) {
			if (!source.side.pokemon.filter(ally => ally.fainted).length) {
				return false;
			}
		},
		slotCondition: 'revivalblessing',
		// No this not a real switchout move
		// This is needed to trigger a switch protocol to choose a fainted party member
		// Feel free to refactor
		selfSwitch: true,
		condition: {
			duration: 1,
			// reviving implemented in side.ts, kind of
		},
		secondary: null,
		target: "self",
		type: "Normal",
	},
			shineburst: {
						shortDesc: "May lower accuracy. Light-types are weak to Dark and Poison.",
		num: 18922,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Shine Burst",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1 },
		secondary: {
			chance: 20,
			boosts: {
				accuracy: -1,
			},
		},
		target: "normal",
		type: "Light",
		contestType: "Cute",
	},
		shiningshot: {
					shortDesc: "Adds 10 to its power every time it is used in a row.",
		num: 22210,
		accuracy: 95,
			viable: false,
		basePower: 40,
		basePowerCallback(pokemon, target, move) {
			if (!pokemon.volatiles['shiningshot'] || move.hit === 1) {
				pokemon.addVolatile('shiningshot');
			}
			const bp = this.clampIntRange(move.basePower * pokemon.volatiles['shiningshot'].multiplier, 1, 160);
			this.debug(`BP: ${bp}`);
			return bp;
		},
		category: "Special",
		name: "Shining Shot",
		pp: 20,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, slicing: 1 },
		condition: {
			duration: 2,
			onStart() {
				this.effectState.multiplier = 1;
			},
			onRestart() {
				if (this.effectState.multiplier < 4) {
					this.effectState.multiplier <<= 1;
				}
				this.effectState.duration = 2;
			},
		},
		secondary: null,
		target: "normal",
		type: "Light",
		contestType: "Cool",
	},
		sunrays: {
					shortDesc: "May lower the target's Special Defence by 1.",
		num: 18922,
		accuracy: 100,
			viable: false,
		basePower: 60,
		category: "Special",
		name: "Sunrays",
		pp: 20,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1 },
		secondary: {
			chance: 20,
			boosts: {
				spd: -1,
			},
		},
		target: "normal",
		type: "Light",
		contestType: "Cute",
	},
};
