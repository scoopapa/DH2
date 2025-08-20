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
		target: "normal",
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
		shortDesc: "Traps user + target; Leech Seed if trapped.",
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
				const sourceSlot = pokemon.volatiles['brainage'].sourceSlot;
				const source = this.getAtSlot(sourceSlot);
				if (!source || source.fainted || source.hp <= 0) {
					this.debug('Source fainted - ending Brainage');
					this.add('-end', pokemon, 'brainage');
					pokemon.removeVolatile('brainage');
					return;
				}
				const damage = this.damage(pokemon.baseMaxhp / 8, pokemon, source);
				if (damage) {
					this.heal(damage, source, pokemon);
				}
			}
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
		basePower: 50,
		category: "Physical",
		shortDesc: "Double damage against grounded target. Fails in Gravity.",
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
				if (['gmaxoneblow', 'gmaxrapidflow'].includes(move.id)) return;

				// Let Z or Max moves through, but mark them
				if (move.isZ || move.isMax) {
					target.getMoveHitData(move).zBrokeProtect = true;
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
		secondary: {},  
		target: "allAdjacentFoes",  
		type: "Bug",  
		contestType: "Clever", 
	},
	//
	passiveaggressive: {
		num: -8,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Passive Aggressive",
		shortDesc: "Ally’s +0 prio status move trigger 60 BP special Sound move hitting foes.",
		pp: 10,
		priority: 0,
		flags: {snatch: 1},
		volatileStatus: 'passiveaggressive',
		onTry(pokemon) {
			if (pokemon.volatiles['passiveaggressive']) {
				this.add('-fail', pokemon, 'move: Passive Aggressive');
				return null;
			}
		},
		condition: {
			onStart(pokemon) {
				this.add('-start', pokemon, 'Passive Aggressive');
			},
			onAllyTryMove(source, target, move) {
				// `source`: the ally trying to move
				// `target`: usually the ally's target (not used here)
				// Only trigger on neutral priority status moves
				if (source === this.effectState.target) return; // skip if it's the user, not an ally
				
				if (move.category !== 'Status' || move.priority !== 0) return;
	
				// Don't trigger on moves that are called by other moves (like Copycat)
				if (move.isExternal) return;
	
				this.add('-activate', source, 'Passive Aggressive');
				this.actions.useMove('echosnap', source); // Ally executes Echo Snap
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Passive Aggressive');
			},
		},
		secondary: null,
		target: "self",
		type: "Psychic",
		contestType: "Tough",
	},
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
		shortDesc: "+1 acc, +2 other stat based on target's best stat.",
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
		basePower: 60,
		category: "Physical",
		shortDesc: "+20 for each other unfainted Bug on the team.",
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
	
			// Add 20 base power for each Bug-type Pokémon in the party (excluding the user)
			return basePower + bugCount * 20;
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
		shortDesc: "30% of putting target to sleep. Powder.",
		name: "Sylvan Powder",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, powder: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Sleep Powder", target);
		},
		secondary: {
			chance: 30,
			status: 'slp',
		},
		target: "normal",
		type: "Grass",
		contestType: "Beautiful",
	},
	//
	wukonginferno: {
		num: -15,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		shortDesc: "Sets Sun.",
		name: "Wukong Inferno",
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
		shortDesc: "Super effective against Ground, fail against airborne.",
		name: "Conductive Spell",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hex", target);
		},
		onModifyMove(move) {
			if (!move.ignoreImmunity) move.ignoreImmunity = {};
			if (move.ignoreImmunity !== true) {
				move.ignoreImmunity['Electric'] = true;
			}
		},
		onTryHit(target, source, move) {
			// Check if the target is airborne and fail the move
			if (!target.isGrounded()) {
				return false; // Fail the move
			}
		},
		onEffectiveness(typeMod, target, type) {
			if (!target) return;
			if (type === 'Ground' && target.isGrounded()) {
				return 1; // Make it super effective
			}
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
		target: "allAdjacentFoes",
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
	//
	reverberation: {
		num: -23,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Reverberation",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, bypasssub: 1, metronome: 1},
		shortDesc: "Mini Earthquake follow-up at 60 BP.",
		onAfterMove(source) {
			source.addVolatile('quakingboom');
			this.actions.useMove('earthquake', source);
		},
		secondary: null,
		target: "normal",
		type: "Electric",
		contestType: "Cool",
	},
	earthquake: {
		inherit: true,
		onModifyMove(move, source, target) {
			if (source && source.volatiles['quakingboom']) {
				move.basePower = 60;
			}
		},
		onAfterMove(target, source) {
			// This function is called for each target hit by Earthquake
			// Check if the target is still alive
			if (target && target.hp > 0) {
				// Check how many active Pokémon are still alive
				const allTargets = this.getAllActive().filter(p => p && p.hp > 0);
				// If this is the last target being hit, remove the volatile
				if (allTargets.length === 1) {
					delete source.volatiles['quakingboom'];
				}
			}
		},
	},
	//
	mantisfists: {
		num: -24,
		accuracy: 100,
		basePower: 45,
		category: "Physical",
		name: "Mantis Fists",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1, metronome: 1},
		multihit: 2,
		shortDesc: "Hits twice + no contact penalty.",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Focus Energy");
			this.add('-anim', source, "Mega Punch", target);
		},
		onModifyMove(move) {
			delete move.flags['contact'];
		},
		secondary: null,
		target: "normal",
		type: "Bug",
		contestType: "Cool",
	},
	//
	tautthread: {
		num: -25,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Taut Thread",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, nonsky: 1, noassist: 1, failcopycat: 1},
		shortDesc: "Mat Block. If successful block, Misty Terrain.",
		stallingMove: true,
		sideCondition: 'tautthread',
	
		onTry(source) {
			if (source.activeMoveActions > 1) {
				this.hint("Taut Thread only works on your first turn out.");
				return false;
			}
			return !!this.queue.willAct();
		},
		condition: {
			duration: 1,
			onSideStart(target, source) {
				this.add('-singleturn', source, 'Taut Thread');
			},
			onTryHitPriority: 3,
			onTryHit(target, source, move) {
				if (!move.flags['protect']) {
					if (['gmaxoneblow', 'gmaxrapidflow'].includes(move.id)) return;
					if (move.isZ || move.isMax) target.getMoveHitData(move).zBrokeProtect = true;
					return;
				}
				if (move && (move.target === 'self' || move.category === 'Status')) return;
				this.add('-activate', target, 'move: Taut Thread', move.name);
				const lockedmove = source.getVolatile('lockedmove');
				if (lockedmove) {
					// Outrage counter is reset
					if (source.volatiles['lockedmove'].duration === 2) {
						delete source.volatiles['lockedmove'];
					}
				}
				if (!this.field.isTerrain('mistyterrain')) {
					this.field.setTerrain('mistyterrain');
				}
				return this.NOT_FAIL;
			},
		},	
		secondary: null,
		target: "allySide",
		type: "Psychic",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Cool",
	},
	//
	echosnap: {
		num: -26,
		accuracy: 100,
		basePower: 60,
		category: "Special",
		name: "Echo Snap",
		shortDesc: "Matches user's primary type and hits opposing Pkm.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, sound: 1, bypasssub: 1, failencore: 1, failmefirst: 1, noassist: 1, failcopycat: 1, failmimic: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hyper Voice", target);
		},
		onModifyType(move, pokemon) {
			let type = pokemon.types[0];
			if (type === "Bird") type = "???";
			move.type = type;
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Psychic",
		contestType: "Cool",
	},
	//
	shellsight: {
		num: -27,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Shell Sight",
		shortDesc: "Rock Soak; -1 Spe Octolock; doesn't hurt ally.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, allyanim: 1, metronome: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Seed Bomb", target);
		},
		onTryHit(target, source, move) {
			if (source.isAlly(target)) {
				move.basePower = 0;
				move.infiltrates = true;
			}
		},
		onHit(target) {
			if (target.getTypes().join() === 'Rock' || !target.setType('Rock')) {
				this.add('-fail', target);
				return null;
			}
			this.add('-start', target, 'typechange', 'Rock');
		},
		volatileStatus: 'shellsight',
		condition: {
			onStart(pokemon, source) {
				this.add('-start', pokemon, 'move: Shell Sight', '[of] ' + source);
			},
			onResidualOrder: 14,
			onResidual(pokemon) {
				const source = this.effectState.source;
				if (source && (!source.isActive || source.hp <= 0 || !source.activeTurns)) {
					delete pokemon.volatiles['shellsight'];
					this.add('-end', pokemon, 'Shell Sight', '[partiallytrapped]', '[silent]');
					return;
				}
				this.boost({spe: -1}, pokemon);
			},
			onTrapPokemon(pokemon) {
				if (this.effectState.source && this.effectState.source.isActive) pokemon.tryTrap();
			},
		},
		secondary: null,
		target: "normal",
		type: "Grass",
	},		  
	//
	oilspill: {
		num: -28,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		shortDesc: "Dual Poison & Water move that poisons in Acidic Rain.",
		name: "Oil Spill",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Muddy Water', target);
		},
		onEffectiveness(typeMod, target, type, move) {
			return typeMod + this.dex.getEffectiveness('Water', type);
		},
		secondary: {chance: 100,
			onHit(target, source, move) {
				if (target.hasAbility('shielddust') || target.hasItem('covertcloak')) return;
				if (this.field.isWeather('acidicrain')) {
				target.trySetStatus('psn', source);
				}
			},
		},
		target: "allAdjacentFoes",
		type: "Poison",
		contestType: "Tough",
	},
	//
	acidicrain: {
		num: -29,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Acidic Rain",
		pp: 5,
		priority: 0,
		flags: {metronome: 1},
		shortDesc: "Sets Acidic Rain, which lasts for 5 turns.",
		weather: 'Acidic Rain',
		secondary: null,
		target: "all",
		type: "Poison",
		zMove: {boost: {spa: 1}},
		contestType: "Tough",
	},	  
	//
	acidicbreath: {
		num: -30,
		accuracy: 100,
		basePower: 130,
		category: "Special",
		shortDesc: "Skips in Acidic Rain. Burns target.",
		name: "Acidic Breath",
		pp: 5,
		priority: 0,
		flags: {charge: 1, protect: 1, mirror: 1, metronome: 1, nosleeptalk: 1, failinstruct: 1},
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, 'Charge');
			if (this.field.isWeather('acidicrain')) {
				this.attrLastMove('[still]');
				this.addMove('-anim', attacker, 'Acid Downpour', defender);
				return;
			}
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
		secondary: {
			chance: 100,
			status: 'brn',
		},
		target: "normal",
		type: "Poison",
		contestType: "Cool",
	},
	//
	vigorterrain: {
		num: -31,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Sets Vigor Terrain, which lasts for 5 turns.",
		name: "Vigor Terrain",
		pp: 10,
		priority: 0,
		flags: {nonsky: 1, metronome: 1},
		terrain: 'vigorterrain',
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			onSourceModifyAccuracyPriority: -1,
			onSourceModifyAccuracy(accuracy, source, target) {
				if (typeof accuracy !== 'number') return;
				if (source.hasType('Fighting') && source.isGrounded() && !source.isSemiInvulnerable()) {
					this.debug('Vigor Terrain - enhancing accuracy');
					return this.chainModify(1.1);
				}
				return accuracy;
			},
			onModifyCritRatio(critRatio, source) {
				if (source.isGrounded() && source.hasType('Fighting') && !source.isSemiInvulnerable()) {
					return critRatio + 1;
				}
			},
			onAfterMoveSecondarySelf(pokemon, target, move) {
				if (pokemon.isGrounded() && !pokemon.isSemiInvulnerable() && !pokemon.fainted) {
					// Check if the user moved last
					if (!this.queue.willAct()) {
						// Fighting moves give +1 Attack if user moved last
						if (move.type === 'Fighting') {
							this.boost({atk: 1}, pokemon);
						//	this.add('-boost', pokemon, 'atk', 1, '[from] Vigor Terrain');
						}
					}
				}
			},
			onFieldStart(field, source, effect) {
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Vigor Terrain', '[from] ability: ' + effect.name, '[of] ' + source);
					this.add('-message', "Grounded Fighting Pokémon have +1 crit ratio and 10% accuracy more.");
					this.add('-message', "Fighting moves of grounded Pokémon give +1 Atk if user moved last.");
				} else {
					this.add('-fieldstart', 'move: Vigor Terrain');
				}
			},
			onFieldResidualOrder: 27,
			onFieldResidualSubOrder: 7,
			onFieldEnd() {
				this.add('-fieldend', 'move: Vigor Terrain');
			},
 		},
		secondary: null,
		target: "all",
		type: "Fighting",
		contestType: "Tough",
	},
	//
	recklesslariat: {
		num: -32,
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		shortDesc: "Punch move that ignores redirection.",
		name: "Reckless Lariat",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1, metronome: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Darkest Lariat', target);
		},
		tracksTarget: true,
		secondary: null,
		target: "normal",
		type: "Fighting",
	},
	//
	enzymaticbite: {
		num: -33,
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		shortDesc: "Recovers half of damage done to target, 3/4 in Psychic Terrain.",
		name: "Enzymatic Bite",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, heal: 1, metronome: 1, bite: 1},
		drain: [1, 2],
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Leech Life', target);
		},
		onModifyMove(move, source, target) {
			if (this.field.isTerrain('psychicterrain')) move.drain = [3, 4];
		},
		secondary: null,
		target: "normal",
		type: "Poison",
		contestType: "Clever",
	},
	//
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
	//
	wailingwraith: {
		num: -35,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		name: "Wailing Wraith",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, bypasssub: 1, metronome: 1, nosleeptalk: 1, failinstruct: 1},
		self: {
			volatileStatus: 'wailingwraith',
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Uproar', target);
		},
		onTryHit(target) {
			const activeTeam = target.side.activeTeam();
			const foeActiveTeam = target.side.foe.activeTeam();
			for (const [i, allyActive] of activeTeam.entries()) {
				if (allyActive && allyActive.status === 'slp') allyActive.cureStatus();
				const foeActive = foeActiveTeam[i];
				if (foeActive && foeActive.status === 'slp') foeActive.cureStatus();
			}
		},
		condition: {
			duration: 3,
			onStart(target) {
				this.add('-start', target, 'Wailing Wraith');
			},
			onResidual(target) {
				if (target.volatiles['throatchop']) {
					target.removeVolatile('wailingwraith');
					return;
				}
				if (target.lastMove && target.lastMove.id === 'struggle') {
					// don't lock
					delete target.volatiles['wailingwraith'];
				}
				this.add('-start', target, 'Wailing Wraith', '[upkeep]');
			},
			onResidualOrder: 28,
			onResidualSubOrder: 1,
			onEnd(target) {
				this.add('-end', target, 'Wailing Wraith');
			},
			onLockMove: 'wailingwraith',
			onAnySetStatus(status, pokemon) {
				if (status.id === 'slp') {
					if (pokemon === this.effectState.target) {
						this.add('-fail', pokemon, '[from] Wailing Wraith', '[msg]');
					} else {
						this.add('-fail', pokemon, '[from] Wailing Wraith');
					}
					return null;
				}
			},
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Ghost",
		shortDesc: "Like Uproar but hitting two opposing Pkm.",
		contestType: "Tough",
	},
	//
	strongarm: {
		num: -36,
		accuracy: 100,
		basePower: 55,
		category: "Physical",
		name: "Strongarm",
		pp: 10,
		priority: 0,
		flags: {contact: 1, punch: 1, protect: 1, mirror: 1},
		target: "normal",
		type: "Fighting",
		shortDesc: "Punching move. Hits twice in Vigor Terrain.",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dynamic Punch', target);
		},
		onHit(target, source, move) {
		// Custom behavior handled in `onModifyMove`
		},
		onModifyMove(move, source, target) {
			if (this.field.isTerrain('vigorterrain')) {
				move.multihit = 2;
			}
		},
		secondary: null,
		contestType: "Tough",
	},
	//
	forcefulhug: {
		num: -37,
		accuracy: 100,
		basePower: 130,
		category: "Physical",
		name: "Forceful Hug",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		target: "normal",
		type: "Fairy",
		shortDesc: "Both can't switch. Fails if target is already trapped.",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Play Rough', target);
		},
		onTryHit(target, source, move) {
			// Fails if target is already trapped
			if (target.volatiles['trapped'] || target.trapped) {
				this.add('-fail', source, 'move: Forceful Hug');
				this.attrLastMove('[still]');
				return null;
			}
		},
		onHit(target, source, move) {
			source.addVolatile('trapped', target, move, 'trapper');
			target.addVolatile('trapped', source, move, 'trapper');
			this.add('-message', `${source.name} and ${target.name} are locked in a forceful hug!`);
		},
		secondary: null,
		contestType: "Cute",
	},
	//
	rampage: {
		num: -38,
		accuracy: 100,
		basePower: 150,
		category: "Physical",
		name: "Rampage",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1},
		target: "allAdjacent",
		type: "Dark",
		shortDesc: "Hits all adjacent. User gains Stall ability after successful hit.",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Earthquake', target);
		},
		onAfterHit(target, source, move) {
			const blockedAbilities = ['asoneglastrier', 'asonespectrier', 'battlebond', 'comatose', 'desertmirage', 'disguise', 'gulpmissile', 'iceface', 'multitype', 'powerconstruct', 'rewind', 'rkssystem', 'schooling', 'sharedmindset', 'shieldsdown', 'stancechange', 'terashift', 'zenmode', 'zerotohero'];
			const currentAbility = source.getAbility().id;

			if (currentAbility !== 'stall' && !blockedAbilities.includes(currentAbility)) {
				const oldAbility = source.setAbility('stall');
				if (oldAbility) {
					this.add('-ability', source, 'Stall');
					this.add('-message', `${source.name} became slower due to its rampage!`);
				}
			}
		},
		onAfterSubDamage(damage, target, source, move) {
			const blockedAbilities = ['asoneglastrier', 'asonespectrier', 'battlebond', 'comatose', 'desertmirage', 'disguise', 'gulpmissile', 'iceface', 'multitype', 'powerconstruct', 'rewind', 'rkssystem', 'schooling', 'sharedmindset', 'shieldsdown', 'stancechange', 'terashift', 'zenmode', 'zerotohero'];
			const currentAbility = source.getAbility().id;

			if (currentAbility !== 'stall' && !blockedAbilities.includes(currentAbility)) {
				const oldAbility = source.setAbility('stall');
				if (oldAbility) {
					this.add('-ability', source, 'Stall');
					this.add('-message', `${source.name} became slower due to its rampage!`);
				}
			}
		},
		secondary: null,
		contestType: "Tough",
	},
	//
	borealis: {
		num: -39,
		accuracy: 100,
		basePower: 70,
		category: "Special",
		name: "Borealis",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1},
		target: "allAdjacentFoes",
		type: "Ice",
		shortDesc: "Sound spread move. Aurora Veil if user hurt this turn.",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Aurora Beam', target);
		},
		onAfterMove(source, target, move) {
    		const wasDamaged = source.attackedBy.some(p => p.damage > 0 && p.thisTurn);
    		if (wasDamaged && !source.side.sideConditions['auroraveil']) {
      			source.side.addSideCondition('auroraveil');
      			this.add('-sidestart', source.side, 'move: Aurora Veil');
   			}
  		},
		secondary: null,
		contestType: "Beautiful",
	},
	//
	dispersion: {
		num: -40,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		shortDesc: "Type varies based on the user's primary type. Hits foes.",
		name: "Dispersion",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, dance: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Silver Wind", target);
		},
		onModifyType(move, pokemon) {
			let type = pokemon.types[0];
			if (type === "Bird") type = "???";
			move.type = type;
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Normal",
		contestType: "Beautiful",
	},
	//
	
	// start
	autotomize: {
		num: 475,
		accuracy: true,
		basePower: 0,
		category: "Status",
		isNonstandard: null,
		name: "Autotomize",
		pp: 15,
		priority: 0,
		flags: {snatch: 1, metronome: 1},
		onTryHit(pokemon) {
			const hasContrary = pokemon.hasAbility('contrary');
			if ((!hasContrary && pokemon.boosts.spe === 6) || (hasContrary && pokemon.boosts.spe === -6)) {
				return false;
			}
		},
		boosts: {
			spe: 2,
		},
		onHit(pokemon) {
			if (pokemon.weighthg > 1) {
				pokemon.weighthg = Math.max(1, pokemon.weighthg - 1000);
				this.add('-start', pokemon, 'Autotomize');
			}
		},
		secondary: null,
		target: "self",
		type: "Steel",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Beautiful",
	},
	//
	avalanche: {
		num: 419,
		accuracy: 100,
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
		category: "Physical",
		shortDesc: "Double damage if hurt this turn. Hits all opposing Pkm.",
		name: "Avalanche",
		pp: 10,
		priority: -4,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Ice",
		contestType: "Beautiful",
	},
	//
	belch: {
		num: 562,
		accuracy: 90,
		basePower: 120,
		category: "Special",
		shortDesc: "Consumes berry before attacking.",
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
				const ally = target.side.active.find(pokemon => pokemon && pokemon !== target && !pokemon.fainted && !pokemon.hasAbility('selfish'));
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
		shortDesc: "User can't move next turn. Physical if Atk > SpA.",
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
	chipaway: {
		num: 498,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		isNonstandard: null,
		name: "Chip Away",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		ignoreDefensive: true,
		ignoreEvasion: true,
		secondary: null,
		target: "normal",
		type: "Normal",
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
					const ally = source.side.active.find(pokemon => pokemon && pokemon !== source && !pokemon.fainted && !pokemon.hasAbility('selfish'));
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
		shortDesc: "Hits adjacent Pkm; user faints; guaranteed crit.",
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
			if (['grasspledge', 'waterpledge'].includes(move.sourceEffect)) {
				this.add('-combine');
				return 150;
			}
			return move.basePower;
		},
		category: "Special",
		shortDesc: "Combo with Grass/Water Pledge. Physical if Atk > SpA.",
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
				if (action.pokemon.isAlly(source) && ['grasspledge', 'waterpledge'].includes(action.move.id)) {
					this.queue.prioritizeAction(action, move);
					this.add('-waiting', source, action.pokemon);
					return null;
				}
			}
		},
		onModifyMove(move, source) {
			if (move.sourceEffect === 'waterpledge') {
				move.type = 'Water';
				move.forceSTAB = true;
				move.self = {sideCondition: 'waterpledge'};
			}
			if (move.sourceEffect === 'grasspledge') {
				move.type = 'Fire';
				move.forceSTAB = true;
				move.sideCondition = 'firepledge';
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
		basePower: 80,
		category: "Special",
		isNonstandard: null,
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
		shortDesc: "User can't move next turn. Physical if Atk > SpA.",
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
			if (['waterpledge', 'firepledge'].includes(move.sourceEffect)) {
				this.add('-combine');
				return 150;
			}
			return move.basePower;
		},
		category: "Special",
		shortDesc: "Combo with Fire/Water Pledge. Physical if Atk > SpA.",
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
				if (action.pokemon.isAlly(source) && ['waterpledge', 'firepledge'].includes(action.move.id)) {
					this.queue.prioritizeAction(action, move);
					this.add('-waiting', source, action.pokemon);
					return null;
				}
			}
		},
		onModifyMove(move, source) {
			if (move.sourceEffect === 'waterpledge') {
				move.type = 'Grass';
				move.forceSTAB = true;
				move.sideCondition = 'grasspledge';
			}
			if (move.sourceEffect === 'firepledge') {
				move.type = 'Fire';
				move.forceSTAB = true;
				move.sideCondition = 'firepledge';
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
	hypnosis: {
		num: 95,
		accuracy: 60,
		basePower: 0,
		category: "Status",
		shortDesc: "Psychic are immune to Hypnosis's Sleep.",
		name: "Hypnosis",
		pp: 20,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, metronome: 1},
		onTryHit(target, source, move) {
			if (target.hasType('Psychic')) {
				this.add('-immune', target, '[from] type: Psychic');
				return null;
			}
		},
		status: 'slp',
		secondary: null,
		target: "normal",
		type: "Psychic",
		zMove: {boost: {spe: 1}},
		contestType: "Clever",
	},
	//
	hydrocannon: {
		num: 308,
		accuracy: 90,
		basePower: 150,
		category: "Special",
		shortDesc: "User can't move next turn. Physical if Atk > SpA.",
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
	kingsshield: {
		num: 588,
		accuracy: true,
		basePower: 0,
		category: "Status",
		isNonstandard: null,
		name: "King's Shield",
		pp: 10,
		priority: 4,
		flags: {noassist: 1, failcopycat: 1, failinstruct: 1},
		stallingMove: true,
		volatileStatus: 'kingsshield',
		onPrepareHit(pokemon) {
			return !!this.queue.willAct() && this.runEvent('StallMove', pokemon);
		},
		onHit(pokemon) {
			pokemon.addVolatile('stall');
		},
		condition: {
			duration: 1,
			onStart(target) {
				this.add('-singleturn', target, 'Protect');
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
					this.boost({atk: -1}, source, target, this.dex.getActiveMove("King's Shield"));
				}
				return this.NOT_FAIL;
			},
			onHit(target, source, move) {
				if (move.isZOrMaxPowered && this.checkMoveMakesContact(move, source, target)) {
					this.boost({atk: -1}, source, target, this.dex.getActiveMove("King's Shield"));
				}
			},
		},
		secondary: null,
		target: "self",
		type: "Steel",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Cool",
	},
	//
	magnetbomb: {
		num: 443,
		accuracy: true,
		basePower: 60,
		category: "Physical",
		isNonstandard: null,
		name: "Magnet Bomb",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, bullet: 1},
		secondary: null,
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
		shortDesc: "+1 Atk, SpD, and Spe.",
		isNonstandard: null,
		name: "Meditate",
		pp: 40,
		priority: 0,
		flags: {snatch: 1, metronome: 1},
		boosts: {
			atk: 1, 
			spd: 1, 
			spe: 1,
		},
		secondary: null,
		target: "self",
		type: "Psychic",
		zMove: {boost: {atk: 1}},
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
	mudsport: {
		num: 300,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "67% Electric reduction. Water, Rock + Grass moves bypass accurracy.",
		isNonstandard: null,
		name: "Mud Sport",
		pp: 15,
		priority: 0,
		flags: {metronome: 1},
		pseudoWeather: 'mudsport',
		condition: {
			duration: 5,
			onFieldStart(field, source) {
				this.add('-fieldstart', 'move: Mud Sport', '[of] ' + source);
			},
			onBasePowerPriority: 1,
			onBasePower(basePower, attacker, defender, move) {
				if (move.type === 'Electric') {
					this.debug('Mud Sport weakening Electric-type move');
					return this.chainModify([1352, 4096]); // ~0.33×
				}
			},
			onModifyMove(move, source, target) {
				if (['Water', 'Rock', 'Grass'].includes(move.type)) {
					move.accuracy = true;
				}
			},
			onFieldResidualOrder: 27,
			onFieldResidualSubOrder: 4,
			onFieldEnd() {
				this.add('-fieldend', 'move: Mud Sport');
			},
		},
		secondary: null,
		target: "all",
		type: "Ground",
		zMove: {boost: {spd: 1}},
		contestType: "Cute",
	},
	//
	psychoshift: {
		num: 375,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		isNonstandard: null,
		name: "Psycho Shift",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onTryHit(target, source, move) {
			if (!source.status) return false;
			move.status = source.status;
		},
		self: {
			onHit(pokemon) {
				pokemon.cureStatus();
			},
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
		zMove: {boost: {spa: 2}},
		contestType: "Clever",
	},

	//
	punishment: {
		num: 386,
		accuracy: 100,
		basePower: 0,
		basePowerCallback(pokemon, target) {
			let power = 60 + 20 * target.positiveBoosts();
			if (power > 200) power = 200;
			this.debug('BP: ' + power);
			return power;
		},
		category: "Physical",
		isNonstandard: null,
		name: "Punishment",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		secondary: null,
		target: "normal",
		type: "Dark",
		zMove: {basePower: 160},
		maxMove: {basePower: 130},
		contestType: "Cool",
	},
	//
	purify: {
		num: 685,
		accuracy: true,
		basePower: 0,
		category: "Status",
		isNonstandard: null,
		name: "Purify",
		pp: 20,
		priority: 0,
		flags: {protect: 1, reflectable: 1, heal: 1, metronome: 1},
		onHit(target, source) {
			if (!target.cureStatus()) {
				this.add('-fail', source);
				this.attrLastMove('[still]');
				return this.NOT_FAIL;
			}
			this.heal(Math.ceil(source.maxhp * 0.5), source);
		},
		secondary: null,
		target: "normal",
		type: "Poison",
		zMove: {boost: {atk: 1, def: 1, spa: 1, spd: 1, spe: 1}},
		contestType: "Beautiful",
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
	rototiller: {
		num: 563,
		accuracy: true,
		basePower: 0,
		category: "Status",
		isNonstandard: null,
		name: "Rototiller",
		pp: 10,
		priority: 0,
		flags: {metronome: 1},
		onHitField(target, source) {
			const targets: Pokemon[] = [];
			let anyAirborne = false;
			for (const pokemon of this.getAllActive()) {
				if (!pokemon.runImmunity('Ground')) {
					this.add('-immune', pokemon);
					anyAirborne = true;
					continue;
				}
				if (pokemon.hasType('Grass')) {
					// This move affects every grounded Grass-type Pokemon in play.
					targets.push(pokemon);
				}
			}
			if (!targets.length && !anyAirborne) return false; // Fails when there are no grounded Grass types or airborne Pokemon
			for (const pokemon of targets) {
				this.boost({atk: 1, spa: 1}, pokemon, source);
			}
		},
		secondary: null,
		target: "all",
		type: "Ground",
		zMove: {boost: {atk: 1}},
		contestType: "Tough",
	},
	//
	sharpen: {
		num: 159,
		accuracy: true,
		basePower: 0,
		category: "Status",
		isNonstandard: null,
		name: "Sharpen",
		pp: 30,
		priority: 0,
		flags: {snatch: 1, metronome: 1},
		boosts: {
			atk: 1,
		},
		secondary: null,
		target: "self",
		type: "Normal",
		zMove: {boost: {atk: 1}},
		contestType: "Cute",
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
	//
	solarbeam: {
		num: 76,
		accuracy: 100,
		basePower: 120,
		category: "Special",
		name: "Solar Beam",
		pp: 10,
		priority: 0,
		flags: {charge: 1, protect: 1, mirror: 1, metronome: 1, nosleeptalk: 1, failinstruct: 1},
		onTryMove(attacker, defender, move) {
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
			const weakWeathers = ['raindance', 'primordialsea', 'sandstorm', 'hail', 'snow', 'acidicrain'];
			if (weakWeathers.includes(pokemon.effectiveWeather())) {
				this.debug('weakened by weather');
				return this.chainModify(0.5);
			}
		},
		secondary: null,
		target: "normal",
		type: "Grass",
		contestType: "Cool",
	},
	solarblade: {
		num: 669,
		accuracy: 100,
		basePower: 125,
		category: "Physical",
		name: "Solar Blade",
		pp: 10,
		priority: 0,
		flags: {contact: 1, charge: 1, protect: 1, mirror: 1, metronome: 1, nosleeptalk: 1, failinstruct: 1, slicing: 1},
		onTryMove(attacker, defender, move) {
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
			const weakWeathers = ['raindance', 'primordialsea', 'sandstorm', 'hail', 'snow', 'acidicrain'];
			if (weakWeathers.includes(pokemon.effectiveWeather())) {
				this.debug('weakened by weather');
				return this.chainModify(0.5);
			}
		},
		secondary: null,
		target: "normal",
		type: "Grass",
		contestType: "Cool",
	},
	//
	submission: {
		num: 66,
		accuracy: 80,
		basePower: 150,
		category: "Physical",
		shortDesc: "Has 1/2 recoil.",
		isNonstandard: null,
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
	terrainpulse: {
		num: 805,
		accuracy: 100,
		basePower: 50,
		category: "Special",
		name: "Terrain Pulse",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, pulse: 1},
		onModifyType(move, pokemon) {
			if (!pokemon.isGrounded()) return;
			switch (this.field.terrain) {
			case 'electricterrain':
				move.type = 'Electric';
				break;
			case 'grassyterrain':
				move.type = 'Grass';
				break;
			case 'mistyterrain':
				move.type = 'Fairy';
				break;
			case 'psychicterrain':
				move.type = 'Psychic';
				break;
			case 'vigorterrain':
				move.type = 'Fighting';
				break;
			}
		},
		onModifyMove(move, pokemon) {
			if (this.field.terrain && pokemon.isGrounded()) {
				move.basePower *= 2;
				this.debug('BP doubled in Terrain');
			}
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		zMove: {basePower: 160},
		maxMove: {basePower: 130},
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
	waterpledge: {
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
		shortDesc: "Combo with Grass/Fire Pledge. Physical if Atk > SpA.",
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
				if (otherMoveUser.isAlly(source) && ['firepledge', 'grasspledge'].includes(otherMove.id)) {
					this.queue.prioritizeAction(action, move);
					this.add('-waiting', source, otherMoveUser);
					return null;
				}
			}
		},
		onModifyMove(move, source) {
			if (move.sourceEffect === 'grasspledge') {
				move.type = 'Grass';
				move.forceSTAB = true;
				move.sideCondition = 'grasspledge';
			}
			if (move.sourceEffect === 'firepledge') {
				move.type = 'Water';
				move.forceSTAB = true;
				move.self = {sideCondition: 'waterpledge'};
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
	watersport: {
		num: 346,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "67% Fire reduction. Water, Electric + Grass moves bypass accuracy.",
		isNonstandard: null,
		name: "Water Sport",
		pp: 15,
		priority: 0,
		flags: {nonsky: 1, metronome: 1},
		pseudoWeather: 'watersport',
		condition: {
			duration: 5,
			onFieldStart(field, source) {
				this.add('-fieldstart', 'move: Water Sport', '[of] ' + source);
			},
			onBasePowerPriority: 1,
			onBasePower(basePower, attacker, defender, move) {
				if (move.type === 'Fire') {
					this.debug('water sport weaken');
					return this.chainModify([1352, 4096]);
				}
			},
			onModifyMove(move, source, target) {
				if (['Water', 'Electric', 'Grass'].includes(move.type)) {
					move.accuracy = true;
				}
			},
			onFieldResidualOrder: 27,
			onFieldResidualSubOrder: 3,
			onFieldEnd() {
				this.add('-fieldend', 'move: Water Sport');
			},
		},
		secondary: null,
		target: "all",
		type: "Water",
		zMove: {boost: {spd: 1}},
		contestType: "Cute",
	},
	//
	weatherball: {
		num: 311,
		accuracy: 100,
		basePower: 50,
		category: "Special",
		name: "Weather Ball",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, bullet: 1},
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
			case 'hail':
			case 'snow':
				move.type = 'Ice';
				break;
			case 'acidicrain':
				move.type = 'Poison';
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
			case 'hail':
			case 'snow':
				move.basePower *= 2;
				break;
			case 'acidicrain':
				move.basePower *= 2;
				break;
			}
			this.debug('BP: ' + move.basePower);
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		zMove: {basePower: 160},
		maxMove: {basePower: 130},
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
