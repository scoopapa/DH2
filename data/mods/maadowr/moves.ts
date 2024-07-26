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
		onAfterHit(target, source, move) {
      if (pokemon.side.sideConditions['tailwind']) {
				this.boost({def: -2}, source, target, this.dex.getActiveMove("Clive Jump"));
        } else {
        this.boost({def: -1}, source, target, this.dex.getActiveMove("Clive Jump"));
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
					onAfterMoveSecondary() {
						this.field.setWeather('snow');
					},
					onPrepareHit(target, source) {
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
	  shortDesc: "User's primary type changes to an ally's primary type.",
	  name: "Colour Me Gone",
	  pp: 10,
	  priority: 1,
	  flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
	  secondary: null,
	  onPrepareHit(source, target, move) {
		  let newtype = null;
			for (const ally of pokemon.side.active) {
				if (
					ally.types[0] !== pokemon.baseSpecies.types[0] &&
					ally.types[0] !== pokemon.baseSpecies.types[1]
				) {
					newtype = ally.types[0];
				}
			}
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

	// start
	gigavolt: {
		num: -11,
		accuracy: 100,
		basePower: 140,
		category: "Physical",
		shortDesc: "Causes paralysis if user gets interrupted.",
		name: "Giga Volt",
		pp: 5,
		priority: -3,
		flags: {contact: 1, protect: 1, punch: 1, failmefirst: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failinstruct: 1},
		priorityChargeCallback(pokemon) {
			pokemon.addVolatile('gigavolt');
		},
		beforeMoveCallback(pokemon) {
			if (pokemon.volatiles['gigavolt']?.lostFocus) {
				source.trySetStatus('par', target);
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
		basePower: 10,
		category: "Physical",
		shortDesc: "Removes target's Steel-type.",
		name: "Golddigger",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		onSourceHit(target, source, move) {
			if (target.hasType('Steel')) {
				target.setType(target.getTypes(true).map(type => type === "Steel" ? "???" : type));
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
			const success = !!this.heal(this.modify(pokemon.maxhp, 0.25));
			if (pokemon.hasType('Bug')) {
				return boost({atk: 1, spa: 1}) || success;
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
		flags: {contact: 1, protect: 1, punch: 1, failmefirst: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failinstruct: 1},
		priorityChargeCallback(pokemon) {
			pokemon.addVolatile('hasamiwaza');
		},
		beforeMoveCallback(pokemon) {
			if (pokemon.volatiles['hasamiwaza']?.lostFocus) {
				this.add('-ability', pokemon, 'Intimidate', 'boost');
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
				if (move.category !== 'Status') {
					this.effectState.lostFocus = true;
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
		basePower: 140,
		category: "Special",
		shortDesc: "Recovers 50% of the damage dealt to the targets and needs to recharge afterwards.",
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
			for (const pokemon of this.getAllActive()) {
				totalatk += target.getStat('atk', false, true);
				totaldef += target.getStat('def', false, true);
				totalspa += target.getStat('spa', false, true);
				totalspd += target.getStat('spd', false, true);
				totalspe += target.getStat('spe', false, true);
			}
			if (totalatk && totalatk >= (totaldef || totalspa || totalspd || totalspe)) {
				this.boost({atk: 1, accuracy: 1});
			}
			if (totaldef && totaldef >= (totalspa || totalspd || totalspe)) {
				this.boost({def: 1, accuracy: 1});
			}
			if (totaldef && totaldef > (totalatk)) {
				this.boost({def: 1, accuracy: 1});
			}
			if (totalspa && totalspa >= (totalspd || totalspe)) {
				this.boost({spa: 1, accuracy: 1});
			}
			if (totalspa && totalspa > (totalatk || totaldef)) {
				this.boost({spa: 1, accuracy: 1});
			}
			if (totalspd && totalspd >= (totalspe)) {
				this.boost({spd: 1, accuracy: 1});
			}
			if (totalspd && totalspd > (totalatk || totaldef || totalspa)) {
				this.boost({spd: 1, accuracy: 1});
			}
			if (totalspe && totalspe > (totalatk || totaldef || totalspa || totalspd)) {
				this.boost({spe: 1, accuracy: 1});
			}
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
			return 50 + 50 * target.negativeBoosts();
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
		shortDesc: "Recovers half of the damage done to the target, 3/4 in Electric Terrain.",
		name: "Circuit Short",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, heal: 1, metronome: 1, bite: 1},
		drain: [1, 2],
		onModifyMove(move, source, target) {
			if (this.field.isTerrain('electricterrain')) move.drain = [3, 4];
		},
		secondary: null,
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
		volatileStatus: 'torment',
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
		heal: [1, 4],
		volatileStatus: 'clearnegativeboost',
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
    onHitField(target, source) {
			const targets: Pokemon[] = [];
			let anyAirborne = false;
			for (const pokemon of this.getAllActive()) {
				if (!pokemon.runImmunity('Ground')) {
					this.add('-immune', pokemon);
					anyAirborne = true;
					continue;
				}
				if (pokemon.hasType('Ground')) {
					// This move affects every grounded Ground-type Pokemon in play.
					targets.push(pokemon);
				}
			}
			if (!targets.length && !anyAirborne) return false; // Fails when there are no grounded Ground types or airborne Pokemon
			for (const pokemon of targets) {
				this.boost({def: 1, spd: 1}, pokemon, source);
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
		pseudoWeather: "Trick Room",
		secondary: null,
		target: "all",
		type: "Psychic",
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
		accuracy: 90,
		basePower: 100,
		category: "Special",
		shortDesc: "Dual Poison & Water move that poisons in Acidic terrain.",
		name: "Oil Spill",
		pp: 10,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onEffectiveness(typeMod, target, type, move) {
			return typeMod + this.dex.getEffectiveness('Water', type);
		},
		onSourceDamagingHit(damage, target, source, move) {
			if (target.hasAbility('shielddust') || target.hasItem('covertcloak')) return;
			if (this.field.isTerrain('acidicterrain')) {
				target.trySetStatus('psn', source);
			}
		},
		priority: 0,
		secondary: {},
		target: "allAdjacentFoes",
		type: "Poison",
		contestType: "Tough",
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
		onSourceDamagingHit(damage, target, source, move) {
			if (target.hasAbility('shielddust') || target.hasItem('covertcloak')) return;
			if this.field.isWeather(['raindance', 'primordialsea']) {
				target.trySetStatus('brn', source);
			}
		},
		secondary: {},
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
			durationCallback(target, source, effect) {
				if (this.field.isWeather('sunnyday', 'desolateland')) {
					return 8;
				}
				return 5;
			},
			onAnyModifyDamage(damage, source, target, move) {
				if (target !== source && this.effectState.target.hasAlly(target)) {
					if (target.getMoveHitData(move).typeMod > 0) {
					this.debug('Eye of the Sun neutralize');
					return this.chainModify(0.75);
					}
				}
			},
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Eye of the Sun');
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 10,
			onSideEnd(side) {
				this.add('-sideend', side, 'move: Eye of the Sun');
			},
		},		
		secondary: null,
		target: "allySide",
		type: "Flying",
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

	// start
//	reboot: {
//		num: -37,

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
