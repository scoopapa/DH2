export const Items: {[itemid: string]: ModdedItemData} = {
	aguavberry: {
		name: "Aguav Berry",
		spritenum: 5,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Dragon",
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
			this.heal(pokemon.baseMaxhp / 3);
			if (pokemon.getNature().minus === 'spd') {
				pokemon.trySetStatus('cfs', pokemon);
			}
		},
		num: 162,
		gen: 3,
		rating: 3,
	},
	choiceband: {
		name: "Choice Band",
		spritenum: 68,
		fling: {
			basePower: 10,
		},
		onStart(pokemon) {
			if (pokemon.volatiles['choicelock']) {
				this.debug('removing choicelock: ' + pokemon.volatiles['choicelock']);
			}
			pokemon.removeVolatile('choicelock');
		},
		onModifyMove(move, pokemon) {
			pokemon.addVolatile('choicelock');
		},
		onModifyAtkPriority: 1,
		onModifyAtk(atk, pokemon) {
			if (pokemon.volatiles['dynamax']) return;
			return this.chainModify(1.3);
		},
		isChoice: true,
		num: 220,
		desc: "Holder's Attack is 1.3x, but it can only select the first attack it uses upon switch-in.",
		rating: 3,
		gen: 3,
	},
	choicespecs: {
		name: "Choice Specs",
		spritenum: 70,
		fling: {
			basePower: 10,
		},
		onStart(pokemon) {
			if (pokemon.volatiles['choicelock']) {
				this.debug('removing choicelock: ' + pokemon.volatiles['choicelock']);
			}
			pokemon.removeVolatile('choicelock');
		},
		onModifyMove(move, pokemon) {
			pokemon.addVolatile('choicelock');
		},
		onModifySpAPriority: 1,
		onModifySpA(spa, pokemon) {
			if (pokemon.volatiles['dynamax']) return;
			return this.chainModify(1.3);
		},
		isChoice: true,
		num: 297,
		desc: "Holder's Special Attack is 1.3x, but it can only select the first attack it uses upon switch-in.",
		gen: 4,
		rating: 3,
	},
	figyberry: {
			name: "Figy Berry",
			spritenum: 140,
			isBerry: true,
			naturalGift: {
				basePower: 80,
				type: "Bug",
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
				this.heal(pokemon.baseMaxhp / 3);
				if (pokemon.getNature().minus === 'atk') {
					pokemon.trySetStatus('cfs', pokemon);
				}
			},
			num: 159,
			gen: 3,
			rating: 3,
		},
	flameorb: {
		name: "Flame Orb",
		spritenum: 145,
		fling: {
			basePower: 30,
			volatilestatus: 'burn',
		},
		onResidualOrder: 28,
		onResidualSubOrder: 3,
		onResidual(pokemon) {
			pokemon.addVolatile('burn');
		},
		num: 273,
		gen: 4,
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
				this.heal(pokemon.baseMaxhp / 3);
				if (pokemon.getNature().minus === 'def') {
					pokemon.trySetStatus('cfs', pokemon);
				}
			},
			num: 163,
			gen: 3,
			rating: 3,
		},
	lifeorb: {
		name: "Life Orb",
		spritenum: 249,
		fling: {
			basePower: 30,
		},
		onModifyDamage(damage, source, target, move) {
			return this.chainModify([5324, 4096]);
		},
		onAfterMoveSecondarySelf(source, target, move) {
			if (source && source !== target && move && move.category !== 'Status' && !source.forceSwitchFlag) {
				this.damage(source.baseMaxhp / 8, source, source, this.dex.items.get('lifeorb'));
			}
		},
		num: 270,
		desc: "Holder's attacks have 1.3x power, but it takes 1/8 damage after each attack.",
		gen: 4,
		rating: 3,
	},
	lightball: {
		name: "Light Ball",
		spritenum: 251,
		fling: {
			basePower: 30,
		},
		onModifyAtkPriority: 1,
		onModifyAtk(atk, pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Pikachu') {
				return this.chainModify(2);
			}
		},
		onModifySpAPriority: 1,
		onModifySpA(spa, pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Pikachu') {
				return this.chainModify(2);
			}
		},
		itemUser: ["Pikachu", "Pikachu-Cosplay", "Pikachu-Rock-Star", "Pikachu-Belle", "Pikachu-Pop-Star", "Pikachu-PhD", "Pikachu-Libre", "Pikachu-Original", "Pikachu-Hoenn", "Pikachu-Sinnoh", "Pikachu-Unova", "Pikachu-Kalos", "Pikachu-Alola", "Pikachu-Partner", "Pikachu-Starter", "Pikachu-World"],
		num: 236,
		gen: 2,
	},
	lumberry: {
		name: "Lum Berry",
		spritenum: 262,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Flying",
		},
		onAfterSetStatusPriority: -1,
		onAfterSetStatus(status, pokemon) {
			pokemon.eatItem();
		},
		onUpdate(pokemon) {
			if (pokemon.status || pokemon.volatiles['burn']) {
				pokemon.eatItem();
			}
		},
		onEat(pokemon) {
			pokemon.cureStatus();
			pokemon.removeVolatile('burn');
		},
		num: 157,
		gen: 3,
	},
	magoberry: {
		name: "Mago Berry",
		spritenum: 274,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Ghost",
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
			this.heal(pokemon.baseMaxhp / 3);
			if (pokemon.getNature().minus === 'spe') {
				pokemon.trySetStatus('cfs', pokemon);
			}
		},
		num: 161,
		gen: 3,
		rating: 3,
	},
	persimberry: {
		name: "Persim Berry",
		spritenum: 334,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Ground",
		},
		onUpdate(pokemon) {
					if (pokemon.status === 'cfs') {
						pokemon.eatItem();
					}
				},
				onEat(pokemon) {
					if (pokemon.status === 'cfs') {
						pokemon.cureStatus();
					}
				},
		num: 156,
		gen: 3,
		rating: 1,
	},
	rawstberry: {
		name: "Rawst Berry",
		spritenum: 381,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Grass",
		},
		onUpdate(pokemon) {
			if (pokemon.volatiles['burn']) {
				pokemon.eatItem();
			}
		},
		onEat(pokemon) {
			if (target.volatiles['burn']) {
				pokemon.removeVolatile('burn');
			}
		},
		num: 152,
		gen: 3,
		rating: 1,
	},
	toxicorb: {
		name: "Toxic Orb",
		spritenum: 515,
		fling: {
			basePower: 30,
			status: 'psn',
		},
		onResidualOrder: 28,
		onResidualSubOrder: 3,
		onResidual(pokemon) {
			pokemon.trySetStatus('psn', pokemon);
		},
		num: 272,
		desc: "Attempts to Poison the holder at the end of each turn.",
		gen: 4,
	},
	wikiberry: {
			name: "Wiki Berry",
			spritenum: 538,
			isBerry: true,
			naturalGift: {
				basePower: 80,
				type: "Rock",
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
				this.heal(pokemon.baseMaxhp / 3);
				if (pokemon.getNature().minus === 'spa') {
					pokemon.trySetStatus('cfs', pokemon);
				}
			},
			num: 160,
			gen: 3,
			rating: 3,
		},
};
