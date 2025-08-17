export const Conditions: {[id: string]: ModdedConditionData} = {
	meteorshower: {
		name: 'Meteor Shower',
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem('starsweet')) {
				return 8;
			}
			return 5;
		},
		onAnyModifyBoost(boosts, pokemon) {
			const unawareUser = this.effectState.target;
			if (unawareUser === pokemon) return;
			for (boost of boosts) {
				console.log(boost);
				if (boost < 0) boost = 0;
			}
		},
		onFieldStart(field, source, effect) {
			if (effect?.effectType === 'Ability') {
				if (this.gen <= 5) this.effectState.duration = 0;
				this.add('-weather', 'Meteor Shower', '[from] ability: ' + effect.name, '[of] ' + source);
			} else {
				this.add('-weather', 'Meteor Shower');
			}
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-weather', 'Meteor Shower', '[upkeep]');
			this.eachEvent('Weather');
		},
		onFieldEnd() {
			this.add('-weather', 'none');
		},
	},
};
