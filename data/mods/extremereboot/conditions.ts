export const Conditions: {[k: string]: ConditionData} = {
	frz: {
		name: 'frz',
		start: "  [Pokemon] was chilled!",
		alreadyStarted: "  [POKEMON] is already chilled!",
		end: "  [POKEMON] warmed up!",
		endFromItem: "  [POKEMON]'s [ITEM] warmed it up!",
		endFromMove: "  [POKEMON]'s [MOVE] warmed it up!",
		cant: "[POKEMON] is chilled!",
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'frz', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'frz');
			}
		},
		onModifySpe(spe, pokemon) {
			if (pokemon.hasAbility("steadfast")) {
				return this.chainModify(2);
			}
			return this.chainModify(0.5);
		},
	},
	brn: {
		name: 'brn',
		start: "  [Pokemon] was sunburned!",
		alreadyStarted: "  [POKEMON] is already sunburned!",
		end: "  [POKEMON] warmed up!",
		endFromItem: "  [POKEMON]'s [ITEM] healed it's sunburn!",
		endFromMove: "  [POKEMON]'s [MOVE] healed it's sunburn!",
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'brn', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'brn');
			}
		},
		onModifyDef(def, pokemon) {
			if (pokemon.hasAbility("thickskin")) {
				return this.chainModify(1.5);
			} else if (pokemon.hasAbility("steadfast")) {
				return this.chainModify(1.25);
			}
			return this.chainModify(0.75);
		},
		onModifySpD(spd, pokemon) {
			if (pokemon.hasAbility("thickskin")) {
				return this.chainModify(1.5);
			} else if (pokemon.hasAbility("steadfast")) {
				return this.chainModify(1.25);
			}
			return this.chainModify(0.75);
		},
	},
	crs: {
		name: 'crs',
		start: "  [Pokemon] was cursed!",
		alreadyStarted: "  [POKEMON] is already cursed!",
		damage: "  [POKEMON] is afflicted by the curse!",
		end: "  [POKEMON]'s curse was lifted!",
		endFromItem: "  [POKEMON]'s [ITEM] lifted the curse!",
		endFromMove: "  [POKEMON]'s [MOVE] lifted the curse!",
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			this.effectData.stage = 0;
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'crs', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'crs');
			}
		},
		onSwitchIn() {
			this.effectData.stage = 0;
		},
		onResidualOrder: 9,
		onResidual(pokemon) {
			if (this.effectData.stage < 15) {
				this.effectData.stage++;
			}
			this.damage(this.clampIntRange(pokemon.baseMaxhp / 16, 1) * this.effectData.stage);
		},
	},
	fer: {
		name: 'fer',
		start: "  [Pokemon] was consumed by fear!",
		alreadyStarted: "  [POKEMON] is already afraid!",
		end: "  [POKEMON] pulled it together!",
		activate: "  [POKEMON] is shaking in fear!",
		endFromItem: "  [POKEMON]'s [ITEM] soothed its fear!",
		endFromMove: "  [POKEMON]'s [MOVE] soothed its fear!",
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			this.effectData.stage = 0;
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'fer', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'fer');
			}
		},
		onResidualOrder: 9,
		onResidual(pokemon) {
			const boosts = pokemon.boosts;
			let statName = 'atk';
			let bestStat = 0;
			let s: StatNameExceptHP;
			for (s in pokemon.storedStats) {
				if (s === 'def' || s === 'spd') continue;
				let realStat = pokemon.storedStats[s] * (1 + (boosts[s] / 2));
				if (realStat > bestStat) {
					statName = s;
					bestStat = realStat;
				}
			}
			if (pokemon.hasAbility('unstable')) this.boost({[statName]: -2}, pokemon);
			else this.boost({[statName]: -1}, pokemon);
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
			this.effectData.startTime = 3;
			this.effectData.time = this.effectData.startTime;
		},
		onBeforeMovePriority: 10,
		onBeforeMove(pokemon, target, move) {
			if (pokemon.hasAbility('celestial')) {
				pokemon.statusData.time--;
			}
			pokemon.statusData.time--;
			if (pokemon.statusData.time <= 0) {
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
	highnoon: {
		name: 'High Noon',
		effectType: 'Weather',
		weatherName: "Sun",
		start: "  The sun grew brighter!",
		end: "  The sun went back to normal.",
		upkeep: "  (The sun is high in the sky.)",
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem('trickyhourglass')) {
				return 8;
			}
			return 5;
		},
		onWeatherModifyDamage(damage, attacker, defender, move) {
			if (move.type === 'Summer') {
				this.debug('High Noon Summer boost');
				return this.chainModify(1.5);
			}
			if (move.type === 'Winter') {
				this.debug('High Noon Winter suppress');
				return this.chainModify(0.5);
			}
		},
		onStart(battle, source, effect) {
			if (effect?.effectType === 'Ability') {
				this.add('-weather', 'High Noon', '[from] ability: ' + effect, '[of] ' + source);
			} else {
				this.add('-weather', 'High Noon');
			}
		},
		onResidualOrder: 1,
		onResidual() {
			this.add('-weather', 'High Noon', '[upkeep]');
			this.eachEvent('Weather');
		},
		onEnd() {
			this.add('-weather', 'none');
		},
	},
	rainyseason: {
		name: 'Rainy Season',
		effectType: 'Weather',
		weatherName: "Rain",
		start: "  A rainstorm started!",
		end: "  The rainstorm ended.",
		upkeep: "  (The rain continues to fall.)",
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem('trickyhourglass')) {
				return 8;
			}
			return 5;
		},
		onWeatherModifyDamage(damage, attacker, defender, move) {
			if (move.type === 'Spring' || move.type === 'Sea') {
				return this.chainModify(1.3);
			}
		},
		onStart(battle, source, effect) {
			if (effect?.effectType === 'Ability') {
				this.add('-weather', 'Rainy Season', '[from] ability: ' + effect, '[of] ' + source);
			} else {
				this.add('-weather', 'Rainy Season');
			}
		},
		onResidualOrder: 1,
		onResidual() {
			this.add('-weather', 'Rainy Season', '[upkeep]');
			this.eachEvent('Weather');
		},
		onEnd() {
			this.add('-weather', 'none');
		},
	},
	snowfall: {
		name: 'Snowfall',
		effectType: 'Weather',
		weatherName: "Snow",
		start: "  A snowstorm started!",
		end: "  The snowstorm ended.",
		upkeep: "  (The snow continues to fall.)",
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem('trickyhourglass')) {
				return 8;
			}
			return 5;
		},
		onWeatherModifyDamage(damage, attacker, defender, move) {
			if (move.type === 'Winter') {
				this.debug('Snowfall Winter boost');
				return this.chainModify(1.5);
			}
			if (move.type === 'Summer') {
				this.debug('Snowfall Summer suppress');
				return this.chainModify(0.5);
			}
		},
		onStart(battle, source, effect) {
			if (effect?.effectType === 'Ability') {
				this.add('-weather', 'Snowfall', '[from] ability: ' + effect, '[of] ' + source);
			} else {
				this.add('-weather', 'Snowfall');
			}
		},
		onResidualOrder: 1,
		onResidual() {
			this.add('-weather', 'Snowfall', '[upkeep]');
			this.eachEvent('Weather');
		},
		onEnd() {
			this.add('-weather', 'none');
		},
	},
	futuremove: {
		// this is a slot condition
		name: 'futuremove',
		duration: 3,
		onStart() {
			this.effectData.startT = this.turn;
		},
		onResidualOrder: 3,
		onResidual(target) {
			if (this.effectData.move === "dormantpower") {
				const duration = this.turn - this.effectData.startT;
				let winterActive = false;
				for (const pokemon of this.getAllActive()) {
					if (pokemon.hasType("Winter")) winterActive = true;
				}
				if (!winterActive && duration >= 3) {
					target.removeSlotCondition(this.effectData.position, 'futuremove');
					if (this.effectData.source.isActive) this.add('-end', this.effectData.source, 'dormantpower');
				}
			}
		},
		onEnd(target) {
			const data = this.effectData;
			// time's up; time to hit! :D
			const move = this.dex.getMove(data.move);
			if (target.fainted || target === data.source) {
				this.hint(`${move.name} did not hit because the target is ${(data.fainted ? 'fainted' : 'the user')}.`);
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
			if (data.source.hasAbility('adaptability') && this.gen >= 6) {
				data.moveData.stab = 2;
			}
			const hitMove = new this.dex.Move(data.moveData) as ActiveMove;

			this.trySpreadMoveHit([target], data.source, hitMove);
		},
	},
	temporarytrap: {
		name: 'temporarytrap',
		duration: 4,
		onTrapPokemon(pokemon) {
			if (this.effectData.source?.isActive) {
				pokemon.tryTrap();
			} else {
				pokemon.removeVolatile('temporarytrap');
			}
		},
		onEnd(pokemon) {
			this.add('-message', pokemon.name + ' is no longer trapped!');
		},
	},
	monkeyspawheal: {
		onSwap(target) {
			if (
				!target.fainted && (
					target.hp < target.maxhp ||
					target.status ||
					target.moveSlots.some(moveSlot => moveSlot.pp < moveSlot.maxpp)
				)
			) {
				target.heal(target.maxhp);
				target.setStatus('');
				for (const moveSlot of target.moveSlots) {
					moveSlot.pp = moveSlot.maxpp;
				}
				this.add('-heal', target, target.getHealth, "[from] move: Monkey's Paw");
				target.side.removeSlotCondition(target, 'monkeyspawheal');
			}
		},
	},
	twisterlock: {
		name: 'twisterlock',
		durationCallback() {
			const duration = this.sample([2, 2, 2, 3, 3, 3, 4, 5]);
			return duration;
		},
		onResidual(target) {
			if (target.lastMove && target.lastMove.id === 'struggle' || target.status === 'slp') {
				delete target.volatiles['twisterlock'];
			}
		},
		onStart(target, source, effect) {
			this.effectData.move = effect.id;
		},
		onDisableMove(pokemon) {
			if (!pokemon.hasMove(this.effectData.move)) {
				return;
			}
			for (const moveSlot of pokemon.moveSlots) {
				if (moveSlot.id !== this.effectData.move) {
					pokemon.disableMove(moveSlot.id);
				}
			}
		},
		onTrapPokemon(pokemon) {
			pokemon.tryTrap();
		},
	},
	lockedmove: {
		// Rampage && Mononoke Dance
		name: 'lockedmove',
		duration: 2,
		onResidual(target) {
			if (target.status === 'slp') {
				// don't lock, and bypass confusion for calming
				delete target.volatiles['lockedmove'];
			}
			this.effectData.trueDuration--;
		},
		onStart(target, source, effect) {
			this.effectData.trueDuration = this.random(2, 4);
			this.effectData.move = effect.id;
		},
		onRestart() {
			if (this.effectData.trueDuration >= 2) {
				this.effectData.duration = 2;
			}
		},
		onEnd(target) {
			if (this.effectData.trueDuration > 1) return;
			if (this.effectData.move === 'rampage') target.trySetStatus('slp');
		},
		onLockMove(pokemon) {
			if (pokemon.volatiles['dynamax']) return;
			return this.effectData.move;
		},
	},
};
