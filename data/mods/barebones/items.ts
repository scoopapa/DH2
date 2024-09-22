export const Items: {[itemid: string]: ModdedItemData} = {
	pinchberry: {
		name: "Pinch Berry",
		shortDesc: "Restores 1/2 max HP at 1/3 max HP or less. Single use.",
		spritenum: 448,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Stellar",
		},
		onUpdate(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 3 || (pokemon.hp <= pokemon.maxhp / 2 &&
					pokemon.hasAbility('gluttony') && pokemon.abilityState.gluttony)) {
				pokemon.eatItem();
			}
		},
		onTryEatItem(item, pokemon) {
			if (!this.runEvent('TryHeal', pokemon, null, this.effect, pokemon.baseMaxhp / 2)) return false;
		},
		onEat(pokemon) {
			this.heal(pokemon.baseMaxhp / 2);
		},
		num: 1001,
		gen: 9,
		rating: 3,
	},
	
	tsersiberry: {
		name: "Tsersi Berry",
		shortDesc: "Halves damage taken from a super-effective attack. Single use.",
		spritenum: 124,
		isBerry: true,
		naturalGift: {
			basePower: 100,
			type: "Stellar",
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
		onEat() { },
		num: 1002,
		gen: 9,
		rating: 3,
	},
	
	//To get allowed items to show up higher
	silkscarf: {
		inherit: true,
		rating: 3,
	},	
	charcoal: {
		inherit: true,
		rating: 3,
	},	
	mysticwater: {
		inherit: true,
		rating: 3,
	},	
	miracleseed: {
		inherit: true,
		rating: 3,
	},	
	magnet: {
		inherit: true,
		rating: 3,
	},	
	nevermeltice: {
		inherit: true,
		rating: 3,
	},
	blackbelt: {
		inherit: true,
		rating: 3,
	},	
	poisonbarb: {
		inherit: true,
		rating: 3,
	},	
	softsand: {
		inherit: true,
		rating: 3,
	},	
	sharpbeak: {
		inherit: true,
		rating: 3,
	},	
	twistedspoon: {
		inherit: true,
		rating: 3,
	},	
	silverpowder: {
		inherit: true,
		rating: 3,
	},	
	hardstone: {
		inherit: true,
		rating: 3,
	},	
	spelltag: {
		inherit: true,
		rating: 3,
	},
	dragonfang: {
		inherit: true,
		rating: 3,
	},	
	blackglasses: {
		inherit: true,
		rating: 3,
	},
	metalcoat: {
		inherit: true,
		rating: 3,
	},
	fairyfeather: {
		inherit: true,
		rating: 3,
	},
	
	//Just to hide items away (mainly Popular Items, and some others), they are already banned in config/format.ts
	lifeorb: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},	
	choicescarf: {
		inherit: true,
		isNonstandard: 'Unobtainable', 
	},	
	choiceband: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},	
	choicespecs: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},	
	heavydutyboots: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},	
	assaultvest: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},	
	rockyhelmet: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},	
	focussash: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},	
	eviolite: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},	
	expertbelt: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},	
	salacberry: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},	
	aguavberry: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},	
	figyberry: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},	
	iapapaberry: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},	
	magoberry: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},	
	wikiberry: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},	
	powerherb: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},	
	mentalherb: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
};



