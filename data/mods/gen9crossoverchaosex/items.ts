export const Items: {[itemid: string]: ModdedItemData} = {
	atsukoite: {
		name: "Atsukoite",
		spritenum: 576,
		megaStone: "Atsuko Kagari-Mega",
		megaEvolves: "Atsuko",
		itemUser: ["Atsuko Kagari", "Atsuko Kagari-Mega"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1,
		gen: 9,
		desc: "If held by Atsuko Kagari, this item allows her to Mega Evolve in battle.",
	},
	tophiumz: {
		name: "Tophium Z",
		desc: "If held by Toph with Meteor Mash, it can use Metalbending.",
		spritenum: 647,
		onTakeItem: false,
		zMove: "Metalbending",
		zMoveFrom: "Meteor Mash",
		itemUser: ["Toph"],
		num: -2,
		gen: 9,
	},
	matrixofleadership: {
		name: "Matrix of Leadership",
		spritenum: 734,
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
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (user.baseSpecies.num === 6 && (move.type === 'Steel' || move.type === 'Fighting')) {
				return this.chainModify([4915, 4096]);
			}
		},
		onTakeItem(item, pokemon, source) {
			if (source?.baseSpecies.num === 6 || pokemon.baseSpecies.num === 6) {
				return false;
			}
			return true;
		},
		num: -3,
		gen: 9,
	},
	zanite: {
		name: "zanite",
		spritenum: 576,
		megaStone: "Zane Julian-Mega",
		megaEvolves: "Zane Julian",
		itemUser: {"Zane Julian", "Zane Julian-Mega"},
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -4,
		gen: 9,
		desc: "If held by Zane Julian, this item allows it to Mega Evolve in battle.",
	},
	Morningstarite: {
		name: "Morningstarite",
		spritenum: 576,
		megaStone: "Charlie Morningstar-Mega",
		megaEvolves: "Charlie Morningstar",
		itemUser: {"Charlie Morningstar", "Charlie Morningstar-Mega"},
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -5,
		gen: 9,
		desc: "If held by Charlie Morningstar, this item allows it to Mega Evolve in battle.",
	},
	Moralite: {
		name: "Moralite",
		spritenum: 576,
		megaStone: "Miles Morales-Mega",
		megaEvolves: "Miles Morales",
		itemUser: {"Miles Morales", "Miles Morales-Mega"},
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -6,
		gen: 9,
		desc: "If held by Miles Morales, this item allows it to Mega Evolve in battle.",
	},
	Assassin Dress: {
		name: "Assassin Dress",
		spritenum: 576,
		megaStone: "Yor Forger-Mega",
		megaEvolves: "Yor Forger",
		itemUser: {"Yor Forger", "Yor Forger-Mega"},
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -7,
		gen: 9,
		desc: "If held by Yor Forger, this item allows it to Mega Evolve in battle.",
	},
};
