export const Items: {[itemid: string]: ModdedItemData} = {
	adamantorb: {
		name: "Adamant Orb",
		spritenum: 4,
		fling: {
			basePower: 60,
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (user.baseSpecies.num === 483 && (move.type === 'Steel' || move.type === 'Dragon')) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 483) || pokemon.baseSpecies.num === 483) {
				return false;
			}
			return true;
		},
		forcedForme: "Dialga-Origin",
		itemUser: ["Dialga-Origin"],
		num: 135,
		gen: 4,
	},
	lustrousorb: {
		name: "Lustrous Orb",
		spritenum: 265,
		fling: {
			basePower: 60,
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (user.baseSpecies.num === 484 && (move.type === 'Water' || move.type === 'Dragon')) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 484) || pokemon.baseSpecies.num === 484) {
				return false;
			}
			return true;
		},
		forcedForme: "Palkia-Origin",
		itemUser: ["Palkia-Origin"],
		num: 136,
		gen: 4,
	},
	mirrorherb: {
		name: "Mirror Herb",
		shortDesc: "Copies any one stat boost by another Pokémon; consumed.",
		spritenum: 358,
		fling: {
			basePower: 10,
		},
		onAnyBoost(boost, target, source, effect) {
			if (target === this.effectData.target || !boost || effect.id === 'mirrorherb') return;
			let activate = false;
			const mirrorBoost: SparseBoostsTable = {};
			let b: BoostName;
			for (b in boost) {
				if (boost[b]! > 0) {
					if (target.boosts[b] === 6) continue;
					mirrorBoost[b] = boost[b];
					activate = true;
				}
			}
			if (activate && this.effectData.target.useItem()) {
				this.boost(mirrorBoost, this.effectData.target, this.effectData.target);
			}
		},
		num: -1001,
		gen: 8,
	},
	covertcloak: {
		name: "Covert Cloak",
		shortDesc: "The holder is immune to additional effects of moves.",
		spritenum: 358,
		fling: {
			basePower: 30,
		},
		onModifySecondaries(secondaries) {
			this.debug('Covert Cloak prevent secondary');
			return secondaries.filter(effect => !!(effect.self || effect.dustproof));
		},
		num: -1002,
		gen: 8,
	},
	loadeddice: {
		name: "Loaded Dice",
		shortDesc: "Multi-strike moves more often land more hits.",
		spritenum: 358,
		fling: {
			basePower: 30,
		},
		onModifyMove(move) { // mostly done in scripts.ts now!
			if (move.multiaccuracy) move.multiaccuracy = 95; // for Triple Axel and stuff
		},
		num: -1003,
		gen: 8,
	},
};
