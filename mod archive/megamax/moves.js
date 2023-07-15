'use strict';

/**@type {{[k: string]: MoveData}} */
let BattleMovedex = {
coppermines: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Hurts foes on switch-in. Factors Steel weakness.",
		id: "coppermines",
		isViable: true,
		name: "Copper Mines",
		pp: 20,
		priority: 0,
		flags: {reflectable: 1},
		sideCondition: 'coppermines',
		effect: {
			// this is a side condition
			onStart(side) {
				this.add('-sidestart', side, 'move: Copper Mines');
			},
			onSwitchIn(pokemon) {
				if (pokemon.hasItem('heavydutyboots')) return;
				let typeMod = this.dex.clampIntRange(pokemon.runEffectiveness(this.dex.getActiveMove('coppermines')), -6, 6);
				this.damage(pokemon.maxhp * Math.pow(2, typeMod) / 8);
			},
		},
		secondary: null,
		target: "foeSide",
		type: "Steel",
		zMoveBoost: {def: 1},
		contestType: "Cool",
	},
};

exports.BattleMovedex = BattleMovedex;
