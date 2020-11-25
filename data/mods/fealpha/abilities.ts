'use strict';


let BattleAbilities = {
	"pressurebounce": { //Functional!
		shortDesc: "This Pokemon blocks certain status moves and bounces them back twice to the user.",
		id: "pressurebounce",
		name: "Pressure Bounce",
		onTryHitPriority: 1,
		onTryHit(target, source, move) {
			if (target === source || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			let newMove = this.dex.getActiveMove(move.id);
			newMove.hasBounced = true;
			newMove.pranksterBoosted = false;
			this.useMove(newMove, target, source);
			this.useMove(newMove, target, source);
			return null;
		},
		onAllyTryHitSide(target, source, move) {
			if (target.side === source.side || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			let newMove = this.dex.getActiveMove(move.id);
			newMove.hasBounced = true;
			newMove.pranksterBoosted = false;
			this.useMove(newMove, this.effectData.target, source);
			this.useMove(newMove, this.effectData.target, source);
			return null;
		},
		effect: {
			duration: 1,
		},
	},
	
	"aurevoir": { //Functional!
		shortDesc: "This Pokemon switches out when it reaches 1/2 or less of its maximum HP and restores 1/3 of its maximum HP, rounded down.",
		onEmergencyExit(target) {
			if (!this.canSwitch(target.side) || target.forceSwitchFlag || target.switchFlag) return;
			for (const side of this.sides) {
				for (const active of side.active) {
					active.switchFlag = false;
				}
			}
			target.switchFlag = true;
			target.heal(target.baseMaxhp / 3);
			this.add('-activate', target, 'ability: Au Revoir');
		},
		id: "aurevoir",
		name: "Au Revoir",
	},
	
  	"clearcleaner": { //Functional!
		shortDesc: "Screen Cleaner	+ Clear Body",
		onStart(pokemon) {
			let activated = false;
			for (const sideCondition of ['reflect', 'lightscreen', 'auroraveil']) {
				if (pokemon.side.getSideCondition(sideCondition)) {
					if (!activated) {
						this.add('-activate', pokemon, 'ability: Clear Cleaner');
						activated = true;
					}
					pokemon.side.removeSideCondition(sideCondition);
				}
				if (pokemon.side.foe.getSideCondition(sideCondition)) {
					if (!activated) {
						this.add('-activate', pokemon, 'ability: Clear Cleaner');
						activated = true;
					}
					pokemon.side.foe.removeSideCondition(sideCondition);
				}
			}
		},
		onBoost(boost, target, source, effect) {
			if (source && target === source) return;
			let showMsg = false;
			for (let i in boost) {
				// @ts-ignore
				if (boost[i] < 0) {
					// @ts-ignore
					delete boost[i];
					showMsg = true;
				}
			}
			if (showMsg && !(/** @type {ActiveMove} */(effect)).secondaries && effect.id !== 'octolock') {
				this.add("-fail", target, "unboost", "[from] ability: Clear Cleaner", "[of] " + target);
			}
		},
		id: "clearcleaner",
		name: "Clear Cleaner",
	},
	
	"terraform": { //Functional!
		shortDesc: " This Pokemon is immune to Ground-type attacks, and raises its highest non-HP stat when hit by one or when it gets a KO.",
		id: "terraform",
		name: "Terraform",
		onTryHitPriority: 1,
		onTryHit(target, source, move) {
			let statName = 'atk';
			let bestStat = 0;
			let s: StatNameExceptHP;
			for (s in this.effectData.target.storedStats) {
				if (this.effectData.target.storedStats[s] > bestStat) {
					statName = s;
					bestStat = this.effectData.target.storedStats[s];
				}
			}
			if (target !== source && move.type === 'Ground') {
				this.boost({[statName]: 1}, this.effectData.target);
				return null;
			}
		},
		onAllyTryHitSide(target, source, move) {
			if (target === this.effectData.target || target.side !== source.side) return;
			let statName = 'atk';
			let bestStat = 0;
			let s: StatNameExceptHP;
			for (s in this.effectData.target.storedStats) {
				if (this.effectData.target.storedStats[s] > bestStat) {
					statName = s;
					bestStat = this.effectData.target.storedStats[s];
				}
			}
			if (move.type === 'Ground') {
				this.boost({[statName]: 1}, this.effectData.target);
			}
		},
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				let statName = 'atk';
				let bestStat = 0;
				let s: StatNameExceptHP;
				for (s in source.storedStats) {
					if (source.storedStats[s] > bestStat) {
						statName = s;
						bestStat = source.storedStats[s];
					}
				}
				this.boost({[statName]: length}, source);
			}
		},
	},
	
	"thunderclap": { //Functional!
		shortDesc: "On switch-in, this Pokemon lowers the Attack of adjacent opponents by 1 stage and restores 1/4 of its maximum HP, rounded down. This Pokemon is immune to Electric-type moves.",
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.side.foe.active) {
				if (!target || !this.isAdjacent(target, pokemon)) continue;
				if (!activated) {
					this.add('-ability', pokemon, 'Thunderclap', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else if (target.hasAbility(['Inner Focus', 'Oblivious', 'Own Tempo', 'Scrappy'])) {
					this.add('-immune', target, `[from] ability: ${target.getAbility().name}`);
				} else {
					this.boost({atk: -1}, target, pokemon, null, true);
					this.heal((pokemon.baseMaxhp / 4), pokemon);
				}
			}
		},
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Electric') {
				this.add('-immune', target, '[from] ability: Thunderclap');
				return null;
			}
		},
		id: "thunderclap",
		name: "Thunderclap",
	},
	
	"passionstar": { //It *does* work, it just can't show up on the client hover box :/ 
		shortDesc: "This Pokemon and its allies' moves have their Attack and accuracy multiplied by 1.1.",
		onAllyModifyMove(move) {
			if (typeof move.accuracy === 'number') {
				move.accuracy *= 1.1;
			}
		},
		onAllyModifyAtkPriority: 3,
		onAllyModifyAtk(atk, pokemon) {
			return this.chainModify(1.1);
		},
		id: "passionstar",
		name: "Passion Star",
	},
	
	"volcanicity": { //Functional!
		shortDesc: "Water Absorb + Filter",
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Water') {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Volcanicity');
				}
				return null;
			}
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).typeMod > 0) {
				this.debug('Volcanicity neutralize');
				return this.chainModify(0.75);
			}
		},
		id: "volcanicity",
		name: "Volcanicity",
	},
	
	"ironstinger": { //Functional!
		shortDesc: "Pressure + Iron Barbs",
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Iron Stinger');
		},
		onDeductPP(target, source) {
			if (target.side === source.side) return;
			return 1;
		},
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (move.flags['contact']) {
				this.damage(source.baseMaxhp / 8, source, target);
			}
		},
		id: "ironstinger",
		name: "Iron Stinger",
	},
	
	"spellmaster": { // Functional!
		shortDesc: "This Pokemon is immune to Ground-type attacks and the secondary effects of attacks.",
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Ground') {
				this.add('-immune', target, '[msg]', '[from] ability: Spell Master');
				return null;
			}
		},
		onModifySecondaries(secondaries) {
			this.debug('Spell Master prevent secondary');
			return secondaries.filter(effect => !!(effect.self || effect.dustproof));
		},
		id: "spellmaster",
		name: "Spell Master",
	},
	
	"compulsive": {//Functional!
		shortDesc: "This Pokemon's Attack is raised by 1 stage after it flinches or is damaged by a Dark-type move.",
		onFlinch(pokemon) {
			this.boost({atk: 1});
		},
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Dark') {
				this.boost({atk: 1});
			}
		},
		id: "compulsive",
		name: "Compulsive",
	},
	
	"badprogram": { // Functional! 
		shortDesc: "This Pokemon's moves of 60 power or less have 1.5x power. If the opponent uses a move with 60 power or less, they lose 1/8 maximum HP, rounded down.",
		onBasePowerPriority: 8,
		onBasePower(basePower, attacker, defender, move) {
			if (basePower <= 60) {
				this.debug('Bad Program boost');
				return this.chainModify(1.5);
			}
		},
		onAnyDamage(damage, target, source, effect) {
			if(effect && effect.effectType === 'Move' && effect.basePower <= 60 && source.side !== this.effectData.target.side) {
				this.damage(source.baseMaxhp / 8, source, target);
			}
		},
		id: "badprogram",
		name: "Bad Program",
	},
	
	"foulbreath": { //Functional! 
		shortDesc: "This Pokemon's attacks ignore abilities. This Pokemon’s Bug-type attacks have 1.5x power.",
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Foul Breath');
		},
		onModifyMove(move) {
			move.ignoreAbility = true;
		},
		onModifyAtkPriority: 6,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Bug') {
				this.debug('Foul Breath boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Bug') {
				this.debug('Foul Breath boost');
				return this.chainModify(1.5);
			}
		},
		id: "foulbreath",
		name: "Foul Breath",
		rating: 3.5,
		num: 163,
	},
	
	"galvaforce": { //Functional, other than a minor error? It doesn't crash but... 
		shortDesc: "Electric Surge + Pressure",
		onStart(source, pokemon) {
			this.field.setTerrain('electricterrain');
			this.add('-ability', pokemon, 'Galvaforce');
		},
		onDeductPP(target, source) {
			if (target.side === source.side) return;
			return 1;
		},
		id: "galvaforce",
		name: "Galvaforce",
	},
	
	"pressureboost": { //Functional! 
		shortDesc: "Beast Boost + Pressure",
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Pressure Boost');
		},
		onDeductPP(target, source) {
			if (target.side === source.side) return;
			return 1;
		},
		onSourceFaint(target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				let statName = 'atk';
				let bestStat = 0;
				/** @type {StatNameExceptHP} */
				let s;
				for (s in source.storedStats) {
					if (source.storedStats[s] > bestStat) {
						statName = s;
						bestStat = source.storedStats[s];
					}
				}
				this.boost({[statName]: 1}, source);
			}
		},
		id: "pressureboost",
		name: "Pressure Boost",
	},
	
	"chivalry": { //Functional!
		shortDesc: "This Pokemon's Attack is raised by 2 stages and its Speed by 1 stage for each of its stats that is lowered by a foe, or upon being flinched.",
		onAfterEachBoost(boost, target, source, effect) {
			if (!source || target.side === source.side) {
				if (effect.id === 'stickyweb') {
					this.hint("Court Change Sticky Web counts as lowering your own Speed, and Defiant only affects stats lowered by foes.", true, source.side);
				}
				return;
			}
			let statsLowered = false;
			for (let i in boost) {
				// @ts-ignore
				if (boost[i] < 0) {
					statsLowered = true;
				}
			}
			if (statsLowered) {
				this.add('-ability', target, 'Chivalry');
				this.boost({atk: 2, spe: 1}, target, target, null, true);
			}
		},
		onFlinch(pokemon) {
			this.boost({atk: 2, spe: 1});
		},
		id: "chivalry",
		name: "Chivalry",
	},
	// ---------------- below here is where you're editing, park; dont get lost!!!!!!! 
	"unamused": { //Functional!
		shortDesc: "Ignores stat changes, summons Sandstorm when taking or dealing damage",
		id: "unamused",
		name: "Unamused",
		onAnyModifyBoost(boosts, pokemon) {
			const unawareUser = this.effectData.target;
			if (unawareUser === pokemon) return;
			if (unawareUser === this.activePokemon && pokemon === this.activeTarget) {
				boosts['def'] = 0;
				boosts['spd'] = 0;
				boosts['evasion'] = 0;
			}
			if (pokemon === this.activePokemon && unawareUser === this.activeTarget) {
				boosts['atk'] = 0;
				boosts['def'] = 0;
				boosts['spa'] = 0;
				boosts['accuracy'] = 0;
			}
		},
		onDamagingHit(damage, target, source, move) { // Currently reports that the ability belongs to the thing that got hit
			if (this.field.getWeather().id !== 'sandstorm') {
				this.field.setWeather('sandstorm', this.effectData.target);
			}
		},
		onSourceHit(target, source, move) {
			if (!move || !target) return;
			if (target !== source && move.category !== 'Status') {
				if (this.field.getWeather().id !== 'sandstorm') {
					this.field.setWeather('sandstorm', this.effectData.target);
				}
			}
		},
	},
	
	"armorsurge": { // Functional!
		shortDesc: "Sets Psychic Terrain when damaged by a physical attack",
		id: "armorsurge",
		name: "Armor Surge",
		onDamagingHit(damage, target, source, move) {
			if (move.category === 'Physical') {
				this.field.setTerrain('psychicterrain');
			}
		},
	},
	
	"unbullet": { //Functional!
		shortDesc: "Bulletproof + Unburden",
		id: "unbullet",
		name: "Unbullet",
		onAfterUseItem(item, pokemon) {
			if (pokemon !== this.effectData.target) return;
			pokemon.addVolatile('unburden');
		},
		onTakeItem(item, pokemon) {
			pokemon.addVolatile('unburden');
		},
		onEnd(pokemon) {
			pokemon.removeVolatile('unburden');
		},
		effect: {
			onModifySpe(spe, pokemon) {
				if (!pokemon.item) {
					return this.chainModify(2);
				}
			},
		},
		onTryHit(pokemon, target, move) {
			if (move.flags['bullet']) {
				this.add('-immune', pokemon, '[from] ability: Unbullet');
				return null;
			}
		},
	},
	
	"diamonddust": { //Functional! 
		shortDesc: "Takes 0.5x damage from Fire, Ice, Dark; raises Atk by 1 stage if hit by one",
		id: "diamonddust",
		name: "Diamond Dust",
		onSourceModifyAtkPriority: 6,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Ice' || move.type === 'Fire' || move.type === 'Dark') {
				this.debug('Diamond Dust weaken');
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Ice' || move.type === 'Fire' || move.type === 'Dark') {
				this.debug('Diamond Dust weaken');
				return this.chainModify(0.5);
			}
		},
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Ice' || move.type === 'Fire' || move.type === 'Dark') {
				this.boost({atk: 1});
			}
		},
	},
	
	"integrity": { //Functional! 
		shortDesc: "If affected by a move-limiting status, that status also applies to the opponent",
		id: "integrity",
		name: "Integrity",
		onTryAddVolatile(status, target, source, effect) {
			if (['attract', 'disable', 'encore', 'healblock', 'taunt', 'torment'].includes(status.id)) {
				if (effect.effectType === 'Move') {
					this.add('-activate', target, 'ability: Integrity');
					source.addVolatile(status, target, {status: status.id, id: 'integrity'});
				}
			}
		},
	},
	
	"ambientaid": {//Functions!
		shortDesc: "Teravolt + Defiant",
		id: "ambientaid",
		name: "Ambient Aid",
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Ambient Aid');
		},
		onModifyMove(move) {
			move.ignoreAbility = true;
		},
		onAfterEachBoost(boost, target, source, effect) {
			if (!source || target.side === source.side) {
				if (effect.id === 'stickyweb') {
					this.hint("Court Change Sticky Web counts as lowering your own Speed, and Ambient Aid only affects stats lowered by foes.", true, source.side);
				}
				return;
			}
			let statsLowered = false;
			let i: BoostName;
			for (i in boost) {
				if (boost[i]! < 0) {
					statsLowered = true;
				}
			}
			if (statsLowered) {
				this.add('-ability', target, 'Ambient Aid');
				this.boost({atk: 2}, target, target, null, true);
			}
		},
	},
	
	"technicalcurse": {//Functional! 
		shortDesc: "Cursed Body + Technician",
		id: "technicalcurse",
		name: "Technical Curse",
		onBasePowerPriority: 30,
		onBasePower(basePower, attacker, defender, move) {
			const basePowerAfterMultiplier = this.modify(basePower, this.event.modifier);
			this.debug('Base Power: ' + basePowerAfterMultiplier);
			if (basePowerAfterMultiplier <= 60) {
				this.debug('Technician boost');
				return this.chainModify(1.5);
			}
		},
		onDamagingHit(damage, target, source, move) {
			if (source.volatiles['disable']) return;
			if (!move.isFutureMove) {
				if (this.randomChance(3, 10)) {
					source.addVolatile('disable', this.effectData.target);
				}
			}
		},
		
	},
	
	"plusultra": {//Functional! 
		shortDesc: "SpA 1.5x against targets of other gender",
		id: "plusultra",
		name: "Plus Ultra",
		onModifySpAPriority: 5,
			onModifySpA(atk, attacker, defender, move) {
				if (attacker.gender !== defender.gender) {
					this.debug('Plus Ultra boost');
					return this.chainModify(1.5);
				}
			},
	},
	
	"nocturnalflash": {
		shortDesc: "Attacks have 1.5x power and a 30% chance to Poison if it moves last",
		id: "nocturnalflash",
		name: "Nocturnal Flash",
		onBasePower(basePower, pokemon) {
			let boosted = true;
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (this.queue.willMove(target)) {
					boosted = false;
					break;
				}
			}
			if (boosted) {
				this.debug('Nocturnal Flash boost');
				return this.chainModify([0x14CD, 0x1000]);
			}
		},
		onModifyMove(move, pokemon) { 
			let boosted = true;
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (this.queue.willMove(target)) {
					boosted = false;
					break;
				}
			}
			if (!move || move.target === 'self') return;
			if (!boosted) return; 
			if (!move.secondaries) {
				move.secondaries = [];
			}
			move.secondaries.push({
				chance: 30,
				status: 'psn',
				ability: this.dex.getAbility('nocturnalflash'),
			});
		},
	},
	
	"fatalend": {
		shortDesc: "Punching moves 1.5x",
		id: "fatalend",
		name: "Fatal End",
		onBasePowerPriority: 23,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['punch']) {
				this.debug('Fatal End boost');
				return this.chainModify(1.5);
			}
		},
	},
	
	"thunderstorm": {
		shortDesc: "Pressure + Drizzle",
		id: "thunderstorm",
		name: "Thunderstorm",
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Pressure');
		},
		onDeductPP(target, source) {
			if (target.side === source.side) return;
			return 1;
		},
		onStart(source) {
			for (const action of this.queue) {
				if (action.choice === 'runPrimal' && action.pokemon === source && source.species.id === 'kyogre') return;
				if (action.choice !== 'runSwitch' && action.choice !== 'runPrimal') break;
			}
			this.field.setWeather('raindance');
		},
	},
	
	"waterwarrior": {
		shortDesc: "In Rain; 1.5x Atk, 2x Spe",
		id: "waterwarrior",
		name: "Water Warrior",
		onModifySpe(spe, pokemon) {
			if (['raindance', 'primordialsea'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(2);
			}
		},
		onModifyAtkPriority: 5,
		onModifyAtk(spe, pokemon) {
			if (['raindance', 'primordialsea'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(2);
			}
		},
	},
};

exports.BattleAbilities = BattleAbilities;
