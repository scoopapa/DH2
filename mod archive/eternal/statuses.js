'use strict';

/**@type {{[k: string]: EffectData}} */
let BattleStatuses = {

despoilingvines: {
		name: 'despoilingvines',
		id: 'despoilingvines',
		num: 0,
		duration: 5,
		durationCallback: function (target, source) {
			if (source.hasItem('gripclaw')) return 8;
			return this.random(5, 7);
		},
		onStart: function (pokemon, source) {
			this.add('-activate', pokemon, 'move: ' + this.effectData.sourceEffect, '[of] ' + source);
		},
		onResidualOrder: 11,
		onResidual: function (pokemon) {
			if (this.effectData.source && (!this.effectData.source.isActive || this.effectData.source.hp <= 0 || !this.effectData.source.activeTurns)) {
				delete pokemon.volatiles['despoilingvines'];
				return;
			}
			if (this.effectData.source.hasItem('bindingband')) {
				this.damage(pokemon.maxhp / 6);
			} else {
				this.damage(pokemon.maxhp / 8);
			}
		},
	  onFoeAfterMove: function (source) {
		  this.heal(source.maxhp / 8);
	  },
		onEnd: function (pokemon) {
			this.add('-end', pokemon, this.effectData.sourceEffect, '[despoilingvines]');
		},
		onTrapPokemon: function (pokemon) {
			if (this.effectData.source && this.effectData.source.isActive) pokemon.tryTrap();
		},
	},
  
  };

exports.BattleStatuses = BattleStatuses;
