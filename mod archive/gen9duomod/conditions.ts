export const Conditions: {[k: string]: ConditionData} = {
  frz: {
		name: 'frz',
	   id: 'frz',
	  	num: 0,
		effectType: 'Status',
    	onStart: function (target, source, sourceEffect) {
			this.add('-status', target, 'frz');
    	},
		duration: 4,
		onBeforeMovePriority: 2,
		onBeforeMove: function (pokemon, target, move) {
			if (this.randomChance(4, 10)) {
				pokemon.cureStatus();
				return;
			}
			if (move.flags['defrost']) {
				pokemon.cureStatus();
				return;
			}
			this.add('cant', pokemon, 'frz');
			return false;
		},
		onHit: function (target, source, move) {
			if (move.type === 'Fire' && move.category !== 'Status' || move.flags['defrost']) {
				target.cureStatus();
			}
		},
		onEnd: function (target) {
			this.add('-curestatus', target, 'frz');
		},
	},
};
