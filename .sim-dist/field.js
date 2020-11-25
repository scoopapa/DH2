"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }/**
 * Simulator Field
 * Pokemon Showdown - http://pokemonshowdown.com/
 *
 * @license MIT
 */

var _state = require('./state');

var _dex = require('./dex');

 class Field {
	
	

	
	
	
	
	

	constructor(battle) {
		this.battle = battle;
		const fieldScripts = this.battle.format.field || this.battle.dex.data.Scripts.field;
		if (fieldScripts) Object.assign(this, fieldScripts);
		this.id = '';

		this.weather = '';
		this.weatherData = {id: ''};
		this.terrain = '';
		this.terrainData = {id: ''};
		this.pseudoWeather = {};
	}

	toJSON() {
		return _state.State.serializeField(this);
	}

	setWeather(status, source = null, sourceEffect = null) {
		status = this.battle.dex.getEffect(status);
		if (!sourceEffect && this.battle.effect) sourceEffect = this.battle.effect;
		if (!source && this.battle.event && this.battle.event.target) source = this.battle.event.target;
		if (source === 'debug') source = this.battle.sides[0].active[0];

		if (this.weather === status.id) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				if (this.battle.gen > 5 || this.weatherData.duration === 0) {
					return false;
				}
			} else if (this.battle.gen > 2 || status.id === 'sandstorm') {
				return false;
			}
		}
		if (source) {
			const result = this.battle.runEvent('SetWeather', source, source, status);
			if (!result) {
				if (result === false) {
					if (_optionalChain([(sourceEffect ), 'optionalAccess', _ => _.weather])) {
						this.battle.add('-fail', source, sourceEffect, '[from] ' + this.weather);
					} else if (sourceEffect && sourceEffect.effectType === 'Ability') {
						this.battle.add('-ability', source, sourceEffect, '[from] ' + this.weather, '[fail]');
					}
				}
				return null;
			}
		}
		const prevWeather = this.weather;
		const prevWeatherData = this.weatherData;
		this.weather = status.id;
		this.weatherData = {id: status.id};
		if (source) {
			this.weatherData.source = source;
			this.weatherData.sourcePosition = source.position;
		}
		if (status.duration) {
			this.weatherData.duration = status.duration;
		}
		if (status.durationCallback) {
			if (!source) throw new Error(`setting weather without a source`);
			this.weatherData.duration = status.durationCallback.call(this.battle, source, source, sourceEffect);
		}
		if (!this.battle.singleEvent('Start', status, this.weatherData, this, source, sourceEffect)) {
			this.weather = prevWeather;
			this.weatherData = prevWeatherData;
			return false;
		}
		this.battle.runEvent('WeatherStart', source, source, status);
		return true;
	}

	clearWeather() {
		if (!this.weather) return false;
		const prevWeather = this.getWeather();
		this.battle.singleEvent('End', prevWeather, this.weatherData, this);
		this.weather = '';
		this.weatherData = {id: ''};
		return true;
	}

	effectiveWeather() {
		if (this.suppressingWeather()) return '';
		return this.weather;
	}

	suppressingWeather() {
		for (const side of this.battle.sides) {
			for (const pokemon of side.active) {
				if (pokemon && !pokemon.ignoringAbility() && pokemon.getAbility().suppressWeather) {
					return true;
				}
			}
		}
		return false;
	}

	isWeather(weather) {
		const ourWeather = this.effectiveWeather();
		if (!Array.isArray(weather)) {
			return ourWeather === _dex.toID.call(void 0, weather);
		}
		return weather.map(_dex.toID).includes(ourWeather);
	}

	getWeather() {
		return this.battle.dex.getEffectByID(this.weather);
	}

	setTerrain(status, source = null, sourceEffect = null) {
		status = this.battle.dex.getEffect(status);
		if (!sourceEffect && this.battle.effect) sourceEffect = this.battle.effect;
		if (!source && this.battle.event && this.battle.event.target) source = this.battle.event.target;
		if (source === 'debug') source = this.battle.sides[0].active[0];
		if (!source) throw new Error(`setting terrain without a source`);

		if (this.terrain === status.id) return false;
		const prevTerrain = this.terrain;
		const prevTerrainData = this.terrainData;
		this.terrain = status.id;
		this.terrainData = {
			id: status.id,
			source,
			sourcePosition: source.position,
			duration: status.duration,
		};
		if (status.durationCallback) {
			this.terrainData.duration = status.durationCallback.call(this.battle, source, source, sourceEffect);
		}
		if (!this.battle.singleEvent('Start', status, this.terrainData, this, source, sourceEffect)) {
			this.terrain = prevTerrain;
			this.terrainData = prevTerrainData;
			return false;
		}
		this.battle.runEvent('TerrainStart', source, source, status);
		return true;
	}

	clearTerrain() {
		if (!this.terrain) return false;
		const prevTerrain = this.getTerrain();
		this.battle.singleEvent('End', prevTerrain, this.terrainData, this);
		this.terrain = '';
		this.terrainData = {id: ''};
		return true;
	}

	effectiveTerrain(target) {
		if (this.battle.event && !target) target = this.battle.event.target;
		return this.battle.runEvent('TryTerrain', target) ? this.terrain : '';
	}

	isTerrain(terrain, target) {
		const ourTerrain = this.effectiveTerrain(target);
		if (!Array.isArray(terrain)) {
			return ourTerrain === _dex.toID.call(void 0, terrain);
		}
		return terrain.map(_dex.toID).includes(ourTerrain);
	}

	getTerrain() {
		return this.battle.dex.getEffectByID(this.terrain);
	}

	addPseudoWeather(
		status,
		source = null,
		sourceEffect = null
	) {
		if (!source && this.battle.event && this.battle.event.target) source = this.battle.event.target;
		if (source === 'debug') source = this.battle.sides[0].active[0];
		status = this.battle.dex.getEffect(status);

		let effectData = this.pseudoWeather[status.id];
		if (effectData) {
			if (!status.onRestart) return false;
			return this.battle.singleEvent('Restart', status, effectData, this, source, sourceEffect);
		}
		effectData = this.pseudoWeather[status.id] = {
			id: status.id,
			source,
			sourcePosition: _optionalChain([source, 'optionalAccess', _2 => _2.position]),
			duration: status.duration,
		};
		if (status.durationCallback) {
			if (!source) throw new Error(`setting fieldcond without a source`);
			effectData.duration = status.durationCallback.call(this.battle, source, source, sourceEffect);
		}
		if (!this.battle.singleEvent('Start', status, effectData, this, source, sourceEffect)) {
			delete this.pseudoWeather[status.id];
			return false;
		}
		return true;
	}

	getPseudoWeather(status) {
		status = this.battle.dex.getEffect(status);
		return this.pseudoWeather[status.id] ? status : null;
	}

	removePseudoWeather(status) {
		status = this.battle.dex.getEffect(status);
		const effectData = this.pseudoWeather[status.id];
		if (!effectData) return false;
		this.battle.singleEvent('End', status, effectData, this);
		delete this.pseudoWeather[status.id];
		return true;
	}

	destroy() {
		// deallocate ourself

		// get rid of some possibly-circular references
		(this ).battle = null;
	}
} exports.Field = Field;
