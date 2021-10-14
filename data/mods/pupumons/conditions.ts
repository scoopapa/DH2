export const Conditions: {[k: string]: ConditionData} = {
	vacuum: {
		name: 'Vacuum',
		effectType: 'Weather',
		duration: 5,
		/*durationCallback(source, effect) {
			if (source?.hasItem('heatrock')) {
				return 8;
			}
			return 5;
		},*/
		onWeatherModifyDamage(damage, attacker, defender, move) {
			if (defender.hasItem('utilityumbrella')) return;
			if (move.type === 'Ghost') {
				this.debug('Vacuum ghost boost');
				return this.chainModify(1.5);
			}
			if (move.type === 'Rock') {
				this.debug('Vacuum rock suppress');
				return this.chainModify(0.5);
			}
			if (move.type === 'Flying') {
				this.debug('Vacuum flying boost');
				return this.chainModify(1.5);
			}
			if (move.type === 'Ground') {
				this.debug('Vacuum ground suppress');
				return this.chainModify(0.5);
			}
		},
		onStart(battle, source, effect) {
			this.field.clearTerrain();
			this.field.removePseudoWeather();
			if (effect?.effectType === 'Ability') {
				if (this.gen <= 5) this.effectData.duration = 0;
				this.add('-weather', 'Vacuum', '[from] ability: ' + effect, '[of] ' + source);
			} else {
				this.add('-weather', 'Vacuum');
			}
		},
		onImmunity(type, pokemon) {
			if (pokemon.hasItem('utilityumbrella')) return;
		},
		onResidualOrder: 1,
		onResidual() {
			this.add('-weather', 'Vacuum', '[upkeep]');
			this.eachEvent('Weather');
		},
		onEnd() {
			this.add('-weather', 'none');
		},
	},
  };
