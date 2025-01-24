export const Conditions: {[k: string]: ModdedConditionData & {statusSlots: 1 | 2, stackCondition: string}} = {
	brn: {
		name: 'brn',
		effectType: 'Status',
		statusSlots: 1,
		stackCondition: 'hvybrn',
		onStart(target, source, sourceEffect) {
			if (target.hasType('Fire')) {
				this.add('-immune', target);
				target.clearStatus('brn');
				return false;
			}
			if (sourceEffect && sourceEffect.id === 'flameorb') {
				this.add('-status', target, 'brn', '[from] item: ' + sourceEffect.name);
			} else if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'brn', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'brn');
			}
		},
		onResidualOrder: 10,
		onResidual(pokemon) {
			this.damage(pokemon.baseMaxhp / 8);
		},
	},
	hvybrn: {
		name: 'hvybrn',
		effectType: 'Status',
		start: "[POKEMON] has been heavily burned!",
		alreadyStarted: "[POKEMON] is already heavily burned!",
		endFromItem: "[POKEMON]'s [ITEM] healed its status!",
		statusSlots: 2,
		onStart(target, source, sourceEffect) {
			if (target.hasType('Fire')) {
				this.add('-immune', target);
				target.clearStatus('brn');
				return false;
			}
			this.effectState.stage = 0;
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'hvybrn', '[from] ability: ' + sourceEffect.name, '[of] ' + source, '[silent]');
			} else {
				this.add('-status', target, 'hvybrn', '[silent]');
			}
			this.add('-message', `${target.name} has been heavily burned!`);
		},
		onSwitchIn() {
			this.effectState.stage = 0;
		},
		onResidualOrder: 10,
		onResidual(pokemon) {
			if (this.effectState.stage < 15) {
				this.effectState.stage++;
			}
			this.damage(this.clampIntRange(pokemon.baseMaxhp / 16, 1) * this.effectState.stage);
		},
	},
	par: {
		name: 'par',
		effectType: 'Status',
		statusSlots: 1,
		stackCondition: 'shk',
		onStart(target, source, sourceEffect) {
			if (target.hasType('Electric')) {
				this.add('-immune', target);
				target.clearStatus('par');
				return false;
			}
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'par', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'par');
			}
		},
		onModifySpe(spe, pokemon) {
			if (!pokemon.hasAbility('gale')) {
				return this.chainModify(0.25);
			}
		},
	},
	shk: {
		name: 'shk',
		effectType: 'Status',
		statusSlots: 2,
		start: "[POKEMON] has been shocked!",
		alreadyStarted: "[POKEMON] is already shocked!",
		endFromItem: "[POKEMON]'s [ITEM] healed its status!",
		onStart(target, source, sourceEffect) {
			if (target.hasType('Electric')) {
				this.add('-immune', target);
				target.clearStatus('shk');
				return false;
			}
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'shk', '[from] ability: ' + sourceEffect.name, '[of] ' + source, '[silent]');
			} else {
				this.add('-status', target, 'shk', '[silent]');
			}
			this.add('-message', `${target.name} has been shocked!`);
		},
		onModifySpe(spe, pokemon) {
			if (!pokemon.hasAbility('gale')) {
				return this.chainModify(0.25);
			}
		},
		onAccuracy(accuracy, target, source, move) {
			return true;
		},
	},
	dark: {
		name: 'dark',
		effectType: 'Status',
		statusSlots: 1,
		start: "  [Pokemon] was blinded!",
		alreadyStarted: "  [POKEMON] is already blinded!",
		end: "  [POKEMON] regained its sight!",
		endFromItem: "  [POKEMON]'s [ITEM] restored its sight!",
		endFromMove: "  [POKEMON]'s [MOVE] restored its sight!",
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'dark', '[from] ability: ' + sourceEffect.name, '[of] ' + source, '[silent]');
			} else {
				this.add('-status', target, 'dark', '[silent]');
			}
			this.add('-message', `${target.name} has been blinded!`);
		},
		onModifyAtk(atk, pokemon) {
			if (!pokemon.hasAbility('mindseye') && pokemon.moveThisTurn !== 'blowfromcalamity')
				return this.chainModify(0.5);
		},
	},
	fear: {
		name: 'fear',
		effectType: 'Status',
		statusSlots: 1,
		start: "[POKEMON] has become scared!",
		alreadyStarted: "[POKEMON] is already scared!",
		endFromItem: "[POKEMON]'s [ITEM] healed its status!",
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'fear', '[from] ability: ' + sourceEffect.name, '[of] ' + source, '[silent]');
			} else {
				this.add('-status', target, 'fear', '[silent]');
			}
			this.add('-message', `${target.name} has been scared!`);
		},
		onModifySpA(atk, pokemon) {
			if (!pokemon.hasAbility('pride'))
				return this.chainModify(0.5);
		},
	},
	stp: {
		name: 'stp',
		effectType: 'Status',
		statusSlots: 2,
		start: "[POKEMON] has been stopped!",
		alreadyStarted: "[POKEMON] is already stopped!",
		end: "[POKEMON] can move again!",
		endFromItem: "[POKEMON]'s [ITEM] healed its status!",
		cant: "[POKEMON] is stopped!",
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'stp', '[from] ability: ' + sourceEffect.name, '[of] ' + source, '[silent]');
			} else if (sourceEffect && sourceEffect.effectType === 'Move') {
				this.add('-status', target, 'stp', '[from] move: ' + sourceEffect.name, '[silent]');
			} else {
				this.add('-status', target, 'stp', '[silent]');
			}
			this.add('-message', `${target.name} has been stopped!`);
			// 1-3 turns
			this.effectState.startTime = this.random(2, 5);
			this.effectState.time = this.effectState.startTime;
		},
		onBeforeMovePriority: 10,
		onBeforeMove(pokemon, target, move) {
			if (pokemon.hasAbility('vigorous')) {
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
	psn: {
		name: 'psn',
		effectType: 'Status',
		statusSlots: 1,
		stackCondition: 'tox',
		onStart(target, source, sourceEffect) {
			if (target.hasType(['Poison', 'Steel'])) {
				this.add('-immune', target);
				target.clearStatus('psn');
				return false;
			}
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'psn', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'psn');
			}
		},
		onResidualOrder: 9,
		onResidual(pokemon) {
			this.damage(pokemon.baseMaxhp / 8);
		},
	},
	tox: {
		name: 'tox',
		effectType: 'Status',
		statusSlots: 2,
		start: "[POKEMON] has been heavily poisoned!",
		alreadyStarted: "[POKEMON] is already heavily poisoned!",
		endFromItem: "[POKEMON]'s [ITEM] healed its status!",
		onStart(target, source, sourceEffect) {
			if (target.hasType(['Poison', 'Steel'])) {
				this.add('-immune', target);
				target.clearStatus('tox');
				return false;
			}
			this.effectState.stage = 0;
			if (sourceEffect && sourceEffect.id === 'toxicorb') {
				this.add('-status', target, 'tox', '[from] item: ' + sourceEffect.name);
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
	weak: {
		name: 'weak',
		effectType: 'Status',
		statusSlots: 1,
		start: "[POKEMON] has been weakened!",
		alreadyStarted: "[POKEMON] is already weakened!",
		endFromItem: "[POKEMON]'s [ITEM] healed its status!",
		stackCondition: 'weakheavy',
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'weak', '[from] ability: ' + sourceEffect.name, '[of] ' + source, '[silent]');
			} else {
				this.add('-status', target, 'weak', '[silent]');
			}
			this.add('-message', `${target.name} has been weakened!`);
		},
		onModifyMove(move, pokemon, target) {
			if (move.flags['heal'] && !move.drain) {
				this.add('cant', pokemon, 'condition: weak', move);
				return false;
			}
		},
		onBeforeMovePriority: 6,
		onBeforeMove(pokemon, target, move) {
			if (move.flags['heal'] && !move.drain) {
				this.add('cant', pokemon, 'condition: weak', move);
				return false;
			}
		},
		onTryHeal(damage, target, source, effect) {
			if (effect?.id !== 'breather') return false;
		},
	},
	weakheavy: {
		name: 'weakheavy',
		effectType: 'Status',
		statusSlots: 2,
		start: "[POKEMON] has been heavily weakened!",
		alreadyStarted: "[POKEMON] is already heavily weakened!",
		endFromItem: "[POKEMON]'s [ITEM] healed its status!",
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'weakheavy', '[from] ability: ' + sourceEffect.name, '[of] ' + source, '[silent]');
			} else {
				this.add('-status', target, 'weakheavy', '[silent]');
			}
			this.add('-message', `${target.name} has been heavily weakened!`);
		},
		onDisableMove(pokemon) {
			for (const moveSlot of pokemon.moveSlots) {
				if (this.dex.moves.get(moveSlot.id).flags['heal']) {
					pokemon.disableMove(moveSlot.id);
				}
			}
		},
		onModifyMove(move, pokemon, target) {
			if (move.flags['heal'] && !move.drain) {
				this.add('cant', pokemon, 'condition: weak', move);
				return false;
			}
		},
		onBeforeMovePriority: 6,
		onBeforeMove(pokemon, target, move) {
			if (move.flags['heal'] && !move.drain) {
				this.add('cant', pokemon, 'condition: weak', move);
				return false;
			}
		},
		onTryHeal(damage, target, source, effect) {
			if (effect?.id !== 'breather') return false;
		},
		onDeductPP(target, source) {
			if (!target.status['weakheavy']) return;
			return 1;
		},
	},
	
	//erm what the scallop
	brnpsn: {
		name: 'brnpsn',
		effectType: 'Status',
		statusSlots: 2,
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'brnpsn', '[from] ability: ' + sourceEffect.name, '[of] ' + source, '[silent]');
			} else {
				this.add('-status', target, 'brnpsn', '[silent]');
			}
			this.add('-message', `${target.name} has been poisoned!`);
		},
		onResidual(pokemon) {
			this.damage(pokemon.baseMaxhp / 8);
			this.damage(pokemon.baseMaxhp / 8);
		},
    },
	brndark: {
		name: 'brndark',
		effectType: 'Status',
		statusSlots: 2,
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'brndark', '[from] ability: ' + sourceEffect.name, '[of] ' + source, '[silent]');
			} else {
				this.add('-status', target, 'brndark', '[silent]');
			}
			this.add('-message', `${target.name} has been blinded!`);
		},
		onResidual(pokemon){
			this.damage(pokemon.baseMaxhp / 8);
		},
		onModifyAtk(atk, pokemon) {
			if (!pokemon.hasAbility('mindseye') && pokemon.moveThisTurn !== 'blowfromcalamity')
				return this.chainModify(0.5);
		},
	  },
	brnfear: {
		name: 'brnfear',
		effectType: 'Status',
		statusSlots: 2,
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'brnfear', '[from] ability: ' + sourceEffect.name, '[of] ' + source, '[silent]');
			} else {
				this.add('-status', target, 'brnfear', '[silent]');
			}
			this.add('-message', `${target.name} has been scared!`);
		},
		onResidual(pokemon){
			this.damage(pokemon.baseMaxhp / 8);
		},
		onModifySpA(atk, pokemon) {
			if (!pokemon.hasAbility('pride'))
				return this.chainModify(0.5);
		},
	  },
	brnpar: {
		name: 'brnpar',
		effectType: 'Status',
		statusSlots: 2,
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'brnpar', '[from] ability: ' + sourceEffect.name, '[of] ' + source, '[silent]');
			} else {
				this.add('-status', target, 'brnpar', '[silent]');
			}
			this.add('-message', `${target.name} has been paralyzed!`);
		},
		onResidual(pokemon){
			this.damage(pokemon.baseMaxhp / 8);
		},
		onModifySpe(spe, pokemon) {
			if (!pokemon.hasAbility('gale')) {
				return this.chainModify(0.25);
			}
		},
	  },
	brnweak: {
		name: 'brnweak',
		effectType: 'Status',
		statusSlots: 2,
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'brnweak', '[from] ability: ' + sourceEffect.name, '[of] ' + source, '[silent]');
			} else {
				this.add('-status', target, 'brnweak', '[silent]');
			}
			this.add('-message', `${target.name} has been weakened!`);
		},
		onResidual(pokemon){
			this.damage(pokemon.baseMaxhp / 8);
		},
		onModifyMove(move, pokemon, target) {
			if (move.flags['heal'] && !move.drain) {
				this.add('cant', pokemon, 'condition: weak', move);
				return false;
			}
		},
		onBeforeMovePriority: 6,
		onBeforeMove(pokemon, target, move) {
			if (move.flags['heal'] && !move.drain) {
				this.add('cant', pokemon, 'condition: weak', move);
				return false;
			}
		},
		onDisableMove(pokemon) {
			for (const moveSlot of pokemon.moveSlots) {
				if (this.dex.moves.get(moveSlot.id).flags['heal']) {
					pokemon.disableMove(moveSlot.id);
				}
			}
		},
		onTryHeal(damage, target, source, effect) {
			if (effect?.id !== 'breather') return false;
		},
	  },
	psnbrn: {
		name: 'psnbrn',
		effectType: 'Status',
		statusSlots: 2,
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'psnbrn', '[from] ability: ' + sourceEffect.name, '[of] ' + source, '[silent]');
			} else {
				this.add('-status', target, 'psnbrn', '[silent]');
			}
			this.add('-message', `${target.name} has been burned!`);
		},
		onResidual(pokemon) {
			this.damage(pokemon.baseMaxhp / 8);
			this.damage(pokemon.baseMaxhp / 8);
		},
	  },
	psndark: {
		name: 'psndark',
		effectType: 'Status',
		statusSlots: 2,
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'psndark', '[from] ability: ' + sourceEffect.name, '[of] ' + source, '[silent]');
			} else {
				this.add('-status', target, 'psndark', '[silent]');
			}
			this.add('-message', `${target.name} has been blinded!`);
		},
		onResidual(pokemon){
			this.damage(pokemon.baseMaxhp / 8);
		},
		onModifyAtk(atk, pokemon) {
			if (!pokemon.hasAbility('mindseye') && pokemon.moveThisTurn !== 'blowfromcalamity')
				return this.chainModify(0.5);
		},
	  },
	psnfear: {
		name: 'psnfear',
		effectType: 'Status',
		statusSlots: 2,
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'psnfear', '[from] ability: ' + sourceEffect.name, '[of] ' + source, '[silent]');
			} else {
				this.add('-status', target, 'psnfear', '[silent]');
			}
			this.add('-message', `${target.name} has been scared!`);
		},
		onResidual(pokemon){
			this.damage(pokemon.baseMaxhp / 8);
		},
		onModifySpA(atk, pokemon) {
			if (!pokemon.hasAbility('pride'))
				return this.chainModify(0.5);
		},
	  },
	psnpar: {
		name: 'psnpar',
		effectType: 'Status',
		statusSlots: 2,
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'psnpar', '[from] ability: ' + sourceEffect.name, '[of] ' + source, '[silent]');
			} else {
				this.add('-status', target, 'psnpar', '[silent]');
			}
			this.add('-message', `${target.name} has been paralyzed!`);
		},
		onResidual(pokemon){
			this.damage(pokemon.baseMaxhp / 8);
		},
		onModifySpe(spe, pokemon) {
			if (!pokemon.hasAbility('gale')) {
				return this.chainModify(0.25);
			}
		},
	  },
	psnweak: {
		name: 'psnweak',
		effectType: 'Status',
		statusSlots: 2,
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'psnweak', '[from] ability: ' + sourceEffect.name, '[of] ' + source, '[silent]');
			} else {
				this.add('-status', target, 'psnweak', '[silent]');
			}
			this.add('-message', `${target.name} has been weakened!`);
		},
		onResidual(pokemon){
			this.damage(pokemon.baseMaxhp / 8);
		},
		onModifyMove(move, pokemon, target) {
			if (move.flags['heal'] && !move.drain) {
				this.add('cant', pokemon, 'condition: weak', move);
				return false;
			}
		},
		onBeforeMovePriority: 6,
		onBeforeMove(pokemon, target, move) {
			if (move.flags['heal'] && !move.drain) {
				this.add('cant', pokemon, 'condition: weak', move);
				return false;
			}
		},
		onDisableMove(pokemon) {
			for (const moveSlot of pokemon.moveSlots) {
				if (this.dex.moves.get(moveSlot.id).flags['heal']) {
					pokemon.disableMove(moveSlot.id);
				}
			}
		},
		onTryHeal(damage, target, source, effect) {
			if (effect?.id !== 'breather') return false;
		},
	  },
	darkbrn: {
		name: 'darkbrn',
		effectType: 'Status',
		statusSlots: 2,
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'darkbrn', '[from] ability: ' + sourceEffect.name, '[of] ' + source, '[silent]');
			} else {
				this.add('-status', target, 'darkbrn', '[silent]');
			}
			this.add('-message', `${target.name} has been burned!`);
		},
		onResidual(pokemon){
			this.damage(pokemon.baseMaxhp / 8);
		},
		onModifyAtk(atk, pokemon) {
			if (!pokemon.hasAbility('mindseye') && pokemon.moveThisTurn !== 'blowfromcalamity')
				return this.chainModify(0.5);
		},
	  },
	darkpsn: {
		name: 'darkpsn',
		effectType: 'Status',
		statusSlots: 2,
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'darkpsn', '[from] ability: ' + sourceEffect.name, '[of] ' + source, '[silent]');
			} else {
				this.add('-status', target, 'darkpsn', '[silent]');
			}
			this.add('-message', `${target.name} has been poisonedx!`);
		},
		onResidual(pokemon){
			this.damage(pokemon.baseMaxhp / 8);
		},
		onModifyAtk(atk, pokemon) {
			if (!pokemon.hasAbility('mindseye') && pokemon.moveThisTurn !== 'blowfromcalamity')
				return this.chainModify(0.5);
		},
	  },
	darkfear: {
		name: 'darkfear',
		effectType: 'Status',
		statusSlots: 2,
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'darkfear', '[from] ability: ' + sourceEffect.name, '[of] ' + source, '[silent]');
			} else {
				this.add('-status', target, 'darkfear', '[silent]');
			}
			this.add('-message', `${target.name} has been scared!`);
		},
		onModifyAtk(atk, pokemon) {
			if (!pokemon.hasAbility('mindseye') && pokemon.moveThisTurn !== 'blowfromcalamity')
				return this.chainModify(0.5);
		},
		onModifySpA(atk, pokemon) {
			if (!pokemon.hasAbility('pride'))
				return this.chainModify(0.5);
		},
	  },
	darkpar: {
		name: 'darkpar',
		effectType: 'Status',
		statusSlots: 2,
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'darkpar', '[from] ability: ' + sourceEffect.name, '[of] ' + source, '[silent]');
			} else {
				this.add('-status', target, 'darkpar', '[silent]');
			}
			this.add('-message', `${target.name} has been paralyzed!`);
		},
		onModifyAtk(atk, pokemon) {
			if (!pokemon.hasAbility('mindseye') && pokemon.moveThisTurn !== 'blowfromcalamity')
				return this.chainModify(0.5);
		},
		onModifySpe(spe, pokemon) {
			if (!pokemon.hasAbility('gale')) {
				return this.chainModify(0.25);
			}
		},
	  },
	darkweak: {
		name: 'darkweak',
		effectType: 'Status',
		statusSlots: 2,
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'darkweak', '[from] ability: ' + sourceEffect.name, '[of] ' + source, '[silent]');
			} else {
				this.add('-status', target, 'darkweak', '[silent]');
			}
			this.add('-message', `${target.name} has been weakened!`);
		},
		onModifyAtk(atk, pokemon) {
			if (!pokemon.hasAbility('mindseye') && pokemon.moveThisTurn !== 'blowfromcalamity')
				return this.chainModify(0.5);
		},
		onModifyMove(move, pokemon, target) {
			if (move.flags['heal'] && !move.drain) {
				this.add('cant', pokemon, 'condition: weak', move);
				return false;
			}
		},
		onBeforeMovePriority: 6,
		onBeforeMove(pokemon, target, move) {
			if (move.flags['heal'] && !move.drain) {
				this.add('cant', pokemon, 'condition: weak', move);
				return false;
			}
		},
		onDisableMove(pokemon) {
			for (const moveSlot of pokemon.moveSlots) {
				if (this.dex.moves.get(moveSlot.id).flags['heal']) {
					pokemon.disableMove(moveSlot.id);
				}
			}
		},
		onTryHeal(damage, target, source, effect) {
			if (effect?.id !== 'breather') return false;
		},
	  },
	fearbrn: {
		name: 'fearbrn',
		effectType: 'Status',
		statusSlots: 2,
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'fearbrn', '[from] ability: ' + sourceEffect.name, '[of] ' + source, '[silent]');
			} else {
				this.add('-status', target, 'fearbrn', '[silent]');
			}
			this.add('-message', `${target.name} has been burned!`);
		},
		onResidual(pokemon){
			this.damage(pokemon.baseMaxhp / 8);
		},
		onModifySpA(atk, pokemon) {
			if (!pokemon.hasAbility('pride'))
				return this.chainModify(0.5);
		},
	  },
	fearpsn: {
		name: 'fearpsn',
		effectType: 'Status',
		statusSlots: 2,
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'fearpsn', '[from] ability: ' + sourceEffect.name, '[of] ' + source, '[silent]');
			} else {
				this.add('-status', target, 'fearpsn', '[silent]');
			}
			this.add('-message', `${target.name} has been poisoned!`);
		},
		onResidual(pokemon){
			this.damage(pokemon.baseMaxhp / 8);
		},
		onModifySpA(atk, pokemon) {
			if (!pokemon.hasAbility('pride'))
				return this.chainModify(0.5);
		},
	  },
	feardark: {
		name: 'feardark',
		effectType: 'Status',
		statusSlots: 2,
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'feardark', '[from] ability: ' + sourceEffect.name, '[of] ' + source, '[silent]');
			} else {
				this.add('-status', target, 'feardark', '[silent]');
			}
			this.add('-message', `${target.name} has been blinded!`);
		},
		onModifyAtk(atk, pokemon) {
			if (!pokemon.hasAbility('mindseye') && pokemon.moveThisTurn !== 'blowfromcalamity')
				return this.chainModify(0.5);
		},
		onModifySpA(atk, pokemon) {
			if (!pokemon.hasAbility('pride'))
				return this.chainModify(0.5);
		},
	  },
	fearpar: {
		name: 'fearpar',
		effectType: 'Status',
		statusSlots: 2,
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'fearpar', '[from] ability: ' + sourceEffect.name, '[of] ' + source, '[silent]');
			} else {
				this.add('-status', target, 'fearpar', '[silent]');
			}
			this.add('-message', `${target.name} has been paralyzed!`);
		},
		onModifySpA(atk, pokemon) {
			if (!pokemon.hasAbility('pride'))
				return this.chainModify(0.5);
		},
		onModifySpe(spe, pokemon) {
			if (!pokemon.hasAbility('gale')) {
				return this.chainModify(0.25);
			}
		},
	  },
	fearweak: {
		name: 'fearweak',
		effectType: 'Status',
		statusSlots: 2,
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'fearweak', '[from] ability: ' + sourceEffect.name, '[of] ' + source, '[silent]');
			} else {
				this.add('-status', target, 'fearweak', '[silent]');
			}
			this.add('-message', `${target.name} has been weakened!`);
		},
		onModifySpA(atk, pokemon) {
			if (!pokemon.hasAbility('pride'))
				return this.chainModify(0.5);
		},
		onModifyMove(move, pokemon, target) {
			if (move.flags['heal'] && !move.drain) {
				this.add('cant', pokemon, 'condition: weak', move);
				return false;
			}
		},
		onBeforeMovePriority: 6,
		onBeforeMove(pokemon, target, move) {
			if (move.flags['heal'] && !move.drain) {
				this.add('cant', pokemon, 'condition: weak', move);
				return false;
			}
		},
		onDisableMove(pokemon) {
			for (const moveSlot of pokemon.moveSlots) {
				if (this.dex.moves.get(moveSlot.id).flags['heal']) {
					pokemon.disableMove(moveSlot.id);
				}
			}
		},
		onTryHeal(damage, target, source, effect) {
			if (effect?.id !== 'breather') return false;
		},
	  },
	parbrn: {
		name: 'parbrn',
		effectType: 'Status',
		statusSlots: 2,
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'parbrn', '[from] ability: ' + sourceEffect.name, '[of] ' + source, '[silent]');
			} else {
				this.add('-status', target, 'parbrn', '[silent]');
			}
			this.add('-message', `${target.name} has been burned!`);
		},
		onResidual(pokemon){
			this.damage(pokemon.baseMaxhp / 8);
		},
		onModifySpe(spe, pokemon) {
			if (!pokemon.hasAbility('gale')) {
				return this.chainModify(0.25);
			}
		},
	  },
	parpsn: {
		name: 'parpsn',
		effectType: 'Status',
		statusSlots: 2,
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'parpsn', '[from] ability: ' + sourceEffect.name, '[of] ' + source, '[silent]');
			} else {
				this.add('-status', target, 'parpsn', '[silent]');
			}
			this.add('-message', `${target.name} has been poisoned!`);
		},
		onResidual(pokemon){
			this.damage(pokemon.baseMaxhp / 8);
		},
		onModifySpe(spe, pokemon) {
			if (!pokemon.hasAbility('gale')) {
				return this.chainModify(0.25);
			}
		},
	  },
	pardark: {
		name: 'pardark',
		effectType: 'Status',
		statusSlots: 2,
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'pardark', '[from] ability: ' + sourceEffect.name, '[of] ' + source, '[silent]');
			} else {
				this.add('-status', target, 'pardark', '[silent]');
			}
		},
		onModifyAtk(atk, pokemon) {
			if (!pokemon.hasAbility('mindseye') && pokemon.moveThisTurn !== 'blowfromcalamity')
				return this.chainModify(0.5);
		},
		onModifySpe(spe, pokemon) {
			if (!pokemon.hasAbility('gale')) {
				return this.chainModify(0.25);
			}
		},
	  },
	parfear: {
		name: 'parfear',
		effectType: 'Status',
		statusSlots: 2,
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'parfear', '[from] ability: ' + sourceEffect.name, '[of] ' + source, '[silent]');
			} else {
				this.add('-status', target, 'parfear', '[silent]');
			}
			this.add('-message', `${target.name} has been scared!`);
		},
		onModifySpA(atk, pokemon) {
			if (!pokemon.hasAbility('pride'))
				return this.chainModify(0.5);
		},
		onModifySpe(spe, pokemon) {
			if (!pokemon.hasAbility('gale')) {
				return this.chainModify(0.25);
			}
		},
	  },
	parweak: {
		name: 'parweak',
		effectType: 'Status',
		statusSlots: 2,
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'parweak', '[from] ability: ' + sourceEffect.name, '[of] ' + source, '[silent]');
			} else {
				this.add('-status', target, 'parweak', '[silent]');
			}
			this.add('-message', `${target.name} has been weakened!`);
		},
		onModifySpe(spe, pokemon) {
			if (!pokemon.hasAbility('gale')) {
				return this.chainModify(0.25);
			}
		},
		onModifyMove(move, pokemon, target) {
			if (move.flags['heal'] && !move.drain) {
				this.add('cant', pokemon, 'condition: weak', move);
				return false;
			}
		},
		onBeforeMovePriority: 6,
		onBeforeMove(pokemon, target, move) {
			if (move.flags['heal'] && !move.drain) {
				this.add('cant', pokemon, 'condition: weak', move);
				return false;
			}
		},
		onDisableMove(pokemon) {
			for (const moveSlot of pokemon.moveSlots) {
				if (this.dex.moves.get(moveSlot.id).flags['heal']) {
					pokemon.disableMove(moveSlot.id);
				}
			}
		},
		onTryHeal(damage, target, source, effect) {
			if (effect?.id !== 'breather') return false;
		},
	  },
	weakbrn: {
		name: 'weakbrn',
		effectType: 'Status',
		statusSlots: 2,
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'weakbrn', '[from] ability: ' + sourceEffect.name, '[of] ' + source, '[silent]');
			} else {
				this.add('-status', target, 'weakbrn', '[silent]');
			}
			this.add('-message', `${target.name} has been burned!`);
		},
		onResidual(pokemon){
			this.damage(pokemon.baseMaxhp / 8);
		},
		onModifyMove(move, pokemon, target) {
			if (move.flags['heal'] && !move.drain) {
				this.add('cant', pokemon, 'condition: weak', move);
				return false;
			}
		},
		onBeforeMovePriority: 6,
		onBeforeMove(pokemon, target, move) {
			if (move.flags['heal'] && !move.drain) {
				this.add('cant', pokemon, 'condition: weak', move);
				return false;
			}
		},
		onDisableMove(pokemon) {
			for (const moveSlot of pokemon.moveSlots) {
				if (this.dex.moves.get(moveSlot.id).flags['heal']) {
					pokemon.disableMove(moveSlot.id);
				}
			}
		},
		onTryHeal(damage, target, source, effect) {
			if (effect?.id !== 'breather') return false;
		},
	  },
	weakpsn: {
		name: 'weakpsn',
		effectType: 'Status',
		statusSlots: 2,
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'weakpsn', '[from] ability: ' + sourceEffect.name, '[of] ' + source, '[silent]');
			} else {
				this.add('-status', target, 'weakpsn', '[silent]');
			}
			this.add('-message', `${target.name} has been poisoned!`);
		},
		onResidual(pokemon){
			this.damage(pokemon.baseMaxhp / 8);
		},
		onModifyMove(move, pokemon, target) {
			if (move.flags['heal'] && !move.drain) {
				this.add('cant', pokemon, 'condition: weak', move);
				return false;
			}
		},
		onBeforeMovePriority: 6,
		onBeforeMove(pokemon, target, move) {
			if (move.flags['heal'] && !move.drain) {
				this.add('cant', pokemon, 'condition: weak', move);
				return false;
			}
		},
		onDisableMove(pokemon) {
			for (const moveSlot of pokemon.moveSlots) {
				if (this.dex.moves.get(moveSlot.id).flags['heal']) {
					pokemon.disableMove(moveSlot.id);
				}
			}
		},
		onTryHeal(damage, target, source, effect) {
			if (effect?.id !== 'breather') return false;
		},
	  },
	weakdark: {
		name: 'weakdark',
		effectType: 'Status',
		statusSlots: 2,
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'weakdark', '[from] ability: ' + sourceEffect.name, '[of] ' + source, '[silent]');
			} else {
				this.add('-status', target, 'weakdark', '[silent]');
			}
			this.add('-message', `${target.name} has been blinded!`);
		},
		onModifyAtk(atk, pokemon) {
			if (!pokemon.hasAbility('mindseye') && pokemon.moveThisTurn !== 'blowfromcalamity')
				return this.chainModify(0.5);
		},
		onModifyMove(move, pokemon, target) {
			if (move.flags['heal'] && !move.drain) {
				this.add('cant', pokemon, 'condition: weak', move);
				return false;
			}
		},
		onBeforeMovePriority: 6,
		onBeforeMove(pokemon, target, move) {
			if (move.flags['heal'] && !move.drain) {
				this.add('cant', pokemon, 'condition: weak', move);
				return false;
			}
		},
		onDisableMove(pokemon) {
			for (const moveSlot of pokemon.moveSlots) {
				if (this.dex.moves.get(moveSlot.id).flags['heal']) {
					pokemon.disableMove(moveSlot.id);
				}
			}
		},
		onTryHeal(damage, target, source, effect) {
			if (effect?.id !== 'breather') return false;
		},
	  },
	weakfear: {
		name: 'weakfear',
		effectType: 'Status',
		statusSlots: 2,
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'weakfear', '[from] ability: ' + sourceEffect.name, '[of] ' + source, '[silent]');
			} else {
				this.add('-status', target, 'weakfear', '[silent]');
			}
			this.add('-message', `${target.name} has been scared!`);
		},
		onModifySpA(atk, pokemon) {
			if (!pokemon.hasAbility('pride'))
				return this.chainModify(0.5);
		},
		onModifyMove(move, pokemon, target) {
			if (move.flags['heal'] && !move.drain) {
				this.add('cant', pokemon, 'condition: weak', move);
				return false;
			}
		},
		onBeforeMovePriority: 6,
		onBeforeMove(pokemon, target, move) {
			if (move.flags['heal'] && !move.drain) {
				this.add('cant', pokemon, 'condition: weak', move);
				return false;
			}
		},
		onDisableMove(pokemon) {
			for (const moveSlot of pokemon.moveSlots) {
				if (this.dex.moves.get(moveSlot.id).flags['heal']) {
					pokemon.disableMove(moveSlot.id);
				}
			}
		},
		onTryHeal(damage, target, source, effect) {
			if (effect?.id !== 'breather') return false;
		},
	  },
	weakpar: {
		name: 'weakpar',
		effectType: 'Status',
		statusSlots: 2,
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'weakpar', '[from] ability: ' + sourceEffect.name, '[of] ' + source, '[silent]');
			} else {
				this.add('-status', target, 'weakpar', '[silent]');
			}
			this.add('-message', `${target.name} has been paralyzed!`);
		},
		onModifySpe(spe, pokemon) {
			if (!pokemon.hasAbility('gale')) {
				return this.chainModify(0.25);
			}
		},
		onModifyMove(move, pokemon, target) {
			if (move.flags['heal'] && !move.drain) {
				this.add('cant', pokemon, 'condition: weak', move);
				return false;
			}
		},
		onBeforeMovePriority: 6,
		onBeforeMove(pokemon, target, move) {
			if (move.flags['heal'] && !move.drain) {
				this.add('cant', pokemon, 'condition: weak', move);
				return false;
			}
		},
		onDisableMove(pokemon) {
			for (const moveSlot of pokemon.moveSlots) {
				if (this.dex.moves.get(moveSlot.id).flags['heal']) {
					pokemon.disableMove(moveSlot.id);
				}
			}
		},
		onTryHeal(damage, target, source, effect) {
			if (effect?.id !== 'breather') return false;
		},
	  },
	
	//volatiles
	stancebreak: {
		name: 'stancebreak',
		start: "[POKEMON]'s stance broke!",
		end: "[POKEMON] regained its stance!",
		duration: 2,
		onStart(target, source, sourceEffect) {
			this.add('-start', target, 'stancebreak', '[silent]');
			this.add('-message', `${target.name}'s stance broke!`);
		},
		onAccuracy(accuracy, target, source, move) {
			return true;
		},
		onEnd(target) {
			this.add('-end', target, 'stancebreak', '[silent]');
			this.add('-message', `${target.name} regained its stance!`);
		},
	},
	confusion: {
		inherit: true,
		cant: "[POKEMON] is too confused to move!",
		onBeforeMovePriority: 3,
		onBeforeMove(pokemon) {
			pokemon.volatiles['confusion'].time--;
			if (!pokemon.volatiles['confusion'].time) {
				pokemon.removeVolatile('confusion');
				return;
			}
			if (this.randomChance(1, 2)) {
				this.add('-activate', pokemon, 'confusion');
				this.add('-message', `${pokemon.name} is too confused to move!`);
				return false;
			}
			/*
			this.activeTarget = pokemon;
			const damage = this.actions.getConfusionDamage(pokemon, 40);
			if (typeof damage !== 'number') throw new Error("Confusion damage not dealt");
			const activeMove = {id: this.toID('confused'), effectType: 'Move', type: '???'};
			this.damage(damage, pokemon, pokemon, activeMove as ActiveMove);
			return false;*/
		},
	},

	// weather is implemented here since it's so important to the game

	//TOUHOU WEATHER
	calm: {
		name: "Calm",
		effectType: "Weather",
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem(['almightygodstone', 'silentgodstone'])) return 8;
			if (source.hasAbility('stargazer')) return 0;
			return 5;
		},
		onModifySecondaries(secondaries) {
			return secondaries.filter(effect => !!effect.self);
		},
		onFieldStart(battle, source, effect) {
			this.add('-message', `The weather became Calm!`);
			if (effect?.effectType === 'Ability') {
				this.add('-weather', 'Calm', '[from] ability: ' + effect.name, '[of] ' + source);
			} else {
				this.add('-weather', 'Calm', '[silent]');
			}
		},
		onFieldResidual() {
			this.add('-weather', 'Calm', '[upkeep]');
			this.add('-message', `The calmness continues.`);
			this.eachEvent('Weather');
		},
		onFieldEnd() {
			this.add('-weather', 'none', '[silent]');
			this.add('-message', `The weather returned to normal!`);
		},
	},
	aurora: {
		name: "Aurora",
		effectType: "Weather",
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem(['almightygodstone', 'halogodstone'])) return 8;
			if (source.hasAbility('stargazer')) return 0;
			return 5;
		},
		onModifyDamage(relayVar, source, target, move) {
			if (move.type === "Light") {
				this.chainModify(1.5);
			} else if (move.type === "Dark") {
				this.chainModify(0.5);
			}
		},
		onFieldStart(battle, source, effect) {
			this.add('-message', `The weather became Aurora!`);
			if (effect?.effectType === 'Ability') {
				this.add('-weather', 'Aurora', '[from] ability: ' + effect.name, '[of] ' + source);
			} else {
				this.add('-weather', 'Aurora', '[silent]');
			}
		},
		onFieldResidual() {
			this.add('-weather', 'Aurora', '[upkeep]');
			this.eachEvent('Weather');
			//this.add('-message', `The aurora continues.`);
		},
		onFieldEnd() {
			this.add('-weather', 'none', '[silent]');
			this.add('-message', `The weather returned to normal!`);
		},
	},
	heavyfog: {
		name: "Heavy Fog",
		effectType: "Weather",
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem(['almightygodstone', 'twilightgodstone'])) return 8;
			if (source.hasAbility('stargazer')) return 0;
			return 5;
		},
		onModifyDamage(relayVar, source, target, move) {
			if (move.type === "Dark") {
				this.chainModify(1.5);
			} else if (move.type === "Light") {
				this.chainModify(0.5);
			}
		},
		onFieldStart(battle, source, effect) {
			this.add('-message', `The weather became Heavy Fog!`);
			if (effect?.effectType === 'Ability') {
				this.add('-weather', 'Heavy Fog', '[from] ability: ' + effect.name, '[of] ' + source);
			} else {
				this.add('-weather', 'Heavy Fog', '[silent]');
			}
		},
		onFieldResidual() {
			this.add('-weather', 'Heavy Fog', '[upkeep]');
			this.eachEvent('Weather');
			this.add('-message', `The heavy fog continues.`);
		},
		onFieldEnd() {
			this.add('-weather', 'none', '[silent]');
			this.add('-message', `The weather returned to normal!`);
		},
	},
	duststorm: {
		name: 'Dust Storm',
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem(['almightygodstone', 'sandgodstone'])) return 8;
			if (source.hasAbility('stargazer')) return 0;
			return 5;
		},
		onStart(field, source, effect) {
			this.add('-message', `The weather became Dust Storm!`);
			if (effect?.effectType === 'Ability') {
				if (this.gen <= 5) this.effectState.duration = 0;
				this.add('-weather', 'Dust Storm', '[from] ability: ' + effect.name, '[of] ' + source);
			} else {
				this.add('-weather', 'Dust Storm', '[silent]');
			}
		},
		onFieldResidual() {
			this.add('-weather', 'Dust Storm', '[upkeep]');
			this.add('-message', `The dust storm continues.`);
			if (this.field.isWeather('duststorm')) this.eachEvent('Weather');
		},
		onWeather(target) {
			this.damage(target.baseMaxhp / 16);
		},
		onFieldEnd() {
			this.add('-weather', 'none', '[silent]');
			this.add('-message', `The weather returned to normal!`);
		},
	},
	sunshower: {
		name: 'Sunshower',
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem(['almightygodstone', 'sereingodstone'])) return 8;
			if (source.hasAbility('stargazer')) return 0;
			return 5;
		},
		onFieldStart(field, source, effect) {
			this.add('-message', `The weather became Sunshower!`);
			if (effect?.effectType === 'Ability') {
				if (this.gen <= 5) this.effectState.duration = 0;
				this.add('-weather', 'Sunshower', '[from] ability: ' + effect.name, '[of] ' + source);
			} else {
				this.add('-weather', 'Sunshower', '[silent]');
			}
		},
		// def switch implemented in scripts.ts
		onFieldResidual() {
			this.add('-weather', 'Sunshower', '[upkeep]');
			this.add('-message', `The sunshower continues.`);
			this.eachEvent('Weather');
		},
		onFieldEnd() {
			this.add('-weather', 'none', '[silent]');
			this.add('-message', `The weather returned to normal!`);
		},
	},

	//TOUHOU TERRAIN
	seiryu: {
		name: 'Seiryu',
		effectType: 'Terrain',
		duration: 5,
		durationCallback(source, effect) {
			if (source.hasAbility('timegazer')) return 8;
			return 5;
		},
		onEffectiveness(typeMod, target, type, move) {
			return 0;
		},
		onFieldStart(battle, source, effect) {
			if (effect?.effectType === 'Ability') {
				this.add('-fieldstart', 'terrain: Seiryu', '[from] ability: ' + effect.name, '[of] ' + source);
				this.add('-message', `The terrain became Seiryu!`);
			} else {
				this.add('-fieldstart', 'terrain: Seiryu', '[silent]');
				this.add('-message', `The terrain became Seiryu!`);
			}
		},
		onFieldEnd() {
			this.add('-fieldend', 'terrain: Seiryu', '[silent]');
			this.add('-message', `The terrain returned to normal!`);
		},
	},
	suzaku: {
		name: 'Suzaku',
		effectType: 'Terrain',
		duration: 5,
		durationCallback(source, effect) {
			if (source.hasAbility('timegazer')) return 8;
			return 5;
		},
		onTryHealPriority: 15,
		onTryHeal(this:Battle, relayVar:number, target:Pokemon, source:Pokemon, effect:Effect) {
			if (target.hasAbility('southernexpanse')) return;
			target.damage(relayVar);
			return false;
		},
		onFieldStart(battle, source, effect) {
			this.add('-message', `The terrain became Suzaku!`);
			if (effect?.effectType === 'Ability') {
				this.add('-fieldstart', 'terrain: Suzaku', '[from] ability: ' + effect.name, '[of] ' + source);
			} else {
				this.add('-fieldstart', 'terrain: Suzaku', '[silent]');
			}
		},
		onFieldEnd() {
			this.add('-fieldend', 'terrain: Suzaku', '[silent]');
			this.add('-message', `The terrain returned to normal!`);
		},
	},
	byakko: {
		name: 'Byakko',
		effectType: 'Terrain',
		duration: 5,
		durationCallback(source, effect) {
			if (source.hasAbility('timegazer')) return 8;
			return 5;
		},
		onModifyMove(move, pokemon, target) {
			if (!move.ohko)
				move.accuracy = true;
			move.critRatio = 0;
			move.breaksProtect = true;
		},
		onFieldStart(battle, source, effect) {
			this.add('-message', `The terrain became Byakko!`);
			if (effect?.effectType === 'Ability') {
				this.add('-fieldstart', 'terrain: Byakko', '[from] ability: ' + effect.name, '[of] ' + source);
			} else {
				this.add('-fieldstart', 'terrain: Byakko', '[silent]');
			}
		},
		onFieldEnd() {
			this.add('-fieldend', 'terrain: Byakko', '[silent]');
			this.add('-message', `The terrain returned to normal!`);
		},
	},
	genbu: {
		name: 'Genbu',
		effectType: 'Terrain',
		duration: 5,
		durationCallback(source, effect) {
			if (source.hasAbility('timegazer')) return 8;
			return 5;
		},
		//Trick Room is implemented in pokemon.ts:Pokemon.getActionSpeed()
		onFieldStart(battle, source, effect) {
			this.add('-message', `The terrain became Genbu!`);
			if (effect?.effectType === 'Ability') {
				this.add('-fieldstart', 'terrain: Genbu', '[from] ability: ' + effect.name, '[of] ' + source);
			} else {
				this.add('-fieldstart', 'terrain: Genbu', '[silent]');
			}
		},
		onFieldEnd() {
			this.add('-fieldend', 'terrain: Genbu', '[silent]');
			this.add('-message', `The terrain returned to normal!`);
		},
	},
	kohryu: {
		name: 'Kohryu',
		effectType: 'Terrain',
		duration: 5,
		durationCallback(source, effect) {
			if (source.hasAbility('timegazer')) return 8;
			return 5;
		},
		onModifyMove(move, pokemon, target) {
			const boostAbils = ['aftermove', 'astronomy', 'auroragrace', 'bibliophilia', 'boundaryblurrer', 'boundarysavior', 'breather', 'brightform', 'brutality', 'byakuteismetal', 'charge', 'cloakofdarkness', 'daredevil', 'desperation', 'disjointedblow', 'easternexpanse', 'empowered', 'finalform', 'firsthit', 'forewarddash', 'fullpower', 'galeform', 'generalsform', 'genteiswater', 'ghostform', 'glamorous', 'inversereaction', 'knownlimits', 'kouteisearth', 'lastdefense', 'midnightform', 'mindlessdance', 'mindseye', 'miraclemallet', 'naturalform', 'ontheedge', 'placid', 'preciseaim', 'pride', 'recalibration', 'reckless', 'sandforce', 'seiteiswood', 'skilledhand', 'slowtempo', 'sniper', 'spiritofyang', 'spiritofyin', 'strangerainbow', 'strategist', 'streamform', 'surprisetactics', 'suteisfire', 'trueadmin', 'uniqueshield', 'unyieldingform', 'visionbonus', 'westernexpanse', 'yatanokagami'];
			console.log(pokemon);
			if(pokemon.ability.includes(boostAbils)) move.ignoreAbility = true;
		},
		onFieldStart(battle, source, effect) {
			this.add('-message', `The terrain became Kohryu!`);
			if (effect?.effectType === 'Ability') {
				this.add('-fieldstart', 'terrain: terrainkohryu', '[from] ability: ' + effect.name, '[of] ' + source);
			} else {
				this.add('-fieldstart', 'terrain: terrainkohryu', '[silent]');
			}
		},
		onFieldEnd() {
			this.add('-fieldend', 'terrain: terrainkohryu', '[silent]');
			this.add('-message', `The terrain returned to normal!`);
		},
	},
};
