export const Conditions: {[k: string]: ConditionData} = {
	harvestmoon: {
		name: 'Harvest Moon',
		effectType: 'Weather',
		duration: 0,
		onStart(battle, source, effect) {
			if (effect?.effectType === 'Ability') {
				if (this.gen <= 5) this.effectData.duration = 0;
				this.add('-weather', 'Harvest Moon', '[from] ability: ' + effect, '[of] ' + source);
			} else {
				this.add('-weather', 'Harvest Moon');
			}
		},
		onResidualOrder: 1,
		onResidual() {
			this.add('-weather', 'Harvest Moon', '[upkeep]');
			this.eachEvent('Weather');
			const rand = this.random(8);
			if (rand < 2) {
				this.add('-message', `The moon turns sickeningly pale...`);
				for (const pokemon of this.getAllActive()) {
					if (pokemon.hasType('Ghost')) return false;
					if (!pokemon.addType('Ghost')) return false;
					//this.add('-start', pokemon, 'typechange', 'Ghost');
					this.add('-start', pokemon, 'typeadd', 'Ghost', '[from] weather: Harvest Moon');
				}
			} else if (rand < 4) {
				this.add('-message', `The moon appears to be dripping blood...`);
				for (const pokemon of this.getAllActive()) {
					this.damage(pokemon.baseMaxhp / 8, pokemon, pokemon);
				}
			} else if (rand < 6) {
				this.add('-message', `The moon comes into its full size...`);
				for (const pokemon of this.getAllActive()) {
					this.boost({atk: 1, spa: 1}, pokemon);
				}
			} else {
				this.add('-message', `The moon glows a beautiful gold...`);
				for (const pokemon of this.getAllActive()) {
					this.heal(pokemon.baseMaxhp / 8, pokemon, pokemon);
				}
			}
		},
		onAnySetWeather(target, source, weather) {
			const strongWeathers = ['harvestmoon'];
			if (this.field.getWeather().id === 'harvestmoon' && !strongWeathers.includes(weather.id)) return false;
		},
		onEnd() {
			this.add('-weather', 'none');
		},
	},	
	vacuum: {
		name: 'Vacuum',
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem('meteorite')) {
				return 8;
			}
			return 5;
		},
		onWeatherModifyDamage(damage, attacker, defender, move) {
			if (defender.hasItem('utilityumbrella')) return;
			if (move.type === 'Ghost') {
				this.debug('Vacuum ghost boost');
				return this.chainModify([0x14CD, 0x1000]);
			}
			if (move.type === 'Rock') {
				this.debug('Vacuum rock suppress');
				return this.chainModify(0.75);
			}
			if (move.type === 'Flying') {
				this.debug('Vacuum flying boost');
				return this.chainModify([0x14CD, 0x1000]);
			}
			if (move.type === 'Ground') {
				this.debug('Vacuum ground suppress');
				return this.chainModify(0.75);
			}
		},
		onStart(battle, source, effect) {
			this.add('-message', `The battlefield is thrown into the vacuum of space!...(Ghost/Flying moves have 1.3x power, Rock/Ground moves have 0.75x power.)`);
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
