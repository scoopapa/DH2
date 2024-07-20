export const Moves: { [moveid: string]: ModdedMoveData } = {
  aloevera: {
    num: -1,
    accuracy: 100,
		basePower: 100,
		category: "Special",
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
		contestType: "Clever",
	},
  // end

  // start
};
