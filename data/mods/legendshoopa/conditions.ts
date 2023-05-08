export const Conditions: {[k: string]: ConditionData} = {	
	legendsboost: {
		name: 'legendsboost',
		onBoost(boost, target, source, effect) {
			this.effectState.startTime = 0;
			if (!boost || effect.id === 'legendsboost') return;
			let activated = false;
			let boostName: BoostName;
			this.effectState.atkBoosted = false;
			this.effectState.defBoosted = false;
			this.effectState.speBoosted = false;

			const LegendsBoost : SparseBoostsTable = {};
			if (boost.atk) {
				LegendsBoost.spa = boost.atk;
				this.effectState.atkBoosted = true;
				activated = true;
			}
			if (boost.spa) {
				LegendsBoost.atk = boost.spa;
				this.effectState.atkBoosted = true;
				activated = true;
			}
			if (boost.spd) {
				LegendsBoost.def = boost.spd;
				this.effectState.defBoosted = true;
				activated = true;
			}
			if (boost.def) {
				LegendsBoost.spd = boost.def;
				this.effectState.defBoosted = true;
				activated = true;
			}
			if(boost.spe) {
				this.effectState.speBoosted = true;
				activated = true;

			}
			if (activated === true) {
				this.boost(LegendsBoost, target, target, null, true);
				/*
				5 turns for single-stat boosters
				4 turns for double-stat boosters
				3 turns for omniboosts or stat boosts gained by an offensive move's effect / ability / item
				*/
				
				this.effectState.startTime = 6;
				if(this.effectState.atkBoosted) {
					this.effectState.startTime -= 1;
				}
				if(this.effectState.defBoosted) {
					this.effectState.startTime -= 1;
				}
				if(this.effectState.speBoosted) {
					this.effectState.startTime -= 1;
				}
				if((effect.effectType === 'Move' && !effect.status) || effect.effectType === 'Ability' || effect.effectType === 'Item') {
					this.effectState.startTime = 3;
				}

				if(this.dex.abilities.get('remaininghope') && this.effectState.startTime == 3) {
					this.effectState.startTime += 1;
				}
				this.effectState.time = this.effectState.startTime;
				return;
			}
		},

		// this isnt a boost really its just so i dont have to make another volatile xx
		onModifyMove(move) {
			if (move.secondaries) {
			 if(move.id === 'powdersnow' || move.id === 'blizzard' || move.id === 'firepunch' || move.id === 'icepunch' || move.id === 'thunderpunch') return;
				this.debug('doubling secondary chance');
				for (const secondary of move.secondaries) {
					if (secondary.chance && secondary.chance === 10) secondary.chance *= 2;
				}
			}
			if (move.self?.chance && move.self?.chance === 10) {
			 move.self.chance *= 2;
			}
		},

		onResidual(pokemon) {
			this.effectState.time -= 1;
			if (this.effectState.time <= 0) {
				this.add('-clearboost', pokemon);
				pokemon.clearBoosts();
				return;
			}
		},

		onEnd(pokemon) {
			this.add('-end', pokemon, 'legendsboost', '[silent]');
		},
	},

	altboost: {
		name: 'altboost',
	},

	confusion: {
		name: 'confusion',
	},

	jaggedsplinters: {
		name: 'jaggedsplinters',
		onStart(side, target, source) {
			this.add('-start', side, 'Jagged Splinters');
			this.effectState.jaggedType = target.lastMove;
		},

		onResidual(pokemon) {
				let type = this.dex.getActiveMove(this.effectState.jaggedType);
				let typeMod = this.clampIntRange(pokemon.runEffectiveness(type));
				const tr = this.trunc;
				
				let damage = this.getDamage(pokemon, pokemon, 25);
				if (typeof damage !== 'number') throw new Error("Jagged Splinters damage not dealt");
				pokemon.getMoveHitData(type).typeMod = typeMod;
				if (typeMod > 0) {
					for (let i = 0; i < typeMod; i++) {
						damage *= 2;
					}
				}
				if (typeMod < 0) {
					for (let i = 0; i > typeMod; i--) {
						damage = tr(damage / 2);
					}
				}
				this.damage(damage);
				this.add('-message', `Jagged Splinters dug into ${pokemon.name}!`);
			},
	},

	fixated: {
		name: 'fixated',
		onStart(target, source, effect) {
			this.add('-start', target, 'fixated', '[silent]');
			this.effectState.move = effect.id;
			this.add('-message', `${target.name} is fixated on ${this.effectState.move}!`);
		},

		onTryMovePriority: -2,
		onTryMove(pokemon, target, move) {
			//this.add('-message', `effectdata is: ${this.effectState.move} and move.id is: ${move.id}`);
			if(this.effectState.move === move.id) return;
			pokemon.removeVolatile('fixated');
		},

		onModifyDamage(damage, source, target, move) {
			//this.add('-message', 'fixated boost !');
			return this.chainModify(1.5);
		},

		onFoeBasePowerPriority: 17,
		onFoeBasePower(basePower, attacker, defender, move) {
			if (this.effectState.target !== defender) return;
			return this.chainModify(1.33);
		},

		onEnd(pokemon) { //idk how to properly do messages and stuff so this is the next best thing x
			this.add('-end', pokemon, 'fixated', '[silent]');
			this.add('-message', `${pokemon.name} is no longer fixated!`);
		},
	},

	primed: {
		name: 'primed',
		duration: 5,

		onStart(target, source, effect) {
			if(effect.effectType === 'Item') this.duration = 4;
			if(effect.effectType === 'Ability') this.duration = 5;
			this.add('-start', target, 'primed', '[silent]');
			this.add('-message', `${target.name} adopted a hard-hitting stance!`);
		},

		onModifyDamage(damage, source, target, move) {
			return this.chainModify(1.5);
		},

		onEnd(pokemon) {
			this.add('-end', pokemon, 'primed', '[silent]');
			this.add('-message', `${pokemon.name} is no longer primed!`);
		},
	},


	/// Canon Conditions ///



	brn: {
		name: 'brn',
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.id === 'flameorb') {
				this.add('-status', target, 'brn', '[from] item: Flame Orb');
			} else if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'brn', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'brn');
			}
			this.effectState.startTime = 6;
			if(sourceEffect.effectType === 'Ability' || sourceEffect.effectType === 'Item') {
				this.effectState.startTime = 3;
			}
			this.effectState.time = this.effectState.startTime;
		},
		// Damage reduction is handled directly in the sim/battle.js damage function
		onResidualOrder: 9,
		onResidual(pokemon) {
			this.damage(pokemon.baseMaxhp / 12);
			pokemon.statusState.time--;
			if (pokemon.statusState.time <= 0) {
				this.add('-curestatus', pokemon, 'brn', '[Silent]');
				pokemon.setStatus('');
				return;
			}
		},
	},
	par: {
		name: 'par',
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'par', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'par');
			}
			this.effectState.startTime = 6;
			if(sourceEffect.effectType === 'Ability' || sourceEffect.effectType === 'Item') {
				this.effectState.startTime = 3;
			}
			this.effectState.time = this.effectState.startTime;
		},
		onModifySpe(spe, pokemon) {
			if (!pokemon.hasAbility('quickfeet')) {
				return this.chainModify(0.5);
			}
		},
		onBeforeMovePriority: 1,
		onBeforeMove(pokemon) {
			if (this.randomChance(1, 4)) {
				this.add('cant', pokemon, 'par');
				return false;
			}
		},
		onResidualOrder: 9,
		onResidual(pokemon) {
			pokemon.statusState.time--;
			if (pokemon.statusState.time <= 0) {
				this.add('-curestatus', pokemon, 'par', '[Silent]');
				pokemon.setStatus('');
				return;
			}
		}
	},

	// code stolen from M4A's Sandbox x
	frz: {
		name: 'frz',
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'frz', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'frz');
			}
			if (target.species.name === 'Shaymin-Sky' && target.baseSpecies.baseSpecies === 'Shaymin') {
				target.formeChange('Shaymin', this.effect, true);
			}
			this.effectState.startTime = 6;
			if(sourceEffect.effectType === 'Ability' || sourceEffect.effectType === 'Item') {
				this.effectState.startTime = 3;
			}
			this.effectState.time = this.effectState.startTime;
		},
		onHit(target, source, move) {
			if (move.thawsTarget || (move.id === 'flamewheel' || move.id === 'flareblitz') && move.category !== 'Status') {
				target.cureStatus();
			}
		},
		onResidualOrder: 9,
		onResidual(pokemon) {
			this.hint(`${this.effectState.target.name} is afflicted with frostbite!`);
			this.damage(pokemon.baseMaxhp / 12);
			pokemon.statusState.time--;
			if (pokemon.statusState.time <= 0) {
				this.add('-curestatus', pokemon, 'frz', '[Silent]');
				pokemon.setStatus('');
				return;
			}
		},
	},

	slp: {
		name: 'slp',
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'slp', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else if (sourceEffect && sourceEffect.effectType === 'Move') {
				this.add('-status', target, 'slp', '[from] move: ' + sourceEffect.name);
			} else {
				this.add('-status', target, 'slp');
			}
			this.effectState.startTime = 6;
			if(sourceEffect.effectType === 'Ability' || sourceEffect.effectType === 'Item') {
				this.effectState.startTime = 3;
			}
			this.effectState.time = this.effectState.startTime;
		},

		onBeforeMovePriority: 1,
		onBeforeMove(pokemon) {
			if(this.field.isWeather('hail')) {
				if (this.randomChance(1, 1.5)) {
					this.add('cant', pokemon, 'slp');
					return false;
				}
			} else {
				if (this.randomChance(1, 3)) {
					this.add('cant', pokemon, 'slp');
					return false;
				}
			}
		},

		onFoeBasePowerPriority: 17,
		onFoeBasePower(basePower, attacker, defender, move) {
			if (this.effectState.target !== defender) return;
			return this.chainModify(1.33);
		},

		
		onBeforeMove(target, source, move) {
			if ((move.id === 'wildcharge' || move.id === 'spark' || move.id === 'volttackle') && move.category !== 'Status') {
				target.cureStatus();
			}
		},

		onResidualOrder: 9,
		onResidual(pokemon) {
			pokemon.statusState.time--;
			if (pokemon.statusState.time <= 0) {
				this.add('-curestatus', pokemon, 'slp', '[Silent]');
				pokemon.setStatus('');

				return;
			}
		}
	},

	psn: {
		name: 'psn',
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'psn', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'psn');
			}
			this.effectState.startTime = 6;
			if(sourceEffect.effectType === 'Ability' || sourceEffect.effectType === 'Item') {
				this.effectState.startTime = 3;
			}
			this.effectState.time = this.effectState.startTime;
		},
		onResidualOrder: 9,
		onResidual(pokemon) {
			this.damage(pokemon.baseMaxhp / 6);
			if (pokemon.statusState.time <= 0) {
				this.add('-curestatus', pokemon, 'psn', '[Silent]');
				pokemon.setStatus('');
				return;
			}
		},
	},
	tox: {
		name: 'tox',
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			this.effectState.stage = 0;
			if (sourceEffect && sourceEffect.id === 'toxicorb') {
				this.add('-status', target, 'tox', '[from] item: Toxic Orb');
			} else if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'tox', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'tox');
			}
			this.effectState.startTime = 6;
			if(sourceEffect.effectType === 'Ability' || sourceEffect.effectType === 'Item') {
				this.effectState.startTime = 3;
			}
			this.effectState.time = this.effectState.startTime;
		},
		onSwitchIn() {
			this.effectState.stage = 0;
		},
		onResidualOrder: 9,
		onResidual(pokemon) {
			if (this.effectState.stage < 15) {
				this.effectState.stage++;
			}
			this.damage(this.clampIntRange(pokemon.baseMaxhp / 12, 1) * this.effectState.stage);
			if (pokemon.statusState.time <= 0) {
				this.add('-curestatus', pokemon, 'tox', '[Silent]');
				pokemon.setStatus('');
				return;
			}
		},
	},

	hail: {
		name: 'Hail',
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem('icyrock')) {
				return 8;
			}
			return 5;
		},
		onStart(battle, source, effect) {
			if (effect?.effectType === 'Ability') {
				if (this.gen <= 5) this.effectState.duration = 0;
				this.add('-weather', 'Hail', '[from] ability: ' + effect, '[of] ' + source);
			} else {
				this.add('-weather', 'Hail');
			}
		},
		onModifyMove(move) {
			if (move.secondaries && move.id !== 'secretpower') {
				for (const secondary of move.secondaries) {
					if (secondary.status !== 'frz') return;
					if (secondary.chance) secondary.chance *= 2;
				}
			}
		},
		onResidualOrder: 1,
		onResidual() {
			this.add('-weather', 'Hail', '[upkeep]');
			if (this.field.isWeather('hail')) this.eachEvent('Weather');
		},
		onWeather(target) {
			this.damage(target.baseMaxhp / 16);
		},
		onEnd() {
			this.add('-weather', 'none');
		},
	},
};
