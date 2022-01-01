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
	boazanianmetal:  {
		name: "Boazanian Metal",
		shortDesc: "If held by an Ultranaut, changes its forme to V.",
		spritenum: 699,
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 22) || pokemon.baseSpecies.num === 22) {
				return false;
			}
			return true;
		},
		forcedForme: "Ultranaut-V",
		itemUser: ["Ultranaut-V"],
		num: 1104,
		gen: 8,
	},
};
