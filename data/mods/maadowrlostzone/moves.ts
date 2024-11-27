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
	basePower: 120,
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
				basePower: 120,
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
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		onHit(target, source, move) {
			if (target.hasType('Steel')) {
				target.setType(target.getTypes(true).map(type => type === "Steel" ? "???" : type));
				this.add('-start', target, 'typechange', target.types.join('/'), '[from] move: Golddigger');

				// Apply the Steel Denial volatile only if the target is Aegislash-Ma'adowr to ensure Steel-type is removed even if it changes its form
				if (target.baseSpecies.name === 'Aegislash-Ma\'adowr' && target.species.name !== 'Aegislash-Blade-Ma\'adowr') {
					target.addVolatile('steeldenial');
				}
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
		shortDesc: "User and ally recover 25% of their HP. If they're Bug-type, they also have their offensive stats increased.",
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
		/* onHit(pokemon) {
			const success = !!this.heal(this.modify(pokemon.maxhp, 0.25));
			if (pokemon.hasType('Bug')) {
				this.boost({atk: 1, spa: 1}, pokemon, pokemon) || success;
			}
		}, */ // original code where Bug Pkm would receive the boost regardless of whether their HP was full or not
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
		shortDesc: "Recovers 50% of the damage dealt to the target and needs to recharge afterwards.",
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
		category: "Physical",
		shortDesc: "Steals positive stats.",
		name: "Motion Cap",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, bypasssub: 1},
		stealsBoosts: true,
		// Boost stealing implemented in scripts.js
		secondary: null,
		target: "normal",
		type: "Fighting",
		contestType: "Clever",
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
		target: "allAdjacentFoes",
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
		onHit(pokemon) {
			// Healing for the user
			if (pokemon.hp < pokemon.maxhp) {
				const healAmount = pokemon.maxhp / 4;
				pokemon.heal(healAmount);
				this.add('-heal', pokemon, pokemon.getHealth, healAmount);
			}
		
			// Clear negative stat boosts for the user
			let userBoosts: BoostsTable = pokemon.boosts;
			let clearedUserBoosts = false; // Flag to track if any user boosts were cleared
			for (const stat in userBoosts) {
				if (userBoosts[stat as keyof BoostsTable] < 0) {
					userBoosts[stat as keyof BoostsTable] = 0;
					clearedUserBoosts = true; // Set flag if any boost was reset
				}
			}
			
			// Notify about the clearing of user's negative boosts
			if (clearedUserBoosts) {
				pokemon.clearBoosts();
				this.add('-clearboost', pokemon);
			}
		
			// Access the ally (assuming the ally is the other Pokémon in the same team)
			const ally = pokemon.side.active.find(p => p !== pokemon); // Adjust as needed based on your game's structure
		
			// Clear negative stat boosts for the ally
			if (ally) {
				let allyBoosts: BoostsTable = ally.boosts;
				let clearedAllyBoosts = false; // Flag to track if any ally boosts were cleared
				for (const stat in allyBoosts) {
					if (allyBoosts[stat as keyof BoostsTable] < 0) {
						allyBoosts[stat as keyof BoostsTable] = 0;
						clearedAllyBoosts = true; // Set flag if any boost was reset
					}
				}
				
				// Notify about the clearing of ally's negative boosts
				if (clearedAllyBoosts) {
					ally.clearBoosts();
					this.add('-clearboost', ally);
				}
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
		flags: {metronome: 1},
	//	sideCondition: 'timecrystals',
		onTry(pokemon) {
			if (!pokemon.side.sideConditions['timecrystals']) {
				pokemon.side.addSideCondition('timecrystals');
				this.add('-message', 'Time crystals started to glow.');
				this.add('-anim', pokemon, 'Flash');	
			} else {
				return false; // If Timedistortion is already active, fail the move
			}
		},		
		secondary: null,
		target: "allySide",
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

	//Start
	wondermirror: {
		num: -31,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Changes user's type to the type of the last move it was hit by.",
		name: "Wonder Mirror",
		pp: 10,
		priority: 4,
		stallingMove: true,
		volatileStatus: 'wondermirror',	
		flags: {noassist: 1, failcopycat: 1, failinstruct: 1},
		onPrepareHit(pokemon) {
			return !!this.queue.willAct() && this.runEvent('StallMove', pokemon);
		},
		onHit(pokemon) {
			pokemon.addVolatile('stall');
		},
		condition: {
			duration: 1,
			onStart(target) {
				this.add('-singleturn', target, 'move: Wonder Mirror');
			},
			onTryHitPriority: 3,
			onTryHit(target, source, move) {
				this.add('-activate', target, 'move: Wonder Mirror');
				// Change the user's type to the type of the incoming move
				const newType = move.type;
				target.setType(newType);
				this.add('-start', target, 'typechange', newType);
				return this.NOT_FAIL;
			},
		},
		secondary: null,
		target: "self",
		type: "Psychic",
		contestType: "Beautiful",
	},
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
		// Test: Animation
		onPrepareHit(target, source) {
			// Play the Muddy Water animation (using Surf's animation with a color change)
			this.add('-anim', source, 'Muddy Water', target);	
			// Optionally, play another animation
		//	this.add('-anim', source, 'Toxic', target);
		},
		// test animation
	},
	// end

	// start: damage info in conditions.ts
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
		/*onBasePower(basePower, source) {
			if (['raindance', 'primordialsea'].includes(source.effectiveWeather()) && !source.hasItem('utilityumbrella')) {
				this.debug('rain Incandescent Flame boost');
				return this.chainModify(2);
			}
		},*/
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
		accuracy: 90,
		basePower: 130,
		category: "Special",
		shortDesc: "Skips in Sun and sets Wind Blessing, reducing super-effective damage for the team.",
		name: "Eye of the Sun",
		pp: 5,
		priority: 0,
		flags: {charge: 1, protect: 1, metronome: 1, mirror: 1}, 
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, 'Tailwind'); // originally: move.name instead of 'Tailwind'
			if (!attacker.side.sideConditions['windblessing']) {
				attacker.side.addSideCondition('windblessing');
			}
			if (['sunnyday', 'desolateland'].includes(attacker.effectiveWeather())) {
				this.attrLastMove('[still]');
				this.add('-anim', attacker, 'Oblivion Wing', defender); // originally: this.addMove,  and instead of Oblivion Wing, it was move.name
				return;
			}
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
		secondary: null,
		hasSheerForce: true,
		target: "normal",
		type: "Flying",
		contestType: "Cool",
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
		shortDesc: "Field: Removes effects, heals, and recovers items.",
		onHitField(target, source, move) {
			// Clear all terrain and weather
			this.field.clearTerrain();
			this.field.clearWeather();
			// Clear all pseudoweather effects
			for (const pseudoweather in this.field.pseudoWeather) {
			//	this.add('-end', pseudoweather.charAt(0).toUpperCase() + pseudoweather.slice(1), '[from] move: Reboot');
				this.add('-fieldend', this.dex.conditions.get(pseudoweather).name); // new
				delete this.field.pseudoWeather[pseudoweather]; // Remove each pseudoweather effect
			}

			// Clear all side conditions
			for (const side of this.sides) {
				for (const condition in side.sideConditions) {
					this.add('-sideend', side, this.dex.conditions.get(condition).name); // new: add visual cue for removing side condition
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
				//	this.add('-ability', pokemon, pokemon.ability);
					this.runEvent('SwitchIn', pokemon);
		
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
	
				this.add('-message', `${source.name}'s offensive and defensive base stats have been swapped. Unexpectedly!`);
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

	// start:
	reactivepoison: {
		num: -37,
		accuracy: 100,
		basePower: 50,
		category: "Special",
		name: "Reactive Poison", 
		pp: 20,  
		priority: 0, 
		flags: {protect: 1, mirror: 1, metronome: 1},
		beforeTurnCallback(pokemon) {
			//	console.log(`Reactive Poison beforeTurnCallback - Checking targets for ${pokemon.name}`);
				for (const target of pokemon.side.foe.active) {
					if (target && !target.fainted && (target.status === 'psn' || target.status === 'tox')) {
						target.addVolatile('reactivepoisontarget', pokemon);
			//			console.log(`Reactive Poison - Added 'reactivepoisontarget' volatile to ${target.name}`);
						this.add('-message', `${pokemon.name} is eyeing ${target.name} for a swift strike!`);
					}
				}
			},
		
			onModifyPriority(priority, source, target) {
			//	console.log(`Reactive Poison onModifyPriority - Checking priority for ${source.name} against ${target?.name}`);
				// Check if any opponent has the 'reactivepoisontarget' volatile
				for (const foe of source.side.foe.active) {
					if (foe && foe.volatiles['reactivepoisontarget']) {
			//			console.log(`Reactive Poison - Priority increased to ${priority + 1} against ${foe.name}`);
						return priority + 1;
					}
				}
			//	console.log(`Reactive Poison - Priority unchanged: ${priority}`);
				return priority;
			},
		
			onPrepareHit(target, source, move) {
			//	console.log(`Reactive Poison onPrepareHit - Preparing hit from ${source.name} to ${target.name}`);
				this.attrLastMove('[still]');
				if (target.volatiles['reactivepoisontarget']) {
			//		console.log(`Reactive Poison - Target has 'reactivepoisontarget' volatile, showing Focus Energy animation`);
					this.add('-anim', source, "Focus Energy");
				}
				this.add('-anim', source, "Venoshock", target);
			},
		
			condition: {
				duration: 1,
				onStart(pokemon, source) {
			//		console.log(`Reactive Poison - Volatile 'reactivepoisontarget' started on ${pokemon.name}`);
					this.debug(`Reactive Poison - Volatile 'reactivepoisontarget' started on ${pokemon.name}`);
				},
			//	onEnd(pokemon) {
			//		console.log(`Reactive Poison - Volatile 'reactivepoisontarget' ended on ${pokemon.name}`);
			//	},
		},
		secondary: null,
		target: "normal",
		type: "Poison",
		contestType: "Tough",
	},
	//

	// start
	emi: {
		num: -40,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Protect + Charge if contact.",
		name: "EMI",
		pp: 10,
		priority: 4,
		flags: {noassist: 1, failcopycat: 1},
		stallingMove: true,
		volatileStatus: 'emi',		
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
				if (!move.flags['protect']) {
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
					this.boost({spd: 1}, target);
					if (!target.volatiles['charge']) {
						target.addVolatile('charge');
					}
				}
				return this.NOT_FAIL;
			},
			onHit(target, source, move) {
				if (move.isZOrMaxPowered && this.checkMoveMakesContact(move, source, target)) {
					this.boost({spd: 1}, target);
					if (!target.volatiles['charge']) {
						target.addVolatile('charge');
					}
				}
			},
		},
		secondary: null,
		target: "self",
		type: "Electric",
		contestType: "Clever",
	},
	// end
	// start
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
   // start: yet to implement Lansat Berry
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

	// start
	blockage: {
		num: -43,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "King's Shield with Disable instead.",
		name: "Blockage",
		pp: 10,
		priority: 4,
		flags: {noassist: 1, failcopycat: 1, failinstruct: 1},
		stallingMove: true,
		volatileStatus: 'blockage',
		onPrepareHit(pokemon) {
			return !!this.queue.willAct() && this.runEvent('StallMove', pokemon);
		},
		onHit(pokemon) {
			pokemon.addVolatile('stall');
		},
		condition: {
			duration: 1,
			onStart(target) {
				this.add('-singleturn', target, 'move: Blockage');
			},
			onTryHitPriority: 3,
			onTryHit(target, source, move) {
				if (move.category !== 'Status') {
					this.add('-activate', target, 'move: Blockage');
					// Disable the damaging move
					source.addVolatile('disable');
					return this.NOT_FAIL;
				}
			},
		},
		secondary: null,
		target: "self",
		type: "Rock",
		contestType: "Tough",
	},
	// end

	// start
	pincerattack: {
		num: -44, 
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		shortDesc: "Combo attack: Double damage for second attacker.",
		name: "Pincer Attack",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1},
		onModifyType(move, pokemon) {
			// Change the move type based on the user
			if (pokemon.species.name === 'Escavalier') {
				move.type = 'Bug'; // Change to Bug type if Escavalier is the user
			} else if (pokemon.species.name === 'Grapplin') {
				move.type = 'Fighting'; // Change to Fighting type if Grapplin is the user
			}
		},
		onBasePower(basePower, pokemon) {
			// Check if Grapplin used this move first this turn
			if (this.lastSuccessfulMoveThisTurn === 'pincerattack' && pokemon.species.name === 'Escavalier') {
				this.debug('double power');
				return this.chainModify(2);
			} else if (this.lastSuccessfulMoveThisTurn === 'pincerattack' && pokemon.species.name === 'Grapplin') {
				this.debug('double power');
				return this.chainModify(2);
			}
		},
	//	onModifyMove(move, pokemon) {
	//		if (this.lastSuccessfulMoveThisTurn === 'pincerattack' && pokemon.species.name === 'Grapplin') move.drain = [1, 2];
	//	},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Tough",
	},
	// end

	// start: Exhume from Dark Volatile
	exhume: {
		num: -45,
		accuracy: true,
		basePower: 0,
		category: 'Status',
		shortDesc: "Executes first move of last fainted ally. Best stat boost.",
		name: 'Exhume',
		pp: 8,
		priority: 0,
		flags: {protect: 1, failencore: 1, failmefirst: 1, noassist: 1, failcopycat: 1, failmimic: 1},
		onTryHit(target, source, move) {
			// Find the last fainted Dark-type Pokémon on the user's team
			const faintedDarkTypes = source.side.pokemon.filter(p => p.fainted && p.hasType('Dark'));
			const lastFaintedDark = faintedDarkTypes[faintedDarkTypes.length - 1];
	  
			if (!lastFaintedDark) {
			  this.add('-fail', source, 'move: Exhume');
			  return null;
			}

			// Determine the best stat to boost
			const stats: Array<StatIDExceptHP> = ['atk', 'def', 'spa', 'spd', 'spe']; // List of stats to consider
			let bestStat: StatIDExceptHP = stats[0]; // Initialize with the first stat
			let highestValue = lastFaintedDark.getStat(bestStat); // Get the initial highest value
	
			for (const stat of stats) {
				const currentValue = lastFaintedDark.getStat(stat);
				if (currentValue > highestValue) {
					highestValue = currentValue;
					bestStat = stat; // Update bestStat to the current highest stat
				}
			}
			this.add('-anim', source, 'Moonlight'); // originally: target, after Moonlight
			// Apply +1 to the best stat
			this.boost({[bestStat]: 1}, source);
	  
			// Use the first move of the last fainted Dark-type Pokémon
			const firstMove = lastFaintedDark.moveSlots[0]; // Get the first move slot
	  
			if (!firstMove) {
			  this.add('-fail', source, 'move: Exhume');
			  return null;
			}

			// Use the move as if it were the user's move
			const moveData = this.dex.moves.get(firstMove.id);
			this.add('-message', `${source.name} exhumes ${lastFaintedDark.name}'s ${moveData.name}!`);	


			// Distinguish how to execute the move based on its target type
			switch (moveData.target) {
    			case 'self':
        			this.actions.useMove(moveData.id, source, source); // Affects only the user
       			break;
    			case 'allySide':
        			this.actions.useMove(moveData.id, source, source.side.pokemon[0]); // Affects an ally
        		break;
				case 'allyTeam':
      				// Affects the entire team, e.g., for moves like Aromatherapy
        			this.actions.useMove(moveData.id, source, null); // Null can be used for moves that affect the entire team
        		break;
    			case 'normal':
        			// List available foes
        			const targets = source.side.foe.active.filter(target => target && !target.fainted);
        			if (targets.length > 0) {
            		// Randomly select a foe
            		const randomTarget = targets[Math.floor(Math.random() * targets.length)];
            		this.actions.useMove(moveData.id, source, randomTarget);
        			} else {
           				this.add('-fail', source, 'move: Exhume'); // No available foes
        			}
        		break;
				// case any is important because without it, user will use distance moves against itself
				case 'any':
					const anyTarget = source.side.foe.active.filter(target => target && !target.fainted);
					if (anyTarget.length > 0) {
						const randomTarget = anyTarget[Math.floor(Math.random() * anyTarget.length)];
						this.actions.useMove(moveData.id, source, randomTarget);
					} else {
						this.add('-fail', source, 'move: Exhume');
					}
					break;
				/*case 'allAdjacent':
        			// Affects all adjacent Pokémon (both allies and foes)
        			const adjacentTargets = source.side.active.filter(target => target && !target.fainted);
        			for (const target of adjacentTargets) {
            			this.actions.useMove(moveData.id, source, target);
        			}
        		break;
    			case 'allAdjacentFoes':
        			// Affects all adjacent foes
        			const adjacentFoes = source.side.foe.active.filter(target => target && !target.fainted);
        			for (const target of adjacentFoes) {
            			this.actions.useMove(moveData.id, source, target);
        			}
        		break;
    			case 'all':
        			this.actions.useMove(moveData.id, source, null); // Affects everyone; null can be used for moves that don't require a target
        		break;**/
				default:
       			 	// Default case; use the original target if no specific case matches
        			this.actions.useMove(moveData.id, source, target);
        		break;
			}		
		},
		secondary: null,
		target: 'self',
		type: 'Dark',
		contestType: "Cool",
	},
	// end

	// start:
	superkinesis: {
		num: -46,
		accuracy: 90,
		basePower: 130,
		category: "Special",
		name: "Superkinesis",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		shortDesc: "Lowers user's best stat by 2.",
		onHit(target, source) {
			if (!target) return;
			const bestStat = source.getBestStat(false, true) as keyof BoostsTable;
			const boosts: Partial<BoostsTable> = {};
			boosts[bestStat] = -2;
			this.boost(boosts, source);
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
		contestType: "Clever",
	},
	// end
	reverberation: {
		num: -47,
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
	// end

	// start: For New Project
	paranoia: {
		num: -100,  
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
		/*onHit(target, source) {
			if (!target) return;
	
			// Check for items that prevent stat lowering
			if (target.hasItem(['covertcloak', 'clearamulet'])) return;
	
			// Check for abilities that prevent all stat lowering
			if (target.hasAbility(['clearbody', 'fullmetalbody'])) return;
	
			// Check for Mist side condition
			if (target.side.sideConditions['mist']) return;
	
			// Determine the best stat of the target
			const bestStat = target.getBestStat(false, true) as keyof BoostsTable;
	
			// Check for specific ability immunities
			if ((bestStat === 'atk' && target.hasAbility('hypercutter')) ||
				(bestStat === 'spd' && target.hasAbility('bigpecks'))) {
				return;
			}
	
			// Create boosts object to lower the best stat
			const boosts: Partial<BoostsTable> = {};
			boosts[bestStat] = -1;
			this.boost(boosts, target);
		},*/
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
	pyrethrum: {
		num: -101,
		accuracy: 100,
		basePower: 70,
		category: "Special",
		shortDesc: "Effective against Bug.",
		name: "Pyrethrum",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onEffectiveness(typeMod, target, type) {
			if (type === 'Bug') return 1;
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Seed Flare", target);
		},
		secondary: {
			chance: 10,
			status: 'par',
		},
		target: "normal",
		type: "Grass",
		contestType: "Tough",
	},
	//
	anguishcry: {
		num: -102,
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
	unicorndance: {
		num: -103,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "25% healing for user's side + switches out.",
		name: "Unicorn Dance",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1, sound: 1, bypasssub: 1},
		onPrepareHit(source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Moonlight");
		},
		heal: [1, 4],
		selfSwitch: true,
		secondary: null,
		target: "allies",
		type: "Water",
		contestType: "Cool",
	},
	//
	channeling: {
		num: -104,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		shortDesc: "Psychic Terrain: Psychic or Fighting.",
		name: "Channeling",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, punch: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Focus Energy");
			this.add('-anim', source, "Comet Punch", target);
		},	
		// Modify the move's type based on target's types and conditions
		onModifyType(move, pokemon, target) {

			const hasDark = target.hasType('Dark');
			const hasGhost = target.hasType('Ghost');
			const hasSteel = target.hasType('Steel');
			const hasPsychic = target.hasType('Psychic');
			const hasPoison = target.hasType('Poison');
			const hasFighting = target.hasType('Fighting');
			const hasNormal = target.hasType('Normal');
			const hasRock = target.hasType('Rock');
			const isRingTarget = target.hasItem('ringtarget');
			const hasForesight = target.volatiles['foresight'];
			const hasMiracleEye = target.volatiles['miracleeye'];
			const hasThirdEye = pokemon.volatiles['thirdeyesystem'];

			if (this.field.isTerrain('psychicterrain')) {

				if (hasDark && !hasGhost && !isRingTarget && !hasForesight && !hasMiracleEye && !hasThirdEye) {
					move.type = 'Fighting';
					this.add('-message', `${pokemon.name}'s Channeling switched to Fighting type!`);
				}

				if (hasDark && hasGhost && (isRingTarget || hasForesight || hasMiracleEye || hasThirdEye || pokemon.hasAbility('scrappy'))) {
					move.type = 'Fighting';
					this.add('-message', `${pokemon.name}'s Channeling switched to Fighting type!`);
				}

				if (hasNormal && hasGhost && (isRingTarget || hasForesight || hasMiracleEye || hasThirdEye || pokemon.hasAbility('scrappy'))) {
					move.type = 'Fighting';
					this.add('-message', `${pokemon.name}'s Channeling switched to Fighting type!`);
				}

				if (hasRock && hasGhost && (isRingTarget || hasForesight || hasMiracleEye || hasThirdEye || pokemon.hasAbility('scrappy'))) {
					move.type = 'Fighting';
					this.add('-message', `${pokemon.name}'s Channeling switched to Fighting type!`);
				}

				if (hasPsychic && (target.hasType('Ice') || target.hasType('Rock') || target.hasType('Normal') || target.hasType('Steel'))) {
					move.type = 'Fighting';
					this.add('-message', `${pokemon.name}'s Channeling switched to Fighting type!`);
				}
					
				if (hasSteel && !hasPoison && !hasFighting && !hasGhost) {
					move.type = 'Fighting';
					this.add('-message', `${pokemon.name}'s Channeling switched to Fighting type!`);
				}
				
				if (hasDark && hasPoison && (hasMiracleEye || isRingTarget || hasThirdEye)) {
					move.type = 'Psychic';
				//		this.add('-message', `${pokemon.name}'s Channeling switched to Psychic type!`);
				}

				if (hasDark && hasFighting && (hasMiracleEye || isRingTarget || hasThirdEye)) {
					move.type = 'Psychic';
				//		this.add('-message', `${pokemon.name}'s Channeling switched to Psychic type!`);
				}
			
				if (hasSteel && hasGhost && (hasForesight || isRingTarget || hasThirdEye || pokemon.hasAbility('scrappy'))) {
					move.type = 'Fighting';
					this.add('-message', `${pokemon.name}'s Channeling switched to Fighting type!`);
				}
			}
		},
	//	multihit: 2,
	//	smartTarget: true,
		secondary: null,
		target: "normal",
		type: "Psychic",
		contestType: "Clever",
	},
	//
	devour: {
		num: -105,
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		shortDesc: "Traps user + target; pseudo Leech Seed.",
		name: "Devour",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, bite: 1},
		volatileStatus: 'devour',
		condition: {
			onStart(target) {
				this.add('-start', target, 'move: Devour');
			},
			onResidualOrder: 8,
			onResidual(pokemon) {
				const target = this.getAtSlot(pokemon.volatiles['devour'].sourceSlot);
				if (!target || target.fainted || target.hp <= 0) {
					this.debug('Nothing to devour');
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
			this.add('-message', `${source.name} performed a ritual!`);
			this.add('-anim', source, "Nasty Plot");
			this.add('-anim', source, "Crunch", target);
		},
		onHit(target, source, move) {
			source.addVolatile('trapped', target, move, 'trapper');
			target.addVolatile('trapped', source, move, 'trapper');
		},
		secondary: null,
		target: "normal",
		type: "Dark",
		contestType: "Cool",
	},
	//
	acidicbreath: {
		num: -106,
		accuracy: 100,
		basePower: 120,
		category: "Special",
		shortDesc: "Skips in Acidic Terrain. Burns target.",
		name: "Acidic Breath",
		pp: 5,
		priority: 0,
		flags: {charge: 1, protect: 1, mirror: 1, metronome: 1, nosleeptalk: 1, failinstruct: 1},
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, 'Charge');
			if (this.field.isTerrain('acidicterrain')) {
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
	biterelay: {
		num: -107,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		shortDesc: "Facade + Psycho Shift.",
		name: "Bite Relay",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, bite: 1},
		onBasePower(basePower, pokemon) {
			if (pokemon.status && pokemon.status !== 'slp') {
				return this.chainModify(2);
			}
		},
		onTryHit(target, source, move) {
			move.status = source.status;
		},
		onAfterMoveSecondarySelf(pokemon, target, move) {
			pokemon.cureStatus();
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Psychic Fangs", target);
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
		contestType: "Clever",
	},
	cosmicripples: {
		num: -108,
		accuracy: 90,
		basePower: 50,
		basePowerCallback(pokemon) {
			return Math.min(200, 50 + 50 * pokemon.timesAttacked);
		},
		category: "Special",
		shortDesc: "+50 per hit; spread; -4 prio.",
		name: "Cosmic Ripples",
		pp: 5,
		priority: -4,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Flash", target);
			this.add('-anim', source, "Mind Blown", target);
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Fighting",
	},
	crossbeam: {
		num: -109,
		accuracy: 80,
		basePower: 100,
		category: "Physical",
		shortDesc: "+1 crit ratio.",
		name: "Cross Beam",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Bolt Strike", target);
		},
		critRatio: 2,
		secondary: null,
		target: "normal",
		type: "Electric",
		contestType: "Cool",
	},
	// code from Multiverse but modified for this project
	darkmatter: {
		num: -110,
		accuracy: 100,
		basePower: 80,
		basePowerCallback(pokemon, target, move) {
			const yourSide = pokemon.side;
			const targetSide = target.side;
			let allLayers = 0;
			if (yourSide.getSideCondition('stealthrock')) allLayers++;
			if (yourSide.getSideCondition('stickyweb')) allLayers++;
			if (yourSide.sideConditions['spikes']) {
				allLayers += yourSide.sideConditions['spikes'].layers;
			}
			if (yourSide.sideConditions['toxicspikes']) {
				allLayers += yourSide.sideConditions['toxicspikes'].layers;
			}
			if (targetSide.getSideCondition('stealthrock')) allLayers++;
			if (targetSide.getSideCondition('stickyweb')) allLayers++;
			if (targetSide.sideConditions['spikes']) {
				allLayers += targetSide.sideConditions['spikes'].layers;
			}
			if (targetSide.sideConditions['toxicspikes']) {
				allLayers += targetSide.sideConditions['toxicspikes'].layers;
			}
			this.debug('Dark Matter damage boost');
			return Math.min(400, 80 + 20 * allLayers);
		},
		category: "Special",
		shortDesc: "+20 for each hazard on the field.",
		name: "Dark Matter",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Seismic Toss", target);
		},
		onHit(target, source, move) {
			const yourSide = source.side;
			const targetSide = target.side;
			let allLayers = 0;
			if (yourSide.getSideCondition('stealthrock')) allLayers++;
			if (yourSide.getSideCondition('stickyweb')) allLayers++;
			if (yourSide.sideConditions['spikes']) {
				allLayers += yourSide.sideConditions['spikes'].layers;
			}
			if (yourSide.sideConditions['toxicspikes']) {
				allLayers += yourSide.sideConditions['toxicspikes'].layers;
			}
			if (targetSide.getSideCondition('stealthrock')) allLayers++;
			if (targetSide.getSideCondition('stickyweb')) allLayers++;
			if (targetSide.sideConditions['spikes']) {
				allLayers += targetSide.sideConditions['spikes'].layers;
			}
			if (targetSide.sideConditions['toxicspikes']) {
				allLayers += targetSide.sideConditions['toxicspikes'].layers;
			}
			const bp = Math.min(400, 80 + 20 * allLayers);
			this.add('-message', `Dark Matter currently has a BP of ${bp}!`);
		},
		secondary: null,
		target: "normal",
		type: "Dark",
		contestType: "Clever",
	},
	divination: {
		num: -111,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Divination",
		pp: 5,
		priority: 0,
		flags: {snatch: 1, metronome: 1},
		sideCondition: 'divination',
		/*onTry(pokemon) {
			if (!pokemon.side.sideConditions['divination']) {
				pokemon.side.addSideCondition('divination');
				this.add('-message', 'The user follows the move patterns.');
				this.add('-anim', pokemon, 'Future Sight');	
			} else {
				return false; // If Divination is already active, fail the move
			}
		},*/
		secondary: null,
		target: "allySide",
		type: "Psychic",
		contestType: "Clever",
		desc: "In two turns, Pokémon on the user's side become unaffected by any move for one turn.",
		shortDesc: "In 2 turns, user'side: move immunity.",
	},
	dragoff: {
		num: -112,
		accuracy: 100,
		basePower: 150,
		category: "Physical",
		shortDesc: "Explosion effect.",
		name: "Drag Off",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, noparentalbond: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-message', `${source.name} prepared to drag off everyone!`);
			this.add('-anim', source, "Focus Energy");
		//	this.add('-anim', source, "Destiny Bond", target);
		},
		selfdestruct: "always",
		secondary: null,
		target: "allAdjacent",
		type: "Ghost",
		contestType: "Tough",
	},
	//
	drainingstab: {
		num: -113,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		shortDesc: "Steals target's ability.",
		name: "Draining Stab",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Poison Jab", target);
		},
		onHit(target, source) {
			// Attempt to suppress the target's ability
			if (!target.getAbility().flags['cantsuppress']) {
				target.addVolatile('gastroacid'); // Suppress target's ability

				// Check if suppression was successful
            	const oldAbility = source.setAbility(target.getAbility());
            	if (oldAbility) {
                	this.add('-ability', source, source.getAbility().name, '[from] move: Draining Stab', '[of] ' + target);
            	}
			}
		},
		secondary: null,
		target: "normal",
		type: "Bug",
		contestType: "Clever",
	},
	//
	duststorm: {
		num: -114,
		accuracy: 80,
		basePower: 95,
		category: "Physical",
		shortDesc: "1/8 chip damage if wind effect.",
		name: "Dust Storm",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, wind: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-message', `${source.name} prepared a dust storm!`);
			this.add('-anim', source, "Focus Energy");
			this.add('-anim', source, "Diamond Storm", target);
		},
		onAfterHit(target, source) {
			if ((target.side.sideConditions['tailwind'] || target.side.sideConditions['windblessing'] || this.field.isWeather('sandstorm')) && !target.side.sideConditions['duststorm']) {
				target.side.addSideCondition('duststorm');
				this.add('-sidestart', target.side, 'move: Dust Storm', '[from] move: Dust Storm');
			}
		},
		target: "allAdjacentFoes",
		type: "Rock",
		contestType: "Tough",
	},
	//
    etherealscales: {
		num: -115,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		shortDesc: "Inflicts targets with Torment.",
		name: "Ethereal Scales",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, powder:1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Moonlight");
			this.add('-anim', source, "Clanging Scales", target);
		},
		onHit(target, source) {
			// Check if the target has the Soundproof ability
			if (target.hasAbility('overcoat') || target.hasItem('safetygoggles') || target.hasType('Grass')) {
				this.add('-immune', target);
				return null; // Prevent the Torment effect
			}	
			// Apply the Torment effect if the target does not have Overcoat or Safety Goggles or is not Grass
			target.addVolatile('torment');
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Ghost",
		contestType: "Beautiful",
	},
	//
	exhumation: {
		num: -116,
		accuracy: true,
		basePower: 0,
		category: 'Status',
		shortDesc: "Executes first move of last fainted Pokémon. Best stat boost.",
		name: 'Exhumation',
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onTryHit(target, source, move) {
			// Find the last fainted Pokémon on the user's team
			const faintedPokemon = source.side.pokemon.filter(p => p.fainted);
			const lastFainted = faintedPokemon[faintedPokemon.length - 1];
	
			if (!lastFainted) {
				this.add('-fail', source, 'move: Exhumation');
				return null;
			}
	
			// Determine the best stat to boost
			const stats: Array<StatIDExceptHP> = ['atk', 'def', 'spa', 'spd', 'spe']; // List of stats to consider
			let bestStat: StatIDExceptHP = stats[0]; // Initialize with the first stat
			let highestValue = lastFainted.getStat(bestStat); // Get the initial highest value
	
			for (const stat of stats) {
				const currentValue = lastFainted.getStat(stat);
				if (currentValue > highestValue) {
					highestValue = currentValue;
					bestStat = stat; // Update bestStat to the current highest stat
				}
			}
			
			this.add('-anim', source, 'Moonlight'); // Animation for the move
			// Apply +1 to the best stat
			this.boost({[bestStat]: 1}, source);
	
			// Use the first move of the last fainted Pokémon
			const firstMove = lastFainted.moveSlots[0]; // Get the first move slot
	
			if (!firstMove) {
				this.add('-fail', source, 'move: Exhumation');
				return null;
			}
	
			// Use the move as if it were the user's move
			const moveData = this.dex.moves.get(firstMove.id);
			this.add('-message', `${source.name} exhumes ${lastFainted.name}'s ${moveData.name}!`);
	
			// Distinguish how to execute the move based on its target type
			switch (moveData.target) {
				case 'self':
					this.actions.useMove(moveData.id, source, source); // Affects only the user
					break;
				case 'allySide':
					this.actions.useMove(moveData.id, source, source.side.pokemon[0]); // Affects an ally
					break;
				case 'allyTeam':
					this.actions.useMove(moveData.id, source, null); // Affects entire team
					break;
				case 'normal':
					const targets = source.side.foe.active.filter(target => target && !target.fainted);
					if (targets.length > 0) {
						const randomTarget = targets[Math.floor(Math.random() * targets.length)];
						this.actions.useMove(moveData.id, source, randomTarget);
					} else {
						this.add('-fail', source, 'move: Exhumation'); // No available foes
					}
					break;
				// case any is important because without it, user will use distance moves against itself
				case 'any':
					const anyTarget = source.side.foe.active.filter(target => target && !target.fainted);
					if (anyTarget.length > 0) {
						const randomTarget = anyTarget[Math.floor(Math.random() * anyTarget.length)];
						this.actions.useMove(moveData.id, source, randomTarget);
					} else {
						this.add('-fail', source, 'move: Exhumation');
					}
					break;	
				// And this might be the reason why sth like Stellar Fission is used twice in some instances...
				/*case 'allAdjacent':
					const adjacentTargets = source.side.active.filter(target => target && !target.fainted);
					for (const target of adjacentTargets) {
						this.actions.useMove(moveData.id, source, target);
					}
					break;*/
				// this might be the reason why sth like Hyper Voice is used twice against foes...
				/*case 'allAdjacentFoes':
					const adjacentFoes = source.side.foe.active.filter(target => target && !target.fainted);
					for (const target of adjacentFoes) {
						this.actions.useMove(moveData.id, source, target);
					}
					break;*/
				/*case 'all':
					this.actions.useMove(moveData.id, source, null); // Affects everyone; null can be used for moves that don't require a target
					break;*/
				default:
					this.actions.useMove(moveData.id, source, target); // Default case; use original target if no specific case matches
					break;
			}
		},
		secondary: null,
		target: 'self',
		type: 'Ghost',
		contestType: "Cool",
	},
	//
	feathershower: {
		num: -117,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "If healed (25%), raises best stat.",
		name: "Feather Shower",
		pp: 5,
		priority: 0,
		flags: {snatch: 1, heal: 1, bypasssub: 1, metronome: 1},
		onHit(target) {
			// Attempt to heal the target and store whether healing was successful
			const healedAmount = this.heal(this.modify(target.maxhp, 0.25));
			const success = typeof healedAmount === 'number' && healedAmount > 0;
	
			// If healing was successful, boost the best stat of the healed target
			if (success) {	
				const bestStat = target.getBestStat(false, true) as keyof BoostsTable;
				const boosts: Partial<BoostsTable> = {};
				boosts[bestStat] = 1;
				this.boost(boosts, target);
			}
		},
		secondary: null,
		target: "allies",
		type: "Ice",
		contestType: "Beautiful",
	},
	//
	momentum: {
		num: -118,
		accuracy: 95,
		basePower: 80,
		category: "Physical",
	    shortDesc: "If first strike, ally afterwards.",
		name: "Momentum",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, slicing: 1},
		onPrepareHit(pokemon, target, move) {
			// Check if the user has any ally
			const hasAlly = target.side.active.some(ally => ally !== target && !ally.fainted);
			if (!hasAlly) return; // Ensure there is at least one ally present

			// Check if the move is not a status move
			if (move.category !== 'Status') {
				// Loop through the action queue
				for (const action of this.queue.list as MoveAction[]) {
					// Check if the action is valid
					if (
						!action.move || !action.pokemon?.isActive ||
						action.pokemon.fainted || action.maxMove || action.zmove
					) {
						continue; // Skip invalid actions
					}
		
					// Check if the action belongs specifically to the ally
					if (action.pokemon.isAlly(target)) {
						this.queue.prioritizeAction(action, move); // Prioritize the action						
						this.add('-waiting', target, action.pokemon); // Notify that user is waiting
						break; // Exit the loop but not the function, meaning ally's move should be able to do damage now
					}
				}
			}
		},
		secondary: null,
		target: "normal",
		type: "Bug",
	    contestType: "Cool",
	},
	//
	fivestarpunch: {
		num: -119,
		accuracy: 90,
		basePower: 30,
		category: "Physical",
		shortDesc: "Hits 5 times. Fail if miss.",
		name: "Five Star Punch",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Flash", target);
			this.add('-anim', source, "Meteor Mash", target);
		},
		critRatio: 2,
		multihit: 5,
		multiaccuracy: true,
		secondary: null,
		target: "normal",
		type: "Electric",
	},
	frostshield: {
		num: -120,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Reduces damage for team + 1/8 contact damage. Effect halfed next turn. Must recharge.",
		name: "Frost Shield",
		pp: 5,
		priority: 3,
		flags: {recharge: 1, snatch: 1, metronome: 1},
		sideCondition: 'frostshield',
		condition: {
			duration: 2,
			onSideStart(side, source) {
				this.add('-sidestart', side, 'move: Frost Shield');
			},
			onDamagingHitOrder: 1,
			onDamagingHit(damage, target, source, move) {
				if (this.checkMoveMakesContact(move, source, target, true)) {
					const damageMultiplier = (this.effectState.duration === 2) ? 8 : 16;
					this.damage(source.baseMaxhp / damageMultiplier, source, target);
				}
			},
			onAnyModifyDamage(damage, source, target, move) {
				if (target !== source && this.effectState.target.hasAlly(target) && (this.getCategory(move) === 'Special' || this.getCategory(move) === 'Physical')) {
					this.debug('Frost Shield weaken');
					return this.chainModify(this.effectState.duration === 2 ? 0.5 : 0.75);
				}
			},
			onSideResidualOrder: 26,
			onSideEnd(side) {
				this.add('-sideend', side, 'move: Frost Shield');
			},
		},
		self: {
			volatileStatus: 'mustrecharge',
		},
		secondary: null,
		target: "allySide",
		type: "Ice",
		contestType: "Tough",
	},
	//
	huntersvolley: {
		num: -121,
		accuracy: 100,
		basePower: 40,
		category: "Physical",
		shortDesc: "Hits twice + 1 crit ratio.",
		name: "Hunter's Volley",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-message', `${source.name} prepared to shoot!`);
			this.add('-anim', source, "Focus Energy");
			this.add('-anim', source, "Thousand Arrows", target);
		},
		critRatio: 2,
		multihit: 2,
		secondary: null,
		target: "normal",
		type: "Bug",
		contestType: "Cool",
	},
	//
	lightningblade: {
		num: -122,
		accuracy: 90,
		basePower: 120,
		category: "Physical",
		shortDesc: "Skips in E-Terrain. +1 SpD.",
		name: "Lightning Blade",
		pp: 5,
		priority: 0,
		flags: {charge: 1, protect: 1, mirror: 1, metronome: 1, slicing: 1},
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, 'Charge');
			this.boost({spd: 1}, attacker, attacker, move);
			if (this.field.isTerrain('electricterrain')) {
				this.attrLastMove('[still]');
				this.addMove('-anim', attacker, 'Bolt Strike', defender);
				return;
			}
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
		secondary: null,
		hasSheerForce: true,
		target: "normal",
		type: "Electric",
	},
	moongraze: {
		num: -123,
		accuracy: 90,
		basePower: 100,
		basePowerCallback(pokemon, target, move) {
			let bp = move.basePower;
			const rolloutData = pokemon.volatiles['moongraze'];
			if (rolloutData?.hitCount) {
				bp *= Math.pow(2, rolloutData.contactHitCount);
			}
			if (rolloutData && pokemon.status !== 'slp') {
				rolloutData.hitCount++;
				rolloutData.contactHitCount++;
				if (rolloutData.hitCount < 3) {
					rolloutData.duration = 2;
				}
			}
			if (pokemon.volatiles['defensecurl']) {
				bp *= 2;
			}
			this.debug("BP: " + bp);
			return bp;
		},
		category: "Physical",
		shortDesc: "Rollout effect.",
		name: "Moon Graze",
		pp: 5,
		priority: 0,
		flags: {contact: 1, mirror: 1, metronome: 1, failinstruct: 1, noparentalbond: 1},
		onModifyMove(move, pokemon, target) {
			if (pokemon.volatiles['moongraze'] || pokemon.status === 'slp' || !target) return;
			pokemon.addVolatile('moongraze');
			// @ts-ignore
			// TS thinks pokemon.volatiles['rollout'] doesn't exist because of the condition on the return above
			// but it does exist now because addVolatile created it
			pokemon.volatiles['moongraze'].targetSlot = move.sourceEffect ? pokemon.lastMoveTargetLoc : pokemon.getLocOf(target);
		},
		onAfterMove(source, target, move) {
			const rolloutData = source.volatiles["moongraze"];
			if (
				rolloutData &&
				rolloutData.hitCount === 3 &&
				rolloutData.contactHitCount < 3
				// this conditions can only be met in gen7 and gen8dlc1
				// see `disguise` and `iceface` abilities in the resp mod folders
			) {
				source.addVolatile("moongrazestorage");
				source.volatiles["moongrazestorage"].contactHitCount =
					rolloutData.contactHitCount;
			}
		},
		condition: {
			duration: 1,
			onLockMove: 'moongraze',
			onStart() {
				this.effectState.hitCount = 0;
				this.effectState.contactHitCount = 0;
			},
			onResidual(target) {
				if (target.lastMove && target.lastMove.id === 'struggle') {
					// don't lock
					delete target.volatiles['moongraze'];
				}
			},
		},
		secondary: null,
		target: "normal",
		type: "Fairy",
		contestType: "Tough",
	},
	plantpathogens: {
		num: -124,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Residual hazard: 1/8 for each stat drop.",
		name: "Plant Pathogens",
		pp: 20,
		priority: 0,
		flags: {reflectable: 1, metronome: 1},
		sideCondition: 'plantpathogens',
		condition: {
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Plant Pathogens');
			},
			onResidualOrder: 10,
			onResidual(pokemon) {
				if (pokemon && pokemon.boosts) {
					// Calculate the number of negative stat boosts on the Pokémon
					let negativeBoosts = 0;
					const boostKeys: Array<keyof BoostsTable> = ['atk', 'def', 'spa', 'spd', 'spe', 'accuracy', 'evasion']; // Define the valid keys
	
					for (const stat of boostKeys) {
						if (pokemon.boosts[stat] < 0) {
							negativeBoosts += Math.abs(pokemon.boosts[stat]); // Count the absolute value of negative boosts
						}
					}
	
					// Apply HP loss for each negative boost
					if (negativeBoosts > 0) {
						const damage = Math.floor((pokemon.maxhp / 8) * negativeBoosts); // Calculate total damage based on negative boosts
						this.damage(damage, pokemon); // Apply damage
						this.add('-message', `${pokemon.name} is affected by Plant Pathogens!`); // originally: this.add('-message', `${pokemon.name} is affected by Plant Pathogens and lost ${damage} HP!`);
					}
				}
			},
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Worry Seed", target);
		},
		secondary: null,
		target: "foeSide",
		type: "Bug",
		contestType: "Clever",
	},
	plaquefang: {
		num: -125,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		shortDesc: "Poisons the target if the user is statused.",
		name: "Plaque Fang",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Poison Fang", target);
		},
		secondary: {
			chance: 100,
			onHit(target, source, move) {
				if (source.status && source.status !== 'slp') {
					target.trySetStatus('psn', source, move);
				}
			},
		},
		target: "normal",
		type: "Poison",
		contestType: "Clever",
	},
	//
	prismbeam: {
		num: -126,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		shortDesc: "Physical or special against target.",
		name: "Prism Beam",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			if (!source.isAlly(target)) {
				this.attrLastMove('[anim] Photon Geyser ' + move.category);
			}
		},
		onModifyMove(move, pokemon, target) {
			if (!target) return;
			const atk = pokemon.getStat('atk', false, true);
			const spa = pokemon.getStat('spa', false, true);
			const def = target.getStat('def', false, true);
			const spd = target.getStat('spd', false, true);
			const physical = Math.floor(Math.floor(Math.floor(Math.floor(2 * pokemon.level / 5 + 2) * 90 * atk) / def) / 50);
			const special = Math.floor(Math.floor(Math.floor(Math.floor(2 * pokemon.level / 5 + 2) * 90 * spa) / spd) / 50);
			if (physical > special || (physical === special && this.random(2) === 0)) {
				move.category = 'Physical';
				move.flags.contact = 1;
			}
		},
		onHit(target, source, move) {
			if (!source.isAlly(target)) this.hint(move.category + " Prism Beam");
		},
		onAfterSubDamage(damage, target, source, move) {
			if (!source.isAlly(target)) this.hint(move.category + " Prism Beam");
		},
		secondary: null,
		target: "normal",
		type: "Fairy",
		contestType: "Beautiful",
	},
	//
	purifyingflame: {
		num: -127,
		accuracy: 100,
		basePower: 50,
		basePowerCallback(pokemon, target) {
			// Calculate the number of negative stat boosts on the user
			let negativeBoosts = 0;
			const boostKeys: Array<keyof BoostsTable> = ['atk', 'def', 'spa', 'spd', 'spe', 'accuracy', 'evasion']; // Define the valid keys
	
			for (const stat of boostKeys) {
				if (pokemon.boosts[stat] < 0) {
					negativeBoosts += Math.abs(pokemon.boosts[stat]); // Count the absolute value of negative boosts
				}
			}
	
			// Calculate power based on the number of negative boosts
			let power = 50 + 50 * negativeBoosts;
			if (power > 2150) power = 2150; // Cap the power at 2150
			this.debug('BP: ' + power);
			return power;
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-message', `${source.name} prepared to unleash its fire!`);
			this.add('-anim', source, "Focus Energy");
			this.add('-anim', source, "Overheat", target);
		},
		category: "Physical",
		shortDesc: "Gets more powerful the more negative stat drops the user has.",
		name: "Purifying Flame",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onAfterMoveSecondarySelf(pokemon) {
			// Clear negative stat boosts for the user
			let userBoosts: BoostsTable = pokemon.boosts;
			let clearedUserBoosts = false; // Flag to track if any user boosts were cleared
			for (const stat in userBoosts) {
				if (userBoosts[stat as keyof BoostsTable] < 0) {
					userBoosts[stat as keyof BoostsTable] = 0;
					clearedUserBoosts = true; // Set flag if any boost was reset
				}
			}
			
			// Notify about the clearing of user's negative boosts
			if (clearedUserBoosts) {
				pokemon.clearBoosts();
				this.add('-clearboost', pokemon);
			}
		},
		secondary: null,
		target: "normal",
		type: "Fire",
		contestType: "Clever",
	},
	//
	rocktumble: {
		num: -128,
		accuracy: 90,
		basePower: 140,
		/*basePowerCallback(pokemon, target, move) {
			const damagedByTarget = pokemon.attackedBy.some(
				p => p.source === target && p.damage > 0 && p.thisTurn
			);
			if (damagedByTarget) {
				this.debug('BP doubled for getting hit by ' + target);
				return move.basePower * 2;
			}
			return move.basePower;
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Avalanche", target);
		},*/
		category: "Physical",
		shortDesc: "If hit, damage opponent's Pokémon.",
		name: "Rock Tumble",
		pp: 5,
		priority: -3,
		flags: {contact: 1, protect: 1, failmefirst: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failinstruct: 1},
		priorityChargeCallback(pokemon) {
			pokemon.addVolatile('rocktumble');
		},
		onTryMove(pokemon) {
			if (!pokemon.volatiles['rocktumble']?.gotHit) {
				this.attrLastMove('[still]');
				this.add('cant', pokemon, 'Rock Tumble', 'Rock Tumble');
				return null;
			}
		},
		condition: {
			duration: 1,
			onStart(pokemon) {
				this.add('-singleturn', pokemon, 'move: Rock Tumble');
			},
			onHit(pokemon, source, move) {
				if (!pokemon.isAlly(source)) {
					this.effectState.gotHit = true;
					const action = this.queue.willMove(pokemon);
					if (action) {
						this.queue.prioritizeAction(action);
					}
				}
			},
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Rock",
		contestType: "Tough",
	},
	//
	sandgeyser: {
		num: -129,
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
	schadenfreude: {
		num: -130,
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
		shortDesc: "+50 more - target's stat drops. Form change.",
		name: "Schadenfreude",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onModifyType(move, pokemon) {
			switch (pokemon.species.name) {
			case 'Grinsegrin':
				move.type = 'Dark';
				break;
			case 'Grinsegrin-Alternate':
				move.type = 'Ghost';
				break;
			}
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-message', `${source.name} prepared to change its form!`);
			this.add('-anim', source, "Nasty Plot");
			this.add('-anim', source, "Scary Face", target);
		},
		onHit(target, pokemon, move) {
			if (pokemon.baseSpecies.baseSpecies === 'Grinsegrin' && !pokemon.transformed) {
				move.willChangeForme = true;
			}
		},
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (move.willChangeForme) {
				const grinsegrinForme = pokemon.species.id === 'grinsegrinalternate' ? '' : '-Alternate';
				pokemon.formeChange('Grinsegrin' + grinsegrinForme, this.effect, false, '[msg]');
				this.add('-start', pokemon, 'typechange', pokemon.getTypes(true).join('/'), '[silent]'); // new line to update type
			}
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Clever",
	},
	//
	seasonalantlers: {
		num: -131,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		shortDesc: "Form: Weather or Tailwind.",
		name: "Seasonal Antlers",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},	
		onModifyType(move, pokemon) {
			switch (pokemon.species.name) {
				case 'Sawsbuck':
				case 'Sawsbuck-Mega':
					move.type = 'Fire'; // Change to Fire type
					break;
				case 'Sawsbuck-Summer':
				case 'Sawsbuck-Summer-Mega':
					move.type = 'Water'; // Change to Water type
					break;
				case 'Sawsbuck-Autumn':
				case 'Sawsbuck-Autumn-Mega':
					move.type = 'Electric'; // Change to Electric type
					break;
				case 'Sawsbuck-Winter':
				case 'Sawsbuck-Winter-Mega':
					move.type = 'Ice'; // Change to Ice type
					break;
			}
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Horn Leech", target);
		},
		onAfterHit(target, source) {
			switch (source.species.name) {
				case 'Sawsbuck':
				case 'Sawsbuck-Mega':
					this.field.setWeather('sunnyday');
					break;
				case 'Sawsbuck-Summer':
				case 'Sawsbuck-Summer-Mega':
					this.field.setWeather('raindance');
					break;
				case 'Sawsbuck-Autumn':
				case 'Sawsbuck-Autumn-Mega':
					source.side.addSideCondition('tailwind');
					break;
				case 'Sawsbuck-Winter':
				case 'Sawsbuck-Winter-Mega':
					this.field.setWeather('snow');
					break;
			}
		},	
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Cool",
	},
	// Sun Graze is untested since I haven't implemented a VGC Restricted format yet.
	sungraze: {
		num: -132,
		accuracy: 90,
		basePower: 100,
		basePowerCallback(pokemon, target, move) {
			let bp = move.basePower;
			const rolloutData = pokemon.volatiles['sungraze'];
			if (rolloutData?.hitCount) {
				bp *= Math.pow(2, rolloutData.contactHitCount);
			}
			if (rolloutData && pokemon.status !== 'slp') {
				rolloutData.hitCount++;
				rolloutData.contactHitCount++;
				if (rolloutData.hitCount < 3) {
					rolloutData.duration = 2;
				}
			}
			if (pokemon.volatiles['defensecurl']) {
				bp *= 2;
			}
			this.debug("BP: " + bp);
			return bp;
		},
		category: "Physical",
		shortDesc: "Rollout effect.",
		name: "Sun Graze",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, failinstruct: 1, noparentalbond: 1},
		onModifyMove(move, pokemon, target) {
			if (pokemon.volatiles['sungraze'] || pokemon.status === 'slp' || !target) return;
			pokemon.addVolatile('sungraze');
			// @ts-ignore
			// TS thinks pokemon.volatiles['rollout'] doesn't exist because of the condition on the return above
			// but it does exist now because addVolatile created it
			pokemon.volatiles['sungraze'].targetSlot = move.sourceEffect ? pokemon.lastMoveTargetLoc : pokemon.getLocOf(target);
		},
		onAfterMove(source, target, move) {
			const rolloutData = source.volatiles["sungraze"];
			if (
				rolloutData &&
				rolloutData.hitCount === 3 &&
				rolloutData.contactHitCount < 3
				// this conditions can only be met in gen7 and gen8dlc1
				// see `disguise` and `iceface` abilities in the resp mod folders
			) {
				source.addVolatile("sungrazestorage");
				source.volatiles["sungrazestorage"].contactHitCount =
					rolloutData.contactHitCount;
			}
		},
		condition: {
			duration: 1,
			onLockMove: 'sungraze',
			onStart() {
				this.effectState.hitCount = 0;
				this.effectState.contactHitCount = 0;
			},
			onResidual(target) {
				if (target.lastMove && target.lastMove.id === 'struggle') {
					// don't lock
					delete target.volatiles['sungraze'];
				}
			},
		},
		secondary: null,
		target: "normal",
		type: "Fire",
		contestType: "Tough",
	},
	tandemshock: {
		num: -133,
		accuracy: 100,
		basePower: 65,
		basePowerCallback(pokemon, target, move) {
			if (target.hurtThisTurn) {
				this.debug('BP doubled on damaged target');
				return move.basePower * 2;
			}
			return move.basePower;
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Charge");
			this.add('-anim', source, "Assurance", target);
		},
		category: "Physical",
		shortDesc: "Assurance effect.",
		name: "Tandem Shock",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		secondary: null,
		target: "normal",
		type: "Electric",
		contestType: "Clever",
	},
	//
	tidalabyss: {
		num: -134,
		accuracy: 85,
		basePower: 100,
		category: "Special",
		shortDesc: "Spread Magma Storm.",
		name: "Tidal Abyss",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		volatileStatus: 'partiallytrapped',
		secondary: null,
		target: "allAdjacentFoes",
		type: "Rock",
		contestType: "Tough",
	},
	jetbite: {
		num: -135,
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		shortDesc: "0.1 prio if target's HP: 50% or below.",
		name: "Jet Bite", 
		pp: 5,  
		priority: 0, 
		flags: {protect: 1, mirror: 1, metronome: 1, bite: 1},
		beforeTurnCallback(pokemon) {
		//	console.log(`Jet Bite beforeTurnCallback - Checking targets for ${pokemon.name}`);
			for (const target of pokemon.side.foe.active) {
				if (target && !target.fainted && target.hp <= target.maxhp / 2) {
					target.addVolatile('jetbitetarget', pokemon);
		//			console.log(`Jet Bite - Added 'jetbitetarget' volatile to ${target.name}`);
					this.add('-message', `${pokemon.name} is eyeing ${target.name} for a swift strike!`);
				}
			}
		},
	
		onModifyPriority(priority, source, target) {
		//	console.log(`Jet Bite onModifyPriority - Checking priority for ${source.name} against ${target?.name}`);
			// Check if any opponent has the 'jetbitetarget' volatile
			for (const foe of source.side.foe.active) {
				if (foe && foe.volatiles['jetbitetarget']) {
		//			console.log(`Jet Bite - Priority increased to ${priority + 0.1} against ${foe.name}`);
					return priority + 0.1;
				}
			}
		//	console.log(`Jet Bite - Priority unchanged: ${priority}`);
			return priority;
		},
	
		onPrepareHit(target, source, move) {
		//	console.log(`Jet Bite onPrepareHit - Preparing hit from ${source.name} to ${target.name}`);
			this.attrLastMove('[still]');
			if (target.volatiles['jetbitetarget']) {
		//		console.log(`Jet Bite - Target has 'jetbitetarget' volatile, showing Focus Energy animation`);
				this.add('-anim', source, "Focus Energy");
			}
			this.add('-anim', source, "Aqua Jet", target);
		},
	
		condition: {
			duration: 1,
			onStart(pokemon, source) {
		//		console.log(`Jet Bite - Volatile 'jetbitetarget' started on ${pokemon.name}`);
				this.debug(`Jet Bite - Volatile 'jetbitetarget' started on ${pokemon.name}`);
			},
		//	onEnd(pokemon) {
		//		console.log(`Jet Bite - Volatile 'jetbitetarget' ended on ${pokemon.name}`);
		//	},
		},
		secondary: null,
		target: "normal",
		type: "Water",
		contestType: "Tough",
	},
	corrosivesilt: {
		num: -136,
		accuracy: 95,
		basePower: 90,
		category: "Physical",
		shortDesc: "Terrain to Acidic; Poison/Ground.",
		name: "Corrosive Silt",
		pp: 10,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onEffectiveness(typeMod, target, type, move) {
			return typeMod + this.dex.getEffectiveness('Ground', type);
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Sludge Wave", target);
		},
		// Change terrain if it matches specific types
		onAfterHit(target, source) {			
			// Check if the current terrain is one of the specified types
			if (['grassyterrain', 'electricterrain', 'mistyterrain', 'psychicterrain'].includes(this.field.terrain)) {
				this.add('-message', `${source.name} transformed the terrain into Acidic Terrain!`);
				this.field.setTerrain('acidicterrain'); // Change to Acidic Terrain
			}
		},
		onAfterSubDamage(damage, target, source) {
			// Check if the current terrain is one of the specified types
			if (['grassyterrain', 'electricterrain', 'mistyterrain', 'psychicterrain'].includes(this.field.terrain)) {
				this.add('-message', `${source.name} transformed the terrain into Acidic Terrain!`);
				this.field.setTerrain('acidicterrain'); // Change to Acidic Terrain
			}
		},
		priority: 0,
		secondary: null,
		target: "normal",
		type: "Poison",
		contestType: "Tough",
	},
	equilibrium: {
		num: -137,
		accuracy: 100,
		basePower: 50,
		category: "Special",
		shortDesc: "Special or physical, opposite in follow-up.",
		name: "Equilibrium",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Focus Energy");
			this.add('-anim', source, "Psycho Boost", target);
		},
		onAfterMoveSecondarySelf(source, target, move) {
			if (move.category === 'Physical') {
				this.boost({atk: -1}, source);
					this.actions.useMove('equilibrium2', source, target);
			} else {
				this.boost({spa: -1}, source);
					this.actions.useMove('equilibrium3', source, target);
			}
		},
		secondary: null,
		target: "normal",
		type: "Dragon",
		contestType: "Cool",
	},
	equilibrium2: {
		num: -1037,
		accuracy: 100,
		basePower: 50,
		category: "Special",
		shortDesc: "Special version.",
		name: "Equilibrium",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Focus Energy");
			this.add('-anim', source, "Psycho Boost", target);
		},
		secondary: null,
		target: "normal",
		type: "Dragon",
		contestType: "Cool",
	},
	equilibrium3: {
		num: -1038,
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		shortDesc: "Physical version.",
		name: "Equilibrium",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Focus Energy");
			this.add('-anim', source, "Psycho Boost", target);
		},
		secondary: null,
		target: "normal",
		type: "Dragon",
		contestType: "Cool",
	},
	stellarfusion: {
		num: -138,
		accuracy: 90,
		basePower: 150,
		category: "Special",
		shortDesc: "Type dependent; hits all others; recharge.",
		name: "Stellar Fusion",
		pp: 5,
		priority: 0,
		flags: {recharge: 1, protect: 1, mirror: 1},
		onModifyType(move, pokemon) {
			let type = pokemon.types[0];
			if (type === "Bird") type = "???";
			move.type = type;
		},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Flash", target);
			this.add('-anim', source, "Mind Blown", target);
		},
		self: {
			volatileStatus: 'mustrecharge',
		},
		secondary: null,
		target: "allAdjacent",
		type: "Normal",
		contestType: "Cool",
	},
	// No Pokémon is able to learn this move. So, it can only be summoned through Divination
	augury: {
		num: -139,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Augury",
		pp: 5,
		priority: 0,
		flags: {failencore: 1, failmefirst: 1, noassist: 1, failcopycat: 1, failmimic: 1},
		sideCondition: 'augury',
		condition: {
			duration: 1,
			onSideStart(side, source) {
				this.add('-sidestart', side, 'Augury');
			},
			onModifyAccuracyPriority: 10,
			onModifyAccuracy(accuracy, target, source, move) {
				this.debug('Augury - setting accuracy to 0');
				return 0;
			},
			onSideResidualOrder: 26,
		//	onSideResidualSubOrder: 5,
			onSideEnd(side) {
				this.add('-sideend', side, 'Augury');
			},
		},
		secondary: null,
		target: "allySide",
		type: "Psychic",
		contestType: "Clever",
		desc: "This turn, Pokémon on user's side become invulnerable to moves, including those from themselves, like Life Dew.",
		shortDesc: "Invulnerable this turn.",
	},
	brainage: {
		num: -140,
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
	cursedwrath: {
		num: -141,
		accuracy: 100,
		basePower: 60,
		basePowerCallback(pokemon, target) {
			// Calculate the number of negative stat boosts on the user
			let negativeBoosts = 0;
			const boostKeys: Array<keyof BoostsTable> = ['atk', 'def', 'spa', 'spd', 'spe', 'accuracy', 'evasion']; // Define the valid keys
	
			for (const stat of boostKeys) {
				if (pokemon.boosts[stat] < 0) {
					negativeBoosts += Math.abs(pokemon.boosts[stat]); // Count the absolute value of negative boosts
				}
			}
	
			// Calculate power based on the number of negative boosts
			let power = 60 + 20 * negativeBoosts;
			if (power > 900) power = 900; // Cap the power at 900
			this.debug('BP: ' + power);
			return power;
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-message', `${source.name} is about to unleash its wrath!`);
			this.add('-anim', source, "Focus Energy");
			this.add('-anim', source, "Outrage", target);
		},
		category: "Physical",
		shortDesc: "More powerful the more negative stat drops the user has.",
		name: "Cursed Wrath",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		secondary: null,
		target: "normal",
		type: "Ghost",
		contestType: "Tough",
	},
	cavein: {
		num: -142,
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		shortDesc: "-1 Spe if interrupted.",
		name: "Cave-in",
		pp: 5,
		priority: -3,
		flags: {protect: 1, failmefirst: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failinstruct: 1},
		priorityChargeCallback(pokemon) {
			pokemon.addVolatile('cavein');
		},
		beforeMoveCallback(pokemon) {
			if (pokemon.volatiles['cavein']?.lostFocus) {
				this.add('cant', pokemon, 'Cave-in', 'Cave-in');
				return true;
			}
		},
		condition: {
			duration: 1,
			onStart(pokemon) {
				this.add('-singleturn', pokemon, 'move: Cave-in');
			},
			onHit(pokemon, source, move) {
				for (const target of pokemon.adjacentFoes()) {
					if (move.category !== 'Status') {
						this.effectState.lostFocus = true && this.boost({spe: -1}, target, pokemon);
					}
				}
			},
			onTryAddVolatile(status, pokemon) {
				if (status.id === 'flinch') return null;
			},
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Ground",
		contestType: "Tough",
	},
	invocation: {
		num: -143,
		accuracy: true,
		basePower: 0,
		category: 'Status',
		shortDesc: "Executes first move of last unfainted Pokémon. Best stat boost.",
		name: 'Invocation',
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onTryHit(target, source, move) {
			// Find the last unfainted Pokémon on the user's team
			const unfaintedPokemon = source.side.pokemon.filter(p => !p.fainted && p !== source); // added p !== source for edge case
			const lastUnfainted = unfaintedPokemon[unfaintedPokemon.length - 1];
	
			if (!lastUnfainted || lastUnfainted === source) {
				this.add('-fail', source, 'move: Invocation');
				return null;
			}
	
			// Determine the best stat to boost
			const stats: Array<StatIDExceptHP> = ['atk', 'def', 'spa', 'spd', 'spe'];
			let bestStat: StatIDExceptHP = stats[0];
			let highestValue = lastUnfainted.getStat(bestStat);
	
			for (const stat of stats) {
				const currentValue = lastUnfainted.getStat(stat);
				if (currentValue > highestValue) {
					highestValue = currentValue;
					bestStat = stat;
				}
			}
			
			this.add('-anim', source, 'Calm Mind'); // Animation for the move
			// Apply +1 to the best stat
			this.boost({[bestStat]: 1}, source);
	
			// Use the first move of the last unfainted Pokémon
			const firstMove = lastUnfainted.moveSlots[0];
	
			if (!firstMove) {
				this.add('-fail', source, 'move: Invocation');
				return null;
			}
	
			// Use the move as if it were the user's move
			const moveData = this.dex.moves.get(firstMove.id);
			this.add('-message', `${source.name} invokes ${lastUnfainted.name}'s ${moveData.name}!`);
	
			// Distinguish how to execute the move based on its target type
			switch (moveData.target) {
				case 'self':
					this.actions.useMove(moveData.id, source, source);
					break;
				case 'allySide':
					this.actions.useMove(moveData.id, source, source.side.pokemon[0]);
					break;
				case 'allyTeam':
					this.actions.useMove(moveData.id, source, null);
					break;
				case 'normal':
					const targets = source.side.foe.active.filter(target => target && !target.fainted);
					if (targets.length > 0) {
						const randomTarget = targets[Math.floor(Math.random() * targets.length)];
						this.actions.useMove(moveData.id, source, randomTarget);
					} else {
						this.add('-fail', source, 'move: Invocation');
					}
					break;
				// case any is important because without it, user will use distance moves against itself
				case 'any':
					const anyTarget = source.side.foe.active.filter(target => target && !target.fainted);
					if (anyTarget.length > 0) {
						const randomTarget = anyTarget[Math.floor(Math.random() * anyTarget.length)];
						this.actions.useMove(moveData.id, source, randomTarget);
					} else {
						this.add('-fail', source, 'move: Invocation');
					}
					break;
				/*case 'allAdjacent':
					const adjacentTargets = source.side.active.filter(target => target && !target.fainted);
					for (const target of adjacentTargets) {
						this.actions.useMove(moveData.id, source, target);
					}
					break;              
				case 'all':
					this.actions.useMove(moveData.id, source, null);
					break;*/
				default:
					this.actions.useMove(moveData.id, source, target);
					break;
			}
		},
		secondary: null,
		target: 'self',
		type: 'Grass',
		contestType: "Clever",
	},
	rampage: {
		num: -144,
		accuracy: 100,
		basePower: 50,
		basePowerCallback(pokemon) {
			return Math.min(350, 50 + 50 * pokemon.timesAttacked);
		},
		category: "Physical",
		shortDesc: "Like Rage Fist but no punch move.",
		name: "Rampage",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-message', `${source.name} is on a rampage!`);
			this.add('-anim', source, "Focus Energy");
			this.add('-anim', source, "Outrage", target);
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Cool",
	},
	//
	passageoftime: {
		num: -145,
		accuracy: 90,
		basePower: 120,
		category: "Physical",
		shortDesc: "User and target recharge.",
		name: "Passage of Time",
		pp: 5,
		priority: 0,
		flags: {recharge: 1, protect: 1, metronome: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-message', `${source.name} is about to distort time!`);
			this.add('-anim', source, "Sandstorm", target);
		},
		self: {
			volatileStatus: 'mustrecharge',
		},
		volatileStatus: 'mustrecharge',
		secondary: null,
		target: "normal",
		type: "Rock",
		contestType: "Cool",
	},
	//
	bridgeassembly: {
		num: -146,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		shortDesc: "Sand: +1 SpD; Sun: +1 Def.",
		name: "Bridge Assembly",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-message', `${source.name} assembles its body!`);
			this.add('-anim', source, "Core Enforcer", target);
		},
		onAfterMove(attacker, defender, move) {
			if (this.field.isWeather('sandstorm')) {
				this.boost({spd: 1}, attacker, attacker, move);
			} else if (this.field.isWeather(['sunnyday', 'desolateland'])) {
				this.boost({def: 1}, attacker, attacker, move);
			}
		},
		secondary: null,
		target: "normal",
		type: "Dragon",
	},
	//
	mindbend: {
		num: -147,
		accuracy: 100,
		basePower: 0,
		basePowerCallback(pokemon) {
			const ratio = Math.max(Math.floor(pokemon.hp * 48 / pokemon.maxhp), 1);
			let bp;
			if (ratio < 2) {
				bp = 200;
			} else if (ratio < 5) {
				bp = 150;
			} else if (ratio < 10) {
				bp = 100;
			} else if (ratio < 17) {
				bp = 80;
			} else if (ratio < 33) {
				bp = 40;
			} else {
				bp = 20;
			}
			this.debug('BP: ' + bp);
			return bp;
		},
		category: "Special",
		shortDesc: "Psychic type Reversal.",
		name: "Mind Bend",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-message', `${source.name} bends reality!`);
			this.add('-anim', source, "Genesis Supernova", target);
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
		contestType: "Cool",
	},
	//
	springbloom: {
		num: -148,  
		accuracy: 95,  
		basePower: 50,  
		shortDesc: "Lowers targets' Spe by 1, 2 in Sun.",
		name: "Spring Bloom",  
		category: "Special",
		pp: 10,  
		priority: 0,  
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, source, move) {
        	this.attrLastMove('[still]');
        	this.add('-anim', source, "Bloom Doom", target);
    	},
		secondary: {
			chance: 100,
			onHit(target, source) {
			  // Check if Tailwind is active on the user's side
				if (this.field.isWeather(['sunnyday', 'desolateland'])) {
					this.boost({spe: -2}, target);
				} else {
					this.boost({spe: -1}, target);
				}
			},
		},
		target: "allAdjacentFoes",  
		type: "Grass",  
		contestType: "Beautiful", 
	},
	//
	excavation: {
		num: -149,
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		name: "Excavation",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		shortDesc: "+50 damage for each recovered item.",
		basePowerCallback(pokemon, target, move) {
			// Recount recovered items
			const targets = this.getAllActive().filter(pokemon => 
				pokemon && !pokemon.fainted && !pokemon.item // Only Pokémon without items
			);
		
			let recoveredCount = 0; // Local variable to track recovered items
		
			for (const pokemon of targets) {
				if (this.actions.useMove('Recycle', pokemon)) {
					recoveredCount++;
				}
			}
		
			// Calculate new base power based on the recount
			const newBasePower = this.clampIntRange(move.basePower + (50 * recoveredCount), 0, 200);
			
		//	console.log(`Excavation: Base power calculated as ${newBasePower} (Recovered items: ${recoveredCount}).`);
			return newBasePower;
		},
		secondary: null,
		target: "normal",
		type: "Ground",
		contestType: "Tough",
	},
	//
	hazardstinger: {
		num: -151,
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		shortDesc: "User and target recharge.",
		name: "Hazard Stinger",
		pp: 5,
		priority: 0,
		flags: {recharge: 1, contact: 1, protect: 1, metronome: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-message', `${source.name} is about to stun the target!`);
			this.add('-anim', source, "Fell Stinger", target);
		},
		self: {
			volatileStatus: 'mustrecharge',
		},
		volatileStatus: 'mustrecharge',
		secondary: null,
		target: "normal",
		type: "Bug",
		contestType: "Tough",
	},
	//
	gossamerveil: {
		num: -152,
		accuracy: 90,
		basePower: 100,
		category: "Physical",
		name: "Gossamer Veil",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onAfterHit(target, source, move) {
			if (!move.hasSheerForce && source.hp) {
				for (const side of source.side.foeSidesWithConditions()) {
					side.addSideCondition('spikes');
				}
			}
		},
		onAfterSubDamage(damage, target, source, move) {
			if (!move.hasSheerForce && source.hp) {
				for (const side of source.side.foeSidesWithConditions()) {
					side.addSideCondition('spikes');
				}
			}
		},
		secondary: {}, // Sheer Force-boosted
		target: "allAdjacentFoes",
		type: "Bug",
	},
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
	weatherball: {
		inherit: true,
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
			case 'desertgales':
				move.type = 'Ground';
				break;
			case 'hail':
		//	case 'diamonddust':
			case 'snow':
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
			case 'desertgales':
				move.basePower *= 2;
				break;
			case 'hail':
		//	case 'diamonddust':
			case 'snow':
				move.basePower *= 2;
				break;
			}
			this.debug('BP: ' + move.basePower);
		},
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

	// start: Avalanche buff
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
		name: "Avalanche",
		pp: 10,
		priority: -4,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Ice",
		contestType: "Beautiful",
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
			if (target.species.name === 'Aegislash-Light' || target.species.name === 'Aegislash-Blade-Light' ||
				target.species.name === 'Grinsegrin' || target.species.name === 'Grinsegrin-Alternate') {
				target.addVolatile('soaktypedenial');
			}
		},
		secondary: null,
		target: "normal",
		type: "Water",
		zMove: {boost: {spa: 1}},
		contestType: "Cute",
	},
	// end

	// Endless Dream field (ugly way to do things I know :p)
	wakeupslap: {
		inherit: true,
		basePowerCallback(pokemon, target, move) {
			if (target.status === 'slp' || target.hasAbility('comatose') || target.hasAbility('endlessdream') || pokemon.hasAbility('endlessdream')) return move.basePower * 2;
			return move.basePower;
		},
	},
	dreameater: {
		inherit: true,
		onTryImmunity(target, source) {
			return target.status === 'slp' || target.hasAbility('comatose') || target.hasAbility('endlessdream') || source.hasAbility('endlessdream');
		},
	},
	nightmare: {
		inherit: true,
		condition: {
			noCopy: true,
			onStart(pokemon) {
				if (pokemon.status !== 'slp' && !pokemon.hasAbility('comatose') && !pokemon.hasAbility('endlessdream')) {
					return false;
				}
				this.add('-start', pokemon, 'Nightmare');
			},
			onResidualOrder: 9,
			onResidual(pokemon) {
				this.damage(pokemon.baseMaxhp / 4);
			},
		},
	},
	sleeptalk: {
		inherit: true,
		onTry(source) {
			let usable = false;
			for (const opponent of source.adjacentFoes()) {
				if (opponent.hasAbility('endlessdream')) {
					usable = true;
					break;
				}
			}
			return source.status === 'slp' || source.hasAbility('comatose') || usable;
		},
	},
	//
	ultrasleep: { //this move is only for Endless Dream ability
		num: -9999,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Ultrasleep",
		pp: 5,
		priority: -7,
		flags: { mirror: 1 },
		pseudoWeather: 'ultrasleep',
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasAbility('persistent')) {
					this.add('-activate', source, 'ability: Persistent', effect);
					return 7;
				}
				return 5;
			},
			onStart(target, source) {
				this.add('-fieldstart', 'move: Ultrasleep', '[of] ' + source);
			},
			onSetStatus(status, target, source, effect) {
				if (target.hasAbility('vitalspirit') || target.hasAbility('insomnia')) return;
				if (effect && ((effect as Move).status || effect.id === 'yawn')) {
					this.add('-activate', target, 'move: Ultrasleep');
				}
				return false;
			},
			onResidualOrder: 23,
			onEnd() {
				this.add('-fieldend', 'move: Ultrasleep');
			},
		},
		shortDesc: "This move is not supposed to be used at all.",
		secondary: null,
		target: "all",
		type: "Psychic",
		zMove: { boost: { accuracy: 1 } },
		contestType: "Clever",
	},
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
				const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge', 'plantpathogens'];
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
				const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge', 'plantpathogens'];
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
				'reflect', 'lightscreen', 'auroraveil', 'safeguard', 'mist', 'spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge', 'plantpathogens',
			];
			const removeAll = [
				'spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge',
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
				'mist', 'lightscreen', 'reflect', 'spikes', 'safeguard', 'tailwind', 'toxicspikes', 'stealthrock', 'waterpledge', 'firepledge', 'grasspledge', 'stickyweb', 'auroraveil', 'gmaxsteelsurge', 'gmaxcannonade', 'gmaxvinelash', 'gmaxwildfire', 'plantpathogens',
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
	tidyup: {
		num: 882,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Tidy Up",
		pp: 10,
		priority: 0,
		flags: {},
		onHit(pokemon) {
			let success = false;
			for (const active of this.getAllActive()) {
				if (active.removeVolatile('substitute')) success = true;
			}
			const removeAll = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge', 'plantpathogens'];
			const sides = [pokemon.side, ...pokemon.side.foeSidesWithConditions()];
			for (const side of sides) {
				for (const sideCondition of removeAll) {
					if (side.removeSideCondition(sideCondition)) {
						this.add('-sideend', side, this.dex.conditions.get(sideCondition).name);
						success = true;
					}
				}
			}
			if (success) this.add('-activate', pokemon, 'move: Tidy Up');
			return !!this.boost({atk: 1, spe: 1}, pokemon, pokemon, null, false, true) || success;
		},
		secondary: null,
		target: "self",
		type: "Normal",
	},

	shelltrap: {
		num: 704,
		accuracy: 100,
		basePower: 150,
		category: "Special",
		isNonstandard: "Past",
		name: "Shell Trap",
		pp: 5,
		priority: -3,
		flags: {protect: 1, failmefirst: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failinstruct: 1},
		priorityChargeCallback(pokemon) {
			pokemon.addVolatile('shelltrap');
		},
		onTryMove(pokemon) {
			if (!pokemon.volatiles['shelltrap']?.gotHit) {
				this.attrLastMove('[still]');
				this.add('cant', pokemon, 'Shell Trap', 'Shell Trap');
				return null;
			}
		},
		condition: {
			duration: 1,
			onStart(pokemon) {
				this.add('-singleturn', pokemon, 'move: Shell Trap');
			},
			onHit(pokemon, source, move) {
				if (!pokemon.isAlly(source)) {
					this.effectState.gotHit = true;
					const action = this.queue.willMove(pokemon);
					if (action) {
						this.queue.prioritizeAction(action);
					}
				}
			},
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Fire",
		contestType: "Tough",
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
			if (source.baseSpecies.baseSpecies === 'Al-Ghulazam') {
				// Al-Ghulazam specific behavior
				if (source.hp <= source.maxhp / 2 && source.item === 'Black Tome') {
					// If HP is at or below 50% and has Black Tome, take 25% damage
					this.directDamage(source.maxhp / 4, source, source);
				} else {
					// In all other cases, take 50% damage
					this.directDamage(source.maxhp / 2, source, source);
				}
			} else {
				// Non-Al-Ghulazam behavior (unchanged)
				this.directDamage(source.maxhp / 2, source, source);
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
	bravebird: {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		target: "normal",
	},
	// Gravitational Pull, Sticky Residues
	gmaxsteelsurge: {
		inherit: true,
		condition: {
			onSideStart(side) {
				this.add('-sidestart', side, 'move: G-Max Steelsurge');
				for (const active of this.getAllActive()) {
					if (active.volatiles['gravitationalpull']) {
						this.add('-ability', active, 'Gravitational Pull');
						this.add('-message', `The sharp spikes are surrounding ${active.name}!`);
					}
				}
			},
			onEntryHazard(pokemon) {
				if (pokemon.hasItem('heavydutyboots') || (pokemon.hasAbility('gravitationalpull') && !pokemon.ignoringAbility())) return;
				for (const active of this.getAllActive()) {
					if (active.hasAbility('gravitationalpull')) return;
				}
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
	},
	spikes: {
		inherit: true,
		condition: {
			// this is a side condition
			onSideStart(side) {
				this.add('-sidestart', side, 'Spikes');
				this.effectState.layers = 1;
				for (const active of this.getAllActive()) {
					if (active.volatiles['gravitationalpull']) {
						this.add('-ability', active, 'Gravitational Pull');
						this.add('-message', `The spikes are surrounding ${active.name}!`);
					}
				}
			},
			onSideRestart(side) {
				if (this.effectState.layers >= 3) return false;
				this.add('-sidestart', side, 'Spikes');
				this.effectState.layers++;
			},
			onEntryHazard(pokemon) {
				if (!pokemon.isGrounded() || pokemon.hasItem('heavydutyboots') || (pokemon.hasAbility('gravitationalpull') && !pokemon.ignoringAbility())) return;
				for (const active of this.getAllActive()) {
					if (active.hasAbility('gravitationalpull')) return;
				}
				const damageAmounts = [0, 3, 4, 6]; // 1/8, 1/6, 1/4
				this.damage(damageAmounts[this.effectState.layers] * pokemon.maxhp / 24);
			},
		},
	},
	stealthrock: {
		inherit: true,
		condition: {
			// this is a side condition
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Stealth Rock');
				for (const active of this.getAllActive()) {
					if (active.volatiles['gravitationalpull']) {
						this.add('-ability', active, 'Gravitational Pull');
						this.add('-message', `The pointed stones are surrounding ${active.name}!`);
					}
				}
			},
			onEntryHazard(pokemon) {
				if (pokemon.hasItem('heavydutyboots') || (pokemon.hasAbility('gravitationalpull') && !pokemon.ignoringAbility())) return;
				for (const active of this.getAllActive()) {
					if (active.hasAbility('gravitationalpull')) return;
				}
				const typeMod = this.clampIntRange(pokemon.runEffectiveness(this.dex.getActiveMove('stealthrock')), -6, 6);
				this.damage(pokemon.maxhp * Math.pow(2, typeMod) / 8);
			},
		},
	},
	stickyweb: {
		inherit: true,
		condition: {
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Sticky Web');
				for (const active of this.getAllActive()) {
					if (active.volatiles['gravitationalpull']) {
						this.add('-ability', active, 'Gravitational Pull');
						this.add('-message', `The sticky web is surrounding ${active.name}!`);
					}
				}
			},
			onEntryHazard(pokemon) {
				if (!pokemon.isGrounded() || pokemon.hasItem('heavydutyboots') || (pokemon.hasAbility('gravitationalpull') && !pokemon.ignoringAbility())) return;
				for (const active of this.getAllActive()) {
					if (active.hasAbility('gravitationalpull')) return;
				}
				this.add('-activate', pokemon, 'move: Sticky Web');
				this.boost({spe: -1}, pokemon, this.effectState.source, this.dex.getActiveMove('stickyweb'));
			},
		},
	},
	toxicspikes: {
		inherit: true,
		condition: {
			// this is a side condition
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Toxic Spikes');
				this.effectState.layers = 1;
				for (const active of this.getAllActive()) {
					if (active.volatiles['gravitationalpull']) {
						this.add('-ability', active, 'Gravitational Pull');
						this.add('-message', `The toxic spikes are surrounding ${active.name}!`);
					}
				}
			},
			onSideRestart(side) {
				if (this.effectState.layers >= 2) return false;
				this.add('-sidestart', side, 'move: Toxic Spikes');
				this.effectState.layers++;
			},
			onEntryHazard(pokemon) {
				if (!pokemon.isGrounded()) return;
				if (pokemon.hasType('Poison') && !this.field.getPseudoWeather('stickyresidues')) {
					this.add('-sideend', pokemon.side, 'move: Toxic Spikes', '[of] ' + pokemon);
					pokemon.side.removeSideCondition('toxicspikes');
				} else if (
					pokemon.hasType('Steel') || pokemon.hasType('Poison') ||
					pokemon.hasItem('heavydutyboots') || (pokemon.hasAbility('gravitationalpull') && !pokemon.ignoringAbility())
							 ) {
					return;
				} else {
					for (const active of this.getAllActive()) {
						if (active.hasAbility('gravitationalpull')) return;
					}
					if (this.effectState.layers >= 2) {
						pokemon.trySetStatus('tox', pokemon.side.foe.active[0]);
					} else {
						pokemon.trySetStatus('psn', pokemon.side.foe.active[0]);
					}
				}
			},
		},
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
