export const Abilities: {[k: string]: ModdedAbilityData} = {
	
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
		num: 200.01,
	},
	
	//Copying Harvest, maybe Recycle
	recycler: {
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			if (this.randomChance(3, 5)) {
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
		num: 200.02,
	},
	
	//Copying Sheer Force and Stench
	somewhatreckless: {
		onModifyMove(move,pokemon) {
			if (move.category !== "Status") {
				this.debug('Adding Somewhat Reckless recoil.');
				if (!move.recoil) move.recoil = [25,100];
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, attacker, defender, move) {
			return this.chainModify([5325, 4096]);
		},
		flags: {},
		name: "Somewhat Reckless",
		shortDesc: "This Pokemon's attacks have 1.3x power, but also have 25% recoil.",
		rating: 3,
		num: 200.03,
	},
	
	dauntless: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (attacker.hp <= 4 * attacker.maxhp / 10) {
				this.debug('Dauntless boost');
				return this.chainModify(1.5);
			} else if (attacker.hp <= 7 * attacker.maxhp / 10) {
				this.debug('Dauntless boost');
				return this.chainModify(1.25);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (attacker.hp <= 4 * attacker.maxhp / 10) {
				this.debug('Dauntless boost');
				return this.chainModify(1.5);
			} else if (attacker.hp <= 7 * attacker.maxhp / 10) {
				this.debug('Dauntless boost');
				return this.chainModify(1.25);
			}
		},
		flags: {},
		name: "Dauntless",
		shortDesc: "Attack power increases as HP decreases.",
		rating: 3,
		num: 200.04,
	},
	
	resilient: {
		onSourceModifyDamage(damage, source, target, move) {
			if (target.hp <= 4 * target.maxhp / 10 > 0) {
				this.debug('Resilient weaken');
				return this.chainModify(0.5);
			} else if (target.hp <= 7 * target.maxhp / 10) {
				this.debug('Resilient weaken');
				return this.chainModify(0.75);
			}
		},
		flags: {breakable: 1},
		name: "Resilient",
		shortDesc: "Takes less damage as HP decreases.",
		rating: 3,
		num: 200.05,
	},
	
	prickly: {
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			this.damage(source.baseMaxhp / 10, source, target);
		},
		flags: {},
		name: "Prickly",
		shortDesc: "Attackers take 1/10 HP as damage.",
		rating: 4,
		num: 200.06,
	},
	
	gambler: {
		onBasePower(basePower, pokemon) {
			if (this.randomChance(3, 10)) {
				this.add('-activate', pokemon, 'Win');
				return this.chainModify(2);
			} else if (this.randomChance(1, 40)) {
				this.add('-activate', pokemon, 'Jackpot');
				return this.chainModify(5);
			}
		},
		flags: {},
		name: "Gambler",
		shortDesc: "Attacks have a chance to deal more damage.",
		rating: 3,
		num: 200.07,
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
	
	denigrate: {
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.adjacentFoes()) {
				if (!activated) {
					this.add('-ability', pokemon, 'Denigrate', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({spa: -1}, target, pokemon, null, true);
				}
			}
		},
		flags: {},
		name: "Denigrate",
		shortDesc: "On switch-in, lowers the Sp. Attack of opponents by 1 stage.",
		rating: 3.5,
		num: 200.08,
	},
	
	faster: {
		onModifySpe(spe, pokemon) {
			return this.chainModify(1.5);
		},
		flags: {},
		name: "Faster",
		shortDesc: "User's speed is boosted by 1.5x.",
		num: 200.09,
	},
	
	hookline: {
		/*
		onTryImmunity(target, source) {
			return target.hasType(source.getTypes());
		},
		*/
		onFoeTrapPokemon(pokemon) {
			if (this.effectState.target.hasType(pokemon.getTypes()) && pokemon.isAdjacent(this.effectState.target)) {
				pokemon.tryTrap(true);
			}
		},
		onFoeMaybeTrapPokemon(pokemon, source) {
			if (!source) source = this.effectState.target;
			if (!source || !pokemon.isAdjacent(source)) return;
			if (!pokemon.knownType) {
				pokemon.maybeTrapped = true;
			}
		},
		flags: {},
		name: "Hook Line",
		shortDesc: "Traps foes that share a type with the user.",
		rating: 4,
		num: 200.09,
	},
};