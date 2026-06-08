export const Conditions: import('../sim/dex-conditions').ConditionDataTable = {
	// Custom mechanics
	
	loafing: {
		name: 'loafing',
		onStart(pokemon) {
			this.effectState.loafChance = 0;
		},
		onBeforeMovePriority: 1,
		onBeforeMoveSubPriority: 1,
		onBeforeMove(pokemon, target, move) {
			if (pokemon.hasAbility('tooserious')) return;
			if (pokemon.side.active.concat(pokemon.side.foe.active).some(p => p.hasAbility('intimidation'))) return;
			const loafChance = pokemon.side.active.some(p => p.hasAbility('strict'))
				? Math.floor(this.effectState.loafChance / 2)
				: this.effectState.loafChance;
			if (loafChance >= 100 || this.randomChance(loafChance, 100)) {
				this.add('-message', `${pokemon.name} is loafing around!`);
				this.add('-anim', pokemon, 'Rest', pokemon);
				pokemon.loafedThisTurn = true;
				if (pokemon.hasItem('sleepnstudy')) {
					this.boost({atk: 1, def: 1, spa: 1, spe: 1}, pokemon);
					this.add('-message', `${pokemon.name} studied in its sleep!`);
				}
				if (pokemon.hasAbility('loiterer')) {
					this.add('-ability', pokemon, 'Loiterer');
					this.heal(pokemon.baseMaxhp / 3);
				}
				if (pokemon.hasAbility('skilledloafer')) {
					this.add('-ability', pokemon, 'Skilled Loafer');
					this.heal(pokemon.baseMaxhp / 3);
				}
				return false;
			}
		},
	},
	bleed: {
		name: 'bleed',
		onResidualOrder: 10,
		onResidual(pokemon) {
			this.damage(Math.floor(pokemon.baseMaxhp / 8), pokemon);
			pokemon.removeVolatile('bleed');
		},
		onStart(pokemon) {
			this.add('-message', `${pokemon.name} is bleeding!`);
		},
	},

	// Champions mechanics

	par: {
		inherit: true,
		onBeforeMove(pokemon) {
			if (this.randomChance(1, 8)) {
				this.add('cant', pokemon, 'par');
				return false;
			}
		},
	},
	slp: {
		inherit: true,
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'slp', '[from] ability: ' + sourceEffect.name, `[of] ${source}`);
			} else if (sourceEffect && sourceEffect.effectType === 'Move') {
				this.add('-status', target, 'slp', `[from] move: ${sourceEffect.name}`);
			} else {
				this.add('-status', target, 'slp');
			}

			// 1/3 chance for a Pokemon to wake up on turn 2
			this.effectState.startTime = this.sample([2, 3, 3]);
			this.effectState.time = this.effectState.startTime;

			if (target.removeVolatile('nightmare')) {
				this.add('-end', target, 'Nightmare', '[silent]');
			}
		},
	},
	frz: {
		inherit: true,
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'frz', '[from] ability: ' + sourceEffect.name, `[of] ${source}`);
			} else {
				this.add('-status', target, 'frz');
			}
			if (target.species.name === 'Shaymin-Sky' && target.baseSpecies.baseSpecies === 'Shaymin') {
				target.formeChange('Shaymin', this.effect, true);
			}

			this.effectState.startTime = 3;
			this.effectState.time = this.effectState.startTime;
		},
		onBeforeMove(pokemon, target, move) {
			if (move.flags['defrost'] && !(move.id === 'burnup' && !pokemon.hasType('Fire'))) return;
			pokemon.statusState.time--;
			if (pokemon.statusState.time <= 0 || this.randomChance(1, 4)) {
				pokemon.cureStatus();
				return;
			}
			this.add('cant', pokemon, 'frz');
			return false;
		},
	},
};