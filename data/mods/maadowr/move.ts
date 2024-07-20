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
};
