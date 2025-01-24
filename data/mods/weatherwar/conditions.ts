import {FS} from '../../../lib';
import {toID} from '../../../sim/dex-data';
import {Pokemon} from "../../../sim/pokemon";

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
				this.add('-status', target, 'frz', '[from] ability: ' + sourceEffect.name, '[of] ' + source, '[silent]');
			} else {
				this.add('-status', target, 'frz', '[silent]');
			}
			this.add('-message', `${target.name} was frostbitten!`);
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
			if (source?.hasItem('therock')) return 8;
			if (source.hasAbility('weathersetter')) return 0;
			return 5;
		},
		onModifySpe(spe, pokemon) {
			if (this.field.pseudoWeather.twilightzone && !pokemon.hasType('Bug')) {
				return this.chainModify(0.67);
			}
		},
		onModifyMove(move) {
			if (move.category === 'Status' || move.type !== 'Bug') return;
			move.onEffectiveness = function(typeMod, target, type) {
				if(type === 'Fairy') return 1;
			};
		},
		onFieldStart(field, source, effect) {
			if (effect?.effectType === 'Ability') {
				if (this.gen <= 5) this.effectState.duration = 0;
				this.add('-fieldstart', 'The Swarm', '[from] ability: ' + effect.name, '[of] ' + source, '[silent]');
			} else {
				this.add('-fieldstart', 'The Swarm', '[silent]');
			}
			this.add('-message', "The Swarm approaches...");
			this.hint("In The Swarm, non-Bug Pokemon have 0.67x speed and Bug moves hit Fairy supereffectively.");
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-message', "The Swarm persists...");
			this.add('-weather', 'The Swarm', '[upkeep]');
			this.eachEvent('Weather');
		},
		onFieldEnd() {
			this.add('-fieldend', 'The Swarm', '[silent]');
			this.add('-message', "The Swarm departs...");
		},
	},
	twilightzone: {
		name: 'Twilight Zone',
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem('therock')) return 8;
			if (source.hasAbility('weathersetter')) return 0;
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
				this.add('-fieldstart', 'Twilight Zone', '[from] ability: ' + effect.name, '[of] ' + source, '[silent]');
			} else {
				this.add('-fieldstart', 'Twilight Zone', '[silent]');
			}
			this.add('-message', "You've entered the Twilight Zone.");
			this.hint("In Twilight Zone, non-Dark moves have 0.6x accuracy and Dark status moves have +1 priority.");
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-message', "You're in the Twilight Zone.");
			this.add('-weather', 'Twilight Zone', '[upkeep]');
			this.eachEvent('Weather');
		},
		onFieldEnd() {
			this.add('-fieldend', 'Twilight Zone', '[silent]');
			this.add('-message', "You've exited the Twilight Zone.");
		},
	},
	lotsofreallysmalldragons: {
		name: 'Lots of Really Small Dragons',
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem('therock')) return 8;
			if (source.hasAbility('weathersetter')) return 0;
			return 5;
		},
		onTryMove(attacker, defender, move) {
			if(this.field.pseudoWeather.lotsofreallysmalldragons && move.flags['sound']) {
				this.add('-message', "The Lots of Really Small Dragons are so loud, you can't hear!");
				return false;
			}
		},
		onPrepareHit(source, target, move) {
			if (!this.field.pseudoWeather.lotsofreallysmalldragons || move.category === 'Status' || move.type !== 'Dragon' || move.flags['noparentalbond'] || move.flags['charge'] ||
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
				this.add('-fieldstart', 'Lots of Really Small Dragons', '[from] ability: ' + effect.name, '[of] ' + source, '[silent]');
			} else {
				this.add('-fieldstart', 'Lots of Really Small Dragons', '[silent]');
				this.add('-message', "Lots of Really Small Dragons arrive!");
			}
			this.hint("In Lots of Really Small Dragons, sound moves fail when used and Dragon moves hit twice but the second hit has 0.25x power.");
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-weather', 'Lots of Really Small Dragons', '[upkeep]');
			this.eachEvent('Weather');
			this.add('-message', "Lots of Really Small Dragons are still here!");
		},
		onFieldEnd() {
			this.add('-fieldend', 'Lots of Really Small Dragons', '[silent]');
			this.add('-message', "Lots of Really Small Dragons leave!");
		},
	},
	thunderstorm: {
		name: 'Thunderstorm',
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem('therock')) return 8;
			if (source.hasAbility('weathersetter')) return 0;
			return 5;
		},
		onResidualOrder: 5,
		onResidualSubOrder: 3,
		onResidual(pokemon) {
			if (this.field.pseudoWeather.thunderstorm && pokemon.hp && this.randomChance(3, 10)) {
				const newMove = this.dex.getActiveMove('thunder');
				const newSet = {
					name: 'Mew',
					species: 'Mew',
					item: '',
					ability: 'Static',
					moves: [ 'Thunder' ],
					nature: 'Serious',
					evs: { hp: 85, atk: 85, def: 85, spa: 85, spd: 85, spe: 85 },
					gender: 'N',
					ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
					happiness: 255,
					hpType: '',
					pokeball: '',
					gigantamax: false,
					dynamaxLevel: 10,
					teraType: 'Electric',
					level: 100
				};
				const newMon = new Pokemon(newSet, pokemon.side);
				this.add(`c:|${Math.floor(Date.now() / 1000)}|LTG|You should forfeit... NOW!`);
				this.add('-anim', pokemon, "Thunder", pokemon);
				this.actions.useMove(newMove, newMon, pokemon);
			}
		},
		onModifyMove(move, pokemon) {
			if(this.field.pseudoWeather.thunderstorm && move.type === 'Electric') move.accuracy = true;
		},
		onFieldStart(field, source, effect) {
			if (effect?.effectType === 'Ability') {
				if (this.gen <= 5) this.effectState.duration = 0;
				this.add('-fieldstart', 'Thunderstorm', '[from] ability: ' + effect.name, '[of] ' + source, '[silent]');
			} else {
				this.add('-fieldstart', 'Thunderstorm', '[silent]');
			}
			this.add('-message', "The thunder storms in.");
			this.hint("In Thunderstorm, all Pokemon have a 30% chance to get hit by a 100 SpA non-STAB Thunder at the end of each turn and Electric moves can't miss.");
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-message', "The thunder storms.");
			this.add('-weather', 'Thunderstorm', '[upkeep]');
			this.eachEvent('Weather');
		},
		onFieldEnd() {
			this.add('-fieldend', 'Thunderstorm', '[silent]');
			this.add('-message', "The thunder storms away.");
		},
	},
	fable: {
		name: 'Fable',
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem('therock')) return 8;
			if (source.hasAbility('weathersetter')) return 0;
			return 5;
		},
		// Ability suppression implemented in sim/pokemon.ts:Pokemon#ignoringAbility
		onSourceModifyAtkPriority: 6,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (this.field.pseudoWeather.fable && ['Dark', 'Dragon', 'Ghost', 'Poison'].includes(move.type)) {
				if(!attacker.hasAbility('darkfantasy')) return this.chainModify(0.75);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (this.field.pseudoWeather.fable && ['Dark', 'Dragon', 'Ghost', 'Poison'].includes(move.type)) {
				if(!attacker.hasAbility('darkfantasy')) return this.chainModify(0.75);
			}
		},
		onFieldStart(field, source, effect) {
			if (effect?.effectType === 'Ability') {
				if (this.gen <= 5) this.effectState.duration = 0;
				this.add('-fieldstart', 'Fable', '[from] ability: ' + effect.name, '[of] ' + source, '[silent]');
			} else {
				this.add('-weather', 'Fable', '[silent]');
			}
			this.add('-message', "A fable started!");
			this.hint("In Fable, \"evil\" abilities are suppressed and Dark, Ghost, Poison, Dragon moves have 0.75x power.")
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-message', "A fable continues.");
			this.add('-weather', 'Fable', '[upkeep]');
			this.eachEvent('Weather');
		},
		onFieldEnd() {
			this.add('-fieldend', 'Fable', '[silent]');
			this.add('-message', "A fable ended.");
		},
	},
	colosseum: {
		name: 'Colosseum',
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem('therock')) return 8;
			if (source.hasAbility('weathersetter')) return 0;
			return 5;
		},
		onResidualOrder: 5,
		onResidualSubOrder: 3,
		onResidual(pokemon) {
			if (this.field.pseudoWeather.colosseum && pokemon.hp && (!pokemon.lastMove || pokemon.lastMove.category == 'Status')) {
				this.add('-message', `${pokemon.name} feels pressure from the colosseum!`);
				this.boost({def: -1});
			}
		},
		onAfterMoveSecondary(target, source, move) {
			if (this.field.pseudoWeather.colosseum && move.type === 'Fighting' && !this.queue.willMove(target)) {
				if (source.isActive) target.addVolatile('trapped', source, move, 'trapper');
			}
		},
		onFieldStart(field, source, effect) {
			if (effect?.effectType === 'Ability') {
				if (this.gen <= 5) this.effectState.duration = 0;
				this.add('-fieldstart', 'Colosseum', '[from] ability: ' + effect.name, '[of] ' + source, '[silent]');
			} else {
				this.add('-weather', 'Colosseum', '[silent]');
			}
			this.add('-message', "The colosseum appears!");
			this.hint("In Colosseum, at the end of each turn, Pokemon who did not attack have their highest defense lowered by 1 stage and Fighting moves trap the opponent if they move last.");
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-message', "The colosseum persists.");
			this.add('-weather', 'Colosseum', '[upkeep]');
			this.eachEvent('Weather');
		},
		onFieldEnd() {
			this.add('-fieldend', 'Colosseum', '[silent]');
			this.add('-message', "The colosseum disappears.");
		},
	},
	drought: {
		name: 'Drought',
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem('therock')) return 8;
			if (source.hasAbility('weathersetter')) return 0;
			return 5;
		},
		onResidualOrder: 5,
		onResidualSubOrder: 3,
		onResidual(pokemon) {
			if (this.field.pseudoWeather.drought && pokemon.hp && !pokemon.status && pokemon.runEffectiveness('Fire') > 0) {
				this.add('-message', `${pokemon.name} spontaneously erupted into flames!`);
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
				this.add('-fieldstart', 'Drought', '[from] ability: ' + effect.name, '[of] ' + source, '[silent]');
			} else {
				this.add('-weather', 'Drought', '[silent]');
			}
			this.add('-message', "A drought started!");
			this.hint("In Drought, Pokemon weak to Fire become burned at the end of each turn and Fire moves deal 1.5x damage to burned targets.");
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-message', "The drought continues.");
			this.add('-weather', 'Drought', '[upkeep]');
			this.eachEvent('Weather');
		},
		onFieldEnd() {
			this.add('-fieldend', 'Drought', '[silent]');
			this.add('-message', "The drought ended.");
		},
	},
	deltastream: {
		name: 'Delta Stream',
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem('therock')) return 8;
			if (source.hasAbility('weathersetter')) return 0;
			return 5;
		},
		onEffectivenessPriority: -1,
		onEffectiveness(typeMod, target, type, move) {
			if (this.field.pseudoWeather.deltastream && move && move.effectType === 'Move' && move.category !== 'Status' && type === 'Flying' && typeMod > 0) {
				this.add('-fieldactivate', 'Delta Stream');
				return 0;
			}
		},
		onFaint(pokemon) {
			if(this.field.pseudoWeather.deltastream && pokemon.hasType("Flying")) {
				this.add('-message', `${pokemon.name} produces its last flap...`);
				pokemon.side.addSideCondition('tailwind');
			}
		},
		onFieldStart(field, source, effect) {
			if (effect?.effectType === 'Ability') {
				if (this.gen <= 5) this.effectState.duration = 0;
				this.add('-fieldstart', 'Delta Stream', '[from] ability: ' + effect.name, '[of] ' + source);
			} else {
				this.add('-weather', 'Delta Stream');
			}
			this.hint("In Delta Stream, Ice, Electric, and Rock moves have halved power against Flying-types and when a Flying Pokemon dies, it sets Tailwind for 2 turns.");
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
			if (source?.hasItem('therock')) return 8;
			if (source.hasAbility('weathersetter')) return 0;
			return 5;
		},
		onAfterMoveSecondary(target, source, move) {
			if (this.field.pseudoWeather.thevoices && move.id !== 'boomburst' && this.randomChance(3, 10)) {
				this.add('-message', `${source.name} hears the voices...`);
				const newMove = this.dex.getActiveMove('boomburst');
				this.actions.useMove(newMove, source, target);
				this.attrLastMove('[still]');
				return null;
			}
		},
		onModifyMove(move, pokemon) {
			if (!this.field.pseudoWeather.thevoices || move.type !== 'Ghost') return;
			for (const target of pokemon.side.foe.active) {
				if (target.types.includes("Normal")) {
					if (!move.ignoreImmunity) move.ignoreImmunity = {};
					if (move.ignoreImmunity !== true) {
						move.ignoreImmunity['Ghost'] = true;
						move.damage = 'level';
					}
				}
			}
		},
		onFieldStart(field, source, effect) {
			if (effect?.effectType === 'Ability') {
				if (this.gen <= 5) this.effectState.duration = 0;
				this.add('-fieldstart', 'THE VOICES', '[from] ability: ' + effect.name, '[of] ' + source, '[silent]');
			} else {
				this.add('-fieldstart', 'THE VOICES', '[silent]');
			}
			this.add('-message', "You hear THE VOICES...");
			this.hint("In THE VOICES, there is a 30% for any move to be turned into Boomburst and Ghost moves hit Normal types for 100 HP.");
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-message', "You still hear THE VOICES...");
			this.add('-weather', 'THE VOICES', '[upkeep]');
			this.eachEvent('Weather');
		},
		onFieldEnd() {
			this.add('-fieldend', 'THE VOICES', '[silent]');
			this.add('-message', "You stop hearing THE VOICES.");
		},
	},
	overgrowth: {
		name: 'Overgrowth',
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem('therock')) return 8;
			if (source.hasAbility('weathersetter')) return 0;
			return 5;
		},
		onResidual(pokemon) {
			if(pokemon.adjacentFoes().length == 0) return;
			const target = this.sample(pokemon.adjacentFoes());
			if(this.field.pseudoWeather.overgrowth && !pokemon.hasType('Grass')) pokemon.addVolatile('leechseed', target);
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
				this.add('-fieldstart', 'Overgrowth', '[from] ability: ' + effect.name, '[of] ' + source, '[silent]');
			} else {
				this.add('-fieldstart', 'Overgrowth', '[silent]');
			}
			this.add('-message', "An overgrowth appeared!");
			this.hint("In Overgrowth, all non-Grass Pokemon are afflicted with Leech Seed at the end of each turn and Powder moves bypass immunities and can't miss.");
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-message', "The overgrowth continues.");
			this.add('-weather', 'Overgrowth', '[upkeep]');
			this.eachEvent('Weather');
		},
		onFieldEnd() {
			this.add('-fieldend', 'Overgrowth', '[silent]');
			this.add('-message', "The overgrowth subsides.");
		},
	},
	duststorm: {
		name: 'Dust Storm',
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem('therock')) return 8;
			if (source.hasAbility('weathersetter')) return 0;
			return 5;
		},
		onFieldStart(field, source, effect) {
			if (effect?.effectType === 'Ability') {
				if (this.gen <= 5) this.effectState.duration = 0;
				this.add('-fieldstart', 'Dust Storm', '[from] ability: ' + effect.name, '[of] ' + source, '[silent]');
			} else {
				this.add('-fieldstart', 'Dust Storm', '[silent]');
			}
			this.add('-message', "A dust storm kicked up!");
			this.hint("In Dust Storm, all non-Ground/Rock/Steel Pokemon lose 1/16 max HP at the end of each turn for each weather present; and Spikes sets itself in two layers at a time and deals double damage.");
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-message', "The dust storm continues.");
			this.add('-weather', 'Dust Storm', '[upkeep]');
			//this.eachEvent('Weather');
		},
		onWeather(target) {
			const immuneTypes = ['Ground', 'Rock', 'Steel'];
			if (!immuneTypes.some(r => target.baseSpecies.types.includes(r))) {
				this.add('-message', `${target.name} is hurt by its ${target.set.ability}!`);
				this.damage(target.baseMaxhp / 16);
			}
		},
		onFieldEnd() {
			this.add('-fieldend', 'Dust Storm', '[silent]');
			this.add('-message', "The dust storm subsided.");
		},
	},
	whiteout: {
		name: 'Whiteout',
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem('therock')) return 8;
			if (source.hasAbility('weathersetter')) return 0;
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
				this.add('-fieldstart', 'Whiteout', '[from] ability: ' + effect.name, '[of] ' + source, '[silent]');
			} else {
				this.add('-fieldstart', 'Whiteout', '[silent]');
			}
			this.add('-message', "A whiteout kicked up!");
			this.hint("In Whiteout, Water moves become Ice moves and Ice moves have a 20% chance to inflict Frostbite.");
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-message', "The whiteout continues.");
			this.add('-weather', 'Whiteout', '[upkeep]');
			this.eachEvent('Weather');
		},
		onFieldEnd() {
			this.add('-fieldend', 'Whiteout', '[silent]');
			this.add('-message', "The whiteout subsided.");
		},
	},
	metronomebattle: {
		name: 'Metronome Battle',
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem('therock')) return 8;
			if (source.hasAbility('weathersetter')) return 0;
			return 5;
		},
		onResidual(pokemon) {
			if(!this.field.pseudoWeather.metronomebattle || !pokemon.hasType('Normal')) return;
			const dance = this.dex.getActiveMove('metronome');
			this.actions.useMove(dance, pokemon);
		},
		onEffectiveness(typeMod, target, type, move) {
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
				this.add('-fieldstart', 'Metronome Battle', '[from] ability: ' + effect.name, '[of] ' + source, '[silent]');
			} else {
				this.add('-fieldstart', 'Metronome Battle', '[silent]');
			}
			this.add('-message', "Metronome battle go!");
			this.hint("In Metronome Battle, Normal Pokemon use Metronome at the end of each turn and Normal moves have neutral effectiveness.");
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-message', "The metronome battle continues.");
			this.add('-weather', 'Metronome Battle', '[upkeep]');
			this.eachEvent('Weather');
		},
		onFieldEnd() {
			this.add('-fieldend', 'Metronome Battle', '[silent]');
			this.add('-message', "Metronome battle stop!");
		},
	},
	shitstorm: {
		name: 'Shitstorm',
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem('therock')) return 8;
			if (source.hasAbility('weathersetter')) return 0;
			return 5;
		},
		onResidualOrder: 100,
		onResidualSubOrder: 100,
		onResidual(pokemon) {
			if (!this.field.pseudoWeather.shitstorm || !pokemon.hp) return;
			for (const target of pokemon.foes()) {
				if (target.status === 'tox') return;
				if (target.status) {
					target.setStatus('');
					if (target.status === 'slp') target.setStatus('tox');
					else target.setStatus('psn');
				}
			}
		},
		onDamagingHit(damage, target, source, move) {
			if(this.field.pseudoWeather.shitstorm && move.type === 'Poison' && (target.status === 'psn' || target.status === 'tox'))
				this.boost({atk: -1, spa: -1, spe: -1}, target, source, move);
		},
		onFieldStart(field, source, effect) {
			if (effect?.effectType === 'Ability') {
				if (this.gen <= 5) this.effectState.duration = 0;
				this.add('-fieldstart', 'Shitstorm', '[from] ability: ' + effect.name, '[of] ' + source, '[silent]');
			} else {
				this.add('-fieldstart', 'Shitstorm', '[silent]');
			}
			this.add('-message', "A shitstorm brews!");
			this.hint("In Shitstorm, Burn/Paralysis/Frostbite/Confusion become Poison, Sleep becomes Toxic, and Poison moves lower poisoned targets' Atk/SpA/Spe by 1.");
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-message', "The shitstorm keeps brewing.");
			this.add('-weather', 'Shitstorm', '[upkeep]');
			this.eachEvent('Weather');
		},
		onFieldEnd() {
			this.add('-fieldend', 'Shitstorm', '[silent]');
			this.add('-message', "The shitstorm disapppears.");
		},
	},
	mindfuck: {
		name: 'mindfuck',
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem('therock')) return 8;
			if (source.hasAbility('weathersetter')) return 0;
			return 5;
		},
		onModifyAccuracy(accuracy) {
			if (!this.field.pseudoWeather.mindfuck || typeof accuracy !== 'number') return;
			return this.chainModify([6840, 4096]);
		},
		onDisableMove(pokemon) {
			if(!this.field.pseudoWeather.mindfuck) return;
			for (const moveSlot of pokemon.moveSlots) {
				if (this.dex.moves.get(moveSlot.id).flags['gravity']) {
					pokemon.disableMove(moveSlot.id);
				}
			}
		},
		// groundedness implemented in battle.engine.js:BattlePokemon#isGrounded
		onBeforeMovePriority: 6,
		onBeforeMove(pokemon, target, move) {
			if (this.field.pseudoWeather.mindfuck && move.flags['gravity'] && !move.isZ) {
				this.add('cant', pokemon, 'move: Gravity', move);
				return false;
			}
		},
		onModifyMove(move, pokemon, target) {
			if(!this.field.pseudoWeather.mindfuck) return;
			if(move.type === 'Psychic' && move.category === 'Status' && move.target === 'normal') {
				move.category = "Special";
				move.basePower = 90;
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
				this.add('-fieldstart', 'Mindfuck', '[from] ability: ' + effect.name, '[of] ' + source);
			} else {
				this.add('-fieldstart', 'Mindfuck', '[silent]');
			}
			this.add('-message', "Your mind got fucked!");
			this.hint("In Mindfuck, the effects of Magic Room, Wonder Room, and Gravity are active, and Psychic status moves with an adjacent target become special with 90 BP.", '[silent]');
		},
		// Item suppression implemented in Pokemon.ignoringItem() within sim/pokemon.js
		// Swapping defenses partially implemented in sim/pokemon.js:Pokemon#calculateStat and Pokemon#getStat
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-message', "Your mind is fucked.");
			this.add('-weather', 'Mindfuck', '[upkeep]');
			this.eachEvent('Weather');
		},
		onFieldEnd() {
			this.add('-fieldend', 'Mindfuck', '[silent]');
			this.add('-message', "Your mind got unfucked.");
		},
	},
	landslide: {
		name: 'Landslide',
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem('therock')) return 8;
			if (source.hasAbility('weathersetter')) return 0;
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
				this.add('-fieldstart', 'Landslide', '[from] ability: ' + effect.name, '[of] ' + source, '[silent]');
			} else {
				this.add('-fieldstart', 'Landslide', '[silent]');
			}
			this.add('-message', "A landslide started!");
			this.hint("In Landslide, Rock-types have 1.5x Defense and Rock moves gain 1 BP equal to each percent accuracy below 100%.");
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-message', "The landslide continues.");
			this.add('-weather', 'Landslide', '[upkeep]');
			this.eachEvent('Weather');
		},
		onFieldEnd() {
			this.add('-fieldend', 'Landslide', '[silent]');
			this.add('-message', "The landslide finished.");
		},
	},
	timewarp: {
		name: 'Time Warp',
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem('therock')) return 8;
			if (source.hasAbility('weathersetter')) return 0;
			return 5;
		},
		onModifyMove(move, pokemon) {
			const targetSide = pokemon.side.foe;
			if (this.field.pseudoWeather.timewarp && !move.flags['futuremove']) {
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
						if (source.hasAbility('secondimpact')) {
							if (!t.side.addSlotCondition(t, 'orbitalfuturemove')) return false;
							Object.assign(t.side.slotConditions[t.position]['orbitalfuturemove'],{
								duration: 3,
								move: moveData.id,
								source: source,
								moveData: moveData,
							});
							this.add('-message', `${source.name} foresaw two attacks!`);
						} else this.add('-message', `${source.name} foresaw an attack!`);
						return this.NOT_FAIL;
					}
				} 
				else if (['normal', 'any', 'allAdjacent', 'allAdjacentFoes'].includes(move.target) && !targetSide.slotConditions[pokemon.position]['futuremove']) {
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
						if (source.hasAbility('secondimpact')) {
							if (!t.side.addSlotCondition(t, 'orbitalfuturemove')) return false;
							Object.assign(t.side.slotConditions[t.position]['orbitalfuturemove'],{
								duration: 4,
								move: moveData.id,
								source: source,
								moveData: moveData,
							});
							this.add('-message', `${source.name} foresaw two attacks!`);
						} else this.add('-message', `${source.name} foresaw an attack!`);
						return this.NOT_FAIL;
					}
				}
			}
		},
		//max power steel moves implemented in moves.ts
		onFieldStart(field, source, effect) {
			if (effect?.effectType === 'Ability') {
				if (this.gen <= 5) this.effectState.duration = 0;
				this.add('-fieldstart', 'Time Warp', '[from] ability: ' + effect.name, '[of] ' + source, '[silent]');
			} else {
				this.add('-fieldstart', 'Time Warp', '[silent]');
			}
			this.add('-message', "Time warped!");
			this.hint("In Time Warp, every move will hit after 2 turns instead of immediately and Steel moves always have maximum power.");
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-message', "Time is warping.");
			this.add('-weather', 'Time Warp', '[upkeep]');
			this.eachEvent('Weather');
		},
		onFieldEnd() {
			this.add('-fieldend', 'Time Warp', '[silent]');
			this.add('-message', "Time went back to normal.");
		},
	},
	flashflood: {
		name: 'Flash Flood',
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem('therock')) return 8;
			if (source.hasAbility('weathersetter')) return 0;
			return 5;
		},
		onResidual(pokemon) {
			if(this.field.pseudoWeather.flashflood && this.randomChance(1, 4)) {
				if (this.runEvent('DragOut', pokemon, pokemon)) {
					this.add('-message', `The flash flood swept ${pokemon.name} away!`);
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
				this.add('-fieldstart', 'Flash Flood', '[from] ability: ' + effect.name, '[of] ' + source, '[silent]');
			} else {
				this.add('-fieldstart', 'Flash Flood', '[silent]');
			}
			this.add('-message', "A flash flood appeared!");
			this.hint("In Flash Flood, all Pokemon have a 25% chance to be forced out at the end of each turn and Water moves with 60 BP or less move first in their priority bracket.");
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-message', "The flash flood continues.");
			this.add('-weather', 'Flash Flood', '[upkeep]');
			this.eachEvent('Weather');
		},
		onFieldEnd() {
			this.add('-fieldend', 'Flash Flood', '[silent]');
			this.add('-message', "The flash flood stopped.");
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