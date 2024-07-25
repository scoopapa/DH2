export const Items: {[k: string]: ModdedItemData} = {
	cacturnite: {
		name: "Cacturnite",
		spritenum: 613,
		megaStone: "Cacturne-Mega",
		megaEvolves: "Cacturne",
		itemUser: ["Cacturne"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1008,
		gen: 9,
		desc: "If held by a Cacturne, this item allows it to Mega Evolve in battle.",
	},
	// end

	// start
	dragantistite: {
		name: "Dragantistite",
		spritenum: 613,
		megaStone: "Dragantis-Mega",
		megaEvolves: "Dragantis",
		itemUser: ["Dragantis"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1009,
		gen: 9,
		desc: "If held by a Dragantis, this item allows it to Mega Evolve in battle.",
	},
	// end

	// start
	pyroarite: {
		name: "Pyroarite",
		spritenum: 625,
		megaStone: "Pyroar-Mega",
		megaEvolves: "Pyroar",
		itemUser: ["Pyroar"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1010,
		gen: 9,
		desc: "If held by a Pyroar, this item allows it to Mega Evolve in battle.",
	},
	// end

	// start
	cryogonalite: {
		name: "Cryogonalite",
		spritenum: 575,
		megaStone: "Cryogonal-Mega",
		megaEvolves: "Cryogonal",
		itemUser: ["Cryogonal"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1011,
		gen: 9,
		desc: "If held by a Cryogonal, this item allows it to Mega Evolve in battle.",
	},
	// end

	// start
	luxrite: {
		name: "Luxrite",
		spritenum: 596,
		megaStone: "Luxray-Mega",
		megaEvolves: "Luxray",
		itemUser: ["Luxray"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1012,
		gen: 9,
		desc: "If held by a Luxray, this item allows it to Mega Evolve in battle.",
	},
	// end

	// start
	stormulexite: {
		name: "Stormulexite",
		spritenum: 596,
		megaStone: "Stormulex-Mega",
		megaEvolves: "Stormulex",
		itemUser: ["Stormulex"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1013,
		gen: 9,
		desc: "If held by a Stormulex, this item allows it to Mega Evolve in battle.",
	},
	// end

	// start
	drifblimite: {
		name: "Drifblimite",
		spritenum: 588,
		megaStone: "Drifblim-Mega",
		megaEvolves: "Drifblim",
		itemUser: ["Drifblim"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1014,
		gen: 9,
		desc: "If held by a Drifblim, this item allows it to Mega Evolve in battle.",
	},
	// end

	// start
	cofagrigusite: {
		name: "Cofagrigusite",
		spritenum: 588,
		megaStone: "Cofagrigus-Mega",
		megaEvolves: "Cofagrigus",
		itemUser: ["Cofagrigus"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1015,
		gen: 9,
		desc: "If held by a Cofagrigus, this item allows it to Mega Evolve in battle.",
	},
	// end

	// start
	gigalithite: {
		name: "Gigalithite",
		spritenum: 607,
		megaStone: "Gigalith-Mega",
		megaEvolves: "Gigalith",
		itemUser: ["Gigalith"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1016,
		gen: 9,
		desc: "If held by a Gigalith, this item allows it to Mega Evolve in battle.",
	},
	// end

	// start
	pasturite: {
		name: "Pasturite",
		spritenum: 589,
		megaStone: "Pastura-Mega",
		megaEvolves: "Pastura",
		itemUser: ["Pastura"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1017,
		gen: 9,
		desc: "If held by a Pastura, this item allows it to Mega Evolve in battle.",
	},
	// end

	// start
	crobatite: {
		name: "Crobatite",
		spritenum: 588,
		megaStone: "Crobat-Mega",
		megaEvolves: "Crobat",
		itemUser: ["Crobat"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1019,
		gen: 9,
		desc: "If held by a Crobat, this item allows it to Mega Evolve in battle.",
	},
	// end

	// start
	drapionite: {
		name: "Drapionite",
		spritenum: 588,
		megaStone: "Drapion-Mega",
		megaEvolves: "Drapion",
		itemUser: ["Drapion"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1020,
		gen: 9,
		desc: "If held by a Drapion, this item allows it to Mega Evolve in battle.",
	},
	// end

	// start
	dragalgite: {
		name: "Dragalgite",
		spritenum: 588,
		megaStone: "Dragalge-Mega",
		megaEvolves: "Dragalge",
		itemUser: ["Dragalge"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1021,
		gen: 9,
		desc: "If held by a Dragalge, this item allows it to Mega Evolve in battle.",
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
	delirioushoney: {
		name: "Delirious Honey",
		spritenum: 22,
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
	sunamulet: {
		name: "Sun Amulet",
		spritenum: 747,
		fling: {
			basePower: 60,
		},
		onResidualOrder: 5,
		onResidualSubOrder: 4,
		onResidual(pokemon) {
			if (pokemon.baseSpecies.num === -1070) {
				if (this.field.isWeather('sunnyday') || this.field.isWeather('desolateland')) {
					this.heal(pokemon.baseMaxhp / 8);
	      	} else {
					this.heal(pokemon.baseMaxhp / 16);
				}
			}
		},
		itemUser: ["Hieroturoc"],
		num: -1005,
		desc: "Hieroturoc recovers 1/16 of its HP, 1/8 in Sun.",
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
			}
	   },
		num: -1002,
		desc: "User receives 25% less damage from a super effective move.",
	},
	// end

	// start: currently only affects user's Oroboroc.
	sundiadem: {
		name: "Sun Diadem",
		spritenum: 141,
		fling: {
			basePower: 60,
		},
		onDamage(damage, target, source, effect) {
			if (effect.effectType !== 'Move') {
				if (effect.effectType === 'Item') this.add('-activate', source, 'item: ' + effect.name);
				return false;
			}
		},
		itemUser: ["Oroboroc"],
		num: -1006,
		desc: "Oroboroc doesn't take indirect damage. Extends to ally in Sun.",	
	},
	// end

	// start of Sun Diadem's application on other items
	jabocaberry: {
		name: "Jaboca Berry",
		spritenum: 230,
		isBerry: true,
		naturalGift: {
			basePower: 100,
			type: "Dragon",
		},
		onDamagingHit(damage, target, source, move) {
			if (move.category === 'Physical' && source.hp && source.isActive && (!source.hasAbility('magicguard') || !source.hasItem('sundiadem'))) {
				if (target.eatItem()) {
					this.damage(source.baseMaxhp / (target.hasAbility('ripen') ? 4 : 8), source, target);
				}
			}
		},
		onEat() { },
		num: 211,
		gen: 4,
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
			if (move.category === 'Special' && source.hp && source.isActive && (!source.hasAbility('magicguard') || !source.hasItem('sundiadem'))) {
				if (target.eatItem()) {
					this.damage(source.baseMaxhp / (target.hasAbility('ripen') ? 4 : 8), source, target);
				}
			}
		},
		onEat() { },
		num: 212,
		gen: 4,
		rating: 1,
	},
	// end

	// start
	sunring: {
		name: "Sun Ring",
		spritenum: 410,
		fling: {
			basePower: 60,
		},
		onAllySetStatus(status, target, source, effect) {
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				if ((effect as Move)?.status) {
					this.add('-immune', target, '[from] item: Sun Ring');
				}
				return false;
			}
		},
		onTryAddVolatile(status, target) {
			if (status.id === 'yawn' && ['sunnyday', 'desolateland'].includes(target.effectiveWeather())) {
				this.add('-immune', target, '[from] item: Sun Ring');
				return null;
			}
		},
		onSetStatus(status, target, source, effect) {
			if (!['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				if ((effect as Move)?.status) {
					this.add('-immune', target, '[from] item: Sun Ring');
				}
				return false;
			}
		},
		itemUser: ["Horizonoc"],
		num: -1007,
		desc: "Horizonoc is immune to status conditions. This effect extends to the ally in Sun.",
	},
	// end

};
