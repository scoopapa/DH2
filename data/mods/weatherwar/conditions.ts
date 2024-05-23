import {FS} from '../../../lib';
import {toID} from '../../../sim/dex-data';

// Similar to User.usergroups. Cannot import here due to users.ts requiring Chat
// This also acts as a cache, meaning ranks will only update when a hotpatch/restart occurs
const usergroups: {[userid: string]: string} = {};
const usergroupData = FS('config/usergroups.csv').readIfExistsSync().split('\n');
for (const row of usergroupData) {
	if (!toID(row)) continue;

	const cells = row.split(',');
	if (cells.length > 3) throw new Error(`Invalid entry when parsing usergroups.csv`);
	usergroups[toID(cells[0])] = cells[1].trim() || ' ';
}

export function getName(name: string): string {
	const userid = toID(name);
	if (!userid) throw new Error('No/Invalid name passed to getSymbol');

	const group = usergroups[userid] || ' ';
	return group + name;
}

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
		// Damage reduction is handled directly in the sim/battle.js damage function
		onResidualOrder: 9,
		onResidual(pokemon) {
			this.damage(pokemon.baseMaxhp / 16);
		},
		onModifySpA(spa, pokemon) {
			return this.chainModify(0.5);
		},
	},
	theswarm: {
		name: 'The Swarm',
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem('therock')) {
				return 8;
			}
			return 5;
		},
		onModifySpe(spe, pokemon) {
			if (this.field.pseudoWeather.twilightzone && !pokemon.hasType('Bug')) {
				return this.chainModify(0.67);
			}
		},
		onEffectiveness(typeMod, target, type, move) {
			if (this.field.pseudoWeather.twilightzone && move.type === 'Bug' && type === 'Fairy') return 1;
		},
		onFieldStart(field, source, effect) {
			if (effect?.effectType === 'Ability') {
				if (this.gen <= 5) this.effectState.duration = 0;
				this.add('-fieldstart', 'The Swarm', '[from] ability: ' + effect.name, '[of] ' + source);
			} else {
				this.add('-fieldstart', 'The Swarm');
			}
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-weather', 'The Swarm', '[upkeep]');
			this.eachEvent('Weather');
		},
		onFieldEnd() {
			this.add('-fieldend', 'The Swarm');
		},
	},
	twilightzone: {
		name: 'Twilight Zone',
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem('therock')) {
				return 8;
			}
			return 5;
		},
		onModifyAccuracyPriority: -1,
		onModifyAccuracy(accuracy, target, source, move) {
			if (!this.field.pseudoWeather.twilightzone || typeof accuracy !== 'number') return;
			if (move.type !== 'Dark') {
				this.debug('Twilight Zone - decreasing accuracy');
				return this.chainModify([2457, 4096]);
			}
		},
		onModifyMove(move, pokemon) {
			if(this.field.pseudoWeather.twilight && move.basePower <= 60) move.flags['snatch'] = 1;
		},
		onModifyPriority(priority, pokemon, target, move) {
			if (this.field.pseudoWeather.twilightzone && move?.type === 'Dark' && move?.category === 'Status') {
				return priority + 1;
			}
		},
		onFieldStart(field, source, effect) {
			if (effect?.effectType === 'Ability') {
				if (this.gen <= 5) this.effectState.duration = 0;
				this.add('-fieldstart', 'Twilight Zone', '[from] ability: ' + effect.name, '[of] ' + source);
			} else {
				this.add('-fieldstart', 'Twilight Zone');
			}
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-weather', 'Twilight Zone', '[upkeep]');
			this.eachEvent('Weather');
		},
		onFieldEnd() {
			this.add('-fieldend', 'Twilight Zone');
		},
	},
	lotsofreallysmalldragons: {
		name: 'Lots of Really Small Dragons',
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem('therock')) {
				return 8;
			}
			return 5;
		},
		onTryMove(attacker, defender, move) {
			if(this.field.pseudoWeather.lotsofreallysmalldragons && move.flags['sound']) return false;
		},
		onPrepareHit(source, target, move) {
			if (!this.field.pseudoWeather.lotsofreallysmalldragons || move.category === 'Status'| move.flags['noparentalbond'] || move.flags['charge'] ||
			move.flags['futuremove'] || move.spreadHit || move.isZ || move.isMax) return;
			if (move.multihit) move.multihit *= 2;
			else move.multihit = 2;
			move.multihitType = 'parentalbond';
		},
		onSourceModifySecondaries(secondaries, target, source, move) {
			if (this.field.pseudoWeather.lotsofreallysmalldragons && move.multihitType === 'parentalbond' && move.id === 'secretpower' && move.hit < 2) {
				// hack to prevent accidentally suppressing King's Rock/Razor Fang
				return secondaries.filter(effect => effect.volatileStatus === 'flinch');
			}
		},
		onFieldStart(field, source, effect) {
			if (effect?.effectType === 'Ability') {
				if (this.gen <= 5) this.effectState.duration = 0;
				this.add('-fieldstart', 'Lots of Really Small Dragons', '[from] ability: ' + effect.name, '[of] ' + source);
			} else {
				this.add('-fieldstart', 'Lots of Really Small Dragons');
			}
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-weather', 'Lots of Really Small Dragons', '[upkeep]');
			this.eachEvent('Weather');
		},
		onFieldEnd() {
			this.add('-fieldend', 'Lots of Really Small Dragons');
		},
	},
	thunderstorm: {
		name: 'Thunderstorm',
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem('therock')) {
				return 8;
			}
			return 5;
		},
		onResidualOrder: 5,
		onResidualSubOrder: 3,
		onResidual(pokemon) {
			console.log(pokemon);
			if (this.field.pseudoWeather.thunderstorm && pokemon.hp && this.randomChance(3, 10)) {
				const newMove = this.dex.getActiveMove('thunder');
				this.actions.useMove(newMove, pokemon, pokemon);
			}
		},
		onModifyMove(move, pokemon) {
			if(this.field.pseudoWeather.thunderstorm && move.type === 'Electric') move.accuracy = true;
		},
		onFieldStart(field, source, effect) {
			if (effect?.effectType === 'Ability') {
				if (this.gen <= 5) this.effectState.duration = 0;
				this.add('-fieldstart', 'Thunderstorm', '[from] ability: ' + effect.name, '[of] ' + source);
			} else {
				this.add('-fieldstart', 'Thunderstorm');
			}
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-weather', 'Thunderstorm', '[upkeep]');
			this.eachEvent('Weather');
		},
		onFieldEnd() {
			this.add('-fieldend', 'Thunderstorm');
		},
	},
	fable: {
		name: 'Fable',
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem('therock')) {
				return 8;
			}
			return 5;
		},
		// Ability suppression implemented in sim/pokemon.ts:Pokemon#ignoringAbility
		onSourceModifyAtkPriority: 6,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (this.field.pseudoWeather.fable && ['Dark', 'Dragon', 'Ghost', 'Poison'].includes(move.type)) {
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (this.field.pseudoWeather.fable && ['Dark', 'Dragon', 'Ghost', 'Poison'].includes(move.type)) {
				return this.chainModify(0.5);
			}
		},
		onFieldStart(field, source, effect) {
			if (effect?.effectType === 'Ability') {
				if (this.gen <= 5) this.effectState.duration = 0;
				this.add('-fieldstart', 'Fable', '[from] ability: ' + effect.name, '[of] ' + source);
			} else {
				this.add('-weather', 'Fable');
			}
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-fieldstart', 'Fable', '[upkeep]');
			this.eachEvent('Weather');
		},
		onFieldEnd() {
			this.add('-fieldend', 'Fable');
		},
	},
	wwe: {
		name: 'WWE',
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem('therock')) {
				return 8;
			}
			return 5;
		},
		onResidualOrder: 5,
		onResidualSubOrder: 3,
		onResidual(pokemon) {
			if (this.field.pseudoWeather.wwe && pokemon.hp && (!pokemon.lastMove || pokemon.lastMove.category == 'Status')) {
				this.boost({def: -1});
			}
		},
		onAfterMoveSecondary(target, source, move) {
			if (this.field.pseudoWeather.wwe && move.type === 'Fighting' && !this.queue.willMove(target)) {
				if (source.isActive) target.addVolatile('trapped', source, move, 'trapper');
			}
		},
		onFieldStart(field, source, effect) {
			if (effect?.effectType === 'Ability') {
				if (this.gen <= 5) this.effectState.duration = 0;
				this.add('-fieldstart', 'WWE', '[from] ability: ' + effect.name, '[of] ' + source);
			} else {
				this.add('-weather', 'WWE');
			}
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-weather', 'WWE', '[upkeep]');
			this.eachEvent('Weather');
		},
		onFieldEnd() {
			this.add('-fieldend', 'WWE');
		},
	},
	drought: {
		name: 'Drought',
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem('therock')) {
				return 8;
			}
			return 5;
		},
		onResidualOrder: 5,
		onResidualSubOrder: 3,
		onResidual(pokemon) {
			if (this.field.pseudoWeather.drought && pokemon.hp && pokemon.runEffectivness('Fire')) {
				pokemon.trySetStatus('brn', pokemon);
			}
		},
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (this.field.pseudoWeather.drought && defender.status === 'brn' && move.type === 'Fire') {
				return this.chainModify(1.5);
			}
		},
		onFieldStart(field, source, effect) {
			if (effect?.effectType === 'Ability') {
				if (this.gen <= 5) this.effectState.duration = 0;
				this.add('-fieldstart', 'Drought', '[from] ability: ' + effect.name, '[of] ' + source);
			} else {
				this.add('-weather', 'Drought');
			}
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-weather', 'Drought', '[upkeep]');
			this.eachEvent('Weather');
		},
		onFieldEnd() {
			this.add('-fieldend', 'Drought');
		},
	},
	deltastream: {
		name: 'Delta Stream',
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem('therock')) {
				return 8;
			}
			return 5;
		},
		onEffectivenessPriority: -1,
		onEffectiveness(typeMod, target, type, move) {
			if (this.field.pseudoWeather.deltastream && move && move.effectType === 'Move' && move.category !== 'Status' && type === 'Flying' && typeMod > 0) {
				this.add('-fieldactivate', 'Delta Stream');
				return 0;
			}
		},
		onAnyFaintPriority: 1,
		onAnyFaint(target, source) {
			if(this.field.pseudoWeather.deltastream) source.side.addSideCondition('tailwind');
		},
		onFieldStart(field, source, effect) {
			if (effect?.effectType === 'Ability') {
				if (this.gen <= 5) this.effectState.duration = 0;
				this.add('-fieldstart', 'Delta Stream', '[from] ability: ' + effect.name, '[of] ' + source);
			} else {
				this.add('-weather', 'Delta Stream');
			}
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-weather', 'Delta Stream', '[upkeep]');
			this.eachEvent('Weather');
		},
		onFieldEnd() {
			this.add('-fieldend', 'Delta Stream');
		},
	},
	thevoices: {
		name: 'THE VOICES',
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem('therock')) {
				return 8;
			}
			return 5;
		},
		onTryMovePriority: 1,
		onTryMove(attacker, defender, move) {
			if (this.field.pseudoWeather.thevoices && this.randomChance(3, 10)) {
				const newMove = this.dex.getActiveMove('boomburst');
				this.actions.useMove(newMove, target, source);
				this.attrLastMove('[still]');
				return null;
			}
		},
		onModifyMovePriority: -5,
		onModifyMove(move) {
			if (!this.field.pseudoWeather.thevoices) return;
			if (!move.ignoreImmunity) move.ignoreImmunity = {};
			if (move.ignoreImmunity !== true) {
				move.ignoreImmunity['Ghost'] = true;
			}
		},
		onFieldStart(field, source, effect) {
			if (effect?.effectType === 'Ability') {
				if (this.gen <= 5) this.effectState.duration = 0;
				this.add('-fieldstart', 'THE VOICES', '[from] ability: ' + effect.name, '[of] ' + source);
			} else {
				this.add('-fieldstart', 'THE VOICES');
			}
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-weather', 'THE VOICES', '[upkeep]');
			this.eachEvent('Weather');
		},
		onFieldEnd() {
			this.add('-fieldend', 'THE VOICES');
		},
	},
	overgrowth: {
		name: 'Overgrowth',
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem('therock')) {
				return 8;
			}
			return 5;
		},
		onResidual(pokemon) {
			if(this.field.pseudoWeather.overgrowth && !pokemon.hasType('Grass')) pokemon.addVolatile('leechseed');
		},
		onModifyMove(move) {
			if (this.field.pseudoWeather.overgrowth && move.flags['powder']) {
				move.accuracy = true;
				move.ignoringAbility = true;
				delete move.flags['powder'];
			}
		},
		onSourceModifyAccuracyPriority: -1,
		onSourceModifyAccuracy(accuracy, target, source, move) {
			
		},
		onFieldStart(field, source, effect) {
			if (effect?.effectType === 'Ability') {
				if (this.gen <= 5) this.effectState.duration = 0;
				this.add('-fieldstart', 'Overgrowth', '[from] ability: ' + effect.name, '[of] ' + source);
			} else {
				this.add('-fieldstart', 'Overgrowth');
			}
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-weather', 'Overgrowth', '[upkeep]');
			this.eachEvent('Weather');
		},
		onFieldEnd() {
			this.add('-fieldend', 'Overgrowth');
		},
	},
	duststorm: {
		name: 'Dust Storm',
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem('therock')) {
				return 8;
			}
			return 5;
		},
		onFieldStart(field, source, effect) {
			if (effect?.effectType === 'Ability') {
				if (this.gen <= 5) this.effectState.duration = 0;
				this.add('-fieldstart', 'Dust Storm', '[from] ability: ' + effect.name, '[of] ' + source);
			} else {
				this.add('-fieldstart', 'Dust Storm');
			}
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-weather', 'Dust Storm', '[upkeep]');
			this.eachEvent('Weather');
		},
		onWeather(target) {
			this.damage(target.baseMaxhp / 16);
		},
		onFieldEnd() {
			this.add('-fieldend', 'Dust Storm');
		},
	},
	whiteout: {
		name: 'Whiteout',
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem('therock')) {
				return 8;
			}
			return 5;
		},
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			if (this.field.pseudoWeather.whiteout && move.type === 'Water' && !(move.isZ && move.category !== 'Status')) {
				move.type = 'Ice';
			}
		},
		onSourceDamagingHit(damage, target, source, move) {
			// Despite not being a secondary, Shield Dust / Covert Cloak block Poison Touch's effect
			if (!this.field.pseudoWeather.whiteout || target.hasAbility('shielddust') || target.hasItem('covertcloak')) return;
			if (move.type === 'Ice') {
				if (this.randomChance(2, 10)) {
					target.trySetStatus('frz', source);
				}
			}
		},
		onFieldStart(field, source, effect) {
			if (effect?.effectType === 'Ability') {
				if (this.gen <= 5) this.effectState.duration = 0;
				this.add('-fieldstart', 'Whiteout', '[from] ability: ' + effect.name, '[of] ' + source);
			} else {
				this.add('-fieldstart', 'Whiteout');
			}
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-weather', 'Whiteout', '[upkeep]');
			this.eachEvent('Weather');
		},
		onFieldEnd() {
			this.add('-fieldend', 'Whiteout');
		},
	},
	metronomebattle: {
		name: 'Metronome Battle',
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem('therock')) {
				return 8;
			}
			return 5;
		},
		onResidual(pokemon) {
			if(!this.field.pseudoWeather.metronomebattle || !pokemon.hasType('Normal')) return;
			const dance = this.dex.getActiveMove('metronome');
			this.actions.useMove(dance, pokemon);
		},
		onFoeEffectiveness(typeMod, target, type, move) {
			if(this.field.pseudoWeather.metronomebattle && move.type === 'Normal') return 0;
		},
		onModifyMovePriority: -5,
		onModifyMove(move) {
			if (!this.field.pseudoWeather.metronomebattle) return;
			if (!move.ignoreImmunity) move.ignoreImmunity = {};
			if (move.ignoreImmunity !== true) {
				move.ignoreImmunity['Normal'] = true;
			}
		},
		onFieldStart(field, source, effect) {
			if (effect?.effectType === 'Ability') {
				if (this.gen <= 5) this.effectState.duration = 0;
				this.add('-fieldstart', 'Metronome Battle', '[from] ability: ' + effect.name, '[of] ' + source);
			} else {
				this.add('-fieldstart', 'Metronome Battle');
			}
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-weather', 'Metronome Battle', '[upkeep]');
			this.eachEvent('Weather');
		},
		onFieldEnd() {
			this.add('-fieldend', 'Metronome Battle');
		},
	},
	shitstorm: {
		name: 'Shitstorm',
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem('therock')) {
				return 8;
			}
			return 5;
		},
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			if (!this.field.pseudoWeather.shitstorm || !pokemon.hp) return;
			for (const target of pokemon.foes()) {
				if (target.status === 'tox') return;
				if (target.status === 'slp') {
					target.setStatus('tox');
				} else if (target.status) target.setStatus('psn');
			}
		},
		onSourceDamagingHit(damage, target, source, move) {
			if(this.field.pseudoWeather.shitstorm && (target.status === 'psn' || target.status === 'tox'))
				this.damage(target.baseMaxhp / 8, source, target);
		},
		onFieldStart(field, source, effect) {
			if (effect?.effectType === 'Ability') {
				if (this.gen <= 5) this.effectState.duration = 0;
				this.add('-fieldstart', 'Shitstorm', '[from] ability: ' + effect.name, '[of] ' + source);
			} else {
				this.add('-fieldstart', 'Shitstorm');
			}
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-weather', 'Shitstorm', '[upkeep]');
			this.eachEvent('Weather');
		},
		onFieldEnd() {
			this.add('-fieldend', 'Shitstorm');
		},
	},
	idk: {
		name: 'idk',
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem('therock')) {
				return 8;
			}
			return 5;
		},
		onModifyAccuracy(accuracy) {
			if (!this.field.pseudoWeather.idk || typeof accuracy !== 'number') return;
			return this.chainModify([6840, 4096]);
		},
		onDisableMove(pokemon) {
			if(!this.field.pseudoWeather.idk) return;
			for (const moveSlot of pokemon.moveSlots) {
				if (this.dex.moves.get(moveSlot.id).flags['gravity']) {
					pokemon.disableMove(moveSlot.id);
				}
			}
		},
		// groundedness implemented in battle.engine.js:BattlePokemon#isGrounded
		onBeforeMovePriority: 6,
		onBeforeMove(pokemon, target, move) {
			if (this.field.pseudoWeather.idk && move.flags['gravity'] && !move.isZ) {
				this.add('cant', pokemon, 'move: Gravity', move);
				return false;
			}
		},
		onModifyMove(move, pokemon, target) {
			if(!this.field.pseudoWeather.idk) return;
			if(move.type === 'Psychic' && move.category === 'Status' && move.target === 'normal') {
				move.category = "Special";
				move.basePower = 80;
			}
			if (move.flags['gravity'] && !move.isZ) {
				this.add('cant', pokemon, 'move: Gravity', move);
				return false;
			}
			// This code is for moves that use defensive stats as the attacking stat; see below for most of the implementation
			if (!move.overrideOffensiveStat) return;
			const statAndBoosts = move.overrideOffensiveStat;
			if (!['def', 'spd'].includes(statAndBoosts)) return;
			move.overrideOffensiveStat = statAndBoosts === 'def' ? 'spd' : 'def';
			this.hint(`${move.name} uses ${statAndBoosts === 'def' ? '' : 'Sp. '}Def boosts when Wonder Room is active.`);
		},
		onFieldStart(field, source, effect) {
			if (effect?.effectType === 'Ability') {
				if (this.gen <= 5) this.effectState.duration = 0;
				this.add('-fieldstart', 'idk', '[from] ability: ' + effect.name, '[of] ' + source);
			} else {
				this.add('-fieldstart', 'idk');
			}
		},
		// Item suppression implemented in Pokemon.ignoringItem() within sim/pokemon.js
		// Swapping defenses partially implemented in sim/pokemon.js:Pokemon#calculateStat and Pokemon#getStat
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-weather', 'idk', '[upkeep]');
			this.eachEvent('Weather');
		},
		onFieldEnd() {
			this.add('-fieldend', 'idk');
		},
	},
	landslide: {
		name: 'Landslide',
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem('therock')) {
				return 8;
			}
			return 5;
		},
		onModifyDefPriority: 10,
		onModifyDef(def, pokemon) {
			if (this.field.pseudoWeather.landslide && pokemon.hasType('Rock')) {
				return this.modify(def, 1.5);
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (!this.field.pseudoWeather.landslide || move.type !== 'Rock' || typeof move.accuracy !== 'number') return basePower;
			return basePower + (100 - move.accuracy);
		},
		onFieldStart(field, source, effect) {
			if (effect?.effectType === 'Ability') {
				if (this.gen <= 5) this.effectState.duration = 0;
				this.add('-fieldstart', 'Landslide', '[from] ability: ' + effect.name, '[of] ' + source);
			} else {
				this.add('-fieldstart', 'Landslide');
			}
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-weather', 'Landslide', '[upkeep]');
			this.eachEvent('Weather');
		},
		onFieldEnd() {
			this.add('-fieldend', 'Landslide');
		},
	},
	timewarp: {
		name: 'Time Warp',
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem('therock')) {
				return 8;
			}
			return 5;
		},
		onModifyMove(move, pokemon) {
			if (this.field.pseudoWeather.timewarp && !move.flags['futuremove']) {
				move.flags['futuremove'] = 1;
				delete move.flags['protect'];
				if (move.target === "self" && !pokemon.side.slotConditions[pokemon.position]['selfforesighter']) {
					move.onTry = function (source, t) {
						if (!t.side.addSlotCondition(t, 'selfforesighter')) {
							this.hint('Future moves fail when the targeted slot already has a future move focused on it.');
							return false;
						}
						const moveData = this.dex.getActiveMove(move.id);
						moveData.flags['selfforesighter'] = 1;
						delete moveData.flags['protect'];
						Object.assign(t.side.slotConditions[t.position]['selfforesighter'], {
							duration: 3,
							move: moveData.id,
							source: source,
							moveData: moveData,
						});
						this.add('-message', `${source.name} foresaw an attack!`);
						return this.NOT_FAIL;
					}
				} else if (move.target === "self" && !pokemon.side.slotConditions[pokemon.position]['futuremove']) {
					move.onTry = function (source, t) {
						if (!t.side.addSlotCondition(t, 'futuremove')) {
							this.hint('Future moves fail when the targeted slot already has a future move focused on it.');
							return false;
						}
						const moveData = this.dex.getActiveMove(move.id);
						moveData.flags['futuremove'] = 1;
						delete moveData.flags['protect'];
						Object.assign(t.side.slotConditions[t.position]['futuremove'], {
							duration: 3,
							move: moveData.id,
							source: source,
							moveData: moveData,
						});
						this.add('-message', `${source.name} foresaw an attack!`);
						return this.NOT_FAIL;
					}
				}
			}
		},
		//max power steel moves implemented in moves.ts
		onFieldStart(field, source, effect) {
			if (effect?.effectType === 'Ability') {
				if (this.gen <= 5) this.effectState.duration = 0;
				this.add('-fieldstart', 'Time Warp', '[from] ability: ' + effect.name, '[of] ' + source);
			} else {
				this.add('-fieldstart', 'Time Warp');
			}
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-weather', 'Time Warp', '[upkeep]');
			this.eachEvent('Weather');
		},
		onFieldEnd() {
			this.add('-fieldend', 'Time Warp');
		},
	},
	flashflood: {
		name: 'Flash Flood',
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem('therock')) {
				return 8;
			}
			return 5;
		},
		onResidual(pokemon) {
			if(this.field.pseudoWeather.flashflood && this.randomChance(1, 4)) {
				if (this.runEvent('DragOut', pokemon, pokemon)) {
					pokemon.forceSwitchFlag = true;
				}
			}
		},
		onModifyPriority(priority, pokemon, target, move) {
			if(!this.field.pseudoWeather.flashflood || move?.category === 'Status' || move?.type !== 'Water') return;
			const basePowerAfterMultiplier = this.modify(move.basePower, this.event.modifier);
			if (basePowerAfterMultiplier <= 60) return priority + 1;
		},
		onFieldStart(field, source, effect) {
			if (effect?.effectType === 'Ability') {
				if (this.gen <= 5) this.effectState.duration = 0;
				this.add('-fieldstart', 'Flash Flood', '[from] ability: ' + effect.name, '[of] ' + source);
			} else {
				this.add('-fieldstart', 'Flash Flood');
			}
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-weather', 'Flash Flood', '[upkeep]');
			this.eachEvent('Weather');
		},
		onFieldEnd() {
			this.add('-fieldend', 'Flash Flood');
		},
	},

	selfforesighter: {
		// this is a slot condition
		name: 'selfforesighter',
		duration: 3,
		onResidualOrder: 3,
		onEnd(target) {
			const data = this.effectState;
			// time's up; time to hit! :D
			const move = this.dex.moves.get(data.move);
			if (target.fainted || target !== data.source) {
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
};