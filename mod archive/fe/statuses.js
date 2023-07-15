'use strict';

/**@type {{[k: string]: EffectData}} */
let BattleStatuses = {
//         choicelock: {
//             inherit: true,
//             onBeforeMove(pokemon, target, move) {
//                 if (!(pokemon.getItem().isChoice || (pokemon.volatiles['goldentouch'] && pokemon.volatiles['goldentouch'].item && this.getItem(pokemon.volatiles['goldentouch'].item).isChoice) || (pokemon.volatiles['beastbootleg'] && ((pokemon.volatiles['beastbootleg'].items[0] && this.getItem(pokemon.volatiles['beastbootleg'].items[0]).isChoice) || (pokemon.volatiles['beastbootleg'].items[1] && this.getItem(pokemon.volatiles['beastbootleg'].items[1]).isChoice)))) || !pokemon.hasMove(this.effectData.move)) {
//                     pokemon.removeVolatile('choicelock');
//                     return;
//                 }
//                 if (move.id !== this.effectData.move && move.id !== 'struggle') {
//                     // Fails even if the Choice item is being ignored, and no PP is lost
//                     this.addMove('move', pokemon, move.name);
//                     this.attrLastMove('[still]');
//                     this.add('-fail', pokemon);
//                     return false;
//                 }
//             },
//             onDisableMove(pokemon) {
//                 if (!(pokemon.getItem().isChoice || (pokemon.volatiles['goldentouch'] && pokemon.volatiles['goldentouch'].item && pokemon.volatiles['goldentouch'].item.isChoice) || (pokemon.volatiles['beastbootleg'] && ((pokemon.volatiles['beastbootleg'].items[0] && pokemon.volatiles['beastbootleg'].items[0].isChoice) || (pokemon.volatiles['beastbootleg'].items[1] && pokemon.volatiles['beastbootleg'].items[1].isChoice)))) || !pokemon.hasMove(this.effectData.move)) {
//                     pokemon.removeVolatile('choicelock');
//                     return;
//                 }
//                 if (pokemon.ignoringItem()) {
//                     return;
//                 }
//                 let moves = pokemon.moveset;
//                 for (let i = 0; i < moves.length; i++) {
//                     if (moves[i].id !== this.effectData.move) {
//                         pokemon.disableMove(moves[i].id, false, this.effectData.sourceEffect);
//                     }
//                 }
//             },
//         },
	//Therapeutic and Shut Up and Jam allow movement under status at all times (excluding Sleep for the former).
	par: {
		name: 'par',
		id: 'par',
		num: 0,
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
			if (this.randomChance(1, 4) && !pokemon.hasAbility(['therapeutic', 'shutupandjam', 'antimatter'])) {
				this.add('cant', pokemon, 'par');
				return false;
			}
		},
	},
	frz: {
		name: 'frz',
		id: 'frz',
		num: 0,
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'frz', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'frz');
			}
			if (target.template.species === 'Shaymin-Sky' && target.baseTemplate.baseSpecies === 'Shaymin') {
				let template = this.getTemplate('Shaymin');
				target.formeChange(template);
				target.baseTemplate = template;
				target.setAbility(template.abilities['0'], null, true);
				target.baseAbility = target.ability;
				target.details = template.species + (target.level === 100 ? '' : ', L' + target.level) + (target.gender === '' ? '' : ', ' + target.gender) + (target.set.shiny ? ', shiny' : '');
				this.add('detailschange', target, target.details);
				this.add('-formechange', target, 'Shaymin', '[msg]');
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
			if (pokemon.hasAbility(['healingfat', 'therapeutic', 'shutupandjam', 'antimatter'])){
				return;
			}
			return false;
		},
		onModifyMove(move, pokemon) {
			if (move.flags['defrost']) {
				this.add('-curestatus', pokemon, 'frz', '[from] move: ' + move);
				pokemon.setStatus('');
			}
		},
		onHit(target, source, move) {
			if (move.thawsTarget || move.type === 'Fire' && move.category !== 'Status') {
				target.cureStatus();
			}
		},
	},
