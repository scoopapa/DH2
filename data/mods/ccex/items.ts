export const Items: {[itemid: string]: ModdedItemData} = {
	//mega stones
	shinyrod: {
		name: "Shiny Rod",
		spritenum: 576,
		megaStone: "Atsuko Kagari-Mega",
		megaEvolves: "Atsuko Kagari",
		itemUser: ["Atsuko Kagari", "Atsuko Kagari-Mega"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		gen: 9,
		desc: "If held by Atsuko Kagari, this item allows her to Mega Evolve in battle.",
	},
	zanite: {
		name: "Zanite",
		megaStone: "Zane Julien-Mega",
		megaEvolves: "Zane Julien",
		itemUser: ["Zane Julien", "Zane Julien-Mega"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		gen: 9,
		desc: "If held by Zane Julien, this item allows him to Mega Evolve in battle.",
	},
	morningstarite: {
		name: "Morningstarite",
		megaStone: "Charlie Morningstar-Mega",
		megaEvolves: "Charlie Morningstar",
		itemUser: ["Charlie Morningstar", "Charlie Morningstar-Mega"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		gen: 9,
		desc: "If held by Charlie Morningstar, this item allows her to Mega Evolve in battle.",
	},
	moralite: {
		name: "Moralite",
		megaStone: "Miles Morales-Mega",
		megaEvolves: "Miles Morales",
		itemUser: ["Miles Morales", "Miles Morales-Mega"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		gen: 9,
		desc: "If held by Miles Morales, this item allows him to Mega Evolve in battle.",
	},
	assassindress: {
		name: "Assassin Dress",
		megaStone: "Yor Forger-Mega",
		megaEvolves: "Yor Forger",
		itemUser: ["Yor Forger", "Yor Forger-Mega"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		gen: 9,
		desc: "If held by Yor Forger, this item allows her to Mega Evolve in battle.",
	},

	//z crystals
	tophiumz: {
		name: "Tophium Z",
		desc: "If held by Toph Beifong with Meteor Mash, it can use Metalbending.",
		spritenum: 647,
		onTakeItem: false,
		zMove: "Metalbending",
		zMoveFrom: "Meteor Mash",
		itemUser: ["Toph Beifong"],
		gen: 9,
	},
	garfieldiumz: {
		name: "Garfieldium Z",
		desc: "If held by Garfield with Knock Off, it can use Snack Attack.",
		onTakeItem: false,
		zMove: "Snack Attack",
		zMoveFrom: "Knock Off",
		itemUser: ["Garfield"],
		gen: 9,
	},
	aquaiumz: {
		name: "Aquaium Z",
		desc: "If held by Aqua with Psyshock, it can use God Blow.",
		onTakeItem: false,
		zMove: "God Blow",
		zMoveFrom: "Psyshock",
		itemUser: ["Aqua"],
		gen: 9,
	},
	
	//whatever this is
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
};
