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
			}
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
		shortDesc: "Holder's sound moves become spread moves and wakes targets.",
		desc: "User's sound-based moves hit both opponents and causes hit targets to wake up. This also causes them to have Spread Move reduction, and be blocked by Wide Guard/Massive.",
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
};
