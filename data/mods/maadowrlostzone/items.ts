import { TARGET_HP_BASED_MOVES } from "../../cg-team-data";

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
	orbeetite: {
		name: "Orbeetite",
		spritenum: 602,
		megaStone: "Orbeetle-Mega",
		megaEvolves: "Orbeetle",
		itemUser: ["Orbeetle"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1200,
		gen: 9,
		desc: "If held by an Orbeetle, this item allows it to Mega Evolve in battle.",
	},
	// end

	// start
	laprasite: {
		name: "Laprasite",
		spritenum: 623,
		megaStone: "Lapras-Mega",
		megaEvolves: "Lapras",
		itemUser: ["Lapras"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1201,
		gen: 9,
		desc: "If held by a Lapras, this item allows it to Mega Evolve in battle.",
	},
	// end

	// start
	avaluggite: {
		name: "Avaluggite",
		spritenum: 623,
		megaStone: "Avalugg-Mega",
		megaEvolves: "Avalugg",
		itemUser: ["Avalugg"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1202,
		gen: 9,
		desc: "If held by an Avalugg, this item allows it to Mega Evolve in battle.",
	},
	// end

	// start
	tyrantrumite: {
		name: "Tyrantrumite",
		spritenum: 577,
		megaStone: "Tyrantrum-Mega",
		megaEvolves: "Tyrantrum",
		itemUser: ["Tyrantrum"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1203,
		gen: 9,
		desc: "If held by a Tyrantrum, this item allows it to Mega Evolve in battle.",
	},
	// end

	// start
	aurorite: {
		name: "Aurorite",
		spritenum: 577,
		megaStone: "Aurorus-Mega",
		megaEvolves: "Aurorus",
		itemUser: ["Aurorus"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1204,
		gen: 9,
		desc: "If held by an Aurorus, this item allows it to Mega Evolve in battle.",
	},
	// end

	// start
	sandacondite: {
		name: "Sandacondite",
		spritenum: 589,
		megaStone: "Sandaconda-Mega",
		megaEvolves: "Sandaconda",
		itemUser: ["Sandaconda"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1205,
		gen: 9,
		desc: "If held by a Sandaconda, this item allows it to Mega Evolve in battle.",
	},
	// end

	// start
	sawsbuckite: {
		name: "Sawsbuckite",
		spritenum: 613,
		megaStone: "Sawsbuck-Mega",
		megaEvolves: "Sawsbuck",
		itemUser: ["Sawsbuck", "Sawsbuck-Summer", "Sawsbuck-Autumn", "Sawsbuck-Winter"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1206,
		gen: 9,
		desc: "If held by a Sawsbuck, this item allows it to Mega Evolve in battle.",
	},
	// end

	// start
	noctowlite: {
		name: "Noctowlite",
		spritenum: 622,
		megaStone: "Noctowl-Mega",
		megaEvolves: "Noctowl",
		itemUser: ["Noctowl"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1207,
		gen: 9,
		desc: "If held by a Noctowl, this item allows it to Mega Evolve in battle.",
	},
	// end

	// start
	haxorite: {
		name: "Haxorite",
		spritenum: 589,
		megaStone: "Haxorus-Mega",
		megaEvolves: "Haxorus",
		itemUser: ["Haxorus"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1208,
		gen: 9,
		desc: "If held by a Haxorus, this item allows it to Mega Evolve in battle.",
	},
	// end

	// start
	starvial: {
		name: "Star Vial",
		spritenum: 709,
		shortDesc: "If recharge, 50% healing. One time.",
		fling: {
			basePower: 80,
		},
		onUpdate(pokemon) {
			if ((pokemon.hp <= pokemon.maxhp / 2) && pokemon.volatiles['mustrecharge']) {
				pokemon.eatItem();
			}
		},
		onTryEatItem(item, pokemon) {
			if (!this.runEvent('TryHeal', pokemon, null, this.effect, pokemon.baseMaxhp / 2)) return false;
		},
		onEat(pokemon) {
			this.heal(pokemon.baseMaxhp / 2);
		},
		num: -1209,
		desc: "If recharge and user's HP is at 50% or below, it recovers 50% of its HP.",
	},
	// end

	// start
	chargeorb: {
		name: "Charge Orb",
		spritenum: 251,
		shortDesc: "Para user -> +1 SpD. One-time.",
		fling: {
			basePower: 30,
			status: 'par',
		},
		onResidualOrder: 28,
		onResidualSubOrder: 3,
		onResidual(pokemon) {
			if (pokemon.item === 'chargeorb') { // Check if the item is still Charge Orb
				this.boost({ spd: 1 }); // Increase user's SpD by 1 stage
			
				if (!pokemon.hasType('Ground')) { // Electric Pokemon cannot be paralyzed anyways
					pokemon.trySetStatus('par', pokemon); // Attempt to paralyze the holder
				}
				this.add('-activate', pokemon, 'item: Charge Orb'); // Notify activation
				pokemon.useItem(); // "Consume" the item*/
				/*const success = pokemon.trySetStatus('par', pokemon);
				if (success) { // If paralysis was successful
					this.boost({ spd: 1 }); // Increase user's SpD by 1 stage
					pokemon.useItem();
				}*/
			}
		},
		num: -1210,
		desc: "Paralyzes non Ground-type holder. Grants +1 SpD. One-time use.",
	},
	// end

	protonema: {
		name: "Protonema",
		spritenum: 595,
		shortDesc: "+ Grass type in Grassy Terrain. Consumable.",
		fling: {
			basePower: 30,
		},
		onStart(pokemon) {
			if (!pokemon.ignoringItem() && this.field.isTerrain('grassyterrain') && !pokemon.hasType('Grass')) {
				if (pokemon.types.length < 3) { // Adjusted to allow for one additional type
					pokemon.types = [...pokemon.types, 'Grass'];
					this.add('-start', pokemon, 'typeadd', 'Grass', '[from] Item: Protonema');
					pokemon.useItem();
				}
			}
		},
		onTerrainChange(pokemon) {
			if (this.field.isTerrain('grassyterrain') && !pokemon.hasType('Grass')) {
				if (pokemon.types.length < 3) { // Adjusted to allow for one additional type
					pokemon.types = [...pokemon.types, 'Grass'];
					this.add('-start', pokemon, 'typeadd', 'Grass', '[from] Item: Protonema');
					pokemon.useItem();
				}
			}
		},
		num: -1211,
		desc: "If Grassy Terrain is active, user gains additional Grass-type. Consumable.",
	},

	powerunit: {
		name: "Power Unit",
		spritenum: 745,
		shortDesc: "Starforce users: recharge -> omni stat boost.",
		fling: {
			basePower: 30,
		},
		/*onStart() {
			this.effectState.started = true;
		},
		onUpdate(pokemon) {
			if (!this.effectState.started || pokemon.transformed) return;
			if (this.queue.peek(true)?.choice === 'runSwitch') return;
		},*/
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (!this.field.getPseudoWeather('gravity') && pokemon.volatiles['mustrecharge'] && pokemon.hasAbility('starforce') && pokemon.useItem()) {
				this.boost({atk: 1, def: 1, spa: 1, spd: 1, spe: 1}, pokemon);
			}
		},
		num: -1212,
		desc: "If a Star Force user must recharge and Gravity isn't active, it gains an omni stat boost.",
	},
	blacktome: {
		name: "Black Tome",
		spritenum: 110,
		shortDesc: "50% damage reduction at or below 50% HP.",
		fling: {
			basePower: 60,
		},
		onDamage(damage, target, source, effect) {
			if (target.baseSpecies.baseSpecies === 'Al-Ghulazam') {
				if (target.hp <= target.maxhp / 2) {
					this.debug('Black Tome damage reduction');
					return this.chainModify(0.5);
				}
			}
		},
		itemUser: ["Al-Ghulazam"],
		num: -1213,
		desc: "Al-Ghulazam receives 50% less damage once its HP is at or below 50%.",
	},
	//
	/*// inspired by Split System abiliy from Alternatium X
	splitcore: {
		name: "Split Core",
		spritenum: 110,
		shortDesc: "Old Gen physical/special split. 20% boost.",
		fling: {
			basePower: 60,
		},
		onModifyMove(move) {
			const originalCategory = move.category; // New line
			switch (move.type) {
				case 'Grass':
				case 'Fire':
				case 'Water':
				case 'Ice':
				case 'Electric':
				case 'Psychic':
				case 'Dragon':
				case 'Dark':
					move.category = 'Special';
					break;
				case 'Bug':
				case 'Ghost':
				case 'Poison':
				case 'Ground':
				case 'Rock':
				case 'Fighting':
				case 'Normal':
				case 'Flying':
				case 'Steel':
				case 'Fairy':
					move.category = 'Physical';
					break;
			}
			// New line
			// Apply 20% boost only if the category has changed
			if (move.category !== originalCategory) {
				move.basePower = Math.floor(move.basePower * 1.2);
				this.add('-message', `Split Core boosted ${move.name}'s power!`);
			}
		},
	//	itemUser: ["Gigan"],
		num: -1214,
		desc: "Old Gen physical / special split. Fairy is physical. + 20% damage boost if move category changed.",
	},*/
	/*stellarcore: {
		name: "Stellar Core",
		spritenum: 709,
		shortDesc: "Starforce users: Counterbalance, consumable.",
		fling: {
			basePower: 80,
		},
		onAfterBoost(boost, target, source, effect) {
			if (!boost || effect.id === 'stellarcore') return;
			let activated = false;
			const stellarcoreBoost: SparseBoostsTable = {};
			if (boost.spa) {
				stellarcoreBoost.atk = -1 * boost.spa;
				activated = true;
			}
			if (boost.spd) {
				stellarcoreBoost.def = -1 * boost.spd;
				activated = true;
			}
			if (boost.atk) {
				stellarcoreBoost.spa = -1 * boost.atk;
				activated = true;
			}
			if (boost.def) {
				stellarcoreBoost.spd = -1 * boost.def;
				activated = true;
			}
			if (activated === true) {
				this.add('-item', target, 'Stellar Core');
				this.boost(stellarcoreBoost, target, target, null, true);
				target.setItem(''); // Consume the item
			}
		},
		num: -1215,
		desc: "If user's Atk is lowered, its SpA is raised, and vice versa. Same with Def and SpD.",
	},
	// end*/
	matokodium: {
		name: "Matokodium",
		spritenum: 613,
		megaStone: "Matokoda-Ascend",
		megaEvolves: "Matokoda",
		itemUser: ["Matokoda"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		onUpdate(pokemon) {
			if (!pokemon.side.sideConditions['lzstartersystemtrigger']) {
				// list
			//	if (pokemon.side.sideConditions['matokodiumtrigger']) {
			//		return;
			//	}
				if (pokemon.species.name === 'Matokoda-Ascend') {
					pokemon.side.addSideCondition('lzstartersystemtrigger');
					this.add('-sidestart', pokemon.side, 'Matokodium');
					this.add('-anim', pokemon, "Geomancy");
					this.add('-message', `The Matokodium has been activated on ${pokemon.side.name}'s side! System effects are now suppressed.`);
				}
			}
		},
		onAfterMega(pokemon) {
			if (pokemon.species.name === 'Matokoda-Ascend' && !pokemon.types.includes('Normal')) {
				pokemon.types = [...pokemon.types, 'Normal'];
				// Notify the game about the new type
				this.add('-start', pokemon, 'typeadd', '[from] item: Matokodium');
				this.add('-anim', pokemon, 'Geomancy');
				this.add('-message', `${pokemon.name} is imbued with spiritual energy!`);
			}			
		},
		onStart(pokemon) {
			if (pokemon.species.name === 'Matokoda-Ascend' && !pokemon.types.includes('Normal')) {
				pokemon.types = [...pokemon.types, 'Normal'];
				// Notify the game about the new type
				this.add('-start', pokemon, 'typeadd', '[from] item: Matokodium');
				this.add('-anim', pokemon, 'Geomancy');
				this.add('-message', `${pokemon.name} is imbued with spiritual energy!`);
			}			
		},
		num: -1220,
		gen: 9,
		desc: "If held by a Matokoda, this item allows it to Ascend in battle.",
	},
	// Piahchi, num: -1221
	piahchium: {
		name: "Piahchium",
		spritenum: 613,
		megaStone: "Piahchi-Ascend",
		megaEvolves: "Piahchi",
		itemUser: ["Piahchi"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		onUpdate(pokemon) {
			if (!pokemon.side.sideConditions['lzstartersystemtrigger']) {
				// list
			//	if (pokemon.side.sideConditions['matokodiumtrigger']) {
			//		return;
			//	}
				if (pokemon.species.name === 'Piahchi-Ascend') {
					pokemon.side.addSideCondition('lzstartersystemtrigger');
					this.add('-sidestart', pokemon.side, 'Piahchium');
					this.add('-anim', pokemon, "Geomancy");
					this.add('-message', `The Piahchium has been activated on ${pokemon.side.name}'s side! System effects are now suppressed.`);
				}
			}
		},
		onAfterMega(pokemon) {
			if (pokemon.species.name === 'Piahchi-Ascend' && !pokemon.types.includes('Normal')) {
				pokemon.types = [...pokemon.types, 'Normal'];
				// Notify the game about the new type
				this.add('-start', pokemon, 'typeadd', '[from] item: Piahchium');
				this.add('-anim', pokemon, 'Geomancy');
				this.add('-message', `${pokemon.name} is imbued with spiritual energy!`);
			}			
		},
		onStart(pokemon) {
			if (pokemon.species.name === 'Piahchi-Ascend' && !pokemon.types.includes('Normal')) {
				pokemon.types = [...pokemon.types, 'Normal'];
				// Notify the game about the new type
				this.add('-start', pokemon, 'typeadd', '[from] item: Piahchium');
				this.add('-anim', pokemon, 'Geomancy');
				this.add('-message', `${pokemon.name} is imbued with spiritual energy!`);
			}			
		},
		num: -1221,
		gen: 9,
		desc: "If held by a Piahchi, this item allows it to Ascend in battle.",
	},
	// Zantui, num: -1222
	zantium: {
		name: "Zantium",
		spritenum: 613,
		megaStone: "Zantui-Ascend",
		megaEvolves: "Zantui",
		itemUser: ["Zantui"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		onUpdate(pokemon) {
			if (!pokemon.side.sideConditions['lzstartersystemtrigger']) {
				// list
			//	if (pokemon.side.sideConditions['matokodiumtrigger']) {
			//		return;
			//	}
				if (pokemon.species.name === 'Zantui-Ascend') {
					pokemon.side.addSideCondition('lzstartersystemtrigger');
					this.add('-sidestart', pokemon.side, 'Zantium');
					this.add('-anim', pokemon, "Geomancy");
					this.add('-message', `The Zantium has been activated on ${pokemon.side.name}'s side! System effects are now suppressed.`);
				}
			}
		},
		onAfterMega(pokemon) {
			if (pokemon.species.name === 'Zantui-Ascend' && !pokemon.types.includes('Normal')) {
				pokemon.types = [...pokemon.types, 'Normal'];
				// Notify the game about the new type
				this.add('-start', pokemon, 'typeadd', '[from] item: Zantium');
				this.add('-anim', pokemon, 'Geomancy');
				this.add('-message', `${pokemon.name} is imbued with spiritual energy!`);
			}			
		},
		onStart(pokemon) {
			if (pokemon.species.name === 'Zantui-Ascend' && !pokemon.types.includes('Normal')) {
				pokemon.types = [...pokemon.types, 'Normal'];
				// Notify the game about the new type
				this.add('-start', pokemon, 'typeadd', '[from] item: Zantium');
				this.add('-anim', pokemon, 'Geomancy');
				this.add('-message', `${pokemon.name} is imbued with spiritual energy!`);
			}			
		},
		num: -1222,
		gen: 9,
		desc: "If held by a Zantui, this item allows it to Ascend in battle.",
	},
	// Arbarnacle, num: -1223
	// Spidraxis (removed), num: -1224
	// Dolorak, num: -1225
	dolorakium: {
		name: "Dolorakium",
		spritenum: 646,
		itemUser: ["Dolorak"],
		onTakeItem: false,
		num: -1225,
		desc: "All Pokémon gain +1 crit ratio.",
		 // Check if the item can be activated
		onUpdate(pokemon) {
			if (!pokemon.side.sideConditions['dolorakiumtrigger']) {
				// list
				if (pokemon.side.sideConditions['matokodiumtrigger']) {
					return;
				}
				if (pokemon.baseSpecies.baseSpecies === 'Dolorak') {
					pokemon.side.addSideCondition('dolorakiumtrigger');
					this.add('-sidestart', pokemon.side, 'Dolorakium');
					this.add('-anim', pokemon, "Geomancy");
					this.add('-message', `The Dolorakium has been activated on ${pokemon.side.name}'s side! All Pokémon gain +1 crit ratio.`);
				}
			}
		},
	},
	// Morthalume, num: -1226
	// Qwilinh, num: -1227
	qwilinhium: {
		name: "Qwilinhium",
		spritenum: 646,
		megaStone: "Qwilinh-Ascend",
		megaEvolves: "Qwilinh",
		itemUser: ["Qwilinh"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1227,
		desc: "Mega: Pokémon with stat drops take 25% less damage from a move.",
		 // Check if the item can be activated
		onUpdate(pokemon) {
			if (!pokemon.side.sideConditions['qwilinhiumtrigger']) {
				// list
				if (pokemon.side.sideConditions['matokodiumtrigger']) {
					return;
				}
				if (pokemon.species.name === 'Qwilinh-Ascend') {
					pokemon.side.addSideCondition('qwilinhiumtrigger');
					this.add('-sidestart', pokemon.side, 'Qwilinhium');
					this.add('-anim', pokemon, "Geomancy");
					this.add('-message', `The Qwilinhium has been activated on ${pokemon.side.name}'s side! Pokémon with stat drops take 25% less damage from a move.`);
				}
			}
		},
	},
	// Divortiscinia, num: -1228
	// Flygon, num: -1229
	// Sentinoyle, num: -1230
	sentinoylium: {
		name: "Sentinoylium",
		spritenum: 646,
		megaStone: "Sentinoyle-Ascend",
		megaEvolves: "Sentinoyle",
		itemUser: ["Sentinoyle"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1230,
		desc: "Mega: Pokémon can't raise their stats.",
		 // Check if the item can be activated
		onUpdate(pokemon) {
			if (!pokemon.side.sideConditions['sentinoyliumtrigger']) {
				// list
				if (pokemon.side.sideConditions['matokodiumtrigger']) {
					return;
				}
				if (pokemon.species.name === 'Sentinoyle-Ascend') {
					pokemon.side.addSideCondition('sentinoyliumtrigger');
					this.add('-sidestart', pokemon.side, 'Sentinoylium');
					this.add('-anim', pokemon, "Geomancy");
					this.add('-message', `The Sentinoylium has been activated on ${pokemon.side.name}'s side! Pokémon can't raise their stats.`);
				}
			}
		},
	},
	// Rampardos, num: -1231
	rampardium: {
		name: "Rampardium",
		spritenum: 646,
		itemUser: ["Rampardos"],
		onTakeItem: false,
		num: -1231,
		desc: "Pokémon do 25% more damage with a super effective move.",
		 // Check if the item can be activated
		onUpdate(pokemon) {
			if (!pokemon.side.sideConditions['rampardiumtrigger']) {
				// list
				if (pokemon.side.sideConditions['matokodiumtrigger']) {
					return;
				}
				if (pokemon.baseSpecies.baseSpecies === 'Rampardos') {
					pokemon.side.addSideCondition('rampardiumtrigger');
					this.add('-sidestart', pokemon.side, 'Rampardium');
					this.add('-anim', pokemon, "Geomancy");
					this.add('-message', `The Rampardium has been activated on ${pokemon.side.name}'s side! Pokémon do 25% more damage with a super effective move.`);
				}
			}
		},
	},
	// Bastiodon, num: -1232
	bastiodium: {
		name: "Bastiodium",
		spritenum: 646,
		itemUser: ["Bastiodon"],
		onTakeItem: false,
		num: -1232,
		desc: "Pokémon receive 25% less damage from a super effective move.",
		 // Check if the item can be activated
		onUpdate(pokemon) {
			if (!pokemon.side.sideConditions['bastiodiumtrigger']) {
				// list
				if (pokemon.side.sideConditions['matokodiumtrigger']) {
					return;
				}
				if (pokemon.baseSpecies.baseSpecies === 'Bastiodon') {
					pokemon.side.addSideCondition('bastiodiumtrigger');
					this.add('-sidestart', pokemon.side, 'Bastiodium');
					this.add('-anim', pokemon, "Geomancy");
					this.add('-message', `The Bastiodium has been activated on ${pokemon.side.name}'s side! Pokémon receive 25% less damage from a super effective move.`);
				}
			}
		},
	},
	// Oobamala, num: -1233
	// Fulgavis, num: -1234
	// Chiwengard, num: -1235
	chiwengardium: {
		name: "Chiwengardium",
		spritenum: 646,
		megaStone: "Chiwengard-Ascend",
		megaEvolves: "Chiwengard",
		itemUser: ["Chiwengard"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1235,
		desc: "Mega: Pokémon with stat drops take 25% less damage from a move.",
		 // Check if the item can be activated
		onUpdate(pokemon) {
			if (!pokemon.side.sideConditions['chiwengardiumtrigger']) {
				// list
				if (pokemon.side.sideConditions['matokodiumtrigger']) {
					return;
				}
				if (pokemon.species.name === 'Chiwengard-Ascend') {
					pokemon.side.addSideCondition('chiwengardiumtrigger');
					this.add('-sidestart', pokemon.side, 'Chiwengardium');
					this.add('-anim', pokemon, "Geomancy");
					this.add('-message', `The Chiwengardium has been activated on ${pokemon.side.name}'s side! Pokémon with stat drops take 25% less damage from a move.`);
				}
			}
		},
	},
	// Cthulauder, num: -1236
	cthulaudium: {
		name: "Cthulaudium",
		spritenum: 646,
		itemUser: ["Cthulauder"],
		onTakeItem: false,
		num: -1236,
		desc: "Non Dark Pokémon are under Torment effect.",
		 // Check if the item can be activated
		onUpdate(pokemon) {
			if (!pokemon.side.sideConditions['cthulaudiumtrigger']) {
				// list
				if (pokemon.side.sideConditions['matokodiumtrigger']) {
					return;
				}
				if (pokemon.baseSpecies.baseSpecies === 'Cthulauder') {
					pokemon.side.addSideCondition('cthulaudiumtrigger');
					this.add('-sidestart', pokemon.side, 'Cthulaudium');
					this.add('-anim', pokemon, "Geomancy");
					this.add('-message', `The Cthulaudium has been activated on ${pokemon.side.name}'s side! Non Dark Pokémon are under Torment effect.`);
				}
			}
		},
	},
	// Ursolastic, num: -1237
	// Urtidelene, num: -1238
	// Urxarigi, num: -1239
	// Urcrypbanys, num: -1240
	// Ursilkith, num: -1241
	// start: Type related Systems
	lpsystem: {
		name: "LP System",
		spritenum: 646,
		onTakeItem: false,
		num: -1242,
		desc: "Bug and Electric Pokémon recover 1/8 of their health and share half of it with the other when lowering a target's stat.",
		 // Check if the item can be activated
		onUpdate(pokemon) {
			if (!pokemon.side.sideConditions['lpsystemtrigger']) {
				// list
				if (pokemon.side.sideConditions['matokodiumtrigger']) {
					return;
				}
				if (pokemon.hasType('Bug') || pokemon.hasType('Electric')) {
					pokemon.side.addSideCondition('lpsystemtrigger');
					this.add('-sidestart', pokemon.side, 'LP System');
					this.add('-anim', pokemon, "Geomancy");
					this.add('-message', `The LP System has been activated on ${pokemon.side.name}'s side! Bug and Electric Pokémon recover 1/8 of their HP and share half of it with the other when lowering a target's stat.`);
				}
			}
		},
	},
	//
	hpsystem: {
		name: "HP System",
		spritenum: 646,
		onTakeItem: false,
		num: -1243,
		desc: "Fire and Water Pokémon burn target if dealing super effective damage.",
		 // Check if the item can be activated
		onUpdate(pokemon) {
			if (!pokemon.side.sideConditions['hpsystemtrigger']) {
				// list
				if (pokemon.side.sideConditions['matokodiumtrigger']) {
					return;
				}
				if (pokemon.hasType('Fire') || pokemon.hasType('Water')) {
					pokemon.side.addSideCondition('hpsystemtrigger');
					this.add('-sidestart', pokemon.side, 'HP System');
					this.add('-anim', pokemon, "Geomancy");
					this.add('-message', `The HP System has been activated on ${pokemon.side.name}'s side! Fire and Water Pokémon burn target if dealing super effective damage.`);
				}
			}
		},
	},
	//
	thirdeyesystem: {
		name: "Third Eye System",
		spritenum: 646,
		onTakeItem: false,
		num: -1244,
		desc: "Psychic and Normal Pokémon bypass immunity with their respective types.",
		 // Check if the item can be activated
		onUpdate(pokemon) {
			if (!pokemon.side.sideConditions['thirdeyesystemtrigger']) {
				// list
				if (pokemon.side.sideConditions['matokodiumtrigger']) {
					return;
				}
				if (pokemon.hasType('Psychic') || pokemon.hasType('Normal') || (pokemon.baseSpecies.name === 'Aegislash-Light' && 
					pokemon.hasType('Electric') && pokemon.hasType('Fighting'))) {
					pokemon.side.addSideCondition('thirdeyesystemtrigger');
					this.add('-sidestart', pokemon.side, 'Third Eye System');
					this.add('-anim', pokemon, "Geomancy");
					this.add('-message', `The Third Eye System has been activated on ${pokemon.side.name}'s side! Psychic and Normal Pokémon bypass immunity with their respective types.`);
				}
			}
		},
	},
	//
	mountainsystem: {
		name: "Mountain System",
		spritenum: 646,
		onTakeItem: false,
		num: -1245,
		desc: "Ice and Fighting Pokémon take half damage at or below 50% HP.",
		 // Check if the item can be activated
		onUpdate(pokemon) {
			if (!pokemon.side.sideConditions['mountainsystemtrigger']) {
				// list
				if (pokemon.side.sideConditions['matokodiumtrigger']) {
					return;
				}
				if (pokemon.hasType('Ice') || pokemon.hasType('Fighting')) {
					pokemon.side.addSideCondition('mountainsystemtrigger');
					this.add('-sidestart', pokemon.side, 'Mountain System');
					this.add('-anim', pokemon, "Geomancy");
					this.add('-message', `The Mountain System has been activated on ${pokemon.side.name}'s side! Ice and Fighting Pokémon take half damage at or below 50% HP.`);
				}
			}
		},
	},
	cursesystem: {
		name: "Curse System",
		spritenum: 646,
		onTakeItem: false,
		num: -1246,
		desc: "Ghost and Dark Pokémon do 1/8 chip damage and recover. Does not affect themselves.",
		 // Check if the item can be activated
		onUpdate(pokemon) {
			if (!pokemon.side.sideConditions['cursesystemtrigger']) {
				// list
				if (pokemon.side.sideConditions['matokodiumtrigger']) {
					return;
				}
				if (pokemon.hasType('Ghost') || pokemon.hasType('Dark')) {
					pokemon.side.addSideCondition('cursesystemtrigger');
					this.add('-sidestart', pokemon.side, 'Curse System');
					this.add('-anim', pokemon, "Geomancy");
					this.add('-message', `The Curse System has been activated on ${pokemon.side.name}'s side! Ghost and Dark Pokémon do 1/8 chip damage and recover. Does not affect themselves.`);
				}
			}
		},
	},
	ecosystem: {
		name: "Eco System",
		spritenum: 646,
		onTakeItem: false,
		num: -1247,
		desc: "Grass and Rock Pokémon cannot have their stats lowered by another Pokémon.",
		 // Check if the item can be activated
		onUpdate(pokemon) {
			if (!pokemon.side.sideConditions['ecosystemtrigger']) {
				// list
				if (pokemon.side.sideConditions['matokodiumtrigger']) {
					return;
				}
				if (pokemon.hasType('Grass') || pokemon.hasType('Rock')) {
					pokemon.side.addSideCondition('ecosystemtrigger');
					this.add('-sidestart', pokemon.side, 'Eco System');
					this.add('-anim', pokemon, "Geomancy");
					this.add('-message', `The Eco System has been activated on ${pokemon.side.name}'s side! Grass and Rock Pokémon can't have their stats lowered by another Pokémon.`);
				}
			}
		},
	},
	minesystem: {
		name: "Mine System",
		spritenum: 646,
		onTakeItem: false,
		num: -1248,
		desc: "Ground and Dragon Pokémon cannot be statused.",
		 // Check if the item can be activated
		onUpdate(pokemon) {
			if (!pokemon.side.sideConditions['minesystemtrigger']) {
				// list
				if (pokemon.side.sideConditions['matokodiumtrigger']) {
					return;
				}
				if (pokemon.hasType('Ground') || pokemon.hasType('Dragon')) {
					pokemon.side.addSideCondition('minesystemtrigger');
					this.add('-sidestart', pokemon.side, 'Mine System');
					this.add('-anim', pokemon, "Geomancy");
					this.add('-message', `The Mine System has been activated on ${pokemon.side.name}'s side! Ground and Dragon Pokémon can't be statused.`);
				}
			}
		},
	},
	hexsystem: {
		name: "Hex System",
		spritenum: 646,
		onTakeItem: false,
		num: -1249,
		desc: "Poison and Fairy Pokémon inflict Torment when attacked. No effect against themselves.",
		 // Check if the item can be activated
		onUpdate(pokemon) {
			if (!pokemon.side.sideConditions['hexsystemtrigger']) {
				// list
				if (pokemon.side.sideConditions['matokodiumtrigger']) {
					return;
				}
				if (pokemon.hasType('Poison') || pokemon.hasType('Fairy')) {
					pokemon.side.addSideCondition('hexsystemtrigger');
					this.add('-sidestart', pokemon.side, 'Hex System');
					this.add('-anim', pokemon, "Geomancy");
					this.add('-message', `The Hex System has been activated on ${pokemon.side.name}'s side! Poison and Fairy Pokémon inflict Torment when attacked. No effect against themselves.`);
				}
			}
		},
	},
	cloudsystem: {
		name: "Cloud System",
		spritenum: 646,
		onTakeItem: false,
		num: -1250,
		desc: "Flying and Steel Pokémon take half indirect damage and do 20% more damage with recoil moves.",
		 // Check if the item can be activated
		onUpdate(pokemon) {
			if (!pokemon.side.sideConditions['cloudsystemtrigger']) {
				// list
				if (pokemon.side.sideConditions['matokodiumtrigger']) {
					return;
				}
				if (pokemon.hasType('Flying') || pokemon.hasType('Steel')) {
					pokemon.side.addSideCondition('cloudsystemtrigger');
					this.add('-sidestart', pokemon.side, 'Cloud System');
					this.add('-anim', pokemon, "Geomancy");
					this.add('-message', `The Cloud System has been activated on ${pokemon.side.name}'s side! Flying and Steel Pokémon take half indirect damage and do 20% more damage with recoil moves.`);
				}
			}
		},
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
	magnetmodule: {
		name: "Magnet Module",
		spritenum: 273, // Magnet sprite
		fling: {
			basePower: 30,
		},
		num: -1024,
		desc: "Electric Terrain: 1/8 healing and item removal prevention for Electric, Rock or Steel.",
		onTakeItem(item, pokemon, source) {
            if ((pokemon.types.includes('Electric') || pokemon.types.includes('Rock') || pokemon.types.includes('Steel')) && this.field.isTerrain('electricterrain')) {
                return false; // Prevent item removal in Electric Terrain
            }
            return true; // Allow item removal otherwise
        },
		onResidualOrder: 26,
		onResidual(pokemon) {
			if ((pokemon.types.includes('Electric') || pokemon.types.includes('Rock') || pokemon.types.includes('Steel')) && this.field.isTerrain('electricterrain')) {
				this.heal(pokemon.baseMaxhp / 8);
			}
		},
	},

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

	// start, item update
	metalpowder: {
		name: "Metal Powder",
		fling: {
			basePower: 10,
		},
		spritenum: 287,
		onModifyDefPriority: 2,
		onModifyDef(def, pokemon) {
			if ((pokemon.species.name === 'Ditto' || pokemon.species.name === 'Dittobolo') && !pokemon.transformed) {
				return this.chainModify(2);
			}
		},
		itemUser: ["Ditto", "Dittobolo"],
		num: 257,
		gen: 2,
		isNonstandard: "Past",
	},
	quickpowder: {
		name: "Quick Powder",
		spritenum: 374,
		fling: {
			basePower: 10,
		},
		onModifySpe(spe, pokemon) {
			if ((pokemon.species.name === 'Ditto' || pokemon.species.name === 'Dittobolo') && !pokemon.transformed) {
				return this.chainModify(2);
			}
		},
		itemUser: ["Ditto", "Dittobolo"],
		num: 274,
		gen: 4,
		isNonstandard: "Past",
	},
	thickclub: {
		name: "Thick Club",
		spritenum: 491,
		fling: {
			basePower: 90,
		},
		onModifyAtkPriority: 1,
		onModifyAtk(atk, pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Cubone' || pokemon.baseSpecies.baseSpecies === 'Marowak' || pokemon.baseSpecies.baseSpecies === 'Zawkelder') {
				return this.chainModify(2);
			}
		},
		itemUser: ["Marowak", "Marowak-Alola", "Marowak-Alola-Totem", "Cubone", "Zawkelder"],
		num: 258,
		gen: 2,
		isNonstandard: "Past",
	},
	luckypunch: {
		name: "Lucky Punch",
		spritenum: 261,
		fling: {
			basePower: 40,
		},
		onModifyCritRatio(critRatio, user) {
			if (user.baseSpecies.name === 'Chansey' || user.baseSpecies.name === 'Lediastra') {
				return critRatio + 2;
			}
		},
		itemUser: ["Chansey", "Lediastra"],
		num: 256,
		gen: 2,
		isNonstandard: "Past",
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
		onModifyDamage(damage, source, target, move) {
			// Check if the source moves after the target
			if (!this.queue.willMove(target)) {
				this.debug('Zoom Lens boosting damage');
				return this.chainModify([4915, 4096]); // Increase damage by 20%
			}
		},
		num: 276,
		gen: 4,
	},
	// end


};
