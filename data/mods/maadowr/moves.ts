export const Moves: { [moveid: string]: ModdedMoveData } = {
	aloevera: {
		num: -1,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		shortDesc: "All grounded Grass Pokémon on the field have their Atk and SpA raised by 1 stage.",
		name: "Aloe Vera",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onAfterHit(target, source, move) {
			const targets = [];
			for (const side of this.sides) {
				for (const pokemon of side.active) {
					if (pokemon && !pokemon.fainted && pokemon.hasType('Grass') && pokemon.isGrounded()) {
						targets.push(pokemon);
					}
				}
			}
			if (!targets.length) return false;
	
			for (const pokemon of targets) {
				this.boost({atk: 1, spa: 1}, pokemon, source, move);
				this.add('-message', `${pokemon.name}'s Attack and Special Attack were boosted by Aloe Vera!`);
			}
		},
		secondary: null,
		target: "normal",
		type: "Grass",
		contestType: "Beautiful",
	},	
  // end

  // start
  clivejump: {
		num: -2,
		accuracy: 95,
		basePower: 85,
		category: "Physical",
	   	shortDesc: "Lowers target's Def by 1 stage, 2 in Tailwind.",
		name: "Clive Jump",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 100,
			onHit(target, source) {
			  // Check if Tailwind is active on the user's side
			  if (source.side.sideConditions['tailwind']) {
				this.boost({def: -2}, target);
			  } else {
				this.boost({def: -1}, target);
			  }
			},
		  },
	 target: "normal",
	 type: "Rock",
    contestType: "Cool",
	},
  // end

  // start
  coldrush: {
	num: -3,
	accuracy: 100,
	basePower: 100,
	category: "Physical",
	shortDesc: "This move hits in two turns and sets Snow.",
	name: "Cold Rush",
	pp: 10,
	priority: 0,
	flags: {allyanim: 1, metronome: 1, futuremove: 1},
	ignoreImmunity: true,
	onTryMove() {
		this.attrLastMove('[still]');
		return true;
	},
	onTry(source, target) {
		this.add('-anim', source, 'Future Sight', target);
		if (!target.side.addSlotCondition(target, 'futuremove')) return false;
		Object.assign(target.side.slotConditions[target.position]['futuremove'], {
			duration: 3,
			move: 'coldrush',
			source: source,
			moveData: {
				id: 'coldrush',
				name: "Cold Rush",
				accuracy: 100,
				basePower: 100,
				category: "Physical",
				priority: 0,
				flags: {allyanim: 1, metronome: 1, futuremove: 1},
				ignoreImmunity: false,
				onAfterMoveSecondary(this: Battle) {
					this.field.setWeather('snow');
				},
				onPrepareHit(this: Battle, target: Pokemon, source: Pokemon) {
					this.add('-anim', source, 'Doom Desire', target);
				},
				effectType: 'Move',
				type: 'Ice',
			},
		});
		this.add('-start', source, 'move: Cold Rush');
		return this.NOT_FAIL;
	},
	secondary: null,
	target: "normal",
	type: "Ice",
	contestType: "Cool",
},
  // end

  // start
  colourmegone: {
    num: -4,
    accuracy: 100,
    basePower: 60,
    category: "Physical",
    shortDesc: "User's primary type changes to an ally's primary type before attacking.",
    name: "Colour Me Gone",
    pp: 10,
    priority: 1,
    flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
    
    onModifyType(move, pokemon, target) {
        let newType = null;
        
        // Find an ally with a different primary type
        for (const ally of pokemon.side.active) {
            if (ally && !ally.fainted && ally !== pokemon) {
                if (ally.types[0] !== pokemon.types[0] && ally.types[0] !== pokemon.types[1]) {
                    newType = ally.types[0];
                    break;
                }
            }
        }

        // If a new type is found, change the user's primary type and the move's type
        if (newType) {
            pokemon.setType(newType);
            this.add('-start', pokemon, 'typechange', newType);
            move.type = newType;

		}
		
		// Set the move's type to match the user's current primary type
        move.type = pokemon.types[0];
    },
    
    onTryMove(pokemon, target, move) {
        this.attrLastMove('[still]');
    },
    
    onHit(target, source, move) {
        // The actual damage-dealing part of the move
        // This will run after the type change
    },

    target: "normal",
    type: "Normal",
    contestType: "Cool",
},
	  
  // end

  // start
  cuttingedge: {
		num: -5,
		accuracy: 100,
		basePower: 85,
		category: "Physical",
	   shortDesc: "This move does 50% more damage in Grassy Terrain.",
		name: "Cutting Edge",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, slicing: 1},
		secondary: null,
		onBasePower(basePower, source) {
			if (this.field.isTerrain('grassyterrain')) {
				this.debug('cuttingedge grassy terrain boost');
				return this.chainModify(1.5);
			}
		},
		target: "normal",
		type: "Ground",
	   contestType: "Cool",
	},
	// end

	// start
   dispersion: {
		num: -6,
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
	// end

	// start
	enragedassault: {
		num: -7,
		accuracy: 100,
		basePower: 50,
		basePowerCallback(pokemon) {
			return Math.min(350, 50 + 50 * pokemon.timesAttacked);
		},
		category: "Physical",
		shortDesc: "Works like Rage Fist but isn't a punch move.",
		name: "Enraged Assault",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Bug",
		contestType: "Cool",
	},
	// end

	// start
	entanglement: {
		num: -8,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		shortDesc: "Sets Sticky Web in Electric Terrain.",
		name: "Entanglement",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onAfterHit(target, source, move) {
			if (!move.hasSheerForce && source.hp && (this.field.isTerrain('electricterrain'))) {
				for (const side of source.side.foeSidesWithConditions()) {
					side.addSideCondition('stickyweb');
				}
			}
		},
		onAfterSubDamage(damage, target, source, move) {
			if (!move.hasSheerForce && source.hp && (this.field.isTerrain('electricterrain'))) {
				for (const side of source.side.foeSidesWithConditions()) {
					side.addSideCondition('stickyweb');
				}
			}
		},
		secondary: {}, // Sheer Force-boosted
		target: "normal",
		type: "Bug",
		contestType: "Cool",
	},
	// end

	// start
	enzymaticbite: {
		num: -9,
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		shortDesc: "Recovers half of the damage done to the target, 3/4 in Psychic Terrain.",
		name: "Enzymatic Bite",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, heal: 1, metronome: 1, bite: 1},
		drain: [1, 2],
		onModifyMove(move, source, target) {
			if (this.field.isTerrain('psychicterrain')) move.drain = [3, 4];
		},
		secondary: null,
		target: "normal",
		type: "Poison",
		contestType: "Clever",
	},
	// end

	// start
	frostbite: {
		num: -10,
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		shortDesc: "Causes 1/8 residual damage to the target every turn.",
		name: "Frost Bite",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, bite: 1},
		condition: {
			noCopy: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Frost Bite');
			},
			onResidualOrder: 13,
			onResidual(pokemon) {
				this.damage(pokemon.baseMaxhp / 8);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Frost Bite');
			},
		},
		secondary: {
			chance: 100,
			volatileStatus: 'frostbite',
		},
		target: "normal",
		type: "Ice",
		contestType: "Tough",
	},
	// end

	// start: yet to consider Instruct due to list
	gigavolt: {
		num: -11,
		accuracy: 100,
		basePower: 140,
		category: "Physical",
		shortDesc: "Causes paralysis if user gets interrupted.",
		name: "Giga Volt",
		pp: 5,
		priority: -3,
		flags: {contact: 1, protect: 1, failmefirst: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failinstruct: 1},
		priorityChargeCallback(pokemon) {
			pokemon.addVolatile('gigavolt');
		},
		beforeMoveCallback(pokemon) {
			if (pokemon.volatiles['gigavolt']?.lostFocus) {
				this.add('cant', pokemon, 'Giga Volt', 'Giga Volt');
				return true;
			}
		},
		condition: {
			duration: 1,
			onStart(pokemon) {
				this.add('-singleturn', pokemon, 'move: Giga Volt');
			},
			onHit(pokemon, source, move) {
				if (move.category !== 'Status') {
						this.effectState.lostFocus = true;
						if (!source.hasType('Ground')) {  
							source.trySetStatus('par', pokemon);
					}
				}
			},
			onTryAddVolatile(status, pokemon) {
				if (status.id === 'flinch') return null;
			},
		},
		secondary: null,
		target: "normal",
		type: "Electric",
		contestType: "Tough",
	},
	// end

	// start
	golddigger: {
		num: -12,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		shortDesc: "Removes target's Steel-type.",
		name: "Golddigger",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		onHit(target, source, move) {
			if (target.hasType('Steel')) {
				target.setType(target.getTypes(true).map(type => type === "Steel" ? "???" : type));
				// Make the Steel-type removal visual
				this.add('-start', target, 'typechange', target.types.join('/'), '[from] move: Golddigger');
			}
		},
		secondary: null,
		target: "normal",
		type: "Dragon",
		contestType: "Clever",
	},
	// end

	// start
	honeydew: {
		num: -13,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "User and ally recover 25% of their HP. If they're Bug-type and got healed, they also have their offensive stats increased.",
		name: "Honey Dew",
		pp: 5,
		priority: 0,
		flags: {snatch: 1, heal: 1, bypasssub: 1, metronome: 1},
		onHit(pokemon) {
			// Attempt to heal the Pokémon and store whether healing was successful
			const healedAmount = this.heal(this.modify(pokemon.maxhp, 0.25));
			const success = typeof healedAmount === 'number' && healedAmount > 0;
			// If the Pokémon is Bug-type and was healed, boost its offensive stats
			if (pokemon.hasType('Bug') && success) {
				this.boost({atk: 1, spa: 1}, pokemon, pokemon);
			}
		},
		secondary: null,
		target: "allies",
		type: "Bug",
		contestType: "Cool",
	},
   // end

	// start
	icechain: {
		num: -14,
		accuracy: 90,
		basePower: 80,
		category: "Special",
		shortDesc: "Traps target for 4-5 turns and causes 1/8 residual damage.",
		name: "Ice Chain",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		volatileStatus: 'partiallytrapped',
		secondary: null,
		target: "normal",
		type: "Ice",
		contestType: "Tough",
	},
	// end

	// start
	hasamiwaza: {
		num: -15,
		accuracy: 100,
		basePower: 140,
		category: "Physical",
		shortDesc: "Causes Intimidate if user gets interrupted.",
		name: "Hasami-waza",
		pp: 5,
		priority: -3,
		flags: {contact: 1, protect: 1, failmefirst: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failinstruct: 1},
		priorityChargeCallback(pokemon) {
			pokemon.addVolatile('hasamiwaza');
		},
		beforeMoveCallback(pokemon) {
			if (pokemon.volatiles['hasamiwaza']?.lostFocus) {
				this.add('cant', pokemon, 'Hasami-waza', 'Hasami-waza');
				return true;
			}
		},
		condition: {
			duration: 1,
			onStart(pokemon) {
				this.add('-singleturn', pokemon, 'move: Hasami-waza');
			},
			onHit(pokemon, source, move) {
				for (const target of pokemon.adjacentFoes()) {
					if (move.category !== 'Status') {
						this.effectState.lostFocus = true && this.boost({atk: -1}, target, pokemon);
					}
				}
			},
			onTryAddVolatile(status, pokemon) {
				if (status.id === 'flinch') return null;
			},
		},
		secondary: null,
		target: "normal",
		type: "Bug",
		contestType: "Tough",
	},
	// end

	// start
	lightningswing: {
		num: -16,
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		shortDesc: "Recovers 1/2 of the damage dealt to the target(s).",
		name: "Lightning Swing",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, heal: 1, metronome: 1},
		drain: [1, 2],
		secondary: null,
		target: "allAdjacent",
		type: "Electric",
		contestType: "Tough",
	},
	// end

	// start
	lunardust: {
		num: -17,
		accuracy: 90,
		basePower: 120,
		category: "Physical",
		shortDesc: "Clears terrain and can't be used twice.",
		name: "Lunar Dust",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, cantusetwice: 1},
		onAfterHit(target, source) {
			if (source.hp) {
				this.field.clearTerrain();
			}
		},
		onAfterSubDamage(damage, target, source) {
			if (source.hp) {
				this.field.clearTerrain();
			}
		},
		secondary: null,
		target: "normal",
		type: "Rock",
		contestType: "Tough",
	},
	// end

	// start
	lunarstorm: {
		num: -18,
		accuracy: 90,
		basePower: 120,
		category: "Special",
		shortDesc: "Heals and recharges afterwards.",
		name: "Lunar Storm",
		pp: 5,
		priority: 0,
		flags: {recharge: 1, protect: 1, mirror: 1, heal: 1, metronome: 1},
		drain: [1, 2],
		self: {
			volatileStatus: 'mustrecharge',
		},
		secondary: null,
		target: "normal",
		type: "Rock",
		contestType: "Beautiful",
	},
	// end

   // start
	motioncap: {
		num: -19,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		shortDesc: "Spectral Thief clone.",
		name: "Motion Cap",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, bypasssub: 1},
		stealsBoosts: true,
		// Boost stealing implemented in scripts.js
		secondary: null,
		target: "normal",
		type: "Fairy",
		contestType: "Beautiful",
	},
	// end

	// start
	recalibration: {
		num: -20,
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
	// end

	// start
	sandpit: {
		num: -21,
		accuracy: 90,
		basePower: 85,
		category: "Physical",
		shortDesc: "Traps target for 4-5 turns and lowers its Spe by 1 stage.",
		name: "Sand Pit",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onTryImmunity(target) {
			return this.dex.getImmunity('trapped', target);
		},
		volatileStatus: 'sandpit',
		condition: {
			onStart(pokemon, source) {
				this.add('-start', pokemon, 'move: Sandpit', '[of] ' + source);
			},
			onResidualOrder: 14,
			onResidual(pokemon) {
				const source = this.effectState.source;
				if (source && (!source.isActive || source.hp <= 0 || !source.activeTurns)) {
					delete pokemon.volatiles['sandpit'];
					this.add('-end', pokemon, 'Sandpit', '[partiallytrapped]', '[silent]');
					return;
				}
				this.boost({spe: -1}, pokemon, source, this.dex.getActiveMove('sandpit'));
			},
			onTrapPokemon(pokemon) {
				if (this.effectState.source && this.effectState.source.isActive) pokemon.tryTrap();
			},
		},
		secondary: null,
		target: "normal",
		type: "Ground",
		contestType: "Tough",
	},
	// end

	// start
	sensorycues: {
		num: -22,
		accuracy: 100,
		basePower: 50,
		basePowerCallback(pokemon, target) {
			// Calculate the number of negative stat boosts on the target
			let negativeBoosts = 0;
			const boostKeys: Array<keyof BoostsTable> = ['atk', 'def', 'spa', 'spd', 'spe', 'accuracy', 'evasion']; // Define the valid keys
	
			for (const stat of boostKeys) {
				if (target.boosts[stat] < 0) {
					negativeBoosts += Math.abs(target.boosts[stat]); // Count the absolute value of negative boosts
				}
			}
	
			// Calculate power based on the number of negative boosts
			let power = 50 + 50 * negativeBoosts;
			if (power > 2150) power = 2150; // Cap the power at 2150
			this.debug('BP: ' + power);
			return power;
		},
		category: "Special",
		shortDesc: "Gets more powerful the more negative stat drops the target has.",
		name: "Sensory Cues",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		secondary: null,
		target: "normal",
		type: "Bug",
		contestType: "Clever",
	},
	// end

	// start
	shortcircuit: {
		num: -23,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		shortDesc: "Recovers half of the damage done to the target, burns in Acidic Terrain.",
		name: "Short Circuit",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, heal: 1, metronome: 1, bite: 1},
		drain: [1, 2],
		secondary: {chance: 100,
			onHit(target, source, move) {
				if (target.hasAbility('shielddust') || target.hasItem('covertcloak')) return;
				if (this.field.isTerrain('acidicterrain')) {
				target.trySetStatus('brn', source, move);
				}
			},
		},
		target: "normal",
		type: "Electric",
		contestType: "Clever",
	},
	// end

	// start
	soothingsong: {
		num: -24,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		shortDesc: "Inflicts target with a Torment effect.",
		name: "Soothing Song",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, bypasssub: 1, metronome: 1},
		onHit(target, source) {
			// Check if the target has the Soundproof ability
			if (target.hasAbility('soundproof')) {
				this.add('-immune', target, '[from] ability: Soundproof');
				return null; // Prevent the Torment effect
			}
	
			// Apply the Torment effect if the target does not have Soundproof
			target.addVolatile('torment');
		},
