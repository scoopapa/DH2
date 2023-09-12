export const Conditions: {[k: string]: ModdedConditionData} = {
	par: {
		inherit: true,
		onBeforeMovePriority: 1,
		onBeforeMove(pokemon) {
			if (this.randomChance(1, 5)) {
				this.add('cant', pokemon, 'par');
				return false;
			}
		},
	},
	psn: {
		inherit: true,
		onResidualOrder: 9,
		onResidual(pokemon) {
			this.damage(pokemon.baseMaxhp / 6);
		},
	},
	lockedmove: {
		inherit: true,
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
			if (pokemon.volatiles['dynamax'] || pokemon.hasAbility('ignorance')) return;
			return this.effectState.move;
		},
	},
	choicelock: {
		inherit: true,
		onBeforeMove(pokemon, target, move) {
			if (!pokemon.getItem().isChoice) {
				pokemon.removeVolatile('choicelock');
				return;
			}
			if (
				!pokemon.ignoringItem() && !pokemon.hasAbility('ignorance') && 
				!pokemon.volatiles['dynamax'] && move.id !== this.effectState.move 
				&& move.id !== 'struggle'
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
			if (pokemon.ignoringItem() || pokemon.volatiles['dynamax'] || pokemon.hasAbility('ignorance')) {
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
		onModifySpDPriority: 10,
		onModifySpD(spd, pokemon) {
			if (pokemon.hasType('Rock') && this.field.isWeather('sandstorm') && !pokemon.hasItem('utilityumbrella')) {
				return this.modify(spd, 1.5);
			}
		},
		onWeather(target) {
			if (target.hasItem('utilityumbrella')) return;
			this.damage(target.baseMaxhp / 16);
		},
	},
	snow: {
		inherit: true,
		onModifyDefPriority: 10,
		onModifyDef(def, pokemon) {
			if (pokemon.hasType('Ice') && this.field.isWeather('snow') && !pokemon.hasItem('utilityumbrella')) {
				return this.modify(def, 1.5);
			}
		},
	},
	
	//Roovnen
	mountainbreeze: {
		name: 'Mountain Breeze',
		// this is a volatile status
		onStart(target, source, sourceEffect) {
			this.add('-start', target, 'Mountain Breeze');
		},
		onEffectivenessPriority: -1,
		onEffectiveness(typeMod, target, type, move) {
			if (move && move.effectType === 'Move' && move.category !== 'Status' && move.type === 'Ice' && ['Fire', 'Ice', 'Steel', 'Water'].includes(type)) {
				return 1;
			}
		},
		onEnd(target) {
			this.add('-end', target, 'Mountain Breeze');
		},
	},
	corrupted: {
		name: 'Corrupted',
		// this is a volatile status
		onEffectivenessPriority: -1,
		onEffectiveness(typeMod, target, type, move) {
			if (target.hasAbility('corruption') || ['yorlator', 'mranovo', 'curtowal'].includes(target.species.id)) return;
			if (move && move.effectType === 'Move' && move.category !== 'Status' && move.type === 'Dark') {
				return 1;
			}
		},
	},
	hardenedshell: {
		name: 'Hardened Shell',
		// this is a volatile status
		onStart(target, source, sourceEffect) {
			this.add('-start', target, 'Hardened Shell');
		},
		onEffectivenessPriority: -1,
		onEffectiveness(typeMod, target, type, move) {
			if (move && move.effectType === 'Move' && move.category !== 'Status' && ['Bug', 'Dragon', 'Fairy', 'Flying', 'Grass', 'Ice', 'Normal', 'Rock', 'Steel'].includes(move.type)) {
				return -1;
			}
		},
		onEnd(target) {
			this.add('-end', target, 'Hardened Shell');
		},
	},
};