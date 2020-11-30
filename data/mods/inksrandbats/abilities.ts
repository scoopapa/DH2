export const Abilities: {[abilityid: string]: AbilityData} = {
	iceface: {
		onStart(pokemon) {
			if (this.field.isWeather('hail') && (this.field.weatherData.layers !== 0) && pokemon.species.id === 'eiscuenoice' && !pokemon.transformed) {
				this.add('-activate', pokemon, 'ability: Ice Face');
				this.effectData.busted = false;
				pokemon.formeChange('Eiscue', this.effect, true);
			}
			else if (this.field.isWeather('hail') && (this.field.weatherData.layers !== 0) && pokemon.species.id === 'castform' && !pokemon.transformed) {
				this.add('-activate', pokemon, 'ability: Ice Face');
				this.effectData.busted = false;
				pokemon.formeChange('Castform-Snowy', this.effect, true);
			}
		},
		onDamagePriority: 1,
		onDamage(damage, target, source, effect) {
			if (
				effect && effect.effectType === 'Move' && effect.category === 'Physical' &&
				 target.species.id === 'eiscue' || target.species.id === 'castformsnowy'  && !target.transformed
			) {
				this.add('-activate', target, 'ability: Ice Face');
				this.effectData.busted = true;
				return 0;
			}
		},
		onCriticalHit(target, type, move) {
			if (!target) return;
			if (move.category !== 'Physical' ||  target.species.id === 'eiscuenoice' || target.species.id === 'castform'  || target.transformed) return;
			if (target.volatiles['substitute'] && !(move.flags['authentic'] || move.infiltrates)) return;
			if (!target.runImmunity(move.type)) return;
			return false;
		},
		onEffectiveness(typeMod, target, type, move) {
			if (!target) return;
			if (move.category !== 'Physical' || target.species.id === 'eiscuenoice' || target.species.id === 'castform' || target.transformed) return;
			if (target.volatiles['substitute'] && !(move.flags['authentic'] || move.infiltrates)) return;
			if (!target.runImmunity(move.type)) return;
			return 0;
		},
		onUpdate(pokemon) {
			if (pokemon.species.id === 'eiscue' && this.effectData.busted) {
				pokemon.formeChange('Eiscue-Noice', this.effect, true);
			}
			else if (pokemon.species.id === 'castformsnowy' && this.effectData.busted) {
				pokemon.formeChange('Castform', this.effect, true);
			}
		},
		onAnyWeatherStart() {
			const pokemon = this.effectData.target;
			if (this.field.isWeather('hail') && (this.field.weatherData.layers !== 0) && pokemon.species.id === 'eiscuenoice' && !pokemon.transformed) {
				this.add('-activate', pokemon, 'ability: Ice Face');
				this.effectData.busted = false;
				pokemon.formeChange('Eiscue', this.effect, true);
			}
			if (this.field.isWeather('hail') && (this.field.weatherData.layers !== 0) && pokemon.species.id === 'castform' && !pokemon.transformed) {
				this.add('-activate', pokemon, 'ability: Ice Face');
				this.effectData.busted = false;
				pokemon.formeChange('Castform-Snowy', this.effect, true);
			}
		},
		isPermanent: true,
		name: "Ice Face",
		rating: 3,
		num: 248,
	},
	
	snowwarning: {
		onStart(source) {
			this.field.weatherData.layers ++; 
			this.add('-activate', source, 'ability: Snow Warning');
			this.hint("The hailstorm has worsened!");
		},
		name: "Snow Warning",
		rating: 4,
		num: 117,
	},
	
	drought: {
		onStart(source) { //Nullify hail
			this.field.weatherData.layers = 0; 
			this.add('-activate', source, 'ability: Drought');
			this.hint("The hailstorm has eased!");
		},
		onSourceModifyDamage(damage, source, target, move) { //Water resist
			if (move.type === 'Water') {
				this.debug('Drought resist');
				return this.chainModify(0.5);
			}
		},
		onUpdate(pokemon) { //Cannot be frozen
			if (pokemon.status === 'frz') {
				this.add('-activate', pokemon, 'ability: Drought');
				pokemon.cureStatus();
			}
		},
		onImmunity(type, pokemon) { //Cannot be frozen
			if (type === 'frz') return false;
		},
		name: "Drought",
		rating: 4,
		num: 70,
	},
	
	slushrush: { //Doesn't activate on level 0 hail
		onModifySpe(spe, pokemon) {
			if (this.field.isWeather('hail') && (this.field.weatherData.layers !== 0)) {
				return this.chainModify(2);
			}
		},
		name: "Slush Rush",
		rating: 3,
		num: 202,
	},
	
	snowcloak: { //Doesn't activate on level 0 hail
		onImmunity(type, pokemon) {
			if (type === 'hail') return false;
		},
		onModifyAccuracyPriority: 8,
		onModifyAccuracy(accuracy) {
			if (typeof accuracy !== 'number') return;
			if (this.field.isWeather('hail') && (this.field.weatherData.layers !== 0)) {
				this.debug('Snow Cloak - decreasing accuracy');
				return accuracy * 0.8;
			}
		},
		name: "Snow Cloak",
		rating: 1.5,
		num: 81,
	},
	
	icebody: {
		onWeather(target, source, effect) {
			if (effect.id === 'hail' && (this.field.weatherData.layers !== 0)) {
				this.heal(target.baseMaxhp / 16);
			}
		},
		onImmunity(type, pokemon) {
			if (type === 'hail') return false;
		},
		name: "Ice Body",
		rating: 1,
		num: 115,
	},
};