//		volatileStatus: 'torment',
		secondary: null,
		target: "normal",
		type: "Grass",
		contestType: "Beautiful",
	},
	// end

	// start
	subdued: {
		num: -25,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		shortDesc: "Inflicts target with a torment effect.",
		name: "Subdued",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		volatileStatus: 'torment',
		secondary: null,
		target: "normal",
		type: "Bug",
		contestType: "Clever",
	},
	// end

	// start
	sunbathing: {
		num: -26,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "User and ally recover 25% of their HP and no longer have negative stat boosts.",
		name: "Sun Bathing",
		pp: 5,
		priority: 0,
		flags: {snatch: 1, heal: 1, bypasssub: 1, metronome: 1},
		onHit(target) {
			let boosts: BoostsTable = target.boosts;
		
			// Check if the target's HP is not full before healing
			if (target.hp < target.maxhp) {
				// Calculate the heal amount (25% of max HP)
				const healAmount = target.maxhp / 4;
				target.heal(healAmount);
				this.add('-heal', target, target.getHealth, healAmount);
			}
		
			// Clear negative stat boosts after healing
			for (const stat in boosts) {
				if (boosts[stat as keyof BoostsTable] < 0) {
					boosts[stat as keyof BoostsTable] = 0;
				}
			}
				if (Object.values(boosts).every(value => value === 0)) {
					target.clearBoosts();
			    	this.add('-clearboost', target);
				}
				return true;
		},
		secondary: null,
		target: "allies",
		type: "Fire",
		contestType: "Beautiful",
	},
	// end

	// start
	terraform: {
		num: -27,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		shortDesc: "All grounded Ground Pokémon on the field have their Def and SpD raised by 1 stage.",
		name: "Terraform",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onAfterHit(target, source, move) {
			const targets = [];
			for (const side of this.sides) {
				for (const pokemon of side.active) {
					if (pokemon && !pokemon.fainted && pokemon.hasType('Ground') && pokemon.isGrounded()) {
						targets.push(pokemon);
					}
				}
			}
			if (!targets.length) return false;
	
			for (const pokemon of targets) {
				this.boost({def: 1, spd: 1}, pokemon, source, move);
				this.add('-message', `${pokemon.name}'s Defense and Special Defense were boosted by Terraform!`);
			}
		},
		secondary: null,
		target: "normal",
		type: "Ground",
		contestType: "Tough",
	},
	
	// end

	// start
	thunderousroar: {
		num: -28,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Sets Electric Terrain and switches out.",
		name: "Thunderous Roar",
		pp: 10,
		priority: 0,
		flags: {sound: 1},
		// TODO show prepare message before the "POKEMON used MOVE!" message
		// This happens even before sleep shows its "POKEMON is fast asleep." message
		terrain: 'electricterrain',
		selfSwitch: true,
		secondary: null,
		target: "all",
		type: "Electric",
	},
	// end

	// start
	timecompressor: {
		num: -29,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Sets Trick Room two turns later.",
		name: "Time Compressor",
		pp: 5,
		priority: 0,
		flags: {metronome: 1, futuremove: 1},
		onTry(source: Pokemon) {
			if (!source.side.addSlotCondition(source, 'futuremove')) return false;
			Object.assign(source.side.slotConditions[source.position]['futuremove'], {
				duration: 3,
				move: 'timecompressor',
				source: source,
				moveData: {
					id: 'timecompressor',
					name: "Time Compressor",
					accuracy: true,
					basePower: 0,
					category: "Status",
					priority: 0,
					flags: {metronome: 1, futuremove: 1},
					onHit(this: Battle, target: Pokemon, source: Pokemon, move: ActiveMove) {
						this.field.addPseudoWeather('trickroom', source, move);
					},
					effectType: 'Move',
					type: 'Rock',
				},
			});
			this.add('-start', source, 'move: Time Compressor');
			return true;
		},
		secondary: null,
		target: "all",
		type: "Rock",
		contestType: "Clever",
	},
	// end

	// start
	voltomator: {
		num: -30,
		accuracy: 100,
		basePower: 20,
		basePowerCallback(pokemon, target, move) {
			const bp = move.basePower + 20 * pokemon.positiveBoosts();
			this.debug('BP: ' + bp);
			return bp;
		},
		category: "Physical",
		shortDesc: "Power Trip clone.",
		name: "Voltomator",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		secondary: null,
		target: "normal",
		type: "Electric",
		contestType: "Clever",
	},
	// end

	// start
