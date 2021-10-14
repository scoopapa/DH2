'use strict';

exports.BattleAbilities = {
	"iboopu": {
		shortDesc: "Sets up desolate land and rocks upon entering field.",
		onStart: function (source) {
			this.field.setWeather('desolateland');
			this.useMove('Stealth Rock', source);
		},
		onAnySetWeather: function (target, source, weather) {
			if (this.field.getWeather().id === 'desolateland' && !['desolateland', 'primordialsea', 'deltastream'].includes(weather.id)) return false;
		},
		onEnd: function (pokemon) {
			if (this.field.weatherData.source !== pokemon) return;
			for (const side of this.sides) {
				for (const target of side.active) {
					if (target === pokemon) continue;
					if (target && target.hp && target.hasAbility(['desolateland', 'iboopu'])) {
						this.field.weatherData.source = target;
						return;
					}
				}
			}
			this.field.clearWeather();
		},
		id: "iboopu",
		name: "IBoopU",
		rating: 5,
	},
	"noone": {
		shortDesc: "Nullifies all abilities on field.",
		onStart: function(pokemon) {
			for (const target of pokemon.side.foe.active) {
				if (!target || target.fainted) continue;
				target.addVolatile('gastroacid');
			}
		},
		onUpdate: function(pokemon) {
			for (const target of pokemon.side.foe.active) {
				if (!target || target.fainted) continue;
				target.addVolatile('gastroacid');
			}
		},
		id: "noone",
		name: "No one",
	},
	"halt": {
		desc: "Applies ingrain and Aqua ring on switch-in, traps opponent + unaware",
		shortDesc: "Applies ingrain and Aqua ring on switch-in, traps opponent + unaware.",
		onFoeTrapPokemon: function (pokemon) {
			if (this.isAdjacent(pokemon, this.effectData.target)) {
				pokemon.tryTrap(true);
			}
		},
		onFoeMaybeTrapPokemon: function (pokemon, source) {
			if (!source) source = this.effectData.target;
			pokemon.maybeTrapped = true;
		},
		onAnyModifyBoost: function (boosts, target) {
			let source = this.effectData.target;
			if (source === target) return;
			if (source === this.activePokemon && target === this.activeTarget) {
				boosts['def'] = 0;
				boosts['spd'] = 0;
				boosts['evasion'] = 0;
			}
			if (target === this.activePokemon && source === this.activeTarget) {
				boosts['atk'] = 0;
				boosts['spa'] = 0;
				boosts['accuracy'] = 0;
			}
		},
		onStart: function (pokemon) {
				this.add('-start', pokemon, 'Ingrain');
				pokemon.addVolatile('ingrain');
				this.add('-start', pokemon, 'Aqua Ring');
				pokemon.addVolatile('aquaring');
		},
		id: "halt",
		name: "Halt!",
	},
	"bruteforce": {
		shortDesc: "Combo of a lot of abilities",
		/*onModifyMove: function (move) {
			move.stab = 1.75;
		},*/
		onSourceModifyDamage: function (damage, source, target, move) {
			if (target.hp >= target.maxhp) {
				this.debug('Brute Force weaken');
				return this.chainModify(0.8);
			}
		},
		onTryHit: function (pokemon, target, move) {
			if (move.ohko) {
				this.add('-immune', pokemon, '[msg]', '[from] ability: Sturdy');
				return null;
			}
		},
		onDamagePriority: -100,
		onDamage: function (damage, target, source, effect) {
			if (target.hp === target.maxhp && damage >= target.hp && effect && effect.effectType === 'Move') {
				this.add('-ability', target, 'Sturdy');
				return target.hp - 1;
			}
		},
		onBasePowerPriority: 8,
		onBasePower: function (basePower, attacker, defender, move) {
			if (move.flags['punch']) {
				this.debug('Iron Fist boost');
				return this.chainModify([0x1333, 0x1000]);
			}
		},/*
		onModifyAtkPriority: 5,
		onModifyAtk: function (atk, attacker, defender, move) {
			if (move.type === 'Steel') {
				this.debug('Steelworker boost');
				return this.chainModify(1.33);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA: function (atk, attacker, defender, move) {
			if (move.type === 'Steel') {
				this.debug('Steelworker boost');
				return this.chainModify(1.33);
			}
		},*/
		onUpdate: function (pokemon) {
			if (pokemon.status === 'slp') {
				this.add('-activate', pokemon, 'ability: Insomnia');
				pokemon.cureStatus();
			}
		},
		onSetStatus: function (status, target, source, effect) {
			if (status.id !== 'slp') return;
			if (!effect || !effect.status) return false;
			this.add('-immune', target, '[msg]', '[from] ability: Insomnia');
			return false;
		},
		onAfterEachBoost: function (boost, target, source) {
			if (!source || target.side === source.side) {
				return;
			}
			let statsLowered = false;
			for (let i in boost) {
				if (boost[i] < 0) {
					statsLowered = true;
				}
			}
			if (statsLowered) {
				this.boost({atk: 2}, target, target, null, true);
			}
		},
		isUnbreakable: true,
		id: "bruteforce",
		name: "Brute Force",
		rating: 4,
		num: 91,
	},
	
	"supremeshield": {
		shortDesc: "Halves the damage of all supereffective moves.",
		onSourceModifyDamage: function (damage, source, target, move) {
			if (move.typeMod > 0) {
				return this.chainModify(0.5);
			}
		},
		id: "supremeshield",
		name: "Supreme Shield",
	},
	"warpstarcrusader": {
		name:"Warpstar Crusader",
		id: "warpstarcrusader",
		shortDesc: "Increases damage by 50% + decreases incoming damage by 75% + Magic Guard + Unaware. Cannot be bypassed",
		desc: "Increases damage by 50% + decreases incoming damage by 75% + Magic Guard + Unaware + Immune to burn. Cannot be bypassed",
		onBasePower: function (basePower, attacker, defender, move) {
				return this.chainModify(1.2);
		},
		onDamage: function (damage, target, source, effect) {
			if (effect.id === 'recoil' && this.activeMove.id !== 'struggle') return null;
		},
		onUpdate: function (pokemon) {
			if (pokemon.status === 'brn') {
				this.add('-activate', pokemon, 'ability: Warpstar Crusader');
				pokemon.cureStatus();
			}
		},
		onSetStatus: function (status, target, source, effect) {
			if (status.id !== 'brn') return;
			if (!effect || !effect.status) return false;
			this.add('-immune', target, '[msg]', '[from] ability: Warpstar Crusader');
			return false;
		},
		onDamage: function (damage, target, source, effect) {
			if (effect.effectType !== 'Move') {
				return false;
			}
		},
		onModifyAtkPriority: 6,
		onSourceModifyAtk: function (atk, attacker, defender, move) {
				this.debug('Warpstar Crusader weaken');
				return this.chainModify(0.5);
		},
		onModifySpAPriority: 5,
		onSourceModifySpA: function (atk, attacker, defender, move) {
				this.debug('Warpstar Crusader weaken');
				return this.chainModify(0.5);
		},
		onAnyModifyBoost: function (boosts, target) {
			let source = this.effectData.target;
			if (source === target) return;
			if (source === this.activePokemon && target === this.activeTarget) {
				boosts['def'] = 0;
				boosts['spd'] = 0;
				boosts['evasion'] = 0;
			}
			if (target === this.activePokemon && source === this.activeTarget) {
				boosts['atk'] = 0;
				boosts['spa'] = 0;
				boosts['accuracy'] = 0;
			}
		},
		isUnbreakable: true,
	},
	"punishmentprize": {
		desc: "If this Pokemon is Zap, it transforms into Zap-Pineapple after knocking out a Pokemon.",
		shortDesc: "After KOing a Pokemon: becomes Zap-Pineapple. +1 all stats.",
		onSourceFaint: function (target, source, effect) {
			if (effect && effect.effectType === 'Move' && source.template.speciesid === 'scrafty' && source.hp && !source.transformed && source.side.foe.pokemonLeft) {
				this.add('-activate', source, 'ability: Punishment Prize');
				let template = this.getTemplate('Zapmaster-Pineapple');
				source.formeChange(template);
				source.baseTemplate = template;
				source.details = template.species + (source.level === 100 ? '' : ', L' + source.level) + (source.gender === '' ? '' : ', ' + source.gender) + (source.set.shiny ? ', shiny' : '');
				this.add('detailschange', source, source.details);
			}
		},
		
		id: "punishmentprize",
		name: "Punishment Prize",
		rating: 3,
		num: 210,
	},
	"wildfire": {
		name:"Wildfire",
		id: "wildfire",
		shortDesc: "Raises all stats 1 stage at the end of each turn. Fire moves deal 1.5 damage.",
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual: function (pokemon) {
			if (pokemon.activeTurns) {
				this.boost({spa: 1, spd: 1, spe: 1, accuracy: 1});
			}
		},	
		onModifyAtkPriority: 5,
		onModifyAtk: function (atk, attacker, defender, move) {
			if (move.type === 'Fire') {
				this.debug('Wildfire boost');
				return this.chainModify(1.2);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA: function (atk, attacker, defender, move) {
			if (move.type === 'Fire') {
				this.debug('Wildfire boost');
				return this.chainModify(1.2);
			}
		},
	},
	"thicctoxicity": {
		name:"Thicc Toxicity",
		id: "thicctoxicity",
		shortDesc: "Poison Heal + Half Damage from SE hits + heals 1/3 max HP when hit by Fighting moves; Fighting immunity.",
		onDamagePriority: 1,
		onDamage: function (damage, target, source, effect) {
			if (effect.id === 'psn' || effect.id === 'tox') {
				this.heal(target.maxhp / 8);
				return false;
			}
		},
		onSourceModifyDamage: function (damage, source, target, move) {
			if (move.typeMod > 0) {
				this.debug('Thicc Toxicity neutralize');
				return this.chainModify(0.5);
			}
		},
		onTryHit: function (target, source, move) {
			if (target !== source && move.type === 'Fighting') {
				if (!this.heal(target.maxhp / 3)) {
					this.add('-immune', target, '[msg]', '[from] ability: Thicc Toxicity');
				}
				return null;
			}
		},
	},
	"extremeintimidate": { /* Fix this On switchin --> Haze --> Lower all of th foe's stats by one*/
		name:"Extreme Intimidate",
		id:"extremeintimidate",
		onStart: function (pokemon) {
			this.add('-clearallboost');
			for (let i = 0; i < this.sides.length; i++) {
				for (let j = 0; j < this.sides[i].active.length; j++) {
					if (this.sides[i].active[j] && this.sides[i].active[j].isActive) this.sides[i].active[j].clearBoosts();
				}
			}
			let foeactive = pokemon.side.foe.active;
			let activated = false;
			for (let i = 0; i < foeactive.length; i++) {
				if (!foeactive[i] || !this.isAdjacent(foeactive[i], pokemon)) continue;
				if (!activated) {
					this.add('-ability', pokemon, 'Extreme Intimidate', 'boost');
					activated = true;
				}
				if (foeactive[i].volatiles['substitute']) {
					this.add('-immune', foeactive[i], '[msg]');
				} else {
					this.boost({atk: -1, def: -1, spa: -1, spd: -1, spe: -1}, foeactive[i], pokemon);
				}
			}
		},
	},
	"rawr": {
		shortDesc: "Thick Fat + Clear Body",
		onStart: function(pokemon) {
			this.add('-ability', pokemon, 'Rawr');
			this.add('-formechange', pokemon, 'Sharpedo-Mega', '[msg]');
			this.add('-formechange', pokemon, 'Absol-Mega', '[msg]');
			this.add('-formechange', pokemon, 'Zygarde-Complete', '[msg]');
			pokemon.formeChange("Zygarde-Complete");
		},
		onSourceModifyAtk: function (atk, attacker, defender, move) {
			if (move.type === 'Ice' || move.type === 'Fire') {
				this.debug('Rawr weaken');
				return this.chainModify(0.5);
			}
		},
		onModifySpAPriority: 5,
		onSourceModifySpA: function (atk, attacker, defender, move) {
			if (move.type === 'Ice' || move.type === 'Fire') {
				this.debug('Rawr weaken');
				return this.chainModify(0.5);
			}
		},
		onBoost: function (boost, target, source, effect) {
			if (source && target === source) return;
			let showMsg = false;
			for (let i in boost) {
				if (boost[i] < 0) {
					delete boost[i];
					showMsg = true;
				}
			}
			if (showMsg && !effect.secondaries) this.add("-fail", target, "unboost", "[from] ability: Rawr", "[of] " + target);
		},
		name:"Rawr",
		id:"rawr",
	},
	"contraryplusplus": {
		onModifyMove: function(move, pokemon) {
			move.ignoreAbility = true;
		},
		onBoost: function (boost, target, source, effect) {
			if (effect && effect.id === 'zpower') return;
			for (let i in boost) {
				boost[i] *= -1;
			}
		},
		shortDesc: 'Contrary + Mold breaker.',
		desc: 'Contrary + Mold breaker.',
		id: "contraryplusplus",
		name: "Contrary Plus Plus",
	},
	"ultratechnical": {
		onBasePowerPriority: 8,
		onBasePower: function (basePower, attacker, defender, move) {
			if (basePower <= 90) {
				this.debug('Technician boost');
				return this.chainModify(1.5);
			}
		},
		id: "ultratechnical",
		name: "Ultra Technical",
	},
	"dankzone": {
		shortDesc: "Truggets Grassy Terrain, Sunny Day and Trick Room on switch in",
		onStart: function(pokemon) {
			this.add('-ability', pokemon, 'Dank Zone');
			this.field.addPseudoWeather('trickroom', pokemon);
			this.field.setWeather('sunnyday');
			this.field.setTerrain('grassyterrain');
		},
		name: 'Dank Zone',
		id: 'dankzone',
	},
	"staticboost": {
		shortDesc: "+1 in all stats upon switch in",
		onStart: function (pokemon) {
			this.add('-ability', pokemon, 'Static Boost');
			this.boost({atk:1, def:1, spa:1, spd:1, spe:1, accuracy:2});
		},
		id:'staticboost',
		name:'Static Boost',
	},
	"phantomguard": {
		shortDesc: "This Pokemon can only be damaged by supereffective moves and indirect damage.",
		onStart: function (pokemon) {
			this.boost({def:3});
		},
		onTryHit: function (target, source, move) {
			if (target.runEffectiveness(move) = 1) {
				this.add('-immune', target, '[msg]', '[from] ability: Phantom Guard');
				return null;
			}
		},
		id: "phantomguard",
		name: "Phantom Guard",
		rating: 5,
		num: 25,
	},
	"waterchange": {
			shortDesc: "If user is Elcrest and Rain Dance is active, it changes to Gyarados and it and allies' Attack and Speed are 1.5x.",
			onStart: function (pokemon) {
			delete this.effectData.forme;
		},
		onUpdate: function (pokemon) {
			if (!pokemon.isActive || pokemon.baseTemplate.speciesid !== 'dratini') return;
			if (this.field.isWeather(['raindance', 'primordialsea'])) {
				if (pokemon.template.speciesid !== 'gyarados') {
					pokemon.formeChange('Gyarados');
					this.add('-formechange', pokemon, 'Gyarados', '[msg]');
				}
			} else {
				if (pokemon.template.speciesid === 'gyarados') {
					pokemon.formeChange('Dratini');
					this.add('-formechange', pokemon, 'Dratini', '[msg]');
				}
			}
		},
		onModifyAtkPriority: 3,
		onAllyModifyAtk: function (atk) {
			if (this.effectData.target.baseTemplate.speciesid !== 'dratini') return;
			if (this.field.isWeather(['raindance', 'primordialsea'])) {
				return this.chainModify(1.5);
			}
		},
		onModifySpDPriority: 4,
		onAllyModifySpD: function (spe) {
			if (this.effectData.target.baseTemplate.speciesid !== 'dratini') return;
			if (this.field.isWeather(['raindance', 'primordialsea'])) {
				return this.chainModify(1.5);
			}
		},
		id: "waterchange",
		name: "Water Change",
                },
   "russianwinter": {
		onStart: function (source) {
			this.field.setWeather('russianwinter');
		},
		onAnySetWeather: function (target, source, weather) {
			if (this.field.getWeather().id === 'russianwinter' && !(weather.id in {desolateland:1, primordialsea:1, deltastream:1})) return false;
		},
		onEnd: function (pokemon) {
			if (this.field.weatherData.source !== pokemon) return;
			for (let i = 0; i < this.sides.length; i++) {
				for (let j = 0; j < this.sides[i].active.length; j++) {
					let target = this.sides[i].active[j];
					if (target === pokemon) continue;
					if (target && target.hp && target.hasAbility('russianwinter')) {
						this.field.weatherData.source = target;
						return;
					}
				}
			}
			this.field.clearWeather();
		},
		id: "russianwinter",
		name: "Russian Winter",
	},
        "flairhax": {
		shortDesc: "Serene Grace and Protean with +2 Speed on switch in",
		onModifyMovePriority: -2,
		onModifyMove: function (move) {
			if (move.secondaries) {
				this.debug('doubling secondary chance');
				for (let i = 0; i < move.secondaries.length; i++) {
					move.secondaries[i].chance *= 2.2;
				}
			}
		},
                onStart: function (pokemon) {
			this.boost({spe:2});
		},
                onPrepareHit: function (source, target, move) {
			if (move.hasBounced) return;
			let type = move.type;
			if (type && type !== '???' && source.getTypes().join() !== type) {
				if (!source.setType(type)) return;
				this.add('-start', source, 'typechange', type, '[from] Flair Hax');
			}
		},
		id: "flairhax",
		name: "Flair Hax",
	},
	pressurebreaker: {
		shortDesc: "Pressure + Mold Breaker",
		onStart: function (pokemon) {
			this.add('-ability', pokemon, 'Pressure');
			this.add('-ability', pokemon, 'Mold Breaker');
		},
		onDeductPP: function (target, source) {
			if (target.side === source.side) return;
			return 1;
		},
		onModifyMove: function(move, pokemon) {
			move.ignoreAbility = true;
		},
		id: "pressurebreaker",
		name: "Pressure Breaker",
		rating: 1.5,
	},
	flameguard: {
		onTryHit: function (target, source, move) {
			if (target !== source && move.type === 'Fire') {
				move.accuracy = true;
				if (!target.addVolatile('flashfire')) {
					this.add('-immune', target, '[msg]', '[from] ability: Flame Guard');
				}
				return null;
			}
		},
		onEnd: function (pokemon) {
			pokemon.removeVolatile('flashfire');
		},
		effect: {
			noCopy: true, // doesn't get copied by Baton Pass
			onStart: function (target) {
				this.add('-start', target, 'ability: Flash Fire');
			},
			onModifyAtkPriority: 5,
			onModifyAtk: function (atk, attacker, defender, move) {
				if (move.type === 'Fire') {
					this.debug('Flash Fire boost');
					return this.chainModify(1.5);
				}
			},
			onModifySpAPriority: 5,
			onModifySpA: function (atk, attacker, defender, move) {
				if (move.type === 'Fire') {
					this.debug('Flash Fire boost');
					return this.chainModify(1.5);
				}
			},
			onEnd: function (target) {
				this.add('-end', target, 'ability: Flame Guard', '[silent]');
			},
		},
		onDamage: function (damage, target, source, effect) {
			if (effect.effectType !== 'Move') {
				return false;
			}
		},
		onAfterDamage: function (damage, target, source, effect) {
			if (effect && effect.type === 'Fire') {
				this.add('-setboost', target, 'atk', 12, '[from] ability: Flame Guard');
			}
		},
		id: "flameguard",
		name: "Flame Guard",
	},
	breakthrough: {
		shortDesc: "This Pokemon's moves ignores type immunities",
		onModifyMovePriority: -5,
		onModifyMove: function (move) {
			if (!move.ignoreImmunity) move.ignoreImmunity = {};
			if (move.ignoreImmunity !== true) {
				move.ignoreImmunity['Fighting'] = true;
				move.ignoreImmunity['Normal'] = true;
                                move.ignoreImmunity['Dragon'] = true;
				move.ignoreImmunity['Electric'] = true;
                                move.ignoreImmunity['Ground'] = true;
                                move.ignoreImmunity['Psychic'] = true;
                                move.ignoreImmunity['Poison'] = true;
                                move.ignoreImmunity['Ghost'] = true;
                                move.ignoreImmunity['Water'] = true;
                                move.ignoreImmunity['Fire'] = true;
                                move.ignoreImmunity['Grass'] = true;
                                move.ignoreImmunity['Fairy'] = true;
                                move.ignoreImmunity['Bug'] = true;
                        }
		},
		id: "breakthrough",
		name: "Breakthrough",
		rating: 3,
	},
	toughbounce: {
		shortDesc: "Tough Claws + Magic Bounce + Own Tempo",
	        onBasePowerPriority: 8,
		onBasePower: function (basePower, attacker, defender, move) {
			if (move.flags['contact']) {
				return this.chainModify([0x14CD, 0x1000]);
			}
		},
		onTryHitPriority: 1,
		onTryHit: function (target, source, move) {
			if (target === source || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			let newMove = this.getMoveCopy(move.id);
			newMove.hasBounced = true;
			this.useMove(newMove, target, source);
			return null;
		},
		onAllyTryHitSide: function (target, source, move) {
			if (target.side === source.side || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			let newMove = this.getMoveCopy(move.id);
			newMove.hasBounced = true;
			this.useMove(newMove, this.effectData.target, source);
			return null;
		},
		effect: {
			duration: 1,
		},
		onUpdate: function (pokemon) {
			if (pokemon.volatiles['confusion']) {
				this.add('-activate', pokemon, 'ability: Own Tempo');
				pokemon.removeVolatile('confusion');
			}
		},
		onTryAddVolatile: function (status, pokemon) {
			if (status.id === 'confusion') return null;
		},
		onHit: function (target, source, move) {
			if (move && move.volatileStatus === 'confusion') {
				this.add('-immune', target, 'confusion', '[from] ability: Own Tempo');
			}
		},
		id: "toughbounce",
		name: "Tough Bounce",
		rating: 5,
	},
	breakingpoint: {
		shortDesc: "Shadow Tag + No Guard",
		onFoeTrapPokemon: function (pokemon) {
			if ((!pokemon.hasAbility('shadowtag')&&!pokemon.hasAbility('breakingpoint')) && this.isAdjacent(pokemon, this.effectData.target)) {
				pokemon.tryTrap(true);
			}
		},
		onFoeMaybeTrapPokemon: function (pokemon, source) {
			if (!source) source = this.effectData.target;
			if ((!pokemon.hasAbility('shadowtag')&&!pokemon.hasAbility('breakingpoint')) && this.isAdjacent(pokemon, source)) {
				pokemon.maybeTrapped = true;
			}
		},
		onAnyAccuracy: function (accuracy, target, source, move) {
			if (move && (source === this.effectData.target || target === this.effectData.target)) {
				return true;
			}
			return accuracy;
		},
		id: "breakingpoint",
		name: "Breaking Point",
		rating: 2,
	},
	"theunderlord": {
		shortDesc: "Flame Body + changes type to resist the opposing Pokemon's last attack.",
		onAfterDamage: function (damage, target, source, move) {
			if (move && move.flags['contact']) {
				if (parseInt(this.random(10)) == 7) {
					source.trySetStatus('brn', target);
				}
			}
		},
		onAfterMoveSecondary: function (target, source, move) {
			if (!target.lastMove) {
				return false;
			}
			let possibleTypes = [];
			let attackType = this.getMove(target.lastMove).type;
			for (let type in this.data.TypeChart) {
				if (source.hasType(type) || target.hasType(type)) continue;
				let typeCheck = this.data.TypeChart[type].damageTaken[attackType];
				if (typeCheck === 2 || typeCheck === 3) {
					possibleTypes.push(type);
				}
			}
			if (!possibleTypes.length) {
				return false;
			}
			let randomType = possibleTypes[this.random(possibleTypes.length)];
			target.types = [].push(randomType);
			this.add('-start', target, 'typechange', randomType);
		},
		onSwitchOut: function(pokemon) {
			pokemon.types = pokemon.baseTemplate.types;
		},
		id: "theunderlord",
		name: "The Underlord",
	},
	epicclaws: {
		shortDesc: "Tough Claws + Magic Bounce + Insomnia + Serene Grace",
		onModifyAtkPriority: 5,
		onModifyAtk: function (atk) {
			return this.chainModify(1.5);
		},
		onTryHitPriority: 1,
		onTryHit: function (target, source, move) {
			if (target === source || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			let newMove = this.getMoveCopy(move.id);
			newMove.hasBounced = true;
			
			this.useMove(newMove, target, source);
			return null;
		},
		onAllyTryHitSide: function (target, source, move) {
			if (target.side === source.side || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			let newMove = this.getMoveCopy(move.id);
			newMove.hasBounced = true;
			this.useMove(newMove, this.effectData.target, source);
			return null;
		},
		onBasePowerPriority: 8,
		onBasePower: function (basePower, attacker, defender, move) {
			if (move.flags['contact']) {
				return this.chainModify([0x14CD, 0x1000]);
			}
		},
		effect: {
			duration: 1,
		},
		onModifyMovePriority: -2,
		onModifyMove: function (move) {
			if (move.secondaries) {
				this.debug('doubling secondary chance');
				for (let i = 0; i < move.secondaries.length; i++) {
					move.secondaries[i].chance *= 2;
				}
			}
		},
		onUpdate: function (pokemon) {
			if (pokemon.status === 'slp') {
				this.add('Sleep is for the weak');
				pokemon.cureStatus();
			}
		},
		onSetStatus: function (status, target, source, effect) {
			if (status.id !== 'slp') return;
			if (!effect || !effect.status) return false;
			this.add('Sleep is for the weak');
			return false;
		},
		id: "epicclaws",
		name: "Epic Claws",
		rating: 2,
	},
	wonderbreaker: {
		onBoost: function (boost, target, source, effect) {
			if (source && target === source) return;
			let showMsg = false;
			for (let i in boost) {
				if (boost[i] < 0) {
					delete boost[i];
					showMsg = true;
				}
			}
			if (showMsg && !effect.secondaries) this.add("-fail", target, "unboost", "[from] ability: Wonder Breaker", "[of] " + target);
		},
		onStart: function (pokemon) {
			this.add('-ability', pokemon, 'Wonder Breaker');
		},
		onModifyMove: function(move, pokemon) {
			move.ignoreAbility = true;
		},
		onAnyModifyBoost: function (boosts, target) {
			let source = this.effectData.target;
			if (source === target) return;
			if (source === this.activePokemon && target === this.activeTarget) {
				boosts['def'] = 0;
				boosts['spd'] = 0;
				boosts['evasion'] = 0;
			}
			if (target === this.activePokemon && source === this.activeTarget) {
				boosts['atk'] = 0;
				boosts['spa'] = 0;
				boosts['accuracy'] = 0;
			}
		},
		id: "wonderbreaker",
		name: "Wonder Breaker",
	},
	magicclaws:{
		onBasePowerPriority: 8,
		onBasePower: function (basePower, attacker, defender, move) {
			if (move.flags['contact']) {
				return this.chainModify([0x14CD, 0x1000]);
			}
		},
		id: "magicclaws",
		name: "Magic Claws",
		onTryHitPriority: 1,
		onTryHit: function (target, source, move) {
			if (target === source || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			let newMove = this.getMoveCopy(move.id);
			newMove.hasBounced = true;
			this.useMove(newMove, target, source);
			return null;
		},
		onAllyTryHitSide: function (target, source, move) {
			if (target.side === source.side || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			let newMove = this.getMoveCopy(move.id);
			newMove.hasBounced = true;
			this.useMove(newMove, this.effectData.target, source);
			return null;
		},
		effect: {
			duration: 1,
		},
	},
	blessedhax: {
		shortDesc: "Speed Boost + Serne Grace and +1 Def and SpD boost on switch in",
		onStart: function (pokemon) {
			this.boost({def:1,spd:1});
		},
		onResidual: function (pokemon) {
			if (pokemon.activeTurns) {
				this.boost({spe:1});
			}
		},
		onModifyMovePriority: -2,
		onModifyMove: function (move) {
			if (move.secondaries) {
				this.debug('doubling secondary chance');
				for (let i = 0; i < move.secondaries.length; i++) {
					move.secondaries[i].chance *= 2;
				}
			}
		},
		id:'blessedhax',
		name:'Blessed Hax',
	},
	knowledge: {
		shortDesc: "+3 Def and SpD on switch in, high crit ratio",
		onStart: function (pokemon) {
			this.boost({def:3,spd:3});
		},
		volatileStatus: 'focusenergy',
		effect: {
			onStart: function (pokemon) {
				this.add('-start', pokemon, 'move: Focus Energy');
			},
			onModifyCritRatio: function (critRatio) {
				return critRatio + 2;
			},
		},
	},
	'partingshotspam': {
		shortDesc: "Uses Parting Shot on switch in",
		onStart: function (source) {
			this.useMove('Parting Shot Spam', source);
		},
		id: "partingshotspam",
		name: "Parting Shot Spam",
	},
	'hidden': {
		shortDesc: "Uses substitute on switch in",
		onStart: function (source) {
			this.useMove('Substitute', source);
		},
		id: "hidden",
		name: "Hidden",
	},
	"dragonfury": {
		desc: "If this Pokemon, but not its substitute, is struck by a critical hit, its Attack is raised by 12 stages.",
		shortDesc: "If this Pokemon (not its substitute) takes a critical hit, its Attack is raised 12 stages.",
		onAfterDamage: function (damage, target, source, move) {
			this.boost({atk:12});
		},
		id: "dragonfury",
		name: "Dragon Fury",
		rating: 2,
		num: 83,
	},
	'slowchat': {
		shortDesc: "Uses Defog, Sticky Web then Stealth Rock on switch in",
		onStart: function (source) {
			this.useMove('Defog', source);
			this.useMove('Sticky Web', source);
			this.useMove('Stealth Rock', source);
		},
		id: "slowchat",
		name: "Slowchat",
	},
	"girlpower": {
		shortDesc: "+1 Def on switch in + Fairy Aura + Pixilate",
		onStart: function (source) {
      this.useMove('Barrier', source);
		},
		onAnyBasePower: function (basePower, source, target, move) {
			if (target === source || move.category === 'Status' || move.type !== 'Fairy' || move.auraBoost) return;
			move.auraBoost = move.hasAuraBreak ? 0x0C00 : 0x1547;
			return this.chainModify([move.auraBoost, 0x1000]);
		},
		isUnbreakable: true,
		onModifyMove: function (move, pokemon) {
			if (move.type === 'Normal' && !['judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'weatherball'].includes(move.id) && !(move.isZ && move.category !== 'Status')) {
				move.type = 'Fairy';
				move.pixilateBoosted = true;
			}
		},
		onBasePowerPriority: 8,
		onBasePower: function (basePower, pokemon, target, move) {
			if (move.pixilateBoosted) return this.chainModify([0x1333, 0x1000]);
		},
		id:'girlpower',
		name:'Girl Power', 
	},
   /*'juicedrink': {
		shortDesc: "Immunity + Unaware",
		onAnyModifyBoost: function (boosts, target) {
            let source = this.effectData.target;
            if (source === target) return;
            if (source === this.activePokemon && target === this.activeTarget) {
                boosts['def'] = 0;
                boosts['spd'] = 0;
                boosts['evasion'] = 0;
            }
            if (target === this.activePokemon && source === this.activeTarget) {
                boosts['atk'] = 0;
                boosts['spa'] = 0;
                boosts['accuracy'] = 0;
            }
        },
      onUpdate: function (pokemon) {
            if (pokemon.status === 'psn' || pokemon.status === 'tox') {
                this.add('-activate', pokemon, 'ability: Juice Drink');
                pokemon.cureStatus();
            }
        },
      onSetStatus: function (status, target, source, effect) {
          if (status.id !== 'psn' && status.id !== 'tox') return;
          if (!effect || !effect.status) return false;
          this.add('-immune', target, '[msg]', '[from] ability: Juice Drink');
          return false;
      },
		id: "juicedrink",
		name: "Juice Drink",
	},*/
};
