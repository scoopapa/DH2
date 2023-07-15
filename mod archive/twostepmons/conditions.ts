export const Conditions: {[k: string]: ConditionData} = {
	moraleboost: {
		name: 'Morale Boost',
		// this is a volatile status
		duration: 5,
		onStart(target, source, sourceEffect) {
			this.add('-start', target, 'moraleboost');
			this.effectData.firstAtk = false;
		},
		onEnd(target) {
			this.add('-end', target, 'moraleboost');
		},
		onModifyDamage(damage, source, target, move) {
			if (!this.effectData.firstAtk) {
				this.effectData.firstAtk = true;
				return this.chainModify(1.3);
			}
		},
		onSetStatus(status, target, source, effect) {
			if (effect && ((effect as Move).status || effect.id === 'yawn')) {
				this.add('-activate', target, 'condition: Morale Boost');
			}
			return false;
		},
	},
};
