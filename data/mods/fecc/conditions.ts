export const Conditions: {[k: string]: ConditionData} = {
	alotofbees: {
		name: 'A Lot Of Bees',
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem('smoothrock')) {
				return 8;
			}
			return 5;
		},
		onWeatherModifyDamage(damage, attacker, defender, move) {
			if (defender.hasItem('utilityumbrella')) return;
			if (move.type === 'Bug') {
				this.debug('bee bug boost');
				return this.chainModify(1.5);
			}
		},
		onFieldStart(field, source, effect) {
			this.add('-message', "UNLEASH THE BEES!");
			if (effect?.effectType === 'Ability') {
				if (this.gen <= 5) this.effectState.duration = 0;
				this.add('-weather', 'A Lot Of Bees', '[from] ability: ' + effect.name, '[of] ' + source);
			} else {
				this.add('-weather', 'A Lot Of Bees');
			}
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-weather', 'A Lot Of Bees', '[upkeep]');
			if (this.field.isWeather('alotofbees')) this.eachEvent('Weather');
		},
		onWeather(target) {
			if(target.hasAbility('honeyrush')) return;
			for(const type of target.types) {
				if(['Bug', 'Ground', 'Rock', 'Steel'].includes(type)) return;
			}
			this.add('-message', `${target.name} was stung by bees!`);
			this.damage(target.baseMaxhp / 16);
		},
		onFieldEnd() {
			this.add('-message', "The bees are leaving! Bye-bye, bees!");
			this.add('-weather', 'none', '[silent]');
		},
	},
	fakedynamax: {
		inherit: true,
		duration: null,
		onStart(pokemon) {
			this.add('-start', pokemon, 'Dynamax', '[silent]');
		},
		onBeforeSwitchOutPriority: -1,
		onBeforeSwitchOut(pokemon) {
			pokemon.removeVolatile('fakedynamax');
		},
		onEnd(pokemon) {
			this.add('-end', pokemon, 'Dynamax', '[silent]');
		}
	},
};
