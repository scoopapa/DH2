export const Conditions: {[k: string]: ConditionData} = {
	jawlock: {
		name: 'jawlock',
		onResidual(pokemon) {
			const source = this.effectData.source;
			// G-Max Centiferno and G-Max Sandblast continue even after the user leaves the field
			const gmaxEffect = ['gmaxcentiferno', 'gmaxsandblast'].includes(this.effectData.sourceEffect.id);
		if (source && (!source.isActive || source.hp <= 0 || !source.activeTurns) && !gmaxEffect) {
			delete pokemon.volatiles['jawlock'];
			this.add('-end', pokemon, this.effectData.sourceEffect, '[jawlock]', '[silent]');
			return;
		}
		this.damage(pokemon.baseMaxhp / this.effectData.boundDivisor);
		},
	onEnd(pokemon) {
		this.add('-end', pokemon, this.effectData.sourceEffect, '[jawlock]');
	},
};
