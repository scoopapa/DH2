export const Conditions: import('../../../sim/dex-conditions').ModdedConditionDataTable = {
	slp: {
		name: 'slp',
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Move') {
				this.add('-status', target, 'slp', '[from] move: ' + sourceEffect.name);
			} else {
				this.add('-status', target, 'slp');
			}
			// 1-4 turns
			this.effectState.time = this.random(2, 6);
			// Turns spent using Sleep Talk/Snore immediately before switching out while asleep
			this.effectState.skippedTime = 0;

			if (target.removeVolatile('nightmare')) {
				this.add('-end', target, 'Nightmare', '[silent]');
			}
		},
		onSwitchIn(target) {
			this.effectState.time += this.effectState.skippedTime;
			this.effectState.skippedTime = 0;
		},
		onBeforeMovePriority: 10,
		onBeforeMove(pokemon, target, move) {
			if (pokemon.hasAbility('earlybird')) {
				pokemon.statusState.time--;
			}
			pokemon.statusState.time--;
			if (pokemon.statusState.time <= 0) {
				pokemon.cureStatus();
				return;
			}
			this.add('cant', pokemon, 'slp');
			if (move.sleepUsable) {
				this.effectState.skippedTime++;
				return;
			}
			this.effectState.skippedTime = 0;
			return false;
		},
	},
	frz: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			// don't count Hidden Power or Weather Ball as Fire-type
			if (this.dex.moves.get(move.id).type === 'Fire' && move.category !== 'Status') {
				target.cureStatus();
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
		},
		onModifySpePriority: -101,
		onModifySpe(spe, pokemon) {
			// Paralysis occurs after all other Speed modifiers, so evaluate all modifiers up to this point first
			spe = this.finalModify(spe);
			if (!pokemon.hasAbility('quickfeet')) {
				return this.chainModify(0.25);
			}
			return spe;
		},
	},
	sandstorm: {
		inherit: true,
		onModifySpD() {},
	},
};
