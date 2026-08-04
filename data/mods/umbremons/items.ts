export const Items: {[itemid: string]: ModdedItemData} = {
	// New Items
	
	// Adding the line `rating: 3,` should make an item display under Popular Items in the teambuilder
	// Even if an item isn't new to Umbremons, it's been requested that we do this for every item that's only here because it was submitted
	healthpack: {
		num: -1,
		onSwitchInPriority: -2,
		onStart(pokemon) {
			for (const ally of pokemon.adjacentAllies()) {
				if (!pokemon.ignoringItem() && this.heal(ally.baseMaxhp / 4, ally, pokemon)) {
					pokemon.useItem();
					return;
				}
			}
		},
		fling: {
			basePower: 30,
			effect(target, source, move) {
				this.heal(target.maxhp / 2, target, source);
			},
		},
		name: "Health Pack",
		shortDesc: "When the holder enters the field, consumes and restores 1/4 of its ally's HP",
		rating: 3,
	},
	voiceamplifier: {
		num: -2,
		name: "Voice Amplifier",
		onModifyMove(move, attacker, defender) {
			if (move.flags['sound'] && !['allAdjacent', 'allAdjacentFoes'].includes(move.target) && defender && !attacker.isAlly(defender)) {
				this.debug('Voice Amplifier modify target');
				this.add('-item', attacker, 'Voice Amplifier');
				move.target = 'allAdjacentFoes';
			}
		},
		onAfterHit(target, source, move) {
			if (move.flags['sound'] && target.status === 'slp') {
				this.add('-item', source, 'Voice Amplifier');
				target.cureStatus();
			}
		},
		fling: {
			basePower: 60,
			effect(target, source, move) {
				if (target.status === 'slp') {
					target.cureStatus();
				}
			},
		},
		shortDesc: "Holder's sound moves become spread moves and wakes targets.",
		desc: "User's sound-based moves hit both opponents and causes hit targets to wake up. This also causes them to have Spread Move reduction, and be blocked by Wide Guard/Massive.",
		rating: 3,
	},
	kimanberry: {
		num: -3,
		name: "Kiman Berry",
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Fairy",
		},
		onUpdate(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 4 || (pokemon.hp <= pokemon.maxhp / 2 &&
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
		shortDesc: "Restores 1/2 of the holder's max HP when its HP reaches 1/4 or less. Single use.",
		rating: 3,
	},
	wishbone: {
		name: "Wishbone",
		shortDesc: "When the holder faints, sets a wish on their position. Single use.",
		fling: {
			basePower: 80,
		},
		onFaint(pokemon) {
			if (pokemon.useItem()) {
				this.add('-message', pokemon.name + " made a wish!");
				pokemon.side.addSlotCondition(pokemon, 'wish');
			}
		},
		rating: 3,
	},
	// Item Adjustments
	assaultvest: {
		inherit: true,
		isNonstandard: null,
		rating: 3,
	},
	powerherb: {
		inherit: true,
		isNonstandard: null,
		rating: 3,
	},
	toxicorb: {
		inherit: true,
		isNonstandard: null,
		rating: 3,
	},
	flameorb: {
		inherit: true,
		isNonstandard: null,
		rating: 3,
	},
	loadeddice: {
		inherit: true,
		isNonstandard: null,
		rating: 3,
	},
	mirrorherb: {
		inherit: true,
		isNonstandard: null,
		fling: {
			basePower: 10,
		},
		rating: 3,
	},
	rockyhelmet: {
		inherit: true,
		isNonstandard: null,
		rating: 3,
	},
	safetygoggles: {
		inherit: true,
		isNonstandard: null,
		rating: 3,
	},
	abilityshield: {
		inherit: true,
		isNonstandard: null,
		rating: 3,
	},
	ejectpack: {
		inherit: true,
		isNonstandard: null,
		rating: 3,
		onAfterBoost(boost, target, source, effect) {
			if (this.activeMove?.id === 'partingshot') return;
			let eject = false;
			let i: BoostID;
			for (i in boost) {
				if (boost[i]! < 0) {
					eject = true;
				}
			}
			if (eject) {
				if (target.hp) {
					if (!this.canSwitch(target.side)) return;
					if (target.volatiles['commanding'] || target.volatiles['commanded']) return;
					for (const pokemon of this.getAllActive()) {
						if (pokemon.switchFlag === true) return;
					}
					this.add('-activate', target, 'Eject Pack');
					this.add('-item', target, 'Eject Pack');
					target.switchFlag = true;
				}
			}
		},
		shortDesc: "If the holder's stat stages are lowered, it switches to a chosen ally.",
		desc: "If the holder's stat stages are lowered, it switches to a chosen ally. This is no longer single use.",
	},
};
