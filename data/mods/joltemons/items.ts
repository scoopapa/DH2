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
	reliccharm: {
		name: "Relic Charm",
		spritenum: 390,
		onSwitchIn(pokemon) {
			if (pokemon.isActive && pokemon.baseSpecies.name === 'Meloetta') {
				pokemon.formeChange('Meloetta-Pirouette');
			}
		},
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Fighting') {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Meloetta') return false;
			return true;
		},
		itemUser: ["Meloetta"],
		num: -1005,
		gen: 8,
		desc: "If held by Meloetta: Pirouette Forme on entry, 1.2x power Fighting-type attacks.",
	},
	chillpill: {
		name: "Chill Pill",
		spritenum: 390,
		onSwitchIn(pokemon) {
			if (pokemon.isActive && pokemon.baseSpecies.name === 'Darmanitan') {
				if (!pokemon.species.name.includes('Galar')) {
					if (pokemon.species.id !== 'darmanitanzen') pokemon.formeChange('Darmanitan-Zen');
					let oldAbility = pokemon.setAbility('psychicsurge', pokemon, 'psychicsurge', true);
				} else {
					if (pokemon.species.id !== 'darmanitangalarzen') pokemon.formeChange('Darmanitan-Galar-Zen');
					let oldAbility = pokemon.setAbility('snowwarning', pokemon, 'snowwarning', true);
				}
			}
		},
		onBasePower(basePower, user, target, move) {
			if (move && (user.species.id === 'darmanitanzen') && (move.type === 'Psychic')) {
				return this.chainModify([0x1333, 0x1000]);
			}
			if (move && (user.species.id === 'darmanitangalarzen') && (move.type === 'Fire')) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Darmanitan') return false;
			return true;
		},
		itemUser: ["Darmanitan"],
		num: -1006,
		gen: 8,
		desc: "If held by Darmanitan: Zen Mode and Psychic Terrain (Unova) or Hail (Galar) on entry, 1.2x power Psychic-type (Unova) or Fire (Galar) attacks.",
	},
	"graduationscale": {
		id: "graduationscale",
		name: "Graduation Scale",
		onStart: function(pokemon) {
			this.add('-item', pokemon, 'Graduation Scale');
			if (pokemon.baseSpecies.baseSpecies === 'Wishiwashi') {
				this.add('-formechange', pokemon, 'Wishiwashi-School', '[msg]');
				pokemon.formeChange("Wishiwashi-School");
				let oldAbility = pokemon.setAbility('intimidate', pokemon, 'intimidate', true);
				if (oldAbility) {
					this.add('-activate', pokemon, 'ability: Intimidate', oldAbility, '[of] ' + pokemon);
				}
			}
		},
		onTakeItem: function(item, source) {
			if (source.baseSpecies.baseSpecies === 'Wishiwashi' || source.baseSpecies.baseSpecies === 'Wishiwashi-School') return false;
			return true;
		},
		fling: {
			basePower: 20,
		},
		onBasePowerPriority: 6,
		onBasePower: function(basePower, user, target, move) {
			if (move && (user.baseSpecies.num === 746) && (move.type === 'Water')) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		gen: 7,
		desc: "If holder is a Wishiwashi, it becomes School Form. It's ability becomes Intimidate. Water moves are boosted by 1.2x",
	},
	blunderpolicy: {
		name: "Blunder Policy",
		spritenum: 716,
		fling: {
			basePower: 80,
		},
		// Item activation located in scripts.js
		num: 1121,
		gen: 8,
		desc: "+2 Speed if the holder's move fails. Single use.",
	},
	lightball: {
		name: "Light Ball",
		spritenum: 251,
		fling: {
			basePower: 30,
			status: 'par',
		},
		onModifyAtkPriority: 1,
		onModifyAtk(atk, pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Pikachu' || pokemon.baseSpecies.baseSpecies === 'Raichu' || pokemon.baseSpecies.baseSpecies === 'Raichu-Alola' || pokemon.baseSpecies.baseSpecies === 'Togedemaru' || pokemon.baseSpecies.baseSpecies === 'Morpeko' || pokemon.baseSpecies.baseSpecies === 'Morpeko-Hangry') {
				return this.chainModify(2);
			}
		},
		onModifyDefPriority: 1,
		onModifyDef(def, pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Emolga' || pokemon.baseSpecies.baseSpecies === 'Dedenne' || pokemon.baseSpecies.baseSpecies === 'Togedemaru' || pokemon.baseSpecies.baseSpecies === 'Pachirisu') {
				return this.chainModify(2);
			}
		},
		onModifySpAPriority: 1,
		onModifySpA(spa, pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Pikachu' || pokemon.baseSpecies.baseSpecies === 'Raichu' || pokemon.baseSpecies.baseSpecies === 'Raichu-Alola' || pokemon.baseSpecies.baseSpecies === 'Plusle' || pokemon.baseSpecies.baseSpecies === 'Dedenne') {
				return this.chainModify(2);
			}
		},
		onModifySpDPriority: 1,
		onModifySpD(spd, pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Plusle' || pokemon.baseSpecies.baseSpecies === 'Minun' || pokemon.baseSpecies.baseSpecies === 'Pachirisu' || pokemon.baseSpecies.baseSpecies === 'Morpeko' || pokemon.baseSpecies.baseSpecies === 'Morpeko-Hangry') {
				return this.chainModify(2);
			}
		},
		onModifySpePriority: 1,
		onModifySpe(spe, pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Pikachu' || pokemon.baseSpecies.baseSpecies === 'Minun' || pokemon.baseSpecies.baseSpecies === 'Emolga') {
				return this.chainModify(2);
			}
		},
		itemUser: ["Pikachu", "Raichu", "Plusle", "Minun", "Emolga", "Morpeko", "Dedenne", "Togedemaru"],
		num: 236,
		gen: 2,
		desc: "If held by Pikachu, Raichu, or a Pikaclone, 2 of its stats are doubled.",
	},
	soulblade: {
		name: "Soul Blade",
		spritenum: 297,
		fling: {
			basePower: 100,
		},
		onBasePowerPriority: 16,
		onBasePower(basePower, user, target, move) {
			if (move.category === 'Physical' || move.category === 'Special') {
				return this.chainModify([0x1199, 0x1000]);
			}
		},
		gen: 8,
		desc: "(Non-functional placeholder) The holder's moves deal 1.1x damage + .2x for every KO it has.",
	},
	mentalherb: {
		name: "Mental Herb",
		spritenum: 285,
		fling: {
			basePower: 10,
			effect(pokemon) {
				const conditions = ['attract', 'taunt', 'encore', 'torment', 'disable', 'healblock', 'trashtalk'];
				for (const firstCondition of conditions) {
					if (pokemon.volatiles[firstCondition]) {
						for (const secondCondition of conditions) {
							pokemon.removeVolatile(secondCondition);
							if (firstCondition === 'attract' && secondCondition === 'attract') {
								this.add('-end', pokemon, 'move: Attract', '[from] item: Mental Herb');
							}
						}
						return;
					}
				}
			},
		},
		onUpdate(pokemon) {
			const conditions = ['attract', 'taunt', 'encore', 'torment', 'disable', 'healblock', 'trashtalk'];
			for (const firstCondition of conditions) {
				if (pokemon.volatiles[firstCondition]) {
					if (!pokemon.useItem()) return;
					for (const secondCondition of conditions) {
						pokemon.removeVolatile(secondCondition);
						if (firstCondition === 'attract' && secondCondition === 'attract') {
							this.add('-end', pokemon, 'move: Attract', '[from] item: Mental Herb');
						}
					}
					return;
				}
			}
		},
		num: 219,
		gen: 3,
	},
	morningblossom: {
		name: "Morning Blossom",
		spritenum: 297,
		fling: {
			basePower: 10,
		},
		onSwitchIn(pokemon) {
			if (pokemon.isActive && pokemon.baseSpecies.name === 'Cherrim') {
				this.field.setWeather('desolateland');
			}
		},
		onEnd(pokemon) {
			this.field.clearWeather();
		},
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Grass') {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Cherrim') return false;
			return true;
		},
		itemUser: ["Cherrim"],
		gen: 8,
		desc: "If held by Cherrim: Desolate Land on entry, 1.2x power Grass-type attacks.",
	},
	absorbbulb: {
		name: "Absorb Bulb",
		spritenum: 2,
		fling: {
			basePower: 30,
		},
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Water') {
				target.useItem();
			}
		},
		boosts: {
			def: 1,
			spa: 1,
			spd: 1,
		},
		num: 545,
		gen: 5,
		desc: "Raises holder's Def, SpA, & SpD by 1 stage if hit by a Water-type attack. Single use.",
	},
	cellbattery: {
		name: "Cell Battery",
		spritenum: 60,
		fling: {
			basePower: 30,
		},
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Electric') {
				target.useItem();
			}
		},
		boosts: {
			atk: 1,
			spe: 1,
			acc: 1,
		},
		num: 546,
		gen: 5,
		desc: "Raises holder's Atk, Spe, & Acc by 1 stage if hit by an Electric-type attack. Single use.",
	},
	luminousmoss: {
		name: "Luminous Moss",
		spritenum: 595,
		fling: {
			basePower: 30,
		},
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Grass') {
				target.useItem();
			}
		},
		boosts: {
			spa: 2,
			spd: 2,
		},
		num: 648,
		gen: 6,
		desc: "Raises holder's SpA & SpD by 2 stages if hit by a Grass-type attack. Single use.",
	},
	snowball: {
		name: "Snowball",
		spritenum: 606,
		fling: {
			basePower: 30,
		},
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Ice') {
				target.useItem();
			}
		},
		boosts: {
			atk: 2,
			def: 2,
		},
		num: 649,
		gen: 6,
		desc: "Raises holder's Atk & Def by 2 stages if hit by an Ice-type attack. Single use.",
	},
	coalengine: {
		name: "Coal Engine",
		spritenum: 297,
		fling: {
			basePower: 60,
		},
		onSwitchIn(length, pokemon) {
			if (pokemon.side.getSideCondition('stealthrock') && this.effectData.switchingIn) {
				let statName = 'atk';
				let bestStat = 0;
				let s: StatNameExceptHP;
				for (s in pokemon.storedStats) {
					if (pokemon.storedStats[s] > bestStat) {
						statName = s;
						bestStat = pokemon.storedStats[s];
					}
				}
				this.boost({[statName]: length}, pokemon);
			}
		},
		gen: 8,
		desc: "If Stealth Rock is on the field, damage is ignored, and the user's highest stat is raised by 1. Single use.",
	},
};
