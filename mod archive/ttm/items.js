'use strict';

exports.BattleItems = {
	"heartiumz": {
		id: "heartiumz",
		name: "Heartium Z",
		spritenum: 632,
		onPlate: 'Heart',
		onTakeItem: false,
		zMove: true,
		zMoveType: "Heart",
		forcedForme: "Arceus-Heart",
		gen: 7,
		desc: "If holder has a Heart move, this item allows it to use a Heart Z-Move.",
	},
	"soulplate": {
		id: "soulplate",
		name: "Soul Plate",
		spritenum: 105,
		onPlate: 'Heart',
		onBasePowerPriority: 6,
		onBasePower (basePower, user, target, move) {
			if (move && move.type === 'Heart') {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		onTakeItem (item, pokemon, source) {
			if ((source && source.baseTemplate.num === 493) || pokemon.baseTemplate.num === 493) {
				return false;
			}
			return true;
		},
		forcedForme: "Arceus-Heart",
		gen: 4,
		desc: "Holder's Heart-type attacks have 1.2x power. Judgment is Heart type.",
	},
	"heartmemory": {
		id: "heartmemory",
		name: "Heart Memory",
		spritenum: 673,
		onMemory: 'Heart',
		onTakeItem (item, pokemon, source) {
			if ((source && source.baseTemplate.num === 773) || pokemon.baseTemplate.num === 773) {
				return false;
			}
			return true;
		},
		forcedForme: "Silvally-Heart",
		gen: 7,
		desc: "Holder's Multi-Attack is Heart type.",
	},
	"vaxiberry": {
		id: "vaxiberry",
		name: "Vaxi Berry",
		spritenum: 603,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Heart",
		},
		onSourceModifyDamage (damage, source, target, move) {
			if (move.type === 'Heart' && move.typeMod > 0 && (!target.volatiles['substitute'] || move.flags['authentic'] || (move.infiltrates && this.gen >= 6))) {
				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
		onEat () { },
		gen: 6,
		desc: "Halves damage taken from a supereffective Heart-type attack. Single use.",
	},
	"heartribbon": {
		id: "heartribbon",
		name: "Heart Ribbon",
		spritenum: 273,
		fling: {
			basePower: 30,
		},
		onBasePowerPriority: 6,
		onBasePower (basePower, user, target, move) {
			if (move.type === 'Heart') {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		gen: 2,
		desc: "Holder's Heart-type attacks have 1.2x power.",
	},
		"timiumz": {
		id: "timiumz",
		name: "Timium Z",
		spritenum: 632,
		onPlate: 'Time',
		onTakeItem: false,
		zMove: true,
		zMoveType: "Time",
		forcedForme: "Arceus-Time",
		gen: 7,
		desc: "If holder has a Time move, this item allows it to use a Time Z-Move.",
	},
	"temporalplate": {
		id: "temporalplate",
		name: "Temporal Plate",
		spritenum: 105,
		onPlate: 'Time',
		onBasePowerPriority: 6,
		onBasePower (basePower, user, target, move) {
			if (move && move.type === 'Time') {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		onTakeItem (item, pokemon, source) {
			if ((source && source.baseTemplate.num === 493) || pokemon.baseTemplate.num === 493) {
				return false;
			}
			return true;
		},
		forcedForme: "Arceus-Time",
		gen: 4,
		desc: "Holder's Time-type attacks have 1.2x power. Judgment is Time type.",
	},
	"timememory": {
		id: "timememory",
		name: "Time Memory",
		spritenum: 673,
		onMemory: 'Time',
		onTakeItem (item, pokemon, source) {
			if ((source && source.baseTemplate.num === 773) || pokemon.baseTemplate.num === 773) {
				return false;
			}
			return true;
		},
		forcedForme: "Silvally-Time",
		gen: 7,
		desc: "Holder's Multi-Attack is Time type.",
	},
	"oddwatch": {
		id: "oddwatch",
		name: "Odd Watch",
		spritenum: 300,
		fling: {
			basePower: 30,
		},
		onBasePowerPriority: 6,
		onBasePower (basePower, user, target, move) {
			if (move.type === 'Time') {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		gen: 2,
		desc: "Holder's Time-type attacks have 1.2x power.",
	},
	"ancientrock": {
		id: "ancientrock",
		name: "Ancient Rock",
		spritenum: 88,
		fling: {
			basePower: 60,
		},
		num: 285,
		gen: 4,
		desc: "Holder's use of Trick Room lasts 8 turns instead of 5.",
	},
	"spaciumz": {
		id: "spaciumz",
		name: "Spacium Z",
		spritenum: 632,
		onPlate: 'Space',
		onTakeItem: false,
		zMove: true,
		zMoveType: "Space",
		forcedForme: "Arceus-Space",
		gen: 7,
		desc: "If holder has a Space move, this item allows it to use a Space Z-Move.",
	},
	"starplate": {
		id: "starplate",
		name: "Star Plate",
		spritenum: 105,
		onPlate: 'Space',
		onBasePowerPriority: 6,
		onBasePower (basePower, user, target, move) {
			if (move && move.type === 'Space') {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		onTakeItem (item, pokemon, source) {
			if ((source && source.baseTemplate.num === 493) || pokemon.baseTemplate.num === 493) {
				return false;
			}
			return true;
		},
		forcedForme: "Arceus-Space",
		gen: 4,
		desc: "Holder's Space-type attacks have 1.2x power. Judgment is Space type.",
	},
	"spacememory": {
		id: "spacememory",
		name: "Space Memory",
		spritenum: 673,
		onMemory: 'Space',
		onTakeItem (item, pokemon, source) {
			if ((source && source.baseTemplate.num === 773) || pokemon.baseTemplate.num === 773) {
				return false;
			}
			return true;
		},
		forcedForme: "Silvally-Space",
		gen: 7,
		desc: "Holder's Multi-Attack is Space type.",
	},
	"starbolaberry": {
		id: "starbolaberry",
		name: "Starbola Berry",
		spritenum: 603,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Space",
		},
		onSourceModifyDamage (damage, source, target, move) {
			if (move.type === 'Space' && move.typeMod > 0 && (!target.volatiles['substitute'] || move.flags['authentic'] || (move.infiltrates && this.gen >= 6))) {
				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
		onEat () { },
		gen: 6,
		desc: "Halves damage taken from a supereffective Space-type attack. Single use.",
	},
	"stardust": {
		id: "stardust",
		name: "Stardust",
		spritenum: 273,
		fling: {
			basePower: 30,
		},
		onBasePowerPriority: 6,
		onBasePower (basePower, user, target, move) {
			if (move.type === 'Space') {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		gen: 2,
		desc: "Holder's Space-type attacks have 1.2x power.",
	},
	"lightiumz": {
		id: "lightiumz",
		name: "Lightium Z",
		spritenum: 632,
		onPlate: 'Light',
		onTakeItem: false,
		zMove: true,
		zMoveType: "Light",
		forcedForme: "Arceus-Light",
		num: 777,
		gen: 7,
		desc: "If holder has a Light move, this item allows it to use a Light Z-Move.",
	},
	"shinyplate": {
		id: "shinyplate",
		name: "Shiny Plate",
		spritenum: 105,
		onPlate: 'Light',
		onBasePowerPriority: 6,
		onBasePower (basePower, user, target, move) {
			if (move && move.type === 'Light') {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		onTakeItem (item, pokemon, source) {
			if ((source && source.baseTemplate.num === 493) || pokemon.baseTemplate.num === 493) {
				return false;
			}
			return true;
		},
		forcedForme: "Arceus-Light",
		gen: 4,
		desc: "Holder's Light-type attacks have 1.2x power. Judgment is Light type.",
	},
	"lightmemory": {
		id: "lightmemory",
		name: "Light Memory",
		spritenum: 673,
		onMemory: 'Light',
		onTakeItem (item, pokemon, source) {
			if ((source && source.baseTemplate.num === 773) || pokemon.baseTemplate.num === 773) {
				return false;
			}
			return true;
		},
		forcedForme: "Silvally-Light",
		num: 909,
		gen: 7,
		desc: "Holder's Multi-Attack is Light type.",
	},
	"kerretberry": {
		id: "kerretberry",
		name: "Kerret Berry",
		spritenum: 603,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Light",
		},
		onSourceModifyDamage (damage, source, target, move) {
			if (move.type === 'Light' && move.typeMod > 0 && (!target.volatiles['substitute'] || move.flags['authentic'] || (move.infiltrates && this.gen >= 6))) {
				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
		onEat () { },
		gen: 7,
		desc: "Halves damage taken from a supereffective Light-type attack. Single use.",
	},
	"bigquartz": {
		id: "bigquartz",
		name: "Big Quartz",
		spritenum: 273,
		fling: {
			basePower: 30,
		},
		onBasePowerPriority: 6,
		onBasePower (basePower, user, target, move) {
			if (move.type === 'Light') {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		gen: 7,
		desc: "Holder's Light-type attacks have 1.2x power.",
	},
	"hardlightvest": {
		id: "hardlightvest",
		name: "Hardlight Vest",
		spritenum: 273,
		fling: {
			basePower: 30,
		},
		onSourceFaint (target, source, effect, move) {
			if (effect && effect.effectType === 'Move') {
				let attackType = source.lastMove.type;
				if (attackType === 'Light') {
					this.boost({atk:1, def:1}, source);
				}
			}
		},
		gen: 7,
		desc: "If the user knocks out a Pokemon with a Light-type attack, Atk and Def are boosted.",
	},
	"absorptionprism": {
		id: "absorptionprism",
		name: "Absorption Prism",
		spritenum: 2,
		fling: {
			basePower: 30,
		},
		onAfterDamage (damage, target, source, move) {
			if (move.type === 'Light' && target.useItem()) {
				if (!this.boost({[target.stats.spa > target.stats.atk ? 'spa' : 'atk']: 2})) {
					return null;
				}
			}
		},
		gen: 5,
		desc: "Does nothing for now. Check back later! (Would boost this Pokemon's higher attacking stat by 2 once hit by a Light-type move)",
	},
	"lantern": {
		id: "lantern",
		name: "Lantern",
		spritenum: 273,
		fling: {
			basePower: 30,
		},
		gen: 7,
		desc: "Does nothing for now. Check back later!",
	},
	"honey": {
		id: "honey",
		name: "Honey",
		spritenum: 444,
		fling: {
			basePower: 10,
		},
		onBasePowerPriority: 6,
		onBasePower (basePower, user, target, move) {
			if (move.type === 'Food') {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		gen: 3,
		desc: "Holder's Food-type attacks have 1.2x power.",
	},
		"foodiumz": {
		id: "foodiumz",
		name: "Foodium Z",
		spritenum: 632,
		onPlate: 'Food',
		onTakeItem: false,
		zMove: true,
		zMoveType: "Food",
		forcedForme: "Arceus-Food",
		gen: 7,
		desc: "If holder has a Food move, this item allows it to use a Food Z-Move.",
	},
	"deliciousplate": {
		id: "deliciousplate",
		name: "Delicious Plate",
		spritenum: 105,
		onPlate: 'Food',
		onBasePowerPriority: 6,
		onBasePower (basePower, user, target, move) {
			if (move && move.type === 'Food') {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		onTakeItem (item, pokemon, source) {
			if ((source && source.baseTemplate.num === 493) || pokemon.baseTemplate.num === 493) {
				return false;
			}
			return true;
		},
		forcedForme: "Arceus-Food",
		gen: 4,
		desc: "Holder's Food-type attacks have 1.2x power. Judgment is Food type.",
	},
	"foodmemory": {
		id: "foodmemory",
		name: "Food Memory",
		spritenum: 673,
		onMemory: 'Food',
		onTakeItem (item, pokemon, source) {
			if ((source && source.baseTemplate.num === 773) || pokemon.baseTemplate.num === 773) {
				return false;
			}
			return true;
		},
		forcedForme: "Silvally-Food",
		gen: 7,
		desc: "Holder's Multi-Attack is Food type.",
	},
};
