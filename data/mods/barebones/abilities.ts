export const Abilities: {[k: string]: ModdedAbilityData} = {
	//Copying Blaze
	desperation: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (attacker.hp <= attacker.maxhp / 3) {
				this.debug('Desperation boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (attacker.hp <= attacker.maxhp / 3) {
				this.debug('Desparation boost');
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "Desperation",
		shortDesc: "At 1/3 or less of its max HP, this Pokemon's moves deal 1.5x damage.",
		rating: 3,
		num: 1001,
	},
	
	//Copying Solid Rock
	laststand: {
		onSourceModifyDamage(damage, source, target, move) {
			if (target.hp <= target.maxhp / 2 > 0) {
				this.debug('Last Stand neutralize');
				return this.chainModify(0.66);
			}
		},
		flags: {breakable: 1},
		name: "Last Stand",
		shortDesc: "At 1/2 or less of its max HP, this Pokemon receives 2/3 damage from attacks.",
		rating: 4,
		num: 1002,
	},
	
	//Copying Frisk and Trace
	appraisal: {
		onStart(pokemon) {
			for (const target of pokemon.foes()) {
				this.add('-ability', target, target.getAbility().name, '[from] ability: Appraisal', '[of] ' + pokemon);
				if (target.item) {
					this.add('-item', target, target.getItem().name, '[from] ability: Appraisal', '[of] ' + pokemon);
				}
			}
		},
		flags: {},
		name: "Appraisal",
		shortDesc: "On switch-in, this Pokemon identifies the held items and abilities of all opposing Pokemon.",
		rating: 3,
		num: 1003,
	},
	
	//Copying Regenerator
	rejuvenate: {
		onSwitchOut(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 2) {
				pokemon.heal(pokemon.baseMaxhp / 3);
			}
		},
		flags: {},
		name: "Rejuvenate",
		shortDesc: "This Pokemon restores 1/3 of its max HP when switching out with 1/2 or less max HP.",
		rating: 4,
		num: 1004,
	},
	
	//Copying Harvest, maybe Recycle
	recycler: {
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			if (this.randomChance(2, 3)) {
				if (pokemon.hp && !pokemon.item) {
					pokemon.setItem(pokemon.lastItem);
					pokemon.lastItem = '';
					this.add('-item', pokemon, pokemon.getItem(), '[from] ability: Recycler');
				}
			}
		},
		flags: {},
		name: "Recycler",
		shortDesc: "2/3 chance to restore last used item at the end of each turn.",
		rating: 3,
		num: 1005,
	},
	
	//Copying Sheer Force and Stench
	somewhatreckless: {
		onModifyMove(move,pokemon) {
			if (move.category !== "Status") {
				this.debug('Adding Somewhat Reckless recoil.');
				if (!move.recoil) move.recoil = [33,100];
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, attacker, defender, move) {
			return this.chainModify([5325, 4096]);
		},
		flags: {},
		name: "Somewhat Reckless",
		shortDesc: "This Pokemon's attacks have 1.3x power, but also have 33% recoil.",
		rating: 3,
		num: 1006,
	},
	
	tintedtactics: {
		onStart(pokemon) {
			pokemon.abilityState.choiceLock = "";
		},
		onBeforeMove(pokemon, target, move) {
			if (move.isZOrMaxPowered || move.id === 'struggle') return;
			if (pokemon.abilityState.choiceLock && pokemon.abilityState.choiceLock !== move.id) {
				// Fails unless ability is being ignored (these events will not run), no PP lost.
				this.addMove('move', pokemon, move.name);
				this.attrLastMove('[still]');
				this.debug("Disabled by Tinted Tactics");
				this.add('-fail', pokemon);
				return false;
			}
		},
		onModifyMove(move, pokemon) {
			if (pokemon.abilityState.choiceLock || move.isZOrMaxPowered || move.id === 'struggle') return;
			pokemon.abilityState.choiceLock = move.id;
		},
		onModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).typeMod < 0) {
				this.debug('Tinted Tactics boost');
				return this.chainModify(2);
			}
		},
		onDisableMove(pokemon) {
			if (!pokemon.abilityState.choiceLock) return;
			if (pokemon.volatiles['dynamax']) return;
			for (const moveSlot of pokemon.moveSlots) {
				if (moveSlot.id !== pokemon.abilityState.choiceLock) {
					pokemon.disableMove(moveSlot.id, false, this.effectState.sourceEffect);
				}
			}
		},
		onEnd(pokemon) {
			pokemon.abilityState.choiceLock = "";
		},
		flags: {},
		name: "Tinted Tactics",
		shortDesc: "This Pokemon's not very effective attacks deal double damage, but it gets locked into that attack.",
		rating: 4,
		num: 1007,
	},
	/*
	intimidate: {
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.adjacentFoes()) {
				if (!activated) {
					this.add('-ability', pokemon, 'Intimidate', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({atk: -1, spa: -1}, target, pokemon, null, true);
				}
			}
		},
		flags: {},
		name: "Intimidate",
		shortDesc: "On switch-in, lowers the Attack and Sp. Attack of opponents by 1 stage.",
		rating: 3.5,
		num: 22,
	},
	*/
	intimidate: {
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.adjacentFoes()) {
				if (!activated) {
					this.add('-ability', pokemon, 'Intimidate');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else if (target.volatiles['intimidate']) {
					return false;
				} else {
					target.addVolatile('intimidate');
				}
			}
		},
		condition: {
			noCopy: true,
			onStart(target) {
				this.add('-start', target, 'Intimidated');
				this.boost({atk: -1, spa: -1}, target, null);
			},
			onEnd(target) {
				this.add('-end', target, 'Intimidated');
			},
		},		
		flags: {},
		name: "Intimidate",
		shortDesc: "On switch-in, inflicts \"Intimidated\" condition on an opponent, which lowers Attack and Sp. Attack by 1 stage.",
		rating: 3.5,
		num: 22,
	},
	sceptic: {
		onSourceModifyAtkPriority: 6,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Fairy' || move.type === 'Ghost' || move.type === 'Dragon') {
				this.debug('Sceptic weaken');
				return this.chainModify(0.66);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Fairy' || move.type === 'Ghost' || move.type === 'Dragon') {
				this.debug('Sceptic weaken');
				return this.chainModify(0.66);
			}
		},
		flags: {breakable: 1},
		name: "Sceptic",
		shortDesc: "Dragon-, Fairy-, and Ghost-type attacks against this Pokemon are weakened.",
		rating: 3.5,
		num: 1008,
	},
};


