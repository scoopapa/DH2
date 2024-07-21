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
		onTry(source, target) {
      this.field.setWeather('snow');
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
  // colourmegone to be coded
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
		shortDesc: "Recovers half of the damage done to the target, 2/3 in Psychic Terrain.",
		name: "Enzymatic Bite",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, heal: 1, metronome: 1, bite: 1},
		drain: [1, 2] if (!this.field.isTerrain('psychicterrain')),
		drain: [2, 3] if (this.field.isTerrain('psychicterrain')),
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
	// golddigger
	// end

	// start
	honeydew: {
		num: -13,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Honey Dew",
		pp: 5,
		priority: 0,
		flags: {snatch: 1, heal: 1, metronome: 1},
		onHit(pokemon) {
			const success = !!this.heal(this.modify(pokemon.maxhp, 0.25));
			return boost({atk: 1, spa: 1}) if (pokemon.hasType('Bug')); || success;
		},
		secondary: null,
		target: "allies",
		type: "Bug",
	},
   // end

	// start
	icechain: {
		num: -14,
		accuracy: 90,
		basePower: 80,
		category: "Special",
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
		accuracy: 95,
		basePower: 95,
		category: "Physical",
		name: "Lunar Dust",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
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
	prismaticlaser: {
		num: -18,
		accuracy: 90,
		basePower: 120,
		category: "Special",
		name: "Lunar Storm",
		pp: 10,
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
	// recalibration
	// end

	// start
			
};