solarsnow: {
		name: 'SolarSnow',
		id: 'solarsnow',
		num: 0,
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source && (source.hasItem('icyrock') || source.hasItem('heatrock'))) {
				return 8;
			}
			return 5;
		},
		onWeatherModifyDamage(damage, attacker, defender, move) {
			if (move.type === 'Fire' && !(defender.hasType('Grass') || defender.hasType('Fire') || defender.hasType('Ice'))) {
				this.debug('Solar Snow fire boost');
				return this.chainModify(1.5);
			}
			if (move.type === 'Water') {
				this.debug('Solar Snow water suppress');
				return this.chainModify(0.5);
			}
		},
		onStart(battle, source, effect) {
			if (effect && effect.effectType === 'Ability') {
				if (this.gen <= 5) this.effectData.duration = 0;
				this.add('-weather', 'SolarSnow', '[from] ability: ' + effect, '[of] ' + source);
			} else {
				this.add('-weather', 'SolarSnow');
				this.add('SolarSnow');
			}
		},
		onResidualOrder: 1,
		onResidual() {
			this.add('-weather', 'SolarSnow', '[upkeep]');
			if (this.field.isWeather('solarsnow')) this.eachEvent('Weather');
		},
		onWeather(target) {
         if (!target.hasType('Grass') && !target.hasType('Fire') && !target.hasType('Ice')){
			  this.damage(target.maxhp / 16);
         }
		},
		onEnd() {
			this.add('-weather', 'none');
		},
	},

	desolateland: {
		name: 'DesolateLand',
		id: 'desolateland',
		num: 0,
		effectType: 'Weather',
		duration: 0,
		onTryMove(target, source, effect) {
			if (effect.type === 'Water' && effect.category !== 'Status' && (source.volatiles['weatherbreak'] || source.volatiles['atmosphericperversion']) && !(source.volatiles['weatherbreak'] && source.volatiles['atmosphericperversion'])) {
				this.debug('Desolate Land water suppress');
				this.add('-fail', source, effect, '[from] Desolate Land');
				return null;
			} else if (effect.type === 'Fire' && effect.category !== 'Status' && (source.volatiles['weatherbreak'] || source.volatiles['atmosphericperversion']) && !(source.volatiles['weatherbreak'] && source.volatiles['atmosphericperversion'])) {
				this.debug('Inverted Desolate Land fire suppress');
				this.add('-fail', source, effect, '[from] Desolate Land');
				return null;
			}
		},
		onWeatherModifyDamage(damage, attacker, defender, move) {
			if (move.type === 'Fire' && (attacker.volatiles['weatherbreak'] || attacker.volatiles['atmosphericperversion']) && !(attacker.volatiles['weatherbreak'] && attacker.volatiles['atmosphericperversion'])) {
				this.debug('Sunny Day fire boost');
				return this.chainModify(1.5);
			}
		},
		onStart(battle, source, effect) {
			this.add('-weather', 'DesolateLand', '[from] ability: ' + effect, '[of] ' + source);
		},
		onImmunity(type) {
			if (type === 'frz') return false;
		},
		onResidualOrder: 1,
		onResidual() {
			this.add('-weather', 'DesolateLand', '[upkeep]');
			this.eachEvent('Weather');
		},
		onEnd() {
			this.add('-weather', 'none');
		},
	},
	
	primordialsea: {
		name: 'PrimordialSea',
		id: 'primordialsea',
		num: 0,
		effectType: 'Weather',
		duration: 0,
		onTryMove(target, source, effect) {
			if (effect.type === 'Fire' && effect.category !== 'Status' && (source.volatiles['weatherbreak'] || source.volatiles['atmosphericperversion']) && !(source.volatiles['weatherbreak'] && source.volatiles['atmosphericperversion'])) {
				this.debug('Primordial Sea fire suppress');
				this.add('-fail', source, effect, '[from] Primordial Sea');
				return null;
			} else if (effect.type === 'Water' && effect.category !== 'Status' && (source.volatiles['weatherbreak'] || source.volatiles['atmosphericperversion']) && !(source.volatiles['weatherbreak'] && source.volatiles['atmosphericperversion'])) {
				this.debug('Inverted Primordial Sea water suppress');
				this.add('-fail', source, effect, '[from] Primordial Sea');
				return null;
			}
		},
		onWeatherModifyDamage(damage, attacker, defender, move) {
			if (move.type === 'Water' && (attacker.volatiles['weatherbreak'] || attacker.volatiles['atmosphericperversion']) && !(attacker.volatiles['weatherbreak'] && attacker.volatiles['atmosphericperversion'])) {
				this.debug('Rain water boost');
				return this.chainModify(1.5);
			}
		},
		onStart(battle, source, effect) {
			this.add('-weather', 'PrimordialSea', '[from] ability: ' + effect, '[of] ' + source);
		},
		onResidualOrder: 1,
		onResidual() {
			this.add('-weather', 'PrimordialSea', '[upkeep]');
			this.eachEvent('Weather');
		},
		onEnd() {
			this.add('-weather', 'none');
		},
	},
