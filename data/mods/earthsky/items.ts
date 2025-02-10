export const Items: {[itemid: string]: ModdedItemData} = {
	//New Items
	cursedjewel: {
		name: "Cursed Jewel",
		fling: {
			basePower: 40,
		},
		desc: "Holder's use of Midnight lasts 8 turns instead of 5.",
		num: 1001,
		rating: 3,
	},
	eggantberry: {
		name: "Eggant Berry",
		isBerry: true,
		consumable: true,
		naturalGift: {
			basePower: 70,
			type: "Steel",
		},
		onUpdate(pokemon) {
			if (pokemon.volatiles['attract']) {
				pokemon.eatItem();
			}
		},
		onEat(pokemon) {
			pokemon.removeVolatile('attract');
			this.add('-end', pokemon, 'move: Attract', '[from] item: Eggant Berry');
		},
		desc: "Cures infatuation. Single use.",
		num: 1019,
		rating: 1,
	},
	fireplaque: {
		name: "Fire Plaque",
		fling: {
			basePower: 50,
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, pokemon, target, move) {
			if (move.id === 'firepledge') {
				this.add('activate', pokemon, 'item: Fire Plaque');
				return this.chainModify(1.5);
			}
		},
		onModifyMove(move, pokemon) {
			if (move.id === 'grasspledge') {
				this.add('activate', pokemon, 'item: Fire Plaque');
				move.sideCondition = 'firepledge';
			}
			if (move.id === 'waterpledge') {
				this.add('activate', pokemon, 'item: Fire Plaque');
				move.self = {sideCondition: 'waterpledge'};
			}
		},
		desc: "If the holder uses Grass Pledge or Water Pledge, it will add the combination side effect of that Pledge. Increases the power of the holder's Fire Pledge by 50%.",
		shortDesc: "Grass/Water Pledge: Add side condition. Fire Pledge x1.5 base power.",
		num: 1017,
		rating: -1,
	},
	grassplaque: {
		name: "Grass Plaque",
		fling: {
			basePower: 50,
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, pokemon, target, move) {
			if (move.id === 'grasspledge') {
				this.add('activate', pokemon, 'item: Grass Plaque');
				return this.chainModify(1.5);
			}
		},
		onModifyMove(move, pokemon) {
			if (move.id === 'waterpledge') {
				this.add('activate', pokemon, 'item: Grass Plaque');
				move.sideCondition = 'grasspledge';
			}
			if (move.id === 'firepledge') {
				this.add('activate', pokemon, 'item: Grass Plaque');
				move.sideCondition = 'firepledge';
			}
		},
		desc: "If the holder uses Water Pledge or Fire Pledge, it will add the combination side effect of that Pledge. Increases the power of the holder's Grass Pledge by 50%.",
		shortDesc: "Water/Fire Pledge: Add side condition. Grass Pledge x1.5 base power.",
		num: 1016,
		rating: -1,
	},
	hopoberry: {
		name: "Hopo Berry",
		isBerry: true,
		consumable: true,
		naturalGift: {
			basePower: 80,
			type: "Fairy",
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
			moveSlot.pp += move.maxpp;
			this.add('-activate', pokemon, 'item: Hopo Berry', moveSlot.move, '[consumed]');
		},
		desc: "Restores all PP to the first of the holder's moves to reach 0 PP. Single use.",
		num: 1020,
	},
	koknuberry: {
		name: "Koknu Berry",
		isBerry: true,
		consumable: true,
		naturalGift: {
			basePower: 100,
			type: "Steel",
		},
		//onBeforeMovePriority: 10,
		onOverrideAction(pokemon) { //only event that happens before BeforeMove, which flinch has to be stopped before.
			if (pokemon.volatiles['flinch'] && pokemon.eatItem()) {
				pokemon.removeVolatile('flinch');
			}
		},
		onEat(pokemon) {
		},
		desc: "Cures flinching. Single use.",
		num: 1002,
	},
	meteorite: {
		name: "Meteorite",
		megaStone: "Rayquaza-Mega",
		megaEvolves: "Rayquaza",
		itemUser: ["Rayquaza"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		desc: "Evolves Minior into Prominoid if it is at least level 50. If held by a Rayquaza, this item allows it to Mega Evolve in battle, if it also knows the move Dragon Ascent.",
		shortDesc: "Evolves Minior. Must be held for Rayquaza to Mega Evolve in battle.",
		num: 1013,
	},
	waterplaque: {
		name: "Water Plaque",
		fling: {
			basePower: 50,
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, pokemon, target, move) {
			if (move.id === 'waterpledge') {
				this.add('activate', pokemon, 'item: Water Plaque');
				return this.chainModify(1.5);
			}
		},
		onModifyMove(move, pokemon) {
			if (move.id === 'firepledge') {
				this.add('activate', pokemon, 'item: Water Plaque');
				move.self = {sideCondition: 'waterpledge'};
			}
			if (move.id === 'grasspledge') {
				this.add('activate', pokemon, 'item: Water Plaque');
				move.sideCondition = 'grasspledge';
			}
		},
		desc: "If the holder uses Grass Pledge or Water Pledge, it will add the combination side effect of that Pledge. Increases the power of the holder's Water Pledge by 50%.",
		shortDesc: "Fire/Grass Pledge: Add side condition. Water Pledge x1.5 base power.",
		num: 1018,
		rating: -1,
	},
	butterfreenite: {
		name: "Butterfreenite",
		megaStone: "Butterfree-Mega",
		megaEvolves: "Butterfree",
		itemUser: ["Butterfree"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		desc: "If held by a Butterfree, this item allows it to Mega Evolve in battle.",
		num: 1003,
	},
	slowkinginite: {
		name: "Slowkinginite",
		megaStone: "Slowking-Mega",
		megaEvolves: "Slowking",
		itemUser: ["Slowking"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		desc: "If held by a Slowking, this item allows it to Mega Evolve in battle.",
		num: 1004,
	},
	torkoalite: {
		name: "Torkoalite",
		megaStone: "Torkoal-Mega",
		megaEvolves: "Torkoal",
		itemUser: ["Torkoal"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		desc: "If held by a Torkoal, this item allows it to Mega Evolve in battle.",
		num: 1005,
	},
	milotite: {
		name: "Milotite",
		megaStone: "Milotic-Mega",
		megaEvolves: "Milotic",
		itemUser: ["Milotic"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		desc: "If held by a Milotic, this item allows it to Mega Evolve in battle.",
		num: 1006,
	},
	electivirite: {
		name: "Electivirite",
		megaStone: "Electivire-Mega",
		megaEvolves: "Electivire",
		itemUser: ["Electivire"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		desc: "If held by an Electivire, this item allows it to Mega Evolve in battle.",
		num: 1007,
	},
	magmortarite: {
		name: "Magmortarite",
		megaStone: "Magmortar-Mega",
		megaEvolves: "Magmortar",
		itemUser: ["Magmortar"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		desc: "If held by a Magmortar, this item allows it to Mega Evolve in battle.",
		num: 1008,
	},
	garbodorite: {
		name: "Garbodorite",
		megaStone: "Garbodor-Mega",
		megaEvolves: "Garbodor",
		itemUser: ["Garbodor"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		desc: "If held by a Garbodor, this item allows it to Mega Evolve in battle.",
		num: 1009,
	},
	beheeyemite: {
		name: "Beheeyemite",
		megaStone: "Beheeyem-Mega",
		megaEvolves: "Beheeyem",
		itemUser: ["Beheeyem"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		desc: "If held by a Beheeyem, this item allows it to Mega Evolve in battle.",
		num: 1010,
	},
	sandacondite: {
		name: "Sandacondite",
		megaStone: "Sandaconda-Mega",
		megaEvolves: "Sandaconda",
		itemUser: ["Sandaconda"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		desc: "If held by a Sandaconda, this item allows it to Mega Evolve in battle.",
		num: 1011,
	},
	alcremite: {
		name: "Alcremite",
		megaStone: "Alcremie-Mega",
		megaEvolves: "Alcremie",
		itemUser: ["Alcremie"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		desc: "If held by an Alcremie, this item allows it to Mega Evolve in battle.",
		num: 1012,
	},
	froslassite: {
		name: "Froslassite",
		megaStone: "Froslass-Mega",
		megaEvolves: "Froslass",
		itemUser: ["Froslass"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		desc: "If held by a Froslass, this item allows it to Mega Evolve in battle.",
		num: 1014,
	},
	druddigonite: {
		name: "Druddigonite",
		megaStone: "Druddigon-Mega",
		megaEvolves: "Druddigon",
		itemUser: ["Druddigon"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		desc: "If held by a Druddigon, this item allows it to Mega Evolve in battle.",
		num: 1015,
	},
	ralitite: {
		name: "Ralitite",
		megaStone: "Ralie-Mega",
		megaEvolves: "Ralie",
		itemUser: ["Ralie"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 1019,
		desc: "If held by a Ralie, this item allows it to Mega Evolve in battle.",
	},
	pharoslassite: {
		name: "Pharoslassite",
		megaStone: "Pharoslass-Mega",
		megaEvolves: "Pharoslass",
		itemUser: ["Pharoslass"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 1020,
		desc: "If held by a Pharoslass, this item allows it to Mega Evolve in battle.",
	},
	//Edited items
	adrenalineorb: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (target.boosts['spe'] === 6) {
				return;
			}
			if (['Dark', 'Bug', 'Ghost'].includes(move.type) || (move.twoType && ['Dark', 'Bug', 'Ghost'].includes(move.twoType))) {
				target.useItem();
			}
		},
		onAfterBoost(boost, target, source, effect) {
			if (target.boosts['spe'] === 6) {
				return;
			}
			if (effect?.name === 'Intimidate' && boost.atk) {
				target.useItem();
			}
			if (effect?.name === 'Disturbance' && boost.spa) {
				target.useItem();
			}
		},
		consumable: true,
		desc: "This Pokemon's Speed is raised by 1 stage if hit by a Bug-, Dark-, or Ghost-type attack, or if an opposing Pokemon's Intimidate or Disturbance Ability affected this Pokemon. Single-use.",
		shortDesc: "+1 Speed if hit by a Bug/Dark/Ghost-type attack or Intimidate/Disturbance. Single use.",
	},
	aguavberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 70,
			type: "Dragon",
		},
		onEat(pokemon) {
			if (pokemon.getNature().minus === 'spd') {
				this.heal(pokemon.baseMaxhp * 0.5);
				pokemon.addVolatile('confusion');
			} else {
				this.heal(pokemon.baseMaxhp * 0.125);
			}
		},
		desc: "Restores 12.5% max HP at 1/4 max HP or less. If the Pokemon dislikes Bitter food (-Sp. Defense Nature), it restores 50% instead, but confuses. Single use.",
		shortDesc: "Heals 12.5% at 1/4 max HP; if -SpD Nature, it's 50%, but confuses. Single use.",
		rating: 2,
	},
	bignugget: {
		inherit: true,
		fling: {
			basePower: 130,
			flags: {bullet: 1},
		},
		shortDesc: "No in-battle effect. Projectile move when Flung.",
		desc: "A big nugget of pure gold that gives off a lustrous gleam. When Flung, counts as a projectile move.",
	},
	bigroot: {
		inherit: true,
		fling: {
			basePower: 20,
		},
		onTryHeal(damage, target, source, effect) {
			const heals = ['aquaring', 'dryskin', 'grassyterrain', 'icebody', 'ingrain', 'leechseed', 'poisonheal', 'raindish'];
			if (heals.includes(effect.id)) {
				return this.chainModify(1.5);
			}
		},
		shortDesc: "Holder gains 1.5x HP from passive healing.",
		desc: "Holder gains 1.5x HP from the passive healing provided by Aqua Ring, Ingrain, Leech Seed, Dry Skin, Rain Dish, Ice Body, Poison Heal, and Grassy Terrain.",
		rating: 2,
	},
	brightpowder: {
		name: "Bright Powder",
		spritenum: 51,
		consumable: true,
		fling: {
			basePower: 0,
			boosts: {accuracy: -2},
			flags: {powder: 1},
		},
		onFoeTryMove(source, target, move) {
			if (move.target === 'foeSide' || (move.target === 'all' && move.id !== 'perishsong')) {
				return;
			}
			if (move.priority > 0.1 && target.useItem())
			{
				this.add('activate', target, 'item: BrightPowder');
				if(!this.dex.getImmunity('powder', source)) return;
				this.attrLastMove('[still]');
				this.add('cant', source, 'item: BrightPowder', move, '[of] ' + target);
				return false;
			}
		},
		num: 213,
		rating: 3,
		gen: 2,
		desc: "Causes a priority move that targets the holder to fail, which consumes the item. The effect fails if the attacker is immune to powder moves, but the item is still consumed. When Flung, the target's accuracy is lowered 2 stages.",
		shortDesc: "Protects from an increased priority move. When Flung, -2 accuracy. Single use.",
		block: '#damp',
	},
	cornerstonemask: {
		name: "Cornerstone Mask",
		spritenum: 758,
		forcedForme: "Ogerpon-Cornerstone",
		itemUser: ["Ogerpon-Cornerstone"],
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Ogerpon') return false;
			return true;
		},
		num: 2406,
		gen: 9,
		desc: "Ogerpon holder gains Rock type, changes Hidden Move, Embody Aspect +1 Def.",
	},
	dragonscale: {
		inherit: true,
		onModifyDefPriority: 2,
		onModifyDef(def, pokemon) {
			return this.chainModify([0x1199, 0x1000]);
		},
		desc: "Holder's Defense is multiplied by 1.1x. Evolves Seadra into Kingdra and Burrorm into Burryrm when traded.",
		shortDesc: "Holder Defense is multiplied by 1.1x.",
		rating: 2,
		isNonstandard: null,
	},
	electirizer: {
		inherit: true,
		onAllyBasePowerPriority: 15,
		onAllyBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Electric' || (move.twoType && move.twoType === 'Electric')) {
				return this.chainModify([0x1199, 0x1000]);
			}
		},
		desc: "Holder and allies' Electric-type moves have 1.1x power. Evolves Electabuzz into Electivire when traded.",
		shortDesc: "Holder and allies' Electric-type moves have 1.1x power.",
		rating: 2,
	},
	figyberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 70,
			type: "Bug",
		},
		onEat(pokemon) {
			if (pokemon.getNature().minus === 'atk') {
				this.heal(pokemon.baseMaxhp * 0.5);
				pokemon.addVolatile('confusion');
			} else {
				this.heal(pokemon.baseMaxhp * 0.125);
			}
		},
		desc: "Restores 12.5% max HP at 1/4 max HP or less. If the Pokemon dislikes Spicy food (-Attack Nature), it restores 50% instead, but confuses. Single use.",
		shortDesc: "Heals 12.5% at 1/4 max HP; if -Atk Nature, it's 50%, but confuses. Single use.",
		rating: 2,
	},
	focusband: {
		inherit: true,
		consumable: true,
		fling: {
			basePower: 20,
		},
		onDamage(damage, target, source, effect) {
			const monMove = this.queue.willMove(target) ? this.queue.willMove(target).move : null;
			console.log(monMove);
			if (monMove && (monMove.priority < 0 || monMove.fractionalPriority < 0) && monMove.category !== 'Status' && 
			  damage >= target.hp && effect && effect.effectType === 'Move') {
				if(!target.itemState.activated) {
					this.add("-activate", target, "item: Focus Band");
					target.itemState.activated = true;
				}
				return target.hp - 1;
			}
		},
		onDamagingHit(damage, target, source){
			if(target.volatiles['focuspunch']?.lostFocus) {
				delete target.volatiles['focuspunch'].lostFocus;
				if(!target.itemState.activated) {
					this.add("-activate", target, "item: Focus Band");
					target.itemState.activated = true;
				}
			}
		},
		onAfterMoveSecondary(target, source, move) {
			if (target.itemState.activated) {
				target.useItem();
			}
		},
		shortDesc: "If holder uses <0 priority attack, survives KOes until move executes. Single use.",
		desc: "If the holder is using a damaging move with negative priority (including fractional priority) this turn, it will survive all attack that would KO it with 1 HP until it uses the move, and it will not lose focus on Focus Punch. Afterward, this item is consumed.",
	},
	fullincense: {
		name: "Full Incense",
		spritenum: 155,
		fling: {
			basePower: 20,
		},
		onAllyModifySpe(spe) {
			return this.chainModify(0.75);
		},
		num: 316,
		gen: 4,
		desc: "Reduces all allies' speed by 25%.",
	},
	hearthflamemask: {
		name: "Hearthflame Mask",
		spritenum: 760,
		forcedForme: "Ogerpon-Hearthflame",
		itemUser: ["Ogerpon-Hearthflame"],
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Ogerpon') return false;
			return true;
		},
		num: 2408,
		gen: 9,
		desc: "Ogerpon holder gains Fire type, changes Hidden Move, Embody Aspect +1 Atk.",
	},
	iapapaberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 70,
			type: "Dark",
		},
		onEat(pokemon) {
			if (pokemon.getNature().minus === 'spa') {
				this.heal(pokemon.baseMaxhp * 0.5);
				pokemon.addVolatile('confusion');
			} else {
				this.heal(pokemon.baseMaxhp * 0.125);
			}
		},
		desc: "Restores 12.5% max HP at 1/4 max HP or less. If the Pokemon dislikes Dry food (-Sp. Attack Nature), it restores 50% instead, but confuses. Single use.",
		shortDesc: "Heals 12.5% at 1/4 max HP; if -SpA Nature, it's 50%, but confuses. Single use.",
		rating: 2,
	},
	ironball: {
		name: "Iron Ball",
		spritenum: 224,
		fling: {
			basePower: 130,
			volatileStatus: 'smackdown',
			flags: {bullet: 1},
		},
		onStart(pokemon){
			pokemon.removeVolatile('magnetrise');
			pokemon.removeVolatile('telekinesis');
			pokemon.removeVolatile('risingchorus');
		},
		// other airborneness negation implemented in sim/pokemon.js:Pokemon#isGrounded and Pokemon#canFloat
		onModifySpe(spe) {
			return this.chainModify(0.5);
		},
		num: 278,
		gen: 4,
		rating: 1,
		desc: "The holder is grounded and cannot be made to float. The holder's Speed is halved. When Flung, grounds the target and counts as a projectile move.",
		shortDesc: "Holder is grounded, Speed halved. Grounds the target when Flung.",
	},
	jabocaberry: {
		inherit: true,
		consumable: true,
		onDamagingHit(damage, target, source, move) {
			if (move.category === 'Physical') {
				if (target.eatItem()) {
					this.damage(source.baseMaxhp / (target.hasAbility('ripen') ? 2 : 4), source, target);
				}
			}
		},
		desc: "If holder is hit by a physical move, attacker loses 1/4 of its max HP. Single use.",
		rating: 2,
	},
	laxincense: {
		name: "Lax Incense",
		spritenum: 240,
		fling: {
			basePower: 20,
		},
		num: 255,
		gen: 3,
		rating: 0,
		desc: "No competitive use.",
	},
	magmarizer: {
		inherit: true,
		onAllyBasePowerPriority: 15,
		onAllyBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Fire' || (move.twoType && move.twoType === 'Fire')) {
				return this.chainModify([0x1199, 0x1000]);
			}
		},
		desc: "Holder and allies' Fire-type moves have 1.1x power. Evolves Magmar into Magmortar when traded.",
		shortDesc: "Holder and allies' Fire-type moves have 1.1x power.",
		rating: 2,
	},
	magoberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 70,
			type: "Ghost",
		},
		onEat(pokemon) {
			if (pokemon.getNature().minus === 'spe') {
				this.heal(pokemon.baseMaxhp * 0.5);
				pokemon.addVolatile('confusion');
			} else {
				this.heal(pokemon.baseMaxhp * 0.125);
			}
		},
		desc: "Restores 12.5% max HP at 1/4 max HP or less. If the Pokemon dislikes Sweet food (-Speed Nature), it restores 50% instead, but confuses. Single use.",
		shortDesc: "Heals 12.5% at 1/4 max HP; if -Spe Nature, it's 50%, but confuses. Single use.",
		rating: 2,
	},
	metalpowder: {
		name: "Metal Powder",
		fling: {
			basePower: 0,
			boosts: {def: 1, spd: 1},
			flags: {powder: 1},
		},
		spritenum: 287,
		num: 257,
		gen: 2,
		desc: "When Flung, increases the target's Defense and Sp. Def stats by 1 stage. Fails if target is immune to powder.",
		shortDesc: "When Flung, +1 Def and Sp. Def. Counts as a powder move.",
		rating: 0,
	},
	micleberry: {
		inherit: true,
		consumable: true,
		condition: {
			duration: 2,
			onModifyMovePriority: -5,
			onModifyMove(move, pokemon) {
				this.add('-enditem', pokemon, 'Micle Berry');
				pokemon.removeVolatile('micleberry');
				move.accuracy = true;
				move.ignoreEvasion = true;
			},
		},
		desc: "Holder's next non-OHKO move never misses when at 1/4 max HP or less. Single use.",
		rating: 2,
	},
	muscleband: {
		name: "Muscle Band",
		spritenum: 297,
		fling: {
			basePower: 20,
		},
		onModifyAtkPriority: 2,
		onModifyAtk(atk, pokemon) {
			return this.chainModify([0x1199, 0x1000]);
		},
		num: 266,
		rating: 2,
		gen: 4,
		desc: "Holder's Attack is multiplied by 1.1x.",
	},
	/*nugget: {
		inherit: true,
		fling: {
			basePower: 80,
			flags: {bullet: 1},
		},
		shortDesc: "No in-battle effect. Projectile move when Flung.",
		desc: "A big nugget of pure gold that gives off a lustrous gleam. When Flung, counts as a projectile move.",
	},*/
	oddincense: {
		name: "Odd Incense",
		spritenum: 312,
		fling: {
			basePower: 20,
		},
		onAllyBasePowerPriority: 15,
		onAllyBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Psychic' || (move.twoType && move.twoType === 'Psychic')) {
				return this.chainModify([0x1199, 0x1000]);
			}
		},
		num: 314,
		gen: 4,
		rating: 2,
		desc: "Holder and allies' Psychic-type moves have 1.1x power.",
	},
	prismscale: {
		inherit: true,
		onModifySpDPriority: 2,
		onModifySpD(spd, pokemon) {
			return this.chainModify([0x1199, 0x1000]);
		},
		rating: 2,
		desc: "Holder's Sp. Defense is multiplied by 1.1x. Evolves Feebas into Milotic when traded.",
		shortDesc: "Holder Special Defense is multiplied by 1.1x.",
	},
	protector: {
		inherit: true,
		onDamage(damage, target, source, effect) {
			if (effect.id === 'recoil') {
				if (!this.activeMove) throw new Error("Battle.activeMove is null");
				if (this.activeMove.id !== 'struggle') return null;
			}
		},
		rating: 2,
		desc: "This Pokemon does not take recoil damage from regular moves such as Take Down. Struggle, crash damage, and moves that cost HP upon use such as Steel Beam will still apply. Evolves Rhydon into Rhyperior when traded.",
		shortDesc: "This Pokemon does not take standard recoil damage.",
	},
	quickpowder: {
		name: "Quick Powder",
		spritenum: 374,
		fling: {
			basePower: 0,
			boosts: {speed: 1},
			flags: {powder: 1},
		},
		num: 274,
		gen: 4,
		rating: 0,
		desc: "When Flung, increases the target's Speed by 1 stage. Fails if target is immune to powder.",
		shortDesc: "When Flung, +1 Speed. Counts as a powder move.",
	},
	reapercloth: {
		inherit: true,
		fling: {
			basePower: 20,
		},
		onAllyBasePowerPriority: 15,
		onAllyBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Ghost' || (move.twoType && move.twoType === 'Ghost')) {
				return this.chainModify([0x1199, 0x1000]);
			}
		},
		rating: 2,
		desc: "Holder and allies' Ghost-type moves have 1.1x power. Evolves Dusclops into Dusknoir when traded.",
		shortDesc: "Holder and allies' Ghost-type moves have 1.1x power.",
	},
	rockincense: {
		name: "Rock Incense",
		spritenum: 416,
		fling: {
			basePower: 20,
		},
		onAllyBasePowerPriority: 15,
		onAllyBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Rock' || (move.twoType && move.twoType === 'Rock')) {
				return this.chainModify([0x1199, 0x1000]);
			}
		},
		num: 315,
		rating: 2,
		gen: 4,
		desc: "Holder and allies' Rock-type moves have 1.1x power.",
	},
	roseincense: {
		name: "Rose Incense",
		spritenum: 419,
		fling: {
			basePower: 20,
		},
		onAllyBasePowerPriority: 15,
		onAllyBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Grass' || (move.twoType && move.twoType === 'Grass')) {
				return this.chainModify([0x1199, 0x1000]);
			}
		},
		num: 318,
		rating: 2,
		gen: 4,
		desc: "Holder and allies' Grass-type moves have 1.1x power.",
	},
	rowapberry: {
		inherit: true,
		consumable: true,
		onDamagingHit(damage, target, source, move) {
			if (move.category === 'Special') {
				if (target.eatItem()) {
					this.damage(source.baseMaxhp / (target.hasAbility('ripen') ? 2 : 4), source, target);
				}
			}
		},
		desc: "If holder is hit by a special move, attacker loses 1/4 of its max HP. Single use.",
		rating: 2,
	},
	sachet: {
		inherit: true,
		fling: {
			basePower: 20,
		},
		onAllyBasePowerPriority: 15,
		onAllyBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Fairy' || (move.twoType && move.twoType === 'Fairy')) {
				return this.chainModify([0x1199, 0x1000]);
			}
		},
		rating: 2,
		isNonstandard: null,
		desc: "Holder and allies' Fairy-type moves have 1.1x power. Evolves Spritzee into Aromatisse when traded.",
		shortDesc: "Holder and allies' Fairy-type moves have 1.1x power.",
	},
	seaincense: {
		name: "Sea Incense",
		spritenum: 430,
		fling: {
			basePower: 20,
		},
		onAllyBasePowerPriority: 15,
		onAllyBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Water' || (move.twoType && move.twoType === 'Water')) {
				return this.chainModify([0x1199, 0x1000]);
			}
		},
		num: 254,
		rating: 2,
		gen: 3,
		desc: "Holder and allies' Water-type moves have 1.1x power.",
	},
	shellbell: {
		inherit: true,
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (move.totalDamage && !pokemon.forceSwitchFlag) {
				this.heal(move.totalDamage / 5, pokemon);
			}
		},
		desc: "The user recovers 1/5 of the damage, rounded half up, dealt by each of its attacks. The healing occurs even if an attack hits a substitute.",
		shortDesc: "After an attack, holder gains 1/5 of the damage in HP dealt to other Pokemon.",
		rating: 2,
	},
	silverpowder: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move && (move.type === 'Bug' || (move.twoType && move.twoType === 'Bug'))) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		fling: {
			basePower: 0,
			flags: {powder: 1},
			volatileStatus: 'powder',
		},
		desc: "Holder's Bug-type attacks have 1.2x power. When Flung, applies Powder to the target, but fails if target is immune to powder attacks. Evolves Twintura into Silvurah when traded.",
		shortDesc: "Holder's Bug-type attacks 1.2x power; applies Powder when Flung.",
	},
	snowball: {
		inherit: true,
		fling: {
			basePower: 30,
			flags: {bullet: 1},
		},
  		consumable: true,
	  	onDamagingHit(damage, target, source, move) {
	  		if (move.type === 'Ice' || (move.twoType && move.twoType === 'Ice')) {
		  		target.useItem();
	  		}
		},
		boosts: {
			def: 1,
		},
		shortDesc: "Raises holder's Defense by 1 if hit by an Ice-type attack. Single use.",
		desc: "Raises holder's Defense by 1 if hit by an Ice-type attack. Single use. When Flung, counts as a projectile.",
	},
	starfberry: {
		inherit: true,
		consumable: true,
		onEat(pokemon) {
			const worstStat = pokemon.getWorstStat(true, true);
			this.boost({[worstStat]: 2}, pokemon);
		},
		desc: "Raises the lowest non-HP/accuracy stat (after boosts and modifiers) by 2 when at 1/4 max HP or less. Single-use.",
		shortDesc: "Raises lowest current stat (not HP/acc) by 2 when at <= 1/4 max HP. Single-use.",
	},
	ultranecroziumz: {
		name: "Ultranecrozium Z",
		spritenum: 687,
		onTakeItem(item, source) {
			if (item.itemUser === source.baseSpecies) return false;
			return true;
		},
		itemUser: ["Necrozma-Dusk-Mane", "Necrozma-Dawn-Wings", "Necrozma-Ultra"],
		num: 923,
		gen: 7,
		desc: "If held by Dusk Mane or Dawn Wings Necrozma, this item allows it to Ultra Burst in battle.",
	},
	waveincense: {
		name: "Wave Incense",
		spritenum: 531,
		fling: {
			basePower: 20,
		},
		onAnyTryMove(target, source, effect) {
			if (['eggbomb', 'explosion', 'mindblown', 'napalm', 'searingshot', 'selfdestruct', 'shelltrap'].includes(effect.id)) {
				this.attrLastMove('[still]');
				this.add('cant', target, 'item: Wave Incense', effect, '[of] ' + source);
				return false;
			}
		},
		onAnyDamage(damage, target, source, effect) {
			if (effect && effect.id === 'aftermath') {
				return false;
			}
		},
		num: 317,
		gen: 4,
		rating: 1,
		desc: "Prevents Egg Bomb, Explosion, Mind Blown, Napalm, Searing Shot, Self-Destruct, Shell Trap, and the Aftermath Ability from having an effect.",
		shortDesc: "Prevents explosion-based moves and Abilities.",
	},
	wellspringmask: {
		name: "Wellspring Mask",
		spritenum: 759,
		forcedForme: "Ogerpon-Wellspring",
		itemUser: ["Ogerpon-Wellspring"],
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Ogerpon') return false;
			return true;
		},
		num: 2407,
		gen: 9,
		desc: "Ogerpon holder gains Water type, changes Hidden Move, Embody Aspect +1 SpD.",
	},
	whippeddream: {
		inherit: true,
		onUpdate(pokemon) {
			if (pokemon.status === 'slp') {
				this.add('-activate', pokemon, 'item: Whipped Dream');
				pokemon.cureStatus();
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'slp') return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] item: Whipped Dream');
			}
			return false;
		},
		rating: 2,
		isNonstandard: null,
		desc: "Holder cannot fall asleep. Gaining this item while asleep cures it. Evolves Swirlix into Slurpuff when traded.",
		shortDesc: "Holder cannot fall asleep. Gaining this item while asleep cures it.",
	},
	wikiberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 70,
			type: "Rock",
		},
		onEat(pokemon) {
			if (pokemon.getNature().minus === 'def') {
				this.heal(pokemon.baseMaxhp * 0.5);
				pokemon.addVolatile('confusion');
			} else {
				this.heal(pokemon.baseMaxhp * 0.125);
			}
		},
		desc: "Restores 12.5% max HP at 1/4 max HP or less. If the Pokemon dislikes Sour food (-Defense Nature), it restores 50% instead, but confuses. Single use.",
		shortDesc: "Heals 12.5% at 1/4 max HP; if -Def Nature, it's 50%, but confuses. Single use.",
		rating: 2,
	},
	wiseglasses: {
		name: "Wise Glasses",
		spritenum: 539,
		fling: {
			basePower: 20,
		},
		onModifySpAPriority: 2,
		onModifySpA(spa, pokemon) {
			return this.chainModify([0x1199, 0x1000]);
		},
		num: 267,
		rating: 2,
		gen: 4,
		desc: "Holder's Sp. Attack is multiplied by 1.1x.",
	},
	/* Tera Shards */
	normalterashard: {
		name: "Normal Tera Shard",
		fling: {
			basePower: 30,
		},
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 1024) || pokemon.baseSpecies.num === 1024) {
				return false;
			}
			return true;
		},
		num: 1862,
		gen: 9,
		rating: 1,
		shortDesc: "Holder's Tera Blast is Normal-type.",
	},
	fireterashard: {
		name: "Fire Tera Shard",
		fling: {
			basePower: 30,
		},
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 1024) || pokemon.baseSpecies.num === 1024) {
				return false;
			}
			return true;
		},
		num: 1863,
		gen: 9,
		rating: 1,
		shortDesc: "Holder's Tera Blast is Fire-type.",
	},
	waterterashard: {
		name: "Water Tera Shard",
		fling: {
			basePower: 30,
		},
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 1024) || pokemon.baseSpecies.num === 1024) {
				return false;
			}
			return true;
		},
		num: 1864,
		gen: 9,
		rating: 1,
		shortDesc: "Holder's Tera Blast is Water-type.",
	},
	electricterashard: {
		name: "Electric Tera Shard",
		fling: {
			basePower: 30,
		},
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 1024) || pokemon.baseSpecies.num === 1024) {
				return false;
			}
			return true;
		},
		num: 1865,
		gen: 9,
		rating: 1,
		shortDesc: "Holder's Tera Blast is Electric-type.",
	},
	grassterashard: {
		name: "Grass Tera Shard",
		fling: {
			basePower: 30,
		},
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 1024) || pokemon.baseSpecies.num === 1024) {
				return false;
			}
			return true;
		},
		num: 1866,
		gen: 9,
		rating: 1,
		shortDesc: "Holder's Tera Blast is Grass-type.",
	},
	iceterashard: {
		name: "Ice Tera Shard",
		fling: {
			basePower: 30,
		},
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 1024) || pokemon.baseSpecies.num === 1024) {
				return false;
			}
			return true;
		},
		num: 1867,
		gen: 9,
		rating: 1,
		shortDesc: "Holder's Tera Blast is Ice-type.",
	},
	fightingterashard: {
		name: "Fighting Tera Shard",
		fling: {
			basePower: 30,
		},
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 1024) || pokemon.baseSpecies.num === 1024) {
				return false;
			}
			return true;
		},
		num: 1868,
		gen: 9,
		rating: 1,
		shortDesc: "Holder's Tera Blast is Fighting-type.",
	},
	poisonterashard: {
		name: "Poison Tera Shard",
		fling: {
			basePower: 30,
		},
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 1024) || pokemon.baseSpecies.num === 1024) {
				return false;
			}
			return true;
		},
		num: 1869,
		gen: 9,
		rating: 1,
		shortDesc: "Holder's Tera Blast is Poison-type.",
	},
	groundterashard: {
		name: "Ground Tera Shard",
		fling: {
			basePower: 30,
		},
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 1024) || pokemon.baseSpecies.num === 1024) {
				return false;
			}
			return true;
		},
		num: 1870,
		gen: 9,
		rating: 1,
		shortDesc: "Holder's Tera Blast is Ground-type.",
	},
	flyingterashard: {
		name: "Flying Tera Shard",
		fling: {
			basePower: 30,
		},
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 1024) || pokemon.baseSpecies.num === 1024) {
				return false;
			}
			return true;
		},
		num: 1871,
		gen: 9,
		rating: 1,
		shortDesc: "Holder's Tera Blast is Flying-type.",
	},
	psychicterashard: {
		name: "Psychic Tera Shard",
		fling: {
			basePower: 30,
		},
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 1024) || pokemon.baseSpecies.num === 1024) {
				return false;
			}
			return true;
		},
		num: 1872,
		gen: 9,
		rating: 1,
		shortDesc: "Holder's Tera Blast is Psychic-type.",
	},
	bugterashard: {
		name: "Bug Tera Shard",
		fling: {
			basePower: 30,
		},
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 1024) || pokemon.baseSpecies.num === 1024) {
				return false;
			}
			return true;
		},
		num: 1873,
		gen: 9,
		rating: 1,
		shortDesc: "Holder's Tera Blast is Bug-type.",
	},
	rockterashard: {
		name: "Rock Tera Shard",
		fling: {
			basePower: 30,
		},
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 1024) || pokemon.baseSpecies.num === 1024) {
				return false;
			}
			return true;
		},
		num: 1874,
		gen: 9,
		rating: 1,
		shortDesc: "Holder's Tera Blast is Rock-type.",
	},
	ghostterashard: {
		name: "Ghost Tera Shard",
		fling: {
			basePower: 30,
		},
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 1024) || pokemon.baseSpecies.num === 1024) {
				return false;
			}
			return true;
		},
		num: 1875,
		gen: 9,
		rating: 1,
		shortDesc: "Holder's Tera Blast is Ghost-type.",
	},
	dragonterashard: {
		name: "Dragon Tera Shard",
		fling: {
			basePower: 30,
		},
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 1024) || pokemon.baseSpecies.num === 1024) {
				return false;
			}
			return true;
		},
		num: 1876,
		gen: 9,
		rating: 1,
		shortDesc: "Holder's Tera Blast is Dragon-type.",
	},
	darkterashard: {
		name: "Dark Tera Shard",
		fling: {
			basePower: 30,
		},
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 1024) || pokemon.baseSpecies.num === 1024) {
				return false;
			}
			return true;
		},
		num: 1877,
		gen: 9,
		rating: 1,
		shortDesc: "Holder's Tera Blast is Dark-type.",
	},
	steelterashard: {
		name: "Steel Tera Shard",
		fling: {
			basePower: 30,
		},
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 1024) || pokemon.baseSpecies.num === 1024) {
				return false;
			}
			return true;
		},
		num: 1878,
		gen: 9,
		rating: 1,
		shortDesc: "Holder's Tera Blast is Steel-type.",
	},
	fairyterashard: {
		name: "Fairy Tera Shard",
		fling: {
			basePower: 30,
		},
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 1024) || pokemon.baseSpecies.num === 1024) {
				return false;
			}
			return true;
		},
		num: 1879,
		gen: 9,
		rating: 1,
		shortDesc: "Holder's Tera Blast is Fairy-type.",
	},
	stellarterashard: {
		name: "Stellar Tera Shard",
		fling: {
			basePower: 30,
		},
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 1024) || pokemon.baseSpecies.num === 1024) {
				return false;
			}
			return true;
		},
		num: 1862,
		gen: 9,
		rating: -1,
		shortDesc: "If held by a Terapagos, Tera Shift will transform it into its Stellar Form.",
	},
	/* Items edited as part of other elements */
	blueorb: {
		inherit: true,
		fling: {
			basePower: 60,
			flags: {bullet: 1},
		},
		onSwitchIn(pokemon) {
			if (pokemon.isActive && pokemon.baseSpecies.name === 'Kyogre' && !('magicroom' in this.field.pseudoWeather)) {
				this.queue.insertChoice({choice: 'runPrimal', pokemon: pokemon});
			}
		},
		isNonstandard: null,
	},
	redorb: {
		inherit: true,
		fling: {
			basePower: 60,
			flags: {bullet: 1},
		},
		onSwitchIn(pokemon) {
			if (pokemon.isActive && pokemon.baseSpecies.name === 'Groudon' && !('magicroom' in this.field.pseudoWeather)) {
				this.queue.insertChoice({choice: 'runPrimal', pokemon: pokemon});
			}
		},
		isNonstandard: null,
	},
	mirrorherb: {
		inherit: true,
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
			if(target.hasAbility('owntempo')){
				this.add('-activate', target, '[from] ability: Own Tempo');
				this.hint('Own Tempo blocks effects that steal or copy its attributes');
				return;
			}
			this.boost(boostPlus, pokemon);
		},
	},
	rockyhelmet: {
		name: "Rocky Helmet",
		spritenum: 417,
		fling: {
			basePower: 60,
		},
		onHitOrder: 2,
		onHit(target, source, move) {
			if (move.flags['contact']) {
				this.damage(source.baseMaxhp / 6, source, target);
			}
		},
		num: 540,
		rating: 3,
		gen: 5,
	},
	
	/* Items edited for dual-type moves */
	absorbbulb: {
		inherit: true,
		consumable: true,
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Water' || (move.twoType && move.twoType === 'Water')) {
				target.useItem();
			}
		},
	},
	buggem: {
		inherit: true,
		consumable: true,
		onPrepareHit(source, target, move) {
			if (target === source || move.category === 'Status') return;
			if (move && (move.type === 'Bug' || (move.twoType && move.twoType === 'Bug')) && source.useItem()) {
				source.addVolatile('gem');
			}
		},
		onSourceTryPrimaryHit(target, source, move) {},
		desc: "Holder's first Bug-type attack will have 1.3x power. Single use.",
		isNonstandard: null,
	},
	blackbelt: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move && (move.type === 'Fighting' || (move.twoType && move.twoType === 'Fighting'))) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
	},
	blackglasses: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move && (move.type === 'Dark' || (move.twoType && move.twoType === 'Dark'))) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
	},
	cellbattery: {
		inherit: true,
		consumable: true,
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Electric' || (move.twoType && move.twoType === 'Electric')) {
				target.useItem();
			}
		},
	},
	charcoal: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move && (move.type === 'Fire' || (move.twoType && move.twoType === 'Fire'))) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
	},
	darkgem: {
		inherit: true,
		consumable: true,
		onPrepareHit(source, target, move) {
			if (target === source || move.category === 'Status') return;
			if (move && (move.type === 'Dark' || (move.twoType && move.twoType === 'Dark')) && source.useItem()) {
				source.addVolatile('gem');
			}
		},
		onSourceTryPrimaryHit(target, source, move) {},
		desc: "Holder's first Dark-type attack will have 1.3x power. Single use.",
		isNonstandard: null,
	},
	dracoplate: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move && (move.type === 'Dragon' || (move.twoType && move.twoType === 'Dragon'))) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
	},
	dragonfang: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move && (move.type === 'Dragon' || (move.twoType && move.twoType === 'Dragon'))) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		desc: "Holder's Dragon-type attacks have 1.2x power. Evolves Gobellos into Dragobellos when traded.",
		shortDesc: "Holder's Dragon-type attacks have 1.2x power.",
	},
	dragongem: {
		inherit: true,
		consumable: true,
		onPrepareHit(source, target, move) {
			if (target === source || move.category === 'Status') return;
			if (move && (move.type === 'Dragon' || (move.twoType && move.twoType === 'Dragon')) && source.useItem()) {
				source.addVolatile('gem');
			}
		},
		onSourceTryPrimaryHit(target, source, move) {},
		desc: "Holder's first Dragon-type attack will have 1.3x power. Single use.",
		isNonstandard: null,
	},
	dreadplate: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move && (move.type === 'Dark' || (move.twoType && move.twoType === 'Dark'))) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
	},
	earthplate: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move && (move.type === 'Ground' || (move.twoType && move.twoType === 'Ground'))) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
	},
	electricgem: {
		inherit: true,
		consumable: true,
		onPrepareHit(source, target, move) {
			if (target === source || move.category === 'Status') return;
			if (move && (move.type === 'Electric' || (move.twoType && move.twoType === 'Electric')) && source.useItem()) {
				source.addVolatile('gem');
			}
		},
		onSourceTryPrimaryHit(target, source, move) {},
		desc: "Holder's first Electric-type attack will have 1.3x power. Single use.",
		isNonstandard: null,
	},
	fairygem: {
		inherit: true,
		consumable: true,
		onPrepareHit(source, target, move) {
			if (target === source || move.category === 'Status') return;
			if (move && (move.type === 'Fairy' || (move.twoType && move.twoType === 'Fairy')) && source.useItem()) {
				source.addVolatile('gem');
			}
		},
		onSourceTryPrimaryHit(target, source, move) {},
		desc: "Holder's first Fairy-type attack will have 1.3x power. Single use.",
		isNonstandard: null,
	},
	fightinggem: {
		inherit: true,
		consumable: true,
		onPrepareHit(source, target, move) {
			if (target === source || move.category === 'Status') return;
			if (move && (move.type === 'Fighting' || (move.twoType && move.twoType === 'Fighting')) && source.useItem()) {
				source.addVolatile('gem');
			}
		},
		onSourceTryPrimaryHit(target, source, move) {},
		desc: "Holder's first Fighting-type attack will have 1.3x power. Single use.",
		isNonstandard: null,
	},
	firegem: {
		inherit: true,
		consumable: true,
		onPrepareHit(source, target, move) {
			if (target === source || move.category === 'Status') return;
			if (move && (move.type === 'Fire' || (move.twoType && move.twoType === 'Fire')) && source.useItem()) {
				source.addVolatile('gem');
			}
		},
		onSourceTryPrimaryHit(target, source, move) {},
		desc: "Holder's first Fire-type attack will have 1.3x power. Single use.",
		isNonstandard: null,
	},
	flameplate: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move && (move.type === 'Fire' || (move.twoType && move.twoType === 'Fire'))) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
	},
	flyinggem: {
		inherit: true,
		consumable: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status') return;
			if ((move.type === 'Flying' || (move.twoType && move.twoType === 'Flying')) && source.useItem()) {
				source.addVolatile('gem');
			}
		},
		desc: "Holder's first Flying-type attack will have 1.3x power. Single use.",
		isNonstandard: null,
	},
	ghostgem: {
		inherit: true,
		consumable: true,
		onPrepareHit(source, target, move) {
			if (target === source || move.category === 'Status') return;
			if (move && (move.type === 'Ghost' || (move.twoType && move.twoType === 'Ghost')) && source.useItem()) {
				source.addVolatile('gem');
			}
		},
		onSourceTryPrimaryHit(target, source, move) {},
		desc: "Holder's first Ghost-type attack will have 1.3x power. Single use.",
		isNonstandard: null,
	},
	grassgem: {
		inherit: true,
		consumable: true,
		onPrepareHit(source, target, move) {
			if (target === source || move.category === 'Status') return;
			if (move && (move.type === 'Grass' || (move.twoType && move.twoType === 'Grass')) && source.useItem()) {
				source.addVolatile('gem');
			}
		},
		onSourceTryPrimaryHit(target, source, move) {},
		desc: "Holder's first Grass-type attack will have 1.3x power. Single use.",
		isNonstandard: null,
	},
	groundgem: {
		inherit: true,
		consumable: true,
		onPrepareHit(source, target, move) {
			if (target === source || move.category === 'Status') return;
			if (move && (move.type === 'Ground' || (move.twoType && move.twoType === 'Ground')) && source.useItem()) {
				source.addVolatile('gem');
			}
		},
		onSourceTryPrimaryHit(target, source, move) {},
		desc: "Holder's first Ground-type attack will have 1.3x power. Single use.",
		isNonstandard: null,
	},
	hardstone: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move && (move.type === 'Rock' || (move.twoType && move.twoType === 'Rock'))) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
	},
	icegem: {
		inherit: true,
		consumable: true,
		onPrepareHit(source, target, move) {
			if (target === source || move.category === 'Status') return;
			if (move && (move.type === 'Ice' || (move.twoType && move.twoType === 'Ice')) && source.useItem()) {
				source.addVolatile('gem');
			}
		},
		onSourceTryPrimaryHit(target, source, move) {},
		desc: "Holder's first Ice-type attack will have 1.3x power. Single use.",
		isNonstandard: null,
	},
	icicleplate: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move && (move.type === 'Ice' || (move.twoType && move.twoType === 'Ice'))) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
	},
	insectplate: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move && (move.type === 'Bug' || (move.twoType && move.twoType === 'Bug'))) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
	},
	ironplate: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move && (move.type === 'Steel' || (move.twoType && move.twoType === 'Steel'))) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
	},
	luminousmoss: {
		inherit: true,
		consumable: true,
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Water' || (move.twoType && move.twoType === 'Water')) {
				target.useItem();
			}
		},
	},
	magnet: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move && (move.type === 'Electric' || (move.twoType && move.twoType === 'Electric'))) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
	},
	meadowplate: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move && (move.type === 'Grass' || (move.twoType && move.twoType === 'Grass'))) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
	},
	metalcoat: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move && (move.type === 'Steel' || (move.twoType && move.twoType === 'Steel'))) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		desc: "Holder's Steel-type attacks have 1.2x power. Evolves Onix into Steelix, Scyther into Scizor, and Plecuum into Vorplec when traded.",
		shortDesc: "Holder's Steel-type attacks have 1.2x power.",
	},
	mindplate: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move && (move.type === 'Psychic' || (move.twoType && move.twoType === 'Psychic'))) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
	},
	miracleseed: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move && (move.type === 'Grass' || (move.twoType && move.twoType === 'Grass'))) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
	},
	mysticwater: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move && (move.type === 'Water' || (move.twoType && move.twoType === 'Water'))) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
	},
	nevermeltice: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move && (move.type === 'Ice' || (move.twoType && move.twoType === 'Ice'))) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
	},
	normalgem: {
		inherit: true,
		consumable: true,
		onPrepareHit(source, target, move) {
			if (target === source || move.category === 'Status') return;
			if (move && (move.type === 'Normal' || (move.twoType && move.twoType === 'Normal')) && source.useItem()) {
				source.addVolatile('gem');
			}
		},
		onSourceTryPrimaryHit(target, source, move) {},
		desc: "Holder's first Normal-type attack will have 1.3x power. Single use.",
	},
	pixieplate: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move && (move.type === 'Fairy' || (move.twoType && move.twoType === 'Fairy'))) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
	},
	poisonbarb: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move && (move.type === 'Poison' || (move.twoType && move.twoType === 'Poison'))) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		desc: "Holder's Poison-type attacks have 1.2x power. Evolves Monutra into Twintura when held and leveled up.",
		shortDesc: "Holder's Poison-type attacks have 1.2x power.",
	},
	poisongem: {
		inherit: true,
		consumable: true,
		onPrepareHit(source, target, move) {
			if (target === source || move.category === 'Status') return;
			if (move && (move.type === 'Poison' || (move.twoType && move.twoType === 'Poison')) && source.useItem()) {
				source.addVolatile('gem');
			}
		},
		onSourceTryPrimaryHit(target, source, move) {},
		desc: "Holder's first Poison-type attack will have 1.3x power. Single use.",
		isNonstandard: null,
	},
	psychicgem: {
		inherit: true,
		consumable: true,
		onPrepareHit(source, target, move) {
			if (target === source || move.category === 'Status') return;
			if (move && (move.type === 'Psychic' || (move.twoType && move.twoType === 'Psychic')) && source.useItem()) {
				source.addVolatile('gem');
			}
		},
		onSourceTryPrimaryHit(target, source, move) {},
		desc: "Holder's first Psychic-type attack will have 1.3x power. Single use.",
		isNonstandard: null,
	},
	rockgem: {
		inherit: true,
		consumable: true,
		onPrepareHit(source, target, move) {
			if (target === source || move.category === 'Status') return;
			if (move && (move.type === 'Rock' || (move.twoType && move.twoType === 'Rock')) && source.useItem()) {
				source.addVolatile('gem');
			}
		},
		onSourceTryPrimaryHit(target, source, move) {},
		desc: "Holder's first Rock-type attack will have 1.3x power. Single use.",
		isNonstandard: null,
	},
	sharpbeak: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move && (move.type === 'Flying' || (move.twoType && move.twoType === 'Flying'))) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
	},
	shedshell: {
		inherit: true,
		fling: {
			basePower: 20,
		},
		onTrapPokemon(pokemon) {
			if(!pokemon.volatiles['meanlooked']){
				pokemon.trapped = false;
			}
		},
	},
	silkscarf: {
		inherit: true,
		fling: {
			basePower: 20,
		},
		onBasePower(basePower, user, target, move) {
			if (move && (move.type === 'Normal' || (move.twoType && move.twoType === 'Normal'))) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
	},
	skyplate: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move && (move.type === 'Flying' || (move.twoType && move.twoType === 'Flying'))) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
	},
	softsand: {
		inherit: true,
		fling: {
			basePower: 20,
		},
		onBasePower(basePower, user, target, move) {
			if (move && (move.type === 'Ground' || (move.twoType && move.twoType === 'Ground'))) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
	},
	spelltag: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move && (move.type === 'Ghost' || (move.twoType && move.twoType === 'Ghost'))) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
	},
	splashplate: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move && (move.type === 'Water' || (move.twoType && move.twoType === 'Water'))) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
	},
	spookyplate: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move && (move.type === 'Ghost' || (move.twoType && move.twoType === 'Ghost'))) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
	},
	steelgem: {
		inherit: true,
		consumable: true,
		onPrepareHit(source, target, move) {
			if (target === source || move.category === 'Status') return;
			if (move && (move.type === 'Steel' || (move.twoType && move.twoType === 'Steel')) && source.useItem()) {
				source.addVolatile('gem');
			}
		},
		onSourceTryPrimaryHit(target, source, move) {},
		desc: "Holder's first Steel-type attack will have 1.3x power. Single use.",
		isNonstandard: null,
	},
	stoneplate: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move && (move.type === 'Rock' || (move.twoType && move.twoType === 'Rock'))) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
	},
	toxicplate: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move && (move.type === 'Poison' || (move.twoType && move.twoType === 'Poison'))) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
	},
	twistedspoon: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move && (move.type === 'Psychic' || (move.twoType && move.twoType === 'Psychic'))) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
	},
	watergem: {
		inherit: true,
		consumable: true,
		onPrepareHit(source, target, move) {
			if (target === source || move.category === 'Status') return;
			if (move && (move.type === 'Water' || (move.twoType && move.twoType === 'Water')) && source.useItem()) {
				source.addVolatile('gem');
			}
		},
		onSourceTryPrimaryHit(target, source, move) {},
		desc: "Holder's first Water-type attack will have 1.3x power. Single use.",
		isNonstandard: null,
	},
	zapplate: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move && (move.type === 'Electric' || (move.twoType && move.twoType === 'Electric'))) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
	},
	/* Misc. changes related to other elements */
	airballoon: {
		inherit: true,
		consumable: true,
		onDamagingHit(damage, target, source, move) {
			this.add('-enditem', target, 'Air Balloon');
			target.lastItem = target.item;
			target.item = '';
			target.itemData = {id: '', target};
			this.runEvent('AfterUseItem', target, null, null, this.dex.items.get('airballoon'));
		},
		onAfterSubDamage(damage, target, source, effect) {
			this.debug('effect: ' + effect.id);
			if (effect.effectType === 'Move') {
				this.add('-enditem', target, 'Air Balloon');
				target.lastItem = target.item;
				target.item = '';
				target.itemData = {id: '', target};
				this.runEvent('AfterUseItem', target, null, null, this.dex.items.get('airballoon'));
			}
		},
		shortDesc: "Holder gains floating status. Pops when hit.",
		desc: "The holder becomes immune to Ground-type attacks, Arena Trap, and entry hazards other than Stealth Rock. The holder will not benefit from Terrain, and the moves Dig, Dive, Roost, and Ingrain will fail. The balloon pops when hit. This item has no effect when held by Diglett, Dugtrio, Sandygast, Palossand, Wiglett, Wugtrio, Burrorm, Burryrm, Dorsoil, or Colossoil.",
	},
	bindingband: {
		inherit: true,
		desc: "Holder's binding moves deal 1/6 or 1/3 max HP per turn instead of 1/8 or 1/4.",
	},
	gripclaw: {
		inherit: true,
		desc: "If the holder uses a move that traps or binds for more than a single turn (excluding the turn of use), its duration is extended. Trapping and binding last six turns instead of four, and strong binding lasts three turns instead of two.",
		shortDesc: "Holder's trap/binding lasts 6 turns, strong bind lasts 3 turns.",
	},
	heavydutyboots: {
		inherit: true,
		onEntryHazard(pokemon) {
			return null;
		},
	},
	leek: {
		inherit: true,
		onModifyCritRatio(critRatio, user) {
			if (["farfetchd", "sirfetchd", "kendono"].includes(this.toID(user.baseSpecies.baseSpecies))) {
				return critRatio + 2;
			}
		},
		itemUser: ["Farfetch\u2019d", "Sirfetch\u2019d", "Farfetch\u2019d-Galar", "Kendo\u2019no"],
		isNonstandard: null,
		desc: "If held by a Farfetch’d, Sirfetch’d, or Kendo'no, its critical hit ratio is raised by 2 stages.",
		shortDesc: "If held by a Farfetch’d family member, its critical hit ratio is raised by 2 stages.",
	},
	machobrace: {
		inherit: true,
		ignoreKlutz: false,
		isNonstandard: null,
		desc: "Holder's Speed is halved.",
	},
	poweranklet: {
		inherit: true,
		ignoreKlutz: false,
		desc: "Holder's Speed is halved.",
	},
	powerband: {
		inherit: true,
		ignoreKlutz: false,
		desc: "Holder's Speed is halved.",
	},
	powerbelt: {
		inherit: true,
		ignoreKlutz: false,
		desc: "Holder's Speed is halved.",
	},
	powerbracer: {
		inherit: true,
		ignoreKlutz: false,
		desc: "Holder's Speed is halved.",
	},
	powerlens: {
		inherit: true,
		ignoreKlutz: false,
		desc: "Holder's Speed is halved.",
	},
	powerweight: {
		inherit: true,
		ignoreKlutz: false,
		desc: "Holder's Speed is halved.",
	},
	safetygoggles: {
		inherit: true,
		desc: "Holder is immune to powder moves and damage from Sandstorm or Snow.",
	},
	sweetapple: {
		inherit: true,
		shortDesc: "Holder's use of Apple Bomb lowers Sp. Defense.",
		desc: "When used by the holder, the move Apple Bomb lowers Special Defense. Evolves Applin into Appletun when used.",
		rating: -1,
	},
	syrupyapple: {
		inherit: true,
		shortDesc: "Holder's use of Apple Bomb lowers Speed.",
		desc: "When used by the holder, the move Apple Bomb lowers Speed. Evolves Applin into Dipplin when used.",
		rating: -1,
	},
	tartapple: {
		inherit: true,
		shortDesc: "Holder's use of Apple Bomb lowers Defense.",
		desc: "When used by the holder, the move Apple Bomb lowers Defense. Evolves Applin into Flapple when used.",
		rating: -1,
	},
	/* Natural Gift adjustments (also type-reduction edits for dual-type moves) */
	cheriberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 70,
			type: "Fire",
		},
	},
	chestoberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 70,
			type: "Water",
		},
	},
	pechaberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 70,
			type: "Electric",
		},
	},
	rawstberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 70,
			type: "Grass",
		},
	},
	aspearberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 70,
			type: "Ice",
		},
	},
	leppaberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 70,
			type: "Fighting",
		},
		rating: 1,
	},
	oranberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 70,
			type: "Poison",
		},
	},
	persimberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 70,
			type: "Ground",
		},
	},
	lumberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 70,
			type: "Flying",
		},
	},
	sitrusberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 70,
			type: "Psychic",
		},
	},
	razzberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 80,
			type: "Normal",
		},
		isNonstandard: null,
	},
	blukberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 80,
			type: "Fire",
		},
		isNonstandard: null,
	},
	nanabberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 80,
			type: "Water",
		},
		isNonstandard: null,
	},
	wepearberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 80,
			type: "Electric",
		},
		isNonstandard: null,
	},
	pinapberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 80,
			type: "Grass",
		},
		isNonstandard: null,
	},
	pomegberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 80,
			type: "Ice",
		},
	},
	kelpsyberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 80,
			type: "Fighting",
		},
	},
	qualotberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 80,
			type: "Poison",
		},
	},
	hondewberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 80,
			type: "Ground",
		},
	},
	grepaberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 80,
			type: "Flying",
		},
	},
	tamatoberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 80,
			type: "Psychic",
		},
	},
	cornnberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 80,
			type: "Bug",
		},
		isNonstandard: null,
	},
	magostberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 80,
			type: "Rock",
		},
		isNonstandard: null,
	},
	rabutaberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 80,
			type: "Ghost",
		},
		isNonstandard: null,
	},
	nomelberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 80,
			type: "Dragon",
		},
		isNonstandard: null,
	},
	spelonberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 80,
			type: "Dark",
		},
		isNonstandard: null,
	},
	pamtreberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 80,
			type: "Steel",
		},
		isNonstandard: null,
	},
	chilanberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 90,
			type: "Normal",
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (
				(move.type === 'Normal' || (move.twoType && move.twoType === 'Normal')) &&
				(!target.volatiles['substitute'] || move.flags['authentic'] || move.infiltrates)
			) {
				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
	},
	occaberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 90,
			type: "Fire",
		},
		onSourceModifyDamage(damage, source, target, move) {
			if ((move.type === 'Fire' || (move.twoType && move.twoType === 'Fire')) && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['authentic'] && !move.infiltrates;
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
	},
	passhoberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 90,
			type: "Water",
		},
		onSourceModifyDamage(damage, source, target, move) {
			if ((move.type === 'Water' || (move.twoType && move.twoType === 'Water')) && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['authentic'] && !move.infiltrates;
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
	},
	wacanberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 90,
			type: "Electric",
		},
		onSourceModifyDamage(damage, source, target, move) {
			if ((move.type === 'Electric' || (move.twoType && move.twoType === 'Electric')) && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['authentic'] && !move.infiltrates;
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
	},
	rindoberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 90,
			type: "Grass",
		},
		onSourceModifyDamage(damage, source, target, move) {
			if ((move.type === 'Grass' || (move.twoType && move.twoType === 'Grass')) && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['authentic'] && !move.infiltrates;
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
	},
	yacheberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 90,
			type: "Ice",
		},
		onSourceModifyDamage(damage, source, target, move) {
			if ((move.type === 'Ice' || (move.twoType && move.twoType === 'Ice')) && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['authentic'] && !move.infiltrates;
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
	},
	chopleberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 90,
			type: "Fighting",
		},
		onSourceModifyDamage(damage, source, target, move) {
			if ((move.type === 'Fighting' || (move.twoType && move.twoType === 'Fighting')) && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['authentic'] && !move.infiltrates;
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
	},
	kebiaberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 90,
			type: "Poison",
		},
		onSourceModifyDamage(damage, source, target, move) {
			if ((move.type === 'Poison' || (move.twoType && move.twoType === 'Poison')) && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['authentic'] && !move.infiltrates;
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
	},
	shucaberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 90,
			type: "Ground",
		},
		onSourceModifyDamage(damage, source, target, move) {
			if ((move.type === 'Ground' || (move.twoType && move.twoType === 'Ground')) && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['authentic'] && !move.infiltrates;
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
	},
	cobaberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 90,
			type: "Flying",
		},
		onSourceModifyDamage(damage, source, target, move) {
			if ((move.type === 'Flying' || (move.twoType && move.twoType === 'Flying')) && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['authentic'] && !move.infiltrates;
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
	},
	payapaberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 90,
			type: "Psychic",
		},
		onSourceModifyDamage(damage, source, target, move) {
			if ((move.type === 'Psychic' || (move.twoType && move.twoType === 'Psychic')) && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['authentic'] && !move.infiltrates;
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
	},
	tangaberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 90,
			type: "Bug",
		},
		onSourceModifyDamage(damage, source, target, move) {
			if ((move.type === 'Bug' || (move.twoType && move.twoType === 'Bug')) && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['authentic'] && !move.infiltrates;
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
	},
	chartiberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 90,
			type: "Rock",
		},
		onSourceModifyDamage(damage, source, target, move) {
			if ((move.type === 'Rock' || (move.twoType && move.twoType === 'Rock')) && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['authentic'] && !move.infiltrates;
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
	},
	kasibberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 90,
			type: "Ghost",
		},
		onSourceModifyDamage(damage, source, target, move) {
			if ((move.type === 'Ghost' || (move.twoType && move.twoType === 'Ghost')) && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['authentic'] && !move.infiltrates;
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
	},
	habanberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 90,
			type: "Dragon",
		},
		onSourceModifyDamage(damage, source, target, move) {
			if ((move.type === 'Dragon' || (move.twoType && move.twoType === 'Dragon')) && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['authentic'] && !move.infiltrates;
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
	},
	colburberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 90,
			type: "Dark",
		},
		onSourceModifyDamage(damage, source, target, move) {
			if ((move.type === 'Dark' || (move.twoType && move.twoType === 'Dark')) && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['authentic'] && !move.infiltrates;
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
	},
	babiriberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 90,
			type: "Steel",
		},
		onSourceModifyDamage(damage, source, target, move) {
			if ((move.type === 'Steel' || (move.twoType && move.twoType === 'Steel')) && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['authentic'] && !move.infiltrates;
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
	},
	roseliberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 90,
			type: "Fairy",
		},
		onSourceModifyDamage(damage, source, target, move) {
			if ((move.type === 'Fairy' || (move.twoType && move.twoType === 'Fairy')) && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['authentic'] && !move.infiltrates;
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
	},
	marangaberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 100,
			type: "Normal",
		},
	},
	/* Fling adjustments */
	adamantorb: {
		inherit: true,
		fling: {
			basePower: 60,
			flags: {bullet: 1},
		},
		desc: "If held by a Dialga, its Steel- and Dragon-type attacks have 1.2x power. When Flung, counts as a projectile move.",
		shortDesc: "If held by a Dialga, its Steel- and Dragon-type attacks have 1.2x power.",
	},
	blunderpolicy: {
		inherit: true,
		consumable: true,
		fling: {
			basePower: 30,
		},
	},
	flameorb: {
		inherit: true,
		fling: {
			basePower: 30,
			status: 'brn',
			flags: {bullet: 1},
		},
		desc: "At the end of every turn, this item attempts to burn the holder. When Flung, burns the target and counts as a projectile move.",
		shortDesc: "At the end of every turn, this item attempts to burn the holder.",
	},
	griseousorb: {
		inherit: true,
		fling: {
			basePower: 60,
			flags: {bullet: 1},
		},
		desc: "If held by a Giratina, its Ghost- and Dragon-type attacks have 1.2x power, and it becomes its Origin Forme. When Flung, counts as a projectile move.",
		shortDesc: "If held by a Giratina, its Ghost- and Dragon-type attacks have 1.2x power.",
	},
	honey: {
		num: 94,
		name: "Honey",
		fling: {
			basePower: 30,
			boosts: {spe: -2},
		},
		desc: "When Flung, sharply lowers Speed.",
		rating: 0,
		gen: 4,
	},
	laggingtail: {
		inherit: true,
		fling: {
			basePower: 70,
		},
	},
	lifeorb: {
		inherit: true,
		fling: {
			basePower: 30,
			flags: {bullet: 1},
		},
		desc: "Holder's attacks have their power boosted by 1.3x, but it loses 10% its max HP after each attack. When Flung, counts as a projectile move.",
		shortDesc: "Holder's attacks do 1.3x damage, and it loses 1/10 its max HP after the attack.",
	},
	lightball: {
		inherit: true,
		fling: {
			basePower: 30,
			status: 'par',
			flags: {bullet: 1},
		},
		desc: "If held by a Pikachu, its Attack and Sp. Attack stats are doubled. When Flung, paralyzes the target and counts as a projectile move.",
		shortDesc: "If held by a Pikachu, its Attack and Sp. Atk are doubled.",
	},
	lustrousorb: {
		inherit: true,
		fling: {
			basePower: 60,
			flags: {bullet: 1},
		},
		desc: "If held by a Palkia, its Water- and Dragon-type attacks have 1.2x power. When Flung, counts as a projectile move.",
		shortDesc: "If held by a Palkia, its Water- and Dragon-type attacks have 1.2x power.",
	},
	ovalstone: {
		inherit: true,
		fling: {
			basePower: 40,
		},
	},
	relicstatue: {
		num: 590,
		name: "Relic Statue",
		desc: "An item valuable to collectors.",
		fling: {
			basePower: 100,
		},
		spritenum: 399,
		rating: 0,
		gen: 5,
	},
	smokeball: {
		num: 228,
		name: "Smoke Ball",
		desc: "When Flung, sharply lowers accuracy and counts as a projectile move.",
		fling: {
			basePower: 30,
			boosts: {accuracy: -2},
			flags: {bullet: 1},
		},
		spritenum: 452,
		rating: 0,
		gen: 3,
	},
	smoothrock: {
		inherit: true,
		fling: {
			basePower: 40,
		},
	},
	toxicorb: {
		inherit: true,
		fling: {
			basePower: 30,
			status: 'tox',
			flags: {bullet: 1},
		},
		desc: "At the end of every turn, this item attempts to badly poison the holder. When Flung, badly poisons the target and counts as a projectile move.",
		shortDesc: "At the end of every turn, this item attempts to badly poison the holder.",
	},
	weaknesspolicy: {
		inherit: true,
		consumable: true,
		fling: {
			basePower: 30,
		},
	},
	/* Consumable item flags*/
	apicotberry: {
		inherit: true,
		consumable: true,
	},
	belueberry: {
		inherit: true,
		consumable: true,
		isNonstandard: null,
	},
	berryjuice: {
		inherit: true,
		consumable: true,
		rating: 1,
	},
	custapberry: {
		inherit: true,
		consumable: true,
	},
	ejectbutton: {
		inherit: true,
		consumable: true,
	},
	ejectpack: {
		inherit: true,
		consumable: true,
	},
	electricseed: {
		inherit: true,
		fling: {
			basePower: 20,
		},
		consumable: true,
	},
	enigmaberry: {
		inherit: true,
		consumable: true,
	},
	focussash: {
		inherit: true,
		fling: {
			basePower: 20,
		},
		consumable: true,
	},
	ganlonberry: {
		inherit: true,
		consumable: true,
	},
	grassyseed: {
		inherit: true,
		fling: {
			basePower: 20,
		},
		consumable: true,
	},
	keeberry: {
		inherit: true,
		consumable: true,
	},
	lansatberry: {
		inherit: true,
		consumable: true,
	},
	liechiberry: {
		inherit: true,
		consumable: true,
	},
	mentalherb: {
		inherit: true,
		fling: {
			basePower: 20,
		},
		consumable: true,
	},
	mistyseed: {
		fling: {
			basePower: 20,
		},
		inherit: true,
		consumable: true,
	},
	petayaberry: {
		inherit: true,
		consumable: true,
	},
	powerherb: {
		inherit: true,
		fling: {
			basePower: 20,
		},
		consumable: true,
	},
	psychicseed: {
		inherit: true,
		fling: {
			basePower: 20,
		},
		consumable: true,
	},
	redcard: {
		inherit: true,
		fling: {
			basePower: 20,
		},
		consumable: true,
	},
	roomservice: {
		inherit: true,
		consumable: true,
	},
	salacberry: {
		inherit: true,
		consumable: true,
	},
	watmelberry: {
		inherit: true,
        isNonstandard: null,
		consumable: true,
	},
	whiteherb: {
		inherit: true,
		fling: {
			basePower: 20,
		},
		consumable: true,
	},
	/* Fling BP */
	choiceband: {
		inherit: true,
		fling: {
			basePower: 20,
		},
	},
	choicescarf: {
		inherit: true,
		fling: {
			basePower: 20,
		},
	},
	choicespecs: {
		inherit: true,
		fling: {
			basePower: 20,
		},
	},
	destinyknot: {
		inherit: true,
		fling: {
			basePower: 20,
		},
	},
	expertbelt: {
		inherit: true,
		fling: {
			basePower: 20,
		},
	},
	leftovers: {
		inherit: true,
		fling: {
			basePower: 20,
		},
	},
	ringtarget: {
		inherit: true,
		fling: {
			basePower: 20,
		},
	},
	widelens: {
		inherit: true,
		fling: {
			basePower: 20,
		},
	},
	zoomlens: {
		inherit: true,
		fling: {
			basePower: 20,
		},
	},
	/* Restorations */
	abomasite: {
		inherit: true,
		isNonstandard: null,
	},
	absolite: {
		inherit: true,
		isNonstandard: null,
	},
	aerodactylite: {
		inherit: true,
		isNonstandard: null,
	},
	aggronite: {
		inherit: true,
		isNonstandard: null,
	},
	alakazite: {
		inherit: true,
		isNonstandard: null,
	},
	altarianite: {
		inherit: true,
		isNonstandard: null,
	},
	ampharosite: {
		inherit: true,
		isNonstandard: null,
	},
	armorfossil: {
		inherit: true,
		isNonstandard: null,
	},
	audinite: {
		inherit: true,
		isNonstandard: null,
	},
	banettite: {
		inherit: true,
		isNonstandard: null,
	},
	beedrillite: {
		inherit: true,
		isNonstandard: null,
	},
	blastoisinite: {
		inherit: true,
		isNonstandard: null,
	},
	blazikenite: {
		inherit: true,
		isNonstandard: null,
	},
	bugmemory: {
		inherit: true,
		isNonstandard: null,
	},
	burndrive: {
		inherit: true,
		isNonstandard: null,
	},
	cameruptite: {
		inherit: true,
		isNonstandard: null,
	},
	charizarditex: {
		inherit: true,
		isNonstandard: null,
	},
	charizarditey: {
		inherit: true,
		isNonstandard: null,
	},
	cherishball: {
		inherit: true,
		isNonstandard: null,
	},
	chilldrive: {
		inherit: true,
		isNonstandard: null,
	},
	clawfossil: {
		inherit: true,
		isNonstandard: null,
	},
	coverfossil: {
		inherit: true,
		isNonstandard: null,
	},
	darkmemory: {
		inherit: true,
		isNonstandard: null,
	},
	deepseascale: {
		inherit: true,
		isNonstandard: null,
	},
	deepseatooth: {
		inherit: true,
		isNonstandard: null,
	},
	diancite: {
		inherit: true,
		isNonstandard: null,
	},
	domefossil: {
		inherit: true,
		isNonstandard: null,
	},
	dousedrive: {
		inherit: true,
		isNonstandard: null,
	},
	dragonmemory: {
		inherit: true,
		isNonstandard: null,
	},
	durinberry: {
		inherit: true,
		isNonstandard: null,
	},
	electricmemory: {
		inherit: true,
		isNonstandard: null,
	},
	fairymemory: {
		inherit: true,
		isNonstandard: null,
	},
	fightingmemory: {
		inherit: true,
		isNonstandard: null,
	},
	firememory: {
		inherit: true,
		isNonstandard: null,
	},
	flyingmemory: {
		inherit: true,
		isNonstandard: null,
	},
	fossilizedbird: {
		inherit: true,
		isNonstandard: null,
	},
	fossilizeddino: {
		inherit: true,
		isNonstandard: null,
	},
	fossilizeddrake: {
		inherit: true,
		isNonstandard: null,
	},
	fossilizedfish: {
		inherit: true,
		isNonstandard: null,
	},
	galaricacuff: {
		inherit: true,
		isNonstandard: null,
	},
	galaricawreath: {
		inherit: true,
		isNonstandard: null,
	},
	galladite: {
		inherit: true,
		isNonstandard: null,
	},
	garchompite: {
		inherit: true,
		isNonstandard: null,
	},
	gardevoirite: {
		inherit: true,
		isNonstandard: null,
	},
	gengarite: {
		inherit: true,
		isNonstandard: null,
	},
	ghostmemory: {
		inherit: true,
		isNonstandard: null,
	},
	glalitite: {
		inherit: true,
		isNonstandard: null,
	},
	grassmemory: {
		inherit: true,
		isNonstandard: null,
	},
	groundmemory: {
		inherit: true,
		isNonstandard: null,
	},
	gyaradosite: {
		inherit: true,
		isNonstandard: null,
	},
	helixfossil: {
		inherit: true,
		isNonstandard: null,
	},
	heracronite: {
		inherit: true,
		isNonstandard: null,
	},
	houndoominite: {
		inherit: true,
		isNonstandard: null,
	},
	icememory: {
		inherit: true,
		isNonstandard: null,
	},
	jawfossil: {
		inherit: true,
		isNonstandard: null,
	},
	kangaskhanite: {
		inherit: true,
		isNonstandard: null,
	},
	latiasite: {
		inherit: true,
		isNonstandard: null,
	},
	latiosite: {
		inherit: true,
		isNonstandard: null,
	},
	lopunnite: {
		inherit: true,
		isNonstandard: null,
	},
	lucarionite: {
		inherit: true,
		isNonstandard: null,
	},
	manectite: {
		inherit: true,
		isNonstandard: null,
	},
	mawilite: {
		inherit: true,
		isNonstandard: null,
	},
	medichamite: {
		inherit: true,
		isNonstandard: null,
	},
	metagrossite: {
		inherit: true,
		isNonstandard: null,
	},
	mewtwonitex: {
		inherit: true,
		isNonstandard: null,
	},
	mewtwonitey: {
		inherit: true,
		isNonstandard: null,
	},
	oldamber: {
		inherit: true,
		isNonstandard: null,
	},
	pidgeotite: {
		inherit: true,
		isNonstandard: null,
	},
	pinsirite: {
		inherit: true,
		isNonstandard: null,
	},
	plumefossil: {
		inherit: true,
		isNonstandard: null,
	},
	poisonmemory: {
		inherit: true,
		isNonstandard: null,
	},
	psychicmemory: {
		inherit: true,
		isNonstandard: null,
	},
	rockmemory: {
		inherit: true,
		isNonstandard: null,
	},
	rootfossil: {
		inherit: true,
		isNonstandard: null,
	},
	sablenite: {
		inherit: true,
		isNonstandard: null,
	},
	sailfossil: {
		inherit: true,
		isNonstandard: null,
	},
	salamencite: {
		inherit: true,
		isNonstandard: null,
	},
	sceptilite: {
		inherit: true,
		isNonstandard: null,
	},
	scizorite: {
		inherit: true,
		isNonstandard: null,
	},
	sharpedonite: {
		inherit: true,
		isNonstandard: null,
	},
	shockdrive: {
		inherit: true,
		isNonstandard: null,
	},
	skullfossil: {
		inherit: true,
		isNonstandard: null,
	},
	slowbronite: {
		inherit: true,
		isNonstandard: null,
	},
	souldew: {
		inherit: true,
		isNonstandard: null,
	},
	steelixite: {
		inherit: true,
		isNonstandard: null,
	},
	steelmemory: {
		inherit: true,
		isNonstandard: null,
	},
	swampertite: {
		inherit: true,
		isNonstandard: null,
	},
	thickclub: {
		inherit: true,
		isNonstandard: null,
	},
	tyranitarite: {
		inherit: true,
		isNonstandard: null,
	},
	venusaurite: {
		inherit: true,
		isNonstandard: null,
	},
	watermemory: {
		inherit: true,
		isNonstandard: null,
	},
	/* Deleted items*/
	adamantcrystal: null,
	griseouscore: null,
	luckypunch: null,
	lustrousglobe: null,
	punchingglove: null,
	throatspray: null,
	utilityumbrella: null,
	/* These items would otherwise be restored in the algorithm and we don't need to load them anyway */
	berserkgene: null,
	berry: null,
	bitterberry: null,
	burntberry: null,
	goldberry: null,
	iceberry: null,
	mintberry: null,
	miracleberry: null,
	mysteryberry: null,
	pinkbow: null,
	polkadotbow: null,
	przcureberry: null,
	psncureberry: null,
	/* TRs are useless, but since they're coded and technically exist in Earth & Sky, might as well update them *//*tr00: {
		inherit: true,
		isNonstandard: null,
	},
	tr01: {
		inherit: true,
		isNonstandard: null,
	},
	tr02: {
		inherit: true,
		isNonstandard: null,
	},
	tr03: {
		inherit: true,
		isNonstandard: null,
	},
	tr04: {
		inherit: true,
		isNonstandard: null,
	},
	tr05: {
		inherit: true,
		isNonstandard: null,
	},
	tr06: {
		inherit: true,
		isNonstandard: null,
	},
	tr07: {
		inherit: true,
		isNonstandard: null,
	},
	tr08: {
		inherit: true,
		isNonstandard: null,
	},
	tr09: {
		inherit: true,
		isNonstandard: null,
	},
	tr10: {
		inherit: true,
		isNonstandard: null,
	},
	tr11: {
		inherit: true,
		isNonstandard: null,
	},
	tr12: {
		inherit: true,
		isNonstandard: null,
	},
	tr13: {
		inherit: true,
		isNonstandard: null,
	},
	tr14: {
		inherit: true,
		isNonstandard: null,
	},
	tr15: {
		inherit: true,
		isNonstandard: null,
	},
	tr16: {
		inherit: true,
		isNonstandard: null,
	},
	tr17: {
		inherit: true,
		isNonstandard: null,
	},
	tr18: {
		inherit: true,
		isNonstandard: null,
	},
	tr19: {
		inherit: true,
		isNonstandard: null,
	},
	tr20: {
		inherit: true,
		isNonstandard: null,
	},
	tr21: {
		inherit: true,
		isNonstandard: null,
	},
	tr22: {
		inherit: true,
		isNonstandard: null,
	},
	tr23: {
		inherit: true,
		isNonstandard: null,
	},
	tr24: {
		inherit: true,
		isNonstandard: null,
	},
	tr25: {
		inherit: true,
		isNonstandard: null,
	},
	tr26: {
		inherit: true,
		isNonstandard: null,
	},
	tr27: {
		inherit: true,
		isNonstandard: null,
	},
	tr28: {
		inherit: true,
		isNonstandard: null,
	},
	tr29: {
		inherit: true,
		isNonstandard: null,
	},
	tr30: {
		inherit: true,
		isNonstandard: null,
	},
	tr31: {
		inherit: true,
		isNonstandard: null,
	},
	tr32: {
		inherit: true,
		isNonstandard: null,
	},
	tr33: {
		inherit: true,
		isNonstandard: null,
	},
	tr34: {
		inherit: true,
		isNonstandard: null,
	},
	tr35: {
		inherit: true,
		isNonstandard: null,
	},
	tr36: {
		inherit: true,
		isNonstandard: null,
	},
	tr37: {
		inherit: true,
		isNonstandard: null,
	},
	tr38: {
		inherit: true,
		isNonstandard: null,
	},
	tr39: {
		inherit: true,
		isNonstandard: null,
	},
	tr40: {
		inherit: true,
		isNonstandard: null,
	},
	tr41: {
		inherit: true,
		isNonstandard: null,
	},
	tr42: {
		inherit: true,
		isNonstandard: null,
	},
	tr43: {
		inherit: true,
		isNonstandard: null,
	},
	tr44: {
		inherit: true,
		isNonstandard: null,
	},
	tr45: {
		inherit: true,
		isNonstandard: null,
	},
	tr46: {
		inherit: true,
		isNonstandard: null,
	},
	tr47: {
		inherit: true,
		isNonstandard: null,
	},
	tr48: {
		inherit: true,
		isNonstandard: null,
	},
	tr49: {
		inherit: true,
		isNonstandard: null,
	},
	tr50: {
		inherit: true,
		isNonstandard: null,
	},
	tr51: {
		inherit: true,
		isNonstandard: null,
	},
	tr52: {
		inherit: true,
		isNonstandard: null,
	},
	tr53: {
		inherit: true,
		isNonstandard: null,
	},
	tr54: {
		inherit: true,
		isNonstandard: null,
	},
	tr55: {
		inherit: true,
		isNonstandard: null,
	},
	tr56: {
		inherit: true,
		isNonstandard: null,
	},
	tr57: {
		inherit: true,
		isNonstandard: null,
	},
	tr58: {
		inherit: true,
		isNonstandard: null,
	},
	tr59: {
		inherit: true,
		isNonstandard: null,
	},
	tr60: {
		inherit: true,
		isNonstandard: null,
	},
	tr61: {
		inherit: true,
		isNonstandard: null,
	},
	tr62: {
		inherit: true,
		isNonstandard: null,
	},
	tr63: {
		inherit: true,
		isNonstandard: null,
	},
	tr64: {
		inherit: true,
		isNonstandard: null,
	},
	tr65: {
		inherit: true,
		isNonstandard: null,
	},
	tr66: {
		inherit: true,
		isNonstandard: null,
	},
	tr67: {
		inherit: true,
		isNonstandard: null,
	},
	tr68: {
		inherit: true,
		isNonstandard: null,
	},
	tr69: {
		inherit: true,
		isNonstandard: null,
	},
	tr70: {
		inherit: true,
		isNonstandard: null,
	},
	tr71: {
		inherit: true,
		isNonstandard: null,
	},
	tr72: {
		inherit: true,
		isNonstandard: null,
	},
	tr73: {
		inherit: true,
		isNonstandard: null,
	},
	tr74: {
		inherit: true,
		isNonstandard: null,
	},
	tr75: {
		inherit: true,
		isNonstandard: null,
	},
	tr76: {
		inherit: true,
		isNonstandard: null,
	},
	tr77: {
		inherit: true,
		isNonstandard: null,
	},
	tr78: {
		inherit: true,
		isNonstandard: null,
	},
	tr79: {
		inherit: true,
		isNonstandard: null,
	},
	tr80: {
		inherit: true,
		isNonstandard: null,
	},
	tr81: {
		inherit: true,
		isNonstandard: null,
	},
	tr82: {
		inherit: true,
		isNonstandard: null,
	},
	tr83: {
		inherit: true,
		isNonstandard: null,
	},
	tr84: {
		inherit: true,
		isNonstandard: null,
	},
	tr85: {
		inherit: true,
		isNonstandard: null,
	},
	tr86: {
		inherit: true,
		isNonstandard: null,
	},
	tr87: {
		inherit: true,
		isNonstandard: null,
	},
	tr88: {
		inherit: true,
		isNonstandard: null,
	},
	tr89: {
		inherit: true,
		isNonstandard: null,
	},
	tr90: {
		inherit: true,
		isNonstandard: null,
	},
	tr91: {
		inherit: true,
		isNonstandard: null,
	},
	tr92: {
		inherit: true,
		isNonstandard: null,
	},
	tr93: {
		inherit: true,
		isNonstandard: null,
	},
	tr94: {
		inherit: true,
		isNonstandard: null,
	},
	tr95: {
		inherit: true,
		isNonstandard: null,
	},
	tr96: {
		inherit: true,
		isNonstandard: null,
	},
	tr97: {
		inherit: true,
		isNonstandard: null,
	},
	tr98: {
		inherit: true,
		isNonstandard: null,
	},
	tr99: {
		inherit: true,
		isNonstandard: null,
	},*/
	/* idk why these items are coded, but they're changed too! */
	diveball: {
		inherit: true,
		desc: "A Poke Ball that makes it easier to catch saltwater-dwelling Pokemon.",
	},
	duskball: {
		inherit: true,
		desc: "A Poke Ball that makes it easier to catch Pokemon in dark places.",
	},
	featherball: {
		name: "Feather Ball",
		num: 1022,
		gen: 8,
		isPokeball: true,
		desc: "A Poke Ball that makes it easier to catch Flying-type Pokemon.",
	},
	levelball: {
		inherit: true,
		desc: "A Poke Ball that works especially well on stronger Pokemon in the wild.",
	},
	lureball: {
		inherit: true,
		desc: "A Poke Ball for catching Pokemon that have been attracted to a Lure.",
	},
	luxuryball: {
		inherit: true,
		desc: "A Poke Ball that makes a wild caught Pokemon increase Condition more quickly.",
	},
	moonball: {
		inherit: true,
		desc: "A Poke Ball that makes it easier to catch Pokemon at nighttime.",
	},
	netball: {
		inherit: true,
		desc: "A Poke Ball that makes it easier to catch Bug and Water Pokemon on land.",
	},
	parkball: {
		inherit: true,
		desc: "A special Poke Ball for catching events. It never fails.",
		isNonstandard: null,
	},
	safariball: {
		inherit: true,
		desc: "A Poke Ball that works especially well on Pokemon who haven't been damaged.",
		isNonstandard: null,
	},
	sportball: {
		inherit: true,
		desc: "A Poke Ball that makes a wild caught Pokemon increase its stats more quickly.",
		isNonstandard: null,
	},
	strikeball: {
		name: "Strike Ball",
		num: 1023,
		gen: 8,
		isPokeball: true,
		desc: "A Poke Ball that makes it easier to catch Pokemon caught unaware.",
	},
	berrysweet: {
		inherit: true,
		fling: {
			basePower: 20,
		},
		desc: "Evolves Milcery into Acremie when held and brought to the Berrimakaron Bakery.",
	},
	cloversweet: {
		inherit: true,
		fling: {
			basePower: 20,
		},
		desc: "Evolves Milcery into Acremie when held and brought to the Berrimakaron Bakery.",
	},
	flowersweet: {
		inherit: true,
		fling: {
			basePower: 20,
		},
		desc: "Evolves Milcery into Acremie when held and brought to the Berrimakaron Bakery.",
	},
	lovesweet: {
		inherit: true,
		fling: {
			basePower: 20,
		},
		desc: "Evolves Milcery into Acremie when held and brought to the Berrimakaron Bakery.",
	},
	ribbonsweet: {
		inherit: true,
		fling: {
			basePower: 20,
		},
		desc: "Evolves Milcery into Acremie when held and brought to the Berrimakaron Bakery.",
	},
	starsweet: {
		inherit: true,
		fling: {
			basePower: 20,
		},
		desc: "Evolves Milcery into Acremie when held and brought to the Berrimakaron Bakery.",
	},
	strawberrysweet: {
		inherit: true,
		fling: {
			basePower: 20,
		},
		desc: "Evolves Milcery into Acremie when held and brought to the Berrimakaron Bakery.",
	},
};
