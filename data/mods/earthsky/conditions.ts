export const Conditions: {[k: string]: ModdedConditionData} = {
	/* Existing statuses */
	deltastream: {
		name: 'DeltaStream',
		effectType: 'Weather',
		duration: 0,
		onModifyDamage(damage, source, target, move) {
			if (this.dex.getEffectiveness(move, 'Flying') > 0) {
				this.debug('Delta Stream neutralize');
				return this.chainModify(0.75);
			}
		},
		onStart(battle, source, effect) {
			this.add('-weather', 'DeltaStream', '[from] ability: ' + effect, '[of] ' + source);
		},
		onResidualOrder: 1,
		onResidual() {
			this.add('-weather', 'DeltaStream', '[upkeep]');
			this.eachEvent('Weather');
		},
		onEnd() {
			this.add('-weather', 'none');
		},
	},
	frz: {
		name: 'frz',
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'frz', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'frz');
			}
			this.effectData.time = 0;
			if (target.species.name === 'Shaymin-Sky' && target.baseSpecies.baseSpecies === 'Shaymin') {
				target.formeChange('Shaymin', this.effect, true);
			}
		},
		onBeforeMovePriority: 10,
		onBeforeMove(pokemon, target, move) {
			if (move.flags['defrost'] || pokemon.volatiles['fullcollide']) return;
			if (this.randomChance(pokemon.statusData.time, 5)) {
				pokemon.cureStatus();
				return;
			} else if(!pokemon.volatiles['stasis']){
				pokemon.statusData.time++;
			}
			this.add('cant', pokemon, 'frz');
			return false;
		},
		onModifyMove(move, pokemon) {
			if (!pokemon.volatiles['stasis'] && move.flags['defrost']) {
				this.add('-curestatus', pokemon, 'frz', '[from] move: ' + move);
				pokemon.setStatus('');
			}
		},
		onHit(target, source, move) {
			if (move.thawsTarget || (move.type === 'Fire' || (move.twoType && move.twoType === 'Fire')) && move.category !== 'Status') {
				target.cureStatus();
			}
		},
		onResidual(pokemon) {
			this.damage(pokemon.baseMaxhp / 16);
		},
	},
	partiallytrapped: {
		inherit: true,
		onStart(pokemon, source) {
			if(pokemon.volatiles['strongpartialtrap']) return false;
			this.add('-activate', pokemon, 'move: ' + this.effectData.sourceEffect, '[of] ' + source);
			this.effectData.boundDivisor = source.hasItem('bindingband') ? 6 : 8;
		},
	},
	/* New statuses */
	evade: {
		duration: 1,
		name: 'evade',
		onStart(pokemon) {
			if(pokemon.volatiles['odorsleuth']) return false;
		},
		onAccuracy(accuracy, target, source, move) {
			if(!move.ignoreEvasion && typeof move.accuracy === 'number') return false;
		},
	},
	evadestall: { //Evasion move counter
		name: 'evadestall',
		duration: 2,
		counterMax: 729,
		onStart(pokemon) {
			if(pokemon.volatiles['odorsleuth']) return false;
			this.effectData.counter = 3;
		},
		onEvadeStallMove(pokemon) {
			// this.effectData.counter should never be undefined here.
			// However, just in case, use 1 if it is undefined.
			const counter = this.effectData.counter || 1;
			this.debug("Success chance: " + Math.round(100 / counter) + "%");
			const success = this.randomChance(1, counter);
			if (!success) delete pokemon.volatiles['evadestall'];
			return success;
		},
		onRestart() {
			if (this.effectData.counter < (this.effect as Condition).counterMax!) {
				this.effectData.counter *= 3;
			}
			this.effectData.duration = 2;
		},
	},
	blocked: {
		name: 'blocked',
		noCopy: true,
		onStart(target, source, move) {
			this.add('-activate', target, 'trapped');
		},
		onTrapPokemon(pokemon) {
			pokemon.tryTrap();
		},
		onSourceHit(target, source, move) { //Damaging moves won't switch
			if(move.selfSwitch && target !== source && !source.hasItem('shedshell') && !source.hasAbility('runaway')) delete move.selfSwitch;
		},
		onAfterMoveSecondaryPriority: -100,
		onAfterMoveSecondary(target, source, move) { //Items and custom Abilities won't switch
			if(target !== source){
				if(source.switchFlag && !source.hasItem('shedshell') && !source.hasAbility('runaway')){
					this.add('-fail', target, '[from] move: Fairy Lock');
					source.switchFlag = false;
					return null;
				}
				if(target.switchFlag && !target.hasItem('shedshell') && !target.hasAbility('runaway')){
					this.add('-fail', target, '[from] move: Fairy Lock');
					source.switchFlag = false;
					return null;
				}
			}
		},
		onEmergencyExit(target) { //Escape Plan won't switch
			if(!target.hasItem('shedshell')){
				target.switchFlag = false;
				return false;
			}
		},
	},
	meanlooked: {
		name: 'meanlooked',
		noCopy: true,
		onStart(target, source, move) {
			this.add('-activate', target, 'trapped');
		},
		onTrapPokemonPriority: 100,
		onTrapPokemon(pokemon) {
			pokemon.trapped = pokemon.maybeTrapped = true;
		},
	},
	strongpartialtrap: {
		name: 'strongpartialtrap',
		duration: 3,
		durationCallback(target, source) {
			if (source?.hasItem('gripclaw')) return 5;
			return this.random(3, 4);
		},
		onStart(pokemon, source) {
			if(pokemon.volatiles['partiallytrapped']) return false;
			this.add('-activate', pokemon, 'move: ' + this.effectData.sourceEffect, '[of] ' + source);
			this.effectData.boundDivisor = source.hasItem('bindingband') ? 3 : 4;
		},
		onResidualOrder: 11,
		onResidual(pokemon) {
			const source = this.effectData.source;
			if (source && (!source.isActive || source.hp <= 0 || !source.activeTurns) && !gmaxEffect) {
				delete pokemon.volatiles['strongpartialtrap'];
				this.add('-end', pokemon, this.effectData.sourceEffect, '[strongpartialtrap]', '[silent]');
				return;
			}
			this.damage(pokemon.baseMaxhp / this.effectData.boundDivisor);
		},
		onEnd(pokemon) {
			this.add('-end', pokemon, this.effectData.sourceEffect, '[strongpartialtrap]');
		},
	},
	/* Status changes due to other elements */
	par: {
		name: 'par',
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'par', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'par');
			}
		},
		onModifySpe(spe, pokemon) {
			if (!pokemon.hasAbility('quickfeet')) {
				return this.chainModify(0.5);
			}
		},
		onBeforeMovePriority: 1,
		onBeforeMove(pokemon) {
			if(pokemon.volatiles['fullcollide']) return;
			if (this.randomChance(1, 4)) {
				this.add('cant', pokemon, 'par');
				return false;
			}
		},
	},
	slp: {
		inherit: true,
		onBeforeMove(pokemon, target, move) {
			if(!pokemon.volatiles['stasis']){
				if (pokemon.hasAbility('earlybird')) {
					pokemon.statusData.time--;
				}
				pokemon.statusData.time--;
				if (pokemon.statusData.time <= 0) {
					pokemon.cureStatus();
					return;
				}
			}
			if(pokemon.volatiles['fullcollide']) return;
			this.add('cant', pokemon, 'slp');
			if (move.sleepUsable) {
				return;
			}
			return false;
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
			if(pokemon.volatiles['fullcollide']) return;
			this.add('-activate', pokemon, 'confusion');
			if (!this.randomChance(33, 100)) {
				return;
			}
			this.activeTarget = pokemon;
			const damage = this.getDamage(pokemon, pokemon, 40);
			if (typeof damage !== 'number') throw new Error("Confusion damage not dealt");
			const activeMove = {id: this.toID('confused'), effectType: 'Move', type: '???'};
			this.damage(damage, pokemon, pokemon, activeMove as ActiveMove);
			return false;
		},
	},
	flinch: {
		name: 'flinch',
		duration: 1,
		onBeforeMovePriority: 8,
		onBeforeMove(pokemon) {
			if(pokemon.volatiles['fullcollide']) return;
			this.add('cant', pokemon, 'flinch');
			this.runEvent('Flinch', pokemon);
			return false;
		},
	},
	choicelock: {
		name: 'choicelock',
		noCopy: true,
		onStart(pokemon) {
			if (!this.activeMove) throw new Error("Battle.activeMove is null");
			if (!this.activeMove.id || this.activeMove.hasBounced) return false;
			this.effectData.move = this.activeMove.id;
		},
		onBeforeMove(pokemon, target, move) {
			if (!pokemon.getItem().isChoice) {
				pokemon.removeVolatile('choicelock');
				return;
			}
			if (
				!pokemon.ignoringItem() && !pokemon.volatiles['dynamax'] &&
				move.id !== this.effectData.move && move.id !== 'struggle' && !pokemon.volatiles['fullcollide']
			) {
				// Fails unless the Choice item is being ignored, and no PP is lost
				this.addMove('move', pokemon, move.name);
				this.attrLastMove('[still]');
				this.debug("Disabled by Choice item lock");
				this.add('-fail', pokemon);
				return false;
			}
		},
		onDisableMove(pokemon) {
			if (!pokemon.getItem().isChoice || !pokemon.hasMove(this.effectData.move)) {
				pokemon.removeVolatile('choicelock');
				return;
			}
			if (pokemon.ignoringItem() || pokemon.volatiles['dynamax']) {
				return;
			}
			for (const moveSlot of pokemon.moveSlots) {
				if (moveSlot.id !== this.effectData.move) {
					pokemon.disableMove(moveSlot.id, false, this.effectData.sourceEffect);
				}
			}
		},
	},
	raindance: {
		inherit: true,
		onWeatherModifyDamage(damage, attacker, defender, move) {
			if (defender.hasItem('utilityumbrella')) return;
			if (move.type === 'Water' || (move.twoType && move.twoType === 'Water')) {
				this.debug('rain water boost');
				return this.chainModify(1.5);
			}
			if (move.type === 'Fire' || (move.twoType && move.twoType === 'Fire')) {
				this.debug('rain fire suppress');
				return this.chainModify(0.5);
			}
		},
	},
	primordialsea: {
		inherit: true,
		onTryMove(attacker, defender, move) {
			if ((move.type === 'Fire' || (move.twoType && move.twoType === 'Fire')) && move.category !== 'Status') {
				this.debug('Primordial Sea fire suppress');
				this.add('-fail', attacker, move, '[from] Primordial Sea');
				this.attrLastMove('[still]');
				return null;
			}
		},
		onWeatherModifyDamage(damage, attacker, defender, move) {
			if (defender.hasItem('utilityumbrella')) return;
			if (move.type === 'Water' || (move.twoType && move.twoType === 'Water')) {
				this.debug('Rain water boost');
				return this.chainModify(1.5);
			}
		},
		weatherName: "Torrential Rain",
		start: "  A torrential rain began to fall!",
		end: "  The torrential rain has lifted!",
		block: "  There is no relief from this torrential rain!",
		blockMove: "  The Fire-type attack fizzled out in the torrential rain!",
	},
	sunnyday: {
		inherit: true,
		onWeatherModifyDamage(damage, attacker, defender, move) {
			if (defender.hasItem('utilityumbrella')) return;
			if (move.type === 'Fire' || (move.twoType && move.twoType === 'Fire')) {
				this.debug('Sunny Day fire boost');
				return this.chainModify(1.5);
			}
			if (move.type === 'Water' || (move.twoType && move.twoType === 'Water')) {
				this.debug('Sunny Day water suppress');
				return this.chainModify(0.5);
			}
		},
	},
	desolateland: {
		inherit: true,
		onTryMove(attacker, defender, move) {
			if ((move.type === 'Water' || (move.twoType && move.twoType === 'Water')) && move.category !== 'Status') {
				this.debug('Desolate Land water suppress');
				this.add('-fail', attacker, move, '[from] Desolate Land');
				this.attrLastMove('[still]');
				return null;
			}
		},
		onWeatherModifyDamage(damage, attacker, defender, move) {
			if (defender.hasItem('utilityumbrella')) return;
			if (move.type === 'Fire' || (move.twoType && move.twoType === 'Fire')) {
				this.debug('Sunny Day fire boost');
				return this.chainModify(1.5);
			}
		},
		weatherName: "Intense Sun",
		start: "  The sunlight turned scorchingly hot!",
		end: "  The scorching sunlight faded.",
		block: "  The scorching sunlight was not lessened at all!",
		blockMove: "  The Water-type attack evaporated in the intense sunlight!",
	},
};
