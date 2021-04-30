export const Conditions: {[k: string]: ConditionData} = {
	jawlock: {
		name: 'jawlock',
		onStart(pokemon, source) {
			this.add('-activate', pokemon, 'move: ' + this.effectData.sourceEffect, '[of] ' + source);
		},
		onHit(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'jawlock');
			}
		},
		onResidualOrder: 9,
		onResidual(pokemon) {
			this.damage(pokemon.baseMaxhp / 8);
		},
		onEnd(pokemon) {
			this.add('-end', pokemon, this.effectData.sourceEffect, '[jawlock]');
		},
	},
};
