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
			if (pokemon.baseSpecies.baseSpecies !== 'Hieroturoc') return;
				this.heal(pokemon.baseMaxhp / 16);
				// this.add('-heal', pokemon, pokemon.getHealth, '[from] item: Sun Amulet');
	
				// Check if the sun is active
				if (['sunnyday', 'desolateland'].includes(this.field.effectiveWeather())) {
					// Find and heal the ally
					const ally = pokemon.side.active.find(ally => ally && ally !== pokemon && !ally.fainted);
					if (ally) {
						this.heal(ally.baseMaxhp / 16, ally);
					//	this.add('-heal', ally, ally.getHealth, '[from] item: Sun Amulet', '[of] ' + pokemon.name);
					}
			}
		},
		itemUser: ["Hieroturoc"],
		num: -1005,
		desc: "Hieroturoc recovers 1/16 of its HP. If Sun is active, its ally also recovers 1/16 of its HP.",
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

	// start:
	sundiadem: {
		name: "Sun Diadem",
		spritenum: 141,
		fling: {
			basePower: 60,
		},
		onDamage(damage, target, source, effect) {
			if (target.baseSpecies.baseSpecies !== 'Oroboroc') return damage;
	
			if (effect.effectType !== 'Move') {
				this.debug('Sun Diadem blocking indirect damage');
				return false;
			}
		},
		onAllyDamage(damage, target, source, effect) {
			const isSunny = ['sunnyday', 'desolateland'].includes(this.field.effectiveWeather());
			if (isSunny && effect.effectType !== 'Move') {
				this.debug('Sun Diadem blocking indirect damage for ally');
				return false;
			}
		},
		itemUser: ["Oroboroc"],
		num: -1006,
		desc: "The holder is immune to indirect damage. In Sun, this effect extends to the holder's ally.",    
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
			if (['sunnyday', 'desolateland'].includes(this.field.effectiveWeather())) {
				if ((effect as Move)?.status) {
					this.add('-immune', target, '[from] item: Sun Ring');
				}
				return false;
			}
		},
		onTryAddVolatile(status, target) {
			if (status.id === 'yawn' && ['sunnyday', 'desolateland'].includes(this.field.effectiveWeather())) {
				this.add('-immune', target, '[from] item: Sun Ring');
				return null;
			}
		},
		onSetStatus(status, target, source, effect) {
			if (!['sunnyday', 'desolateland'].includes(this.field.effectiveWeather())) {
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

	// start: Might need to be nerfed if it turns out to be too strong.
	adrenalinekick: {
		name: "Adrenaline Kick",
		spritenum: 660,
		fling: {
			basePower: 30,
		},
		onModifyCritRatio(critRatio, source) {
			if (source.status) { // Check if the Pokémon is affected by a status condition
				const hpPercentage = source.hp / source.maxhp; // Calculate remaining HP percentage
				const hpFactor = Math.floor((1 - hpPercentage) * 100); // Convert to a scale of 0-100
				
				// Increase critical hit ratio based on remaining HP
				// The more HP lost, the higher the critical hit ratio
				critRatio += Math.min(hpFactor, 100); // Cap the increase at 100
			}
			return critRatio; // Return the modified critical hit ratio
		},
		num: -1022,
		desc: "More likely to land a critical hit if user is statused and has less remaining HP.",
	},
	// end

	// start: Modify existing item. Leppa Berry denies replenishing Reboot's PP for balance purposes.
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
			// Check if the move is "Reboot"
			const move = this.dex.moves.get(moveSlot.move);
			if (move.name === 'Reboot') {
				this.add('-activate', pokemon, 'item: Leppa Berry', move.name, '[consumed]');
				this.add('-message', `${pokemon.name}'s Reboot PP cannot be restored by Leppa Berry!`);
				return; // Prevent restoration for "Reboot"
			}
			moveSlot.pp += 10;
			if (moveSlot.pp > moveSlot.maxpp) moveSlot.pp = moveSlot.maxpp;
			this.add('-activate', pokemon, 'item: Leppa Berry', moveSlot.move, '[consumed]');
		},
		num: 154,
		gen: 3,
	},
	// end

};