shadowdance: {
    name: 'ShadowDance',
    id: 'shadowdance',
    num: 0,
    effectType: 'Weather',
    duration: 5,
    durationCallback(source, effect) {
        if (source && (source.hasItem('damprock'))) {
            return 8;
        }
        return 5;
    },
    onWeatherModifyDamage(damage, attacker, defender, move) {
        if (move.type === 'Ghost') {
            this.debug('Spirit Storm ghost boost');
            return this.chainModify(1.5);
        }
    },
    onStart(battle, source, effect) {
        if (effect && effect.effectType === 'Ability') {
            if (this.gen <= 5) this.effectData.duration = 0;
            this.add('-weather', 'ShadowDance', '[from] ability: ' + effect, '[of] ' + source);
        } else {
            this.add('-weather', 'ShadowDance');
            this.add('ShadowDance');
        }
    },
    onResidualOrder: 1,
    onResidual() {
        this.add('-weather', 'ShadowDance', '[upkeep]');
        if (this.field.isWeather('shadowdance')) this.eachEvent('Weather');
    },
    onWeather(target) {
        if (!target.hasType('Water') && !target.hasType('Ghost')) {
            for (const moveSlot of target.moveSlots) {
					 if ((target.volatiles['atmosphericperversion'] && target.volatiles['weatherbreak']) || !(target.volatiles['atmosphericperversion'] || target.volatiles['weatherbreak'])){
          	       target.deductPP(moveSlot.id, 2)
					 } else {
						 moveSlot.pp++;
					 }
            }
        }
    },
    onEnd() {
        this.add('-weather', 'none');
    },
},
	
