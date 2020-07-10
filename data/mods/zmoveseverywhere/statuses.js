'use strict';

/**@type {{[k: string]: EffectData}} */
let BattleStatuses = {
	desolateland: {
		name: 'DesolateLand',
		id: 'desolateland',
		num: 0,
		effectType: 'Weather',
		duration: 0,
		onTryMove(target, source, effect) {
			if (effect.type === 'Water' && effect.id !== 'depthstridedecimation' && effect.category !== 'Status') {
				this.debug('Desolate Land water suppress');
				this.add('-fail', source, effect, '[from] Desolate Land');
				return null;
			}
		},
		onWeatherModifyDamage(damage, attacker, defender, move) {
			if (move.type === 'Fire') {
				this.debug('Sunny Day fire boost');
				return this.chainModify(1.5);
			}
		},
		onStart(battle, source, effect) {
			this.add('-weather', 'DesolateLand', '[from] ability: ' + effect, '[of] ' + source);
		},
		onImmunity(type) {
			if (type === 'frz') return false;
		},
		onResidualOrder: 1,
		onResidual() {
			this.add('-weather', 'DesolateLand', '[upkeep]');
			this.eachEvent('Weather');
		},
		onEnd() {
			this.add('-weather', 'none');
		},
	},
	
	catostrophiccontinentcrash: {
		name: 'catostrophiccontinentcrash',
		id: 'catostrophiccontinentcrash',
		num: 0,
		duration: 3,
		onStart(pokemon, source) {
			this.add('-activate', pokemon, 'move: ' + this.effectData.sourceEffect, '[of] ' + source);
		},
		onResidualOrder: 11,
		onResidual(pokemon) {
			if (this.effectData.source && (!this.effectData.source.isActive || this.effectData.source.hp <= 0 || !this.effectData.source.activeTurns)) {
				delete pokemon.volatiles['partiallytrapped'];
				this.add('-end', pokemon, this.effectData.sourceEffect, '[partiallytrapped]', '[silent]');
				return;
			}
		},
		onEnd(pokemon) {
			this.add('-end', pokemon, this.effectData.sourceEffect, '[partiallytrapped]');
		},
		onTrapPokemon(pokemon) {
			if (this.effectData.source && this.effectData.source.isActive) pokemon.tryTrap();
		},
	},
	slp: {
		name: 'slp',
		id: 'slp',
		num: 0,
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'slp', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'slp');
			}
			// 1-3 turns
			this.effectData.startTime = this.random(2, 5);
			this.effectData.time = this.effectData.startTime;
		},
		onBeforeMovePriority: 10,
		onBeforeMove(pokemon, target, move) {
			if (pokemon.hasAbility('earlybird') || pokemon.volatiles['lovelylullaby']) {
				pokemon.statusData.time--;
			}
			pokemon.statusData.time--;
			if (pokemon.statusData.time <= 0) {
				pokemon.removeVolatile('lovelylullaby');
				pokemon.cureStatus();
				return;
			}
			this.add('cant', pokemon, 'slp');
			if (move.sleepUsable) {
				return;
			}
			return false;
		},
	},

};

exports.BattleStatuses = BattleStatuses;
