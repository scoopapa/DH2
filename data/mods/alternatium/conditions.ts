export const Conditions: {[k: string]: ConditionData} = {
	primordialsea: {
		inherit: true,
		onTryMovePriority: 1,
		onTryMove(attacker, defender, move) {
			if (move.id === 'seethingsauna') return;
			if (move.type === 'Fire' && move.category !== 'Status') {
				this.debug('Primordial Sea fire suppress');
				this.add('-fail', attacker, move, '[from] Primordial Sea');
				this.attrLastMove('[still]');
				return null;
			}
		},
	},
	desolateland: {
		inherit: true,
		onTryMovePriority: 1,
		onTryMove(attacker, defender, move) {
			if (move.id === 'boilingvortex') return;
			if (move.type === 'Water' && move.category !== 'Status') {
				this.debug('Desolate Land water suppress');
				this.add('-fail', attacker, move, '[from] Desolate Land');
				this.attrLastMove('[still]');
				return null;
			}
		},
	},
};