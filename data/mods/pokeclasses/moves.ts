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
						return this.chainModify(0.5);
					}
				}
			},
			onStart(side) {
				this.add('-sidestart', side, 'Reflect');
				this.effectData.sourceClass = 
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
	
	
};