//	wondergleam: {
//		num: -31,
//		accuracy: 100,
//		basePower: 70,
//		category: "Special",
//		shortDesc: "Damage dependent on reverted type chart effectiveness in Psychic terrain.",
//		name: "Wonder Gleam",
//		pp: 10,
//		priority: 0,
//		flags: {protect: 1, mirror: 1, metronome: 1},
//		onEffectiveness(typeMod, target, type) {
//			if (type === {'Psychic', 'Steel', 'Dark'}) return 1;
//		},
//		secondary: null,
//		target: "normal",
//		type: "Psychic",
//		contestType: "Clever",
//	},
	// end

   // start
   acidicterrain: {
		num: -32,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Sets terrain that boosts Poison moves and makes grounded Steel Pkm susceptible to offensive Poison moves.",
		name: "Acidic Terrain",
		pp: 10,
		priority: 0,
		flags: {nonsky: 1, metronome: 1},
		terrain: 'acidicterrain',
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			onBasePowerPriority: 6,
			onBasePower(basePower, attacker, defender, move) {
				if (move.type === 'Poison' && attacker.isGrounded() && !attacker.isSemiInvulnerable()) {
					this.debug('acidic terrain boost');
					return this.chainModify([5325, 4096]);
				}
			},
			onModifyMovePriority: -5,
			onModifyMove(move, source, target) {
				if (!move.ignoreImmunity) move.ignoreImmunity = {};
				if (move.ignoreImmunity !== true) {
					move.ignoreImmunity['Poison'] = true;
				}
			},
			onTryHit(target, source, move) {
				if (move.type === 'Poison') {
					if ((!target.isGrounded() || target.isSemiInvulnerable()) && !this.dex.getImmunity('Poison', target)) {
						this.add('-immune', target);
						this.hint(`Only targets that are affected by terrain lose their immunity to Poison.`);
						return null;
					}
				}
			},
			onFieldStart(field, source, effect) {
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Acidic Terrain', '[from] ability: ' + effect.name, '[of] ' + source);
					this.add('-message', "Poison-type moves used by grounded Pokémon will have their power increased.");
					this.add('-message', "Grounded Steel-type Pokémon will also lose their immunity to Poison-type moves.");
				} else {
					this.add('-fieldstart', 'move: Acidic Terrain');
				}
			},
			onFieldResidualOrder: 27,
			onFieldResidualSubOrder: 7,
			onFieldEnd() {
				this.add('-fieldend', 'move: Acidic Terrain');
			},
 		},
		secondary: null,
		target: "all",
		type: "Poison",
		contestType: "Clever",
	},
   // end

	// start
	oilspill: {
		num: -33,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		shortDesc: "Dual Poison & Water move that poisons in Acidic terrain.",
		name: "Oil Spill",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onEffectiveness(typeMod, target, type, move) {
			return typeMod + this.dex.getEffectiveness('Water', type);
		},
		secondary: {chance: 100,
			onHit(target, source, move) {
				if (target.hasAbility('shielddust') || target.hasItem('covertcloak')) return;
				if (this.field.isTerrain('acidicterrain')) {
				target.trySetStatus('psn', source);
				}
			},
		},
		target: "allAdjacentFoes",
		type: "Poison",
		contestType: "Tough",
	},
	// end

	// start:
	incandescentflame: {
		num: -34,
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		shortDesc: "Burns and suffers no power loss in Rain.",
		name: "Incandescent Flame",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, defrost: 1, metronome: 1},
		onBasePower(basePower, source) {
			if (['raindance', 'primordialsea'].includes(source.effectiveWeather()) && !source.hasItem('utilityumbrella')) {
				this.debug('rain Incandescent Flame boost');
				return this.chainModify(2);
			}
		},
		secondary: {chance: 100,
			onHit(target, source, move) {
				if (target.hasAbility('shielddust') || target.hasItem('covertcloak')) return;
				if (['raindance', 'primordialsea'].includes(source.effectiveWeather())) {
				target.trySetStatus('brn', source, move);
				}
			},
		},
		target: "normal",
		type: "Fire",
		contestType: "Beautiful",
	},
	// end

	// start: damage info in conditions.ts
	eyeofthesun: {
		num: -35,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "For 5 turns, Pkm on the user's side take 25% less damage from supereffective moves. If Sun is active, effect extends to 8 turns.",
		name: "Eye of the Sun",
		pp: 5,
		priority: 0,
		flags: {snatch: 1, metronome: 1},
		sideCondition: 'eyeofthesun',
		condition: {
			duration: 5,
			durationCallback(target, source) {
				// Check if the sun is active
				if (['sunnyday', 'desolateland'].includes(source.effectiveWeather())) {
					return 8; // Extend duration to 8 turns if sun is active
				}
				return 5; // Default duration
			},
			onAnyModifyDamage(damage, source, target, move) {
				// Check if the move is super effective
				if (target !== source && this.effectState.target.hasAlly(target)) {
					if (target.getMoveHitData(move).typeMod > 0) {
						this.debug('Eye of the Sun neutralize');
						return this.chainModify(0.75); // Reduce damage by 25%
					}
				}
			},
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Eye of the Sun');
			},
			onSideEnd(side) {
				this.add('-sideend', side, 'move: Eye of the Sun');
				this.add(`The effects of Eye of the Sun have faded!`);
			},
		},
		secondary: null,
		target: "allySide",
		type: "Flying",
		contestType: "Clever",
	},
	// end

	// start
	reboot: {
		num: -38,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Reboot",
		pp: 5,
		priority: -8,
		flags: {heal: 1},
		shortDesc: "Removes effects, heals, and recovers items.",
		onHitField(target, source, move) {
			// Clear all terrain and weather
			this.field.clearTerrain();
			this.field.clearWeather();
			// Clear all pseudoweather effects
			for (const pseudoweather in this.field.pseudoWeather) {
			//	this.add('-end', pseudoweather.charAt(0).toUpperCase() + pseudoweather.slice(1), '[from] move: Reboot');
				delete this.field.pseudoWeather[pseudoweather]; // Remove each pseudoweather effect
			}

			// Clear all side conditions
			for (const side of this.sides) {
				for (const condition in side.sideConditions) {
					side.removeSideCondition(condition);
			//		this.add('-end', condition.charAt(0).toUpperCase() + condition.slice(1), '[from] move: Reboot');
				}
			}
	
			// Re-enter all Pokémon
			for (const pokemon of this.getAllActive()) {
				if (!pokemon.fainted) {
					// Cancel any pending moves or actions
					this.queue.cancelMove(pokemon);
					this.queue.cancelAction(pokemon);
					// Visual effect for re-entering
					this.add('-anim', pokemon, 'Teleport', pokemon);

					// Clear all volatile effects in a general way
					for (const volatile in pokemon.volatiles) {
						delete pokemon.volatiles[volatile]; // Remove each volatile effect
						this.add('-end', pokemon, volatile.charAt(0).toUpperCase() + volatile.slice(1), '[from] move: Reboot');
					}

					pokemon.clearBoosts();
					this.add('-clearboost', pokemon);
	
					// Heal HP, cure status, restore PP
					pokemon.heal(pokemon.maxhp - pokemon.hp);
					pokemon.cureStatus();
					for (const moveSlot of pokemon.moveSlots) {
						if (moveSlot.move !== 'Reboot') {
							moveSlot.pp = moveSlot.maxpp;
						}
					}

					// Recover held item if it had one
					if (pokemon.lastItem) {
						pokemon.setItem(pokemon.lastItem);
						pokemon.lastItem = '';
						this.add('-item', pokemon, pokemon.getItem(), '[from] move: Reboot');
					}

					// Trigger ability as if Pokémon just entered the field
					this.runEvent('SwitchIn', pokemon);

					// New: Reset typing to original type(s)
				//	if (pokemon.getTypes) {
				//		const originalTypes = pokemon.getTypes(); // Assuming this method returns the default types
				//		pokemon.setType(originalTypes); // Reset to original typing
				//		this.add('-start', pokemon, 'typechange', originalTypes.join('/'), '[from] move: Reboot');
				//	}
	
					// New: Reset form for Aegislash and Aegislash-Ma'adowr
				//	if (pokemon.baseSpecies.baseSpecies === 'Aegislash-Blade-Ma\'adowr') {
				//		pokemon.species.id === 'aegislashshieldmaadowr'; // Revert Aegislash to Shield form
				//	}
				//	if (pokemon.baseSpecies.baseSpecies === 'Aegislash-Blade') {
				//		pokemon.species.id === 'aegislashshield'; // Revert Aegislash to Shield form
				//	}

		
					// Reduce Reboot's PP to 0 for non-Porygon-Z-Ma'adowr users
					if (source.baseSpecies.baseSpecies !== 'Porygon-Z-Ma\'adowr') {
						const moveSlot = source.moveSlots.find(move => move.move === 'Reboot');
						if (moveSlot) {
							moveSlot.pp = 0;
						//	this.add('-message', `${source.name}'s Reboot PP has been reduced to 0!`);
						}
					}


					// Trigger switch-in effects
					this.add('-heal', pokemon, pokemon.getHealth, '[silent]');
				//	this.runEvent('SwitchIn', pokemon); // it's somewhere up
					this.runEvent('AfterSwitchIn', pokemon); // Trigger any after-switch-in effects
				}
			}	
			// Special effect for Porygon-Z-Ma'adowr
			if (source.baseSpecies.baseSpecies === 'Porygon-Z-Ma\'adowr') {
				// Swap Attack and Special Attack
				const newatk = source.storedStats.spa;
				const newspa = source.storedStats.atk;
				source.storedStats.atk = newatk;
				source.storedStats.spa = newspa;
	
				// Swap Defense and Special Defense
				const newdef = source.storedStats.spd;
				const newspd = source.storedStats.def;
				source.storedStats.def = newdef;
				source.storedStats.spd = newspd;			
	
				this.add('-message', `${source.name}'s offensive and defensive base stats have been permanently swapped. Unexpectedly!`);
				this.add('-anim', source, 'confuseray', source); // Example animation
			}
			this.add('-message', 'All Pokémon had their stat changes removed and are fully restored!');
		},
		secondary: null,
		target: "all",
		type: "Bug",
		contestType: "Clever",
	},
	// end

	// start
	ascension: {
		num: -36,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "No effect at the moment.",
		name: "Ascension",
		pp: 5,
		priority: 0,
		flags: {snatch: 1, metronome: 1},		
		secondary: null,
		target: "normal",
		type: "Grass",
		contestType: "Beautiful",
	},
	// end

	enhancement: {
		num: -41,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "User and ally recover 25% of their HP. If they're Rock-type, they also have their defensive stats increased.",
		name: "Enhancement",
		pp: 5,
		priority: 0,
		flags: {snatch: 1, heal: 1, bypasssub: 1, metronome: 1},
		onHit(pokemon) {
			// Attempt to heal the Pokémon and store whether healing was successful
			const healedAmount = this.heal(this.modify(pokemon.maxhp, 0.25));
			const success = typeof healedAmount === 'number' && healedAmount > 0;
			// If the Pokémon is Rock-type and was healed, boost its defensive stats
			if (pokemon.hasType('Rock') && success) {
				this.boost({def: 1, spd: 1}, pokemon, pokemon);
			}
		},
		secondary: null,
		target: "allies",
		type: "Rock",
		contestType: "Beautiful",
	},
   // end
   // start
   saute: {
    num: -42,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Saute",
    pp: 5,
    priority: 0,
    flags: {bypasssub: 1, metronome: 1},
    onHitField(target, source, move) {
        const targets: Pokemon[] = [];
        for (const pokemon of this.getAllActive()) {
            // Check if the Pokémon is on the user's side
            if (pokemon.side === source.side) {
                if (this.runEvent('Invulnerability', pokemon, source, move) === false) {
                    this.add('-miss', source, pokemon);
                } else if (this.runEvent('TryHit', pokemon, source, move) && pokemon.getItem().isBerry) {
                    targets.push(pokemon);
                }
            }
        }
        this.add('-fieldactivate', 'move: Saute');
        if (!targets.length) {
            this.add('-fail', source, 'move: Saute');
            this.attrLastMove('[still]');
            return this.NOT_FAIL;
        }
        for (const pokemon of targets) {
            const item = pokemon.getItem();
            if (item.isBerry) {
                // Add volatile if a Pokémon on user's side has one of these berries
                if (['figyberry', 'wikiberry', 'magoberry', 'aguavberry', 'iapapaberry', 'sitrusberry','oranberry', 'leppaberry', 'liechiberry', 'ganlonberry', 'salacberry', 'petayaberry', 'apicotberry', 'starfberry'].includes(item.id)) {
					pokemon.addVolatile('sauteing'); // Add the 'sauteing' volatile status
                    }                
                pokemon.eatItem(true);
            }
        }
    },
    secondary: null,
    target: "all",
    type: "Fire",
},
// end

	// start: This move is only for testing purposes due to Wood Stove
