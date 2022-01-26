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
			/*
			onResidualOrder: 5,
			onResidualSubOrder: 3,
			onResidual() {
				this.eachEvent('Terrain');
			},
			onTerrain(pokemon) {
				if (pokemon.isGrounded() && !pokemon.isSemiInvulnerable()) {
					if (pokemon.hasItem('heavydutyboots')) return;
					pokemon.addVolatile("Powder");
					this.add('-message', "Pokemon are being Powder'd!");
				}
			},
			*/

			onTryMove(pokemon, target, move) {
				if (move.type === 'Fire') {
					if (pokemon.isGrounded() && !pokemon.isSemiInvulnerable() && !pokemon.hasItem('heavydutyboots')) {
						this.add('-activate', pokemon, 'move: Powder');
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

	acidarmor: {
		num: 151,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Acid Armor",
		pp: 20,
		priority: 0,
		flags: {snatch: 1},

		onHit(target) {
			if(this.field.isTerrain('tarpit') && !target.hasItem('heavydutyboots')) {
				this.boost({def: 3}, target);
			}
			else {
				this.boost({def: 2}, target);
			}
		},

		secondary: null,
		target: "self",
		type: "Poison",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Tough",
	},
};