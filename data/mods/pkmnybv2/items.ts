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

};