//	frostblast: {
//		num: -38,
//		accuracy: 100, // Accuracy of the move
//		basePower: 50, // Base power of the move
//		category: 'Special', // Category of the move (Physical, Special, or Status)
//		name: "Frost Blast", // Name of the move
//		priority: 0, // Priority of the move
//		pp: 10, // Power Points
//		flags: {protect: 1, mirror: 1, metronome: 1},
//		secondary: {
//			chance: 100,
//			status: 'frz',
//		},
//		target: 'allAdjacent', // This move targets all adjacent opponents
//		type: 'Ice', // Type of the move
//		// Additional properties can be added here
//		shortDesc: "Freezes all adjacent opponents.", // Short description
//		desc: "A chilling blast that may freeze all adjacent opponents.", // Detailed description
//	},
	// end

	// start
	camouflage: {
		inherit: true,
		onHit(target) {
			let newType = 'Normal';
			if (this.field.isTerrain('electricterrain')) {
				newType = 'Electric';
			} else if (this.field.isTerrain('grassyterrain')) {
				newType = 'Grass';
			} else if (this.field.isTerrain('mistyterrain')) {
				newType = 'Fairy';
			} else if (this.field.isTerrain('psychicterrain')) {
				newType = 'Psychic';
			} else if (this.field.isTerrain('acidicterrain')) {
				newType = 'Poison';
			}

			if (target.getTypes().join() === newType || !target.setType(newType)) return false;
			this.add('-start', target, 'typechange', newType);
		},
	},
	naturepower: {
		inherit: true,
		onTryHit(target, pokemon) {
			let move = 'triattack';
			if (this.field.isTerrain('electricterrain')) {
				move = 'thunderbolt';
			} else if (this.field.isTerrain('grassyterrain')) {
				move = 'energyball';
			} else if (this.field.isTerrain('mistyterrain')) {
				move = 'moonblast';
			} else if (this.field.isTerrain('psychicterrain')) {
				move = 'psychic';
			} else if (this.field.isTerrain('acidicterrain')) {
				move = 'sludgebomb';
			}
			this.actions.useMove(move, pokemon, target);
			return null;
		},
	},
	secretpower: {
		inherit: true,
		onModifyMove(move, pokemon) {
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
			} else if (this.field.isTerrain('acidicterrain')) {
				move.secondaries.push({
					chance: 30,
					status: 'psn',
				});
			}
		},
	},
	terrainpulse: {
		num: 805,
		accuracy: 100,
		basePower: 50,
		category: "Special",
		name: "Terrain Pulse",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, pulse: 1},
		onModifyType(move, pokemon) {
			if (!pokemon.isGrounded() || this.field.isTerrain('')) return;
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
			case 'acidicterrain':
				move.type = 'Poison';
				break;	
			}
		},
		onModifyMove(move, pokemon) {
			if (this.field.isTerrain('')) return; // Down-to-Earth
			if (this.field.terrain && pokemon.isGrounded()) {
				move.basePower *= 2;
				this.debug('BP doubled in Terrain');
			}
		},
		secondary: null,
		target: "normal",
		type: "Normal",
	},
	// end

	// start
	waterpulse: {
		inherit: true,
		basePower: 75,
	},
	// end
   // start:
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
	// end
	// start
	hypnosis: {
		num: 95,
		accuracy: 55,
		basePower: 0,
		category: "Status",
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
