export const Abilities: {[abilityid: string]: AbilityData} = {
	angerpoint: {
		onAfterMove(source, target, move) {
			if (target.getMoveHitData(move).typeMod < 0) {
				this.boost({atk: 1});
			}
		},
		name: "Anger Point",
		shortDesc: "This Pokemon's attacks that are not super effective against the target, raise Atk by 1.",
		rating: 3.5,
		num: 83,
	},
	ballfetch: {
		inherit: true,
		rating: 2,
		shortDesc: "This Pokemon gets depending on the held ball.",
	},
	battery: {
		onAllyBasePowerPriority: 22,
		onAllyBasePower(basePower, attacker, defender, move) {
			for (const allyActive of pokemon.side.active) {
				if (allyActive && allyActive.position !== pokemon.position &&!allyActive.fainted && move.category === 'Special') {
					this.debug('Battery boost');
					return this.chainModify([0x14CD, 0x1000]);
				}
			}
		},
		name: "Battery",
		shortDesc: "The user's side has the power of their special attacks multiplied by 1.3.",
		rating: 3.5,
		num: 217,
	},
	chlorophyll: {
		onModifySpe(spe, pokemon) {
			if (pokemon.hasItem('utilityumbrella')) return;
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
		shortDesc: "If Sunny Day is active, this Pokemon's Speed is 1.5x.",
		inherit: true,
	},
	damp: {
		onModifyDef(def, pokemon) {
			if (pokemon.hasItem('utilityumbrella')) return;
			if (['raindance', 'primordialsea'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
		name: "Damp",
		shortDesc: "If Rain Dance is active, this Pokemon's Defense is 1.5x.",
		rating: 2,
		num: 6,
	},
	defeatist: {
		onModifyDefPriority: 5,
		onModifyDef(def, pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 2) {
				return this.chainModify(0.5);
			}
		},
		onModifySpDPriority: 5,
		onModifySpD(spd, pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 2) {
				return this.chainModify(0.5);
			}
		},
		shortDesc: "While this Pokemon has 1/2 or less of its max HP, its Defense and Sp. Def are halved.",
		inherit: true,
	},
	dragonsmaw: {
		onBasePowerPriority: 7,
		onBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Dragon') {
				this.debug('Dragon\u2019s Maw boost');
				return this.chainModify([1.5]);
			}
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Dragon') {
				this.debug('Dragon\u2019s Maw weaken');
				return this.chainModify(0.5);
			}
		},
		name: "Dragon's Maw",
		shortDesc: "This Pokemon receives 1/2 damage from Dragon moves. Its own have 1.5x power.",
		rating: 4.5,
		num: 263,
	},
	earlybird: {
		onUpdate(pokemon) {
			if (pokemon.status === 'slp') {
				this.add('-activate', pokemon, 'ability: Early Bird');
				pokemon.cureStatus();
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'slp') return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Early Bird');
			}
			return false;
		},
		name: "Early Bird",
		shortDesc: "This Pokemon cannot be slept. Gaining this Ability while sleeping cures it.",
		rating: 2,
		num: 48,
	},
	forecast: {
		onUpdate(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Castform' || pokemon.transformed) return;
			if (pokemon.hasItem('utilityumbrella')) return;
			let forme = null;
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
				if (pokemon.species.id !== 'castformsunny') forme = 'Castform-Sunny';
				break;
			case 'raindance':
			case 'primordialsea':
				if (pokemon.species.id !== 'castformrainy') forme = 'Castform-Rainy';
				break;
			case 'hail':
				if (pokemon.species.id !== 'castformsnowy') forme = 'Castform-Snowy';
				break;
			default:
				if (pokemon.species.id !== 'castform') forme = 'Castform';
				break;
			}
			if (pokemon.isActive && forme) {
				pokemon.formeChange(forme, this.effect, false, '[msg]');
			}
		},
		inherit: true,
	},
	flowergift: {
		onUpdate(pokemon) {
			if (!pokemon.isActive || pokemon.baseSpecies.baseSpecies !== 'Cherrim' || pokemon.transformed) return;
			if (pokemon.hasItem('utilityumbrella')) return;
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				if (pokemon.species.id !== 'cherrimsunshine') {
					pokemon.formeChange('Cherrim-Sunshine', this.effect, false, '[msg]');
				}
			} else {
				if (pokemon.species.id === 'cherrimsunshine') {
					pokemon.formeChange('Cherrim', this.effect, false, '[msg]');
				}
			}
		},
		onAllyModifyAtkPriority: 3,
		onAllyModifyAtk(atk, pokemon) {
			if (this.effectData.target.baseSpecies.baseSpecies !== 'Cherrim') return;
			if (pokemon.hasItem('utilityumbrella')) return;
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
		onAllyModifySpDPriority: 4,
		onAllyModifySpD(spd, pokemon) {
			if (this.effectData.target.baseSpecies.baseSpecies !== 'Cherrim') return;
			if (pokemon.hasItem('utilityumbrella')) return;
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
		inherit: true,
	},
	galewings: {
		onModifyPriority(priority, pokemon, target, move) {
			if (move?.type === 'Flying' && pokemon.hp > pokemon.maxhp / 2) return priority + 1;
		},
		name: "Gale Wings",
		shortDesc: "Above 1/2 its max HP, this Pokemon's Flying-type moves have their priority increased by 1.",
		rating: 4,
	},
	healer: {
		onResidualOrder: 5,
		onResidualSubOrder: 5,
		onResidual(pokemon) {
			if (this.field.isTerrain('grassyterrain')) return;
			this.heal(pokemon.baseMaxhp / 16);
		},
		onTerrain(pokemon) {
			if (!this.field.isTerrain('grassyterrain')) return;
			this.heal(pokemon.baseMaxhp / 16);
		},
		rating: 2,
		shortDesc: "At the end of every turn, holder restores 1/16 of its max HP.",
		inherit: true,
	},
	hydration: {
		onEffectivenessPriority: -1,
		onEffectiveness(typeMod, target, type, move) {
			if (target.hasItem('utilityumbrella')) return;
			if (move && move.effectType === 'Move' && move.category !== 'Status' && type === 'Water' && typeMod > 0 && 
				['raindance', 'primordialsea'].includes(target.effectiveWeather())) {
				this.add('-activate', target, 'ability: Hydration');
				return 0;
			}
		},
		name: "Hydration",
		shortDesc: "If Rain Dance is active, this Pokemon's Water weaknesses are removed.",
		rating: 4,
		num: 93,
	},
	icebody: {
		onWeather(target, source, effect) {
			if (target.hasItem('utilityumbrella')) return;
			if (effect.id === 'hail') {
				this.heal(target.baseMaxhp / 16);
			}
		},
		onImmunity(type, pokemon) {
			if (pokemon.hasItem('utilityumbrella')) return;
			if (type === 'hail') return false;
		},
		name: "Ice Body",
		rating: 1,
		num: 115,
	},
	iceface: {
		onStart(pokemon) {
			if (pokemon.hasItem('utilityumbrella')) return;
			if (this.field.isWeather('hail') && pokemon.species.id === 'eiscuenoice' && !pokemon.transformed) {
				this.add('-activate', pokemon, 'ability: Ice Face');
				this.effectData.busted = false;
				pokemon.formeChange('Eiscue', this.effect, true);
			}
		},
		onAnyWeatherStart() {
			const pokemon = this.effectData.target;
			if (pokemon.hasItem('utilityumbrella')) return;
			if (this.field.isWeather('hail') && pokemon.species.id === 'eiscuenoice' && !pokemon.transformed) {
				this.add('-activate', pokemon, 'ability: Ice Face');
				this.effectData.busted = false;
				pokemon.formeChange('Eiscue', this.effect, true);
			}
		},
		inherit: true,
	},
	klutz: {
		onStart(source) {
			let activated = false;
			for (const pokemon of source.side.foe.active) {
				if (!activated) {
					this.add('-ability', source, 'Klutz');
				}
				activated = true;
				if (!pokemon.volatiles['klutz']) {
					pokemon.addVolatile('klutz');
				}
			}
		},
		onAnySwitchIn(pokemon) {
			const source = this.effectData.target;
			if (pokemon === source) return;
			for (const target of source.side.foe.active) {
				if (!target.volatiles['klutz']) {
					target.addVolatile('klutz');
				}
			}
		},
		onEnd(pokemon) {
			const source = this.effectData.target;
			for (const target of source.side.foe.active) {
				target.removeVolatile('klutz');
			}
		},
		condition: {
			duration: 5,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Klutz');
			},
			onResidualOrder: 18,
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Klutz');
			},
		},
		shortDesc: "While this Pokemon is active, the opponents' held items have no effect.",
		rating: 4,
		inherit: true,
	},
	leafguard: {
		onEffectivenessPriority: -1,
		onEffectiveness(typeMod, target, type, move) {
			if (target.hasItem('utilityumbrella')) return;
			if (move && move.effectType === 'Move' && move.category !== 'Status' && type === 'Grass' && typeMod > 0 && 
				['sunnyday', 'desolateland'].includes(target.effectiveWeather())) {
				this.add('-activate', target, 'ability: Leaf Guard');
				return 0;
			}
		},
		name: "Leaf Guard",
		shortDesc: "If Sunny Day is active, this Pokemon's Grass weaknesses are removed.",
		rating: 4,
		num: 102,
	},
	liquidvoice: {
		inherit: true,
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Normal' && !noModifyType.includes(move.id) && !(move.isZ && move.category !== 'Status')) {
				move.type = 'Water';
				move.liquidvoiceBoosted = true;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.liquidvoiceBoosted) return this.chainModify([0x1333, 0x1000]);
		},
		shortDesc: "This Pokemon's Normal-type moves become Water type and have 1.2x power.",
		rating: 4,
	},
	magician: {
		onBasePower(basePower, source, target, move) {
			const item = target.getItem();
			if (!this.singleEvent('TakeItem', item, target.itemData, target, target, move, item)) return;
			if (item.id) {
				return this.chainModify(1.5);
			}
		},
		onSourceHit(target, source, move) {
			if (!move || !target) return;
			if (target !== source && move.category !== 'Status') {
				if (!source.item || !source.volatiles['gem'] || move.id !== 'fling') {
					const yourItem = target.takeItem(source);
					if (!yourItem) return;
					if (!source.setItem(yourItem)) {
						target.item = yourItem.id; // bypass setItem so we don't break choicelock or anything
						return;
					}
					this.add('-item', source, yourItem, '[from] ability: Magician', '[of] ' + target);
				}
			}
		},
		name: "Magician",
		shortDesc: "This Pokemon steals target's item with an attacking move. That move has 1.5x power.",
		rating: 1.5,
		num: 170,
	},
	moody: {
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual(pokemon) {
			let stats: BoostName[] = [];
			const boost: SparseBoostsTable = {};
			let statPlus: BoostName;
			for (statPlus in pokemon.boosts) {
				if (statPlus === 'accuracy' || statPlus === 'evasion') continue;
				if (pokemon.boosts[statPlus] < 6) {
					stats.push(statPlus);
				}
			}
			let randomStat: BoostName | undefined = stats.length ? this.sample(stats) : undefined;
			if (randomStat) boost[randomStat] = 1;

			stats = [];
			let statMinus: BoostName;
			for (statMinus in pokemon.boosts) {
				if (statMinus === 'accuracy' || statMinus === 'evasion') continue;
				if (pokemon.boosts[statMinus] > -6 && statMinus !== randomStat) {
					stats.push(statMinus);
				}
			}
			randomStat = stats.length ? this.sample(stats) : undefined;
			if (randomStat) boost[randomStat] = -1;

			this.boost(boost);
		},
		shortDesc: "Boosts a random stat (except accuracy/evasion) +1 and another stat -1 every turn.",
		inherit: true,
	},
	normalize: {
		inherit: true,
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.normalizeBoosted) return this.chainModify(2);
		},
		shortDesc: "This Pokemon's moves are changed to be Normal type and have 2x power.",
	},
	powerspot: {
		onAllyBasePowerPriority: 22,
		onAllyBasePower(basePower, attacker, defender, move) {
			for (const allyActive of pokemon.side.active) {
				if (allyActive && allyActive.position !== pokemon.position &&!allyActive.fainted && move.category === 'Physical') {
					this.debug('Power Spot boost');
					return this.chainModify([0x14CD, 0x1000]);
				}
			}
		},
		name: "Power Spot",
		shortDesc: "The user's side has the power of their physical attacks multiplied by 1.3.",
		rating: 3.5,
		num: 249,
	},
	punkrock: {
		onBasePowerPriority: 7,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['sound']) {
				this.debug('Punk Rock boost');
				return this.chainModify([1.5]);
			}
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.flags['sound']) {
				this.debug('Punk Rock weaken');
				return this.chainModify(0.5);
			}
		},
		name: "Punk Rock",
		shortDesc: "This Pokemon receives 1/2 damage from Sound moves. Its own have 1.5x power.",
		rating: 4.5,
		inherit: true,
	},
	quickdraw: {
		onBasePowerPriority: 23,
		onBasePower(basePower, attacker, defender, move) {
			if (move.priority > 0.1) {
				this.debug('Quick Draw boost');
				return this.chainModify(1.3);
			}
		},
		name: "Quick Draw",
		shortDesc: "This Pokemon's priority attacks have 1.3x power.",
		rating: 2.5,
		num: 259,
	},
	rkssystem: {
		inherit: true,
		onStart(pokemon) {
			let statName = 'atk';
			let bestStat = 0;
			let s: StatNameExceptHP;
			for (s in pokemon.storedStats) {
				if (pokemon.storedStats[s] > bestStat) {
					statName = s;
					bestStat = pokemon.storedStats[s];
				}
			}
			this.boost({[statName]: 1}, pokemon);
		},
		shortDesc: "If this Pokemon is Silvally, its type matches its held Memory. Raises highest stat on entry.",
	},
	runaway: {
		onTrapPokemonPriority: -10,
		onTrapPokemon(pokemon) {
			pokemon.trapped = pokemon.maybeTrapped = false;
		},
		shortDesc: "This Pokemon may switch out even when trapped by another Pokemon, or by Ingrain.",
		rating: 3,
		inherit: true,
	},
	sandforce: {
		onModifyAtk(atk, pokemon) {
			if (pokemon.hasItem('utilityumbrella')) return;
			if (this.field.isWeather('sandstorm')) {
				return this.chainModify(1.5);
			}
		},
		onImmunity(type, pokemon) {
			if (pokemon.hasItem('utilityumbrella')) return;
			if (type === 'sandstorm') return false;
		},
		name: "Sand Force",
		shortDesc: "If Sandstorm is active, this Pokemon's Attack is 1.5x; immunity to Sandstorm.",
		inherit: true,
	},
	sandrush: {
		onModifySpe(spe, pokemon) {
			if (pokemon.hasItem('utilityumbrella')) return;
			if (this.field.isWeather('sandstorm')) {
				return this.chainModify(1.5);
			}
		},
		onImmunity(type, pokemon) {
			if (pokemon.hasItem('utilityumbrella')) return;
			if (type === 'sandstorm') return false;
		},
		name: "Sand Rush",
		shortDesc: "If Sandstorm is active, this Pokemon's Speed is 1.5x; immunity to Sandstorm.",
		inherit: true,
	},
	sandveil: {
		onImmunity(type, pokemon) {
			if (pokemon.hasItem('utilityumbrella')) return;
			if (type === 'sandstorm') return false;
		},
		onModifyAccuracyPriority: 8,
		onModifyAccuracy(accuracy, pokemon) {
			if (pokemon.hasItem('utilityumbrella')) return;
			if (typeof accuracy !== 'number') return;
			if (this.field.isWeather('sandstorm')) {
				this.debug('Sand Veil - decreasing accuracy');
				return accuracy * 0.8;
			}
		},
		inherit: true,
	},
	snowcloak: {
		onImmunity(type, pokemon) {
			if (pokemon.hasItem('utilityumbrella')) return;
			if (type === 'hail') return false;
		},
		onModifyAccuracyPriority: 8,
		onModifyAccuracy(accuracy, pokemon) {
			if (pokemon.hasItem('utilityumbrella')) return;
			if (typeof accuracy !== 'number') return;
			if (this.field.isWeather('hail')) {
				this.debug('Snow Cloak - decreasing accuracy');
				return accuracy * 0.8;
			}
		},
		inherit: true,
	},
	solarpower: {
		onModifySpAPriority: 5,
		onModifySpA(spa, pokemon) {
			if (pokemon.hasItem('utilityumbrella')) return;
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
		inherit: true,
	},
	scrappy: {
		onModifyMovePriority: -5,
		onModifyMove(move) {
			if (!move.ignoreImmunity) move.ignoreImmunity = {};
			if (move.ignoreImmunity !== true) {
				move.ignoreImmunity = true;
			}
		},
		shortDesc: "This Pokemon ignores type based immunities.",
		inherit: true,
	},
	slowstart: {
		condition: {
			duration: 1,
			onStart(target) {
				this.add('-start', target, 'ability: Slow Start');
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, pokemon) {
				return this.chainModify(0.5);
			},
			onModifySpe(spe, pokemon) {
				return this.chainModify(0.5);
			},
			onEnd(target) {
				this.add('-end', target, 'Slow Start');
			},
		},
		shortDesc: "On switch-in, this Pokemon's Attack and Speed are halved for the next turn.",
		inherit: true,
	},
	slushrush: {
		onModifySpe(spe, pokemon) {
			if (pokemon.hasItem('utilityumbrella')) return;
			if (this.field.isWeather('hail')) {
				return this.chainModify(1.5);
			}
		},
		onImmunity(type, pokemon) {
			if (pokemon.hasItem('utilityumbrella')) return;
			if (type === 'sandstorm') return false;
		},
		name: "Slush Rush",
		shortDesc: "If Hail is active, this Pokemon's Speed is 1.5x; immunity to Hail.",
		inherit: true,
	},
	soundproof: {
		onTryHit(target, source, move) {
			if (move.target !== 'self' && move.flags['sound']) {
				this.add('-immune', target, '[from] ability: Soundproof');
				return null;
			}
		},
		onAllyTryHitSide(target, source, move) {
			if (move.flags['sound']) {
				this.add('-immune', this.effectData.target, '[from] ability: Soundproof');
			}
		},
		inherit: true,
	},
	steelworker: {
		onBasePowerPriority: 7,
		onBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Steel') {
				this.debug('Steelworker boost');
				return this.chainModify([1.5]);
			}
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Steel') {
				this.debug('Steelworker weaken');
				return this.chainModify(0.5);
			}
		},
		name: "Steelworker",
		shortDesc: "This Pokemon receives 1/2 damage from Steel moves. Its own have 1.5x power.",
		rating: 4.5,
		num: 200,
	},
	swiftswim: {
		onModifySpe(spe, pokemon) {
			if (pokemon.hasItem('utilityumbrella')) return;
			if (['raindance', 'primordialsea'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
		name: "Swift Swim",
		shortDesc: "If Rain Dance is active, this Pokemon's Speed is 1.5x.",
		inherit: true,
	},
	transistor: {
		onBasePowerPriority: 7,
		onBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Electric') {
				this.debug('Transistor boost');
				return this.chainModify([1.5]);
			}
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Electric') {
				this.debug('Transistor weaken');
				return this.chainModify(0.5);
			}
		},
		name: "Transistor",
		shortDesc: "This Pokemon receives 1/2 damage from Electric moves. Its own have 1.5x power.",
		rating: 4.5,
		num: 262,
	},
	truant: {
		onBeforeMovePriority: 9,
		onBeforeMove(pokemon) {
			if (this.randomChance(1, 5)) {
				this.add('cant', pokemon, 'ability: Truant');
				return false;
			}
		},
		condition: {},
		name: "Truant",
		shortDesc: "20% Chance, that this Pokemon skips a turn instead of using a move.",
		rating: -1,
		num: 54,
	},
	watercompaction: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Water') {
				if (!this.boost({def: 2})) {
					this.add('-immune', target, '[from] ability: Water Compaction');
				}
				return null;
			}
		},
		name: "Water Compaction",
		shortDesc: "This Pokemon's Defense is raised 2 stages when hit by a Water-type move; Water immunity.",
		rating: 1.5,
		num: 195,
	},
	
	//Roovnen
	artportrait: {
		onStart(source) {
			for (const target of source.side.foe.active) {
				const types = target.species.types;
				if (types && types !== '???' && source.getTypes().join() !== types) {
					if (!source.setType(types)) return;
					this.add('-activate', source, 'ability: Art Portrait');
					this.add('-start', source, 'typechange', '[from] move: Reflect Type', '[of] ' + target);
				}
			}
		},
		name: "Art Portrait",
		shortDesc: "Upon entry, copies the opponents type.",
		rating: 3.5,
		num: 268,
	},
	storyline: {
		onStart(source) {
			this.useMove("Story Line", source);
		},
		name: "Story Line",
		shortDesc: "Two turns after entry, the target will be hit by an attack.",
		rating: 3.5,
		num: 269,
	},
	synthony: {
		onStart(pokemon) {
			pokemon.addVolatile('synthony');
		},
		condition: {
			onStart(pokemon) {
				this.effectData.numConsecutive = 0;
			},
			onTryMovePriority: -2,
			onTryMove(pokemon, target, move) {
				if (!pokemon.hasAbility('synthony')) {
					pokemon.removeVolatile('synthony');
					return;
				}
				if (move.flags['sound'] && pokemon.moveLastTurnResult) {
					this.effectData.numConsecutive++;
				} else if (pokemon.volatiles['twoturnmove']) {
					this.effectData.numConsecutive = 1;
				} else {
					this.effectData.numConsecutive = 0;
				}
				this.effectData.lastMove = move.id;
			},
			onModifyDamage(damage, source, target, move) {
				const dmgMod = [0x1000, 0x1333, 0x1666, 0x1999, 0x1CCC, 0x2000];
				const numConsecutive = this.effectData.numConsecutive > 5 ? 5 : this.effectData.numConsecutive;
				return this.chainModify([dmgMod[numConsecutive], 0x1000]);
			},
		},
		name: "Synthony",
		shortDesc: "Damage of sound moves used on consecutive turns is increased. Max 2x after 5 turns.",
		rating: 4,
		num: 270,
	},
	chaser: {
		onFoeSwitchOut(source, target) {
			for (const target of source.side.foe.active) {
				this.damage(source.baseMaxhp / 8, source, target);
			}
		},
		name: "Chaser",
		shortDesc: "Opposing Pokemon loose 1/8 of their maximum HP, rounded down, when it switches out.",
		rating: 5,
		num: 271,
	},
	ignorance: {
		//Implemented in conditions.ts
		name: "Ignorance",
		shortDesc: "This Pokemon can't be locked into a move.",
		rating: 5,
		num: 273,
	},
	doubleminded: {
		onPrepareHit(source, target, move) {
			if (move.multihit) return;
			if (move.type === 'Psychic' && !move.isMax && !move.isZ) {
				move.multihit = 2;
			}
		},
		onBasePowerPriority: 7,
		onBasePower(basePower, pokemon, target, move) {
			if (move.type === 'Psychic') return this.chainModify(0.67);
		},
		name: "Double Minded",
		shortDesc: "Psychic-type moves hit twice at 2/3 power each.",
		rating: 3.5,
		num: 276,
	},
	evilminded: {
		onModifyMovePriority: -5,
		onModifyMove(move) {
			if (!move.ignoreImmunity) move.ignoreImmunity = {};
			if (move.ignoreImmunity !== true) {
				move.ignoreImmunity['Psychic'] = true;
			}
		},
		onAfterMove(source, target, move) {
			if (move.type !== 'Psychic') return;
			if (target.hasType('Bug') || target.hasType('Dark') || target.hasType('Ghost')) {
				target.addVolatile('curse');
			}
		},
		name: "Evil Minded",
		shortDesc: "Psychic-type moves curse Bug-, Ghost- and Dark-types. Ignores Dark-immunity.",
		rating: 3,
		num: 277,
	},
	hailforce: {
		onModifyAtk(atk, pokemon) {
			if (this.field.isWeather('hail')) {
				return this.chainModify(1.5);
			}
		},
		onImmunity(type, pokemon) {
			if (type === 'hail') return false;
		},
		name: "Hail Force",
		shortDesc: "If Hail is active, this Pokemon's Attack is 1.5x; immunity to Hail.",
		rating: 3.5,
		num: 280,
	},
	maternalguard: {
		onModifyDefPriority: 2,
		onModifyDef(def, pokemon) {
			if (pokemon.baseSpecies.nfe) {
				return this.chainModify(1.5);
			}
		},
		onModifySpDPriority: 2,
		onModifySpD(spd, pokemon) {
			if (pokemon.baseSpecies.nfe) {
				return this.chainModify(1.5);
			}
		},
		name: "Maternal Guard",
		shortDesc: "If this Pokemon can evolve, its Defense and Sp. Def are 1.5x.",
		rating: 3.5,
		num: 281,
	},
	maternalpower: {
		onPrepareHit(source, target, move) {
			if (move.category === 'Status' || move.selfdestruct || move.multihit) return;
			if (['endeavor', 'fling', 'iceball', 'rollout', 'seismictoss', 'nightshade'].includes(move.id)) return;
			if (!move.flags['charge'] && !move.spreadHit && !move.isZ && !move.isMax) {
				move.multihit = 3;
				move.multihitType = 'maternalpower';
			}
		},
		onBasePowerPriority: 7,
		onBasePower(basePower, pokemon, target, move) {
			if (move.multihitType === 'maternalpower' && move.hit > 1) return this.chainModify(0.33);
		},
		onSourceModifySecondaries(secondaries, target, source, move) {
			if (move.multihitType === 'maternalpower' && move.id === 'secretpower' && move.hit < 2) {
				// hack to prevent accidentally suppressing King's Rock/Razor Fang
				return secondaries.filter(effect => effect.volatileStatus === 'flinch');
			}
		},
		name: "Maternal Power",
		shortDesc: "This Pokemon's damaging moves hit thrice. The second and third hit have their power third.",
		rating: 3.5,
		num: 282,
	},
	amethystbody: {
		onBasePowerPriority: 21,
		onBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Fairy') {
				this.debug('Amethyst Body boost');
				return this.chainModify(1.3);
			}
		},
		onSourceModifyAtkPriority: 6,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Dark' || move.type === 'Ghost') {
				this.debug('Amethyst Body weaken');
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Dark' || move.type === 'Ghost') {
				this.debug('Amethyst Body weaken');
				return this.chainModify(0.5);
			}
		},
		name: "Amethyst Body",
		shortDesc: "Fairy-type moves do 1.3x damage. Takes halve damage from Dark- and Ghost-type moves.",
		rating: 2,
		num: 283,
	},
	protectivewill: {
		onSourceModifyDamage(damage, source, target, move) {
			if (move.category !== 'Status') {
				return this.chainModify(0.75);
			}
		},
		onAfterMoveSecondaryPriority: -1,
		onAfterMoveSecondary(pokemon, target, move) {
			if (move.category !== 'Status') {
				this.damage(target.lastDamage / 3, target, pokemon, this.dex.getAbility('protectivewill'));
			}
		},
		name: "Protective Will",
		shortDesc: "Damaging moves do 25% less damage and the 25% are bounced back at the attacker.",
		rating: 4.5,
		num: 400,
	},
	prideroar: {
		onModifyMovePriority: -1,
		onModifyMove(move) {
			if (source && target === source) return;
			if (move.flags['sound']) {
				source.forceSwitchFlag = true;
				return priority = -6;
			}
		},
		name: "Pride Roar",
		shortDesc: "Sound moves force the target to switch to a random ally, but have negative priority.",
		rating: 4.5,
		num: 401,
	},
	kindheart: {
		onModifyMovePriority: -1,
		onModifyMove(source, target, move) {
			if (move && target.getMoveHitData(move).typeMod > 0) {
				return this.chainModify(0.75);
			}
		},
		onAfterMoveSecondarySelf(source, target, move) {
			if (move && target.getMoveHitData(move).typeMod > 0) {
				this.heal(source.baseMaxhp / 8, source, source, this.dex.getAbility('kindheart'));
			}
		},
		name: "Kind Heart",
		shortDesc: "Super effective moves do 25% less damage, but heal the user by 1/8 of its max HP.",
		rating: 4.5,
		num: 402,
	},
	fearfulpresence: {
		onBasePowerPriority: 22,
		onBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Dark') {
				return this.chainModify(1.2);
			}
		},
		onModifyMovePriority: -1,
		onModifyMove(move) {
			if (move.category !== "Status") {
				this.debug('Adding Fearful Presence flinch');
				if (!move.secondaries) move.secondaries = [];
				for (const secondary of move.secondaries) {
					if (secondary.volatileStatus === 'flinch') return;
				}
				move.secondaries.push({
					chance: 10,
					volatileStatus: 'flinch',
				});
			}
		},
		name: "Fearful Presence",
		shortDesc: "Dark-type attacks do 1.2x damage. Attacking moves have a 10% chance to flinch.",
		rating: 4.5,
		num: 403,
	},
};