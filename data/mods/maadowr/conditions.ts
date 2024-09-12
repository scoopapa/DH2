export const Conditions: {[k: string]: ConditionData} = {
	brn: {
		name: 'brn',
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.id === 'flameorb') {
				this.add('-status', target, 'brn', '[from] item: Flame Orb');
			} else if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'brn', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'brn');
			}
		},
		// Damage reduction is handled directly in the sim/battle.js damage function
		onResidualOrder: 10,
		onResidual(pokemon) {
			this.damage(pokemon.baseMaxhp / 16);
		},
	},
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
			// Paralysis occurs after all other Speed modifiers, so evaluate all modifiers up to this point first
			spe = this.finalModify(spe);
			if (!pokemon.hasAbility('quickfeet')) {
				spe = Math.floor(spe * 50 / 100);
			}
			return spe;
		},
		onBeforeMovePriority: 1,
		onBeforeMove(pokemon) {
			if (this.randomChance(1, 4)) {
				this.add('cant', pokemon, 'par');
				return false;
			}
		},
	},
	slp: {
		name: 'slp',
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'slp', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else if (sourceEffect && sourceEffect.effectType === 'Move') {
				this.add('-status', target, 'slp', '[from] move: ' + sourceEffect.name);
			} else {
				this.add('-status', target, 'slp');
			}
			// 1-3 turns
			this.effectState.startTime = this.random(2, 5);
			this.effectState.time = this.effectState.startTime;

			if (target.removeVolatile('nightmare')) {
				this.add('-end', target, 'Nightmare', '[silent]');
			}
		},
		onBeforeMovePriority: 10,
		onBeforeMove(pokemon, target, move) {
			if (pokemon.hasAbility('earlybird')) {
				pokemon.statusState.time--;
			}
			pokemon.statusState.time--;
			if (pokemon.statusState.time <= 0) {
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
	frz: {
		name: 'frz',
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'frz', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'frz');
			}
			if (target.species.name === 'Shaymin-Sky' && target.baseSpecies.baseSpecies === 'Shaymin') {
				target.formeChange('Shaymin', this.effect, true);
			}
		},
		onBeforeMovePriority: 10,
		onBeforeMove(pokemon, target, move) {
			if (move.flags['defrost']) return;
			if (this.randomChance(1, 5)) {
				pokemon.cureStatus();
				return;
			}
			this.add('cant', pokemon, 'frz');
			return false;
		},
		onModifyMove(move, pokemon) {
			if (move.flags['defrost']) {
				this.add('-curestatus', pokemon, 'frz', '[from] move: ' + move);
				pokemon.clearStatus();
			}
		},
		onAfterMoveSecondary(target, source, move) {
			if (move.thawsTarget) {
				target.cureStatus();
			}
		},
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Fire' && move.category !== 'Status') {
				target.cureStatus();
			}
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
		},
		onResidualOrder: 9,
		onResidual(pokemon) {
			if (pokemon.volatiles['malwarepoisoned']) {
				this.damage(pokemon.baseMaxhp / 16);
			} else {
				this.damage(pokemon.baseMaxhp / 8);
			}
		},
	},
	tox: {
		name: 'tox',
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			this.effectState.stage = 0;
			if (sourceEffect && sourceEffect.id === 'toxicorb') {
				this.add('-status', target, 'tox', '[from] item: Toxic Orb');
			} else if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'tox', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'tox');
			}
		},
		onSwitchIn() {
			this.effectState.stage = 0;
		},
		onResidualOrder: 9,
		onResidual(pokemon) {
			if (this.effectState.stage < 15) {
				this.effectState.stage++;
			}
			this.damage(this.clampIntRange(pokemon.baseMaxhp / 16, 1) * this.effectState.stage);
		},
	},
	confusion: {
		name: 'confusion',
		// this is a volatile status
		onStart(target, source, sourceEffect) {
			if (sourceEffect?.id === 'lockedmove') {
				this.add('-start', target, 'confusion', '[fatigue]');
			} else if (sourceEffect?.effectType === 'Ability') {
				this.add('-start', target, 'confusion', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-start', target, 'confusion');
			}
			const min = sourceEffect?.id === 'axekick' ? 3 : 2;
			this.effectState.time = this.random(min, 6);
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
			const damage = this.actions.getConfusionDamage(pokemon, 40);
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
			this.add('cant', pokemon, 'flinch');
			this.runEvent('Flinch', pokemon);
			return false;
		},
	},
	trapped: {
		name: 'trapped',
		noCopy: true,
		onTrapPokemon(pokemon) {
			pokemon.tryTrap();
		},
		onStart(target) {
			this.add('-activate', target, 'trapped');
		},
	},
	trapper: {
		name: 'trapper',
		noCopy: true,
	},
	partiallytrapped: {
		name: 'partiallytrapped',
		duration: 5,
		durationCallback(target, source) {
			if (source?.hasItem('gripclaw')) return 8;
			return this.random(5, 7);
		},
		onStart(pokemon, source) {
			this.add('-activate', pokemon, 'move: ' + this.effectState.sourceEffect, '[of] ' + source);
			this.effectState.boundDivisor = source.hasItem('bindingband') ? 6 : 8;
		},
		onResidualOrder: 13,
		onResidual(pokemon) {
			const source = this.effectState.source;
			// G-Max Centiferno and G-Max Sandblast continue even after the user leaves the field
			const gmaxEffect = ['gmaxcentiferno', 'gmaxsandblast'].includes(this.effectState.sourceEffect.id);
			if (source && (!source.isActive || source.hp <= 0 || !source.activeTurns) && !gmaxEffect) {
				delete pokemon.volatiles['partiallytrapped'];
				this.add('-end', pokemon, this.effectState.sourceEffect, '[partiallytrapped]', '[silent]');
				return;
			}
			this.damage(pokemon.baseMaxhp / this.effectState.boundDivisor);
		},
		onEnd(pokemon) {
			this.add('-end', pokemon, this.effectState.sourceEffect, '[partiallytrapped]');
		},
		onTrapPokemon(pokemon) {
			const gmaxEffect = ['gmaxcentiferno', 'gmaxsandblast'].includes(this.effectState.sourceEffect.id);
			if (this.effectState.source?.isActive || gmaxEffect) pokemon.tryTrap();
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
			target.addVolatile('confusion');
		},
		onLockMove(pokemon) {
			if (pokemon.volatiles['dynamax']) return;
			return this.effectState.move;
		},
	},
	twoturnmove: {
		// Skull Bash, SolarBeam, Sky Drop...
		name: 'twoturnmove',
		duration: 2,
		onStart(attacker, defender, effect) {
			// ("attacker" is the Pokemon using the two turn move and the Pokemon this condition is being applied to)
			this.effectState.move = effect.id;
			attacker.addVolatile(effect.id);
			// lastMoveTargetLoc is the location of the originally targeted slot before any redirection
			// note that this is not updated for moves called by other moves
			// i.e. if Dig is called by Metronome, lastMoveTargetLoc will still be the user's location
			let moveTargetLoc: number = attacker.lastMoveTargetLoc!;
			if (effect.sourceEffect && this.dex.moves.get(effect.id).target !== 'self') {
				// this move was called by another move such as Metronome
				// and needs a random target to be determined this turn
				// it will already have one by now if there is any valid target
				// but if there isn't one we need to choose a random slot now
				if (defender.fainted) {
					defender = this.sample(attacker.foes(true));
				}
				moveTargetLoc = attacker.getLocOf(defender);
			}
			attacker.volatiles[effect.id].targetLoc = moveTargetLoc;
			this.attrLastMove('[still]');
			// Run side-effects normally associated with hitting (e.g., Protean, Libero)
			this.runEvent('PrepareHit', attacker, defender, effect);
		},
		onEnd(target) {
			target.removeVolatile(this.effectState.move);
		},
		onLockMove() {
			return this.effectState.move;
		},
		onMoveAborted(pokemon) {
			pokemon.removeVolatile('twoturnmove');
		},
	},
	choicelock: {
		name: 'choicelock',
		noCopy: true,
		onStart(pokemon) {
			if (!this.activeMove) throw new Error("Battle.activeMove is null");
			if (!this.activeMove.id || this.activeMove.hasBounced || this.activeMove.sourceEffect === 'snatch') return false;
			this.effectState.move = this.activeMove.id;
		},
		onBeforeMove(pokemon, target, move) {
			if (!pokemon.getItem().isChoice) {
				pokemon.removeVolatile('choicelock');
				return;
			}
			if (
				!pokemon.ignoringItem() && !pokemon.volatiles['dynamax'] &&
				move.id !== this.effectState.move && move.id !== 'struggle'
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
			if (!pokemon.getItem().isChoice || !pokemon.hasMove(this.effectState.move)) {
				pokemon.removeVolatile('choicelock');
				return;
			}
			if (pokemon.ignoringItem() || pokemon.volatiles['dynamax']) {
				return;
			}
			for (const moveSlot of pokemon.moveSlots) {
				if (moveSlot.id !== this.effectState.move) {
					pokemon.disableMove(moveSlot.id, false, this.effectState.sourceEffect);
				}
			}
		},
	},
	mustrecharge: {
		name: 'mustrecharge',
		duration: 2,
		onBeforeMovePriority: 11,
		onBeforeMove(pokemon) {
			this.add('cant', pokemon, 'recharge');
			pokemon.removeVolatile('mustrecharge');
			pokemon.removeVolatile('truant');
			return null;
		},
		onStart(pokemon) {
			this.add('-mustrecharge', pokemon);
		},
		onLockMove: 'recharge',
	},
	futuremove: {
		// this is a slot condition
		name: 'futuremove',
		duration: 3,
		onResidualOrder: 3,
		onEnd(target) {
			const data = this.effectState;
			// time's up; time to hit! :D
			const move = this.dex.moves.get(data.move);
			if (target.fainted || target === data.source) {
				this.hint(`${move.name} did not hit because the target is ${(target.fainted ? 'fainted' : 'the user')}.`);
				return;
			}

			this.add('-end', target, 'move: ' + move.name);
			target.removeVolatile('Protect');
			target.removeVolatile('Endure');

			if (data.source.hasAbility('infiltrator') && this.gen >= 6) {
				data.moveData.infiltrates = true;
			}
			if (data.source.hasAbility('normalize') && this.gen >= 6) {
				data.moveData.type = 'Normal';
			}
			const hitMove = new this.dex.Move(data.moveData) as ActiveMove;

			this.actions.trySpreadMoveHit([target], data.source, hitMove, true);
			if (data.source.isActive && data.source.hasItem('lifeorb') && this.gen >= 5) {
				this.singleEvent('AfterMoveSecondarySelf', data.source.getItem(), data.source.itemState, data.source, target, data.source.getItem());
			}
			this.activeMove = null;

			this.checkWin();
		},
	},
	healreplacement: {
		// this is a slot condition
		name: 'healreplacement',
		onStart(target, source, sourceEffect) {
			this.effectState.sourceEffect = sourceEffect;
			this.add('-activate', source, 'healreplacement');
		},
		onSwitchInPriority: 1,
		onSwitchIn(target) {
			if (!target.fainted) {
				target.heal(target.maxhp);
				this.add('-heal', target, target.getHealth, '[from] move: ' + this.effectState.sourceEffect, '[zeffect]');
				target.side.removeSlotCondition(target, 'healreplacement');
			}
		},
	},
	stall: {
		// Protect, Detect, Endure counter
		name: 'stall',
		duration: 2,
		counterMax: 729,
		onStart() {
			this.effectState.counter = 3;
		},
		onStallMove(pokemon) {
			// this.effectState.counter should never be undefined here.
			// However, just in case, use 1 if it is undefined.
			const counter = this.effectState.counter || 1;
			this.debug("Success chance: " + Math.round(100 / counter) + "%");
			const success = this.randomChance(1, counter);
			if (!success) delete pokemon.volatiles['stall'];
			return success;
		},
		onRestart() {
			if (this.effectState.counter < (this.effect as Condition).counterMax!) {
				this.effectState.counter *= 3;
			}
			this.effectState.duration = 2;
		},
	},

	/*
	// start writing condition for Porygon-Z-Ma'adowr swapped stats after it uses Reboot. Needs a lot of fixing
	swpzm: {
		// this is a slot condition
		name: 'swpzm',
		// Logic for switching out
		onSwitchOut(pokemon) {
    	// No need to reset anything for swapped stats since they are managed by volatiles
			},
		// Logic for switching back in
		onSwitchIn(pokemon) {
    		if (pokemon.baseSpecies.baseSpecies === 'Porygon-Z-Ma\'adowr' && pokemon.volatiles['swpzm']) {
        		// Ensure the swapped stats are retained
        		this.add('-setboost', pokemon, 'atk', pokemon.storedStats.atk, '[from] move: Reboot');
        		this.add('-setboost', pokemon, 'spa', pokemon.storedStats.spa, '[from] move: Reboot');
        		this.add('-setboost', pokemon, 'def', pokemon.storedStats.def, '[from] move: Reboot');
        		this.add('-setboost', pokemon, 'spd', pokemon.storedStats.spd, '[from] move: Reboot');
    		}
		},
		// When the effect ends (if you want to remove the volatile effect at some point)
		onEnd(pokemon) {
    		if (pokemon.baseSpecies.baseSpecies === 'Porygon-Z-Ma\'adowr' && pokemon.volatiles['swpzm']) {
        		delete pokemon.volatiles['swpzm']; // Clear the volatile effect
        	// Optionally, reset the stats back to their original values if needed
    		}
		},
	},
	// end */
	gem: {
		name: 'gem',
		duration: 1,
		affectsFainted: true,
		onBasePowerPriority: 14,
		onBasePower(basePower, user, target, move) {
			this.debug('Gem Boost');
			return this.chainModify([5325, 4096]);
		},
	},

	// weather is implemented here since it's so important to the game

	raindance: {
		name: 'RainDance',
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem('damprock')) {
				return 8;
			}
			return 5;
		},
		onWeatherModifyDamage(damage, attacker, defender, move) {
			// start: Incandescent Flame, making sure it is unaffected by Rain
			if (move.id === 'incandescentflame' && !attacker.hasItem('utilityumbrella')) {
				this.debug('rain Incandescent Flame boost');
				return this.chainModify(1);
			} // end
			if (defender.hasItem('utilityumbrella')) return;
			if (move.type === 'Water') {
				this.debug('rain water boost');
				return this.chainModify(1.5);
			}
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
	primordialsea: {
		name: 'PrimordialSea',
		effectType: 'Weather',
		duration: 0,
		onTryMovePriority: 1,
		onTryMove(attacker, defender, move) {
			if (move.type === 'Fire' && move.id !== 'incandescentflame' && move.category !== 'Status') { // ensures Incandescent Flame does damage in Primordial Sea
				this.debug('Primordial Sea fire suppress');
				this.add('-fail', attacker, move, '[from] Primordial Sea');
				this.attrLastMove('[still]');
				return null;
			}
		},
		onWeatherModifyDamage(damage, attacker, defender, move) {
			if (defender.hasItem('utilityumbrella')) return;
			if (move.type === 'Water') {
				this.debug('Rain water boost');
				return this.chainModify(1.5);
			}
		},
		onFieldStart(field, source, effect) {
			this.add('-weather', 'PrimordialSea', '[from] ability: ' + effect.name, '[of] ' + source);
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-weather', 'PrimordialSea', '[upkeep]');
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
			if (source?.hasItem('heatrock')) {
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
			if (move.type === 'Fire') {
				this.debug('Sunny Day fire boost');
				return this.chainModify(1.5);
			}
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
	desolateland: {
		name: 'DesolateLand',
		effectType: 'Weather',
		duration: 0,
		onTryMovePriority: 1,
		onTryMove(attacker, defender, move) {
			if (move.type === 'Water' && move.category !== 'Status') {
				this.debug('Desolate Land water suppress');
				this.add('-fail', attacker, move, '[from] Desolate Land');
				this.attrLastMove('[still]');
				return null;
			}
		},
		onWeatherModifyDamage(damage, attacker, defender, move) {
			if (defender.hasItem('utilityumbrella')) return;
			if (move.type === 'Fire') {
				this.debug('Sunny Day fire boost');
				return this.chainModify(1.5);
			}
		},
		onFieldStart(field, source, effect) {
			this.add('-weather', 'DesolateLand', '[from] ability: ' + effect.name, '[of] ' + source);
		},
		onImmunity(type, pokemon) {
			if (pokemon.hasItem('utilityumbrella')) return;
			if (type === 'frz') return false;
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-weather', 'DesolateLand', '[upkeep]');
			this.eachEvent('Weather');
		},
		onFieldEnd() {
			this.add('-weather', 'none');
		},
	},
	sandstorm: {
		name: 'Sandstorm',
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem('smoothrock')) {
				return 8;
			}
			return 5;
		},
		// This should be applied directly to the stat before any of the other modifiers are chained
		// So we give it increased priority.
		onModifySpDPriority: 10,
		onModifySpD(spd, pokemon) {
			if (pokemon.hasType('Rock') && this.field.isWeather('sandstorm')) {
				return this.modify(spd, 1.5);
			}
		},
		onFieldStart(field, source, effect) {
			if (effect?.effectType === 'Ability') {
				if (this.gen <= 5) this.effectState.duration = 0;
				this.add('-weather', 'Sandstorm', '[from] ability: ' + effect.name, '[of] ' + source);
			} else {
				this.add('-weather', 'Sandstorm');
			}
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-weather', 'Sandstorm', '[upkeep]');
			if (this.field.isWeather('sandstorm')) this.eachEvent('Weather');
		},
		onWeather(target) {
			this.damage(target.baseMaxhp / 16);
		},
		onFieldEnd() {
			this.add('-weather', 'none');
		},
	},
	hail: {
		name: 'Hail',
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem('icyrock')) {
				return 8;
			}
			return 5;
		},
		onFieldStart(field, source, effect) {
			if (effect?.effectType === 'Ability') {
				if (this.gen <= 5) this.effectState.duration = 0;
				this.add('-weather', 'Hail', '[from] ability: ' + effect.name, '[of] ' + source);
			} else {
				this.add('-weather', 'Hail');
			}
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-weather', 'Hail', '[upkeep]');
			if (this.field.isWeather('hail')) this.eachEvent('Weather');
		},
		onWeather(target) {
			this.damage(target.baseMaxhp / 16);
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
			if (source?.hasItem('icyrock')) {
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
	deltastream: {
		name: 'DeltaStream',
		effectType: 'Weather',
		duration: 0,
		onEffectivenessPriority: -1,
		onEffectiveness(typeMod, target, type, move) {
			if (move && move.effectType === 'Move' && move.category !== 'Status' && type === 'Flying' && typeMod > 0) {
				this.add('-fieldactivate', 'Delta Stream');
				return 0;
			}
		},
		onFieldStart(field, source, effect) {
			this.add('-weather', 'DeltaStream', '[from] ability: ' + effect.name, '[of] ' + source);
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-weather', 'DeltaStream', '[upkeep]');
			this.eachEvent('Weather');
		},
		onFieldEnd() {
			this.add('-weather', 'none');
		},
	},

	dynamax: {
		name: 'Dynamax',
		noCopy: true,
		onStart(pokemon) {
			this.effectState.turns = 0;
			pokemon.removeVolatile('minimize');
			pokemon.removeVolatile('substitute');
			if (pokemon.volatiles['torment']) {
				delete pokemon.volatiles['torment'];
				this.add('-end', pokemon, 'Torment', '[silent]');
			}
			if (['cramorantgulping', 'cramorantgorging'].includes(pokemon.species.id) && !pokemon.transformed) {
				pokemon.formeChange('cramorant');
			}
			this.add('-start', pokemon, 'Dynamax', pokemon.gigantamax ? 'Gmax' : '');
			if (pokemon.baseSpecies.name === 'Shedinja') return;

			// Changes based on dynamax level, 2 is max (at LVL 10)
			const ratio = 1.5 + (pokemon.dynamaxLevel * 0.05);

			pokemon.maxhp = Math.floor(pokemon.maxhp * ratio);
			pokemon.hp = Math.floor(pokemon.hp * ratio);
			this.add('-heal', pokemon, pokemon.getHealth, '[silent]');
		},
		onTryAddVolatile(status, pokemon) {
			if (status.id === 'flinch') return null;
		},
		onBeforeSwitchOutPriority: -1,
		onBeforeSwitchOut(pokemon) {
			pokemon.removeVolatile('dynamax');
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.id === 'behemothbash' || move.id === 'behemothblade' || move.id === 'dynamaxcannon') {
				return this.chainModify(2);
			}
		},
		onDragOutPriority: 2,
		onDragOut(pokemon) {
			this.add('-block', pokemon, 'Dynamax');
			return null;
		},
		onResidualPriority: -100,
		onResidual() {
			this.effectState.turns++;
		},
		onEnd(pokemon) {
			this.add('-end', pokemon, 'Dynamax');
			if (pokemon.baseSpecies.name === 'Shedinja') return;
			pokemon.hp = pokemon.getUndynamaxedHP();
			pokemon.maxhp = pokemon.baseMaxhp;
			this.add('-heal', pokemon, pokemon.getHealth, '[silent]');
		},
	},

	// start: Engraving
	grassengravingeffect: {
		name: 'Grass Engraving Effect',
		noCopy: true,
		/*onStart(side) {
            this.add('-message', `The Grass Engraving was activated on ${side.name}'s side!`);
        },*/
        onUpdate(pokemon) {
            if (pokemon.hasType('Grass')) {
                pokemon.addVolatile('grassfeature');
            } else {
                pokemon.removeVolatile('grassfeature');
            }
        },
	},
	bugengravingeffect: {
		name: 'Bug Engraving Effect',
		noCopy: true,
		/*onStart(side) {
            this.add('-message', `The Bug Engraving was activated on ${side.name}'s side!`);
        },*/
        onUpdate(pokemon) {
            if (pokemon.hasType('Bug')) {
                pokemon.addVolatile('bugfeature');
            } else {
                pokemon.removeVolatile('bugfeature');
            }
        },
	},
	fireengravingeffect: {
		name: 'Fire Engraving Effect',
		noCopy: true,
		/*onStart(side) {
            this.add('-message', `The Fire Engraving was activated on ${side.name}'s side!`);
        },*/
        onUpdate(pokemon) {
            if (pokemon.hasType('Fire')) {
                pokemon.addVolatile('firefeature');
            } else {
                pokemon.removeVolatile('firefeature');
            }
        },
	},
	waterengravingeffect: {
		name: 'Water Engraving Effect',
		noCopy: true,
		/*onStart(side) {
            this.add('-message', `The Water Engraving was activated on ${side.name}'s side!`);
        },*/
        onUpdate(pokemon) {
            if (pokemon.hasType('Water')) {
                pokemon.addVolatile('waterfeature');
            } else {
                pokemon.removeVolatile('waterfeature');
            }
        },
	},
	iceengravingeffect: {
		name: 'Ice Engraving Effect',
		noCopy: true,
		/*onStart(side) {
            this.add('-message', `The Ice Engraving was activated on ${side.name}'s side!`);
        },*/
        onUpdate(pokemon) {
            if (pokemon.hasType('Ice')) {
                pokemon.addVolatile('icefeature');
            } else {
                pokemon.removeVolatile('icefeature');
            }
        },
	},
	electricengravingeffect: {
		name: 'Electric Engraving Effect',
		noCopy: true,
		/*onStart(side) {
            this.add('-message', `The Ice Engraving was activated on ${side.name}'s side!`);
        },*/
        onUpdate(pokemon) {
            if (pokemon.hasType('Electric')) {
                pokemon.addVolatile('electricfeature');
            } else {
                pokemon.removeVolatile('electricfeature');
            }
        },
	},
	psychicengravingeffect: {
		name: 'Psychic Engraving Effect',
		noCopy: true,
		/*onStart(side) {
            this.add('-message', `The Psychic Engraving was activated on ${side.name}'s side!`);
        },*/
        onUpdate(pokemon) {
            if (pokemon.hasType('Psychic')) {
                pokemon.addVolatile('psychicfeature');
            } else {
                pokemon.removeVolatile('psychicfeature');
            }
        },
	},
	ghostengravingeffect: {
		name: 'Ghost Engraving Effect',
		noCopy: true,
		/*onStart(side) {
            this.add('-message', `The Ghost Engraving was activated on ${side.name}'s side!`);
        },*/
        onUpdate(pokemon) {
            if (pokemon.hasType('Ghost')) {
                pokemon.addVolatile('ghostfeature');
            } else {
                pokemon.removeVolatile('ghostfeature');
            }
        },
	},
	poisonengravingeffect: {
		name: 'Poison Engraving Effect',
		noCopy: true,
		/*onStart(side) {
            this.add('-message', `The Poison Engraving was activated on ${side.name}'s side!`);
        },*/
        onUpdate(pokemon) {
            if (pokemon.hasType('Poison')) {
                pokemon.addVolatile('poisonfeature');
            } else {
                pokemon.removeVolatile('poisonfeature');
            }
        },
	},
	fightingengravingeffect: {
		name: 'Fighting Engraving Effect',
		noCopy: true,
		/*onStart(side) {
            this.add('-message', `The Fighting Engraving was activated on ${side.name}'s side!`);
        },*/
        onUpdate(pokemon) {
            if (pokemon.hasType('Fighting')) {
                pokemon.addVolatile('fightingfeature');
            } else {
                pokemon.removeVolatile('fightingfeature');
            }
        },
	},
	rockengravingeffect: {
		name: 'Rock Engraving Effect',
		noCopy: true,
		/*onStart(side) {
            this.add('-message', `The Rock Engraving was activated on ${side.name}'s side!`);
        },*/
        onUpdate(pokemon) {
            if (pokemon.hasType('Rock')) {
                pokemon.addVolatile('rockfeature');
            } else {
                pokemon.removeVolatile('rockfeature');
            }
        },
	},
	groundengravingeffect: {
		name: 'Ground Engraving Effect',
		noCopy: true,
		/*onStart(side) {
            this.add('-message', `The Ground Engraving was activated on ${side.name}'s side!`);
        },*/
        onUpdate(pokemon) {
            if (pokemon.hasType('Ground')) {
                pokemon.addVolatile('groundfeature');
            } else {
                pokemon.removeVolatile('groundfeature');
            }
        },
	},
	normalengravingeffect: {
		name: 'Normal Engraving Effect',
		noCopy: true,
		/*onStart(side) {
            this.add('-message', `The Normal Engraving was activated on ${side.name}'s side!`);
        },*/
        onUpdate(pokemon) {
            if (pokemon.hasType('Normal')) {
                pokemon.addVolatile('normalfeature');
            } else {
                pokemon.removeVolatile('normalfeature');
            }
        },
	},
	flyingengravingeffect: {
		name: 'Flying Engraving Effect',
		noCopy: true,
		/*onStart(side) {
            this.add('-message', `The Flying Engraving was activated on ${side.name}'s side!`);
        },*/
		  // Aegislash-Ma'adowr (Grass, Steel) should now be able to benefit from the effect once the Engraving is activated and if it switches to its blade-form (Grass, Flying)
        onUpdate(pokemon) {
            if (pokemon.hasType('Flying') || (pokemon.baseSpecies.name === 'Aegislash-Ma\'adowr' && 
				((pokemon.hasType('Grass') && pokemon.hasType('Steel')) || (pokemon.hasType('Grass') && pokemon.hasType('???'))))) {
                pokemon.addVolatile('flyingfeature');
            } else {
                pokemon.removeVolatile('flyingfeature');
            }
        },
	},
	dragonengravingeffect: {
		name: 'Dragon Engraving Effect',
		noCopy: true,
		/*onStart(side) {
            this.add('-message', `The Dragon Engraving was activated on ${side.name}'s side!`);
        },*/
        onUpdate(pokemon) {
            if (pokemon.hasType('Dragon')) {
                pokemon.addVolatile('dragonfeature');
            } else {
                pokemon.removeVolatile('dragonfeature');
            }
        },
	},
	steelengravingeffect: {
		name: 'Steel Engraving Effect',
		noCopy: true,
		/*onStart(side) {
            this.add('-message', `The Steel Engraving was activated on ${side.name}'s side!`);
        },*/
        onUpdate(pokemon) {
            if (pokemon.hasType('Steel')) {
                pokemon.addVolatile('steelfeature');
            } else {
                pokemon.removeVolatile('steelfeature');
            }
        },
	},
	darkengravingeffect: {
		name: 'Dark Engraving Effect',
		noCopy: true,
		/*onStart(side) {
            this.add('-message', `The Dark Engraving was activated on ${side.name}'s side!`);
        },*/
        onUpdate(pokemon) {
            if (pokemon.hasType('Dark')) {
                pokemon.addVolatile('darkfeature');
            } else {
                pokemon.removeVolatile('darkfeature');
            }
        },
	},
	fairyengravingeffect: {
		name: 'Fairy Engraving Effect',
		noCopy: true,
		/*onStart(side) {
            this.add('-message', `The Fairy Engraving was activated on ${side.name}'s side!`);
        },*/
        onUpdate(pokemon) {
            if (pokemon.hasType('Fairy')) {
                pokemon.addVolatile('fairyfeature');
            } else {
                pokemon.removeVolatile('fairyfeature');
            }
        },
	},
	// end
	anquiterraengravingeffect: {
		name: 'Anquiterra Engraving Effect',
		noCopy: true,
		/*onStart(side) {
            this.add('-message', `The Anquiterra Engraving was activated on ${side.name}'s side!`);
        },*/
        onUpdate(pokemon) {
    	    if (!pokemon.volatiles['anquiterrafeature']) {
                pokemon.addVolatile('anquiterrafeature');
            }
        },
	},
	arastinithengravingeffect: {
		name: 'Arastinith Engraving Effect',
		noCopy: true,
		/*onStart(side) {
            this.add('-message', `The Arastinith Engraving was activated on ${side.name}'s side!`);
        },*/
        onUpdate(pokemon) {
            if (!pokemon.volatiles['arastinithfeature']) {
                pokemon.addVolatile('arastinithfeature');
           }
        },
	},
	barbaraclemaadowrengravingeffect: {
		name: 'Barbaracle-Ma\'adowr Engraving Effect',
		noCopy: true,
		/*onStart(side) {
            this.add('-message', `The Barbaracle-Ma'adowr Engraving was activated on ${side.name}'s side!`);
        },*/
        onUpdate(pokemon) {
            if (!pokemon.volatiles['barbaraclemaadowrfeature']) {
                pokemon.addVolatile('barbaraclemaadowrfeature');
            }
        },
	},
	beheeyemengravingeffect: {
		name: 'Beheeyem Engraving Effect',
		noCopy: true,
		/*onStart(side) {
            this.add('-message', `The Beheeyem Engraving was activated on ${side.name}'s side!`);
        },*/
        onUpdate(pokemon) {
            if (!pokemon.volatiles['beheeyemfeature']) {
                pokemon.addVolatile('beheeyemfeature');
            }
        },
	},
	chantyrusengravingeffect: {
		name: 'Chantyrus Engraving Effect',
		noCopy: true,
		/*onStart(side) {
            this.add('-message', `The Chantyrus Engraving was activated on ${side.name}'s side!`);
        },*/
        onUpdate(pokemon) {
            if (!pokemon.volatiles['chantyrusfeature']) {
                pokemon.addVolatile('chantyrusfeature');
            }
        },
	},
	craftenirengravingeffect: {
		name: 'Craftenir Engraving Effect',
		noCopy: true,
		/*onStart(side) {
            this.add('-message', `The Craftenir Engraving was activated on ${side.name}'s side!`);
        },*/
        onUpdate(pokemon) {
            if (!pokemon.volatiles['craftenirfeature']) {
                pokemon.addVolatile('craftenirfeature');
            }
        },
	},
	equinoqueengravingeffect: {
		name: 'Equinoque Engraving Effect',
		noCopy: true,
		/*onStart(side) {
            this.add('-message', `The Equinoque Engraving was activated on ${side.name}'s side!`);
        },*/
        onUpdate(pokemon) {
            if (!pokemon.volatiles['equinoquefeature']) {
                pokemon.addVolatile('equinoquefeature');
        //    } else {
        //        pokemon.removeVolatile('equinoquefeature');
            }
        },
	},
	golurkengravingeffect: {
		name: 'Golurk Engraving Effect',
		noCopy: true,
		/*onStart(side) {
            this.add('-message', `The Golurk Engraving was activated on ${side.name}'s side!`);
        },*/
        onUpdate(pokemon) {
            if (!pokemon.volatiles['golurkfeature']) {
                pokemon.addVolatile('golurkfeature');
            }
        },
	},
	grapplinengravingeffect: {
		name: 'Grapplin Engraving Effect',
		noCopy: true,
		/*onStart(side) {
            this.add('-message', `The Grapplin Engraving was activated on ${side.name}'s side!`);
        },*/
        onUpdate(pokemon) {
            if (!pokemon.volatiles['grapplinfeature']) {
                pokemon.addVolatile('grapplinfeature');
            }
        },
	},
	iblissengravingeffect: {
		name: 'Ibliss Engraving Effect',
		noCopy: true,
		/*onStart(side) {
            this.add('-message', `The Ibliss Engraving was activated on ${side.name}'s side!`);
        },*/
        onUpdate(pokemon) {
            if (!pokemon.volatiles['iblissfeature']) {
                pokemon.addVolatile('iblissfeature');
            }
        },
	},
	kenuterraengravingeffect: {
		name: 'Kenuterra Engraving Effect',
		noCopy: true,
		/*onStart(side) {
            this.add('-message', `The Kenuterra Engraving was activated on ${side.name}'s side!`);
        },*/
        onUpdate(pokemon) {
            if (!pokemon.volatiles['kenuterrafeature']) {
                pokemon.addVolatile('kenuterrafeature');
            }
        },
	},
	klinklangengravingeffect: {
		name: 'Klinklang Engraving Effect',
		noCopy: true,
		/*onStart(side) {
            this.add('-message', `The Klinklang Engraving was activated on ${side.name}'s side!`);
        },*/
        onUpdate(pokemon) {
            if (!pokemon.volatiles['klinklangfeature']) {
                pokemon.addVolatile('klinklangfeature');
            }
        },
	},
	maudiorengravingeffect: {
		name: 'Maudior Engraving Effect',
		noCopy: true,
		/*onStart(side) {
            this.add('-message', `The Maudior Engraving was activated on ${side.name}'s side!`);
        },*/
        onUpdate(pokemon) {
            if (!pokemon.volatiles['maudiorfeature']) {
                pokemon.addVolatile('maudiorfeature');
            }
        },
	},
	orasundraengravingeffect: {
		name: 'Orasundra Engraving Effect',
		noCopy: true,
		/*onStart(side) {
            this.add('-message', `The Orasundra Engraving was activated on ${side.name}'s side!`);
        },*/
        onUpdate(pokemon) {
            if (!pokemon.volatiles['orasundrafeature']) {
                pokemon.addVolatile('orasundrafeature');
            }
        },
	},
	parascentengravingeffect: {
		name: 'Parascent Engraving Effect',
		noCopy: true,
		/*onStart(side) {
            this.add('-message', `The Parascent Engraving was activated on ${side.name}'s side!`);
        },*/
        onUpdate(pokemon) {
            if (!pokemon.volatiles['parascentfeature']) {
                pokemon.addVolatile('parascentfeature');
            }
        },
	},
	rabscaengravingeffect: {
		name: 'Rabsca Engraving Effect',
		noCopy: true,
		/*onStart(side) {
            this.add('-message', `The Rabsca Engraving was activated on ${side.name}'s side!`);
        },*/
        onUpdate(pokemon) {
            if (!pokemon.volatiles['rabscafeature']) {
                pokemon.addVolatile('rabscafeature');
            }
        },
	},
	sneezibiaengravingeffect: {
		name: 'Sneezibia Engraving Effect',
		noCopy: true,
		/*onStart(side) {
            this.add('-message', `The Sneezibia Engraving was activated on ${side.name}'s side!`);
        },*/
        onUpdate(pokemon) {
            if (!pokemon.volatiles['sneezibiafeature']) {
                pokemon.addVolatile('sneezibiafeature');
            }
        },
	},
	spiritombengravingeffect: {
		name: 'Spiritomb Engraving Effect',
		noCopy: true,
		/*onStart(side) {
            this.add('-message', `The Spiritomb Engraving was activated on ${side.name}'s side!`);
        },*/
        onUpdate(pokemon) {
            if (!pokemon.volatiles['spiritombfeature']) {
                pokemon.addVolatile('spiritombfeature');
            }
        },
	},
	tinkatonengravingeffect: {
		name: 'Tinkaton Engraving Effect',
		noCopy: true,
		/*onStart(side) {
            this.add('-message', `The Tinkaton Engraving was activated on ${side.name}'s side!`);
        },*/
        onUpdate(pokemon) {
            if (!pokemon.volatiles['tinkatonfeature']) {
                pokemon.addVolatile('tinkatonfeature');
            }
        },
	},
	zebsonavoltengravingeffect: {
		name: 'Zebsonavolt Engraving Effect',
		noCopy: true,
		/*onStart(side) {
            this.add('-message', `The Zebsonavolt Engraving was activated on ${side.name}'s side!`);
        },*/
        onUpdate(pokemon) {
            if (!pokemon.volatiles['zebsonavoltfeature']) {
                pokemon.addVolatile('zebsonavoltfeature');
            }
        },
	},
	// end

	// start: List of Engrave effects
	grassfeature: {
		name: 'Grass Feature',
		noCopy: true,
		onStart(pokemon) {
		//	this.add('-start', pokemon, 'Grass Feature');
			this.effectState.faintedCount = 0; // Initialize the fainted count
		},
		onUpdate(pokemon) {
			// Count the number of fainted Grass-type Pokémon on the user's side
			const faintedGrassTypes = pokemon.side.pokemon.filter(p => p.fainted && p.hasType('Grass')).length;
			
			if (faintedGrassTypes !== this.effectState.faintedCount) {
				this.effectState.faintedCount = faintedGrassTypes; // Update the fainted count
				this.add('-anim', pokemon, "Cosmic Power");
				this.add('-message', `${pokemon.name}'s Grass Engraving boosts its power!`);
			}
		},
		onBasePower(basePower, attacker, defender, move) {
			// Update the fainted count again just before the attack
			const faintedGrassTypes = attacker.side.pokemon.filter(p => p.fainted && p.hasType('Grass')).length;
			this.effectState.faintedCount = faintedGrassTypes; // Update the count for the current attack
	
			if (this.effectState.faintedCount > 0) {
				// Increase the base power based on the number of fainted Grass-type Pokémon
				const powerBoost = [4096, 4506, 4915, 5325, 5734, 6144];
				const boostIndex = Math.min(this.effectState.faintedCount, powerBoost.length - 1);
				this.debug(`Grass Feature boost: ${powerBoost[boostIndex]}/4096`);
				return this.chainModify([powerBoost[boostIndex], 4096]); // Modify the base power
			}
		},
	//	onEnd(pokemon) {
	//		this.add('-end', pokemon, 'Grass Engraving');
	//	},
	},
	bugfeature: {
		name: 'Bug Feature',
		noCopy: true,
		onPrepareHit(source, target, move) {
			// Store boosts for all targets affected by the move
			if (move && move.target === 'allAdjacentFoes') {
				for (const foe of source.foes()) {
					if (foe.isAdjacent(source)) {
						const boosts = { ...foe.boosts };
						foe.addVolatile('siphoning', source);
						foe.volatiles['siphoning'].boosts = boosts;
					}
				}
			} else if (move && move.target === 'allAdjacent') {
				for (const adjacent of this.getAllActive()) {
					if (adjacent !== source && adjacent.isAdjacent(source)) {
						const boosts = { ...adjacent.boosts };
						adjacent.addVolatile('siphoning', source);
						adjacent.volatiles['siphoning'].boosts = boosts;
					}
				}
			} else if (move && move.target === 'normal') {
				const boosts = { ...target.boosts };
				target.addVolatile('siphoning', source);
				target.volatiles['siphoning'].boosts = boosts;
			}
		},
		onAfterMove(source, target, move) {
			// Check if the target has fainted
			if (target.fainted) return;
	
			const stats = ['atk', 'def', 'spa', 'spd', 'spe', 'accuracy', 'evasion'] as const;
			type BoostStatistics = typeof stats[number];
	
			// Iterate through all active Pokémon to check for stat changes
			for (const activeTarget of this.getAllActive()) {
				if (!activeTarget.volatiles['siphoning']) continue;
	
				const storedBoosts = activeTarget.volatiles['siphoning'].boosts;
				const currentBoosts = activeTarget.boosts;
				let statLowered = false;
	
				for (const stat of stats) {
					// Check if the current boost is less than the stored boost
					if (currentBoosts[stat] < storedBoosts[stat]) {
						statLowered = true;
						break;
					}
				}
	
				if (statLowered) {
					const damage = Math.floor(target.maxhp / 8);
					this.damage(damage, activeTarget, source); // Apply damage to the affected target
				//	this.add('-message', `${activeTarget.name} took chip damage from ${source.name}'s Bug Engraving!`);
	
					if (source.hp < source.maxhp) {
						const healAmount = Math.min(damage, source.maxhp - source.hp);
						this.heal(healAmount, source);
				//		this.add('-message', `${source.name} recovered health from the Bug Engraving!`);
					}
				}
	
				// Clean up the volatile after processing
				delete activeTarget.volatiles['siphoning'];
			}
		},
	},
	firefeature: {
		name: 'Fire Feature',
		noCopy: true,
		onFaint(target, source, effect) {
			if (!source || !effect || target.side === source.side) return;
			if (effect.effectType === 'Move' && !effect.flags['futuremove']) {
				this.add('-ability', target, 'Amaterasu');
			//	target.setStatus('brn');
				const bannedAbilities = [
					'battlebond', 'comatose', 'disguise', 'multitype', 'powerconstruct', 'rkssystem', 'schooling', 'shieldsdown', 'skyrider', 'stancechange', 'truant', 'zenmode',
				];
				if (bannedAbilities.includes(source.ability) || source.hasType('Fire')) {
					return;
				} else {
					source.setAbility('amaterasu');
					source.baseAbility = 'amaterasu' as ID;
					source.ability = 'amaterasu' as ID;
					this.add('-ability', source, 'Amaterasu', '[from] Ability: Amaterasu');
				}
			}
		},
	},
	waterfeature: {
		name: 'Water Feature',
		noCopy: true,
		onUpdate(pokemon) {
			if (pokemon.status === 'brn') {
				this.add('-activate', pokemon, 'Water Engraving');
				pokemon.cureStatus();
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'brn') return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] Water Engraving');
			}
			return false;
		},
		onResidualOrder: 6,
	    onResidual(pokemon) {
			this.heal(pokemon.baseMaxhp / 16);
		},
	},
	icefeature: {
		name: 'Ice Feature',
		noCopy: true,
		onDamage(damage, target, source, effect) {
			if (
				effect.effectType === "Move" &&
				!effect.multihit &&
				(!effect.negateSecondary && !(effect.hasSheerForce && source.hasAbility('sheerforce')))
			) {
				this.effectState.checkedAngerShell = false;
			} else {
				this.effectState.checkedAngerShell = true;
			}
		},
		onTryEatItem(item) {
			const healingItems = [
				'aguavberry', 'enigmaberry', 'figyberry', 'iapapaberry', 'magoberry', 'sitrusberry', 'wikiberry', 'oranberry', 'berryjuice',
			];
			if (healingItems.includes(item.id)) {
				return this.effectState.checkedAngerShell;
			}
			return true;
		},
		onAfterMoveSecondary(target, source, move) {
			this.effectState.checkedAngerShell = true;
			if (!source || source === target || !target.hp || !move.totalDamage) return;
			const lastAttackedBy = target.getLastAttackedBy();
			if (!lastAttackedBy) return;
			const damage = move.multihit ? move.totalDamage : lastAttackedBy.damage;
			if (target.hp <= target.maxhp / 2 && target.hp + damage > target.maxhp / 2) {
				this.boost({atk: 1, spa: 1, spe: 1, def: -1, spd: -1}, target, target);
			}
		},
	},
	electricfeature: {
		name: 'Electric Feature',
		noCopy: true,
		onModifyCritRatio(critRatio, source) {
			const hpPercentage = source.hp / source.maxhp; // Calculate remaining HP percentage
			const hpFactor = Math.floor((1 - hpPercentage) * 100); // Convert to a scale of 0-100
				
			// Increase critical hit ratio based on remaining HP
			// The more HP lost, the higher the critical hit ratio
			critRatio += Math.min(hpFactor, 100); // Cap the increase at 100
			
			return critRatio; // Return the modified critical hit ratio
		},
	},
	psychicfeature: {
		name: 'Psychic Feature',
		noCopy: true,
		onModifyMovePriority: -5,
		onModifyMove(move) {
			if (!move.ignoreImmunity) move.ignoreImmunity = {};
			if (move.ignoreImmunity !== true) {
				move.ignoreImmunity['Psychic'] = true;
			}
			move.ignoreEvasion = true;
		},
	},
	ghostfeature: {
		name: 'Ghost Feature',
		noCopy: true,
		onFaint(target, source, effect) {
			if (effect && effect.effectType === 'Move' && !effect.flags['futuremove'] && !source.volatiles['curse']) {
				source.addVolatile('curse', target);
			}
		},
	},
	poisonfeature: {
		name: 'Poison Feature',
		noCopy: true,
		onFaint(target, source, effect) {
			if (effect && effect.effectType === 'Move' && !effect.flags['futuremove']) {
			  source.addVolatile('contamination', target);
			}
		},
	},
	fightingfeature: {
		name: 'Fighting Feature',
		noCopy: true,
		onAnyModifyDamage(damage, source, target, move) {
			if (target === this.effectState.target) {
				this.debug('Fighting Engraving weaken');
				return this.chainModify(0.75);
			}
		},
		onCriticalHit(critical, source, target) {
			if (target === this.effectState.target) {
				this.debug('Fighting Engraving prevents critical hit');
				return false; // Prevent the critical hit
			}
		},
		onAnyAccuracy(accuracy, target, source, move) {
			if (move && (target === this.effectState.target)) {
				return true; // Always hit if the target is the user of the fightingfeature
			}
			return accuracy; // Return the original accuracy for all other cases
		},
	},
	rockfeature: {
		name: 'Rock Feature',
		noCopy: true,
		onSourceModifyAccuracyPriority: -1,
		onSourceModifyAccuracy(accuracy) {
			if (typeof accuracy !== 'number') return;
	    	this.debug('Rock Engraving - enhancing accuracy');
			return this.chainModify([4915, 4096]); // translates to 20% more accuracy
		},
		onModifyCritRatio(critRatio) {
			this.debug('Rock Engraving - increasing critical hit ratio');
			return critRatio + 2; // Increase critical hit ratio by 2
		},
		onModifyDamage(damage, source, target, move) {
			if (source === this.effectState.target) {
				this.debug('Rock Engraving - reducing damage by 25%');
				return this.chainModify(0.75); // Reduce user's damage by 25%
			}
			return damage; // Return original damage for all other cases
		},
	},
	groundfeature: {
		name: 'Ground Feature',
		noCopy: true,
		onSourceModifyDamage(damage, source, target, move) {
			if (source === this.effectState.target && !source.activeTurns) {
				this.debug('Ground Engraving - reducing damage by 50% on switch-in');
				return this.chainModify(0.5); // Reduce damage by 50%
			}
			return damage; // Return original damage for all other cases
		},
	},
    normalfeature: {
		name: 'Normal Feature',
		noCopy: true,
		onDamage(damage, target, source, effect) {
			// Check if the damage is indirect
			if (effect.effectType !== 'Move') {
				this.debug('Normal Engraving - reducing indirect damage by 50%');
				return this.chainModify(0.5); // Reduce indirect damage by 50%
			}
			return damage; // Return original damage for direct damage
		},
	},
	flyingfeature: {
		name: 'Flying Feature',
		noCopy: true,
		onBasePowerPriority: 30,
    	onBasePower(basePower, attacker, defender, move) {
        const basePowerAfterMultiplier = this.modify(basePower, this.event.modifier);
        this.debug('Base Power: ' + basePowerAfterMultiplier);
        if (basePowerAfterMultiplier <= 60 && (attacker.hasType('Flying') || 
			(attacker.baseSpecies.name === 'Aegislash-Ma\'adowr' && ((attacker.hasType('Grass') && attacker.hasType('Steel')) ||
			(attacker.hasType('Grass') && attacker.hasType('???')))))) {
            this.debug('Flying Engraving boost');
            return this.chainModify(1.5); // Boost base power by 50%
        	}
    	},
	},
	dragonfeature: {
		name: 'Dragon Feature',
		noCopy: true,
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Dragon' && move.category !== 'Status' && defender.hp <= defender.maxhp / 2) {
				this.debug('Dragon Engraving boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Dragon' && move.category !== 'Status' && defender.hp <= defender.maxhp / 2) {
				this.debug('Dragon Engraving boost');
				return this.chainModify(1.5);
			}
		},
	},
	steelfeature: {
		name: 'Steel Feature',
		noCopy: true,
		onModifySecondaries(secondaries) {
			this.debug('Steel Engraving prevent secondary');
			return secondaries.filter(effect => !!(effect.self || effect.dustproof));
		},
	},
	darkfeature: {
		name: 'Dark Feature',
		noCopy: true,
		onUpdate(this: Battle, pokemon: Pokemon) {
			if (pokemon.moveSlots.length < 4) {
			  const move = this.dex.moves.get('exhume');
			  if (move.exists) {
				this.add('-activate', pokemon, 'Dark Feature');
				pokemon.moveSlots.push({
				  move: move.name,
				  id: move.id,
				  pp: move.pp,
				  maxpp: move.pp,
				  target: move.target,
				  disabled: false,
				  used: false,
				  virtual: true,
				});
				this.add('-message', `${pokemon.name} learned Exhume!`);
				pokemon.removeVolatile('darkfeature');
			  }
			}
		  },
	},
	fairyfeature: {
		name: 'Fairy Feature',
		noCopy: true,
		onAfterMoveSecondarySelf(source, target, move) {
			if (!move || !target || source.switchFlag === true) return;
	  
			// Check if the move is not a status move and the target is not the source
			if (target !== source && move.category !== 'Status') {
			  // Check if the source has an item and if it's Fairy Engraving
			  if (source.item === 'fairyengraving') {
				const targetItem = target.takeItem(source); // Try to take the target's item
				if (targetItem) {
				  // Replace the Fairy Engraving item with the stolen item
				  const stolenItem = source.setItem(targetItem);
				  if (!stolenItem) {
					target.item = targetItem.id; // Bypass setItem to avoid breaking choicelock or anything
				  }
				  this.add('-item', source, targetItem, '[from] Fairy Feature', '[of] ' + target);
				}
			  } else {
				// Standard item stealing logic if not using Fairy Engraving
				if (source.item || source.volatiles['gem'] || move.id === 'fling') return;
	  
				const yourItem = target.takeItem(source);
				if (!yourItem) return;
	  
				// Set the item for the source
				if (!source.setItem(yourItem)) {
				  target.item = yourItem.id; // Bypass setItem to avoid breaking choicelock or anything
				  return;
				}
	  
				this.add('-item', source, yourItem, '[from] item: Fairy Engraving', '[of] ' + target);
			  }
	  
			  // If the target is still alive, give it Black Sludge
			  if (target.hp > 0) {
				target.setItem('blacksludge'); // Give Black Sludge to the target
				this.add('-item', target, 'Black Sludge', '[from] Fairy Feature');
			  }
			}
		  },
	},
	// end
	anquiterrafeature: {
		name: 'Anquiterra Feature',
		noCopy: true,
 	    onModifySpe(spe, pokemon) {
        // Check if the Pokémon is grounded and its HP is at or below 50%
        	if (pokemon.isGrounded() && pokemon.hp <= pokemon.maxhp / 2) {
            	this.debug('Anquiterra Feature speed boost');
            	return this.chainModify(1.5); // Increase speed by 50%
        	}
        	return spe; // Return original speed if conditions are not met
    	},
	},
	arastinithfeature: {
		name: 'Arastinith Feature',
		noCopy: true,
		onDamagingHit(damage, target, source, move) {
			if (target === this.effectState.target && source !== target && !source.volatiles['mentaldamage']) {
				source.addVolatile('mentaldamage', target);
			}
		},
		onAfterMove(source, targets, move) {
			// Check if the source is the effect target
			if (source !== this.effectState.target) return;
	
			// Ensure targets is treated as an array
			const affectedTargets = Array.isArray(targets) ? targets : [targets];
	
			// Prevent applying 'mentaldamage' if the source used a move that targets itself
			if (affectedTargets.includes(source)) return;  // Check if the source is one of the targets
	
			// Determine the type of spread move and apply 'mentaldamage' accordingly
			if (move && move.target === 'allAdjacentFoes') {
				for (const foe of source.foes()) {
					if (foe.isAdjacent(source)) {
						if (!foe.volatiles['mentaldamage']) {
							foe.addVolatile('mentaldamage', source);
						}
					}
				}
			} else if (move && move.target === 'allAdjacent') {
				for (const adjacent of this.getAllActive()) {
					if (adjacent !== source && adjacent.isAdjacent(source)) {
						if (!adjacent.volatiles['mentaldamage']) {
							adjacent.addVolatile('mentaldamage', source);
						}
					}
				}
			} else if (move && move.target === 'normal') {
				// Apply to the specific target of the move
				const firstTarget = affectedTargets[0]; // Access the first target safely
				if (firstTarget && firstTarget !== source && !firstTarget.volatiles['mentaldamage']) {
					firstTarget.addVolatile('mentaldamage', source);
				}
			}
			// Additional cases can be added here for other types of spread moves if needed
		},
	},
	barbaraclemaadowrfeature: {
		name: 'Barbaracle-Ma\'adowr Feature',
		noCopy: true,
		onSourceModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).typeMod > 0) {
				this.debug('Barbaracle-Ma\'adowr Feature neutralize');
				return this.chainModify(0.75);
			}
		},
	},
	beheeyemfeature: {
		name: 'Beheeyem Feature',
		noCopy: true,
		onAfterEachBoost(boost, target, source, effect) {
			if (effect?.id === 'beheeyemfeature') return;
			const partner = target.side.active.find(pokemon => pokemon && pokemon !== target && !pokemon.fainted);
			if (!partner || !partner.volatiles['beheeyemfeature']) return;
	
			const beheeyemBoost: SparseBoostsTable = {};
			let activated = false;
	
			// Check for decreases in stats with safe access
			if (boost.atk !== undefined && boost.atk < 0) {
				beheeyemBoost.spa = -boost.atk; // If user lowers Atk, raise ally's SpA
				activated = true;
			}
			if (boost.spa !== undefined && boost.spa < 0) {
				beheeyemBoost.atk = -boost.spa; // If user lowers SpA, raise ally's Atk
				activated = true;
			}
			if (boost.def !== undefined && boost.def < 0) {
				beheeyemBoost.spd = -boost.def; // If user lowers Def, raise ally's SpD
				activated = true;
			}
			if (boost.spd !== undefined && boost.spd < 0) {
				beheeyemBoost.def = -boost.spd; // If user lowers SpD, raise ally's Def
				activated = true;
			}
	
			if (activated) {
				this.add('-activate', target, 'Beheeyem Feature');
				this.boost(beheeyemBoost, partner, target, null, true);
			}
		},
	
	},
	chantyrusfeature: {
		name: 'Chantyrus Feature',
		noCopy: true,
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'colourmegone', 'judgment', 'multiattack', 'naturalgift', 'pincerattack', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Normal' && !noModifyType.includes(move.id) &&
				!(move.isZ && move.category !== 'Status') && !(move.name === 'Tera Blast' && pokemon.terastallized)) {
				move.type = 'Ghost';
			}
		},
	},
	craftenirfeature: {
		name: 'Craftenir Feature',	
		noCopy: true,	
		onUpdate(pokemon) {
			// Check if the Pokémon has no item
			if (!pokemon.item && !pokemon.volatiles['jewellimit']) {
				// Get the current primary type of the Pokémon
				const currentType = pokemon.types[0]; // Get the current primary type

				// Determine the primary type based on the species
				const speciesPrimaryType = pokemon.species.types[0]; // Get the original primary type from species
	
				// Assign a jewel based on the current or species primary type
				let jewel;
            	const typeToUse = currentType === '???' ? speciesPrimaryType : currentType; // Use species type if current is ???
				switch (typeToUse) {
					case 'Grass':
						jewel = 'Grass Gem';
						break;
					case 'Bug':
						jewel = 'Bug Gem';
						break;
					case 'Fire':
						jewel = 'Fire Gem';
						break;
					case 'Water':
						jewel = 'Water Gem';
						break;
					case 'Ice':
						jewel = 'Ice Gem';
						break;
					case 'Electric':
						jewel = 'Electric Gem';
						break;
					case 'Psychic':
						jewel = 'Psychic Gem';
						break;
					case 'Ghost':
						jewel = 'Ghost Gem';
						break;
					case 'Ground':
						jewel = 'Ground Gem';
						break;
					case 'Rock':
						jewel = 'Rock Gem';
						break;
					case 'Fighting':
						jewel = 'Fighting Gem';
						break;
					case 'Normal':
						jewel = 'Normal Gem';
						break;
					case 'Flying':
						jewel = 'Flying Gem';
						break;
					case 'Dragon':
						jewel = 'Dragon Gem';
						break;
					case 'Steel':
						jewel = 'Steel Gem';
						break;
					case 'Dark':
						jewel = 'Dark Gem';
						break;
					case 'Fairy':
						jewel = 'Fairy Gem';
						break;
					default:
						jewel = `${typeToUse} Gem`; // Default to the user's original primary type gem if ??? type
						break;
				}
	
				// Assign the jewel to the Pokémon
				pokemon.setItem(jewel);
				this.add('-item', pokemon, jewel);
				// Mark that this Pokémon has received a jewel and can no longer receive another jewel unless it reenters the field
				pokemon.volatiles['jewellimit'] = { id: 'jewellimit' };
			}
		},
	},
	equinoquefeature: {
		name: 'Equinoque Feature',
		noCopy: true,
		onStart(pokemon) {
			if (pokemon.side.sideConditions['tailwind']) {
				this.boost({spe: 1}, pokemon, pokemon);
			}
		},
		onAllySideConditionStart(target, source, sideCondition) {
			const pokemon = this.effectState.target;
			if (sideCondition.id === 'tailwind') {
				this.boost({spe: 1}, pokemon, pokemon);
			}
		},
	},
	golurkfeature: {
		name: 'Golurk Feature',
		noCopy: true,
	//	onStart(pokemon) {
	//		this.add('-start', pokemon, 'Golurk Lock');
    //    	this.add('-message', `${pokemon.name} will be locked into a move at 33% HP or below!`);
    //	},
		onUpdate(pokemon) {
			const hpThreshold = pokemon.maxhp / 3; // Calculate HP threshold
			// Check if the Pokémon's HP is above or below the threshold
			if (pokemon.hp > hpThreshold) {
				// Remove Golurk Lock if HP is above threshold
				if (pokemon.volatiles['golurklock'] &&
					!['choicescarf', 'choiceband', 'choicespecs'].includes(pokemon.item)) {
					pokemon.removeVolatile('golurklock');
				}
			} else if (pokemon.hp <= hpThreshold) {
				// Add Golurk Lock if HP is below threshold
				if (!pokemon.volatiles['golurklock'] &&
					!['choicescarf', 'choiceband', 'choicespecs'].includes(pokemon.item)) {
					pokemon.addVolatile('golurklock');
				}
			}
		},
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (attacker.hp <= attacker.maxhp / 3) {
				this.debug('Golurk Feature boost');
				return this.chainModify(1.5); // Boost Attack by 1.5x
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (attacker.hp <= attacker.maxhp / 3) {
				this.debug('Golurk Feature boost');
				return this.chainModify(1.5); // Boost Special Attack by 1.5x
			}
		},
	},
	grapplinfeature: {
		name: 'Grapplin Feature',
		noCopy: true,
		onResidualOrder: 10,
		onResidual(pokemon) {
			if (pokemon.side.sideConditions['tailwind']) {
				this.heal(pokemon.baseMaxhp / 8);
			}
		},
		
	},
	iblissfeature: {
		name: 'Ibliss Feature',
		noCopy: true,
	//	duration: 1,
		onTryHitPriority: 1,
		onTryHit(target, source, move) {
			if (target === source || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			const newMove = this.dex.getActiveMove(move.id);
			newMove.hasBounced = true;
			newMove.pranksterBoosted = false;
			this.actions.useMove(newMove, target, source);
			return null;
		},
	},
	kenuterrafeature: {
		name: 'Kenuterra Feature',
		noCopy: true,
		onModifyDefPriority: 6,
		onModifyDef(def, pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 2 && pokemon.isGrounded()) {
				this.debug('Kenuterra Feature boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpDPriority: 6,
		onModifySpD(spd, pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 2 && pokemon.isGrounded()) {
				this.debug('Kenuterra Feature boost');
				return this.chainModify(1.5);
			}
		},
	},
	klinklangfeature: {
		name: 'Klinklang Feature',
		noCopy: true,
		onResidualOrder: 26,
    	onResidual(pokemon) {
			// Check if the Pokémon is Electric or Steel
			/*if ((pokemon.types.includes('Electric') || pokemon.types.includes('Rock') || pokemon.types.includes('Steel')) && this.field.isTerrain('electricterrain')) {
				// Apply Magnet Rise effect if not already active
				if (!pokemon.volatiles['magnetrise']) {
					pokemon.addVolatile('magnetrise');
				//	this.add('-activate', pokemon, 'move: Magnet Rise');
				}
			}*/
				
			// Determine the turn number
			const turnNumber = this.turn; // Assuming 'this.turn' gives the current turn number
			// Check for the presence of Plus and Minus abilities as well as Magnet Modul item among active Pokémon

			const hasPlusAllyMinus = pokemon.hasAbility('plus') && pokemon.side.active.some(ally => ally && ally !== pokemon && (ally.hasAbility('minus') 
			|| (ally.hasItem('magnetmodule') && (ally.hasType('Electric') || ally.hasType('Rock') || ally.hasType('Steel')))));
			const hasMinusAllyPlus = pokemon.hasAbility('minus') && pokemon.side.active.some(ally => ally && ally !== pokemon && (ally.hasAbility('plus') 
			|| (ally.hasItem('magnetmodule') && (ally.hasType('Electric') || ally.hasType('Rock') || ally.hasType('Steel')))));
			const hasMagnetModuleAllyPlusMinus = pokemon.hasItem('magnetmodule') && pokemon.side.active.some(ally => ally && ally !== pokemon && (ally.hasAbility('plus') || ally.hasAbility('minus')));

			// Apply boosts based on the conditions
            if (turnNumber % 2 === 0 && (hasPlusAllyMinus || hasMinusAllyPlus || hasMagnetModuleAllyPlusMinus)) { // Even turn
                this.boost({atk: 1, spa: 1}, pokemon); // Boost Atk and SpA
            } else if (turnNumber % 2 === 1 && (hasPlusAllyMinus || hasMinusAllyPlus || hasMagnetModuleAllyPlusMinus)) { // Odd turn
                this.boost({def: 1, spd: 1}, pokemon); // Boost Def and SpD
            }
		
		},
	},
	lanturnfeature: {
		name: 'Lanturn Feature',
		noCopy: true,
		onSourceModifyAccuracy(accuracy, source, target) {
			if (typeof accuracy === 'number') {
				return this.chainModify([1300, 1000]);
			}
		},
		onModifyAccuracy(accuracy, target, source) {
			if (typeof accuracy === 'number') {
				return this.chainModify([1300, 1000]);
			}
		},
	},
	maudiorfeature: {
		name: 'Maudior Feature',
		noCopy: true,
	},
	orasundrafeature: {
		name: 'Orasundra Feature',
		noCopy: true,
		onDamagingHit(damage, target, source, move) {
			if (target === this.effectState.target && source !== target && !source.volatiles['paradamage']) {
			  source.addVolatile('paradamage', target);
			}
		},
		onAfterMove(source, targets, move) {
			// Check if the source is the effect target
			if (source !== this.effectState.target) return;
	
			// Ensure targets is treated as an array
			const affectedTargets = Array.isArray(targets) ? targets : [targets];
	
			// Prevent applying 'paradamage' if the source used a move that targets itself
			if (affectedTargets.includes(source)) return;  // Check if the source is one of the targets
	
			// Determine the type of spread move and apply 'paradamage' accordingly
			if (move && move.target === 'allAdjacentFoes') {
				for (const foe of source.foes()) {
					if (foe.isAdjacent(source)) {
						if (!foe.volatiles['paradamage']) {
							foe.addVolatile('paradamage', source);
						}
					}
				}
			} else if (move && move.target === 'allAdjacent') {
				for (const adjacent of this.getAllActive()) {
					if (adjacent !== source && adjacent.isAdjacent(source)) {
						if (!adjacent.volatiles['paradamage']) {
							adjacent.addVolatile('paradamage', source);
						}
					}
				}
			} else if (move && move.target === 'normal') {
				// Apply to the specific target of the move
				const firstTarget = affectedTargets[0]; // Access the first target safely
				if (firstTarget && firstTarget !== source && !firstTarget.volatiles['paradamage']) {
					firstTarget.addVolatile('paradamage', source);
				}
			}
			// Additional cases can be added here for other types of spread moves if needed
		},
	
	},
	parascentfeature: {
		name: 'Parascent Feature',
		noCopy: true,
		onHit(target, source, move) {
			if (move && target.getMoveHitData(move).typeMod > 0) {
				if (!source.volatiles['hayfever']) {
					if (!source.hasType('Grass') && !source.hasItem('Safety Goggles') && !source.hasAbility('Overcoat')) {
						source.addVolatile('hayfever');
						this.add('-start', source, 'Hay Fever');
                    	this.add('-message', `${source.name} caught Hay Fever from the Parascent Engraving!`);
					}
				}
			}
		},
	},
	rabscafeature: {
		name: 'Rabsca Feature',   
		noCopy: true, 
		onHit(target, source, move) {
			const isMultihit = move.multihit; // Check if the move is multihit
			const hasParentalBond = source.hasAbility('parentalbond'); // Check for Parental Bond
	
			// If the move is a multihit move
			if (isMultihit) {
				// Heal only for the first hit
				if (move.hit === 1) { // Check if this is the first hit
					const typeMod = target.getMoveHitData(move).typeMod; // Get the effectiveness of the move
					if (typeMod > 0) {
						this.heal(target.baseMaxhp / 4); // Heal the target
					}
				}
				return; // Stop further healing from subsequent hits
			}
	
			// If the move is not a multihit move
			if (!isMultihit) {
				if (hasParentalBond) {
					// Heal only for the first hit if the source has Parental Bond
					if (move.hit === 1) { // Check if this is the first hit
						const typeMod = target.getMoveHitData(move).typeMod; // Get the effectiveness of the move
						if (typeMod > 0) {
							this.heal(target.baseMaxhp / 4); // Heal the target
						}
					}
				} else {
					// Heal normally if the source does not have Parental Bond
					const typeMod = target.getMoveHitData(move).typeMod; // Get the effectiveness of the move
					if (typeMod > 0) {
						this.heal(target.baseMaxhp / 4); // Heal the target
					}
				}
			}
		},
	},
	sneezibiafeature: {
		name: 'Sneezibia Feature',
		noCopy: true,
		onSourceModifyDamage(damage, source, target, move) {
			if (target.hp >= target.maxhp && target.hasType('Ice')) {
				this.debug('Sneezibia Feature weaken');
				return this.chainModify(0.5);
			}
		},
	},
	spiritombfeature: {
		name: 'Spiritomb Feature',
		noCopy: true,
		onSourceHit(target, source, move) {
			if (!move || !target) return;
			// Check if the source used a move that's super effective and not status
			if (target !== source && !target.volatiles['embargo'] &&
				move.category !== 'Status' && target.getMoveHitData(move).typeMod > 0 &&
				!target.volatiles['stall']) {
				// Inflict Embargo on the target
				target.addVolatile('embargo');
			}
		},
	},
	tinkatonfeature: {
		name: 'Tinkaton Feature',
        noCopy: true,
    	onStart(pokemon) {
			this.effectState.recycled = false;
		},
		onAfterUseItem(item, pokemon) {
			if (pokemon === this.effectState.target && !this.effectState.recycled) {
				const success = this.actions.useMove('recycle', pokemon);
				if (success) {
					this.effectState.recycled = true;
				}
			}
		},
    
	},
	zebsonavoltfeature: {
		name: 'Zebsonavolt Feature',
		noCopy: true,
		onSourceHit(target, source, move) {
			if (!move || !target) return;
			if (target !== source && move.category !== 'Status' && target.getMoveHitData(move).typeMod > 0) {
				target.trySetStatus('brn', source);
			}
		},
	},
	// end

	// start: Golurk Lock, from Golurk Feature
	golurklock: {
    	name: 'Golurk Lock',
    	noCopy: true,
    	onBeforeMove(pokemon, target, move) {
			if (!pokemon.volatiles['golurklock'].lockedMove) {
				// First move used after getting the volatile becomes the locked move
				pokemon.volatiles['golurklock'].lockedMove = move.id;
				this.add('-message', `${pokemon.name} locked into ${move.name}!`);
			} else if (pokemon.volatiles['golurklock'].lockedMove !== move.id) {
				// If trying to use a different move, fail
				this.add('-fail', pokemon);
				this.add('-message', `${pokemon.name} is locked into ${this.dex.moves.get(pokemon.volatiles['golurklock'].lockedMove).name}!`);
				return false;
			}
			// If using the locked move, allow it to proceed
		},
		onDisableMove(pokemon) {
			if (pokemon.volatiles['golurklock'].lockedMove) {
				for (const moveSlot of pokemon.moveSlots) {
					if (moveSlot.id !== pokemon.volatiles['golurklock'].lockedMove) {
						pokemon.disableMove(moveSlot.id);
					}
				}
			}
		},
		onEnd(pokemon) {
			this.add('-end', pokemon, 'Golurk Lock');
			this.add('-message', `${pokemon.name} is no longer locked into a move.`);
		},
    
	},
	// end

	// start: Hayy Fever, bound by Parascent Engraving
	hayfever: {
		name: 'Hay Fever',
		noCopy: true,
	//	onStart(pokemon) {
	//		this.add('-start', pokemon, 'Hay Fever');
	//	},
		onResidualOrder: 9,
		onResidual(pokemon) {
			this.damage(pokemon.baseMaxhp / 8);
		//	this.add('-damage', pokemon, pokemon.getHealth, '[from] Hay Fever');
		},
		onAnyTryBoost(boost, target, source, effect) {
			if (source && target === source) {
				let showMsg = false;
				for (let i in boost) {
					// @ts-ignore
					if (boost[i] > 0) {
						// @ts-ignore
						boost[i] = 0;
						showMsg = true;
					}
				}
				if (showMsg && !(effect as ActiveMove).secondaries) {
					this.add('-fail', target, 'Hay Fever');
				}
			}
		},
		onEnd(pokemon) {
			this.add('-end', pokemon, 'Hay Fever');
		},
	},
	// end

	// start: Mental Damage, bound by Arastinith Engraving
	mentaldamage: {
		name: 'Mental Damage',
  		onStart(pokemon, source) {
    		this.add('-start', pokemon, 'Mental Damage', '[silent]');
    		this.effectState.source = source;
  		},
  		onResidualOrder: 10,
  		onResidual(pokemon) {
			const conditions = ['attract', 'taunt', 'encore', 'torment', 'disable', 'healblock'];
    		if (conditions.some(condition => pokemon.volatiles[condition])) {
				this.damage(pokemon.baseMaxhp / 8, pokemon, this.effectState.source);
			}
  		},
		onEnd(pokemon) {
    		this.add('-end', pokemon, 'Mental Damage');
  		},
	},
	// end

	// start: Para Damage, bound by Orasundra Engraving
	paradamage: {
		name: 'Para Damage',
		onStart(pokemon, source) {
		  this.add('-start', pokemon, 'Para Damage', '[silent]');
		  this.effectState.source = source;
		},
		onModifyAtkPriority: 5,
		onModifyAtk(atk, pokemon) {
		  if (pokemon.status === 'par') {
			return this.chainModify(0.5);
		  }
		},
		onResidualOrder: 11,
		onResidual(pokemon) {
		  if (pokemon.status === 'par') {
			this.damage(pokemon.baseMaxhp / 16, pokemon, this.effectState.source);
		  }
		},
		onEnd(pokemon) {
		  this.add('-end', pokemon, 'Para Damage');
		},
	},
	// end

	// start: Contamination from Poison Feature
	contamination: {
		name: 'Contamination',
		onStart(pokemon) {
			this.add('-start', pokemon, 'contamination');
			this.effectState.checkedAlly = false;
		},
		onUpdate(pokemon) {
			if (!pokemon.hasType('Poison') && !pokemon.hasType('Steel') && !pokemon.status) {
				if (pokemon.isGrounded() && this.field.isTerrain('mistyterrain')) {
						return;
					}
					if (pokemon.hasAbility('immunity')) {
						return;
					}
					if (pokemon.hasAbility('comatose')) {
						return;
					}
					if (pokemon.side.getSideCondition('safeguard')) {
						return;
					}
					if (pokemon.hasItem('sunring') && (pokemon.baseSpecies.baseSpecies === 'Horizonoc')) {
						return;
					}
					// Check if the ally is Horizonoc and Sun or Desolate Land is active
					const allyPresent = pokemon.side.active.some(ally => ally && ally !== pokemon && ally.baseSpecies.baseSpecies === 'Horizonoc' && ally.hasItem('sunring'));
					if (allyPresent && ['sunnyday', 'desolateland'].includes(this.field.effectiveWeather())) {
						return;
					}
				pokemon.setStatus('psn', pokemon, this.effect, true);
			}
		},
		onResidualOrder: 11,
		onResidual(pokemon) {
			// Check for allies every turn after the first turn
			if (!this.effectState.checkedAlly) {
				this.effectState.checkedAlly = true;
			} else {
			const ally = pokemon.side.active.find(p => p && p !== pokemon && !p.volatiles['contamination']);
			if (ally) {
				ally.addVolatile('contamination', pokemon);
				this.add('-message', `${ally.name} was contaminated by ${pokemon.name}'s toxin!`);
				this.effectState.checkedAlly = false; // Reset the check for the newly contaminated ally
				}
		  	}
		},
		onFaint(pokemon, source, effect) {
			// Check if the Pokémon fainted from an attack
			if (effect && effect.effectType === 'Move' && !effect.flags['futuremove']) {
				if (source && source.hp && source.isActive) {
			  	source.addVolatile('contamination', pokemon);
			  	this.add('-message', `${source.name} was contaminated by ${pokemon.name}'s toxin!`);
				}
			}
		},
	},
	// end

	steeldenial: {
		name: "Steel Denial",
		onPrepareHit(pokemon) {
			// If the Pokémon has the Steel type, replace it with "???"
			if (pokemon.hasType('Steel')) {
				const oldTypes = pokemon.types.slice();
				pokemon.setType(pokemon.types.map(type => type === 'Steel' ? '???' : type));
				// Check if the types actually changed
				if (oldTypes.join('/') !== pokemon.types.join('/')) {
					this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[from] Steel Denial');
				}
				// pokemon.types = pokemon.types.filter(type => type !== 'Steel'); // Remove Steel type rather than replacing it with ???

				/*// Check if the types actually changed visually
				if (oldTypes.length !== pokemon.types.length) {
					this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[from] Steel Denial');
				}*/
			}
		},
		onUpdate(pokemon) {
			// If the Pokémon has the Steel type, replace it with "???"
			if (pokemon.hasType('Steel')) {
				const oldTypes = pokemon.types.slice();
				pokemon.setType(pokemon.types.map(type => type === 'Steel' ? '???' : type));
				// Check if the types actually changed
				if (oldTypes.join('/') !== pokemon.types.join('/')) {
					this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[from] Steel Denial');
				}
				// pokemon.types = pokemon.types.filter(type => type !== 'Steel'); // Remove Steel type rather than replacing it with ???

				/*// Check if the types actually changed visually
				if (oldTypes.length !== pokemon.types.length) {
					this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[from] Steel Denial');
				}*/
			}
		},
		
	},
	// end
	// start: Aegislash-Ma'adowr is the only Pkm who could get this volatile if hit by Soak
	soaksteeldenial: {
		name: 'Soak Steel Denial',
		onPrepareHit(pokemon) {
			// Aegislash-Ma'adowr is just soaked and will turn into mono Water
			if (pokemon.types.join() !== 'Water' && !pokemon.volatiles['typetracker']) {
				pokemon.setType('Water');
				this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[from] Soak Steel Denial');
			}
			// When ally Craftenir is present: Water, blade -> Grass/Steel, shield -> Water/???, shield
			if (pokemon.types.join() !== 'Water' && pokemon.hasType('Grass') && pokemon.hasType('Steel') && pokemon.volatiles['typetracker'] && pokemon.volatiles['chainlink']) {
				pokemon.setType(['Water', '???']);
				this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[from] Soak Steel Denial');
			}
			// When ally Craftenir is present: Water/???, shield -> (Grass/Flying, blade) -> Water, blade
			if (pokemon.types.join() !== 'Water' && pokemon.hasType('Grass') && pokemon.hasType('Flying') && pokemon.volatiles['typetracker'] && pokemon.volatiles['chainlink']) {
				pokemon.setType('Water');
				this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[from] Soak Steel Denial');
			}
			// Water/Steel (Steel regained), shield -> (Grass/Flying, blade) -> Water, blade
			if (pokemon.types.join() !== 'Water' && pokemon.hasType('Grass') && pokemon.hasType('Flying') && pokemon.volatiles['typetracker'] && !pokemon.volatiles['chainlink']) {
				pokemon.setType('Water');
				this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[from] Soak Steel Denial');
			}
			// Water, blade -> (Grass/Steel, shield) -> Water/Steel, shield
			if (pokemon.types.join() !== 'Water' && pokemon.hasType('Grass') && pokemon.hasType('Steel') && pokemon.volatiles['typetracker'] && !pokemon.volatiles['chainlink']) {
				pokemon.setType(['Water', 'Steel']);
				this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[from] Soak Steel Denial');
			}
		},
		onUpdate(pokemon) {
			// Aegislash-Ma'adowr is just soaked and will turn into mono Water
			if (pokemon.types.join() !== 'Water' && !pokemon.volatiles['typetracker']) {
				pokemon.setType('Water');
				this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[from] Soak Steel Denial');
			}
			// When ally Craftenir is present: Water, blade -> Grass/Steel, shield -> Water/???, shield
			if (pokemon.types.join() !== 'Water' && pokemon.hasType('Grass') && pokemon.hasType('Steel') && pokemon.volatiles['typetracker'] && pokemon.volatiles['chainlink']) {
				pokemon.setType(['Water', '???']);
				this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[from] Soak Steel Denial');
			}
			// When ally Craftenir is present: Water/???, shield -> (Grass/Flying, blade) -> Water, blade
			if (pokemon.types.join() !== 'Water' && pokemon.hasType('Grass') && pokemon.hasType('Flying') && pokemon.volatiles['typetracker'] && pokemon.volatiles['chainlink']) {
				pokemon.setType('Water');
				this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[from] Soak Steel Denial');
			}
			// Water/Steel (Steel regained), shield -> (Grass/Flying, blade) -> Water, blade
			if (pokemon.types.join() !== 'Water' && pokemon.hasType('Grass') && pokemon.hasType('Flying') && pokemon.volatiles['typetracker'] && !pokemon.volatiles['chainlink']) {
				pokemon.setType('Water');
				this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[from] Soak Steel Denial');
			}
			// Water, blade -> (Grass/Steel, shield) -> Water/Steel, shield
			if (pokemon.types.join() !== 'Water' && pokemon.hasType('Grass') && pokemon.hasType('Steel') && pokemon.volatiles['typetracker'] && !pokemon.volatiles['chainlink']) {
				pokemon.setType(['Water', 'Steel']);
				this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[from] Soak Steel Denial');
			}
		},
	},
	typetracker: {
		name: 'Type Tracker',
		onPrepareHit(pokemon) {
			if (pokemon.volatiles['chainlink']) {
				// ally Craftenir borrows Steel from non soaked Aegislash-Ma'adowr
				if (pokemon.baseSpecies.name === 'Aegislash-Ma\'adowr' && pokemon.hasType('Steel') && !pokemon.volatiles['soaksteeldenial']) {
					pokemon.setType(pokemon.getTypes(true).map(type => type === "Steel" ? "???" : type));
					this.add('-start', pokemon, 'typechange', pokemon.types.join('/'));
				}
			} 
			if (!pokemon.volatiles['chainlink']) {
				// ally Craftenir switches out; typetracker ensures Aegislash-Ma'adowr was the Pkm that gave its Steel-type to ally Craftenir
				if (pokemon.baseSpecies.name === 'Aegislash-Ma\'adowr' && pokemon.species.name !== 'Aegislash-Blade-Ma\'adowr' && pokemon.hasType('Water') 
					&& !pokemon.hasType('Steel') && pokemon.volatiles['soaksteeldenial']) {
					pokemon.addType('Steel');
					this.add('-start', pokemon, 'typeadd', 'Steel', '[from] Soak Steel Denial');
					this.add('-message', `${pokemon.name} gained the Steel type!`);
				}
			}
		},
		onUpdate(pokemon) {
			if (pokemon.volatiles['chainlink']) {
				// ally Craftenir borrows Steel from non soaked Aegislash-Ma'adowr
				if (pokemon.baseSpecies.name === 'Aegislash-Ma\'adowr' && pokemon.hasType('Steel') && !pokemon.volatiles['soaksteeldenial']) {
					pokemon.setType(pokemon.getTypes(true).map(type => type === "Steel" ? "???" : type));
					this.add('-start', pokemon, 'typechange', pokemon.types.join('/'));
				}
			} 
			if (!pokemon.volatiles['chainlink']) {
				// ally Craftenir switches out; typetracker ensures Aegislash-Ma'adowr was the Pkm that gave its Steel-type to ally Craftenir
				if (pokemon.baseSpecies.name === 'Aegislash-Ma\'adowr' && pokemon.species.name !== 'Aegislash-Blade-Ma\'adowr' && pokemon.hasType('Water') 
					&& !pokemon.hasType('Steel') && pokemon.volatiles['soaksteeldenial']) {
					pokemon.addType('Steel');
					this.add('-start', pokemon, 'typeadd', 'Steel', '[from] Soak Steel Denial');
					this.add('-message', `${pokemon.name} gained the Steel type!`);
				}
			}
		},
	},

	// start: Wind Blessing from Eye of the Sun move
	windblessing: {
		name: 'Wind Blessing',
		noCopy: true,
		duration: 5,
		onSideStart(side, source) {
			this.add('-sidestart', side, 'Wind Blessing');
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).typeMod > 0) {
				this.debug('Wind Blessing neutralize');
				return this.chainModify(0.75);
			}
		},
		onSideResidualOrder: 26,
		onSideResidualSubOrder: 6,
		onSideEnd(side) {
			this.add('-sideend', side, 'Wind Blessing');
		},
	},
	// end

	// Commander needs two conditions so they are implemented here
	// Dondozo
	commanded: {
		name: "Commanded",
		noCopy: true,
		onStart(pokemon) {
			this.boost({atk: 2, spa: 2, spe: 2, def: 2, spd: 2}, pokemon);
		},
		onDragOutPriority: 2,
		onDragOut() {
			return false;
		},
		// Prevents Shed Shell allowing a swap
		onTrapPokemonPriority: -11,
		onTrapPokemon(pokemon) {
			pokemon.trapped = true;
		},
	},
	// Tatsugiri
	commanding: {
		name: "Commanding",
		noCopy: true,
		onDragOutPriority: 2,
		onDragOut() {
			return false;
		},
		// Prevents Shed Shell allowing a swap
		onTrapPokemonPriority: -11,
		onTrapPokemon(pokemon) {
			pokemon.trapped = true;
		},
		// Override No Guard
		onInvulnerabilityPriority: 2,
		onInvulnerability(target, source, move) {
			return false;
		},
		onBeforeTurn(pokemon) {
			this.queue.cancelAction(pokemon);
		},
	},

	// start: Escavalier + Grapplin Combo
	skyriderally: {
		name: "Sky Rider Ally",
		noCopy: true,
		onStart(pokemon) {
			if (!pokemon.types.includes('Steel')) {
				pokemon.types = [...pokemon.types, 'Steel']; // Spread operator to create a new array
				this.add('-message', `${pokemon.name} received armor from Escavalier! ${pokemon.name} let out a cry.`);
				// here, I would have added a sound for the battle cry. Perhaps, one day, I'll know how to add it
				// this.add('-cries', pokemon, 'Eternatus');
				this.add('-anim', pokemon, 'Roar');
				this.add('-message', `The battle intensifies as ${pokemon.name} gains extra reinforcement!`);
			}
		},
		onEnd(pokemon) {
		if (pokemon.types.includes('Steel')) {
			pokemon.types = pokemon.types.filter(type => type !== 'Steel'); // Remove Steel type
			this.add('-message', `${pokemon.name}'s armor was taken down. ${pokemon.name} is upset, feeling the loss of its protection!`);
			}
		},
	},

	skyriding: {
		name: "Sky Riding",
		noCopy: true,
		onPrepareHit(pokemon, target, move) {
			const escavalier = pokemon.side.active.find(ally => ally.species.name === 'Escavalier' && (ally.hasAbility('skyrider')));
   			if (!escavalier) return; // Ensure Escavalier is present

			// Check if the move is not a status move
			if (move.category !== 'Status') {
				// Loop through the action queue
				for (const action of this.queue.list as MoveAction[]) {
					// Check if the action is valid
					if (
						!action.move || !action.pokemon?.isActive ||
						action.pokemon.fainted || action.maxMove || action.zmove
					) {
						continue; // Skip invalid actions
					}
		
					// Check if the action belongs specifically to the ally; indirectly, that's Escavalier
					if (action.pokemon.isAlly(pokemon)) {
						this.queue.prioritizeAction(action, move); // Prioritize the action
						this.add('-waiting', pokemon, action.pokemon); // Notify that Escavalier is waiting
						break; // Exit the loop but not the function, meaning user's move should be able to do damage now
					}
				}
			}
		},	
	},
	// end

	// Arceus and Silvally's actual typing is implemented here.
	// Their true typing for all their formes is Normal, and it's only
	// Multitype and RKS System, respectively, that changes their type,
	// but their formes are specified to be their corresponding type
	// in the Pokedex, so that needs to be overridden.
	// This is mainly relevant for Hackmons Cup and Balanced Hackmons.
	arceus: {
		name: 'Arceus',
		onTypePriority: 1,
		onType(types, pokemon) {
			if (pokemon.transformed || pokemon.ability !== 'multitype' && this.gen >= 8) return types;
			let type: string | undefined = 'Normal';
			if (pokemon.ability === 'multitype') {
				type = pokemon.getItem().onPlate;
				if (!type) {
					type = 'Normal';
				}
			}
			return [type];
		},
	},
	silvally: {
		name: 'Silvally',
		onTypePriority: 1,
		onType(types, pokemon) {
			if (pokemon.transformed || pokemon.ability !== 'rkssystem' && this.gen >= 8) return types;
			let type: string | undefined = 'Normal';
			if (pokemon.ability === 'rkssystem') {
				type = pokemon.getItem().onMemory;
				if (!type) {
					type = 'Normal';
				}
			}
			return [type];
		},
	},
	rolloutstorage: {
		name: 'rolloutstorage',
		duration: 2,
		onBasePower(relayVar, source, target, move) {
			let bp = Math.max(1, move.basePower);
			bp *= Math.pow(2, source.volatiles['rolloutstorage'].contactHitCount);
			if (source.volatiles['defensecurl']) {
				bp *= 2;
			}
			source.removeVolatile('rolloutstorage');
			return bp;
		},
	},
};
