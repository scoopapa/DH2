'use strict';

/**@type {{[k: string]: AbilityData}} */
let BattleAbilities = {

psychozone: {
		desc: "This Pokemon's Normal-type moves become Psychic-type moves and have their power multiplied by 1.2. This effect comes after other effects that change a move's type, but before Ion Deluge and Electrify's effects.",
		shortDesc: "This Pokemon's Normal-type moves become Psychic type and have 1.2x power.",
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			if (move.type === 'Normal' && !['judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'weatherball'].includes(move.id) && !(move.isZ && move.category !== 'Status')) {
				move.type = 'Psychic';
				move.psychozoneBoosted = true;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.psychozoneBoosted) return this.chainModify([0x1333, 0x1000]);
		},
		id: "psychozone",
		name: "Psycho Zone",
		rating: 4,
	},
corrosivepincers: {
		shortDesc: "This Pokemon's moves have their secondary effect chance doubled.",
		onModifyMovePriority: -2,
		onModifyMove(move) {
			if (move.secondaries) {
				this.debug('doubling secondary chance');
				for (const secondary of move.secondaries) {
					if (secondary.chance) secondary.chance *= 2;
				}
			}
		},
		id: "corrosivepincers",
		name: "Corrosive Pincers",
		rating: 3.5,
		num: 32,
	},
 contaminate: {
		shortDesc: "On switch-in, this Pokemon lowers the SpD of adjacent opponents by 1 stage.",
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.side.foe.active) {
				if (!target || !this.isAdjacent(target, pokemon)) continue;
				if (!activated) {
					this.add('-ability', pokemon, 'Contaminate', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else if (target.hasAbility(['Inner Focus', 'Oblivious', 'Own Tempo', 'Scrappy'])) {
					this.add('-immune', target, `[from] ability: ${target.getAbility().name}`);
				} else {
					this.boost({spd: -1}, target, pokemon, null, true);
				}
			}
		},
		id: "contaminate",
		name: "Contaminate",
		rating: 3.5,
		num: 22,
	},
  	persistent: {
		desc: "The duration of Gravity, Heal Block, Magic Room, Safeguard, Tailwind, Trick Room, and Wonder Room is increased by 2 turns if the effect is started by this Pokemon.",
		shortDesc: "When used, Gravity/Heal Block/Safeguard/Tailwind/Room effects last 2 more turns.",
		id: "persistent",
		isNonstandard: "CAP",
		name: "Persistent",
		// implemented in the corresponding move
		rating: 3,
		num: -4,
	},
  lightpower: {
		shortDesc: "This Pokemon's Attack is doubled.",
		onModifyAtkPriority: 5,
		onModifyAtk(atk) {
			return this.chainModify(2);
		},
	  onModifySpA(spa) {
			return this.chainModify(2);
		},
		id: "lightpower",
		name: "Light Power",
		rating: 5,
		num: 74,
	},
  
};

