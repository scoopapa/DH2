export const Conditions: {[id: string]: ModdedConditionData} = {
	
supportingsong: {
			name: 'supportingsong',
			duration: 2,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Supporting Song');
				this.hint("Pokemon move's power multiplied by 1.1x");
			},
			onBasePower(basePower, user, target, move) {
			if (move.category !== 'Status') {
				this.debug('Supporting Song boost');
				this.hint("A song is supporting your moves");
				return this.chainModify([4505, 4096]);
				}
			},
			onResidual(pokemon) {
				if (pokemon.activeTurns) {
					this.effectState.duration += 1;
				}
			},
			onEnd(pokemon) {
			this.add('-end', pokemon, 'Supporting Song');
			},
		},
};
