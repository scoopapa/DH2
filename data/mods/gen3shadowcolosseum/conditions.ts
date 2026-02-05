export const Conditions: import('../../../sim/dex-conditions').ModdedConditionDataTable = {
	shadow: {
		name: 'Shadow',
		noCopy: true,
		onStart(pokemon) {
			this.add('-activate', pokemon, 'shadow');
		},
		onEnd(pokemon) {
			this.add('-end', pokemon, 'shadow');
		},
	},
	shadowsky: {
		name: 'Shadow Sky',
		effectType: 'Weather',
		duration: 5,
		onFieldStart(field, source, effect) {
			if (effect?.effectType === 'Ability') {
				if (this.gen <= 5) this.effectState.duration = 0;
				this.add('-weather', 'Shadow Sky', '[from] ability: ' + effect.name, '[of] ' + source);
			} else {
				this.add('-weather', 'Shadow Sky');
			}
			this.add('-message', `A shadowy aura filled the sky!`);
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-weather', 'Shadow Sky', '[upkeep]');
			this.add('-message', `The shadowy aura persists!`);
			if (this.field.isWeather('shadowsky')) this.eachEvent('Weather');
		},
		onWeather(target) {
			if (!target.volatiles['shadow']) {
				this.damage(target.baseMaxhp / 8);
				this.add('-message', `A flashing light strikes ${target.name}!`);
			}
		},
		onFieldEnd() {
			this.add('-weather', 'none');
			this.add('-message', `The shadowy aura faded away...`);
		},
	},
};
