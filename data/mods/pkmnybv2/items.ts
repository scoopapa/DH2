export const Items: {[k: string]: ModdedItemData} = {
	honey: {
		name: "Honey",
		fling: {
			basePower: 20,
		},
		num: -1005,
		gen: 4,
    shortDesc: "Pokemon with the ability Honey Gather heal 12.5% when holding this item.",
	},
	reliccharm: {
		name: "Relic Charm",
		spritenum: 390,
		onSwitchIn(pokemon) {
			if (pokemon.isActive && pokemon.baseSpecies.name === 'Meloetta') {
				pokemon.formeChange('Meloetta-Pirouette');
			}
		},
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Fighting') {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Meloetta') return false;
			return true;
		},
		itemUser: ["Meloetta"],
		num: -1006,
		gen: 8,
		desc: "If held by Meloetta: Pirouette Forme on entry, 1.2x power Fighting-type attacks.",
	},
	eternamaxcandy: {
		name: "Eternamax Candy",
		onSwitchIn(pokemon) {
			if (pokemon.isActive && pokemon.baseSpecies.name === 'Eternatus') {
				pokemon.formeChange('Eternatus-Eternamax');
			}
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Eternatus') return false;
			return true;
		},
		itemUser: ["Eternatus"],
		num: -1007,
		gen: 8,
		desc: "If held by Eternatus: Eternamaxes on entry.",
	},
	electirizer: {
		name: "Electirizer",
		spritenum: 119,
		fling: {
			basePower: 80,
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (user.baseSpecies.num === 466 && (move.type === 'Electric' || move.type === 'Fighting')) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Electivire') return false;
			return true;
		},
		itemUser: ["Electivire"],
		num: 322,
		gen: 4,
		desc: "If held by Electivire: 1.2x power on Electric and Fighting-type moves.",
	},
	magmarizer: {
		name: "Magmarizer",
		spritenum: 272,
		fling: {
			basePower: 80,
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (user.baseSpecies.num === 467 && (move.type === 'Fire' || move.type === 'Dark')) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Magmortar') return false;
			return true;
		},
		itemUser: ["Magmortar"],
		num: 323,
		gen: 4,
		desc: "If held by Magmortar: 1.2x power on Fire and Dark-type moves.",
	},
	frosterizer: {
		name: "Frosterizer",
		spritenum: 272,
		fling: {
			basePower: 80,
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (user.baseSpecies.num === 8998 && (move.type === 'Ice' || move.type === 'Psychic')) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Frostonna') return false;
			return true;
		},
		itemUser: ["Frostonna"],
		num: -1008,
		gen: 8,
		desc: "If held by Frostonna: 1.2x power on Ice and Psychic-type moves.",
	},
	stunorb: {
		name: "Stun Orb",
		spritenum: 515,
		fling: {
			basePower: 30,
			status: 'par',
		},
		onResidualOrder: 26,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			pokemon.trySetStatus('par', pokemon);
		},
		num: -1009,
		gen: 8,
		desc: "Attempts to paralyze holder at the end of every turn.",
	},

// Z-Crystals


