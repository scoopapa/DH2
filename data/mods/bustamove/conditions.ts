export const Conditions: {[k: string]: ConditionData} = {
	jawlock: {
		name: 'jawlock',
		onStart(target) {
			this.add('-activate', target, 'jawlock');
		},
		onHit(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'jawlock');
			}
		},
		onResidualOrder: 9,
		onResidual(pokemon) {
			const source = this.effectData.source;
			const gmaxEffect = ['gmaxcentiferno', 'gmaxsandblast'].includes(this.effectData.sourceEffect.id);
			if (source && (!source.isActive || source.hp <= 0 || !source.activeTurns) && !gmaxEffect) {
				delete pokemon.volatiles['jawlock'];
				this.add('-end', pokemon, this.effectData.sourceEffect, '[jawlock]', '[silent]');
				return;
			}
			this.damage(pokemon.baseMaxhp / 8);
		},
		onEnd(pokemon) {
			this.add('-end', pokemon, this.effectData.sourceEffect, '[jawlock]');
		},
	},
};
