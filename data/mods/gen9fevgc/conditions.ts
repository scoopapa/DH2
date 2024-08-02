export const Conditions: {[k: string]: ConditionData} = {
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
			// 1-3 turns
			this.effectState.startTime = this.random(2, 5);
			this.effectState.time = this.effectState.startTime;

			if (target.removeVolatile('nightmare')) {
				this.add('-end', target, 'Nightmare', '[silent]');
			}
		},
		onBeforeMovePriority: 10,
		onBeforeMove(pokemon, target, move) {
			if (pokemon.hasAbility('earlybird') || pokemon.hasAbility('sheerbird') || pokemon.hasAbility('dawnriser')) {
				pokemon.statusState.time--;
			}
			pokemon.statusState.time--;
			if (pokemon.statusState.time <= 0) {
				pokemon.cureStatus();
				return;
			}
			this.add('cant', pokemon, 'slp');
			if (move.sleepUsable) {
				return;
			}
			return false;
		},
	},
	eerieflame: {
		name: 'Eerie Flame',
		onStart(target, source, sourceEffect) {
			this.add('-start', target, 'Eerie Flames');
		},
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Fire') {
				this.debug('Eerie Flames boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Fire') {
				this.debug('Eerie Flames boost');
				return this.chainModify(1.5);
			}
		},
	},
	// Commander needs two conditions so they are implemented here
	// Great Dozo
	commanded: {
		name: "Commanded",
		noCopy: true,
		onStart(pokemon) {
			this.boost({atk: 2, spa: 2, spe: 2, def: 2, spd: 2}, pokemon);
		},
		onDragOutPriority: 2,
		onDragOut() {
			return false;
		},
		// Prevents Shed Shell allowing a swap
		onTrapPokemonPriority: -11,
		onTrapPokemon(pokemon) {
			pokemon.trapped = true;
		},
	},
	// Iron Onigiri
	commanding: {
		name: "Commanding",
		noCopy: true,
		onDragOutPriority: 2,
		onDragOut() {
			return false;
		},
		// Prevents Shed Shell allowing a swap
		onTrapPokemonPriority: -11,
		onTrapPokemon(pokemon) {
			pokemon.trapped = true;
		},
		// Override No Guard
		onInvulnerabilityPriority: 2,
		onInvulnerability(target, source, move) {
			return false;
		},
		onBeforeTurn(pokemon) {
			this.queue.cancelAction(pokemon);
		},
	},
	// Proto-boost from Jelly-Filled Drive
	droopyboost: {
		name: 'droopyboost',
		onStart(target, source, sourceEffect) {
			this.add('-start', target, 'Droopy Boost (Defense)');
			this.add('-message', `${target.name}'s Defense is being boosted!`);
		},
		onModifyDefPriority: 6,
		onModifyDef(def, pokemon) {
			this.debug('Jelly-Filled Drive def boost');
			return this.chainModify([5325, 4096]);
		},
	},
	curlyboost: {
		name: 'curlyboost',
		onStart(target, source, sourceEffect) {
			this.add('-start', target, 'Curly Boost (Attack)');
			this.add('-message', `${target.name}'s Attack is being boosted!`);
		},
		onModifyAtkPriority: 5,
		onModifyAtk(atk, pokemon) {
			this.debug('Jelly-Filled Drive def boost');
			return this.chainModify([5325, 4096]);
		},
	},
	stretchyboost: {
		name: 'stretchyboost',
		onStart(target, source, sourceEffect) {
			this.add('-start', target, 'Stretchy Boost (Speed)');
			this.add('-message', `${target.name}'s Speed is being boosted!`);
		},
		onModifySpe(spe, pokemon) {
			this.debug('Jelly-Filled Drive def boost');
			return this.chainModify([5325, 4096]);
		},
	},
};