// Mega Stones
	butterfrite: {
		name: "Butterfrite",
		spritenum: 578,
		megaStone: "Butterfree-Mega",
		megaEvolves: "Butterfree",
		itemUser: ["Butterfree"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1010,
		gen: 8,
		desc: "If held by a Butterfree, this item allows it to Mega Evolve in battle.",
	},
	milotite: {
		name: "Milotite",
		spritenum: 578,
		megaStone: "Milotic-Mega",
		megaEvolves: "Milotic",
		itemUser: ["Milotic"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1011,
		gen: 8,
		desc: "If held by a Milotic, this item allows it to Mega Evolve in battle.",
	},
	froslassite: {
		name: "Froslassite",
		spritenum: 578,
		megaStone: "Froslass-Mega",
		megaEvolves: "Froslass",
		itemUser: ["Froslass"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1012,
		gen: 8,
		desc: "If held by a Froslass, this item allows it to Mega Evolve in battle.",
	},
	slowkinite: {
		name: "Slowkinite",
		spritenum: 578,
		megaStone: "Slowking-Mega",
		megaEvolves: "Slowking",
		itemUser: ["Slowking"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1013,
		gen: 8,
		desc: "If held by a Slowking, this item allows it to Mega Evolve in battle.",
	},
	tentacruelite: {
		name: "Tentacruelite",
		spritenum: 578,
		megaStone: "Tentacruel-Mega",
		megaEvolves: "Tentacruel",
		itemUser: ["Tentacruel"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1014,
		gen: 8,
		desc: "If held by a Tentacruel, this item allows it to Mega Evolve in battle.",
	},
	meganiumite: {
		name: "Meganiumite",
		spritenum: 578,
		megaStone: "Meganium-Mega",
		megaEvolves: "Meganium",
		itemUser: ["Meganium"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1015,
		gen: 8,
		desc: "If held by a Meganium, this item allows it to Mega Evolve in battle.",
	},
	typhlosionite: {
		name: "Typhlosionite",
		spritenum: 578,
		megaStone: "Typhlosion-Mega",
		megaEvolves: "Typhlosion",
		itemUser: ["Typhlosion"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1016,
		gen: 8,
		desc: "If held by a Typhlosion, this item allows it to Mega Evolve in battle.",
	},
	feraligatrite: {
		name: "Feraligatrite",
		spritenum: 578,
		megaStone: "Feraligatr-Mega",
		megaEvolves: "Feraligatr",
		itemUser: ["Feraligatr"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1017,
		gen: 8,
		desc: "If held by a Feraligatr, this item allows it to Mega Evolve in battle.",
	},
	granbullite: {
		name: "Granbullite",
		spritenum: 578,
		megaStone: "Granbull-Mega",
		megaEvolves: "Granbull",
		itemUser: ["Granbull"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1018,
		gen: 8,
		desc: "If held by a Granbull, this item allows it to Mega Evolve in battle.",
	},
	dusknoirite: {
		name: "Dusknoirite",
		spritenum: 578,
		megaStone: "Dusknoir-Mega",
		megaEvolves: "Dusknoir",
		itemUser: ["Dusknoir"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1019,
		gen: 8,
		desc: "If held by a Dusknoir, this item allows it to Mega Evolve in battle.",
	},
	drapionite: {
		name: "Drapionite",
		spritenum: 578,
		megaStone: "Drapion-Mega",
		megaEvolves: "Drapion",
		itemUser: ["Drapion"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1020,
		gen: 8,
		desc: "If held by a Drapion, this item allows it to Mega Evolve in battle.",
	},
	cinccinite: {
		name: "Cinccinite",
		spritenum: 578,
		megaStone: "Cinccino-Mega",
		megaEvolves: "Cinccino",
		itemUser: ["Cinccino"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1021,
		gen: 8,
		desc: "If held by a Cinccino, this item allows it to Mega Evolve in battle.",
	},
	hydreigonite: {
		name: "Hydreigonite",
		spritenum: 578,
		megaStone: "Hydreigon-Mega",
		megaEvolves: "Hydreigon",
		itemUser: ["Hydreigon"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1022,
		gen: 8,
		desc: "If held by a Hydreigon, this item allows it to Mega Evolve in battle.",
	},
	talonflite: {
		name: "Talonflite",
		spritenum: 578,
		megaStone: "Talonflame-Mega",
		megaEvolves: "Talonflame",
		itemUser: ["Talonflame"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1023,
		gen: 8,
		desc: "If held by a Talonflame, this item allows it to Mega Evolve in battle.",
	},
	malamarite: {
		name: "Malamarite",
		spritenum: 578,
		megaStone: "Malamar-Mega",
		megaEvolves: "Malamar",
		itemUser: ["Malamar"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1024,
		gen: 8,
		desc: "If held by a Malamar, this item allows it to Mega Evolve in battle.",
	},
	shiinotite: {
		name: "Shiinotite",
		spritenum: 578,
		megaStone: "Shiinotic-Mega",
		megaEvolves: "Shiinotic",
		itemUser: ["Shiinotic"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1025,
		gen: 8,
		desc: "If held by a Shiinotic, this item allows it to Mega Evolve in battle.",
	},
	bewearite: {
		name: "Bewearite",
		spritenum: 578,
		megaStone: "Bewear-Mega",
		megaEvolves: "Bewear",
		itemUser: ["Bewear"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1026,
		gen: 8,
		desc: "If held by a Bewear, this item allows it to Mega Evolve in battle.",
	},
	thievulite: {
		name: "Thievulite",
		spritenum: 578,
		megaStone: "Thievul-Mega",
		megaEvolves: "Thievul",
		itemUser: ["Thievul"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1027,
		gen: 8,
		desc: "If held by a Thievul, this item allows it to Mega Evolve in battle.",
	},
	duraludite: {
		name: "Duraludite",
		spritenum: 578,
		megaStone: "Duraludon-Mega",
		megaEvolves: "Duraludon",
		itemUser: ["Duraludon"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1028,
		gen: 8,
		desc: "If held by a Duraludon, this item allows it to Mega Evolve in battle.",
	},
};
