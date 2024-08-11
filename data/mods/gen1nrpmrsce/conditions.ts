export const Conditions: {[id: string]: ModdedConditionData} = {
	slp: {
		name: 'slp',
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Move') {
				this.add('-status', target, 'slp', '[from] move: ' + sourceEffect.name);
			} else {
				this.add('-status', target, 'slp');
			}
			// 1-7 turns
			this.effectState.startTime = this.random(1, 4);
			this.effectState.time = this.effectState.startTime;

			if (target.removeVolatile('nightmare')) {
				this.add('-end', target, 'Nightmare', '[silent]');
			}
		},
		onBeforeMovePriority: 10,
		onBeforeMove(pokemon, target, move) {
			pokemon.statusState.time--;
			if (pokemon.statusState.time > 0) {
				this.add('cant', pokemon, 'slp');
			}
			pokemon.lastMove = null;
			return false;
		},
		onAfterMoveSelfPriority: 3,
		onAfterMoveSelf(pokemon) {
			if (pokemon.statusState.time <= 0) pokemon.cureStatus();
		},
	},
};
