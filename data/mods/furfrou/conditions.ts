export const Conditions: {[k: string]: ConditionData} = {
	mustrecharge: {
		name: 'mustrecharge',
		duration: 2,
		onBeforeMovePriority: 11,
		onBeforeMove(pokemon) {
			this.add('cant', pokemon, 'recharge');
			if (pokemon.hasItem('fuelcell')) {
				pokemon.useItem();
			}
			pokemon.removeVolatile('mustrecharge');
			pokemon.removeVolatile('truant');
			return null;
		},
		onStart(pokemon) {
			this.add('-mustrecharge', pokemon);
		},
		onLockMove: 'recharge',
	},
	flicker: {
		name: 'flicker',
		duration: 1,
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onStart(target) {
			this.add('-start', target, 'ability: Flicker');
		},
		onTryHit(target, source, move) {
			if (target !== source) {
				target.flickered = true;
				target.addVolatile('charge');
			}
		},
		onEnd(target) {
			this.add('-end', target, 'Flicker');
			if (target.flickered) return;
			target.outFlickered = true;
		},
	},
	solischarge: {
		name: 'solischarge',
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onStart(target) {
			this.add('-start', target, 'Solis Charge');
		},
		onModifyDamage(damage, source, target, move) {
			return this.chainModify(1.5);
		},
		onEnd(target) {
			this.add('-end', target, 'Solis Charge');
		},
	},
};
