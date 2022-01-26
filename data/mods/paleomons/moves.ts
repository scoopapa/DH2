export const Moves: {[k: string]: ModdedMoveData} = {
	terrorsoar: {
		num: -100,
		accuracy: 100,
		basePower: 75,
		category: "Physical",
		name: "Terror Soar",
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
				this.add('-message' + pokemon + " was burned by the scorched pebbles!");
				pokemon.addVolatile('tarshot');
				},
		},
		secondary: null,
		target: "foeSide",
		type: "Fire",
		zMove: {boost: {spe: 1}},
		contestType: "Tough",
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