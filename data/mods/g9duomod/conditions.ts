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

	hail: {
		name: 'Hail',
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem('icyrock')) {
				return 8;
			}
			return 5;
		},
		onStart(battle, source, effect) {
			if (effect?.effectType === 'Ability') {
				if (this.gen <= 5) this.effectData.duration = 0;
				this.add('-weather', 'Hail', '[from] ability: ' + effect, '[of] ' + source);
			} else {
				this.add('-weather', 'Hail');
			}
		},
		onModifyMove(move) {
			if (move.secondaries && move.id !== 'secretpower') {
				for (const secondary of move.secondaries) {
					if (secondary.status !== 'frz') return;
					if (secondary.chance) secondary.chance *= 2;
				}
			}
		},
		onResidualOrder: 1,
		onResidual() {
			this.add('-weather', 'Hail', '[upkeep]');
			if (this.field.isWeather('hail')) this.eachEvent('Weather');
		},		
		onAnyModifyDamage(damage, source, target, move) {
			if (move.category === 'Physical' && target.hasType('Ice')) {return this.chainModify(0.67);}
		},
		onEnd() {
			this.add('-weather', 'none');
		},
	},
};
