export const Conditions: {[k: string]: ConditionData} = {
  hail: {
  		name: 'Hail',
  		effectType: 'Weather',
  		duration: 5,
  		durationCallback(source, effect) {
  			if (source?.hasItem('icyrock')) {
  				return 8;
  			}
  			return 5;
  		},
  		onFieldStart(field, source, effect) {
  			if (effect?.effectType === 'Ability') {
  				if (this.gen <= 5) this.effectState.duration = 0;
  				this.add('-weather', 'Hail', '[from] ability: ' + effect.name, '[of] ' + source);
  			} else {
  				this.add('-weather', 'Hail');
  			}
  		},
  		onFieldResidualOrder: 1,
  		onFieldResidual() {
  			this.add('-weather', 'Hail', '[upkeep]');
  			if (this.field.isWeather('hail')) this.eachEvent('Weather');
  		},
  		onWeather(target) {
        if (this.effectState.palewinds = true) {
  			  this.damage(target.baseMaxhp / 8);
  		  } else this.damage(target.baseMaxhp / 16);
      },
  		onFieldEnd() {
  			this.add('-weather', 'none');
  		},
  },
};
