export const Abilities: {[k: string]: ModdedAbilityData} = {
	//Copying Blaze
	desparation: {
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
				return this.chainModify(0.75);
			}
		},
		flags: {breakable: 1},
		name: "Last Stand",
		shortDesc: "At 1/2 or less of its max HP, this Pokemon receives 3/4 damage from attacks.",
		rating: 4,
		num: 1002,
	},
	
	//Copying Frisk and Trace
	appraisal: {
		onStart(pokemon) {
			for (const target of pokemon.foes()) {
				if (target.item) {
					this.add('-item', target, target.getItem().name, '[from] ability: Appraisal', '[of] ' + pokemon);
				}
				this.add('-ability', target, target.getItem().name, '[from] ability: Appraisal', '[of] ' + pokemon);
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
				pokemon.heal(pokemon.baseMaxhp / 4);
			}
		},
		flags: {},
		name: "Rejuvenate",
		shortDesc: "This Pokemon restores 1/4 of its max HP when switching out with 1/2 or less max HP.",
		rating: 4,
		num: 1004,
	},
	
	//Copying Harvest, maybe Recycle
	recycler: {
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			if (pokemon.hp && !pokemon.item) {
				pokemon.setItem(pokemon.lastItem);
				pokemon.lastItem = '';
				this.add('-item', pokemon, pokemon.getItem(), '[from] ability: Recycler');
			}
		},
		flags: {},
		name: "Recycler",
		shortDesc: "Restores last used item at the end of each turn.",
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
};


