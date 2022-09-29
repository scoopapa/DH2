export const Conditions: {[k: string]: ConditionData} = {
	brn: {
		inherit: true,
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.id === 'flameorb') {
				this.add('-status', target, 'brn', '[from] item: Flame Orb');
			} else if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'brn', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'brn');
			}
			this.effectData.startTime = 4;
			if(sourceEffect.effectType === 'Ability' || sourceEffect.effectType === 'Item') {
				this.effectData.startTime = 1;
			}
			this.effectData.time = this.effectData.startTime;
		},
		// Damage reduction is handled directly in the sim/battle.js damage function
		onResidualOrder: 9,
		onResidual(pokemon) {
			this.damage(pokemon.baseMaxhp / 16);
			pokemon.statusData.time--;
			if (pokemon.statusData.time <= 0) {
				this.add('-curestatus', pokemon, 'brn', '[Silent]');
				pokemon.setStatus('');
				return;
			}
		},
	},
	par: {
		inherit: true,
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'par', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'par');
			}
			this.effectData.startTime = 4;
			if(sourceEffect.effectType === 'Ability' || sourceEffect.effectType === 'Item') {
				this.effectData.startTime = 1;
			}
			this.effectData.time = this.effectData.startTime;
		},
		onBeforeMovePriority: 1,
		onBeforeMove(pokemon) {
			if (this.randomChance(1, 5)) {
				this.add('cant', pokemon, 'par');
				return false;
			}
		},
		onResidualOrder: 9,
		onResidual(pokemon) {
			pokemon.statusData.time--;
			if (pokemon.statusData.time <= 0) {
				this.add('-curestatus', pokemon, 'par', '[Silent]');
				pokemon.setStatus('');
				return;
			}
		},
	},
	slp: {
		inherit: true,
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'slp', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else if (sourceEffect && sourceEffect.effectType === 'Move') {
				this.add('-status', target, 'slp', '[from] move: ' + sourceEffect.name);
			} else {
				this.add('-status', target, 'slp');
			}
		},
		onModifyDef(def, pokemon) {
			return this.chainModify(0.67);
		},
		onModifySpD(spd, pokemon) {
			return this.chainModify(0.67);
		},
		onBeforeMovePriority: 1,
		onBeforeMove(pokemon) {
			if (this.randomChance(1, 5)) {
				this.add('cant', pokemon, 'slp');
				return false;
			}
		},
		onResidualOrder: 9,
		onResidual(pokemon) {
			pokemon.statusData.time--;
			if (pokemon.statusData.time <= 0) {
				this.add('-curestatus', pokemon, 'slp', '[Silent]');
				pokemon.setStatus('');
				return;
			}
		},
	},
	frz: {
		inherit: true,
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'frz', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'frz');
			}
			if (target.species.name === 'Shaymin-Sky' && target.baseSpecies.baseSpecies === 'Shaymin') {
				target.formeChange('Shaymin', this.effect, true);
			}
			this.effectData.startTime = 4;
			if(sourceEffect.effectType === 'Ability' || sourceEffect.effectType === 'Item') {
				this.effectData.startTime = 1;
			}
			this.effectData.time = this.effectData.startTime;
		},
		onResidualOrder: 9,
		onResidual(pokemon) {
			this.damage(pokemon.baseMaxhp / 16);
			if (pokemon.statusData.time <= 0) {
				this.add('-curestatus', pokemon, 'frz', '[Silent]');
				pokemon.setStatus('');
				return;
			}
		},
		onBeforeMovePriority: 10,
		onBeforeMove() {},
		onModifyMove() {},
		onHit() {},
	},
	psn: {
		inherit: true,
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'psn', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'psn');
			}
			this.effectData.startTime = 4;
			if(sourceEffect.effectType === 'Ability' || sourceEffect.effectType === 'Item') {
				this.effectData.startTime = 1;
			}
			this.effectData.time = this.effectData.startTime;
		},
		onResidualOrder: 9,
		onResidual(pokemon) {
			this.damage(pokemon.baseMaxhp / 8);
			if (pokemon.statusData.time <= 0) {
				this.add('-curestatus', pokemon, 'psn', '[Silent]');
				pokemon.setStatus('');
				return;
			}
		},
	},
	tox: {
		inherit: true,
		onStart(target, source, sourceEffect) {
			this.effectData.stage = 0;
			if (sourceEffect && sourceEffect.id === 'toxicorb') {
				this.add('-status', target, 'tox', '[from] item: Toxic Orb');
			} else if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'tox', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'tox');
			}
			this.effectData.startTime = 4;
			if(sourceEffect.effectType === 'Ability' || sourceEffect.effectType === 'Item') {
				this.effectData.startTime = 1;
			}
			this.effectData.time = this.effectData.startTime;
		},
		onResidualOrder: 9,
		onResidual(pokemon) {
			if (this.effectData.stage < 15) {
				this.effectData.stage++;
			}
			this.damage(this.clampIntRange(pokemon.baseMaxhp / 16, 1) * this.effectData.stage);
			if (pokemon.statusData.time <= 0) {
				this.add('-curestatus', pokemon, 'tox', '[Silent]');
				pokemon.setStatus('');
				return;
			}
		},
	},
	confusion: {
		name: 'confusion',
		// this is a volatile status
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.id === 'lockedmove') {
				this.add('-start', target, 'confusion', '[fatigue]');
			} else {
				this.add('-start', target, 'confusion');
			}
			this.effectData.time = this.random(2, 6);
		},
		onEnd(target) {
			this.add('-end', target, 'confusion');
		},
		onBeforeMovePriority: 3,
		onBeforeMove(pokemon) {
			pokemon.volatiles['confusion'].time--;
			if (!pokemon.volatiles['confusion'].time) {
				pokemon.removeVolatile('confusion');
				return;
			}
			this.add('-activate', pokemon, 'confusion');
			if (!this.randomChance(33, 100)) {
				return;
			}
			this.activeTarget = pokemon;
			const damage = this.getDamage(pokemon, pokemon, 40);
			if (typeof damage !== 'number') throw new Error("Confusion damage not dealt");
			if (pokemon.hasAbility('magicguard')) throw new Error("Confusion damage not dealt");
			const activeMove = {id: this.toID('confused'), effectType: 'Move', type: '???'};
			this.damage(damage, pokemon, pokemon, activeMove as ActiveMove);
			return false;
		},
	},
	raindance: {
		inherit: true,
		durationCallback(source, effect) {
			if (source?.hasItem('damprock')) {
				return 8;
			}
			else if (source?.hasAbility('drizzle') || (source?.hasAbility('drizzle') && source?.hasItem('damprock'))) {
				return 0;
			}
			return 5;
		},
		onWeatherModifyDamage(damage, attacker, defender, move) {
			if (attacker.hasItem('utilityumbrella')) return;
			if (move.type === 'Water') {
				this.debug('rain water boost');
				return this.chainModify(1.5);
			}
			if (move.type === 'Fire') {
				this.debug('rain fire suppress');
				return this.chainModify(0.5);
			}
		},
	},
	primordialsea: {
		inherit: true,
		onTryMovePriority: 1,
		onTryMove(attacker, defender, move) {
			if (attacker.hasItem('utilityumbrella')) return;
			if (move.type === 'Fire' && move.category !== 'Status') {
				this.debug('Primordial Sea fire suppress');
				this.add('-fail', attacker, move, '[from] Primordial Sea');
				this.attrLastMove('[still]');
				return null;
			}
		},
		onWeatherModifyDamage(damage, attacker, defender, move) {
			if (attacker.hasItem('utilityumbrella')) return;
			if (move.type === 'Water') {
				this.debug('Rain water boost');
				return this.chainModify(1.5);
			}
		},
	},
	sunnyday: {
		inherit: true,
		durationCallback(source, effect) {
			if (source?.hasItem('heatrock')) {
				return 8;
			}
			else if (source?.hasAbility('drought') || (source?.hasAbility('drought') && source?.hasItem('heatrock'))) {
				return 0;
			}
			return 5;
		},
		onWeatherModifyDamage(damage, attacker, defender, move) {
			if (attacker.hasItem('utilityumbrella')) return;
			if (move.type === 'Fire') {
				this.debug('Sunny Day fire boost');
				return this.chainModify(1.5);
			}
			if (move.type === 'Water') {
				this.debug('Sunny Day water suppress');
				return this.chainModify(0.5);
			}
		},
	},
	desolateland: {
		inherit: true,
		onTryMove(attacker, defender, move) {
			if (attacker.hasItem('utilityumbrella')) return;
			if (move.type === 'Water' && move.category !== 'Status') {
				this.debug('Desolate Land water suppress');
				this.add('-fail', attacker, move, '[from] Desolate Land');
				this.attrLastMove('[still]');
				return null;
			}
		},
		onWeatherModifyDamage(damage, attacker, defender, move) {
			if (attacker.hasItem('utilityumbrella')) return;
			if (move.type === 'Fire') {
				this.debug('Sunny Day fire boost');
				return this.chainModify(1.5);
			}
		},
	},
	sandstorm: {
		inherit: true,
		durationCallback(source, effect) {
			if (source?.hasItem('smoothrock')) {
				return 8;
			}
			else if (source?.hasAbility('sandstream') || (source?.hasAbility('sandstream') && source?.hasItem('smoothrock'))) {
				return 0;
			}
			return 5;
		},
		onWeather(target) {
			if (target.hasItem('utilityumbrella')) return;
			this.damage(target.baseMaxhp / 16);
		},
	},
	hail: {
		inherit: true,
		durationCallback(source, effect) {
			if (source?.hasItem('icyrock')) {
				return 8;
			}
			else if (source?.hasAbility('snowwarning') || (source?.hasAbility('snowwarning') && source?.hasItem('icyrock'))) {
				return 0;
			}
			return 5;
		},
		onModifyDefPriority: 10,
		onModifyDef(def, pokemon) {
			if (pokemon.hasType('Ice') && this.field.isWeather('hail')) {
				return this.modify(def, 1.5);
			}
		},
		onWeather(target) {
			if (target.hasItem('utilityumbrella')) return;
			this.damage(target.baseMaxhp / 16);
		},
	},
	gem: {
		name: 'gem',
		duration: 1,
		affectsFainted: true,
		onBasePowerPriority: 14,
		onBasePower(basePower, user, target, move) {
			this.debug('Gem Boost');
			return this.chainModify(2);
		},
	},
};