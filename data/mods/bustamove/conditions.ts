export const Conditions: {[k: string]: ConditionData} = {
	jawlock: {
		name: 'jawlock',
		onHit(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'jawlock', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			else if {
				this.add('-status', target, 'jawlock');
			}
			}
		},
		// Damage reduction is handled directly in the sim/battle.js damage function
		onResidualOrder: 9,
		onResidual(pokemon) {
			this.damage(pokemon.baseMaxhp / 8);
		},
	},
};
