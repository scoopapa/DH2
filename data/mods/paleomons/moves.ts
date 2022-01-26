export const Moves: {[k: string]: ModdedMoveData} = {
	terrorsoar: {
		num: -100,
		accuracy: 100,
		basePower: 75,
		category: "Physical",
		name: "Terror Soar",
		desc: "Has a 30% chance to make the target flinch.",
		shortDesc: "30% chance to make the target flinch.",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1},
		secondary: {
			chance: 30,
			volatileStatus: 'flinch',
		},
		target: "any",
		type: "Flying",
		contestType: "Cool",	
	},

	venomdrain: {
		num: -101,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Venom Drain",
		desc: "The user recovers 1/2 the HP lost by the target, rounded half up. If Big Root is held by the user, the HP recovered is 1.3x normal, rounded half down.",
		shortDesc: "User recovers 50% of damage dealt.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, heal: 1},
		drain: [1, 2],
		secondary: null,
		target: "normal",
		type: "Poison",
		contestType: "Tough",
	},

	tarpit: {
		num: -102,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Tarpit",
		desc: "For 5 turns, the terrain becomes a Tar Pit. During the effect, the power of Poison-type attacks used by grounded Pokemon is multiplied by 1.3 and all Pokemon are under the effects of Powder. Camouflage transforms the user into a Poison type, Nature Power becomes Sludge Bomb, and Secret Power has a 30% chance to cause poison. Fails if the current terrain is Tar Pit.",
		shortDesc: "5 turns. Grounded: +Poison power, +Powder.",
		pp: 10,
		priority: 0,
		flags: {nonsky: 1},
		terrain: 'tarpit',
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
				if (attacker.hasItem('heavydutyboots')) return;
				if (move.type === 'Poison' && attacker.isGrounded()) {
					this.debug('tar pit boost');
					return this.chainModify([0x14CD, 0x1000]);
				}
			},

			onStart(battle, source, effect) {
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Tar Pit', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Tar Pit');
				}
			},

			onTryMove(pokemon, target, move) {
				if (move.type === 'Fire') {
					if (pokemon.isGrounded() && !pokemon.isSemiInvulnerable() && !pokemon.hasItem('heavydutyboots')) {
						this.add('-message', "When the flame touched the sticky tar on the Pokemon, it combusted!");
						this.damage(this.clampIntRange(Math.round(pokemon.maxhp / 4), 1));
						return false;
					}
				}
			},

			onEnd() {
				if (!this.effectData.duration) this.eachEvent('Terrain');
				this.add('-fieldend', 'move: Tar Pit');
			},
		},
		secondary: null,
		target: "all",
		type: "Poison",
		zMove: {boost: {def: 1}},
		contestType: "Beautiful",
	},

	scorchedpebbles: {
		num: -103,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Scorched Pebbles",
		desc: "Sets up a hazard on the opposing side of the field, applying Tar Shot to opposing Pokemon that switch in, unless it is a Flying- or Fire-type Pokemon or has the Levitate Ability. Fails if the effect is already active on the opposing side. Can be removed from the opposing side if any opposing Pokemon uses Rapid Spin or Defog successfully, or is hit by Defog.",
		shortDesc: "Applies Tar Shot upon switchin",
		pp: 20,
		priority: 0,
		flags: {reflectable: 1},
		sideCondition: 'scorchedpebbles',
		condition: {
			onStart(side) {
				this.add('-message', "Scorched pebbles now litter the field!");
			},
			onSwitchIn(pokemon) {
				if (pokemon.hasType('Flying') || pokemon.hasType('Fire') ) return;
				if (!pokemon.isGrounded()) return;
				if (pokemon.hasItem('heavydutyboots')) return;
				this.add('-message' + pokemon.name + " was burned by the scorched pebbles!");
				pokemon.addVolatile('tarshot');
				},
		},
		secondary: null,
		target: "foeSide",
		type: "Fire",
		zMove: {boost: {atk: 1}},
		contestType: "Cool",
	},

	//
	//
	//
	//
	// Vanilla moves start here
	//
	//
	//
	//

	acidarmor: {
		inherit: true,
		desc: "Raises the user's Defense by 2 stages. If the terrain is Tar Pit, the user's Defense is instead increased by 3 stages.",
		shortDesc: "Raises the user's Defense by 2.",
		onHit(target) {
			if(this.field.isTerrain('tarpit')) {
				if (target.isGrounded() && !target.isSemiInvulnerable() &&!target.hasItem('heavydutyboots')) {
					this.boost({def: 3}, target);
				}
			}
			else {
				this.boost({def: 2}, target);
			}
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
			} else if (this.field.isTerrain('tarpit')) {
				move = 'sludgebomb';
			}
			this.useMove(move, pokemon, target);
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
			} else if (this.field.isTerrain('tarpit')) {
				move.secondaries.push({
					chance: 30,
					status: 'psn',
				});
			}
		}
	},

	terrainpulse: {
		inherit: true,
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
			case 'tarpit':
				move.type = 'Poison';
				break;
			}
		},
	},

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
			} else if (this.field.isTerrain('tarpit')) {
				newType= 'Poison';
			}

			if (target.getTypes().join() === newType || !target.setType(newType)) return false;
			this.add('-start', target, 'typechange', newType);
		},
	},
};