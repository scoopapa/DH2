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
			if (this.randomChance(1, 4) && !(pokemon.hasAbility('quickfeet'))) {
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
			if (move.id === 'incandescentflame' && !attacker.hasItem('utilityumbrella')) {
				this.debug('rain Incandescent Flame boost');
				return this.chainModify(1);
			}
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
			if (move.type === 'Fire' && move.id !== 'incandescentflame' && move.category !== 'Status') {
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
	// start: Lost Zone
	desertgales: {
		name: 'Desert Gales',
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem('smoothrock')) {
				return 8;
			}
			return 5;
		},
		onFieldStart(field, source, effect) {
			if (effect?.effectType === 'Ability') {
				if (this.gen <= 5) this.effectState.duration = 0;
				this.add('-ability', source, 'Desert Gales');
				this.add('-weather', 'Desert Gales', '[silent]');
				this.add('-message', `Desert gales kicked up!`);
				this.add('-message', "Normal-type moves will become Ground-type.");
				this.add('-message', "Rock-, Ground- and Steel-type moves will also have their power increased.");
				this.add('-message', "Other weather-related moves and Abilities will behave as they do in sandstorm.");
			} else {
				this.add('-weather', 'Desert Gales', '[silent]');
			}
		},
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'colourmegone', 'judgment', 'multiattack', 'naturalgift', 'pincerattack', 'revelationdance', 'schadenfreude', 'seasonalantlers', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Normal' && !noModifyType.includes(move.id) && !move.isZ && move.category !== 'Status') {
				move.type = 'Ground';
				this.add('-message', `${move.name} became ${move.type}-type in the desert gales!`);
			}
		},
		onWeatherModifyDamage(damage, attacker, defender, move) {
			if (move.type === 'Rock' || move.type === 'Ground' || move.type === 'Steel') {
				this.debug('Desert Gales boost');
				this.add('-message', `${move.name} was powered up by the desert gales!`);
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		onResidual() {
			this.add('-weather', 'Desert Gales', '[upkeep]');
			this.add('-message', `The desert gales are raging!`);
			this.eachEvent('Weather');
		},
		onFieldEnd() {
			this.add('-weather', 'none', '[silent]');
			this.add('-message', `The desert gales subsided!`);
		},
	},
	// end

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
			// Check if the target's side has the Fimbulvetr condition
			if (target.side.getSideCondition('fimbulvetr')) {
				// Deal 1/8 of max HP if Fimbulvetr is active
				this.damage(target.baseMaxhp / 8);
			} else {
				// Otherwise, deal 1/16 of max HP
				this.damage(target.baseMaxhp / 16);
			}
		},
		onFieldEnd() {
			this.add('-weather', 'none');
		},
		// start: New function to modify damage for Ice-types
		onModifyDamage(damage, pokemon, source, move) {
			// Check if Hail is active and if the Pokémon is Ice-type
			if (this.field.isWeather('hail') && pokemon.hasType('Ice') && pokemon.getMoveHitData(move).typeMod > 0) {
				this.debug('Hail reduces damage for Ice-type from super effective hit');
				return this.chainModify(0.75); // Reduce damage by 25%
			}
		},
		// end
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
		onWeather(target) {
			// Check if the target's side has the Fimbulvetr condition
			if (target.side.getSideCondition('fimbulvetr')) {
				// Deal 1/8 of max HP if Fimbulvetr is active
				this.damage(target.baseMaxhp / 8);
			}
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


	// start: Generational Feature
	dolorakiumtrigger: {
		name: 'Dolorakium Trigger',
		noCopy: true,
		onUpdate(pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Dolorak' && pokemon.hasItem('dolorakium') && !pokemon.volatiles['dolorakiumeffect']) {
				pokemon.addVolatile('dolorakiumeffect');
			}
		},
	},
	dolorakiumeffect: {
		name: 'Dolorakium Effect',
		noCopy: true,
		onUpdate(source) {
			let activated = false;
			for (const pokemon of this.getAllActive()) {
				if (!activated) {
					this.add('-activate', source, 'Dolorakium Effect', '[silent]');
				}
				activated = true;
				if (!pokemon.volatiles['dolorak']) {
					pokemon.addVolatile('dolorak');
				}
			}
		},
		onAnySwitchIn(pokemon) {
			if (!pokemon.volatiles['dolorak']) {
				pokemon.addVolatile('dolorak');
			}
		},
		onAnyDragOut(pokemon) {
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (target.baseSpecies.baseSpecies === 'Dolorak' && target.hasItem('dolorakium') && target.volatiles['dolorakiumeffect']) return;
			}
			for (const target of this.getAllActive()) {

				if (target.volatiles['dolorak']) {
					target.removeVolatile('dolorak');
				}
			}
		},
		onSwitchOut(pokemon) {
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (target.baseSpecies.baseSpecies === 'Dolorak' && target.hasItem('dolorakium') && target.volatiles['dolorakiumeffect']) return;
			}
			for (const target of this.getAllActive()) {

				if (target.volatiles['dolorak']) {
					target.removeVolatile('dolorak');
				}
			}
		},
		onAnySwitchOut(pokemon) {
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (target.baseSpecies.baseSpecies === 'Dolorak' && target.hasItem('dolorakium') && target.volatiles['dolorakiumeffect']) return;
			}
			for (const target of this.getAllActive()) {

				if (target.volatiles['dolorak']) {
					target.removeVolatile('dolorak');
				}
			}
		},
		onFaint(pokemon) {
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (target.baseSpecies.baseSpecies === 'Dolorak' && target.hasItem('dolorakium') && target.volatiles['dolorakiumeffect']) return;
			}
			for (const target of this.getAllActive()) {

				if (target.volatiles['dolorak']) {
					target.removeVolatile('dolorak');
				}
			}
		},
	},
	dolorak: {
		name: 'Dolorak',
		noCopy: true,
		onModifyCritRatio(critRatio, source) {
			if (source.volatiles['lzstartersystem']) {
				return critRatio + 1;
			}
		//	return critRatio + 1;
		},
	},
	//
	qwilinhiumtrigger: {
		name: 'Qwilinhium Trigger',
		noCopy: true,
		onUpdate(pokemon) {
			if (pokemon.species.name === 'Qwilinh-Ascend' && pokemon.hasItem('qwilinhium') && !pokemon.volatiles['qwilinhiumeffect']) {
				pokemon.addVolatile('qwilinhiumeffect');
			}
		},
	},
	qwilinhiumeffect: {
		name: 'Qwilinhium Effect',
		noCopy: true,
		onUpdate(source) {
			let activated = false;
			for (const pokemon of this.getAllActive()) {
				if (!activated) {
					this.add('-activate', source, 'Qwilinhium Effect', '[silent]');
				}
				activated = true;
				if (!pokemon.volatiles['qwilinh']) {
					pokemon.addVolatile('qwilinh');
				}
			}
		},
		onAnySwitchIn(pokemon) {
			if (!pokemon.volatiles['qwilinh']) {
				pokemon.addVolatile('qwilinh');
			}
		},
		onAnyDragOut(pokemon) {
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (target.species.name === 'Qwilinh-Ascend' && target.hasItem('qwilinhium') && target.volatiles['qwilinhiumeffect']) return;
			}
			for (const target of this.getAllActive()) {
				target.removeVolatile('qwilinh');
			}
		},
		onSwitchOut(pokemon) {
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (target.species.name === 'Qwilinh-Ascend' && target.hasItem('qwilinhium') && target.volatiles['qwilinhiumeffect']) return;
			}
			for (const target of this.getAllActive()) {
				target.removeVolatile('qwilinh');
			}
		},
		onAnySwitchOut(pokemon) {
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (target.species.name === 'Qwilinh-Ascend' && target.hasItem('qwilinhium') && target.volatiles['qwilinhiumeffect']) return;
			}
			for (const target of this.getAllActive()) {
				target.removeVolatile('qwilinh');
			}
		},
		onFaint(pokemon) {
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (target.species.name === 'Qwilinh-Ascend' && target.hasItem('qwilinhium') && target.volatiles['qwilinhiumeffect']) return;
			}
			for (const target of this.getAllActive()) {
				target.removeVolatile('qwilinh');
			}
		},
	},
	qwilinh: {
		name: 'Qwilinh',
		noCopy: true,
		onSourceModifyDamage(damage, source, target, move) {
			const stats: (keyof BoostsTable)[] = ['atk', 'def', 'spa', 'spd', 'spe', 'accuracy', 'evasion'];
        	const hasNegativeStatDrop = stats.some(stat => (target.boosts[stat] ?? 0) < 0);
        
        	if (hasNegativeStatDrop && !target.volatiles['lzstartersystem']) {
            	this.debug('Qwilinh weaken');
            	return this.chainModify(0.75);
        	}
		},
	},
	//
	sentinoyliumtrigger: {
		name: 'Sentinoylium Trigger',
		noCopy: true,
		onUpdate(pokemon) {
			if (pokemon.species.name === 'Sentinoyle-Ascend' && pokemon.hasItem('sentinoylium') && !pokemon.volatiles['sentinoyliumeffect']) {
				pokemon.addVolatile('sentinoyliumeffect');
			}
		},
	},
	sentinoyliumeffect: {
		name: 'Sentinoylium Effect',
		noCopy: true,
		onUpdate(source) {
			let activated = false;
			for (const pokemon of this.getAllActive()) {
				if (!activated) {
					this.add('-activate', source, 'Sentinoylium Effect', '[silent]');
				}
				activated = true;
				if (!pokemon.volatiles['sentinoyle']) {
					pokemon.addVolatile('sentinoyle');
				}
			}
		},
		onAnySwitchIn(pokemon) {
			if (!pokemon.volatiles['sentinoyle']) {
				pokemon.addVolatile('sentinoyle');
			}
		},
		onAnyDragOut(pokemon) {
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (target.baseSpecies.baseSpecies === 'Sentinoyle' && target.hasItem('sentinoylium') && target.volatiles['sentinoyliumeffect']) return;
			}
			for (const target of this.getAllActive()) {
				target.removeVolatile('sentinoyle');
			}
		},
		onSwitchOut(pokemon) {
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (target.baseSpecies.baseSpecies === 'Sentinoyle' && target.hasItem('sentinoylium') && target.volatiles['sentinoyliumeffect']) return;
			}
			for (const target of this.getAllActive()) {
				target.removeVolatile('sentinoyle');
			}
		},
		onAnySwitchOut(pokemon) {
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (target.baseSpecies.baseSpecies === 'Sentinoyle' && target.hasItem('sentinoylium') && target.volatiles['sentinoyliumeffect']) return;
			}
			for (const target of this.getAllActive()) {
				target.removeVolatile('sentinoyle');
			}
		},
		onFaint(pokemon) {
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (target.baseSpecies.baseSpecies === 'Sentinoyle' && target.hasItem('sentinoylium') && target.volatiles['sentinoyliumeffect']) return;
			}
			for (const target of this.getAllActive()) {
				target.removeVolatile('sentinoyle');
			}
		},
	},
	sentinoyle: {
		name: 'Sentinoyle',
		noCopy: true,
		onChangeBoost(boost: Partial<BoostsTable>, target: Pokemon, source: Pokemon | null, effect: Effect) {
			if (target.volatiles['lzstartersystem']) {
				return;
			}
			let showMsg = false;
			for (const stat in boost) {
				if (stat in boost && typeof boost[stat as keyof BoostsTable] === 'number' && boost[stat as keyof BoostsTable]! > 0) {
					delete boost[stat as keyof BoostsTable];
					showMsg = true;
				}
			}
			if (showMsg) {
				this.add('-fail', target, 'unboost', '[from] volatile: Sentinoylium Effect');
			}
		},
	},
	//
	rampardiumtrigger: {
		name: 'Rampardium Trigger',
		noCopy: true,
		onUpdate(pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Rampardos' && pokemon.hasItem('rampardium') && !pokemon.volatiles['rampardiumeffect']) {
				pokemon.addVolatile('rampardiumeffect');
			}
		},
	},
	rampardiumeffect: {
		name: 'Rampardium Effect',
		noCopy: true,
		onUpdate(source) {
			let activated = false;
			for (const pokemon of this.getAllActive()) {
				if (!activated) {
					this.add('-activate', source, 'Rampardium Effect', '[silent]');
				}
				activated = true;
				if (!pokemon.volatiles['rampardos']) {
					pokemon.addVolatile('rampardos');
				}
			}
		},
		onAnySwitchIn(pokemon) {
			if (!pokemon.volatiles['rampardos']) {
				pokemon.addVolatile('rampardos');
			}
		},
		onAnyDragOut(pokemon) {
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (target.baseSpecies.baseSpecies === 'Rampardos' && target.hasItem('rampardium') && target.volatiles['rampardiumeffect']) return;
			}
			for (const target of this.getAllActive()) {
				target.removeVolatile('rampardos');
			}
		},
		onSwitchOut(pokemon) {
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (target.baseSpecies.baseSpecies === 'Rampardos' && target.hasItem('rampardium') && target.volatiles['rampardiumeffect']) return;
			}
			for (const target of this.getAllActive()) {
				target.removeVolatile('rampardos');
			}
		},
		onAnySwitchOut(pokemon) {
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (target.baseSpecies.baseSpecies === 'Rampardos' && target.hasItem('rampardium') && target.volatiles['rampardiumeffect']) return;
			}
			for (const target of this.getAllActive()) {
				target.removeVolatile('rampardos');
			}
		},
		onFaint(pokemon) {
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (target.baseSpecies.baseSpecies === 'Rampardos' && target.hasItem('rampardium') && target.volatiles['rampardiumeffect']) return;
			}
			for (const target of this.getAllActive()) {
				target.removeVolatile('rampardos');
			}
		},
	},
	rampardos: {
		name: 'Rampardos',
		noCopy: true,
		onModifyDamage(damage, source, target, move) {
			if (move && target.getMoveHitData(move).typeMod > 0 && !target.volatiles['lzstartersystem']) {
				return this.chainModify([5120, 4096]);
			}
		},
	},
	//
	bastiodiumtrigger: {
		name: 'Bastiodium Trigger',
		noCopy: true,
		onUpdate(pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Bastiodon' && pokemon.hasItem('bastiodium') && !pokemon.volatiles['bastiodiumeffect']) {
				pokemon.addVolatile('bastiodiumeffect');
			}
		},
	},
	bastiodiumeffect: {
		name: 'Bastiodium Effect',
		noCopy: true,
		onUpdate(source) {
			let activated = false;
			for (const pokemon of this.getAllActive()) {
				if (!activated) {
					this.add('-activate', source, 'Bastiodium Effect', '[silent]');
				}
				activated = true;
				if (!pokemon.volatiles['bastiodon']) {
					pokemon.addVolatile('bastiodon');
				}
			}
		},
		onAnySwitchIn(pokemon) {
			if (!pokemon.volatiles['bastiodon']) {
				pokemon.addVolatile('bastiodon');
			}
		},
		onAnyDragOut(pokemon) {
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (target.baseSpecies.baseSpecies === 'Bastiodon' && target.hasItem('bastiodium') && target.volatiles['bastiodiumeffect']) return;
			}
			for (const target of this.getAllActive()) {
				target.removeVolatile('bastiodon');
			}
		},
		onSwitchOut(pokemon) {
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (target.baseSpecies.baseSpecies === 'Bastiodon' && target.hasItem('bastiodium') && target.volatiles['bastiodiumeffect']) return;
			}
			for (const target of this.getAllActive()) {
				target.removeVolatile('bastiodon');
			}
		},
		onAnySwitchOut(pokemon) {
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (target.baseSpecies.baseSpecies === 'Bastiodon' && target.hasItem('bastiodium') && target.volatiles['bastiodiumeffect']) return;
			}
			for (const target of this.getAllActive()) {
				target.removeVolatile('bastiodon');
			}
		},
		onFaint(pokemon) {
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (target.baseSpecies.baseSpecies === 'Bastiodon' && target.hasItem('bastiodium') && target.volatiles['bastiodiumeffect']) return;
			}
			for (const target of this.getAllActive()) {
				target.removeVolatile('bastiodon');
			}
		},
	},
	bastiodon: {
		name: 'Bastiodon',
		noCopy: true,
		onSourceModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).typeMod > 0 && !target.volatiles['lzstartersystem']) {
				this.debug('Bastiodon neutralize');
				return this.chainModify(0.75);
			}
		},
	},
	//
	chiwengardiumtrigger: {
		name: 'Chiwengardium Trigger',
		noCopy: true,
		onUpdate(pokemon) {
			if (pokemon.species.name === 'Chiwengard-Ascend' && pokemon.hasItem('chiwengardium') && !pokemon.volatiles['chiwengardiumeffect']) {
				pokemon.addVolatile('chiwengardiumeffect');
			}
		},
	},
	chiwengardiumeffect: {
		name: 'Chiwengardium Effect',
		noCopy: true,
		onUpdate(source) {
			let activated = false;
			for (const pokemon of this.getAllActive()) {
				if (!activated) {
					this.add('-activate', source, 'Chiwengardium Effect', '[silent]');
				}
				activated = true;
				if (!pokemon.volatiles['chiwengard']) {
					pokemon.addVolatile('chiwengard');
				}
			}
		},
		onAnySwitchIn(pokemon) {
			if (!pokemon.volatiles['chiwengard']) {
				pokemon.addVolatile('chiwengard');
			}
		},
		onAnyDragOut(pokemon) {
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (target.species.name === 'Chiwengard-Ascend' && target.hasItem('chiwengardium') && target.volatiles['chiwengardiumeffect']) return;
			}
			for (const target of this.getAllActive()) {
				target.removeVolatile('chiwengard');
			}
		},
		onSwitchOut(pokemon) {
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (target.species.name === 'Chiwengard-Ascend' && target.hasItem('chiwengardium') && target.volatiles['chiwengardiumeffect']) return;
			}
			for (const target of this.getAllActive()) {
				target.removeVolatile('chiwengard');
			}
		},
		onAnySwitchOut(pokemon) {
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (target.species.name === 'Chiwengard-Ascend' && target.hasItem('chiwengardium') && target.volatiles['chiwengardiumeffect']) return;
			}
			for (const target of this.getAllActive()) {
				target.removeVolatile('chiwengard');
			}
		},
		onFaint(pokemon) {
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (target.species.name === 'Chiwengard-Ascend' && target.hasItem('chiwengardium') && target.volatiles['chiwengardiumeffect']) return;
			}
			for (const target of this.getAllActive()) {
				target.removeVolatile('chiwengard');
			}
		},
	},
	chiwengard: {
		name: 'Chiwengard',
		noCopy: true,
		onSourceModifyDamage(damage, source, target, move) {
			const stats: (keyof BoostsTable)[] = ['atk', 'def', 'spa', 'spd', 'spe', 'accuracy', 'evasion'];
        	const hasNegativeStatDrop = stats.some(stat => (target.boosts[stat] ?? 0) < 0);
        
        	if (hasNegativeStatDrop && !target.volatiles['lzstartersystem']) {
            	this.debug('Chiwengard weaken');
            	return this.chainModify(0.75);
        	}
		},
	},
	//
	cthulaudiumtrigger: {
		name: 'Cthulaudium Trigger',
		noCopy: true,
		onUpdate(pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Cthulauder' && pokemon.hasItem('cthulaudium') && !pokemon.volatiles['cthulaudiumeffect']) {
				pokemon.addVolatile('cthulaudiumeffect');
			}
		},
	},
	cthulaudiumeffect: {
		name: 'Cthulaudium Effect',
		noCopy: true,
		onUpdate(source) {
			let activated = false;
			for (const pokemon of this.getAllActive()) {
				if (!activated) {
					this.add('-activate', source, 'Cthulaudium Effect', '[silent]');
				}
				activated = true;
				if (!pokemon.volatiles['cthulauder'] && !pokemon.hasType('Dark')) {
					pokemon.addVolatile('cthulauder');
				}
			}
		},
		onAnySwitchIn(pokemon) {
			if (!pokemon.volatiles['cthulauder'] && !pokemon.hasType('Dark')) {
				pokemon.addVolatile('cthulauder');
			}
		},
		onAnyDragOut(pokemon) {
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (target.baseSpecies.baseSpecies === 'Cthulauder' && target.hasItem('cthulaudium') && target.volatiles['cthulaudiumeffect']) return;
			}
			for (const target of this.getAllActive()) {

				if (target.volatiles['cthulauder']) {
					target.removeVolatile('torment');
					target.removeVolatile('cthulauder');
				}
			}
		},
		onSwitchOut(pokemon) {
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (target.baseSpecies.baseSpecies === 'Cthulauder' && target.hasItem('cthulaudium') && target.volatiles['cthulaudiumeffect']) return;
			}
			for (const target of this.getAllActive()) {

				if (target.volatiles['cthulauder']) {
					target.removeVolatile('torment');
					target.removeVolatile('cthulauder');
				}
			}
		},
		onAnySwitchOut(pokemon) {
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (target.baseSpecies.baseSpecies === 'Cthulauder' && target.hasItem('cthulaudium') && target.volatiles['cthulaudiumeffect']) return;
			}
			for (const target of this.getAllActive()) {

				if (target.volatiles['cthulauder']) {
					target.removeVolatile('torment');
					target.removeVolatile('cthulauder');
				}
			}
		},
		onFaint(pokemon) {
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (target.baseSpecies.baseSpecies === 'Cthulauder' && target.hasItem('cthulaudium') && target.volatiles['cthulaudiumeffect']) return;
			}
			for (const target of this.getAllActive()) {

				if (target.volatiles['cthulauder']) {
					target.removeVolatile('torment');
					target.removeVolatile('cthulauder');
				}
			}
		},
	},
	cthulauder: {
		name: 'Cthulauder',
		noCopy: true,
		onStart(source) {
			if (!source.hasType('Dark') && !source.volatiles['torment'] && !source.volatiles['lzstartersystem']) {
				source.addVolatile('torment');
			}
			if (source.volatiles['lzstartersystem']) {
				source.removeVolatile('torment');
			}
		},
	},
	//
	lpsystemtrigger: {
		name: 'LP System Trigger',
		noCopy: true,
		onUpdate(pokemon) {
			if ((pokemon.hasType('Bug') || pokemon.hasType('Electric')) && pokemon.hasItem('lpsystem') && !pokemon.volatiles['lpsystemeffect']) {
				pokemon.addVolatile('lpsystemeffect');
			}
		},
	},
	lpsystemeffect: {
		name: 'LP System Effect',
		noCopy: true,
		onUpdate(source) {
			let activated = false;
			for (const pokemon of this.getAllActive()) {
				if (!activated) {
					this.add('-activate', source, 'LP System Effect', '[silent]');
				}
				activated = true;
				if (!pokemon.volatiles['lpsystem'] && (pokemon.hasType('Bug') || pokemon.hasType('Electric'))) {
					pokemon.addVolatile('lpsystem');
				}
			}
		},
		onAnySwitchIn(pokemon) {
			if (!pokemon.volatiles['lpsystem'] && (pokemon.hasType('Bug') || pokemon.hasType('Electric'))) {
				pokemon.addVolatile('lpsystem');
			}
		},
		onAnyDragOut(pokemon) {
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if ((target.hasType('Bug') || target.hasType('Electric')) && target.hasItem('lpsystem') && target.volatiles['lpsystemeffect']) return;
			}
			for (const target of this.getAllActive()) {

				if (target.volatiles['lpsystem']) {
					target.removeVolatile('lpsystem');
				}
			}
		},
		onSwitchOut(pokemon) {
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if ((target.hasType('Bug') || target.hasType('Electric')) && target.hasItem('lpsystem') && target.volatiles['lpsystemeffect']) return;
			}
			for (const target of this.getAllActive()) {

				if (target.volatiles['lpsystem']) {
					target.removeVolatile('lpsystem');
				}
			}
		},
		onAnySwitchOut(pokemon) {
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if ((target.hasType('Bug') || target.hasType('Electric')) && target.hasItem('lpsystem') && target.volatiles['lpsystemeffect']) return;
			}
			for (const target of this.getAllActive()) {

				if (target.volatiles['lpsystem']) {
					target.removeVolatile('lpsystem');
				}
			}
		},
		onFaint(pokemon) {
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if ((target.hasType('Bug') || target.hasType('Electric')) && target.hasItem('lpsystem') && target.volatiles['lpsystemeffect']) return;
			}
			for (const target of this.getAllActive()) {

				if (target.volatiles['lpsystem']) {
					target.removeVolatile('lpsystem');
				}
			}
		},
	},
	lpsystem: {
		name: 'LP System',
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
			if (target.volatiles['lzstartersystem'] || target === source) return; // originally included "target.fainted" but its inclusion might be unnecessary
	
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
					this.heal(source.baseMaxhp / 8);
					const ally = source.side.active.find(ally => ally && ally !== source && !ally.fainted
						&& (ally.hasType('Bug') || ally.hasType('Electric') && ally.volatiles['lpsystem'])
					);
					if (ally) {
						this.heal(ally.baseMaxhp / 16, ally);
					}
					/*const damage = Math.floor(target.maxhp / 8);
					this.damage(damage, activeTarget, source); // Apply damage to the affected target
				//	this.add('-message', `${activeTarget.name} took chip damage from ${source.name}'s Bug Engraving!`);
	
					if (source.hp < source.maxhp) {
						const healAmount = Math.min(damage, source.maxhp - source.hp);
						this.heal(healAmount, source);
				//		this.add('-message', `${source.name} recovered health from the Bug Engraving!`);
					}*/
				}
	
				// Clean up the volatile after processing
				delete activeTarget.volatiles['siphoning'];
			}
		},
	},
	//
	hpsystemtrigger: {
		name: 'HP System Trigger',
		noCopy: true,
		onUpdate(pokemon) {
			if ((pokemon.hasType('Fire') || pokemon.hasType('Water')) && pokemon.hasItem('hpsystem') && !pokemon.volatiles['hpsystemeffect']) {
				pokemon.addVolatile('hpsystemeffect');
			}
		},
	},
	hpsystemeffect: {
		name: 'HP System Effect',
		noCopy: true,
		onUpdate(source) {
			let activated = false;
			for (const pokemon of this.getAllActive()) {
				if (!activated) {
					this.add('-activate', source, 'HP System Effect', '[silent]');
				}
				activated = true;
				if (!pokemon.volatiles['hpsystem'] && (pokemon.hasType('Fire') || pokemon.hasType('Water'))) {
					pokemon.addVolatile('hpsystem');
				}
			}
		},
		onAnySwitchIn(pokemon) {
			if (!pokemon.volatiles['hpsystem'] && (pokemon.hasType('Fire') || pokemon.hasType('Water'))) {
				pokemon.addVolatile('hpsystem');
			}
		},
		onAnyDragOut(pokemon) {
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if ((target.hasType('Fire') || target.hasType('Water')) && target.hasItem('hpsystem') && target.volatiles['hpsystemeffect']) return;
			}
			for (const target of this.getAllActive()) {

				if (target.volatiles['hpsystem']) {
					target.removeVolatile('hpsystem');
				}
			}
		},
		onSwitchOut(pokemon) {
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if ((target.hasType('Fire') || target.hasType('Water')) && target.hasItem('hpsystem') && target.volatiles['hpsystemeffect']) return;
			}
			for (const target of this.getAllActive()) {

				if (target.volatiles['hpsystem']) {
					target.removeVolatile('hpsystem');
				}
			}
		},
		onAnySwitchOut(pokemon) {
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if ((target.hasType('Fire') || target.hasType('Water')) && target.hasItem('hpsystem') && target.volatiles['hpsystemeffect']) return;
			}
			for (const target of this.getAllActive()) {

				if (target.volatiles['hpsystem']) {
					target.removeVolatile('hpsystem');
				}
			}
		},
		onFaint(pokemon) {
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if ((target.hasType('Fire') || target.hasType('Water')) && target.hasItem('hpsystem') && target.volatiles['hpsystemeffect']) return;
			}
			for (const target of this.getAllActive()) {

				if (target.volatiles['hpsystem']) {
					target.removeVolatile('hpsystem');
				}
			}
		},
	},
	hpsystem: {
		name: 'HP System',
		noCopy: true,
		onSourceHit(target, source, move) {
			if (!move || !target) return;
			if (target !== source && move.category !== 'Status' && target.getMoveHitData(move).typeMod > 0 && !target.volatiles['lzstartersystem']) {
				target.trySetStatus('brn', source);
			}
		},
	},
	//
	thirdeyesystemtrigger: {
		name: 'Third Eye System Trigger',
		noCopy: true,
		onUpdate(pokemon) {
			if ((pokemon.hasType('Psychic') || pokemon.hasType('Normal') || (pokemon.baseSpecies.name === 'Aegislash-Light' && 
				(pokemon.hasType('Electric') && pokemon.hasType('Fighting')))) && pokemon.hasItem('thirdeyesystem') && !pokemon.volatiles['thirdeyesystemeffect']) {
				pokemon.addVolatile('thirdeyesystemeffect');
			}
		},
	},
	thirdeyesystemeffect: {
		name: 'Third Eye System Effect',
		noCopy: true,
		onUpdate(source) {
			let activated = false;
			for (const pokemon of this.getAllActive()) {
				if (!activated) {
					this.add('-activate', source, 'Third Eye System Effect', '[silent]');
				}
				activated = true;
				if (!pokemon.volatiles['thirdeyesystem'] && (pokemon.hasType('Psychic') || pokemon.hasType('Normal') || (pokemon.baseSpecies.name === 'Aegislash-Light' && 
					(pokemon.hasType('Electric') && pokemon.hasType('Fighting'))))) {
					pokemon.addVolatile('thirdeyesystem');
				}
			}
		},
		onAnySwitchIn(pokemon) {
			if (!pokemon.volatiles['thirdeyesystem'] && (pokemon.hasType('Psychic') || pokemon.hasType('Normal') || (pokemon.baseSpecies.name === 'Aegislash-Light' && 
				(pokemon.hasType('Electric') && pokemon.hasType('Fighting'))))) {
				pokemon.addVolatile('thirdeyesystem');
			}
		},
		onAnyDragOut(pokemon) {
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if ((target.hasType('Psychic') || target.hasType('Normal') || (target.baseSpecies.name === 'Aegislash-Light' && 
					(target.hasType('Electric') && target.hasType('Fighting')))) && target.hasItem('thirdeyesystem') && target.volatiles['thirdeyesystemeffect']) return;
			}
			for (const target of this.getAllActive()) {

				if (target.volatiles['thirdeyesystem']) {
					target.removeVolatile('thirdeyesystem');
				}
			}
		},
		onSwitchOut(pokemon) {
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if ((target.hasType('Psychic') || target.hasType('Normal') || (target.baseSpecies.name === 'Aegislash-Light' && 
					(target.hasType('Electric') && target.hasType('Fighting')))) && target.hasItem('thirdeyesystem') && target.volatiles['thirdeyesystemeffect']) return;
			}
			for (const target of this.getAllActive()) {

				if (target.volatiles['thirdeyesystem']) {
					target.removeVolatile('thirdeyesystem');
				}
			}
		},
		onAnySwitchOut(pokemon) {
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if ((target.hasType('Psychic') || target.hasType('Normal') || (target.baseSpecies.name === 'Aegislash-Light' && 
					(target.hasType('Electric') && target.hasType('Fighting')))) && target.hasItem('thirdeyesystem') && target.volatiles['thirdeyesystemeffect']) return;
			}
			for (const target of this.getAllActive()) {

				if (target.volatiles['thirdeyesystem']) {
					target.removeVolatile('thirdeyesystem');
				}
			}
		},
		onFaint(pokemon) {
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if ((target.hasType('Psychic') || target.hasType('Normal') || (target.baseSpecies.name === 'Aegislash-Light' && 
					(target.hasType('Electric') && target.hasType('Fighting')))) && target.hasItem('thirdeyesystem') && target.volatiles['thirdeyesystemeffect']) return;
			}
			for (const target of this.getAllActive()) {

				if (target.volatiles['thirdeyesystem']) {
					target.removeVolatile('thirdeyesystem');
				}
			}
		},
	},
	thirdeyesystem: {
		name: 'Third Eye System',
		noCopy: true,
	//	onModifyMovePriority: -5,
		onModifyMove(move, pokemon) {
			if (pokemon.volatiles['lzstartersystem']) {
				return;
			}	
			if (!move.ignoreImmunity) move.ignoreImmunity = {};
			/*if (move.ignoreImmunity !== true) {
				move.ignoreImmunity['Psychic'] = true;
				move.ignoreImmunity['Normal'] = true;
			}*/
			if (move.ignoreImmunity !== true) {
				if (pokemon.baseSpecies.name === 'Aegislash-Light' && 
					pokemon.hasType('Electric') && pokemon.hasType('Fighting')) {
					// Don't ignore immunities for Aegislash-Light in its shield form
					return;
				}
				move.ignoreImmunity['Psychic'] = true;
				move.ignoreImmunity['Normal'] = true;
			}
			move.ignoreEvasion = true;
		},
	},
	//
	mountainsystemtrigger: {
		name: 'Mountain System Trigger',
		noCopy: true,
		onUpdate(pokemon) {
			if ((pokemon.hasType('Ice') || pokemon.hasType('Fighting')) && pokemon.hasItem('mountainsystem') && !pokemon.volatiles['mountainsystemeffect']) {
				pokemon.addVolatile('mountainsystemeffect');
			}
		},
	},
	mountainsystemeffect: {
		name: 'Mountain System Effect',
		noCopy: true,
		onUpdate(source) {
			let activated = false;
			for (const pokemon of this.getAllActive()) {
				if (!activated) {
					this.add('-activate', source, 'Mountain System Effect', '[silent]');
				}
				activated = true;
				if (!pokemon.volatiles['mountainsystem'] && (pokemon.hasType('Ice') || pokemon.hasType('Fighting'))) {
					pokemon.addVolatile('mountainsystem');
				}
			}
		},
		onAnySwitchIn(pokemon) {
			if (!pokemon.volatiles['mountainsystem'] && (pokemon.hasType('Ice') || pokemon.hasType('Fighting'))) {
				pokemon.addVolatile('mountainsystem');
			}
		},
		onAnyDragOut(pokemon) {
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if ((target.hasType('Ice') || target.hasType('Fighting')) && target.hasItem('mountainsystem') && target.volatiles['mountainsystemeffect']) return;
			}
			for (const target of this.getAllActive()) {

				if (target.volatiles['mountainsystem']) {
					target.removeVolatile('mountainsystem');
				}
			}
		},
		onSwitchOut(pokemon) {
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if ((target.hasType('Ice') || target.hasType('Fighting')) && target.hasItem('mountainsystem') && target.volatiles['mountainsystemeffect']) return;
			}
			for (const target of this.getAllActive()) {

				if (target.volatiles['mountainsystem']) {
					target.removeVolatile('mountainsystem');
				}
			}
		},
		onAnySwitchOut(pokemon) {
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if ((target.hasType('Ice') || target.hasType('Fighting')) && target.hasItem('mountainsystem') && target.volatiles['mountainsystemeffect']) return;
			}
			for (const target of this.getAllActive()) {

				if (target.volatiles['mountainsystem']) {
					target.removeVolatile('mountainsystem');
				}
			}
		},
		onFaint(pokemon) {
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if ((target.hasType('Ice') || target.hasType('Fighting')) && target.hasItem('mountainsystem') && target.volatiles['mountainsystemeffect']) return;
			}
			for (const target of this.getAllActive()) {

				if (target.volatiles['mountainsystem']) {
					target.removeVolatile('mountainsystem');
				}
			}
		},
	},
	mountainsystem: {
		name: 'Mountain System',
		noCopy: true,
    	onDamage(damage, target, source, effect) {
			if (target.hp <= target.maxhp / 2 && !target.volatiles['lzstartersystem']) {
				this.debug('Mountain System damage reduction');
				return this.chainModify(0.5);
			}
		},
	},
	//
	cursesystemtrigger: {
		name: 'Curse System Trigger',
		noCopy: true,
		onUpdate(pokemon) {
			if ((pokemon.hasType('Ghost') || pokemon.hasType('Dark')) && pokemon.hasItem('cursesystem') && !pokemon.volatiles['cursesystemeffect']) {
				pokemon.addVolatile('cursesystemeffect');
			}
		},
	},
	cursesystemeffect: {
		name: 'Curse System Effect',
		noCopy: true,
		onUpdate(source) {
			let activated = false;
			for (const pokemon of this.getAllActive()) {
				if (!activated) {
					this.add('-activate', source, 'Curse System Effect', '[silent]');
				}
				activated = true;
				if (!pokemon.volatiles['cursesystem'] && (pokemon.hasType('Ghost') || pokemon.hasType('Dark'))) {
					pokemon.addVolatile('cursesystem');
				}
			}
		},
		onAnySwitchIn(pokemon) {
			if (!pokemon.volatiles['cursesystem'] && (pokemon.hasType('Ghost') || pokemon.hasType('Dark'))) {
				pokemon.addVolatile('cursesystem');
			}
		},
		onAnyDragOut(pokemon) {
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if ((target.hasType('Ghost') || target.hasType('Dark')) && target.hasItem('cursesystem') && target.volatiles['cursesystemeffect']) return;
			}
			for (const target of this.getAllActive()) {

				if (target.volatiles['cursesystem']) {
					target.removeVolatile('cursesystem');
				}
			}
		},
		onSwitchOut(pokemon) {
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if ((target.hasType('Ghost') || target.hasType('Dark')) && target.hasItem('cursesystem') && target.volatiles['cursesystemeffect']) return;
			}
			for (const target of this.getAllActive()) {

				if (target.volatiles['cursesystem']) {
					target.removeVolatile('cursesystem');
				}
			}
		},
		onAnySwitchOut(pokemon) {
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if ((target.hasType('Ghost') || target.hasType('Dark')) && target.hasItem('cursesystem') && target.volatiles['cursesystemeffect']) return;
			}
			for (const target of this.getAllActive()) {

				if (target.volatiles['cursesystem']) {
					target.removeVolatile('cursesystem');
				}
			}
		},
		onFaint(pokemon) {
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if ((target.hasType('Ghost') || target.hasType('Dark')) && target.hasItem('cursesystem') && target.volatiles['cursesystemeffect']) return;
			}
			for (const target of this.getAllActive()) {

				if (target.volatiles['cursesystem']) {
					target.removeVolatile('cursesystem');
				}
			}
		},
	},
	cursesystem: {
		name: 'Curse System',
		noCopy: true,
		onSourceDamagingHit(damage, target, source, move) {
			const isMultihit = move.multihit; // Check if the move is multihit
			const hasParentalBond = source.hasAbility('parentalbond'); // Check for Parental Bond
	
			if (target && !target.fainted && !target.hasType(['Ghost', 'Dark']) && move.category !== 'Status' && !target.volatiles['lzstartersystem']) {
				if (isMultihit) {
					// Only damage for the first hit
					if (move.hit === 1) { // Check if this is the first hit
						const damage = Math.floor(target.maxhp / 8);
						this.damage(damage, target, source);
						this.add('-message', `${target.name} got its life force drained!`);
					}
					return; // Stop additional damage from subsequent hits
				}
				if (!isMultihit) {
					if (hasParentalBond) {
						// Only damage for the first hit if the source has Parental Bond
						if (move.hit === 1) { // Check if this is the first hit
						const damage = Math.floor(target.maxhp / 8);
						this.damage(damage, target, source);
						this.add('-message', `${target.name} got its life force drained!`);
						}
					} else {
						// Proceed as usual if the source does not have Parental Bond
						const damage = Math.floor(target.maxhp / 8);
						this.damage(damage, target, source);
						this.add('-message', `${target.name} got its life force drained!`);
					}
				}
				/*const damage = Math.floor(target.maxhp / 8);
				this.damage(damage, target, source);
				this.add('-message', `${target.name} got its life force drained!`);*/
				if (source.hp < source.maxhp) {
					const healAmount = Math.min(damage, source.maxhp - source.hp);
					this.heal(healAmount, source);
				}
			}
		},
	},
	//
	lzstartersystemtrigger: {
		name: 'LZ Starter System Trigger',
		noCopy: true,
		onUpdate(pokemon) {
			if (((pokemon.hasItem('matokodium') && pokemon.species.name === 'Matokoda-Ascend') || 
				(pokemon.hasItem('piahchium') && pokemon.species.name === 'Piahchi-Ascend') || 
				(pokemon.hasItem('zantium') && pokemon.species.name === 'Zantui-Ascend')) && 
				!pokemon.volatiles['lzstartersystemeffect']) {
				pokemon.addVolatile('lzstartersystemeffect');
			}
		},
	},
	lzstartersystemeffect: {
		name: 'LZ Starter System Effect',
		noCopy: true,
		onUpdate(source) { // originally: onStart
			let activated = false;
			for (const pokemon of this.getAllActive()) {
				if (!activated) {
					this.add('-activate', source, 'LZ Starter System Effect', '[silent]');
				}
				activated = true;
				if (!pokemon.volatiles['lzstartersystem']) {
					pokemon.addVolatile('lzstartersystem');
				}
			}
		},
		onAnySwitchIn(pokemon) {
			if (!pokemon.volatiles['lzstartersystem']) {
				pokemon.addVolatile('lzstartersystem');
			}
		},
		onAnyDragOut(pokemon) {
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (((target.hasItem('matokodium') && target.species.name === 'Matokoda-Ascend') || 
					(target.hasItem('piahchium') && target.species.name === 'Piahchi-Ascend') || 
					(target.hasItem('zantium') && target.species.name === 'Zantui-Ascend'))
					&& target.volatiles['lzstartersystemeffect']) return;
			}
			for (const target of this.getAllActive()) {

				if (target.volatiles['lzstartersystem']) {
					target.removeVolatile('lzstartersystem');
				}
			}
		},
		onSwitchOut(pokemon) {
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (((target.hasItem('matokodium') && target.species.name === 'Matokoda-Ascend') || 
					(target.hasItem('piahchium') && target.species.name === 'Piahchi-Ascend') || 
					(target.hasItem('zantium') && target.species.name === 'Zantui-Ascend'))
					&& target.volatiles['lzstartersystemeffect']) return;
			}
			for (const target of this.getAllActive()) {

				if (target.volatiles['lzstartersystem']) {
					target.removeVolatile('lzstartersystem');
				}
			}
		},
		onAnySwitchOut(pokemon) {
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (((target.hasItem('matokodium') && target.species.name === 'Matokoda-Ascend') || 
					(target.hasItem('piahchium') && target.species.name === 'Piahchi-Ascend') || 
					(target.hasItem('zantium') && target.species.name === 'Zantui-Ascend'))
					&& target.volatiles['lzstartersystemeffect']) return;
			}
			for (const target of this.getAllActive()) {

				if (target.volatiles['lzstartersystem']) {
					target.removeVolatile('lzstartersystem');
				}
			}
		},
		onFaint(pokemon) {
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (((target.hasItem('matokodium') && target.species.name === 'Matokoda-Ascend') || 
					(target.hasItem('piahchium') && target.species.name === 'Piahchi-Ascend') || 
					(target.hasItem('zantium') && target.species.name === 'Zantui-Ascend'))
					&& target.volatiles['lzstartersystemeffect']) return;
			}
			for (const target of this.getAllActive()) {

				if (target.volatiles['lzstartersystem']) {
					target.removeVolatile('lzstartersystem');
				}
			}
		},
	},
	lzstartersystem: {
		name: "LZ Starter System",
		noCopy: true,
	},
	//
	ecosystemtrigger: {
		name: 'Eco System Trigger',
		noCopy: true,
		onUpdate(pokemon) {
			if ((pokemon.hasType('Grass') || pokemon.hasType('Rock')) && pokemon.hasItem('ecosystem') && !pokemon.volatiles['ecosystemeffect']) {
				pokemon.addVolatile('ecosystemeffect');
			}
		},
	},
	ecosystemeffect: {
		name: 'Eco System Effect',
		noCopy: true,
		onUpdate(source) {
			let activated = false;
			for (const pokemon of this.getAllActive()) {
				if (!activated) {
					this.add('-activate', source, 'Eco System Effect', '[silent]');
				}
				activated = true;
				if (!pokemon.volatiles['ecosystem'] && (pokemon.hasType('Grass') || pokemon.hasType('Rock'))) {
					pokemon.addVolatile('ecosystem');
				}
			}
		},
		onAnySwitchIn(pokemon) {
			if (!pokemon.volatiles['ecosystem'] && (pokemon.hasType('Grass') || pokemon.hasType('Rock'))) {
				pokemon.addVolatile('ecosystem');
			}
		},
		onAnyDragOut(pokemon) {
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if ((target.hasType('Grass') || target.hasType('Rock')) && target.hasItem('ecosystem') && target.volatiles['ecosystemeffect']) return;
			}
			for (const target of this.getAllActive()) {

				if (target.volatiles['ecosystem']) {
					target.removeVolatile('ecosystem');
				}
			}
		},
		onSwitchOut(pokemon) {
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if ((target.hasType('Grass') || target.hasType('Rock')) && target.hasItem('ecosystem') && target.volatiles['ecosystemeffect']) return;
			}
			for (const target of this.getAllActive()) {

				if (target.volatiles['ecosystem']) {
					target.removeVolatile('ecosystem');
				}
			}
		},
		onAnySwitchOut(pokemon) {
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if ((target.hasType('Grass') || target.hasType('Rock')) && target.hasItem('ecosystem') && target.volatiles['ecosystemeffect']) return;
			}
			for (const target of this.getAllActive()) {

				if (target.volatiles['ecosystem']) {
					target.removeVolatile('ecosystem');
				}
			}
		},
		onFaint(pokemon) {
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if ((target.hasType('Grass') || target.hasType('Rock')) && target.hasItem('ecosystem') && target.volatiles['ecosystemeffect']) return;
			}
			for (const target of this.getAllActive()) {

				if (target.volatiles['ecosystem']) {
					target.removeVolatile('ecosystem');
				}
			}
		},
	},
	ecosystem: {
		name: 'Eco System',
		noCopy: true,
		onTryBoost(boost, target, source, effect) {
			if (source && target === source) return;
			if (target.volatiles['lzstartersystem']) return;
			let showMsg = false;
			let i: BoostID;
			for (i in boost) {
				if (boost[i]! < 0) {
					delete boost[i];
					showMsg = true;
				}
			}
			if (showMsg && !(effect as ActiveMove).secondaries && effect.id !== 'octolock') {
				this.add("-fail", target, "unboost", "[from] volatile: Eco System");
			}
		},
	},
	//
	minesystemtrigger: {
		name: 'Mine System Trigger',
		noCopy: true,
		onUpdate(pokemon) {
			if ((pokemon.hasType('Ground') || pokemon.hasType('Dragon')) && pokemon.hasItem('minesystem') && !pokemon.volatiles['minesystemeffect']) {
				pokemon.addVolatile('minesystemeffect');
			}
		},
	},
	minesystemeffect: {
		name: 'Mine System Effect',
		noCopy: true,
		onUpdate(source) {
			let activated = false;
			for (const pokemon of this.getAllActive()) {
				if (!activated) {
					this.add('-activate', source, 'Mine System Effect', '[silent]');
				}
				activated = true;
				if (!pokemon.volatiles['minesystem'] && (pokemon.hasType('Ground') || pokemon.hasType('Dragon'))) {
					pokemon.addVolatile('minesystem');
				}
			}
		},
		onAnySwitchIn(pokemon) {
			if (!pokemon.volatiles['minesystem'] && (pokemon.hasType('Ground') || pokemon.hasType('Dragon'))) {
				pokemon.addVolatile('minesystem');
			}
		},
		onAnyDragOut(pokemon) {
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if ((target.hasType('Ground') || target.hasType('Dragon')) && target.hasItem('minesystem') && target.volatiles['minesystemeffect']) return;
			}
			for (const target of this.getAllActive()) {

				if (target.volatiles['minesystem']) {
					target.removeVolatile('minesystem');
				}
			}
		},
		onSwitchOut(pokemon) {
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if ((target.hasType('Ground') || target.hasType('Dragon')) && target.hasItem('minesystem') && target.volatiles['minesystemeffect']) return;
			}
			for (const target of this.getAllActive()) {

				if (target.volatiles['minesystem']) {
					target.removeVolatile('minesystem');
				}
			}
		},
		onAnySwitchOut(pokemon) {
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if ((target.hasType('Ground') || target.hasType('Dragon')) && target.hasItem('minesystem') && target.volatiles['minesystemeffect']) return;
			}
			for (const target of this.getAllActive()) {

				if (target.volatiles['minesystem']) {
					target.removeVolatile('minesystem');
				}
			}
		},
		onFaint(pokemon) {
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if ((target.hasType('Ground') || target.hasType('Dragon')) && target.hasItem('minesystem') && target.volatiles['minesystemeffect']) return;
			}
			for (const target of this.getAllActive()) {

				if (target.volatiles['minesystem']) {
					target.removeVolatile('minesystem');
				}
			}
		},
	},
	minesystem: {
		name: 'Mine System',
		noCopy: true,
		onSetStatus(status, target, source, effect) {
			if (source && target !== source && effect && effect.id !== 'yawn' && !target.volatiles['lzstartersystem']) {
				this.debug('interrupting setStatus with Mine System');
				if (effect.name === 'Synchronize' || (effect.effectType === 'Move' && !effect.secondaries)) {
					const effectHolder = this.effectState.target;
					this.add('-block', target, 'volatile: Mine System', '[of] ' + effectHolder);
				}
				return null;
			}
		},
		onTryAddVolatile(status, target) {
			if (target.hasType('Grass') && status.id === 'yawn' && !target.volatiles['lzstartersystem']) {
				this.debug('Mine System blocking yawn');
				const effectHolder = this.effectState.target;
				this.add('-block', target, 'volatile: Mine System', '[of] ' + effectHolder);
				return null;
			}
		},
	},
	//
	hexsystemtrigger: {
		name: 'Hex System Trigger',
		noCopy: true,
		onUpdate(pokemon) {
			if ((pokemon.hasType('Poison') || pokemon.hasType('Fairy')) && pokemon.hasItem('hexsystem') && !pokemon.volatiles['hexsystemeffect']) {
				pokemon.addVolatile('hexsystemeffect');
			}
		},
	},
	hexsystemeffect: {
		name: 'Hex System Effect',
		noCopy: true,
		onUpdate(source) {
			let activated = false;
			for (const pokemon of this.getAllActive()) {
				if (!activated) {
					this.add('-activate', source, 'Hex System Effect', '[silent]');
				}
				activated = true;
				if (!pokemon.volatiles['hexsystem'] && (pokemon.hasType('Poison') || pokemon.hasType('Fairy'))) {
					pokemon.addVolatile('hexsystem');
				}
			}
		},
		onAnySwitchIn(pokemon) {
			if (!pokemon.volatiles['hexsystem'] && (pokemon.hasType('Poison') || pokemon.hasType('Fairy'))) {
				pokemon.addVolatile('hexsystem');
			}
		},
		onAnyDragOut(pokemon) {
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if ((target.hasType('Poison') || target.hasType('Fairy')) && target.hasItem('hexsystem') && target.volatiles['hexsystemeffect']) return;
			}
			for (const target of this.getAllActive()) {

				if (target.volatiles['hexsystem']) {
					target.removeVolatile('hexsystem');
				}
			}
		},
		onSwitchOut(pokemon) {
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if ((target.hasType('Poison') || target.hasType('Fairy')) && target.hasItem('hexsystem') && target.volatiles['hexsystemeffect']) return;
			}
			for (const target of this.getAllActive()) {

				if (target.volatiles['hexsystem']) {
					target.removeVolatile('hexsystem');
				}
			}
		},
		onAnySwitchOut(pokemon) {
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if ((target.hasType('Poison') || target.hasType('Fairy')) && target.hasItem('hexsystem') && target.volatiles['hexsystemeffect']) return;
			}
			for (const target of this.getAllActive()) {

				if (target.volatiles['hexsystem']) {
					target.removeVolatile('hexsystem');
				}
			}
		},
		onFaint(pokemon) {
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if ((target.hasType('Poison') || target.hasType('Fairy')) && target.hasItem('hexsystem') && target.volatiles['hexsystemeffect']) return;
			}
			for (const target of this.getAllActive()) {

				if (target.volatiles['hexsystem']) {
					target.removeVolatile('hexsystem');
				}
			}
		},
	},
	hexsystem: {
		name: 'Hex System',
		noCopy: true,
		onDamagingHit(damage, target, source, move) {
			//	if (this.checkMoveMakesContact(move, source, target)) {
			if (!target.volatiles['lzstartersystem']) {
				source.addVolatile('torment', this.effectState.target);
			//	}
			}
		},
	},
	//
	cloudsystemtrigger: {
		name: 'Cloud System Trigger',
		noCopy: true,
		onUpdate(pokemon) {
			if ((pokemon.hasType('Flying') || pokemon.hasType('Steel')) && pokemon.hasItem('cloudsystem') && !pokemon.volatiles['cloudsystemeffect']) {
				pokemon.addVolatile('cloudsystemeffect');
			}
		},
	},
	cloudsystemeffect: {
		name: 'Cloud System Effect',
		noCopy: true,
		onUpdate(source) {
			let activated = false;
			for (const pokemon of this.getAllActive()) {
				if (!activated) {
					this.add('-activate', source, 'Cloud System Effect', '[silent]');
				}
				activated = true;
				if (!pokemon.volatiles['cloudsystem'] && (pokemon.hasType('Flying') || pokemon.hasType('Steel'))) {
					pokemon.addVolatile('cloudsystem');
				}
			}
		},
		onAnySwitchIn(pokemon) {
			if (!pokemon.volatiles['cloudsystem'] && (pokemon.hasType('Flying') || pokemon.hasType('Steel'))) {
				pokemon.addVolatile('cloudsystem');
			}
		},
		onAnyDragOut(pokemon) {
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if ((target.hasType('Flying') || target.hasType('Steel')) && target.hasItem('cloudsystem') && target.volatiles['cloudsystemeffect']) return;
			}
			for (const target of this.getAllActive()) {

				if (target.volatiles['cloudsystem']) {
					target.removeVolatile('cloudsystem');
				}
			}
		},
		onSwitchOut(pokemon) {
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if ((target.hasType('Flying') || target.hasType('Steel')) && target.hasItem('cloudsystem') && target.volatiles['cloudsystemeffect']) return;
			}
			for (const target of this.getAllActive()) {

				if (target.volatiles['cloudsystem']) {
					target.removeVolatile('cloudsystem');
				}
			}
		},
		onAnySwitchOut(pokemon) {
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if ((target.hasType('Flying') || target.hasType('Steel')) && target.hasItem('cloudsystem') && target.volatiles['cloudsystemeffect']) return;
			}
			for (const target of this.getAllActive()) {

				if (target.volatiles['cloudsystem']) {
					target.removeVolatile('cloudsystem');
				}
			}
		},
		onFaint(pokemon) {
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if ((target.hasType('Flying') || target.hasType('Steel')) && target.hasItem('cloudsystem') && target.volatiles['cloudsystemeffect']) return;
			}
			for (const target of this.getAllActive()) {

				if (target.volatiles['cloudsystem']) {
					target.removeVolatile('cloudsystem');
				}
			}
		},
	},
	cloudsystem: {
		name: 'Cloud System',
		noCopy: true,
		onBasePowerPriority: 23,
		onBasePower(basePower, attacker, defender, move) {
			if ((move.recoil || move.hasCrashDamage) && !attacker.volatiles['lzstartersystem']) {
				this.debug('Cloud System boost');
				return this.chainModify([4915, 4096]);
			}
		},
		onDamage(damage, target, source, effect) {
			// Check if the damage is indirect
			if (effect.effectType !== 'Move' && !target.volatiles['lzstartersystem']) {
				this.debug('Cloud System - reducing indirect damage by 50%');
				return this.chainModify(0.5); // Reduce indirect damage by 50%
			}
			return damage; // Return original damage for direct damage
		},
	},
	// end

	// start: Aegislash-Light and Grinsegrin are the only Pkm who could get this volatile if hit by Soak
	soaktypedenial: {
		name: 'Soak Type Denial',
		onPrepareHit(pokemon) {
			// Aegislash-Light is just soaked and will turn into mono Water
			if (pokemon.types.join() !== 'Water' && !pokemon.volatiles['typetracker']) {
				pokemon.setType('Water');
				this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[from] Soak Type Denial');
			}
		},
		onUpdate(pokemon) {
			// Aegislash-Light is just soaked and will turn into mono Water
			if (pokemon.types.join() !== 'Water' && !pokemon.volatiles['typetracker']) {
				pokemon.setType('Water');
				this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[from] Soak Type Denial');
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

	// start: Time Crystals from Time Compressor
	timecrystals: {
		name: 'Time Crystals',
		noCopy: true,
		duration: 3,
		onSideStart(side) {
			this.add('-sidestart', side, 'Time Crystals');
		},
		onSideEnd(side) {
			this.add('-message', 'The time crystals unleashed a great amount of energy and...');
			this.add('-fieldstart', 'move: Trick Room');
			this.add('-sideend', side, 'Time Crystals');
		},
	},
	// end

	// start: Divination Trigger from the moveDivination
	divination: {
		name: 'Divination',
		noCopy: true,
		duration: 3,
		onSideStart(side) {
			this.add('-message', 'The user follows the move patterns.');
		//	this.add('-sidestart', side, 'Divination', '[silent]');
		},
		onSideEnd(side) {
			this.add('-message', 'The user foresaw the future and...');
			side.addSideCondition('augury');
			this.add('-sideend', side, 'Divination', '[silent]');
		},
	},
	// end

	fungus: {
		name: 'Fungus',
		noCopy: true,
		onAfterEachBoost(boost, target, source, effect) {
			if (effect?.id === 'fungus') return;
			const partner = target.side.active.find(pokemon => pokemon && pokemon !== target && !pokemon.fainted);
			if (!partner || !partner.volatiles['fungus']) return;
	
			const fungusBoost: SparseBoostsTable = {};
			let activated = false;
	
			// Check for decreases in stats with safe access
			if (boost.atk !== undefined && boost.atk < 0) {
				fungusBoost.spa = -boost.atk; // If user lowers Atk, raise ally's SpA
				activated = true;
			}
			if (boost.spa !== undefined && boost.spa < 0) {
				fungusBoost.atk = -boost.spa; // If user lowers SpA, raise ally's Atk
				activated = true;
			}
			if (boost.def !== undefined && boost.def < 0) {
				fungusBoost.spd = -boost.def; // If user lowers Def, raise ally's SpD
				activated = true;
			}
			if (boost.spd !== undefined && boost.spd < 0) {
				fungusBoost.def = -boost.spd; // If user lowers SpD, raise ally's Def
				activated = true;
			}
	
			if (activated) {
				this.add('-activate', target, 'Fungus');
				this.boost(fungusBoost, partner, target, null, true);
			}
		},	
	},
	// end

	// start
	duststorm: {
		name: 'Dust Storm',
		noCopy: true,
		duration: 4,
		onSideStart(side, source) {
			this.add('-sidestart', side, 'Dust Storm');
			this.add('-message', 'A dust storm has kicked up! It will last for 4 turns!');
		},
		onSideResidualOrder: 26,
    	onSideResidualSubOrder: 6,
    	onSideResidual(side) {
        	for (const pokemon of side.active) {
            //	if (pokemon && pokemon.hp > 0) {
                	// Apply damage equal to 1/8 of base max HP
                this.damage(pokemon.baseMaxhp / 8, pokemon);
				this.add('-message', `${pokemon.name} is buffeted by the dust!`);
            //	}
        	}
    	},
		onSideEnd(side) {
			this.add('-sideend', side, 'Dust Storm');
		},
	},
	// end

	// start
	fimbulvetr: {
		name: 'Fimbulvetr',
		noCopy: true,
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem('icyrock')) {
				return 8;
			}
			return 5;
		},
		onSideStart(side) {
			this.add('-sidestart', side, 'Fimbulvetr');
		//	this.add('-message', `The Fimbulvetr has taken hold on the opponent's side!`);
		},
		onSideEnd(side) {
		//	this.add('-message', `The Fimbulvetr has faded from the opponent's side.`);
			this.add('-sideend', side, 'Fimbulvetr');
		},
	},
	// end

	// start
	goodwillextension: {
		name: 'Goodwill Extension',
		noCopy: true,
		onChangeBoost(boost, target, source, effect) {
			// Check if target is defined
			if (!target) {
		//		console.error('Target is undefined');
				return;
			}
		
			console.log(`Goodwill Extension triggered for ${target.name}`);
			
			// Check if target has a side and active allies
			if (!target.side || !Array.isArray(target.side.active)) {
		//		console.error('Target side or active allies are not defined');
				return;
			}
		
			// Find all allies with the Goodwill ability
			const goodwillAllies = target.side.active.filter(ally => 
				ally && ally !== target && ally.hasAbility('goodwill')
			);
		
			if (goodwillAllies.length === 0) {
		//		console.log('No Goodwill allies found');
				return;
			}
		
		//	console.log(`Goodwill allies found: ${goodwillAllies.map(a => a.name).join(', ')}`);
		
			const stats: (keyof BoostsTable)[] = ['atk', 'def', 'spa', 'spd', 'spe', 'accuracy', 'evasion'];
		
			for (const stat of stats) {
				if (boost[stat] !== undefined && boost[stat] < 0) {
			//		console.log(`Checking stat: ${stat}, boost: ${boost[stat]}`);    
					// Check if any ally's stat is negative
					const protectingAlly = goodwillAllies.find(ally => 
						ally.boosts[stat] < 0 // Ensure ally has boosts property
					);
		
					if (protectingAlly) {
						boost[stat] = 0; // Prevent stat drop
						this.add('-fail', target, 'unboost', stat, '[from] ally\'s ability: Goodwill');
				//		console.log(`Prevented stat drop for ${stat} by ${protectingAlly.name}`);
				//	} else {
				//		console.log(`Stat ${stat} not protected by any Goodwill ally`);
					}
				}
			}
		
		//	console.log('Final boost after Goodwill Extension:', boost);
		}
	},
	// end

	// start
	psychout: {
		name: 'Psych Out',
		noCopy: true,
		onStart(pokemon) {
			// Initialize the flag when the volatile is first activated
			this.effectState.hasTriggered = false;
		},
		onDamage(damage, target, source, move) {
			// Check if the volatile has already triggered
			if (this.effectState.hasTriggered) return damage;
	
			// Check if damage would knock out the target
			if (damage >= target.hp) {
				// Check for an ally with Psych Out ability
				const hasPsychOutAlly = target.side.active.some(ally => 
					ally !== target && !ally.fainted && ally.hasAbility('psychout')
				);
	
				// Only set HP to 1 if there is an ally with Psych Out
				if (hasPsychOutAlly) {
					this.effectState.hasTriggered = true; // Mark as triggered
	
					// Add psychoutnotifier volatile to the target
					target.addVolatile('psychoutnotifier');
					
					return target.hp - 1; // Return new HP
				}
			}
	
			return damage; // Return the original damage if conditions aren't met
		},
	},

	psychoutnotifier: {
		name: "Psych Out Notifier",
		noCopy: true,
	},
	// end

	// Lost Zone: Caretaker needs two conditions so they are implemented here
	// Arbarnacle
	caretaking: {
		name: "Caretaking",
		noCopy: true,
		onStart(pokemon) {
			this.boost({atk: 1, spa: 1, spe: 1, def: 1, spd: 1}, pokemon);
			if (!pokemon.volatiles['ingrain']) {
				pokemon.addVolatile('ingrain');
			}
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
	// Swanneil
	caretaken: {
		name: "Caretaken",
	    noCopy: true,
		// This is a new addition since it seems like both Swanneil and Arbarnacle are very mediocre together
		onStart(pokemon) {
			this.boost({atk: 1, spa: 1, spe: 1, def: 1, spd: 1}, pokemon);
			if (!pokemon.volatiles['ingrain']) {
				pokemon.addVolatile('ingrain');
			}
		},
		// end
    	onDragOutPriority: 2,
    	onDragOut() {
        	return false;
    	},
    	onTrapPokemonPriority: -11,
    	onTrapPokemon(pokemon) {
        	pokemon.trapped = true;
    	},
    	onInvulnerabilityPriority: 2,
    	onInvulnerability(target, source, move) {
        	const arbarnacle = target.side.active.find(mon => mon && mon.baseSpecies.baseSpecies === 'Arbarnacle');
        	return !arbarnacle || arbarnacle.fainted;
    	},
    	onBeforeTurn(pokemon) {
        	const arbarnacle = pokemon.side.active.find(mon => mon && mon.baseSpecies.baseSpecies === 'Arbarnacle');
        	if (!arbarnacle || arbarnacle.fainted) {
           		pokemon.removeVolatile('caretaken');
        	} else {
            	this.queue.cancelAction(pokemon);
        	}
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

	headstart: {
		name: "Head Start",
		noCopy: true,
		onPrepareHit(pokemon, target, move) {
			const ratrival = pokemon.side.active.find(ally => (ally.species.name === 'Ratrival' || ally.species.name === 'Ratrival0') && (ally.hasAbility('teamup')));
   			if (!ratrival) return; // Ensure Ratrival or Ratrival0 is present

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
		
					// Check if the action belongs specifically to the ally; indirectly, that's Ratrival or Ratrival0
					if (action.pokemon.isAlly(pokemon)) {
						this.queue.prioritizeAction(action, move); // Prioritize the action
						this.add('-waiting', pokemon, action.pokemon); // Notify that Ratrival or Ratrival0 is waiting
						break; // Exit the loop but not the function, meaning user's move should be able to do damage now
					}
				}
			}
		},	
	},

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
