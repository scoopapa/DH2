export const Conditions: {[k: string]: ConditionData} = {
	endlessdream: { 
		name: "Endless Dream",
		effectType: 'PseudoWeather',
		duration: 0,
		onFieldStart(field, source, effect) {
			this.add('-pseudoweather', 'EndlessDream', '[of] ' + source);
		},
		onSetStatus(status, target, source, effect) {
			if (target.hasAbility('vitalspirit') || target.hasAbility('insomnia')) return;
			if ((effect as Move)?.status || effect?.id === 'yawn') {
				this.add('-fail', target, '[from] Endless Dream');
			}
			return false;
		},
		onResidualOrder: 23,
		onEnd() {
			this.add('-fieldend', 'none');
		},
	},
};