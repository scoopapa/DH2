export const Items: {[itemid: string]: ModdedItemData} = {
	floatstone: {
		inherit: true,
    // implemented in scripts
		desc: "Holder levitates and their weight is halved.",
	},
	iapapaberry: {
		name: "Iapapa Berry",
		spritenum: 217,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Dark",
		},
		onUpdate(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 4 || (pokemon.hp <= pokemon.maxhp / 2 &&
					pokemon.hasAbility('gluttony') && pokemon.abilityState.gluttony)) {
				pokemon.eatItem();
			}
		},
		onTryEatItem(item, pokemon) {
			if (!this.runEvent('TryHeal', pokemon, null, this.effect, pokemon.baseMaxhp / 3)) return false;
		},
		onEat(pokemon) {
			this.heal(pokemon.baseMaxhp / 2);
			if (pokemon.getNature().minus === 'def') {
				pokemon.addVolatile('confusion');
			}
		},
		num: 163,
		gen: 3,
		rating: 3,
		desc: "Restores 1/2 max HP at 1/4 max HP or less; confuses if -Def Nature. Single use.",
	},
	insectplate: {
		name: "Insect Plate",
		spritenum: 223,
		onPlate: 'Bug',
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Bug') {
				return this.chainModify([4915, 4096]);
			}
		},
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 493) || pokemon.baseSpecies.num === 493) {
				return false;
			}
			return true;
		},
		onSwitchIn(pokemon) {
			if (pokemon.isActive) {
				this.add('-anim', pokemon, "Cosmic Power", pokemon);
				pokemon.formeChange('Arceus-Bug');
				pokemon.setAbility('multitype');
				this.add('-message', `${pokemon.name} turned into Arceus-Bug! Is this blasphemy?`);
				this.add('-item', pokemon, 'Insect Plate');
			}
		},
		forcedForme: "Arceus-Bug",
		num: 308,
		gen: 4,
		desc: "Holder becomes Arceus-Bug. Holder's Bug-type attacks have 1.2x power. Judgment is Bug type.",
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
 	hyperpotion: {
		name: "Hyper Potion",
		spritenum: 713,
		fling: {
			basePower: 30,
		},
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target)) {
				const bp = move.basePower;
				if (bp >= 100) {
			    this.heal(120);
				  target.useItem();
				}
			}
		},
		num: -1000,
		gen: 2,
		desc: "Holder heals 120 HP after being hit by a 100+ BP move.",
	},
};
