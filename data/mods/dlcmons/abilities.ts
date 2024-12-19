export const Abilities: {[abilityid: string]: ModdedAbilityData} = {
	swiftretreat: {
		// try to code this?
		// come on, you can do it
		// you can do it!
		// you can do it!
		// you can do it!
		// you can do it!
		// Please do it instead of saying "you can do it!"
		// I can't do it, I'm sorry
		// I can't do it, I'm sorry
		// I can't do it, I'm sorry
		// you can do it!
		// you can do it!
		// you can do it!
		// AAAAAAAAAAAAAAAAAAAAAAAAAAA
		// AAAAAAAAAAAAAAAAAAAAAAAAAAA
		// AAAAAAAAAAAAAAAAAAAAAAAAAAA
		// What is love
		// Baby don't hurt me
		// Don't hurt me
		// No more
		name: "Swift Retreat",
		desc: "This Pokemon can choose to switch out on the second turn of moves with a charge turn of invulnerability instead of attacking. This list does not include Sky Drop.",
		shortDesc: "This Pokemon can choose to switch out on the second turn of a two-turn move.",
		num: -1,
		rating: 3,
	},
	lightpower: {
		onModifySpAPriority: 5,
		onModifySpA(spa) {
			return this.chainModify(2);
		},
		name: "Light Power",
		shortDesc: "This Pokemon's Special Attack is doubled.",
		rating: 5,
		num: -2,
	},
	seedsower: {
		onDamagingHit(damage, target, source, move) {
			this.field.setTerrain('grassyterrain');
		},
		flags: {},
		name: "Seed Sower",
		rating: 2.5,
		num: 269,
	},
	flowergift: {
		inherit: true,
		onStart(pokemon) {
			this.singleEvent('WeatherChange', this.effect, this.effectState, pokemon);
		},
		onWeatherChange(pokemon) {
			if (!pokemon.isActive || (pokemon.baseSpecies.baseSpecies !== 'Cherrim' && pokemon.baseSpecies.baseSpecies !== 'Glimmaltis') || pokemon.transformed) return;
			if (!pokemon.hp) return;
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				if (pokemon.species.id !== 'cherrimsunshine') {
					pokemon.formeChange('Cherrim-Sunshine', this.effect, false, '[msg]');
				}
			} else {
				if (pokemon.species.id === 'cherrimsunshine') {
					pokemon.formeChange('Cherrim', this.effect, false, '[msg]');
				}
			}
		},
		onAllyModifyAtkPriority: 3,
		onAllyModifyAtk(atk, pokemon) {
			if (this.effectState.target.baseSpecies.baseSpecies !== 'Cherrim') return;
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
		onAllyModifySpDPriority: 4,
		onAllyModifySpD(spd, pokemon) {
			if (this.effectState.target.baseSpecies.baseSpecies !== 'Cherrim') return;
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, breakable: 1},
	},
};
