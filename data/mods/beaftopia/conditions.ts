export const Conditions: {[k: string]: ConditionData} = {
	cfs: {
		name: 'cfs',
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			if (sourceEffect?.id === 'lockedmove') {
				this.add('-status', target, 'cfs', '[fatigue]');
				this.add('-start', target, target.status, '[silent]');
				this.add('-message', `${target.name} became confused due to fatigue!`);
			} else if (sourceEffect?.effectType === 'Ability') {
				this.add('-status', target, 'cfs', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
				this.add('-start', target, target.status, '[silent]');
				this.add('-message', `${target.name} became confused!`);
			} else {
				this.add('-status', target, 'cfs');
				this.add('-start', target, target.status, '[silent]');
				this.add('-message', `${target.name} became confused!`);
			}
		},
		onTryAddVolatile(status, target, source, effect) {
			if (!effect || !source) return;
			if (status.id === 'attract') return null;
		},
		onAfterMove(pokemon) {
			this.add('-activate', pokemon, 'cfs');
			this.activeTarget = pokemon;
			const damage = this.actions.getConfusionDamage(pokemon, 40);
			if (typeof damage !== 'number') throw new Error("Confusion damage not dealt");
			const activeMove = {id: this.toID('confused'), effectType: 'Move', type: '???'};
			this.damage(damage, pokemon, pokemon, activeMove as ActiveMove);
		},
	},
	psn: {
		name: 'psn',
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'psn', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'psn');
			}
			target.statusState.startTime = 2;
			target.statusState.time = target.statusState.startTime;
		},
		onDisableMove(pokemon) {
			for (const moveSlot of pokemon.moveSlots) {
				if (this.dex.moves.get(moveSlot.id).flags['heal']) {
					pokemon.disableMove(moveSlot.id);
				}
			}
		},
		onBeforeMovePriority: 6,
		onBeforeMove(pokemon, target, move) {
			if (move.flags['heal'] && !move.isZ && !move.isMax) {
				this.add('cant', pokemon, pokemon.status, move);
				return false;
			}
		},
		onModifyMove(move, pokemon, target) {
			if (move.flags['heal'] && !move.isZ && !move.isMax) {
				this.add('cant', pokemon, pokemon.status, move);
				return false;
			}
		},
		onResidualOrder: 9,
		onResidual(pokemon) {
			this.damage(pokemon.baseMaxhp / 8);
			pokemon.statusState.time--;
			if (pokemon.statusState.time <= 0) {
				pokemon.cureStatus();
				return;
			}
		},
		onTryHeal(damage, target, source, effect) {
			if ((effect?.id === 'zpower') || this.effectState.isZ) return damage;
			return false;
		},
	},
	burn: {
		name: 'burn',
		// this is a volatile status
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.id === 'flameorb') {
				this.add('-start', target, 'burn', '[from] item: Flame Orb');
			} else if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-start', target, 'burn', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-start', target, 'burn');
			}
			target.statusState.startTime = 0;
			target.statusState.time = target.statusState.startTime;
		},
		onDamagingHit(damage, target, source, move) {
			if (target !== source && target.statusState.time > 0) {
				this.damage(target.baseMaxhp / 8, target, source);
				this.add('-message', `${target.name} was hurt by its burn!`);
			}
		},
		onResidualOrder: 10,
		onResidual(pokemon) {
			const source = this.effectState.source;
			this.boost({def: -1, spd: -1}, pokemon, source);
			this.add('-message', `${pokemon.name} is being weakened by its burn!`);
			pokemon.statusState.time++;
		},
		onEnd(target) {
			this.add('-end', target, 'burn');
		},
	},
	lockedmove: {
		// Outrage, Thrash, Petal Dance...
		name: 'lockedmove',
		duration: 2,
		onResidual(target) {
			if (target.status === 'slp') {
				// don't lock, and bypass confusion for calming
				delete target.volatiles['lockedmove'];
			}
			this.effectState.trueDuration--;
		},
		onStart(target, source, effect) {
			this.effectState.trueDuration = this.random(2, 4);
			this.effectState.move = effect.id;
		},
		onRestart() {
			if (this.effectState.trueDuration >= 2) {
				this.effectState.duration = 2;
			}
		},
		onEnd(target) {
			if (this.effectState.trueDuration > 1) return;
			target.trySetStatus('cfs', target);
		},
		onLockMove(pokemon) {
			if (pokemon.volatiles['dynamax']) return;
			return this.effectState.move;
		},
	},
	raindance: {
		name: 'RainDance',
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasAbility('drizzle') && source?.hasItem('damprock')) {
				return 13;
			} else if (source?.hasAbility('drizzle') || source?.hasItem('damprock')) {
				return 8;
			}
			return 5;
		},
		onWeatherModifyDamage(damage, attacker, defender, move) {
			if (defender.hasItem('utilityumbrella')) return;
			if (move.type === 'Fire') {
				this.debug('rain fire suppress');
				return this.chainModify(0.5);
			}
		},
		onFieldStart(field, source, effect) {
			if (effect?.effectType === 'Ability') {
				if (this.gen <= 5) this.effectState.duration = 0;
				this.add('-weather', 'RainDance', '[from] ability: ' + effect.name, '[of] ' + source);
			} else {
				this.add('-weather', 'RainDance');
			}
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-weather', 'RainDance', '[upkeep]');
			this.eachEvent('Weather');
		},
		onFieldEnd() {
			this.add('-weather', 'none');
		},
	},
	sunnyday: {
		name: 'SunnyDay',
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasAbility('drought') && source?.hasItem('heatrock')) {
				return 13;
			} else if (source?.hasAbility('drought') || source?.hasItem('heatrock')) {
				return 8;
			}
			return 5;
		},
		onWeatherModifyDamage(damage, attacker, defender, move) {
			if (move.id === 'hydrosteam' && !attacker.hasItem('utilityumbrella')) {
				this.debug('Sunny Day Hydro Steam boost');
				return this.chainModify(1.5);
			}
			if (defender.hasItem('utilityumbrella')) return;
			if (move.type === 'Water') {
				this.debug('Sunny Day water suppress');
				return this.chainModify(0.5);
			}
		},
		onFieldStart(battle, source, effect) {
			if (effect?.effectType === 'Ability') {
				if (this.gen <= 5) this.effectState.duration = 0;
				this.add('-weather', 'SunnyDay', '[from] ability: ' + effect.name, '[of] ' + source);
			} else {
				this.add('-weather', 'SunnyDay');
			}
		},
		onImmunity(type, pokemon) {
			if (pokemon.hasItem('utilityumbrella')) return;
			if (type === 'frz') return false;
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-weather', 'SunnyDay', '[upkeep]');
			this.eachEvent('Weather');
		},
		onFieldEnd() {
			this.add('-weather', 'none');
		},
	},
	snow: {
		name: 'Snow',
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasAbility('snowwarning') && source?.hasItem('icyrock')) {
				return 13;
			} else if (source?.hasAbility('snowwarning') || source?.hasItem('icyrock')) {
				return 8;
			}
			return 5;
		},
		onModifyDefPriority: 10,
		onModifyDef(def, pokemon) {
			if (pokemon.hasType('Ice') && this.field.isWeather('snow')) {
				return this.modify(def, 1.5);
			}
		},
		onFieldStart(field, source, effect) {
			if (effect?.effectType === 'Ability') {
				if (this.gen <= 5) this.effectState.duration = 0;
				this.add('-weather', 'Snow', '[from] ability: ' + effect.name, '[of] ' + source);
			} else {
				this.add('-weather', 'Snow');
			}
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-weather', 'Snow', '[upkeep]');
			if (this.field.isWeather('snow')) this.eachEvent('Weather');
		},
		onFieldEnd() {
			this.add('-weather', 'none');
		},
	},
};
