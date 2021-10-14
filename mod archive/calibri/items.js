'use strict';

exports.BattleItems = {
	"staticorb": {
		id: "staticorb",
		name: "Static Orb",
		spritenum: 10000,
		fling: {
			basePower: 90,
		},
		onAfterBoost: function (boost, target, source, effect) {
			if (effect.id === 'static' && target.useItem()) {
				this.boost({spa: 2});
			}
		},
		num: 846,
		gen: 7,
		desc: "Raises holder's SpAttack by 2 stages if it gets affected by Static. Single use.",
},
	"choicevest": {
		id: "choicevest",
		name: "Choice Vest",
		spritenum: 640,
		fling: {
			basePower: 10,
		},
		onStart: function (pokemon) {
			if (pokemon.volatiles['choicelock']) {
				this.debug('removing choicelock: ' + pokemon.volatiles.choicelock);
			}
			pokemon.removeVolatile('choicelock');
		},
		onModifyMove: function (move, pokemon) {
			pokemon.addVolatile('choicelock');
		},
		onModifyAtkPriority: 1,
		onModifyAtk: function (def) {
			return this.chainModify(2);
		},
		isChoice: true,
		num: 640,
		gen: 6,
		desc: "Holder's Defense is 2x, but it can only select the first move it executes.",
	},
};
