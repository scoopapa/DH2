export const Items: {[k: string]: ModdedItemData} = {
	acidicseed: {
		name: "Acidic Seed",
		spritenum: 666,
		fling: {
			basePower: 10,
		},
		onStart(pokemon) {
			if (!pokemon.ignoringItem() && this.field.isTerrain('acidicterrain')) {
				pokemon.useItem();
			}
		},
		onTerrainChange(pokemon) {
			if (this.field.isTerrain('acidicterrain')) {
				pokemon.useItem();
			}
		},
		boosts: {
			spd: 1,
		},
		num: -1001,
		desc: "If the terrain is Acidic Terrain, raises holder's Sp. Def by 1 stage. Single use.",
	},
	// end

	// start
	ancientarmor: {
		name: "Ancient Armor",
		spritenum: 581,
		fling: {
			basePower: 80,
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).typeMod > 0) {
				this.debug('Ancient Armor neutralize');
				return this.chainModify(0.75);
			},
	   },
		num: -1002,
		desc: "User receives 25% less damage from a super effective move.",
	},
	// end

	// start
	delirioushoney: {
		name: "Delirious Honey",
		spritenum: 448,
		fling: {
			basePower: 10,
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
			this.heal(pokemon.baseMaxhp / 4) && pokemon.trySetStatus('tox', pokemon);
		},
		num: -1003,
		desc: "Heals 25% of the user's HP if its HP is at 50% or below. User is inflicted with Toxic status.",
	},
	// end

	// start
	poisonsack: {
		name: "Poison Sack",
		spritenum: 34,
		fling: {
			basePower: 30,
		},
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Poison') {
				target.useItem();
			}
		},
		boosts: {
			atk: 1,
		},
		num: -1004,
		desc: "User has its Atk raised by 1 stage if it got hit by a Poison move.",
	},
	// end

	// start
	sunamulet: {
		name: "Sun Amulet",
		spritenum: 242,
		fling: {
			basePower: 60,
		},
		onResidualOrder: 5,
		onResidualSubOrder: 4,
		onResidual(pokemon) {
			if (effect.id === 'sunnyday' || effect.id === 'desolateland') {
			this.heal(baseSpecies.num === -1070.baseMaxhp / 8);
	      } else {
			this.heal(baseSpecies.num === -1070.baseMaxhp / 16);
			},
		},
		itemUser: ["Hieroturoc"],
		num: -1005,
		desc: "Hieroturoc recovers 1/16 of its HP, 1/8 in Sun.",
	},
	// end

	// start
	sundiadem: {
		name: "Sun Diadem",
		spritenum: 242,
		fling: {
			basePower: 60,
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if user.baseSpecies.num === -1069 && (move && move.type === 'Fire') {
				return this.chainModify([4915, 4096]);
			}
		},
		num: -1006,
		desc: "Oroboroc's Fire moves do 20% more damage.",	
	},
	// end

	// start
	sunring: {
		name: "Sun Ring",
		spritenum: 242,
		fling: {
			basePower: 60,
		},
		onAllySetStatus(status, target, source, effect) {
				if ((effect as Move)?.status) && effectHolder = basespecies.num === -1068 && (effect.id === 'sunnyday' || effect.id === 'desolateland') {
					const effectHolder = this.effectState.target;
					this.add('-block', target, 'item: Sun Ring', '[of] ' + effectHolder);
				}
				return null;
			},
		onSetStatus(status, target, source, effect) {
			if ((effect as Move)?.status) && (target.species.num === -1068) {
				this.add('-block', target, '[from] item: Sun Ring');
			}
		};
