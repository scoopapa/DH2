export const Moves: { [moveid: string]: ModdedMoveData } = {
	
	// Changes to existing moves
	aircannon: {
		num: -1,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		shortDesc: "-1 target's Spe, 10% chance.",
		name: "Air Cannon",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Oblivion Wing", target);
		},
		secondary: {
			chance: 10,
			boosts: {
				spe: -1,
			},
		},
		target: "allAdjacentFoes",
		type: "Flying",
		contestType: "Cool",
	},
	//
	anguishcry: {
		num: -2,
		accuracy: 100,
		basePower: 65,
		category: "Special",
		shortDesc: "Double damage if user's HP <= 50.",
		name: "Anguish Cry",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, bypasssub: 1, metronome: 1},
		onBasePower(basePower, pokemon, target) {
			if (pokemon.hp * 2 <= pokemon.maxhp) {
				return this.chainModify(2);
			}
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Growl", target);
		},
		secondary: null,
		target: "normal",
		type: "Ghost",
		contestType: "Tough",
	},
	//
	brainage: {
		num: -3,
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		shortDesc: "Traps user + target; pseudo Leech Seed.",
		name: "Brainage",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		volatileStatus: 'brainage',
		condition: {
			onStart(target) {
				this.add('-start', target, 'move: Brainage');
			},
			onResidualOrder: 8,
			onResidual(pokemon) {
				const target = this.getAtSlot(pokemon.volatiles['brainage'].sourceSlot);
				if (!target || target.fainted || target.hp <= 0) {
					this.debug('Nothing to drain');
					return;
				}
				const damage = this.damage(pokemon.baseMaxhp / 8, pokemon, target);
				if (damage) {
					this.heal(damage, target, pokemon);
				}
			},
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-message', `${source.name} is delighted!`);
			this.add('-anim', source, "Nasty Plot");
			this.add('-anim', source, "Dream Eater", target);
		},
		onHit(target, source, move) {
			source.addVolatile('trapped', target, move, 'trapper');
			target.addVolatile('trapped', source, move, 'trapper');
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
		contestType: "Cool",
	},
	flyingdive: {
		num: -4,
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		shortDesc: "Double damage against grounded target.",
		name: "Flying Dive",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Brave Bird", target);
		},
		onModifyMove(move, source, target) {
			if (this.field.getPseudoWeather('gravity')) {
				this.add('-fail', source, 'move: Flying Dive');
				return null;
			}
		},
		onBasePower(basePower, source, target) {
			if (target.isGrounded()) {
				return this.chainModify(2);
			}
		},
		secondary: null,
		target: "normal",
		type: "Flying",
		contestType: "Cool",
	},
	//
	hiddenwall: {
		num: -5,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "On contact: -1 SpD. Protect.",
		name: "Hidden Wall",
		pp: 10,
		priority: 4,
		flags: {metronome: 1, noassist: 1, failcopycat: 1},
		stallingMove: true,
		volatileStatus: 'hiddenwall',
		onPrepareHit(pokemon) {
			return !!this.queue.willAct() && this.runEvent('StallMove', pokemon);
		},
		onHit(pokemon) {
			pokemon.addVolatile('stall');
		},
		condition: {
			duration: 1,
			onStart(target) {
				this.add('-singleturn', target, 'move: Protect');
			},
			onTryHitPriority: 3,
			onTryHit(target, source, move) {
				if (!move.flags['protect'] || move.category === 'Status') {
					if (['gmaxoneblow', 'gmaxrapidflow'].includes(move.id)) return;
					if (move.isZ || move.isMax) target.getMoveHitData(move).zBrokeProtect = true;
					return;
				}
				if (move.smartTarget) {
					move.smartTarget = false;
				} else {
					this.add('-activate', target, 'move: Protect');
				}
				const lockedmove = source.getVolatile('lockedmove');
				if (lockedmove) {
					// Outrage counter is reset
					if (source.volatiles['lockedmove'].duration === 2) {
						delete source.volatiles['lockedmove'];
					}
				}
				if (this.checkMoveMakesContact(move, source, target)) {
					this.boost({spd: -1}, source, target, null); // Lowers the attacker's SpD by 1 stage
				}
				return this.NOT_FAIL;
			},
			onHit(target, source, move) {
				if (move.isZOrMaxPowered && this.checkMoveMakesContact(move, source, target)) {
					this.boost({spd: -1}, source, target, null);
				}
			},
		},
		secondary: null,
		target: "self",
		type: "Rock",
	},	
	//
	mightyblow: {
		num: -6,
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		shortDesc: "Double damage if user's Atk > target's Atk.",
		name: "Mighty Blow",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Mega Punch", target);
		},
		onBasePower(basePower, source, target) {
			const userAttack = source.calculateStat('atk', source.boosts['atk']);
			const targetAttack = target.calculateStat('atk', target.boosts['atk']);
			if (userAttack > targetAttack) {
				return this.chainModify(2);
			}
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Tough",
	},
	//
	paranoia: {
		num: -7,  
		accuracy: 95,  
		basePower: 0,  
		damageCallback(pokemon, target) {
			return this.clampIntRange(Math.floor(target.getUndynamaxedHP() / 4), 1);
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Psychic", target);
		},
		onHit(target, source) {
			if (!target) return;		
			// Determine the best stat of the target
			const bestStat = target.getBestStat(false, true) as keyof BoostsTable;
	
			// Create boosts object to lower the best stat
			const boosts: Partial<BoostsTable> = {};
			boosts[bestStat] = -1;
			this.boost(boosts, target);
		},
		shortDesc: "Quarters targets' HP + lowers best stat.",
		name: "Paranoia",  
		category: "Special",
		pp: 10,  
		priority: 0,  
		flags: {protect: 1, mirror: 1},
		secondary: null,  
		target: "allAdjacentFoes",  
		type: "Bug",  
		contestType: "Clever", 
	},
	//
	/*passiveaggressive: {
		num: -8,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Passive Aggressive",
		pp: 10,
		priority: 0,
		flags: {snatch: 1}, // Can be stolen by Snatch
		volatileStatus: 'passiveaggressive',
		condition: {
			duration: 5, // Lasts for 5 turns
			onStart(pokemon) {
				this.add('-start', pokemon, 'move: Passive Aggressive');
			},
			onAllyTryMove(target, source, move) {
				// Check if the user of Passive Aggressive is still on the field
				const passiveAggressiveUser = this.effectState.source;
				if (!passiveAggressiveUser || passiveAggressiveUser.fainted || passiveAggressiveUser.side !== source.side) return;
	
				// Ensure the ally's move is a neutral priority status move
				if (
					source.side === target.side &&
					source !== target &&
					move.category === 'Status' &&
					move.priority === 0
				) {
					const type = move.type; // Get the type of the ally's status move
					if (!type) return;
	
					const attackMove = this.dex.getActiveMove({
						basePower: 60,
						accuracy: 100,
						category: "Special",
						type,
						flags: { protect: 1, mirror: 1 },
						name: `Passive Strike (${type})`,
					});
	
					this.add('-activate', target, 'move: Passive Aggressive');
					this.actions.useMove(attackMove, passiveAggressiveUser, target);
				}
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'move: Passive Aggressive');
			},
		},
		secondary: null,
		target: "self",
		type: "Psychic",
	},*/
	//
	refreeze: {
		num: -9,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "50% healing. If user moves last, Snow.",
		name: "Refreeze",
		pp: 5,
		priority: 0,
		flags: {snatch: 1, heal: 1, metronome: 1},
		heal: [1, 2],
		onAfterMove(source) {
			// Check if the user moved last
			if (!this.queue.willAct()) {
				this.field.setWeather('snow'); // Summon Snow if the user moved last
				this.add('-weather', 'Snow', '[from] move: Refreeze');
			}
		},
		secondary: null,
		target: "self",
		type: "Ice",
	},	
	//
	recalibration: {
		num: -10,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Boost acc and another stat based on target's best stat.",
		name: "Recalibration",
		pp: 10,
		priority: 0,
		flags: {bypasssub: 1, allyanim: 1, metronome: 1},
		onHit(target, source) {
			if (!target) return;
			const bestStat = target.getBestStat(false, true) as keyof BoostsTable;
			const boosts: Partial<BoostsTable> = {accuracy: 1};
			boosts[bestStat] = 2;
			this.boost(boosts, source);
		},
		secondary: null,
		target: "normal",
		type: "Electric",
		contestType: "Clever",
	},
	//
	sandpit: {
		num: -11,
		accuracy: 90,
		basePower: 85,
		category: "Physical",
		shortDesc: "Traps target + 1/8 chip damage.",
		name: "Sand Pit",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Sand Tomb", target);
		},
		volatileStatus: 'partiallytrapped',
		secondary: null,
		target: "normal",
		type: "Rock",
		contestType: "Tough",
	},
	//
	spiralpunch: {
		num: -12,
		accuracy: 100,
		basePower: 75,
		category: "Physical",
		shortDesc: "Drain Punch clone.",
		name: "Spiral Punch",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1, heal: 1, metronome: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Whirlpool", target);
			this.add('-anim', source, "Mega Punch", target);
		},
		drain: [1, 2],
		secondary: null,
		target: "normal",
		type: "Water",
		contestType: "Tough",
	},
	//
	swarmingstrike: {
		num: -13,
		accuracy: 100,
		basePower: 30,
		category: "Physical",
		shortDesc: "+30 for each other unfainted Bug on the team.",
		name: "Swarming Strike",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Beat Up", target);
		},
		onBasePower(basePower, source) {
			let bugCount = 0;
	
			// Iterate through all Pokémon in the user's party
			for (const partyMember of source.side.pokemon) {
				if (
					partyMember !== source &&
					!partyMember.fainted &&
					partyMember.hasType('Bug')
				) {
					bugCount++;
				}
			}
	
			// Add 30 base power for each Bug-type Pokémon in the party (excluding the user)
			return basePower + bugCount * 30;
		},
		secondary: null,
		target: "normal",
		type: "Bug",
		contestType: "Cool",
	},
	//
	sylvanpowder: {
		num: -14,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		shortDesc: "33% of putting target to sleep. Powder.",
		name: "Sylvan Powder",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, powder: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Sleep Powder", target);
		},
		secondary: {
			chance: 33, // Might ask submitter to change it to 30% as no other move has 33% trigger chance
			status: 'slp',
		},
		target: "normal",
		type: "Grass",
		contestType: "Beautiful",
	},
	//
	wukongfire: {
		num: -15,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		shortDesc: "Sets Sun.",
		name: "Wukong Fire",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Overheat", target);
		},
		onAfterHit(target, source) {
			this.field.setWeather('sunnyday');
		},	
		secondary: {},
		target: "normal",
		type: "Fire",
		contestType: "Cool",
	},
	//	
	flotsamhook: {
		num: -16,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		shortDesc: "Sets Water type Stealth Rock.",
		name: "Flotsam Hook",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, slicing: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Dive", target);
		},
		onAfterHit(target, source, move) {
			if (!move.hasSheerForce && source.hp) {
				for (const side of source.side.foeSidesWithConditions()) {
					side.addSideCondition('flotsamhookhazard');
				}
			}
		},
		onAfterSubDamage(damage, target, source, move) {
			if (!move.hasSheerForce && source.hp) {
				for (const side of source.side.foeSidesWithConditions()) {
					side.addSideCondition('flotsamhookhazard');
				}
			}
		},
		secondary: {},
		target: "normal",
		type: "Water",
	},
	//
	flotsamhookhazard: {
		num: -17,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Water type Stealth Rock.",
		name: "Flotsam Hook Hazard",
		pp: 20,
		priority: 0,
		flags: {reflectable: 1, mustpressure: 1},
		sideCondition: 'flotsamhookhazard',
		condition: {
			// this is a side condition
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Flotsam Hook Hazard');
			},
			onEntryHazard(pokemon) {
				if (pokemon.hasItem('heavydutyboots')) return;
			/*	const waterHazard = this.dex.getActiveMove('Flotsam Hook Hazard');
				waterHazard.type = 'Water';*/
				const typeMod = this.clampIntRange(pokemon.runEffectiveness(this.dex.getActiveMove('flotsamhookhazard')), -6, 6);
				this.damage(pokemon.maxhp * Math.pow(2, typeMod) / 8);
			},
		},
		secondary: null,
		target: "foeSide",
		type: "Water",
	//	zMove: {boost: {def: 1}},
		contestType: "Cool",
	},
	//
	conductivespell: {
		num: -18,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Conductive Spell",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onEffectiveness(typeMod, target, type) {
			if (type === 'Ground') return 1;
		},
		target: "normal",
		type: "Electric",
		contestType: "Cool",
	},
	//
	ironpowder: {
		num: -19,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		shortDesc: "Sets Grassy Terrain. Powder move.",
		name: "Iron Powder",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, powder: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Pollen Puff", target);
		},
		onAfterHit(target, source, move) {
			if (!move.hasSheerForce && source.hp) {
				this.field.setTerrain('grassyterrain');
			}
		},
		onAfterSubDamage(damage, target, source, move) {
			if (!move.hasSheerForce && source.hp) {
				this.field.setTerrain('grassyterrain');
			}
		},
		secondary: {},
		target: "normal",
		type: "Steel",
		contestType: "Cool",
	},
	//
	stormslam: {
		num: -20,
		accuracy: 80,
		basePower: 120,
		shortDesc: "Hits all opposing Pkm. Sky Uppercut effect.",
		category: "Physical",
		name: "Storm Slam",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Close Combat", target);
		},
		secondary: null,
		target: "normal",
		type: "Flying",
		contestType: "Cool",
	},
	//
	paleoblade: {
		num: -21,
		accuracy: 70,
		basePower: 120,
		shortDesc: "-1 Target's Spe, 30%. Hits in Sand.",
		category: "Special",
		name: "Paleo Blade",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, slicing: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Stone Axe", target);
		},
		onModifyMove(move, pokemon, target) {
			switch (target?.effectiveWeather()) {
			case 'sandstorm':
				move.accuracy = true;
				break;
			}
		},
		secondary: {
			chance: 30,
			boosts: {
				spe: -1,
			},
		},
		target: "normal",
		type: "Rock",
		contestType: "Cool",
	},
	//
	sandgeyser: {
		num: -22,
		accuracy: 100,
		basePower: 150,
		basePowerCallback(pokemon, target, move) {
			const bp = move.basePower * pokemon.hp / pokemon.maxhp;
			this.debug('BP: ' + bp);
			return bp;
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Sandstorm");
			this.add('-anim', source, "Sandsear Storm", target);
		},
		category: "Special",
		shortDesc: "Eruption clone.",
		name: "Sand Geyser",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Ground",
		contestType: "Cool",
	},
	
	// start
	belch: {
		num: 562,
		accuracy: 90,
		basePower: 120,
		category: "Special",
		name: "Belch",
		pp: 10,
		priority: 0,
		flags: {protect: 1, failmefirst: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failmimic: 1, failinstruct: 1},
		onTry(pokemon) {
			const item = pokemon.getItem();
			// Check if the user has a Berry
			if (item.isBerry) {
				this.add('-enditem', pokemon, item.name, '[from] move: Belch');
				// Trigger the Berry's effects
				if (this.singleEvent('Eat', item, null, pokemon, null, null)) {
					this.runEvent('EatItem', pokemon, null, null, item);
					if (item.onEat) pokemon.ateBerry = true;
				}
				pokemon.setItem('');
			} else if (!pokemon.ateBerry) {
				// If no Berry is available and hasn't eaten one before, fail the move
				this.add('-fail', pokemon, 'move: Belch');
				return false;
			}
		},
		/*onDisableMove(pokemon) {
			if (!pokemon.ateBerry) pokemon.disableMove('belch');
		},*/
		secondary: null,
		target: "normal",
		type: "Poison",
		contestType: "Tough",
	},
	//
	bellydrum: {
		num: 187,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Belly Drum",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, metronome: 1},
		onHit(target) {
			// Check if the user has the Selfish ability
			if (target.hasAbility('selfish')) {
				const ally = target.side.active.find(pokemon => pokemon && pokemon !== target && !pokemon.fainted);
				if (ally) {
					// If an ally exists, it loses 50% of its HP
					this.directDamage(ally.maxhp / 2, ally, target);
					this.add('-message', `${ally.name} lost HP due to ${target.name}'s Selfish ability!`);
				} else {
					// If no ally exists, the user loses HP as normal
					if (target.hp <= target.maxhp / 2 || target.boosts.atk >= 6 || target.maxhp === 1) { // Shedinja clause
						return false;
					}
					this.directDamage(target.maxhp / 2);
				}
			} else {
				// Normal behavior for users without Selfish
				if (target.hp <= target.maxhp / 2 || target.boosts.atk >= 6 || target.maxhp === 1) { // Shedinja clause
					return false;
				}
				this.directDamage(target.maxhp / 2);
			}
			// Boost attack by +12 regardless of who takes the damage
			this.boost({atk: 12}, target);
		},
		secondary: null,
		target: "self",
		type: "Normal",
		zMove: {effect: 'heal'},
		contestType: "Cute",
	},	
	//
	blastburn: {
		num: 307,
		accuracy: 90,
		basePower: 150,
		category: "Special",
		name: "Blast Burn",
		pp: 5,
		priority: 0,
		flags: {recharge: 1, protect: 1, mirror: 1, metronome: 1},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		self: {
			volatileStatus: 'mustrecharge',
		},
		secondary: null,
		target: "normal",
		type: "Fire",
		contestType: "Beautiful",
	},
	//
	bounce: {
		num: 340,
		accuracy: 85,
		basePower: 85,
		category: "Physical",
		name: "Bounce",
		pp: 5,
		priority: 0,
		flags: {
			contact: 1, charge: 1, protect: 1, mirror: 1, gravity: 1, distance: 1,
			metronome: 1, nosleeptalk: 1, noassist: 1, failinstruct: 1,
		},
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
		condition: {
			duration: 2,
			onInvulnerability(target, source, move) {
				if (['gust', 'twister', 'skyuppercut', 'thunder', 'hurricane', 'smackdown', 'thousandarrows', 'stormslam'].includes(move.id)) {
					return;
				}
				return false;
			},
			onSourceBasePower(basePower, target, source, move) {
				if (move.id === 'gust' || move.id === 'twister') {
					return this.chainModify(2);
				}
			},
		},
		secondary: {
			chance: 30,
			status: 'par',
		},
		target: "any",
		type: "Flying",
		contestType: "Cute",
	},
	//
	brine: {
		num: 362,
		accuracy: 100,
		basePower: 75,
		category: "Special",
		name: "Brine",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onBasePower(basePower, pokemon, target) {
			if (target.hp * 2 <= target.maxhp) {
				return this.chainModify(2);
			}
		},
		secondary: null,
		target: "normal",
		type: "Water",
		contestType: "Tough",
	},
	//
	courtchange: {
		num: 756,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Court Change",
		pp: 10,
		priority: 0,
		flags: {mirror: 1, metronome: 1},
		onHitField(target, source) {
			const sideConditions = [
				'mist', 'lightscreen', 'reflect', 'spikes', 'safeguard', 'tailwind', 'toxicspikes', 'stealthrock', 'flotsamhookhazard', 'waterpledge', 'firepledge', 'grasspledge', 'stickyweb', 'auroraveil', 'gmaxsteelsurge', 'gmaxcannonade', 'gmaxvinelash', 'gmaxwildfire',
			];
			let success = false;
			if (this.gameType === "freeforall") {
				// random integer from 1-3 inclusive
				const offset = this.random(3) + 1;
				// the list of all sides in counterclockwise order
				const sides = [this.sides[0], this.sides[2]!, this.sides[1], this.sides[3]!];
				const temp: {[k: number]: typeof source.side.sideConditions} = {0: {}, 1: {}, 2: {}, 3: {}};
				for (const side of sides) {
					for (const id in side.sideConditions) {
						if (!sideConditions.includes(id)) continue;
						temp[side.n][id] = side.sideConditions[id];
						delete side.sideConditions[id];
						const effectName = this.dex.conditions.get(id).name;
						this.add('-sideend', side, effectName, '[silent]');
						success = true;
					}
				}
				for (let i = 0; i < 4; i++) {
					const sourceSideConditions = temp[sides[i].n];
					const targetSide = sides[(i + offset) % 4]; // the next side in rotation
					for (const id in sourceSideConditions) {
						targetSide.sideConditions[id] = sourceSideConditions[id];
						const effectName = this.dex.conditions.get(id).name;
						let layers = sourceSideConditions[id].layers || 1;
						for (; layers > 0; layers--) this.add('-sidestart', targetSide, effectName, '[silent]');
					}
				}
			} else {
				const sourceSideConditions = source.side.sideConditions;
				const targetSideConditions = source.side.foe.sideConditions;
				const sourceTemp: typeof sourceSideConditions = {};
				const targetTemp: typeof targetSideConditions = {};
				for (const id in sourceSideConditions) {
					if (!sideConditions.includes(id)) continue;
					sourceTemp[id] = sourceSideConditions[id];
					delete sourceSideConditions[id];
					success = true;
				}
				for (const id in targetSideConditions) {
					if (!sideConditions.includes(id)) continue;
					targetTemp[id] = targetSideConditions[id];
					delete targetSideConditions[id];
					success = true;
				}
				for (const id in sourceTemp) {
					targetSideConditions[id] = sourceTemp[id];
				}
				for (const id in targetTemp) {
					sourceSideConditions[id] = targetTemp[id];
				}
				this.add('-swapsideconditions');
			}
			if (!success) return false;
			this.add('-activate', source, 'move: Court Change');
		},
		secondary: null,
		target: "all",
		type: "Normal",
	},
	//
	curse: {
		num: 174,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Curse",
		pp: 10,
		priority: 0,
		flags: {bypasssub: 1, metronome: 1},
		volatileStatus: 'curse',
		onModifyMove(move, source, target) {
			if (!source.hasType('Ghost')) {
				move.target = move.nonGhostTarget as MoveTarget;
			} else if (source.isAlly(target)) {
				move.target = 'randomNormal';
			}
		},
		onTryHit(target, source, move) {
			if (!source.hasType('Ghost')) {
				delete move.volatileStatus;
				delete move.onHit;
				move.self = {boosts: {spe: -1, atk: 1, def: 1}};
			} else if (move.volatileStatus && target.volatiles['curse']) {
				return false;
			}
		},
		onHit(target, source) {
			if (source.hasType('Ghost')) {
				// Check if the user has the Selfish ability
				if (source.hasAbility('selfish')) {
					const ally = source.side.active.find(pokemon => pokemon && pokemon !== source && !pokemon.fainted);
					if (ally) {
						this.directDamage(ally.maxhp / 2, ally, source);
						this.add('-message', `${ally.name} lost HP due to ${source.name}'s Selfish ability!`);
					} else {
						// If no ally exists, the user loses HP as normal
						this.directDamage(source.maxhp / 2, source, source);
					}
				} else {
					// Normal behavior for Ghost types without Selfish
					this.directDamage(source.maxhp / 2, source, source);
				}
			}
		},
		condition: {
			onStart(pokemon, source) {
				this.add('-start', pokemon, 'Curse', '[of] ' + source);
			},
			onResidualOrder: 12,
			onResidual(pokemon) {
				this.damage(pokemon.baseMaxhp / 4);
			},
		},
		secondary: null,
		target: "normal",
		nonGhostTarget: "self",
		type: "Ghost",
		zMove: {effect: 'curse'},
		contestType: "Tough",
	},	
	//
	defog: {
		num: 432,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Defog",
		pp: 15,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, bypasssub: 1, metronome: 1},
		onHit(target, source, move) {
			let success = false;
			if (!target.volatiles['substitute'] || move.infiltrates) success = !!this.boost({evasion: -1});
			const removeTarget = [
				'reflect', 'lightscreen', 'auroraveil', 'safeguard', 'mist', 'spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge', 'flotsamhookhazard',
			];
			const removeAll = [
				'spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge', 'flotsamhookhazard',
			];
			for (const targetCondition of removeTarget) {
				if (target.side.removeSideCondition(targetCondition)) {
					if (!removeAll.includes(targetCondition)) continue;
					this.add('-sideend', target.side, this.dex.conditions.get(targetCondition).name, '[from] move: Defog', '[of] ' + source);
					success = true;
				}
			}
			for (const sideCondition of removeAll) {
				if (source.side.removeSideCondition(sideCondition)) {
					this.add('-sideend', source.side, this.dex.conditions.get(sideCondition).name, '[from] move: Defog', '[of] ' + source);
					success = true;
				}
			}
			this.field.clearTerrain();
			return success;
		},
		secondary: null,
		target: "normal",
		type: "Flying",
		zMove: {boost: {accuracy: 1}},
		contestType: "Cool",
	},
	//
	electroball: {
		inherit: true,
		basePowerCallback(pokemon, target) {
			let ratio = Math.floor(pokemon.getStat('spe') / target.getStat('spe') * 10) / 10;
			if (!isFinite(ratio)) ratio = 0;
			let bp = 40;
			if (ratio >= 1) bp = 60;
			if (ratio >= 1.5) bp = 80;
			if (ratio >= 2) bp = 100;
			if (ratio >= 3) bp = 120;
			if (ratio >= 4) bp = 150;
			return bp;
		},
	},	
	//
	explosion: {
		num: 153,
		accuracy: 100,
		basePower: 250,
		category: "Physical",
		name: "Explosion",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, noparentalbond: 1},
		willCrit: true,
		selfdestruct: "always",
		secondary: null,
		target: "allAdjacent",
		type: "Normal",
		contestType: "Beautiful",
	},	
	//
	firepledge: {
		num: 519,
		accuracy: 100,
		basePower: 80,
		basePowerCallback(target, source, move) {
			// Check if the sourceEffect is a non-status, single-target Grass or Water move
			const sourceMove = this.dex.moves.get(move.sourceEffect);
			if (
				sourceMove &&
				(sourceMove.type === 'Grass' || sourceMove.type === 'Water') &&
				sourceMove.category !== 'Status' &&
				sourceMove.target === 'normal'
			) {
				this.add('-combine');
				return 150;
			}
			return move.basePower;
		},
		category: "Special",
		name: "Fire Pledge",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, nonsky: 1, metronome: 1, pledgecombo: 1},
		onPrepareHit(target, source, move) {
			for (const action of this.queue.list as MoveAction[]) {
				if (
					!action.move || !action.pokemon?.isActive ||
					action.pokemon.fainted || action.maxMove || action.zmove
				) {
					continue;
				}
				const partnerMove = this.dex.moves.get(action.move.id);
				if (
					action.pokemon.isAlly(source) &&
					partnerMove.category !== 'Status' &&
					['Water', 'Grass'].includes(partnerMove.type)
				) {
					this.queue.prioritizeAction(action, move);
					this.add('-waiting', source, action.pokemon);
					return null;
				}
			}
		},
		onModifyMove(move, source) {
			const sourceMove = this.dex.moves.get(move.sourceEffect);
			if (
				sourceMove &&
				sourceMove.category !== 'Status' &&
				sourceMove.target === 'normal'
			) {
				if (sourceMove.type === 'Water') {
					move.type = 'Water';
					move.forceSTAB = true;
					move.sideCondition = 'waterpledge';
				}
				if (sourceMove.type === 'Grass') {
					move.type = 'Fire';
					move.forceSTAB = true;
					move.self = {sideCondition: 'firepledge'};
				}
			}
			if (source.getStat('atk', false, true) > source.getStat('spa', false, true)) move.category = 'Physical';
		},
		condition: {
			duration: 4,
			onSideStart(targetSide) {
				this.add('-sidestart', targetSide, 'Fire Pledge');
			},
			onResidualOrder: 5,
			onResidualSubOrder: 1,
			onResidual(pokemon) {
				if (!pokemon.hasType('Fire')) this.damage(pokemon.baseMaxhp / 8, pokemon);
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 8,
			onSideEnd(targetSide) {
				this.add('-sideend', targetSide, 'Fire Pledge');
			},
		},
		secondary: null,
		target: "normal",
		type: "Fire",
		contestType: "Beautiful",
	},
	//
	flameburst: {
		num: 481,
		accuracy: 100,
		basePower:80,
		category: "Special",
		isNonstandard: "Past",
		name: "Flame Burst",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onHit(target, source, move) {
			for (const ally of target.adjacentAllies()) {
				this.damage(ally.baseMaxhp / 16, ally, source, this.dex.conditions.get('Flame Burst'));
			}
		},
		onAfterSubDamage(damage, target, source, move) {
			for (const ally of target.adjacentAllies()) {
				this.damage(ally.baseMaxhp / 16, ally, source, this.dex.conditions.get('Flame Burst'));
			}
		},
		secondary: null,
		target: "normal",
		type: "Fire",
		contestType: "Beautiful",
	},
	//
	fly: {
		num: 19,
		accuracy: 95,
		basePower: 90,
		category: "Physical",
		name: "Fly",
		pp: 15,
		priority: 0,
		flags: {
			contact: 1, charge: 1, protect: 1, mirror: 1, gravity: 1, distance: 1,
			metronome: 1, nosleeptalk: 1, noassist: 1, failinstruct: 1,
		},
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
		condition: {
			duration: 2,
			onInvulnerability(target, source, move) {
				if (['gust', 'twister', 'skyuppercut', 'thunder', 'hurricane', 'smackdown', 'thousandarrows', 'stormslam'].includes(move.id)) {
					return;
				}
				return false;
			},
			onSourceModifyDamage(damage, source, target, move) {
				if (move.id === 'gust' || move.id === 'twister') {
					return this.chainModify(2);
				}
			},
		},
		secondary: null,
		target: "any",
		type: "Flying",
		contestType: "Clever",
	},
	//
	frenzyplant: {
		num: 338,
		accuracy: 90,
		basePower: 150,
		category: "Special",
		name: "Frenzy Plant",
		pp: 5,
		priority: 0,
		flags: {recharge: 1, protect: 1, mirror: 1, nonsky: 1, metronome: 1},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		self: {
			volatileStatus: 'mustrecharge',
		},
		secondary: null,
		target: "normal",
		type: "Grass",
		contestType: "Cool",
	},
	//
	grasspledge: {
		num: 520,
		accuracy: 100,
		basePower: 80,
		basePowerCallback(target, source, move) {
			// Check if the sourceEffect is a non-status, single-target Water or Fire move
			const sourceMove = this.dex.moves.get(move.sourceEffect);
			if (
				sourceMove &&
				(sourceMove.type === 'Water' || sourceMove.type === 'Fire') &&
				sourceMove.category !== 'Status' &&
				sourceMove.target === 'normal'
			) {
				this.add('-combine');
				return 150;
			}
			return move.basePower;
		},
		category: "Special",
		name: "Grass Pledge",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, nonsky: 1, metronome: 1, pledgecombo: 1},
		onPrepareHit(target, source, move) {
			for (const action of this.queue.list as MoveAction[]) {
				if (
					!action.move || !action.pokemon?.isActive ||
					action.pokemon.fainted || action.maxMove || action.zmove
				) {
					continue;
				}
				const partnerMove = this.dex.moves.get(action.move.id);
				if (
					action.pokemon.isAlly(source) &&
					partnerMove.category !== 'Status' &&
					['Water', 'Fire'].includes(partnerMove.type)
				) {
					this.queue.prioritizeAction(action, move);
					this.add('-waiting', source, action.pokemon);
					return null;
				}
			}
		},
		onModifyMove(move, source) {
			const sourceMove = this.dex.moves.get(move.sourceEffect);
			if (
				sourceMove &&
				sourceMove.category !== 'Status' &&
				sourceMove.target === 'normal'
			) {
				if (sourceMove.type === 'Water') {
					move.type = 'Grass';
					move.forceSTAB = true;
					move.sideCondition = 'grasspledge';
				}
				if (sourceMove.type === 'Fire') {
					move.type = 'Fire';
					move.forceSTAB = true;
					move.self = {sideCondition: 'firepledge'};
				}
			}
			if (source.getStat('atk', false, true) > source.getStat('spa', false, true)) move.category = 'Physical';
		},
		condition: {
			duration: 4,
			onSideStart(targetSide) {
				this.add('-sidestart', targetSide, 'Grass Pledge');
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 9,
			onSideEnd(targetSide) {
				this.add('-sideend', targetSide, 'Grass Pledge');
			},
			onModifySpe(spe, pokemon) {
				return this.chainModify(0.25);
			},
		},
		secondary: null,
		target: "normal",
		type: "Grass",
		contestType: "Beautiful",
	},
	//
	hydrocannon: {
		num: 308,
		accuracy: 90,
		basePower: 150,
		category: "Special",
		name: "Hydro Cannon",
		pp: 5,
		priority: 0,
		flags: {recharge: 1, protect: 1, mirror: 1, metronome: 1},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		self: {
			volatileStatus: 'mustrecharge',
		},
		secondary: null,
		target: "normal",
		type: "Water",
		contestType: "Beautiful",
	},
	//
	irontail: {
		num: 231,
		accuracy: 85,
		basePower: 130,
		category: "Physical",
		name: "Iron Tail",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		secondary: {
			chance: 30,
			boosts: {
				def: -1,
			},
		},
		target: "normal",
		type: "Steel",
		contestType: "Cool",
	},
	//
	meditate: {
		num: 96,
		accuracy: true,
		basePower: 0,
		category: "Status",
	//	isNonstandard: "Past",
		name: "Meditate",
		pp: 40,
		priority: 0,
		flags: {snatch: 1, metronome: 1},
		boosts: {
			atk: 1,
		},
		secondary: null,
		target: "self",
		type: "Psychic",
		zMove: {boost: {atk: 1, spd: 1, spe: 1}},
		contestType: "Beautiful",
	},
	//
	mortalspin: {
		num: 866,
		accuracy: 100,
		basePower: 30,
		category: "Physical",
		name: "Mortal Spin",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		onAfterHit(target, pokemon, move) {
			if (!move.hasSheerForce) {
				if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
					this.add('-end', pokemon, 'Leech Seed', '[from] move: Mortal Spin', '[of] ' + pokemon);
				}
				const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
				for (const condition of sideConditions) {
					if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
						this.add('-sideend', pokemon.side, this.dex.conditions.get(condition).name, '[from] move: Mortal Spin', '[of] ' + pokemon);
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
					this.add('-end', pokemon, 'Leech Seed', '[from] move: Mortal Spin', '[of] ' + pokemon);
				}
				const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge', 'flotsamhookhazard'];
				for (const condition of sideConditions) {
					if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
						this.add('-sideend', pokemon.side, this.dex.conditions.get(condition).name, '[from] move: Mortal Spin', '[of] ' + pokemon);
					}
				}
				if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
					pokemon.removeVolatile('partiallytrapped');
				}
			}
		},
		secondary: {
			chance: 100,
			status: 'psn',
		},
		target: "allAdjacentFoes",
		type: "Poison",
	},
	//
	rapidspin: {
		num: 229,
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		name: "Rapid Spin",
		pp: 40,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		onAfterHit(target, pokemon, move) {
			if (!move.hasSheerForce) {
				if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
					this.add('-end', pokemon, 'Leech Seed', '[from] move: Rapid Spin', '[of] ' + pokemon);
				}
				const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge', 'flotsamhookhazard'];
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
				const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge', 'flotsamhookhazard'];
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
		secondary: {
			chance: 100,
			self: {
				boosts: {
					spe: 1,
				},
			},
		},
		target: "normal",
		type: "Normal",
		contestType: "Cool",
	},
	//
	smackdown: {
		num: 479,
		accuracy: 100,
		basePower: 75,
		category: "Physical",
		name: "Smack Down",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, nonsky: 1, metronome: 1},
		volatileStatus: 'smackdown',
		condition: {
			noCopy: true,
			onStart(pokemon) {
				let applies = false;
				if (pokemon.hasType('Flying') || pokemon.hasAbility('levitate')) applies = true;
				if (pokemon.hasItem('ironball') || pokemon.volatiles['ingrain'] ||
					this.field.getPseudoWeather('gravity')) applies = false;
				if (pokemon.removeVolatile('fly') || pokemon.removeVolatile('bounce')) {
					applies = true;
					this.queue.cancelMove(pokemon);
					pokemon.removeVolatile('twoturnmove');
				}
				if (pokemon.volatiles['magnetrise']) {
					applies = true;
					delete pokemon.volatiles['magnetrise'];
				}
				if (pokemon.volatiles['telekinesis']) {
					applies = true;
					delete pokemon.volatiles['telekinesis'];
				}
				if (!applies) return false;
				this.add('-start', pokemon, 'Smack Down');
			},
			onRestart(pokemon) {
				if (pokemon.removeVolatile('fly') || pokemon.removeVolatile('bounce')) {
					this.queue.cancelMove(pokemon);
					pokemon.removeVolatile('twoturnmove');
					this.add('-start', pokemon, 'Smack Down');
				}
			},
			// groundedness implemented in battle.engine.js:BattlePokemon#isGrounded
		},
		secondary: null,
		target: "normal",
		type: "Rock",
		contestType: "Tough",
	},
	// end

	// start: modifying Soak for Aegislash-Light to account for form change, letting it stay mono Water
	soak: {
		num: 487,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Soak",
		pp: 20,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, allyanim: 1, metronome: 1},
		onHit(target) {
			if (target.getTypes().join() === 'Water' || !target.setType('Water')) {
				// Soak should animate even when it fails.
				// Returning false would suppress the animation.
				this.add('-fail', target);
				return null;
			}
			this.add('-start', target, 'typechange', 'Water');
			
			// Apply soaktypedenial volatile if the target is Aegislash-Light or Grinsegrin
			if (target.species.name === 'Aegislash-Light' || target.species.name === 'Aegislash-Blade-Light') {
				target.addVolatile('soaktypedenial');
			}
		},
		secondary: null,
		target: "normal",
		type: "Water",
		zMove: {boost: {spa: 1}},
		contestType: "Cute",
	},
	//
	submission: {
		num: 66,
		accuracy: 80,
		basePower: 150,
		category: "Physical",
	//	isNonstandard: "Past",
		name: "Submission",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		recoil: [1, 2],
		secondary: null,
		target: "normal",
		type: "Fighting",
		contestType: "Cool",
	},
	//
	triplekick: {
		num: 167,
		accuracy: 90,
		basePower: 20,
		basePowerCallback(pokemon, target, move) {
			return 20 * move.hit;
		},
		category: "Physical",
		name: "Triple Kick",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		multihit: 3,
		multiaccuracy: true,
		secondary: null,
		target: "normal",
		type: "Fighting",
		zMove: {basePower: 120},
		maxMove: {basePower: 80},
		contestType: "Cool",
	},
	//
	/*waterpledge: {
		num: 518,
		accuracy: 100,
		basePower: 80,
		basePowerCallback(target, source, move) {
			if (['firepledge', 'grasspledge'].includes(move.sourceEffect)) {
				this.add('-combine');
				return 150;
			}
			return move.basePower;
		},
		category: "Special",
		name: "Water Pledge",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, nonsky: 1, metronome: 1, pledgecombo: 1},
		onPrepareHit(target, source, move) {
			for (const action of this.queue) {
				if (action.choice !== 'move') continue;
				const otherMove = action.move;
				const otherMoveUser = action.pokemon;
				if (
					!otherMove || !action.pokemon || !otherMoveUser.isActive ||
					otherMoveUser.fainted || action.maxMove || action.zmove
				) {
					continue;
				}
				const partnerMove = this.dex.moves.get(otherMove.id);
				if (
					otherMoveUser.isAlly(source) &&
					partnerMove.category !== 'Status' &&
					['Fire', 'Grass'].includes(partnerMove.type)
				) {
					this.queue.prioritizeAction(action, move);
					this.add('-waiting', source, otherMoveUser);
					return null;
				}
			}
		},
		onModifyMove(move) {
			if (move.sourceEffect) {
				const partnerMove = this.dex.moves.get(move.sourceEffect);
				if (partnerMove.type === 'Grass') {
					move.type = 'Grass';
					move.forceSTAB = true;
					move.sideCondition = 'grasspledge';
				}
				if (partnerMove.type === 'Fire') {
					move.type = 'Water';
					move.forceSTAB = true;
					move.self = {sideCondition: 'waterpledge'};
				}
			}
		},
		condition: {
			duration: 4,
			onSideStart(targetSide) {
				this.add('-sidestart', targetSide, 'Water Pledge');
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 7,
			onSideEnd(targetSide) {
				this.add('-sideend', targetSide, 'Water Pledge');
			},
			onModifyMove(move, pokemon) {
				if (move.secondaries && move.id !== 'secretpower') {
					this.debug('doubling secondary chance');
					for (const secondary of move.secondaries) {
						if (pokemon.hasAbility('serenegrace') && secondary.volatileStatus === 'flinch') continue;
						if (secondary.chance) secondary.chance *= 2;
					}
					if (move.self?.chance) move.self.chance *= 2;
				}
			},
		},
		secondary: null,
		target: "normal",
		type: "Water",
		contestType: "Beautiful",
	},*/
	//
	waterpledge: {
		num: 518,
		accuracy: 100,
		basePower: 80,
		basePowerCallback(target, source, move) {
			// Check if the sourceEffect is a non-status, single-target Fire or Grass move
			const sourceMove = this.dex.moves.get(move.sourceEffect);
			if (
				sourceMove &&
				(sourceMove.type === 'Fire' || sourceMove.type === 'Grass') &&
				sourceMove.category !== 'Status' &&
				sourceMove.target === 'normal'
			) {
				this.add('-combine');
				return 150;
			}
			return move.basePower;
		},
		category: "Special",
		name: "Water Pledge",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, nonsky: 1, metronome: 1, pledgecombo: 1},
		onPrepareHit(target, source, move) {
			for (const action of this.queue) {
				if (action.choice !== 'move') continue;
				const otherMove = action.move;
				const otherMoveUser = action.pokemon;
				if (
					!otherMove || !action.pokemon || !otherMoveUser.isActive ||
					otherMoveUser.fainted || action.maxMove || action.zmove
				) {
					continue;
				}
				// Check if the other move is a non-status, single-target Fire or Grass move
				const otherMoveData = this.dex.moves.get(otherMove.id);
				if (
					otherMoveUser.isAlly(source) &&
					otherMoveData &&
					(otherMoveData.type === 'Fire' || otherMoveData.type === 'Grass') &&
					otherMoveData.category !== 'Status' &&
					otherMoveData.target === 'normal'
				) {
					this.queue.prioritizeAction(action, move);
					this.add('-waiting', source, otherMoveUser);
					return null;
				}
			}
		},
		onModifyMove(move, source) {
			const sourceMove = this.dex.moves.get(move.sourceEffect);
			if (
				sourceMove &&
				sourceMove.category !== 'Status' &&
				sourceMove.target === 'normal'
			) {
				if (sourceMove.type === 'Grass') {
					move.type = 'Grass';
					move.forceSTAB = true;
					move.sideCondition = 'grasspledge';
				}
				if (sourceMove.type === 'Fire') {
					move.type = 'Water';
					move.forceSTAB = true;
					move.self = {sideCondition: 'waterpledge'};
				}
			}
			if (source.getStat('atk', false, true) > source.getStat('spa', false, true)) move.category = 'Physical';
		},
		condition: {
			duration: 4,
			onSideStart(targetSide) {
				this.add('-sidestart', targetSide, 'Water Pledge');
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 7,
			onSideEnd(targetSide) {
				this.add('-sideend', targetSide, 'Water Pledge');
			},
			onModifyMove(move, pokemon) {
				if (move.secondaries && move.id !== 'secretpower') {
					this.debug('doubling secondary chance');
					for (const secondary of move.secondaries) {
						if (pokemon.hasAbility('serenegrace') && secondary.volatileStatus === 'flinch') continue;
						if (secondary.chance) secondary.chance *= 2;
					}
					if (move.self?.chance) move.self.chance *= 2;
				}
			},
		},
		secondary: null,
		target: "normal",
		type: "Water",
		contestType: "Beautiful",
	},
	//
	wildcharge: {
		num: 528,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		name: "Wild Charge",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		recoil: [1, 4],
		secondary: null,
		target: "normal",
		type: "Electric",
		contestType: "Tough",
	},
	// end	

	// start: list of unattainable moves
	frustration: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	hail: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	pursuit: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	return: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	hiddenpower: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	hiddenpowerfighting: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	hiddenpowerfire: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	hiddenpowergrass: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	hiddenpowerwater: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	hiddenpowerelectric: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	hiddenpowerice: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	hiddenpowerpoison: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	hiddenpowerground: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	hiddenpowerpsychic: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	hiddenpowerdark: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	hiddenpowerbug: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	hiddenpowerghost: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	hiddenpowerdragon: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	hiddenpowersteel: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	hiddenpowerflying: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	hiddenpowerrock: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	// end
};
