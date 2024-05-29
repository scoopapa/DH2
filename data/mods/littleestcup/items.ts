export const Items: {[itemid: string]: ItemData} = {
	abilityshield: {
		name: "Ability Shield",
		spritenum: 746,
		fling: {
			basePower: 30,
		},
		ignoreKlutz: true,
		// Neutralizing Gas protection implemented in Pokemon.ignoringAbility() within sim/pokemon.ts
		// and in Neutralizing Gas itself within data/abilities.ts
		onSetAbility(ability, target, source, effect) {
			if (effect && effect.effectType === 'Ability' && effect.name !== 'Trace') {
				this.add('-ability', source, effect);
			}
			this.add('-block', target, 'item: Ability Shield');
			return null;
		},
		// Mold Breaker protection implemented in Battle.suppressingAbility() within sim/battle.ts
		num: 1881,
		gen: 9,
	},
	abomasite: {
		name: "Abomasite",
		spritenum: 575,
		megaStone: "Abomasnow-Mega",
		megaEvolves: "Abomasnow",
		itemUser: ["Abomasnow"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 674,
		gen: 6,
		isNonstandard: "Past",
	},
	absolite: {
		name: "Absolite",
		spritenum: 576,
		megaStone: "Absol-Mega",
		megaEvolves: "Absol",
		itemUser: ["Absol"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 677,
		gen: 6,
		isNonstandard: "Past",
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
			spa: 1,
		},
		num: 545,
		gen: 5,
	},
	adamantcrystal: {
		name: "Adamant Crystal",
		spritenum: 741,
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (user.baseSpecies.num === 483 && (move.type === 'Steel' || move.type === 'Dragon')) {
				return this.chainModify([4915, 4096]);
			}
		},
		onTakeItem(item, pokemon, source) {
			if (source?.baseSpecies.num === 483 || pokemon.baseSpecies.num === 483) {
				return false;
			}
			return true;
		},
		forcedForme: "Dialga-Origin",
		itemUser: ["Dialga-Origin"],
		num: 1777,
		gen: 8,
	},
	adamantorb: {
		name: "Adamant Orb",
		spritenum: 4,
		fling: {
			basePower: 60,
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (user.baseSpecies.num === 483 && (move.type === 'Steel' || move.type === 'Dragon')) {
				return this.chainModify([4915, 4096]);
			}
		},
		itemUser: ["Dialga"],
		num: 135,
		gen: 4,
	},
	adrenalineorb: {
		name: "Adrenaline Orb",
		spritenum: 660,
		fling: {
			basePower: 30,
		},
		onAfterBoost(boost, target, source, effect) {
			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0
			if (target.boosts['spe'] === 6 || boost.atk === 0) {
				return;
			}
			if (effect.name === 'Intimidate') {
				target.useItem();
			}
		},
		boosts: {
			spe: 1,
		},
		num: 846,
		gen: 7,
	},
	aerodactylite: {
		name: "Aerodactylite",
		spritenum: 577,
		megaStone: "Aerodactyl-Mega",
		megaEvolves: "Aerodactyl",
		itemUser: ["Aerodactyl"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 672,
		gen: 6,
		isNonstandard: "Past",
	},
	aggronite: {
		name: "Aggronite",
		spritenum: 578,
		megaStone: "Aggron-Mega",
		megaEvolves: "Aggron",
		itemUser: ["Aggron"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 667,
		gen: 6,
		isNonstandard: "Past",
	},
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
			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0
		onTryEatItem(item, pokemon) {
			if (!this.runEvent('TryHeal', pokemon, null, this.effect, pokemon.baseMaxhp / 3)) return false;
		},
		onEat(pokemon) {
			this.heal(pokemon.baseMaxhp / 3);
			if (pokemon.getNature().minus === 'spd') {
				pokemon.addVolatile('confusion');
			}
		},
		num: 162,
		gen: 3,
		rating: 3,
	},
	airballoon: {
		name: "Air Balloon",
		spritenum: 6,
		fling: {
			basePower: 10,
		},
		onStart(target) {
			if (!target.ignoringItem() && !this.field.getPseudoWeather('gravity')) {
				this.add('-item', target, 'Air Balloon');
			}
		},
		// airborneness implemented in sim/pokemon.js:Pokemon#isGrounded
		// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
		// which deletes boost.atk,
		// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
		// which sets boost.atk to 0
		onDamagingHit(damage, target, source, move) {
			this.add('-enditem', target, 'Air Balloon');
			target.item = '';
			target.itemState = {id: '', target};
			this.runEvent('AfterUseItem', target, null, null, this.dex.items.get('airballoon'));
		},
		onAfterSubDamage(damage, target, source, effect) {
			this.debug('effect: ' + effect.id);
			if (effect.effectType === 'Move') {
				this.add('-enditem', target, 'Air Balloon');
				target.item = '';
				target.itemState = {id: '', target};
				this.runEvent('AfterUseItem', target, null, null, this.dex.items.get('airballoon'));
			}
		},
		num: 541,
		gen: 5,
	},
	alakazite: {
		name: "Alakazite",
		spritenum: 579,
		megaStone: "Alakazam-Mega",
		megaEvolves: "Alakazam",
		itemUser: ["Alakazam"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 679,
		gen: 6,
		isNonstandard: "Past",
	},
	aloraichiumz: {
		name: "Aloraichium Z",
		spritenum: 655,
		onTakeItem: false,
		zMove: "Stoked Sparksurfer",
		zMoveFrom: "Thunderbolt",
		itemUser: ["Raichu-Alola"],
		num: 803,
		gen: 7,
		isNonstandard: "Past",
	},
	altarianite: {
		name: "Altarianite",
		spritenum: 615,
		megaStone: "Altaria-Mega",
		megaEvolves: "Altaria",
		itemUser: ["Altaria"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 755,
		gen: 6,
		isNonstandard: "Past",
	},
			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0
	ampharosite: {
		name: "Ampharosite",
		spritenum: 580,
		megaStone: "Ampharos-Mega",
		megaEvolves: "Ampharos",
		itemUser: ["Ampharos"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 658,
		gen: 6,
		isNonstandard: "Past",
	},
	apicotberry: {
		name: "Apicot Berry",
		spritenum: 10,
		isBerry: true,
		naturalGift: {
			basePower: 100,
			type: "Ground",
		},
		onUpdate(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 4 || (pokemon.hp <= pokemon.maxhp / 2 &&
					pokemon.hasAbility('gluttony') && pokemon.abilityState.gluttony)) {
				pokemon.eatItem();
			}
		},
		onEat(pokemon) {
			this.boost({spd: 1});
		},
		num: 205,
		gen: 3,
	},
	armorfossil: {
		name: "Armor Fossil",
		spritenum: 12,
		fling: {
			basePower: 100,
		},
		num: 104,
		gen: 4,
		rating: 0,
		isNonstandard: "Past",
	},
	aspearberry: {
		name: "Aspear Berry",
		spritenum: 13,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Ice",
		},
		onUpdate(pokemon) {
			if (pokemon.status === 'frz') {
				pokemon.eatItem();
			}
		},
		onEat(pokemon) {
			if (pokemon.status === 'frz') {
				pokemon.cureStatus();
			}
		},
		num: 153,
		gen: 3,
		rating: 1,
	},
	assaultvest: {
		name: "Assault Vest",
		spritenum: 581,
		fling: {
			basePower: 80,
		},
		onModifyDefPriority: 1,
		onModifyDef(def) {
			return this.chainModify(1.5);
		},
		onDisableMove(pokemon) {
			for (const moveSlot of pokemon.moveSlots) {
				const move = this.dex.moves.get(moveSlot.id);
				if (move.category === 'Status' && move.id !== 'mefirst') {
					pokemon.disableMove(moveSlot.id);
				}
			}
		},
		shortDesc: "Holder's Def is 1.5x, but it can only select damaging moves.",
		num: 640,
		gen: 6,
		rating: 3,
	},
	audinite: {
		name: "Audinite",
		spritenum: 617,
		megaStone: "Audino-Mega",
		megaEvolves: "Audino",
		itemUser: ["Audino"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 757,
		gen: 6,
		isNonstandard: "Past",
	},
			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0
			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0
	auspiciousarmor: {
		name: "Auspicious Armor",
		spritenum: 753,
		fling: {
			basePower: 30,
		},
		num: 2344,
		gen: 9,
		rating: 0,
	},
	babiriberry: {
		name: "Babiri Berry",
		spritenum: 17,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Steel",
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Steel' && target.getMoveHitData(move).typeMod > 0) {
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
		num: 199,
		gen: 4,
	},
	banettite: {
		name: "Banettite",
		spritenum: 582,
		megaStone: "Banette-Mega",
		megaEvolves: "Banette",
		itemUser: ["Banette"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 668,
		gen: 6,
		isNonstandard: "Past",
	},
/*
[CENTER]:sm/wishiwashi:
[B][COLOR=rgb(41, 105, 176)][SIZE=7]Solomods Megathread[/SIZE][/COLOR]

Welcome to the Solomods Megathread![/B]
The purpose of this thread is simple: much like a tier's [URL='https://www.smogon.com/forums/threads/swsh-ou-bazaar.3656490/']Team Bazaar[/URL] thread, you can post your very own personal Solomods here in a casual environment and have other discuss and give feedback on them and maybe even get them coded!

[B][I]What's a Solomod?[/I][/B]
A Solomod is a Pet Mod where multiple changes are made to the game, usually changing the stuff about most pre-existing Pokémon, adding moves, items, and abilities, and even changing mechanics, that don't have any preset rules and, most importantly, are controlled by and have all of their changes applied by a single person or small group of people. Mods that don't quite fit as either Pet Mods or Other Metagames also generally fit here.

[B][I]Rules of the Thread[/I][/B]
A full list of rules for this thread and the subforum as a whole can be found [URL='https://www.smogon.com/forums/threads/solomods-rules-regulations.3711004/'][B]HERE[/B][/URL], but in general:

1. All initial Solomod submissions must go here unless you have been approved to have a thread for your Solomod.

2. Only 2 Solomods can be active per person in this thread. Solomods with their own threads do not contribute to this total. You must wait 7 days after posting a new Solomod to retire it or post another one.

3. If you want to post a third Solomod, you must retire one of your two active Solomods and wait 7 days to post the new one.

4. Be respectful when discussing other people's Solomods.

[/CENTER]
While not required, it's recommended that you use the following template when posting a Solomod:
[HIDE=Submission Template]
[B]Name of Mod[/B]: (Doesn't have to be super creative, can literally just be something simple like "Yoshiblaze's Solomod")
[B]Mascot [/B](Optional): (An optional setting that allows a Pokemon icon sprite (or Fakemon icon sprite if you have it) to be associated with the mod to make an archival listing look pretty.)
[B]Link to Changes[/B]: (Recommended that all changes are placed into a neat and easy to follow Google Sheets document or something similar)
[B]Summary of the Mod[/B]: (State what changes in general, any special gimmicks, your mindset when creating it, etc.)
[B]Competitive Overview[/B] (Optional): (Share some theorymonned competitive sets and/or give an overview of what the metagame could be like)
[/HIDE]

[CENTER]That's all! Have fun sharing your ideas!

-

If you have any questions, please reach out to one of the Pet Mods moderators, [USER=328384]AquaticPanic[/USER], [USER=364743]DuoM2[/USER], [USER=14742]Scoopapa[/USER],  or [USER=328142]Yoshiblaze[/USER]

-

[B][U]Links[/U][/B]
[URL='https://www.smogon.com/forums/threads/solomods-index.3711009/']Index[/URL]
[URL='https://discord.gg/dBwTQRgJPq']Discord[/URL]
[/CENTER]
*/
	beastball: {
		name: "Beast Ball",
		spritenum: 661,
		num: 851,
		gen: 7,
		isPokeball: true,
	},
	beedrillite: {
		name: "Beedrillite",
		spritenum: 628,
		megaStone: "Beedrill-Mega",
		megaEvolves: "Beedrill",
		itemUser: ["Beedrill"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 770,
		gen: 6,
		isNonstandard: "Past",
	},
	belueberry: {
		name: "Belue Berry",
		spritenum: 21,
		isBerry: true,
		naturalGift: {
			basePower: 100,
			type: "Electric",
		},
		onEat: false,
		num: 183,
		gen: 3,
		isNonstandard: "Past",
		rating: 0,
	},
	berryjuice: {
		name: "Berry Juice",
		spritenum: 22,
		fling: {
			basePower: 30,
		},
		onUpdate(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 2) {
				if (this.runEvent('TryHeal', pokemon, null, this.effect, 20) && pokemon.useItem()) {
					this.heal(20);
				}
			}
		},
		num: 43,
		gen: 2,
		isNonstandard: "Past",
		rating: 3,
	},
	berrysweet: {
		name: "Berry Sweet",
		spritenum: 706,
		fling: {
			basePower: 10,
		},
		num: 1111,
		gen: 8,
		rating: 0,
	},
	bignugget: { // it's the tr for overheat
		name: "Big Nugget",
		spritenum: 27,
		fling: {
			basePower: 130,
		},
		num: 581,
		gen: 5,
		rating: 0,
	},
	bigroot: {
		name: "Big Root",
		spritenum: 29,
		fling: {
			basePower: 10,
		},
		onTryHealPriority: 1,
		onTryHeal(damage, target, source, effect) {
			const heals = ['drain', 'leechseed', 'ingrain', 'aquaring', 'strengthsap'];
			if (heals.includes(effect.id)) {
				return this.chainModify([5324, 4096]);
			}
		},
		num: 296,
		gen: 4,
		rating: 1,
	},
	bindingband: {
		name: "Binding Band",
		spritenum: 31,
		fling: {
			basePower: 30,
		},
		// implemented in statuses
		num: 544,
		gen: 5,
		rating: 1,
	},
	blackbelt: {
		name: "Black Belt",
		spritenum: 32,
		fling: {
			basePower: 30,
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Fighting') {
				return this.chainModify([4915, 4096]);
			}
		},
		num: 241,
		gen: 2,
	},
	blackglasses: {
		name: "Black Glasses",
		spritenum: 35,
		fling: {
			basePower: 30,
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Dark') {
				return this.chainModify([4915, 4096]);
			}
		},
		num: 240,
		gen: 2,
	},
	blacksludge: {
		name: "Black Sludge",
		spritenum: 34,
		fling: {
			basePower: 30,
		},
		onResidualOrder: 5,
		onResidualSubOrder: 4,
		onResidual(pokemon) {
			if (pokemon.hasType('Poison')) {
				this.heal(pokemon.baseMaxhp / 8);
			} else {
				this.damage(pokemon.baseMaxhp / 8);
			}
		},
		shortDesc: "Each turn, if holder is a Poison type, restores 1/8 max HP; loses 1/8 if not.",
		num: 281,
		gen: 4,
	},
		// implemented in statuses
		// implemented in statuses
		// implemented in statuses
		// implemented in statuses
		// implemented in statuses
		// implemented in statuses
		// implemented in statuses
		// implemented in statuses
		// implemented in statuses
		// implemented in statuses
		// implemented in statuses
		// implemented in statuses
		// implemented in statuses
		// implemented in statuses
		// implemented in statuses
		// implemented in statuses
		// implemented in statuses
		// implemented in statuses
		// implemented in statuses
		// implemented in statuses
		// implemented in statuses
		// implemented in statuses
		// implemented in statuses
		// implemented in statuses
		// implemented in statuses
		// implemented in statuses
		// implemented in statuses
		// implemented in statuses
		// implemented in statuses
		// implemented in statuses
		// implemented in statuses
		// implemented in statuses
		// implemented in statuses
		// implemented in statuses
		// implemented in statuses
		// implemented in statuses
		// implemented in statuses
		// implemented in statuses
		// implemented in statuses
		// implemented in statuses
		// implemented in statuses
		// implemented in statuses
	blastoisinite: {
		name: "Blastoisinite",
		spritenum: 583,
		megaStone: "Blastoise-Mega",
		megaEvolves: "Blastoise",
		itemUser: ["Blastoise"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 661,
		gen: 6,
		isNonstandard: "Past",
	},
	blazikenite: {
		name: "Blazikenite",
		spritenum: 584,
		megaStone: "Blaziken-Mega",
		megaEvolves: "Blaziken",
		itemUser: ["Blaziken"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 664,
		gen: 6,
		isNonstandard: "Past",
	},
	blueorb: {
		name: "Blue Orb",
		spritenum: 41,
		onSwitchIn(pokemon) {
			if (pokemon.isActive && pokemon.baseSpecies.name === 'Kyogre') {
				this.queue.insertChoice({choice: 'runPrimal', pokemon: pokemon});
			}
		},
		onPrimal(pokemon) {
			pokemon.formeChange('Kyogre-Primal', this.effect, true);
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Kyogre') return false;
			return true;
		},
		itemUser: ["Kyogre"],
		num: 535,
		gen: 6,
		isNonstandard: "Past",
	},
/*
[CENTER][SIZE=1]Approved by the Pet Mods Moderators[/SIZE]
:sm/vaporeon:
[B][COLOR=rgb(41, 105, 176)]VaporeMons Bo3 Tournament[/COLOR]
Host[/B]: [USER=328142]Yoshiblaze[/USER][/CENTER]

Welcome to the first ever VaporeMons forum tournament! This tournament will serve as the grand finale to VaporeMons' time on the main server as it comes to an end at the end of the month, so we'd like to take one more good look at the metagame we've built before we go!

[I][B]What is VaporeMons?[/B][/I]
VaporeMons is a Gen 9-OU based mod where numerous new and edited moves, items, and abilities, along with non-stat changes to Pokemon, have been added to the game through community votes in order to shake up the metagame. While some parts of VaporeMons are still pretty similar to OU, there are a number of big differences between two without even talking about all the new stuff that's been added, namely the following:
- Terastallization is illegal - There is an item that has a similar but much weaker effect (Tera Shard)
- Light Clay is banned
- A ton of Ubers have been unbanned, whether due to being nerfed, more balanced due to a lack of Tera, or becoming balanced because of how the meta shaped itself. The unbanned Ubers are: Archaludon, Baxcalibur, Espathra, Landorus, Magearna, Ogerpon-Hearthflame, Palafin, Regieleki, Sneasler, and Terapagos

[U]Resources for VaporeMons[/U]
- [URL='https://www.smogon.com/forums/threads/vaporemons-slate-10-baxcalibur-suspect-test-pet-mod-of-the-season.3722917/']Forum Thread[/URL]
- [URL='https://discord.gg/e5Etx5MNNs']Discord[/URL]
- [URL='https://www.smogon.com/forums/threads/vaporemons-slate-10-playtesting-phase-vr-nominations-open.3722917/#post-9661093']Viability Rankings[/URL]
- [URL='https://www.smogon.com/forums/threads/vaporemons-slate-10-baxcalibur-suspect-test-pet-mod-of-the-season.3722917/#post-9661095']Sample Teams[/URL]
- [URL='https://docs.google.com/spreadsheets/d/1_5AwZ24dPu3-5m5yOyIO4OTPmW9OwIWXXzZ5IJZkj4c/edit?usp=sharing']Spreadsheet[/URL]
- [URL='http://191.101.232.116/#teambuilder']Teambuilder Support Here[/URL]
- [URL='https://play.pokemonshowdown.com/']Playable Here[/URL]

[B][U]Tournament Specific Rules[/U][/B]

[LIST]
[*]All [URL='https://www.smogon.com/forums/threads/tournament-rules-and-general-guidelines.3642760/'][B]general rules[/B][/URL] apply. [URL='https://www.smogon.com/forums/threads/tournament-scheduling-guidelines.3642746/'][B]Click here [/B][/URL]for guidelines about scheduling matches.
[*]Matches are Best of 3, which means that the first person to win two games wins the set and moves on in the tournament.
[*]Matches are to be played in the [URL='https://play.pokemonshowdown.com/'][B]Main Pokemon Showdown Server[/B][/URL], unless told otherwise. Since the tournament will run into March and the next PMOTS period, I will update you on any changes that have to be made.
[*]Replays are [B]mandatory[/B]. It's highly recommended that you both [B]upload AND download the replay[/B], for preservation purposes.
[*]If metagame changes occur during the middle of a round (such as balance changes), they will take effect in the next round.
[*]This is a single elimination tournament.
[*]The winner of the tournament receives [B]$20 USD[/B] (graciously being provided by [USER=501316]zxgzxg[/USER]),  which will be sent through PayPal (PayPal account [B]required [/B]to receive it).
[/LIST]
[HIDE=Other General Forum Tournament Rules]
[B]Identity[/B]
About playing on alts: It is entirely allowed to play on an alt other than your own main forum name, though if your opponent wishes to confirm your identity, you [B]must [/B]log on to your main alt to show them you are who you claim to be. This is to prevent people from pretending to be who they're not.

[B]Scouting[/B]
On scouting opponents: Going through your opponents replays of tournament and ladder games is entirely allowed, as long as a game is public there is nothing preventing you from watching it. An exception to this is abusing powers granted to you by being staff on Smogon or PS! to gain access to information a normal user wouldn't have access to, which is strictly forbidden.
On leaking teams: Divulging private information about someone's planned team to their opponent is never allowed, and will be heavily sanctioned. Requesting that such information be divulged is also grounds for punishment. Keep your scouting to publicly available information and you'll be fine.

[B]Timer Clause / Disconnections[/B]
On Timeout losses: A player that loses by having all his time run out loses the game. This is only not the case if the player that received the timeout loss can be verified to have suffered a True Disconnection. Rematches are only allowed if there was a True Disconnection.
On True Disconnection: The TD team has a secret threshold of seconds that your timer must be at or above, from the moment you disconnect, for a timeout loss to be considered a True disconnection.
[/HIDE]
Sign-Ups will be open for a week, then the tournament will start on [B]Monday, February 26th[/B]. You can join by simply replying to this thread with "in" or some variation. Have fun everyone!

[B][U]Sign-Ups[/U][/B]
Gekokeso
zxgzxg
Beaf Cultist
HydreigonTheChild
Charliezard7
ViZar
Rezzo
G-Luke
Ferenia
chuggachuggachooo
treeshhhh
adorluigi
Gravity Monkey
Orangesodapop
Breezy
F-00
cyclonez_
SHIMA
[HIDE=Subs]
ihbst
[/HIDE]
*/
	blukberry: {
		name: "Bluk Berry",
		spritenum: 44,
		isBerry: true,
		naturalGift: {
			basePower: 90,
			type: "Fire",
		},
		onEat: false,
		num: 165,
		gen: 3,
		isNonstandard: "Past",
		rating: 0,
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
	},
	boosterenergy: {
		name: "Booster Energy",
		spritenum: 745,
		fling: {
			basePower: 30,
		},
		onStart() {
			this.effectState.started = true;
		},
		onUpdate(pokemon) {
			if (!this.effectState.started || pokemon.transformed) return;
			if (this.queue.peek(true)?.choice === 'runSwitch') return;

			if (pokemon.hasAbility('protosynthesis') && !this.field.isWeather('sunnyday') && pokemon.useItem()) {
				pokemon.addVolatile('protosynthesis');
			}
			if (pokemon.hasAbility('quarkdrive') && !this.field.isTerrain('electricterrain') && pokemon.useItem()) {
				pokemon.addVolatile('quarkdrive');
			}
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.tags.includes("Paradox")) return false;
			return true;
		},
		num: 1880,
		gen: 9,
	},
	bottlecap: {
		name: "Bottle Cap",
		spritenum: 696,
		fling: {
			basePower: 30,
		},
		num: 795,
		gen: 7,
		rating: 0,
	},
/*
[CENTER][SIZE=1]Approved by the Pet Mods Moderators[/SIZE]
:sm/vaporeon:
[B][COLOR=rgb(41, 105, 176)]VaporeMons Bo3 Tournament[/COLOR]
Host[/B]: [USER=328142]Yoshiblaze[/USER][/CENTER]

Welcome to the first ever VaporeMons forum tournament! This tournament will serve as the grand finale to VaporeMons' time on the main server as it comes to an end at the end of the month, so we'd like to take one more good look at the metagame we've built before we go!

[I][B]What is VaporeMons?[/B][/I]
VaporeMons is a Gen 9-OU based mod where numerous new and edited moves, items, and abilities, along with non-stat changes to Pokemon, have been added to the game through community votes in order to shake up the metagame. While some parts of VaporeMons are still pretty similar to OU, there are a number of big differences between two without even talking about all the new stuff that's been added, namely the following:
- Terastallization is illegal - There is an item that has a similar but much weaker effect (Tera Shard)
- Light Clay is banned
- A ton of Ubers have been unbanned, whether due to being nerfed, more balanced due to a lack of Tera, or becoming balanced because of how the meta shaped itself. The unbanned Ubers are: Archaludon, Baxcalibur, Espathra, Landorus, Magearna, Ogerpon-Hearthflame, Palafin, Regieleki, Sneasler, and Terapagos

[U]Resources for VaporeMons[/U]
- [URL='https://www.smogon.com/forums/threads/vaporemons-slate-10-baxcalibur-suspect-test-pet-mod-of-the-season.3722917/']Forum Thread[/URL]
- [URL='https://discord.gg/e5Etx5MNNs']Discord[/URL]
- [URL='https://www.smogon.com/forums/threads/vaporemons-slate-10-playtesting-phase-vr-nominations-open.3722917/#post-9661093']Viability Rankings[/URL]
- [URL='https://www.smogon.com/forums/threads/vaporemons-slate-10-baxcalibur-suspect-test-pet-mod-of-the-season.3722917/#post-9661095']Sample Teams[/URL]
- [URL='https://docs.google.com/spreadsheets/d/1_5AwZ24dPu3-5m5yOyIO4OTPmW9OwIWXXzZ5IJZkj4c/edit?usp=sharing']Spreadsheet[/URL]
- [URL='http://191.101.232.116/#teambuilder']Teambuilder Support Here[/URL]
- [URL='https://play.pokemonshowdown.com/']Playable Here[/URL]

[B][U]Tournament Specific Rules[/U][/B]

[LIST]
[*]All [URL='https://www.smogon.com/forums/threads/tournament-rules-and-general-guidelines.3642760/'][B]general rules[/B][/URL] apply. [URL='https://www.smogon.com/forums/threads/tournament-scheduling-guidelines.3642746/'][B]Click here [/B][/URL]for guidelines about scheduling matches.
[*]Matches are Best of 3, which means that the first person to win two games wins the set and moves on in the tournament.
[*]Matches are to be played in the [URL='https://play.pokemonshowdown.com/'][B]Main Pokemon Showdown Server[/B][/URL], unless told otherwise. Since the tournament will run into March and the next PMOTS period, I will update you on any changes that have to be made.
[*]Replays are [B]mandatory[/B]. It's highly recommended that you both [B]upload AND download the replay[/B], for preservation purposes.
[*]If metagame changes occur during the middle of a round (such as balance changes), they will take effect in the next round.
[*]This is a single elimination tournament.
[*]The winner of the tournament receives [B]$20 USD[/B] (graciously being provided by [USER=501316]zxgzxg[/USER]),  which will be sent through PayPal (PayPal account [B]required [/B]to receive it).
[/LIST]
[HIDE=Other General Forum Tournament Rules]
[B]Identity[/B]
About playing on alts: It is entirely allowed to play on an alt other than your own main forum name, though if your opponent wishes to confirm your identity, you [B]must [/B]log on to your main alt to show them you are who you claim to be. This is to prevent people from pretending to be who they're not.

[B]Scouting[/B]
On scouting opponents: Going through your opponents replays of tournament and ladder games is entirely allowed, as long as a game is public there is nothing preventing you from watching it. An exception to this is abusing powers granted to you by being staff on Smogon or PS! to gain access to information a normal user wouldn't have access to, which is strictly forbidden.
On leaking teams: Divulging private information about someone's planned team to their opponent is never allowed, and will be heavily sanctioned. Requesting that such information be divulged is also grounds for punishment. Keep your scouting to publicly available information and you'll be fine.

[B]Timer Clause / Disconnections[/B]
On Timeout losses: A player that loses by having all his time run out loses the game. This is only not the case if the player that received the timeout loss can be verified to have suffered a True Disconnection. Rematches are only allowed if there was a True Disconnection.
On True Disconnection: The TD team has a secret threshold of seconds that your timer must be at or above, from the moment you disconnect, for a timeout loss to be considered a True disconnection.
[/HIDE]
Sign-Ups will be open for a week, then the tournament will start on [B]Monday, February 26th[/B]. You can join by simply replying to this thread with "in" or some variation. Have fun everyone!

[B][U]Sign-Ups[/U][/B]
Gekokeso
zxgzxg
Beaf Cultist
HydreigonTheChild
Charliezard7
ViZar
Rezzo
G-Luke
Ferenia
chuggachuggachooo
treeshhhh
adorluigi
Gravity Monkey
Orangesodapop
Breezy
F-00
cyclonez_
SHIMA
[HIDE=Subs]
ihbst
[/HIDE]
*/
	brightpowder: {
		name: "Bright Powder",
		spritenum: 51,
		fling: {
			basePower: 10,
		},
		onModifyAccuracyPriority: -2,
		onModifyAccuracy(accuracy) {
			if (typeof accuracy !== 'number') return;
			this.debug('brightpowder - decreasing accuracy');
			return this.chainModify([3686, 4096]);
		},
		num: 213,
		gen: 2,
	},
	buggem: {
		name: "Bug Gem",
		spritenum: 53,
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status') return;
			if (move.type === 'Bug' && source.useItem()) {
				source.addVolatile('gem');
			}
		},
		num: 558,
		gen: 5,
		isNonstandard: "Past",
	},
	bugmemory: {
		name: "Bug Memory",
		spritenum: 673,
		onMemory: 'Bug',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 773) || pokemon.baseSpecies.num === 773) {
				return false;
			}
			return true;
		},
		forcedForme: "Silvally-Bug",
		itemUser: ["Silvally-Bug"],
		num: 909,
		gen: 7,
		isNonstandard: "Past",
	},
/*
[CENTER][SIZE=1]Approved by the Pet Mods Moderators[/SIZE]
:sm/vaporeon:
[B][COLOR=rgb(41, 105, 176)]VaporeMons Bo3 Tournament[/COLOR]
Host[/B]: [USER=328142]Yoshiblaze[/USER][/CENTER]

Welcome to the first ever VaporeMons forum tournament! This tournament will serve as the grand finale to VaporeMons' time on the main server as it comes to an end at the end of the month, so we'd like to take one more good look at the metagame we've built before we go!

[I][B]What is VaporeMons?[/B][/I]
VaporeMons is a Gen 9-OU based mod where numerous new and edited moves, items, and abilities, along with non-stat changes to Pokemon, have been added to the game through community votes in order to shake up the metagame. While some parts of VaporeMons are still pretty similar to OU, there are a number of big differences between two without even talking about all the new stuff that's been added, namely the following:
- Terastallization is illegal - There is an item that has a similar but much weaker effect (Tera Shard)
- Light Clay is banned
- A ton of Ubers have been unbanned, whether due to being nerfed, more balanced due to a lack of Tera, or becoming balanced because of how the meta shaped itself. The unbanned Ubers are: Archaludon, Baxcalibur, Espathra, Landorus, Magearna, Ogerpon-Hearthflame, Palafin, Regieleki, Sneasler, and Terapagos

[U]Resources for VaporeMons[/U]
- [URL='https://www.smogon.com/forums/threads/vaporemons-slate-10-baxcalibur-suspect-test-pet-mod-of-the-season.3722917/']Forum Thread[/URL]
- [URL='https://discord.gg/e5Etx5MNNs']Discord[/URL]
- [URL='https://www.smogon.com/forums/threads/vaporemons-slate-10-playtesting-phase-vr-nominations-open.3722917/#post-9661093']Viability Rankings[/URL]
- [URL='https://www.smogon.com/forums/threads/vaporemons-slate-10-baxcalibur-suspect-test-pet-mod-of-the-season.3722917/#post-9661095']Sample Teams[/URL]
- [URL='https://docs.google.com/spreadsheets/d/1_5AwZ24dPu3-5m5yOyIO4OTPmW9OwIWXXzZ5IJZkj4c/edit?usp=sharing']Spreadsheet[/URL]
- [URL='http://191.101.232.116/#teambuilder']Teambuilder Support Here[/URL]
- [URL='https://play.pokemonshowdown.com/']Playable Here[/URL]

[B][U]Tournament Specific Rules[/U][/B]

[LIST]
[*]All [URL='https://www.smogon.com/forums/threads/tournament-rules-and-general-guidelines.3642760/'][B]general rules[/B][/URL] apply. [URL='https://www.smogon.com/forums/threads/tournament-scheduling-guidelines.3642746/'][B]Click here [/B][/URL]for guidelines about scheduling matches.
[*]Matches are Best of 3, which means that the first person to win two games wins the set and moves on in the tournament.
[*]Matches are to be played in the [URL='https://play.pokemonshowdown.com/'][B]Main Pokemon Showdown Server[/B][/URL], unless told otherwise. Since the tournament will run into March and the next PMOTS period, I will update you on any changes that have to be made.
[*]Replays are [B]mandatory[/B]. It's highly recommended that you both [B]upload AND download the replay[/B], for preservation purposes.
[*]If metagame changes occur during the middle of a round (such as balance changes), they will take effect in the next round.
[*]This is a single elimination tournament.
[*]The winner of the tournament receives [B]$20 USD[/B] (graciously being provided by [USER=501316]zxgzxg[/USER]),  which will be sent through PayPal (PayPal account [B]required [/B]to receive it).
[/LIST]
[HIDE=Other General Forum Tournament Rules]
[B]Identity[/B]
About playing on alts: It is entirely allowed to play on an alt other than your own main forum name, though if your opponent wishes to confirm your identity, you [B]must [/B]log on to your main alt to show them you are who you claim to be. This is to prevent people from pretending to be who they're not.

[B]Scouting[/B]
On scouting opponents: Going through your opponents replays of tournament and ladder games is entirely allowed, as long as a game is public there is nothing preventing you from watching it. An exception to this is abusing powers granted to you by being staff on Smogon or PS! to gain access to information a normal user wouldn't have access to, which is strictly forbidden.
On leaking teams: Divulging private information about someone's planned team to their opponent is never allowed, and will be heavily sanctioned. Requesting that such information be divulged is also grounds for punishment. Keep your scouting to publicly available information and you'll be fine.

[B]Timer Clause / Disconnections[/B]
On Timeout losses: A player that loses by having all his time run out loses the game. This is only not the case if the player that received the timeout loss can be verified to have suffered a True Disconnection. Rematches are only allowed if there was a True Disconnection.
On True Disconnection: The TD team has a secret threshold of seconds that your timer must be at or above, from the moment you disconnect, for a timeout loss to be considered a True disconnection.
[/HIDE]
Sign-Ups will be open for a week, then the tournament will start on [B]Monday, February 26th[/B]. You can join by simply replying to this thread with "in" or some variation. Have fun everyone!

[B][U]Sign-Ups[/U][/B]
Gekokeso
zxgzxg
Beaf Cultist
HydreigonTheChild
Charliezard7
ViZar
Rezzo
G-Luke
Ferenia
chuggachuggachooo
treeshhhh
adorluigi
Gravity Monkey
Orangesodapop
Breezy
F-00
cyclonez_
SHIMA
[HIDE=Subs]
ihbst
[/HIDE]
*/
	buginiumz: {
		name: "Buginium Z",
		spritenum: 642,
		onPlate: 'Bug',
		onTakeItem: false,
		zMove: true,
		zMoveType: "Bug",
		forcedForme: "Arceus-Bug",
		num: 787,
		gen: 7,
		isNonstandard: "Past",
	},
	burndrive: {
		name: "Burn Drive",
		spritenum: 54,
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 649) || pokemon.baseSpecies.num === 649) {
				return false;
			}
			return true;
		},
		onDrive: 'Fire',
		forcedForme: "Genesect-Burn",
		itemUser: ["Genesect-Burn"],
		num: 118,
		gen: 5,
		isNonstandard: "Past",
	},
	cameruptite: {
		name: "Cameruptite",
		spritenum: 625,
		megaStone: "Camerupt-Mega",
		megaEvolves: "Camerupt",
		itemUser: ["Camerupt"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 767,
		gen: 6,
		isNonstandard: "Past",
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
		},
		num: 546,
		gen: 5,
	},
	charcoal: {
		name: "Charcoal",
		spritenum: 61,
		fling: {
			basePower: 30,
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Fire') {
				return this.chainModify([4915, 4096]);
			}
		},
		num: 249,
		gen: 2,
	},
/*
[CENTER][SIZE=1]Approved by the Pet Mods Moderators[/SIZE]
:sm/vaporeon:
[B][COLOR=rgb(41, 105, 176)]VaporeMons Bo3 Tournament[/COLOR]
Host[/B]: [USER=328142]Yoshiblaze[/USER][/CENTER]

Welcome to the first ever VaporeMons forum tournament! This tournament will serve as the grand finale to VaporeMons' time on the main server as it comes to an end at the end of the month, so we'd like to take one more good look at the metagame we've built before we go!

[I][B]What is VaporeMons?[/B][/I]
VaporeMons is a Gen 9-OU based mod where numerous new and edited moves, items, and abilities, along with non-stat changes to Pokemon, have been added to the game through community votes in order to shake up the metagame. While some parts of VaporeMons are still pretty similar to OU, there are a number of big differences between two without even talking about all the new stuff that's been added, namely the following:
- Terastallization is illegal - There is an item that has a similar but much weaker effect (Tera Shard)
- Light Clay is banned
- A ton of Ubers have been unbanned, whether due to being nerfed, more balanced due to a lack of Tera, or becoming balanced because of how the meta shaped itself. The unbanned Ubers are: Archaludon, Baxcalibur, Espathra, Landorus, Magearna, Ogerpon-Hearthflame, Palafin, Regieleki, Sneasler, and Terapagos

[U]Resources for VaporeMons[/U]
- [URL='https://www.smogon.com/forums/threads/vaporemons-slate-10-baxcalibur-suspect-test-pet-mod-of-the-season.3722917/']Forum Thread[/URL]
- [URL='https://discord.gg/e5Etx5MNNs']Discord[/URL]
- [URL='https://www.smogon.com/forums/threads/vaporemons-slate-10-playtesting-phase-vr-nominations-open.3722917/#post-9661093']Viability Rankings[/URL]
- [URL='https://www.smogon.com/forums/threads/vaporemons-slate-10-baxcalibur-suspect-test-pet-mod-of-the-season.3722917/#post-9661095']Sample Teams[/URL]
- [URL='https://docs.google.com/spreadsheets/d/1_5AwZ24dPu3-5m5yOyIO4OTPmW9OwIWXXzZ5IJZkj4c/edit?usp=sharing']Spreadsheet[/URL]
- [URL='http://191.101.232.116/#teambuilder']Teambuilder Support Here[/URL]
- [URL='https://play.pokemonshowdown.com/']Playable Here[/URL]

[B][U]Tournament Specific Rules[/U][/B]

[LIST]
[*]All [URL='https://www.smogon.com/forums/threads/tournament-rules-and-general-guidelines.3642760/'][B]general rules[/B][/URL] apply. [URL='https://www.smogon.com/forums/threads/tournament-scheduling-guidelines.3642746/'][B]Click here [/B][/URL]for guidelines about scheduling matches.
[*]Matches are Best of 3, which means that the first person to win two games wins the set and moves on in the tournament.
[*]Matches are to be played in the [URL='https://play.pokemonshowdown.com/'][B]Main Pokemon Showdown Server[/B][/URL], unless told otherwise. Since the tournament will run into March and the next PMOTS period, I will update you on any changes that have to be made.
[*]Replays are [B]mandatory[/B]. It's highly recommended that you both [B]upload AND download the replay[/B], for preservation purposes.
[*]If metagame changes occur during the middle of a round (such as balance changes), they will take effect in the next round.
[*]This is a single elimination tournament.
[*]The winner of the tournament receives [B]$20 USD[/B] (graciously being provided by [USER=501316]zxgzxg[/USER]),  which will be sent through PayPal (PayPal account [B]required [/B]to receive it).
[/LIST]
[HIDE=Other General Forum Tournament Rules]
[B]Identity[/B]
About playing on alts: It is entirely allowed to play on an alt other than your own main forum name, though if your opponent wishes to confirm your identity, you [B]must [/B]log on to your main alt to show them you are who you claim to be. This is to prevent people from pretending to be who they're not.

[B]Scouting[/B]
On scouting opponents: Going through your opponents replays of tournament and ladder games is entirely allowed, as long as a game is public there is nothing preventing you from watching it. An exception to this is abusing powers granted to you by being staff on Smogon or PS! to gain access to information a normal user wouldn't have access to, which is strictly forbidden.
On leaking teams: Divulging private information about someone's planned team to their opponent is never allowed, and will be heavily sanctioned. Requesting that such information be divulged is also grounds for punishment. Keep your scouting to publicly available information and you'll be fine.

[B]Timer Clause / Disconnections[/B]
On Timeout losses: A player that loses by having all his time run out loses the game. This is only not the case if the player that received the timeout loss can be verified to have suffered a True Disconnection. Rematches are only allowed if there was a True Disconnection.
On True Disconnection: The TD team has a secret threshold of seconds that your timer must be at or above, from the moment you disconnect, for a timeout loss to be considered a True disconnection.
[/HIDE]
Sign-Ups will be open for a week, then the tournament will start on [B]Monday, February 26th[/B]. You can join by simply replying to this thread with "in" or some variation. Have fun everyone!

[B][U]Sign-Ups[/U][/B]
Gekokeso
zxgzxg
Beaf Cultist
HydreigonTheChild
Charliezard7
ViZar
Rezzo
G-Luke
Ferenia
chuggachuggachooo
treeshhhh
adorluigi
Gravity Monkey
Orangesodapop
Breezy
F-00
cyclonez_
SHIMA
[HIDE=Subs]
ihbst
[/HIDE]
*/
	charizarditex: {
		name: "Charizardite X",
		spritenum: 585,
		megaStone: "Charizard-Mega-X",
		megaEvolves: "Charizard",
		itemUser: ["Charizard"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 660,
		gen: 6,
		isNonstandard: "Past",
	},
	charizarditey: {
		name: "Charizardite Y",
		spritenum: 586,
		megaStone: "Charizard-Mega-Y",
		megaEvolves: "Charizard",
		itemUser: ["Charizard"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 678,
		gen: 6,
		isNonstandard: "Past",
	},
	chartiberry: {
		name: "Charti Berry",
		spritenum: 62,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Rock",
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Rock' && target.getMoveHitData(move).typeMod > 0) {
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
		num: 195,
		gen: 4,
	},
	cheriberry: {
		name: "Cheri Berry",
		spritenum: 63,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Fire",
		},
		onUpdate(pokemon) {
			if (pokemon.status === 'par') {
				pokemon.eatItem();
			}
		},
		onEat(pokemon) {
			if (pokemon.status === 'par') {
				pokemon.cureStatus();
			}
		},
		num: 149,
		gen: 3,
		rating: 1,
	},
/*
[CENTER]Before we get started, be sure to check out the [URL='https://www.smogon.com/forums/threads/vaporemons-slate-10-playtesting-phase-sample-team-submissions-open-pet-mod-of-the-season.3722917/']VaporeMons thread[/URL], the [URL='https://discord.gg/e5Etx5MNNs']Discord[/URL], and the resources linked in its first post if you're unfamiliar with the metagame.  I'll explain new stuff as I go along, but there you'll find everything you'll need to acquaint yourself with the metagame. VaporeMons is playable on [URL='http://191.101.232.116/#'][B]DragonHeaven[/B][/URL] (with teambuilder support) as well as on the [URL='https://play.pokemonshowdown.com/'][B]main Pokemon Showdown server [/B][/URL]until the end of February as Winter's Pet Mod of the Season.

-------------------
[URL='https://www.youtube.com/watch?v=DWZ25hSNiss&ab_channel=WWEMusicGroup-Topic'][IMG]https://cdn.discordapp.com/attachments/700449602465431657/1185303703369031821/image.png?ex=65eb6818&is=65d8f318&hm=2904d354d03f34119edadf9b3ce2186927404a232b4de3792b6ba16c75494d8c&[/IMG][/URL]
[URL='https://pokepast.es/526acc5397fe8dfa']:sm/revavroom::sm/iron valiant::sm/magnezone::sm/landorus-therian::sm/manaphy::sm/cinderace:[/URL]
[SIZE=1](click sprites for paste)[/SIZE]
Welcome to this RMT for VaporeMons! If you don't know what VaporeMons is, then be sure to click the link at the top of this post to see all that it has to offer. In short, VaporeMons is a Gen 9 OU-based Pet Mod where new and changed moves, items, and abilities are added to the game, as well as non-stat Adjustments to Pokemon, in order to create a new spin on the metagame. There are also multiple other differences from OU, being that Terastalization is banned, Light Clay is banned, and multiple Ubers are unbanned for differing reasons (being Regieleki, Volcarona, Espathra, Palafin, Landorus-Incarnate, Magearna, Ogerpon-Hearthflame, Roaring Moon, and Sneasler). As of this post, DLC2 isn't out on the main Pokemon Showdown server yet but note that the unbanned Gliscor and Darkrai are currently still banned in VaporeMons.

To celebrate VaporeMons being on main for the next 3 months, I'm sharing one of the most fun teams I've built in any competitive format, not even just VaporeMons, being this Misty Terrain Offense team featuring Revavroom!

[B][SIZE=6][COLOR=rgb(184, 49, 47)]THE TEAM[/COLOR][/SIZE][/B]
:sm/revavroom:
Revavroom @ Ruchbah Star Shard
Ability: Misty Surge
Tera Type: Fairy
EVs: 252 Atk / 4 SpD / 252 Spe
Jolly Nature
- Magical Torque
- Blazing Torque
- Rollout
- High Horsepower
[HIDE=Changes to Revavroom]
I will list all the changes that each Pokémon on the team received in VaporeMons, as well as the effects of any custom items they may be holding. Important changes will be listed first and bolded.
New Moves: [B]Magical Torque, Wicked Torque, Blazing Torque, Combat Torque, Noxious Torque, High Horsepower* [/B](gained before it got in in DLC1), Skull Bash, [B]Shrapnel Shot[/B], [B]Rollout

Rollout [/B]- Now 50 BP Rock-type U-Turn clone. Deals double damage if the user's side's last used move was either Rollout or Defense Curl
[B]Shrapnel Shot[/B] - 15 BP Physical Steel-type move, Hits 2-5 times, first hit lowers the foe's Defense by 1 stage
Skull Bash - Now a Physical Steel-type clone of (vanilla) Meteor Beam that boosts the user's Attack instead of SpA
Lash Out - Now 70 BP and 10 PP, doubles in power if the user has any negative stat boosts, non-volatile status conditions, or negative volatile status conditions

New Item: [B]Star Shards[/B] - When a Star Shard is held, Revavroom's type and ability changes to match the corresponding Starmobile from SV's story. Additionally, Revavroom's Steel and Poison moves, as well as moves of the Star Shard's type have 1.2x power.[HIDE=All Star Shards]
Segin Star Shard - Dark-type - Ability: Intimidate
Schedar Star Shard - Fire-type - Ability: Speed Boost
Navi Star Shard - Poison-type - Ability: Toxic Debris
Ruchbah Star Shard - Fairy-type - Ability: Misty Surge
Caph Star Shard - Fighting-type - Ability: Stamina
[/HIDE]
New Ability: Overcoat - Same effects as standard + the user is immune to hazards.
New Ability: Momentum - This Pokemon heals 12.5% of its max HP after getting hit by or using a [URL='https://pokepast.es/8537c3351eecfbe2']spinning move[/URL].
[/HIDE] Revavroom received a number of huge changes in VaporeMons, notably getting all of the Starmobile's Torque moves as great coverage options, and the Star Shard items that let it act like a mini version of the Starmobiles. In spite of these huge buffs, Revavroom remains unviable for the most part, especially since Light Clay's ban makes Shift Gear sets difficult to use. However, there's one thing that it can do that nothing else can do better: support Iron Valiant with Misty Terrain. In VaporeMons, 6 new abilities Quark Drive/Protosynthesis clones were created, each corresponding to each of the other weathers and terrains. Iron Valiant received Rune Drive, which is activated in Misty Terrain, which Revavroom-Ruchbah can set easily with Misty Surge. While this core was experimented with lightly earlier on into VaporeMons' lifespan, it was never particularly powerful. The Teal Mask DLC came with the return of Weezing-Galar, who also has Misty Surge and got numerous big buffs as well, so I experimented with it + Iron Valiant when the VaporeMons ladder opened up at the start of the month. However, I found it extremely underwhelming as it was very passive and difficult to set up Misty Terrain and get Iron Valiant in safely. I ended up looking to Revavroom-Ruchbah to fill this role as while it's a mostly worse Pokemon overall, Revavroom's access to pivoting moves in Parting Shot and Rollout makes it easier to get Iron Valiant in safely. Plus, its superior offensive presence to Weezing means that checks to it can't come in as easily, even when it's not clicking Rollout. This worked absolute wonders, as Revavroom's pivoting gives Iron Valiant way more opportunities to cleave through the foe's team and just generally lets me keep up momentum way more easily. In terms of what Revavroom can do by itself, it's not a bad attacker in its own right, hitting fairly hard with STAB Magical Torque (which hits 180 BP after STAB and the boost from the Star Shard) and chunking Fairy checks like Slowking-Galar, Iron Moth, and Corviknight with High Horsepower and Blazing Torque, which Iron Valiant greatly appreciates. All in all, Revavroom is a decent offensive pivot that forms a dangerous offensive core with one of THE best Pokemon in the tier.

:sm/iron valiant:
Iron Valiant @ Life Orb
Ability: Rune Drive
Shiny: Yes
Tera Type: Fairy
EVs: 4 Atk / 252 SpA / 252 Spe
Naive Nature
- Moonblast
- Thunderbolt
- Close Combat
- Shadow Ball
[HIDE=Changes to Iron Valiant]
New Moves: Chisel, Parry

Chisel - 45 BP Physical Rock-type move, gives the target a Substitute, then hits 4 times
Parry - 80 BP Physical Fighting-type move, prevents the foe from using priority moves on the turn the moves is used (a la Armor Tail)
Brick Break - Now 85 BP

New Ability: [B]Rune Drive[/B] - Misty Terrain active or Booster Energy used: highest stat is 1.3x, or 1.5x if Speed.
New Ability: Outclass - If this Pokémon has one type, it steals the primary typing off a Pokémon it hits with an attack (Note that since Iron Valiant has two types by default, it must use the Tera Shard item to get this ability to activate. The Tera Shard changes the user's typing to its Tera Type on switch-in)
[/HIDE] Iron Valiant is the star of the team, being its main wallbreaker and cleaner. Iron Valiant largely does the same things in both OU and VaporeMons, with Specs, Mixed Booster Energy, and Swords Dance Booster Energy sets, but now it has much better terrain setters to activate its Drive ability with. Thus, Iron Valiant can have the power of Life Orb and the Speed of Speed Booster Energy at the same time when in Revavroom's Misty Terrain, which makes it both super hard to switch into and super hard to revenge kill. Moonblast and Close Combat are powerful STAB options that threaten most of the best Pokemon in the tier, Thunderbolt hits Milotic (who's Water/Fairy and one of the best Pokemon in the tier) and Corviknight, and Shadow Ball can KO a weakened Gholdengo or Slowking-Galar.

:sm/magnezone:
Magnezone @ Leftovers
Ability: Levitate
Tera Type: Electric
EVs: 252 HP / 4 Def / 252 SpD
Calm Nature
- Volt Switch
- Echo Chamber
- Rebuild
- Rapid Spin
[HIDE=Changes to Magnezone]
New Moves:  [B]Rapid Spin[/B], Shrapnel Shot, [B]Rebuild[/B], [B]Echo Chamber[/B], Signal Beam, [B]Software Crash[/B] (Lost Electroweb)

[B]Rebuild [/B]- Steel-type Status move, Restores HP equal to the user's level * 1.25
[B]Echo Chamber[/B] - 90 BP Special Steel-type move, deals 1.5x more damage if the user's side used a sound move last turn (including itself)
[B]Software Crash[/B] - 100 BP, 95% Accuracy Special Bug-type move, deals either Bug or Electric-type damage, depending on which is more effective
Shrapnel Shot - 15 BP Physical Steel-type move, Hits 2-5 times, first hit lowers the foe's Defense by 1 stage
Signal Beam - Now suppresses the foe's ability after hitting

Now has [B]Levitate [/B]as its secondary ability instead of Sturdy
[/HIDE] Magnezone is the first of two defensive pivots on the team, serving as a spinner and special wall. With Levitate, Magnezone's defensive typing really shines in this meta, letting it very easily check the likes of Landorus-T, Ting-Lu, and Shaymin, who could all otherwise threaten it with Ground moves. This makes it very easy for Magnezone to come in and either remove hazards with Rapid Spin, heal with Rebuild, or pivot back out with Volt Switch, a move that also chips otherwise annoying Water and Flying-types like Milotic and Corviknight. Echo Chamber also gives Magnezone some nice offensive presence as well, being a 135 BP move before STAB every other turn that's super annoying for offensive mons to try to come into. All these qualities make Magnezone one of the most consistent hazard control options in the tier, which is exactly what it needs to do on this team. Leftovers keeps Magnezone healthy as Rebuild doesn't quite heal 50% of Magnezone's HP, so the extra bit of healing is much appreciated.

:sm/landorus-therian:
Landorus-Therian (M) @ Leftovers
Ability: Intimidate
Tera Type: Ground
EVs: 252 HP / 64 Def / 176 SpD / 16 Spe
Careful Nature
- Stealth Rock
- Earthquake
- Smack Down
- U-turn
[HIDE=Changes to Landorus]
New Moves: Storm Throw, [B]Spikes[/B], [B]Defog[/B], [B]Meteor Beam[/B], [B]Acrobatics[/B], Skull Bash, Desert Storm, [B]Natural Gift

Defog [/B]- Now also a Wind move (and generally way more distributed)
[B]Meteor Beam[/B] - Now also charges instantly in Sand
[B]Natural Gift[/B] - Now doesn't consume the berry
[B]Smack Down[/B] - Now 65 BP and prevents the foe from using pivoting moves for the rest of the turn
Storm Throw - Now 70 BP
Skull Bash - Now a Physical Steel-type clone of (vanilla) Meteor Beam that boosts the user's Attack instead of SpA
Desert Storm - 90 BP Physical Ground-type Future Sight clone, sets Sandstorm before hitting (currently bugged on the main server, where the Sand isn't set)
Brick Break - 85 BP

Landorus-Incarnate gained Cloud Nine in place of Sheer Force and is legal in OU
[/HIDE] The other part of the team's defensive core, it's the always reliable Landorus. Landorus actually received a fair number of buffs that have restored it to some of its former glory, further helped by Gliscor being banned in VaporeMons. This mixed defensive set acts as a second defensive pivot and hazard setter to help further the chip opponent's team down for Iron Valiant and the other sweepers. The EV spread is able to avoid a 2HKO from Ogerpon-Heartflame's Power Whip after Intimidate with Stealth Rock up, with most of the rest dumped into SpD to help take on Iron Moth, which this team really struggles with. Stealth Rock was chosen over Lando's newfound toy in Spikes as Landorus usually doesn't want to stay on the field for too long, so it's better to set Rocks and pivot into one of the offensive threats ASAP, as well as the fact that the team lacks a way to prevent hazard removal aside from offensive pressure, so taking time to set up Spikes that instantly get removed feels like a waste. Earthquake deals solid damage as STAB move and beats threatening Poison-types like Iron Moth, Smack Down allows Landorus to threaten Corviknight and Levitate Magnezone with an Earthquake next turn while preventing slow walls from pivoting on Lando, and U-Turn helps me keep up momentum. Leftovers are chosen over Rocky Helmet since Lando needs to come in fairly often to keep powerful physical threats in check all game, so the extra healing is needed.

:sm/manaphy:
Manaphy @ Leftovers
Ability: Healer
Tera Type: Water
EVs: 4 Def / 252 SpA / 252 Spe
Timid Nature
IVs: 0 Atk
- Tail Glow
- Surf
- Dazzling Gleam
- Energy Ball
[HIDE=Changes to Manaphy]
New Moves:  [B]Life Dew, Wash Away[/B], Signal Beam

[B]Life Dew[/B] - Heals 33% of the user's max HP. Heals the next Pokemon that switches in by 25% of their max HP
[B]Wash Away[/B] - 80 BP Special Water move, clears hazards and terrain from both sides of the field, then switches the foe out. -6 priority
Signal Beam - Now suppresses the foe's ability after hitting

New Ability: [B]Healer [/B]- On faint, the next Pokémon sent out heals 33% of its max HP.
[/HIDE] Manaphy acts as one of two potential setup sweepers on the team, while also acting as a decent check to Ground-types like Great Tusk and Water-types like Milotic and Alomomola. While Manaphy received a couple new wrinkles in VaporeMons, like recovery in Life Dew that could potentially be used alongside Take Heart as a stallbreaker, this set uses Manaphy in much of the same way you'd use it in OU. Tail Glow turns Manaphy into a deadly sweeper and midgame breaker, with most Pokemon folding to a +3 Surf or coverage. It's quite hard for Manaphy to sweep in VaporeMons, since there are many crazy offensive threats in the tier can easily revenge kill Manaphy, even from full, but sweeping is far from impossible. Plus, even if Manaphy only gets 1 or 2 kills, it really opens up the battle for the rest of the team. Energy Ball and Dazzling Gleam are the coverage moves of choice, hitting Water and Dragon-types that can tank a hit from a +3 Surf. I've gotten great value out of Dazzling Gleam but truthfully Ice Beam is likely the superior option there. Healer is used over Hydration, mainly because I'm not using Rain, but also because Healer's effect can really come in clutch in pinch, like giving Landorus more HP to make up for its lack of recovery, or giving Iron Valiant more chances to attack in spite of Life Orb recoil.

:sm/cinderace:
Cinderace @ Heavy-Duty Boots
Ability: Blaze
Tera Type: Fire
EVs: 252 Atk / 4 SpD / 252 Spe
Jolly Nature
- Pyro Ball
- Sucker Punch
- Gunk Shot
- Swords Dance
[HIDE=Changes to Cinderace]
New Moves: Peekaboo, Brick Break

Peekaboo - 140 BP Physical Fairy-type, charges at the beginning of the turn, hits at the end of the turn. Deals 0.5x damage if the user is hit before the move hits
Brick Break - Now 85 BP
Smack Down - Now 65 BP and prevents the foe from using pivoting moves for the rest of the turn

New Ability: [B]Blaze [/B]- 1.2x Power on Fire attacks. At 1/3 or less of its max HP, all of this Pokémon's moves deal 1.5x damage.
[/HIDE] Cinderace acts as a second setup sweeper and wallbreaker, as well as measure of Speed control, which is important since Iron Valiant won't always be in Misty Terrain. With the buffed Blaze making Pyro Ball a terrifying 144 BP at all times (and only getting stronger if you get chipped down), Cinderace a very powerful fast attacker in the tier, with Pyro Ball melting many neutral targets that try to come in. Blaze being used over Libero also means that Cinderace is able to more easily use Swords Dance, which allows Cinderace to deal genuinely insane damage, like OHKOing offensive Great Tusk at +2. Sucker Punch allows Cinderace to avoid getting revenge killed by Dragapult, while also dealing a ton of damage to faster threats like Jolteon and Booster Energy Iron Moth at +2. Gunk Shot hits the Water/Fairy Milotic, as well as OHKOing Ogerpon-Wellspring and Hearthflame, which Pyro Ball can't without prior chip, as well as potentially poisoning switch-ins like Fighting/Water Fur Coat Crabominable. Heavy-Duty Boots keeps Cinderace safe from hazards, making it easier to get in multiple times a game to impose its will.

[B][SIZE=6][COLOR=rgb(184, 49, 47)]WEAKNESSES[/COLOR][/SIZE][/B]
:sm/pelipper:[IMG]https://play.pokemonshowdown.com/sprites/ani/basculegion.gif[/IMG]
I've had the fortune of not running into Rain yet, but you could imagine how terrifying it would be if I did considering the fact that my only Water resist is Manaphy. Basculegion in particular is extremely terrifying, getting the Flip Turn on everything until it's eventually able to click Wave Crash 6 times. Iron Valiant luckily does outspeed Adamant Basculegion in Rain if Misty Terrain is up, but it's a bit tough to set up that situation without having to sack Revavroom, plus Rain teams often run Amoonguss which Valiant can't break through.

:sm/alomomola:
A very annoying defensive pivot to deal with simply because it's very hard to switch into. Switching into Flip Turn gives the opponent free momentum, while switching into Wash Away makes you switch out into a less favorable matchup, while also clearing my Misty Terrain if it's up. Plus, it's able to switch into both Landorus and Cinderace forever. Alomomola can never beat you offensively and Iron Valiant Thunderbolt can OHKO with some chip, but it can really effectively sap all of your momentum, which sucks for such an offensive team.

:sm/iron moth:
This mon is the very reason why I had to change Landorus to a more Specially Defensive spread, it's extremely annoying to deal with when I'm using two Fairy-types and a somewhat passive Steel-type. Booster Energy Iron Moth is able to outspeed and heavily damage everything on the team except for Landorus, who needs to be in pristine condition to take on repeated Fiery Dances. Additionally, Iron Moth is often seen on Grassy Terrain teams as its new Paradox ability, Photon Drive, activates in Grassy Terrain, replacing my Misty Terrain and putting me in an awkward position since Revavroom can't safely come in to reset terrain. After switching to SpD Lando, Iron Moth is a bit easier to deal with, as I just need to keep Lando and/or Manaphy extremely healthy, or I can soft check it with Cinderace who can eat an unboosted Sludge Wave and KO back with Pyro Ball into Sucker Punch.

:sm/delphox:
Another threatening Special Fire-type, Delphox is now a Fire/Fairy-type with multiple notable movepool buffs and the same buffed Blaze as Cinderace. Fire/Fairy coverage severely damaged my entire team, while Fire/Fairy is also one of the few type combos that resists Fairy and Fighting without being weak to Electric or Ghost. Luckily, Cinderace can revenge kill it as long as it hits a Gunk Shot, but if Cinderace is dead and it gets a Nasty Plot up, the game is probably over.


[B][SIZE=6][COLOR=rgb(184, 49, 47)]REPLAYS[/COLOR][/SIZE][/B]
[SIZE=1](some replays may feature slightly different sets)[/SIZE]
[URL]https://replay.pokemonshowdown.com/gen9vaporemons-2009433844[/URL]
[URL]https://replay.pokemonshowdown.com/gen9vaporemons-2009697108[/URL]
[URL]https://replay.pokemonshowdown.com/gen9vaporemons-2009635495[/URL]
[URL]https://replay.pokemonshowdown.com/gen9vaporemons-2009376618[/URL]
[URL]https://replay.pokemonshowdown.com/gen9vaporemons-2009061908[/URL]
[URL]https://replay.pokemonshowdown.com/gen9vaporemons-2009045621[/URL]
[URL]https://replay.pokemonshowdown.com/gen9vaporemons-2012390570[/URL] (being used by [USER=501316]zxgzxg[/USER])

[B][SIZE=6][COLOR=rgb(184, 49, 47)]SHOUTOUTS[/COLOR][/SIZE][/B]
Thank you to everyone in the Pet Mods community for giving me a real home on Smogon for over half a decade now, something like Pet Mods of the Season wouldn't be possible with out you guys.

Thank you to the fellow council members of VaporeMons, including [USER=566797]Beaf Cultist[/USER], [USER=264912]G-Luke[/USER], [USER=537477]Paulluxx[/USER], and [USER=501316]zxgzxg[/USER] for helping me build VaporeMons into the fun tier it is today. I haven't really played singles in this generation (mostly playing VGC) but playing VaporeMons makes singles extremely fun.

Thank you to everyone who's played VaporeMons on ladder so far, it's been the most fun I've had laddering in literal years and I hope that more and more people continue laddering.

And lastly, thank you for reading this RMT![/CENTER]
*/
	cherishball: {
		name: "Cherish Ball",
		spritenum: 64,
		num: 16,
		gen: 4,
		isPokeball: true,
		isNonstandard: "Unobtainable",
	},
	chestoberry: {
		name: "Chesto Berry",
		spritenum: 65,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Water",
		},
		onUpdate(pokemon) {
			if (pokemon.status === 'slp') {
				pokemon.eatItem();
			}
		},
		onEat(pokemon) {
			if (pokemon.status === 'slp') {
				pokemon.cureStatus();
			}
		},
		num: 150,
		gen: 3,
	},
	chilanberry: {
		name: "Chilan Berry",
		spritenum: 66,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Normal",
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (
				move.type === 'Normal' &&
				(!target.volatiles['substitute'] || move.flags['bypasssub'] || (move.infiltrates && this.gen >= 6))
			) {
				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
		onEat() { },
		num: 200,
		gen: 4,
	},
	chilldrive: {
		name: "Chill Drive",
		spritenum: 67,
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 649) || pokemon.baseSpecies.num === 649) {
				return false;
			}
			return true;
		},
		onDrive: 'Ice',
		forcedForme: "Genesect-Chill",
		itemUser: ["Genesect-Chill"],
		num: 119,
		gen: 5,
		isNonstandard: "Past",
	},
	chippedpot: {
		name: "Chipped Pot",
		spritenum: 720,
		fling: {
			basePower: 80,
		},
		num: 1254,
		gen: 8,
		rating: 0,
	},
/*
[CENTER]Before we get started, be sure to check out the [URL='https://www.smogon.com/forums/threads/vaporemons-slate-10-playtesting-phase-sample-team-submissions-open-pet-mod-of-the-season.3722917/']VaporeMons thread[/URL], the [URL='https://discord.gg/e5Etx5MNNs']Discord[/URL], and the resources linked in its first post if you're unfamiliar with the metagame.  I'll explain new stuff as I go along, but there you'll find everything you'll need to acquaint yourself with the metagame. VaporeMons is playable on [URL='http://191.101.232.116/#'][B]DragonHeaven[/B][/URL] (with teambuilder support) as well as on the [URL='https://play.pokemonshowdown.com/'][B]main Pokemon Showdown server [/B][/URL]until the end of February as Winter's Pet Mod of the Season.

-------------------
[URL='https://www.youtube.com/watch?v=DWZ25hSNiss&ab_channel=WWEMusicGroup-Topic'][IMG]https://cdn.discordapp.com/attachments/700449602465431657/1185303703369031821/image.png?ex=65eb6818&is=65d8f318&hm=2904d354d03f34119edadf9b3ce2186927404a232b4de3792b6ba16c75494d8c&[/IMG][/URL]
[URL='https://pokepast.es/526acc5397fe8dfa']:sm/revavroom::sm/iron valiant::sm/magnezone::sm/landorus-therian::sm/manaphy::sm/cinderace:[/URL]
[SIZE=1](click sprites for paste)[/SIZE]
Welcome to this RMT for VaporeMons! If you don't know what VaporeMons is, then be sure to click the link at the top of this post to see all that it has to offer. In short, VaporeMons is a Gen 9 OU-based Pet Mod where new and changed moves, items, and abilities are added to the game, as well as non-stat Adjustments to Pokemon, in order to create a new spin on the metagame. There are also multiple other differences from OU, being that Terastalization is banned, Light Clay is banned, and multiple Ubers are unbanned for differing reasons (being Regieleki, Volcarona, Espathra, Palafin, Landorus-Incarnate, Magearna, Ogerpon-Hearthflame, Roaring Moon, and Sneasler). As of this post, DLC2 isn't out on the main Pokemon Showdown server yet but note that the unbanned Gliscor and Darkrai are currently still banned in VaporeMons.

To celebrate VaporeMons being on main for the next 3 months, I'm sharing one of the most fun teams I've built in any competitive format, not even just VaporeMons, being this Misty Terrain Offense team featuring Revavroom!

[B][SIZE=6][COLOR=rgb(184, 49, 47)]THE TEAM[/COLOR][/SIZE][/B]
:sm/revavroom:
Revavroom @ Ruchbah Star Shard
Ability: Misty Surge
Tera Type: Fairy
EVs: 252 Atk / 4 SpD / 252 Spe
Jolly Nature
- Magical Torque
- Blazing Torque
- Rollout
- High Horsepower
[HIDE=Changes to Revavroom]
I will list all the changes that each Pokémon on the team received in VaporeMons, as well as the effects of any custom items they may be holding. Important changes will be listed first and bolded.
New Moves: [B]Magical Torque, Wicked Torque, Blazing Torque, Combat Torque, Noxious Torque, High Horsepower* [/B](gained before it got in in DLC1), Skull Bash, [B]Shrapnel Shot[/B], [B]Rollout

Rollout [/B]- Now 50 BP Rock-type U-Turn clone. Deals double damage if the user's side's last used move was either Rollout or Defense Curl
[B]Shrapnel Shot[/B] - 15 BP Physical Steel-type move, Hits 2-5 times, first hit lowers the foe's Defense by 1 stage
Skull Bash - Now a Physical Steel-type clone of (vanilla) Meteor Beam that boosts the user's Attack instead of SpA
Lash Out - Now 70 BP and 10 PP, doubles in power if the user has any negative stat boosts, non-volatile status conditions, or negative volatile status conditions

New Item: [B]Star Shards[/B] - When a Star Shard is held, Revavroom's type and ability changes to match the corresponding Starmobile from SV's story. Additionally, Revavroom's Steel and Poison moves, as well as moves of the Star Shard's type have 1.2x power.[HIDE=All Star Shards]
Segin Star Shard - Dark-type - Ability: Intimidate
Schedar Star Shard - Fire-type - Ability: Speed Boost
Navi Star Shard - Poison-type - Ability: Toxic Debris
Ruchbah Star Shard - Fairy-type - Ability: Misty Surge
Caph Star Shard - Fighting-type - Ability: Stamina
[/HIDE]
New Ability: Overcoat - Same effects as standard + the user is immune to hazards.
New Ability: Momentum - This Pokemon heals 12.5% of its max HP after getting hit by or using a [URL='https://pokepast.es/8537c3351eecfbe2']spinning move[/URL].
[/HIDE] Revavroom received a number of huge changes in VaporeMons, notably getting all of the Starmobile's Torque moves as great coverage options, and the Star Shard items that let it act like a mini version of the Starmobiles. In spite of these huge buffs, Revavroom remains unviable for the most part, especially since Light Clay's ban makes Shift Gear sets difficult to use. However, there's one thing that it can do that nothing else can do better: support Iron Valiant with Misty Terrain. In VaporeMons, 6 new abilities Quark Drive/Protosynthesis clones were created, each corresponding to each of the other weathers and terrains. Iron Valiant received Rune Drive, which is activated in Misty Terrain, which Revavroom-Ruchbah can set easily with Misty Surge. While this core was experimented with lightly earlier on into VaporeMons' lifespan, it was never particularly powerful. The Teal Mask DLC came with the return of Weezing-Galar, who also has Misty Surge and got numerous big buffs as well, so I experimented with it + Iron Valiant when the VaporeMons ladder opened up at the start of the month. However, I found it extremely underwhelming as it was very passive and difficult to set up Misty Terrain and get Iron Valiant in safely. I ended up looking to Revavroom-Ruchbah to fill this role as while it's a mostly worse Pokemon overall, Revavroom's access to pivoting moves in Parting Shot and Rollout makes it easier to get Iron Valiant in safely. Plus, its superior offensive presence to Weezing means that checks to it can't come in as easily, even when it's not clicking Rollout. This worked absolute wonders, as Revavroom's pivoting gives Iron Valiant way more opportunities to cleave through the foe's team and just generally lets me keep up momentum way more easily. In terms of what Revavroom can do by itself, it's not a bad attacker in its own right, hitting fairly hard with STAB Magical Torque (which hits 180 BP after STAB and the boost from the Star Shard) and chunking Fairy checks like Slowking-Galar, Iron Moth, and Corviknight with High Horsepower and Blazing Torque, which Iron Valiant greatly appreciates. All in all, Revavroom is a decent offensive pivot that forms a dangerous offensive core with one of THE best Pokemon in the tier.

:sm/iron valiant:
Iron Valiant @ Life Orb
Ability: Rune Drive
Shiny: Yes
Tera Type: Fairy
EVs: 4 Atk / 252 SpA / 252 Spe
Naive Nature
- Moonblast
- Thunderbolt
- Close Combat
- Shadow Ball
[HIDE=Changes to Iron Valiant]
New Moves: Chisel, Parry

Chisel - 45 BP Physical Rock-type move, gives the target a Substitute, then hits 4 times
Parry - 80 BP Physical Fighting-type move, prevents the foe from using priority moves on the turn the moves is used (a la Armor Tail)
Brick Break - Now 85 BP

New Ability: [B]Rune Drive[/B] - Misty Terrain active or Booster Energy used: highest stat is 1.3x, or 1.5x if Speed.
New Ability: Outclass - If this Pokémon has one type, it steals the primary typing off a Pokémon it hits with an attack (Note that since Iron Valiant has two types by default, it must use the Tera Shard item to get this ability to activate. The Tera Shard changes the user's typing to its Tera Type on switch-in)
[/HIDE] Iron Valiant is the star of the team, being its main wallbreaker and cleaner. Iron Valiant largely does the same things in both OU and VaporeMons, with Specs, Mixed Booster Energy, and Swords Dance Booster Energy sets, but now it has much better terrain setters to activate its Drive ability with. Thus, Iron Valiant can have the power of Life Orb and the Speed of Speed Booster Energy at the same time when in Revavroom's Misty Terrain, which makes it both super hard to switch into and super hard to revenge kill. Moonblast and Close Combat are powerful STAB options that threaten most of the best Pokemon in the tier, Thunderbolt hits Milotic (who's Water/Fairy and one of the best Pokemon in the tier) and Corviknight, and Shadow Ball can KO a weakened Gholdengo or Slowking-Galar.

:sm/magnezone:
Magnezone @ Leftovers
Ability: Levitate
Tera Type: Electric
EVs: 252 HP / 4 Def / 252 SpD
Calm Nature
- Volt Switch
- Echo Chamber
- Rebuild
- Rapid Spin
[HIDE=Changes to Magnezone]
New Moves:  [B]Rapid Spin[/B], Shrapnel Shot, [B]Rebuild[/B], [B]Echo Chamber[/B], Signal Beam, [B]Software Crash[/B] (Lost Electroweb)

[B]Rebuild [/B]- Steel-type Status move, Restores HP equal to the user's level * 1.25
[B]Echo Chamber[/B] - 90 BP Special Steel-type move, deals 1.5x more damage if the user's side used a sound move last turn (including itself)
[B]Software Crash[/B] - 100 BP, 95% Accuracy Special Bug-type move, deals either Bug or Electric-type damage, depending on which is more effective
Shrapnel Shot - 15 BP Physical Steel-type move, Hits 2-5 times, first hit lowers the foe's Defense by 1 stage
Signal Beam - Now suppresses the foe's ability after hitting

Now has [B]Levitate [/B]as its secondary ability instead of Sturdy
[/HIDE] Magnezone is the first of two defensive pivots on the team, serving as a spinner and special wall. With Levitate, Magnezone's defensive typing really shines in this meta, letting it very easily check the likes of Landorus-T, Ting-Lu, and Shaymin, who could all otherwise threaten it with Ground moves. This makes it very easy for Magnezone to come in and either remove hazards with Rapid Spin, heal with Rebuild, or pivot back out with Volt Switch, a move that also chips otherwise annoying Water and Flying-types like Milotic and Corviknight. Echo Chamber also gives Magnezone some nice offensive presence as well, being a 135 BP move before STAB every other turn that's super annoying for offensive mons to try to come into. All these qualities make Magnezone one of the most consistent hazard control options in the tier, which is exactly what it needs to do on this team. Leftovers keeps Magnezone healthy as Rebuild doesn't quite heal 50% of Magnezone's HP, so the extra bit of healing is much appreciated.

:sm/landorus-therian:
Landorus-Therian (M) @ Leftovers
Ability: Intimidate
Tera Type: Ground
EVs: 252 HP / 64 Def / 176 SpD / 16 Spe
Careful Nature
- Stealth Rock
- Earthquake
- Smack Down
- U-turn
[HIDE=Changes to Landorus]
New Moves: Storm Throw, [B]Spikes[/B], [B]Defog[/B], [B]Meteor Beam[/B], [B]Acrobatics[/B], Skull Bash, Desert Storm, [B]Natural Gift

Defog [/B]- Now also a Wind move (and generally way more distributed)
[B]Meteor Beam[/B] - Now also charges instantly in Sand
[B]Natural Gift[/B] - Now doesn't consume the berry
[B]Smack Down[/B] - Now 65 BP and prevents the foe from using pivoting moves for the rest of the turn
Storm Throw - Now 70 BP
Skull Bash - Now a Physical Steel-type clone of (vanilla) Meteor Beam that boosts the user's Attack instead of SpA
Desert Storm - 90 BP Physical Ground-type Future Sight clone, sets Sandstorm before hitting (currently bugged on the main server, where the Sand isn't set)
Brick Break - 85 BP

Landorus-Incarnate gained Cloud Nine in place of Sheer Force and is legal in OU
[/HIDE] The other part of the team's defensive core, it's the always reliable Landorus. Landorus actually received a fair number of buffs that have restored it to some of its former glory, further helped by Gliscor being banned in VaporeMons. This mixed defensive set acts as a second defensive pivot and hazard setter to help further the chip opponent's team down for Iron Valiant and the other sweepers. The EV spread is able to avoid a 2HKO from Ogerpon-Heartflame's Power Whip after Intimidate with Stealth Rock up, with most of the rest dumped into SpD to help take on Iron Moth, which this team really struggles with. Stealth Rock was chosen over Lando's newfound toy in Spikes as Landorus usually doesn't want to stay on the field for too long, so it's better to set Rocks and pivot into one of the offensive threats ASAP, as well as the fact that the team lacks a way to prevent hazard removal aside from offensive pressure, so taking time to set up Spikes that instantly get removed feels like a waste. Earthquake deals solid damage as STAB move and beats threatening Poison-types like Iron Moth, Smack Down allows Landorus to threaten Corviknight and Levitate Magnezone with an Earthquake next turn while preventing slow walls from pivoting on Lando, and U-Turn helps me keep up momentum. Leftovers are chosen over Rocky Helmet since Lando needs to come in fairly often to keep powerful physical threats in check all game, so the extra healing is needed.

:sm/manaphy:
Manaphy @ Leftovers
Ability: Healer
Tera Type: Water
EVs: 4 Def / 252 SpA / 252 Spe
Timid Nature
IVs: 0 Atk
- Tail Glow
- Surf
- Dazzling Gleam
- Energy Ball
[HIDE=Changes to Manaphy]
New Moves:  [B]Life Dew, Wash Away[/B], Signal Beam

[B]Life Dew[/B] - Heals 33% of the user's max HP. Heals the next Pokemon that switches in by 25% of their max HP
[B]Wash Away[/B] - 80 BP Special Water move, clears hazards and terrain from both sides of the field, then switches the foe out. -6 priority
Signal Beam - Now suppresses the foe's ability after hitting

New Ability: [B]Healer [/B]- On faint, the next Pokémon sent out heals 33% of its max HP.
[/HIDE] Manaphy acts as one of two potential setup sweepers on the team, while also acting as a decent check to Ground-types like Great Tusk and Water-types like Milotic and Alomomola. While Manaphy received a couple new wrinkles in VaporeMons, like recovery in Life Dew that could potentially be used alongside Take Heart as a stallbreaker, this set uses Manaphy in much of the same way you'd use it in OU. Tail Glow turns Manaphy into a deadly sweeper and midgame breaker, with most Pokemon folding to a +3 Surf or coverage. It's quite hard for Manaphy to sweep in VaporeMons, since there are many crazy offensive threats in the tier can easily revenge kill Manaphy, even from full, but sweeping is far from impossible. Plus, even if Manaphy only gets 1 or 2 kills, it really opens up the battle for the rest of the team. Energy Ball and Dazzling Gleam are the coverage moves of choice, hitting Water and Dragon-types that can tank a hit from a +3 Surf. I've gotten great value out of Dazzling Gleam but truthfully Ice Beam is likely the superior option there. Healer is used over Hydration, mainly because I'm not using Rain, but also because Healer's effect can really come in clutch in pinch, like giving Landorus more HP to make up for its lack of recovery, or giving Iron Valiant more chances to attack in spite of Life Orb recoil.

:sm/cinderace:
Cinderace @ Heavy-Duty Boots
Ability: Blaze
Tera Type: Fire
EVs: 252 Atk / 4 SpD / 252 Spe
Jolly Nature
- Pyro Ball
- Sucker Punch
- Gunk Shot
- Swords Dance
[HIDE=Changes to Cinderace]
New Moves: Peekaboo, Brick Break

Peekaboo - 140 BP Physical Fairy-type, charges at the beginning of the turn, hits at the end of the turn. Deals 0.5x damage if the user is hit before the move hits
Brick Break - Now 85 BP
Smack Down - Now 65 BP and prevents the foe from using pivoting moves for the rest of the turn

New Ability: [B]Blaze [/B]- 1.2x Power on Fire attacks. At 1/3 or less of its max HP, all of this Pokémon's moves deal 1.5x damage.
[/HIDE] Cinderace acts as a second setup sweeper and wallbreaker, as well as measure of Speed control, which is important since Iron Valiant won't always be in Misty Terrain. With the buffed Blaze making Pyro Ball a terrifying 144 BP at all times (and only getting stronger if you get chipped down), Cinderace a very powerful fast attacker in the tier, with Pyro Ball melting many neutral targets that try to come in. Blaze being used over Libero also means that Cinderace is able to more easily use Swords Dance, which allows Cinderace to deal genuinely insane damage, like OHKOing offensive Great Tusk at +2. Sucker Punch allows Cinderace to avoid getting revenge killed by Dragapult, while also dealing a ton of damage to faster threats like Jolteon and Booster Energy Iron Moth at +2. Gunk Shot hits the Water/Fairy Milotic, as well as OHKOing Ogerpon-Wellspring and Hearthflame, which Pyro Ball can't without prior chip, as well as potentially poisoning switch-ins like Fighting/Water Fur Coat Crabominable. Heavy-Duty Boots keeps Cinderace safe from hazards, making it easier to get in multiple times a game to impose its will.

[B][SIZE=6][COLOR=rgb(184, 49, 47)]WEAKNESSES[/COLOR][/SIZE][/B]
:sm/pelipper:[IMG]https://play.pokemonshowdown.com/sprites/ani/basculegion.gif[/IMG]
I've had the fortune of not running into Rain yet, but you could imagine how terrifying it would be if I did considering the fact that my only Water resist is Manaphy. Basculegion in particular is extremely terrifying, getting the Flip Turn on everything until it's eventually able to click Wave Crash 6 times. Iron Valiant luckily does outspeed Adamant Basculegion in Rain if Misty Terrain is up, but it's a bit tough to set up that situation without having to sack Revavroom, plus Rain teams often run Amoonguss which Valiant can't break through.

:sm/alomomola:
A very annoying defensive pivot to deal with simply because it's very hard to switch into. Switching into Flip Turn gives the opponent free momentum, while switching into Wash Away makes you switch out into a less favorable matchup, while also clearing my Misty Terrain if it's up. Plus, it's able to switch into both Landorus and Cinderace forever. Alomomola can never beat you offensively and Iron Valiant Thunderbolt can OHKO with some chip, but it can really effectively sap all of your momentum, which sucks for such an offensive team.

:sm/iron moth:
This mon is the very reason why I had to change Landorus to a more Specially Defensive spread, it's extremely annoying to deal with when I'm using two Fairy-types and a somewhat passive Steel-type. Booster Energy Iron Moth is able to outspeed and heavily damage everything on the team except for Landorus, who needs to be in pristine condition to take on repeated Fiery Dances. Additionally, Iron Moth is often seen on Grassy Terrain teams as its new Paradox ability, Photon Drive, activates in Grassy Terrain, replacing my Misty Terrain and putting me in an awkward position since Revavroom can't safely come in to reset terrain. After switching to SpD Lando, Iron Moth is a bit easier to deal with, as I just need to keep Lando and/or Manaphy extremely healthy, or I can soft check it with Cinderace who can eat an unboosted Sludge Wave and KO back with Pyro Ball into Sucker Punch.

:sm/delphox:
Another threatening Special Fire-type, Delphox is now a Fire/Fairy-type with multiple notable movepool buffs and the same buffed Blaze as Cinderace. Fire/Fairy coverage severely damaged my entire team, while Fire/Fairy is also one of the few type combos that resists Fairy and Fighting without being weak to Electric or Ghost. Luckily, Cinderace can revenge kill it as long as it hits a Gunk Shot, but if Cinderace is dead and it gets a Nasty Plot up, the game is probably over.


[B][SIZE=6][COLOR=rgb(184, 49, 47)]REPLAYS[/COLOR][/SIZE][/B]
[SIZE=1](some replays may feature slightly different sets)[/SIZE]
[URL]https://replay.pokemonshowdown.com/gen9vaporemons-2009433844[/URL]
[URL]https://replay.pokemonshowdown.com/gen9vaporemons-2009697108[/URL]
[URL]https://replay.pokemonshowdown.com/gen9vaporemons-2009635495[/URL]
[URL]https://replay.pokemonshowdown.com/gen9vaporemons-2009376618[/URL]
[URL]https://replay.pokemonshowdown.com/gen9vaporemons-2009061908[/URL]
[URL]https://replay.pokemonshowdown.com/gen9vaporemons-2009045621[/URL]
[URL]https://replay.pokemonshowdown.com/gen9vaporemons-2012390570[/URL] (being used by [USER=501316]zxgzxg[/USER])

[B][SIZE=6][COLOR=rgb(184, 49, 47)]SHOUTOUTS[/COLOR][/SIZE][/B]
Thank you to everyone in the Pet Mods community for giving me a real home on Smogon for over half a decade now, something like Pet Mods of the Season wouldn't be possible with out you guys.

Thank you to the fellow council members of VaporeMons, including [USER=566797]Beaf Cultist[/USER], [USER=264912]G-Luke[/USER], [USER=537477]Paulluxx[/USER], and [USER=501316]zxgzxg[/USER] for helping me build VaporeMons into the fun tier it is today. I haven't really played singles in this generation (mostly playing VGC) but playing VaporeMons makes singles extremely fun.

Thank you to everyone who's played VaporeMons on ladder so far, it's been the most fun I've had laddering in literal years and I hope that more and more people continue laddering.

And lastly, thank you for reading this RMT![/CENTER]
*/
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
			return this.chainModify(1.5);
		},
		isChoice: true,
		num: 220,
		rating: 3,
		gen: 3,
	},
	choicescarf: {
		name: "Choice Scarf",
		spritenum: 69,
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
		onModifySpe(spe, pokemon) {
			if (pokemon.volatiles['dynamax']) return;
			return this.chainModify(1.5);
		},
		isChoice: true,
		num: 287,
		gen: 4,
		rating: 3,
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
			return this.chainModify(1.5);
		},
		isChoice: true,
		num: 297,
		gen: 4,
		rating: 3,
	},
/*
[CENTER][SIZE=1]Approved by the Pet Mods Moderators[/SIZE]
:venusaur-mega::charizard-mega-x::charizard-mega-y::blastoise-mega::alakazam-mega::gengar-mega::kangaskhan-mega::pinsir-mega::gyarados-mega::aerodactyl-mega::mewtwo-mega-x::mewtwo-mega-y::ampharos-mega::scizor-mega::houndoom-mega::tyranitar-mega::gardevoir-mega::mawile-mega::aggron-mega;::manectric-mega::banette-mega::absol-mega::latias-mega::latios-mega::garchomp-mega::lucario-mega::abomasnow-mega::beedrill-mega::pidgeot-mega::slowbro-mega::steelix-mega::sceptile-mega::blaziken-mega::swampert-mega::sableye-mega::sharpedo-mega::camerupt-mega::glalie-mega::salamence-mega::metagross-mega::lopunny-mega::gallade-mega::audino-mega::diancie-mega:
:sm/lucario-mega:
[B][U]Break My Tier: [COLOR=rgb(41, 105, 176)]Gen 6[/COLOR] [COLOR=rgb(184, 49, 47)]Megas Revisited[/COLOR] Tournament[/U]
Host[/B]: [USER=328142]Yoshiblaze[/USER]

Welcome to the first ever Megas Revisited forum tournament! In this tournament, I of course want you to have fun, but I also want to ask you a favor. This tournament will serve as important playtesting for our metagame, so I have to ask you to [B][I]Break My Tier[/I][/B]. Find out what's broken, what sucks, and what nobody's thought of before, helping us make the metagame better while you maybe win some money in the end!
[/CENTER]
[B][I]What is Megas Revisited?[/I][/B]
Megas Revisited is a Gen 6 OU-based Pet Mod in which every Mega Evolution was removed, redesigned, and added back into the OU metagame, giving a fresh coat of paint on the first full generation that I got into competitive Pokémon with! These redesigns also included previously banned Megas, even Blaziken (who's base form is legal due to a complex ban), giving you more options than before.

[U]Resources for Megas Revisited[/U]
- [URL='https://www.smogon.com/forums/threads/gen-6-megas-revisited-slate-15-playtesting.3713949/']Forum Thread[/URL]
- [URL='https://discord.gg/QcPUTpmQ6x']Discord[/URL]
- [URL='https://docs.google.com/spreadsheets/d/1wK11cPHnPCmH7JFss6leKW6_-cumn3DuZA-YMzrzF-U/edit?usp=sharing']Spreadsheet [/URL]([URL='https://www.smogon.com/forums/threads/gen-6-megas-revisited-slate-15-playtesting.3713949/post-9652517']Condensed Version[/URL] by [USER=421372]The Damned[/USER])
- [URL='https://www.smogon.com/forums/threads/gen-6-megas-revisited-slate-15-playtesting.3713949/post-9458680']Sample Teams[/URL]
- [URL='https://www.smogon.com/forums/threads/gen-6-megas-revisited-slate-15-playtesting.3713949/post-9458681']Rough Viability List for Mega Pokemon[/URL]
- [URL='https://www.smogon.com/forums/forums/oras/']ORAS Subforum[/URL]
- [URL='https://www.smogon.com/dex/xy/formats/ou/']ORAS Strategy Dex[/URL]
- [URL='https://dragonheaven.herokuapp.com/#']Playable Here[/URL]

[B][U]Tournament Specific Rules[/U][/B]

[LIST]
[*]All [URL='https://www.smogon.com/forums/threads/tournament-rules-and-general-guidelines.3642760/'][B]general rules[/B][/URL] apply. [URL='https://www.smogon.com/forums/threads/tournament-scheduling-guidelines.3642746/'][B]Click here [/B][/URL]for guidelines about scheduling matches.
[*]Matches are Best of 3, which means that the first person to win two games wins the set and moves on in the tournament.
[*]Matches are to be played in the [URL='https://dragonheaven.herokuapp.com/'][B]Dragon Heaven Showdown Server[/B][/URL]. It is very highly recommended that you use the Dragon Heaven client, which makes teambuilding and battling much easier. Said client is linked above.
[*]Replays are [B]mandatory[/B]. It's highly recommended that you both [B]upload AND download the replay[/B], to ensure that if the replay gets overwritten, we still have it for the purposes of usage stats.
[*]If metagame changes occur during the middle of a round (such as balance changes), they will take effect the next round later.
[*]This is a single elimination tournament.
[*]The winner of the tournament receives [B]$10 USD[/B], which will be sent through PayPal (PayPal account [B]required [/B]to receive it).[HIDE=Other General Forum Tournament Rules]
[/HIDE]
[/LIST]
[HIDE=Other General Forum Tournament Rules]
[B]Identity[/B]
About playing on alts: It is entirely allowed to play on an alt other than your own main forum name, though if your opponent wishes to confirm your identity, you [B]must [/B]log on to your main alt to show them you are who you claim to be. This is to prevent people from pretending to be who they're not.

[B]Scouting[/B]
On scouting opponents: Going through your opponents replays of tournament and ladder games is entirely allowed, as long as a game is public there is nothing preventing you from watching it. An exception to this is abusing powers granted to you by being staff on Smogon or PS! to gain access to information a normal user wouldn't have access to, which is strictly forbidden.
On leaking teams: Divulging private information about someone's planned team to their opponent is never allowed, and will be heavily sanctioned. Requesting that such information be divulged is also grounds for punishment. Keep your scouting to publicly available information and you'll be fine.

[B]Timer Clause / Disconnections[/B]
On Timeout losses: A player that loses by having all his time run out loses the game. This is only not the case if the player that received the timeout loss can be verified to have suffered a True Disconnection. Rematches are only allowed if there was a True Disconnection.
On True Disconnection: The TD team has a secret threshold of seconds that your timer must be at or above, from the moment you disconnect, for a timeout loss to be considered a True disconnection.
[/HIDE]
Sign-Ups will be open for a week, then the tournament will start on [B]Monday, July 31st[/B]. You can join by simply replying to this thread with "in" or some variation. Have fun everyone!

[B][U]Sign-Ups[/U][/B]
zxgzxg
G-Luke
anaconja
Gekokeso
ViZar
Gravity Monkey
Beaf Cultist
Beebos
lavarina
Tanny89k
Totally_Odette
Concept Everything
Mr. Bossaru
The Damned
Charliezard7
Dragonitebestboi
MegaFlareon
wut
Turtlek
[CENTER][SIZE=1]Approved by the Pet Mods Moderators[/SIZE]
:venusaur-mega::charizard-mega-x::charizard-mega-y::blastoise-mega::alakazam-mega::gengar-mega::kangaskhan-mega::pinsir-mega::gyarados-mega::aerodactyl-mega::mewtwo-mega-x::mewtwo-mega-y::ampharos-mega::scizor-mega::houndoom-mega::tyranitar-mega::gardevoir-mega::mawile-mega::aggron-mega;::manectric-mega::banette-mega::absol-mega::latias-mega::latios-mega::garchomp-mega::lucario-mega::abomasnow-mega::beedrill-mega::pidgeot-mega::slowbro-mega::steelix-mega::sceptile-mega::blaziken-mega::swampert-mega::sableye-mega::sharpedo-mega::camerupt-mega::glalie-mega::salamence-mega::metagross-mega::lopunny-mega::gallade-mega::audino-mega::diancie-mega:
:sm/lucario-mega:
[B][U]Break My Tier: [COLOR=rgb(41, 105, 176)]Gen 6[/COLOR] [COLOR=rgb(184, 49, 47)]Megas Revisited[/COLOR] Tournament[/U]
Host[/B]: [USER=328142]Yoshiblaze[/USER]

Welcome to the first ever Megas Revisited forum tournament! In this tournament, I of course want you to have fun, but I also want to ask you a favor. This tournament will serve as important playtesting for our metagame, so I have to ask you to [B][I]Break My Tier[/I][/B]. Find out what's broken, what sucks, and what nobody's thought of before, helping us make the metagame better while you maybe win some money in the end!
[/CENTER]
[B][I]What is Megas Revisited?[/I][/B]
Megas Revisited is a Gen 6 OU-based Pet Mod in which every Mega Evolution was removed, redesigned, and added back into the OU metagame, giving a fresh coat of paint on the first full generation that I got into competitive Pokémon with! These redesigns also included previously banned Megas, even Blaziken (who's base form is legal due to a complex ban), giving you more options than before.

[U]Resources for Megas Revisited[/U]
- [URL='https://www.smogon.com/forums/threads/gen-6-megas-revisited-slate-15-playtesting.3713949/']Forum Thread[/URL]
- [URL='https://discord.gg/QcPUTpmQ6x']Discord[/URL]
- [URL='https://docs.google.com/spreadsheets/d/1wK11cPHnPCmH7JFss6leKW6_-cumn3DuZA-YMzrzF-U/edit?usp=sharing']Spreadsheet [/URL]([URL='https://www.smogon.com/forums/threads/gen-6-megas-revisited-slate-15-playtesting.3713949/post-9652517']Condensed Version[/URL] by [USER=421372]The Damned[/USER])
- [URL='https://www.smogon.com/forums/threads/gen-6-megas-revisited-slate-15-playtesting.3713949/post-9458680']Sample Teams[/URL]
- [URL='https://www.smogon.com/forums/threads/gen-6-megas-revisited-slate-15-playtesting.3713949/post-9458681']Rough Viability List for Mega Pokemon[/URL]
- [URL='https://www.smogon.com/forums/forums/oras/']ORAS Subforum[/URL]
- [URL='https://www.smogon.com/dex/xy/formats/ou/']ORAS Strategy Dex[/URL]
- [URL='https://dragonheaven.herokuapp.com/#']Playable Here[/URL]

[B][U]Tournament Specific Rules[/U][/B]

[LIST]
[*]All [URL='https://www.smogon.com/forums/threads/tournament-rules-and-general-guidelines.3642760/'][B]general rules[/B][/URL] apply. [URL='https://www.smogon.com/forums/threads/tournament-scheduling-guidelines.3642746/'][B]Click here [/B][/URL]for guidelines about scheduling matches.
[*]Matches are Best of 3, which means that the first person to win two games wins the set and moves on in the tournament.
[*]Matches are to be played in the [URL='https://dragonheaven.herokuapp.com/'][B]Dragon Heaven Showdown Server[/B][/URL]. It is very highly recommended that you use the Dragon Heaven client, which makes teambuilding and battling much easier. Said client is linked above.
[*]Replays are [B]mandatory[/B]. It's highly recommended that you both [B]upload AND download the replay[/B], to ensure that if the replay gets overwritten, we still have it for the purposes of usage stats.
[*]If metagame changes occur during the middle of a round (such as balance changes), they will take effect the next round later.
[*]This is a single elimination tournament.
[*]The winner of the tournament receives [B]$10 USD[/B], which will be sent through PayPal (PayPal account [B]required [/B]to receive it).[HIDE=Other General Forum Tournament Rules]
[/HIDE]
[/LIST]
[HIDE=Other General Forum Tournament Rules]
[B]Identity[/B]
About playing on alts: It is entirely allowed to play on an alt other than your own main forum name, though if your opponent wishes to confirm your identity, you [B]must [/B]log on to your main alt to show them you are who you claim to be. This is to prevent people from pretending to be who they're not.

[B]Scouting[/B]
On scouting opponents: Going through your opponents replays of tournament and ladder games is entirely allowed, as long as a game is public there is nothing preventing you from watching it. An exception to this is abusing powers granted to you by being staff on Smogon or PS! to gain access to information a normal user wouldn't have access to, which is strictly forbidden.
On leaking teams: Divulging private information about someone's planned team to their opponent is never allowed, and will be heavily sanctioned. Requesting that such information be divulged is also grounds for punishment. Keep your scouting to publicly available information and you'll be fine.

[B]Timer Clause / Disconnections[/B]
On Timeout losses: A player that loses by having all his time run out loses the game. This is only not the case if the player that received the timeout loss can be verified to have suffered a True Disconnection. Rematches are only allowed if there was a True Disconnection.
On True Disconnection: The TD team has a secret threshold of seconds that your timer must be at or above, from the moment you disconnect, for a timeout loss to be considered a True disconnection.
[/HIDE]
Sign-Ups will be open for a week, then the tournament will start on [B]Monday, July 31st[/B]. You can join by simply replying to this thread with "in" or some variation. Have fun everyone!

[B][U]Sign-Ups[/U][/B]
zxgzxg
G-Luke
anaconja
Gekokeso
ViZar
Gravity Monkey
Beaf Cultist
Beebos
lavarina
Tanny89k
Totally_Odette
Concept Everything
Mr. Bossaru
The Damned
Charliezard7
Dragonitebestboi
MegaFlareon
wut
Turtlek
[CENTER][SIZE=1]Approved by the Pet Mods Moderators[/SIZE]
:venusaur-mega::charizard-mega-x::charizard-mega-y::blastoise-mega::alakazam-mega::gengar-mega::kangaskhan-mega::pinsir-mega::gyarados-mega::aerodactyl-mega::mewtwo-mega-x::mewtwo-mega-y::ampharos-mega::scizor-mega::houndoom-mega::tyranitar-mega::gardevoir-mega::mawile-mega::aggron-mega;::manectric-mega::banette-mega::absol-mega::latias-mega::latios-mega::garchomp-mega::lucario-mega::abomasnow-mega::beedrill-mega::pidgeot-mega::slowbro-mega::steelix-mega::sceptile-mega::blaziken-mega::swampert-mega::sableye-mega::sharpedo-mega::camerupt-mega::glalie-mega::salamence-mega::metagross-mega::lopunny-mega::gallade-mega::audino-mega::diancie-mega:
:sm/lucario-mega:
[B][U]Break My Tier: [COLOR=rgb(41, 105, 176)]Gen 6[/COLOR] [COLOR=rgb(184, 49, 47)]Megas Revisited[/COLOR] Tournament[/U]
Host[/B]: [USER=328142]Yoshiblaze[/USER]

Welcome to the first ever Megas Revisited forum tournament! In this tournament, I of course want you to have fun, but I also want to ask you a favor. This tournament will serve as important playtesting for our metagame, so I have to ask you to [B][I]Break My Tier[/I][/B]. Find out what's broken, what sucks, and what nobody's thought of before, helping us make the metagame better while you maybe win some money in the end!
[/CENTER]
[B][I]What is Megas Revisited?[/I][/B]
Megas Revisited is a Gen 6 OU-based Pet Mod in which every Mega Evolution was removed, redesigned, and added back into the OU metagame, giving a fresh coat of paint on the first full generation that I got into competitive Pokémon with! These redesigns also included previously banned Megas, even Blaziken (who's base form is legal due to a complex ban), giving you more options than before.

[U]Resources for Megas Revisited[/U]
- [URL='https://www.smogon.com/forums/threads/gen-6-megas-revisited-slate-15-playtesting.3713949/']Forum Thread[/URL]
- [URL='https://discord.gg/QcPUTpmQ6x']Discord[/URL]
- [URL='https://docs.google.com/spreadsheets/d/1wK11cPHnPCmH7JFss6leKW6_-cumn3DuZA-YMzrzF-U/edit?usp=sharing']Spreadsheet [/URL]([URL='https://www.smogon.com/forums/threads/gen-6-megas-revisited-slate-15-playtesting.3713949/post-9652517']Condensed Version[/URL] by [USER=421372]The Damned[/USER])
- [URL='https://www.smogon.com/forums/threads/gen-6-megas-revisited-slate-15-playtesting.3713949/post-9458680']Sample Teams[/URL]
- [URL='https://www.smogon.com/forums/threads/gen-6-megas-revisited-slate-15-playtesting.3713949/post-9458681']Rough Viability List for Mega Pokemon[/URL]
- [URL='https://www.smogon.com/forums/forums/oras/']ORAS Subforum[/URL]
- [URL='https://www.smogon.com/dex/xy/formats/ou/']ORAS Strategy Dex[/URL]
- [URL='https://dragonheaven.herokuapp.com/#']Playable Here[/URL]

[B][U]Tournament Specific Rules[/U][/B]

[LIST]
[*]All [URL='https://www.smogon.com/forums/threads/tournament-rules-and-general-guidelines.3642760/'][B]general rules[/B][/URL] apply. [URL='https://www.smogon.com/forums/threads/tournament-scheduling-guidelines.3642746/'][B]Click here [/B][/URL]for guidelines about scheduling matches.
[*]Matches are Best of 3, which means that the first person to win two games wins the set and moves on in the tournament.
[*]Matches are to be played in the [URL='https://dragonheaven.herokuapp.com/'][B]Dragon Heaven Showdown Server[/B][/URL]. It is very highly recommended that you use the Dragon Heaven client, which makes teambuilding and battling much easier. Said client is linked above.
[*]Replays are [B]mandatory[/B]. It's highly recommended that you both [B]upload AND download the replay[/B], to ensure that if the replay gets overwritten, we still have it for the purposes of usage stats.
[*]If metagame changes occur during the middle of a round (such as balance changes), they will take effect the next round later.
[*]This is a single elimination tournament.
[*]The winner of the tournament receives [B]$10 USD[/B], which will be sent through PayPal (PayPal account [B]required [/B]to receive it).[HIDE=Other General Forum Tournament Rules]
[/HIDE]
[/LIST]
[HIDE=Other General Forum Tournament Rules]
[B]Identity[/B]
About playing on alts: It is entirely allowed to play on an alt other than your own main forum name, though if your opponent wishes to confirm your identity, you [B]must [/B]log on to your main alt to show them you are who you claim to be. This is to prevent people from pretending to be who they're not.

[B]Scouting[/B]
On scouting opponents: Going through your opponents replays of tournament and ladder games is entirely allowed, as long as a game is public there is nothing preventing you from watching it. An exception to this is abusing powers granted to you by being staff on Smogon or PS! to gain access to information a normal user wouldn't have access to, which is strictly forbidden.
On leaking teams: Divulging private information about someone's planned team to their opponent is never allowed, and will be heavily sanctioned. Requesting that such information be divulged is also grounds for punishment. Keep your scouting to publicly available information and you'll be fine.

[B]Timer Clause / Disconnections[/B]
On Timeout losses: A player that loses by having all his time run out loses the game. This is only not the case if the player that received the timeout loss can be verified to have suffered a True Disconnection. Rematches are only allowed if there was a True Disconnection.
On True Disconnection: The TD team has a secret threshold of seconds that your timer must be at or above, from the moment you disconnect, for a timeout loss to be considered a True disconnection.
[/HIDE]
Sign-Ups will be open for a week, then the tournament will start on [B]Monday, July 31st[/B]. You can join by simply replying to this thread with "in" or some variation. Have fun everyone!

[B][U]Sign-Ups[/U][/B]
zxgzxg
G-Luke
anaconja
Gekokeso
ViZar
Gravity Monkey
Beaf Cultist
Beebos
lavarina
Tanny89k
Totally_Odette
Concept Everything
Mr. Bossaru
The Damned
Charliezard7
Dragonitebestboi
MegaFlareon
wut
Turtlek
*/
	chopleberry: {
		name: "Chople Berry",
		spritenum: 71,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Fighting",
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Fighting' && target.getMoveHitData(move).typeMod > 0) {
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
		num: 189,
		gen: 4,
	},
	clawfossil: {
		name: "Claw Fossil",
		spritenum: 72,
		fling: {
			basePower: 100,
		},
		num: 100,
		gen: 3,
		isNonstandard: "Past",
		rating: 0,
	},
	clearamulet: {
		name: "Clear Amulet",
		spritenum: 747,
		fling: {
			basePower: 30,
		},
		onTryBoost(boost, target, source, effect) {
			if (source && target === source) return;
			let showMsg = false;
			let i: BoostID;
			for (i in boost) {
				if (boost[i]! < 0) {
					delete boost[i];
					showMsg = true;
				}
			}
			if (showMsg && !(effect as ActiveMove).secondaries && effect.id !== 'octolock') {
				this.add('-fail', target, 'unboost', '[from] item: Clear Amulet', '[of] ' + target);
			}
		},
		num: 1882,
		gen: 9,
	},
	cloversweet: {
		name: "Clover Sweet",
		spritenum: 707,
		fling: {
			basePower: 10,
		},
		num: 1112,
		gen: 8,
		rating: 0,
	},
	cobaberry: {
		name: "Coba Berry",
		spritenum: 76,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Flying",
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Flying' && target.getMoveHitData(move).typeMod > 0) {
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
		num: 192,
		gen: 4,
	},
	colburberry: {
		name: "Colbur Berry",
		spritenum: 78,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Dark",
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Dark' && target.getMoveHitData(move).typeMod > 0) {
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
		num: 198,
		gen: 4,
	},
	cornerstonemask: {
		name: "Cornerstone Mask",
		spritenum: 758,
		fling: {
			basePower: 60,
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (user.baseSpecies.name.startsWith('Ogerpon-Cornerstone')) {
				return this.chainModify([4915, 4096]);
			}
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Ogerpon') return false;
			return true;
		},
		forcedForme: "Ogerpon-Cornerstone",
		itemUser: ["Ogerpon-Cornerstone"],
		num: 2406,
		gen: 9,
	},
	cornnberry: {
		name: "Cornn Berry",
		spritenum: 81,
		isBerry: true,
		naturalGift: {
			basePower: 90,
			type: "Bug",
		},
		onEat: false,
		num: 175,
		gen: 3,
		isNonstandard: "Past",
		rating: 0,
	},
	coverfossil: {
		name: "Cover Fossil",
		spritenum: 85,
		fling: {
			basePower: 100,
		},
		num: 572,
		gen: 5,
		isNonstandard: "Past",
		rating: 0,
	},
/*
[CENTER][SIZE=1]Approved by the Pet Mods Moderators[/SIZE]
:venusaur-mega::charizard-mega-x::charizard-mega-y::blastoise-mega::alakazam-mega::gengar-mega::kangaskhan-mega::pinsir-mega::gyarados-mega::aerodactyl-mega::mewtwo-mega-x::mewtwo-mega-y::ampharos-mega::scizor-mega::houndoom-mega::tyranitar-mega::gardevoir-mega::mawile-mega::aggron-mega;::manectric-mega::banette-mega::absol-mega::latias-mega::latios-mega::garchomp-mega::lucario-mega::abomasnow-mega::beedrill-mega::pidgeot-mega::slowbro-mega::steelix-mega::sceptile-mega::blaziken-mega::swampert-mega::sableye-mega::sharpedo-mega::camerupt-mega::glalie-mega::salamence-mega::metagross-mega::lopunny-mega::gallade-mega::audino-mega::diancie-mega:
:sm/lucario-mega:
[B][U]Break My Tier: [COLOR=rgb(41, 105, 176)]Gen 6[/COLOR] [COLOR=rgb(184, 49, 47)]Megas Revisited[/COLOR] Tournament[/U]
Host[/B]: [USER=328142]Yoshiblaze[/USER]

Welcome to the first ever Megas Revisited forum tournament! In this tournament, I of course want you to have fun, but I also want to ask you a favor. This tournament will serve as important playtesting for our metagame, so I have to ask you to [B][I]Break My Tier[/I][/B]. Find out what's broken, what sucks, and what nobody's thought of before, helping us make the metagame better while you maybe win some money in the end!
[/CENTER]
[B][I]What is Megas Revisited?[/I][/B]
Megas Revisited is a Gen 6 OU-based Pet Mod in which every Mega Evolution was removed, redesigned, and added back into the OU metagame, giving a fresh coat of paint on the first full generation that I got into competitive Pokémon with! These redesigns also included previously banned Megas, even Blaziken (who's base form is legal due to a complex ban), giving you more options than before.

[U]Resources for Megas Revisited[/U]
- [URL='https://www.smogon.com/forums/threads/gen-6-megas-revisited-slate-15-playtesting.3713949/']Forum Thread[/URL]
- [URL='https://discord.gg/QcPUTpmQ6x']Discord[/URL]
- [URL='https://docs.google.com/spreadsheets/d/1wK11cPHnPCmH7JFss6leKW6_-cumn3DuZA-YMzrzF-U/edit?usp=sharing']Spreadsheet [/URL]([URL='https://www.smogon.com/forums/threads/gen-6-megas-revisited-slate-15-playtesting.3713949/post-9652517']Condensed Version[/URL] by [USER=421372]The Damned[/USER])
- [URL='https://www.smogon.com/forums/threads/gen-6-megas-revisited-slate-15-playtesting.3713949/post-9458680']Sample Teams[/URL]
- [URL='https://www.smogon.com/forums/threads/gen-6-megas-revisited-slate-15-playtesting.3713949/post-9458681']Rough Viability List for Mega Pokemon[/URL]
- [URL='https://www.smogon.com/forums/forums/oras/']ORAS Subforum[/URL]
- [URL='https://www.smogon.com/dex/xy/formats/ou/']ORAS Strategy Dex[/URL]
- [URL='https://dragonheaven.herokuapp.com/#']Playable Here[/URL]

[B][U]Tournament Specific Rules[/U][/B]

[LIST]
[*]All [URL='https://www.smogon.com/forums/threads/tournament-rules-and-general-guidelines.3642760/'][B]general rules[/B][/URL] apply. [URL='https://www.smogon.com/forums/threads/tournament-scheduling-guidelines.3642746/'][B]Click here [/B][/URL]for guidelines about scheduling matches.
[*]Matches are Best of 3, which means that the first person to win two games wins the set and moves on in the tournament.
[*]Matches are to be played in the [URL='https://dragonheaven.herokuapp.com/'][B]Dragon Heaven Showdown Server[/B][/URL]. It is very highly recommended that you use the Dragon Heaven client, which makes teambuilding and battling much easier. Said client is linked above.
[*]Replays are [B]mandatory[/B]. It's highly recommended that you both [B]upload AND download the replay[/B], to ensure that if the replay gets overwritten, we still have it for the purposes of usage stats.
[*]If metagame changes occur during the middle of a round (such as balance changes), they will take effect the next round later.
[*]This is a single elimination tournament.
[*]The winner of the tournament receives [B]$10 USD[/B], which will be sent through PayPal (PayPal account [B]required [/B]to receive it).[HIDE=Other General Forum Tournament Rules]
[/HIDE]
[/LIST]
[HIDE=Other General Forum Tournament Rules]
[B]Identity[/B]
About playing on alts: It is entirely allowed to play on an alt other than your own main forum name, though if your opponent wishes to confirm your identity, you [B]must [/B]log on to your main alt to show them you are who you claim to be. This is to prevent people from pretending to be who they're not.

[B]Scouting[/B]
On scouting opponents: Going through your opponents replays of tournament and ladder games is entirely allowed, as long as a game is public there is nothing preventing you from watching it. An exception to this is abusing powers granted to you by being staff on Smogon or PS! to gain access to information a normal user wouldn't have access to, which is strictly forbidden.
On leaking teams: Divulging private information about someone's planned team to their opponent is never allowed, and will be heavily sanctioned. Requesting that such information be divulged is also grounds for punishment. Keep your scouting to publicly available information and you'll be fine.

[B]Timer Clause / Disconnections[/B]
On Timeout losses: A player that loses by having all his time run out loses the game. This is only not the case if the player that received the timeout loss can be verified to have suffered a True Disconnection. Rematches are only allowed if there was a True Disconnection.
On True Disconnection: The TD team has a secret threshold of seconds that your timer must be at or above, from the moment you disconnect, for a timeout loss to be considered a True disconnection.
[/HIDE]
Sign-Ups will be open for a week, then the tournament will start on [B]Monday, July 31st[/B]. You can join by simply replying to this thread with "in" or some variation. Have fun everyone!

[B][U]Sign-Ups[/U][/B]
zxgzxg
G-Luke
anaconja
Gekokeso
ViZar
Gravity Monkey
Beaf Cultist
Beebos
lavarina
Tanny89k
Totally_Odette
Concept Everything
Mr. Bossaru
The Damned
Charliezard7
Dragonitebestboi
MegaFlareon
wut
Turtlek
*/
	covertcloak: {
		name: "Covert Cloak",
		spritenum: 750,
		fling: {
			basePower: 30,
		},
		onModifySecondaries(secondaries) {
			this.debug('Covert Cloak prevent secondary');
			return secondaries.filter(effect => !!(effect.self || effect.dustproof));
		},
		num: 1885,
		gen: 9,
	},
	crackedpot: {
		name: "Cracked Pot",
		spritenum: 719,
		fling: {
			basePower: 80,
		},
		num: 1253,
		gen: 8,
		rating: 0,
	},
	custapberry: {
		name: "Custap Berry",
		spritenum: 86,
		isBerry: true,
		naturalGift: {
			basePower: 100,
			type: "Ghost",
		},
		onFractionalPriorityPriority: -2,
		onFractionalPriority(priority, pokemon) {
			if (
				priority <= 0 &&
				(pokemon.hp <= pokemon.maxhp / 4 || (pokemon.hp <= pokemon.maxhp / 2 &&
				pokemon.hasAbility('gluttony') && pokemon.abilityState.gluttony))
			) {
				if (pokemon.eatItem()) {
					this.add('-activate', pokemon, 'item: Custap Berry', '[consumed]');
					return 0.1;
				}
			}
		},
		onEat() { },
		num: 210,
		gen: 4,
	},
	damprock: {
		name: "Damp Rock",
		spritenum: 88,
		fling: {
			basePower: 60,
		},
		num: 285,
		gen: 4,
	},
	darkgem: {
		name: "Dark Gem",
		spritenum: 89,
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status') return;
			if (move.type === 'Dark' && source.useItem()) {
				source.addVolatile('gem');
			}
		},
		num: 562,
		gen: 5,
		isNonstandard: "Past",
	},
	darkmemory: {
		name: "Dark Memory",
		spritenum: 683,
		onMemory: 'Dark',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 773) || pokemon.baseSpecies.num === 773) {
				return false;
			}
			return true;
		},
		forcedForme: "Silvally-Dark",
		itemUser: ["Silvally-Dark"],
		num: 919,
		gen: 7,
		isNonstandard: "Past",
	},
/*
[CENTER][SIZE=1]Approved by the Pet Mods Moderators[/SIZE]
:venusaur-mega::charizard-mega-x::charizard-mega-y::blastoise-mega::alakazam-mega::gengar-mega::kangaskhan-mega::pinsir-mega::gyarados-mega::aerodactyl-mega::mewtwo-mega-x::mewtwo-mega-y::ampharos-mega::scizor-mega::houndoom-mega::tyranitar-mega::gardevoir-mega::mawile-mega::aggron-mega;::manectric-mega::banette-mega::absol-mega::latias-mega::latios-mega::garchomp-mega::lucario-mega::abomasnow-mega::beedrill-mega::pidgeot-mega::slowbro-mega::steelix-mega::sceptile-mega::blaziken-mega::swampert-mega::sableye-mega::sharpedo-mega::camerupt-mega::glalie-mega::salamence-mega::metagross-mega::lopunny-mega::gallade-mega::audino-mega::diancie-mega:
:sm/lucario-mega:
[B][U]Break My Tier: [COLOR=rgb(41, 105, 176)]Gen 6[/COLOR] [COLOR=rgb(184, 49, 47)]Megas Revisited[/COLOR] Tournament[/U]
Host[/B]: [USER=328142]Yoshiblaze[/USER]

Welcome to the first ever Megas Revisited forum tournament! In this tournament, I of course want you to have fun, but I also want to ask you a favor. This tournament will serve as important playtesting for our metagame, so I have to ask you to [B][I]Break My Tier[/I][/B]. Find out what's broken, what sucks, and what nobody's thought of before, helping us make the metagame better while you maybe win some money in the end!
[/CENTER]
[B][I]What is Megas Revisited?[/I][/B]
Megas Revisited is a Gen 6 OU-based Pet Mod in which every Mega Evolution was removed, redesigned, and added back into the OU metagame, giving a fresh coat of paint on the first full generation that I got into competitive Pokémon with! These redesigns also included previously banned Megas, even Blaziken (who's base form is legal due to a complex ban), giving you more options than before.

[U]Resources for Megas Revisited[/U]
- [URL='https://www.smogon.com/forums/threads/gen-6-megas-revisited-slate-15-playtesting.3713949/']Forum Thread[/URL]
- [URL='https://discord.gg/QcPUTpmQ6x']Discord[/URL]
- [URL='https://docs.google.com/spreadsheets/d/1wK11cPHnPCmH7JFss6leKW6_-cumn3DuZA-YMzrzF-U/edit?usp=sharing']Spreadsheet [/URL]([URL='https://www.smogon.com/forums/threads/gen-6-megas-revisited-slate-15-playtesting.3713949/post-9652517']Condensed Version[/URL] by [USER=421372]The Damned[/USER])
- [URL='https://www.smogon.com/forums/threads/gen-6-megas-revisited-slate-15-playtesting.3713949/post-9458680']Sample Teams[/URL]
- [URL='https://www.smogon.com/forums/threads/gen-6-megas-revisited-slate-15-playtesting.3713949/post-9458681']Rough Viability List for Mega Pokemon[/URL]
- [URL='https://www.smogon.com/forums/forums/oras/']ORAS Subforum[/URL]
- [URL='https://www.smogon.com/dex/xy/formats/ou/']ORAS Strategy Dex[/URL]
- [URL='https://dragonheaven.herokuapp.com/#']Playable Here[/URL]

[B][U]Tournament Specific Rules[/U][/B]

[LIST]
[*]All [URL='https://www.smogon.com/forums/threads/tournament-rules-and-general-guidelines.3642760/'][B]general rules[/B][/URL] apply. [URL='https://www.smogon.com/forums/threads/tournament-scheduling-guidelines.3642746/'][B]Click here [/B][/URL]for guidelines about scheduling matches.
[*]Matches are Best of 3, which means that the first person to win two games wins the set and moves on in the tournament.
[*]Matches are to be played in the [URL='https://dragonheaven.herokuapp.com/'][B]Dragon Heaven Showdown Server[/B][/URL]. It is very highly recommended that you use the Dragon Heaven client, which makes teambuilding and battling much easier. Said client is linked above.
[*]Replays are [B]mandatory[/B]. It's highly recommended that you both [B]upload AND download the replay[/B], to ensure that if the replay gets overwritten, we still have it for the purposes of usage stats.
[*]If metagame changes occur during the middle of a round (such as balance changes), they will take effect the next round later.
[*]This is a single elimination tournament.
[*]The winner of the tournament receives [B]$10 USD[/B], which will be sent through PayPal (PayPal account [B]required [/B]to receive it).[HIDE=Other General Forum Tournament Rules]
[/HIDE]
[/LIST]
[HIDE=Other General Forum Tournament Rules]
[B]Identity[/B]
About playing on alts: It is entirely allowed to play on an alt other than your own main forum name, though if your opponent wishes to confirm your identity, you [B]must [/B]log on to your main alt to show them you are who you claim to be. This is to prevent people from pretending to be who they're not.

[B]Scouting[/B]
On scouting opponents: Going through your opponents replays of tournament and ladder games is entirely allowed, as long as a game is public there is nothing preventing you from watching it. An exception to this is abusing powers granted to you by being staff on Smogon or PS! to gain access to information a normal user wouldn't have access to, which is strictly forbidden.
On leaking teams: Divulging private information about someone's planned team to their opponent is never allowed, and will be heavily sanctioned. Requesting that such information be divulged is also grounds for punishment. Keep your scouting to publicly available information and you'll be fine.

[B]Timer Clause / Disconnections[/B]
On Timeout losses: A player that loses by having all his time run out loses the game. This is only not the case if the player that received the timeout loss can be verified to have suffered a True Disconnection. Rematches are only allowed if there was a True Disconnection.
On True Disconnection: The TD team has a secret threshold of seconds that your timer must be at or above, from the moment you disconnect, for a timeout loss to be considered a True disconnection.
[/HIDE]
Sign-Ups will be open for a week, then the tournament will start on [B]Monday, July 31st[/B]. You can join by simply replying to this thread with "in" or some variation. Have fun everyone!

[B][U]Sign-Ups[/U][/B]
zxgzxg
G-Luke
anaconja
Gekokeso
ViZar
Gravity Monkey
Beaf Cultist
Beebos
lavarina
Tanny89k
Totally_Odette
Concept Everything
Mr. Bossaru
The Damned
Charliezard7
Dragonitebestboi
MegaFlareon
wut
Turtlek
*/
	darkiniumz: {
		name: "Darkinium Z",
		spritenum: 646,
		onPlate: 'Dark',
		onTakeItem: false,
		zMove: true,
		zMoveType: "Dark",
		forcedForme: "Arceus-Dark",
		num: 791,
		gen: 7,
		isNonstandard: "Past",
	},
	dawnstone: {
		name: "Dawn Stone",
		spritenum: 92,
		fling: {
			basePower: 80,
		},
		num: 109,
		gen: 4,
		rating: 0,
	},
	decidiumz: {
		name: "Decidium Z",
		spritenum: 650,
		onTakeItem: false,
		zMove: "Sinister Arrow Raid",
		zMoveFrom: "Spirit Shackle",
		itemUser: ["Decidueye"],
		num: 798,
		gen: 7,
		isNonstandard: "Past",
	},
	deepseascale: {
		name: "Deep Sea Scale",
		spritenum: 93,
		fling: {
			basePower: 30,
		},
		onModifySpDPriority: 2,
		onModifySpD(spd, pokemon) {
			if (pokemon.baseSpecies.name === 'Clamperl') {
				return this.chainModify(2);
			}
		},
		itemUser: ["Clamperl"],
		num: 227,
		gen: 3,
		isNonstandard: "Past",
	},
	deepseatooth: {
		name: "Deep Sea Tooth",
		spritenum: 94,
		fling: {
			basePower: 90,
		},
		onModifySpAPriority: 1,
		onModifySpA(spa, pokemon) {
			if (pokemon.baseSpecies.name === 'Clamperl') {
				return this.chainModify(2);
			}
		},
		itemUser: ["Clamperl"],
		num: 226,
		gen: 3,
		isNonstandard: "Past",
	},
	destinyknot: {
		name: "Destiny Knot",
		spritenum: 95,
		fling: {
			basePower: 10,
		},
		onAttractPriority: -100,
		onAttract(target, source) {
			this.debug('attract intercepted: ' + target + ' from ' + source);
			if (!source || source === target) return;
			if (!source.volatiles['attract']) source.addVolatile('attract', target);
		},
		num: 280,
		gen: 4,
		rating: 1,
	},
	diancite: {
		name: "Diancite",
		spritenum: 624,
		megaStone: "Diancie-Mega",
		megaEvolves: "Diancie",
		itemUser: ["Diancie"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 764,
		gen: 6,
		isNonstandard: "Past",
	},
	diveball: {
		name: "Dive Ball",
		spritenum: 101,
		num: 7,
		gen: 3,
		isPokeball: true,
	},
	domefossil: {
		name: "Dome Fossil",
		spritenum: 102,
		fling: {
			basePower: 100,
		},
		num: 102,
		gen: 3,
		isNonstandard: "Past",
		rating: 0,
	},
	dousedrive: {
		name: "Douse Drive",
		spritenum: 103,
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 649) || pokemon.baseSpecies.num === 649) {
				return false;
			}
			return true;
		},
		onDrive: 'Water',
		forcedForme: "Genesect-Douse",
		itemUser: ["Genesect-Douse"],
		num: 116,
		gen: 5,
		isNonstandard: "Past",
	},
/*
[CENTER][SIZE=1]Approved by the Pet Mods Moderators[/SIZE]
:venusaur-mega::charizard-mega-x::charizard-mega-y::blastoise-mega::alakazam-mega::gengar-mega::kangaskhan-mega::pinsir-mega::gyarados-mega::aerodactyl-mega::mewtwo-mega-x::mewtwo-mega-y::ampharos-mega::scizor-mega::houndoom-mega::tyranitar-mega::gardevoir-mega::mawile-mega::aggron-mega;::manectric-mega::banette-mega::absol-mega::latias-mega::latios-mega::garchomp-mega::lucario-mega::abomasnow-mega::beedrill-mega::pidgeot-mega::slowbro-mega::steelix-mega::sceptile-mega::blaziken-mega::swampert-mega::sableye-mega::sharpedo-mega::camerupt-mega::glalie-mega::salamence-mega::metagross-mega::lopunny-mega::gallade-mega::audino-mega::diancie-mega:
:sm/lucario-mega:
[B][U]Break My Tier: [COLOR=rgb(41, 105, 176)]Gen 6[/COLOR] [COLOR=rgb(184, 49, 47)]Megas Revisited[/COLOR] Tournament[/U]
Host[/B]: [USER=328142]Yoshiblaze[/USER]

Welcome to the first ever Megas Revisited forum tournament! In this tournament, I of course want you to have fun, but I also want to ask you a favor. This tournament will serve as important playtesting for our metagame, so I have to ask you to [B][I]Break My Tier[/I][/B]. Find out what's broken, what sucks, and what nobody's thought of before, helping us make the metagame better while you maybe win some money in the end!
[/CENTER]
[B][I]What is Megas Revisited?[/I][/B]
Megas Revisited is a Gen 6 OU-based Pet Mod in which every Mega Evolution was removed, redesigned, and added back into the OU metagame, giving a fresh coat of paint on the first full generation that I got into competitive Pokémon with! These redesigns also included previously banned Megas, even Blaziken (who's base form is legal due to a complex ban), giving you more options than before.

[U]Resources for Megas Revisited[/U]
- [URL='https://www.smogon.com/forums/threads/gen-6-megas-revisited-slate-15-playtesting.3713949/']Forum Thread[/URL]
- [URL='https://discord.gg/QcPUTpmQ6x']Discord[/URL]
- [URL='https://docs.google.com/spreadsheets/d/1wK11cPHnPCmH7JFss6leKW6_-cumn3DuZA-YMzrzF-U/edit?usp=sharing']Spreadsheet [/URL]([URL='https://www.smogon.com/forums/threads/gen-6-megas-revisited-slate-15-playtesting.3713949/post-9652517']Condensed Version[/URL] by [USER=421372]The Damned[/USER])
- [URL='https://www.smogon.com/forums/threads/gen-6-megas-revisited-slate-15-playtesting.3713949/post-9458680']Sample Teams[/URL]
- [URL='https://www.smogon.com/forums/threads/gen-6-megas-revisited-slate-15-playtesting.3713949/post-9458681']Rough Viability List for Mega Pokemon[/URL]
- [URL='https://www.smogon.com/forums/forums/oras/']ORAS Subforum[/URL]
- [URL='https://www.smogon.com/dex/xy/formats/ou/']ORAS Strategy Dex[/URL]
- [URL='https://dragonheaven.herokuapp.com/#']Playable Here[/URL]

[B][U]Tournament Specific Rules[/U][/B]

[LIST]
[*]All [URL='https://www.smogon.com/forums/threads/tournament-rules-and-general-guidelines.3642760/'][B]general rules[/B][/URL] apply. [URL='https://www.smogon.com/forums/threads/tournament-scheduling-guidelines.3642746/'][B]Click here [/B][/URL]for guidelines about scheduling matches.
[*]Matches are Best of 3, which means that the first person to win two games wins the set and moves on in the tournament.
[*]Matches are to be played in the [URL='https://dragonheaven.herokuapp.com/'][B]Dragon Heaven Showdown Server[/B][/URL]. It is very highly recommended that you use the Dragon Heaven client, which makes teambuilding and battling much easier. Said client is linked above.
[*]Replays are [B]mandatory[/B]. It's highly recommended that you both [B]upload AND download the replay[/B], to ensure that if the replay gets overwritten, we still have it for the purposes of usage stats.
[*]If metagame changes occur during the middle of a round (such as balance changes), they will take effect the next round later.
[*]This is a single elimination tournament.
[*]The winner of the tournament receives [B]$10 USD[/B], which will be sent through PayPal (PayPal account [B]required [/B]to receive it).[HIDE=Other General Forum Tournament Rules]
[/HIDE]
[/LIST]
[HIDE=Other General Forum Tournament Rules]
[B]Identity[/B]
About playing on alts: It is entirely allowed to play on an alt other than your own main forum name, though if your opponent wishes to confirm your identity, you [B]must [/B]log on to your main alt to show them you are who you claim to be. This is to prevent people from pretending to be who they're not.

[B]Scouting[/B]
On scouting opponents: Going through your opponents replays of tournament and ladder games is entirely allowed, as long as a game is public there is nothing preventing you from watching it. An exception to this is abusing powers granted to you by being staff on Smogon or PS! to gain access to information a normal user wouldn't have access to, which is strictly forbidden.
On leaking teams: Divulging private information about someone's planned team to their opponent is never allowed, and will be heavily sanctioned. Requesting that such information be divulged is also grounds for punishment. Keep your scouting to publicly available information and you'll be fine.

[B]Timer Clause / Disconnections[/B]
On Timeout losses: A player that loses by having all his time run out loses the game. This is only not the case if the player that received the timeout loss can be verified to have suffered a True Disconnection. Rematches are only allowed if there was a True Disconnection.
On True Disconnection: The TD team has a secret threshold of seconds that your timer must be at or above, from the moment you disconnect, for a timeout loss to be considered a True disconnection.
[/HIDE]
Sign-Ups will be open for a week, then the tournament will start on [B]Monday, July 31st[/B]. You can join by simply replying to this thread with "in" or some variation. Have fun everyone!

[B][U]Sign-Ups[/U][/B]
zxgzxg
G-Luke
anaconja
Gekokeso
ViZar
Gravity Monkey
Beaf Cultist
Beebos
lavarina
Tanny89k
Totally_Odette
Concept Everything
Mr. Bossaru
The Damned
Charliezard7
Dragonitebestboi
MegaFlareon
wut
Turtlek
*/
	dracoplate: {
		name: "Draco Plate",
		spritenum: 105,
		onPlate: 'Dragon',
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Dragon') {
				return this.chainModify([4915, 4096]);
			}
		},
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 493) || pokemon.baseSpecies.num === 493) {
				return false;
			}
			return true;
		},
		forcedForme: "Arceus-Dragon",
		num: 311,
		gen: 4,
	},
	dragonfang: {
		name: "Dragon Fang",
		spritenum: 106,
		fling: {
			basePower: 70,
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Dragon') {
				return this.chainModify([4915, 4096]);
			}
		},
		num: 250,
		gen: 2,
	},
	dragongem: {
		name: "Dragon Gem",
		spritenum: 107,
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status') return;
			if (move.type === 'Dragon' && source.useItem()) {
				source.addVolatile('gem');
			}
		},
		num: 561,
		gen: 5,
		isNonstandard: "Past",
	},
	dragonmemory: {
		name: "Dragon Memory",
		spritenum: 682,
		onMemory: 'Dragon',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 773) || pokemon.baseSpecies.num === 773) {
				return false;
			}
			return true;
		},
		forcedForme: "Silvally-Dragon",
		itemUser: ["Silvally-Dragon"],
		num: 918,
		gen: 7,
		isNonstandard: "Past",
	},
	dragonscale: {
		name: "Dragon Scale",
		spritenum: 108,
		fling: {
			basePower: 30,
		},
		num: 235,
		gen: 2,
		rating: 0,
	},
	dragoniumz: {
		name: "Dragonium Z",
		spritenum: 645,
		onPlate: 'Dragon',
		onTakeItem: false,
		zMove: true,
		zMoveType: "Dragon",
		forcedForme: "Arceus-Dragon",
		num: 790,
		gen: 7,
		isNonstandard: "Past",
	},
	dreadplate: {
		name: "Dread Plate",
		spritenum: 110,
		onPlate: 'Dark',
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Dark') {
				return this.chainModify([4915, 4096]);
			}
		},
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 493) || pokemon.baseSpecies.num === 493) {
				return false;
			}
			return true;
		},
		forcedForme: "Arceus-Dark",
		num: 312,
		gen: 4,
	},
	dreamball: {
		name: "Dream Ball",
		spritenum: 111,
		num: 576,
		gen: 5,
		isPokeball: true,
	},
	dubiousdisc: {
		name: "Dubious Disc",
		spritenum: 113,
		fling: {
			basePower: 50,
		},
		num: 324,
		gen: 4,
		rating: 0,
	},
/*
[CENTER][SIZE=1]Approved by the Pet Mods Moderators[/SIZE]
:venusaur-mega::charizard-mega-x::charizard-mega-y::blastoise-mega::alakazam-mega::gengar-mega::kangaskhan-mega::pinsir-mega::gyarados-mega::aerodactyl-mega::mewtwo-mega-x::mewtwo-mega-y::ampharos-mega::scizor-mega::houndoom-mega::tyranitar-mega::gardevoir-mega::mawile-mega::aggron-mega;::manectric-mega::banette-mega::absol-mega::latias-mega::latios-mega::garchomp-mega::lucario-mega::abomasnow-mega::beedrill-mega::pidgeot-mega::slowbro-mega::steelix-mega::sceptile-mega::blaziken-mega::swampert-mega::sableye-mega::sharpedo-mega::camerupt-mega::glalie-mega::salamence-mega::metagross-mega::lopunny-mega::gallade-mega::audino-mega::diancie-mega:
:sm/lucario-mega:
[B][U]Break My Tier: [COLOR=rgb(41, 105, 176)]Gen 6[/COLOR] [COLOR=rgb(184, 49, 47)]Megas Revisited[/COLOR] Tournament[/U]
Host[/B]: [USER=328142]Yoshiblaze[/USER]

Welcome to the first ever Megas Revisited forum tournament! In this tournament, I of course want you to have fun, but I also want to ask you a favor. This tournament will serve as important playtesting for our metagame, so I have to ask you to [B][I]Break My Tier[/I][/B]. Find out what's broken, what sucks, and what nobody's thought of before, helping us make the metagame better while you maybe win some money in the end!
[/CENTER]
[B][I]What is Megas Revisited?[/I][/B]
Megas Revisited is a Gen 6 OU-based Pet Mod in which every Mega Evolution was removed, redesigned, and added back into the OU metagame, giving a fresh coat of paint on the first full generation that I got into competitive Pokémon with! These redesigns also included previously banned Megas, even Blaziken (who's base form is legal due to a complex ban), giving you more options than before.

[U]Resources for Megas Revisited[/U]
- [URL='https://www.smogon.com/forums/threads/gen-6-megas-revisited-slate-15-playtesting.3713949/']Forum Thread[/URL]
- [URL='https://discord.gg/QcPUTpmQ6x']Discord[/URL]
- [URL='https://docs.google.com/spreadsheets/d/1wK11cPHnPCmH7JFss6leKW6_-cumn3DuZA-YMzrzF-U/edit?usp=sharing']Spreadsheet [/URL]([URL='https://www.smogon.com/forums/threads/gen-6-megas-revisited-slate-15-playtesting.3713949/post-9652517']Condensed Version[/URL] by [USER=421372]The Damned[/USER])
- [URL='https://www.smogon.com/forums/threads/gen-6-megas-revisited-slate-15-playtesting.3713949/post-9458680']Sample Teams[/URL]
- [URL='https://www.smogon.com/forums/threads/gen-6-megas-revisited-slate-15-playtesting.3713949/post-9458681']Rough Viability List for Mega Pokemon[/URL]
- [URL='https://www.smogon.com/forums/forums/oras/']ORAS Subforum[/URL]
- [URL='https://www.smogon.com/dex/xy/formats/ou/']ORAS Strategy Dex[/URL]
- [URL='https://dragonheaven.herokuapp.com/#']Playable Here[/URL]

[B][U]Tournament Specific Rules[/U][/B]

[LIST]
[*]All [URL='https://www.smogon.com/forums/threads/tournament-rules-and-general-guidelines.3642760/'][B]general rules[/B][/URL] apply. [URL='https://www.smogon.com/forums/threads/tournament-scheduling-guidelines.3642746/'][B]Click here [/B][/URL]for guidelines about scheduling matches.
[*]Matches are Best of 3, which means that the first person to win two games wins the set and moves on in the tournament.
[*]Matches are to be played in the [URL='https://dragonheaven.herokuapp.com/'][B]Dragon Heaven Showdown Server[/B][/URL]. It is very highly recommended that you use the Dragon Heaven client, which makes teambuilding and battling much easier. Said client is linked above.
[*]Replays are [B]mandatory[/B]. It's highly recommended that you both [B]upload AND download the replay[/B], to ensure that if the replay gets overwritten, we still have it for the purposes of usage stats.
[*]If metagame changes occur during the middle of a round (such as balance changes), they will take effect the next round later.
[*]This is a single elimination tournament.
[*]The winner of the tournament receives [B]$10 USD[/B], which will be sent through PayPal (PayPal account [B]required [/B]to receive it).[HIDE=Other General Forum Tournament Rules]
[/HIDE]
[/LIST]
[HIDE=Other General Forum Tournament Rules]
[B]Identity[/B]
About playing on alts: It is entirely allowed to play on an alt other than your own main forum name, though if your opponent wishes to confirm your identity, you [B]must [/B]log on to your main alt to show them you are who you claim to be. This is to prevent people from pretending to be who they're not.

[B]Scouting[/B]
On scouting opponents: Going through your opponents replays of tournament and ladder games is entirely allowed, as long as a game is public there is nothing preventing you from watching it. An exception to this is abusing powers granted to you by being staff on Smogon or PS! to gain access to information a normal user wouldn't have access to, which is strictly forbidden.
On leaking teams: Divulging private information about someone's planned team to their opponent is never allowed, and will be heavily sanctioned. Requesting that such information be divulged is also grounds for punishment. Keep your scouting to publicly available information and you'll be fine.

[B]Timer Clause / Disconnections[/B]
On Timeout losses: A player that loses by having all his time run out loses the game. This is only not the case if the player that received the timeout loss can be verified to have suffered a True Disconnection. Rematches are only allowed if there was a True Disconnection.
On True Disconnection: The TD team has a secret threshold of seconds that your timer must be at or above, from the moment you disconnect, for a timeout loss to be considered a True disconnection.
[/HIDE]
Sign-Ups will be open for a week, then the tournament will start on [B]Monday, July 31st[/B]. You can join by simply replying to this thread with "in" or some variation. Have fun everyone!

[B][U]Sign-Ups[/U][/B]
zxgzxg
G-Luke
anaconja
Gekokeso
ViZar
Gravity Monkey
Beaf Cultist
Beebos
lavarina
Tanny89k
Totally_Odette
Concept Everything
Mr. Bossaru
The Damned
Charliezard7
Dragonitebestboi
MegaFlareon
wut
Turtlek
*/
	durinberry: {
		name: "Durin Berry",
		spritenum: 114,
		isBerry: true,
		naturalGift: {
			basePower: 100,
			type: "Water",
		},
		onEat: false,
		num: 182,
		gen: 3,
		isNonstandard: "Past",
		rating: 0,
	},
	duskball: {
		name: "Dusk Ball",
		spritenum: 115,
		num: 13,
		gen: 4,
		isPokeball: true,
	},
	duskstone: {
		name: "Dusk Stone",
		spritenum: 116,
		fling: {
			basePower: 80,
		},
		num: 108,
		gen: 4,
		rating: 0,
	},
	earthplate: {
		name: "Earth Plate",
		spritenum: 117,
		onPlate: 'Ground',
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Ground') {
				return this.chainModify([4915, 4096]);
			}
		},
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 493) || pokemon.baseSpecies.num === 493) {
				return false;
			}
			return true;
		},
		forcedForme: "Arceus-Ground",
		num: 305,
		gen: 4,
	},
	eeviumz: {
		name: "Eevium Z",
		spritenum: 657,
		onTakeItem: false,
		zMove: "Extreme Evoboost",
		zMoveFrom: "Last Resort",
		itemUser: ["Eevee"],
		num: 805,
		gen: 7,
		isNonstandard: "Past",
	},
	ejectbutton: {
		name: "Eject Button",
		spritenum: 118,
		fling: {
			basePower: 30,
		},
		onAfterMoveSecondaryPriority: 2,
		onAfterMoveSecondary(target, source, move) {
			if (source && source !== target && target.hp && move && move.category !== 'Status' && !move.flags['futuremove']) {
				if (!this.canSwitch(target.side) || target.forceSwitchFlag || target.beingCalledBack || target.isSkyDropped()) return;
				if (target.volatiles['commanding'] || target.volatiles['commanded']) return;
				for (const pokemon of this.getAllActive()) {
					if (pokemon.switchFlag === true) return;
				}
				target.switchFlag = true;
				if (target.useItem()) {
					source.switchFlag = false;
				} else {
					target.switchFlag = false;
				}
			}
		},
		num: 547,
		gen: 5,
	},
	ejectpack: {
		name: "Eject Pack",
		spritenum: 714,
		fling: {
			basePower: 50,
		},
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
					if (target.useItem()) target.switchFlag = true;
				}
			}
		},
		num: 1119,
		gen: 8,
	},
/*
[CENTER][SIZE=1]Approved by the Pet Mods Moderators[/SIZE]
:venusaur-mega::charizard-mega-x::charizard-mega-y::blastoise-mega::alakazam-mega::gengar-mega::kangaskhan-mega::pinsir-mega::gyarados-mega::aerodactyl-mega::mewtwo-mega-x::mewtwo-mega-y::ampharos-mega::scizor-mega::houndoom-mega::tyranitar-mega::gardevoir-mega::mawile-mega::aggron-mega;::manectric-mega::banette-mega::absol-mega::latias-mega::latios-mega::garchomp-mega::lucario-mega::abomasnow-mega::beedrill-mega::pidgeot-mega::slowbro-mega::steelix-mega::sceptile-mega::blaziken-mega::swampert-mega::sableye-mega::sharpedo-mega::camerupt-mega::glalie-mega::salamence-mega::metagross-mega::lopunny-mega::gallade-mega::audino-mega::diancie-mega:
:sm/lucario-mega:
[B][U]Break My Tier: [COLOR=rgb(41, 105, 176)]Gen 6[/COLOR] [COLOR=rgb(184, 49, 47)]Megas Revisited[/COLOR] Tournament[/U]
Host[/B]: [USER=328142]Yoshiblaze[/USER]

Welcome to the first ever Megas Revisited forum tournament! In this tournament, I of course want you to have fun, but I also want to ask you a favor. This tournament will serve as important playtesting for our metagame, so I have to ask you to [B][I]Break My Tier[/I][/B]. Find out what's broken, what sucks, and what nobody's thought of before, helping us make the metagame better while you maybe win some money in the end!
[/CENTER]
[B][I]What is Megas Revisited?[/I][/B]
Megas Revisited is a Gen 6 OU-based Pet Mod in which every Mega Evolution was removed, redesigned, and added back into the OU metagame, giving a fresh coat of paint on the first full generation that I got into competitive Pokémon with! These redesigns also included previously banned Megas, even Blaziken (who's base form is legal due to a complex ban), giving you more options than before.

[U]Resources for Megas Revisited[/U]
- [URL='https://www.smogon.com/forums/threads/gen-6-megas-revisited-slate-15-playtesting.3713949/']Forum Thread[/URL]
- [URL='https://discord.gg/QcPUTpmQ6x']Discord[/URL]
- [URL='https://docs.google.com/spreadsheets/d/1wK11cPHnPCmH7JFss6leKW6_-cumn3DuZA-YMzrzF-U/edit?usp=sharing']Spreadsheet [/URL]([URL='https://www.smogon.com/forums/threads/gen-6-megas-revisited-slate-15-playtesting.3713949/post-9652517']Condensed Version[/URL] by [USER=421372]The Damned[/USER])
- [URL='https://www.smogon.com/forums/threads/gen-6-megas-revisited-slate-15-playtesting.3713949/post-9458680']Sample Teams[/URL]
- [URL='https://www.smogon.com/forums/threads/gen-6-megas-revisited-slate-15-playtesting.3713949/post-9458681']Rough Viability List for Mega Pokemon[/URL]
- [URL='https://www.smogon.com/forums/forums/oras/']ORAS Subforum[/URL]
- [URL='https://www.smogon.com/dex/xy/formats/ou/']ORAS Strategy Dex[/URL]
- [URL='https://dragonheaven.herokuapp.com/#']Playable Here[/URL]

[B][U]Tournament Specific Rules[/U][/B]

[LIST]
[*]All [URL='https://www.smogon.com/forums/threads/tournament-rules-and-general-guidelines.3642760/'][B]general rules[/B][/URL] apply. [URL='https://www.smogon.com/forums/threads/tournament-scheduling-guidelines.3642746/'][B]Click here [/B][/URL]for guidelines about scheduling matches.
[*]Matches are Best of 3, which means that the first person to win two games wins the set and moves on in the tournament.
[*]Matches are to be played in the [URL='https://dragonheaven.herokuapp.com/'][B]Dragon Heaven Showdown Server[/B][/URL]. It is very highly recommended that you use the Dragon Heaven client, which makes teambuilding and battling much easier. Said client is linked above.
[*]Replays are [B]mandatory[/B]. It's highly recommended that you both [B]upload AND download the replay[/B], to ensure that if the replay gets overwritten, we still have it for the purposes of usage stats.
[*]If metagame changes occur during the middle of a round (such as balance changes), they will take effect the next round later.
[*]This is a single elimination tournament.
[*]The winner of the tournament receives [B]$10 USD[/B], which will be sent through PayPal (PayPal account [B]required [/B]to receive it).[HIDE=Other General Forum Tournament Rules]
[/HIDE]
[/LIST]
[HIDE=Other General Forum Tournament Rules]
[B]Identity[/B]
About playing on alts: It is entirely allowed to play on an alt other than your own main forum name, though if your opponent wishes to confirm your identity, you [B]must [/B]log on to your main alt to show them you are who you claim to be. This is to prevent people from pretending to be who they're not.

[B]Scouting[/B]
On scouting opponents: Going through your opponents replays of tournament and ladder games is entirely allowed, as long as a game is public there is nothing preventing you from watching it. An exception to this is abusing powers granted to you by being staff on Smogon or PS! to gain access to information a normal user wouldn't have access to, which is strictly forbidden.
On leaking teams: Divulging private information about someone's planned team to their opponent is never allowed, and will be heavily sanctioned. Requesting that such information be divulged is also grounds for punishment. Keep your scouting to publicly available information and you'll be fine.

[B]Timer Clause / Disconnections[/B]
On Timeout losses: A player that loses by having all his time run out loses the game. This is only not the case if the player that received the timeout loss can be verified to have suffered a True Disconnection. Rematches are only allowed if there was a True Disconnection.
On True Disconnection: The TD team has a secret threshold of seconds that your timer must be at or above, from the moment you disconnect, for a timeout loss to be considered a True disconnection.
[/HIDE]
Sign-Ups will be open for a week, then the tournament will start on [B]Monday, July 31st[/B]. You can join by simply replying to this thread with "in" or some variation. Have fun everyone!

[B][U]Sign-Ups[/U][/B]
zxgzxg
G-Luke
anaconja
Gekokeso
ViZar
Gravity Monkey
Beaf Cultist
Beebos
lavarina
Tanny89k
Totally_Odette
Concept Everything
Mr. Bossaru
The Damned
Charliezard7
Dragonitebestboi
MegaFlareon
wut
Turtlek
*/
	electirizer: {
		name: "Electirizer",
		spritenum: 119,
		fling: {
			basePower: 80,
		},
		num: 322,
		gen: 4,
		rating: 0,
	},
	electricgem: {
		name: "Electric Gem",
		spritenum: 120,
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status' || move.flags['pledgecombo']) return;
			if (move.type === 'Electric' && source.useItem()) {
				source.addVolatile('gem');
			}
		},
		num: 550,
		gen: 5,
		isNonstandard: "Past",
	},
	electricmemory: {
		name: "Electric Memory",
		spritenum: 679,
		onMemory: 'Electric',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 773) || pokemon.baseSpecies.num === 773) {
				return false;
			}
			return true;
		},
		forcedForme: "Silvally-Electric",
		itemUser: ["Silvally-Electric"],
		num: 915,
		gen: 7,
		isNonstandard: "Past",
	},
	electricseed: {
		name: "Electric Seed",
		spritenum: 664,
		fling: {
			basePower: 10,
		},
		onStart(pokemon) {
			if (!pokemon.ignoringItem() && this.field.isTerrain('electricterrain')) {
				pokemon.useItem();
			}
		},
		onTerrainChange(pokemon) {
			if (this.field.isTerrain('electricterrain')) {
				pokemon.useItem();
			}
		},
		boosts: {
			def: 1,
		},
		num: 881,
		gen: 7,
	},
	electriumz: {
		name: "Electrium Z",
		spritenum: 634,
		onPlate: 'Electric',
		onTakeItem: false,
		zMove: true,
		zMoveType: "Electric",
		forcedForme: "Arceus-Electric",
		num: 779,
		gen: 7,
		isNonstandard: "Past",
	},
	enigmaberry: {
		name: "Enigma Berry",
		spritenum: 124,
		isBerry: true,
		naturalGift: {
			basePower: 100,
			type: "Bug",
		},
		onHit(target, source, move) {
			if (move && target.getMoveHitData(move).typeMod > 0) {
				if (target.eatItem()) {
					this.heal(target.baseMaxhp / 4);
				}
			}
		},
		onTryEatItem(item, pokemon) {
			if (!this.runEvent('TryHeal', pokemon, null, this.effect, pokemon.baseMaxhp / 4)) return false;
		},
		onEat() { },
		num: 208,
		gen: 3,
		rating: 1,
	},
/*
[CENTER][SIZE=1]Approved by the Pet Mods Moderators[/SIZE]
:venusaur-mega::charizard-mega-x::charizard-mega-y::blastoise-mega::alakazam-mega::gengar-mega::kangaskhan-mega::pinsir-mega::gyarados-mega::aerodactyl-mega::mewtwo-mega-x::mewtwo-mega-y::ampharos-mega::scizor-mega::houndoom-mega::tyranitar-mega::gardevoir-mega::mawile-mega::aggron-mega;::manectric-mega::banette-mega::absol-mega::latias-mega::latios-mega::garchomp-mega::lucario-mega::abomasnow-mega::beedrill-mega::pidgeot-mega::slowbro-mega::steelix-mega::sceptile-mega::blaziken-mega::swampert-mega::sableye-mega::sharpedo-mega::camerupt-mega::glalie-mega::salamence-mega::metagross-mega::lopunny-mega::gallade-mega::audino-mega::diancie-mega:
:sm/lucario-mega:
[B][U]Break My Tier: [COLOR=rgb(41, 105, 176)]Gen 6[/COLOR] [COLOR=rgb(184, 49, 47)]Megas Revisited[/COLOR] Tournament[/U]
Host[/B]: [USER=328142]Yoshiblaze[/USER]

Welcome to the first ever Megas Revisited forum tournament! In this tournament, I of course want you to have fun, but I also want to ask you a favor. This tournament will serve as important playtesting for our metagame, so I have to ask you to [B][I]Break My Tier[/I][/B]. Find out what's broken, what sucks, and what nobody's thought of before, helping us make the metagame better while you maybe win some money in the end!
[/CENTER]
[B][I]What is Megas Revisited?[/I][/B]
Megas Revisited is a Gen 6 OU-based Pet Mod in which every Mega Evolution was removed, redesigned, and added back into the OU metagame, giving a fresh coat of paint on the first full generation that I got into competitive Pokémon with! These redesigns also included previously banned Megas, even Blaziken (who's base form is legal due to a complex ban), giving you more options than before.

[U]Resources for Megas Revisited[/U]
- [URL='https://www.smogon.com/forums/threads/gen-6-megas-revisited-slate-15-playtesting.3713949/']Forum Thread[/URL]
- [URL='https://discord.gg/QcPUTpmQ6x']Discord[/URL]
- [URL='https://docs.google.com/spreadsheets/d/1wK11cPHnPCmH7JFss6leKW6_-cumn3DuZA-YMzrzF-U/edit?usp=sharing']Spreadsheet [/URL]([URL='https://www.smogon.com/forums/threads/gen-6-megas-revisited-slate-15-playtesting.3713949/post-9652517']Condensed Version[/URL] by [USER=421372]The Damned[/USER])
- [URL='https://www.smogon.com/forums/threads/gen-6-megas-revisited-slate-15-playtesting.3713949/post-9458680']Sample Teams[/URL]
- [URL='https://www.smogon.com/forums/threads/gen-6-megas-revisited-slate-15-playtesting.3713949/post-9458681']Rough Viability List for Mega Pokemon[/URL]
- [URL='https://www.smogon.com/forums/forums/oras/']ORAS Subforum[/URL]
- [URL='https://www.smogon.com/dex/xy/formats/ou/']ORAS Strategy Dex[/URL]
- [URL='https://dragonheaven.herokuapp.com/#']Playable Here[/URL]

[B][U]Tournament Specific Rules[/U][/B]

[LIST]
[*]All [URL='https://www.smogon.com/forums/threads/tournament-rules-and-general-guidelines.3642760/'][B]general rules[/B][/URL] apply. [URL='https://www.smogon.com/forums/threads/tournament-scheduling-guidelines.3642746/'][B]Click here [/B][/URL]for guidelines about scheduling matches.
[*]Matches are Best of 3, which means that the first person to win two games wins the set and moves on in the tournament.
[*]Matches are to be played in the [URL='https://dragonheaven.herokuapp.com/'][B]Dragon Heaven Showdown Server[/B][/URL]. It is very highly recommended that you use the Dragon Heaven client, which makes teambuilding and battling much easier. Said client is linked above.
[*]Replays are [B]mandatory[/B]. It's highly recommended that you both [B]upload AND download the replay[/B], to ensure that if the replay gets overwritten, we still have it for the purposes of usage stats.
[*]If metagame changes occur during the middle of a round (such as balance changes), they will take effect the next round later.
[*]This is a single elimination tournament.
[*]The winner of the tournament receives [B]$10 USD[/B], which will be sent through PayPal (PayPal account [B]required [/B]to receive it).[HIDE=Other General Forum Tournament Rules]
[/HIDE]
[/LIST]
[HIDE=Other General Forum Tournament Rules]
[B]Identity[/B]
About playing on alts: It is entirely allowed to play on an alt other than your own main forum name, though if your opponent wishes to confirm your identity, you [B]must [/B]log on to your main alt to show them you are who you claim to be. This is to prevent people from pretending to be who they're not.

[B]Scouting[/B]
On scouting opponents: Going through your opponents replays of tournament and ladder games is entirely allowed, as long as a game is public there is nothing preventing you from watching it. An exception to this is abusing powers granted to you by being staff on Smogon or PS! to gain access to information a normal user wouldn't have access to, which is strictly forbidden.
On leaking teams: Divulging private information about someone's planned team to their opponent is never allowed, and will be heavily sanctioned. Requesting that such information be divulged is also grounds for punishment. Keep your scouting to publicly available information and you'll be fine.

[B]Timer Clause / Disconnections[/B]
On Timeout losses: A player that loses by having all his time run out loses the game. This is only not the case if the player that received the timeout loss can be verified to have suffered a True Disconnection. Rematches are only allowed if there was a True Disconnection.
On True Disconnection: The TD team has a secret threshold of seconds that your timer must be at or above, from the moment you disconnect, for a timeout loss to be considered a True disconnection.
[/HIDE]
Sign-Ups will be open for a week, then the tournament will start on [B]Monday, July 31st[/B]. You can join by simply replying to this thread with "in" or some variation. Have fun everyone!

[B][U]Sign-Ups[/U][/B]
zxgzxg
G-Luke
anaconja
Gekokeso
ViZar
Gravity Monkey
Beaf Cultist
Beebos
lavarina
Tanny89k
Totally_Odette
Concept Everything
Mr. Bossaru
The Damned
Charliezard7
Dragonitebestboi
MegaFlareon
wut
Turtlek
*/
	eviolite: {
		name: "Eviolite",
		spritenum: 130,
		fling: {
			basePower: 40,
		},
		onModifyDefPriority: 2,
		onModifyDef(def, pokemon) {
			if (pokemon.baseSpecies.nfe) {
				return this.chainModify(1.5);
			}
		},
		onModifySpDPriority: 2,
		onModifySpD(spd, pokemon) {
			if (pokemon.baseSpecies.nfe) {
				return this.chainModify(1.5);
			}
		},
		num: 538,
		gen: 5,
		rating: 3,
	},
	expertbelt: {
		name: "Expert Belt",
		spritenum: 132,
		fling: {
			basePower: 10,
		},
		onModifyDamage(damage, source, target, move) {
			if (move && target.getMoveHitData(move).typeMod > 0) {
				return this.chainModify([4915, 4096]);
			}
		},
		num: 268,
		gen: 4,
		rating: 3,
	},
	fairiumz: {
		name: "Fairium Z",
		spritenum: 648,
		onPlate: 'Fairy',
		onTakeItem: false,
		zMove: true,
		zMoveType: "Fairy",
		forcedForme: "Arceus-Fairy",
		num: 793,
		gen: 7,
		isNonstandard: "Past",
	},
	fairyfeather: {
		name: "Fairy Feather",
		spritenum: 754,
		fling: {
			basePower: 10,
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Fairy') {
				return this.chainModify([4915, 4096]);
			}
		},
		num: 2401,
		gen: 9,
	},
	fairygem: {
		name: "Fairy Gem",
		spritenum: 611,
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status') return;
			if (move.type === 'Fairy' && source.useItem()) {
				source.addVolatile('gem');
			}
		},
		num: 715,
		gen: 6,
		isNonstandard: "Past",
	},
	fairymemory: {
		name: "Fairy Memory",
		spritenum: 684,
		onMemory: 'Fairy',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 773) || pokemon.baseSpecies.num === 773) {
				return false;
			}
			return true;
		},
		forcedForme: "Silvally-Fairy",
		itemUser: ["Silvally-Fairy"],
		num: 920,
		gen: 7,
		isNonstandard: "Past",
	},
	fastball: {
		name: "Fast Ball",
		spritenum: 137,
		num: 492,
		gen: 2,
		isPokeball: true,
	},
	fightinggem: {
		name: "Fighting Gem",
		spritenum: 139,
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status') return;
			if (move.type === 'Fighting' && source.useItem()) {
				source.addVolatile('gem');
			}
		},
		num: 553,
		gen: 5,
		isNonstandard: "Past",
	},
/*
[CENTER][SIZE=1]Approved by the Pet Mods Moderators[/SIZE]
:venusaur-mega::charizard-mega-x::charizard-mega-y::blastoise-mega::alakazam-mega::gengar-mega::kangaskhan-mega::pinsir-mega::gyarados-mega::aerodactyl-mega::mewtwo-mega-x::mewtwo-mega-y::ampharos-mega::scizor-mega::houndoom-mega::tyranitar-mega::gardevoir-mega::mawile-mega::aggron-mega;::manectric-mega::banette-mega::absol-mega::latias-mega::latios-mega::garchomp-mega::lucario-mega::abomasnow-mega::beedrill-mega::pidgeot-mega::slowbro-mega::steelix-mega::sceptile-mega::blaziken-mega::swampert-mega::sableye-mega::sharpedo-mega::camerupt-mega::glalie-mega::salamence-mega::metagross-mega::lopunny-mega::gallade-mega::audino-mega::diancie-mega:
:sm/lucario-mega:
[B][U]Break My Tier: [COLOR=rgb(41, 105, 176)]Gen 6[/COLOR] [COLOR=rgb(184, 49, 47)]Megas Revisited[/COLOR] Tournament[/U]
Host[/B]: [USER=328142]Yoshiblaze[/USER]

Welcome to the first ever Megas Revisited forum tournament! In this tournament, I of course want you to have fun, but I also want to ask you a favor. This tournament will serve as important playtesting for our metagame, so I have to ask you to [B][I]Break My Tier[/I][/B]. Find out what's broken, what sucks, and what nobody's thought of before, helping us make the metagame better while you maybe win some money in the end!
[/CENTER]
[B][I]What is Megas Revisited?[/I][/B]
Megas Revisited is a Gen 6 OU-based Pet Mod in which every Mega Evolution was removed, redesigned, and added back into the OU metagame, giving a fresh coat of paint on the first full generation that I got into competitive Pokémon with! These redesigns also included previously banned Megas, even Blaziken (who's base form is legal due to a complex ban), giving you more options than before.

[U]Resources for Megas Revisited[/U]
- [URL='https://www.smogon.com/forums/threads/gen-6-megas-revisited-slate-15-playtesting.3713949/']Forum Thread[/URL]
- [URL='https://discord.gg/QcPUTpmQ6x']Discord[/URL]
- [URL='https://docs.google.com/spreadsheets/d/1wK11cPHnPCmH7JFss6leKW6_-cumn3DuZA-YMzrzF-U/edit?usp=sharing']Spreadsheet [/URL]([URL='https://www.smogon.com/forums/threads/gen-6-megas-revisited-slate-15-playtesting.3713949/post-9652517']Condensed Version[/URL] by [USER=421372]The Damned[/USER])
- [URL='https://www.smogon.com/forums/threads/gen-6-megas-revisited-slate-15-playtesting.3713949/post-9458680']Sample Teams[/URL]
- [URL='https://www.smogon.com/forums/threads/gen-6-megas-revisited-slate-15-playtesting.3713949/post-9458681']Rough Viability List for Mega Pokemon[/URL]
- [URL='https://www.smogon.com/forums/forums/oras/']ORAS Subforum[/URL]
- [URL='https://www.smogon.com/dex/xy/formats/ou/']ORAS Strategy Dex[/URL]
- [URL='https://dragonheaven.herokuapp.com/#']Playable Here[/URL]

[B][U]Tournament Specific Rules[/U][/B]

[LIST]
[*]All [URL='https://www.smogon.com/forums/threads/tournament-rules-and-general-guidelines.3642760/'][B]general rules[/B][/URL] apply. [URL='https://www.smogon.com/forums/threads/tournament-scheduling-guidelines.3642746/'][B]Click here [/B][/URL]for guidelines about scheduling matches.
[*]Matches are Best of 3, which means that the first person to win two games wins the set and moves on in the tournament.
[*]Matches are to be played in the [URL='https://dragonheaven.herokuapp.com/'][B]Dragon Heaven Showdown Server[/B][/URL]. It is very highly recommended that you use the Dragon Heaven client, which makes teambuilding and battling much easier. Said client is linked above.
[*]Replays are [B]mandatory[/B]. It's highly recommended that you both [B]upload AND download the replay[/B], to ensure that if the replay gets overwritten, we still have it for the purposes of usage stats.
[*]If metagame changes occur during the middle of a round (such as balance changes), they will take effect the next round later.
[*]This is a single elimination tournament.
[*]The winner of the tournament receives [B]$10 USD[/B], which will be sent through PayPal (PayPal account [B]required [/B]to receive it).[HIDE=Other General Forum Tournament Rules]
[/HIDE]
[/LIST]
[HIDE=Other General Forum Tournament Rules]
[B]Identity[/B]
About playing on alts: It is entirely allowed to play on an alt other than your own main forum name, though if your opponent wishes to confirm your identity, you [B]must [/B]log on to your main alt to show them you are who you claim to be. This is to prevent people from pretending to be who they're not.

[B]Scouting[/B]
On scouting opponents: Going through your opponents replays of tournament and ladder games is entirely allowed, as long as a game is public there is nothing preventing you from watching it. An exception to this is abusing powers granted to you by being staff on Smogon or PS! to gain access to information a normal user wouldn't have access to, which is strictly forbidden.
On leaking teams: Divulging private information about someone's planned team to their opponent is never allowed, and will be heavily sanctioned. Requesting that such information be divulged is also grounds for punishment. Keep your scouting to publicly available information and you'll be fine.

[B]Timer Clause / Disconnections[/B]
On Timeout losses: A player that loses by having all his time run out loses the game. This is only not the case if the player that received the timeout loss can be verified to have suffered a True Disconnection. Rematches are only allowed if there was a True Disconnection.
On True Disconnection: The TD team has a secret threshold of seconds that your timer must be at or above, from the moment you disconnect, for a timeout loss to be considered a True disconnection.
[/HIDE]
Sign-Ups will be open for a week, then the tournament will start on [B]Monday, July 31st[/B]. You can join by simply replying to this thread with "in" or some variation. Have fun everyone!

[B][U]Sign-Ups[/U][/B]
zxgzxg
G-Luke
anaconja
Gekokeso
ViZar
Gravity Monkey
Beaf Cultist
Beebos
lavarina
Tanny89k
Totally_Odette
Concept Everything
Mr. Bossaru
The Damned
Charliezard7
Dragonitebestboi
MegaFlareon
wut
Turtlek
*/
	fightingmemory: {
		name: "Fighting Memory",
		spritenum: 668,
		onMemory: 'Fighting',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 773) || pokemon.baseSpecies.num === 773) {
				return false;
			}
			return true;
		},
		forcedForme: "Silvally-Fighting",
		itemUser: ["Silvally-Fighting"],
		num: 904,
		gen: 7,
		isNonstandard: "Past",
	},
	fightiniumz: {
		name: "Fightinium Z",
		spritenum: 637,
		onPlate: 'Fighting',
		onTakeItem: false,
		zMove: true,
		zMoveType: "Fighting",
		forcedForme: "Arceus-Fighting",
		num: 782,
		gen: 7,
		isNonstandard: "Past",
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
				pokemon.addVolatile('confusion');
			}
		},
		num: 159,
		gen: 3,
		rating: 3,
	},
/*
export const Conditions: {[k: string]: ConditionData} = {
	brn: {
		name: 'brn',
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.id === 'flameorb') {
				this.add('-status', target, 'brn', '[from] item: Flame Orb');
			} else if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'brn', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'brn');
			}
		},
		// Damage reduction is handled directly in the sim/battle.js damage function
		onResidualOrder: 10,
		onResidual(pokemon) {
			this.damage(pokemon.baseMaxhp / 16);
		},
	},
	par: {
		name: 'par',
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'par', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'par');
			}
		},
		onModifySpe(spe, pokemon) {
			// Paralysis occurs after all other Speed modifiers, so evaluate all modifiers up to this point first
			spe = this.finalModify(spe);
			if (!pokemon.hasAbility('quickfeet')) {
				spe = Math.floor(spe * 50 / 100);
			}
			return spe;
		},
		onBeforeMovePriority: 1,
		onBeforeMove(pokemon) {
			if (this.randomChance(1, 4)) {
				this.add('cant', pokemon, 'par');
				return false;
			}
		},
	},
	slp: {
		name: 'slp',
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'slp', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else if (sourceEffect && sourceEffect.effectType === 'Move') {
				this.add('-status', target, 'slp', '[from] move: ' + sourceEffect.name);
			} else {
				this.add('-status', target, 'slp');
			}
			// 1-3 turns
			this.effectState.startTime = this.random(2, 5);
			this.effectState.time = this.effectState.startTime;

			if (target.removeVolatile('nightmare')) {
				this.add('-end', target, 'Nightmare', '[silent]');
			}
		},
		onBeforeMovePriority: 10,
		onBeforeMove(pokemon, target, move) {
			if (pokemon.hasAbility('earlybird')) {
				pokemon.statusState.time--;
			}
			pokemon.statusState.time--;
			if (pokemon.statusState.time <= 0) {
				pokemon.cureStatus();
				return;
			}
			this.add('cant', pokemon, 'slp');
			if (move.sleepUsable) {
				return;
			}
			return false;
		},
	},
	frz: {
		name: 'frz',
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'frz', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'frz');
			}
			if (target.species.name === 'Shaymin-Sky' && target.baseSpecies.baseSpecies === 'Shaymin') {
				target.formeChange('Shaymin', this.effect, true);
			}
		},
		onBeforeMovePriority: 10,
		onBeforeMove(pokemon, target, move) {
			if (move.flags['defrost']) return;
			if (this.randomChance(1, 5)) {
				pokemon.cureStatus();
				return;
			}
			this.add('cant', pokemon, 'frz');
			return false;
		},
		onModifyMove(move, pokemon) {
			if (move.flags['defrost']) {
				this.add('-curestatus', pokemon, 'frz', '[from] move: ' + move);
				pokemon.clearStatus();
			}
		},
		onAfterMoveSecondary(target, source, move) {
			if (move.thawsTarget) {
				target.cureStatus();
			}
		},
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Fire' && move.category !== 'Status') {
				target.cureStatus();
			}
		},
	},
	psn: {
		name: 'psn',
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'psn', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'psn');
			}
		},
		onResidualOrder: 9,
		onResidual(pokemon) {
			this.damage(pokemon.baseMaxhp / 8);
		},
	},
	tox: {
		name: 'tox',
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			this.effectState.stage = 0;
			if (sourceEffect && sourceEffect.id === 'toxicorb') {
				this.add('-status', target, 'tox', '[from] item: Toxic Orb');
			} else if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'tox', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'tox');
			}
		},
		onSwitchIn() {
			this.effectState.stage = 0;
		},
		onResidualOrder: 9,
		onResidual(pokemon) {
			if (this.effectState.stage < 15) {
				this.effectState.stage++;
			}
			this.damage(this.clampIntRange(pokemon.baseMaxhp / 16, 1) * this.effectState.stage);
		},
	},
	confusion: {
		name: 'confusion',
		// this is a volatile status
		onStart(target, source, sourceEffect) {
			if (sourceEffect?.id === 'lockedmove') {
				this.add('-start', target, 'confusion', '[fatigue]');
			} else if (sourceEffect?.effectType === 'Ability') {
				this.add('-start', target, 'confusion', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-start', target, 'confusion');
			}
			const min = sourceEffect?.id === 'axekick' ? 3 : 2;
			this.effectState.time = this.random(min, 6);
		},
		onEnd(target) {
			this.add('-end', target, 'confusion');
		},
		onBeforeMovePriority: 3,
		onBeforeMove(pokemon) {
			pokemon.volatiles['confusion'].time--;
			if (!pokemon.volatiles['confusion'].time) {
				pokemon.removeVolatile('confusion');
				return;
			}
			this.add('-activate', pokemon, 'confusion');
			if (!this.randomChance(33, 100)) {
				return;
			}
			this.activeTarget = pokemon;
			const damage = this.actions.getConfusionDamage(pokemon, 40);
			if (typeof damage !== 'number') throw new Error("Confusion damage not dealt");
			const activeMove = {id: this.toID('confused'), effectType: 'Move', type: '???'};
			this.damage(damage, pokemon, pokemon, activeMove as ActiveMove);
			return false;
		},
	},
	flinch: {
		name: 'flinch',
		duration: 1,
		onBeforeMovePriority: 8,
		onBeforeMove(pokemon) {
			this.add('cant', pokemon, 'flinch');
			this.runEvent('Flinch', pokemon);
			return false;
		},
	},
	trapped: {
		name: 'trapped',
		noCopy: true,
		onTrapPokemon(pokemon) {
			pokemon.tryTrap();
		},
		onStart(target) {
			this.add('-activate', target, 'trapped');
		},
	},
	trapper: {
		name: 'trapper',
		noCopy: true,
	},
	partiallytrapped: {
		name: 'partiallytrapped',
		duration: 5,
		durationCallback(target, source) {
			if (source?.hasItem('gripclaw')) return 8;
			return this.random(5, 7);
		},
		onStart(pokemon, source) {
			this.add('-activate', pokemon, 'move: ' + this.effectState.sourceEffect, '[of] ' + source);
			this.effectState.boundDivisor = source.hasItem('bindingband') ? 6 : 8;
		},
		onResidualOrder: 13,
		onResidual(pokemon) {
			const source = this.effectState.source;
			// G-Max Centiferno and G-Max Sandblast continue even after the user leaves the field
			const gmaxEffect = ['gmaxcentiferno', 'gmaxsandblast'].includes(this.effectState.sourceEffect.id);
			if (source && (!source.isActive || source.hp <= 0 || !source.activeTurns) && !gmaxEffect) {
				delete pokemon.volatiles['partiallytrapped'];
				this.add('-end', pokemon, this.effectState.sourceEffect, '[partiallytrapped]', '[silent]');
				return;
			}
			this.damage(pokemon.baseMaxhp / this.effectState.boundDivisor);
		},
		onEnd(pokemon) {
			this.add('-end', pokemon, this.effectState.sourceEffect, '[partiallytrapped]');
		},
		onTrapPokemon(pokemon) {
			const gmaxEffect = ['gmaxcentiferno', 'gmaxsandblast'].includes(this.effectState.sourceEffect.id);
			if (this.effectState.source?.isActive || gmaxEffect) pokemon.tryTrap();
		},
	},
	lockedmove: {
		// Outrage, Thrash, Petal Dance...
		name: 'lockedmove',
		duration: 2,
		onResidual(target) {
			if (target.status === 'slp') {
				// don't lock, and bypass confusion for calming
				delete target.volatiles['lockedmove'];
			}
			this.effectState.trueDuration--;
		},
		onStart(target, source, effect) {
			this.effectState.trueDuration = this.random(2, 4);
			this.effectState.move = effect.id;
		},
		onRestart() {
			if (this.effectState.trueDuration >= 2) {
				this.effectState.duration = 2;
			}
		},
		onEnd(target) {
			if (this.effectState.trueDuration > 1) return;
			target.addVolatile('confusion');
		},
		onLockMove(pokemon) {
			if (pokemon.volatiles['dynamax']) return;
			return this.effectState.move;
		},
	},
	twoturnmove: {
		// Skull Bash, SolarBeam, Sky Drop...
		name: 'twoturnmove',
		duration: 2,
		onStart(attacker, defender, effect) {
			// ("attacker" is the Pokemon using the two turn move and the Pokemon this condition is being applied to)
			this.effectState.move = effect.id;
			attacker.addVolatile(effect.id);
			// lastMoveTargetLoc is the location of the originally targeted slot before any redirection
			// note that this is not updated for moves called by other moves
			// i.e. if Dig is called by Metronome, lastMoveTargetLoc will still be the user's location
			let moveTargetLoc: number = attacker.lastMoveTargetLoc!;
			if (effect.sourceEffect && this.dex.moves.get(effect.id).target !== 'self') {
				// this move was called by another move such as Metronome
				// and needs a random target to be determined this turn
				// it will already have one by now if there is any valid target
				// but if there isn't one we need to choose a random slot now
				if (defender.fainted) {
					defender = this.sample(attacker.foes(true));
				}
				moveTargetLoc = attacker.getLocOf(defender);
			}
			attacker.volatiles[effect.id].targetLoc = moveTargetLoc;
			this.attrLastMove('[still]');
			// Run side-effects normally associated with hitting (e.g., Protean, Libero)
			this.runEvent('PrepareHit', attacker, defender, effect);
		},
		onEnd(target) {
			target.removeVolatile(this.effectState.move);
		},
		onLockMove() {
			return this.effectState.move;
		},
		onMoveAborted(pokemon) {
			pokemon.removeVolatile('twoturnmove');
		},
	},
	choicelock: {
		name: 'choicelock',
		noCopy: true,
		onStart(pokemon) {
			if (!this.activeMove) throw new Error("Battle.activeMove is null");
			if (!this.activeMove.id || this.activeMove.hasBounced || this.activeMove.sourceEffect === 'snatch') return false;
			this.effectState.move = this.activeMove.id;
		},
		onBeforeMove(pokemon, target, move) {
			if (!pokemon.getItem().isChoice) {
				pokemon.removeVolatile('choicelock');
				return;
			}
			if (
				!pokemon.ignoringItem() && !pokemon.volatiles['dynamax'] &&
				move.id !== this.effectState.move && move.id !== 'struggle'
			) {
				// Fails unless the Choice item is being ignored, and no PP is lost
				this.addMove('move', pokemon, move.name);
				this.attrLastMove('[still]');
				this.debug("Disabled by Choice item lock");
				this.add('-fail', pokemon);
				return false;
			}
		},
		onDisableMove(pokemon) {
			if (!pokemon.getItem().isChoice || !pokemon.hasMove(this.effectState.move)) {
				pokemon.removeVolatile('choicelock');
				return;
			}
			if (pokemon.ignoringItem() || pokemon.volatiles['dynamax']) {
				return;
			}
			for (const moveSlot of pokemon.moveSlots) {
				if (moveSlot.id !== this.effectState.move) {
					pokemon.disableMove(moveSlot.id, false, this.effectState.sourceEffect);
				}
			}
		},
	},
	mustrecharge: {
		name: 'mustrecharge',
		duration: 2,
		onBeforeMovePriority: 11,
		onBeforeMove(pokemon) {
			this.add('cant', pokemon, 'recharge');
			pokemon.removeVolatile('mustrecharge');
			pokemon.removeVolatile('truant');
			return null;
		},
		onStart(pokemon) {
			this.add('-mustrecharge', pokemon);
		},
		onLockMove: 'recharge',
	},
	futuremove: {
		// this is a slot condition
		name: 'futuremove',
		duration: 3,
		onResidualOrder: 3,
		onEnd(target) {
			const data = this.effectState;
			// time's up; time to hit! :D
			const move = this.dex.moves.get(data.move);
			if (target.fainted || target === data.source) {
				this.hint(`${move.name} did not hit because the target is ${(target.fainted ? 'fainted' : 'the user')}.`);
				return;
			}

			this.add('-end', target, 'move: ' + move.name);
			target.removeVolatile('Protect');
			target.removeVolatile('Endure');

			if (data.source.hasAbility('infiltrator') && this.gen >= 6) {
				data.moveData.infiltrates = true;
			}
			if (data.source.hasAbility('normalize') && this.gen >= 6) {
				data.moveData.type = 'Normal';
			}
			const hitMove = new this.dex.Move(data.moveData) as ActiveMove;

			this.actions.trySpreadMoveHit([target], data.source, hitMove, true);
			if (data.source.isActive && data.source.hasItem('lifeorb') && this.gen >= 5) {
				this.singleEvent('AfterMoveSecondarySelf', data.source.getItem(), data.source.itemState, data.source, target, data.source.getItem());
			}
			this.activeMove = null;

			this.checkWin();
		},
	},
	healreplacement: {
		// this is a slot condition
		name: 'healreplacement',
		onStart(target, source, sourceEffect) {
			this.effectState.sourceEffect = sourceEffect;
			this.add('-activate', source, 'healreplacement');
		},
		onSwitchInPriority: 1,
		onSwitchIn(target) {
			if (!target.fainted) {
				target.heal(target.maxhp);
				this.add('-heal', target, target.getHealth, '[from] move: ' + this.effectState.sourceEffect, '[zeffect]');
				target.side.removeSlotCondition(target, 'healreplacement');
			}
		},
	},
	stall: {
		// Protect, Detect, Endure counter
		name: 'stall',
		duration: 2,
		counterMax: 729,
		onStart() {
			this.effectState.counter = 3;
		},
		onStallMove(pokemon) {
			// this.effectState.counter should never be undefined here.
			// However, just in case, use 1 if it is undefined.
			const counter = this.effectState.counter || 1;
			this.debug("Success chance: " + Math.round(100 / counter) + "%");
			const success = this.randomChance(1, counter);
			if (!success) delete pokemon.volatiles['stall'];
			return success;
		},
		onRestart() {
			if (this.effectState.counter < (this.effect as Condition).counterMax!) {
				this.effectState.counter *= 3;
			}
			this.effectState.duration = 2;
		},
	},
	gem: {
		name: 'gem',
		duration: 1,
		affectsFainted: true,
		onBasePowerPriority: 14,
		onBasePower(basePower, user, target, move) {
			this.debug('Gem Boost');
			return this.chainModify([5325, 4096]);
		},
	},

	// weather is implemented here since it's so important to the game

	raindance: {
		name: 'RainDance',
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem('damprock')) {
				return 8;
			}
			return 5;
		},
		onWeatherModifyDamage(damage, attacker, defender, move) {
			if (defender.hasItem('utilityumbrella')) return;
			if (move.type === 'Water') {
				this.debug('rain water boost');
				return this.chainModify(1.5);
			}
			if (move.type === 'Fire') {
				this.debug('rain fire suppress');
				return this.chainModify(0.5);
			}
		},
		onFieldStart(field, source, effect) {
			if (effect?.effectType === 'Ability') {
				if (this.gen <= 5) this.effectState.duration = 0;
				this.add('-weather', 'RainDance', '[from] ability: ' + effect.name, '[of] ' + source);
			} else {
				this.add('-weather', 'RainDance');
			}
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-weather', 'RainDance', '[upkeep]');
			this.eachEvent('Weather');
		},
		onFieldEnd() {
			this.add('-weather', 'none');
		},
	},
	primordialsea: {
		name: 'PrimordialSea',
		effectType: 'Weather',
		duration: 0,
		onTryMovePriority: 1,
		onTryMove(attacker, defender, move) {
			if (move.type === 'Fire' && move.category !== 'Status') {
				this.debug('Primordial Sea fire suppress');
				this.add('-fail', attacker, move, '[from] Primordial Sea');
				this.attrLastMove('[still]');
				return null;
			}
		},
		onWeatherModifyDamage(damage, attacker, defender, move) {
			if (defender.hasItem('utilityumbrella')) return;
			if (move.type === 'Water') {
				this.debug('Rain water boost');
				return this.chainModify(1.5);
			}
		},
		onFieldStart(field, source, effect) {
			this.add('-weather', 'PrimordialSea', '[from] ability: ' + effect.name, '[of] ' + source);
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-weather', 'PrimordialSea', '[upkeep]');
			this.eachEvent('Weather');
		},
		onFieldEnd() {
			this.add('-weather', 'none');
		},
	},
	sunnyday: {
		name: 'SunnyDay',
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem('heatrock')) {
				return 8;
			}
			return 5;
		},
		onWeatherModifyDamage(damage, attacker, defender, move) {
			if (move.id === 'hydrosteam' && !attacker.hasItem('utilityumbrella')) {
				this.debug('Sunny Day Hydro Steam boost');
				return this.chainModify(1.5);
			}
			if (defender.hasItem('utilityumbrella')) return;
			if (move.type === 'Fire') {
				this.debug('Sunny Day fire boost');
				return this.chainModify(1.5);
			}
			if (move.type === 'Water') {
				this.debug('Sunny Day water suppress');
				return this.chainModify(0.5);
			}
		},
		onFieldStart(battle, source, effect) {
			if (effect?.effectType === 'Ability') {
				if (this.gen <= 5) this.effectState.duration = 0;
				this.add('-weather', 'SunnyDay', '[from] ability: ' + effect.name, '[of] ' + source);
			} else {
				this.add('-weather', 'SunnyDay');
			}
		},
		onImmunity(type, pokemon) {
			if (pokemon.hasItem('utilityumbrella')) return;
			if (type === 'frz') return false;
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-weather', 'SunnyDay', '[upkeep]');
			this.eachEvent('Weather');
		},
		onFieldEnd() {
			this.add('-weather', 'none');
		},
	},
	desolateland: {
		name: 'DesolateLand',
		effectType: 'Weather',
		duration: 0,
		onTryMovePriority: 1,
		onTryMove(attacker, defender, move) {
			if (move.type === 'Water' && move.category !== 'Status') {
				this.debug('Desolate Land water suppress');
				this.add('-fail', attacker, move, '[from] Desolate Land');
				this.attrLastMove('[still]');
				return null;
			}
		},
		onWeatherModifyDamage(damage, attacker, defender, move) {
			if (defender.hasItem('utilityumbrella')) return;
			if (move.type === 'Fire') {
				this.debug('Sunny Day fire boost');
				return this.chainModify(1.5);
			}
		},
		onFieldStart(field, source, effect) {
			this.add('-weather', 'DesolateLand', '[from] ability: ' + effect.name, '[of] ' + source);
		},
		onImmunity(type, pokemon) {
			if (pokemon.hasItem('utilityumbrella')) return;
			if (type === 'frz') return false;
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-weather', 'DesolateLand', '[upkeep]');
			this.eachEvent('Weather');
		},
		onFieldEnd() {
			this.add('-weather', 'none');
		},
	},
	sandstorm: {
		name: 'Sandstorm',
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem('smoothrock')) {
				return 8;
			}
			return 5;
		},
		// This should be applied directly to the stat before any of the other modifiers are chained
		// So we give it increased priority.
		onModifySpDPriority: 10,
		onModifySpD(spd, pokemon) {
			if (pokemon.hasType('Rock') && this.field.isWeather('sandstorm')) {
				return this.modify(spd, 1.5);
			}
		},
		onFieldStart(field, source, effect) {
			if (effect?.effectType === 'Ability') {
				if (this.gen <= 5) this.effectState.duration = 0;
				this.add('-weather', 'Sandstorm', '[from] ability: ' + effect.name, '[of] ' + source);
			} else {
				this.add('-weather', 'Sandstorm');
			}
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-weather', 'Sandstorm', '[upkeep]');
			if (this.field.isWeather('sandstorm')) this.eachEvent('Weather');
		},
		onWeather(target) {
			this.damage(target.baseMaxhp / 16);
		},
		onFieldEnd() {
			this.add('-weather', 'none');
		},
	},
	hail: {
		name: 'Hail',
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem('icyrock')) {
				return 8;
			}
			return 5;
		},
		onFieldStart(field, source, effect) {
			if (effect?.effectType === 'Ability') {
				if (this.gen <= 5) this.effectState.duration = 0;
				this.add('-weather', 'Hail', '[from] ability: ' + effect.name, '[of] ' + source);
			} else {
				this.add('-weather', 'Hail');
			}
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-weather', 'Hail', '[upkeep]');
			if (this.field.isWeather('hail')) this.eachEvent('Weather');
		},
		onWeather(target) {
			this.damage(target.baseMaxhp / 16);
		},
		onFieldEnd() {
			this.add('-weather', 'none');
		},
	},
	snow: {
		name: 'Snow',
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem('icyrock')) {
				return 8;
			}
			return 5;
		},
		onModifyDefPriority: 10,
		onModifyDef(def, pokemon) {
			if (pokemon.hasType('Ice') && this.field.isWeather('snow')) {
				return this.modify(def, 1.5);
			}
		},
		onFieldStart(field, source, effect) {
			if (effect?.effectType === 'Ability') {
				if (this.gen <= 5) this.effectState.duration = 0;
				this.add('-weather', 'Snow', '[from] ability: ' + effect.name, '[of] ' + source);
			} else {
				this.add('-weather', 'Snow');
			}
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-weather', 'Snow', '[upkeep]');
			if (this.field.isWeather('snow')) this.eachEvent('Weather');
		},
		onFieldEnd() {
			this.add('-weather', 'none');
		},
	},
	deltastream: {
		name: 'DeltaStream',
		effectType: 'Weather',
		duration: 0,
		onEffectivenessPriority: -1,
		onEffectiveness(typeMod, target, type, move) {
			if (move && move.effectType === 'Move' && move.category !== 'Status' && type === 'Flying' && typeMod > 0) {
				this.add('-fieldactivate', 'Delta Stream');
				return 0;
			}
		},
		onFieldStart(field, source, effect) {
			this.add('-weather', 'DeltaStream', '[from] ability: ' + effect.name, '[of] ' + source);
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-weather', 'DeltaStream', '[upkeep]');
			this.eachEvent('Weather');
		},
		onFieldEnd() {
			this.add('-weather', 'none');
		},
	},

	dynamax: {
		name: 'Dynamax',
		noCopy: true,
		onStart(pokemon) {
			this.effectState.turns = 0;
			pokemon.removeVolatile('minimize');
			pokemon.removeVolatile('substitute');
			if (pokemon.volatiles['torment']) {
				delete pokemon.volatiles['torment'];
				this.add('-end', pokemon, 'Torment', '[silent]');
			}
			if (['cramorantgulping', 'cramorantgorging'].includes(pokemon.species.id) && !pokemon.transformed) {
				pokemon.formeChange('cramorant');
			}
			this.add('-start', pokemon, 'Dynamax', pokemon.gigantamax ? 'Gmax' : '');
			if (pokemon.baseSpecies.name === 'Shedinja') return;

			// Changes based on dynamax level, 2 is max (at LVL 10)
			const ratio = 1.5 + (pokemon.dynamaxLevel * 0.05);

			pokemon.maxhp = Math.floor(pokemon.maxhp * ratio);
			pokemon.hp = Math.floor(pokemon.hp * ratio);
			this.add('-heal', pokemon, pokemon.getHealth, '[silent]');
		},
		onTryAddVolatile(status, pokemon) {
			if (status.id === 'flinch') return null;
		},
		onBeforeSwitchOutPriority: -1,
		onBeforeSwitchOut(pokemon) {
			pokemon.removeVolatile('dynamax');
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.id === 'behemothbash' || move.id === 'behemothblade' || move.id === 'dynamaxcannon') {
				return this.chainModify(2);
			}
		},
		onDragOutPriority: 2,
		onDragOut(pokemon) {
			this.add('-block', pokemon, 'Dynamax');
			return null;
		},
		onResidualPriority: -100,
		onResidual() {
			this.effectState.turns++;
		},
		onEnd(pokemon) {
			this.add('-end', pokemon, 'Dynamax');
			if (pokemon.baseSpecies.name === 'Shedinja') return;
			pokemon.hp = pokemon.getUndynamaxedHP();
			pokemon.maxhp = pokemon.baseMaxhp;
			this.add('-heal', pokemon, pokemon.getHealth, '[silent]');
		},
	},

	// Commander needs two conditions so they are implemented here
	// Dondozo
	commanded: {
		name: "Commanded",
		noCopy: true,
		onStart(pokemon) {
			this.boost({atk: 2, spa: 2, spe: 2, def: 2, spd: 2}, pokemon);
		},
		onDragOutPriority: 2,
		onDragOut() {
			return false;
		},
		// Prevents Shed Shell allowing a swap
		onTrapPokemonPriority: -11,
		onTrapPokemon(pokemon) {
			pokemon.trapped = true;
		},
	},
	// Tatsugiri
	commanding: {
		name: "Commanding",
		noCopy: true,
		onDragOutPriority: 2,
		onDragOut() {
			return false;
		},
		// Prevents Shed Shell allowing a swap
		onTrapPokemonPriority: -11,
		onTrapPokemon(pokemon) {
			pokemon.trapped = true;
		},
		// Override No Guard
		onInvulnerabilityPriority: 2,
		onInvulnerability(target, source, move) {
			return false;
		},
		onBeforeTurn(pokemon) {
			this.queue.cancelAction(pokemon);
		},
	},

	// Arceus and Silvally's actual typing is implemented here.
	// Their true typing for all their formes is Normal, and it's only
	// Multitype and RKS System, respectively, that changes their type,
	// but their formes are specified to be their corresponding type
	// in the Pokedex, so that needs to be overridden.
	// This is mainly relevant for Hackmons Cup and Balanced Hackmons.
	arceus: {
		name: 'Arceus',
		onTypePriority: 1,
		onType(types, pokemon) {
			if (pokemon.transformed || pokemon.ability !== 'multitype' && this.gen >= 8) return types;
			let type: string | undefined = 'Normal';
			if (pokemon.ability === 'multitype') {
				type = pokemon.getItem().onPlate;
				if (!type) {
					type = 'Normal';
				}
			}
			return [type];
		},
	},
	silvally: {
		name: 'Silvally',
		onTypePriority: 1,
		onType(types, pokemon) {
			if (pokemon.transformed || pokemon.ability !== 'rkssystem' && this.gen >= 8) return types;
			let type: string | undefined = 'Normal';
			if (pokemon.ability === 'rkssystem') {
				type = pokemon.getItem().onMemory;
				if (!type) {
					type = 'Normal';
				}
			}
			return [type];
		},
	},
	rolloutstorage: {
		name: 'rolloutstorage',
		duration: 2,
		onBasePower(relayVar, source, target, move) {
			let bp = Math.max(1, move.basePower);
			bp *= Math.pow(2, source.volatiles['rolloutstorage'].contactHitCount);
			if (source.volatiles['defensecurl']) {
				bp *= 2;
			}
			source.removeVolatile('rolloutstorage');
			return bp;
		},
	},
};
*/
	firegem: {
		name: "Fire Gem",
		spritenum: 141,
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status' || move.flags['pledgecombo']) return;
			if (move.type === 'Fire' && source.useItem()) {
				source.addVolatile('gem');
			}
		},
		num: 548,
		gen: 5,
		isNonstandard: "Past",
	},
	firememory: {
		name: "Fire Memory",
		spritenum: 676,
		onMemory: 'Fire',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 773) || pokemon.baseSpecies.num === 773) {
				return false;
			}
			return true;
		},
		forcedForme: "Silvally-Fire",
		itemUser: ["Silvally-Fire"],
		num: 912,
		gen: 7,
		isNonstandard: "Past",
	},
	firestone: {
		name: "Fire Stone",
		spritenum: 142,
		fling: {
			basePower: 30,
		},
		num: 82,
		gen: 1,
		rating: 0,
	},
	firiumz: {
		name: "Firium Z",
		spritenum: 632,
		onPlate: 'Fire',
		onTakeItem: false,
		zMove: true,
		zMoveType: "Fire",
		forcedForme: "Arceus-Fire",
		num: 777,
		gen: 7,
		isNonstandard: "Past",
	},
	fistplate: {
		name: "Fist Plate",
		spritenum: 143,
		onPlate: 'Fighting',
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Fighting') {
				return this.chainModify([4915, 4096]);
			}
		},
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 493) || pokemon.baseSpecies.num === 493) {
				return false;
			}
			return true;
		},
		forcedForme: "Arceus-Fighting",
		num: 303,
		gen: 4,
	},
	flameorb: {
		name: "Flame Orb",
		spritenum: 145,
		fling: {
			basePower: 30,
			status: 'brn',
		},
		onResidualOrder: 28,
		onResidualSubOrder: 3,
		onResidual(pokemon) {
			pokemon.trySetStatus('brn', pokemon);
		},
		num: 273,
		gen: 4,
	},
	flameplate: {
		name: "Flame Plate",
		spritenum: 146,
		onPlate: 'Fire',
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Fire') {
				return this.chainModify([4915, 4096]);
			}
		},
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 493) || pokemon.baseSpecies.num === 493) {
				return false;
			}
			return true;
		},
		forcedForme: "Arceus-Fire",
		num: 298,
		gen: 4,
	},
	floatstone: {
		name: "Float Stone",
		spritenum: 147,
		fling: {
			basePower: 30,
		},
		onModifyWeight(weighthg) {
			return this.trunc(weighthg / 2);
		},
		num: 539,
		gen: 5,
		rating: 1,
	},
	flowersweet: {
		name: "Flower Sweet",
		spritenum: 708,
		fling: {
			basePower: 0,
		},
		num: 1113,
		gen: 8,
		rating: 0,
	},
	flyinggem: {
		name: "Flying Gem",
		spritenum: 149,
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status') return;
			if (move.type === 'Flying' && source.useItem()) {
				source.addVolatile('gem');
			}
		},
		num: 556,
		gen: 5,
		isNonstandard: "Past",
		rating: 3,
	},
	flyingmemory: {
		name: "Flying Memory",
		spritenum: 669,
		onMemory: 'Flying',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 773) || pokemon.baseSpecies.num === 773) {
				return false;
			}
			return true;
		},
		forcedForme: "Silvally-Flying",
		itemUser: ["Silvally-Flying"],
		num: 905,
		gen: 7,
		isNonstandard: "Past",
	},
	flyiniumz: {
		name: "Flyinium Z",
		spritenum: 640,
		onPlate: 'Flying',
		onTakeItem: false,
		zMove: true,
		zMoveType: "Flying",
		forcedForme: "Arceus-Flying",
		num: 785,
		gen: 7,
		isNonstandard: "Past",
	},
	focusband: {
		name: "Focus Band",
		spritenum: 150,
		fling: {
			basePower: 10,
		},
		onDamagePriority: -40,
		onDamage(damage, target, source, effect) {
			if (this.randomChance(1, 10) && damage >= target.hp && effect && effect.effectType === 'Move') {
				this.add("-activate", target, "item: Focus Band");
				return target.hp - 1;
			}
		},
		num: 230,
		gen: 2,
		rating: 1,
	},
	focussash: {
		name: "Focus Sash",
		spritenum: 151,
		fling: {
			basePower: 10,
		},
		onDamagePriority: -40,
		onDamage(damage, target, source, effect) {
			if (target.hp === target.maxhp && damage >= target.hp && effect && effect.effectType === 'Move') {
				if (target.useItem()) {
					return target.hp - 1;
				}
			}
		},
		num: 275,
		gen: 4,
		rating: 3,
	},
	fossilizedbird: {
		name: "Fossilized Bird",
		spritenum: 700,
		fling: {
			basePower: 100,
		},
		num: 1105,
		gen: 8,
		isNonstandard: "Past",
		rating: 0,
	},
	fossilizeddino: {
		name: "Fossilized Dino",
		spritenum: 703,
		fling: {
			basePower: 100,
		},
		num: 1108,
		gen: 8,
		isNonstandard: "Past",
		rating: 0,
	},
	fossilizeddrake: {
		name: "Fossilized Drake",
		spritenum: 702,
		fling: {
			basePower: 100,
		},
		num: 1107,
		gen: 8,
		isNonstandard: "Past",
		rating: 0,
	},
	fossilizedfish: {
		name: "Fossilized Fish",
		spritenum: 701,
		fling: {
			basePower: 100,
		},
		num: 1106,
		gen: 8,
		isNonstandard: "Past",
		rating: 0,
	},
	friendball: {
		name: "Friend Ball",
		spritenum: 153,
		num: 497,
		gen: 2,
		isPokeball: true,
	},
	fullincense: {
		name: "Full Incense",
		spritenum: 155,
		fling: {
			basePower: 10,
		},
		onFractionalPriority: -0.1,
		num: 316,
		gen: 4,
		isNonstandard: "Past",
		rating: 0,
	},
	galaricacuff: {
		name: "Galarica Cuff",
		spritenum: 739,
		fling: {
			basePower: 30,
		},
		num: 1582,
		gen: 8,
		isNonstandard: "Unobtainable",
		rating: 0,
	},
	galaricawreath: {
		name: "Galarica Wreath",
		spritenum: 740,
		fling: {
			basePower: 30,
		},
		num: 1592,
		gen: 8,
		isNonstandard: "Unobtainable",
		rating: 0,
	},
	galladite: {
		name: "Galladite",
		spritenum: 616,
		megaStone: "Gallade-Mega",
		megaEvolves: "Gallade",
		itemUser: ["Gallade"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 756,
		gen: 6,
		isNonstandard: "Past",
	},
	ganlonberry: {
		name: "Ganlon Berry",
		spritenum: 158,
		isBerry: true,
		naturalGift: {
			basePower: 100,
			type: "Ice",
		},
		onUpdate(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 4 || (pokemon.hp <= pokemon.maxhp / 2 &&
					pokemon.hasAbility('gluttony') && pokemon.abilityState.gluttony)) {
				pokemon.eatItem();
			}
		},
		onEat(pokemon) {
			this.boost({def: 1});
		},
		num: 202,
		gen: 3,
	},
	garchompite: {
		name: "Garchompite",
		spritenum: 589,
		megaStone: "Garchomp-Mega",
		megaEvolves: "Garchomp",
		itemUser: ["Garchomp"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 683,
		gen: 6,
		isNonstandard: "Past",
	},
	gardevoirite: {
		name: "Gardevoirite",
		spritenum: 587,
		megaStone: "Gardevoir-Mega",
		megaEvolves: "Gardevoir",
		itemUser: ["Gardevoir"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 657,
		gen: 6,
		isNonstandard: "Past",
	},
	gengarite: {
		name: "Gengarite",
		spritenum: 588,
		megaStone: "Gengar-Mega",
		megaEvolves: "Gengar",
		itemUser: ["Gengar"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 656,
		gen: 6,
		isNonstandard: "Past",
	},
	ghostgem: {
		name: "Ghost Gem",
		spritenum: 161,
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status') return;
			if (move.type === 'Ghost' && source.useItem()) {
				source.addVolatile('gem');
			}
		},
		num: 560,
		gen: 5,
		isNonstandard: "Past",
	},
	ghostmemory: {
		name: "Ghost Memory",
		spritenum: 674,
		onMemory: 'Ghost',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 773) || pokemon.baseSpecies.num === 773) {
				return false;
			}
			return true;
		},
		forcedForme: "Silvally-Ghost",
		itemUser: ["Silvally-Ghost"],
		num: 910,
		gen: 7,
		isNonstandard: "Past",
	},
	ghostiumz: {
		name: "Ghostium Z",
		spritenum: 644,
		onPlate: 'Ghost',
		onTakeItem: false,
		zMove: true,
		zMoveType: "Ghost",
		forcedForme: "Arceus-Ghost",
		num: 789,
		gen: 7,
		isNonstandard: "Past",
	},
	glalitite: {
		name: "Glalitite",
		spritenum: 623,
		megaStone: "Glalie-Mega",
		megaEvolves: "Glalie",
		itemUser: ["Glalie"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 763,
		gen: 6,
		isNonstandard: "Past",
	},
	goldbottlecap: {
		name: "Gold Bottle Cap",
		spritenum: 697,
		fling: {
			basePower: 30,
		},
		num: 796,
		gen: 7,
		rating: 0,
	},
	grassgem: {
		name: "Grass Gem",
		spritenum: 172,
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status' || move.flags['pledgecombo']) return;
			if (move.type === 'Grass' && source.useItem()) {
				source.addVolatile('gem');
			}
		},
		num: 551,
		gen: 5,
		isNonstandard: "Past",
	},
	grassmemory: {
		name: "Grass Memory",
		spritenum: 678,
		onMemory: 'Grass',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 773) || pokemon.baseSpecies.num === 773) {
				return false;
			}
			return true;
		},
		forcedForme: "Silvally-Grass",
		itemUser: ["Silvally-Grass"],
		num: 914,
		gen: 7,
		isNonstandard: "Past",
	},
	grassiumz: {
		name: "Grassium Z",
		spritenum: 635,
		onPlate: 'Grass',
		onTakeItem: false,
		zMove: true,
		zMoveType: "Grass",
		forcedForme: "Arceus-Grass",
		num: 780,
		gen: 7,
		isNonstandard: "Past",
	},
	grassyseed: {
		name: "Grassy Seed",
		spritenum: 667,
		fling: {
			basePower: 10,
		},
		onStart(pokemon) {
			if (!pokemon.ignoringItem() && this.field.isTerrain('grassyterrain')) {
				pokemon.useItem();
			}
		},
		onTerrainChange(pokemon) {
			if (this.field.isTerrain('grassyterrain')) {
				pokemon.useItem();
			}
		},
		boosts: {
			def: 1,
		},
		num: 884,
		gen: 7,
	},
	greatball: {
		name: "Great Ball",
		spritenum: 174,
		num: 3,
		gen: 1,
		isPokeball: true,
	},
	grepaberry: {
		name: "Grepa Berry",
		spritenum: 178,
		isBerry: true,
		naturalGift: {
			basePower: 90,
			type: "Flying",
		},
		onEat: false,
		num: 173,
		gen: 3,
		rating: 0,
	},
	gripclaw: {
		name: "Grip Claw",
		spritenum: 179,
		fling: {
			basePower: 90,
		},
		// implemented in statuses
		num: 286,
		gen: 4,
	},
	griseouscore: {
		name: "Griseous Core",
		spritenum: 743,
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (user.baseSpecies.num === 487 && (move.type === 'Ghost' || move.type === 'Dragon')) {
				return this.chainModify([4915, 4096]);
			}
		},
		onTakeItem(item, pokemon, source) {
			if (source?.baseSpecies.num === 487 || pokemon.baseSpecies.num === 487) {
				return false;
			}
			return true;
		},
		forcedForme: "Giratina-Origin",
		itemUser: ["Giratina-Origin"],
		num: 1779,
		gen: 8,
	},
	griseousorb: {
		name: "Griseous Orb",
		spritenum: 180,
		fling: {
			basePower: 60,
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (user.baseSpecies.num === 487 && (move.type === 'Ghost' || move.type === 'Dragon')) {
				return this.chainModify([4915, 4096]);
			}
		},
		itemUser: ["Giratina"],
		num: 112,
		gen: 4,
	},
	groundgem: {
		name: "Ground Gem",
		spritenum: 182,
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status') return;
			if (move.type === 'Ground' && source.useItem()) {
				source.addVolatile('gem');
			}
		},
		num: 555,
		gen: 5,
		isNonstandard: "Past",
	},
	groundmemory: {
		name: "Ground Memory",
		spritenum: 671,
		onMemory: 'Ground',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 773) || pokemon.baseSpecies.num === 773) {
				return false;
			}
			return true;
		},
		forcedForme: "Silvally-Ground",
		itemUser: ["Silvally-Ground"],
		num: 907,
		gen: 7,
		isNonstandard: "Past",
	},
	groundiumz: {
		name: "Groundium Z",
		spritenum: 639,
		onPlate: 'Ground',
		onTakeItem: false,
		zMove: true,
		zMoveType: "Ground",
		forcedForme: "Arceus-Ground",
		num: 784,
		gen: 7,
		isNonstandard: "Past",
	},
	gyaradosite: {
		name: "Gyaradosite",
		spritenum: 589,
		megaStone: "Gyarados-Mega",
		megaEvolves: "Gyarados",
		itemUser: ["Gyarados"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 676,
		gen: 6,
		isNonstandard: "Past",
	},
	habanberry: {
		name: "Haban Berry",
		spritenum: 185,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Dragon",
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Dragon' && target.getMoveHitData(move).typeMod > 0) {
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
		num: 197,
		gen: 4,
	},
	hardstone: {
		name: "Hard Stone",
		spritenum: 187,
		fling: {
			basePower: 100,
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Rock') {
				return this.chainModify([4915, 4096]);
			}
		},
		num: 238,
		gen: 2,
	},
	healball: {
		name: "Heal Ball",
		spritenum: 188,
		num: 14,
		gen: 4,
		isPokeball: true,
	},
	hearthflamemask: {
		name: "Hearthflame Mask",
		spritenum: 760,
		fling: {
			basePower: 60,
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (user.baseSpecies.name.startsWith('Ogerpon-Hearthflame')) {
				return this.chainModify([4915, 4096]);
			}
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Ogerpon') return false;
			return true;
		},
		forcedForme: "Ogerpon-Hearthflame",
		itemUser: ["Ogerpon-Hearthflame"],
		num: 2408,
		gen: 9,
	},
	heatrock: {
		name: "Heat Rock",
		spritenum: 193,
		fling: {
			basePower: 60,
		},
		num: 284,
		gen: 4,
	},
	heavyball: {
		name: "Heavy Ball",
		spritenum: 194,
		num: 495,
		gen: 2,
		isPokeball: true,
	},
	heavydutyboots: {
		name: "Heavy-Duty Boots",
		spritenum: 715,
		fling: {
			basePower: 80,
		},
		num: 1120,
		gen: 8,
		rating: 3,
		// Hazard Immunity implemented in moves.ts
	},
	helixfossil: {
		name: "Helix Fossil",
		spritenum: 195,
		fling: {
			basePower: 100,
		},
		num: 101,
		gen: 3,
		isNonstandard: "Past",
		rating: 0,
	},
	heracronite: {
		name: "Heracronite",
		spritenum: 590,
		megaStone: "Heracross-Mega",
		megaEvolves: "Heracross",
		itemUser: ["Heracross"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 680,
		gen: 6,
		isNonstandard: "Past",
	},
	hondewberry: {
		name: "Hondew Berry",
		spritenum: 213,
		isBerry: true,
		naturalGift: {
			basePower: 90,
			type: "Ground",
		},
		onEat: false,
		num: 172,
		gen: 3,
		rating: 0,
	},
	houndoominite: {
		name: "Houndoominite",
		spritenum: 591,
		megaStone: "Houndoom-Mega",
		megaEvolves: "Houndoom",
		itemUser: ["Houndoom"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 666,
		gen: 6,
		isNonstandard: "Past",
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
				pokemon.addVolatile('confusion');
			}
		},
		num: 163,
		gen: 3,
		rating: 3,
	},
	icegem: {
		name: "Ice Gem",
		spritenum: 218,
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status') return;
			if (move.type === 'Ice' && source.useItem()) {
				source.addVolatile('gem');
			}
		},
		num: 552,
		gen: 5,
		isNonstandard: "Past",
	},
	icememory: {
		name: "Ice Memory",
		spritenum: 681,
		onMemory: 'Ice',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 773) || pokemon.baseSpecies.num === 773) {
				return false;
			}
			return true;
		},
		forcedForme: "Silvally-Ice",
		itemUser: ["Silvally-Ice"],
		num: 917,
		gen: 7,
		isNonstandard: "Past",
	},
	icestone: {
		name: "Ice Stone",
		spritenum: 693,
		fling: {
			basePower: 30,
		},
		num: 849,
		gen: 7,
		rating: 0,
	},
	icicleplate: {
		name: "Icicle Plate",
		spritenum: 220,
		onPlate: 'Ice',
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Ice') {
				return this.chainModify([4915, 4096]);
			}
		},
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 493) || pokemon.baseSpecies.num === 493) {
				return false;
			}
			return true;
		},
		forcedForme: "Arceus-Ice",
		num: 302,
		gen: 4,
	},
	iciumz: {
		name: "Icium Z",
		spritenum: 636,
		onPlate: 'Ice',
		onTakeItem: false,
		zMove: true,
		zMoveType: "Ice",
		forcedForme: "Arceus-Ice",
		num: 781,
		gen: 7,
		isNonstandard: "Past",
	},
	icyrock: {
		name: "Icy Rock",
		spritenum: 221,
		fling: {
			basePower: 40,
		},
		num: 282,
		gen: 4,
	},
	inciniumz: {
		name: "Incinium Z",
		spritenum: 651,
		onTakeItem: false,
		zMove: "Malicious Moonsault",
		zMoveFrom: "Darkest Lariat",
		itemUser: ["Incineroar"],
		num: 799,
		gen: 7,
		isNonstandard: "Past",
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
		forcedForme: "Arceus-Bug",
		num: 308,
		gen: 4,
	},
	ironball: {
		name: "Iron Ball",
		spritenum: 224,
		fling: {
			basePower: 130,
		},
		onEffectiveness(typeMod, target, type, move) {
			if (!target) return;
			if (target.volatiles['ingrain'] || target.volatiles['smackdown'] || this.field.getPseudoWeather('gravity')) return;
			if (move.type === 'Ground' && target.hasType('Flying')) return 0;
		},
		// airborneness negation implemented in sim/pokemon.js:Pokemon#isGrounded
		onModifySpe(spe) {
			return this.chainModify(0.5);
		},
		num: 278,
		gen: 4,
		rating: 1,
	},
	ironplate: {
		name: "Iron Plate",
		spritenum: 225,
		onPlate: 'Steel',
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Steel') {
				return this.chainModify([4915, 4096]);
			}
		},
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 493) || pokemon.baseSpecies.num === 493) {
				return false;
			}
			return true;
		},
		forcedForme: "Arceus-Steel",
		num: 313,
		gen: 4,
	},
	jabocaberry: {
		name: "Jaboca Berry",
		spritenum: 230,
		isBerry: true,
		naturalGift: {
			basePower: 100,
			type: "Dragon",
		},
		onDamagingHit(damage, target, source, move) {
			if (move.category === 'Physical' && source.hp && source.isActive && !source.hasAbility('magicguard')) {
				if (target.eatItem()) {
					this.damage(source.baseMaxhp / (target.hasAbility('ripen') ? 4 : 8), source, target);
				}
			}
		},
		onEat() { },
		num: 211,
		gen: 4,
	},
	jawfossil: {
		name: "Jaw Fossil",
		spritenum: 694,
		fling: {
			basePower: 100,
		},
		num: 710,
		gen: 6,
		isNonstandard: "Past",
		rating: 0,
	},
	kasibberry: {
		name: "Kasib Berry",
		spritenum: 233,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Ghost",
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Ghost' && target.getMoveHitData(move).typeMod > 0) {
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
		num: 196,
		gen: 4,
	},
	kebiaberry: {
		name: "Kebia Berry",
		spritenum: 234,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Poison",
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Poison' && target.getMoveHitData(move).typeMod > 0) {
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
		num: 190,
		gen: 4,
	},
	keeberry: {
		name: "Kee Berry",
		spritenum: 593,
		isBerry: true,
		naturalGift: {
			basePower: 100,
			type: "Fairy",
		},
		onAfterMoveSecondary(target, source, move) {
			if (move.category === 'Physical') {
				if (move.id === 'present' && move.heal) return;
				target.eatItem();
			}
		},
		onEat(pokemon) {
			this.boost({def: 1});
		},
		num: 687,
		gen: 6,
	},
	kelpsyberry: {
		name: "Kelpsy Berry",
		spritenum: 235,
		isBerry: true,
		naturalGift: {
			basePower: 90,
			type: "Fighting",
		},
		onEat: false,
		num: 170,
		gen: 3,
		rating: 0,
	},
	kangaskhanite: {
		name: "Kangaskhanite",
		spritenum: 592,
		megaStone: "Kangaskhan-Mega",
		megaEvolves: "Kangaskhan",
		itemUser: ["Kangaskhan"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 675,
		gen: 6,
		isNonstandard: "Past",
	},
	kingsrock: {
		name: "King's Rock",
		spritenum: 236,
		fling: {
			basePower: 30,
			volatileStatus: 'flinch',
		},
		onModifyMovePriority: -1,
		onModifyMove(move) {
			if (move.category !== "Status") {
				if (!move.secondaries) move.secondaries = [];
				for (const secondary of move.secondaries) {
					if (secondary.volatileStatus === 'flinch') return;
				}
				move.secondaries.push({
					chance: 10,
					volatileStatus: 'flinch',
				});
			}
		},
		num: 221,
		gen: 2,
	},
	kommoniumz: {
		name: "Kommonium Z",
		spritenum: 690,
		onTakeItem: false,
		zMove: "Clangorous Soulblaze",
		zMoveFrom: "Clanging Scales",
		itemUser: ["Kommo-o", "Kommo-o-Totem"],
		num: 926,
		gen: 7,
		isNonstandard: "Past",
	},
	laggingtail: {
		name: "Lagging Tail",
		spritenum: 237,
		fling: {
			basePower: 10,
		},
		onFractionalPriority: -0.1,
		num: 279,
		gen: 4,
		rating: 0,
	},
	lansatberry: {
		name: "Lansat Berry",
		spritenum: 238,
		isBerry: true,
		naturalGift: {
			basePower: 100,
			type: "Flying",
		},
		onUpdate(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 4 || (pokemon.hp <= pokemon.maxhp / 2 &&
					pokemon.hasAbility('gluttony') && pokemon.abilityState.gluttony)) {
				pokemon.eatItem();
			}
		},
		onEat(pokemon) {
			pokemon.addVolatile('focusenergy');
		},
		num: 206,
		gen: 3,
	},
	latiasite: {
		name: "Latiasite",
		spritenum: 629,
		megaStone: "Latias-Mega",
		megaEvolves: "Latias",
		itemUser: ["Latias"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 684,
		gen: 6,
		isNonstandard: "Past",
	},
	latiosite: {
		name: "Latiosite",
		spritenum: 630,
		megaStone: "Latios-Mega",
		megaEvolves: "Latios",
		itemUser: ["Latios"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 685,
		gen: 6,
		isNonstandard: "Past",
	},
	laxincense: {
		name: "Lax Incense",
		spritenum: 240,
		fling: {
			basePower: 10,
		},
		onModifyAccuracyPriority: -2,
		onModifyAccuracy(accuracy) {
			if (typeof accuracy !== 'number') return;
			this.debug('lax incense - decreasing accuracy');
			return this.chainModify([3686, 4096]);
		},
		num: 255,
		gen: 3,
		isNonstandard: "Past",
	},
	leafstone: {
		name: "Leaf Stone",
		spritenum: 241,
		fling: {
			basePower: 30,
		},
		num: 85,
		gen: 1,
		rating: 0,
	},
	leek: {
		name: "Leek",
		fling: {
			basePower: 60,
		},
		spritenum: 475,
		onModifyCritRatio(critRatio, user) {
			if (["farfetchd", "sirfetchd"].includes(this.toID(user.baseSpecies.baseSpecies))) {
				return critRatio + 2;
			}
		},
		itemUser: ["Farfetch\u2019d", "Farfetch\u2019d-Galar", "Sirfetch\u2019d"],
		num: 259,
		gen: 8,
		isNonstandard: "Past",
	},
	leftovers: {
		name: "Leftovers",
		spritenum: 242,
		fling: {
			basePower: 10,
		},
		onResidualOrder: 5,
		onResidualSubOrder: 4,
		onResidual(pokemon) {
			this.heal(pokemon.baseMaxhp / 16);
		},
		num: 234,
		gen: 2,
		rating: 3,
	},
	leppaberry: {
		name: "Leppa Berry",
		spritenum: 244,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Fighting",
		},
		onUpdate(pokemon) {
			if (!pokemon.hp) return;
			if (pokemon.moveSlots.some(move => move.pp === 0)) {
				pokemon.eatItem();
			}
		},
		onEat(pokemon) {
			const moveSlot = pokemon.moveSlots.find(move => move.pp === 0) ||
				pokemon.moveSlots.find(move => move.pp < move.maxpp);
			if (!moveSlot) return;
			moveSlot.pp += 10;
			if (moveSlot.pp > moveSlot.maxpp) moveSlot.pp = moveSlot.maxpp;
			this.add('-activate', pokemon, 'item: Leppa Berry', moveSlot.move, '[consumed]');
		},
		num: 154,
		gen: 3,
	},
	levelball: {
		name: "Level Ball",
		spritenum: 246,
		num: 493,
		gen: 2,
		isPokeball: true,
	},
	liechiberry: {
		name: "Liechi Berry",
		spritenum: 248,
		isBerry: true,
		naturalGift: {
			basePower: 100,
			type: "Grass",
		},
		onUpdate(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 4 || (pokemon.hp <= pokemon.maxhp / 2 &&
					pokemon.hasAbility('gluttony') && pokemon.abilityState.gluttony)) {
				pokemon.eatItem();
			}
		},
		onEat(pokemon) {
			this.boost({atk: 1});
		},
		num: 201,
		gen: 3,
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
				this.damage(source.baseMaxhp / 10, source, source, this.dex.items.get('lifeorb'));
			}
		},
		num: 270,
		gen: 4,
		rating: 3,
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
		onResidualOrder: 28,
		onResidualSubOrder: 3,
		onResidual(pokemon) {
			pokemon.trySetStatus('par', pokemon);
		},
		shortDesc: "At the end of every turn, this item attempts to paralyze the holder.",
		itemUser: ["Pikachu", "Pikachu-Cosplay", "Pikachu-Rock-Star", "Pikachu-Belle", "Pikachu-Pop-Star", "Pikachu-PhD", "Pikachu-Libre", "Pikachu-Original", "Pikachu-Hoenn", "Pikachu-Sinnoh", "Pikachu-Unova", "Pikachu-Kalos", "Pikachu-Alola", "Pikachu-Partner", "Pikachu-Starter", "Pikachu-World"],
		num: 236,
		gen: 2,
	},
	lightclay: {
		name: "Light Clay",
		spritenum: 252,
		fling: {
			basePower: 30,
		},
		// implemented in the corresponding thing
		num: 269,
		gen: 4,
	},
	loadeddice: {
		name: "Loaded Dice",
		spritenum: 751,
		fling: {
			basePower: 30,
		},
		// partially implemented in sim/battle-actions.ts:BattleActions#hitStepMoveHitLoop
		onModifyMove(move) {
			if (move.multiaccuracy) {
				delete move.multiaccuracy;
			}
		},
		num: 1886,
		gen: 9,
	},
	lopunnite: {
		name: "Lopunnite",
		spritenum: 626,
		megaStone: "Lopunny-Mega",
		megaEvolves: "Lopunny",
		itemUser: ["Lopunny"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 768,
		gen: 6,
		isNonstandard: "Past",
	},
	loveball: {
		name: "Love Ball",
		spritenum: 258,
		num: 496,
		gen: 2,
		isPokeball: true,
	},
	lovesweet: {
		name: "Love Sweet",
		spritenum: 705,
		fling: {
			basePower: 10,
		},
		num: 1110,
		gen: 8,
		rating: 0,
	},
	lucarionite: {
		name: "Lucarionite",
		spritenum: 594,
		megaStone: "Lucario-Mega",
		megaEvolves: "Lucario",
		itemUser: ["Lucario"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 673,
		gen: 6,
		isNonstandard: "Past",
	},
	luckypunch: {
		name: "Lucky Punch",
		spritenum: 261,
		fling: {
			basePower: 40,
		},
		onModifyCritRatio(critRatio, user) {
			if (user.baseSpecies.name === 'Chansey') {
				return critRatio + 2;
			}
		},
		itemUser: ["Chansey"],
		num: 256,
		gen: 2,
		isNonstandard: "Past",
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
			if (pokemon.status || pokemon.volatiles['confusion']) {
				pokemon.eatItem();
			}
		},
		onEat(pokemon) {
			pokemon.cureStatus();
			pokemon.removeVolatile('confusion');
		},
		num: 157,
		gen: 3,
	},
	luminousmoss: {
		name: "Luminous Moss",
		spritenum: 595,
		fling: {
			basePower: 30,
		},
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Water') {
				target.useItem();
			}
		},
		boosts: {
			spd: 1,
		},
		num: 648,
		gen: 6,
	},
	lunaliumz: {
		name: "Lunalium Z",
		spritenum: 686,
		onTakeItem: false,
		zMove: "Menacing Moonraze Maelstrom",
		zMoveFrom: "Moongeist Beam",
		itemUser: ["Lunala", "Necrozma-Dawn-Wings"],
		num: 922,
		gen: 7,
		isNonstandard: "Past",
	},
	lureball: {
		name: "Lure Ball",
		spritenum: 264,
		num: 494,
		gen: 2,
		isPokeball: true,
	},
	lustrousglobe: {
		name: "Lustrous Globe",
		spritenum: 742,
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (user.baseSpecies.num === 484 && (move.type === 'Water' || move.type === 'Dragon')) {
				return this.chainModify([4915, 4096]);
			}
		},
		onTakeItem(item, pokemon, source) {
			if (source?.baseSpecies.num === 484 || pokemon.baseSpecies.num === 484) {
				return false;
			}
			return true;
		},
		forcedForme: "Palkia-Origin",
		itemUser: ["Palkia-Origin"],
		num: 1778,
		gen: 8,
	},
	lustrousorb: {
		name: "Lustrous Orb",
		spritenum: 265,
		fling: {
			basePower: 60,
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (user.baseSpecies.num === 484 && (move.type === 'Water' || move.type === 'Dragon')) {
				return this.chainModify([4915, 4096]);
			}
		},
		itemUser: ["Palkia"],
		num: 136,
		gen: 4,
	},
	luxuryball: {
		name: "Luxury Ball",
		spritenum: 266,
		num: 11,
		gen: 3,
		isPokeball: true,
	},
	lycaniumz: {
		name: "Lycanium Z",
		spritenum: 689,
		onTakeItem: false,
		zMove: "Splintered Stormshards",
		zMoveFrom: "Stone Edge",
		itemUser: ["Lycanroc", "Lycanroc-Midnight", "Lycanroc-Dusk"],
		num: 925,
		gen: 7,
		isNonstandard: "Past",
	},
	machobrace: {
		name: "Macho Brace",
		spritenum: 269,
		ignoreKlutz: true,
		fling: {
			basePower: 60,
		},
		onModifySpe(spe) {
			return this.chainModify(0.5);
		},
		num: 215,
		gen: 3,
		isNonstandard: "Past",
		rating: 0,
	},
	magmarizer: {
		name: "Magmarizer",
		spritenum: 272,
		fling: {
			basePower: 80,
		},
		num: 323,
		gen: 4,
		rating: 0,
	},
	magnet: {
		name: "Magnet",
		spritenum: 273,
		fling: {
			basePower: 30,
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Electric') {
				return this.chainModify([4915, 4096]);
			}
		},
		num: 242,
		gen: 2,
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
				pokemon.addVolatile('confusion');
			}
		},
		num: 161,
		gen: 3,
		rating: 3,
	},
	magostberry: {
		name: "Magost Berry",
		spritenum: 275,
		isBerry: true,
		naturalGift: {
			basePower: 90,
			type: "Rock",
		},
		onEat: false,
		num: 176,
		gen: 3,
		isNonstandard: "Past",
		rating: 0,
	},
	mail: {
		name: "Mail",
		spritenum: 403,
		onTakeItem(item, source) {
			if (!this.activeMove) return false;
			if (this.activeMove.id !== 'knockoff' && this.activeMove.id !== 'thief' && this.activeMove.id !== 'covet') return false;
		},
		num: 137,
		gen: 2,
		isNonstandard: "Past",
	},
	maliciousarmor: {
		name: "Malicious Armor",
		spritenum: 744,
		fling: {
			basePower: 30,
		},
		num: 1861,
		gen: 9,
		rating: 0,
	},
	manectite: {
		name: "Manectite",
		spritenum: 596,
		megaStone: "Manectric-Mega",
		megaEvolves: "Manectric",
		itemUser: ["Manectric"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 682,
		gen: 6,
		isNonstandard: "Past",
	},
/*
export const Conditions: {[k: string]: ConditionData} = {
	brn: {
		name: 'brn',
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.id === 'flameorb') {
				this.add('-status', target, 'brn', '[from] item: Flame Orb');
			} else if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'brn', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'brn');
			}
		},
		// Damage reduction is handled directly in the sim/battle.js damage function
		onResidualOrder: 10,
		onResidual(pokemon) {
			this.damage(pokemon.baseMaxhp / 16);
		},
	},
	par: {
		name: 'par',
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'par', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'par');
			}
		},
		onModifySpe(spe, pokemon) {
			// Paralysis occurs after all other Speed modifiers, so evaluate all modifiers up to this point first
			spe = this.finalModify(spe);
			if (!pokemon.hasAbility('quickfeet')) {
				spe = Math.floor(spe * 50 / 100);
			}
			return spe;
		},
		onBeforeMovePriority: 1,
		onBeforeMove(pokemon) {
			if (this.randomChance(1, 4)) {
				this.add('cant', pokemon, 'par');
				return false;
			}
		},
	},
	slp: {
		name: 'slp',
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'slp', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else if (sourceEffect && sourceEffect.effectType === 'Move') {
				this.add('-status', target, 'slp', '[from] move: ' + sourceEffect.name);
			} else {
				this.add('-status', target, 'slp');
			}
			// 1-3 turns
			this.effectState.startTime = this.random(2, 5);
			this.effectState.time = this.effectState.startTime;

			if (target.removeVolatile('nightmare')) {
				this.add('-end', target, 'Nightmare', '[silent]');
			}
		},
		onBeforeMovePriority: 10,
		onBeforeMove(pokemon, target, move) {
			if (pokemon.hasAbility('earlybird')) {
				pokemon.statusState.time--;
			}
			pokemon.statusState.time--;
			if (pokemon.statusState.time <= 0) {
				pokemon.cureStatus();
				return;
			}
			this.add('cant', pokemon, 'slp');
			if (move.sleepUsable) {
				return;
			}
			return false;
		},
	},
	frz: {
		name: 'frz',
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'frz', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'frz');
			}
			if (target.species.name === 'Shaymin-Sky' && target.baseSpecies.baseSpecies === 'Shaymin') {
				target.formeChange('Shaymin', this.effect, true);
			}
		},
		onBeforeMovePriority: 10,
		onBeforeMove(pokemon, target, move) {
			if (move.flags['defrost']) return;
			if (this.randomChance(1, 5)) {
				pokemon.cureStatus();
				return;
			}
			this.add('cant', pokemon, 'frz');
			return false;
		},
		onModifyMove(move, pokemon) {
			if (move.flags['defrost']) {
				this.add('-curestatus', pokemon, 'frz', '[from] move: ' + move);
				pokemon.clearStatus();
			}
		},
		onAfterMoveSecondary(target, source, move) {
			if (move.thawsTarget) {
				target.cureStatus();
			}
		},
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Fire' && move.category !== 'Status') {
				target.cureStatus();
			}
		},
	},
	psn: {
		name: 'psn',
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'psn', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'psn');
			}
		},
		onResidualOrder: 9,
		onResidual(pokemon) {
			this.damage(pokemon.baseMaxhp / 8);
		},
	},
	tox: {
		name: 'tox',
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			this.effectState.stage = 0;
			if (sourceEffect && sourceEffect.id === 'toxicorb') {
				this.add('-status', target, 'tox', '[from] item: Toxic Orb');
			} else if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'tox', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'tox');
			}
		},
		onSwitchIn() {
			this.effectState.stage = 0;
		},
		onResidualOrder: 9,
		onResidual(pokemon) {
			if (this.effectState.stage < 15) {
				this.effectState.stage++;
			}
			this.damage(this.clampIntRange(pokemon.baseMaxhp / 16, 1) * this.effectState.stage);
		},
	},
	confusion: {
		name: 'confusion',
		// this is a volatile status
		onStart(target, source, sourceEffect) {
			if (sourceEffect?.id === 'lockedmove') {
				this.add('-start', target, 'confusion', '[fatigue]');
			} else if (sourceEffect?.effectType === 'Ability') {
				this.add('-start', target, 'confusion', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-start', target, 'confusion');
			}
			const min = sourceEffect?.id === 'axekick' ? 3 : 2;
			this.effectState.time = this.random(min, 6);
		},
		onEnd(target) {
			this.add('-end', target, 'confusion');
		},
		onBeforeMovePriority: 3,
		onBeforeMove(pokemon) {
			pokemon.volatiles['confusion'].time--;
			if (!pokemon.volatiles['confusion'].time) {
				pokemon.removeVolatile('confusion');
				return;
			}
			this.add('-activate', pokemon, 'confusion');
			if (!this.randomChance(33, 100)) {
				return;
			}
			this.activeTarget = pokemon;
			const damage = this.actions.getConfusionDamage(pokemon, 40);
			if (typeof damage !== 'number') throw new Error("Confusion damage not dealt");
			const activeMove = {id: this.toID('confused'), effectType: 'Move', type: '???'};
			this.damage(damage, pokemon, pokemon, activeMove as ActiveMove);
			return false;
		},
	},
	flinch: {
		name: 'flinch',
		duration: 1,
		onBeforeMovePriority: 8,
		onBeforeMove(pokemon) {
			this.add('cant', pokemon, 'flinch');
			this.runEvent('Flinch', pokemon);
			return false;
		},
	},
	trapped: {
		name: 'trapped',
		noCopy: true,
		onTrapPokemon(pokemon) {
			pokemon.tryTrap();
		},
		onStart(target) {
			this.add('-activate', target, 'trapped');
		},
	},
	trapper: {
		name: 'trapper',
		noCopy: true,
	},
	partiallytrapped: {
		name: 'partiallytrapped',
		duration: 5,
		durationCallback(target, source) {
			if (source?.hasItem('gripclaw')) return 8;
			return this.random(5, 7);
		},
		onStart(pokemon, source) {
			this.add('-activate', pokemon, 'move: ' + this.effectState.sourceEffect, '[of] ' + source);
			this.effectState.boundDivisor = source.hasItem('bindingband') ? 6 : 8;
		},
		onResidualOrder: 13,
		onResidual(pokemon) {
			const source = this.effectState.source;
			// G-Max Centiferno and G-Max Sandblast continue even after the user leaves the field
			const gmaxEffect = ['gmaxcentiferno', 'gmaxsandblast'].includes(this.effectState.sourceEffect.id);
			if (source && (!source.isActive || source.hp <= 0 || !source.activeTurns) && !gmaxEffect) {
				delete pokemon.volatiles['partiallytrapped'];
				this.add('-end', pokemon, this.effectState.sourceEffect, '[partiallytrapped]', '[silent]');
				return;
			}
			this.damage(pokemon.baseMaxhp / this.effectState.boundDivisor);
		},
		onEnd(pokemon) {
			this.add('-end', pokemon, this.effectState.sourceEffect, '[partiallytrapped]');
		},
		onTrapPokemon(pokemon) {
			const gmaxEffect = ['gmaxcentiferno', 'gmaxsandblast'].includes(this.effectState.sourceEffect.id);
			if (this.effectState.source?.isActive || gmaxEffect) pokemon.tryTrap();
		},
	},
	lockedmove: {
		// Outrage, Thrash, Petal Dance...
		name: 'lockedmove',
		duration: 2,
		onResidual(target) {
			if (target.status === 'slp') {
				// don't lock, and bypass confusion for calming
				delete target.volatiles['lockedmove'];
			}
			this.effectState.trueDuration--;
		},
		onStart(target, source, effect) {
			this.effectState.trueDuration = this.random(2, 4);
			this.effectState.move = effect.id;
		},
		onRestart() {
			if (this.effectState.trueDuration >= 2) {
				this.effectState.duration = 2;
			}
		},
		onEnd(target) {
			if (this.effectState.trueDuration > 1) return;
			target.addVolatile('confusion');
		},
		onLockMove(pokemon) {
			if (pokemon.volatiles['dynamax']) return;
			return this.effectState.move;
		},
	},
	twoturnmove: {
		// Skull Bash, SolarBeam, Sky Drop...
		name: 'twoturnmove',
		duration: 2,
		onStart(attacker, defender, effect) {
			// ("attacker" is the Pokemon using the two turn move and the Pokemon this condition is being applied to)
			this.effectState.move = effect.id;
			attacker.addVolatile(effect.id);
			// lastMoveTargetLoc is the location of the originally targeted slot before any redirection
			// note that this is not updated for moves called by other moves
			// i.e. if Dig is called by Metronome, lastMoveTargetLoc will still be the user's location
			let moveTargetLoc: number = attacker.lastMoveTargetLoc!;
			if (effect.sourceEffect && this.dex.moves.get(effect.id).target !== 'self') {
				// this move was called by another move such as Metronome
				// and needs a random target to be determined this turn
				// it will already have one by now if there is any valid target
				// but if there isn't one we need to choose a random slot now
				if (defender.fainted) {
					defender = this.sample(attacker.foes(true));
				}
				moveTargetLoc = attacker.getLocOf(defender);
			}
			attacker.volatiles[effect.id].targetLoc = moveTargetLoc;
			this.attrLastMove('[still]');
			// Run side-effects normally associated with hitting (e.g., Protean, Libero)
			this.runEvent('PrepareHit', attacker, defender, effect);
		},
		onEnd(target) {
			target.removeVolatile(this.effectState.move);
		},
		onLockMove() {
			return this.effectState.move;
		},
		onMoveAborted(pokemon) {
			pokemon.removeVolatile('twoturnmove');
		},
	},
	choicelock: {
		name: 'choicelock',
		noCopy: true,
		onStart(pokemon) {
			if (!this.activeMove) throw new Error("Battle.activeMove is null");
			if (!this.activeMove.id || this.activeMove.hasBounced || this.activeMove.sourceEffect === 'snatch') return false;
			this.effectState.move = this.activeMove.id;
		},
		onBeforeMove(pokemon, target, move) {
			if (!pokemon.getItem().isChoice) {
				pokemon.removeVolatile('choicelock');
				return;
			}
			if (
				!pokemon.ignoringItem() && !pokemon.volatiles['dynamax'] &&
				move.id !== this.effectState.move && move.id !== 'struggle'
			) {
				// Fails unless the Choice item is being ignored, and no PP is lost
				this.addMove('move', pokemon, move.name);
				this.attrLastMove('[still]');
				this.debug("Disabled by Choice item lock");
				this.add('-fail', pokemon);
				return false;
			}
		},
		onDisableMove(pokemon) {
			if (!pokemon.getItem().isChoice || !pokemon.hasMove(this.effectState.move)) {
				pokemon.removeVolatile('choicelock');
				return;
			}
			if (pokemon.ignoringItem() || pokemon.volatiles['dynamax']) {
				return;
			}
			for (const moveSlot of pokemon.moveSlots) {
				if (moveSlot.id !== this.effectState.move) {
					pokemon.disableMove(moveSlot.id, false, this.effectState.sourceEffect);
				}
			}
		},
	},
	mustrecharge: {
		name: 'mustrecharge',
		duration: 2,
		onBeforeMovePriority: 11,
		onBeforeMove(pokemon) {
			this.add('cant', pokemon, 'recharge');
			pokemon.removeVolatile('mustrecharge');
			pokemon.removeVolatile('truant');
			return null;
		},
		onStart(pokemon) {
			this.add('-mustrecharge', pokemon);
		},
		onLockMove: 'recharge',
	},
	futuremove: {
		// this is a slot condition
		name: 'futuremove',
		duration: 3,
		onResidualOrder: 3,
		onEnd(target) {
			const data = this.effectState;
			// time's up; time to hit! :D
			const move = this.dex.moves.get(data.move);
			if (target.fainted || target === data.source) {
				this.hint(`${move.name} did not hit because the target is ${(target.fainted ? 'fainted' : 'the user')}.`);
				return;
			}

			this.add('-end', target, 'move: ' + move.name);
			target.removeVolatile('Protect');
			target.removeVolatile('Endure');

			if (data.source.hasAbility('infiltrator') && this.gen >= 6) {
				data.moveData.infiltrates = true;
			}
			if (data.source.hasAbility('normalize') && this.gen >= 6) {
				data.moveData.type = 'Normal';
			}
			const hitMove = new this.dex.Move(data.moveData) as ActiveMove;

			this.actions.trySpreadMoveHit([target], data.source, hitMove, true);
			if (data.source.isActive && data.source.hasItem('lifeorb') && this.gen >= 5) {
				this.singleEvent('AfterMoveSecondarySelf', data.source.getItem(), data.source.itemState, data.source, target, data.source.getItem());
			}
			this.activeMove = null;

			this.checkWin();
		},
	},
	healreplacement: {
		// this is a slot condition
		name: 'healreplacement',
		onStart(target, source, sourceEffect) {
			this.effectState.sourceEffect = sourceEffect;
			this.add('-activate', source, 'healreplacement');
		},
		onSwitchInPriority: 1,
		onSwitchIn(target) {
			if (!target.fainted) {
				target.heal(target.maxhp);
				this.add('-heal', target, target.getHealth, '[from] move: ' + this.effectState.sourceEffect, '[zeffect]');
				target.side.removeSlotCondition(target, 'healreplacement');
			}
		},
	},
	stall: {
		// Protect, Detect, Endure counter
		name: 'stall',
		duration: 2,
		counterMax: 729,
		onStart() {
			this.effectState.counter = 3;
		},
		onStallMove(pokemon) {
			// this.effectState.counter should never be undefined here.
			// However, just in case, use 1 if it is undefined.
			const counter = this.effectState.counter || 1;
			this.debug("Success chance: " + Math.round(100 / counter) + "%");
			const success = this.randomChance(1, counter);
			if (!success) delete pokemon.volatiles['stall'];
			return success;
		},
		onRestart() {
			if (this.effectState.counter < (this.effect as Condition).counterMax!) {
				this.effectState.counter *= 3;
			}
			this.effectState.duration = 2;
		},
	},
	gem: {
		name: 'gem',
		duration: 1,
		affectsFainted: true,
		onBasePowerPriority: 14,
		onBasePower(basePower, user, target, move) {
			this.debug('Gem Boost');
			return this.chainModify([5325, 4096]);
		},
	},

	// weather is implemented here since it's so important to the game

	raindance: {
		name: 'RainDance',
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem('damprock')) {
				return 8;
			}
			return 5;
		},
		onWeatherModifyDamage(damage, attacker, defender, move) {
			if (defender.hasItem('utilityumbrella')) return;
			if (move.type === 'Water') {
				this.debug('rain water boost');
				return this.chainModify(1.5);
			}
			if (move.type === 'Fire') {
				this.debug('rain fire suppress');
				return this.chainModify(0.5);
			}
		},
		onFieldStart(field, source, effect) {
			if (effect?.effectType === 'Ability') {
				if (this.gen <= 5) this.effectState.duration = 0;
				this.add('-weather', 'RainDance', '[from] ability: ' + effect.name, '[of] ' + source);
			} else {
				this.add('-weather', 'RainDance');
			}
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-weather', 'RainDance', '[upkeep]');
			this.eachEvent('Weather');
		},
		onFieldEnd() {
			this.add('-weather', 'none');
		},
	},
	primordialsea: {
		name: 'PrimordialSea',
		effectType: 'Weather',
		duration: 0,
		onTryMovePriority: 1,
		onTryMove(attacker, defender, move) {
			if (move.type === 'Fire' && move.category !== 'Status') {
				this.debug('Primordial Sea fire suppress');
				this.add('-fail', attacker, move, '[from] Primordial Sea');
				this.attrLastMove('[still]');
				return null;
			}
		},
		onWeatherModifyDamage(damage, attacker, defender, move) {
			if (defender.hasItem('utilityumbrella')) return;
			if (move.type === 'Water') {
				this.debug('Rain water boost');
				return this.chainModify(1.5);
			}
		},
		onFieldStart(field, source, effect) {
			this.add('-weather', 'PrimordialSea', '[from] ability: ' + effect.name, '[of] ' + source);
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-weather', 'PrimordialSea', '[upkeep]');
			this.eachEvent('Weather');
		},
		onFieldEnd() {
			this.add('-weather', 'none');
		},
	},
	sunnyday: {
		name: 'SunnyDay',
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem('heatrock')) {
				return 8;
			}
			return 5;
		},
		onWeatherModifyDamage(damage, attacker, defender, move) {
			if (move.id === 'hydrosteam' && !attacker.hasItem('utilityumbrella')) {
				this.debug('Sunny Day Hydro Steam boost');
				return this.chainModify(1.5);
			}
			if (defender.hasItem('utilityumbrella')) return;
			if (move.type === 'Fire') {
				this.debug('Sunny Day fire boost');
				return this.chainModify(1.5);
			}
			if (move.type === 'Water') {
				this.debug('Sunny Day water suppress');
				return this.chainModify(0.5);
			}
		},
		onFieldStart(battle, source, effect) {
			if (effect?.effectType === 'Ability') {
				if (this.gen <= 5) this.effectState.duration = 0;
				this.add('-weather', 'SunnyDay', '[from] ability: ' + effect.name, '[of] ' + source);
			} else {
				this.add('-weather', 'SunnyDay');
			}
		},
		onImmunity(type, pokemon) {
			if (pokemon.hasItem('utilityumbrella')) return;
			if (type === 'frz') return false;
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-weather', 'SunnyDay', '[upkeep]');
			this.eachEvent('Weather');
		},
		onFieldEnd() {
			this.add('-weather', 'none');
		},
	},
	desolateland: {
		name: 'DesolateLand',
		effectType: 'Weather',
		duration: 0,
		onTryMovePriority: 1,
		onTryMove(attacker, defender, move) {
			if (move.type === 'Water' && move.category !== 'Status') {
				this.debug('Desolate Land water suppress');
				this.add('-fail', attacker, move, '[from] Desolate Land');
				this.attrLastMove('[still]');
				return null;
			}
		},
		onWeatherModifyDamage(damage, attacker, defender, move) {
			if (defender.hasItem('utilityumbrella')) return;
			if (move.type === 'Fire') {
				this.debug('Sunny Day fire boost');
				return this.chainModify(1.5);
			}
		},
		onFieldStart(field, source, effect) {
			this.add('-weather', 'DesolateLand', '[from] ability: ' + effect.name, '[of] ' + source);
		},
		onImmunity(type, pokemon) {
			if (pokemon.hasItem('utilityumbrella')) return;
			if (type === 'frz') return false;
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-weather', 'DesolateLand', '[upkeep]');
			this.eachEvent('Weather');
		},
		onFieldEnd() {
			this.add('-weather', 'none');
		},
	},
	sandstorm: {
		name: 'Sandstorm',
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem('smoothrock')) {
				return 8;
			}
			return 5;
		},
		// This should be applied directly to the stat before any of the other modifiers are chained
		// So we give it increased priority.
		onModifySpDPriority: 10,
		onModifySpD(spd, pokemon) {
			if (pokemon.hasType('Rock') && this.field.isWeather('sandstorm')) {
				return this.modify(spd, 1.5);
			}
		},
		onFieldStart(field, source, effect) {
			if (effect?.effectType === 'Ability') {
				if (this.gen <= 5) this.effectState.duration = 0;
				this.add('-weather', 'Sandstorm', '[from] ability: ' + effect.name, '[of] ' + source);
			} else {
				this.add('-weather', 'Sandstorm');
			}
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-weather', 'Sandstorm', '[upkeep]');
			if (this.field.isWeather('sandstorm')) this.eachEvent('Weather');
		},
		onWeather(target) {
			this.damage(target.baseMaxhp / 16);
		},
		onFieldEnd() {
			this.add('-weather', 'none');
		},
	},
	hail: {
		name: 'Hail',
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem('icyrock')) {
				return 8;
			}
			return 5;
		},
		onFieldStart(field, source, effect) {
			if (effect?.effectType === 'Ability') {
				if (this.gen <= 5) this.effectState.duration = 0;
				this.add('-weather', 'Hail', '[from] ability: ' + effect.name, '[of] ' + source);
			} else {
				this.add('-weather', 'Hail');
			}
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-weather', 'Hail', '[upkeep]');
			if (this.field.isWeather('hail')) this.eachEvent('Weather');
		},
		onWeather(target) {
			this.damage(target.baseMaxhp / 16);
		},
		onFieldEnd() {
			this.add('-weather', 'none');
		},
	},
	snow: {
		name: 'Snow',
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem('icyrock')) {
				return 8;
			}
			return 5;
		},
		onModifyDefPriority: 10,
		onModifyDef(def, pokemon) {
			if (pokemon.hasType('Ice') && this.field.isWeather('snow')) {
				return this.modify(def, 1.5);
			}
		},
		onFieldStart(field, source, effect) {
			if (effect?.effectType === 'Ability') {
				if (this.gen <= 5) this.effectState.duration = 0;
				this.add('-weather', 'Snow', '[from] ability: ' + effect.name, '[of] ' + source);
			} else {
				this.add('-weather', 'Snow');
			}
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-weather', 'Snow', '[upkeep]');
			if (this.field.isWeather('snow')) this.eachEvent('Weather');
		},
		onFieldEnd() {
			this.add('-weather', 'none');
		},
	},
	deltastream: {
		name: 'DeltaStream',
		effectType: 'Weather',
		duration: 0,
		onEffectivenessPriority: -1,
		onEffectiveness(typeMod, target, type, move) {
			if (move && move.effectType === 'Move' && move.category !== 'Status' && type === 'Flying' && typeMod > 0) {
				this.add('-fieldactivate', 'Delta Stream');
				return 0;
			}
		},
		onFieldStart(field, source, effect) {
			this.add('-weather', 'DeltaStream', '[from] ability: ' + effect.name, '[of] ' + source);
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-weather', 'DeltaStream', '[upkeep]');
			this.eachEvent('Weather');
		},
		onFieldEnd() {
			this.add('-weather', 'none');
		},
	},

	dynamax: {
		name: 'Dynamax',
		noCopy: true,
		onStart(pokemon) {
			this.effectState.turns = 0;
			pokemon.removeVolatile('minimize');
			pokemon.removeVolatile('substitute');
			if (pokemon.volatiles['torment']) {
				delete pokemon.volatiles['torment'];
				this.add('-end', pokemon, 'Torment', '[silent]');
			}
			if (['cramorantgulping', 'cramorantgorging'].includes(pokemon.species.id) && !pokemon.transformed) {
				pokemon.formeChange('cramorant');
			}
			this.add('-start', pokemon, 'Dynamax', pokemon.gigantamax ? 'Gmax' : '');
			if (pokemon.baseSpecies.name === 'Shedinja') return;

			// Changes based on dynamax level, 2 is max (at LVL 10)
			const ratio = 1.5 + (pokemon.dynamaxLevel * 0.05);

			pokemon.maxhp = Math.floor(pokemon.maxhp * ratio);
			pokemon.hp = Math.floor(pokemon.hp * ratio);
			this.add('-heal', pokemon, pokemon.getHealth, '[silent]');
		},
		onTryAddVolatile(status, pokemon) {
			if (status.id === 'flinch') return null;
		},
		onBeforeSwitchOutPriority: -1,
		onBeforeSwitchOut(pokemon) {
			pokemon.removeVolatile('dynamax');
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.id === 'behemothbash' || move.id === 'behemothblade' || move.id === 'dynamaxcannon') {
				return this.chainModify(2);
			}
		},
		onDragOutPriority: 2,
		onDragOut(pokemon) {
			this.add('-block', pokemon, 'Dynamax');
			return null;
		},
		onResidualPriority: -100,
		onResidual() {
			this.effectState.turns++;
		},
		onEnd(pokemon) {
			this.add('-end', pokemon, 'Dynamax');
			if (pokemon.baseSpecies.name === 'Shedinja') return;
			pokemon.hp = pokemon.getUndynamaxedHP();
			pokemon.maxhp = pokemon.baseMaxhp;
			this.add('-heal', pokemon, pokemon.getHealth, '[silent]');
		},
	},

	// Commander needs two conditions so they are implemented here
	// Dondozo
	commanded: {
		name: "Commanded",
		noCopy: true,
		onStart(pokemon) {
			this.boost({atk: 2, spa: 2, spe: 2, def: 2, spd: 2}, pokemon);
		},
		onDragOutPriority: 2,
		onDragOut() {
			return false;
		},
		// Prevents Shed Shell allowing a swap
		onTrapPokemonPriority: -11,
		onTrapPokemon(pokemon) {
			pokemon.trapped = true;
		},
	},
	// Tatsugiri
	commanding: {
		name: "Commanding",
		noCopy: true,
		onDragOutPriority: 2,
		onDragOut() {
			return false;
		},
		// Prevents Shed Shell allowing a swap
		onTrapPokemonPriority: -11,
		onTrapPokemon(pokemon) {
			pokemon.trapped = true;
		},
		// Override No Guard
		onInvulnerabilityPriority: 2,
		onInvulnerability(target, source, move) {
			return false;
		},
		onBeforeTurn(pokemon) {
			this.queue.cancelAction(pokemon);
		},
	},

	// Arceus and Silvally's actual typing is implemented here.
	// Their true typing for all their formes is Normal, and it's only
	// Multitype and RKS System, respectively, that changes their type,
	// but their formes are specified to be their corresponding type
	// in the Pokedex, so that needs to be overridden.
	// This is mainly relevant for Hackmons Cup and Balanced Hackmons.
	arceus: {
		name: 'Arceus',
		onTypePriority: 1,
		onType(types, pokemon) {
			if (pokemon.transformed || pokemon.ability !== 'multitype' && this.gen >= 8) return types;
			let type: string | undefined = 'Normal';
			if (pokemon.ability === 'multitype') {
				type = pokemon.getItem().onPlate;
				if (!type) {
					type = 'Normal';
				}
			}
			return [type];
		},
	},
	silvally: {
		name: 'Silvally',
		onTypePriority: 1,
		onType(types, pokemon) {
			if (pokemon.transformed || pokemon.ability !== 'rkssystem' && this.gen >= 8) return types;
			let type: string | undefined = 'Normal';
			if (pokemon.ability === 'rkssystem') {
				type = pokemon.getItem().onMemory;
				if (!type) {
					type = 'Normal';
				}
			}
			return [type];
		},
	},
	rolloutstorage: {
		name: 'rolloutstorage',
		duration: 2,
		onBasePower(relayVar, source, target, move) {
			let bp = Math.max(1, move.basePower);
			bp *= Math.pow(2, source.volatiles['rolloutstorage'].contactHitCount);
			if (source.volatiles['defensecurl']) {
				bp *= 2;
			}
			source.removeVolatile('rolloutstorage');
			return bp;
		},
	},
};
*/
	marangaberry: {
		name: "Maranga Berry",
		spritenum: 597,
		isBerry: true,
		naturalGift: {
			basePower: 100,
			type: "Dark",
		},
		onAfterMoveSecondary(target, source, move) {
			if (move.category === 'Special') {
				target.eatItem();
			}
		},
		onEat(pokemon) {
			this.boost({spd: 1});
		},
		num: 688,
		gen: 6,
	},
	marshadiumz: {
		name: "Marshadium Z",
		spritenum: 654,
		onTakeItem: false,
		zMove: "Soul-Stealing 7-Star Strike",
		zMoveFrom: "Spectral Thief",
		itemUser: ["Marshadow"],
		num: 802,
		gen: 7,
		isNonstandard: "Past",
	},
	masterball: {
		name: "Master Ball",
		spritenum: 276,
		num: 1,
		gen: 1,
		isPokeball: true,
	},
	masterpieceteacup: {
		name: "Masterpiece Teacup",
		spritenum: 757,
		fling: {
			basePower: 80,
		},
		num: 2404,
		gen: 9,
		rating: 0,
	},
	mawilite: {
		name: "Mawilite",
		spritenum: 598,
		megaStone: "Mawile-Mega",
		megaEvolves: "Mawile",
		itemUser: ["Mawile"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 681,
		gen: 6,
		isNonstandard: "Past",
	},
/*
export const Conditions: {[k: string]: ConditionData} = {
	brn: {
		name: 'brn',
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.id === 'flameorb') {
				this.add('-status', target, 'brn', '[from] item: Flame Orb');
			} else if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'brn', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'brn');
			}
		},
		// Damage reduction is handled directly in the sim/battle.js damage function
		onResidualOrder: 10,
		onResidual(pokemon) {
			this.damage(pokemon.baseMaxhp / 16);
		},
	},
	par: {
		name: 'par',
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'par', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'par');
			}
		},
		onModifySpe(spe, pokemon) {
			// Paralysis occurs after all other Speed modifiers, so evaluate all modifiers up to this point first
			spe = this.finalModify(spe);
			if (!pokemon.hasAbility('quickfeet')) {
				spe = Math.floor(spe * 50 / 100);
			}
			return spe;
		},
		onBeforeMovePriority: 1,
		onBeforeMove(pokemon) {
			if (this.randomChance(1, 4)) {
				this.add('cant', pokemon, 'par');
				return false;
			}
		},
	},
	slp: {
		name: 'slp',
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'slp', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else if (sourceEffect && sourceEffect.effectType === 'Move') {
				this.add('-status', target, 'slp', '[from] move: ' + sourceEffect.name);
			} else {
				this.add('-status', target, 'slp');
			}
			// 1-3 turns
			this.effectState.startTime = this.random(2, 5);
			this.effectState.time = this.effectState.startTime;

			if (target.removeVolatile('nightmare')) {
				this.add('-end', target, 'Nightmare', '[silent]');
			}
		},
		onBeforeMovePriority: 10,
		onBeforeMove(pokemon, target, move) {
			if (pokemon.hasAbility('earlybird')) {
				pokemon.statusState.time--;
			}
			pokemon.statusState.time--;
			if (pokemon.statusState.time <= 0) {
				pokemon.cureStatus();
				return;
			}
			this.add('cant', pokemon, 'slp');
			if (move.sleepUsable) {
				return;
			}
			return false;
		},
	},
	frz: {
		name: 'frz',
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'frz', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'frz');
			}
			if (target.species.name === 'Shaymin-Sky' && target.baseSpecies.baseSpecies === 'Shaymin') {
				target.formeChange('Shaymin', this.effect, true);
			}
		},
		onBeforeMovePriority: 10,
		onBeforeMove(pokemon, target, move) {
			if (move.flags['defrost']) return;
			if (this.randomChance(1, 5)) {
				pokemon.cureStatus();
				return;
			}
			this.add('cant', pokemon, 'frz');
			return false;
		},
		onModifyMove(move, pokemon) {
			if (move.flags['defrost']) {
				this.add('-curestatus', pokemon, 'frz', '[from] move: ' + move);
				pokemon.clearStatus();
			}
		},
		onAfterMoveSecondary(target, source, move) {
			if (move.thawsTarget) {
				target.cureStatus();
			}
		},
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Fire' && move.category !== 'Status') {
				target.cureStatus();
			}
		},
	},
	psn: {
		name: 'psn',
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'psn', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'psn');
			}
		},
		onResidualOrder: 9,
		onResidual(pokemon) {
			this.damage(pokemon.baseMaxhp / 8);
		},
	},
	tox: {
		name: 'tox',
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			this.effectState.stage = 0;
			if (sourceEffect && sourceEffect.id === 'toxicorb') {
				this.add('-status', target, 'tox', '[from] item: Toxic Orb');
			} else if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'tox', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'tox');
			}
		},
		onSwitchIn() {
			this.effectState.stage = 0;
		},
		onResidualOrder: 9,
		onResidual(pokemon) {
			if (this.effectState.stage < 15) {
				this.effectState.stage++;
			}
			this.damage(this.clampIntRange(pokemon.baseMaxhp / 16, 1) * this.effectState.stage);
		},
	},
	confusion: {
		name: 'confusion',
		// this is a volatile status
		onStart(target, source, sourceEffect) {
			if (sourceEffect?.id === 'lockedmove') {
				this.add('-start', target, 'confusion', '[fatigue]');
			} else if (sourceEffect?.effectType === 'Ability') {
				this.add('-start', target, 'confusion', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-start', target, 'confusion');
			}
			const min = sourceEffect?.id === 'axekick' ? 3 : 2;
			this.effectState.time = this.random(min, 6);
		},
		onEnd(target) {
			this.add('-end', target, 'confusion');
		},
		onBeforeMovePriority: 3,
		onBeforeMove(pokemon) {
			pokemon.volatiles['confusion'].time--;
			if (!pokemon.volatiles['confusion'].time) {
				pokemon.removeVolatile('confusion');
				return;
			}
			this.add('-activate', pokemon, 'confusion');
			if (!this.randomChance(33, 100)) {
				return;
			}
			this.activeTarget = pokemon;
			const damage = this.actions.getConfusionDamage(pokemon, 40);
			if (typeof damage !== 'number') throw new Error("Confusion damage not dealt");
			const activeMove = {id: this.toID('confused'), effectType: 'Move', type: '???'};
			this.damage(damage, pokemon, pokemon, activeMove as ActiveMove);
			return false;
		},
	},
	flinch: {
		name: 'flinch',
		duration: 1,
		onBeforeMovePriority: 8,
		onBeforeMove(pokemon) {
			this.add('cant', pokemon, 'flinch');
			this.runEvent('Flinch', pokemon);
			return false;
		},
	},
	trapped: {
		name: 'trapped',
		noCopy: true,
		onTrapPokemon(pokemon) {
			pokemon.tryTrap();
		},
		onStart(target) {
			this.add('-activate', target, 'trapped');
		},
	},
	trapper: {
		name: 'trapper',
		noCopy: true,
	},
	partiallytrapped: {
		name: 'partiallytrapped',
		duration: 5,
		durationCallback(target, source) {
			if (source?.hasItem('gripclaw')) return 8;
			return this.random(5, 7);
		},
		onStart(pokemon, source) {
			this.add('-activate', pokemon, 'move: ' + this.effectState.sourceEffect, '[of] ' + source);
			this.effectState.boundDivisor = source.hasItem('bindingband') ? 6 : 8;
		},
		onResidualOrder: 13,
		onResidual(pokemon) {
			const source = this.effectState.source;
			// G-Max Centiferno and G-Max Sandblast continue even after the user leaves the field
			const gmaxEffect = ['gmaxcentiferno', 'gmaxsandblast'].includes(this.effectState.sourceEffect.id);
			if (source && (!source.isActive || source.hp <= 0 || !source.activeTurns) && !gmaxEffect) {
				delete pokemon.volatiles['partiallytrapped'];
				this.add('-end', pokemon, this.effectState.sourceEffect, '[partiallytrapped]', '[silent]');
				return;
			}
			this.damage(pokemon.baseMaxhp / this.effectState.boundDivisor);
		},
		onEnd(pokemon) {
			this.add('-end', pokemon, this.effectState.sourceEffect, '[partiallytrapped]');
		},
		onTrapPokemon(pokemon) {
			const gmaxEffect = ['gmaxcentiferno', 'gmaxsandblast'].includes(this.effectState.sourceEffect.id);
			if (this.effectState.source?.isActive || gmaxEffect) pokemon.tryTrap();
		},
	},
	lockedmove: {
		// Outrage, Thrash, Petal Dance...
		name: 'lockedmove',
		duration: 2,
		onResidual(target) {
			if (target.status === 'slp') {
				// don't lock, and bypass confusion for calming
				delete target.volatiles['lockedmove'];
			}
			this.effectState.trueDuration--;
		},
		onStart(target, source, effect) {
			this.effectState.trueDuration = this.random(2, 4);
			this.effectState.move = effect.id;
		},
		onRestart() {
			if (this.effectState.trueDuration >= 2) {
				this.effectState.duration = 2;
			}
		},
		onEnd(target) {
			if (this.effectState.trueDuration > 1) return;
			target.addVolatile('confusion');
		},
		onLockMove(pokemon) {
			if (pokemon.volatiles['dynamax']) return;
			return this.effectState.move;
		},
	},
	twoturnmove: {
		// Skull Bash, SolarBeam, Sky Drop...
		name: 'twoturnmove',
		duration: 2,
		onStart(attacker, defender, effect) {
			// ("attacker" is the Pokemon using the two turn move and the Pokemon this condition is being applied to)
			this.effectState.move = effect.id;
			attacker.addVolatile(effect.id);
			// lastMoveTargetLoc is the location of the originally targeted slot before any redirection
			// note that this is not updated for moves called by other moves
			// i.e. if Dig is called by Metronome, lastMoveTargetLoc will still be the user's location
			let moveTargetLoc: number = attacker.lastMoveTargetLoc!;
			if (effect.sourceEffect && this.dex.moves.get(effect.id).target !== 'self') {
				// this move was called by another move such as Metronome
				// and needs a random target to be determined this turn
				// it will already have one by now if there is any valid target
				// but if there isn't one we need to choose a random slot now
				if (defender.fainted) {
					defender = this.sample(attacker.foes(true));
				}
				moveTargetLoc = attacker.getLocOf(defender);
			}
			attacker.volatiles[effect.id].targetLoc = moveTargetLoc;
			this.attrLastMove('[still]');
			// Run side-effects normally associated with hitting (e.g., Protean, Libero)
			this.runEvent('PrepareHit', attacker, defender, effect);
		},
		onEnd(target) {
			target.removeVolatile(this.effectState.move);
		},
		onLockMove() {
			return this.effectState.move;
		},
		onMoveAborted(pokemon) {
			pokemon.removeVolatile('twoturnmove');
		},
	},
	choicelock: {
		name: 'choicelock',
		noCopy: true,
		onStart(pokemon) {
			if (!this.activeMove) throw new Error("Battle.activeMove is null");
			if (!this.activeMove.id || this.activeMove.hasBounced || this.activeMove.sourceEffect === 'snatch') return false;
			this.effectState.move = this.activeMove.id;
		},
		onBeforeMove(pokemon, target, move) {
			if (!pokemon.getItem().isChoice) {
				pokemon.removeVolatile('choicelock');
				return;
			}
			if (
				!pokemon.ignoringItem() && !pokemon.volatiles['dynamax'] &&
				move.id !== this.effectState.move && move.id !== 'struggle'
			) {
				// Fails unless the Choice item is being ignored, and no PP is lost
				this.addMove('move', pokemon, move.name);
				this.attrLastMove('[still]');
				this.debug("Disabled by Choice item lock");
				this.add('-fail', pokemon);
				return false;
			}
		},
		onDisableMove(pokemon) {
			if (!pokemon.getItem().isChoice || !pokemon.hasMove(this.effectState.move)) {
				pokemon.removeVolatile('choicelock');
				return;
			}
			if (pokemon.ignoringItem() || pokemon.volatiles['dynamax']) {
				return;
			}
			for (const moveSlot of pokemon.moveSlots) {
				if (moveSlot.id !== this.effectState.move) {
					pokemon.disableMove(moveSlot.id, false, this.effectState.sourceEffect);
				}
			}
		},
	},
	mustrecharge: {
		name: 'mustrecharge',
		duration: 2,
		onBeforeMovePriority: 11,
		onBeforeMove(pokemon) {
			this.add('cant', pokemon, 'recharge');
			pokemon.removeVolatile('mustrecharge');
			pokemon.removeVolatile('truant');
			return null;
		},
		onStart(pokemon) {
			this.add('-mustrecharge', pokemon);
		},
		onLockMove: 'recharge',
	},
	futuremove: {
		// this is a slot condition
		name: 'futuremove',
		duration: 3,
		onResidualOrder: 3,
		onEnd(target) {
			const data = this.effectState;
			// time's up; time to hit! :D
			const move = this.dex.moves.get(data.move);
			if (target.fainted || target === data.source) {
				this.hint(`${move.name} did not hit because the target is ${(target.fainted ? 'fainted' : 'the user')}.`);
				return;
			}

			this.add('-end', target, 'move: ' + move.name);
			target.removeVolatile('Protect');
			target.removeVolatile('Endure');

			if (data.source.hasAbility('infiltrator') && this.gen >= 6) {
				data.moveData.infiltrates = true;
			}
			if (data.source.hasAbility('normalize') && this.gen >= 6) {
				data.moveData.type = 'Normal';
			}
			const hitMove = new this.dex.Move(data.moveData) as ActiveMove;

			this.actions.trySpreadMoveHit([target], data.source, hitMove, true);
			if (data.source.isActive && data.source.hasItem('lifeorb') && this.gen >= 5) {
				this.singleEvent('AfterMoveSecondarySelf', data.source.getItem(), data.source.itemState, data.source, target, data.source.getItem());
			}
			this.activeMove = null;

			this.checkWin();
		},
	},
	healreplacement: {
		// this is a slot condition
		name: 'healreplacement',
		onStart(target, source, sourceEffect) {
			this.effectState.sourceEffect = sourceEffect;
			this.add('-activate', source, 'healreplacement');
		},
		onSwitchInPriority: 1,
		onSwitchIn(target) {
			if (!target.fainted) {
				target.heal(target.maxhp);
				this.add('-heal', target, target.getHealth, '[from] move: ' + this.effectState.sourceEffect, '[zeffect]');
				target.side.removeSlotCondition(target, 'healreplacement');
			}
		},
	},
	stall: {
		// Protect, Detect, Endure counter
		name: 'stall',
		duration: 2,
		counterMax: 729,
		onStart() {
			this.effectState.counter = 3;
		},
		onStallMove(pokemon) {
			// this.effectState.counter should never be undefined here.
			// However, just in case, use 1 if it is undefined.
			const counter = this.effectState.counter || 1;
			this.debug("Success chance: " + Math.round(100 / counter) + "%");
			const success = this.randomChance(1, counter);
			if (!success) delete pokemon.volatiles['stall'];
			return success;
		},
		onRestart() {
			if (this.effectState.counter < (this.effect as Condition).counterMax!) {
				this.effectState.counter *= 3;
			}
			this.effectState.duration = 2;
		},
	},
	gem: {
		name: 'gem',
		duration: 1,
		affectsFainted: true,
		onBasePowerPriority: 14,
		onBasePower(basePower, user, target, move) {
			this.debug('Gem Boost');
			return this.chainModify([5325, 4096]);
		},
	},

	// weather is implemented here since it's so important to the game

	raindance: {
		name: 'RainDance',
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem('damprock')) {
				return 8;
			}
			return 5;
		},
		onWeatherModifyDamage(damage, attacker, defender, move) {
			if (defender.hasItem('utilityumbrella')) return;
			if (move.type === 'Water') {
				this.debug('rain water boost');
				return this.chainModify(1.5);
			}
			if (move.type === 'Fire') {
				this.debug('rain fire suppress');
				return this.chainModify(0.5);
			}
		},
		onFieldStart(field, source, effect) {
			if (effect?.effectType === 'Ability') {
				if (this.gen <= 5) this.effectState.duration = 0;
				this.add('-weather', 'RainDance', '[from] ability: ' + effect.name, '[of] ' + source);
			} else {
				this.add('-weather', 'RainDance');
			}
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-weather', 'RainDance', '[upkeep]');
			this.eachEvent('Weather');
		},
		onFieldEnd() {
			this.add('-weather', 'none');
		},
	},
	primordialsea: {
		name: 'PrimordialSea',
		effectType: 'Weather',
		duration: 0,
		onTryMovePriority: 1,
		onTryMove(attacker, defender, move) {
			if (move.type === 'Fire' && move.category !== 'Status') {
				this.debug('Primordial Sea fire suppress');
				this.add('-fail', attacker, move, '[from] Primordial Sea');
				this.attrLastMove('[still]');
				return null;
			}
		},
		onWeatherModifyDamage(damage, attacker, defender, move) {
			if (defender.hasItem('utilityumbrella')) return;
			if (move.type === 'Water') {
				this.debug('Rain water boost');
				return this.chainModify(1.5);
			}
		},
		onFieldStart(field, source, effect) {
			this.add('-weather', 'PrimordialSea', '[from] ability: ' + effect.name, '[of] ' + source);
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-weather', 'PrimordialSea', '[upkeep]');
			this.eachEvent('Weather');
		},
		onFieldEnd() {
			this.add('-weather', 'none');
		},
	},
	sunnyday: {
		name: 'SunnyDay',
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem('heatrock')) {
				return 8;
			}
			return 5;
		},
		onWeatherModifyDamage(damage, attacker, defender, move) {
			if (move.id === 'hydrosteam' && !attacker.hasItem('utilityumbrella')) {
				this.debug('Sunny Day Hydro Steam boost');
				return this.chainModify(1.5);
			}
			if (defender.hasItem('utilityumbrella')) return;
			if (move.type === 'Fire') {
				this.debug('Sunny Day fire boost');
				return this.chainModify(1.5);
			}
			if (move.type === 'Water') {
				this.debug('Sunny Day water suppress');
				return this.chainModify(0.5);
			}
		},
		onFieldStart(battle, source, effect) {
			if (effect?.effectType === 'Ability') {
				if (this.gen <= 5) this.effectState.duration = 0;
				this.add('-weather', 'SunnyDay', '[from] ability: ' + effect.name, '[of] ' + source);
			} else {
				this.add('-weather', 'SunnyDay');
			}
		},
		onImmunity(type, pokemon) {
			if (pokemon.hasItem('utilityumbrella')) return;
			if (type === 'frz') return false;
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-weather', 'SunnyDay', '[upkeep]');
			this.eachEvent('Weather');
		},
		onFieldEnd() {
			this.add('-weather', 'none');
		},
	},
	desolateland: {
		name: 'DesolateLand',
		effectType: 'Weather',
		duration: 0,
		onTryMovePriority: 1,
		onTryMove(attacker, defender, move) {
			if (move.type === 'Water' && move.category !== 'Status') {
				this.debug('Desolate Land water suppress');
				this.add('-fail', attacker, move, '[from] Desolate Land');
				this.attrLastMove('[still]');
				return null;
			}
		},
		onWeatherModifyDamage(damage, attacker, defender, move) {
			if (defender.hasItem('utilityumbrella')) return;
			if (move.type === 'Fire') {
				this.debug('Sunny Day fire boost');
				return this.chainModify(1.5);
			}
		},
		onFieldStart(field, source, effect) {
			this.add('-weather', 'DesolateLand', '[from] ability: ' + effect.name, '[of] ' + source);
		},
		onImmunity(type, pokemon) {
			if (pokemon.hasItem('utilityumbrella')) return;
			if (type === 'frz') return false;
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-weather', 'DesolateLand', '[upkeep]');
			this.eachEvent('Weather');
		},
		onFieldEnd() {
			this.add('-weather', 'none');
		},
	},
	sandstorm: {
		name: 'Sandstorm',
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem('smoothrock')) {
				return 8;
			}
			return 5;
		},
		// This should be applied directly to the stat before any of the other modifiers are chained
		// So we give it increased priority.
		onModifySpDPriority: 10,
		onModifySpD(spd, pokemon) {
			if (pokemon.hasType('Rock') && this.field.isWeather('sandstorm')) {
				return this.modify(spd, 1.5);
			}
		},
		onFieldStart(field, source, effect) {
			if (effect?.effectType === 'Ability') {
				if (this.gen <= 5) this.effectState.duration = 0;
				this.add('-weather', 'Sandstorm', '[from] ability: ' + effect.name, '[of] ' + source);
			} else {
				this.add('-weather', 'Sandstorm');
			}
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-weather', 'Sandstorm', '[upkeep]');
			if (this.field.isWeather('sandstorm')) this.eachEvent('Weather');
		},
		onWeather(target) {
			this.damage(target.baseMaxhp / 16);
		},
		onFieldEnd() {
			this.add('-weather', 'none');
		},
	},
	hail: {
		name: 'Hail',
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem('icyrock')) {
				return 8;
			}
			return 5;
		},
		onFieldStart(field, source, effect) {
			if (effect?.effectType === 'Ability') {
				if (this.gen <= 5) this.effectState.duration = 0;
				this.add('-weather', 'Hail', '[from] ability: ' + effect.name, '[of] ' + source);
			} else {
				this.add('-weather', 'Hail');
			}
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-weather', 'Hail', '[upkeep]');
			if (this.field.isWeather('hail')) this.eachEvent('Weather');
		},
		onWeather(target) {
			this.damage(target.baseMaxhp / 16);
		},
		onFieldEnd() {
			this.add('-weather', 'none');
		},
	},
	snow: {
		name: 'Snow',
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem('icyrock')) {
				return 8;
			}
			return 5;
		},
		onModifyDefPriority: 10,
		onModifyDef(def, pokemon) {
			if (pokemon.hasType('Ice') && this.field.isWeather('snow')) {
				return this.modify(def, 1.5);
			}
		},
		onFieldStart(field, source, effect) {
			if (effect?.effectType === 'Ability') {
				if (this.gen <= 5) this.effectState.duration = 0;
				this.add('-weather', 'Snow', '[from] ability: ' + effect.name, '[of] ' + source);
			} else {
				this.add('-weather', 'Snow');
			}
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-weather', 'Snow', '[upkeep]');
			if (this.field.isWeather('snow')) this.eachEvent('Weather');
		},
		onFieldEnd() {
			this.add('-weather', 'none');
		},
	},
	deltastream: {
		name: 'DeltaStream',
		effectType: 'Weather',
		duration: 0,
		onEffectivenessPriority: -1,
		onEffectiveness(typeMod, target, type, move) {
			if (move && move.effectType === 'Move' && move.category !== 'Status' && type === 'Flying' && typeMod > 0) {
				this.add('-fieldactivate', 'Delta Stream');
				return 0;
			}
		},
		onFieldStart(field, source, effect) {
			this.add('-weather', 'DeltaStream', '[from] ability: ' + effect.name, '[of] ' + source);
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-weather', 'DeltaStream', '[upkeep]');
			this.eachEvent('Weather');
		},
		onFieldEnd() {
			this.add('-weather', 'none');
		},
	},

	dynamax: {
		name: 'Dynamax',
		noCopy: true,
		onStart(pokemon) {
			this.effectState.turns = 0;
			pokemon.removeVolatile('minimize');
			pokemon.removeVolatile('substitute');
			if (pokemon.volatiles['torment']) {
				delete pokemon.volatiles['torment'];
				this.add('-end', pokemon, 'Torment', '[silent]');
			}
			if (['cramorantgulping', 'cramorantgorging'].includes(pokemon.species.id) && !pokemon.transformed) {
				pokemon.formeChange('cramorant');
			}
			this.add('-start', pokemon, 'Dynamax', pokemon.gigantamax ? 'Gmax' : '');
			if (pokemon.baseSpecies.name === 'Shedinja') return;

			// Changes based on dynamax level, 2 is max (at LVL 10)
			const ratio = 1.5 + (pokemon.dynamaxLevel * 0.05);

			pokemon.maxhp = Math.floor(pokemon.maxhp * ratio);
			pokemon.hp = Math.floor(pokemon.hp * ratio);
			this.add('-heal', pokemon, pokemon.getHealth, '[silent]');
		},
		onTryAddVolatile(status, pokemon) {
			if (status.id === 'flinch') return null;
		},
		onBeforeSwitchOutPriority: -1,
		onBeforeSwitchOut(pokemon) {
			pokemon.removeVolatile('dynamax');
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.id === 'behemothbash' || move.id === 'behemothblade' || move.id === 'dynamaxcannon') {
				return this.chainModify(2);
			}
		},
		onDragOutPriority: 2,
		onDragOut(pokemon) {
			this.add('-block', pokemon, 'Dynamax');
			return null;
		},
		onResidualPriority: -100,
		onResidual() {
			this.effectState.turns++;
		},
		onEnd(pokemon) {
			this.add('-end', pokemon, 'Dynamax');
			if (pokemon.baseSpecies.name === 'Shedinja') return;
			pokemon.hp = pokemon.getUndynamaxedHP();
			pokemon.maxhp = pokemon.baseMaxhp;
			this.add('-heal', pokemon, pokemon.getHealth, '[silent]');
		},
	},

	// Commander needs two conditions so they are implemented here
	// Dondozo
	commanded: {
		name: "Commanded",
		noCopy: true,
		onStart(pokemon) {
			this.boost({atk: 2, spa: 2, spe: 2, def: 2, spd: 2}, pokemon);
		},
		onDragOutPriority: 2,
		onDragOut() {
			return false;
		},
		// Prevents Shed Shell allowing a swap
		onTrapPokemonPriority: -11,
		onTrapPokemon(pokemon) {
			pokemon.trapped = true;
		},
	},
	// Tatsugiri
	commanding: {
		name: "Commanding",
		noCopy: true,
		onDragOutPriority: 2,
		onDragOut() {
			return false;
		},
		// Prevents Shed Shell allowing a swap
		onTrapPokemonPriority: -11,
		onTrapPokemon(pokemon) {
			pokemon.trapped = true;
		},
		// Override No Guard
		onInvulnerabilityPriority: 2,
		onInvulnerability(target, source, move) {
			return false;
		},
		onBeforeTurn(pokemon) {
			this.queue.cancelAction(pokemon);
		},
	},

	// Arceus and Silvally's actual typing is implemented here.
	// Their true typing for all their formes is Normal, and it's only
	// Multitype and RKS System, respectively, that changes their type,
	// but their formes are specified to be their corresponding type
	// in the Pokedex, so that needs to be overridden.
	// This is mainly relevant for Hackmons Cup and Balanced Hackmons.
	arceus: {
		name: 'Arceus',
		onTypePriority: 1,
		onType(types, pokemon) {
			if (pokemon.transformed || pokemon.ability !== 'multitype' && this.gen >= 8) return types;
			let type: string | undefined = 'Normal';
			if (pokemon.ability === 'multitype') {
				type = pokemon.getItem().onPlate;
				if (!type) {
					type = 'Normal';
				}
			}
			return [type];
		},
	},
	silvally: {
		name: 'Silvally',
		onTypePriority: 1,
		onType(types, pokemon) {
			if (pokemon.transformed || pokemon.ability !== 'rkssystem' && this.gen >= 8) return types;
			let type: string | undefined = 'Normal';
			if (pokemon.ability === 'rkssystem') {
				type = pokemon.getItem().onMemory;
				if (!type) {
					type = 'Normal';
				}
			}
			return [type];
		},
	},
	rolloutstorage: {
		name: 'rolloutstorage',
		duration: 2,
		onBasePower(relayVar, source, target, move) {
			let bp = Math.max(1, move.basePower);
			bp *= Math.pow(2, source.volatiles['rolloutstorage'].contactHitCount);
			if (source.volatiles['defensecurl']) {
				bp *= 2;
			}
			source.removeVolatile('rolloutstorage');
			return bp;
		},
	},
};
*/
	meadowplate: {
		name: "Meadow Plate",
		spritenum: 282,
		onPlate: 'Grass',
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Grass') {
				return this.chainModify([4915, 4096]);
			}
		},
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 493) || pokemon.baseSpecies.num === 493) {
				return false;
			}
			return true;
		},
		forcedForme: "Arceus-Grass",
		num: 301,
		gen: 4,
	},
	medichamite: {
		name: "Medichamite",
		spritenum: 599,
		megaStone: "Medicham-Mega",
		megaEvolves: "Medicham",
		itemUser: ["Medicham"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 665,
		gen: 6,
		isNonstandard: "Past",
	},
	mentalherb: {
		name: "Mental Herb",
		spritenum: 285,
		fling: {
			basePower: 10,
			effect(pokemon) {
				const conditions = ['attract', 'taunt', 'encore', 'torment', 'disable', 'healblock'];
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
			const conditions = ['attract', 'taunt', 'encore', 'torment', 'disable', 'healblock'];
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
		rating: 3,
	},
	metagrossite: {
		name: "Metagrossite",
		spritenum: 618,
		megaStone: "Metagross-Mega",
		megaEvolves: "Metagross",
		itemUser: ["Metagross"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 758,
		gen: 6,
		isNonstandard: "Past",
	},
	metalalloy: {
		name: "Metal Alloy",
		spritenum: 761,
		num: 2482,
		gen: 9,
	},
	metalcoat: {
		name: "Metal Coat",
		spritenum: 286,
		fling: {
			basePower: 30,
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Steel') {
				return this.chainModify([4915, 4096]);
			}
		},
		num: 233,
		gen: 2,
	},
	metalpowder: {
		name: "Metal Powder",
		fling: {
			basePower: 10,
		},
		spritenum: 287,
		onModifyDefPriority: 2,
		onModifyDef(def, pokemon) {
			if (pokemon.species.name === 'Ditto' && !pokemon.transformed) {
				return this.chainModify(2);
			}
		},
		itemUser: ["Ditto"],
		num: 257,
		gen: 2,
		isNonstandard: "Past",
	},
	metronome: {
		name: "Metronome",
		spritenum: 289,
		fling: {
			basePower: 30,
		},
		onStart(pokemon) {
			pokemon.addVolatile('metronome');
		},
		condition: {
			onStart(pokemon) {
				this.effectState.lastMove = '';
				this.effectState.numConsecutive = 0;
			},
			onTryMovePriority: -2,
			onTryMove(pokemon, target, move) {
				if (!pokemon.hasItem('metronome')) {
					pokemon.removeVolatile('metronome');
					return;
				}
				if (this.effectState.lastMove === move.id && pokemon.moveLastTurnResult) {
					this.effectState.numConsecutive++;
				} else if (pokemon.volatiles['twoturnmove']) {
					if (this.effectState.lastMove !== move.id) {
						this.effectState.numConsecutive = 1;
					} else {
						this.effectState.numConsecutive++;
					}
				} else {
					this.effectState.numConsecutive = 0;
				}
				this.effectState.lastMove = move.id;
			},
			onModifyDamage(damage, source, target, move) {
				const dmgMod = [4096, 4915, 5734, 6553, 7372, 8192];
				const numConsecutive = this.effectState.numConsecutive > 5 ? 5 : this.effectState.numConsecutive;
				this.debug(`Current Metronome boost: ${dmgMod[numConsecutive]}/4096`);
				return this.chainModify([dmgMod[numConsecutive], 4096]);
			},
		},
		num: 277,
		gen: 4,
	},
	mewniumz: {
		name: "Mewnium Z",
		spritenum: 658,
		onTakeItem: false,
		zMove: "Genesis Supernova",
		zMoveFrom: "Psychic",
		itemUser: ["Mew"],
		num: 806,
		gen: 7,
		isNonstandard: "Past",
	},
	mewtwonitex: {
		name: "Mewtwonite X",
		spritenum: 600,
		megaStone: "Mewtwo-Mega-X",
		megaEvolves: "Mewtwo",
		itemUser: ["Mewtwo"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 662,
		gen: 6,
		isNonstandard: "Past",
	},
	mewtwonitey: {
		name: "Mewtwonite Y",
		spritenum: 601,
		megaStone: "Mewtwo-Mega-Y",
		megaEvolves: "Mewtwo",
		itemUser: ["Mewtwo"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 663,
		gen: 6,
		isNonstandard: "Past",
	},
	micleberry: {
		name: "Micle Berry",
		spritenum: 290,
		isBerry: true,
		naturalGift: {
			basePower: 100,
			type: "Rock",
		},
		onResidual(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 4 || (pokemon.hp <= pokemon.maxhp / 2 &&
					pokemon.hasAbility('gluttony') && pokemon.abilityState.gluttony)) {
				pokemon.eatItem();
			}
		},
		onEat(pokemon) {
			pokemon.addVolatile('micleberry');
		},
		condition: {
			duration: 2,
			onSourceAccuracy(accuracy, target, source, move) {
				if (!move.ohko) {
					this.add('-enditem', source, 'Micle Berry');
					source.removeVolatile('micleberry');
					if (typeof accuracy === 'number') {
						return this.chainModify([4915, 4096]);
					}
				}
			},
		},
		num: 209,
		gen: 4,
	},
	mimikiumz: {
		name: "Mimikium Z",
		spritenum: 688,
		onTakeItem: false,
		zMove: "Let's Snuggle Forever",
		zMoveFrom: "Play Rough",
		itemUser: ["Mimikyu", "Mimikyu-Busted", "Mimikyu-Totem", "Mimikyu-Busted-Totem"],
		num: 924,
		isNonstandard: "Past",
		gen: 7,
	},
	mindplate: {
		name: "Mind Plate",
		spritenum: 291,
		onPlate: 'Psychic',
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Psychic') {
				return this.chainModify([4915, 4096]);
			}
		},
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 493) || pokemon.baseSpecies.num === 493) {
				return false;
			}
			return true;
		},
		forcedForme: "Arceus-Psychic",
		num: 307,
		gen: 4,
	},
	miracleseed: {
		name: "Miracle Seed",
		fling: {
			basePower: 30,
		},
		spritenum: 292,
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Grass') {
				return this.chainModify([4915, 4096]);
			}
		},
		num: 239,
		gen: 2,
	},
	mirrorherb: {
		name: "Mirror Herb",
		spritenum: 748,
		fling: {
			basePower: 30,
		},
		onFoeAfterBoost(boost, target, source, effect) {
			if (effect?.name === 'Opportunist' || effect?.name === 'Mirror Herb') return;
			const boostPlus: SparseBoostsTable = {};
			let statsRaised = false;
			let i: BoostID;
			for (i in boost) {
				if (boost[i]! > 0) {
					boostPlus[i] = boost[i];
					statsRaised = true;
				}
			}
			if (!statsRaised) return;
			const pokemon: Pokemon = this.effectState.target;
			pokemon.useItem();
			this.boost(boostPlus, pokemon);
		},
		num: 1883,
		gen: 9,
	},
	mistyseed: {
		name: "Misty Seed",
		spritenum: 666,
		fling: {
			basePower: 10,
		},
		onStart(pokemon) {
			if (!pokemon.ignoringItem() && this.field.isTerrain('mistyterrain')) {
				pokemon.useItem();
			}
		},
		onTerrainChange(pokemon) {
			if (this.field.isTerrain('mistyterrain')) {
				pokemon.useItem();
			}
		},
		boosts: {
			spd: 1,
		},
		num: 883,
		gen: 7,
	},
	moonball: {
		name: "Moon Ball",
		spritenum: 294,
		num: 498,
		gen: 2,
		isPokeball: true,
	},
	moonstone: {
		name: "Moon Stone",
		spritenum: 295,
		fling: {
			basePower: 30,
		},
		num: 81,
		gen: 1,
		rating: 0,
	},
	muscleband: {
		name: "Muscle Band",
		spritenum: 297,
		fling: {
			basePower: 10,
		},
		onBasePowerPriority: 16,
		onBasePower(basePower, user, target, move) {
			if (move.category === 'Physical') {
				return this.chainModify([4505, 4096]);
			}
		},
		num: 266,
		gen: 4,
	},
	mysticwater: {
		name: "Mystic Water",
		spritenum: 300,
		fling: {
			basePower: 30,
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Water') {
				return this.chainModify([4915, 4096]);
			}
		},
		num: 243,
		gen: 2,
	},
	nanabberry: {
		name: "Nanab Berry",
		spritenum: 302,
		isBerry: true,
		naturalGift: {
			basePower: 90,
			type: "Water",
		},
		onEat: false,
		num: 166,
		gen: 3,
		isNonstandard: "Past",
		rating: 0,
	},
	nestball: {
		name: "Nest Ball",
		spritenum: 303,
		num: 8,
		gen: 3,
		isPokeball: true,
	},
	netball: {
		name: "Net Ball",
		spritenum: 304,
		num: 6,
		gen: 3,
		isPokeball: true,
	},
	nevermeltice: {
		name: "Never-Melt Ice",
		spritenum: 305,
		fling: {
			basePower: 30,
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Ice') {
				return this.chainModify([4915, 4096]);
			}
		},
		num: 246,
		gen: 2,
	},
	nomelberry: {
		name: "Nomel Berry",
		spritenum: 306,
		isBerry: true,
		naturalGift: {
			basePower: 90,
			type: "Dragon",
		},
		onEat: false,
		num: 178,
		gen: 3,
		isNonstandard: "Past",
		rating: 0,
	},
	normalgem: {
		name: "Normal Gem",
		spritenum: 307,
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status' || move.flags['pledgecombo']) return;
			if (move.type === 'Normal' && source.useItem()) {
				source.addVolatile('gem');
			}
		},
		num: 564,
		gen: 5,
	},
	normaliumz: {
		name: "Normalium Z",
		spritenum: 631,
		onTakeItem: false,
		zMove: true,
		zMoveType: "Normal",
		num: 776,
		gen: 7,
		isNonstandard: "Past",
	},
	occaberry: {
		name: "Occa Berry",
		spritenum: 311,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Fire",
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Fire' && target.getMoveHitData(move).typeMod > 0) {
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
		num: 184,
		gen: 4,
	},
	oddincense: {
		name: "Odd Incense",
		spritenum: 312,
		fling: {
			basePower: 10,
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Psychic') {
				return this.chainModify([4915, 4096]);
			}
		},
		num: 314,
		gen: 4,
		isNonstandard: "Past",
	},
	oldamber: {
		name: "Old Amber",
		spritenum: 314,
		fling: {
			basePower: 100,
		},
		num: 103,
		gen: 3,
		isNonstandard: "Past",
		rating: 0,
	},
	oranberry: {
		name: "Oran Berry",
		spritenum: 319,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Poison",
		},
		onUpdate(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 2) {
				pokemon.eatItem();
			}
		},
		onTryEatItem(item, pokemon) {
			if (!this.runEvent('TryHeal', pokemon, null, this.effect, 10)) return false;
		},
		onEat(pokemon) {
			this.heal(10);
		},
		num: 155,
		gen: 3,
		rating: 0,
	},
	ovalstone: {
		name: "Oval Stone",
		spritenum: 321,
		fling: {
			basePower: 80,
		},
		num: 110,
		gen: 4,
		rating: 0,
	},
	pamtreberry: {
		name: "Pamtre Berry",
		spritenum: 323,
		isBerry: true,
		naturalGift: {
			basePower: 90,
			type: "Steel",
		},
		onEat: false,
		num: 180,
		gen: 3,
		isNonstandard: "Past",
		rating: 0,
	},
	parkball: {
		name: "Park Ball",
		spritenum: 325,
		num: 500,
		gen: 4,
		isPokeball: true,
		isNonstandard: "Unobtainable",
	},
	passhoberry: {
		name: "Passho Berry",
		spritenum: 329,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Water",
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Water' && target.getMoveHitData(move).typeMod > 0) {
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
		num: 185,
		gen: 4,
	},
	payapaberry: {
		name: "Payapa Berry",
		spritenum: 330,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Psychic",
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Psychic' && target.getMoveHitData(move).typeMod > 0) {
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
		num: 193,
		gen: 4,
	},
	pechaberry: {
		name: "Pecha Berry",
		spritenum: 333,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Electric",
		},
		onUpdate(pokemon) {
			if (pokemon.status === 'psn' || pokemon.status === 'tox') {
				pokemon.eatItem();
			}
		},
		onEat(pokemon) {
			if (pokemon.status === 'psn' || pokemon.status === 'tox') {
				pokemon.cureStatus();
			}
		},
		num: 151,
		gen: 3,
		rating: 1,
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
			if (pokemon.volatiles['confusion']) {
				pokemon.eatItem();
			}
		},
		onEat(pokemon) {
			pokemon.removeVolatile('confusion');
		},
		num: 156,
		gen: 3,
		rating: 1,
	},
	petayaberry: {
		name: "Petaya Berry",
		spritenum: 335,
		isBerry: true,
		naturalGift: {
			basePower: 100,
			type: "Poison",
		},
		onUpdate(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 4 || (pokemon.hp <= pokemon.maxhp / 2 &&
					pokemon.hasAbility('gluttony') && pokemon.abilityState.gluttony)) {
				pokemon.eatItem();
			}
		},
		onEat(pokemon) {
			this.boost({spa: 1});
		},
		num: 204,
		gen: 3,
	},
	pidgeotite: {
		name: "Pidgeotite",
		spritenum: 622,
		megaStone: "Pidgeot-Mega",
		megaEvolves: "Pidgeot",
		itemUser: ["Pidgeot"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 762,
		gen: 6,
		isNonstandard: "Past",
	},
	pikaniumz: {
		name: "Pikanium Z",
		spritenum: 649,
		onTakeItem: false,
		zMove: "Catastropika",
		zMoveFrom: "Volt Tackle",
		itemUser: ["Pikachu"],
		num: 794,
		gen: 7,
		isNonstandard: "Past",
	},
	pikashuniumz: {
		name: "Pikashunium Z",
		spritenum: 659,
		onTakeItem: false,
		zMove: "10,000,000 Volt Thunderbolt",
		zMoveFrom: "Thunderbolt",
		itemUser: ["Pikachu-Original", "Pikachu-Hoenn", "Pikachu-Sinnoh", "Pikachu-Unova", "Pikachu-Kalos", "Pikachu-Alola", "Pikachu-Partner"],
		num: 836,
		isNonstandard: "Past",
		gen: 7,
	},
	pinapberry: {
		name: "Pinap Berry",
		spritenum: 337,
		isBerry: true,
		naturalGift: {
			basePower: 90,
			type: "Grass",
		},
		onEat: false,
		num: 168,
		gen: 3,
		isNonstandard: "Past",
		rating: 0,
	},
	pinsirite: {
		name: "Pinsirite",
		spritenum: 602,
		megaStone: "Pinsir-Mega",
		megaEvolves: "Pinsir",
		itemUser: ["Pinsir"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 671,
		gen: 6,
		isNonstandard: "Past",
	},
	pixieplate: {
		name: "Pixie Plate",
		spritenum: 610,
		onPlate: 'Fairy',
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Fairy') {
				return this.chainModify([4915, 4096]);
			}
		},
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 493) || pokemon.baseSpecies.num === 493) {
				return false;
			}
			return true;
		},
		forcedForme: "Arceus-Fairy",
		num: 644,
		gen: 6,
	},
	plumefossil: {
		name: "Plume Fossil",
		spritenum: 339,
		fling: {
			basePower: 100,
		},
		num: 573,
		gen: 5,
		isNonstandard: "Past",
		rating: 0,
	},
	poisonbarb: {
		name: "Poison Barb",
		spritenum: 343,
		fling: {
			basePower: 70,
			status: 'psn',
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Poison') {
				return this.chainModify([4915, 4096]);
			}
		},
		num: 245,
		gen: 2,
	},
	poisongem: {
		name: "Poison Gem",
		spritenum: 344,
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status') return;
			if (move.type === 'Poison' && source.useItem()) {
				source.addVolatile('gem');
			}
		},
		num: 554,
		gen: 5,
		isNonstandard: "Past",
	},
	poisonmemory: {
		name: "Poison Memory",
		spritenum: 670,
		onMemory: 'Poison',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 773) || pokemon.baseSpecies.num === 773) {
				return false;
			}
			return true;
		},
		forcedForme: "Silvally-Poison",
		itemUser: ["Silvally-Poison"],
		num: 906,
		gen: 7,
		isNonstandard: "Past",
	},
	poisoniumz: {
		name: "Poisonium Z",
		spritenum: 638,
		onPlate: 'Poison',
		onTakeItem: false,
		zMove: true,
		zMoveType: "Poison",
		forcedForme: "Arceus-Poison",
		num: 783,
		gen: 7,
		isNonstandard: "Past",
	},
	pokeball: {
		name: "Poke Ball",
		spritenum: 345,
		num: 4,
		gen: 1,
		isPokeball: true,
	},
	pomegberry: {
		name: "Pomeg Berry",
		spritenum: 351,
		isBerry: true,
		naturalGift: {
			basePower: 90,
			type: "Ice",
		},
		onEat: false,
		num: 169,
		gen: 3,
		rating: 0,
	},
	poweranklet: {
		name: "Power Anklet",
		spritenum: 354,
		ignoreKlutz: true,
		fling: {
			basePower: 70,
		},
		onModifySpe(spe) {
			return this.chainModify(0.5);
		},
		num: 293,
		gen: 4,
		rating: 0,
	},
	powerband: {
		name: "Power Band",
		spritenum: 355,
		ignoreKlutz: true,
		fling: {
			basePower: 70,
		},
		onModifySpe(spe) {
			return this.chainModify(0.5);
		},
		num: 292,
		gen: 4,
		rating: 0,
	},
	powerbelt: {
		name: "Power Belt",
		spritenum: 356,
		ignoreKlutz: true,
		fling: {
			basePower: 70,
		},
		onModifySpe(spe) {
			return this.chainModify(0.5);
		},
		num: 290,
		gen: 4,
		rating: 0,
	},
	powerbracer: {
		name: "Power Bracer",
		spritenum: 357,
		ignoreKlutz: true,
		fling: {
			basePower: 70,
		},
		onModifySpe(spe) {
			return this.chainModify(0.5);
		},
		num: 289,
		gen: 4,
		rating: 0,
	},
	powerherb: {
		onChargeMove(pokemon, target, move) {
			if (pokemon.useItem()) {
				this.debug('power herb - remove charge turn for ' + move.id);
				this.attrLastMove('[still]');
				this.addMove('-anim', pokemon, move.name, target);
				return false; // skip charge turn
			}
		},
		name: "Power Herb",
		spritenum: 358,
		fling: {
			basePower: 10,
		},
		num: 271,
		gen: 4,
		rating: 3,
	},
	powerlens: {
		name: "Power Lens",
		spritenum: 359,
		ignoreKlutz: true,
		fling: {
			basePower: 70,
		},
		onModifySpe(spe) {
			return this.chainModify(0.5);
		},
		num: 291,
		gen: 4,
		rating: 0,
	},
	powerweight: {
		name: "Power Weight",
		spritenum: 360,
		ignoreKlutz: true,
		fling: {
			basePower: 70,
		},
		onModifySpe(spe) {
			return this.chainModify(0.5);
		},
		num: 294,
		gen: 4,
		rating: 0,
	},
	premierball: {
		name: "Premier Ball",
		spritenum: 363,
		num: 12,
		gen: 3,
		isPokeball: true,
	},
	primariumz: {
		name: "Primarium Z",
		spritenum: 652,
		onTakeItem: false,
		zMove: "Oceanic Operetta",
		zMoveFrom: "Sparkling Aria",
		itemUser: ["Primarina"],
		num: 800,
		gen: 7,
		isNonstandard: "Past",
	},
	prismscale: {
		name: "Prism Scale",
		spritenum: 365,
		fling: {
			basePower: 30,
		},
		num: 537,
		gen: 5,
		rating: 0,
	},
	protectivepads: {
		name: "Protective Pads",
		spritenum: 663,
		fling: {
			basePower: 30,
		},
		// protective effect handled in Battle#checkMoveMakesContact
		num: 880,
		gen: 7,
	},
	protector: {
		name: "Protector",
		spritenum: 367,
		fling: {
			basePower: 80,
		},
		num: 321,
		gen: 4,
		rating: 0,
	},
	psychicgem: {
		name: "Psychic Gem",
		spritenum: 369,
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status') return;
			if (move.type === 'Psychic' && source.useItem()) {
				source.addVolatile('gem');
			}
		},
		num: 557,
		gen: 5,
		isNonstandard: "Past",
	},
	psychicmemory: {
		name: "Psychic Memory",
		spritenum: 680,
		onMemory: 'Psychic',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 773) || pokemon.baseSpecies.num === 773) {
				return false;
			}
			return true;
		},
		forcedForme: "Silvally-Psychic",
		itemUser: ["Silvally-Psychic"],
		num: 916,
		gen: 7,
		isNonstandard: "Past",
	},
	psychicseed: {
		name: "Psychic Seed",
		spritenum: 665,
		fling: {
			basePower: 10,
		},
		onStart(pokemon) {
			if (!pokemon.ignoringItem() && this.field.isTerrain('psychicterrain')) {
				pokemon.useItem();
			}
		},
		onTerrainChange(pokemon) {
			if (this.field.isTerrain('psychicterrain')) {
				pokemon.useItem();
			}
		},
		boosts: {
			spd: 1,
		},
		num: 882,
		gen: 7,
	},
	psychiumz: {
		name: "Psychium Z",
		spritenum: 641,
		onPlate: 'Psychic',
		onTakeItem: false,
		zMove: true,
		zMoveType: "Psychic",
		forcedForme: "Arceus-Psychic",
		num: 786,
		gen: 7,
		isNonstandard: "Past",
	},
	punchingglove: {
		name: "Punching Glove",
		spritenum: 749,
		fling: {
			basePower: 30,
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['punch']) {
				this.debug('Punching Glove boost');
				return this.chainModify([4506, 4096]);
			}
		},
		onModifyMovePriority: 1,
		onModifyMove(move) {
			if (move.flags['punch']) delete move.flags['contact'];
		},
		num: 1884,
		gen: 9,
	},
	qualotberry: {
		name: "Qualot Berry",
		spritenum: 371,
		isBerry: true,
		naturalGift: {
			basePower: 90,
			type: "Poison",
		},
		onEat: false,
		num: 171,
		gen: 3,
		rating: 0,
	},
	quickball: {
		name: "Quick Ball",
		spritenum: 372,
		num: 15,
		gen: 4,
		isPokeball: true,
	},
	quickclaw: {
		onFractionalPriorityPriority: -2,
		onFractionalPriority(priority, pokemon, target, move) {
			if (move.category === "Status" && pokemon.hasAbility("myceliummight")) return;
			if (priority <= 0 && this.randomChance(1, 5)) {
				this.add('-activate', pokemon, 'item: Quick Claw');
				return 0.1;
			}
		},
		name: "Quick Claw",
		spritenum: 373,
		fling: {
			basePower: 80,
		},
		num: 217,
		gen: 2,
	},
	quickpowder: {
		name: "Quick Powder",
		spritenum: 374,
		fling: {
			basePower: 10,
		},
		onModifySpe(spe, pokemon) {
			if (pokemon.species.name === 'Ditto' && !pokemon.transformed) {
				return this.chainModify(2);
			}
		},
		itemUser: ["Ditto"],
		num: 274,
		gen: 4,
		isNonstandard: "Past",
	},
	rabutaberry: {
		name: "Rabuta Berry",
		spritenum: 375,
		isBerry: true,
		naturalGift: {
			basePower: 90,
			type: "Ghost",
		},
		onEat: false,
		num: 177,
		gen: 3,
		isNonstandard: "Past",
		rating: 0,
	},
	rarebone: {
		name: "Rare Bone",
		spritenum: 379,
		fling: {
			basePower: 100,
		},
		num: 106,
		gen: 4,
		rating: 0,
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
			if (pokemon.status === 'brn') {
				pokemon.eatItem();
			}
		},
		onEat(pokemon) {
			if (pokemon.status === 'brn') {
				pokemon.cureStatus();
			}
		},
		num: 152,
		gen: 3,
		rating: 1,
	},
	razorclaw: {
		name: "Razor Claw",
		spritenum: 382,
		fling: {
			basePower: 80,
		},
		onModifyCritRatio(critRatio) {
			return critRatio + 1;
		},
		num: 326,
		gen: 4,
	},
	razorfang: {
		name: "Razor Fang",
		spritenum: 383,
		fling: {
			basePower: 30,
			volatileStatus: 'flinch',
		},
		onModifyMovePriority: -1,
		onModifyMove(move) {
			if (move.category !== "Status") {
				if (!move.secondaries) move.secondaries = [];
				for (const secondary of move.secondaries) {
					if (secondary.volatileStatus === 'flinch') return;
				}
				move.secondaries.push({
					chance: 10,
					volatileStatus: 'flinch',
				});
			}
		},
		num: 327,
		gen: 4,
	},
	razzberry: {
		name: "Razz Berry",
		spritenum: 384,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Steel",
		},
		onEat: false,
		num: 164,
		gen: 3,
		isNonstandard: "Past",
		rating: 0,
	},
	reapercloth: {
		name: "Reaper Cloth",
		spritenum: 385,
		fling: {
			basePower: 10,
		},
		num: 325,
		gen: 4,
		rating: 0,
	},
	redcard: {
		name: "Red Card",
		spritenum: 387,
		fling: {
			basePower: 10,
		},
		onAfterMoveSecondary(target, source, move) {
			if (source && source !== target && source.hp && target.hp && move && move.category !== 'Status') {
				if (!source.isActive || !this.canSwitch(source.side) || source.forceSwitchFlag || target.forceSwitchFlag) {
					return;
				}
				// The item is used up even against a pokemon with Ingrain or that otherwise can't be forced out
				if (target.useItem(source)) {
					if (this.runEvent('DragOut', source, target, move)) {
						source.forceSwitchFlag = true;
					}
				}
			}
		},
		num: 542,
		gen: 5,
	},
	redorb: {
		name: "Red Orb",
		spritenum: 390,
		onSwitchIn(pokemon) {
			if (pokemon.isActive && pokemon.baseSpecies.name === 'Groudon') {
				this.queue.insertChoice({choice: 'runPrimal', pokemon: pokemon});
			}
		},
		onPrimal(pokemon) {
			pokemon.formeChange('Groudon-Primal', this.effect, true);
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Groudon') return false;
			return true;
		},
		itemUser: ["Groudon"],
		num: 534,
		gen: 6,
		isNonstandard: "Past",
	},
	repeatball: {
		name: "Repeat Ball",
		spritenum: 401,
		num: 9,
		gen: 3,
		isPokeball: true,
	},
	ribbonsweet: {
		name: "Ribbon Sweet",
		spritenum: 710,
		fling: {
			basePower: 10,
		},
		num: 1115,
		gen: 8,
		rating: 0,
	},
	rindoberry: {
		name: "Rindo Berry",
		spritenum: 409,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Grass",
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Grass' && target.getMoveHitData(move).typeMod > 0) {
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
		num: 187,
		gen: 4,
	},
	ringtarget: {
		name: "Ring Target",
		spritenum: 410,
		fling: {
			basePower: 10,
		},
		onNegateImmunity: false,
		num: 543,
		gen: 5,
	},
	rockgem: {
		name: "Rock Gem",
		spritenum: 415,
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status') return;
			if (move.type === 'Rock' && source.useItem()) {
				source.addVolatile('gem');
			}
		},
		num: 559,
		gen: 5,
		isNonstandard: "Past",
	},
	rockincense: {
		name: "Rock Incense",
		spritenum: 416,
		fling: {
			basePower: 10,
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Rock') {
				return this.chainModify([4915, 4096]);
			}
		},
		num: 315,
		gen: 4,
		isNonstandard: "Past",
	},
	rockmemory: {
		name: "Rock Memory",
		spritenum: 672,
		onMemory: 'Rock',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 773) || pokemon.baseSpecies.num === 773) {
				return false;
			}
			return true;
		},
		forcedForme: "Silvally-Rock",
		itemUser: ["Silvally-Rock"],
		num: 908,
		gen: 7,
		isNonstandard: "Past",
	},
	rockiumz: {
		name: "Rockium Z",
		spritenum: 643,
		onPlate: 'Rock',
		onTakeItem: false,
		zMove: true,
		zMoveType: "Rock",
		forcedForme: "Arceus-Rock",
		num: 788,
		gen: 7,
		isNonstandard: "Past",
	},
	rockyhelmet: {
		name: "Rocky Helmet",
		spritenum: 417,
		fling: {
			basePower: 60,
		},
		onDamagingHitOrder: 2,
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target)) {
				this.damage(source.baseMaxhp / 6, source, target);
			}
		},
		num: 540,
		gen: 5,
		rating: 3,
	},
	roomservice: {
		name: "Room Service",
		spritenum: 717,
		fling: {
			basePower: 100,
		},
		onStart(pokemon) {
			if (!pokemon.ignoringItem() && this.field.getPseudoWeather('trickroom')) {
				pokemon.useItem();
			}
		},
		onAnyPseudoWeatherChange() {
			const pokemon = this.effectState.target;
			if (this.field.getPseudoWeather('trickroom')) {
				pokemon.useItem(pokemon);
			}
		},
		boosts: {
			spe: -1,
		},
		num: 1122,
		gen: 8,
	},
	rootfossil: {
		name: "Root Fossil",
		spritenum: 418,
		fling: {
			basePower: 100,
		},
/*
export const Conditions: {[k: string]: ConditionData} = {
	brn: {
		name: 'brn',
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.id === 'flameorb') {
				this.add('-status', target, 'brn', '[from] item: Flame Orb');
			} else if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'brn', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'brn');
			}
		},
		// Damage reduction is handled directly in the sim/battle.js damage function
		onResidualOrder: 10,
		onResidual(pokemon) {
			this.damage(pokemon.baseMaxhp / 16);
		},
	},
	par: {
		name: 'par',
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'par', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'par');
			}
		},
		onModifySpe(spe, pokemon) {
			// Paralysis occurs after all other Speed modifiers, so evaluate all modifiers up to this point first
			spe = this.finalModify(spe);
			if (!pokemon.hasAbility('quickfeet')) {
				spe = Math.floor(spe * 50 / 100);
			}
			return spe;
		},
		onBeforeMovePriority: 1,
		onBeforeMove(pokemon) {
			if (this.randomChance(1, 4)) {
				this.add('cant', pokemon, 'par');
				return false;
			}
		},
	},
	slp: {
		name: 'slp',
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'slp', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else if (sourceEffect && sourceEffect.effectType === 'Move') {
				this.add('-status', target, 'slp', '[from] move: ' + sourceEffect.name);
			} else {
				this.add('-status', target, 'slp');
			}
			// 1-3 turns
			this.effectState.startTime = this.random(2, 5);
			this.effectState.time = this.effectState.startTime;

			if (target.removeVolatile('nightmare')) {
				this.add('-end', target, 'Nightmare', '[silent]');
			}
		},
		onBeforeMovePriority: 10,
		onBeforeMove(pokemon, target, move) {
			if (pokemon.hasAbility('earlybird')) {
				pokemon.statusState.time--;
			}
			pokemon.statusState.time--;
			if (pokemon.statusState.time <= 0) {
				pokemon.cureStatus();
				return;
			}
			this.add('cant', pokemon, 'slp');
			if (move.sleepUsable) {
				return;
			}
			return false;
		},
	},
	frz: {
		name: 'frz',
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'frz', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'frz');
			}
			if (target.species.name === 'Shaymin-Sky' && target.baseSpecies.baseSpecies === 'Shaymin') {
				target.formeChange('Shaymin', this.effect, true);
			}
		},
		onBeforeMovePriority: 10,
		onBeforeMove(pokemon, target, move) {
			if (move.flags['defrost']) return;
			if (this.randomChance(1, 5)) {
				pokemon.cureStatus();
				return;
			}
			this.add('cant', pokemon, 'frz');
			return false;
		},
		onModifyMove(move, pokemon) {
			if (move.flags['defrost']) {
				this.add('-curestatus', pokemon, 'frz', '[from] move: ' + move);
				pokemon.clearStatus();
			}
		},
		onAfterMoveSecondary(target, source, move) {
			if (move.thawsTarget) {
				target.cureStatus();
			}
		},
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Fire' && move.category !== 'Status') {
				target.cureStatus();
			}
		},
	},
	psn: {
		name: 'psn',
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'psn', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'psn');
			}
		},
		onResidualOrder: 9,
		onResidual(pokemon) {
			this.damage(pokemon.baseMaxhp / 8);
		},
	},
	tox: {
		name: 'tox',
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			this.effectState.stage = 0;
			if (sourceEffect && sourceEffect.id === 'toxicorb') {
				this.add('-status', target, 'tox', '[from] item: Toxic Orb');
			} else if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'tox', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'tox');
			}
		},
		onSwitchIn() {
			this.effectState.stage = 0;
		},
		onResidualOrder: 9,
		onResidual(pokemon) {
			if (this.effectState.stage < 15) {
				this.effectState.stage++;
			}
			this.damage(this.clampIntRange(pokemon.baseMaxhp / 16, 1) * this.effectState.stage);
		},
	},
	confusion: {
		name: 'confusion',
		// this is a volatile status
		onStart(target, source, sourceEffect) {
			if (sourceEffect?.id === 'lockedmove') {
				this.add('-start', target, 'confusion', '[fatigue]');
			} else if (sourceEffect?.effectType === 'Ability') {
				this.add('-start', target, 'confusion', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-start', target, 'confusion');
			}
			const min = sourceEffect?.id === 'axekick' ? 3 : 2;
			this.effectState.time = this.random(min, 6);
		},
		onEnd(target) {
			this.add('-end', target, 'confusion');
		},
		onBeforeMovePriority: 3,
		onBeforeMove(pokemon) {
			pokemon.volatiles['confusion'].time--;
			if (!pokemon.volatiles['confusion'].time) {
				pokemon.removeVolatile('confusion');
				return;
			}
			this.add('-activate', pokemon, 'confusion');
			if (!this.randomChance(33, 100)) {
				return;
			}
			this.activeTarget = pokemon;
			const damage = this.actions.getConfusionDamage(pokemon, 40);
			if (typeof damage !== 'number') throw new Error("Confusion damage not dealt");
			const activeMove = {id: this.toID('confused'), effectType: 'Move', type: '???'};
			this.damage(damage, pokemon, pokemon, activeMove as ActiveMove);
			return false;
		},
	},
	flinch: {
		name: 'flinch',
		duration: 1,
		onBeforeMovePriority: 8,
		onBeforeMove(pokemon) {
			this.add('cant', pokemon, 'flinch');
			this.runEvent('Flinch', pokemon);
			return false;
		},
	},
	trapped: {
		name: 'trapped',
		noCopy: true,
		onTrapPokemon(pokemon) {
			pokemon.tryTrap();
		},
		onStart(target) {
			this.add('-activate', target, 'trapped');
		},
	},
	trapper: {
		name: 'trapper',
		noCopy: true,
	},
	partiallytrapped: {
		name: 'partiallytrapped',
		duration: 5,
		durationCallback(target, source) {
			if (source?.hasItem('gripclaw')) return 8;
			return this.random(5, 7);
		},
		onStart(pokemon, source) {
			this.add('-activate', pokemon, 'move: ' + this.effectState.sourceEffect, '[of] ' + source);
			this.effectState.boundDivisor = source.hasItem('bindingband') ? 6 : 8;
		},
		onResidualOrder: 13,
		onResidual(pokemon) {
			const source = this.effectState.source;
			// G-Max Centiferno and G-Max Sandblast continue even after the user leaves the field
			const gmaxEffect = ['gmaxcentiferno', 'gmaxsandblast'].includes(this.effectState.sourceEffect.id);
			if (source && (!source.isActive || source.hp <= 0 || !source.activeTurns) && !gmaxEffect) {
				delete pokemon.volatiles['partiallytrapped'];
				this.add('-end', pokemon, this.effectState.sourceEffect, '[partiallytrapped]', '[silent]');
				return;
			}
			this.damage(pokemon.baseMaxhp / this.effectState.boundDivisor);
		},
		onEnd(pokemon) {
			this.add('-end', pokemon, this.effectState.sourceEffect, '[partiallytrapped]');
		},
		onTrapPokemon(pokemon) {
			const gmaxEffect = ['gmaxcentiferno', 'gmaxsandblast'].includes(this.effectState.sourceEffect.id);
			if (this.effectState.source?.isActive || gmaxEffect) pokemon.tryTrap();
		},
	},
	lockedmove: {
		// Outrage, Thrash, Petal Dance...
		name: 'lockedmove',
		duration: 2,
		onResidual(target) {
			if (target.status === 'slp') {
				// don't lock, and bypass confusion for calming
				delete target.volatiles['lockedmove'];
			}
			this.effectState.trueDuration--;
		},
		onStart(target, source, effect) {
			this.effectState.trueDuration = this.random(2, 4);
			this.effectState.move = effect.id;
		},
		onRestart() {
			if (this.effectState.trueDuration >= 2) {
				this.effectState.duration = 2;
			}
		},
		onEnd(target) {
			if (this.effectState.trueDuration > 1) return;
			target.addVolatile('confusion');
		},
		onLockMove(pokemon) {
			if (pokemon.volatiles['dynamax']) return;
			return this.effectState.move;
		},
	},
	twoturnmove: {
		// Skull Bash, SolarBeam, Sky Drop...
		name: 'twoturnmove',
		duration: 2,
		onStart(attacker, defender, effect) {
			// ("attacker" is the Pokemon using the two turn move and the Pokemon this condition is being applied to)
			this.effectState.move = effect.id;
			attacker.addVolatile(effect.id);
			// lastMoveTargetLoc is the location of the originally targeted slot before any redirection
			// note that this is not updated for moves called by other moves
			// i.e. if Dig is called by Metronome, lastMoveTargetLoc will still be the user's location
			let moveTargetLoc: number = attacker.lastMoveTargetLoc!;
			if (effect.sourceEffect && this.dex.moves.get(effect.id).target !== 'self') {
				// this move was called by another move such as Metronome
				// and needs a random target to be determined this turn
				// it will already have one by now if there is any valid target
				// but if there isn't one we need to choose a random slot now
				if (defender.fainted) {
					defender = this.sample(attacker.foes(true));
				}
				moveTargetLoc = attacker.getLocOf(defender);
			}
			attacker.volatiles[effect.id].targetLoc = moveTargetLoc;
			this.attrLastMove('[still]');
			// Run side-effects normally associated with hitting (e.g., Protean, Libero)
			this.runEvent('PrepareHit', attacker, defender, effect);
		},
		onEnd(target) {
			target.removeVolatile(this.effectState.move);
		},
		onLockMove() {
			return this.effectState.move;
		},
		onMoveAborted(pokemon) {
			pokemon.removeVolatile('twoturnmove');
		},
	},
	choicelock: {
		name: 'choicelock',
		noCopy: true,
		onStart(pokemon) {
			if (!this.activeMove) throw new Error("Battle.activeMove is null");
			if (!this.activeMove.id || this.activeMove.hasBounced || this.activeMove.sourceEffect === 'snatch') return false;
			this.effectState.move = this.activeMove.id;
		},
		onBeforeMove(pokemon, target, move) {
			if (!pokemon.getItem().isChoice) {
				pokemon.removeVolatile('choicelock');
				return;
			}
			if (
				!pokemon.ignoringItem() && !pokemon.volatiles['dynamax'] &&
				move.id !== this.effectState.move && move.id !== 'struggle'
			) {
				// Fails unless the Choice item is being ignored, and no PP is lost
				this.addMove('move', pokemon, move.name);
				this.attrLastMove('[still]');
				this.debug("Disabled by Choice item lock");
				this.add('-fail', pokemon);
				return false;
			}
		},
		onDisableMove(pokemon) {
			if (!pokemon.getItem().isChoice || !pokemon.hasMove(this.effectState.move)) {
				pokemon.removeVolatile('choicelock');
				return;
			}
			if (pokemon.ignoringItem() || pokemon.volatiles['dynamax']) {
				return;
			}
			for (const moveSlot of pokemon.moveSlots) {
				if (moveSlot.id !== this.effectState.move) {
					pokemon.disableMove(moveSlot.id, false, this.effectState.sourceEffect);
				}
			}
		},
	},
	mustrecharge: {
		name: 'mustrecharge',
		duration: 2,
		onBeforeMovePriority: 11,
		onBeforeMove(pokemon) {
			this.add('cant', pokemon, 'recharge');
			pokemon.removeVolatile('mustrecharge');
			pokemon.removeVolatile('truant');
			return null;
		},
		onStart(pokemon) {
			this.add('-mustrecharge', pokemon);
		},
		onLockMove: 'recharge',
	},
	futuremove: {
		// this is a slot condition
		name: 'futuremove',
		duration: 3,
		onResidualOrder: 3,
		onEnd(target) {
			const data = this.effectState;
			// time's up; time to hit! :D
			const move = this.dex.moves.get(data.move);
			if (target.fainted || target === data.source) {
				this.hint(`${move.name} did not hit because the target is ${(target.fainted ? 'fainted' : 'the user')}.`);
				return;
			}

			this.add('-end', target, 'move: ' + move.name);
			target.removeVolatile('Protect');
			target.removeVolatile('Endure');

			if (data.source.hasAbility('infiltrator') && this.gen >= 6) {
				data.moveData.infiltrates = true;
			}
			if (data.source.hasAbility('normalize') && this.gen >= 6) {
				data.moveData.type = 'Normal';
			}
			const hitMove = new this.dex.Move(data.moveData) as ActiveMove;

			this.actions.trySpreadMoveHit([target], data.source, hitMove, true);
			if (data.source.isActive && data.source.hasItem('lifeorb') && this.gen >= 5) {
				this.singleEvent('AfterMoveSecondarySelf', data.source.getItem(), data.source.itemState, data.source, target, data.source.getItem());
			}
			this.activeMove = null;

			this.checkWin();
		},
	},
	healreplacement: {
		// this is a slot condition
		name: 'healreplacement',
		onStart(target, source, sourceEffect) {
			this.effectState.sourceEffect = sourceEffect;
			this.add('-activate', source, 'healreplacement');
		},
		onSwitchInPriority: 1,
		onSwitchIn(target) {
			if (!target.fainted) {
				target.heal(target.maxhp);
				this.add('-heal', target, target.getHealth, '[from] move: ' + this.effectState.sourceEffect, '[zeffect]');
				target.side.removeSlotCondition(target, 'healreplacement');
			}
		},
	},
	stall: {
		// Protect, Detect, Endure counter
		name: 'stall',
		duration: 2,
		counterMax: 729,
		onStart() {
			this.effectState.counter = 3;
		},
		onStallMove(pokemon) {
			// this.effectState.counter should never be undefined here.
			// However, just in case, use 1 if it is undefined.
			const counter = this.effectState.counter || 1;
			this.debug("Success chance: " + Math.round(100 / counter) + "%");
			const success = this.randomChance(1, counter);
			if (!success) delete pokemon.volatiles['stall'];
			return success;
		},
		onRestart() {
			if (this.effectState.counter < (this.effect as Condition).counterMax!) {
				this.effectState.counter *= 3;
			}
			this.effectState.duration = 2;
		},
	},
	gem: {
		name: 'gem',
		duration: 1,
		affectsFainted: true,
		onBasePowerPriority: 14,
		onBasePower(basePower, user, target, move) {
			this.debug('Gem Boost');
			return this.chainModify([5325, 4096]);
		},
	},

	// weather is implemented here since it's so important to the game

	raindance: {
		name: 'RainDance',
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem('damprock')) {
				return 8;
			}
			return 5;
		},
		onWeatherModifyDamage(damage, attacker, defender, move) {
			if (defender.hasItem('utilityumbrella')) return;
			if (move.type === 'Water') {
				this.debug('rain water boost');
				return this.chainModify(1.5);
			}
			if (move.type === 'Fire') {
				this.debug('rain fire suppress');
				return this.chainModify(0.5);
			}
		},
		onFieldStart(field, source, effect) {
			if (effect?.effectType === 'Ability') {
				if (this.gen <= 5) this.effectState.duration = 0;
				this.add('-weather', 'RainDance', '[from] ability: ' + effect.name, '[of] ' + source);
			} else {
				this.add('-weather', 'RainDance');
			}
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-weather', 'RainDance', '[upkeep]');
			this.eachEvent('Weather');
		},
		onFieldEnd() {
			this.add('-weather', 'none');
		},
	},
	primordialsea: {
		name: 'PrimordialSea',
		effectType: 'Weather',
		duration: 0,
		onTryMovePriority: 1,
		onTryMove(attacker, defender, move) {
			if (move.type === 'Fire' && move.category !== 'Status') {
				this.debug('Primordial Sea fire suppress');
				this.add('-fail', attacker, move, '[from] Primordial Sea');
				this.attrLastMove('[still]');
				return null;
			}
		},
		onWeatherModifyDamage(damage, attacker, defender, move) {
			if (defender.hasItem('utilityumbrella')) return;
			if (move.type === 'Water') {
				this.debug('Rain water boost');
				return this.chainModify(1.5);
			}
		},
		onFieldStart(field, source, effect) {
			this.add('-weather', 'PrimordialSea', '[from] ability: ' + effect.name, '[of] ' + source);
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-weather', 'PrimordialSea', '[upkeep]');
			this.eachEvent('Weather');
		},
		onFieldEnd() {
			this.add('-weather', 'none');
		},
	},
	sunnyday: {
		name: 'SunnyDay',
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem('heatrock')) {
				return 8;
			}
			return 5;
		},
		onWeatherModifyDamage(damage, attacker, defender, move) {
			if (move.id === 'hydrosteam' && !attacker.hasItem('utilityumbrella')) {
				this.debug('Sunny Day Hydro Steam boost');
				return this.chainModify(1.5);
			}
			if (defender.hasItem('utilityumbrella')) return;
			if (move.type === 'Fire') {
				this.debug('Sunny Day fire boost');
				return this.chainModify(1.5);
			}
			if (move.type === 'Water') {
				this.debug('Sunny Day water suppress');
				return this.chainModify(0.5);
			}
		},
		onFieldStart(battle, source, effect) {
			if (effect?.effectType === 'Ability') {
				if (this.gen <= 5) this.effectState.duration = 0;
				this.add('-weather', 'SunnyDay', '[from] ability: ' + effect.name, '[of] ' + source);
			} else {
				this.add('-weather', 'SunnyDay');
			}
		},
		onImmunity(type, pokemon) {
			if (pokemon.hasItem('utilityumbrella')) return;
			if (type === 'frz') return false;
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-weather', 'SunnyDay', '[upkeep]');
			this.eachEvent('Weather');
		},
		onFieldEnd() {
			this.add('-weather', 'none');
		},
	},
	desolateland: {
		name: 'DesolateLand',
		effectType: 'Weather',
		duration: 0,
		onTryMovePriority: 1,
		onTryMove(attacker, defender, move) {
			if (move.type === 'Water' && move.category !== 'Status') {
				this.debug('Desolate Land water suppress');
				this.add('-fail', attacker, move, '[from] Desolate Land');
				this.attrLastMove('[still]');
				return null;
			}
		},
		onWeatherModifyDamage(damage, attacker, defender, move) {
			if (defender.hasItem('utilityumbrella')) return;
			if (move.type === 'Fire') {
				this.debug('Sunny Day fire boost');
				return this.chainModify(1.5);
			}
		},
		onFieldStart(field, source, effect) {
			this.add('-weather', 'DesolateLand', '[from] ability: ' + effect.name, '[of] ' + source);
		},
		onImmunity(type, pokemon) {
			if (pokemon.hasItem('utilityumbrella')) return;
			if (type === 'frz') return false;
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-weather', 'DesolateLand', '[upkeep]');
			this.eachEvent('Weather');
		},
		onFieldEnd() {
			this.add('-weather', 'none');
		},
	},
	sandstorm: {
		name: 'Sandstorm',
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem('smoothrock')) {
				return 8;
			}
			return 5;
		},
		// This should be applied directly to the stat before any of the other modifiers are chained
		// So we give it increased priority.
		onModifySpDPriority: 10,
		onModifySpD(spd, pokemon) {
			if (pokemon.hasType('Rock') && this.field.isWeather('sandstorm')) {
				return this.modify(spd, 1.5);
			}
		},
		onFieldStart(field, source, effect) {
			if (effect?.effectType === 'Ability') {
				if (this.gen <= 5) this.effectState.duration = 0;
				this.add('-weather', 'Sandstorm', '[from] ability: ' + effect.name, '[of] ' + source);
			} else {
				this.add('-weather', 'Sandstorm');
			}
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-weather', 'Sandstorm', '[upkeep]');
			if (this.field.isWeather('sandstorm')) this.eachEvent('Weather');
		},
		onWeather(target) {
			this.damage(target.baseMaxhp / 16);
		},
		onFieldEnd() {
			this.add('-weather', 'none');
		},
	},
	hail: {
		name: 'Hail',
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem('icyrock')) {
				return 8;
			}
			return 5;
		},
		onFieldStart(field, source, effect) {
			if (effect?.effectType === 'Ability') {
				if (this.gen <= 5) this.effectState.duration = 0;
				this.add('-weather', 'Hail', '[from] ability: ' + effect.name, '[of] ' + source);
			} else {
				this.add('-weather', 'Hail');
			}
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-weather', 'Hail', '[upkeep]');
			if (this.field.isWeather('hail')) this.eachEvent('Weather');
		},
		onWeather(target) {
			this.damage(target.baseMaxhp / 16);
		},
		onFieldEnd() {
			this.add('-weather', 'none');
		},
	},
	snow: {
		name: 'Snow',
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem('icyrock')) {
				return 8;
			}
			return 5;
		},
		onModifyDefPriority: 10,
		onModifyDef(def, pokemon) {
			if (pokemon.hasType('Ice') && this.field.isWeather('snow')) {
				return this.modify(def, 1.5);
			}
		},
		onFieldStart(field, source, effect) {
			if (effect?.effectType === 'Ability') {
				if (this.gen <= 5) this.effectState.duration = 0;
				this.add('-weather', 'Snow', '[from] ability: ' + effect.name, '[of] ' + source);
			} else {
				this.add('-weather', 'Snow');
			}
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-weather', 'Snow', '[upkeep]');
			if (this.field.isWeather('snow')) this.eachEvent('Weather');
		},
		onFieldEnd() {
			this.add('-weather', 'none');
		},
	},
	deltastream: {
		name: 'DeltaStream',
		effectType: 'Weather',
		duration: 0,
		onEffectivenessPriority: -1,
		onEffectiveness(typeMod, target, type, move) {
			if (move && move.effectType === 'Move' && move.category !== 'Status' && type === 'Flying' && typeMod > 0) {
				this.add('-fieldactivate', 'Delta Stream');
				return 0;
			}
		},
		onFieldStart(field, source, effect) {
			this.add('-weather', 'DeltaStream', '[from] ability: ' + effect.name, '[of] ' + source);
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-weather', 'DeltaStream', '[upkeep]');
			this.eachEvent('Weather');
		},
		onFieldEnd() {
			this.add('-weather', 'none');
		},
	},

	dynamax: {
		name: 'Dynamax',
		noCopy: true,
		onStart(pokemon) {
			this.effectState.turns = 0;
			pokemon.removeVolatile('minimize');
			pokemon.removeVolatile('substitute');
			if (pokemon.volatiles['torment']) {
				delete pokemon.volatiles['torment'];
				this.add('-end', pokemon, 'Torment', '[silent]');
			}
			if (['cramorantgulping', 'cramorantgorging'].includes(pokemon.species.id) && !pokemon.transformed) {
				pokemon.formeChange('cramorant');
			}
			this.add('-start', pokemon, 'Dynamax', pokemon.gigantamax ? 'Gmax' : '');
			if (pokemon.baseSpecies.name === 'Shedinja') return;

			// Changes based on dynamax level, 2 is max (at LVL 10)
			const ratio = 1.5 + (pokemon.dynamaxLevel * 0.05);

			pokemon.maxhp = Math.floor(pokemon.maxhp * ratio);
			pokemon.hp = Math.floor(pokemon.hp * ratio);
			this.add('-heal', pokemon, pokemon.getHealth, '[silent]');
		},
		onTryAddVolatile(status, pokemon) {
			if (status.id === 'flinch') return null;
		},
		onBeforeSwitchOutPriority: -1,
		onBeforeSwitchOut(pokemon) {
			pokemon.removeVolatile('dynamax');
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.id === 'behemothbash' || move.id === 'behemothblade' || move.id === 'dynamaxcannon') {
				return this.chainModify(2);
			}
		},
		onDragOutPriority: 2,
		onDragOut(pokemon) {
			this.add('-block', pokemon, 'Dynamax');
			return null;
		},
		onResidualPriority: -100,
		onResidual() {
			this.effectState.turns++;
		},
		onEnd(pokemon) {
			this.add('-end', pokemon, 'Dynamax');
			if (pokemon.baseSpecies.name === 'Shedinja') return;
			pokemon.hp = pokemon.getUndynamaxedHP();
			pokemon.maxhp = pokemon.baseMaxhp;
			this.add('-heal', pokemon, pokemon.getHealth, '[silent]');
		},
	},

	// Commander needs two conditions so they are implemented here
	// Dondozo
	commanded: {
		name: "Commanded",
		noCopy: true,
		onStart(pokemon) {
			this.boost({atk: 2, spa: 2, spe: 2, def: 2, spd: 2}, pokemon);
		},
		onDragOutPriority: 2,
		onDragOut() {
			return false;
		},
		// Prevents Shed Shell allowing a swap
		onTrapPokemonPriority: -11,
		onTrapPokemon(pokemon) {
			pokemon.trapped = true;
		},
	},
	// Tatsugiri
	commanding: {
		name: "Commanding",
		noCopy: true,
		onDragOutPriority: 2,
		onDragOut() {
			return false;
		},
		// Prevents Shed Shell allowing a swap
		onTrapPokemonPriority: -11,
		onTrapPokemon(pokemon) {
			pokemon.trapped = true;
		},
		// Override No Guard
		onInvulnerabilityPriority: 2,
		onInvulnerability(target, source, move) {
			return false;
		},
		onBeforeTurn(pokemon) {
			this.queue.cancelAction(pokemon);
		},
	},

	// Arceus and Silvally's actual typing is implemented here.
	// Their true typing for all their formes is Normal, and it's only
	// Multitype and RKS System, respectively, that changes their type,
	// but their formes are specified to be their corresponding type
	// in the Pokedex, so that needs to be overridden.
	// This is mainly relevant for Hackmons Cup and Balanced Hackmons.
	arceus: {
		name: 'Arceus',
		onTypePriority: 1,
		onType(types, pokemon) {
			if (pokemon.transformed || pokemon.ability !== 'multitype' && this.gen >= 8) return types;
			let type: string | undefined = 'Normal';
			if (pokemon.ability === 'multitype') {
				type = pokemon.getItem().onPlate;
				if (!type) {
					type = 'Normal';
				}
			}
			return [type];
		},
	},
	silvally: {
		name: 'Silvally',
		onTypePriority: 1,
		onType(types, pokemon) {
			if (pokemon.transformed || pokemon.ability !== 'rkssystem' && this.gen >= 8) return types;
			let type: string | undefined = 'Normal';
			if (pokemon.ability === 'rkssystem') {
				type = pokemon.getItem().onMemory;
				if (!type) {
					type = 'Normal';
				}
			}
			return [type];
		},
	},
	rolloutstorage: {
		name: 'rolloutstorage',
		duration: 2,
		onBasePower(relayVar, source, target, move) {
			let bp = Math.max(1, move.basePower);
			bp *= Math.pow(2, source.volatiles['rolloutstorage'].contactHitCount);
			if (source.volatiles['defensecurl']) {
				bp *= 2;
			}
			source.removeVolatile('rolloutstorage');
			return bp;
		},
	},
};
*/
		num: 99,
		gen: 3,
		isNonstandard: "Past",
		rating: 0,
	},
	roseincense: {
		name: "Rose Incense",
		spritenum: 419,
		fling: {
			basePower: 10,
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Grass') {
				return this.chainModify([4915, 4096]);
			}
		},
		num: 318,
		gen: 4,
		isNonstandard: "Past",
	},
	roseliberry: {
		name: "Roseli Berry",
		spritenum: 603,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Fairy",
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Fairy' && target.getMoveHitData(move).typeMod > 0) {
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
		num: 686,
		gen: 6,
	},
	rowapberry: {
		name: "Rowap Berry",
		spritenum: 420,
		isBerry: true,
		naturalGift: {
			basePower: 100,
			type: "Dark",
		},
		onDamagingHit(damage, target, source, move) {
			if (move.category === 'Special' && source.hp && source.isActive && !source.hasAbility('magicguard')) {
				this.damage(source.baseMaxhp / (target.hasAbility('ripen') ? 4 : 8), source, target);
			}
		},
		onEat() { },
		shortDesc: "If holder is hit by a special move, attacker loses 1/8 of its max HP.",
		num: 212,
		gen: 4,
		rating: 1,
	},
	rustedshield: {
		name: "Rusted Shield",
		spritenum: 699,
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 889) || pokemon.baseSpecies.num === 889) {
				return false;
			}
			return true;
		},
		itemUser: ["Zamazenta-Crowned"],
		num: 1104,
		gen: 8,
	},
	rustedsword: {
		name: "Rusted Sword",
		spritenum: 698,
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 888) || pokemon.baseSpecies.num === 888) {
				return false;
			}
			return true;
		},
		itemUser: ["Zacian-Crowned"],
		num: 1103,
		gen: 8,
	},
	sablenite: {
		name: "Sablenite",
		spritenum: 614,
		megaStone: "Sableye-Mega",
		megaEvolves: "Sableye",
		itemUser: ["Sableye"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 754,
		gen: 6,
		isNonstandard: "Past",
	},
	sachet: {
		name: "Sachet",
		spritenum: 691,
		fling: {
			basePower: 80,
		},
		num: 647,
		gen: 6,
		isNonstandard: "Past",
		rating: 0,
	},
	safariball: {
		name: "Safari Ball",
		spritenum: 425,
		num: 5,
		gen: 1,
		isPokeball: true,
		isNonstandard: "Unobtainable",
	},
/*
export const Conditions: {[k: string]: ConditionData} = {
	brn: {
		name: 'brn',
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.id === 'flameorb') {
				this.add('-status', target, 'brn', '[from] item: Flame Orb');
			} else if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'brn', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'brn');
			}
		},
		// Damage reduction is handled directly in the sim/battle.js damage function
		onResidualOrder: 10,
		onResidual(pokemon) {
			this.damage(pokemon.baseMaxhp / 16);
		},
	},
	par: {
		name: 'par',
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'par', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'par');
			}
		},
		onModifySpe(spe, pokemon) {
			// Paralysis occurs after all other Speed modifiers, so evaluate all modifiers up to this point first
			spe = this.finalModify(spe);
			if (!pokemon.hasAbility('quickfeet')) {
				spe = Math.floor(spe * 50 / 100);
			}
			return spe;
		},
		onBeforeMovePriority: 1,
		onBeforeMove(pokemon) {
			if (this.randomChance(1, 4)) {
				this.add('cant', pokemon, 'par');
				return false;
			}
		},
	},
	slp: {
		name: 'slp',
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'slp', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else if (sourceEffect && sourceEffect.effectType === 'Move') {
				this.add('-status', target, 'slp', '[from] move: ' + sourceEffect.name);
			} else {
				this.add('-status', target, 'slp');
			}
			// 1-3 turns
			this.effectState.startTime = this.random(2, 5);
			this.effectState.time = this.effectState.startTime;

			if (target.removeVolatile('nightmare')) {
				this.add('-end', target, 'Nightmare', '[silent]');
			}
		},
		onBeforeMovePriority: 10,
		onBeforeMove(pokemon, target, move) {
			if (pokemon.hasAbility('earlybird')) {
				pokemon.statusState.time--;
			}
			pokemon.statusState.time--;
			if (pokemon.statusState.time <= 0) {
				pokemon.cureStatus();
				return;
			}
			this.add('cant', pokemon, 'slp');
			if (move.sleepUsable) {
				return;
			}
			return false;
		},
	},
	frz: {
		name: 'frz',
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'frz', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'frz');
			}
			if (target.species.name === 'Shaymin-Sky' && target.baseSpecies.baseSpecies === 'Shaymin') {
				target.formeChange('Shaymin', this.effect, true);
			}
		},
		onBeforeMovePriority: 10,
		onBeforeMove(pokemon, target, move) {
			if (move.flags['defrost']) return;
			if (this.randomChance(1, 5)) {
				pokemon.cureStatus();
				return;
			}
			this.add('cant', pokemon, 'frz');
			return false;
		},
		onModifyMove(move, pokemon) {
			if (move.flags['defrost']) {
				this.add('-curestatus', pokemon, 'frz', '[from] move: ' + move);
				pokemon.clearStatus();
			}
		},
		onAfterMoveSecondary(target, source, move) {
			if (move.thawsTarget) {
				target.cureStatus();
			}
		},
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Fire' && move.category !== 'Status') {
				target.cureStatus();
			}
		},
	},
	psn: {
		name: 'psn',
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'psn', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'psn');
			}
		},
		onResidualOrder: 9,
		onResidual(pokemon) {
			this.damage(pokemon.baseMaxhp / 8);
		},
	},
	tox: {
		name: 'tox',
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			this.effectState.stage = 0;
			if (sourceEffect && sourceEffect.id === 'toxicorb') {
				this.add('-status', target, 'tox', '[from] item: Toxic Orb');
			} else if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'tox', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'tox');
			}
		},
		onSwitchIn() {
			this.effectState.stage = 0;
		},
		onResidualOrder: 9,
		onResidual(pokemon) {
			if (this.effectState.stage < 15) {
				this.effectState.stage++;
			}
			this.damage(this.clampIntRange(pokemon.baseMaxhp / 16, 1) * this.effectState.stage);
		},
	},
	confusion: {
		name: 'confusion',
		// this is a volatile status
		onStart(target, source, sourceEffect) {
			if (sourceEffect?.id === 'lockedmove') {
				this.add('-start', target, 'confusion', '[fatigue]');
			} else if (sourceEffect?.effectType === 'Ability') {
				this.add('-start', target, 'confusion', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-start', target, 'confusion');
			}
			const min = sourceEffect?.id === 'axekick' ? 3 : 2;
			this.effectState.time = this.random(min, 6);
		},
		onEnd(target) {
			this.add('-end', target, 'confusion');
		},
		onBeforeMovePriority: 3,
		onBeforeMove(pokemon) {
			pokemon.volatiles['confusion'].time--;
			if (!pokemon.volatiles['confusion'].time) {
				pokemon.removeVolatile('confusion');
				return;
			}
			this.add('-activate', pokemon, 'confusion');
			if (!this.randomChance(33, 100)) {
				return;
			}
			this.activeTarget = pokemon;
			const damage = this.actions.getConfusionDamage(pokemon, 40);
			if (typeof damage !== 'number') throw new Error("Confusion damage not dealt");
			const activeMove = {id: this.toID('confused'), effectType: 'Move', type: '???'};
			this.damage(damage, pokemon, pokemon, activeMove as ActiveMove);
			return false;
		},
	},
	flinch: {
		name: 'flinch',
		duration: 1,
		onBeforeMovePriority: 8,
		onBeforeMove(pokemon) {
			this.add('cant', pokemon, 'flinch');
			this.runEvent('Flinch', pokemon);
			return false;
		},
	},
	trapped: {
		name: 'trapped',
		noCopy: true,
		onTrapPokemon(pokemon) {
			pokemon.tryTrap();
		},
		onStart(target) {
			this.add('-activate', target, 'trapped');
		},
	},
	trapper: {
		name: 'trapper',
		noCopy: true,
	},
	partiallytrapped: {
		name: 'partiallytrapped',
		duration: 5,
		durationCallback(target, source) {
			if (source?.hasItem('gripclaw')) return 8;
			return this.random(5, 7);
		},
		onStart(pokemon, source) {
			this.add('-activate', pokemon, 'move: ' + this.effectState.sourceEffect, '[of] ' + source);
			this.effectState.boundDivisor = source.hasItem('bindingband') ? 6 : 8;
		},
		onResidualOrder: 13,
		onResidual(pokemon) {
			const source = this.effectState.source;
			// G-Max Centiferno and G-Max Sandblast continue even after the user leaves the field
			const gmaxEffect = ['gmaxcentiferno', 'gmaxsandblast'].includes(this.effectState.sourceEffect.id);
			if (source && (!source.isActive || source.hp <= 0 || !source.activeTurns) && !gmaxEffect) {
				delete pokemon.volatiles['partiallytrapped'];
				this.add('-end', pokemon, this.effectState.sourceEffect, '[partiallytrapped]', '[silent]');
				return;
			}
			this.damage(pokemon.baseMaxhp / this.effectState.boundDivisor);
		},
		onEnd(pokemon) {
			this.add('-end', pokemon, this.effectState.sourceEffect, '[partiallytrapped]');
		},
		onTrapPokemon(pokemon) {
			const gmaxEffect = ['gmaxcentiferno', 'gmaxsandblast'].includes(this.effectState.sourceEffect.id);
			if (this.effectState.source?.isActive || gmaxEffect) pokemon.tryTrap();
		},
	},
	lockedmove: {
		// Outrage, Thrash, Petal Dance...
		name: 'lockedmove',
		duration: 2,
		onResidual(target) {
			if (target.status === 'slp') {
				// don't lock, and bypass confusion for calming
				delete target.volatiles['lockedmove'];
			}
			this.effectState.trueDuration--;
		},
		onStart(target, source, effect) {
			this.effectState.trueDuration = this.random(2, 4);
			this.effectState.move = effect.id;
		},
		onRestart() {
			if (this.effectState.trueDuration >= 2) {
				this.effectState.duration = 2;
			}
		},
		onEnd(target) {
			if (this.effectState.trueDuration > 1) return;
			target.addVolatile('confusion');
		},
		onLockMove(pokemon) {
			if (pokemon.volatiles['dynamax']) return;
			return this.effectState.move;
		},
	},
	twoturnmove: {
		// Skull Bash, SolarBeam, Sky Drop...
		name: 'twoturnmove',
		duration: 2,
		onStart(attacker, defender, effect) {
			// ("attacker" is the Pokemon using the two turn move and the Pokemon this condition is being applied to)
			this.effectState.move = effect.id;
			attacker.addVolatile(effect.id);
			// lastMoveTargetLoc is the location of the originally targeted slot before any redirection
			// note that this is not updated for moves called by other moves
			// i.e. if Dig is called by Metronome, lastMoveTargetLoc will still be the user's location
			let moveTargetLoc: number = attacker.lastMoveTargetLoc!;
			if (effect.sourceEffect && this.dex.moves.get(effect.id).target !== 'self') {
				// this move was called by another move such as Metronome
				// and needs a random target to be determined this turn
				// it will already have one by now if there is any valid target
				// but if there isn't one we need to choose a random slot now
				if (defender.fainted) {
					defender = this.sample(attacker.foes(true));
				}
				moveTargetLoc = attacker.getLocOf(defender);
			}
			attacker.volatiles[effect.id].targetLoc = moveTargetLoc;
			this.attrLastMove('[still]');
			// Run side-effects normally associated with hitting (e.g., Protean, Libero)
			this.runEvent('PrepareHit', attacker, defender, effect);
		},
		onEnd(target) {
			target.removeVolatile(this.effectState.move);
		},
		onLockMove() {
			return this.effectState.move;
		},
		onMoveAborted(pokemon) {
			pokemon.removeVolatile('twoturnmove');
		},
	},
	choicelock: {
		name: 'choicelock',
		noCopy: true,
		onStart(pokemon) {
			if (!this.activeMove) throw new Error("Battle.activeMove is null");
			if (!this.activeMove.id || this.activeMove.hasBounced || this.activeMove.sourceEffect === 'snatch') return false;
			this.effectState.move = this.activeMove.id;
		},
		onBeforeMove(pokemon, target, move) {
			if (!pokemon.getItem().isChoice) {
				pokemon.removeVolatile('choicelock');
				return;
			}
			if (
				!pokemon.ignoringItem() && !pokemon.volatiles['dynamax'] &&
				move.id !== this.effectState.move && move.id !== 'struggle'
			) {
				// Fails unless the Choice item is being ignored, and no PP is lost
				this.addMove('move', pokemon, move.name);
				this.attrLastMove('[still]');
				this.debug("Disabled by Choice item lock");
				this.add('-fail', pokemon);
				return false;
			}
		},
		onDisableMove(pokemon) {
			if (!pokemon.getItem().isChoice || !pokemon.hasMove(this.effectState.move)) {
				pokemon.removeVolatile('choicelock');
				return;
			}
			if (pokemon.ignoringItem() || pokemon.volatiles['dynamax']) {
				return;
			}
			for (const moveSlot of pokemon.moveSlots) {
				if (moveSlot.id !== this.effectState.move) {
					pokemon.disableMove(moveSlot.id, false, this.effectState.sourceEffect);
				}
			}
		},
	},
	mustrecharge: {
		name: 'mustrecharge',
		duration: 2,
		onBeforeMovePriority: 11,
		onBeforeMove(pokemon) {
			this.add('cant', pokemon, 'recharge');
			pokemon.removeVolatile('mustrecharge');
			pokemon.removeVolatile('truant');
			return null;
		},
		onStart(pokemon) {
			this.add('-mustrecharge', pokemon);
		},
		onLockMove: 'recharge',
	},
	futuremove: {
		// this is a slot condition
		name: 'futuremove',
		duration: 3,
		onResidualOrder: 3,
		onEnd(target) {
			const data = this.effectState;
			// time's up; time to hit! :D
			const move = this.dex.moves.get(data.move);
			if (target.fainted || target === data.source) {
				this.hint(`${move.name} did not hit because the target is ${(target.fainted ? 'fainted' : 'the user')}.`);
				return;
			}

			this.add('-end', target, 'move: ' + move.name);
			target.removeVolatile('Protect');
			target.removeVolatile('Endure');

			if (data.source.hasAbility('infiltrator') && this.gen >= 6) {
				data.moveData.infiltrates = true;
			}
			if (data.source.hasAbility('normalize') && this.gen >= 6) {
				data.moveData.type = 'Normal';
			}
			const hitMove = new this.dex.Move(data.moveData) as ActiveMove;

			this.actions.trySpreadMoveHit([target], data.source, hitMove, true);
			if (data.source.isActive && data.source.hasItem('lifeorb') && this.gen >= 5) {
				this.singleEvent('AfterMoveSecondarySelf', data.source.getItem(), data.source.itemState, data.source, target, data.source.getItem());
			}
			this.activeMove = null;

			this.checkWin();
		},
	},
	healreplacement: {
		// this is a slot condition
		name: 'healreplacement',
		onStart(target, source, sourceEffect) {
			this.effectState.sourceEffect = sourceEffect;
			this.add('-activate', source, 'healreplacement');
		},
		onSwitchInPriority: 1,
		onSwitchIn(target) {
			if (!target.fainted) {
				target.heal(target.maxhp);
				this.add('-heal', target, target.getHealth, '[from] move: ' + this.effectState.sourceEffect, '[zeffect]');
				target.side.removeSlotCondition(target, 'healreplacement');
			}
		},
	},
	stall: {
		// Protect, Detect, Endure counter
		name: 'stall',
		duration: 2,
		counterMax: 729,
		onStart() {
			this.effectState.counter = 3;
		},
		onStallMove(pokemon) {
			// this.effectState.counter should never be undefined here.
			// However, just in case, use 1 if it is undefined.
			const counter = this.effectState.counter || 1;
			this.debug("Success chance: " + Math.round(100 / counter) + "%");
			const success = this.randomChance(1, counter);
			if (!success) delete pokemon.volatiles['stall'];
			return success;
		},
		onRestart() {
			if (this.effectState.counter < (this.effect as Condition).counterMax!) {
				this.effectState.counter *= 3;
			}
			this.effectState.duration = 2;
		},
	},
	gem: {
		name: 'gem',
		duration: 1,
		affectsFainted: true,
		onBasePowerPriority: 14,
		onBasePower(basePower, user, target, move) {
			this.debug('Gem Boost');
			return this.chainModify([5325, 4096]);
		},
	},

	// weather is implemented here since it's so important to the game

	raindance: {
		name: 'RainDance',
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem('damprock')) {
				return 8;
			}
			return 5;
		},
		onWeatherModifyDamage(damage, attacker, defender, move) {
			if (defender.hasItem('utilityumbrella')) return;
			if (move.type === 'Water') {
				this.debug('rain water boost');
				return this.chainModify(1.5);
			}
			if (move.type === 'Fire') {
				this.debug('rain fire suppress');
				return this.chainModify(0.5);
			}
		},
		onFieldStart(field, source, effect) {
			if (effect?.effectType === 'Ability') {
				if (this.gen <= 5) this.effectState.duration = 0;
				this.add('-weather', 'RainDance', '[from] ability: ' + effect.name, '[of] ' + source);
			} else {
				this.add('-weather', 'RainDance');
			}
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-weather', 'RainDance', '[upkeep]');
			this.eachEvent('Weather');
		},
		onFieldEnd() {
			this.add('-weather', 'none');
		},
	},
	primordialsea: {
		name: 'PrimordialSea',
		effectType: 'Weather',
		duration: 0,
		onTryMovePriority: 1,
		onTryMove(attacker, defender, move) {
			if (move.type === 'Fire' && move.category !== 'Status') {
				this.debug('Primordial Sea fire suppress');
				this.add('-fail', attacker, move, '[from] Primordial Sea');
				this.attrLastMove('[still]');
				return null;
			}
		},
		onWeatherModifyDamage(damage, attacker, defender, move) {
			if (defender.hasItem('utilityumbrella')) return;
			if (move.type === 'Water') {
				this.debug('Rain water boost');
				return this.chainModify(1.5);
			}
		},
		onFieldStart(field, source, effect) {
			this.add('-weather', 'PrimordialSea', '[from] ability: ' + effect.name, '[of] ' + source);
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-weather', 'PrimordialSea', '[upkeep]');
			this.eachEvent('Weather');
		},
		onFieldEnd() {
			this.add('-weather', 'none');
		},
	},
	sunnyday: {
		name: 'SunnyDay',
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem('heatrock')) {
				return 8;
			}
			return 5;
		},
		onWeatherModifyDamage(damage, attacker, defender, move) {
			if (move.id === 'hydrosteam' && !attacker.hasItem('utilityumbrella')) {
				this.debug('Sunny Day Hydro Steam boost');
				return this.chainModify(1.5);
			}
			if (defender.hasItem('utilityumbrella')) return;
			if (move.type === 'Fire') {
				this.debug('Sunny Day fire boost');
				return this.chainModify(1.5);
			}
			if (move.type === 'Water') {
				this.debug('Sunny Day water suppress');
				return this.chainModify(0.5);
			}
		},
		onFieldStart(battle, source, effect) {
			if (effect?.effectType === 'Ability') {
				if (this.gen <= 5) this.effectState.duration = 0;
				this.add('-weather', 'SunnyDay', '[from] ability: ' + effect.name, '[of] ' + source);
			} else {
				this.add('-weather', 'SunnyDay');
			}
		},
		onImmunity(type, pokemon) {
			if (pokemon.hasItem('utilityumbrella')) return;
			if (type === 'frz') return false;
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-weather', 'SunnyDay', '[upkeep]');
			this.eachEvent('Weather');
		},
		onFieldEnd() {
			this.add('-weather', 'none');
		},
	},
	desolateland: {
		name: 'DesolateLand',
		effectType: 'Weather',
		duration: 0,
		onTryMovePriority: 1,
		onTryMove(attacker, defender, move) {
			if (move.type === 'Water' && move.category !== 'Status') {
				this.debug('Desolate Land water suppress');
				this.add('-fail', attacker, move, '[from] Desolate Land');
				this.attrLastMove('[still]');
				return null;
			}
		},
		onWeatherModifyDamage(damage, attacker, defender, move) {
			if (defender.hasItem('utilityumbrella')) return;
			if (move.type === 'Fire') {
				this.debug('Sunny Day fire boost');
				return this.chainModify(1.5);
			}
		},
		onFieldStart(field, source, effect) {
			this.add('-weather', 'DesolateLand', '[from] ability: ' + effect.name, '[of] ' + source);
		},
		onImmunity(type, pokemon) {
			if (pokemon.hasItem('utilityumbrella')) return;
			if (type === 'frz') return false;
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-weather', 'DesolateLand', '[upkeep]');
			this.eachEvent('Weather');
		},
		onFieldEnd() {
			this.add('-weather', 'none');
		},
	},
	sandstorm: {
		name: 'Sandstorm',
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem('smoothrock')) {
				return 8;
			}
			return 5;
		},
		// This should be applied directly to the stat before any of the other modifiers are chained
		// So we give it increased priority.
		onModifySpDPriority: 10,
		onModifySpD(spd, pokemon) {
			if (pokemon.hasType('Rock') && this.field.isWeather('sandstorm')) {
				return this.modify(spd, 1.5);
			}
		},
		onFieldStart(field, source, effect) {
			if (effect?.effectType === 'Ability') {
				if (this.gen <= 5) this.effectState.duration = 0;
				this.add('-weather', 'Sandstorm', '[from] ability: ' + effect.name, '[of] ' + source);
			} else {
				this.add('-weather', 'Sandstorm');
			}
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-weather', 'Sandstorm', '[upkeep]');
			if (this.field.isWeather('sandstorm')) this.eachEvent('Weather');
		},
		onWeather(target) {
			this.damage(target.baseMaxhp / 16);
		},
		onFieldEnd() {
			this.add('-weather', 'none');
		},
	},
	hail: {
		name: 'Hail',
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem('icyrock')) {
				return 8;
			}
			return 5;
		},
		onFieldStart(field, source, effect) {
			if (effect?.effectType === 'Ability') {
				if (this.gen <= 5) this.effectState.duration = 0;
				this.add('-weather', 'Hail', '[from] ability: ' + effect.name, '[of] ' + source);
			} else {
				this.add('-weather', 'Hail');
			}
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-weather', 'Hail', '[upkeep]');
			if (this.field.isWeather('hail')) this.eachEvent('Weather');
		},
		onWeather(target) {
			this.damage(target.baseMaxhp / 16);
		},
		onFieldEnd() {
			this.add('-weather', 'none');
		},
	},
	snow: {
		name: 'Snow',
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem('icyrock')) {
				return 8;
			}
			return 5;
		},
		onModifyDefPriority: 10,
		onModifyDef(def, pokemon) {
			if (pokemon.hasType('Ice') && this.field.isWeather('snow')) {
				return this.modify(def, 1.5);
			}
		},
		onFieldStart(field, source, effect) {
			if (effect?.effectType === 'Ability') {
				if (this.gen <= 5) this.effectState.duration = 0;
				this.add('-weather', 'Snow', '[from] ability: ' + effect.name, '[of] ' + source);
			} else {
				this.add('-weather', 'Snow');
			}
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-weather', 'Snow', '[upkeep]');
			if (this.field.isWeather('snow')) this.eachEvent('Weather');
		},
		onFieldEnd() {
			this.add('-weather', 'none');
		},
	},
	deltastream: {
		name: 'DeltaStream',
		effectType: 'Weather',
		duration: 0,
		onEffectivenessPriority: -1,
		onEffectiveness(typeMod, target, type, move) {
			if (move && move.effectType === 'Move' && move.category !== 'Status' && type === 'Flying' && typeMod > 0) {
				this.add('-fieldactivate', 'Delta Stream');
				return 0;
			}
		},
		onFieldStart(field, source, effect) {
			this.add('-weather', 'DeltaStream', '[from] ability: ' + effect.name, '[of] ' + source);
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-weather', 'DeltaStream', '[upkeep]');
			this.eachEvent('Weather');
		},
		onFieldEnd() {
			this.add('-weather', 'none');
		},
	},

	dynamax: {
		name: 'Dynamax',
		noCopy: true,
		onStart(pokemon) {
			this.effectState.turns = 0;
			pokemon.removeVolatile('minimize');
			pokemon.removeVolatile('substitute');
			if (pokemon.volatiles['torment']) {
				delete pokemon.volatiles['torment'];
				this.add('-end', pokemon, 'Torment', '[silent]');
			}
			if (['cramorantgulping', 'cramorantgorging'].includes(pokemon.species.id) && !pokemon.transformed) {
				pokemon.formeChange('cramorant');
			}
			this.add('-start', pokemon, 'Dynamax', pokemon.gigantamax ? 'Gmax' : '');
			if (pokemon.baseSpecies.name === 'Shedinja') return;

			// Changes based on dynamax level, 2 is max (at LVL 10)
			const ratio = 1.5 + (pokemon.dynamaxLevel * 0.05);

			pokemon.maxhp = Math.floor(pokemon.maxhp * ratio);
			pokemon.hp = Math.floor(pokemon.hp * ratio);
			this.add('-heal', pokemon, pokemon.getHealth, '[silent]');
		},
		onTryAddVolatile(status, pokemon) {
			if (status.id === 'flinch') return null;
		},
		onBeforeSwitchOutPriority: -1,
		onBeforeSwitchOut(pokemon) {
			pokemon.removeVolatile('dynamax');
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.id === 'behemothbash' || move.id === 'behemothblade' || move.id === 'dynamaxcannon') {
				return this.chainModify(2);
			}
		},
		onDragOutPriority: 2,
		onDragOut(pokemon) {
			this.add('-block', pokemon, 'Dynamax');
			return null;
		},
		onResidualPriority: -100,
		onResidual() {
			this.effectState.turns++;
		},
		onEnd(pokemon) {
			this.add('-end', pokemon, 'Dynamax');
			if (pokemon.baseSpecies.name === 'Shedinja') return;
			pokemon.hp = pokemon.getUndynamaxedHP();
			pokemon.maxhp = pokemon.baseMaxhp;
			this.add('-heal', pokemon, pokemon.getHealth, '[silent]');
		},
	},

	// Commander needs two conditions so they are implemented here
	// Dondozo
	commanded: {
		name: "Commanded",
		noCopy: true,
		onStart(pokemon) {
			this.boost({atk: 2, spa: 2, spe: 2, def: 2, spd: 2}, pokemon);
		},
		onDragOutPriority: 2,
		onDragOut() {
			return false;
		},
		// Prevents Shed Shell allowing a swap
		onTrapPokemonPriority: -11,
		onTrapPokemon(pokemon) {
			pokemon.trapped = true;
		},
	},
	// Tatsugiri
	commanding: {
		name: "Commanding",
		noCopy: true,
		onDragOutPriority: 2,
		onDragOut() {
			return false;
		},
		// Prevents Shed Shell allowing a swap
		onTrapPokemonPriority: -11,
		onTrapPokemon(pokemon) {
			pokemon.trapped = true;
		},
		// Override No Guard
		onInvulnerabilityPriority: 2,
		onInvulnerability(target, source, move) {
			return false;
		},
		onBeforeTurn(pokemon) {
			this.queue.cancelAction(pokemon);
		},
	},

	// Arceus and Silvally's actual typing is implemented here.
	// Their true typing for all their formes is Normal, and it's only
	// Multitype and RKS System, respectively, that changes their type,
	// but their formes are specified to be their corresponding type
	// in the Pokedex, so that needs to be overridden.
	// This is mainly relevant for Hackmons Cup and Balanced Hackmons.
	arceus: {
		name: 'Arceus',
		onTypePriority: 1,
		onType(types, pokemon) {
			if (pokemon.transformed || pokemon.ability !== 'multitype' && this.gen >= 8) return types;
			let type: string | undefined = 'Normal';
			if (pokemon.ability === 'multitype') {
				type = pokemon.getItem().onPlate;
				if (!type) {
					type = 'Normal';
				}
			}
			return [type];
		},
	},
	silvally: {
		name: 'Silvally',
		onTypePriority: 1,
		onType(types, pokemon) {
			if (pokemon.transformed || pokemon.ability !== 'rkssystem' && this.gen >= 8) return types;
			let type: string | undefined = 'Normal';
			if (pokemon.ability === 'rkssystem') {
				type = pokemon.getItem().onMemory;
				if (!type) {
					type = 'Normal';
				}
			}
			return [type];
		},
	},
	rolloutstorage: {
		name: 'rolloutstorage',
		duration: 2,
		onBasePower(relayVar, source, target, move) {
			let bp = Math.max(1, move.basePower);
			bp *= Math.pow(2, source.volatiles['rolloutstorage'].contactHitCount);
			if (source.volatiles['defensecurl']) {
				bp *= 2;
			}
			source.removeVolatile('rolloutstorage');
			return bp;
		},
	},
};
*/
	safetygoggles: {
		name: "Safety Goggles",
		spritenum: 604,
		fling: {
			basePower: 80,
		},
		onImmunity(type, pokemon) {
			if (type === 'sandstorm' || type === 'hail' || type === 'powder') return false;
		},
		onTryHit(pokemon, source, move) {
			if (move.flags['powder'] && pokemon !== source && this.dex.getImmunity('powder', pokemon)) {
				this.add('-activate', pokemon, 'item: Safety Goggles', move.name);
				return null;
			}
		},
		num: 650,
		gen: 6,
	},
	sailfossil: {
		name: "Sail Fossil",
		spritenum: 695,
		fling: {
			basePower: 100,
		},
		num: 711,
		gen: 6,
		isNonstandard: "Past",
		rating: 0,
	},
	salacberry: {
		name: "Salac Berry",
		spritenum: 426,
		isBerry: true,
		naturalGift: {
			basePower: 100,
			type: "Fighting",
		},
		onUpdate(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 4 || (pokemon.hp <= pokemon.maxhp / 2 &&
					pokemon.hasAbility('gluttony') && pokemon.abilityState.gluttony)) {
				pokemon.eatItem();
			}
		},
		onEat(pokemon) {
			this.boost({spe: 1});
		},
		num: 203,
		gen: 3,
		rating: 3,
	},
	salamencite: {
		name: "Salamencite",
		spritenum: 627,
		megaStone: "Salamence-Mega",
		megaEvolves: "Salamence",
		itemUser: ["Salamence"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 769,
		gen: 6,
		isNonstandard: "Past",
	},
	sceptilite: {
		name: "Sceptilite",
		spritenum: 613,
		megaStone: "Sceptile-Mega",
		megaEvolves: "Sceptile",
		itemUser: ["Sceptile"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 753,
		gen: 6,
		isNonstandard: "Past",
	},
	scizorite: {
		name: "Scizorite",
		spritenum: 605,
		megaStone: "Scizor-Mega",
		megaEvolves: "Scizor",
		itemUser: ["Scizor"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 670,
		gen: 6,
		isNonstandard: "Past",
	},
	scopelens: {
		name: "Scope Lens",
		spritenum: 429,
		fling: {
			basePower: 30,
		},
		onModifyCritRatio(critRatio) {
			return critRatio + 1;
		},
		num: 232,
		gen: 2,
	},
/*
NARRATOR:
(Black screen with text; The sound of buzzing bees can be heard)
According to all known laws
of aviation,
 :
there is no way a bee
should be able to fly.
 :
Its wings are too small to get
its fat little body off the ground.
 :
The bee, of course, flies anyway
 :
because bees don't care
what humans think is impossible.
BARRY BENSON:
(Barry is picking out a shirt)
Yellow, black. Yellow, black.
Yellow, black. Yellow, black.
 :
Ooh, black and yellow!
Let's shake it up a little.
JANET BENSON:
Barry! Breakfast is ready!
BARRY:
Coming!
 :
Hang on a second.
(Barry uses his antenna like a phone)
 :
Hello?
ADAM FLAYMAN:

(Through phone)
- Barry?
BARRY:
- Adam?
ADAM:
- Can you believe this is happening?
BARRY:
- I can't. I'll pick you up.
(Barry flies down the stairs)
 :
MARTIN BENSON:
Looking sharp.
JANET:
Use the stairs. Your father
paid good money for those.
BARRY:
Sorry. I'm excited.
MARTIN:
Here's the graduate.
We're very proud of you, son.
 :
A perfect report card, all B's.
JANET:
Very proud.
(Rubs Barry's hair)
BARRY=
Ma! I got a thing going here.
JANET:
- You got lint on your fuzz.
BARRY:
- Ow! That's me!

JANET:
- Wave to us! We'll be in row 118,000.
- Bye!
(Barry flies out the door)
JANET:
Barry, I told you,
stop flying in the house!
(Barry drives through the hive,and is waved at by Adam who is reading a
newspaper)
BARRY==
- Hey, Adam.
ADAM:
- Hey, Barry.
(Adam gets in Barry's car)
 :
- Is that fuzz gel?
BARRY:
- A little. Special day, graduation.
ADAM:
Never thought I'd make it.
(Barry pulls away from the house and continues driving)
BARRY:
Three days grade school,
three days high school...
ADAM:
Those were awkward.
BARRY:
Three days college. I'm glad I took
a day and hitchhiked around the hive.
ADAM==
You did come back different.
(Barry and Adam pass by Artie, who is jogging)
ARTIE:
- Hi, Barry!

BARRY:
- Artie, growing a mustache? Looks good.
ADAM:
- Hear about Frankie?
BARRY:
- Yeah.
ADAM==
- You going to the funeral?
BARRY:
- No, I'm not going to his funeral.
 :
Everybody knows,
sting someone, you die.
 :
Don't waste it on a squirrel.
Such a hothead.
ADAM:
I guess he could have
just gotten out of the way.
(The car does a barrel roll on the loop-shaped bridge and lands on the
highway)
 :
I love this incorporating
an amusement park into our regular day.
BARRY:
I guess that's why they say we don't need vacations.
(Barry parallel parks the car and together they fly over the graduating
students)
Boy, quite a bit of pomp...
under the circumstances.
(Barry and Adam sit down and put on their hats)
 :
- Well, Adam, today we are men.

ADAM:
- We are!
BARRY=
- Bee-men.
=ADAM=
- Amen!
BARRY AND ADAM:
Hallelujah!
(Barry and Adam both have a happy spasm)
ANNOUNCER:
Students, faculty, distinguished bees,
 :
please welcome Dean Buzzwell.
DEAN BUZZWELL:
Welcome, New Hive Oity
graduating class of...
 :
...9:
 :
That concludes our ceremonies.
 :
And begins your career
at Honex Industries!
ADAM:
Will we pick our job today?
(Adam and Barry get into a tour bus)
BARRY=
I heard it's just orientation.
(Tour buses rise out of the ground and the students are automatically
loaded into the buses)
TOUR GUIDE:
Heads up! Here we go.

ANNOUNCER:
Keep your hands and antennas
inside the tram at all times.
BARRY:
- Wonder what it'll be like?
ADAM:
- A little scary.
TOUR GUIDE==
Welcome to Honex,
a division of Honesco
 :
and a part of the Hexagon Group.
Barry:
This is it!
BARRY AND ADAM:
Wow.
BARRY:
Wow.
(The bus drives down a road an on either side are the Bee's massive
complicated Honey-making machines)
TOUR GUIDE:
We know that you, as a bee,
have worked your whole life
 :
to get to the point where you
can work for your whole life.
 :
Honey begins when our valiant Pollen
Jocks bring the nectar to the hive.
 :
Our top-secret formula
 :
is automatically color-corrected,

scent-adjusted and bubble-contoured
 :
into this soothing sweet syrup
 :
with its distinctive
golden glow you know as...
EVERYONE ON BUS:
Honey!
(The guide has been collecting honey into a bottle and she throws it into
the crowd on the bus and it is caught by a girl in the back)
ADAM:
- That girl was hot.
BARRY:
- She's my cousin!
ADAM==
- She is?
BARRY:
- Yes, we're all cousins.
ADAM:
- Right. You're right.
TOUR GUIDE:
- At Honex, we constantly strive
 :
to improve every aspect
of bee existence.
 :
These bees are stress-testing
a new helmet technology.
(The bus passes by a Bee wearing a helmet who is being smashed into the
ground with fly-swatters, newspapers and boots. He lifts a thumbs up but
you can hear him groan)
 :
ADAM==

- What do you think he makes?
BARRY:
- Not enough.
TOUR GUIDE:
Here we have our latest advancement,
the Krelman.
(They pass by a turning wheel with Bees standing on pegs, who are each
wearing a finger-shaped hat)
Barry:
- Wow, What does that do?
TOUR GUIDE:
- Catches that little strand of honey
 :
that hangs after you pour it.
Saves us millions.
ADAM:
(Intrigued)
Can anyone work on the Krelman?
TOUR GUIDE:
Of course. Most bee jobs are
small ones.
But bees know that every small job,
if it's done well, means a lot.
 :
But choose carefully
 :
because you'll stay in the job
you pick for the rest of your life.
(Everyone claps except for Barry)
BARRY:
The same job the rest of your life?
I didn't know that.
ADAM:

What's the difference?
TOUR GUIDE:
You'll be happy to know that bees,
as a species, haven't had one day off
 :
in 27 million years.
BARRY:
(Upset)
So you'll just work us to death?
 :
We'll sure try.
(Everyone on the bus laughs except Barry. Barry and Adam are walking back
home together)
ADAM:
Wow! That blew my mind!
BARRY:
"What's the difference?"
How can you say that?
 :
One job forever?
That's an insane choice to have to make.
ADAM:
I'm relieved. Now we only have
to make one decision in life.
BARRY:
But, Adam, how could they
never have told us that?
ADAM:
Why would you question anything?
We're bees.
 :
We're the most perfectly
functioning society on Earth.

BARRY:
You ever think maybe things
work a little too well here?
ADAM:
Like what? Give me one example.
(Barry and Adam stop walking and it is revealed to the audience that
hundreds of cars are speeding by and narrowly missing them in perfect
unison)
BARRY:
I don't know. But you know
what I'm talking about.
ANNOUNCER:
Please clear the gate.
Royal Nectar Force on approach.
BARRY:
Wait a second. Check it out.
(The Pollen jocks fly in, circle around and landing in line)
 :
- Hey, those are Pollen Jocks!
ADAM:
- Wow.
 :
I've never seen them this close.
BARRY:
They know what it's like
outside the hive.
ADAM:
Yeah, but some don't come back.
GIRL BEES:
- Hey, Jocks!
- Hi, Jocks!
(The Pollen Jocks hook up their backpacks to machines that pump the nectar
to trucks, which drive away)

LOU LO DUVA:
You guys did great!
 :
You're monsters!
You're sky freaks!
I love it!
(Punching the Pollen Jocks in joy)
I love it!
ADAM:
- I wonder where they were.
BARRY:
- I don't know.
 :
Their day's not planned.
 :
Outside the hive, flying who knows
where, doing who knows what.
 :
You can't just decide to be a Pollen
Jock. You have to be bred for that.
ADAM==
Right.
(Barry and Adam are covered in some pollen that floated off of the Pollen
Jocks)
BARRY:
Look at that. That's more pollen
than you and I will see in a lifetime.
ADAM:
It's just a status symbol.
Bees make too much of it.
BARRY:
Perhaps. Unless you're wearing it
and the ladies see you wearing it.
(Barry waves at 2 girls standing a little away from them)

ADAM==
Those ladies?
Aren't they our cousins too?
BARRY:
Distant. Distant.
POLLEN JOCK #1:
Look at these two.
POLLEN JOCK #2:
- Couple of Hive Harrys.
POLLEN JOCK #1:
- Let's have fun with them.
GIRL BEE #1:
It must be dangerous
being a Pollen Jock.
BARRY:
Yeah. Once a bear pinned me
against a mushroom!
 :
He had a paw on my throat,
and with the other, he was slapping me!
(Slaps Adam with his hand to represent his scenario)
GIRL BEE #2:
- Oh, my!
BARRY:
- I never thought I'd knock him out.
GIRL BEE #1:
(Looking at Adam)
What were you doing during this?
ADAM:
Obviously I was trying to alert the authorities.
BARRY:
I can autograph that.

(The pollen jocks walk up to Barry and Adam, they pretend that Barry and
Adam really are pollen jocks.)
POLLEN JOCK #1:
A little gusty out there today,
wasn't it, comrades?
BARRY:
Yeah. Gusty.
POLLEN JOCK #1:
We're hitting a sunflower patch
six miles from here tomorrow.
BARRY:
- Six miles, huh?
ADAM:
- Barry!
POLLEN JOCK #2:
A puddle jump for us,
but maybe you're not up for it.
BARRY:
- Maybe I am.
ADAM:
- You are not!
POLLEN JOCK #1:
We're going 0900 at J-Gate.
 :
What do you think, buzzy-boy?
Are you bee enough?
BARRY:
I might be. It all depends
on what 0900 means.
(The scene cuts to Barry looking out on the hive-city from his balcony at
night)
MARTIN:

Hey, Honex!
BARRY:
Dad, you surprised me.
MARTIN:
You decide what you're interested in?
BARRY:
- Well, there's a lot of choices.
- But you only get one.
 :
Do you ever get bored
doing the same job every day?
MARTIN:
Son, let me tell you about stirring.
 :
You grab that stick, and you just
move it around, and you stir it around.
 :
You get yourself into a rhythm.
It's a beautiful thing.
BARRY:
You know, Dad,
the more I think about it,
 :
maybe the honey field
just isn't right for me.
MARTIN:
You were thinking of what,
making balloon animals?
 :
That's a bad job
for a guy with a stinger.
 :

Janet, your son's not sure
he wants to go into honey!
JANET:
- Barry, you are so funny sometimes.
BARRY:
- I'm not trying to be funny.
MARTIN:
You're not funny! You're going
into honey. Our son, the stirrer!
JANET:
- You're gonna be a stirrer?
BARRY:
- No one's listening to me!
MARTIN:
Wait till you see the sticks I have.
BARRY:
I could say anything right now.
I'm gonna get an ant tattoo!
(Barry's parents don't listen to him and continue to ramble on)
MARTIN:
Let's open some honey and celebrate!
BARRY:
Maybe I'll pierce my thorax.
Shave my antennae.
 :
Shack up with a grasshopper. Get
a gold tooth and call everybody "dawg"!
JANET:
I'm so proud.
(The scene cuts to Barry and Adam waiting in line to get a job)
ADAM:
- We're starting work today!

BARRY:
- Today's the day.
ADAM:
Come on! All the good jobs
will be gone.
BARRY:
Yeah, right.
JOB LISTER:
Pollen counting, stunt bee, pouring,
stirrer, front desk, hair removal...
BEE IN FRONT OF LINE:
- Is it still available?
JOB LISTER:
- Hang on. Two left!
 :
One of them's yours! Congratulations!
Step to the side.
ADAM:
- What'd you get?
BEE IN FRONT OF LINE:
- Picking crud out. Stellar!
(He walks away)
ADAM:
Wow!
JOB LISTER:
Couple of newbies?
ADAM:
Yes, sir! Our first day! We are ready!
JOB LISTER:
Make your choice.
(Adam and Barry look up at the job board. There are hundreds of constantly
changing panels that contain available or unavailable jobs. It looks very
confusing)

ADAM:
- You want to go first?
BARRY:
- No, you go.
ADAM:
Oh, my. What's available?
JOB LISTER:
Restroom attendant's open,
not for the reason you think.
ADAM:
- Any chance of getting the Krelman?
JOB LISTER:
- Sure, you're on.
(Puts the Krelman finger-hat on Adam's head)
(Suddenly the sign for Krelman closes out)
 :
I'm sorry, the Krelman just closed out.
(Takes Adam's hat off)
Wax monkey's always open.
ADAM:
The Krelman opened up again.
 :
What happened?
JOB LISTER:
A bee died. Makes an opening. See?
He's dead. Another dead one.
 :
Deady. Deadified. Two more dead.
 :
Dead from the neck up.
Dead from the neck down. That's life!

ADAM:
Oh, this is so hard!
(Barry remembers what the Pollen Jock offered him and he flies off)
Heating, cooling,
stunt bee, pourer, stirrer,
 :
humming, inspector number seven,
lint coordinator, stripe supervisor,
 :
mite wrangler. Barry, what
do you think I should... Barry?
(Adam turns around and sees Barry flying away)
 :
Barry!
POLLEN JOCK:
All right, we've got the sunflower patch
in quadrant nine...
ADAM:
(Through phone)
What happened to you?
Where are you?
BARRY:
- I'm going out.
ADAM:
- Out? Out where?
BARRY:
- Out there.
ADAM:
- Oh, no!
BARRY:
I have to, before I go
to work for the rest of my life.
ADAM:

You're gonna die! You're crazy!
(Barry hangs up)
Hello?
POLLEN JOCK #2:
Another call coming in.
 :
If anyone's feeling brave,
there's a Korean deli on 83rd
 :
that gets their roses today.
BARRY:
Hey, guys.
POLLEN JOCK #1 ==
- Look at that.
POLLEN JOCK #2:
- Isn't that the kid we saw yesterday?
LOU LO DUVA:
Hold it, son, flight deck's restricted.
POLLEN JOCK #1:
It's OK, Lou. We're gonna take him up.
(Puts hand on Barry's shoulder)
LOU LO DUVA:
(To Barry) Really? Feeling lucky, are you?
BEE WITH CLIPBOARD:
(To Barry) Sign here, here. Just initial that.
 :
- Thank you.
LOU LO DUVA:
- OK.
 :
You got a rain advisory today,
 :

and as you all know,
bees cannot fly in rain.
 :
So be careful. As always,
watch your brooms,
 :
hockey sticks, dogs,
birds, bears and bats.
 :
Also, I got a couple of reports
of root beer being poured on us.
 :
Murphy's in a home because of it,
babbling like a cicada!
BARRY:
- That's awful.
LOU LO DUVA:
(Still talking through megaphone)
- And a reminder for you rookies,
 :
bee law number one,
absolutely no talking to humans!
 :
All right, launch positions!
POLLEN JOCKS:
(The Pollen Jocks run into formation)
 :
Buzz, buzz, buzz, buzz! Buzz, buzz,
buzz, buzz! Buzz, buzz, buzz, buzz!
LOU LU DUVA:
Black and yellow!
POLLEN JOCKS:

Hello!
POLLEN JOCK #1:
(To Barry)You ready for this, hot shot?
BARRY:
Yeah. Yeah, bring it on.
POLLEN JOCK's:
Wind, check.
 :
- Antennae, check.
- Nectar pack, check.
 :
- Wings, check.
- Stinger, check.
BARRY:
Scared out of my shorts, check.
LOU LO DUVA:
OK, ladies,
 :
let's move it out!
 :
Pound those petunias,
you striped stem-suckers!
 :
All of you, drain those flowers!
(The pollen jocks fly out of the hive)
BARRY:
Wow! I'm out!
 :
I can't believe I'm out!
 :
So blue.

 :
I feel so fast and free!
 :
Box kite!
(Barry flies through the kite)
 :
Wow!
 :
Flowers!
(A pollen jock puts on some high tech goggles that shows flowers similar to
heat sink goggles.)
POLLEN JOCK:
This is Blue Leader.
We have roses visual.
 :
Bring it around 30 degrees and hold.
 :
Roses!
POLLEN JOCK #1:
30 degrees, roger. Bringing it around.
 :
Stand to the side, kid.
It's got a bit of a kick.
(The pollen jock fires a high-tech gun at the flower, shooting tubes that
suck up the nectar from the flower and collects it into a pouch on the gun)
BARRY:
That is one nectar collector!
POLLEN JOCK #1==
- Ever see pollination up close?
BARRY:
- No, sir.
POLLEN JOCK #1:

(Barry and the Pollen jock fly over the field, the pollen jock sprinkles
pollen as he goes)
 :
I pick up some pollen here, sprinkle it
over here. Maybe a dash over there,
 :
a pinch on that one.
See that? It's a little bit of magic.
BARRY:
That's amazing. Why do we do that?
POLLEN JOCK #1:
That's pollen power. More pollen, more
flowers, more nectar, more honey for us.
BARRY:
Cool.
POLLEN JOCK #1:
I'm picking up a lot of bright yellow.
could be daisies. Don't we need those?
POLLEN JOCK #2:
Copy that visual.
 :
Wait. One of these flowers
seems to be on the move.
POLLEN JOCK #1:
Say again? You're reporting
a moving flower?
POLLEN JOCK #2:
Affirmative.
(The Pollen jocks land near the "flowers" which, to the audience are
obviously just tennis balls)
KEN:
(In the distance) That was on the line!

POLLEN JOCK #1:
This is the coolest. What is it?
POLLEN JOCK #2:
I don't know, but I'm loving this color.
 :
It smells good.
Not like a flower, but I like it.
POLLEN JOCK #1:
Yeah, fuzzy.
(Sticks his hand on the ball but it gets stuck)
POLLEN JOCK #3==
Chemical-y.
(The pollen jock finally gets his hand free from the tennis ball)
POLLEN JOCK #1:
Careful, guys. It's a little grabby.
(The pollen jocks turn around and see Barry lying his entire body on top of
one of the tennis balls)
POLLEN JOCK #2:
My sweet lord of bees!
POLLEN JOCK #3:
Candy-brain, get off there!
POLLEN JOCK #1:
(Pointing upwards)
Problem!
(A human hand reaches down and grabs the tennis ball that Barry is stuck
to)
BARRY:
- Guys!
POLLEN JOCK #2:
- This could be bad.
POLLEN JOCK #3:
Affirmative.
(Vanessa Bloome starts bouncing the tennis ball, not knowing Barry is stick
to it)

BARRY==
Very close.
 :
Gonna hurt.
 :
Mama's little boy.
(Barry is being hit back and forth by two humans playing tennis. He is
still stuck to the ball)
POLLEN JOCK #1:
You are way out of position, rookie!
KEN:
Coming in at you like a MISSILE!
(Barry flies past the pollen jocks, still stuck to the ball)
BARRY:
(In slow motion)
Help me!
POLLEN JOCK #2:
I don't think these are flowers.
POLLEN JOCK #3:
- Should we tell him?
POLLEN JOCK #1:
- I think he knows.
BARRY:
What is this?!
KEN:
Match point!
 :
You can start packing up, honey,
because you're about to EAT IT!
(A pollen jock coughs which confused Ken and he hits the ball the wrong way
with Barry stuck to it and it goes flying into the city)
BARRY:

Yowser!
(Barry bounces around town and gets stuck in the engine of a car. He flies
into the air conditioner and sees a bug that was frozen in there)
BARRY:
Ew, gross.
(The man driving the car turns on the air conditioner which blows Barry
into the car)
GIRL IN CAR:
There's a bee in the car!
 :
- Do something!
DAD DRIVING CAR:
- I'm driving!
BABY GIRL:
(Waving at Barry)
- Hi, bee.
(Barry smiles and waves at the baby girl)
GUY IN BACK OF CAR:
- He's back here!
 :
He's going to sting me!
GIRL IN CAR:
Nobody move. If you don't move,
he won't sting you. Freeze!
(Barry freezes as well, hovering in the middle of the car)
 :
GRANDMA IN CAR==
He blinked!
(The grandma whips out some bee-spray and sprays everywhere in the car,
climbing into the front seat, still trying to spray Barry)
GIRL IN CAR:
Spray him, Granny!
DAD DRIVING THE CAR:
What are you doing?!
(Barry escapes the car through the air conditioner and is flying high above

the ground, safe.)
BARRY:
Wow... the tension level
out here is unbelievable.
(Barry sees that storm clouds are gathering and he can see rain clouds
moving into this direction)
 :
I gotta get home.
 :
Can't fly in rain.
 :
Can't fly in rain.
(A rain drop hits Barry and one of his wings is damaged)
 :
Can't fly in rain.
(A second rain drop hits Barry again and he spirals downwards)
Mayday! Mayday! Bee going down!
(WW2 plane sound effects are played as he plummets, and he crash-lands on a
plant inside an apartment near the window)
VANESSA BLOOME:
Ken, could you close
the window please?
KEN==
Hey, check out my new resume.
I made it into a fold-out brochure.
 :
You see?
(Folds brochure resume out)
Folds out.
(Ken closes the window, trapping Barry inside)
BARRY:
Oh, no. More humans. I don't need this.
(Barry tries to fly away but smashes into the window and falls again)
 :
What was that?

(Barry keeps trying to fly out the window but he keeps being knocked back
because the window is closed)
Maybe this time. This time. This time.
This time! This time! This...
 :
Drapes!
(Barry taps the glass. He doesn't understand what it is)
That is diabolical.
KEN:
It's fantastic. It's got all my special
skills, even my top-ten favorite movies.
ANDY:
What's number one? Star Wars?
KEN:
Nah, I don't go for that...
(Ken makes finger guns and makes "pew pew pew" sounds and then stops)
 :
...kind of stuff.
BARRY:
No wonder we shouldn't talk to them.
They're out of their minds.
KEN:
When I leave a job interview, they're
flabbergasted, can't believe what I say.
BARRY:
(Looking at the light on the ceiling)
There's the sun. Maybe that's a way out.
(Starts flying towards the lightbulb)
 :
I don't remember the sun
having a big 75 on it.
(Barry hits the lightbulb and falls into the dip on the table that the
humans are sitting at)
KEN:

I predicted global warming.
 :
I could feel it getting hotter.
At first I thought it was just me.
(Andy dips a chip into the bowl and scoops up some dip with Barry on it and
is about to put it in his mouth)
 :
Wait! Stop! Bee!
(Andy drops the chip with Barry in fear and backs away. All the humans
freak out)
 :
Stand back. These are winter boots.
(Ken has winter boots on his hands and he is about to smash the bee but
Vanessa saves him last second)
VANESSA:
Wait!
 :
Don't kill him!
(Vanessa puts Barry in a glass to protect him)
KEN:
You know I'm allergic to them!
This thing could kill me!
VANESSA:
Why does his life have
less value than yours?
KEN:
Why does his life have any less value
than mine? Is that your statement?
VANESSA:
I'm just saying all life has value. You
don't know what he's capable of feeling.
(Vanessa picks up Ken's brochure and puts it under the glass so she can
carry Barry back to the window. Barry looks at Vanessa in amazement)
KEN:

My brochure!
VANESSA:
There you go, little guy.
(Vanessa opens the window and lets Barry out but Barry stays back and is
still shocked that a human saved his life)
KEN:
I'm not scared of him.
It's an allergic thing.
VANESSA:
Put that on your resume brochure.
KEN:
My whole face could puff up.
ANDY:
Make it one of your special skills.
KEN:
Knocking someone out
is also a special skill.
(Ken walks to the door)
Right. Bye, Vanessa. Thanks.
 :
- Vanessa, next week? Yogurt night?
VANESSA:
- Sure, Ken. You know, whatever.
 :
(Vanessa tries to close door)
KEN==
- You could put carob chips on there.
VANESSA:
- Bye.
(Closes door but Ken opens it again)
KEN:
- Supposed to be less calories.

VANESSA:
- Bye.
(Closes door)
(Fast forward to the next day, Barry is still inside the house. He flies
into the kitchen where Vanessa is doing dishes)
BARRY==
(Talking to himself)
I gotta say something.
 :
She saved my life.
I gotta say something.
 :
All right, here it goes.
(Turns back)
Nah.
 :
What would I say?
 :
I could really get in trouble.
 :
It's a bee law.
You're not supposed to talk to a human.
 :
I can't believe I'm doing this.
 :
I've got to.
(Barry disguises himself as a character on a food can as Vanessa walks by
again)
 :
Oh, I can't do it. Come on!
 :
No. Yes. No.
 :
Do it. I can't.

 :
How should I start it?
(Barry strikes a pose and wiggles his eyebrows)
"You like jazz?"
No, that's no good.
(Vanessa is about to walk past Barry)
Here she comes! Speak, you fool!
 :
...Hi!
(Vanessa gasps and drops the dishes in fright and notices Barry on the
counter)
 :
I'm sorry.
VANESSA:
- You're talking.
BARRY:
- Yes, I know.
VANESSA:
(Pointing at Barry)
You're talking!
BARRY:
I'm so sorry.
VANESSA:
No, it's OK. It's fine.
I know I'm dreaming.
 :
But I don't recall going to bed.
BARRY:
Well, I'm sure this
is very disconcerting.
VANESSA:
This is a bit of a surprise to me.
I mean, you're a bee!

BARRY:
I am. And I'm not supposed
to be doing this,
(Pointing to the living room where Ken tried to kill him last night)
but they were all trying to kill me.
 :
And if it wasn't for you...
 :
I had to thank you.
It's just how I was raised.
(Vanessa stabs her hand with a fork to test whether she's dreaming or not)
 :
That was a little weird.
VANESSA:
- I'm talking with a bee.
BARRY:
- Yeah.
VANESSA:
I'm talking to a bee.
And the bee is talking to me!
BARRY:
I just want to say I'm grateful.
I'll leave now.
(Barry turns to leave)
VANESSA:
- Wait! How did you learn to do that?
BARRY:
(Flying back)
- What?
VANESSA:
The talking...thing.
BARRY:

Same way you did, I guess.
"Mama, Dada, honey." You pick it up.
VANESSA:
- That's very funny.
BARRY:
- Yeah.
 :
Bees are funny. If we didn't laugh,
we'd cry with what we have to deal with.
 :
Anyway...
VANESSA:
Can I...
 :
...get you something?
BARRY:
- Like what?
VANESSA:
I don't know. I mean...
I don't know. Coffee?
BARRY:
I don't want to put you out.
VANESSA:
It's no trouble. It takes two minutes.
 :
- It's just coffee.
BARRY:
- I hate to impose.
(Vanessa starts making coffee)
VANESSA:
- Don't be ridiculous!

BARRY:
- Actually, I would love a cup.
VANESSA:
Hey, you want rum cake?
BARRY:
- I shouldn't.
VANESSA:
- Have some.
BARRY:
- No, I can't.
VANESSA:
- Come on!
BARRY:
I'm trying to lose a couple micrograms.
VANESSA:
- Where?
BARRY:
- These stripes don't help.
VANESSA:
You look great!
BARRY:
I don't know if you know
anything about fashion.
 :
Are you all right?
VANESSA:
(Pouring coffee on the floor and missing the cup completely)
No.
(Flash forward in time. Barry and Vanessa are sitting together at a table
on top of the apartment building drinking coffee)

 :
BARRY==
He's making the tie in the cab
as they're flying up Madison.
 :
He finally gets there.
 :
He runs up the steps into the church.
The wedding is on.
 :
And he says, "Watermelon?
I thought you said Guatemalan.
 :
Why would I marry a watermelon?"
(Barry laughs but Vanessa looks confused)
VANESSA:
Is that a bee joke?
BARRY:
That's the kind of stuff we do.
VANESSA:
Yeah, different.
 :
So, what are you gonna do, Barry?
(Barry stands on top of a sugar cube floating in his coffee and paddles it
around with a straw like it's a gondola)
BARRY:
About work? I don't know.
 :
I want to do my part for the hive,
but I can't do it the way they want.
VANESSA:
I know how you feel.

BARRY:
- You do?
VANESSA:
- Sure.
 :
My parents wanted me to be a lawyer or
a doctor, but I wanted to be a florist.
BARRY:
- Really?
VANESSA:
- My only interest is flowers.
BARRY:
Our new queen was just elected
with that same campaign slogan.
 :
Anyway, if you look...
(Barry points to a tree in the middle of Central Park)
 :
There's my hive right there. See it?
VANESSA:
You're in Sheep Meadow!
BARRY:
Yes! I'm right off the Turtle Pond!
VANESSA:
No way! I know that area.
I lost a toe ring there once.
BARRY:
- Why do girls put rings on their toes?
VANESSA:
- Why not?
BARRY:

- It's like putting a hat on your knee.
VANESSA:
- Maybe I'll try that.
(A custodian installing a lightbulb looks over at them but to his
perspective it looks like Vanessa is talking to a cup of coffee on the
table)
CUSTODIAN:
- You all right, ma'am?
VANESSA:
- Oh, yeah. Fine.
 :
Just having two cups of coffee!
BARRY:
Anyway, this has been great.
Thanks for the coffee.
VANESSA==
Yeah, it's no trouble.
BARRY:
Sorry I couldn't finish it. If I did,
I'd be up the rest of my life.
(Barry points towards the rum cake)
 :
Can I take a piece of this with me?
VANESSA:
Sure! Here, have a crumb.
(Vanessa hands Barry a crumb but it is still pretty big for Barry)
BARRY:
- Thanks!
VANESSA:
- Yeah.
BARRY:
All right. Well, then...
I guess I'll see you around.

 :
Or not.
VANESSA:
OK, Barry...
BARRY:
And thank you
so much again... for before.
VANESSA:
Oh, that? That was nothing.
BARRY:
Well, not nothing, but... Anyway...
(Vanessa and Barry hold hands, but Vanessa has to hold out a finger because
her hands is to big and Barry holds that)
(The custodian looks over again and it appears Vanessa is laughing at her
coffee again. The lightbulb that he was screwing in sparks and he falls off
the ladder)
(Fast forward in time and we see two Bee Scientists testing out a parachute
in a Honex wind tunnel)
BEE SCIENTIST #1:
This can't possibly work.
BEE SCIENTIST #2:
He's all set to go.
We may as well try it.
 :
OK, Dave, pull the chute.
(Dave pulls the chute and the wind slams him against the wall and he falls
on his face.The camera pans over and we see Barry and Adam walking
together)
ADAM:
- Sounds amazing.
BARRY:
- It was amazing!
 :
It was the scariest,
happiest moment of my life.

ADAM:
Humans! I can't believe
you were with humans!
 :
Giant, scary humans!
What were they like?
BARRY:
Huge and crazy. They talk crazy.
 :
They eat crazy giant things.
They drive crazy.
ADAM:
- Do they try and kill you, like on TV?
BARRY:
- Some of them. But some of them don't.
ADAM:
- How'd you get back?
BARRY:
- Poodle.
ADAM:
You did it, and I'm glad. You saw
whatever you wanted to see.
 :
You had your "experience." Now you
can pick out your job and be normal.
BARRY:
- Well...
ADAM:
- Well?
BARRY:
Well, I met someone.

ADAM:
You did? Was she Bee-ish?
 :
- A wasp?! Your parents will kill you!
BARRY:
- No, no, no, not a wasp.
ADAM:
- Spider?
BARRY:
- I'm not attracted to spiders.
 :
I know, for everyone else, it's the hottest thing,
with the eight legs and all.
 :
I can't get by that face.
ADAM:
So who is she?
BARRY:
She's... human.
ADAM:
No, no. That's a bee law.
You wouldn't break a bee law.
BARRY:
- Her name's Vanessa.
(Adam puts his head in his hands)
ADAM:
- Oh, boy.
BARRY==
She's so nice. And she's a florist!
ADAM:
Oh, no! You're dating a human florist!

BARRY:
We're not dating.
ADAM:
You're flying outside the hive, talking
to humans that attack our homes
 :
with power washers and M-80s!
That's one-eighth a stick of dynamite!
BARRY:
She saved my life!
And she understands me.
ADAM:
This is over!
BARRY:
Eat this.
(Barry gives Adam a piece of the crumb that he got from Vanessa. Adam eats
it)
ADAM:
(Adam's tone changes)
This is not over! What was that?
BARRY:
- They call it a crumb.
ADAM:
- It was so stingin' stripey!
BARRY:
And that's not what they eat.
That's what falls off what they eat!
 :
- You know what a Cinnabon is?
ADAM:
- No.
(Adam opens a door behind him and he pulls Barry in)

BARRY:
It's bread and cinnamon and frosting.
ADAM:
Be quiet!
BARRY:
They heat it up...
ADAM:
Sit down!
(Adam forces Barry to sit down)
BARRY:
(Still rambling about Cinnabons)
...really hot!
(Adam grabs Barry by the shoulders)
ADAM:
- Listen to me!
 :
We are not them! We're us.
There's us and there's them!
BARRY==
Yes, but who can deny
the heart that is yearning?
ADAM:
There's no yearning.
Stop yearning. Listen to me!
 :
You have got to start thinking bee,
my friend. Thinking bee!
BARRY:
- Thinking bee.
WORKER BEE:
- Thinking bee.
WORKER BEES AND ADAM:
Thinking bee! Thinking bee!

Thinking bee! Thinking bee!
(Flash forward in time; Barry is laying on a raft in a pool full of honey.
He is wearing sunglasses)
JANET:
There he is. He's in the pool.
MARTIN:
You know what your problem is, Barry?
(Barry pulls down his sunglasses and he looks annoyed)
BARRY:
(Sarcastic)
I gotta start thinking bee?
JANET:
How much longer will this go on?
MARTIN:
It's been three days!
Why aren't you working?
(Puts sunglasses back on)
BARRY:
I've got a lot of big life decisions
to think about.
MARTIN:
What life? You have no life!
You have no job. You're barely a bee!
JANET:
Would it kill you
to make a little honey?
(Barry rolls off the raft and sinks into the honey pool)
 :
Barry, come out.
Your father's talking to you.
 :
Martin, would you talk to him?
MARTIN:

Barry, I'm talking to you!
(Barry keeps sinking into the honey until he is suddenly in Central Park
having a picnic with Vanessa)
(Barry has a cup of honey and he clinks his glass with Vanessas. Suddenly a
mosquito lands on Vanessa and she slaps it, killing it. They both gasp but
then burst out laughing)
VANESSA:
You coming?
(The camera pans over and Vanessa is climbing into a small yellow airplane)
BARRY:
Got everything?
VANESSA:
All set!
BARRY:
Go ahead. I'll catch up.
(Vanessa lifts off and flies ahead)
VANESSA:
Don't be too long.
(Barry catches up with Vanessa and he sticks out his arms like ana irplane.
He rolls from side to side, and Vanessa copies him with the airplane)
VANESSA:
Watch this!
(Barry stays back and watches as Vanessa draws a heart in the air using
pink smoke from the plane, but on the last loop-the-loop she suddenly
crashes into a mountain and the plane explodes. The destroyed plane falls
into some rocks and explodes a second time)
BARRY:
Vanessa!
(As Barry is yelling his mouth fills with honey and he wakes up,
discovering that he was just day dreaming. He slowly sinks back into the
honey pool)
MARTIN:
- We're still here.

JANET:
- I told you not to yell at him.
 :
He doesn't respond to yelling!
MARTIN:
- Then why yell at me?
JANET:
- Because you don't listen!
MARTIN:
I'm not listening to this.
BARRY:
Sorry, I've gotta go.
MARTIN:
- Where are you going?
BARRY:
- I'm meeting a friend.
JANET:
A girl? Is this why you can't decide?
BARRY:
Bye.
(Barry flies out the door and Martin shakes his head)
 :
JANET==
I just hope she's Bee-ish.
(Fast forward in time and Barry is sitting on Vanessa's shoulder and she is
closing up her shop)
BARRY:
They have a huge parade
of flowers every year in Pasadena?
VANESSA:
To be in the Tournament of Roses,
that's every florist's dream!

 :
Up on a float, surrounded
by flowers, crowds cheering.
BARRY:
A tournament. Do the roses
compete in athletic events?
VANESSA:
No. All right, I've got one.
How come you don't fly everywhere?
BARRY:
It's exhausting. Why don't you
run everywhere? It's faster.
VANESSA:
Yeah, OK, I see, I see.
All right, your turn.
BARRY:
TiVo. You can just freeze live TV?
That's insane!
VANESSA:
You don't have that?
BARRY:
We have Hivo, but it's a disease.
It's a horrible, horrible disease.
VANESSA:
Oh, my.
(A human walks by and Barry narrowly avoids him)
PASSERBY:
Dumb bees!
VANESSA:
You must want to sting all those jerks.
BARRY:
We try not to sting.

It's usually fatal for us.
VANESSA:
So you have to watch your temper
(They walk into a store)
BARRY:
Very carefully.
You kick a wall, take a walk,
 :
write an angry letter and throw it out.
Work through it like any emotion:
 :
Anger, jealousy, lust.
(Suddenly an employee(Hector) hits Barry off of Vanessa's shoulder. Hector
thinks he's saving Vanessa)
VANESSA:
(To Barry)
Oh, my goodness! Are you OK?
(Barry is getting up off the floor)
BARRY:
Yeah.
VANESSA:
(To Hector)
- What is wrong with you?!
HECTOR:
(Confused)
- It's a bug.
VANESSA:
He's not bothering anybody.
Get out of here, you creep!
(Vanessa hits Hector across the face with the magazine he had and then hits
him in the head. Hector backs away covering his head)
Barry:
What was that? A Pic 'N' Save circular?
(Vanessa sets Barry back on her shoulder)

VANESSA:
Yeah, it was. How did you know?
BARRY:
It felt like about 10 pages.
Seventy-five is pretty much our limit.
VANESSA:
You've really got that
down to a science.
BARRY:
- Oh, we have to. I lost a cousin to Italian Vogue.
VANESSA:
- I'll bet.
(Barry looks to his right and notices there is honey for sale in the aisle)
BARRY:
What in the name
of Mighty Hercules is this?
(Barry looks at all the brands of honey, shocked)
How did this get here?
Cute Bee, Golden Blossom,
 :
Ray Liotta Private Select?
(Barry puts his hands up and slowly turns around, a look of disgust on his
face)
VANESSA:
- Is he that actor?
BARRY:
- I never heard of him.
 :
- Why is this here?
VANESSA:
- For people. We eat it.
BARRY:

You don't have
enough food of your own?!
(Hector looks back and notices that Vanessa is talking to Barry)
VANESSA:
- Well, yes.
BARRY:
- How do you get it?
VANESSA:
- Bees make it.
BARRY:
- I know who makes it!
 :
And it's hard to make it!
 :
There's heating, cooling, stirring.
You need a whole Krelman thing!
VANESSA:
- It's organic.
BARRY:
- It's our-ganic!
VANESSA:
It's just honey, Barry.
BARRY:
Just what?!
 :
Bees don't know about this!
This is stealing! A lot of stealing!
 :
You've taken our homes, schools,
hospitals! This is all we have!
 :

And it's on sale?!
I'm getting to the bottom of this.
 :
I'm getting to the bottom
of all of this!
(Flash forward in time; Barry paints his face with black strikes like a
soldier and sneaks into the storage section of the store)
(Two men, including Hector, are loading boxes into some trucks)
 :
SUPERMARKET EMPLOYEE==
Hey, Hector.
 :
- You almost done?
HECTOR:
- Almost.
(Barry takes a step to peak around the corner)
(Whispering)
He is here. I sense it.
 :
Well, I guess I'll go home now
(Hector pretends to walk away by walking in place and speaking loudly)
 :
and just leave this nice honey out,
with no one around.
BARRY:
You're busted, box boy!
HECTOR:
I knew I heard something!
So you can talk!
BARRY:
I can talk.
And now you'll start talking!
 :
Where you getting the sweet stuff?

Who's your supplier?
HECTOR:
I don't understand.
I thought we were friends.
 :
The last thing we want
to do is upset bees!
(Hector takes a thumbtack out of the board behind him and sword-fights
Barry. Barry is using his stinger like a sword)
 :
You're too late! It's ours now!
BARRY:
You, sir, have crossed
the wrong sword!
HECTOR:
You, sir, will be lunch
for my iguana, Ignacio!
(Barry hits the thumbtack out of Hectors hand and Hector surrenders)
Barry:
Where is the honey coming from?
 :
Tell me where!
HECTOR:
(Pointing to leaving truck)
Honey Farms! It comes from Honey Farms!
(Barry chases after the truck but it is getting away. He flies onto a
bicyclists' backpack and he catches up to the truck)
CAR DRIVER:
(To bicyclist)
Crazy person!
(Barry flies off and lands on the windshield of the Honey farms truck.
Barry looks around and sees dead bugs splattered everywhere)
BARRY:
What horrible thing has happened here?

 :
These faces, they never knew
what hit them. And now
 :
they're on the road to nowhere!
(Barry hears a sudden whisper)
(Barry looks up and sees Mooseblood, a mosquito playing dead)
MOOSEBLOOD:
Just keep still.
BARRY:
What? You're not dead?
MOOSEBLOOD:
Do I look dead? They will wipe anything
that moves. Where you headed?
BARRY:
To Honey Farms.
I am onto something huge here.
MOOSEBLOOD:
I'm going to Alaska. Moose blood,
crazy stuff. Blows your head off!
ANOTHER BUG PLAYING DEAD:
I'm going to Tacoma.
(Barry looks at another bug)
BARRY:
- And you?
MOOSEBLOOD:
- He really is dead.
BARRY:
All right.
(Another bug hits the windshield and the drivers notice. They activate the
windshield wipers)
MOOSEBLOOD==
Uh-oh!
(The windshield wipers are slowly sliding over the dead bugs and wiping

them off)
BARRY:
- What is that?!
MOOSEBLOOD:
- Oh, no!
 :
- A wiper! Triple blade!
BARRY:
- Triple blade?
MOOSEBLOOD:
Jump on! It's your only chance, bee!
(Mooseblood and Barry grab onto the wiper and they hold on as it wipes the
windshield)
Why does everything have
to be so doggone clean?!
 :
How much do you people need to see?!
(Bangs on windshield)
 :
Open your eyes!
Stick your head out the window!
RADIO IN TRUCK:
From NPR News in Washington,
I'm Carl Kasell.
MOOSEBLOOD:
But don't kill no more bugs!
(Mooseblood and Barry are washed off by the wipr fluid)
MOOSEBLOOD:
- Bee!
BARRY:
- Moose blood guy!!
(Barry starts screaming as he hangs onto the antenna)
(Suddenly it is revealed that a water bug is also hanging on the antenna.

There is a pause and then Barry and the water bug both start screaming)
TRUCK DRIVER:
- You hear something?
GUY IN TRUCK:
- Like what?
TRUCK DRIVER:
Like tiny screaming.
GUY IN TRUCK:
Turn off the radio.
(The antenna starts to lower until it gets to low and sinks into the truck.
The water bug flies off and Barry is forced to let go and he is blown away.
He luckily lands inside a horn on top of the truck where he finds
Mooseblood, who was blown into the same place)
MOOSEBLOOD:
Whassup, bee boy?
BARRY:
Hey, Blood.
(Fast forward in time and we see that Barry is deep in conversation with
Mooseblood. They have been sitting in this truck for a while)
BARRY:
...Just a row of honey jars,
as far as the eye could see.
MOOSEBLOOD:
Wow!
BARRY:
I assume wherever this truck goes
is where they're getting it.
 :
I mean, that honey's ours.
MOOSEBLOOD:
- Bees hang tight.
BARRY:

- We're all jammed in.
 :
It's a close community.
MOOSEBLOOD:
Not us, man. We on our own.
Every mosquito on his own.
BARRY:
- What if you get in trouble?
MOOSEBLOOD:
- You a mosquito, you in trouble.
 :
Nobody likes us. They just smack.
See a mosquito, smack, smack!
BARRY:
At least you're out in the world.
You must meet girls.
MOOSEBLOOD:
Mosquito girls try to trade up,
get with a moth, dragonfly.
 :
Mosquito girl don't want no mosquito.
(An ambulance passes by and it has a blood donation sign on it)
You got to be kidding me!
 :
Mooseblood's about to leave
the building! So long, bee!
(Mooseblood leaves and flies onto the window of the ambulance where there
are other mosquito's hanging out)
 :
- Hey, guys!
OTHER MOSQUITO:
- Mooseblood!

MOOSEBLOOD:
I knew I'd catch y'all down here.
Did you bring your crazy straw?
(The truck goes out of view and Barry notices that the truck he's on is
pulling into a camp of some sort)
TRUCK DRIVER:
We throw it in jars, slap a label on it,
and it's pretty much pure profit.
(Barry flies out)
BARRY:
What is this place?
BEEKEEPER 1#:
A bee's got a brain
the size of a pinhead.
BEEKEEPER #2:
They are pinheads!
 :
Pinhead.
 :
- Check out the new smoker.
BEEKEEPER #1:
- Oh, sweet. That's the one you want.
 :
The Thomas 3000!
BARRY:
Smoker?
BEEKEEPER #1:
Ninety puffs a minute, semi-automatic.
Twice the nicotine, all the tar.
 :
A couple breaths of this
knocks them right out.

BEEKEEPER #2:
They make the honey,
and we make the money.
BARRY:
"They make the honey,
and we make the money"?
(The Beekeeper sprays hundreds of cheap miniature apartments with the
smoker. The bees are fainting or passing out)
Oh, my!
 :
What's going on? Are you OK?
(Barry flies into one of the apartment and helps a Bee couple get off the
ground. They are coughing and its hard for them to stand)
BEE IN APARTMENT:
Yeah. It doesn't last too long.
BARRY:
Do you know you're
in a fake hive with fake walls?
BEE IN APPARTMENT:
Our queen was moved here.
We had no choice.
(The apartment room is completely empty except for a photo on the wall of
the "queen" who is obviously a man in women's clothes)
BARRY:
This is your queen?
That's a man in women's clothes!
 :
That's a drag queen!
 :
What is this?
(Barry flies out and he discovers that there are hundreds of these
structures, each housing thousands of Bees)
Oh, no!
 :
There's hundreds of them!
(Barry takes out his camera and takes pictures of these Bee work camps. The
beekeepers look very evil in these depictions)

Bee honey.
 :
Our honey is being brazenly stolen
on a massive scale!
 :
This is worse than anything bears
have done! I intend to do something.
(Flash forward in time and Barry is showing these pictures to his parents)
JANET:
Oh, Barry, stop.
MARTIN:
Who told you humans are taking
our honey? That's a rumor.
BARRY:
Do these look like rumors?
(Holds up the pictures)
UNCLE CARL:
That's a conspiracy theory.
These are obviously doctored photos.
JANET:
How did you get mixed up in this?
ADAM:
He's been talking to humans.
JANET:
- What?
MARTIN:
- Talking to humans?!
ADAM:
He has a human girlfriend.
And they make out!
JANET:
Make out? Barry!

BARRY:
We do not.
ADAM:
- You wish you could.
MARTIN:
- Whose side are you on?
BARRY:
The bees!
UNCLE CARL:
(He has been sitting in the back of the room this entire time)
I dated a cricket once in San Antonio.
Those crazy legs kept me up all night.
JANET:
Barry, this is what you want
to do with your life?
BARRY:
I want to do it for all our lives.
Nobody works harder than bees!
 :
Dad, I remember you
coming home so overworked
 :
your hands were still stirring.
You couldn't stop.
JANET:
I remember that.
BARRY:
What right do they have to our honey?
 :
We live on two cups a year. They put it
in lip balm for no reason whatsoever!

ADAM:
Even if it's true, what can one bee do?
BARRY:
Sting them where it really hurts.
MARTIN:
In the face! The eye!
 :
- That would hurt.
BARRY:
- No.
MARTIN:
Up the nose? That's a killer.
BARRY:
There's only one place you can sting
the humans, one place where it matters.
(Flash forward a bit in time and we are watching the Bee News)
BEE NEWS NARRATOR:
Hive at Five, the hive's only
full-hour action news source.
BEE PROTESTOR:
No more bee beards!
BEE NEWS NARRATOR:
With Bob Bumble at the anchor desk.
 :
Weather with Storm Stinger.
 :
Sports with Buzz Larvi.
 :
And Jeanette Chung.
BOB BUMBLE:
- Good evening. I'm Bob Bumble.
JEANETTE CHUNG:

- And I'm Jeanette Chung.
BOB BUMBLE:
A tri-county bee, Barry Benson,
 :
intends to sue the human race
for stealing our honey,
 :
packaging it and profiting
from it illegally!
JEANETTE CHUNG:
Tomorrow night on Bee Larry King,
 :
we'll have three former queens here in
our studio, discussing their new book,
 :
Classy Ladies,
out this week on Hexagon.
(The scene changes to an interview on the news with Bee version of Larry
King and Barry)
BEE LARRY KING:
Tonight we're talking to Barry Benson.
 :
Did you ever think, "I'm a kid
from the hive. I can't do this"?
BARRY:
Bees have never been afraid
to change the world.
 :
What about Bee Columbus?
Bee Gandhi? Bejesus?
BEE LARRY KING:
Where I'm from, we'd never sue humans.

 :
We were thinking
of stickball or candy stores.
BARRY:
How old are you?
BEE LARRY KING:
The bee community
is supporting you in this case,
 :
which will be the trial
of the bee century.
BARRY:
You know, they have a Larry King
in the human world too.
BEE LARRY KING:
It's a common name. Next week...
BARRY:
He looks like you and has a show
and suspenders and colored dots...
BEE LARRY KING:
Next week...
BARRY:
Glasses, quotes on the bottom from the
guest even though you just heard 'em.
BEE LARRY KING:
Bear Week next week!
They're scary, hairy and here, live.
(Bee Larry King gets annoyed and flies away offscreen)
BARRY:
Always leans forward, pointy shoulders,
squinty eyes, very Jewish.
(Flash forward in time. We see Vanessa enter and Ken enters behind her.
They are arguing)

KEN:
In tennis, you attack
at the point of weakness!
VANESSA:
It was my grandmother, Ken. She's 81.
KEN==
Honey, her backhand's a joke!
I'm not gonna take advantage of that?
BARRY:
(To Ken)
Quiet, please.
Actual work going on here.
KEN:
(Pointing at Barry)
- Is that that same bee?
VANESSA:
- Yes, it is!
 :
I'm helping him sue the human race.
BARRY:
- Hello.
KEN:
- Hello, bee.
VANESSA:
This is Ken.
BARRY:
(Recalling the "Winter Boots" incident earlier)
Yeah, I remember you. Timberland, size
ten and a half. Vibram sole, I believe.
KEN:
(To Vanessa)
Why does he talk again?
VANESSA:

Listen, you better go
'cause we're really busy working.
KEN:
But it's our yogurt night!
VANESSA:
(Holding door open for Ken)
Bye-bye.
KEN:
(Yelling)
Why is yogurt night so difficult?!
(Ken leaves and Vanessa walks over to Barry. His workplace is a mess)
VANESSA:
You poor thing.
You two have been at this for hours!
BARRY:
Yes, and Adam here
has been a huge help.
ADAM:
- Frosting...
- How many sugars?
 ==BARRY==
Just one. I try not
to use the competition.
 :
So why are you helping me?
VANESSA:
Bees have good qualities.
 :
And it takes my mind off the shop.
 :
Instead of flowers, people
are giving balloon bouquets now.
BARRY:

Those are great, if you're three.
VANESSA:
And artificial flowers.
BARRY:
- Oh, those just get me psychotic!
VANESSA:
- Yeah, me too.
 :
BARRY:
Bent stingers, pointless pollination.
ADAM:
Bees must hate those fake things!
 :
Nothing worse
than a daffodil that's had work done.
 :
Maybe this could make up
for it a little bit.
VANESSA:
- This lawsuit's a pretty big deal.
BARRY:
- I guess.
ADAM:
You sure you want to go through with it?
BARRY:
Am I sure? When I'm done with
the humans, they won't be able
 :
to say, "Honey, I'm home,"
without paying a royalty!
(Flash forward in time and we are watching the human news. The camera shows

a crowd outside a courthouse)
NEWS REPORTER:
It's an incredible scene
here in downtown Manhattan,
 :
where the world anxiously waits,
because for the first time in history,
 :
we will hear for ourselves
if a honeybee can actually speak.
(We are no longer watching through a news camera)
ADAM:
What have we gotten into here, Barry?
BARRY:
It's pretty big, isn't it?
ADAM==
(Looking at the hundreds of people around the courthouse)
I can't believe how many humans
don't work during the day.
BARRY:
You think billion-dollar multinational
food companies have good lawyers?
SECURITY GUARD:
Everybody needs to stay
behind the barricade.
(A limousine drives up and a fat man,Layton Montgomery, a honey industry
owner gets out and walks past Barry)
ADAM:
- What's the matter?
BARRY:
- I don't know, I just got a chill.
(Fast forward in time and everyone is in the court)
MONTGOMERY:
Well, if it isn't the bee team.

(To Honey Industry lawyers)
You boys work on this?
MAN:
All rise! The Honorable
Judge Bumbleton presiding.
JUDGE BUMBLETON:
All right. Case number 4475,
 :
Superior Court of New York,
Barry Bee Benson v. the Honey Industry
 :
is now in session.
 :
Mr. Montgomery, you're representing
the five food companies collectively?
MONTGOMERY:
A privilege.
JUDGE BUMBLETON:
Mr. Benson... you're representing
all the bees of the world?
(Everyone looks closely, they are waiting to see if a Bee can really talk)
(Barry makes several buzzing sounds to sound like a Bee)
BARRY:
I'm kidding. Yes, Your Honor,
we're ready to proceed.
JUDGE BUMBLBETON:
Mr. Montgomery,
your opening statement, please.
MONTGOMERY:
Ladies and gentlemen of the jury,
 :
my grandmother was a simple woman.
 :

Born on a farm, she believed
it was man's divine right
 :
to benefit from the bounty
of nature God put before us.
 :
If we lived in the topsy-turvy world
Mr. Benson imagines,
 :
just think of what would it mean.
 :
I would have to negotiate
with the silkworm
 :
for the elastic in my britches!
 :
Talking bee!
(Montgomery walks over and looks closely at Barry)
 :
How do we know this isn't some sort of
 :
holographic motion-picture-capture
Hollywood wizardry?
 :
They could be using laser beams!
 :
Robotics! Ventriloquism!
Cloning! For all we know,
 :
he could be on steroids!
JUDGE BUMBLETON:
Mr. Benson?

BARRY:
Ladies and gentlemen,
there's no trickery here.
 :
I'm just an ordinary bee.
Honey's pretty important to me.
 :
It's important to all bees.
We invented it!
 :
We make it. And we protect it
with our lives.
 :
Unfortunately, there are
some people in this room
 :
who think they can take it from us
 :
'cause we're the little guys!
I'm hoping that, after this is all over,
 :
you'll see how, by taking our honey,
you not only take everything we have
 :
but everything we are!
JANET==
(To Martin)
I wish he'd dress like that
all the time. So nice!
JUDGE BUMBLETON:
Call your first witness.
BARRY:
So, Mr. Klauss Vanderhayden

of Honey Farms, big company you have.
KLAUSS VANDERHAYDEN:
I suppose so.
BARRY:
I see you also own
Honeyburton and Honron!
KLAUSS:
Yes, they provide beekeepers
for our farms.
BARRY:
Beekeeper. I find that
to be a very disturbing term.
 :
I don't imagine you employ
any bee-free-ers, do you?
KLAUSS:
(Quietly)
- No.
BARRY:
- I couldn't hear you.
KLAUSS:
- No.
BARRY:
- No.
 :
Because you don't free bees.
You keep bees. Not only that,
 :
it seems you thought a bear would be
an appropriate image for a jar of honey.
KLAUSS:
They're very lovable creatures.

 :
Yogi Bear, Fozzie Bear, Build-A-Bear.
BARRY:
You mean like this?
(The bear from Over The Hedge barges in through the back door and it is
roaring and standing on its hind legs. It is thrashing its claws and people
are screaming. It is being held back by a guard who has the bear on a
chain)
 :
(Pointing to the roaring bear)
Bears kill bees!
 :
How'd you like his head crashing
through your living room?!
 :
Biting into your couch!
Spitting out your throw pillows!
JUDGE BUMBLETON:
OK, that's enough. Take him away.
(The bear stops roaring and thrashing and walks out)
BARRY:
So, Mr. Sting, thank you for being here.
Your name intrigues me.
 :
- Where have I heard it before?
MR. STING:
- I was with a band called The Police.
BARRY:
But you've never been
a police officer, have you?
STING:
No, I haven't.
BARRY:

No, you haven't. And so here
we have yet another example
 :
of bee culture casually
stolen by a human
 :
for nothing more than
a prance-about stage name.
STING:
Oh, please.
BARRY:
Have you ever been stung, Mr. Sting?
 :
Because I'm feeling
a little stung, Sting.
 :
Or should I say... Mr. Gordon M. Sumner!
MONTGOMERY:
That's not his real name?! You idiots!
BARRY:
Mr. Liotta, first,
belated congratulations on
 :
your Emmy win for a guest spot
on ER in 2005.
RAY LIOTTA:
Thank you. Thank you.
BARRY:
I see from your resume
that you're devilishly handsome
 :
with a churning inner turmoil

that's ready to blow.
RAY LIOTTA:
I enjoy what I do. Is that a crime?
BARRY:
Not yet it isn't. But is this
what it's come to for you?
 :
Exploiting tiny, helpless bees
so you don't
 :
have to rehearse
your part and learn your lines, sir?
RAY LIOTTA:
Watch it, Benson!
I could blow right now!
BARRY:
This isn't a goodfella.
This is a badfella!
(Ray Liotta looses it and tries to grab Barry)
RAY LIOTTA:
Why doesn't someone just step on
this creep, and we can all go home?!
JUDGE BUMBLETON:
- Order in this court!
RAY LIOTTA:
- You're all thinking it!
(Judge Bumbleton starts banging her gavel)
JUDGE BUMBLETON:
Order! Order, I say!
RAY LIOTTA:
- Say it!
MAN:

- Mr. Liotta, please sit down!
(We see a montage of magazines which feature the court case)
(Flash forward in time and Barry is back home with Vanessa)
BARRY:
I think it was awfully nice
of that bear to pitch in like that.
VANESSA:
I think the jury's on our side.
BARRY:
Are we doing everything right,you know, legally?
VANESSA:
I'm a florist.
BARRY:
Right. Well, here's to a great team.
VANESSA:
To a great team!
(Ken walks in from work. He sees Barry and he looks upset when he sees
Barry clinking his glass with Vanessa)
KEN:
Well, hello.
VANESSA:
- Oh, Ken!
BARRY:
- Hello!
VANESSA:
I didn't think you were coming.
 :
No, I was just late.
I tried to call, but...
(Ken holds up his phone and flips it open. The phone has no charge)
...the battery...
VANESSA:

I didn't want all this to go to waste,
so I called Barry. Luckily, he was free.
KEN:
Oh, that was lucky.
(Ken sits down at the table across from Barry and Vanessa leaves the room)
VANESSA:
There's a little left.
I could heat it up.
KEN:
(Not taking his eyes off Barry)
Yeah, heat it up, sure, whatever.
BARRY:
So I hear you're quite a tennis player.
 :
I'm not much for the game myself.
The ball's a little grabby.
KEN:
That's where I usually sit.
Right...
(Points to where Barry is sitting)
there.
VANESSA:
(Calling from other room)
Ken, Barry was looking at your resume,
 :
and he agreed with me that eating with
chopsticks isn't really a special skill.
KEN:
(To Barry)
You think I don't see what you're doing?
BARRY:
I know how hard it is to find
the right job. We have that in common.

KEN:
Do we?
BARRY:
Bees have 100 percent employment,
but we do jobs like taking the crud out.
KEN:
(Menacingly)
That's just what
I was thinking about doing.
(Ken reaches for a fork on the table but knocks if on the floor. He goes to
pick it up)
VANESSA:
Ken, I let Barry borrow your razor
for his fuzz. I hope that was all right.
(Ken quickly rises back up after hearing this but hits his head on the
table and yells)
BARRY:
I'm going to drain the old stinger.
KEN:
Yeah, you do that.
(Barry flies past Ken to get to the bathroom and Ken freaks out, splashing
some of the wine he was using to cool his head in his eyes. He yells in
anger)
(Barry looks at the magazines featuring his victories in court)
BARRY:
Look at that.
(Barry flies into the bathroom)
(He puts his hand on his head but this makes hurts him and makes him even
madder. He yells again)
(Barry is washing his hands in the sink but then Ken walks in)
KEN:
You know, you know I've just about had it
(Closes bathroom door behind him)
with your little mind games.
(Ken is menacingly rolling up a magazine)
BARRY:

(Backing away)
- What's that?
KEN:
- Italian Vogue.
BARRY:
Mamma mia, that's a lot of pages.
KEN:
It's a lot of ads.
BARRY:
Remember what Van said, why is
your life more valuable than mine?
KEN:
That's funny, I just can't seem to recall that!
(Ken smashes everything off the sink with the magazine and Barry narrowly
escapes)
(Ken follows Barry around and tries to hit him with the magazine but he
keeps missing)
(Ken gets a spray bottle)
 :
I think something stinks in here!
BARRY:
(Enjoying the spray)
I love the smell of flowers.
(Ken holds a lighter in front of the spray bottle)
KEN:
How do you like the smell of flames?!
BARRY:
Not as much.
(Ken fires his make-shift flamethrower but misses Barry, burning the
bathroom. He torches the whole room but looses his footing and falls into
the bathtub. After getting hit in the head by falling objects 3 times he
picks up the shower head, revealing a Water bug hiding under it)
WATER BUG:
Water bug! Not taking sides!

(Barry gets up out of a pile of bathroom supplies and he is wearing a
chapstick hat)
BARRY:
Ken, I'm wearing a Chapstick hat!
This is pathetic!
(Ken switches the shower head to lethal)
KEN:
I've got issues!
(Ken sprays Barry with the shower head and he crash lands into the toilet)
(Ken menacingly looks down into the toilet at Barry)
Well, well, well, a royal flush!
BARRY:
- You're bluffing.
KEN:
- Am I?
(flushes toilet)
(Barry grabs a chapstick from the toilet seat and uses it to surf in the
flushing toilet)
BARRY:
Surf's up, dude!
(Barry flies out of the toilet on the chapstick and sprays Ken's face with
the toilet water)
 :
EW,Poo water!
BARRY:
That bowl is gnarly.
KEN:
(Aiming a toilet cleaner at Barry)
Except for those dirty yellow rings!
(Barry cowers and covers his head and Vanessa runs in and takes the toilet
cleaner from Ken just before he hits Barry)
VANESSA:
Kenneth! What are you doing?!
KEN==
(Leaning towards Barry)

You know, I don't even like honey!
I don't eat it!
VANESSA:
We need to talk!
(Vanessa pulls Ken out of the bathroom)
 :
He's just a little bee!
 :
And he happens to be
the nicest bee I've met in a long time!
KEN:
Long time? What are you talking about?!
Are there other bugs in your life?
VANESSA:
No, but there are other things bugging
me in life. And you're one of them!
KEN:
Fine! Talking bees, no yogurt night...
 :
My nerves are fried from riding
on this emotional roller coaster!
VANESSA:
Goodbye, Ken.
(Ken huffs and walks out and slams the door. But suddenly he walks back in
and stares at Barry)
 :
And for your information,
I prefer sugar-free, artificial
sweeteners MADE BY MAN!
(Ken leaves again and Vanessa leans in towards Barry)
VANESSA:
I'm sorry about all that.
(Ken walks back in again)

KEN:
I know it's got
an aftertaste! I LIKE IT!
(Ken leaves for the last time)
VANESSA:
I always felt there was some kind
of barrier between Ken and me.
 :
I couldn't overcome it.
Oh, well.
 :
Are you OK for the trial?
BARRY:
I believe Mr. Montgomery
is about out of ideas.
(Flash forward in time and Barry, Adam, and Vanessa are back in court)
MONTGOMERY--
We would like to call
Mr. Barry Benson Bee to the stand.
ADAM:
Good idea! You can really see why he's
considered one of the best lawyers...
(Barry stares at Adam)
...Yeah.
LAWYER:
Layton, you've
gotta weave some magic
with this jury,
or it's gonna be all over.
MONTGOMERY:
Don't worry. The only thing I have
to do to turn this jury around
 :
is to remind them
of what they don't like about bees.
(To lawyer)

- You got the tweezers?
LAWYER:
- Are you allergic?
MONTGOMERY:
Only to losing, son. Only to losing.
 :
Mr. Benson Bee, I'll ask you
what I think we'd all like to know.
 :
What exactly is your relationship
(Points to Vanessa)
 :
to that woman?
BARRY:
We're friends.
MONTGOMERY:
- Good friends?
BARRY:
- Yes.
MONTGOMERY:
How good? Do you live together?
ADAM:
Wait a minute...
 :
MONTGOMERY:
Are you her little...
 :
...bedbug?
(Adam's stinger starts vibrating. He is agitated)
I've seen a bee documentary or two.
From what I understand,

 :
doesn't your queen give birth
to all the bee children?
BARRY:
- Yeah, but...
MONTGOMERY:
(Pointing at Janet and Martin)
- So those aren't your real parents!
JANET:
- Oh, Barry...
BARRY:
- Yes, they are!
ADAM:
Hold me back!
(Vanessa tries to hold Adam back. He wants to sting Montgomery)
MONTGOMERY:
You're an illegitimate bee,
aren't you, Benson?
ADAM:
He's denouncing bees!
MONTGOMERY:
Don't y'all date your cousins?
(Montgomery leans over on the jury stand and stares at Adam)
VANESSA:
- Objection!
(Vanessa raises her hand to object but Adam gets free. He flies straight at
Montgomery)
=ADAM:
- I'm going to pincushion this guy!
BARRY:
Adam, don't! It's what he wants!
(Adam stings Montgomery in the butt and he starts thrashing around)

MONTGOMERY:
Oh, I'm hit!!
 :
Oh, lordy, I am hit!
JUDGE BUMBLETON:
(Banging gavel)
Order! Order!
MONTGOMERY:
(Overreacting)
The venom! The venom
is coursing through my veins!
 :
I have been felled
by a winged beast of destruction!
 :
You see? You can't treat them
like equals! They're striped savages!
 :
Stinging's the only thing
they know! It's their way!
BARRY:
- Adam, stay with me.
ADAM:
- I can't feel my legs.
MONTGOMERY:
(Overreacting and throwing his body around the room)
What angel of mercy
will come forward to suck the poison
 :
from my heaving buttocks?
JUDGE BUMLBETON:
I will have order in this court. Order!

 :
Order, please!
(Flash forward in time and we see a human news reporter)
NEWS REPORTER:
The case of the honeybees
versus the human race
 :
took a pointed turn against the bees
 :
yesterday when one of their legal
team stung Layton T. Montgomery.
(Adam is laying in a hospital bed and Barry flies in to see him)
BARRY:
- Hey, buddy.
ADAM:
- Hey.
BARRY:
- Is there much pain?
ADAM:
- Yeah.
 :
I...
 :
I blew the whole case, didn't I?
BARRY:
It doesn't matter. What matters is
you're alive. You could have died.
ADAM:
I'd be better off dead. Look at me.
(A small plastic sword is replaced as Adam's stinger)
They got it from the cafeteria
downstairs, in a tuna sandwich.

 :
Look, there's
a little celery still on it.
(Flicks off the celery and sighs)
BARRY:
What was it like to sting someone?
ADAM:
I can't explain it. It was all...
 :
All adrenaline and then...
and then ecstasy!
BARRY:
...All right.
ADAM:
You think it was all a trap?
BARRY:
Of course. I'm sorry.
I flew us right into this.
 :
What were we thinking? Look at us. We're
just a couple of bugs in this world.
ADAM:
What will the humans do to us
if they win?
BARRY:
I don't know.
ADAM:
I hear they put the roaches in motels.
That doesn't sound so bad.
BARRY:
Adam, they check in,
but they don't check out!

ADAM:
Oh, my.
(Coughs)
Could you get a nurse
to close that window?
BARRY:
- Why?
ADAM:
- The smoke.
(We can see that two humans are smoking cigarettes outside)
 :
Bees don't smoke.
BARRY:
Right. Bees don't smoke.
 :
Bees don't smoke!
But some bees are smoking.
 :
That's it! That's our case!
ADAM:
It is? It's not over?
BARRY:
Get dressed. I've gotta go somewhere.
 :
Get back to the court and stall.
Stall any way you can.
(Flash forward in time and Adam is making a paper boat in the courtroom)
ADAM:
And assuming you've done step 29 correctly, you're ready for the tub!
(We see that the jury have each made their own paper boats after being
taught how by Adam. They all look confused)
JUDGE BUMBLETON:

Mr. Flayman.
ADAM:
Yes? Yes, Your Honor!
JUDGE BUMBLETON:
Where is the rest of your team?
ADAM:
(Continues stalling)
Well, Your Honor, it's interesting.
 :
Bees are trained to fly haphazardly,
 :
and as a result,
we don't make very good time.
 :
I actually heard a funny story about...
MONTGOMERY:
Your Honor,
haven't these ridiculous bugs
 :
taken up enough
of this court's valuable time?
 :
How much longer will we allow
these absurd shenanigans to go on?
 :
They have presented no compelling
evidence to support their charges
 :
against my clients,
who run legitimate businesses.
 :
I move for a complete dismissal

of this entire case!
JUDGE BUMBLETON:
Mr. Flayman, I'm afraid I'm going
 :
to have to consider
Mr. Montgomery's motion.
ADAM:
But you can't! We have a terrific case.
MONTGOMERY:
Where is your proof?
Where is the evidence?
 :
Show me the smoking gun!
BARRY:
(Barry flies in through the door)
Hold it, Your Honor!
You want a smoking gun?
 :
Here is your smoking gun.
(Vanessa walks in holding a bee smoker. She sets it down on the Judge's
podium)
JUDGE BUMBLETON:
What is that?
BARRY:
It's a bee smoker!
MONTGOMERY:
(Picks up smoker)
What, this?
This harmless little contraption?
 :
This couldn't hurt a fly,
let alone a bee.
(Montgomery accidentally fires it at the bees in the crowd and they faint

and cough)
(Dozens of reporters start taking pictures of the suffering bees)
BARRY:
Look at what has happened
 :
to bees who have never been asked,
"Smoking or non?"
 :
Is this what nature intended for us?
 :
To be forcibly addicted
to smoke machines
 :
and man-made wooden slat work camps?
 :
Living out our lives as honey slaves
to the white man?
(Barry points to the honey industry owners. One of them is an African
American so he awkwardly separates himself from the others)
LAWYER:
- What are we gonna do?
- He's playing the species card.
BARRY:
Ladies and gentlemen, please,
free these bees!
ADAM AND VANESSA:
Free the bees! Free the bees!
BEES IN CROWD:
Free the bees!
HUMAN JURY:
Free the bees! Free the bees!
JUDGE BUMBLETON:
The court finds in favor of the bees!

BARRY:
Vanessa, we won!
VANESSA:
I knew you could do it! High-five!
(Vanessa hits Barry hard because her hand is too big)
 :
Sorry.
BARRY:
(Overjoyed)
I'm OK! You know what this means?
 :
All the honey
will finally belong to the bees.
 :
Now we won't have
to work so hard all the time.
MONTGOMERY:
This is an unholy perversion
of the balance of nature, Benson.
 :
You'll regret this.
(Montgomery leaves and Barry goes outside the courtroom. Several reporters
start asking Barry questions)
REPORTER 1#:
Barry, how much honey is out there?
BARRY:
All right. One at a time.
REPORTER 2#:
Barry, who are you wearing?
BARRY:
My sweater is Ralph Lauren,
and I have no pants.

(Barry flies outside with the paparazzi and Adam and Vanessa stay back)
ADAM:
(To Vanessa)
- What if Montgomery's right?
Vanessa:
- What do you mean?
ADAM:
We've been living the bee way
a long time, 27 million years.
(Flash forward in time and Barry is talking to a man)
BUSINESS MAN:
Congratulations on your victory.
What will you demand as a settlement?
BARRY:
First, we'll demand a complete shutdown
of all bee work camps.
(As Barry is talking we see a montage of men putting "closed" tape over the
work camps and freeing the bees in the crappy apartments)
Then we want back the honey
that was ours to begin with,
 :
every last drop.
(Men in suits are pushing all the honey of the aisle and into carts)
We demand an end to the glorification
of the bear as anything more
(We see a statue of a bear-shaped honey container being pulled down by
bees)
than a filthy, smelly,
bad-breath stink machine.
 :
We're all aware
of what they do in the woods.
(We see Winnie the Pooh sharing his honey with Piglet in the cross-hairs of
a high-tech sniper rifle)
BARRY:
(Looking through binoculars)

Wait for my signal.
 :
Take him out.
(Winnie gets hit by a tranquilizer dart and dramatically falls off the log
he was standing on, his tongue hanging out. Piglet looks at Pooh in fear
and the Sniper takes the honey.)
SNIPER:
He'll have nausea
for a few hours, then he'll be fine.
(Flash forward in time)
BARRY:
And we will no longer tolerate
bee-negative nicknames...
(Mr. Sting is sitting at home until he is taken out of his house by the men
in suits)
STING:
But it's just a prance-about stage name!
BARRY:
...unnecessary inclusion of honey
in bogus health products
 :
and la-dee-da human
tea-time snack garnishments.
(An old lady is mixing honey into her tea but suddenly men in suits smash
her face down on the table and take the honey)
OLD LADY:
Can't breathe.
(A honey truck pulls up to Barry's hive)
WORKER:
Bring it in, boys!
 :
Hold it right there! Good.
 :
Tap it.

(Tons of honey is being pumped into the hive's storage)
BEE WORKER 1#:
(Honey overflows from the cup)
Mr. Buzzwell, we just passed three cups,
and there's gallons more coming!
 :
- I think we need to shut down!
=BEE WORKER #2=
- Shut down? We've never shut down.
 :
Shut down honey production!
DEAN BUZZWELL:
Stop making honey!
(The bees all leave their stations. Two bees run into a room and they put
the keys into a machine)
Turn your key, sir!
(Two worker bees dramatically turn their keys, which opens the button which
they press, shutting down the honey-making machines. This is the first time
this has ever happened)
BEE:
...What do we do now?
(Flash forward in time and a Bee is about to jump into a pool full of
honey)
Cannonball!
(The bee gets stuck in the honey and we get a short montage of Bees leaving
work)
(We see the Pollen Jocks flying but one of them gets a call on his antenna)
LOU LU DUVA:
(Through "phone")
We're shutting honey production!
 :
Mission abort.
POLLEN JOCK #1:
Aborting pollination and nectar detail.
Returning to base.
(The Pollen Jocks fly back to the hive)

(We get a time lapse of Central Park slowly wilting away as the bees all
relax)
BARRY:
Adam, you wouldn't believe
how much honey was out there.
ADAM:
Oh, yeah?
BARRY:
What's going on? Where is everybody?
(The entire street is deserted)
 :
- Are they out celebrating?
ADAM:
- They're home.
 :
They don't know what to do.
Laying out, sleeping in.
 :
I heard your Uncle Carl was on his way
to San Antonio with a cricket.
BARRY:
At least we got our honey back.
ADAM:
Sometimes I think, so what if humans
liked our honey? Who wouldn't?
 :
It's the greatest thing in the world!
I was excited to be part of making it.
 :
This was my new desk. This was my
new job. I wanted to do it really well.
 :

And now...
 :
Now I can't.
(Flash forward in time and Barry is talking to Vanessa)
BARRY:
I don't understand
why they're not happy.
 :
I thought their lives would be better!
 :
They're doing nothing. It's amazing.
Honey really changes people.
VANESSA:
You don't have any idea
what's going on, do you?
BARRY:
- What did you want to show me?
(Vanessa takes Barry to the rooftop where they first had coffee and points
to her store)
VANESSA:
- This.
(Points at her flowers. They are all grey and wilting)
BARRY:
What happened here?
VANESSA:
That is not the half of it.
(Small flash forward in time and Vanessa and Barry are on the roof of her
store and she points to Central Park)
(We see that Central Park is no longer green and colorful, rather it is
grey, brown, and dead-like. It is very depressing to look at)
BARRY:
Oh, no. Oh, my.
 :

They're all wilting.
VANESSA:
Doesn't look very good, does it?
BARRY:
No.
VANESSA:
And whose fault do you think that is?
BARRY:
You know, I'm gonna guess bees.
VANESSA==
(Staring at Barry)
Bees?
BARRY:
Specifically, me.
 :
I didn't think bees not needing to make
honey would affect all these things.
VANESSA:
It's not just flowers.
Fruits, vegetables, they all need bees.
BARRY:
That's our whole SAT test right there.
VANESSA:
Take away produce, that affects
the entire animal kingdom.
 :
And then, of course...
BARRY:
The human species?
 :
So if there's no more pollination,

 :
it could all just go south here,
couldn't it?
VANESSA:
I know this is also partly my fault.
BARRY:
How about a suicide pact?
VANESSA:
How do we do it?
BARRY:
- I'll sting you, you step on me.
VANESSA:
- That just kills you twice.
BARRY:
Right, right.
VANESSA:
Listen, Barry...
sorry, but I gotta get going.
(Vanessa leaves)
BARRY:
(To himself)
I had to open my mouth and talk.
 :
Vanessa?
 :
Vanessa? Why are you leaving?
Where are you going?
(Vanessa is getting into a taxi)
VANESSA:
To the final Tournament of Roses parade
in Pasadena.
 :

They've moved it to this weekend
because all the flowers are dying.
 :
It's the last chance
I'll ever have to see it.
BARRY:
Vanessa, I just wanna say I'm sorry.
I never meant it to turn out like this.
VANESSA:
I know. Me neither.
(The taxi starts to drive away)
BARRY:
Tournament of Roses.
Roses can't do sports.
 :
Wait a minute. Roses. Roses?
 :
Roses!
 :
Vanessa!
(Barry flies after the Taxi)
VANESSA:
Roses?!
 :
Barry?
(Barry is flying outside the window of the taxi)
BARRY:
- Roses are flowers!
VANESSA:
- Yes, they are.
BARRY:
Flowers, bees, pollen!

VANESSA:
I know.
That's why this is the last parade.
BARRY:
Maybe not.
Could you ask him to slow down?
VANESSA:
Could you slow down?
(The taxi driver screeches to a stop and Barry keeps flying forward)
 :
Barry!
(Barry flies back to the window)
BARRY:
OK, I made a huge mistake.
This is a total disaster, all my fault.
VANESSA:
Yes, it kind of is.
BARRY:
I've ruined the planet.
I wanted to help you
 :
with the flower shop.
I've made it worse.
VANESSA:
Actually, it's completely closed down.
BARRY:
I thought maybe you were remodeling.
 :
But I have another idea, and it's
greater than my previous ideas combined.
VANESSA:
I don't want to hear it!

BARRY:
All right, they have the roses,
the roses have the pollen.
 :
I know every bee, plant
and flower bud in this park.
 :
All we gotta do is get what they've got
back here with what we've got.
 :
- Bees.
VANESSA:
- Park.
BARRY:
- Pollen!
VANESSA:
- Flowers.
BARRY:
- Re-pollination!
VANESSA:
- Across the nation!
 :
Tournament of Roses,
Pasadena, California.
 :
They've got nothing
but flowers, floats and cotton candy.
 :
Security will be tight.
BARRY:
I have an idea.

(Flash forward in time. Vanessa is about to board a plane which has all the
Roses on board.
VANESSA:
Vanessa Bloome, FTD.
(Holds out badge)
 :
Official floral business. It's real.
SECURITY GUARD:
Sorry, ma'am. Nice brooch.
=VANESSA==
Thank you. It was a gift.
(Barry is revealed to be hiding inside the brooch)
(Flash back in time and Barry and Vanessa are discussing their plan)
BARRY:
Once inside,
we just pick the right float.
VANESSA:
How about The Princess and the Pea?
 :
I could be the princess,
and you could be the pea!
BARRY:
Yes, I got it.
 :
- Where should I sit?
GUARD:
- What are you?
BARRY:
- I believe I'm the pea.
GUARD:
- The pea?
VANESSA:

It goes under the mattresses.
GUARD:
- Not in this fairy tale, sweetheart.
- I'm getting the marshal.
VANESSA:
You do that!
This whole parade is a fiasco!
 :
Let's see what this baby'll do.
(Vanessa drives the float through traffic)
GUARD:
Hey, what are you doing?!
BARRY==
Then all we do
is blend in with traffic...
 :
...without arousing suspicion.
 :
Once at the airport,
there's no stopping us.
(Flash forward in time and Barry and Vanessa are about to get on a plane)
SECURITY GUARD:
Stop! Security.
 :
- You and your insect pack your float?
VANESSA:
- Yes.
SECURITY GUARD:
Has it been
in your possession the entire time?
VANESSA:
- Yes.

SECURITY GUARD:
Would you remove your shoes?
(To Barry)
- Remove your stinger.
BARRY:
- It's part of me.
SECURITY GUARD:
I know. Just having some fun.
Enjoy your flight.
(Barry plotting with Vanessa)
BARRY:
Then if we're lucky, we'll have
just enough pollen to do the job.
(Flash forward in time and Barry and Vanessa are flying on the plane)
Can you believe how lucky we are? We
have just enough pollen to do the job!
VANESSA:
I think this is gonna work.
BARRY:
It's got to work.
CAPTAIN SCOTT:
(On intercom)
Attention, passengers,
this is Captain Scott.
 :
We have a bit of bad weather
in New York.
 :
It looks like we'll experience
a couple hours delay.
VANESSA:
Barry, these are cut flowers
with no water. They'll never make it.
BARRY:

I gotta get up there
and talk to them.
VANESSA==
Be careful.
(Barry flies right outside the cockpit door)
BARRY:
Can I get help
with the Sky Mall magazine?
I'd like to order the talking
inflatable nose and ear hair trimmer.
(The flight attendant opens the door and walks out and Barry flies into the
cockpit unseen)
BARRY:
Captain, I'm in a real situation.
CAPTAIN SCOTT:
- What'd you say, Hal?
CO-PILOT HAL:
- Nothing.
(Scott notices Barry and freaks out)
CAPTAIN SCOTT:
Bee!
BARRY:
No,no,no, Don't freak out! My entire species...
(Captain Scott gets out of his seat and tries to suck Barry into a handheld
vacuum)
HAL:
(To Scott)
What are you doing?
(Barry lands on Hals hair but Scott sees him. He tries to suck up Barry but
instead he sucks up Hals toupee)
CAPTAIN SCOTT:
Uh-oh.
BARRY:
- Wait a minute! I'm an attorney!

HAL:
(Hal doesn't know Barry is on his head)
- Who's an attorney?
CAPTAIN SCOTT:
Don't move.
(Scott hits Hal in the face with the vacuum in an attempt to hit Barry. Hal
is knocked out and he falls on the life raft button which launches an
infalatable boat into Scott, who gets knocked out and falls to the floor.
They are both uncounscious.)
BARRY:
(To himself)
Oh, Barry.
BARRY:
(On intercom, with a Southern accent)
Good afternoon, passengers.
This is your captain.
 :
Would a Miss Vanessa Bloome in 24B
please report to the cockpit?
(Vanessa looks confused)
(Normal accent)
...And please hurry!
(Vanessa opens the door and sees the life raft and the uncounscious pilots)
VANESSA:
What happened here?
BARRY:
I tried to talk to them, but
then there was a DustBuster,
a toupee, a life raft exploded.
 :
Now one's bald, one's in a boat,
and they're both unconscious!
VANESSA:
...Is that another bee joke?
BARRY:

- No!
 :
No one's flying the plane!
BUD DITCHWATER:
(Through radio on plane)
This is JFK control tower, Flight 356.
What's your status?
VANESSA:
This is Vanessa Bloome.
I'm a florist from New York.
BUD:
Where's the pilot?
VANESSA:
He's unconscious,
and so is the copilot.
BUD:
Not good. Does anyone onboard
have flight experience?
BARRY:
As a matter of fact, there is.
BUD:
- Who's that?
BARRY:
- Barry Benson.
BUD:
From the honey trial?! Oh, great.
BARRY:
Vanessa, this is nothing more
than a big metal bee.
 :
It's got giant wings, huge engines.

VANESSA:
I can't fly a plane.
BARRY:
- Why not? Isn't John Travolta a pilot?
VANESSA:
- Yes.
BARRY:
How hard could it be?
(Vanessa sits down and flies for a little bit but we see lightning clouds
outside the window)
VANESSA:
Wait, Barry!
We're headed into some lightning.
(An ominous lightning storm looms in front of the plane)
(We are now watching the Bee News)
BOB BUMBLE:
This is Bob Bumble. We have some
late-breaking news from JFK Airport,
 :
where a suspenseful scene
is developing.
 :
Barry Benson,
fresh from his legal victory...
ADAM:
That's Barry!
BOB BUMBLE:
...is attempting to land a plane,
loaded with people, flowers
 :
and an incapacitated flight crew.
JANET, MARTIN, UNCLE CAR AND ADAM:
Flowers?!
(The scene switches to the human news)

REPORTER:
(Talking with Bob Bumble)
We have a storm in the area
and two individuals at the controls
 :
with absolutely no flight experience.
BOB BUMBLE:
Just a minute.
There's a bee on that plane.
BUD:
I'm quite familiar with Mr. Benson
and his no-account compadres.
 :
They've done enough damage.
REPORTER:
But isn't he your only hope?
BUD:
Technically, a bee
shouldn't be able to fly at all.
 :
Their wings are too small...
BARRY:
(Through radio)
Haven't we heard this a million times?
 :
"The surface area of the wings
and body mass make no sense."...
BOB BUMBLE:
- Get this on the air!
BEE:
- Got it.

BEE NEWS CREW:
- Stand by.
BEE NEWS CREW:
- We're going live!
BARRY:
(Through radio on TV)
...The way we work may be a mystery to you.
 :
Making honey takes a lot of bees
doing a lot of small jobs.
 :
But let me tell you about a small job.
 :
If you do it well,
it makes a big difference.
 :
More than we realized.
To us, to everyone.
 :
That's why I want to get bees
back to working together.
 :
That's the bee way!
We're not made of Jell-O.
 :
We get behind a fellow.
 :
- Black and yellow!
BEES:
- Hello!
(The scene switches and Barry is teaching Vanessa how to fly)
BARRY:

Left, right, down, hover.
VANESSA:
- Hover?
BARRY:
- Forget hover.
VANESSA:
This isn't so hard.
(Pretending to honk the horn)
Beep-beep! Beep-beep!
(A Lightning bolt hits the plane and autopilot turns off)
Barry, what happened?!
BARRY:
Wait, I think we were
on autopilot the whole time.
VANESSA:
- That may have been helping me.
BARRY:
- And now we're not!
VANESSA:
So it turns out I cannot fly a plane.
(The plane plummets but we see Lou Lu Duva and the Pollen Jocks, along with
multiple other bees flying towards the plane)
Lou Lu DUva:
All of you, let's get
behind this fellow! Move it out!
 :
Move out!
(The scene switches back to Vanessa and Barry in the plane)
BARRY:
Our only chance is if I do what I'd do,
you copy me with the wings of the plane!
(Barry sticks out his arms like an airplane and flys in front of Vanessa's
face)

VANESSA:
Don't have to yell.
BARRY:
I'm not yelling!
We're in a lot of trouble.
VANESSA:
It's very hard to concentrate
with that panicky tone in your voice!
BARRY:
It's not a tone. I'm panicking!
VANESSA:
I can't do this!
(Barry slaps Vanessa)
BARRY:
Vanessa, pull yourself together.
You have to snap out of it!
VANESSA:
(Slaps Barry)
You snap out of it.
BARRY:
(Slaps Vanessa)
 :
You snap out of it.
VANESSA:
- You snap out of it!
BARRY:
- You snap out of it!
(We see that all the Pollen Jocks are flying under the plane)
VANESSA:
- You snap out of it!
BARRY:
- You snap out of it!

VANESSA:
- You snap out of it!
BARRY:
- You snap out of it!
VANESSA:
- Hold it!
BARRY:
- Why? Come on, it's my turn.
VANESSA:
How is the plane flying?
(The plane is now safely flying)
VANESSA:
I don't know.
(Barry's antennae rings like a phone. Barry picks up)
BARRY:
Hello?
LOU LU DUVA:
(Through "phone")
Benson, got any flowers
for a happy occasion in there?
(All of the Pollen Jocks are carrying the plane)
BARRY:
The Pollen Jocks!
 :
They do get behind a fellow.
LOU LU DUVA:
- Black and yellow.
POLLEN JOCKS:
- Hello.
LOU LU DUVA:
All right, let's drop this tin can

on the blacktop.
BARRY:
Where? I can't see anything. Can you?
VANESSA:
No, nothing. It's all cloudy.
 :
Come on. You got to think bee, Barry.
BARRY:
- Thinking bee.
- Thinking bee.
(On the runway there are millions of bees laying on their backs)
BEES:
Thinking bee!
Thinking bee! Thinking bee!
BARRY:
Wait a minute.
I think I'm feeling something.
VANESSA:
- What?
BARRY:
- I don't know. It's strong, pulling me.
 :
Like a 27-million-year-old instinct.
 :
Bring the nose down.
BEES:
Thinking bee!
Thinking bee! Thinking bee!
CONTROL TOWER OPERATOR:
- What in the world is on the tarmac?
BUD:
- Get some lights on that!

(It is revealed that all the bees are organized into a giant pulsating
flower formation)
BEES:
Thinking bee!
Thinking bee! Thinking bee!
BARRY:
- Vanessa, aim for the flower.
VANESSA:
- OK.
BARRY:
Out the engines. We're going in
on bee power. Ready, boys?
LOU LU DUVA:
Affirmative!
BARRY:
Good. Good. Easy, now. That's it.
 :
Land on that flower!
 :
Ready? Full reverse!
 :
Spin it around!
(The plane's nose is pointed at a flower painted on a nearby plane)
- Not that flower! The other one!
VANESSA:
- Which one?
BARRY:
- That flower.
(The plane is now pointed at a fat guy in a flowered shirt. He freaks out
and tries to take a picture of the plane)
VANESSA:
- I'm aiming at the flower!

BARRY:
That's a fat guy in a flowered shirt.
I mean the giant pulsating flower
made of millions of bees!
(The plane hovers over the bee-flower)
 :
Pull forward. Nose down. Tail up.
 :
Rotate around it.
VANESSA:
- This is insane, Barry!
BARRY:
- This's the only way I know how to fly.
BUD:
Am I koo-koo-kachoo, or is this plane
flying in an insect-like pattern?
(The plane is unrealistically hovering and spinning over the bee-flower)
BARRY:
Get your nose in there. Don't be afraid.
Smell it. Full reverse!
 :
Just drop it. Be a part of it.
 :
Aim for the center!
 :
Now drop it in! Drop it in, woman!
 :
Come on, already.
(The bees scatter and the plane safely lands)
VANESSA:
Barry, we did it!
You taught me how to fly!

BARRY:
- Yes!
(Vanessa is about to high-five Barry)
No high-five!
VANESSA:
- Right.
ADAM:
Barry, it worked!
Did you see the giant flower?
BARRY:
What giant flower? Where? Of course
I saw the flower! That was genius!
ADAM:
- Thank you.
BARRY:
- But we're not done yet.
 :
Listen, everyone!
 :
This runway is covered
with the last pollen
 :
from the last flowers
available anywhere on Earth.
 :
That means this is our last chance.
 :
We're the only ones who make honey,
pollinate flowers and dress like this.
 :
If we're gonna survive as a species,
this is our moment! What do you say?

 :
Are we going to be bees, or just
Museum of Natural History keychains?
BEES:
We're bees!
BEE WHO LIKES KEYCHAINS:
Keychain!
BARRY:
Then follow me! Except Keychain.
POLLEN JOCK #1:
Hold on, Barry. Here.
 :
You've earned this.
BARRY:
Yeah!
 :
I'm a Pollen Jock! And it's a perfect
fit. All I gotta do are the sleeves.
(The Pollen Jocks throw Barry a nectar-collecting gun. Barry catches it)
Oh, yeah.
JANET:
That's our Barry.
(Barry and the Pollen Jocks get pollen from the flowers on the plane)
(Flash forward in time and the Pollen Jocks are flying over NYC)
 :
(Barry pollinates the flowers in Vanessa's shop and then heads to Central
Park)
BOY IN PARK:
Mom! The bees are back!
ADAM:
(Putting on his Krelman hat)
If anybody needs

to make a call, now's the time.
 :
I got a feeling we'll be
working late tonight!
(The bee honey factories are back up and running)
(Meanwhile at Vanessa's shop)
VANESSA:
(To customer)
Here's your change. Have a great
afternoon! Can I help who's next?
 :
Would you like some honey with that?
It is bee-approved. Don't forget these.
(There is a room in the shop where Barry does legal work for other animals.
He is currently talking with a Cow)
COW:
Milk, cream, cheese, it's all me.
And I don't see a nickel!
 :
Sometimes I just feel
like a piece of meat!
BARRY:
I had no idea.
VANESSA:
Barry, I'm sorry.
Have you got a moment?
BARRY:
Would you excuse me?
My mosquito associate will help you.
MOOSEBLOOD:
Sorry I'm late.
COW:
He's a lawyer too?

MOOSEBLOOD:
Ma'am, I was already a blood-sucking parasite.
All I needed was a briefcase.
VANESSA:
Have a great afternoon!
 :
Barry, I just got this huge tulip order,
and I can't get them anywhere.
BARRY:
No problem, Vannie.
Just leave it to me.
VANESSA:
You're a lifesaver, Barry.
Can I help who's next?
BARRY:
All right, scramble, jocks!
It's time to fly.
VANESSA:
Thank you, Barry!
(Ken walks by on the sidewalk and sees the "bee-approved honey" in
Vanessa's shop)
KEN:
That bee is living my life!!
ANDY:
Let it go, Kenny.
KEN:
- When will this nightmare end?!
ANDY:
- Let it all go.
BARRY:
- Beautiful day to fly.
POLLEN JOCK:

- Sure is.
BARRY:
Between you and me,
I was dying to get out of that office.
(Barry recreates the scene near the beginning of the movie where he flies
through the box kite. The movie fades to black and the credits being)
[--after credits; No scene can be seen but the characters can be heard
talking over the credits--]
You have got
to start thinking bee, my friend!
 :
- Thinking bee!
- Me?
BARRY:
(Talking over singer)
Hold it. Let's just stop
for a second. Hold it.
 :
I'm sorry. I'm sorry, everyone.
Can we stop here?
SINGER:
Oh, BarryBARRY:
I'm not making a major life decision
during a production number!
SINGER:
All right. Take ten, everybody.
Wrap it up, guys.
BARRY:
I had virtually no rehearsal for that.
*/
	seaincense: {
		name: "Sea Incense",
		spritenum: 430,
		fling: {
			basePower: 10,
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Water') {
				return this.chainModify([4915, 4096]);
			}
		},
		num: 254,
		gen: 3,
		isNonstandard: "Past",
	},
	sharpbeak: {
		name: "Sharp Beak",
		spritenum: 436,
		fling: {
			basePower: 50,
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Flying') {
				return this.chainModify([4915, 4096]);
			}
		},
		num: 244,
		gen: 2,
	},
	sharpedonite: {
		name: "Sharpedonite",
		spritenum: 619,
		megaStone: "Sharpedo-Mega",
		megaEvolves: "Sharpedo",
		itemUser: ["Sharpedo"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 759,
		gen: 6,
		isNonstandard: "Past",
	},
	shedshell: {
		name: "Shed Shell",
		spritenum: 437,
		fling: {
			basePower: 10,
		},
		onTrapPokemonPriority: -10,
		onTrapPokemon(pokemon) {
			pokemon.trapped = pokemon.maybeTrapped = false;
		},
		num: 295,
		gen: 4,
	},
	shellbell: {
		name: "Shell Bell",
		spritenum: 438,
		fling: {
			basePower: 30,
		},
		onAfterMoveSecondarySelfPriority: -1,
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (move.totalDamage && !pokemon.forceSwitchFlag) {
				this.heal(move.totalDamage / 8, pokemon);
			}
		},
		num: 253,
		gen: 3,
	},
	shinystone: {
		name: "Shiny Stone",
		spritenum: 439,
		fling: {
			basePower: 80,
		},
		num: 107,
		gen: 4,
		rating: 0,
	},
	shockdrive: {
		name: "Shock Drive",
		spritenum: 442,
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 649) || pokemon.baseSpecies.num === 649) {
				return false;
			}
			return true;
		},
		onDrive: 'Electric',
		forcedForme: "Genesect-Shock",
		itemUser: ["Genesect-Shock"],
		num: 117,
		gen: 5,
		isNonstandard: "Past",
	},
	shucaberry: {
		name: "Shuca Berry",
		spritenum: 443,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Ground",
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Ground' && target.getMoveHitData(move).typeMod > 0) {
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
		num: 191,
		gen: 4,
	},
	silkscarf: {
		name: "Silk Scarf",
		spritenum: 444,
		fling: {
			basePower: 10,
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Normal') {
				return this.chainModify([4915, 4096]);
			}
		},
		num: 251,
		gen: 3,
	},
	silverpowder: {
		name: "Silver Powder",
		spritenum: 447,
		fling: {
			basePower: 10,
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Bug') {
				return this.chainModify([4915, 4096]);
			}
		},
		num: 222,
		gen: 2,
	},
	sitrusberry: {
		name: "Sitrus Berry",
		spritenum: 448,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Psychic",
		},
		onUpdate(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 2) {
				pokemon.eatItem();
			}
		},
		onTryEatItem(item, pokemon) {
			if (!this.runEvent('TryHeal', pokemon, null, this.effect, pokemon.baseMaxhp / 4)) return false;
		},
		onEat(pokemon) {
			this.heal(pokemon.baseMaxhp / 4);
		},
		num: 158,
		gen: 3,
	},
	skullfossil: {
		name: "Skull Fossil",
		spritenum: 449,
		fling: {
			basePower: 100,
		},
		num: 105,
		gen: 4,
		isNonstandard: "Past",
		rating: 0,
	},
	skyplate: {
		name: "Sky Plate",
		spritenum: 450,
		onPlate: 'Flying',
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Flying') {
				return this.chainModify([4915, 4096]);
			}
		},
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 493) || pokemon.baseSpecies.num === 493) {
				return false;
			}
			return true;
		},
		forcedForme: "Arceus-Flying",
		num: 306,
		gen: 4,
	},
	slowbronite: {
		name: "Slowbronite",
		spritenum: 620,
		megaStone: "Slowbro-Mega",
		megaEvolves: "Slowbro",
		itemUser: ["Slowbro"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 760,
		gen: 6,
		isNonstandard: "Past",
	},
	smoothrock: {
		name: "Smooth Rock",
		spritenum: 453,
		fling: {
			basePower: 10,
		},
		num: 283,
		gen: 4,
	},
	snorliumz: {
		name: "Snorlium Z",
		spritenum: 656,
		onTakeItem: false,
		zMove: "Pulverizing Pancake",
		zMoveFrom: "Giga Impact",
		itemUser: ["Snorlax"],
		num: 804,
		gen: 7,
		isNonstandard: "Past",
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
			atk: 1,
		},
		num: 649,
		gen: 6,
	},
	softsand: {
		name: "Soft Sand",
		spritenum: 456,
		fling: {
			basePower: 10,
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Ground') {
				return this.chainModify([4915, 4096]);
			}
		},
		num: 237,
		gen: 2,
	},
	solganiumz: {
		name: "Solganium Z",
		spritenum: 685,
		onTakeItem: false,
		zMove: "Searing Sunraze Smash",
		zMoveFrom: "Sunsteel Strike",
		itemUser: ["Solgaleo", "Necrozma-Dusk-Mane"],
		num: 921,
		gen: 7,
		isNonstandard: "Past",
	},
	souldew: {
		name: "Soul Dew",
		spritenum: 459,
		fling: {
			basePower: 30,
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (
				move && (user.baseSpecies.num === 380 || user.baseSpecies.num === 381) &&
				(move.type === 'Psychic' || move.type === 'Dragon')
			) {
				return this.chainModify([4915, 4096]);
			}
		},
		itemUser: ["Latios", "Latias"],
		num: 225,
		gen: 3,
	},
	spelltag: {
		name: "Spell Tag",
		spritenum: 461,
		fling: {
			basePower: 30,
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Ghost') {
				return this.chainModify([4915, 4096]);
			}
		},
		num: 247,
		gen: 2,
	},
	spelonberry: {
		name: "Spelon Berry",
		spritenum: 462,
		isBerry: true,
		naturalGift: {
			basePower: 90,
			type: "Dark",
		},
		onEat: false,
		num: 179,
		gen: 3,
		isNonstandard: "Past",
		rating: 0,
	},
	splashplate: {
		name: "Splash Plate",
		spritenum: 463,
		onPlate: 'Water',
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Water') {
				return this.chainModify([4915, 4096]);
			}
		},
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 493) || pokemon.baseSpecies.num === 493) {
				return false;
			}
			return true;
		},
		forcedForme: "Arceus-Water",
		num: 299,
		gen: 4,
	},
	spookyplate: {
		name: "Spooky Plate",
		spritenum: 464,
		onPlate: 'Ghost',
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Ghost') {
				return this.chainModify([4915, 4096]);
			}
		},
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 493) || pokemon.baseSpecies.num === 493) {
				return false;
			}
			return true;
		},
		forcedForme: "Arceus-Ghost",
		num: 310,
		gen: 4,
	},
	sportball: {
		name: "Sport Ball",
		spritenum: 465,
		num: 499,
		gen: 2,
		isPokeball: true,
		isNonstandard: "Unobtainable",
	},
	starfberry: {
		name: "Starf Berry",
		spritenum: 472,
		isBerry: true,
		naturalGift: {
			basePower: 100,
			type: "Psychic",
		},
		onUpdate(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 4 || (pokemon.hp <= pokemon.maxhp / 2 &&
					pokemon.hasAbility('gluttony') && pokemon.abilityState.gluttony)) {
				pokemon.eatItem();
			}
		},
		onEat(pokemon) {
			const stats: BoostID[] = [];
			let stat: BoostID;
			for (stat in pokemon.boosts) {
				if (stat !== 'accuracy' && stat !== 'evasion' && pokemon.boosts[stat] < 6) {
					stats.push(stat);
				}
			}
			if (stats.length) {
				const randomStat = this.sample(stats);
				const boost: SparseBoostsTable = {};
				boost[randomStat] = 2;
				this.boost(boost);
			}
		},
		num: 207,
		gen: 3,
	},
	starsweet: {
		name: "Star Sweet",
		spritenum: 709,
		fling: {
			basePower: 10,
		},
		num: 1114,
		gen: 8,
		rating: 0,
	},
	steelixite: {
		name: "Steelixite",
		spritenum: 621,
		megaStone: "Steelix-Mega",
		megaEvolves: "Steelix",
		itemUser: ["Steelix"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 761,
		gen: 6,
		isNonstandard: "Past",
	},
	steelgem: {
		name: "Steel Gem",
		spritenum: 473,
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status') return;
			if (move.type === 'Steel' && source.useItem()) {
				source.addVolatile('gem');
			}
		},
		num: 563,
		gen: 5,
		isNonstandard: "Past",
	},
	steelmemory: {
		name: "Steel Memory",
		spritenum: 675,
		onMemory: 'Steel',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 773) || pokemon.baseSpecies.num === 773) {
				return false;
			}
			return true;
		},
		forcedForme: "Silvally-Steel",
		itemUser: ["Silvally-Steel"],
		num: 911,
		gen: 7,
		isNonstandard: "Past",
	},
	steeliumz: {
		name: "Steelium Z",
		spritenum: 647,
		onPlate: 'Steel',
		onTakeItem: false,
		zMove: true,
		zMoveType: "Steel",
		forcedForme: "Arceus-Steel",
		num: 792,
		gen: 7,
		isNonstandard: "Past",
	},
	stick: {
		name: "Stick",
		fling: {
			basePower: 60,
		},
		spritenum: 475,
		onModifyCritRatio(critRatio, user) {
			if (this.toID(user.baseSpecies.baseSpecies) === 'farfetchd') {
				return critRatio + 2;
			}
		},
		itemUser: ["Farfetch\u2019d"],
		num: 259,
		gen: 2,
		isNonstandard: "Past",
	},
	stickybarb: {
		name: "Sticky Barb",
		spritenum: 476,
		fling: {
			basePower: 80,
		},
		onResidualOrder: 28,
		onResidualSubOrder: 3,
		onResidual(pokemon) {
			this.damage(pokemon.baseMaxhp / 8);
		},
		onHit(target, source, move) {
			if (source && source !== target && !source.item && move && this.checkMoveMakesContact(move, source, target)) {
				const barb = target.takeItem();
				if (!barb) return; // Gen 4 Multitype
				source.setItem(barb);
				// no message for Sticky Barb changing hands
			}
		},
		num: 288,
		gen: 4,
	},
	stoneplate: {
		name: "Stone Plate",
		spritenum: 477,
		onPlate: 'Rock',
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Rock') {
				return this.chainModify([4915, 4096]);
			}
		},
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 493) || pokemon.baseSpecies.num === 493) {
				return false;
			}
			return true;
		},
		forcedForme: "Arceus-Rock",
		num: 309,
		gen: 4,
	},
	strangeball: {
		name: "Strange Ball",
		spritenum: 308,
		num: 1785,
		gen: 8,
		isPokeball: true,
		isNonstandard: "Unobtainable",
	},
	strawberrysweet: {
		name: "Strawberry Sweet",
		spritenum: 704,
		fling: {
			basePower: 10,
		},
		num: 1109,
		gen: 8,
		rating: 0,
	},
	sunstone: {
		name: "Sun Stone",
		spritenum: 480,
		fling: {
			basePower: 30,
		},
		num: 80,
		gen: 2,
		rating: 0,
	},
	swampertite: {
		name: "Swampertite",
		spritenum: 612,
		megaStone: "Swampert-Mega",
		megaEvolves: "Swampert",
		itemUser: ["Swampert"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 752,
		gen: 6,
		isNonstandard: "Past",
	},
	sweetapple: {
		name: "Sweet Apple",
		spritenum: 711,
		fling: {
			basePower: 30,
		},
		num: 1116,
		gen: 8,
		rating: 0,
	},
	syrupyapple: {
		name: "Syrupy Apple",
		spritenum: 755,
		fling: {
			basePower: 30,
		},
		num: 2402,
		gen: 9,
		rating: 0,
	},
	tamatoberry: {
		name: "Tamato Berry",
		spritenum: 486,
		isBerry: true,
		naturalGift: {
			basePower: 90,
			type: "Psychic",
		},
		onEat: false,
		num: 174,
		gen: 3,
		rating: 0,
	},
	tangaberry: {
		name: "Tanga Berry",
		spritenum: 487,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Bug",
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Bug' && target.getMoveHitData(move).typeMod > 0) {
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
		num: 194,
		gen: 4,
	},
	tapuniumz: {
		name: "Tapunium Z",
		spritenum: 653,
		onTakeItem: false,
		zMove: "Guardian of Alola",
		zMoveFrom: "Nature's Madness",
		itemUser: ["Tapu Koko", "Tapu Lele", "Tapu Bulu", "Tapu Fini"],
		num: 801,
		gen: 7,
		isNonstandard: "Past",
	},
	tartapple: {
		name: "Tart Apple",
		spritenum: 712,
		fling: {
			basePower: 30,
		},
		num: 1117,
		gen: 8,
		rating: 0,
	},
	terrainextender: {
		name: "Terrain Extender",
		spritenum: 662,
		fling: {
			basePower: 60,
		},
		num: 879,
		gen: 7,
	},
	thickclub: {
		name: "Thick Club",
		spritenum: 491,
		fling: {
			basePower: 90,
		},
		onModifyAtkPriority: 1,
		onModifyAtk(atk, pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Cubone' || pokemon.baseSpecies.baseSpecies === 'Marowak') {
				return this.chainModify(2);
			}
		},
		itemUser: ["Marowak", "Marowak-Alola", "Marowak-Alola-Totem", "Cubone"],
		num: 258,
		gen: 2,
		isNonstandard: "Past",
	},
	throatspray: {
		name: "Throat Spray",
		spritenum: 713,
		fling: {
			basePower: 30,
		},
		onAfterMoveSecondarySelf(target, source, move) {
			if (move.flags['sound']) {
				target.useItem();
			}
		},
		boosts: {
			spa: 1,
		},
		num: 1118,
		gen: 8,
	},
	thunderstone: {
		name: "Thunder Stone",
		spritenum: 492,
		fling: {
			basePower: 30,
		},
		num: 83,
		gen: 1,
		rating: 0,
	},
	timerball: {
		name: "Timer Ball",
		spritenum: 494,
		num: 10,
		gen: 3,
		isPokeball: true,
	},
	toxicorb: {
		name: "Toxic Orb",
		spritenum: 515,
		fling: {
			basePower: 30,
			status: 'tox',
		},
		onResidualOrder: 28,
		onResidualSubOrder: 3,
		onResidual(pokemon) {
			pokemon.trySetStatus('tox', pokemon);
		},
		num: 272,
		gen: 4,
	},
	toxicplate: {
		name: "Toxic Plate",
		spritenum: 516,
		onPlate: 'Poison',
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Poison') {
				return this.chainModify([4915, 4096]);
			}
		},
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 493) || pokemon.baseSpecies.num === 493) {
				return false;
			}
			return true;
		},
		forcedForme: "Arceus-Poison",
		num: 304,
		gen: 4,
	},
	tr00: {
		name: "TR00",
		fling: {
			basePower: 10,
		},
		spritenum: 721,
		num: 1130,
		gen: 8,
		isNonstandard: "Past",
	},
	tr01: {
		name: "TR01",
		fling: {
			basePower: 85,
		},
		spritenum: 721,
		num: 1131,
		gen: 8,
		isNonstandard: "Past",
	},
	tr02: {
		name: "TR02",
		fling: {
			basePower: 90,
		},
		spritenum: 730,
		num: 1132,
		gen: 8,
		isNonstandard: "Past",
	},
	tr03: {
		name: "TR03",
		fling: {
			basePower: 110,
		},
		spritenum: 731,
		num: 1133,
		gen: 8,
		isNonstandard: "Past",
	},
	tr04: {
		name: "TR04",
		fling: {
			basePower: 90,
		},
		spritenum: 731,
		num: 1134,
		gen: 8,
		isNonstandard: "Past",
	},
	tr05: {
		name: "TR05",
		fling: {
			basePower: 90,
		},
		spritenum: 735,
		num: 1135,
		gen: 8,
		isNonstandard: "Past",
	},
	tr06: {
		name: "TR06",
		fling: {
			basePower: 110,
		},
		spritenum: 735,
		num: 1136,
		gen: 8,
		isNonstandard: "Past",
	},
	tr07: {
		name: "TR07",
		fling: {
			basePower: 10,
		},
		spritenum: 722,
		num: 1137,
		gen: 8,
		isNonstandard: "Past",
	},
	tr08: {
		name: "TR08",
		fling: {
			basePower: 90,
		},
		spritenum: 733,
		num: 1138,
		gen: 8,
		isNonstandard: "Past",
	},
	tr09: {
		name: "TR09",
		fling: {
			basePower: 110,
		},
		spritenum: 733,
		num: 1139,
		gen: 8,
		isNonstandard: "Past",
	},
	tr10: {
		name: "TR10",
		fling: {
			basePower: 100,
		},
		spritenum: 725,
		num: 1140,
		gen: 8,
		isNonstandard: "Past",
	},
	tr11: {
		name: "TR11",
		fling: {
			basePower: 90,
		},
		spritenum: 734,
		num: 1141,
		gen: 8,
		isNonstandard: "Past",
	},
	tr12: {
		name: "TR12",
		fling: {
			basePower: 10,
		},
		spritenum: 734,
		num: 1142,
		gen: 8,
		isNonstandard: "Past",
	},
	tr13: {
		name: "TR13",
		fling: {
			basePower: 10,
		},
		spritenum: 721,
		num: 1143,
		gen: 8,
		isNonstandard: "Past",
	},
	tr14: {
		name: "TR14",
		fling: {
			basePower: 10,
		},
		spritenum: 721,
		num: 1144,
		gen: 8,
		isNonstandard: "Past",
	},
	tr15: {
		name: "TR15",
		fling: {
			basePower: 110,
		},
		spritenum: 730,
		num: 1145,
		gen: 8,
		isNonstandard: "Past",
	},
	tr16: {
		name: "TR16",
		fling: {
			basePower: 80,
		},
		spritenum: 731,
		num: 1146,
		gen: 8,
		isNonstandard: "Past",
	},
	tr17: {
		name: "TR17",
		fling: {
			basePower: 10,
		},
		spritenum: 734,
		num: 1147,
		gen: 8,
		isNonstandard: "Past",
	},
	tr18: {
		name: "TR18",
		fling: {
			basePower: 80,
		},
		spritenum: 727,
		num: 1148,
		gen: 8,
		isNonstandard: "Past",
	},
	tr19: {
		name: "TR19",
		fling: {
			basePower: 80,
		},
		spritenum: 721,
		num: 1149,
		gen: 8,
		isNonstandard: "Past",
	},
	tr20: {
		name: "TR20",
		fling: {
			basePower: 10,
		},
		spritenum: 721,
		num: 1150,
		gen: 8,
		isNonstandard: "Past",
	},
	tr21: {
		name: "TR21",
		fling: {
			basePower: 10,
		},
		spritenum: 722,
		num: 1151,
		gen: 8,
		isNonstandard: "Past",
	},
	tr22: {
		name: "TR22",
		fling: {
			basePower: 90,
		},
		spritenum: 724,
		num: 1152,
		gen: 8,
		isNonstandard: "Past",
	},
	tr23: {
		name: "TR23",
		fling: {
			basePower: 10,
		},
		spritenum: 725,
		num: 1153,
		gen: 8,
		isNonstandard: "Past",
	},
	tr24: {
		name: "TR24",
		fling: {
			basePower: 120,
		},
		spritenum: 736,
		num: 1154,
		gen: 8,
		isNonstandard: "Past",
	},
	tr25: {
		name: "TR25",
		fling: {
			basePower: 80,
		},
		spritenum: 734,
		num: 1155,
		gen: 8,
		isNonstandard: "Past",
	},
	tr26: {
		name: "TR26",
		fling: {
			basePower: 10,
		},
		spritenum: 721,
		num: 1156,
		gen: 8,
		isNonstandard: "Past",
	},
	tr27: {
		name: "TR27",
		fling: {
			basePower: 10,
		},
		spritenum: 721,
		num: 1157,
		gen: 8,
		isNonstandard: "Past",
	},
	tr28: {
		name: "TR28",
		fling: {
			basePower: 120,
		},
		spritenum: 727,
		num: 1158,
		gen: 8,
		isNonstandard: "Past",
	},
	tr29: {
		name: "TR29",
		fling: {
			basePower: 10,
		},
		spritenum: 721,
		num: 1159,
		gen: 8,
		isNonstandard: "Past",
	},
	tr30: {
		name: "TR30",
		fling: {
			basePower: 10,
		},
		spritenum: 721,
		num: 1160,
		gen: 8,
		isNonstandard: "Past",
	},
	tr31: {
		name: "TR31",
		fling: {
			basePower: 100,
		},
		spritenum: 729,
		num: 1161,
		gen: 8,
		isNonstandard: "Past",
	},
	tr32: {
		name: "TR32",
		fling: {
			basePower: 80,
		},
		spritenum: 737,
		num: 1162,
		gen: 8,
		isNonstandard: "Past",
	},
/*
NARRATOR:
(Black screen with text; The sound of buzzing bees can be heard)
According to all known laws
of aviation,
 :
there is no way a bee
should be able to fly.
 :
Its wings are too small to get
its fat little body off the ground.
 :
The bee, of course, flies anyway
 :
because bees don't care
what humans think is impossible.
BARRY BENSON:
(Barry is picking out a shirt)
Yellow, black. Yellow, black.
Yellow, black. Yellow, black.
 :
Ooh, black and yellow!
Let's shake it up a little.
JANET BENSON:
Barry! Breakfast is ready!
BARRY:
Coming!
 :
Hang on a second.
(Barry uses his antenna like a phone)
 :
Hello?
ADAM FLAYMAN:

(Through phone)
- Barry?
BARRY:
- Adam?
ADAM:
- Can you believe this is happening?
BARRY:
- I can't. I'll pick you up.
(Barry flies down the stairs)
 :
MARTIN BENSON:
Looking sharp.
JANET:
Use the stairs. Your father
paid good money for those.
BARRY:
Sorry. I'm excited.
MARTIN:
Here's the graduate.
We're very proud of you, son.
 :
A perfect report card, all B's.
JANET:
Very proud.
(Rubs Barry's hair)
BARRY=
Ma! I got a thing going here.
JANET:
- You got lint on your fuzz.
BARRY:
- Ow! That's me!

JANET:
- Wave to us! We'll be in row 118,000.
- Bye!
(Barry flies out the door)
JANET:
Barry, I told you,
stop flying in the house!
(Barry drives through the hive,and is waved at by Adam who is reading a
newspaper)
BARRY==
- Hey, Adam.
ADAM:
- Hey, Barry.
(Adam gets in Barry's car)
 :
- Is that fuzz gel?
BARRY:
- A little. Special day, graduation.
ADAM:
Never thought I'd make it.
(Barry pulls away from the house and continues driving)
BARRY:
Three days grade school,
three days high school...
ADAM:
Those were awkward.
BARRY:
Three days college. I'm glad I took
a day and hitchhiked around the hive.
ADAM==
You did come back different.
(Barry and Adam pass by Artie, who is jogging)
ARTIE:
- Hi, Barry!

BARRY:
- Artie, growing a mustache? Looks good.
ADAM:
- Hear about Frankie?
BARRY:
- Yeah.
ADAM==
- You going to the funeral?
BARRY:
- No, I'm not going to his funeral.
 :
Everybody knows,
sting someone, you die.
 :
Don't waste it on a squirrel.
Such a hothead.
ADAM:
I guess he could have
just gotten out of the way.
(The car does a barrel roll on the loop-shaped bridge and lands on the
highway)
 :
I love this incorporating
an amusement park into our regular day.
BARRY:
I guess that's why they say we don't need vacations.
(Barry parallel parks the car and together they fly over the graduating
students)
Boy, quite a bit of pomp...
under the circumstances.
(Barry and Adam sit down and put on their hats)
 :
- Well, Adam, today we are men.

ADAM:
- We are!
BARRY=
- Bee-men.
=ADAM=
- Amen!
BARRY AND ADAM:
Hallelujah!
(Barry and Adam both have a happy spasm)
ANNOUNCER:
Students, faculty, distinguished bees,
 :
please welcome Dean Buzzwell.
DEAN BUZZWELL:
Welcome, New Hive Oity
graduating class of...
 :
...9:
 :
That concludes our ceremonies.
 :
And begins your career
at Honex Industries!
ADAM:
Will we pick our job today?
(Adam and Barry get into a tour bus)
BARRY=
I heard it's just orientation.
(Tour buses rise out of the ground and the students are automatically
loaded into the buses)
TOUR GUIDE:
Heads up! Here we go.

ANNOUNCER:
Keep your hands and antennas
inside the tram at all times.
BARRY:
- Wonder what it'll be like?
ADAM:
- A little scary.
TOUR GUIDE==
Welcome to Honex,
a division of Honesco
 :
and a part of the Hexagon Group.
Barry:
This is it!
BARRY AND ADAM:
Wow.
BARRY:
Wow.
(The bus drives down a road an on either side are the Bee's massive
complicated Honey-making machines)
TOUR GUIDE:
We know that you, as a bee,
have worked your whole life
 :
to get to the point where you
can work for your whole life.
 :
Honey begins when our valiant Pollen
Jocks bring the nectar to the hive.
 :
Our top-secret formula
 :
is automatically color-corrected,

scent-adjusted and bubble-contoured
 :
into this soothing sweet syrup
 :
with its distinctive
golden glow you know as...
EVERYONE ON BUS:
Honey!
(The guide has been collecting honey into a bottle and she throws it into
the crowd on the bus and it is caught by a girl in the back)
ADAM:
- That girl was hot.
BARRY:
- She's my cousin!
ADAM==
- She is?
BARRY:
- Yes, we're all cousins.
ADAM:
- Right. You're right.
TOUR GUIDE:
- At Honex, we constantly strive
 :
to improve every aspect
of bee existence.
 :
These bees are stress-testing
a new helmet technology.
(The bus passes by a Bee wearing a helmet who is being smashed into the
ground with fly-swatters, newspapers and boots. He lifts a thumbs up but
you can hear him groan)
 :
ADAM==

- What do you think he makes?
BARRY:
- Not enough.
TOUR GUIDE:
Here we have our latest advancement,
the Krelman.
(They pass by a turning wheel with Bees standing on pegs, who are each
wearing a finger-shaped hat)
Barry:
- Wow, What does that do?
TOUR GUIDE:
- Catches that little strand of honey
 :
that hangs after you pour it.
Saves us millions.
ADAM:
(Intrigued)
Can anyone work on the Krelman?
TOUR GUIDE:
Of course. Most bee jobs are
small ones.
But bees know that every small job,
if it's done well, means a lot.
 :
But choose carefully
 :
because you'll stay in the job
you pick for the rest of your life.
(Everyone claps except for Barry)
BARRY:
The same job the rest of your life?
I didn't know that.
ADAM:

What's the difference?
TOUR GUIDE:
You'll be happy to know that bees,
as a species, haven't had one day off
 :
in 27 million years.
BARRY:
(Upset)
So you'll just work us to death?
 :
We'll sure try.
(Everyone on the bus laughs except Barry. Barry and Adam are walking back
home together)
ADAM:
Wow! That blew my mind!
BARRY:
"What's the difference?"
How can you say that?
 :
One job forever?
That's an insane choice to have to make.
ADAM:
I'm relieved. Now we only have
to make one decision in life.
BARRY:
But, Adam, how could they
never have told us that?
ADAM:
Why would you question anything?
We're bees.
 :
We're the most perfectly
functioning society on Earth.

BARRY:
You ever think maybe things
work a little too well here?
ADAM:
Like what? Give me one example.
(Barry and Adam stop walking and it is revealed to the audience that
hundreds of cars are speeding by and narrowly missing them in perfect
unison)
BARRY:
I don't know. But you know
what I'm talking about.
ANNOUNCER:
Please clear the gate.
Royal Nectar Force on approach.
BARRY:
Wait a second. Check it out.
(The Pollen jocks fly in, circle around and landing in line)
 :
- Hey, those are Pollen Jocks!
ADAM:
- Wow.
 :
I've never seen them this close.
BARRY:
They know what it's like
outside the hive.
ADAM:
Yeah, but some don't come back.
GIRL BEES:
- Hey, Jocks!
- Hi, Jocks!
(The Pollen Jocks hook up their backpacks to machines that pump the nectar
to trucks, which drive away)

LOU LO DUVA:
You guys did great!
 :
You're monsters!
You're sky freaks!
I love it!
(Punching the Pollen Jocks in joy)
I love it!
ADAM:
- I wonder where they were.
BARRY:
- I don't know.
 :
Their day's not planned.
 :
Outside the hive, flying who knows
where, doing who knows what.
 :
You can't just decide to be a Pollen
Jock. You have to be bred for that.
ADAM==
Right.
(Barry and Adam are covered in some pollen that floated off of the Pollen
Jocks)
BARRY:
Look at that. That's more pollen
than you and I will see in a lifetime.
ADAM:
It's just a status symbol.
Bees make too much of it.
BARRY:
Perhaps. Unless you're wearing it
and the ladies see you wearing it.
(Barry waves at 2 girls standing a little away from them)

ADAM==
Those ladies?
Aren't they our cousins too?
BARRY:
Distant. Distant.
POLLEN JOCK #1:
Look at these two.
POLLEN JOCK #2:
- Couple of Hive Harrys.
POLLEN JOCK #1:
- Let's have fun with them.
GIRL BEE #1:
It must be dangerous
being a Pollen Jock.
BARRY:
Yeah. Once a bear pinned me
against a mushroom!
 :
He had a paw on my throat,
and with the other, he was slapping me!
(Slaps Adam with his hand to represent his scenario)
GIRL BEE #2:
- Oh, my!
BARRY:
- I never thought I'd knock him out.
GIRL BEE #1:
(Looking at Adam)
What were you doing during this?
ADAM:
Obviously I was trying to alert the authorities.
BARRY:
I can autograph that.

(The pollen jocks walk up to Barry and Adam, they pretend that Barry and
Adam really are pollen jocks.)
POLLEN JOCK #1:
A little gusty out there today,
wasn't it, comrades?
BARRY:
Yeah. Gusty.
POLLEN JOCK #1:
We're hitting a sunflower patch
six miles from here tomorrow.
BARRY:
- Six miles, huh?
ADAM:
- Barry!
POLLEN JOCK #2:
A puddle jump for us,
but maybe you're not up for it.
BARRY:
- Maybe I am.
ADAM:
- You are not!
POLLEN JOCK #1:
We're going 0900 at J-Gate.
 :
What do you think, buzzy-boy?
Are you bee enough?
BARRY:
I might be. It all depends
on what 0900 means.
(The scene cuts to Barry looking out on the hive-city from his balcony at
night)
MARTIN:

Hey, Honex!
BARRY:
Dad, you surprised me.
MARTIN:
You decide what you're interested in?
BARRY:
- Well, there's a lot of choices.
- But you only get one.
 :
Do you ever get bored
doing the same job every day?
MARTIN:
Son, let me tell you about stirring.
 :
You grab that stick, and you just
move it around, and you stir it around.
 :
You get yourself into a rhythm.
It's a beautiful thing.
BARRY:
You know, Dad,
the more I think about it,
 :
maybe the honey field
just isn't right for me.
MARTIN:
You were thinking of what,
making balloon animals?
 :
That's a bad job
for a guy with a stinger.
 :

Janet, your son's not sure
he wants to go into honey!
JANET:
- Barry, you are so funny sometimes.
BARRY:
- I'm not trying to be funny.
MARTIN:
You're not funny! You're going
into honey. Our son, the stirrer!
JANET:
- You're gonna be a stirrer?
BARRY:
- No one's listening to me!
MARTIN:
Wait till you see the sticks I have.
BARRY:
I could say anything right now.
I'm gonna get an ant tattoo!
(Barry's parents don't listen to him and continue to ramble on)
MARTIN:
Let's open some honey and celebrate!
BARRY:
Maybe I'll pierce my thorax.
Shave my antennae.
 :
Shack up with a grasshopper. Get
a gold tooth and call everybody "dawg"!
JANET:
I'm so proud.
(The scene cuts to Barry and Adam waiting in line to get a job)
ADAM:
- We're starting work today!

BARRY:
- Today's the day.
ADAM:
Come on! All the good jobs
will be gone.
BARRY:
Yeah, right.
JOB LISTER:
Pollen counting, stunt bee, pouring,
stirrer, front desk, hair removal...
BEE IN FRONT OF LINE:
- Is it still available?
JOB LISTER:
- Hang on. Two left!
 :
One of them's yours! Congratulations!
Step to the side.
ADAM:
- What'd you get?
BEE IN FRONT OF LINE:
- Picking crud out. Stellar!
(He walks away)
ADAM:
Wow!
JOB LISTER:
Couple of newbies?
ADAM:
Yes, sir! Our first day! We are ready!
JOB LISTER:
Make your choice.
(Adam and Barry look up at the job board. There are hundreds of constantly
changing panels that contain available or unavailable jobs. It looks very
confusing)

ADAM:
- You want to go first?
BARRY:
- No, you go.
ADAM:
Oh, my. What's available?
JOB LISTER:
Restroom attendant's open,
not for the reason you think.
ADAM:
- Any chance of getting the Krelman?
JOB LISTER:
- Sure, you're on.
(Puts the Krelman finger-hat on Adam's head)
(Suddenly the sign for Krelman closes out)
 :
I'm sorry, the Krelman just closed out.
(Takes Adam's hat off)
Wax monkey's always open.
ADAM:
The Krelman opened up again.
 :
What happened?
JOB LISTER:
A bee died. Makes an opening. See?
He's dead. Another dead one.
 :
Deady. Deadified. Two more dead.
 :
Dead from the neck up.
Dead from the neck down. That's life!

ADAM:
Oh, this is so hard!
(Barry remembers what the Pollen Jock offered him and he flies off)
Heating, cooling,
stunt bee, pourer, stirrer,
 :
humming, inspector number seven,
lint coordinator, stripe supervisor,
 :
mite wrangler. Barry, what
do you think I should... Barry?
(Adam turns around and sees Barry flying away)
 :
Barry!
POLLEN JOCK:
All right, we've got the sunflower patch
in quadrant nine...
ADAM:
(Through phone)
What happened to you?
Where are you?
BARRY:
- I'm going out.
ADAM:
- Out? Out where?
BARRY:
- Out there.
ADAM:
- Oh, no!
BARRY:
I have to, before I go
to work for the rest of my life.
ADAM:

You're gonna die! You're crazy!
(Barry hangs up)
Hello?
POLLEN JOCK #2:
Another call coming in.
 :
If anyone's feeling brave,
there's a Korean deli on 83rd
 :
that gets their roses today.
BARRY:
Hey, guys.
POLLEN JOCK #1 ==
- Look at that.
POLLEN JOCK #2:
- Isn't that the kid we saw yesterday?
LOU LO DUVA:
Hold it, son, flight deck's restricted.
POLLEN JOCK #1:
It's OK, Lou. We're gonna take him up.
(Puts hand on Barry's shoulder)
LOU LO DUVA:
(To Barry) Really? Feeling lucky, are you?
BEE WITH CLIPBOARD:
(To Barry) Sign here, here. Just initial that.
 :
- Thank you.
LOU LO DUVA:
- OK.
 :
You got a rain advisory today,
 :

and as you all know,
bees cannot fly in rain.
 :
So be careful. As always,
watch your brooms,
 :
hockey sticks, dogs,
birds, bears and bats.
 :
Also, I got a couple of reports
of root beer being poured on us.
 :
Murphy's in a home because of it,
babbling like a cicada!
BARRY:
- That's awful.
LOU LO DUVA:
(Still talking through megaphone)
- And a reminder for you rookies,
 :
bee law number one,
absolutely no talking to humans!
 :
All right, launch positions!
POLLEN JOCKS:
(The Pollen Jocks run into formation)
 :
Buzz, buzz, buzz, buzz! Buzz, buzz,
buzz, buzz! Buzz, buzz, buzz, buzz!
LOU LU DUVA:
Black and yellow!
POLLEN JOCKS:

Hello!
POLLEN JOCK #1:
(To Barry)You ready for this, hot shot?
BARRY:
Yeah. Yeah, bring it on.
POLLEN JOCK's:
Wind, check.
 :
- Antennae, check.
- Nectar pack, check.
 :
- Wings, check.
- Stinger, check.
BARRY:
Scared out of my shorts, check.
LOU LO DUVA:
OK, ladies,
 :
let's move it out!
 :
Pound those petunias,
you striped stem-suckers!
 :
All of you, drain those flowers!
(The pollen jocks fly out of the hive)
BARRY:
Wow! I'm out!
 :
I can't believe I'm out!
 :
So blue.

 :
I feel so fast and free!
 :
Box kite!
(Barry flies through the kite)
 :
Wow!
 :
Flowers!
(A pollen jock puts on some high tech goggles that shows flowers similar to
heat sink goggles.)
POLLEN JOCK:
This is Blue Leader.
We have roses visual.
 :
Bring it around 30 degrees and hold.
 :
Roses!
POLLEN JOCK #1:
30 degrees, roger. Bringing it around.
 :
Stand to the side, kid.
It's got a bit of a kick.
(The pollen jock fires a high-tech gun at the flower, shooting tubes that
suck up the nectar from the flower and collects it into a pouch on the gun)
BARRY:
That is one nectar collector!
POLLEN JOCK #1==
- Ever see pollination up close?
BARRY:
- No, sir.
POLLEN JOCK #1:

(Barry and the Pollen jock fly over the field, the pollen jock sprinkles
pollen as he goes)
 :
I pick up some pollen here, sprinkle it
over here. Maybe a dash over there,
 :
a pinch on that one.
See that? It's a little bit of magic.
BARRY:
That's amazing. Why do we do that?
POLLEN JOCK #1:
That's pollen power. More pollen, more
flowers, more nectar, more honey for us.
BARRY:
Cool.
POLLEN JOCK #1:
I'm picking up a lot of bright yellow.
could be daisies. Don't we need those?
POLLEN JOCK #2:
Copy that visual.
 :
Wait. One of these flowers
seems to be on the move.
POLLEN JOCK #1:
Say again? You're reporting
a moving flower?
POLLEN JOCK #2:
Affirmative.
(The Pollen jocks land near the "flowers" which, to the audience are
obviously just tennis balls)
KEN:
(In the distance) That was on the line!

POLLEN JOCK #1:
This is the coolest. What is it?
POLLEN JOCK #2:
I don't know, but I'm loving this color.
 :
It smells good.
Not like a flower, but I like it.
POLLEN JOCK #1:
Yeah, fuzzy.
(Sticks his hand on the ball but it gets stuck)
POLLEN JOCK #3==
Chemical-y.
(The pollen jock finally gets his hand free from the tennis ball)
POLLEN JOCK #1:
Careful, guys. It's a little grabby.
(The pollen jocks turn around and see Barry lying his entire body on top of
one of the tennis balls)
POLLEN JOCK #2:
My sweet lord of bees!
POLLEN JOCK #3:
Candy-brain, get off there!
POLLEN JOCK #1:
(Pointing upwards)
Problem!
(A human hand reaches down and grabs the tennis ball that Barry is stuck
to)
BARRY:
- Guys!
POLLEN JOCK #2:
- This could be bad.
POLLEN JOCK #3:
Affirmative.
(Vanessa Bloome starts bouncing the tennis ball, not knowing Barry is stick
to it)

BARRY==
Very close.
 :
Gonna hurt.
 :
Mama's little boy.
(Barry is being hit back and forth by two humans playing tennis. He is
still stuck to the ball)
POLLEN JOCK #1:
You are way out of position, rookie!
KEN:
Coming in at you like a MISSILE!
(Barry flies past the pollen jocks, still stuck to the ball)
BARRY:
(In slow motion)
Help me!
POLLEN JOCK #2:
I don't think these are flowers.
POLLEN JOCK #3:
- Should we tell him?
POLLEN JOCK #1:
- I think he knows.
BARRY:
What is this?!
KEN:
Match point!
 :
You can start packing up, honey,
because you're about to EAT IT!
(A pollen jock coughs which confused Ken and he hits the ball the wrong way
with Barry stuck to it and it goes flying into the city)
BARRY:

Yowser!
(Barry bounces around town and gets stuck in the engine of a car. He flies
into the air conditioner and sees a bug that was frozen in there)
BARRY:
Ew, gross.
(The man driving the car turns on the air conditioner which blows Barry
into the car)
GIRL IN CAR:
There's a bee in the car!
 :
- Do something!
DAD DRIVING CAR:
- I'm driving!
BABY GIRL:
(Waving at Barry)
- Hi, bee.
(Barry smiles and waves at the baby girl)
GUY IN BACK OF CAR:
- He's back here!
 :
He's going to sting me!
GIRL IN CAR:
Nobody move. If you don't move,
he won't sting you. Freeze!
(Barry freezes as well, hovering in the middle of the car)
 :
GRANDMA IN CAR==
He blinked!
(The grandma whips out some bee-spray and sprays everywhere in the car,
climbing into the front seat, still trying to spray Barry)
GIRL IN CAR:
Spray him, Granny!
DAD DRIVING THE CAR:
What are you doing?!
(Barry escapes the car through the air conditioner and is flying high above

the ground, safe.)
BARRY:
Wow... the tension level
out here is unbelievable.
(Barry sees that storm clouds are gathering and he can see rain clouds
moving into this direction)
 :
I gotta get home.
 :
Can't fly in rain.
 :
Can't fly in rain.
(A rain drop hits Barry and one of his wings is damaged)
 :
Can't fly in rain.
(A second rain drop hits Barry again and he spirals downwards)
Mayday! Mayday! Bee going down!
(WW2 plane sound effects are played as he plummets, and he crash-lands on a
plant inside an apartment near the window)
VANESSA BLOOME:
Ken, could you close
the window please?
KEN==
Hey, check out my new resume.
I made it into a fold-out brochure.
 :
You see?
(Folds brochure resume out)
Folds out.
(Ken closes the window, trapping Barry inside)
BARRY:
Oh, no. More humans. I don't need this.
(Barry tries to fly away but smashes into the window and falls again)
 :
What was that?

(Barry keeps trying to fly out the window but he keeps being knocked back
because the window is closed)
Maybe this time. This time. This time.
This time! This time! This...
 :
Drapes!
(Barry taps the glass. He doesn't understand what it is)
That is diabolical.
KEN:
It's fantastic. It's got all my special
skills, even my top-ten favorite movies.
ANDY:
What's number one? Star Wars?
KEN:
Nah, I don't go for that...
(Ken makes finger guns and makes "pew pew pew" sounds and then stops)
 :
...kind of stuff.
BARRY:
No wonder we shouldn't talk to them.
They're out of their minds.
KEN:
When I leave a job interview, they're
flabbergasted, can't believe what I say.
BARRY:
(Looking at the light on the ceiling)
There's the sun. Maybe that's a way out.
(Starts flying towards the lightbulb)
 :
I don't remember the sun
having a big 75 on it.
(Barry hits the lightbulb and falls into the dip on the table that the
humans are sitting at)
KEN:

I predicted global warming.
 :
I could feel it getting hotter.
At first I thought it was just me.
(Andy dips a chip into the bowl and scoops up some dip with Barry on it and
is about to put it in his mouth)
 :
Wait! Stop! Bee!
(Andy drops the chip with Barry in fear and backs away. All the humans
freak out)
 :
Stand back. These are winter boots.
(Ken has winter boots on his hands and he is about to smash the bee but
Vanessa saves him last second)
VANESSA:
Wait!
 :
Don't kill him!
(Vanessa puts Barry in a glass to protect him)
KEN:
You know I'm allergic to them!
This thing could kill me!
VANESSA:
Why does his life have
less value than yours?
KEN:
Why does his life have any less value
than mine? Is that your statement?
VANESSA:
I'm just saying all life has value. You
don't know what he's capable of feeling.
(Vanessa picks up Ken's brochure and puts it under the glass so she can
carry Barry back to the window. Barry looks at Vanessa in amazement)
KEN:

My brochure!
VANESSA:
There you go, little guy.
(Vanessa opens the window and lets Barry out but Barry stays back and is
still shocked that a human saved his life)
KEN:
I'm not scared of him.
It's an allergic thing.
VANESSA:
Put that on your resume brochure.
KEN:
My whole face could puff up.
ANDY:
Make it one of your special skills.
KEN:
Knocking someone out
is also a special skill.
(Ken walks to the door)
Right. Bye, Vanessa. Thanks.
 :
- Vanessa, next week? Yogurt night?
VANESSA:
- Sure, Ken. You know, whatever.
 :
(Vanessa tries to close door)
KEN==
- You could put carob chips on there.
VANESSA:
- Bye.
(Closes door but Ken opens it again)
KEN:
- Supposed to be less calories.

VANESSA:
- Bye.
(Closes door)
(Fast forward to the next day, Barry is still inside the house. He flies
into the kitchen where Vanessa is doing dishes)
BARRY==
(Talking to himself)
I gotta say something.
 :
She saved my life.
I gotta say something.
 :
All right, here it goes.
(Turns back)
Nah.
 :
What would I say?
 :
I could really get in trouble.
 :
It's a bee law.
You're not supposed to talk to a human.
 :
I can't believe I'm doing this.
 :
I've got to.
(Barry disguises himself as a character on a food can as Vanessa walks by
again)
 :
Oh, I can't do it. Come on!
 :
No. Yes. No.
 :
Do it. I can't.

 :
How should I start it?
(Barry strikes a pose and wiggles his eyebrows)
"You like jazz?"
No, that's no good.
(Vanessa is about to walk past Barry)
Here she comes! Speak, you fool!
 :
...Hi!
(Vanessa gasps and drops the dishes in fright and notices Barry on the
counter)
 :
I'm sorry.
VANESSA:
- You're talking.
BARRY:
- Yes, I know.
VANESSA:
(Pointing at Barry)
You're talking!
BARRY:
I'm so sorry.
VANESSA:
No, it's OK. It's fine.
I know I'm dreaming.
 :
But I don't recall going to bed.
BARRY:
Well, I'm sure this
is very disconcerting.
VANESSA:
This is a bit of a surprise to me.
I mean, you're a bee!

BARRY:
I am. And I'm not supposed
to be doing this,
(Pointing to the living room where Ken tried to kill him last night)
but they were all trying to kill me.
 :
And if it wasn't for you...
 :
I had to thank you.
It's just how I was raised.
(Vanessa stabs her hand with a fork to test whether she's dreaming or not)
 :
That was a little weird.
VANESSA:
- I'm talking with a bee.
BARRY:
- Yeah.
VANESSA:
I'm talking to a bee.
And the bee is talking to me!
BARRY:
I just want to say I'm grateful.
I'll leave now.
(Barry turns to leave)
VANESSA:
- Wait! How did you learn to do that?
BARRY:
(Flying back)
- What?
VANESSA:
The talking...thing.
BARRY:

Same way you did, I guess.
"Mama, Dada, honey." You pick it up.
VANESSA:
- That's very funny.
BARRY:
- Yeah.
 :
Bees are funny. If we didn't laugh,
we'd cry with what we have to deal with.
 :
Anyway...
VANESSA:
Can I...
 :
...get you something?
BARRY:
- Like what?
VANESSA:
I don't know. I mean...
I don't know. Coffee?
BARRY:
I don't want to put you out.
VANESSA:
It's no trouble. It takes two minutes.
 :
- It's just coffee.
BARRY:
- I hate to impose.
(Vanessa starts making coffee)
VANESSA:
- Don't be ridiculous!

BARRY:
- Actually, I would love a cup.
VANESSA:
Hey, you want rum cake?
BARRY:
- I shouldn't.
VANESSA:
- Have some.
BARRY:
- No, I can't.
VANESSA:
- Come on!
BARRY:
I'm trying to lose a couple micrograms.
VANESSA:
- Where?
BARRY:
- These stripes don't help.
VANESSA:
You look great!
BARRY:
I don't know if you know
anything about fashion.
 :
Are you all right?
VANESSA:
(Pouring coffee on the floor and missing the cup completely)
No.
(Flash forward in time. Barry and Vanessa are sitting together at a table
on top of the apartment building drinking coffee)

 :
BARRY==
He's making the tie in the cab
as they're flying up Madison.
 :
He finally gets there.
 :
He runs up the steps into the church.
The wedding is on.
 :
And he says, "Watermelon?
I thought you said Guatemalan.
 :
Why would I marry a watermelon?"
(Barry laughs but Vanessa looks confused)
VANESSA:
Is that a bee joke?
BARRY:
That's the kind of stuff we do.
VANESSA:
Yeah, different.
 :
So, what are you gonna do, Barry?
(Barry stands on top of a sugar cube floating in his coffee and paddles it
around with a straw like it's a gondola)
BARRY:
About work? I don't know.
 :
I want to do my part for the hive,
but I can't do it the way they want.
VANESSA:
I know how you feel.

BARRY:
- You do?
VANESSA:
- Sure.
 :
My parents wanted me to be a lawyer or
a doctor, but I wanted to be a florist.
BARRY:
- Really?
VANESSA:
- My only interest is flowers.
BARRY:
Our new queen was just elected
with that same campaign slogan.
 :
Anyway, if you look...
(Barry points to a tree in the middle of Central Park)
 :
There's my hive right there. See it?
VANESSA:
You're in Sheep Meadow!
BARRY:
Yes! I'm right off the Turtle Pond!
VANESSA:
No way! I know that area.
I lost a toe ring there once.
BARRY:
- Why do girls put rings on their toes?
VANESSA:
- Why not?
BARRY:

- It's like putting a hat on your knee.
VANESSA:
- Maybe I'll try that.
(A custodian installing a lightbulb looks over at them but to his
perspective it looks like Vanessa is talking to a cup of coffee on the
table)
CUSTODIAN:
- You all right, ma'am?
VANESSA:
- Oh, yeah. Fine.
 :
Just having two cups of coffee!
BARRY:
Anyway, this has been great.
Thanks for the coffee.
VANESSA==
Yeah, it's no trouble.
BARRY:
Sorry I couldn't finish it. If I did,
I'd be up the rest of my life.
(Barry points towards the rum cake)
 :
Can I take a piece of this with me?
VANESSA:
Sure! Here, have a crumb.
(Vanessa hands Barry a crumb but it is still pretty big for Barry)
BARRY:
- Thanks!
VANESSA:
- Yeah.
BARRY:
All right. Well, then...
I guess I'll see you around.

 :
Or not.
VANESSA:
OK, Barry...
BARRY:
And thank you
so much again... for before.
VANESSA:
Oh, that? That was nothing.
BARRY:
Well, not nothing, but... Anyway...
(Vanessa and Barry hold hands, but Vanessa has to hold out a finger because
her hands is to big and Barry holds that)
(The custodian looks over again and it appears Vanessa is laughing at her
coffee again. The lightbulb that he was screwing in sparks and he falls off
the ladder)
(Fast forward in time and we see two Bee Scientists testing out a parachute
in a Honex wind tunnel)
BEE SCIENTIST #1:
This can't possibly work.
BEE SCIENTIST #2:
He's all set to go.
We may as well try it.
 :
OK, Dave, pull the chute.
(Dave pulls the chute and the wind slams him against the wall and he falls
on his face.The camera pans over and we see Barry and Adam walking
together)
ADAM:
- Sounds amazing.
BARRY:
- It was amazing!
 :
It was the scariest,
happiest moment of my life.

ADAM:
Humans! I can't believe
you were with humans!
 :
Giant, scary humans!
What were they like?
BARRY:
Huge and crazy. They talk crazy.
 :
They eat crazy giant things.
They drive crazy.
ADAM:
- Do they try and kill you, like on TV?
BARRY:
- Some of them. But some of them don't.
ADAM:
- How'd you get back?
BARRY:
- Poodle.
ADAM:
You did it, and I'm glad. You saw
whatever you wanted to see.
 :
You had your "experience." Now you
can pick out your job and be normal.
BARRY:
- Well...
ADAM:
- Well?
BARRY:
Well, I met someone.

ADAM:
You did? Was she Bee-ish?
 :
- A wasp?! Your parents will kill you!
BARRY:
- No, no, no, not a wasp.
ADAM:
- Spider?
BARRY:
- I'm not attracted to spiders.
 :
I know, for everyone else, it's the hottest thing,
with the eight legs and all.
 :
I can't get by that face.
ADAM:
So who is she?
BARRY:
She's... human.
ADAM:
No, no. That's a bee law.
You wouldn't break a bee law.
BARRY:
- Her name's Vanessa.
(Adam puts his head in his hands)
ADAM:
- Oh, boy.
BARRY==
She's so nice. And she's a florist!
ADAM:
Oh, no! You're dating a human florist!

BARRY:
We're not dating.
ADAM:
You're flying outside the hive, talking
to humans that attack our homes
 :
with power washers and M-80s!
That's one-eighth a stick of dynamite!
BARRY:
She saved my life!
And she understands me.
ADAM:
This is over!
BARRY:
Eat this.
(Barry gives Adam a piece of the crumb that he got from Vanessa. Adam eats
it)
ADAM:
(Adam's tone changes)
This is not over! What was that?
BARRY:
- They call it a crumb.
ADAM:
- It was so stingin' stripey!
BARRY:
And that's not what they eat.
That's what falls off what they eat!
 :
- You know what a Cinnabon is?
ADAM:
- No.
(Adam opens a door behind him and he pulls Barry in)

BARRY:
It's bread and cinnamon and frosting.
ADAM:
Be quiet!
BARRY:
They heat it up...
ADAM:
Sit down!
(Adam forces Barry to sit down)
BARRY:
(Still rambling about Cinnabons)
...really hot!
(Adam grabs Barry by the shoulders)
ADAM:
- Listen to me!
 :
We are not them! We're us.
There's us and there's them!
BARRY==
Yes, but who can deny
the heart that is yearning?
ADAM:
There's no yearning.
Stop yearning. Listen to me!
 :
You have got to start thinking bee,
my friend. Thinking bee!
BARRY:
- Thinking bee.
WORKER BEE:
- Thinking bee.
WORKER BEES AND ADAM:
Thinking bee! Thinking bee!

Thinking bee! Thinking bee!
(Flash forward in time; Barry is laying on a raft in a pool full of honey.
He is wearing sunglasses)
JANET:
There he is. He's in the pool.
MARTIN:
You know what your problem is, Barry?
(Barry pulls down his sunglasses and he looks annoyed)
BARRY:
(Sarcastic)
I gotta start thinking bee?
JANET:
How much longer will this go on?
MARTIN:
It's been three days!
Why aren't you working?
(Puts sunglasses back on)
BARRY:
I've got a lot of big life decisions
to think about.
MARTIN:
What life? You have no life!
You have no job. You're barely a bee!
JANET:
Would it kill you
to make a little honey?
(Barry rolls off the raft and sinks into the honey pool)
 :
Barry, come out.
Your father's talking to you.
 :
Martin, would you talk to him?
MARTIN:

Barry, I'm talking to you!
(Barry keeps sinking into the honey until he is suddenly in Central Park
having a picnic with Vanessa)
(Barry has a cup of honey and he clinks his glass with Vanessas. Suddenly a
mosquito lands on Vanessa and she slaps it, killing it. They both gasp but
then burst out laughing)
VANESSA:
You coming?
(The camera pans over and Vanessa is climbing into a small yellow airplane)
BARRY:
Got everything?
VANESSA:
All set!
BARRY:
Go ahead. I'll catch up.
(Vanessa lifts off and flies ahead)
VANESSA:
Don't be too long.
(Barry catches up with Vanessa and he sticks out his arms like ana irplane.
He rolls from side to side, and Vanessa copies him with the airplane)
VANESSA:
Watch this!
(Barry stays back and watches as Vanessa draws a heart in the air using
pink smoke from the plane, but on the last loop-the-loop she suddenly
crashes into a mountain and the plane explodes. The destroyed plane falls
into some rocks and explodes a second time)
BARRY:
Vanessa!
(As Barry is yelling his mouth fills with honey and he wakes up,
discovering that he was just day dreaming. He slowly sinks back into the
honey pool)
MARTIN:
- We're still here.

JANET:
- I told you not to yell at him.
 :
He doesn't respond to yelling!
MARTIN:
- Then why yell at me?
JANET:
- Because you don't listen!
MARTIN:
I'm not listening to this.
BARRY:
Sorry, I've gotta go.
MARTIN:
- Where are you going?
BARRY:
- I'm meeting a friend.
JANET:
A girl? Is this why you can't decide?
BARRY:
Bye.
(Barry flies out the door and Martin shakes his head)
 :
JANET==
I just hope she's Bee-ish.
(Fast forward in time and Barry is sitting on Vanessa's shoulder and she is
closing up her shop)
BARRY:
They have a huge parade
of flowers every year in Pasadena?
VANESSA:
To be in the Tournament of Roses,
that's every florist's dream!

 :
Up on a float, surrounded
by flowers, crowds cheering.
BARRY:
A tournament. Do the roses
compete in athletic events?
VANESSA:
No. All right, I've got one.
How come you don't fly everywhere?
BARRY:
It's exhausting. Why don't you
run everywhere? It's faster.
VANESSA:
Yeah, OK, I see, I see.
All right, your turn.
BARRY:
TiVo. You can just freeze live TV?
That's insane!
VANESSA:
You don't have that?
BARRY:
We have Hivo, but it's a disease.
It's a horrible, horrible disease.
VANESSA:
Oh, my.
(A human walks by and Barry narrowly avoids him)
PASSERBY:
Dumb bees!
VANESSA:
You must want to sting all those jerks.
BARRY:
We try not to sting.

It's usually fatal for us.
VANESSA:
So you have to watch your temper
(They walk into a store)
BARRY:
Very carefully.
You kick a wall, take a walk,
 :
write an angry letter and throw it out.
Work through it like any emotion:
 :
Anger, jealousy, lust.
(Suddenly an employee(Hector) hits Barry off of Vanessa's shoulder. Hector
thinks he's saving Vanessa)
VANESSA:
(To Barry)
Oh, my goodness! Are you OK?
(Barry is getting up off the floor)
BARRY:
Yeah.
VANESSA:
(To Hector)
- What is wrong with you?!
HECTOR:
(Confused)
- It's a bug.
VANESSA:
He's not bothering anybody.
Get out of here, you creep!
(Vanessa hits Hector across the face with the magazine he had and then hits
him in the head. Hector backs away covering his head)
Barry:
What was that? A Pic 'N' Save circular?
(Vanessa sets Barry back on her shoulder)

VANESSA:
Yeah, it was. How did you know?
BARRY:
It felt like about 10 pages.
Seventy-five is pretty much our limit.
VANESSA:
You've really got that
down to a science.
BARRY:
- Oh, we have to. I lost a cousin to Italian Vogue.
VANESSA:
- I'll bet.
(Barry looks to his right and notices there is honey for sale in the aisle)
BARRY:
What in the name
of Mighty Hercules is this?
(Barry looks at all the brands of honey, shocked)
How did this get here?
Cute Bee, Golden Blossom,
 :
Ray Liotta Private Select?
(Barry puts his hands up and slowly turns around, a look of disgust on his
face)
VANESSA:
- Is he that actor?
BARRY:
- I never heard of him.
 :
- Why is this here?
VANESSA:
- For people. We eat it.
BARRY:

You don't have
enough food of your own?!
(Hector looks back and notices that Vanessa is talking to Barry)
VANESSA:
- Well, yes.
BARRY:
- How do you get it?
VANESSA:
- Bees make it.
BARRY:
- I know who makes it!
 :
And it's hard to make it!
 :
There's heating, cooling, stirring.
You need a whole Krelman thing!
VANESSA:
- It's organic.
BARRY:
- It's our-ganic!
VANESSA:
It's just honey, Barry.
BARRY:
Just what?!
 :
Bees don't know about this!
This is stealing! A lot of stealing!
 :
You've taken our homes, schools,
hospitals! This is all we have!
 :

And it's on sale?!
I'm getting to the bottom of this.
 :
I'm getting to the bottom
of all of this!
(Flash forward in time; Barry paints his face with black strikes like a
soldier and sneaks into the storage section of the store)
(Two men, including Hector, are loading boxes into some trucks)
 :
SUPERMARKET EMPLOYEE==
Hey, Hector.
 :
- You almost done?
HECTOR:
- Almost.
(Barry takes a step to peak around the corner)
(Whispering)
He is here. I sense it.
 :
Well, I guess I'll go home now
(Hector pretends to walk away by walking in place and speaking loudly)
 :
and just leave this nice honey out,
with no one around.
BARRY:
You're busted, box boy!
HECTOR:
I knew I heard something!
So you can talk!
BARRY:
I can talk.
And now you'll start talking!
 :
Where you getting the sweet stuff?

Who's your supplier?
HECTOR:
I don't understand.
I thought we were friends.
 :
The last thing we want
to do is upset bees!
(Hector takes a thumbtack out of the board behind him and sword-fights
Barry. Barry is using his stinger like a sword)
 :
You're too late! It's ours now!
BARRY:
You, sir, have crossed
the wrong sword!
HECTOR:
You, sir, will be lunch
for my iguana, Ignacio!
(Barry hits the thumbtack out of Hectors hand and Hector surrenders)
Barry:
Where is the honey coming from?
 :
Tell me where!
HECTOR:
(Pointing to leaving truck)
Honey Farms! It comes from Honey Farms!
(Barry chases after the truck but it is getting away. He flies onto a
bicyclists' backpack and he catches up to the truck)
CAR DRIVER:
(To bicyclist)
Crazy person!
(Barry flies off and lands on the windshield of the Honey farms truck.
Barry looks around and sees dead bugs splattered everywhere)
BARRY:
What horrible thing has happened here?

 :
These faces, they never knew
what hit them. And now
 :
they're on the road to nowhere!
(Barry hears a sudden whisper)
(Barry looks up and sees Mooseblood, a mosquito playing dead)
MOOSEBLOOD:
Just keep still.
BARRY:
What? You're not dead?
MOOSEBLOOD:
Do I look dead? They will wipe anything
that moves. Where you headed?
BARRY:
To Honey Farms.
I am onto something huge here.
MOOSEBLOOD:
I'm going to Alaska. Moose blood,
crazy stuff. Blows your head off!
ANOTHER BUG PLAYING DEAD:
I'm going to Tacoma.
(Barry looks at another bug)
BARRY:
- And you?
MOOSEBLOOD:
- He really is dead.
BARRY:
All right.
(Another bug hits the windshield and the drivers notice. They activate the
windshield wipers)
MOOSEBLOOD==
Uh-oh!
(The windshield wipers are slowly sliding over the dead bugs and wiping

them off)
BARRY:
- What is that?!
MOOSEBLOOD:
- Oh, no!
 :
- A wiper! Triple blade!
BARRY:
- Triple blade?
MOOSEBLOOD:
Jump on! It's your only chance, bee!
(Mooseblood and Barry grab onto the wiper and they hold on as it wipes the
windshield)
Why does everything have
to be so doggone clean?!
 :
How much do you people need to see?!
(Bangs on windshield)
 :
Open your eyes!
Stick your head out the window!
RADIO IN TRUCK:
From NPR News in Washington,
I'm Carl Kasell.
MOOSEBLOOD:
But don't kill no more bugs!
(Mooseblood and Barry are washed off by the wipr fluid)
MOOSEBLOOD:
- Bee!
BARRY:
- Moose blood guy!!
(Barry starts screaming as he hangs onto the antenna)
(Suddenly it is revealed that a water bug is also hanging on the antenna.

There is a pause and then Barry and the water bug both start screaming)
TRUCK DRIVER:
- You hear something?
GUY IN TRUCK:
- Like what?
TRUCK DRIVER:
Like tiny screaming.
GUY IN TRUCK:
Turn off the radio.
(The antenna starts to lower until it gets to low and sinks into the truck.
The water bug flies off and Barry is forced to let go and he is blown away.
He luckily lands inside a horn on top of the truck where he finds
Mooseblood, who was blown into the same place)
MOOSEBLOOD:
Whassup, bee boy?
BARRY:
Hey, Blood.
(Fast forward in time and we see that Barry is deep in conversation with
Mooseblood. They have been sitting in this truck for a while)
BARRY:
...Just a row of honey jars,
as far as the eye could see.
MOOSEBLOOD:
Wow!
BARRY:
I assume wherever this truck goes
is where they're getting it.
 :
I mean, that honey's ours.
MOOSEBLOOD:
- Bees hang tight.
BARRY:

- We're all jammed in.
 :
It's a close community.
MOOSEBLOOD:
Not us, man. We on our own.
Every mosquito on his own.
BARRY:
- What if you get in trouble?
MOOSEBLOOD:
- You a mosquito, you in trouble.
 :
Nobody likes us. They just smack.
See a mosquito, smack, smack!
BARRY:
At least you're out in the world.
You must meet girls.
MOOSEBLOOD:
Mosquito girls try to trade up,
get with a moth, dragonfly.
 :
Mosquito girl don't want no mosquito.
(An ambulance passes by and it has a blood donation sign on it)
You got to be kidding me!
 :
Mooseblood's about to leave
the building! So long, bee!
(Mooseblood leaves and flies onto the window of the ambulance where there
are other mosquito's hanging out)
 :
- Hey, guys!
OTHER MOSQUITO:
- Mooseblood!

MOOSEBLOOD:
I knew I'd catch y'all down here.
Did you bring your crazy straw?
(The truck goes out of view and Barry notices that the truck he's on is
pulling into a camp of some sort)
TRUCK DRIVER:
We throw it in jars, slap a label on it,
and it's pretty much pure profit.
(Barry flies out)
BARRY:
What is this place?
BEEKEEPER 1#:
A bee's got a brain
the size of a pinhead.
BEEKEEPER #2:
They are pinheads!
 :
Pinhead.
 :
- Check out the new smoker.
BEEKEEPER #1:
- Oh, sweet. That's the one you want.
 :
The Thomas 3000!
BARRY:
Smoker?
BEEKEEPER #1:
Ninety puffs a minute, semi-automatic.
Twice the nicotine, all the tar.
 :
A couple breaths of this
knocks them right out.

BEEKEEPER #2:
They make the honey,
and we make the money.
BARRY:
"They make the honey,
and we make the money"?
(The Beekeeper sprays hundreds of cheap miniature apartments with the
smoker. The bees are fainting or passing out)
Oh, my!
 :
What's going on? Are you OK?
(Barry flies into one of the apartment and helps a Bee couple get off the
ground. They are coughing and its hard for them to stand)
BEE IN APARTMENT:
Yeah. It doesn't last too long.
BARRY:
Do you know you're
in a fake hive with fake walls?
BEE IN APPARTMENT:
Our queen was moved here.
We had no choice.
(The apartment room is completely empty except for a photo on the wall of
the "queen" who is obviously a man in women's clothes)
BARRY:
This is your queen?
That's a man in women's clothes!
 :
That's a drag queen!
 :
What is this?
(Barry flies out and he discovers that there are hundreds of these
structures, each housing thousands of Bees)
Oh, no!
 :
There's hundreds of them!
(Barry takes out his camera and takes pictures of these Bee work camps. The
beekeepers look very evil in these depictions)

Bee honey.
 :
Our honey is being brazenly stolen
on a massive scale!
 :
This is worse than anything bears
have done! I intend to do something.
(Flash forward in time and Barry is showing these pictures to his parents)
JANET:
Oh, Barry, stop.
MARTIN:
Who told you humans are taking
our honey? That's a rumor.
BARRY:
Do these look like rumors?
(Holds up the pictures)
UNCLE CARL:
That's a conspiracy theory.
These are obviously doctored photos.
JANET:
How did you get mixed up in this?
ADAM:
He's been talking to humans.
JANET:
- What?
MARTIN:
- Talking to humans?!
ADAM:
He has a human girlfriend.
And they make out!
JANET:
Make out? Barry!

BARRY:
We do not.
ADAM:
- You wish you could.
MARTIN:
- Whose side are you on?
BARRY:
The bees!
UNCLE CARL:
(He has been sitting in the back of the room this entire time)
I dated a cricket once in San Antonio.
Those crazy legs kept me up all night.
JANET:
Barry, this is what you want
to do with your life?
BARRY:
I want to do it for all our lives.
Nobody works harder than bees!
 :
Dad, I remember you
coming home so overworked
 :
your hands were still stirring.
You couldn't stop.
JANET:
I remember that.
BARRY:
What right do they have to our honey?
 :
We live on two cups a year. They put it
in lip balm for no reason whatsoever!

ADAM:
Even if it's true, what can one bee do?
BARRY:
Sting them where it really hurts.
MARTIN:
In the face! The eye!
 :
- That would hurt.
BARRY:
- No.
MARTIN:
Up the nose? That's a killer.
BARRY:
There's only one place you can sting
the humans, one place where it matters.
(Flash forward a bit in time and we are watching the Bee News)
BEE NEWS NARRATOR:
Hive at Five, the hive's only
full-hour action news source.
BEE PROTESTOR:
No more bee beards!
BEE NEWS NARRATOR:
With Bob Bumble at the anchor desk.
 :
Weather with Storm Stinger.
 :
Sports with Buzz Larvi.
 :
And Jeanette Chung.
BOB BUMBLE:
- Good evening. I'm Bob Bumble.
JEANETTE CHUNG:

- And I'm Jeanette Chung.
BOB BUMBLE:
A tri-county bee, Barry Benson,
 :
intends to sue the human race
for stealing our honey,
 :
packaging it and profiting
from it illegally!
JEANETTE CHUNG:
Tomorrow night on Bee Larry King,
 :
we'll have three former queens here in
our studio, discussing their new book,
 :
Classy Ladies,
out this week on Hexagon.
(The scene changes to an interview on the news with Bee version of Larry
King and Barry)
BEE LARRY KING:
Tonight we're talking to Barry Benson.
 :
Did you ever think, "I'm a kid
from the hive. I can't do this"?
BARRY:
Bees have never been afraid
to change the world.
 :
What about Bee Columbus?
Bee Gandhi? Bejesus?
BEE LARRY KING:
Where I'm from, we'd never sue humans.

 :
We were thinking
of stickball or candy stores.
BARRY:
How old are you?
BEE LARRY KING:
The bee community
is supporting you in this case,
 :
which will be the trial
of the bee century.
BARRY:
You know, they have a Larry King
in the human world too.
BEE LARRY KING:
It's a common name. Next week...
BARRY:
He looks like you and has a show
and suspenders and colored dots...
BEE LARRY KING:
Next week...
BARRY:
Glasses, quotes on the bottom from the
guest even though you just heard 'em.
BEE LARRY KING:
Bear Week next week!
They're scary, hairy and here, live.
(Bee Larry King gets annoyed and flies away offscreen)
BARRY:
Always leans forward, pointy shoulders,
squinty eyes, very Jewish.
(Flash forward in time. We see Vanessa enter and Ken enters behind her.
They are arguing)

KEN:
In tennis, you attack
at the point of weakness!
VANESSA:
It was my grandmother, Ken. She's 81.
KEN==
Honey, her backhand's a joke!
I'm not gonna take advantage of that?
BARRY:
(To Ken)
Quiet, please.
Actual work going on here.
KEN:
(Pointing at Barry)
- Is that that same bee?
VANESSA:
- Yes, it is!
 :
I'm helping him sue the human race.
BARRY:
- Hello.
KEN:
- Hello, bee.
VANESSA:
This is Ken.
BARRY:
(Recalling the "Winter Boots" incident earlier)
Yeah, I remember you. Timberland, size
ten and a half. Vibram sole, I believe.
KEN:
(To Vanessa)
Why does he talk again?
VANESSA:

Listen, you better go
'cause we're really busy working.
KEN:
But it's our yogurt night!
VANESSA:
(Holding door open for Ken)
Bye-bye.
KEN:
(Yelling)
Why is yogurt night so difficult?!
(Ken leaves and Vanessa walks over to Barry. His workplace is a mess)
VANESSA:
You poor thing.
You two have been at this for hours!
BARRY:
Yes, and Adam here
has been a huge help.
ADAM:
- Frosting...
- How many sugars?
 ==BARRY==
Just one. I try not
to use the competition.
 :
So why are you helping me?
VANESSA:
Bees have good qualities.
 :
And it takes my mind off the shop.
 :
Instead of flowers, people
are giving balloon bouquets now.
BARRY:

Those are great, if you're three.
VANESSA:
And artificial flowers.
BARRY:
- Oh, those just get me psychotic!
VANESSA:
- Yeah, me too.
 :
BARRY:
Bent stingers, pointless pollination.
ADAM:
Bees must hate those fake things!
 :
Nothing worse
than a daffodil that's had work done.
 :
Maybe this could make up
for it a little bit.
VANESSA:
- This lawsuit's a pretty big deal.
BARRY:
- I guess.
ADAM:
You sure you want to go through with it?
BARRY:
Am I sure? When I'm done with
the humans, they won't be able
 :
to say, "Honey, I'm home,"
without paying a royalty!
(Flash forward in time and we are watching the human news. The camera shows

a crowd outside a courthouse)
NEWS REPORTER:
It's an incredible scene
here in downtown Manhattan,
 :
where the world anxiously waits,
because for the first time in history,
 :
we will hear for ourselves
if a honeybee can actually speak.
(We are no longer watching through a news camera)
ADAM:
What have we gotten into here, Barry?
BARRY:
It's pretty big, isn't it?
ADAM==
(Looking at the hundreds of people around the courthouse)
I can't believe how many humans
don't work during the day.
BARRY:
You think billion-dollar multinational
food companies have good lawyers?
SECURITY GUARD:
Everybody needs to stay
behind the barricade.
(A limousine drives up and a fat man,Layton Montgomery, a honey industry
owner gets out and walks past Barry)
ADAM:
- What's the matter?
BARRY:
- I don't know, I just got a chill.
(Fast forward in time and everyone is in the court)
MONTGOMERY:
Well, if it isn't the bee team.

(To Honey Industry lawyers)
You boys work on this?
MAN:
All rise! The Honorable
Judge Bumbleton presiding.
JUDGE BUMBLETON:
All right. Case number 4475,
 :
Superior Court of New York,
Barry Bee Benson v. the Honey Industry
 :
is now in session.
 :
Mr. Montgomery, you're representing
the five food companies collectively?
MONTGOMERY:
A privilege.
JUDGE BUMBLETON:
Mr. Benson... you're representing
all the bees of the world?
(Everyone looks closely, they are waiting to see if a Bee can really talk)
(Barry makes several buzzing sounds to sound like a Bee)
BARRY:
I'm kidding. Yes, Your Honor,
we're ready to proceed.
JUDGE BUMBLBETON:
Mr. Montgomery,
your opening statement, please.
MONTGOMERY:
Ladies and gentlemen of the jury,
 :
my grandmother was a simple woman.
 :

Born on a farm, she believed
it was man's divine right
 :
to benefit from the bounty
of nature God put before us.
 :
If we lived in the topsy-turvy world
Mr. Benson imagines,
 :
just think of what would it mean.
 :
I would have to negotiate
with the silkworm
 :
for the elastic in my britches!
 :
Talking bee!
(Montgomery walks over and looks closely at Barry)
 :
How do we know this isn't some sort of
 :
holographic motion-picture-capture
Hollywood wizardry?
 :
They could be using laser beams!
 :
Robotics! Ventriloquism!
Cloning! For all we know,
 :
he could be on steroids!
JUDGE BUMBLETON:
Mr. Benson?

BARRY:
Ladies and gentlemen,
there's no trickery here.
 :
I'm just an ordinary bee.
Honey's pretty important to me.
 :
It's important to all bees.
We invented it!
 :
We make it. And we protect it
with our lives.
 :
Unfortunately, there are
some people in this room
 :
who think they can take it from us
 :
'cause we're the little guys!
I'm hoping that, after this is all over,
 :
you'll see how, by taking our honey,
you not only take everything we have
 :
but everything we are!
JANET==
(To Martin)
I wish he'd dress like that
all the time. So nice!
JUDGE BUMBLETON:
Call your first witness.
BARRY:
So, Mr. Klauss Vanderhayden

of Honey Farms, big company you have.
KLAUSS VANDERHAYDEN:
I suppose so.
BARRY:
I see you also own
Honeyburton and Honron!
KLAUSS:
Yes, they provide beekeepers
for our farms.
BARRY:
Beekeeper. I find that
to be a very disturbing term.
 :
I don't imagine you employ
any bee-free-ers, do you?
KLAUSS:
(Quietly)
- No.
BARRY:
- I couldn't hear you.
KLAUSS:
- No.
BARRY:
- No.
 :
Because you don't free bees.
You keep bees. Not only that,
 :
it seems you thought a bear would be
an appropriate image for a jar of honey.
KLAUSS:
They're very lovable creatures.

 :
Yogi Bear, Fozzie Bear, Build-A-Bear.
BARRY:
You mean like this?
(The bear from Over The Hedge barges in through the back door and it is
roaring and standing on its hind legs. It is thrashing its claws and people
are screaming. It is being held back by a guard who has the bear on a
chain)
 :
(Pointing to the roaring bear)
Bears kill bees!
 :
How'd you like his head crashing
through your living room?!
 :
Biting into your couch!
Spitting out your throw pillows!
JUDGE BUMBLETON:
OK, that's enough. Take him away.
(The bear stops roaring and thrashing and walks out)
BARRY:
So, Mr. Sting, thank you for being here.
Your name intrigues me.
 :
- Where have I heard it before?
MR. STING:
- I was with a band called The Police.
BARRY:
But you've never been
a police officer, have you?
STING:
No, I haven't.
BARRY:

No, you haven't. And so here
we have yet another example
 :
of bee culture casually
stolen by a human
 :
for nothing more than
a prance-about stage name.
STING:
Oh, please.
BARRY:
Have you ever been stung, Mr. Sting?
 :
Because I'm feeling
a little stung, Sting.
 :
Or should I say... Mr. Gordon M. Sumner!
MONTGOMERY:
That's not his real name?! You idiots!
BARRY:
Mr. Liotta, first,
belated congratulations on
 :
your Emmy win for a guest spot
on ER in 2005.
RAY LIOTTA:
Thank you. Thank you.
BARRY:
I see from your resume
that you're devilishly handsome
 :
with a churning inner turmoil

that's ready to blow.
RAY LIOTTA:
I enjoy what I do. Is that a crime?
BARRY:
Not yet it isn't. But is this
what it's come to for you?
 :
Exploiting tiny, helpless bees
so you don't
 :
have to rehearse
your part and learn your lines, sir?
RAY LIOTTA:
Watch it, Benson!
I could blow right now!
BARRY:
This isn't a goodfella.
This is a badfella!
(Ray Liotta looses it and tries to grab Barry)
RAY LIOTTA:
Why doesn't someone just step on
this creep, and we can all go home?!
JUDGE BUMBLETON:
- Order in this court!
RAY LIOTTA:
- You're all thinking it!
(Judge Bumbleton starts banging her gavel)
JUDGE BUMBLETON:
Order! Order, I say!
RAY LIOTTA:
- Say it!
MAN:

- Mr. Liotta, please sit down!
(We see a montage of magazines which feature the court case)
(Flash forward in time and Barry is back home with Vanessa)
BARRY:
I think it was awfully nice
of that bear to pitch in like that.
VANESSA:
I think the jury's on our side.
BARRY:
Are we doing everything right,you know, legally?
VANESSA:
I'm a florist.
BARRY:
Right. Well, here's to a great team.
VANESSA:
To a great team!
(Ken walks in from work. He sees Barry and he looks upset when he sees
Barry clinking his glass with Vanessa)
KEN:
Well, hello.
VANESSA:
- Oh, Ken!
BARRY:
- Hello!
VANESSA:
I didn't think you were coming.
 :
No, I was just late.
I tried to call, but...
(Ken holds up his phone and flips it open. The phone has no charge)
...the battery...
VANESSA:

I didn't want all this to go to waste,
so I called Barry. Luckily, he was free.
KEN:
Oh, that was lucky.
(Ken sits down at the table across from Barry and Vanessa leaves the room)
VANESSA:
There's a little left.
I could heat it up.
KEN:
(Not taking his eyes off Barry)
Yeah, heat it up, sure, whatever.
BARRY:
So I hear you're quite a tennis player.
 :
I'm not much for the game myself.
The ball's a little grabby.
KEN:
That's where I usually sit.
Right...
(Points to where Barry is sitting)
there.
VANESSA:
(Calling from other room)
Ken, Barry was looking at your resume,
 :
and he agreed with me that eating with
chopsticks isn't really a special skill.
KEN:
(To Barry)
You think I don't see what you're doing?
BARRY:
I know how hard it is to find
the right job. We have that in common.

KEN:
Do we?
BARRY:
Bees have 100 percent employment,
but we do jobs like taking the crud out.
KEN:
(Menacingly)
That's just what
I was thinking about doing.
(Ken reaches for a fork on the table but knocks if on the floor. He goes to
pick it up)
VANESSA:
Ken, I let Barry borrow your razor
for his fuzz. I hope that was all right.
(Ken quickly rises back up after hearing this but hits his head on the
table and yells)
BARRY:
I'm going to drain the old stinger.
KEN:
Yeah, you do that.
(Barry flies past Ken to get to the bathroom and Ken freaks out, splashing
some of the wine he was using to cool his head in his eyes. He yells in
anger)
(Barry looks at the magazines featuring his victories in court)
BARRY:
Look at that.
(Barry flies into the bathroom)
(He puts his hand on his head but this makes hurts him and makes him even
madder. He yells again)
(Barry is washing his hands in the sink but then Ken walks in)
KEN:
You know, you know I've just about had it
(Closes bathroom door behind him)
with your little mind games.
(Ken is menacingly rolling up a magazine)
BARRY:

(Backing away)
- What's that?
KEN:
- Italian Vogue.
BARRY:
Mamma mia, that's a lot of pages.
KEN:
It's a lot of ads.
BARRY:
Remember what Van said, why is
your life more valuable than mine?
KEN:
That's funny, I just can't seem to recall that!
(Ken smashes everything off the sink with the magazine and Barry narrowly
escapes)
(Ken follows Barry around and tries to hit him with the magazine but he
keeps missing)
(Ken gets a spray bottle)
 :
I think something stinks in here!
BARRY:
(Enjoying the spray)
I love the smell of flowers.
(Ken holds a lighter in front of the spray bottle)
KEN:
How do you like the smell of flames?!
BARRY:
Not as much.
(Ken fires his make-shift flamethrower but misses Barry, burning the
bathroom. He torches the whole room but looses his footing and falls into
the bathtub. After getting hit in the head by falling objects 3 times he
picks up the shower head, revealing a Water bug hiding under it)
WATER BUG:
Water bug! Not taking sides!

(Barry gets up out of a pile of bathroom supplies and he is wearing a
chapstick hat)
BARRY:
Ken, I'm wearing a Chapstick hat!
This is pathetic!
(Ken switches the shower head to lethal)
KEN:
I've got issues!
(Ken sprays Barry with the shower head and he crash lands into the toilet)
(Ken menacingly looks down into the toilet at Barry)
Well, well, well, a royal flush!
BARRY:
- You're bluffing.
KEN:
- Am I?
(flushes toilet)
(Barry grabs a chapstick from the toilet seat and uses it to surf in the
flushing toilet)
BARRY:
Surf's up, dude!
(Barry flies out of the toilet on the chapstick and sprays Ken's face with
the toilet water)
 :
EW,Poo water!
BARRY:
That bowl is gnarly.
KEN:
(Aiming a toilet cleaner at Barry)
Except for those dirty yellow rings!
(Barry cowers and covers his head and Vanessa runs in and takes the toilet
cleaner from Ken just before he hits Barry)
VANESSA:
Kenneth! What are you doing?!
KEN==
(Leaning towards Barry)

You know, I don't even like honey!
I don't eat it!
VANESSA:
We need to talk!
(Vanessa pulls Ken out of the bathroom)
 :
He's just a little bee!
 :
And he happens to be
the nicest bee I've met in a long time!
KEN:
Long time? What are you talking about?!
Are there other bugs in your life?
VANESSA:
No, but there are other things bugging
me in life. And you're one of them!
KEN:
Fine! Talking bees, no yogurt night...
 :
My nerves are fried from riding
on this emotional roller coaster!
VANESSA:
Goodbye, Ken.
(Ken huffs and walks out and slams the door. But suddenly he walks back in
and stares at Barry)
 :
And for your information,
I prefer sugar-free, artificial
sweeteners MADE BY MAN!
(Ken leaves again and Vanessa leans in towards Barry)
VANESSA:
I'm sorry about all that.
(Ken walks back in again)

KEN:
I know it's got
an aftertaste! I LIKE IT!
(Ken leaves for the last time)
VANESSA:
I always felt there was some kind
of barrier between Ken and me.
 :
I couldn't overcome it.
Oh, well.
 :
Are you OK for the trial?
BARRY:
I believe Mr. Montgomery
is about out of ideas.
(Flash forward in time and Barry, Adam, and Vanessa are back in court)
MONTGOMERY--
We would like to call
Mr. Barry Benson Bee to the stand.
ADAM:
Good idea! You can really see why he's
considered one of the best lawyers...
(Barry stares at Adam)
...Yeah.
LAWYER:
Layton, you've
gotta weave some magic
with this jury,
or it's gonna be all over.
MONTGOMERY:
Don't worry. The only thing I have
to do to turn this jury around
 :
is to remind them
of what they don't like about bees.
(To lawyer)

- You got the tweezers?
LAWYER:
- Are you allergic?
MONTGOMERY:
Only to losing, son. Only to losing.
 :
Mr. Benson Bee, I'll ask you
what I think we'd all like to know.
 :
What exactly is your relationship
(Points to Vanessa)
 :
to that woman?
BARRY:
We're friends.
MONTGOMERY:
- Good friends?
BARRY:
- Yes.
MONTGOMERY:
How good? Do you live together?
ADAM:
Wait a minute...
 :
MONTGOMERY:
Are you her little...
 :
...bedbug?
(Adam's stinger starts vibrating. He is agitated)
I've seen a bee documentary or two.
From what I understand,

 :
doesn't your queen give birth
to all the bee children?
BARRY:
- Yeah, but...
MONTGOMERY:
(Pointing at Janet and Martin)
- So those aren't your real parents!
JANET:
- Oh, Barry...
BARRY:
- Yes, they are!
ADAM:
Hold me back!
(Vanessa tries to hold Adam back. He wants to sting Montgomery)
MONTGOMERY:
You're an illegitimate bee,
aren't you, Benson?
ADAM:
He's denouncing bees!
MONTGOMERY:
Don't y'all date your cousins?
(Montgomery leans over on the jury stand and stares at Adam)
VANESSA:
- Objection!
(Vanessa raises her hand to object but Adam gets free. He flies straight at
Montgomery)
=ADAM:
- I'm going to pincushion this guy!
BARRY:
Adam, don't! It's what he wants!
(Adam stings Montgomery in the butt and he starts thrashing around)

MONTGOMERY:
Oh, I'm hit!!
 :
Oh, lordy, I am hit!
JUDGE BUMBLETON:
(Banging gavel)
Order! Order!
MONTGOMERY:
(Overreacting)
The venom! The venom
is coursing through my veins!
 :
I have been felled
by a winged beast of destruction!
 :
You see? You can't treat them
like equals! They're striped savages!
 :
Stinging's the only thing
they know! It's their way!
BARRY:
- Adam, stay with me.
ADAM:
- I can't feel my legs.
MONTGOMERY:
(Overreacting and throwing his body around the room)
What angel of mercy
will come forward to suck the poison
 :
from my heaving buttocks?
JUDGE BUMLBETON:
I will have order in this court. Order!

 :
Order, please!
(Flash forward in time and we see a human news reporter)
NEWS REPORTER:
The case of the honeybees
versus the human race
 :
took a pointed turn against the bees
 :
yesterday when one of their legal
team stung Layton T. Montgomery.
(Adam is laying in a hospital bed and Barry flies in to see him)
BARRY:
- Hey, buddy.
ADAM:
- Hey.
BARRY:
- Is there much pain?
ADAM:
- Yeah.
 :
I...
 :
I blew the whole case, didn't I?
BARRY:
It doesn't matter. What matters is
you're alive. You could have died.
ADAM:
I'd be better off dead. Look at me.
(A small plastic sword is replaced as Adam's stinger)
They got it from the cafeteria
downstairs, in a tuna sandwich.

 :
Look, there's
a little celery still on it.
(Flicks off the celery and sighs)
BARRY:
What was it like to sting someone?
ADAM:
I can't explain it. It was all...
 :
All adrenaline and then...
and then ecstasy!
BARRY:
...All right.
ADAM:
You think it was all a trap?
BARRY:
Of course. I'm sorry.
I flew us right into this.
 :
What were we thinking? Look at us. We're
just a couple of bugs in this world.
ADAM:
What will the humans do to us
if they win?
BARRY:
I don't know.
ADAM:
I hear they put the roaches in motels.
That doesn't sound so bad.
BARRY:
Adam, they check in,
but they don't check out!

ADAM:
Oh, my.
(Coughs)
Could you get a nurse
to close that window?
BARRY:
- Why?
ADAM:
- The smoke.
(We can see that two humans are smoking cigarettes outside)
 :
Bees don't smoke.
BARRY:
Right. Bees don't smoke.
 :
Bees don't smoke!
But some bees are smoking.
 :
That's it! That's our case!
ADAM:
It is? It's not over?
BARRY:
Get dressed. I've gotta go somewhere.
 :
Get back to the court and stall.
Stall any way you can.
(Flash forward in time and Adam is making a paper boat in the courtroom)
ADAM:
And assuming you've done step 29 correctly, you're ready for the tub!
(We see that the jury have each made their own paper boats after being
taught how by Adam. They all look confused)
JUDGE BUMBLETON:

Mr. Flayman.
ADAM:
Yes? Yes, Your Honor!
JUDGE BUMBLETON:
Where is the rest of your team?
ADAM:
(Continues stalling)
Well, Your Honor, it's interesting.
 :
Bees are trained to fly haphazardly,
 :
and as a result,
we don't make very good time.
 :
I actually heard a funny story about...
MONTGOMERY:
Your Honor,
haven't these ridiculous bugs
 :
taken up enough
of this court's valuable time?
 :
How much longer will we allow
these absurd shenanigans to go on?
 :
They have presented no compelling
evidence to support their charges
 :
against my clients,
who run legitimate businesses.
 :
I move for a complete dismissal

of this entire case!
JUDGE BUMBLETON:
Mr. Flayman, I'm afraid I'm going
 :
to have to consider
Mr. Montgomery's motion.
ADAM:
But you can't! We have a terrific case.
MONTGOMERY:
Where is your proof?
Where is the evidence?
 :
Show me the smoking gun!
BARRY:
(Barry flies in through the door)
Hold it, Your Honor!
You want a smoking gun?
 :
Here is your smoking gun.
(Vanessa walks in holding a bee smoker. She sets it down on the Judge's
podium)
JUDGE BUMBLETON:
What is that?
BARRY:
It's a bee smoker!
MONTGOMERY:
(Picks up smoker)
What, this?
This harmless little contraption?
 :
This couldn't hurt a fly,
let alone a bee.
(Montgomery accidentally fires it at the bees in the crowd and they faint

and cough)
(Dozens of reporters start taking pictures of the suffering bees)
BARRY:
Look at what has happened
 :
to bees who have never been asked,
"Smoking or non?"
 :
Is this what nature intended for us?
 :
To be forcibly addicted
to smoke machines
 :
and man-made wooden slat work camps?
 :
Living out our lives as honey slaves
to the white man?
(Barry points to the honey industry owners. One of them is an African
American so he awkwardly separates himself from the others)
LAWYER:
- What are we gonna do?
- He's playing the species card.
BARRY:
Ladies and gentlemen, please,
free these bees!
ADAM AND VANESSA:
Free the bees! Free the bees!
BEES IN CROWD:
Free the bees!
HUMAN JURY:
Free the bees! Free the bees!
JUDGE BUMBLETON:
The court finds in favor of the bees!

BARRY:
Vanessa, we won!
VANESSA:
I knew you could do it! High-five!
(Vanessa hits Barry hard because her hand is too big)
 :
Sorry.
BARRY:
(Overjoyed)
I'm OK! You know what this means?
 :
All the honey
will finally belong to the bees.
 :
Now we won't have
to work so hard all the time.
MONTGOMERY:
This is an unholy perversion
of the balance of nature, Benson.
 :
You'll regret this.
(Montgomery leaves and Barry goes outside the courtroom. Several reporters
start asking Barry questions)
REPORTER 1#:
Barry, how much honey is out there?
BARRY:
All right. One at a time.
REPORTER 2#:
Barry, who are you wearing?
BARRY:
My sweater is Ralph Lauren,
and I have no pants.

(Barry flies outside with the paparazzi and Adam and Vanessa stay back)
ADAM:
(To Vanessa)
- What if Montgomery's right?
Vanessa:
- What do you mean?
ADAM:
We've been living the bee way
a long time, 27 million years.
(Flash forward in time and Barry is talking to a man)
BUSINESS MAN:
Congratulations on your victory.
What will you demand as a settlement?
BARRY:
First, we'll demand a complete shutdown
of all bee work camps.
(As Barry is talking we see a montage of men putting "closed" tape over the
work camps and freeing the bees in the crappy apartments)
Then we want back the honey
that was ours to begin with,
 :
every last drop.
(Men in suits are pushing all the honey of the aisle and into carts)
We demand an end to the glorification
of the bear as anything more
(We see a statue of a bear-shaped honey container being pulled down by
bees)
than a filthy, smelly,
bad-breath stink machine.
 :
We're all aware
of what they do in the woods.
(We see Winnie the Pooh sharing his honey with Piglet in the cross-hairs of
a high-tech sniper rifle)
BARRY:
(Looking through binoculars)

Wait for my signal.
 :
Take him out.
(Winnie gets hit by a tranquilizer dart and dramatically falls off the log
he was standing on, his tongue hanging out. Piglet looks at Pooh in fear
and the Sniper takes the honey.)
SNIPER:
He'll have nausea
for a few hours, then he'll be fine.
(Flash forward in time)
BARRY:
And we will no longer tolerate
bee-negative nicknames...
(Mr. Sting is sitting at home until he is taken out of his house by the men
in suits)
STING:
But it's just a prance-about stage name!
BARRY:
...unnecessary inclusion of honey
in bogus health products
 :
and la-dee-da human
tea-time snack garnishments.
(An old lady is mixing honey into her tea but suddenly men in suits smash
her face down on the table and take the honey)
OLD LADY:
Can't breathe.
(A honey truck pulls up to Barry's hive)
WORKER:
Bring it in, boys!
 :
Hold it right there! Good.
 :
Tap it.

(Tons of honey is being pumped into the hive's storage)
BEE WORKER 1#:
(Honey overflows from the cup)
Mr. Buzzwell, we just passed three cups,
and there's gallons more coming!
 :
- I think we need to shut down!
=BEE WORKER #2=
- Shut down? We've never shut down.
 :
Shut down honey production!
DEAN BUZZWELL:
Stop making honey!
(The bees all leave their stations. Two bees run into a room and they put
the keys into a machine)
Turn your key, sir!
(Two worker bees dramatically turn their keys, which opens the button which
they press, shutting down the honey-making machines. This is the first time
this has ever happened)
BEE:
...What do we do now?
(Flash forward in time and a Bee is about to jump into a pool full of
honey)
Cannonball!
(The bee gets stuck in the honey and we get a short montage of Bees leaving
work)
(We see the Pollen Jocks flying but one of them gets a call on his antenna)
LOU LU DUVA:
(Through "phone")
We're shutting honey production!
 :
Mission abort.
POLLEN JOCK #1:
Aborting pollination and nectar detail.
Returning to base.
(The Pollen Jocks fly back to the hive)

(We get a time lapse of Central Park slowly wilting away as the bees all
relax)
BARRY:
Adam, you wouldn't believe
how much honey was out there.
ADAM:
Oh, yeah?
BARRY:
What's going on? Where is everybody?
(The entire street is deserted)
 :
- Are they out celebrating?
ADAM:
- They're home.
 :
They don't know what to do.
Laying out, sleeping in.
 :
I heard your Uncle Carl was on his way
to San Antonio with a cricket.
BARRY:
At least we got our honey back.
ADAM:
Sometimes I think, so what if humans
liked our honey? Who wouldn't?
 :
It's the greatest thing in the world!
I was excited to be part of making it.
 :
This was my new desk. This was my
new job. I wanted to do it really well.
 :

And now...
 :
Now I can't.
(Flash forward in time and Barry is talking to Vanessa)
BARRY:
I don't understand
why they're not happy.
 :
I thought their lives would be better!
 :
They're doing nothing. It's amazing.
Honey really changes people.
VANESSA:
You don't have any idea
what's going on, do you?
BARRY:
- What did you want to show me?
(Vanessa takes Barry to the rooftop where they first had coffee and points
to her store)
VANESSA:
- This.
(Points at her flowers. They are all grey and wilting)
BARRY:
What happened here?
VANESSA:
That is not the half of it.
(Small flash forward in time and Vanessa and Barry are on the roof of her
store and she points to Central Park)
(We see that Central Park is no longer green and colorful, rather it is
grey, brown, and dead-like. It is very depressing to look at)
BARRY:
Oh, no. Oh, my.
 :

They're all wilting.
VANESSA:
Doesn't look very good, does it?
BARRY:
No.
VANESSA:
And whose fault do you think that is?
BARRY:
You know, I'm gonna guess bees.
VANESSA==
(Staring at Barry)
Bees?
BARRY:
Specifically, me.
 :
I didn't think bees not needing to make
honey would affect all these things.
VANESSA:
It's not just flowers.
Fruits, vegetables, they all need bees.
BARRY:
That's our whole SAT test right there.
VANESSA:
Take away produce, that affects
the entire animal kingdom.
 :
And then, of course...
BARRY:
The human species?
 :
So if there's no more pollination,

 :
it could all just go south here,
couldn't it?
VANESSA:
I know this is also partly my fault.
BARRY:
How about a suicide pact?
VANESSA:
How do we do it?
BARRY:
- I'll sting you, you step on me.
VANESSA:
- That just kills you twice.
BARRY:
Right, right.
VANESSA:
Listen, Barry...
sorry, but I gotta get going.
(Vanessa leaves)
BARRY:
(To himself)
I had to open my mouth and talk.
 :
Vanessa?
 :
Vanessa? Why are you leaving?
Where are you going?
(Vanessa is getting into a taxi)
VANESSA:
To the final Tournament of Roses parade
in Pasadena.
 :

They've moved it to this weekend
because all the flowers are dying.
 :
It's the last chance
I'll ever have to see it.
BARRY:
Vanessa, I just wanna say I'm sorry.
I never meant it to turn out like this.
VANESSA:
I know. Me neither.
(The taxi starts to drive away)
BARRY:
Tournament of Roses.
Roses can't do sports.
 :
Wait a minute. Roses. Roses?
 :
Roses!
 :
Vanessa!
(Barry flies after the Taxi)
VANESSA:
Roses?!
 :
Barry?
(Barry is flying outside the window of the taxi)
BARRY:
- Roses are flowers!
VANESSA:
- Yes, they are.
BARRY:
Flowers, bees, pollen!

VANESSA:
I know.
That's why this is the last parade.
BARRY:
Maybe not.
Could you ask him to slow down?
VANESSA:
Could you slow down?
(The taxi driver screeches to a stop and Barry keeps flying forward)
 :
Barry!
(Barry flies back to the window)
BARRY:
OK, I made a huge mistake.
This is a total disaster, all my fault.
VANESSA:
Yes, it kind of is.
BARRY:
I've ruined the planet.
I wanted to help you
 :
with the flower shop.
I've made it worse.
VANESSA:
Actually, it's completely closed down.
BARRY:
I thought maybe you were remodeling.
 :
But I have another idea, and it's
greater than my previous ideas combined.
VANESSA:
I don't want to hear it!

BARRY:
All right, they have the roses,
the roses have the pollen.
 :
I know every bee, plant
and flower bud in this park.
 :
All we gotta do is get what they've got
back here with what we've got.
 :
- Bees.
VANESSA:
- Park.
BARRY:
- Pollen!
VANESSA:
- Flowers.
BARRY:
- Re-pollination!
VANESSA:
- Across the nation!
 :
Tournament of Roses,
Pasadena, California.
 :
They've got nothing
but flowers, floats and cotton candy.
 :
Security will be tight.
BARRY:
I have an idea.

(Flash forward in time. Vanessa is about to board a plane which has all the
Roses on board.
VANESSA:
Vanessa Bloome, FTD.
(Holds out badge)
 :
Official floral business. It's real.
SECURITY GUARD:
Sorry, ma'am. Nice brooch.
=VANESSA==
Thank you. It was a gift.
(Barry is revealed to be hiding inside the brooch)
(Flash back in time and Barry and Vanessa are discussing their plan)
BARRY:
Once inside,
we just pick the right float.
VANESSA:
How about The Princess and the Pea?
 :
I could be the princess,
and you could be the pea!
BARRY:
Yes, I got it.
 :
- Where should I sit?
GUARD:
- What are you?
BARRY:
- I believe I'm the pea.
GUARD:
- The pea?
VANESSA:

It goes under the mattresses.
GUARD:
- Not in this fairy tale, sweetheart.
- I'm getting the marshal.
VANESSA:
You do that!
This whole parade is a fiasco!
 :
Let's see what this baby'll do.
(Vanessa drives the float through traffic)
GUARD:
Hey, what are you doing?!
BARRY==
Then all we do
is blend in with traffic...
 :
...without arousing suspicion.
 :
Once at the airport,
there's no stopping us.
(Flash forward in time and Barry and Vanessa are about to get on a plane)
SECURITY GUARD:
Stop! Security.
 :
- You and your insect pack your float?
VANESSA:
- Yes.
SECURITY GUARD:
Has it been
in your possession the entire time?
VANESSA:
- Yes.

SECURITY GUARD:
Would you remove your shoes?
(To Barry)
- Remove your stinger.
BARRY:
- It's part of me.
SECURITY GUARD:
I know. Just having some fun.
Enjoy your flight.
(Barry plotting with Vanessa)
BARRY:
Then if we're lucky, we'll have
just enough pollen to do the job.
(Flash forward in time and Barry and Vanessa are flying on the plane)
Can you believe how lucky we are? We
have just enough pollen to do the job!
VANESSA:
I think this is gonna work.
BARRY:
It's got to work.
CAPTAIN SCOTT:
(On intercom)
Attention, passengers,
this is Captain Scott.
 :
We have a bit of bad weather
in New York.
 :
It looks like we'll experience
a couple hours delay.
VANESSA:
Barry, these are cut flowers
with no water. They'll never make it.
BARRY:

I gotta get up there
and talk to them.
VANESSA==
Be careful.
(Barry flies right outside the cockpit door)
BARRY:
Can I get help
with the Sky Mall magazine?
I'd like to order the talking
inflatable nose and ear hair trimmer.
(The flight attendant opens the door and walks out and Barry flies into the
cockpit unseen)
BARRY:
Captain, I'm in a real situation.
CAPTAIN SCOTT:
- What'd you say, Hal?
CO-PILOT HAL:
- Nothing.
(Scott notices Barry and freaks out)
CAPTAIN SCOTT:
Bee!
BARRY:
No,no,no, Don't freak out! My entire species...
(Captain Scott gets out of his seat and tries to suck Barry into a handheld
vacuum)
HAL:
(To Scott)
What are you doing?
(Barry lands on Hals hair but Scott sees him. He tries to suck up Barry but
instead he sucks up Hals toupee)
CAPTAIN SCOTT:
Uh-oh.
BARRY:
- Wait a minute! I'm an attorney!

HAL:
(Hal doesn't know Barry is on his head)
- Who's an attorney?
CAPTAIN SCOTT:
Don't move.
(Scott hits Hal in the face with the vacuum in an attempt to hit Barry. Hal
is knocked out and he falls on the life raft button which launches an
infalatable boat into Scott, who gets knocked out and falls to the floor.
They are both uncounscious.)
BARRY:
(To himself)
Oh, Barry.
BARRY:
(On intercom, with a Southern accent)
Good afternoon, passengers.
This is your captain.
 :
Would a Miss Vanessa Bloome in 24B
please report to the cockpit?
(Vanessa looks confused)
(Normal accent)
...And please hurry!
(Vanessa opens the door and sees the life raft and the uncounscious pilots)
VANESSA:
What happened here?
BARRY:
I tried to talk to them, but
then there was a DustBuster,
a toupee, a life raft exploded.
 :
Now one's bald, one's in a boat,
and they're both unconscious!
VANESSA:
...Is that another bee joke?
BARRY:

- No!
 :
No one's flying the plane!
BUD DITCHWATER:
(Through radio on plane)
This is JFK control tower, Flight 356.
What's your status?
VANESSA:
This is Vanessa Bloome.
I'm a florist from New York.
BUD:
Where's the pilot?
VANESSA:
He's unconscious,
and so is the copilot.
BUD:
Not good. Does anyone onboard
have flight experience?
BARRY:
As a matter of fact, there is.
BUD:
- Who's that?
BARRY:
- Barry Benson.
BUD:
From the honey trial?! Oh, great.
BARRY:
Vanessa, this is nothing more
than a big metal bee.
 :
It's got giant wings, huge engines.

VANESSA:
I can't fly a plane.
BARRY:
- Why not? Isn't John Travolta a pilot?
VANESSA:
- Yes.
BARRY:
How hard could it be?
(Vanessa sits down and flies for a little bit but we see lightning clouds
outside the window)
VANESSA:
Wait, Barry!
We're headed into some lightning.
(An ominous lightning storm looms in front of the plane)
(We are now watching the Bee News)
BOB BUMBLE:
This is Bob Bumble. We have some
late-breaking news from JFK Airport,
 :
where a suspenseful scene
is developing.
 :
Barry Benson,
fresh from his legal victory...
ADAM:
That's Barry!
BOB BUMBLE:
...is attempting to land a plane,
loaded with people, flowers
 :
and an incapacitated flight crew.
JANET, MARTIN, UNCLE CAR AND ADAM:
Flowers?!
(The scene switches to the human news)

REPORTER:
(Talking with Bob Bumble)
We have a storm in the area
and two individuals at the controls
 :
with absolutely no flight experience.
BOB BUMBLE:
Just a minute.
There's a bee on that plane.
BUD:
I'm quite familiar with Mr. Benson
and his no-account compadres.
 :
They've done enough damage.
REPORTER:
But isn't he your only hope?
BUD:
Technically, a bee
shouldn't be able to fly at all.
 :
Their wings are too small...
BARRY:
(Through radio)
Haven't we heard this a million times?
 :
"The surface area of the wings
and body mass make no sense."...
BOB BUMBLE:
- Get this on the air!
BEE:
- Got it.

BEE NEWS CREW:
- Stand by.
BEE NEWS CREW:
- We're going live!
BARRY:
(Through radio on TV)
...The way we work may be a mystery to you.
 :
Making honey takes a lot of bees
doing a lot of small jobs.
 :
But let me tell you about a small job.
 :
If you do it well,
it makes a big difference.
 :
More than we realized.
To us, to everyone.
 :
That's why I want to get bees
back to working together.
 :
That's the bee way!
We're not made of Jell-O.
 :
We get behind a fellow.
 :
- Black and yellow!
BEES:
- Hello!
(The scene switches and Barry is teaching Vanessa how to fly)
BARRY:

Left, right, down, hover.
VANESSA:
- Hover?
BARRY:
- Forget hover.
VANESSA:
This isn't so hard.
(Pretending to honk the horn)
Beep-beep! Beep-beep!
(A Lightning bolt hits the plane and autopilot turns off)
Barry, what happened?!
BARRY:
Wait, I think we were
on autopilot the whole time.
VANESSA:
- That may have been helping me.
BARRY:
- And now we're not!
VANESSA:
So it turns out I cannot fly a plane.
(The plane plummets but we see Lou Lu Duva and the Pollen Jocks, along with
multiple other bees flying towards the plane)
Lou Lu DUva:
All of you, let's get
behind this fellow! Move it out!
 :
Move out!
(The scene switches back to Vanessa and Barry in the plane)
BARRY:
Our only chance is if I do what I'd do,
you copy me with the wings of the plane!
(Barry sticks out his arms like an airplane and flys in front of Vanessa's
face)

VANESSA:
Don't have to yell.
BARRY:
I'm not yelling!
We're in a lot of trouble.
VANESSA:
It's very hard to concentrate
with that panicky tone in your voice!
BARRY:
It's not a tone. I'm panicking!
VANESSA:
I can't do this!
(Barry slaps Vanessa)
BARRY:
Vanessa, pull yourself together.
You have to snap out of it!
VANESSA:
(Slaps Barry)
You snap out of it.
BARRY:
(Slaps Vanessa)
 :
You snap out of it.
VANESSA:
- You snap out of it!
BARRY:
- You snap out of it!
(We see that all the Pollen Jocks are flying under the plane)
VANESSA:
- You snap out of it!
BARRY:
- You snap out of it!

VANESSA:
- You snap out of it!
BARRY:
- You snap out of it!
VANESSA:
- Hold it!
BARRY:
- Why? Come on, it's my turn.
VANESSA:
How is the plane flying?
(The plane is now safely flying)
VANESSA:
I don't know.
(Barry's antennae rings like a phone. Barry picks up)
BARRY:
Hello?
LOU LU DUVA:
(Through "phone")
Benson, got any flowers
for a happy occasion in there?
(All of the Pollen Jocks are carrying the plane)
BARRY:
The Pollen Jocks!
 :
They do get behind a fellow.
LOU LU DUVA:
- Black and yellow.
POLLEN JOCKS:
- Hello.
LOU LU DUVA:
All right, let's drop this tin can

on the blacktop.
BARRY:
Where? I can't see anything. Can you?
VANESSA:
No, nothing. It's all cloudy.
 :
Come on. You got to think bee, Barry.
BARRY:
- Thinking bee.
- Thinking bee.
(On the runway there are millions of bees laying on their backs)
BEES:
Thinking bee!
Thinking bee! Thinking bee!
BARRY:
Wait a minute.
I think I'm feeling something.
VANESSA:
- What?
BARRY:
- I don't know. It's strong, pulling me.
 :
Like a 27-million-year-old instinct.
 :
Bring the nose down.
BEES:
Thinking bee!
Thinking bee! Thinking bee!
CONTROL TOWER OPERATOR:
- What in the world is on the tarmac?
BUD:
- Get some lights on that!

(It is revealed that all the bees are organized into a giant pulsating
flower formation)
BEES:
Thinking bee!
Thinking bee! Thinking bee!
BARRY:
- Vanessa, aim for the flower.
VANESSA:
- OK.
BARRY:
Out the engines. We're going in
on bee power. Ready, boys?
LOU LU DUVA:
Affirmative!
BARRY:
Good. Good. Easy, now. That's it.
 :
Land on that flower!
 :
Ready? Full reverse!
 :
Spin it around!
(The plane's nose is pointed at a flower painted on a nearby plane)
- Not that flower! The other one!
VANESSA:
- Which one?
BARRY:
- That flower.
(The plane is now pointed at a fat guy in a flowered shirt. He freaks out
and tries to take a picture of the plane)
VANESSA:
- I'm aiming at the flower!

BARRY:
That's a fat guy in a flowered shirt.
I mean the giant pulsating flower
made of millions of bees!
(The plane hovers over the bee-flower)
 :
Pull forward. Nose down. Tail up.
 :
Rotate around it.
VANESSA:
- This is insane, Barry!
BARRY:
- This's the only way I know how to fly.
BUD:
Am I koo-koo-kachoo, or is this plane
flying in an insect-like pattern?
(The plane is unrealistically hovering and spinning over the bee-flower)
BARRY:
Get your nose in there. Don't be afraid.
Smell it. Full reverse!
 :
Just drop it. Be a part of it.
 :
Aim for the center!
 :
Now drop it in! Drop it in, woman!
 :
Come on, already.
(The bees scatter and the plane safely lands)
VANESSA:
Barry, we did it!
You taught me how to fly!

BARRY:
- Yes!
(Vanessa is about to high-five Barry)
No high-five!
VANESSA:
- Right.
ADAM:
Barry, it worked!
Did you see the giant flower?
BARRY:
What giant flower? Where? Of course
I saw the flower! That was genius!
ADAM:
- Thank you.
BARRY:
- But we're not done yet.
 :
Listen, everyone!
 :
This runway is covered
with the last pollen
 :
from the last flowers
available anywhere on Earth.
 :
That means this is our last chance.
 :
We're the only ones who make honey,
pollinate flowers and dress like this.
 :
If we're gonna survive as a species,
this is our moment! What do you say?

 :
Are we going to be bees, or just
Museum of Natural History keychains?
BEES:
We're bees!
BEE WHO LIKES KEYCHAINS:
Keychain!
BARRY:
Then follow me! Except Keychain.
POLLEN JOCK #1:
Hold on, Barry. Here.
 :
You've earned this.
BARRY:
Yeah!
 :
I'm a Pollen Jock! And it's a perfect
fit. All I gotta do are the sleeves.
(The Pollen Jocks throw Barry a nectar-collecting gun. Barry catches it)
Oh, yeah.
JANET:
That's our Barry.
(Barry and the Pollen Jocks get pollen from the flowers on the plane)
(Flash forward in time and the Pollen Jocks are flying over NYC)
 :
(Barry pollinates the flowers in Vanessa's shop and then heads to Central
Park)
BOY IN PARK:
Mom! The bees are back!
ADAM:
(Putting on his Krelman hat)
If anybody needs

to make a call, now's the time.
 :
I got a feeling we'll be
working late tonight!
(The bee honey factories are back up and running)
(Meanwhile at Vanessa's shop)
VANESSA:
(To customer)
Here's your change. Have a great
afternoon! Can I help who's next?
 :
Would you like some honey with that?
It is bee-approved. Don't forget these.
(There is a room in the shop where Barry does legal work for other animals.
He is currently talking with a Cow)
COW:
Milk, cream, cheese, it's all me.
And I don't see a nickel!
 :
Sometimes I just feel
like a piece of meat!
BARRY:
I had no idea.
VANESSA:
Barry, I'm sorry.
Have you got a moment?
BARRY:
Would you excuse me?
My mosquito associate will help you.
MOOSEBLOOD:
Sorry I'm late.
COW:
He's a lawyer too?

MOOSEBLOOD:
Ma'am, I was already a blood-sucking parasite.
All I needed was a briefcase.
VANESSA:
Have a great afternoon!
 :
Barry, I just got this huge tulip order,
and I can't get them anywhere.
BARRY:
No problem, Vannie.
Just leave it to me.
VANESSA:
You're a lifesaver, Barry.
Can I help who's next?
BARRY:
All right, scramble, jocks!
It's time to fly.
VANESSA:
Thank you, Barry!
(Ken walks by on the sidewalk and sees the "bee-approved honey" in
Vanessa's shop)
KEN:
That bee is living my life!!
ANDY:
Let it go, Kenny.
KEN:
- When will this nightmare end?!
ANDY:
- Let it all go.
BARRY:
- Beautiful day to fly.
POLLEN JOCK:

- Sure is.
BARRY:
Between you and me,
I was dying to get out of that office.
(Barry recreates the scene near the beginning of the movie where he flies
through the box kite. The movie fades to black and the credits being)
[--after credits; No scene can be seen but the characters can be heard
talking over the credits--]
You have got
to start thinking bee, my friend!
 :
- Thinking bee!
- Me?
BARRY:
(Talking over singer)
Hold it. Let's just stop
for a second. Hold it.
 :
I'm sorry. I'm sorry, everyone.
Can we stop here?
SINGER:
Oh, BarryBARRY:
I'm not making a major life decision
during a production number!
SINGER:
All right. Take ten, everybody.
Wrap it up, guys.
BARRY:
I had virtually no rehearsal for that.
*/
	tr33: {
		name: "TR33",
		fling: {
			basePower: 80,
		},
		spritenum: 728,
		num: 1163,
		gen: 8,
		isNonstandard: "Past",
	},
	tr34: {
		name: "TR34",
		fling: {
			basePower: 120,
		},
		spritenum: 734,
		num: 1164,
		gen: 8,
		isNonstandard: "Past",
	},
	tr35: {
		name: "TR35",
		fling: {
			basePower: 90,
		},
		spritenum: 721,
		num: 1165,
		gen: 8,
		isNonstandard: "Past",
	},
	tr36: {
		name: "TR36",
		fling: {
			basePower: 95,
		},
		spritenum: 730,
		num: 1166,
		gen: 8,
		isNonstandard: "Past",
	},
	tr37: {
		name: "TR37",
		fling: {
			basePower: 10,
		},
		spritenum: 737,
		num: 1167,
		gen: 8,
		isNonstandard: "Past",
	},
	tr38: {
		name: "TR38",
		fling: {
			basePower: 10,
		},
		spritenum: 734,
		num: 1168,
		gen: 8,
		isNonstandard: "Past",
	},
	tr39: {
		name: "TR39",
		fling: {
			basePower: 120,
		},
		spritenum: 722,
		num: 1169,
		gen: 8,
		isNonstandard: "Past",
	},
	tr40: {
		name: "TR40",
		fling: {
			basePower: 10,
		},
		spritenum: 734,
		num: 1170,
		gen: 8,
		isNonstandard: "Past",
	},
	tr41: {
		name: "TR41",
		fling: {
			basePower: 85,
		},
		spritenum: 730,
		num: 1171,
		gen: 8,
		isNonstandard: "Past",
	},
	tr42: {
		name: "TR42",
		fling: {
			basePower: 90,
		},
		spritenum: 721,
		num: 1172,
		gen: 8,
		isNonstandard: "Past",
	},
	tr43: { // WAIT I THINK THIS ONE IS THE TR FOR OVERHEAT, IGNORE TR71
		name: "TR43",
		fling: {
			basePower: 130,
		},
		spritenum: 730,
		num: 1173,
		gen: 8,
		isNonstandard: "Past",
	},
	tr44: {
		name: "TR44",
		fling: {
			basePower: 10,
		},
		spritenum: 734,
		num: 1174,
		gen: 8,
		isNonstandard: "Past",
	},
	tr45: {
		name: "TR45",
		fling: {
			basePower: 90,
		},
		spritenum: 731,
		num: 1175,
		gen: 8,
		isNonstandard: "Past",
	},
	tr46: {
		name: "TR46",
		fling: {
			basePower: 10,
		},
		spritenum: 729,
		num: 1176,
		gen: 8,
		isNonstandard: "Past",
	},
	tr47: {
		name: "TR47",
		fling: {
			basePower: 80,
		},
		spritenum: 736,
		num: 1177,
		gen: 8,
		isNonstandard: "Past",
	},
	tr48: {
		name: "TR48",
		fling: {
			basePower: 10,
		},
		spritenum: 722,
		num: 1178,
		gen: 8,
		isNonstandard: "Past",
	},
	tr49: {
		name: "TR49",
		fling: {
			basePower: 10,
		},
		spritenum: 734,
		num: 1179,
		gen: 8,
		isNonstandard: "Past",
	},
	tr50: {
		name: "TR50",
		fling: {
			basePower: 90,
		},
		spritenum: 732,
		num: 1180,
		gen: 8,
		isNonstandard: "Past",
	},
	tr51: {
		name: "TR51",
		fling: {
			basePower: 10,
		},
		spritenum: 736,
		num: 1181,
		gen: 8,
		isNonstandard: "Past",
	},
	tr52: {
		name: "TR52",
		fling: {
			basePower: 10,
		},
		spritenum: 729,
		num: 1182,
		gen: 8,
		isNonstandard: "Past",
	},
	tr53: {
		name: "TR53",
		fling: {
			basePower: 120,
		},
		spritenum: 722,
		num: 1183,
		gen: 8,
		isNonstandard: "Past",
	},
	tr54: {
		name: "TR54",
		fling: {
			basePower: 10,
		},
		spritenum: 724,
		num: 1184,
		gen: 8,
		isNonstandard: "Past",
	},
	tr55: {
		name: "TR55",
		fling: {
			basePower: 120,
		},
		spritenum: 730,
		num: 1185,
		gen: 8,
		isNonstandard: "Past",
	},
	tr56: {
		name: "TR56",
		fling: {
			basePower: 80,
		},
		spritenum: 722,
		num: 1186,
		gen: 8,
		isNonstandard: "Past",
	},
	tr57: {
		name: "TR57",
		fling: {
			basePower: 80,
		},
		spritenum: 724,
		num: 1187,
		gen: 8,
		isNonstandard: "Past",
	},
	tr58: {
		name: "TR58",
		fling: {
			basePower: 80,
		},
		spritenum: 737,
		num: 1188,
		gen: 8,
		isNonstandard: "Past",
	},
	tr59: {
		name: "TR59",
		fling: {
			basePower: 80,
		},
		spritenum: 732,
		num: 1189,
		gen: 8,
		isNonstandard: "Past",
	},
	tr60: {
		name: "TR60",
		fling: {
			basePower: 80,
		},
		spritenum: 727,
		num: 1190,
		gen: 8,
		isNonstandard: "Past",
	},
	tr61: {
		name: "TR61",
		fling: {
			basePower: 90,
		},
		spritenum: 727,
		num: 1191,
		gen: 8,
		isNonstandard: "Past",
	},
	tr62: {
		name: "TR62",
		fling: {
			basePower: 85,
		},
		spritenum: 736,
		num: 1192,
		gen: 8,
		isNonstandard: "Past",
	},
	tr63: {
		name: "TR63",
		fling: {
			basePower: 80,
		},
		spritenum: 726,
		num: 1193,
		gen: 8,
		isNonstandard: "Past",
	},
	tr64: {
		name: "TR64",
		fling: {
			basePower: 120,
		},
		spritenum: 722,
		num: 1194,
		gen: 8,
		isNonstandard: "Past",
	},
	tr65: {
		name: "TR65",
		fling: {
			basePower: 90,
		},
		spritenum: 732,
		num: 1195,
		gen: 8,
		isNonstandard: "Past",
	},
	tr66: {
		name: "TR66",
		fling: {
			basePower: 120,
		},
		spritenum: 723,
		num: 1196,
		gen: 8,
		isNonstandard: "Past",
	},
	tr67: {
		name: "TR67",
		fling: {
			basePower: 90,
		},
		spritenum: 725,
		num: 1197,
		gen: 8,
		isNonstandard: "Past",
	},
	tr68: {
		name: "TR68",
		fling: {
			basePower: 10,
		},
		spritenum: 737,
		num: 1198,
		gen: 8,
		isNonstandard: "Past",
	},
	tr69: {
		name: "TR69",
		fling: {
			basePower: 80,
		},
		spritenum: 734,
		num: 1199,
		gen: 8,
		isNonstandard: "Past",
	},
	tr70: {
		name: "TR70",
		fling: {
			basePower: 80,
		},
		spritenum: 729,
		num: 1200,
		gen: 8,
		isNonstandard: "Past",
	},
	tr71: { // IT'S THE TR FOR OVERHEAT(?)
		name: "TR71",
		fling: {
			basePower: 130,
		},
		spritenum: 732,
		num: 1201,
		gen: 8,
		isNonstandard: "Past",
	},
	tr72: {
		name: "TR72",
		fling: {
			basePower: 120,
		},
		spritenum: 732,
		num: 1202,
		gen: 8,
		isNonstandard: "Past",
	},
	tr73: {
		name: "TR73",
		fling: {
			basePower: 120,
		},
		spritenum: 724,
		num: 1203,
		gen: 8,
		isNonstandard: "Past",
	},
	tr74: {
		name: "TR74",
		fling: {
			basePower: 80,
		},
		spritenum: 729,
		num: 1204,
		gen: 8,
		isNonstandard: "Past",
	},
	tr75: {
		name: "TR75",
		fling: {
			basePower: 100,
		},
		spritenum: 726,
		num: 1205,
		gen: 8,
		isNonstandard: "Past",
	},
	tr76: {
		name: "TR76",
		fling: {
			basePower: 10,
		},
		spritenum: 726,
		num: 1206,
		gen: 8,
		isNonstandard: "Past",
	},
	tr77: {
		name: "TR77",
		fling: {
			basePower: 10,
		},
		spritenum: 732,
		num: 1207,
		gen: 8,
		isNonstandard: "Past",
	},
	tr78: {
		name: "TR78",
		fling: {
			basePower: 95,
		},
		spritenum: 724,
		num: 1208,
		gen: 8,
		isNonstandard: "Past",
	},
	tr79: {
		name: "TR79",
		fling: {
			basePower: 10,
		},
		spritenum: 729,
		num: 1209,
		gen: 8,
		isNonstandard: "Past",
	},
	tr80: {
		name: "TR80",
		fling: {
			basePower: 10,
		},
		spritenum: 733,
		num: 1210,
		gen: 8,
		isNonstandard: "Past",
	},
	tr81: {
		name: "TR81",
		fling: {
			basePower: 95,
		},
		spritenum: 737,
		num: 1211,
		gen: 8,
		isNonstandard: "Past",
	},
	tr82: {
		name: "TR82",
		fling: {
			basePower: 20,
		},
		spritenum: 734,
		num: 1212,
		gen: 8,
		isNonstandard: "Past",
	},
	tr83: {
		name: "TR83",
		fling: {
			basePower: 10,
		},
		spritenum: 734,
		num: 1213,
		gen: 8,
		isNonstandard: "Past",
	},
	tr84: {
		name: "TR84",
		fling: {
			basePower: 80,
		},
		spritenum: 731,
		num: 1214,
		gen: 8,
		isNonstandard: "Past",
	},
	tr85: {
		name: "TR85",
		fling: {
			basePower: 10,
		},
		spritenum: 721,
		num: 1215,
		gen: 8,
		isNonstandard: "Past",
	},
	tr86: {
		name: "TR86",
		fling: {
			basePower: 90,
		},
		spritenum: 733,
		num: 1216,
		gen: 8,
		isNonstandard: "Past",
	},
	tr87: {
		name: "TR87",
		fling: {
			basePower: 80,
		},
		spritenum: 725,
		num: 1217,
		gen: 8,
		isNonstandard: "Past",
	},
	tr88: {
		name: "TR88",
		fling: {
			basePower: 10,
		},
		spritenum: 730,
		num: 1218,
		gen: 8,
		isNonstandard: "Past",
	},
	tr89: {
		name: "TR89",
		fling: {
			basePower: 110,
		},
		spritenum: 723,
		num: 1219,
		gen: 8,
		isNonstandard: "Past",
	},
	tr90: {
		name: "TR90",
		fling: {
			basePower: 90,
		},
		spritenum: 738,
		num: 1220,
		gen: 8,
		isNonstandard: "Past",
	},
	tr91: {
		name: "TR91",
		fling: {
			basePower: 10,
		},
		spritenum: 724,
		num: 1221,
		gen: 8,
		isNonstandard: "Past",
	},
	tr92: {
		name: "TR92",
		fling: {
			basePower: 80,
		},
		spritenum: 738,
		num: 1222,
		gen: 8,
		isNonstandard: "Past",
	},
	tr93: {
		name: "TR93",
		fling: {
			basePower: 85,
		},
		spritenum: 737,
		num: 1223,
		gen: 8,
		isNonstandard: "Past",
	},
	tr94: {
		name: "TR94",
		fling: {
			basePower: 95,
		},
		spritenum: 725,
		num: 1224,
		gen: 8,
		isNonstandard: "Past",
	},
	tr95: {
		name: "TR95",
		fling: {
			basePower: 80,
		},
		spritenum: 737,
		num: 1225,
		gen: 8,
		isNonstandard: "Past",
	},
	tr96: {
		name: "TR96",
		fling: {
			basePower: 90,
		},
		spritenum: 727,
		num: 1226,
		gen: 8,
		isNonstandard: "Past",
	},
	tr97: {
		name: "TR97",
		fling: {
			basePower: 85,
		},
		spritenum: 734,
		num: 1227,
		gen: 8,
		isNonstandard: "Past",
	},
	tr98: {
		name: "TR98",
		fling: {
			basePower: 85,
		},
		spritenum: 731,
		num: 1228,
		gen: 8,
		isNonstandard: "Past",
	},
	tr99: {
		name: "TR99",
		fling: {
			basePower: 80,
		},
		spritenum: 722,
		num: 1229,
		gen: 8,
		isNonstandard: "Past",
	},
	twistedspoon: {
		name: "Twisted Spoon",
		spritenum: 520,
		fling: {
			basePower: 30,
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Psychic') {
				return this.chainModify([4915, 4096]);
			}
		},
		num: 248,
		gen: 2,
	},
	tyranitarite: {
		name: "Tyranitarite",
		spritenum: 607,
		megaStone: "Tyranitar-Mega",
		megaEvolves: "Tyranitar",
		itemUser: ["Tyranitar"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 669,
		gen: 6,
		isNonstandard: "Past",
	},
	ultraball: {
		name: "Ultra Ball",
		spritenum: 521,
		num: 2,
		gen: 1,
		isPokeball: true,
	},
	ultranecroziumz: {
		name: "Ultranecrozium Z",
		spritenum: 687,
		onTakeItem: false,
		zMove: "Light That Burns the Sky",
		zMoveFrom: "Photon Geyser",
		itemUser: ["Necrozma-Ultra"],
		num: 923,
		gen: 7,
		isNonstandard: "Past",
	},
	unremarkableteacup: {
		name: "Unremarkable Teacup",
		spritenum: 756,
		fling: {
			basePower: 80,
		},
		num: 2403,
		gen: 9,
		rating: 0,
	},
	upgrade: {
		name: "Up-Grade",
		spritenum: 523,
		fling: {
			basePower: 30,
		},
		num: 252,
		gen: 2,
		rating: 0,
	},
	utilityumbrella: {
		name: "Utility Umbrella",
		spritenum: 718,
		fling: {
			basePower: 60,
		},
		// Partially implemented in Pokemon.effectiveWeather() in sim/pokemon.ts
		onStart(pokemon) {
			if (!pokemon.ignoringItem()) return;
			if (['sunnyday', 'raindance', 'desolateland', 'primordialsea'].includes(this.field.effectiveWeather())) {
				this.runEvent('WeatherChange', pokemon, pokemon, this.effect);
			}
		},
		onUpdate(pokemon) {
			if (!this.effectState.inactive) return;
			this.effectState.inactive = false;
			if (['sunnyday', 'raindance', 'desolateland', 'primordialsea'].includes(this.field.effectiveWeather())) {
				this.runEvent('WeatherChange', pokemon, pokemon, this.effect);
			}
		},
		onEnd(pokemon) {
			if (['sunnyday', 'raindance', 'desolateland', 'primordialsea'].includes(this.field.effectiveWeather())) {
				this.runEvent('WeatherChange', pokemon, pokemon, this.effect);
			}
			this.effectState.inactive = true;
		},
		num: 1123,
		gen: 8,
	},
	venusaurite: {
		name: "Venusaurite",
		spritenum: 608,
		megaStone: "Venusaur-Mega",
		megaEvolves: "Venusaur",
		itemUser: ["Venusaur"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 659,
		gen: 6,
		isNonstandard: "Past",
	},
	wacanberry: {
		name: "Wacan Berry",
		spritenum: 526,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Electric",
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Electric' && target.getMoveHitData(move).typeMod > 0) {
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
		num: 186,
		gen: 4,
	},
	watergem: {
		name: "Water Gem",
		spritenum: 528,
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status' || move.flags['pledgecombo']) return;
			if (move.type === 'Water' && source.useItem()) {
				source.addVolatile('gem');
			}
		},
		num: 549,
		gen: 5,
		isNonstandard: "Past",
	},
	watermemory: {
		name: "Water Memory",
		spritenum: 677,
		onMemory: 'Water',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 773) || pokemon.baseSpecies.num === 773) {
				return false;
			}
			return true;
		},
		forcedForme: "Silvally-Water",
		itemUser: ["Silvally-Water"],
		num: 913,
		gen: 7,
		isNonstandard: "Past",
	},
	waterstone: {
		name: "Water Stone",
		spritenum: 529,
		fling: {
			basePower: 30,
		},
		num: 84,
		gen: 1,
		rating: 0,
	},
	wateriumz: {
		name: "Waterium Z",
		spritenum: 633,
		onPlate: 'Water',
		onTakeItem: false,
		zMove: true,
		zMoveType: "Water",
		forcedForme: "Arceus-Water",
		num: 778,
		gen: 7,
		isNonstandard: "Past",
	},
	watmelberry: {
		name: "Watmel Berry",
		spritenum: 530,
		isBerry: true,
		naturalGift: {
			basePower: 100,
			type: "Fire",
		},
		onEat: false,
		num: 181,
		gen: 3,
		isNonstandard: "Past",
		rating: 0,
	},
	waveincense: {
		name: "Wave Incense",
		spritenum: 531,
		fling: {
			basePower: 10,
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Water') {
				return this.chainModify([4915, 4096]);
			}
		},
		num: 317,
		gen: 4,
		isNonstandard: "Past",
	},
	weaknesspolicy: {
		name: "Weakness Policy",
		spritenum: 609,
		fling: {
			basePower: 80,
		},
		onDamagingHit(damage, target, source, move) {
			if (!move.damage && !move.damageCallback && target.getMoveHitData(move).typeMod > 0) {
				target.useItem();
			}
		},
		boosts: {
			atk: 2,
			spa: 2,
		},
		num: 639,
		gen: 6,
	},
	wellspringmask: {
		name: "Wellspring Mask",
		spritenum: 759,
		fling: {
			basePower: 60,
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (user.baseSpecies.name.startsWith('Ogerpon-Wellspring')) {
				return this.chainModify([4915, 4096]);
			}
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Ogerpon') return false;
			return true;
		},
		forcedForme: "Ogerpon-Wellspring",
		itemUser: ["Ogerpon-Wellspring"],
		num: 2407,
		gen: 9,
	},
	wepearberry: {
		name: "Wepear Berry",
		spritenum: 533,
		isBerry: true,
		naturalGift: {
			basePower: 90,
			type: "Electric",
		},
		onEat: false,
		num: 167,
		gen: 3,
		isNonstandard: "Past",
		rating: 0,
	},
	whippeddream: {
		name: "Whipped Dream",
		spritenum: 692,
		fling: {
			basePower: 80,
		},
		num: 646,
		gen: 6,
		isNonstandard: "Past",
		rating: 0,
	},
	whiteherb: {
		name: "White Herb",
		spritenum: 535,
		fling: {
			basePower: 10,
			effect(pokemon) {
				let activate = false;
				const boosts: SparseBoostsTable = {};
				let i: BoostID;
				for (i in pokemon.boosts) {
					if (pokemon.boosts[i] < 0) {
						activate = true;
						boosts[i] = 0;
					}
				}
				if (activate) {
					pokemon.setBoost(boosts);
					this.add('-clearnegativeboost', pokemon, '[silent]');
				}
			},
		},
		onUpdate(pokemon) {
			let activate = false;
			const boosts: SparseBoostsTable = {};
			let i: BoostID;
			for (i in pokemon.boosts) {
				if (pokemon.boosts[i] < 0) {
					activate = true;
					boosts[i] = 0;
				}
			}
			if (activate && pokemon.useItem()) {
				pokemon.setBoost(boosts);
				this.add('-clearnegativeboost', pokemon, '[silent]');
			}
		},
		num: 214,
		gen: 3,
	},
	widelens: {
		name: "Wide Lens",
		spritenum: 537,
		fling: {
			basePower: 10,
		},
		onSourceModifyAccuracyPriority: -2,
		onSourceModifyAccuracy(accuracy) {
			if (typeof accuracy === 'number') {
				return this.chainModify([4505, 4096]);
			}
		},
		num: 265,
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
				pokemon.addVolatile('confusion');
			}
		},
		num: 160,
		gen: 3,
		rating: 3,
	},
	wiseglasses: {
		name: "Wise Glasses",
		spritenum: 539,
		fling: {
			basePower: 10,
		},
		onBasePowerPriority: 16,
		onBasePower(basePower, user, target, move) {
			if (move.category === 'Special') {
				return this.chainModify([4505, 4096]);
			}
		},
		num: 267,
		gen: 4,
	},
	yacheberry: {
		name: "Yache Berry",
		spritenum: 567,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Ice",
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Ice' && target.getMoveHitData(move).typeMod > 0) {
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
		num: 188,
		gen: 4,
	},
	zapplate: {
		name: "Zap Plate",
		spritenum: 572,
		onPlate: 'Electric',
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Electric') {
				return this.chainModify([4915, 4096]);
			}
		},
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 493) || pokemon.baseSpecies.num === 493) {
				return false;
			}
			return true;
		},
		forcedForme: "Arceus-Electric",
		num: 300,
		gen: 4,
	},
	zoomlens: {
		name: "Zoom Lens",
		spritenum: 574,
		fling: {
			basePower: 10,
		},
		onSourceModifyAccuracyPriority: -2,
		onSourceModifyAccuracy(accuracy, target) {
			if (typeof accuracy === 'number' && !this.queue.willMove(target)) {
				this.debug('Zoom Lens boosting accuracy');
				return this.chainModify([4915, 4096]);
			}
		},
		num: 276,
		gen: 4,
	},

	// Gen 2 items

	berserkgene: {
		name: "Berserk Gene",
		spritenum: 388,
		onUpdate(pokemon) {
			if (pokemon.useItem()) {
				pokemon.addVolatile('confusion');
			}
		},
		boosts: {
			atk: 2,
		},
		num: 0,
		gen: 2,
		isNonstandard: "Past",
	},
	berry: {
		name: "Berry",
		spritenum: 319,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Poison",
		},
		onResidualOrder: 5,
		onResidual(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 2) {
				pokemon.eatItem();
			}
		},
		onTryEatItem(item, pokemon) {
			if (!this.runEvent('TryHeal', pokemon, null, this.effect, 10)) return false;
		},
		onEat(pokemon) {
			this.heal(10);
		},
		num: 155,
		gen: 2,
		isNonstandard: "Past",
		rating: 1,
	},
	bitterberry: {
		name: "Bitter Berry",
		spritenum: 334,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Ground",
		},
		onUpdate(pokemon) {
			if (pokemon.volatiles['confusion']) {
				pokemon.eatItem();
			}
		},
		onEat(pokemon) {
			pokemon.removeVolatile('confusion');
		},
		num: 156,
		gen: 2,
		isNonstandard: "Past",
		rating: 1,
	},
	burntberry: {
		name: "Burnt Berry",
		spritenum: 13,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Ice",
		},
		onUpdate(pokemon) {
			if (pokemon.status === 'frz') {
				pokemon.eatItem();
			}
		},
		onEat(pokemon) {
			if (pokemon.status === 'frz') {
				pokemon.cureStatus();
			}
		},
		num: 153,
		gen: 2,
		isNonstandard: "Past",
		rating: 1,
	},
	goldberry: {
		name: "Gold Berry",
		spritenum: 448,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Psychic",
		},
		onResidualOrder: 5,
		onResidual(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 2) {
				pokemon.eatItem();
			}
		},
		onTryEatItem(item, pokemon) {
			if (!this.runEvent('TryHeal', pokemon, null, this.effect, 30)) return false;
		},
		onEat(pokemon) {
			this.heal(30);
		},
		num: 158,
		gen: 2,
		isNonstandard: "Past",
	},
	iceberry: {
		name: "Ice Berry",
		spritenum: 381,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Grass",
		},
		onUpdate(pokemon) {
			if (pokemon.status === 'brn') {
				pokemon.eatItem();
			}
		},
		onEat(pokemon) {
			if (pokemon.status === 'brn') {
				pokemon.cureStatus();
			}
		},
		num: 152,
		gen: 2,
		isNonstandard: "Past",
		rating: 1,
	},
/*
NARRATOR:
(Black screen with text; The sound of buzzing bees can be heard)
According to all known laws
of aviation,
 :
there is no way a bee
should be able to fly.
 :
Its wings are too small to get
its fat little body off the ground.
 :
The bee, of course, flies anyway
 :
because bees don't care
what humans think is impossible.
BARRY BENSON:
(Barry is picking out a shirt)
Yellow, black. Yellow, black.
Yellow, black. Yellow, black.
 :
Ooh, black and yellow!
Let's shake it up a little.
JANET BENSON:
Barry! Breakfast is ready!
BARRY:
Coming!
 :
Hang on a second.
(Barry uses his antenna like a phone)
 :
Hello?
ADAM FLAYMAN:

(Through phone)
- Barry?
BARRY:
- Adam?
ADAM:
- Can you believe this is happening?
BARRY:
- I can't. I'll pick you up.
(Barry flies down the stairs)
 :
MARTIN BENSON:
Looking sharp.
JANET:
Use the stairs. Your father
paid good money for those.
BARRY:
Sorry. I'm excited.
MARTIN:
Here's the graduate.
We're very proud of you, son.
 :
A perfect report card, all B's.
JANET:
Very proud.
(Rubs Barry's hair)
BARRY=
Ma! I got a thing going here.
JANET:
- You got lint on your fuzz.
BARRY:
- Ow! That's me!

JANET:
- Wave to us! We'll be in row 118,000.
- Bye!
(Barry flies out the door)
JANET:
Barry, I told you,
stop flying in the house!
(Barry drives through the hive,and is waved at by Adam who is reading a
newspaper)
BARRY==
- Hey, Adam.
ADAM:
- Hey, Barry.
(Adam gets in Barry's car)
 :
- Is that fuzz gel?
BARRY:
- A little. Special day, graduation.
ADAM:
Never thought I'd make it.
(Barry pulls away from the house and continues driving)
BARRY:
Three days grade school,
three days high school...
ADAM:
Those were awkward.
BARRY:
Three days college. I'm glad I took
a day and hitchhiked around the hive.
ADAM==
You did come back different.
(Barry and Adam pass by Artie, who is jogging)
ARTIE:
- Hi, Barry!

BARRY:
- Artie, growing a mustache? Looks good.
ADAM:
- Hear about Frankie?
BARRY:
- Yeah.
ADAM==
- You going to the funeral?
BARRY:
- No, I'm not going to his funeral.
 :
Everybody knows,
sting someone, you die.
 :
Don't waste it on a squirrel.
Such a hothead.
ADAM:
I guess he could have
just gotten out of the way.
(The car does a barrel roll on the loop-shaped bridge and lands on the
highway)
 :
I love this incorporating
an amusement park into our regular day.
BARRY:
I guess that's why they say we don't need vacations.
(Barry parallel parks the car and together they fly over the graduating
students)
Boy, quite a bit of pomp...
under the circumstances.
(Barry and Adam sit down and put on their hats)
 :
- Well, Adam, today we are men.

ADAM:
- We are!
BARRY=
- Bee-men.
=ADAM=
- Amen!
BARRY AND ADAM:
Hallelujah!
(Barry and Adam both have a happy spasm)
ANNOUNCER:
Students, faculty, distinguished bees,
 :
please welcome Dean Buzzwell.
DEAN BUZZWELL:
Welcome, New Hive Oity
graduating class of...
 :
...9:
 :
That concludes our ceremonies.
 :
And begins your career
at Honex Industries!
ADAM:
Will we pick our job today?
(Adam and Barry get into a tour bus)
BARRY=
I heard it's just orientation.
(Tour buses rise out of the ground and the students are automatically
loaded into the buses)
TOUR GUIDE:
Heads up! Here we go.

ANNOUNCER:
Keep your hands and antennas
inside the tram at all times.
BARRY:
- Wonder what it'll be like?
ADAM:
- A little scary.
TOUR GUIDE==
Welcome to Honex,
a division of Honesco
 :
and a part of the Hexagon Group.
Barry:
This is it!
BARRY AND ADAM:
Wow.
BARRY:
Wow.
(The bus drives down a road an on either side are the Bee's massive
complicated Honey-making machines)
TOUR GUIDE:
We know that you, as a bee,
have worked your whole life
 :
to get to the point where you
can work for your whole life.
 :
Honey begins when our valiant Pollen
Jocks bring the nectar to the hive.
 :
Our top-secret formula
 :
is automatically color-corrected,

scent-adjusted and bubble-contoured
 :
into this soothing sweet syrup
 :
with its distinctive
golden glow you know as...
EVERYONE ON BUS:
Honey!
(The guide has been collecting honey into a bottle and she throws it into
the crowd on the bus and it is caught by a girl in the back)
ADAM:
- That girl was hot.
BARRY:
- She's my cousin!
ADAM==
- She is?
BARRY:
- Yes, we're all cousins.
ADAM:
- Right. You're right.
TOUR GUIDE:
- At Honex, we constantly strive
 :
to improve every aspect
of bee existence.
 :
These bees are stress-testing
a new helmet technology.
(The bus passes by a Bee wearing a helmet who is being smashed into the
ground with fly-swatters, newspapers and boots. He lifts a thumbs up but
you can hear him groan)
 :
ADAM==

- What do you think he makes?
BARRY:
- Not enough.
TOUR GUIDE:
Here we have our latest advancement,
the Krelman.
(They pass by a turning wheel with Bees standing on pegs, who are each
wearing a finger-shaped hat)
Barry:
- Wow, What does that do?
TOUR GUIDE:
- Catches that little strand of honey
 :
that hangs after you pour it.
Saves us millions.
ADAM:
(Intrigued)
Can anyone work on the Krelman?
TOUR GUIDE:
Of course. Most bee jobs are
small ones.
But bees know that every small job,
if it's done well, means a lot.
 :
But choose carefully
 :
because you'll stay in the job
you pick for the rest of your life.
(Everyone claps except for Barry)
BARRY:
The same job the rest of your life?
I didn't know that.
ADAM:

What's the difference?
TOUR GUIDE:
You'll be happy to know that bees,
as a species, haven't had one day off
 :
in 27 million years.
BARRY:
(Upset)
So you'll just work us to death?
 :
We'll sure try.
(Everyone on the bus laughs except Barry. Barry and Adam are walking back
home together)
ADAM:
Wow! That blew my mind!
BARRY:
"What's the difference?"
How can you say that?
 :
One job forever?
That's an insane choice to have to make.
ADAM:
I'm relieved. Now we only have
to make one decision in life.
BARRY:
But, Adam, how could they
never have told us that?
ADAM:
Why would you question anything?
We're bees.
 :
We're the most perfectly
functioning society on Earth.

BARRY:
You ever think maybe things
work a little too well here?
ADAM:
Like what? Give me one example.
(Barry and Adam stop walking and it is revealed to the audience that
hundreds of cars are speeding by and narrowly missing them in perfect
unison)
BARRY:
I don't know. But you know
what I'm talking about.
ANNOUNCER:
Please clear the gate.
Royal Nectar Force on approach.
BARRY:
Wait a second. Check it out.
(The Pollen jocks fly in, circle around and landing in line)
 :
- Hey, those are Pollen Jocks!
ADAM:
- Wow.
 :
I've never seen them this close.
BARRY:
They know what it's like
outside the hive.
ADAM:
Yeah, but some don't come back.
GIRL BEES:
- Hey, Jocks!
- Hi, Jocks!
(The Pollen Jocks hook up their backpacks to machines that pump the nectar
to trucks, which drive away)

LOU LO DUVA:
You guys did great!
 :
You're monsters!
You're sky freaks!
I love it!
(Punching the Pollen Jocks in joy)
I love it!
ADAM:
- I wonder where they were.
BARRY:
- I don't know.
 :
Their day's not planned.
 :
Outside the hive, flying who knows
where, doing who knows what.
 :
You can't just decide to be a Pollen
Jock. You have to be bred for that.
ADAM==
Right.
(Barry and Adam are covered in some pollen that floated off of the Pollen
Jocks)
BARRY:
Look at that. That's more pollen
than you and I will see in a lifetime.
ADAM:
It's just a status symbol.
Bees make too much of it.
BARRY:
Perhaps. Unless you're wearing it
and the ladies see you wearing it.
(Barry waves at 2 girls standing a little away from them)

ADAM==
Those ladies?
Aren't they our cousins too?
BARRY:
Distant. Distant.
POLLEN JOCK #1:
Look at these two.
POLLEN JOCK #2:
- Couple of Hive Harrys.
POLLEN JOCK #1:
- Let's have fun with them.
GIRL BEE #1:
It must be dangerous
being a Pollen Jock.
BARRY:
Yeah. Once a bear pinned me
against a mushroom!
 :
He had a paw on my throat,
and with the other, he was slapping me!
(Slaps Adam with his hand to represent his scenario)
GIRL BEE #2:
- Oh, my!
BARRY:
- I never thought I'd knock him out.
GIRL BEE #1:
(Looking at Adam)
What were you doing during this?
ADAM:
Obviously I was trying to alert the authorities.
BARRY:
I can autograph that.

(The pollen jocks walk up to Barry and Adam, they pretend that Barry and
Adam really are pollen jocks.)
POLLEN JOCK #1:
A little gusty out there today,
wasn't it, comrades?
BARRY:
Yeah. Gusty.
POLLEN JOCK #1:
We're hitting a sunflower patch
six miles from here tomorrow.
BARRY:
- Six miles, huh?
ADAM:
- Barry!
POLLEN JOCK #2:
A puddle jump for us,
but maybe you're not up for it.
BARRY:
- Maybe I am.
ADAM:
- You are not!
POLLEN JOCK #1:
We're going 0900 at J-Gate.
 :
What do you think, buzzy-boy?
Are you bee enough?
BARRY:
I might be. It all depends
on what 0900 means.
(The scene cuts to Barry looking out on the hive-city from his balcony at
night)
MARTIN:

Hey, Honex!
BARRY:
Dad, you surprised me.
MARTIN:
You decide what you're interested in?
BARRY:
- Well, there's a lot of choices.
- But you only get one.
 :
Do you ever get bored
doing the same job every day?
MARTIN:
Son, let me tell you about stirring.
 :
You grab that stick, and you just
move it around, and you stir it around.
 :
You get yourself into a rhythm.
It's a beautiful thing.
BARRY:
You know, Dad,
the more I think about it,
 :
maybe the honey field
just isn't right for me.
MARTIN:
You were thinking of what,
making balloon animals?
 :
That's a bad job
for a guy with a stinger.
 :

Janet, your son's not sure
he wants to go into honey!
JANET:
- Barry, you are so funny sometimes.
BARRY:
- I'm not trying to be funny.
MARTIN:
You're not funny! You're going
into honey. Our son, the stirrer!
JANET:
- You're gonna be a stirrer?
BARRY:
- No one's listening to me!
MARTIN:
Wait till you see the sticks I have.
BARRY:
I could say anything right now.
I'm gonna get an ant tattoo!
(Barry's parents don't listen to him and continue to ramble on)
MARTIN:
Let's open some honey and celebrate!
BARRY:
Maybe I'll pierce my thorax.
Shave my antennae.
 :
Shack up with a grasshopper. Get
a gold tooth and call everybody "dawg"!
JANET:
I'm so proud.
(The scene cuts to Barry and Adam waiting in line to get a job)
ADAM:
- We're starting work today!

BARRY:
- Today's the day.
ADAM:
Come on! All the good jobs
will be gone.
BARRY:
Yeah, right.
JOB LISTER:
Pollen counting, stunt bee, pouring,
stirrer, front desk, hair removal...
BEE IN FRONT OF LINE:
- Is it still available?
JOB LISTER:
- Hang on. Two left!
 :
One of them's yours! Congratulations!
Step to the side.
ADAM:
- What'd you get?
BEE IN FRONT OF LINE:
- Picking crud out. Stellar!
(He walks away)
ADAM:
Wow!
JOB LISTER:
Couple of newbies?
ADAM:
Yes, sir! Our first day! We are ready!
JOB LISTER:
Make your choice.
(Adam and Barry look up at the job board. There are hundreds of constantly
changing panels that contain available or unavailable jobs. It looks very
confusing)

ADAM:
- You want to go first?
BARRY:
- No, you go.
ADAM:
Oh, my. What's available?
JOB LISTER:
Restroom attendant's open,
not for the reason you think.
ADAM:
- Any chance of getting the Krelman?
JOB LISTER:
- Sure, you're on.
(Puts the Krelman finger-hat on Adam's head)
(Suddenly the sign for Krelman closes out)
 :
I'm sorry, the Krelman just closed out.
(Takes Adam's hat off)
Wax monkey's always open.
ADAM:
The Krelman opened up again.
 :
What happened?
JOB LISTER:
A bee died. Makes an opening. See?
He's dead. Another dead one.
 :
Deady. Deadified. Two more dead.
 :
Dead from the neck up.
Dead from the neck down. That's life!

ADAM:
Oh, this is so hard!
(Barry remembers what the Pollen Jock offered him and he flies off)
Heating, cooling,
stunt bee, pourer, stirrer,
 :
humming, inspector number seven,
lint coordinator, stripe supervisor,
 :
mite wrangler. Barry, what
do you think I should... Barry?
(Adam turns around and sees Barry flying away)
 :
Barry!
POLLEN JOCK:
All right, we've got the sunflower patch
in quadrant nine...
ADAM:
(Through phone)
What happened to you?
Where are you?
BARRY:
- I'm going out.
ADAM:
- Out? Out where?
BARRY:
- Out there.
ADAM:
- Oh, no!
BARRY:
I have to, before I go
to work for the rest of my life.
ADAM:

You're gonna die! You're crazy!
(Barry hangs up)
Hello?
POLLEN JOCK #2:
Another call coming in.
 :
If anyone's feeling brave,
there's a Korean deli on 83rd
 :
that gets their roses today.
BARRY:
Hey, guys.
POLLEN JOCK #1 ==
- Look at that.
POLLEN JOCK #2:
- Isn't that the kid we saw yesterday?
LOU LO DUVA:
Hold it, son, flight deck's restricted.
POLLEN JOCK #1:
It's OK, Lou. We're gonna take him up.
(Puts hand on Barry's shoulder)
LOU LO DUVA:
(To Barry) Really? Feeling lucky, are you?
BEE WITH CLIPBOARD:
(To Barry) Sign here, here. Just initial that.
 :
- Thank you.
LOU LO DUVA:
- OK.
 :
You got a rain advisory today,
 :

and as you all know,
bees cannot fly in rain.
 :
So be careful. As always,
watch your brooms,
 :
hockey sticks, dogs,
birds, bears and bats.
 :
Also, I got a couple of reports
of root beer being poured on us.
 :
Murphy's in a home because of it,
babbling like a cicada!
BARRY:
- That's awful.
LOU LO DUVA:
(Still talking through megaphone)
- And a reminder for you rookies,
 :
bee law number one,
absolutely no talking to humans!
 :
All right, launch positions!
POLLEN JOCKS:
(The Pollen Jocks run into formation)
 :
Buzz, buzz, buzz, buzz! Buzz, buzz,
buzz, buzz! Buzz, buzz, buzz, buzz!
LOU LU DUVA:
Black and yellow!
POLLEN JOCKS:

Hello!
POLLEN JOCK #1:
(To Barry)You ready for this, hot shot?
BARRY:
Yeah. Yeah, bring it on.
POLLEN JOCK's:
Wind, check.
 :
- Antennae, check.
- Nectar pack, check.
 :
- Wings, check.
- Stinger, check.
BARRY:
Scared out of my shorts, check.
LOU LO DUVA:
OK, ladies,
 :
let's move it out!
 :
Pound those petunias,
you striped stem-suckers!
 :
All of you, drain those flowers!
(The pollen jocks fly out of the hive)
BARRY:
Wow! I'm out!
 :
I can't believe I'm out!
 :
So blue.

 :
I feel so fast and free!
 :
Box kite!
(Barry flies through the kite)
 :
Wow!
 :
Flowers!
(A pollen jock puts on some high tech goggles that shows flowers similar to
heat sink goggles.)
POLLEN JOCK:
This is Blue Leader.
We have roses visual.
 :
Bring it around 30 degrees and hold.
 :
Roses!
POLLEN JOCK #1:
30 degrees, roger. Bringing it around.
 :
Stand to the side, kid.
It's got a bit of a kick.
(The pollen jock fires a high-tech gun at the flower, shooting tubes that
suck up the nectar from the flower and collects it into a pouch on the gun)
BARRY:
That is one nectar collector!
POLLEN JOCK #1==
- Ever see pollination up close?
BARRY:
- No, sir.
POLLEN JOCK #1:

(Barry and the Pollen jock fly over the field, the pollen jock sprinkles
pollen as he goes)
 :
I pick up some pollen here, sprinkle it
over here. Maybe a dash over there,
 :
a pinch on that one.
See that? It's a little bit of magic.
BARRY:
That's amazing. Why do we do that?
POLLEN JOCK #1:
That's pollen power. More pollen, more
flowers, more nectar, more honey for us.
BARRY:
Cool.
POLLEN JOCK #1:
I'm picking up a lot of bright yellow.
could be daisies. Don't we need those?
POLLEN JOCK #2:
Copy that visual.
 :
Wait. One of these flowers
seems to be on the move.
POLLEN JOCK #1:
Say again? You're reporting
a moving flower?
POLLEN JOCK #2:
Affirmative.
(The Pollen jocks land near the "flowers" which, to the audience are
obviously just tennis balls)
KEN:
(In the distance) That was on the line!

POLLEN JOCK #1:
This is the coolest. What is it?
POLLEN JOCK #2:
I don't know, but I'm loving this color.
 :
It smells good.
Not like a flower, but I like it.
POLLEN JOCK #1:
Yeah, fuzzy.
(Sticks his hand on the ball but it gets stuck)
POLLEN JOCK #3==
Chemical-y.
(The pollen jock finally gets his hand free from the tennis ball)
POLLEN JOCK #1:
Careful, guys. It's a little grabby.
(The pollen jocks turn around and see Barry lying his entire body on top of
one of the tennis balls)
POLLEN JOCK #2:
My sweet lord of bees!
POLLEN JOCK #3:
Candy-brain, get off there!
POLLEN JOCK #1:
(Pointing upwards)
Problem!
(A human hand reaches down and grabs the tennis ball that Barry is stuck
to)
BARRY:
- Guys!
POLLEN JOCK #2:
- This could be bad.
POLLEN JOCK #3:
Affirmative.
(Vanessa Bloome starts bouncing the tennis ball, not knowing Barry is stick
to it)

BARRY==
Very close.
 :
Gonna hurt.
 :
Mama's little boy.
(Barry is being hit back and forth by two humans playing tennis. He is
still stuck to the ball)
POLLEN JOCK #1:
You are way out of position, rookie!
KEN:
Coming in at you like a MISSILE!
(Barry flies past the pollen jocks, still stuck to the ball)
BARRY:
(In slow motion)
Help me!
POLLEN JOCK #2:
I don't think these are flowers.
POLLEN JOCK #3:
- Should we tell him?
POLLEN JOCK #1:
- I think he knows.
BARRY:
What is this?!
KEN:
Match point!
 :
You can start packing up, honey,
because you're about to EAT IT!
(A pollen jock coughs which confused Ken and he hits the ball the wrong way
with Barry stuck to it and it goes flying into the city)
BARRY:

Yowser!
(Barry bounces around town and gets stuck in the engine of a car. He flies
into the air conditioner and sees a bug that was frozen in there)
BARRY:
Ew, gross.
(The man driving the car turns on the air conditioner which blows Barry
into the car)
GIRL IN CAR:
There's a bee in the car!
 :
- Do something!
DAD DRIVING CAR:
- I'm driving!
BABY GIRL:
(Waving at Barry)
- Hi, bee.
(Barry smiles and waves at the baby girl)
GUY IN BACK OF CAR:
- He's back here!
 :
He's going to sting me!
GIRL IN CAR:
Nobody move. If you don't move,
he won't sting you. Freeze!
(Barry freezes as well, hovering in the middle of the car)
 :
GRANDMA IN CAR==
He blinked!
(The grandma whips out some bee-spray and sprays everywhere in the car,
climbing into the front seat, still trying to spray Barry)
GIRL IN CAR:
Spray him, Granny!
DAD DRIVING THE CAR:
What are you doing?!
(Barry escapes the car through the air conditioner and is flying high above

the ground, safe.)
BARRY:
Wow... the tension level
out here is unbelievable.
(Barry sees that storm clouds are gathering and he can see rain clouds
moving into this direction)
 :
I gotta get home.
 :
Can't fly in rain.
 :
Can't fly in rain.
(A rain drop hits Barry and one of his wings is damaged)
 :
Can't fly in rain.
(A second rain drop hits Barry again and he spirals downwards)
Mayday! Mayday! Bee going down!
(WW2 plane sound effects are played as he plummets, and he crash-lands on a
plant inside an apartment near the window)
VANESSA BLOOME:
Ken, could you close
the window please?
KEN==
Hey, check out my new resume.
I made it into a fold-out brochure.
 :
You see?
(Folds brochure resume out)
Folds out.
(Ken closes the window, trapping Barry inside)
BARRY:
Oh, no. More humans. I don't need this.
(Barry tries to fly away but smashes into the window and falls again)
 :
What was that?

(Barry keeps trying to fly out the window but he keeps being knocked back
because the window is closed)
Maybe this time. This time. This time.
This time! This time! This...
 :
Drapes!
(Barry taps the glass. He doesn't understand what it is)
That is diabolical.
KEN:
It's fantastic. It's got all my special
skills, even my top-ten favorite movies.
ANDY:
What's number one? Star Wars?
KEN:
Nah, I don't go for that...
(Ken makes finger guns and makes "pew pew pew" sounds and then stops)
 :
...kind of stuff.
BARRY:
No wonder we shouldn't talk to them.
They're out of their minds.
KEN:
When I leave a job interview, they're
flabbergasted, can't believe what I say.
BARRY:
(Looking at the light on the ceiling)
There's the sun. Maybe that's a way out.
(Starts flying towards the lightbulb)
 :
I don't remember the sun
having a big 75 on it.
(Barry hits the lightbulb and falls into the dip on the table that the
humans are sitting at)
KEN:

I predicted global warming.
 :
I could feel it getting hotter.
At first I thought it was just me.
(Andy dips a chip into the bowl and scoops up some dip with Barry on it and
is about to put it in his mouth)
 :
Wait! Stop! Bee!
(Andy drops the chip with Barry in fear and backs away. All the humans
freak out)
 :
Stand back. These are winter boots.
(Ken has winter boots on his hands and he is about to smash the bee but
Vanessa saves him last second)
VANESSA:
Wait!
 :
Don't kill him!
(Vanessa puts Barry in a glass to protect him)
KEN:
You know I'm allergic to them!
This thing could kill me!
VANESSA:
Why does his life have
less value than yours?
KEN:
Why does his life have any less value
than mine? Is that your statement?
VANESSA:
I'm just saying all life has value. You
don't know what he's capable of feeling.
(Vanessa picks up Ken's brochure and puts it under the glass so she can
carry Barry back to the window. Barry looks at Vanessa in amazement)
KEN:

My brochure!
VANESSA:
There you go, little guy.
(Vanessa opens the window and lets Barry out but Barry stays back and is
still shocked that a human saved his life)
KEN:
I'm not scared of him.
It's an allergic thing.
VANESSA:
Put that on your resume brochure.
KEN:
My whole face could puff up.
ANDY:
Make it one of your special skills.
KEN:
Knocking someone out
is also a special skill.
(Ken walks to the door)
Right. Bye, Vanessa. Thanks.
 :
- Vanessa, next week? Yogurt night?
VANESSA:
- Sure, Ken. You know, whatever.
 :
(Vanessa tries to close door)
KEN==
- You could put carob chips on there.
VANESSA:
- Bye.
(Closes door but Ken opens it again)
KEN:
- Supposed to be less calories.

VANESSA:
- Bye.
(Closes door)
(Fast forward to the next day, Barry is still inside the house. He flies
into the kitchen where Vanessa is doing dishes)
BARRY==
(Talking to himself)
I gotta say something.
 :
She saved my life.
I gotta say something.
 :
All right, here it goes.
(Turns back)
Nah.
 :
What would I say?
 :
I could really get in trouble.
 :
It's a bee law.
You're not supposed to talk to a human.
 :
I can't believe I'm doing this.
 :
I've got to.
(Barry disguises himself as a character on a food can as Vanessa walks by
again)
 :
Oh, I can't do it. Come on!
 :
No. Yes. No.
 :
Do it. I can't.

 :
How should I start it?
(Barry strikes a pose and wiggles his eyebrows)
"You like jazz?"
No, that's no good.
(Vanessa is about to walk past Barry)
Here she comes! Speak, you fool!
 :
...Hi!
(Vanessa gasps and drops the dishes in fright and notices Barry on the
counter)
 :
I'm sorry.
VANESSA:
- You're talking.
BARRY:
- Yes, I know.
VANESSA:
(Pointing at Barry)
You're talking!
BARRY:
I'm so sorry.
VANESSA:
No, it's OK. It's fine.
I know I'm dreaming.
 :
But I don't recall going to bed.
BARRY:
Well, I'm sure this
is very disconcerting.
VANESSA:
This is a bit of a surprise to me.
I mean, you're a bee!

BARRY:
I am. And I'm not supposed
to be doing this,
(Pointing to the living room where Ken tried to kill him last night)
but they were all trying to kill me.
 :
And if it wasn't for you...
 :
I had to thank you.
It's just how I was raised.
(Vanessa stabs her hand with a fork to test whether she's dreaming or not)
 :
That was a little weird.
VANESSA:
- I'm talking with a bee.
BARRY:
- Yeah.
VANESSA:
I'm talking to a bee.
And the bee is talking to me!
BARRY:
I just want to say I'm grateful.
I'll leave now.
(Barry turns to leave)
VANESSA:
- Wait! How did you learn to do that?
BARRY:
(Flying back)
- What?
VANESSA:
The talking...thing.
BARRY:

Same way you did, I guess.
"Mama, Dada, honey." You pick it up.
VANESSA:
- That's very funny.
BARRY:
- Yeah.
 :
Bees are funny. If we didn't laugh,
we'd cry with what we have to deal with.
 :
Anyway...
VANESSA:
Can I...
 :
...get you something?
BARRY:
- Like what?
VANESSA:
I don't know. I mean...
I don't know. Coffee?
BARRY:
I don't want to put you out.
VANESSA:
It's no trouble. It takes two minutes.
 :
- It's just coffee.
BARRY:
- I hate to impose.
(Vanessa starts making coffee)
VANESSA:
- Don't be ridiculous!

BARRY:
- Actually, I would love a cup.
VANESSA:
Hey, you want rum cake?
BARRY:
- I shouldn't.
VANESSA:
- Have some.
BARRY:
- No, I can't.
VANESSA:
- Come on!
BARRY:
I'm trying to lose a couple micrograms.
VANESSA:
- Where?
BARRY:
- These stripes don't help.
VANESSA:
You look great!
BARRY:
I don't know if you know
anything about fashion.
 :
Are you all right?
VANESSA:
(Pouring coffee on the floor and missing the cup completely)
No.
(Flash forward in time. Barry and Vanessa are sitting together at a table
on top of the apartment building drinking coffee)

 :
BARRY==
He's making the tie in the cab
as they're flying up Madison.
 :
He finally gets there.
 :
He runs up the steps into the church.
The wedding is on.
 :
And he says, "Watermelon?
I thought you said Guatemalan.
 :
Why would I marry a watermelon?"
(Barry laughs but Vanessa looks confused)
VANESSA:
Is that a bee joke?
BARRY:
That's the kind of stuff we do.
VANESSA:
Yeah, different.
 :
So, what are you gonna do, Barry?
(Barry stands on top of a sugar cube floating in his coffee and paddles it
around with a straw like it's a gondola)
BARRY:
About work? I don't know.
 :
I want to do my part for the hive,
but I can't do it the way they want.
VANESSA:
I know how you feel.

BARRY:
- You do?
VANESSA:
- Sure.
 :
My parents wanted me to be a lawyer or
a doctor, but I wanted to be a florist.
BARRY:
- Really?
VANESSA:
- My only interest is flowers.
BARRY:
Our new queen was just elected
with that same campaign slogan.
 :
Anyway, if you look...
(Barry points to a tree in the middle of Central Park)
 :
There's my hive right there. See it?
VANESSA:
You're in Sheep Meadow!
BARRY:
Yes! I'm right off the Turtle Pond!
VANESSA:
No way! I know that area.
I lost a toe ring there once.
BARRY:
- Why do girls put rings on their toes?
VANESSA:
- Why not?
BARRY:

- It's like putting a hat on your knee.
VANESSA:
- Maybe I'll try that.
(A custodian installing a lightbulb looks over at them but to his
perspective it looks like Vanessa is talking to a cup of coffee on the
table)
CUSTODIAN:
- You all right, ma'am?
VANESSA:
- Oh, yeah. Fine.
 :
Just having two cups of coffee!
BARRY:
Anyway, this has been great.
Thanks for the coffee.
VANESSA==
Yeah, it's no trouble.
BARRY:
Sorry I couldn't finish it. If I did,
I'd be up the rest of my life.
(Barry points towards the rum cake)
 :
Can I take a piece of this with me?
VANESSA:
Sure! Here, have a crumb.
(Vanessa hands Barry a crumb but it is still pretty big for Barry)
BARRY:
- Thanks!
VANESSA:
- Yeah.
BARRY:
All right. Well, then...
I guess I'll see you around.

 :
Or not.
VANESSA:
OK, Barry...
BARRY:
And thank you
so much again... for before.
VANESSA:
Oh, that? That was nothing.
BARRY:
Well, not nothing, but... Anyway...
(Vanessa and Barry hold hands, but Vanessa has to hold out a finger because
her hands is to big and Barry holds that)
(The custodian looks over again and it appears Vanessa is laughing at her
coffee again. The lightbulb that he was screwing in sparks and he falls off
the ladder)
(Fast forward in time and we see two Bee Scientists testing out a parachute
in a Honex wind tunnel)
BEE SCIENTIST #1:
This can't possibly work.
BEE SCIENTIST #2:
He's all set to go.
We may as well try it.
 :
OK, Dave, pull the chute.
(Dave pulls the chute and the wind slams him against the wall and he falls
on his face.The camera pans over and we see Barry and Adam walking
together)
ADAM:
- Sounds amazing.
BARRY:
- It was amazing!
 :
It was the scariest,
happiest moment of my life.

ADAM:
Humans! I can't believe
you were with humans!
 :
Giant, scary humans!
What were they like?
BARRY:
Huge and crazy. They talk crazy.
 :
They eat crazy giant things.
They drive crazy.
ADAM:
- Do they try and kill you, like on TV?
BARRY:
- Some of them. But some of them don't.
ADAM:
- How'd you get back?
BARRY:
- Poodle.
ADAM:
You did it, and I'm glad. You saw
whatever you wanted to see.
 :
You had your "experience." Now you
can pick out your job and be normal.
BARRY:
- Well...
ADAM:
- Well?
BARRY:
Well, I met someone.

ADAM:
You did? Was she Bee-ish?
 :
- A wasp?! Your parents will kill you!
BARRY:
- No, no, no, not a wasp.
ADAM:
- Spider?
BARRY:
- I'm not attracted to spiders.
 :
I know, for everyone else, it's the hottest thing,
with the eight legs and all.
 :
I can't get by that face.
ADAM:
So who is she?
BARRY:
She's... human.
ADAM:
No, no. That's a bee law.
You wouldn't break a bee law.
BARRY:
- Her name's Vanessa.
(Adam puts his head in his hands)
ADAM:
- Oh, boy.
BARRY==
She's so nice. And she's a florist!
ADAM:
Oh, no! You're dating a human florist!

BARRY:
We're not dating.
ADAM:
You're flying outside the hive, talking
to humans that attack our homes
 :
with power washers and M-80s!
That's one-eighth a stick of dynamite!
BARRY:
She saved my life!
And she understands me.
ADAM:
This is over!
BARRY:
Eat this.
(Barry gives Adam a piece of the crumb that he got from Vanessa. Adam eats
it)
ADAM:
(Adam's tone changes)
This is not over! What was that?
BARRY:
- They call it a crumb.
ADAM:
- It was so stingin' stripey!
BARRY:
And that's not what they eat.
That's what falls off what they eat!
 :
- You know what a Cinnabon is?
ADAM:
- No.
(Adam opens a door behind him and he pulls Barry in)

BARRY:
It's bread and cinnamon and frosting.
ADAM:
Be quiet!
BARRY:
They heat it up...
ADAM:
Sit down!
(Adam forces Barry to sit down)
BARRY:
(Still rambling about Cinnabons)
...really hot!
(Adam grabs Barry by the shoulders)
ADAM:
- Listen to me!
 :
We are not them! We're us.
There's us and there's them!
BARRY==
Yes, but who can deny
the heart that is yearning?
ADAM:
There's no yearning.
Stop yearning. Listen to me!
 :
You have got to start thinking bee,
my friend. Thinking bee!
BARRY:
- Thinking bee.
WORKER BEE:
- Thinking bee.
WORKER BEES AND ADAM:
Thinking bee! Thinking bee!

Thinking bee! Thinking bee!
(Flash forward in time; Barry is laying on a raft in a pool full of honey.
He is wearing sunglasses)
JANET:
There he is. He's in the pool.
MARTIN:
You know what your problem is, Barry?
(Barry pulls down his sunglasses and he looks annoyed)
BARRY:
(Sarcastic)
I gotta start thinking bee?
JANET:
How much longer will this go on?
MARTIN:
It's been three days!
Why aren't you working?
(Puts sunglasses back on)
BARRY:
I've got a lot of big life decisions
to think about.
MARTIN:
What life? You have no life!
You have no job. You're barely a bee!
JANET:
Would it kill you
to make a little honey?
(Barry rolls off the raft and sinks into the honey pool)
 :
Barry, come out.
Your father's talking to you.
 :
Martin, would you talk to him?
MARTIN:

Barry, I'm talking to you!
(Barry keeps sinking into the honey until he is suddenly in Central Park
having a picnic with Vanessa)
(Barry has a cup of honey and he clinks his glass with Vanessas. Suddenly a
mosquito lands on Vanessa and she slaps it, killing it. They both gasp but
then burst out laughing)
VANESSA:
You coming?
(The camera pans over and Vanessa is climbing into a small yellow airplane)
BARRY:
Got everything?
VANESSA:
All set!
BARRY:
Go ahead. I'll catch up.
(Vanessa lifts off and flies ahead)
VANESSA:
Don't be too long.
(Barry catches up with Vanessa and he sticks out his arms like ana irplane.
He rolls from side to side, and Vanessa copies him with the airplane)
VANESSA:
Watch this!
(Barry stays back and watches as Vanessa draws a heart in the air using
pink smoke from the plane, but on the last loop-the-loop she suddenly
crashes into a mountain and the plane explodes. The destroyed plane falls
into some rocks and explodes a second time)
BARRY:
Vanessa!
(As Barry is yelling his mouth fills with honey and he wakes up,
discovering that he was just day dreaming. He slowly sinks back into the
honey pool)
MARTIN:
- We're still here.

JANET:
- I told you not to yell at him.
 :
He doesn't respond to yelling!
MARTIN:
- Then why yell at me?
JANET:
- Because you don't listen!
MARTIN:
I'm not listening to this.
BARRY:
Sorry, I've gotta go.
MARTIN:
- Where are you going?
BARRY:
- I'm meeting a friend.
JANET:
A girl? Is this why you can't decide?
BARRY:
Bye.
(Barry flies out the door and Martin shakes his head)
 :
JANET==
I just hope she's Bee-ish.
(Fast forward in time and Barry is sitting on Vanessa's shoulder and she is
closing up her shop)
BARRY:
They have a huge parade
of flowers every year in Pasadena?
VANESSA:
To be in the Tournament of Roses,
that's every florist's dream!

 :
Up on a float, surrounded
by flowers, crowds cheering.
BARRY:
A tournament. Do the roses
compete in athletic events?
VANESSA:
No. All right, I've got one.
How come you don't fly everywhere?
BARRY:
It's exhausting. Why don't you
run everywhere? It's faster.
VANESSA:
Yeah, OK, I see, I see.
All right, your turn.
BARRY:
TiVo. You can just freeze live TV?
That's insane!
VANESSA:
You don't have that?
BARRY:
We have Hivo, but it's a disease.
It's a horrible, horrible disease.
VANESSA:
Oh, my.
(A human walks by and Barry narrowly avoids him)
PASSERBY:
Dumb bees!
VANESSA:
You must want to sting all those jerks.
BARRY:
We try not to sting.

It's usually fatal for us.
VANESSA:
So you have to watch your temper
(They walk into a store)
BARRY:
Very carefully.
You kick a wall, take a walk,
 :
write an angry letter and throw it out.
Work through it like any emotion:
 :
Anger, jealousy, lust.
(Suddenly an employee(Hector) hits Barry off of Vanessa's shoulder. Hector
thinks he's saving Vanessa)
VANESSA:
(To Barry)
Oh, my goodness! Are you OK?
(Barry is getting up off the floor)
BARRY:
Yeah.
VANESSA:
(To Hector)
- What is wrong with you?!
HECTOR:
(Confused)
- It's a bug.
VANESSA:
He's not bothering anybody.
Get out of here, you creep!
(Vanessa hits Hector across the face with the magazine he had and then hits
him in the head. Hector backs away covering his head)
Barry:
What was that? A Pic 'N' Save circular?
(Vanessa sets Barry back on her shoulder)

VANESSA:
Yeah, it was. How did you know?
BARRY:
It felt like about 10 pages.
Seventy-five is pretty much our limit.
VANESSA:
You've really got that
down to a science.
BARRY:
- Oh, we have to. I lost a cousin to Italian Vogue.
VANESSA:
- I'll bet.
(Barry looks to his right and notices there is honey for sale in the aisle)
BARRY:
What in the name
of Mighty Hercules is this?
(Barry looks at all the brands of honey, shocked)
How did this get here?
Cute Bee, Golden Blossom,
 :
Ray Liotta Private Select?
(Barry puts his hands up and slowly turns around, a look of disgust on his
face)
VANESSA:
- Is he that actor?
BARRY:
- I never heard of him.
 :
- Why is this here?
VANESSA:
- For people. We eat it.
BARRY:

You don't have
enough food of your own?!
(Hector looks back and notices that Vanessa is talking to Barry)
VANESSA:
- Well, yes.
BARRY:
- How do you get it?
VANESSA:
- Bees make it.
BARRY:
- I know who makes it!
 :
And it's hard to make it!
 :
There's heating, cooling, stirring.
You need a whole Krelman thing!
VANESSA:
- It's organic.
BARRY:
- It's our-ganic!
VANESSA:
It's just honey, Barry.
BARRY:
Just what?!
 :
Bees don't know about this!
This is stealing! A lot of stealing!
 :
You've taken our homes, schools,
hospitals! This is all we have!
 :

And it's on sale?!
I'm getting to the bottom of this.
 :
I'm getting to the bottom
of all of this!
(Flash forward in time; Barry paints his face with black strikes like a
soldier and sneaks into the storage section of the store)
(Two men, including Hector, are loading boxes into some trucks)
 :
SUPERMARKET EMPLOYEE==
Hey, Hector.
 :
- You almost done?
HECTOR:
- Almost.
(Barry takes a step to peak around the corner)
(Whispering)
He is here. I sense it.
 :
Well, I guess I'll go home now
(Hector pretends to walk away by walking in place and speaking loudly)
 :
and just leave this nice honey out,
with no one around.
BARRY:
You're busted, box boy!
HECTOR:
I knew I heard something!
So you can talk!
BARRY:
I can talk.
And now you'll start talking!
 :
Where you getting the sweet stuff?

Who's your supplier?
HECTOR:
I don't understand.
I thought we were friends.
 :
The last thing we want
to do is upset bees!
(Hector takes a thumbtack out of the board behind him and sword-fights
Barry. Barry is using his stinger like a sword)
 :
You're too late! It's ours now!
BARRY:
You, sir, have crossed
the wrong sword!
HECTOR:
You, sir, will be lunch
for my iguana, Ignacio!
(Barry hits the thumbtack out of Hectors hand and Hector surrenders)
Barry:
Where is the honey coming from?
 :
Tell me where!
HECTOR:
(Pointing to leaving truck)
Honey Farms! It comes from Honey Farms!
(Barry chases after the truck but it is getting away. He flies onto a
bicyclists' backpack and he catches up to the truck)
CAR DRIVER:
(To bicyclist)
Crazy person!
(Barry flies off and lands on the windshield of the Honey farms truck.
Barry looks around and sees dead bugs splattered everywhere)
BARRY:
What horrible thing has happened here?

 :
These faces, they never knew
what hit them. And now
 :
they're on the road to nowhere!
(Barry hears a sudden whisper)
(Barry looks up and sees Mooseblood, a mosquito playing dead)
MOOSEBLOOD:
Just keep still.
BARRY:
What? You're not dead?
MOOSEBLOOD:
Do I look dead? They will wipe anything
that moves. Where you headed?
BARRY:
To Honey Farms.
I am onto something huge here.
MOOSEBLOOD:
I'm going to Alaska. Moose blood,
crazy stuff. Blows your head off!
ANOTHER BUG PLAYING DEAD:
I'm going to Tacoma.
(Barry looks at another bug)
BARRY:
- And you?
MOOSEBLOOD:
- He really is dead.
BARRY:
All right.
(Another bug hits the windshield and the drivers notice. They activate the
windshield wipers)
MOOSEBLOOD==
Uh-oh!
(The windshield wipers are slowly sliding over the dead bugs and wiping

them off)
BARRY:
- What is that?!
MOOSEBLOOD:
- Oh, no!
 :
- A wiper! Triple blade!
BARRY:
- Triple blade?
MOOSEBLOOD:
Jump on! It's your only chance, bee!
(Mooseblood and Barry grab onto the wiper and they hold on as it wipes the
windshield)
Why does everything have
to be so doggone clean?!
 :
How much do you people need to see?!
(Bangs on windshield)
 :
Open your eyes!
Stick your head out the window!
RADIO IN TRUCK:
From NPR News in Washington,
I'm Carl Kasell.
MOOSEBLOOD:
But don't kill no more bugs!
(Mooseblood and Barry are washed off by the wipr fluid)
MOOSEBLOOD:
- Bee!
BARRY:
- Moose blood guy!!
(Barry starts screaming as he hangs onto the antenna)
(Suddenly it is revealed that a water bug is also hanging on the antenna.

There is a pause and then Barry and the water bug both start screaming)
TRUCK DRIVER:
- You hear something?
GUY IN TRUCK:
- Like what?
TRUCK DRIVER:
Like tiny screaming.
GUY IN TRUCK:
Turn off the radio.
(The antenna starts to lower until it gets to low and sinks into the truck.
The water bug flies off and Barry is forced to let go and he is blown away.
He luckily lands inside a horn on top of the truck where he finds
Mooseblood, who was blown into the same place)
MOOSEBLOOD:
Whassup, bee boy?
BARRY:
Hey, Blood.
(Fast forward in time and we see that Barry is deep in conversation with
Mooseblood. They have been sitting in this truck for a while)
BARRY:
...Just a row of honey jars,
as far as the eye could see.
MOOSEBLOOD:
Wow!
BARRY:
I assume wherever this truck goes
is where they're getting it.
 :
I mean, that honey's ours.
MOOSEBLOOD:
- Bees hang tight.
BARRY:

- We're all jammed in.
 :
It's a close community.
MOOSEBLOOD:
Not us, man. We on our own.
Every mosquito on his own.
BARRY:
- What if you get in trouble?
MOOSEBLOOD:
- You a mosquito, you in trouble.
 :
Nobody likes us. They just smack.
See a mosquito, smack, smack!
BARRY:
At least you're out in the world.
You must meet girls.
MOOSEBLOOD:
Mosquito girls try to trade up,
get with a moth, dragonfly.
 :
Mosquito girl don't want no mosquito.
(An ambulance passes by and it has a blood donation sign on it)
You got to be kidding me!
 :
Mooseblood's about to leave
the building! So long, bee!
(Mooseblood leaves and flies onto the window of the ambulance where there
are other mosquito's hanging out)
 :
- Hey, guys!
OTHER MOSQUITO:
- Mooseblood!

MOOSEBLOOD:
I knew I'd catch y'all down here.
Did you bring your crazy straw?
(The truck goes out of view and Barry notices that the truck he's on is
pulling into a camp of some sort)
TRUCK DRIVER:
We throw it in jars, slap a label on it,
and it's pretty much pure profit.
(Barry flies out)
BARRY:
What is this place?
BEEKEEPER 1#:
A bee's got a brain
the size of a pinhead.
BEEKEEPER #2:
They are pinheads!
 :
Pinhead.
 :
- Check out the new smoker.
BEEKEEPER #1:
- Oh, sweet. That's the one you want.
 :
The Thomas 3000!
BARRY:
Smoker?
BEEKEEPER #1:
Ninety puffs a minute, semi-automatic.
Twice the nicotine, all the tar.
 :
A couple breaths of this
knocks them right out.

BEEKEEPER #2:
They make the honey,
and we make the money.
BARRY:
"They make the honey,
and we make the money"?
(The Beekeeper sprays hundreds of cheap miniature apartments with the
smoker. The bees are fainting or passing out)
Oh, my!
 :
What's going on? Are you OK?
(Barry flies into one of the apartment and helps a Bee couple get off the
ground. They are coughing and its hard for them to stand)
BEE IN APARTMENT:
Yeah. It doesn't last too long.
BARRY:
Do you know you're
in a fake hive with fake walls?
BEE IN APPARTMENT:
Our queen was moved here.
We had no choice.
(The apartment room is completely empty except for a photo on the wall of
the "queen" who is obviously a man in women's clothes)
BARRY:
This is your queen?
That's a man in women's clothes!
 :
That's a drag queen!
 :
What is this?
(Barry flies out and he discovers that there are hundreds of these
structures, each housing thousands of Bees)
Oh, no!
 :
There's hundreds of them!
(Barry takes out his camera and takes pictures of these Bee work camps. The
beekeepers look very evil in these depictions)

Bee honey.
 :
Our honey is being brazenly stolen
on a massive scale!
 :
This is worse than anything bears
have done! I intend to do something.
(Flash forward in time and Barry is showing these pictures to his parents)
JANET:
Oh, Barry, stop.
MARTIN:
Who told you humans are taking
our honey? That's a rumor.
BARRY:
Do these look like rumors?
(Holds up the pictures)
UNCLE CARL:
That's a conspiracy theory.
These are obviously doctored photos.
JANET:
How did you get mixed up in this?
ADAM:
He's been talking to humans.
JANET:
- What?
MARTIN:
- Talking to humans?!
ADAM:
He has a human girlfriend.
And they make out!
JANET:
Make out? Barry!

BARRY:
We do not.
ADAM:
- You wish you could.
MARTIN:
- Whose side are you on?
BARRY:
The bees!
UNCLE CARL:
(He has been sitting in the back of the room this entire time)
I dated a cricket once in San Antonio.
Those crazy legs kept me up all night.
JANET:
Barry, this is what you want
to do with your life?
BARRY:
I want to do it for all our lives.
Nobody works harder than bees!
 :
Dad, I remember you
coming home so overworked
 :
your hands were still stirring.
You couldn't stop.
JANET:
I remember that.
BARRY:
What right do they have to our honey?
 :
We live on two cups a year. They put it
in lip balm for no reason whatsoever!

ADAM:
Even if it's true, what can one bee do?
BARRY:
Sting them where it really hurts.
MARTIN:
In the face! The eye!
 :
- That would hurt.
BARRY:
- No.
MARTIN:
Up the nose? That's a killer.
BARRY:
There's only one place you can sting
the humans, one place where it matters.
(Flash forward a bit in time and we are watching the Bee News)
BEE NEWS NARRATOR:
Hive at Five, the hive's only
full-hour action news source.
BEE PROTESTOR:
No more bee beards!
BEE NEWS NARRATOR:
With Bob Bumble at the anchor desk.
 :
Weather with Storm Stinger.
 :
Sports with Buzz Larvi.
 :
And Jeanette Chung.
BOB BUMBLE:
- Good evening. I'm Bob Bumble.
JEANETTE CHUNG:

- And I'm Jeanette Chung.
BOB BUMBLE:
A tri-county bee, Barry Benson,
 :
intends to sue the human race
for stealing our honey,
 :
packaging it and profiting
from it illegally!
JEANETTE CHUNG:
Tomorrow night on Bee Larry King,
 :
we'll have three former queens here in
our studio, discussing their new book,
 :
Classy Ladies,
out this week on Hexagon.
(The scene changes to an interview on the news with Bee version of Larry
King and Barry)
BEE LARRY KING:
Tonight we're talking to Barry Benson.
 :
Did you ever think, "I'm a kid
from the hive. I can't do this"?
BARRY:
Bees have never been afraid
to change the world.
 :
What about Bee Columbus?
Bee Gandhi? Bejesus?
BEE LARRY KING:
Where I'm from, we'd never sue humans.

 :
We were thinking
of stickball or candy stores.
BARRY:
How old are you?
BEE LARRY KING:
The bee community
is supporting you in this case,
 :
which will be the trial
of the bee century.
BARRY:
You know, they have a Larry King
in the human world too.
BEE LARRY KING:
It's a common name. Next week...
BARRY:
He looks like you and has a show
and suspenders and colored dots...
BEE LARRY KING:
Next week...
BARRY:
Glasses, quotes on the bottom from the
guest even though you just heard 'em.
BEE LARRY KING:
Bear Week next week!
They're scary, hairy and here, live.
(Bee Larry King gets annoyed and flies away offscreen)
BARRY:
Always leans forward, pointy shoulders,
squinty eyes, very Jewish.
(Flash forward in time. We see Vanessa enter and Ken enters behind her.
They are arguing)

KEN:
In tennis, you attack
at the point of weakness!
VANESSA:
It was my grandmother, Ken. She's 81.
KEN==
Honey, her backhand's a joke!
I'm not gonna take advantage of that?
BARRY:
(To Ken)
Quiet, please.
Actual work going on here.
KEN:
(Pointing at Barry)
- Is that that same bee?
VANESSA:
- Yes, it is!
 :
I'm helping him sue the human race.
BARRY:
- Hello.
KEN:
- Hello, bee.
VANESSA:
This is Ken.
BARRY:
(Recalling the "Winter Boots" incident earlier)
Yeah, I remember you. Timberland, size
ten and a half. Vibram sole, I believe.
KEN:
(To Vanessa)
Why does he talk again?
VANESSA:

Listen, you better go
'cause we're really busy working.
KEN:
But it's our yogurt night!
VANESSA:
(Holding door open for Ken)
Bye-bye.
KEN:
(Yelling)
Why is yogurt night so difficult?!
(Ken leaves and Vanessa walks over to Barry. His workplace is a mess)
VANESSA:
You poor thing.
You two have been at this for hours!
BARRY:
Yes, and Adam here
has been a huge help.
ADAM:
- Frosting...
- How many sugars?
 ==BARRY==
Just one. I try not
to use the competition.
 :
So why are you helping me?
VANESSA:
Bees have good qualities.
 :
And it takes my mind off the shop.
 :
Instead of flowers, people
are giving balloon bouquets now.
BARRY:

Those are great, if you're three.
VANESSA:
And artificial flowers.
BARRY:
- Oh, those just get me psychotic!
VANESSA:
- Yeah, me too.
 :
BARRY:
Bent stingers, pointless pollination.
ADAM:
Bees must hate those fake things!
 :
Nothing worse
than a daffodil that's had work done.
 :
Maybe this could make up
for it a little bit.
VANESSA:
- This lawsuit's a pretty big deal.
BARRY:
- I guess.
ADAM:
You sure you want to go through with it?
BARRY:
Am I sure? When I'm done with
the humans, they won't be able
 :
to say, "Honey, I'm home,"
without paying a royalty!
(Flash forward in time and we are watching the human news. The camera shows

a crowd outside a courthouse)
NEWS REPORTER:
It's an incredible scene
here in downtown Manhattan,
 :
where the world anxiously waits,
because for the first time in history,
 :
we will hear for ourselves
if a honeybee can actually speak.
(We are no longer watching through a news camera)
ADAM:
What have we gotten into here, Barry?
BARRY:
It's pretty big, isn't it?
ADAM==
(Looking at the hundreds of people around the courthouse)
I can't believe how many humans
don't work during the day.
BARRY:
You think billion-dollar multinational
food companies have good lawyers?
SECURITY GUARD:
Everybody needs to stay
behind the barricade.
(A limousine drives up and a fat man,Layton Montgomery, a honey industry
owner gets out and walks past Barry)
ADAM:
- What's the matter?
BARRY:
- I don't know, I just got a chill.
(Fast forward in time and everyone is in the court)
MONTGOMERY:
Well, if it isn't the bee team.

(To Honey Industry lawyers)
You boys work on this?
MAN:
All rise! The Honorable
Judge Bumbleton presiding.
JUDGE BUMBLETON:
All right. Case number 4475,
 :
Superior Court of New York,
Barry Bee Benson v. the Honey Industry
 :
is now in session.
 :
Mr. Montgomery, you're representing
the five food companies collectively?
MONTGOMERY:
A privilege.
JUDGE BUMBLETON:
Mr. Benson... you're representing
all the bees of the world?
(Everyone looks closely, they are waiting to see if a Bee can really talk)
(Barry makes several buzzing sounds to sound like a Bee)
BARRY:
I'm kidding. Yes, Your Honor,
we're ready to proceed.
JUDGE BUMBLBETON:
Mr. Montgomery,
your opening statement, please.
MONTGOMERY:
Ladies and gentlemen of the jury,
 :
my grandmother was a simple woman.
 :

Born on a farm, she believed
it was man's divine right
 :
to benefit from the bounty
of nature God put before us.
 :
If we lived in the topsy-turvy world
Mr. Benson imagines,
 :
just think of what would it mean.
 :
I would have to negotiate
with the silkworm
 :
for the elastic in my britches!
 :
Talking bee!
(Montgomery walks over and looks closely at Barry)
 :
How do we know this isn't some sort of
 :
holographic motion-picture-capture
Hollywood wizardry?
 :
They could be using laser beams!
 :
Robotics! Ventriloquism!
Cloning! For all we know,
 :
he could be on steroids!
JUDGE BUMBLETON:
Mr. Benson?

BARRY:
Ladies and gentlemen,
there's no trickery here.
 :
I'm just an ordinary bee.
Honey's pretty important to me.
 :
It's important to all bees.
We invented it!
 :
We make it. And we protect it
with our lives.
 :
Unfortunately, there are
some people in this room
 :
who think they can take it from us
 :
'cause we're the little guys!
I'm hoping that, after this is all over,
 :
you'll see how, by taking our honey,
you not only take everything we have
 :
but everything we are!
JANET==
(To Martin)
I wish he'd dress like that
all the time. So nice!
JUDGE BUMBLETON:
Call your first witness.
BARRY:
So, Mr. Klauss Vanderhayden

of Honey Farms, big company you have.
KLAUSS VANDERHAYDEN:
I suppose so.
BARRY:
I see you also own
Honeyburton and Honron!
KLAUSS:
Yes, they provide beekeepers
for our farms.
BARRY:
Beekeeper. I find that
to be a very disturbing term.
 :
I don't imagine you employ
any bee-free-ers, do you?
KLAUSS:
(Quietly)
- No.
BARRY:
- I couldn't hear you.
KLAUSS:
- No.
BARRY:
- No.
 :
Because you don't free bees.
You keep bees. Not only that,
 :
it seems you thought a bear would be
an appropriate image for a jar of honey.
KLAUSS:
They're very lovable creatures.

 :
Yogi Bear, Fozzie Bear, Build-A-Bear.
BARRY:
You mean like this?
(The bear from Over The Hedge barges in through the back door and it is
roaring and standing on its hind legs. It is thrashing its claws and people
are screaming. It is being held back by a guard who has the bear on a
chain)
 :
(Pointing to the roaring bear)
Bears kill bees!
 :
How'd you like his head crashing
through your living room?!
 :
Biting into your couch!
Spitting out your throw pillows!
JUDGE BUMBLETON:
OK, that's enough. Take him away.
(The bear stops roaring and thrashing and walks out)
BARRY:
So, Mr. Sting, thank you for being here.
Your name intrigues me.
 :
- Where have I heard it before?
MR. STING:
- I was with a band called The Police.
BARRY:
But you've never been
a police officer, have you?
STING:
No, I haven't.
BARRY:

No, you haven't. And so here
we have yet another example
 :
of bee culture casually
stolen by a human
 :
for nothing more than
a prance-about stage name.
STING:
Oh, please.
BARRY:
Have you ever been stung, Mr. Sting?
 :
Because I'm feeling
a little stung, Sting.
 :
Or should I say... Mr. Gordon M. Sumner!
MONTGOMERY:
That's not his real name?! You idiots!
BARRY:
Mr. Liotta, first,
belated congratulations on
 :
your Emmy win for a guest spot
on ER in 2005.
RAY LIOTTA:
Thank you. Thank you.
BARRY:
I see from your resume
that you're devilishly handsome
 :
with a churning inner turmoil

that's ready to blow.
RAY LIOTTA:
I enjoy what I do. Is that a crime?
BARRY:
Not yet it isn't. But is this
what it's come to for you?
 :
Exploiting tiny, helpless bees
so you don't
 :
have to rehearse
your part and learn your lines, sir?
RAY LIOTTA:
Watch it, Benson!
I could blow right now!
BARRY:
This isn't a goodfella.
This is a badfella!
(Ray Liotta looses it and tries to grab Barry)
RAY LIOTTA:
Why doesn't someone just step on
this creep, and we can all go home?!
JUDGE BUMBLETON:
- Order in this court!
RAY LIOTTA:
- You're all thinking it!
(Judge Bumbleton starts banging her gavel)
JUDGE BUMBLETON:
Order! Order, I say!
RAY LIOTTA:
- Say it!
MAN:

- Mr. Liotta, please sit down!
(We see a montage of magazines which feature the court case)
(Flash forward in time and Barry is back home with Vanessa)
BARRY:
I think it was awfully nice
of that bear to pitch in like that.
VANESSA:
I think the jury's on our side.
BARRY:
Are we doing everything right,you know, legally?
VANESSA:
I'm a florist.
BARRY:
Right. Well, here's to a great team.
VANESSA:
To a great team!
(Ken walks in from work. He sees Barry and he looks upset when he sees
Barry clinking his glass with Vanessa)
KEN:
Well, hello.
VANESSA:
- Oh, Ken!
BARRY:
- Hello!
VANESSA:
I didn't think you were coming.
 :
No, I was just late.
I tried to call, but...
(Ken holds up his phone and flips it open. The phone has no charge)
...the battery...
VANESSA:

I didn't want all this to go to waste,
so I called Barry. Luckily, he was free.
KEN:
Oh, that was lucky.
(Ken sits down at the table across from Barry and Vanessa leaves the room)
VANESSA:
There's a little left.
I could heat it up.
KEN:
(Not taking his eyes off Barry)
Yeah, heat it up, sure, whatever.
BARRY:
So I hear you're quite a tennis player.
 :
I'm not much for the game myself.
The ball's a little grabby.
KEN:
That's where I usually sit.
Right...
(Points to where Barry is sitting)
there.
VANESSA:
(Calling from other room)
Ken, Barry was looking at your resume,
 :
and he agreed with me that eating with
chopsticks isn't really a special skill.
KEN:
(To Barry)
You think I don't see what you're doing?
BARRY:
I know how hard it is to find
the right job. We have that in common.

KEN:
Do we?
BARRY:
Bees have 100 percent employment,
but we do jobs like taking the crud out.
KEN:
(Menacingly)
That's just what
I was thinking about doing.
(Ken reaches for a fork on the table but knocks if on the floor. He goes to
pick it up)
VANESSA:
Ken, I let Barry borrow your razor
for his fuzz. I hope that was all right.
(Ken quickly rises back up after hearing this but hits his head on the
table and yells)
BARRY:
I'm going to drain the old stinger.
KEN:
Yeah, you do that.
(Barry flies past Ken to get to the bathroom and Ken freaks out, splashing
some of the wine he was using to cool his head in his eyes. He yells in
anger)
(Barry looks at the magazines featuring his victories in court)
BARRY:
Look at that.
(Barry flies into the bathroom)
(He puts his hand on his head but this makes hurts him and makes him even
madder. He yells again)
(Barry is washing his hands in the sink but then Ken walks in)
KEN:
You know, you know I've just about had it
(Closes bathroom door behind him)
with your little mind games.
(Ken is menacingly rolling up a magazine)
BARRY:

(Backing away)
- What's that?
KEN:
- Italian Vogue.
BARRY:
Mamma mia, that's a lot of pages.
KEN:
It's a lot of ads.
BARRY:
Remember what Van said, why is
your life more valuable than mine?
KEN:
That's funny, I just can't seem to recall that!
(Ken smashes everything off the sink with the magazine and Barry narrowly
escapes)
(Ken follows Barry around and tries to hit him with the magazine but he
keeps missing)
(Ken gets a spray bottle)
 :
I think something stinks in here!
BARRY:
(Enjoying the spray)
I love the smell of flowers.
(Ken holds a lighter in front of the spray bottle)
KEN:
How do you like the smell of flames?!
BARRY:
Not as much.
(Ken fires his make-shift flamethrower but misses Barry, burning the
bathroom. He torches the whole room but looses his footing and falls into
the bathtub. After getting hit in the head by falling objects 3 times he
picks up the shower head, revealing a Water bug hiding under it)
WATER BUG:
Water bug! Not taking sides!

(Barry gets up out of a pile of bathroom supplies and he is wearing a
chapstick hat)
BARRY:
Ken, I'm wearing a Chapstick hat!
This is pathetic!
(Ken switches the shower head to lethal)
KEN:
I've got issues!
(Ken sprays Barry with the shower head and he crash lands into the toilet)
(Ken menacingly looks down into the toilet at Barry)
Well, well, well, a royal flush!
BARRY:
- You're bluffing.
KEN:
- Am I?
(flushes toilet)
(Barry grabs a chapstick from the toilet seat and uses it to surf in the
flushing toilet)
BARRY:
Surf's up, dude!
(Barry flies out of the toilet on the chapstick and sprays Ken's face with
the toilet water)
 :
EW,Poo water!
BARRY:
That bowl is gnarly.
KEN:
(Aiming a toilet cleaner at Barry)
Except for those dirty yellow rings!
(Barry cowers and covers his head and Vanessa runs in and takes the toilet
cleaner from Ken just before he hits Barry)
VANESSA:
Kenneth! What are you doing?!
KEN==
(Leaning towards Barry)

You know, I don't even like honey!
I don't eat it!
VANESSA:
We need to talk!
(Vanessa pulls Ken out of the bathroom)
 :
He's just a little bee!
 :
And he happens to be
the nicest bee I've met in a long time!
KEN:
Long time? What are you talking about?!
Are there other bugs in your life?
VANESSA:
No, but there are other things bugging
me in life. And you're one of them!
KEN:
Fine! Talking bees, no yogurt night...
 :
My nerves are fried from riding
on this emotional roller coaster!
VANESSA:
Goodbye, Ken.
(Ken huffs and walks out and slams the door. But suddenly he walks back in
and stares at Barry)
 :
And for your information,
I prefer sugar-free, artificial
sweeteners MADE BY MAN!
(Ken leaves again and Vanessa leans in towards Barry)
VANESSA:
I'm sorry about all that.
(Ken walks back in again)

KEN:
I know it's got
an aftertaste! I LIKE IT!
(Ken leaves for the last time)
VANESSA:
I always felt there was some kind
of barrier between Ken and me.
 :
I couldn't overcome it.
Oh, well.
 :
Are you OK for the trial?
BARRY:
I believe Mr. Montgomery
is about out of ideas.
(Flash forward in time and Barry, Adam, and Vanessa are back in court)
MONTGOMERY--
We would like to call
Mr. Barry Benson Bee to the stand.
ADAM:
Good idea! You can really see why he's
considered one of the best lawyers...
(Barry stares at Adam)
...Yeah.
LAWYER:
Layton, you've
gotta weave some magic
with this jury,
or it's gonna be all over.
MONTGOMERY:
Don't worry. The only thing I have
to do to turn this jury around
 :
is to remind them
of what they don't like about bees.
(To lawyer)

- You got the tweezers?
LAWYER:
- Are you allergic?
MONTGOMERY:
Only to losing, son. Only to losing.
 :
Mr. Benson Bee, I'll ask you
what I think we'd all like to know.
 :
What exactly is your relationship
(Points to Vanessa)
 :
to that woman?
BARRY:
We're friends.
MONTGOMERY:
- Good friends?
BARRY:
- Yes.
MONTGOMERY:
How good? Do you live together?
ADAM:
Wait a minute...
 :
MONTGOMERY:
Are you her little...
 :
...bedbug?
(Adam's stinger starts vibrating. He is agitated)
I've seen a bee documentary or two.
From what I understand,

 :
doesn't your queen give birth
to all the bee children?
BARRY:
- Yeah, but...
MONTGOMERY:
(Pointing at Janet and Martin)
- So those aren't your real parents!
JANET:
- Oh, Barry...
BARRY:
- Yes, they are!
ADAM:
Hold me back!
(Vanessa tries to hold Adam back. He wants to sting Montgomery)
MONTGOMERY:
You're an illegitimate bee,
aren't you, Benson?
ADAM:
He's denouncing bees!
MONTGOMERY:
Don't y'all date your cousins?
(Montgomery leans over on the jury stand and stares at Adam)
VANESSA:
- Objection!
(Vanessa raises her hand to object but Adam gets free. He flies straight at
Montgomery)
=ADAM:
- I'm going to pincushion this guy!
BARRY:
Adam, don't! It's what he wants!
(Adam stings Montgomery in the butt and he starts thrashing around)

MONTGOMERY:
Oh, I'm hit!!
 :
Oh, lordy, I am hit!
JUDGE BUMBLETON:
(Banging gavel)
Order! Order!
MONTGOMERY:
(Overreacting)
The venom! The venom
is coursing through my veins!
 :
I have been felled
by a winged beast of destruction!
 :
You see? You can't treat them
like equals! They're striped savages!
 :
Stinging's the only thing
they know! It's their way!
BARRY:
- Adam, stay with me.
ADAM:
- I can't feel my legs.
MONTGOMERY:
(Overreacting and throwing his body around the room)
What angel of mercy
will come forward to suck the poison
 :
from my heaving buttocks?
JUDGE BUMLBETON:
I will have order in this court. Order!

 :
Order, please!
(Flash forward in time and we see a human news reporter)
NEWS REPORTER:
The case of the honeybees
versus the human race
 :
took a pointed turn against the bees
 :
yesterday when one of their legal
team stung Layton T. Montgomery.
(Adam is laying in a hospital bed and Barry flies in to see him)
BARRY:
- Hey, buddy.
ADAM:
- Hey.
BARRY:
- Is there much pain?
ADAM:
- Yeah.
 :
I...
 :
I blew the whole case, didn't I?
BARRY:
It doesn't matter. What matters is
you're alive. You could have died.
ADAM:
I'd be better off dead. Look at me.
(A small plastic sword is replaced as Adam's stinger)
They got it from the cafeteria
downstairs, in a tuna sandwich.

 :
Look, there's
a little celery still on it.
(Flicks off the celery and sighs)
BARRY:
What was it like to sting someone?
ADAM:
I can't explain it. It was all...
 :
All adrenaline and then...
and then ecstasy!
BARRY:
...All right.
ADAM:
You think it was all a trap?
BARRY:
Of course. I'm sorry.
I flew us right into this.
 :
What were we thinking? Look at us. We're
just a couple of bugs in this world.
ADAM:
What will the humans do to us
if they win?
BARRY:
I don't know.
ADAM:
I hear they put the roaches in motels.
That doesn't sound so bad.
BARRY:
Adam, they check in,
but they don't check out!

ADAM:
Oh, my.
(Coughs)
Could you get a nurse
to close that window?
BARRY:
- Why?
ADAM:
- The smoke.
(We can see that two humans are smoking cigarettes outside)
 :
Bees don't smoke.
BARRY:
Right. Bees don't smoke.
 :
Bees don't smoke!
But some bees are smoking.
 :
That's it! That's our case!
ADAM:
It is? It's not over?
BARRY:
Get dressed. I've gotta go somewhere.
 :
Get back to the court and stall.
Stall any way you can.
(Flash forward in time and Adam is making a paper boat in the courtroom)
ADAM:
And assuming you've done step 29 correctly, you're ready for the tub!
(We see that the jury have each made their own paper boats after being
taught how by Adam. They all look confused)
JUDGE BUMBLETON:

Mr. Flayman.
ADAM:
Yes? Yes, Your Honor!
JUDGE BUMBLETON:
Where is the rest of your team?
ADAM:
(Continues stalling)
Well, Your Honor, it's interesting.
 :
Bees are trained to fly haphazardly,
 :
and as a result,
we don't make very good time.
 :
I actually heard a funny story about...
MONTGOMERY:
Your Honor,
haven't these ridiculous bugs
 :
taken up enough
of this court's valuable time?
 :
How much longer will we allow
these absurd shenanigans to go on?
 :
They have presented no compelling
evidence to support their charges
 :
against my clients,
who run legitimate businesses.
 :
I move for a complete dismissal

of this entire case!
JUDGE BUMBLETON:
Mr. Flayman, I'm afraid I'm going
 :
to have to consider
Mr. Montgomery's motion.
ADAM:
But you can't! We have a terrific case.
MONTGOMERY:
Where is your proof?
Where is the evidence?
 :
Show me the smoking gun!
BARRY:
(Barry flies in through the door)
Hold it, Your Honor!
You want a smoking gun?
 :
Here is your smoking gun.
(Vanessa walks in holding a bee smoker. She sets it down on the Judge's
podium)
JUDGE BUMBLETON:
What is that?
BARRY:
It's a bee smoker!
MONTGOMERY:
(Picks up smoker)
What, this?
This harmless little contraption?
 :
This couldn't hurt a fly,
let alone a bee.
(Montgomery accidentally fires it at the bees in the crowd and they faint

and cough)
(Dozens of reporters start taking pictures of the suffering bees)
BARRY:
Look at what has happened
 :
to bees who have never been asked,
"Smoking or non?"
 :
Is this what nature intended for us?
 :
To be forcibly addicted
to smoke machines
 :
and man-made wooden slat work camps?
 :
Living out our lives as honey slaves
to the white man?
(Barry points to the honey industry owners. One of them is an African
American so he awkwardly separates himself from the others)
LAWYER:
- What are we gonna do?
- He's playing the species card.
BARRY:
Ladies and gentlemen, please,
free these bees!
ADAM AND VANESSA:
Free the bees! Free the bees!
BEES IN CROWD:
Free the bees!
HUMAN JURY:
Free the bees! Free the bees!
JUDGE BUMBLETON:
The court finds in favor of the bees!

BARRY:
Vanessa, we won!
VANESSA:
I knew you could do it! High-five!
(Vanessa hits Barry hard because her hand is too big)
 :
Sorry.
BARRY:
(Overjoyed)
I'm OK! You know what this means?
 :
All the honey
will finally belong to the bees.
 :
Now we won't have
to work so hard all the time.
MONTGOMERY:
This is an unholy perversion
of the balance of nature, Benson.
 :
You'll regret this.
(Montgomery leaves and Barry goes outside the courtroom. Several reporters
start asking Barry questions)
REPORTER 1#:
Barry, how much honey is out there?
BARRY:
All right. One at a time.
REPORTER 2#:
Barry, who are you wearing?
BARRY:
My sweater is Ralph Lauren,
and I have no pants.

(Barry flies outside with the paparazzi and Adam and Vanessa stay back)
ADAM:
(To Vanessa)
- What if Montgomery's right?
Vanessa:
- What do you mean?
ADAM:
We've been living the bee way
a long time, 27 million years.
(Flash forward in time and Barry is talking to a man)
BUSINESS MAN:
Congratulations on your victory.
What will you demand as a settlement?
BARRY:
First, we'll demand a complete shutdown
of all bee work camps.
(As Barry is talking we see a montage of men putting "closed" tape over the
work camps and freeing the bees in the crappy apartments)
Then we want back the honey
that was ours to begin with,
 :
every last drop.
(Men in suits are pushing all the honey of the aisle and into carts)
We demand an end to the glorification
of the bear as anything more
(We see a statue of a bear-shaped honey container being pulled down by
bees)
than a filthy, smelly,
bad-breath stink machine.
 :
We're all aware
of what they do in the woods.
(We see Winnie the Pooh sharing his honey with Piglet in the cross-hairs of
a high-tech sniper rifle)
BARRY:
(Looking through binoculars)

Wait for my signal.
 :
Take him out.
(Winnie gets hit by a tranquilizer dart and dramatically falls off the log
he was standing on, his tongue hanging out. Piglet looks at Pooh in fear
and the Sniper takes the honey.)
SNIPER:
He'll have nausea
for a few hours, then he'll be fine.
(Flash forward in time)
BARRY:
And we will no longer tolerate
bee-negative nicknames...
(Mr. Sting is sitting at home until he is taken out of his house by the men
in suits)
STING:
But it's just a prance-about stage name!
BARRY:
...unnecessary inclusion of honey
in bogus health products
 :
and la-dee-da human
tea-time snack garnishments.
(An old lady is mixing honey into her tea but suddenly men in suits smash
her face down on the table and take the honey)
OLD LADY:
Can't breathe.
(A honey truck pulls up to Barry's hive)
WORKER:
Bring it in, boys!
 :
Hold it right there! Good.
 :
Tap it.

(Tons of honey is being pumped into the hive's storage)
BEE WORKER 1#:
(Honey overflows from the cup)
Mr. Buzzwell, we just passed three cups,
and there's gallons more coming!
 :
- I think we need to shut down!
=BEE WORKER #2=
- Shut down? We've never shut down.
 :
Shut down honey production!
DEAN BUZZWELL:
Stop making honey!
(The bees all leave their stations. Two bees run into a room and they put
the keys into a machine)
Turn your key, sir!
(Two worker bees dramatically turn their keys, which opens the button which
they press, shutting down the honey-making machines. This is the first time
this has ever happened)
BEE:
...What do we do now?
(Flash forward in time and a Bee is about to jump into a pool full of
honey)
Cannonball!
(The bee gets stuck in the honey and we get a short montage of Bees leaving
work)
(We see the Pollen Jocks flying but one of them gets a call on his antenna)
LOU LU DUVA:
(Through "phone")
We're shutting honey production!
 :
Mission abort.
POLLEN JOCK #1:
Aborting pollination and nectar detail.
Returning to base.
(The Pollen Jocks fly back to the hive)

(We get a time lapse of Central Park slowly wilting away as the bees all
relax)
BARRY:
Adam, you wouldn't believe
how much honey was out there.
ADAM:
Oh, yeah?
BARRY:
What's going on? Where is everybody?
(The entire street is deserted)
 :
- Are they out celebrating?
ADAM:
- They're home.
 :
They don't know what to do.
Laying out, sleeping in.
 :
I heard your Uncle Carl was on his way
to San Antonio with a cricket.
BARRY:
At least we got our honey back.
ADAM:
Sometimes I think, so what if humans
liked our honey? Who wouldn't?
 :
It's the greatest thing in the world!
I was excited to be part of making it.
 :
This was my new desk. This was my
new job. I wanted to do it really well.
 :

And now...
 :
Now I can't.
(Flash forward in time and Barry is talking to Vanessa)
BARRY:
I don't understand
why they're not happy.
 :
I thought their lives would be better!
 :
They're doing nothing. It's amazing.
Honey really changes people.
VANESSA:
You don't have any idea
what's going on, do you?
BARRY:
- What did you want to show me?
(Vanessa takes Barry to the rooftop where they first had coffee and points
to her store)
VANESSA:
- This.
(Points at her flowers. They are all grey and wilting)
BARRY:
What happened here?
VANESSA:
That is not the half of it.
(Small flash forward in time and Vanessa and Barry are on the roof of her
store and she points to Central Park)
(We see that Central Park is no longer green and colorful, rather it is
grey, brown, and dead-like. It is very depressing to look at)
BARRY:
Oh, no. Oh, my.
 :

They're all wilting.
VANESSA:
Doesn't look very good, does it?
BARRY:
No.
VANESSA:
And whose fault do you think that is?
BARRY:
You know, I'm gonna guess bees.
VANESSA==
(Staring at Barry)
Bees?
BARRY:
Specifically, me.
 :
I didn't think bees not needing to make
honey would affect all these things.
VANESSA:
It's not just flowers.
Fruits, vegetables, they all need bees.
BARRY:
That's our whole SAT test right there.
VANESSA:
Take away produce, that affects
the entire animal kingdom.
 :
And then, of course...
BARRY:
The human species?
 :
So if there's no more pollination,

 :
it could all just go south here,
couldn't it?
VANESSA:
I know this is also partly my fault.
BARRY:
How about a suicide pact?
VANESSA:
How do we do it?
BARRY:
- I'll sting you, you step on me.
VANESSA:
- That just kills you twice.
BARRY:
Right, right.
VANESSA:
Listen, Barry...
sorry, but I gotta get going.
(Vanessa leaves)
BARRY:
(To himself)
I had to open my mouth and talk.
 :
Vanessa?
 :
Vanessa? Why are you leaving?
Where are you going?
(Vanessa is getting into a taxi)
VANESSA:
To the final Tournament of Roses parade
in Pasadena.
 :

They've moved it to this weekend
because all the flowers are dying.
 :
It's the last chance
I'll ever have to see it.
BARRY:
Vanessa, I just wanna say I'm sorry.
I never meant it to turn out like this.
VANESSA:
I know. Me neither.
(The taxi starts to drive away)
BARRY:
Tournament of Roses.
Roses can't do sports.
 :
Wait a minute. Roses. Roses?
 :
Roses!
 :
Vanessa!
(Barry flies after the Taxi)
VANESSA:
Roses?!
 :
Barry?
(Barry is flying outside the window of the taxi)
BARRY:
- Roses are flowers!
VANESSA:
- Yes, they are.
BARRY:
Flowers, bees, pollen!

VANESSA:
I know.
That's why this is the last parade.
BARRY:
Maybe not.
Could you ask him to slow down?
VANESSA:
Could you slow down?
(The taxi driver screeches to a stop and Barry keeps flying forward)
 :
Barry!
(Barry flies back to the window)
BARRY:
OK, I made a huge mistake.
This is a total disaster, all my fault.
VANESSA:
Yes, it kind of is.
BARRY:
I've ruined the planet.
I wanted to help you
 :
with the flower shop.
I've made it worse.
VANESSA:
Actually, it's completely closed down.
BARRY:
I thought maybe you were remodeling.
 :
But I have another idea, and it's
greater than my previous ideas combined.
VANESSA:
I don't want to hear it!

BARRY:
All right, they have the roses,
the roses have the pollen.
 :
I know every bee, plant
and flower bud in this park.
 :
All we gotta do is get what they've got
back here with what we've got.
 :
- Bees.
VANESSA:
- Park.
BARRY:
- Pollen!
VANESSA:
- Flowers.
BARRY:
- Re-pollination!
VANESSA:
- Across the nation!
 :
Tournament of Roses,
Pasadena, California.
 :
They've got nothing
but flowers, floats and cotton candy.
 :
Security will be tight.
BARRY:
I have an idea.

(Flash forward in time. Vanessa is about to board a plane which has all the
Roses on board.
VANESSA:
Vanessa Bloome, FTD.
(Holds out badge)
 :
Official floral business. It's real.
SECURITY GUARD:
Sorry, ma'am. Nice brooch.
=VANESSA==
Thank you. It was a gift.
(Barry is revealed to be hiding inside the brooch)
(Flash back in time and Barry and Vanessa are discussing their plan)
BARRY:
Once inside,
we just pick the right float.
VANESSA:
How about The Princess and the Pea?
 :
I could be the princess,
and you could be the pea!
BARRY:
Yes, I got it.
 :
- Where should I sit?
GUARD:
- What are you?
BARRY:
- I believe I'm the pea.
GUARD:
- The pea?
VANESSA:

It goes under the mattresses.
GUARD:
- Not in this fairy tale, sweetheart.
- I'm getting the marshal.
VANESSA:
You do that!
This whole parade is a fiasco!
 :
Let's see what this baby'll do.
(Vanessa drives the float through traffic)
GUARD:
Hey, what are you doing?!
BARRY==
Then all we do
is blend in with traffic...
 :
...without arousing suspicion.
 :
Once at the airport,
there's no stopping us.
(Flash forward in time and Barry and Vanessa are about to get on a plane)
SECURITY GUARD:
Stop! Security.
 :
- You and your insect pack your float?
VANESSA:
- Yes.
SECURITY GUARD:
Has it been
in your possession the entire time?
VANESSA:
- Yes.

SECURITY GUARD:
Would you remove your shoes?
(To Barry)
- Remove your stinger.
BARRY:
- It's part of me.
SECURITY GUARD:
I know. Just having some fun.
Enjoy your flight.
(Barry plotting with Vanessa)
BARRY:
Then if we're lucky, we'll have
just enough pollen to do the job.
(Flash forward in time and Barry and Vanessa are flying on the plane)
Can you believe how lucky we are? We
have just enough pollen to do the job!
VANESSA:
I think this is gonna work.
BARRY:
It's got to work.
CAPTAIN SCOTT:
(On intercom)
Attention, passengers,
this is Captain Scott.
 :
We have a bit of bad weather
in New York.
 :
It looks like we'll experience
a couple hours delay.
VANESSA:
Barry, these are cut flowers
with no water. They'll never make it.
BARRY:

I gotta get up there
and talk to them.
VANESSA==
Be careful.
(Barry flies right outside the cockpit door)
BARRY:
Can I get help
with the Sky Mall magazine?
I'd like to order the talking
inflatable nose and ear hair trimmer.
(The flight attendant opens the door and walks out and Barry flies into the
cockpit unseen)
BARRY:
Captain, I'm in a real situation.
CAPTAIN SCOTT:
- What'd you say, Hal?
CO-PILOT HAL:
- Nothing.
(Scott notices Barry and freaks out)
CAPTAIN SCOTT:
Bee!
BARRY:
No,no,no, Don't freak out! My entire species...
(Captain Scott gets out of his seat and tries to suck Barry into a handheld
vacuum)
HAL:
(To Scott)
What are you doing?
(Barry lands on Hals hair but Scott sees him. He tries to suck up Barry but
instead he sucks up Hals toupee)
CAPTAIN SCOTT:
Uh-oh.
BARRY:
- Wait a minute! I'm an attorney!

HAL:
(Hal doesn't know Barry is on his head)
- Who's an attorney?
CAPTAIN SCOTT:
Don't move.
(Scott hits Hal in the face with the vacuum in an attempt to hit Barry. Hal
is knocked out and he falls on the life raft button which launches an
infalatable boat into Scott, who gets knocked out and falls to the floor.
They are both uncounscious.)
BARRY:
(To himself)
Oh, Barry.
BARRY:
(On intercom, with a Southern accent)
Good afternoon, passengers.
This is your captain.
 :
Would a Miss Vanessa Bloome in 24B
please report to the cockpit?
(Vanessa looks confused)
(Normal accent)
...And please hurry!
(Vanessa opens the door and sees the life raft and the uncounscious pilots)
VANESSA:
What happened here?
BARRY:
I tried to talk to them, but
then there was a DustBuster,
a toupee, a life raft exploded.
 :
Now one's bald, one's in a boat,
and they're both unconscious!
VANESSA:
...Is that another bee joke?
BARRY:

- No!
 :
No one's flying the plane!
BUD DITCHWATER:
(Through radio on plane)
This is JFK control tower, Flight 356.
What's your status?
VANESSA:
This is Vanessa Bloome.
I'm a florist from New York.
BUD:
Where's the pilot?
VANESSA:
He's unconscious,
and so is the copilot.
BUD:
Not good. Does anyone onboard
have flight experience?
BARRY:
As a matter of fact, there is.
BUD:
- Who's that?
BARRY:
- Barry Benson.
BUD:
From the honey trial?! Oh, great.
BARRY:
Vanessa, this is nothing more
than a big metal bee.
 :
It's got giant wings, huge engines.

VANESSA:
I can't fly a plane.
BARRY:
- Why not? Isn't John Travolta a pilot?
VANESSA:
- Yes.
BARRY:
How hard could it be?
(Vanessa sits down and flies for a little bit but we see lightning clouds
outside the window)
VANESSA:
Wait, Barry!
We're headed into some lightning.
(An ominous lightning storm looms in front of the plane)
(We are now watching the Bee News)
BOB BUMBLE:
This is Bob Bumble. We have some
late-breaking news from JFK Airport,
 :
where a suspenseful scene
is developing.
 :
Barry Benson,
fresh from his legal victory...
ADAM:
That's Barry!
BOB BUMBLE:
...is attempting to land a plane,
loaded with people, flowers
 :
and an incapacitated flight crew.
JANET, MARTIN, UNCLE CAR AND ADAM:
Flowers?!
(The scene switches to the human news)

REPORTER:
(Talking with Bob Bumble)
We have a storm in the area
and two individuals at the controls
 :
with absolutely no flight experience.
BOB BUMBLE:
Just a minute.
There's a bee on that plane.
BUD:
I'm quite familiar with Mr. Benson
and his no-account compadres.
 :
They've done enough damage.
REPORTER:
But isn't he your only hope?
BUD:
Technically, a bee
shouldn't be able to fly at all.
 :
Their wings are too small...
BARRY:
(Through radio)
Haven't we heard this a million times?
 :
"The surface area of the wings
and body mass make no sense."...
BOB BUMBLE:
- Get this on the air!
BEE:
- Got it.

BEE NEWS CREW:
- Stand by.
BEE NEWS CREW:
- We're going live!
BARRY:
(Through radio on TV)
...The way we work may be a mystery to you.
 :
Making honey takes a lot of bees
doing a lot of small jobs.
 :
But let me tell you about a small job.
 :
If you do it well,
it makes a big difference.
 :
More than we realized.
To us, to everyone.
 :
That's why I want to get bees
back to working together.
 :
That's the bee way!
We're not made of Jell-O.
 :
We get behind a fellow.
 :
- Black and yellow!
BEES:
- Hello!
(The scene switches and Barry is teaching Vanessa how to fly)
BARRY:

Left, right, down, hover.
VANESSA:
- Hover?
BARRY:
- Forget hover.
VANESSA:
This isn't so hard.
(Pretending to honk the horn)
Beep-beep! Beep-beep!
(A Lightning bolt hits the plane and autopilot turns off)
Barry, what happened?!
BARRY:
Wait, I think we were
on autopilot the whole time.
VANESSA:
- That may have been helping me.
BARRY:
- And now we're not!
VANESSA:
So it turns out I cannot fly a plane.
(The plane plummets but we see Lou Lu Duva and the Pollen Jocks, along with
multiple other bees flying towards the plane)
Lou Lu DUva:
All of you, let's get
behind this fellow! Move it out!
 :
Move out!
(The scene switches back to Vanessa and Barry in the plane)
BARRY:
Our only chance is if I do what I'd do,
you copy me with the wings of the plane!
(Barry sticks out his arms like an airplane and flys in front of Vanessa's
face)

VANESSA:
Don't have to yell.
BARRY:
I'm not yelling!
We're in a lot of trouble.
VANESSA:
It's very hard to concentrate
with that panicky tone in your voice!
BARRY:
It's not a tone. I'm panicking!
VANESSA:
I can't do this!
(Barry slaps Vanessa)
BARRY:
Vanessa, pull yourself together.
You have to snap out of it!
VANESSA:
(Slaps Barry)
You snap out of it.
BARRY:
(Slaps Vanessa)
 :
You snap out of it.
VANESSA:
- You snap out of it!
BARRY:
- You snap out of it!
(We see that all the Pollen Jocks are flying under the plane)
VANESSA:
- You snap out of it!
BARRY:
- You snap out of it!

VANESSA:
- You snap out of it!
BARRY:
- You snap out of it!
VANESSA:
- Hold it!
BARRY:
- Why? Come on, it's my turn.
VANESSA:
How is the plane flying?
(The plane is now safely flying)
VANESSA:
I don't know.
(Barry's antennae rings like a phone. Barry picks up)
BARRY:
Hello?
LOU LU DUVA:
(Through "phone")
Benson, got any flowers
for a happy occasion in there?
(All of the Pollen Jocks are carrying the plane)
BARRY:
The Pollen Jocks!
 :
They do get behind a fellow.
LOU LU DUVA:
- Black and yellow.
POLLEN JOCKS:
- Hello.
LOU LU DUVA:
All right, let's drop this tin can

on the blacktop.
BARRY:
Where? I can't see anything. Can you?
VANESSA:
No, nothing. It's all cloudy.
 :
Come on. You got to think bee, Barry.
BARRY:
- Thinking bee.
- Thinking bee.
(On the runway there are millions of bees laying on their backs)
BEES:
Thinking bee!
Thinking bee! Thinking bee!
BARRY:
Wait a minute.
I think I'm feeling something.
VANESSA:
- What?
BARRY:
- I don't know. It's strong, pulling me.
 :
Like a 27-million-year-old instinct.
 :
Bring the nose down.
BEES:
Thinking bee!
Thinking bee! Thinking bee!
CONTROL TOWER OPERATOR:
- What in the world is on the tarmac?
BUD:
- Get some lights on that!

(It is revealed that all the bees are organized into a giant pulsating
flower formation)
BEES:
Thinking bee!
Thinking bee! Thinking bee!
BARRY:
- Vanessa, aim for the flower.
VANESSA:
- OK.
BARRY:
Out the engines. We're going in
on bee power. Ready, boys?
LOU LU DUVA:
Affirmative!
BARRY:
Good. Good. Easy, now. That's it.
 :
Land on that flower!
 :
Ready? Full reverse!
 :
Spin it around!
(The plane's nose is pointed at a flower painted on a nearby plane)
- Not that flower! The other one!
VANESSA:
- Which one?
BARRY:
- That flower.
(The plane is now pointed at a fat guy in a flowered shirt. He freaks out
and tries to take a picture of the plane)
VANESSA:
- I'm aiming at the flower!

BARRY:
That's a fat guy in a flowered shirt.
I mean the giant pulsating flower
made of millions of bees!
(The plane hovers over the bee-flower)
 :
Pull forward. Nose down. Tail up.
 :
Rotate around it.
VANESSA:
- This is insane, Barry!
BARRY:
- This's the only way I know how to fly.
BUD:
Am I koo-koo-kachoo, or is this plane
flying in an insect-like pattern?
(The plane is unrealistically hovering and spinning over the bee-flower)
BARRY:
Get your nose in there. Don't be afraid.
Smell it. Full reverse!
 :
Just drop it. Be a part of it.
 :
Aim for the center!
 :
Now drop it in! Drop it in, woman!
 :
Come on, already.
(The bees scatter and the plane safely lands)
VANESSA:
Barry, we did it!
You taught me how to fly!

BARRY:
- Yes!
(Vanessa is about to high-five Barry)
No high-five!
VANESSA:
- Right.
ADAM:
Barry, it worked!
Did you see the giant flower?
BARRY:
What giant flower? Where? Of course
I saw the flower! That was genius!
ADAM:
- Thank you.
BARRY:
- But we're not done yet.
 :
Listen, everyone!
 :
This runway is covered
with the last pollen
 :
from the last flowers
available anywhere on Earth.
 :
That means this is our last chance.
 :
We're the only ones who make honey,
pollinate flowers and dress like this.
 :
If we're gonna survive as a species,
this is our moment! What do you say?

 :
Are we going to be bees, or just
Museum of Natural History keychains?
BEES:
We're bees!
BEE WHO LIKES KEYCHAINS:
Keychain!
BARRY:
Then follow me! Except Keychain.
POLLEN JOCK #1:
Hold on, Barry. Here.
 :
You've earned this.
BARRY:
Yeah!
 :
I'm a Pollen Jock! And it's a perfect
fit. All I gotta do are the sleeves.
(The Pollen Jocks throw Barry a nectar-collecting gun. Barry catches it)
Oh, yeah.
JANET:
That's our Barry.
(Barry and the Pollen Jocks get pollen from the flowers on the plane)
(Flash forward in time and the Pollen Jocks are flying over NYC)
 :
(Barry pollinates the flowers in Vanessa's shop and then heads to Central
Park)
BOY IN PARK:
Mom! The bees are back!
ADAM:
(Putting on his Krelman hat)
If anybody needs

to make a call, now's the time.
 :
I got a feeling we'll be
working late tonight!
(The bee honey factories are back up and running)
(Meanwhile at Vanessa's shop)
VANESSA:
(To customer)
Here's your change. Have a great
afternoon! Can I help who's next?
 :
Would you like some honey with that?
It is bee-approved. Don't forget these.
(There is a room in the shop where Barry does legal work for other animals.
He is currently talking with a Cow)
COW:
Milk, cream, cheese, it's all me.
And I don't see a nickel!
 :
Sometimes I just feel
like a piece of meat!
BARRY:
I had no idea.
VANESSA:
Barry, I'm sorry.
Have you got a moment?
BARRY:
Would you excuse me?
My mosquito associate will help you.
MOOSEBLOOD:
Sorry I'm late.
COW:
He's a lawyer too?

MOOSEBLOOD:
Ma'am, I was already a blood-sucking parasite.
All I needed was a briefcase.
VANESSA:
Have a great afternoon!
 :
Barry, I just got this huge tulip order,
and I can't get them anywhere.
BARRY:
No problem, Vannie.
Just leave it to me.
VANESSA:
You're a lifesaver, Barry.
Can I help who's next?
BARRY:
All right, scramble, jocks!
It's time to fly.
VANESSA:
Thank you, Barry!
(Ken walks by on the sidewalk and sees the "bee-approved honey" in
Vanessa's shop)
KEN:
That bee is living my life!!
ANDY:
Let it go, Kenny.
KEN:
- When will this nightmare end?!
ANDY:
- Let it all go.
BARRY:
- Beautiful day to fly.
POLLEN JOCK:

- Sure is.
BARRY:
Between you and me,
I was dying to get out of that office.
(Barry recreates the scene near the beginning of the movie where he flies
through the box kite. The movie fades to black and the credits being)
[--after credits; No scene can be seen but the characters can be heard
talking over the credits--]
You have got
to start thinking bee, my friend!
 :
- Thinking bee!
- Me?
BARRY:
(Talking over singer)
Hold it. Let's just stop
for a second. Hold it.
 :
I'm sorry. I'm sorry, everyone.
Can we stop here?
SINGER:
Oh, BarryBARRY:
I'm not making a major life decision
during a production number!
SINGER:
All right. Take ten, everybody.
Wrap it up, guys.
BARRY:
I had virtually no rehearsal for that.
*/
	mintberry: {
		name: "Mint Berry",
		spritenum: 65,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Water",
		},
		onUpdate(pokemon) {
			if (pokemon.status === 'slp') {
				pokemon.eatItem();
			}
		},
		onEat(pokemon) {
			if (pokemon.status === 'slp') {
				pokemon.cureStatus();
			}
		},
		num: 150,
		gen: 2,
		isNonstandard: "Past",
	},
	miracleberry: {
		name: "Miracle Berry",
		spritenum: 262,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Flying",
		},
		onUpdate(pokemon) {
			if (pokemon.status || pokemon.volatiles['confusion']) {
				pokemon.eatItem();
			}
		},
		onEat(pokemon) {
			pokemon.cureStatus();
			pokemon.removeVolatile('confusion');
		},
		num: 157,
		gen: 2,
		isNonstandard: "Past",
	},
	mysteryberry: {
		name: "Mystery Berry",
		spritenum: 244,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Fighting",
		},
		onUpdate(pokemon) {
			if (!pokemon.hp) return;
			const moveSlot = pokemon.lastMove && pokemon.getMoveData(pokemon.lastMove.id);
			if (moveSlot && moveSlot.pp === 0) {
				pokemon.addVolatile('leppaberry');
				pokemon.volatiles['leppaberry'].moveSlot = moveSlot;
				pokemon.eatItem();
			}
		},
		onEat(pokemon) {
			let moveSlot;
			if (pokemon.volatiles['leppaberry']) {
				moveSlot = pokemon.volatiles['leppaberry'].moveSlot;
				pokemon.removeVolatile('leppaberry');
			} else {
				let pp = 99;
				for (const possibleMoveSlot of pokemon.moveSlots) {
					if (possibleMoveSlot.pp < pp) {
						moveSlot = possibleMoveSlot;
						pp = moveSlot.pp;
					}
				}
			}
			moveSlot.pp += 5;
			if (moveSlot.pp > moveSlot.maxpp) moveSlot.pp = moveSlot.maxpp;
			this.add('-activate', pokemon, 'item: Mystery Berry', moveSlot.move);
		},
		num: 154,
		gen: 2,
		isNonstandard: "Past",
	},
	pinkbow: {
		name: "Pink Bow",
		spritenum: 444,
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Normal') {
				return basePower * 1.1;
			}
		},
		num: 251,
		gen: 2,
		isNonstandard: "Past",
	},
	polkadotbow: {
		name: "Polkadot Bow",
		spritenum: 444,
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Normal') {
				return basePower * 1.1;
			}
		},
		num: 251,
		gen: 2,
		isNonstandard: "Past",
	},
	przcureberry: {
		name: "PRZ Cure Berry",
		spritenum: 63,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Fire",
		},
		onUpdate(pokemon) {
			if (pokemon.status === 'par') {
				pokemon.eatItem();
			}
		},
		onEat(pokemon) {
			if (pokemon.status === 'par') {
				pokemon.cureStatus();
			}
		},
		num: 149,
		gen: 2,
		isNonstandard: "Past",
		rating: 1,
	},
	psncureberry: {
		name: "PSN Cure Berry",
		spritenum: 333,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Electric",
		},
		onUpdate(pokemon) {
			if (pokemon.status === 'psn' || pokemon.status === 'tox') {
				pokemon.eatItem();
			}
		},
		onEat(pokemon) {
			if (pokemon.status === 'psn' || pokemon.status === 'tox') {
				pokemon.cureStatus();
			}
		},
		num: 151,
		gen: 2,
		isNonstandard: "Past",
		rating: 1,
	},

	// CAP items

	crucibellite: {
		name: "Crucibellite",
		spritenum: 577,
		megaStone: "Crucibelle-Mega",
		megaEvolves: "Crucibelle",
		itemUser: ["Crucibelle"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1,
		gen: 6,
		isNonstandard: "CAP",
	},
	vilevial: {
		name: "Vile Vial",
		spritenum: 752,
		fling: {
			basePower: 60,
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (user.baseSpecies.num === -66 && ['Poison', 'Flying'].includes(move.type)) {
				return this.chainModify([4915, 4096]);
			}
		},
		onTakeItem(item, pokemon, source) {
			if (source?.baseSpecies.num === -66 || pokemon.baseSpecies.num === -66) {
				return false;
			}
			return true;
		},
		forcedForme: "Venomicon-Epilogue",
		itemUser: ["Venomicon-Epilogue"],
		num: -2,
		gen: 8,
		isNonstandard: "CAP",
	},
};
