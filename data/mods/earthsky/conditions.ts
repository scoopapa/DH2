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
			this.effectState.time = 0;
			if (target.species.name === 'Shaymin-Sky' && target.baseSpecies.baseSpecies === 'Shaymin') {
				target.formeChange('Shaymin', this.effect, true);
			}
		},
		onBeforeMovePriority: 10,
		onBeforeMove(pokemon, target, move) {
			if (move.flags['defrost'] || (pokemon.volatiles['nointerrupt']?.ignore.includes('frz'))) return;
			if (this.randomChance(pokemon.statusState.time, 4)) {
				pokemon.cureStatus();
				return;
			} else if(!pokemon.volatiles['stasis']){
				pokemon.statusState.time++;
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
			this.damage(pokemon.baseMaxhp / (this.field.isWeather('snow') ? 8 : 16));
		},
		onImmunity(type, pokemon) {
			if (type === 'snow') return false;
		},
		damage: "  [POKEMON] is hurt by the freezing cold!",
	},
	trapped: {
		inherit: true,
		duration: 4,
		durationCallback(target, source) {
			if (source?.hasItem('gripclaw')) return 6;
			return 4;
		},
		onStart(target) {
			if(!this.turn) this.effectState.duration--;
			this.add('-activate', target, 'trapped');
		},
		onEnd(target) {
			this.add('-end', target, 'trapped');
		},
	},
	partiallytrapped: {
		inherit: true,
		duration: 4,
		durationCallback(target, source) {
			if (source?.hasItem('gripclaw')) return 6;
			return 4;
		},
		onStart(pokemon, source) {
			if(pokemon.volatiles['strongpartialtrap']) return false;
			this.add('-activate', pokemon, 'move: ' + this.effectState.sourceEffect, '[of] ' + source);
			this.effectState.boundDivisor = source.hasItem('bindingband') ? 6 : 8;
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
			this.effectState.counter = 3;
		},
		onEvadeStallMove(pokemon) {
			// this.effectState.counter should never be undefined here.
			// However, just in case, use 1 if it is undefined.
			const counter = this.effectState.counter || 1;
			this.debug("Success chance: " + Math.round(100 / counter) + "%");
			const success = this.randomChance(1, counter);
			if (!success) delete pokemon.volatiles['evadestall'];
			return success;
		},
		onRestart() {
			if (this.effectState.counter < (this.effect as Condition).counterMax!) {
				this.effectState.counter *= 3;
			}
			this.effectState.duration = 2;
		},
	},
	nointerrupt: {
		name: 'nointerrupt',
		noCopy: true,
		duration: 1,
		onStart(pokemon) {
			this.effectState.ignore = [];
			this.effectState.currentVolatiles = Object.keys(pokemon.volatiles);
			this.debug("Start of turn volatiles: ")
			this.debug(this.effectState.currentVolatiles);
			this.effectState.imprisoned = pokemon.side.foe.active.filter(enemy => enemy.volatiles['imprison']);
		},
		onSetStatus(status, target, source, effect) {
			if (!['brn', 'psn', 'tox'].includes(status.id)){
				this.effectState.ignore.push(status.id);
			}
		},
		onUpdate(pokemon){
			this.debug("volatiles not to ignore: ")
			this.debug(this.effectState.currentVolatiles);
			for(const volatile in pokemon.volatiles){
				this.debug("Checking " + volatile);
				if (['attract', 'choicelock', 'confusion', 'disable', 'encore', 'flinch', 'taunt', 'throatchop'].includes(volatile)
				  && !this.effectState.currentVolatiles.includes(volatile.id) && !this.effectState.ignore.includes(volatile)){
					this.effectState.ignore.push(volatile);
				}
			}
		},
		/*onAddVolatile(status, target, source, effect) {
			if (['attract', 'choicelock', 'confusion', 'disable', 'encore', 'flinch', 'taunt', 'throatchop'].includes(status.id)){
				this.effectState.ignore.push(status.id);
			}
		},
		onFoeAddVolatile(status, target, source, effect) {
			if (status.id === 'imprison'){
				this.effectState.ignore.push('imprison');
			}
		},*/
		onEnd(pokemon) {
			delete this.effectState.ignore;
			delete this.effectState.currentVolatiles;
			delete this.effectState.imprisoned;
		},
		//Actually ignoring move prevention done in the effects itself
	},
	blocked: {
		name: 'blocked',
		noCopy: true,
		duration: 4,
		durationCallback(target, source) {
			if (source?.hasItem('gripclaw')) return 6;
			return 4;
		},
		onStart(target, source, move) {
			this.add('-start', target, 'Block', '[silent]');
			this.add('-activate', target, 'trapped');
		},
		onTrapPokemon(pokemon) {
			pokemon.tryTrap();
		},
		onSourceHit(target, source, move) { //Damaging moves won't switch
			if(move.selfSwitch && target !== source && !source.volatiles['substitute'] && !source.hasItem('shedshell') && !source.hasAbility('runaway')) delete move.selfSwitch;
		},
		onAfterMoveSecondaryPriority: -100,
		onAfterMoveSecondary(target, source, move) { //Items and custom Abilities won't switch
			if(target !== source){
				if(source.switchFlag && !source.volatiles['substitute'] && !source.hasItem('shedshell') && !source.hasAbility('runaway')){
					this.add('-fail', target, '[from] move: Fairy Lock');
					source.switchFlag = false;
					return null;
				}
				if(target.switchFlag && !target.volatiles['substitute'] && !target.hasItem('shedshell') && !target.hasAbility('runaway')){
					this.add('-fail', target, '[from] move: Fairy Lock');
					source.switchFlag = false;
					return null;
				}
			}
		},
		onEmergencyExit(target) { //Escape Plan won't switch
			if(!target.hasItem('shedshell') && !target.volatiles['substitute']){
				target.switchFlag = false;
				return false;
			}
		},
		onEnd(target) {
			this.add('-end', target, 'trapped');
			this.add('-end', target, 'Block', '[silent]');
		},
	},
	meanlooked: {
		name: 'meanlooked',
		noCopy: true,
		duration: 4,
		durationCallback(target, source) {
			if (source?.hasItem('gripclaw')) return 6;
			return 4;
		},
		onStart(target, source, move) {
			this.add('-start', target, 'Mean Look', '[silent]');
			this.add('-activate', target, 'trapped');
		},
		onTrapPokemonPriority: 100,
		onTrapPokemon(pokemon) {
			pokemon.trapped = true;
		},
		onEnd(target) {
			this.add('-end', target, 'trapped');
			this.add('-end', target, 'Mean Look', '[silent]');
		},
	},
	arenatrapped: {
		name: 'arenatrapped',
		duration: 2,
		onFieldStart(target) {
			if(!this.turn) this.effectState.duration--;
			this.add('-fieldactivate', 'move: Fairy Lock');
		},
		onTrapPokemon(pokemon) {
			if(pokemon.isGrounded() && !pokemon.hasAbility('arenatrap')) pokemon.tryTrap();
		},
	},
	singletrap: {
		name: 'singletrap',
		noCopy: true,
		duration: 2,
		onTrapPokemon(pokemon) {
			pokemon.tryTrap();
		},
		onStart(target) {
			this.add('-start', target, 'singletrap', '[silent]');
			this.add('-activate', target, 'trapped');
		},
		onEnd(target) {
			this.add('-end', target, 'trapped');
			this.add('-end', target, 'singletrap', '[silent]');
		},
	},
	strongpartialtrap: {
		name: 'strongpartialtrap',
		duration: 3,
		durationCallback(target, source) {
			if (source?.hasItem('gripclaw')) return 4;
			return 3;
		},
		onStart(pokemon, source) {
			if(pokemon.volatiles['partiallytrapped']) return false;
			this.add('-activate', pokemon, 'move: ' + this.effectState.sourceEffect, '[of] ' + source);
			this.effectState.boundDivisor = source.hasItem('bindingband') ? 3 : 4;
		},
		onResidualOrder: 13,
		onResidual(pokemon) {
			const source = this.effectState.source;
			if (source && (!source.isActive || source.hp <= 0 || !source.activeTurns)) {
				delete pokemon.volatiles['strongpartialtrap'];
				this.add('-end', pokemon, this.effectState.sourceEffect, '[strongpartialtrap]', '[silent]');
				return;
			}
			this.damage(pokemon.baseMaxhp / this.effectState.boundDivisor);
		},
		onEnd(pokemon) {
			this.add('-end', pokemon, this.effectState.sourceEffect, '[strongpartialtrap]');
		},
		onTrapPokemon(pokemon) {
			if (this.effectState.source?.isActive) pokemon.tryTrap();
		},
	},
	sleuther: {
		name: 'sleuther',
		noCopy: true,
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
			if(pokemon.volatiles['nointerrupt']?.ignore.includes('par')) return;
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
					pokemon.statusState.time--;
				}
				pokemon.statusState.time--;
				if (pokemon.statusState.time <= 0) {
					pokemon.cureStatus();
					return;
				}
			}
			if(pokemon.volatiles['nointerrupt']?.ignore.includes('slp')) return;
			this.add('cant', pokemon, 'slp');
			if (move.sleepUsable) {
				return;
			}
			return false;
		},
	},
	commanded: {
		name: "Commanded",
		noCopy: true,
		onStart(pokemon) {
			this.boost({atk: 2, spa: 2, spe: 2, def: 2, spd: 2}, pokemon);
		},
		onSwitchOut(pokemon){
			delete this.effectState.source.volatiles['commanding'];
		},
		onFaint(pokemon){
			delete this.effectState.source.volatiles['commanding'];
		},
	},
	commanding: {
		inherit: true,
		onFaint(pokemon){
			delete this.effectState.source.volatiles['commanded'];
			this.boost({atk: -2, spa: -2, spe: -2, def: -2, spd: -2}, this.effectState.source);
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
			this.effectState.time = this.random(2, 6);
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
			if(pokemon.volatiles['nointerrupt']?.ignore.includes('confusion')) return;
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
			if(pokemon.volatiles['nointerrupt']?.ignore.includes('flinch')) return;
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
			this.effectState.move = this.activeMove.id;
		},
		onBeforeMove(pokemon, target, move) {
			if (!pokemon.getItem().isChoice) {
				pokemon.removeVolatile('choicelock');
				return;
			}
			if (
				!pokemon.ignoringItem() && move.id !== this.effectState.move && move.id !== 'struggle' && !(pokemon.volatiles['nointerrupt']?.ignore.includes('choicelock'))
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
	raindance: {
		inherit: true,
		onWeatherModifyDamage(damage, attacker, defender, move) {
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
			if (move.type === 'Fire' || (move.twoType && move.twoType === 'Fire')) {
				this.debug('Sunny Day fire boost');
				return this.chainModify(1.5);
			}
		},
		weatherName: "Scorching Sun",
		start: "  The sunlight turned scorchingly hot!",
		end: "  The scorching sunlight faded.",
		block: "  The scorching sunlight was not lessened at all!",
		blockMove: "  The Water-type attack evaporated in the scorching sunlight!",
	},
	snow: {
		inherit: true,
		onWeather(target) {
			this.damage(target.baseMaxhp / 16);
		},
		desc: "For 5 turns, the weather becomes Snow. During the effect, the Defense of Ice-type Pokemon is multiplied by 1.5 when taking damage from a physical attack. At the end of each turn except the last, all active Pokemon lose 1/16 of their maximum HP, rounded down, unless they are an Ice type or have the Ice Breaker, Ice Body, Magic Guard, Magma Armor, Overcoat, Purifying Salt, Snow Cloak, or Snow Plow Abilities. If a Pokemon is frozen, the residual damage will combine to 1/8 of its max HP sourced from being frozen. Lasts for 8 turns if the user is holding Icy Rock. Fails if the current weather is Snow.",
		shortDesc: "For 5 turns, snow falls; cold hurts non-Ice types. Ice: 1.5x Def.",
		damage: "  [POKEMON] is hurt by the freezing cold!",
	},
};