afterstorm: {
    name: 'Afterstorm',
    id: 'afterstorm',
    num: 0,
    effectType: 'Weather',
    duration: 5,
    durationCallback(source, effect) {
        return 5;
    },
	 onModifyDamagePriority: -2,
    onWeatherModifyDamage(damage, attacker, defender, move) {
			if (!(move.secondaries && move.isInInvertedWeather) && (move.secondaries || move.isInInvertedWeather)) {
            this.debug('Rainbow Sky suppress');
            return this.chainModify(0.5);
        } else {
            this.debug('Rainbow Sky boost');
            return this.chainModify(1.5);
        }
    },
	 onModifyMovePriority: -2,
	 onWeatherModifyMove(attacker, defender, move) {
			if (move.secondaries) {
				this.debug('doubling secondary chance');
				if (move.isInInvertedWeather) {
					delete move.secondaries;
				}else{
					for (const secondary of move.secondaries) {
						// @ts-ignore
						secondary.chance *= 2;
					}
				}
			}
	 },
    onStart(battle, source, effect) {
        if (effect && effect.effectType === 'Ability') {
            if (this.gen <= 5) this.effectData.duration = 0;
            this.add('-weather', 'Afterstorm', '[from] ability: ' + effect, '[of] ' + source);
        } else {
            this.add('-weather', 'Afterstorm');
            this.add('Afterstorm');
        }
    },
    onResidualOrder: 1,
    onResidual() {
        this.add('-weather', 'Afterstorm', '[upkeep]');
        if (this.field.isWeather('afterstorm')) this.eachEvent('Weather');
    },
    onEnd() {
        this.add('-weather', 'none');
    },
},
	cactuspower: {
		name: 'CactusPower',
		id: 'cactuspower',
		num: 0,
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source && source.hasItem('smoothrock')) {
				return 8;
			}
			return 5;
		},
		// This should be applied directly to the stat before any of the other modifiers are chained
		// So we give it increased priority.
		onModifySpDPriority: 10,
		onModifySpD(spd, pokemon) {
			if (pokemon.hasType(['Rock', 'Grass']) && this.field.isWeather('cactusforce')) {
				if ((pokemon.volatiles['atmosphericperversion'] && pokemon.volatiles['weatherbreak']) || !(pokemon.volatiles['atmosphericperversion'] || pokemon.volatiles['weatherbreak'])){
					return this.modify(spd, 1.5);
				}
				return this.modify(spd, [0x0AAB, 0x1000]);
			}
		},
		onStart(battle, source, effect) {
			if (effect && effect.effectType === 'Ability') {
				if (this.gen <= 5) this.effectData.duration = 0;
				this.add('-weather', 'CactusPower', '[from] ability: ' + effect, '[of] ' + source);
			} else {
				this.add('-weather', 'CactusPower');
			}
		},
		onResidualOrder: 1,
		onResidual() {
			this.add('-weather', 'CactusPower', '[upkeep]');
			if (this.field.isWeather('cactuspower')) this.eachEvent('Weather');
		},
		onWeather(target) {
			this.damage(target.maxhp / 16);
		},
		onEnd() {
			this.add('-weather', 'none');
		},
	},
	yeti: {
		name: 'Yeti',
		id: 'yeti',
		num: 0,
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source && (source.hasItem('icyrock') || source.hasItem('smoothrock'))) {
				return 8;
			}
			return 5;
		},
		// This should be applied directly to the stat before any of the other modifiers are chained
		// So we give it increased priority.
		onModifyDefPriority: 10,
		onModifyDef(def, pokemon) {
			if (pokemon.hasType('Ice') && this.field.isWeather('yeti')) {
				return this.modify(def, 1.5);
			}
		},
		onModifySpDPriority: 10,
		onModifySpD(spd, pokemon) {
			if (pokemon.hasType('Rock') && this.field.isWeather('yeti')) {
				return this.modify(spd, 1.5);
			}
		},
		onStart(battle, source, effect) {
			if (effect && effect.effectType === 'Ability') {
				if (this.gen <= 5) this.effectData.duration = 0;
				this.add('-weather', 'Yeti', '[from] ability: ' + effect, '[of] ' + source);
			} else {
				this.add('-weather', 'Yeti');
			}
		},
		onResidualOrder: 1,
		onResidual() {
			this.add('-weather', 'Yeti', '[upkeep]');
			if (this.field.isWeather('yeti')) this.eachEvent('Weather');
		},
		onWeather(target) {
			if (!target.hasType(['Rock', 'Ground', 'Steel', 'Ice']))	this.damage(target.maxhp / 8);
		},
		onEnd() {
			this.add('-weather', 'none');
		},
	},
	titanicstrength: {
		name: 'TitanicStrength',
		id: 'titanicstrength',
		num: 0,
		duration: 1,
			onUpdate(pokemon) {
				if (!pokemon.item && pokemon.volatiles['titanicstrength']) {
				this.add('-start', pokemon, 'ability: Titanic Strength', '[silent]');
				this.boost({atk: 12}, pokemon);
				pokemon.removeVolatile('titanicstrength');
				}
			},
	},
		flashweatherice: {
			name: 'flashweatherice',
			id: 'flashweatherice',
			num: 0,
			noCopy: true, // doesn't get copied by Baton Pass
			onStart(target) {
				this.add('-start', target, 'ability: Flash Weather');
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, attacker, defender, move) {
				if (move.type === 'Ice') {
					this.debug('Flash Ice boost');
					return this.chainModify(1.5);
				}
			},
			onModifySpAPriority: 5,
			onModifySpA(atk, attacker, defender, move) {
				if (move.type === 'Ice') {
					this.debug('Flash Ice boost');
					return this.chainModify(1.5);
				}
			},
			onEnd(target) {
				this.add('-end', target, 'ability: Flash Weather', '[silent]');
			},
		},
		flashweatherrock: {
			name: 'flashweatherrock',
			id: 'flashweatherrock',
			num: 0,
			noCopy: true, // doesn't get copied by Baton Pass
			onStart(target) {
				this.add('-start', target, 'ability: Flash Weather');
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, attacker, defender, move) {
				if (move.type === 'Rock') {
					this.debug('Flash Rock boost');
					return this.chainModify(1.5);
				}
			},
			onModifySpAPriority: 5,
			onModifySpA(atk, attacker, defender, move) {
				if (move.type === 'Rock') {
					this.debug('Flash Rock boost');
					return this.chainModify(1.5);
				}
			},
			onEnd(target) {
				this.add('-end', target, 'ability: Flash Weather', '[silent]');
			},
		},
		flashweatherghost: {
			name: 'flashweatherghost',
			id: 'flashweatherghost',
			num: 0,
			noCopy: true, // doesn't get copied by Baton Pass
			onStart(target) {
				this.add('-start', target, 'ability: Flash Weather');
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, attacker, defender, move) {
				if (move.type === 'Ghost') {
					this.debug('Flash Ghost boost');
					return this.chainModify(1.5);
				}
			},
			onModifySpAPriority: 5,
			onModifySpA(atk, attacker, defender, move) {
				if (move.type === 'Ghost') {
					this.debug('Flash Ghost boost');
					return this.chainModify(1.5);
				}
			},
			onEnd(target) {
				this.add('-end', target, 'ability: Flash Weather', '[silent]');
			},
		},
		flashweathergrass: {
			name: 'flashweathergrass',
			id: 'flashweathergrass',
			num: 0,
			noCopy: true, // doesn't get copied by Baton Pass
			onStart(target) {
				this.add('-start', target, 'ability: Flash Weather');
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, attacker, defender, move) {
				if (move.type === 'Grass') {
					this.debug('Flash Grass boost');
					return this.chainModify(1.5);
				}
			},
			onModifySpAPriority: 5,
			onModifySpA(atk, attacker, defender, move) {
				if (move.type === 'Grass') {
					this.debug('Flash Grass boost');
					return this.chainModify(1.5);
				}
			},
			onEnd(target) {
				this.add('-end', target, 'ability: Flash Weather', '[silent]');
			},
		},
	vitality: {
		name: 'Vitality',
		id: 'vitality',
		num: 7500209,
		onSwitchInPriority: 101,
		onSwitchIn(pokemon) {
			let type = 'Normal';
			if (pokemon.ability === 'rkssystem') {
				// @ts-ignore
				type = pokemon.getItem().onMemory;
				// @ts-ignore
				if (!type || type === true) {
					type = 'Normal';
				}
			}
			if (type === 'Fire'){
				pokemon.setType('Fire', true);
			} else {
				pokemon.setType([type, 'Fire'], true);
			}
		},
	},
	omneus: {
		name: 'Omneus',
		id: 'omneus',
		num: 7500255,
		onSwitchInPriority: 101,
		onSwitchIn(pokemon) {
			let type = 'Normal';
			if (pokemon.ability === 'spiralpower') {
				// @ts-ignore
				type = pokemon.getItem().onPlate;
				// @ts-ignore
				if (!type || type === true) {
					type = 'Normal';
				}
			}
			if (type === 'Water'){
				pokemon.setType('Water', true);
			} else {
				pokemon.setType(['Water', type], true);
			}
		},
	},
	valcro: {
		name: 'Valcro',
		id: 'valcro',
		num: 7500216,
		onSwitchInPriority: 101,
		onSwitchIn(pokemon) {
			let type = 'Normal';
			if (pokemon.ability === 'techequip') {
				// @ts-ignore
				type = pokemon.getItem().onMemory;
				// @ts-ignore
				if (!pokemon.getItem().onMemory) {
					type = 'Normal';
				}
			}
			if (type === 'Flying'){
				pokemon.setType('Flying', true);
			} else {
				pokemon.setType([type, 'Flying'], true);
			}
		},
		onTryHit(target, source, move) {
			let type = 'Normal';
			type = target.getItem().onMemory;
			if (target !== source && move.type === type) {
					this.add('-immune', target, '[msg]', '[from] ability: Tech Equip');
				return null;
			}
		},
	},
	smelly: {
		name: 'Smelly',
		id: 'smelly',
		num: 7500217,
		onSwitchInPriority: 101,
		onSwitchIn(pokemon) {
			let type = 'Normal';
			if (pokemon.ability === 'technicalsystem') {
				// @ts-ignore
				type = pokemon.getItem().onMemory;
				// @ts-ignore
				if (!type || type === true) {
					type = 'Normal';
				}
			}
			pokemon.setType(type, true);
		},
	},
	covally: {
		name: 'Covally',
		id: 'covally',
		num: 7500243,
		onSwitchInPriority: 101,
		onSwitchIn(pokemon) {
			let type = 'Normal';
			if (pokemon.ability === 'triagesystem') {
				// @ts-ignore
				type = pokemon.getItem().onMemory;
				// @ts-ignore
				if (!type || type === true) {
					type = 'Normal';
				}
			}
			if (type === 'Fairy'){
				pokemon.setType('Fairy', true);
			} else {
				pokemon.setType([type, 'Fairy'], true);
			}
		},
		onModifyPriority(priority, pokemon, target, move) {
			let type = 'Normal';
			if (pokemon.ability === 'triagesystem') {
				// @ts-ignore
				type = pokemon.getItem().onMemory;
				// @ts-ignore
				if (!type || type === true) {
					type = 'Normal';
				}
			}
			if (move && (move.type === type)) return priority + 3;
		},
	},
};

exports.BattleStatuses = BattleStatuses;
