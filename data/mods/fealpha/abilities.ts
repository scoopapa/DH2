'use strict';


let BattleAbilities = {
	"pressurebounce": {
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
	"aurevoir": {
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
  	"clearcleaner": {
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
		"terraform": {
		shortDesc: " This Pokemon is immune to Ground-type attacks, and raises its highest non-HP stat when hit by one or when it gets a KO.",
		id: "terraform",
		name: "Terraform",
		onTryHit(target, source, move, effect) {
			if (target !== source && move.type === 'Ground') {
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
				if (target !== source && move.type === 'Ground') {
				this.add('-immune', target, '[msg]', '[from] ability: Terraform');
				return null;
				}
			}
		},
	},
		"thunderclap": {
		shortDesc: "On switch-in, this Pokemon lowers the Attack of adjacent opponents by 1 stage and restores 1/4 of its maximum HP, rounded down. This Pokemon is immune to Electric-type moves.",
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.side.foe.active) {
				if (!target || !this.isAdjacent(target, pokemon)) continue;
				if (!activated) {
					this.add('-ability', pokemon, 'Intimidate', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else if (target.hasAbility(['Inner Focus', 'Oblivious', 'Own Tempo', 'Scrappy'])) {
					this.add('-immune', target, `[from] ability: ${target.getAbility().name}`);
				} else {
					this.boost({atk: -1}, target, pokemon, null, true);
					pokemon.heal(pokemon.baseMaxhp / 4);
				}
			}
		},
		id: "thunderclap",
		name: "Thunderclap",
	},
		"passionstar": {
		shortDesc: "This Pokemon and its allies' moves have their Attack and accuracy multiplied by 1.1.",
		onAllyModifyMove(move) {
			if (typeof move.accuracy === 'number') {
				move.accuracy *= 1.1;
			}
		},
		onModifyAtk(atk, attacker, defender, move) {
				return this.chainModify(1.1);
		},
		onAllyModifyAtk(atk, attacker, defender, move) {
				return this.chainModify(1.1);
		},
		id: "passionstar",
		name: "Passion Star",
	},
	"volcanicity": {
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
	"ironstinger": {
		shortDesc: "Pressure + Iron Barbs",
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Pressure');
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
	"spellmaster": { // TODO: Check immune to secondary effects
		shortDesc: "This Pokemon is immune to Ground-type attacks and the secondary effects of attacks.",
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Ground') {
				this.add('-immune', target, '[msg]', '[from] ability: Spell Master');
				return null;
			}
		},
		onModifyMove(move, pokemon, target) {
			if (move.secondaries) {
				for (const target of pokemon.side.foe.active) {
				delete move.secondaries;
				if (move.id === 'clangoroussoulblaze') delete move.selfBoost;
			}
			}
		},
		id: "spellmaster",
		name: "Spell Master",
	},
	"compulsive": {
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
		"badprogram": { // TODO: Implement foe loses 1/8 HP part
		shortDesc: "This Pokemon's moves of 60 power or less have 1.5x power. If the opponent uses a move with 60 power or less, they lose 1/8 maximum HP, rounded down.",
		onBasePowerPriority: 8,
		onBasePower(basePower, attacker, defender, move) {
			if (basePower <= 60) {
				this.debug('Bad Program boost');
				return this.chainModify(1.5);
			}
		},
		id: "badprogram",
		name: "Bad Program",
	},
	"foulbreath": {
		shortDesc: "This Pokemon's attacks ignore abilities. This Pokemon’s Bug-type attacks have 1.5x power.",
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Foul Breath');
		},
		onModifyMove(move) {
			move.ignoreAbility = true;
		},
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
	"galvaforce": {
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
	"pressureboost": {
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
		"chivalry": {
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
};

