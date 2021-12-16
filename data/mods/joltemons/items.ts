export const Items: {[itemid: string]: ModdedItemData} = {
	boomerang: {
		name: "Boomerang",
		fling: {
			basePower: 120,
		},
		num: -1001,
		gen: 8,
		desc: "Comes back to the user when flung.", 
	},
 momentumarmor: {
        name: "Momentum Armor",
        fling: {
            basePower: 80,
        },
        onModifyAtkPriority: 1,
        onModifyAtk(atk, pokemon) {
          const def = pokemon.getStat('def', false, true);
          const newAtk = atk + (def / 4);
          return newAtk;
        },
        num: -1002,
        gen: 8,
        desc: "Boosts the user's Attack by 25% of its Defense.", 
    },
 	shellbell: {
		name: "Shell Bell",
		spritenum: 438,
		fling: {
			basePower: 40,
		},
		onAfterMoveSecondarySelfPriority: -1,
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (move.category !== 'Status') {
			this.heal(pokemon.baseMaxhp / 8);
			}
		},
		num: 253,
		gen: 3,
		desc: "The holder heals 12.5% of their max HP upon successfully damaging a Pokemon with an attack.", 
	},
	honey: {
		name: "Honey",
		fling: {
			basePower: 30,
		},
		num: -1003,
		gen: 4,
    shortDesc: "Pokemon with the ability Honey Gather or Sweet Veil heal 12.5% when holding this item.",
	},
	eviolith: {
		name: "Eviolith",
		spritenum: 130,
		fling: {
			basePower: 40,
		},
		onModifyAtkPriority: 2,
		onModifyAtk(atk, pokemon) {
			if (pokemon.baseSpecies.nfe) {
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 2,
		onModifySpA(spa, pokemon) {
			if (pokemon.baseSpecies.nfe) {
				return this.chainModify(1.5);
			}
		},
     num: -1004,
     gen: 8,
     desc: "If holder's species can evolve, its Atk and Sp. Atk are 1.5x.",
	},
};
