export const Conditions: {[k: string]: ConditionData} = {
	silkrain: {
		name: 'SilkRain',
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem('webbedrock')) {
				return 8;
			}
			return 5;
		},
		onWeatherModifyDamage(damage, attacker, defender, move) {
			if (defender.hasItem('utilityumbrella')) return;
			if (move.type === 'Bug') {
				this.debug('silk bug boost');
				return this.chainModify(1.5);
			}
		},
		onStart(battle, source, effect) {
			if (effect?.effectType === 'Ability') {
				if (this.gen <= 5) this.effectData.duration = 0;
				this.add('-weather', 'SilkRain', '[from] ability: ' + effect, '[of] ' + source);
			} else {
				this.add('-weather', 'SilkRain');
			}
		},
		onResidualOrder: 1,
		onResidual() {
			this.add('-weather', 'SilkRain', '[upkeep]');
			if (this.field.isWeather('silkrain')) this.eachEvent('Weather');
		},
		onWeather(target){
			if(target.hasType('Bug') != true)
			{
				this.damage(target.baseMaxhp / 16);
			}
		},
		onEnd() {
			this.add('-weather', 'none');
		},
	},
};