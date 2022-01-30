export const Items: {[itemid: string]: ModdedItemData} = {
	dinnerplate: {
		name: "Dinner Plate",
		spritenum: 110,
		onPlate: 'Food',
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Food') {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 493) || pokemon.baseSpecies.num === 493) {
				return false;
			}
			return true;
		},
		forcedForme: "Arceus-Food",
		num: -1001,
		gen: 8,
		desc: "Holder's Food-type attacks have 1.2x power. Judgment is Food type.",
	},
	savageplate: {
		name: "Savage Plate",
		spritenum: 110,
		onPlate: 'Feral',
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Feral') {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 493) || pokemon.baseSpecies.num === 493) {
				return false;
			}
			return true;
		},
		forcedForme: "Arceus-Feral",
		num: -1002,
		gen: 8,
		desc: "Holder's Feral-type attacks have 1.2x power. Judgment is Feral type.",
	},
	foodmemory: {
		name: "Food Memory",
		spritenum: 673,
		onMemory: 'Food',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 773) || pokemon.baseSpecies.num === 773) {
				return false;
			}
			return true;
		},
		forcedForme: "Silvally-Food",
		itemUser: ["Silvally-Food"],
		num: -1003,
		gen: 8,
		desc: "Holder's Multi-Attack is Food type.",
	},
	feralmemory: {
		name: "Feral Memory",
		spritenum: 673,
		onMemory: 'Feral',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 773) || pokemon.baseSpecies.num === 773) {
				return false;
			}
			return true;
		},
		forcedForme: "Silvally-Feral",
		itemUser: ["Silvally-Feral"],
		num: -1004,
		gen: 8,
		desc: "Holder's Multi-Attack is Feral type.",
	},
	fullmeal: {
		name: "Full Meal",
		spritenum: 520,
		fling: {
			basePower: 30,
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Food') {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		num: -1005,
		gen: 8,
		desc: "Holder's Food-type attacks have 1.2x power.",
	},
	wildclaw: {
		name: "Wild Claw",
		spritenum: 520,
		fling: {
			basePower: 30,
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Feral') {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		num: -1006,
		gen: 8,
		desc: "Holder's Feral-type attacks have 1.2x power.",
	},
	soybenberry: {
		name: "Soyben Berry",
		spritenum: 78,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Food",
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Food' && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['authentic'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
		onEat() { },
		num: -1007,
		gen: 8,
		desc: "Halves damage taken from a supereffective Food-type attack. Single use.",
	},
	mayhamberry: {
		name: "Mayham Berry",
		spritenum: 78,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Feral",
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Feral' && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['authentic'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
		onEat() { },
		num: -1008,
		gen: 8,
		desc: "Halves damage taken from a supereffective Feral-type attack. Single use.",
	},
	emptybowl: {
		name: "Empty Bowl",
		spritenum: 2,
		fling: {
			basePower: 30,
		},
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Food') {
				target.useItem();
			}
		},
		boosts: {
			def: 1,
		},
		num: -1009,
		gen: 8,
		desc: "Raises holder's Defense by 1 stage if hit by a Food-type attack. Single use.",
	},
};
