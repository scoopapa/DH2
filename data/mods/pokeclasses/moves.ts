'use strict';

/**@type {{[k: string]: ModdedMoveData}} */
export const BattleMovedex: {[k: string]: ModdedMoveData} = {
	//------------------------------Skills------------------------------------------------
	"blade": {
		num: 10000,
		id: "blade",
		name: "Blade",
	},
	"destruction": {
		num: 10001,
		id: "destruction",
		name: "Destruction",
	},
	"athletics": {
		num: 10002,
		id: "athletics",
		name: "Athletics",
	},
	//--------------------------------modified moves-------------------------------------------
	reflect: {
		inherit: true,
		effect: {
			duration: 5,
			durationCallback(target, source, effect) {
				if (source.pokeClass === 'mage') this.effectData.sourceClass = 'mage';
				if (source?.hasItem('lightclay')) {
					return 8;
				}
				return 5;
			},
			onAnyModifyDamage(damage, source, target, move) {
				if (target !== source && target.side === this.effectData.target && this.getCategory(move) === 'Physical') {
					if (!target.getMoveHitData(move).crit && !move.infiltrates) {
						this.debug('Reflect weaken');
						if (target.side.active.length > 1) return this.chainModify([0xAAC, 0x1000]);
						if (this.effectData.sourceClass === 'mage') return this.chainModify(0.45);
						else return this.chainModify(0.5);
					}
				}
			},
			onStart(side) {
				this.add('-sidestart', side, 'Reflect');
				// this.effectData.sourceClass = 
			},
			onResidualOrder: 21,
			onEnd(side) {
				this.add('-sideend', side, 'Reflect');
			},
		},
		secondary: null,
		target: "allySide",
		type: "Psychic",
		zMove: {boost: {def: 1}},
		contestType: "Clever",
	},
	lightscreen: {
		num: 113,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "For 5 turns, the user and its party members take 0.5x damage from special attacks, or 0.66x damage if in a Double Battle. Damage is not reduced further with Aurora Veil. Critical hits ignore this effect. It is removed from the user's side if the user or an ally is successfully hit by Brick Break, Psychic Fangs, or Defog. Lasts for 8 turns if the user is holding Light Clay. Fails if the effect is already active on the user's side.",
		shortDesc: "For 5 turns, special damage to allies is halved.",
		name: "Light Screen",
		pp: 30,
		priority: 0,
		flags: {snatch: 1},
		sideCondition: 'lightscreen',
		effect: {
			duration: 5,
			durationCallback(target, source, effect) {
				if (source.pokeClass === 'mage') this.effectData.sourceClass = 'mage';
				if (source?.hasItem('lightclay')) {
					return 8;
				}
				return 5;
			},
			onAnyModifyDamage(damage, source, target, move) {
				if (target !== source && target.side === this.effectData.target && this.getCategory(move) === 'Special') {
					if (!target.getMoveHitData(move).crit && !move.infiltrates) {
						this.debug('Light Screen weaken');
						if (target.side.active.length > 1) return this.chainModify([0xAAC, 0x1000]);
						if (this.effectData.sourceClass === 'mage') return this.chainModify(0.45);
						else return this.chainModify(0.5);
					}
				}
			},
			onStart(side) {
				this.add('-sidestart', side, 'move: Light Screen');
			},
			onResidualOrder: 21,
			onResidualSubOrder: 1,
			onEnd(side) {
				this.add('-sideend', side, 'move: Light Screen');
			},
		},
		secondary: null,
		target: "allySide",
		type: "Psychic",
		zMove: {boost: {spd: 1}},
		contestType: "Beautiful",
	},
	
	
};