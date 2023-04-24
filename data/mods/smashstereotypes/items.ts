export const Items: {[itemid: string]: ModdedItemData} = {
	gardevoirite: {
		name: "Gardevoirite",
		spritenum: 587,
		megaStone: "Kokovoir-Mega",
		megaEvolves: "Kokovoir",
		itemUser: ["Kokovoir"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 657,
		shortDesc: "If held by a Kokovoir, this item allows it to Mega Evolve in battle.",
	},
	machampite: {
		name: "Machampite",
		spritenum: 9999,
		megaStone: "Machamp-Mega",
		megaEvolves: "Machamp",
		itemUser: ["Machamp"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 657,
		shortDesc: "If held by a Machamp, this item allows it to Mega Evolve in battle.",
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
		num: 908,
		gen: 7,
	},
	chillytite: {
		name: "Chillytite",
		spritenum: 594,
		megaStone: "Chillyte-Mega",
		megaEvolves: "Chillyte",
		itemUser: ["Chillyte"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 673,
		gen: 8,
		shortDesc: "If held by a Chillyte, this item allows it to Mega Evolve in battle.",
	},
	garbodite: {
		name: "Garbodite",
		spritenum: 583,
		megaStone: "Garbodor-Gmax",
		megaEvolves: "Garbodor",
		itemUser: ["Garbodor"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 10000,
		gen: 8,
		shortDesc: "If held by a Garbodor, this item allows it to Mega Evolve in battle.",
	},
	pidgeotite: {
		name: "Pidgeotite",
		spritenum: 622,
		megaStone: "Peasmaker-Mega",
		megaEvolves: "Peasmaker",
		itemUser: ["Peasmaker"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 762,
		gen: 6,
		shortDesc: "If held by a Peasmaker, this item allows it to Mega Evolve in battle.",
	},
	scizorite: {
		name: "Scizorite",
		spritenum: 605,
		megaStone: "Cofazor-Mega",
		megaEvolves: "Cofazor",
		itemUser: ["Cofazor"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 670,
		shortDesc: "If held by a Cofazor, this item allows it to Mega Evolve in battle.",
	},
	widelens: {
		name: "Wide Lens",
		spritenum: 537,
		fling: {
			basePower: 10,
		},
		onSourceModifyAccuracyPriority: 4,
		onSourceModifyAccuracy(accuracy) {
			if (typeof accuracy === 'number') {
				return accuracy * 1.15;
			}
		},
		onBasePowerPriority: 5,
		onBasePower(basePower, move, accuracy, pokemon, target) {
			if (move.accuracy !== 100) {
				return this.chainModify(1.2);
			}
		},
		num: 265,
		gen: 4,
		shortDesc: "Accuracy is boosted by 1.15x. 95% or less accuracy have 1.2x power.",
	},
	everstone: {
		name: "Everstone",
		spritenum: 130,
		fling: {
			basePower: 40,
		},
		onModifyAtkPriority: 2,
		onModifyAtk(atk, pokemon) {
			if (pokemon.baseSpecies.nfe) {
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 2,
		onModifySpA(spa, pokemon) {
			if (pokemon.baseSpecies.nfe) {
				return this.chainModify(1.5);
			}
		},
		num: -1,
		gen: 2,
		shortDesc: "If holder's species can evolve, its Attack and Sp. Atk are 1.5x.",
	},
	puyoniumz: {
        id: "puyoniumz",
        name: "Puyonium Z",
        onTakeItem: false,
        zMove: "Permutation",
        zMoveFrom: "Thunderbolt",
        zMoveUser: ["Ringo Ando"],
		num: -100,
		gen: 8,
        shortDesc: "If held by Ringo Ando with Thunderbolt, she can use Permutation.",
    },
	frosmothite: {
		name: "Frosmothite",
		spritenum: 605,
		megaStone: "Frosmoth-Mega",
		megaEvolves: "Frosmoth",
		itemUser: ["Frosmoth"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 10001,
		shortDesc: "If held by a Frosmoth, this item allows it to Mega Evolve in battle.",
	},
	unoreversecard: {
		name: "Uno Reverse Card",
		spritenum: 608,
		onTakeItem(item, pokemon, source) {
			if (this.suppressingAttackEvents(pokemon) || !pokemon.hp) return;
			if (!this.activeMove) throw new Error("Battle.activeMove is null");
			if ((source && source !== pokemon) || this.activeMove.id === 'knockoff') {
				this.add('-activate', pokemon, 'item: Uno Reverse Card');
				return false;
			}
		},
		onDamagingHit(damage, target, source, move) {
			if (move.id === 'knockoff') {
				const item = target.takeItem();
				if (item) {
					this.add('-enditem', target, item.name, '[from] item: Uno Reverse Card', '[of] ' + source);
				}
			}
		},
		num: 1124,
		gen: 8,
		shortDesc: "This item cannot be lost. Removed opponent's item if that's intended.",
	},
	coffee: {
		onUpdate(pokemon) {
			if (pokemon.useItem()) {
				if (pokemon.volatiles['mustrecharge']) {
					pokemon.removeVolatile('mustrecharge');
				}
			}
		},
		name: "Coffee",
		spritenum: 358,
		fling: {
			basePower: 10,
		},
		num: 271,
		gen: 4,
		shortDesc: "Holder's moves don't need to recharge. Single use.",
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
		shortDesc: "If held by a Gallade-Kalos, this item allows it to Mega Evolve in battle.",
	},
	bisharpite: {
		name: "Bisharpite",
		spritenum: 578,
		megaStone: "Bisharp-Mega",
		megaEvolves: "Bisharp",
		itemUser: ["Bisharp"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1030,
		gen: 8,
		shortDesc: "If held by a Bisharp, this item allows it to Mega Evolve in battle.",
	},
	hpbanana: {
		name: "HP Banana",
		spritenum: 22,
		fling: {
			basePower: 30,
		},
		onUpdate(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 2) {
				if (this.runEvent('TryHeal', pokemon) && pokemon.useItem()) {
					this.heal(100);
				}
			}
		},
		num: -1,
		gen: 8,
		shortDesc: "Restores 100 HP when at 1/2 max HP or less. Single use.",
	},
	hatterenite: {
		name: "Hatterenite",
		spritenum: 583,
		megaStone: "Hatterene-Gmax",
		megaEvolves: "Hatterene",
		itemUser: ["Hatterene"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 10000,
		gen: 8,
		desc: "If held by a Hatterene, this item allows it to Mega Evolve in battle.",
	},
	drednite: {
		name: "Drednite",
		spritenum: 583,
		megaStone: "Drednaw-Gmax",
		megaEvolves: "Drednaw",
		itemUser: ["Drednaw"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 10000,
		gen: 8,
		desc: "If held by a Drednaw, this item allows it to Mega Evolve in battle.",
	},
	odonagiumz: {
		name: "Odonagium Z",
		desc: "If held by Odonaga with Feudal Harpoon, it can use Baneful Blade Dance.",
		spritenum: 642,
		onTakeItem: false,
		zMove: "Baneful Blade Dance",
		zMoveFrom: "Feudal Harpoon",
		itemUser: ["Odonaga"],
		num: 1010,
		gen: 7,
	},
	souldew: {
		inherit: true,
		shortDesc: "If held by a Latias/Latios, its STAB moves have 1.2x power.",
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (
				move && ((user.baseSpecies.num === 380) && (move.type === 'Fairy' || move.type === 'Dragon')) 
				|| ((user.baseSpecies.num === 381) && (move.type === 'Dragon' || move.type === 'Electric'))
			) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
	},
	latiasite: {
		name: "Latiasite",
		spritenum: 629,
		megaStone: "Latias-Mega",
		megaEvolves: "MissingNo",
		itemUser: ["MissingNo"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 684,
		gen: 6,
		shortDesc: "Incompatible with Latias.",
	},
	mulpberry: {
		id: "mulpberry",
		name: "Mulp Berry",
		spritenum: 69,
		fling: {
			basePower: 10,
		},
		onUpdate(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 4 || (pokemon.hp <= pokemon.maxhp / 2 && pokemon.hasAbility('gluttony'))) {
				pokemon.eatItem();
			}
		},
		onEat(source) {
			this.useMove('Stealth Rock', source);
		},
		shortDesc: "When at 1/4 HP or less, consumes Berry and sets Stealth Rock on the foe's side",
	},
	coalengine: {
		name: "Coal Engine",
		spritenum: 297,
		fling: {
			basePower: 60,
		},
		onStart(pokemon) {
			 if (pokemon.side.getSideCondition('stealthrock') && !pokemon.ignoringItem()) {
				  pokemon.useItem();
				  let statName = 'atk';
				  let bestStat = 0;
				  let s: StatNameExceptHP;
				  for (s in pokemon.storedStats) {
						if (pokemon.storedStats[s] > bestStat) {
							 statName = s;
							 bestStat = pokemon.storedStats[s];
						}
				  }
				  this.boost({[statName]: 1}, pokemon);
			 }
		},
		gen: 8,
		desc: "If Stealth Rock is on the field, damage is ignored, and the user's highest stat is raised by 1. Single use.",
	},
	seviisap: {	
		onResidualOrder: 5,
		onResidualSubOrder: 5,
		onResidual(pokemon) {
			this.heal(pokemon.baseMaxhp / 24);
		},
		onTakeItem: false,
		name: "Sevii Sap",
		num: 1021,
		gen: 8,
		shortDesc: "At the end of every turn, holder restores 1/24 of its max HP. Cannot be removed.",
    },
	zoomlens: {
		name: "Zoom Lens",
		spritenum: 574,
		fling: {
			basePower: 10,
		},
		onSourceModifyAccuracyPriority: 4,
		onSourceModifyAccuracy(accuracy, target) {
			if (typeof accuracy === 'number' && (!this.queue.willMove(target) || target.newlySwitched)) {
				this.debug('Zoom Lens boosting accuracy');
				return accuracy * 1.5;
			}
		},
		num: 276,
		gen: 4,
		desc: "The accuracy of attacks by the holder is 1.5x if it moves lasts or the foe switches.",
	},
	laggingtail: {
		name: "Lagging Tail",
		spritenum: 237,
		fling: {
			basePower: 10,
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.category === 'Physical' && source.newlySwitched) {
				return this.chainModify(0.67);
			}
		},
		onFractionalPriorityPriority: -2,
		onFractionalPriority(priority, pokemon) {
			return -1;
		},
		num: 279,
		gen: 4,
		shortDesc: "Holder takes 33% less damage from physical moves upon entry. -1 priority.",
	},
	laxincense: {
		name: "Lax Incense",
		spritenum: 240,
		fling: {
			basePower: 10,
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.category === 'Special' && source.newlySwitched) {
				return this.chainModify(0.67);
			}
		},
		onFractionalPriorityPriority: -2,
		onFractionalPriority(priority, pokemon) {
			return -1;
		},
		num: 255,
		gen: 3,
		shortDesc: "Holder takes 33% less damage from special moves upon entry. -1 priority.",
	},
	protector: {
		name: "Protector",
		spritenum: 367,
		fling: {
			basePower: 100,
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).typeMod > 0 && !target.hasAbility('solidrock') && !target.hasAbility('filter')) {
				this.debug('Protector neutralize');
				return this.chainModify(0.75);
			}
		},
		num: 321,
		gen: 4,
		desc: "Super effective attacks deal 3/4 damage to the holder.",
	},
	"serenitybrace": {
		id: "Serenity Brace",
		name: "serenitybrace",
		spritenum: 417,
		fling: {
			basePower: 50,
		},
		onModifySecondaries(secondaries) {
			this.debug('Shield Dust prevent secondary');
			return secondaries.filter(effect => !!(effect.self || effect.dustproof));
		},
		desc: "Protects the holder from the secondary effects of opponent's moves.",
	},
	playerpin: {
		name: "Player Pin",
		spritenum: 297,
		fling: {
			basePower: 10,
		},
		onStart(pokemon) {
			for (const target of pokemon.side.foe.active) {
				if (!target || target.fainted) continue;
				if (target.item) {
					this.add('-item', target, target.getItem().name, '[from] item: Player Pin', '[of] ' + pokemon, '[identify]');
				}
			}
			let warnMoves: (Move | Pokemon)[][] = [];
			let warnBp = 1;
			for (const target of pokemon.side.foe.active) {
				if (target.fainted) continue;
				for (const moveSlot of target.moveSlots) {
					const move = this.dex.getMove(moveSlot.move);
					let bp = move.basePower;
					if (move.ohko) bp = 150;
					if (move.id === 'counter' || move.id === 'metalburst' || move.id === 'mirrorcoat') bp = 120;
					if (bp === 1) bp = 80;
					if (!bp && move.category !== 'Status') bp = 80;
					if (bp > warnBp) {
						warnMoves = [[move, target]];
						warnBp = bp;
					} else if (bp === warnBp) {
						warnMoves.push([move, target]);
					}
				}
			}
			if (!warnMoves.length) return;
			const [warnMoveName, warnTarget] = this.sample(warnMoves);
			this.add('-activate', pokemon, 'item: Player Pin', warnMoveName, '[of] ' + warnTarget);
		},
		gen: 8,
		desc: "Reveals the foe(s)'s item and strongest move on switch-in, unless they are also holding a Player Pin.",
	},
	pepsican: {
		name: "Pepsi Can",
		onResidualOrder: 5,
		onResidualSubOrder: 5,
		onResidual(source) {
			if (source.volatiles['malnourish']) {
				this.heal(source.baseMaxhp / 16);
			}
			else {
				this.heal(source.baseMaxhp / 16);
			}
			for (const pokemon of this.getAllActive()) {
					if (pokemon.switchFlag === true) return;
			}
			if (source.species.id !== 'pepsiman') {
				source.setItem('pepsicantwothirdsfull');
				this.add('-item', source, source.getItem(), '[from] item: Pepsi Can');
			}
		},
		num: 1009,
		gen: 8,
		shortDesc: "At the end of every turn, holder restores 1/16 of its max HP. Lasts 3 turns.",
	},
	pepsicantwothirdsfull: {
		name: "Pepsi Can (Two-Thirds Full)",
		onResidualOrder: 5,
		onResidualSubOrder: 5,
		onResidual(source) {
			if (source.volatiles['malnourish']) {
				this.heal(source.baseMaxhp / 16);
			}
			else {
				this.heal(source.baseMaxhp / 16);
			}
			for (const pokemon of this.getAllActive()) {
					if (pokemon.switchFlag === true) return;
			}
			source.setItem('pepsicanonethirdfull');
			this.add('-item', source, source.getItem(), '[from] item: Pepsi Can');
		},
		num: 1010,
		gen: 8,
		shortDesc: "At the end of every turn, holder restores 1/16 of its max HP. Lasts 2 turns.",
	},
	pepsicanonethirdfull: {
		name: "Pepsi Can (One-Third Full)",
		onResidualOrder: 5,
		onResidualSubOrder: 5,
		onResidual(source) {
			if (source.volatiles['malnourish']) {
				this.heal(source.baseMaxhp / 16);
			}
			else {
				this.heal(source.baseMaxhp / 16);
			}
			for (const pokemon of this.getAllActive()) {
					if (pokemon.switchFlag === true) return;
			}
			source.setItem('pepsicanempty');
			this.add('-item', source, source.getItem(), '[from] item: Pepsi Can');
		},
		num: 1011,
		gen: 8,
		shortDesc: "At the end of every turn, holder restores 1/16 of its max HP. Lasts 1 turn.",
	},
	pepsicanempty: {
		name: "Pepsi Can (Empty)",
		num: 1012,
		gen: 8,
		shortDesc: "No effect.",
	},
};
