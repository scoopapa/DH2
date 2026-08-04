export const Conditions: {[id: string]: ModdedConditionData} = {
	//nonvolatiles
	brn: {
		inherit: true,
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.id === 'flameorb') {
				this.add('-status', target, 'brn', '[from] item: Flame Orb');
			} else if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'brn', '[from] ability: ' + sourceEffect.name, `[of] ${source}`);
			} else {
				this.add('-status', target, 'brn');
			}
			this.hint("At the end of each turn, burned Pokemon lose 1/4 max HP, but this amount is halved for each 100 raw Attack it has.");
		},
		onResidualOrder: 10,
		onResidual(pokemon) {
			let damage = pokemon.baseMaxhp / 4;
			this.damage(damage / (2 ** Math.floor(pokemon.getStat('atk') / 100)));
		},
	},
	par: {
		name: 'par',
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'par', '[from] ability: ' + sourceEffect.name, `[of] ${source}`);
			} else {
				this.add('-status', target, 'par');
			}
			this.hint("Paralyzed Pokemon have halved Speed and lose 1/8 max HP after they move.");
		},
		onModifySpePriority: -101,
		onModifySpe(spe, pokemon) {
			// Paralysis occurs after all other Speed modifiers, so evaluate all modifiers up to this point first
			spe = this.finalModify(spe);
			if (!pokemon.hasAbility('quickfeet')) {
				spe = Math.floor(spe * 50 / 100);
			}
			return spe;
		},
		onAfterMove(pokemon) {
			this.damage(pokemon.baseMaxhp / 8);
		},
	},
	slp: {
		name: 'slp',
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'slp', '[from] ability: ' + sourceEffect.name, `[of] ${source}`);
			} else if (sourceEffect && sourceEffect.effectType === 'Move') {
				this.add('-status', target, 'slp', `[from] move: ${sourceEffect.name}`);
			} else {
				this.add('-status', target, 'slp');
			}
			this.hint("Asleep Pokemon fail to move every other turn.");
			this.effectState.canMove = true;

			if (target.removeVolatile('nightmare')) {
				this.add('-end', target, 'Nightmare', '[silent]');
			}
		},
		onBeforeMovePriority: 10,
		onBeforeMove(pokemon, target, move) {
			if (pokemon.statusState.canMove) {
				pokemon.statusState.canMove = false;
				return;
			}
			this.add('cant', pokemon, 'slp');
			if (move.sleepUsable) {
				return;
			}
			pokemon.statusState.canMove = true;
			return false;
		},
	},
	frz: {
		name: 'frz',
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'frz', '[from] ability: ' + sourceEffect.name, `[of] ${source}`);
			} else {
				this.add('-status', target, 'frz');
			}
			this.hint("Frozen Pokemon lose an additional 1/16 max HP after each instance of damage.");
			if (target.species.name === 'Shaymin-Sky' && target.baseSpecies.baseSpecies === 'Shaymin') {
				target.formeChange('Shaymin', this.effect, true);
			}
		},
		onDamage(damage, target, source, effect) {
			if (effect?.id === 'frz') return;
			this.damage(target.baseMaxhp / 16, target, target, this.effect);
		},
	},
	pur: {
		name: 'pur',
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'pur', '[from] ability: ' + sourceEffect.name, `[of] ${source}`, '[silent]');
			} else {
				this.add('-status', target, 'pur', '[silent]');
			}
			this.add('-message', `${target.name} was purified!`);
			this.hint("Purified Pokemon cannot use moves matching its type(s).");
		},
		onDisableMove(pokemon) {
			for (const moveSlot of pokemon.moveSlots) {
				const move = this.dex.moves.get(moveSlot.id);
				if (pokemon.hasType(move.type)) {
					pokemon.disableMove(moveSlot.id);
				}
			}
		},
		onBeforeMovePriority: 5,
		onBeforeMove(attacker, defender, move) {
			if (!(move.isZ && move.isZOrMaxPowered) && attacker.hasType(move.type)) {
				this.add('cant', attacker, move);
				return false;
			}
		},
	},
	
	//volatiles
	confusion: {
		name: 'confusion',
		// this is a volatile status
		onStart(target, source, sourceEffect) {
			if (sourceEffect?.id === 'lockedmove') {
				this.add('-start', target, 'confusion', '[fatigue]');
			} else if (sourceEffect?.effectType === 'Ability') {
				this.add('-start', target, 'confusion', '[from] ability: ' + sourceEffect.name, `[of] ${source}`);
			} else {
				this.add('-start', target, 'confusion');
			}
			this.hint("Confused Pokemon use doubled PP on each move.");
		},
		onEnd(target) {
			this.add('-end', target, 'confusion');
		},
		onBeforeMovePriority: 3,
		onBeforeMove(pokemon) {
			this.add('-activate', pokemon, 'confusion');
		},
		onAfterMoveSelfPriority: 3,
		onAfterMoveSelf(pokemon) {
			let move: Move | ActiveMove | null = pokemon.lastMove;
			if (!move || move.isZ) return;
			if (move.isMax && move.baseMove) move = this.dex.moves.get(move.baseMove);
			pokemon.deductPP(move.id, 1);
		},
	},
	enervate: {
		name: 'enervate',
		// this is a volatile status
		onStart(target, source, sourceEffect) {
			this.add('-start', target, 'enervate', '[silent]');
			this.add('-message', `${target.name} was enervated!`);
			this.hint("Enervated Pokemon lose HP equal to the difference between its opponent's raw Sp. Attack and its own.");
			if (target.adjacentFoes().length == 0) return;
			const foe = target.adjacentFoes()[0];
			const damage = foe.getStat('spa') - target.getStat('spa');
			if (damage > 0) this.damage(damage, target, target);
		},
	},
	doom: {
		name: 'doom',
		// this is a volatile status
		onStart(target, source, sourceEffect) {
			this.add('-message', `${target.name} felt a sense of doom!`);
			this.hint("Pokemon with Doom faint at the end of the turn when the amount of Doom stacks is greater or equal to its HP. It stacks, but half is lost on switch.");
		},
		onRestart(target, source, sourceEffect) {
			this.add('-message', `${target.name}'s sense of doom grows!`);
		},
		onResidualOrder: 10,
		onResidual(pokemon) {
			if (!pokemon.doom) return;
			if (pokemon.doom >= pokemon.hp) {
				this.add('-message', `${pokemon.name} was dragged into the depths!`);
				pokemon.faint();
			}
		},
		onSwitchOut(pokemon) {
			if (!pokemon.doom) return;
			if (this.getAllActive().some(active => active.hasAbility('darkaura'))) return;
			pokemon.doom = Math.floor(pokemon.doom / 2);
		},
	},
	stun: {
		name: 'stun',
		// this is a volatile status
		onStart(target, source, sourceEffect) {
			this.add('-start', target, 'stun', '[silent]');
			this.add('-message', `${target} was stunned!`);
			this.hint("Stunned Pokemon take doubled damage from indirect sources.");
		},
		onDamage(damage, target, source, effect) {
			if (effect.effectType !== 'Move') {
				return damage * 2;
			}
		},
	},
	trapped: {
		name: 'trapped',
		duration: 2,
		durationCallback(target, source) {
			if (source?.hasItem('gripclaw')) return 4;
			return 2;
		},
		noCopy: true,
		onTrapPokemon(pokemon) {
			pokemon.tryTrap();
		},
		onStart(target) {
			this.add('-activate', target, 'trapped');
		},
	},

	//weathers
	sandstorm: {
		inherit: true,
		onFieldStart(field, source, effect) {
			if (effect?.effectType === 'Ability') {
				if (this.gen <= 5) this.effectState.duration = 0;
				this.add('-weather', 'Sandstorm', '[from] ability: ' + effect.name, `[of] ${source}`);
			} else {
				this.add('-weather', 'Sandstorm');
			}
			this.field.sandForceStacks = (this.field.sandForceStacks || 0) + 1;
		},
	},
};
