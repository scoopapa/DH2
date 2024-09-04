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
		onSetStatus(status, target, source, effect) {
			// Always grant immunity to Horizonoc
			if (target.baseSpecies.baseSpecies === 'Horizonoc' && target.hasItem('sunring')) {
				if ((effect as Move)?.status) {
					this.add('-immune', target, '[from] item: Sun Ring');
				}
				return false; // Prevent the status from being applied
			}
		},
		onAllySetStatus(status, target, source, effect) {
			// Check if the user is Horizonoc and the weather is sunny
			if (target.baseSpecies.baseSpecies === 'Horizonoc' && target.hasItem('sunring') && 
				['sunnyday', 'desolateland'].includes(this.field.effectiveWeather())) {
				this.add('-immune', target, '[from] item: Sun Ring');
				return false; // Prevent the status from being applied to the ally
			}
		},
		onTryAddVolatile(status, target) {
			// Check if the user is Horizonoc and the weather is sunny
			if (target.baseSpecies.baseSpecies === 'Horizonoc' && target.hasItem('sunring') && 
				status.id === 'yawn' && 
				['sunnyday', 'desolateland'].includes(this.field.effectiveWeather())) {
				this.add('-immune', target, '[from] item: Sun Ring');
				return null; // Prevent the volatile status from being applied
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

/*	// start: Modify existing item. Leppa Berry denies replenishing Reboot's PP for balance purposes.
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
	}, */

	// start
	colourstone: {
		name: "Colour Stone",
		spritenum: 187, // Hard Stone sprite
		fling: {
			basePower: 100,
		},
		itemUser: ["Magistama"],
		num: -1023,
		desc: "If held by Magistama, adds a new type based on the last unfainted Pokémon's primary type if there's no overlap.",
	//	onBeforeSwitchIn(pokemon) {
		onStart(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Magistama') return; // Check if the Pokémon is Magistama
	
			const lastUnfainted = pokemon.side.pokemon.slice().reverse().find(p => !p.fainted);
			if (!lastUnfainted) return; // No unfainted Pokémon found
	
			const primaryType = lastUnfainted.types[0]; // Get the primary type of the last unfainted Pokémon
	
			// Check for type overlap
			if (!pokemon.types.includes(primaryType)) {
				// Add the new type if there's no overlap
				if (pokemon.types.length < 3) { // Adjusted to allow for one additional type
					// Safely add the new type
					const newTypes = [...pokemon.types, primaryType]; // Create a new array with the additional type
					pokemon.types = newTypes; // Assign the new array to the Pokémon's types
	
					// Notify the game about the new type
					this.add('-start', pokemon, 'typeadd', primaryType, '[from] item: Colour Stone');
				}
			}
		},
	},
	// end

	// start of Engrave items
	grassengraving: {
		name: "Grass Engraving",
		spritenum: 635,
		onTakeItem: false,
		num: -1031,
		desc: "Grass Pokémon on user's side do 10% more damage for each fainted Grass ally.",
		 // Check if the item can be activated
		onUpdate(pokemon) {
			if (!pokemon.side.sideConditions['grassengravingeffect']) {
				if (pokemon.side.sideConditions['bugengravingeffect'] || pokemon.side.sideConditions['fireengravingeffect'] || pokemon.side.sideConditions['waterengravingeffect'] || 
					pokemon.side.sideConditions['iceengravingeffect'] || pokemon.side.sideConditions['electricengravingeffect'] || pokemon.side.sideConditions['psychicengravingeffect'] ||
					pokemon.side.sideConditions['ghostengravingeffect'] || pokemon.side.sideConditions['poisonengravingeffect'] || pokemon.side.sideConditions['fightingengravingeffect'] || 
					pokemon.side.sideConditions['rockengravingeffect'] || pokemon.side.sideConditions['groundengravingeffect'] || pokemon.side.sideConditions['normalengravingeffect'] ||
				    pokemon.side.sideConditions['flyingengravingeffect'] || pokemon.side.sideConditions['dragonengravingeffect'] || pokemon.side.sideConditions['steelengravingeffect'] ||
				    pokemon.side.sideConditions['darkengravingeffect'] || pokemon.side.sideConditions['fairyengravingeffect'] || pokemon.side.sideConditions['anquiterraengravingeffect'] ||
				    pokemon.side.sideConditions['arastinithengravingeffect'] || pokemon.side.sideConditions['barbaraclemaadowrengravingeffect'] || pokemon.side.sideConditions['beheeyemengravingeffect'] ||
				    pokemon.side.sideConditions['chantyrusengravingeffect'] || pokemon.side.sideConditions['craftenirengravingeffect'] || pokemon.side.sideConditions['equinoqueengravingeffect'] ||
				    pokemon.side.sideConditions['golurkengravingeffect'] || pokemon.side.sideConditions['grapplinengravingeffect'] || pokemon.side.sideConditions['iblissengravingeffect'] ||
				    pokemon.side.sideConditions['kenuterraengravingeffect'] || pokemon.side.sideConditions['klinklangengravingeffect'] || pokemon.side.sideConditions['lanturnengravingeffect'] ||
				    pokemon.side.sideConditions['maudiorengravingeffect'] || pokemon.side.sideConditions['orasundraengravingeffect'] || pokemon.side.sideConditions['parascentengravingeffect'] ||
				    pokemon.side.sideConditions['rabscaengravingeffect'] || pokemon.side.sideConditions['sneezibiaengravingeffect'] || pokemon.side.sideConditions['spiritombengravingeffect'] ||
				    pokemon.side.sideConditions['tinkatonengravingeffect'] || pokemon.side.sideConditions['zebstrikaengravingeffect']) {
					return;
				}
				if (pokemon.hasType('Grass')) {
					pokemon.side.addSideCondition('grassengravingeffect');
					this.add('-sidestart', pokemon.side, 'Grass Engraving');
					this.add('-anim', pokemon, "Flash");				
					this.add('-message', `The Grass Engraving has been activated on ${pokemon.side.name}'s side! Grass-type Pokémon now do 10% more damage for each fainted Grass ally.`);
				}
			}
		},
	},
	bugengraving: {
		name: "Bug Engraving",
		spritenum: 642,
		onTakeItem: false,
		num: -1032,
		desc: "Bug Pokémon on user's side do 1/8 chip damage when lowering target's stat and recover the same amount of HP target lost from it.",
		 // Check if the item can be activated
		onUpdate(pokemon) {
			if (!pokemon.side.sideConditions['bugengravingeffect']) {
				if (pokemon.side.sideConditions['grassengravingeffect'] || pokemon.side.sideConditions['fireengravingeffect'] || pokemon.side.sideConditions['waterengravingeffect'] || 
					pokemon.side.sideConditions['iceengravingeffect'] || pokemon.side.sideConditions['electricengravingeffect'] || pokemon.side.sideConditions['psychicengravingeffect'] ||
					pokemon.side.sideConditions['ghostengravingeffect'] || pokemon.side.sideConditions['poisonengravingeffect'] || pokemon.side.sideConditions['fightingengravingeffect'] || 
					pokemon.side.sideConditions['rockengravingeffect'] || pokemon.side.sideConditions['groundengravingeffect'] || pokemon.side.sideConditions['normalengravingeffect'] ||
				    pokemon.side.sideConditions['flyingengravingeffect'] || pokemon.side.sideConditions['dragonengravingeffect'] || pokemon.side.sideConditions['steelengravingeffect'] ||
				    pokemon.side.sideConditions['darkengravingeffect'] || pokemon.side.sideConditions['fairyengravingeffect'] || pokemon.side.sideConditions['anquiterraengravingeffect'] ||
				    pokemon.side.sideConditions['arastinithengravingeffect'] || pokemon.side.sideConditions['barbaraclemaadowrengravingeffect'] || pokemon.side.sideConditions['beheeyemengravingeffect'] ||
				    pokemon.side.sideConditions['chantyrusengravingeffect'] || pokemon.side.sideConditions['craftenirengravingeffect'] || pokemon.side.sideConditions['equinoqueengravingeffect'] ||
				    pokemon.side.sideConditions['golurkengravingeffect'] || pokemon.side.sideConditions['grapplinengravingeffect'] || pokemon.side.sideConditions['iblissengravingeffect'] ||
				    pokemon.side.sideConditions['kenuterraengravingeffect'] || pokemon.side.sideConditions['klinklangengravingeffect'] || pokemon.side.sideConditions['lanturnengravingeffect'] ||
				    pokemon.side.sideConditions['maudiorengravingeffect'] || pokemon.side.sideConditions['orasundraengravingeffect'] || pokemon.side.sideConditions['parascentengravingeffect'] ||
				    pokemon.side.sideConditions['rabscaengravingeffect'] || pokemon.side.sideConditions['sneezibiaengravingeffect'] || pokemon.side.sideConditions['spiritombengravingeffect'] ||
				    pokemon.side.sideConditions['tinkatonengravingeffect'] || pokemon.side.sideConditions['zebstrikaengravingeffect']) {
					return;
				}
				if (pokemon.hasType('Bug')) {
					pokemon.side.addSideCondition('bugengravingeffect');
					this.add('-sidestart', pokemon.side, 'Bug Engraving');
					this.add('-anim', pokemon, "Flash");
					this.add('-message', `The Bug Engraving has been activated on ${pokemon.side.name}'s side! Bug-type Pokémon now do 1/8 chip damage when lowering a target's stat and recover the same amount of HP that the target lost from it.`);
				}
			}
		},
	},
	fireengraving: {
		name: "Fire Engraving",
		spritenum: 632,
		onTakeItem: false,
		num: -1033,
		desc: "Fire Pokémon on user's side inflict Amaterasu on attacker when taken out.",
		 // Check if the item can be activated
		onUpdate(pokemon) {
			if (!pokemon.side.sideConditions['fireengravingeffect']) {
				if (pokemon.side.sideConditions['grassengravingeffect'] || pokemon.side.sideConditions['bugengravingeffect'] || pokemon.side.sideConditions['waterengravingeffect'] || 
					pokemon.side.sideConditions['iceengravingeffect'] || pokemon.side.sideConditions['electricengravingeffect'] || pokemon.side.sideConditions['psychicengravingeffect'] ||
					pokemon.side.sideConditions['ghostengravingeffect'] || pokemon.side.sideConditions['poisonengravingeffect'] || pokemon.side.sideConditions['fightingengravingeffect'] || 
					pokemon.side.sideConditions['rockengravingeffect'] || pokemon.side.sideConditions['groundengravingeffect'] || pokemon.side.sideConditions['normalengravingeffect'] ||
				    pokemon.side.sideConditions['flyingengravingeffect'] || pokemon.side.sideConditions['dragonengravingeffect'] || pokemon.side.sideConditions['steelengravingeffect'] ||
				    pokemon.side.sideConditions['darkengravingeffect'] || pokemon.side.sideConditions['fairyengravingeffect'] || pokemon.side.sideConditions['anquiterraengravingeffect'] ||
				    pokemon.side.sideConditions['arastinithengravingeffect'] || pokemon.side.sideConditions['barbaraclemaadowrengravingeffect'] || pokemon.side.sideConditions['beheeyemengravingeffect'] ||
				    pokemon.side.sideConditions['chantyrusengravingeffect'] || pokemon.side.sideConditions['craftenirengravingeffect'] || pokemon.side.sideConditions['equinoqueengravingeffect'] ||
				    pokemon.side.sideConditions['golurkengravingeffect'] || pokemon.side.sideConditions['grapplinengravingeffect'] || pokemon.side.sideConditions['iblissengravingeffect'] ||
				    pokemon.side.sideConditions['kenuterraengravingeffect'] || pokemon.side.sideConditions['klinklangengravingeffect'] || pokemon.side.sideConditions['lanturnengravingeffect'] ||
				    pokemon.side.sideConditions['maudiorengravingeffect'] || pokemon.side.sideConditions['orasundraengravingeffect'] || pokemon.side.sideConditions['parascentengravingeffect'] ||
				    pokemon.side.sideConditions['rabscaengravingeffect'] || pokemon.side.sideConditions['sneezibiaengravingeffect'] || pokemon.side.sideConditions['spiritombengravingeffect'] ||
				    pokemon.side.sideConditions['tinkatonengravingeffect'] || pokemon.side.sideConditions['zebstrikaengravingeffect']) {
					return;
				}
				if (pokemon.hasType('Fire')) {
					pokemon.side.addSideCondition('fireengravingeffect');
					this.add('-sidestart', pokemon.side, 'Fire Engraving');
					this.add('-anim', pokemon, "Flash");
					this.add('-message', `The Fire Engraving has been activated on ${pokemon.side.name}'s side! Fire-type Pokémon inflict Amaterasu on attacker when taken out, permanently replacing their ability.
						Burn is 1/8. Spreads to non Fire-type attacker when taken out.`);
				}
			}
		},
	},
	waterengraving: {
		name: "Water Engraving",
		spritenum: 633,
		onTakeItem: false,
		num: -1034,
		desc: "Water Pokémon on user's side recover 1/16 of their HP and are cured from Burn.",
		 // Check if the item can be activated
		onUpdate(pokemon) {
			if (!pokemon.side.sideConditions['waterengravingeffect']) {
				if (pokemon.side.sideConditions['grassengravingeffect'] || pokemon.side.sideConditions['bugengravingeffect'] || pokemon.side.sideConditions['fireengravingeffect'] || 
					pokemon.side.sideConditions['iceengravingeffect'] || pokemon.side.sideConditions['electricengravingeffect'] || pokemon.side.sideConditions['psychicengravingeffect'] ||
					pokemon.side.sideConditions['ghostengravingeffect'] || pokemon.side.sideConditions['poisonengravingeffect'] || pokemon.side.sideConditions['fightingengravingeffect'] || 
					pokemon.side.sideConditions['rockengravingeffect'] || pokemon.side.sideConditions['groundengravingeffect'] || pokemon.side.sideConditions['normalengravingeffect'] ||
				    pokemon.side.sideConditions['flyingengravingeffect'] || pokemon.side.sideConditions['dragonengravingeffect'] || pokemon.side.sideConditions['steelengravingeffect'] ||
				    pokemon.side.sideConditions['darkengravingeffect'] || pokemon.side.sideConditions['fairyengravingeffect'] || pokemon.side.sideConditions['anquiterraengravingeffect'] ||
				    pokemon.side.sideConditions['arastinithengravingeffect'] || pokemon.side.sideConditions['barbaraclemaadowrengravingeffect'] || pokemon.side.sideConditions['beheeyemengravingeffect'] ||
				    pokemon.side.sideConditions['chantyrusengravingeffect'] || pokemon.side.sideConditions['craftenirengravingeffect'] || pokemon.side.sideConditions['equinoqueengravingeffect'] ||
				    pokemon.side.sideConditions['golurkengravingeffect'] || pokemon.side.sideConditions['grapplinengravingeffect'] || pokemon.side.sideConditions['iblissengravingeffect'] ||
				    pokemon.side.sideConditions['kenuterraengravingeffect'] || pokemon.side.sideConditions['klinklangengravingeffect'] || pokemon.side.sideConditions['lanturnengravingeffect'] ||
				    pokemon.side.sideConditions['maudiorengravingeffect'] || pokemon.side.sideConditions['orasundraengravingeffect'] || pokemon.side.sideConditions['parascentengravingeffect'] ||
				    pokemon.side.sideConditions['rabscaengravingeffect'] || pokemon.side.sideConditions['sneezibiaengravingeffect'] || pokemon.side.sideConditions['spiritombengravingeffect'] ||
				    pokemon.side.sideConditions['tinkatonengravingeffect'] || pokemon.side.sideConditions['zebstrikaengravingeffect']) {
					return;
				}
				if (pokemon.hasType('Water')) {
					pokemon.side.addSideCondition('waterengravingeffect');
					this.add('-sidestart', pokemon.side, 'Water Engraving');
					this.add('-anim', pokemon, "Flash");
					this.add('-message', `The Water Engraving has been activated on ${pokemon.side.name}'s side! Water-type Pokémon recover 1/16 of their HP and are cured from Burn.`);
				}
			}
		},
	},
	iceengraving: {
		name: "Ice Engraving",
		spritenum: 636,
		onTakeItem: false,
		num: -1035,
		desc: "Ice Pokémon on user's side gain +1 Atk, SpA and Spe and -1 Def and SpD if HP brought to 50% or below from non self-inflicting move.",
		 // Check if the item can be activated
		onUpdate(pokemon) {
			if (!pokemon.side.sideConditions['iceengravingeffect']) {
				if (pokemon.side.sideConditions['grassengravingeffect'] || pokemon.side.sideConditions['bugengravingeffect'] || pokemon.side.sideConditions['fireengravingeffect'] || 
					pokemon.side.sideConditions['waterengravingeffect'] || pokemon.side.sideConditions['electricengravingeffect'] || pokemon.side.sideConditions['psychicengravingeffect'] ||
					pokemon.side.sideConditions['ghostengravingeffect'] || pokemon.side.sideConditions['poisonengravingeffect'] || pokemon.side.sideConditions['fightingengravingeffect'] || 
					pokemon.side.sideConditions['rockengravingeffect'] || pokemon.side.sideConditions['groundengravingeffect'] || pokemon.side.sideConditions['normalengravingeffect'] ||
				    pokemon.side.sideConditions['flyingengravingeffect'] || pokemon.side.sideConditions['dragonengravingeffect'] || pokemon.side.sideConditions['steelengravingeffect'] ||
				    pokemon.side.sideConditions['darkengravingeffect'] || pokemon.side.sideConditions['fairyengravingeffect'] || pokemon.side.sideConditions['anquiterraengravingeffect'] ||
				    pokemon.side.sideConditions['arastinithengravingeffect'] || pokemon.side.sideConditions['barbaraclemaadowrengravingeffect'] || pokemon.side.sideConditions['beheeyemengravingeffect'] ||
				    pokemon.side.sideConditions['chantyrusengravingeffect'] || pokemon.side.sideConditions['craftenirengravingeffect'] || pokemon.side.sideConditions['equinoqueengravingeffect'] ||
				    pokemon.side.sideConditions['golurkengravingeffect'] || pokemon.side.sideConditions['grapplinengravingeffect'] || pokemon.side.sideConditions['iblissengravingeffect'] ||
				    pokemon.side.sideConditions['kenuterraengravingeffect'] || pokemon.side.sideConditions['klinklangengravingeffect'] || pokemon.side.sideConditions['lanturnengravingeffect'] ||
				    pokemon.side.sideConditions['maudiorengravingeffect'] || pokemon.side.sideConditions['orasundraengravingeffect'] || pokemon.side.sideConditions['parascentengravingeffect'] ||
				    pokemon.side.sideConditions['rabscaengravingeffect'] || pokemon.side.sideConditions['sneezibiaengravingeffect'] || pokemon.side.sideConditions['spiritombengravingeffect'] ||
				    pokemon.side.sideConditions['tinkatonengravingeffect'] || pokemon.side.sideConditions['zebstrikaengravingeffect']) {
					return;
				}
				if (pokemon.hasType('Ice')) {
					pokemon.side.addSideCondition('iceengravingeffect');
					this.add('-sidestart', pokemon.side, 'Ice Engraving');
					this.add('-anim', pokemon, "Flash");
					this.add('-message', `The Ice Engraving has been activated on ${pokemon.side.name}'s side! Ice-type Pokémon gain +1 Atk, SpA, and Spe and -1 Def and SpD if HP is brought to 50% or below.`);
				}
			}
		},
	},
	electricengraving: {
		name: "Electric Engraving",
		spritenum: 634,
		onTakeItem: false,
		num: -1036,
		desc: "Electric Pokémon on user's side are more likely to land a critical hit the less HP remaining they have.",
		 // Check if the item can be activated
		onUpdate(pokemon) {
			if (!pokemon.side.sideConditions['electricengravingeffect']) {
				if (pokemon.side.sideConditions['grassengravingeffect'] || pokemon.side.sideConditions['bugengravingeffect'] || pokemon.side.sideConditions['fireengravingeffect'] || 
					pokemon.side.sideConditions['waterengravingeffect'] || pokemon.side.sideConditions['iceengravingeffect'] || pokemon.side.sideConditions['psychicengravingeffect'] ||
					pokemon.side.sideConditions['ghostengravingeffect'] || pokemon.side.sideConditions['poisonengravingeffect'] || pokemon.side.sideConditions['fightingengravingeffect'] || 
					pokemon.side.sideConditions['rockengravingeffect'] || pokemon.side.sideConditions['groundengravingeffect'] || pokemon.side.sideConditions['normalengravingeffect'] ||
				    pokemon.side.sideConditions['flyingengravingeffect'] || pokemon.side.sideConditions['dragonengravingeffect'] || pokemon.side.sideConditions['steelengravingeffect'] ||
				    pokemon.side.sideConditions['darkengravingeffect'] || pokemon.side.sideConditions['fairyengravingeffect'] || pokemon.side.sideConditions['anquiterraengravingeffect'] ||
				    pokemon.side.sideConditions['arastinithengravingeffect'] || pokemon.side.sideConditions['barbaraclemaadowrengravingeffect'] || pokemon.side.sideConditions['beheeyemengravingeffect'] ||
				    pokemon.side.sideConditions['chantyrusengravingeffect'] || pokemon.side.sideConditions['craftenirengravingeffect'] || pokemon.side.sideConditions['equinoqueengravingeffect'] ||
				    pokemon.side.sideConditions['golurkengravingeffect'] || pokemon.side.sideConditions['grapplinengravingeffect'] || pokemon.side.sideConditions['iblissengravingeffect'] ||
				    pokemon.side.sideConditions['kenuterraengravingeffect'] || pokemon.side.sideConditions['klinklangengravingeffect'] || pokemon.side.sideConditions['lanturnengravingeffect'] ||
				    pokemon.side.sideConditions['maudiorengravingeffect'] || pokemon.side.sideConditions['orasundraengravingeffect'] || pokemon.side.sideConditions['parascentengravingeffect'] ||
				    pokemon.side.sideConditions['rabscaengravingeffect'] || pokemon.side.sideConditions['sneezibiaengravingeffect'] || pokemon.side.sideConditions['spiritombengravingeffect'] ||
				    pokemon.side.sideConditions['tinkatonengravingeffect'] || pokemon.side.sideConditions['zebstrikaengravingeffect']) {
					return;
				}
				if (pokemon.hasType('Electric')) {
					pokemon.side.addSideCondition('electricengravingeffect');
					this.add('-sidestart', pokemon.side, 'Electric Engraving');
					this.add('-anim', pokemon, "Flash");
					this.add('-message', `The Electric Engraving has been activated on ${pokemon.side.name}'s side! Electric-type Pokémon are more likely to land a critical hit the less HP remaining they have.`);
				}
			}
		},
	},
	psychicengraving: {
		name: "Psychic Engraving",
		spritenum: 641,
		onTakeItem: false,
		num: -1037,
		desc: "Psychic Pokémon on user's side ignore Dark's immunity to Psychic.",
		 // Check if the item can be activated
		onUpdate(pokemon) {
			if (!pokemon.side.sideConditions['psychicengravingeffect']) {
				if (pokemon.side.sideConditions['grassengravingeffect'] || pokemon.side.sideConditions['bugengravingeffect'] || pokemon.side.sideConditions['fireengravingeffect'] ||
					pokemon.side.sideConditions['waterengravingeffect'] || pokemon.side.sideConditions['iceengravingeffect'] || pokemon.side.sideConditions['electricengravingeffect'] || 
					pokemon.side.sideConditions['ghostengravingeffect'] || pokemon.side.sideConditions['poisonengravingeffect'] || pokemon.side.sideConditions['fightingengravingeffect'] || 
					pokemon.side.sideConditions['rockengravingeffect'] || pokemon.side.sideConditions['groundengravingeffect'] || pokemon.side.sideConditions['normalengravingeffect'] ||
				    pokemon.side.sideConditions['flyingengravingeffect'] || pokemon.side.sideConditions['dragonengravingeffect'] || pokemon.side.sideConditions['steelengravingeffect'] ||
				    pokemon.side.sideConditions['darkengravingeffect'] || pokemon.side.sideConditions['fairyengravingeffect'] || pokemon.side.sideConditions['anquiterraengravingeffect'] ||
				    pokemon.side.sideConditions['arastinithengravingeffect'] || pokemon.side.sideConditions['barbaraclemaadowrengravingeffect'] || pokemon.side.sideConditions['beheeyemengravingeffect'] ||
				    pokemon.side.sideConditions['chantyrusengravingeffect'] || pokemon.side.sideConditions['craftenirengravingeffect'] || pokemon.side.sideConditions['equinoqueengravingeffect'] ||
				    pokemon.side.sideConditions['golurkengravingeffect'] || pokemon.side.sideConditions['grapplinengravingeffect'] || pokemon.side.sideConditions['iblissengravingeffect'] ||
				    pokemon.side.sideConditions['kenuterraengravingeffect'] || pokemon.side.sideConditions['klinklangengravingeffect'] || pokemon.side.sideConditions['lanturnengravingeffect'] ||
				    pokemon.side.sideConditions['maudiorengravingeffect'] || pokemon.side.sideConditions['orasundraengravingeffect'] || pokemon.side.sideConditions['parascentengravingeffect'] ||
				    pokemon.side.sideConditions['rabscaengravingeffect'] || pokemon.side.sideConditions['sneezibiaengravingeffect'] || pokemon.side.sideConditions['spiritombengravingeffect'] ||
				    pokemon.side.sideConditions['tinkatonengravingeffect'] || pokemon.side.sideConditions['zebstrikaengravingeffect']) {
					return;
				}
				if (pokemon.hasType('Psychic')) {
					pokemon.side.addSideCondition('psychicengravingeffect');
					this.add('-sidestart', pokemon.side, 'Psychic Engraving');
					this.add('-anim', pokemon, "Flash");
					this.add('-message', `The Psychic Engraving has been activated on ${pokemon.side.name}'s side! Psychic-type Pokémon can now ignore Dark-type immunity and target's evasion boost.`);
				}
			}
		},
	},
	ghostengraving: {
		name: "Ghost Engraving",
		spritenum: 644,
		onTakeItem: false,
		num: -1038,
		desc: "Ghost Pokémon on user's side inflict Curse on attacker when fainted.",
		 // Check if the item can be activated
		onUpdate(pokemon) {
			if (!pokemon.side.sideConditions['ghostengravingeffect']) {
				if (pokemon.side.sideConditions['grassengravingeffect'] || pokemon.side.sideConditions['bugengravingeffect'] || pokemon.side.sideConditions['fireengravingeffect'] ||
					pokemon.side.sideConditions['waterengravingeffect'] || pokemon.side.sideConditions['iceengravingeffect'] || pokemon.side.sideConditions['electricengravingeffect'] || 
					pokemon.side.sideConditions['psychicengravingeffect'] || pokemon.side.sideConditions['poisonengravingeffect'] || pokemon.side.sideConditions['fightingengravingeffect'] || 
					pokemon.side.sideConditions['rockengravingeffect'] || pokemon.side.sideConditions['groundengravingeffect'] || pokemon.side.sideConditions['normalengravingeffect'] ||
				    pokemon.side.sideConditions['flyingengravingeffect'] || pokemon.side.sideConditions['dragonengravingeffect'] || pokemon.side.sideConditions['steelengravingeffect'] ||
				    pokemon.side.sideConditions['darkengravingeffect'] || pokemon.side.sideConditions['fairyengravingeffect'] || pokemon.side.sideConditions['anquiterraengravingeffect'] ||
				    pokemon.side.sideConditions['arastinithengravingeffect'] || pokemon.side.sideConditions['barbaraclemaadowrengravingeffect'] || pokemon.side.sideConditions['beheeyemengravingeffect'] ||
				    pokemon.side.sideConditions['chantyrusengravingeffect'] || pokemon.side.sideConditions['craftenirengravingeffect'] || pokemon.side.sideConditions['equinoqueengravingeffect'] ||
				    pokemon.side.sideConditions['golurkengravingeffect'] || pokemon.side.sideConditions['grapplinengravingeffect'] || pokemon.side.sideConditions['iblissengravingeffect'] ||
				    pokemon.side.sideConditions['kenuterraengravingeffect'] || pokemon.side.sideConditions['klinklangengravingeffect'] || pokemon.side.sideConditions['lanturnengravingeffect'] ||
				    pokemon.side.sideConditions['maudiorengravingeffect'] || pokemon.side.sideConditions['orasundraengravingeffect'] || pokemon.side.sideConditions['parascentengravingeffect'] ||
				    pokemon.side.sideConditions['rabscaengravingeffect'] || pokemon.side.sideConditions['sneezibiaengravingeffect'] || pokemon.side.sideConditions['spiritombengravingeffect'] ||
				    pokemon.side.sideConditions['tinkatonengravingeffect'] || pokemon.side.sideConditions['zebstrikaengravingeffect']) {
					return;
				}
				if (pokemon.hasType('Ghost')) {
					pokemon.side.addSideCondition('ghostengravingeffect');
					this.add('-sidestart', pokemon.side, 'Ghost Engraving');
					this.add('-anim', pokemon, "Flash");
					this.add('-message', `The Ghost Engraving has been activated on ${pokemon.side.name}'s side! Ghost-type Pokémon inflict Curse on attacker when fainted.`);
				}
			}
		},
	},
	poisonengraving: {
		name: "Poison Engraving",
		spritenum: 638,
		onTakeItem: false,
		num: -1039,
		desc: "Poison Pokémon on user's side inflict Contamination effect on attacker when fainted.",
		 // Check if the item can be activated
		onUpdate(pokemon) {
			if (!pokemon.side.sideConditions['poisonengravingeffect']) {
				if (pokemon.side.sideConditions['grassengravingeffect'] || pokemon.side.sideConditions['bugengravingeffect'] || pokemon.side.sideConditions['fireengravingeffect'] ||
					pokemon.side.sideConditions['waterengravingeffect'] || pokemon.side.sideConditions['iceengravingeffect'] || pokemon.side.sideConditions['electricengravingeffect'] || 
					pokemon.side.sideConditions['psychicengravingeffect'] || pokemon.side.sideConditions['ghostengravingeffect'] || pokemon.side.sideConditions['fightingengravingeffect'] || 
					pokemon.side.sideConditions['rockengravingeffect'] || pokemon.side.sideConditions['groundengravingeffect'] || pokemon.side.sideConditions['normalengravingeffect'] ||
				    pokemon.side.sideConditions['flyingengravingeffect'] || pokemon.side.sideConditions['dragonengravingeffect'] || pokemon.side.sideConditions['steelengravingeffect'] ||
				    pokemon.side.sideConditions['darkengravingeffect'] || pokemon.side.sideConditions['fairyengravingeffect'] || pokemon.side.sideConditions['anquiterraengravingeffect'] ||
				    pokemon.side.sideConditions['arastinithengravingeffect'] || pokemon.side.sideConditions['barbaraclemaadowrengravingeffect'] || pokemon.side.sideConditions['beheeyemengravingeffect'] ||
				    pokemon.side.sideConditions['chantyrusengravingeffect'] || pokemon.side.sideConditions['craftenirengravingeffect'] || pokemon.side.sideConditions['equinoqueengravingeffect'] ||
				    pokemon.side.sideConditions['golurkengravingeffect'] || pokemon.side.sideConditions['grapplinengravingeffect'] || pokemon.side.sideConditions['iblissengravingeffect'] ||
				    pokemon.side.sideConditions['kenuterraengravingeffect'] || pokemon.side.sideConditions['klinklangengravingeffect'] || pokemon.side.sideConditions['lanturnengravingeffect'] ||
				    pokemon.side.sideConditions['maudiorengravingeffect'] || pokemon.side.sideConditions['orasundraengravingeffect'] || pokemon.side.sideConditions['parascentengravingeffect'] ||
				    pokemon.side.sideConditions['rabscaengravingeffect'] || pokemon.side.sideConditions['sneezibiaengravingeffect'] || pokemon.side.sideConditions['spiritombengravingeffect'] ||
				    pokemon.side.sideConditions['tinkatonengravingeffect'] || pokemon.side.sideConditions['zebstrikaengravingeffect']) {
					return;
				}
				if (pokemon.hasType('Poison')) {
					pokemon.side.addSideCondition('poisonengravingeffect');
					this.add('-sidestart', pokemon.side, 'Poison Engraving');
					this.add('-anim', pokemon, "Flash");
					this.add('-message', `The Poison Engraving has been activated on ${pokemon.side.name}'s side! Poison-type Pokémon contaminate attacker when fainted. Contaminated Pokémon are poisoned. Infectuous.`);
				}
			}
		},
	},
	fightingengraving: {
		name: "Fighting Engraving",
		spritenum: 637,
		onTakeItem: false,
		num: -1040,
		desc: "Fighting Pokémon on user's side take 25% less damage from moves and are immune to critical hits but can always be hit.",
		 // Check if the item can be activated
		onUpdate(pokemon) {
			if (!pokemon.side.sideConditions['fightingengravingeffect']) {
				if (pokemon.side.sideConditions['grassengravingeffect'] || pokemon.side.sideConditions['bugengravingeffect'] || pokemon.side.sideConditions['fireengravingeffect'] ||
					pokemon.side.sideConditions['waterengravingeffect'] || pokemon.side.sideConditions['iceengravingeffect'] || pokemon.side.sideConditions['electricengravingeffect'] || 
					pokemon.side.sideConditions['psychicengravingeffect'] || pokemon.side.sideConditions['ghostengravingeffect'] || pokemon.side.sideConditions['poisonengravingeffect'] || 
					pokemon.side.sideConditions['rockengravingeffect'] || pokemon.side.sideConditions['groundengravingeffect'] || pokemon.side.sideConditions['normalengravingeffect'] ||
				    pokemon.side.sideConditions['flyingengravingeffect'] || pokemon.side.sideConditions['dragonengravingeffect'] || pokemon.side.sideConditions['steelengravingeffect'] ||
				    pokemon.side.sideConditions['darkengravingeffect'] || pokemon.side.sideConditions['fairyengravingeffect'] || pokemon.side.sideConditions['anquiterraengravingeffect'] ||
				    pokemon.side.sideConditions['arastinithengravingeffect'] || pokemon.side.sideConditions['barbaraclemaadowrengravingeffect'] || pokemon.side.sideConditions['beheeyemengravingeffect'] ||
				    pokemon.side.sideConditions['chantyrusengravingeffect'] || pokemon.side.sideConditions['craftenirengravingeffect'] || pokemon.side.sideConditions['equinoqueengravingeffect'] ||
				    pokemon.side.sideConditions['golurkengravingeffect'] || pokemon.side.sideConditions['grapplinengravingeffect'] || pokemon.side.sideConditions['iblissengravingeffect'] ||
				    pokemon.side.sideConditions['kenuterraengravingeffect'] || pokemon.side.sideConditions['klinklangengravingeffect'] || pokemon.side.sideConditions['lanturnengravingeffect'] ||
				    pokemon.side.sideConditions['maudiorengravingeffect'] || pokemon.side.sideConditions['orasundraengravingeffect'] || pokemon.side.sideConditions['parascentengravingeffect'] ||
				    pokemon.side.sideConditions['rabscaengravingeffect'] || pokemon.side.sideConditions['sneezibiaengravingeffect'] || pokemon.side.sideConditions['spiritombengravingeffect'] ||
				    pokemon.side.sideConditions['tinkatonengravingeffect'] || pokemon.side.sideConditions['zebstrikaengravingeffect']) {
					return;
				}
				if (pokemon.hasType('Fighting')) {
					pokemon.side.addSideCondition('fightingengravingeffect');
					this.add('-sidestart', pokemon.side, 'Fighting Engraving');
					this.add('-anim', pokemon, "Flash");
					this.add('-message', `The Fighting Engraving has been activated on ${pokemon.side.name}'s side! Fighting-type Pokémon take 25% less damage from moves and are immune to critical hits but can always be hit.`);
				}
			}
		},
	},
	rockengraving: {
		name: "Rock Engraving",
		spritenum: 643,
		onTakeItem: false,
		num: -1041,
		desc: "Rock Pokémon on user's side have +20% more accuracy and +2 crit ratio but they do 25% less damage.",
		 // Check if the item can be activated
		onUpdate(pokemon) {
			if (!pokemon.side.sideConditions['rockengravingeffect']) {
				if (pokemon.side.sideConditions['grassengravingeffect'] || pokemon.side.sideConditions['bugengravingeffect'] || pokemon.side.sideConditions['fireengravingeffect'] ||
					pokemon.side.sideConditions['waterengravingeffect'] || pokemon.side.sideConditions['iceengravingeffect'] || pokemon.side.sideConditions['electricengravingeffect'] || 
					pokemon.side.sideConditions['psychicengravingeffect'] || pokemon.side.sideConditions['ghostengravingeffect'] || pokemon.side.sideConditions['poisonengravingeffect'] || 
					pokemon.side.sideConditions['fightingengravingeffect'] || pokemon.side.sideConditions['groundengravingeffect'] || pokemon.side.sideConditions['normalengravingeffect'] ||
				    pokemon.side.sideConditions['flyingengravingeffect'] || pokemon.side.sideConditions['dragonengravingeffect'] || pokemon.side.sideConditions['steelengravingeffect'] ||
				    pokemon.side.sideConditions['darkengravingeffect'] || pokemon.side.sideConditions['fairyengravingeffect'] || pokemon.side.sideConditions['anquiterraengravingeffect'] ||
				    pokemon.side.sideConditions['arastinithengravingeffect'] || pokemon.side.sideConditions['barbaraclemaadowrengravingeffect'] || pokemon.side.sideConditions['beheeyemengravingeffect'] ||
				    pokemon.side.sideConditions['chantyrusengravingeffect'] || pokemon.side.sideConditions['craftenirengravingeffect'] || pokemon.side.sideConditions['equinoqueengravingeffect'] ||
				    pokemon.side.sideConditions['golurkengravingeffect'] || pokemon.side.sideConditions['grapplinengravingeffect'] || pokemon.side.sideConditions['iblissengravingeffect'] ||
				    pokemon.side.sideConditions['kenuterraengravingeffect'] || pokemon.side.sideConditions['klinklangengravingeffect'] || pokemon.side.sideConditions['lanturnengravingeffect'] ||
				    pokemon.side.sideConditions['maudiorengravingeffect'] || pokemon.side.sideConditions['orasundraengravingeffect'] || pokemon.side.sideConditions['parascentengravingeffect'] ||
				    pokemon.side.sideConditions['rabscaengravingeffect'] || pokemon.side.sideConditions['sneezibiaengravingeffect'] || pokemon.side.sideConditions['spiritombengravingeffect'] ||
				    pokemon.side.sideConditions['tinkatonengravingeffect'] || pokemon.side.sideConditions['zebstrikaengravingeffect']) {
					return;
				}
				if (pokemon.hasType('Rock')) {
					pokemon.side.addSideCondition('rockengravingeffect');
					this.add('-sidestart', pokemon.side, 'Rock Engraving');
					this.add('-anim', pokemon, "Flash");
					this.add('-message', `The Rock Engraving has been activated on ${pokemon.side.name}'s side! Rock-type Pokémon have 20% more accurray and +2 crit ratio but do 25% less damage.`);
				}
			}
		},
	},
	groundengraving: {
		name: "Ground Engraving",
		spritenum: 639,
		onTakeItem: false,
		num: -1042,
		desc: "Ground Pokémon on user's side take half damage from a move when switching in.",
		 // Check if the item can be activated
		onUpdate(pokemon) {
			if (!pokemon.side.sideConditions['groundengravingeffect']) {
				if (pokemon.side.sideConditions['grassengravingeffect'] || pokemon.side.sideConditions['bugengravingeffect'] || pokemon.side.sideConditions['fireengravingeffect'] ||
					pokemon.side.sideConditions['waterengravingeffect'] || pokemon.side.sideConditions['iceengravingeffect'] || pokemon.side.sideConditions['electricengravingeffect'] || 
					pokemon.side.sideConditions['psychicengravingeffect'] || pokemon.side.sideConditions['ghostengravingeffect'] || pokemon.side.sideConditions['poisonengravingeffect'] || 
					pokemon.side.sideConditions['fightingengravingeffect'] || pokemon.side.sideConditions['rockengravingeffect'] || pokemon.side.sideConditions['normalengravingeffect'] ||
				    pokemon.side.sideConditions['flyingengravingeffect'] || pokemon.side.sideConditions['dragonengravingeffect'] || pokemon.side.sideConditions['steelengravingeffect'] ||
				    pokemon.side.sideConditions['darkengravingeffect'] || pokemon.side.sideConditions['fairyengravingeffect'] || pokemon.side.sideConditions['anquiterraengravingeffect'] ||
				    pokemon.side.sideConditions['arastinithengravingeffect'] || pokemon.side.sideConditions['barbaraclemaadowrengravingeffect'] || pokemon.side.sideConditions['beheeyemengravingeffect'] ||
				    pokemon.side.sideConditions['chantyrusengravingeffect'] || pokemon.side.sideConditions['craftenirengravingeffect'] || pokemon.side.sideConditions['equinoqueengravingeffect'] ||
				    pokemon.side.sideConditions['golurkengravingeffect'] || pokemon.side.sideConditions['grapplinengravingeffect'] || pokemon.side.sideConditions['iblissengravingeffect'] ||
				    pokemon.side.sideConditions['kenuterraengravingeffect'] || pokemon.side.sideConditions['klinklangengravingeffect'] || pokemon.side.sideConditions['lanturnengravingeffect'] ||
				    pokemon.side.sideConditions['maudiorengravingeffect'] || pokemon.side.sideConditions['orasundraengravingeffect'] || pokemon.side.sideConditions['parascentengravingeffect'] ||
				    pokemon.side.sideConditions['rabscaengravingeffect'] || pokemon.side.sideConditions['sneezibiaengravingeffect'] || pokemon.side.sideConditions['spiritombengravingeffect'] ||
				    pokemon.side.sideConditions['tinkatonengravingeffect'] || pokemon.side.sideConditions['zebstrikaengravingeffect']) {
					return;
				}
				if (pokemon.hasType('Ground')) {
					pokemon.side.addSideCondition('groundengravingeffect');
					this.add('-sidestart', pokemon.side, 'Ground Engraving');
					this.add('-anim', pokemon, "Flash");
					this.add('-message', `The Ground Engraving has been activated on ${pokemon.side.name}'s side! Ground-type Pokémon take half damage from a move when switchinng in.`);
				}
			}
		},
	},
	normalengraving: {
		name: "Normal Engraving",
		spritenum: 631,
		onTakeItem: false,
		num: -1043,
		desc: "Normal Pokémon on user's side receive halfed indirect damage.",
		 // Check if the item can be activated
		onUpdate(pokemon) {
			if (!pokemon.side.sideConditions['normalengravingeffect']) {
				if (pokemon.side.sideConditions['grassengravingeffect'] || pokemon.side.sideConditions['bugengravingeffect'] || pokemon.side.sideConditions['fireengravingeffect'] ||
					pokemon.side.sideConditions['waterengravingeffect'] || pokemon.side.sideConditions['iceengravingeffect'] || pokemon.side.sideConditions['electricengravingeffect'] || 
					pokemon.side.sideConditions['psychicengravingeffect'] || pokemon.side.sideConditions['ghostengravingeffect'] || pokemon.side.sideConditions['poisonengravingeffect'] || 
					pokemon.side.sideConditions['fightingengravingeffect'] || pokemon.side.sideConditions['rockengravingeffect'] || pokemon.side.sideConditions['groundengravingeffect'] ||
				    pokemon.side.sideConditions['flyingengravingeffect'] || pokemon.side.sideConditions['dragonengravingeffect'] || pokemon.side.sideConditions['steelengravingeffect'] ||
				    pokemon.side.sideConditions['darkengravingeffect'] || pokemon.side.sideConditions['fairyengravingeffect'] || pokemon.side.sideConditions['anquiterraengravingeffect'] ||
				    pokemon.side.sideConditions['arastinithengravingeffect'] || pokemon.side.sideConditions['barbaraclemaadowrengravingeffect'] || pokemon.side.sideConditions['beheeyemengravingeffect'] ||
				    pokemon.side.sideConditions['chantyrusengravingeffect'] || pokemon.side.sideConditions['craftenirengravingeffect'] || pokemon.side.sideConditions['equinoqueengravingeffect'] ||
				    pokemon.side.sideConditions['golurkengravingeffect'] || pokemon.side.sideConditions['grapplinengravingeffect'] || pokemon.side.sideConditions['iblissengravingeffect'] ||
				    pokemon.side.sideConditions['kenuterraengravingeffect'] || pokemon.side.sideConditions['klinklangengravingeffect'] || pokemon.side.sideConditions['lanturnengravingeffect'] ||
				    pokemon.side.sideConditions['maudiorengravingeffect'] || pokemon.side.sideConditions['orasundraengravingeffect'] || pokemon.side.sideConditions['parascentengravingeffect'] ||
				    pokemon.side.sideConditions['rabscaengravingeffect'] || pokemon.side.sideConditions['sneezibiaengravingeffect'] || pokemon.side.sideConditions['spiritombengravingeffect'] ||
				    pokemon.side.sideConditions['tinkatonengravingeffect'] || pokemon.side.sideConditions['zebstrikaengravingeffect']) {
					return;
				}
				if (pokemon.hasType('Normal')) {
					pokemon.side.addSideCondition('normalengravingeffect');
					this.add('-sidestart', pokemon.side, 'Normal Engraving');
					this.add('-anim', pokemon, "Flash");
					this.add('-message', `The Normal Engraving has been activated on ${pokemon.side.name}'s side! Normal-type Pokémon receive halfed indirect damage.`);
				}
			}
		},
	},
	flyingengraving: {
		name: "Flying Engraving",
		spritenum: 640,
		onTakeItem: false,
		num: -1044,
		desc: "Flying Pokémon on user's side do 50% more damage with moves that have 60 BP or lower.",
		 // Check if the item can be activated
		onUpdate(pokemon) {
			if (!pokemon.side.sideConditions['flyingengravingeffect']) {
				if (pokemon.side.sideConditions['grassengravingeffect'] || pokemon.side.sideConditions['bugengravingeffect'] || pokemon.side.sideConditions['fireengravingeffect'] ||
					pokemon.side.sideConditions['waterengravingeffect'] || pokemon.side.sideConditions['iceengravingeffect'] || pokemon.side.sideConditions['electricengravingeffect'] || 
					pokemon.side.sideConditions['psychicengravingeffect'] || pokemon.side.sideConditions['ghostengravingeffect'] || pokemon.side.sideConditions['poisonengravingeffect'] || 
					pokemon.side.sideConditions['fightingengravingeffect'] || pokemon.side.sideConditions['rockengravingeffect'] || pokemon.side.sideConditions['groundengravingeffect'] ||
				    pokemon.side.sideConditions['normalengravingeffect'] || pokemon.side.sideConditions['dragonengravingeffect'] || pokemon.side.sideConditions['steelengravingeffect'] ||
				    pokemon.side.sideConditions['darkengravingeffect'] || pokemon.side.sideConditions['fairyengravingeffect'] || pokemon.side.sideConditions['anquiterraengravingeffect'] ||
				    pokemon.side.sideConditions['arastinithengravingeffect'] || pokemon.side.sideConditions['barbaraclemaadowrengravingeffect'] || pokemon.side.sideConditions['beheeyemengravingeffect'] ||
				    pokemon.side.sideConditions['chantyrusengravingeffect'] || pokemon.side.sideConditions['craftenirengravingeffect'] || pokemon.side.sideConditions['equinoqueengravingeffect'] ||
				    pokemon.side.sideConditions['golurkengravingeffect'] || pokemon.side.sideConditions['grapplinengravingeffect'] || pokemon.side.sideConditions['iblissengravingeffect'] ||
				    pokemon.side.sideConditions['kenuterraengravingeffect'] || pokemon.side.sideConditions['klinklangengravingeffect'] || pokemon.side.sideConditions['lanturnengravingeffect'] ||
				    pokemon.side.sideConditions['maudiorengravingeffect'] || pokemon.side.sideConditions['orasundraengravingeffect'] || pokemon.side.sideConditions['parascentengravingeffect'] ||
				    pokemon.side.sideConditions['rabscaengravingeffect'] || pokemon.side.sideConditions['sneezibiaengravingeffect'] || pokemon.side.sideConditions['spiritombengravingeffect'] ||
				    pokemon.side.sideConditions['tinkatonengravingeffect'] || pokemon.side.sideConditions['zebstrikaengravingeffect']) {
					return;
				}
				if (pokemon.hasType('Flying')) {
					pokemon.side.addSideCondition('flyingengravingeffect');
					this.add('-sidestart', pokemon.side, 'Flying Engraving');
					this.add('-anim', pokemon, "Flash");
					this.add('-message', `The Flying Engraving has been activated on ${pokemon.side.name}'s side! Flying-type Pokémon do 50% more damage with moves of 60 BP or lower.`);
				}
			}
		},
	},
	dragonengraving: {
		name: "Dragon Engraving",
		spritenum: 645,
		onTakeItem: false,
		num: -1045,
		desc: "Dragon Pokémon on user's side do 50% more to a target if its HP >= 50%. Dragon moves only.",
		 // Check if the item can be activated
		onUpdate(pokemon) {
			if (!pokemon.side.sideConditions['dragonengravingeffect']) {
				if (pokemon.side.sideConditions['grassengravingeffect'] || pokemon.side.sideConditions['bugengravingeffect'] || pokemon.side.sideConditions['fireengravingeffect'] ||
					pokemon.side.sideConditions['waterengravingeffect'] || pokemon.side.sideConditions['iceengravingeffect'] || pokemon.side.sideConditions['electricengravingeffect'] || 
					pokemon.side.sideConditions['psychicengravingeffect'] || pokemon.side.sideConditions['ghostengravingeffect'] || pokemon.side.sideConditions['poisonengravingeffect'] || 
					pokemon.side.sideConditions['fightingengravingeffect'] || pokemon.side.sideConditions['rockengravingeffect'] || pokemon.side.sideConditions['groundengravingeffect'] ||
				    pokemon.side.sideConditions['normalengravingeffect'] || pokemon.side.sideConditions['flyingengravingeffect'] || pokemon.side.sideConditions['steelengravingeffect'] ||
				    pokemon.side.sideConditions['darkengravingeffect'] || pokemon.side.sideConditions['fairyengravingeffect'] || pokemon.side.sideConditions['anquiterraengravingeffect'] ||
				    pokemon.side.sideConditions['arastinithengravingeffect'] || pokemon.side.sideConditions['barbaraclemaadowrengravingeffect'] || pokemon.side.sideConditions['beheeyemengravingeffect'] ||
				    pokemon.side.sideConditions['chantyrusengravingeffect'] || pokemon.side.sideConditions['craftenirengravingeffect'] || pokemon.side.sideConditions['equinoqueengravingeffect'] ||
				    pokemon.side.sideConditions['golurkengravingeffect'] || pokemon.side.sideConditions['grapplinengravingeffect'] || pokemon.side.sideConditions['iblissengravingeffect'] ||
				    pokemon.side.sideConditions['kenuterraengravingeffect'] || pokemon.side.sideConditions['klinklangengravingeffect'] || pokemon.side.sideConditions['lanturnengravingeffect'] ||
				    pokemon.side.sideConditions['maudiorengravingeffect'] || pokemon.side.sideConditions['orasundraengravingeffect'] || pokemon.side.sideConditions['parascentengravingeffect'] ||
				    pokemon.side.sideConditions['rabscaengravingeffect'] || pokemon.side.sideConditions['sneezibiaengravingeffect'] || pokemon.side.sideConditions['spiritombengravingeffect'] ||
				    pokemon.side.sideConditions['tinkatonengravingeffect'] || pokemon.side.sideConditions['zebstrikaengravingeffect']) {
					return;
				}
				if (pokemon.hasType('Dragon')) {
					pokemon.side.addSideCondition('dragonengravingeffect');
					this.add('-sidestart', pokemon.side, 'Dragon Engraving');
					this.add('-anim', pokemon, "Flash");
					this.add('-message', `The Dragon Engraving has been activated on ${pokemon.side.name}'s side! Dragon-type Pokémon do 50% more damage to a target if its HP >= 50%. Dragon moves only.`);
				}
			}
		},
	},
	steelengraving: {
		name: "Steel Engraving",
		spritenum: 647,
		onTakeItem: false,
		num: -1046,
		desc: "Steel Pokémon on user's side are unaffected by secondary effects of a move.",
		 // Check if the item can be activated
		onUpdate(pokemon) {
			if (!pokemon.side.sideConditions['steelengravingeffect']) {
				if (pokemon.side.sideConditions['grassengravingeffect'] || pokemon.side.sideConditions['bugengravingeffect'] || pokemon.side.sideConditions['fireengravingeffect'] ||
					pokemon.side.sideConditions['waterengravingeffect'] || pokemon.side.sideConditions['iceengravingeffect'] || pokemon.side.sideConditions['electricengravingeffect'] || 
					pokemon.side.sideConditions['psychicengravingeffect'] || pokemon.side.sideConditions['ghostengravingeffect'] || pokemon.side.sideConditions['poisonengravingeffect'] || 
					pokemon.side.sideConditions['fightingengravingeffect'] || pokemon.side.sideConditions['rockengravingeffect'] || pokemon.side.sideConditions['groundengravingeffect'] ||
				    pokemon.side.sideConditions['normalengravingeffect'] || pokemon.side.sideConditions['flyingengravingeffect'] || pokemon.side.sideConditions['dragonengravingeffect'] ||
				    pokemon.side.sideConditions['darkengravingeffect'] || pokemon.side.sideConditions['fairyengravingeffect'] || pokemon.side.sideConditions['anquiterraengravingeffect'] ||
				    pokemon.side.sideConditions['arastinithengravingeffect'] || pokemon.side.sideConditions['barbaraclemaadowrengravingeffect'] || pokemon.side.sideConditions['beheeyemengravingeffect'] ||
				    pokemon.side.sideConditions['chantyrusengravingeffect'] || pokemon.side.sideConditions['craftenirengravingeffect'] || pokemon.side.sideConditions['equinoqueengravingeffect'] ||
				    pokemon.side.sideConditions['golurkengravingeffect'] || pokemon.side.sideConditions['grapplinengravingeffect'] || pokemon.side.sideConditions['iblissengravingeffect'] ||
				    pokemon.side.sideConditions['kenuterraengravingeffect'] || pokemon.side.sideConditions['klinklangengravingeffect'] || pokemon.side.sideConditions['lanturnengravingeffect'] ||
				    pokemon.side.sideConditions['maudiorengravingeffect'] || pokemon.side.sideConditions['orasundraengravingeffect'] || pokemon.side.sideConditions['parascentengravingeffect'] ||
				    pokemon.side.sideConditions['rabscaengravingeffect'] || pokemon.side.sideConditions['sneezibiaengravingeffect'] || pokemon.side.sideConditions['spiritombengravingeffect'] ||
				    pokemon.side.sideConditions['tinkatonengravingeffect'] || pokemon.side.sideConditions['zebstrikaengravingeffect']) {
					return;
				}
				if (pokemon.hasType('Steel')) {
					pokemon.side.addSideCondition('steelengravingeffect');
					this.add('-sidestart', pokemon.side, 'Steel Engraving');
					this.add('-anim', pokemon, "Flash");
					this.add('-message', `The Steel Engraving has been activated on ${pokemon.side.name}'s side! Steel-type Pokémon are unaffected by secondary effects of a move.`);
				}
			}
		},
	},
	darkengraving: {
		name: "Dark Engraving",
		spritenum: 646,
		onTakeItem: false,
		num: -1047,
		desc: "Dark Pokémon on user's side learn Exhume, if possible.",
		 // Check if the item can be activated
		onUpdate(pokemon) {
			if (!pokemon.side.sideConditions['darkengravingeffect']) {
				if (pokemon.side.sideConditions['grassengravingeffect'] || pokemon.side.sideConditions['bugengravingeffect'] || pokemon.side.sideConditions['fireengravingeffect'] ||
					pokemon.side.sideConditions['waterengravingeffect'] || pokemon.side.sideConditions['iceengravingeffect'] || pokemon.side.sideConditions['electricengravingeffect'] || 
					pokemon.side.sideConditions['psychicengravingeffect'] || pokemon.side.sideConditions['ghostengravingeffect'] || pokemon.side.sideConditions['poisonengravingeffect'] || 
					pokemon.side.sideConditions['fightingengravingeffect'] || pokemon.side.sideConditions['rockengravingeffect'] || pokemon.side.sideConditions['groundengravingeffect'] ||
				    pokemon.side.sideConditions['normalengravingeffect'] || pokemon.side.sideConditions['flyingengravingeffect'] || pokemon.side.sideConditions['dragonengravingeffect'] ||
				    pokemon.side.sideConditions['steelengravingeffect'] || pokemon.side.sideConditions['fairyengravingeffect'] || pokemon.side.sideConditions['anquiterraengravingeffect'] ||
				    pokemon.side.sideConditions['arastinithengravingeffect'] || pokemon.side.sideConditions['barbaraclemaadowrengravingeffect'] || pokemon.side.sideConditions['beheeyemengravingeffect'] ||
				    pokemon.side.sideConditions['chantyrusengravingeffect'] || pokemon.side.sideConditions['craftenirengravingeffect'] || pokemon.side.sideConditions['equinoqueengravingeffect'] ||
				    pokemon.side.sideConditions['golurkengravingeffect'] || pokemon.side.sideConditions['grapplinengravingeffect'] || pokemon.side.sideConditions['iblissengravingeffect'] ||
				    pokemon.side.sideConditions['kenuterraengravingeffect'] || pokemon.side.sideConditions['klinklangengravingeffect'] || pokemon.side.sideConditions['lanturnengravingeffect'] ||
				    pokemon.side.sideConditions['maudiorengravingeffect'] || pokemon.side.sideConditions['orasundraengravingeffect'] || pokemon.side.sideConditions['parascentengravingeffect'] ||
				    pokemon.side.sideConditions['rabscaengravingeffect'] || pokemon.side.sideConditions['sneezibiaengravingeffect'] || pokemon.side.sideConditions['spiritombengravingeffect'] ||
				    pokemon.side.sideConditions['tinkatonengravingeffect'] || pokemon.side.sideConditions['zebstrikaengravingeffect']) {
					return;
				}
				if (pokemon.hasType('Dark')) {
					pokemon.side.addSideCondition('darkengravingeffect');
					this.add('-sidestart', pokemon.side, 'Dark Engraving');
					this.add('-anim', pokemon, "Flash");
					this.add('-message', `The Dark Engraving has been activated on ${pokemon.side.name}'s side! Dark-type Pokémon learn Exhume. It uses the first move of the last fainted Dark ally. Get best stat boost.`);
				}
			}
		},
	},
	fairyengraving: {
		name: "Fairy Engraving",
		spritenum: 648,
		onTakeItem: false,
		num: -1048,
		desc: "Fairy Pokémon on user's side steal target's item with a damaging move. Target receives Black Sludge.",
		 // Check if the item can be activated
		onUpdate(pokemon) {
			if (!pokemon.side.sideConditions['fairyengravingeffect']) {
				if (pokemon.side.sideConditions['grassengravingeffect'] || pokemon.side.sideConditions['bugengravingeffect'] || pokemon.side.sideConditions['fireengravingeffect'] ||
					pokemon.side.sideConditions['waterengravingeffect'] || pokemon.side.sideConditions['iceengravingeffect'] || pokemon.side.sideConditions['electricengravingeffect'] || 
					pokemon.side.sideConditions['psychicengravingeffect'] || pokemon.side.sideConditions['ghostengravingeffect'] || pokemon.side.sideConditions['poisonengravingeffect'] || 
					pokemon.side.sideConditions['fightingengravingeffect'] || pokemon.side.sideConditions['rockengravingeffect'] || pokemon.side.sideConditions['groundengravingeffect'] ||
				    pokemon.side.sideConditions['normalengravingeffect'] || pokemon.side.sideConditions['flyingengravingeffect'] || pokemon.side.sideConditions['dragonengravingeffect'] ||
				    pokemon.side.sideConditions['steelengravingeffect'] || pokemon.side.sideConditions['darkengravingeffect'] || pokemon.side.sideConditions['anquiterraengravingeffect'] ||
				    pokemon.side.sideConditions['arastinithengravingeffect'] || pokemon.side.sideConditions['barbaraclemaadowrengravingeffect'] || pokemon.side.sideConditions['beheeyemengravingeffect'] ||
				    pokemon.side.sideConditions['chantyrusengravingeffect'] || pokemon.side.sideConditions['craftenirengravingeffect'] || pokemon.side.sideConditions['equinoqueengravingeffect'] ||
				    pokemon.side.sideConditions['golurkengravingeffect'] || pokemon.side.sideConditions['grapplinengravingeffect'] || pokemon.side.sideConditions['iblissengravingeffect'] ||
				    pokemon.side.sideConditions['kenuterraengravingeffect'] || pokemon.side.sideConditions['klinklangengravingeffect'] || pokemon.side.sideConditions['lanturnengravingeffect'] ||
				    pokemon.side.sideConditions['maudiorengravingeffect'] || pokemon.side.sideConditions['orasundraengravingeffect'] || pokemon.side.sideConditions['parascentengravingeffect'] ||
				    pokemon.side.sideConditions['rabscaengravingeffect'] || pokemon.side.sideConditions['sneezibiaengravingeffect'] || pokemon.side.sideConditions['spiritombengravingeffect'] ||
				    pokemon.side.sideConditions['tinkatonengravingeffect'] || pokemon.side.sideConditions['zebstrikaengravingeffect']) {
					return;
				}
				if (pokemon.hasType('Fairy')) {
					pokemon.side.addSideCondition('fairyengravingeffect');
					this.add('-sidestart', pokemon.side, 'Fairy Engraving');
					this.add('-anim', pokemon, "Flash");
					this.add('-message', `The Fairy Engraving has been activated on ${pokemon.side.name}'s side! Fairy-type Pokémon steal target's item with a damaging move. Target receives Black Sludge.`);
				}
			}
		},
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
			// Determine the amount of PP to restore
			const ppRestoreAmount = pokemon.volatiles['sauteing'] ? 20 : 10;
			moveSlot.pp += ppRestoreAmount;
			if (moveSlot.pp > moveSlot.maxpp) moveSlot.pp = moveSlot.maxpp;
			this.add('-activate', pokemon, 'item: Leppa Berry', moveSlot.move, '[consumed]');
			pokemon.removeVolatile('sauteing'); // Remove the 'sauteing' volatile status
		},
		num: 154,
		gen: 3,
	},
	// start: Handle sauteing volatile
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
			// Check if the Pokémon can heal
			if (!this.runEvent('TryHeal', pokemon, null, this.effect, pokemon.baseMaxhp / 4)) return false;
		},
		onEat(pokemon) {
			// Check if the Pokémon has the 'sauteing' volatile
			const healAmount = pokemon.volatiles['sauteing'] ? pokemon.baseMaxhp / 2 : pokemon.baseMaxhp / 4;
			this.heal(healAmount); // Heal the appropriate amount
			pokemon.removeVolatile('sauteing'); // Remove the 'sauteing' volatile status
		},
		num: 158,
		gen: 3,
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
			// Check if the Pokémon can heal
			if (!this.runEvent('TryHeal', pokemon, null, this.effect, 10)) return false;
		},
		onEat(pokemon) {
			// Check if the Pokémon has the 'sauteing' volatile
			const healAmount = pokemon.volatiles['sauteing'] ? 20 : 10; // Heal 20 if 'sauteing', otherwise 10
			this.heal(healAmount); // Heal the appropriate amount
			pokemon.removeVolatile('sauteing'); // Remove the 'sauteing' volatile status
		},
		num: 155,
		gen: 3,
		rating: 0,
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
			// Check if the Pokémon can heal
			if (!this.runEvent('TryHeal', pokemon, null, this.effect, pokemon.baseMaxhp / 3)) return false;
		},
		onEat(pokemon) {
			// Check if the Pokémon has the 'sauteing' volatile
			const healAmount = pokemon.volatiles['sauteing'] ? (2 * pokemon.baseMaxhp / 3) : (pokemon.baseMaxhp / 3);
			this.heal(healAmount); // Heal the appropriate amount
			pokemon.removeVolatile('sauteing'); // Remove the 'sauteing' volatile status
			if (pokemon.getNature().minus === 'atk') {
				pokemon.addVolatile('confusion');
			}
		},
		num: 159,
		gen: 3,
		rating: 3,
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
			// Check if the Pokémon can heal
			if (!this.runEvent('TryHeal', pokemon, null, this.effect, pokemon.baseMaxhp / 3)) return false;
		},
		onEat(pokemon) {
			// Check if the Pokémon has the 'sauteing' volatile
			const healAmount = pokemon.volatiles['sauteing'] ? (2 * pokemon.baseMaxhp / 3) : (pokemon.baseMaxhp / 3);
			this.heal(healAmount); // Heal the appropriate amount
			pokemon.removeVolatile('sauteing'); // Remove the 'sauteing' volatile status
			if (pokemon.getNature().minus === 'spa') {
				pokemon.addVolatile('confusion');
			}
		},
		num: 160,
		gen: 3,
		rating: 3,
	},
	magoBerry: {
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
			// Check if the Pokémon can heal
			if (!this.runEvent('TryHeal', pokemon, null, this.effect, pokemon.baseMaxhp / 3)) return false;
		},
		onEat(pokemon) {
			// Check if the Pokémon has the 'sauteing' volatile
			const healAmount = pokemon.volatiles['sauteing'] ? (2 * pokemon.baseMaxhp / 3) : (pokemon.baseMaxhp / 3);
			this.heal(healAmount); // Heal the appropriate amount
			pokemon.removeVolatile('sauteing'); // Remove the 'sauteing' volatile status
			if (pokemon.getNature().minus === 'spe') {
				pokemon.addVolatile('confusion');
			}
		},
		num: 161,
		gen: 3,
		rating: 3,
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
		onTryEatItem(item, pokemon) {
			// Check if the Pokémon can heal
			if (!this.runEvent('TryHeal', pokemon, null, this.effect, pokemon.baseMaxhp / 3)) return false;
		},
		onEat(pokemon) {
			// Check if the Pokémon has the 'sauteing' volatile
			const healAmount = pokemon.volatiles['sauteing'] ? (2 * pokemon.baseMaxhp / 3) : (pokemon.baseMaxhp / 3);
			this.heal(healAmount); // Heal the appropriate amount
			pokemon.removeVolatile('sauteing'); // Remove the 'sauteing' volatile status
			if (pokemon.getNature().minus === 'spd') {
				pokemon.addVolatile('confusion');
			}
		},
		num: 162,
		gen: 3,
		rating: 3,
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
			// Check if the Pokémon can heal
			if (!this.runEvent('TryHeal', pokemon, null, this.effect, pokemon.baseMaxhp / 3)) return false;
		},
		onEat(pokemon) {
			// Check if the Pokémon has the 'sauteing' volatile
			const healAmount = pokemon.volatiles['sauteing'] ? (2 * pokemon.baseMaxhp / 3) : (pokemon.baseMaxhp / 3);
			this.heal(healAmount); // Heal the appropriate amount
			pokemon.removeVolatile('sauteing'); // Remove the 'sauteing' volatile status
			if (pokemon.getNature().minus === 'def') {
				pokemon.addVolatile('confusion');
			}
		},
		num: 163,
		gen: 3,
		rating: 3,
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
			// Determine the amount of Attack boost
			const boostAmount = pokemon.volatiles['sauteing'] ? 2 : 1;
			this.boost({atk: boostAmount}); // Boost Attack by the appropriate amount
			pokemon.removeVolatile('sauteing'); // Remove the 'sauteing' volatile status
		},
		num: 201,
		gen: 3,
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
			// Determine the amount of Defense boost
			const boostAmount = pokemon.volatiles['sauteing'] ? 2 : 1;
			this.boost({def: boostAmount}); // Boost Defense by the appropriate amount
			pokemon.removeVolatile('sauteing'); // Remove the 'sauteing' volatile status
		},
		num: 202,
		gen: 3,
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
			// Determine the amount of Speed boost
			const boostAmount = pokemon.volatiles['sauteing'] ? 2 : 1;
			this.boost({spe: boostAmount}); // Boost Speed by the appropriate amount
			pokemon.removeVolatile('sauteing'); // Remove the 'sauteing' volatile status
		},
		num: 203,
		gen: 3,
		rating: 3,
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
			// Determine the amount of Special Attack boost
			const boostAmount = pokemon.volatiles['sauteing'] ? 2 : 1;
			this.boost({spa: boostAmount}); // Boost Special Attack by the appropriate amount
			pokemon.removeVolatile('sauteing'); // Remove the 'sauteing' volatile status
		},
		num: 204,
		gen: 3,
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
			// Determine the amount of Special Defense boost
			const boostAmount = pokemon.volatiles['sauteing'] ? 2 : 1;
			this.boost({spd: boostAmount}); // Boost Special Defense by the appropriate amount
			pokemon.removeVolatile('sauteing'); // Remove the 'sauteing' volatile status
		},
		num: 205,
		gen: 3,
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
				// Determine the amount of stat boost
				const boostAmount = pokemon.volatiles['sauteing'] ? 4 : 2;
				boost[randomStat] = boostAmount; // Set the boost amount
				this.boost(boost); // Apply the boost
			}
			pokemon.removeVolatile('sauteing'); // Remove the 'sauteing' volatile status
		},
		num: 207,
		gen: 3,
	},
	// end
};
