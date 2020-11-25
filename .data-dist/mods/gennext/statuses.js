"use strict";Object.defineProperty(exports, "__esModule", {value: true}); const Statuses = {
	frz: {
		name: 'frz',
		effectType: 'Status',
		onStart(target) {
			this.add('-status', target, 'frz');
		},
		duration: 2,
		onBeforeMovePriority: 2,
		onBeforeMove(pokemon, target, move) {
			if (move.flags['defrost']) {
				pokemon.cureStatus();
				return;
			}
			this.add('cant', pokemon, 'frz');
			return false;
		},
		onHit(target, source, move) {
			if (move.type === 'Fire' && move.category !== 'Status' || move.flags['defrost']) {
				target.cureStatus();
			}
		},
		onEnd(target) {
			this.add('-curestatus', target, 'frz');
		},
	},
	lockedmove: {
		// Outrage, Thrash, Petal Dance...
		name: 'lockedmove',
		durationCallback() {
			return this.random(2, 4);
		},
		onResidual(target) {
			const move = target.lastMove ;
			if (!move.self || (move.self !== true && move.self.volatileStatus !== 'lockedmove')) {
				// don't lock, and bypass confusion for calming
				delete target.volatiles['lockedmove'];
			} else if (target.ability === 'owntempo') {
				// Own Tempo prevents locking
				delete target.volatiles['lockedmove'];
			}
		},
		onEnd(target) {
			target.addVolatile('confusion');
		},
		onLockMove(pokemon) {
			return pokemon.lastMove.id;
		},
	},
	confusion: {
		// this is a volatile status
		name: 'confusion',
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.id === 'lockedmove') {
				this.add('-start', target, 'confusion', '[fatigue]');
			} else {
				this.add('-start', target, 'confusion');
			}
			this.effectData.time = this.random(3, 4);
		},
		onEnd(target) {
			this.add('-end', target, 'confusion');
		},
		onBeforeMove(pokemon) {
			pokemon.volatiles.confusion.time--;
			if (!pokemon.volatiles.confusion.time) {
				pokemon.removeVolatile('confusion');
				return;
			}
			const damage = this.getDamage(pokemon, pokemon, 40);
			if (typeof damage !== 'number') throw new Error("Confusion damage not dealt");
			this.directDamage(damage);
		},
	},

	// weather!

	raindance: {
		inherit: true,
		onBasePower(basePower, attacker, defender, move) {
			if (move.id === 'scald' || move.id === 'steameruption') {
				return;
			}
			if (move.type === 'Water') {
				this.debug('rain water boost');
				return basePower * 1.5;
			}
			if (move.type === 'Fire') {
				this.debug('rain fire suppress');
				return basePower * 0.5;
			}
		},
	},
	sunnyday: {
		inherit: true,
		onBasePower(basePower, attacker, defender, move) {
			if (move.id === 'scald' || move.id === 'steameruption') {
				return;
			}
			if (move.type === 'Fire') {
				this.debug('Sunny Day fire boost');
				return basePower * 1.5;
			}
			if (move.type === 'Water') {
				this.debug('Sunny Day water suppress');
				return basePower * 0.5;
			}
		},
	},

	// intrinsics!

	bidestall: {
		name: 'bidestall',
		duration: 3,
	},

	unown: {
		// Unown: Shadow Tag
		onImmunity(type, pokemon) {
			if (type === 'Ground' && !this.suppressingAttackEvents(pokemon)) return false;
		},
		onStart(pokemon) {
			if (pokemon.ability === 'levitate') {
				pokemon.ability = 'shadowtag' ;
				pokemon.baseAbility = 'shadowtag' ;
			}
			if (pokemon.transformed) return;
			pokemon.setType(pokemon.hpType || 'Dark');
		},
	},
	bronzong: {
		// Bronzong: Heatproof
		onImmunity(type, pokemon) {
			if (type === 'Ground' && !this.suppressingAttackEvents(pokemon)) return false;
		},
		onStart(pokemon) {
			if (pokemon.ability === 'levitate') {
				pokemon.ability = 'heatproof' ;
				pokemon.baseAbility = 'heatproof' ;
			}
		},
	},
	weezing: {
		// Weezing: Aftermath
		onImmunity(type, pokemon) {
			if (type === 'Ground' && !this.suppressingAttackEvents(pokemon)) return false;
		},
		onStart(pokemon) {
			if (pokemon.ability === 'levitate') {
				pokemon.ability = 'aftermath' ;
				pokemon.baseAbility = 'aftermath' ;
			}
		},
	},
	flygon: {
		// Flygon: Compoundeyes
		onImmunity(type, pokemon) {
			if (type === 'Ground' && !this.suppressingAttackEvents(pokemon)) return false;
		},
		onStart(pokemon) {
			if (pokemon.ability === 'levitate') {
				pokemon.ability = 'compoundeyes' ;
				pokemon.baseAbility = 'compoundeyes' ;
			}
		},
	},
	eelektross: {
		// Eelektross: Poison Heal
		onImmunity(type, pokemon) {
			if (type === 'Ground' && !this.suppressingAttackEvents(pokemon)) return false;
		},
		onStart(pokemon) {
			if (pokemon.ability === 'levitate') {
				pokemon.ability = 'poisonheal' ;
				pokemon.baseAbility = 'poisonheal' ;
			}
		},
	},
	claydol: {
		// Claydol: Filter
		onImmunity(type, pokemon) {
			if (type === 'Ground' && !this.suppressingAttackEvents(pokemon)) return false;
		},
		onStart(pokemon) {
			if (pokemon.ability === 'levitate') {
				pokemon.ability = 'filter' ;
				pokemon.baseAbility = 'filter' ;
			}
		},
	},
	gengar: {
		// Gengar: Cursed Body
		onImmunity(type, pokemon) {
			if (pokemon.species.id !== 'gengarmega' && type === 'Ground' && !this.suppressingAttackEvents(pokemon)) return false;
		},
		onStart(pokemon) {
			if (pokemon.ability === 'levitate') {
				pokemon.ability = 'cursedbody' ;
				pokemon.baseAbility = 'cursedbody' ;
			}
		},
	},
	mismagius: {
		// Mismagius: Cursed Body
		onImmunity(type, pokemon) {
			if (type === 'Ground' && !this.suppressingAttackEvents(pokemon)) return false;
		},
		onStart(pokemon) {
			if (pokemon.ability === 'levitate') {
				pokemon.ability = 'cursedbody' ;
				pokemon.baseAbility = 'cursedbody' ;
			}
		},
	},
	mesprit: {
		// Mesprit: Serene Grace
		onImmunity(type, pokemon) {
			if (type === 'Ground' && !this.suppressingAttackEvents(pokemon)) return false;
		},
		onStart(pokemon) {
			if (pokemon.ability === 'levitate') {
				pokemon.ability = 'serenegrace' ;
				pokemon.baseAbility = 'serenegrace' ;
			}
		},
	},
	uxie: {
		// Uxie: Synchronize
		onImmunity(type, pokemon) {
			if (type === 'Ground' && !this.suppressingAttackEvents(pokemon)) return false;
		},
		onStart(pokemon) {
			if (pokemon.ability === 'levitate') {
				pokemon.ability = 'synchronize' ;
				pokemon.baseAbility = 'synchronize' ;
			}
		},
	},
	azelf: {
		// Azelf: Steadfast
		onImmunity(type, pokemon) {
			if (type === 'Ground' && !this.suppressingAttackEvents(pokemon)) return false;
		},
		onStart(pokemon) {
			if (pokemon.ability === 'levitate') {
				pokemon.ability = 'steadfast' ;
				pokemon.baseAbility = 'steadfast' ;
			}
		},
	},
	hydreigon: {
		// Hydreigon: Sheer Force
		onImmunity(type, pokemon) {
			if (type === 'Ground' && !this.suppressingAttackEvents(pokemon)) return false;
		},
		onStart(pokemon) {
			if (pokemon.ability === 'levitate') {
				pokemon.ability = 'sheerforce' ;
				pokemon.baseAbility = 'sheerforce' ;
			}
		},
	},
	rotom: {
		// All Rotoms: Trace
		onImmunity(type, pokemon) {
			if (type === 'Ground' && !this.suppressingAttackEvents(pokemon)) return false;
		},
		onStart(pokemon) {
			if (pokemon.ability === 'levitate') {
				pokemon.ability = 'trace' ;
				pokemon.baseAbility = 'trace' ;
			}
		},
	},
	rotomheat: {
		// All Rotoms: Trace
		onImmunity(type, pokemon) {
			if (type === 'Ground' && !this.suppressingAttackEvents(pokemon)) return false;
		},
		onStart(pokemon) {
			if (pokemon.ability === 'levitate') {
				pokemon.ability = 'trace' ;
				pokemon.baseAbility = 'trace' ;
			}
		},
	},
	rotomwash: {
		// All Rotoms: Trace
		onImmunity(type, pokemon) {
			if (type === 'Ground' && !this.suppressingAttackEvents(pokemon)) return false;
		},
		onStart(pokemon) {
			if (pokemon.ability === 'levitate') {
				pokemon.ability = 'trace' ;
				pokemon.baseAbility = 'trace' ;
			}
		},
	},
	rotomfan: {
		// All Rotoms: Trace
		onImmunity(type, pokemon) {
			if (type === 'Ground' && !this.suppressingAttackEvents(pokemon)) return false;
		},
		onStart(pokemon) {
			if (pokemon.ability === 'levitate') {
				pokemon.ability = 'trace' ;
				pokemon.baseAbility = 'trace' ;
			}
		},
	},
	rotomfrost: {
		// All Rotoms: Trace
		onImmunity(type, pokemon) {
			if (type === 'Ground' && !this.suppressingAttackEvents(pokemon)) return false;
		},
		onStart(pokemon) {
			if (pokemon.ability === 'levitate') {
				pokemon.ability = 'trace' ;
				pokemon.baseAbility = 'trace' ;
			}
		},
	},
	rotommow: {
		// All Rotoms: Trace
		onImmunity(type, pokemon) {
			if (type === 'Ground' && !this.suppressingAttackEvents(pokemon)) return false;
		},
		onStart(pokemon) {
			if (pokemon.ability === 'levitate') {
				pokemon.ability = 'trace' ;
				pokemon.baseAbility = 'trace' ;
			}
		},
	},
	cryogonal: {
		// Cryogonal: infinite hail, Ice Body
		onModifyMove(move) {
			if (move.id === 'hail') {
				const weather = move.weather ;
				move.weather = '';
				move.onHit = function (target, source) {
					this.field.setWeather(weather, source, this.dex.getAbility('snowwarning'));
					this.field.weatherData.duration = 0;
				};
				move.target = 'self';
			}
		},
		onImmunity(type, pokemon) {
			if (type === 'Ground' && !this.suppressingAttackEvents(pokemon)) return false;
		},
		onStart(pokemon) {
			if (pokemon.ability === 'levitate') {
				pokemon.ability = 'icebody' ;
				pokemon.baseAbility = 'icebody' ;
			}
		},
	},
	probopass: {
		// Probopass: infinite sand
		onModifyMove(move) {
			if (move.id === 'sandstorm') {
				const weather = move.weather ;
				move.weather = '';
				move.onHit = function (target, source) {
					this.field.setWeather(weather, source, this.dex.getAbility('sandstream'));
					this.field.weatherData.duration = 0;
				};
				move.target = 'self';
			}
		},
	},
	phione: {
		// Phione: infinite rain
		onModifyMove(move) {
			if (move.id === 'raindance') {
				const weather = move.weather ;
				move.weather = '';
				move.onHit = function (target, source) {
					this.field.setWeather(weather, source, this.dex.getAbility('drizzle'));
					this.field.weatherData.duration = 0;
				};
				move.target = 'self';
			}
		},
	},
}; exports.Statuses = Statuses;
