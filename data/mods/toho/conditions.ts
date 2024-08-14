export const Conditions: {[k: string]: ConditionData} = {
	blizzard: {
		name: 'Blizzard',
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem('icyrock')) {
				return 8;
			}
			return 5;
		},
		onModifyDefPriority: 10,
		onModifyDef(def, pokemon) {
			if (pokemon.hasType('Ice') && this.field.isWeather('snow')) {
				return this.modify(def, 1.5);
			}
		},
		//todo: flip ice/fire effectiveness
		onEffectiveness(typeMod, target, type, move) {
			if (!target) return;
			if (move.type === 'Fire'){
				if (type === 'Ice') return -1;
			} else if (move.type === 'Ice' && type === 'Fire') return 1;
		},
		onFieldStart(field, source, effect) {
			if (effect?.effectType === 'Ability') {
				if (this.gen <= 5) this.effectState.duration = 0;
				this.add('-weather', 'Blizzard', '[from] ability: ' + effect.name, '[of] ' + source);
			} else {
				this.add('-weather', 'Blizzard');
			}
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-weather', 'Blizzard', '[upkeep]');
			if (this.field.isWeather('blizzard')) this.eachEvent('Weather');
		},
		onWeather(target) {
			this.damage(target.baseMaxhp / 16);
		},
		onFieldEnd() {
			this.add('-weather', 'none');
		},
	},
};
