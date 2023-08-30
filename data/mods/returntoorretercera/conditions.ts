export const Conditions: {[k: string]: ConditionData} = {
	shadowsky: {
		name: 'Shadow Sky',
		effectType: 'Weather',
		duration: 5,
		onWeatherModifyDamage(damage, attacker, defender, move) {
			if (defender.hasItem('utilityumbrella')) return;
			if (move.type === 'Shadow') {
				this.debug('Shadow Sky boost');
				return this.chainModify(1.5);
			}
		onFieldStart(field, source, effect) {
			if (effect?.effectType === 'Ability') {
				if (this.gen <= 5) this.effectState.duration = 0;
				this.add('-weather', 'Shadow Sky', '[from] ability: ' + effect.name, '[of] ' + source);
			} else {
				this.add('-weather', 'Shadow Sky');
			}
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-weather', 'Sandstorm', '[upkeep]');
			if (this.field.isWeather('shadowsky')) this.eachEvent('Weather');
		},
		onWeather(target) {
			this.damage(target.baseMaxhp / 16);
		},
		onFieldEnd() {
			this.add('-weather', 'none');
		},
	},
